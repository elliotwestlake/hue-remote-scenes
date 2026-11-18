var zc = Object.defineProperty;
var Pc = (e, t, n) => t in e ? zc(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var yn = (e, t, n) => Pc(e, typeof t != "symbol" ? t + "" : t, n);
var ca = { exports: {} }, cl = {}, da = { exports: {} }, $ = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var rr = Symbol.for("react.element"), Tc = Symbol.for("react.portal"), Lc = Symbol.for("react.fragment"), Rc = Symbol.for("react.strict_mode"), $c = Symbol.for("react.profiler"), Mc = Symbol.for("react.provider"), Oc = Symbol.for("react.context"), Dc = Symbol.for("react.forward_ref"), Fc = Symbol.for("react.suspense"), Ic = Symbol.for("react.memo"), Ac = Symbol.for("react.lazy"), qo = Symbol.iterator;
function Uc(e) {
  return e === null || typeof e != "object" ? null : (e = qo && e[qo] || e["@@iterator"], typeof e == "function" ? e : null);
}
var fa = { isMounted: function() {
  return !1;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, pa = Object.assign, ha = {};
function hn(e, t, n) {
  this.props = e, this.context = t, this.refs = ha, this.updater = n || fa;
}
hn.prototype.isReactComponent = {};
hn.prototype.setState = function(e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, e, t, "setState");
};
hn.prototype.forceUpdate = function(e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function ma() {
}
ma.prototype = hn.prototype;
function eo(e, t, n) {
  this.props = e, this.context = t, this.refs = ha, this.updater = n || fa;
}
var to = eo.prototype = new ma();
to.constructor = eo;
pa(to, hn.prototype);
to.isPureReactComponent = !0;
var es = Array.isArray, ga = Object.prototype.hasOwnProperty, no = { current: null }, va = { key: !0, ref: !0, __self: !0, __source: !0 };
function ya(e, t, n) {
  var r, l = {}, i = null, o = null;
  if (t != null) for (r in t.ref !== void 0 && (o = t.ref), t.key !== void 0 && (i = "" + t.key), t) ga.call(t, r) && !va.hasOwnProperty(r) && (l[r] = t[r]);
  var a = arguments.length - 2;
  if (a === 1) l.children = n;
  else if (1 < a) {
    for (var u = Array(a), d = 0; d < a; d++) u[d] = arguments[d + 2];
    l.children = u;
  }
  if (e && e.defaultProps) for (r in a = e.defaultProps, a) l[r] === void 0 && (l[r] = a[r]);
  return { $$typeof: rr, type: e, key: i, ref: o, props: l, _owner: no.current };
}
function Bc(e, t) {
  return { $$typeof: rr, type: e.type, key: t, ref: e.ref, props: e.props, _owner: e._owner };
}
function ro(e) {
  return typeof e == "object" && e !== null && e.$$typeof === rr;
}
function Wc(e) {
  var t = { "=": "=0", ":": "=2" };
  return "$" + e.replace(/[=:]/g, function(n) {
    return t[n];
  });
}
var ts = /\/+/g;
function Tl(e, t) {
  return typeof e == "object" && e !== null && e.key != null ? Wc("" + e.key) : t.toString(36);
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
        case Tc:
          o = !0;
      }
  }
  if (o) return o = e, l = l(o), e = r === "" ? "." + Tl(o, 0) : r, es(l) ? (n = "", e != null && (n = e.replace(ts, "$&/") + "/"), Er(l, t, n, "", function(d) {
    return d;
  })) : l != null && (ro(l) && (l = Bc(l, n + (!l.key || o && o.key === l.key ? "" : ("" + l.key).replace(ts, "$&/") + "/") + e)), t.push(l)), 1;
  if (o = 0, r = r === "" ? "." : r + ":", es(e)) for (var a = 0; a < e.length; a++) {
    i = e[a];
    var u = r + Tl(i, a);
    o += Er(i, t, n, u, l);
  }
  else if (u = Uc(e), typeof u == "function") for (e = u.call(e), a = 0; !(i = e.next()).done; ) i = i.value, u = r + Tl(i, a++), o += Er(i, t, n, u, l);
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
function Vc(e) {
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
var fe = { current: null }, zr = { transition: null }, Hc = { ReactCurrentDispatcher: fe, ReactCurrentBatchConfig: zr, ReactCurrentOwner: no };
function xa() {
  throw Error("act(...) is not supported in production builds of React.");
}
$.Children = { map: cr, forEach: function(e, t, n) {
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
  if (!ro(e)) throw Error("React.Children.only expected to receive a single React element child.");
  return e;
} };
$.Component = hn;
$.Fragment = Lc;
$.Profiler = $c;
$.PureComponent = eo;
$.StrictMode = Rc;
$.Suspense = Fc;
$.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Hc;
$.act = xa;
$.cloneElement = function(e, t, n) {
  if (e == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
  var r = pa({}, e.props), l = e.key, i = e.ref, o = e._owner;
  if (t != null) {
    if (t.ref !== void 0 && (i = t.ref, o = no.current), t.key !== void 0 && (l = "" + t.key), e.type && e.type.defaultProps) var a = e.type.defaultProps;
    for (u in t) ga.call(t, u) && !va.hasOwnProperty(u) && (r[u] = t[u] === void 0 && a !== void 0 ? a[u] : t[u]);
  }
  var u = arguments.length - 2;
  if (u === 1) r.children = n;
  else if (1 < u) {
    a = Array(u);
    for (var d = 0; d < u; d++) a[d] = arguments[d + 2];
    r.children = a;
  }
  return { $$typeof: rr, type: e.type, key: l, ref: i, props: r, _owner: o };
};
$.createContext = function(e) {
  return e = { $$typeof: Oc, _currentValue: e, _currentValue2: e, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, e.Provider = { $$typeof: Mc, _context: e }, e.Consumer = e;
};
$.createElement = ya;
$.createFactory = function(e) {
  var t = ya.bind(null, e);
  return t.type = e, t;
};
$.createRef = function() {
  return { current: null };
};
$.forwardRef = function(e) {
  return { $$typeof: Dc, render: e };
};
$.isValidElement = ro;
$.lazy = function(e) {
  return { $$typeof: Ac, _payload: { _status: -1, _result: e }, _init: Vc };
};
$.memo = function(e, t) {
  return { $$typeof: Ic, type: e, compare: t === void 0 ? null : t };
};
$.startTransition = function(e) {
  var t = zr.transition;
  zr.transition = {};
  try {
    e();
  } finally {
    zr.transition = t;
  }
};
$.unstable_act = xa;
$.useCallback = function(e, t) {
  return fe.current.useCallback(e, t);
};
$.useContext = function(e) {
  return fe.current.useContext(e);
};
$.useDebugValue = function() {
};
$.useDeferredValue = function(e) {
  return fe.current.useDeferredValue(e);
};
$.useEffect = function(e, t) {
  return fe.current.useEffect(e, t);
};
$.useId = function() {
  return fe.current.useId();
};
$.useImperativeHandle = function(e, t, n) {
  return fe.current.useImperativeHandle(e, t, n);
};
$.useInsertionEffect = function(e, t) {
  return fe.current.useInsertionEffect(e, t);
};
$.useLayoutEffect = function(e, t) {
  return fe.current.useLayoutEffect(e, t);
};
$.useMemo = function(e, t) {
  return fe.current.useMemo(e, t);
};
$.useReducer = function(e, t, n) {
  return fe.current.useReducer(e, t, n);
};
$.useRef = function(e) {
  return fe.current.useRef(e);
};
$.useState = function(e) {
  return fe.current.useState(e);
};
$.useSyncExternalStore = function(e, t, n) {
  return fe.current.useSyncExternalStore(e, t, n);
};
$.useTransition = function() {
  return fe.current.useTransition();
};
$.version = "18.3.1";
da.exports = $;
var O = da.exports;
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Qc = O, Kc = Symbol.for("react.element"), Gc = Symbol.for("react.fragment"), Yc = Object.prototype.hasOwnProperty, Xc = Qc.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, Zc = { key: !0, ref: !0, __self: !0, __source: !0 };
function wa(e, t, n) {
  var r, l = {}, i = null, o = null;
  n !== void 0 && (i = "" + n), t.key !== void 0 && (i = "" + t.key), t.ref !== void 0 && (o = t.ref);
  for (r in t) Yc.call(t, r) && !Zc.hasOwnProperty(r) && (l[r] = t[r]);
  if (e && e.defaultProps) for (r in t = e.defaultProps, t) l[r] === void 0 && (l[r] = t[r]);
  return { $$typeof: Kc, type: e, key: i, ref: o, props: l, _owner: Xc.current };
}
cl.Fragment = Gc;
cl.jsx = wa;
cl.jsxs = wa;
ca.exports = cl;
var s = ca.exports, ka = { exports: {} }, _e = {}, Sa = { exports: {} }, ja = {};
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
        var jt = 2 * (Y + 1) - 1, Pl = C[jt], Nt = jt + 1, ur = C[Nt];
        if (0 > l(Pl, L)) Nt < q && 0 > l(ur, Pl) ? (C[Y] = ur, C[Nt] = L, Y = Nt) : (C[Y] = Pl, C[jt] = L, Y = jt);
        else if (Nt < q && 0 > l(ur, L)) C[Y] = ur, C[Nt] = L, Y = Nt;
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
    var o = Date, a = o.now();
    e.unstable_now = function() {
      return o.now() - a;
    };
  }
  var u = [], d = [], m = 1, g = null, h = 3, y = !1, S = !1, j = !1, E = typeof setTimeout == "function" ? setTimeout : null, f = typeof clearTimeout == "function" ? clearTimeout : null, c = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function p(C) {
    for (var P = n(d); P !== null; ) {
      if (P.callback === null) r(d);
      else if (P.startTime <= C) r(d), P.sortIndex = P.expirationTime, t(u, P);
      else break;
      P = n(d);
    }
  }
  function x(C) {
    if (j = !1, p(C), !S) if (n(u) !== null) S = !0, F(k);
    else {
      var P = n(d);
      P !== null && ne(x, P.startTime - C);
    }
  }
  function k(C, P) {
    S = !1, j && (j = !1, f(_), _ = -1), y = !0;
    var L = h;
    try {
      for (p(P), g = n(u); g !== null && (!(g.expirationTime > P) || C && !xe()); ) {
        var Y = g.callback;
        if (typeof Y == "function") {
          g.callback = null, h = g.priorityLevel;
          var q = Y(g.expirationTime <= P);
          P = e.unstable_now(), typeof q == "function" ? g.callback = q : g === n(u) && r(u), p(P);
        } else r(u);
        g = n(u);
      }
      if (g !== null) var ar = !0;
      else {
        var jt = n(d);
        jt !== null && ne(x, jt.startTime - P), ar = !1;
      }
      return ar;
    } finally {
      g = null, h = L, y = !1;
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
    E(Ue, 0);
  };
  function F(C) {
    w = C, v || (v = !0, nt());
  }
  function ne(C, P) {
    _ = E(function() {
      C(e.unstable_now());
    }, P);
  }
  e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(C) {
    C.callback = null;
  }, e.unstable_continueExecution = function() {
    S || y || (S = !0, F(k));
  }, e.unstable_forceFrameRate = function(C) {
    0 > C || 125 < C ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : V = 0 < C ? Math.floor(1e3 / C) : 5;
  }, e.unstable_getCurrentPriorityLevel = function() {
    return h;
  }, e.unstable_getFirstCallbackNode = function() {
    return n(u);
  }, e.unstable_next = function(C) {
    switch (h) {
      case 1:
      case 2:
      case 3:
        var P = 3;
        break;
      default:
        P = h;
    }
    var L = h;
    h = P;
    try {
      return C();
    } finally {
      h = L;
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
    var L = h;
    h = C;
    try {
      return P();
    } finally {
      h = L;
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
    return q = L + q, C = { id: m++, callback: P, priorityLevel: C, startTime: L, expirationTime: q, sortIndex: -1 }, L > Y ? (C.sortIndex = L, t(d, C), n(u) === null && C === n(d) && (j ? (f(_), _ = -1) : j = !0, ne(x, L - Y))) : (C.sortIndex = q, t(u, C), S || y || (S = !0, F(k))), C;
  }, e.unstable_shouldYield = xe, e.unstable_wrapCallback = function(C) {
    var P = h;
    return function() {
      var L = h;
      h = P;
      try {
        return C.apply(this, arguments);
      } finally {
        h = L;
      }
    };
  };
})(ja);
Sa.exports = ja;
var bc = Sa.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Jc = O, Ne = bc;
function N(e) {
  for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
  return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var Na = /* @__PURE__ */ new Set(), Un = {};
function It(e, t) {
  on(e, t), on(e + "Capture", t);
}
function on(e, t) {
  for (Un[e] = t, e = 0; e < t.length; e++) Na.add(t[e]);
}
var be = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), ii = Object.prototype.hasOwnProperty, qc = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, ns = {}, rs = {};
function ed(e) {
  return ii.call(rs, e) ? !0 : ii.call(ns, e) ? !1 : qc.test(e) ? rs[e] = !0 : (ns[e] = !0, !1);
}
function td(e, t, n, r) {
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
function nd(e, t, n, r) {
  if (t === null || typeof t > "u" || td(e, t, n, r)) return !0;
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
var lo = /[\-:]([a-z])/g;
function io(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
  var t = e.replace(
    lo,
    io
  );
  ie[t] = new pe(t, 1, !1, e, null, !1, !1);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
  var t = e.replace(lo, io);
  ie[t] = new pe(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
});
["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
  var t = e.replace(lo, io);
  ie[t] = new pe(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function(e) {
  ie[e] = new pe(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
ie.xlinkHref = new pe("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);
["src", "href", "action", "formAction"].forEach(function(e) {
  ie[e] = new pe(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function oo(e, t, n, r) {
  var l = ie.hasOwnProperty(t) ? ie[t] : null;
  (l !== null ? l.type !== 0 : r || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (nd(t, n, l, r) && (n = null), r || l === null ? ed(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n)) : l.mustUseProperty ? e[l.propertyName] = n === null ? l.type === 3 ? !1 : "" : n : (t = l.attributeName, r = l.attributeNamespace, n === null ? e.removeAttribute(t) : (l = l.type, n = l === 3 || l === 4 && n === !0 ? "" : "" + n, r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
var tt = Jc.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, dr = Symbol.for("react.element"), Bt = Symbol.for("react.portal"), Wt = Symbol.for("react.fragment"), so = Symbol.for("react.strict_mode"), oi = Symbol.for("react.profiler"), _a = Symbol.for("react.provider"), Ca = Symbol.for("react.context"), ao = Symbol.for("react.forward_ref"), si = Symbol.for("react.suspense"), ai = Symbol.for("react.suspense_list"), uo = Symbol.for("react.memo"), lt = Symbol.for("react.lazy"), Ea = Symbol.for("react.offscreen"), ls = Symbol.iterator;
function xn(e) {
  return e === null || typeof e != "object" ? null : (e = ls && e[ls] || e["@@iterator"], typeof e == "function" ? e : null);
}
var K = Object.assign, Ll;
function En(e) {
  if (Ll === void 0) try {
    throw Error();
  } catch (n) {
    var t = n.stack.trim().match(/\n( *(at )?)/);
    Ll = t && t[1] || "";
  }
  return `
` + Ll + e;
}
var Rl = !1;
function $l(e, t) {
  if (!e || Rl) return "";
  Rl = !0;
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
    Rl = !1, Error.prepareStackTrace = n;
  }
  return (e = e ? e.displayName || e.name : "") ? En(e) : "";
}
function rd(e) {
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
      return e = $l(e.type, !1), e;
    case 11:
      return e = $l(e.type.render, !1), e;
    case 1:
      return e = $l(e.type, !0), e;
    default:
      return "";
  }
}
function ui(e) {
  if (e == null) return null;
  if (typeof e == "function") return e.displayName || e.name || null;
  if (typeof e == "string") return e;
  switch (e) {
    case Wt:
      return "Fragment";
    case Bt:
      return "Portal";
    case oi:
      return "Profiler";
    case so:
      return "StrictMode";
    case si:
      return "Suspense";
    case ai:
      return "SuspenseList";
  }
  if (typeof e == "object") switch (e.$$typeof) {
    case Ca:
      return (e.displayName || "Context") + ".Consumer";
    case _a:
      return (e._context.displayName || "Context") + ".Provider";
    case ao:
      var t = e.render;
      return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
    case uo:
      return t = e.displayName || null, t !== null ? t : ui(e.type) || "Memo";
    case lt:
      t = e._payload, e = e._init;
      try {
        return ui(e(t));
      } catch {
      }
  }
  return null;
}
function ld(e) {
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
      return ui(t);
    case 8:
      return t === so ? "StrictMode" : "Mode";
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
function za(e) {
  var t = e.type;
  return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
}
function id(e) {
  var t = za(e) ? "checked" : "value", n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t), r = "" + e[t];
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
  e._valueTracker || (e._valueTracker = id(e));
}
function Pa(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(), r = "";
  return e && (r = za(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n ? (t.setValue(e), !0) : !1;
}
function Ar(e) {
  if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function ci(e, t) {
  var n = t.checked;
  return K({}, t, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: n ?? e._wrapperState.initialChecked });
}
function is(e, t) {
  var n = t.defaultValue == null ? "" : t.defaultValue, r = t.checked != null ? t.checked : t.defaultChecked;
  n = yt(t.value != null ? t.value : n), e._wrapperState = { initialChecked: r, initialValue: n, controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null };
}
function Ta(e, t) {
  t = t.checked, t != null && oo(e, "checked", t, !1);
}
function di(e, t) {
  Ta(e, t);
  var n = yt(t.value), r = t.type;
  if (n != null) r === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + n) : e.value !== "" + n && (e.value = "" + n);
  else if (r === "submit" || r === "reset") {
    e.removeAttribute("value");
    return;
  }
  t.hasOwnProperty("value") ? fi(e, t.type, n) : t.hasOwnProperty("defaultValue") && fi(e, t.type, yt(t.defaultValue)), t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked);
}
function os(e, t, n) {
  if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
    var r = t.type;
    if (!(r !== "submit" && r !== "reset" || t.value !== void 0 && t.value !== null)) return;
    t = "" + e._wrapperState.initialValue, n || t === e.value || (e.value = t), e.defaultValue = t;
  }
  n = e.name, n !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, n !== "" && (e.name = n);
}
function fi(e, t, n) {
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
function pi(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(N(91));
  return K({}, t, { value: void 0, defaultValue: void 0, children: "" + e._wrapperState.initialValue });
}
function ss(e, t) {
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
function La(e, t) {
  var n = yt(t.value), r = yt(t.defaultValue);
  n != null && (n = "" + n, n !== e.value && (e.value = n), t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)), r != null && (e.defaultValue = "" + r);
}
function as(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
}
function Ra(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function hi(e, t) {
  return e == null || e === "http://www.w3.org/1999/xhtml" ? Ra(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e;
}
var pr, $a = function(e) {
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
}, od = ["Webkit", "ms", "Moz", "O"];
Object.keys(Ln).forEach(function(e) {
  od.forEach(function(t) {
    t = t + e.charAt(0).toUpperCase() + e.substring(1), Ln[t] = Ln[e];
  });
});
function Ma(e, t, n) {
  return t == null || typeof t == "boolean" || t === "" ? "" : n || typeof t != "number" || t === 0 || Ln.hasOwnProperty(e) && Ln[e] ? ("" + t).trim() : t + "px";
}
function Oa(e, t) {
  e = e.style;
  for (var n in t) if (t.hasOwnProperty(n)) {
    var r = n.indexOf("--") === 0, l = Ma(n, t[n], r);
    n === "float" && (n = "cssFloat"), r ? e.setProperty(n, l) : e[n] = l;
  }
}
var sd = K({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
function mi(e, t) {
  if (t) {
    if (sd[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(N(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(N(60));
      if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML)) throw Error(N(61));
    }
    if (t.style != null && typeof t.style != "object") throw Error(N(62));
  }
}
function gi(e, t) {
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
var vi = null;
function co(e) {
  return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
}
var yi = null, en = null, tn = null;
function us(e) {
  if (e = or(e)) {
    if (typeof yi != "function") throw Error(N(280));
    var t = e.stateNode;
    t && (t = ml(t), yi(e.stateNode, e.type, t));
  }
}
function Da(e) {
  en ? tn ? tn.push(e) : tn = [e] : en = e;
}
function Fa() {
  if (en) {
    var e = en, t = tn;
    if (tn = en = null, us(e), t) for (e = 0; e < t.length; e++) us(t[e]);
  }
}
function Ia(e, t) {
  return e(t);
}
function Aa() {
}
var Ml = !1;
function Ua(e, t, n) {
  if (Ml) return e(t, n);
  Ml = !0;
  try {
    return Ia(e, t, n);
  } finally {
    Ml = !1, (en !== null || tn !== null) && (Aa(), Fa());
  }
}
function Wn(e, t) {
  var n = e.stateNode;
  if (n === null) return null;
  var r = ml(n);
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
var xi = !1;
if (be) try {
  var wn = {};
  Object.defineProperty(wn, "passive", { get: function() {
    xi = !0;
  } }), window.addEventListener("test", wn, wn), window.removeEventListener("test", wn, wn);
} catch {
  xi = !1;
}
function ad(e, t, n, r, l, i, o, a, u) {
  var d = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, d);
  } catch (m) {
    this.onError(m);
  }
}
var Rn = !1, Ur = null, Br = !1, wi = null, ud = { onError: function(e) {
  Rn = !0, Ur = e;
} };
function cd(e, t, n, r, l, i, o, a, u) {
  Rn = !1, Ur = null, ad.apply(ud, arguments);
}
function dd(e, t, n, r, l, i, o, a, u) {
  if (cd.apply(this, arguments), Rn) {
    if (Rn) {
      var d = Ur;
      Rn = !1, Ur = null;
    } else throw Error(N(198));
    Br || (Br = !0, wi = d);
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
function Ba(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
  }
  return null;
}
function cs(e) {
  if (At(e) !== e) throw Error(N(188));
}
function fd(e) {
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
        if (i === n) return cs(l), e;
        if (i === r) return cs(l), t;
        i = i.sibling;
      }
      throw Error(N(188));
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
        if (!o) throw Error(N(189));
      }
    }
    if (n.alternate !== r) throw Error(N(190));
  }
  if (n.tag !== 3) throw Error(N(188));
  return n.stateNode.current === n ? e : t;
}
function Wa(e) {
  return e = fd(e), e !== null ? Va(e) : null;
}
function Va(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var t = Va(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var Ha = Ne.unstable_scheduleCallback, ds = Ne.unstable_cancelCallback, pd = Ne.unstable_shouldYield, hd = Ne.unstable_requestPaint, X = Ne.unstable_now, md = Ne.unstable_getCurrentPriorityLevel, fo = Ne.unstable_ImmediatePriority, Qa = Ne.unstable_UserBlockingPriority, Wr = Ne.unstable_NormalPriority, gd = Ne.unstable_LowPriority, Ka = Ne.unstable_IdlePriority, dl = null, He = null;
function vd(e) {
  if (He && typeof He.onCommitFiberRoot == "function") try {
    He.onCommitFiberRoot(dl, e, void 0, (e.current.flags & 128) === 128);
  } catch {
  }
}
var Fe = Math.clz32 ? Math.clz32 : wd, yd = Math.log, xd = Math.LN2;
function wd(e) {
  return e >>>= 0, e === 0 ? 32 : 31 - (yd(e) / xd | 0) | 0;
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
    var a = o & ~l;
    a !== 0 ? r = Pn(a) : (i &= o, i !== 0 && (r = Pn(i)));
  } else o = n & ~l, o !== 0 ? r = Pn(o) : i !== 0 && (r = Pn(i));
  if (r === 0) return 0;
  if (t !== 0 && t !== r && !(t & l) && (l = r & -r, i = t & -t, l >= i || l === 16 && (i & 4194240) !== 0)) return t;
  if (r & 4 && (r |= n & 16), t = e.entangledLanes, t !== 0) for (e = e.entanglements, t &= r; 0 < t; ) n = 31 - Fe(t), l = 1 << n, r |= e[n], t &= ~l;
  return r;
}
function kd(e, t) {
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
function Sd(e, t) {
  for (var n = e.suspendedLanes, r = e.pingedLanes, l = e.expirationTimes, i = e.pendingLanes; 0 < i; ) {
    var o = 31 - Fe(i), a = 1 << o, u = l[o];
    u === -1 ? (!(a & n) || a & r) && (l[o] = kd(a, t)) : u <= t && (e.expiredLanes |= a), i &= ~a;
  }
}
function ki(e) {
  return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
}
function Ga() {
  var e = hr;
  return hr <<= 1, !(hr & 4194240) && (hr = 64), e;
}
function Ol(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t;
}
function lr(e, t, n) {
  e.pendingLanes |= t, t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, t = 31 - Fe(t), e[t] = n;
}
function jd(e, t) {
  var n = e.pendingLanes & ~t;
  e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
  var r = e.eventTimes;
  for (e = e.expirationTimes; 0 < n; ) {
    var l = 31 - Fe(n), i = 1 << l;
    t[l] = 0, r[l] = -1, e[l] = -1, n &= ~i;
  }
}
function po(e, t) {
  var n = e.entangledLanes |= t;
  for (e = e.entanglements; n; ) {
    var r = 31 - Fe(n), l = 1 << r;
    l & t | e[r] & t && (e[r] |= t), n &= ~l;
  }
}
var D = 0;
function Ya(e) {
  return e &= -e, 1 < e ? 4 < e ? e & 268435455 ? 16 : 536870912 : 4 : 1;
}
var Xa, ho, Za, ba, Ja, Si = !1, gr = [], ct = null, dt = null, ft = null, Vn = /* @__PURE__ */ new Map(), Hn = /* @__PURE__ */ new Map(), ot = [], Nd = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function fs(e, t) {
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
  return e === null || e.nativeEvent !== i ? (e = { blockedOn: t, domEventName: n, eventSystemFlags: r, nativeEvent: i, targetContainers: [l] }, t !== null && (t = or(t), t !== null && ho(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, l !== null && t.indexOf(l) === -1 && t.push(l), e);
}
function _d(e, t, n, r, l) {
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
function qa(e) {
  var t = Et(e.target);
  if (t !== null) {
    var n = At(t);
    if (n !== null) {
      if (t = n.tag, t === 13) {
        if (t = Ba(n), t !== null) {
          e.blockedOn = t, Ja(e.priority, function() {
            Za(n);
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
    var n = ji(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var r = new n.constructor(n.type, n);
      vi = r, n.target.dispatchEvent(r), vi = null;
    } else return t = or(n), t !== null && ho(t), e.blockedOn = n, !1;
    t.shift();
  }
  return !0;
}
function ps(e, t, n) {
  Pr(e) && n.delete(t);
}
function Cd() {
  Si = !1, ct !== null && Pr(ct) && (ct = null), dt !== null && Pr(dt) && (dt = null), ft !== null && Pr(ft) && (ft = null), Vn.forEach(ps), Hn.forEach(ps);
}
function Sn(e, t) {
  e.blockedOn === t && (e.blockedOn = null, Si || (Si = !0, Ne.unstable_scheduleCallback(Ne.unstable_NormalPriority, Cd)));
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
  for (; 0 < ot.length && (n = ot[0], n.blockedOn === null); ) qa(n), n.blockedOn === null && ot.shift();
}
var nn = tt.ReactCurrentBatchConfig, Hr = !0;
function Ed(e, t, n, r) {
  var l = D, i = nn.transition;
  nn.transition = null;
  try {
    D = 1, mo(e, t, n, r);
  } finally {
    D = l, nn.transition = i;
  }
}
function zd(e, t, n, r) {
  var l = D, i = nn.transition;
  nn.transition = null;
  try {
    D = 4, mo(e, t, n, r);
  } finally {
    D = l, nn.transition = i;
  }
}
function mo(e, t, n, r) {
  if (Hr) {
    var l = ji(e, t, n, r);
    if (l === null) Ql(e, t, r, Qr, n), fs(e, r);
    else if (_d(l, e, t, n, r)) r.stopPropagation();
    else if (fs(e, r), t & 4 && -1 < Nd.indexOf(e)) {
      for (; l !== null; ) {
        var i = or(l);
        if (i !== null && Xa(i), i = ji(e, t, n, r), i === null && Ql(e, t, r, Qr, n), i === l) break;
        l = i;
      }
      l !== null && r.stopPropagation();
    } else Ql(e, t, r, null, n);
  }
}
var Qr = null;
function ji(e, t, n, r) {
  if (Qr = null, e = co(r), e = Et(e), e !== null) if (t = At(e), t === null) e = null;
  else if (n = t.tag, n === 13) {
    if (e = Ba(t), e !== null) return e;
    e = null;
  } else if (n === 3) {
    if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
    e = null;
  } else t !== e && (e = null);
  return Qr = e, null;
}
function eu(e) {
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
      switch (md()) {
        case fo:
          return 1;
        case Qa:
          return 4;
        case Wr:
        case gd:
          return 16;
        case Ka:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var at = null, go = null, Tr = null;
function tu() {
  if (Tr) return Tr;
  var e, t = go, n = t.length, r, l = "value" in at ? at.value : at.textContent, i = l.length;
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
function hs() {
  return !1;
}
function Ce(e) {
  function t(n, r, l, i, o) {
    this._reactName = n, this._targetInst = l, this.type = r, this.nativeEvent = i, this.target = o, this.currentTarget = null;
    for (var a in e) e.hasOwnProperty(a) && (n = e[a], this[a] = n ? n(i) : i[a]);
    return this.isDefaultPrevented = (i.defaultPrevented != null ? i.defaultPrevented : i.returnValue === !1) ? vr : hs, this.isPropagationStopped = hs, this;
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
}, defaultPrevented: 0, isTrusted: 0 }, vo = Ce(mn), ir = K({}, mn, { view: 0, detail: 0 }), Pd = Ce(ir), Dl, Fl, jn, fl = K({}, ir, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: yo, button: 0, buttons: 0, relatedTarget: function(e) {
  return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
}, movementX: function(e) {
  return "movementX" in e ? e.movementX : (e !== jn && (jn && e.type === "mousemove" ? (Dl = e.screenX - jn.screenX, Fl = e.screenY - jn.screenY) : Fl = Dl = 0, jn = e), Dl);
}, movementY: function(e) {
  return "movementY" in e ? e.movementY : Fl;
} }), ms = Ce(fl), Td = K({}, fl, { dataTransfer: 0 }), Ld = Ce(Td), Rd = K({}, ir, { relatedTarget: 0 }), Il = Ce(Rd), $d = K({}, mn, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Md = Ce($d), Od = K({}, mn, { clipboardData: function(e) {
  return "clipboardData" in e ? e.clipboardData : window.clipboardData;
} }), Dd = Ce(Od), Fd = K({}, mn, { data: 0 }), gs = Ce(Fd), Id = {
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
}, Ad = {
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
}, Ud = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function Bd(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = Ud[e]) ? !!t[e] : !1;
}
function yo() {
  return Bd;
}
var Wd = K({}, ir, { key: function(e) {
  if (e.key) {
    var t = Id[e.key] || e.key;
    if (t !== "Unidentified") return t;
  }
  return e.type === "keypress" ? (e = Lr(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Ad[e.keyCode] || "Unidentified" : "";
}, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: yo, charCode: function(e) {
  return e.type === "keypress" ? Lr(e) : 0;
}, keyCode: function(e) {
  return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
}, which: function(e) {
  return e.type === "keypress" ? Lr(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
} }), Vd = Ce(Wd), Hd = K({}, fl, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), vs = Ce(Hd), Qd = K({}, ir, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: yo }), Kd = Ce(Qd), Gd = K({}, mn, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), Yd = Ce(Gd), Xd = K({}, fl, {
  deltaX: function(e) {
    return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
  },
  deltaY: function(e) {
    return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), Zd = Ce(Xd), bd = [9, 13, 27, 32], xo = be && "CompositionEvent" in window, $n = null;
be && "documentMode" in document && ($n = document.documentMode);
var Jd = be && "TextEvent" in window && !$n, nu = be && (!xo || $n && 8 < $n && 11 >= $n), ys = " ", xs = !1;
function ru(e, t) {
  switch (e) {
    case "keyup":
      return bd.indexOf(t.keyCode) !== -1;
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
function lu(e) {
  return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
}
var Vt = !1;
function qd(e, t) {
  switch (e) {
    case "compositionend":
      return lu(t);
    case "keypress":
      return t.which !== 32 ? null : (xs = !0, ys);
    case "textInput":
      return e = t.data, e === ys && xs ? null : e;
    default:
      return null;
  }
}
function ef(e, t) {
  if (Vt) return e === "compositionend" || !xo && ru(e, t) ? (e = tu(), Tr = go = at = null, Vt = !1, e) : null;
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
      return nu && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var tf = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
function ws(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!tf[e.type] : t === "textarea";
}
function iu(e, t, n, r) {
  Da(r), t = Kr(t, "onChange"), 0 < t.length && (n = new vo("onChange", "change", null, n, r), e.push({ event: n, listeners: t }));
}
var Mn = null, Kn = null;
function nf(e) {
  gu(e, 0);
}
function pl(e) {
  var t = Kt(e);
  if (Pa(t)) return e;
}
function rf(e, t) {
  if (e === "change") return t;
}
var ou = !1;
if (be) {
  var Al;
  if (be) {
    var Ul = "oninput" in document;
    if (!Ul) {
      var ks = document.createElement("div");
      ks.setAttribute("oninput", "return;"), Ul = typeof ks.oninput == "function";
    }
    Al = Ul;
  } else Al = !1;
  ou = Al && (!document.documentMode || 9 < document.documentMode);
}
function Ss() {
  Mn && (Mn.detachEvent("onpropertychange", su), Kn = Mn = null);
}
function su(e) {
  if (e.propertyName === "value" && pl(Kn)) {
    var t = [];
    iu(t, Kn, e, co(e)), Ua(nf, t);
  }
}
function lf(e, t, n) {
  e === "focusin" ? (Ss(), Mn = t, Kn = n, Mn.attachEvent("onpropertychange", su)) : e === "focusout" && Ss();
}
function of(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown") return pl(Kn);
}
function sf(e, t) {
  if (e === "click") return pl(t);
}
function af(e, t) {
  if (e === "input" || e === "change") return pl(t);
}
function uf(e, t) {
  return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
}
var Ae = typeof Object.is == "function" ? Object.is : uf;
function Gn(e, t) {
  if (Ae(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null) return !1;
  var n = Object.keys(e), r = Object.keys(t);
  if (n.length !== r.length) return !1;
  for (r = 0; r < n.length; r++) {
    var l = n[r];
    if (!ii.call(t, l) || !Ae(e[l], t[l])) return !1;
  }
  return !0;
}
function js(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function Ns(e, t) {
  var n = js(e);
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
    n = js(n);
  }
}
function au(e, t) {
  return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? au(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
}
function uu() {
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
function wo(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
}
function cf(e) {
  var t = uu(), n = e.focusedElem, r = e.selectionRange;
  if (t !== n && n && n.ownerDocument && au(n.ownerDocument.documentElement, n)) {
    if (r !== null && wo(n)) {
      if (t = r.start, e = r.end, e === void 0 && (e = t), "selectionStart" in n) n.selectionStart = t, n.selectionEnd = Math.min(e, n.value.length);
      else if (e = (t = n.ownerDocument || document) && t.defaultView || window, e.getSelection) {
        e = e.getSelection();
        var l = n.textContent.length, i = Math.min(r.start, l);
        r = r.end === void 0 ? i : Math.min(r.end, l), !e.extend && i > r && (l = r, r = i, i = l), l = Ns(n, i);
        var o = Ns(
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
var df = be && "documentMode" in document && 11 >= document.documentMode, Ht = null, Ni = null, On = null, _i = !1;
function _s(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  _i || Ht == null || Ht !== Ar(r) || (r = Ht, "selectionStart" in r && wo(r) ? r = { start: r.selectionStart, end: r.selectionEnd } : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = { anchorNode: r.anchorNode, anchorOffset: r.anchorOffset, focusNode: r.focusNode, focusOffset: r.focusOffset }), On && Gn(On, r) || (On = r, r = Kr(Ni, "onSelect"), 0 < r.length && (t = new vo("onSelect", "select", null, t, n), e.push({ event: t, listeners: r }), t.target = Ht)));
}
function yr(e, t) {
  var n = {};
  return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
}
var Qt = { animationend: yr("Animation", "AnimationEnd"), animationiteration: yr("Animation", "AnimationIteration"), animationstart: yr("Animation", "AnimationStart"), transitionend: yr("Transition", "TransitionEnd") }, Bl = {}, cu = {};
be && (cu = document.createElement("div").style, "AnimationEvent" in window || (delete Qt.animationend.animation, delete Qt.animationiteration.animation, delete Qt.animationstart.animation), "TransitionEvent" in window || delete Qt.transitionend.transition);
function hl(e) {
  if (Bl[e]) return Bl[e];
  if (!Qt[e]) return e;
  var t = Qt[e], n;
  for (n in t) if (t.hasOwnProperty(n) && n in cu) return Bl[e] = t[n];
  return e;
}
var du = hl("animationend"), fu = hl("animationiteration"), pu = hl("animationstart"), hu = hl("transitionend"), mu = /* @__PURE__ */ new Map(), Cs = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function wt(e, t) {
  mu.set(e, t), It(t, [e]);
}
for (var Wl = 0; Wl < Cs.length; Wl++) {
  var Vl = Cs[Wl], ff = Vl.toLowerCase(), pf = Vl[0].toUpperCase() + Vl.slice(1);
  wt(ff, "on" + pf);
}
wt(du, "onAnimationEnd");
wt(fu, "onAnimationIteration");
wt(pu, "onAnimationStart");
wt("dblclick", "onDoubleClick");
wt("focusin", "onFocus");
wt("focusout", "onBlur");
wt(hu, "onTransitionEnd");
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
var Tn = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), hf = new Set("cancel close invalid load scroll toggle".split(" ").concat(Tn));
function Es(e, t, n) {
  var r = e.type || "unknown-event";
  e.currentTarget = n, dd(r, t, void 0, e), e.currentTarget = null;
}
function gu(e, t) {
  t = (t & 4) !== 0;
  for (var n = 0; n < e.length; n++) {
    var r = e[n], l = r.event;
    r = r.listeners;
    e: {
      var i = void 0;
      if (t) for (var o = r.length - 1; 0 <= o; o--) {
        var a = r[o], u = a.instance, d = a.currentTarget;
        if (a = a.listener, u !== i && l.isPropagationStopped()) break e;
        Es(l, a, d), i = u;
      }
      else for (o = 0; o < r.length; o++) {
        if (a = r[o], u = a.instance, d = a.currentTarget, a = a.listener, u !== i && l.isPropagationStopped()) break e;
        Es(l, a, d), i = u;
      }
    }
  }
  if (Br) throw e = wi, Br = !1, wi = null, e;
}
function A(e, t) {
  var n = t[Ti];
  n === void 0 && (n = t[Ti] = /* @__PURE__ */ new Set());
  var r = e + "__bubble";
  n.has(r) || (vu(t, e, 2, !1), n.add(r));
}
function Hl(e, t, n) {
  var r = 0;
  t && (r |= 4), vu(n, e, r, t);
}
var xr = "_reactListening" + Math.random().toString(36).slice(2);
function Yn(e) {
  if (!e[xr]) {
    e[xr] = !0, Na.forEach(function(n) {
      n !== "selectionchange" && (hf.has(n) || Hl(n, !1, e), Hl(n, !0, e));
    });
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[xr] || (t[xr] = !0, Hl("selectionchange", !1, t));
  }
}
function vu(e, t, n, r) {
  switch (eu(t)) {
    case 1:
      var l = Ed;
      break;
    case 4:
      l = zd;
      break;
    default:
      l = mo;
  }
  n = l.bind(null, t, n, e), l = void 0, !xi || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (l = !0), r ? l !== void 0 ? e.addEventListener(t, n, { capture: !0, passive: l }) : e.addEventListener(t, n, !0) : l !== void 0 ? e.addEventListener(t, n, { passive: l }) : e.addEventListener(t, n, !1);
}
function Ql(e, t, n, r, l) {
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
        if (o = Et(a), o === null) return;
        if (u = o.tag, u === 5 || u === 6) {
          r = i = o;
          continue e;
        }
        a = a.parentNode;
      }
    }
    r = r.return;
  }
  Ua(function() {
    var d = i, m = co(n), g = [];
    e: {
      var h = mu.get(e);
      if (h !== void 0) {
        var y = vo, S = e;
        switch (e) {
          case "keypress":
            if (Lr(n) === 0) break e;
          case "keydown":
          case "keyup":
            y = Vd;
            break;
          case "focusin":
            S = "focus", y = Il;
            break;
          case "focusout":
            S = "blur", y = Il;
            break;
          case "beforeblur":
          case "afterblur":
            y = Il;
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
            y = ms;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            y = Ld;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            y = Kd;
            break;
          case du:
          case fu:
          case pu:
            y = Md;
            break;
          case hu:
            y = Yd;
            break;
          case "scroll":
            y = Pd;
            break;
          case "wheel":
            y = Zd;
            break;
          case "copy":
          case "cut":
          case "paste":
            y = Dd;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            y = vs;
        }
        var j = (t & 4) !== 0, E = !j && e === "scroll", f = j ? h !== null ? h + "Capture" : null : h;
        j = [];
        for (var c = d, p; c !== null; ) {
          p = c;
          var x = p.stateNode;
          if (p.tag === 5 && x !== null && (p = x, f !== null && (x = Wn(c, f), x != null && j.push(Xn(c, x, p)))), E) break;
          c = c.return;
        }
        0 < j.length && (h = new y(h, S, null, n, m), g.push({ event: h, listeners: j }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (h = e === "mouseover" || e === "pointerover", y = e === "mouseout" || e === "pointerout", h && n !== vi && (S = n.relatedTarget || n.fromElement) && (Et(S) || S[Je])) break e;
        if ((y || h) && (h = m.window === m ? m : (h = m.ownerDocument) ? h.defaultView || h.parentWindow : window, y ? (S = n.relatedTarget || n.toElement, y = d, S = S ? Et(S) : null, S !== null && (E = At(S), S !== E || S.tag !== 5 && S.tag !== 6) && (S = null)) : (y = null, S = d), y !== S)) {
          if (j = ms, x = "onMouseLeave", f = "onMouseEnter", c = "mouse", (e === "pointerout" || e === "pointerover") && (j = vs, x = "onPointerLeave", f = "onPointerEnter", c = "pointer"), E = y == null ? h : Kt(y), p = S == null ? h : Kt(S), h = new j(x, c + "leave", y, n, m), h.target = E, h.relatedTarget = p, x = null, Et(m) === d && (j = new j(f, c + "enter", S, n, m), j.target = p, j.relatedTarget = E, x = j), E = x, y && S) t: {
            for (j = y, f = S, c = 0, p = j; p; p = Ut(p)) c++;
            for (p = 0, x = f; x; x = Ut(x)) p++;
            for (; 0 < c - p; ) j = Ut(j), c--;
            for (; 0 < p - c; ) f = Ut(f), p--;
            for (; c--; ) {
              if (j === f || f !== null && j === f.alternate) break t;
              j = Ut(j), f = Ut(f);
            }
            j = null;
          }
          else j = null;
          y !== null && zs(g, h, y, j, !1), S !== null && E !== null && zs(g, E, S, j, !0);
        }
      }
      e: {
        if (h = d ? Kt(d) : window, y = h.nodeName && h.nodeName.toLowerCase(), y === "select" || y === "input" && h.type === "file") var k = rf;
        else if (ws(h)) if (ou) k = af;
        else {
          k = of;
          var v = lf;
        }
        else (y = h.nodeName) && y.toLowerCase() === "input" && (h.type === "checkbox" || h.type === "radio") && (k = sf);
        if (k && (k = k(e, d))) {
          iu(g, k, n, m);
          break e;
        }
        v && v(e, h, d), e === "focusout" && (v = h._wrapperState) && v.controlled && h.type === "number" && fi(h, "number", h.value);
      }
      switch (v = d ? Kt(d) : window, e) {
        case "focusin":
          (ws(v) || v.contentEditable === "true") && (Ht = v, Ni = d, On = null);
          break;
        case "focusout":
          On = Ni = Ht = null;
          break;
        case "mousedown":
          _i = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          _i = !1, _s(g, n, m);
          break;
        case "selectionchange":
          if (df) break;
        case "keydown":
        case "keyup":
          _s(g, n, m);
      }
      var w;
      if (xo) e: {
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
      else Vt ? ru(e, n) && (_ = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (_ = "onCompositionStart");
      _ && (nu && n.locale !== "ko" && (Vt || _ !== "onCompositionStart" ? _ === "onCompositionEnd" && Vt && (w = tu()) : (at = m, go = "value" in at ? at.value : at.textContent, Vt = !0)), v = Kr(d, _), 0 < v.length && (_ = new gs(_, e, null, n, m), g.push({ event: _, listeners: v }), w ? _.data = w : (w = lu(n), w !== null && (_.data = w)))), (w = Jd ? qd(e, n) : ef(e, n)) && (d = Kr(d, "onBeforeInput"), 0 < d.length && (m = new gs("onBeforeInput", "beforeinput", null, n, m), g.push({ event: m, listeners: d }), m.data = w));
    }
    gu(g, t);
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
function zs(e, t, n, r, l) {
  for (var i = t._reactName, o = []; n !== null && n !== r; ) {
    var a = n, u = a.alternate, d = a.stateNode;
    if (u !== null && u === r) break;
    a.tag === 5 && d !== null && (a = d, l ? (u = Wn(n, i), u != null && o.unshift(Xn(n, u, a))) : l || (u = Wn(n, i), u != null && o.push(Xn(n, u, a)))), n = n.return;
  }
  o.length !== 0 && e.push({ event: t, listeners: o });
}
var mf = /\r\n?/g, gf = /\u0000|\uFFFD/g;
function Ps(e) {
  return (typeof e == "string" ? e : "" + e).replace(mf, `
`).replace(gf, "");
}
function wr(e, t, n) {
  if (t = Ps(t), Ps(e) !== t && n) throw Error(N(425));
}
function Gr() {
}
var Ci = null, Ei = null;
function zi(e, t) {
  return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
}
var Pi = typeof setTimeout == "function" ? setTimeout : void 0, vf = typeof clearTimeout == "function" ? clearTimeout : void 0, Ts = typeof Promise == "function" ? Promise : void 0, yf = typeof queueMicrotask == "function" ? queueMicrotask : typeof Ts < "u" ? function(e) {
  return Ts.resolve(null).then(e).catch(xf);
} : Pi;
function xf(e) {
  setTimeout(function() {
    throw e;
  });
}
function Kl(e, t) {
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
function Ls(e) {
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
var gn = Math.random().toString(36).slice(2), Ve = "__reactFiber$" + gn, Zn = "__reactProps$" + gn, Je = "__reactContainer$" + gn, Ti = "__reactEvents$" + gn, wf = "__reactListeners$" + gn, kf = "__reactHandles$" + gn;
function Et(e) {
  var t = e[Ve];
  if (t) return t;
  for (var n = e.parentNode; n; ) {
    if (t = n[Je] || n[Ve]) {
      if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = Ls(e); e !== null; ) {
        if (n = e[Ve]) return n;
        e = Ls(e);
      }
      return t;
    }
    e = n, n = e.parentNode;
  }
  return null;
}
function or(e) {
  return e = e[Ve] || e[Je], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e;
}
function Kt(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(N(33));
}
function ml(e) {
  return e[Zn] || null;
}
var Li = [], Gt = -1;
function kt(e) {
  return { current: e };
}
function B(e) {
  0 > Gt || (e.current = Li[Gt], Li[Gt] = null, Gt--);
}
function I(e, t) {
  Gt++, Li[Gt] = e.current, e.current = t;
}
var xt = {}, ue = kt(xt), ge = kt(!1), $t = xt;
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
  B(ge), B(ue);
}
function Rs(e, t, n) {
  if (ue.current !== xt) throw Error(N(168));
  I(ue, t), I(ge, n);
}
function yu(e, t, n) {
  var r = e.stateNode;
  if (t = t.childContextTypes, typeof r.getChildContext != "function") return n;
  r = r.getChildContext();
  for (var l in r) if (!(l in t)) throw Error(N(108, ld(e) || "Unknown", l));
  return K({}, n, r);
}
function Xr(e) {
  return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || xt, $t = ue.current, I(ue, e), I(ge, ge.current), !0;
}
function $s(e, t, n) {
  var r = e.stateNode;
  if (!r) throw Error(N(169));
  n ? (e = yu(e, t, $t), r.__reactInternalMemoizedMergedChildContext = e, B(ge), B(ue), I(ue, e)) : B(ge), I(ge, n);
}
var Ge = null, gl = !1, Gl = !1;
function xu(e) {
  Ge === null ? Ge = [e] : Ge.push(e);
}
function Sf(e) {
  gl = !0, xu(e);
}
function St() {
  if (!Gl && Ge !== null) {
    Gl = !0;
    var e = 0, t = D;
    try {
      var n = Ge;
      for (D = 1; e < n.length; e++) {
        var r = n[e];
        do
          r = r(!0);
        while (r !== null);
      }
      Ge = null, gl = !1;
    } catch (l) {
      throw Ge !== null && (Ge = Ge.slice(e + 1)), Ha(fo, St), l;
    } finally {
      D = t, Gl = !1;
    }
  }
  return null;
}
var Yt = [], Xt = 0, Zr = null, br = 0, Ee = [], ze = 0, Mt = null, Ye = 1, Xe = "";
function _t(e, t) {
  Yt[Xt++] = br, Yt[Xt++] = Zr, Zr = e, br = t;
}
function wu(e, t, n) {
  Ee[ze++] = Ye, Ee[ze++] = Xe, Ee[ze++] = Mt, Mt = e;
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
function ko(e) {
  e.return !== null && (_t(e, 1), wu(e, 1, 0));
}
function So(e) {
  for (; e === Zr; ) Zr = Yt[--Xt], Yt[Xt] = null, br = Yt[--Xt], Yt[Xt] = null;
  for (; e === Mt; ) Mt = Ee[--ze], Ee[ze] = null, Xe = Ee[--ze], Ee[ze] = null, Ye = Ee[--ze], Ee[ze] = null;
}
var Se = null, ke = null, W = !1, De = null;
function ku(e, t) {
  var n = Pe(5, null, null, 0);
  n.elementType = "DELETED", n.stateNode = t, n.return = e, t = e.deletions, t === null ? (e.deletions = [n], e.flags |= 16) : t.push(n);
}
function Ms(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t, t !== null ? (e.stateNode = t, Se = e, ke = pt(t.firstChild), !0) : !1;
    case 6:
      return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t, t !== null ? (e.stateNode = t, Se = e, ke = null, !0) : !1;
    case 13:
      return t = t.nodeType !== 8 ? null : t, t !== null ? (n = Mt !== null ? { id: Ye, overflow: Xe } : null, e.memoizedState = { dehydrated: t, treeContext: n, retryLane: 1073741824 }, n = Pe(18, null, null, 0), n.stateNode = t, n.return = e, e.child = n, Se = e, ke = null, !0) : !1;
    default:
      return !1;
  }
}
function Ri(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function $i(e) {
  if (W) {
    var t = ke;
    if (t) {
      var n = t;
      if (!Ms(e, t)) {
        if (Ri(e)) throw Error(N(418));
        t = pt(n.nextSibling);
        var r = Se;
        t && Ms(e, t) ? ku(r, n) : (e.flags = e.flags & -4097 | 2, W = !1, Se = e);
      }
    } else {
      if (Ri(e)) throw Error(N(418));
      e.flags = e.flags & -4097 | 2, W = !1, Se = e;
    }
  }
}
function Os(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; ) e = e.return;
  Se = e;
}
function kr(e) {
  if (e !== Se) return !1;
  if (!W) return Os(e), W = !0, !1;
  var t;
  if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !zi(e.type, e.memoizedProps)), t && (t = ke)) {
    if (Ri(e)) throw Su(), Error(N(418));
    for (; t; ) ku(e, t), t = pt(t.nextSibling);
  }
  if (Os(e), e.tag === 13) {
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
function Su() {
  for (var e = ke; e; ) e = pt(e.nextSibling);
}
function an() {
  ke = Se = null, W = !1;
}
function jo(e) {
  De === null ? De = [e] : De.push(e);
}
var jf = tt.ReactCurrentBatchConfig;
function Nn(e, t, n) {
  if (e = n.ref, e !== null && typeof e != "function" && typeof e != "object") {
    if (n._owner) {
      if (n = n._owner, n) {
        if (n.tag !== 1) throw Error(N(309));
        var r = n.stateNode;
      }
      if (!r) throw Error(N(147, e));
      var l = r, i = "" + e;
      return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === i ? t.ref : (t = function(o) {
        var a = l.refs;
        o === null ? delete a[i] : a[i] = o;
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
function Ds(e) {
  var t = e._init;
  return t(e._payload);
}
function ju(e) {
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
  function a(f, c, p, x) {
    return c === null || c.tag !== 6 ? (c = ei(p, f.mode, x), c.return = f, c) : (c = l(c, p), c.return = f, c);
  }
  function u(f, c, p, x) {
    var k = p.type;
    return k === Wt ? m(f, c, p.props.children, x, p.key) : c !== null && (c.elementType === k || typeof k == "object" && k !== null && k.$$typeof === lt && Ds(k) === c.type) ? (x = l(c, p.props), x.ref = Nn(f, c, p), x.return = f, x) : (x = Ir(p.type, p.key, p.props, null, f.mode, x), x.ref = Nn(f, c, p), x.return = f, x);
  }
  function d(f, c, p, x) {
    return c === null || c.tag !== 4 || c.stateNode.containerInfo !== p.containerInfo || c.stateNode.implementation !== p.implementation ? (c = ti(p, f.mode, x), c.return = f, c) : (c = l(c, p.children || []), c.return = f, c);
  }
  function m(f, c, p, x, k) {
    return c === null || c.tag !== 7 ? (c = Rt(p, f.mode, x, k), c.return = f, c) : (c = l(c, p), c.return = f, c);
  }
  function g(f, c, p) {
    if (typeof c == "string" && c !== "" || typeof c == "number") return c = ei("" + c, f.mode, p), c.return = f, c;
    if (typeof c == "object" && c !== null) {
      switch (c.$$typeof) {
        case dr:
          return p = Ir(c.type, c.key, c.props, null, f.mode, p), p.ref = Nn(f, null, c), p.return = f, p;
        case Bt:
          return c = ti(c, f.mode, p), c.return = f, c;
        case lt:
          var x = c._init;
          return g(f, x(c._payload), p);
      }
      if (zn(c) || xn(c)) return c = Rt(c, f.mode, p, null), c.return = f, c;
      Sr(f, c);
    }
    return null;
  }
  function h(f, c, p, x) {
    var k = c !== null ? c.key : null;
    if (typeof p == "string" && p !== "" || typeof p == "number") return k !== null ? null : a(f, c, "" + p, x);
    if (typeof p == "object" && p !== null) {
      switch (p.$$typeof) {
        case dr:
          return p.key === k ? u(f, c, p, x) : null;
        case Bt:
          return p.key === k ? d(f, c, p, x) : null;
        case lt:
          return k = p._init, h(
            f,
            c,
            k(p._payload),
            x
          );
      }
      if (zn(p) || xn(p)) return k !== null ? null : m(f, c, p, x, null);
      Sr(f, p);
    }
    return null;
  }
  function y(f, c, p, x, k) {
    if (typeof x == "string" && x !== "" || typeof x == "number") return f = f.get(p) || null, a(c, f, "" + x, k);
    if (typeof x == "object" && x !== null) {
      switch (x.$$typeof) {
        case dr:
          return f = f.get(x.key === null ? p : x.key) || null, u(c, f, x, k);
        case Bt:
          return f = f.get(x.key === null ? p : x.key) || null, d(c, f, x, k);
        case lt:
          var v = x._init;
          return y(f, c, p, v(x._payload), k);
      }
      if (zn(x) || xn(x)) return f = f.get(p) || null, m(c, f, x, k, null);
      Sr(c, x);
    }
    return null;
  }
  function S(f, c, p, x) {
    for (var k = null, v = null, w = c, _ = c = 0, V = null; w !== null && _ < p.length; _++) {
      w.index > _ ? (V = w, w = null) : V = w.sibling;
      var R = h(f, w, p[_], x);
      if (R === null) {
        w === null && (w = V);
        break;
      }
      e && w && R.alternate === null && t(f, w), c = i(R, c, _), v === null ? k = R : v.sibling = R, v = R, w = V;
    }
    if (_ === p.length) return n(f, w), W && _t(f, _), k;
    if (w === null) {
      for (; _ < p.length; _++) w = g(f, p[_], x), w !== null && (c = i(w, c, _), v === null ? k = w : v.sibling = w, v = w);
      return W && _t(f, _), k;
    }
    for (w = r(f, w); _ < p.length; _++) V = y(w, f, _, p[_], x), V !== null && (e && V.alternate !== null && w.delete(V.key === null ? _ : V.key), c = i(V, c, _), v === null ? k = V : v.sibling = V, v = V);
    return e && w.forEach(function(xe) {
      return t(f, xe);
    }), W && _t(f, _), k;
  }
  function j(f, c, p, x) {
    var k = xn(p);
    if (typeof k != "function") throw Error(N(150));
    if (p = k.call(p), p == null) throw Error(N(151));
    for (var v = k = null, w = c, _ = c = 0, V = null, R = p.next(); w !== null && !R.done; _++, R = p.next()) {
      w.index > _ ? (V = w, w = null) : V = w.sibling;
      var xe = h(f, w, R.value, x);
      if (xe === null) {
        w === null && (w = V);
        break;
      }
      e && w && xe.alternate === null && t(f, w), c = i(xe, c, _), v === null ? k = xe : v.sibling = xe, v = xe, w = V;
    }
    if (R.done) return n(
      f,
      w
    ), W && _t(f, _), k;
    if (w === null) {
      for (; !R.done; _++, R = p.next()) R = g(f, R.value, x), R !== null && (c = i(R, c, _), v === null ? k = R : v.sibling = R, v = R);
      return W && _t(f, _), k;
    }
    for (w = r(f, w); !R.done; _++, R = p.next()) R = y(w, f, _, R.value, x), R !== null && (e && R.alternate !== null && w.delete(R.key === null ? _ : R.key), c = i(R, c, _), v === null ? k = R : v.sibling = R, v = R);
    return e && w.forEach(function(Ue) {
      return t(f, Ue);
    }), W && _t(f, _), k;
  }
  function E(f, c, p, x) {
    if (typeof p == "object" && p !== null && p.type === Wt && p.key === null && (p = p.props.children), typeof p == "object" && p !== null) {
      switch (p.$$typeof) {
        case dr:
          e: {
            for (var k = p.key, v = c; v !== null; ) {
              if (v.key === k) {
                if (k = p.type, k === Wt) {
                  if (v.tag === 7) {
                    n(f, v.sibling), c = l(v, p.props.children), c.return = f, f = c;
                    break e;
                  }
                } else if (v.elementType === k || typeof k == "object" && k !== null && k.$$typeof === lt && Ds(k) === v.type) {
                  n(f, v.sibling), c = l(v, p.props), c.ref = Nn(f, v, p), c.return = f, f = c;
                  break e;
                }
                n(f, v);
                break;
              } else t(f, v);
              v = v.sibling;
            }
            p.type === Wt ? (c = Rt(p.props.children, f.mode, x, p.key), c.return = f, f = c) : (x = Ir(p.type, p.key, p.props, null, f.mode, x), x.ref = Nn(f, c, p), x.return = f, f = x);
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
            c = ti(p, f.mode, x), c.return = f, f = c;
          }
          return o(f);
        case lt:
          return v = p._init, E(f, c, v(p._payload), x);
      }
      if (zn(p)) return S(f, c, p, x);
      if (xn(p)) return j(f, c, p, x);
      Sr(f, p);
    }
    return typeof p == "string" && p !== "" || typeof p == "number" ? (p = "" + p, c !== null && c.tag === 6 ? (n(f, c.sibling), c = l(c, p), c.return = f, f = c) : (n(f, c), c = ei(p, f.mode, x), c.return = f, f = c), o(f)) : n(f, c);
  }
  return E;
}
var un = ju(!0), Nu = ju(!1), Jr = kt(null), qr = null, Zt = null, No = null;
function _o() {
  No = Zt = qr = null;
}
function Co(e) {
  var t = Jr.current;
  B(Jr), e._currentValue = t;
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
function Eo(e) {
  zt === null ? zt = [e] : zt.push(e);
}
function _u(e, t, n, r) {
  var l = t.interleaved;
  return l === null ? (n.next = n, Eo(t)) : (n.next = l.next, l.next = n), t.interleaved = n, qe(e, r);
}
function qe(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; ) e.childLanes |= t, n = e.alternate, n !== null && (n.childLanes |= t), n = e, e = e.return;
  return n.tag === 3 ? n.stateNode : null;
}
var it = !1;
function zo(e) {
  e.updateQueue = { baseState: e.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
}
function Cu(e, t) {
  e = e.updateQueue, t.updateQueue === e && (t.updateQueue = { baseState: e.baseState, firstBaseUpdate: e.firstBaseUpdate, lastBaseUpdate: e.lastBaseUpdate, shared: e.shared, effects: e.effects });
}
function Ze(e, t) {
  return { eventTime: e, lane: t, tag: 0, payload: null, callback: null, next: null };
}
function ht(e, t, n) {
  var r = e.updateQueue;
  if (r === null) return null;
  if (r = r.shared, M & 2) {
    var l = r.pending;
    return l === null ? t.next = t : (t.next = l.next, l.next = t), r.pending = t, qe(e, n);
  }
  return l = r.interleaved, l === null ? (t.next = t, Eo(r)) : (t.next = l.next, l.next = t), r.interleaved = t, qe(e, n);
}
function Rr(e, t, n) {
  if (t = t.updateQueue, t !== null && (t = t.shared, (n & 4194240) !== 0)) {
    var r = t.lanes;
    r &= e.pendingLanes, n |= r, t.lanes = n, po(e, n);
  }
}
function Fs(e, t) {
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
  var i = l.firstBaseUpdate, o = l.lastBaseUpdate, a = l.shared.pending;
  if (a !== null) {
    l.shared.pending = null;
    var u = a, d = u.next;
    u.next = null, o === null ? i = d : o.next = d, o = u;
    var m = e.alternate;
    m !== null && (m = m.updateQueue, a = m.lastBaseUpdate, a !== o && (a === null ? m.firstBaseUpdate = d : a.next = d, m.lastBaseUpdate = u));
  }
  if (i !== null) {
    var g = l.baseState;
    o = 0, m = d = u = null, a = i;
    do {
      var h = a.lane, y = a.eventTime;
      if ((r & h) === h) {
        m !== null && (m = m.next = {
          eventTime: y,
          lane: 0,
          tag: a.tag,
          payload: a.payload,
          callback: a.callback,
          next: null
        });
        e: {
          var S = e, j = a;
          switch (h = t, y = n, j.tag) {
            case 1:
              if (S = j.payload, typeof S == "function") {
                g = S.call(y, g, h);
                break e;
              }
              g = S;
              break e;
            case 3:
              S.flags = S.flags & -65537 | 128;
            case 0:
              if (S = j.payload, h = typeof S == "function" ? S.call(y, g, h) : S, h == null) break e;
              g = K({}, g, h);
              break e;
            case 2:
              it = !0;
          }
        }
        a.callback !== null && a.lane !== 0 && (e.flags |= 64, h = l.effects, h === null ? l.effects = [a] : h.push(a));
      } else y = { eventTime: y, lane: h, tag: a.tag, payload: a.payload, callback: a.callback, next: null }, m === null ? (d = m = y, u = g) : m = m.next = y, o |= h;
      if (a = a.next, a === null) {
        if (a = l.shared.pending, a === null) break;
        h = a, a = h.next, h.next = null, l.lastBaseUpdate = h, l.shared.pending = null;
      }
    } while (!0);
    if (m === null && (u = g), l.baseState = u, l.firstBaseUpdate = d, l.lastBaseUpdate = m, t = l.shared.interleaved, t !== null) {
      l = t;
      do
        o |= l.lane, l = l.next;
      while (l !== t);
    } else i === null && (l.shared.lanes = 0);
    Dt |= o, e.lanes = o, e.memoizedState = g;
  }
}
function Is(e, t, n) {
  if (e = t.effects, t.effects = null, e !== null) for (t = 0; t < e.length; t++) {
    var r = e[t], l = r.callback;
    if (l !== null) {
      if (r.callback = null, r = n, typeof l != "function") throw Error(N(191, l));
      l.call(r);
    }
  }
}
var sr = {}, Qe = kt(sr), bn = kt(sr), Jn = kt(sr);
function Pt(e) {
  if (e === sr) throw Error(N(174));
  return e;
}
function Po(e, t) {
  switch (I(Jn, t), I(bn, e), I(Qe, sr), e = t.nodeType, e) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : hi(null, "");
      break;
    default:
      e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = hi(t, e);
  }
  B(Qe), I(Qe, t);
}
function cn() {
  B(Qe), B(bn), B(Jn);
}
function Eu(e) {
  Pt(Jn.current);
  var t = Pt(Qe.current), n = hi(t, e.type);
  t !== n && (I(bn, e), I(Qe, n));
}
function To(e) {
  bn.current === e && (B(Qe), B(bn));
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
var Yl = [];
function Lo() {
  for (var e = 0; e < Yl.length; e++) Yl[e]._workInProgressVersionPrimary = null;
  Yl.length = 0;
}
var $r = tt.ReactCurrentDispatcher, Xl = tt.ReactCurrentBatchConfig, Ot = 0, Q = null, b = null, ee = null, nl = !1, Dn = !1, qn = 0, Nf = 0;
function oe() {
  throw Error(N(321));
}
function Ro(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++) if (!Ae(e[n], t[n])) return !1;
  return !0;
}
function $o(e, t, n, r, l, i) {
  if (Ot = i, Q = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, $r.current = e === null || e.memoizedState === null ? zf : Pf, e = n(r, l), Dn) {
    i = 0;
    do {
      if (Dn = !1, qn = 0, 25 <= i) throw Error(N(301));
      i += 1, ee = b = null, t.updateQueue = null, $r.current = Tf, e = n(r, l);
    } while (Dn);
  }
  if ($r.current = rl, t = b !== null && b.next !== null, Ot = 0, ee = b = Q = null, nl = !1, t) throw Error(N(300));
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
  if (b === null) {
    var e = Q.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = b.next;
  var t = ee === null ? Q.memoizedState : ee.next;
  if (t !== null) ee = t, b = e;
  else {
    if (e === null) throw Error(N(310));
    b = e, e = { memoizedState: b.memoizedState, baseState: b.baseState, baseQueue: b.baseQueue, queue: b.queue, next: null }, ee === null ? Q.memoizedState = ee = e : ee = ee.next = e;
  }
  return ee;
}
function er(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function Zl(e) {
  var t = Re(), n = t.queue;
  if (n === null) throw Error(N(311));
  n.lastRenderedReducer = e;
  var r = b, l = r.baseQueue, i = n.pending;
  if (i !== null) {
    if (l !== null) {
      var o = l.next;
      l.next = i.next, i.next = o;
    }
    r.baseQueue = l = i, n.pending = null;
  }
  if (l !== null) {
    i = l.next, r = r.baseState;
    var a = o = null, u = null, d = i;
    do {
      var m = d.lane;
      if ((Ot & m) === m) u !== null && (u = u.next = { lane: 0, action: d.action, hasEagerState: d.hasEagerState, eagerState: d.eagerState, next: null }), r = d.hasEagerState ? d.eagerState : e(r, d.action);
      else {
        var g = {
          lane: m,
          action: d.action,
          hasEagerState: d.hasEagerState,
          eagerState: d.eagerState,
          next: null
        };
        u === null ? (a = u = g, o = r) : u = u.next = g, Q.lanes |= m, Dt |= m;
      }
      d = d.next;
    } while (d !== null && d !== i);
    u === null ? o = r : u.next = a, Ae(r, t.memoizedState) || (me = !0), t.memoizedState = r, t.baseState = o, t.baseQueue = u, n.lastRenderedState = r;
  }
  if (e = n.interleaved, e !== null) {
    l = e;
    do
      i = l.lane, Q.lanes |= i, Dt |= i, l = l.next;
    while (l !== e);
  } else l === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function bl(e) {
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
function zu() {
}
function Pu(e, t) {
  var n = Q, r = Re(), l = t(), i = !Ae(r.memoizedState, l);
  if (i && (r.memoizedState = l, me = !0), r = r.queue, Oo(Ru.bind(null, n, r, e), [e]), r.getSnapshot !== t || i || ee !== null && ee.memoizedState.tag & 1) {
    if (n.flags |= 2048, tr(9, Lu.bind(null, n, r, l, t), void 0, null), te === null) throw Error(N(349));
    Ot & 30 || Tu(n, t, l);
  }
  return l;
}
function Tu(e, t, n) {
  e.flags |= 16384, e = { getSnapshot: t, value: n }, t = Q.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, Q.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
}
function Lu(e, t, n, r) {
  t.value = n, t.getSnapshot = r, $u(t) && Mu(e);
}
function Ru(e, t, n) {
  return n(function() {
    $u(t) && Mu(e);
  });
}
function $u(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !Ae(e, n);
  } catch {
    return !0;
  }
}
function Mu(e) {
  var t = qe(e, 1);
  t !== null && Ie(t, e, 1, -1);
}
function As(e) {
  var t = We();
  return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: er, lastRenderedState: e }, t.queue = e, e = e.dispatch = Ef.bind(null, Q, e), [t.memoizedState, e];
}
function tr(e, t, n, r) {
  return e = { tag: e, create: t, destroy: n, deps: r, next: null }, t = Q.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, Q.updateQueue = t, t.lastEffect = e.next = e) : (n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e)), e;
}
function Ou() {
  return Re().memoizedState;
}
function Mr(e, t, n, r) {
  var l = We();
  Q.flags |= e, l.memoizedState = tr(1 | t, n, void 0, r === void 0 ? null : r);
}
function vl(e, t, n, r) {
  var l = Re();
  r = r === void 0 ? null : r;
  var i = void 0;
  if (b !== null) {
    var o = b.memoizedState;
    if (i = o.destroy, r !== null && Ro(r, o.deps)) {
      l.memoizedState = tr(t, n, i, r);
      return;
    }
  }
  Q.flags |= e, l.memoizedState = tr(1 | t, n, i, r);
}
function Us(e, t) {
  return Mr(8390656, 8, e, t);
}
function Oo(e, t) {
  return vl(2048, 8, e, t);
}
function Du(e, t) {
  return vl(4, 2, e, t);
}
function Fu(e, t) {
  return vl(4, 4, e, t);
}
function Iu(e, t) {
  if (typeof t == "function") return e = e(), t(e), function() {
    t(null);
  };
  if (t != null) return e = e(), t.current = e, function() {
    t.current = null;
  };
}
function Au(e, t, n) {
  return n = n != null ? n.concat([e]) : null, vl(4, 4, Iu.bind(null, t, e), n);
}
function Do() {
}
function Uu(e, t) {
  var n = Re();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && Ro(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
}
function Bu(e, t) {
  var n = Re();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && Ro(t, r[1]) ? r[0] : (e = e(), n.memoizedState = [e, t], e);
}
function Wu(e, t, n) {
  return Ot & 21 ? (Ae(n, t) || (n = Ga(), Q.lanes |= n, Dt |= n, e.baseState = !0), t) : (e.baseState && (e.baseState = !1, me = !0), e.memoizedState = n);
}
function _f(e, t) {
  var n = D;
  D = n !== 0 && 4 > n ? n : 4, e(!0);
  var r = Xl.transition;
  Xl.transition = {};
  try {
    e(!1), t();
  } finally {
    D = n, Xl.transition = r;
  }
}
function Vu() {
  return Re().memoizedState;
}
function Cf(e, t, n) {
  var r = gt(e);
  if (n = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null }, Hu(e)) Qu(t, n);
  else if (n = _u(e, t, n, r), n !== null) {
    var l = de();
    Ie(n, e, r, l), Ku(n, t, r);
  }
}
function Ef(e, t, n) {
  var r = gt(e), l = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (Hu(e)) Qu(t, l);
  else {
    var i = e.alternate;
    if (e.lanes === 0 && (i === null || i.lanes === 0) && (i = t.lastRenderedReducer, i !== null)) try {
      var o = t.lastRenderedState, a = i(o, n);
      if (l.hasEagerState = !0, l.eagerState = a, Ae(a, o)) {
        var u = t.interleaved;
        u === null ? (l.next = l, Eo(t)) : (l.next = u.next, u.next = l), t.interleaved = l;
        return;
      }
    } catch {
    } finally {
    }
    n = _u(e, t, l, r), n !== null && (l = de(), Ie(n, e, r, l), Ku(n, t, r));
  }
}
function Hu(e) {
  var t = e.alternate;
  return e === Q || t !== null && t === Q;
}
function Qu(e, t) {
  Dn = nl = !0;
  var n = e.pending;
  n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
}
function Ku(e, t, n) {
  if (n & 4194240) {
    var r = t.lanes;
    r &= e.pendingLanes, n |= r, t.lanes = n, po(e, n);
  }
}
var rl = { readContext: Le, useCallback: oe, useContext: oe, useEffect: oe, useImperativeHandle: oe, useInsertionEffect: oe, useLayoutEffect: oe, useMemo: oe, useReducer: oe, useRef: oe, useState: oe, useDebugValue: oe, useDeferredValue: oe, useTransition: oe, useMutableSource: oe, useSyncExternalStore: oe, useId: oe, unstable_isNewReconciler: !1 }, zf = { readContext: Le, useCallback: function(e, t) {
  return We().memoizedState = [e, t === void 0 ? null : t], e;
}, useContext: Le, useEffect: Us, useImperativeHandle: function(e, t, n) {
  return n = n != null ? n.concat([e]) : null, Mr(
    4194308,
    4,
    Iu.bind(null, t, e),
    n
  );
}, useLayoutEffect: function(e, t) {
  return Mr(4194308, 4, e, t);
}, useInsertionEffect: function(e, t) {
  return Mr(4, 2, e, t);
}, useMemo: function(e, t) {
  var n = We();
  return t = t === void 0 ? null : t, e = e(), n.memoizedState = [e, t], e;
}, useReducer: function(e, t, n) {
  var r = We();
  return t = n !== void 0 ? n(t) : t, r.memoizedState = r.baseState = t, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: t }, r.queue = e, e = e.dispatch = Cf.bind(null, Q, e), [r.memoizedState, e];
}, useRef: function(e) {
  var t = We();
  return e = { current: e }, t.memoizedState = e;
}, useState: As, useDebugValue: Do, useDeferredValue: function(e) {
  return We().memoizedState = e;
}, useTransition: function() {
  var e = As(!1), t = e[0];
  return e = _f.bind(null, e[1]), We().memoizedState = e, [t, e];
}, useMutableSource: function() {
}, useSyncExternalStore: function(e, t, n) {
  var r = Q, l = We();
  if (W) {
    if (n === void 0) throw Error(N(407));
    n = n();
  } else {
    if (n = t(), te === null) throw Error(N(349));
    Ot & 30 || Tu(r, t, n);
  }
  l.memoizedState = n;
  var i = { value: n, getSnapshot: t };
  return l.queue = i, Us(Ru.bind(
    null,
    r,
    i,
    e
  ), [e]), r.flags |= 2048, tr(9, Lu.bind(null, r, i, n, t), void 0, null), n;
}, useId: function() {
  var e = We(), t = te.identifierPrefix;
  if (W) {
    var n = Xe, r = Ye;
    n = (r & ~(1 << 32 - Fe(r) - 1)).toString(32) + n, t = ":" + t + "R" + n, n = qn++, 0 < n && (t += "H" + n.toString(32)), t += ":";
  } else n = Nf++, t = ":" + t + "r" + n.toString(32) + ":";
  return e.memoizedState = t;
}, unstable_isNewReconciler: !1 }, Pf = {
  readContext: Le,
  useCallback: Uu,
  useContext: Le,
  useEffect: Oo,
  useImperativeHandle: Au,
  useInsertionEffect: Du,
  useLayoutEffect: Fu,
  useMemo: Bu,
  useReducer: Zl,
  useRef: Ou,
  useState: function() {
    return Zl(er);
  },
  useDebugValue: Do,
  useDeferredValue: function(e) {
    var t = Re();
    return Wu(t, b.memoizedState, e);
  },
  useTransition: function() {
    var e = Zl(er)[0], t = Re().memoizedState;
    return [e, t];
  },
  useMutableSource: zu,
  useSyncExternalStore: Pu,
  useId: Vu,
  unstable_isNewReconciler: !1
}, Tf = { readContext: Le, useCallback: Uu, useContext: Le, useEffect: Oo, useImperativeHandle: Au, useInsertionEffect: Du, useLayoutEffect: Fu, useMemo: Bu, useReducer: bl, useRef: Ou, useState: function() {
  return bl(er);
}, useDebugValue: Do, useDeferredValue: function(e) {
  var t = Re();
  return b === null ? t.memoizedState = e : Wu(t, b.memoizedState, e);
}, useTransition: function() {
  var e = bl(er)[0], t = Re().memoizedState;
  return [e, t];
}, useMutableSource: zu, useSyncExternalStore: Pu, useId: Vu, unstable_isNewReconciler: !1 };
function Me(e, t) {
  if (e && e.defaultProps) {
    t = K({}, t), e = e.defaultProps;
    for (var n in e) t[n] === void 0 && (t[n] = e[n]);
    return t;
  }
  return t;
}
function Oi(e, t, n, r) {
  t = e.memoizedState, n = n(r, t), n = n == null ? t : K({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
}
var yl = { isMounted: function(e) {
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
function Bs(e, t, n, r, l, i, o) {
  return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, i, o) : t.prototype && t.prototype.isPureReactComponent ? !Gn(n, r) || !Gn(l, i) : !0;
}
function Gu(e, t, n) {
  var r = !1, l = xt, i = t.contextType;
  return typeof i == "object" && i !== null ? i = Le(i) : (l = ve(t) ? $t : ue.current, r = t.contextTypes, i = (r = r != null) ? sn(e, l) : xt), t = new t(n, i), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = yl, e.stateNode = t, t._reactInternals = e, r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = l, e.__reactInternalMemoizedMaskedChildContext = i), t;
}
function Ws(e, t, n, r) {
  e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && yl.enqueueReplaceState(t, t.state, null);
}
function Di(e, t, n, r) {
  var l = e.stateNode;
  l.props = n, l.state = e.memoizedState, l.refs = {}, zo(e);
  var i = t.contextType;
  typeof i == "object" && i !== null ? l.context = Le(i) : (i = ve(t) ? $t : ue.current, l.context = sn(e, i)), l.state = e.memoizedState, i = t.getDerivedStateFromProps, typeof i == "function" && (Oi(e, t, i, n), l.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof l.getSnapshotBeforeUpdate == "function" || typeof l.UNSAFE_componentWillMount != "function" && typeof l.componentWillMount != "function" || (t = l.state, typeof l.componentWillMount == "function" && l.componentWillMount(), typeof l.UNSAFE_componentWillMount == "function" && l.UNSAFE_componentWillMount(), t !== l.state && yl.enqueueReplaceState(l, l.state, null), el(e, n, l, r), l.state = e.memoizedState), typeof l.componentDidMount == "function" && (e.flags |= 4194308);
}
function dn(e, t) {
  try {
    var n = "", r = t;
    do
      n += rd(r), r = r.return;
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
function Fi(e, t) {
  try {
    console.error(t.value);
  } catch (n) {
    setTimeout(function() {
      throw n;
    });
  }
}
var Lf = typeof WeakMap == "function" ? WeakMap : Map;
function Yu(e, t, n) {
  n = Ze(-1, n), n.tag = 3, n.payload = { element: null };
  var r = t.value;
  return n.callback = function() {
    il || (il = !0, Gi = r), Fi(e, t);
  }, n;
}
function Xu(e, t, n) {
  n = Ze(-1, n), n.tag = 3;
  var r = e.type.getDerivedStateFromError;
  if (typeof r == "function") {
    var l = t.value;
    n.payload = function() {
      return r(l);
    }, n.callback = function() {
      Fi(e, t);
    };
  }
  var i = e.stateNode;
  return i !== null && typeof i.componentDidCatch == "function" && (n.callback = function() {
    Fi(e, t), typeof r != "function" && (mt === null ? mt = /* @__PURE__ */ new Set([this]) : mt.add(this));
    var o = t.stack;
    this.componentDidCatch(t.value, { componentStack: o !== null ? o : "" });
  }), n;
}
function Vs(e, t, n) {
  var r = e.pingCache;
  if (r === null) {
    r = e.pingCache = new Lf();
    var l = /* @__PURE__ */ new Set();
    r.set(t, l);
  } else l = r.get(t), l === void 0 && (l = /* @__PURE__ */ new Set(), r.set(t, l));
  l.has(n) || (l.add(n), e = Qf.bind(null, e, t, n), t.then(e, e));
}
function Hs(e) {
  do {
    var t;
    if ((t = e.tag === 13) && (t = e.memoizedState, t = t !== null ? t.dehydrated !== null : !0), t) return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function Qs(e, t, n, r, l) {
  return e.mode & 1 ? (e.flags |= 65536, e.lanes = l, e) : (e === t ? e.flags |= 65536 : (e.flags |= 128, n.flags |= 131072, n.flags &= -52805, n.tag === 1 && (n.alternate === null ? n.tag = 17 : (t = Ze(-1, 1), t.tag = 2, ht(n, t, 1))), n.lanes |= 1), e);
}
var Rf = tt.ReactCurrentOwner, me = !1;
function ce(e, t, n, r) {
  t.child = e === null ? Nu(t, null, n, r) : un(t, e.child, n, r);
}
function Ks(e, t, n, r, l) {
  n = n.render;
  var i = t.ref;
  return rn(t, l), r = $o(e, t, n, r, i, l), n = Mo(), e !== null && !me ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, et(e, t, l)) : (W && n && ko(t), t.flags |= 1, ce(e, t, r, l), t.child);
}
function Gs(e, t, n, r, l) {
  if (e === null) {
    var i = n.type;
    return typeof i == "function" && !Ho(i) && i.defaultProps === void 0 && n.compare === null && n.defaultProps === void 0 ? (t.tag = 15, t.type = i, Zu(e, t, i, r, l)) : (e = Ir(n.type, null, r, t, t.mode, l), e.ref = t.ref, e.return = t, t.child = e);
  }
  if (i = e.child, !(e.lanes & l)) {
    var o = i.memoizedProps;
    if (n = n.compare, n = n !== null ? n : Gn, n(o, r) && e.ref === t.ref) return et(e, t, l);
  }
  return t.flags |= 1, e = vt(i, r), e.ref = t.ref, e.return = t, t.child = e;
}
function Zu(e, t, n, r, l) {
  if (e !== null) {
    var i = e.memoizedProps;
    if (Gn(i, r) && e.ref === t.ref) if (me = !1, t.pendingProps = r = i, (e.lanes & l) !== 0) e.flags & 131072 && (me = !0);
    else return t.lanes = e.lanes, et(e, t, l);
  }
  return Ii(e, t, n, r, l);
}
function bu(e, t, n) {
  var r = t.pendingProps, l = r.children, i = e !== null ? e.memoizedState : null;
  if (r.mode === "hidden") if (!(t.mode & 1)) t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, I(Jt, we), we |= n;
  else {
    if (!(n & 1073741824)) return e = i !== null ? i.baseLanes | n : n, t.lanes = t.childLanes = 1073741824, t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }, t.updateQueue = null, I(Jt, we), we |= e, null;
    t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, r = i !== null ? i.baseLanes : n, I(Jt, we), we |= r;
  }
  else i !== null ? (r = i.baseLanes | n, t.memoizedState = null) : r = n, I(Jt, we), we |= r;
  return ce(e, t, l, n), t.child;
}
function Ju(e, t) {
  var n = t.ref;
  (e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= 512, t.flags |= 2097152);
}
function Ii(e, t, n, r, l) {
  var i = ve(n) ? $t : ue.current;
  return i = sn(t, i), rn(t, l), n = $o(e, t, n, r, i, l), r = Mo(), e !== null && !me ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, et(e, t, l)) : (W && r && ko(t), t.flags |= 1, ce(e, t, n, l), t.child);
}
function Ys(e, t, n, r, l) {
  if (ve(n)) {
    var i = !0;
    Xr(t);
  } else i = !1;
  if (rn(t, l), t.stateNode === null) Or(e, t), Gu(t, n, r), Di(t, n, r, l), r = !0;
  else if (e === null) {
    var o = t.stateNode, a = t.memoizedProps;
    o.props = a;
    var u = o.context, d = n.contextType;
    typeof d == "object" && d !== null ? d = Le(d) : (d = ve(n) ? $t : ue.current, d = sn(t, d));
    var m = n.getDerivedStateFromProps, g = typeof m == "function" || typeof o.getSnapshotBeforeUpdate == "function";
    g || typeof o.UNSAFE_componentWillReceiveProps != "function" && typeof o.componentWillReceiveProps != "function" || (a !== r || u !== d) && Ws(t, o, r, d), it = !1;
    var h = t.memoizedState;
    o.state = h, el(t, r, o, l), u = t.memoizedState, a !== r || h !== u || ge.current || it ? (typeof m == "function" && (Oi(t, n, m, r), u = t.memoizedState), (a = it || Bs(t, n, a, r, h, u, d)) ? (g || typeof o.UNSAFE_componentWillMount != "function" && typeof o.componentWillMount != "function" || (typeof o.componentWillMount == "function" && o.componentWillMount(), typeof o.UNSAFE_componentWillMount == "function" && o.UNSAFE_componentWillMount()), typeof o.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof o.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = u), o.props = r, o.state = u, o.context = d, r = a) : (typeof o.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
  } else {
    o = t.stateNode, Cu(e, t), a = t.memoizedProps, d = t.type === t.elementType ? a : Me(t.type, a), o.props = d, g = t.pendingProps, h = o.context, u = n.contextType, typeof u == "object" && u !== null ? u = Le(u) : (u = ve(n) ? $t : ue.current, u = sn(t, u));
    var y = n.getDerivedStateFromProps;
    (m = typeof y == "function" || typeof o.getSnapshotBeforeUpdate == "function") || typeof o.UNSAFE_componentWillReceiveProps != "function" && typeof o.componentWillReceiveProps != "function" || (a !== g || h !== u) && Ws(t, o, r, u), it = !1, h = t.memoizedState, o.state = h, el(t, r, o, l);
    var S = t.memoizedState;
    a !== g || h !== S || ge.current || it ? (typeof y == "function" && (Oi(t, n, y, r), S = t.memoizedState), (d = it || Bs(t, n, d, r, h, S, u) || !1) ? (m || typeof o.UNSAFE_componentWillUpdate != "function" && typeof o.componentWillUpdate != "function" || (typeof o.componentWillUpdate == "function" && o.componentWillUpdate(r, S, u), typeof o.UNSAFE_componentWillUpdate == "function" && o.UNSAFE_componentWillUpdate(r, S, u)), typeof o.componentDidUpdate == "function" && (t.flags |= 4), typeof o.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof o.componentDidUpdate != "function" || a === e.memoizedProps && h === e.memoizedState || (t.flags |= 4), typeof o.getSnapshotBeforeUpdate != "function" || a === e.memoizedProps && h === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = S), o.props = r, o.state = S, o.context = u, r = d) : (typeof o.componentDidUpdate != "function" || a === e.memoizedProps && h === e.memoizedState || (t.flags |= 4), typeof o.getSnapshotBeforeUpdate != "function" || a === e.memoizedProps && h === e.memoizedState || (t.flags |= 1024), r = !1);
  }
  return Ai(e, t, n, r, i, l);
}
function Ai(e, t, n, r, l, i) {
  Ju(e, t);
  var o = (t.flags & 128) !== 0;
  if (!r && !o) return l && $s(t, n, !1), et(e, t, i);
  r = t.stateNode, Rf.current = t;
  var a = o && typeof n.getDerivedStateFromError != "function" ? null : r.render();
  return t.flags |= 1, e !== null && o ? (t.child = un(t, e.child, null, i), t.child = un(t, null, a, i)) : ce(e, t, a, i), t.memoizedState = r.state, l && $s(t, n, !0), t.child;
}
function qu(e) {
  var t = e.stateNode;
  t.pendingContext ? Rs(e, t.pendingContext, t.pendingContext !== t.context) : t.context && Rs(e, t.context, !1), Po(e, t.containerInfo);
}
function Xs(e, t, n, r, l) {
  return an(), jo(l), t.flags |= 256, ce(e, t, n, r), t.child;
}
var Ui = { dehydrated: null, treeContext: null, retryLane: 0 };
function Bi(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function ec(e, t, n) {
  var r = t.pendingProps, l = H.current, i = !1, o = (t.flags & 128) !== 0, a;
  if ((a = o) || (a = e !== null && e.memoizedState === null ? !1 : (l & 2) !== 0), a ? (i = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (l |= 1), I(H, l & 1), e === null)
    return $i(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? (t.mode & 1 ? e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824 : t.lanes = 1, null) : (o = r.children, e = r.fallback, i ? (r = t.mode, i = t.child, o = { mode: "hidden", children: o }, !(r & 1) && i !== null ? (i.childLanes = 0, i.pendingProps = o) : i = kl(o, r, 0, null), e = Rt(e, r, n, null), i.return = t, e.return = t, i.sibling = e, t.child = i, t.child.memoizedState = Bi(n), t.memoizedState = Ui, e) : Fo(t, o));
  if (l = e.memoizedState, l !== null && (a = l.dehydrated, a !== null)) return $f(e, t, o, r, a, l, n);
  if (i) {
    i = r.fallback, o = t.mode, l = e.child, a = l.sibling;
    var u = { mode: "hidden", children: r.children };
    return !(o & 1) && t.child !== l ? (r = t.child, r.childLanes = 0, r.pendingProps = u, t.deletions = null) : (r = vt(l, u), r.subtreeFlags = l.subtreeFlags & 14680064), a !== null ? i = vt(a, i) : (i = Rt(i, o, n, null), i.flags |= 2), i.return = t, r.return = t, r.sibling = i, t.child = r, r = i, i = t.child, o = e.child.memoizedState, o = o === null ? Bi(n) : { baseLanes: o.baseLanes | n, cachePool: null, transitions: o.transitions }, i.memoizedState = o, i.childLanes = e.childLanes & ~n, t.memoizedState = Ui, r;
  }
  return i = e.child, e = i.sibling, r = vt(i, { mode: "visible", children: r.children }), !(t.mode & 1) && (r.lanes = n), r.return = t, r.sibling = null, e !== null && (n = t.deletions, n === null ? (t.deletions = [e], t.flags |= 16) : n.push(e)), t.child = r, t.memoizedState = null, r;
}
function Fo(e, t) {
  return t = kl({ mode: "visible", children: t }, e.mode, 0, null), t.return = e, e.child = t;
}
function jr(e, t, n, r) {
  return r !== null && jo(r), un(t, e.child, null, n), e = Fo(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
}
function $f(e, t, n, r, l, i, o) {
  if (n)
    return t.flags & 256 ? (t.flags &= -257, r = Jl(Error(N(422))), jr(e, t, o, r)) : t.memoizedState !== null ? (t.child = e.child, t.flags |= 128, null) : (i = r.fallback, l = t.mode, r = kl({ mode: "visible", children: r.children }, l, 0, null), i = Rt(i, l, o, null), i.flags |= 2, r.return = t, i.return = t, r.sibling = i, t.child = r, t.mode & 1 && un(t, e.child, null, o), t.child.memoizedState = Bi(o), t.memoizedState = Ui, i);
  if (!(t.mode & 1)) return jr(e, t, o, null);
  if (l.data === "$!") {
    if (r = l.nextSibling && l.nextSibling.dataset, r) var a = r.dgst;
    return r = a, i = Error(N(419)), r = Jl(i, r, void 0), jr(e, t, o, r);
  }
  if (a = (o & e.childLanes) !== 0, me || a) {
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
    return Vo(), r = Jl(Error(N(421))), jr(e, t, o, r);
  }
  return l.data === "$?" ? (t.flags |= 128, t.child = e.child, t = Kf.bind(null, e), l._reactRetry = t, null) : (e = i.treeContext, ke = pt(l.nextSibling), Se = t, W = !0, De = null, e !== null && (Ee[ze++] = Ye, Ee[ze++] = Xe, Ee[ze++] = Mt, Ye = e.id, Xe = e.overflow, Mt = t), t = Fo(t, r.children), t.flags |= 4096, t);
}
function Zs(e, t, n) {
  e.lanes |= t;
  var r = e.alternate;
  r !== null && (r.lanes |= t), Mi(e.return, t, n);
}
function ql(e, t, n, r, l) {
  var i = e.memoizedState;
  i === null ? e.memoizedState = { isBackwards: t, rendering: null, renderingStartTime: 0, last: r, tail: n, tailMode: l } : (i.isBackwards = t, i.rendering = null, i.renderingStartTime = 0, i.last = r, i.tail = n, i.tailMode = l);
}
function tc(e, t, n) {
  var r = t.pendingProps, l = r.revealOrder, i = r.tail;
  if (ce(e, t, r.children, n), r = H.current, r & 2) r = r & 1 | 2, t.flags |= 128;
  else {
    if (e !== null && e.flags & 128) e: for (e = t.child; e !== null; ) {
      if (e.tag === 13) e.memoizedState !== null && Zs(e, n, t);
      else if (e.tag === 19) Zs(e, n, t);
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
      n = l, n === null ? (l = t.child, t.child = null) : (l = n.sibling, n.sibling = null), ql(t, !1, l, n, i);
      break;
    case "backwards":
      for (n = null, l = t.child, t.child = null; l !== null; ) {
        if (e = l.alternate, e !== null && tl(e) === null) {
          t.child = l;
          break;
        }
        e = l.sibling, l.sibling = n, n = l, l = e;
      }
      ql(t, !0, n, null, i);
      break;
    case "together":
      ql(t, !1, null, null, void 0);
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
function Mf(e, t, n) {
  switch (t.tag) {
    case 3:
      qu(t), an();
      break;
    case 5:
      Eu(t);
      break;
    case 1:
      ve(t.type) && Xr(t);
      break;
    case 4:
      Po(t, t.stateNode.containerInfo);
      break;
    case 10:
      var r = t.type._context, l = t.memoizedProps.value;
      I(Jr, r._currentValue), r._currentValue = l;
      break;
    case 13:
      if (r = t.memoizedState, r !== null)
        return r.dehydrated !== null ? (I(H, H.current & 1), t.flags |= 128, null) : n & t.child.childLanes ? ec(e, t, n) : (I(H, H.current & 1), e = et(e, t, n), e !== null ? e.sibling : null);
      I(H, H.current & 1);
      break;
    case 19:
      if (r = (n & t.childLanes) !== 0, e.flags & 128) {
        if (r) return tc(e, t, n);
        t.flags |= 128;
      }
      if (l = t.memoizedState, l !== null && (l.rendering = null, l.tail = null, l.lastEffect = null), I(H, H.current), r) break;
      return null;
    case 22:
    case 23:
      return t.lanes = 0, bu(e, t, n);
  }
  return et(e, t, n);
}
var nc, Wi, rc, lc;
nc = function(e, t) {
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
Wi = function() {
};
rc = function(e, t, n, r) {
  var l = e.memoizedProps;
  if (l !== r) {
    e = t.stateNode, Pt(Qe.current);
    var i = null;
    switch (n) {
      case "input":
        l = ci(e, l), r = ci(e, r), i = [];
        break;
      case "select":
        l = K({}, l, { value: void 0 }), r = K({}, r, { value: void 0 }), i = [];
        break;
      case "textarea":
        l = pi(e, l), r = pi(e, r), i = [];
        break;
      default:
        typeof l.onClick != "function" && typeof r.onClick == "function" && (e.onclick = Gr);
    }
    mi(n, r);
    var o;
    n = null;
    for (d in l) if (!r.hasOwnProperty(d) && l.hasOwnProperty(d) && l[d] != null) if (d === "style") {
      var a = l[d];
      for (o in a) a.hasOwnProperty(o) && (n || (n = {}), n[o] = "");
    } else d !== "dangerouslySetInnerHTML" && d !== "children" && d !== "suppressContentEditableWarning" && d !== "suppressHydrationWarning" && d !== "autoFocus" && (Un.hasOwnProperty(d) ? i || (i = []) : (i = i || []).push(d, null));
    for (d in r) {
      var u = r[d];
      if (a = l != null ? l[d] : void 0, r.hasOwnProperty(d) && u !== a && (u != null || a != null)) if (d === "style") if (a) {
        for (o in a) !a.hasOwnProperty(o) || u && u.hasOwnProperty(o) || (n || (n = {}), n[o] = "");
        for (o in u) u.hasOwnProperty(o) && a[o] !== u[o] && (n || (n = {}), n[o] = u[o]);
      } else n || (i || (i = []), i.push(
        d,
        n
      )), n = u;
      else d === "dangerouslySetInnerHTML" ? (u = u ? u.__html : void 0, a = a ? a.__html : void 0, u != null && a !== u && (i = i || []).push(d, u)) : d === "children" ? typeof u != "string" && typeof u != "number" || (i = i || []).push(d, "" + u) : d !== "suppressContentEditableWarning" && d !== "suppressHydrationWarning" && (Un.hasOwnProperty(d) ? (u != null && d === "onScroll" && A("scroll", e), i || a === u || (i = [])) : (i = i || []).push(d, u));
    }
    n && (i = i || []).push("style", n);
    var d = i;
    (t.updateQueue = d) && (t.flags |= 4);
  }
};
lc = function(e, t, n, r) {
  n !== r && (t.flags |= 4);
};
function _n(e, t) {
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
function se(e) {
  var t = e.alternate !== null && e.alternate.child === e.child, n = 0, r = 0;
  if (t) for (var l = e.child; l !== null; ) n |= l.lanes | l.childLanes, r |= l.subtreeFlags & 14680064, r |= l.flags & 14680064, l.return = e, l = l.sibling;
  else for (l = e.child; l !== null; ) n |= l.lanes | l.childLanes, r |= l.subtreeFlags, r |= l.flags, l.return = e, l = l.sibling;
  return e.subtreeFlags |= r, e.childLanes = n, t;
}
function Of(e, t, n) {
  var r = t.pendingProps;
  switch (So(t), t.tag) {
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
      return r = t.stateNode, cn(), B(ge), B(ue), Lo(), r.pendingContext && (r.context = r.pendingContext, r.pendingContext = null), (e === null || e.child === null) && (kr(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, De !== null && (Zi(De), De = null))), Wi(e, t), se(t), null;
    case 5:
      To(t);
      var l = Pt(Jn.current);
      if (n = t.type, e !== null && t.stateNode != null) rc(e, t, n, r, l), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
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
              is(r, i), A("invalid", r);
              break;
            case "select":
              r._wrapperState = { wasMultiple: !!i.multiple }, A("invalid", r);
              break;
            case "textarea":
              ss(r, i), A("invalid", r);
          }
          mi(n, i), l = null;
          for (var o in i) if (i.hasOwnProperty(o)) {
            var a = i[o];
            o === "children" ? typeof a == "string" ? r.textContent !== a && (i.suppressHydrationWarning !== !0 && wr(r.textContent, a, e), l = ["children", a]) : typeof a == "number" && r.textContent !== "" + a && (i.suppressHydrationWarning !== !0 && wr(
              r.textContent,
              a,
              e
            ), l = ["children", "" + a]) : Un.hasOwnProperty(o) && a != null && o === "onScroll" && A("scroll", r);
          }
          switch (n) {
            case "input":
              fr(r), os(r, i, !0);
              break;
            case "textarea":
              fr(r), as(r);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof i.onClick == "function" && (r.onclick = Gr);
          }
          r = l, t.updateQueue = r, r !== null && (t.flags |= 4);
        } else {
          o = l.nodeType === 9 ? l : l.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = Ra(n)), e === "http://www.w3.org/1999/xhtml" ? n === "script" ? (e = o.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof r.is == "string" ? e = o.createElement(n, { is: r.is }) : (e = o.createElement(n), n === "select" && (o = e, r.multiple ? o.multiple = !0 : r.size && (o.size = r.size))) : e = o.createElementNS(e, n), e[Ve] = t, e[Zn] = r, nc(e, t, !1, !1), t.stateNode = e;
          e: {
            switch (o = gi(n, r), n) {
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
                is(e, r), l = ci(e, r), A("invalid", e);
                break;
              case "option":
                l = r;
                break;
              case "select":
                e._wrapperState = { wasMultiple: !!r.multiple }, l = K({}, r, { value: void 0 }), A("invalid", e);
                break;
              case "textarea":
                ss(e, r), l = pi(e, r), A("invalid", e);
                break;
              default:
                l = r;
            }
            mi(n, l), a = l;
            for (i in a) if (a.hasOwnProperty(i)) {
              var u = a[i];
              i === "style" ? Oa(e, u) : i === "dangerouslySetInnerHTML" ? (u = u ? u.__html : void 0, u != null && $a(e, u)) : i === "children" ? typeof u == "string" ? (n !== "textarea" || u !== "") && Bn(e, u) : typeof u == "number" && Bn(e, "" + u) : i !== "suppressContentEditableWarning" && i !== "suppressHydrationWarning" && i !== "autoFocus" && (Un.hasOwnProperty(i) ? u != null && i === "onScroll" && A("scroll", e) : u != null && oo(e, i, u, o));
            }
            switch (n) {
              case "input":
                fr(e), os(e, r, !1);
                break;
              case "textarea":
                fr(e), as(e);
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
      if (e && t.stateNode != null) lc(e, t, e.memoizedProps, r);
      else {
        if (typeof r != "string" && t.stateNode === null) throw Error(N(166));
        if (n = Pt(Jn.current), Pt(Qe.current), kr(t)) {
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
      if (B(H), r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
        if (W && ke !== null && t.mode & 1 && !(t.flags & 128)) Su(), an(), t.flags |= 98560, i = !1;
        else if (i = kr(t), r !== null && r.dehydrated !== null) {
          if (e === null) {
            if (!i) throw Error(N(318));
            if (i = t.memoizedState, i = i !== null ? i.dehydrated : null, !i) throw Error(N(317));
            i[Ve] = t;
          } else an(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
          se(t), i = !1;
        } else De !== null && (Zi(De), De = null), i = !0;
        if (!i) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128 ? (t.lanes = n, t) : (r = r !== null, r !== (e !== null && e.memoizedState !== null) && r && (t.child.flags |= 8192, t.mode & 1 && (e === null || H.current & 1 ? J === 0 && (J = 3) : Vo())), t.updateQueue !== null && (t.flags |= 4), se(t), null);
    case 4:
      return cn(), Wi(e, t), e === null && Yn(t.stateNode.containerInfo), se(t), null;
    case 10:
      return Co(t.type._context), se(t), null;
    case 17:
      return ve(t.type) && Yr(), se(t), null;
    case 19:
      if (B(H), i = t.memoizedState, i === null) return se(t), null;
      if (r = (t.flags & 128) !== 0, o = i.rendering, o === null) if (r) _n(i, !1);
      else {
        if (J !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null; ) {
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
          if (t.flags |= 128, r = !0, n = e.updateQueue, n !== null && (t.updateQueue = n, t.flags |= 4), _n(i, !0), i.tail === null && i.tailMode === "hidden" && !o.alternate && !W) return se(t), null;
        } else 2 * X() - i.renderingStartTime > fn && n !== 1073741824 && (t.flags |= 128, r = !0, _n(i, !1), t.lanes = 4194304);
        i.isBackwards ? (o.sibling = t.child, t.child = o) : (n = i.last, n !== null ? n.sibling = o : t.child = o, i.last = o);
      }
      return i.tail !== null ? (t = i.tail, i.rendering = t, i.tail = t.sibling, i.renderingStartTime = X(), t.sibling = null, n = H.current, I(H, r ? n & 1 | 2 : n & 1), t) : (se(t), null);
    case 22:
    case 23:
      return Wo(), r = t.memoizedState !== null, e !== null && e.memoizedState !== null !== r && (t.flags |= 8192), r && t.mode & 1 ? we & 1073741824 && (se(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : se(t), null;
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(N(156, t.tag));
}
function Df(e, t) {
  switch (So(t), t.tag) {
    case 1:
      return ve(t.type) && Yr(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 3:
      return cn(), B(ge), B(ue), Lo(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
    case 5:
      return To(t), null;
    case 13:
      if (B(H), e = t.memoizedState, e !== null && e.dehydrated !== null) {
        if (t.alternate === null) throw Error(N(340));
        an();
      }
      return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 19:
      return B(H), null;
    case 4:
      return cn(), null;
    case 10:
      return Co(t.type._context), null;
    case 22:
    case 23:
      return Wo(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var Nr = !1, ae = !1, Ff = typeof WeakSet == "function" ? WeakSet : Set, z = null;
function bt(e, t) {
  var n = e.ref;
  if (n !== null) if (typeof n == "function") try {
    n(null);
  } catch (r) {
    G(e, t, r);
  }
  else n.current = null;
}
function Vi(e, t, n) {
  try {
    n();
  } catch (r) {
    G(e, t, r);
  }
}
var bs = !1;
function If(e, t) {
  if (Ci = Hr, e = uu(), wo(e)) {
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
        var o = 0, a = -1, u = -1, d = 0, m = 0, g = e, h = null;
        t: for (; ; ) {
          for (var y; g !== n || l !== 0 && g.nodeType !== 3 || (a = o + l), g !== i || r !== 0 && g.nodeType !== 3 || (u = o + r), g.nodeType === 3 && (o += g.nodeValue.length), (y = g.firstChild) !== null; )
            h = g, g = y;
          for (; ; ) {
            if (g === e) break t;
            if (h === n && ++d === l && (a = o), h === i && ++m === r && (u = o), (y = g.nextSibling) !== null) break;
            g = h, h = g.parentNode;
          }
          g = y;
        }
        n = a === -1 || u === -1 ? null : { start: a, end: u };
      } else n = null;
    }
    n = n || { start: 0, end: 0 };
  } else n = null;
  for (Ei = { focusedElem: e, selectionRange: n }, Hr = !1, z = t; z !== null; ) if (t = z, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null) e.return = t, z = e;
  else for (; z !== null; ) {
    t = z;
    try {
      var S = t.alternate;
      if (t.flags & 1024) switch (t.tag) {
        case 0:
        case 11:
        case 15:
          break;
        case 1:
          if (S !== null) {
            var j = S.memoizedProps, E = S.memoizedState, f = t.stateNode, c = f.getSnapshotBeforeUpdate(t.elementType === t.type ? j : Me(t.type, j), E);
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
      e.return = t.return, z = e;
      break;
    }
    z = t.return;
  }
  return S = bs, bs = !1, S;
}
function Fn(e, t, n) {
  var r = t.updateQueue;
  if (r = r !== null ? r.lastEffect : null, r !== null) {
    var l = r = r.next;
    do {
      if ((l.tag & e) === e) {
        var i = l.destroy;
        l.destroy = void 0, i !== void 0 && Vi(t, n, i);
      }
      l = l.next;
    } while (l !== r);
  }
}
function xl(e, t) {
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
function Hi(e) {
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
function ic(e) {
  var t = e.alternate;
  t !== null && (e.alternate = null, ic(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[Ve], delete t[Zn], delete t[Ti], delete t[wf], delete t[kf])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
}
function oc(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function Js(e) {
  e: for (; ; ) {
    for (; e.sibling === null; ) {
      if (e.return === null || oc(e.return)) return null;
      e = e.return;
    }
    for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
      if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
      e.child.return = e, e = e.child;
    }
    if (!(e.flags & 2)) return e.stateNode;
  }
}
function Qi(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6) e = e.stateNode, t ? n.nodeType === 8 ? n.parentNode.insertBefore(e, t) : n.insertBefore(e, t) : (n.nodeType === 8 ? (t = n.parentNode, t.insertBefore(e, n)) : (t = n, t.appendChild(e)), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = Gr));
  else if (r !== 4 && (e = e.child, e !== null)) for (Qi(e, t, n), e = e.sibling; e !== null; ) Qi(e, t, n), e = e.sibling;
}
function Ki(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
  else if (r !== 4 && (e = e.child, e !== null)) for (Ki(e, t, n), e = e.sibling; e !== null; ) Ki(e, t, n), e = e.sibling;
}
var re = null, Oe = !1;
function rt(e, t, n) {
  for (n = n.child; n !== null; ) sc(e, t, n), n = n.sibling;
}
function sc(e, t, n) {
  if (He && typeof He.onCommitFiberUnmount == "function") try {
    He.onCommitFiberUnmount(dl, n);
  } catch {
  }
  switch (n.tag) {
    case 5:
      ae || bt(n, t);
    case 6:
      var r = re, l = Oe;
      re = null, rt(e, t, n), re = r, Oe = l, re !== null && (Oe ? (e = re, n = n.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n)) : re.removeChild(n.stateNode));
      break;
    case 18:
      re !== null && (Oe ? (e = re, n = n.stateNode, e.nodeType === 8 ? Kl(e.parentNode, n) : e.nodeType === 1 && Kl(e, n), Qn(e)) : Kl(re, n.stateNode));
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
          i = i.tag, o !== void 0 && (i & 2 || i & 4) && Vi(n, t, o), l = l.next;
        } while (l !== r);
      }
      rt(e, t, n);
      break;
    case 1:
      if (!ae && (bt(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function")) try {
        r.props = n.memoizedProps, r.state = n.memoizedState, r.componentWillUnmount();
      } catch (a) {
        G(n, t, a);
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
function qs(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    n === null && (n = e.stateNode = new Ff()), t.forEach(function(r) {
      var l = Gf.bind(null, e, r);
      n.has(r) || (n.add(r), r.then(l, l));
    });
  }
}
function $e(e, t) {
  var n = t.deletions;
  if (n !== null) for (var r = 0; r < n.length; r++) {
    var l = n[r];
    try {
      var i = e, o = t, a = o;
      e: for (; a !== null; ) {
        switch (a.tag) {
          case 5:
            re = a.stateNode, Oe = !1;
            break e;
          case 3:
            re = a.stateNode.containerInfo, Oe = !0;
            break e;
          case 4:
            re = a.stateNode.containerInfo, Oe = !0;
            break e;
        }
        a = a.return;
      }
      if (re === null) throw Error(N(160));
      sc(i, o, l), re = null, Oe = !1;
      var u = l.alternate;
      u !== null && (u.return = null), l.return = null;
    } catch (d) {
      G(l, t, d);
    }
  }
  if (t.subtreeFlags & 12854) for (t = t.child; t !== null; ) ac(t, e), t = t.sibling;
}
function ac(e, t) {
  var n = e.alternate, r = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if ($e(t, e), Be(e), r & 4) {
        try {
          Fn(3, e, e.return), xl(3, e);
        } catch (j) {
          G(e, e.return, j);
        }
        try {
          Fn(5, e, e.return);
        } catch (j) {
          G(e, e.return, j);
        }
      }
      break;
    case 1:
      $e(t, e), Be(e), r & 512 && n !== null && bt(n, n.return);
      break;
    case 5:
      if ($e(t, e), Be(e), r & 512 && n !== null && bt(n, n.return), e.flags & 32) {
        var l = e.stateNode;
        try {
          Bn(l, "");
        } catch (j) {
          G(e, e.return, j);
        }
      }
      if (r & 4 && (l = e.stateNode, l != null)) {
        var i = e.memoizedProps, o = n !== null ? n.memoizedProps : i, a = e.type, u = e.updateQueue;
        if (e.updateQueue = null, u !== null) try {
          a === "input" && i.type === "radio" && i.name != null && Ta(l, i), gi(a, o);
          var d = gi(a, i);
          for (o = 0; o < u.length; o += 2) {
            var m = u[o], g = u[o + 1];
            m === "style" ? Oa(l, g) : m === "dangerouslySetInnerHTML" ? $a(l, g) : m === "children" ? Bn(l, g) : oo(l, m, g, d);
          }
          switch (a) {
            case "input":
              di(l, i);
              break;
            case "textarea":
              La(l, i);
              break;
            case "select":
              var h = l._wrapperState.wasMultiple;
              l._wrapperState.wasMultiple = !!i.multiple;
              var y = i.value;
              y != null ? qt(l, !!i.multiple, y, !1) : h !== !!i.multiple && (i.defaultValue != null ? qt(
                l,
                !!i.multiple,
                i.defaultValue,
                !0
              ) : qt(l, !!i.multiple, i.multiple ? [] : "", !1));
          }
          l[Zn] = i;
        } catch (j) {
          G(e, e.return, j);
        }
      }
      break;
    case 6:
      if ($e(t, e), Be(e), r & 4) {
        if (e.stateNode === null) throw Error(N(162));
        l = e.stateNode, i = e.memoizedProps;
        try {
          l.nodeValue = i;
        } catch (j) {
          G(e, e.return, j);
        }
      }
      break;
    case 3:
      if ($e(t, e), Be(e), r & 4 && n !== null && n.memoizedState.isDehydrated) try {
        Qn(t.containerInfo);
      } catch (j) {
        G(e, e.return, j);
      }
      break;
    case 4:
      $e(t, e), Be(e);
      break;
    case 13:
      $e(t, e), Be(e), l = e.child, l.flags & 8192 && (i = l.memoizedState !== null, l.stateNode.isHidden = i, !i || l.alternate !== null && l.alternate.memoizedState !== null || (Uo = X())), r & 4 && qs(e);
      break;
    case 22:
      if (m = n !== null && n.memoizedState !== null, e.mode & 1 ? (ae = (d = ae) || m, $e(t, e), ae = d) : $e(t, e), Be(e), r & 8192) {
        if (d = e.memoizedState !== null, (e.stateNode.isHidden = d) && !m && e.mode & 1) for (z = e, m = e.child; m !== null; ) {
          for (g = z = m; z !== null; ) {
            switch (h = z, y = h.child, h.tag) {
              case 0:
              case 11:
              case 14:
              case 15:
                Fn(4, h, h.return);
                break;
              case 1:
                bt(h, h.return);
                var S = h.stateNode;
                if (typeof S.componentWillUnmount == "function") {
                  r = h, n = h.return;
                  try {
                    t = r, S.props = t.memoizedProps, S.state = t.memoizedState, S.componentWillUnmount();
                  } catch (j) {
                    G(r, n, j);
                  }
                }
                break;
              case 5:
                bt(h, h.return);
                break;
              case 22:
                if (h.memoizedState !== null) {
                  ta(g);
                  continue;
                }
            }
            y !== null ? (y.return = h, z = y) : ta(g);
          }
          m = m.sibling;
        }
        e: for (m = null, g = e; ; ) {
          if (g.tag === 5) {
            if (m === null) {
              m = g;
              try {
                l = g.stateNode, d ? (i = l.style, typeof i.setProperty == "function" ? i.setProperty("display", "none", "important") : i.display = "none") : (a = g.stateNode, u = g.memoizedProps.style, o = u != null && u.hasOwnProperty("display") ? u.display : null, a.style.display = Ma("display", o));
              } catch (j) {
                G(e, e.return, j);
              }
            }
          } else if (g.tag === 6) {
            if (m === null) try {
              g.stateNode.nodeValue = d ? "" : g.memoizedProps;
            } catch (j) {
              G(e, e.return, j);
            }
          } else if ((g.tag !== 22 && g.tag !== 23 || g.memoizedState === null || g === e) && g.child !== null) {
            g.child.return = g, g = g.child;
            continue;
          }
          if (g === e) break e;
          for (; g.sibling === null; ) {
            if (g.return === null || g.return === e) break e;
            m === g && (m = null), g = g.return;
          }
          m === g && (m = null), g.sibling.return = g.return, g = g.sibling;
        }
      }
      break;
    case 19:
      $e(t, e), Be(e), r & 4 && qs(e);
      break;
    case 21:
      break;
    default:
      $e(
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
          if (oc(n)) {
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
          var i = Js(e);
          Ki(e, i, l);
          break;
        case 3:
        case 4:
          var o = r.stateNode.containerInfo, a = Js(e);
          Qi(e, a, o);
          break;
        default:
          throw Error(N(161));
      }
    } catch (u) {
      G(e, e.return, u);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function Af(e, t, n) {
  z = e, uc(e);
}
function uc(e, t, n) {
  for (var r = (e.mode & 1) !== 0; z !== null; ) {
    var l = z, i = l.child;
    if (l.tag === 22 && r) {
      var o = l.memoizedState !== null || Nr;
      if (!o) {
        var a = l.alternate, u = a !== null && a.memoizedState !== null || ae;
        a = Nr;
        var d = ae;
        if (Nr = o, (ae = u) && !d) for (z = l; z !== null; ) o = z, u = o.child, o.tag === 22 && o.memoizedState !== null ? na(l) : u !== null ? (u.return = o, z = u) : na(l);
        for (; i !== null; ) z = i, uc(i), i = i.sibling;
        z = l, Nr = a, ae = d;
      }
      ea(e);
    } else l.subtreeFlags & 8772 && i !== null ? (i.return = l, z = i) : ea(e);
  }
}
function ea(e) {
  for (; z !== null; ) {
    var t = z;
    if (t.flags & 8772) {
      var n = t.alternate;
      try {
        if (t.flags & 8772) switch (t.tag) {
          case 0:
          case 11:
          case 15:
            ae || xl(5, t);
            break;
          case 1:
            var r = t.stateNode;
            if (t.flags & 4 && !ae) if (n === null) r.componentDidMount();
            else {
              var l = t.elementType === t.type ? n.memoizedProps : Me(t.type, n.memoizedProps);
              r.componentDidUpdate(l, n.memoizedState, r.__reactInternalSnapshotBeforeUpdate);
            }
            var i = t.updateQueue;
            i !== null && Is(t, i, r);
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
              Is(t, o, n);
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
              var d = t.alternate;
              if (d !== null) {
                var m = d.memoizedState;
                if (m !== null) {
                  var g = m.dehydrated;
                  g !== null && Qn(g);
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
        ae || t.flags & 512 && Hi(t);
      } catch (h) {
        G(t, t.return, h);
      }
    }
    if (t === e) {
      z = null;
      break;
    }
    if (n = t.sibling, n !== null) {
      n.return = t.return, z = n;
      break;
    }
    z = t.return;
  }
}
function ta(e) {
  for (; z !== null; ) {
    var t = z;
    if (t === e) {
      z = null;
      break;
    }
    var n = t.sibling;
    if (n !== null) {
      n.return = t.return, z = n;
      break;
    }
    z = t.return;
  }
}
function na(e) {
  for (; z !== null; ) {
    var t = z;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return;
          try {
            xl(4, t);
          } catch (u) {
            G(t, n, u);
          }
          break;
        case 1:
          var r = t.stateNode;
          if (typeof r.componentDidMount == "function") {
            var l = t.return;
            try {
              r.componentDidMount();
            } catch (u) {
              G(t, l, u);
            }
          }
          var i = t.return;
          try {
            Hi(t);
          } catch (u) {
            G(t, i, u);
          }
          break;
        case 5:
          var o = t.return;
          try {
            Hi(t);
          } catch (u) {
            G(t, o, u);
          }
      }
    } catch (u) {
      G(t, t.return, u);
    }
    if (t === e) {
      z = null;
      break;
    }
    var a = t.sibling;
    if (a !== null) {
      a.return = t.return, z = a;
      break;
    }
    z = t.return;
  }
}
var Uf = Math.ceil, ll = tt.ReactCurrentDispatcher, Io = tt.ReactCurrentOwner, Te = tt.ReactCurrentBatchConfig, M = 0, te = null, Z = null, le = 0, we = 0, Jt = kt(0), J = 0, nr = null, Dt = 0, wl = 0, Ao = 0, In = null, he = null, Uo = 0, fn = 1 / 0, Ke = null, il = !1, Gi = null, mt = null, _r = !1, ut = null, ol = 0, An = 0, Yi = null, Dr = -1, Fr = 0;
function de() {
  return M & 6 ? X() : Dr !== -1 ? Dr : Dr = X();
}
function gt(e) {
  return e.mode & 1 ? M & 2 && le !== 0 ? le & -le : jf.transition !== null ? (Fr === 0 && (Fr = Ga()), Fr) : (e = D, e !== 0 || (e = window.event, e = e === void 0 ? 16 : eu(e.type)), e) : 1;
}
function Ie(e, t, n, r) {
  if (50 < An) throw An = 0, Yi = null, Error(N(185));
  lr(e, n, r), (!(M & 2) || e !== te) && (e === te && (!(M & 2) && (wl |= n), J === 4 && st(e, le)), ye(e, r), n === 1 && M === 0 && !(t.mode & 1) && (fn = X() + 500, gl && St()));
}
function ye(e, t) {
  var n = e.callbackNode;
  Sd(e, t);
  var r = Vr(e, e === te ? le : 0);
  if (r === 0) n !== null && ds(n), e.callbackNode = null, e.callbackPriority = 0;
  else if (t = r & -r, e.callbackPriority !== t) {
    if (n != null && ds(n), t === 1) e.tag === 0 ? Sf(ra.bind(null, e)) : xu(ra.bind(null, e)), yf(function() {
      !(M & 6) && St();
    }), n = null;
    else {
      switch (Ya(r)) {
        case 1:
          n = fo;
          break;
        case 4:
          n = Qa;
          break;
        case 16:
          n = Wr;
          break;
        case 536870912:
          n = Ka;
          break;
        default:
          n = Wr;
      }
      n = vc(n, cc.bind(null, e));
    }
    e.callbackPriority = t, e.callbackNode = n;
  }
}
function cc(e, t) {
  if (Dr = -1, Fr = 0, M & 6) throw Error(N(327));
  var n = e.callbackNode;
  if (ln() && e.callbackNode !== n) return null;
  var r = Vr(e, e === te ? le : 0);
  if (r === 0) return null;
  if (r & 30 || r & e.expiredLanes || t) t = sl(e, r);
  else {
    t = r;
    var l = M;
    M |= 2;
    var i = fc();
    (te !== e || le !== t) && (Ke = null, fn = X() + 500, Lt(e, t));
    do
      try {
        Vf();
        break;
      } catch (a) {
        dc(e, a);
      }
    while (!0);
    _o(), ll.current = i, M = l, Z !== null ? t = 0 : (te = null, le = 0, t = J);
  }
  if (t !== 0) {
    if (t === 2 && (l = ki(e), l !== 0 && (r = l, t = Xi(e, l))), t === 1) throw n = nr, Lt(e, 0), st(e, r), ye(e, X()), n;
    if (t === 6) st(e, r);
    else {
      if (l = e.current.alternate, !(r & 30) && !Bf(l) && (t = sl(e, r), t === 2 && (i = ki(e), i !== 0 && (r = i, t = Xi(e, i))), t === 1)) throw n = nr, Lt(e, 0), st(e, r), ye(e, X()), n;
      switch (e.finishedWork = l, e.finishedLanes = r, t) {
        case 0:
        case 1:
          throw Error(N(345));
        case 2:
          Ct(e, he, Ke);
          break;
        case 3:
          if (st(e, r), (r & 130023424) === r && (t = Uo + 500 - X(), 10 < t)) {
            if (Vr(e, 0) !== 0) break;
            if (l = e.suspendedLanes, (l & r) !== r) {
              de(), e.pingedLanes |= e.suspendedLanes & l;
              break;
            }
            e.timeoutHandle = Pi(Ct.bind(null, e, he, Ke), t);
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
          if (r = l, r = X() - r, r = (120 > r ? 120 : 480 > r ? 480 : 1080 > r ? 1080 : 1920 > r ? 1920 : 3e3 > r ? 3e3 : 4320 > r ? 4320 : 1960 * Uf(r / 1960)) - r, 10 < r) {
            e.timeoutHandle = Pi(Ct.bind(null, e, he, Ke), r);
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
  return ye(e, X()), e.callbackNode === n ? cc.bind(null, e) : null;
}
function Xi(e, t) {
  var n = In;
  return e.current.memoizedState.isDehydrated && (Lt(e, t).flags |= 256), e = sl(e, t), e !== 2 && (t = he, he = n, t !== null && Zi(t)), e;
}
function Zi(e) {
  he === null ? he = e : he.push.apply(he, e);
}
function Bf(e) {
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
  for (t &= ~Ao, t &= ~wl, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t; ) {
    var n = 31 - Fe(t), r = 1 << n;
    e[n] = -1, t &= ~r;
  }
}
function ra(e) {
  if (M & 6) throw Error(N(327));
  ln();
  var t = Vr(e, 0);
  if (!(t & 1)) return ye(e, X()), null;
  var n = sl(e, t);
  if (e.tag !== 0 && n === 2) {
    var r = ki(e);
    r !== 0 && (t = r, n = Xi(e, r));
  }
  if (n === 1) throw n = nr, Lt(e, 0), st(e, t), ye(e, X()), n;
  if (n === 6) throw Error(N(345));
  return e.finishedWork = e.current.alternate, e.finishedLanes = t, Ct(e, he, Ke), ye(e, X()), null;
}
function Bo(e, t) {
  var n = M;
  M |= 1;
  try {
    return e(t);
  } finally {
    M = n, M === 0 && (fn = X() + 500, gl && St());
  }
}
function Ft(e) {
  ut !== null && ut.tag === 0 && !(M & 6) && ln();
  var t = M;
  M |= 1;
  var n = Te.transition, r = D;
  try {
    if (Te.transition = null, D = 1, e) return e();
  } finally {
    D = r, Te.transition = n, M = t, !(M & 6) && St();
  }
}
function Wo() {
  we = Jt.current, B(Jt);
}
function Lt(e, t) {
  e.finishedWork = null, e.finishedLanes = 0;
  var n = e.timeoutHandle;
  if (n !== -1 && (e.timeoutHandle = -1, vf(n)), Z !== null) for (n = Z.return; n !== null; ) {
    var r = n;
    switch (So(r), r.tag) {
      case 1:
        r = r.type.childContextTypes, r != null && Yr();
        break;
      case 3:
        cn(), B(ge), B(ue), Lo();
        break;
      case 5:
        To(r);
        break;
      case 4:
        cn();
        break;
      case 13:
        B(H);
        break;
      case 19:
        B(H);
        break;
      case 10:
        Co(r.type._context);
        break;
      case 22:
      case 23:
        Wo();
    }
    n = n.return;
  }
  if (te = e, Z = e = vt(e.current, null), le = we = t, J = 0, nr = null, Ao = wl = Dt = 0, he = In = null, zt !== null) {
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
function dc(e, t) {
  do {
    var n = Z;
    try {
      if (_o(), $r.current = rl, nl) {
        for (var r = Q.memoizedState; r !== null; ) {
          var l = r.queue;
          l !== null && (l.pending = null), r = r.next;
        }
        nl = !1;
      }
      if (Ot = 0, ee = b = Q = null, Dn = !1, qn = 0, Io.current = null, n === null || n.return === null) {
        J = 1, nr = t, Z = null;
        break;
      }
      e: {
        var i = e, o = n.return, a = n, u = t;
        if (t = le, a.flags |= 32768, u !== null && typeof u == "object" && typeof u.then == "function") {
          var d = u, m = a, g = m.tag;
          if (!(m.mode & 1) && (g === 0 || g === 11 || g === 15)) {
            var h = m.alternate;
            h ? (m.updateQueue = h.updateQueue, m.memoizedState = h.memoizedState, m.lanes = h.lanes) : (m.updateQueue = null, m.memoizedState = null);
          }
          var y = Hs(o);
          if (y !== null) {
            y.flags &= -257, Qs(y, o, a, i, t), y.mode & 1 && Vs(i, d, t), t = y, u = d;
            var S = t.updateQueue;
            if (S === null) {
              var j = /* @__PURE__ */ new Set();
              j.add(u), t.updateQueue = j;
            } else S.add(u);
            break e;
          } else {
            if (!(t & 1)) {
              Vs(i, d, t), Vo();
              break e;
            }
            u = Error(N(426));
          }
        } else if (W && a.mode & 1) {
          var E = Hs(o);
          if (E !== null) {
            !(E.flags & 65536) && (E.flags |= 256), Qs(E, o, a, i, t), jo(dn(u, a));
            break e;
          }
        }
        i = u = dn(u, a), J !== 4 && (J = 2), In === null ? In = [i] : In.push(i), i = o;
        do {
          switch (i.tag) {
            case 3:
              i.flags |= 65536, t &= -t, i.lanes |= t;
              var f = Yu(i, u, t);
              Fs(i, f);
              break e;
            case 1:
              a = u;
              var c = i.type, p = i.stateNode;
              if (!(i.flags & 128) && (typeof c.getDerivedStateFromError == "function" || p !== null && typeof p.componentDidCatch == "function" && (mt === null || !mt.has(p)))) {
                i.flags |= 65536, t &= -t, i.lanes |= t;
                var x = Xu(i, a, t);
                Fs(i, x);
                break e;
              }
          }
          i = i.return;
        } while (i !== null);
      }
      hc(n);
    } catch (k) {
      t = k, Z === n && n !== null && (Z = n = n.return);
      continue;
    }
    break;
  } while (!0);
}
function fc() {
  var e = ll.current;
  return ll.current = rl, e === null ? rl : e;
}
function Vo() {
  (J === 0 || J === 3 || J === 2) && (J = 4), te === null || !(Dt & 268435455) && !(wl & 268435455) || st(te, le);
}
function sl(e, t) {
  var n = M;
  M |= 2;
  var r = fc();
  (te !== e || le !== t) && (Ke = null, Lt(e, t));
  do
    try {
      Wf();
      break;
    } catch (l) {
      dc(e, l);
    }
  while (!0);
  if (_o(), M = n, ll.current = r, Z !== null) throw Error(N(261));
  return te = null, le = 0, J;
}
function Wf() {
  for (; Z !== null; ) pc(Z);
}
function Vf() {
  for (; Z !== null && !pd(); ) pc(Z);
}
function pc(e) {
  var t = gc(e.alternate, e, we);
  e.memoizedProps = e.pendingProps, t === null ? hc(e) : Z = t, Io.current = null;
}
function hc(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (e = t.return, t.flags & 32768) {
      if (n = Df(n, t), n !== null) {
        n.flags &= 32767, Z = n;
        return;
      }
      if (e !== null) e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
      else {
        J = 6, Z = null;
        return;
      }
    } else if (n = Of(n, t, we), n !== null) {
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
function Ct(e, t, n) {
  var r = D, l = Te.transition;
  try {
    Te.transition = null, D = 1, Hf(e, t, n, r);
  } finally {
    Te.transition = l, D = r;
  }
  return null;
}
function Hf(e, t, n, r) {
  do
    ln();
  while (ut !== null);
  if (M & 6) throw Error(N(327));
  n = e.finishedWork;
  var l = e.finishedLanes;
  if (n === null) return null;
  if (e.finishedWork = null, e.finishedLanes = 0, n === e.current) throw Error(N(177));
  e.callbackNode = null, e.callbackPriority = 0;
  var i = n.lanes | n.childLanes;
  if (jd(e, i), e === te && (Z = te = null, le = 0), !(n.subtreeFlags & 2064) && !(n.flags & 2064) || _r || (_r = !0, vc(Wr, function() {
    return ln(), null;
  })), i = (n.flags & 15990) !== 0, n.subtreeFlags & 15990 || i) {
    i = Te.transition, Te.transition = null;
    var o = D;
    D = 1;
    var a = M;
    M |= 4, Io.current = null, If(e, n), ac(n, e), cf(Ei), Hr = !!Ci, Ei = Ci = null, e.current = n, Af(n), hd(), M = a, D = o, Te.transition = i;
  } else e.current = n;
  if (_r && (_r = !1, ut = e, ol = l), i = e.pendingLanes, i === 0 && (mt = null), vd(n.stateNode), ye(e, X()), t !== null) for (r = e.onRecoverableError, n = 0; n < t.length; n++) l = t[n], r(l.value, { componentStack: l.stack, digest: l.digest });
  if (il) throw il = !1, e = Gi, Gi = null, e;
  return ol & 1 && e.tag !== 0 && ln(), i = e.pendingLanes, i & 1 ? e === Yi ? An++ : (An = 0, Yi = e) : An = 0, St(), null;
}
function ln() {
  if (ut !== null) {
    var e = Ya(ol), t = Te.transition, n = D;
    try {
      if (Te.transition = null, D = 16 > e ? 16 : e, ut === null) var r = !1;
      else {
        if (e = ut, ut = null, ol = 0, M & 6) throw Error(N(331));
        var l = M;
        for (M |= 4, z = e.current; z !== null; ) {
          var i = z, o = i.child;
          if (z.flags & 16) {
            var a = i.deletions;
            if (a !== null) {
              for (var u = 0; u < a.length; u++) {
                var d = a[u];
                for (z = d; z !== null; ) {
                  var m = z;
                  switch (m.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Fn(8, m, i);
                  }
                  var g = m.child;
                  if (g !== null) g.return = m, z = g;
                  else for (; z !== null; ) {
                    m = z;
                    var h = m.sibling, y = m.return;
                    if (ic(m), m === d) {
                      z = null;
                      break;
                    }
                    if (h !== null) {
                      h.return = y, z = h;
                      break;
                    }
                    z = y;
                  }
                }
              }
              var S = i.alternate;
              if (S !== null) {
                var j = S.child;
                if (j !== null) {
                  S.child = null;
                  do {
                    var E = j.sibling;
                    j.sibling = null, j = E;
                  } while (j !== null);
                }
              }
              z = i;
            }
          }
          if (i.subtreeFlags & 2064 && o !== null) o.return = i, z = o;
          else e: for (; z !== null; ) {
            if (i = z, i.flags & 2048) switch (i.tag) {
              case 0:
              case 11:
              case 15:
                Fn(9, i, i.return);
            }
            var f = i.sibling;
            if (f !== null) {
              f.return = i.return, z = f;
              break e;
            }
            z = i.return;
          }
        }
        var c = e.current;
        for (z = c; z !== null; ) {
          o = z;
          var p = o.child;
          if (o.subtreeFlags & 2064 && p !== null) p.return = o, z = p;
          else e: for (o = c; z !== null; ) {
            if (a = z, a.flags & 2048) try {
              switch (a.tag) {
                case 0:
                case 11:
                case 15:
                  xl(9, a);
              }
            } catch (k) {
              G(a, a.return, k);
            }
            if (a === o) {
              z = null;
              break e;
            }
            var x = a.sibling;
            if (x !== null) {
              x.return = a.return, z = x;
              break e;
            }
            z = a.return;
          }
        }
        if (M = l, St(), He && typeof He.onPostCommitFiberRoot == "function") try {
          He.onPostCommitFiberRoot(dl, e);
        } catch {
        }
        r = !0;
      }
      return r;
    } finally {
      D = n, Te.transition = t;
    }
  }
  return !1;
}
function la(e, t, n) {
  t = dn(n, t), t = Yu(e, t, 1), e = ht(e, t, 1), t = de(), e !== null && (lr(e, 1, t), ye(e, t));
}
function G(e, t, n) {
  if (e.tag === 3) la(e, e, n);
  else for (; t !== null; ) {
    if (t.tag === 3) {
      la(t, e, n);
      break;
    } else if (t.tag === 1) {
      var r = t.stateNode;
      if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (mt === null || !mt.has(r))) {
        e = dn(n, e), e = Xu(t, e, 1), t = ht(t, e, 1), e = de(), t !== null && (lr(t, 1, e), ye(t, e));
        break;
      }
    }
    t = t.return;
  }
}
function Qf(e, t, n) {
  var r = e.pingCache;
  r !== null && r.delete(t), t = de(), e.pingedLanes |= e.suspendedLanes & n, te === e && (le & n) === n && (J === 4 || J === 3 && (le & 130023424) === le && 500 > X() - Uo ? Lt(e, 0) : Ao |= n), ye(e, t);
}
function mc(e, t) {
  t === 0 && (e.mode & 1 ? (t = mr, mr <<= 1, !(mr & 130023424) && (mr = 4194304)) : t = 1);
  var n = de();
  e = qe(e, t), e !== null && (lr(e, t, n), ye(e, n));
}
function Kf(e) {
  var t = e.memoizedState, n = 0;
  t !== null && (n = t.retryLane), mc(e, n);
}
function Gf(e, t) {
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
  r !== null && r.delete(t), mc(e, n);
}
var gc;
gc = function(e, t, n) {
  if (e !== null) if (e.memoizedProps !== t.pendingProps || ge.current) me = !0;
  else {
    if (!(e.lanes & n) && !(t.flags & 128)) return me = !1, Mf(e, t, n);
    me = !!(e.flags & 131072);
  }
  else me = !1, W && t.flags & 1048576 && wu(t, br, t.index);
  switch (t.lanes = 0, t.tag) {
    case 2:
      var r = t.type;
      Or(e, t), e = t.pendingProps;
      var l = sn(t, ue.current);
      rn(t, n), l = $o(null, t, r, e, l, n);
      var i = Mo();
      return t.flags |= 1, typeof l == "object" && l !== null && typeof l.render == "function" && l.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, ve(r) ? (i = !0, Xr(t)) : i = !1, t.memoizedState = l.state !== null && l.state !== void 0 ? l.state : null, zo(t), l.updater = yl, t.stateNode = l, l._reactInternals = t, Di(t, r, e, n), t = Ai(null, t, r, !0, i, n)) : (t.tag = 0, W && i && ko(t), ce(null, t, l, n), t = t.child), t;
    case 16:
      r = t.elementType;
      e: {
        switch (Or(e, t), e = t.pendingProps, l = r._init, r = l(r._payload), t.type = r, l = t.tag = Xf(r), e = Me(r, e), l) {
          case 0:
            t = Ii(null, t, r, e, n);
            break e;
          case 1:
            t = Ys(null, t, r, e, n);
            break e;
          case 11:
            t = Ks(null, t, r, e, n);
            break e;
          case 14:
            t = Gs(null, t, r, Me(r.type, e), n);
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
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : Me(r, l), Ii(e, t, r, l, n);
    case 1:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : Me(r, l), Ys(e, t, r, l, n);
    case 3:
      e: {
        if (qu(t), e === null) throw Error(N(387));
        r = t.pendingProps, i = t.memoizedState, l = i.element, Cu(e, t), el(t, r, null, n);
        var o = t.memoizedState;
        if (r = o.element, i.isDehydrated) if (i = { element: r, isDehydrated: !1, cache: o.cache, pendingSuspenseBoundaries: o.pendingSuspenseBoundaries, transitions: o.transitions }, t.updateQueue.baseState = i, t.memoizedState = i, t.flags & 256) {
          l = dn(Error(N(423)), t), t = Xs(e, t, r, n, l);
          break e;
        } else if (r !== l) {
          l = dn(Error(N(424)), t), t = Xs(e, t, r, n, l);
          break e;
        } else for (ke = pt(t.stateNode.containerInfo.firstChild), Se = t, W = !0, De = null, n = Nu(t, null, r, n), t.child = n; n; ) n.flags = n.flags & -3 | 4096, n = n.sibling;
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
      return Eu(t), e === null && $i(t), r = t.type, l = t.pendingProps, i = e !== null ? e.memoizedProps : null, o = l.children, zi(r, l) ? o = null : i !== null && zi(r, i) && (t.flags |= 32), Ju(e, t), ce(e, t, o, n), t.child;
    case 6:
      return e === null && $i(t), null;
    case 13:
      return ec(e, t, n);
    case 4:
      return Po(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = un(t, null, r, n) : ce(e, t, r, n), t.child;
    case 11:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : Me(r, l), Ks(e, t, r, l, n);
    case 7:
      return ce(e, t, t.pendingProps, n), t.child;
    case 8:
      return ce(e, t, t.pendingProps.children, n), t.child;
    case 12:
      return ce(e, t, t.pendingProps.children, n), t.child;
    case 10:
      e: {
        if (r = t.type._context, l = t.pendingProps, i = t.memoizedProps, o = l.value, I(Jr, r._currentValue), r._currentValue = o, i !== null) if (Ae(i.value, o)) {
          if (i.children === l.children && !ge.current) {
            t = et(e, t, n);
            break e;
          }
        } else for (i = t.child, i !== null && (i.return = t); i !== null; ) {
          var a = i.dependencies;
          if (a !== null) {
            o = i.child;
            for (var u = a.firstContext; u !== null; ) {
              if (u.context === r) {
                if (i.tag === 1) {
                  u = Ze(-1, n & -n), u.tag = 2;
                  var d = i.updateQueue;
                  if (d !== null) {
                    d = d.shared;
                    var m = d.pending;
                    m === null ? u.next = u : (u.next = m.next, m.next = u), d.pending = u;
                  }
                }
                i.lanes |= n, u = i.alternate, u !== null && (u.lanes |= n), Mi(
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
            if (o = i.return, o === null) throw Error(N(341));
            o.lanes |= n, a = o.alternate, a !== null && (a.lanes |= n), Mi(o, n, t), o = i.sibling;
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
      return r = t.type, l = Me(r, t.pendingProps), l = Me(r.type, l), Gs(e, t, r, l, n);
    case 15:
      return Zu(e, t, t.type, t.pendingProps, n);
    case 17:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : Me(r, l), Or(e, t), t.tag = 1, ve(r) ? (e = !0, Xr(t)) : e = !1, rn(t, n), Gu(t, r, l), Di(t, r, l, n), Ai(null, t, r, !0, e, n);
    case 19:
      return tc(e, t, n);
    case 22:
      return bu(e, t, n);
  }
  throw Error(N(156, t.tag));
};
function vc(e, t) {
  return Ha(e, t);
}
function Yf(e, t, n, r) {
  this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
}
function Pe(e, t, n, r) {
  return new Yf(e, t, n, r);
}
function Ho(e) {
  return e = e.prototype, !(!e || !e.isReactComponent);
}
function Xf(e) {
  if (typeof e == "function") return Ho(e) ? 1 : 0;
  if (e != null) {
    if (e = e.$$typeof, e === ao) return 11;
    if (e === uo) return 14;
  }
  return 2;
}
function vt(e, t) {
  var n = e.alternate;
  return n === null ? (n = Pe(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 14680064, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n;
}
function Ir(e, t, n, r, l, i) {
  var o = 2;
  if (r = e, typeof e == "function") Ho(e) && (o = 1);
  else if (typeof e == "string") o = 5;
  else e: switch (e) {
    case Wt:
      return Rt(n.children, l, i, t);
    case so:
      o = 8, l |= 8;
      break;
    case oi:
      return e = Pe(12, n, t, l | 2), e.elementType = oi, e.lanes = i, e;
    case si:
      return e = Pe(13, n, t, l), e.elementType = si, e.lanes = i, e;
    case ai:
      return e = Pe(19, n, t, l), e.elementType = ai, e.lanes = i, e;
    case Ea:
      return kl(n, l, i, t);
    default:
      if (typeof e == "object" && e !== null) switch (e.$$typeof) {
        case _a:
          o = 10;
          break e;
        case Ca:
          o = 9;
          break e;
        case ao:
          o = 11;
          break e;
        case uo:
          o = 14;
          break e;
        case lt:
          o = 16, r = null;
          break e;
      }
      throw Error(N(130, e == null ? e : typeof e, ""));
  }
  return t = Pe(o, n, t, l), t.elementType = e, t.type = r, t.lanes = i, t;
}
function Rt(e, t, n, r) {
  return e = Pe(7, e, r, t), e.lanes = n, e;
}
function kl(e, t, n, r) {
  return e = Pe(22, e, r, t), e.elementType = Ea, e.lanes = n, e.stateNode = { isHidden: !1 }, e;
}
function ei(e, t, n) {
  return e = Pe(6, e, null, t), e.lanes = n, e;
}
function ti(e, t, n) {
  return t = Pe(4, e.children !== null ? e.children : [], e.key, t), t.lanes = n, t.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }, t;
}
function Zf(e, t, n, r, l) {
  this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = Ol(0), this.expirationTimes = Ol(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Ol(0), this.identifierPrefix = r, this.onRecoverableError = l, this.mutableSourceEagerHydrationData = null;
}
function Qo(e, t, n, r, l, i, o, a, u) {
  return e = new Zf(e, t, n, a, u), t === 1 ? (t = 1, i === !0 && (t |= 8)) : t = 0, i = Pe(3, null, null, t), e.current = i, i.stateNode = e, i.memoizedState = { element: r, isDehydrated: n, cache: null, transitions: null, pendingSuspenseBoundaries: null }, zo(i), e;
}
function bf(e, t, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return { $$typeof: Bt, key: r == null ? null : "" + r, children: e, containerInfo: t, implementation: n };
}
function yc(e) {
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
    if (ve(n)) return yu(e, n, t);
  }
  return t;
}
function xc(e, t, n, r, l, i, o, a, u) {
  return e = Qo(n, r, !0, e, l, i, o, a, u), e.context = yc(null), n = e.current, r = de(), l = gt(n), i = Ze(r, l), i.callback = t ?? null, ht(n, i, l), e.current.lanes = l, lr(e, l, r), ye(e, r), e;
}
function Sl(e, t, n, r) {
  var l = t.current, i = de(), o = gt(l);
  return n = yc(n), t.context === null ? t.context = n : t.pendingContext = n, t = Ze(i, o), t.payload = { element: e }, r = r === void 0 ? null : r, r !== null && (t.callback = r), e = ht(l, t, o), e !== null && (Ie(e, l, o, i), Rr(e, l, o)), o;
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
function ia(e, t) {
  if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t;
  }
}
function Ko(e, t) {
  ia(e, t), (e = e.alternate) && ia(e, t);
}
function Jf() {
  return null;
}
var wc = typeof reportError == "function" ? reportError : function(e) {
  console.error(e);
};
function Go(e) {
  this._internalRoot = e;
}
jl.prototype.render = Go.prototype.render = function(e) {
  var t = this._internalRoot;
  if (t === null) throw Error(N(409));
  Sl(e, t, null, null);
};
jl.prototype.unmount = Go.prototype.unmount = function() {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    Ft(function() {
      Sl(null, e, null, null);
    }), t[Je] = null;
  }
};
function jl(e) {
  this._internalRoot = e;
}
jl.prototype.unstable_scheduleHydration = function(e) {
  if (e) {
    var t = ba();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < ot.length && t !== 0 && t < ot[n].priority; n++) ;
    ot.splice(n, 0, e), n === 0 && qa(e);
  }
};
function Yo(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
}
function Nl(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "));
}
function oa() {
}
function qf(e, t, n, r, l) {
  if (l) {
    if (typeof r == "function") {
      var i = r;
      r = function() {
        var d = al(o);
        i.call(d);
      };
    }
    var o = xc(t, r, e, 0, null, !1, !1, "", oa);
    return e._reactRootContainer = o, e[Je] = o.current, Yn(e.nodeType === 8 ? e.parentNode : e), Ft(), o;
  }
  for (; l = e.lastChild; ) e.removeChild(l);
  if (typeof r == "function") {
    var a = r;
    r = function() {
      var d = al(u);
      a.call(d);
    };
  }
  var u = Qo(e, 0, !1, null, null, !1, !1, "", oa);
  return e._reactRootContainer = u, e[Je] = u.current, Yn(e.nodeType === 8 ? e.parentNode : e), Ft(function() {
    Sl(t, u, n, r);
  }), u;
}
function _l(e, t, n, r, l) {
  var i = n._reactRootContainer;
  if (i) {
    var o = i;
    if (typeof l == "function") {
      var a = l;
      l = function() {
        var u = al(o);
        a.call(u);
      };
    }
    Sl(t, o, e, l);
  } else o = qf(n, t, e, l, r);
  return al(o);
}
Xa = function(e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = Pn(t.pendingLanes);
        n !== 0 && (po(t, n | 1), ye(t, X()), !(M & 6) && (fn = X() + 500, St()));
      }
      break;
    case 13:
      Ft(function() {
        var r = qe(e, 1);
        if (r !== null) {
          var l = de();
          Ie(r, e, 1, l);
        }
      }), Ko(e, 1);
  }
};
ho = function(e) {
  if (e.tag === 13) {
    var t = qe(e, 134217728);
    if (t !== null) {
      var n = de();
      Ie(t, e, 134217728, n);
    }
    Ko(e, 134217728);
  }
};
Za = function(e) {
  if (e.tag === 13) {
    var t = gt(e), n = qe(e, t);
    if (n !== null) {
      var r = de();
      Ie(n, e, t, r);
    }
    Ko(e, t);
  }
};
ba = function() {
  return D;
};
Ja = function(e, t) {
  var n = D;
  try {
    return D = e, t();
  } finally {
    D = n;
  }
};
yi = function(e, t, n) {
  switch (t) {
    case "input":
      if (di(e, n), t = n.name, n.type === "radio" && t != null) {
        for (n = e; n.parentNode; ) n = n.parentNode;
        for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < n.length; t++) {
          var r = n[t];
          if (r !== e && r.form === e.form) {
            var l = ml(r);
            if (!l) throw Error(N(90));
            Pa(r), di(r, l);
          }
        }
      }
      break;
    case "textarea":
      La(e, n);
      break;
    case "select":
      t = n.value, t != null && qt(e, !!n.multiple, t, !1);
  }
};
Ia = Bo;
Aa = Ft;
var ep = { usingClientEntryPoint: !1, Events: [or, Kt, ml, Da, Fa, Bo] }, Cn = { findFiberByHostInstance: Et, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, tp = { bundleType: Cn.bundleType, version: Cn.version, rendererPackageName: Cn.rendererPackageName, rendererConfig: Cn.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: tt.ReactCurrentDispatcher, findHostInstanceByFiber: function(e) {
  return e = Wa(e), e === null ? null : e.stateNode;
}, findFiberByHostInstance: Cn.findFiberByHostInstance || Jf, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var Cr = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!Cr.isDisabled && Cr.supportsFiber) try {
    dl = Cr.inject(tp), He = Cr;
  } catch {
  }
}
_e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ep;
_e.createPortal = function(e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!Yo(t)) throw Error(N(200));
  return bf(e, t, null, n);
};
_e.createRoot = function(e, t) {
  if (!Yo(e)) throw Error(N(299));
  var n = !1, r = "", l = wc;
  return t != null && (t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onRecoverableError !== void 0 && (l = t.onRecoverableError)), t = Qo(e, 1, !1, null, null, n, !1, r, l), e[Je] = t.current, Yn(e.nodeType === 8 ? e.parentNode : e), new Go(t);
};
_e.findDOMNode = function(e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function" ? Error(N(188)) : (e = Object.keys(e).join(","), Error(N(268, e)));
  return e = Wa(t), e = e === null ? null : e.stateNode, e;
};
_e.flushSync = function(e) {
  return Ft(e);
};
_e.hydrate = function(e, t, n) {
  if (!Nl(t)) throw Error(N(200));
  return _l(null, e, t, !0, n);
};
_e.hydrateRoot = function(e, t, n) {
  if (!Yo(e)) throw Error(N(405));
  var r = n != null && n.hydratedSources || null, l = !1, i = "", o = wc;
  if (n != null && (n.unstable_strictMode === !0 && (l = !0), n.identifierPrefix !== void 0 && (i = n.identifierPrefix), n.onRecoverableError !== void 0 && (o = n.onRecoverableError)), t = xc(t, null, e, 1, n ?? null, l, !1, i, o), e[Je] = t.current, Yn(e), r) for (e = 0; e < r.length; e++) n = r[e], l = n._getVersion, l = l(n._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [n, l] : t.mutableSourceEagerHydrationData.push(
    n,
    l
  );
  return new jl(t);
};
_e.render = function(e, t, n) {
  if (!Nl(t)) throw Error(N(200));
  return _l(null, e, t, !1, n);
};
_e.unmountComponentAtNode = function(e) {
  if (!Nl(e)) throw Error(N(40));
  return e._reactRootContainer ? (Ft(function() {
    _l(null, null, e, !1, function() {
      e._reactRootContainer = null, e[Je] = null;
    });
  }), !0) : !1;
};
_e.unstable_batchedUpdates = Bo;
_e.unstable_renderSubtreeIntoContainer = function(e, t, n, r) {
  if (!Nl(n)) throw Error(N(200));
  if (e == null || e._reactInternals === void 0) throw Error(N(38));
  return _l(e, t, n, !1, r);
};
_e.version = "18.3.1-next-f1338f8080-20240426";
function kc() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(kc);
    } catch (e) {
      console.error(e);
    }
}
kc(), ka.exports = _e;
var np = ka.exports, Sc, sa = np;
Sc = sa.createRoot, sa.hydrateRoot;
function U({ name: e, className: t }) {
  return /* @__PURE__ */ s.jsx("span", { className: `icon-wrap ${t ?? ""}`, "aria-hidden": "true", children: /* @__PURE__ */ s.jsx("ha-icon", { icon: `mdi:${e}` }) });
}
const Tt = "No area", rp = {
  RDM002: "Hue Tap Dial",
  RWL020: "Hue Dimmer switch",
  RWL021: "Hue Dimmer switch",
  RWL022: "Hue Dimmer switch",
  ROM001: "Hue Smart button"
}, Xo = (e) => e.model === "RDM002", bi = (e) => Xo(e) ? { press: "one of the dial's four buttons", rest: "Turn to dim · hold a button for off" } : { press: "the Hue button", rest: "Power button turns on/off · up/down dim" }, lp = (e) => e.model && rp[e.model] || [e.manufacturer, e.model].filter(Boolean).join(" ");
function Zo(e, t) {
  const n = e.dial, r = n ? t.find((o) => o.id === n.group_id) : void 0, l = !!n && e.bound.some((o) => o.group_id === n.group_id), i = !!n && !!r && n.buttons.every(([, o]) => r.scenes.some((a) => a.id === o));
  return { found: !!n, group: r, bound: l, saved: i, done: [!!n, !!r, l, i].filter(Boolean).length };
}
function Cl(e, t) {
  if (e.dial_supported)
    return Zo(e, t).done === 4 ? { state: "ok", label: "Set up" } : !e.dial && !e.bound.length ? { state: "idle", label: "Not set up" } : { state: "attention", label: "Needs set-up" };
  const n = e.bound.length;
  return n ? { state: "ok", label: n > 1 ? `Bound to ${n}` : "Bound" } : { state: "idle", label: "Not bound" };
}
function ip(e, t, n) {
  const r = /* @__PURE__ */ new Map(), l = (i) => {
    let o = r.get(i);
    return o || (o = { name: i, icon: n[i] || "mdi:home-outline", groups: [], remotes: [], attention: [] }, r.set(i, o)), o;
  };
  for (const i of e) l(i.areas[0] ?? Tt).groups.push(i);
  for (const i of t) {
    const o = l(i.area ?? Tt);
    o.remotes.push(i), Cl(i, e).state === "attention" && o.attention.push(i);
  }
  return [...r.values()].sort(
    (i, o) => +(o.attention.length > 0) - +(i.attention.length > 0) || +(i.name === Tt) - +(o.name === Tt) || i.name.localeCompare(o.name)
  );
}
const bo = (e, t) => {
  var n;
  return !!t && ((n = e.states[t]) == null ? void 0 : n.state) === "on";
}, jc = (e, t) => t.reduce((n, r) => n + r.members.filter((l) => bo(e, l.entity_id)).length, 0), Nc = (e) => e.reduce((t, n) => t + n.members.length, 0);
function _c(e) {
  if (!(e != null && e.length)) return "var(--hrs-swatch-unknown)";
  const t = e.filter((l) => !!l);
  if (!t.length) return "linear-gradient(135deg, #2b2f3a, #12141a)";
  const n = ([l, i, o, a]) => {
    const u = 0.35 + 0.65 * (a / 255);
    return `rgb(${Math.round(l * u)}, ${Math.round(i * u)}, ${Math.round(o * u)})`;
  }, r = [...new Set(t.map(n))].slice(0, 4);
  return r.length === 1 ? `linear-gradient(135deg, color-mix(in srgb, ${r[0]} 70%, white), ${r[0]})` : `linear-gradient(135deg, ${r.join(", ")})`;
}
function aa(e) {
  if (e == null) return null;
  const t = typeof e == "number" ? e * 1e3 : Date.parse(e);
  if (Number.isNaN(t)) return null;
  const n = Math.max(0, (Date.now() - t) / 1e3);
  return n < 60 ? "just now" : n < 3600 ? `${Math.round(n / 60)} min ago` : n < 86400 ? `${Math.round(n / 3600)} h ago` : n < 172800 ? "yesterday" : `${Math.round(n / 86400)} days ago`;
}
function Jo({ scene: e, badge: t, disabled: n, onRecall: r }) {
  return /* @__PURE__ */ s.jsxs("button", { className: "sw", disabled: n, onClick: r, title: `Recall ${e.name}`, children: [
    /* @__PURE__ */ s.jsx("span", { className: "swc", style: { background: _c(e.colors) }, children: t && /* @__PURE__ */ s.jsx("span", { className: "badge", children: t }) }),
    /* @__PURE__ */ s.jsx("span", { className: "swn", children: e.name })
  ] });
}
function Ji({ scene: e, badge: t, total: n, missing: r, busy: l, onRecall: i, onOverwrite: o, onRename: a, onDelete: u }) {
  const [d, m] = O.useState(!1), [g, h] = O.useState(!1), [y, S] = O.useState(e.name), j = e.members.length;
  return /* @__PURE__ */ s.jsxs("div", { className: "scard", children: [
    /* @__PURE__ */ s.jsxs("button", { className: "scard-sw", style: { background: _c(e.colors) }, disabled: l, onClick: i, title: `Recall ${e.name}`, children: [
      t && /* @__PURE__ */ s.jsx("span", { className: "badge", children: t }),
      /* @__PURE__ */ s.jsx("span", { className: "play", children: /* @__PURE__ */ s.jsx(U, { name: "play" }) })
    ] }),
    g ? /* @__PURE__ */ s.jsxs(
      "form",
      {
        className: "scard-foot",
        onSubmit: (E) => {
          E.preventDefault(), h(!1), y.trim() && y !== e.name && (a == null || a(y));
        },
        children: [
          /* @__PURE__ */ s.jsx("input", { type: "text", value: y, maxLength: 40, autoFocus: !0, onChange: (E) => S(E.target.value), "aria-label": "Scene name" }),
          /* @__PURE__ */ s.jsx("button", { type: "submit", className: "icon-btn", "aria-label": "Save name", children: /* @__PURE__ */ s.jsx(U, { name: "check" }) })
        ]
      }
    ) : /* @__PURE__ */ s.jsxs("div", { className: "scard-foot", children: [
      /* @__PURE__ */ s.jsx("span", { className: "sname", title: e.name, children: e.name }),
      j < n && /* @__PURE__ */ s.jsxs("span", { className: "chip warn", title: `Missing on: ${r}`, children: [
        j,
        " of ",
        n
      ] }),
      /* @__PURE__ */ s.jsx("button", { className: "icon-btn", disabled: l, onClick: () => m(!d), "aria-label": `More for ${e.name}`, children: /* @__PURE__ */ s.jsx(U, { name: "dots-vertical" }) }),
      d && /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
        /* @__PURE__ */ s.jsx("div", { className: "menu-backdrop", onClick: () => m(!1) }),
        /* @__PURE__ */ s.jsxs("div", { className: "menu", role: "menu", children: [
          /* @__PURE__ */ s.jsxs("button", { role: "menuitem", onClick: () => {
            m(!1), o();
          }, children: [
            /* @__PURE__ */ s.jsx(U, { name: "content-save-edit-outline" }),
            " Save current state here"
          ] }),
          a && /* @__PURE__ */ s.jsxs("button", { role: "menuitem", onClick: () => {
            m(!1), S(e.name), h(!0);
          }, children: [
            /* @__PURE__ */ s.jsx(U, { name: "pencil-outline" }),
            " Rename"
          ] }),
          u && /* @__PURE__ */ s.jsxs("button", { role: "menuitem", className: "danger", onClick: () => {
            m(!1), u();
          }, children: [
            /* @__PURE__ */ s.jsx(U, { name: "delete-outline" }),
            " Delete"
          ] }),
          /* @__PURE__ */ s.jsxs("div", { className: "menu-note", children: [
            "Scene ",
            e.id
          ] })
        ] })
      ] })
    ] })
  ] });
}
function qi({ badge: e, placeholder: t, busy: n, onSave: r }) {
  const [l, i] = O.useState(!1), [o, a] = O.useState("");
  return l ? /* @__PURE__ */ s.jsxs(
    "form",
    {
      className: "newcard open",
      onSubmit: (u) => {
        u.preventDefault(), o.trim() && (r(o), a(""), i(!1));
      },
      children: [
        e && /* @__PURE__ */ s.jsx("span", { className: "newcard-dots", children: e }),
        /* @__PURE__ */ s.jsx("input", { type: "text", placeholder: t, value: o, maxLength: 40, autoFocus: !0, onChange: (u) => a(u.target.value), "aria-label": "Scene name" }),
        /* @__PURE__ */ s.jsxs("div", { className: "row-end", children: [
          /* @__PURE__ */ s.jsx("button", { type: "button", className: "ghost", onClick: () => i(!1), children: "Cancel" }),
          /* @__PURE__ */ s.jsx("button", { type: "submit", className: "primary", disabled: n || !o.trim(), children: "Save" })
        ] })
      ]
    }
  ) : /* @__PURE__ */ s.jsxs("button", { className: "newcard", disabled: n, onClick: () => i(!0), children: [
    e ? /* @__PURE__ */ s.jsx("span", { className: "newcard-dots", children: e }) : /* @__PURE__ */ s.jsx(U, { name: "plus" }),
    /* @__PURE__ */ s.jsx("strong", { children: "Save current state" }),
    /* @__PURE__ */ s.jsx("span", { className: "muted small", children: e ? "for this button" : "as a new scene" })
  ] });
}
const ni = { 6: "On/off", 8: "Dimming", 5: "Scenes" }, Cc = (e) => String((e == null ? void 0 : e.message) ?? e), El = (e) => `0x${e.toString(16).padStart(4, "0").toUpperCase()}`, pn = (e) => /^\d/.test(e) ? "●".repeat(parseInt(e, 10)) : e.split(" ").pop(), je = (e, t) => `${e} ${t}${e === 1 ? "" : "s"}`;
function zl() {
  const [e, t] = O.useState(!1), [n, r] = O.useState(null);
  return { busy: e, result: n, act: async (i, o = "Talking to the lights…") => {
    t(o), r(null);
    try {
      const a = await i();
      a && r({ kind: a.includes("didn't") ? "error" : "ok", text: a });
    } catch (a) {
      r({ kind: "error", text: Cc(a) });
    } finally {
      t(!1);
    }
  }, clear: () => r(null) };
}
function op({ getHass: e, group: t, onChanged: n }) {
  const { busy: r, result: l, act: i } = zl(), o = e(), a = Object.fromEntries(t.members.map((v) => [v.key, v.name])), u = t.members.filter((v) => v.scenes), d = (v) => v.map((w) => a[w] ?? w).join(", "), m = (v) => d(u.map((w) => w.key).filter((w) => !v.includes(w))), g = t.members.filter((v) => bo(o, v.entity_id)).length, h = t.dials[0], y = (h == null ? void 0 : h.buttons) ?? [], S = new Set(t.dials.flatMap((v) => v.buttons.map((w) => w.scene_id))), j = t.scenes.filter((v) => !S.has(v.id)), E = (v, w) => i(async () => {
    const _ = await e().callWS({ group_id: t.id, ...v });
    return n(), w(_);
  }), f = (v) => (w) => {
    const _ = Object.keys(w.failed);
    return _.length ? `${v} on ${w.ok.length} of ${w.ok.length + _.length} lights. These didn't answer: ${d(_)}` : `${v} on ${je(w.ok.length, "light")}`;
  }, c = (v, w) => E({ type: "hue_remote_scenes/recall", scene_id: v }, () => `Recalled ${w}`), p = (v, w) => confirm(`Save how the lights are now as "${w}"?`) && E({ type: "hue_remote_scenes/store", scene_id: v }, f("Saved")), x = (v, w) => E({ type: "hue_remote_scenes/rename", scene_id: v, name: w }, () => "Renamed"), k = (v, w) => confirm(`Delete "${w}" from the lights?`) && E(
    { type: "hue_remote_scenes/delete", scene_id: v },
    (_) => Object.keys(_.failed).length ? `Deleted, but some lights didn't answer and may still have it: ${d(Object.keys(_.failed))}` : `Deleted ${w}`
  );
  return /* @__PURE__ */ s.jsxs("section", { className: "card", children: [
    /* @__PURE__ */ s.jsxs("div", { className: "card-head", children: [
      /* @__PURE__ */ s.jsxs("div", { className: "grow", children: [
        /* @__PURE__ */ s.jsx("h3", { className: "title", children: t.name }),
        /* @__PURE__ */ s.jsxs("div", { className: "muted small", children: [
          "Group ",
          El(t.id),
          " · ",
          u.length ? u.map((v) => v.name).join(", ") : "no lights that can store scenes",
          t.members.length > u.length && ` (+${t.members.length - u.length} without scenes)`,
          g > 0 && ` · ${g} on`
        ] })
      ] }),
      /* @__PURE__ */ s.jsxs(
        "button",
        {
          className: "ghost",
          disabled: !!r || !u.length,
          title: "Ask the lights which scenes they already have, e.g. ones made in Zigbee2MQTT",
          onClick: () => E(
            { type: "hue_remote_scenes/import" },
            (v) => v.added.length ? `Found ${je(v.added.length, "new scene")}. Rename them from their ⋮ menu.` : v.found.length ? "No new scenes: the ones on the lights are all here." : "The lights have no scenes for this group yet."
          ),
          children: [
            /* @__PURE__ */ s.jsx(U, { name: "database-import-outline" }),
            " Import from lights"
          ]
        }
      )
    ] }),
    u.length > 0 && /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
      y.length > 0 && /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
        /* @__PURE__ */ s.jsxs("p", { className: "label", children: [
          t.dials.map((v) => v.name).join(", "),
          " buttons"
        ] }),
        /* @__PURE__ */ s.jsx("div", { className: "cards4", children: y.map((v) => {
          const w = t.scenes.find((_) => _.id === v.scene_id);
          return w ? /* @__PURE__ */ s.jsx(
            Ji,
            {
              scene: w,
              badge: pn(v.label),
              total: u.length,
              missing: m(w.members),
              busy: !!r,
              onRecall: () => c(w.id, w.name),
              onOverwrite: () => p(w.id, w.name),
              onRename: (_) => x(w.id, _)
            },
            v.scene_id
          ) : /* @__PURE__ */ s.jsx(
            qi,
            {
              badge: pn(v.label),
              placeholder: `Scene for ${v.label}`,
              busy: !!r,
              onSave: (_) => E({ type: "hue_remote_scenes/store", scene_id: v.scene_id, name: _ }, f("Saved"))
            },
            v.scene_id
          );
        }) }),
        y.some((v) => /^\d/.test(v.label)) && /* @__PURE__ */ s.jsx("p", { className: "muted small tight", children: "Hold any button to turn the lights off. Turn the dial to dim." }),
        /* @__PURE__ */ s.jsx("p", { className: "label", children: "Other scenes" })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "cards4", children: [
        j.map((v) => /* @__PURE__ */ s.jsx(
          Ji,
          {
            scene: v,
            total: u.length,
            missing: m(v.members),
            busy: !!r,
            onRecall: () => c(v.id, v.name),
            onOverwrite: () => p(v.id, v.name),
            onRename: (w) => x(v.id, w),
            onDelete: () => k(v.id, v.name)
          },
          v.id
        )),
        /* @__PURE__ */ s.jsx(
          qi,
          {
            placeholder: "New scene name",
            busy: !!r,
            onSave: (v) => E({ type: "hue_remote_scenes/store", name: v }, f("Saved"))
          }
        )
      ] })
    ] }),
    r && /* @__PURE__ */ s.jsx("div", { className: "status busy", children: r }),
    l && /* @__PURE__ */ s.jsx("div", { className: `status ${l.kind}`, children: l.text })
  ] });
}
function sp({ getHass: e, remote: t, groups: n, busy: r, act: l, onChanged: i }) {
  var p, x;
  const o = t.cycle, a = t.cycle_trigger, [u, d] = O.useState(!1), [m, g] = O.useState((o == null ? void 0 : o.group_id) ?? ((p = n.find((k) => k.scenes.length)) == null ? void 0 : p.id) ?? ((x = n[0]) == null ? void 0 : x.id) ?? 0), [h, y] = O.useState((o == null ? void 0 : o.scene_ids) ?? []), S = n.find((k) => k.id === m), j = o ? n.find((k) => k.id === o.group_id) : void 0, E = (k) => y((v) => v.includes(k) ? v.filter((w) => w !== k) : [...v, k]), f = (k) => l(async () => (await e().callWS(
    k ? { type: "hue_remote_scenes/set_cycle", ieee: t.ieee } : { type: "hue_remote_scenes/set_cycle", ieee: t.ieee, group_id: m, scene_ids: h }
  ), d(!1), i(), k ? "Stopped cycling scenes." : `${a.label} now cycles ${je(h.length, "scene")}.`), "Saving…"), c = (k, v, w) => l(async () => (await e().callWS({ type: "hue_remote_scenes/recall", group_id: k, scene_id: v }), `Recalled ${w}`));
  return /* @__PURE__ */ s.jsxs("div", { className: "stack-sm", children: [
    /* @__PURE__ */ s.jsxs("div", { className: "row-between", children: [
      /* @__PURE__ */ s.jsx("p", { className: "label", children: "Scene cycle" }),
      /* @__PURE__ */ s.jsx("span", { className: "chip", title: "The cycle runs in Home Assistant. Bound on/off and dimming work without it.", children: "Needs Home Assistant" })
    ] }),
    !u && o && j && /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
      /* @__PURE__ */ s.jsx("div", { className: "sws", children: o.scene_ids.map((k, v) => {
        const w = j.scenes.find((_) => _.id === k);
        return w ? /* @__PURE__ */ s.jsx(Jo, { scene: w, badge: String(v + 1), disabled: r, onRecall: () => c(j.id, k, w.name) }, k) : null;
      }) }),
      /* @__PURE__ */ s.jsxs("div", { className: "ctl small", children: [
        /* @__PURE__ */ s.jsx(U, { name: "sync" }),
        /* @__PURE__ */ s.jsxs("span", { className: "grow", children: [
          a.label,
          " recalls the next scene; after a pause it starts again"
        ] }),
        /* @__PURE__ */ s.jsx("span", { className: "muted", children: j.name })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "row-start", children: [
        /* @__PURE__ */ s.jsx("button", { className: "ghost", disabled: r, onClick: () => d(!0), children: "Change" }),
        /* @__PURE__ */ s.jsx("button", { className: "ghost", disabled: r, onClick: () => f(!0), children: "Stop" })
      ] })
    ] }),
    !u && !o && /* @__PURE__ */ s.jsxs("div", { className: "row-start", children: [
      /* @__PURE__ */ s.jsxs("p", { className: "muted small grow tight0", children: [
        "It can't recall scenes itself, but while Home Assistant runs, ",
        /* @__PURE__ */ s.jsx("strong", { children: a.label.toLowerCase() }),
        " can step through scenes you pick."
      ] }),
      /* @__PURE__ */ s.jsx("button", { disabled: r || !n.length, onClick: () => d(!0), children: "Choose scenes" })
    ] }),
    u && /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
      /* @__PURE__ */ s.jsx(
        "select",
        {
          value: m,
          disabled: !n.length,
          onChange: (k) => {
            g(+k.target.value), y([]);
          },
          "aria-label": "Group to cycle",
          children: n.map((k) => /* @__PURE__ */ s.jsxs("option", { value: k.id, children: [
            k.name,
            k.areas[0] ? ` (${k.areas[0]})` : ""
          ] }, k.id))
        }
      ),
      /* @__PURE__ */ s.jsxs("div", { className: "row-start wrap", children: [
        ((S == null ? void 0 : S.scenes) ?? []).map((k) => /* @__PURE__ */ s.jsxs("button", { className: `fchip ${h.includes(k.id) ? "on" : ""}`, onClick: () => E(k.id), children: [
          h.includes(k.id) && /* @__PURE__ */ s.jsx("span", { children: h.indexOf(k.id) + 1 }),
          " ",
          k.name
        ] }, k.id)),
        S && !S.scenes.length && /* @__PURE__ */ s.jsx("span", { className: "muted small", children: "Save some scenes in this group first." })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "row-end", children: [
        /* @__PURE__ */ s.jsx("button", { className: "ghost", disabled: r, onClick: () => d(!1), children: "Cancel" }),
        /* @__PURE__ */ s.jsx("button", { className: "primary", disabled: r || !h.length, onClick: () => f(!1), children: "Save cycle" })
      ] })
    ] })
  ] });
}
const ap = ["Find its group", "Choose lights", "Bind", "Save button scenes"], ul = (e) => Xo(e) ? "mdi:knob" : e.endpoints.some((t) => t.clusters.includes(8)) ? "mdi:remote" : "mdi:gesture-tap-button";
function Ec({ getHass: e, remote: t, groups: n, compact: r, onSetup: l, onChanged: i }) {
  var nt, vn;
  const { busy: o, result: a, act: u } = zl(), [d, m] = O.useState(!1), [g, h] = O.useState(t.endpoints[0].id), [y, S] = O.useState(((nt = n[0]) == null ? void 0 : nt.id) ?? 0), j = e(), E = Cl(t, n), f = Zo(t, n), c = t.dial_supported && f.done === 4, p = t.endpoints.find((T) => T.id === g) ?? t.endpoints[0], x = (T) => n.find((F) => F.id === T), k = (T) => {
    var F;
    return ((F = x(T)) == null ? void 0 : F.name) ?? `Group ${El(T)}`;
  }, v = t.battery_entity ? (vn = j.states[t.battery_entity]) == null ? void 0 : vn.state : void 0, w = E.state === "idle" && !t.dial_supported, _ = t.bound.filter((T) => {
    var F;
    return !(c && T.group_id === ((F = t.dial) == null ? void 0 : F.group_id));
  }), V = () => u(async () => {
    const T = await e().callWS({ type: "hue_remote_scenes/bindings", ieee: t.ieee });
    i();
    const F = new Set(T.bindings.map((ne) => ne.group_id)).size;
    return F ? `Bound to ${F === 1 ? "1 group" : `${F} groups`}` : "Not bound to any group";
  }, "Waiting for the remote… press one of its buttons."), R = (T) => u(async () => {
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
    return ne.length === Object.keys(F.results).length ? "The remote didn't answer. Press a button on it and try again." : ne.length ? `${C} ${k(y)}, but these didn't take: ${ne.map(([P, L]) => `${ni[+P] ?? P} (${L})`).join(", ")}` : (m(!1), `${C} ${k(y)}`);
  }, "Waiting for the remote… press one of its buttons."), xe = (T, F, ne) => u(async () => (await e().callWS({ type: "hue_remote_scenes/recall", group_id: T, scene_id: F }), `Recalled ${ne}`)), Ue = f.group;
  return /* @__PURE__ */ s.jsxs("section", { className: `card remote ${E.state === "attention" ? "attn" : ""} ${E.state === "idle" ? "idle" : ""}`, children: [
    /* @__PURE__ */ s.jsxs("div", { className: "card-head", children: [
      /* @__PURE__ */ s.jsx("span", { className: "ricon", children: /* @__PURE__ */ s.jsx("ha-icon", { icon: ul(t) }) }),
      /* @__PURE__ */ s.jsxs("div", { className: "grow", children: [
        /* @__PURE__ */ s.jsx("h3", { className: "title", children: t.name }),
        /* @__PURE__ */ s.jsx("div", { className: "muted small", children: [r ? null : t.area ?? "No area", lp(t)].filter(Boolean).join(" · ") })
      ] }),
      /* @__PURE__ */ s.jsx("span", { className: `chip ${E.state === "ok" ? "ok" : E.state === "attention" ? "warn" : ""}`, children: E.label })
    ] }),
    t.dial_supported && !c && (E.state === "attention" || r) && /* @__PURE__ */ s.jsxs("div", { className: "progress-block", children: [
      /* @__PURE__ */ s.jsxs("div", { className: "row-between small", children: [
        /* @__PURE__ */ s.jsxs("strong", { children: [
          "Scene buttons: step ",
          Math.min(f.done + 1, 4),
          " of 4"
        ] }),
        /* @__PURE__ */ s.jsx("span", { className: "muted", children: ap[Math.min(f.done, 3)] })
      ] }),
      /* @__PURE__ */ s.jsx("div", { className: "prog", children: /* @__PURE__ */ s.jsx("span", { style: { width: `${Math.max(6, f.done / 4 * 100)}%` } }) })
    ] }),
    c && Ue && t.dial && /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
      /* @__PURE__ */ s.jsx("p", { className: "label", children: "Buttons" }),
      /* @__PURE__ */ s.jsx("div", { className: "sws", children: t.dial.buttons.map(([T, F]) => {
        const ne = Ue.scenes.find((C) => C.id === F);
        return /* @__PURE__ */ s.jsx(Jo, { scene: ne, badge: pn(T), disabled: !!o, onRecall: () => xe(Ue.id, F, ne.name) }, F);
      }) }),
      /* @__PURE__ */ s.jsxs("div", { className: "ctl small", children: [
        /* @__PURE__ */ s.jsx(U, { name: Xo(t) ? "rotate-right" : "brightness-6" }),
        /* @__PURE__ */ s.jsx("span", { className: "grow", children: bi(t).rest }),
        /* @__PURE__ */ s.jsx("span", { className: "muted", children: Ue.name })
      ] })
    ] }),
    _.length > 0 && /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
      /* @__PURE__ */ s.jsx("p", { className: "label", children: c ? "Also controls" : "Controls" }),
      /* @__PURE__ */ s.jsx("div", { className: "stack-sm", children: _.map((T) => {
        var F;
        return /* @__PURE__ */ s.jsxs("div", { className: "ctl small", children: [
          /* @__PURE__ */ s.jsx(U, { name: "lightbulb-group-outline" }),
          /* @__PURE__ */ s.jsxs("span", { className: "grow", children: [
            /* @__PURE__ */ s.jsx("strong", { children: k(T.group_id) }),
            ((F = x(T.group_id)) == null ? void 0 : F.areas[0]) && /* @__PURE__ */ s.jsxs("span", { className: "muted", children: [
              " ",
              x(T.group_id).areas[0]
            ] })
          ] }),
          /* @__PURE__ */ s.jsx("span", { className: "muted", children: T.clusters.map((ne) => ni[ne] ?? ne).join(" · ") })
        ] }, T.group_id);
      }) })
    ] }),
    t.cycle_trigger && /* @__PURE__ */ s.jsx(sp, { getHass: e, remote: t, groups: n, busy: !!o, act: u, onChanged: i }),
    E.state === "idle" && !r && !t.cycle_trigger && /* @__PURE__ */ s.jsx("p", { className: "muted small tight", children: "Not controlling anything yet." }),
    (d || w) && /* @__PURE__ */ s.jsxs("div", { className: "bind-row", children: [
      t.endpoints.length > 1 && /* @__PURE__ */ s.jsx("select", { value: p.id, onChange: (T) => h(+T.target.value), "aria-label": "Button set", children: t.endpoints.map((T) => /* @__PURE__ */ s.jsxs("option", { value: T.id, children: [
        "Endpoint ",
        T.id
      ] }, T.id)) }),
      /* @__PURE__ */ s.jsx("select", { value: y, disabled: !n.length, onChange: (T) => S(+T.target.value), "aria-label": "Group", children: n.map((T) => /* @__PURE__ */ s.jsxs("option", { value: T.id, children: [
        T.name,
        T.areas[0] ? ` (${T.areas[0]})` : ""
      ] }, T.id)) }),
      /* @__PURE__ */ s.jsx("button", { className: "primary", disabled: !!o || !n.length, onClick: () => R(!1), children: "Bind" }),
      /* @__PURE__ */ s.jsx("button", { disabled: !!o || !n.length, onClick: () => R(!0), children: "Unbind" }),
      /* @__PURE__ */ s.jsxs("span", { className: "muted small", children: [
        "Sends ",
        p.clusters.map((T) => ni[T] ?? T).join(", ")
      ] })
    ] }),
    /* @__PURE__ */ s.jsxs("div", { className: "foot", children: [
      !r && v != null && v !== "unavailable" && v !== "unknown" && /* @__PURE__ */ s.jsxs("span", { className: "chip", children: [
        /* @__PURE__ */ s.jsx(U, { name: "battery-outline" }),
        Math.round(+v),
        "%"
      ] }),
      /* @__PURE__ */ s.jsx("span", { className: "muted small grow", children: t.checked ? `Checked ${aa(t.checked)}` : r ? "" : t.last_seen ? `Seen ${aa(t.last_seen)}` : "Not checked yet" }),
      !(t.dial_supported && !c) && /* @__PURE__ */ s.jsx("button", { className: "ghost", disabled: !!o, onClick: V, children: "Check bindings" }),
      !w && /* @__PURE__ */ s.jsx("button", { className: "ghost", disabled: !!o, onClick: () => m(!d), children: d ? "Close" : "Bind to…" }),
      t.dial_supported && !c && /* @__PURE__ */ s.jsx("button", { className: "primary", disabled: !!o, onClick: l, children: f.done ? "Continue set-up" : "Set up scene buttons" })
    ] }),
    o && /* @__PURE__ */ s.jsx("div", { className: "status busy", children: o }),
    a && /* @__PURE__ */ s.jsx("div", { className: `status ${a.kind}`, children: a.text })
  ] });
}
function up({ getHass: e, area: t, groups: n, onBack: r, onSetup: l, onChanged: i }) {
  const o = e(), a = jc(o, t.groups), u = Nc(t.groups);
  return /* @__PURE__ */ s.jsxs("div", { className: "stack", children: [
    /* @__PURE__ */ s.jsxs("div", { className: "area-head", children: [
      /* @__PURE__ */ s.jsxs("nav", { className: "crumbs small", children: [
        /* @__PURE__ */ s.jsx("button", { className: "link", onClick: r, children: "Areas" }),
        /* @__PURE__ */ s.jsx(U, { name: "chevron-right" }),
        /* @__PURE__ */ s.jsx("span", { children: t.name })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "row-start", children: [
        /* @__PURE__ */ s.jsx("span", { className: "aicon big", children: /* @__PURE__ */ s.jsx("ha-icon", { icon: t.icon }) }),
        /* @__PURE__ */ s.jsx("h2", { className: "area-title", children: t.name }),
        /* @__PURE__ */ s.jsx("span", { className: "chip", children: [je(t.groups.length, "group"), je(u, "light")].join(" · ") }),
        u > 0 && /* @__PURE__ */ s.jsx("span", { className: `chip ${a ? "ok" : ""}`, children: a ? `${a} on` : "All off" })
      ] })
    ] }),
    /* @__PURE__ */ s.jsxs("div", { className: "split", children: [
      /* @__PURE__ */ s.jsxs("div", { className: "split-main stack", children: [
        t.groups.map((d) => /* @__PURE__ */ s.jsx(op, { getHass: e, group: d, onChanged: i }, d.id)),
        !t.groups.length && /* @__PURE__ */ s.jsxs("div", { className: "card empty-state", children: [
          /* @__PURE__ */ s.jsx(U, { name: "lightbulb-group-outline" }),
          /* @__PURE__ */ s.jsxs("p", { children: [
            "No ZHA groups in ",
            t.name,
            ". Create one under Settings → Devices & services → Zigbee Home Automation → Configure → Groups and put its lights in this area, or set up a Tap Dial here."
          ] })
        ] })
      ] }),
      /* @__PURE__ */ s.jsxs("aside", { className: "split-side stack", children: [
        /* @__PURE__ */ s.jsx("p", { className: "label", children: "Remotes here" }),
        t.remotes.map((d) => /* @__PURE__ */ s.jsx(Ec, { getHass: e, remote: d, groups: n, compact: !0, onSetup: () => l(d.ieee), onChanged: i }, d.ieee)),
        !t.remotes.length && /* @__PURE__ */ s.jsxs("p", { className: "muted small", children: [
          "No remotes in ",
          t.name,
          ". Set a remote's area in its device page, or bind one from the All remotes tab."
        ] })
      ] })
    ] })
  ] });
}
const cp = [
  { title: "Find its group", hint: "Press a scene button" },
  { title: "Choose lights", hint: "Creates the group in ZHA" },
  { title: "Bind", hint: "Press a button first" },
  { title: "Save button scenes", hint: "One per button" }
];
function dp({ getHass: e, remote: t, groups: n, onChanged: r, onClose: l }) {
  const { busy: i, result: o, act: a, clear: u } = zl(), d = Zo(t, n), [m, g] = O.useState(Math.min(d.done, 3)), h = t.dial, y = d.group;
  O.useEffect(() => {
    g((j) => Math.max(j, Math.min(d.done, 3)));
  }, [d.done]);
  const S = (j) => {
    u(), g(j);
  };
  return /* @__PURE__ */ s.jsx("div", { className: "dialog-scrim", onClick: (j) => j.target === j.currentTarget && !i && l(), children: /* @__PURE__ */ s.jsxs("div", { className: "dialog", role: "dialog", "aria-modal": "true", "aria-label": `Set up ${t.name}`, children: [
    /* @__PURE__ */ s.jsxs("div", { className: "dialog-head", children: [
      /* @__PURE__ */ s.jsx("span", { className: "ricon", children: /* @__PURE__ */ s.jsx("ha-icon", { icon: ul(t) }) }),
      /* @__PURE__ */ s.jsxs("div", { className: "grow", children: [
        /* @__PURE__ */ s.jsxs("h2", { children: [
          "Set up ",
          t.name
        ] }),
        /* @__PURE__ */ s.jsx("div", { className: "muted small", children: "Scene buttons that work even when Home Assistant is down" })
      ] }),
      /* @__PURE__ */ s.jsx("button", { className: "icon-btn", onClick: l, disabled: !!i, "aria-label": "Close", children: /* @__PURE__ */ s.jsx(U, { name: "close" }) })
    ] }),
    /* @__PURE__ */ s.jsxs("div", { className: "dialog-body", children: [
      /* @__PURE__ */ s.jsx("ol", { className: "stepper", children: cp.map((j, E) => {
        const f = [d.found, !!y, d.bound, d.saved][E];
        return /* @__PURE__ */ s.jsx("li", { children: /* @__PURE__ */ s.jsxs("button", { className: `step ${E === m ? "cur" : ""} ${f ? "done" : ""}`, onClick: () => S(E), disabled: !!i, children: [
          /* @__PURE__ */ s.jsx("span", { className: "num", children: f ? /* @__PURE__ */ s.jsx(U, { name: "check" }) : E + 1 }),
          /* @__PURE__ */ s.jsxs("span", { children: [
            /* @__PURE__ */ s.jsx("strong", { children: j.title }),
            /* @__PURE__ */ s.jsx("span", { className: "muted small", children: E === 0 && h ? `Uses group ${El(h.group_id)}` : j.hint })
          ] })
        ] }) }, j.title);
      }) }),
      /* @__PURE__ */ s.jsxs("div", { className: "dialog-main", children: [
        m === 0 && /* @__PURE__ */ s.jsx(fp, { getHass: e, remote: t, busy: !!i, act: a, onChanged: r }),
        m === 1 && (h ? /* @__PURE__ */ s.jsx(pp, { getHass: e, remote: t, group: y, busy: !!i, act: a, onChanged: r }) : /* @__PURE__ */ s.jsx(ri, {})),
        m === 2 && (h && y ? /* @__PURE__ */ s.jsx(hp, { getHass: e, remote: t, group: y, bound: d.bound, busy: !!i, act: a, onChanged: r }) : /* @__PURE__ */ s.jsx(ri, {})),
        m === 3 && (h && y ? /* @__PURE__ */ s.jsx(mp, { getHass: e, remote: t, group: y, busy: !!i, act: a, onChanged: r }) : /* @__PURE__ */ s.jsx(ri, {})),
        i && /* @__PURE__ */ s.jsx("div", { className: "status busy", children: i }),
        o && /* @__PURE__ */ s.jsx("div", { className: `status ${o.kind}`, children: o.text })
      ] })
    ] }),
    /* @__PURE__ */ s.jsxs("div", { className: "dialog-foot", children: [
      /* @__PURE__ */ s.jsxs("span", { className: "muted small grow", children: [
        "Step ",
        m + 1,
        " of 4"
      ] }),
      m > 0 && /* @__PURE__ */ s.jsx("button", { disabled: !!i, onClick: () => S(m - 1), children: "Back" }),
      m < 3 ? /* @__PURE__ */ s.jsx("button", { className: "primary", disabled: !!i || d.done <= m, onClick: () => S(m + 1), children: "Next" }) : /* @__PURE__ */ s.jsx("button", { className: "primary", disabled: !!i, onClick: l, children: "Done" })
    ] })
  ] }) });
}
const ri = () => /* @__PURE__ */ s.jsx("p", { className: "muted", children: "Finish the earlier steps first." });
function fp({ getHass: e, remote: t, busy: n, act: r, onChanged: l }) {
  const i = () => r(async () => {
    const o = await e().callWS({ type: "hue_remote_scenes/find_dial_group", ieee: t.ieee });
    return l(), `Its scene buttons use group ${El(o.group_id)}${o.exists ? ", which ZHA already has" : ""}.`;
  }, `Press ${bi(t).press} now, then again every few seconds until this finishes…`);
  return /* @__PURE__ */ s.jsxs("div", { className: "step-body", children: [
    /* @__PURE__ */ s.jsx("h3", { className: "title", children: "Find the remote's group" }),
    /* @__PURE__ */ s.jsxs("p", { className: "muted", children: [
      "This remote recalls its scenes on its own built-in group. Press ",
      /* @__PURE__ */ s.jsx("strong", { children: "Find its group" }),
      ", then press",
      " ",
      bi(t).press,
      " a few times so it wakes up and shows which group it uses."
    ] }),
    /* @__PURE__ */ s.jsx("div", { children: /* @__PURE__ */ s.jsxs("button", { className: "primary", disabled: n, onClick: i, children: [
      /* @__PURE__ */ s.jsx(U, { name: "magnify" }),
      " ",
      t.dial ? "Find again" : "Find its group"
    ] }) })
  ] });
}
function pp({ getHass: e, remote: t, group: n, busy: r, act: l, onChanged: i }) {
  const [o, a] = O.useState(null), [u, d] = O.useState(/* @__PURE__ */ new Set()), [m, g] = O.useState(t.name), h = e(), y = new Set((n == null ? void 0 : n.members.map((c) => c.key)) ?? []);
  O.useEffect(() => {
    e().callWS({ type: "hue_remote_scenes/lights" }).then((c) => a(c.lights)).catch(() => a([]));
  }, [e]);
  const S = (c) => d((p) => {
    const x = new Set(p);
    return x.has(c) ? x.delete(c) : x.add(c), x;
  }), j = () => l(async () => (await e().callWS({ type: "hue_remote_scenes/create_group", group_id: t.dial.group_id, name: (n == null ? void 0 : n.name) ?? m, members: [...u] }), d(/* @__PURE__ */ new Set()), i(), n ? `Added ${je(u.size, "light")} to ${n.name}.` : `Created ${m}. Next, bind the remote to it.`), "Adding the lights to the group…"), E = /* @__PURE__ */ new Map();
  for (const c of o ?? []) {
    const p = c.area ?? Tt;
    E.set(p, [...E.get(p) ?? [], c]);
  }
  const f = [...E.keys()].sort(
    (c, p) => +(p === t.area) - +(c === t.area) || +(c === Tt) - +(p === Tt) || c.localeCompare(p)
  );
  return /* @__PURE__ */ s.jsxs("div", { className: "step-body", children: [
    /* @__PURE__ */ s.jsx("h3", { className: "title", children: n ? `Lights in ${n.name}` : "Which lights should it control?" }),
    /* @__PURE__ */ s.jsx("p", { className: "muted", children: n ? `${je(n.members.length, "light")} are in the remote's group. Tick more to add them.` : "They'll go in a new ZHA group with the remote's ID. Only lights that can store scenes are listed." }),
    !o && /* @__PURE__ */ s.jsx("p", { className: "muted", children: "Loading lights…" }),
    o && !o.length && /* @__PURE__ */ s.jsx("p", { className: "muted", children: "No lights that can store scenes found." }),
    f.map((c) => /* @__PURE__ */ s.jsxs("div", { className: "stack-sm", children: [
      /* @__PURE__ */ s.jsx("p", { className: "label", children: c }),
      /* @__PURE__ */ s.jsx("div", { className: "picks", children: E.get(c).map((p) => {
        const x = y.has(p.key), k = x || u.has(p.key);
        return /* @__PURE__ */ s.jsxs("label", { className: `pick ${k ? "on" : ""}`, children: [
          /* @__PURE__ */ s.jsx("input", { type: "checkbox", checked: k, disabled: x || r, onChange: () => S(p.key) }),
          /* @__PURE__ */ s.jsx("span", { className: `bulb ${bo(h, p.entity_id) ? "lit" : ""}` }),
          /* @__PURE__ */ s.jsx("span", { className: "grow", children: p.name })
        ] }, p.key);
      }) })
    ] }, c)),
    !n && /* @__PURE__ */ s.jsxs("label", { className: "stack-sm", children: [
      /* @__PURE__ */ s.jsx("strong", { children: "Group name" }),
      /* @__PURE__ */ s.jsx("input", { type: "text", value: m, maxLength: 40, onChange: (c) => g(c.target.value) })
    ] }),
    /* @__PURE__ */ s.jsxs("div", { className: "row-end", children: [
      /* @__PURE__ */ s.jsx("span", { className: "muted small grow", children: u.size ? `${je(u.size, "light")} selected` : "" }),
      /* @__PURE__ */ s.jsxs("button", { className: "primary", disabled: r || !u.size || !n && !m.trim(), onClick: j, children: [
        /* @__PURE__ */ s.jsx(U, { name: "plus" }),
        " ",
        n ? "Add lights" : "Create group"
      ] })
    ] })
  ] });
}
function hp({ getHass: e, remote: t, group: n, bound: r, busy: l, act: i, onChanged: o }) {
  const a = t.endpoints.find((d) => d.clusters.includes(5)) ?? t.endpoints[0], u = () => i(async () => {
    const d = await e().callWS({
      type: "hue_remote_scenes/bind",
      ieee: t.ieee,
      endpoint: a.id,
      group_id: n.id,
      clusters: a.clusters,
      unbind: !1
    });
    o();
    const m = Object.entries(d.results).filter(([, g]) => g !== "ok");
    return m.length === Object.keys(d.results).length ? "The remote didn't answer. Press one of its buttons and try again." : m.length ? `Bound, but some parts didn't take (${m.map(([g, h]) => `${g}: ${h}`).join(", ")}). Try again.` : `Bound to ${n.name}.`;
  }, "Waiting for the remote… press one of its buttons.");
  return /* @__PURE__ */ s.jsxs("div", { className: "step-body", children: [
    /* @__PURE__ */ s.jsxs("h3", { className: "title", children: [
      "Bind ",
      t.name,
      " to ",
      n.name
    ] }),
    /* @__PURE__ */ s.jsxs("p", { className: "muted", children: [
      "Binding makes the remote talk to the lights directly over Zigbee. It's asleep most of the time:",
      " ",
      /* @__PURE__ */ s.jsx("strong", { children: "press one of its buttons" }),
      ", then press Bind."
    ] }),
    /* @__PURE__ */ s.jsxs("div", { className: "row-start", children: [
      /* @__PURE__ */ s.jsxs("button", { className: "primary", disabled: l, onClick: u, children: [
        /* @__PURE__ */ s.jsx(U, { name: "link-variant-plus" }),
        " ",
        r ? "Bind again" : "Bind"
      ] }),
      r && /* @__PURE__ */ s.jsx("span", { className: "chip ok", children: "Bound" })
    ] })
  ] });
}
function mp({ getHass: e, remote: t, group: n, busy: r, act: l, onChanged: i }) {
  const o = n.members.filter((u) => u.scenes), a = (u, d) => l(async () => {
    const m = await e().callWS({ type: "hue_remote_scenes/store", group_id: n.id, scene_id: u, ...d ? { name: d } : {} });
    i();
    const g = Object.keys(m.failed).length;
    return g ? `Saved on ${m.ok.length} of ${m.ok.length + g} lights; some didn't answer.` : `Saved on ${je(m.ok.length, "light")}`;
  });
  return /* @__PURE__ */ s.jsxs("div", { className: "step-body", children: [
    /* @__PURE__ */ s.jsx("h3", { className: "title", children: "Save a scene for each button" }),
    /* @__PURE__ */ s.jsxs("p", { className: "muted", children: [
      "Set the ",
      n.name,
      " lights how you want them for a button, then save. Do this for each one. You can change them later from the area."
    ] }),
    /* @__PURE__ */ s.jsx("div", { className: "cards2", children: t.dial.buttons.map(([u, d]) => {
      const m = n.scenes.find((g) => g.id === d);
      return m ? /* @__PURE__ */ s.jsx(
        Ji,
        {
          scene: m,
          badge: pn(u),
          total: o.length,
          missing: "",
          busy: r,
          onRecall: () => l(async () => (await e().callWS({ type: "hue_remote_scenes/recall", group_id: n.id, scene_id: d }), `Recalled ${m.name}`)),
          onOverwrite: () => confirm(`Save how the lights are now as "${m.name}"?`) && a(d)
        },
        d
      ) : /* @__PURE__ */ s.jsx(qi, { badge: pn(u), placeholder: `Scene for ${u}`, busy: r, onSave: (g) => a(d, g) }, d);
    }) })
  ] });
}
function gp() {
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
const li = 8;
function vp({ getHass: e, areas: t, groups: n, remotes: r, onOpen: l, onSetup: i }) {
  const o = t.reduce((u, d) => u + d.attention.length, 0), a = n.reduce((u, d) => u + d.scenes.length, 0);
  return /* @__PURE__ */ s.jsxs("div", { className: "stack", children: [
    /* @__PURE__ */ s.jsxs("div", { className: "stats", children: [
      /* @__PURE__ */ s.jsxs("div", { className: "stat", children: [
        /* @__PURE__ */ s.jsx("b", { children: t.length }),
        /* @__PURE__ */ s.jsx("span", { children: t.length === 1 ? "area" : "areas" })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "stat", children: [
        /* @__PURE__ */ s.jsx("b", { children: n.length }),
        /* @__PURE__ */ s.jsx("span", { children: n.length === 1 ? "group" : "groups" })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "stat", children: [
        /* @__PURE__ */ s.jsx("b", { children: a }),
        /* @__PURE__ */ s.jsx("span", { children: a === 1 ? "scene" : "scenes" })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "stat", children: [
        /* @__PURE__ */ s.jsx("b", { children: r.length }),
        /* @__PURE__ */ s.jsx("span", { children: r.length === 1 ? "remote" : "remotes" })
      ] }),
      /* @__PURE__ */ s.jsx("span", { className: "grow" }),
      o > 0 && /* @__PURE__ */ s.jsxs("div", { className: "alert", children: [
        /* @__PURE__ */ s.jsx(U, { name: "alert-outline" }),
        /* @__PURE__ */ s.jsxs("span", { children: [
          /* @__PURE__ */ s.jsx("strong", { children: je(o, "remote") }),
          " ",
          o === 1 ? "needs" : "need",
          " set-up"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ s.jsx("div", { className: "tiles", children: t.map((u) => /* @__PURE__ */ s.jsx(yp, { getHass: e, area: u, groups: n, onOpen: () => l(u.name), onSetup: i }, u.name)) })
  ] });
}
function yp({ getHass: e, area: t, groups: n, onOpen: r, onSetup: l }) {
  const { busy: i, result: o, act: a } = zl(), u = e(), d = Nc(t.groups), m = jc(u, t.groups), g = [
    t.groups.length ? je(t.groups.length, "group") : null,
    d ? je(d, "light") : null,
    d ? m ? `${m} on` : "off" : null,
    t.remotes.length ? null : "no remote"
  ].filter(Boolean).join(" · "), h = (y, S, j) => a(async () => (await e().callWS({ type: "hue_remote_scenes/recall", group_id: y.id, scene_id: S }), `Recalled ${j}`));
  return /* @__PURE__ */ s.jsxs("section", { className: "tile", children: [
    /* @__PURE__ */ s.jsxs("div", { className: "card-head", children: [
      /* @__PURE__ */ s.jsx("span", { className: "aicon", children: /* @__PURE__ */ s.jsx("ha-icon", { icon: t.icon }) }),
      /* @__PURE__ */ s.jsxs("div", { className: "grow", children: [
        /* @__PURE__ */ s.jsx("h2", { children: t.name }),
        /* @__PURE__ */ s.jsx("div", { className: "muted small", children: g })
      ] }),
      /* @__PURE__ */ s.jsxs("button", { className: "ghost open", onClick: r, "aria-label": `Open ${t.name}`, children: [
        "Open ",
        /* @__PURE__ */ s.jsx(U, { name: "chevron-right" })
      ] })
    ] }),
    t.attention.map((y) => /* @__PURE__ */ s.jsxs("div", { className: "alert", children: [
      /* @__PURE__ */ s.jsx("ha-icon", { icon: ul(y) }),
      /* @__PURE__ */ s.jsxs("span", { className: "grow", children: [
        y.name,
        " needs set-up"
      ] }),
      /* @__PURE__ */ s.jsx("button", { className: "alert-btn", onClick: () => l(y.ieee), children: "Set up" })
    ] }, y.ieee)),
    t.remotes.filter((y) => !t.attention.includes(y)).map((y) => {
      const S = Cl(y, n);
      return /* @__PURE__ */ s.jsxs("div", { className: "remote-line small", children: [
        /* @__PURE__ */ s.jsx("ha-icon", { icon: ul(y) }),
        /* @__PURE__ */ s.jsx("strong", { className: "grow", children: y.name }),
        /* @__PURE__ */ s.jsx("span", { className: `chip ${S.state === "ok" ? "ok" : ""}`, children: S.label })
      ] }, y.ieee);
    }),
    t.groups.map((y) => {
      const S = new Map(y.dials.flatMap((f) => f.buttons.map((c) => [c.scene_id, pn(c.label)]))), j = (f) => S.has(f) ? [...S.keys()].indexOf(f) : 100 + f, E = [...y.scenes].sort((f, c) => j(f.id) - j(c.id));
      return /* @__PURE__ */ s.jsxs("div", { className: "tile-group", children: [
        /* @__PURE__ */ s.jsxs("div", { className: "gname", children: [
          y.name,
          /* @__PURE__ */ s.jsx("span", { children: je(y.members.length, "light") })
        ] }),
        E.length ? /* @__PURE__ */ s.jsxs("div", { className: "sws", children: [
          E.slice(0, li).map((f) => /* @__PURE__ */ s.jsx(Jo, { scene: f, badge: S.get(f.id), disabled: !!i, onRecall: () => h(y, f.id, f.name) }, f.id)),
          E.length > li && /* @__PURE__ */ s.jsxs("button", { className: "sw more-sw", onClick: r, children: [
            /* @__PURE__ */ s.jsxs("span", { className: "swc", children: [
              "+",
              E.length - li
            ] }),
            /* @__PURE__ */ s.jsx("span", { className: "swn", children: "More" })
          ] })
        ] }) : /* @__PURE__ */ s.jsx("button", { className: "ghost empty-group", onClick: r, children: "No scenes yet. Open to save one." })
      ] }, y.id);
    }),
    o && /* @__PURE__ */ s.jsx("div", { className: `status ${o.kind}`, children: o.text })
  ] });
}
const ua = { attention: 0, ok: 1, idle: 2 };
function xp({ getHass: e, remotes: t, groups: n, onSetup: r, onChanged: l }) {
  const [i, o] = O.useState("all");
  if (!t.length)
    return /* @__PURE__ */ s.jsxs("div", { className: "empty-state", children: [
      /* @__PURE__ */ s.jsx(U, { name: "remote-off" }),
      /* @__PURE__ */ s.jsx("p", { children: "No remotes found. Pair a remote (like a Hue Tap Dial) with ZHA first." })
    ] });
  const a = t.map((g) => ({ r: g, s: Cl(g, n).state })), u = (g) => a.filter((h) => h.s === g).length, d = a.filter((g) => i === "all" || g.s === i).sort((g, h) => ua[g.s] - ua[h.s] || g.r.name.localeCompare(h.r.name)), m = [
    ["all", "All", t.length],
    ["attention", "Needs set-up", u("attention")],
    ["idle", "Not set up", u("idle")]
  ];
  return /* @__PURE__ */ s.jsxs("div", { className: "stack", children: [
    /* @__PURE__ */ s.jsxs("div", { className: "row-start wrap", children: [
      m.map(
        ([g, h, y]) => g === "all" || y ? /* @__PURE__ */ s.jsxs("button", { className: `fchip ${i === g ? "on" : ""}`, onClick: () => o(g), children: [
          h,
          " ",
          /* @__PURE__ */ s.jsx("span", { children: y })
        ] }, g) : null
      ),
      /* @__PURE__ */ s.jsx("span", { className: "grow" }),
      /* @__PURE__ */ s.jsx("span", { className: "muted small", children: "Battery remotes sleep: press a button on one just before changing it." })
    ] }),
    /* @__PURE__ */ s.jsx("div", { className: "tiles", children: d.map(({ r: g }) => /* @__PURE__ */ s.jsx(Ec, { getHass: e, remote: g, groups: n, onSetup: () => r(g.ieee), onChanged: l }, g.ieee)) })
  ] });
}
const wp = [
  { id: "areas", label: "Areas", icon: "home-outline" },
  { id: "remotes", label: "All remotes", icon: "remote" }
];
function kp({ getHass: e, narrow: t, onToggleMenu: n }) {
  const [r, l] = O.useState(null), [i, o] = O.useState(null), [a, u] = O.useState({}), [d, m] = O.useState("areas"), [g, h] = O.useState(null), [y, S] = O.useState(null), [j, E] = O.useState(""), f = O.useCallback(() => {
    const v = e();
    Promise.all([
      v.callWS({ type: "hue_remote_scenes/groups" }),
      v.callWS({ type: "hue_remote_scenes/remotes" })
    ]).then(([w, _]) => {
      l(w.groups), o(_.remotes), u({ ...w.area_icons, ..._.area_icons }), E("");
    }).catch((w) => E(Cc(w)));
  }, [e]);
  O.useEffect(() => {
    f();
    const v = e().connection.subscribeMessage(f, { type: "hue_remote_scenes/subscribe" });
    return () => {
      v.then((w) => w()).catch(() => {
      });
    };
  }, [e, f]);
  const c = r && i ? ip(r, i, a) : null, p = c == null ? void 0 : c.find((v) => v.name === g), x = i == null ? void 0 : i.find((v) => v.ieee === y), k = (v) => {
    m(v), h(null);
  };
  return /* @__PURE__ */ s.jsxs("div", { className: "panel", children: [
    /* @__PURE__ */ s.jsxs("header", { children: [
      /* @__PURE__ */ s.jsxs("div", { className: "toolbar-row", children: [
        t && /* @__PURE__ */ s.jsx("button", { className: "menu", onClick: n, "aria-label": "Menu", children: /* @__PURE__ */ s.jsx(U, { name: "menu" }) }),
        /* @__PURE__ */ s.jsx(gp, {}),
        /* @__PURE__ */ s.jsx("h1", { children: "Hue remote scenes" })
      ] }),
      /* @__PURE__ */ s.jsx("nav", { className: "tabs", role: "tablist", children: wp.map((v) => /* @__PURE__ */ s.jsxs("button", { role: "tab", "aria-selected": v.id === d, className: v.id === d ? "on" : "", onClick: () => k(v.id), children: [
        /* @__PURE__ */ s.jsx(U, { name: v.icon }),
        /* @__PURE__ */ s.jsx("span", { children: v.label })
      ] }, v.id)) })
    ] }),
    /* @__PURE__ */ s.jsxs("main", { children: [
      j && /* @__PURE__ */ s.jsx("div", { className: "status error", children: j }),
      c && r && i && d === "areas" && !p && (c.length ? /* @__PURE__ */ s.jsx(vp, { getHass: e, areas: c, groups: r, remotes: i, onOpen: h, onSetup: S }) : /* @__PURE__ */ s.jsxs("div", { className: "empty-state", children: [
        /* @__PURE__ */ s.jsx(U, { name: "lightbulb-group-outline" }),
        /* @__PURE__ */ s.jsx("p", { children: "No ZHA groups or remotes yet. Create a group under Settings → Devices & services → Zigbee Home Automation → Configure → Groups. For a Hue Tap Dial, pair it and use the All remotes tab: it creates the group the dial needs." })
      ] })),
      p && r && d === "areas" && /* @__PURE__ */ s.jsx(up, { getHass: e, area: p, groups: r, onBack: () => h(null), onSetup: S, onChanged: f }),
      r && i && d === "remotes" && /* @__PURE__ */ s.jsx(xp, { getHass: e, remotes: i, groups: r, onSetup: S, onChanged: f })
    ] }),
    x && r && /* @__PURE__ */ s.jsx(dp, { getHass: e, remote: x, groups: r, onChanged: f, onClose: () => S(null) })
  ] });
}
const Sp = (
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
.tight0 { margin: 0; }
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
.foot > .grow { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; min-width: 0; }
.foot button { padding: 6px 8px; white-space: nowrap; }
.foot button.primary { padding: 7px 12px; }
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
class jp extends HTMLElement {
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
      r.textContent = Sp;
      const l = document.createElement("div");
      n.append(r, l), this._root = Sc(l);
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
        kp,
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
customElements.get("hue-remote-scenes-panel") || customElements.define("hue-remote-scenes-panel", jp);
