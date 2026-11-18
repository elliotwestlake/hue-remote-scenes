var Cc = Object.defineProperty;
var Ec = (e, t, n) => t in e ? Cc(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var yn = (e, t, n) => Ec(e, typeof t != "symbol" ? t + "" : t, n);
var sa = { exports: {} }, ul = {}, aa = { exports: {} }, M = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var rr = Symbol.for("react.element"), zc = Symbol.for("react.portal"), Pc = Symbol.for("react.fragment"), Tc = Symbol.for("react.strict_mode"), Lc = Symbol.for("react.profiler"), Rc = Symbol.for("react.provider"), Mc = Symbol.for("react.context"), $c = Symbol.for("react.forward_ref"), Oc = Symbol.for("react.suspense"), Dc = Symbol.for("react.memo"), Fc = Symbol.for("react.lazy"), Zo = Symbol.iterator;
function Ic(e) {
  return e === null || typeof e != "object" ? null : (e = Zo && e[Zo] || e["@@iterator"], typeof e == "function" ? e : null);
}
var ua = { isMounted: function() {
  return !1;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, ca = Object.assign, da = {};
function hn(e, t, n) {
  this.props = e, this.context = t, this.refs = da, this.updater = n || ua;
}
hn.prototype.isReactComponent = {};
hn.prototype.setState = function(e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, e, t, "setState");
};
hn.prototype.forceUpdate = function(e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function fa() {
}
fa.prototype = hn.prototype;
function qi(e, t, n) {
  this.props = e, this.context = t, this.refs = da, this.updater = n || ua;
}
var eo = qi.prototype = new fa();
eo.constructor = qi;
ca(eo, hn.prototype);
eo.isPureReactComponent = !0;
var Jo = Array.isArray, pa = Object.prototype.hasOwnProperty, to = { current: null }, ha = { key: !0, ref: !0, __self: !0, __source: !0 };
function ma(e, t, n) {
  var r, l = {}, i = null, o = null;
  if (t != null) for (r in t.ref !== void 0 && (o = t.ref), t.key !== void 0 && (i = "" + t.key), t) pa.call(t, r) && !ha.hasOwnProperty(r) && (l[r] = t[r]);
  var s = arguments.length - 2;
  if (s === 1) l.children = n;
  else if (1 < s) {
    for (var a = Array(s), d = 0; d < s; d++) a[d] = arguments[d + 2];
    l.children = a;
  }
  if (e && e.defaultProps) for (r in s = e.defaultProps, s) l[r] === void 0 && (l[r] = s[r]);
  return { $$typeof: rr, type: e, key: i, ref: o, props: l, _owner: to.current };
}
function Ac(e, t) {
  return { $$typeof: rr, type: e.type, key: t, ref: e.ref, props: e.props, _owner: e._owner };
}
function no(e) {
  return typeof e == "object" && e !== null && e.$$typeof === rr;
}
function Uc(e) {
  var t = { "=": "=0", ":": "=2" };
  return "$" + e.replace(/[=:]/g, function(n) {
    return t[n];
  });
}
var bo = /\/+/g;
function Pl(e, t) {
  return typeof e == "object" && e !== null && e.key != null ? Uc("" + e.key) : t.toString(36);
}
function Er(e, t, n, r, l) {
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
        case rr:
        case zc:
          o = !0;
      }
  }
  if (o) return o = e, l = l(o), e = r === "" ? "." + Pl(o, 0) : r, Jo(l) ? (n = "", e != null && (n = e.replace(bo, "$&/") + "/"), Er(l, t, n, "", function(d) {
    return d;
  })) : l != null && (no(l) && (l = Ac(l, n + (!l.key || o && o.key === l.key ? "" : ("" + l.key).replace(bo, "$&/") + "/") + e)), t.push(l)), 1;
  if (o = 0, r = r === "" ? "." : r + ":", Jo(e)) for (var s = 0; s < e.length; s++) {
    i = e[s];
    var a = r + Pl(i, s);
    o += Er(i, t, n, a, l);
  }
  else if (a = Ic(e), typeof a == "function") for (e = a.call(e), s = 0; !(i = e.next()).done; ) i = i.value, a = r + Pl(i, s++), o += Er(i, t, n, a, l);
  else if (i === "object") throw t = String(e), Error("Objects are not valid as a React child (found: " + (t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) + "). If you meant to render a collection of children, use an array instead.");
  return o;
}
function cr(e, t, n) {
  if (e == null) return e;
  var r = [], l = 0;
  return Er(e, r, "", "", function(i) {
    return t.call(n, i, l++);
  }), r;
}
function Bc(e) {
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
var fe = { current: null }, zr = { transition: null }, Wc = { ReactCurrentDispatcher: fe, ReactCurrentBatchConfig: zr, ReactCurrentOwner: to };
function ga() {
  throw Error("act(...) is not supported in production builds of React.");
}
M.Children = { map: cr, forEach: function(e, t, n) {
  cr(e, function() {
    t.apply(this, arguments);
  }, n);
}, count: function(e) {
  var t = 0;
  return cr(e, function() {
    t++;
  }), t;
}, toArray: function(e) {
  return cr(e, function(t) {
    return t;
  }) || [];
}, only: function(e) {
  if (!no(e)) throw Error("React.Children.only expected to receive a single React element child.");
  return e;
} };
M.Component = hn;
M.Fragment = Pc;
M.Profiler = Lc;
M.PureComponent = qi;
M.StrictMode = Tc;
M.Suspense = Oc;
M.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Wc;
M.act = ga;
M.cloneElement = function(e, t, n) {
  if (e == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
  var r = ca({}, e.props), l = e.key, i = e.ref, o = e._owner;
  if (t != null) {
    if (t.ref !== void 0 && (i = t.ref, o = to.current), t.key !== void 0 && (l = "" + t.key), e.type && e.type.defaultProps) var s = e.type.defaultProps;
    for (a in t) pa.call(t, a) && !ha.hasOwnProperty(a) && (r[a] = t[a] === void 0 && s !== void 0 ? s[a] : t[a]);
  }
  var a = arguments.length - 2;
  if (a === 1) r.children = n;
  else if (1 < a) {
    s = Array(a);
    for (var d = 0; d < a; d++) s[d] = arguments[d + 2];
    r.children = s;
  }
  return { $$typeof: rr, type: e.type, key: l, ref: i, props: r, _owner: o };
};
M.createContext = function(e) {
  return e = { $$typeof: Mc, _currentValue: e, _currentValue2: e, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, e.Provider = { $$typeof: Rc, _context: e }, e.Consumer = e;
};
M.createElement = ma;
M.createFactory = function(e) {
  var t = ma.bind(null, e);
  return t.type = e, t;
};
M.createRef = function() {
  return { current: null };
};
M.forwardRef = function(e) {
  return { $$typeof: $c, render: e };
};
M.isValidElement = no;
M.lazy = function(e) {
  return { $$typeof: Fc, _payload: { _status: -1, _result: e }, _init: Bc };
};
M.memo = function(e, t) {
  return { $$typeof: Dc, type: e, compare: t === void 0 ? null : t };
};
M.startTransition = function(e) {
  var t = zr.transition;
  zr.transition = {};
  try {
    e();
  } finally {
    zr.transition = t;
  }
};
M.unstable_act = ga;
M.useCallback = function(e, t) {
  return fe.current.useCallback(e, t);
};
M.useContext = function(e) {
  return fe.current.useContext(e);
};
M.useDebugValue = function() {
};
M.useDeferredValue = function(e) {
  return fe.current.useDeferredValue(e);
};
M.useEffect = function(e, t) {
  return fe.current.useEffect(e, t);
};
M.useId = function() {
  return fe.current.useId();
};
M.useImperativeHandle = function(e, t, n) {
  return fe.current.useImperativeHandle(e, t, n);
};
M.useInsertionEffect = function(e, t) {
  return fe.current.useInsertionEffect(e, t);
};
M.useLayoutEffect = function(e, t) {
  return fe.current.useLayoutEffect(e, t);
};
M.useMemo = function(e, t) {
  return fe.current.useMemo(e, t);
};
M.useReducer = function(e, t, n) {
  return fe.current.useReducer(e, t, n);
};
M.useRef = function(e) {
  return fe.current.useRef(e);
};
M.useState = function(e) {
  return fe.current.useState(e);
};
M.useSyncExternalStore = function(e, t, n) {
  return fe.current.useSyncExternalStore(e, t, n);
};
M.useTransition = function() {
  return fe.current.useTransition();
};
M.version = "18.3.1";
aa.exports = M;
var D = aa.exports;
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Vc = D, Hc = Symbol.for("react.element"), Qc = Symbol.for("react.fragment"), Kc = Object.prototype.hasOwnProperty, Gc = Vc.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, Yc = { key: !0, ref: !0, __self: !0, __source: !0 };
function va(e, t, n) {
  var r, l = {}, i = null, o = null;
  n !== void 0 && (i = "" + n), t.key !== void 0 && (i = "" + t.key), t.ref !== void 0 && (o = t.ref);
  for (r in t) Kc.call(t, r) && !Yc.hasOwnProperty(r) && (l[r] = t[r]);
  if (e && e.defaultProps) for (r in t = e.defaultProps, t) l[r] === void 0 && (l[r] = t[r]);
  return { $$typeof: Hc, type: e, key: i, ref: o, props: l, _owner: Gc.current };
}
ul.Fragment = Qc;
ul.jsx = va;
ul.jsxs = va;
sa.exports = ul;
var u = sa.exports, ya = { exports: {} }, je = {}, xa = { exports: {} }, wa = {};
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
  function t(C, P) {
    var L = C.length;
    C.push(P);
    e: for (; 0 < L; ) {
      var Y = L - 1 >>> 1, q = C[Y];
      if (0 < l(q, P)) C[Y] = P, C[L] = q, L = Y;
      else break e;
    }
  }
  function n(C) {
    return C.length === 0 ? null : C[0];
  }
  function r(C) {
    if (C.length === 0) return null;
    var P = C[0], L = C.pop();
    if (L !== P) {
      C[0] = L;
      e: for (var Y = 0, q = C.length, ar = q >>> 1; Y < ar; ) {
        var Nt = 2 * (Y + 1) - 1, zl = C[Nt], jt = Nt + 1, ur = C[jt];
        if (0 > l(zl, L)) jt < q && 0 > l(ur, zl) ? (C[Y] = ur, C[jt] = L, Y = jt) : (C[Y] = zl, C[Nt] = L, Y = Nt);
        else if (jt < q && 0 > l(ur, L)) C[Y] = ur, C[jt] = L, Y = jt;
        else break e;
      }
    }
    return P;
  }
  function l(C, P) {
    var L = C.sortIndex - P.sortIndex;
    return L !== 0 ? L : C.id - P.id;
  }
  if (typeof performance == "object" && typeof performance.now == "function") {
    var i = performance;
    e.unstable_now = function() {
      return i.now();
    };
  } else {
    var o = Date, s = o.now();
    e.unstable_now = function() {
      return o.now() - s;
    };
  }
  var a = [], d = [], m = 1, h = null, g = 3, y = !1, k = !1, S = !1, z = typeof setTimeout == "function" ? setTimeout : null, f = typeof clearTimeout == "function" ? clearTimeout : null, c = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function p(C) {
    for (var P = n(d); P !== null; ) {
      if (P.callback === null) r(d);
      else if (P.startTime <= C) r(d), P.sortIndex = P.expirationTime, t(a, P);
      else break;
      P = n(d);
    }
  }
  function x(C) {
    if (S = !1, p(C), !k) if (n(a) !== null) k = !0, F(j);
    else {
      var P = n(d);
      P !== null && ne(x, P.startTime - C);
    }
  }
  function j(C, P) {
    k = !1, S && (S = !1, f(_), _ = -1), y = !0;
    var L = g;
    try {
      for (p(P), h = n(a); h !== null && (!(h.expirationTime > P) || C && !xe()); ) {
        var Y = h.callback;
        if (typeof Y == "function") {
          h.callback = null, g = h.priorityLevel;
          var q = Y(h.expirationTime <= P);
          P = e.unstable_now(), typeof q == "function" ? h.callback = q : h === n(a) && r(a), p(P);
        } else r(a);
        h = n(a);
      }
      if (h !== null) var ar = !0;
      else {
        var Nt = n(d);
        Nt !== null && ne(x, Nt.startTime - P), ar = !1;
      }
      return ar;
    } finally {
      h = null, g = L, y = !1;
    }
  }
  var v = !1, w = null, _ = -1, V = 5, R = -1;
  function xe() {
    return !(e.unstable_now() - R < V);
  }
  function Ue() {
    if (w !== null) {
      var C = e.unstable_now();
      R = C;
      var P = !0;
      try {
        P = w(!0, C);
      } finally {
        P ? nt() : (v = !1, w = null);
      }
    } else v = !1;
  }
  var nt;
  if (typeof c == "function") nt = function() {
    c(Ue);
  };
  else if (typeof MessageChannel < "u") {
    var vn = new MessageChannel(), T = vn.port2;
    vn.port1.onmessage = Ue, nt = function() {
      T.postMessage(null);
    };
  } else nt = function() {
    z(Ue, 0);
  };
  function F(C) {
    w = C, v || (v = !0, nt());
  }
  function ne(C, P) {
    _ = z(function() {
      C(e.unstable_now());
    }, P);
  }
  e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(C) {
    C.callback = null;
  }, e.unstable_continueExecution = function() {
    k || y || (k = !0, F(j));
  }, e.unstable_forceFrameRate = function(C) {
    0 > C || 125 < C ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : V = 0 < C ? Math.floor(1e3 / C) : 5;
  }, e.unstable_getCurrentPriorityLevel = function() {
    return g;
  }, e.unstable_getFirstCallbackNode = function() {
    return n(a);
  }, e.unstable_next = function(C) {
    switch (g) {
      case 1:
      case 2:
      case 3:
        var P = 3;
        break;
      default:
        P = g;
    }
    var L = g;
    g = P;
    try {
      return C();
    } finally {
      g = L;
    }
  }, e.unstable_pauseExecution = function() {
  }, e.unstable_requestPaint = function() {
  }, e.unstable_runWithPriority = function(C, P) {
    switch (C) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;
      default:
        C = 3;
    }
    var L = g;
    g = C;
    try {
      return P();
    } finally {
      g = L;
    }
  }, e.unstable_scheduleCallback = function(C, P, L) {
    var Y = e.unstable_now();
    switch (typeof L == "object" && L !== null ? (L = L.delay, L = typeof L == "number" && 0 < L ? Y + L : Y) : L = Y, C) {
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
    return q = L + q, C = { id: m++, callback: P, priorityLevel: C, startTime: L, expirationTime: q, sortIndex: -1 }, L > Y ? (C.sortIndex = L, t(d, C), n(a) === null && C === n(d) && (S ? (f(_), _ = -1) : S = !0, ne(x, L - Y))) : (C.sortIndex = q, t(a, C), k || y || (k = !0, F(j))), C;
  }, e.unstable_shouldYield = xe, e.unstable_wrapCallback = function(C) {
    var P = g;
    return function() {
      var L = g;
      g = P;
      try {
        return C.apply(this, arguments);
      } finally {
        g = L;
      }
    };
  };
})(wa);
xa.exports = wa;
var Xc = xa.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Zc = D, Ne = Xc;
function N(e) {
  for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
  return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var ka = /* @__PURE__ */ new Set(), Un = {};
function It(e, t) {
  on(e, t), on(e + "Capture", t);
}
function on(e, t) {
  for (Un[e] = t, e = 0; e < t.length; e++) ka.add(t[e]);
}
var Je = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), li = Object.prototype.hasOwnProperty, Jc = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, qo = {}, es = {};
function bc(e) {
  return li.call(es, e) ? !0 : li.call(qo, e) ? !1 : Jc.test(e) ? es[e] = !0 : (qo[e] = !0, !1);
}
function qc(e, t, n, r) {
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
function ed(e, t, n, r) {
  if (t === null || typeof t > "u" || qc(e, t, n, r)) return !0;
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
function pe(e, t, n, r, l, i, o) {
  this.acceptsBooleans = t === 2 || t === 3 || t === 4, this.attributeName = r, this.attributeNamespace = l, this.mustUseProperty = n, this.propertyName = e, this.type = t, this.sanitizeURL = i, this.removeEmptyString = o;
}
var ie = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
  ie[e] = new pe(e, 0, !1, e, null, !1, !1);
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
  var t = e[0];
  ie[t] = new pe(t, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
  ie[e] = new pe(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
  ie[e] = new pe(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
  ie[e] = new pe(e, 3, !1, e.toLowerCase(), null, !1, !1);
});
["checked", "multiple", "muted", "selected"].forEach(function(e) {
  ie[e] = new pe(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function(e) {
  ie[e] = new pe(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function(e) {
  ie[e] = new pe(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function(e) {
  ie[e] = new pe(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var ro = /[\-:]([a-z])/g;
function lo(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
  var t = e.replace(
    ro,
    lo
  );
  ie[t] = new pe(t, 1, !1, e, null, !1, !1);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
  var t = e.replace(ro, lo);
  ie[t] = new pe(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
});
["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
  var t = e.replace(ro, lo);
  ie[t] = new pe(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function(e) {
  ie[e] = new pe(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
ie.xlinkHref = new pe("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);
["src", "href", "action", "formAction"].forEach(function(e) {
  ie[e] = new pe(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function io(e, t, n, r) {
  var l = ie.hasOwnProperty(t) ? ie[t] : null;
  (l !== null ? l.type !== 0 : r || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (ed(t, n, l, r) && (n = null), r || l === null ? bc(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n)) : l.mustUseProperty ? e[l.propertyName] = n === null ? l.type === 3 ? !1 : "" : n : (t = l.attributeName, r = l.attributeNamespace, n === null ? e.removeAttribute(t) : (l = l.type, n = l === 3 || l === 4 && n === !0 ? "" : "" + n, r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
var tt = Zc.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, dr = Symbol.for("react.element"), Bt = Symbol.for("react.portal"), Wt = Symbol.for("react.fragment"), oo = Symbol.for("react.strict_mode"), ii = Symbol.for("react.profiler"), Sa = Symbol.for("react.provider"), Na = Symbol.for("react.context"), so = Symbol.for("react.forward_ref"), oi = Symbol.for("react.suspense"), si = Symbol.for("react.suspense_list"), ao = Symbol.for("react.memo"), lt = Symbol.for("react.lazy"), ja = Symbol.for("react.offscreen"), ts = Symbol.iterator;
function xn(e) {
  return e === null || typeof e != "object" ? null : (e = ts && e[ts] || e["@@iterator"], typeof e == "function" ? e : null);
}
var K = Object.assign, Tl;
function En(e) {
  if (Tl === void 0) try {
    throw Error();
  } catch (n) {
    var t = n.stack.trim().match(/\n( *(at )?)/);
    Tl = t && t[1] || "";
  }
  return `
` + Tl + e;
}
var Ll = !1;
function Rl(e, t) {
  if (!e || Ll) return "";
  Ll = !0;
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
      } catch (d) {
        var r = d;
      }
      Reflect.construct(e, [], t);
    } else {
      try {
        t.call();
      } catch (d) {
        r = d;
      }
      e.call(t.prototype);
    }
    else {
      try {
        throw Error();
      } catch (d) {
        r = d;
      }
      e();
    }
  } catch (d) {
    if (d && r && typeof d.stack == "string") {
      for (var l = d.stack.split(`
`), i = r.stack.split(`
`), o = l.length - 1, s = i.length - 1; 1 <= o && 0 <= s && l[o] !== i[s]; ) s--;
      for (; 1 <= o && 0 <= s; o--, s--) if (l[o] !== i[s]) {
        if (o !== 1 || s !== 1)
          do
            if (o--, s--, 0 > s || l[o] !== i[s]) {
              var a = `
` + l[o].replace(" at new ", " at ");
              return e.displayName && a.includes("<anonymous>") && (a = a.replace("<anonymous>", e.displayName)), a;
            }
          while (1 <= o && 0 <= s);
        break;
      }
    }
  } finally {
    Ll = !1, Error.prepareStackTrace = n;
  }
  return (e = e ? e.displayName || e.name : "") ? En(e) : "";
}
function td(e) {
  switch (e.tag) {
    case 5:
      return En(e.type);
    case 16:
      return En("Lazy");
    case 13:
      return En("Suspense");
    case 19:
      return En("SuspenseList");
    case 0:
    case 2:
    case 15:
      return e = Rl(e.type, !1), e;
    case 11:
      return e = Rl(e.type.render, !1), e;
    case 1:
      return e = Rl(e.type, !0), e;
    default:
      return "";
  }
}
function ai(e) {
  if (e == null) return null;
  if (typeof e == "function") return e.displayName || e.name || null;
  if (typeof e == "string") return e;
  switch (e) {
    case Wt:
      return "Fragment";
    case Bt:
      return "Portal";
    case ii:
      return "Profiler";
    case oo:
      return "StrictMode";
    case oi:
      return "Suspense";
    case si:
      return "SuspenseList";
  }
  if (typeof e == "object") switch (e.$$typeof) {
    case Na:
      return (e.displayName || "Context") + ".Consumer";
    case Sa:
      return (e._context.displayName || "Context") + ".Provider";
    case so:
      var t = e.render;
      return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
    case ao:
      return t = e.displayName || null, t !== null ? t : ai(e.type) || "Memo";
    case lt:
      t = e._payload, e = e._init;
      try {
        return ai(e(t));
      } catch {
      }
  }
  return null;
}
function nd(e) {
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
      return ai(t);
    case 8:
      return t === oo ? "StrictMode" : "Mode";
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
function yt(e) {
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
function _a(e) {
  var t = e.type;
  return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
}
function rd(e) {
  var t = _a(e) ? "checked" : "value", n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t), r = "" + e[t];
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
function fr(e) {
  e._valueTracker || (e._valueTracker = rd(e));
}
function Ca(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(), r = "";
  return e && (r = _a(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n ? (t.setValue(e), !0) : !1;
}
function Ar(e) {
  if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function ui(e, t) {
  var n = t.checked;
  return K({}, t, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: n ?? e._wrapperState.initialChecked });
}
function ns(e, t) {
  var n = t.defaultValue == null ? "" : t.defaultValue, r = t.checked != null ? t.checked : t.defaultChecked;
  n = yt(t.value != null ? t.value : n), e._wrapperState = { initialChecked: r, initialValue: n, controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null };
}
function Ea(e, t) {
  t = t.checked, t != null && io(e, "checked", t, !1);
}
function ci(e, t) {
  Ea(e, t);
  var n = yt(t.value), r = t.type;
  if (n != null) r === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + n) : e.value !== "" + n && (e.value = "" + n);
  else if (r === "submit" || r === "reset") {
    e.removeAttribute("value");
    return;
  }
  t.hasOwnProperty("value") ? di(e, t.type, n) : t.hasOwnProperty("defaultValue") && di(e, t.type, yt(t.defaultValue)), t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked);
}
function rs(e, t, n) {
  if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
    var r = t.type;
    if (!(r !== "submit" && r !== "reset" || t.value !== void 0 && t.value !== null)) return;
    t = "" + e._wrapperState.initialValue, n || t === e.value || (e.value = t), e.defaultValue = t;
  }
  n = e.name, n !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, n !== "" && (e.name = n);
}
function di(e, t, n) {
  (t !== "number" || Ar(e.ownerDocument) !== e) && (n == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
}
var zn = Array.isArray;
function qt(e, t, n, r) {
  if (e = e.options, t) {
    t = {};
    for (var l = 0; l < n.length; l++) t["$" + n[l]] = !0;
    for (n = 0; n < e.length; n++) l = t.hasOwnProperty("$" + e[n].value), e[n].selected !== l && (e[n].selected = l), l && r && (e[n].defaultSelected = !0);
  } else {
    for (n = "" + yt(n), t = null, l = 0; l < e.length; l++) {
      if (e[l].value === n) {
        e[l].selected = !0, r && (e[l].defaultSelected = !0);
        return;
      }
      t !== null || e[l].disabled || (t = e[l]);
    }
    t !== null && (t.selected = !0);
  }
}
function fi(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(N(91));
  return K({}, t, { value: void 0, defaultValue: void 0, children: "" + e._wrapperState.initialValue });
}
function ls(e, t) {
  var n = t.value;
  if (n == null) {
    if (n = t.children, t = t.defaultValue, n != null) {
      if (t != null) throw Error(N(92));
      if (zn(n)) {
        if (1 < n.length) throw Error(N(93));
        n = n[0];
      }
      t = n;
    }
    t == null && (t = ""), n = t;
  }
  e._wrapperState = { initialValue: yt(n) };
}
function za(e, t) {
  var n = yt(t.value), r = yt(t.defaultValue);
  n != null && (n = "" + n, n !== e.value && (e.value = n), t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)), r != null && (e.defaultValue = "" + r);
}
function is(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
}
function Pa(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function pi(e, t) {
  return e == null || e === "http://www.w3.org/1999/xhtml" ? Pa(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e;
}
var pr, Ta = function(e) {
  return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, n, r, l) {
    MSApp.execUnsafeLocalFunction(function() {
      return e(t, n, r, l);
    });
  } : e;
}(function(e, t) {
  if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e) e.innerHTML = t;
  else {
    for (pr = pr || document.createElement("div"), pr.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>", t = pr.firstChild; e.firstChild; ) e.removeChild(e.firstChild);
    for (; t.firstChild; ) e.appendChild(t.firstChild);
  }
});
function Bn(e, t) {
  if (t) {
    var n = e.firstChild;
    if (n && n === e.lastChild && n.nodeType === 3) {
      n.nodeValue = t;
      return;
    }
  }
  e.textContent = t;
}
var Ln = {
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
}, ld = ["Webkit", "ms", "Moz", "O"];
Object.keys(Ln).forEach(function(e) {
  ld.forEach(function(t) {
    t = t + e.charAt(0).toUpperCase() + e.substring(1), Ln[t] = Ln[e];
  });
});
function La(e, t, n) {
  return t == null || typeof t == "boolean" || t === "" ? "" : n || typeof t != "number" || t === 0 || Ln.hasOwnProperty(e) && Ln[e] ? ("" + t).trim() : t + "px";
}
function Ra(e, t) {
  e = e.style;
  for (var n in t) if (t.hasOwnProperty(n)) {
    var r = n.indexOf("--") === 0, l = La(n, t[n], r);
    n === "float" && (n = "cssFloat"), r ? e.setProperty(n, l) : e[n] = l;
  }
}
var id = K({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
function hi(e, t) {
  if (t) {
    if (id[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(N(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(N(60));
      if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML)) throw Error(N(61));
    }
    if (t.style != null && typeof t.style != "object") throw Error(N(62));
  }
}
function mi(e, t) {
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
var gi = null;
function uo(e) {
  return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
}
var vi = null, en = null, tn = null;
function os(e) {
  if (e = or(e)) {
    if (typeof vi != "function") throw Error(N(280));
    var t = e.stateNode;
    t && (t = hl(t), vi(e.stateNode, e.type, t));
  }
}
function Ma(e) {
  en ? tn ? tn.push(e) : tn = [e] : en = e;
}
function $a() {
  if (en) {
    var e = en, t = tn;
    if (tn = en = null, os(e), t) for (e = 0; e < t.length; e++) os(t[e]);
  }
}
function Oa(e, t) {
  return e(t);
}
function Da() {
}
var Ml = !1;
function Fa(e, t, n) {
  if (Ml) return e(t, n);
  Ml = !0;
  try {
    return Oa(e, t, n);
  } finally {
    Ml = !1, (en !== null || tn !== null) && (Da(), $a());
  }
}
function Wn(e, t) {
  var n = e.stateNode;
  if (n === null) return null;
  var r = hl(n);
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
  if (n && typeof n != "function") throw Error(N(231, t, typeof n));
  return n;
}
var yi = !1;
if (Je) try {
  var wn = {};
  Object.defineProperty(wn, "passive", { get: function() {
    yi = !0;
  } }), window.addEventListener("test", wn, wn), window.removeEventListener("test", wn, wn);
} catch {
  yi = !1;
}
function od(e, t, n, r, l, i, o, s, a) {
  var d = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, d);
  } catch (m) {
    this.onError(m);
  }
}
var Rn = !1, Ur = null, Br = !1, xi = null, sd = { onError: function(e) {
  Rn = !0, Ur = e;
} };
function ad(e, t, n, r, l, i, o, s, a) {
  Rn = !1, Ur = null, od.apply(sd, arguments);
}
function ud(e, t, n, r, l, i, o, s, a) {
  if (ad.apply(this, arguments), Rn) {
    if (Rn) {
      var d = Ur;
      Rn = !1, Ur = null;
    } else throw Error(N(198));
    Br || (Br = !0, xi = d);
  }
}
function At(e) {
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
function Ia(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
  }
  return null;
}
function ss(e) {
  if (At(e) !== e) throw Error(N(188));
}
function cd(e) {
  var t = e.alternate;
  if (!t) {
    if (t = At(e), t === null) throw Error(N(188));
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
        if (i === n) return ss(l), e;
        if (i === r) return ss(l), t;
        i = i.sibling;
      }
      throw Error(N(188));
    }
    if (n.return !== r.return) n = l, r = i;
    else {
      for (var o = !1, s = l.child; s; ) {
        if (s === n) {
          o = !0, n = l, r = i;
          break;
        }
        if (s === r) {
          o = !0, r = l, n = i;
          break;
        }
        s = s.sibling;
      }
      if (!o) {
        for (s = i.child; s; ) {
          if (s === n) {
            o = !0, n = i, r = l;
            break;
          }
          if (s === r) {
            o = !0, r = i, n = l;
            break;
          }
          s = s.sibling;
        }
        if (!o) throw Error(N(189));
      }
    }
    if (n.alternate !== r) throw Error(N(190));
  }
  if (n.tag !== 3) throw Error(N(188));
  return n.stateNode.current === n ? e : t;
}
function Aa(e) {
  return e = cd(e), e !== null ? Ua(e) : null;
}
function Ua(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var t = Ua(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var Ba = Ne.unstable_scheduleCallback, as = Ne.unstable_cancelCallback, dd = Ne.unstable_shouldYield, fd = Ne.unstable_requestPaint, X = Ne.unstable_now, pd = Ne.unstable_getCurrentPriorityLevel, co = Ne.unstable_ImmediatePriority, Wa = Ne.unstable_UserBlockingPriority, Wr = Ne.unstable_NormalPriority, hd = Ne.unstable_LowPriority, Va = Ne.unstable_IdlePriority, cl = null, He = null;
function md(e) {
  if (He && typeof He.onCommitFiberRoot == "function") try {
    He.onCommitFiberRoot(cl, e, void 0, (e.current.flags & 128) === 128);
  } catch {
  }
}
var Fe = Math.clz32 ? Math.clz32 : yd, gd = Math.log, vd = Math.LN2;
function yd(e) {
  return e >>>= 0, e === 0 ? 32 : 31 - (gd(e) / vd | 0) | 0;
}
var hr = 64, mr = 4194304;
function Pn(e) {
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
function Vr(e, t) {
  var n = e.pendingLanes;
  if (n === 0) return 0;
  var r = 0, l = e.suspendedLanes, i = e.pingedLanes, o = n & 268435455;
  if (o !== 0) {
    var s = o & ~l;
    s !== 0 ? r = Pn(s) : (i &= o, i !== 0 && (r = Pn(i)));
  } else o = n & ~l, o !== 0 ? r = Pn(o) : i !== 0 && (r = Pn(i));
  if (r === 0) return 0;
  if (t !== 0 && t !== r && !(t & l) && (l = r & -r, i = t & -t, l >= i || l === 16 && (i & 4194240) !== 0)) return t;
  if (r & 4 && (r |= n & 16), t = e.entangledLanes, t !== 0) for (e = e.entanglements, t &= r; 0 < t; ) n = 31 - Fe(t), l = 1 << n, r |= e[n], t &= ~l;
  return r;
}
function xd(e, t) {
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
function wd(e, t) {
  for (var n = e.suspendedLanes, r = e.pingedLanes, l = e.expirationTimes, i = e.pendingLanes; 0 < i; ) {
    var o = 31 - Fe(i), s = 1 << o, a = l[o];
    a === -1 ? (!(s & n) || s & r) && (l[o] = xd(s, t)) : a <= t && (e.expiredLanes |= s), i &= ~s;
  }
}
function wi(e) {
  return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
}
function Ha() {
  var e = hr;
  return hr <<= 1, !(hr & 4194240) && (hr = 64), e;
}
function $l(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t;
}
function lr(e, t, n) {
  e.pendingLanes |= t, t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, t = 31 - Fe(t), e[t] = n;
}
function kd(e, t) {
  var n = e.pendingLanes & ~t;
  e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
  var r = e.eventTimes;
  for (e = e.expirationTimes; 0 < n; ) {
    var l = 31 - Fe(n), i = 1 << l;
    t[l] = 0, r[l] = -1, e[l] = -1, n &= ~i;
  }
}
function fo(e, t) {
  var n = e.entangledLanes |= t;
  for (e = e.entanglements; n; ) {
    var r = 31 - Fe(n), l = 1 << r;
    l & t | e[r] & t && (e[r] |= t), n &= ~l;
  }
}
var O = 0;
function Qa(e) {
  return e &= -e, 1 < e ? 4 < e ? e & 268435455 ? 16 : 536870912 : 4 : 1;
}
var Ka, po, Ga, Ya, Xa, ki = !1, gr = [], ct = null, dt = null, ft = null, Vn = /* @__PURE__ */ new Map(), Hn = /* @__PURE__ */ new Map(), ot = [], Sd = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function us(e, t) {
  switch (e) {
    case "focusin":
    case "focusout":
      ct = null;
      break;
    case "dragenter":
    case "dragleave":
      dt = null;
      break;
    case "mouseover":
    case "mouseout":
      ft = null;
      break;
    case "pointerover":
    case "pointerout":
      Vn.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      Hn.delete(t.pointerId);
  }
}
function kn(e, t, n, r, l, i) {
  return e === null || e.nativeEvent !== i ? (e = { blockedOn: t, domEventName: n, eventSystemFlags: r, nativeEvent: i, targetContainers: [l] }, t !== null && (t = or(t), t !== null && po(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, l !== null && t.indexOf(l) === -1 && t.push(l), e);
}
function Nd(e, t, n, r, l) {
  switch (t) {
    case "focusin":
      return ct = kn(ct, e, t, n, r, l), !0;
    case "dragenter":
      return dt = kn(dt, e, t, n, r, l), !0;
    case "mouseover":
      return ft = kn(ft, e, t, n, r, l), !0;
    case "pointerover":
      var i = l.pointerId;
      return Vn.set(i, kn(Vn.get(i) || null, e, t, n, r, l)), !0;
    case "gotpointercapture":
      return i = l.pointerId, Hn.set(i, kn(Hn.get(i) || null, e, t, n, r, l)), !0;
  }
  return !1;
}
function Za(e) {
  var t = Et(e.target);
  if (t !== null) {
    var n = At(t);
    if (n !== null) {
      if (t = n.tag, t === 13) {
        if (t = Ia(n), t !== null) {
          e.blockedOn = t, Xa(e.priority, function() {
            Ga(n);
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
function Pr(e) {
  if (e.blockedOn !== null) return !1;
  for (var t = e.targetContainers; 0 < t.length; ) {
    var n = Si(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var r = new n.constructor(n.type, n);
      gi = r, n.target.dispatchEvent(r), gi = null;
    } else return t = or(n), t !== null && po(t), e.blockedOn = n, !1;
    t.shift();
  }
  return !0;
}
function cs(e, t, n) {
  Pr(e) && n.delete(t);
}
function jd() {
  ki = !1, ct !== null && Pr(ct) && (ct = null), dt !== null && Pr(dt) && (dt = null), ft !== null && Pr(ft) && (ft = null), Vn.forEach(cs), Hn.forEach(cs);
}
function Sn(e, t) {
  e.blockedOn === t && (e.blockedOn = null, ki || (ki = !0, Ne.unstable_scheduleCallback(Ne.unstable_NormalPriority, jd)));
}
function Qn(e) {
  function t(l) {
    return Sn(l, e);
  }
  if (0 < gr.length) {
    Sn(gr[0], e);
    for (var n = 1; n < gr.length; n++) {
      var r = gr[n];
      r.blockedOn === e && (r.blockedOn = null);
    }
  }
  for (ct !== null && Sn(ct, e), dt !== null && Sn(dt, e), ft !== null && Sn(ft, e), Vn.forEach(t), Hn.forEach(t), n = 0; n < ot.length; n++) r = ot[n], r.blockedOn === e && (r.blockedOn = null);
  for (; 0 < ot.length && (n = ot[0], n.blockedOn === null); ) Za(n), n.blockedOn === null && ot.shift();
}
var nn = tt.ReactCurrentBatchConfig, Hr = !0;
function _d(e, t, n, r) {
  var l = O, i = nn.transition;
  nn.transition = null;
  try {
    O = 1, ho(e, t, n, r);
  } finally {
    O = l, nn.transition = i;
  }
}
function Cd(e, t, n, r) {
  var l = O, i = nn.transition;
  nn.transition = null;
  try {
    O = 4, ho(e, t, n, r);
  } finally {
    O = l, nn.transition = i;
  }
}
function ho(e, t, n, r) {
  if (Hr) {
    var l = Si(e, t, n, r);
    if (l === null) Hl(e, t, r, Qr, n), us(e, r);
    else if (Nd(l, e, t, n, r)) r.stopPropagation();
    else if (us(e, r), t & 4 && -1 < Sd.indexOf(e)) {
      for (; l !== null; ) {
        var i = or(l);
        if (i !== null && Ka(i), i = Si(e, t, n, r), i === null && Hl(e, t, r, Qr, n), i === l) break;
        l = i;
      }
      l !== null && r.stopPropagation();
    } else Hl(e, t, r, null, n);
  }
}
var Qr = null;
function Si(e, t, n, r) {
  if (Qr = null, e = uo(r), e = Et(e), e !== null) if (t = At(e), t === null) e = null;
  else if (n = t.tag, n === 13) {
    if (e = Ia(t), e !== null) return e;
    e = null;
  } else if (n === 3) {
    if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
    e = null;
  } else t !== e && (e = null);
  return Qr = e, null;
}
function Ja(e) {
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
      switch (pd()) {
        case co:
          return 1;
        case Wa:
          return 4;
        case Wr:
        case hd:
          return 16;
        case Va:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var at = null, mo = null, Tr = null;
function ba() {
  if (Tr) return Tr;
  var e, t = mo, n = t.length, r, l = "value" in at ? at.value : at.textContent, i = l.length;
  for (e = 0; e < n && t[e] === l[e]; e++) ;
  var o = n - e;
  for (r = 1; r <= o && t[n - r] === l[i - r]; r++) ;
  return Tr = l.slice(e, 1 < r ? 1 - r : void 0);
}
function Lr(e) {
  var t = e.keyCode;
  return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
}
function vr() {
  return !0;
}
function ds() {
  return !1;
}
function _e(e) {
  function t(n, r, l, i, o) {
    this._reactName = n, this._targetInst = l, this.type = r, this.nativeEvent = i, this.target = o, this.currentTarget = null;
    for (var s in e) e.hasOwnProperty(s) && (n = e[s], this[s] = n ? n(i) : i[s]);
    return this.isDefaultPrevented = (i.defaultPrevented != null ? i.defaultPrevented : i.returnValue === !1) ? vr : ds, this.isPropagationStopped = ds, this;
  }
  return K(t.prototype, { preventDefault: function() {
    this.defaultPrevented = !0;
    var n = this.nativeEvent;
    n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = vr);
  }, stopPropagation: function() {
    var n = this.nativeEvent;
    n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = vr);
  }, persist: function() {
  }, isPersistent: vr }), t;
}
var mn = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(e) {
  return e.timeStamp || Date.now();
}, defaultPrevented: 0, isTrusted: 0 }, go = _e(mn), ir = K({}, mn, { view: 0, detail: 0 }), Ed = _e(ir), Ol, Dl, Nn, dl = K({}, ir, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: vo, button: 0, buttons: 0, relatedTarget: function(e) {
  return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
}, movementX: function(e) {
  return "movementX" in e ? e.movementX : (e !== Nn && (Nn && e.type === "mousemove" ? (Ol = e.screenX - Nn.screenX, Dl = e.screenY - Nn.screenY) : Dl = Ol = 0, Nn = e), Ol);
}, movementY: function(e) {
  return "movementY" in e ? e.movementY : Dl;
} }), fs = _e(dl), zd = K({}, dl, { dataTransfer: 0 }), Pd = _e(zd), Td = K({}, ir, { relatedTarget: 0 }), Fl = _e(Td), Ld = K({}, mn, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Rd = _e(Ld), Md = K({}, mn, { clipboardData: function(e) {
  return "clipboardData" in e ? e.clipboardData : window.clipboardData;
} }), $d = _e(Md), Od = K({}, mn, { data: 0 }), ps = _e(Od), Dd = {
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
}, Fd = {
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
}, Id = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function Ad(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = Id[e]) ? !!t[e] : !1;
}
function vo() {
  return Ad;
}
var Ud = K({}, ir, { key: function(e) {
  if (e.key) {
    var t = Dd[e.key] || e.key;
    if (t !== "Unidentified") return t;
  }
  return e.type === "keypress" ? (e = Lr(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Fd[e.keyCode] || "Unidentified" : "";
}, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: vo, charCode: function(e) {
  return e.type === "keypress" ? Lr(e) : 0;
}, keyCode: function(e) {
  return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
}, which: function(e) {
  return e.type === "keypress" ? Lr(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
} }), Bd = _e(Ud), Wd = K({}, dl, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), hs = _e(Wd), Vd = K({}, ir, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: vo }), Hd = _e(Vd), Qd = K({}, mn, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), Kd = _e(Qd), Gd = K({}, dl, {
  deltaX: function(e) {
    return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
  },
  deltaY: function(e) {
    return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), Yd = _e(Gd), Xd = [9, 13, 27, 32], yo = Je && "CompositionEvent" in window, Mn = null;
Je && "documentMode" in document && (Mn = document.documentMode);
var Zd = Je && "TextEvent" in window && !Mn, qa = Je && (!yo || Mn && 8 < Mn && 11 >= Mn), ms = " ", gs = !1;
function eu(e, t) {
  switch (e) {
    case "keyup":
      return Xd.indexOf(t.keyCode) !== -1;
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
function tu(e) {
  return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
}
var Vt = !1;
function Jd(e, t) {
  switch (e) {
    case "compositionend":
      return tu(t);
    case "keypress":
      return t.which !== 32 ? null : (gs = !0, ms);
    case "textInput":
      return e = t.data, e === ms && gs ? null : e;
    default:
      return null;
  }
}
function bd(e, t) {
  if (Vt) return e === "compositionend" || !yo && eu(e, t) ? (e = ba(), Tr = mo = at = null, Vt = !1, e) : null;
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
      return qa && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var qd = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
function vs(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!qd[e.type] : t === "textarea";
}
function nu(e, t, n, r) {
  Ma(r), t = Kr(t, "onChange"), 0 < t.length && (n = new go("onChange", "change", null, n, r), e.push({ event: n, listeners: t }));
}
var $n = null, Kn = null;
function ef(e) {
  pu(e, 0);
}
function fl(e) {
  var t = Kt(e);
  if (Ca(t)) return e;
}
function tf(e, t) {
  if (e === "change") return t;
}
var ru = !1;
if (Je) {
  var Il;
  if (Je) {
    var Al = "oninput" in document;
    if (!Al) {
      var ys = document.createElement("div");
      ys.setAttribute("oninput", "return;"), Al = typeof ys.oninput == "function";
    }
    Il = Al;
  } else Il = !1;
  ru = Il && (!document.documentMode || 9 < document.documentMode);
}
function xs() {
  $n && ($n.detachEvent("onpropertychange", lu), Kn = $n = null);
}
function lu(e) {
  if (e.propertyName === "value" && fl(Kn)) {
    var t = [];
    nu(t, Kn, e, uo(e)), Fa(ef, t);
  }
}
function nf(e, t, n) {
  e === "focusin" ? (xs(), $n = t, Kn = n, $n.attachEvent("onpropertychange", lu)) : e === "focusout" && xs();
}
function rf(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown") return fl(Kn);
}
function lf(e, t) {
  if (e === "click") return fl(t);
}
function of(e, t) {
  if (e === "input" || e === "change") return fl(t);
}
function sf(e, t) {
  return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
}
var Ae = typeof Object.is == "function" ? Object.is : sf;
function Gn(e, t) {
  if (Ae(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null) return !1;
  var n = Object.keys(e), r = Object.keys(t);
  if (n.length !== r.length) return !1;
  for (r = 0; r < n.length; r++) {
    var l = n[r];
    if (!li.call(t, l) || !Ae(e[l], t[l])) return !1;
  }
  return !0;
}
function ws(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function ks(e, t) {
  var n = ws(e);
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
    n = ws(n);
  }
}
function iu(e, t) {
  return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? iu(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
}
function ou() {
  for (var e = window, t = Ar(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var n = typeof t.contentWindow.location.href == "string";
    } catch {
      n = !1;
    }
    if (n) e = t.contentWindow;
    else break;
    t = Ar(e.document);
  }
  return t;
}
function xo(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
}
function af(e) {
  var t = ou(), n = e.focusedElem, r = e.selectionRange;
  if (t !== n && n && n.ownerDocument && iu(n.ownerDocument.documentElement, n)) {
    if (r !== null && xo(n)) {
      if (t = r.start, e = r.end, e === void 0 && (e = t), "selectionStart" in n) n.selectionStart = t, n.selectionEnd = Math.min(e, n.value.length);
      else if (e = (t = n.ownerDocument || document) && t.defaultView || window, e.getSelection) {
        e = e.getSelection();
        var l = n.textContent.length, i = Math.min(r.start, l);
        r = r.end === void 0 ? i : Math.min(r.end, l), !e.extend && i > r && (l = r, r = i, i = l), l = ks(n, i);
        var o = ks(
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
var uf = Je && "documentMode" in document && 11 >= document.documentMode, Ht = null, Ni = null, On = null, ji = !1;
function Ss(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  ji || Ht == null || Ht !== Ar(r) || (r = Ht, "selectionStart" in r && xo(r) ? r = { start: r.selectionStart, end: r.selectionEnd } : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = { anchorNode: r.anchorNode, anchorOffset: r.anchorOffset, focusNode: r.focusNode, focusOffset: r.focusOffset }), On && Gn(On, r) || (On = r, r = Kr(Ni, "onSelect"), 0 < r.length && (t = new go("onSelect", "select", null, t, n), e.push({ event: t, listeners: r }), t.target = Ht)));
}
function yr(e, t) {
  var n = {};
  return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
}
var Qt = { animationend: yr("Animation", "AnimationEnd"), animationiteration: yr("Animation", "AnimationIteration"), animationstart: yr("Animation", "AnimationStart"), transitionend: yr("Transition", "TransitionEnd") }, Ul = {}, su = {};
Je && (su = document.createElement("div").style, "AnimationEvent" in window || (delete Qt.animationend.animation, delete Qt.animationiteration.animation, delete Qt.animationstart.animation), "TransitionEvent" in window || delete Qt.transitionend.transition);
function pl(e) {
  if (Ul[e]) return Ul[e];
  if (!Qt[e]) return e;
  var t = Qt[e], n;
  for (n in t) if (t.hasOwnProperty(n) && n in su) return Ul[e] = t[n];
  return e;
}
var au = pl("animationend"), uu = pl("animationiteration"), cu = pl("animationstart"), du = pl("transitionend"), fu = /* @__PURE__ */ new Map(), Ns = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function wt(e, t) {
  fu.set(e, t), It(t, [e]);
}
for (var Bl = 0; Bl < Ns.length; Bl++) {
  var Wl = Ns[Bl], cf = Wl.toLowerCase(), df = Wl[0].toUpperCase() + Wl.slice(1);
  wt(cf, "on" + df);
}
wt(au, "onAnimationEnd");
wt(uu, "onAnimationIteration");
wt(cu, "onAnimationStart");
wt("dblclick", "onDoubleClick");
wt("focusin", "onFocus");
wt("focusout", "onBlur");
wt(du, "onTransitionEnd");
on("onMouseEnter", ["mouseout", "mouseover"]);
on("onMouseLeave", ["mouseout", "mouseover"]);
on("onPointerEnter", ["pointerout", "pointerover"]);
on("onPointerLeave", ["pointerout", "pointerover"]);
It("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
It("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
It("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
It("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
It("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
It("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var Tn = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), ff = new Set("cancel close invalid load scroll toggle".split(" ").concat(Tn));
function js(e, t, n) {
  var r = e.type || "unknown-event";
  e.currentTarget = n, ud(r, t, void 0, e), e.currentTarget = null;
}
function pu(e, t) {
  t = (t & 4) !== 0;
  for (var n = 0; n < e.length; n++) {
    var r = e[n], l = r.event;
    r = r.listeners;
    e: {
      var i = void 0;
      if (t) for (var o = r.length - 1; 0 <= o; o--) {
        var s = r[o], a = s.instance, d = s.currentTarget;
        if (s = s.listener, a !== i && l.isPropagationStopped()) break e;
        js(l, s, d), i = a;
      }
      else for (o = 0; o < r.length; o++) {
        if (s = r[o], a = s.instance, d = s.currentTarget, s = s.listener, a !== i && l.isPropagationStopped()) break e;
        js(l, s, d), i = a;
      }
    }
  }
  if (Br) throw e = xi, Br = !1, xi = null, e;
}
function A(e, t) {
  var n = t[Pi];
  n === void 0 && (n = t[Pi] = /* @__PURE__ */ new Set());
  var r = e + "__bubble";
  n.has(r) || (hu(t, e, 2, !1), n.add(r));
}
function Vl(e, t, n) {
  var r = 0;
  t && (r |= 4), hu(n, e, r, t);
}
var xr = "_reactListening" + Math.random().toString(36).slice(2);
function Yn(e) {
  if (!e[xr]) {
    e[xr] = !0, ka.forEach(function(n) {
      n !== "selectionchange" && (ff.has(n) || Vl(n, !1, e), Vl(n, !0, e));
    });
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[xr] || (t[xr] = !0, Vl("selectionchange", !1, t));
  }
}
function hu(e, t, n, r) {
  switch (Ja(t)) {
    case 1:
      var l = _d;
      break;
    case 4:
      l = Cd;
      break;
    default:
      l = ho;
  }
  n = l.bind(null, t, n, e), l = void 0, !yi || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (l = !0), r ? l !== void 0 ? e.addEventListener(t, n, { capture: !0, passive: l }) : e.addEventListener(t, n, !0) : l !== void 0 ? e.addEventListener(t, n, { passive: l }) : e.addEventListener(t, n, !1);
}
function Hl(e, t, n, r, l) {
  var i = r;
  if (!(t & 1) && !(t & 2) && r !== null) e: for (; ; ) {
    if (r === null) return;
    var o = r.tag;
    if (o === 3 || o === 4) {
      var s = r.stateNode.containerInfo;
      if (s === l || s.nodeType === 8 && s.parentNode === l) break;
      if (o === 4) for (o = r.return; o !== null; ) {
        var a = o.tag;
        if ((a === 3 || a === 4) && (a = o.stateNode.containerInfo, a === l || a.nodeType === 8 && a.parentNode === l)) return;
        o = o.return;
      }
      for (; s !== null; ) {
        if (o = Et(s), o === null) return;
        if (a = o.tag, a === 5 || a === 6) {
          r = i = o;
          continue e;
        }
        s = s.parentNode;
      }
    }
    r = r.return;
  }
  Fa(function() {
    var d = i, m = uo(n), h = [];
    e: {
      var g = fu.get(e);
      if (g !== void 0) {
        var y = go, k = e;
        switch (e) {
          case "keypress":
            if (Lr(n) === 0) break e;
          case "keydown":
          case "keyup":
            y = Bd;
            break;
          case "focusin":
            k = "focus", y = Fl;
            break;
          case "focusout":
            k = "blur", y = Fl;
            break;
          case "beforeblur":
          case "afterblur":
            y = Fl;
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
            y = fs;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            y = Pd;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            y = Hd;
            break;
          case au:
          case uu:
          case cu:
            y = Rd;
            break;
          case du:
            y = Kd;
            break;
          case "scroll":
            y = Ed;
            break;
          case "wheel":
            y = Yd;
            break;
          case "copy":
          case "cut":
          case "paste":
            y = $d;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            y = hs;
        }
        var S = (t & 4) !== 0, z = !S && e === "scroll", f = S ? g !== null ? g + "Capture" : null : g;
        S = [];
        for (var c = d, p; c !== null; ) {
          p = c;
          var x = p.stateNode;
          if (p.tag === 5 && x !== null && (p = x, f !== null && (x = Wn(c, f), x != null && S.push(Xn(c, x, p)))), z) break;
          c = c.return;
        }
        0 < S.length && (g = new y(g, k, null, n, m), h.push({ event: g, listeners: S }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (g = e === "mouseover" || e === "pointerover", y = e === "mouseout" || e === "pointerout", g && n !== gi && (k = n.relatedTarget || n.fromElement) && (Et(k) || k[be])) break e;
        if ((y || g) && (g = m.window === m ? m : (g = m.ownerDocument) ? g.defaultView || g.parentWindow : window, y ? (k = n.relatedTarget || n.toElement, y = d, k = k ? Et(k) : null, k !== null && (z = At(k), k !== z || k.tag !== 5 && k.tag !== 6) && (k = null)) : (y = null, k = d), y !== k)) {
          if (S = fs, x = "onMouseLeave", f = "onMouseEnter", c = "mouse", (e === "pointerout" || e === "pointerover") && (S = hs, x = "onPointerLeave", f = "onPointerEnter", c = "pointer"), z = y == null ? g : Kt(y), p = k == null ? g : Kt(k), g = new S(x, c + "leave", y, n, m), g.target = z, g.relatedTarget = p, x = null, Et(m) === d && (S = new S(f, c + "enter", k, n, m), S.target = p, S.relatedTarget = z, x = S), z = x, y && k) t: {
            for (S = y, f = k, c = 0, p = S; p; p = Ut(p)) c++;
            for (p = 0, x = f; x; x = Ut(x)) p++;
            for (; 0 < c - p; ) S = Ut(S), c--;
            for (; 0 < p - c; ) f = Ut(f), p--;
            for (; c--; ) {
              if (S === f || f !== null && S === f.alternate) break t;
              S = Ut(S), f = Ut(f);
            }
            S = null;
          }
          else S = null;
          y !== null && _s(h, g, y, S, !1), k !== null && z !== null && _s(h, z, k, S, !0);
        }
      }
      e: {
        if (g = d ? Kt(d) : window, y = g.nodeName && g.nodeName.toLowerCase(), y === "select" || y === "input" && g.type === "file") var j = tf;
        else if (vs(g)) if (ru) j = of;
        else {
          j = rf;
          var v = nf;
        }
        else (y = g.nodeName) && y.toLowerCase() === "input" && (g.type === "checkbox" || g.type === "radio") && (j = lf);
        if (j && (j = j(e, d))) {
          nu(h, j, n, m);
          break e;
        }
        v && v(e, g, d), e === "focusout" && (v = g._wrapperState) && v.controlled && g.type === "number" && di(g, "number", g.value);
      }
      switch (v = d ? Kt(d) : window, e) {
        case "focusin":
          (vs(v) || v.contentEditable === "true") && (Ht = v, Ni = d, On = null);
          break;
        case "focusout":
          On = Ni = Ht = null;
          break;
        case "mousedown":
          ji = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          ji = !1, Ss(h, n, m);
          break;
        case "selectionchange":
          if (uf) break;
        case "keydown":
        case "keyup":
          Ss(h, n, m);
      }
      var w;
      if (yo) e: {
        switch (e) {
          case "compositionstart":
            var _ = "onCompositionStart";
            break e;
          case "compositionend":
            _ = "onCompositionEnd";
            break e;
          case "compositionupdate":
            _ = "onCompositionUpdate";
            break e;
        }
        _ = void 0;
      }
      else Vt ? eu(e, n) && (_ = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (_ = "onCompositionStart");
      _ && (qa && n.locale !== "ko" && (Vt || _ !== "onCompositionStart" ? _ === "onCompositionEnd" && Vt && (w = ba()) : (at = m, mo = "value" in at ? at.value : at.textContent, Vt = !0)), v = Kr(d, _), 0 < v.length && (_ = new ps(_, e, null, n, m), h.push({ event: _, listeners: v }), w ? _.data = w : (w = tu(n), w !== null && (_.data = w)))), (w = Zd ? Jd(e, n) : bd(e, n)) && (d = Kr(d, "onBeforeInput"), 0 < d.length && (m = new ps("onBeforeInput", "beforeinput", null, n, m), h.push({ event: m, listeners: d }), m.data = w));
    }
    pu(h, t);
  });
}
function Xn(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function Kr(e, t) {
  for (var n = t + "Capture", r = []; e !== null; ) {
    var l = e, i = l.stateNode;
    l.tag === 5 && i !== null && (l = i, i = Wn(e, n), i != null && r.unshift(Xn(e, i, l)), i = Wn(e, t), i != null && r.push(Xn(e, i, l))), e = e.return;
  }
  return r;
}
function Ut(e) {
  if (e === null) return null;
  do
    e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function _s(e, t, n, r, l) {
  for (var i = t._reactName, o = []; n !== null && n !== r; ) {
    var s = n, a = s.alternate, d = s.stateNode;
    if (a !== null && a === r) break;
    s.tag === 5 && d !== null && (s = d, l ? (a = Wn(n, i), a != null && o.unshift(Xn(n, a, s))) : l || (a = Wn(n, i), a != null && o.push(Xn(n, a, s)))), n = n.return;
  }
  o.length !== 0 && e.push({ event: t, listeners: o });
}
var pf = /\r\n?/g, hf = /\u0000|\uFFFD/g;
function Cs(e) {
  return (typeof e == "string" ? e : "" + e).replace(pf, `
`).replace(hf, "");
}
function wr(e, t, n) {
  if (t = Cs(t), Cs(e) !== t && n) throw Error(N(425));
}
function Gr() {
}
var _i = null, Ci = null;
function Ei(e, t) {
  return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
}
var zi = typeof setTimeout == "function" ? setTimeout : void 0, mf = typeof clearTimeout == "function" ? clearTimeout : void 0, Es = typeof Promise == "function" ? Promise : void 0, gf = typeof queueMicrotask == "function" ? queueMicrotask : typeof Es < "u" ? function(e) {
  return Es.resolve(null).then(e).catch(vf);
} : zi;
function vf(e) {
  setTimeout(function() {
    throw e;
  });
}
function Ql(e, t) {
  var n = t, r = 0;
  do {
    var l = n.nextSibling;
    if (e.removeChild(n), l && l.nodeType === 8) if (n = l.data, n === "/$") {
      if (r === 0) {
        e.removeChild(l), Qn(t);
        return;
      }
      r--;
    } else n !== "$" && n !== "$?" && n !== "$!" || r++;
    n = l;
  } while (n);
  Qn(t);
}
function pt(e) {
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
function zs(e) {
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
var gn = Math.random().toString(36).slice(2), Ve = "__reactFiber$" + gn, Zn = "__reactProps$" + gn, be = "__reactContainer$" + gn, Pi = "__reactEvents$" + gn, yf = "__reactListeners$" + gn, xf = "__reactHandles$" + gn;
function Et(e) {
  var t = e[Ve];
  if (t) return t;
  for (var n = e.parentNode; n; ) {
    if (t = n[be] || n[Ve]) {
      if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = zs(e); e !== null; ) {
        if (n = e[Ve]) return n;
        e = zs(e);
      }
      return t;
    }
    e = n, n = e.parentNode;
  }
  return null;
}
function or(e) {
  return e = e[Ve] || e[be], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e;
}
function Kt(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(N(33));
}
function hl(e) {
  return e[Zn] || null;
}
var Ti = [], Gt = -1;
function kt(e) {
  return { current: e };
}
function U(e) {
  0 > Gt || (e.current = Ti[Gt], Ti[Gt] = null, Gt--);
}
function I(e, t) {
  Gt++, Ti[Gt] = e.current, e.current = t;
}
var xt = {}, ue = kt(xt), ge = kt(!1), Mt = xt;
function sn(e, t) {
  var n = e.type.contextTypes;
  if (!n) return xt;
  var r = e.stateNode;
  if (r && r.__reactInternalMemoizedUnmaskedChildContext === t) return r.__reactInternalMemoizedMaskedChildContext;
  var l = {}, i;
  for (i in n) l[i] = t[i];
  return r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = t, e.__reactInternalMemoizedMaskedChildContext = l), l;
}
function ve(e) {
  return e = e.childContextTypes, e != null;
}
function Yr() {
  U(ge), U(ue);
}
function Ps(e, t, n) {
  if (ue.current !== xt) throw Error(N(168));
  I(ue, t), I(ge, n);
}
function mu(e, t, n) {
  var r = e.stateNode;
  if (t = t.childContextTypes, typeof r.getChildContext != "function") return n;
  r = r.getChildContext();
  for (var l in r) if (!(l in t)) throw Error(N(108, nd(e) || "Unknown", l));
  return K({}, n, r);
}
function Xr(e) {
  return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || xt, Mt = ue.current, I(ue, e), I(ge, ge.current), !0;
}
function Ts(e, t, n) {
  var r = e.stateNode;
  if (!r) throw Error(N(169));
  n ? (e = mu(e, t, Mt), r.__reactInternalMemoizedMergedChildContext = e, U(ge), U(ue), I(ue, e)) : U(ge), I(ge, n);
}
var Ge = null, ml = !1, Kl = !1;
function gu(e) {
  Ge === null ? Ge = [e] : Ge.push(e);
}
function wf(e) {
  ml = !0, gu(e);
}
function St() {
  if (!Kl && Ge !== null) {
    Kl = !0;
    var e = 0, t = O;
    try {
      var n = Ge;
      for (O = 1; e < n.length; e++) {
        var r = n[e];
        do
          r = r(!0);
        while (r !== null);
      }
      Ge = null, ml = !1;
    } catch (l) {
      throw Ge !== null && (Ge = Ge.slice(e + 1)), Ba(co, St), l;
    } finally {
      O = t, Kl = !1;
    }
  }
  return null;
}
var Yt = [], Xt = 0, Zr = null, Jr = 0, Ce = [], Ee = 0, $t = null, Ye = 1, Xe = "";
function _t(e, t) {
  Yt[Xt++] = Jr, Yt[Xt++] = Zr, Zr = e, Jr = t;
}
function vu(e, t, n) {
  Ce[Ee++] = Ye, Ce[Ee++] = Xe, Ce[Ee++] = $t, $t = e;
  var r = Ye;
  e = Xe;
  var l = 32 - Fe(r) - 1;
  r &= ~(1 << l), n += 1;
  var i = 32 - Fe(t) + l;
  if (30 < i) {
    var o = l - l % 5;
    i = (r & (1 << o) - 1).toString(32), r >>= o, l -= o, Ye = 1 << 32 - Fe(t) + l | n << l | r, Xe = i + e;
  } else Ye = 1 << i | n << l | r, Xe = e;
}
function wo(e) {
  e.return !== null && (_t(e, 1), vu(e, 1, 0));
}
function ko(e) {
  for (; e === Zr; ) Zr = Yt[--Xt], Yt[Xt] = null, Jr = Yt[--Xt], Yt[Xt] = null;
  for (; e === $t; ) $t = Ce[--Ee], Ce[Ee] = null, Xe = Ce[--Ee], Ce[Ee] = null, Ye = Ce[--Ee], Ce[Ee] = null;
}
var Se = null, ke = null, B = !1, De = null;
function yu(e, t) {
  var n = ze(5, null, null, 0);
  n.elementType = "DELETED", n.stateNode = t, n.return = e, t = e.deletions, t === null ? (e.deletions = [n], e.flags |= 16) : t.push(n);
}
function Ls(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t, t !== null ? (e.stateNode = t, Se = e, ke = pt(t.firstChild), !0) : !1;
    case 6:
      return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t, t !== null ? (e.stateNode = t, Se = e, ke = null, !0) : !1;
    case 13:
      return t = t.nodeType !== 8 ? null : t, t !== null ? (n = $t !== null ? { id: Ye, overflow: Xe } : null, e.memoizedState = { dehydrated: t, treeContext: n, retryLane: 1073741824 }, n = ze(18, null, null, 0), n.stateNode = t, n.return = e, e.child = n, Se = e, ke = null, !0) : !1;
    default:
      return !1;
  }
}
function Li(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function Ri(e) {
  if (B) {
    var t = ke;
    if (t) {
      var n = t;
      if (!Ls(e, t)) {
        if (Li(e)) throw Error(N(418));
        t = pt(n.nextSibling);
        var r = Se;
        t && Ls(e, t) ? yu(r, n) : (e.flags = e.flags & -4097 | 2, B = !1, Se = e);
      }
    } else {
      if (Li(e)) throw Error(N(418));
      e.flags = e.flags & -4097 | 2, B = !1, Se = e;
    }
  }
}
function Rs(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; ) e = e.return;
  Se = e;
}
function kr(e) {
  if (e !== Se) return !1;
  if (!B) return Rs(e), B = !0, !1;
  var t;
  if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !Ei(e.type, e.memoizedProps)), t && (t = ke)) {
    if (Li(e)) throw xu(), Error(N(418));
    for (; t; ) yu(e, t), t = pt(t.nextSibling);
  }
  if (Rs(e), e.tag === 13) {
    if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(N(317));
    e: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === "/$") {
            if (t === 0) {
              ke = pt(e.nextSibling);
              break e;
            }
            t--;
          } else n !== "$" && n !== "$!" && n !== "$?" || t++;
        }
        e = e.nextSibling;
      }
      ke = null;
    }
  } else ke = Se ? pt(e.stateNode.nextSibling) : null;
  return !0;
}
function xu() {
  for (var e = ke; e; ) e = pt(e.nextSibling);
}
function an() {
  ke = Se = null, B = !1;
}
function So(e) {
  De === null ? De = [e] : De.push(e);
}
var kf = tt.ReactCurrentBatchConfig;
function jn(e, t, n) {
  if (e = n.ref, e !== null && typeof e != "function" && typeof e != "object") {
    if (n._owner) {
      if (n = n._owner, n) {
        if (n.tag !== 1) throw Error(N(309));
        var r = n.stateNode;
      }
      if (!r) throw Error(N(147, e));
      var l = r, i = "" + e;
      return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === i ? t.ref : (t = function(o) {
        var s = l.refs;
        o === null ? delete s[i] : s[i] = o;
      }, t._stringRef = i, t);
    }
    if (typeof e != "string") throw Error(N(284));
    if (!n._owner) throw Error(N(290, e));
  }
  return e;
}
function Sr(e, t) {
  throw e = Object.prototype.toString.call(t), Error(N(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e));
}
function Ms(e) {
  var t = e._init;
  return t(e._payload);
}
function wu(e) {
  function t(f, c) {
    if (e) {
      var p = f.deletions;
      p === null ? (f.deletions = [c], f.flags |= 16) : p.push(c);
    }
  }
  function n(f, c) {
    if (!e) return null;
    for (; c !== null; ) t(f, c), c = c.sibling;
    return null;
  }
  function r(f, c) {
    for (f = /* @__PURE__ */ new Map(); c !== null; ) c.key !== null ? f.set(c.key, c) : f.set(c.index, c), c = c.sibling;
    return f;
  }
  function l(f, c) {
    return f = vt(f, c), f.index = 0, f.sibling = null, f;
  }
  function i(f, c, p) {
    return f.index = p, e ? (p = f.alternate, p !== null ? (p = p.index, p < c ? (f.flags |= 2, c) : p) : (f.flags |= 2, c)) : (f.flags |= 1048576, c);
  }
  function o(f) {
    return e && f.alternate === null && (f.flags |= 2), f;
  }
  function s(f, c, p, x) {
    return c === null || c.tag !== 6 ? (c = ql(p, f.mode, x), c.return = f, c) : (c = l(c, p), c.return = f, c);
  }
  function a(f, c, p, x) {
    var j = p.type;
    return j === Wt ? m(f, c, p.props.children, x, p.key) : c !== null && (c.elementType === j || typeof j == "object" && j !== null && j.$$typeof === lt && Ms(j) === c.type) ? (x = l(c, p.props), x.ref = jn(f, c, p), x.return = f, x) : (x = Ir(p.type, p.key, p.props, null, f.mode, x), x.ref = jn(f, c, p), x.return = f, x);
  }
  function d(f, c, p, x) {
    return c === null || c.tag !== 4 || c.stateNode.containerInfo !== p.containerInfo || c.stateNode.implementation !== p.implementation ? (c = ei(p, f.mode, x), c.return = f, c) : (c = l(c, p.children || []), c.return = f, c);
  }
  function m(f, c, p, x, j) {
    return c === null || c.tag !== 7 ? (c = Rt(p, f.mode, x, j), c.return = f, c) : (c = l(c, p), c.return = f, c);
  }
  function h(f, c, p) {
    if (typeof c == "string" && c !== "" || typeof c == "number") return c = ql("" + c, f.mode, p), c.return = f, c;
    if (typeof c == "object" && c !== null) {
      switch (c.$$typeof) {
        case dr:
          return p = Ir(c.type, c.key, c.props, null, f.mode, p), p.ref = jn(f, null, c), p.return = f, p;
        case Bt:
          return c = ei(c, f.mode, p), c.return = f, c;
        case lt:
          var x = c._init;
          return h(f, x(c._payload), p);
      }
      if (zn(c) || xn(c)) return c = Rt(c, f.mode, p, null), c.return = f, c;
      Sr(f, c);
    }
    return null;
  }
  function g(f, c, p, x) {
    var j = c !== null ? c.key : null;
    if (typeof p == "string" && p !== "" || typeof p == "number") return j !== null ? null : s(f, c, "" + p, x);
    if (typeof p == "object" && p !== null) {
      switch (p.$$typeof) {
        case dr:
          return p.key === j ? a(f, c, p, x) : null;
        case Bt:
          return p.key === j ? d(f, c, p, x) : null;
        case lt:
          return j = p._init, g(
            f,
            c,
            j(p._payload),
            x
          );
      }
      if (zn(p) || xn(p)) return j !== null ? null : m(f, c, p, x, null);
      Sr(f, p);
    }
    return null;
  }
  function y(f, c, p, x, j) {
    if (typeof x == "string" && x !== "" || typeof x == "number") return f = f.get(p) || null, s(c, f, "" + x, j);
    if (typeof x == "object" && x !== null) {
      switch (x.$$typeof) {
        case dr:
          return f = f.get(x.key === null ? p : x.key) || null, a(c, f, x, j);
        case Bt:
          return f = f.get(x.key === null ? p : x.key) || null, d(c, f, x, j);
        case lt:
          var v = x._init;
          return y(f, c, p, v(x._payload), j);
      }
      if (zn(x) || xn(x)) return f = f.get(p) || null, m(c, f, x, j, null);
      Sr(c, x);
    }
    return null;
  }
  function k(f, c, p, x) {
    for (var j = null, v = null, w = c, _ = c = 0, V = null; w !== null && _ < p.length; _++) {
      w.index > _ ? (V = w, w = null) : V = w.sibling;
      var R = g(f, w, p[_], x);
      if (R === null) {
        w === null && (w = V);
        break;
      }
      e && w && R.alternate === null && t(f, w), c = i(R, c, _), v === null ? j = R : v.sibling = R, v = R, w = V;
    }
    if (_ === p.length) return n(f, w), B && _t(f, _), j;
    if (w === null) {
      for (; _ < p.length; _++) w = h(f, p[_], x), w !== null && (c = i(w, c, _), v === null ? j = w : v.sibling = w, v = w);
      return B && _t(f, _), j;
    }
    for (w = r(f, w); _ < p.length; _++) V = y(w, f, _, p[_], x), V !== null && (e && V.alternate !== null && w.delete(V.key === null ? _ : V.key), c = i(V, c, _), v === null ? j = V : v.sibling = V, v = V);
    return e && w.forEach(function(xe) {
      return t(f, xe);
    }), B && _t(f, _), j;
  }
  function S(f, c, p, x) {
    var j = xn(p);
    if (typeof j != "function") throw Error(N(150));
    if (p = j.call(p), p == null) throw Error(N(151));
    for (var v = j = null, w = c, _ = c = 0, V = null, R = p.next(); w !== null && !R.done; _++, R = p.next()) {
      w.index > _ ? (V = w, w = null) : V = w.sibling;
      var xe = g(f, w, R.value, x);
      if (xe === null) {
        w === null && (w = V);
        break;
      }
      e && w && xe.alternate === null && t(f, w), c = i(xe, c, _), v === null ? j = xe : v.sibling = xe, v = xe, w = V;
    }
    if (R.done) return n(
      f,
      w
    ), B && _t(f, _), j;
    if (w === null) {
      for (; !R.done; _++, R = p.next()) R = h(f, R.value, x), R !== null && (c = i(R, c, _), v === null ? j = R : v.sibling = R, v = R);
      return B && _t(f, _), j;
    }
    for (w = r(f, w); !R.done; _++, R = p.next()) R = y(w, f, _, R.value, x), R !== null && (e && R.alternate !== null && w.delete(R.key === null ? _ : R.key), c = i(R, c, _), v === null ? j = R : v.sibling = R, v = R);
    return e && w.forEach(function(Ue) {
      return t(f, Ue);
    }), B && _t(f, _), j;
  }
  function z(f, c, p, x) {
    if (typeof p == "object" && p !== null && p.type === Wt && p.key === null && (p = p.props.children), typeof p == "object" && p !== null) {
      switch (p.$$typeof) {
        case dr:
          e: {
            for (var j = p.key, v = c; v !== null; ) {
              if (v.key === j) {
                if (j = p.type, j === Wt) {
                  if (v.tag === 7) {
                    n(f, v.sibling), c = l(v, p.props.children), c.return = f, f = c;
                    break e;
                  }
                } else if (v.elementType === j || typeof j == "object" && j !== null && j.$$typeof === lt && Ms(j) === v.type) {
                  n(f, v.sibling), c = l(v, p.props), c.ref = jn(f, v, p), c.return = f, f = c;
                  break e;
                }
                n(f, v);
                break;
              } else t(f, v);
              v = v.sibling;
            }
            p.type === Wt ? (c = Rt(p.props.children, f.mode, x, p.key), c.return = f, f = c) : (x = Ir(p.type, p.key, p.props, null, f.mode, x), x.ref = jn(f, c, p), x.return = f, f = x);
          }
          return o(f);
        case Bt:
          e: {
            for (v = p.key; c !== null; ) {
              if (c.key === v) if (c.tag === 4 && c.stateNode.containerInfo === p.containerInfo && c.stateNode.implementation === p.implementation) {
                n(f, c.sibling), c = l(c, p.children || []), c.return = f, f = c;
                break e;
              } else {
                n(f, c);
                break;
              }
              else t(f, c);
              c = c.sibling;
            }
            c = ei(p, f.mode, x), c.return = f, f = c;
          }
          return o(f);
        case lt:
          return v = p._init, z(f, c, v(p._payload), x);
      }
      if (zn(p)) return k(f, c, p, x);
      if (xn(p)) return S(f, c, p, x);
      Sr(f, p);
    }
    return typeof p == "string" && p !== "" || typeof p == "number" ? (p = "" + p, c !== null && c.tag === 6 ? (n(f, c.sibling), c = l(c, p), c.return = f, f = c) : (n(f, c), c = ql(p, f.mode, x), c.return = f, f = c), o(f)) : n(f, c);
  }
  return z;
}
var un = wu(!0), ku = wu(!1), br = kt(null), qr = null, Zt = null, No = null;
function jo() {
  No = Zt = qr = null;
}
function _o(e) {
  var t = br.current;
  U(br), e._currentValue = t;
}
function Mi(e, t, n) {
  for (; e !== null; ) {
    var r = e.alternate;
    if ((e.childLanes & t) !== t ? (e.childLanes |= t, r !== null && (r.childLanes |= t)) : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t), e === n) break;
    e = e.return;
  }
}
function rn(e, t) {
  qr = e, No = Zt = null, e = e.dependencies, e !== null && e.firstContext !== null && (e.lanes & t && (me = !0), e.firstContext = null);
}
function Le(e) {
  var t = e._currentValue;
  if (No !== e) if (e = { context: e, memoizedValue: t, next: null }, Zt === null) {
    if (qr === null) throw Error(N(308));
    Zt = e, qr.dependencies = { lanes: 0, firstContext: e };
  } else Zt = Zt.next = e;
  return t;
}
var zt = null;
function Co(e) {
  zt === null ? zt = [e] : zt.push(e);
}
function Su(e, t, n, r) {
  var l = t.interleaved;
  return l === null ? (n.next = n, Co(t)) : (n.next = l.next, l.next = n), t.interleaved = n, qe(e, r);
}
function qe(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; ) e.childLanes |= t, n = e.alternate, n !== null && (n.childLanes |= t), n = e, e = e.return;
  return n.tag === 3 ? n.stateNode : null;
}
var it = !1;
function Eo(e) {
  e.updateQueue = { baseState: e.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
}
function Nu(e, t) {
  e = e.updateQueue, t.updateQueue === e && (t.updateQueue = { baseState: e.baseState, firstBaseUpdate: e.firstBaseUpdate, lastBaseUpdate: e.lastBaseUpdate, shared: e.shared, effects: e.effects });
}
function Ze(e, t) {
  return { eventTime: e, lane: t, tag: 0, payload: null, callback: null, next: null };
}
function ht(e, t, n) {
  var r = e.updateQueue;
  if (r === null) return null;
  if (r = r.shared, $ & 2) {
    var l = r.pending;
    return l === null ? t.next = t : (t.next = l.next, l.next = t), r.pending = t, qe(e, n);
  }
  return l = r.interleaved, l === null ? (t.next = t, Co(r)) : (t.next = l.next, l.next = t), r.interleaved = t, qe(e, n);
}
function Rr(e, t, n) {
  if (t = t.updateQueue, t !== null && (t = t.shared, (n & 4194240) !== 0)) {
    var r = t.lanes;
    r &= e.pendingLanes, n |= r, t.lanes = n, fo(e, n);
  }
}
function $s(e, t) {
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
function el(e, t, n, r) {
  var l = e.updateQueue;
  it = !1;
  var i = l.firstBaseUpdate, o = l.lastBaseUpdate, s = l.shared.pending;
  if (s !== null) {
    l.shared.pending = null;
    var a = s, d = a.next;
    a.next = null, o === null ? i = d : o.next = d, o = a;
    var m = e.alternate;
    m !== null && (m = m.updateQueue, s = m.lastBaseUpdate, s !== o && (s === null ? m.firstBaseUpdate = d : s.next = d, m.lastBaseUpdate = a));
  }
  if (i !== null) {
    var h = l.baseState;
    o = 0, m = d = a = null, s = i;
    do {
      var g = s.lane, y = s.eventTime;
      if ((r & g) === g) {
        m !== null && (m = m.next = {
          eventTime: y,
          lane: 0,
          tag: s.tag,
          payload: s.payload,
          callback: s.callback,
          next: null
        });
        e: {
          var k = e, S = s;
          switch (g = t, y = n, S.tag) {
            case 1:
              if (k = S.payload, typeof k == "function") {
                h = k.call(y, h, g);
                break e;
              }
              h = k;
              break e;
            case 3:
              k.flags = k.flags & -65537 | 128;
            case 0:
              if (k = S.payload, g = typeof k == "function" ? k.call(y, h, g) : k, g == null) break e;
              h = K({}, h, g);
              break e;
            case 2:
              it = !0;
          }
        }
        s.callback !== null && s.lane !== 0 && (e.flags |= 64, g = l.effects, g === null ? l.effects = [s] : g.push(s));
      } else y = { eventTime: y, lane: g, tag: s.tag, payload: s.payload, callback: s.callback, next: null }, m === null ? (d = m = y, a = h) : m = m.next = y, o |= g;
      if (s = s.next, s === null) {
        if (s = l.shared.pending, s === null) break;
        g = s, s = g.next, g.next = null, l.lastBaseUpdate = g, l.shared.pending = null;
      }
    } while (!0);
    if (m === null && (a = h), l.baseState = a, l.firstBaseUpdate = d, l.lastBaseUpdate = m, t = l.shared.interleaved, t !== null) {
      l = t;
      do
        o |= l.lane, l = l.next;
      while (l !== t);
    } else i === null && (l.shared.lanes = 0);
    Dt |= o, e.lanes = o, e.memoizedState = h;
  }
}
function Os(e, t, n) {
  if (e = t.effects, t.effects = null, e !== null) for (t = 0; t < e.length; t++) {
    var r = e[t], l = r.callback;
    if (l !== null) {
      if (r.callback = null, r = n, typeof l != "function") throw Error(N(191, l));
      l.call(r);
    }
  }
}
var sr = {}, Qe = kt(sr), Jn = kt(sr), bn = kt(sr);
function Pt(e) {
  if (e === sr) throw Error(N(174));
  return e;
}
function zo(e, t) {
  switch (I(bn, t), I(Jn, e), I(Qe, sr), e = t.nodeType, e) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : pi(null, "");
      break;
    default:
      e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = pi(t, e);
  }
  U(Qe), I(Qe, t);
}
function cn() {
  U(Qe), U(Jn), U(bn);
}
function ju(e) {
  Pt(bn.current);
  var t = Pt(Qe.current), n = pi(t, e.type);
  t !== n && (I(Jn, e), I(Qe, n));
}
function Po(e) {
  Jn.current === e && (U(Qe), U(Jn));
}
var H = kt(0);
function tl(e) {
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
var Gl = [];
function To() {
  for (var e = 0; e < Gl.length; e++) Gl[e]._workInProgressVersionPrimary = null;
  Gl.length = 0;
}
var Mr = tt.ReactCurrentDispatcher, Yl = tt.ReactCurrentBatchConfig, Ot = 0, Q = null, J = null, ee = null, nl = !1, Dn = !1, qn = 0, Sf = 0;
function oe() {
  throw Error(N(321));
}
function Lo(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++) if (!Ae(e[n], t[n])) return !1;
  return !0;
}
function Ro(e, t, n, r, l, i) {
  if (Ot = i, Q = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, Mr.current = e === null || e.memoizedState === null ? Cf : Ef, e = n(r, l), Dn) {
    i = 0;
    do {
      if (Dn = !1, qn = 0, 25 <= i) throw Error(N(301));
      i += 1, ee = J = null, t.updateQueue = null, Mr.current = zf, e = n(r, l);
    } while (Dn);
  }
  if (Mr.current = rl, t = J !== null && J.next !== null, Ot = 0, ee = J = Q = null, nl = !1, t) throw Error(N(300));
  return e;
}
function Mo() {
  var e = qn !== 0;
  return qn = 0, e;
}
function We() {
  var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
  return ee === null ? Q.memoizedState = ee = e : ee = ee.next = e, ee;
}
function Re() {
  if (J === null) {
    var e = Q.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = J.next;
  var t = ee === null ? Q.memoizedState : ee.next;
  if (t !== null) ee = t, J = e;
  else {
    if (e === null) throw Error(N(310));
    J = e, e = { memoizedState: J.memoizedState, baseState: J.baseState, baseQueue: J.baseQueue, queue: J.queue, next: null }, ee === null ? Q.memoizedState = ee = e : ee = ee.next = e;
  }
  return ee;
}
function er(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function Xl(e) {
  var t = Re(), n = t.queue;
  if (n === null) throw Error(N(311));
  n.lastRenderedReducer = e;
  var r = J, l = r.baseQueue, i = n.pending;
  if (i !== null) {
    if (l !== null) {
      var o = l.next;
      l.next = i.next, i.next = o;
    }
    r.baseQueue = l = i, n.pending = null;
  }
  if (l !== null) {
    i = l.next, r = r.baseState;
    var s = o = null, a = null, d = i;
    do {
      var m = d.lane;
      if ((Ot & m) === m) a !== null && (a = a.next = { lane: 0, action: d.action, hasEagerState: d.hasEagerState, eagerState: d.eagerState, next: null }), r = d.hasEagerState ? d.eagerState : e(r, d.action);
      else {
        var h = {
          lane: m,
          action: d.action,
          hasEagerState: d.hasEagerState,
          eagerState: d.eagerState,
          next: null
        };
        a === null ? (s = a = h, o = r) : a = a.next = h, Q.lanes |= m, Dt |= m;
      }
      d = d.next;
    } while (d !== null && d !== i);
    a === null ? o = r : a.next = s, Ae(r, t.memoizedState) || (me = !0), t.memoizedState = r, t.baseState = o, t.baseQueue = a, n.lastRenderedState = r;
  }
  if (e = n.interleaved, e !== null) {
    l = e;
    do
      i = l.lane, Q.lanes |= i, Dt |= i, l = l.next;
    while (l !== e);
  } else l === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function Zl(e) {
  var t = Re(), n = t.queue;
  if (n === null) throw Error(N(311));
  n.lastRenderedReducer = e;
  var r = n.dispatch, l = n.pending, i = t.memoizedState;
  if (l !== null) {
    n.pending = null;
    var o = l = l.next;
    do
      i = e(i, o.action), o = o.next;
    while (o !== l);
    Ae(i, t.memoizedState) || (me = !0), t.memoizedState = i, t.baseQueue === null && (t.baseState = i), n.lastRenderedState = i;
  }
  return [i, r];
}
function _u() {
}
function Cu(e, t) {
  var n = Q, r = Re(), l = t(), i = !Ae(r.memoizedState, l);
  if (i && (r.memoizedState = l, me = !0), r = r.queue, $o(Pu.bind(null, n, r, e), [e]), r.getSnapshot !== t || i || ee !== null && ee.memoizedState.tag & 1) {
    if (n.flags |= 2048, tr(9, zu.bind(null, n, r, l, t), void 0, null), te === null) throw Error(N(349));
    Ot & 30 || Eu(n, t, l);
  }
  return l;
}
function Eu(e, t, n) {
  e.flags |= 16384, e = { getSnapshot: t, value: n }, t = Q.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, Q.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
}
function zu(e, t, n, r) {
  t.value = n, t.getSnapshot = r, Tu(t) && Lu(e);
}
function Pu(e, t, n) {
  return n(function() {
    Tu(t) && Lu(e);
  });
}
function Tu(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !Ae(e, n);
  } catch {
    return !0;
  }
}
function Lu(e) {
  var t = qe(e, 1);
  t !== null && Ie(t, e, 1, -1);
}
function Ds(e) {
  var t = We();
  return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: er, lastRenderedState: e }, t.queue = e, e = e.dispatch = _f.bind(null, Q, e), [t.memoizedState, e];
}
function tr(e, t, n, r) {
  return e = { tag: e, create: t, destroy: n, deps: r, next: null }, t = Q.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, Q.updateQueue = t, t.lastEffect = e.next = e) : (n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e)), e;
}
function Ru() {
  return Re().memoizedState;
}
function $r(e, t, n, r) {
  var l = We();
  Q.flags |= e, l.memoizedState = tr(1 | t, n, void 0, r === void 0 ? null : r);
}
function gl(e, t, n, r) {
  var l = Re();
  r = r === void 0 ? null : r;
  var i = void 0;
  if (J !== null) {
    var o = J.memoizedState;
    if (i = o.destroy, r !== null && Lo(r, o.deps)) {
      l.memoizedState = tr(t, n, i, r);
      return;
    }
  }
  Q.flags |= e, l.memoizedState = tr(1 | t, n, i, r);
}
function Fs(e, t) {
  return $r(8390656, 8, e, t);
}
function $o(e, t) {
  return gl(2048, 8, e, t);
}
function Mu(e, t) {
  return gl(4, 2, e, t);
}
function $u(e, t) {
  return gl(4, 4, e, t);
}
function Ou(e, t) {
  if (typeof t == "function") return e = e(), t(e), function() {
    t(null);
  };
  if (t != null) return e = e(), t.current = e, function() {
    t.current = null;
  };
}
function Du(e, t, n) {
  return n = n != null ? n.concat([e]) : null, gl(4, 4, Ou.bind(null, t, e), n);
}
function Oo() {
}
function Fu(e, t) {
  var n = Re();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && Lo(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
}
function Iu(e, t) {
  var n = Re();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && Lo(t, r[1]) ? r[0] : (e = e(), n.memoizedState = [e, t], e);
}
function Au(e, t, n) {
  return Ot & 21 ? (Ae(n, t) || (n = Ha(), Q.lanes |= n, Dt |= n, e.baseState = !0), t) : (e.baseState && (e.baseState = !1, me = !0), e.memoizedState = n);
}
function Nf(e, t) {
  var n = O;
  O = n !== 0 && 4 > n ? n : 4, e(!0);
  var r = Yl.transition;
  Yl.transition = {};
  try {
    e(!1), t();
  } finally {
    O = n, Yl.transition = r;
  }
}
function Uu() {
  return Re().memoizedState;
}
function jf(e, t, n) {
  var r = gt(e);
  if (n = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null }, Bu(e)) Wu(t, n);
  else if (n = Su(e, t, n, r), n !== null) {
    var l = de();
    Ie(n, e, r, l), Vu(n, t, r);
  }
}
function _f(e, t, n) {
  var r = gt(e), l = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (Bu(e)) Wu(t, l);
  else {
    var i = e.alternate;
    if (e.lanes === 0 && (i === null || i.lanes === 0) && (i = t.lastRenderedReducer, i !== null)) try {
      var o = t.lastRenderedState, s = i(o, n);
      if (l.hasEagerState = !0, l.eagerState = s, Ae(s, o)) {
        var a = t.interleaved;
        a === null ? (l.next = l, Co(t)) : (l.next = a.next, a.next = l), t.interleaved = l;
        return;
      }
    } catch {
    } finally {
    }
    n = Su(e, t, l, r), n !== null && (l = de(), Ie(n, e, r, l), Vu(n, t, r));
  }
}
function Bu(e) {
  var t = e.alternate;
  return e === Q || t !== null && t === Q;
}
function Wu(e, t) {
  Dn = nl = !0;
  var n = e.pending;
  n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
}
function Vu(e, t, n) {
  if (n & 4194240) {
    var r = t.lanes;
    r &= e.pendingLanes, n |= r, t.lanes = n, fo(e, n);
  }
}
var rl = { readContext: Le, useCallback: oe, useContext: oe, useEffect: oe, useImperativeHandle: oe, useInsertionEffect: oe, useLayoutEffect: oe, useMemo: oe, useReducer: oe, useRef: oe, useState: oe, useDebugValue: oe, useDeferredValue: oe, useTransition: oe, useMutableSource: oe, useSyncExternalStore: oe, useId: oe, unstable_isNewReconciler: !1 }, Cf = { readContext: Le, useCallback: function(e, t) {
  return We().memoizedState = [e, t === void 0 ? null : t], e;
}, useContext: Le, useEffect: Fs, useImperativeHandle: function(e, t, n) {
  return n = n != null ? n.concat([e]) : null, $r(
    4194308,
    4,
    Ou.bind(null, t, e),
    n
  );
}, useLayoutEffect: function(e, t) {
  return $r(4194308, 4, e, t);
}, useInsertionEffect: function(e, t) {
  return $r(4, 2, e, t);
}, useMemo: function(e, t) {
  var n = We();
  return t = t === void 0 ? null : t, e = e(), n.memoizedState = [e, t], e;
}, useReducer: function(e, t, n) {
  var r = We();
  return t = n !== void 0 ? n(t) : t, r.memoizedState = r.baseState = t, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: t }, r.queue = e, e = e.dispatch = jf.bind(null, Q, e), [r.memoizedState, e];
}, useRef: function(e) {
  var t = We();
  return e = { current: e }, t.memoizedState = e;
}, useState: Ds, useDebugValue: Oo, useDeferredValue: function(e) {
  return We().memoizedState = e;
}, useTransition: function() {
  var e = Ds(!1), t = e[0];
  return e = Nf.bind(null, e[1]), We().memoizedState = e, [t, e];
}, useMutableSource: function() {
}, useSyncExternalStore: function(e, t, n) {
  var r = Q, l = We();
  if (B) {
    if (n === void 0) throw Error(N(407));
    n = n();
  } else {
    if (n = t(), te === null) throw Error(N(349));
    Ot & 30 || Eu(r, t, n);
  }
  l.memoizedState = n;
  var i = { value: n, getSnapshot: t };
  return l.queue = i, Fs(Pu.bind(
    null,
    r,
    i,
    e
  ), [e]), r.flags |= 2048, tr(9, zu.bind(null, r, i, n, t), void 0, null), n;
}, useId: function() {
  var e = We(), t = te.identifierPrefix;
  if (B) {
    var n = Xe, r = Ye;
    n = (r & ~(1 << 32 - Fe(r) - 1)).toString(32) + n, t = ":" + t + "R" + n, n = qn++, 0 < n && (t += "H" + n.toString(32)), t += ":";
  } else n = Sf++, t = ":" + t + "r" + n.toString(32) + ":";
  return e.memoizedState = t;
}, unstable_isNewReconciler: !1 }, Ef = {
  readContext: Le,
  useCallback: Fu,
  useContext: Le,
  useEffect: $o,
  useImperativeHandle: Du,
  useInsertionEffect: Mu,
  useLayoutEffect: $u,
  useMemo: Iu,
  useReducer: Xl,
  useRef: Ru,
  useState: function() {
    return Xl(er);
  },
  useDebugValue: Oo,
  useDeferredValue: function(e) {
    var t = Re();
    return Au(t, J.memoizedState, e);
  },
  useTransition: function() {
    var e = Xl(er)[0], t = Re().memoizedState;
    return [e, t];
  },
  useMutableSource: _u,
  useSyncExternalStore: Cu,
  useId: Uu,
  unstable_isNewReconciler: !1
}, zf = { readContext: Le, useCallback: Fu, useContext: Le, useEffect: $o, useImperativeHandle: Du, useInsertionEffect: Mu, useLayoutEffect: $u, useMemo: Iu, useReducer: Zl, useRef: Ru, useState: function() {
  return Zl(er);
}, useDebugValue: Oo, useDeferredValue: function(e) {
  var t = Re();
  return J === null ? t.memoizedState = e : Au(t, J.memoizedState, e);
}, useTransition: function() {
  var e = Zl(er)[0], t = Re().memoizedState;
  return [e, t];
}, useMutableSource: _u, useSyncExternalStore: Cu, useId: Uu, unstable_isNewReconciler: !1 };
function $e(e, t) {
  if (e && e.defaultProps) {
    t = K({}, t), e = e.defaultProps;
    for (var n in e) t[n] === void 0 && (t[n] = e[n]);
    return t;
  }
  return t;
}
function $i(e, t, n, r) {
  t = e.memoizedState, n = n(r, t), n = n == null ? t : K({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
}
var vl = { isMounted: function(e) {
  return (e = e._reactInternals) ? At(e) === e : !1;
}, enqueueSetState: function(e, t, n) {
  e = e._reactInternals;
  var r = de(), l = gt(e), i = Ze(r, l);
  i.payload = t, n != null && (i.callback = n), t = ht(e, i, l), t !== null && (Ie(t, e, l, r), Rr(t, e, l));
}, enqueueReplaceState: function(e, t, n) {
  e = e._reactInternals;
  var r = de(), l = gt(e), i = Ze(r, l);
  i.tag = 1, i.payload = t, n != null && (i.callback = n), t = ht(e, i, l), t !== null && (Ie(t, e, l, r), Rr(t, e, l));
}, enqueueForceUpdate: function(e, t) {
  e = e._reactInternals;
  var n = de(), r = gt(e), l = Ze(n, r);
  l.tag = 2, t != null && (l.callback = t), t = ht(e, l, r), t !== null && (Ie(t, e, r, n), Rr(t, e, r));
} };
function Is(e, t, n, r, l, i, o) {
  return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, i, o) : t.prototype && t.prototype.isPureReactComponent ? !Gn(n, r) || !Gn(l, i) : !0;
}
function Hu(e, t, n) {
  var r = !1, l = xt, i = t.contextType;
  return typeof i == "object" && i !== null ? i = Le(i) : (l = ve(t) ? Mt : ue.current, r = t.contextTypes, i = (r = r != null) ? sn(e, l) : xt), t = new t(n, i), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = vl, e.stateNode = t, t._reactInternals = e, r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = l, e.__reactInternalMemoizedMaskedChildContext = i), t;
}
function As(e, t, n, r) {
  e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && vl.enqueueReplaceState(t, t.state, null);
}
function Oi(e, t, n, r) {
  var l = e.stateNode;
  l.props = n, l.state = e.memoizedState, l.refs = {}, Eo(e);
  var i = t.contextType;
  typeof i == "object" && i !== null ? l.context = Le(i) : (i = ve(t) ? Mt : ue.current, l.context = sn(e, i)), l.state = e.memoizedState, i = t.getDerivedStateFromProps, typeof i == "function" && ($i(e, t, i, n), l.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof l.getSnapshotBeforeUpdate == "function" || typeof l.UNSAFE_componentWillMount != "function" && typeof l.componentWillMount != "function" || (t = l.state, typeof l.componentWillMount == "function" && l.componentWillMount(), typeof l.UNSAFE_componentWillMount == "function" && l.UNSAFE_componentWillMount(), t !== l.state && vl.enqueueReplaceState(l, l.state, null), el(e, n, l, r), l.state = e.memoizedState), typeof l.componentDidMount == "function" && (e.flags |= 4194308);
}
function dn(e, t) {
  try {
    var n = "", r = t;
    do
      n += td(r), r = r.return;
    while (r);
    var l = n;
  } catch (i) {
    l = `
Error generating stack: ` + i.message + `
` + i.stack;
  }
  return { value: e, source: t, stack: l, digest: null };
}
function Jl(e, t, n) {
  return { value: e, source: null, stack: n ?? null, digest: t ?? null };
}
function Di(e, t) {
  try {
    console.error(t.value);
  } catch (n) {
    setTimeout(function() {
      throw n;
    });
  }
}
var Pf = typeof WeakMap == "function" ? WeakMap : Map;
function Qu(e, t, n) {
  n = Ze(-1, n), n.tag = 3, n.payload = { element: null };
  var r = t.value;
  return n.callback = function() {
    il || (il = !0, Ki = r), Di(e, t);
  }, n;
}
function Ku(e, t, n) {
  n = Ze(-1, n), n.tag = 3;
  var r = e.type.getDerivedStateFromError;
  if (typeof r == "function") {
    var l = t.value;
    n.payload = function() {
      return r(l);
    }, n.callback = function() {
      Di(e, t);
    };
  }
  var i = e.stateNode;
  return i !== null && typeof i.componentDidCatch == "function" && (n.callback = function() {
    Di(e, t), typeof r != "function" && (mt === null ? mt = /* @__PURE__ */ new Set([this]) : mt.add(this));
    var o = t.stack;
    this.componentDidCatch(t.value, { componentStack: o !== null ? o : "" });
  }), n;
}
function Us(e, t, n) {
  var r = e.pingCache;
  if (r === null) {
    r = e.pingCache = new Pf();
    var l = /* @__PURE__ */ new Set();
    r.set(t, l);
  } else l = r.get(t), l === void 0 && (l = /* @__PURE__ */ new Set(), r.set(t, l));
  l.has(n) || (l.add(n), e = Vf.bind(null, e, t, n), t.then(e, e));
}
function Bs(e) {
  do {
    var t;
    if ((t = e.tag === 13) && (t = e.memoizedState, t = t !== null ? t.dehydrated !== null : !0), t) return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function Ws(e, t, n, r, l) {
  return e.mode & 1 ? (e.flags |= 65536, e.lanes = l, e) : (e === t ? e.flags |= 65536 : (e.flags |= 128, n.flags |= 131072, n.flags &= -52805, n.tag === 1 && (n.alternate === null ? n.tag = 17 : (t = Ze(-1, 1), t.tag = 2, ht(n, t, 1))), n.lanes |= 1), e);
}
var Tf = tt.ReactCurrentOwner, me = !1;
function ce(e, t, n, r) {
  t.child = e === null ? ku(t, null, n, r) : un(t, e.child, n, r);
}
function Vs(e, t, n, r, l) {
  n = n.render;
  var i = t.ref;
  return rn(t, l), r = Ro(e, t, n, r, i, l), n = Mo(), e !== null && !me ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, et(e, t, l)) : (B && n && wo(t), t.flags |= 1, ce(e, t, r, l), t.child);
}
function Hs(e, t, n, r, l) {
  if (e === null) {
    var i = n.type;
    return typeof i == "function" && !Vo(i) && i.defaultProps === void 0 && n.compare === null && n.defaultProps === void 0 ? (t.tag = 15, t.type = i, Gu(e, t, i, r, l)) : (e = Ir(n.type, null, r, t, t.mode, l), e.ref = t.ref, e.return = t, t.child = e);
  }
  if (i = e.child, !(e.lanes & l)) {
    var o = i.memoizedProps;
    if (n = n.compare, n = n !== null ? n : Gn, n(o, r) && e.ref === t.ref) return et(e, t, l);
  }
  return t.flags |= 1, e = vt(i, r), e.ref = t.ref, e.return = t, t.child = e;
}
function Gu(e, t, n, r, l) {
  if (e !== null) {
    var i = e.memoizedProps;
    if (Gn(i, r) && e.ref === t.ref) if (me = !1, t.pendingProps = r = i, (e.lanes & l) !== 0) e.flags & 131072 && (me = !0);
    else return t.lanes = e.lanes, et(e, t, l);
  }
  return Fi(e, t, n, r, l);
}
function Yu(e, t, n) {
  var r = t.pendingProps, l = r.children, i = e !== null ? e.memoizedState : null;
  if (r.mode === "hidden") if (!(t.mode & 1)) t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, I(bt, we), we |= n;
  else {
    if (!(n & 1073741824)) return e = i !== null ? i.baseLanes | n : n, t.lanes = t.childLanes = 1073741824, t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }, t.updateQueue = null, I(bt, we), we |= e, null;
    t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, r = i !== null ? i.baseLanes : n, I(bt, we), we |= r;
  }
  else i !== null ? (r = i.baseLanes | n, t.memoizedState = null) : r = n, I(bt, we), we |= r;
  return ce(e, t, l, n), t.child;
}
function Xu(e, t) {
  var n = t.ref;
  (e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= 512, t.flags |= 2097152);
}
function Fi(e, t, n, r, l) {
  var i = ve(n) ? Mt : ue.current;
  return i = sn(t, i), rn(t, l), n = Ro(e, t, n, r, i, l), r = Mo(), e !== null && !me ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, et(e, t, l)) : (B && r && wo(t), t.flags |= 1, ce(e, t, n, l), t.child);
}
function Qs(e, t, n, r, l) {
  if (ve(n)) {
    var i = !0;
    Xr(t);
  } else i = !1;
  if (rn(t, l), t.stateNode === null) Or(e, t), Hu(t, n, r), Oi(t, n, r, l), r = !0;
  else if (e === null) {
    var o = t.stateNode, s = t.memoizedProps;
    o.props = s;
    var a = o.context, d = n.contextType;
    typeof d == "object" && d !== null ? d = Le(d) : (d = ve(n) ? Mt : ue.current, d = sn(t, d));
    var m = n.getDerivedStateFromProps, h = typeof m == "function" || typeof o.getSnapshotBeforeUpdate == "function";
    h || typeof o.UNSAFE_componentWillReceiveProps != "function" && typeof o.componentWillReceiveProps != "function" || (s !== r || a !== d) && As(t, o, r, d), it = !1;
    var g = t.memoizedState;
    o.state = g, el(t, r, o, l), a = t.memoizedState, s !== r || g !== a || ge.current || it ? (typeof m == "function" && ($i(t, n, m, r), a = t.memoizedState), (s = it || Is(t, n, s, r, g, a, d)) ? (h || typeof o.UNSAFE_componentWillMount != "function" && typeof o.componentWillMount != "function" || (typeof o.componentWillMount == "function" && o.componentWillMount(), typeof o.UNSAFE_componentWillMount == "function" && o.UNSAFE_componentWillMount()), typeof o.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof o.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = a), o.props = r, o.state = a, o.context = d, r = s) : (typeof o.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
  } else {
    o = t.stateNode, Nu(e, t), s = t.memoizedProps, d = t.type === t.elementType ? s : $e(t.type, s), o.props = d, h = t.pendingProps, g = o.context, a = n.contextType, typeof a == "object" && a !== null ? a = Le(a) : (a = ve(n) ? Mt : ue.current, a = sn(t, a));
    var y = n.getDerivedStateFromProps;
    (m = typeof y == "function" || typeof o.getSnapshotBeforeUpdate == "function") || typeof o.UNSAFE_componentWillReceiveProps != "function" && typeof o.componentWillReceiveProps != "function" || (s !== h || g !== a) && As(t, o, r, a), it = !1, g = t.memoizedState, o.state = g, el(t, r, o, l);
    var k = t.memoizedState;
    s !== h || g !== k || ge.current || it ? (typeof y == "function" && ($i(t, n, y, r), k = t.memoizedState), (d = it || Is(t, n, d, r, g, k, a) || !1) ? (m || typeof o.UNSAFE_componentWillUpdate != "function" && typeof o.componentWillUpdate != "function" || (typeof o.componentWillUpdate == "function" && o.componentWillUpdate(r, k, a), typeof o.UNSAFE_componentWillUpdate == "function" && o.UNSAFE_componentWillUpdate(r, k, a)), typeof o.componentDidUpdate == "function" && (t.flags |= 4), typeof o.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof o.componentDidUpdate != "function" || s === e.memoizedProps && g === e.memoizedState || (t.flags |= 4), typeof o.getSnapshotBeforeUpdate != "function" || s === e.memoizedProps && g === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = k), o.props = r, o.state = k, o.context = a, r = d) : (typeof o.componentDidUpdate != "function" || s === e.memoizedProps && g === e.memoizedState || (t.flags |= 4), typeof o.getSnapshotBeforeUpdate != "function" || s === e.memoizedProps && g === e.memoizedState || (t.flags |= 1024), r = !1);
  }
  return Ii(e, t, n, r, i, l);
}
function Ii(e, t, n, r, l, i) {
  Xu(e, t);
  var o = (t.flags & 128) !== 0;
  if (!r && !o) return l && Ts(t, n, !1), et(e, t, i);
  r = t.stateNode, Tf.current = t;
  var s = o && typeof n.getDerivedStateFromError != "function" ? null : r.render();
  return t.flags |= 1, e !== null && o ? (t.child = un(t, e.child, null, i), t.child = un(t, null, s, i)) : ce(e, t, s, i), t.memoizedState = r.state, l && Ts(t, n, !0), t.child;
}
function Zu(e) {
  var t = e.stateNode;
  t.pendingContext ? Ps(e, t.pendingContext, t.pendingContext !== t.context) : t.context && Ps(e, t.context, !1), zo(e, t.containerInfo);
}
function Ks(e, t, n, r, l) {
  return an(), So(l), t.flags |= 256, ce(e, t, n, r), t.child;
}
var Ai = { dehydrated: null, treeContext: null, retryLane: 0 };
function Ui(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function Ju(e, t, n) {
  var r = t.pendingProps, l = H.current, i = !1, o = (t.flags & 128) !== 0, s;
  if ((s = o) || (s = e !== null && e.memoizedState === null ? !1 : (l & 2) !== 0), s ? (i = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (l |= 1), I(H, l & 1), e === null)
    return Ri(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? (t.mode & 1 ? e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824 : t.lanes = 1, null) : (o = r.children, e = r.fallback, i ? (r = t.mode, i = t.child, o = { mode: "hidden", children: o }, !(r & 1) && i !== null ? (i.childLanes = 0, i.pendingProps = o) : i = wl(o, r, 0, null), e = Rt(e, r, n, null), i.return = t, e.return = t, i.sibling = e, t.child = i, t.child.memoizedState = Ui(n), t.memoizedState = Ai, e) : Do(t, o));
  if (l = e.memoizedState, l !== null && (s = l.dehydrated, s !== null)) return Lf(e, t, o, r, s, l, n);
  if (i) {
    i = r.fallback, o = t.mode, l = e.child, s = l.sibling;
    var a = { mode: "hidden", children: r.children };
    return !(o & 1) && t.child !== l ? (r = t.child, r.childLanes = 0, r.pendingProps = a, t.deletions = null) : (r = vt(l, a), r.subtreeFlags = l.subtreeFlags & 14680064), s !== null ? i = vt(s, i) : (i = Rt(i, o, n, null), i.flags |= 2), i.return = t, r.return = t, r.sibling = i, t.child = r, r = i, i = t.child, o = e.child.memoizedState, o = o === null ? Ui(n) : { baseLanes: o.baseLanes | n, cachePool: null, transitions: o.transitions }, i.memoizedState = o, i.childLanes = e.childLanes & ~n, t.memoizedState = Ai, r;
  }
  return i = e.child, e = i.sibling, r = vt(i, { mode: "visible", children: r.children }), !(t.mode & 1) && (r.lanes = n), r.return = t, r.sibling = null, e !== null && (n = t.deletions, n === null ? (t.deletions = [e], t.flags |= 16) : n.push(e)), t.child = r, t.memoizedState = null, r;
}
function Do(e, t) {
  return t = wl({ mode: "visible", children: t }, e.mode, 0, null), t.return = e, e.child = t;
}
function Nr(e, t, n, r) {
  return r !== null && So(r), un(t, e.child, null, n), e = Do(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
}
function Lf(e, t, n, r, l, i, o) {
  if (n)
    return t.flags & 256 ? (t.flags &= -257, r = Jl(Error(N(422))), Nr(e, t, o, r)) : t.memoizedState !== null ? (t.child = e.child, t.flags |= 128, null) : (i = r.fallback, l = t.mode, r = wl({ mode: "visible", children: r.children }, l, 0, null), i = Rt(i, l, o, null), i.flags |= 2, r.return = t, i.return = t, r.sibling = i, t.child = r, t.mode & 1 && un(t, e.child, null, o), t.child.memoizedState = Ui(o), t.memoizedState = Ai, i);
  if (!(t.mode & 1)) return Nr(e, t, o, null);
  if (l.data === "$!") {
    if (r = l.nextSibling && l.nextSibling.dataset, r) var s = r.dgst;
    return r = s, i = Error(N(419)), r = Jl(i, r, void 0), Nr(e, t, o, r);
  }
  if (s = (o & e.childLanes) !== 0, me || s) {
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
      l = l & (r.suspendedLanes | o) ? 0 : l, l !== 0 && l !== i.retryLane && (i.retryLane = l, qe(e, l), Ie(r, e, l, -1));
    }
    return Wo(), r = Jl(Error(N(421))), Nr(e, t, o, r);
  }
  return l.data === "$?" ? (t.flags |= 128, t.child = e.child, t = Hf.bind(null, e), l._reactRetry = t, null) : (e = i.treeContext, ke = pt(l.nextSibling), Se = t, B = !0, De = null, e !== null && (Ce[Ee++] = Ye, Ce[Ee++] = Xe, Ce[Ee++] = $t, Ye = e.id, Xe = e.overflow, $t = t), t = Do(t, r.children), t.flags |= 4096, t);
}
function Gs(e, t, n) {
  e.lanes |= t;
  var r = e.alternate;
  r !== null && (r.lanes |= t), Mi(e.return, t, n);
}
function bl(e, t, n, r, l) {
  var i = e.memoizedState;
  i === null ? e.memoizedState = { isBackwards: t, rendering: null, renderingStartTime: 0, last: r, tail: n, tailMode: l } : (i.isBackwards = t, i.rendering = null, i.renderingStartTime = 0, i.last = r, i.tail = n, i.tailMode = l);
}
function bu(e, t, n) {
  var r = t.pendingProps, l = r.revealOrder, i = r.tail;
  if (ce(e, t, r.children, n), r = H.current, r & 2) r = r & 1 | 2, t.flags |= 128;
  else {
    if (e !== null && e.flags & 128) e: for (e = t.child; e !== null; ) {
      if (e.tag === 13) e.memoizedState !== null && Gs(e, n, t);
      else if (e.tag === 19) Gs(e, n, t);
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
  if (I(H, r), !(t.mode & 1)) t.memoizedState = null;
  else switch (l) {
    case "forwards":
      for (n = t.child, l = null; n !== null; ) e = n.alternate, e !== null && tl(e) === null && (l = n), n = n.sibling;
      n = l, n === null ? (l = t.child, t.child = null) : (l = n.sibling, n.sibling = null), bl(t, !1, l, n, i);
      break;
    case "backwards":
      for (n = null, l = t.child, t.child = null; l !== null; ) {
        if (e = l.alternate, e !== null && tl(e) === null) {
          t.child = l;
          break;
        }
        e = l.sibling, l.sibling = n, n = l, l = e;
      }
      bl(t, !0, n, null, i);
      break;
    case "together":
      bl(t, !1, null, null, void 0);
      break;
    default:
      t.memoizedState = null;
  }
  return t.child;
}
function Or(e, t) {
  !(t.mode & 1) && e !== null && (e.alternate = null, t.alternate = null, t.flags |= 2);
}
function et(e, t, n) {
  if (e !== null && (t.dependencies = e.dependencies), Dt |= t.lanes, !(n & t.childLanes)) return null;
  if (e !== null && t.child !== e.child) throw Error(N(153));
  if (t.child !== null) {
    for (e = t.child, n = vt(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null; ) e = e.sibling, n = n.sibling = vt(e, e.pendingProps), n.return = t;
    n.sibling = null;
  }
  return t.child;
}
function Rf(e, t, n) {
  switch (t.tag) {
    case 3:
      Zu(t), an();
      break;
    case 5:
      ju(t);
      break;
    case 1:
      ve(t.type) && Xr(t);
      break;
    case 4:
      zo(t, t.stateNode.containerInfo);
      break;
    case 10:
      var r = t.type._context, l = t.memoizedProps.value;
      I(br, r._currentValue), r._currentValue = l;
      break;
    case 13:
      if (r = t.memoizedState, r !== null)
        return r.dehydrated !== null ? (I(H, H.current & 1), t.flags |= 128, null) : n & t.child.childLanes ? Ju(e, t, n) : (I(H, H.current & 1), e = et(e, t, n), e !== null ? e.sibling : null);
      I(H, H.current & 1);
      break;
    case 19:
      if (r = (n & t.childLanes) !== 0, e.flags & 128) {
        if (r) return bu(e, t, n);
        t.flags |= 128;
      }
      if (l = t.memoizedState, l !== null && (l.rendering = null, l.tail = null, l.lastEffect = null), I(H, H.current), r) break;
      return null;
    case 22:
    case 23:
      return t.lanes = 0, Yu(e, t, n);
  }
  return et(e, t, n);
}
var qu, Bi, ec, tc;
qu = function(e, t) {
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
Bi = function() {
};
ec = function(e, t, n, r) {
  var l = e.memoizedProps;
  if (l !== r) {
    e = t.stateNode, Pt(Qe.current);
    var i = null;
    switch (n) {
      case "input":
        l = ui(e, l), r = ui(e, r), i = [];
        break;
      case "select":
        l = K({}, l, { value: void 0 }), r = K({}, r, { value: void 0 }), i = [];
        break;
      case "textarea":
        l = fi(e, l), r = fi(e, r), i = [];
        break;
      default:
        typeof l.onClick != "function" && typeof r.onClick == "function" && (e.onclick = Gr);
    }
    hi(n, r);
    var o;
    n = null;
    for (d in l) if (!r.hasOwnProperty(d) && l.hasOwnProperty(d) && l[d] != null) if (d === "style") {
      var s = l[d];
      for (o in s) s.hasOwnProperty(o) && (n || (n = {}), n[o] = "");
    } else d !== "dangerouslySetInnerHTML" && d !== "children" && d !== "suppressContentEditableWarning" && d !== "suppressHydrationWarning" && d !== "autoFocus" && (Un.hasOwnProperty(d) ? i || (i = []) : (i = i || []).push(d, null));
    for (d in r) {
      var a = r[d];
      if (s = l != null ? l[d] : void 0, r.hasOwnProperty(d) && a !== s && (a != null || s != null)) if (d === "style") if (s) {
        for (o in s) !s.hasOwnProperty(o) || a && a.hasOwnProperty(o) || (n || (n = {}), n[o] = "");
        for (o in a) a.hasOwnProperty(o) && s[o] !== a[o] && (n || (n = {}), n[o] = a[o]);
      } else n || (i || (i = []), i.push(
        d,
        n
      )), n = a;
      else d === "dangerouslySetInnerHTML" ? (a = a ? a.__html : void 0, s = s ? s.__html : void 0, a != null && s !== a && (i = i || []).push(d, a)) : d === "children" ? typeof a != "string" && typeof a != "number" || (i = i || []).push(d, "" + a) : d !== "suppressContentEditableWarning" && d !== "suppressHydrationWarning" && (Un.hasOwnProperty(d) ? (a != null && d === "onScroll" && A("scroll", e), i || s === a || (i = [])) : (i = i || []).push(d, a));
    }
    n && (i = i || []).push("style", n);
    var d = i;
    (t.updateQueue = d) && (t.flags |= 4);
  }
};
tc = function(e, t, n, r) {
  n !== r && (t.flags |= 4);
};
function _n(e, t) {
  if (!B) switch (e.tailMode) {
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
function se(e) {
  var t = e.alternate !== null && e.alternate.child === e.child, n = 0, r = 0;
  if (t) for (var l = e.child; l !== null; ) n |= l.lanes | l.childLanes, r |= l.subtreeFlags & 14680064, r |= l.flags & 14680064, l.return = e, l = l.sibling;
  else for (l = e.child; l !== null; ) n |= l.lanes | l.childLanes, r |= l.subtreeFlags, r |= l.flags, l.return = e, l = l.sibling;
  return e.subtreeFlags |= r, e.childLanes = n, t;
}
function Mf(e, t, n) {
  var r = t.pendingProps;
  switch (ko(t), t.tag) {
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
      return se(t), null;
    case 1:
      return ve(t.type) && Yr(), se(t), null;
    case 3:
      return r = t.stateNode, cn(), U(ge), U(ue), To(), r.pendingContext && (r.context = r.pendingContext, r.pendingContext = null), (e === null || e.child === null) && (kr(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, De !== null && (Xi(De), De = null))), Bi(e, t), se(t), null;
    case 5:
      Po(t);
      var l = Pt(bn.current);
      if (n = t.type, e !== null && t.stateNode != null) ec(e, t, n, r, l), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
      else {
        if (!r) {
          if (t.stateNode === null) throw Error(N(166));
          return se(t), null;
        }
        if (e = Pt(Qe.current), kr(t)) {
          r = t.stateNode, n = t.type;
          var i = t.memoizedProps;
          switch (r[Ve] = t, r[Zn] = i, e = (t.mode & 1) !== 0, n) {
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
              for (l = 0; l < Tn.length; l++) A(Tn[l], r);
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
              ns(r, i), A("invalid", r);
              break;
            case "select":
              r._wrapperState = { wasMultiple: !!i.multiple }, A("invalid", r);
              break;
            case "textarea":
              ls(r, i), A("invalid", r);
          }
          hi(n, i), l = null;
          for (var o in i) if (i.hasOwnProperty(o)) {
            var s = i[o];
            o === "children" ? typeof s == "string" ? r.textContent !== s && (i.suppressHydrationWarning !== !0 && wr(r.textContent, s, e), l = ["children", s]) : typeof s == "number" && r.textContent !== "" + s && (i.suppressHydrationWarning !== !0 && wr(
              r.textContent,
              s,
              e
            ), l = ["children", "" + s]) : Un.hasOwnProperty(o) && s != null && o === "onScroll" && A("scroll", r);
          }
          switch (n) {
            case "input":
              fr(r), rs(r, i, !0);
              break;
            case "textarea":
              fr(r), is(r);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof i.onClick == "function" && (r.onclick = Gr);
          }
          r = l, t.updateQueue = r, r !== null && (t.flags |= 4);
        } else {
          o = l.nodeType === 9 ? l : l.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = Pa(n)), e === "http://www.w3.org/1999/xhtml" ? n === "script" ? (e = o.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof r.is == "string" ? e = o.createElement(n, { is: r.is }) : (e = o.createElement(n), n === "select" && (o = e, r.multiple ? o.multiple = !0 : r.size && (o.size = r.size))) : e = o.createElementNS(e, n), e[Ve] = t, e[Zn] = r, qu(e, t, !1, !1), t.stateNode = e;
          e: {
            switch (o = mi(n, r), n) {
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
                for (l = 0; l < Tn.length; l++) A(Tn[l], e);
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
                ns(e, r), l = ui(e, r), A("invalid", e);
                break;
              case "option":
                l = r;
                break;
              case "select":
                e._wrapperState = { wasMultiple: !!r.multiple }, l = K({}, r, { value: void 0 }), A("invalid", e);
                break;
              case "textarea":
                ls(e, r), l = fi(e, r), A("invalid", e);
                break;
              default:
                l = r;
            }
            hi(n, l), s = l;
            for (i in s) if (s.hasOwnProperty(i)) {
              var a = s[i];
              i === "style" ? Ra(e, a) : i === "dangerouslySetInnerHTML" ? (a = a ? a.__html : void 0, a != null && Ta(e, a)) : i === "children" ? typeof a == "string" ? (n !== "textarea" || a !== "") && Bn(e, a) : typeof a == "number" && Bn(e, "" + a) : i !== "suppressContentEditableWarning" && i !== "suppressHydrationWarning" && i !== "autoFocus" && (Un.hasOwnProperty(i) ? a != null && i === "onScroll" && A("scroll", e) : a != null && io(e, i, a, o));
            }
            switch (n) {
              case "input":
                fr(e), rs(e, r, !1);
                break;
              case "textarea":
                fr(e), is(e);
                break;
              case "option":
                r.value != null && e.setAttribute("value", "" + yt(r.value));
                break;
              case "select":
                e.multiple = !!r.multiple, i = r.value, i != null ? qt(e, !!r.multiple, i, !1) : r.defaultValue != null && qt(
                  e,
                  !!r.multiple,
                  r.defaultValue,
                  !0
                );
                break;
              default:
                typeof l.onClick == "function" && (e.onclick = Gr);
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
      return se(t), null;
    case 6:
      if (e && t.stateNode != null) tc(e, t, e.memoizedProps, r);
      else {
        if (typeof r != "string" && t.stateNode === null) throw Error(N(166));
        if (n = Pt(bn.current), Pt(Qe.current), kr(t)) {
          if (r = t.stateNode, n = t.memoizedProps, r[Ve] = t, (i = r.nodeValue !== n) && (e = Se, e !== null)) switch (e.tag) {
            case 3:
              wr(r.nodeValue, n, (e.mode & 1) !== 0);
              break;
            case 5:
              e.memoizedProps.suppressHydrationWarning !== !0 && wr(r.nodeValue, n, (e.mode & 1) !== 0);
          }
          i && (t.flags |= 4);
        } else r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r), r[Ve] = t, t.stateNode = r;
      }
      return se(t), null;
    case 13:
      if (U(H), r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
        if (B && ke !== null && t.mode & 1 && !(t.flags & 128)) xu(), an(), t.flags |= 98560, i = !1;
        else if (i = kr(t), r !== null && r.dehydrated !== null) {
          if (e === null) {
            if (!i) throw Error(N(318));
            if (i = t.memoizedState, i = i !== null ? i.dehydrated : null, !i) throw Error(N(317));
            i[Ve] = t;
          } else an(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
          se(t), i = !1;
        } else De !== null && (Xi(De), De = null), i = !0;
        if (!i) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128 ? (t.lanes = n, t) : (r = r !== null, r !== (e !== null && e.memoizedState !== null) && r && (t.child.flags |= 8192, t.mode & 1 && (e === null || H.current & 1 ? b === 0 && (b = 3) : Wo())), t.updateQueue !== null && (t.flags |= 4), se(t), null);
    case 4:
      return cn(), Bi(e, t), e === null && Yn(t.stateNode.containerInfo), se(t), null;
    case 10:
      return _o(t.type._context), se(t), null;
    case 17:
      return ve(t.type) && Yr(), se(t), null;
    case 19:
      if (U(H), i = t.memoizedState, i === null) return se(t), null;
      if (r = (t.flags & 128) !== 0, o = i.rendering, o === null) if (r) _n(i, !1);
      else {
        if (b !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null; ) {
          if (o = tl(e), o !== null) {
            for (t.flags |= 128, _n(i, !1), r = o.updateQueue, r !== null && (t.updateQueue = r, t.flags |= 4), t.subtreeFlags = 0, r = n, n = t.child; n !== null; ) i = n, e = r, i.flags &= 14680066, o = i.alternate, o === null ? (i.childLanes = 0, i.lanes = e, i.child = null, i.subtreeFlags = 0, i.memoizedProps = null, i.memoizedState = null, i.updateQueue = null, i.dependencies = null, i.stateNode = null) : (i.childLanes = o.childLanes, i.lanes = o.lanes, i.child = o.child, i.subtreeFlags = 0, i.deletions = null, i.memoizedProps = o.memoizedProps, i.memoizedState = o.memoizedState, i.updateQueue = o.updateQueue, i.type = o.type, e = o.dependencies, i.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }), n = n.sibling;
            return I(H, H.current & 1 | 2), t.child;
          }
          e = e.sibling;
        }
        i.tail !== null && X() > fn && (t.flags |= 128, r = !0, _n(i, !1), t.lanes = 4194304);
      }
      else {
        if (!r) if (e = tl(o), e !== null) {
          if (t.flags |= 128, r = !0, n = e.updateQueue, n !== null && (t.updateQueue = n, t.flags |= 4), _n(i, !0), i.tail === null && i.tailMode === "hidden" && !o.alternate && !B) return se(t), null;
        } else 2 * X() - i.renderingStartTime > fn && n !== 1073741824 && (t.flags |= 128, r = !0, _n(i, !1), t.lanes = 4194304);
        i.isBackwards ? (o.sibling = t.child, t.child = o) : (n = i.last, n !== null ? n.sibling = o : t.child = o, i.last = o);
      }
      return i.tail !== null ? (t = i.tail, i.rendering = t, i.tail = t.sibling, i.renderingStartTime = X(), t.sibling = null, n = H.current, I(H, r ? n & 1 | 2 : n & 1), t) : (se(t), null);
    case 22:
    case 23:
      return Bo(), r = t.memoizedState !== null, e !== null && e.memoizedState !== null !== r && (t.flags |= 8192), r && t.mode & 1 ? we & 1073741824 && (se(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : se(t), null;
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(N(156, t.tag));
}
function $f(e, t) {
  switch (ko(t), t.tag) {
    case 1:
      return ve(t.type) && Yr(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 3:
      return cn(), U(ge), U(ue), To(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
    case 5:
      return Po(t), null;
    case 13:
      if (U(H), e = t.memoizedState, e !== null && e.dehydrated !== null) {
        if (t.alternate === null) throw Error(N(340));
        an();
      }
      return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 19:
      return U(H), null;
    case 4:
      return cn(), null;
    case 10:
      return _o(t.type._context), null;
    case 22:
    case 23:
      return Bo(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var jr = !1, ae = !1, Of = typeof WeakSet == "function" ? WeakSet : Set, E = null;
function Jt(e, t) {
  var n = e.ref;
  if (n !== null) if (typeof n == "function") try {
    n(null);
  } catch (r) {
    G(e, t, r);
  }
  else n.current = null;
}
function Wi(e, t, n) {
  try {
    n();
  } catch (r) {
    G(e, t, r);
  }
}
var Ys = !1;
function Df(e, t) {
  if (_i = Hr, e = ou(), xo(e)) {
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
        var o = 0, s = -1, a = -1, d = 0, m = 0, h = e, g = null;
        t: for (; ; ) {
          for (var y; h !== n || l !== 0 && h.nodeType !== 3 || (s = o + l), h !== i || r !== 0 && h.nodeType !== 3 || (a = o + r), h.nodeType === 3 && (o += h.nodeValue.length), (y = h.firstChild) !== null; )
            g = h, h = y;
          for (; ; ) {
            if (h === e) break t;
            if (g === n && ++d === l && (s = o), g === i && ++m === r && (a = o), (y = h.nextSibling) !== null) break;
            h = g, g = h.parentNode;
          }
          h = y;
        }
        n = s === -1 || a === -1 ? null : { start: s, end: a };
      } else n = null;
    }
    n = n || { start: 0, end: 0 };
  } else n = null;
  for (Ci = { focusedElem: e, selectionRange: n }, Hr = !1, E = t; E !== null; ) if (t = E, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null) e.return = t, E = e;
  else for (; E !== null; ) {
    t = E;
    try {
      var k = t.alternate;
      if (t.flags & 1024) switch (t.tag) {
        case 0:
        case 11:
        case 15:
          break;
        case 1:
          if (k !== null) {
            var S = k.memoizedProps, z = k.memoizedState, f = t.stateNode, c = f.getSnapshotBeforeUpdate(t.elementType === t.type ? S : $e(t.type, S), z);
            f.__reactInternalSnapshotBeforeUpdate = c;
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
          throw Error(N(163));
      }
    } catch (x) {
      G(t, t.return, x);
    }
    if (e = t.sibling, e !== null) {
      e.return = t.return, E = e;
      break;
    }
    E = t.return;
  }
  return k = Ys, Ys = !1, k;
}
function Fn(e, t, n) {
  var r = t.updateQueue;
  if (r = r !== null ? r.lastEffect : null, r !== null) {
    var l = r = r.next;
    do {
      if ((l.tag & e) === e) {
        var i = l.destroy;
        l.destroy = void 0, i !== void 0 && Wi(t, n, i);
      }
      l = l.next;
    } while (l !== r);
  }
}
function yl(e, t) {
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
function Vi(e) {
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
function nc(e) {
  var t = e.alternate;
  t !== null && (e.alternate = null, nc(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[Ve], delete t[Zn], delete t[Pi], delete t[yf], delete t[xf])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
}
function rc(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function Xs(e) {
  e: for (; ; ) {
    for (; e.sibling === null; ) {
      if (e.return === null || rc(e.return)) return null;
      e = e.return;
    }
    for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
      if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
      e.child.return = e, e = e.child;
    }
    if (!(e.flags & 2)) return e.stateNode;
  }
}
function Hi(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6) e = e.stateNode, t ? n.nodeType === 8 ? n.parentNode.insertBefore(e, t) : n.insertBefore(e, t) : (n.nodeType === 8 ? (t = n.parentNode, t.insertBefore(e, n)) : (t = n, t.appendChild(e)), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = Gr));
  else if (r !== 4 && (e = e.child, e !== null)) for (Hi(e, t, n), e = e.sibling; e !== null; ) Hi(e, t, n), e = e.sibling;
}
function Qi(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
  else if (r !== 4 && (e = e.child, e !== null)) for (Qi(e, t, n), e = e.sibling; e !== null; ) Qi(e, t, n), e = e.sibling;
}
var re = null, Oe = !1;
function rt(e, t, n) {
  for (n = n.child; n !== null; ) lc(e, t, n), n = n.sibling;
}
function lc(e, t, n) {
  if (He && typeof He.onCommitFiberUnmount == "function") try {
    He.onCommitFiberUnmount(cl, n);
  } catch {
  }
  switch (n.tag) {
    case 5:
      ae || Jt(n, t);
    case 6:
      var r = re, l = Oe;
      re = null, rt(e, t, n), re = r, Oe = l, re !== null && (Oe ? (e = re, n = n.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n)) : re.removeChild(n.stateNode));
      break;
    case 18:
      re !== null && (Oe ? (e = re, n = n.stateNode, e.nodeType === 8 ? Ql(e.parentNode, n) : e.nodeType === 1 && Ql(e, n), Qn(e)) : Ql(re, n.stateNode));
      break;
    case 4:
      r = re, l = Oe, re = n.stateNode.containerInfo, Oe = !0, rt(e, t, n), re = r, Oe = l;
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (!ae && (r = n.updateQueue, r !== null && (r = r.lastEffect, r !== null))) {
        l = r = r.next;
        do {
          var i = l, o = i.destroy;
          i = i.tag, o !== void 0 && (i & 2 || i & 4) && Wi(n, t, o), l = l.next;
        } while (l !== r);
      }
      rt(e, t, n);
      break;
    case 1:
      if (!ae && (Jt(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function")) try {
        r.props = n.memoizedProps, r.state = n.memoizedState, r.componentWillUnmount();
      } catch (s) {
        G(n, t, s);
      }
      rt(e, t, n);
      break;
    case 21:
      rt(e, t, n);
      break;
    case 22:
      n.mode & 1 ? (ae = (r = ae) || n.memoizedState !== null, rt(e, t, n), ae = r) : rt(e, t, n);
      break;
    default:
      rt(e, t, n);
  }
}
function Zs(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    n === null && (n = e.stateNode = new Of()), t.forEach(function(r) {
      var l = Qf.bind(null, e, r);
      n.has(r) || (n.add(r), r.then(l, l));
    });
  }
}
function Me(e, t) {
  var n = t.deletions;
  if (n !== null) for (var r = 0; r < n.length; r++) {
    var l = n[r];
    try {
      var i = e, o = t, s = o;
      e: for (; s !== null; ) {
        switch (s.tag) {
          case 5:
            re = s.stateNode, Oe = !1;
            break e;
          case 3:
            re = s.stateNode.containerInfo, Oe = !0;
            break e;
          case 4:
            re = s.stateNode.containerInfo, Oe = !0;
            break e;
        }
        s = s.return;
      }
      if (re === null) throw Error(N(160));
      lc(i, o, l), re = null, Oe = !1;
      var a = l.alternate;
      a !== null && (a.return = null), l.return = null;
    } catch (d) {
      G(l, t, d);
    }
  }
  if (t.subtreeFlags & 12854) for (t = t.child; t !== null; ) ic(t, e), t = t.sibling;
}
function ic(e, t) {
  var n = e.alternate, r = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if (Me(t, e), Be(e), r & 4) {
        try {
          Fn(3, e, e.return), yl(3, e);
        } catch (S) {
          G(e, e.return, S);
        }
        try {
          Fn(5, e, e.return);
        } catch (S) {
          G(e, e.return, S);
        }
      }
      break;
    case 1:
      Me(t, e), Be(e), r & 512 && n !== null && Jt(n, n.return);
      break;
    case 5:
      if (Me(t, e), Be(e), r & 512 && n !== null && Jt(n, n.return), e.flags & 32) {
        var l = e.stateNode;
        try {
          Bn(l, "");
        } catch (S) {
          G(e, e.return, S);
        }
      }
      if (r & 4 && (l = e.stateNode, l != null)) {
        var i = e.memoizedProps, o = n !== null ? n.memoizedProps : i, s = e.type, a = e.updateQueue;
        if (e.updateQueue = null, a !== null) try {
          s === "input" && i.type === "radio" && i.name != null && Ea(l, i), mi(s, o);
          var d = mi(s, i);
          for (o = 0; o < a.length; o += 2) {
            var m = a[o], h = a[o + 1];
            m === "style" ? Ra(l, h) : m === "dangerouslySetInnerHTML" ? Ta(l, h) : m === "children" ? Bn(l, h) : io(l, m, h, d);
          }
          switch (s) {
            case "input":
              ci(l, i);
              break;
            case "textarea":
              za(l, i);
              break;
            case "select":
              var g = l._wrapperState.wasMultiple;
              l._wrapperState.wasMultiple = !!i.multiple;
              var y = i.value;
              y != null ? qt(l, !!i.multiple, y, !1) : g !== !!i.multiple && (i.defaultValue != null ? qt(
                l,
                !!i.multiple,
                i.defaultValue,
                !0
              ) : qt(l, !!i.multiple, i.multiple ? [] : "", !1));
          }
          l[Zn] = i;
        } catch (S) {
          G(e, e.return, S);
        }
      }
      break;
    case 6:
      if (Me(t, e), Be(e), r & 4) {
        if (e.stateNode === null) throw Error(N(162));
        l = e.stateNode, i = e.memoizedProps;
        try {
          l.nodeValue = i;
        } catch (S) {
          G(e, e.return, S);
        }
      }
      break;
    case 3:
      if (Me(t, e), Be(e), r & 4 && n !== null && n.memoizedState.isDehydrated) try {
        Qn(t.containerInfo);
      } catch (S) {
        G(e, e.return, S);
      }
      break;
    case 4:
      Me(t, e), Be(e);
      break;
    case 13:
      Me(t, e), Be(e), l = e.child, l.flags & 8192 && (i = l.memoizedState !== null, l.stateNode.isHidden = i, !i || l.alternate !== null && l.alternate.memoizedState !== null || (Ao = X())), r & 4 && Zs(e);
      break;
    case 22:
      if (m = n !== null && n.memoizedState !== null, e.mode & 1 ? (ae = (d = ae) || m, Me(t, e), ae = d) : Me(t, e), Be(e), r & 8192) {
        if (d = e.memoizedState !== null, (e.stateNode.isHidden = d) && !m && e.mode & 1) for (E = e, m = e.child; m !== null; ) {
          for (h = E = m; E !== null; ) {
            switch (g = E, y = g.child, g.tag) {
              case 0:
              case 11:
              case 14:
              case 15:
                Fn(4, g, g.return);
                break;
              case 1:
                Jt(g, g.return);
                var k = g.stateNode;
                if (typeof k.componentWillUnmount == "function") {
                  r = g, n = g.return;
                  try {
                    t = r, k.props = t.memoizedProps, k.state = t.memoizedState, k.componentWillUnmount();
                  } catch (S) {
                    G(r, n, S);
                  }
                }
                break;
              case 5:
                Jt(g, g.return);
                break;
              case 22:
                if (g.memoizedState !== null) {
                  bs(h);
                  continue;
                }
            }
            y !== null ? (y.return = g, E = y) : bs(h);
          }
          m = m.sibling;
        }
        e: for (m = null, h = e; ; ) {
          if (h.tag === 5) {
            if (m === null) {
              m = h;
              try {
                l = h.stateNode, d ? (i = l.style, typeof i.setProperty == "function" ? i.setProperty("display", "none", "important") : i.display = "none") : (s = h.stateNode, a = h.memoizedProps.style, o = a != null && a.hasOwnProperty("display") ? a.display : null, s.style.display = La("display", o));
              } catch (S) {
                G(e, e.return, S);
              }
            }
          } else if (h.tag === 6) {
            if (m === null) try {
              h.stateNode.nodeValue = d ? "" : h.memoizedProps;
            } catch (S) {
              G(e, e.return, S);
            }
          } else if ((h.tag !== 22 && h.tag !== 23 || h.memoizedState === null || h === e) && h.child !== null) {
            h.child.return = h, h = h.child;
            continue;
          }
          if (h === e) break e;
          for (; h.sibling === null; ) {
            if (h.return === null || h.return === e) break e;
            m === h && (m = null), h = h.return;
          }
          m === h && (m = null), h.sibling.return = h.return, h = h.sibling;
        }
      }
      break;
    case 19:
      Me(t, e), Be(e), r & 4 && Zs(e);
      break;
    case 21:
      break;
    default:
      Me(
        t,
        e
      ), Be(e);
  }
}
function Be(e) {
  var t = e.flags;
  if (t & 2) {
    try {
      e: {
        for (var n = e.return; n !== null; ) {
          if (rc(n)) {
            var r = n;
            break e;
          }
          n = n.return;
        }
        throw Error(N(160));
      }
      switch (r.tag) {
        case 5:
          var l = r.stateNode;
          r.flags & 32 && (Bn(l, ""), r.flags &= -33);
          var i = Xs(e);
          Qi(e, i, l);
          break;
        case 3:
        case 4:
          var o = r.stateNode.containerInfo, s = Xs(e);
          Hi(e, s, o);
          break;
        default:
          throw Error(N(161));
      }
    } catch (a) {
      G(e, e.return, a);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function Ff(e, t, n) {
  E = e, oc(e);
}
function oc(e, t, n) {
  for (var r = (e.mode & 1) !== 0; E !== null; ) {
    var l = E, i = l.child;
    if (l.tag === 22 && r) {
      var o = l.memoizedState !== null || jr;
      if (!o) {
        var s = l.alternate, a = s !== null && s.memoizedState !== null || ae;
        s = jr;
        var d = ae;
        if (jr = o, (ae = a) && !d) for (E = l; E !== null; ) o = E, a = o.child, o.tag === 22 && o.memoizedState !== null ? qs(l) : a !== null ? (a.return = o, E = a) : qs(l);
        for (; i !== null; ) E = i, oc(i), i = i.sibling;
        E = l, jr = s, ae = d;
      }
      Js(e);
    } else l.subtreeFlags & 8772 && i !== null ? (i.return = l, E = i) : Js(e);
  }
}
function Js(e) {
  for (; E !== null; ) {
    var t = E;
    if (t.flags & 8772) {
      var n = t.alternate;
      try {
        if (t.flags & 8772) switch (t.tag) {
          case 0:
          case 11:
          case 15:
            ae || yl(5, t);
            break;
          case 1:
            var r = t.stateNode;
            if (t.flags & 4 && !ae) if (n === null) r.componentDidMount();
            else {
              var l = t.elementType === t.type ? n.memoizedProps : $e(t.type, n.memoizedProps);
              r.componentDidUpdate(l, n.memoizedState, r.__reactInternalSnapshotBeforeUpdate);
            }
            var i = t.updateQueue;
            i !== null && Os(t, i, r);
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
              Os(t, o, n);
            }
            break;
          case 5:
            var s = t.stateNode;
            if (n === null && t.flags & 4) {
              n = s;
              var a = t.memoizedProps;
              switch (t.type) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  a.autoFocus && n.focus();
                  break;
                case "img":
                  a.src && (n.src = a.src);
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
              var d = t.alternate;
              if (d !== null) {
                var m = d.memoizedState;
                if (m !== null) {
                  var h = m.dehydrated;
                  h !== null && Qn(h);
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
            throw Error(N(163));
        }
        ae || t.flags & 512 && Vi(t);
      } catch (g) {
        G(t, t.return, g);
      }
    }
    if (t === e) {
      E = null;
      break;
    }
    if (n = t.sibling, n !== null) {
      n.return = t.return, E = n;
      break;
    }
    E = t.return;
  }
}
function bs(e) {
  for (; E !== null; ) {
    var t = E;
    if (t === e) {
      E = null;
      break;
    }
    var n = t.sibling;
    if (n !== null) {
      n.return = t.return, E = n;
      break;
    }
    E = t.return;
  }
}
function qs(e) {
  for (; E !== null; ) {
    var t = E;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return;
          try {
            yl(4, t);
          } catch (a) {
            G(t, n, a);
          }
          break;
        case 1:
          var r = t.stateNode;
          if (typeof r.componentDidMount == "function") {
            var l = t.return;
            try {
              r.componentDidMount();
            } catch (a) {
              G(t, l, a);
            }
          }
          var i = t.return;
          try {
            Vi(t);
          } catch (a) {
            G(t, i, a);
          }
          break;
        case 5:
          var o = t.return;
          try {
            Vi(t);
          } catch (a) {
            G(t, o, a);
          }
      }
    } catch (a) {
      G(t, t.return, a);
    }
    if (t === e) {
      E = null;
      break;
    }
    var s = t.sibling;
    if (s !== null) {
      s.return = t.return, E = s;
      break;
    }
    E = t.return;
  }
}
var If = Math.ceil, ll = tt.ReactCurrentDispatcher, Fo = tt.ReactCurrentOwner, Pe = tt.ReactCurrentBatchConfig, $ = 0, te = null, Z = null, le = 0, we = 0, bt = kt(0), b = 0, nr = null, Dt = 0, xl = 0, Io = 0, In = null, he = null, Ao = 0, fn = 1 / 0, Ke = null, il = !1, Ki = null, mt = null, _r = !1, ut = null, ol = 0, An = 0, Gi = null, Dr = -1, Fr = 0;
function de() {
  return $ & 6 ? X() : Dr !== -1 ? Dr : Dr = X();
}
function gt(e) {
  return e.mode & 1 ? $ & 2 && le !== 0 ? le & -le : kf.transition !== null ? (Fr === 0 && (Fr = Ha()), Fr) : (e = O, e !== 0 || (e = window.event, e = e === void 0 ? 16 : Ja(e.type)), e) : 1;
}
function Ie(e, t, n, r) {
  if (50 < An) throw An = 0, Gi = null, Error(N(185));
  lr(e, n, r), (!($ & 2) || e !== te) && (e === te && (!($ & 2) && (xl |= n), b === 4 && st(e, le)), ye(e, r), n === 1 && $ === 0 && !(t.mode & 1) && (fn = X() + 500, ml && St()));
}
function ye(e, t) {
  var n = e.callbackNode;
  wd(e, t);
  var r = Vr(e, e === te ? le : 0);
  if (r === 0) n !== null && as(n), e.callbackNode = null, e.callbackPriority = 0;
  else if (t = r & -r, e.callbackPriority !== t) {
    if (n != null && as(n), t === 1) e.tag === 0 ? wf(ea.bind(null, e)) : gu(ea.bind(null, e)), gf(function() {
      !($ & 6) && St();
    }), n = null;
    else {
      switch (Qa(r)) {
        case 1:
          n = co;
          break;
        case 4:
          n = Wa;
          break;
        case 16:
          n = Wr;
          break;
        case 536870912:
          n = Va;
          break;
        default:
          n = Wr;
      }
      n = hc(n, sc.bind(null, e));
    }
    e.callbackPriority = t, e.callbackNode = n;
  }
}
function sc(e, t) {
  if (Dr = -1, Fr = 0, $ & 6) throw Error(N(327));
  var n = e.callbackNode;
  if (ln() && e.callbackNode !== n) return null;
  var r = Vr(e, e === te ? le : 0);
  if (r === 0) return null;
  if (r & 30 || r & e.expiredLanes || t) t = sl(e, r);
  else {
    t = r;
    var l = $;
    $ |= 2;
    var i = uc();
    (te !== e || le !== t) && (Ke = null, fn = X() + 500, Lt(e, t));
    do
      try {
        Bf();
        break;
      } catch (s) {
        ac(e, s);
      }
    while (!0);
    jo(), ll.current = i, $ = l, Z !== null ? t = 0 : (te = null, le = 0, t = b);
  }
  if (t !== 0) {
    if (t === 2 && (l = wi(e), l !== 0 && (r = l, t = Yi(e, l))), t === 1) throw n = nr, Lt(e, 0), st(e, r), ye(e, X()), n;
    if (t === 6) st(e, r);
    else {
      if (l = e.current.alternate, !(r & 30) && !Af(l) && (t = sl(e, r), t === 2 && (i = wi(e), i !== 0 && (r = i, t = Yi(e, i))), t === 1)) throw n = nr, Lt(e, 0), st(e, r), ye(e, X()), n;
      switch (e.finishedWork = l, e.finishedLanes = r, t) {
        case 0:
        case 1:
          throw Error(N(345));
        case 2:
          Ct(e, he, Ke);
          break;
        case 3:
          if (st(e, r), (r & 130023424) === r && (t = Ao + 500 - X(), 10 < t)) {
            if (Vr(e, 0) !== 0) break;
            if (l = e.suspendedLanes, (l & r) !== r) {
              de(), e.pingedLanes |= e.suspendedLanes & l;
              break;
            }
            e.timeoutHandle = zi(Ct.bind(null, e, he, Ke), t);
            break;
          }
          Ct(e, he, Ke);
          break;
        case 4:
          if (st(e, r), (r & 4194240) === r) break;
          for (t = e.eventTimes, l = -1; 0 < r; ) {
            var o = 31 - Fe(r);
            i = 1 << o, o = t[o], o > l && (l = o), r &= ~i;
          }
          if (r = l, r = X() - r, r = (120 > r ? 120 : 480 > r ? 480 : 1080 > r ? 1080 : 1920 > r ? 1920 : 3e3 > r ? 3e3 : 4320 > r ? 4320 : 1960 * If(r / 1960)) - r, 10 < r) {
            e.timeoutHandle = zi(Ct.bind(null, e, he, Ke), r);
            break;
          }
          Ct(e, he, Ke);
          break;
        case 5:
          Ct(e, he, Ke);
          break;
        default:
          throw Error(N(329));
      }
    }
  }
  return ye(e, X()), e.callbackNode === n ? sc.bind(null, e) : null;
}
function Yi(e, t) {
  var n = In;
  return e.current.memoizedState.isDehydrated && (Lt(e, t).flags |= 256), e = sl(e, t), e !== 2 && (t = he, he = n, t !== null && Xi(t)), e;
}
function Xi(e) {
  he === null ? he = e : he.push.apply(he, e);
}
function Af(e) {
  for (var t = e; ; ) {
    if (t.flags & 16384) {
      var n = t.updateQueue;
      if (n !== null && (n = n.stores, n !== null)) for (var r = 0; r < n.length; r++) {
        var l = n[r], i = l.getSnapshot;
        l = l.value;
        try {
          if (!Ae(i(), l)) return !1;
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
function st(e, t) {
  for (t &= ~Io, t &= ~xl, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t; ) {
    var n = 31 - Fe(t), r = 1 << n;
    e[n] = -1, t &= ~r;
  }
}
function ea(e) {
  if ($ & 6) throw Error(N(327));
  ln();
  var t = Vr(e, 0);
  if (!(t & 1)) return ye(e, X()), null;
  var n = sl(e, t);
  if (e.tag !== 0 && n === 2) {
    var r = wi(e);
    r !== 0 && (t = r, n = Yi(e, r));
  }
  if (n === 1) throw n = nr, Lt(e, 0), st(e, t), ye(e, X()), n;
  if (n === 6) throw Error(N(345));
  return e.finishedWork = e.current.alternate, e.finishedLanes = t, Ct(e, he, Ke), ye(e, X()), null;
}
function Uo(e, t) {
  var n = $;
  $ |= 1;
  try {
    return e(t);
  } finally {
    $ = n, $ === 0 && (fn = X() + 500, ml && St());
  }
}
function Ft(e) {
  ut !== null && ut.tag === 0 && !($ & 6) && ln();
  var t = $;
  $ |= 1;
  var n = Pe.transition, r = O;
  try {
    if (Pe.transition = null, O = 1, e) return e();
  } finally {
    O = r, Pe.transition = n, $ = t, !($ & 6) && St();
  }
}
function Bo() {
  we = bt.current, U(bt);
}
function Lt(e, t) {
  e.finishedWork = null, e.finishedLanes = 0;
  var n = e.timeoutHandle;
  if (n !== -1 && (e.timeoutHandle = -1, mf(n)), Z !== null) for (n = Z.return; n !== null; ) {
    var r = n;
    switch (ko(r), r.tag) {
      case 1:
        r = r.type.childContextTypes, r != null && Yr();
        break;
      case 3:
        cn(), U(ge), U(ue), To();
        break;
      case 5:
        Po(r);
        break;
      case 4:
        cn();
        break;
      case 13:
        U(H);
        break;
      case 19:
        U(H);
        break;
      case 10:
        _o(r.type._context);
        break;
      case 22:
      case 23:
        Bo();
    }
    n = n.return;
  }
  if (te = e, Z = e = vt(e.current, null), le = we = t, b = 0, nr = null, Io = xl = Dt = 0, he = In = null, zt !== null) {
    for (t = 0; t < zt.length; t++) if (n = zt[t], r = n.interleaved, r !== null) {
      n.interleaved = null;
      var l = r.next, i = n.pending;
      if (i !== null) {
        var o = i.next;
        i.next = l, r.next = o;
      }
      n.pending = r;
    }
    zt = null;
  }
  return e;
}
function ac(e, t) {
  do {
    var n = Z;
    try {
      if (jo(), Mr.current = rl, nl) {
        for (var r = Q.memoizedState; r !== null; ) {
          var l = r.queue;
          l !== null && (l.pending = null), r = r.next;
        }
        nl = !1;
      }
      if (Ot = 0, ee = J = Q = null, Dn = !1, qn = 0, Fo.current = null, n === null || n.return === null) {
        b = 1, nr = t, Z = null;
        break;
      }
      e: {
        var i = e, o = n.return, s = n, a = t;
        if (t = le, s.flags |= 32768, a !== null && typeof a == "object" && typeof a.then == "function") {
          var d = a, m = s, h = m.tag;
          if (!(m.mode & 1) && (h === 0 || h === 11 || h === 15)) {
            var g = m.alternate;
            g ? (m.updateQueue = g.updateQueue, m.memoizedState = g.memoizedState, m.lanes = g.lanes) : (m.updateQueue = null, m.memoizedState = null);
          }
          var y = Bs(o);
          if (y !== null) {
            y.flags &= -257, Ws(y, o, s, i, t), y.mode & 1 && Us(i, d, t), t = y, a = d;
            var k = t.updateQueue;
            if (k === null) {
              var S = /* @__PURE__ */ new Set();
              S.add(a), t.updateQueue = S;
            } else k.add(a);
            break e;
          } else {
            if (!(t & 1)) {
              Us(i, d, t), Wo();
              break e;
            }
            a = Error(N(426));
          }
        } else if (B && s.mode & 1) {
          var z = Bs(o);
          if (z !== null) {
            !(z.flags & 65536) && (z.flags |= 256), Ws(z, o, s, i, t), So(dn(a, s));
            break e;
          }
        }
        i = a = dn(a, s), b !== 4 && (b = 2), In === null ? In = [i] : In.push(i), i = o;
        do {
          switch (i.tag) {
            case 3:
              i.flags |= 65536, t &= -t, i.lanes |= t;
              var f = Qu(i, a, t);
              $s(i, f);
              break e;
            case 1:
              s = a;
              var c = i.type, p = i.stateNode;
              if (!(i.flags & 128) && (typeof c.getDerivedStateFromError == "function" || p !== null && typeof p.componentDidCatch == "function" && (mt === null || !mt.has(p)))) {
                i.flags |= 65536, t &= -t, i.lanes |= t;
                var x = Ku(i, s, t);
                $s(i, x);
                break e;
              }
          }
          i = i.return;
        } while (i !== null);
      }
      dc(n);
    } catch (j) {
      t = j, Z === n && n !== null && (Z = n = n.return);
      continue;
    }
    break;
  } while (!0);
}
function uc() {
  var e = ll.current;
  return ll.current = rl, e === null ? rl : e;
}
function Wo() {
  (b === 0 || b === 3 || b === 2) && (b = 4), te === null || !(Dt & 268435455) && !(xl & 268435455) || st(te, le);
}
function sl(e, t) {
  var n = $;
  $ |= 2;
  var r = uc();
  (te !== e || le !== t) && (Ke = null, Lt(e, t));
  do
    try {
      Uf();
      break;
    } catch (l) {
      ac(e, l);
    }
  while (!0);
  if (jo(), $ = n, ll.current = r, Z !== null) throw Error(N(261));
  return te = null, le = 0, b;
}
function Uf() {
  for (; Z !== null; ) cc(Z);
}
function Bf() {
  for (; Z !== null && !dd(); ) cc(Z);
}
function cc(e) {
  var t = pc(e.alternate, e, we);
  e.memoizedProps = e.pendingProps, t === null ? dc(e) : Z = t, Fo.current = null;
}
function dc(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (e = t.return, t.flags & 32768) {
      if (n = $f(n, t), n !== null) {
        n.flags &= 32767, Z = n;
        return;
      }
      if (e !== null) e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
      else {
        b = 6, Z = null;
        return;
      }
    } else if (n = Mf(n, t, we), n !== null) {
      Z = n;
      return;
    }
    if (t = t.sibling, t !== null) {
      Z = t;
      return;
    }
    Z = t = e;
  } while (t !== null);
  b === 0 && (b = 5);
}
function Ct(e, t, n) {
  var r = O, l = Pe.transition;
  try {
    Pe.transition = null, O = 1, Wf(e, t, n, r);
  } finally {
    Pe.transition = l, O = r;
  }
  return null;
}
function Wf(e, t, n, r) {
  do
    ln();
  while (ut !== null);
  if ($ & 6) throw Error(N(327));
  n = e.finishedWork;
  var l = e.finishedLanes;
  if (n === null) return null;
  if (e.finishedWork = null, e.finishedLanes = 0, n === e.current) throw Error(N(177));
  e.callbackNode = null, e.callbackPriority = 0;
  var i = n.lanes | n.childLanes;
  if (kd(e, i), e === te && (Z = te = null, le = 0), !(n.subtreeFlags & 2064) && !(n.flags & 2064) || _r || (_r = !0, hc(Wr, function() {
    return ln(), null;
  })), i = (n.flags & 15990) !== 0, n.subtreeFlags & 15990 || i) {
    i = Pe.transition, Pe.transition = null;
    var o = O;
    O = 1;
    var s = $;
    $ |= 4, Fo.current = null, Df(e, n), ic(n, e), af(Ci), Hr = !!_i, Ci = _i = null, e.current = n, Ff(n), fd(), $ = s, O = o, Pe.transition = i;
  } else e.current = n;
  if (_r && (_r = !1, ut = e, ol = l), i = e.pendingLanes, i === 0 && (mt = null), md(n.stateNode), ye(e, X()), t !== null) for (r = e.onRecoverableError, n = 0; n < t.length; n++) l = t[n], r(l.value, { componentStack: l.stack, digest: l.digest });
  if (il) throw il = !1, e = Ki, Ki = null, e;
  return ol & 1 && e.tag !== 0 && ln(), i = e.pendingLanes, i & 1 ? e === Gi ? An++ : (An = 0, Gi = e) : An = 0, St(), null;
}
function ln() {
  if (ut !== null) {
    var e = Qa(ol), t = Pe.transition, n = O;
    try {
      if (Pe.transition = null, O = 16 > e ? 16 : e, ut === null) var r = !1;
      else {
        if (e = ut, ut = null, ol = 0, $ & 6) throw Error(N(331));
        var l = $;
        for ($ |= 4, E = e.current; E !== null; ) {
          var i = E, o = i.child;
          if (E.flags & 16) {
            var s = i.deletions;
            if (s !== null) {
              for (var a = 0; a < s.length; a++) {
                var d = s[a];
                for (E = d; E !== null; ) {
                  var m = E;
                  switch (m.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Fn(8, m, i);
                  }
                  var h = m.child;
                  if (h !== null) h.return = m, E = h;
                  else for (; E !== null; ) {
                    m = E;
                    var g = m.sibling, y = m.return;
                    if (nc(m), m === d) {
                      E = null;
                      break;
                    }
                    if (g !== null) {
                      g.return = y, E = g;
                      break;
                    }
                    E = y;
                  }
                }
              }
              var k = i.alternate;
              if (k !== null) {
                var S = k.child;
                if (S !== null) {
                  k.child = null;
                  do {
                    var z = S.sibling;
                    S.sibling = null, S = z;
                  } while (S !== null);
                }
              }
              E = i;
            }
          }
          if (i.subtreeFlags & 2064 && o !== null) o.return = i, E = o;
          else e: for (; E !== null; ) {
            if (i = E, i.flags & 2048) switch (i.tag) {
              case 0:
              case 11:
              case 15:
                Fn(9, i, i.return);
            }
            var f = i.sibling;
            if (f !== null) {
              f.return = i.return, E = f;
              break e;
            }
            E = i.return;
          }
        }
        var c = e.current;
        for (E = c; E !== null; ) {
          o = E;
          var p = o.child;
          if (o.subtreeFlags & 2064 && p !== null) p.return = o, E = p;
          else e: for (o = c; E !== null; ) {
            if (s = E, s.flags & 2048) try {
              switch (s.tag) {
                case 0:
                case 11:
                case 15:
                  yl(9, s);
              }
            } catch (j) {
              G(s, s.return, j);
            }
            if (s === o) {
              E = null;
              break e;
            }
            var x = s.sibling;
            if (x !== null) {
              x.return = s.return, E = x;
              break e;
            }
            E = s.return;
          }
        }
        if ($ = l, St(), He && typeof He.onPostCommitFiberRoot == "function") try {
          He.onPostCommitFiberRoot(cl, e);
        } catch {
        }
        r = !0;
      }
      return r;
    } finally {
      O = n, Pe.transition = t;
    }
  }
  return !1;
}
function ta(e, t, n) {
  t = dn(n, t), t = Qu(e, t, 1), e = ht(e, t, 1), t = de(), e !== null && (lr(e, 1, t), ye(e, t));
}
function G(e, t, n) {
  if (e.tag === 3) ta(e, e, n);
  else for (; t !== null; ) {
    if (t.tag === 3) {
      ta(t, e, n);
      break;
    } else if (t.tag === 1) {
      var r = t.stateNode;
      if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (mt === null || !mt.has(r))) {
        e = dn(n, e), e = Ku(t, e, 1), t = ht(t, e, 1), e = de(), t !== null && (lr(t, 1, e), ye(t, e));
        break;
      }
    }
    t = t.return;
  }
}
function Vf(e, t, n) {
  var r = e.pingCache;
  r !== null && r.delete(t), t = de(), e.pingedLanes |= e.suspendedLanes & n, te === e && (le & n) === n && (b === 4 || b === 3 && (le & 130023424) === le && 500 > X() - Ao ? Lt(e, 0) : Io |= n), ye(e, t);
}
function fc(e, t) {
  t === 0 && (e.mode & 1 ? (t = mr, mr <<= 1, !(mr & 130023424) && (mr = 4194304)) : t = 1);
  var n = de();
  e = qe(e, t), e !== null && (lr(e, t, n), ye(e, n));
}
function Hf(e) {
  var t = e.memoizedState, n = 0;
  t !== null && (n = t.retryLane), fc(e, n);
}
function Qf(e, t) {
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
      throw Error(N(314));
  }
  r !== null && r.delete(t), fc(e, n);
}
var pc;
pc = function(e, t, n) {
  if (e !== null) if (e.memoizedProps !== t.pendingProps || ge.current) me = !0;
  else {
    if (!(e.lanes & n) && !(t.flags & 128)) return me = !1, Rf(e, t, n);
    me = !!(e.flags & 131072);
  }
  else me = !1, B && t.flags & 1048576 && vu(t, Jr, t.index);
  switch (t.lanes = 0, t.tag) {
    case 2:
      var r = t.type;
      Or(e, t), e = t.pendingProps;
      var l = sn(t, ue.current);
      rn(t, n), l = Ro(null, t, r, e, l, n);
      var i = Mo();
      return t.flags |= 1, typeof l == "object" && l !== null && typeof l.render == "function" && l.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, ve(r) ? (i = !0, Xr(t)) : i = !1, t.memoizedState = l.state !== null && l.state !== void 0 ? l.state : null, Eo(t), l.updater = vl, t.stateNode = l, l._reactInternals = t, Oi(t, r, e, n), t = Ii(null, t, r, !0, i, n)) : (t.tag = 0, B && i && wo(t), ce(null, t, l, n), t = t.child), t;
    case 16:
      r = t.elementType;
      e: {
        switch (Or(e, t), e = t.pendingProps, l = r._init, r = l(r._payload), t.type = r, l = t.tag = Gf(r), e = $e(r, e), l) {
          case 0:
            t = Fi(null, t, r, e, n);
            break e;
          case 1:
            t = Qs(null, t, r, e, n);
            break e;
          case 11:
            t = Vs(null, t, r, e, n);
            break e;
          case 14:
            t = Hs(null, t, r, $e(r.type, e), n);
            break e;
        }
        throw Error(N(
          306,
          r,
          ""
        ));
      }
      return t;
    case 0:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : $e(r, l), Fi(e, t, r, l, n);
    case 1:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : $e(r, l), Qs(e, t, r, l, n);
    case 3:
      e: {
        if (Zu(t), e === null) throw Error(N(387));
        r = t.pendingProps, i = t.memoizedState, l = i.element, Nu(e, t), el(t, r, null, n);
        var o = t.memoizedState;
        if (r = o.element, i.isDehydrated) if (i = { element: r, isDehydrated: !1, cache: o.cache, pendingSuspenseBoundaries: o.pendingSuspenseBoundaries, transitions: o.transitions }, t.updateQueue.baseState = i, t.memoizedState = i, t.flags & 256) {
          l = dn(Error(N(423)), t), t = Ks(e, t, r, n, l);
          break e;
        } else if (r !== l) {
          l = dn(Error(N(424)), t), t = Ks(e, t, r, n, l);
          break e;
        } else for (ke = pt(t.stateNode.containerInfo.firstChild), Se = t, B = !0, De = null, n = ku(t, null, r, n), t.child = n; n; ) n.flags = n.flags & -3 | 4096, n = n.sibling;
        else {
          if (an(), r === l) {
            t = et(e, t, n);
            break e;
          }
          ce(e, t, r, n);
        }
        t = t.child;
      }
      return t;
    case 5:
      return ju(t), e === null && Ri(t), r = t.type, l = t.pendingProps, i = e !== null ? e.memoizedProps : null, o = l.children, Ei(r, l) ? o = null : i !== null && Ei(r, i) && (t.flags |= 32), Xu(e, t), ce(e, t, o, n), t.child;
    case 6:
      return e === null && Ri(t), null;
    case 13:
      return Ju(e, t, n);
    case 4:
      return zo(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = un(t, null, r, n) : ce(e, t, r, n), t.child;
    case 11:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : $e(r, l), Vs(e, t, r, l, n);
    case 7:
      return ce(e, t, t.pendingProps, n), t.child;
    case 8:
      return ce(e, t, t.pendingProps.children, n), t.child;
    case 12:
      return ce(e, t, t.pendingProps.children, n), t.child;
    case 10:
      e: {
        if (r = t.type._context, l = t.pendingProps, i = t.memoizedProps, o = l.value, I(br, r._currentValue), r._currentValue = o, i !== null) if (Ae(i.value, o)) {
          if (i.children === l.children && !ge.current) {
            t = et(e, t, n);
            break e;
          }
        } else for (i = t.child, i !== null && (i.return = t); i !== null; ) {
          var s = i.dependencies;
          if (s !== null) {
            o = i.child;
            for (var a = s.firstContext; a !== null; ) {
              if (a.context === r) {
                if (i.tag === 1) {
                  a = Ze(-1, n & -n), a.tag = 2;
                  var d = i.updateQueue;
                  if (d !== null) {
                    d = d.shared;
                    var m = d.pending;
                    m === null ? a.next = a : (a.next = m.next, m.next = a), d.pending = a;
                  }
                }
                i.lanes |= n, a = i.alternate, a !== null && (a.lanes |= n), Mi(
                  i.return,
                  n,
                  t
                ), s.lanes |= n;
                break;
              }
              a = a.next;
            }
          } else if (i.tag === 10) o = i.type === t.type ? null : i.child;
          else if (i.tag === 18) {
            if (o = i.return, o === null) throw Error(N(341));
            o.lanes |= n, s = o.alternate, s !== null && (s.lanes |= n), Mi(o, n, t), o = i.sibling;
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
        ce(e, t, l.children, n), t = t.child;
      }
      return t;
    case 9:
      return l = t.type, r = t.pendingProps.children, rn(t, n), l = Le(l), r = r(l), t.flags |= 1, ce(e, t, r, n), t.child;
    case 14:
      return r = t.type, l = $e(r, t.pendingProps), l = $e(r.type, l), Hs(e, t, r, l, n);
    case 15:
      return Gu(e, t, t.type, t.pendingProps, n);
    case 17:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : $e(r, l), Or(e, t), t.tag = 1, ve(r) ? (e = !0, Xr(t)) : e = !1, rn(t, n), Hu(t, r, l), Oi(t, r, l, n), Ii(null, t, r, !0, e, n);
    case 19:
      return bu(e, t, n);
    case 22:
      return Yu(e, t, n);
  }
  throw Error(N(156, t.tag));
};
function hc(e, t) {
  return Ba(e, t);
}
function Kf(e, t, n, r) {
  this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
}
function ze(e, t, n, r) {
  return new Kf(e, t, n, r);
}
function Vo(e) {
  return e = e.prototype, !(!e || !e.isReactComponent);
}
function Gf(e) {
  if (typeof e == "function") return Vo(e) ? 1 : 0;
  if (e != null) {
    if (e = e.$$typeof, e === so) return 11;
    if (e === ao) return 14;
  }
  return 2;
}
function vt(e, t) {
  var n = e.alternate;
  return n === null ? (n = ze(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 14680064, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n;
}
function Ir(e, t, n, r, l, i) {
  var o = 2;
  if (r = e, typeof e == "function") Vo(e) && (o = 1);
  else if (typeof e == "string") o = 5;
  else e: switch (e) {
    case Wt:
      return Rt(n.children, l, i, t);
    case oo:
      o = 8, l |= 8;
      break;
    case ii:
      return e = ze(12, n, t, l | 2), e.elementType = ii, e.lanes = i, e;
    case oi:
      return e = ze(13, n, t, l), e.elementType = oi, e.lanes = i, e;
    case si:
      return e = ze(19, n, t, l), e.elementType = si, e.lanes = i, e;
    case ja:
      return wl(n, l, i, t);
    default:
      if (typeof e == "object" && e !== null) switch (e.$$typeof) {
        case Sa:
          o = 10;
          break e;
        case Na:
          o = 9;
          break e;
        case so:
          o = 11;
          break e;
        case ao:
          o = 14;
          break e;
        case lt:
          o = 16, r = null;
          break e;
      }
      throw Error(N(130, e == null ? e : typeof e, ""));
  }
  return t = ze(o, n, t, l), t.elementType = e, t.type = r, t.lanes = i, t;
}
function Rt(e, t, n, r) {
  return e = ze(7, e, r, t), e.lanes = n, e;
}
function wl(e, t, n, r) {
  return e = ze(22, e, r, t), e.elementType = ja, e.lanes = n, e.stateNode = { isHidden: !1 }, e;
}
function ql(e, t, n) {
  return e = ze(6, e, null, t), e.lanes = n, e;
}
function ei(e, t, n) {
  return t = ze(4, e.children !== null ? e.children : [], e.key, t), t.lanes = n, t.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }, t;
}
function Yf(e, t, n, r, l) {
  this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = $l(0), this.expirationTimes = $l(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = $l(0), this.identifierPrefix = r, this.onRecoverableError = l, this.mutableSourceEagerHydrationData = null;
}
function Ho(e, t, n, r, l, i, o, s, a) {
  return e = new Yf(e, t, n, s, a), t === 1 ? (t = 1, i === !0 && (t |= 8)) : t = 0, i = ze(3, null, null, t), e.current = i, i.stateNode = e, i.memoizedState = { element: r, isDehydrated: n, cache: null, transitions: null, pendingSuspenseBoundaries: null }, Eo(i), e;
}
function Xf(e, t, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return { $$typeof: Bt, key: r == null ? null : "" + r, children: e, containerInfo: t, implementation: n };
}
function mc(e) {
  if (!e) return xt;
  e = e._reactInternals;
  e: {
    if (At(e) !== e || e.tag !== 1) throw Error(N(170));
    var t = e;
    do {
      switch (t.tag) {
        case 3:
          t = t.stateNode.context;
          break e;
        case 1:
          if (ve(t.type)) {
            t = t.stateNode.__reactInternalMemoizedMergedChildContext;
            break e;
          }
      }
      t = t.return;
    } while (t !== null);
    throw Error(N(171));
  }
  if (e.tag === 1) {
    var n = e.type;
    if (ve(n)) return mu(e, n, t);
  }
  return t;
}
function gc(e, t, n, r, l, i, o, s, a) {
  return e = Ho(n, r, !0, e, l, i, o, s, a), e.context = mc(null), n = e.current, r = de(), l = gt(n), i = Ze(r, l), i.callback = t ?? null, ht(n, i, l), e.current.lanes = l, lr(e, l, r), ye(e, r), e;
}
function kl(e, t, n, r) {
  var l = t.current, i = de(), o = gt(l);
  return n = mc(n), t.context === null ? t.context = n : t.pendingContext = n, t = Ze(i, o), t.payload = { element: e }, r = r === void 0 ? null : r, r !== null && (t.callback = r), e = ht(l, t, o), e !== null && (Ie(e, l, o, i), Rr(e, l, o)), o;
}
function al(e) {
  if (e = e.current, !e.child) return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function na(e, t) {
  if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t;
  }
}
function Qo(e, t) {
  na(e, t), (e = e.alternate) && na(e, t);
}
function Zf() {
  return null;
}
var vc = typeof reportError == "function" ? reportError : function(e) {
  console.error(e);
};
function Ko(e) {
  this._internalRoot = e;
}
Sl.prototype.render = Ko.prototype.render = function(e) {
  var t = this._internalRoot;
  if (t === null) throw Error(N(409));
  kl(e, t, null, null);
};
Sl.prototype.unmount = Ko.prototype.unmount = function() {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    Ft(function() {
      kl(null, e, null, null);
    }), t[be] = null;
  }
};
function Sl(e) {
  this._internalRoot = e;
}
Sl.prototype.unstable_scheduleHydration = function(e) {
  if (e) {
    var t = Ya();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < ot.length && t !== 0 && t < ot[n].priority; n++) ;
    ot.splice(n, 0, e), n === 0 && Za(e);
  }
};
function Go(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
}
function Nl(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "));
}
function ra() {
}
function Jf(e, t, n, r, l) {
  if (l) {
    if (typeof r == "function") {
      var i = r;
      r = function() {
        var d = al(o);
        i.call(d);
      };
    }
    var o = gc(t, r, e, 0, null, !1, !1, "", ra);
    return e._reactRootContainer = o, e[be] = o.current, Yn(e.nodeType === 8 ? e.parentNode : e), Ft(), o;
  }
  for (; l = e.lastChild; ) e.removeChild(l);
  if (typeof r == "function") {
    var s = r;
    r = function() {
      var d = al(a);
      s.call(d);
    };
  }
  var a = Ho(e, 0, !1, null, null, !1, !1, "", ra);
  return e._reactRootContainer = a, e[be] = a.current, Yn(e.nodeType === 8 ? e.parentNode : e), Ft(function() {
    kl(t, a, n, r);
  }), a;
}
function jl(e, t, n, r, l) {
  var i = n._reactRootContainer;
  if (i) {
    var o = i;
    if (typeof l == "function") {
      var s = l;
      l = function() {
        var a = al(o);
        s.call(a);
      };
    }
    kl(t, o, e, l);
  } else o = Jf(n, t, e, l, r);
  return al(o);
}
Ka = function(e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = Pn(t.pendingLanes);
        n !== 0 && (fo(t, n | 1), ye(t, X()), !($ & 6) && (fn = X() + 500, St()));
      }
      break;
    case 13:
      Ft(function() {
        var r = qe(e, 1);
        if (r !== null) {
          var l = de();
          Ie(r, e, 1, l);
        }
      }), Qo(e, 1);
  }
};
po = function(e) {
  if (e.tag === 13) {
    var t = qe(e, 134217728);
    if (t !== null) {
      var n = de();
      Ie(t, e, 134217728, n);
    }
    Qo(e, 134217728);
  }
};
Ga = function(e) {
  if (e.tag === 13) {
    var t = gt(e), n = qe(e, t);
    if (n !== null) {
      var r = de();
      Ie(n, e, t, r);
    }
    Qo(e, t);
  }
};
Ya = function() {
  return O;
};
Xa = function(e, t) {
  var n = O;
  try {
    return O = e, t();
  } finally {
    O = n;
  }
};
vi = function(e, t, n) {
  switch (t) {
    case "input":
      if (ci(e, n), t = n.name, n.type === "radio" && t != null) {
        for (n = e; n.parentNode; ) n = n.parentNode;
        for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < n.length; t++) {
          var r = n[t];
          if (r !== e && r.form === e.form) {
            var l = hl(r);
            if (!l) throw Error(N(90));
            Ca(r), ci(r, l);
          }
        }
      }
      break;
    case "textarea":
      za(e, n);
      break;
    case "select":
      t = n.value, t != null && qt(e, !!n.multiple, t, !1);
  }
};
Oa = Uo;
Da = Ft;
var bf = { usingClientEntryPoint: !1, Events: [or, Kt, hl, Ma, $a, Uo] }, Cn = { findFiberByHostInstance: Et, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, qf = { bundleType: Cn.bundleType, version: Cn.version, rendererPackageName: Cn.rendererPackageName, rendererConfig: Cn.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: tt.ReactCurrentDispatcher, findHostInstanceByFiber: function(e) {
  return e = Aa(e), e === null ? null : e.stateNode;
}, findFiberByHostInstance: Cn.findFiberByHostInstance || Zf, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var Cr = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!Cr.isDisabled && Cr.supportsFiber) try {
    cl = Cr.inject(qf), He = Cr;
  } catch {
  }
}
je.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = bf;
je.createPortal = function(e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!Go(t)) throw Error(N(200));
  return Xf(e, t, null, n);
};
je.createRoot = function(e, t) {
  if (!Go(e)) throw Error(N(299));
  var n = !1, r = "", l = vc;
  return t != null && (t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onRecoverableError !== void 0 && (l = t.onRecoverableError)), t = Ho(e, 1, !1, null, null, n, !1, r, l), e[be] = t.current, Yn(e.nodeType === 8 ? e.parentNode : e), new Ko(t);
};
je.findDOMNode = function(e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function" ? Error(N(188)) : (e = Object.keys(e).join(","), Error(N(268, e)));
  return e = Aa(t), e = e === null ? null : e.stateNode, e;
};
je.flushSync = function(e) {
  return Ft(e);
};
je.hydrate = function(e, t, n) {
  if (!Nl(t)) throw Error(N(200));
  return jl(null, e, t, !0, n);
};
je.hydrateRoot = function(e, t, n) {
  if (!Go(e)) throw Error(N(405));
  var r = n != null && n.hydratedSources || null, l = !1, i = "", o = vc;
  if (n != null && (n.unstable_strictMode === !0 && (l = !0), n.identifierPrefix !== void 0 && (i = n.identifierPrefix), n.onRecoverableError !== void 0 && (o = n.onRecoverableError)), t = gc(t, null, e, 1, n ?? null, l, !1, i, o), e[be] = t.current, Yn(e), r) for (e = 0; e < r.length; e++) n = r[e], l = n._getVersion, l = l(n._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [n, l] : t.mutableSourceEagerHydrationData.push(
    n,
    l
  );
  return new Sl(t);
};
je.render = function(e, t, n) {
  if (!Nl(t)) throw Error(N(200));
  return jl(null, e, t, !1, n);
};
je.unmountComponentAtNode = function(e) {
  if (!Nl(e)) throw Error(N(40));
  return e._reactRootContainer ? (Ft(function() {
    jl(null, null, e, !1, function() {
      e._reactRootContainer = null, e[be] = null;
    });
  }), !0) : !1;
};
je.unstable_batchedUpdates = Uo;
je.unstable_renderSubtreeIntoContainer = function(e, t, n, r) {
  if (!Nl(n)) throw Error(N(200));
  if (e == null || e._reactInternals === void 0) throw Error(N(38));
  return jl(e, t, n, !1, r);
};
je.version = "18.3.1-next-f1338f8080-20240426";
function yc() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(yc);
    } catch (e) {
      console.error(e);
    }
}
yc(), ya.exports = je;
var ep = ya.exports, xc, la = ep;
xc = la.createRoot, la.hydrateRoot;
function W({ name: e, className: t }) {
  return /* @__PURE__ */ u.jsx("span", { className: `icon-wrap ${t ?? ""}`, "aria-hidden": "true", children: /* @__PURE__ */ u.jsx("ha-icon", { icon: `mdi:${e}` }) });
}
const Tt = "No area", tp = {
  RDM002: "Hue Tap Dial",
  RWL020: "Hue Dimmer switch",
  RWL021: "Hue Dimmer switch",
  RWL022: "Hue Dimmer switch",
  ROM001: "Hue Smart button"
}, np = (e) => e.model && tp[e.model] || [e.manufacturer, e.model].filter(Boolean).join(" ");
function Yo(e, t) {
  const n = e.dial, r = n ? t.find((o) => o.id === n.group_id) : void 0, l = !!n && e.bound.some((o) => o.group_id === n.group_id), i = !!n && !!r && n.buttons.every(([, o]) => r.scenes.some((s) => s.id === o));
  return { found: !!n, group: r, bound: l, saved: i, done: [!!n, !!r, l, i].filter(Boolean).length };
}
function _l(e, t) {
  if (e.dial_supported)
    return Yo(e, t).done === 4 ? { state: "ok", label: "Set up" } : !e.dial && !e.bound.length ? { state: "idle", label: "Not set up" } : { state: "attention", label: "Needs set-up" };
  const n = e.bound.length;
  return n ? { state: "ok", label: n > 1 ? `Bound to ${n}` : "Bound" } : { state: "idle", label: "Not bound" };
}
function rp(e, t, n) {
  const r = /* @__PURE__ */ new Map(), l = (i) => {
    let o = r.get(i);
    return o || (o = { name: i, icon: n[i] || "mdi:home-outline", groups: [], remotes: [], attention: [] }, r.set(i, o)), o;
  };
  for (const i of e) l(i.areas[0] ?? Tt).groups.push(i);
  for (const i of t) {
    const o = l(i.area ?? Tt);
    o.remotes.push(i), _l(i, e).state === "attention" && o.attention.push(i);
  }
  return [...r.values()].sort(
    (i, o) => +(o.attention.length > 0) - +(i.attention.length > 0) || +(i.name === Tt) - +(o.name === Tt) || i.name.localeCompare(o.name)
  );
}
const Xo = (e, t) => {
  var n;
  return !!t && ((n = e.states[t]) == null ? void 0 : n.state) === "on";
}, wc = (e, t) => t.reduce((n, r) => n + r.members.filter((l) => Xo(e, l.entity_id)).length, 0), kc = (e) => e.reduce((t, n) => t + n.members.length, 0);
function Sc(e) {
  if (!(e != null && e.length)) return "var(--hrs-swatch-unknown)";
  const t = e.filter((l) => !!l);
  if (!t.length) return "linear-gradient(135deg, #2b2f3a, #12141a)";
  const n = ([l, i, o, s]) => {
    const a = 0.35 + 0.65 * (s / 255);
    return `rgb(${Math.round(l * a)}, ${Math.round(i * a)}, ${Math.round(o * a)})`;
  }, r = [...new Set(t.map(n))].slice(0, 4);
  return r.length === 1 ? `linear-gradient(135deg, color-mix(in srgb, ${r[0]} 70%, white), ${r[0]})` : `linear-gradient(135deg, ${r.join(", ")})`;
}
function ia(e) {
  if (e == null) return null;
  const t = typeof e == "number" ? e * 1e3 : Date.parse(e);
  if (Number.isNaN(t)) return null;
  const n = Math.max(0, (Date.now() - t) / 1e3);
  return n < 60 ? "just now" : n < 3600 ? `${Math.round(n / 60)} min ago` : n < 86400 ? `${Math.round(n / 3600)} h ago` : n < 172800 ? "yesterday" : `${Math.round(n / 86400)} days ago`;
}
function Nc({ scene: e, badge: t, disabled: n, onRecall: r }) {
  return /* @__PURE__ */ u.jsxs("button", { className: "sw", disabled: n, onClick: r, title: `Recall ${e.name}`, children: [
    /* @__PURE__ */ u.jsx("span", { className: "swc", style: { background: Sc(e.colors) }, children: t && /* @__PURE__ */ u.jsx("span", { className: "badge", children: t }) }),
    /* @__PURE__ */ u.jsx("span", { className: "swn", children: e.name })
  ] });
}
function Zi({ scene: e, badge: t, total: n, missing: r, busy: l, onRecall: i, onOverwrite: o, onRename: s, onDelete: a }) {
  const [d, m] = D.useState(!1), [h, g] = D.useState(!1), [y, k] = D.useState(e.name), S = e.members.length;
  return /* @__PURE__ */ u.jsxs("div", { className: "scard", children: [
    /* @__PURE__ */ u.jsxs("button", { className: "scard-sw", style: { background: Sc(e.colors) }, disabled: l, onClick: i, title: `Recall ${e.name}`, children: [
      t && /* @__PURE__ */ u.jsx("span", { className: "badge", children: t }),
      /* @__PURE__ */ u.jsx("span", { className: "play", children: /* @__PURE__ */ u.jsx(W, { name: "play" }) })
    ] }),
    h ? /* @__PURE__ */ u.jsxs(
      "form",
      {
        className: "scard-foot",
        onSubmit: (z) => {
          z.preventDefault(), g(!1), y.trim() && y !== e.name && (s == null || s(y));
        },
        children: [
          /* @__PURE__ */ u.jsx("input", { type: "text", value: y, maxLength: 40, autoFocus: !0, onChange: (z) => k(z.target.value), "aria-label": "Scene name" }),
          /* @__PURE__ */ u.jsx("button", { type: "submit", className: "icon-btn", "aria-label": "Save name", children: /* @__PURE__ */ u.jsx(W, { name: "check" }) })
        ]
      }
    ) : /* @__PURE__ */ u.jsxs("div", { className: "scard-foot", children: [
      /* @__PURE__ */ u.jsx("span", { className: "sname", title: e.name, children: e.name }),
      S < n && /* @__PURE__ */ u.jsxs("span", { className: "chip warn", title: `Missing on: ${r}`, children: [
        S,
        " of ",
        n
      ] }),
      /* @__PURE__ */ u.jsx("button", { className: "icon-btn", disabled: l, onClick: () => m(!d), "aria-label": `More for ${e.name}`, children: /* @__PURE__ */ u.jsx(W, { name: "dots-vertical" }) }),
      d && /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
        /* @__PURE__ */ u.jsx("div", { className: "menu-backdrop", onClick: () => m(!1) }),
        /* @__PURE__ */ u.jsxs("div", { className: "menu", role: "menu", children: [
          /* @__PURE__ */ u.jsxs("button", { role: "menuitem", onClick: () => {
            m(!1), o();
          }, children: [
            /* @__PURE__ */ u.jsx(W, { name: "content-save-edit-outline" }),
            " Save current state here"
          ] }),
          s && /* @__PURE__ */ u.jsxs("button", { role: "menuitem", onClick: () => {
            m(!1), k(e.name), g(!0);
          }, children: [
            /* @__PURE__ */ u.jsx(W, { name: "pencil-outline" }),
            " Rename"
          ] }),
          a && /* @__PURE__ */ u.jsxs("button", { role: "menuitem", className: "danger", onClick: () => {
            m(!1), a();
          }, children: [
            /* @__PURE__ */ u.jsx(W, { name: "delete-outline" }),
            " Delete"
          ] }),
          /* @__PURE__ */ u.jsxs("div", { className: "menu-note", children: [
            "Scene ",
            e.id
          ] })
        ] })
      ] })
    ] })
  ] });
}
function Ji({ badge: e, placeholder: t, busy: n, onSave: r }) {
  const [l, i] = D.useState(!1), [o, s] = D.useState("");
  return l ? /* @__PURE__ */ u.jsxs(
    "form",
    {
      className: "newcard open",
      onSubmit: (a) => {
        a.preventDefault(), o.trim() && (r(o), s(""), i(!1));
      },
      children: [
        e && /* @__PURE__ */ u.jsx("span", { className: "newcard-dots", children: e }),
        /* @__PURE__ */ u.jsx("input", { type: "text", placeholder: t, value: o, maxLength: 40, autoFocus: !0, onChange: (a) => s(a.target.value), "aria-label": "Scene name" }),
        /* @__PURE__ */ u.jsxs("div", { className: "row-end", children: [
          /* @__PURE__ */ u.jsx("button", { type: "button", className: "ghost", onClick: () => i(!1), children: "Cancel" }),
          /* @__PURE__ */ u.jsx("button", { type: "submit", className: "primary", disabled: n || !o.trim(), children: "Save" })
        ] })
      ]
    }
  ) : /* @__PURE__ */ u.jsxs("button", { className: "newcard", disabled: n, onClick: () => i(!0), children: [
    e ? /* @__PURE__ */ u.jsx("span", { className: "newcard-dots", children: e }) : /* @__PURE__ */ u.jsx(W, { name: "plus" }),
    /* @__PURE__ */ u.jsx("strong", { children: "Save current state" }),
    /* @__PURE__ */ u.jsx("span", { className: "muted small", children: e ? "for this button" : "as a new scene" })
  ] });
}
const ti = { 6: "On/off", 8: "Dimming", 5: "Scenes" }, jc = (e) => String((e == null ? void 0 : e.message) ?? e), Cl = (e) => `0x${e.toString(16).padStart(4, "0").toUpperCase()}`, pn = (e) => "●".repeat(parseInt(e, 10) || 1), Te = (e, t) => `${e} ${t}${e === 1 ? "" : "s"}`;
function El() {
  const [e, t] = D.useState(!1), [n, r] = D.useState(null);
  return { busy: e, result: n, act: async (i, o = "Talking to the lights…") => {
    t(o), r(null);
    try {
      const s = await i();
      s && r({ kind: s.includes("didn't") ? "error" : "ok", text: s });
    } catch (s) {
      r({ kind: "error", text: jc(s) });
    } finally {
      t(!1);
    }
  }, clear: () => r(null) };
}
function lp({ getHass: e, group: t, onChanged: n }) {
  const { busy: r, result: l, act: i } = El(), o = e(), s = Object.fromEntries(t.members.map((v) => [v.key, v.name])), a = t.members.filter((v) => v.scenes), d = (v) => v.map((w) => s[w] ?? w).join(", "), m = (v) => d(a.map((w) => w.key).filter((w) => !v.includes(w))), h = t.members.filter((v) => Xo(o, v.entity_id)).length, g = t.dials[0], y = (g == null ? void 0 : g.buttons) ?? [], k = new Set(t.dials.flatMap((v) => v.buttons.map((w) => w.scene_id))), S = t.scenes.filter((v) => !k.has(v.id)), z = (v, w) => i(async () => {
    const _ = await e().callWS({ group_id: t.id, ...v });
    return n(), w(_);
  }), f = (v) => (w) => {
    const _ = Object.keys(w.failed);
    return _.length ? `${v} on ${w.ok.length} of ${w.ok.length + _.length} lights. These didn't answer: ${d(_)}` : `${v} on ${Te(w.ok.length, "light")}`;
  }, c = (v, w) => z({ type: "hue_remote_scenes/recall", scene_id: v }, () => `Recalled ${w}`), p = (v, w) => confirm(`Save how the lights are now as "${w}"?`) && z({ type: "hue_remote_scenes/store", scene_id: v }, f("Saved")), x = (v, w) => z({ type: "hue_remote_scenes/rename", scene_id: v, name: w }, () => "Renamed"), j = (v, w) => confirm(`Delete "${w}" from the lights?`) && z(
    { type: "hue_remote_scenes/delete", scene_id: v },
    (_) => Object.keys(_.failed).length ? `Deleted, but some lights didn't answer and may still have it: ${d(Object.keys(_.failed))}` : `Deleted ${w}`
  );
  return /* @__PURE__ */ u.jsxs("section", { className: "card", children: [
    /* @__PURE__ */ u.jsxs("div", { className: "card-head", children: [
      /* @__PURE__ */ u.jsxs("div", { className: "grow", children: [
        /* @__PURE__ */ u.jsx("h3", { className: "title", children: t.name }),
        /* @__PURE__ */ u.jsxs("div", { className: "muted small", children: [
          "Group ",
          Cl(t.id),
          " · ",
          a.length ? a.map((v) => v.name).join(", ") : "no lights that can store scenes",
          t.members.length > a.length && ` (+${t.members.length - a.length} without scenes)`,
          h > 0 && ` · ${h} on`
        ] })
      ] }),
      /* @__PURE__ */ u.jsxs(
        "button",
        {
          className: "ghost",
          disabled: !!r || !a.length,
          title: "Ask the lights which scenes they already have, e.g. ones made in Zigbee2MQTT",
          onClick: () => z(
            { type: "hue_remote_scenes/import" },
            (v) => v.added.length ? `Found ${Te(v.added.length, "new scene")}. Rename them from their ⋮ menu.` : v.found.length ? "No new scenes: the ones on the lights are all here." : "The lights have no scenes for this group yet."
          ),
          children: [
            /* @__PURE__ */ u.jsx(W, { name: "database-import-outline" }),
            " Import from lights"
          ]
        }
      )
    ] }),
    a.length > 0 && /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
      y.length > 0 && /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
        /* @__PURE__ */ u.jsxs("p", { className: "label", children: [
          t.dials.map((v) => v.name).join(", "),
          " buttons"
        ] }),
        /* @__PURE__ */ u.jsx("div", { className: "cards4", children: y.map((v) => {
          const w = t.scenes.find((_) => _.id === v.scene_id);
          return w ? /* @__PURE__ */ u.jsx(
            Zi,
            {
              scene: w,
              badge: pn(v.label),
              total: a.length,
              missing: m(w.members),
              busy: !!r,
              onRecall: () => c(w.id, w.name),
              onOverwrite: () => p(w.id, w.name),
              onRename: (_) => x(w.id, _)
            },
            v.scene_id
          ) : /* @__PURE__ */ u.jsx(
            Ji,
            {
              badge: pn(v.label),
              placeholder: `Scene for ${v.label}`,
              busy: !!r,
              onSave: (_) => z({ type: "hue_remote_scenes/store", scene_id: v.scene_id, name: _ }, f("Saved"))
            },
            v.scene_id
          );
        }) }),
        /* @__PURE__ */ u.jsx("p", { className: "muted small tight", children: "Hold any button to turn the lights off. Turn the dial to dim." }),
        /* @__PURE__ */ u.jsx("p", { className: "label", children: "Other scenes" })
      ] }),
      /* @__PURE__ */ u.jsxs("div", { className: "cards4", children: [
        S.map((v) => /* @__PURE__ */ u.jsx(
          Zi,
          {
            scene: v,
            total: a.length,
            missing: m(v.members),
            busy: !!r,
            onRecall: () => c(v.id, v.name),
            onOverwrite: () => p(v.id, v.name),
            onRename: (w) => x(v.id, w),
            onDelete: () => j(v.id, v.name)
          },
          v.id
        )),
        /* @__PURE__ */ u.jsx(
          Ji,
          {
            placeholder: "New scene name",
            busy: !!r,
            onSave: (v) => z({ type: "hue_remote_scenes/store", name: v }, f("Saved"))
          }
        )
      ] })
    ] }),
    r && /* @__PURE__ */ u.jsx("div", { className: "status busy", children: r }),
    l && /* @__PURE__ */ u.jsx("div", { className: `status ${l.kind}`, children: l.text })
  ] });
}
const ip = ["Find its group", "Choose lights", "Bind", "Save button scenes"], bi = (e) => e.dial_supported ? "mdi:knob" : e.endpoints.some((t) => t.clusters.includes(8)) ? "mdi:remote" : "mdi:gesture-tap-button";
function _c({ getHass: e, remote: t, groups: n, compact: r, onSetup: l, onChanged: i }) {
  var nt, vn;
  const { busy: o, result: s, act: a } = El(), [d, m] = D.useState(!1), [h, g] = D.useState(t.endpoints[0].id), [y, k] = D.useState(((nt = n[0]) == null ? void 0 : nt.id) ?? 0), S = e(), z = _l(t, n), f = Yo(t, n), c = t.dial_supported && f.done === 4, p = t.endpoints.find((T) => T.id === h) ?? t.endpoints[0], x = (T) => n.find((F) => F.id === T), j = (T) => {
    var F;
    return ((F = x(T)) == null ? void 0 : F.name) ?? `Group ${Cl(T)}`;
  }, v = t.battery_entity ? (vn = S.states[t.battery_entity]) == null ? void 0 : vn.state : void 0, w = z.state === "idle" && !t.dial_supported, _ = t.bound.filter((T) => {
    var F;
    return !(c && T.group_id === ((F = t.dial) == null ? void 0 : F.group_id));
  }), V = () => a(async () => {
    const T = await e().callWS({ type: "hue_remote_scenes/bindings", ieee: t.ieee });
    i();
    const F = new Set(T.bindings.map((ne) => ne.group_id)).size;
    return F ? `Bound to ${F === 1 ? "1 group" : `${F} groups`}` : "Not bound to any group";
  }, "Waiting for the remote… press one of its buttons."), R = (T) => a(async () => {
    const F = await e().callWS({
      type: "hue_remote_scenes/bind",
      ieee: t.ieee,
      endpoint: p.id,
      group_id: y,
      clusters: p.clusters,
      unbind: T
    });
    i();
    const ne = Object.entries(F.results).filter(([, P]) => P !== "ok"), C = T ? "Unbound from" : "Bound to";
    return ne.length === Object.keys(F.results).length ? "The remote didn't answer. Press a button on it and try again." : ne.length ? `${C} ${j(y)}, but these didn't take: ${ne.map(([P, L]) => `${ti[+P] ?? P} (${L})`).join(", ")}` : (m(!1), `${C} ${j(y)}`);
  }, "Waiting for the remote… press one of its buttons."), xe = (T, F, ne) => a(async () => (await e().callWS({ type: "hue_remote_scenes/recall", group_id: T, scene_id: F }), `Recalled ${ne}`)), Ue = f.group;
  return /* @__PURE__ */ u.jsxs("section", { className: `card remote ${z.state === "attention" ? "attn" : ""} ${z.state === "idle" ? "idle" : ""}`, children: [
    /* @__PURE__ */ u.jsxs("div", { className: "card-head", children: [
      /* @__PURE__ */ u.jsx("span", { className: "ricon", children: /* @__PURE__ */ u.jsx("ha-icon", { icon: bi(t) }) }),
      /* @__PURE__ */ u.jsxs("div", { className: "grow", children: [
        /* @__PURE__ */ u.jsx("h3", { className: "title", children: t.name }),
        /* @__PURE__ */ u.jsx("div", { className: "muted small", children: [r ? null : t.area ?? "No area", np(t)].filter(Boolean).join(" · ") })
      ] }),
      /* @__PURE__ */ u.jsx("span", { className: `chip ${z.state === "ok" ? "ok" : z.state === "attention" ? "warn" : ""}`, children: z.label })
    ] }),
    t.dial_supported && !c && (z.state === "attention" || r) && /* @__PURE__ */ u.jsxs("div", { className: "progress-block", children: [
      /* @__PURE__ */ u.jsxs("div", { className: "row-between small", children: [
        /* @__PURE__ */ u.jsxs("strong", { children: [
          "Scene buttons: step ",
          Math.min(f.done + 1, 4),
          " of 4"
        ] }),
        /* @__PURE__ */ u.jsx("span", { className: "muted", children: ip[Math.min(f.done, 3)] })
      ] }),
      /* @__PURE__ */ u.jsx("div", { className: "prog", children: /* @__PURE__ */ u.jsx("span", { style: { width: `${Math.max(6, f.done / 4 * 100)}%` } }) })
    ] }),
    c && Ue && t.dial && /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
      /* @__PURE__ */ u.jsx("p", { className: "label", children: "Buttons" }),
      /* @__PURE__ */ u.jsx("div", { className: "sws", children: t.dial.buttons.map(([T, F]) => {
        const ne = Ue.scenes.find((C) => C.id === F);
        return /* @__PURE__ */ u.jsx(Nc, { scene: ne, badge: pn(T), disabled: !!o, onRecall: () => xe(Ue.id, F, ne.name) }, F);
      }) }),
      /* @__PURE__ */ u.jsxs("div", { className: "ctl small", children: [
        /* @__PURE__ */ u.jsx(W, { name: "rotate-right" }),
        /* @__PURE__ */ u.jsx("span", { className: "grow", children: "Turn to dim · hold a button for off" }),
        /* @__PURE__ */ u.jsx("span", { className: "muted", children: Ue.name })
      ] })
    ] }),
    _.length > 0 && /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
      /* @__PURE__ */ u.jsx("p", { className: "label", children: c ? "Also controls" : "Controls" }),
      /* @__PURE__ */ u.jsx("div", { className: "stack-sm", children: _.map((T) => {
        var F;
        return /* @__PURE__ */ u.jsxs("div", { className: "ctl small", children: [
          /* @__PURE__ */ u.jsx(W, { name: "lightbulb-group-outline" }),
          /* @__PURE__ */ u.jsxs("span", { className: "grow", children: [
            /* @__PURE__ */ u.jsx("strong", { children: j(T.group_id) }),
            ((F = x(T.group_id)) == null ? void 0 : F.areas[0]) && /* @__PURE__ */ u.jsxs("span", { className: "muted", children: [
              " ",
              x(T.group_id).areas[0]
            ] })
          ] }),
          /* @__PURE__ */ u.jsx("span", { className: "muted", children: T.clusters.map((ne) => ti[ne] ?? ne).join(" · ") })
        ] }, T.group_id);
      }) })
    ] }),
    z.state === "idle" && !r && /* @__PURE__ */ u.jsx("p", { className: "muted small tight", children: "Not controlling anything yet." }),
    (d || w) && /* @__PURE__ */ u.jsxs("div", { className: "bind-row", children: [
      t.endpoints.length > 1 && /* @__PURE__ */ u.jsx("select", { value: p.id, onChange: (T) => g(+T.target.value), "aria-label": "Button set", children: t.endpoints.map((T) => /* @__PURE__ */ u.jsxs("option", { value: T.id, children: [
        "Endpoint ",
        T.id
      ] }, T.id)) }),
      /* @__PURE__ */ u.jsx("select", { value: y, disabled: !n.length, onChange: (T) => k(+T.target.value), "aria-label": "Group", children: n.map((T) => /* @__PURE__ */ u.jsxs("option", { value: T.id, children: [
        T.name,
        T.areas[0] ? ` (${T.areas[0]})` : ""
      ] }, T.id)) }),
      /* @__PURE__ */ u.jsx("button", { className: "primary", disabled: !!o || !n.length, onClick: () => R(!1), children: "Bind" }),
      /* @__PURE__ */ u.jsx("button", { disabled: !!o || !n.length, onClick: () => R(!0), children: "Unbind" }),
      /* @__PURE__ */ u.jsxs("span", { className: "muted small", children: [
        "Sends ",
        p.clusters.map((T) => ti[T] ?? T).join(", ")
      ] })
    ] }),
    /* @__PURE__ */ u.jsxs("div", { className: "foot", children: [
      !r && v != null && v !== "unavailable" && v !== "unknown" && /* @__PURE__ */ u.jsxs("span", { className: "chip", children: [
        /* @__PURE__ */ u.jsx(W, { name: "battery-outline" }),
        Math.round(+v),
        "%"
      ] }),
      /* @__PURE__ */ u.jsx("span", { className: "muted small grow", children: t.checked ? `Checked ${ia(t.checked)}` : r ? "" : t.last_seen ? `Seen ${ia(t.last_seen)}` : "Not checked yet" }),
      !(t.dial_supported && !c) && /* @__PURE__ */ u.jsx("button", { className: "ghost", disabled: !!o, onClick: V, children: "Check bindings" }),
      !w && /* @__PURE__ */ u.jsx("button", { className: "ghost", disabled: !!o, onClick: () => m(!d), children: d ? "Close" : "Bind to…" }),
      t.dial_supported && !c && /* @__PURE__ */ u.jsx("button", { className: "primary", disabled: !!o, onClick: l, children: f.done ? "Continue set-up" : "Set up scene buttons" })
    ] }),
    o && /* @__PURE__ */ u.jsx("div", { className: "status busy", children: o }),
    s && /* @__PURE__ */ u.jsx("div", { className: `status ${s.kind}`, children: s.text })
  ] });
}
function op({ getHass: e, area: t, groups: n, onBack: r, onSetup: l, onChanged: i }) {
  const o = e(), s = wc(o, t.groups), a = kc(t.groups);
  return /* @__PURE__ */ u.jsxs("div", { className: "stack", children: [
    /* @__PURE__ */ u.jsxs("div", { className: "area-head", children: [
      /* @__PURE__ */ u.jsxs("nav", { className: "crumbs small", children: [
        /* @__PURE__ */ u.jsx("button", { className: "link", onClick: r, children: "Areas" }),
        /* @__PURE__ */ u.jsx(W, { name: "chevron-right" }),
        /* @__PURE__ */ u.jsx("span", { children: t.name })
      ] }),
      /* @__PURE__ */ u.jsxs("div", { className: "row-start", children: [
        /* @__PURE__ */ u.jsx("span", { className: "aicon big", children: /* @__PURE__ */ u.jsx("ha-icon", { icon: t.icon }) }),
        /* @__PURE__ */ u.jsx("h2", { className: "area-title", children: t.name }),
        /* @__PURE__ */ u.jsx("span", { className: "chip", children: [Te(t.groups.length, "group"), Te(a, "light")].join(" · ") }),
        a > 0 && /* @__PURE__ */ u.jsx("span", { className: `chip ${s ? "ok" : ""}`, children: s ? `${s} on` : "All off" })
      ] })
    ] }),
    /* @__PURE__ */ u.jsxs("div", { className: "split", children: [
      /* @__PURE__ */ u.jsxs("div", { className: "split-main stack", children: [
        t.groups.map((d) => /* @__PURE__ */ u.jsx(lp, { getHass: e, group: d, onChanged: i }, d.id)),
        !t.groups.length && /* @__PURE__ */ u.jsxs("div", { className: "card empty-state", children: [
          /* @__PURE__ */ u.jsx(W, { name: "lightbulb-group-outline" }),
          /* @__PURE__ */ u.jsxs("p", { children: [
            "No ZHA groups in ",
            t.name,
            ". Create one under Settings → Devices & services → Zigbee Home Automation → Configure → Groups and put its lights in this area, or set up a Tap Dial here."
          ] })
        ] })
      ] }),
      /* @__PURE__ */ u.jsxs("aside", { className: "split-side stack", children: [
        /* @__PURE__ */ u.jsx("p", { className: "label", children: "Remotes here" }),
        t.remotes.map((d) => /* @__PURE__ */ u.jsx(_c, { getHass: e, remote: d, groups: n, compact: !0, onSetup: () => l(d.ieee), onChanged: i }, d.ieee)),
        !t.remotes.length && /* @__PURE__ */ u.jsxs("p", { className: "muted small", children: [
          "No remotes in ",
          t.name,
          ". Set a remote's area in its device page, or bind one from the All remotes tab."
        ] })
      ] })
    ] })
  ] });
}
const sp = [
  { title: "Find its group", hint: "Press a scene button" },
  { title: "Choose lights", hint: "Creates the group in ZHA" },
  { title: "Bind", hint: "Press a dial button first" },
  { title: "Save button scenes", hint: "One per button" }
];
function ap({ getHass: e, remote: t, groups: n, onChanged: r, onClose: l }) {
  const { busy: i, result: o, act: s, clear: a } = El(), d = Yo(t, n), [m, h] = D.useState(Math.min(d.done, 3)), g = t.dial, y = d.group;
  D.useEffect(() => {
    h((S) => Math.max(S, Math.min(d.done, 3)));
  }, [d.done]);
  const k = (S) => {
    a(), h(S);
  };
  return /* @__PURE__ */ u.jsx("div", { className: "dialog-scrim", onClick: (S) => S.target === S.currentTarget && !i && l(), children: /* @__PURE__ */ u.jsxs("div", { className: "dialog", role: "dialog", "aria-modal": "true", "aria-label": `Set up ${t.name}`, children: [
    /* @__PURE__ */ u.jsxs("div", { className: "dialog-head", children: [
      /* @__PURE__ */ u.jsx("span", { className: "ricon", children: /* @__PURE__ */ u.jsx("ha-icon", { icon: "mdi:knob" }) }),
      /* @__PURE__ */ u.jsxs("div", { className: "grow", children: [
        /* @__PURE__ */ u.jsxs("h2", { children: [
          "Set up ",
          t.name
        ] }),
        /* @__PURE__ */ u.jsx("div", { className: "muted small", children: "Scene buttons that work even when Home Assistant is down" })
      ] }),
      /* @__PURE__ */ u.jsx("button", { className: "icon-btn", onClick: l, disabled: !!i, "aria-label": "Close", children: /* @__PURE__ */ u.jsx(W, { name: "close" }) })
    ] }),
    /* @__PURE__ */ u.jsxs("div", { className: "dialog-body", children: [
      /* @__PURE__ */ u.jsx("ol", { className: "stepper", children: sp.map((S, z) => {
        const f = [d.found, !!y, d.bound, d.saved][z];
        return /* @__PURE__ */ u.jsx("li", { children: /* @__PURE__ */ u.jsxs("button", { className: `step ${z === m ? "cur" : ""} ${f ? "done" : ""}`, onClick: () => k(z), disabled: !!i, children: [
          /* @__PURE__ */ u.jsx("span", { className: "num", children: f ? /* @__PURE__ */ u.jsx(W, { name: "check" }) : z + 1 }),
          /* @__PURE__ */ u.jsxs("span", { children: [
            /* @__PURE__ */ u.jsx("strong", { children: S.title }),
            /* @__PURE__ */ u.jsx("span", { className: "muted small", children: z === 0 && g ? `Uses group ${Cl(g.group_id)}` : S.hint })
          ] })
        ] }) }, S.title);
      }) }),
      /* @__PURE__ */ u.jsxs("div", { className: "dialog-main", children: [
        m === 0 && /* @__PURE__ */ u.jsx(up, { getHass: e, remote: t, busy: !!i, act: s, onChanged: r }),
        m === 1 && (g ? /* @__PURE__ */ u.jsx(cp, { getHass: e, remote: t, group: y, busy: !!i, act: s, onChanged: r }) : /* @__PURE__ */ u.jsx(ni, {})),
        m === 2 && (g && y ? /* @__PURE__ */ u.jsx(dp, { getHass: e, remote: t, group: y, bound: d.bound, busy: !!i, act: s, onChanged: r }) : /* @__PURE__ */ u.jsx(ni, {})),
        m === 3 && (g && y ? /* @__PURE__ */ u.jsx(fp, { getHass: e, remote: t, group: y, busy: !!i, act: s, onChanged: r }) : /* @__PURE__ */ u.jsx(ni, {})),
        i && /* @__PURE__ */ u.jsx("div", { className: "status busy", children: i }),
        o && /* @__PURE__ */ u.jsx("div", { className: `status ${o.kind}`, children: o.text })
      ] })
    ] }),
    /* @__PURE__ */ u.jsxs("div", { className: "dialog-foot", children: [
      /* @__PURE__ */ u.jsxs("span", { className: "muted small grow", children: [
        "Step ",
        m + 1,
        " of 4"
      ] }),
      m > 0 && /* @__PURE__ */ u.jsx("button", { disabled: !!i, onClick: () => k(m - 1), children: "Back" }),
      m < 3 ? /* @__PURE__ */ u.jsx("button", { className: "primary", disabled: !!i || d.done <= m, onClick: () => k(m + 1), children: "Next" }) : /* @__PURE__ */ u.jsx("button", { className: "primary", disabled: !!i, onClick: l, children: "Done" })
    ] })
  ] }) });
}
const ni = () => /* @__PURE__ */ u.jsx("p", { className: "muted", children: "Finish the earlier steps first." });
function up({ getHass: e, remote: t, busy: n, act: r, onChanged: l }) {
  const i = () => r(async () => {
    const o = await e().callWS({ type: "hue_remote_scenes/find_dial_group", ieee: t.ieee });
    return l(), `Its scene buttons use group ${Cl(o.group_id)}${o.exists ? ", which ZHA already has" : ""}.`;
  }, "Press one of the dial's scene buttons now, then again every few seconds until this finishes…");
  return /* @__PURE__ */ u.jsxs("div", { className: "step-body", children: [
    /* @__PURE__ */ u.jsx("h3", { className: "title", children: "Find the dial's group" }),
    /* @__PURE__ */ u.jsxs("p", { className: "muted", children: [
      "Each Tap Dial recalls its scenes on its own built-in group. Press ",
      /* @__PURE__ */ u.jsx("strong", { children: "Find its group" }),
      ", then press one of the dial's four buttons a few times so it wakes up and shows which group it uses."
    ] }),
    /* @__PURE__ */ u.jsx("div", { children: /* @__PURE__ */ u.jsxs("button", { className: "primary", disabled: n, onClick: i, children: [
      /* @__PURE__ */ u.jsx(W, { name: "magnify" }),
      " ",
      t.dial ? "Find again" : "Find its group"
    ] }) })
  ] });
}
function cp({ getHass: e, remote: t, group: n, busy: r, act: l, onChanged: i }) {
  const [o, s] = D.useState(null), [a, d] = D.useState(/* @__PURE__ */ new Set()), [m, h] = D.useState(t.name), g = e(), y = new Set((n == null ? void 0 : n.members.map((c) => c.key)) ?? []);
  D.useEffect(() => {
    e().callWS({ type: "hue_remote_scenes/lights" }).then((c) => s(c.lights)).catch(() => s([]));
  }, [e]);
  const k = (c) => d((p) => {
    const x = new Set(p);
    return x.has(c) ? x.delete(c) : x.add(c), x;
  }), S = () => l(async () => (await e().callWS({ type: "hue_remote_scenes/create_group", group_id: t.dial.group_id, name: (n == null ? void 0 : n.name) ?? m, members: [...a] }), d(/* @__PURE__ */ new Set()), i(), n ? `Added ${Te(a.size, "light")} to ${n.name}.` : `Created ${m}. Next, bind the dial to it.`), "Adding the lights to the group…"), z = /* @__PURE__ */ new Map();
  for (const c of o ?? []) {
    const p = c.area ?? Tt;
    z.set(p, [...z.get(p) ?? [], c]);
  }
  const f = [...z.keys()].sort(
    (c, p) => +(p === t.area) - +(c === t.area) || +(c === Tt) - +(p === Tt) || c.localeCompare(p)
  );
  return /* @__PURE__ */ u.jsxs("div", { className: "step-body", children: [
    /* @__PURE__ */ u.jsx("h3", { className: "title", children: n ? `Lights in ${n.name}` : "Which lights should the dial control?" }),
    /* @__PURE__ */ u.jsx("p", { className: "muted", children: n ? `${Te(n.members.length, "light")} are in the dial's group. Tick more to add them.` : "They'll go in a new ZHA group with the dial's ID. Only lights that can store scenes are listed." }),
    !o && /* @__PURE__ */ u.jsx("p", { className: "muted", children: "Loading lights…" }),
    o && !o.length && /* @__PURE__ */ u.jsx("p", { className: "muted", children: "No lights that can store scenes found." }),
    f.map((c) => /* @__PURE__ */ u.jsxs("div", { className: "stack-sm", children: [
      /* @__PURE__ */ u.jsx("p", { className: "label", children: c }),
      /* @__PURE__ */ u.jsx("div", { className: "picks", children: z.get(c).map((p) => {
        const x = y.has(p.key), j = x || a.has(p.key);
        return /* @__PURE__ */ u.jsxs("label", { className: `pick ${j ? "on" : ""}`, children: [
          /* @__PURE__ */ u.jsx("input", { type: "checkbox", checked: j, disabled: x || r, onChange: () => k(p.key) }),
          /* @__PURE__ */ u.jsx("span", { className: `bulb ${Xo(g, p.entity_id) ? "lit" : ""}` }),
          /* @__PURE__ */ u.jsx("span", { className: "grow", children: p.name })
        ] }, p.key);
      }) })
    ] }, c)),
    !n && /* @__PURE__ */ u.jsxs("label", { className: "stack-sm", children: [
      /* @__PURE__ */ u.jsx("strong", { children: "Group name" }),
      /* @__PURE__ */ u.jsx("input", { type: "text", value: m, maxLength: 40, onChange: (c) => h(c.target.value) })
    ] }),
    /* @__PURE__ */ u.jsxs("div", { className: "row-end", children: [
      /* @__PURE__ */ u.jsx("span", { className: "muted small grow", children: a.size ? `${Te(a.size, "light")} selected` : "" }),
      /* @__PURE__ */ u.jsxs("button", { className: "primary", disabled: r || !a.size || !n && !m.trim(), onClick: S, children: [
        /* @__PURE__ */ u.jsx(W, { name: "plus" }),
        " ",
        n ? "Add lights" : "Create group"
      ] })
    ] })
  ] });
}
function dp({ getHass: e, remote: t, group: n, bound: r, busy: l, act: i, onChanged: o }) {
  const s = t.endpoints.find((d) => d.clusters.includes(5)) ?? t.endpoints[0], a = () => i(async () => {
    const d = await e().callWS({
      type: "hue_remote_scenes/bind",
      ieee: t.ieee,
      endpoint: s.id,
      group_id: n.id,
      clusters: s.clusters,
      unbind: !1
    });
    o();
    const m = Object.entries(d.results).filter(([, h]) => h !== "ok");
    return m.length === Object.keys(d.results).length ? "The dial didn't answer. Press one of its buttons and try again." : m.length ? `Bound, but some parts didn't take (${m.map(([h, g]) => `${h}: ${g}`).join(", ")}). Try again.` : `Bound to ${n.name}.`;
  }, "Waiting for the dial… press one of its buttons.");
  return /* @__PURE__ */ u.jsxs("div", { className: "step-body", children: [
    /* @__PURE__ */ u.jsxs("h3", { className: "title", children: [
      "Bind the dial to ",
      n.name
    ] }),
    /* @__PURE__ */ u.jsxs("p", { className: "muted", children: [
      "Binding makes the dial talk to the lights directly over Zigbee. The dial is asleep most of the time:",
      " ",
      /* @__PURE__ */ u.jsx("strong", { children: "press one of its buttons" }),
      ", then press Bind."
    ] }),
    /* @__PURE__ */ u.jsxs("div", { className: "row-start", children: [
      /* @__PURE__ */ u.jsxs("button", { className: "primary", disabled: l, onClick: a, children: [
        /* @__PURE__ */ u.jsx(W, { name: "link-variant-plus" }),
        " ",
        r ? "Bind again" : "Bind"
      ] }),
      r && /* @__PURE__ */ u.jsx("span", { className: "chip ok", children: "Bound" })
    ] })
  ] });
}
function fp({ getHass: e, remote: t, group: n, busy: r, act: l, onChanged: i }) {
  const o = n.members.filter((a) => a.scenes), s = (a, d) => l(async () => {
    const m = await e().callWS({ type: "hue_remote_scenes/store", group_id: n.id, scene_id: a, ...d ? { name: d } : {} });
    i();
    const h = Object.keys(m.failed).length;
    return h ? `Saved on ${m.ok.length} of ${m.ok.length + h} lights; some didn't answer.` : `Saved on ${Te(m.ok.length, "light")}`;
  });
  return /* @__PURE__ */ u.jsxs("div", { className: "step-body", children: [
    /* @__PURE__ */ u.jsx("h3", { className: "title", children: "Save a scene for each button" }),
    /* @__PURE__ */ u.jsxs("p", { className: "muted", children: [
      "Set the ",
      n.name,
      " lights how you want them for a button, then save. Do this for each one. You can change them later from the area."
    ] }),
    /* @__PURE__ */ u.jsx("div", { className: "cards2", children: t.dial.buttons.map(([a, d]) => {
      const m = n.scenes.find((h) => h.id === d);
      return m ? /* @__PURE__ */ u.jsx(
        Zi,
        {
          scene: m,
          badge: pn(a),
          total: o.length,
          missing: "",
          busy: r,
          onRecall: () => l(async () => (await e().callWS({ type: "hue_remote_scenes/recall", group_id: n.id, scene_id: d }), `Recalled ${m.name}`)),
          onOverwrite: () => confirm(`Save how the lights are now as "${m.name}"?`) && s(d)
        },
        d
      ) : /* @__PURE__ */ u.jsx(Ji, { badge: pn(a), placeholder: `Scene for ${a}`, busy: r, onSave: (h) => s(d, h) }, d);
    }) })
  ] });
}
function pp() {
  return /* @__PURE__ */ u.jsxs("span", { className: "logo", "aria-hidden": "true", children: [
    /* @__PURE__ */ u.jsx("span", { className: "logo-ring" }),
    /* @__PURE__ */ u.jsxs("svg", { viewBox: "0 0 512 512", children: [
      /* @__PURE__ */ u.jsx("defs", { children: /* @__PURE__ */ u.jsxs("linearGradient", { id: "hrs-logo", x1: "0", y1: "0", x2: "1", y2: "1", children: [
        /* @__PURE__ */ u.jsx("stop", { offset: "0", stopColor: "#ffb020" }),
        /* @__PURE__ */ u.jsx("stop", { offset: ".5", stopColor: "#ff4f8b" }),
        /* @__PURE__ */ u.jsx("stop", { offset: "1", stopColor: "#5b6bff" })
      ] }) }),
      /* @__PURE__ */ u.jsx(
        "path",
        {
          fill: "url(#hrs-logo)",
          d: "M256 136C314 136 356 180 356 234C356 270 338 294 318 314C302 330 296 344 296 360L216 360C216 344 210 330 194 314C174 294 156 270 156 234C156 180 198 136 256 136Z"
        }
      ),
      /* @__PURE__ */ u.jsx("rect", { x: "216", y: "374", width: "80", height: "22", rx: "11", fill: "url(#hrs-logo)" })
    ] })
  ] });
}
const ri = 8;
function hp({ getHass: e, areas: t, groups: n, remotes: r, onOpen: l, onSetup: i }) {
  const o = t.reduce((a, d) => a + d.attention.length, 0), s = n.reduce((a, d) => a + d.scenes.length, 0);
  return /* @__PURE__ */ u.jsxs("div", { className: "stack", children: [
    /* @__PURE__ */ u.jsxs("div", { className: "stats", children: [
      /* @__PURE__ */ u.jsxs("div", { className: "stat", children: [
        /* @__PURE__ */ u.jsx("b", { children: t.length }),
        /* @__PURE__ */ u.jsx("span", { children: t.length === 1 ? "area" : "areas" })
      ] }),
      /* @__PURE__ */ u.jsxs("div", { className: "stat", children: [
        /* @__PURE__ */ u.jsx("b", { children: n.length }),
        /* @__PURE__ */ u.jsx("span", { children: n.length === 1 ? "group" : "groups" })
      ] }),
      /* @__PURE__ */ u.jsxs("div", { className: "stat", children: [
        /* @__PURE__ */ u.jsx("b", { children: s }),
        /* @__PURE__ */ u.jsx("span", { children: s === 1 ? "scene" : "scenes" })
      ] }),
      /* @__PURE__ */ u.jsxs("div", { className: "stat", children: [
        /* @__PURE__ */ u.jsx("b", { children: r.length }),
        /* @__PURE__ */ u.jsx("span", { children: r.length === 1 ? "remote" : "remotes" })
      ] }),
      /* @__PURE__ */ u.jsx("span", { className: "grow" }),
      o > 0 && /* @__PURE__ */ u.jsxs("div", { className: "alert", children: [
        /* @__PURE__ */ u.jsx(W, { name: "alert-outline" }),
        /* @__PURE__ */ u.jsxs("span", { children: [
          /* @__PURE__ */ u.jsx("strong", { children: Te(o, "remote") }),
          " ",
          o === 1 ? "needs" : "need",
          " set-up"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ u.jsx("div", { className: "tiles", children: t.map((a) => /* @__PURE__ */ u.jsx(mp, { getHass: e, area: a, groups: n, onOpen: () => l(a.name), onSetup: i }, a.name)) })
  ] });
}
function mp({ getHass: e, area: t, groups: n, onOpen: r, onSetup: l }) {
  const { busy: i, result: o, act: s } = El(), a = e(), d = kc(t.groups), m = wc(a, t.groups), h = [
    t.groups.length ? Te(t.groups.length, "group") : null,
    d ? Te(d, "light") : null,
    d ? m ? `${m} on` : "off" : null,
    t.remotes.length ? null : "no remote"
  ].filter(Boolean).join(" · "), g = (y, k, S) => s(async () => (await e().callWS({ type: "hue_remote_scenes/recall", group_id: y.id, scene_id: k }), `Recalled ${S}`));
  return /* @__PURE__ */ u.jsxs("section", { className: "tile", children: [
    /* @__PURE__ */ u.jsxs("div", { className: "card-head", children: [
      /* @__PURE__ */ u.jsx("span", { className: "aicon", children: /* @__PURE__ */ u.jsx("ha-icon", { icon: t.icon }) }),
      /* @__PURE__ */ u.jsxs("div", { className: "grow", children: [
        /* @__PURE__ */ u.jsx("h2", { children: t.name }),
        /* @__PURE__ */ u.jsx("div", { className: "muted small", children: h })
      ] }),
      /* @__PURE__ */ u.jsxs("button", { className: "ghost open", onClick: r, "aria-label": `Open ${t.name}`, children: [
        "Open ",
        /* @__PURE__ */ u.jsx(W, { name: "chevron-right" })
      ] })
    ] }),
    t.attention.map((y) => /* @__PURE__ */ u.jsxs("div", { className: "alert", children: [
      /* @__PURE__ */ u.jsx("ha-icon", { icon: bi(y) }),
      /* @__PURE__ */ u.jsxs("span", { className: "grow", children: [
        y.name,
        " needs set-up"
      ] }),
      /* @__PURE__ */ u.jsx("button", { className: "alert-btn", onClick: () => l(y.ieee), children: "Set up" })
    ] }, y.ieee)),
    t.remotes.filter((y) => !t.attention.includes(y)).map((y) => {
      const k = _l(y, n);
      return /* @__PURE__ */ u.jsxs("div", { className: "remote-line small", children: [
        /* @__PURE__ */ u.jsx("ha-icon", { icon: bi(y) }),
        /* @__PURE__ */ u.jsx("strong", { className: "grow", children: y.name }),
        /* @__PURE__ */ u.jsx("span", { className: `chip ${k.state === "ok" ? "ok" : ""}`, children: k.label })
      ] }, y.ieee);
    }),
    t.groups.map((y) => {
      const k = new Map(y.dials.flatMap((f) => f.buttons.map((c) => [c.scene_id, pn(c.label)]))), S = (f) => k.has(f) ? [...k.keys()].indexOf(f) : 100 + f, z = [...y.scenes].sort((f, c) => S(f.id) - S(c.id));
      return /* @__PURE__ */ u.jsxs("div", { className: "tile-group", children: [
        /* @__PURE__ */ u.jsxs("div", { className: "gname", children: [
          y.name,
          /* @__PURE__ */ u.jsx("span", { children: Te(y.members.length, "light") })
        ] }),
        z.length ? /* @__PURE__ */ u.jsxs("div", { className: "sws", children: [
          z.slice(0, ri).map((f) => /* @__PURE__ */ u.jsx(Nc, { scene: f, badge: k.get(f.id), disabled: !!i, onRecall: () => g(y, f.id, f.name) }, f.id)),
          z.length > ri && /* @__PURE__ */ u.jsxs("button", { className: "sw more-sw", onClick: r, children: [
            /* @__PURE__ */ u.jsxs("span", { className: "swc", children: [
              "+",
              z.length - ri
            ] }),
            /* @__PURE__ */ u.jsx("span", { className: "swn", children: "More" })
          ] })
        ] }) : /* @__PURE__ */ u.jsx("button", { className: "ghost empty-group", onClick: r, children: "No scenes yet. Open to save one." })
      ] }, y.id);
    }),
    o && /* @__PURE__ */ u.jsx("div", { className: `status ${o.kind}`, children: o.text })
  ] });
}
const oa = { attention: 0, ok: 1, idle: 2 };
function gp({ getHass: e, remotes: t, groups: n, onSetup: r, onChanged: l }) {
  const [i, o] = D.useState("all");
  if (!t.length)
    return /* @__PURE__ */ u.jsxs("div", { className: "empty-state", children: [
      /* @__PURE__ */ u.jsx(W, { name: "remote-off" }),
      /* @__PURE__ */ u.jsx("p", { children: "No remotes found. Pair a remote (like a Hue Tap Dial) with ZHA first." })
    ] });
  const s = t.map((h) => ({ r: h, s: _l(h, n).state })), a = (h) => s.filter((g) => g.s === h).length, d = s.filter((h) => i === "all" || h.s === i).sort((h, g) => oa[h.s] - oa[g.s] || h.r.name.localeCompare(g.r.name)), m = [
    ["all", "All", t.length],
    ["attention", "Needs set-up", a("attention")],
    ["idle", "Not set up", a("idle")]
  ];
  return /* @__PURE__ */ u.jsxs("div", { className: "stack", children: [
    /* @__PURE__ */ u.jsxs("div", { className: "row-start wrap", children: [
      m.map(
        ([h, g, y]) => h === "all" || y ? /* @__PURE__ */ u.jsxs("button", { className: `fchip ${i === h ? "on" : ""}`, onClick: () => o(h), children: [
          g,
          " ",
          /* @__PURE__ */ u.jsx("span", { children: y })
        ] }, h) : null
      ),
      /* @__PURE__ */ u.jsx("span", { className: "grow" }),
      /* @__PURE__ */ u.jsx("span", { className: "muted small", children: "Battery remotes sleep: press a button on one just before changing it." })
    ] }),
    /* @__PURE__ */ u.jsx("div", { className: "tiles", children: d.map(({ r: h }) => /* @__PURE__ */ u.jsx(_c, { getHass: e, remote: h, groups: n, onSetup: () => r(h.ieee), onChanged: l }, h.ieee)) })
  ] });
}
const vp = [
  { id: "areas", label: "Areas", icon: "home-outline" },
  { id: "remotes", label: "All remotes", icon: "remote" }
];
function yp({ getHass: e, narrow: t, onToggleMenu: n }) {
  const [r, l] = D.useState(null), [i, o] = D.useState(null), [s, a] = D.useState({}), [d, m] = D.useState("areas"), [h, g] = D.useState(null), [y, k] = D.useState(null), [S, z] = D.useState(""), f = D.useCallback(() => {
    const v = e();
    Promise.all([
      v.callWS({ type: "hue_remote_scenes/groups" }),
      v.callWS({ type: "hue_remote_scenes/remotes" })
    ]).then(([w, _]) => {
      l(w.groups), o(_.remotes), a({ ...w.area_icons, ..._.area_icons }), z("");
    }).catch((w) => z(jc(w)));
  }, [e]);
  D.useEffect(() => {
    f();
    const v = e().connection.subscribeMessage(f, { type: "hue_remote_scenes/subscribe" });
    return () => {
      v.then((w) => w()).catch(() => {
      });
    };
  }, [e, f]);
  const c = r && i ? rp(r, i, s) : null, p = c == null ? void 0 : c.find((v) => v.name === h), x = i == null ? void 0 : i.find((v) => v.ieee === y), j = (v) => {
    m(v), g(null);
  };
  return /* @__PURE__ */ u.jsxs("div", { className: "panel", children: [
    /* @__PURE__ */ u.jsxs("header", { children: [
      /* @__PURE__ */ u.jsxs("div", { className: "toolbar-row", children: [
        t && /* @__PURE__ */ u.jsx("button", { className: "menu", onClick: n, "aria-label": "Menu", children: /* @__PURE__ */ u.jsx(W, { name: "menu" }) }),
        /* @__PURE__ */ u.jsx(pp, {}),
        /* @__PURE__ */ u.jsx("h1", { children: "Hue remote scenes" })
      ] }),
      /* @__PURE__ */ u.jsx("nav", { className: "tabs", role: "tablist", children: vp.map((v) => /* @__PURE__ */ u.jsxs("button", { role: "tab", "aria-selected": v.id === d, className: v.id === d ? "on" : "", onClick: () => j(v.id), children: [
        /* @__PURE__ */ u.jsx(W, { name: v.icon }),
        /* @__PURE__ */ u.jsx("span", { children: v.label })
      ] }, v.id)) })
    ] }),
    /* @__PURE__ */ u.jsxs("main", { children: [
      S && /* @__PURE__ */ u.jsx("div", { className: "status error", children: S }),
      c && r && i && d === "areas" && !p && (c.length ? /* @__PURE__ */ u.jsx(hp, { getHass: e, areas: c, groups: r, remotes: i, onOpen: g, onSetup: k }) : /* @__PURE__ */ u.jsxs("div", { className: "empty-state", children: [
        /* @__PURE__ */ u.jsx(W, { name: "lightbulb-group-outline" }),
        /* @__PURE__ */ u.jsx("p", { children: "No ZHA groups or remotes yet. Create a group under Settings → Devices & services → Zigbee Home Automation → Configure → Groups. For a Hue Tap Dial, pair it and use the All remotes tab: it creates the group the dial needs." })
      ] })),
      p && r && d === "areas" && /* @__PURE__ */ u.jsx(op, { getHass: e, area: p, groups: r, onBack: () => g(null), onSetup: k, onChanged: f }),
      r && i && d === "remotes" && /* @__PURE__ */ u.jsx(gp, { getHass: e, remotes: i, groups: r, onSetup: k, onChanged: f })
    ] }),
    x && r && /* @__PURE__ */ u.jsx(ap, { getHass: e, remote: x, groups: r, onChanged: f, onClose: () => k(null) })
  ] });
}
const xp = (
  /* css */
  `
:host {
  --hrs-radius: 20px;
  --hrs-soft: color-mix(in srgb, var(--primary-text-color, #000) 6%, transparent);
  --hrs-soft-2: color-mix(in srgb, var(--primary-text-color, #000) 10%, transparent);
  --hrs-ok: var(--success-color, #43a047);
  --hrs-ok-bg: color-mix(in srgb, var(--hrs-ok) 15%, transparent);
  --hrs-ok-text: color-mix(in srgb, var(--hrs-ok) 70%, var(--primary-text-color));
  --hrs-warn: var(--warning-color, #ffa600);
  --hrs-warn-bg: color-mix(in srgb, var(--hrs-warn) 16%, transparent);
  --hrs-warn-text: color-mix(in srgb, var(--hrs-warn) 50%, var(--primary-text-color));
  --hrs-swatch-unknown: linear-gradient(135deg, var(--hrs-soft-2), var(--hrs-soft));
  display: block; height: 100%;
  background: var(--primary-background-color);
  color: var(--primary-text-color);
  font-family: var(--ha-font-family-body, var(--paper-font-body1_-_font-family, Roboto, sans-serif));
  font-size: 14px;
  -webkit-font-smoothing: antialiased;
}
* { box-sizing: border-box; }
.panel { min-height: 100%; background: var(--primary-background-color); }
.icon-wrap { display: inline-flex; align-items: center; justify-content: center; line-height: 0; --mdc-icon-size: 20px; }
.grow { flex: 1; min-width: 0; }
.muted { color: var(--secondary-text-color); }
.small { font-size: 12px; }
.tight { margin: -6px 0 0; }
strong { font-weight: 500; }
h2 { font-size: 18px; font-weight: 500; margin: 0; }
h3.title { font-size: 17px; font-weight: 500; margin: 0; }
.label { font-size: 12px; font-weight: 500; letter-spacing: .05em; text-transform: uppercase; color: var(--secondary-text-color); margin: 0; }
code { font-size: 13px; padding: 1px 5px; border-radius: 6px; background: var(--hrs-soft); }

/* Header: toolbar + tabs, like HA's own panels */
header { position: sticky; top: 0; z-index: 2; background: var(--app-header-background-color, var(--primary-color)); color: var(--app-header-text-color, #fff); border-bottom: var(--app-header-border-bottom, none); }
.toolbar-row { display: flex; align-items: center; gap: 10px; height: 56px; padding: 0 16px; }
.toolbar-row h1 { font-size: 20px; font-weight: 400; margin: 0; }
.logo { position: relative; width: 28px; height: 28px; flex: none; }
.logo svg { position: absolute; inset: 0; width: 100%; height: 100%; }
.logo-ring { position: absolute; inset: 1px; border-radius: 50%; background: conic-gradient(#ffb020, #ff6a3d, #ff4f8b, #b65cff, #5b6bff, #2f9bff, #19c3c0, #7fd36b, #ffb020); -webkit-mask: radial-gradient(circle, transparent 9.6px, #000 10.2px); mask: radial-gradient(circle, transparent 9.6px, #000 10.2px); }
.toolbar-row .menu { background: transparent; border: 0; color: inherit; padding: 8px; margin-left: -8px; border-radius: 50%; }
.tabs { display: flex; gap: 2px; padding: 0 8px; overflow-x: auto; scrollbar-width: none; }
.tabs button { flex: none; display: inline-flex; align-items: center; gap: 8px; border: 0; border-radius: 0; background: transparent; color: inherit; opacity: .72; padding: 12px 14px 10px; border-bottom: 2px solid transparent; font-weight: 500; }
.tabs button:hover { opacity: .95; background: rgba(127,127,127,.08); }
.tabs button.on { opacity: 1; border-bottom-color: currentColor; }
.tabs .icon-wrap { --mdc-icon-size: 18px; }

main { max-width: 1320px; margin: 0 auto; padding: 24px 20px 40px; display: flex; flex-direction: column; gap: 16px; }
.stack { display: flex; flex-direction: column; gap: 16px; }
.stack-sm { display: flex; flex-direction: column; gap: 8px; }
.row-start { display: flex; align-items: center; gap: 10px; }
.row-start.wrap { flex-wrap: wrap; }
.row-end { display: flex; align-items: center; justify-content: flex-end; gap: 10px; flex-wrap: wrap; }
.row-between { display: flex; justify-content: space-between; gap: 10px; }

/* Controls */
button { font: inherit; font-size: 14px; font-weight: 500; display: inline-flex; align-items: center; justify-content: center; gap: 6px; padding: 8px 14px; border-radius: 10px; border: 1px solid var(--divider-color); background: var(--card-background-color); color: var(--primary-text-color); cursor: pointer; transition: background .15s, border-color .15s, opacity .15s, transform .1s, box-shadow .15s; }
button:hover:not(:disabled) { background: var(--hrs-soft); }
button:active:not(:disabled) { transform: scale(.98); }
button:disabled { opacity: .45; cursor: default; }
button:focus-visible, input:focus-visible, select:focus-visible { outline: 2px solid var(--primary-color); outline-offset: 2px; }
button.primary { background: var(--primary-text-color); border-color: transparent; color: var(--card-background-color, #fff); }
button.primary:hover:not(:disabled) { background: var(--primary-text-color); opacity: .88; }
button.ghost { border-color: transparent; background: transparent; color: var(--secondary-text-color); padding: 6px 10px; }
button.ghost:hover:not(:disabled) { color: var(--primary-text-color); }
button.link { border: 0; background: none; padding: 0; color: var(--primary-color); font-weight: 500; }
button.danger, .menu button.danger { color: var(--error-color); }
.icon-btn { width: 34px; height: 34px; padding: 0; border: 0; border-radius: 9px; background: transparent; color: var(--secondary-text-color); flex: none; }
select, input[type=text] { font: inherit; font-size: 14px; padding: 9px 11px; border-radius: 10px; border: 1px solid var(--divider-color); background: var(--card-background-color); color: var(--primary-text-color); color-scheme: light dark; min-width: 0; }

.chip { display: inline-flex; align-items: center; gap: 5px; font-size: 12px; font-weight: 500; padding: 3px 9px; border-radius: 999px; background: var(--hrs-soft); color: var(--secondary-text-color); white-space: nowrap; }
.chip .icon-wrap { --mdc-icon-size: 14px; }
.chip.ok { background: var(--hrs-ok-bg); color: var(--hrs-ok-text); }
.chip.warn { background: var(--hrs-warn-bg); color: var(--hrs-warn-text); }
.fchip { border-radius: 999px; padding: 7px 14px; font-size: 13px; }
.fchip span { opacity: .65; }
.fchip.on { background: var(--primary-text-color); border-color: var(--primary-text-color); color: var(--card-background-color); }
.fchip.on:hover:not(:disabled) { background: var(--primary-text-color); }

.status { padding: 10px 14px; border-radius: 12px; font-size: 13px; background: var(--hrs-soft); }
.status.ok { background: var(--hrs-ok-bg); }
.status.error { background: color-mix(in srgb, var(--error-color, #db4437) 14%, transparent); color: var(--error-color); }
.status.busy { opacity: .85; }
.alert { display: flex; align-items: center; gap: 10px; padding: 9px 12px; border-radius: 12px; background: var(--hrs-warn-bg); color: var(--hrs-warn-text); --mdc-icon-size: 18px; }
.alert-btn { padding: 6px 12px; font-size: 13px; background: var(--card-background-color); border-color: color-mix(in srgb, var(--hrs-warn) 45%, transparent); color: inherit; }
.empty-state { display: flex; flex-direction: column; align-items: center; gap: 8px; text-align: center; padding: 48px 16px; color: var(--secondary-text-color); }
.empty-state .icon-wrap { --mdc-icon-size: 48px; opacity: .5; }
.empty-state p { max-width: 560px; line-height: 1.5; margin: 0; }

/* Cards and tiles */
.card, .tile { background: var(--card-background-color); border: 1px solid var(--divider-color); border-radius: var(--hrs-radius); box-shadow: var(--ha-card-box-shadow, none); padding: 18px 20px; display: flex; flex-direction: column; gap: 14px; min-width: 0; }
.card.attn { border-color: color-mix(in srgb, var(--hrs-warn) 55%, var(--divider-color)); }
.card.idle { background: color-mix(in srgb, var(--card-background-color) 70%, var(--primary-background-color)); }
.card-head { display: flex; align-items: center; gap: 12px; }
.aicon, .ricon { width: 40px; height: 40px; border-radius: 12px; background: var(--hrs-soft); color: var(--primary-text-color); display: inline-flex; align-items: center; justify-content: center; flex: none; --mdc-icon-size: 22px; }
.aicon.big { width: 44px; height: 44px; border-radius: 14px; }
.open { gap: 2px; }
.tiles { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 380px), 1fr)); gap: 16px; align-items: start; }

/* Overview */
.stats { display: flex; align-items: center; flex-wrap: wrap; row-gap: 12px; }
.stat { display: flex; flex-direction: column; padding: 0 20px; border-left: 1px solid var(--divider-color); }
.stat:first-child { border-left: 0; padding-left: 2px; }
.stat b { font-size: 22px; font-weight: 500; }
.stat span { font-size: 12px; color: var(--secondary-text-color); }
.remote-line { display: flex; align-items: center; gap: 8px; --mdc-icon-size: 18px; color: var(--secondary-text-color); }
.remote-line strong { color: var(--primary-text-color); }
.tile-group { display: flex; flex-direction: column; gap: 8px; }
.gname { font-size: 12px; font-weight: 500; letter-spacing: .05em; text-transform: uppercase; color: var(--secondary-text-color); display: flex; gap: 8px; align-items: baseline; }
.gname span { text-transform: none; letter-spacing: 0; font-weight: 400; }
.empty-group { justify-content: flex-start; padding: 6px 0; font-weight: 400; }

/* Swatches: tap to recall */
.sws { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 8px; }
.sw { display: flex; flex-direction: column; align-items: stretch; gap: 6px; padding: 0; border: 0; background: none; text-align: left; min-width: 0; }
.sw:hover:not(:disabled) { background: none; }
.sw:hover:not(:disabled) .swc { transform: translateY(-1px); box-shadow: inset 0 0 0 1px rgba(0,0,0,.08), 0 4px 12px -4px rgba(0,0,0,.3); }
.swc { position: relative; height: 46px; border-radius: 12px; box-shadow: inset 0 0 0 1px rgba(0,0,0,.08); transition: transform .15s, box-shadow .15s; display: flex; align-items: center; justify-content: center; font-weight: 500; color: var(--secondary-text-color); }
.swn { font-size: 12px; font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.more-sw .swc { background: var(--hrs-soft); }
.badge { position: absolute; left: 6px; top: 6px; font-size: 8px; line-height: 1; letter-spacing: 1px; padding: 3px 5px; border-radius: 999px; background: rgba(255,255,255,.92); color: #1d2433; }

/* An opened area */
.area-head { display: flex; flex-direction: column; gap: 8px; }
.crumbs { display: flex; align-items: center; gap: 4px; --mdc-icon-size: 16px; color: var(--secondary-text-color); }
.area-title { font-size: 26px; }
.split { display: flex; flex-wrap: wrap; gap: 20px; align-items: flex-start; }
.split-main { flex: 999 1 600px; min-width: 0; }
.split-side { flex: 1 1 300px; max-width: 420px; }
.cards4 { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 12px; }
.cards2 { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
.scard { position: relative; display: flex; flex-direction: column; border-radius: 16px; border: 1px solid var(--divider-color); background: var(--card-background-color); overflow: visible; min-width: 0; }
.scard-sw { position: relative; height: 84px; border: 0; border-radius: 15px 15px 0 0; padding: 0; box-shadow: inset 0 -1px 0 rgba(0,0,0,.06); }
.scard-sw:hover:not(:disabled) { filter: brightness(1.04); }
.scard-sw .badge { left: 10px; top: 10px; font-size: 10px; letter-spacing: 1.5px; padding: 3px 7px; }
.play { position: absolute; right: 10px; bottom: 10px; width: 34px; height: 34px; border-radius: 50%; background: rgba(255,255,255,.92); color: #1d2433; display: inline-flex; align-items: center; justify-content: center; --mdc-icon-size: 18px; }
.scard-foot { display: flex; align-items: center; gap: 4px; padding: 6px 4px 6px 12px; min-height: 46px; }
.scard-foot input { flex: 1; padding: 6px 8px; }
.sname { flex: 1; min-width: 0; font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.newcard { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; min-height: 132px; border-radius: 16px; border: 1.5px dashed var(--divider-color); background: transparent; color: var(--primary-text-color); padding: 12px; font-weight: 400; }
.newcard.open { align-items: stretch; justify-content: flex-start; gap: 8px; }
.newcard .icon-wrap { --mdc-icon-size: 22px; }
.newcard-dots { letter-spacing: 2px; font-size: 11px; color: var(--secondary-text-color); align-self: center; }
.newcard .row-end button { padding: 6px 12px; }

/* ⋮ menus */
.menu-backdrop { position: fixed; inset: 0; z-index: 5; }
.menu { position: absolute; left: 0; top: calc(100% - 4px); z-index: 6; min-width: 100%; width: max-content; padding: 6px; border-radius: 14px; background: var(--card-background-color); border: 1px solid var(--divider-color); box-shadow: 0 12px 32px -8px rgba(0,0,0,.35); display: flex; flex-direction: column; }
.menu button { justify-content: flex-start; border: 0; background: transparent; font-weight: 400; padding: 9px 10px; border-radius: 9px; --mdc-icon-size: 18px; }
.menu-note { font-size: 12px; color: var(--secondary-text-color); padding: 6px 10px 4px; border-top: 1px solid var(--divider-color); margin-top: 4px; }

/* Remotes */
.ctl { display: flex; align-items: center; gap: 10px; padding: 9px 12px; border-radius: 12px; background: var(--hrs-soft); --mdc-icon-size: 16px; }
.foot { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; border-top: 1px solid var(--divider-color); padding-top: 12px; }
.foot > .grow { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; min-width: 90px; }
.bind-row { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
.progress-block { display: flex; flex-direction: column; gap: 8px; }
.prog { height: 6px; border-radius: 999px; background: var(--hrs-soft-2); overflow: hidden; }
.prog span { display: block; height: 100%; border-radius: 999px; background: linear-gradient(90deg, #ffb020, #ff4f8b); }

/* Tap Dial set-up dialog */
.dialog-scrim { position: fixed; inset: 0; z-index: 10; background: rgba(15, 18, 26, .5); display: flex; align-items: flex-start; justify-content: center; padding: 6vh 16px; overflow-y: auto; }
.dialog { width: 100%; max-width: 860px; background: var(--card-background-color); color: var(--primary-text-color); border-radius: 24px; box-shadow: 0 30px 80px -20px rgba(0,0,0,.5); display: flex; flex-direction: column; overflow: hidden; }
.dialog-head { display: flex; align-items: center; gap: 14px; padding: 18px 18px 16px 24px; border-bottom: 1px solid var(--divider-color); }
.dialog-body { display: flex; flex-wrap: wrap; }
.stepper { list-style: none; margin: 0; padding: 16px 12px; flex: 1 1 220px; max-width: 260px; background: color-mix(in srgb, var(--primary-background-color) 70%, var(--card-background-color)); display: flex; flex-direction: column; gap: 2px; }
.step { width: 100%; display: flex; align-items: flex-start; gap: 12px; text-align: left; border: 0; background: transparent; padding: 10px 12px; border-radius: 12px; font-weight: 400; }
.step > span:last-child { display: flex; flex-direction: column; gap: 2px; }
.step.cur { background: var(--card-background-color); box-shadow: 0 1px 3px rgba(0,0,0,.1); }
.num { width: 26px; height: 26px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 500; flex: none; border: 1.5px solid var(--divider-color); color: var(--secondary-text-color); --mdc-icon-size: 15px; }
.step.done .num { background: var(--hrs-ok); border-color: var(--hrs-ok); color: #fff; }
.step.cur .num { background: var(--primary-text-color); border-color: var(--primary-text-color); color: var(--card-background-color); }
.dialog-main { flex: 999 1 420px; min-width: 0; padding: 22px 26px; display: flex; flex-direction: column; gap: 16px; }
.step-body { display: flex; flex-direction: column; gap: 14px; }
.step-body p { margin: 0; line-height: 1.5; }
.dialog-foot { display: flex; align-items: center; gap: 10px; padding: 14px 24px; border-top: 1px solid var(--divider-color); }
.picks { display: grid; grid-template-columns: repeat(auto-fill, minmax(190px, 1fr)); gap: 8px; }
.pick { display: flex; align-items: center; gap: 10px; padding: 9px 12px; border-radius: 12px; border: 1px solid var(--divider-color); cursor: pointer; }
.pick.on { border-color: var(--primary-text-color); background: var(--hrs-soft); }
.pick input { width: 18px; height: 18px; margin: 0; accent-color: var(--primary-text-color); }
.bulb { width: 22px; height: 22px; border-radius: 50%; flex: none; background: radial-gradient(circle at 35% 35%, var(--hrs-soft), var(--hrs-soft-2)); box-shadow: inset 0 0 0 1px rgba(0,0,0,.08); }
.bulb.lit { background: radial-gradient(circle at 35% 35%, #fff7e0, #ffc65c); }

@media (max-width: 600px) {
  main { padding: 14px 10px 28px; gap: 12px; }
  .card, .tile { padding: 14px; border-radius: 18px; }
  .tabs { padding: 0 4px; }
  .tabs button { padding: 12px 10px 10px; font-size: 13px; }
  .stat { padding: 0 12px; }
  .stat b { font-size: 18px; }
  .cards2 { grid-template-columns: 1fr 1fr; }
  .cards4 { grid-template-columns: 1fr 1fr; }
  .stepper { max-width: none; flex-direction: row; overflow-x: auto; }
  .step > span:last-child .small { display: none; }
  .dialog-scrim { padding: 0; }
  .dialog { border-radius: 0; min-height: 100%; }
}
`
);
class wp extends HTMLElement {
  constructor() {
    super(...arguments);
    yn(this, "_hass");
    yn(this, "_narrow", !1);
    yn(this, "_root");
    yn(this, "_pending");
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
      r.textContent = xp;
      const l = document.createElement("div");
      n.append(r, l), this._root = xc(l);
    }
    this._render();
  }
  disconnectedCallback() {
    var n, r;
    window.clearTimeout(this._pending), this._pending = void 0, (n = this._root) == null || n.unmount(), this._root = void 0, (r = this.shadowRoot) == null || r.replaceChildren();
  }
  _render() {
    !this._root || !this._hass || this._root.render(
      /* @__PURE__ */ u.jsx(
        yp,
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
customElements.get("hue-remote-scenes-panel") || customElements.define("hue-remote-scenes-panel", wp);
