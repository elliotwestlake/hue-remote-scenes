import importlib.util, pathlib, pytest

spec = importlib.util.spec_from_file_location(
    "logic", pathlib.Path(__file__).parents[1] / "custom_components/hue_remote_scenes/logic.py")
L = importlib.util.module_from_spec(spec); spec.loader.exec_module(L)

def test_next_scene_id():
    assert L.next_scene_id(set()) == 1
    assert L.next_scene_id({1, 2, 4}) == 3
    with pytest.raises(L.SceneError):
        L.next_scene_id(set(range(1, 256)))

def test_clean_name():
    assert L.clean_name("  Movie   night ", 40) == "Movie night"
    for bad in ("", "   ", None, 5):
        with pytest.raises(L.SceneError):
            L.clean_name(bad, 40)
    with pytest.raises(L.SceneError):
        L.clean_name("x" * 41, 40)

def test_merge_membership():
    replies = {"b/11": [1, 3], "a/11": [3], "c/11": None, "d/11": []}
    assert L.merge_membership(replies) == {1: ["b/11"], 3: ["a/11", "b/11"]}

def test_import_scenes():
    stored = {"3": {"name": "Relax", "members": ["a/11"]}}
    scenes, added = L.import_scenes(stored, {3: ["a/11", "b/11"], 7: ["b/11"]})
    assert added == [7]
    assert scenes == {"3": {"name": "Relax", "members": ["a/11", "b/11"]},
                      "7": {"name": "Scene 7", "members": ["b/11"]}}
    assert stored["3"]["members"] == ["a/11"]  # not mutated

def test_results_summary():
    ok, failed = L.results_summary({"b": "ok", "a": "ok", "c": "no answer"})
    assert ok == ["a", "b"] and failed == {"c": "no answer"}

def test_remote_endpoints():
    on_off, level, scenes, color = 0x6, 0x8, 0x5, 0x300
    endpoints = {
        0: (set(), {on_off}),                                    # ZDO, ignored
        1: ({0x0000, 0x0001}, {0x0003, on_off, level, scenes, 0x19}),  # Hue Tap Dial
        11: ({on_off, level, scenes, color}, {0x19}),             # a bulb
        12: ({on_off}, {on_off}),                                # a plug that also sends: not a remote
    }
    assert L.remote_endpoints(endpoints, (on_off, level, scenes)) == {1: [on_off, level, scenes]}

def test_group_bindings():
    entries = [
        {"endpoint": 1, "cluster": 8, "addrmode": 1, "group_id": 5},
        {"endpoint": 1, "cluster": 6, "addrmode": 1, "group_id": 5},
        {"endpoint": 1, "cluster": 6, "addrmode": 3, "group_id": None},  # bound to the coordinator
    ]
    assert L.group_bindings(entries) == [
        {"endpoint": 1, "cluster": 6, "group_id": 5},
        {"endpoint": 1, "cluster": 8, "group_id": 5},
    ]

def test_bindings_by_group():
    bindings = [{"endpoint": 1, "cluster": 8, "group_id": 5}, {"endpoint": 1, "cluster": 6, "group_id": 5},
                {"endpoint": 1, "cluster": 6, "group_id": 7}]
    assert L.bindings_by_group(bindings) == {"5": [6, 8], "7": [6]}

def test_apply_bind_results():
    known = {"7": [6]}
    after = L.apply_bind_results(known, 5, {6: "ok", 8: "ok", 5: "no answer"}, unbind=False)
    assert after == {"7": [6], "5": [6, 8]} and known == {"7": [6]}
    after = L.apply_bind_results(after, 5, {6: "ok", 8: "no answer"}, unbind=True)
    assert after == {"7": [6], "5": [8]}
    assert L.apply_bind_results(after, 5, {8: "ok"}, unbind=True) == {"7": [6]}

def test_next_scene_id_skips_dial_buttons():
    assert L.next_scene_id({1}, reserved={0, 1, 4, 5}) == 2
    assert L.next_scene_id({2, 3}, reserved={0, 1, 4, 5}) == 6

def test_dial_buttons():
    assert [sid for _, sid in L.dial_buttons("RDM002")] == [1, 0, 5, 4]
    assert L.dial_buttons("rdm002") is not None
    # Gen 2 dimmer: the Hue button alternates between scenes 0 and 1 on its own group.
    assert sorted(sid for _, sid in L.dial_buttons("RWL022")) == [0, 1]
    assert L.dial_buttons("RWL021") is None and L.dial_buttons(None) is None

def test_cycle_trigger():
    assert L.cycle_trigger("RWL021")[0] == "on_press" and L.cycle_trigger("rwl020")[0] == "on_press"
    assert L.cycle_trigger("ROM001")[0] == "on_double_press"  # a single press toggles on/off
    # Gen 2 dimmers and Tap Dials recall scenes themselves; no HA cycle.
    assert L.cycle_trigger("RWL022") is None and L.cycle_trigger("RDM002") is None
    assert L.cycle_trigger(None) is None

def test_clean_cycle():
    assert L.clean_cycle([3, 1, 3, "2"], {1, 2, 3}) == [3, 1, 2]  # order kept, repeats dropped
    for bad in ([], None, [9]):
        with pytest.raises(L.SceneError):
            L.clean_cycle(bad, {1, 2, 3})
    with pytest.raises(L.SceneError):
        L.clean_cycle(list(range(L.CYCLE_MAX + 1)), set(range(50)))

def test_cycle_next():
    assert L.cycle_next(3, None, None, 100.0) == 0  # first press
    assert L.cycle_next(3, 0, 100.0, 102.0) == 1
    assert L.cycle_next(3, 2, 100.0, 102.0) == 0  # wraps
    assert L.cycle_next(3, 1, 100.0, 100.0 + L.CYCLE_RESET + 1) == 0  # after a pause: first again
    with pytest.raises(L.SceneError):
        L.cycle_next(0, None, None, 0.0)

def test_parse_member_key():
    assert L.parse_member_key("00:17:88:01:00:00:00:01/11") == ("00:17:88:01:00:00:00:01", 11)
    with pytest.raises(L.SceneError):
        L.parse_member_key("nonsense")

def test_stale_bindings():
    coord = "00:12:4b:00:00:00:00:01"
    ours = {"endpoint": 1, "cluster": 6, "addrmode": 1, "group_id": 5}
    old_group = {"endpoint": 1, "cluster": 8, "addrmode": 1, "group_id": 0x2A2A}
    to_coord = {"endpoint": 2, "cluster": 0xFC00, "addrmode": 3, "group_id": None,
                "ieee": coord.upper(), "dst_endpoint": 1}
    to_bulb = {"endpoint": 1, "cluster": 6, "addrmode": 3, "group_id": None,
               "ieee": "00:17:88:01:00:00:00:02", "dst_endpoint": 11}
    table = [ours, old_group, to_coord, to_bulb]
    stale = L.stale_bindings(table, 5, coord)
    assert stale == [old_group, to_bulb]
    assert L.remove_entries(table, stale) == [ours, to_coord]
