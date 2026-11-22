var Uc = Object.defineProperty;
var Ac = (e, t, n) => t in e ? Uc(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var mn = (e, t, n) => Ac(e, typeof t != "symbol" ? t + "" : t, n);
var wa = { exports: {} }, pl = {}, ka = { exports: {} }, R = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var lr = Symbol.for("react.element"), Bc = Symbol.for("react.portal"), Wc = Symbol.for("react.fragment"), Vc = Symbol.for("react.strict_mode"), Qc = Symbol.for("react.profiler"), Hc = Symbol.for("react.provider"), Kc = Symbol.for("react.context"), Gc = Symbol.for("react.forward_ref"), Yc = Symbol.for("react.suspense"), Xc = Symbol.for("react.memo"), Zc = Symbol.for("react.lazy"), ls = Symbol.iterator;
function Jc(e) {
  return e === null || typeof e != "object" ? null : (e = ls && e[ls] || e["@@iterator"], typeof e == "function" ? e : null);
}
var Sa = { isMounted: function() {
  return !1;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, ja = Object.assign, _a = {};
function dn(e, t, n) {
  this.props = e, this.context = t, this.refs = _a, this.updater = n || Sa;
}
dn.prototype.isReactComponent = {};
dn.prototype.setState = function(e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, e, t, "setState");
};
dn.prototype.forceUpdate = function(e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function Na() {
}
Na.prototype = dn.prototype;
function io(e, t, n) {
  this.props = e, this.context = t, this.refs = _a, this.updater = n || Sa;
}
var oo = io.prototype = new Na();
oo.constructor = io;
ja(oo, dn.prototype);
oo.isPureReactComponent = !0;
var is = Array.isArray, Ca = Object.prototype.hasOwnProperty, so = { current: null }, Ea = { key: !0, ref: !0, __self: !0, __source: !0 };
function za(e, t, n) {
  var r, l = {}, i = null, o = null;
  if (t != null) for (r in t.ref !== void 0 && (o = t.ref), t.key !== void 0 && (i = "" + t.key), t) Ca.call(t, r) && !Ea.hasOwnProperty(r) && (l[r] = t[r]);
  var a = arguments.length - 2;
  if (a === 1) l.children = n;
  else if (1 < a) {
    for (var u = Array(a), c = 0; c < a; c++) u[c] = arguments[c + 2];
    l.children = u;
  }
  if (e && e.defaultProps) for (r in a = e.defaultProps, a) l[r] === void 0 && (l[r] = a[r]);
  return { $$typeof: lr, type: e, key: i, ref: o, props: l, _owner: so.current };
}
function qc(e, t) {
  return { $$typeof: lr, type: e.type, key: t, ref: e.ref, props: e.props, _owner: e._owner };
}
function ao(e) {
  return typeof e == "object" && e !== null && e.$$typeof === lr;
}
function ed(e) {
  var t = { "=": "=0", ":": "=2" };
  return "$" + e.replace(/[=:]/g, function(n) {
    return t[n];
  });
}
var os = /\/+/g;
function Ml(e, t) {
  return typeof e == "object" && e !== null && e.key != null ? ed("" + e.key) : t.toString(36);
}
function Pr(e, t, n, r, l) {
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
        case lr:
        case Bc:
          o = !0;
      }
  }
  if (o) return o = e, l = l(o), e = r === "" ? "." + Ml(o, 0) : r, is(l) ? (n = "", e != null && (n = e.replace(os, "$&/") + "/"), Pr(l, t, n, "", function(c) {
    return c;
  })) : l != null && (ao(l) && (l = qc(l, n + (!l.key || o && o.key === l.key ? "" : ("" + l.key).replace(os, "$&/") + "/") + e)), t.push(l)), 1;
  if (o = 0, r = r === "" ? "." : r + ":", is(e)) for (var a = 0; a < e.length; a++) {
    i = e[a];
    var u = r + Ml(i, a);
    o += Pr(i, t, n, u, l);
  }
  else if (u = Jc(e), typeof u == "function") for (e = u.call(e), a = 0; !(i = e.next()).done; ) i = i.value, u = r + Ml(i, a++), o += Pr(i, t, n, u, l);
  else if (i === "object") throw t = String(e), Error("Objects are not valid as a React child (found: " + (t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) + "). If you meant to render a collection of children, use an array instead.");
  return o;
}
function fr(e, t, n) {
  if (e == null) return e;
  var r = [], l = 0;
  return Pr(e, r, "", "", function(i) {
    return t.call(n, i, l++);
  }), r;
}
function td(e) {
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
var de = { current: null }, $r = { transition: null }, nd = { ReactCurrentDispatcher: de, ReactCurrentBatchConfig: $r, ReactCurrentOwner: so };
function Pa() {
  throw Error("act(...) is not supported in production builds of React.");
}
R.Children = { map: fr, forEach: function(e, t, n) {
  fr(e, function() {
    t.apply(this, arguments);
  }, n);
}, count: function(e) {
  var t = 0;
  return fr(e, function() {
    t++;
  }), t;
}, toArray: function(e) {
  return fr(e, function(t) {
    return t;
  }) || [];
}, only: function(e) {
  if (!ao(e)) throw Error("React.Children.only expected to receive a single React element child.");
  return e;
} };
R.Component = dn;
R.Fragment = Wc;
R.Profiler = Qc;
R.PureComponent = io;
R.StrictMode = Vc;
R.Suspense = Yc;
R.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = nd;
R.act = Pa;
R.cloneElement = function(e, t, n) {
  if (e == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
  var r = ja({}, e.props), l = e.key, i = e.ref, o = e._owner;
  if (t != null) {
    if (t.ref !== void 0 && (i = t.ref, o = so.current), t.key !== void 0 && (l = "" + t.key), e.type && e.type.defaultProps) var a = e.type.defaultProps;
    for (u in t) Ca.call(t, u) && !Ea.hasOwnProperty(u) && (r[u] = t[u] === void 0 && a !== void 0 ? a[u] : t[u]);
  }
  var u = arguments.length - 2;
  if (u === 1) r.children = n;
  else if (1 < u) {
    a = Array(u);
    for (var c = 0; c < u; c++) a[c] = arguments[c + 2];
    r.children = a;
  }
  return { $$typeof: lr, type: e.type, key: l, ref: i, props: r, _owner: o };
};
R.createContext = function(e) {
  return e = { $$typeof: Kc, _currentValue: e, _currentValue2: e, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, e.Provider = { $$typeof: Hc, _context: e }, e.Consumer = e;
};
R.createElement = za;
R.createFactory = function(e) {
  var t = za.bind(null, e);
  return t.type = e, t;
};
R.createRef = function() {
  return { current: null };
};
R.forwardRef = function(e) {
  return { $$typeof: Gc, render: e };
};
R.isValidElement = ao;
R.lazy = function(e) {
  return { $$typeof: Zc, _payload: { _status: -1, _result: e }, _init: td };
};
R.memo = function(e, t) {
  return { $$typeof: Xc, type: e, compare: t === void 0 ? null : t };
};
R.startTransition = function(e) {
  var t = $r.transition;
  $r.transition = {};
  try {
    e();
  } finally {
    $r.transition = t;
  }
};
R.unstable_act = Pa;
R.useCallback = function(e, t) {
  return de.current.useCallback(e, t);
};
R.useContext = function(e) {
  return de.current.useContext(e);
};
R.useDebugValue = function() {
};
R.useDeferredValue = function(e) {
  return de.current.useDeferredValue(e);
};
R.useEffect = function(e, t) {
  return de.current.useEffect(e, t);
};
R.useId = function() {
  return de.current.useId();
};
R.useImperativeHandle = function(e, t, n) {
  return de.current.useImperativeHandle(e, t, n);
};
R.useInsertionEffect = function(e, t) {
  return de.current.useInsertionEffect(e, t);
};
R.useLayoutEffect = function(e, t) {
  return de.current.useLayoutEffect(e, t);
};
R.useMemo = function(e, t) {
  return de.current.useMemo(e, t);
};
R.useReducer = function(e, t, n) {
  return de.current.useReducer(e, t, n);
};
R.useRef = function(e) {
  return de.current.useRef(e);
};
R.useState = function(e) {
  return de.current.useState(e);
};
R.useSyncExternalStore = function(e, t, n) {
  return de.current.useSyncExternalStore(e, t, n);
};
R.useTransition = function() {
  return de.current.useTransition();
};
R.version = "18.3.1";
ka.exports = R;
var L = ka.exports;
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var rd = L, ld = Symbol.for("react.element"), id = Symbol.for("react.fragment"), od = Object.prototype.hasOwnProperty, sd = rd.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, ad = { key: !0, ref: !0, __self: !0, __source: !0 };
function $a(e, t, n) {
  var r, l = {}, i = null, o = null;
  n !== void 0 && (i = "" + n), t.key !== void 0 && (i = "" + t.key), t.ref !== void 0 && (o = t.ref);
  for (r in t) od.call(t, r) && !ad.hasOwnProperty(r) && (l[r] = t[r]);
  if (e && e.defaultProps) for (r in t = e.defaultProps, t) l[r] === void 0 && (l[r] = t[r]);
  return { $$typeof: ld, type: e, key: i, ref: o, props: l, _owner: sd.current };
}
pl.Fragment = id;
pl.jsx = $a;
pl.jsxs = $a;
wa.exports = pl;
var s = wa.exports, ba = { exports: {} }, je = {}, Ta = { exports: {} }, La = {};
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
  function t(P, b) {
    var T = P.length;
    P.push(b);
    e: for (; 0 < T; ) {
      var G = T - 1 >>> 1, q = P[G];
      if (0 < l(q, b)) P[G] = b, P[T] = q, T = G;
      else break e;
    }
  }
  function n(P) {
    return P.length === 0 ? null : P[0];
  }
  function r(P) {
    if (P.length === 0) return null;
    var b = P[0], T = P.pop();
    if (T !== b) {
      P[0] = T;
      e: for (var G = 0, q = P.length, cr = q >>> 1; G < cr; ) {
        var wt = 2 * (G + 1) - 1, Rl = P[wt], kt = wt + 1, dr = P[kt];
        if (0 > l(Rl, T)) kt < q && 0 > l(dr, Rl) ? (P[G] = dr, P[kt] = T, G = kt) : (P[G] = Rl, P[wt] = T, G = wt);
        else if (kt < q && 0 > l(dr, T)) P[G] = dr, P[kt] = T, G = kt;
        else break e;
      }
    }
    return b;
  }
  function l(P, b) {
    var T = P.sortIndex - b.sortIndex;
    return T !== 0 ? T : P.id - b.id;
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
  var u = [], c = [], m = 1, g = null, h = 3, y = !1, x = !1, S = !1, N = typeof setTimeout == "function" ? setTimeout : null, f = typeof clearTimeout == "function" ? clearTimeout : null, d = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function p(P) {
    for (var b = n(c); b !== null; ) {
      if (b.callback === null) r(c);
      else if (b.startTime <= P) r(c), b.sortIndex = b.expirationTime, t(u, b);
      else break;
      b = n(c);
    }
  }
  function v(P) {
    if (S = !1, p(P), !x) if (n(u) !== null) x = !0, Tl(k);
    else {
      var b = n(c);
      b !== null && Ll(v, b.startTime - P);
    }
  }
  function k(P, b) {
    x = !1, S && (S = !1, f(j), j = -1), y = !0;
    var T = h;
    try {
      for (p(b), g = n(u); g !== null && (!(g.expirationTime > b) || P && !$()); ) {
        var G = g.callback;
        if (typeof G == "function") {
          g.callback = null, h = g.priorityLevel;
          var q = G(g.expirationTime <= b);
          b = e.unstable_now(), typeof q == "function" ? g.callback = q : g === n(u) && r(u), p(b);
        } else r(u);
        g = n(u);
      }
      if (g !== null) var cr = !0;
      else {
        var wt = n(c);
        wt !== null && Ll(v, wt.startTime - b), cr = !1;
      }
      return cr;
    } finally {
      g = null, h = T, y = !1;
    }
  }
  var E = !1, C = null, j = -1, O = 5, w = -1;
  function $() {
    return !(e.unstable_now() - w < O);
  }
  function B() {
    if (C !== null) {
      var P = e.unstable_now();
      w = P;
      var b = !0;
      try {
        b = C(!0, P);
      } finally {
        b ? hn() : (E = !1, C = null);
      }
    } else E = !1;
  }
  var hn;
  if (typeof d == "function") hn = function() {
    d(B);
  };
  else if (typeof MessageChannel < "u") {
    var rs = new MessageChannel(), Ic = rs.port2;
    rs.port1.onmessage = B, hn = function() {
      Ic.postMessage(null);
    };
  } else hn = function() {
    N(B, 0);
  };
  function Tl(P) {
    C = P, E || (E = !0, hn());
  }
  function Ll(P, b) {
    j = N(function() {
      P(e.unstable_now());
    }, b);
  }
  e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(P) {
    P.callback = null;
  }, e.unstable_continueExecution = function() {
    x || y || (x = !0, Tl(k));
  }, e.unstable_forceFrameRate = function(P) {
    0 > P || 125 < P ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : O = 0 < P ? Math.floor(1e3 / P) : 5;
  }, e.unstable_getCurrentPriorityLevel = function() {
    return h;
  }, e.unstable_getFirstCallbackNode = function() {
    return n(u);
  }, e.unstable_next = function(P) {
    switch (h) {
      case 1:
      case 2:
      case 3:
        var b = 3;
        break;
      default:
        b = h;
    }
    var T = h;
    h = b;
    try {
      return P();
    } finally {
      h = T;
    }
  }, e.unstable_pauseExecution = function() {
  }, e.unstable_requestPaint = function() {
  }, e.unstable_runWithPriority = function(P, b) {
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
    var T = h;
    h = P;
    try {
      return b();
    } finally {
      h = T;
    }
  }, e.unstable_scheduleCallback = function(P, b, T) {
    var G = e.unstable_now();
    switch (typeof T == "object" && T !== null ? (T = T.delay, T = typeof T == "number" && 0 < T ? G + T : G) : T = G, P) {
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
    return q = T + q, P = { id: m++, callback: b, priorityLevel: P, startTime: T, expirationTime: q, sortIndex: -1 }, T > G ? (P.sortIndex = T, t(c, P), n(u) === null && P === n(c) && (S ? (f(j), j = -1) : S = !0, Ll(v, T - G))) : (P.sortIndex = q, t(u, P), x || y || (x = !0, Tl(k))), P;
  }, e.unstable_shouldYield = $, e.unstable_wrapCallback = function(P) {
    var b = h;
    return function() {
      var T = h;
      h = b;
      try {
        return P.apply(this, arguments);
      } finally {
        h = T;
      }
    };
  };
})(La);
Ta.exports = La;
var ud = Ta.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var cd = L, Se = ud;
function _(e) {
  for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
  return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var Ra = /* @__PURE__ */ new Set(), Fn = {};
function Mt(e, t) {
  rn(e, t), rn(e + "Capture", t);
}
function rn(e, t) {
  for (Fn[e] = t, e = 0; e < t.length; e++) Ra.add(t[e]);
}
var Ye = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), ai = Object.prototype.hasOwnProperty, dd = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, ss = {}, as = {};
function fd(e) {
  return ai.call(as, e) ? !0 : ai.call(ss, e) ? !1 : dd.test(e) ? as[e] = !0 : (ss[e] = !0, !1);
}
function pd(e, t, n, r) {
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
function hd(e, t, n, r) {
  if (t === null || typeof t > "u" || pd(e, t, n, r)) return !0;
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
var uo = /[\-:]([a-z])/g;
function co(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
  var t = e.replace(
    uo,
    co
  );
  le[t] = new fe(t, 1, !1, e, null, !1, !1);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
  var t = e.replace(uo, co);
  le[t] = new fe(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
});
["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
  var t = e.replace(uo, co);
  le[t] = new fe(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function(e) {
  le[e] = new fe(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
le.xlinkHref = new fe("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);
["src", "href", "action", "formAction"].forEach(function(e) {
  le[e] = new fe(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function fo(e, t, n, r) {
  var l = le.hasOwnProperty(t) ? le[t] : null;
  (l !== null ? l.type !== 0 : r || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (hd(t, n, l, r) && (n = null), r || l === null ? fd(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n)) : l.mustUseProperty ? e[l.propertyName] = n === null ? l.type === 3 ? !1 : "" : n : (t = l.attributeName, r = l.attributeNamespace, n === null ? e.removeAttribute(t) : (l = l.type, n = l === 3 || l === 4 && n === !0 ? "" : "" + n, r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
var qe = cd.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, pr = Symbol.for("react.element"), Ft = Symbol.for("react.portal"), It = Symbol.for("react.fragment"), po = Symbol.for("react.strict_mode"), ui = Symbol.for("react.profiler"), Ma = Symbol.for("react.provider"), Oa = Symbol.for("react.context"), ho = Symbol.for("react.forward_ref"), ci = Symbol.for("react.suspense"), di = Symbol.for("react.suspense_list"), mo = Symbol.for("react.memo"), tt = Symbol.for("react.lazy"), Da = Symbol.for("react.offscreen"), us = Symbol.iterator;
function gn(e) {
  return e === null || typeof e != "object" ? null : (e = us && e[us] || e["@@iterator"], typeof e == "function" ? e : null);
}
var H = Object.assign, Ol;
function _n(e) {
  if (Ol === void 0) try {
    throw Error();
  } catch (n) {
    var t = n.stack.trim().match(/\n( *(at )?)/);
    Ol = t && t[1] || "";
  }
  return `
` + Ol + e;
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
  return (e = e ? e.displayName || e.name : "") ? _n(e) : "";
}
function md(e) {
  switch (e.tag) {
    case 5:
      return _n(e.type);
    case 16:
      return _n("Lazy");
    case 13:
      return _n("Suspense");
    case 19:
      return _n("SuspenseList");
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
    case It:
      return "Fragment";
    case Ft:
      return "Portal";
    case ui:
      return "Profiler";
    case po:
      return "StrictMode";
    case ci:
      return "Suspense";
    case di:
      return "SuspenseList";
  }
  if (typeof e == "object") switch (e.$$typeof) {
    case Oa:
      return (e.displayName || "Context") + ".Consumer";
    case Ma:
      return (e._context.displayName || "Context") + ".Provider";
    case ho:
      var t = e.render;
      return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
    case mo:
      return t = e.displayName || null, t !== null ? t : fi(e.type) || "Memo";
    case tt:
      t = e._payload, e = e._init;
      try {
        return fi(e(t));
      } catch {
      }
  }
  return null;
}
function gd(e) {
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
      return t === po ? "StrictMode" : "Mode";
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
function mt(e) {
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
function Fa(e) {
  var t = e.type;
  return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
}
function vd(e) {
  var t = Fa(e) ? "checked" : "value", n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t), r = "" + e[t];
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
function hr(e) {
  e._valueTracker || (e._valueTracker = vd(e));
}
function Ia(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(), r = "";
  return e && (r = Fa(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n ? (t.setValue(e), !0) : !1;
}
function Br(e) {
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
function cs(e, t) {
  var n = t.defaultValue == null ? "" : t.defaultValue, r = t.checked != null ? t.checked : t.defaultChecked;
  n = mt(t.value != null ? t.value : n), e._wrapperState = { initialChecked: r, initialValue: n, controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null };
}
function Ua(e, t) {
  t = t.checked, t != null && fo(e, "checked", t, !1);
}
function hi(e, t) {
  Ua(e, t);
  var n = mt(t.value), r = t.type;
  if (n != null) r === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + n) : e.value !== "" + n && (e.value = "" + n);
  else if (r === "submit" || r === "reset") {
    e.removeAttribute("value");
    return;
  }
  t.hasOwnProperty("value") ? mi(e, t.type, n) : t.hasOwnProperty("defaultValue") && mi(e, t.type, mt(t.defaultValue)), t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked);
}
function ds(e, t, n) {
  if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
    var r = t.type;
    if (!(r !== "submit" && r !== "reset" || t.value !== void 0 && t.value !== null)) return;
    t = "" + e._wrapperState.initialValue, n || t === e.value || (e.value = t), e.defaultValue = t;
  }
  n = e.name, n !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, n !== "" && (e.name = n);
}
function mi(e, t, n) {
  (t !== "number" || Br(e.ownerDocument) !== e) && (n == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
}
var Nn = Array.isArray;
function Xt(e, t, n, r) {
  if (e = e.options, t) {
    t = {};
    for (var l = 0; l < n.length; l++) t["$" + n[l]] = !0;
    for (n = 0; n < e.length; n++) l = t.hasOwnProperty("$" + e[n].value), e[n].selected !== l && (e[n].selected = l), l && r && (e[n].defaultSelected = !0);
  } else {
    for (n = "" + mt(n), t = null, l = 0; l < e.length; l++) {
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
  if (t.dangerouslySetInnerHTML != null) throw Error(_(91));
  return H({}, t, { value: void 0, defaultValue: void 0, children: "" + e._wrapperState.initialValue });
}
function fs(e, t) {
  var n = t.value;
  if (n == null) {
    if (n = t.children, t = t.defaultValue, n != null) {
      if (t != null) throw Error(_(92));
      if (Nn(n)) {
        if (1 < n.length) throw Error(_(93));
        n = n[0];
      }
      t = n;
    }
    t == null && (t = ""), n = t;
  }
  e._wrapperState = { initialValue: mt(n) };
}
function Aa(e, t) {
  var n = mt(t.value), r = mt(t.defaultValue);
  n != null && (n = "" + n, n !== e.value && (e.value = n), t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)), r != null && (e.defaultValue = "" + r);
}
function ps(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
}
function Ba(e) {
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
  return e == null || e === "http://www.w3.org/1999/xhtml" ? Ba(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e;
}
var mr, Wa = function(e) {
  return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, n, r, l) {
    MSApp.execUnsafeLocalFunction(function() {
      return e(t, n, r, l);
    });
  } : e;
}(function(e, t) {
  if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e) e.innerHTML = t;
  else {
    for (mr = mr || document.createElement("div"), mr.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>", t = mr.firstChild; e.firstChild; ) e.removeChild(e.firstChild);
    for (; t.firstChild; ) e.appendChild(t.firstChild);
  }
});
function In(e, t) {
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
}, yd = ["Webkit", "ms", "Moz", "O"];
Object.keys(zn).forEach(function(e) {
  yd.forEach(function(t) {
    t = t + e.charAt(0).toUpperCase() + e.substring(1), zn[t] = zn[e];
  });
});
function Va(e, t, n) {
  return t == null || typeof t == "boolean" || t === "" ? "" : n || typeof t != "number" || t === 0 || zn.hasOwnProperty(e) && zn[e] ? ("" + t).trim() : t + "px";
}
function Qa(e, t) {
  e = e.style;
  for (var n in t) if (t.hasOwnProperty(n)) {
    var r = n.indexOf("--") === 0, l = Va(n, t[n], r);
    n === "float" && (n = "cssFloat"), r ? e.setProperty(n, l) : e[n] = l;
  }
}
var xd = H({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
function yi(e, t) {
  if (t) {
    if (xd[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(_(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(_(60));
      if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML)) throw Error(_(61));
    }
    if (t.style != null && typeof t.style != "object") throw Error(_(62));
  }
}
function xi(e, t) {
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
function go(e) {
  return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
}
var ki = null, Zt = null, Jt = null;
function hs(e) {
  if (e = sr(e)) {
    if (typeof ki != "function") throw Error(_(280));
    var t = e.stateNode;
    t && (t = yl(t), ki(e.stateNode, e.type, t));
  }
}
function Ha(e) {
  Zt ? Jt ? Jt.push(e) : Jt = [e] : Zt = e;
}
function Ka() {
  if (Zt) {
    var e = Zt, t = Jt;
    if (Jt = Zt = null, hs(e), t) for (e = 0; e < t.length; e++) hs(t[e]);
  }
}
function Ga(e, t) {
  return e(t);
}
function Ya() {
}
var Il = !1;
function Xa(e, t, n) {
  if (Il) return e(t, n);
  Il = !0;
  try {
    return Ga(e, t, n);
  } finally {
    Il = !1, (Zt !== null || Jt !== null) && (Ya(), Ka());
  }
}
function Un(e, t) {
  var n = e.stateNode;
  if (n === null) return null;
  var r = yl(n);
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
  if (n && typeof n != "function") throw Error(_(231, t, typeof n));
  return n;
}
var Si = !1;
if (Ye) try {
  var vn = {};
  Object.defineProperty(vn, "passive", { get: function() {
    Si = !0;
  } }), window.addEventListener("test", vn, vn), window.removeEventListener("test", vn, vn);
} catch {
  Si = !1;
}
function wd(e, t, n, r, l, i, o, a, u) {
  var c = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, c);
  } catch (m) {
    this.onError(m);
  }
}
var Pn = !1, Wr = null, Vr = !1, ji = null, kd = { onError: function(e) {
  Pn = !0, Wr = e;
} };
function Sd(e, t, n, r, l, i, o, a, u) {
  Pn = !1, Wr = null, wd.apply(kd, arguments);
}
function jd(e, t, n, r, l, i, o, a, u) {
  if (Sd.apply(this, arguments), Pn) {
    if (Pn) {
      var c = Wr;
      Pn = !1, Wr = null;
    } else throw Error(_(198));
    Vr || (Vr = !0, ji = c);
  }
}
function Ot(e) {
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
function Za(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
  }
  return null;
}
function ms(e) {
  if (Ot(e) !== e) throw Error(_(188));
}
function _d(e) {
  var t = e.alternate;
  if (!t) {
    if (t = Ot(e), t === null) throw Error(_(188));
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
        if (i === n) return ms(l), e;
        if (i === r) return ms(l), t;
        i = i.sibling;
      }
      throw Error(_(188));
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
        if (!o) throw Error(_(189));
      }
    }
    if (n.alternate !== r) throw Error(_(190));
  }
  if (n.tag !== 3) throw Error(_(188));
  return n.stateNode.current === n ? e : t;
}
function Ja(e) {
  return e = _d(e), e !== null ? qa(e) : null;
}
function qa(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var t = qa(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var eu = Se.unstable_scheduleCallback, gs = Se.unstable_cancelCallback, Nd = Se.unstable_shouldYield, Cd = Se.unstable_requestPaint, Y = Se.unstable_now, Ed = Se.unstable_getCurrentPriorityLevel, vo = Se.unstable_ImmediatePriority, tu = Se.unstable_UserBlockingPriority, Qr = Se.unstable_NormalPriority, zd = Se.unstable_LowPriority, nu = Se.unstable_IdlePriority, hl = null, Ae = null;
function Pd(e) {
  if (Ae && typeof Ae.onCommitFiberRoot == "function") try {
    Ae.onCommitFiberRoot(hl, e, void 0, (e.current.flags & 128) === 128);
  } catch {
  }
}
var Me = Math.clz32 ? Math.clz32 : Td, $d = Math.log, bd = Math.LN2;
function Td(e) {
  return e >>>= 0, e === 0 ? 32 : 31 - ($d(e) / bd | 0) | 0;
}
var gr = 64, vr = 4194304;
function Cn(e) {
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
function Hr(e, t) {
  var n = e.pendingLanes;
  if (n === 0) return 0;
  var r = 0, l = e.suspendedLanes, i = e.pingedLanes, o = n & 268435455;
  if (o !== 0) {
    var a = o & ~l;
    a !== 0 ? r = Cn(a) : (i &= o, i !== 0 && (r = Cn(i)));
  } else o = n & ~l, o !== 0 ? r = Cn(o) : i !== 0 && (r = Cn(i));
  if (r === 0) return 0;
  if (t !== 0 && t !== r && !(t & l) && (l = r & -r, i = t & -t, l >= i || l === 16 && (i & 4194240) !== 0)) return t;
  if (r & 4 && (r |= n & 16), t = e.entangledLanes, t !== 0) for (e = e.entanglements, t &= r; 0 < t; ) n = 31 - Me(t), l = 1 << n, r |= e[n], t &= ~l;
  return r;
}
function Ld(e, t) {
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
function Rd(e, t) {
  for (var n = e.suspendedLanes, r = e.pingedLanes, l = e.expirationTimes, i = e.pendingLanes; 0 < i; ) {
    var o = 31 - Me(i), a = 1 << o, u = l[o];
    u === -1 ? (!(a & n) || a & r) && (l[o] = Ld(a, t)) : u <= t && (e.expiredLanes |= a), i &= ~a;
  }
}
function _i(e) {
  return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
}
function ru() {
  var e = gr;
  return gr <<= 1, !(gr & 4194240) && (gr = 64), e;
}
function Ul(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t;
}
function ir(e, t, n) {
  e.pendingLanes |= t, t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, t = 31 - Me(t), e[t] = n;
}
function Md(e, t) {
  var n = e.pendingLanes & ~t;
  e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
  var r = e.eventTimes;
  for (e = e.expirationTimes; 0 < n; ) {
    var l = 31 - Me(n), i = 1 << l;
    t[l] = 0, r[l] = -1, e[l] = -1, n &= ~i;
  }
}
function yo(e, t) {
  var n = e.entangledLanes |= t;
  for (e = e.entanglements; n; ) {
    var r = 31 - Me(n), l = 1 << r;
    l & t | e[r] & t && (e[r] |= t), n &= ~l;
  }
}
var F = 0;
function lu(e) {
  return e &= -e, 1 < e ? 4 < e ? e & 268435455 ? 16 : 536870912 : 4 : 1;
}
var iu, xo, ou, su, au, Ni = !1, yr = [], st = null, at = null, ut = null, An = /* @__PURE__ */ new Map(), Bn = /* @__PURE__ */ new Map(), rt = [], Od = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function vs(e, t) {
  switch (e) {
    case "focusin":
    case "focusout":
      st = null;
      break;
    case "dragenter":
    case "dragleave":
      at = null;
      break;
    case "mouseover":
    case "mouseout":
      ut = null;
      break;
    case "pointerover":
    case "pointerout":
      An.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      Bn.delete(t.pointerId);
  }
}
function yn(e, t, n, r, l, i) {
  return e === null || e.nativeEvent !== i ? (e = { blockedOn: t, domEventName: n, eventSystemFlags: r, nativeEvent: i, targetContainers: [l] }, t !== null && (t = sr(t), t !== null && xo(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, l !== null && t.indexOf(l) === -1 && t.push(l), e);
}
function Dd(e, t, n, r, l) {
  switch (t) {
    case "focusin":
      return st = yn(st, e, t, n, r, l), !0;
    case "dragenter":
      return at = yn(at, e, t, n, r, l), !0;
    case "mouseover":
      return ut = yn(ut, e, t, n, r, l), !0;
    case "pointerover":
      var i = l.pointerId;
      return An.set(i, yn(An.get(i) || null, e, t, n, r, l)), !0;
    case "gotpointercapture":
      return i = l.pointerId, Bn.set(i, yn(Bn.get(i) || null, e, t, n, r, l)), !0;
  }
  return !1;
}
function uu(e) {
  var t = _t(e.target);
  if (t !== null) {
    var n = Ot(t);
    if (n !== null) {
      if (t = n.tag, t === 13) {
        if (t = Za(n), t !== null) {
          e.blockedOn = t, au(e.priority, function() {
            ou(n);
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
function br(e) {
  if (e.blockedOn !== null) return !1;
  for (var t = e.targetContainers; 0 < t.length; ) {
    var n = Ci(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var r = new n.constructor(n.type, n);
      wi = r, n.target.dispatchEvent(r), wi = null;
    } else return t = sr(n), t !== null && xo(t), e.blockedOn = n, !1;
    t.shift();
  }
  return !0;
}
function ys(e, t, n) {
  br(e) && n.delete(t);
}
function Fd() {
  Ni = !1, st !== null && br(st) && (st = null), at !== null && br(at) && (at = null), ut !== null && br(ut) && (ut = null), An.forEach(ys), Bn.forEach(ys);
}
function xn(e, t) {
  e.blockedOn === t && (e.blockedOn = null, Ni || (Ni = !0, Se.unstable_scheduleCallback(Se.unstable_NormalPriority, Fd)));
}
function Wn(e) {
  function t(l) {
    return xn(l, e);
  }
  if (0 < yr.length) {
    xn(yr[0], e);
    for (var n = 1; n < yr.length; n++) {
      var r = yr[n];
      r.blockedOn === e && (r.blockedOn = null);
    }
  }
  for (st !== null && xn(st, e), at !== null && xn(at, e), ut !== null && xn(ut, e), An.forEach(t), Bn.forEach(t), n = 0; n < rt.length; n++) r = rt[n], r.blockedOn === e && (r.blockedOn = null);
  for (; 0 < rt.length && (n = rt[0], n.blockedOn === null); ) uu(n), n.blockedOn === null && rt.shift();
}
var qt = qe.ReactCurrentBatchConfig, Kr = !0;
function Id(e, t, n, r) {
  var l = F, i = qt.transition;
  qt.transition = null;
  try {
    F = 1, wo(e, t, n, r);
  } finally {
    F = l, qt.transition = i;
  }
}
function Ud(e, t, n, r) {
  var l = F, i = qt.transition;
  qt.transition = null;
  try {
    F = 4, wo(e, t, n, r);
  } finally {
    F = l, qt.transition = i;
  }
}
function wo(e, t, n, r) {
  if (Kr) {
    var l = Ci(e, t, n, r);
    if (l === null) Xl(e, t, r, Gr, n), vs(e, r);
    else if (Dd(l, e, t, n, r)) r.stopPropagation();
    else if (vs(e, r), t & 4 && -1 < Od.indexOf(e)) {
      for (; l !== null; ) {
        var i = sr(l);
        if (i !== null && iu(i), i = Ci(e, t, n, r), i === null && Xl(e, t, r, Gr, n), i === l) break;
        l = i;
      }
      l !== null && r.stopPropagation();
    } else Xl(e, t, r, null, n);
  }
}
var Gr = null;
function Ci(e, t, n, r) {
  if (Gr = null, e = go(r), e = _t(e), e !== null) if (t = Ot(e), t === null) e = null;
  else if (n = t.tag, n === 13) {
    if (e = Za(t), e !== null) return e;
    e = null;
  } else if (n === 3) {
    if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
    e = null;
  } else t !== e && (e = null);
  return Gr = e, null;
}
function cu(e) {
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
      switch (Ed()) {
        case vo:
          return 1;
        case tu:
          return 4;
        case Qr:
        case zd:
          return 16;
        case nu:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var it = null, ko = null, Tr = null;
function du() {
  if (Tr) return Tr;
  var e, t = ko, n = t.length, r, l = "value" in it ? it.value : it.textContent, i = l.length;
  for (e = 0; e < n && t[e] === l[e]; e++) ;
  var o = n - e;
  for (r = 1; r <= o && t[n - r] === l[i - r]; r++) ;
  return Tr = l.slice(e, 1 < r ? 1 - r : void 0);
}
function Lr(e) {
  var t = e.keyCode;
  return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
}
function xr() {
  return !0;
}
function xs() {
  return !1;
}
function _e(e) {
  function t(n, r, l, i, o) {
    this._reactName = n, this._targetInst = l, this.type = r, this.nativeEvent = i, this.target = o, this.currentTarget = null;
    for (var a in e) e.hasOwnProperty(a) && (n = e[a], this[a] = n ? n(i) : i[a]);
    return this.isDefaultPrevented = (i.defaultPrevented != null ? i.defaultPrevented : i.returnValue === !1) ? xr : xs, this.isPropagationStopped = xs, this;
  }
  return H(t.prototype, { preventDefault: function() {
    this.defaultPrevented = !0;
    var n = this.nativeEvent;
    n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = xr);
  }, stopPropagation: function() {
    var n = this.nativeEvent;
    n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = xr);
  }, persist: function() {
  }, isPersistent: xr }), t;
}
var fn = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(e) {
  return e.timeStamp || Date.now();
}, defaultPrevented: 0, isTrusted: 0 }, So = _e(fn), or = H({}, fn, { view: 0, detail: 0 }), Ad = _e(or), Al, Bl, wn, ml = H({}, or, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: jo, button: 0, buttons: 0, relatedTarget: function(e) {
  return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
}, movementX: function(e) {
  return "movementX" in e ? e.movementX : (e !== wn && (wn && e.type === "mousemove" ? (Al = e.screenX - wn.screenX, Bl = e.screenY - wn.screenY) : Bl = Al = 0, wn = e), Al);
}, movementY: function(e) {
  return "movementY" in e ? e.movementY : Bl;
} }), ws = _e(ml), Bd = H({}, ml, { dataTransfer: 0 }), Wd = _e(Bd), Vd = H({}, or, { relatedTarget: 0 }), Wl = _e(Vd), Qd = H({}, fn, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Hd = _e(Qd), Kd = H({}, fn, { clipboardData: function(e) {
  return "clipboardData" in e ? e.clipboardData : window.clipboardData;
} }), Gd = _e(Kd), Yd = H({}, fn, { data: 0 }), ks = _e(Yd), Xd = {
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
}, Zd = {
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
}, Jd = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function qd(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = Jd[e]) ? !!t[e] : !1;
}
function jo() {
  return qd;
}
var ef = H({}, or, { key: function(e) {
  if (e.key) {
    var t = Xd[e.key] || e.key;
    if (t !== "Unidentified") return t;
  }
  return e.type === "keypress" ? (e = Lr(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Zd[e.keyCode] || "Unidentified" : "";
}, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: jo, charCode: function(e) {
  return e.type === "keypress" ? Lr(e) : 0;
}, keyCode: function(e) {
  return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
}, which: function(e) {
  return e.type === "keypress" ? Lr(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
} }), tf = _e(ef), nf = H({}, ml, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), Ss = _e(nf), rf = H({}, or, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: jo }), lf = _e(rf), of = H({}, fn, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), sf = _e(of), af = H({}, ml, {
  deltaX: function(e) {
    return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
  },
  deltaY: function(e) {
    return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), uf = _e(af), cf = [9, 13, 27, 32], _o = Ye && "CompositionEvent" in window, $n = null;
Ye && "documentMode" in document && ($n = document.documentMode);
var df = Ye && "TextEvent" in window && !$n, fu = Ye && (!_o || $n && 8 < $n && 11 >= $n), js = " ", _s = !1;
function pu(e, t) {
  switch (e) {
    case "keyup":
      return cf.indexOf(t.keyCode) !== -1;
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
function hu(e) {
  return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
}
var Ut = !1;
function ff(e, t) {
  switch (e) {
    case "compositionend":
      return hu(t);
    case "keypress":
      return t.which !== 32 ? null : (_s = !0, js);
    case "textInput":
      return e = t.data, e === js && _s ? null : e;
    default:
      return null;
  }
}
function pf(e, t) {
  if (Ut) return e === "compositionend" || !_o && pu(e, t) ? (e = du(), Tr = ko = it = null, Ut = !1, e) : null;
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
      return fu && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var hf = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
function Ns(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!hf[e.type] : t === "textarea";
}
function mu(e, t, n, r) {
  Ha(r), t = Yr(t, "onChange"), 0 < t.length && (n = new So("onChange", "change", null, n, r), e.push({ event: n, listeners: t }));
}
var bn = null, Vn = null;
function mf(e) {
  Cu(e, 0);
}
function gl(e) {
  var t = Wt(e);
  if (Ia(t)) return e;
}
function gf(e, t) {
  if (e === "change") return t;
}
var gu = !1;
if (Ye) {
  var Vl;
  if (Ye) {
    var Ql = "oninput" in document;
    if (!Ql) {
      var Cs = document.createElement("div");
      Cs.setAttribute("oninput", "return;"), Ql = typeof Cs.oninput == "function";
    }
    Vl = Ql;
  } else Vl = !1;
  gu = Vl && (!document.documentMode || 9 < document.documentMode);
}
function Es() {
  bn && (bn.detachEvent("onpropertychange", vu), Vn = bn = null);
}
function vu(e) {
  if (e.propertyName === "value" && gl(Vn)) {
    var t = [];
    mu(t, Vn, e, go(e)), Xa(mf, t);
  }
}
function vf(e, t, n) {
  e === "focusin" ? (Es(), bn = t, Vn = n, bn.attachEvent("onpropertychange", vu)) : e === "focusout" && Es();
}
function yf(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown") return gl(Vn);
}
function xf(e, t) {
  if (e === "click") return gl(t);
}
function wf(e, t) {
  if (e === "input" || e === "change") return gl(t);
}
function kf(e, t) {
  return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
}
var De = typeof Object.is == "function" ? Object.is : kf;
function Qn(e, t) {
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
function zs(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function Ps(e, t) {
  var n = zs(e);
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
    n = zs(n);
  }
}
function yu(e, t) {
  return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? yu(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
}
function xu() {
  for (var e = window, t = Br(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var n = typeof t.contentWindow.location.href == "string";
    } catch {
      n = !1;
    }
    if (n) e = t.contentWindow;
    else break;
    t = Br(e.document);
  }
  return t;
}
function No(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
}
function Sf(e) {
  var t = xu(), n = e.focusedElem, r = e.selectionRange;
  if (t !== n && n && n.ownerDocument && yu(n.ownerDocument.documentElement, n)) {
    if (r !== null && No(n)) {
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
var jf = Ye && "documentMode" in document && 11 >= document.documentMode, At = null, Ei = null, Tn = null, zi = !1;
function $s(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  zi || At == null || At !== Br(r) || (r = At, "selectionStart" in r && No(r) ? r = { start: r.selectionStart, end: r.selectionEnd } : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = { anchorNode: r.anchorNode, anchorOffset: r.anchorOffset, focusNode: r.focusNode, focusOffset: r.focusOffset }), Tn && Qn(Tn, r) || (Tn = r, r = Yr(Ei, "onSelect"), 0 < r.length && (t = new So("onSelect", "select", null, t, n), e.push({ event: t, listeners: r }), t.target = At)));
}
function wr(e, t) {
  var n = {};
  return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
}
var Bt = { animationend: wr("Animation", "AnimationEnd"), animationiteration: wr("Animation", "AnimationIteration"), animationstart: wr("Animation", "AnimationStart"), transitionend: wr("Transition", "TransitionEnd") }, Hl = {}, wu = {};
Ye && (wu = document.createElement("div").style, "AnimationEvent" in window || (delete Bt.animationend.animation, delete Bt.animationiteration.animation, delete Bt.animationstart.animation), "TransitionEvent" in window || delete Bt.transitionend.transition);
function vl(e) {
  if (Hl[e]) return Hl[e];
  if (!Bt[e]) return e;
  var t = Bt[e], n;
  for (n in t) if (t.hasOwnProperty(n) && n in wu) return Hl[e] = t[n];
  return e;
}
var ku = vl("animationend"), Su = vl("animationiteration"), ju = vl("animationstart"), _u = vl("transitionend"), Nu = /* @__PURE__ */ new Map(), bs = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function vt(e, t) {
  Nu.set(e, t), Mt(t, [e]);
}
for (var Kl = 0; Kl < bs.length; Kl++) {
  var Gl = bs[Kl], _f = Gl.toLowerCase(), Nf = Gl[0].toUpperCase() + Gl.slice(1);
  vt(_f, "on" + Nf);
}
vt(ku, "onAnimationEnd");
vt(Su, "onAnimationIteration");
vt(ju, "onAnimationStart");
vt("dblclick", "onDoubleClick");
vt("focusin", "onFocus");
vt("focusout", "onBlur");
vt(_u, "onTransitionEnd");
rn("onMouseEnter", ["mouseout", "mouseover"]);
rn("onMouseLeave", ["mouseout", "mouseover"]);
rn("onPointerEnter", ["pointerout", "pointerover"]);
rn("onPointerLeave", ["pointerout", "pointerover"]);
Mt("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
Mt("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
Mt("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
Mt("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
Mt("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
Mt("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var En = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), Cf = new Set("cancel close invalid load scroll toggle".split(" ").concat(En));
function Ts(e, t, n) {
  var r = e.type || "unknown-event";
  e.currentTarget = n, jd(r, t, void 0, e), e.currentTarget = null;
}
function Cu(e, t) {
  t = (t & 4) !== 0;
  for (var n = 0; n < e.length; n++) {
    var r = e[n], l = r.event;
    r = r.listeners;
    e: {
      var i = void 0;
      if (t) for (var o = r.length - 1; 0 <= o; o--) {
        var a = r[o], u = a.instance, c = a.currentTarget;
        if (a = a.listener, u !== i && l.isPropagationStopped()) break e;
        Ts(l, a, c), i = u;
      }
      else for (o = 0; o < r.length; o++) {
        if (a = r[o], u = a.instance, c = a.currentTarget, a = a.listener, u !== i && l.isPropagationStopped()) break e;
        Ts(l, a, c), i = u;
      }
    }
  }
  if (Vr) throw e = ji, Vr = !1, ji = null, e;
}
function U(e, t) {
  var n = t[Li];
  n === void 0 && (n = t[Li] = /* @__PURE__ */ new Set());
  var r = e + "__bubble";
  n.has(r) || (Eu(t, e, 2, !1), n.add(r));
}
function Yl(e, t, n) {
  var r = 0;
  t && (r |= 4), Eu(n, e, r, t);
}
var kr = "_reactListening" + Math.random().toString(36).slice(2);
function Hn(e) {
  if (!e[kr]) {
    e[kr] = !0, Ra.forEach(function(n) {
      n !== "selectionchange" && (Cf.has(n) || Yl(n, !1, e), Yl(n, !0, e));
    });
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[kr] || (t[kr] = !0, Yl("selectionchange", !1, t));
  }
}
function Eu(e, t, n, r) {
  switch (cu(t)) {
    case 1:
      var l = Id;
      break;
    case 4:
      l = Ud;
      break;
    default:
      l = wo;
  }
  n = l.bind(null, t, n, e), l = void 0, !Si || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (l = !0), r ? l !== void 0 ? e.addEventListener(t, n, { capture: !0, passive: l }) : e.addEventListener(t, n, !0) : l !== void 0 ? e.addEventListener(t, n, { passive: l }) : e.addEventListener(t, n, !1);
}
function Xl(e, t, n, r, l) {
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
        if (o = _t(a), o === null) return;
        if (u = o.tag, u === 5 || u === 6) {
          r = i = o;
          continue e;
        }
        a = a.parentNode;
      }
    }
    r = r.return;
  }
  Xa(function() {
    var c = i, m = go(n), g = [];
    e: {
      var h = Nu.get(e);
      if (h !== void 0) {
        var y = So, x = e;
        switch (e) {
          case "keypress":
            if (Lr(n) === 0) break e;
          case "keydown":
          case "keyup":
            y = tf;
            break;
          case "focusin":
            x = "focus", y = Wl;
            break;
          case "focusout":
            x = "blur", y = Wl;
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
            y = ws;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            y = Wd;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            y = lf;
            break;
          case ku:
          case Su:
          case ju:
            y = Hd;
            break;
          case _u:
            y = sf;
            break;
          case "scroll":
            y = Ad;
            break;
          case "wheel":
            y = uf;
            break;
          case "copy":
          case "cut":
          case "paste":
            y = Gd;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            y = Ss;
        }
        var S = (t & 4) !== 0, N = !S && e === "scroll", f = S ? h !== null ? h + "Capture" : null : h;
        S = [];
        for (var d = c, p; d !== null; ) {
          p = d;
          var v = p.stateNode;
          if (p.tag === 5 && v !== null && (p = v, f !== null && (v = Un(d, f), v != null && S.push(Kn(d, v, p)))), N) break;
          d = d.return;
        }
        0 < S.length && (h = new y(h, x, null, n, m), g.push({ event: h, listeners: S }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (h = e === "mouseover" || e === "pointerover", y = e === "mouseout" || e === "pointerout", h && n !== wi && (x = n.relatedTarget || n.fromElement) && (_t(x) || x[Xe])) break e;
        if ((y || h) && (h = m.window === m ? m : (h = m.ownerDocument) ? h.defaultView || h.parentWindow : window, y ? (x = n.relatedTarget || n.toElement, y = c, x = x ? _t(x) : null, x !== null && (N = Ot(x), x !== N || x.tag !== 5 && x.tag !== 6) && (x = null)) : (y = null, x = c), y !== x)) {
          if (S = ws, v = "onMouseLeave", f = "onMouseEnter", d = "mouse", (e === "pointerout" || e === "pointerover") && (S = Ss, v = "onPointerLeave", f = "onPointerEnter", d = "pointer"), N = y == null ? h : Wt(y), p = x == null ? h : Wt(x), h = new S(v, d + "leave", y, n, m), h.target = N, h.relatedTarget = p, v = null, _t(m) === c && (S = new S(f, d + "enter", x, n, m), S.target = p, S.relatedTarget = N, v = S), N = v, y && x) t: {
            for (S = y, f = x, d = 0, p = S; p; p = Dt(p)) d++;
            for (p = 0, v = f; v; v = Dt(v)) p++;
            for (; 0 < d - p; ) S = Dt(S), d--;
            for (; 0 < p - d; ) f = Dt(f), p--;
            for (; d--; ) {
              if (S === f || f !== null && S === f.alternate) break t;
              S = Dt(S), f = Dt(f);
            }
            S = null;
          }
          else S = null;
          y !== null && Ls(g, h, y, S, !1), x !== null && N !== null && Ls(g, N, x, S, !0);
        }
      }
      e: {
        if (h = c ? Wt(c) : window, y = h.nodeName && h.nodeName.toLowerCase(), y === "select" || y === "input" && h.type === "file") var k = gf;
        else if (Ns(h)) if (gu) k = wf;
        else {
          k = yf;
          var E = vf;
        }
        else (y = h.nodeName) && y.toLowerCase() === "input" && (h.type === "checkbox" || h.type === "radio") && (k = xf);
        if (k && (k = k(e, c))) {
          mu(g, k, n, m);
          break e;
        }
        E && E(e, h, c), e === "focusout" && (E = h._wrapperState) && E.controlled && h.type === "number" && mi(h, "number", h.value);
      }
      switch (E = c ? Wt(c) : window, e) {
        case "focusin":
          (Ns(E) || E.contentEditable === "true") && (At = E, Ei = c, Tn = null);
          break;
        case "focusout":
          Tn = Ei = At = null;
          break;
        case "mousedown":
          zi = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          zi = !1, $s(g, n, m);
          break;
        case "selectionchange":
          if (jf) break;
        case "keydown":
        case "keyup":
          $s(g, n, m);
      }
      var C;
      if (_o) e: {
        switch (e) {
          case "compositionstart":
            var j = "onCompositionStart";
            break e;
          case "compositionend":
            j = "onCompositionEnd";
            break e;
          case "compositionupdate":
            j = "onCompositionUpdate";
            break e;
        }
        j = void 0;
      }
      else Ut ? pu(e, n) && (j = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (j = "onCompositionStart");
      j && (fu && n.locale !== "ko" && (Ut || j !== "onCompositionStart" ? j === "onCompositionEnd" && Ut && (C = du()) : (it = m, ko = "value" in it ? it.value : it.textContent, Ut = !0)), E = Yr(c, j), 0 < E.length && (j = new ks(j, e, null, n, m), g.push({ event: j, listeners: E }), C ? j.data = C : (C = hu(n), C !== null && (j.data = C)))), (C = df ? ff(e, n) : pf(e, n)) && (c = Yr(c, "onBeforeInput"), 0 < c.length && (m = new ks("onBeforeInput", "beforeinput", null, n, m), g.push({ event: m, listeners: c }), m.data = C));
    }
    Cu(g, t);
  });
}
function Kn(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function Yr(e, t) {
  for (var n = t + "Capture", r = []; e !== null; ) {
    var l = e, i = l.stateNode;
    l.tag === 5 && i !== null && (l = i, i = Un(e, n), i != null && r.unshift(Kn(e, i, l)), i = Un(e, t), i != null && r.push(Kn(e, i, l))), e = e.return;
  }
  return r;
}
function Dt(e) {
  if (e === null) return null;
  do
    e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function Ls(e, t, n, r, l) {
  for (var i = t._reactName, o = []; n !== null && n !== r; ) {
    var a = n, u = a.alternate, c = a.stateNode;
    if (u !== null && u === r) break;
    a.tag === 5 && c !== null && (a = c, l ? (u = Un(n, i), u != null && o.unshift(Kn(n, u, a))) : l || (u = Un(n, i), u != null && o.push(Kn(n, u, a)))), n = n.return;
  }
  o.length !== 0 && e.push({ event: t, listeners: o });
}
var Ef = /\r\n?/g, zf = /\u0000|\uFFFD/g;
function Rs(e) {
  return (typeof e == "string" ? e : "" + e).replace(Ef, `
`).replace(zf, "");
}
function Sr(e, t, n) {
  if (t = Rs(t), Rs(e) !== t && n) throw Error(_(425));
}
function Xr() {
}
var Pi = null, $i = null;
function bi(e, t) {
  return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
}
var Ti = typeof setTimeout == "function" ? setTimeout : void 0, Pf = typeof clearTimeout == "function" ? clearTimeout : void 0, Ms = typeof Promise == "function" ? Promise : void 0, $f = typeof queueMicrotask == "function" ? queueMicrotask : typeof Ms < "u" ? function(e) {
  return Ms.resolve(null).then(e).catch(bf);
} : Ti;
function bf(e) {
  setTimeout(function() {
    throw e;
  });
}
function Zl(e, t) {
  var n = t, r = 0;
  do {
    var l = n.nextSibling;
    if (e.removeChild(n), l && l.nodeType === 8) if (n = l.data, n === "/$") {
      if (r === 0) {
        e.removeChild(l), Wn(t);
        return;
      }
      r--;
    } else n !== "$" && n !== "$?" && n !== "$!" || r++;
    n = l;
  } while (n);
  Wn(t);
}
function ct(e) {
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
function Os(e) {
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
var pn = Math.random().toString(36).slice(2), Ue = "__reactFiber$" + pn, Gn = "__reactProps$" + pn, Xe = "__reactContainer$" + pn, Li = "__reactEvents$" + pn, Tf = "__reactListeners$" + pn, Lf = "__reactHandles$" + pn;
function _t(e) {
  var t = e[Ue];
  if (t) return t;
  for (var n = e.parentNode; n; ) {
    if (t = n[Xe] || n[Ue]) {
      if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = Os(e); e !== null; ) {
        if (n = e[Ue]) return n;
        e = Os(e);
      }
      return t;
    }
    e = n, n = e.parentNode;
  }
  return null;
}
function sr(e) {
  return e = e[Ue] || e[Xe], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e;
}
function Wt(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(_(33));
}
function yl(e) {
  return e[Gn] || null;
}
var Ri = [], Vt = -1;
function yt(e) {
  return { current: e };
}
function A(e) {
  0 > Vt || (e.current = Ri[Vt], Ri[Vt] = null, Vt--);
}
function I(e, t) {
  Vt++, Ri[Vt] = e.current, e.current = t;
}
var gt = {}, ae = yt(gt), me = yt(!1), $t = gt;
function ln(e, t) {
  var n = e.type.contextTypes;
  if (!n) return gt;
  var r = e.stateNode;
  if (r && r.__reactInternalMemoizedUnmaskedChildContext === t) return r.__reactInternalMemoizedMaskedChildContext;
  var l = {}, i;
  for (i in n) l[i] = t[i];
  return r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = t, e.__reactInternalMemoizedMaskedChildContext = l), l;
}
function ge(e) {
  return e = e.childContextTypes, e != null;
}
function Zr() {
  A(me), A(ae);
}
function Ds(e, t, n) {
  if (ae.current !== gt) throw Error(_(168));
  I(ae, t), I(me, n);
}
function zu(e, t, n) {
  var r = e.stateNode;
  if (t = t.childContextTypes, typeof r.getChildContext != "function") return n;
  r = r.getChildContext();
  for (var l in r) if (!(l in t)) throw Error(_(108, gd(e) || "Unknown", l));
  return H({}, n, r);
}
function Jr(e) {
  return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || gt, $t = ae.current, I(ae, e), I(me, me.current), !0;
}
function Fs(e, t, n) {
  var r = e.stateNode;
  if (!r) throw Error(_(169));
  n ? (e = zu(e, t, $t), r.__reactInternalMemoizedMergedChildContext = e, A(me), A(ae), I(ae, e)) : A(me), I(me, n);
}
var Ve = null, xl = !1, Jl = !1;
function Pu(e) {
  Ve === null ? Ve = [e] : Ve.push(e);
}
function Rf(e) {
  xl = !0, Pu(e);
}
function xt() {
  if (!Jl && Ve !== null) {
    Jl = !0;
    var e = 0, t = F;
    try {
      var n = Ve;
      for (F = 1; e < n.length; e++) {
        var r = n[e];
        do
          r = r(!0);
        while (r !== null);
      }
      Ve = null, xl = !1;
    } catch (l) {
      throw Ve !== null && (Ve = Ve.slice(e + 1)), eu(vo, xt), l;
    } finally {
      F = t, Jl = !1;
    }
  }
  return null;
}
var Qt = [], Ht = 0, qr = null, el = 0, Ne = [], Ce = 0, bt = null, Qe = 1, He = "";
function St(e, t) {
  Qt[Ht++] = el, Qt[Ht++] = qr, qr = e, el = t;
}
function $u(e, t, n) {
  Ne[Ce++] = Qe, Ne[Ce++] = He, Ne[Ce++] = bt, bt = e;
  var r = Qe;
  e = He;
  var l = 32 - Me(r) - 1;
  r &= ~(1 << l), n += 1;
  var i = 32 - Me(t) + l;
  if (30 < i) {
    var o = l - l % 5;
    i = (r & (1 << o) - 1).toString(32), r >>= o, l -= o, Qe = 1 << 32 - Me(t) + l | n << l | r, He = i + e;
  } else Qe = 1 << i | n << l | r, He = e;
}
function Co(e) {
  e.return !== null && (St(e, 1), $u(e, 1, 0));
}
function Eo(e) {
  for (; e === qr; ) qr = Qt[--Ht], Qt[Ht] = null, el = Qt[--Ht], Qt[Ht] = null;
  for (; e === bt; ) bt = Ne[--Ce], Ne[Ce] = null, He = Ne[--Ce], Ne[Ce] = null, Qe = Ne[--Ce], Ne[Ce] = null;
}
var ke = null, we = null, W = !1, Re = null;
function bu(e, t) {
  var n = Ee(5, null, null, 0);
  n.elementType = "DELETED", n.stateNode = t, n.return = e, t = e.deletions, t === null ? (e.deletions = [n], e.flags |= 16) : t.push(n);
}
function Is(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t, t !== null ? (e.stateNode = t, ke = e, we = ct(t.firstChild), !0) : !1;
    case 6:
      return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t, t !== null ? (e.stateNode = t, ke = e, we = null, !0) : !1;
    case 13:
      return t = t.nodeType !== 8 ? null : t, t !== null ? (n = bt !== null ? { id: Qe, overflow: He } : null, e.memoizedState = { dehydrated: t, treeContext: n, retryLane: 1073741824 }, n = Ee(18, null, null, 0), n.stateNode = t, n.return = e, e.child = n, ke = e, we = null, !0) : !1;
    default:
      return !1;
  }
}
function Mi(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function Oi(e) {
  if (W) {
    var t = we;
    if (t) {
      var n = t;
      if (!Is(e, t)) {
        if (Mi(e)) throw Error(_(418));
        t = ct(n.nextSibling);
        var r = ke;
        t && Is(e, t) ? bu(r, n) : (e.flags = e.flags & -4097 | 2, W = !1, ke = e);
      }
    } else {
      if (Mi(e)) throw Error(_(418));
      e.flags = e.flags & -4097 | 2, W = !1, ke = e;
    }
  }
}
function Us(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; ) e = e.return;
  ke = e;
}
function jr(e) {
  if (e !== ke) return !1;
  if (!W) return Us(e), W = !0, !1;
  var t;
  if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !bi(e.type, e.memoizedProps)), t && (t = we)) {
    if (Mi(e)) throw Tu(), Error(_(418));
    for (; t; ) bu(e, t), t = ct(t.nextSibling);
  }
  if (Us(e), e.tag === 13) {
    if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(_(317));
    e: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === "/$") {
            if (t === 0) {
              we = ct(e.nextSibling);
              break e;
            }
            t--;
          } else n !== "$" && n !== "$!" && n !== "$?" || t++;
        }
        e = e.nextSibling;
      }
      we = null;
    }
  } else we = ke ? ct(e.stateNode.nextSibling) : null;
  return !0;
}
function Tu() {
  for (var e = we; e; ) e = ct(e.nextSibling);
}
function on() {
  we = ke = null, W = !1;
}
function zo(e) {
  Re === null ? Re = [e] : Re.push(e);
}
var Mf = qe.ReactCurrentBatchConfig;
function kn(e, t, n) {
  if (e = n.ref, e !== null && typeof e != "function" && typeof e != "object") {
    if (n._owner) {
      if (n = n._owner, n) {
        if (n.tag !== 1) throw Error(_(309));
        var r = n.stateNode;
      }
      if (!r) throw Error(_(147, e));
      var l = r, i = "" + e;
      return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === i ? t.ref : (t = function(o) {
        var a = l.refs;
        o === null ? delete a[i] : a[i] = o;
      }, t._stringRef = i, t);
    }
    if (typeof e != "string") throw Error(_(284));
    if (!n._owner) throw Error(_(290, e));
  }
  return e;
}
function _r(e, t) {
  throw e = Object.prototype.toString.call(t), Error(_(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e));
}
function As(e) {
  var t = e._init;
  return t(e._payload);
}
function Lu(e) {
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
    return f = ht(f, d), f.index = 0, f.sibling = null, f;
  }
  function i(f, d, p) {
    return f.index = p, e ? (p = f.alternate, p !== null ? (p = p.index, p < d ? (f.flags |= 2, d) : p) : (f.flags |= 2, d)) : (f.flags |= 1048576, d);
  }
  function o(f) {
    return e && f.alternate === null && (f.flags |= 2), f;
  }
  function a(f, d, p, v) {
    return d === null || d.tag !== 6 ? (d = ii(p, f.mode, v), d.return = f, d) : (d = l(d, p), d.return = f, d);
  }
  function u(f, d, p, v) {
    var k = p.type;
    return k === It ? m(f, d, p.props.children, v, p.key) : d !== null && (d.elementType === k || typeof k == "object" && k !== null && k.$$typeof === tt && As(k) === d.type) ? (v = l(d, p.props), v.ref = kn(f, d, p), v.return = f, v) : (v = Ur(p.type, p.key, p.props, null, f.mode, v), v.ref = kn(f, d, p), v.return = f, v);
  }
  function c(f, d, p, v) {
    return d === null || d.tag !== 4 || d.stateNode.containerInfo !== p.containerInfo || d.stateNode.implementation !== p.implementation ? (d = oi(p, f.mode, v), d.return = f, d) : (d = l(d, p.children || []), d.return = f, d);
  }
  function m(f, d, p, v, k) {
    return d === null || d.tag !== 7 ? (d = Pt(p, f.mode, v, k), d.return = f, d) : (d = l(d, p), d.return = f, d);
  }
  function g(f, d, p) {
    if (typeof d == "string" && d !== "" || typeof d == "number") return d = ii("" + d, f.mode, p), d.return = f, d;
    if (typeof d == "object" && d !== null) {
      switch (d.$$typeof) {
        case pr:
          return p = Ur(d.type, d.key, d.props, null, f.mode, p), p.ref = kn(f, null, d), p.return = f, p;
        case Ft:
          return d = oi(d, f.mode, p), d.return = f, d;
        case tt:
          var v = d._init;
          return g(f, v(d._payload), p);
      }
      if (Nn(d) || gn(d)) return d = Pt(d, f.mode, p, null), d.return = f, d;
      _r(f, d);
    }
    return null;
  }
  function h(f, d, p, v) {
    var k = d !== null ? d.key : null;
    if (typeof p == "string" && p !== "" || typeof p == "number") return k !== null ? null : a(f, d, "" + p, v);
    if (typeof p == "object" && p !== null) {
      switch (p.$$typeof) {
        case pr:
          return p.key === k ? u(f, d, p, v) : null;
        case Ft:
          return p.key === k ? c(f, d, p, v) : null;
        case tt:
          return k = p._init, h(
            f,
            d,
            k(p._payload),
            v
          );
      }
      if (Nn(p) || gn(p)) return k !== null ? null : m(f, d, p, v, null);
      _r(f, p);
    }
    return null;
  }
  function y(f, d, p, v, k) {
    if (typeof v == "string" && v !== "" || typeof v == "number") return f = f.get(p) || null, a(d, f, "" + v, k);
    if (typeof v == "object" && v !== null) {
      switch (v.$$typeof) {
        case pr:
          return f = f.get(v.key === null ? p : v.key) || null, u(d, f, v, k);
        case Ft:
          return f = f.get(v.key === null ? p : v.key) || null, c(d, f, v, k);
        case tt:
          var E = v._init;
          return y(f, d, p, E(v._payload), k);
      }
      if (Nn(v) || gn(v)) return f = f.get(p) || null, m(d, f, v, k, null);
      _r(d, v);
    }
    return null;
  }
  function x(f, d, p, v) {
    for (var k = null, E = null, C = d, j = d = 0, O = null; C !== null && j < p.length; j++) {
      C.index > j ? (O = C, C = null) : O = C.sibling;
      var w = h(f, C, p[j], v);
      if (w === null) {
        C === null && (C = O);
        break;
      }
      e && C && w.alternate === null && t(f, C), d = i(w, d, j), E === null ? k = w : E.sibling = w, E = w, C = O;
    }
    if (j === p.length) return n(f, C), W && St(f, j), k;
    if (C === null) {
      for (; j < p.length; j++) C = g(f, p[j], v), C !== null && (d = i(C, d, j), E === null ? k = C : E.sibling = C, E = C);
      return W && St(f, j), k;
    }
    for (C = r(f, C); j < p.length; j++) O = y(C, f, j, p[j], v), O !== null && (e && O.alternate !== null && C.delete(O.key === null ? j : O.key), d = i(O, d, j), E === null ? k = O : E.sibling = O, E = O);
    return e && C.forEach(function($) {
      return t(f, $);
    }), W && St(f, j), k;
  }
  function S(f, d, p, v) {
    var k = gn(p);
    if (typeof k != "function") throw Error(_(150));
    if (p = k.call(p), p == null) throw Error(_(151));
    for (var E = k = null, C = d, j = d = 0, O = null, w = p.next(); C !== null && !w.done; j++, w = p.next()) {
      C.index > j ? (O = C, C = null) : O = C.sibling;
      var $ = h(f, C, w.value, v);
      if ($ === null) {
        C === null && (C = O);
        break;
      }
      e && C && $.alternate === null && t(f, C), d = i($, d, j), E === null ? k = $ : E.sibling = $, E = $, C = O;
    }
    if (w.done) return n(
      f,
      C
    ), W && St(f, j), k;
    if (C === null) {
      for (; !w.done; j++, w = p.next()) w = g(f, w.value, v), w !== null && (d = i(w, d, j), E === null ? k = w : E.sibling = w, E = w);
      return W && St(f, j), k;
    }
    for (C = r(f, C); !w.done; j++, w = p.next()) w = y(C, f, j, w.value, v), w !== null && (e && w.alternate !== null && C.delete(w.key === null ? j : w.key), d = i(w, d, j), E === null ? k = w : E.sibling = w, E = w);
    return e && C.forEach(function(B) {
      return t(f, B);
    }), W && St(f, j), k;
  }
  function N(f, d, p, v) {
    if (typeof p == "object" && p !== null && p.type === It && p.key === null && (p = p.props.children), typeof p == "object" && p !== null) {
      switch (p.$$typeof) {
        case pr:
          e: {
            for (var k = p.key, E = d; E !== null; ) {
              if (E.key === k) {
                if (k = p.type, k === It) {
                  if (E.tag === 7) {
                    n(f, E.sibling), d = l(E, p.props.children), d.return = f, f = d;
                    break e;
                  }
                } else if (E.elementType === k || typeof k == "object" && k !== null && k.$$typeof === tt && As(k) === E.type) {
                  n(f, E.sibling), d = l(E, p.props), d.ref = kn(f, E, p), d.return = f, f = d;
                  break e;
                }
                n(f, E);
                break;
              } else t(f, E);
              E = E.sibling;
            }
            p.type === It ? (d = Pt(p.props.children, f.mode, v, p.key), d.return = f, f = d) : (v = Ur(p.type, p.key, p.props, null, f.mode, v), v.ref = kn(f, d, p), v.return = f, f = v);
          }
          return o(f);
        case Ft:
          e: {
            for (E = p.key; d !== null; ) {
              if (d.key === E) if (d.tag === 4 && d.stateNode.containerInfo === p.containerInfo && d.stateNode.implementation === p.implementation) {
                n(f, d.sibling), d = l(d, p.children || []), d.return = f, f = d;
                break e;
              } else {
                n(f, d);
                break;
              }
              else t(f, d);
              d = d.sibling;
            }
            d = oi(p, f.mode, v), d.return = f, f = d;
          }
          return o(f);
        case tt:
          return E = p._init, N(f, d, E(p._payload), v);
      }
      if (Nn(p)) return x(f, d, p, v);
      if (gn(p)) return S(f, d, p, v);
      _r(f, p);
    }
    return typeof p == "string" && p !== "" || typeof p == "number" ? (p = "" + p, d !== null && d.tag === 6 ? (n(f, d.sibling), d = l(d, p), d.return = f, f = d) : (n(f, d), d = ii(p, f.mode, v), d.return = f, f = d), o(f)) : n(f, d);
  }
  return N;
}
var sn = Lu(!0), Ru = Lu(!1), tl = yt(null), nl = null, Kt = null, Po = null;
function $o() {
  Po = Kt = nl = null;
}
function bo(e) {
  var t = tl.current;
  A(tl), e._currentValue = t;
}
function Di(e, t, n) {
  for (; e !== null; ) {
    var r = e.alternate;
    if ((e.childLanes & t) !== t ? (e.childLanes |= t, r !== null && (r.childLanes |= t)) : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t), e === n) break;
    e = e.return;
  }
}
function en(e, t) {
  nl = e, Po = Kt = null, e = e.dependencies, e !== null && e.firstContext !== null && (e.lanes & t && (he = !0), e.firstContext = null);
}
function Pe(e) {
  var t = e._currentValue;
  if (Po !== e) if (e = { context: e, memoizedValue: t, next: null }, Kt === null) {
    if (nl === null) throw Error(_(308));
    Kt = e, nl.dependencies = { lanes: 0, firstContext: e };
  } else Kt = Kt.next = e;
  return t;
}
var Nt = null;
function To(e) {
  Nt === null ? Nt = [e] : Nt.push(e);
}
function Mu(e, t, n, r) {
  var l = t.interleaved;
  return l === null ? (n.next = n, To(t)) : (n.next = l.next, l.next = n), t.interleaved = n, Ze(e, r);
}
function Ze(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; ) e.childLanes |= t, n = e.alternate, n !== null && (n.childLanes |= t), n = e, e = e.return;
  return n.tag === 3 ? n.stateNode : null;
}
var nt = !1;
function Lo(e) {
  e.updateQueue = { baseState: e.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
}
function Ou(e, t) {
  e = e.updateQueue, t.updateQueue === e && (t.updateQueue = { baseState: e.baseState, firstBaseUpdate: e.firstBaseUpdate, lastBaseUpdate: e.lastBaseUpdate, shared: e.shared, effects: e.effects });
}
function Ge(e, t) {
  return { eventTime: e, lane: t, tag: 0, payload: null, callback: null, next: null };
}
function dt(e, t, n) {
  var r = e.updateQueue;
  if (r === null) return null;
  if (r = r.shared, D & 2) {
    var l = r.pending;
    return l === null ? t.next = t : (t.next = l.next, l.next = t), r.pending = t, Ze(e, n);
  }
  return l = r.interleaved, l === null ? (t.next = t, To(r)) : (t.next = l.next, l.next = t), r.interleaved = t, Ze(e, n);
}
function Rr(e, t, n) {
  if (t = t.updateQueue, t !== null && (t = t.shared, (n & 4194240) !== 0)) {
    var r = t.lanes;
    r &= e.pendingLanes, n |= r, t.lanes = n, yo(e, n);
  }
}
function Bs(e, t) {
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
function rl(e, t, n, r) {
  var l = e.updateQueue;
  nt = !1;
  var i = l.firstBaseUpdate, o = l.lastBaseUpdate, a = l.shared.pending;
  if (a !== null) {
    l.shared.pending = null;
    var u = a, c = u.next;
    u.next = null, o === null ? i = c : o.next = c, o = u;
    var m = e.alternate;
    m !== null && (m = m.updateQueue, a = m.lastBaseUpdate, a !== o && (a === null ? m.firstBaseUpdate = c : a.next = c, m.lastBaseUpdate = u));
  }
  if (i !== null) {
    var g = l.baseState;
    o = 0, m = c = u = null, a = i;
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
          var x = e, S = a;
          switch (h = t, y = n, S.tag) {
            case 1:
              if (x = S.payload, typeof x == "function") {
                g = x.call(y, g, h);
                break e;
              }
              g = x;
              break e;
            case 3:
              x.flags = x.flags & -65537 | 128;
            case 0:
              if (x = S.payload, h = typeof x == "function" ? x.call(y, g, h) : x, h == null) break e;
              g = H({}, g, h);
              break e;
            case 2:
              nt = !0;
          }
        }
        a.callback !== null && a.lane !== 0 && (e.flags |= 64, h = l.effects, h === null ? l.effects = [a] : h.push(a));
      } else y = { eventTime: y, lane: h, tag: a.tag, payload: a.payload, callback: a.callback, next: null }, m === null ? (c = m = y, u = g) : m = m.next = y, o |= h;
      if (a = a.next, a === null) {
        if (a = l.shared.pending, a === null) break;
        h = a, a = h.next, h.next = null, l.lastBaseUpdate = h, l.shared.pending = null;
      }
    } while (!0);
    if (m === null && (u = g), l.baseState = u, l.firstBaseUpdate = c, l.lastBaseUpdate = m, t = l.shared.interleaved, t !== null) {
      l = t;
      do
        o |= l.lane, l = l.next;
      while (l !== t);
    } else i === null && (l.shared.lanes = 0);
    Lt |= o, e.lanes = o, e.memoizedState = g;
  }
}
function Ws(e, t, n) {
  if (e = t.effects, t.effects = null, e !== null) for (t = 0; t < e.length; t++) {
    var r = e[t], l = r.callback;
    if (l !== null) {
      if (r.callback = null, r = n, typeof l != "function") throw Error(_(191, l));
      l.call(r);
    }
  }
}
var ar = {}, Be = yt(ar), Yn = yt(ar), Xn = yt(ar);
function Ct(e) {
  if (e === ar) throw Error(_(174));
  return e;
}
function Ro(e, t) {
  switch (I(Xn, t), I(Yn, e), I(Be, ar), e = t.nodeType, e) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : vi(null, "");
      break;
    default:
      e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = vi(t, e);
  }
  A(Be), I(Be, t);
}
function an() {
  A(Be), A(Yn), A(Xn);
}
function Du(e) {
  Ct(Xn.current);
  var t = Ct(Be.current), n = vi(t, e.type);
  t !== n && (I(Yn, e), I(Be, n));
}
function Mo(e) {
  Yn.current === e && (A(Be), A(Yn));
}
var V = yt(0);
function ll(e) {
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
function Oo() {
  for (var e = 0; e < ql.length; e++) ql[e]._workInProgressVersionPrimary = null;
  ql.length = 0;
}
var Mr = qe.ReactCurrentDispatcher, ei = qe.ReactCurrentBatchConfig, Tt = 0, Q = null, Z = null, ee = null, il = !1, Ln = !1, Zn = 0, Of = 0;
function ie() {
  throw Error(_(321));
}
function Do(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++) if (!De(e[n], t[n])) return !1;
  return !0;
}
function Fo(e, t, n, r, l, i) {
  if (Tt = i, Q = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, Mr.current = e === null || e.memoizedState === null ? Uf : Af, e = n(r, l), Ln) {
    i = 0;
    do {
      if (Ln = !1, Zn = 0, 25 <= i) throw Error(_(301));
      i += 1, ee = Z = null, t.updateQueue = null, Mr.current = Bf, e = n(r, l);
    } while (Ln);
  }
  if (Mr.current = ol, t = Z !== null && Z.next !== null, Tt = 0, ee = Z = Q = null, il = !1, t) throw Error(_(300));
  return e;
}
function Io() {
  var e = Zn !== 0;
  return Zn = 0, e;
}
function Ie() {
  var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
  return ee === null ? Q.memoizedState = ee = e : ee = ee.next = e, ee;
}
function $e() {
  if (Z === null) {
    var e = Q.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = Z.next;
  var t = ee === null ? Q.memoizedState : ee.next;
  if (t !== null) ee = t, Z = e;
  else {
    if (e === null) throw Error(_(310));
    Z = e, e = { memoizedState: Z.memoizedState, baseState: Z.baseState, baseQueue: Z.baseQueue, queue: Z.queue, next: null }, ee === null ? Q.memoizedState = ee = e : ee = ee.next = e;
  }
  return ee;
}
function Jn(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function ti(e) {
  var t = $e(), n = t.queue;
  if (n === null) throw Error(_(311));
  n.lastRenderedReducer = e;
  var r = Z, l = r.baseQueue, i = n.pending;
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
      var m = c.lane;
      if ((Tt & m) === m) u !== null && (u = u.next = { lane: 0, action: c.action, hasEagerState: c.hasEagerState, eagerState: c.eagerState, next: null }), r = c.hasEagerState ? c.eagerState : e(r, c.action);
      else {
        var g = {
          lane: m,
          action: c.action,
          hasEagerState: c.hasEagerState,
          eagerState: c.eagerState,
          next: null
        };
        u === null ? (a = u = g, o = r) : u = u.next = g, Q.lanes |= m, Lt |= m;
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
  if (n === null) throw Error(_(311));
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
function Fu() {
}
function Iu(e, t) {
  var n = Q, r = $e(), l = t(), i = !De(r.memoizedState, l);
  if (i && (r.memoizedState = l, he = !0), r = r.queue, Uo(Bu.bind(null, n, r, e), [e]), r.getSnapshot !== t || i || ee !== null && ee.memoizedState.tag & 1) {
    if (n.flags |= 2048, qn(9, Au.bind(null, n, r, l, t), void 0, null), te === null) throw Error(_(349));
    Tt & 30 || Uu(n, t, l);
  }
  return l;
}
function Uu(e, t, n) {
  e.flags |= 16384, e = { getSnapshot: t, value: n }, t = Q.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, Q.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
}
function Au(e, t, n, r) {
  t.value = n, t.getSnapshot = r, Wu(t) && Vu(e);
}
function Bu(e, t, n) {
  return n(function() {
    Wu(t) && Vu(e);
  });
}
function Wu(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !De(e, n);
  } catch {
    return !0;
  }
}
function Vu(e) {
  var t = Ze(e, 1);
  t !== null && Oe(t, e, 1, -1);
}
function Vs(e) {
  var t = Ie();
  return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: Jn, lastRenderedState: e }, t.queue = e, e = e.dispatch = If.bind(null, Q, e), [t.memoizedState, e];
}
function qn(e, t, n, r) {
  return e = { tag: e, create: t, destroy: n, deps: r, next: null }, t = Q.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, Q.updateQueue = t, t.lastEffect = e.next = e) : (n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e)), e;
}
function Qu() {
  return $e().memoizedState;
}
function Or(e, t, n, r) {
  var l = Ie();
  Q.flags |= e, l.memoizedState = qn(1 | t, n, void 0, r === void 0 ? null : r);
}
function wl(e, t, n, r) {
  var l = $e();
  r = r === void 0 ? null : r;
  var i = void 0;
  if (Z !== null) {
    var o = Z.memoizedState;
    if (i = o.destroy, r !== null && Do(r, o.deps)) {
      l.memoizedState = qn(t, n, i, r);
      return;
    }
  }
  Q.flags |= e, l.memoizedState = qn(1 | t, n, i, r);
}
function Qs(e, t) {
  return Or(8390656, 8, e, t);
}
function Uo(e, t) {
  return wl(2048, 8, e, t);
}
function Hu(e, t) {
  return wl(4, 2, e, t);
}
function Ku(e, t) {
  return wl(4, 4, e, t);
}
function Gu(e, t) {
  if (typeof t == "function") return e = e(), t(e), function() {
    t(null);
  };
  if (t != null) return e = e(), t.current = e, function() {
    t.current = null;
  };
}
function Yu(e, t, n) {
  return n = n != null ? n.concat([e]) : null, wl(4, 4, Gu.bind(null, t, e), n);
}
function Ao() {
}
function Xu(e, t) {
  var n = $e();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && Do(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
}
function Zu(e, t) {
  var n = $e();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && Do(t, r[1]) ? r[0] : (e = e(), n.memoizedState = [e, t], e);
}
function Ju(e, t, n) {
  return Tt & 21 ? (De(n, t) || (n = ru(), Q.lanes |= n, Lt |= n, e.baseState = !0), t) : (e.baseState && (e.baseState = !1, he = !0), e.memoizedState = n);
}
function Df(e, t) {
  var n = F;
  F = n !== 0 && 4 > n ? n : 4, e(!0);
  var r = ei.transition;
  ei.transition = {};
  try {
    e(!1), t();
  } finally {
    F = n, ei.transition = r;
  }
}
function qu() {
  return $e().memoizedState;
}
function Ff(e, t, n) {
  var r = pt(e);
  if (n = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null }, ec(e)) tc(t, n);
  else if (n = Mu(e, t, n, r), n !== null) {
    var l = ce();
    Oe(n, e, r, l), nc(n, t, r);
  }
}
function If(e, t, n) {
  var r = pt(e), l = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (ec(e)) tc(t, l);
  else {
    var i = e.alternate;
    if (e.lanes === 0 && (i === null || i.lanes === 0) && (i = t.lastRenderedReducer, i !== null)) try {
      var o = t.lastRenderedState, a = i(o, n);
      if (l.hasEagerState = !0, l.eagerState = a, De(a, o)) {
        var u = t.interleaved;
        u === null ? (l.next = l, To(t)) : (l.next = u.next, u.next = l), t.interleaved = l;
        return;
      }
    } catch {
    } finally {
    }
    n = Mu(e, t, l, r), n !== null && (l = ce(), Oe(n, e, r, l), nc(n, t, r));
  }
}
function ec(e) {
  var t = e.alternate;
  return e === Q || t !== null && t === Q;
}
function tc(e, t) {
  Ln = il = !0;
  var n = e.pending;
  n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
}
function nc(e, t, n) {
  if (n & 4194240) {
    var r = t.lanes;
    r &= e.pendingLanes, n |= r, t.lanes = n, yo(e, n);
  }
}
var ol = { readContext: Pe, useCallback: ie, useContext: ie, useEffect: ie, useImperativeHandle: ie, useInsertionEffect: ie, useLayoutEffect: ie, useMemo: ie, useReducer: ie, useRef: ie, useState: ie, useDebugValue: ie, useDeferredValue: ie, useTransition: ie, useMutableSource: ie, useSyncExternalStore: ie, useId: ie, unstable_isNewReconciler: !1 }, Uf = { readContext: Pe, useCallback: function(e, t) {
  return Ie().memoizedState = [e, t === void 0 ? null : t], e;
}, useContext: Pe, useEffect: Qs, useImperativeHandle: function(e, t, n) {
  return n = n != null ? n.concat([e]) : null, Or(
    4194308,
    4,
    Gu.bind(null, t, e),
    n
  );
}, useLayoutEffect: function(e, t) {
  return Or(4194308, 4, e, t);
}, useInsertionEffect: function(e, t) {
  return Or(4, 2, e, t);
}, useMemo: function(e, t) {
  var n = Ie();
  return t = t === void 0 ? null : t, e = e(), n.memoizedState = [e, t], e;
}, useReducer: function(e, t, n) {
  var r = Ie();
  return t = n !== void 0 ? n(t) : t, r.memoizedState = r.baseState = t, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: t }, r.queue = e, e = e.dispatch = Ff.bind(null, Q, e), [r.memoizedState, e];
}, useRef: function(e) {
  var t = Ie();
  return e = { current: e }, t.memoizedState = e;
}, useState: Vs, useDebugValue: Ao, useDeferredValue: function(e) {
  return Ie().memoizedState = e;
}, useTransition: function() {
  var e = Vs(!1), t = e[0];
  return e = Df.bind(null, e[1]), Ie().memoizedState = e, [t, e];
}, useMutableSource: function() {
}, useSyncExternalStore: function(e, t, n) {
  var r = Q, l = Ie();
  if (W) {
    if (n === void 0) throw Error(_(407));
    n = n();
  } else {
    if (n = t(), te === null) throw Error(_(349));
    Tt & 30 || Uu(r, t, n);
  }
  l.memoizedState = n;
  var i = { value: n, getSnapshot: t };
  return l.queue = i, Qs(Bu.bind(
    null,
    r,
    i,
    e
  ), [e]), r.flags |= 2048, qn(9, Au.bind(null, r, i, n, t), void 0, null), n;
}, useId: function() {
  var e = Ie(), t = te.identifierPrefix;
  if (W) {
    var n = He, r = Qe;
    n = (r & ~(1 << 32 - Me(r) - 1)).toString(32) + n, t = ":" + t + "R" + n, n = Zn++, 0 < n && (t += "H" + n.toString(32)), t += ":";
  } else n = Of++, t = ":" + t + "r" + n.toString(32) + ":";
  return e.memoizedState = t;
}, unstable_isNewReconciler: !1 }, Af = {
  readContext: Pe,
  useCallback: Xu,
  useContext: Pe,
  useEffect: Uo,
  useImperativeHandle: Yu,
  useInsertionEffect: Hu,
  useLayoutEffect: Ku,
  useMemo: Zu,
  useReducer: ti,
  useRef: Qu,
  useState: function() {
    return ti(Jn);
  },
  useDebugValue: Ao,
  useDeferredValue: function(e) {
    var t = $e();
    return Ju(t, Z.memoizedState, e);
  },
  useTransition: function() {
    var e = ti(Jn)[0], t = $e().memoizedState;
    return [e, t];
  },
  useMutableSource: Fu,
  useSyncExternalStore: Iu,
  useId: qu,
  unstable_isNewReconciler: !1
}, Bf = { readContext: Pe, useCallback: Xu, useContext: Pe, useEffect: Uo, useImperativeHandle: Yu, useInsertionEffect: Hu, useLayoutEffect: Ku, useMemo: Zu, useReducer: ni, useRef: Qu, useState: function() {
  return ni(Jn);
}, useDebugValue: Ao, useDeferredValue: function(e) {
  var t = $e();
  return Z === null ? t.memoizedState = e : Ju(t, Z.memoizedState, e);
}, useTransition: function() {
  var e = ni(Jn)[0], t = $e().memoizedState;
  return [e, t];
}, useMutableSource: Fu, useSyncExternalStore: Iu, useId: qu, unstable_isNewReconciler: !1 };
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
  return (e = e._reactInternals) ? Ot(e) === e : !1;
}, enqueueSetState: function(e, t, n) {
  e = e._reactInternals;
  var r = ce(), l = pt(e), i = Ge(r, l);
  i.payload = t, n != null && (i.callback = n), t = dt(e, i, l), t !== null && (Oe(t, e, l, r), Rr(t, e, l));
}, enqueueReplaceState: function(e, t, n) {
  e = e._reactInternals;
  var r = ce(), l = pt(e), i = Ge(r, l);
  i.tag = 1, i.payload = t, n != null && (i.callback = n), t = dt(e, i, l), t !== null && (Oe(t, e, l, r), Rr(t, e, l));
}, enqueueForceUpdate: function(e, t) {
  e = e._reactInternals;
  var n = ce(), r = pt(e), l = Ge(n, r);
  l.tag = 2, t != null && (l.callback = t), t = dt(e, l, r), t !== null && (Oe(t, e, r, n), Rr(t, e, r));
} };
function Hs(e, t, n, r, l, i, o) {
  return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, i, o) : t.prototype && t.prototype.isPureReactComponent ? !Qn(n, r) || !Qn(l, i) : !0;
}
function rc(e, t, n) {
  var r = !1, l = gt, i = t.contextType;
  return typeof i == "object" && i !== null ? i = Pe(i) : (l = ge(t) ? $t : ae.current, r = t.contextTypes, i = (r = r != null) ? ln(e, l) : gt), t = new t(n, i), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = kl, e.stateNode = t, t._reactInternals = e, r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = l, e.__reactInternalMemoizedMaskedChildContext = i), t;
}
function Ks(e, t, n, r) {
  e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && kl.enqueueReplaceState(t, t.state, null);
}
function Ii(e, t, n, r) {
  var l = e.stateNode;
  l.props = n, l.state = e.memoizedState, l.refs = {}, Lo(e);
  var i = t.contextType;
  typeof i == "object" && i !== null ? l.context = Pe(i) : (i = ge(t) ? $t : ae.current, l.context = ln(e, i)), l.state = e.memoizedState, i = t.getDerivedStateFromProps, typeof i == "function" && (Fi(e, t, i, n), l.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof l.getSnapshotBeforeUpdate == "function" || typeof l.UNSAFE_componentWillMount != "function" && typeof l.componentWillMount != "function" || (t = l.state, typeof l.componentWillMount == "function" && l.componentWillMount(), typeof l.UNSAFE_componentWillMount == "function" && l.UNSAFE_componentWillMount(), t !== l.state && kl.enqueueReplaceState(l, l.state, null), rl(e, n, l, r), l.state = e.memoizedState), typeof l.componentDidMount == "function" && (e.flags |= 4194308);
}
function un(e, t) {
  try {
    var n = "", r = t;
    do
      n += md(r), r = r.return;
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
var Wf = typeof WeakMap == "function" ? WeakMap : Map;
function lc(e, t, n) {
  n = Ge(-1, n), n.tag = 3, n.payload = { element: null };
  var r = t.value;
  return n.callback = function() {
    al || (al = !0, Xi = r), Ui(e, t);
  }, n;
}
function ic(e, t, n) {
  n = Ge(-1, n), n.tag = 3;
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
    Ui(e, t), typeof r != "function" && (ft === null ? ft = /* @__PURE__ */ new Set([this]) : ft.add(this));
    var o = t.stack;
    this.componentDidCatch(t.value, { componentStack: o !== null ? o : "" });
  }), n;
}
function Gs(e, t, n) {
  var r = e.pingCache;
  if (r === null) {
    r = e.pingCache = new Wf();
    var l = /* @__PURE__ */ new Set();
    r.set(t, l);
  } else l = r.get(t), l === void 0 && (l = /* @__PURE__ */ new Set(), r.set(t, l));
  l.has(n) || (l.add(n), e = rp.bind(null, e, t, n), t.then(e, e));
}
function Ys(e) {
  do {
    var t;
    if ((t = e.tag === 13) && (t = e.memoizedState, t = t !== null ? t.dehydrated !== null : !0), t) return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function Xs(e, t, n, r, l) {
  return e.mode & 1 ? (e.flags |= 65536, e.lanes = l, e) : (e === t ? e.flags |= 65536 : (e.flags |= 128, n.flags |= 131072, n.flags &= -52805, n.tag === 1 && (n.alternate === null ? n.tag = 17 : (t = Ge(-1, 1), t.tag = 2, dt(n, t, 1))), n.lanes |= 1), e);
}
var Vf = qe.ReactCurrentOwner, he = !1;
function ue(e, t, n, r) {
  t.child = e === null ? Ru(t, null, n, r) : sn(t, e.child, n, r);
}
function Zs(e, t, n, r, l) {
  n = n.render;
  var i = t.ref;
  return en(t, l), r = Fo(e, t, n, r, i, l), n = Io(), e !== null && !he ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, Je(e, t, l)) : (W && n && Co(t), t.flags |= 1, ue(e, t, r, l), t.child);
}
function Js(e, t, n, r, l) {
  if (e === null) {
    var i = n.type;
    return typeof i == "function" && !Yo(i) && i.defaultProps === void 0 && n.compare === null && n.defaultProps === void 0 ? (t.tag = 15, t.type = i, oc(e, t, i, r, l)) : (e = Ur(n.type, null, r, t, t.mode, l), e.ref = t.ref, e.return = t, t.child = e);
  }
  if (i = e.child, !(e.lanes & l)) {
    var o = i.memoizedProps;
    if (n = n.compare, n = n !== null ? n : Qn, n(o, r) && e.ref === t.ref) return Je(e, t, l);
  }
  return t.flags |= 1, e = ht(i, r), e.ref = t.ref, e.return = t, t.child = e;
}
function oc(e, t, n, r, l) {
  if (e !== null) {
    var i = e.memoizedProps;
    if (Qn(i, r) && e.ref === t.ref) if (he = !1, t.pendingProps = r = i, (e.lanes & l) !== 0) e.flags & 131072 && (he = !0);
    else return t.lanes = e.lanes, Je(e, t, l);
  }
  return Ai(e, t, n, r, l);
}
function sc(e, t, n) {
  var r = t.pendingProps, l = r.children, i = e !== null ? e.memoizedState : null;
  if (r.mode === "hidden") if (!(t.mode & 1)) t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, I(Yt, xe), xe |= n;
  else {
    if (!(n & 1073741824)) return e = i !== null ? i.baseLanes | n : n, t.lanes = t.childLanes = 1073741824, t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }, t.updateQueue = null, I(Yt, xe), xe |= e, null;
    t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, r = i !== null ? i.baseLanes : n, I(Yt, xe), xe |= r;
  }
  else i !== null ? (r = i.baseLanes | n, t.memoizedState = null) : r = n, I(Yt, xe), xe |= r;
  return ue(e, t, l, n), t.child;
}
function ac(e, t) {
  var n = t.ref;
  (e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= 512, t.flags |= 2097152);
}
function Ai(e, t, n, r, l) {
  var i = ge(n) ? $t : ae.current;
  return i = ln(t, i), en(t, l), n = Fo(e, t, n, r, i, l), r = Io(), e !== null && !he ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, Je(e, t, l)) : (W && r && Co(t), t.flags |= 1, ue(e, t, n, l), t.child);
}
function qs(e, t, n, r, l) {
  if (ge(n)) {
    var i = !0;
    Jr(t);
  } else i = !1;
  if (en(t, l), t.stateNode === null) Dr(e, t), rc(t, n, r), Ii(t, n, r, l), r = !0;
  else if (e === null) {
    var o = t.stateNode, a = t.memoizedProps;
    o.props = a;
    var u = o.context, c = n.contextType;
    typeof c == "object" && c !== null ? c = Pe(c) : (c = ge(n) ? $t : ae.current, c = ln(t, c));
    var m = n.getDerivedStateFromProps, g = typeof m == "function" || typeof o.getSnapshotBeforeUpdate == "function";
    g || typeof o.UNSAFE_componentWillReceiveProps != "function" && typeof o.componentWillReceiveProps != "function" || (a !== r || u !== c) && Ks(t, o, r, c), nt = !1;
    var h = t.memoizedState;
    o.state = h, rl(t, r, o, l), u = t.memoizedState, a !== r || h !== u || me.current || nt ? (typeof m == "function" && (Fi(t, n, m, r), u = t.memoizedState), (a = nt || Hs(t, n, a, r, h, u, c)) ? (g || typeof o.UNSAFE_componentWillMount != "function" && typeof o.componentWillMount != "function" || (typeof o.componentWillMount == "function" && o.componentWillMount(), typeof o.UNSAFE_componentWillMount == "function" && o.UNSAFE_componentWillMount()), typeof o.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof o.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = u), o.props = r, o.state = u, o.context = c, r = a) : (typeof o.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
  } else {
    o = t.stateNode, Ou(e, t), a = t.memoizedProps, c = t.type === t.elementType ? a : Te(t.type, a), o.props = c, g = t.pendingProps, h = o.context, u = n.contextType, typeof u == "object" && u !== null ? u = Pe(u) : (u = ge(n) ? $t : ae.current, u = ln(t, u));
    var y = n.getDerivedStateFromProps;
    (m = typeof y == "function" || typeof o.getSnapshotBeforeUpdate == "function") || typeof o.UNSAFE_componentWillReceiveProps != "function" && typeof o.componentWillReceiveProps != "function" || (a !== g || h !== u) && Ks(t, o, r, u), nt = !1, h = t.memoizedState, o.state = h, rl(t, r, o, l);
    var x = t.memoizedState;
    a !== g || h !== x || me.current || nt ? (typeof y == "function" && (Fi(t, n, y, r), x = t.memoizedState), (c = nt || Hs(t, n, c, r, h, x, u) || !1) ? (m || typeof o.UNSAFE_componentWillUpdate != "function" && typeof o.componentWillUpdate != "function" || (typeof o.componentWillUpdate == "function" && o.componentWillUpdate(r, x, u), typeof o.UNSAFE_componentWillUpdate == "function" && o.UNSAFE_componentWillUpdate(r, x, u)), typeof o.componentDidUpdate == "function" && (t.flags |= 4), typeof o.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof o.componentDidUpdate != "function" || a === e.memoizedProps && h === e.memoizedState || (t.flags |= 4), typeof o.getSnapshotBeforeUpdate != "function" || a === e.memoizedProps && h === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = x), o.props = r, o.state = x, o.context = u, r = c) : (typeof o.componentDidUpdate != "function" || a === e.memoizedProps && h === e.memoizedState || (t.flags |= 4), typeof o.getSnapshotBeforeUpdate != "function" || a === e.memoizedProps && h === e.memoizedState || (t.flags |= 1024), r = !1);
  }
  return Bi(e, t, n, r, i, l);
}
function Bi(e, t, n, r, l, i) {
  ac(e, t);
  var o = (t.flags & 128) !== 0;
  if (!r && !o) return l && Fs(t, n, !1), Je(e, t, i);
  r = t.stateNode, Vf.current = t;
  var a = o && typeof n.getDerivedStateFromError != "function" ? null : r.render();
  return t.flags |= 1, e !== null && o ? (t.child = sn(t, e.child, null, i), t.child = sn(t, null, a, i)) : ue(e, t, a, i), t.memoizedState = r.state, l && Fs(t, n, !0), t.child;
}
function uc(e) {
  var t = e.stateNode;
  t.pendingContext ? Ds(e, t.pendingContext, t.pendingContext !== t.context) : t.context && Ds(e, t.context, !1), Ro(e, t.containerInfo);
}
function ea(e, t, n, r, l) {
  return on(), zo(l), t.flags |= 256, ue(e, t, n, r), t.child;
}
var Wi = { dehydrated: null, treeContext: null, retryLane: 0 };
function Vi(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function cc(e, t, n) {
  var r = t.pendingProps, l = V.current, i = !1, o = (t.flags & 128) !== 0, a;
  if ((a = o) || (a = e !== null && e.memoizedState === null ? !1 : (l & 2) !== 0), a ? (i = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (l |= 1), I(V, l & 1), e === null)
    return Oi(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? (t.mode & 1 ? e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824 : t.lanes = 1, null) : (o = r.children, e = r.fallback, i ? (r = t.mode, i = t.child, o = { mode: "hidden", children: o }, !(r & 1) && i !== null ? (i.childLanes = 0, i.pendingProps = o) : i = _l(o, r, 0, null), e = Pt(e, r, n, null), i.return = t, e.return = t, i.sibling = e, t.child = i, t.child.memoizedState = Vi(n), t.memoizedState = Wi, e) : Bo(t, o));
  if (l = e.memoizedState, l !== null && (a = l.dehydrated, a !== null)) return Qf(e, t, o, r, a, l, n);
  if (i) {
    i = r.fallback, o = t.mode, l = e.child, a = l.sibling;
    var u = { mode: "hidden", children: r.children };
    return !(o & 1) && t.child !== l ? (r = t.child, r.childLanes = 0, r.pendingProps = u, t.deletions = null) : (r = ht(l, u), r.subtreeFlags = l.subtreeFlags & 14680064), a !== null ? i = ht(a, i) : (i = Pt(i, o, n, null), i.flags |= 2), i.return = t, r.return = t, r.sibling = i, t.child = r, r = i, i = t.child, o = e.child.memoizedState, o = o === null ? Vi(n) : { baseLanes: o.baseLanes | n, cachePool: null, transitions: o.transitions }, i.memoizedState = o, i.childLanes = e.childLanes & ~n, t.memoizedState = Wi, r;
  }
  return i = e.child, e = i.sibling, r = ht(i, { mode: "visible", children: r.children }), !(t.mode & 1) && (r.lanes = n), r.return = t, r.sibling = null, e !== null && (n = t.deletions, n === null ? (t.deletions = [e], t.flags |= 16) : n.push(e)), t.child = r, t.memoizedState = null, r;
}
function Bo(e, t) {
  return t = _l({ mode: "visible", children: t }, e.mode, 0, null), t.return = e, e.child = t;
}
function Nr(e, t, n, r) {
  return r !== null && zo(r), sn(t, e.child, null, n), e = Bo(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
}
function Qf(e, t, n, r, l, i, o) {
  if (n)
    return t.flags & 256 ? (t.flags &= -257, r = ri(Error(_(422))), Nr(e, t, o, r)) : t.memoizedState !== null ? (t.child = e.child, t.flags |= 128, null) : (i = r.fallback, l = t.mode, r = _l({ mode: "visible", children: r.children }, l, 0, null), i = Pt(i, l, o, null), i.flags |= 2, r.return = t, i.return = t, r.sibling = i, t.child = r, t.mode & 1 && sn(t, e.child, null, o), t.child.memoizedState = Vi(o), t.memoizedState = Wi, i);
  if (!(t.mode & 1)) return Nr(e, t, o, null);
  if (l.data === "$!") {
    if (r = l.nextSibling && l.nextSibling.dataset, r) var a = r.dgst;
    return r = a, i = Error(_(419)), r = ri(i, r, void 0), Nr(e, t, o, r);
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
      l = l & (r.suspendedLanes | o) ? 0 : l, l !== 0 && l !== i.retryLane && (i.retryLane = l, Ze(e, l), Oe(r, e, l, -1));
    }
    return Go(), r = ri(Error(_(421))), Nr(e, t, o, r);
  }
  return l.data === "$?" ? (t.flags |= 128, t.child = e.child, t = lp.bind(null, e), l._reactRetry = t, null) : (e = i.treeContext, we = ct(l.nextSibling), ke = t, W = !0, Re = null, e !== null && (Ne[Ce++] = Qe, Ne[Ce++] = He, Ne[Ce++] = bt, Qe = e.id, He = e.overflow, bt = t), t = Bo(t, r.children), t.flags |= 4096, t);
}
function ta(e, t, n) {
  e.lanes |= t;
  var r = e.alternate;
  r !== null && (r.lanes |= t), Di(e.return, t, n);
}
function li(e, t, n, r, l) {
  var i = e.memoizedState;
  i === null ? e.memoizedState = { isBackwards: t, rendering: null, renderingStartTime: 0, last: r, tail: n, tailMode: l } : (i.isBackwards = t, i.rendering = null, i.renderingStartTime = 0, i.last = r, i.tail = n, i.tailMode = l);
}
function dc(e, t, n) {
  var r = t.pendingProps, l = r.revealOrder, i = r.tail;
  if (ue(e, t, r.children, n), r = V.current, r & 2) r = r & 1 | 2, t.flags |= 128;
  else {
    if (e !== null && e.flags & 128) e: for (e = t.child; e !== null; ) {
      if (e.tag === 13) e.memoizedState !== null && ta(e, n, t);
      else if (e.tag === 19) ta(e, n, t);
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
  if (I(V, r), !(t.mode & 1)) t.memoizedState = null;
  else switch (l) {
    case "forwards":
      for (n = t.child, l = null; n !== null; ) e = n.alternate, e !== null && ll(e) === null && (l = n), n = n.sibling;
      n = l, n === null ? (l = t.child, t.child = null) : (l = n.sibling, n.sibling = null), li(t, !1, l, n, i);
      break;
    case "backwards":
      for (n = null, l = t.child, t.child = null; l !== null; ) {
        if (e = l.alternate, e !== null && ll(e) === null) {
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
function Dr(e, t) {
  !(t.mode & 1) && e !== null && (e.alternate = null, t.alternate = null, t.flags |= 2);
}
function Je(e, t, n) {
  if (e !== null && (t.dependencies = e.dependencies), Lt |= t.lanes, !(n & t.childLanes)) return null;
  if (e !== null && t.child !== e.child) throw Error(_(153));
  if (t.child !== null) {
    for (e = t.child, n = ht(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null; ) e = e.sibling, n = n.sibling = ht(e, e.pendingProps), n.return = t;
    n.sibling = null;
  }
  return t.child;
}
function Hf(e, t, n) {
  switch (t.tag) {
    case 3:
      uc(t), on();
      break;
    case 5:
      Du(t);
      break;
    case 1:
      ge(t.type) && Jr(t);
      break;
    case 4:
      Ro(t, t.stateNode.containerInfo);
      break;
    case 10:
      var r = t.type._context, l = t.memoizedProps.value;
      I(tl, r._currentValue), r._currentValue = l;
      break;
    case 13:
      if (r = t.memoizedState, r !== null)
        return r.dehydrated !== null ? (I(V, V.current & 1), t.flags |= 128, null) : n & t.child.childLanes ? cc(e, t, n) : (I(V, V.current & 1), e = Je(e, t, n), e !== null ? e.sibling : null);
      I(V, V.current & 1);
      break;
    case 19:
      if (r = (n & t.childLanes) !== 0, e.flags & 128) {
        if (r) return dc(e, t, n);
        t.flags |= 128;
      }
      if (l = t.memoizedState, l !== null && (l.rendering = null, l.tail = null, l.lastEffect = null), I(V, V.current), r) break;
      return null;
    case 22:
    case 23:
      return t.lanes = 0, sc(e, t, n);
  }
  return Je(e, t, n);
}
var fc, Qi, pc, hc;
fc = function(e, t) {
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
pc = function(e, t, n, r) {
  var l = e.memoizedProps;
  if (l !== r) {
    e = t.stateNode, Ct(Be.current);
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
    yi(n, r);
    var o;
    n = null;
    for (c in l) if (!r.hasOwnProperty(c) && l.hasOwnProperty(c) && l[c] != null) if (c === "style") {
      var a = l[c];
      for (o in a) a.hasOwnProperty(o) && (n || (n = {}), n[o] = "");
    } else c !== "dangerouslySetInnerHTML" && c !== "children" && c !== "suppressContentEditableWarning" && c !== "suppressHydrationWarning" && c !== "autoFocus" && (Fn.hasOwnProperty(c) ? i || (i = []) : (i = i || []).push(c, null));
    for (c in r) {
      var u = r[c];
      if (a = l != null ? l[c] : void 0, r.hasOwnProperty(c) && u !== a && (u != null || a != null)) if (c === "style") if (a) {
        for (o in a) !a.hasOwnProperty(o) || u && u.hasOwnProperty(o) || (n || (n = {}), n[o] = "");
        for (o in u) u.hasOwnProperty(o) && a[o] !== u[o] && (n || (n = {}), n[o] = u[o]);
      } else n || (i || (i = []), i.push(
        c,
        n
      )), n = u;
      else c === "dangerouslySetInnerHTML" ? (u = u ? u.__html : void 0, a = a ? a.__html : void 0, u != null && a !== u && (i = i || []).push(c, u)) : c === "children" ? typeof u != "string" && typeof u != "number" || (i = i || []).push(c, "" + u) : c !== "suppressContentEditableWarning" && c !== "suppressHydrationWarning" && (Fn.hasOwnProperty(c) ? (u != null && c === "onScroll" && U("scroll", e), i || a === u || (i = [])) : (i = i || []).push(c, u));
    }
    n && (i = i || []).push("style", n);
    var c = i;
    (t.updateQueue = c) && (t.flags |= 4);
  }
};
hc = function(e, t, n, r) {
  n !== r && (t.flags |= 4);
};
function Sn(e, t) {
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
function Kf(e, t, n) {
  var r = t.pendingProps;
  switch (Eo(t), t.tag) {
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
      return ge(t.type) && Zr(), oe(t), null;
    case 3:
      return r = t.stateNode, an(), A(me), A(ae), Oo(), r.pendingContext && (r.context = r.pendingContext, r.pendingContext = null), (e === null || e.child === null) && (jr(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, Re !== null && (qi(Re), Re = null))), Qi(e, t), oe(t), null;
    case 5:
      Mo(t);
      var l = Ct(Xn.current);
      if (n = t.type, e !== null && t.stateNode != null) pc(e, t, n, r, l), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
      else {
        if (!r) {
          if (t.stateNode === null) throw Error(_(166));
          return oe(t), null;
        }
        if (e = Ct(Be.current), jr(t)) {
          r = t.stateNode, n = t.type;
          var i = t.memoizedProps;
          switch (r[Ue] = t, r[Gn] = i, e = (t.mode & 1) !== 0, n) {
            case "dialog":
              U("cancel", r), U("close", r);
              break;
            case "iframe":
            case "object":
            case "embed":
              U("load", r);
              break;
            case "video":
            case "audio":
              for (l = 0; l < En.length; l++) U(En[l], r);
              break;
            case "source":
              U("error", r);
              break;
            case "img":
            case "image":
            case "link":
              U(
                "error",
                r
              ), U("load", r);
              break;
            case "details":
              U("toggle", r);
              break;
            case "input":
              cs(r, i), U("invalid", r);
              break;
            case "select":
              r._wrapperState = { wasMultiple: !!i.multiple }, U("invalid", r);
              break;
            case "textarea":
              fs(r, i), U("invalid", r);
          }
          yi(n, i), l = null;
          for (var o in i) if (i.hasOwnProperty(o)) {
            var a = i[o];
            o === "children" ? typeof a == "string" ? r.textContent !== a && (i.suppressHydrationWarning !== !0 && Sr(r.textContent, a, e), l = ["children", a]) : typeof a == "number" && r.textContent !== "" + a && (i.suppressHydrationWarning !== !0 && Sr(
              r.textContent,
              a,
              e
            ), l = ["children", "" + a]) : Fn.hasOwnProperty(o) && a != null && o === "onScroll" && U("scroll", r);
          }
          switch (n) {
            case "input":
              hr(r), ds(r, i, !0);
              break;
            case "textarea":
              hr(r), ps(r);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof i.onClick == "function" && (r.onclick = Xr);
          }
          r = l, t.updateQueue = r, r !== null && (t.flags |= 4);
        } else {
          o = l.nodeType === 9 ? l : l.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = Ba(n)), e === "http://www.w3.org/1999/xhtml" ? n === "script" ? (e = o.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof r.is == "string" ? e = o.createElement(n, { is: r.is }) : (e = o.createElement(n), n === "select" && (o = e, r.multiple ? o.multiple = !0 : r.size && (o.size = r.size))) : e = o.createElementNS(e, n), e[Ue] = t, e[Gn] = r, fc(e, t, !1, !1), t.stateNode = e;
          e: {
            switch (o = xi(n, r), n) {
              case "dialog":
                U("cancel", e), U("close", e), l = r;
                break;
              case "iframe":
              case "object":
              case "embed":
                U("load", e), l = r;
                break;
              case "video":
              case "audio":
                for (l = 0; l < En.length; l++) U(En[l], e);
                l = r;
                break;
              case "source":
                U("error", e), l = r;
                break;
              case "img":
              case "image":
              case "link":
                U(
                  "error",
                  e
                ), U("load", e), l = r;
                break;
              case "details":
                U("toggle", e), l = r;
                break;
              case "input":
                cs(e, r), l = pi(e, r), U("invalid", e);
                break;
              case "option":
                l = r;
                break;
              case "select":
                e._wrapperState = { wasMultiple: !!r.multiple }, l = H({}, r, { value: void 0 }), U("invalid", e);
                break;
              case "textarea":
                fs(e, r), l = gi(e, r), U("invalid", e);
                break;
              default:
                l = r;
            }
            yi(n, l), a = l;
            for (i in a) if (a.hasOwnProperty(i)) {
              var u = a[i];
              i === "style" ? Qa(e, u) : i === "dangerouslySetInnerHTML" ? (u = u ? u.__html : void 0, u != null && Wa(e, u)) : i === "children" ? typeof u == "string" ? (n !== "textarea" || u !== "") && In(e, u) : typeof u == "number" && In(e, "" + u) : i !== "suppressContentEditableWarning" && i !== "suppressHydrationWarning" && i !== "autoFocus" && (Fn.hasOwnProperty(i) ? u != null && i === "onScroll" && U("scroll", e) : u != null && fo(e, i, u, o));
            }
            switch (n) {
              case "input":
                hr(e), ds(e, r, !1);
                break;
              case "textarea":
                hr(e), ps(e);
                break;
              case "option":
                r.value != null && e.setAttribute("value", "" + mt(r.value));
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
      if (e && t.stateNode != null) hc(e, t, e.memoizedProps, r);
      else {
        if (typeof r != "string" && t.stateNode === null) throw Error(_(166));
        if (n = Ct(Xn.current), Ct(Be.current), jr(t)) {
          if (r = t.stateNode, n = t.memoizedProps, r[Ue] = t, (i = r.nodeValue !== n) && (e = ke, e !== null)) switch (e.tag) {
            case 3:
              Sr(r.nodeValue, n, (e.mode & 1) !== 0);
              break;
            case 5:
              e.memoizedProps.suppressHydrationWarning !== !0 && Sr(r.nodeValue, n, (e.mode & 1) !== 0);
          }
          i && (t.flags |= 4);
        } else r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r), r[Ue] = t, t.stateNode = r;
      }
      return oe(t), null;
    case 13:
      if (A(V), r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
        if (W && we !== null && t.mode & 1 && !(t.flags & 128)) Tu(), on(), t.flags |= 98560, i = !1;
        else if (i = jr(t), r !== null && r.dehydrated !== null) {
          if (e === null) {
            if (!i) throw Error(_(318));
            if (i = t.memoizedState, i = i !== null ? i.dehydrated : null, !i) throw Error(_(317));
            i[Ue] = t;
          } else on(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
          oe(t), i = !1;
        } else Re !== null && (qi(Re), Re = null), i = !0;
        if (!i) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128 ? (t.lanes = n, t) : (r = r !== null, r !== (e !== null && e.memoizedState !== null) && r && (t.child.flags |= 8192, t.mode & 1 && (e === null || V.current & 1 ? J === 0 && (J = 3) : Go())), t.updateQueue !== null && (t.flags |= 4), oe(t), null);
    case 4:
      return an(), Qi(e, t), e === null && Hn(t.stateNode.containerInfo), oe(t), null;
    case 10:
      return bo(t.type._context), oe(t), null;
    case 17:
      return ge(t.type) && Zr(), oe(t), null;
    case 19:
      if (A(V), i = t.memoizedState, i === null) return oe(t), null;
      if (r = (t.flags & 128) !== 0, o = i.rendering, o === null) if (r) Sn(i, !1);
      else {
        if (J !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null; ) {
          if (o = ll(e), o !== null) {
            for (t.flags |= 128, Sn(i, !1), r = o.updateQueue, r !== null && (t.updateQueue = r, t.flags |= 4), t.subtreeFlags = 0, r = n, n = t.child; n !== null; ) i = n, e = r, i.flags &= 14680066, o = i.alternate, o === null ? (i.childLanes = 0, i.lanes = e, i.child = null, i.subtreeFlags = 0, i.memoizedProps = null, i.memoizedState = null, i.updateQueue = null, i.dependencies = null, i.stateNode = null) : (i.childLanes = o.childLanes, i.lanes = o.lanes, i.child = o.child, i.subtreeFlags = 0, i.deletions = null, i.memoizedProps = o.memoizedProps, i.memoizedState = o.memoizedState, i.updateQueue = o.updateQueue, i.type = o.type, e = o.dependencies, i.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }), n = n.sibling;
            return I(V, V.current & 1 | 2), t.child;
          }
          e = e.sibling;
        }
        i.tail !== null && Y() > cn && (t.flags |= 128, r = !0, Sn(i, !1), t.lanes = 4194304);
      }
      else {
        if (!r) if (e = ll(o), e !== null) {
          if (t.flags |= 128, r = !0, n = e.updateQueue, n !== null && (t.updateQueue = n, t.flags |= 4), Sn(i, !0), i.tail === null && i.tailMode === "hidden" && !o.alternate && !W) return oe(t), null;
        } else 2 * Y() - i.renderingStartTime > cn && n !== 1073741824 && (t.flags |= 128, r = !0, Sn(i, !1), t.lanes = 4194304);
        i.isBackwards ? (o.sibling = t.child, t.child = o) : (n = i.last, n !== null ? n.sibling = o : t.child = o, i.last = o);
      }
      return i.tail !== null ? (t = i.tail, i.rendering = t, i.tail = t.sibling, i.renderingStartTime = Y(), t.sibling = null, n = V.current, I(V, r ? n & 1 | 2 : n & 1), t) : (oe(t), null);
    case 22:
    case 23:
      return Ko(), r = t.memoizedState !== null, e !== null && e.memoizedState !== null !== r && (t.flags |= 8192), r && t.mode & 1 ? xe & 1073741824 && (oe(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : oe(t), null;
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(_(156, t.tag));
}
function Gf(e, t) {
  switch (Eo(t), t.tag) {
    case 1:
      return ge(t.type) && Zr(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 3:
      return an(), A(me), A(ae), Oo(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
    case 5:
      return Mo(t), null;
    case 13:
      if (A(V), e = t.memoizedState, e !== null && e.dehydrated !== null) {
        if (t.alternate === null) throw Error(_(340));
        on();
      }
      return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 19:
      return A(V), null;
    case 4:
      return an(), null;
    case 10:
      return bo(t.type._context), null;
    case 22:
    case 23:
      return Ko(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var Cr = !1, se = !1, Yf = typeof WeakSet == "function" ? WeakSet : Set, z = null;
function Gt(e, t) {
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
var na = !1;
function Xf(e, t) {
  if (Pi = Kr, e = xu(), No(e)) {
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
        var o = 0, a = -1, u = -1, c = 0, m = 0, g = e, h = null;
        t: for (; ; ) {
          for (var y; g !== n || l !== 0 && g.nodeType !== 3 || (a = o + l), g !== i || r !== 0 && g.nodeType !== 3 || (u = o + r), g.nodeType === 3 && (o += g.nodeValue.length), (y = g.firstChild) !== null; )
            h = g, g = y;
          for (; ; ) {
            if (g === e) break t;
            if (h === n && ++c === l && (a = o), h === i && ++m === r && (u = o), (y = g.nextSibling) !== null) break;
            g = h, h = g.parentNode;
          }
          g = y;
        }
        n = a === -1 || u === -1 ? null : { start: a, end: u };
      } else n = null;
    }
    n = n || { start: 0, end: 0 };
  } else n = null;
  for ($i = { focusedElem: e, selectionRange: n }, Kr = !1, z = t; z !== null; ) if (t = z, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null) e.return = t, z = e;
  else for (; z !== null; ) {
    t = z;
    try {
      var x = t.alternate;
      if (t.flags & 1024) switch (t.tag) {
        case 0:
        case 11:
        case 15:
          break;
        case 1:
          if (x !== null) {
            var S = x.memoizedProps, N = x.memoizedState, f = t.stateNode, d = f.getSnapshotBeforeUpdate(t.elementType === t.type ? S : Te(t.type, S), N);
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
          throw Error(_(163));
      }
    } catch (v) {
      K(t, t.return, v);
    }
    if (e = t.sibling, e !== null) {
      e.return = t.return, z = e;
      break;
    }
    z = t.return;
  }
  return x = na, na = !1, x;
}
function Rn(e, t, n) {
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
function mc(e) {
  var t = e.alternate;
  t !== null && (e.alternate = null, mc(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[Ue], delete t[Gn], delete t[Li], delete t[Tf], delete t[Lf])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
}
function gc(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function ra(e) {
  e: for (; ; ) {
    for (; e.sibling === null; ) {
      if (e.return === null || gc(e.return)) return null;
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
var ne = null, Le = !1;
function et(e, t, n) {
  for (n = n.child; n !== null; ) vc(e, t, n), n = n.sibling;
}
function vc(e, t, n) {
  if (Ae && typeof Ae.onCommitFiberUnmount == "function") try {
    Ae.onCommitFiberUnmount(hl, n);
  } catch {
  }
  switch (n.tag) {
    case 5:
      se || Gt(n, t);
    case 6:
      var r = ne, l = Le;
      ne = null, et(e, t, n), ne = r, Le = l, ne !== null && (Le ? (e = ne, n = n.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n)) : ne.removeChild(n.stateNode));
      break;
    case 18:
      ne !== null && (Le ? (e = ne, n = n.stateNode, e.nodeType === 8 ? Zl(e.parentNode, n) : e.nodeType === 1 && Zl(e, n), Wn(e)) : Zl(ne, n.stateNode));
      break;
    case 4:
      r = ne, l = Le, ne = n.stateNode.containerInfo, Le = !0, et(e, t, n), ne = r, Le = l;
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
      et(e, t, n);
      break;
    case 1:
      if (!se && (Gt(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function")) try {
        r.props = n.memoizedProps, r.state = n.memoizedState, r.componentWillUnmount();
      } catch (a) {
        K(n, t, a);
      }
      et(e, t, n);
      break;
    case 21:
      et(e, t, n);
      break;
    case 22:
      n.mode & 1 ? (se = (r = se) || n.memoizedState !== null, et(e, t, n), se = r) : et(e, t, n);
      break;
    default:
      et(e, t, n);
  }
}
function la(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    n === null && (n = e.stateNode = new Yf()), t.forEach(function(r) {
      var l = ip.bind(null, e, r);
      n.has(r) || (n.add(r), r.then(l, l));
    });
  }
}
function be(e, t) {
  var n = t.deletions;
  if (n !== null) for (var r = 0; r < n.length; r++) {
    var l = n[r];
    try {
      var i = e, o = t, a = o;
      e: for (; a !== null; ) {
        switch (a.tag) {
          case 5:
            ne = a.stateNode, Le = !1;
            break e;
          case 3:
            ne = a.stateNode.containerInfo, Le = !0;
            break e;
          case 4:
            ne = a.stateNode.containerInfo, Le = !0;
            break e;
        }
        a = a.return;
      }
      if (ne === null) throw Error(_(160));
      vc(i, o, l), ne = null, Le = !1;
      var u = l.alternate;
      u !== null && (u.return = null), l.return = null;
    } catch (c) {
      K(l, t, c);
    }
  }
  if (t.subtreeFlags & 12854) for (t = t.child; t !== null; ) yc(t, e), t = t.sibling;
}
function yc(e, t) {
  var n = e.alternate, r = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if (be(t, e), Fe(e), r & 4) {
        try {
          Rn(3, e, e.return), Sl(3, e);
        } catch (S) {
          K(e, e.return, S);
        }
        try {
          Rn(5, e, e.return);
        } catch (S) {
          K(e, e.return, S);
        }
      }
      break;
    case 1:
      be(t, e), Fe(e), r & 512 && n !== null && Gt(n, n.return);
      break;
    case 5:
      if (be(t, e), Fe(e), r & 512 && n !== null && Gt(n, n.return), e.flags & 32) {
        var l = e.stateNode;
        try {
          In(l, "");
        } catch (S) {
          K(e, e.return, S);
        }
      }
      if (r & 4 && (l = e.stateNode, l != null)) {
        var i = e.memoizedProps, o = n !== null ? n.memoizedProps : i, a = e.type, u = e.updateQueue;
        if (e.updateQueue = null, u !== null) try {
          a === "input" && i.type === "radio" && i.name != null && Ua(l, i), xi(a, o);
          var c = xi(a, i);
          for (o = 0; o < u.length; o += 2) {
            var m = u[o], g = u[o + 1];
            m === "style" ? Qa(l, g) : m === "dangerouslySetInnerHTML" ? Wa(l, g) : m === "children" ? In(l, g) : fo(l, m, g, c);
          }
          switch (a) {
            case "input":
              hi(l, i);
              break;
            case "textarea":
              Aa(l, i);
              break;
            case "select":
              var h = l._wrapperState.wasMultiple;
              l._wrapperState.wasMultiple = !!i.multiple;
              var y = i.value;
              y != null ? Xt(l, !!i.multiple, y, !1) : h !== !!i.multiple && (i.defaultValue != null ? Xt(
                l,
                !!i.multiple,
                i.defaultValue,
                !0
              ) : Xt(l, !!i.multiple, i.multiple ? [] : "", !1));
          }
          l[Gn] = i;
        } catch (S) {
          K(e, e.return, S);
        }
      }
      break;
    case 6:
      if (be(t, e), Fe(e), r & 4) {
        if (e.stateNode === null) throw Error(_(162));
        l = e.stateNode, i = e.memoizedProps;
        try {
          l.nodeValue = i;
        } catch (S) {
          K(e, e.return, S);
        }
      }
      break;
    case 3:
      if (be(t, e), Fe(e), r & 4 && n !== null && n.memoizedState.isDehydrated) try {
        Wn(t.containerInfo);
      } catch (S) {
        K(e, e.return, S);
      }
      break;
    case 4:
      be(t, e), Fe(e);
      break;
    case 13:
      be(t, e), Fe(e), l = e.child, l.flags & 8192 && (i = l.memoizedState !== null, l.stateNode.isHidden = i, !i || l.alternate !== null && l.alternate.memoizedState !== null || (Qo = Y())), r & 4 && la(e);
      break;
    case 22:
      if (m = n !== null && n.memoizedState !== null, e.mode & 1 ? (se = (c = se) || m, be(t, e), se = c) : be(t, e), Fe(e), r & 8192) {
        if (c = e.memoizedState !== null, (e.stateNode.isHidden = c) && !m && e.mode & 1) for (z = e, m = e.child; m !== null; ) {
          for (g = z = m; z !== null; ) {
            switch (h = z, y = h.child, h.tag) {
              case 0:
              case 11:
              case 14:
              case 15:
                Rn(4, h, h.return);
                break;
              case 1:
                Gt(h, h.return);
                var x = h.stateNode;
                if (typeof x.componentWillUnmount == "function") {
                  r = h, n = h.return;
                  try {
                    t = r, x.props = t.memoizedProps, x.state = t.memoizedState, x.componentWillUnmount();
                  } catch (S) {
                    K(r, n, S);
                  }
                }
                break;
              case 5:
                Gt(h, h.return);
                break;
              case 22:
                if (h.memoizedState !== null) {
                  oa(g);
                  continue;
                }
            }
            y !== null ? (y.return = h, z = y) : oa(g);
          }
          m = m.sibling;
        }
        e: for (m = null, g = e; ; ) {
          if (g.tag === 5) {
            if (m === null) {
              m = g;
              try {
                l = g.stateNode, c ? (i = l.style, typeof i.setProperty == "function" ? i.setProperty("display", "none", "important") : i.display = "none") : (a = g.stateNode, u = g.memoizedProps.style, o = u != null && u.hasOwnProperty("display") ? u.display : null, a.style.display = Va("display", o));
              } catch (S) {
                K(e, e.return, S);
              }
            }
          } else if (g.tag === 6) {
            if (m === null) try {
              g.stateNode.nodeValue = c ? "" : g.memoizedProps;
            } catch (S) {
              K(e, e.return, S);
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
      be(t, e), Fe(e), r & 4 && la(e);
      break;
    case 21:
      break;
    default:
      be(
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
          if (gc(n)) {
            var r = n;
            break e;
          }
          n = n.return;
        }
        throw Error(_(160));
      }
      switch (r.tag) {
        case 5:
          var l = r.stateNode;
          r.flags & 32 && (In(l, ""), r.flags &= -33);
          var i = ra(e);
          Yi(e, i, l);
          break;
        case 3:
        case 4:
          var o = r.stateNode.containerInfo, a = ra(e);
          Gi(e, a, o);
          break;
        default:
          throw Error(_(161));
      }
    } catch (u) {
      K(e, e.return, u);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function Zf(e, t, n) {
  z = e, xc(e);
}
function xc(e, t, n) {
  for (var r = (e.mode & 1) !== 0; z !== null; ) {
    var l = z, i = l.child;
    if (l.tag === 22 && r) {
      var o = l.memoizedState !== null || Cr;
      if (!o) {
        var a = l.alternate, u = a !== null && a.memoizedState !== null || se;
        a = Cr;
        var c = se;
        if (Cr = o, (se = u) && !c) for (z = l; z !== null; ) o = z, u = o.child, o.tag === 22 && o.memoizedState !== null ? sa(l) : u !== null ? (u.return = o, z = u) : sa(l);
        for (; i !== null; ) z = i, xc(i), i = i.sibling;
        z = l, Cr = a, se = c;
      }
      ia(e);
    } else l.subtreeFlags & 8772 && i !== null ? (i.return = l, z = i) : ia(e);
  }
}
function ia(e) {
  for (; z !== null; ) {
    var t = z;
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
            i !== null && Ws(t, i, r);
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
              Ws(t, o, n);
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
                var m = c.memoizedState;
                if (m !== null) {
                  var g = m.dehydrated;
                  g !== null && Wn(g);
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
            throw Error(_(163));
        }
        se || t.flags & 512 && Ki(t);
      } catch (h) {
        K(t, t.return, h);
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
function oa(e) {
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
function sa(e) {
  for (; z !== null; ) {
    var t = z;
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
var Jf = Math.ceil, sl = qe.ReactCurrentDispatcher, Wo = qe.ReactCurrentOwner, ze = qe.ReactCurrentBatchConfig, D = 0, te = null, X = null, re = 0, xe = 0, Yt = yt(0), J = 0, er = null, Lt = 0, jl = 0, Vo = 0, Mn = null, pe = null, Qo = 0, cn = 1 / 0, We = null, al = !1, Xi = null, ft = null, Er = !1, ot = null, ul = 0, On = 0, Zi = null, Fr = -1, Ir = 0;
function ce() {
  return D & 6 ? Y() : Fr !== -1 ? Fr : Fr = Y();
}
function pt(e) {
  return e.mode & 1 ? D & 2 && re !== 0 ? re & -re : Mf.transition !== null ? (Ir === 0 && (Ir = ru()), Ir) : (e = F, e !== 0 || (e = window.event, e = e === void 0 ? 16 : cu(e.type)), e) : 1;
}
function Oe(e, t, n, r) {
  if (50 < On) throw On = 0, Zi = null, Error(_(185));
  ir(e, n, r), (!(D & 2) || e !== te) && (e === te && (!(D & 2) && (jl |= n), J === 4 && lt(e, re)), ve(e, r), n === 1 && D === 0 && !(t.mode & 1) && (cn = Y() + 500, xl && xt()));
}
function ve(e, t) {
  var n = e.callbackNode;
  Rd(e, t);
  var r = Hr(e, e === te ? re : 0);
  if (r === 0) n !== null && gs(n), e.callbackNode = null, e.callbackPriority = 0;
  else if (t = r & -r, e.callbackPriority !== t) {
    if (n != null && gs(n), t === 1) e.tag === 0 ? Rf(aa.bind(null, e)) : Pu(aa.bind(null, e)), $f(function() {
      !(D & 6) && xt();
    }), n = null;
    else {
      switch (lu(r)) {
        case 1:
          n = vo;
          break;
        case 4:
          n = tu;
          break;
        case 16:
          n = Qr;
          break;
        case 536870912:
          n = nu;
          break;
        default:
          n = Qr;
      }
      n = Ec(n, wc.bind(null, e));
    }
    e.callbackPriority = t, e.callbackNode = n;
  }
}
function wc(e, t) {
  if (Fr = -1, Ir = 0, D & 6) throw Error(_(327));
  var n = e.callbackNode;
  if (tn() && e.callbackNode !== n) return null;
  var r = Hr(e, e === te ? re : 0);
  if (r === 0) return null;
  if (r & 30 || r & e.expiredLanes || t) t = cl(e, r);
  else {
    t = r;
    var l = D;
    D |= 2;
    var i = Sc();
    (te !== e || re !== t) && (We = null, cn = Y() + 500, zt(e, t));
    do
      try {
        tp();
        break;
      } catch (a) {
        kc(e, a);
      }
    while (!0);
    $o(), sl.current = i, D = l, X !== null ? t = 0 : (te = null, re = 0, t = J);
  }
  if (t !== 0) {
    if (t === 2 && (l = _i(e), l !== 0 && (r = l, t = Ji(e, l))), t === 1) throw n = er, zt(e, 0), lt(e, r), ve(e, Y()), n;
    if (t === 6) lt(e, r);
    else {
      if (l = e.current.alternate, !(r & 30) && !qf(l) && (t = cl(e, r), t === 2 && (i = _i(e), i !== 0 && (r = i, t = Ji(e, i))), t === 1)) throw n = er, zt(e, 0), lt(e, r), ve(e, Y()), n;
      switch (e.finishedWork = l, e.finishedLanes = r, t) {
        case 0:
        case 1:
          throw Error(_(345));
        case 2:
          jt(e, pe, We);
          break;
        case 3:
          if (lt(e, r), (r & 130023424) === r && (t = Qo + 500 - Y(), 10 < t)) {
            if (Hr(e, 0) !== 0) break;
            if (l = e.suspendedLanes, (l & r) !== r) {
              ce(), e.pingedLanes |= e.suspendedLanes & l;
              break;
            }
            e.timeoutHandle = Ti(jt.bind(null, e, pe, We), t);
            break;
          }
          jt(e, pe, We);
          break;
        case 4:
          if (lt(e, r), (r & 4194240) === r) break;
          for (t = e.eventTimes, l = -1; 0 < r; ) {
            var o = 31 - Me(r);
            i = 1 << o, o = t[o], o > l && (l = o), r &= ~i;
          }
          if (r = l, r = Y() - r, r = (120 > r ? 120 : 480 > r ? 480 : 1080 > r ? 1080 : 1920 > r ? 1920 : 3e3 > r ? 3e3 : 4320 > r ? 4320 : 1960 * Jf(r / 1960)) - r, 10 < r) {
            e.timeoutHandle = Ti(jt.bind(null, e, pe, We), r);
            break;
          }
          jt(e, pe, We);
          break;
        case 5:
          jt(e, pe, We);
          break;
        default:
          throw Error(_(329));
      }
    }
  }
  return ve(e, Y()), e.callbackNode === n ? wc.bind(null, e) : null;
}
function Ji(e, t) {
  var n = Mn;
  return e.current.memoizedState.isDehydrated && (zt(e, t).flags |= 256), e = cl(e, t), e !== 2 && (t = pe, pe = n, t !== null && qi(t)), e;
}
function qi(e) {
  pe === null ? pe = e : pe.push.apply(pe, e);
}
function qf(e) {
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
function lt(e, t) {
  for (t &= ~Vo, t &= ~jl, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t; ) {
    var n = 31 - Me(t), r = 1 << n;
    e[n] = -1, t &= ~r;
  }
}
function aa(e) {
  if (D & 6) throw Error(_(327));
  tn();
  var t = Hr(e, 0);
  if (!(t & 1)) return ve(e, Y()), null;
  var n = cl(e, t);
  if (e.tag !== 0 && n === 2) {
    var r = _i(e);
    r !== 0 && (t = r, n = Ji(e, r));
  }
  if (n === 1) throw n = er, zt(e, 0), lt(e, t), ve(e, Y()), n;
  if (n === 6) throw Error(_(345));
  return e.finishedWork = e.current.alternate, e.finishedLanes = t, jt(e, pe, We), ve(e, Y()), null;
}
function Ho(e, t) {
  var n = D;
  D |= 1;
  try {
    return e(t);
  } finally {
    D = n, D === 0 && (cn = Y() + 500, xl && xt());
  }
}
function Rt(e) {
  ot !== null && ot.tag === 0 && !(D & 6) && tn();
  var t = D;
  D |= 1;
  var n = ze.transition, r = F;
  try {
    if (ze.transition = null, F = 1, e) return e();
  } finally {
    F = r, ze.transition = n, D = t, !(D & 6) && xt();
  }
}
function Ko() {
  xe = Yt.current, A(Yt);
}
function zt(e, t) {
  e.finishedWork = null, e.finishedLanes = 0;
  var n = e.timeoutHandle;
  if (n !== -1 && (e.timeoutHandle = -1, Pf(n)), X !== null) for (n = X.return; n !== null; ) {
    var r = n;
    switch (Eo(r), r.tag) {
      case 1:
        r = r.type.childContextTypes, r != null && Zr();
        break;
      case 3:
        an(), A(me), A(ae), Oo();
        break;
      case 5:
        Mo(r);
        break;
      case 4:
        an();
        break;
      case 13:
        A(V);
        break;
      case 19:
        A(V);
        break;
      case 10:
        bo(r.type._context);
        break;
      case 22:
      case 23:
        Ko();
    }
    n = n.return;
  }
  if (te = e, X = e = ht(e.current, null), re = xe = t, J = 0, er = null, Vo = jl = Lt = 0, pe = Mn = null, Nt !== null) {
    for (t = 0; t < Nt.length; t++) if (n = Nt[t], r = n.interleaved, r !== null) {
      n.interleaved = null;
      var l = r.next, i = n.pending;
      if (i !== null) {
        var o = i.next;
        i.next = l, r.next = o;
      }
      n.pending = r;
    }
    Nt = null;
  }
  return e;
}
function kc(e, t) {
  do {
    var n = X;
    try {
      if ($o(), Mr.current = ol, il) {
        for (var r = Q.memoizedState; r !== null; ) {
          var l = r.queue;
          l !== null && (l.pending = null), r = r.next;
        }
        il = !1;
      }
      if (Tt = 0, ee = Z = Q = null, Ln = !1, Zn = 0, Wo.current = null, n === null || n.return === null) {
        J = 1, er = t, X = null;
        break;
      }
      e: {
        var i = e, o = n.return, a = n, u = t;
        if (t = re, a.flags |= 32768, u !== null && typeof u == "object" && typeof u.then == "function") {
          var c = u, m = a, g = m.tag;
          if (!(m.mode & 1) && (g === 0 || g === 11 || g === 15)) {
            var h = m.alternate;
            h ? (m.updateQueue = h.updateQueue, m.memoizedState = h.memoizedState, m.lanes = h.lanes) : (m.updateQueue = null, m.memoizedState = null);
          }
          var y = Ys(o);
          if (y !== null) {
            y.flags &= -257, Xs(y, o, a, i, t), y.mode & 1 && Gs(i, c, t), t = y, u = c;
            var x = t.updateQueue;
            if (x === null) {
              var S = /* @__PURE__ */ new Set();
              S.add(u), t.updateQueue = S;
            } else x.add(u);
            break e;
          } else {
            if (!(t & 1)) {
              Gs(i, c, t), Go();
              break e;
            }
            u = Error(_(426));
          }
        } else if (W && a.mode & 1) {
          var N = Ys(o);
          if (N !== null) {
            !(N.flags & 65536) && (N.flags |= 256), Xs(N, o, a, i, t), zo(un(u, a));
            break e;
          }
        }
        i = u = un(u, a), J !== 4 && (J = 2), Mn === null ? Mn = [i] : Mn.push(i), i = o;
        do {
          switch (i.tag) {
            case 3:
              i.flags |= 65536, t &= -t, i.lanes |= t;
              var f = lc(i, u, t);
              Bs(i, f);
              break e;
            case 1:
              a = u;
              var d = i.type, p = i.stateNode;
              if (!(i.flags & 128) && (typeof d.getDerivedStateFromError == "function" || p !== null && typeof p.componentDidCatch == "function" && (ft === null || !ft.has(p)))) {
                i.flags |= 65536, t &= -t, i.lanes |= t;
                var v = ic(i, a, t);
                Bs(i, v);
                break e;
              }
          }
          i = i.return;
        } while (i !== null);
      }
      _c(n);
    } catch (k) {
      t = k, X === n && n !== null && (X = n = n.return);
      continue;
    }
    break;
  } while (!0);
}
function Sc() {
  var e = sl.current;
  return sl.current = ol, e === null ? ol : e;
}
function Go() {
  (J === 0 || J === 3 || J === 2) && (J = 4), te === null || !(Lt & 268435455) && !(jl & 268435455) || lt(te, re);
}
function cl(e, t) {
  var n = D;
  D |= 2;
  var r = Sc();
  (te !== e || re !== t) && (We = null, zt(e, t));
  do
    try {
      ep();
      break;
    } catch (l) {
      kc(e, l);
    }
  while (!0);
  if ($o(), D = n, sl.current = r, X !== null) throw Error(_(261));
  return te = null, re = 0, J;
}
function ep() {
  for (; X !== null; ) jc(X);
}
function tp() {
  for (; X !== null && !Nd(); ) jc(X);
}
function jc(e) {
  var t = Cc(e.alternate, e, xe);
  e.memoizedProps = e.pendingProps, t === null ? _c(e) : X = t, Wo.current = null;
}
function _c(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (e = t.return, t.flags & 32768) {
      if (n = Gf(n, t), n !== null) {
        n.flags &= 32767, X = n;
        return;
      }
      if (e !== null) e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
      else {
        J = 6, X = null;
        return;
      }
    } else if (n = Kf(n, t, xe), n !== null) {
      X = n;
      return;
    }
    if (t = t.sibling, t !== null) {
      X = t;
      return;
    }
    X = t = e;
  } while (t !== null);
  J === 0 && (J = 5);
}
function jt(e, t, n) {
  var r = F, l = ze.transition;
  try {
    ze.transition = null, F = 1, np(e, t, n, r);
  } finally {
    ze.transition = l, F = r;
  }
  return null;
}
function np(e, t, n, r) {
  do
    tn();
  while (ot !== null);
  if (D & 6) throw Error(_(327));
  n = e.finishedWork;
  var l = e.finishedLanes;
  if (n === null) return null;
  if (e.finishedWork = null, e.finishedLanes = 0, n === e.current) throw Error(_(177));
  e.callbackNode = null, e.callbackPriority = 0;
  var i = n.lanes | n.childLanes;
  if (Md(e, i), e === te && (X = te = null, re = 0), !(n.subtreeFlags & 2064) && !(n.flags & 2064) || Er || (Er = !0, Ec(Qr, function() {
    return tn(), null;
  })), i = (n.flags & 15990) !== 0, n.subtreeFlags & 15990 || i) {
    i = ze.transition, ze.transition = null;
    var o = F;
    F = 1;
    var a = D;
    D |= 4, Wo.current = null, Xf(e, n), yc(n, e), Sf($i), Kr = !!Pi, $i = Pi = null, e.current = n, Zf(n), Cd(), D = a, F = o, ze.transition = i;
  } else e.current = n;
  if (Er && (Er = !1, ot = e, ul = l), i = e.pendingLanes, i === 0 && (ft = null), Pd(n.stateNode), ve(e, Y()), t !== null) for (r = e.onRecoverableError, n = 0; n < t.length; n++) l = t[n], r(l.value, { componentStack: l.stack, digest: l.digest });
  if (al) throw al = !1, e = Xi, Xi = null, e;
  return ul & 1 && e.tag !== 0 && tn(), i = e.pendingLanes, i & 1 ? e === Zi ? On++ : (On = 0, Zi = e) : On = 0, xt(), null;
}
function tn() {
  if (ot !== null) {
    var e = lu(ul), t = ze.transition, n = F;
    try {
      if (ze.transition = null, F = 16 > e ? 16 : e, ot === null) var r = !1;
      else {
        if (e = ot, ot = null, ul = 0, D & 6) throw Error(_(331));
        var l = D;
        for (D |= 4, z = e.current; z !== null; ) {
          var i = z, o = i.child;
          if (z.flags & 16) {
            var a = i.deletions;
            if (a !== null) {
              for (var u = 0; u < a.length; u++) {
                var c = a[u];
                for (z = c; z !== null; ) {
                  var m = z;
                  switch (m.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Rn(8, m, i);
                  }
                  var g = m.child;
                  if (g !== null) g.return = m, z = g;
                  else for (; z !== null; ) {
                    m = z;
                    var h = m.sibling, y = m.return;
                    if (mc(m), m === c) {
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
              var x = i.alternate;
              if (x !== null) {
                var S = x.child;
                if (S !== null) {
                  x.child = null;
                  do {
                    var N = S.sibling;
                    S.sibling = null, S = N;
                  } while (S !== null);
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
                Rn(9, i, i.return);
            }
            var f = i.sibling;
            if (f !== null) {
              f.return = i.return, z = f;
              break e;
            }
            z = i.return;
          }
        }
        var d = e.current;
        for (z = d; z !== null; ) {
          o = z;
          var p = o.child;
          if (o.subtreeFlags & 2064 && p !== null) p.return = o, z = p;
          else e: for (o = d; z !== null; ) {
            if (a = z, a.flags & 2048) try {
              switch (a.tag) {
                case 0:
                case 11:
                case 15:
                  Sl(9, a);
              }
            } catch (k) {
              K(a, a.return, k);
            }
            if (a === o) {
              z = null;
              break e;
            }
            var v = a.sibling;
            if (v !== null) {
              v.return = a.return, z = v;
              break e;
            }
            z = a.return;
          }
        }
        if (D = l, xt(), Ae && typeof Ae.onPostCommitFiberRoot == "function") try {
          Ae.onPostCommitFiberRoot(hl, e);
        } catch {
        }
        r = !0;
      }
      return r;
    } finally {
      F = n, ze.transition = t;
    }
  }
  return !1;
}
function ua(e, t, n) {
  t = un(n, t), t = lc(e, t, 1), e = dt(e, t, 1), t = ce(), e !== null && (ir(e, 1, t), ve(e, t));
}
function K(e, t, n) {
  if (e.tag === 3) ua(e, e, n);
  else for (; t !== null; ) {
    if (t.tag === 3) {
      ua(t, e, n);
      break;
    } else if (t.tag === 1) {
      var r = t.stateNode;
      if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (ft === null || !ft.has(r))) {
        e = un(n, e), e = ic(t, e, 1), t = dt(t, e, 1), e = ce(), t !== null && (ir(t, 1, e), ve(t, e));
        break;
      }
    }
    t = t.return;
  }
}
function rp(e, t, n) {
  var r = e.pingCache;
  r !== null && r.delete(t), t = ce(), e.pingedLanes |= e.suspendedLanes & n, te === e && (re & n) === n && (J === 4 || J === 3 && (re & 130023424) === re && 500 > Y() - Qo ? zt(e, 0) : Vo |= n), ve(e, t);
}
function Nc(e, t) {
  t === 0 && (e.mode & 1 ? (t = vr, vr <<= 1, !(vr & 130023424) && (vr = 4194304)) : t = 1);
  var n = ce();
  e = Ze(e, t), e !== null && (ir(e, t, n), ve(e, n));
}
function lp(e) {
  var t = e.memoizedState, n = 0;
  t !== null && (n = t.retryLane), Nc(e, n);
}
function ip(e, t) {
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
      throw Error(_(314));
  }
  r !== null && r.delete(t), Nc(e, n);
}
var Cc;
Cc = function(e, t, n) {
  if (e !== null) if (e.memoizedProps !== t.pendingProps || me.current) he = !0;
  else {
    if (!(e.lanes & n) && !(t.flags & 128)) return he = !1, Hf(e, t, n);
    he = !!(e.flags & 131072);
  }
  else he = !1, W && t.flags & 1048576 && $u(t, el, t.index);
  switch (t.lanes = 0, t.tag) {
    case 2:
      var r = t.type;
      Dr(e, t), e = t.pendingProps;
      var l = ln(t, ae.current);
      en(t, n), l = Fo(null, t, r, e, l, n);
      var i = Io();
      return t.flags |= 1, typeof l == "object" && l !== null && typeof l.render == "function" && l.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, ge(r) ? (i = !0, Jr(t)) : i = !1, t.memoizedState = l.state !== null && l.state !== void 0 ? l.state : null, Lo(t), l.updater = kl, t.stateNode = l, l._reactInternals = t, Ii(t, r, e, n), t = Bi(null, t, r, !0, i, n)) : (t.tag = 0, W && i && Co(t), ue(null, t, l, n), t = t.child), t;
    case 16:
      r = t.elementType;
      e: {
        switch (Dr(e, t), e = t.pendingProps, l = r._init, r = l(r._payload), t.type = r, l = t.tag = sp(r), e = Te(r, e), l) {
          case 0:
            t = Ai(null, t, r, e, n);
            break e;
          case 1:
            t = qs(null, t, r, e, n);
            break e;
          case 11:
            t = Zs(null, t, r, e, n);
            break e;
          case 14:
            t = Js(null, t, r, Te(r.type, e), n);
            break e;
        }
        throw Error(_(
          306,
          r,
          ""
        ));
      }
      return t;
    case 0:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : Te(r, l), Ai(e, t, r, l, n);
    case 1:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : Te(r, l), qs(e, t, r, l, n);
    case 3:
      e: {
        if (uc(t), e === null) throw Error(_(387));
        r = t.pendingProps, i = t.memoizedState, l = i.element, Ou(e, t), rl(t, r, null, n);
        var o = t.memoizedState;
        if (r = o.element, i.isDehydrated) if (i = { element: r, isDehydrated: !1, cache: o.cache, pendingSuspenseBoundaries: o.pendingSuspenseBoundaries, transitions: o.transitions }, t.updateQueue.baseState = i, t.memoizedState = i, t.flags & 256) {
          l = un(Error(_(423)), t), t = ea(e, t, r, n, l);
          break e;
        } else if (r !== l) {
          l = un(Error(_(424)), t), t = ea(e, t, r, n, l);
          break e;
        } else for (we = ct(t.stateNode.containerInfo.firstChild), ke = t, W = !0, Re = null, n = Ru(t, null, r, n), t.child = n; n; ) n.flags = n.flags & -3 | 4096, n = n.sibling;
        else {
          if (on(), r === l) {
            t = Je(e, t, n);
            break e;
          }
          ue(e, t, r, n);
        }
        t = t.child;
      }
      return t;
    case 5:
      return Du(t), e === null && Oi(t), r = t.type, l = t.pendingProps, i = e !== null ? e.memoizedProps : null, o = l.children, bi(r, l) ? o = null : i !== null && bi(r, i) && (t.flags |= 32), ac(e, t), ue(e, t, o, n), t.child;
    case 6:
      return e === null && Oi(t), null;
    case 13:
      return cc(e, t, n);
    case 4:
      return Ro(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = sn(t, null, r, n) : ue(e, t, r, n), t.child;
    case 11:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : Te(r, l), Zs(e, t, r, l, n);
    case 7:
      return ue(e, t, t.pendingProps, n), t.child;
    case 8:
      return ue(e, t, t.pendingProps.children, n), t.child;
    case 12:
      return ue(e, t, t.pendingProps.children, n), t.child;
    case 10:
      e: {
        if (r = t.type._context, l = t.pendingProps, i = t.memoizedProps, o = l.value, I(tl, r._currentValue), r._currentValue = o, i !== null) if (De(i.value, o)) {
          if (i.children === l.children && !me.current) {
            t = Je(e, t, n);
            break e;
          }
        } else for (i = t.child, i !== null && (i.return = t); i !== null; ) {
          var a = i.dependencies;
          if (a !== null) {
            o = i.child;
            for (var u = a.firstContext; u !== null; ) {
              if (u.context === r) {
                if (i.tag === 1) {
                  u = Ge(-1, n & -n), u.tag = 2;
                  var c = i.updateQueue;
                  if (c !== null) {
                    c = c.shared;
                    var m = c.pending;
                    m === null ? u.next = u : (u.next = m.next, m.next = u), c.pending = u;
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
            if (o = i.return, o === null) throw Error(_(341));
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
      return l = t.type, r = t.pendingProps.children, en(t, n), l = Pe(l), r = r(l), t.flags |= 1, ue(e, t, r, n), t.child;
    case 14:
      return r = t.type, l = Te(r, t.pendingProps), l = Te(r.type, l), Js(e, t, r, l, n);
    case 15:
      return oc(e, t, t.type, t.pendingProps, n);
    case 17:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : Te(r, l), Dr(e, t), t.tag = 1, ge(r) ? (e = !0, Jr(t)) : e = !1, en(t, n), rc(t, r, l), Ii(t, r, l, n), Bi(null, t, r, !0, e, n);
    case 19:
      return dc(e, t, n);
    case 22:
      return sc(e, t, n);
  }
  throw Error(_(156, t.tag));
};
function Ec(e, t) {
  return eu(e, t);
}
function op(e, t, n, r) {
  this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
}
function Ee(e, t, n, r) {
  return new op(e, t, n, r);
}
function Yo(e) {
  return e = e.prototype, !(!e || !e.isReactComponent);
}
function sp(e) {
  if (typeof e == "function") return Yo(e) ? 1 : 0;
  if (e != null) {
    if (e = e.$$typeof, e === ho) return 11;
    if (e === mo) return 14;
  }
  return 2;
}
function ht(e, t) {
  var n = e.alternate;
  return n === null ? (n = Ee(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 14680064, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n;
}
function Ur(e, t, n, r, l, i) {
  var o = 2;
  if (r = e, typeof e == "function") Yo(e) && (o = 1);
  else if (typeof e == "string") o = 5;
  else e: switch (e) {
    case It:
      return Pt(n.children, l, i, t);
    case po:
      o = 8, l |= 8;
      break;
    case ui:
      return e = Ee(12, n, t, l | 2), e.elementType = ui, e.lanes = i, e;
    case ci:
      return e = Ee(13, n, t, l), e.elementType = ci, e.lanes = i, e;
    case di:
      return e = Ee(19, n, t, l), e.elementType = di, e.lanes = i, e;
    case Da:
      return _l(n, l, i, t);
    default:
      if (typeof e == "object" && e !== null) switch (e.$$typeof) {
        case Ma:
          o = 10;
          break e;
        case Oa:
          o = 9;
          break e;
        case ho:
          o = 11;
          break e;
        case mo:
          o = 14;
          break e;
        case tt:
          o = 16, r = null;
          break e;
      }
      throw Error(_(130, e == null ? e : typeof e, ""));
  }
  return t = Ee(o, n, t, l), t.elementType = e, t.type = r, t.lanes = i, t;
}
function Pt(e, t, n, r) {
  return e = Ee(7, e, r, t), e.lanes = n, e;
}
function _l(e, t, n, r) {
  return e = Ee(22, e, r, t), e.elementType = Da, e.lanes = n, e.stateNode = { isHidden: !1 }, e;
}
function ii(e, t, n) {
  return e = Ee(6, e, null, t), e.lanes = n, e;
}
function oi(e, t, n) {
  return t = Ee(4, e.children !== null ? e.children : [], e.key, t), t.lanes = n, t.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }, t;
}
function ap(e, t, n, r, l) {
  this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = Ul(0), this.expirationTimes = Ul(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Ul(0), this.identifierPrefix = r, this.onRecoverableError = l, this.mutableSourceEagerHydrationData = null;
}
function Xo(e, t, n, r, l, i, o, a, u) {
  return e = new ap(e, t, n, a, u), t === 1 ? (t = 1, i === !0 && (t |= 8)) : t = 0, i = Ee(3, null, null, t), e.current = i, i.stateNode = e, i.memoizedState = { element: r, isDehydrated: n, cache: null, transitions: null, pendingSuspenseBoundaries: null }, Lo(i), e;
}
function up(e, t, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return { $$typeof: Ft, key: r == null ? null : "" + r, children: e, containerInfo: t, implementation: n };
}
function zc(e) {
  if (!e) return gt;
  e = e._reactInternals;
  e: {
    if (Ot(e) !== e || e.tag !== 1) throw Error(_(170));
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
    throw Error(_(171));
  }
  if (e.tag === 1) {
    var n = e.type;
    if (ge(n)) return zu(e, n, t);
  }
  return t;
}
function Pc(e, t, n, r, l, i, o, a, u) {
  return e = Xo(n, r, !0, e, l, i, o, a, u), e.context = zc(null), n = e.current, r = ce(), l = pt(n), i = Ge(r, l), i.callback = t ?? null, dt(n, i, l), e.current.lanes = l, ir(e, l, r), ve(e, r), e;
}
function Nl(e, t, n, r) {
  var l = t.current, i = ce(), o = pt(l);
  return n = zc(n), t.context === null ? t.context = n : t.pendingContext = n, t = Ge(i, o), t.payload = { element: e }, r = r === void 0 ? null : r, r !== null && (t.callback = r), e = dt(l, t, o), e !== null && (Oe(e, l, o, i), Rr(e, l, o)), o;
}
function dl(e) {
  if (e = e.current, !e.child) return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function ca(e, t) {
  if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t;
  }
}
function Zo(e, t) {
  ca(e, t), (e = e.alternate) && ca(e, t);
}
function cp() {
  return null;
}
var $c = typeof reportError == "function" ? reportError : function(e) {
  console.error(e);
};
function Jo(e) {
  this._internalRoot = e;
}
Cl.prototype.render = Jo.prototype.render = function(e) {
  var t = this._internalRoot;
  if (t === null) throw Error(_(409));
  Nl(e, t, null, null);
};
Cl.prototype.unmount = Jo.prototype.unmount = function() {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    Rt(function() {
      Nl(null, e, null, null);
    }), t[Xe] = null;
  }
};
function Cl(e) {
  this._internalRoot = e;
}
Cl.prototype.unstable_scheduleHydration = function(e) {
  if (e) {
    var t = su();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < rt.length && t !== 0 && t < rt[n].priority; n++) ;
    rt.splice(n, 0, e), n === 0 && uu(e);
  }
};
function qo(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
}
function El(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "));
}
function da() {
}
function dp(e, t, n, r, l) {
  if (l) {
    if (typeof r == "function") {
      var i = r;
      r = function() {
        var c = dl(o);
        i.call(c);
      };
    }
    var o = Pc(t, r, e, 0, null, !1, !1, "", da);
    return e._reactRootContainer = o, e[Xe] = o.current, Hn(e.nodeType === 8 ? e.parentNode : e), Rt(), o;
  }
  for (; l = e.lastChild; ) e.removeChild(l);
  if (typeof r == "function") {
    var a = r;
    r = function() {
      var c = dl(u);
      a.call(c);
    };
  }
  var u = Xo(e, 0, !1, null, null, !1, !1, "", da);
  return e._reactRootContainer = u, e[Xe] = u.current, Hn(e.nodeType === 8 ? e.parentNode : e), Rt(function() {
    Nl(t, u, n, r);
  }), u;
}
function zl(e, t, n, r, l) {
  var i = n._reactRootContainer;
  if (i) {
    var o = i;
    if (typeof l == "function") {
      var a = l;
      l = function() {
        var u = dl(o);
        a.call(u);
      };
    }
    Nl(t, o, e, l);
  } else o = dp(n, t, e, l, r);
  return dl(o);
}
iu = function(e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = Cn(t.pendingLanes);
        n !== 0 && (yo(t, n | 1), ve(t, Y()), !(D & 6) && (cn = Y() + 500, xt()));
      }
      break;
    case 13:
      Rt(function() {
        var r = Ze(e, 1);
        if (r !== null) {
          var l = ce();
          Oe(r, e, 1, l);
        }
      }), Zo(e, 1);
  }
};
xo = function(e) {
  if (e.tag === 13) {
    var t = Ze(e, 134217728);
    if (t !== null) {
      var n = ce();
      Oe(t, e, 134217728, n);
    }
    Zo(e, 134217728);
  }
};
ou = function(e) {
  if (e.tag === 13) {
    var t = pt(e), n = Ze(e, t);
    if (n !== null) {
      var r = ce();
      Oe(n, e, t, r);
    }
    Zo(e, t);
  }
};
su = function() {
  return F;
};
au = function(e, t) {
  var n = F;
  try {
    return F = e, t();
  } finally {
    F = n;
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
            var l = yl(r);
            if (!l) throw Error(_(90));
            Ia(r), hi(r, l);
          }
        }
      }
      break;
    case "textarea":
      Aa(e, n);
      break;
    case "select":
      t = n.value, t != null && Xt(e, !!n.multiple, t, !1);
  }
};
Ga = Ho;
Ya = Rt;
var fp = { usingClientEntryPoint: !1, Events: [sr, Wt, yl, Ha, Ka, Ho] }, jn = { findFiberByHostInstance: _t, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, pp = { bundleType: jn.bundleType, version: jn.version, rendererPackageName: jn.rendererPackageName, rendererConfig: jn.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: qe.ReactCurrentDispatcher, findHostInstanceByFiber: function(e) {
  return e = Ja(e), e === null ? null : e.stateNode;
}, findFiberByHostInstance: jn.findFiberByHostInstance || cp, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var zr = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!zr.isDisabled && zr.supportsFiber) try {
    hl = zr.inject(pp), Ae = zr;
  } catch {
  }
}
je.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = fp;
je.createPortal = function(e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!qo(t)) throw Error(_(200));
  return up(e, t, null, n);
};
je.createRoot = function(e, t) {
  if (!qo(e)) throw Error(_(299));
  var n = !1, r = "", l = $c;
  return t != null && (t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onRecoverableError !== void 0 && (l = t.onRecoverableError)), t = Xo(e, 1, !1, null, null, n, !1, r, l), e[Xe] = t.current, Hn(e.nodeType === 8 ? e.parentNode : e), new Jo(t);
};
je.findDOMNode = function(e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function" ? Error(_(188)) : (e = Object.keys(e).join(","), Error(_(268, e)));
  return e = Ja(t), e = e === null ? null : e.stateNode, e;
};
je.flushSync = function(e) {
  return Rt(e);
};
je.hydrate = function(e, t, n) {
  if (!El(t)) throw Error(_(200));
  return zl(null, e, t, !0, n);
};
je.hydrateRoot = function(e, t, n) {
  if (!qo(e)) throw Error(_(405));
  var r = n != null && n.hydratedSources || null, l = !1, i = "", o = $c;
  if (n != null && (n.unstable_strictMode === !0 && (l = !0), n.identifierPrefix !== void 0 && (i = n.identifierPrefix), n.onRecoverableError !== void 0 && (o = n.onRecoverableError)), t = Pc(t, null, e, 1, n ?? null, l, !1, i, o), e[Xe] = t.current, Hn(e), r) for (e = 0; e < r.length; e++) n = r[e], l = n._getVersion, l = l(n._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [n, l] : t.mutableSourceEagerHydrationData.push(
    n,
    l
  );
  return new Cl(t);
};
je.render = function(e, t, n) {
  if (!El(t)) throw Error(_(200));
  return zl(null, e, t, !1, n);
};
je.unmountComponentAtNode = function(e) {
  if (!El(e)) throw Error(_(40));
  return e._reactRootContainer ? (Rt(function() {
    zl(null, null, e, !1, function() {
      e._reactRootContainer = null, e[Xe] = null;
    });
  }), !0) : !1;
};
je.unstable_batchedUpdates = Ho;
je.unstable_renderSubtreeIntoContainer = function(e, t, n, r) {
  if (!El(n)) throw Error(_(200));
  if (e == null || e._reactInternals === void 0) throw Error(_(38));
  return zl(e, t, n, !1, r);
};
je.version = "18.3.1-next-f1338f8080-20240426";
function bc() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(bc);
    } catch (e) {
      console.error(e);
    }
}
bc(), ba.exports = je;
var hp = ba.exports, Tc, fa = hp;
Tc = fa.createRoot, fa.hydrateRoot;
function M({ name: e, className: t }) {
  return /* @__PURE__ */ s.jsx("span", { className: `icon-wrap ${t ?? ""}`, "aria-hidden": "true", children: /* @__PURE__ */ s.jsx("ha-icon", { icon: e.includes(":") ? e : `mdi:${e}` }) });
}
function mp() {
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
const Et = "No room", gp = {
  RDM002: "Hue Tap Dial",
  RWL020: "Hue Dimmer switch",
  RWL021: "Hue Dimmer switch",
  RWL022: "Hue Dimmer switch",
  ROM001: "Hue Smart button"
}, nn = (e) => e.model === "RDM002", eo = (e) => nn(e) ? { press: "one of the dial's four buttons", rest: "Turn to dim · hold a button for off" } : { press: "the Hue button", rest: "Power button turns on/off · up/down dim" }, Lc = (e) => e.model && gp[e.model] || [e.manufacturer, e.model].filter(Boolean).join(" ");
function Pl(e, t) {
  const n = e.dial, r = n ? t.find((o) => o.id === n.group_id) : void 0, l = !!n && e.bound.some((o) => o.group_id === n.group_id), i = !!n && !!r && n.buttons.every(([, o]) => r.scenes.some((a) => a.id === o));
  return { found: !!n, group: r, bound: l, saved: i, done: [!!n, !!r, l, i].filter(Boolean).length };
}
function ur(e, t) {
  if (e.dial_supported)
    return Pl(e, t).done === 4 ? { state: "ok", label: "Set up" } : !e.dial && !e.bound.length ? { state: "idle", label: "Not set up" } : { state: "attention", label: "Needs set-up" };
  const n = e.bound.length;
  return n ? { state: "ok", label: n > 1 ? `Bound to ${n}` : "Bound" } : { state: "idle", label: "Not bound" };
}
function vp(e, t, n) {
  const r = /* @__PURE__ */ new Map(), l = (i) => {
    let o = r.get(i);
    return o || (o = { name: i, icon: n[i] || "mdi:home-outline", groups: [], remotes: [], attention: [] }, r.set(i, o)), o;
  };
  for (const i of e) l(i.areas[0] ?? Et).groups.push(i);
  for (const i of t) {
    const o = l(i.area ?? Et);
    o.remotes.push(i), ur(i, e).state === "attention" && o.attention.push(i);
  }
  return [...r.values()].sort(
    (i, o) => +(o.attention.length > 0) - +(i.attention.length > 0) || +(i.name === Et) - +(o.name === Et) || i.name.localeCompare(o.name)
  );
}
const Ke = (e, t) => {
  var n;
  return !!t && ((n = e.states[t]) == null ? void 0 : n.state) === "on";
}, es = (e, t) => t.reduce((n, r) => n + r.members.filter((l) => Ke(e, l.entity_id)).length, 0), Rc = (e) => e.reduce((t, n) => t + n.members.length, 0);
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
function pa(e) {
  if (e == null) return null;
  const t = typeof e == "number" ? e * 1e3 : Date.parse(e);
  if (Number.isNaN(t)) return null;
  const n = Math.max(0, (Date.now() - t) / 1e3);
  return n < 60 ? "just now" : n < 3600 ? `${Math.round(n / 60)} min ago` : n < 86400 ? `${Math.round(n / 3600)} h ago` : n < 172800 ? "yesterday" : `${Math.round(n / 86400)} days ago`;
}
function Dn(e) {
  if ((e == null ? void 0 : e.state) !== "on") return null;
  const [t, n, r] = e.attributes.rgb_color ?? [255, 214, 170], l = 0.45 + 0.55 * ((e.attributes.brightness ?? 255) / 255);
  return `rgb(${Math.round(t * l)}, ${Math.round(n * l)}, ${Math.round(r * l)})`;
}
const Mc = (e) => e.flatMap((t) => t.entity_id ? [t.entity_id] : t.members.filter((n) => n.entity_id).map((n) => n.entity_id));
function Oc(e) {
  const t = e.map(([n, r, l, i]) => (0.299 * n + 0.587 * r + 0.114 * l) / 255 * (0.35 + 0.65 * (i / 255)));
  return t.reduce((n, r) => n + r, 0) / t.length;
}
const yp = (e) => {
  const t = (e ?? []).filter((n) => !!n);
  return e != null && e.length ? !!t.length && Oc(t) > 0.62 : !0;
};
function ts(e, t) {
  const n = [];
  for (const o of t)
    for (const a of o.members) {
      const u = a.entity_id ? e.states[a.entity_id] : void 0;
      (u == null ? void 0 : u.state) === "on" && n.push([...u.attributes.rgb_color ?? [255, 214, 170], u.attributes.brightness ?? 255]);
    }
  if (!n.length) return null;
  const r = [...new Set(n.map((o) => Dn({ state: "on", attributes: { rgb_color: o.slice(0, 3), brightness: o[3] } })))].slice(0, 3), l = r.length === 1 ? [r[0], `color-mix(in srgb, ${r[0]} 70%, black)`] : r, i = Math.min(0.5, Math.max(0.15, (Oc(n) - 0.35) * 0.9));
  return `linear-gradient(rgba(0,0,0,${i.toFixed(2)}), rgba(0,0,0,${i.toFixed(2)})), linear-gradient(120deg, ${l.join(", ")})`;
}
function Dc(e, t) {
  const n = t.flatMap((r) => r.members.map((l) => l.entity_id ? e.states[l.entity_id] : void 0)).filter((r) => (r == null ? void 0 : r.state) === "on");
  return n.length ? Math.round(n.reduce((r, l) => r + (l.attributes.brightness ?? 255), 0) / n.length / 2.55) : 0;
}
function xp({ scene: e, badge: t, disabled: n, onRecall: r }) {
  return /* @__PURE__ */ s.jsxs("button", { className: "chip-btn scene-chip", disabled: n, onClick: r, title: `Recall ${e.name}`, children: [
    /* @__PURE__ */ s.jsx("span", { className: "dot", style: { background: $l(e.colors) } }),
    e.name,
    t && /* @__PURE__ */ s.jsx("span", { className: "badge", children: t })
  ] });
}
function to({ scene: e, badge: t, warn: n, busy: r, onRecall: l, onOverwrite: i, onEdit: o, onRename: a, onDelete: u }) {
  const [c, m] = L.useState(!1), [g, h] = L.useState(!1), [y, x] = L.useState(e.name);
  return g ? /* @__PURE__ */ s.jsxs(
    "form",
    {
      className: "tile tile-form",
      onSubmit: (S) => {
        S.preventDefault(), h(!1), y.trim() && y !== e.name && (a == null || a(y));
      },
      children: [
        /* @__PURE__ */ s.jsx("input", { type: "text", value: y, maxLength: 40, autoFocus: !0, onChange: (S) => x(S.target.value), "aria-label": "Scene name" }),
        /* @__PURE__ */ s.jsxs("div", { className: "tile-form-actions", children: [
          /* @__PURE__ */ s.jsx("button", { type: "button", className: "ghost", onClick: () => h(!1), children: "Cancel" }),
          /* @__PURE__ */ s.jsx("button", { type: "submit", className: "primary", children: "Save" })
        ] })
      ]
    }
  ) : /* @__PURE__ */ s.jsxs("div", { className: `tile-wrap ${yp(e.colors) ? "pale" : ""}`, children: [
    /* @__PURE__ */ s.jsxs("button", { className: "tile", style: { background: $l(e.colors) }, disabled: r, onClick: l, title: `Recall ${e.name}`, children: [
      t && /* @__PURE__ */ s.jsx("span", { className: "badge", children: t }),
      /* @__PURE__ */ s.jsx("span", { className: "tile-name", children: e.name }),
      n && /* @__PURE__ */ s.jsx("span", { className: "tile-warn", children: n })
    ] }),
    /* @__PURE__ */ s.jsx("button", { className: "tile-more", disabled: r, onClick: () => m(!c), "aria-label": `More for ${e.name}`, children: /* @__PURE__ */ s.jsx(M, { name: "dots-vertical" }) }),
    c && /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
      /* @__PURE__ */ s.jsx("div", { className: "menu-backdrop", onClick: () => m(!1) }),
      /* @__PURE__ */ s.jsxs("div", { className: "menu", role: "menu", children: [
        o && /* @__PURE__ */ s.jsxs("button", { role: "menuitem", onClick: () => {
          m(!1), o();
        }, children: [
          /* @__PURE__ */ s.jsx(M, { name: "palette-outline" }),
          " Edit colours"
        ] }),
        /* @__PURE__ */ s.jsxs("button", { role: "menuitem", onClick: () => {
          m(!1), i();
        }, children: [
          /* @__PURE__ */ s.jsx(M, { name: "content-save-edit-outline" }),
          " Save current state here"
        ] }),
        a && /* @__PURE__ */ s.jsxs("button", { role: "menuitem", onClick: () => {
          m(!1), x(e.name), h(!0);
        }, children: [
          /* @__PURE__ */ s.jsx(M, { name: "pencil-outline" }),
          " Rename"
        ] }),
        u && /* @__PURE__ */ s.jsxs("button", { role: "menuitem", className: "danger", onClick: () => {
          m(!1), u();
        }, children: [
          /* @__PURE__ */ s.jsx(M, { name: "delete-outline" }),
          " Delete"
        ] })
      ] })
    ] })
  ] });
}
function no({ badge: e, label: t, busy: n, onSave: r, onOpen: l }) {
  const [i, o] = L.useState(!1), [a, u] = L.useState("");
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
    e ? /* @__PURE__ */ s.jsx("span", { className: "add-dots", children: e }) : /* @__PURE__ */ s.jsx(M, { name: "plus" }),
    /* @__PURE__ */ s.jsx("span", { children: t })
  ] });
}
function ro(e, t) {
  var l, i;
  if (e.table_error) return " Couldn't read its other bindings to clear them; press a button and Bind again.";
  const n = (o) => [...new Set(o.map((a) => a.group_id != null ? t(a.group_id) : "a device directly"))].join(", ");
  let r = "";
  return (l = e.removed) != null && l.length && (r += ` Removed ${ye(e.removed.length, "old binding")} (${n(e.removed)}).`), (i = e.remove_failed) != null && i.length && (r += ` Couldn't remove ${ye(e.remove_failed.length, "binding")} (${n(e.remove_failed)}); Bind again.`), r;
}
const ha = { 6: "On/off", 8: "Dimming", 5: "Scenes" }, Fc = (e) => String((e == null ? void 0 : e.message) ?? e), fl = (e) => `0x${e.toString(16).padStart(4, "0").toUpperCase()}`, tr = (e) => /^\d/.test(e) ? "●".repeat(parseInt(e, 10)) : e.split(" ").pop(), ye = (e, t) => `${e} ${t}${e === 1 ? "" : "s"}`;
function wp({ getHass: e, remote: t, groups: n, busy: r, act: l, onChanged: i }) {
  var p, v;
  const o = t.cycle, a = t.cycle_trigger, [u, c] = L.useState(!1), [m, g] = L.useState((o == null ? void 0 : o.group_id) ?? ((p = n.find((k) => k.scenes.length)) == null ? void 0 : p.id) ?? ((v = n[0]) == null ? void 0 : v.id) ?? 0), [h, y] = L.useState((o == null ? void 0 : o.scene_ids) ?? []), x = n.find((k) => k.id === m), S = o ? n.find((k) => k.id === o.group_id) : void 0, N = (k) => y((E) => E.includes(k) ? E.filter((C) => C !== k) : [...E, k]), f = (k) => l(async () => (await e().callWS(
    k ? { type: "hue_remote_scenes/set_cycle", ieee: t.ieee } : { type: "hue_remote_scenes/set_cycle", ieee: t.ieee, group_id: m, scene_ids: h }
  ), c(!1), i(), k ? "Stopped cycling scenes." : `${a.label} now cycles ${ye(h.length, "scene")}.`), "Saving…"), d = (k, E, C) => l(async () => (await e().callWS({ type: "hue_remote_scenes/recall", group_id: k, scene_id: E }), `Recalled ${C}`));
  return /* @__PURE__ */ s.jsxs("div", { className: "stack-sm", children: [
    /* @__PURE__ */ s.jsx("h3", { children: "Scene cycle" }),
    !u && o && S && /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
      /* @__PURE__ */ s.jsx("div", { className: "chips", children: o.scene_ids.map((k, E) => {
        const C = S.scenes.find((j) => j.id === k);
        return C ? /* @__PURE__ */ s.jsx(xp, { scene: C, badge: String(E + 1), disabled: r, onRecall: () => d(S.id, k, C.name) }, k) : null;
      }) }),
      /* @__PURE__ */ s.jsxs("div", { className: "ctl muted small", children: [
        /* @__PURE__ */ s.jsx(M, { name: "sync" }),
        /* @__PURE__ */ s.jsxs("span", { className: "grow", children: [
          a.label,
          " recalls the next scene in ",
          S.name,
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
      /* @__PURE__ */ s.jsxs("div", { className: "chips", children: [
        ((x == null ? void 0 : x.scenes) ?? []).map((k) => /* @__PURE__ */ s.jsxs("button", { className: `chip-btn ${h.includes(k.id) ? "on" : ""}`, onClick: () => N(k.id), children: [
          h.includes(k.id) && `${h.indexOf(k.id) + 1} · `,
          k.name
        ] }, k.id)),
        x && !x.scenes.length && /* @__PURE__ */ s.jsx("span", { className: "muted small", children: "Save some scenes in this group first." })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "actions", children: [
        /* @__PURE__ */ s.jsx("span", { className: "spacer" }),
        /* @__PURE__ */ s.jsx("button", { className: "ghost", disabled: r, onClick: () => c(!1), children: "Cancel" }),
        /* @__PURE__ */ s.jsx("button", { className: "primary", disabled: r || !h.length, onClick: () => f(!1), children: "Save cycle" })
      ] })
    ] })
  ] });
}
const kp = {
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
}, Sp = (e) => {
  var n;
  if (nn(e)) return "dial";
  const t = ((n = e.model) == null ? void 0 : n.toUpperCase()) ?? "";
  return t.startsWith("RWL") ? "dimmer" : t.startsWith("ROM") || t.startsWith("RDM003") ? "button" : null;
};
function bl({ remote: e, className: t }) {
  const n = Sp(e);
  return n ? /* @__PURE__ */ s.jsx("span", { className: `icon-wrap ${t ?? ""}`, "aria-hidden": "true", children: /* @__PURE__ */ s.jsx("svg", { className: "remote-svg", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.6", strokeLinecap: "round", strokeLinejoin: "round", children: kp[n] }) }) : /* @__PURE__ */ s.jsx(M, { name: e.endpoints.some((r) => r.clusters.includes(8)) ? "remote" : "gesture-tap-button", className: t });
}
function ns() {
  const [e, t] = L.useState(!1), [n, r] = L.useState(null);
  return { busy: e, result: n, act: async (i, o = "Talking to the lights…") => {
    t(o), r(null);
    try {
      const a = await i();
      a && r({ kind: a.includes("didn't") ? "error" : "ok", text: a });
    } catch (a) {
      r({ kind: "error", text: Fc(a) });
    } finally {
      t(!1);
    }
  }, clear: () => r(null) };
}
const jp = [{ title: "Find group" }, { title: "Lights" }, { title: "Bind" }, { title: "Scenes" }];
function _p({ getHass: e, remote: t, groups: n, onChanged: r, onClose: l }) {
  const { busy: i, result: o, act: a, clear: u } = ns(), c = Pl(t, n), [m, g] = L.useState(Math.min(c.done, 3)), h = t.dial, y = c.group;
  L.useEffect(() => {
    g((S) => Math.max(S, Math.min(c.done, 3)));
  }, [c.done]);
  const x = (S) => {
    u(), g(S);
  };
  return /* @__PURE__ */ s.jsxs("section", { className: "card remote", children: [
    /* @__PURE__ */ s.jsxs("div", { className: "card-head", children: [
      /* @__PURE__ */ s.jsxs("div", { className: "title", children: [
        /* @__PURE__ */ s.jsx(bl, { remote: t, className: "title-icon" }),
        /* @__PURE__ */ s.jsxs("div", { children: [
          /* @__PURE__ */ s.jsxs("h2", { children: [
            "Set up ",
            t.name
          ] }),
          /* @__PURE__ */ s.jsx("div", { className: "muted small", children: "Scene buttons that work even when Home Assistant is down" })
        ] })
      ] }),
      /* @__PURE__ */ s.jsxs("button", { className: "ghost", onClick: l, disabled: !!i, children: [
        /* @__PURE__ */ s.jsx(M, { name: "close" }),
        " Close"
      ] })
    ] }),
    /* @__PURE__ */ s.jsx("div", { className: "segmented full steps", role: "tablist", children: jp.map((S, N) => {
      const f = [c.found, !!y, c.bound, c.saved][N];
      return /* @__PURE__ */ s.jsxs("button", { role: "tab", "aria-selected": N === m, className: `${N === m ? "on" : ""} ${f ? "done" : ""}`, onClick: () => x(N), disabled: !!i, children: [
        f && /* @__PURE__ */ s.jsx(M, { name: "check" }),
        S.title
      ] }, S.title);
    }) }),
    m === 0 && /* @__PURE__ */ s.jsx(Np, { getHass: e, remote: t, busy: !!i, act: a, onChanged: r }),
    m === 1 && (h ? /* @__PURE__ */ s.jsx(Cp, { getHass: e, remote: t, group: y, busy: !!i, act: a, onChanged: r }) : /* @__PURE__ */ s.jsx(si, {})),
    m === 2 && (h && y ? /* @__PURE__ */ s.jsx(Ep, { getHass: e, remote: t, group: y, bound: c.bound, busy: !!i, act: a, onChanged: r }) : /* @__PURE__ */ s.jsx(si, {})),
    m === 3 && (h && y ? /* @__PURE__ */ s.jsx(zp, { getHass: e, remote: t, group: y, busy: !!i, act: a, onChanged: r }) : /* @__PURE__ */ s.jsx(si, {})),
    i && /* @__PURE__ */ s.jsx("div", { className: "status busy", children: i }),
    o && /* @__PURE__ */ s.jsx("div", { className: `status ${o.kind}`, children: o.text }),
    /* @__PURE__ */ s.jsxs("div", { className: "card-actions", children: [
      m > 0 && /* @__PURE__ */ s.jsxs("button", { className: "ghost", disabled: !!i, onClick: () => x(m - 1), children: [
        /* @__PURE__ */ s.jsx(M, { name: "chevron-left" }),
        " Back"
      ] }),
      /* @__PURE__ */ s.jsx("span", { className: "spacer" }),
      m < 3 ? /* @__PURE__ */ s.jsxs("button", { className: "primary", disabled: !!i || c.done <= m, onClick: () => x(m + 1), children: [
        "Next ",
        /* @__PURE__ */ s.jsx(M, { name: "chevron-right" })
      ] }) : /* @__PURE__ */ s.jsx("button", { className: "primary", disabled: !!i, onClick: l, children: "Done" })
    ] })
  ] });
}
const si = () => /* @__PURE__ */ s.jsx("p", { className: "muted", children: "Finish the earlier steps first." });
function Np({ getHass: e, remote: t, busy: n, act: r, onChanged: l }) {
  const i = () => r(async () => {
    const o = await e().callWS({ type: "hue_remote_scenes/find_dial_group", ieee: t.ieee });
    return l(), `Its scene buttons use group ${fl(o.group_id)}${o.exists ? ", which ZHA already has" : ""}.`;
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
        /* @__PURE__ */ s.jsx(M, { name: "magnify" }),
        " ",
        t.dial ? "Find again" : "Find its group"
      ] }),
      t.dial && /* @__PURE__ */ s.jsxs("span", { className: "chip ok", children: [
        /* @__PURE__ */ s.jsx(M, { name: "check" }),
        " Uses group ",
        fl(t.dial.group_id)
      ] })
    ] })
  ] });
}
function Cp({ getHass: e, remote: t, group: n, busy: r, act: l, onChanged: i }) {
  const [o, a] = L.useState(null), [u, c] = L.useState(/* @__PURE__ */ new Set()), [m, g] = L.useState(t.name), h = e(), y = new Set((n == null ? void 0 : n.members.map((d) => d.key)) ?? []);
  L.useEffect(() => {
    e().callWS({ type: "hue_remote_scenes/lights" }).then((d) => a(d.lights)).catch(() => a([]));
  }, [e]);
  const x = (d) => c((p) => {
    const v = new Set(p);
    return v.has(d) ? v.delete(d) : v.add(d), v;
  }), S = () => l(async () => (await e().callWS({ type: "hue_remote_scenes/create_group", group_id: t.dial.group_id, name: (n == null ? void 0 : n.name) ?? m, members: [...u] }), c(/* @__PURE__ */ new Set()), i(), n ? `Added ${ye(u.size, "light")} to ${n.name}.` : `Created ${m}. Next, bind the remote to it.`), "Adding the lights to the group…"), N = /* @__PURE__ */ new Map();
  for (const d of o ?? []) {
    const p = d.area ?? Et;
    N.set(p, [...N.get(p) ?? [], d]);
  }
  const f = [...N.keys()].sort(
    (d, p) => +(p === t.area) - +(d === t.area) || +(d === Et) - +(p === Et) || d.localeCompare(p)
  );
  return /* @__PURE__ */ s.jsxs("div", { className: "stack-sm", children: [
    /* @__PURE__ */ s.jsx("h2", { children: n ? `Lights in ${n.name}` : "Which lights should it control?" }),
    /* @__PURE__ */ s.jsx("p", { className: "muted", children: n ? `${ye(n.members.length, "light")} are in the remote's group. Tick more to add them.` : "They'll go in a new ZHA group with the remote's ID. Only lights that can store scenes are listed." }),
    !o && /* @__PURE__ */ s.jsx("p", { className: "muted", children: "Loading lights…" }),
    o && !o.length && /* @__PURE__ */ s.jsx("p", { className: "muted", children: "No lights that can store scenes found." }),
    f.map((d) => /* @__PURE__ */ s.jsxs("div", { className: "stack-sm", children: [
      /* @__PURE__ */ s.jsx("h3", { children: d }),
      /* @__PURE__ */ s.jsx("div", { className: "picks", children: N.get(d).map((p) => {
        const v = y.has(p.key), k = v || u.has(p.key);
        return /* @__PURE__ */ s.jsxs("label", { className: `pick ${k ? "on" : ""}`, children: [
          /* @__PURE__ */ s.jsx("input", { type: "checkbox", checked: k, disabled: v || r, onChange: () => x(p.key) }),
          /* @__PURE__ */ s.jsx("span", { className: `bulb ${Ke(h, p.entity_id) ? "lit" : ""}` }),
          /* @__PURE__ */ s.jsx("span", { children: p.name })
        ] }, p.key);
      }) })
    ] }, d)),
    !n && /* @__PURE__ */ s.jsxs("label", { className: "inline-row", children: [
      /* @__PURE__ */ s.jsx("span", { className: "muted", children: "Group name" }),
      /* @__PURE__ */ s.jsx("input", { type: "text", value: m, maxLength: 40, onChange: (d) => g(d.target.value) })
    ] }),
    /* @__PURE__ */ s.jsxs("div", { className: "inline-row", children: [
      /* @__PURE__ */ s.jsx("span", { className: "muted small spacer", children: u.size ? `${ye(u.size, "light")} selected` : "" }),
      /* @__PURE__ */ s.jsxs("button", { className: "primary", disabled: r || !u.size || !n && !m.trim(), onClick: S, children: [
        /* @__PURE__ */ s.jsx(M, { name: "plus" }),
        " ",
        n ? "Add lights" : "Create group"
      ] })
    ] })
  ] });
}
function Ep({ getHass: e, remote: t, group: n, bound: r, busy: l, act: i, onChanged: o }) {
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
    const m = Object.entries(c.results).filter(([, h]) => h !== "ok");
    if (m.length === Object.keys(c.results).length) return "The remote didn't answer. Press one of its buttons and try again.";
    const g = ro(c, (h) => h === n.id ? n.name : `Group ${fl(h)}`);
    return m.length ? `Bound, but some parts didn't take (${m.map(([h, y]) => `${h}: ${y}`).join(", ")}). Try again.${g}` : `Bound to ${n.name}.${g}`;
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
        /* @__PURE__ */ s.jsx(M, { name: "link-variant-plus" }),
        " ",
        r ? "Bind again" : "Bind"
      ] }),
      r && /* @__PURE__ */ s.jsx("span", { className: "chip ok", children: "Bound" })
    ] })
  ] });
}
function zp({ getHass: e, remote: t, group: n, busy: r, act: l, onChanged: i }) {
  const o = (a, u) => l(async () => {
    const c = await e().callWS({ type: "hue_remote_scenes/store", group_id: n.id, scene_id: a, ...u ? { name: u } : {} });
    i();
    const m = Object.keys(c.failed).length;
    return m ? `Saved on ${c.ok.length} of ${c.ok.length + m} lights; some didn't answer.` : `Saved on ${ye(c.ok.length, "light")}`;
  });
  return /* @__PURE__ */ s.jsxs("div", { className: "stack-sm", children: [
    /* @__PURE__ */ s.jsx("h2", { children: "Save a scene for each button" }),
    /* @__PURE__ */ s.jsxs("p", { className: "muted", children: [
      "Set the ",
      n.name,
      " lights how you want them for a button, then save. Do this for each one. You can change them later from the area."
    ] }),
    /* @__PURE__ */ s.jsx("div", { className: "tiles", children: t.dial.buttons.map(([a, u]) => {
      const c = n.scenes.find((m) => m.id === u);
      return c ? /* @__PURE__ */ s.jsx(
        to,
        {
          scene: c,
          badge: tr(a),
          busy: r,
          onRecall: () => l(async () => (await e().callWS({ type: "hue_remote_scenes/recall", group_id: n.id, scene_id: u }), `Recalled ${c.name}`)),
          onOverwrite: () => confirm(`Save how the lights are now as "${c.name}"?`) && o(u)
        },
        u
      ) : /* @__PURE__ */ s.jsx(no, { badge: tr(a), label: "Save current state", busy: r, onSave: (m) => o(u, m) }, u);
    }) })
  ] });
}
function Pp({ getHass: e, remote: t, groups: n, onBack: r, onChanged: l }) {
  var N;
  const { busy: i, result: o, act: a } = ns(), [u, c] = L.useState(!1), m = e(), g = ur(t, n), h = Pl(t, n), y = t.dial_supported && h.done === 4, x = t.battery_entity ? (N = m.states[t.battery_entity]) == null ? void 0 : N.state : void 0, S = [
    Lc(t),
    x != null && x !== "unavailable" && x !== "unknown" ? `${Math.round(+x)}% battery` : null,
    t.bound.length ? "bound" : "not bound"
  ].filter(Boolean).join(" · ");
  return /* @__PURE__ */ s.jsxs("main", { className: "narrow", children: [
    /* @__PURE__ */ s.jsxs("nav", { className: "crumbs", children: [
      /* @__PURE__ */ s.jsx("button", { className: "link", onClick: r, children: "Remotes" }),
      /* @__PURE__ */ s.jsx(M, { name: "chevron-right" }),
      /* @__PURE__ */ s.jsx("span", { children: t.name })
    ] }),
    /* @__PURE__ */ s.jsxs("div", { className: "dev-head", children: [
      /* @__PURE__ */ s.jsx(bl, { remote: t, className: "dev-icon" }),
      /* @__PURE__ */ s.jsxs("div", { className: "grow", children: [
        /* @__PURE__ */ s.jsx("h2", { className: "dev-name", children: t.name }),
        /* @__PURE__ */ s.jsx("div", { className: "muted", children: S })
      ] }),
      y ? /* @__PURE__ */ s.jsxs("span", { className: "chip ok", children: [
        /* @__PURE__ */ s.jsx(M, { name: "check" }),
        " Works without Home Assistant"
      ] }) : /* @__PURE__ */ s.jsx("span", { className: `chip ${g.state === "ok" ? "ok" : g.state === "attention" ? "warn" : ""}`, children: g.label })
    ] }),
    t.dial_supported && (!y || u) ? /* @__PURE__ */ s.jsx(
      _p,
      {
        getHass: e,
        remote: t,
        groups: n,
        onChanged: l,
        onClose: () => y ? c(!1) : r()
      }
    ) : y && h.group && t.dial ? /* @__PURE__ */ s.jsx($p, { getHass: e, remote: t, group: h.group, busy: !!i, act: a, onChanged: l, onChangeLights: () => c(!0) }) : null,
    !t.dial_supported && /* @__PURE__ */ s.jsx(bp, { getHass: e, remote: t, groups: n, busy: !!i, act: a, onChanged: l }),
    t.cycle_trigger && /* @__PURE__ */ s.jsx("section", { className: "card", children: /* @__PURE__ */ s.jsx(wp, { getHass: e, remote: t, groups: n, busy: !!i, act: a, onChanged: l }) }),
    i && /* @__PURE__ */ s.jsx("div", { className: "status busy", children: i }),
    o && /* @__PURE__ */ s.jsx("div", { className: `status ${o.kind}`, children: o.text }),
    /* @__PURE__ */ s.jsxs("p", { className: "muted small", children: [
      t.checked ? `Bindings last checked ${pa(t.checked)}.` : t.last_seen ? `Last seen ${pa(t.last_seen)}.` : "",
      " Battery remotes sleep: press a button on it just before changing anything here."
    ] })
  ] });
}
const ma = -1, ga = -2;
function $p({ getHass: e, remote: t, group: n, busy: r, act: l, onChanged: i, onChangeLights: o }) {
  const a = t.dial.buttons, u = new Set(a.map(([, g]) => g)), c = (g) => {
    const h = Object.keys(g.failed).length;
    return h ? `Saved on ${g.ok.length} of ${g.ok.length + h} lights; some didn't answer.` : `Saved on ${ye(g.ok.length, "light")}.`;
  }, m = (g, h, y) => {
    const x = n.scenes.find((N) => N.id === h);
    if (y === ga) {
      if (!x || !confirm(`Clear ${g}? This deletes "${x.name}" from the lights.`)) return;
      l(async () => {
        const N = await e().callWS({ type: "hue_remote_scenes/delete", group_id: n.id, scene_id: h });
        return i(), Object.keys(N.failed).length ? `Cleared ${g}, but some lights didn't answer and may still have it.` : `Cleared ${g}.`;
      });
      return;
    }
    if (y === ma) {
      const N = prompt(`Name for ${g}'s scene`, (x == null ? void 0 : x.name) ?? "");
      if (!(N != null && N.trim())) return;
      l(async () => {
        const f = await e().callWS({ type: "hue_remote_scenes/store", group_id: n.id, scene_id: h, name: N });
        return i(), c(f);
      });
      return;
    }
    const S = n.scenes.find((N) => N.id === y);
    l(async () => {
      const N = await e().callWS({ type: "hue_remote_scenes/copy", group_id: n.id, from_scene_id: y, scene_id: h });
      i();
      const f = Object.keys(N.failed).length;
      return f ? `${g} now recalls ${S.name} on ${N.ok.length} of ${N.ok.length + f} lights; some didn't answer.` : `${g} now recalls ${S.name}.`;
    }, "Copying the scene in the lights…");
  };
  return /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
    /* @__PURE__ */ s.jsx("h3", { children: "Controls" }),
    /* @__PURE__ */ s.jsx("div", { className: "list", children: /* @__PURE__ */ s.jsxs("div", { className: "list-row static", children: [
      /* @__PURE__ */ s.jsx("span", { className: "btn-icon", children: /* @__PURE__ */ s.jsx(M, { name: "home-outline" }) }),
      /* @__PURE__ */ s.jsxs("span", { className: "grow", children: [
        /* @__PURE__ */ s.jsx("strong", { children: n.name }),
        /* @__PURE__ */ s.jsx("span", { className: "muted small row-detail", children: n.members.map((g) => g.name).join(", ") })
      ] }),
      /* @__PURE__ */ s.jsxs("button", { className: "ghost", disabled: r, onClick: o, children: [
        "Change lights ",
        /* @__PURE__ */ s.jsx(M, { name: "chevron-right" })
      ] })
    ] }) }),
    /* @__PURE__ */ s.jsx("h3", { children: "Buttons" }),
    /* @__PURE__ */ s.jsxs("div", { className: "list", children: [
      a.map(([g, h]) => {
        const y = n.scenes.find((x) => x.id === h);
        return /* @__PURE__ */ s.jsxs("div", { className: "list-row static", children: [
          /* @__PURE__ */ s.jsx("span", { className: "btn-icon", children: tr(g) }),
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
                value: y ? h : "",
                disabled: r,
                onChange: (x) => x.target.value !== "" && m(g, h, +x.target.value),
                "aria-label": `Scene for ${g}`,
                children: [
                  !y && /* @__PURE__ */ s.jsx("option", { value: "", children: "Choose…" }),
                  y && /* @__PURE__ */ s.jsx("option", { value: h, children: y.name }),
                  n.scenes.filter((x) => !u.has(x.id)).map((x) => /* @__PURE__ */ s.jsx("option", { value: x.id, children: x.name }, x.id)),
                  /* @__PURE__ */ s.jsx("option", { value: ma, children: "Save the lights' current state…" }),
                  y && /* @__PURE__ */ s.jsx("option", { value: ga, children: "Clear this button" })
                ]
              }
            )
          ] })
        ] }, h);
      }),
      /* @__PURE__ */ s.jsxs("div", { className: "list-row static", children: [
        /* @__PURE__ */ s.jsx("span", { className: "btn-icon", children: /* @__PURE__ */ s.jsx(M, { name: nn(t) ? "rotate-right" : "brightness-6" }) }),
        /* @__PURE__ */ s.jsxs("span", { className: "grow", children: [
          /* @__PURE__ */ s.jsx("strong", { children: nn(t) ? "Dial" : "Other buttons" }),
          /* @__PURE__ */ s.jsx("span", { className: "muted small row-detail", children: nn(t) ? `Dims ${n.name}. Hold any button to turn it off.` : `${eo(t).rest} · ${n.name}` })
        ] })
      ] })
    ] })
  ] });
}
function bp({ getHass: e, remote: t, groups: n, busy: r, act: l, onChanged: i }) {
  var x, S;
  const [o, a] = L.useState(t.endpoints[0].id), [u, c] = L.useState(((x = t.bound[0]) == null ? void 0 : x.group_id) ?? ((S = n[0]) == null ? void 0 : S.id) ?? 0), m = t.endpoints.find((N) => N.id === o) ?? t.endpoints[0], g = (N) => {
    var f;
    return ((f = n.find((d) => d.id === N)) == null ? void 0 : f.name) ?? `Group ${fl(N)}`;
  }, h = () => l(async () => {
    const N = await e().callWS({ type: "hue_remote_scenes/bindings", ieee: t.ieee });
    i();
    const f = new Set(N.bindings.map((d) => d.group_id)).size;
    return f ? `Bound to ${f === 1 ? "1 group" : `${f} groups`}` : "Not bound to any group";
  }, "Waiting for the remote… press one of its buttons."), y = (N) => l(async () => {
    const f = await e().callWS({
      type: "hue_remote_scenes/bind",
      ieee: t.ieee,
      endpoint: m.id,
      group_id: u,
      clusters: m.clusters,
      unbind: N,
      exclusive: !N
      // clear leftovers (other groups, direct device bindings)
    });
    i();
    const d = Object.entries(f.results).filter(([, v]) => v !== "ok"), p = N ? "Unbound from" : "Bound to";
    return d.length === Object.keys(f.results).length ? "The remote didn't answer. Press a button on it and try again." : d.length ? `${p} ${g(u)}, but these didn't take: ${d.map(([v, k]) => `${ha[+v] ?? v} (${k})`).join(", ")}.${ro(f, g)}` : `${p} ${g(u)}.${ro(f, g)}`;
  }, "Waiting for the remote… press one of its buttons.");
  return /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
    /* @__PURE__ */ s.jsx("h3", { children: "Controls" }),
    /* @__PURE__ */ s.jsxs("div", { className: "list", children: [
      t.bound.map((N) => /* @__PURE__ */ s.jsxs("div", { className: "list-row static", children: [
        /* @__PURE__ */ s.jsx(M, { name: "lightbulb-group-outline", className: "row-icon" }),
        /* @__PURE__ */ s.jsxs("span", { className: "grow", children: [
          /* @__PURE__ */ s.jsx("strong", { children: g(N.group_id) }),
          /* @__PURE__ */ s.jsxs("span", { className: "muted small row-detail", children: [
            N.clusters.map((f) => ha[f] ?? f).join(", "),
            " · works without Home Assistant"
          ] })
        ] })
      ] }, N.group_id)),
      !t.bound.length && /* @__PURE__ */ s.jsx("div", { className: "list-row static muted", children: "Not bound to a group yet." })
    ] }),
    /* @__PURE__ */ s.jsxs("div", { className: "inline-row", children: [
      t.endpoints.length > 1 && /* @__PURE__ */ s.jsx("select", { value: m.id, onChange: (N) => a(+N.target.value), "aria-label": "Button set", children: t.endpoints.map((N) => /* @__PURE__ */ s.jsxs("option", { value: N.id, children: [
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
      /* @__PURE__ */ s.jsx("button", { className: "ghost", disabled: r, onClick: h, children: "Check bindings" })
    ] })
  ] });
}
function Tp({ getHass: e, areas: t, groups: n, onOpen: r }) {
  const l = e(), i = t.filter((o) => o.remotes.length);
  return i.length ? /* @__PURE__ */ s.jsx(s.Fragment, { children: i.map((o) => {
    const a = Rc(o.groups), u = es(l, o.groups);
    return /* @__PURE__ */ s.jsxs("section", { className: "remote-room", children: [
      /* @__PURE__ */ s.jsxs("div", { className: "remote-room-head", children: [
        /* @__PURE__ */ s.jsx("span", { className: "strip", style: { background: ts(l, o.groups) ?? void 0 } }),
        /* @__PURE__ */ s.jsx("h2", { className: "grow", children: o.name }),
        a > 0 && /* @__PURE__ */ s.jsx("span", { className: "muted small", children: u ? `${u} on` : "off" })
      ] }),
      /* @__PURE__ */ s.jsx("div", { className: "list", children: o.remotes.map((c) => /* @__PURE__ */ s.jsx(Rp, { remote: c, groups: n, onOpen: () => r(c.ieee) }, c.ieee)) })
    ] }, o.name);
  }) }) : /* @__PURE__ */ s.jsxs("div", { className: "empty-state", children: [
    /* @__PURE__ */ s.jsx(M, { name: "remote-off" }),
    /* @__PURE__ */ s.jsx("p", { children: "No remotes found. Pair a remote (like a Hue Tap Dial) with ZHA first." })
  ] });
}
function Lp(e, t) {
  var r;
  const n = Lc(e);
  if (e.dial_supported) {
    const l = Pl(e, t);
    if (l.done === 4 && l.group && e.dial) {
      const i = e.dial.buttons.map(([, a]) => l.group.scenes.find((u) => u.id === a)).filter(Boolean), o = nn(e) ? "buttons recall" : "Hue button recalls";
      return { text: `${n} · ${o} ${ye(i.length, "scene")}`, scenes: i };
    }
    return !e.dial && !e.bound.length ? { text: `${n} · not doing anything yet`, scenes: [] } : { text: `${n} · set-up step ${Math.min(l.done + 1, 4)} of 4`, scenes: [] };
  }
  if (e.cycle) {
    const l = t.find((o) => o.id === e.cycle.group_id), i = e.cycle.scene_ids.map((o) => l == null ? void 0 : l.scenes.find((a) => a.id === o)).filter((o) => !!o);
    return { text: `${n} · ${((r = e.cycle_trigger) == null ? void 0 : r.label) ?? "a button"} cycles ${ye(i.length, "scene")} in Home Assistant`, scenes: i };
  }
  return { text: `${n} · ${e.bound.length ? "on/off and dimming" : "not bound yet"}`, scenes: [] };
}
function Rp({ remote: e, groups: t, onOpen: n }) {
  const r = ur(e, t), l = e.dial_supported && r.state === "ok", { text: i, scenes: o } = Lp(e, t);
  return /* @__PURE__ */ s.jsxs("button", { className: "list-row", onClick: n, children: [
    /* @__PURE__ */ s.jsx(bl, { remote: e, className: "row-icon big" }),
    /* @__PURE__ */ s.jsxs("span", { className: "grow", children: [
      /* @__PURE__ */ s.jsx("strong", { children: e.name }),
      /* @__PURE__ */ s.jsx("span", { className: "muted small row-detail", children: i }),
      o.length > 0 && /* @__PURE__ */ s.jsx("span", { className: "mini-swatches", children: o.map((a) => /* @__PURE__ */ s.jsx("span", { className: "mini-swatch", style: { background: $l(a.colors) }, title: a.name }, a.id)) })
    ] }),
    /* @__PURE__ */ s.jsx("span", { className: `chip ${r.state === "ok" ? "ok" : r.state === "attention" ? "warn" : ""}`, children: l ? "Works without HA" : r.label }),
    /* @__PURE__ */ s.jsx(M, { name: "chevron-right" })
  ] });
}
function nr({ getHass: e, entities: t, on: n, label: r }) {
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
function rr({ getHass: e, entities: t, value: n, label: r, fill: l }) {
  const [i, o] = L.useState(n), [a, u] = L.useState(!1);
  L.useEffect(() => {
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
      onClick: (m) => m.stopPropagation(),
      onPointerDown: () => u(!0),
      onChange: (m) => o(+m.target.value),
      onPointerUp: c,
      onKeyUp: c
    }
  );
}
const lo = [
  { label: "Candle", kelvin: 2200, css: "#ffb46b" },
  { label: "Warm", kelvin: 2700, css: "#ffc98f" },
  { label: "Neutral", kelvin: 4e3, css: "#ffe4c4" },
  { label: "Daylight", kelvin: 5500, css: "#fff4ea" },
  { label: "Cool", kelvin: 6500, css: "#e8eeff" }
], va = [
  { label: "Red", hs: [0, 100], css: "#ff2a1a" },
  { label: "Orange", hs: [25, 100], css: "#ff7a00" },
  { label: "Yellow", hs: [50, 100], css: "#ffd400" },
  { label: "Green", hs: [120, 100], css: "#22d33a" },
  { label: "Cyan", hs: [180, 100], css: "#00d5e0" },
  { label: "Blue", hs: [230, 100], css: "#2f4bff" },
  { label: "Purple", hs: [275, 100], css: "#9a3cff" },
  { label: "Pink", hs: [320, 80], css: "#ff4fb8" }
], Mp = ["hs", "xy", "rgb", "rgbw", "rgbww"];
function Ar(e) {
  const t = (e == null ? void 0 : e.attributes.supported_color_modes) ?? [];
  return { colour: t.some((n) => Mp.includes(n)), temp: t.includes("color_temp") };
}
function ya(e) {
  const { colour: t, temp: n } = Ar(e);
  if (!n) return t ? lo : [];
  const r = (e == null ? void 0 : e.attributes.min_color_temp_kelvin) ?? 0, l = (e == null ? void 0 : e.attributes.max_color_temp_kelvin) ?? 1e5;
  return lo.filter((i) => t || i.kelvin >= r && i.kelvin <= l);
}
const Op = (e) => [1, 3, 5].map((t) => parseInt(e.slice(t, t + 2), 16));
function Dp({ getHass: e, group: t, title: n, name: r = "", saveLabel: l, busy: i, result: o, onSave: a, onCancel: u }) {
  const [c, m] = L.useState(r), g = e(), h = t.members.filter((v) => v.entity_id && v.scenes), y = h.map((v) => v.entity_id), x = Object.fromEntries(y.map((v) => [v, g.states[v]])), S = y.filter((v) => Ke(g, v)).length, N = S ? Math.round(y.filter((v) => Ke(g, v)).reduce((v, k) => {
    var E;
    return v + (((E = x[k]) == null ? void 0 : E.attributes.brightness) ?? 255);
  }, 0) / S / 2.55) : 0, f = (v, k) => {
    const E = v.map((C) => ({ e: C, caps: Ar(x[C]) }));
    if ("rgb" in k) {
      const C = E.filter((j) => j.caps.colour).map((j) => j.e);
      C.length && e().callService("light", "turn_on", { entity_id: C, rgb_color: k.rgb });
    } else if (k.hs) {
      const C = E.filter((j) => j.caps.colour).map((j) => j.e);
      C.length && e().callService("light", "turn_on", { entity_id: C, hs_color: k.hs });
    } else if (k.kelvin) {
      const C = E.filter((j) => j.caps.colour || j.caps.temp).map((j) => j.e);
      C.length && e().callService("light", "turn_on", { entity_id: C, color_temp_kelvin: k.kelvin });
    }
  }, d = y.some((v) => Ar(x[v]).colour), p = y.some((v) => ya(x[v]).length);
  return /* @__PURE__ */ s.jsx("div", { className: "sheet-backdrop", onClick: (v) => v.target === v.currentTarget && !i && u(), children: /* @__PURE__ */ s.jsxs(
    "form",
    {
      className: "sheet",
      role: "dialog",
      "aria-label": n,
      onSubmit: (v) => {
        v.preventDefault(), c.trim() && a(c);
      },
      children: [
        /* @__PURE__ */ s.jsxs("div", { className: "sheet-head", children: [
          /* @__PURE__ */ s.jsx("h2", { children: n }),
          /* @__PURE__ */ s.jsx("button", { type: "button", className: "icon-btn", onClick: u, disabled: !!i, "aria-label": "Close", children: /* @__PURE__ */ s.jsx(M, { name: "close" }) })
        ] }),
        /* @__PURE__ */ s.jsx("input", { type: "text", placeholder: "Scene name", value: c, maxLength: 40, autoFocus: !r, onChange: (v) => m(v.target.value), "aria-label": "Scene name" }),
        /* @__PURE__ */ s.jsx("p", { className: "muted small", children: "Changes show on the lights straight away. Save stores how they look in the lights, for remotes to recall." }),
        !h.length && /* @__PURE__ */ s.jsx("div", { className: "status warn", children: "None of this group's lights can store scenes." }),
        h.length > 1 && /* @__PURE__ */ s.jsxs("div", { className: "edit-light all", children: [
          /* @__PURE__ */ s.jsxs("div", { className: "edit-row", children: [
            /* @__PURE__ */ s.jsx("strong", { className: "grow", children: "All lights" }),
            /* @__PURE__ */ s.jsx(nr, { getHass: e, entities: y, on: S > 0, label: "All lights on or off" })
          ] }),
          /* @__PURE__ */ s.jsx(rr, { getHass: e, entities: y, value: N, label: "All lights brightness" }),
          /* @__PURE__ */ s.jsx(xa, { whites: p ? lo : [], colours: d ? va : [], custom: d, name: "all lights", onPick: (v) => f(y, v) })
        ] }),
        h.map((v) => {
          const k = v.entity_id, E = x[k], C = Ke(g, k), j = Ar(E);
          return /* @__PURE__ */ s.jsxs("div", { className: `edit-light ${C ? "" : "off"}`, children: [
            /* @__PURE__ */ s.jsxs("div", { className: "edit-row", children: [
              /* @__PURE__ */ s.jsx("span", { className: "light-dot", style: Dn(E) ? { background: Dn(E) } : void 0 }),
              /* @__PURE__ */ s.jsx("span", { className: "grow", children: v.name }),
              /* @__PURE__ */ s.jsx(nr, { getHass: e, entities: [k], on: C, label: `${v.name} on or off` })
            ] }),
            /* @__PURE__ */ s.jsx(rr, { getHass: e, entities: [k], value: C ? Math.round(((E == null ? void 0 : E.attributes.brightness) ?? 255) / 2.55) : 0, label: `${v.name} brightness`, fill: Dn(E) ?? void 0 }),
            /* @__PURE__ */ s.jsx(xa, { whites: ya(E), colours: j.colour ? va : [], custom: j.colour, name: v.name, onPick: (O) => f([k], O) })
          ] }, v.key);
        }),
        i && /* @__PURE__ */ s.jsx("div", { className: "status busy", children: i }),
        !i && (o == null ? void 0 : o.kind) === "error" && /* @__PURE__ */ s.jsx("div", { className: "status error", children: o.text }),
        /* @__PURE__ */ s.jsxs("div", { className: "sheet-actions", children: [
          /* @__PURE__ */ s.jsx("button", { type: "button", className: "ghost", onClick: u, disabled: !!i, children: "Cancel" }),
          /* @__PURE__ */ s.jsx("button", { type: "submit", className: "primary", disabled: !!i || !c.trim() || !h.length, children: l })
        ] })
      ]
    }
  ) });
}
function xa({ whites: e, colours: t, custom: n, name: r, onPick: l }) {
  const i = L.useRef(null), o = L.useRef(null), a = (u) => {
    i.current = Op(u), o.current == null && (o.current = window.setTimeout(() => {
      o.current = null, i.current && l({ rgb: i.current });
    }, 300));
  };
  return !e.length && !t.length ? null : /* @__PURE__ */ s.jsxs("div", { className: "palette", children: [
    [...e, ...t].map((u) => /* @__PURE__ */ s.jsx("button", { type: "button", className: "swatch-btn", style: { background: u.css }, title: u.label, "aria-label": `${u.label} for ${r}`, onClick: () => l(u) }, u.label)),
    n && /* @__PURE__ */ s.jsxs("label", { className: "swatch-btn custom", title: "Pick a colour", "aria-label": `Pick a colour for ${r}`, children: [
      /* @__PURE__ */ s.jsx(M, { name: "palette-outline" }),
      /* @__PURE__ */ s.jsx("input", { type: "color", defaultValue: "#ff8800", onChange: (u) => a(u.target.value) })
    ] })
  ] });
}
function Fp({ getHass: e, area: t, groups: n, onBack: r, onOpenRemote: l, onChanged: i }) {
  const o = e(), a = ts(o, t.groups), u = es(o, t.groups), c = Mc(t.groups);
  return /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
    /* @__PURE__ */ s.jsx("div", { className: `hero ${a ? "lit" : ""}`, style: a ? { background: a } : void 0, children: /* @__PURE__ */ s.jsxs("div", { className: "hero-in", children: [
      /* @__PURE__ */ s.jsxs("nav", { className: "crumbs", children: [
        /* @__PURE__ */ s.jsx("button", { className: "link", onClick: r, children: "Rooms" }),
        /* @__PURE__ */ s.jsx(M, { name: "chevron-right" }),
        /* @__PURE__ */ s.jsx("span", { children: t.name })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "hero-row", children: [
        /* @__PURE__ */ s.jsx("h1", { children: t.name }),
        c.length > 0 && /* @__PURE__ */ s.jsx(nr, { getHass: e, entities: c, on: u > 0, label: `Turn ${t.name} ${u ? "off" : "on"}` })
      ] }),
      c.length > 0 && /* @__PURE__ */ s.jsx(rr, { getHass: e, entities: c, value: Dc(o, t.groups), label: `${t.name} brightness` })
    ] }) }),
    /* @__PURE__ */ s.jsxs("main", { children: [
      t.groups.map((m) => /* @__PURE__ */ s.jsx(Ip, { getHass: e, group: m, titled: t.groups.length > 1 && m.name !== t.name, onChanged: i }, m.id)),
      !t.groups.length && /* @__PURE__ */ s.jsxs("div", { className: "empty-state", children: [
        /* @__PURE__ */ s.jsx(M, { name: "lightbulb-group-outline" }),
        /* @__PURE__ */ s.jsxs("p", { children: [
          "No ZHA groups in ",
          t.name,
          ". Create one under Settings → Devices & services → Zigbee Home Automation → Configure → Groups and put its lights in this area, or set up a Tap Dial here."
        ] })
      ] }),
      t.remotes.length > 0 && /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
        /* @__PURE__ */ s.jsx("h3", { children: "Remotes" }),
        /* @__PURE__ */ s.jsx("div", { className: "list", children: t.remotes.map((m) => {
          const g = ur(m, n);
          return /* @__PURE__ */ s.jsxs("button", { className: "list-row", onClick: () => l(m.ieee), children: [
            /* @__PURE__ */ s.jsx(bl, { remote: m, className: "row-icon" }),
            /* @__PURE__ */ s.jsx("span", { className: "grow", children: m.name }),
            /* @__PURE__ */ s.jsx("span", { className: `chip ${g.state === "ok" ? "ok" : g.state === "attention" ? "warn" : ""}`, children: g.label }),
            /* @__PURE__ */ s.jsx(M, { name: "chevron-right" })
          ] }, m.ieee);
        }) })
      ] })
    ] })
  ] });
}
function Ip({ getHass: e, group: t, titled: n, onChanged: r }) {
  const { busy: l, result: i, act: o } = ns(), [a, u] = L.useState(null), c = e(), m = Object.fromEntries(t.members.map((w) => [w.key, w.name])), g = t.members.filter((w) => w.scenes), h = (w) => w.map(($) => m[$] ?? $).join(", "), y = (w) => w.length < g.length ? `on ${w.length} of ${g.length} lights` : void 0, x = t.dials[0], S = new Set(t.dials.flatMap((w) => w.buttons.map(($) => $.scene_id))), N = t.scenes.filter((w) => !S.has(w.id)), f = (w, $) => o(async () => {
    const B = await e().callWS({ group_id: t.id, ...w });
    return r(), $(B);
  }), d = (w) => ($) => {
    const B = Object.keys($.failed);
    return B.length ? `${w} on ${$.ok.length} of ${$.ok.length + B.length} lights. These didn't answer: ${h(B)}` : `${w} on ${ye($.ok.length, "light")}`;
  }, p = (w, $) => f({ type: "hue_remote_scenes/recall", scene_id: w }, () => `Recalled ${$}`), v = (w, $) => confirm(`Save how the lights are now as "${$}"?`) && f({ type: "hue_remote_scenes/store", scene_id: w }, d("Saved")), k = (w, $) => o(async () => {
    await e().callWS({ type: "hue_remote_scenes/recall", group_id: t.id, scene_id: w }), u({ title: `Edit ${$}`, saveLabel: "Save changes", scene_id: w, name: $, restore: !0 });
  }, "Recalling the scene…"), E = (w, $) => o(async () => {
    const B = await e().callWS({ type: "hue_remote_scenes/store", group_id: t.id, name: $, ...w.scene_id != null ? { scene_id: w.scene_id } : {} });
    return u(null), r(), d("Saved")(B);
  }, "Saving the scene in the lights…"), C = (w) => {
    u(null), w.restore && w.scene_id != null && p(w.scene_id, w.name ?? "the scene");
  }, j = (w, $) => f({ type: "hue_remote_scenes/rename", scene_id: w, name: $ }, () => "Renamed"), O = (w, $) => confirm(`Delete "${$}" from the lights?`) && f(
    { type: "hue_remote_scenes/delete", scene_id: w },
    (B) => Object.keys(B.failed).length ? `Deleted, but some lights didn't answer and may still have it: ${h(Object.keys(B.failed))}` : `Deleted ${$}`
  );
  return /* @__PURE__ */ s.jsxs("section", { className: "group", children: [
    n && /* @__PURE__ */ s.jsx("h2", { className: "group-title", children: t.name }),
    g.length > 0 && x && /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
      /* @__PURE__ */ s.jsxs("h3", { children: [
        t.dials.map((w) => w.name).join(", "),
        " buttons ",
        /* @__PURE__ */ s.jsx("span", { className: "hint", children: "tap to try · ⋮ to edit" })
      ] }),
      /* @__PURE__ */ s.jsx("div", { className: "tiles", children: x.buttons.map((w) => {
        const $ = t.scenes.find((B) => B.id === w.scene_id);
        return $ ? /* @__PURE__ */ s.jsx(
          to,
          {
            scene: $,
            badge: tr(w.label),
            warn: y($.members),
            busy: !!l,
            onRecall: () => p($.id, $.name),
            onOverwrite: () => v($.id, $.name),
            onEdit: () => k($.id, $.name),
            onRename: (B) => j($.id, B),
            onDelete: () => O($.id, $.name)
          },
          w.scene_id
        ) : /* @__PURE__ */ s.jsx(
          no,
          {
            badge: tr(w.label),
            label: "Set a scene",
            busy: !!l,
            onOpen: () => u({ title: `Scene for ${/^\d/.test(w.label) ? `button ${parseInt(w.label, 10)}` : w.label}`, saveLabel: "Save scene", scene_id: w.scene_id })
          },
          w.scene_id
        );
      }) })
    ] }),
    g.length > 0 && /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
      /* @__PURE__ */ s.jsx("h3", { children: x ? "Other scenes" : "Scenes" }),
      /* @__PURE__ */ s.jsxs("div", { className: "tiles", children: [
        N.map((w) => /* @__PURE__ */ s.jsx(
          to,
          {
            scene: w,
            warn: y(w.members),
            busy: !!l,
            onRecall: () => p(w.id, w.name),
            onOverwrite: () => v(w.id, w.name),
            onEdit: () => k(w.id, w.name),
            onRename: ($) => j(w.id, $),
            onDelete: () => O(w.id, w.name)
          },
          w.id
        )),
        /* @__PURE__ */ s.jsx(no, { label: "New scene", busy: !!l, onOpen: () => u({ title: "New scene", saveLabel: "Save scene" }) })
      ] })
    ] }),
    l && /* @__PURE__ */ s.jsx("div", { className: "status busy", children: l }),
    i && /* @__PURE__ */ s.jsx("div", { className: `status ${i.kind}`, children: i.text }),
    a && /* @__PURE__ */ s.jsx(
      Dp,
      {
        getHass: e,
        group: t,
        title: a.title,
        name: a.name,
        saveLabel: a.saveLabel,
        busy: l,
        result: i,
        onSave: (w) => E(a, w),
        onCancel: () => C(a)
      }
    ),
    /* @__PURE__ */ s.jsxs("h3", { children: [
      "Lights ",
      /* @__PURE__ */ s.jsx("span", { className: "hint", children: t.members.filter((w) => Ke(c, w.entity_id)).length ? `${t.members.filter((w) => Ke(c, w.entity_id)).length} on` : "all off" })
    ] }),
    /* @__PURE__ */ s.jsx("div", { className: "list", children: t.members.map((w) => {
      const $ = w.entity_id ? c.states[w.entity_id] : void 0, B = Dn($);
      return /* @__PURE__ */ s.jsxs("div", { className: "list-row static", children: [
        /* @__PURE__ */ s.jsx("span", { className: "light-dot", style: B ? { background: B } : void 0 }),
        /* @__PURE__ */ s.jsxs("span", { className: "grow", children: [
          w.name,
          !w.scenes && /* @__PURE__ */ s.jsx("span", { className: "muted small", children: " · can't store scenes" })
        ] }),
        w.entity_id && /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
          /* @__PURE__ */ s.jsx(rr, { getHass: e, entities: [w.entity_id], value: Ke(c, w.entity_id) ? Math.round((($ == null ? void 0 : $.attributes.brightness) ?? 255) / 2.55) : 0, label: `${w.name} brightness`, fill: B ?? void 0 }),
          /* @__PURE__ */ s.jsx(nr, { getHass: e, entities: [w.entity_id], on: Ke(c, w.entity_id), label: `Turn ${w.name} on or off` })
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
          (w) => w.added.length ? `Found ${ye(w.added.length, "new scene")}. Rename them from their ⋮ menu.` : w.found.length ? "No new scenes: the ones on the lights are all here." : "The lights have no scenes for this group yet."
        ),
        children: [
          /* @__PURE__ */ s.jsx(M, { name: "database-import-outline" }),
          " Import scenes from the lights"
        ]
      }
    ) })
  ] });
}
function Up({ getHass: e, areas: t, groups: n, onOpen: r, onOpenRemote: l }) {
  const i = t.flatMap((o) => o.attention);
  return /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
    i.map((o) => /* @__PURE__ */ s.jsxs("div", { className: "banner", children: [
      /* @__PURE__ */ s.jsx(M, { name: "alert-outline" }),
      /* @__PURE__ */ s.jsxs("span", { className: "grow", children: [
        o.name,
        " isn't set up yet: its buttons don't do anything."
      ] }),
      /* @__PURE__ */ s.jsx("button", { className: "primary", onClick: () => l(o.ieee), children: "Set up" })
    ] }, o.ieee)),
    /* @__PURE__ */ s.jsx("div", { className: "rooms", children: t.map((o) => /* @__PURE__ */ s.jsx(Ap, { getHass: e, area: o, groups: n, onOpen: () => r(o.name) }, o.name)) })
  ] });
}
function Ap({ getHass: e, area: t, groups: n, onOpen: r }) {
  const l = e(), i = ts(l, t.groups), o = es(l, t.groups), a = Rc(t.groups), u = Mc(t.groups), c = t.remotes.map((m) => `${m.name}${ur(m, n).state === "attention" ? " · not set up" : ""}`);
  return /* @__PURE__ */ s.jsxs(
    "div",
    {
      className: `room ${i ? "lit" : ""}`,
      style: i ? { background: i } : void 0,
      role: "link",
      tabIndex: 0,
      onClick: r,
      onKeyDown: (m) => m.key === "Enter" && r(),
      children: [
        /* @__PURE__ */ s.jsxs("div", { className: "room-top", children: [
          /* @__PURE__ */ s.jsxs("div", { className: "grow", children: [
            /* @__PURE__ */ s.jsx("h2", { children: t.name }),
            /* @__PURE__ */ s.jsx("div", { className: "room-sub", children: a ? o ? `${ye(o, "light")} on` : `Off · ${ye(a, "light")}` : "No lights in a group yet" })
          ] }),
          u.length > 0 && /* @__PURE__ */ s.jsx(nr, { getHass: e, entities: u, on: o > 0, label: `Turn ${t.name} ${o ? "off" : "on"}` })
        ] }),
        /* @__PURE__ */ s.jsx("div", { className: "room-sub", children: c.length ? c.join(" · ") : "No remote" }),
        u.length > 0 && /* @__PURE__ */ s.jsx(rr, { getHass: e, entities: u, value: Dc(l, t.groups), label: `${t.name} brightness` })
      ]
    }
  );
}
const Bp = [
  { id: "rooms", label: "Rooms", icon: "home-outline" },
  { id: "remotes", label: "Remotes", icon: "remote" }
];
function Wp({ getHass: e, narrow: t, onToggleMenu: n }) {
  const [r, l] = L.useState(null), [i, o] = L.useState(null), [a, u] = L.useState({}), [c, m] = L.useState("rooms"), [g, h] = L.useState(null), [y, x] = L.useState(null), [S, N] = L.useState(""), f = L.useCallback(() => {
    const j = e();
    Promise.all([
      j.callWS({ type: "hue_remote_scenes/groups" }),
      j.callWS({ type: "hue_remote_scenes/remotes" })
    ]).then(([O, w]) => {
      l(O.groups), o(w.remotes), u({ ...O.area_icons, ...w.area_icons }), N("");
    }).catch((O) => N(Fc(O)));
  }, [e]);
  L.useEffect(() => {
    f();
    const j = e().connection.subscribeMessage(f, { type: "hue_remote_scenes/subscribe" });
    return () => {
      j.then((O) => O()).catch(() => {
      });
    };
  }, [e, f]);
  const d = r && i ? vp(r, i, a) : null, p = c === "rooms" ? d == null ? void 0 : d.find((j) => j.name === g) : void 0, v = i == null ? void 0 : i.find((j) => j.ieee === y), k = (j) => {
    m(j), h(null), x(null);
  }, E = (j) => {
    m("remotes"), h(null), x(j);
  };
  let C;
  return !r || !i || !d ? C = /* @__PURE__ */ s.jsx("main", { children: S && /* @__PURE__ */ s.jsx("div", { className: "status error", children: S }) }) : v ? C = /* @__PURE__ */ s.jsx(Pp, { getHass: e, remote: v, groups: r, onBack: () => x(null), onChanged: f }) : p ? C = /* @__PURE__ */ s.jsx(Fp, { getHass: e, area: p, groups: r, onBack: () => h(null), onOpenRemote: E, onChanged: f }) : C = /* @__PURE__ */ s.jsxs("main", { className: c === "remotes" ? "remotes" : void 0, children: [
    S && /* @__PURE__ */ s.jsx("div", { className: "status error", children: S }),
    c === "remotes" ? /* @__PURE__ */ s.jsx(Tp, { getHass: e, areas: d, groups: r, onOpen: x }) : d.length ? /* @__PURE__ */ s.jsx(Up, { getHass: e, areas: d, groups: r, onOpen: h, onOpenRemote: E }) : /* @__PURE__ */ s.jsxs("div", { className: "empty-state", children: [
      /* @__PURE__ */ s.jsx(M, { name: "lightbulb-group-outline" }),
      /* @__PURE__ */ s.jsx("p", { children: "No ZHA groups or remotes yet. Create a group under Settings → Devices & services → Zigbee Home Automation → Configure → Groups. For a Hue Tap Dial, pair it and use the Remotes tab: it creates the group the dial needs." })
    ] })
  ] }), /* @__PURE__ */ s.jsxs("div", { className: "panel", children: [
    /* @__PURE__ */ s.jsx("header", { children: /* @__PURE__ */ s.jsxs("div", { className: "toolbar-row", children: [
      t && /* @__PURE__ */ s.jsx("button", { className: "menu-btn", onClick: n, "aria-label": "Menu", children: /* @__PURE__ */ s.jsx(M, { name: "menu" }) }),
      /* @__PURE__ */ s.jsxs("div", { className: "brand", children: [
        /* @__PURE__ */ s.jsx(mp, {}),
        /* @__PURE__ */ s.jsx("h1", { children: "Hue remote scenes" })
      ] }),
      /* @__PURE__ */ s.jsx("nav", { className: "tabs", role: "tablist", children: Bp.map((j) => /* @__PURE__ */ s.jsxs("button", { role: "tab", "aria-selected": j.id === c, className: j.id === c ? "on" : "", onClick: () => k(j.id), children: [
        /* @__PURE__ */ s.jsx(M, { name: j.icon }),
        /* @__PURE__ */ s.jsx("span", { children: j.label })
      ] }, j.id)) })
    ] }) }),
    C
  ] });
}
const Vp = (
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
class Qp extends HTMLElement {
  constructor() {
    super(...arguments);
    mn(this, "_hass");
    mn(this, "_narrow", !1);
    mn(this, "_root");
    mn(this, "_pending");
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
      r.textContent = Vp;
      const l = document.createElement("div");
      n.append(r, l), this._root = Tc(l);
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
        Wp,
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
customElements.get("hue-remote-scenes-panel") || customElements.define("hue-remote-scenes-panel", Qp);
