var Bc = Object.defineProperty;
var Wc = (e, t, n) => t in e ? Bc(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var gn = (e, t, n) => Wc(e, typeof t != "symbol" ? t + "" : t, n);
var ja = { exports: {} }, pl = {}, _a = { exports: {} }, M = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ir = Symbol.for("react.element"), Vc = Symbol.for("react.portal"), Qc = Symbol.for("react.fragment"), Hc = Symbol.for("react.strict_mode"), Kc = Symbol.for("react.profiler"), Gc = Symbol.for("react.provider"), Yc = Symbol.for("react.context"), Zc = Symbol.for("react.forward_ref"), Xc = Symbol.for("react.suspense"), Jc = Symbol.for("react.memo"), qc = Symbol.for("react.lazy"), os = Symbol.iterator;
function ed(e) {
  return e === null || typeof e != "object" ? null : (e = os && e[os] || e["@@iterator"], typeof e == "function" ? e : null);
}
var Na = { isMounted: function() {
  return !1;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, Ca = Object.assign, Ea = {};
function fn(e, t, n) {
  this.props = e, this.context = t, this.refs = Ea, this.updater = n || Na;
}
fn.prototype.isReactComponent = {};
fn.prototype.setState = function(e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, e, t, "setState");
};
fn.prototype.forceUpdate = function(e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function ba() {
}
ba.prototype = fn.prototype;
function oo(e, t, n) {
  this.props = e, this.context = t, this.refs = Ea, this.updater = n || Na;
}
var so = oo.prototype = new ba();
so.constructor = oo;
Ca(so, fn.prototype);
so.isPureReactComponent = !0;
var ss = Array.isArray, za = Object.prototype.hasOwnProperty, ao = { current: null }, $a = { key: !0, ref: !0, __self: !0, __source: !0 };
function Pa(e, t, n) {
  var r, l = {}, i = null, o = null;
  if (t != null) for (r in t.ref !== void 0 && (o = t.ref), t.key !== void 0 && (i = "" + t.key), t) za.call(t, r) && !$a.hasOwnProperty(r) && (l[r] = t[r]);
  var a = arguments.length - 2;
  if (a === 1) l.children = n;
  else if (1 < a) {
    for (var u = Array(a), c = 0; c < a; c++) u[c] = arguments[c + 2];
    l.children = u;
  }
  if (e && e.defaultProps) for (r in a = e.defaultProps, a) l[r] === void 0 && (l[r] = a[r]);
  return { $$typeof: ir, type: e, key: i, ref: o, props: l, _owner: ao.current };
}
function td(e, t) {
  return { $$typeof: ir, type: e.type, key: t, ref: e.ref, props: e.props, _owner: e._owner };
}
function uo(e) {
  return typeof e == "object" && e !== null && e.$$typeof === ir;
}
function nd(e) {
  var t = { "=": "=0", ":": "=2" };
  return "$" + e.replace(/[=:]/g, function(n) {
    return t[n];
  });
}
var as = /\/+/g;
function Ol(e, t) {
  return typeof e == "object" && e !== null && e.key != null ? nd("" + e.key) : t.toString(36);
}
function $r(e, t, n, r, l) {
  var i = typeof e;
  (i === "undefined" || i === "boolean") && (e = null);
  var o = !1;
  if (e === null) o = !0;
  else switch (i) {
    case "string":
    case "number":
      o = !0;
      break;
    case "object":
      switch (e.$$typeof) {
        case ir:
        case Vc:
          o = !0;
      }
  }
  if (o) return o = e, l = l(o), e = r === "" ? "." + Ol(o, 0) : r, ss(l) ? (n = "", e != null && (n = e.replace(as, "$&/") + "/"), $r(l, t, n, "", function(c) {
    return c;
  })) : l != null && (uo(l) && (l = td(l, n + (!l.key || o && o.key === l.key ? "" : ("" + l.key).replace(as, "$&/") + "/") + e)), t.push(l)), 1;
  if (o = 0, r = r === "" ? "." : r + ":", ss(e)) for (var a = 0; a < e.length; a++) {
    i = e[a];
    var u = r + Ol(i, a);
    o += $r(i, t, n, u, l);
  }
  else if (u = ed(e), typeof u == "function") for (e = u.call(e), a = 0; !(i = e.next()).done; ) i = i.value, u = r + Ol(i, a++), o += $r(i, t, n, u, l);
  else if (i === "object") throw t = String(e), Error("Objects are not valid as a React child (found: " + (t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) + "). If you meant to render a collection of children, use an array instead.");
  return o;
}
function pr(e, t, n) {
  if (e == null) return e;
  var r = [], l = 0;
  return $r(e, r, "", "", function(i) {
    return t.call(n, i, l++);
  }), r;
}
function rd(e) {
  if (e._status === -1) {
    var t = e._result;
    t = t(), t.then(function(n) {
      (e._status === 0 || e._status === -1) && (e._status = 1, e._result = n);
    }, function(n) {
      (e._status === 0 || e._status === -1) && (e._status = 2, e._result = n);
    }), e._status === -1 && (e._status = 0, e._result = t);
  }
  if (e._status === 1) return e._result.default;
  throw e._result;
}
var de = { current: null }, Pr = { transition: null }, ld = { ReactCurrentDispatcher: de, ReactCurrentBatchConfig: Pr, ReactCurrentOwner: ao };
function Ta() {
  throw Error("act(...) is not supported in production builds of React.");
}
M.Children = { map: pr, forEach: function(e, t, n) {
  pr(e, function() {
    t.apply(this, arguments);
  }, n);
}, count: function(e) {
  var t = 0;
  return pr(e, function() {
    t++;
  }), t;
}, toArray: function(e) {
  return pr(e, function(t) {
    return t;
  }) || [];
}, only: function(e) {
  if (!uo(e)) throw Error("React.Children.only expected to receive a single React element child.");
  return e;
} };
M.Component = fn;
M.Fragment = Qc;
M.Profiler = Kc;
M.PureComponent = oo;
M.StrictMode = Hc;
M.Suspense = Xc;
M.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ld;
M.act = Ta;
M.cloneElement = function(e, t, n) {
  if (e == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
  var r = Ca({}, e.props), l = e.key, i = e.ref, o = e._owner;
  if (t != null) {
    if (t.ref !== void 0 && (i = t.ref, o = ao.current), t.key !== void 0 && (l = "" + t.key), e.type && e.type.defaultProps) var a = e.type.defaultProps;
    for (u in t) za.call(t, u) && !$a.hasOwnProperty(u) && (r[u] = t[u] === void 0 && a !== void 0 ? a[u] : t[u]);
  }
  var u = arguments.length - 2;
  if (u === 1) r.children = n;
  else if (1 < u) {
    a = Array(u);
    for (var c = 0; c < u; c++) a[c] = arguments[c + 2];
    r.children = a;
  }
  return { $$typeof: ir, type: e.type, key: l, ref: i, props: r, _owner: o };
};
M.createContext = function(e) {
  return e = { $$typeof: Yc, _currentValue: e, _currentValue2: e, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, e.Provider = { $$typeof: Gc, _context: e }, e.Consumer = e;
};
M.createElement = Pa;
M.createFactory = function(e) {
  var t = Pa.bind(null, e);
  return t.type = e, t;
};
M.createRef = function() {
  return { current: null };
};
M.forwardRef = function(e) {
  return { $$typeof: Zc, render: e };
};
M.isValidElement = uo;
M.lazy = function(e) {
  return { $$typeof: qc, _payload: { _status: -1, _result: e }, _init: rd };
};
M.memo = function(e, t) {
  return { $$typeof: Jc, type: e, compare: t === void 0 ? null : t };
};
M.startTransition = function(e) {
  var t = Pr.transition;
  Pr.transition = {};
  try {
    e();
  } finally {
    Pr.transition = t;
  }
};
M.unstable_act = Ta;
M.useCallback = function(e, t) {
  return de.current.useCallback(e, t);
};
M.useContext = function(e) {
  return de.current.useContext(e);
};
M.useDebugValue = function() {
};
M.useDeferredValue = function(e) {
  return de.current.useDeferredValue(e);
};
M.useEffect = function(e, t) {
  return de.current.useEffect(e, t);
};
M.useId = function() {
  return de.current.useId();
};
M.useImperativeHandle = function(e, t, n) {
  return de.current.useImperativeHandle(e, t, n);
};
M.useInsertionEffect = function(e, t) {
  return de.current.useInsertionEffect(e, t);
};
M.useLayoutEffect = function(e, t) {
  return de.current.useLayoutEffect(e, t);
};
M.useMemo = function(e, t) {
  return de.current.useMemo(e, t);
};
M.useReducer = function(e, t, n) {
  return de.current.useReducer(e, t, n);
};
M.useRef = function(e) {
  return de.current.useRef(e);
};
M.useState = function(e) {
  return de.current.useState(e);
};
M.useSyncExternalStore = function(e, t, n) {
  return de.current.useSyncExternalStore(e, t, n);
};
M.useTransition = function() {
  return de.current.useTransition();
};
M.version = "18.3.1";
_a.exports = M;
var T = _a.exports;
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var id = T, od = Symbol.for("react.element"), sd = Symbol.for("react.fragment"), ad = Object.prototype.hasOwnProperty, ud = id.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, cd = { key: !0, ref: !0, __self: !0, __source: !0 };
function Ra(e, t, n) {
  var r, l = {}, i = null, o = null;
  n !== void 0 && (i = "" + n), t.key !== void 0 && (i = "" + t.key), t.ref !== void 0 && (o = t.ref);
  for (r in t) ad.call(t, r) && !cd.hasOwnProperty(r) && (l[r] = t[r]);
  if (e && e.defaultProps) for (r in t = e.defaultProps, t) l[r] === void 0 && (l[r] = t[r]);
  return { $$typeof: od, type: e, key: i, ref: o, props: l, _owner: ud.current };
}
pl.Fragment = sd;
pl.jsx = Ra;
pl.jsxs = Ra;
ja.exports = pl;
var s = ja.exports, La = { exports: {} }, je = {}, Oa = { exports: {} }, Ma = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
(function(e) {
  function t(P, R) {
    var O = P.length;
    P.push(R);
    e: for (; 0 < O; ) {
      var G = O - 1 >>> 1, q = P[G];
      if (0 < l(q, R)) P[G] = R, P[O] = q, O = G;
      else break e;
    }
  }
  function n(P) {
    return P.length === 0 ? null : P[0];
  }
  function r(P) {
    if (P.length === 0) return null;
    var R = P[0], O = P.pop();
    if (O !== R) {
      P[0] = O;
      e: for (var G = 0, q = P.length, dr = q >>> 1; G < dr; ) {
        var kt = 2 * (G + 1) - 1, Ll = P[kt], St = kt + 1, fr = P[St];
        if (0 > l(Ll, O)) St < q && 0 > l(fr, Ll) ? (P[G] = fr, P[St] = O, G = St) : (P[G] = Ll, P[kt] = O, G = kt);
        else if (St < q && 0 > l(fr, O)) P[G] = fr, P[St] = O, G = St;
        else break e;
      }
    }
    return R;
  }
  function l(P, R) {
    var O = P.sortIndex - R.sortIndex;
    return O !== 0 ? O : P.id - R.id;
  }
  if (typeof performance == "object" && typeof performance.now == "function") {
    var i = performance;
    e.unstable_now = function() {
      return i.now();
    };
  } else {
    var o = Date, a = o.now();
    e.unstable_now = function() {
      return o.now() - a;
    };
  }
  var u = [], c = [], h = 1, g = null, m = 3, y = !1, k = !1, j = !1, N = typeof setTimeout == "function" ? setTimeout : null, f = typeof clearTimeout == "function" ? clearTimeout : null, d = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function p(P) {
    for (var R = n(c); R !== null; ) {
      if (R.callback === null) r(c);
      else if (R.startTime <= P) r(c), R.sortIndex = R.expirationTime, t(u, R);
      else break;
      R = n(c);
    }
  }
  function x(P) {
    if (j = !1, p(P), !k) if (n(u) !== null) k = !0, Tl(S);
    else {
      var R = n(c);
      R !== null && Rl(x, R.startTime - P);
    }
  }
  function S(P, R) {
    k = !1, j && (j = !1, f(v), v = -1), y = !0;
    var O = m;
    try {
      for (p(R), g = n(u); g !== null && (!(g.expirationTime > R) || P && !$()); ) {
        var G = g.callback;
        if (typeof G == "function") {
          g.callback = null, m = g.priorityLevel;
          var q = G(g.expirationTime <= R);
          R = e.unstable_now(), typeof q == "function" ? g.callback = q : g === n(u) && r(u), p(R);
        } else r(u);
        g = n(u);
      }
      if (g !== null) var dr = !0;
      else {
        var kt = n(c);
        kt !== null && Rl(x, kt.startTime - R), dr = !1;
      }
      return dr;
    } finally {
      g = null, m = O, y = !1;
    }
  }
  var _ = !1, E = null, v = -1, z = 5, w = -1;
  function $() {
    return !(e.unstable_now() - w < z);
  }
  function F() {
    if (E !== null) {
      var P = e.unstable_now();
      w = P;
      var R = !0;
      try {
        R = E(!0, P);
      } finally {
        R ? mn() : (_ = !1, E = null);
      }
    } else _ = !1;
  }
  var mn;
  if (typeof d == "function") mn = function() {
    d(F);
  };
  else if (typeof MessageChannel < "u") {
    var is = new MessageChannel(), Ac = is.port2;
    is.port1.onmessage = F, mn = function() {
      Ac.postMessage(null);
    };
  } else mn = function() {
    N(F, 0);
  };
  function Tl(P) {
    E = P, _ || (_ = !0, mn());
  }
  function Rl(P, R) {
    v = N(function() {
      P(e.unstable_now());
    }, R);
  }
  e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(P) {
    P.callback = null;
  }, e.unstable_continueExecution = function() {
    k || y || (k = !0, Tl(S));
  }, e.unstable_forceFrameRate = function(P) {
    0 > P || 125 < P ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : z = 0 < P ? Math.floor(1e3 / P) : 5;
  }, e.unstable_getCurrentPriorityLevel = function() {
    return m;
  }, e.unstable_getFirstCallbackNode = function() {
    return n(u);
  }, e.unstable_next = function(P) {
    switch (m) {
      case 1:
      case 2:
      case 3:
        var R = 3;
        break;
      default:
        R = m;
    }
    var O = m;
    m = R;
    try {
      return P();
    } finally {
      m = O;
    }
  }, e.unstable_pauseExecution = function() {
  }, e.unstable_requestPaint = function() {
  }, e.unstable_runWithPriority = function(P, R) {
    switch (P) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;
      default:
        P = 3;
    }
    var O = m;
    m = P;
    try {
      return R();
    } finally {
      m = O;
    }
  }, e.unstable_scheduleCallback = function(P, R, O) {
    var G = e.unstable_now();
    switch (typeof O == "object" && O !== null ? (O = O.delay, O = typeof O == "number" && 0 < O ? G + O : G) : O = G, P) {
      case 1:
        var q = -1;
        break;
      case 2:
        q = 250;
        break;
      case 5:
        q = 1073741823;
        break;
      case 4:
        q = 1e4;
        break;
      default:
        q = 5e3;
    }
    return q = O + q, P = { id: h++, callback: R, priorityLevel: P, startTime: O, expirationTime: q, sortIndex: -1 }, O > G ? (P.sortIndex = O, t(c, P), n(u) === null && P === n(c) && (j ? (f(v), v = -1) : j = !0, Rl(x, O - G))) : (P.sortIndex = q, t(u, P), k || y || (k = !0, Tl(S))), P;
  }, e.unstable_shouldYield = $, e.unstable_wrapCallback = function(P) {
    var R = m;
    return function() {
      var O = m;
      m = R;
      try {
        return P.apply(this, arguments);
      } finally {
        m = O;
      }
    };
  };
})(Ma);
Oa.exports = Ma;
var dd = Oa.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var fd = T, Se = dd;
function C(e) {
  for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
  return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var Da = /* @__PURE__ */ new Set(), In = {};
function Mt(e, t) {
  ln(e, t), ln(e + "Capture", t);
}
function ln(e, t) {
  for (In[e] = t, e = 0; e < t.length; e++) Da.add(t[e]);
}
var Ze = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), ai = Object.prototype.hasOwnProperty, pd = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, us = {}, cs = {};
function hd(e) {
  return ai.call(cs, e) ? !0 : ai.call(us, e) ? !1 : pd.test(e) ? cs[e] = !0 : (us[e] = !0, !1);
}
function md(e, t, n, r) {
  if (n !== null && n.type === 0) return !1;
  switch (typeof t) {
    case "function":
    case "symbol":
      return !0;
    case "boolean":
      return r ? !1 : n !== null ? !n.acceptsBooleans : (e = e.toLowerCase().slice(0, 5), e !== "data-" && e !== "aria-");
    default:
      return !1;
  }
}
function gd(e, t, n, r) {
  if (t === null || typeof t > "u" || md(e, t, n, r)) return !0;
  if (r) return !1;
  if (n !== null) switch (n.type) {
    case 3:
      return !t;
    case 4:
      return t === !1;
    case 5:
      return isNaN(t);
    case 6:
      return isNaN(t) || 1 > t;
  }
  return !1;
}
function fe(e, t, n, r, l, i, o) {
  this.acceptsBooleans = t === 2 || t === 3 || t === 4, this.attributeName = r, this.attributeNamespace = l, this.mustUseProperty = n, this.propertyName = e, this.type = t, this.sanitizeURL = i, this.removeEmptyString = o;
}
var le = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
  le[e] = new fe(e, 0, !1, e, null, !1, !1);
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
  var t = e[0];
  le[t] = new fe(t, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
  le[e] = new fe(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
  le[e] = new fe(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
  le[e] = new fe(e, 3, !1, e.toLowerCase(), null, !1, !1);
});
["checked", "multiple", "muted", "selected"].forEach(function(e) {
  le[e] = new fe(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function(e) {
  le[e] = new fe(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function(e) {
  le[e] = new fe(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function(e) {
  le[e] = new fe(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var co = /[\-:]([a-z])/g;
function fo(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
  var t = e.replace(
    co,
    fo
  );
  le[t] = new fe(t, 1, !1, e, null, !1, !1);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
  var t = e.replace(co, fo);
  le[t] = new fe(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
});
["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
  var t = e.replace(co, fo);
  le[t] = new fe(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function(e) {
  le[e] = new fe(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
le.xlinkHref = new fe("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);
["src", "href", "action", "formAction"].forEach(function(e) {
  le[e] = new fe(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function po(e, t, n, r) {
  var l = le.hasOwnProperty(t) ? le[t] : null;
  (l !== null ? l.type !== 0 : r || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (gd(t, n, l, r) && (n = null), r || l === null ? hd(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n)) : l.mustUseProperty ? e[l.propertyName] = n === null ? l.type === 3 ? !1 : "" : n : (t = l.attributeName, r = l.attributeNamespace, n === null ? e.removeAttribute(t) : (l = l.type, n = l === 3 || l === 4 && n === !0 ? "" : "" + n, r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
var et = fd.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, hr = Symbol.for("react.element"), It = Symbol.for("react.portal"), Ut = Symbol.for("react.fragment"), ho = Symbol.for("react.strict_mode"), ui = Symbol.for("react.profiler"), Fa = Symbol.for("react.provider"), Ia = Symbol.for("react.context"), mo = Symbol.for("react.forward_ref"), ci = Symbol.for("react.suspense"), di = Symbol.for("react.suspense_list"), go = Symbol.for("react.memo"), nt = Symbol.for("react.lazy"), Ua = Symbol.for("react.offscreen"), ds = Symbol.iterator;
function vn(e) {
  return e === null || typeof e != "object" ? null : (e = ds && e[ds] || e["@@iterator"], typeof e == "function" ? e : null);
}
var H = Object.assign, Ml;
function Nn(e) {
  if (Ml === void 0) try {
    throw Error();
  } catch (n) {
    var t = n.stack.trim().match(/\n( *(at )?)/);
    Ml = t && t[1] || "";
  }
  return `
` + Ml + e;
}
var Dl = !1;
function Fl(e, t) {
  if (!e || Dl) return "";
  Dl = !0;
  var n = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    if (t) if (t = function() {
      throw Error();
    }, Object.defineProperty(t.prototype, "props", { set: function() {
      throw Error();
    } }), typeof Reflect == "object" && Reflect.construct) {
      try {
        Reflect.construct(t, []);
      } catch (c) {
        var r = c;
      }
      Reflect.construct(e, [], t);
    } else {
      try {
        t.call();
      } catch (c) {
        r = c;
      }
      e.call(t.prototype);
    }
    else {
      try {
        throw Error();
      } catch (c) {
        r = c;
      }
      e();
    }
  } catch (c) {
    if (c && r && typeof c.stack == "string") {
      for (var l = c.stack.split(`
`), i = r.stack.split(`
`), o = l.length - 1, a = i.length - 1; 1 <= o && 0 <= a && l[o] !== i[a]; ) a--;
      for (; 1 <= o && 0 <= a; o--, a--) if (l[o] !== i[a]) {
        if (o !== 1 || a !== 1)
          do
            if (o--, a--, 0 > a || l[o] !== i[a]) {
              var u = `
` + l[o].replace(" at new ", " at ");
              return e.displayName && u.includes("<anonymous>") && (u = u.replace("<anonymous>", e.displayName)), u;
            }
          while (1 <= o && 0 <= a);
        break;
      }
    }
  } finally {
    Dl = !1, Error.prepareStackTrace = n;
  }
  return (e = e ? e.displayName || e.name : "") ? Nn(e) : "";
}
function vd(e) {
  switch (e.tag) {
    case 5:
      return Nn(e.type);
    case 16:
      return Nn("Lazy");
    case 13:
      return Nn("Suspense");
    case 19:
      return Nn("SuspenseList");
    case 0:
    case 2:
    case 15:
      return e = Fl(e.type, !1), e;
    case 11:
      return e = Fl(e.type.render, !1), e;
    case 1:
      return e = Fl(e.type, !0), e;
    default:
      return "";
  }
}
function fi(e) {
  if (e == null) return null;
  if (typeof e == "function") return e.displayName || e.name || null;
  if (typeof e == "string") return e;
  switch (e) {
    case Ut:
      return "Fragment";
    case It:
      return "Portal";
    case ui:
      return "Profiler";
    case ho:
      return "StrictMode";
    case ci:
      return "Suspense";
    case di:
      return "SuspenseList";
  }
  if (typeof e == "object") switch (e.$$typeof) {
    case Ia:
      return (e.displayName || "Context") + ".Consumer";
    case Fa:
      return (e._context.displayName || "Context") + ".Provider";
    case mo:
      var t = e.render;
      return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
    case go:
      return t = e.displayName || null, t !== null ? t : fi(e.type) || "Memo";
    case nt:
      t = e._payload, e = e._init;
      try {
        return fi(e(t));
      } catch {
      }
  }
  return null;
}
function xd(e) {
  var t = e.type;
  switch (e.tag) {
    case 24:
      return "Cache";
    case 9:
      return (t.displayName || "Context") + ".Consumer";
    case 10:
      return (t._context.displayName || "Context") + ".Provider";
    case 18:
      return "DehydratedFragment";
    case 11:
      return e = t.render, e = e.displayName || e.name || "", t.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef");
    case 7:
      return "Fragment";
    case 5:
      return t;
    case 4:
      return "Portal";
    case 3:
      return "Root";
    case 6:
      return "Text";
    case 16:
      return fi(t);
    case 8:
      return t === ho ? "StrictMode" : "Mode";
    case 22:
      return "Offscreen";
    case 12:
      return "Profiler";
    case 21:
      return "Scope";
    case 13:
      return "Suspense";
    case 19:
      return "SuspenseList";
    case 25:
      return "TracingMarker";
    case 1:
    case 0:
    case 17:
    case 2:
    case 14:
    case 15:
      if (typeof t == "function") return t.displayName || t.name || null;
      if (typeof t == "string") return t;
  }
  return null;
}
function gt(e) {
  switch (typeof e) {
    case "boolean":
    case "number":
    case "string":
    case "undefined":
      return e;
    case "object":
      return e;
    default:
      return "";
  }
}
function Aa(e) {
  var t = e.type;
  return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
}
function yd(e) {
  var t = Aa(e) ? "checked" : "value", n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t), r = "" + e[t];
  if (!e.hasOwnProperty(t) && typeof n < "u" && typeof n.get == "function" && typeof n.set == "function") {
    var l = n.get, i = n.set;
    return Object.defineProperty(e, t, { configurable: !0, get: function() {
      return l.call(this);
    }, set: function(o) {
      r = "" + o, i.call(this, o);
    } }), Object.defineProperty(e, t, { enumerable: n.enumerable }), { getValue: function() {
      return r;
    }, setValue: function(o) {
      r = "" + o;
    }, stopTracking: function() {
      e._valueTracker = null, delete e[t];
    } };
  }
}
function mr(e) {
  e._valueTracker || (e._valueTracker = yd(e));
}
function Ba(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(), r = "";
  return e && (r = Aa(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n ? (t.setValue(e), !0) : !1;
}
function Wr(e) {
  if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function pi(e, t) {
  var n = t.checked;
  return H({}, t, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: n ?? e._wrapperState.initialChecked });
}
function fs(e, t) {
  var n = t.defaultValue == null ? "" : t.defaultValue, r = t.checked != null ? t.checked : t.defaultChecked;
  n = gt(t.value != null ? t.value : n), e._wrapperState = { initialChecked: r, initialValue: n, controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null };
}
function Wa(e, t) {
  t = t.checked, t != null && po(e, "checked", t, !1);
}
function hi(e, t) {
  Wa(e, t);
  var n = gt(t.value), r = t.type;
  if (n != null) r === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + n) : e.value !== "" + n && (e.value = "" + n);
  else if (r === "submit" || r === "reset") {
    e.removeAttribute("value");
    return;
  }
  t.hasOwnProperty("value") ? mi(e, t.type, n) : t.hasOwnProperty("defaultValue") && mi(e, t.type, gt(t.defaultValue)), t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked);
}
function ps(e, t, n) {
  if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
    var r = t.type;
    if (!(r !== "submit" && r !== "reset" || t.value !== void 0 && t.value !== null)) return;
    t = "" + e._wrapperState.initialValue, n || t === e.value || (e.value = t), e.defaultValue = t;
  }
  n = e.name, n !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, n !== "" && (e.name = n);
}
function mi(e, t, n) {
  (t !== "number" || Wr(e.ownerDocument) !== e) && (n == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
}
var Cn = Array.isArray;
function Xt(e, t, n, r) {
  if (e = e.options, t) {
    t = {};
    for (var l = 0; l < n.length; l++) t["$" + n[l]] = !0;
    for (n = 0; n < e.length; n++) l = t.hasOwnProperty("$" + e[n].value), e[n].selected !== l && (e[n].selected = l), l && r && (e[n].defaultSelected = !0);
  } else {
    for (n = "" + gt(n), t = null, l = 0; l < e.length; l++) {
      if (e[l].value === n) {
        e[l].selected = !0, r && (e[l].defaultSelected = !0);
        return;
      }
      t !== null || e[l].disabled || (t = e[l]);
    }
    t !== null && (t.selected = !0);
  }
}
function gi(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(C(91));
  return H({}, t, { value: void 0, defaultValue: void 0, children: "" + e._wrapperState.initialValue });
}
function hs(e, t) {
  var n = t.value;
  if (n == null) {
    if (n = t.children, t = t.defaultValue, n != null) {
      if (t != null) throw Error(C(92));
      if (Cn(n)) {
        if (1 < n.length) throw Error(C(93));
        n = n[0];
      }
      t = n;
    }
    t == null && (t = ""), n = t;
  }
  e._wrapperState = { initialValue: gt(n) };
}
function Va(e, t) {
  var n = gt(t.value), r = gt(t.defaultValue);
  n != null && (n = "" + n, n !== e.value && (e.value = n), t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)), r != null && (e.defaultValue = "" + r);
}
function ms(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
}
function Qa(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function vi(e, t) {
  return e == null || e === "http://www.w3.org/1999/xhtml" ? Qa(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e;
}
var gr, Ha = function(e) {
  return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, n, r, l) {
    MSApp.execUnsafeLocalFunction(function() {
      return e(t, n, r, l);
    });
  } : e;
}(function(e, t) {
  if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e) e.innerHTML = t;
  else {
    for (gr = gr || document.createElement("div"), gr.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>", t = gr.firstChild; e.firstChild; ) e.removeChild(e.firstChild);
    for (; t.firstChild; ) e.appendChild(t.firstChild);
  }
});
function Un(e, t) {
  if (t) {
    var n = e.firstChild;
    if (n && n === e.lastChild && n.nodeType === 3) {
      n.nodeValue = t;
      return;
    }
  }
  e.textContent = t;
}
var zn = {
  animationIterationCount: !0,
  aspectRatio: !0,
  borderImageOutset: !0,
  borderImageSlice: !0,
  borderImageWidth: !0,
  boxFlex: !0,
  boxFlexGroup: !0,
  boxOrdinalGroup: !0,
  columnCount: !0,
  columns: !0,
  flex: !0,
  flexGrow: !0,
  flexPositive: !0,
  flexShrink: !0,
  flexNegative: !0,
  flexOrder: !0,
  gridArea: !0,
  gridRow: !0,
  gridRowEnd: !0,
  gridRowSpan: !0,
  gridRowStart: !0,
  gridColumn: !0,
  gridColumnEnd: !0,
  gridColumnSpan: !0,
  gridColumnStart: !0,
  fontWeight: !0,
  lineClamp: !0,
  lineHeight: !0,
  opacity: !0,
  order: !0,
  orphans: !0,
  tabSize: !0,
  widows: !0,
  zIndex: !0,
  zoom: !0,
  fillOpacity: !0,
  floodOpacity: !0,
  stopOpacity: !0,
  strokeDasharray: !0,
  strokeDashoffset: !0,
  strokeMiterlimit: !0,
  strokeOpacity: !0,
  strokeWidth: !0
}, wd = ["Webkit", "ms", "Moz", "O"];
Object.keys(zn).forEach(function(e) {
  wd.forEach(function(t) {
    t = t + e.charAt(0).toUpperCase() + e.substring(1), zn[t] = zn[e];
  });
});
function Ka(e, t, n) {
  return t == null || typeof t == "boolean" || t === "" ? "" : n || typeof t != "number" || t === 0 || zn.hasOwnProperty(e) && zn[e] ? ("" + t).trim() : t + "px";
}
function Ga(e, t) {
  e = e.style;
  for (var n in t) if (t.hasOwnProperty(n)) {
    var r = n.indexOf("--") === 0, l = Ka(n, t[n], r);
    n === "float" && (n = "cssFloat"), r ? e.setProperty(n, l) : e[n] = l;
  }
}
var kd = H({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
function xi(e, t) {
  if (t) {
    if (kd[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(C(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(C(60));
      if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML)) throw Error(C(61));
    }
    if (t.style != null && typeof t.style != "object") throw Error(C(62));
  }
}
function yi(e, t) {
  if (e.indexOf("-") === -1) return typeof t.is == "string";
  switch (e) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return !1;
    default:
      return !0;
  }
}
var wi = null;
function vo(e) {
  return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
}
var ki = null, Jt = null, qt = null;
function gs(e) {
  if (e = ar(e)) {
    if (typeof ki != "function") throw Error(C(280));
    var t = e.stateNode;
    t && (t = xl(t), ki(e.stateNode, e.type, t));
  }
}
function Ya(e) {
  Jt ? qt ? qt.push(e) : qt = [e] : Jt = e;
}
function Za() {
  if (Jt) {
    var e = Jt, t = qt;
    if (qt = Jt = null, gs(e), t) for (e = 0; e < t.length; e++) gs(t[e]);
  }
}
function Xa(e, t) {
  return e(t);
}
function Ja() {
}
var Il = !1;
function qa(e, t, n) {
  if (Il) return e(t, n);
  Il = !0;
  try {
    return Xa(e, t, n);
  } finally {
    Il = !1, (Jt !== null || qt !== null) && (Ja(), Za());
  }
}
function An(e, t) {
  var n = e.stateNode;
  if (n === null) return null;
  var r = xl(n);
  if (r === null) return null;
  n = r[t];
  e: switch (t) {
    case "onClick":
    case "onClickCapture":
    case "onDoubleClick":
    case "onDoubleClickCapture":
    case "onMouseDown":
    case "onMouseDownCapture":
    case "onMouseMove":
    case "onMouseMoveCapture":
    case "onMouseUp":
    case "onMouseUpCapture":
    case "onMouseEnter":
      (r = !r.disabled) || (e = e.type, r = !(e === "button" || e === "input" || e === "select" || e === "textarea")), e = !r;
      break e;
    default:
      e = !1;
  }
  if (e) return null;
  if (n && typeof n != "function") throw Error(C(231, t, typeof n));
  return n;
}
var Si = !1;
if (Ze) try {
  var xn = {};
  Object.defineProperty(xn, "passive", { get: function() {
    Si = !0;
  } }), window.addEventListener("test", xn, xn), window.removeEventListener("test", xn, xn);
} catch {
  Si = !1;
}
function Sd(e, t, n, r, l, i, o, a, u) {
  var c = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, c);
  } catch (h) {
    this.onError(h);
  }
}
var $n = !1, Vr = null, Qr = !1, ji = null, jd = { onError: function(e) {
  $n = !0, Vr = e;
} };
function _d(e, t, n, r, l, i, o, a, u) {
  $n = !1, Vr = null, Sd.apply(jd, arguments);
}
function Nd(e, t, n, r, l, i, o, a, u) {
  if (_d.apply(this, arguments), $n) {
    if ($n) {
      var c = Vr;
      $n = !1, Vr = null;
    } else throw Error(C(198));
    Qr || (Qr = !0, ji = c);
  }
}
function Dt(e) {
  var t = e, n = e;
  if (e.alternate) for (; t.return; ) t = t.return;
  else {
    e = t;
    do
      t = e, t.flags & 4098 && (n = t.return), e = t.return;
    while (e);
  }
  return t.tag === 3 ? n : null;
}
function eu(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
  }
  return null;
}
function vs(e) {
  if (Dt(e) !== e) throw Error(C(188));
}
function Cd(e) {
  var t = e.alternate;
  if (!t) {
    if (t = Dt(e), t === null) throw Error(C(188));
    return t !== e ? null : e;
  }
  for (var n = e, r = t; ; ) {
    var l = n.return;
    if (l === null) break;
    var i = l.alternate;
    if (i === null) {
      if (r = l.return, r !== null) {
        n = r;
        continue;
      }
      break;
    }
    if (l.child === i.child) {
      for (i = l.child; i; ) {
        if (i === n) return vs(l), e;
        if (i === r) return vs(l), t;
        i = i.sibling;
      }
      throw Error(C(188));
    }
    if (n.return !== r.return) n = l, r = i;
    else {
      for (var o = !1, a = l.child; a; ) {
        if (a === n) {
          o = !0, n = l, r = i;
          break;
        }
        if (a === r) {
          o = !0, r = l, n = i;
          break;
        }
        a = a.sibling;
      }
      if (!o) {
        for (a = i.child; a; ) {
          if (a === n) {
            o = !0, n = i, r = l;
            break;
          }
          if (a === r) {
            o = !0, r = i, n = l;
            break;
          }
          a = a.sibling;
        }
        if (!o) throw Error(C(189));
      }
    }
    if (n.alternate !== r) throw Error(C(190));
  }
  if (n.tag !== 3) throw Error(C(188));
  return n.stateNode.current === n ? e : t;
}
function tu(e) {
  return e = Cd(e), e !== null ? nu(e) : null;
}
function nu(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var t = nu(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var ru = Se.unstable_scheduleCallback, xs = Se.unstable_cancelCallback, Ed = Se.unstable_shouldYield, bd = Se.unstable_requestPaint, Y = Se.unstable_now, zd = Se.unstable_getCurrentPriorityLevel, xo = Se.unstable_ImmediatePriority, lu = Se.unstable_UserBlockingPriority, Hr = Se.unstable_NormalPriority, $d = Se.unstable_LowPriority, iu = Se.unstable_IdlePriority, hl = null, Ae = null;
function Pd(e) {
  if (Ae && typeof Ae.onCommitFiberRoot == "function") try {
    Ae.onCommitFiberRoot(hl, e, void 0, (e.current.flags & 128) === 128);
  } catch {
  }
}
var Oe = Math.clz32 ? Math.clz32 : Ld, Td = Math.log, Rd = Math.LN2;
function Ld(e) {
  return e >>>= 0, e === 0 ? 32 : 31 - (Td(e) / Rd | 0) | 0;
}
var vr = 64, xr = 4194304;
function En(e) {
  switch (e & -e) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 4:
      return 4;
    case 8:
      return 8;
    case 16:
      return 16;
    case 32:
      return 32;
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return e & 4194240;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return e & 130023424;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 1073741824;
    default:
      return e;
  }
}
function Kr(e, t) {
  var n = e.pendingLanes;
  if (n === 0) return 0;
  var r = 0, l = e.suspendedLanes, i = e.pingedLanes, o = n & 268435455;
  if (o !== 0) {
    var a = o & ~l;
    a !== 0 ? r = En(a) : (i &= o, i !== 0 && (r = En(i)));
  } else o = n & ~l, o !== 0 ? r = En(o) : i !== 0 && (r = En(i));
  if (r === 0) return 0;
  if (t !== 0 && t !== r && !(t & l) && (l = r & -r, i = t & -t, l >= i || l === 16 && (i & 4194240) !== 0)) return t;
  if (r & 4 && (r |= n & 16), t = e.entangledLanes, t !== 0) for (e = e.entanglements, t &= r; 0 < t; ) n = 31 - Oe(t), l = 1 << n, r |= e[n], t &= ~l;
  return r;
}
function Od(e, t) {
  switch (e) {
    case 1:
    case 2:
    case 4:
      return t + 250;
    case 8:
    case 16:
    case 32:
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return t + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return -1;
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1;
    default:
      return -1;
  }
}
function Md(e, t) {
  for (var n = e.suspendedLanes, r = e.pingedLanes, l = e.expirationTimes, i = e.pendingLanes; 0 < i; ) {
    var o = 31 - Oe(i), a = 1 << o, u = l[o];
    u === -1 ? (!(a & n) || a & r) && (l[o] = Od(a, t)) : u <= t && (e.expiredLanes |= a), i &= ~a;
  }
}
function _i(e) {
  return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
}
function ou() {
  var e = vr;
  return vr <<= 1, !(vr & 4194240) && (vr = 64), e;
}
function Ul(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t;
}
function or(e, t, n) {
  e.pendingLanes |= t, t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, t = 31 - Oe(t), e[t] = n;
}
function Dd(e, t) {
  var n = e.pendingLanes & ~t;
  e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
  var r = e.eventTimes;
  for (e = e.expirationTimes; 0 < n; ) {
    var l = 31 - Oe(n), i = 1 << l;
    t[l] = 0, r[l] = -1, e[l] = -1, n &= ~i;
  }
}
function yo(e, t) {
  var n = e.entangledLanes |= t;
  for (e = e.entanglements; n; ) {
    var r = 31 - Oe(n), l = 1 << r;
    l & t | e[r] & t && (e[r] |= t), n &= ~l;
  }
}
var I = 0;
function su(e) {
  return e &= -e, 1 < e ? 4 < e ? e & 268435455 ? 16 : 536870912 : 4 : 1;
}
var au, wo, uu, cu, du, Ni = !1, yr = [], at = null, ut = null, ct = null, Bn = /* @__PURE__ */ new Map(), Wn = /* @__PURE__ */ new Map(), lt = [], Fd = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function ys(e, t) {
  switch (e) {
    case "focusin":
    case "focusout":
      at = null;
      break;
    case "dragenter":
    case "dragleave":
      ut = null;
      break;
    case "mouseover":
    case "mouseout":
      ct = null;
      break;
    case "pointerover":
    case "pointerout":
      Bn.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      Wn.delete(t.pointerId);
  }
}
function yn(e, t, n, r, l, i) {
  return e === null || e.nativeEvent !== i ? (e = { blockedOn: t, domEventName: n, eventSystemFlags: r, nativeEvent: i, targetContainers: [l] }, t !== null && (t = ar(t), t !== null && wo(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, l !== null && t.indexOf(l) === -1 && t.push(l), e);
}
function Id(e, t, n, r, l) {
  switch (t) {
    case "focusin":
      return at = yn(at, e, t, n, r, l), !0;
    case "dragenter":
      return ut = yn(ut, e, t, n, r, l), !0;
    case "mouseover":
      return ct = yn(ct, e, t, n, r, l), !0;
    case "pointerover":
      var i = l.pointerId;
      return Bn.set(i, yn(Bn.get(i) || null, e, t, n, r, l)), !0;
    case "gotpointercapture":
      return i = l.pointerId, Wn.set(i, yn(Wn.get(i) || null, e, t, n, r, l)), !0;
  }
  return !1;
}
function fu(e) {
  var t = Nt(e.target);
  if (t !== null) {
    var n = Dt(t);
    if (n !== null) {
      if (t = n.tag, t === 13) {
        if (t = eu(n), t !== null) {
          e.blockedOn = t, du(e.priority, function() {
            uu(n);
          });
          return;
        }
      } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
        e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
        return;
      }
    }
  }
  e.blockedOn = null;
}
function Tr(e) {
  if (e.blockedOn !== null) return !1;
  for (var t = e.targetContainers; 0 < t.length; ) {
    var n = Ci(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var r = new n.constructor(n.type, n);
      wi = r, n.target.dispatchEvent(r), wi = null;
    } else return t = ar(n), t !== null && wo(t), e.blockedOn = n, !1;
    t.shift();
  }
  return !0;
}
function ws(e, t, n) {
  Tr(e) && n.delete(t);
}
function Ud() {
  Ni = !1, at !== null && Tr(at) && (at = null), ut !== null && Tr(ut) && (ut = null), ct !== null && Tr(ct) && (ct = null), Bn.forEach(ws), Wn.forEach(ws);
}
function wn(e, t) {
  e.blockedOn === t && (e.blockedOn = null, Ni || (Ni = !0, Se.unstable_scheduleCallback(Se.unstable_NormalPriority, Ud)));
}
function Vn(e) {
  function t(l) {
    return wn(l, e);
  }
  if (0 < yr.length) {
    wn(yr[0], e);
    for (var n = 1; n < yr.length; n++) {
      var r = yr[n];
      r.blockedOn === e && (r.blockedOn = null);
    }
  }
  for (at !== null && wn(at, e), ut !== null && wn(ut, e), ct !== null && wn(ct, e), Bn.forEach(t), Wn.forEach(t), n = 0; n < lt.length; n++) r = lt[n], r.blockedOn === e && (r.blockedOn = null);
  for (; 0 < lt.length && (n = lt[0], n.blockedOn === null); ) fu(n), n.blockedOn === null && lt.shift();
}
var en = et.ReactCurrentBatchConfig, Gr = !0;
function Ad(e, t, n, r) {
  var l = I, i = en.transition;
  en.transition = null;
  try {
    I = 1, ko(e, t, n, r);
  } finally {
    I = l, en.transition = i;
  }
}
function Bd(e, t, n, r) {
  var l = I, i = en.transition;
  en.transition = null;
  try {
    I = 4, ko(e, t, n, r);
  } finally {
    I = l, en.transition = i;
  }
}
function ko(e, t, n, r) {
  if (Gr) {
    var l = Ci(e, t, n, r);
    if (l === null) Zl(e, t, r, Yr, n), ys(e, r);
    else if (Id(l, e, t, n, r)) r.stopPropagation();
    else if (ys(e, r), t & 4 && -1 < Fd.indexOf(e)) {
      for (; l !== null; ) {
        var i = ar(l);
        if (i !== null && au(i), i = Ci(e, t, n, r), i === null && Zl(e, t, r, Yr, n), i === l) break;
        l = i;
      }
      l !== null && r.stopPropagation();
    } else Zl(e, t, r, null, n);
  }
}
var Yr = null;
function Ci(e, t, n, r) {
  if (Yr = null, e = vo(r), e = Nt(e), e !== null) if (t = Dt(e), t === null) e = null;
  else if (n = t.tag, n === 13) {
    if (e = eu(t), e !== null) return e;
    e = null;
  } else if (n === 3) {
    if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
    e = null;
  } else t !== e && (e = null);
  return Yr = e, null;
}
function pu(e) {
  switch (e) {
    case "cancel":
    case "click":
    case "close":
    case "contextmenu":
    case "copy":
    case "cut":
    case "auxclick":
    case "dblclick":
    case "dragend":
    case "dragstart":
    case "drop":
    case "focusin":
    case "focusout":
    case "input":
    case "invalid":
    case "keydown":
    case "keypress":
    case "keyup":
    case "mousedown":
    case "mouseup":
    case "paste":
    case "pause":
    case "play":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
    case "ratechange":
    case "reset":
    case "resize":
    case "seeked":
    case "submit":
    case "touchcancel":
    case "touchend":
    case "touchstart":
    case "volumechange":
    case "change":
    case "selectionchange":
    case "textInput":
    case "compositionstart":
    case "compositionend":
    case "compositionupdate":
    case "beforeblur":
    case "afterblur":
    case "beforeinput":
    case "blur":
    case "fullscreenchange":
    case "focus":
    case "hashchange":
    case "popstate":
    case "select":
    case "selectstart":
      return 1;
    case "drag":
    case "dragenter":
    case "dragexit":
    case "dragleave":
    case "dragover":
    case "mousemove":
    case "mouseout":
    case "mouseover":
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "scroll":
    case "toggle":
    case "touchmove":
    case "wheel":
    case "mouseenter":
    case "mouseleave":
    case "pointerenter":
    case "pointerleave":
      return 4;
    case "message":
      switch (zd()) {
        case xo:
          return 1;
        case lu:
          return 4;
        case Hr:
        case $d:
          return 16;
        case iu:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var ot = null, So = null, Rr = null;
function hu() {
  if (Rr) return Rr;
  var e, t = So, n = t.length, r, l = "value" in ot ? ot.value : ot.textContent, i = l.length;
  for (e = 0; e < n && t[e] === l[e]; e++) ;
  var o = n - e;
  for (r = 1; r <= o && t[n - r] === l[i - r]; r++) ;
  return Rr = l.slice(e, 1 < r ? 1 - r : void 0);
}
function Lr(e) {
  var t = e.keyCode;
  return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
}
function wr() {
  return !0;
}
function ks() {
  return !1;
}
function _e(e) {
  function t(n, r, l, i, o) {
    this._reactName = n, this._targetInst = l, this.type = r, this.nativeEvent = i, this.target = o, this.currentTarget = null;
    for (var a in e) e.hasOwnProperty(a) && (n = e[a], this[a] = n ? n(i) : i[a]);
    return this.isDefaultPrevented = (i.defaultPrevented != null ? i.defaultPrevented : i.returnValue === !1) ? wr : ks, this.isPropagationStopped = ks, this;
  }
  return H(t.prototype, { preventDefault: function() {
    this.defaultPrevented = !0;
    var n = this.nativeEvent;
    n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = wr);
  }, stopPropagation: function() {
    var n = this.nativeEvent;
    n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = wr);
  }, persist: function() {
  }, isPersistent: wr }), t;
}
var pn = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(e) {
  return e.timeStamp || Date.now();
}, defaultPrevented: 0, isTrusted: 0 }, jo = _e(pn), sr = H({}, pn, { view: 0, detail: 0 }), Wd = _e(sr), Al, Bl, kn, ml = H({}, sr, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: _o, button: 0, buttons: 0, relatedTarget: function(e) {
  return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
}, movementX: function(e) {
  return "movementX" in e ? e.movementX : (e !== kn && (kn && e.type === "mousemove" ? (Al = e.screenX - kn.screenX, Bl = e.screenY - kn.screenY) : Bl = Al = 0, kn = e), Al);
}, movementY: function(e) {
  return "movementY" in e ? e.movementY : Bl;
} }), Ss = _e(ml), Vd = H({}, ml, { dataTransfer: 0 }), Qd = _e(Vd), Hd = H({}, sr, { relatedTarget: 0 }), Wl = _e(Hd), Kd = H({}, pn, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Gd = _e(Kd), Yd = H({}, pn, { clipboardData: function(e) {
  return "clipboardData" in e ? e.clipboardData : window.clipboardData;
} }), Zd = _e(Yd), Xd = H({}, pn, { data: 0 }), js = _e(Xd), Jd = {
  Esc: "Escape",
  Spacebar: " ",
  Left: "ArrowLeft",
  Up: "ArrowUp",
  Right: "ArrowRight",
  Down: "ArrowDown",
  Del: "Delete",
  Win: "OS",
  Menu: "ContextMenu",
  Apps: "ContextMenu",
  Scroll: "ScrollLock",
  MozPrintableKey: "Unidentified"
}, qd = {
  8: "Backspace",
  9: "Tab",
  12: "Clear",
  13: "Enter",
  16: "Shift",
  17: "Control",
  18: "Alt",
  19: "Pause",
  20: "CapsLock",
  27: "Escape",
  32: " ",
  33: "PageUp",
  34: "PageDown",
  35: "End",
  36: "Home",
  37: "ArrowLeft",
  38: "ArrowUp",
  39: "ArrowRight",
  40: "ArrowDown",
  45: "Insert",
  46: "Delete",
  112: "F1",
  113: "F2",
  114: "F3",
  115: "F4",
  116: "F5",
  117: "F6",
  118: "F7",
  119: "F8",
  120: "F9",
  121: "F10",
  122: "F11",
  123: "F12",
  144: "NumLock",
  145: "ScrollLock",
  224: "Meta"
}, ef = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function tf(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = ef[e]) ? !!t[e] : !1;
}
function _o() {
  return tf;
}
var nf = H({}, sr, { key: function(e) {
  if (e.key) {
    var t = Jd[e.key] || e.key;
    if (t !== "Unidentified") return t;
  }
  return e.type === "keypress" ? (e = Lr(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? qd[e.keyCode] || "Unidentified" : "";
}, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: _o, charCode: function(e) {
  return e.type === "keypress" ? Lr(e) : 0;
}, keyCode: function(e) {
  return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
}, which: function(e) {
  return e.type === "keypress" ? Lr(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
} }), rf = _e(nf), lf = H({}, ml, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), _s = _e(lf), of = H({}, sr, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: _o }), sf = _e(of), af = H({}, pn, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), uf = _e(af), cf = H({}, ml, {
  deltaX: function(e) {
    return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
  },
  deltaY: function(e) {
    return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), df = _e(cf), ff = [9, 13, 27, 32], No = Ze && "CompositionEvent" in window, Pn = null;
Ze && "documentMode" in document && (Pn = document.documentMode);
var pf = Ze && "TextEvent" in window && !Pn, mu = Ze && (!No || Pn && 8 < Pn && 11 >= Pn), Ns = " ", Cs = !1;
function gu(e, t) {
  switch (e) {
    case "keyup":
      return ff.indexOf(t.keyCode) !== -1;
    case "keydown":
      return t.keyCode !== 229;
    case "keypress":
    case "mousedown":
    case "focusout":
      return !0;
    default:
      return !1;
  }
}
function vu(e) {
  return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
}
var At = !1;
function hf(e, t) {
  switch (e) {
    case "compositionend":
      return vu(t);
    case "keypress":
      return t.which !== 32 ? null : (Cs = !0, Ns);
    case "textInput":
      return e = t.data, e === Ns && Cs ? null : e;
    default:
      return null;
  }
}
function mf(e, t) {
  if (At) return e === "compositionend" || !No && gu(e, t) ? (e = hu(), Rr = So = ot = null, At = !1, e) : null;
  switch (e) {
    case "paste":
      return null;
    case "keypress":
      if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
        if (t.char && 1 < t.char.length) return t.char;
        if (t.which) return String.fromCharCode(t.which);
      }
      return null;
    case "compositionend":
      return mu && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var gf = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
function Es(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!gf[e.type] : t === "textarea";
}
function xu(e, t, n, r) {
  Ya(r), t = Zr(t, "onChange"), 0 < t.length && (n = new jo("onChange", "change", null, n, r), e.push({ event: n, listeners: t }));
}
var Tn = null, Qn = null;
function vf(e) {
  zu(e, 0);
}
function gl(e) {
  var t = Vt(e);
  if (Ba(t)) return e;
}
function xf(e, t) {
  if (e === "change") return t;
}
var yu = !1;
if (Ze) {
  var Vl;
  if (Ze) {
    var Ql = "oninput" in document;
    if (!Ql) {
      var bs = document.createElement("div");
      bs.setAttribute("oninput", "return;"), Ql = typeof bs.oninput == "function";
    }
    Vl = Ql;
  } else Vl = !1;
  yu = Vl && (!document.documentMode || 9 < document.documentMode);
}
function zs() {
  Tn && (Tn.detachEvent("onpropertychange", wu), Qn = Tn = null);
}
function wu(e) {
  if (e.propertyName === "value" && gl(Qn)) {
    var t = [];
    xu(t, Qn, e, vo(e)), qa(vf, t);
  }
}
function yf(e, t, n) {
  e === "focusin" ? (zs(), Tn = t, Qn = n, Tn.attachEvent("onpropertychange", wu)) : e === "focusout" && zs();
}
function wf(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown") return gl(Qn);
}
function kf(e, t) {
  if (e === "click") return gl(t);
}
function Sf(e, t) {
  if (e === "input" || e === "change") return gl(t);
}
function jf(e, t) {
  return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
}
var De = typeof Object.is == "function" ? Object.is : jf;
function Hn(e, t) {
  if (De(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null) return !1;
  var n = Object.keys(e), r = Object.keys(t);
  if (n.length !== r.length) return !1;
  for (r = 0; r < n.length; r++) {
    var l = n[r];
    if (!ai.call(t, l) || !De(e[l], t[l])) return !1;
  }
  return !0;
}
function $s(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function Ps(e, t) {
  var n = $s(e);
  e = 0;
  for (var r; n; ) {
    if (n.nodeType === 3) {
      if (r = e + n.textContent.length, e <= t && r >= t) return { node: n, offset: t - e };
      e = r;
    }
    e: {
      for (; n; ) {
        if (n.nextSibling) {
          n = n.nextSibling;
          break e;
        }
        n = n.parentNode;
      }
      n = void 0;
    }
    n = $s(n);
  }
}
function ku(e, t) {
  return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? ku(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
}
function Su() {
  for (var e = window, t = Wr(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var n = typeof t.contentWindow.location.href == "string";
    } catch {
      n = !1;
    }
    if (n) e = t.contentWindow;
    else break;
    t = Wr(e.document);
  }
  return t;
}
function Co(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
}
function _f(e) {
  var t = Su(), n = e.focusedElem, r = e.selectionRange;
  if (t !== n && n && n.ownerDocument && ku(n.ownerDocument.documentElement, n)) {
    if (r !== null && Co(n)) {
      if (t = r.start, e = r.end, e === void 0 && (e = t), "selectionStart" in n) n.selectionStart = t, n.selectionEnd = Math.min(e, n.value.length);
      else if (e = (t = n.ownerDocument || document) && t.defaultView || window, e.getSelection) {
        e = e.getSelection();
        var l = n.textContent.length, i = Math.min(r.start, l);
        r = r.end === void 0 ? i : Math.min(r.end, l), !e.extend && i > r && (l = r, r = i, i = l), l = Ps(n, i);
        var o = Ps(
          n,
          r
        );
        l && o && (e.rangeCount !== 1 || e.anchorNode !== l.node || e.anchorOffset !== l.offset || e.focusNode !== o.node || e.focusOffset !== o.offset) && (t = t.createRange(), t.setStart(l.node, l.offset), e.removeAllRanges(), i > r ? (e.addRange(t), e.extend(o.node, o.offset)) : (t.setEnd(o.node, o.offset), e.addRange(t)));
      }
    }
    for (t = [], e = n; e = e.parentNode; ) e.nodeType === 1 && t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
    for (typeof n.focus == "function" && n.focus(), n = 0; n < t.length; n++) e = t[n], e.element.scrollLeft = e.left, e.element.scrollTop = e.top;
  }
}
var Nf = Ze && "documentMode" in document && 11 >= document.documentMode, Bt = null, Ei = null, Rn = null, bi = !1;
function Ts(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  bi || Bt == null || Bt !== Wr(r) || (r = Bt, "selectionStart" in r && Co(r) ? r = { start: r.selectionStart, end: r.selectionEnd } : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = { anchorNode: r.anchorNode, anchorOffset: r.anchorOffset, focusNode: r.focusNode, focusOffset: r.focusOffset }), Rn && Hn(Rn, r) || (Rn = r, r = Zr(Ei, "onSelect"), 0 < r.length && (t = new jo("onSelect", "select", null, t, n), e.push({ event: t, listeners: r }), t.target = Bt)));
}
function kr(e, t) {
  var n = {};
  return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
}
var Wt = { animationend: kr("Animation", "AnimationEnd"), animationiteration: kr("Animation", "AnimationIteration"), animationstart: kr("Animation", "AnimationStart"), transitionend: kr("Transition", "TransitionEnd") }, Hl = {}, ju = {};
Ze && (ju = document.createElement("div").style, "AnimationEvent" in window || (delete Wt.animationend.animation, delete Wt.animationiteration.animation, delete Wt.animationstart.animation), "TransitionEvent" in window || delete Wt.transitionend.transition);
function vl(e) {
  if (Hl[e]) return Hl[e];
  if (!Wt[e]) return e;
  var t = Wt[e], n;
  for (n in t) if (t.hasOwnProperty(n) && n in ju) return Hl[e] = t[n];
  return e;
}
var _u = vl("animationend"), Nu = vl("animationiteration"), Cu = vl("animationstart"), Eu = vl("transitionend"), bu = /* @__PURE__ */ new Map(), Rs = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function xt(e, t) {
  bu.set(e, t), Mt(t, [e]);
}
for (var Kl = 0; Kl < Rs.length; Kl++) {
  var Gl = Rs[Kl], Cf = Gl.toLowerCase(), Ef = Gl[0].toUpperCase() + Gl.slice(1);
  xt(Cf, "on" + Ef);
}
xt(_u, "onAnimationEnd");
xt(Nu, "onAnimationIteration");
xt(Cu, "onAnimationStart");
xt("dblclick", "onDoubleClick");
xt("focusin", "onFocus");
xt("focusout", "onBlur");
xt(Eu, "onTransitionEnd");
ln("onMouseEnter", ["mouseout", "mouseover"]);
ln("onMouseLeave", ["mouseout", "mouseover"]);
ln("onPointerEnter", ["pointerout", "pointerover"]);
ln("onPointerLeave", ["pointerout", "pointerover"]);
Mt("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
Mt("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
Mt("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
Mt("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
Mt("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
Mt("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var bn = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), bf = new Set("cancel close invalid load scroll toggle".split(" ").concat(bn));
function Ls(e, t, n) {
  var r = e.type || "unknown-event";
  e.currentTarget = n, Nd(r, t, void 0, e), e.currentTarget = null;
}
function zu(e, t) {
  t = (t & 4) !== 0;
  for (var n = 0; n < e.length; n++) {
    var r = e[n], l = r.event;
    r = r.listeners;
    e: {
      var i = void 0;
      if (t) for (var o = r.length - 1; 0 <= o; o--) {
        var a = r[o], u = a.instance, c = a.currentTarget;
        if (a = a.listener, u !== i && l.isPropagationStopped()) break e;
        Ls(l, a, c), i = u;
      }
      else for (o = 0; o < r.length; o++) {
        if (a = r[o], u = a.instance, c = a.currentTarget, a = a.listener, u !== i && l.isPropagationStopped()) break e;
        Ls(l, a, c), i = u;
      }
    }
  }
  if (Qr) throw e = ji, Qr = !1, ji = null, e;
}
function A(e, t) {
  var n = t[Ri];
  n === void 0 && (n = t[Ri] = /* @__PURE__ */ new Set());
  var r = e + "__bubble";
  n.has(r) || ($u(t, e, 2, !1), n.add(r));
}
function Yl(e, t, n) {
  var r = 0;
  t && (r |= 4), $u(n, e, r, t);
}
var Sr = "_reactListening" + Math.random().toString(36).slice(2);
function Kn(e) {
  if (!e[Sr]) {
    e[Sr] = !0, Da.forEach(function(n) {
      n !== "selectionchange" && (bf.has(n) || Yl(n, !1, e), Yl(n, !0, e));
    });
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[Sr] || (t[Sr] = !0, Yl("selectionchange", !1, t));
  }
}
function $u(e, t, n, r) {
  switch (pu(t)) {
    case 1:
      var l = Ad;
      break;
    case 4:
      l = Bd;
      break;
    default:
      l = ko;
  }
  n = l.bind(null, t, n, e), l = void 0, !Si || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (l = !0), r ? l !== void 0 ? e.addEventListener(t, n, { capture: !0, passive: l }) : e.addEventListener(t, n, !0) : l !== void 0 ? e.addEventListener(t, n, { passive: l }) : e.addEventListener(t, n, !1);
}
function Zl(e, t, n, r, l) {
  var i = r;
  if (!(t & 1) && !(t & 2) && r !== null) e: for (; ; ) {
    if (r === null) return;
    var o = r.tag;
    if (o === 3 || o === 4) {
      var a = r.stateNode.containerInfo;
      if (a === l || a.nodeType === 8 && a.parentNode === l) break;
      if (o === 4) for (o = r.return; o !== null; ) {
        var u = o.tag;
        if ((u === 3 || u === 4) && (u = o.stateNode.containerInfo, u === l || u.nodeType === 8 && u.parentNode === l)) return;
        o = o.return;
      }
      for (; a !== null; ) {
        if (o = Nt(a), o === null) return;
        if (u = o.tag, u === 5 || u === 6) {
          r = i = o;
          continue e;
        }
        a = a.parentNode;
      }
    }
    r = r.return;
  }
  qa(function() {
    var c = i, h = vo(n), g = [];
    e: {
      var m = bu.get(e);
      if (m !== void 0) {
        var y = jo, k = e;
        switch (e) {
          case "keypress":
            if (Lr(n) === 0) break e;
          case "keydown":
          case "keyup":
            y = rf;
            break;
          case "focusin":
            k = "focus", y = Wl;
            break;
          case "focusout":
            k = "blur", y = Wl;
            break;
          case "beforeblur":
          case "afterblur":
            y = Wl;
            break;
          case "click":
            if (n.button === 2) break e;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            y = Ss;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            y = Qd;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            y = sf;
            break;
          case _u:
          case Nu:
          case Cu:
            y = Gd;
            break;
          case Eu:
            y = uf;
            break;
          case "scroll":
            y = Wd;
            break;
          case "wheel":
            y = df;
            break;
          case "copy":
          case "cut":
          case "paste":
            y = Zd;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            y = _s;
        }
        var j = (t & 4) !== 0, N = !j && e === "scroll", f = j ? m !== null ? m + "Capture" : null : m;
        j = [];
        for (var d = c, p; d !== null; ) {
          p = d;
          var x = p.stateNode;
          if (p.tag === 5 && x !== null && (p = x, f !== null && (x = An(d, f), x != null && j.push(Gn(d, x, p)))), N) break;
          d = d.return;
        }
        0 < j.length && (m = new y(m, k, null, n, h), g.push({ event: m, listeners: j }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (m = e === "mouseover" || e === "pointerover", y = e === "mouseout" || e === "pointerout", m && n !== wi && (k = n.relatedTarget || n.fromElement) && (Nt(k) || k[Xe])) break e;
        if ((y || m) && (m = h.window === h ? h : (m = h.ownerDocument) ? m.defaultView || m.parentWindow : window, y ? (k = n.relatedTarget || n.toElement, y = c, k = k ? Nt(k) : null, k !== null && (N = Dt(k), k !== N || k.tag !== 5 && k.tag !== 6) && (k = null)) : (y = null, k = c), y !== k)) {
          if (j = Ss, x = "onMouseLeave", f = "onMouseEnter", d = "mouse", (e === "pointerout" || e === "pointerover") && (j = _s, x = "onPointerLeave", f = "onPointerEnter", d = "pointer"), N = y == null ? m : Vt(y), p = k == null ? m : Vt(k), m = new j(x, d + "leave", y, n, h), m.target = N, m.relatedTarget = p, x = null, Nt(h) === c && (j = new j(f, d + "enter", k, n, h), j.target = p, j.relatedTarget = N, x = j), N = x, y && k) t: {
            for (j = y, f = k, d = 0, p = j; p; p = Ft(p)) d++;
            for (p = 0, x = f; x; x = Ft(x)) p++;
            for (; 0 < d - p; ) j = Ft(j), d--;
            for (; 0 < p - d; ) f = Ft(f), p--;
            for (; d--; ) {
              if (j === f || f !== null && j === f.alternate) break t;
              j = Ft(j), f = Ft(f);
            }
            j = null;
          }
          else j = null;
          y !== null && Os(g, m, y, j, !1), k !== null && N !== null && Os(g, N, k, j, !0);
        }
      }
      e: {
        if (m = c ? Vt(c) : window, y = m.nodeName && m.nodeName.toLowerCase(), y === "select" || y === "input" && m.type === "file") var S = xf;
        else if (Es(m)) if (yu) S = Sf;
        else {
          S = wf;
          var _ = yf;
        }
        else (y = m.nodeName) && y.toLowerCase() === "input" && (m.type === "checkbox" || m.type === "radio") && (S = kf);
        if (S && (S = S(e, c))) {
          xu(g, S, n, h);
          break e;
        }
        _ && _(e, m, c), e === "focusout" && (_ = m._wrapperState) && _.controlled && m.type === "number" && mi(m, "number", m.value);
      }
      switch (_ = c ? Vt(c) : window, e) {
        case "focusin":
          (Es(_) || _.contentEditable === "true") && (Bt = _, Ei = c, Rn = null);
          break;
        case "focusout":
          Rn = Ei = Bt = null;
          break;
        case "mousedown":
          bi = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          bi = !1, Ts(g, n, h);
          break;
        case "selectionchange":
          if (Nf) break;
        case "keydown":
        case "keyup":
          Ts(g, n, h);
      }
      var E;
      if (No) e: {
        switch (e) {
          case "compositionstart":
            var v = "onCompositionStart";
            break e;
          case "compositionend":
            v = "onCompositionEnd";
            break e;
          case "compositionupdate":
            v = "onCompositionUpdate";
            break e;
        }
        v = void 0;
      }
      else At ? gu(e, n) && (v = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (v = "onCompositionStart");
      v && (mu && n.locale !== "ko" && (At || v !== "onCompositionStart" ? v === "onCompositionEnd" && At && (E = hu()) : (ot = h, So = "value" in ot ? ot.value : ot.textContent, At = !0)), _ = Zr(c, v), 0 < _.length && (v = new js(v, e, null, n, h), g.push({ event: v, listeners: _ }), E ? v.data = E : (E = vu(n), E !== null && (v.data = E)))), (E = pf ? hf(e, n) : mf(e, n)) && (c = Zr(c, "onBeforeInput"), 0 < c.length && (h = new js("onBeforeInput", "beforeinput", null, n, h), g.push({ event: h, listeners: c }), h.data = E));
    }
    zu(g, t);
  });
}
function Gn(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function Zr(e, t) {
  for (var n = t + "Capture", r = []; e !== null; ) {
    var l = e, i = l.stateNode;
    l.tag === 5 && i !== null && (l = i, i = An(e, n), i != null && r.unshift(Gn(e, i, l)), i = An(e, t), i != null && r.push(Gn(e, i, l))), e = e.return;
  }
  return r;
}
function Ft(e) {
  if (e === null) return null;
  do
    e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function Os(e, t, n, r, l) {
  for (var i = t._reactName, o = []; n !== null && n !== r; ) {
    var a = n, u = a.alternate, c = a.stateNode;
    if (u !== null && u === r) break;
    a.tag === 5 && c !== null && (a = c, l ? (u = An(n, i), u != null && o.unshift(Gn(n, u, a))) : l || (u = An(n, i), u != null && o.push(Gn(n, u, a)))), n = n.return;
  }
  o.length !== 0 && e.push({ event: t, listeners: o });
}
var zf = /\r\n?/g, $f = /\u0000|\uFFFD/g;
function Ms(e) {
  return (typeof e == "string" ? e : "" + e).replace(zf, `
`).replace($f, "");
}
function jr(e, t, n) {
  if (t = Ms(t), Ms(e) !== t && n) throw Error(C(425));
}
function Xr() {
}
var zi = null, $i = null;
function Pi(e, t) {
  return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
}
var Ti = typeof setTimeout == "function" ? setTimeout : void 0, Pf = typeof clearTimeout == "function" ? clearTimeout : void 0, Ds = typeof Promise == "function" ? Promise : void 0, Tf = typeof queueMicrotask == "function" ? queueMicrotask : typeof Ds < "u" ? function(e) {
  return Ds.resolve(null).then(e).catch(Rf);
} : Ti;
function Rf(e) {
  setTimeout(function() {
    throw e;
  });
}
function Xl(e, t) {
  var n = t, r = 0;
  do {
    var l = n.nextSibling;
    if (e.removeChild(n), l && l.nodeType === 8) if (n = l.data, n === "/$") {
      if (r === 0) {
        e.removeChild(l), Vn(t);
        return;
      }
      r--;
    } else n !== "$" && n !== "$?" && n !== "$!" || r++;
    n = l;
  } while (n);
  Vn(t);
}
function dt(e) {
  for (; e != null; e = e.nextSibling) {
    var t = e.nodeType;
    if (t === 1 || t === 3) break;
    if (t === 8) {
      if (t = e.data, t === "$" || t === "$!" || t === "$?") break;
      if (t === "/$") return null;
    }
  }
  return e;
}
function Fs(e) {
  e = e.previousSibling;
  for (var t = 0; e; ) {
    if (e.nodeType === 8) {
      var n = e.data;
      if (n === "$" || n === "$!" || n === "$?") {
        if (t === 0) return e;
        t--;
      } else n === "/$" && t++;
    }
    e = e.previousSibling;
  }
  return null;
}
var hn = Math.random().toString(36).slice(2), Ue = "__reactFiber$" + hn, Yn = "__reactProps$" + hn, Xe = "__reactContainer$" + hn, Ri = "__reactEvents$" + hn, Lf = "__reactListeners$" + hn, Of = "__reactHandles$" + hn;
function Nt(e) {
  var t = e[Ue];
  if (t) return t;
  for (var n = e.parentNode; n; ) {
    if (t = n[Xe] || n[Ue]) {
      if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = Fs(e); e !== null; ) {
        if (n = e[Ue]) return n;
        e = Fs(e);
      }
      return t;
    }
    e = n, n = e.parentNode;
  }
  return null;
}
function ar(e) {
  return e = e[Ue] || e[Xe], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e;
}
function Vt(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(C(33));
}
function xl(e) {
  return e[Yn] || null;
}
var Li = [], Qt = -1;
function yt(e) {
  return { current: e };
}
function B(e) {
  0 > Qt || (e.current = Li[Qt], Li[Qt] = null, Qt--);
}
function U(e, t) {
  Qt++, Li[Qt] = e.current, e.current = t;
}
var vt = {}, ae = yt(vt), me = yt(!1), Pt = vt;
function on(e, t) {
  var n = e.type.contextTypes;
  if (!n) return vt;
  var r = e.stateNode;
  if (r && r.__reactInternalMemoizedUnmaskedChildContext === t) return r.__reactInternalMemoizedMaskedChildContext;
  var l = {}, i;
  for (i in n) l[i] = t[i];
  return r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = t, e.__reactInternalMemoizedMaskedChildContext = l), l;
}
function ge(e) {
  return e = e.childContextTypes, e != null;
}
function Jr() {
  B(me), B(ae);
}
function Is(e, t, n) {
  if (ae.current !== vt) throw Error(C(168));
  U(ae, t), U(me, n);
}
function Pu(e, t, n) {
  var r = e.stateNode;
  if (t = t.childContextTypes, typeof r.getChildContext != "function") return n;
  r = r.getChildContext();
  for (var l in r) if (!(l in t)) throw Error(C(108, xd(e) || "Unknown", l));
  return H({}, n, r);
}
function qr(e) {
  return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || vt, Pt = ae.current, U(ae, e), U(me, me.current), !0;
}
function Us(e, t, n) {
  var r = e.stateNode;
  if (!r) throw Error(C(169));
  n ? (e = Pu(e, t, Pt), r.__reactInternalMemoizedMergedChildContext = e, B(me), B(ae), U(ae, e)) : B(me), U(me, n);
}
var Ve = null, yl = !1, Jl = !1;
function Tu(e) {
  Ve === null ? Ve = [e] : Ve.push(e);
}
function Mf(e) {
  yl = !0, Tu(e);
}
function wt() {
  if (!Jl && Ve !== null) {
    Jl = !0;
    var e = 0, t = I;
    try {
      var n = Ve;
      for (I = 1; e < n.length; e++) {
        var r = n[e];
        do
          r = r(!0);
        while (r !== null);
      }
      Ve = null, yl = !1;
    } catch (l) {
      throw Ve !== null && (Ve = Ve.slice(e + 1)), ru(xo, wt), l;
    } finally {
      I = t, Jl = !1;
    }
  }
  return null;
}
var Ht = [], Kt = 0, el = null, tl = 0, Ne = [], Ce = 0, Tt = null, He = 1, Ke = "";
function jt(e, t) {
  Ht[Kt++] = tl, Ht[Kt++] = el, el = e, tl = t;
}
function Ru(e, t, n) {
  Ne[Ce++] = He, Ne[Ce++] = Ke, Ne[Ce++] = Tt, Tt = e;
  var r = He;
  e = Ke;
  var l = 32 - Oe(r) - 1;
  r &= ~(1 << l), n += 1;
  var i = 32 - Oe(t) + l;
  if (30 < i) {
    var o = l - l % 5;
    i = (r & (1 << o) - 1).toString(32), r >>= o, l -= o, He = 1 << 32 - Oe(t) + l | n << l | r, Ke = i + e;
  } else He = 1 << i | n << l | r, Ke = e;
}
function Eo(e) {
  e.return !== null && (jt(e, 1), Ru(e, 1, 0));
}
function bo(e) {
  for (; e === el; ) el = Ht[--Kt], Ht[Kt] = null, tl = Ht[--Kt], Ht[Kt] = null;
  for (; e === Tt; ) Tt = Ne[--Ce], Ne[Ce] = null, Ke = Ne[--Ce], Ne[Ce] = null, He = Ne[--Ce], Ne[Ce] = null;
}
var ke = null, we = null, W = !1, Le = null;
function Lu(e, t) {
  var n = Ee(5, null, null, 0);
  n.elementType = "DELETED", n.stateNode = t, n.return = e, t = e.deletions, t === null ? (e.deletions = [n], e.flags |= 16) : t.push(n);
}
function As(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t, t !== null ? (e.stateNode = t, ke = e, we = dt(t.firstChild), !0) : !1;
    case 6:
      return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t, t !== null ? (e.stateNode = t, ke = e, we = null, !0) : !1;
    case 13:
      return t = t.nodeType !== 8 ? null : t, t !== null ? (n = Tt !== null ? { id: He, overflow: Ke } : null, e.memoizedState = { dehydrated: t, treeContext: n, retryLane: 1073741824 }, n = Ee(18, null, null, 0), n.stateNode = t, n.return = e, e.child = n, ke = e, we = null, !0) : !1;
    default:
      return !1;
  }
}
function Oi(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function Mi(e) {
  if (W) {
    var t = we;
    if (t) {
      var n = t;
      if (!As(e, t)) {
        if (Oi(e)) throw Error(C(418));
        t = dt(n.nextSibling);
        var r = ke;
        t && As(e, t) ? Lu(r, n) : (e.flags = e.flags & -4097 | 2, W = !1, ke = e);
      }
    } else {
      if (Oi(e)) throw Error(C(418));
      e.flags = e.flags & -4097 | 2, W = !1, ke = e;
    }
  }
}
function Bs(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; ) e = e.return;
  ke = e;
}
function _r(e) {
  if (e !== ke) return !1;
  if (!W) return Bs(e), W = !0, !1;
  var t;
  if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !Pi(e.type, e.memoizedProps)), t && (t = we)) {
    if (Oi(e)) throw Ou(), Error(C(418));
    for (; t; ) Lu(e, t), t = dt(t.nextSibling);
  }
  if (Bs(e), e.tag === 13) {
    if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(C(317));
    e: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === "/$") {
            if (t === 0) {
              we = dt(e.nextSibling);
              break e;
            }
            t--;
          } else n !== "$" && n !== "$!" && n !== "$?" || t++;
        }
        e = e.nextSibling;
      }
      we = null;
    }
  } else we = ke ? dt(e.stateNode.nextSibling) : null;
  return !0;
}
function Ou() {
  for (var e = we; e; ) e = dt(e.nextSibling);
}
function sn() {
  we = ke = null, W = !1;
}
function zo(e) {
  Le === null ? Le = [e] : Le.push(e);
}
var Df = et.ReactCurrentBatchConfig;
function Sn(e, t, n) {
  if (e = n.ref, e !== null && typeof e != "function" && typeof e != "object") {
    if (n._owner) {
      if (n = n._owner, n) {
        if (n.tag !== 1) throw Error(C(309));
        var r = n.stateNode;
      }
      if (!r) throw Error(C(147, e));
      var l = r, i = "" + e;
      return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === i ? t.ref : (t = function(o) {
        var a = l.refs;
        o === null ? delete a[i] : a[i] = o;
      }, t._stringRef = i, t);
    }
    if (typeof e != "string") throw Error(C(284));
    if (!n._owner) throw Error(C(290, e));
  }
  return e;
}
function Nr(e, t) {
  throw e = Object.prototype.toString.call(t), Error(C(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e));
}
function Ws(e) {
  var t = e._init;
  return t(e._payload);
}
function Mu(e) {
  function t(f, d) {
    if (e) {
      var p = f.deletions;
      p === null ? (f.deletions = [d], f.flags |= 16) : p.push(d);
    }
  }
  function n(f, d) {
    if (!e) return null;
    for (; d !== null; ) t(f, d), d = d.sibling;
    return null;
  }
  function r(f, d) {
    for (f = /* @__PURE__ */ new Map(); d !== null; ) d.key !== null ? f.set(d.key, d) : f.set(d.index, d), d = d.sibling;
    return f;
  }
  function l(f, d) {
    return f = mt(f, d), f.index = 0, f.sibling = null, f;
  }
  function i(f, d, p) {
    return f.index = p, e ? (p = f.alternate, p !== null ? (p = p.index, p < d ? (f.flags |= 2, d) : p) : (f.flags |= 2, d)) : (f.flags |= 1048576, d);
  }
  function o(f) {
    return e && f.alternate === null && (f.flags |= 2), f;
  }
  function a(f, d, p, x) {
    return d === null || d.tag !== 6 ? (d = ii(p, f.mode, x), d.return = f, d) : (d = l(d, p), d.return = f, d);
  }
  function u(f, d, p, x) {
    var S = p.type;
    return S === Ut ? h(f, d, p.props.children, x, p.key) : d !== null && (d.elementType === S || typeof S == "object" && S !== null && S.$$typeof === nt && Ws(S) === d.type) ? (x = l(d, p.props), x.ref = Sn(f, d, p), x.return = f, x) : (x = Ar(p.type, p.key, p.props, null, f.mode, x), x.ref = Sn(f, d, p), x.return = f, x);
  }
  function c(f, d, p, x) {
    return d === null || d.tag !== 4 || d.stateNode.containerInfo !== p.containerInfo || d.stateNode.implementation !== p.implementation ? (d = oi(p, f.mode, x), d.return = f, d) : (d = l(d, p.children || []), d.return = f, d);
  }
  function h(f, d, p, x, S) {
    return d === null || d.tag !== 7 ? (d = $t(p, f.mode, x, S), d.return = f, d) : (d = l(d, p), d.return = f, d);
  }
  function g(f, d, p) {
    if (typeof d == "string" && d !== "" || typeof d == "number") return d = ii("" + d, f.mode, p), d.return = f, d;
    if (typeof d == "object" && d !== null) {
      switch (d.$$typeof) {
        case hr:
          return p = Ar(d.type, d.key, d.props, null, f.mode, p), p.ref = Sn(f, null, d), p.return = f, p;
        case It:
          return d = oi(d, f.mode, p), d.return = f, d;
        case nt:
          var x = d._init;
          return g(f, x(d._payload), p);
      }
      if (Cn(d) || vn(d)) return d = $t(d, f.mode, p, null), d.return = f, d;
      Nr(f, d);
    }
    return null;
  }
  function m(f, d, p, x) {
    var S = d !== null ? d.key : null;
    if (typeof p == "string" && p !== "" || typeof p == "number") return S !== null ? null : a(f, d, "" + p, x);
    if (typeof p == "object" && p !== null) {
      switch (p.$$typeof) {
        case hr:
          return p.key === S ? u(f, d, p, x) : null;
        case It:
          return p.key === S ? c(f, d, p, x) : null;
        case nt:
          return S = p._init, m(
            f,
            d,
            S(p._payload),
            x
          );
      }
      if (Cn(p) || vn(p)) return S !== null ? null : h(f, d, p, x, null);
      Nr(f, p);
    }
    return null;
  }
  function y(f, d, p, x, S) {
    if (typeof x == "string" && x !== "" || typeof x == "number") return f = f.get(p) || null, a(d, f, "" + x, S);
    if (typeof x == "object" && x !== null) {
      switch (x.$$typeof) {
        case hr:
          return f = f.get(x.key === null ? p : x.key) || null, u(d, f, x, S);
        case It:
          return f = f.get(x.key === null ? p : x.key) || null, c(d, f, x, S);
        case nt:
          var _ = x._init;
          return y(f, d, p, _(x._payload), S);
      }
      if (Cn(x) || vn(x)) return f = f.get(p) || null, h(d, f, x, S, null);
      Nr(d, x);
    }
    return null;
  }
  function k(f, d, p, x) {
    for (var S = null, _ = null, E = d, v = d = 0, z = null; E !== null && v < p.length; v++) {
      E.index > v ? (z = E, E = null) : z = E.sibling;
      var w = m(f, E, p[v], x);
      if (w === null) {
        E === null && (E = z);
        break;
      }
      e && E && w.alternate === null && t(f, E), d = i(w, d, v), _ === null ? S = w : _.sibling = w, _ = w, E = z;
    }
    if (v === p.length) return n(f, E), W && jt(f, v), S;
    if (E === null) {
      for (; v < p.length; v++) E = g(f, p[v], x), E !== null && (d = i(E, d, v), _ === null ? S = E : _.sibling = E, _ = E);
      return W && jt(f, v), S;
    }
    for (E = r(f, E); v < p.length; v++) z = y(E, f, v, p[v], x), z !== null && (e && z.alternate !== null && E.delete(z.key === null ? v : z.key), d = i(z, d, v), _ === null ? S = z : _.sibling = z, _ = z);
    return e && E.forEach(function($) {
      return t(f, $);
    }), W && jt(f, v), S;
  }
  function j(f, d, p, x) {
    var S = vn(p);
    if (typeof S != "function") throw Error(C(150));
    if (p = S.call(p), p == null) throw Error(C(151));
    for (var _ = S = null, E = d, v = d = 0, z = null, w = p.next(); E !== null && !w.done; v++, w = p.next()) {
      E.index > v ? (z = E, E = null) : z = E.sibling;
      var $ = m(f, E, w.value, x);
      if ($ === null) {
        E === null && (E = z);
        break;
      }
      e && E && $.alternate === null && t(f, E), d = i($, d, v), _ === null ? S = $ : _.sibling = $, _ = $, E = z;
    }
    if (w.done) return n(
      f,
      E
    ), W && jt(f, v), S;
    if (E === null) {
      for (; !w.done; v++, w = p.next()) w = g(f, w.value, x), w !== null && (d = i(w, d, v), _ === null ? S = w : _.sibling = w, _ = w);
      return W && jt(f, v), S;
    }
    for (E = r(f, E); !w.done; v++, w = p.next()) w = y(E, f, v, w.value, x), w !== null && (e && w.alternate !== null && E.delete(w.key === null ? v : w.key), d = i(w, d, v), _ === null ? S = w : _.sibling = w, _ = w);
    return e && E.forEach(function(F) {
      return t(f, F);
    }), W && jt(f, v), S;
  }
  function N(f, d, p, x) {
    if (typeof p == "object" && p !== null && p.type === Ut && p.key === null && (p = p.props.children), typeof p == "object" && p !== null) {
      switch (p.$$typeof) {
        case hr:
          e: {
            for (var S = p.key, _ = d; _ !== null; ) {
              if (_.key === S) {
                if (S = p.type, S === Ut) {
                  if (_.tag === 7) {
                    n(f, _.sibling), d = l(_, p.props.children), d.return = f, f = d;
                    break e;
                  }
                } else if (_.elementType === S || typeof S == "object" && S !== null && S.$$typeof === nt && Ws(S) === _.type) {
                  n(f, _.sibling), d = l(_, p.props), d.ref = Sn(f, _, p), d.return = f, f = d;
                  break e;
                }
                n(f, _);
                break;
              } else t(f, _);
              _ = _.sibling;
            }
            p.type === Ut ? (d = $t(p.props.children, f.mode, x, p.key), d.return = f, f = d) : (x = Ar(p.type, p.key, p.props, null, f.mode, x), x.ref = Sn(f, d, p), x.return = f, f = x);
          }
          return o(f);
        case It:
          e: {
            for (_ = p.key; d !== null; ) {
              if (d.key === _) if (d.tag === 4 && d.stateNode.containerInfo === p.containerInfo && d.stateNode.implementation === p.implementation) {
                n(f, d.sibling), d = l(d, p.children || []), d.return = f, f = d;
                break e;
              } else {
                n(f, d);
                break;
              }
              else t(f, d);
              d = d.sibling;
            }
            d = oi(p, f.mode, x), d.return = f, f = d;
          }
          return o(f);
        case nt:
          return _ = p._init, N(f, d, _(p._payload), x);
      }
      if (Cn(p)) return k(f, d, p, x);
      if (vn(p)) return j(f, d, p, x);
      Nr(f, p);
    }
    return typeof p == "string" && p !== "" || typeof p == "number" ? (p = "" + p, d !== null && d.tag === 6 ? (n(f, d.sibling), d = l(d, p), d.return = f, f = d) : (n(f, d), d = ii(p, f.mode, x), d.return = f, f = d), o(f)) : n(f, d);
  }
  return N;
}
var an = Mu(!0), Du = Mu(!1), nl = yt(null), rl = null, Gt = null, $o = null;
function Po() {
  $o = Gt = rl = null;
}
function To(e) {
  var t = nl.current;
  B(nl), e._currentValue = t;
}
function Di(e, t, n) {
  for (; e !== null; ) {
    var r = e.alternate;
    if ((e.childLanes & t) !== t ? (e.childLanes |= t, r !== null && (r.childLanes |= t)) : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t), e === n) break;
    e = e.return;
  }
}
function tn(e, t) {
  rl = e, $o = Gt = null, e = e.dependencies, e !== null && e.firstContext !== null && (e.lanes & t && (he = !0), e.firstContext = null);
}
function ze(e) {
  var t = e._currentValue;
  if ($o !== e) if (e = { context: e, memoizedValue: t, next: null }, Gt === null) {
    if (rl === null) throw Error(C(308));
    Gt = e, rl.dependencies = { lanes: 0, firstContext: e };
  } else Gt = Gt.next = e;
  return t;
}
var Ct = null;
function Ro(e) {
  Ct === null ? Ct = [e] : Ct.push(e);
}
function Fu(e, t, n, r) {
  var l = t.interleaved;
  return l === null ? (n.next = n, Ro(t)) : (n.next = l.next, l.next = n), t.interleaved = n, Je(e, r);
}
function Je(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; ) e.childLanes |= t, n = e.alternate, n !== null && (n.childLanes |= t), n = e, e = e.return;
  return n.tag === 3 ? n.stateNode : null;
}
var rt = !1;
function Lo(e) {
  e.updateQueue = { baseState: e.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
}
function Iu(e, t) {
  e = e.updateQueue, t.updateQueue === e && (t.updateQueue = { baseState: e.baseState, firstBaseUpdate: e.firstBaseUpdate, lastBaseUpdate: e.lastBaseUpdate, shared: e.shared, effects: e.effects });
}
function Ye(e, t) {
  return { eventTime: e, lane: t, tag: 0, payload: null, callback: null, next: null };
}
function ft(e, t, n) {
  var r = e.updateQueue;
  if (r === null) return null;
  if (r = r.shared, D & 2) {
    var l = r.pending;
    return l === null ? t.next = t : (t.next = l.next, l.next = t), r.pending = t, Je(e, n);
  }
  return l = r.interleaved, l === null ? (t.next = t, Ro(r)) : (t.next = l.next, l.next = t), r.interleaved = t, Je(e, n);
}
function Or(e, t, n) {
  if (t = t.updateQueue, t !== null && (t = t.shared, (n & 4194240) !== 0)) {
    var r = t.lanes;
    r &= e.pendingLanes, n |= r, t.lanes = n, yo(e, n);
  }
}
function Vs(e, t) {
  var n = e.updateQueue, r = e.alternate;
  if (r !== null && (r = r.updateQueue, n === r)) {
    var l = null, i = null;
    if (n = n.firstBaseUpdate, n !== null) {
      do {
        var o = { eventTime: n.eventTime, lane: n.lane, tag: n.tag, payload: n.payload, callback: n.callback, next: null };
        i === null ? l = i = o : i = i.next = o, n = n.next;
      } while (n !== null);
      i === null ? l = i = t : i = i.next = t;
    } else l = i = t;
    n = { baseState: r.baseState, firstBaseUpdate: l, lastBaseUpdate: i, shared: r.shared, effects: r.effects }, e.updateQueue = n;
    return;
  }
  e = n.lastBaseUpdate, e === null ? n.firstBaseUpdate = t : e.next = t, n.lastBaseUpdate = t;
}
function ll(e, t, n, r) {
  var l = e.updateQueue;
  rt = !1;
  var i = l.firstBaseUpdate, o = l.lastBaseUpdate, a = l.shared.pending;
  if (a !== null) {
    l.shared.pending = null;
    var u = a, c = u.next;
    u.next = null, o === null ? i = c : o.next = c, o = u;
    var h = e.alternate;
    h !== null && (h = h.updateQueue, a = h.lastBaseUpdate, a !== o && (a === null ? h.firstBaseUpdate = c : a.next = c, h.lastBaseUpdate = u));
  }
  if (i !== null) {
    var g = l.baseState;
    o = 0, h = c = u = null, a = i;
    do {
      var m = a.lane, y = a.eventTime;
      if ((r & m) === m) {
        h !== null && (h = h.next = {
          eventTime: y,
          lane: 0,
          tag: a.tag,
          payload: a.payload,
          callback: a.callback,
          next: null
        });
        e: {
          var k = e, j = a;
          switch (m = t, y = n, j.tag) {
            case 1:
              if (k = j.payload, typeof k == "function") {
                g = k.call(y, g, m);
                break e;
              }
              g = k;
              break e;
            case 3:
              k.flags = k.flags & -65537 | 128;
            case 0:
              if (k = j.payload, m = typeof k == "function" ? k.call(y, g, m) : k, m == null) break e;
              g = H({}, g, m);
              break e;
            case 2:
              rt = !0;
          }
        }
        a.callback !== null && a.lane !== 0 && (e.flags |= 64, m = l.effects, m === null ? l.effects = [a] : m.push(a));
      } else y = { eventTime: y, lane: m, tag: a.tag, payload: a.payload, callback: a.callback, next: null }, h === null ? (c = h = y, u = g) : h = h.next = y, o |= m;
      if (a = a.next, a === null) {
        if (a = l.shared.pending, a === null) break;
        m = a, a = m.next, m.next = null, l.lastBaseUpdate = m, l.shared.pending = null;
      }
    } while (!0);
    if (h === null && (u = g), l.baseState = u, l.firstBaseUpdate = c, l.lastBaseUpdate = h, t = l.shared.interleaved, t !== null) {
      l = t;
      do
        o |= l.lane, l = l.next;
      while (l !== t);
    } else i === null && (l.shared.lanes = 0);
    Lt |= o, e.lanes = o, e.memoizedState = g;
  }
}
function Qs(e, t, n) {
  if (e = t.effects, t.effects = null, e !== null) for (t = 0; t < e.length; t++) {
    var r = e[t], l = r.callback;
    if (l !== null) {
      if (r.callback = null, r = n, typeof l != "function") throw Error(C(191, l));
      l.call(r);
    }
  }
}
var ur = {}, Be = yt(ur), Zn = yt(ur), Xn = yt(ur);
function Et(e) {
  if (e === ur) throw Error(C(174));
  return e;
}
function Oo(e, t) {
  switch (U(Xn, t), U(Zn, e), U(Be, ur), e = t.nodeType, e) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : vi(null, "");
      break;
    default:
      e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = vi(t, e);
  }
  B(Be), U(Be, t);
}
function un() {
  B(Be), B(Zn), B(Xn);
}
function Uu(e) {
  Et(Xn.current);
  var t = Et(Be.current), n = vi(t, e.type);
  t !== n && (U(Zn, e), U(Be, n));
}
function Mo(e) {
  Zn.current === e && (B(Be), B(Zn));
}
var V = yt(0);
function il(e) {
  for (var t = e; t !== null; ) {
    if (t.tag === 13) {
      var n = t.memoizedState;
      if (n !== null && (n = n.dehydrated, n === null || n.data === "$?" || n.data === "$!")) return t;
    } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
      if (t.flags & 128) return t;
    } else if (t.child !== null) {
      t.child.return = t, t = t.child;
      continue;
    }
    if (t === e) break;
    for (; t.sibling === null; ) {
      if (t.return === null || t.return === e) return null;
      t = t.return;
    }
    t.sibling.return = t.return, t = t.sibling;
  }
  return null;
}
var ql = [];
function Do() {
  for (var e = 0; e < ql.length; e++) ql[e]._workInProgressVersionPrimary = null;
  ql.length = 0;
}
var Mr = et.ReactCurrentDispatcher, ei = et.ReactCurrentBatchConfig, Rt = 0, Q = null, X = null, ee = null, ol = !1, Ln = !1, Jn = 0, Ff = 0;
function ie() {
  throw Error(C(321));
}
function Fo(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++) if (!De(e[n], t[n])) return !1;
  return !0;
}
function Io(e, t, n, r, l, i) {
  if (Rt = i, Q = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, Mr.current = e === null || e.memoizedState === null ? Bf : Wf, e = n(r, l), Ln) {
    i = 0;
    do {
      if (Ln = !1, Jn = 0, 25 <= i) throw Error(C(301));
      i += 1, ee = X = null, t.updateQueue = null, Mr.current = Vf, e = n(r, l);
    } while (Ln);
  }
  if (Mr.current = sl, t = X !== null && X.next !== null, Rt = 0, ee = X = Q = null, ol = !1, t) throw Error(C(300));
  return e;
}
function Uo() {
  var e = Jn !== 0;
  return Jn = 0, e;
}
function Ie() {
  var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
  return ee === null ? Q.memoizedState = ee = e : ee = ee.next = e, ee;
}
function $e() {
  if (X === null) {
    var e = Q.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = X.next;
  var t = ee === null ? Q.memoizedState : ee.next;
  if (t !== null) ee = t, X = e;
  else {
    if (e === null) throw Error(C(310));
    X = e, e = { memoizedState: X.memoizedState, baseState: X.baseState, baseQueue: X.baseQueue, queue: X.queue, next: null }, ee === null ? Q.memoizedState = ee = e : ee = ee.next = e;
  }
  return ee;
}
function qn(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function ti(e) {
  var t = $e(), n = t.queue;
  if (n === null) throw Error(C(311));
  n.lastRenderedReducer = e;
  var r = X, l = r.baseQueue, i = n.pending;
  if (i !== null) {
    if (l !== null) {
      var o = l.next;
      l.next = i.next, i.next = o;
    }
    r.baseQueue = l = i, n.pending = null;
  }
  if (l !== null) {
    i = l.next, r = r.baseState;
    var a = o = null, u = null, c = i;
    do {
      var h = c.lane;
      if ((Rt & h) === h) u !== null && (u = u.next = { lane: 0, action: c.action, hasEagerState: c.hasEagerState, eagerState: c.eagerState, next: null }), r = c.hasEagerState ? c.eagerState : e(r, c.action);
      else {
        var g = {
          lane: h,
          action: c.action,
          hasEagerState: c.hasEagerState,
          eagerState: c.eagerState,
          next: null
        };
        u === null ? (a = u = g, o = r) : u = u.next = g, Q.lanes |= h, Lt |= h;
      }
      c = c.next;
    } while (c !== null && c !== i);
    u === null ? o = r : u.next = a, De(r, t.memoizedState) || (he = !0), t.memoizedState = r, t.baseState = o, t.baseQueue = u, n.lastRenderedState = r;
  }
  if (e = n.interleaved, e !== null) {
    l = e;
    do
      i = l.lane, Q.lanes |= i, Lt |= i, l = l.next;
    while (l !== e);
  } else l === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function ni(e) {
  var t = $e(), n = t.queue;
  if (n === null) throw Error(C(311));
  n.lastRenderedReducer = e;
  var r = n.dispatch, l = n.pending, i = t.memoizedState;
  if (l !== null) {
    n.pending = null;
    var o = l = l.next;
    do
      i = e(i, o.action), o = o.next;
    while (o !== l);
    De(i, t.memoizedState) || (he = !0), t.memoizedState = i, t.baseQueue === null && (t.baseState = i), n.lastRenderedState = i;
  }
  return [i, r];
}
function Au() {
}
function Bu(e, t) {
  var n = Q, r = $e(), l = t(), i = !De(r.memoizedState, l);
  if (i && (r.memoizedState = l, he = !0), r = r.queue, Ao(Qu.bind(null, n, r, e), [e]), r.getSnapshot !== t || i || ee !== null && ee.memoizedState.tag & 1) {
    if (n.flags |= 2048, er(9, Vu.bind(null, n, r, l, t), void 0, null), te === null) throw Error(C(349));
    Rt & 30 || Wu(n, t, l);
  }
  return l;
}
function Wu(e, t, n) {
  e.flags |= 16384, e = { getSnapshot: t, value: n }, t = Q.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, Q.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
}
function Vu(e, t, n, r) {
  t.value = n, t.getSnapshot = r, Hu(t) && Ku(e);
}
function Qu(e, t, n) {
  return n(function() {
    Hu(t) && Ku(e);
  });
}
function Hu(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !De(e, n);
  } catch {
    return !0;
  }
}
function Ku(e) {
  var t = Je(e, 1);
  t !== null && Me(t, e, 1, -1);
}
function Hs(e) {
  var t = Ie();
  return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: qn, lastRenderedState: e }, t.queue = e, e = e.dispatch = Af.bind(null, Q, e), [t.memoizedState, e];
}
function er(e, t, n, r) {
  return e = { tag: e, create: t, destroy: n, deps: r, next: null }, t = Q.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, Q.updateQueue = t, t.lastEffect = e.next = e) : (n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e)), e;
}
function Gu() {
  return $e().memoizedState;
}
function Dr(e, t, n, r) {
  var l = Ie();
  Q.flags |= e, l.memoizedState = er(1 | t, n, void 0, r === void 0 ? null : r);
}
function wl(e, t, n, r) {
  var l = $e();
  r = r === void 0 ? null : r;
  var i = void 0;
  if (X !== null) {
    var o = X.memoizedState;
    if (i = o.destroy, r !== null && Fo(r, o.deps)) {
      l.memoizedState = er(t, n, i, r);
      return;
    }
  }
  Q.flags |= e, l.memoizedState = er(1 | t, n, i, r);
}
function Ks(e, t) {
  return Dr(8390656, 8, e, t);
}
function Ao(e, t) {
  return wl(2048, 8, e, t);
}
function Yu(e, t) {
  return wl(4, 2, e, t);
}
function Zu(e, t) {
  return wl(4, 4, e, t);
}
function Xu(e, t) {
  if (typeof t == "function") return e = e(), t(e), function() {
    t(null);
  };
  if (t != null) return e = e(), t.current = e, function() {
    t.current = null;
  };
}
function Ju(e, t, n) {
  return n = n != null ? n.concat([e]) : null, wl(4, 4, Xu.bind(null, t, e), n);
}
function Bo() {
}
function qu(e, t) {
  var n = $e();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && Fo(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
}
function ec(e, t) {
  var n = $e();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && Fo(t, r[1]) ? r[0] : (e = e(), n.memoizedState = [e, t], e);
}
function tc(e, t, n) {
  return Rt & 21 ? (De(n, t) || (n = ou(), Q.lanes |= n, Lt |= n, e.baseState = !0), t) : (e.baseState && (e.baseState = !1, he = !0), e.memoizedState = n);
}
function If(e, t) {
  var n = I;
  I = n !== 0 && 4 > n ? n : 4, e(!0);
  var r = ei.transition;
  ei.transition = {};
  try {
    e(!1), t();
  } finally {
    I = n, ei.transition = r;
  }
}
function nc() {
  return $e().memoizedState;
}
function Uf(e, t, n) {
  var r = ht(e);
  if (n = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null }, rc(e)) lc(t, n);
  else if (n = Fu(e, t, n, r), n !== null) {
    var l = ce();
    Me(n, e, r, l), ic(n, t, r);
  }
}
function Af(e, t, n) {
  var r = ht(e), l = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (rc(e)) lc(t, l);
  else {
    var i = e.alternate;
    if (e.lanes === 0 && (i === null || i.lanes === 0) && (i = t.lastRenderedReducer, i !== null)) try {
      var o = t.lastRenderedState, a = i(o, n);
      if (l.hasEagerState = !0, l.eagerState = a, De(a, o)) {
        var u = t.interleaved;
        u === null ? (l.next = l, Ro(t)) : (l.next = u.next, u.next = l), t.interleaved = l;
        return;
      }
    } catch {
    } finally {
    }
    n = Fu(e, t, l, r), n !== null && (l = ce(), Me(n, e, r, l), ic(n, t, r));
  }
}
function rc(e) {
  var t = e.alternate;
  return e === Q || t !== null && t === Q;
}
function lc(e, t) {
  Ln = ol = !0;
  var n = e.pending;
  n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
}
function ic(e, t, n) {
  if (n & 4194240) {
    var r = t.lanes;
    r &= e.pendingLanes, n |= r, t.lanes = n, yo(e, n);
  }
}
var sl = { readContext: ze, useCallback: ie, useContext: ie, useEffect: ie, useImperativeHandle: ie, useInsertionEffect: ie, useLayoutEffect: ie, useMemo: ie, useReducer: ie, useRef: ie, useState: ie, useDebugValue: ie, useDeferredValue: ie, useTransition: ie, useMutableSource: ie, useSyncExternalStore: ie, useId: ie, unstable_isNewReconciler: !1 }, Bf = { readContext: ze, useCallback: function(e, t) {
  return Ie().memoizedState = [e, t === void 0 ? null : t], e;
}, useContext: ze, useEffect: Ks, useImperativeHandle: function(e, t, n) {
  return n = n != null ? n.concat([e]) : null, Dr(
    4194308,
    4,
    Xu.bind(null, t, e),
    n
  );
}, useLayoutEffect: function(e, t) {
  return Dr(4194308, 4, e, t);
}, useInsertionEffect: function(e, t) {
  return Dr(4, 2, e, t);
}, useMemo: function(e, t) {
  var n = Ie();
  return t = t === void 0 ? null : t, e = e(), n.memoizedState = [e, t], e;
}, useReducer: function(e, t, n) {
  var r = Ie();
  return t = n !== void 0 ? n(t) : t, r.memoizedState = r.baseState = t, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: t }, r.queue = e, e = e.dispatch = Uf.bind(null, Q, e), [r.memoizedState, e];
}, useRef: function(e) {
  var t = Ie();
  return e = { current: e }, t.memoizedState = e;
}, useState: Hs, useDebugValue: Bo, useDeferredValue: function(e) {
  return Ie().memoizedState = e;
}, useTransition: function() {
  var e = Hs(!1), t = e[0];
  return e = If.bind(null, e[1]), Ie().memoizedState = e, [t, e];
}, useMutableSource: function() {
}, useSyncExternalStore: function(e, t, n) {
  var r = Q, l = Ie();
  if (W) {
    if (n === void 0) throw Error(C(407));
    n = n();
  } else {
    if (n = t(), te === null) throw Error(C(349));
    Rt & 30 || Wu(r, t, n);
  }
  l.memoizedState = n;
  var i = { value: n, getSnapshot: t };
  return l.queue = i, Ks(Qu.bind(
    null,
    r,
    i,
    e
  ), [e]), r.flags |= 2048, er(9, Vu.bind(null, r, i, n, t), void 0, null), n;
}, useId: function() {
  var e = Ie(), t = te.identifierPrefix;
  if (W) {
    var n = Ke, r = He;
    n = (r & ~(1 << 32 - Oe(r) - 1)).toString(32) + n, t = ":" + t + "R" + n, n = Jn++, 0 < n && (t += "H" + n.toString(32)), t += ":";
  } else n = Ff++, t = ":" + t + "r" + n.toString(32) + ":";
  return e.memoizedState = t;
}, unstable_isNewReconciler: !1 }, Wf = {
  readContext: ze,
  useCallback: qu,
  useContext: ze,
  useEffect: Ao,
  useImperativeHandle: Ju,
  useInsertionEffect: Yu,
  useLayoutEffect: Zu,
  useMemo: ec,
  useReducer: ti,
  useRef: Gu,
  useState: function() {
    return ti(qn);
  },
  useDebugValue: Bo,
  useDeferredValue: function(e) {
    var t = $e();
    return tc(t, X.memoizedState, e);
  },
  useTransition: function() {
    var e = ti(qn)[0], t = $e().memoizedState;
    return [e, t];
  },
  useMutableSource: Au,
  useSyncExternalStore: Bu,
  useId: nc,
  unstable_isNewReconciler: !1
}, Vf = { readContext: ze, useCallback: qu, useContext: ze, useEffect: Ao, useImperativeHandle: Ju, useInsertionEffect: Yu, useLayoutEffect: Zu, useMemo: ec, useReducer: ni, useRef: Gu, useState: function() {
  return ni(qn);
}, useDebugValue: Bo, useDeferredValue: function(e) {
  var t = $e();
  return X === null ? t.memoizedState = e : tc(t, X.memoizedState, e);
}, useTransition: function() {
  var e = ni(qn)[0], t = $e().memoizedState;
  return [e, t];
}, useMutableSource: Au, useSyncExternalStore: Bu, useId: nc, unstable_isNewReconciler: !1 };
function Te(e, t) {
  if (e && e.defaultProps) {
    t = H({}, t), e = e.defaultProps;
    for (var n in e) t[n] === void 0 && (t[n] = e[n]);
    return t;
  }
  return t;
}
function Fi(e, t, n, r) {
  t = e.memoizedState, n = n(r, t), n = n == null ? t : H({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
}
var kl = { isMounted: function(e) {
  return (e = e._reactInternals) ? Dt(e) === e : !1;
}, enqueueSetState: function(e, t, n) {
  e = e._reactInternals;
  var r = ce(), l = ht(e), i = Ye(r, l);
  i.payload = t, n != null && (i.callback = n), t = ft(e, i, l), t !== null && (Me(t, e, l, r), Or(t, e, l));
}, enqueueReplaceState: function(e, t, n) {
  e = e._reactInternals;
  var r = ce(), l = ht(e), i = Ye(r, l);
  i.tag = 1, i.payload = t, n != null && (i.callback = n), t = ft(e, i, l), t !== null && (Me(t, e, l, r), Or(t, e, l));
}, enqueueForceUpdate: function(e, t) {
  e = e._reactInternals;
  var n = ce(), r = ht(e), l = Ye(n, r);
  l.tag = 2, t != null && (l.callback = t), t = ft(e, l, r), t !== null && (Me(t, e, r, n), Or(t, e, r));
} };
function Gs(e, t, n, r, l, i, o) {
  return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, i, o) : t.prototype && t.prototype.isPureReactComponent ? !Hn(n, r) || !Hn(l, i) : !0;
}
function oc(e, t, n) {
  var r = !1, l = vt, i = t.contextType;
  return typeof i == "object" && i !== null ? i = ze(i) : (l = ge(t) ? Pt : ae.current, r = t.contextTypes, i = (r = r != null) ? on(e, l) : vt), t = new t(n, i), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = kl, e.stateNode = t, t._reactInternals = e, r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = l, e.__reactInternalMemoizedMaskedChildContext = i), t;
}
function Ys(e, t, n, r) {
  e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && kl.enqueueReplaceState(t, t.state, null);
}
function Ii(e, t, n, r) {
  var l = e.stateNode;
  l.props = n, l.state = e.memoizedState, l.refs = {}, Lo(e);
  var i = t.contextType;
  typeof i == "object" && i !== null ? l.context = ze(i) : (i = ge(t) ? Pt : ae.current, l.context = on(e, i)), l.state = e.memoizedState, i = t.getDerivedStateFromProps, typeof i == "function" && (Fi(e, t, i, n), l.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof l.getSnapshotBeforeUpdate == "function" || typeof l.UNSAFE_componentWillMount != "function" && typeof l.componentWillMount != "function" || (t = l.state, typeof l.componentWillMount == "function" && l.componentWillMount(), typeof l.UNSAFE_componentWillMount == "function" && l.UNSAFE_componentWillMount(), t !== l.state && kl.enqueueReplaceState(l, l.state, null), ll(e, n, l, r), l.state = e.memoizedState), typeof l.componentDidMount == "function" && (e.flags |= 4194308);
}
function cn(e, t) {
  try {
    var n = "", r = t;
    do
      n += vd(r), r = r.return;
    while (r);
    var l = n;
  } catch (i) {
    l = `
Error generating stack: ` + i.message + `
` + i.stack;
  }
  return { value: e, source: t, stack: l, digest: null };
}
function ri(e, t, n) {
  return { value: e, source: null, stack: n ?? null, digest: t ?? null };
}
function Ui(e, t) {
  try {
    console.error(t.value);
  } catch (n) {
    setTimeout(function() {
      throw n;
    });
  }
}
var Qf = typeof WeakMap == "function" ? WeakMap : Map;
function sc(e, t, n) {
  n = Ye(-1, n), n.tag = 3, n.payload = { element: null };
  var r = t.value;
  return n.callback = function() {
    ul || (ul = !0, Zi = r), Ui(e, t);
  }, n;
}
function ac(e, t, n) {
  n = Ye(-1, n), n.tag = 3;
  var r = e.type.getDerivedStateFromError;
  if (typeof r == "function") {
    var l = t.value;
    n.payload = function() {
      return r(l);
    }, n.callback = function() {
      Ui(e, t);
    };
  }
  var i = e.stateNode;
  return i !== null && typeof i.componentDidCatch == "function" && (n.callback = function() {
    Ui(e, t), typeof r != "function" && (pt === null ? pt = /* @__PURE__ */ new Set([this]) : pt.add(this));
    var o = t.stack;
    this.componentDidCatch(t.value, { componentStack: o !== null ? o : "" });
  }), n;
}
function Zs(e, t, n) {
  var r = e.pingCache;
  if (r === null) {
    r = e.pingCache = new Qf();
    var l = /* @__PURE__ */ new Set();
    r.set(t, l);
  } else l = r.get(t), l === void 0 && (l = /* @__PURE__ */ new Set(), r.set(t, l));
  l.has(n) || (l.add(n), e = ip.bind(null, e, t, n), t.then(e, e));
}
function Xs(e) {
  do {
    var t;
    if ((t = e.tag === 13) && (t = e.memoizedState, t = t !== null ? t.dehydrated !== null : !0), t) return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function Js(e, t, n, r, l) {
  return e.mode & 1 ? (e.flags |= 65536, e.lanes = l, e) : (e === t ? e.flags |= 65536 : (e.flags |= 128, n.flags |= 131072, n.flags &= -52805, n.tag === 1 && (n.alternate === null ? n.tag = 17 : (t = Ye(-1, 1), t.tag = 2, ft(n, t, 1))), n.lanes |= 1), e);
}
var Hf = et.ReactCurrentOwner, he = !1;
function ue(e, t, n, r) {
  t.child = e === null ? Du(t, null, n, r) : an(t, e.child, n, r);
}
function qs(e, t, n, r, l) {
  n = n.render;
  var i = t.ref;
  return tn(t, l), r = Io(e, t, n, r, i, l), n = Uo(), e !== null && !he ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, qe(e, t, l)) : (W && n && Eo(t), t.flags |= 1, ue(e, t, r, l), t.child);
}
function ea(e, t, n, r, l) {
  if (e === null) {
    var i = n.type;
    return typeof i == "function" && !Zo(i) && i.defaultProps === void 0 && n.compare === null && n.defaultProps === void 0 ? (t.tag = 15, t.type = i, uc(e, t, i, r, l)) : (e = Ar(n.type, null, r, t, t.mode, l), e.ref = t.ref, e.return = t, t.child = e);
  }
  if (i = e.child, !(e.lanes & l)) {
    var o = i.memoizedProps;
    if (n = n.compare, n = n !== null ? n : Hn, n(o, r) && e.ref === t.ref) return qe(e, t, l);
  }
  return t.flags |= 1, e = mt(i, r), e.ref = t.ref, e.return = t, t.child = e;
}
function uc(e, t, n, r, l) {
  if (e !== null) {
    var i = e.memoizedProps;
    if (Hn(i, r) && e.ref === t.ref) if (he = !1, t.pendingProps = r = i, (e.lanes & l) !== 0) e.flags & 131072 && (he = !0);
    else return t.lanes = e.lanes, qe(e, t, l);
  }
  return Ai(e, t, n, r, l);
}
function cc(e, t, n) {
  var r = t.pendingProps, l = r.children, i = e !== null ? e.memoizedState : null;
  if (r.mode === "hidden") if (!(t.mode & 1)) t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, U(Zt, ye), ye |= n;
  else {
    if (!(n & 1073741824)) return e = i !== null ? i.baseLanes | n : n, t.lanes = t.childLanes = 1073741824, t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }, t.updateQueue = null, U(Zt, ye), ye |= e, null;
    t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, r = i !== null ? i.baseLanes : n, U(Zt, ye), ye |= r;
  }
  else i !== null ? (r = i.baseLanes | n, t.memoizedState = null) : r = n, U(Zt, ye), ye |= r;
  return ue(e, t, l, n), t.child;
}
function dc(e, t) {
  var n = t.ref;
  (e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= 512, t.flags |= 2097152);
}
function Ai(e, t, n, r, l) {
  var i = ge(n) ? Pt : ae.current;
  return i = on(t, i), tn(t, l), n = Io(e, t, n, r, i, l), r = Uo(), e !== null && !he ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, qe(e, t, l)) : (W && r && Eo(t), t.flags |= 1, ue(e, t, n, l), t.child);
}
function ta(e, t, n, r, l) {
  if (ge(n)) {
    var i = !0;
    qr(t);
  } else i = !1;
  if (tn(t, l), t.stateNode === null) Fr(e, t), oc(t, n, r), Ii(t, n, r, l), r = !0;
  else if (e === null) {
    var o = t.stateNode, a = t.memoizedProps;
    o.props = a;
    var u = o.context, c = n.contextType;
    typeof c == "object" && c !== null ? c = ze(c) : (c = ge(n) ? Pt : ae.current, c = on(t, c));
    var h = n.getDerivedStateFromProps, g = typeof h == "function" || typeof o.getSnapshotBeforeUpdate == "function";
    g || typeof o.UNSAFE_componentWillReceiveProps != "function" && typeof o.componentWillReceiveProps != "function" || (a !== r || u !== c) && Ys(t, o, r, c), rt = !1;
    var m = t.memoizedState;
    o.state = m, ll(t, r, o, l), u = t.memoizedState, a !== r || m !== u || me.current || rt ? (typeof h == "function" && (Fi(t, n, h, r), u = t.memoizedState), (a = rt || Gs(t, n, a, r, m, u, c)) ? (g || typeof o.UNSAFE_componentWillMount != "function" && typeof o.componentWillMount != "function" || (typeof o.componentWillMount == "function" && o.componentWillMount(), typeof o.UNSAFE_componentWillMount == "function" && o.UNSAFE_componentWillMount()), typeof o.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof o.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = u), o.props = r, o.state = u, o.context = c, r = a) : (typeof o.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
  } else {
    o = t.stateNode, Iu(e, t), a = t.memoizedProps, c = t.type === t.elementType ? a : Te(t.type, a), o.props = c, g = t.pendingProps, m = o.context, u = n.contextType, typeof u == "object" && u !== null ? u = ze(u) : (u = ge(n) ? Pt : ae.current, u = on(t, u));
    var y = n.getDerivedStateFromProps;
    (h = typeof y == "function" || typeof o.getSnapshotBeforeUpdate == "function") || typeof o.UNSAFE_componentWillReceiveProps != "function" && typeof o.componentWillReceiveProps != "function" || (a !== g || m !== u) && Ys(t, o, r, u), rt = !1, m = t.memoizedState, o.state = m, ll(t, r, o, l);
    var k = t.memoizedState;
    a !== g || m !== k || me.current || rt ? (typeof y == "function" && (Fi(t, n, y, r), k = t.memoizedState), (c = rt || Gs(t, n, c, r, m, k, u) || !1) ? (h || typeof o.UNSAFE_componentWillUpdate != "function" && typeof o.componentWillUpdate != "function" || (typeof o.componentWillUpdate == "function" && o.componentWillUpdate(r, k, u), typeof o.UNSAFE_componentWillUpdate == "function" && o.UNSAFE_componentWillUpdate(r, k, u)), typeof o.componentDidUpdate == "function" && (t.flags |= 4), typeof o.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof o.componentDidUpdate != "function" || a === e.memoizedProps && m === e.memoizedState || (t.flags |= 4), typeof o.getSnapshotBeforeUpdate != "function" || a === e.memoizedProps && m === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = k), o.props = r, o.state = k, o.context = u, r = c) : (typeof o.componentDidUpdate != "function" || a === e.memoizedProps && m === e.memoizedState || (t.flags |= 4), typeof o.getSnapshotBeforeUpdate != "function" || a === e.memoizedProps && m === e.memoizedState || (t.flags |= 1024), r = !1);
  }
  return Bi(e, t, n, r, i, l);
}
function Bi(e, t, n, r, l, i) {
  dc(e, t);
  var o = (t.flags & 128) !== 0;
  if (!r && !o) return l && Us(t, n, !1), qe(e, t, i);
  r = t.stateNode, Hf.current = t;
  var a = o && typeof n.getDerivedStateFromError != "function" ? null : r.render();
  return t.flags |= 1, e !== null && o ? (t.child = an(t, e.child, null, i), t.child = an(t, null, a, i)) : ue(e, t, a, i), t.memoizedState = r.state, l && Us(t, n, !0), t.child;
}
function fc(e) {
  var t = e.stateNode;
  t.pendingContext ? Is(e, t.pendingContext, t.pendingContext !== t.context) : t.context && Is(e, t.context, !1), Oo(e, t.containerInfo);
}
function na(e, t, n, r, l) {
  return sn(), zo(l), t.flags |= 256, ue(e, t, n, r), t.child;
}
var Wi = { dehydrated: null, treeContext: null, retryLane: 0 };
function Vi(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function pc(e, t, n) {
  var r = t.pendingProps, l = V.current, i = !1, o = (t.flags & 128) !== 0, a;
  if ((a = o) || (a = e !== null && e.memoizedState === null ? !1 : (l & 2) !== 0), a ? (i = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (l |= 1), U(V, l & 1), e === null)
    return Mi(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? (t.mode & 1 ? e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824 : t.lanes = 1, null) : (o = r.children, e = r.fallback, i ? (r = t.mode, i = t.child, o = { mode: "hidden", children: o }, !(r & 1) && i !== null ? (i.childLanes = 0, i.pendingProps = o) : i = _l(o, r, 0, null), e = $t(e, r, n, null), i.return = t, e.return = t, i.sibling = e, t.child = i, t.child.memoizedState = Vi(n), t.memoizedState = Wi, e) : Wo(t, o));
  if (l = e.memoizedState, l !== null && (a = l.dehydrated, a !== null)) return Kf(e, t, o, r, a, l, n);
  if (i) {
    i = r.fallback, o = t.mode, l = e.child, a = l.sibling;
    var u = { mode: "hidden", children: r.children };
    return !(o & 1) && t.child !== l ? (r = t.child, r.childLanes = 0, r.pendingProps = u, t.deletions = null) : (r = mt(l, u), r.subtreeFlags = l.subtreeFlags & 14680064), a !== null ? i = mt(a, i) : (i = $t(i, o, n, null), i.flags |= 2), i.return = t, r.return = t, r.sibling = i, t.child = r, r = i, i = t.child, o = e.child.memoizedState, o = o === null ? Vi(n) : { baseLanes: o.baseLanes | n, cachePool: null, transitions: o.transitions }, i.memoizedState = o, i.childLanes = e.childLanes & ~n, t.memoizedState = Wi, r;
  }
  return i = e.child, e = i.sibling, r = mt(i, { mode: "visible", children: r.children }), !(t.mode & 1) && (r.lanes = n), r.return = t, r.sibling = null, e !== null && (n = t.deletions, n === null ? (t.deletions = [e], t.flags |= 16) : n.push(e)), t.child = r, t.memoizedState = null, r;
}
function Wo(e, t) {
  return t = _l({ mode: "visible", children: t }, e.mode, 0, null), t.return = e, e.child = t;
}
function Cr(e, t, n, r) {
  return r !== null && zo(r), an(t, e.child, null, n), e = Wo(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
}
function Kf(e, t, n, r, l, i, o) {
  if (n)
    return t.flags & 256 ? (t.flags &= -257, r = ri(Error(C(422))), Cr(e, t, o, r)) : t.memoizedState !== null ? (t.child = e.child, t.flags |= 128, null) : (i = r.fallback, l = t.mode, r = _l({ mode: "visible", children: r.children }, l, 0, null), i = $t(i, l, o, null), i.flags |= 2, r.return = t, i.return = t, r.sibling = i, t.child = r, t.mode & 1 && an(t, e.child, null, o), t.child.memoizedState = Vi(o), t.memoizedState = Wi, i);
  if (!(t.mode & 1)) return Cr(e, t, o, null);
  if (l.data === "$!") {
    if (r = l.nextSibling && l.nextSibling.dataset, r) var a = r.dgst;
    return r = a, i = Error(C(419)), r = ri(i, r, void 0), Cr(e, t, o, r);
  }
  if (a = (o & e.childLanes) !== 0, he || a) {
    if (r = te, r !== null) {
      switch (o & -o) {
        case 4:
          l = 2;
          break;
        case 16:
          l = 8;
          break;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          l = 32;
          break;
        case 536870912:
          l = 268435456;
          break;
        default:
          l = 0;
      }
      l = l & (r.suspendedLanes | o) ? 0 : l, l !== 0 && l !== i.retryLane && (i.retryLane = l, Je(e, l), Me(r, e, l, -1));
    }
    return Yo(), r = ri(Error(C(421))), Cr(e, t, o, r);
  }
  return l.data === "$?" ? (t.flags |= 128, t.child = e.child, t = op.bind(null, e), l._reactRetry = t, null) : (e = i.treeContext, we = dt(l.nextSibling), ke = t, W = !0, Le = null, e !== null && (Ne[Ce++] = He, Ne[Ce++] = Ke, Ne[Ce++] = Tt, He = e.id, Ke = e.overflow, Tt = t), t = Wo(t, r.children), t.flags |= 4096, t);
}
function ra(e, t, n) {
  e.lanes |= t;
  var r = e.alternate;
  r !== null && (r.lanes |= t), Di(e.return, t, n);
}
function li(e, t, n, r, l) {
  var i = e.memoizedState;
  i === null ? e.memoizedState = { isBackwards: t, rendering: null, renderingStartTime: 0, last: r, tail: n, tailMode: l } : (i.isBackwards = t, i.rendering = null, i.renderingStartTime = 0, i.last = r, i.tail = n, i.tailMode = l);
}
function hc(e, t, n) {
  var r = t.pendingProps, l = r.revealOrder, i = r.tail;
  if (ue(e, t, r.children, n), r = V.current, r & 2) r = r & 1 | 2, t.flags |= 128;
  else {
    if (e !== null && e.flags & 128) e: for (e = t.child; e !== null; ) {
      if (e.tag === 13) e.memoizedState !== null && ra(e, n, t);
      else if (e.tag === 19) ra(e, n, t);
      else if (e.child !== null) {
        e.child.return = e, e = e.child;
        continue;
      }
      if (e === t) break e;
      for (; e.sibling === null; ) {
        if (e.return === null || e.return === t) break e;
        e = e.return;
      }
      e.sibling.return = e.return, e = e.sibling;
    }
    r &= 1;
  }
  if (U(V, r), !(t.mode & 1)) t.memoizedState = null;
  else switch (l) {
    case "forwards":
      for (n = t.child, l = null; n !== null; ) e = n.alternate, e !== null && il(e) === null && (l = n), n = n.sibling;
      n = l, n === null ? (l = t.child, t.child = null) : (l = n.sibling, n.sibling = null), li(t, !1, l, n, i);
      break;
    case "backwards":
      for (n = null, l = t.child, t.child = null; l !== null; ) {
        if (e = l.alternate, e !== null && il(e) === null) {
          t.child = l;
          break;
        }
        e = l.sibling, l.sibling = n, n = l, l = e;
      }
      li(t, !0, n, null, i);
      break;
    case "together":
      li(t, !1, null, null, void 0);
      break;
    default:
      t.memoizedState = null;
  }
  return t.child;
}
function Fr(e, t) {
  !(t.mode & 1) && e !== null && (e.alternate = null, t.alternate = null, t.flags |= 2);
}
function qe(e, t, n) {
  if (e !== null && (t.dependencies = e.dependencies), Lt |= t.lanes, !(n & t.childLanes)) return null;
  if (e !== null && t.child !== e.child) throw Error(C(153));
  if (t.child !== null) {
    for (e = t.child, n = mt(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null; ) e = e.sibling, n = n.sibling = mt(e, e.pendingProps), n.return = t;
    n.sibling = null;
  }
  return t.child;
}
function Gf(e, t, n) {
  switch (t.tag) {
    case 3:
      fc(t), sn();
      break;
    case 5:
      Uu(t);
      break;
    case 1:
      ge(t.type) && qr(t);
      break;
    case 4:
      Oo(t, t.stateNode.containerInfo);
      break;
    case 10:
      var r = t.type._context, l = t.memoizedProps.value;
      U(nl, r._currentValue), r._currentValue = l;
      break;
    case 13:
      if (r = t.memoizedState, r !== null)
        return r.dehydrated !== null ? (U(V, V.current & 1), t.flags |= 128, null) : n & t.child.childLanes ? pc(e, t, n) : (U(V, V.current & 1), e = qe(e, t, n), e !== null ? e.sibling : null);
      U(V, V.current & 1);
      break;
    case 19:
      if (r = (n & t.childLanes) !== 0, e.flags & 128) {
        if (r) return hc(e, t, n);
        t.flags |= 128;
      }
      if (l = t.memoizedState, l !== null && (l.rendering = null, l.tail = null, l.lastEffect = null), U(V, V.current), r) break;
      return null;
    case 22:
    case 23:
      return t.lanes = 0, cc(e, t, n);
  }
  return qe(e, t, n);
}
var mc, Qi, gc, vc;
mc = function(e, t) {
  for (var n = t.child; n !== null; ) {
    if (n.tag === 5 || n.tag === 6) e.appendChild(n.stateNode);
    else if (n.tag !== 4 && n.child !== null) {
      n.child.return = n, n = n.child;
      continue;
    }
    if (n === t) break;
    for (; n.sibling === null; ) {
      if (n.return === null || n.return === t) return;
      n = n.return;
    }
    n.sibling.return = n.return, n = n.sibling;
  }
};
Qi = function() {
};
gc = function(e, t, n, r) {
  var l = e.memoizedProps;
  if (l !== r) {
    e = t.stateNode, Et(Be.current);
    var i = null;
    switch (n) {
      case "input":
        l = pi(e, l), r = pi(e, r), i = [];
        break;
      case "select":
        l = H({}, l, { value: void 0 }), r = H({}, r, { value: void 0 }), i = [];
        break;
      case "textarea":
        l = gi(e, l), r = gi(e, r), i = [];
        break;
      default:
        typeof l.onClick != "function" && typeof r.onClick == "function" && (e.onclick = Xr);
    }
    xi(n, r);
    var o;
    n = null;
    for (c in l) if (!r.hasOwnProperty(c) && l.hasOwnProperty(c) && l[c] != null) if (c === "style") {
      var a = l[c];
      for (o in a) a.hasOwnProperty(o) && (n || (n = {}), n[o] = "");
    } else c !== "dangerouslySetInnerHTML" && c !== "children" && c !== "suppressContentEditableWarning" && c !== "suppressHydrationWarning" && c !== "autoFocus" && (In.hasOwnProperty(c) ? i || (i = []) : (i = i || []).push(c, null));
    for (c in r) {
      var u = r[c];
      if (a = l != null ? l[c] : void 0, r.hasOwnProperty(c) && u !== a && (u != null || a != null)) if (c === "style") if (a) {
        for (o in a) !a.hasOwnProperty(o) || u && u.hasOwnProperty(o) || (n || (n = {}), n[o] = "");
        for (o in u) u.hasOwnProperty(o) && a[o] !== u[o] && (n || (n = {}), n[o] = u[o]);
      } else n || (i || (i = []), i.push(
        c,
        n
      )), n = u;
      else c === "dangerouslySetInnerHTML" ? (u = u ? u.__html : void 0, a = a ? a.__html : void 0, u != null && a !== u && (i = i || []).push(c, u)) : c === "children" ? typeof u != "string" && typeof u != "number" || (i = i || []).push(c, "" + u) : c !== "suppressContentEditableWarning" && c !== "suppressHydrationWarning" && (In.hasOwnProperty(c) ? (u != null && c === "onScroll" && A("scroll", e), i || a === u || (i = [])) : (i = i || []).push(c, u));
    }
    n && (i = i || []).push("style", n);
    var c = i;
    (t.updateQueue = c) && (t.flags |= 4);
  }
};
vc = function(e, t, n, r) {
  n !== r && (t.flags |= 4);
};
function jn(e, t) {
  if (!W) switch (e.tailMode) {
    case "hidden":
      t = e.tail;
      for (var n = null; t !== null; ) t.alternate !== null && (n = t), t = t.sibling;
      n === null ? e.tail = null : n.sibling = null;
      break;
    case "collapsed":
      n = e.tail;
      for (var r = null; n !== null; ) n.alternate !== null && (r = n), n = n.sibling;
      r === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : r.sibling = null;
  }
}
function oe(e) {
  var t = e.alternate !== null && e.alternate.child === e.child, n = 0, r = 0;
  if (t) for (var l = e.child; l !== null; ) n |= l.lanes | l.childLanes, r |= l.subtreeFlags & 14680064, r |= l.flags & 14680064, l.return = e, l = l.sibling;
  else for (l = e.child; l !== null; ) n |= l.lanes | l.childLanes, r |= l.subtreeFlags, r |= l.flags, l.return = e, l = l.sibling;
  return e.subtreeFlags |= r, e.childLanes = n, t;
}
function Yf(e, t, n) {
  var r = t.pendingProps;
  switch (bo(t), t.tag) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return oe(t), null;
    case 1:
      return ge(t.type) && Jr(), oe(t), null;
    case 3:
      return r = t.stateNode, un(), B(me), B(ae), Do(), r.pendingContext && (r.context = r.pendingContext, r.pendingContext = null), (e === null || e.child === null) && (_r(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, Le !== null && (qi(Le), Le = null))), Qi(e, t), oe(t), null;
    case 5:
      Mo(t);
      var l = Et(Xn.current);
      if (n = t.type, e !== null && t.stateNode != null) gc(e, t, n, r, l), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
      else {
        if (!r) {
          if (t.stateNode === null) throw Error(C(166));
          return oe(t), null;
        }
        if (e = Et(Be.current), _r(t)) {
          r = t.stateNode, n = t.type;
          var i = t.memoizedProps;
          switch (r[Ue] = t, r[Yn] = i, e = (t.mode & 1) !== 0, n) {
            case "dialog":
              A("cancel", r), A("close", r);
              break;
            case "iframe":
            case "object":
            case "embed":
              A("load", r);
              break;
            case "video":
            case "audio":
              for (l = 0; l < bn.length; l++) A(bn[l], r);
              break;
            case "source":
              A("error", r);
              break;
            case "img":
            case "image":
            case "link":
              A(
                "error",
                r
              ), A("load", r);
              break;
            case "details":
              A("toggle", r);
              break;
            case "input":
              fs(r, i), A("invalid", r);
              break;
            case "select":
              r._wrapperState = { wasMultiple: !!i.multiple }, A("invalid", r);
              break;
            case "textarea":
              hs(r, i), A("invalid", r);
          }
          xi(n, i), l = null;
          for (var o in i) if (i.hasOwnProperty(o)) {
            var a = i[o];
            o === "children" ? typeof a == "string" ? r.textContent !== a && (i.suppressHydrationWarning !== !0 && jr(r.textContent, a, e), l = ["children", a]) : typeof a == "number" && r.textContent !== "" + a && (i.suppressHydrationWarning !== !0 && jr(
              r.textContent,
              a,
              e
            ), l = ["children", "" + a]) : In.hasOwnProperty(o) && a != null && o === "onScroll" && A("scroll", r);
          }
          switch (n) {
            case "input":
              mr(r), ps(r, i, !0);
              break;
            case "textarea":
              mr(r), ms(r);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof i.onClick == "function" && (r.onclick = Xr);
          }
          r = l, t.updateQueue = r, r !== null && (t.flags |= 4);
        } else {
          o = l.nodeType === 9 ? l : l.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = Qa(n)), e === "http://www.w3.org/1999/xhtml" ? n === "script" ? (e = o.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof r.is == "string" ? e = o.createElement(n, { is: r.is }) : (e = o.createElement(n), n === "select" && (o = e, r.multiple ? o.multiple = !0 : r.size && (o.size = r.size))) : e = o.createElementNS(e, n), e[Ue] = t, e[Yn] = r, mc(e, t, !1, !1), t.stateNode = e;
          e: {
            switch (o = yi(n, r), n) {
              case "dialog":
                A("cancel", e), A("close", e), l = r;
                break;
              case "iframe":
              case "object":
              case "embed":
                A("load", e), l = r;
                break;
              case "video":
              case "audio":
                for (l = 0; l < bn.length; l++) A(bn[l], e);
                l = r;
                break;
              case "source":
                A("error", e), l = r;
                break;
              case "img":
              case "image":
              case "link":
                A(
                  "error",
                  e
                ), A("load", e), l = r;
                break;
              case "details":
                A("toggle", e), l = r;
                break;
              case "input":
                fs(e, r), l = pi(e, r), A("invalid", e);
                break;
              case "option":
                l = r;
                break;
              case "select":
                e._wrapperState = { wasMultiple: !!r.multiple }, l = H({}, r, { value: void 0 }), A("invalid", e);
                break;
              case "textarea":
                hs(e, r), l = gi(e, r), A("invalid", e);
                break;
              default:
                l = r;
            }
            xi(n, l), a = l;
            for (i in a) if (a.hasOwnProperty(i)) {
              var u = a[i];
              i === "style" ? Ga(e, u) : i === "dangerouslySetInnerHTML" ? (u = u ? u.__html : void 0, u != null && Ha(e, u)) : i === "children" ? typeof u == "string" ? (n !== "textarea" || u !== "") && Un(e, u) : typeof u == "number" && Un(e, "" + u) : i !== "suppressContentEditableWarning" && i !== "suppressHydrationWarning" && i !== "autoFocus" && (In.hasOwnProperty(i) ? u != null && i === "onScroll" && A("scroll", e) : u != null && po(e, i, u, o));
            }
            switch (n) {
              case "input":
                mr(e), ps(e, r, !1);
                break;
              case "textarea":
                mr(e), ms(e);
                break;
              case "option":
                r.value != null && e.setAttribute("value", "" + gt(r.value));
                break;
              case "select":
                e.multiple = !!r.multiple, i = r.value, i != null ? Xt(e, !!r.multiple, i, !1) : r.defaultValue != null && Xt(
                  e,
                  !!r.multiple,
                  r.defaultValue,
                  !0
                );
                break;
              default:
                typeof l.onClick == "function" && (e.onclick = Xr);
            }
            switch (n) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                r = !!r.autoFocus;
                break e;
              case "img":
                r = !0;
                break e;
              default:
                r = !1;
            }
          }
          r && (t.flags |= 4);
        }
        t.ref !== null && (t.flags |= 512, t.flags |= 2097152);
      }
      return oe(t), null;
    case 6:
      if (e && t.stateNode != null) vc(e, t, e.memoizedProps, r);
      else {
        if (typeof r != "string" && t.stateNode === null) throw Error(C(166));
        if (n = Et(Xn.current), Et(Be.current), _r(t)) {
          if (r = t.stateNode, n = t.memoizedProps, r[Ue] = t, (i = r.nodeValue !== n) && (e = ke, e !== null)) switch (e.tag) {
            case 3:
              jr(r.nodeValue, n, (e.mode & 1) !== 0);
              break;
            case 5:
              e.memoizedProps.suppressHydrationWarning !== !0 && jr(r.nodeValue, n, (e.mode & 1) !== 0);
          }
          i && (t.flags |= 4);
        } else r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r), r[Ue] = t, t.stateNode = r;
      }
      return oe(t), null;
    case 13:
      if (B(V), r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
        if (W && we !== null && t.mode & 1 && !(t.flags & 128)) Ou(), sn(), t.flags |= 98560, i = !1;
        else if (i = _r(t), r !== null && r.dehydrated !== null) {
          if (e === null) {
            if (!i) throw Error(C(318));
            if (i = t.memoizedState, i = i !== null ? i.dehydrated : null, !i) throw Error(C(317));
            i[Ue] = t;
          } else sn(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
          oe(t), i = !1;
        } else Le !== null && (qi(Le), Le = null), i = !0;
        if (!i) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128 ? (t.lanes = n, t) : (r = r !== null, r !== (e !== null && e.memoizedState !== null) && r && (t.child.flags |= 8192, t.mode & 1 && (e === null || V.current & 1 ? J === 0 && (J = 3) : Yo())), t.updateQueue !== null && (t.flags |= 4), oe(t), null);
    case 4:
      return un(), Qi(e, t), e === null && Kn(t.stateNode.containerInfo), oe(t), null;
    case 10:
      return To(t.type._context), oe(t), null;
    case 17:
      return ge(t.type) && Jr(), oe(t), null;
    case 19:
      if (B(V), i = t.memoizedState, i === null) return oe(t), null;
      if (r = (t.flags & 128) !== 0, o = i.rendering, o === null) if (r) jn(i, !1);
      else {
        if (J !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null; ) {
          if (o = il(e), o !== null) {
            for (t.flags |= 128, jn(i, !1), r = o.updateQueue, r !== null && (t.updateQueue = r, t.flags |= 4), t.subtreeFlags = 0, r = n, n = t.child; n !== null; ) i = n, e = r, i.flags &= 14680066, o = i.alternate, o === null ? (i.childLanes = 0, i.lanes = e, i.child = null, i.subtreeFlags = 0, i.memoizedProps = null, i.memoizedState = null, i.updateQueue = null, i.dependencies = null, i.stateNode = null) : (i.childLanes = o.childLanes, i.lanes = o.lanes, i.child = o.child, i.subtreeFlags = 0, i.deletions = null, i.memoizedProps = o.memoizedProps, i.memoizedState = o.memoizedState, i.updateQueue = o.updateQueue, i.type = o.type, e = o.dependencies, i.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }), n = n.sibling;
            return U(V, V.current & 1 | 2), t.child;
          }
          e = e.sibling;
        }
        i.tail !== null && Y() > dn && (t.flags |= 128, r = !0, jn(i, !1), t.lanes = 4194304);
      }
      else {
        if (!r) if (e = il(o), e !== null) {
          if (t.flags |= 128, r = !0, n = e.updateQueue, n !== null && (t.updateQueue = n, t.flags |= 4), jn(i, !0), i.tail === null && i.tailMode === "hidden" && !o.alternate && !W) return oe(t), null;
        } else 2 * Y() - i.renderingStartTime > dn && n !== 1073741824 && (t.flags |= 128, r = !0, jn(i, !1), t.lanes = 4194304);
        i.isBackwards ? (o.sibling = t.child, t.child = o) : (n = i.last, n !== null ? n.sibling = o : t.child = o, i.last = o);
      }
      return i.tail !== null ? (t = i.tail, i.rendering = t, i.tail = t.sibling, i.renderingStartTime = Y(), t.sibling = null, n = V.current, U(V, r ? n & 1 | 2 : n & 1), t) : (oe(t), null);
    case 22:
    case 23:
      return Go(), r = t.memoizedState !== null, e !== null && e.memoizedState !== null !== r && (t.flags |= 8192), r && t.mode & 1 ? ye & 1073741824 && (oe(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : oe(t), null;
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(C(156, t.tag));
}
function Zf(e, t) {
  switch (bo(t), t.tag) {
    case 1:
      return ge(t.type) && Jr(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 3:
      return un(), B(me), B(ae), Do(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
    case 5:
      return Mo(t), null;
    case 13:
      if (B(V), e = t.memoizedState, e !== null && e.dehydrated !== null) {
        if (t.alternate === null) throw Error(C(340));
        sn();
      }
      return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 19:
      return B(V), null;
    case 4:
      return un(), null;
    case 10:
      return To(t.type._context), null;
    case 22:
    case 23:
      return Go(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var Er = !1, se = !1, Xf = typeof WeakSet == "function" ? WeakSet : Set, b = null;
function Yt(e, t) {
  var n = e.ref;
  if (n !== null) if (typeof n == "function") try {
    n(null);
  } catch (r) {
    K(e, t, r);
  }
  else n.current = null;
}
function Hi(e, t, n) {
  try {
    n();
  } catch (r) {
    K(e, t, r);
  }
}
var la = !1;
function Jf(e, t) {
  if (zi = Gr, e = Su(), Co(e)) {
    if ("selectionStart" in e) var n = { start: e.selectionStart, end: e.selectionEnd };
    else e: {
      n = (n = e.ownerDocument) && n.defaultView || window;
      var r = n.getSelection && n.getSelection();
      if (r && r.rangeCount !== 0) {
        n = r.anchorNode;
        var l = r.anchorOffset, i = r.focusNode;
        r = r.focusOffset;
        try {
          n.nodeType, i.nodeType;
        } catch {
          n = null;
          break e;
        }
        var o = 0, a = -1, u = -1, c = 0, h = 0, g = e, m = null;
        t: for (; ; ) {
          for (var y; g !== n || l !== 0 && g.nodeType !== 3 || (a = o + l), g !== i || r !== 0 && g.nodeType !== 3 || (u = o + r), g.nodeType === 3 && (o += g.nodeValue.length), (y = g.firstChild) !== null; )
            m = g, g = y;
          for (; ; ) {
            if (g === e) break t;
            if (m === n && ++c === l && (a = o), m === i && ++h === r && (u = o), (y = g.nextSibling) !== null) break;
            g = m, m = g.parentNode;
          }
          g = y;
        }
        n = a === -1 || u === -1 ? null : { start: a, end: u };
      } else n = null;
    }
    n = n || { start: 0, end: 0 };
  } else n = null;
  for ($i = { focusedElem: e, selectionRange: n }, Gr = !1, b = t; b !== null; ) if (t = b, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null) e.return = t, b = e;
  else for (; b !== null; ) {
    t = b;
    try {
      var k = t.alternate;
      if (t.flags & 1024) switch (t.tag) {
        case 0:
        case 11:
        case 15:
          break;
        case 1:
          if (k !== null) {
            var j = k.memoizedProps, N = k.memoizedState, f = t.stateNode, d = f.getSnapshotBeforeUpdate(t.elementType === t.type ? j : Te(t.type, j), N);
            f.__reactInternalSnapshotBeforeUpdate = d;
          }
          break;
        case 3:
          var p = t.stateNode.containerInfo;
          p.nodeType === 1 ? p.textContent = "" : p.nodeType === 9 && p.documentElement && p.removeChild(p.documentElement);
          break;
        case 5:
        case 6:
        case 4:
        case 17:
          break;
        default:
          throw Error(C(163));
      }
    } catch (x) {
      K(t, t.return, x);
    }
    if (e = t.sibling, e !== null) {
      e.return = t.return, b = e;
      break;
    }
    b = t.return;
  }
  return k = la, la = !1, k;
}
function On(e, t, n) {
  var r = t.updateQueue;
  if (r = r !== null ? r.lastEffect : null, r !== null) {
    var l = r = r.next;
    do {
      if ((l.tag & e) === e) {
        var i = l.destroy;
        l.destroy = void 0, i !== void 0 && Hi(t, n, i);
      }
      l = l.next;
    } while (l !== r);
  }
}
function Sl(e, t) {
  if (t = t.updateQueue, t = t !== null ? t.lastEffect : null, t !== null) {
    var n = t = t.next;
    do {
      if ((n.tag & e) === e) {
        var r = n.create;
        n.destroy = r();
      }
      n = n.next;
    } while (n !== t);
  }
}
function Ki(e) {
  var t = e.ref;
  if (t !== null) {
    var n = e.stateNode;
    switch (e.tag) {
      case 5:
        e = n;
        break;
      default:
        e = n;
    }
    typeof t == "function" ? t(e) : t.current = e;
  }
}
function xc(e) {
  var t = e.alternate;
  t !== null && (e.alternate = null, xc(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[Ue], delete t[Yn], delete t[Ri], delete t[Lf], delete t[Of])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
}
function yc(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function ia(e) {
  e: for (; ; ) {
    for (; e.sibling === null; ) {
      if (e.return === null || yc(e.return)) return null;
      e = e.return;
    }
    for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
      if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
      e.child.return = e, e = e.child;
    }
    if (!(e.flags & 2)) return e.stateNode;
  }
}
function Gi(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6) e = e.stateNode, t ? n.nodeType === 8 ? n.parentNode.insertBefore(e, t) : n.insertBefore(e, t) : (n.nodeType === 8 ? (t = n.parentNode, t.insertBefore(e, n)) : (t = n, t.appendChild(e)), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = Xr));
  else if (r !== 4 && (e = e.child, e !== null)) for (Gi(e, t, n), e = e.sibling; e !== null; ) Gi(e, t, n), e = e.sibling;
}
function Yi(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
  else if (r !== 4 && (e = e.child, e !== null)) for (Yi(e, t, n), e = e.sibling; e !== null; ) Yi(e, t, n), e = e.sibling;
}
var ne = null, Re = !1;
function tt(e, t, n) {
  for (n = n.child; n !== null; ) wc(e, t, n), n = n.sibling;
}
function wc(e, t, n) {
  if (Ae && typeof Ae.onCommitFiberUnmount == "function") try {
    Ae.onCommitFiberUnmount(hl, n);
  } catch {
  }
  switch (n.tag) {
    case 5:
      se || Yt(n, t);
    case 6:
      var r = ne, l = Re;
      ne = null, tt(e, t, n), ne = r, Re = l, ne !== null && (Re ? (e = ne, n = n.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n)) : ne.removeChild(n.stateNode));
      break;
    case 18:
      ne !== null && (Re ? (e = ne, n = n.stateNode, e.nodeType === 8 ? Xl(e.parentNode, n) : e.nodeType === 1 && Xl(e, n), Vn(e)) : Xl(ne, n.stateNode));
      break;
    case 4:
      r = ne, l = Re, ne = n.stateNode.containerInfo, Re = !0, tt(e, t, n), ne = r, Re = l;
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (!se && (r = n.updateQueue, r !== null && (r = r.lastEffect, r !== null))) {
        l = r = r.next;
        do {
          var i = l, o = i.destroy;
          i = i.tag, o !== void 0 && (i & 2 || i & 4) && Hi(n, t, o), l = l.next;
        } while (l !== r);
      }
      tt(e, t, n);
      break;
    case 1:
      if (!se && (Yt(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function")) try {
        r.props = n.memoizedProps, r.state = n.memoizedState, r.componentWillUnmount();
      } catch (a) {
        K(n, t, a);
      }
      tt(e, t, n);
      break;
    case 21:
      tt(e, t, n);
      break;
    case 22:
      n.mode & 1 ? (se = (r = se) || n.memoizedState !== null, tt(e, t, n), se = r) : tt(e, t, n);
      break;
    default:
      tt(e, t, n);
  }
}
function oa(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    n === null && (n = e.stateNode = new Xf()), t.forEach(function(r) {
      var l = sp.bind(null, e, r);
      n.has(r) || (n.add(r), r.then(l, l));
    });
  }
}
function Pe(e, t) {
  var n = t.deletions;
  if (n !== null) for (var r = 0; r < n.length; r++) {
    var l = n[r];
    try {
      var i = e, o = t, a = o;
      e: for (; a !== null; ) {
        switch (a.tag) {
          case 5:
            ne = a.stateNode, Re = !1;
            break e;
          case 3:
            ne = a.stateNode.containerInfo, Re = !0;
            break e;
          case 4:
            ne = a.stateNode.containerInfo, Re = !0;
            break e;
        }
        a = a.return;
      }
      if (ne === null) throw Error(C(160));
      wc(i, o, l), ne = null, Re = !1;
      var u = l.alternate;
      u !== null && (u.return = null), l.return = null;
    } catch (c) {
      K(l, t, c);
    }
  }
  if (t.subtreeFlags & 12854) for (t = t.child; t !== null; ) kc(t, e), t = t.sibling;
}
function kc(e, t) {
  var n = e.alternate, r = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if (Pe(t, e), Fe(e), r & 4) {
        try {
          On(3, e, e.return), Sl(3, e);
        } catch (j) {
          K(e, e.return, j);
        }
        try {
          On(5, e, e.return);
        } catch (j) {
          K(e, e.return, j);
        }
      }
      break;
    case 1:
      Pe(t, e), Fe(e), r & 512 && n !== null && Yt(n, n.return);
      break;
    case 5:
      if (Pe(t, e), Fe(e), r & 512 && n !== null && Yt(n, n.return), e.flags & 32) {
        var l = e.stateNode;
        try {
          Un(l, "");
        } catch (j) {
          K(e, e.return, j);
        }
      }
      if (r & 4 && (l = e.stateNode, l != null)) {
        var i = e.memoizedProps, o = n !== null ? n.memoizedProps : i, a = e.type, u = e.updateQueue;
        if (e.updateQueue = null, u !== null) try {
          a === "input" && i.type === "radio" && i.name != null && Wa(l, i), yi(a, o);
          var c = yi(a, i);
          for (o = 0; o < u.length; o += 2) {
            var h = u[o], g = u[o + 1];
            h === "style" ? Ga(l, g) : h === "dangerouslySetInnerHTML" ? Ha(l, g) : h === "children" ? Un(l, g) : po(l, h, g, c);
          }
          switch (a) {
            case "input":
              hi(l, i);
              break;
            case "textarea":
              Va(l, i);
              break;
            case "select":
              var m = l._wrapperState.wasMultiple;
              l._wrapperState.wasMultiple = !!i.multiple;
              var y = i.value;
              y != null ? Xt(l, !!i.multiple, y, !1) : m !== !!i.multiple && (i.defaultValue != null ? Xt(
                l,
                !!i.multiple,
                i.defaultValue,
                !0
              ) : Xt(l, !!i.multiple, i.multiple ? [] : "", !1));
          }
          l[Yn] = i;
        } catch (j) {
          K(e, e.return, j);
        }
      }
      break;
    case 6:
      if (Pe(t, e), Fe(e), r & 4) {
        if (e.stateNode === null) throw Error(C(162));
        l = e.stateNode, i = e.memoizedProps;
        try {
          l.nodeValue = i;
        } catch (j) {
          K(e, e.return, j);
        }
      }
      break;
    case 3:
      if (Pe(t, e), Fe(e), r & 4 && n !== null && n.memoizedState.isDehydrated) try {
        Vn(t.containerInfo);
      } catch (j) {
        K(e, e.return, j);
      }
      break;
    case 4:
      Pe(t, e), Fe(e);
      break;
    case 13:
      Pe(t, e), Fe(e), l = e.child, l.flags & 8192 && (i = l.memoizedState !== null, l.stateNode.isHidden = i, !i || l.alternate !== null && l.alternate.memoizedState !== null || (Ho = Y())), r & 4 && oa(e);
      break;
    case 22:
      if (h = n !== null && n.memoizedState !== null, e.mode & 1 ? (se = (c = se) || h, Pe(t, e), se = c) : Pe(t, e), Fe(e), r & 8192) {
        if (c = e.memoizedState !== null, (e.stateNode.isHidden = c) && !h && e.mode & 1) for (b = e, h = e.child; h !== null; ) {
          for (g = b = h; b !== null; ) {
            switch (m = b, y = m.child, m.tag) {
              case 0:
              case 11:
              case 14:
              case 15:
                On(4, m, m.return);
                break;
              case 1:
                Yt(m, m.return);
                var k = m.stateNode;
                if (typeof k.componentWillUnmount == "function") {
                  r = m, n = m.return;
                  try {
                    t = r, k.props = t.memoizedProps, k.state = t.memoizedState, k.componentWillUnmount();
                  } catch (j) {
                    K(r, n, j);
                  }
                }
                break;
              case 5:
                Yt(m, m.return);
                break;
              case 22:
                if (m.memoizedState !== null) {
                  aa(g);
                  continue;
                }
            }
            y !== null ? (y.return = m, b = y) : aa(g);
          }
          h = h.sibling;
        }
        e: for (h = null, g = e; ; ) {
          if (g.tag === 5) {
            if (h === null) {
              h = g;
              try {
                l = g.stateNode, c ? (i = l.style, typeof i.setProperty == "function" ? i.setProperty("display", "none", "important") : i.display = "none") : (a = g.stateNode, u = g.memoizedProps.style, o = u != null && u.hasOwnProperty("display") ? u.display : null, a.style.display = Ka("display", o));
              } catch (j) {
                K(e, e.return, j);
              }
            }
          } else if (g.tag === 6) {
            if (h === null) try {
              g.stateNode.nodeValue = c ? "" : g.memoizedProps;
            } catch (j) {
              K(e, e.return, j);
            }
          } else if ((g.tag !== 22 && g.tag !== 23 || g.memoizedState === null || g === e) && g.child !== null) {
            g.child.return = g, g = g.child;
            continue;
          }
          if (g === e) break e;
          for (; g.sibling === null; ) {
            if (g.return === null || g.return === e) break e;
            h === g && (h = null), g = g.return;
          }
          h === g && (h = null), g.sibling.return = g.return, g = g.sibling;
        }
      }
      break;
    case 19:
      Pe(t, e), Fe(e), r & 4 && oa(e);
      break;
    case 21:
      break;
    default:
      Pe(
        t,
        e
      ), Fe(e);
  }
}
function Fe(e) {
  var t = e.flags;
  if (t & 2) {
    try {
      e: {
        for (var n = e.return; n !== null; ) {
          if (yc(n)) {
            var r = n;
            break e;
          }
          n = n.return;
        }
        throw Error(C(160));
      }
      switch (r.tag) {
        case 5:
          var l = r.stateNode;
          r.flags & 32 && (Un(l, ""), r.flags &= -33);
          var i = ia(e);
          Yi(e, i, l);
          break;
        case 3:
        case 4:
          var o = r.stateNode.containerInfo, a = ia(e);
          Gi(e, a, o);
          break;
        default:
          throw Error(C(161));
      }
    } catch (u) {
      K(e, e.return, u);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function qf(e, t, n) {
  b = e, Sc(e);
}
function Sc(e, t, n) {
  for (var r = (e.mode & 1) !== 0; b !== null; ) {
    var l = b, i = l.child;
    if (l.tag === 22 && r) {
      var o = l.memoizedState !== null || Er;
      if (!o) {
        var a = l.alternate, u = a !== null && a.memoizedState !== null || se;
        a = Er;
        var c = se;
        if (Er = o, (se = u) && !c) for (b = l; b !== null; ) o = b, u = o.child, o.tag === 22 && o.memoizedState !== null ? ua(l) : u !== null ? (u.return = o, b = u) : ua(l);
        for (; i !== null; ) b = i, Sc(i), i = i.sibling;
        b = l, Er = a, se = c;
      }
      sa(e);
    } else l.subtreeFlags & 8772 && i !== null ? (i.return = l, b = i) : sa(e);
  }
}
function sa(e) {
  for (; b !== null; ) {
    var t = b;
    if (t.flags & 8772) {
      var n = t.alternate;
      try {
        if (t.flags & 8772) switch (t.tag) {
          case 0:
          case 11:
          case 15:
            se || Sl(5, t);
            break;
          case 1:
            var r = t.stateNode;
            if (t.flags & 4 && !se) if (n === null) r.componentDidMount();
            else {
              var l = t.elementType === t.type ? n.memoizedProps : Te(t.type, n.memoizedProps);
              r.componentDidUpdate(l, n.memoizedState, r.__reactInternalSnapshotBeforeUpdate);
            }
            var i = t.updateQueue;
            i !== null && Qs(t, i, r);
            break;
          case 3:
            var o = t.updateQueue;
            if (o !== null) {
              if (n = null, t.child !== null) switch (t.child.tag) {
                case 5:
                  n = t.child.stateNode;
                  break;
                case 1:
                  n = t.child.stateNode;
              }
              Qs(t, o, n);
            }
            break;
          case 5:
            var a = t.stateNode;
            if (n === null && t.flags & 4) {
              n = a;
              var u = t.memoizedProps;
              switch (t.type) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  u.autoFocus && n.focus();
                  break;
                case "img":
                  u.src && (n.src = u.src);
              }
            }
            break;
          case 6:
            break;
          case 4:
            break;
          case 12:
            break;
          case 13:
            if (t.memoizedState === null) {
              var c = t.alternate;
              if (c !== null) {
                var h = c.memoizedState;
                if (h !== null) {
                  var g = h.dehydrated;
                  g !== null && Vn(g);
                }
              }
            }
            break;
          case 19:
          case 17:
          case 21:
          case 22:
          case 23:
          case 25:
            break;
          default:
            throw Error(C(163));
        }
        se || t.flags & 512 && Ki(t);
      } catch (m) {
        K(t, t.return, m);
      }
    }
    if (t === e) {
      b = null;
      break;
    }
    if (n = t.sibling, n !== null) {
      n.return = t.return, b = n;
      break;
    }
    b = t.return;
  }
}
function aa(e) {
  for (; b !== null; ) {
    var t = b;
    if (t === e) {
      b = null;
      break;
    }
    var n = t.sibling;
    if (n !== null) {
      n.return = t.return, b = n;
      break;
    }
    b = t.return;
  }
}
function ua(e) {
  for (; b !== null; ) {
    var t = b;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return;
          try {
            Sl(4, t);
          } catch (u) {
            K(t, n, u);
          }
          break;
        case 1:
          var r = t.stateNode;
          if (typeof r.componentDidMount == "function") {
            var l = t.return;
            try {
              r.componentDidMount();
            } catch (u) {
              K(t, l, u);
            }
          }
          var i = t.return;
          try {
            Ki(t);
          } catch (u) {
            K(t, i, u);
          }
          break;
        case 5:
          var o = t.return;
          try {
            Ki(t);
          } catch (u) {
            K(t, o, u);
          }
      }
    } catch (u) {
      K(t, t.return, u);
    }
    if (t === e) {
      b = null;
      break;
    }
    var a = t.sibling;
    if (a !== null) {
      a.return = t.return, b = a;
      break;
    }
    b = t.return;
  }
}
var ep = Math.ceil, al = et.ReactCurrentDispatcher, Vo = et.ReactCurrentOwner, be = et.ReactCurrentBatchConfig, D = 0, te = null, Z = null, re = 0, ye = 0, Zt = yt(0), J = 0, tr = null, Lt = 0, jl = 0, Qo = 0, Mn = null, pe = null, Ho = 0, dn = 1 / 0, We = null, ul = !1, Zi = null, pt = null, br = !1, st = null, cl = 0, Dn = 0, Xi = null, Ir = -1, Ur = 0;
function ce() {
  return D & 6 ? Y() : Ir !== -1 ? Ir : Ir = Y();
}
function ht(e) {
  return e.mode & 1 ? D & 2 && re !== 0 ? re & -re : Df.transition !== null ? (Ur === 0 && (Ur = ou()), Ur) : (e = I, e !== 0 || (e = window.event, e = e === void 0 ? 16 : pu(e.type)), e) : 1;
}
function Me(e, t, n, r) {
  if (50 < Dn) throw Dn = 0, Xi = null, Error(C(185));
  or(e, n, r), (!(D & 2) || e !== te) && (e === te && (!(D & 2) && (jl |= n), J === 4 && it(e, re)), ve(e, r), n === 1 && D === 0 && !(t.mode & 1) && (dn = Y() + 500, yl && wt()));
}
function ve(e, t) {
  var n = e.callbackNode;
  Md(e, t);
  var r = Kr(e, e === te ? re : 0);
  if (r === 0) n !== null && xs(n), e.callbackNode = null, e.callbackPriority = 0;
  else if (t = r & -r, e.callbackPriority !== t) {
    if (n != null && xs(n), t === 1) e.tag === 0 ? Mf(ca.bind(null, e)) : Tu(ca.bind(null, e)), Tf(function() {
      !(D & 6) && wt();
    }), n = null;
    else {
      switch (su(r)) {
        case 1:
          n = xo;
          break;
        case 4:
          n = lu;
          break;
        case 16:
          n = Hr;
          break;
        case 536870912:
          n = iu;
          break;
        default:
          n = Hr;
      }
      n = $c(n, jc.bind(null, e));
    }
    e.callbackPriority = t, e.callbackNode = n;
  }
}
function jc(e, t) {
  if (Ir = -1, Ur = 0, D & 6) throw Error(C(327));
  var n = e.callbackNode;
  if (nn() && e.callbackNode !== n) return null;
  var r = Kr(e, e === te ? re : 0);
  if (r === 0) return null;
  if (r & 30 || r & e.expiredLanes || t) t = dl(e, r);
  else {
    t = r;
    var l = D;
    D |= 2;
    var i = Nc();
    (te !== e || re !== t) && (We = null, dn = Y() + 500, zt(e, t));
    do
      try {
        rp();
        break;
      } catch (a) {
        _c(e, a);
      }
    while (!0);
    Po(), al.current = i, D = l, Z !== null ? t = 0 : (te = null, re = 0, t = J);
  }
  if (t !== 0) {
    if (t === 2 && (l = _i(e), l !== 0 && (r = l, t = Ji(e, l))), t === 1) throw n = tr, zt(e, 0), it(e, r), ve(e, Y()), n;
    if (t === 6) it(e, r);
    else {
      if (l = e.current.alternate, !(r & 30) && !tp(l) && (t = dl(e, r), t === 2 && (i = _i(e), i !== 0 && (r = i, t = Ji(e, i))), t === 1)) throw n = tr, zt(e, 0), it(e, r), ve(e, Y()), n;
      switch (e.finishedWork = l, e.finishedLanes = r, t) {
        case 0:
        case 1:
          throw Error(C(345));
        case 2:
          _t(e, pe, We);
          break;
        case 3:
          if (it(e, r), (r & 130023424) === r && (t = Ho + 500 - Y(), 10 < t)) {
            if (Kr(e, 0) !== 0) break;
            if (l = e.suspendedLanes, (l & r) !== r) {
              ce(), e.pingedLanes |= e.suspendedLanes & l;
              break;
            }
            e.timeoutHandle = Ti(_t.bind(null, e, pe, We), t);
            break;
          }
          _t(e, pe, We);
          break;
        case 4:
          if (it(e, r), (r & 4194240) === r) break;
          for (t = e.eventTimes, l = -1; 0 < r; ) {
            var o = 31 - Oe(r);
            i = 1 << o, o = t[o], o > l && (l = o), r &= ~i;
          }
          if (r = l, r = Y() - r, r = (120 > r ? 120 : 480 > r ? 480 : 1080 > r ? 1080 : 1920 > r ? 1920 : 3e3 > r ? 3e3 : 4320 > r ? 4320 : 1960 * ep(r / 1960)) - r, 10 < r) {
            e.timeoutHandle = Ti(_t.bind(null, e, pe, We), r);
            break;
          }
          _t(e, pe, We);
          break;
        case 5:
          _t(e, pe, We);
          break;
        default:
          throw Error(C(329));
      }
    }
  }
  return ve(e, Y()), e.callbackNode === n ? jc.bind(null, e) : null;
}
function Ji(e, t) {
  var n = Mn;
  return e.current.memoizedState.isDehydrated && (zt(e, t).flags |= 256), e = dl(e, t), e !== 2 && (t = pe, pe = n, t !== null && qi(t)), e;
}
function qi(e) {
  pe === null ? pe = e : pe.push.apply(pe, e);
}
function tp(e) {
  for (var t = e; ; ) {
    if (t.flags & 16384) {
      var n = t.updateQueue;
      if (n !== null && (n = n.stores, n !== null)) for (var r = 0; r < n.length; r++) {
        var l = n[r], i = l.getSnapshot;
        l = l.value;
        try {
          if (!De(i(), l)) return !1;
        } catch {
          return !1;
        }
      }
    }
    if (n = t.child, t.subtreeFlags & 16384 && n !== null) n.return = t, t = n;
    else {
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return !0;
        t = t.return;
      }
      t.sibling.return = t.return, t = t.sibling;
    }
  }
  return !0;
}
function it(e, t) {
  for (t &= ~Qo, t &= ~jl, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t; ) {
    var n = 31 - Oe(t), r = 1 << n;
    e[n] = -1, t &= ~r;
  }
}
function ca(e) {
  if (D & 6) throw Error(C(327));
  nn();
  var t = Kr(e, 0);
  if (!(t & 1)) return ve(e, Y()), null;
  var n = dl(e, t);
  if (e.tag !== 0 && n === 2) {
    var r = _i(e);
    r !== 0 && (t = r, n = Ji(e, r));
  }
  if (n === 1) throw n = tr, zt(e, 0), it(e, t), ve(e, Y()), n;
  if (n === 6) throw Error(C(345));
  return e.finishedWork = e.current.alternate, e.finishedLanes = t, _t(e, pe, We), ve(e, Y()), null;
}
function Ko(e, t) {
  var n = D;
  D |= 1;
  try {
    return e(t);
  } finally {
    D = n, D === 0 && (dn = Y() + 500, yl && wt());
  }
}
function Ot(e) {
  st !== null && st.tag === 0 && !(D & 6) && nn();
  var t = D;
  D |= 1;
  var n = be.transition, r = I;
  try {
    if (be.transition = null, I = 1, e) return e();
  } finally {
    I = r, be.transition = n, D = t, !(D & 6) && wt();
  }
}
function Go() {
  ye = Zt.current, B(Zt);
}
function zt(e, t) {
  e.finishedWork = null, e.finishedLanes = 0;
  var n = e.timeoutHandle;
  if (n !== -1 && (e.timeoutHandle = -1, Pf(n)), Z !== null) for (n = Z.return; n !== null; ) {
    var r = n;
    switch (bo(r), r.tag) {
      case 1:
        r = r.type.childContextTypes, r != null && Jr();
        break;
      case 3:
        un(), B(me), B(ae), Do();
        break;
      case 5:
        Mo(r);
        break;
      case 4:
        un();
        break;
      case 13:
        B(V);
        break;
      case 19:
        B(V);
        break;
      case 10:
        To(r.type._context);
        break;
      case 22:
      case 23:
        Go();
    }
    n = n.return;
  }
  if (te = e, Z = e = mt(e.current, null), re = ye = t, J = 0, tr = null, Qo = jl = Lt = 0, pe = Mn = null, Ct !== null) {
    for (t = 0; t < Ct.length; t++) if (n = Ct[t], r = n.interleaved, r !== null) {
      n.interleaved = null;
      var l = r.next, i = n.pending;
      if (i !== null) {
        var o = i.next;
        i.next = l, r.next = o;
      }
      n.pending = r;
    }
    Ct = null;
  }
  return e;
}
function _c(e, t) {
  do {
    var n = Z;
    try {
      if (Po(), Mr.current = sl, ol) {
        for (var r = Q.memoizedState; r !== null; ) {
          var l = r.queue;
          l !== null && (l.pending = null), r = r.next;
        }
        ol = !1;
      }
      if (Rt = 0, ee = X = Q = null, Ln = !1, Jn = 0, Vo.current = null, n === null || n.return === null) {
        J = 1, tr = t, Z = null;
        break;
      }
      e: {
        var i = e, o = n.return, a = n, u = t;
        if (t = re, a.flags |= 32768, u !== null && typeof u == "object" && typeof u.then == "function") {
          var c = u, h = a, g = h.tag;
          if (!(h.mode & 1) && (g === 0 || g === 11 || g === 15)) {
            var m = h.alternate;
            m ? (h.updateQueue = m.updateQueue, h.memoizedState = m.memoizedState, h.lanes = m.lanes) : (h.updateQueue = null, h.memoizedState = null);
          }
          var y = Xs(o);
          if (y !== null) {
            y.flags &= -257, Js(y, o, a, i, t), y.mode & 1 && Zs(i, c, t), t = y, u = c;
            var k = t.updateQueue;
            if (k === null) {
              var j = /* @__PURE__ */ new Set();
              j.add(u), t.updateQueue = j;
            } else k.add(u);
            break e;
          } else {
            if (!(t & 1)) {
              Zs(i, c, t), Yo();
              break e;
            }
            u = Error(C(426));
          }
        } else if (W && a.mode & 1) {
          var N = Xs(o);
          if (N !== null) {
            !(N.flags & 65536) && (N.flags |= 256), Js(N, o, a, i, t), zo(cn(u, a));
            break e;
          }
        }
        i = u = cn(u, a), J !== 4 && (J = 2), Mn === null ? Mn = [i] : Mn.push(i), i = o;
        do {
          switch (i.tag) {
            case 3:
              i.flags |= 65536, t &= -t, i.lanes |= t;
              var f = sc(i, u, t);
              Vs(i, f);
              break e;
            case 1:
              a = u;
              var d = i.type, p = i.stateNode;
              if (!(i.flags & 128) && (typeof d.getDerivedStateFromError == "function" || p !== null && typeof p.componentDidCatch == "function" && (pt === null || !pt.has(p)))) {
                i.flags |= 65536, t &= -t, i.lanes |= t;
                var x = ac(i, a, t);
                Vs(i, x);
                break e;
              }
          }
          i = i.return;
        } while (i !== null);
      }
      Ec(n);
    } catch (S) {
      t = S, Z === n && n !== null && (Z = n = n.return);
      continue;
    }
    break;
  } while (!0);
}
function Nc() {
  var e = al.current;
  return al.current = sl, e === null ? sl : e;
}
function Yo() {
  (J === 0 || J === 3 || J === 2) && (J = 4), te === null || !(Lt & 268435455) && !(jl & 268435455) || it(te, re);
}
function dl(e, t) {
  var n = D;
  D |= 2;
  var r = Nc();
  (te !== e || re !== t) && (We = null, zt(e, t));
  do
    try {
      np();
      break;
    } catch (l) {
      _c(e, l);
    }
  while (!0);
  if (Po(), D = n, al.current = r, Z !== null) throw Error(C(261));
  return te = null, re = 0, J;
}
function np() {
  for (; Z !== null; ) Cc(Z);
}
function rp() {
  for (; Z !== null && !Ed(); ) Cc(Z);
}
function Cc(e) {
  var t = zc(e.alternate, e, ye);
  e.memoizedProps = e.pendingProps, t === null ? Ec(e) : Z = t, Vo.current = null;
}
function Ec(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (e = t.return, t.flags & 32768) {
      if (n = Zf(n, t), n !== null) {
        n.flags &= 32767, Z = n;
        return;
      }
      if (e !== null) e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
      else {
        J = 6, Z = null;
        return;
      }
    } else if (n = Yf(n, t, ye), n !== null) {
      Z = n;
      return;
    }
    if (t = t.sibling, t !== null) {
      Z = t;
      return;
    }
    Z = t = e;
  } while (t !== null);
  J === 0 && (J = 5);
}
function _t(e, t, n) {
  var r = I, l = be.transition;
  try {
    be.transition = null, I = 1, lp(e, t, n, r);
  } finally {
    be.transition = l, I = r;
  }
  return null;
}
function lp(e, t, n, r) {
  do
    nn();
  while (st !== null);
  if (D & 6) throw Error(C(327));
  n = e.finishedWork;
  var l = e.finishedLanes;
  if (n === null) return null;
  if (e.finishedWork = null, e.finishedLanes = 0, n === e.current) throw Error(C(177));
  e.callbackNode = null, e.callbackPriority = 0;
  var i = n.lanes | n.childLanes;
  if (Dd(e, i), e === te && (Z = te = null, re = 0), !(n.subtreeFlags & 2064) && !(n.flags & 2064) || br || (br = !0, $c(Hr, function() {
    return nn(), null;
  })), i = (n.flags & 15990) !== 0, n.subtreeFlags & 15990 || i) {
    i = be.transition, be.transition = null;
    var o = I;
    I = 1;
    var a = D;
    D |= 4, Vo.current = null, Jf(e, n), kc(n, e), _f($i), Gr = !!zi, $i = zi = null, e.current = n, qf(n), bd(), D = a, I = o, be.transition = i;
  } else e.current = n;
  if (br && (br = !1, st = e, cl = l), i = e.pendingLanes, i === 0 && (pt = null), Pd(n.stateNode), ve(e, Y()), t !== null) for (r = e.onRecoverableError, n = 0; n < t.length; n++) l = t[n], r(l.value, { componentStack: l.stack, digest: l.digest });
  if (ul) throw ul = !1, e = Zi, Zi = null, e;
  return cl & 1 && e.tag !== 0 && nn(), i = e.pendingLanes, i & 1 ? e === Xi ? Dn++ : (Dn = 0, Xi = e) : Dn = 0, wt(), null;
}
function nn() {
  if (st !== null) {
    var e = su(cl), t = be.transition, n = I;
    try {
      if (be.transition = null, I = 16 > e ? 16 : e, st === null) var r = !1;
      else {
        if (e = st, st = null, cl = 0, D & 6) throw Error(C(331));
        var l = D;
        for (D |= 4, b = e.current; b !== null; ) {
          var i = b, o = i.child;
          if (b.flags & 16) {
            var a = i.deletions;
            if (a !== null) {
              for (var u = 0; u < a.length; u++) {
                var c = a[u];
                for (b = c; b !== null; ) {
                  var h = b;
                  switch (h.tag) {
                    case 0:
                    case 11:
                    case 15:
                      On(8, h, i);
                  }
                  var g = h.child;
                  if (g !== null) g.return = h, b = g;
                  else for (; b !== null; ) {
                    h = b;
                    var m = h.sibling, y = h.return;
                    if (xc(h), h === c) {
                      b = null;
                      break;
                    }
                    if (m !== null) {
                      m.return = y, b = m;
                      break;
                    }
                    b = y;
                  }
                }
              }
              var k = i.alternate;
              if (k !== null) {
                var j = k.child;
                if (j !== null) {
                  k.child = null;
                  do {
                    var N = j.sibling;
                    j.sibling = null, j = N;
                  } while (j !== null);
                }
              }
              b = i;
            }
          }
          if (i.subtreeFlags & 2064 && o !== null) o.return = i, b = o;
          else e: for (; b !== null; ) {
            if (i = b, i.flags & 2048) switch (i.tag) {
              case 0:
              case 11:
              case 15:
                On(9, i, i.return);
            }
            var f = i.sibling;
            if (f !== null) {
              f.return = i.return, b = f;
              break e;
            }
            b = i.return;
          }
        }
        var d = e.current;
        for (b = d; b !== null; ) {
          o = b;
          var p = o.child;
          if (o.subtreeFlags & 2064 && p !== null) p.return = o, b = p;
          else e: for (o = d; b !== null; ) {
            if (a = b, a.flags & 2048) try {
              switch (a.tag) {
                case 0:
                case 11:
                case 15:
                  Sl(9, a);
              }
            } catch (S) {
              K(a, a.return, S);
            }
            if (a === o) {
              b = null;
              break e;
            }
            var x = a.sibling;
            if (x !== null) {
              x.return = a.return, b = x;
              break e;
            }
            b = a.return;
          }
        }
        if (D = l, wt(), Ae && typeof Ae.onPostCommitFiberRoot == "function") try {
          Ae.onPostCommitFiberRoot(hl, e);
        } catch {
        }
        r = !0;
      }
      return r;
    } finally {
      I = n, be.transition = t;
    }
  }
  return !1;
}
function da(e, t, n) {
  t = cn(n, t), t = sc(e, t, 1), e = ft(e, t, 1), t = ce(), e !== null && (or(e, 1, t), ve(e, t));
}
function K(e, t, n) {
  if (e.tag === 3) da(e, e, n);
  else for (; t !== null; ) {
    if (t.tag === 3) {
      da(t, e, n);
      break;
    } else if (t.tag === 1) {
      var r = t.stateNode;
      if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (pt === null || !pt.has(r))) {
        e = cn(n, e), e = ac(t, e, 1), t = ft(t, e, 1), e = ce(), t !== null && (or(t, 1, e), ve(t, e));
        break;
      }
    }
    t = t.return;
  }
}
function ip(e, t, n) {
  var r = e.pingCache;
  r !== null && r.delete(t), t = ce(), e.pingedLanes |= e.suspendedLanes & n, te === e && (re & n) === n && (J === 4 || J === 3 && (re & 130023424) === re && 500 > Y() - Ho ? zt(e, 0) : Qo |= n), ve(e, t);
}
function bc(e, t) {
  t === 0 && (e.mode & 1 ? (t = xr, xr <<= 1, !(xr & 130023424) && (xr = 4194304)) : t = 1);
  var n = ce();
  e = Je(e, t), e !== null && (or(e, t, n), ve(e, n));
}
function op(e) {
  var t = e.memoizedState, n = 0;
  t !== null && (n = t.retryLane), bc(e, n);
}
function sp(e, t) {
  var n = 0;
  switch (e.tag) {
    case 13:
      var r = e.stateNode, l = e.memoizedState;
      l !== null && (n = l.retryLane);
      break;
    case 19:
      r = e.stateNode;
      break;
    default:
      throw Error(C(314));
  }
  r !== null && r.delete(t), bc(e, n);
}
var zc;
zc = function(e, t, n) {
  if (e !== null) if (e.memoizedProps !== t.pendingProps || me.current) he = !0;
  else {
    if (!(e.lanes & n) && !(t.flags & 128)) return he = !1, Gf(e, t, n);
    he = !!(e.flags & 131072);
  }
  else he = !1, W && t.flags & 1048576 && Ru(t, tl, t.index);
  switch (t.lanes = 0, t.tag) {
    case 2:
      var r = t.type;
      Fr(e, t), e = t.pendingProps;
      var l = on(t, ae.current);
      tn(t, n), l = Io(null, t, r, e, l, n);
      var i = Uo();
      return t.flags |= 1, typeof l == "object" && l !== null && typeof l.render == "function" && l.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, ge(r) ? (i = !0, qr(t)) : i = !1, t.memoizedState = l.state !== null && l.state !== void 0 ? l.state : null, Lo(t), l.updater = kl, t.stateNode = l, l._reactInternals = t, Ii(t, r, e, n), t = Bi(null, t, r, !0, i, n)) : (t.tag = 0, W && i && Eo(t), ue(null, t, l, n), t = t.child), t;
    case 16:
      r = t.elementType;
      e: {
        switch (Fr(e, t), e = t.pendingProps, l = r._init, r = l(r._payload), t.type = r, l = t.tag = up(r), e = Te(r, e), l) {
          case 0:
            t = Ai(null, t, r, e, n);
            break e;
          case 1:
            t = ta(null, t, r, e, n);
            break e;
          case 11:
            t = qs(null, t, r, e, n);
            break e;
          case 14:
            t = ea(null, t, r, Te(r.type, e), n);
            break e;
        }
        throw Error(C(
          306,
          r,
          ""
        ));
      }
      return t;
    case 0:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : Te(r, l), Ai(e, t, r, l, n);
    case 1:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : Te(r, l), ta(e, t, r, l, n);
    case 3:
      e: {
        if (fc(t), e === null) throw Error(C(387));
        r = t.pendingProps, i = t.memoizedState, l = i.element, Iu(e, t), ll(t, r, null, n);
        var o = t.memoizedState;
        if (r = o.element, i.isDehydrated) if (i = { element: r, isDehydrated: !1, cache: o.cache, pendingSuspenseBoundaries: o.pendingSuspenseBoundaries, transitions: o.transitions }, t.updateQueue.baseState = i, t.memoizedState = i, t.flags & 256) {
          l = cn(Error(C(423)), t), t = na(e, t, r, n, l);
          break e;
        } else if (r !== l) {
          l = cn(Error(C(424)), t), t = na(e, t, r, n, l);
          break e;
        } else for (we = dt(t.stateNode.containerInfo.firstChild), ke = t, W = !0, Le = null, n = Du(t, null, r, n), t.child = n; n; ) n.flags = n.flags & -3 | 4096, n = n.sibling;
        else {
          if (sn(), r === l) {
            t = qe(e, t, n);
            break e;
          }
          ue(e, t, r, n);
        }
        t = t.child;
      }
      return t;
    case 5:
      return Uu(t), e === null && Mi(t), r = t.type, l = t.pendingProps, i = e !== null ? e.memoizedProps : null, o = l.children, Pi(r, l) ? o = null : i !== null && Pi(r, i) && (t.flags |= 32), dc(e, t), ue(e, t, o, n), t.child;
    case 6:
      return e === null && Mi(t), null;
    case 13:
      return pc(e, t, n);
    case 4:
      return Oo(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = an(t, null, r, n) : ue(e, t, r, n), t.child;
    case 11:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : Te(r, l), qs(e, t, r, l, n);
    case 7:
      return ue(e, t, t.pendingProps, n), t.child;
    case 8:
      return ue(e, t, t.pendingProps.children, n), t.child;
    case 12:
      return ue(e, t, t.pendingProps.children, n), t.child;
    case 10:
      e: {
        if (r = t.type._context, l = t.pendingProps, i = t.memoizedProps, o = l.value, U(nl, r._currentValue), r._currentValue = o, i !== null) if (De(i.value, o)) {
          if (i.children === l.children && !me.current) {
            t = qe(e, t, n);
            break e;
          }
        } else for (i = t.child, i !== null && (i.return = t); i !== null; ) {
          var a = i.dependencies;
          if (a !== null) {
            o = i.child;
            for (var u = a.firstContext; u !== null; ) {
              if (u.context === r) {
                if (i.tag === 1) {
                  u = Ye(-1, n & -n), u.tag = 2;
                  var c = i.updateQueue;
                  if (c !== null) {
                    c = c.shared;
                    var h = c.pending;
                    h === null ? u.next = u : (u.next = h.next, h.next = u), c.pending = u;
                  }
                }
                i.lanes |= n, u = i.alternate, u !== null && (u.lanes |= n), Di(
                  i.return,
                  n,
                  t
                ), a.lanes |= n;
                break;
              }
              u = u.next;
            }
          } else if (i.tag === 10) o = i.type === t.type ? null : i.child;
          else if (i.tag === 18) {
            if (o = i.return, o === null) throw Error(C(341));
            o.lanes |= n, a = o.alternate, a !== null && (a.lanes |= n), Di(o, n, t), o = i.sibling;
          } else o = i.child;
          if (o !== null) o.return = i;
          else for (o = i; o !== null; ) {
            if (o === t) {
              o = null;
              break;
            }
            if (i = o.sibling, i !== null) {
              i.return = o.return, o = i;
              break;
            }
            o = o.return;
          }
          i = o;
        }
        ue(e, t, l.children, n), t = t.child;
      }
      return t;
    case 9:
      return l = t.type, r = t.pendingProps.children, tn(t, n), l = ze(l), r = r(l), t.flags |= 1, ue(e, t, r, n), t.child;
    case 14:
      return r = t.type, l = Te(r, t.pendingProps), l = Te(r.type, l), ea(e, t, r, l, n);
    case 15:
      return uc(e, t, t.type, t.pendingProps, n);
    case 17:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : Te(r, l), Fr(e, t), t.tag = 1, ge(r) ? (e = !0, qr(t)) : e = !1, tn(t, n), oc(t, r, l), Ii(t, r, l, n), Bi(null, t, r, !0, e, n);
    case 19:
      return hc(e, t, n);
    case 22:
      return cc(e, t, n);
  }
  throw Error(C(156, t.tag));
};
function $c(e, t) {
  return ru(e, t);
}
function ap(e, t, n, r) {
  this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
}
function Ee(e, t, n, r) {
  return new ap(e, t, n, r);
}
function Zo(e) {
  return e = e.prototype, !(!e || !e.isReactComponent);
}
function up(e) {
  if (typeof e == "function") return Zo(e) ? 1 : 0;
  if (e != null) {
    if (e = e.$$typeof, e === mo) return 11;
    if (e === go) return 14;
  }
  return 2;
}
function mt(e, t) {
  var n = e.alternate;
  return n === null ? (n = Ee(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 14680064, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n;
}
function Ar(e, t, n, r, l, i) {
  var o = 2;
  if (r = e, typeof e == "function") Zo(e) && (o = 1);
  else if (typeof e == "string") o = 5;
  else e: switch (e) {
    case Ut:
      return $t(n.children, l, i, t);
    case ho:
      o = 8, l |= 8;
      break;
    case ui:
      return e = Ee(12, n, t, l | 2), e.elementType = ui, e.lanes = i, e;
    case ci:
      return e = Ee(13, n, t, l), e.elementType = ci, e.lanes = i, e;
    case di:
      return e = Ee(19, n, t, l), e.elementType = di, e.lanes = i, e;
    case Ua:
      return _l(n, l, i, t);
    default:
      if (typeof e == "object" && e !== null) switch (e.$$typeof) {
        case Fa:
          o = 10;
          break e;
        case Ia:
          o = 9;
          break e;
        case mo:
          o = 11;
          break e;
        case go:
          o = 14;
          break e;
        case nt:
          o = 16, r = null;
          break e;
      }
      throw Error(C(130, e == null ? e : typeof e, ""));
  }
  return t = Ee(o, n, t, l), t.elementType = e, t.type = r, t.lanes = i, t;
}
function $t(e, t, n, r) {
  return e = Ee(7, e, r, t), e.lanes = n, e;
}
function _l(e, t, n, r) {
  return e = Ee(22, e, r, t), e.elementType = Ua, e.lanes = n, e.stateNode = { isHidden: !1 }, e;
}
function ii(e, t, n) {
  return e = Ee(6, e, null, t), e.lanes = n, e;
}
function oi(e, t, n) {
  return t = Ee(4, e.children !== null ? e.children : [], e.key, t), t.lanes = n, t.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }, t;
}
function cp(e, t, n, r, l) {
  this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = Ul(0), this.expirationTimes = Ul(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Ul(0), this.identifierPrefix = r, this.onRecoverableError = l, this.mutableSourceEagerHydrationData = null;
}
function Xo(e, t, n, r, l, i, o, a, u) {
  return e = new cp(e, t, n, a, u), t === 1 ? (t = 1, i === !0 && (t |= 8)) : t = 0, i = Ee(3, null, null, t), e.current = i, i.stateNode = e, i.memoizedState = { element: r, isDehydrated: n, cache: null, transitions: null, pendingSuspenseBoundaries: null }, Lo(i), e;
}
function dp(e, t, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return { $$typeof: It, key: r == null ? null : "" + r, children: e, containerInfo: t, implementation: n };
}
function Pc(e) {
  if (!e) return vt;
  e = e._reactInternals;
  e: {
    if (Dt(e) !== e || e.tag !== 1) throw Error(C(170));
    var t = e;
    do {
      switch (t.tag) {
        case 3:
          t = t.stateNode.context;
          break e;
        case 1:
          if (ge(t.type)) {
            t = t.stateNode.__reactInternalMemoizedMergedChildContext;
            break e;
          }
      }
      t = t.return;
    } while (t !== null);
    throw Error(C(171));
  }
  if (e.tag === 1) {
    var n = e.type;
    if (ge(n)) return Pu(e, n, t);
  }
  return t;
}
function Tc(e, t, n, r, l, i, o, a, u) {
  return e = Xo(n, r, !0, e, l, i, o, a, u), e.context = Pc(null), n = e.current, r = ce(), l = ht(n), i = Ye(r, l), i.callback = t ?? null, ft(n, i, l), e.current.lanes = l, or(e, l, r), ve(e, r), e;
}
function Nl(e, t, n, r) {
  var l = t.current, i = ce(), o = ht(l);
  return n = Pc(n), t.context === null ? t.context = n : t.pendingContext = n, t = Ye(i, o), t.payload = { element: e }, r = r === void 0 ? null : r, r !== null && (t.callback = r), e = ft(l, t, o), e !== null && (Me(e, l, o, i), Or(e, l, o)), o;
}
function fl(e) {
  if (e = e.current, !e.child) return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function fa(e, t) {
  if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t;
  }
}
function Jo(e, t) {
  fa(e, t), (e = e.alternate) && fa(e, t);
}
function fp() {
  return null;
}
var Rc = typeof reportError == "function" ? reportError : function(e) {
  console.error(e);
};
function qo(e) {
  this._internalRoot = e;
}
Cl.prototype.render = qo.prototype.render = function(e) {
  var t = this._internalRoot;
  if (t === null) throw Error(C(409));
  Nl(e, t, null, null);
};
Cl.prototype.unmount = qo.prototype.unmount = function() {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    Ot(function() {
      Nl(null, e, null, null);
    }), t[Xe] = null;
  }
};
function Cl(e) {
  this._internalRoot = e;
}
Cl.prototype.unstable_scheduleHydration = function(e) {
  if (e) {
    var t = cu();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < lt.length && t !== 0 && t < lt[n].priority; n++) ;
    lt.splice(n, 0, e), n === 0 && fu(e);
  }
};
function es(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
}
function El(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "));
}
function pa() {
}
function pp(e, t, n, r, l) {
  if (l) {
    if (typeof r == "function") {
      var i = r;
      r = function() {
        var c = fl(o);
        i.call(c);
      };
    }
    var o = Tc(t, r, e, 0, null, !1, !1, "", pa);
    return e._reactRootContainer = o, e[Xe] = o.current, Kn(e.nodeType === 8 ? e.parentNode : e), Ot(), o;
  }
  for (; l = e.lastChild; ) e.removeChild(l);
  if (typeof r == "function") {
    var a = r;
    r = function() {
      var c = fl(u);
      a.call(c);
    };
  }
  var u = Xo(e, 0, !1, null, null, !1, !1, "", pa);
  return e._reactRootContainer = u, e[Xe] = u.current, Kn(e.nodeType === 8 ? e.parentNode : e), Ot(function() {
    Nl(t, u, n, r);
  }), u;
}
function bl(e, t, n, r, l) {
  var i = n._reactRootContainer;
  if (i) {
    var o = i;
    if (typeof l == "function") {
      var a = l;
      l = function() {
        var u = fl(o);
        a.call(u);
      };
    }
    Nl(t, o, e, l);
  } else o = pp(n, t, e, l, r);
  return fl(o);
}
au = function(e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = En(t.pendingLanes);
        n !== 0 && (yo(t, n | 1), ve(t, Y()), !(D & 6) && (dn = Y() + 500, wt()));
      }
      break;
    case 13:
      Ot(function() {
        var r = Je(e, 1);
        if (r !== null) {
          var l = ce();
          Me(r, e, 1, l);
        }
      }), Jo(e, 1);
  }
};
wo = function(e) {
  if (e.tag === 13) {
    var t = Je(e, 134217728);
    if (t !== null) {
      var n = ce();
      Me(t, e, 134217728, n);
    }
    Jo(e, 134217728);
  }
};
uu = function(e) {
  if (e.tag === 13) {
    var t = ht(e), n = Je(e, t);
    if (n !== null) {
      var r = ce();
      Me(n, e, t, r);
    }
    Jo(e, t);
  }
};
cu = function() {
  return I;
};
du = function(e, t) {
  var n = I;
  try {
    return I = e, t();
  } finally {
    I = n;
  }
};
ki = function(e, t, n) {
  switch (t) {
    case "input":
      if (hi(e, n), t = n.name, n.type === "radio" && t != null) {
        for (n = e; n.parentNode; ) n = n.parentNode;
        for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < n.length; t++) {
          var r = n[t];
          if (r !== e && r.form === e.form) {
            var l = xl(r);
            if (!l) throw Error(C(90));
            Ba(r), hi(r, l);
          }
        }
      }
      break;
    case "textarea":
      Va(e, n);
      break;
    case "select":
      t = n.value, t != null && Xt(e, !!n.multiple, t, !1);
  }
};
Xa = Ko;
Ja = Ot;
var hp = { usingClientEntryPoint: !1, Events: [ar, Vt, xl, Ya, Za, Ko] }, _n = { findFiberByHostInstance: Nt, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, mp = { bundleType: _n.bundleType, version: _n.version, rendererPackageName: _n.rendererPackageName, rendererConfig: _n.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: et.ReactCurrentDispatcher, findHostInstanceByFiber: function(e) {
  return e = tu(e), e === null ? null : e.stateNode;
}, findFiberByHostInstance: _n.findFiberByHostInstance || fp, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var zr = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!zr.isDisabled && zr.supportsFiber) try {
    hl = zr.inject(mp), Ae = zr;
  } catch {
  }
}
je.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = hp;
je.createPortal = function(e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!es(t)) throw Error(C(200));
  return dp(e, t, null, n);
};
je.createRoot = function(e, t) {
  if (!es(e)) throw Error(C(299));
  var n = !1, r = "", l = Rc;
  return t != null && (t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onRecoverableError !== void 0 && (l = t.onRecoverableError)), t = Xo(e, 1, !1, null, null, n, !1, r, l), e[Xe] = t.current, Kn(e.nodeType === 8 ? e.parentNode : e), new qo(t);
};
je.findDOMNode = function(e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function" ? Error(C(188)) : (e = Object.keys(e).join(","), Error(C(268, e)));
  return e = tu(t), e = e === null ? null : e.stateNode, e;
};
je.flushSync = function(e) {
  return Ot(e);
};
je.hydrate = function(e, t, n) {
  if (!El(t)) throw Error(C(200));
  return bl(null, e, t, !0, n);
};
je.hydrateRoot = function(e, t, n) {
  if (!es(e)) throw Error(C(405));
  var r = n != null && n.hydratedSources || null, l = !1, i = "", o = Rc;
  if (n != null && (n.unstable_strictMode === !0 && (l = !0), n.identifierPrefix !== void 0 && (i = n.identifierPrefix), n.onRecoverableError !== void 0 && (o = n.onRecoverableError)), t = Tc(t, null, e, 1, n ?? null, l, !1, i, o), e[Xe] = t.current, Kn(e), r) for (e = 0; e < r.length; e++) n = r[e], l = n._getVersion, l = l(n._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [n, l] : t.mutableSourceEagerHydrationData.push(
    n,
    l
  );
  return new Cl(t);
};
je.render = function(e, t, n) {
  if (!El(t)) throw Error(C(200));
  return bl(null, e, t, !1, n);
};
je.unmountComponentAtNode = function(e) {
  if (!El(e)) throw Error(C(40));
  return e._reactRootContainer ? (Ot(function() {
    bl(null, null, e, !1, function() {
      e._reactRootContainer = null, e[Xe] = null;
    });
  }), !0) : !1;
};
je.unstable_batchedUpdates = Ko;
je.unstable_renderSubtreeIntoContainer = function(e, t, n, r) {
  if (!El(n)) throw Error(C(200));
  if (e == null || e._reactInternals === void 0) throw Error(C(38));
  return bl(e, t, n, !1, r);
};
je.version = "18.3.1-next-f1338f8080-20240426";
function Lc() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Lc);
    } catch (e) {
      console.error(e);
    }
}
Lc(), La.exports = je;
var gp = La.exports, Oc, ha = gp;
Oc = ha.createRoot, ha.hydrateRoot;
function L({ name: e, className: t }) {
  return /* @__PURE__ */ s.jsx("span", { className: `icon-wrap ${t ?? ""}`, "aria-hidden": "true", children: /* @__PURE__ */ s.jsx("ha-icon", { icon: e.includes(":") ? e : `mdi:${e}` }) });
}
function vp() {
  return /* @__PURE__ */ s.jsxs("span", { className: "logo", "aria-hidden": "true", children: [
    /* @__PURE__ */ s.jsx("span", { className: "logo-ring" }),
    /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 512 512", children: [
      /* @__PURE__ */ s.jsx("defs", { children: /* @__PURE__ */ s.jsxs("linearGradient", { id: "hrs-logo", x1: "0", y1: "0", x2: "1", y2: "1", children: [
        /* @__PURE__ */ s.jsx("stop", { offset: "0", stopColor: "#ffb020" }),
        /* @__PURE__ */ s.jsx("stop", { offset: ".5", stopColor: "#ff4f8b" }),
        /* @__PURE__ */ s.jsx("stop", { offset: "1", stopColor: "#5b6bff" })
      ] }) }),
      /* @__PURE__ */ s.jsx(
        "path",
        {
          fill: "url(#hrs-logo)",
          d: "M256 136C314 136 356 180 356 234C356 270 338 294 318 314C302 330 296 344 296 360L216 360C216 344 210 330 194 314C174 294 156 270 156 234C156 180 198 136 256 136Z"
        }
      ),
      /* @__PURE__ */ s.jsx("rect", { x: "216", y: "374", width: "80", height: "22", rx: "11", fill: "url(#hrs-logo)" })
    ] })
  ] });
}
const bt = "No room", xp = {
  RDM002: "Hue Tap Dial",
  RWL020: "Hue Dimmer switch",
  RWL021: "Hue Dimmer switch",
  RWL022: "Hue Dimmer switch",
  ROM001: "Hue Smart button"
}, rn = (e) => e.model === "RDM002", eo = (e) => rn(e) ? { press: "one of the dial's four buttons", rest: "Turn to dim · hold a button for off" } : { press: "the Hue button", rest: "Power button turns on/off · up/down dim" }, Mc = (e) => e.model && xp[e.model] || [e.manufacturer, e.model].filter(Boolean).join(" ");
function zl(e, t) {
  const n = e.dial, r = n ? t.find((o) => o.id === n.group_id) : void 0, l = !!n && e.bound.some((o) => o.group_id === n.group_id), i = !!n && !!r && n.buttons.every(([, o]) => r.scenes.some((a) => a.id === o));
  return { found: !!n, group: r, bound: l, saved: i, done: [!!n, !!r, l, i].filter(Boolean).length };
}
function cr(e, t) {
  if (e.dial_supported)
    return zl(e, t).done === 4 ? { state: "ok", label: "Set up" } : !e.dial && !e.bound.length ? { state: "idle", label: "Not set up" } : { state: "attention", label: "Needs set-up" };
  const n = e.bound.length;
  return n ? { state: "ok", label: n > 1 ? `Bound to ${n}` : "Bound" } : { state: "idle", label: "Not bound" };
}
function yp(e, t, n) {
  const r = /* @__PURE__ */ new Map(), l = (i) => {
    let o = r.get(i);
    return o || (o = { name: i, icon: n[i] || "mdi:home-outline", groups: [], remotes: [], attention: [] }, r.set(i, o)), o;
  };
  for (const i of e) l(i.areas[0] ?? bt).groups.push(i);
  for (const i of t) {
    const o = l(i.area ?? bt);
    o.remotes.push(i), cr(i, e).state === "attention" && o.attention.push(i);
  }
  return [...r.values()].sort(
    (i, o) => +(o.attention.length > 0) - +(i.attention.length > 0) || +(i.name === bt) - +(o.name === bt) || i.name.localeCompare(o.name)
  );
}
const Ge = (e, t) => {
  var n;
  return !!t && ((n = e.states[t]) == null ? void 0 : n.state) === "on";
}, ts = (e, t) => t.reduce((n, r) => n + r.members.filter((l) => Ge(e, l.entity_id)).length, 0), Dc = (e) => e.reduce((t, n) => t + n.members.length, 0);
function $l(e) {
  if (!(e != null && e.length)) return "var(--hrs-swatch-unknown)";
  const t = e.filter((l) => !!l);
  if (!t.length) return "linear-gradient(135deg, #2b2f3a, #12141a)";
  const n = ([l, i, o, a]) => {
    const u = 0.35 + 0.65 * (a / 255);
    return `rgb(${Math.round(l * u)}, ${Math.round(i * u)}, ${Math.round(o * u)})`;
  }, r = [...new Set(t.map(n))].slice(0, 4);
  return r.length === 1 ? `linear-gradient(135deg, color-mix(in srgb, ${r[0]} 70%, white), ${r[0]})` : `linear-gradient(135deg, ${r.join(", ")})`;
}
function to(e) {
  if (e == null) return null;
  const t = typeof e == "number" ? e * 1e3 : Date.parse(e);
  if (Number.isNaN(t)) return null;
  const n = Math.max(0, (Date.now() - t) / 1e3);
  return n < 60 ? "just now" : n < 3600 ? `${Math.round(n / 60)} min ago` : n < 86400 ? `${Math.round(n / 3600)} h ago` : n < 172800 ? "yesterday" : `${Math.round(n / 86400)} days ago`;
}
function Fn(e) {
  if ((e == null ? void 0 : e.state) !== "on") return null;
  const [t, n, r] = e.attributes.rgb_color ?? [255, 214, 170], l = 0.45 + 0.55 * ((e.attributes.brightness ?? 255) / 255);
  return `rgb(${Math.round(t * l)}, ${Math.round(n * l)}, ${Math.round(r * l)})`;
}
const Fc = (e) => e.flatMap((t) => t.entity_id ? [t.entity_id] : t.members.filter((n) => n.entity_id).map((n) => n.entity_id));
function Ic(e) {
  const t = e.map(([n, r, l, i]) => (0.299 * n + 0.587 * r + 0.114 * l) / 255 * (0.35 + 0.65 * (i / 255)));
  return t.reduce((n, r) => n + r, 0) / t.length;
}
const wp = (e) => {
  const t = (e ?? []).filter((n) => !!n);
  return e != null && e.length ? !!t.length && Ic(t) > 0.62 : !0;
};
function ns(e, t) {
  const n = [];
  for (const o of t)
    for (const a of o.members) {
      const u = a.entity_id ? e.states[a.entity_id] : void 0;
      (u == null ? void 0 : u.state) === "on" && n.push([...u.attributes.rgb_color ?? [255, 214, 170], u.attributes.brightness ?? 255]);
    }
  if (!n.length) return null;
  const r = [...new Set(n.map((o) => Fn({ state: "on", attributes: { rgb_color: o.slice(0, 3), brightness: o[3] } })))].slice(0, 3), l = r.length === 1 ? [r[0], `color-mix(in srgb, ${r[0]} 70%, black)`] : r, i = Math.min(0.5, Math.max(0.15, (Ic(n) - 0.35) * 0.9));
  return `linear-gradient(rgba(0,0,0,${i.toFixed(2)}), rgba(0,0,0,${i.toFixed(2)})), linear-gradient(120deg, ${l.join(", ")})`;
}
function Uc(e, t) {
  const n = t.flatMap((r) => r.members.map((l) => l.entity_id ? e.states[l.entity_id] : void 0)).filter((r) => (r == null ? void 0 : r.state) === "on");
  return n.length ? Math.round(n.reduce((r, l) => r + (l.attributes.brightness ?? 255), 0) / n.length / 2.55) : 0;
}
function kp({ scene: e, badge: t, disabled: n, onRecall: r }) {
  return /* @__PURE__ */ s.jsxs("button", { className: "chip-btn scene-chip", disabled: n, onClick: r, title: `Recall ${e.name}`, children: [
    /* @__PURE__ */ s.jsx("span", { className: "dot", style: { background: $l(e.colors) } }),
    e.name,
    t && /* @__PURE__ */ s.jsx("span", { className: "badge", children: t })
  ] });
}
function no({ scene: e, badge: t, warn: n, busy: r, onRecall: l, onOverwrite: i, onEdit: o, onRename: a, onDelete: u }) {
  const [c, h] = T.useState(!1), [g, m] = T.useState(!1), [y, k] = T.useState(e.name);
  return g ? /* @__PURE__ */ s.jsxs(
    "form",
    {
      className: "tile tile-form",
      onSubmit: (j) => {
        j.preventDefault(), m(!1), y.trim() && y !== e.name && (a == null || a(y));
      },
      children: [
        /* @__PURE__ */ s.jsx("input", { type: "text", value: y, maxLength: 40, autoFocus: !0, onChange: (j) => k(j.target.value), "aria-label": "Scene name" }),
        /* @__PURE__ */ s.jsxs("div", { className: "tile-form-actions", children: [
          /* @__PURE__ */ s.jsx("button", { type: "button", className: "ghost", onClick: () => m(!1), children: "Cancel" }),
          /* @__PURE__ */ s.jsx("button", { type: "submit", className: "primary", children: "Save" })
        ] })
      ]
    }
  ) : /* @__PURE__ */ s.jsxs("div", { className: `tile-wrap ${wp(e.colors) ? "pale" : ""}`, children: [
    /* @__PURE__ */ s.jsxs("button", { className: "tile", style: { background: $l(e.colors) }, disabled: r, onClick: l, title: `Recall ${e.name}`, children: [
      t && /* @__PURE__ */ s.jsx("span", { className: "badge", children: t }),
      /* @__PURE__ */ s.jsx("span", { className: "tile-name", children: e.name }),
      n && /* @__PURE__ */ s.jsx("span", { className: "tile-warn", children: n })
    ] }),
    /* @__PURE__ */ s.jsx("button", { className: "tile-more", disabled: r, onClick: () => h(!c), "aria-label": `More for ${e.name}`, children: /* @__PURE__ */ s.jsx(L, { name: "dots-vertical" }) }),
    c && /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
      /* @__PURE__ */ s.jsx("div", { className: "menu-backdrop", onClick: () => h(!1) }),
      /* @__PURE__ */ s.jsxs("div", { className: "menu", role: "menu", children: [
        o && /* @__PURE__ */ s.jsxs("button", { role: "menuitem", onClick: () => {
          h(!1), o();
        }, children: [
          /* @__PURE__ */ s.jsx(L, { name: "palette-outline" }),
          " Edit colours"
        ] }),
        /* @__PURE__ */ s.jsxs("button", { role: "menuitem", onClick: () => {
          h(!1), i();
        }, children: [
          /* @__PURE__ */ s.jsx(L, { name: "content-save-edit-outline" }),
          " Save current state here"
        ] }),
        a && /* @__PURE__ */ s.jsxs("button", { role: "menuitem", onClick: () => {
          h(!1), k(e.name), m(!0);
        }, children: [
          /* @__PURE__ */ s.jsx(L, { name: "pencil-outline" }),
          " Rename"
        ] }),
        u && /* @__PURE__ */ s.jsxs("button", { role: "menuitem", className: "danger", onClick: () => {
          h(!1), u();
        }, children: [
          /* @__PURE__ */ s.jsx(L, { name: "delete-outline" }),
          " Delete"
        ] })
      ] })
    ] })
  ] });
}
function ro({ badge: e, label: t, busy: n, onSave: r, onOpen: l }) {
  const [i, o] = T.useState(!1), [a, u] = T.useState("");
  return i ? /* @__PURE__ */ s.jsxs(
    "form",
    {
      className: "tile tile-form",
      onSubmit: (c) => {
        c.preventDefault(), a.trim() && (r == null || r(a), u(""), o(!1));
      },
      children: [
        /* @__PURE__ */ s.jsx("input", { type: "text", placeholder: "Scene name", value: a, maxLength: 40, autoFocus: !0, onChange: (c) => u(c.target.value), "aria-label": "Scene name" }),
        /* @__PURE__ */ s.jsxs("div", { className: "tile-form-actions", children: [
          /* @__PURE__ */ s.jsx("button", { type: "button", className: "ghost", onClick: () => o(!1), children: "Cancel" }),
          /* @__PURE__ */ s.jsx("button", { type: "submit", className: "primary", disabled: n || !a.trim(), children: "Save" })
        ] })
      ]
    }
  ) : /* @__PURE__ */ s.jsxs("button", { className: "tile add", disabled: n, onClick: () => l ? l() : o(!0), children: [
    e ? /* @__PURE__ */ s.jsx("span", { className: "add-dots", children: e }) : /* @__PURE__ */ s.jsx(L, { name: "plus" }),
    /* @__PURE__ */ s.jsx("span", { children: t })
  ] });
}
function lo(e, t) {
  var l, i;
  if (e.table_error) return " Couldn't read its other bindings to clear them; press a button and Bind again.";
  const n = (o) => [...new Set(o.map((a) => a.group_id != null ? t(a.group_id) : "a device directly"))].join(", ");
  let r = "";
  return (l = e.removed) != null && l.length && (r += ` Removed ${xe(e.removed.length, "old binding")} (${n(e.removed)}).`), (i = e.remove_failed) != null && i.length && (r += ` Couldn't remove ${xe(e.remove_failed.length, "binding")} (${n(e.remove_failed)}); Bind again.`), r;
}
const ma = { 6: "On/off", 8: "Dimming", 5: "Scenes" }, rs = (e) => String((e == null ? void 0 : e.message) ?? e), Qe = (e) => `0x${e.toString(16).padStart(4, "0").toUpperCase()}`, nr = (e) => /^\d/.test(e) ? "●".repeat(parseInt(e, 10)) : e.split(" ").pop(), xe = (e, t) => `${e} ${t}${e === 1 ? "" : "s"}`;
function Sp({ getHass: e, remote: t, groups: n, busy: r, act: l, onChanged: i }) {
  var p, x;
  const o = t.cycle, a = t.cycle_trigger, [u, c] = T.useState(!1), [h, g] = T.useState((o == null ? void 0 : o.group_id) ?? ((p = n.find((S) => S.scenes.length)) == null ? void 0 : p.id) ?? ((x = n[0]) == null ? void 0 : x.id) ?? 0), [m, y] = T.useState((o == null ? void 0 : o.scene_ids) ?? []), k = n.find((S) => S.id === h), j = o ? n.find((S) => S.id === o.group_id) : void 0, N = (S) => y((_) => _.includes(S) ? _.filter((E) => E !== S) : [..._, S]), f = (S) => l(async () => (await e().callWS(
    S ? { type: "hue_remote_scenes/set_cycle", ieee: t.ieee } : { type: "hue_remote_scenes/set_cycle", ieee: t.ieee, group_id: h, scene_ids: m }
  ), c(!1), i(), S ? "Stopped cycling scenes." : `${a.label} now cycles ${xe(m.length, "scene")}.`), "Saving…"), d = (S, _, E) => l(async () => (await e().callWS({ type: "hue_remote_scenes/recall", group_id: S, scene_id: _ }), `Recalled ${E}`));
  return /* @__PURE__ */ s.jsxs("div", { className: "stack-sm", children: [
    /* @__PURE__ */ s.jsx("h3", { children: "Scene cycle" }),
    !u && o && j && /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
      /* @__PURE__ */ s.jsx("div", { className: "chips", children: o.scene_ids.map((S, _) => {
        const E = j.scenes.find((v) => v.id === S);
        return E ? /* @__PURE__ */ s.jsx(kp, { scene: E, badge: String(_ + 1), disabled: r, onRecall: () => d(j.id, S, E.name) }, S) : null;
      }) }),
      /* @__PURE__ */ s.jsxs("div", { className: "ctl muted small", children: [
        /* @__PURE__ */ s.jsx(L, { name: "sync" }),
        /* @__PURE__ */ s.jsxs("span", { className: "grow", children: [
          a.label,
          " recalls the next scene in ",
          j.name,
          ". Needs Home Assistant running."
        ] })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "actions", children: [
        /* @__PURE__ */ s.jsx("button", { className: "ghost", disabled: r, onClick: () => c(!0), children: "Change" }),
        /* @__PURE__ */ s.jsx("button", { className: "danger", disabled: r, onClick: () => f(!0), children: "Stop" })
      ] })
    ] }),
    !u && !o && /* @__PURE__ */ s.jsxs("div", { className: "inline-row", children: [
      /* @__PURE__ */ s.jsxs("span", { className: "muted small grow", children: [
        "It can't recall scenes itself, but while Home Assistant runs, ",
        a.label.toLowerCase(),
        " can step through scenes you pick."
      ] }),
      /* @__PURE__ */ s.jsx("button", { disabled: r || !n.length, onClick: () => c(!0), children: "Choose scenes" })
    ] }),
    u && /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
      /* @__PURE__ */ s.jsx(
        "select",
        {
          value: h,
          disabled: !n.length,
          onChange: (S) => {
            g(+S.target.value), y([]);
          },
          "aria-label": "Group to cycle",
          children: n.map((S) => /* @__PURE__ */ s.jsxs("option", { value: S.id, children: [
            S.name,
            S.areas[0] ? ` (${S.areas[0]})` : ""
          ] }, S.id))
        }
      ),
      /* @__PURE__ */ s.jsxs("div", { className: "chips", children: [
        ((k == null ? void 0 : k.scenes) ?? []).map((S) => /* @__PURE__ */ s.jsxs("button", { className: `chip-btn ${m.includes(S.id) ? "on" : ""}`, onClick: () => N(S.id), children: [
          m.includes(S.id) && `${m.indexOf(S.id) + 1} · `,
          S.name
        ] }, S.id)),
        k && !k.scenes.length && /* @__PURE__ */ s.jsx("span", { className: "muted small", children: "Save some scenes in this group first." })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "actions", children: [
        /* @__PURE__ */ s.jsx("span", { className: "spacer" }),
        /* @__PURE__ */ s.jsx("button", { className: "ghost", disabled: r, onClick: () => c(!1), children: "Cancel" }),
        /* @__PURE__ */ s.jsx("button", { className: "primary", disabled: r || !m.length, onClick: () => f(!1), children: "Save cycle" })
      ] })
    ] })
  ] });
}
const ga = {
  zha_event: { label: "ZHA event", title: "A zha_event: what automations and the scene cycle see" },
  zigbee: { label: "Zigbee", title: "A raw Zigbee frame from the remote, below ZHA (only while this is open)" },
  ha: { label: "Home Assistant", title: "What this integration did about it" }
}, jp = { ok: "check-circle-outline", warn: "alert-outline", info: "information-outline" }, _p = (e) => new Date(e * 1e3).toLocaleTimeString(), va = (e) => {
  if (e == null) return "";
  const t = JSON.stringify(e);
  return t === "[]" || t === "{}" ? "" : t;
};
function Np({ getHass: e, remote: t, groups: n, busy: r, act: l, onChanged: i }) {
  const [o, a] = T.useState(null), [u, c] = T.useState([]), [h, g] = T.useState(null), [m, y] = T.useState(!0), k = T.useRef(), j = async () => {
    try {
      const v = await e().callWS({ type: "hue_remote_scenes/diagnostics", ieee: t.ieee });
      return a(v), g(null), v;
    } catch (v) {
      return g(rs(v)), null;
    }
  };
  T.useEffect(() => {
    let v, z = !1;
    return (async () => {
      const w = await j();
      z || (c(w ? [...w.activity].reverse() : []), v = await e().connection.subscribeMessage(
        ({ entry: $ }) => {
          c((F) => [$, ...F].slice(0, 200)), $.source !== "zigbee" && (window.clearTimeout(k.current), k.current = window.setTimeout(j, 800));
        },
        { type: "hue_remote_scenes/subscribe_activity", ieee: t.ieee }
      ), z && v());
    })(), () => {
      z = !0, window.clearTimeout(k.current), v == null || v();
    };
  }, [t.ieee]);
  const N = (v) => {
    var z;
    return ((z = n.find((w) => w.id === v)) == null ? void 0 : z.name) ?? `Group ${Qe(v)}`;
  }, f = (v, z) => {
    if (z == null) return "";
    const w = o == null ? void 0 : o.info.endpoints.find((F) => F.id === v), $ = w && [...w.in, ...w.out].find((F) => F.id === z);
    return `${Qe(z)}${$ != null && $.name ? ` ${$.name}` : ""}`;
  }, d = (v) => v.addrmode === 1 && v.group_id != null ? `Group ${N(v.group_id)} (${Qe(v.group_id)})` : v.ieee && o && v.ieee.toLowerCase() === o.coordinator.toLowerCase() ? `Home Assistant (coordinator, ep ${v.dst_endpoint})` : `Device ${v.ieee} ep ${v.dst_endpoint}`, p = () => l(async () => {
    const v = await e().callWS({ type: "hue_remote_scenes/bindings", ieee: t.ieee });
    return i(), await j(), `Read the binding table: ${v.table.length} entr${v.table.length === 1 ? "y" : "ies"}.`;
  }, "Waiting for the remote… press one of its buttons."), x = () => l(async () => {
    const v = await e().callWS({ type: "hue_remote_scenes/cycle_now", ieee: t.ieee });
    return v.scene_id == null ? "The cycle didn't recall anything; see Activity." : `Recalled scene ${v.scene_id}, as a press would.`;
  }, "Recalling the next scene…"), S = async () => {
    const v = JSON.stringify({ remote: t, diagnostics: o, activity: u, at: (/* @__PURE__ */ new Date()).toISOString() }, null, 2);
    try {
      await navigator.clipboard.writeText(v), alert("Diagnostics copied to the clipboard.");
    } catch {
      const z = document.createElement("a");
      z.href = URL.createObjectURL(new Blob([v], { type: "application/json" })), z.download = `hue-remote-diagnostics-${t.ieee.replace(/:/g, "")}.json`, z.click(), URL.revokeObjectURL(z.href);
    }
  }, _ = o == null ? void 0 : o.info, E = m ? u : u.filter((v) => v.source !== "zigbee");
  return /* @__PURE__ */ s.jsxs("div", { className: "stack-sm diag", children: [
    /* @__PURE__ */ s.jsxs("div", { className: "inline-row", children: [
      /* @__PURE__ */ s.jsx("h3", { className: "grow", children: "Diagnostics" }),
      /* @__PURE__ */ s.jsxs("button", { className: "ghost", disabled: r, onClick: j, children: [
        /* @__PURE__ */ s.jsx(L, { name: "refresh" }),
        " Refresh"
      ] }),
      /* @__PURE__ */ s.jsxs("button", { className: "ghost", disabled: !o, onClick: S, children: [
        /* @__PURE__ */ s.jsx(L, { name: "content-copy" }),
        " Copy all"
      ] })
    ] }),
    h && /* @__PURE__ */ s.jsx("div", { className: "status error", children: h }),
    o && /* @__PURE__ */ s.jsx("div", { className: "list", children: o.checks.map((v, z) => /* @__PURE__ */ s.jsxs("div", { className: `list-row static check ${v.level}`, children: [
      /* @__PURE__ */ s.jsx(L, { name: jp[v.level], className: "row-icon" }),
      /* @__PURE__ */ s.jsx("span", { className: "grow small", children: v.text })
    ] }, z)) }),
    /* @__PURE__ */ s.jsxs("div", { className: "inline-row", children: [
      /* @__PURE__ */ s.jsx("h3", { className: "grow", children: "Activity" }),
      /* @__PURE__ */ s.jsxs("label", { className: "small muted check-label", children: [
        /* @__PURE__ */ s.jsx("input", { type: "checkbox", checked: m, onChange: (v) => y(v.target.checked) }),
        " Raw Zigbee frames"
      ] }),
      t.cycle && /* @__PURE__ */ s.jsxs("button", { disabled: r, onClick: x, children: [
        /* @__PURE__ */ s.jsx(L, { name: "sync" }),
        " Test cycle"
      ] }),
      /* @__PURE__ */ s.jsx("button", { className: "ghost", disabled: !u.length, onClick: () => c([]), children: "Clear" })
    ] }),
    /* @__PURE__ */ s.jsxs("div", { className: "list log", children: [
      !E.length && /* @__PURE__ */ s.jsx("div", { className: "list-row static muted small", children: "Nothing yet. Press each button on the remote: every press ZHA reports shows up here as it happens." }),
      E.map((v, z) => /* @__PURE__ */ s.jsxs("div", { className: `list-row static log-row ${v.source}`, children: [
        /* @__PURE__ */ s.jsx("span", { className: "log-time small muted", children: _p(v.time) }),
        /* @__PURE__ */ s.jsx("span", { className: `chip ${v.source === "zha_event" ? "on" : v.source === "ha" ? "ok" : ""}`, title: ga[v.source].title, children: ga[v.source].label }),
        /* @__PURE__ */ s.jsxs("span", { className: "grow log-body", children: [
          v.command && /* @__PURE__ */ s.jsx("strong", { children: v.command }),
          v.cluster != null && /* @__PURE__ */ s.jsxs("span", { className: "muted small", children: [
            " · ep ",
            v.endpoint,
            " · ",
            f(v.endpoint, v.cluster)
          ] }),
          va(v.args) && /* @__PURE__ */ s.jsx("code", { className: "log-args", children: va(v.args) }),
          v.note && /* @__PURE__ */ s.jsx("span", { className: "small log-note", children: v.source === "ha" ? v.note : `→ ${v.note}` })
        ] })
      ] }, `${v.time}-${z}`))
    ] }),
    /* @__PURE__ */ s.jsxs("div", { className: "inline-row", children: [
      /* @__PURE__ */ s.jsx("h3", { className: "grow", children: "Binding table" }),
      /* @__PURE__ */ s.jsx("button", { className: "ghost", disabled: r, onClick: p, children: "Read binding table" })
    ] }),
    /* @__PURE__ */ s.jsx("div", { className: "list", children: (o == null ? void 0 : o.table) == null ? /* @__PURE__ */ s.jsx("div", { className: "list-row static muted small", children: "Not read since Home Assistant started. Press a button on the remote, then Read binding table." }) : o.table.length ? o.table.map((v, z) => /* @__PURE__ */ s.jsx("div", { className: "list-row static small", children: /* @__PURE__ */ s.jsxs("span", { className: "grow", children: [
      "ep ",
      v.endpoint,
      " · ",
      /* @__PURE__ */ s.jsx("strong", { children: f(v.endpoint, v.cluster) }),
      " → ",
      d(v)
    ] }) }, z)) : /* @__PURE__ */ s.jsx("div", { className: "list-row static muted small", children: "Empty: the remote sends nothing anywhere." }) }),
    _ && /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
      /* @__PURE__ */ s.jsx("h3", { children: "Device" }),
      /* @__PURE__ */ s.jsxs("div", { className: "list", children: [
        /* @__PURE__ */ s.jsx("dl", { className: "list-row static kv small", children: [
          ["Model", [_.manufacturer, _.model].filter(Boolean).join(" ")],
          ["IEEE / NWK", `${_.ieee} / ${_.nwk ?? "?"}`],
          ["Quirk", `${_.quirk ?? "none"}${_.quirk_applied === !1 ? " (not applied)" : ""}`],
          ["Firmware", _.firmware ?? "unknown"],
          ["Power", _.power_source ?? "unknown"],
          ["Signal", `LQI ${_.lqi ?? "?"} · RSSI ${_.rssi ?? "?"}`],
          ["Available", _.available == null ? "unknown" : _.available ? "yes" : "no"],
          ["Last seen", _.last_seen ? to(_.last_seen) : "unknown"]
        ].map(([v, z]) => /* @__PURE__ */ s.jsxs("div", { className: "kv-row", children: [
          /* @__PURE__ */ s.jsx("dt", { className: "muted", children: v }),
          /* @__PURE__ */ s.jsx("dd", { children: z })
        ] }, v)) }),
        _.endpoints.map((v) => /* @__PURE__ */ s.jsx("div", { className: "list-row static small ep", children: /* @__PURE__ */ s.jsxs("span", { className: "grow", children: [
          /* @__PURE__ */ s.jsxs("strong", { children: [
            "Endpoint ",
            v.id
          ] }),
          " ",
          /* @__PURE__ */ s.jsxs("span", { className: "muted", children: [
            "profile ",
            v.profile ?? "?",
            " · type ",
            v.device_type ?? "?"
          ] }),
          /* @__PURE__ */ s.jsxs("span", { className: "row-detail", children: [
            "In: ",
            v.in.map((z) => `${Qe(z.id)}${z.name ? ` ${z.name}` : ""}`).join(", ") || "none"
          ] }),
          /* @__PURE__ */ s.jsxs("span", { className: "row-detail", children: [
            "Out: ",
            v.out.map((z) => `${Qe(z.id)}${z.name ? ` ${z.name}` : ""}`).join(", ") || "none"
          ] })
        ] }) }, v.id))
      ] })
    ] })
  ] });
}
const Cp = {
  // A ring you turn, with four buttons inside it.
  dial: /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
    /* @__PURE__ */ s.jsx("circle", { cx: "12", cy: "12", r: "9" }),
    /* @__PURE__ */ s.jsx("circle", { cx: "12", cy: "12", r: "5.5" }),
    /* @__PURE__ */ s.jsx("circle", { cx: "10", cy: "10", r: ".9", fill: "currentColor", stroke: "none" }),
    /* @__PURE__ */ s.jsx("circle", { cx: "14", cy: "10", r: ".9", fill: "currentColor", stroke: "none" }),
    /* @__PURE__ */ s.jsx("circle", { cx: "10", cy: "14", r: ".9", fill: "currentColor", stroke: "none" }),
    /* @__PURE__ */ s.jsx("circle", { cx: "14", cy: "14", r: ".9", fill: "currentColor", stroke: "none" })
  ] }),
  // A tall plate: on, brighter, dimmer, off.
  dimmer: /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
    /* @__PURE__ */ s.jsx("rect", { x: "6.5", y: "2.5", width: "11", height: "19", rx: "3" }),
    /* @__PURE__ */ s.jsx("path", { d: "M9.5 6.5h5M10.5 10.5h3M10.5 13.5h3M9.5 17.5h5" })
  ] }),
  // One round button on a square plate.
  button: /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
    /* @__PURE__ */ s.jsx("rect", { x: "4", y: "4", width: "16", height: "16", rx: "5" }),
    /* @__PURE__ */ s.jsx("circle", { cx: "12", cy: "12", r: "3.5" })
  ] })
}, Ep = (e) => {
  var n;
  if (rn(e)) return "dial";
  const t = ((n = e.model) == null ? void 0 : n.toUpperCase()) ?? "";
  return t.startsWith("RWL") ? "dimmer" : t.startsWith("ROM") || t.startsWith("RDM003") ? "button" : null;
};
function Pl({ remote: e, className: t }) {
  const n = Ep(e);
  return n ? /* @__PURE__ */ s.jsx("span", { className: `icon-wrap ${t ?? ""}`, "aria-hidden": "true", children: /* @__PURE__ */ s.jsx("svg", { className: "remote-svg", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.6", strokeLinecap: "round", strokeLinejoin: "round", children: Cp[n] }) }) : /* @__PURE__ */ s.jsx(L, { name: e.endpoints.some((r) => r.clusters.includes(8)) ? "remote" : "gesture-tap-button", className: t });
}
function ls() {
  const [e, t] = T.useState(!1), [n, r] = T.useState(null);
  return { busy: e, result: n, act: async (i, o = "Talking to the lights…") => {
    t(o), r(null);
    try {
      const a = await i();
      a && r({ kind: a.includes("didn't") ? "error" : "ok", text: a });
    } catch (a) {
      r({ kind: "error", text: rs(a) });
    } finally {
      t(!1);
    }
  }, clear: () => r(null) };
}
const bp = [{ title: "Find group" }, { title: "Lights" }, { title: "Bind" }, { title: "Scenes" }];
function zp({ getHass: e, remote: t, groups: n, onChanged: r, onClose: l }) {
  const { busy: i, result: o, act: a, clear: u } = ls(), c = zl(t, n), [h, g] = T.useState(Math.min(c.done, 3)), m = t.dial, y = c.group;
  T.useEffect(() => {
    g((j) => Math.max(j, Math.min(c.done, 3)));
  }, [c.done]);
  const k = (j) => {
    u(), g(j);
  };
  return /* @__PURE__ */ s.jsxs("section", { className: "card remote", children: [
    /* @__PURE__ */ s.jsxs("div", { className: "card-head", children: [
      /* @__PURE__ */ s.jsxs("div", { className: "title", children: [
        /* @__PURE__ */ s.jsx(Pl, { remote: t, className: "title-icon" }),
        /* @__PURE__ */ s.jsxs("div", { children: [
          /* @__PURE__ */ s.jsxs("h2", { children: [
            "Set up ",
            t.name
          ] }),
          /* @__PURE__ */ s.jsx("div", { className: "muted small", children: "Scene buttons that work even when Home Assistant is down" })
        ] })
      ] }),
      /* @__PURE__ */ s.jsxs("button", { className: "ghost", onClick: l, disabled: !!i, children: [
        /* @__PURE__ */ s.jsx(L, { name: "close" }),
        " Close"
      ] })
    ] }),
    /* @__PURE__ */ s.jsx("div", { className: "segmented full steps", role: "tablist", children: bp.map((j, N) => {
      const f = [c.found, !!y, c.bound, c.saved][N];
      return /* @__PURE__ */ s.jsxs("button", { role: "tab", "aria-selected": N === h, className: `${N === h ? "on" : ""} ${f ? "done" : ""}`, onClick: () => k(N), disabled: !!i, children: [
        f && /* @__PURE__ */ s.jsx(L, { name: "check" }),
        j.title
      ] }, j.title);
    }) }),
    h === 0 && /* @__PURE__ */ s.jsx($p, { getHass: e, remote: t, busy: !!i, act: a, onChanged: r }),
    h === 1 && (m ? /* @__PURE__ */ s.jsx(Pp, { getHass: e, remote: t, group: y, busy: !!i, act: a, onChanged: r }) : /* @__PURE__ */ s.jsx(si, {})),
    h === 2 && (m && y ? /* @__PURE__ */ s.jsx(Tp, { getHass: e, remote: t, group: y, bound: c.bound, busy: !!i, act: a, onChanged: r }) : /* @__PURE__ */ s.jsx(si, {})),
    h === 3 && (m && y ? /* @__PURE__ */ s.jsx(Rp, { getHass: e, remote: t, group: y, busy: !!i, act: a, onChanged: r }) : /* @__PURE__ */ s.jsx(si, {})),
    i && /* @__PURE__ */ s.jsx("div", { className: "status busy", children: i }),
    o && /* @__PURE__ */ s.jsx("div", { className: `status ${o.kind}`, children: o.text }),
    /* @__PURE__ */ s.jsxs("div", { className: "card-actions", children: [
      h > 0 && /* @__PURE__ */ s.jsxs("button", { className: "ghost", disabled: !!i, onClick: () => k(h - 1), children: [
        /* @__PURE__ */ s.jsx(L, { name: "chevron-left" }),
        " Back"
      ] }),
      /* @__PURE__ */ s.jsx("span", { className: "spacer" }),
      h < 3 ? /* @__PURE__ */ s.jsxs("button", { className: "primary", disabled: !!i || c.done <= h, onClick: () => k(h + 1), children: [
        "Next ",
        /* @__PURE__ */ s.jsx(L, { name: "chevron-right" })
      ] }) : /* @__PURE__ */ s.jsx("button", { className: "primary", disabled: !!i, onClick: l, children: "Done" })
    ] })
  ] });
}
const si = () => /* @__PURE__ */ s.jsx("p", { className: "muted", children: "Finish the earlier steps first." });
function $p({ getHass: e, remote: t, busy: n, act: r, onChanged: l }) {
  const i = () => r(async () => {
    const o = await e().callWS({ type: "hue_remote_scenes/find_dial_group", ieee: t.ieee });
    return l(), `Its scene buttons use group ${Qe(o.group_id)}${o.exists ? ", which ZHA already has" : ""}.`;
  }, `Press ${eo(t).press} now, then again every few seconds until this finishes…`);
  return /* @__PURE__ */ s.jsxs("div", { className: "stack-sm", children: [
    /* @__PURE__ */ s.jsx("h2", { children: "Find the remote's group" }),
    /* @__PURE__ */ s.jsxs("p", { className: "muted", children: [
      "This remote recalls its scenes on its own built-in group. Press ",
      /* @__PURE__ */ s.jsx("strong", { children: "Find its group" }),
      ", then press",
      " ",
      eo(t).press,
      " a few times so it wakes up and shows which group it uses."
    ] }),
    /* @__PURE__ */ s.jsxs("div", { className: "inline-row", children: [
      /* @__PURE__ */ s.jsxs("button", { className: t.dial ? "" : "primary", disabled: n, onClick: i, children: [
        /* @__PURE__ */ s.jsx(L, { name: "magnify" }),
        " ",
        t.dial ? "Find again" : "Find its group"
      ] }),
      t.dial && /* @__PURE__ */ s.jsxs("span", { className: "chip ok", children: [
        /* @__PURE__ */ s.jsx(L, { name: "check" }),
        " Uses group ",
        Qe(t.dial.group_id)
      ] })
    ] })
  ] });
}
function Pp({ getHass: e, remote: t, group: n, busy: r, act: l, onChanged: i }) {
  const [o, a] = T.useState(null), [u, c] = T.useState(/* @__PURE__ */ new Set()), [h, g] = T.useState(t.name), m = e(), y = new Set((n == null ? void 0 : n.members.map((d) => d.key)) ?? []);
  T.useEffect(() => {
    e().callWS({ type: "hue_remote_scenes/lights" }).then((d) => a(d.lights)).catch(() => a([]));
  }, [e]);
  const k = (d) => c((p) => {
    const x = new Set(p);
    return x.has(d) ? x.delete(d) : x.add(d), x;
  }), j = () => l(async () => (await e().callWS({ type: "hue_remote_scenes/create_group", group_id: t.dial.group_id, name: (n == null ? void 0 : n.name) ?? h, members: [...u] }), c(/* @__PURE__ */ new Set()), i(), n ? `Added ${xe(u.size, "light")} to ${n.name}.` : `Created ${h}. Next, bind the remote to it.`), "Adding the lights to the group…"), N = /* @__PURE__ */ new Map();
  for (const d of o ?? []) {
    const p = d.area ?? bt;
    N.set(p, [...N.get(p) ?? [], d]);
  }
  const f = [...N.keys()].sort(
    (d, p) => +(p === t.area) - +(d === t.area) || +(d === bt) - +(p === bt) || d.localeCompare(p)
  );
  return /* @__PURE__ */ s.jsxs("div", { className: "stack-sm", children: [
    /* @__PURE__ */ s.jsx("h2", { children: n ? `Lights in ${n.name}` : "Which lights should it control?" }),
    /* @__PURE__ */ s.jsx("p", { className: "muted", children: n ? `${xe(n.members.length, "light")} are in the remote's group. Tick more to add them.` : "They'll go in a new ZHA group with the remote's ID. Only lights that can store scenes are listed." }),
    !o && /* @__PURE__ */ s.jsx("p", { className: "muted", children: "Loading lights…" }),
    o && !o.length && /* @__PURE__ */ s.jsx("p", { className: "muted", children: "No lights that can store scenes found." }),
    f.map((d) => /* @__PURE__ */ s.jsxs("div", { className: "stack-sm", children: [
      /* @__PURE__ */ s.jsx("h3", { children: d }),
      /* @__PURE__ */ s.jsx("div", { className: "picks", children: N.get(d).map((p) => {
        const x = y.has(p.key), S = x || u.has(p.key);
        return /* @__PURE__ */ s.jsxs("label", { className: `pick ${S ? "on" : ""}`, children: [
          /* @__PURE__ */ s.jsx("input", { type: "checkbox", checked: S, disabled: x || r, onChange: () => k(p.key) }),
          /* @__PURE__ */ s.jsx("span", { className: `bulb ${Ge(m, p.entity_id) ? "lit" : ""}` }),
          /* @__PURE__ */ s.jsx("span", { children: p.name })
        ] }, p.key);
      }) })
    ] }, d)),
    !n && /* @__PURE__ */ s.jsxs("label", { className: "inline-row", children: [
      /* @__PURE__ */ s.jsx("span", { className: "muted", children: "Group name" }),
      /* @__PURE__ */ s.jsx("input", { type: "text", value: h, maxLength: 40, onChange: (d) => g(d.target.value) })
    ] }),
    /* @__PURE__ */ s.jsxs("div", { className: "inline-row", children: [
      /* @__PURE__ */ s.jsx("span", { className: "muted small spacer", children: u.size ? `${xe(u.size, "light")} selected` : "" }),
      /* @__PURE__ */ s.jsxs("button", { className: "primary", disabled: r || !u.size || !n && !h.trim(), onClick: j, children: [
        /* @__PURE__ */ s.jsx(L, { name: "plus" }),
        " ",
        n ? "Add lights" : "Create group"
      ] })
    ] })
  ] });
}
function Tp({ getHass: e, remote: t, group: n, bound: r, busy: l, act: i, onChanged: o }) {
  const a = t.endpoints.find((c) => c.clusters.includes(5)) ?? t.endpoints[0], u = () => i(async () => {
    const c = await e().callWS({
      type: "hue_remote_scenes/bind",
      ieee: t.ieee,
      endpoint: a.id,
      group_id: n.id,
      clusters: a.clusters,
      unbind: !1,
      exclusive: !0
      // clear leftovers (other groups, direct device bindings)
    });
    o();
    const h = Object.entries(c.results).filter(([, m]) => m !== "ok");
    if (h.length === Object.keys(c.results).length) return "The remote didn't answer. Press one of its buttons and try again.";
    const g = lo(c, (m) => m === n.id ? n.name : `Group ${Qe(m)}`);
    return h.length ? `Bound, but some parts didn't take (${h.map(([m, y]) => `${m}: ${y}`).join(", ")}). Try again.${g}` : `Bound to ${n.name}.${g}`;
  }, "Waiting for the remote… press one of its buttons.");
  return /* @__PURE__ */ s.jsxs("div", { className: "stack-sm", children: [
    /* @__PURE__ */ s.jsxs("h2", { children: [
      "Bind ",
      t.name,
      " to ",
      n.name
    ] }),
    /* @__PURE__ */ s.jsxs("p", { className: "muted", children: [
      "Binding makes the remote talk to the lights directly over Zigbee, and clears any other bindings it has (left over from Z2M, say). It's asleep most of the time:",
      " ",
      /* @__PURE__ */ s.jsx("strong", { children: "press one of its buttons" }),
      ", then press Bind."
    ] }),
    /* @__PURE__ */ s.jsxs("div", { className: "inline-row", children: [
      /* @__PURE__ */ s.jsxs("button", { className: "primary", disabled: l, onClick: u, children: [
        /* @__PURE__ */ s.jsx(L, { name: "link-variant-plus" }),
        " ",
        r ? "Bind again" : "Bind"
      ] }),
      r && /* @__PURE__ */ s.jsx("span", { className: "chip ok", children: "Bound" })
    ] })
  ] });
}
function Rp({ getHass: e, remote: t, group: n, busy: r, act: l, onChanged: i }) {
  const o = (a, u) => l(async () => {
    const c = await e().callWS({ type: "hue_remote_scenes/store", group_id: n.id, scene_id: a, ...u ? { name: u } : {} });
    i();
    const h = Object.keys(c.failed).length;
    return h ? `Saved on ${c.ok.length} of ${c.ok.length + h} lights; some didn't answer.` : `Saved on ${xe(c.ok.length, "light")}`;
  });
  return /* @__PURE__ */ s.jsxs("div", { className: "stack-sm", children: [
    /* @__PURE__ */ s.jsx("h2", { children: "Save a scene for each button" }),
    /* @__PURE__ */ s.jsxs("p", { className: "muted", children: [
      "Set the ",
      n.name,
      " lights how you want them for a button, then save. Do this for each one. You can change them later from the area."
    ] }),
    /* @__PURE__ */ s.jsx("div", { className: "tiles", children: t.dial.buttons.map(([a, u]) => {
      const c = n.scenes.find((h) => h.id === u);
      return c ? /* @__PURE__ */ s.jsx(
        no,
        {
          scene: c,
          badge: nr(a),
          busy: r,
          onRecall: () => l(async () => (await e().callWS({ type: "hue_remote_scenes/recall", group_id: n.id, scene_id: u }), `Recalled ${c.name}`)),
          onOverwrite: () => confirm(`Save how the lights are now as "${c.name}"?`) && o(u)
        },
        u
      ) : /* @__PURE__ */ s.jsx(ro, { badge: nr(a), label: "Save current state", busy: r, onSave: (h) => o(u, h) }, u);
    }) })
  ] });
}
function Lp({ getHass: e, remote: t, groups: n, onBack: r, onChanged: l }) {
  var d;
  const { busy: i, result: o, act: a } = ls(), [u, c] = T.useState(!1), [h, g] = T.useState(!1), m = e(), y = cr(t, n), k = zl(t, n), j = t.dial_supported && k.done === 4, N = t.battery_entity ? (d = m.states[t.battery_entity]) == null ? void 0 : d.state : void 0, f = [
    Mc(t),
    N != null && N !== "unavailable" && N !== "unknown" ? `${Math.round(+N)}% battery` : null,
    t.bound.length ? "bound" : "not bound"
  ].filter(Boolean).join(" · ");
  return /* @__PURE__ */ s.jsxs("main", { className: "narrow", children: [
    /* @__PURE__ */ s.jsxs("nav", { className: "crumbs", children: [
      /* @__PURE__ */ s.jsx("button", { className: "link", onClick: r, children: "Remotes" }),
      /* @__PURE__ */ s.jsx(L, { name: "chevron-right" }),
      /* @__PURE__ */ s.jsx("span", { children: t.name })
    ] }),
    /* @__PURE__ */ s.jsxs("div", { className: "dev-head", children: [
      /* @__PURE__ */ s.jsx(Pl, { remote: t, className: "dev-icon" }),
      /* @__PURE__ */ s.jsxs("div", { className: "grow", children: [
        /* @__PURE__ */ s.jsx("h2", { className: "dev-name", children: t.name }),
        /* @__PURE__ */ s.jsx("div", { className: "muted", children: f })
      ] }),
      j ? /* @__PURE__ */ s.jsxs("span", { className: "chip ok", children: [
        /* @__PURE__ */ s.jsx(L, { name: "check" }),
        " Works without Home Assistant"
      ] }) : /* @__PURE__ */ s.jsx("span", { className: `chip ${y.state === "ok" ? "ok" : y.state === "attention" ? "warn" : ""}`, children: y.label })
    ] }),
    t.dial_supported && (!j || u) ? /* @__PURE__ */ s.jsx(
      zp,
      {
        getHass: e,
        remote: t,
        groups: n,
        onChanged: l,
        onClose: () => j ? c(!1) : r()
      }
    ) : j && k.group && t.dial ? /* @__PURE__ */ s.jsx(Op, { getHass: e, remote: t, group: k.group, busy: !!i, act: a, onChanged: l, onChangeLights: () => c(!0) }) : null,
    !t.dial_supported && /* @__PURE__ */ s.jsx(Mp, { getHass: e, remote: t, groups: n, busy: !!i, act: a, onChanged: l }),
    t.cycle_trigger && /* @__PURE__ */ s.jsx("section", { className: "card", children: /* @__PURE__ */ s.jsx(Sp, { getHass: e, remote: t, groups: n, busy: !!i, act: a, onChanged: l }) }),
    i && /* @__PURE__ */ s.jsx("div", { className: "status busy", children: i }),
    o && /* @__PURE__ */ s.jsx("div", { className: `status ${o.kind}`, children: o.text }),
    h ? /* @__PURE__ */ s.jsxs("section", { className: "card", children: [
      /* @__PURE__ */ s.jsx(Np, { getHass: e, remote: t, groups: n, busy: !!i, act: a, onChanged: l }),
      /* @__PURE__ */ s.jsxs("div", { className: "actions", children: [
        /* @__PURE__ */ s.jsx("span", { className: "spacer" }),
        /* @__PURE__ */ s.jsx("button", { className: "ghost", onClick: () => g(!1), children: "Hide diagnostics" })
      ] })
    ] }) : /* @__PURE__ */ s.jsxs("button", { className: "ghost diag-open", onClick: () => g(!0), children: [
      /* @__PURE__ */ s.jsx(L, { name: "stethoscope" }),
      " Diagnostics: what this remote sends"
    ] }),
    /* @__PURE__ */ s.jsxs("p", { className: "muted small", children: [
      t.checked ? `Bindings last checked ${to(t.checked)}.` : t.last_seen ? `Last seen ${to(t.last_seen)}.` : "",
      " Battery remotes sleep: press a button on it just before changing anything here."
    ] })
  ] });
}
const xa = -1, ya = -2;
function Op({ getHass: e, remote: t, group: n, busy: r, act: l, onChanged: i, onChangeLights: o }) {
  const a = t.dial.buttons, u = new Set(a.map(([, g]) => g)), c = (g) => {
    const m = Object.keys(g.failed).length;
    return m ? `Saved on ${g.ok.length} of ${g.ok.length + m} lights; some didn't answer.` : `Saved on ${xe(g.ok.length, "light")}.`;
  }, h = (g, m, y) => {
    const k = n.scenes.find((N) => N.id === m);
    if (y === ya) {
      if (!k || !confirm(`Clear ${g}? This deletes "${k.name}" from the lights.`)) return;
      l(async () => {
        const N = await e().callWS({ type: "hue_remote_scenes/delete", group_id: n.id, scene_id: m });
        return i(), Object.keys(N.failed).length ? `Cleared ${g}, but some lights didn't answer and may still have it.` : `Cleared ${g}.`;
      });
      return;
    }
    if (y === xa) {
      const N = prompt(`Name for ${g}'s scene`, (k == null ? void 0 : k.name) ?? "");
      if (!(N != null && N.trim())) return;
      l(async () => {
        const f = await e().callWS({ type: "hue_remote_scenes/store", group_id: n.id, scene_id: m, name: N });
        return i(), c(f);
      });
      return;
    }
    const j = n.scenes.find((N) => N.id === y);
    l(async () => {
      const N = await e().callWS({ type: "hue_remote_scenes/copy", group_id: n.id, from_scene_id: y, scene_id: m });
      i();
      const f = Object.keys(N.failed).length;
      return f ? `${g} now recalls ${j.name} on ${N.ok.length} of ${N.ok.length + f} lights; some didn't answer.` : `${g} now recalls ${j.name}.`;
    }, "Copying the scene in the lights…");
  };
  return /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
    /* @__PURE__ */ s.jsx("h3", { children: "Controls" }),
    /* @__PURE__ */ s.jsx("div", { className: "list", children: /* @__PURE__ */ s.jsxs("div", { className: "list-row static", children: [
      /* @__PURE__ */ s.jsx("span", { className: "btn-icon", children: /* @__PURE__ */ s.jsx(L, { name: "home-outline" }) }),
      /* @__PURE__ */ s.jsxs("span", { className: "grow", children: [
        /* @__PURE__ */ s.jsx("strong", { children: n.name }),
        /* @__PURE__ */ s.jsx("span", { className: "muted small row-detail", children: n.members.map((g) => g.name).join(", ") })
      ] }),
      /* @__PURE__ */ s.jsxs("button", { className: "ghost", disabled: r, onClick: o, children: [
        "Change lights ",
        /* @__PURE__ */ s.jsx(L, { name: "chevron-right" })
      ] })
    ] }) }),
    /* @__PURE__ */ s.jsx("h3", { children: "Buttons" }),
    /* @__PURE__ */ s.jsxs("div", { className: "list", children: [
      a.map(([g, m]) => {
        const y = n.scenes.find((k) => k.id === m);
        return /* @__PURE__ */ s.jsxs("div", { className: "list-row static", children: [
          /* @__PURE__ */ s.jsx("span", { className: "btn-icon", children: nr(g) }),
          /* @__PURE__ */ s.jsxs("span", { className: "grow", children: [
            /* @__PURE__ */ s.jsx("strong", { children: /^\d/.test(g) ? `Button ${parseInt(g, 10)}` : g }),
            /* @__PURE__ */ s.jsx("span", { className: "muted small row-detail", children: y ? "Recalls this scene" : "Not set yet" })
          ] }),
          /* @__PURE__ */ s.jsxs("label", { className: "picker", children: [
            /* @__PURE__ */ s.jsx("span", { className: "picker-swatch", style: { background: y ? $l(y.colors) : "var(--hl-off-fill)" } }),
            /* @__PURE__ */ s.jsx("span", { className: "picker-name", children: (y == null ? void 0 : y.name) ?? "Choose…" }),
            /* @__PURE__ */ s.jsx("span", { className: "picker-chev", children: "▾" }),
            /* @__PURE__ */ s.jsxs(
              "select",
              {
                value: y ? m : "",
                disabled: r,
                onChange: (k) => k.target.value !== "" && h(g, m, +k.target.value),
                "aria-label": `Scene for ${g}`,
                children: [
                  !y && /* @__PURE__ */ s.jsx("option", { value: "", children: "Choose…" }),
                  y && /* @__PURE__ */ s.jsx("option", { value: m, children: y.name }),
                  n.scenes.filter((k) => !u.has(k.id)).map((k) => /* @__PURE__ */ s.jsx("option", { value: k.id, children: k.name }, k.id)),
                  /* @__PURE__ */ s.jsx("option", { value: xa, children: "Save the lights' current state…" }),
                  y && /* @__PURE__ */ s.jsx("option", { value: ya, children: "Clear this button" })
                ]
              }
            )
          ] })
        ] }, m);
      }),
      /* @__PURE__ */ s.jsxs("div", { className: "list-row static", children: [
        /* @__PURE__ */ s.jsx("span", { className: "btn-icon", children: /* @__PURE__ */ s.jsx(L, { name: rn(t) ? "rotate-right" : "brightness-6" }) }),
        /* @__PURE__ */ s.jsxs("span", { className: "grow", children: [
          /* @__PURE__ */ s.jsx("strong", { children: rn(t) ? "Dial" : "Other buttons" }),
          /* @__PURE__ */ s.jsx("span", { className: "muted small row-detail", children: rn(t) ? `Dims ${n.name}. Hold any button to turn it off.` : `${eo(t).rest} · ${n.name}` })
        ] })
      ] })
    ] })
  ] });
}
function Mp({ getHass: e, remote: t, groups: n, busy: r, act: l, onChanged: i }) {
  var k, j;
  const [o, a] = T.useState(t.endpoints[0].id), [u, c] = T.useState(((k = t.bound[0]) == null ? void 0 : k.group_id) ?? ((j = n[0]) == null ? void 0 : j.id) ?? 0), h = t.endpoints.find((N) => N.id === o) ?? t.endpoints[0], g = (N) => {
    var f;
    return ((f = n.find((d) => d.id === N)) == null ? void 0 : f.name) ?? `Group ${Qe(N)}`;
  }, m = () => l(async () => {
    const N = await e().callWS({ type: "hue_remote_scenes/bindings", ieee: t.ieee });
    i();
    const f = new Set(N.bindings.map((d) => d.group_id)).size;
    return f ? `Bound to ${f === 1 ? "1 group" : `${f} groups`}` : "Not bound to any group";
  }, "Waiting for the remote… press one of its buttons."), y = (N) => l(async () => {
    const f = await e().callWS({
      type: "hue_remote_scenes/bind",
      ieee: t.ieee,
      endpoint: h.id,
      group_id: u,
      clusters: h.clusters,
      unbind: N,
      exclusive: !N
      // clear leftovers (other groups, direct device bindings)
    });
    i();
    const d = Object.entries(f.results).filter(([, x]) => x !== "ok"), p = N ? "Unbound from" : "Bound to";
    return d.length === Object.keys(f.results).length ? "The remote didn't answer. Press a button on it and try again." : d.length ? `${p} ${g(u)}, but these didn't take: ${d.map(([x, S]) => `${ma[+x] ?? x} (${S})`).join(", ")}.${lo(f, g)}` : `${p} ${g(u)}.${lo(f, g)}`;
  }, "Waiting for the remote… press one of its buttons.");
  return /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
    /* @__PURE__ */ s.jsx("h3", { children: "Controls" }),
    /* @__PURE__ */ s.jsxs("div", { className: "list", children: [
      t.bound.map((N) => /* @__PURE__ */ s.jsxs("div", { className: "list-row static", children: [
        /* @__PURE__ */ s.jsx(L, { name: "lightbulb-group-outline", className: "row-icon" }),
        /* @__PURE__ */ s.jsxs("span", { className: "grow", children: [
          /* @__PURE__ */ s.jsx("strong", { children: g(N.group_id) }),
          /* @__PURE__ */ s.jsxs("span", { className: "muted small row-detail", children: [
            N.clusters.map((f) => ma[f] ?? f).join(", "),
            " · works without Home Assistant"
          ] })
        ] })
      ] }, N.group_id)),
      !t.bound.length && /* @__PURE__ */ s.jsx("div", { className: "list-row static muted", children: "Not bound to a group yet." })
    ] }),
    /* @__PURE__ */ s.jsxs("div", { className: "inline-row", children: [
      t.endpoints.length > 1 && /* @__PURE__ */ s.jsx("select", { value: h.id, onChange: (N) => a(+N.target.value), "aria-label": "Button set", children: t.endpoints.map((N) => /* @__PURE__ */ s.jsxs("option", { value: N.id, children: [
        "Endpoint ",
        N.id
      ] }, N.id)) }),
      /* @__PURE__ */ s.jsx("select", { value: u, disabled: !n.length, onChange: (N) => c(+N.target.value), "aria-label": "Group", children: n.map((N) => /* @__PURE__ */ s.jsxs("option", { value: N.id, children: [
        N.name,
        N.areas[0] ? ` (${N.areas[0]})` : ""
      ] }, N.id)) }),
      /* @__PURE__ */ s.jsx("button", { className: "primary", disabled: r || !n.length, onClick: () => y(!1), children: "Bind" }),
      /* @__PURE__ */ s.jsx("button", { disabled: r || !n.length, onClick: () => y(!0), children: "Unbind" }),
      /* @__PURE__ */ s.jsx("span", { className: "spacer" }),
      /* @__PURE__ */ s.jsx("button", { className: "ghost", disabled: r, onClick: m, children: "Check bindings" })
    ] })
  ] });
}
function Dp({ getHass: e, areas: t, groups: n, onOpen: r }) {
  const l = e(), i = t.filter((o) => o.remotes.length);
  return i.length ? /* @__PURE__ */ s.jsx(s.Fragment, { children: i.map((o) => {
    const a = Dc(o.groups), u = ts(l, o.groups);
    return /* @__PURE__ */ s.jsxs("section", { className: "remote-room", children: [
      /* @__PURE__ */ s.jsxs("div", { className: "remote-room-head", children: [
        /* @__PURE__ */ s.jsx("span", { className: "strip", style: { background: ns(l, o.groups) ?? void 0 } }),
        /* @__PURE__ */ s.jsx("h2", { className: "grow", children: o.name }),
        a > 0 && /* @__PURE__ */ s.jsx("span", { className: "muted small", children: u ? `${u} on` : "off" })
      ] }),
      /* @__PURE__ */ s.jsx("div", { className: "list", children: o.remotes.map((c) => /* @__PURE__ */ s.jsx(Ip, { remote: c, groups: n, onOpen: () => r(c.ieee) }, c.ieee)) })
    ] }, o.name);
  }) }) : /* @__PURE__ */ s.jsxs("div", { className: "empty-state", children: [
    /* @__PURE__ */ s.jsx(L, { name: "remote-off" }),
    /* @__PURE__ */ s.jsx("p", { children: "No remotes found. Pair a remote (like a Hue Tap Dial) with ZHA first." })
  ] });
}
function Fp(e, t) {
  var r;
  const n = Mc(e);
  if (e.dial_supported) {
    const l = zl(e, t);
    if (l.done === 4 && l.group && e.dial) {
      const i = e.dial.buttons.map(([, a]) => l.group.scenes.find((u) => u.id === a)).filter(Boolean), o = rn(e) ? "buttons recall" : "Hue button recalls";
      return { text: `${n} · ${o} ${xe(i.length, "scene")}`, scenes: i };
    }
    return !e.dial && !e.bound.length ? { text: `${n} · not doing anything yet`, scenes: [] } : { text: `${n} · set-up step ${Math.min(l.done + 1, 4)} of 4`, scenes: [] };
  }
  if (e.cycle) {
    const l = t.find((o) => o.id === e.cycle.group_id), i = e.cycle.scene_ids.map((o) => l == null ? void 0 : l.scenes.find((a) => a.id === o)).filter((o) => !!o);
    return { text: `${n} · ${((r = e.cycle_trigger) == null ? void 0 : r.label) ?? "a button"} cycles ${xe(i.length, "scene")} in Home Assistant`, scenes: i };
  }
  return { text: `${n} · ${e.bound.length ? "on/off and dimming" : "not bound yet"}`, scenes: [] };
}
function Ip({ remote: e, groups: t, onOpen: n }) {
  const r = cr(e, t), l = e.dial_supported && r.state === "ok", { text: i, scenes: o } = Fp(e, t);
  return /* @__PURE__ */ s.jsxs("button", { className: "list-row", onClick: n, children: [
    /* @__PURE__ */ s.jsx(Pl, { remote: e, className: "row-icon big" }),
    /* @__PURE__ */ s.jsxs("span", { className: "grow", children: [
      /* @__PURE__ */ s.jsx("strong", { children: e.name }),
      /* @__PURE__ */ s.jsx("span", { className: "muted small row-detail", children: i }),
      o.length > 0 && /* @__PURE__ */ s.jsx("span", { className: "mini-swatches", children: o.map((a) => /* @__PURE__ */ s.jsx("span", { className: "mini-swatch", style: { background: $l(a.colors) }, title: a.name }, a.id)) })
    ] }),
    /* @__PURE__ */ s.jsx("span", { className: `chip ${r.state === "ok" ? "ok" : r.state === "attention" ? "warn" : ""}`, children: l ? "Works without HA" : r.label }),
    /* @__PURE__ */ s.jsx(L, { name: "chevron-right" })
  ] });
}
function rr({ getHass: e, entities: t, on: n, label: r }) {
  return /* @__PURE__ */ s.jsx(
    "button",
    {
      className: `switch ${n ? "on" : ""}`,
      role: "switch",
      "aria-checked": n,
      "aria-label": r,
      disabled: !t.length,
      onClick: (l) => {
        l.stopPropagation(), e().callService("light", n ? "turn_off" : "turn_on", { entity_id: t });
      }
    }
  );
}
function lr({ getHass: e, entities: t, value: n, label: r, fill: l }) {
  const [i, o] = T.useState(n), [a, u] = T.useState(!1);
  T.useEffect(() => {
    a || o(n);
  }, [n, a]);
  const c = () => {
    u(!1), t.length && (i <= 0 ? e().callService("light", "turn_off", { entity_id: t }) : e().callService("light", "turn_on", { entity_id: t, brightness_pct: i }));
  };
  return /* @__PURE__ */ s.jsx(
    "input",
    {
      className: "bri",
      type: "range",
      min: 0,
      max: 100,
      value: i,
      "aria-label": r,
      disabled: !t.length,
      style: { "--v": `${i}%`, ...l ? { "--fill": l } : {} },
      onClick: (h) => h.stopPropagation(),
      onPointerDown: () => u(!0),
      onChange: (h) => o(+h.target.value),
      onPointerUp: c,
      onKeyUp: c
    }
  );
}
const io = [
  { label: "Candle", kelvin: 2200, css: "#ffb46b" },
  { label: "Warm", kelvin: 2700, css: "#ffc98f" },
  { label: "Neutral", kelvin: 4e3, css: "#ffe4c4" },
  { label: "Daylight", kelvin: 5500, css: "#fff4ea" },
  { label: "Cool", kelvin: 6500, css: "#e8eeff" }
], wa = [
  { label: "Red", hs: [0, 100], css: "#ff2a1a" },
  { label: "Orange", hs: [25, 100], css: "#ff7a00" },
  { label: "Yellow", hs: [50, 100], css: "#ffd400" },
  { label: "Green", hs: [120, 100], css: "#22d33a" },
  { label: "Cyan", hs: [180, 100], css: "#00d5e0" },
  { label: "Blue", hs: [230, 100], css: "#2f4bff" },
  { label: "Purple", hs: [275, 100], css: "#9a3cff" },
  { label: "Pink", hs: [320, 80], css: "#ff4fb8" }
], Up = ["hs", "xy", "rgb", "rgbw", "rgbww"];
function Br(e) {
  const t = (e == null ? void 0 : e.attributes.supported_color_modes) ?? [];
  return { colour: t.some((n) => Up.includes(n)), temp: t.includes("color_temp") };
}
function ka(e) {
  const { colour: t, temp: n } = Br(e);
  if (!n) return t ? io : [];
  const r = (e == null ? void 0 : e.attributes.min_color_temp_kelvin) ?? 0, l = (e == null ? void 0 : e.attributes.max_color_temp_kelvin) ?? 1e5;
  return io.filter((i) => t || i.kelvin >= r && i.kelvin <= l);
}
const Ap = (e) => [1, 3, 5].map((t) => parseInt(e.slice(t, t + 2), 16));
function Bp({ getHass: e, group: t, title: n, name: r = "", saveLabel: l, busy: i, result: o, onSave: a, onCancel: u }) {
  const [c, h] = T.useState(r), g = e(), m = t.members.filter((x) => x.entity_id && x.scenes), y = m.map((x) => x.entity_id), k = Object.fromEntries(y.map((x) => [x, g.states[x]])), j = y.filter((x) => Ge(g, x)).length, N = j ? Math.round(y.filter((x) => Ge(g, x)).reduce((x, S) => {
    var _;
    return x + (((_ = k[S]) == null ? void 0 : _.attributes.brightness) ?? 255);
  }, 0) / j / 2.55) : 0, f = (x, S) => {
    const _ = x.map((E) => ({ e: E, caps: Br(k[E]) }));
    if ("rgb" in S) {
      const E = _.filter((v) => v.caps.colour).map((v) => v.e);
      E.length && e().callService("light", "turn_on", { entity_id: E, rgb_color: S.rgb });
    } else if (S.hs) {
      const E = _.filter((v) => v.caps.colour).map((v) => v.e);
      E.length && e().callService("light", "turn_on", { entity_id: E, hs_color: S.hs });
    } else if (S.kelvin) {
      const E = _.filter((v) => v.caps.colour || v.caps.temp).map((v) => v.e);
      E.length && e().callService("light", "turn_on", { entity_id: E, color_temp_kelvin: S.kelvin });
    }
  }, d = y.some((x) => Br(k[x]).colour), p = y.some((x) => ka(k[x]).length);
  return /* @__PURE__ */ s.jsx("div", { className: "sheet-backdrop", onClick: (x) => x.target === x.currentTarget && !i && u(), children: /* @__PURE__ */ s.jsxs(
    "form",
    {
      className: "sheet",
      role: "dialog",
      "aria-label": n,
      onSubmit: (x) => {
        x.preventDefault(), c.trim() && a(c);
      },
      children: [
        /* @__PURE__ */ s.jsxs("div", { className: "sheet-head", children: [
          /* @__PURE__ */ s.jsx("h2", { children: n }),
          /* @__PURE__ */ s.jsx("button", { type: "button", className: "icon-btn", onClick: u, disabled: !!i, "aria-label": "Close", children: /* @__PURE__ */ s.jsx(L, { name: "close" }) })
        ] }),
        /* @__PURE__ */ s.jsx("input", { type: "text", placeholder: "Scene name", value: c, maxLength: 40, autoFocus: !r, onChange: (x) => h(x.target.value), "aria-label": "Scene name" }),
        /* @__PURE__ */ s.jsx("p", { className: "muted small", children: "Changes show on the lights straight away. Save stores how they look in the lights, for remotes to recall." }),
        !m.length && /* @__PURE__ */ s.jsx("div", { className: "status warn", children: "None of this group's lights can store scenes." }),
        m.length > 1 && /* @__PURE__ */ s.jsxs("div", { className: "edit-light all", children: [
          /* @__PURE__ */ s.jsxs("div", { className: "edit-row", children: [
            /* @__PURE__ */ s.jsx("strong", { className: "grow", children: "All lights" }),
            /* @__PURE__ */ s.jsx(rr, { getHass: e, entities: y, on: j > 0, label: "All lights on or off" })
          ] }),
          /* @__PURE__ */ s.jsx(lr, { getHass: e, entities: y, value: N, label: "All lights brightness" }),
          /* @__PURE__ */ s.jsx(Sa, { whites: p ? io : [], colours: d ? wa : [], custom: d, name: "all lights", onPick: (x) => f(y, x) })
        ] }),
        m.map((x) => {
          const S = x.entity_id, _ = k[S], E = Ge(g, S), v = Br(_);
          return /* @__PURE__ */ s.jsxs("div", { className: `edit-light ${E ? "" : "off"}`, children: [
            /* @__PURE__ */ s.jsxs("div", { className: "edit-row", children: [
              /* @__PURE__ */ s.jsx("span", { className: "light-dot", style: Fn(_) ? { background: Fn(_) } : void 0 }),
              /* @__PURE__ */ s.jsx("span", { className: "grow", children: x.name }),
              /* @__PURE__ */ s.jsx(rr, { getHass: e, entities: [S], on: E, label: `${x.name} on or off` })
            ] }),
            /* @__PURE__ */ s.jsx(lr, { getHass: e, entities: [S], value: E ? Math.round(((_ == null ? void 0 : _.attributes.brightness) ?? 255) / 2.55) : 0, label: `${x.name} brightness`, fill: Fn(_) ?? void 0 }),
            /* @__PURE__ */ s.jsx(Sa, { whites: ka(_), colours: v.colour ? wa : [], custom: v.colour, name: x.name, onPick: (z) => f([S], z) })
          ] }, x.key);
        }),
        i && /* @__PURE__ */ s.jsx("div", { className: "status busy", children: i }),
        !i && (o == null ? void 0 : o.kind) === "error" && /* @__PURE__ */ s.jsx("div", { className: "status error", children: o.text }),
        /* @__PURE__ */ s.jsxs("div", { className: "sheet-actions", children: [
          /* @__PURE__ */ s.jsx("button", { type: "button", className: "ghost", onClick: u, disabled: !!i, children: "Cancel" }),
          /* @__PURE__ */ s.jsx("button", { type: "submit", className: "primary", disabled: !!i || !c.trim() || !m.length, children: l })
        ] })
      ]
    }
  ) });
}
function Sa({ whites: e, colours: t, custom: n, name: r, onPick: l }) {
  const i = T.useRef(null), o = T.useRef(null), a = (u) => {
    i.current = Ap(u), o.current == null && (o.current = window.setTimeout(() => {
      o.current = null, i.current && l({ rgb: i.current });
    }, 300));
  };
  return !e.length && !t.length ? null : /* @__PURE__ */ s.jsxs("div", { className: "palette", children: [
    [...e, ...t].map((u) => /* @__PURE__ */ s.jsx("button", { type: "button", className: "swatch-btn", style: { background: u.css }, title: u.label, "aria-label": `${u.label} for ${r}`, onClick: () => l(u) }, u.label)),
    n && /* @__PURE__ */ s.jsxs("label", { className: "swatch-btn custom", title: "Pick a colour", "aria-label": `Pick a colour for ${r}`, children: [
      /* @__PURE__ */ s.jsx(L, { name: "palette-outline" }),
      /* @__PURE__ */ s.jsx("input", { type: "color", defaultValue: "#ff8800", onChange: (u) => a(u.target.value) })
    ] })
  ] });
}
function Wp({ getHass: e, area: t, groups: n, onBack: r, onOpenRemote: l, onChanged: i }) {
  const o = e(), a = ns(o, t.groups), u = ts(o, t.groups), c = Fc(t.groups);
  return /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
    /* @__PURE__ */ s.jsx("div", { className: `hero ${a ? "lit" : ""}`, style: a ? { background: a } : void 0, children: /* @__PURE__ */ s.jsxs("div", { className: "hero-in", children: [
      /* @__PURE__ */ s.jsxs("nav", { className: "crumbs", children: [
        /* @__PURE__ */ s.jsx("button", { className: "link", onClick: r, children: "Rooms" }),
        /* @__PURE__ */ s.jsx(L, { name: "chevron-right" }),
        /* @__PURE__ */ s.jsx("span", { children: t.name })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "hero-row", children: [
        /* @__PURE__ */ s.jsx("h1", { children: t.name }),
        c.length > 0 && /* @__PURE__ */ s.jsx(rr, { getHass: e, entities: c, on: u > 0, label: `Turn ${t.name} ${u ? "off" : "on"}` })
      ] }),
      c.length > 0 && /* @__PURE__ */ s.jsx(lr, { getHass: e, entities: c, value: Uc(o, t.groups), label: `${t.name} brightness` })
    ] }) }),
    /* @__PURE__ */ s.jsxs("main", { children: [
      t.groups.map((h) => /* @__PURE__ */ s.jsx(Vp, { getHass: e, group: h, titled: t.groups.length > 1 && h.name !== t.name, onChanged: i }, h.id)),
      !t.groups.length && /* @__PURE__ */ s.jsxs("div", { className: "empty-state", children: [
        /* @__PURE__ */ s.jsx(L, { name: "lightbulb-group-outline" }),
        /* @__PURE__ */ s.jsxs("p", { children: [
          "No ZHA groups in ",
          t.name,
          ". Create one under Settings → Devices & services → Zigbee Home Automation → Configure → Groups and put its lights in this area, or set up a Tap Dial here."
        ] })
      ] }),
      t.remotes.length > 0 && /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
        /* @__PURE__ */ s.jsx("h3", { children: "Remotes" }),
        /* @__PURE__ */ s.jsx("div", { className: "list", children: t.remotes.map((h) => {
          const g = cr(h, n);
          return /* @__PURE__ */ s.jsxs("button", { className: "list-row", onClick: () => l(h.ieee), children: [
            /* @__PURE__ */ s.jsx(Pl, { remote: h, className: "row-icon" }),
            /* @__PURE__ */ s.jsx("span", { className: "grow", children: h.name }),
            /* @__PURE__ */ s.jsx("span", { className: `chip ${g.state === "ok" ? "ok" : g.state === "attention" ? "warn" : ""}`, children: g.label }),
            /* @__PURE__ */ s.jsx(L, { name: "chevron-right" })
          ] }, h.ieee);
        }) })
      ] })
    ] })
  ] });
}
function Vp({ getHass: e, group: t, titled: n, onChanged: r }) {
  const { busy: l, result: i, act: o } = ls(), [a, u] = T.useState(null), c = e(), h = Object.fromEntries(t.members.map((w) => [w.key, w.name])), g = t.members.filter((w) => w.scenes), m = (w) => w.map(($) => h[$] ?? $).join(", "), y = (w) => w.length < g.length ? `on ${w.length} of ${g.length} lights` : void 0, k = t.dials[0], j = new Set(t.dials.flatMap((w) => w.buttons.map(($) => $.scene_id))), N = t.scenes.filter((w) => !j.has(w.id)), f = (w, $) => o(async () => {
    const F = await e().callWS({ group_id: t.id, ...w });
    return r(), $(F);
  }), d = (w) => ($) => {
    const F = Object.keys($.failed);
    return F.length ? `${w} on ${$.ok.length} of ${$.ok.length + F.length} lights. These didn't answer: ${m(F)}` : `${w} on ${xe($.ok.length, "light")}`;
  }, p = (w, $) => f({ type: "hue_remote_scenes/recall", scene_id: w }, () => `Recalled ${$}`), x = (w, $) => confirm(`Save how the lights are now as "${$}"?`) && f({ type: "hue_remote_scenes/store", scene_id: w }, d("Saved")), S = (w, $) => o(async () => {
    await e().callWS({ type: "hue_remote_scenes/recall", group_id: t.id, scene_id: w }), u({ title: `Edit ${$}`, saveLabel: "Save changes", scene_id: w, name: $, restore: !0 });
  }, "Recalling the scene…"), _ = (w, $) => o(async () => {
    const F = await e().callWS({ type: "hue_remote_scenes/store", group_id: t.id, name: $, ...w.scene_id != null ? { scene_id: w.scene_id } : {} });
    return u(null), r(), d("Saved")(F);
  }, "Saving the scene in the lights…"), E = (w) => {
    u(null), w.restore && w.scene_id != null && p(w.scene_id, w.name ?? "the scene");
  }, v = (w, $) => f({ type: "hue_remote_scenes/rename", scene_id: w, name: $ }, () => "Renamed"), z = (w, $) => confirm(`Delete "${$}" from the lights?`) && f(
    { type: "hue_remote_scenes/delete", scene_id: w },
    (F) => Object.keys(F.failed).length ? `Deleted, but some lights didn't answer and may still have it: ${m(Object.keys(F.failed))}` : `Deleted ${$}`
  );
  return /* @__PURE__ */ s.jsxs("section", { className: "group", children: [
    n && /* @__PURE__ */ s.jsx("h2", { className: "group-title", children: t.name }),
    g.length > 0 && k && /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
      /* @__PURE__ */ s.jsxs("h3", { children: [
        t.dials.map((w) => w.name).join(", "),
        " buttons ",
        /* @__PURE__ */ s.jsx("span", { className: "hint", children: "tap to try · ⋮ to edit" })
      ] }),
      /* @__PURE__ */ s.jsx("div", { className: "tiles", children: k.buttons.map((w) => {
        const $ = t.scenes.find((F) => F.id === w.scene_id);
        return $ ? /* @__PURE__ */ s.jsx(
          no,
          {
            scene: $,
            badge: nr(w.label),
            warn: y($.members),
            busy: !!l,
            onRecall: () => p($.id, $.name),
            onOverwrite: () => x($.id, $.name),
            onEdit: () => S($.id, $.name),
            onRename: (F) => v($.id, F),
            onDelete: () => z($.id, $.name)
          },
          w.scene_id
        ) : /* @__PURE__ */ s.jsx(
          ro,
          {
            badge: nr(w.label),
            label: "Set a scene",
            busy: !!l,
            onOpen: () => u({ title: `Scene for ${/^\d/.test(w.label) ? `button ${parseInt(w.label, 10)}` : w.label}`, saveLabel: "Save scene", scene_id: w.scene_id })
          },
          w.scene_id
        );
      }) })
    ] }),
    g.length > 0 && /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
      /* @__PURE__ */ s.jsx("h3", { children: k ? "Other scenes" : "Scenes" }),
      /* @__PURE__ */ s.jsxs("div", { className: "tiles", children: [
        N.map((w) => /* @__PURE__ */ s.jsx(
          no,
          {
            scene: w,
            warn: y(w.members),
            busy: !!l,
            onRecall: () => p(w.id, w.name),
            onOverwrite: () => x(w.id, w.name),
            onEdit: () => S(w.id, w.name),
            onRename: ($) => v(w.id, $),
            onDelete: () => z(w.id, w.name)
          },
          w.id
        )),
        /* @__PURE__ */ s.jsx(ro, { label: "New scene", busy: !!l, onOpen: () => u({ title: "New scene", saveLabel: "Save scene" }) })
      ] })
    ] }),
    l && /* @__PURE__ */ s.jsx("div", { className: "status busy", children: l }),
    i && /* @__PURE__ */ s.jsx("div", { className: `status ${i.kind}`, children: i.text }),
    a && /* @__PURE__ */ s.jsx(
      Bp,
      {
        getHass: e,
        group: t,
        title: a.title,
        name: a.name,
        saveLabel: a.saveLabel,
        busy: l,
        result: i,
        onSave: (w) => _(a, w),
        onCancel: () => E(a)
      }
    ),
    /* @__PURE__ */ s.jsxs("h3", { children: [
      "Lights ",
      /* @__PURE__ */ s.jsx("span", { className: "hint", children: t.members.filter((w) => Ge(c, w.entity_id)).length ? `${t.members.filter((w) => Ge(c, w.entity_id)).length} on` : "all off" })
    ] }),
    /* @__PURE__ */ s.jsx("div", { className: "list", children: t.members.map((w) => {
      const $ = w.entity_id ? c.states[w.entity_id] : void 0, F = Fn($);
      return /* @__PURE__ */ s.jsxs("div", { className: "list-row static", children: [
        /* @__PURE__ */ s.jsx("span", { className: "light-dot", style: F ? { background: F } : void 0 }),
        /* @__PURE__ */ s.jsxs("span", { className: "grow", children: [
          w.name,
          !w.scenes && /* @__PURE__ */ s.jsx("span", { className: "muted small", children: " · can't store scenes" })
        ] }),
        w.entity_id && /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
          /* @__PURE__ */ s.jsx(lr, { getHass: e, entities: [w.entity_id], value: Ge(c, w.entity_id) ? Math.round((($ == null ? void 0 : $.attributes.brightness) ?? 255) / 2.55) : 0, label: `${w.name} brightness`, fill: F ?? void 0 }),
          /* @__PURE__ */ s.jsx(rr, { getHass: e, entities: [w.entity_id], on: Ge(c, w.entity_id), label: `Turn ${w.name} on or off` })
        ] })
      ] }, w.key);
    }) }),
    g.length > 0 && /* @__PURE__ */ s.jsx("div", { children: /* @__PURE__ */ s.jsxs(
      "button",
      {
        className: "ghost",
        disabled: !!l,
        title: "Ask the lights which scenes they already have, e.g. ones made in Zigbee2MQTT",
        onClick: () => f(
          { type: "hue_remote_scenes/import" },
          (w) => w.added.length ? `Found ${xe(w.added.length, "new scene")}. Rename them from their ⋮ menu.` : w.found.length ? "No new scenes: the ones on the lights are all here." : "The lights have no scenes for this group yet."
        ),
        children: [
          /* @__PURE__ */ s.jsx(L, { name: "database-import-outline" }),
          " Import scenes from the lights"
        ]
      }
    ) })
  ] });
}
function Qp({ getHass: e, areas: t, groups: n, onOpen: r, onOpenRemote: l }) {
  const i = t.flatMap((o) => o.attention);
  return /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
    i.map((o) => /* @__PURE__ */ s.jsxs("div", { className: "banner", children: [
      /* @__PURE__ */ s.jsx(L, { name: "alert-outline" }),
      /* @__PURE__ */ s.jsxs("span", { className: "grow", children: [
        o.name,
        " isn't set up yet: its buttons don't do anything."
      ] }),
      /* @__PURE__ */ s.jsx("button", { className: "primary", onClick: () => l(o.ieee), children: "Set up" })
    ] }, o.ieee)),
    /* @__PURE__ */ s.jsx("div", { className: "rooms", children: t.map((o) => /* @__PURE__ */ s.jsx(Hp, { getHass: e, area: o, groups: n, onOpen: () => r(o.name) }, o.name)) })
  ] });
}
function Hp({ getHass: e, area: t, groups: n, onOpen: r }) {
  const l = e(), i = ns(l, t.groups), o = ts(l, t.groups), a = Dc(t.groups), u = Fc(t.groups), c = t.remotes.map((h) => `${h.name}${cr(h, n).state === "attention" ? " · not set up" : ""}`);
  return /* @__PURE__ */ s.jsxs(
    "div",
    {
      className: `room ${i ? "lit" : ""}`,
      style: i ? { background: i } : void 0,
      role: "link",
      tabIndex: 0,
      onClick: r,
      onKeyDown: (h) => h.key === "Enter" && r(),
      children: [
        /* @__PURE__ */ s.jsxs("div", { className: "room-top", children: [
          /* @__PURE__ */ s.jsxs("div", { className: "grow", children: [
            /* @__PURE__ */ s.jsx("h2", { children: t.name }),
            /* @__PURE__ */ s.jsx("div", { className: "room-sub", children: a ? o ? `${xe(o, "light")} on` : `Off · ${xe(a, "light")}` : "No lights in a group yet" })
          ] }),
          u.length > 0 && /* @__PURE__ */ s.jsx(rr, { getHass: e, entities: u, on: o > 0, label: `Turn ${t.name} ${o ? "off" : "on"}` })
        ] }),
        /* @__PURE__ */ s.jsx("div", { className: "room-sub", children: c.length ? c.join(" · ") : "No remote" }),
        u.length > 0 && /* @__PURE__ */ s.jsx(lr, { getHass: e, entities: u, value: Uc(l, t.groups), label: `${t.name} brightness` })
      ]
    }
  );
}
const Kp = [
  { id: "rooms", label: "Rooms", icon: "home-outline" },
  { id: "remotes", label: "Remotes", icon: "remote" }
];
function Gp({ getHass: e, narrow: t, onToggleMenu: n }) {
  const [r, l] = T.useState(null), [i, o] = T.useState(null), [a, u] = T.useState({}), [c, h] = T.useState("rooms"), [g, m] = T.useState(null), [y, k] = T.useState(null), [j, N] = T.useState(""), f = T.useCallback(() => {
    const v = e();
    Promise.all([
      v.callWS({ type: "hue_remote_scenes/groups" }),
      v.callWS({ type: "hue_remote_scenes/remotes" })
    ]).then(([z, w]) => {
      l(z.groups), o(w.remotes), u({ ...z.area_icons, ...w.area_icons }), N("");
    }).catch((z) => N(rs(z)));
  }, [e]);
  T.useEffect(() => {
    f();
    const v = e().connection.subscribeMessage(f, { type: "hue_remote_scenes/subscribe" });
    return () => {
      v.then((z) => z()).catch(() => {
      });
    };
  }, [e, f]);
  const d = r && i ? yp(r, i, a) : null, p = c === "rooms" ? d == null ? void 0 : d.find((v) => v.name === g) : void 0, x = i == null ? void 0 : i.find((v) => v.ieee === y), S = (v) => {
    h(v), m(null), k(null);
  }, _ = (v) => {
    h("remotes"), m(null), k(v);
  };
  let E;
  return !r || !i || !d ? E = /* @__PURE__ */ s.jsx("main", { children: j && /* @__PURE__ */ s.jsx("div", { className: "status error", children: j }) }) : x ? E = /* @__PURE__ */ s.jsx(Lp, { getHass: e, remote: x, groups: r, onBack: () => k(null), onChanged: f }) : p ? E = /* @__PURE__ */ s.jsx(Wp, { getHass: e, area: p, groups: r, onBack: () => m(null), onOpenRemote: _, onChanged: f }) : E = /* @__PURE__ */ s.jsxs("main", { className: c === "remotes" ? "remotes" : void 0, children: [
    j && /* @__PURE__ */ s.jsx("div", { className: "status error", children: j }),
    c === "remotes" ? /* @__PURE__ */ s.jsx(Dp, { getHass: e, areas: d, groups: r, onOpen: k }) : d.length ? /* @__PURE__ */ s.jsx(Qp, { getHass: e, areas: d, groups: r, onOpen: m, onOpenRemote: _ }) : /* @__PURE__ */ s.jsxs("div", { className: "empty-state", children: [
      /* @__PURE__ */ s.jsx(L, { name: "lightbulb-group-outline" }),
      /* @__PURE__ */ s.jsx("p", { children: "No ZHA groups or remotes yet. Create a group under Settings → Devices & services → Zigbee Home Automation → Configure → Groups. For a Hue Tap Dial, pair it and use the Remotes tab: it creates the group the dial needs." })
    ] })
  ] }), /* @__PURE__ */ s.jsxs("div", { className: "panel", children: [
    /* @__PURE__ */ s.jsx("header", { children: /* @__PURE__ */ s.jsxs("div", { className: "toolbar-row", children: [
      t && /* @__PURE__ */ s.jsx("button", { className: "menu-btn", onClick: n, "aria-label": "Menu", children: /* @__PURE__ */ s.jsx(L, { name: "menu" }) }),
      /* @__PURE__ */ s.jsxs("div", { className: "brand", children: [
        /* @__PURE__ */ s.jsx(vp, {}),
        /* @__PURE__ */ s.jsx("h1", { children: "Hue remote scenes" })
      ] }),
      /* @__PURE__ */ s.jsx("nav", { className: "tabs", role: "tablist", children: Kp.map((v) => /* @__PURE__ */ s.jsxs("button", { role: "tab", "aria-selected": v.id === c, className: v.id === c ? "on" : "", onClick: () => S(v.id), children: [
        /* @__PURE__ */ s.jsx(L, { name: v.icon }),
        /* @__PURE__ */ s.jsx("span", { children: v.label })
      ] }, v.id)) })
    ] }) }),
    E
  ] });
}
const Yp = (
  /* css */
  `
:host {
  --hl-light: var(--state-light-active-color, #ff9800);
  --hl-remote: var(--primary-color, #03a9f4);
  --hl-idle: var(--secondary-text-color, #727272);
  --hl-off: var(--disabled-text-color, #9e9e9e);
  --hl-off-fill: color-mix(in srgb, var(--secondary-text-color, #888) 18%, transparent);
  --hl-radius: var(--ha-card-border-radius, 16px);
  --hl-soft: color-mix(in srgb, var(--primary-text-color, #000) 6%, transparent);
  --hl-warn: var(--warning-color, #ffa600);
  --hrs-swatch-unknown: linear-gradient(135deg, var(--hl-off-fill), var(--hl-soft));
  display: block; height: 100%;
  background: var(--primary-background-color);
  color: var(--primary-text-color);
  font-family: var(--ha-font-family-body, var(--paper-font-body1_-_font-family, Roboto, sans-serif));
  -webkit-font-smoothing: antialiased;
}
* { box-sizing: border-box; }
.panel { min-height: 100%; background: var(--primary-background-color); }
.remote-svg { width: var(--mdc-icon-size, 24px); height: var(--mdc-icon-size, 24px); }
.icon-wrap { display: inline-flex; align-items: center; justify-content: center; line-height: 0; --mdc-icon-size: 20px; }
.spacer { flex: 1; }
.grow { flex: 1; min-width: 0; }
.muted { color: var(--secondary-text-color); font-size: 14px; }
.small { font-size: 12px; }
p { margin: 0; line-height: 1.5; }
code { font-size: 13px; padding: 1px 5px; border-radius: 6px; background: var(--hl-soft); }

/* Header: logo and title, with the tabs inline beside them (they wrap to a row of their own when there's no room). */
header { position: sticky; top: 0; z-index: 2; background: var(--app-header-background-color, var(--primary-color)); color: var(--app-header-text-color, #fff); border-bottom: var(--app-header-border-bottom, none); }
.toolbar-row { display: flex; align-items: center; flex-wrap: wrap; column-gap: 20px; min-height: 56px; padding: 0 16px; }
.brand { display: flex; align-items: center; gap: 10px; height: 56px; flex: none; }
.toolbar-row h1 { font-size: 20px; font-weight: 400; margin: 0; white-space: nowrap; }
.logo { position: relative; width: 26px; height: 26px; flex: none; }
.logo svg { position: absolute; inset: 0; width: 100%; height: 100%; }
.logo-ring { position: absolute; inset: 1px; border-radius: 50%; background: conic-gradient(#ffb020, #ff6a3d, #ff4f8b, #b65cff, #5b6bff, #2f9bff, #19c3c0, #7fd36b, #ffb020); -webkit-mask: radial-gradient(circle, transparent 8.8px, #000 9.4px); mask: radial-gradient(circle, transparent 8.8px, #000 9.4px); }
.toolbar-row .menu-btn { display: inline-flex; background: transparent; border: 0; color: inherit; padding: 8px; margin-left: -8px; margin-right: -10px; border-radius: 50%; }
.toolbar-row .menu-btn:hover { background: rgba(255,255,255,.12); }
/* Pills. flex-shrink 0: when they don't fit beside the logo, the tabs wrap onto their own row instead of squashing. */
.tabs { display: flex; align-items: center; gap: 4px; flex: 1 0 auto; padding: 10px 0; margin: 0 -8px 0 -4px; overflow-x: auto; scrollbar-width: none; }
.tabs::-webkit-scrollbar { display: none; }
.tabs button { flex: none; display: inline-flex; align-items: center; gap: 8px; height: 36px; border: 0; border-radius: 999px; background: transparent; color: inherit; opacity: .75; padding: 0 14px; font-weight: 500; letter-spacing: .01em; }
.tabs button:hover:not(:disabled) { opacity: .95; background: color-mix(in srgb, currentColor 7%, transparent); }
.tabs button:active:not(:disabled) { transform: none; }
.tabs button.on, .tabs button.on:hover:not(:disabled) { opacity: 1; background: color-mix(in srgb, currentColor 13%, transparent); }
.tabs .icon-wrap { --mdc-icon-size: 18px; }

main { max-width: 1040px; margin: 0 auto; padding: 20px 16px 32px; display: flex; flex-direction: column; gap: 16px; }
.stack { display: flex; flex-direction: column; gap: 16px; }
.stack-sm { display: flex; flex-direction: column; gap: 8px; }

/* Cards */
.card { --hl-accent: var(--hl-light); background: var(--card-background-color); border-radius: var(--hl-radius); box-shadow: var(--ha-card-box-shadow, 0 1px 3px rgba(0,0,0,.08)); border: 1px solid var(--divider-color); padding: 18px; display: flex; flex-direction: column; gap: 14px; min-width: 0; }
.card.remote { --hl-accent: var(--hl-remote); }
.card-head { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
.card-head > .chip, .card-head > button { flex: none; }
.title > div { min-width: 0; }
.title { display: flex; align-items: center; gap: 12px; min-width: 0; }
.title-icon { width: 40px; height: 40px; border-radius: 12px; flex: none; --mdc-icon-size: 22px; background: color-mix(in srgb, var(--hl-accent, var(--primary-color)) 14%, transparent); color: var(--hl-accent, var(--primary-color)); }
.title-icon.icon-wrap { --mdc-icon-size: 22px; }
h2 { font-size: 18px; font-weight: 500; margin: 0; }
h3 { font-size: 13px; font-weight: 500; text-transform: uppercase; letter-spacing: .06em; color: var(--secondary-text-color); margin: 6px 0 -4px; }

/* Controls */
button { font: inherit; font-size: 14px; display: inline-flex; align-items: center; justify-content: center; gap: 6px; padding: 8px 14px; border-radius: 10px; border: 1px solid var(--divider-color); background: var(--card-background-color); color: var(--primary-text-color); cursor: pointer; transition: background .15s, border-color .15s, opacity .15s, transform .1s; }
button:hover:not(:disabled) { background: var(--hl-soft); }
button:active:not(:disabled) { transform: scale(.98); }
button:disabled { opacity: .45; cursor: default; }
button:focus-visible { outline: 2px solid var(--primary-color); outline-offset: 2px; }
button.primary { background: var(--hl-accent, var(--primary-color)); color: var(--text-primary-color, #fff); border-color: transparent; }
button.primary:hover:not(:disabled) { background: var(--hl-accent, var(--primary-color)); filter: brightness(1.08); }
button.ghost { border-color: transparent; background: transparent; color: var(--secondary-text-color); padding-right: 6px; }
button.round { width: 36px; height: 36px; padding: 0; border-radius: 50%; }
button.danger { color: var(--error-color); border-color: transparent; background: transparent; }
button.link { border: 0; background: none; padding: 0; color: var(--primary-color); font-weight: 500; }
select, input[type=text] { font: inherit; font-size: 14px; padding: 8px 10px; border-radius: 10px; border: 1px solid var(--divider-color); background: var(--card-background-color); color: var(--primary-text-color); color-scheme: light dark; min-width: 0; }
.toolbar, .actions, .inline-row { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; }
.inline-row { gap: 12px; }
.inline-row input[type=text] { flex: 1; min-width: 160px; }

.segmented { display: inline-flex; padding: 3px; gap: 3px; border-radius: 12px; background: var(--hl-soft); }
.segmented.full { display: flex; }
.segmented.full button { flex: 1; }
.segmented button { border: 0; border-radius: 9px; background: transparent; padding: 7px 12px; color: var(--secondary-text-color); }
.segmented button.on { background: var(--card-background-color); color: var(--primary-text-color); box-shadow: 0 1px 3px rgba(0,0,0,.15); font-weight: 500; }
.segmented button.done:not(.on) { color: var(--success-color, #43a047); }
.segmented .icon-wrap { --mdc-icon-size: 16px; }

.chip { display: inline-flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 500; padding: 4px 10px; border-radius: 999px; background: var(--hl-soft); color: var(--secondary-text-color); white-space: nowrap; }
.chip .icon-wrap { --mdc-icon-size: 14px; }
.chip.on { background: color-mix(in srgb, var(--hl-accent) 16%, transparent); color: var(--hl-accent); }
.chip.ok { background: color-mix(in srgb, var(--success-color, #43a047) 14%, transparent); color: var(--success-color, #43a047); }
.chip.warn { background: color-mix(in srgb, var(--hl-warn) 18%, transparent); color: var(--hl-warn); }
.chips { display: flex; flex-wrap: wrap; gap: 8px; }
.chip-btn { border-radius: 999px; padding: 6px 14px; }
.chip-btn.on { background: color-mix(in srgb, var(--hl-accent, var(--primary-color)) 16%, transparent); border-color: var(--hl-accent, var(--primary-color)); color: var(--hl-accent, var(--primary-color)); font-weight: 500; }

.status { padding: 10px 14px; border-radius: 10px; font-size: 14px; background: var(--hl-soft); }
.status.ok { background: color-mix(in srgb, var(--success-color, #43a047) 14%, transparent); }
.status.error { background: color-mix(in srgb, var(--error-color, #db4437) 14%, transparent); color: var(--error-color); }
.status.warn { background: color-mix(in srgb, var(--hl-warn) 14%, transparent); }
.status.busy { opacity: .8; }
.status.row { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
.status.row .icon-wrap { color: var(--hl-warn); }

.empty-state { display: flex; flex-direction: column; align-items: center; gap: 8px; text-align: center; padding: 48px 16px; color: var(--secondary-text-color); }
.empty-state .icon-wrap { --mdc-icon-size: 48px; opacity: .5; }
.empty-state p { max-width: 560px; }

/* A card's actions */
.card-actions { display: flex; align-items: center; gap: 8px; }

/* Banner: something to set up */
.banner { display: flex; align-items: center; gap: 12px; padding: 12px 16px; border-radius: var(--hl-radius); background: color-mix(in srgb, var(--hl-warn) 16%, var(--card-background-color)); }
.banner > .icon-wrap { color: var(--hl-warn); }
.banner .primary { --hl-accent: var(--hl-warn); }

/* Rooms: cards tinted with their lights' colours */
.rooms { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 14px; }
.room { display: flex; flex-direction: column; gap: 10px; padding: 18px 18px 16px; border-radius: 20px; min-height: 150px; cursor: pointer; background: var(--card-background-color); border: 1px solid var(--divider-color); box-shadow: var(--ha-card-box-shadow, none); transition: transform .15s, box-shadow .15s; }
.room:hover { transform: translateY(-1px); box-shadow: 0 6px 18px -8px rgba(0,0,0,.35); }
.room:focus-visible { outline: 2px solid var(--primary-color); outline-offset: 2px; }
.room.lit { color: #fff; border-color: transparent; }
.room-top { display: flex; align-items: flex-start; gap: 12px; }
.room h2 { font-size: 20px; }
.room-sub { font-size: 13px; color: var(--secondary-text-color); }
.room.lit .room-sub { color: rgba(255,255,255,.88); }
.room .bri { margin-top: auto; }

/* On/off switch: light track and dark knob when on (white on coloured surfaces), grey when off */
.switch { position: relative; flex: none; width: 46px; height: 28px; padding: 0; border-radius: 999px; border: 0; background: var(--hl-off-fill); }
.switch::after { content: ""; position: absolute; left: 3px; top: 3px; width: 22px; height: 22px; border-radius: 50%; background: var(--secondary-text-color); transition: left .15s; }
.switch.on { background: var(--primary-text-color); }
.switch.on::after { left: 21px; background: var(--card-background-color); }
.lit .switch.on { background: rgba(255,255,255,.95); }
.lit .switch.on::after { background: #1d2433; }
.switch:hover:not(:disabled) { filter: brightness(1.05); }
.list .switch { width: 40px; height: 24px; }
.list .switch::after { width: 18px; height: 18px; }
.list .switch.on::after { left: 19px; }

/* Brightness bar: a plain fill, no handle */
.bri { -webkit-appearance: none; appearance: none; width: 100%; height: 34px; margin: 0; border-radius: 12px; cursor: pointer; background: linear-gradient(to right, var(--fill, var(--secondary-text-color)) var(--v), var(--hl-off-fill) var(--v)); }
.bri::-webkit-slider-thumb { -webkit-appearance: none; width: 1px; height: 1px; opacity: 0; }
.bri::-moz-range-thumb { width: 1px; height: 1px; border: 0; opacity: 0; }
.bri:focus-visible { outline: 2px solid var(--primary-color); outline-offset: 2px; }
.lit .bri { background: linear-gradient(to right, rgba(255,255,255,.35) var(--v), rgba(0,0,0,.22) var(--v)); }
.list .bri { width: 120px; height: 6px; border-radius: 999px; flex: none; }

/* A room's header in its lights' colours */
.hero { padding: 20px 0 26px; background: var(--card-background-color); border-bottom: 1px solid var(--divider-color); }
.hero.lit { color: #fff; border-bottom: 0; }
.hero-in { max-width: 1040px; margin: 0 auto; padding: 0 16px; display: flex; flex-direction: column; gap: 14px; }
.hero-row { display: flex; align-items: center; gap: 14px; }
.hero h1 { flex: 1; margin: 0; font-size: 30px; font-weight: 500; }
.hero.lit .crumbs, .hero.lit .crumbs .link { color: rgba(255,255,255,.9); }
.crumbs { display: flex; align-items: center; gap: 4px; font-size: 14px; color: var(--secondary-text-color); }
.crumbs .icon-wrap { --mdc-icon-size: 16px; }
.group { display: flex; flex-direction: column; gap: 14px; }
.group + .group { margin-top: 12px; padding-top: 20px; border-top: 1px solid var(--divider-color); }
.group-title { font-size: 20px; }

/* Scene tiles */
.tiles { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 12px; }
.tile-wrap { position: relative; }
.tile { position: relative; width: 100%; height: 110px; padding: 12px; border: 0; border-radius: 16px; display: flex; flex-direction: column; align-items: flex-start; justify-content: flex-end; gap: 2px; text-align: left; color: #fff; text-shadow: 0 1px 3px rgba(0,0,0,.5); box-shadow: inset 0 0 0 1px rgba(0,0,0,.08); }
.tile:hover:not(:disabled) { filter: brightness(1.06); }
.tile-name { font-size: 15px; font-weight: 500; }
.tile-warn { font-size: 11px; opacity: .9; }
.tile .badge { position: absolute; left: 10px; top: 10px; font-size: 10px; letter-spacing: 1.5px; padding: 3px 7px; border-radius: 999px; background: rgba(255,255,255,.92); color: #1d2433; text-shadow: none; }
.tile-more { position: absolute; right: 4px; top: 4px; width: 32px; height: 32px; padding: 0; border: 0; border-radius: 50%; background: transparent; color: #fff; filter: drop-shadow(0 1px 2px rgba(0,0,0,.5)); }
.tile-more:hover:not(:disabled) { background: rgba(0,0,0,.18); }
.pale .tile, .pale .tile-more { color: #1d2433; text-shadow: none; filter: none; }
.pale .tile-more:hover:not(:disabled) { background: rgba(0,0,0,.08); }
.tile.add { background: transparent; border: 1.5px dashed var(--divider-color); box-shadow: none; color: var(--secondary-text-color); text-shadow: none; align-items: center; justify-content: center; gap: 6px; }
.tile.add .icon-wrap { --mdc-icon-size: 22px; }
.add-dots { font-size: 11px; letter-spacing: 2px; }
.tile-form { background: var(--card-background-color); border: 1px solid var(--divider-color); color: var(--primary-text-color); text-shadow: none; justify-content: space-between; align-items: stretch; }
.tile-form-actions { display: flex; justify-content: flex-end; gap: 4px; }
.tile-form-actions button { padding: 6px 10px; }
.menu-backdrop { position: fixed; inset: 0; z-index: 5; }
.menu { position: absolute; right: 0; top: 38px; z-index: 6; width: max-content; min-width: 100%; padding: 6px; border-radius: 14px; background: var(--card-background-color); border: 1px solid var(--divider-color); box-shadow: 0 12px 32px -8px rgba(0,0,0,.35); display: flex; flex-direction: column; }
.tile-wrap .menu { left: 4px; right: 4px; width: auto; min-width: 0; }
.tile-wrap .menu button { text-align: left; }
.menu button { justify-content: flex-start; border: 0; background: transparent; padding: 9px 10px; border-radius: 9px; --mdc-icon-size: 18px; }
/* Scene editor */
.sheet-backdrop { position: fixed; inset: 0; z-index: 10; background: rgba(0,0,0,.45); display: flex; align-items: center; justify-content: center; padding: 16px; }
.sheet { width: 100%; max-width: 560px; max-height: calc(100% - 16px); overflow-y: auto; background: var(--card-background-color); color: var(--primary-text-color); border-radius: 20px; padding: 18px; display: flex; flex-direction: column; gap: 12px; box-shadow: 0 24px 60px -12px rgba(0,0,0,.5); }
.sheet-head { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
.sheet-head h2 { margin: 0; font-size: 20px; }
.icon-btn { width: 36px; height: 36px; padding: 0; border: 0; border-radius: 50%; background: transparent; justify-content: center; }
.sheet-actions { position: sticky; bottom: -18px; margin: 0 -18px -18px; padding: 12px 18px 18px; display: flex; justify-content: flex-end; gap: 8px; background: var(--card-background-color); border-top: 1px solid var(--divider-color); }
.edit-light { display: flex; flex-direction: column; gap: 10px; padding: 12px; border: 1px solid var(--divider-color); border-radius: 14px; }
.edit-light.all { background: var(--hl-soft); }
.edit-light.off .palette { opacity: .7; }
.edit-row { display: flex; align-items: center; gap: 12px; }
.edit-light .bri { height: 26px; border-radius: 10px; }
.palette { display: flex; flex-wrap: wrap; gap: 8px; }
.swatch-btn { position: relative; width: 32px; height: 32px; padding: 0; border: 0; border-radius: 50%; flex: none; box-shadow: inset 0 0 0 1px rgba(0,0,0,.15); cursor: pointer; display: inline-flex; align-items: center; justify-content: center; }
.swatch-btn:hover:not(:disabled) { transform: scale(1.08); filter: none; }
.swatch-btn.custom { background: conic-gradient(#ff2a1a, #ffd400, #22d33a, #00d5e0, #2f4bff, #9a3cff, #ff4fb8, #ff2a1a); color: #fff; --mdc-icon-size: 16px; }
.swatch-btn.custom input { position: absolute; inset: 0; width: 100%; height: 100%; opacity: 0; cursor: pointer; border: 0; padding: 0; }
.scene-chip { padding: 6px 14px 6px 8px; }
.scene-chip .badge { font-size: 10px; color: var(--secondary-text-color); }
.dot { width: 18px; height: 18px; border-radius: 50%; flex: none; box-shadow: inset 0 0 0 1px rgba(0,0,0,.1); }

/* Remotes by room */
.remote-room { display: flex; flex-direction: column; gap: 10px; }
.remote-room + .remote-room { margin-top: 10px; }
.remote-room-head { display: flex; align-items: center; gap: 10px; }
.remote-room-head h2 { font-size: 17px; }
.strip { width: 28px; height: 28px; border-radius: 9px; flex: none; background: var(--hl-off-fill); }
.mini-swatches { display: flex; gap: 4px; margin-top: 6px; }
.mini-swatch { width: 22px; height: 22px; border-radius: 7px; box-shadow: inset 0 0 0 1px rgba(0,0,0,.1); }
main.remotes { max-width: 860px; }

/* Lists: lights, remotes, buttons */
.list { background: var(--card-background-color); border: 1px solid var(--divider-color); border-radius: var(--hl-radius); overflow: hidden; }
.list-row { width: 100%; display: flex; align-items: center; gap: 14px; padding: 12px 16px; border: 0; border-bottom: 1px solid var(--divider-color); border-radius: 0; background: transparent; text-align: left; justify-content: flex-start; }
.list-row:last-child { border-bottom: 0; }
.list-row.static { cursor: default; }
.list-row.static:hover { background: transparent; }
.list-row strong { font-weight: 500; }
.row-detail { display: block; margin-top: 2px; }
.row-icon { width: 36px; height: 36px; border-radius: 10px; flex: none; background: var(--hl-soft); color: var(--secondary-text-color); }
.row-icon.big { width: 44px; height: 44px; border-radius: 12px; --mdc-icon-size: 24px; }
/* Diagnostics */
.diag .inline-row h3 { margin: 0; }
.diag .row-icon { width: 28px; height: 28px; border-radius: 8px; --mdc-icon-size: 18px; }
.check.ok .row-icon { color: var(--success-color, #43a047); }
.check.warn { background: color-mix(in srgb, var(--hl-warn) 10%, transparent); }
.check.warn .row-icon { color: var(--hl-warn); }
.check.info .row-icon { color: var(--info-color, var(--primary-color)); }
.list-row.check.warn:hover { background: color-mix(in srgb, var(--hl-warn) 10%, transparent); }
.check-label { display: inline-flex; align-items: center; gap: 6px; }
.log { max-height: 420px; overflow-y: auto; }
.log-row { gap: 10px; padding: 8px 14px; align-items: flex-start; }
.log-row .chip { flex: none; font-size: 11px; padding: 2px 8px; }
.log-time { flex: none; font-variant-numeric: tabular-nums; padding-top: 2px; }
.log-body { min-width: 0; overflow-wrap: anywhere; }
.log-args { display: block; margin-top: 3px; font-size: 12px; white-space: pre-wrap; overflow-wrap: anywhere; }
.log-note { display: block; margin-top: 2px; color: var(--secondary-text-color); }
.log-row.ha .log-note { color: var(--primary-text-color); margin-top: 0; }
.kv { display: grid; grid-template-columns: max-content 1fr; gap: 6px 16px; margin: 0; }
.kv-row { display: contents; }
.kv dt, .kv dd { margin: 0; overflow-wrap: anywhere; }
.ep .row-detail { overflow-wrap: anywhere; }
.light-dot { width: 30px; height: 30px; border-radius: 50%; flex: none; background: var(--hl-off-fill); }
.btn-icon { width: 44px; height: 44px; border-radius: 12px; flex: none; display: inline-flex; align-items: center; justify-content: center; background: var(--hl-soft); font-size: 10px; letter-spacing: 1.5px; color: var(--primary-text-color); }
.recall { border-color: transparent; background: color-mix(in srgb, var(--hl-light) 16%, transparent); color: var(--hl-light); }
.picker { position: relative; display: inline-flex; align-items: center; gap: 10px; min-width: 190px; padding: 8px 12px 8px 8px; border-radius: 12px; border: 1px solid var(--divider-color); background: var(--hl-soft); cursor: pointer; }
.picker select { position: absolute; inset: 0; width: 100%; opacity: 0; cursor: pointer; }
.picker:focus-within { outline: 2px solid var(--primary-color); outline-offset: 2px; }
.picker-swatch { width: 26px; height: 26px; border-radius: 8px; flex: none; }
.picker-name { flex: 1; font-size: 14px; }
.picker-chev { color: var(--secondary-text-color); }

/* A remote's page */
.dev-head { display: flex; align-items: center; gap: 16px; }
.dev-name { font-size: 24px; }
.dev-icon { width: 64px; height: 64px; border-radius: 18px; flex: none; background: var(--hl-soft); color: var(--secondary-text-color); }
.dev-icon.icon-wrap { --mdc-icon-size: 34px; }
main.narrow { max-width: 760px; }
.btn-icon .icon-wrap { --mdc-icon-size: 20px; }
h3 .hint { text-transform: none; letter-spacing: 0; font-weight: 400; margin-left: 8px; }
.prog { height: 6px; border-radius: 999px; background: var(--hl-off-fill); overflow: hidden; }
.prog span { display: block; height: 100%; border-radius: 999px; background: var(--hl-accent); }

/* Scene-button set-up */
.picks { display: flex; flex-wrap: wrap; gap: 8px; }
.pick { display: inline-flex; align-items: center; gap: 8px; padding: 6px 14px 6px 10px; border-radius: 999px; border: 1px solid var(--divider-color); cursor: pointer; font-size: 14px; }
.pick.on { border-color: var(--hl-accent); background: color-mix(in srgb, var(--hl-accent) 12%, transparent); }
.pick input { margin: 0; accent-color: var(--hl-accent); }
.bulb { width: 10px; height: 10px; border-radius: 50%; background: var(--hl-off-fill); flex: none; }
.bulb.lit { background: var(--hl-light); }

@media (max-width: 600px) {
  /* Room at the bottom for the tab bar (and the phone's home indicator). */
  main { padding: 12px 8px calc(88px + env(safe-area-inset-bottom)); gap: 12px; }
  .card { padding: 14px; }
  .rooms { grid-template-columns: 1fr; }
  .tiles { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  /* Phones: the tabs become a bar along the bottom, in thumb reach. */
  .tabs { position: fixed; left: 0; right: 0; bottom: 0; z-index: 3; margin: 0; gap: 0; justify-content: space-around;
    padding: 6px 8px calc(6px + env(safe-area-inset-bottom)); overflow: visible;
    background: var(--card-background-color); color: var(--primary-text-color); border-top: 1px solid var(--divider-color); box-shadow: 0 -2px 10px rgba(0,0,0,.06); }
  .tabs button { flex: 1 1 0; flex-direction: column; gap: 2px; height: 54px; padding: 0; border-radius: 14px; font-size: 11.5px; letter-spacing: 0; opacity: .7; }
  .tabs button:hover:not(:disabled) { background: transparent; }
  .tabs button.on, .tabs button.on:hover:not(:disabled) { background: transparent; color: var(--hl-light); opacity: 1; }
  .tabs .icon-wrap { --mdc-icon-size: 22px; padding: 3px 16px; border-radius: 999px; transition: background .15s; }
  .tabs button.on .icon-wrap { background: color-mix(in srgb, var(--hl-light) 16%, transparent); }
  .segmented.steps button { padding: 7px 6px; font-size: 12px; }
  .hero h1 { font-size: 24px; }
  .list .bri { width: 72px; }
  .picker select { min-width: 110px; }
  .dev-head { flex-wrap: wrap; }
}
`
);
class Zp extends HTMLElement {
  constructor() {
    super(...arguments);
    gn(this, "_hass");
    gn(this, "_narrow", !1);
    gn(this, "_root");
    gn(this, "_pending");
  }
  set hass(n) {
    const r = !this._hass;
    this._hass = n, r ? this._render() : this._pending ?? (this._pending = window.setTimeout(() => {
      this._pending = void 0, this._render();
    }, 1e3));
  }
  set narrow(n) {
    n !== this._narrow && (this._narrow = n, this._render());
  }
  connectedCallback() {
    if (!this._root) {
      const n = this.shadowRoot ?? this.attachShadow({ mode: "open" }), r = document.createElement("style");
      r.textContent = Yp;
      const l = document.createElement("div");
      n.append(r, l), this._root = Oc(l);
    }
    this._render();
  }
  disconnectedCallback() {
    var n, r;
    window.clearTimeout(this._pending), this._pending = void 0, (n = this._root) == null || n.unmount(), this._root = void 0, (r = this.shadowRoot) == null || r.replaceChildren();
  }
  _render() {
    !this._root || !this._hass || this._root.render(
      /* @__PURE__ */ s.jsx(
        Gp,
        {
          getHass: () => this._hass,
          narrow: this._narrow,
          onToggleMenu: () => this.dispatchEvent(
            new Event("hass-toggle-menu", { bubbles: !0, composed: !0 })
          )
        }
      )
    );
  }
}
customElements.get("hue-remote-scenes-panel") || customElements.define("hue-remote-scenes-panel", Zp);
