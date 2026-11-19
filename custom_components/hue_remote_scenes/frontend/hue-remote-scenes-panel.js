var Mc = Object.defineProperty;
var Oc = (e, t, n) => t in e ? Mc(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var hn = (e, t, n) => Oc(e, typeof t != "symbol" ? t + "" : t, n);
var fa = { exports: {} }, ul = {}, pa = { exports: {} }, L = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var tr = Symbol.for("react.element"), Dc = Symbol.for("react.portal"), Fc = Symbol.for("react.fragment"), Ic = Symbol.for("react.strict_mode"), Uc = Symbol.for("react.profiler"), Bc = Symbol.for("react.provider"), Ac = Symbol.for("react.context"), Wc = Symbol.for("react.forward_ref"), bc = Symbol.for("react.suspense"), Vc = Symbol.for("react.memo"), Hc = Symbol.for("react.lazy"), qo = Symbol.iterator;
function Qc(e) {
  return e === null || typeof e != "object" ? null : (e = qo && e[qo] || e["@@iterator"], typeof e == "function" ? e : null);
}
var ha = { isMounted: function() {
  return !1;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, ma = Object.assign, ga = {};
function un(e, t, n) {
  this.props = e, this.context = t, this.refs = ga, this.updater = n || ha;
}
un.prototype.isReactComponent = {};
un.prototype.setState = function(e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, e, t, "setState");
};
un.prototype.forceUpdate = function(e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function va() {
}
va.prototype = un.prototype;
function Ji(e, t, n) {
  this.props = e, this.context = t, this.refs = ga, this.updater = n || ha;
}
var qi = Ji.prototype = new va();
qi.constructor = Ji;
ma(qi, un.prototype);
qi.isPureReactComponent = !0;
var es = Array.isArray, ya = Object.prototype.hasOwnProperty, eo = { current: null }, xa = { key: !0, ref: !0, __self: !0, __source: !0 };
function wa(e, t, n) {
  var r, l = {}, i = null, o = null;
  if (t != null) for (r in t.ref !== void 0 && (o = t.ref), t.key !== void 0 && (i = "" + t.key), t) ya.call(t, r) && !xa.hasOwnProperty(r) && (l[r] = t[r]);
  var s = arguments.length - 2;
  if (s === 1) l.children = n;
  else if (1 < s) {
    for (var u = Array(s), c = 0; c < s; c++) u[c] = arguments[c + 2];
    l.children = u;
  }
  if (e && e.defaultProps) for (r in s = e.defaultProps, s) l[r] === void 0 && (l[r] = s[r]);
  return { $$typeof: tr, type: e, key: i, ref: o, props: l, _owner: eo.current };
}
function Kc(e, t) {
  return { $$typeof: tr, type: e.type, key: t, ref: e.ref, props: e.props, _owner: e._owner };
}
function to(e) {
  return typeof e == "object" && e !== null && e.$$typeof === tr;
}
function Gc(e) {
  var t = { "=": "=0", ":": "=2" };
  return "$" + e.replace(/[=:]/g, function(n) {
    return t[n];
  });
}
var ts = /\/+/g;
function Pl(e, t) {
  return typeof e == "object" && e !== null && e.key != null ? Gc("" + e.key) : t.toString(36);
}
function Cr(e, t, n, r, l) {
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
        case tr:
        case Dc:
          o = !0;
      }
  }
  if (o) return o = e, l = l(o), e = r === "" ? "." + Pl(o, 0) : r, es(l) ? (n = "", e != null && (n = e.replace(ts, "$&/") + "/"), Cr(l, t, n, "", function(c) {
    return c;
  })) : l != null && (to(l) && (l = Kc(l, n + (!l.key || o && o.key === l.key ? "" : ("" + l.key).replace(ts, "$&/") + "/") + e)), t.push(l)), 1;
  if (o = 0, r = r === "" ? "." : r + ":", es(e)) for (var s = 0; s < e.length; s++) {
    i = e[s];
    var u = r + Pl(i, s);
    o += Cr(i, t, n, u, l);
  }
  else if (u = Qc(e), typeof u == "function") for (e = u.call(e), s = 0; !(i = e.next()).done; ) i = i.value, u = r + Pl(i, s++), o += Cr(i, t, n, u, l);
  else if (i === "object") throw t = String(e), Error("Objects are not valid as a React child (found: " + (t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) + "). If you meant to render a collection of children, use an array instead.");
  return o;
}
function ur(e, t, n) {
  if (e == null) return e;
  var r = [], l = 0;
  return Cr(e, r, "", "", function(i) {
    return t.call(n, i, l++);
  }), r;
}
function Yc(e) {
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
var ue = { current: null }, Er = { transition: null }, Xc = { ReactCurrentDispatcher: ue, ReactCurrentBatchConfig: Er, ReactCurrentOwner: eo };
function ka() {
  throw Error("act(...) is not supported in production builds of React.");
}
L.Children = { map: ur, forEach: function(e, t, n) {
  ur(e, function() {
    t.apply(this, arguments);
  }, n);
}, count: function(e) {
  var t = 0;
  return ur(e, function() {
    t++;
  }), t;
}, toArray: function(e) {
  return ur(e, function(t) {
    return t;
  }) || [];
}, only: function(e) {
  if (!to(e)) throw Error("React.Children.only expected to receive a single React element child.");
  return e;
} };
L.Component = un;
L.Fragment = Fc;
L.Profiler = Uc;
L.PureComponent = Ji;
L.StrictMode = Ic;
L.Suspense = bc;
L.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Xc;
L.act = ka;
L.cloneElement = function(e, t, n) {
  if (e == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
  var r = ma({}, e.props), l = e.key, i = e.ref, o = e._owner;
  if (t != null) {
    if (t.ref !== void 0 && (i = t.ref, o = eo.current), t.key !== void 0 && (l = "" + t.key), e.type && e.type.defaultProps) var s = e.type.defaultProps;
    for (u in t) ya.call(t, u) && !xa.hasOwnProperty(u) && (r[u] = t[u] === void 0 && s !== void 0 ? s[u] : t[u]);
  }
  var u = arguments.length - 2;
  if (u === 1) r.children = n;
  else if (1 < u) {
    s = Array(u);
    for (var c = 0; c < u; c++) s[c] = arguments[c + 2];
    r.children = s;
  }
  return { $$typeof: tr, type: e.type, key: l, ref: i, props: r, _owner: o };
};
L.createContext = function(e) {
  return e = { $$typeof: Ac, _currentValue: e, _currentValue2: e, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, e.Provider = { $$typeof: Bc, _context: e }, e.Consumer = e;
};
L.createElement = wa;
L.createFactory = function(e) {
  var t = wa.bind(null, e);
  return t.type = e, t;
};
L.createRef = function() {
  return { current: null };
};
L.forwardRef = function(e) {
  return { $$typeof: Wc, render: e };
};
L.isValidElement = to;
L.lazy = function(e) {
  return { $$typeof: Hc, _payload: { _status: -1, _result: e }, _init: Yc };
};
L.memo = function(e, t) {
  return { $$typeof: Vc, type: e, compare: t === void 0 ? null : t };
};
L.startTransition = function(e) {
  var t = Er.transition;
  Er.transition = {};
  try {
    e();
  } finally {
    Er.transition = t;
  }
};
L.unstable_act = ka;
L.useCallback = function(e, t) {
  return ue.current.useCallback(e, t);
};
L.useContext = function(e) {
  return ue.current.useContext(e);
};
L.useDebugValue = function() {
};
L.useDeferredValue = function(e) {
  return ue.current.useDeferredValue(e);
};
L.useEffect = function(e, t) {
  return ue.current.useEffect(e, t);
};
L.useId = function() {
  return ue.current.useId();
};
L.useImperativeHandle = function(e, t, n) {
  return ue.current.useImperativeHandle(e, t, n);
};
L.useInsertionEffect = function(e, t) {
  return ue.current.useInsertionEffect(e, t);
};
L.useLayoutEffect = function(e, t) {
  return ue.current.useLayoutEffect(e, t);
};
L.useMemo = function(e, t) {
  return ue.current.useMemo(e, t);
};
L.useReducer = function(e, t, n) {
  return ue.current.useReducer(e, t, n);
};
L.useRef = function(e) {
  return ue.current.useRef(e);
};
L.useState = function(e) {
  return ue.current.useState(e);
};
L.useSyncExternalStore = function(e, t, n) {
  return ue.current.useSyncExternalStore(e, t, n);
};
L.useTransition = function() {
  return ue.current.useTransition();
};
L.version = "18.3.1";
pa.exports = L;
var R = pa.exports;
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Zc = R, Jc = Symbol.for("react.element"), qc = Symbol.for("react.fragment"), ed = Object.prototype.hasOwnProperty, td = Zc.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, nd = { key: !0, ref: !0, __self: !0, __source: !0 };
function Sa(e, t, n) {
  var r, l = {}, i = null, o = null;
  n !== void 0 && (i = "" + n), t.key !== void 0 && (i = "" + t.key), t.ref !== void 0 && (o = t.ref);
  for (r in t) ed.call(t, r) && !nd.hasOwnProperty(r) && (l[r] = t[r]);
  if (e && e.defaultProps) for (r in t = e.defaultProps, t) l[r] === void 0 && (l[r] = t[r]);
  return { $$typeof: Jc, type: e, key: i, ref: o, props: l, _owner: td.current };
}
ul.Fragment = qc;
ul.jsx = Sa;
ul.jsxs = Sa;
fa.exports = ul;
var a = fa.exports, ja = { exports: {} }, we = {}, _a = { exports: {} }, Na = {};
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
  function t(z, P) {
    var $ = z.length;
    z.push(P);
    e: for (; 0 < $; ) {
      var Q = $ - 1 >>> 1, Z = z[Q];
      if (0 < l(Z, P)) z[Q] = P, z[$] = Z, $ = Q;
      else break e;
    }
  }
  function n(z) {
    return z.length === 0 ? null : z[0];
  }
  function r(z) {
    if (z.length === 0) return null;
    var P = z[0], $ = z.pop();
    if ($ !== P) {
      z[0] = $;
      e: for (var Q = 0, Z = z.length, sr = Z >>> 1; Q < sr; ) {
        var yt = 2 * (Q + 1) - 1, zl = z[yt], xt = yt + 1, ar = z[xt];
        if (0 > l(zl, $)) xt < Z && 0 > l(ar, zl) ? (z[Q] = ar, z[xt] = $, Q = xt) : (z[Q] = zl, z[yt] = $, Q = yt);
        else if (xt < Z && 0 > l(ar, $)) z[Q] = ar, z[xt] = $, Q = xt;
        else break e;
      }
    }
    return P;
  }
  function l(z, P) {
    var $ = z.sortIndex - P.sortIndex;
    return $ !== 0 ? $ : z.id - P.id;
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
  var u = [], c = [], m = 1, v = null, g = 3, y = !1, x = !1, S = !1, N = typeof setTimeout == "function" ? setTimeout : null, f = typeof clearTimeout == "function" ? clearTimeout : null, d = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function p(z) {
    for (var P = n(c); P !== null; ) {
      if (P.callback === null) r(c);
      else if (P.startTime <= z) r(c), P.sortIndex = P.expirationTime, t(u, P);
      else break;
      P = n(c);
    }
  }
  function w(z) {
    if (S = !1, p(z), !x) if (n(u) !== null) x = !0, Cl(h);
    else {
      var P = n(c);
      P !== null && El(w, P.startTime - z);
    }
  }
  function h(z, P) {
    x = !1, S && (S = !1, f(C), C = -1), y = !0;
    var $ = g;
    try {
      for (p(P), v = n(u); v !== null && (!(v.expirationTime > P) || z && !Pe()); ) {
        var Q = v.callback;
        if (typeof Q == "function") {
          v.callback = null, g = v.priorityLevel;
          var Z = Q(v.expirationTime <= P);
          P = e.unstable_now(), typeof Z == "function" ? v.callback = Z : v === n(u) && r(u), p(P);
        } else r(u);
        v = n(u);
      }
      if (v !== null) var sr = !0;
      else {
        var yt = n(c);
        yt !== null && El(w, yt.startTime - P), sr = !1;
      }
      return sr;
    } finally {
      v = null, g = $, y = !1;
    }
  }
  var k = !1, _ = null, C = -1, F = 5, T = -1;
  function Pe() {
    return !(e.unstable_now() - T < F);
  }
  function fn() {
    if (_ !== null) {
      var z = e.unstable_now();
      T = z;
      var P = !0;
      try {
        P = _(!0, z);
      } finally {
        P ? pn() : (k = !1, _ = null);
      }
    } else k = !1;
  }
  var pn;
  if (typeof d == "function") pn = function() {
    d(fn);
  };
  else if (typeof MessageChannel < "u") {
    var Jo = new MessageChannel(), Rc = Jo.port2;
    Jo.port1.onmessage = fn, pn = function() {
      Rc.postMessage(null);
    };
  } else pn = function() {
    N(fn, 0);
  };
  function Cl(z) {
    _ = z, k || (k = !0, pn());
  }
  function El(z, P) {
    C = N(function() {
      z(e.unstable_now());
    }, P);
  }
  e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(z) {
    z.callback = null;
  }, e.unstable_continueExecution = function() {
    x || y || (x = !0, Cl(h));
  }, e.unstable_forceFrameRate = function(z) {
    0 > z || 125 < z ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : F = 0 < z ? Math.floor(1e3 / z) : 5;
  }, e.unstable_getCurrentPriorityLevel = function() {
    return g;
  }, e.unstable_getFirstCallbackNode = function() {
    return n(u);
  }, e.unstable_next = function(z) {
    switch (g) {
      case 1:
      case 2:
      case 3:
        var P = 3;
        break;
      default:
        P = g;
    }
    var $ = g;
    g = P;
    try {
      return z();
    } finally {
      g = $;
    }
  }, e.unstable_pauseExecution = function() {
  }, e.unstable_requestPaint = function() {
  }, e.unstable_runWithPriority = function(z, P) {
    switch (z) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;
      default:
        z = 3;
    }
    var $ = g;
    g = z;
    try {
      return P();
    } finally {
      g = $;
    }
  }, e.unstable_scheduleCallback = function(z, P, $) {
    var Q = e.unstable_now();
    switch (typeof $ == "object" && $ !== null ? ($ = $.delay, $ = typeof $ == "number" && 0 < $ ? Q + $ : Q) : $ = Q, z) {
      case 1:
        var Z = -1;
        break;
      case 2:
        Z = 250;
        break;
      case 5:
        Z = 1073741823;
        break;
      case 4:
        Z = 1e4;
        break;
      default:
        Z = 5e3;
    }
    return Z = $ + Z, z = { id: m++, callback: P, priorityLevel: z, startTime: $, expirationTime: Z, sortIndex: -1 }, $ > Q ? (z.sortIndex = $, t(c, z), n(u) === null && z === n(c) && (S ? (f(C), C = -1) : S = !0, El(w, $ - Q))) : (z.sortIndex = Z, t(u, z), x || y || (x = !0, Cl(h))), z;
  }, e.unstable_shouldYield = Pe, e.unstable_wrapCallback = function(z) {
    var P = g;
    return function() {
      var $ = g;
      g = P;
      try {
        return z.apply(this, arguments);
      } finally {
        g = $;
      }
    };
  };
})(Na);
_a.exports = Na;
var rd = _a.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ld = R, xe = rd;
function j(e) {
  for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
  return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var Ca = /* @__PURE__ */ new Set(), Fn = {};
function Rt(e, t) {
  tn(e, t), tn(e + "Capture", t);
}
function tn(e, t) {
  for (Fn[e] = t, e = 0; e < t.length; e++) Ca.add(t[e]);
}
var Ke = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), ni = Object.prototype.hasOwnProperty, id = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, ns = {}, rs = {};
function od(e) {
  return ni.call(rs, e) ? !0 : ni.call(ns, e) ? !1 : id.test(e) ? rs[e] = !0 : (ns[e] = !0, !1);
}
function sd(e, t, n, r) {
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
function ad(e, t, n, r) {
  if (t === null || typeof t > "u" || sd(e, t, n, r)) return !0;
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
function ce(e, t, n, r, l, i, o) {
  this.acceptsBooleans = t === 2 || t === 3 || t === 4, this.attributeName = r, this.attributeNamespace = l, this.mustUseProperty = n, this.propertyName = e, this.type = t, this.sanitizeURL = i, this.removeEmptyString = o;
}
var ne = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
  ne[e] = new ce(e, 0, !1, e, null, !1, !1);
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
  var t = e[0];
  ne[t] = new ce(t, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
  ne[e] = new ce(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
  ne[e] = new ce(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
  ne[e] = new ce(e, 3, !1, e.toLowerCase(), null, !1, !1);
});
["checked", "multiple", "muted", "selected"].forEach(function(e) {
  ne[e] = new ce(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function(e) {
  ne[e] = new ce(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function(e) {
  ne[e] = new ce(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function(e) {
  ne[e] = new ce(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var no = /[\-:]([a-z])/g;
function ro(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
  var t = e.replace(
    no,
    ro
  );
  ne[t] = new ce(t, 1, !1, e, null, !1, !1);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
  var t = e.replace(no, ro);
  ne[t] = new ce(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
});
["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
  var t = e.replace(no, ro);
  ne[t] = new ce(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function(e) {
  ne[e] = new ce(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
ne.xlinkHref = new ce("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);
["src", "href", "action", "formAction"].forEach(function(e) {
  ne[e] = new ce(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function lo(e, t, n, r) {
  var l = ne.hasOwnProperty(t) ? ne[t] : null;
  (l !== null ? l.type !== 0 : r || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (ad(t, n, l, r) && (n = null), r || l === null ? od(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n)) : l.mustUseProperty ? e[l.propertyName] = n === null ? l.type === 3 ? !1 : "" : n : (t = l.attributeName, r = l.attributeNamespace, n === null ? e.removeAttribute(t) : (l = l.type, n = l === 3 || l === 4 && n === !0 ? "" : "" + n, r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
var Ze = ld.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, cr = Symbol.for("react.element"), Dt = Symbol.for("react.portal"), Ft = Symbol.for("react.fragment"), io = Symbol.for("react.strict_mode"), ri = Symbol.for("react.profiler"), Ea = Symbol.for("react.provider"), za = Symbol.for("react.context"), oo = Symbol.for("react.forward_ref"), li = Symbol.for("react.suspense"), ii = Symbol.for("react.suspense_list"), so = Symbol.for("react.memo"), qe = Symbol.for("react.lazy"), Pa = Symbol.for("react.offscreen"), ls = Symbol.iterator;
function mn(e) {
  return e === null || typeof e != "object" ? null : (e = ls && e[ls] || e["@@iterator"], typeof e == "function" ? e : null);
}
var V = Object.assign, Tl;
function jn(e) {
  if (Tl === void 0) try {
    throw Error();
  } catch (n) {
    var t = n.stack.trim().match(/\n( *(at )?)/);
    Tl = t && t[1] || "";
  }
  return `
` + Tl + e;
}
var $l = !1;
function Ll(e, t) {
  if (!e || $l) return "";
  $l = !0;
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
`), o = l.length - 1, s = i.length - 1; 1 <= o && 0 <= s && l[o] !== i[s]; ) s--;
      for (; 1 <= o && 0 <= s; o--, s--) if (l[o] !== i[s]) {
        if (o !== 1 || s !== 1)
          do
            if (o--, s--, 0 > s || l[o] !== i[s]) {
              var u = `
` + l[o].replace(" at new ", " at ");
              return e.displayName && u.includes("<anonymous>") && (u = u.replace("<anonymous>", e.displayName)), u;
            }
          while (1 <= o && 0 <= s);
        break;
      }
    }
  } finally {
    $l = !1, Error.prepareStackTrace = n;
  }
  return (e = e ? e.displayName || e.name : "") ? jn(e) : "";
}
function ud(e) {
  switch (e.tag) {
    case 5:
      return jn(e.type);
    case 16:
      return jn("Lazy");
    case 13:
      return jn("Suspense");
    case 19:
      return jn("SuspenseList");
    case 0:
    case 2:
    case 15:
      return e = Ll(e.type, !1), e;
    case 11:
      return e = Ll(e.type.render, !1), e;
    case 1:
      return e = Ll(e.type, !0), e;
    default:
      return "";
  }
}
function oi(e) {
  if (e == null) return null;
  if (typeof e == "function") return e.displayName || e.name || null;
  if (typeof e == "string") return e;
  switch (e) {
    case Ft:
      return "Fragment";
    case Dt:
      return "Portal";
    case ri:
      return "Profiler";
    case io:
      return "StrictMode";
    case li:
      return "Suspense";
    case ii:
      return "SuspenseList";
  }
  if (typeof e == "object") switch (e.$$typeof) {
    case za:
      return (e.displayName || "Context") + ".Consumer";
    case Ea:
      return (e._context.displayName || "Context") + ".Provider";
    case oo:
      var t = e.render;
      return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
    case so:
      return t = e.displayName || null, t !== null ? t : oi(e.type) || "Memo";
    case qe:
      t = e._payload, e = e._init;
      try {
        return oi(e(t));
      } catch {
      }
  }
  return null;
}
function cd(e) {
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
      return oi(t);
    case 8:
      return t === io ? "StrictMode" : "Mode";
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
function pt(e) {
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
function Ta(e) {
  var t = e.type;
  return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
}
function dd(e) {
  var t = Ta(e) ? "checked" : "value", n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t), r = "" + e[t];
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
function dr(e) {
  e._valueTracker || (e._valueTracker = dd(e));
}
function $a(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(), r = "";
  return e && (r = Ta(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n ? (t.setValue(e), !0) : !1;
}
function Ir(e) {
  if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function si(e, t) {
  var n = t.checked;
  return V({}, t, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: n ?? e._wrapperState.initialChecked });
}
function is(e, t) {
  var n = t.defaultValue == null ? "" : t.defaultValue, r = t.checked != null ? t.checked : t.defaultChecked;
  n = pt(t.value != null ? t.value : n), e._wrapperState = { initialChecked: r, initialValue: n, controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null };
}
function La(e, t) {
  t = t.checked, t != null && lo(e, "checked", t, !1);
}
function ai(e, t) {
  La(e, t);
  var n = pt(t.value), r = t.type;
  if (n != null) r === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + n) : e.value !== "" + n && (e.value = "" + n);
  else if (r === "submit" || r === "reset") {
    e.removeAttribute("value");
    return;
  }
  t.hasOwnProperty("value") ? ui(e, t.type, n) : t.hasOwnProperty("defaultValue") && ui(e, t.type, pt(t.defaultValue)), t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked);
}
function os(e, t, n) {
  if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
    var r = t.type;
    if (!(r !== "submit" && r !== "reset" || t.value !== void 0 && t.value !== null)) return;
    t = "" + e._wrapperState.initialValue, n || t === e.value || (e.value = t), e.defaultValue = t;
  }
  n = e.name, n !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, n !== "" && (e.name = n);
}
function ui(e, t, n) {
  (t !== "number" || Ir(e.ownerDocument) !== e) && (n == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
}
var _n = Array.isArray;
function Yt(e, t, n, r) {
  if (e = e.options, t) {
    t = {};
    for (var l = 0; l < n.length; l++) t["$" + n[l]] = !0;
    for (n = 0; n < e.length; n++) l = t.hasOwnProperty("$" + e[n].value), e[n].selected !== l && (e[n].selected = l), l && r && (e[n].defaultSelected = !0);
  } else {
    for (n = "" + pt(n), t = null, l = 0; l < e.length; l++) {
      if (e[l].value === n) {
        e[l].selected = !0, r && (e[l].defaultSelected = !0);
        return;
      }
      t !== null || e[l].disabled || (t = e[l]);
    }
    t !== null && (t.selected = !0);
  }
}
function ci(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(j(91));
  return V({}, t, { value: void 0, defaultValue: void 0, children: "" + e._wrapperState.initialValue });
}
function ss(e, t) {
  var n = t.value;
  if (n == null) {
    if (n = t.children, t = t.defaultValue, n != null) {
      if (t != null) throw Error(j(92));
      if (_n(n)) {
        if (1 < n.length) throw Error(j(93));
        n = n[0];
      }
      t = n;
    }
    t == null && (t = ""), n = t;
  }
  e._wrapperState = { initialValue: pt(n) };
}
function Ra(e, t) {
  var n = pt(t.value), r = pt(t.defaultValue);
  n != null && (n = "" + n, n !== e.value && (e.value = n), t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)), r != null && (e.defaultValue = "" + r);
}
function as(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
}
function Ma(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function di(e, t) {
  return e == null || e === "http://www.w3.org/1999/xhtml" ? Ma(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e;
}
var fr, Oa = function(e) {
  return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, n, r, l) {
    MSApp.execUnsafeLocalFunction(function() {
      return e(t, n, r, l);
    });
  } : e;
}(function(e, t) {
  if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e) e.innerHTML = t;
  else {
    for (fr = fr || document.createElement("div"), fr.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>", t = fr.firstChild; e.firstChild; ) e.removeChild(e.firstChild);
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
var En = {
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
}, fd = ["Webkit", "ms", "Moz", "O"];
Object.keys(En).forEach(function(e) {
  fd.forEach(function(t) {
    t = t + e.charAt(0).toUpperCase() + e.substring(1), En[t] = En[e];
  });
});
function Da(e, t, n) {
  return t == null || typeof t == "boolean" || t === "" ? "" : n || typeof t != "number" || t === 0 || En.hasOwnProperty(e) && En[e] ? ("" + t).trim() : t + "px";
}
function Fa(e, t) {
  e = e.style;
  for (var n in t) if (t.hasOwnProperty(n)) {
    var r = n.indexOf("--") === 0, l = Da(n, t[n], r);
    n === "float" && (n = "cssFloat"), r ? e.setProperty(n, l) : e[n] = l;
  }
}
var pd = V({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
function fi(e, t) {
  if (t) {
    if (pd[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(j(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(j(60));
      if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML)) throw Error(j(61));
    }
    if (t.style != null && typeof t.style != "object") throw Error(j(62));
  }
}
function pi(e, t) {
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
var hi = null;
function ao(e) {
  return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
}
var mi = null, Xt = null, Zt = null;
function us(e) {
  if (e = lr(e)) {
    if (typeof mi != "function") throw Error(j(280));
    var t = e.stateNode;
    t && (t = hl(t), mi(e.stateNode, e.type, t));
  }
}
function Ia(e) {
  Xt ? Zt ? Zt.push(e) : Zt = [e] : Xt = e;
}
function Ua() {
  if (Xt) {
    var e = Xt, t = Zt;
    if (Zt = Xt = null, us(e), t) for (e = 0; e < t.length; e++) us(t[e]);
  }
}
function Ba(e, t) {
  return e(t);
}
function Aa() {
}
var Rl = !1;
function Wa(e, t, n) {
  if (Rl) return e(t, n);
  Rl = !0;
  try {
    return Ba(e, t, n);
  } finally {
    Rl = !1, (Xt !== null || Zt !== null) && (Aa(), Ua());
  }
}
function Un(e, t) {
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
  if (n && typeof n != "function") throw Error(j(231, t, typeof n));
  return n;
}
var gi = !1;
if (Ke) try {
  var gn = {};
  Object.defineProperty(gn, "passive", { get: function() {
    gi = !0;
  } }), window.addEventListener("test", gn, gn), window.removeEventListener("test", gn, gn);
} catch {
  gi = !1;
}
function hd(e, t, n, r, l, i, o, s, u) {
  var c = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, c);
  } catch (m) {
    this.onError(m);
  }
}
var zn = !1, Ur = null, Br = !1, vi = null, md = { onError: function(e) {
  zn = !0, Ur = e;
} };
function gd(e, t, n, r, l, i, o, s, u) {
  zn = !1, Ur = null, hd.apply(md, arguments);
}
function vd(e, t, n, r, l, i, o, s, u) {
  if (gd.apply(this, arguments), zn) {
    if (zn) {
      var c = Ur;
      zn = !1, Ur = null;
    } else throw Error(j(198));
    Br || (Br = !0, vi = c);
  }
}
function Mt(e) {
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
function ba(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
  }
  return null;
}
function cs(e) {
  if (Mt(e) !== e) throw Error(j(188));
}
function yd(e) {
  var t = e.alternate;
  if (!t) {
    if (t = Mt(e), t === null) throw Error(j(188));
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
      throw Error(j(188));
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
        if (!o) throw Error(j(189));
      }
    }
    if (n.alternate !== r) throw Error(j(190));
  }
  if (n.tag !== 3) throw Error(j(188));
  return n.stateNode.current === n ? e : t;
}
function Va(e) {
  return e = yd(e), e !== null ? Ha(e) : null;
}
function Ha(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var t = Ha(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var Qa = xe.unstable_scheduleCallback, ds = xe.unstable_cancelCallback, xd = xe.unstable_shouldYield, wd = xe.unstable_requestPaint, K = xe.unstable_now, kd = xe.unstable_getCurrentPriorityLevel, uo = xe.unstable_ImmediatePriority, Ka = xe.unstable_UserBlockingPriority, Ar = xe.unstable_NormalPriority, Sd = xe.unstable_LowPriority, Ga = xe.unstable_IdlePriority, cl = null, Be = null;
function jd(e) {
  if (Be && typeof Be.onCommitFiberRoot == "function") try {
    Be.onCommitFiberRoot(cl, e, void 0, (e.current.flags & 128) === 128);
  } catch {
  }
}
var Me = Math.clz32 ? Math.clz32 : Cd, _d = Math.log, Nd = Math.LN2;
function Cd(e) {
  return e >>>= 0, e === 0 ? 32 : 31 - (_d(e) / Nd | 0) | 0;
}
var pr = 64, hr = 4194304;
function Nn(e) {
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
function Wr(e, t) {
  var n = e.pendingLanes;
  if (n === 0) return 0;
  var r = 0, l = e.suspendedLanes, i = e.pingedLanes, o = n & 268435455;
  if (o !== 0) {
    var s = o & ~l;
    s !== 0 ? r = Nn(s) : (i &= o, i !== 0 && (r = Nn(i)));
  } else o = n & ~l, o !== 0 ? r = Nn(o) : i !== 0 && (r = Nn(i));
  if (r === 0) return 0;
  if (t !== 0 && t !== r && !(t & l) && (l = r & -r, i = t & -t, l >= i || l === 16 && (i & 4194240) !== 0)) return t;
  if (r & 4 && (r |= n & 16), t = e.entangledLanes, t !== 0) for (e = e.entanglements, t &= r; 0 < t; ) n = 31 - Me(t), l = 1 << n, r |= e[n], t &= ~l;
  return r;
}
function Ed(e, t) {
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
function zd(e, t) {
  for (var n = e.suspendedLanes, r = e.pingedLanes, l = e.expirationTimes, i = e.pendingLanes; 0 < i; ) {
    var o = 31 - Me(i), s = 1 << o, u = l[o];
    u === -1 ? (!(s & n) || s & r) && (l[o] = Ed(s, t)) : u <= t && (e.expiredLanes |= s), i &= ~s;
  }
}
function yi(e) {
  return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
}
function Ya() {
  var e = pr;
  return pr <<= 1, !(pr & 4194240) && (pr = 64), e;
}
function Ml(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t;
}
function nr(e, t, n) {
  e.pendingLanes |= t, t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, t = 31 - Me(t), e[t] = n;
}
function Pd(e, t) {
  var n = e.pendingLanes & ~t;
  e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
  var r = e.eventTimes;
  for (e = e.expirationTimes; 0 < n; ) {
    var l = 31 - Me(n), i = 1 << l;
    t[l] = 0, r[l] = -1, e[l] = -1, n &= ~i;
  }
}
function co(e, t) {
  var n = e.entangledLanes |= t;
  for (e = e.entanglements; n; ) {
    var r = 31 - Me(n), l = 1 << r;
    l & t | e[r] & t && (e[r] |= t), n &= ~l;
  }
}
var D = 0;
function Xa(e) {
  return e &= -e, 1 < e ? 4 < e ? e & 268435455 ? 16 : 536870912 : 4 : 1;
}
var Za, fo, Ja, qa, eu, xi = !1, mr = [], it = null, ot = null, st = null, Bn = /* @__PURE__ */ new Map(), An = /* @__PURE__ */ new Map(), tt = [], Td = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function fs(e, t) {
  switch (e) {
    case "focusin":
    case "focusout":
      it = null;
      break;
    case "dragenter":
    case "dragleave":
      ot = null;
      break;
    case "mouseover":
    case "mouseout":
      st = null;
      break;
    case "pointerover":
    case "pointerout":
      Bn.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      An.delete(t.pointerId);
  }
}
function vn(e, t, n, r, l, i) {
  return e === null || e.nativeEvent !== i ? (e = { blockedOn: t, domEventName: n, eventSystemFlags: r, nativeEvent: i, targetContainers: [l] }, t !== null && (t = lr(t), t !== null && fo(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, l !== null && t.indexOf(l) === -1 && t.push(l), e);
}
function $d(e, t, n, r, l) {
  switch (t) {
    case "focusin":
      return it = vn(it, e, t, n, r, l), !0;
    case "dragenter":
      return ot = vn(ot, e, t, n, r, l), !0;
    case "mouseover":
      return st = vn(st, e, t, n, r, l), !0;
    case "pointerover":
      var i = l.pointerId;
      return Bn.set(i, vn(Bn.get(i) || null, e, t, n, r, l)), !0;
    case "gotpointercapture":
      return i = l.pointerId, An.set(i, vn(An.get(i) || null, e, t, n, r, l)), !0;
  }
  return !1;
}
function tu(e) {
  var t = St(e.target);
  if (t !== null) {
    var n = Mt(t);
    if (n !== null) {
      if (t = n.tag, t === 13) {
        if (t = ba(n), t !== null) {
          e.blockedOn = t, eu(e.priority, function() {
            Ja(n);
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
function zr(e) {
  if (e.blockedOn !== null) return !1;
  for (var t = e.targetContainers; 0 < t.length; ) {
    var n = wi(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var r = new n.constructor(n.type, n);
      hi = r, n.target.dispatchEvent(r), hi = null;
    } else return t = lr(n), t !== null && fo(t), e.blockedOn = n, !1;
    t.shift();
  }
  return !0;
}
function ps(e, t, n) {
  zr(e) && n.delete(t);
}
function Ld() {
  xi = !1, it !== null && zr(it) && (it = null), ot !== null && zr(ot) && (ot = null), st !== null && zr(st) && (st = null), Bn.forEach(ps), An.forEach(ps);
}
function yn(e, t) {
  e.blockedOn === t && (e.blockedOn = null, xi || (xi = !0, xe.unstable_scheduleCallback(xe.unstable_NormalPriority, Ld)));
}
function Wn(e) {
  function t(l) {
    return yn(l, e);
  }
  if (0 < mr.length) {
    yn(mr[0], e);
    for (var n = 1; n < mr.length; n++) {
      var r = mr[n];
      r.blockedOn === e && (r.blockedOn = null);
    }
  }
  for (it !== null && yn(it, e), ot !== null && yn(ot, e), st !== null && yn(st, e), Bn.forEach(t), An.forEach(t), n = 0; n < tt.length; n++) r = tt[n], r.blockedOn === e && (r.blockedOn = null);
  for (; 0 < tt.length && (n = tt[0], n.blockedOn === null); ) tu(n), n.blockedOn === null && tt.shift();
}
var Jt = Ze.ReactCurrentBatchConfig, br = !0;
function Rd(e, t, n, r) {
  var l = D, i = Jt.transition;
  Jt.transition = null;
  try {
    D = 1, po(e, t, n, r);
  } finally {
    D = l, Jt.transition = i;
  }
}
function Md(e, t, n, r) {
  var l = D, i = Jt.transition;
  Jt.transition = null;
  try {
    D = 4, po(e, t, n, r);
  } finally {
    D = l, Jt.transition = i;
  }
}
function po(e, t, n, r) {
  if (br) {
    var l = wi(e, t, n, r);
    if (l === null) Vl(e, t, r, Vr, n), fs(e, r);
    else if ($d(l, e, t, n, r)) r.stopPropagation();
    else if (fs(e, r), t & 4 && -1 < Td.indexOf(e)) {
      for (; l !== null; ) {
        var i = lr(l);
        if (i !== null && Za(i), i = wi(e, t, n, r), i === null && Vl(e, t, r, Vr, n), i === l) break;
        l = i;
      }
      l !== null && r.stopPropagation();
    } else Vl(e, t, r, null, n);
  }
}
var Vr = null;
function wi(e, t, n, r) {
  if (Vr = null, e = ao(r), e = St(e), e !== null) if (t = Mt(e), t === null) e = null;
  else if (n = t.tag, n === 13) {
    if (e = ba(t), e !== null) return e;
    e = null;
  } else if (n === 3) {
    if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
    e = null;
  } else t !== e && (e = null);
  return Vr = e, null;
}
function nu(e) {
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
      switch (kd()) {
        case uo:
          return 1;
        case Ka:
          return 4;
        case Ar:
        case Sd:
          return 16;
        case Ga:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var rt = null, ho = null, Pr = null;
function ru() {
  if (Pr) return Pr;
  var e, t = ho, n = t.length, r, l = "value" in rt ? rt.value : rt.textContent, i = l.length;
  for (e = 0; e < n && t[e] === l[e]; e++) ;
  var o = n - e;
  for (r = 1; r <= o && t[n - r] === l[i - r]; r++) ;
  return Pr = l.slice(e, 1 < r ? 1 - r : void 0);
}
function Tr(e) {
  var t = e.keyCode;
  return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
}
function gr() {
  return !0;
}
function hs() {
  return !1;
}
function ke(e) {
  function t(n, r, l, i, o) {
    this._reactName = n, this._targetInst = l, this.type = r, this.nativeEvent = i, this.target = o, this.currentTarget = null;
    for (var s in e) e.hasOwnProperty(s) && (n = e[s], this[s] = n ? n(i) : i[s]);
    return this.isDefaultPrevented = (i.defaultPrevented != null ? i.defaultPrevented : i.returnValue === !1) ? gr : hs, this.isPropagationStopped = hs, this;
  }
  return V(t.prototype, { preventDefault: function() {
    this.defaultPrevented = !0;
    var n = this.nativeEvent;
    n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = gr);
  }, stopPropagation: function() {
    var n = this.nativeEvent;
    n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = gr);
  }, persist: function() {
  }, isPersistent: gr }), t;
}
var cn = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(e) {
  return e.timeStamp || Date.now();
}, defaultPrevented: 0, isTrusted: 0 }, mo = ke(cn), rr = V({}, cn, { view: 0, detail: 0 }), Od = ke(rr), Ol, Dl, xn, dl = V({}, rr, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: go, button: 0, buttons: 0, relatedTarget: function(e) {
  return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
}, movementX: function(e) {
  return "movementX" in e ? e.movementX : (e !== xn && (xn && e.type === "mousemove" ? (Ol = e.screenX - xn.screenX, Dl = e.screenY - xn.screenY) : Dl = Ol = 0, xn = e), Ol);
}, movementY: function(e) {
  return "movementY" in e ? e.movementY : Dl;
} }), ms = ke(dl), Dd = V({}, dl, { dataTransfer: 0 }), Fd = ke(Dd), Id = V({}, rr, { relatedTarget: 0 }), Fl = ke(Id), Ud = V({}, cn, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Bd = ke(Ud), Ad = V({}, cn, { clipboardData: function(e) {
  return "clipboardData" in e ? e.clipboardData : window.clipboardData;
} }), Wd = ke(Ad), bd = V({}, cn, { data: 0 }), gs = ke(bd), Vd = {
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
}, Hd = {
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
}, Qd = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function Kd(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = Qd[e]) ? !!t[e] : !1;
}
function go() {
  return Kd;
}
var Gd = V({}, rr, { key: function(e) {
  if (e.key) {
    var t = Vd[e.key] || e.key;
    if (t !== "Unidentified") return t;
  }
  return e.type === "keypress" ? (e = Tr(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Hd[e.keyCode] || "Unidentified" : "";
}, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: go, charCode: function(e) {
  return e.type === "keypress" ? Tr(e) : 0;
}, keyCode: function(e) {
  return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
}, which: function(e) {
  return e.type === "keypress" ? Tr(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
} }), Yd = ke(Gd), Xd = V({}, dl, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), vs = ke(Xd), Zd = V({}, rr, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: go }), Jd = ke(Zd), qd = V({}, cn, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), ef = ke(qd), tf = V({}, dl, {
  deltaX: function(e) {
    return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
  },
  deltaY: function(e) {
    return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), nf = ke(tf), rf = [9, 13, 27, 32], vo = Ke && "CompositionEvent" in window, Pn = null;
Ke && "documentMode" in document && (Pn = document.documentMode);
var lf = Ke && "TextEvent" in window && !Pn, lu = Ke && (!vo || Pn && 8 < Pn && 11 >= Pn), ys = " ", xs = !1;
function iu(e, t) {
  switch (e) {
    case "keyup":
      return rf.indexOf(t.keyCode) !== -1;
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
function ou(e) {
  return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
}
var It = !1;
function of(e, t) {
  switch (e) {
    case "compositionend":
      return ou(t);
    case "keypress":
      return t.which !== 32 ? null : (xs = !0, ys);
    case "textInput":
      return e = t.data, e === ys && xs ? null : e;
    default:
      return null;
  }
}
function sf(e, t) {
  if (It) return e === "compositionend" || !vo && iu(e, t) ? (e = ru(), Pr = ho = rt = null, It = !1, e) : null;
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
      return lu && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var af = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
function ws(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!af[e.type] : t === "textarea";
}
function su(e, t, n, r) {
  Ia(r), t = Hr(t, "onChange"), 0 < t.length && (n = new mo("onChange", "change", null, n, r), e.push({ event: n, listeners: t }));
}
var Tn = null, bn = null;
function uf(e) {
  yu(e, 0);
}
function fl(e) {
  var t = At(e);
  if ($a(t)) return e;
}
function cf(e, t) {
  if (e === "change") return t;
}
var au = !1;
if (Ke) {
  var Il;
  if (Ke) {
    var Ul = "oninput" in document;
    if (!Ul) {
      var ks = document.createElement("div");
      ks.setAttribute("oninput", "return;"), Ul = typeof ks.oninput == "function";
    }
    Il = Ul;
  } else Il = !1;
  au = Il && (!document.documentMode || 9 < document.documentMode);
}
function Ss() {
  Tn && (Tn.detachEvent("onpropertychange", uu), bn = Tn = null);
}
function uu(e) {
  if (e.propertyName === "value" && fl(bn)) {
    var t = [];
    su(t, bn, e, ao(e)), Wa(uf, t);
  }
}
function df(e, t, n) {
  e === "focusin" ? (Ss(), Tn = t, bn = n, Tn.attachEvent("onpropertychange", uu)) : e === "focusout" && Ss();
}
function ff(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown") return fl(bn);
}
function pf(e, t) {
  if (e === "click") return fl(t);
}
function hf(e, t) {
  if (e === "input" || e === "change") return fl(t);
}
function mf(e, t) {
  return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
}
var De = typeof Object.is == "function" ? Object.is : mf;
function Vn(e, t) {
  if (De(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null) return !1;
  var n = Object.keys(e), r = Object.keys(t);
  if (n.length !== r.length) return !1;
  for (r = 0; r < n.length; r++) {
    var l = n[r];
    if (!ni.call(t, l) || !De(e[l], t[l])) return !1;
  }
  return !0;
}
function js(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function _s(e, t) {
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
function cu(e, t) {
  return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? cu(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
}
function du() {
  for (var e = window, t = Ir(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var n = typeof t.contentWindow.location.href == "string";
    } catch {
      n = !1;
    }
    if (n) e = t.contentWindow;
    else break;
    t = Ir(e.document);
  }
  return t;
}
function yo(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
}
function gf(e) {
  var t = du(), n = e.focusedElem, r = e.selectionRange;
  if (t !== n && n && n.ownerDocument && cu(n.ownerDocument.documentElement, n)) {
    if (r !== null && yo(n)) {
      if (t = r.start, e = r.end, e === void 0 && (e = t), "selectionStart" in n) n.selectionStart = t, n.selectionEnd = Math.min(e, n.value.length);
      else if (e = (t = n.ownerDocument || document) && t.defaultView || window, e.getSelection) {
        e = e.getSelection();
        var l = n.textContent.length, i = Math.min(r.start, l);
        r = r.end === void 0 ? i : Math.min(r.end, l), !e.extend && i > r && (l = r, r = i, i = l), l = _s(n, i);
        var o = _s(
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
var vf = Ke && "documentMode" in document && 11 >= document.documentMode, Ut = null, ki = null, $n = null, Si = !1;
function Ns(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  Si || Ut == null || Ut !== Ir(r) || (r = Ut, "selectionStart" in r && yo(r) ? r = { start: r.selectionStart, end: r.selectionEnd } : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = { anchorNode: r.anchorNode, anchorOffset: r.anchorOffset, focusNode: r.focusNode, focusOffset: r.focusOffset }), $n && Vn($n, r) || ($n = r, r = Hr(ki, "onSelect"), 0 < r.length && (t = new mo("onSelect", "select", null, t, n), e.push({ event: t, listeners: r }), t.target = Ut)));
}
function vr(e, t) {
  var n = {};
  return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
}
var Bt = { animationend: vr("Animation", "AnimationEnd"), animationiteration: vr("Animation", "AnimationIteration"), animationstart: vr("Animation", "AnimationStart"), transitionend: vr("Transition", "TransitionEnd") }, Bl = {}, fu = {};
Ke && (fu = document.createElement("div").style, "AnimationEvent" in window || (delete Bt.animationend.animation, delete Bt.animationiteration.animation, delete Bt.animationstart.animation), "TransitionEvent" in window || delete Bt.transitionend.transition);
function pl(e) {
  if (Bl[e]) return Bl[e];
  if (!Bt[e]) return e;
  var t = Bt[e], n;
  for (n in t) if (t.hasOwnProperty(n) && n in fu) return Bl[e] = t[n];
  return e;
}
var pu = pl("animationend"), hu = pl("animationiteration"), mu = pl("animationstart"), gu = pl("transitionend"), vu = /* @__PURE__ */ new Map(), Cs = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function mt(e, t) {
  vu.set(e, t), Rt(t, [e]);
}
for (var Al = 0; Al < Cs.length; Al++) {
  var Wl = Cs[Al], yf = Wl.toLowerCase(), xf = Wl[0].toUpperCase() + Wl.slice(1);
  mt(yf, "on" + xf);
}
mt(pu, "onAnimationEnd");
mt(hu, "onAnimationIteration");
mt(mu, "onAnimationStart");
mt("dblclick", "onDoubleClick");
mt("focusin", "onFocus");
mt("focusout", "onBlur");
mt(gu, "onTransitionEnd");
tn("onMouseEnter", ["mouseout", "mouseover"]);
tn("onMouseLeave", ["mouseout", "mouseover"]);
tn("onPointerEnter", ["pointerout", "pointerover"]);
tn("onPointerLeave", ["pointerout", "pointerover"]);
Rt("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
Rt("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
Rt("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
Rt("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
Rt("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
Rt("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var Cn = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), wf = new Set("cancel close invalid load scroll toggle".split(" ").concat(Cn));
function Es(e, t, n) {
  var r = e.type || "unknown-event";
  e.currentTarget = n, vd(r, t, void 0, e), e.currentTarget = null;
}
function yu(e, t) {
  t = (t & 4) !== 0;
  for (var n = 0; n < e.length; n++) {
    var r = e[n], l = r.event;
    r = r.listeners;
    e: {
      var i = void 0;
      if (t) for (var o = r.length - 1; 0 <= o; o--) {
        var s = r[o], u = s.instance, c = s.currentTarget;
        if (s = s.listener, u !== i && l.isPropagationStopped()) break e;
        Es(l, s, c), i = u;
      }
      else for (o = 0; o < r.length; o++) {
        if (s = r[o], u = s.instance, c = s.currentTarget, s = s.listener, u !== i && l.isPropagationStopped()) break e;
        Es(l, s, c), i = u;
      }
    }
  }
  if (Br) throw e = vi, Br = !1, vi = null, e;
}
function U(e, t) {
  var n = t[Ei];
  n === void 0 && (n = t[Ei] = /* @__PURE__ */ new Set());
  var r = e + "__bubble";
  n.has(r) || (xu(t, e, 2, !1), n.add(r));
}
function bl(e, t, n) {
  var r = 0;
  t && (r |= 4), xu(n, e, r, t);
}
var yr = "_reactListening" + Math.random().toString(36).slice(2);
function Hn(e) {
  if (!e[yr]) {
    e[yr] = !0, Ca.forEach(function(n) {
      n !== "selectionchange" && (wf.has(n) || bl(n, !1, e), bl(n, !0, e));
    });
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[yr] || (t[yr] = !0, bl("selectionchange", !1, t));
  }
}
function xu(e, t, n, r) {
  switch (nu(t)) {
    case 1:
      var l = Rd;
      break;
    case 4:
      l = Md;
      break;
    default:
      l = po;
  }
  n = l.bind(null, t, n, e), l = void 0, !gi || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (l = !0), r ? l !== void 0 ? e.addEventListener(t, n, { capture: !0, passive: l }) : e.addEventListener(t, n, !0) : l !== void 0 ? e.addEventListener(t, n, { passive: l }) : e.addEventListener(t, n, !1);
}
function Vl(e, t, n, r, l) {
  var i = r;
  if (!(t & 1) && !(t & 2) && r !== null) e: for (; ; ) {
    if (r === null) return;
    var o = r.tag;
    if (o === 3 || o === 4) {
      var s = r.stateNode.containerInfo;
      if (s === l || s.nodeType === 8 && s.parentNode === l) break;
      if (o === 4) for (o = r.return; o !== null; ) {
        var u = o.tag;
        if ((u === 3 || u === 4) && (u = o.stateNode.containerInfo, u === l || u.nodeType === 8 && u.parentNode === l)) return;
        o = o.return;
      }
      for (; s !== null; ) {
        if (o = St(s), o === null) return;
        if (u = o.tag, u === 5 || u === 6) {
          r = i = o;
          continue e;
        }
        s = s.parentNode;
      }
    }
    r = r.return;
  }
  Wa(function() {
    var c = i, m = ao(n), v = [];
    e: {
      var g = vu.get(e);
      if (g !== void 0) {
        var y = mo, x = e;
        switch (e) {
          case "keypress":
            if (Tr(n) === 0) break e;
          case "keydown":
          case "keyup":
            y = Yd;
            break;
          case "focusin":
            x = "focus", y = Fl;
            break;
          case "focusout":
            x = "blur", y = Fl;
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
            y = Fd;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            y = Jd;
            break;
          case pu:
          case hu:
          case mu:
            y = Bd;
            break;
          case gu:
            y = ef;
            break;
          case "scroll":
            y = Od;
            break;
          case "wheel":
            y = nf;
            break;
          case "copy":
          case "cut":
          case "paste":
            y = Wd;
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
        var S = (t & 4) !== 0, N = !S && e === "scroll", f = S ? g !== null ? g + "Capture" : null : g;
        S = [];
        for (var d = c, p; d !== null; ) {
          p = d;
          var w = p.stateNode;
          if (p.tag === 5 && w !== null && (p = w, f !== null && (w = Un(d, f), w != null && S.push(Qn(d, w, p)))), N) break;
          d = d.return;
        }
        0 < S.length && (g = new y(g, x, null, n, m), v.push({ event: g, listeners: S }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (g = e === "mouseover" || e === "pointerover", y = e === "mouseout" || e === "pointerout", g && n !== hi && (x = n.relatedTarget || n.fromElement) && (St(x) || x[Ge])) break e;
        if ((y || g) && (g = m.window === m ? m : (g = m.ownerDocument) ? g.defaultView || g.parentWindow : window, y ? (x = n.relatedTarget || n.toElement, y = c, x = x ? St(x) : null, x !== null && (N = Mt(x), x !== N || x.tag !== 5 && x.tag !== 6) && (x = null)) : (y = null, x = c), y !== x)) {
          if (S = ms, w = "onMouseLeave", f = "onMouseEnter", d = "mouse", (e === "pointerout" || e === "pointerover") && (S = vs, w = "onPointerLeave", f = "onPointerEnter", d = "pointer"), N = y == null ? g : At(y), p = x == null ? g : At(x), g = new S(w, d + "leave", y, n, m), g.target = N, g.relatedTarget = p, w = null, St(m) === c && (S = new S(f, d + "enter", x, n, m), S.target = p, S.relatedTarget = N, w = S), N = w, y && x) t: {
            for (S = y, f = x, d = 0, p = S; p; p = Ot(p)) d++;
            for (p = 0, w = f; w; w = Ot(w)) p++;
            for (; 0 < d - p; ) S = Ot(S), d--;
            for (; 0 < p - d; ) f = Ot(f), p--;
            for (; d--; ) {
              if (S === f || f !== null && S === f.alternate) break t;
              S = Ot(S), f = Ot(f);
            }
            S = null;
          }
          else S = null;
          y !== null && zs(v, g, y, S, !1), x !== null && N !== null && zs(v, N, x, S, !0);
        }
      }
      e: {
        if (g = c ? At(c) : window, y = g.nodeName && g.nodeName.toLowerCase(), y === "select" || y === "input" && g.type === "file") var h = cf;
        else if (ws(g)) if (au) h = hf;
        else {
          h = ff;
          var k = df;
        }
        else (y = g.nodeName) && y.toLowerCase() === "input" && (g.type === "checkbox" || g.type === "radio") && (h = pf);
        if (h && (h = h(e, c))) {
          su(v, h, n, m);
          break e;
        }
        k && k(e, g, c), e === "focusout" && (k = g._wrapperState) && k.controlled && g.type === "number" && ui(g, "number", g.value);
      }
      switch (k = c ? At(c) : window, e) {
        case "focusin":
          (ws(k) || k.contentEditable === "true") && (Ut = k, ki = c, $n = null);
          break;
        case "focusout":
          $n = ki = Ut = null;
          break;
        case "mousedown":
          Si = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          Si = !1, Ns(v, n, m);
          break;
        case "selectionchange":
          if (vf) break;
        case "keydown":
        case "keyup":
          Ns(v, n, m);
      }
      var _;
      if (vo) e: {
        switch (e) {
          case "compositionstart":
            var C = "onCompositionStart";
            break e;
          case "compositionend":
            C = "onCompositionEnd";
            break e;
          case "compositionupdate":
            C = "onCompositionUpdate";
            break e;
        }
        C = void 0;
      }
      else It ? iu(e, n) && (C = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (C = "onCompositionStart");
      C && (lu && n.locale !== "ko" && (It || C !== "onCompositionStart" ? C === "onCompositionEnd" && It && (_ = ru()) : (rt = m, ho = "value" in rt ? rt.value : rt.textContent, It = !0)), k = Hr(c, C), 0 < k.length && (C = new gs(C, e, null, n, m), v.push({ event: C, listeners: k }), _ ? C.data = _ : (_ = ou(n), _ !== null && (C.data = _)))), (_ = lf ? of(e, n) : sf(e, n)) && (c = Hr(c, "onBeforeInput"), 0 < c.length && (m = new gs("onBeforeInput", "beforeinput", null, n, m), v.push({ event: m, listeners: c }), m.data = _));
    }
    yu(v, t);
  });
}
function Qn(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function Hr(e, t) {
  for (var n = t + "Capture", r = []; e !== null; ) {
    var l = e, i = l.stateNode;
    l.tag === 5 && i !== null && (l = i, i = Un(e, n), i != null && r.unshift(Qn(e, i, l)), i = Un(e, t), i != null && r.push(Qn(e, i, l))), e = e.return;
  }
  return r;
}
function Ot(e) {
  if (e === null) return null;
  do
    e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function zs(e, t, n, r, l) {
  for (var i = t._reactName, o = []; n !== null && n !== r; ) {
    var s = n, u = s.alternate, c = s.stateNode;
    if (u !== null && u === r) break;
    s.tag === 5 && c !== null && (s = c, l ? (u = Un(n, i), u != null && o.unshift(Qn(n, u, s))) : l || (u = Un(n, i), u != null && o.push(Qn(n, u, s)))), n = n.return;
  }
  o.length !== 0 && e.push({ event: t, listeners: o });
}
var kf = /\r\n?/g, Sf = /\u0000|\uFFFD/g;
function Ps(e) {
  return (typeof e == "string" ? e : "" + e).replace(kf, `
`).replace(Sf, "");
}
function xr(e, t, n) {
  if (t = Ps(t), Ps(e) !== t && n) throw Error(j(425));
}
function Qr() {
}
var ji = null, _i = null;
function Ni(e, t) {
  return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
}
var Ci = typeof setTimeout == "function" ? setTimeout : void 0, jf = typeof clearTimeout == "function" ? clearTimeout : void 0, Ts = typeof Promise == "function" ? Promise : void 0, _f = typeof queueMicrotask == "function" ? queueMicrotask : typeof Ts < "u" ? function(e) {
  return Ts.resolve(null).then(e).catch(Nf);
} : Ci;
function Nf(e) {
  setTimeout(function() {
    throw e;
  });
}
function Hl(e, t) {
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
function at(e) {
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
function $s(e) {
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
var dn = Math.random().toString(36).slice(2), Ue = "__reactFiber$" + dn, Kn = "__reactProps$" + dn, Ge = "__reactContainer$" + dn, Ei = "__reactEvents$" + dn, Cf = "__reactListeners$" + dn, Ef = "__reactHandles$" + dn;
function St(e) {
  var t = e[Ue];
  if (t) return t;
  for (var n = e.parentNode; n; ) {
    if (t = n[Ge] || n[Ue]) {
      if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = $s(e); e !== null; ) {
        if (n = e[Ue]) return n;
        e = $s(e);
      }
      return t;
    }
    e = n, n = e.parentNode;
  }
  return null;
}
function lr(e) {
  return e = e[Ue] || e[Ge], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e;
}
function At(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(j(33));
}
function hl(e) {
  return e[Kn] || null;
}
var zi = [], Wt = -1;
function gt(e) {
  return { current: e };
}
function B(e) {
  0 > Wt || (e.current = zi[Wt], zi[Wt] = null, Wt--);
}
function I(e, t) {
  Wt++, zi[Wt] = e.current, e.current = t;
}
var ht = {}, oe = gt(ht), pe = gt(!1), zt = ht;
function nn(e, t) {
  var n = e.type.contextTypes;
  if (!n) return ht;
  var r = e.stateNode;
  if (r && r.__reactInternalMemoizedUnmaskedChildContext === t) return r.__reactInternalMemoizedMaskedChildContext;
  var l = {}, i;
  for (i in n) l[i] = t[i];
  return r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = t, e.__reactInternalMemoizedMaskedChildContext = l), l;
}
function he(e) {
  return e = e.childContextTypes, e != null;
}
function Kr() {
  B(pe), B(oe);
}
function Ls(e, t, n) {
  if (oe.current !== ht) throw Error(j(168));
  I(oe, t), I(pe, n);
}
function wu(e, t, n) {
  var r = e.stateNode;
  if (t = t.childContextTypes, typeof r.getChildContext != "function") return n;
  r = r.getChildContext();
  for (var l in r) if (!(l in t)) throw Error(j(108, cd(e) || "Unknown", l));
  return V({}, n, r);
}
function Gr(e) {
  return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || ht, zt = oe.current, I(oe, e), I(pe, pe.current), !0;
}
function Rs(e, t, n) {
  var r = e.stateNode;
  if (!r) throw Error(j(169));
  n ? (e = wu(e, t, zt), r.__reactInternalMemoizedMergedChildContext = e, B(pe), B(oe), I(oe, e)) : B(pe), I(pe, n);
}
var be = null, ml = !1, Ql = !1;
function ku(e) {
  be === null ? be = [e] : be.push(e);
}
function zf(e) {
  ml = !0, ku(e);
}
function vt() {
  if (!Ql && be !== null) {
    Ql = !0;
    var e = 0, t = D;
    try {
      var n = be;
      for (D = 1; e < n.length; e++) {
        var r = n[e];
        do
          r = r(!0);
        while (r !== null);
      }
      be = null, ml = !1;
    } catch (l) {
      throw be !== null && (be = be.slice(e + 1)), Qa(uo, vt), l;
    } finally {
      D = t, Ql = !1;
    }
  }
  return null;
}
var bt = [], Vt = 0, Yr = null, Xr = 0, Se = [], je = 0, Pt = null, Ve = 1, He = "";
function wt(e, t) {
  bt[Vt++] = Xr, bt[Vt++] = Yr, Yr = e, Xr = t;
}
function Su(e, t, n) {
  Se[je++] = Ve, Se[je++] = He, Se[je++] = Pt, Pt = e;
  var r = Ve;
  e = He;
  var l = 32 - Me(r) - 1;
  r &= ~(1 << l), n += 1;
  var i = 32 - Me(t) + l;
  if (30 < i) {
    var o = l - l % 5;
    i = (r & (1 << o) - 1).toString(32), r >>= o, l -= o, Ve = 1 << 32 - Me(t) + l | n << l | r, He = i + e;
  } else Ve = 1 << i | n << l | r, He = e;
}
function xo(e) {
  e.return !== null && (wt(e, 1), Su(e, 1, 0));
}
function wo(e) {
  for (; e === Yr; ) Yr = bt[--Vt], bt[Vt] = null, Xr = bt[--Vt], bt[Vt] = null;
  for (; e === Pt; ) Pt = Se[--je], Se[je] = null, He = Se[--je], Se[je] = null, Ve = Se[--je], Se[je] = null;
}
var ye = null, ve = null, A = !1, Re = null;
function ju(e, t) {
  var n = _e(5, null, null, 0);
  n.elementType = "DELETED", n.stateNode = t, n.return = e, t = e.deletions, t === null ? (e.deletions = [n], e.flags |= 16) : t.push(n);
}
function Ms(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t, t !== null ? (e.stateNode = t, ye = e, ve = at(t.firstChild), !0) : !1;
    case 6:
      return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t, t !== null ? (e.stateNode = t, ye = e, ve = null, !0) : !1;
    case 13:
      return t = t.nodeType !== 8 ? null : t, t !== null ? (n = Pt !== null ? { id: Ve, overflow: He } : null, e.memoizedState = { dehydrated: t, treeContext: n, retryLane: 1073741824 }, n = _e(18, null, null, 0), n.stateNode = t, n.return = e, e.child = n, ye = e, ve = null, !0) : !1;
    default:
      return !1;
  }
}
function Pi(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function Ti(e) {
  if (A) {
    var t = ve;
    if (t) {
      var n = t;
      if (!Ms(e, t)) {
        if (Pi(e)) throw Error(j(418));
        t = at(n.nextSibling);
        var r = ye;
        t && Ms(e, t) ? ju(r, n) : (e.flags = e.flags & -4097 | 2, A = !1, ye = e);
      }
    } else {
      if (Pi(e)) throw Error(j(418));
      e.flags = e.flags & -4097 | 2, A = !1, ye = e;
    }
  }
}
function Os(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; ) e = e.return;
  ye = e;
}
function wr(e) {
  if (e !== ye) return !1;
  if (!A) return Os(e), A = !0, !1;
  var t;
  if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !Ni(e.type, e.memoizedProps)), t && (t = ve)) {
    if (Pi(e)) throw _u(), Error(j(418));
    for (; t; ) ju(e, t), t = at(t.nextSibling);
  }
  if (Os(e), e.tag === 13) {
    if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(j(317));
    e: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === "/$") {
            if (t === 0) {
              ve = at(e.nextSibling);
              break e;
            }
            t--;
          } else n !== "$" && n !== "$!" && n !== "$?" || t++;
        }
        e = e.nextSibling;
      }
      ve = null;
    }
  } else ve = ye ? at(e.stateNode.nextSibling) : null;
  return !0;
}
function _u() {
  for (var e = ve; e; ) e = at(e.nextSibling);
}
function rn() {
  ve = ye = null, A = !1;
}
function ko(e) {
  Re === null ? Re = [e] : Re.push(e);
}
var Pf = Ze.ReactCurrentBatchConfig;
function wn(e, t, n) {
  if (e = n.ref, e !== null && typeof e != "function" && typeof e != "object") {
    if (n._owner) {
      if (n = n._owner, n) {
        if (n.tag !== 1) throw Error(j(309));
        var r = n.stateNode;
      }
      if (!r) throw Error(j(147, e));
      var l = r, i = "" + e;
      return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === i ? t.ref : (t = function(o) {
        var s = l.refs;
        o === null ? delete s[i] : s[i] = o;
      }, t._stringRef = i, t);
    }
    if (typeof e != "string") throw Error(j(284));
    if (!n._owner) throw Error(j(290, e));
  }
  return e;
}
function kr(e, t) {
  throw e = Object.prototype.toString.call(t), Error(j(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e));
}
function Ds(e) {
  var t = e._init;
  return t(e._payload);
}
function Nu(e) {
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
    return f = ft(f, d), f.index = 0, f.sibling = null, f;
  }
  function i(f, d, p) {
    return f.index = p, e ? (p = f.alternate, p !== null ? (p = p.index, p < d ? (f.flags |= 2, d) : p) : (f.flags |= 2, d)) : (f.flags |= 1048576, d);
  }
  function o(f) {
    return e && f.alternate === null && (f.flags |= 2), f;
  }
  function s(f, d, p, w) {
    return d === null || d.tag !== 6 ? (d = ql(p, f.mode, w), d.return = f, d) : (d = l(d, p), d.return = f, d);
  }
  function u(f, d, p, w) {
    var h = p.type;
    return h === Ft ? m(f, d, p.props.children, w, p.key) : d !== null && (d.elementType === h || typeof h == "object" && h !== null && h.$$typeof === qe && Ds(h) === d.type) ? (w = l(d, p.props), w.ref = wn(f, d, p), w.return = f, w) : (w = Fr(p.type, p.key, p.props, null, f.mode, w), w.ref = wn(f, d, p), w.return = f, w);
  }
  function c(f, d, p, w) {
    return d === null || d.tag !== 4 || d.stateNode.containerInfo !== p.containerInfo || d.stateNode.implementation !== p.implementation ? (d = ei(p, f.mode, w), d.return = f, d) : (d = l(d, p.children || []), d.return = f, d);
  }
  function m(f, d, p, w, h) {
    return d === null || d.tag !== 7 ? (d = Et(p, f.mode, w, h), d.return = f, d) : (d = l(d, p), d.return = f, d);
  }
  function v(f, d, p) {
    if (typeof d == "string" && d !== "" || typeof d == "number") return d = ql("" + d, f.mode, p), d.return = f, d;
    if (typeof d == "object" && d !== null) {
      switch (d.$$typeof) {
        case cr:
          return p = Fr(d.type, d.key, d.props, null, f.mode, p), p.ref = wn(f, null, d), p.return = f, p;
        case Dt:
          return d = ei(d, f.mode, p), d.return = f, d;
        case qe:
          var w = d._init;
          return v(f, w(d._payload), p);
      }
      if (_n(d) || mn(d)) return d = Et(d, f.mode, p, null), d.return = f, d;
      kr(f, d);
    }
    return null;
  }
  function g(f, d, p, w) {
    var h = d !== null ? d.key : null;
    if (typeof p == "string" && p !== "" || typeof p == "number") return h !== null ? null : s(f, d, "" + p, w);
    if (typeof p == "object" && p !== null) {
      switch (p.$$typeof) {
        case cr:
          return p.key === h ? u(f, d, p, w) : null;
        case Dt:
          return p.key === h ? c(f, d, p, w) : null;
        case qe:
          return h = p._init, g(
            f,
            d,
            h(p._payload),
            w
          );
      }
      if (_n(p) || mn(p)) return h !== null ? null : m(f, d, p, w, null);
      kr(f, p);
    }
    return null;
  }
  function y(f, d, p, w, h) {
    if (typeof w == "string" && w !== "" || typeof w == "number") return f = f.get(p) || null, s(d, f, "" + w, h);
    if (typeof w == "object" && w !== null) {
      switch (w.$$typeof) {
        case cr:
          return f = f.get(w.key === null ? p : w.key) || null, u(d, f, w, h);
        case Dt:
          return f = f.get(w.key === null ? p : w.key) || null, c(d, f, w, h);
        case qe:
          var k = w._init;
          return y(f, d, p, k(w._payload), h);
      }
      if (_n(w) || mn(w)) return f = f.get(p) || null, m(d, f, w, h, null);
      kr(d, w);
    }
    return null;
  }
  function x(f, d, p, w) {
    for (var h = null, k = null, _ = d, C = d = 0, F = null; _ !== null && C < p.length; C++) {
      _.index > C ? (F = _, _ = null) : F = _.sibling;
      var T = g(f, _, p[C], w);
      if (T === null) {
        _ === null && (_ = F);
        break;
      }
      e && _ && T.alternate === null && t(f, _), d = i(T, d, C), k === null ? h = T : k.sibling = T, k = T, _ = F;
    }
    if (C === p.length) return n(f, _), A && wt(f, C), h;
    if (_ === null) {
      for (; C < p.length; C++) _ = v(f, p[C], w), _ !== null && (d = i(_, d, C), k === null ? h = _ : k.sibling = _, k = _);
      return A && wt(f, C), h;
    }
    for (_ = r(f, _); C < p.length; C++) F = y(_, f, C, p[C], w), F !== null && (e && F.alternate !== null && _.delete(F.key === null ? C : F.key), d = i(F, d, C), k === null ? h = F : k.sibling = F, k = F);
    return e && _.forEach(function(Pe) {
      return t(f, Pe);
    }), A && wt(f, C), h;
  }
  function S(f, d, p, w) {
    var h = mn(p);
    if (typeof h != "function") throw Error(j(150));
    if (p = h.call(p), p == null) throw Error(j(151));
    for (var k = h = null, _ = d, C = d = 0, F = null, T = p.next(); _ !== null && !T.done; C++, T = p.next()) {
      _.index > C ? (F = _, _ = null) : F = _.sibling;
      var Pe = g(f, _, T.value, w);
      if (Pe === null) {
        _ === null && (_ = F);
        break;
      }
      e && _ && Pe.alternate === null && t(f, _), d = i(Pe, d, C), k === null ? h = Pe : k.sibling = Pe, k = Pe, _ = F;
    }
    if (T.done) return n(
      f,
      _
    ), A && wt(f, C), h;
    if (_ === null) {
      for (; !T.done; C++, T = p.next()) T = v(f, T.value, w), T !== null && (d = i(T, d, C), k === null ? h = T : k.sibling = T, k = T);
      return A && wt(f, C), h;
    }
    for (_ = r(f, _); !T.done; C++, T = p.next()) T = y(_, f, C, T.value, w), T !== null && (e && T.alternate !== null && _.delete(T.key === null ? C : T.key), d = i(T, d, C), k === null ? h = T : k.sibling = T, k = T);
    return e && _.forEach(function(fn) {
      return t(f, fn);
    }), A && wt(f, C), h;
  }
  function N(f, d, p, w) {
    if (typeof p == "object" && p !== null && p.type === Ft && p.key === null && (p = p.props.children), typeof p == "object" && p !== null) {
      switch (p.$$typeof) {
        case cr:
          e: {
            for (var h = p.key, k = d; k !== null; ) {
              if (k.key === h) {
                if (h = p.type, h === Ft) {
                  if (k.tag === 7) {
                    n(f, k.sibling), d = l(k, p.props.children), d.return = f, f = d;
                    break e;
                  }
                } else if (k.elementType === h || typeof h == "object" && h !== null && h.$$typeof === qe && Ds(h) === k.type) {
                  n(f, k.sibling), d = l(k, p.props), d.ref = wn(f, k, p), d.return = f, f = d;
                  break e;
                }
                n(f, k);
                break;
              } else t(f, k);
              k = k.sibling;
            }
            p.type === Ft ? (d = Et(p.props.children, f.mode, w, p.key), d.return = f, f = d) : (w = Fr(p.type, p.key, p.props, null, f.mode, w), w.ref = wn(f, d, p), w.return = f, f = w);
          }
          return o(f);
        case Dt:
          e: {
            for (k = p.key; d !== null; ) {
              if (d.key === k) if (d.tag === 4 && d.stateNode.containerInfo === p.containerInfo && d.stateNode.implementation === p.implementation) {
                n(f, d.sibling), d = l(d, p.children || []), d.return = f, f = d;
                break e;
              } else {
                n(f, d);
                break;
              }
              else t(f, d);
              d = d.sibling;
            }
            d = ei(p, f.mode, w), d.return = f, f = d;
          }
          return o(f);
        case qe:
          return k = p._init, N(f, d, k(p._payload), w);
      }
      if (_n(p)) return x(f, d, p, w);
      if (mn(p)) return S(f, d, p, w);
      kr(f, p);
    }
    return typeof p == "string" && p !== "" || typeof p == "number" ? (p = "" + p, d !== null && d.tag === 6 ? (n(f, d.sibling), d = l(d, p), d.return = f, f = d) : (n(f, d), d = ql(p, f.mode, w), d.return = f, f = d), o(f)) : n(f, d);
  }
  return N;
}
var ln = Nu(!0), Cu = Nu(!1), Zr = gt(null), Jr = null, Ht = null, So = null;
function jo() {
  So = Ht = Jr = null;
}
function _o(e) {
  var t = Zr.current;
  B(Zr), e._currentValue = t;
}
function $i(e, t, n) {
  for (; e !== null; ) {
    var r = e.alternate;
    if ((e.childLanes & t) !== t ? (e.childLanes |= t, r !== null && (r.childLanes |= t)) : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t), e === n) break;
    e = e.return;
  }
}
function qt(e, t) {
  Jr = e, So = Ht = null, e = e.dependencies, e !== null && e.firstContext !== null && (e.lanes & t && (fe = !0), e.firstContext = null);
}
function Ee(e) {
  var t = e._currentValue;
  if (So !== e) if (e = { context: e, memoizedValue: t, next: null }, Ht === null) {
    if (Jr === null) throw Error(j(308));
    Ht = e, Jr.dependencies = { lanes: 0, firstContext: e };
  } else Ht = Ht.next = e;
  return t;
}
var jt = null;
function No(e) {
  jt === null ? jt = [e] : jt.push(e);
}
function Eu(e, t, n, r) {
  var l = t.interleaved;
  return l === null ? (n.next = n, No(t)) : (n.next = l.next, l.next = n), t.interleaved = n, Ye(e, r);
}
function Ye(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; ) e.childLanes |= t, n = e.alternate, n !== null && (n.childLanes |= t), n = e, e = e.return;
  return n.tag === 3 ? n.stateNode : null;
}
var et = !1;
function Co(e) {
  e.updateQueue = { baseState: e.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
}
function zu(e, t) {
  e = e.updateQueue, t.updateQueue === e && (t.updateQueue = { baseState: e.baseState, firstBaseUpdate: e.firstBaseUpdate, lastBaseUpdate: e.lastBaseUpdate, shared: e.shared, effects: e.effects });
}
function Qe(e, t) {
  return { eventTime: e, lane: t, tag: 0, payload: null, callback: null, next: null };
}
function ut(e, t, n) {
  var r = e.updateQueue;
  if (r === null) return null;
  if (r = r.shared, M & 2) {
    var l = r.pending;
    return l === null ? t.next = t : (t.next = l.next, l.next = t), r.pending = t, Ye(e, n);
  }
  return l = r.interleaved, l === null ? (t.next = t, No(r)) : (t.next = l.next, l.next = t), r.interleaved = t, Ye(e, n);
}
function $r(e, t, n) {
  if (t = t.updateQueue, t !== null && (t = t.shared, (n & 4194240) !== 0)) {
    var r = t.lanes;
    r &= e.pendingLanes, n |= r, t.lanes = n, co(e, n);
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
function qr(e, t, n, r) {
  var l = e.updateQueue;
  et = !1;
  var i = l.firstBaseUpdate, o = l.lastBaseUpdate, s = l.shared.pending;
  if (s !== null) {
    l.shared.pending = null;
    var u = s, c = u.next;
    u.next = null, o === null ? i = c : o.next = c, o = u;
    var m = e.alternate;
    m !== null && (m = m.updateQueue, s = m.lastBaseUpdate, s !== o && (s === null ? m.firstBaseUpdate = c : s.next = c, m.lastBaseUpdate = u));
  }
  if (i !== null) {
    var v = l.baseState;
    o = 0, m = c = u = null, s = i;
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
          var x = e, S = s;
          switch (g = t, y = n, S.tag) {
            case 1:
              if (x = S.payload, typeof x == "function") {
                v = x.call(y, v, g);
                break e;
              }
              v = x;
              break e;
            case 3:
              x.flags = x.flags & -65537 | 128;
            case 0:
              if (x = S.payload, g = typeof x == "function" ? x.call(y, v, g) : x, g == null) break e;
              v = V({}, v, g);
              break e;
            case 2:
              et = !0;
          }
        }
        s.callback !== null && s.lane !== 0 && (e.flags |= 64, g = l.effects, g === null ? l.effects = [s] : g.push(s));
      } else y = { eventTime: y, lane: g, tag: s.tag, payload: s.payload, callback: s.callback, next: null }, m === null ? (c = m = y, u = v) : m = m.next = y, o |= g;
      if (s = s.next, s === null) {
        if (s = l.shared.pending, s === null) break;
        g = s, s = g.next, g.next = null, l.lastBaseUpdate = g, l.shared.pending = null;
      }
    } while (!0);
    if (m === null && (u = v), l.baseState = u, l.firstBaseUpdate = c, l.lastBaseUpdate = m, t = l.shared.interleaved, t !== null) {
      l = t;
      do
        o |= l.lane, l = l.next;
      while (l !== t);
    } else i === null && (l.shared.lanes = 0);
    $t |= o, e.lanes = o, e.memoizedState = v;
  }
}
function Is(e, t, n) {
  if (e = t.effects, t.effects = null, e !== null) for (t = 0; t < e.length; t++) {
    var r = e[t], l = r.callback;
    if (l !== null) {
      if (r.callback = null, r = n, typeof l != "function") throw Error(j(191, l));
      l.call(r);
    }
  }
}
var ir = {}, Ae = gt(ir), Gn = gt(ir), Yn = gt(ir);
function _t(e) {
  if (e === ir) throw Error(j(174));
  return e;
}
function Eo(e, t) {
  switch (I(Yn, t), I(Gn, e), I(Ae, ir), e = t.nodeType, e) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : di(null, "");
      break;
    default:
      e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = di(t, e);
  }
  B(Ae), I(Ae, t);
}
function on() {
  B(Ae), B(Gn), B(Yn);
}
function Pu(e) {
  _t(Yn.current);
  var t = _t(Ae.current), n = di(t, e.type);
  t !== n && (I(Gn, e), I(Ae, n));
}
function zo(e) {
  Gn.current === e && (B(Ae), B(Gn));
}
var W = gt(0);
function el(e) {
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
var Kl = [];
function Po() {
  for (var e = 0; e < Kl.length; e++) Kl[e]._workInProgressVersionPrimary = null;
  Kl.length = 0;
}
var Lr = Ze.ReactCurrentDispatcher, Gl = Ze.ReactCurrentBatchConfig, Tt = 0, b = null, Y = null, J = null, tl = !1, Ln = !1, Xn = 0, Tf = 0;
function re() {
  throw Error(j(321));
}
function To(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++) if (!De(e[n], t[n])) return !1;
  return !0;
}
function $o(e, t, n, r, l, i) {
  if (Tt = i, b = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, Lr.current = e === null || e.memoizedState === null ? Mf : Of, e = n(r, l), Ln) {
    i = 0;
    do {
      if (Ln = !1, Xn = 0, 25 <= i) throw Error(j(301));
      i += 1, J = Y = null, t.updateQueue = null, Lr.current = Df, e = n(r, l);
    } while (Ln);
  }
  if (Lr.current = nl, t = Y !== null && Y.next !== null, Tt = 0, J = Y = b = null, tl = !1, t) throw Error(j(300));
  return e;
}
function Lo() {
  var e = Xn !== 0;
  return Xn = 0, e;
}
function Ie() {
  var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
  return J === null ? b.memoizedState = J = e : J = J.next = e, J;
}
function ze() {
  if (Y === null) {
    var e = b.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = Y.next;
  var t = J === null ? b.memoizedState : J.next;
  if (t !== null) J = t, Y = e;
  else {
    if (e === null) throw Error(j(310));
    Y = e, e = { memoizedState: Y.memoizedState, baseState: Y.baseState, baseQueue: Y.baseQueue, queue: Y.queue, next: null }, J === null ? b.memoizedState = J = e : J = J.next = e;
  }
  return J;
}
function Zn(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function Yl(e) {
  var t = ze(), n = t.queue;
  if (n === null) throw Error(j(311));
  n.lastRenderedReducer = e;
  var r = Y, l = r.baseQueue, i = n.pending;
  if (i !== null) {
    if (l !== null) {
      var o = l.next;
      l.next = i.next, i.next = o;
    }
    r.baseQueue = l = i, n.pending = null;
  }
  if (l !== null) {
    i = l.next, r = r.baseState;
    var s = o = null, u = null, c = i;
    do {
      var m = c.lane;
      if ((Tt & m) === m) u !== null && (u = u.next = { lane: 0, action: c.action, hasEagerState: c.hasEagerState, eagerState: c.eagerState, next: null }), r = c.hasEagerState ? c.eagerState : e(r, c.action);
      else {
        var v = {
          lane: m,
          action: c.action,
          hasEagerState: c.hasEagerState,
          eagerState: c.eagerState,
          next: null
        };
        u === null ? (s = u = v, o = r) : u = u.next = v, b.lanes |= m, $t |= m;
      }
      c = c.next;
    } while (c !== null && c !== i);
    u === null ? o = r : u.next = s, De(r, t.memoizedState) || (fe = !0), t.memoizedState = r, t.baseState = o, t.baseQueue = u, n.lastRenderedState = r;
  }
  if (e = n.interleaved, e !== null) {
    l = e;
    do
      i = l.lane, b.lanes |= i, $t |= i, l = l.next;
    while (l !== e);
  } else l === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function Xl(e) {
  var t = ze(), n = t.queue;
  if (n === null) throw Error(j(311));
  n.lastRenderedReducer = e;
  var r = n.dispatch, l = n.pending, i = t.memoizedState;
  if (l !== null) {
    n.pending = null;
    var o = l = l.next;
    do
      i = e(i, o.action), o = o.next;
    while (o !== l);
    De(i, t.memoizedState) || (fe = !0), t.memoizedState = i, t.baseQueue === null && (t.baseState = i), n.lastRenderedState = i;
  }
  return [i, r];
}
function Tu() {
}
function $u(e, t) {
  var n = b, r = ze(), l = t(), i = !De(r.memoizedState, l);
  if (i && (r.memoizedState = l, fe = !0), r = r.queue, Ro(Mu.bind(null, n, r, e), [e]), r.getSnapshot !== t || i || J !== null && J.memoizedState.tag & 1) {
    if (n.flags |= 2048, Jn(9, Ru.bind(null, n, r, l, t), void 0, null), q === null) throw Error(j(349));
    Tt & 30 || Lu(n, t, l);
  }
  return l;
}
function Lu(e, t, n) {
  e.flags |= 16384, e = { getSnapshot: t, value: n }, t = b.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, b.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
}
function Ru(e, t, n, r) {
  t.value = n, t.getSnapshot = r, Ou(t) && Du(e);
}
function Mu(e, t, n) {
  return n(function() {
    Ou(t) && Du(e);
  });
}
function Ou(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !De(e, n);
  } catch {
    return !0;
  }
}
function Du(e) {
  var t = Ye(e, 1);
  t !== null && Oe(t, e, 1, -1);
}
function Us(e) {
  var t = Ie();
  return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: Zn, lastRenderedState: e }, t.queue = e, e = e.dispatch = Rf.bind(null, b, e), [t.memoizedState, e];
}
function Jn(e, t, n, r) {
  return e = { tag: e, create: t, destroy: n, deps: r, next: null }, t = b.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, b.updateQueue = t, t.lastEffect = e.next = e) : (n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e)), e;
}
function Fu() {
  return ze().memoizedState;
}
function Rr(e, t, n, r) {
  var l = Ie();
  b.flags |= e, l.memoizedState = Jn(1 | t, n, void 0, r === void 0 ? null : r);
}
function gl(e, t, n, r) {
  var l = ze();
  r = r === void 0 ? null : r;
  var i = void 0;
  if (Y !== null) {
    var o = Y.memoizedState;
    if (i = o.destroy, r !== null && To(r, o.deps)) {
      l.memoizedState = Jn(t, n, i, r);
      return;
    }
  }
  b.flags |= e, l.memoizedState = Jn(1 | t, n, i, r);
}
function Bs(e, t) {
  return Rr(8390656, 8, e, t);
}
function Ro(e, t) {
  return gl(2048, 8, e, t);
}
function Iu(e, t) {
  return gl(4, 2, e, t);
}
function Uu(e, t) {
  return gl(4, 4, e, t);
}
function Bu(e, t) {
  if (typeof t == "function") return e = e(), t(e), function() {
    t(null);
  };
  if (t != null) return e = e(), t.current = e, function() {
    t.current = null;
  };
}
function Au(e, t, n) {
  return n = n != null ? n.concat([e]) : null, gl(4, 4, Bu.bind(null, t, e), n);
}
function Mo() {
}
function Wu(e, t) {
  var n = ze();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && To(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
}
function bu(e, t) {
  var n = ze();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && To(t, r[1]) ? r[0] : (e = e(), n.memoizedState = [e, t], e);
}
function Vu(e, t, n) {
  return Tt & 21 ? (De(n, t) || (n = Ya(), b.lanes |= n, $t |= n, e.baseState = !0), t) : (e.baseState && (e.baseState = !1, fe = !0), e.memoizedState = n);
}
function $f(e, t) {
  var n = D;
  D = n !== 0 && 4 > n ? n : 4, e(!0);
  var r = Gl.transition;
  Gl.transition = {};
  try {
    e(!1), t();
  } finally {
    D = n, Gl.transition = r;
  }
}
function Hu() {
  return ze().memoizedState;
}
function Lf(e, t, n) {
  var r = dt(e);
  if (n = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null }, Qu(e)) Ku(t, n);
  else if (n = Eu(e, t, n, r), n !== null) {
    var l = ae();
    Oe(n, e, r, l), Gu(n, t, r);
  }
}
function Rf(e, t, n) {
  var r = dt(e), l = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (Qu(e)) Ku(t, l);
  else {
    var i = e.alternate;
    if (e.lanes === 0 && (i === null || i.lanes === 0) && (i = t.lastRenderedReducer, i !== null)) try {
      var o = t.lastRenderedState, s = i(o, n);
      if (l.hasEagerState = !0, l.eagerState = s, De(s, o)) {
        var u = t.interleaved;
        u === null ? (l.next = l, No(t)) : (l.next = u.next, u.next = l), t.interleaved = l;
        return;
      }
    } catch {
    } finally {
    }
    n = Eu(e, t, l, r), n !== null && (l = ae(), Oe(n, e, r, l), Gu(n, t, r));
  }
}
function Qu(e) {
  var t = e.alternate;
  return e === b || t !== null && t === b;
}
function Ku(e, t) {
  Ln = tl = !0;
  var n = e.pending;
  n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
}
function Gu(e, t, n) {
  if (n & 4194240) {
    var r = t.lanes;
    r &= e.pendingLanes, n |= r, t.lanes = n, co(e, n);
  }
}
var nl = { readContext: Ee, useCallback: re, useContext: re, useEffect: re, useImperativeHandle: re, useInsertionEffect: re, useLayoutEffect: re, useMemo: re, useReducer: re, useRef: re, useState: re, useDebugValue: re, useDeferredValue: re, useTransition: re, useMutableSource: re, useSyncExternalStore: re, useId: re, unstable_isNewReconciler: !1 }, Mf = { readContext: Ee, useCallback: function(e, t) {
  return Ie().memoizedState = [e, t === void 0 ? null : t], e;
}, useContext: Ee, useEffect: Bs, useImperativeHandle: function(e, t, n) {
  return n = n != null ? n.concat([e]) : null, Rr(
    4194308,
    4,
    Bu.bind(null, t, e),
    n
  );
}, useLayoutEffect: function(e, t) {
  return Rr(4194308, 4, e, t);
}, useInsertionEffect: function(e, t) {
  return Rr(4, 2, e, t);
}, useMemo: function(e, t) {
  var n = Ie();
  return t = t === void 0 ? null : t, e = e(), n.memoizedState = [e, t], e;
}, useReducer: function(e, t, n) {
  var r = Ie();
  return t = n !== void 0 ? n(t) : t, r.memoizedState = r.baseState = t, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: t }, r.queue = e, e = e.dispatch = Lf.bind(null, b, e), [r.memoizedState, e];
}, useRef: function(e) {
  var t = Ie();
  return e = { current: e }, t.memoizedState = e;
}, useState: Us, useDebugValue: Mo, useDeferredValue: function(e) {
  return Ie().memoizedState = e;
}, useTransition: function() {
  var e = Us(!1), t = e[0];
  return e = $f.bind(null, e[1]), Ie().memoizedState = e, [t, e];
}, useMutableSource: function() {
}, useSyncExternalStore: function(e, t, n) {
  var r = b, l = Ie();
  if (A) {
    if (n === void 0) throw Error(j(407));
    n = n();
  } else {
    if (n = t(), q === null) throw Error(j(349));
    Tt & 30 || Lu(r, t, n);
  }
  l.memoizedState = n;
  var i = { value: n, getSnapshot: t };
  return l.queue = i, Bs(Mu.bind(
    null,
    r,
    i,
    e
  ), [e]), r.flags |= 2048, Jn(9, Ru.bind(null, r, i, n, t), void 0, null), n;
}, useId: function() {
  var e = Ie(), t = q.identifierPrefix;
  if (A) {
    var n = He, r = Ve;
    n = (r & ~(1 << 32 - Me(r) - 1)).toString(32) + n, t = ":" + t + "R" + n, n = Xn++, 0 < n && (t += "H" + n.toString(32)), t += ":";
  } else n = Tf++, t = ":" + t + "r" + n.toString(32) + ":";
  return e.memoizedState = t;
}, unstable_isNewReconciler: !1 }, Of = {
  readContext: Ee,
  useCallback: Wu,
  useContext: Ee,
  useEffect: Ro,
  useImperativeHandle: Au,
  useInsertionEffect: Iu,
  useLayoutEffect: Uu,
  useMemo: bu,
  useReducer: Yl,
  useRef: Fu,
  useState: function() {
    return Yl(Zn);
  },
  useDebugValue: Mo,
  useDeferredValue: function(e) {
    var t = ze();
    return Vu(t, Y.memoizedState, e);
  },
  useTransition: function() {
    var e = Yl(Zn)[0], t = ze().memoizedState;
    return [e, t];
  },
  useMutableSource: Tu,
  useSyncExternalStore: $u,
  useId: Hu,
  unstable_isNewReconciler: !1
}, Df = { readContext: Ee, useCallback: Wu, useContext: Ee, useEffect: Ro, useImperativeHandle: Au, useInsertionEffect: Iu, useLayoutEffect: Uu, useMemo: bu, useReducer: Xl, useRef: Fu, useState: function() {
  return Xl(Zn);
}, useDebugValue: Mo, useDeferredValue: function(e) {
  var t = ze();
  return Y === null ? t.memoizedState = e : Vu(t, Y.memoizedState, e);
}, useTransition: function() {
  var e = Xl(Zn)[0], t = ze().memoizedState;
  return [e, t];
}, useMutableSource: Tu, useSyncExternalStore: $u, useId: Hu, unstable_isNewReconciler: !1 };
function $e(e, t) {
  if (e && e.defaultProps) {
    t = V({}, t), e = e.defaultProps;
    for (var n in e) t[n] === void 0 && (t[n] = e[n]);
    return t;
  }
  return t;
}
function Li(e, t, n, r) {
  t = e.memoizedState, n = n(r, t), n = n == null ? t : V({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
}
var vl = { isMounted: function(e) {
  return (e = e._reactInternals) ? Mt(e) === e : !1;
}, enqueueSetState: function(e, t, n) {
  e = e._reactInternals;
  var r = ae(), l = dt(e), i = Qe(r, l);
  i.payload = t, n != null && (i.callback = n), t = ut(e, i, l), t !== null && (Oe(t, e, l, r), $r(t, e, l));
}, enqueueReplaceState: function(e, t, n) {
  e = e._reactInternals;
  var r = ae(), l = dt(e), i = Qe(r, l);
  i.tag = 1, i.payload = t, n != null && (i.callback = n), t = ut(e, i, l), t !== null && (Oe(t, e, l, r), $r(t, e, l));
}, enqueueForceUpdate: function(e, t) {
  e = e._reactInternals;
  var n = ae(), r = dt(e), l = Qe(n, r);
  l.tag = 2, t != null && (l.callback = t), t = ut(e, l, r), t !== null && (Oe(t, e, r, n), $r(t, e, r));
} };
function As(e, t, n, r, l, i, o) {
  return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, i, o) : t.prototype && t.prototype.isPureReactComponent ? !Vn(n, r) || !Vn(l, i) : !0;
}
function Yu(e, t, n) {
  var r = !1, l = ht, i = t.contextType;
  return typeof i == "object" && i !== null ? i = Ee(i) : (l = he(t) ? zt : oe.current, r = t.contextTypes, i = (r = r != null) ? nn(e, l) : ht), t = new t(n, i), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = vl, e.stateNode = t, t._reactInternals = e, r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = l, e.__reactInternalMemoizedMaskedChildContext = i), t;
}
function Ws(e, t, n, r) {
  e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && vl.enqueueReplaceState(t, t.state, null);
}
function Ri(e, t, n, r) {
  var l = e.stateNode;
  l.props = n, l.state = e.memoizedState, l.refs = {}, Co(e);
  var i = t.contextType;
  typeof i == "object" && i !== null ? l.context = Ee(i) : (i = he(t) ? zt : oe.current, l.context = nn(e, i)), l.state = e.memoizedState, i = t.getDerivedStateFromProps, typeof i == "function" && (Li(e, t, i, n), l.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof l.getSnapshotBeforeUpdate == "function" || typeof l.UNSAFE_componentWillMount != "function" && typeof l.componentWillMount != "function" || (t = l.state, typeof l.componentWillMount == "function" && l.componentWillMount(), typeof l.UNSAFE_componentWillMount == "function" && l.UNSAFE_componentWillMount(), t !== l.state && vl.enqueueReplaceState(l, l.state, null), qr(e, n, l, r), l.state = e.memoizedState), typeof l.componentDidMount == "function" && (e.flags |= 4194308);
}
function sn(e, t) {
  try {
    var n = "", r = t;
    do
      n += ud(r), r = r.return;
    while (r);
    var l = n;
  } catch (i) {
    l = `
Error generating stack: ` + i.message + `
` + i.stack;
  }
  return { value: e, source: t, stack: l, digest: null };
}
function Zl(e, t, n) {
  return { value: e, source: null, stack: n ?? null, digest: t ?? null };
}
function Mi(e, t) {
  try {
    console.error(t.value);
  } catch (n) {
    setTimeout(function() {
      throw n;
    });
  }
}
var Ff = typeof WeakMap == "function" ? WeakMap : Map;
function Xu(e, t, n) {
  n = Qe(-1, n), n.tag = 3, n.payload = { element: null };
  var r = t.value;
  return n.callback = function() {
    ll || (ll = !0, Vi = r), Mi(e, t);
  }, n;
}
function Zu(e, t, n) {
  n = Qe(-1, n), n.tag = 3;
  var r = e.type.getDerivedStateFromError;
  if (typeof r == "function") {
    var l = t.value;
    n.payload = function() {
      return r(l);
    }, n.callback = function() {
      Mi(e, t);
    };
  }
  var i = e.stateNode;
  return i !== null && typeof i.componentDidCatch == "function" && (n.callback = function() {
    Mi(e, t), typeof r != "function" && (ct === null ? ct = /* @__PURE__ */ new Set([this]) : ct.add(this));
    var o = t.stack;
    this.componentDidCatch(t.value, { componentStack: o !== null ? o : "" });
  }), n;
}
function bs(e, t, n) {
  var r = e.pingCache;
  if (r === null) {
    r = e.pingCache = new Ff();
    var l = /* @__PURE__ */ new Set();
    r.set(t, l);
  } else l = r.get(t), l === void 0 && (l = /* @__PURE__ */ new Set(), r.set(t, l));
  l.has(n) || (l.add(n), e = Zf.bind(null, e, t, n), t.then(e, e));
}
function Vs(e) {
  do {
    var t;
    if ((t = e.tag === 13) && (t = e.memoizedState, t = t !== null ? t.dehydrated !== null : !0), t) return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function Hs(e, t, n, r, l) {
  return e.mode & 1 ? (e.flags |= 65536, e.lanes = l, e) : (e === t ? e.flags |= 65536 : (e.flags |= 128, n.flags |= 131072, n.flags &= -52805, n.tag === 1 && (n.alternate === null ? n.tag = 17 : (t = Qe(-1, 1), t.tag = 2, ut(n, t, 1))), n.lanes |= 1), e);
}
var If = Ze.ReactCurrentOwner, fe = !1;
function se(e, t, n, r) {
  t.child = e === null ? Cu(t, null, n, r) : ln(t, e.child, n, r);
}
function Qs(e, t, n, r, l) {
  n = n.render;
  var i = t.ref;
  return qt(t, l), r = $o(e, t, n, r, i, l), n = Lo(), e !== null && !fe ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, Xe(e, t, l)) : (A && n && xo(t), t.flags |= 1, se(e, t, r, l), t.child);
}
function Ks(e, t, n, r, l) {
  if (e === null) {
    var i = n.type;
    return typeof i == "function" && !Wo(i) && i.defaultProps === void 0 && n.compare === null && n.defaultProps === void 0 ? (t.tag = 15, t.type = i, Ju(e, t, i, r, l)) : (e = Fr(n.type, null, r, t, t.mode, l), e.ref = t.ref, e.return = t, t.child = e);
  }
  if (i = e.child, !(e.lanes & l)) {
    var o = i.memoizedProps;
    if (n = n.compare, n = n !== null ? n : Vn, n(o, r) && e.ref === t.ref) return Xe(e, t, l);
  }
  return t.flags |= 1, e = ft(i, r), e.ref = t.ref, e.return = t, t.child = e;
}
function Ju(e, t, n, r, l) {
  if (e !== null) {
    var i = e.memoizedProps;
    if (Vn(i, r) && e.ref === t.ref) if (fe = !1, t.pendingProps = r = i, (e.lanes & l) !== 0) e.flags & 131072 && (fe = !0);
    else return t.lanes = e.lanes, Xe(e, t, l);
  }
  return Oi(e, t, n, r, l);
}
function qu(e, t, n) {
  var r = t.pendingProps, l = r.children, i = e !== null ? e.memoizedState : null;
  if (r.mode === "hidden") if (!(t.mode & 1)) t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, I(Kt, ge), ge |= n;
  else {
    if (!(n & 1073741824)) return e = i !== null ? i.baseLanes | n : n, t.lanes = t.childLanes = 1073741824, t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }, t.updateQueue = null, I(Kt, ge), ge |= e, null;
    t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, r = i !== null ? i.baseLanes : n, I(Kt, ge), ge |= r;
  }
  else i !== null ? (r = i.baseLanes | n, t.memoizedState = null) : r = n, I(Kt, ge), ge |= r;
  return se(e, t, l, n), t.child;
}
function ec(e, t) {
  var n = t.ref;
  (e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= 512, t.flags |= 2097152);
}
function Oi(e, t, n, r, l) {
  var i = he(n) ? zt : oe.current;
  return i = nn(t, i), qt(t, l), n = $o(e, t, n, r, i, l), r = Lo(), e !== null && !fe ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, Xe(e, t, l)) : (A && r && xo(t), t.flags |= 1, se(e, t, n, l), t.child);
}
function Gs(e, t, n, r, l) {
  if (he(n)) {
    var i = !0;
    Gr(t);
  } else i = !1;
  if (qt(t, l), t.stateNode === null) Mr(e, t), Yu(t, n, r), Ri(t, n, r, l), r = !0;
  else if (e === null) {
    var o = t.stateNode, s = t.memoizedProps;
    o.props = s;
    var u = o.context, c = n.contextType;
    typeof c == "object" && c !== null ? c = Ee(c) : (c = he(n) ? zt : oe.current, c = nn(t, c));
    var m = n.getDerivedStateFromProps, v = typeof m == "function" || typeof o.getSnapshotBeforeUpdate == "function";
    v || typeof o.UNSAFE_componentWillReceiveProps != "function" && typeof o.componentWillReceiveProps != "function" || (s !== r || u !== c) && Ws(t, o, r, c), et = !1;
    var g = t.memoizedState;
    o.state = g, qr(t, r, o, l), u = t.memoizedState, s !== r || g !== u || pe.current || et ? (typeof m == "function" && (Li(t, n, m, r), u = t.memoizedState), (s = et || As(t, n, s, r, g, u, c)) ? (v || typeof o.UNSAFE_componentWillMount != "function" && typeof o.componentWillMount != "function" || (typeof o.componentWillMount == "function" && o.componentWillMount(), typeof o.UNSAFE_componentWillMount == "function" && o.UNSAFE_componentWillMount()), typeof o.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof o.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = u), o.props = r, o.state = u, o.context = c, r = s) : (typeof o.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
  } else {
    o = t.stateNode, zu(e, t), s = t.memoizedProps, c = t.type === t.elementType ? s : $e(t.type, s), o.props = c, v = t.pendingProps, g = o.context, u = n.contextType, typeof u == "object" && u !== null ? u = Ee(u) : (u = he(n) ? zt : oe.current, u = nn(t, u));
    var y = n.getDerivedStateFromProps;
    (m = typeof y == "function" || typeof o.getSnapshotBeforeUpdate == "function") || typeof o.UNSAFE_componentWillReceiveProps != "function" && typeof o.componentWillReceiveProps != "function" || (s !== v || g !== u) && Ws(t, o, r, u), et = !1, g = t.memoizedState, o.state = g, qr(t, r, o, l);
    var x = t.memoizedState;
    s !== v || g !== x || pe.current || et ? (typeof y == "function" && (Li(t, n, y, r), x = t.memoizedState), (c = et || As(t, n, c, r, g, x, u) || !1) ? (m || typeof o.UNSAFE_componentWillUpdate != "function" && typeof o.componentWillUpdate != "function" || (typeof o.componentWillUpdate == "function" && o.componentWillUpdate(r, x, u), typeof o.UNSAFE_componentWillUpdate == "function" && o.UNSAFE_componentWillUpdate(r, x, u)), typeof o.componentDidUpdate == "function" && (t.flags |= 4), typeof o.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof o.componentDidUpdate != "function" || s === e.memoizedProps && g === e.memoizedState || (t.flags |= 4), typeof o.getSnapshotBeforeUpdate != "function" || s === e.memoizedProps && g === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = x), o.props = r, o.state = x, o.context = u, r = c) : (typeof o.componentDidUpdate != "function" || s === e.memoizedProps && g === e.memoizedState || (t.flags |= 4), typeof o.getSnapshotBeforeUpdate != "function" || s === e.memoizedProps && g === e.memoizedState || (t.flags |= 1024), r = !1);
  }
  return Di(e, t, n, r, i, l);
}
function Di(e, t, n, r, l, i) {
  ec(e, t);
  var o = (t.flags & 128) !== 0;
  if (!r && !o) return l && Rs(t, n, !1), Xe(e, t, i);
  r = t.stateNode, If.current = t;
  var s = o && typeof n.getDerivedStateFromError != "function" ? null : r.render();
  return t.flags |= 1, e !== null && o ? (t.child = ln(t, e.child, null, i), t.child = ln(t, null, s, i)) : se(e, t, s, i), t.memoizedState = r.state, l && Rs(t, n, !0), t.child;
}
function tc(e) {
  var t = e.stateNode;
  t.pendingContext ? Ls(e, t.pendingContext, t.pendingContext !== t.context) : t.context && Ls(e, t.context, !1), Eo(e, t.containerInfo);
}
function Ys(e, t, n, r, l) {
  return rn(), ko(l), t.flags |= 256, se(e, t, n, r), t.child;
}
var Fi = { dehydrated: null, treeContext: null, retryLane: 0 };
function Ii(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function nc(e, t, n) {
  var r = t.pendingProps, l = W.current, i = !1, o = (t.flags & 128) !== 0, s;
  if ((s = o) || (s = e !== null && e.memoizedState === null ? !1 : (l & 2) !== 0), s ? (i = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (l |= 1), I(W, l & 1), e === null)
    return Ti(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? (t.mode & 1 ? e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824 : t.lanes = 1, null) : (o = r.children, e = r.fallback, i ? (r = t.mode, i = t.child, o = { mode: "hidden", children: o }, !(r & 1) && i !== null ? (i.childLanes = 0, i.pendingProps = o) : i = wl(o, r, 0, null), e = Et(e, r, n, null), i.return = t, e.return = t, i.sibling = e, t.child = i, t.child.memoizedState = Ii(n), t.memoizedState = Fi, e) : Oo(t, o));
  if (l = e.memoizedState, l !== null && (s = l.dehydrated, s !== null)) return Uf(e, t, o, r, s, l, n);
  if (i) {
    i = r.fallback, o = t.mode, l = e.child, s = l.sibling;
    var u = { mode: "hidden", children: r.children };
    return !(o & 1) && t.child !== l ? (r = t.child, r.childLanes = 0, r.pendingProps = u, t.deletions = null) : (r = ft(l, u), r.subtreeFlags = l.subtreeFlags & 14680064), s !== null ? i = ft(s, i) : (i = Et(i, o, n, null), i.flags |= 2), i.return = t, r.return = t, r.sibling = i, t.child = r, r = i, i = t.child, o = e.child.memoizedState, o = o === null ? Ii(n) : { baseLanes: o.baseLanes | n, cachePool: null, transitions: o.transitions }, i.memoizedState = o, i.childLanes = e.childLanes & ~n, t.memoizedState = Fi, r;
  }
  return i = e.child, e = i.sibling, r = ft(i, { mode: "visible", children: r.children }), !(t.mode & 1) && (r.lanes = n), r.return = t, r.sibling = null, e !== null && (n = t.deletions, n === null ? (t.deletions = [e], t.flags |= 16) : n.push(e)), t.child = r, t.memoizedState = null, r;
}
function Oo(e, t) {
  return t = wl({ mode: "visible", children: t }, e.mode, 0, null), t.return = e, e.child = t;
}
function Sr(e, t, n, r) {
  return r !== null && ko(r), ln(t, e.child, null, n), e = Oo(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
}
function Uf(e, t, n, r, l, i, o) {
  if (n)
    return t.flags & 256 ? (t.flags &= -257, r = Zl(Error(j(422))), Sr(e, t, o, r)) : t.memoizedState !== null ? (t.child = e.child, t.flags |= 128, null) : (i = r.fallback, l = t.mode, r = wl({ mode: "visible", children: r.children }, l, 0, null), i = Et(i, l, o, null), i.flags |= 2, r.return = t, i.return = t, r.sibling = i, t.child = r, t.mode & 1 && ln(t, e.child, null, o), t.child.memoizedState = Ii(o), t.memoizedState = Fi, i);
  if (!(t.mode & 1)) return Sr(e, t, o, null);
  if (l.data === "$!") {
    if (r = l.nextSibling && l.nextSibling.dataset, r) var s = r.dgst;
    return r = s, i = Error(j(419)), r = Zl(i, r, void 0), Sr(e, t, o, r);
  }
  if (s = (o & e.childLanes) !== 0, fe || s) {
    if (r = q, r !== null) {
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
      l = l & (r.suspendedLanes | o) ? 0 : l, l !== 0 && l !== i.retryLane && (i.retryLane = l, Ye(e, l), Oe(r, e, l, -1));
    }
    return Ao(), r = Zl(Error(j(421))), Sr(e, t, o, r);
  }
  return l.data === "$?" ? (t.flags |= 128, t.child = e.child, t = Jf.bind(null, e), l._reactRetry = t, null) : (e = i.treeContext, ve = at(l.nextSibling), ye = t, A = !0, Re = null, e !== null && (Se[je++] = Ve, Se[je++] = He, Se[je++] = Pt, Ve = e.id, He = e.overflow, Pt = t), t = Oo(t, r.children), t.flags |= 4096, t);
}
function Xs(e, t, n) {
  e.lanes |= t;
  var r = e.alternate;
  r !== null && (r.lanes |= t), $i(e.return, t, n);
}
function Jl(e, t, n, r, l) {
  var i = e.memoizedState;
  i === null ? e.memoizedState = { isBackwards: t, rendering: null, renderingStartTime: 0, last: r, tail: n, tailMode: l } : (i.isBackwards = t, i.rendering = null, i.renderingStartTime = 0, i.last = r, i.tail = n, i.tailMode = l);
}
function rc(e, t, n) {
  var r = t.pendingProps, l = r.revealOrder, i = r.tail;
  if (se(e, t, r.children, n), r = W.current, r & 2) r = r & 1 | 2, t.flags |= 128;
  else {
    if (e !== null && e.flags & 128) e: for (e = t.child; e !== null; ) {
      if (e.tag === 13) e.memoizedState !== null && Xs(e, n, t);
      else if (e.tag === 19) Xs(e, n, t);
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
  if (I(W, r), !(t.mode & 1)) t.memoizedState = null;
  else switch (l) {
    case "forwards":
      for (n = t.child, l = null; n !== null; ) e = n.alternate, e !== null && el(e) === null && (l = n), n = n.sibling;
      n = l, n === null ? (l = t.child, t.child = null) : (l = n.sibling, n.sibling = null), Jl(t, !1, l, n, i);
      break;
    case "backwards":
      for (n = null, l = t.child, t.child = null; l !== null; ) {
        if (e = l.alternate, e !== null && el(e) === null) {
          t.child = l;
          break;
        }
        e = l.sibling, l.sibling = n, n = l, l = e;
      }
      Jl(t, !0, n, null, i);
      break;
    case "together":
      Jl(t, !1, null, null, void 0);
      break;
    default:
      t.memoizedState = null;
  }
  return t.child;
}
function Mr(e, t) {
  !(t.mode & 1) && e !== null && (e.alternate = null, t.alternate = null, t.flags |= 2);
}
function Xe(e, t, n) {
  if (e !== null && (t.dependencies = e.dependencies), $t |= t.lanes, !(n & t.childLanes)) return null;
  if (e !== null && t.child !== e.child) throw Error(j(153));
  if (t.child !== null) {
    for (e = t.child, n = ft(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null; ) e = e.sibling, n = n.sibling = ft(e, e.pendingProps), n.return = t;
    n.sibling = null;
  }
  return t.child;
}
function Bf(e, t, n) {
  switch (t.tag) {
    case 3:
      tc(t), rn();
      break;
    case 5:
      Pu(t);
      break;
    case 1:
      he(t.type) && Gr(t);
      break;
    case 4:
      Eo(t, t.stateNode.containerInfo);
      break;
    case 10:
      var r = t.type._context, l = t.memoizedProps.value;
      I(Zr, r._currentValue), r._currentValue = l;
      break;
    case 13:
      if (r = t.memoizedState, r !== null)
        return r.dehydrated !== null ? (I(W, W.current & 1), t.flags |= 128, null) : n & t.child.childLanes ? nc(e, t, n) : (I(W, W.current & 1), e = Xe(e, t, n), e !== null ? e.sibling : null);
      I(W, W.current & 1);
      break;
    case 19:
      if (r = (n & t.childLanes) !== 0, e.flags & 128) {
        if (r) return rc(e, t, n);
        t.flags |= 128;
      }
      if (l = t.memoizedState, l !== null && (l.rendering = null, l.tail = null, l.lastEffect = null), I(W, W.current), r) break;
      return null;
    case 22:
    case 23:
      return t.lanes = 0, qu(e, t, n);
  }
  return Xe(e, t, n);
}
var lc, Ui, ic, oc;
lc = function(e, t) {
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
Ui = function() {
};
ic = function(e, t, n, r) {
  var l = e.memoizedProps;
  if (l !== r) {
    e = t.stateNode, _t(Ae.current);
    var i = null;
    switch (n) {
      case "input":
        l = si(e, l), r = si(e, r), i = [];
        break;
      case "select":
        l = V({}, l, { value: void 0 }), r = V({}, r, { value: void 0 }), i = [];
        break;
      case "textarea":
        l = ci(e, l), r = ci(e, r), i = [];
        break;
      default:
        typeof l.onClick != "function" && typeof r.onClick == "function" && (e.onclick = Qr);
    }
    fi(n, r);
    var o;
    n = null;
    for (c in l) if (!r.hasOwnProperty(c) && l.hasOwnProperty(c) && l[c] != null) if (c === "style") {
      var s = l[c];
      for (o in s) s.hasOwnProperty(o) && (n || (n = {}), n[o] = "");
    } else c !== "dangerouslySetInnerHTML" && c !== "children" && c !== "suppressContentEditableWarning" && c !== "suppressHydrationWarning" && c !== "autoFocus" && (Fn.hasOwnProperty(c) ? i || (i = []) : (i = i || []).push(c, null));
    for (c in r) {
      var u = r[c];
      if (s = l != null ? l[c] : void 0, r.hasOwnProperty(c) && u !== s && (u != null || s != null)) if (c === "style") if (s) {
        for (o in s) !s.hasOwnProperty(o) || u && u.hasOwnProperty(o) || (n || (n = {}), n[o] = "");
        for (o in u) u.hasOwnProperty(o) && s[o] !== u[o] && (n || (n = {}), n[o] = u[o]);
      } else n || (i || (i = []), i.push(
        c,
        n
      )), n = u;
      else c === "dangerouslySetInnerHTML" ? (u = u ? u.__html : void 0, s = s ? s.__html : void 0, u != null && s !== u && (i = i || []).push(c, u)) : c === "children" ? typeof u != "string" && typeof u != "number" || (i = i || []).push(c, "" + u) : c !== "suppressContentEditableWarning" && c !== "suppressHydrationWarning" && (Fn.hasOwnProperty(c) ? (u != null && c === "onScroll" && U("scroll", e), i || s === u || (i = [])) : (i = i || []).push(c, u));
    }
    n && (i = i || []).push("style", n);
    var c = i;
    (t.updateQueue = c) && (t.flags |= 4);
  }
};
oc = function(e, t, n, r) {
  n !== r && (t.flags |= 4);
};
function kn(e, t) {
  if (!A) switch (e.tailMode) {
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
function le(e) {
  var t = e.alternate !== null && e.alternate.child === e.child, n = 0, r = 0;
  if (t) for (var l = e.child; l !== null; ) n |= l.lanes | l.childLanes, r |= l.subtreeFlags & 14680064, r |= l.flags & 14680064, l.return = e, l = l.sibling;
  else for (l = e.child; l !== null; ) n |= l.lanes | l.childLanes, r |= l.subtreeFlags, r |= l.flags, l.return = e, l = l.sibling;
  return e.subtreeFlags |= r, e.childLanes = n, t;
}
function Af(e, t, n) {
  var r = t.pendingProps;
  switch (wo(t), t.tag) {
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
      return le(t), null;
    case 1:
      return he(t.type) && Kr(), le(t), null;
    case 3:
      return r = t.stateNode, on(), B(pe), B(oe), Po(), r.pendingContext && (r.context = r.pendingContext, r.pendingContext = null), (e === null || e.child === null) && (wr(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, Re !== null && (Ki(Re), Re = null))), Ui(e, t), le(t), null;
    case 5:
      zo(t);
      var l = _t(Yn.current);
      if (n = t.type, e !== null && t.stateNode != null) ic(e, t, n, r, l), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
      else {
        if (!r) {
          if (t.stateNode === null) throw Error(j(166));
          return le(t), null;
        }
        if (e = _t(Ae.current), wr(t)) {
          r = t.stateNode, n = t.type;
          var i = t.memoizedProps;
          switch (r[Ue] = t, r[Kn] = i, e = (t.mode & 1) !== 0, n) {
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
              for (l = 0; l < Cn.length; l++) U(Cn[l], r);
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
              is(r, i), U("invalid", r);
              break;
            case "select":
              r._wrapperState = { wasMultiple: !!i.multiple }, U("invalid", r);
              break;
            case "textarea":
              ss(r, i), U("invalid", r);
          }
          fi(n, i), l = null;
          for (var o in i) if (i.hasOwnProperty(o)) {
            var s = i[o];
            o === "children" ? typeof s == "string" ? r.textContent !== s && (i.suppressHydrationWarning !== !0 && xr(r.textContent, s, e), l = ["children", s]) : typeof s == "number" && r.textContent !== "" + s && (i.suppressHydrationWarning !== !0 && xr(
              r.textContent,
              s,
              e
            ), l = ["children", "" + s]) : Fn.hasOwnProperty(o) && s != null && o === "onScroll" && U("scroll", r);
          }
          switch (n) {
            case "input":
              dr(r), os(r, i, !0);
              break;
            case "textarea":
              dr(r), as(r);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof i.onClick == "function" && (r.onclick = Qr);
          }
          r = l, t.updateQueue = r, r !== null && (t.flags |= 4);
        } else {
          o = l.nodeType === 9 ? l : l.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = Ma(n)), e === "http://www.w3.org/1999/xhtml" ? n === "script" ? (e = o.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof r.is == "string" ? e = o.createElement(n, { is: r.is }) : (e = o.createElement(n), n === "select" && (o = e, r.multiple ? o.multiple = !0 : r.size && (o.size = r.size))) : e = o.createElementNS(e, n), e[Ue] = t, e[Kn] = r, lc(e, t, !1, !1), t.stateNode = e;
          e: {
            switch (o = pi(n, r), n) {
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
                for (l = 0; l < Cn.length; l++) U(Cn[l], e);
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
                is(e, r), l = si(e, r), U("invalid", e);
                break;
              case "option":
                l = r;
                break;
              case "select":
                e._wrapperState = { wasMultiple: !!r.multiple }, l = V({}, r, { value: void 0 }), U("invalid", e);
                break;
              case "textarea":
                ss(e, r), l = ci(e, r), U("invalid", e);
                break;
              default:
                l = r;
            }
            fi(n, l), s = l;
            for (i in s) if (s.hasOwnProperty(i)) {
              var u = s[i];
              i === "style" ? Fa(e, u) : i === "dangerouslySetInnerHTML" ? (u = u ? u.__html : void 0, u != null && Oa(e, u)) : i === "children" ? typeof u == "string" ? (n !== "textarea" || u !== "") && In(e, u) : typeof u == "number" && In(e, "" + u) : i !== "suppressContentEditableWarning" && i !== "suppressHydrationWarning" && i !== "autoFocus" && (Fn.hasOwnProperty(i) ? u != null && i === "onScroll" && U("scroll", e) : u != null && lo(e, i, u, o));
            }
            switch (n) {
              case "input":
                dr(e), os(e, r, !1);
                break;
              case "textarea":
                dr(e), as(e);
                break;
              case "option":
                r.value != null && e.setAttribute("value", "" + pt(r.value));
                break;
              case "select":
                e.multiple = !!r.multiple, i = r.value, i != null ? Yt(e, !!r.multiple, i, !1) : r.defaultValue != null && Yt(
                  e,
                  !!r.multiple,
                  r.defaultValue,
                  !0
                );
                break;
              default:
                typeof l.onClick == "function" && (e.onclick = Qr);
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
      return le(t), null;
    case 6:
      if (e && t.stateNode != null) oc(e, t, e.memoizedProps, r);
      else {
        if (typeof r != "string" && t.stateNode === null) throw Error(j(166));
        if (n = _t(Yn.current), _t(Ae.current), wr(t)) {
          if (r = t.stateNode, n = t.memoizedProps, r[Ue] = t, (i = r.nodeValue !== n) && (e = ye, e !== null)) switch (e.tag) {
            case 3:
              xr(r.nodeValue, n, (e.mode & 1) !== 0);
              break;
            case 5:
              e.memoizedProps.suppressHydrationWarning !== !0 && xr(r.nodeValue, n, (e.mode & 1) !== 0);
          }
          i && (t.flags |= 4);
        } else r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r), r[Ue] = t, t.stateNode = r;
      }
      return le(t), null;
    case 13:
      if (B(W), r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
        if (A && ve !== null && t.mode & 1 && !(t.flags & 128)) _u(), rn(), t.flags |= 98560, i = !1;
        else if (i = wr(t), r !== null && r.dehydrated !== null) {
          if (e === null) {
            if (!i) throw Error(j(318));
            if (i = t.memoizedState, i = i !== null ? i.dehydrated : null, !i) throw Error(j(317));
            i[Ue] = t;
          } else rn(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
          le(t), i = !1;
        } else Re !== null && (Ki(Re), Re = null), i = !0;
        if (!i) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128 ? (t.lanes = n, t) : (r = r !== null, r !== (e !== null && e.memoizedState !== null) && r && (t.child.flags |= 8192, t.mode & 1 && (e === null || W.current & 1 ? X === 0 && (X = 3) : Ao())), t.updateQueue !== null && (t.flags |= 4), le(t), null);
    case 4:
      return on(), Ui(e, t), e === null && Hn(t.stateNode.containerInfo), le(t), null;
    case 10:
      return _o(t.type._context), le(t), null;
    case 17:
      return he(t.type) && Kr(), le(t), null;
    case 19:
      if (B(W), i = t.memoizedState, i === null) return le(t), null;
      if (r = (t.flags & 128) !== 0, o = i.rendering, o === null) if (r) kn(i, !1);
      else {
        if (X !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null; ) {
          if (o = el(e), o !== null) {
            for (t.flags |= 128, kn(i, !1), r = o.updateQueue, r !== null && (t.updateQueue = r, t.flags |= 4), t.subtreeFlags = 0, r = n, n = t.child; n !== null; ) i = n, e = r, i.flags &= 14680066, o = i.alternate, o === null ? (i.childLanes = 0, i.lanes = e, i.child = null, i.subtreeFlags = 0, i.memoizedProps = null, i.memoizedState = null, i.updateQueue = null, i.dependencies = null, i.stateNode = null) : (i.childLanes = o.childLanes, i.lanes = o.lanes, i.child = o.child, i.subtreeFlags = 0, i.deletions = null, i.memoizedProps = o.memoizedProps, i.memoizedState = o.memoizedState, i.updateQueue = o.updateQueue, i.type = o.type, e = o.dependencies, i.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }), n = n.sibling;
            return I(W, W.current & 1 | 2), t.child;
          }
          e = e.sibling;
        }
        i.tail !== null && K() > an && (t.flags |= 128, r = !0, kn(i, !1), t.lanes = 4194304);
      }
      else {
        if (!r) if (e = el(o), e !== null) {
          if (t.flags |= 128, r = !0, n = e.updateQueue, n !== null && (t.updateQueue = n, t.flags |= 4), kn(i, !0), i.tail === null && i.tailMode === "hidden" && !o.alternate && !A) return le(t), null;
        } else 2 * K() - i.renderingStartTime > an && n !== 1073741824 && (t.flags |= 128, r = !0, kn(i, !1), t.lanes = 4194304);
        i.isBackwards ? (o.sibling = t.child, t.child = o) : (n = i.last, n !== null ? n.sibling = o : t.child = o, i.last = o);
      }
      return i.tail !== null ? (t = i.tail, i.rendering = t, i.tail = t.sibling, i.renderingStartTime = K(), t.sibling = null, n = W.current, I(W, r ? n & 1 | 2 : n & 1), t) : (le(t), null);
    case 22:
    case 23:
      return Bo(), r = t.memoizedState !== null, e !== null && e.memoizedState !== null !== r && (t.flags |= 8192), r && t.mode & 1 ? ge & 1073741824 && (le(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : le(t), null;
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(j(156, t.tag));
}
function Wf(e, t) {
  switch (wo(t), t.tag) {
    case 1:
      return he(t.type) && Kr(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 3:
      return on(), B(pe), B(oe), Po(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
    case 5:
      return zo(t), null;
    case 13:
      if (B(W), e = t.memoizedState, e !== null && e.dehydrated !== null) {
        if (t.alternate === null) throw Error(j(340));
        rn();
      }
      return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 19:
      return B(W), null;
    case 4:
      return on(), null;
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
var jr = !1, ie = !1, bf = typeof WeakSet == "function" ? WeakSet : Set, E = null;
function Qt(e, t) {
  var n = e.ref;
  if (n !== null) if (typeof n == "function") try {
    n(null);
  } catch (r) {
    H(e, t, r);
  }
  else n.current = null;
}
function Bi(e, t, n) {
  try {
    n();
  } catch (r) {
    H(e, t, r);
  }
}
var Zs = !1;
function Vf(e, t) {
  if (ji = br, e = du(), yo(e)) {
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
        var o = 0, s = -1, u = -1, c = 0, m = 0, v = e, g = null;
        t: for (; ; ) {
          for (var y; v !== n || l !== 0 && v.nodeType !== 3 || (s = o + l), v !== i || r !== 0 && v.nodeType !== 3 || (u = o + r), v.nodeType === 3 && (o += v.nodeValue.length), (y = v.firstChild) !== null; )
            g = v, v = y;
          for (; ; ) {
            if (v === e) break t;
            if (g === n && ++c === l && (s = o), g === i && ++m === r && (u = o), (y = v.nextSibling) !== null) break;
            v = g, g = v.parentNode;
          }
          v = y;
        }
        n = s === -1 || u === -1 ? null : { start: s, end: u };
      } else n = null;
    }
    n = n || { start: 0, end: 0 };
  } else n = null;
  for (_i = { focusedElem: e, selectionRange: n }, br = !1, E = t; E !== null; ) if (t = E, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null) e.return = t, E = e;
  else for (; E !== null; ) {
    t = E;
    try {
      var x = t.alternate;
      if (t.flags & 1024) switch (t.tag) {
        case 0:
        case 11:
        case 15:
          break;
        case 1:
          if (x !== null) {
            var S = x.memoizedProps, N = x.memoizedState, f = t.stateNode, d = f.getSnapshotBeforeUpdate(t.elementType === t.type ? S : $e(t.type, S), N);
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
          throw Error(j(163));
      }
    } catch (w) {
      H(t, t.return, w);
    }
    if (e = t.sibling, e !== null) {
      e.return = t.return, E = e;
      break;
    }
    E = t.return;
  }
  return x = Zs, Zs = !1, x;
}
function Rn(e, t, n) {
  var r = t.updateQueue;
  if (r = r !== null ? r.lastEffect : null, r !== null) {
    var l = r = r.next;
    do {
      if ((l.tag & e) === e) {
        var i = l.destroy;
        l.destroy = void 0, i !== void 0 && Bi(t, n, i);
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
function Ai(e) {
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
function sc(e) {
  var t = e.alternate;
  t !== null && (e.alternate = null, sc(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[Ue], delete t[Kn], delete t[Ei], delete t[Cf], delete t[Ef])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
}
function ac(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function Js(e) {
  e: for (; ; ) {
    for (; e.sibling === null; ) {
      if (e.return === null || ac(e.return)) return null;
      e = e.return;
    }
    for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
      if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
      e.child.return = e, e = e.child;
    }
    if (!(e.flags & 2)) return e.stateNode;
  }
}
function Wi(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6) e = e.stateNode, t ? n.nodeType === 8 ? n.parentNode.insertBefore(e, t) : n.insertBefore(e, t) : (n.nodeType === 8 ? (t = n.parentNode, t.insertBefore(e, n)) : (t = n, t.appendChild(e)), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = Qr));
  else if (r !== 4 && (e = e.child, e !== null)) for (Wi(e, t, n), e = e.sibling; e !== null; ) Wi(e, t, n), e = e.sibling;
}
function bi(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
  else if (r !== 4 && (e = e.child, e !== null)) for (bi(e, t, n), e = e.sibling; e !== null; ) bi(e, t, n), e = e.sibling;
}
var ee = null, Le = !1;
function Je(e, t, n) {
  for (n = n.child; n !== null; ) uc(e, t, n), n = n.sibling;
}
function uc(e, t, n) {
  if (Be && typeof Be.onCommitFiberUnmount == "function") try {
    Be.onCommitFiberUnmount(cl, n);
  } catch {
  }
  switch (n.tag) {
    case 5:
      ie || Qt(n, t);
    case 6:
      var r = ee, l = Le;
      ee = null, Je(e, t, n), ee = r, Le = l, ee !== null && (Le ? (e = ee, n = n.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n)) : ee.removeChild(n.stateNode));
      break;
    case 18:
      ee !== null && (Le ? (e = ee, n = n.stateNode, e.nodeType === 8 ? Hl(e.parentNode, n) : e.nodeType === 1 && Hl(e, n), Wn(e)) : Hl(ee, n.stateNode));
      break;
    case 4:
      r = ee, l = Le, ee = n.stateNode.containerInfo, Le = !0, Je(e, t, n), ee = r, Le = l;
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (!ie && (r = n.updateQueue, r !== null && (r = r.lastEffect, r !== null))) {
        l = r = r.next;
        do {
          var i = l, o = i.destroy;
          i = i.tag, o !== void 0 && (i & 2 || i & 4) && Bi(n, t, o), l = l.next;
        } while (l !== r);
      }
      Je(e, t, n);
      break;
    case 1:
      if (!ie && (Qt(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function")) try {
        r.props = n.memoizedProps, r.state = n.memoizedState, r.componentWillUnmount();
      } catch (s) {
        H(n, t, s);
      }
      Je(e, t, n);
      break;
    case 21:
      Je(e, t, n);
      break;
    case 22:
      n.mode & 1 ? (ie = (r = ie) || n.memoizedState !== null, Je(e, t, n), ie = r) : Je(e, t, n);
      break;
    default:
      Je(e, t, n);
  }
}
function qs(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    n === null && (n = e.stateNode = new bf()), t.forEach(function(r) {
      var l = qf.bind(null, e, r);
      n.has(r) || (n.add(r), r.then(l, l));
    });
  }
}
function Te(e, t) {
  var n = t.deletions;
  if (n !== null) for (var r = 0; r < n.length; r++) {
    var l = n[r];
    try {
      var i = e, o = t, s = o;
      e: for (; s !== null; ) {
        switch (s.tag) {
          case 5:
            ee = s.stateNode, Le = !1;
            break e;
          case 3:
            ee = s.stateNode.containerInfo, Le = !0;
            break e;
          case 4:
            ee = s.stateNode.containerInfo, Le = !0;
            break e;
        }
        s = s.return;
      }
      if (ee === null) throw Error(j(160));
      uc(i, o, l), ee = null, Le = !1;
      var u = l.alternate;
      u !== null && (u.return = null), l.return = null;
    } catch (c) {
      H(l, t, c);
    }
  }
  if (t.subtreeFlags & 12854) for (t = t.child; t !== null; ) cc(t, e), t = t.sibling;
}
function cc(e, t) {
  var n = e.alternate, r = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if (Te(t, e), Fe(e), r & 4) {
        try {
          Rn(3, e, e.return), yl(3, e);
        } catch (S) {
          H(e, e.return, S);
        }
        try {
          Rn(5, e, e.return);
        } catch (S) {
          H(e, e.return, S);
        }
      }
      break;
    case 1:
      Te(t, e), Fe(e), r & 512 && n !== null && Qt(n, n.return);
      break;
    case 5:
      if (Te(t, e), Fe(e), r & 512 && n !== null && Qt(n, n.return), e.flags & 32) {
        var l = e.stateNode;
        try {
          In(l, "");
        } catch (S) {
          H(e, e.return, S);
        }
      }
      if (r & 4 && (l = e.stateNode, l != null)) {
        var i = e.memoizedProps, o = n !== null ? n.memoizedProps : i, s = e.type, u = e.updateQueue;
        if (e.updateQueue = null, u !== null) try {
          s === "input" && i.type === "radio" && i.name != null && La(l, i), pi(s, o);
          var c = pi(s, i);
          for (o = 0; o < u.length; o += 2) {
            var m = u[o], v = u[o + 1];
            m === "style" ? Fa(l, v) : m === "dangerouslySetInnerHTML" ? Oa(l, v) : m === "children" ? In(l, v) : lo(l, m, v, c);
          }
          switch (s) {
            case "input":
              ai(l, i);
              break;
            case "textarea":
              Ra(l, i);
              break;
            case "select":
              var g = l._wrapperState.wasMultiple;
              l._wrapperState.wasMultiple = !!i.multiple;
              var y = i.value;
              y != null ? Yt(l, !!i.multiple, y, !1) : g !== !!i.multiple && (i.defaultValue != null ? Yt(
                l,
                !!i.multiple,
                i.defaultValue,
                !0
              ) : Yt(l, !!i.multiple, i.multiple ? [] : "", !1));
          }
          l[Kn] = i;
        } catch (S) {
          H(e, e.return, S);
        }
      }
      break;
    case 6:
      if (Te(t, e), Fe(e), r & 4) {
        if (e.stateNode === null) throw Error(j(162));
        l = e.stateNode, i = e.memoizedProps;
        try {
          l.nodeValue = i;
        } catch (S) {
          H(e, e.return, S);
        }
      }
      break;
    case 3:
      if (Te(t, e), Fe(e), r & 4 && n !== null && n.memoizedState.isDehydrated) try {
        Wn(t.containerInfo);
      } catch (S) {
        H(e, e.return, S);
      }
      break;
    case 4:
      Te(t, e), Fe(e);
      break;
    case 13:
      Te(t, e), Fe(e), l = e.child, l.flags & 8192 && (i = l.memoizedState !== null, l.stateNode.isHidden = i, !i || l.alternate !== null && l.alternate.memoizedState !== null || (Io = K())), r & 4 && qs(e);
      break;
    case 22:
      if (m = n !== null && n.memoizedState !== null, e.mode & 1 ? (ie = (c = ie) || m, Te(t, e), ie = c) : Te(t, e), Fe(e), r & 8192) {
        if (c = e.memoizedState !== null, (e.stateNode.isHidden = c) && !m && e.mode & 1) for (E = e, m = e.child; m !== null; ) {
          for (v = E = m; E !== null; ) {
            switch (g = E, y = g.child, g.tag) {
              case 0:
              case 11:
              case 14:
              case 15:
                Rn(4, g, g.return);
                break;
              case 1:
                Qt(g, g.return);
                var x = g.stateNode;
                if (typeof x.componentWillUnmount == "function") {
                  r = g, n = g.return;
                  try {
                    t = r, x.props = t.memoizedProps, x.state = t.memoizedState, x.componentWillUnmount();
                  } catch (S) {
                    H(r, n, S);
                  }
                }
                break;
              case 5:
                Qt(g, g.return);
                break;
              case 22:
                if (g.memoizedState !== null) {
                  ta(v);
                  continue;
                }
            }
            y !== null ? (y.return = g, E = y) : ta(v);
          }
          m = m.sibling;
        }
        e: for (m = null, v = e; ; ) {
          if (v.tag === 5) {
            if (m === null) {
              m = v;
              try {
                l = v.stateNode, c ? (i = l.style, typeof i.setProperty == "function" ? i.setProperty("display", "none", "important") : i.display = "none") : (s = v.stateNode, u = v.memoizedProps.style, o = u != null && u.hasOwnProperty("display") ? u.display : null, s.style.display = Da("display", o));
              } catch (S) {
                H(e, e.return, S);
              }
            }
          } else if (v.tag === 6) {
            if (m === null) try {
              v.stateNode.nodeValue = c ? "" : v.memoizedProps;
            } catch (S) {
              H(e, e.return, S);
            }
          } else if ((v.tag !== 22 && v.tag !== 23 || v.memoizedState === null || v === e) && v.child !== null) {
            v.child.return = v, v = v.child;
            continue;
          }
          if (v === e) break e;
          for (; v.sibling === null; ) {
            if (v.return === null || v.return === e) break e;
            m === v && (m = null), v = v.return;
          }
          m === v && (m = null), v.sibling.return = v.return, v = v.sibling;
        }
      }
      break;
    case 19:
      Te(t, e), Fe(e), r & 4 && qs(e);
      break;
    case 21:
      break;
    default:
      Te(
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
          if (ac(n)) {
            var r = n;
            break e;
          }
          n = n.return;
        }
        throw Error(j(160));
      }
      switch (r.tag) {
        case 5:
          var l = r.stateNode;
          r.flags & 32 && (In(l, ""), r.flags &= -33);
          var i = Js(e);
          bi(e, i, l);
          break;
        case 3:
        case 4:
          var o = r.stateNode.containerInfo, s = Js(e);
          Wi(e, s, o);
          break;
        default:
          throw Error(j(161));
      }
    } catch (u) {
      H(e, e.return, u);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function Hf(e, t, n) {
  E = e, dc(e);
}
function dc(e, t, n) {
  for (var r = (e.mode & 1) !== 0; E !== null; ) {
    var l = E, i = l.child;
    if (l.tag === 22 && r) {
      var o = l.memoizedState !== null || jr;
      if (!o) {
        var s = l.alternate, u = s !== null && s.memoizedState !== null || ie;
        s = jr;
        var c = ie;
        if (jr = o, (ie = u) && !c) for (E = l; E !== null; ) o = E, u = o.child, o.tag === 22 && o.memoizedState !== null ? na(l) : u !== null ? (u.return = o, E = u) : na(l);
        for (; i !== null; ) E = i, dc(i), i = i.sibling;
        E = l, jr = s, ie = c;
      }
      ea(e);
    } else l.subtreeFlags & 8772 && i !== null ? (i.return = l, E = i) : ea(e);
  }
}
function ea(e) {
  for (; E !== null; ) {
    var t = E;
    if (t.flags & 8772) {
      var n = t.alternate;
      try {
        if (t.flags & 8772) switch (t.tag) {
          case 0:
          case 11:
          case 15:
            ie || yl(5, t);
            break;
          case 1:
            var r = t.stateNode;
            if (t.flags & 4 && !ie) if (n === null) r.componentDidMount();
            else {
              var l = t.elementType === t.type ? n.memoizedProps : $e(t.type, n.memoizedProps);
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
            var s = t.stateNode;
            if (n === null && t.flags & 4) {
              n = s;
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
                  var v = m.dehydrated;
                  v !== null && Wn(v);
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
            throw Error(j(163));
        }
        ie || t.flags & 512 && Ai(t);
      } catch (g) {
        H(t, t.return, g);
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
function ta(e) {
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
function na(e) {
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
          } catch (u) {
            H(t, n, u);
          }
          break;
        case 1:
          var r = t.stateNode;
          if (typeof r.componentDidMount == "function") {
            var l = t.return;
            try {
              r.componentDidMount();
            } catch (u) {
              H(t, l, u);
            }
          }
          var i = t.return;
          try {
            Ai(t);
          } catch (u) {
            H(t, i, u);
          }
          break;
        case 5:
          var o = t.return;
          try {
            Ai(t);
          } catch (u) {
            H(t, o, u);
          }
      }
    } catch (u) {
      H(t, t.return, u);
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
var Qf = Math.ceil, rl = Ze.ReactCurrentDispatcher, Do = Ze.ReactCurrentOwner, Ne = Ze.ReactCurrentBatchConfig, M = 0, q = null, G = null, te = 0, ge = 0, Kt = gt(0), X = 0, qn = null, $t = 0, xl = 0, Fo = 0, Mn = null, de = null, Io = 0, an = 1 / 0, We = null, ll = !1, Vi = null, ct = null, _r = !1, lt = null, il = 0, On = 0, Hi = null, Or = -1, Dr = 0;
function ae() {
  return M & 6 ? K() : Or !== -1 ? Or : Or = K();
}
function dt(e) {
  return e.mode & 1 ? M & 2 && te !== 0 ? te & -te : Pf.transition !== null ? (Dr === 0 && (Dr = Ya()), Dr) : (e = D, e !== 0 || (e = window.event, e = e === void 0 ? 16 : nu(e.type)), e) : 1;
}
function Oe(e, t, n, r) {
  if (50 < On) throw On = 0, Hi = null, Error(j(185));
  nr(e, n, r), (!(M & 2) || e !== q) && (e === q && (!(M & 2) && (xl |= n), X === 4 && nt(e, te)), me(e, r), n === 1 && M === 0 && !(t.mode & 1) && (an = K() + 500, ml && vt()));
}
function me(e, t) {
  var n = e.callbackNode;
  zd(e, t);
  var r = Wr(e, e === q ? te : 0);
  if (r === 0) n !== null && ds(n), e.callbackNode = null, e.callbackPriority = 0;
  else if (t = r & -r, e.callbackPriority !== t) {
    if (n != null && ds(n), t === 1) e.tag === 0 ? zf(ra.bind(null, e)) : ku(ra.bind(null, e)), _f(function() {
      !(M & 6) && vt();
    }), n = null;
    else {
      switch (Xa(r)) {
        case 1:
          n = uo;
          break;
        case 4:
          n = Ka;
          break;
        case 16:
          n = Ar;
          break;
        case 536870912:
          n = Ga;
          break;
        default:
          n = Ar;
      }
      n = xc(n, fc.bind(null, e));
    }
    e.callbackPriority = t, e.callbackNode = n;
  }
}
function fc(e, t) {
  if (Or = -1, Dr = 0, M & 6) throw Error(j(327));
  var n = e.callbackNode;
  if (en() && e.callbackNode !== n) return null;
  var r = Wr(e, e === q ? te : 0);
  if (r === 0) return null;
  if (r & 30 || r & e.expiredLanes || t) t = ol(e, r);
  else {
    t = r;
    var l = M;
    M |= 2;
    var i = hc();
    (q !== e || te !== t) && (We = null, an = K() + 500, Ct(e, t));
    do
      try {
        Yf();
        break;
      } catch (s) {
        pc(e, s);
      }
    while (!0);
    jo(), rl.current = i, M = l, G !== null ? t = 0 : (q = null, te = 0, t = X);
  }
  if (t !== 0) {
    if (t === 2 && (l = yi(e), l !== 0 && (r = l, t = Qi(e, l))), t === 1) throw n = qn, Ct(e, 0), nt(e, r), me(e, K()), n;
    if (t === 6) nt(e, r);
    else {
      if (l = e.current.alternate, !(r & 30) && !Kf(l) && (t = ol(e, r), t === 2 && (i = yi(e), i !== 0 && (r = i, t = Qi(e, i))), t === 1)) throw n = qn, Ct(e, 0), nt(e, r), me(e, K()), n;
      switch (e.finishedWork = l, e.finishedLanes = r, t) {
        case 0:
        case 1:
          throw Error(j(345));
        case 2:
          kt(e, de, We);
          break;
        case 3:
          if (nt(e, r), (r & 130023424) === r && (t = Io + 500 - K(), 10 < t)) {
            if (Wr(e, 0) !== 0) break;
            if (l = e.suspendedLanes, (l & r) !== r) {
              ae(), e.pingedLanes |= e.suspendedLanes & l;
              break;
            }
            e.timeoutHandle = Ci(kt.bind(null, e, de, We), t);
            break;
          }
          kt(e, de, We);
          break;
        case 4:
          if (nt(e, r), (r & 4194240) === r) break;
          for (t = e.eventTimes, l = -1; 0 < r; ) {
            var o = 31 - Me(r);
            i = 1 << o, o = t[o], o > l && (l = o), r &= ~i;
          }
          if (r = l, r = K() - r, r = (120 > r ? 120 : 480 > r ? 480 : 1080 > r ? 1080 : 1920 > r ? 1920 : 3e3 > r ? 3e3 : 4320 > r ? 4320 : 1960 * Qf(r / 1960)) - r, 10 < r) {
            e.timeoutHandle = Ci(kt.bind(null, e, de, We), r);
            break;
          }
          kt(e, de, We);
          break;
        case 5:
          kt(e, de, We);
          break;
        default:
          throw Error(j(329));
      }
    }
  }
  return me(e, K()), e.callbackNode === n ? fc.bind(null, e) : null;
}
function Qi(e, t) {
  var n = Mn;
  return e.current.memoizedState.isDehydrated && (Ct(e, t).flags |= 256), e = ol(e, t), e !== 2 && (t = de, de = n, t !== null && Ki(t)), e;
}
function Ki(e) {
  de === null ? de = e : de.push.apply(de, e);
}
function Kf(e) {
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
function nt(e, t) {
  for (t &= ~Fo, t &= ~xl, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t; ) {
    var n = 31 - Me(t), r = 1 << n;
    e[n] = -1, t &= ~r;
  }
}
function ra(e) {
  if (M & 6) throw Error(j(327));
  en();
  var t = Wr(e, 0);
  if (!(t & 1)) return me(e, K()), null;
  var n = ol(e, t);
  if (e.tag !== 0 && n === 2) {
    var r = yi(e);
    r !== 0 && (t = r, n = Qi(e, r));
  }
  if (n === 1) throw n = qn, Ct(e, 0), nt(e, t), me(e, K()), n;
  if (n === 6) throw Error(j(345));
  return e.finishedWork = e.current.alternate, e.finishedLanes = t, kt(e, de, We), me(e, K()), null;
}
function Uo(e, t) {
  var n = M;
  M |= 1;
  try {
    return e(t);
  } finally {
    M = n, M === 0 && (an = K() + 500, ml && vt());
  }
}
function Lt(e) {
  lt !== null && lt.tag === 0 && !(M & 6) && en();
  var t = M;
  M |= 1;
  var n = Ne.transition, r = D;
  try {
    if (Ne.transition = null, D = 1, e) return e();
  } finally {
    D = r, Ne.transition = n, M = t, !(M & 6) && vt();
  }
}
function Bo() {
  ge = Kt.current, B(Kt);
}
function Ct(e, t) {
  e.finishedWork = null, e.finishedLanes = 0;
  var n = e.timeoutHandle;
  if (n !== -1 && (e.timeoutHandle = -1, jf(n)), G !== null) for (n = G.return; n !== null; ) {
    var r = n;
    switch (wo(r), r.tag) {
      case 1:
        r = r.type.childContextTypes, r != null && Kr();
        break;
      case 3:
        on(), B(pe), B(oe), Po();
        break;
      case 5:
        zo(r);
        break;
      case 4:
        on();
        break;
      case 13:
        B(W);
        break;
      case 19:
        B(W);
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
  if (q = e, G = e = ft(e.current, null), te = ge = t, X = 0, qn = null, Fo = xl = $t = 0, de = Mn = null, jt !== null) {
    for (t = 0; t < jt.length; t++) if (n = jt[t], r = n.interleaved, r !== null) {
      n.interleaved = null;
      var l = r.next, i = n.pending;
      if (i !== null) {
        var o = i.next;
        i.next = l, r.next = o;
      }
      n.pending = r;
    }
    jt = null;
  }
  return e;
}
function pc(e, t) {
  do {
    var n = G;
    try {
      if (jo(), Lr.current = nl, tl) {
        for (var r = b.memoizedState; r !== null; ) {
          var l = r.queue;
          l !== null && (l.pending = null), r = r.next;
        }
        tl = !1;
      }
      if (Tt = 0, J = Y = b = null, Ln = !1, Xn = 0, Do.current = null, n === null || n.return === null) {
        X = 1, qn = t, G = null;
        break;
      }
      e: {
        var i = e, o = n.return, s = n, u = t;
        if (t = te, s.flags |= 32768, u !== null && typeof u == "object" && typeof u.then == "function") {
          var c = u, m = s, v = m.tag;
          if (!(m.mode & 1) && (v === 0 || v === 11 || v === 15)) {
            var g = m.alternate;
            g ? (m.updateQueue = g.updateQueue, m.memoizedState = g.memoizedState, m.lanes = g.lanes) : (m.updateQueue = null, m.memoizedState = null);
          }
          var y = Vs(o);
          if (y !== null) {
            y.flags &= -257, Hs(y, o, s, i, t), y.mode & 1 && bs(i, c, t), t = y, u = c;
            var x = t.updateQueue;
            if (x === null) {
              var S = /* @__PURE__ */ new Set();
              S.add(u), t.updateQueue = S;
            } else x.add(u);
            break e;
          } else {
            if (!(t & 1)) {
              bs(i, c, t), Ao();
              break e;
            }
            u = Error(j(426));
          }
        } else if (A && s.mode & 1) {
          var N = Vs(o);
          if (N !== null) {
            !(N.flags & 65536) && (N.flags |= 256), Hs(N, o, s, i, t), ko(sn(u, s));
            break e;
          }
        }
        i = u = sn(u, s), X !== 4 && (X = 2), Mn === null ? Mn = [i] : Mn.push(i), i = o;
        do {
          switch (i.tag) {
            case 3:
              i.flags |= 65536, t &= -t, i.lanes |= t;
              var f = Xu(i, u, t);
              Fs(i, f);
              break e;
            case 1:
              s = u;
              var d = i.type, p = i.stateNode;
              if (!(i.flags & 128) && (typeof d.getDerivedStateFromError == "function" || p !== null && typeof p.componentDidCatch == "function" && (ct === null || !ct.has(p)))) {
                i.flags |= 65536, t &= -t, i.lanes |= t;
                var w = Zu(i, s, t);
                Fs(i, w);
                break e;
              }
          }
          i = i.return;
        } while (i !== null);
      }
      gc(n);
    } catch (h) {
      t = h, G === n && n !== null && (G = n = n.return);
      continue;
    }
    break;
  } while (!0);
}
function hc() {
  var e = rl.current;
  return rl.current = nl, e === null ? nl : e;
}
function Ao() {
  (X === 0 || X === 3 || X === 2) && (X = 4), q === null || !($t & 268435455) && !(xl & 268435455) || nt(q, te);
}
function ol(e, t) {
  var n = M;
  M |= 2;
  var r = hc();
  (q !== e || te !== t) && (We = null, Ct(e, t));
  do
    try {
      Gf();
      break;
    } catch (l) {
      pc(e, l);
    }
  while (!0);
  if (jo(), M = n, rl.current = r, G !== null) throw Error(j(261));
  return q = null, te = 0, X;
}
function Gf() {
  for (; G !== null; ) mc(G);
}
function Yf() {
  for (; G !== null && !xd(); ) mc(G);
}
function mc(e) {
  var t = yc(e.alternate, e, ge);
  e.memoizedProps = e.pendingProps, t === null ? gc(e) : G = t, Do.current = null;
}
function gc(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (e = t.return, t.flags & 32768) {
      if (n = Wf(n, t), n !== null) {
        n.flags &= 32767, G = n;
        return;
      }
      if (e !== null) e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
      else {
        X = 6, G = null;
        return;
      }
    } else if (n = Af(n, t, ge), n !== null) {
      G = n;
      return;
    }
    if (t = t.sibling, t !== null) {
      G = t;
      return;
    }
    G = t = e;
  } while (t !== null);
  X === 0 && (X = 5);
}
function kt(e, t, n) {
  var r = D, l = Ne.transition;
  try {
    Ne.transition = null, D = 1, Xf(e, t, n, r);
  } finally {
    Ne.transition = l, D = r;
  }
  return null;
}
function Xf(e, t, n, r) {
  do
    en();
  while (lt !== null);
  if (M & 6) throw Error(j(327));
  n = e.finishedWork;
  var l = e.finishedLanes;
  if (n === null) return null;
  if (e.finishedWork = null, e.finishedLanes = 0, n === e.current) throw Error(j(177));
  e.callbackNode = null, e.callbackPriority = 0;
  var i = n.lanes | n.childLanes;
  if (Pd(e, i), e === q && (G = q = null, te = 0), !(n.subtreeFlags & 2064) && !(n.flags & 2064) || _r || (_r = !0, xc(Ar, function() {
    return en(), null;
  })), i = (n.flags & 15990) !== 0, n.subtreeFlags & 15990 || i) {
    i = Ne.transition, Ne.transition = null;
    var o = D;
    D = 1;
    var s = M;
    M |= 4, Do.current = null, Vf(e, n), cc(n, e), gf(_i), br = !!ji, _i = ji = null, e.current = n, Hf(n), wd(), M = s, D = o, Ne.transition = i;
  } else e.current = n;
  if (_r && (_r = !1, lt = e, il = l), i = e.pendingLanes, i === 0 && (ct = null), jd(n.stateNode), me(e, K()), t !== null) for (r = e.onRecoverableError, n = 0; n < t.length; n++) l = t[n], r(l.value, { componentStack: l.stack, digest: l.digest });
  if (ll) throw ll = !1, e = Vi, Vi = null, e;
  return il & 1 && e.tag !== 0 && en(), i = e.pendingLanes, i & 1 ? e === Hi ? On++ : (On = 0, Hi = e) : On = 0, vt(), null;
}
function en() {
  if (lt !== null) {
    var e = Xa(il), t = Ne.transition, n = D;
    try {
      if (Ne.transition = null, D = 16 > e ? 16 : e, lt === null) var r = !1;
      else {
        if (e = lt, lt = null, il = 0, M & 6) throw Error(j(331));
        var l = M;
        for (M |= 4, E = e.current; E !== null; ) {
          var i = E, o = i.child;
          if (E.flags & 16) {
            var s = i.deletions;
            if (s !== null) {
              for (var u = 0; u < s.length; u++) {
                var c = s[u];
                for (E = c; E !== null; ) {
                  var m = E;
                  switch (m.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Rn(8, m, i);
                  }
                  var v = m.child;
                  if (v !== null) v.return = m, E = v;
                  else for (; E !== null; ) {
                    m = E;
                    var g = m.sibling, y = m.return;
                    if (sc(m), m === c) {
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
              E = i;
            }
          }
          if (i.subtreeFlags & 2064 && o !== null) o.return = i, E = o;
          else e: for (; E !== null; ) {
            if (i = E, i.flags & 2048) switch (i.tag) {
              case 0:
              case 11:
              case 15:
                Rn(9, i, i.return);
            }
            var f = i.sibling;
            if (f !== null) {
              f.return = i.return, E = f;
              break e;
            }
            E = i.return;
          }
        }
        var d = e.current;
        for (E = d; E !== null; ) {
          o = E;
          var p = o.child;
          if (o.subtreeFlags & 2064 && p !== null) p.return = o, E = p;
          else e: for (o = d; E !== null; ) {
            if (s = E, s.flags & 2048) try {
              switch (s.tag) {
                case 0:
                case 11:
                case 15:
                  yl(9, s);
              }
            } catch (h) {
              H(s, s.return, h);
            }
            if (s === o) {
              E = null;
              break e;
            }
            var w = s.sibling;
            if (w !== null) {
              w.return = s.return, E = w;
              break e;
            }
            E = s.return;
          }
        }
        if (M = l, vt(), Be && typeof Be.onPostCommitFiberRoot == "function") try {
          Be.onPostCommitFiberRoot(cl, e);
        } catch {
        }
        r = !0;
      }
      return r;
    } finally {
      D = n, Ne.transition = t;
    }
  }
  return !1;
}
function la(e, t, n) {
  t = sn(n, t), t = Xu(e, t, 1), e = ut(e, t, 1), t = ae(), e !== null && (nr(e, 1, t), me(e, t));
}
function H(e, t, n) {
  if (e.tag === 3) la(e, e, n);
  else for (; t !== null; ) {
    if (t.tag === 3) {
      la(t, e, n);
      break;
    } else if (t.tag === 1) {
      var r = t.stateNode;
      if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (ct === null || !ct.has(r))) {
        e = sn(n, e), e = Zu(t, e, 1), t = ut(t, e, 1), e = ae(), t !== null && (nr(t, 1, e), me(t, e));
        break;
      }
    }
    t = t.return;
  }
}
function Zf(e, t, n) {
  var r = e.pingCache;
  r !== null && r.delete(t), t = ae(), e.pingedLanes |= e.suspendedLanes & n, q === e && (te & n) === n && (X === 4 || X === 3 && (te & 130023424) === te && 500 > K() - Io ? Ct(e, 0) : Fo |= n), me(e, t);
}
function vc(e, t) {
  t === 0 && (e.mode & 1 ? (t = hr, hr <<= 1, !(hr & 130023424) && (hr = 4194304)) : t = 1);
  var n = ae();
  e = Ye(e, t), e !== null && (nr(e, t, n), me(e, n));
}
function Jf(e) {
  var t = e.memoizedState, n = 0;
  t !== null && (n = t.retryLane), vc(e, n);
}
function qf(e, t) {
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
      throw Error(j(314));
  }
  r !== null && r.delete(t), vc(e, n);
}
var yc;
yc = function(e, t, n) {
  if (e !== null) if (e.memoizedProps !== t.pendingProps || pe.current) fe = !0;
  else {
    if (!(e.lanes & n) && !(t.flags & 128)) return fe = !1, Bf(e, t, n);
    fe = !!(e.flags & 131072);
  }
  else fe = !1, A && t.flags & 1048576 && Su(t, Xr, t.index);
  switch (t.lanes = 0, t.tag) {
    case 2:
      var r = t.type;
      Mr(e, t), e = t.pendingProps;
      var l = nn(t, oe.current);
      qt(t, n), l = $o(null, t, r, e, l, n);
      var i = Lo();
      return t.flags |= 1, typeof l == "object" && l !== null && typeof l.render == "function" && l.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, he(r) ? (i = !0, Gr(t)) : i = !1, t.memoizedState = l.state !== null && l.state !== void 0 ? l.state : null, Co(t), l.updater = vl, t.stateNode = l, l._reactInternals = t, Ri(t, r, e, n), t = Di(null, t, r, !0, i, n)) : (t.tag = 0, A && i && xo(t), se(null, t, l, n), t = t.child), t;
    case 16:
      r = t.elementType;
      e: {
        switch (Mr(e, t), e = t.pendingProps, l = r._init, r = l(r._payload), t.type = r, l = t.tag = tp(r), e = $e(r, e), l) {
          case 0:
            t = Oi(null, t, r, e, n);
            break e;
          case 1:
            t = Gs(null, t, r, e, n);
            break e;
          case 11:
            t = Qs(null, t, r, e, n);
            break e;
          case 14:
            t = Ks(null, t, r, $e(r.type, e), n);
            break e;
        }
        throw Error(j(
          306,
          r,
          ""
        ));
      }
      return t;
    case 0:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : $e(r, l), Oi(e, t, r, l, n);
    case 1:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : $e(r, l), Gs(e, t, r, l, n);
    case 3:
      e: {
        if (tc(t), e === null) throw Error(j(387));
        r = t.pendingProps, i = t.memoizedState, l = i.element, zu(e, t), qr(t, r, null, n);
        var o = t.memoizedState;
        if (r = o.element, i.isDehydrated) if (i = { element: r, isDehydrated: !1, cache: o.cache, pendingSuspenseBoundaries: o.pendingSuspenseBoundaries, transitions: o.transitions }, t.updateQueue.baseState = i, t.memoizedState = i, t.flags & 256) {
          l = sn(Error(j(423)), t), t = Ys(e, t, r, n, l);
          break e;
        } else if (r !== l) {
          l = sn(Error(j(424)), t), t = Ys(e, t, r, n, l);
          break e;
        } else for (ve = at(t.stateNode.containerInfo.firstChild), ye = t, A = !0, Re = null, n = Cu(t, null, r, n), t.child = n; n; ) n.flags = n.flags & -3 | 4096, n = n.sibling;
        else {
          if (rn(), r === l) {
            t = Xe(e, t, n);
            break e;
          }
          se(e, t, r, n);
        }
        t = t.child;
      }
      return t;
    case 5:
      return Pu(t), e === null && Ti(t), r = t.type, l = t.pendingProps, i = e !== null ? e.memoizedProps : null, o = l.children, Ni(r, l) ? o = null : i !== null && Ni(r, i) && (t.flags |= 32), ec(e, t), se(e, t, o, n), t.child;
    case 6:
      return e === null && Ti(t), null;
    case 13:
      return nc(e, t, n);
    case 4:
      return Eo(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = ln(t, null, r, n) : se(e, t, r, n), t.child;
    case 11:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : $e(r, l), Qs(e, t, r, l, n);
    case 7:
      return se(e, t, t.pendingProps, n), t.child;
    case 8:
      return se(e, t, t.pendingProps.children, n), t.child;
    case 12:
      return se(e, t, t.pendingProps.children, n), t.child;
    case 10:
      e: {
        if (r = t.type._context, l = t.pendingProps, i = t.memoizedProps, o = l.value, I(Zr, r._currentValue), r._currentValue = o, i !== null) if (De(i.value, o)) {
          if (i.children === l.children && !pe.current) {
            t = Xe(e, t, n);
            break e;
          }
        } else for (i = t.child, i !== null && (i.return = t); i !== null; ) {
          var s = i.dependencies;
          if (s !== null) {
            o = i.child;
            for (var u = s.firstContext; u !== null; ) {
              if (u.context === r) {
                if (i.tag === 1) {
                  u = Qe(-1, n & -n), u.tag = 2;
                  var c = i.updateQueue;
                  if (c !== null) {
                    c = c.shared;
                    var m = c.pending;
                    m === null ? u.next = u : (u.next = m.next, m.next = u), c.pending = u;
                  }
                }
                i.lanes |= n, u = i.alternate, u !== null && (u.lanes |= n), $i(
                  i.return,
                  n,
                  t
                ), s.lanes |= n;
                break;
              }
              u = u.next;
            }
          } else if (i.tag === 10) o = i.type === t.type ? null : i.child;
          else if (i.tag === 18) {
            if (o = i.return, o === null) throw Error(j(341));
            o.lanes |= n, s = o.alternate, s !== null && (s.lanes |= n), $i(o, n, t), o = i.sibling;
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
        se(e, t, l.children, n), t = t.child;
      }
      return t;
    case 9:
      return l = t.type, r = t.pendingProps.children, qt(t, n), l = Ee(l), r = r(l), t.flags |= 1, se(e, t, r, n), t.child;
    case 14:
      return r = t.type, l = $e(r, t.pendingProps), l = $e(r.type, l), Ks(e, t, r, l, n);
    case 15:
      return Ju(e, t, t.type, t.pendingProps, n);
    case 17:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : $e(r, l), Mr(e, t), t.tag = 1, he(r) ? (e = !0, Gr(t)) : e = !1, qt(t, n), Yu(t, r, l), Ri(t, r, l, n), Di(null, t, r, !0, e, n);
    case 19:
      return rc(e, t, n);
    case 22:
      return qu(e, t, n);
  }
  throw Error(j(156, t.tag));
};
function xc(e, t) {
  return Qa(e, t);
}
function ep(e, t, n, r) {
  this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
}
function _e(e, t, n, r) {
  return new ep(e, t, n, r);
}
function Wo(e) {
  return e = e.prototype, !(!e || !e.isReactComponent);
}
function tp(e) {
  if (typeof e == "function") return Wo(e) ? 1 : 0;
  if (e != null) {
    if (e = e.$$typeof, e === oo) return 11;
    if (e === so) return 14;
  }
  return 2;
}
function ft(e, t) {
  var n = e.alternate;
  return n === null ? (n = _e(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 14680064, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n;
}
function Fr(e, t, n, r, l, i) {
  var o = 2;
  if (r = e, typeof e == "function") Wo(e) && (o = 1);
  else if (typeof e == "string") o = 5;
  else e: switch (e) {
    case Ft:
      return Et(n.children, l, i, t);
    case io:
      o = 8, l |= 8;
      break;
    case ri:
      return e = _e(12, n, t, l | 2), e.elementType = ri, e.lanes = i, e;
    case li:
      return e = _e(13, n, t, l), e.elementType = li, e.lanes = i, e;
    case ii:
      return e = _e(19, n, t, l), e.elementType = ii, e.lanes = i, e;
    case Pa:
      return wl(n, l, i, t);
    default:
      if (typeof e == "object" && e !== null) switch (e.$$typeof) {
        case Ea:
          o = 10;
          break e;
        case za:
          o = 9;
          break e;
        case oo:
          o = 11;
          break e;
        case so:
          o = 14;
          break e;
        case qe:
          o = 16, r = null;
          break e;
      }
      throw Error(j(130, e == null ? e : typeof e, ""));
  }
  return t = _e(o, n, t, l), t.elementType = e, t.type = r, t.lanes = i, t;
}
function Et(e, t, n, r) {
  return e = _e(7, e, r, t), e.lanes = n, e;
}
function wl(e, t, n, r) {
  return e = _e(22, e, r, t), e.elementType = Pa, e.lanes = n, e.stateNode = { isHidden: !1 }, e;
}
function ql(e, t, n) {
  return e = _e(6, e, null, t), e.lanes = n, e;
}
function ei(e, t, n) {
  return t = _e(4, e.children !== null ? e.children : [], e.key, t), t.lanes = n, t.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }, t;
}
function np(e, t, n, r, l) {
  this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = Ml(0), this.expirationTimes = Ml(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Ml(0), this.identifierPrefix = r, this.onRecoverableError = l, this.mutableSourceEagerHydrationData = null;
}
function bo(e, t, n, r, l, i, o, s, u) {
  return e = new np(e, t, n, s, u), t === 1 ? (t = 1, i === !0 && (t |= 8)) : t = 0, i = _e(3, null, null, t), e.current = i, i.stateNode = e, i.memoizedState = { element: r, isDehydrated: n, cache: null, transitions: null, pendingSuspenseBoundaries: null }, Co(i), e;
}
function rp(e, t, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return { $$typeof: Dt, key: r == null ? null : "" + r, children: e, containerInfo: t, implementation: n };
}
function wc(e) {
  if (!e) return ht;
  e = e._reactInternals;
  e: {
    if (Mt(e) !== e || e.tag !== 1) throw Error(j(170));
    var t = e;
    do {
      switch (t.tag) {
        case 3:
          t = t.stateNode.context;
          break e;
        case 1:
          if (he(t.type)) {
            t = t.stateNode.__reactInternalMemoizedMergedChildContext;
            break e;
          }
      }
      t = t.return;
    } while (t !== null);
    throw Error(j(171));
  }
  if (e.tag === 1) {
    var n = e.type;
    if (he(n)) return wu(e, n, t);
  }
  return t;
}
function kc(e, t, n, r, l, i, o, s, u) {
  return e = bo(n, r, !0, e, l, i, o, s, u), e.context = wc(null), n = e.current, r = ae(), l = dt(n), i = Qe(r, l), i.callback = t ?? null, ut(n, i, l), e.current.lanes = l, nr(e, l, r), me(e, r), e;
}
function kl(e, t, n, r) {
  var l = t.current, i = ae(), o = dt(l);
  return n = wc(n), t.context === null ? t.context = n : t.pendingContext = n, t = Qe(i, o), t.payload = { element: e }, r = r === void 0 ? null : r, r !== null && (t.callback = r), e = ut(l, t, o), e !== null && (Oe(e, l, o, i), $r(e, l, o)), o;
}
function sl(e) {
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
function Vo(e, t) {
  ia(e, t), (e = e.alternate) && ia(e, t);
}
function lp() {
  return null;
}
var Sc = typeof reportError == "function" ? reportError : function(e) {
  console.error(e);
};
function Ho(e) {
  this._internalRoot = e;
}
Sl.prototype.render = Ho.prototype.render = function(e) {
  var t = this._internalRoot;
  if (t === null) throw Error(j(409));
  kl(e, t, null, null);
};
Sl.prototype.unmount = Ho.prototype.unmount = function() {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    Lt(function() {
      kl(null, e, null, null);
    }), t[Ge] = null;
  }
};
function Sl(e) {
  this._internalRoot = e;
}
Sl.prototype.unstable_scheduleHydration = function(e) {
  if (e) {
    var t = qa();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < tt.length && t !== 0 && t < tt[n].priority; n++) ;
    tt.splice(n, 0, e), n === 0 && tu(e);
  }
};
function Qo(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
}
function jl(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "));
}
function oa() {
}
function ip(e, t, n, r, l) {
  if (l) {
    if (typeof r == "function") {
      var i = r;
      r = function() {
        var c = sl(o);
        i.call(c);
      };
    }
    var o = kc(t, r, e, 0, null, !1, !1, "", oa);
    return e._reactRootContainer = o, e[Ge] = o.current, Hn(e.nodeType === 8 ? e.parentNode : e), Lt(), o;
  }
  for (; l = e.lastChild; ) e.removeChild(l);
  if (typeof r == "function") {
    var s = r;
    r = function() {
      var c = sl(u);
      s.call(c);
    };
  }
  var u = bo(e, 0, !1, null, null, !1, !1, "", oa);
  return e._reactRootContainer = u, e[Ge] = u.current, Hn(e.nodeType === 8 ? e.parentNode : e), Lt(function() {
    kl(t, u, n, r);
  }), u;
}
function _l(e, t, n, r, l) {
  var i = n._reactRootContainer;
  if (i) {
    var o = i;
    if (typeof l == "function") {
      var s = l;
      l = function() {
        var u = sl(o);
        s.call(u);
      };
    }
    kl(t, o, e, l);
  } else o = ip(n, t, e, l, r);
  return sl(o);
}
Za = function(e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = Nn(t.pendingLanes);
        n !== 0 && (co(t, n | 1), me(t, K()), !(M & 6) && (an = K() + 500, vt()));
      }
      break;
    case 13:
      Lt(function() {
        var r = Ye(e, 1);
        if (r !== null) {
          var l = ae();
          Oe(r, e, 1, l);
        }
      }), Vo(e, 1);
  }
};
fo = function(e) {
  if (e.tag === 13) {
    var t = Ye(e, 134217728);
    if (t !== null) {
      var n = ae();
      Oe(t, e, 134217728, n);
    }
    Vo(e, 134217728);
  }
};
Ja = function(e) {
  if (e.tag === 13) {
    var t = dt(e), n = Ye(e, t);
    if (n !== null) {
      var r = ae();
      Oe(n, e, t, r);
    }
    Vo(e, t);
  }
};
qa = function() {
  return D;
};
eu = function(e, t) {
  var n = D;
  try {
    return D = e, t();
  } finally {
    D = n;
  }
};
mi = function(e, t, n) {
  switch (t) {
    case "input":
      if (ai(e, n), t = n.name, n.type === "radio" && t != null) {
        for (n = e; n.parentNode; ) n = n.parentNode;
        for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < n.length; t++) {
          var r = n[t];
          if (r !== e && r.form === e.form) {
            var l = hl(r);
            if (!l) throw Error(j(90));
            $a(r), ai(r, l);
          }
        }
      }
      break;
    case "textarea":
      Ra(e, n);
      break;
    case "select":
      t = n.value, t != null && Yt(e, !!n.multiple, t, !1);
  }
};
Ba = Uo;
Aa = Lt;
var op = { usingClientEntryPoint: !1, Events: [lr, At, hl, Ia, Ua, Uo] }, Sn = { findFiberByHostInstance: St, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, sp = { bundleType: Sn.bundleType, version: Sn.version, rendererPackageName: Sn.rendererPackageName, rendererConfig: Sn.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: Ze.ReactCurrentDispatcher, findHostInstanceByFiber: function(e) {
  return e = Va(e), e === null ? null : e.stateNode;
}, findFiberByHostInstance: Sn.findFiberByHostInstance || lp, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var Nr = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!Nr.isDisabled && Nr.supportsFiber) try {
    cl = Nr.inject(sp), Be = Nr;
  } catch {
  }
}
we.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = op;
we.createPortal = function(e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!Qo(t)) throw Error(j(200));
  return rp(e, t, null, n);
};
we.createRoot = function(e, t) {
  if (!Qo(e)) throw Error(j(299));
  var n = !1, r = "", l = Sc;
  return t != null && (t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onRecoverableError !== void 0 && (l = t.onRecoverableError)), t = bo(e, 1, !1, null, null, n, !1, r, l), e[Ge] = t.current, Hn(e.nodeType === 8 ? e.parentNode : e), new Ho(t);
};
we.findDOMNode = function(e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function" ? Error(j(188)) : (e = Object.keys(e).join(","), Error(j(268, e)));
  return e = Va(t), e = e === null ? null : e.stateNode, e;
};
we.flushSync = function(e) {
  return Lt(e);
};
we.hydrate = function(e, t, n) {
  if (!jl(t)) throw Error(j(200));
  return _l(null, e, t, !0, n);
};
we.hydrateRoot = function(e, t, n) {
  if (!Qo(e)) throw Error(j(405));
  var r = n != null && n.hydratedSources || null, l = !1, i = "", o = Sc;
  if (n != null && (n.unstable_strictMode === !0 && (l = !0), n.identifierPrefix !== void 0 && (i = n.identifierPrefix), n.onRecoverableError !== void 0 && (o = n.onRecoverableError)), t = kc(t, null, e, 1, n ?? null, l, !1, i, o), e[Ge] = t.current, Hn(e), r) for (e = 0; e < r.length; e++) n = r[e], l = n._getVersion, l = l(n._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [n, l] : t.mutableSourceEagerHydrationData.push(
    n,
    l
  );
  return new Sl(t);
};
we.render = function(e, t, n) {
  if (!jl(t)) throw Error(j(200));
  return _l(null, e, t, !1, n);
};
we.unmountComponentAtNode = function(e) {
  if (!jl(e)) throw Error(j(40));
  return e._reactRootContainer ? (Lt(function() {
    _l(null, null, e, !1, function() {
      e._reactRootContainer = null, e[Ge] = null;
    });
  }), !0) : !1;
};
we.unstable_batchedUpdates = Uo;
we.unstable_renderSubtreeIntoContainer = function(e, t, n, r) {
  if (!jl(n)) throw Error(j(200));
  if (e == null || e._reactInternals === void 0) throw Error(j(38));
  return _l(e, t, n, !1, r);
};
we.version = "18.3.1-next-f1338f8080-20240426";
function jc() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(jc);
    } catch (e) {
      console.error(e);
    }
}
jc(), ja.exports = we;
var ap = ja.exports, _c, sa = ap;
_c = sa.createRoot, sa.hydrateRoot;
function O({ name: e, className: t }) {
  return /* @__PURE__ */ a.jsx("span", { className: `icon-wrap ${t ?? ""}`, "aria-hidden": "true", children: /* @__PURE__ */ a.jsx("ha-icon", { icon: e.includes(":") ? e : `mdi:${e}` }) });
}
function up() {
  return /* @__PURE__ */ a.jsxs("span", { className: "logo", "aria-hidden": "true", children: [
    /* @__PURE__ */ a.jsx("span", { className: "logo-ring" }),
    /* @__PURE__ */ a.jsxs("svg", { viewBox: "0 0 512 512", children: [
      /* @__PURE__ */ a.jsx("defs", { children: /* @__PURE__ */ a.jsxs("linearGradient", { id: "hrs-logo", x1: "0", y1: "0", x2: "1", y2: "1", children: [
        /* @__PURE__ */ a.jsx("stop", { offset: "0", stopColor: "#ffb020" }),
        /* @__PURE__ */ a.jsx("stop", { offset: ".5", stopColor: "#ff4f8b" }),
        /* @__PURE__ */ a.jsx("stop", { offset: "1", stopColor: "#5b6bff" })
      ] }) }),
      /* @__PURE__ */ a.jsx(
        "path",
        {
          fill: "url(#hrs-logo)",
          d: "M256 136C314 136 356 180 356 234C356 270 338 294 318 314C302 330 296 344 296 360L216 360C216 344 210 330 194 314C174 294 156 270 156 234C156 180 198 136 256 136Z"
        }
      ),
      /* @__PURE__ */ a.jsx("rect", { x: "216", y: "374", width: "80", height: "22", rx: "11", fill: "url(#hrs-logo)" })
    ] })
  ] });
}
const Nt = "No area", cp = {
  RDM002: "Hue Tap Dial",
  RWL020: "Hue Dimmer switch",
  RWL021: "Hue Dimmer switch",
  RWL022: "Hue Dimmer switch",
  ROM001: "Hue Smart button"
}, Dn = (e) => e.model === "RDM002", Gi = (e) => Dn(e) ? { press: "one of the dial's four buttons", rest: "Turn to dim · hold a button for off" } : { press: "the Hue button", rest: "Power button turns on/off · up/down dim" }, Nc = (e) => e.model && cp[e.model] || [e.manufacturer, e.model].filter(Boolean).join(" ");
function Ko(e, t) {
  const n = e.dial, r = n ? t.find((o) => o.id === n.group_id) : void 0, l = !!n && e.bound.some((o) => o.group_id === n.group_id), i = !!n && !!r && n.buttons.every(([, o]) => r.scenes.some((s) => s.id === o));
  return { found: !!n, group: r, bound: l, saved: i, done: [!!n, !!r, l, i].filter(Boolean).length };
}
function or(e, t) {
  if (e.dial_supported)
    return Ko(e, t).done === 4 ? { state: "ok", label: "Set up" } : !e.dial && !e.bound.length ? { state: "idle", label: "Not set up" } : { state: "attention", label: "Needs set-up" };
  const n = e.bound.length;
  return n ? { state: "ok", label: n > 1 ? `Bound to ${n}` : "Bound" } : { state: "idle", label: "Not bound" };
}
function dp(e, t, n) {
  const r = /* @__PURE__ */ new Map(), l = (i) => {
    let o = r.get(i);
    return o || (o = { name: i, icon: n[i] || "mdi:home-outline", groups: [], remotes: [], attention: [] }, r.set(i, o)), o;
  };
  for (const i of e) l(i.areas[0] ?? Nt).groups.push(i);
  for (const i of t) {
    const o = l(i.area ?? Nt);
    o.remotes.push(i), or(i, e).state === "attention" && o.attention.push(i);
  }
  return [...r.values()].sort(
    (i, o) => +(o.attention.length > 0) - +(i.attention.length > 0) || +(i.name === Nt) - +(o.name === Nt) || i.name.localeCompare(o.name)
  );
}
const Gt = (e, t) => {
  var n;
  return !!t && ((n = e.states[t]) == null ? void 0 : n.state) === "on";
}, Cc = (e, t) => t.reduce((n, r) => n + r.members.filter((l) => Gt(e, l.entity_id)).length, 0), fp = (e) => e.reduce((t, n) => t + n.members.length, 0);
function Go(e) {
  if (!(e != null && e.length)) return "var(--hrs-swatch-unknown)";
  const t = e.filter((l) => !!l);
  if (!t.length) return "linear-gradient(135deg, #2b2f3a, #12141a)";
  const n = ([l, i, o, s]) => {
    const u = 0.35 + 0.65 * (s / 255);
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
function Ec(e) {
  if ((e == null ? void 0 : e.state) !== "on") return null;
  const [t, n, r] = e.attributes.rgb_color ?? [255, 214, 170], l = 0.45 + 0.55 * ((e.attributes.brightness ?? 255) / 255);
  return `rgb(${Math.round(t * l)}, ${Math.round(n * l)}, ${Math.round(r * l)})`;
}
const zc = (e) => e.flatMap((t) => t.entity_id ? [t.entity_id] : t.members.filter((n) => n.entity_id).map((n) => n.entity_id));
function Pc(e) {
  const t = e.map(([n, r, l, i]) => (0.299 * n + 0.587 * r + 0.114 * l) / 255 * (0.35 + 0.65 * (i / 255)));
  return t.reduce((n, r) => n + r, 0) / t.length;
}
const pp = (e) => {
  const t = (e ?? []).filter((n) => !!n);
  return e != null && e.length ? !!t.length && Pc(t) > 0.62 : !0;
};
function Tc(e, t) {
  const n = [];
  for (const o of t)
    for (const s of o.members) {
      const u = s.entity_id ? e.states[s.entity_id] : void 0;
      (u == null ? void 0 : u.state) === "on" && n.push([...u.attributes.rgb_color ?? [255, 214, 170], u.attributes.brightness ?? 255]);
    }
  if (!n.length) return null;
  const r = [...new Set(n.map((o) => Ec({ state: "on", attributes: { rgb_color: o.slice(0, 3), brightness: o[3] } })))].slice(0, 3), l = r.length === 1 ? [r[0], `color-mix(in srgb, ${r[0]} 70%, black)`] : r, i = Math.min(0.5, Math.max(0.15, (Pc(n) - 0.35) * 0.9));
  return `linear-gradient(rgba(0,0,0,${i.toFixed(2)}), rgba(0,0,0,${i.toFixed(2)})), linear-gradient(120deg, ${l.join(", ")})`;
}
function $c(e, t) {
  const n = t.flatMap((r) => r.members.map((l) => l.entity_id ? e.states[l.entity_id] : void 0)).filter((r) => (r == null ? void 0 : r.state) === "on");
  return n.length ? Math.round(n.reduce((r, l) => r + (l.attributes.brightness ?? 255), 0) / n.length / 2.55) : 0;
}
function hp({ scene: e, badge: t, disabled: n, onRecall: r }) {
  return /* @__PURE__ */ a.jsxs("button", { className: "chip-btn scene-chip", disabled: n, onClick: r, title: `Recall ${e.name}`, children: [
    /* @__PURE__ */ a.jsx("span", { className: "dot", style: { background: Go(e.colors) } }),
    e.name,
    t && /* @__PURE__ */ a.jsx("span", { className: "badge", children: t })
  ] });
}
function Yi({ scene: e, badge: t, warn: n, busy: r, onRecall: l, onOverwrite: i, onRename: o, onDelete: s }) {
  const [u, c] = R.useState(!1), [m, v] = R.useState(!1), [g, y] = R.useState(e.name);
  return m ? /* @__PURE__ */ a.jsxs(
    "form",
    {
      className: "tile tile-form",
      onSubmit: (x) => {
        x.preventDefault(), v(!1), g.trim() && g !== e.name && (o == null || o(g));
      },
      children: [
        /* @__PURE__ */ a.jsx("input", { type: "text", value: g, maxLength: 40, autoFocus: !0, onChange: (x) => y(x.target.value), "aria-label": "Scene name" }),
        /* @__PURE__ */ a.jsxs("div", { className: "tile-form-actions", children: [
          /* @__PURE__ */ a.jsx("button", { type: "button", className: "ghost", onClick: () => v(!1), children: "Cancel" }),
          /* @__PURE__ */ a.jsx("button", { type: "submit", className: "primary", children: "Save" })
        ] })
      ]
    }
  ) : /* @__PURE__ */ a.jsxs("div", { className: `tile-wrap ${pp(e.colors) ? "pale" : ""}`, children: [
    /* @__PURE__ */ a.jsxs("button", { className: "tile", style: { background: Go(e.colors) }, disabled: r, onClick: l, title: `Recall ${e.name}`, children: [
      t && /* @__PURE__ */ a.jsx("span", { className: "badge", children: t }),
      /* @__PURE__ */ a.jsx("span", { className: "tile-name", children: e.name }),
      n && /* @__PURE__ */ a.jsx("span", { className: "tile-warn", children: n })
    ] }),
    /* @__PURE__ */ a.jsx("button", { className: "tile-more", disabled: r, onClick: () => c(!u), "aria-label": `More for ${e.name}`, children: /* @__PURE__ */ a.jsx(O, { name: "dots-vertical" }) }),
    u && /* @__PURE__ */ a.jsxs(a.Fragment, { children: [
      /* @__PURE__ */ a.jsx("div", { className: "menu-backdrop", onClick: () => c(!1) }),
      /* @__PURE__ */ a.jsxs("div", { className: "menu", role: "menu", children: [
        /* @__PURE__ */ a.jsxs("button", { role: "menuitem", onClick: () => {
          c(!1), i();
        }, children: [
          /* @__PURE__ */ a.jsx(O, { name: "content-save-edit-outline" }),
          " Save the lights' current state here"
        ] }),
        o && /* @__PURE__ */ a.jsxs("button", { role: "menuitem", onClick: () => {
          c(!1), y(e.name), v(!0);
        }, children: [
          /* @__PURE__ */ a.jsx(O, { name: "pencil-outline" }),
          " Rename"
        ] }),
        s && /* @__PURE__ */ a.jsxs("button", { role: "menuitem", className: "danger", onClick: () => {
          c(!1), s();
        }, children: [
          /* @__PURE__ */ a.jsx(O, { name: "delete-outline" }),
          " Delete"
        ] })
      ] })
    ] })
  ] });
}
function Xi({ badge: e, label: t, busy: n, onSave: r }) {
  const [l, i] = R.useState(!1), [o, s] = R.useState("");
  return l ? /* @__PURE__ */ a.jsxs(
    "form",
    {
      className: "tile tile-form",
      onSubmit: (u) => {
        u.preventDefault(), o.trim() && (r(o), s(""), i(!1));
      },
      children: [
        /* @__PURE__ */ a.jsx("input", { type: "text", placeholder: "Scene name", value: o, maxLength: 40, autoFocus: !0, onChange: (u) => s(u.target.value), "aria-label": "Scene name" }),
        /* @__PURE__ */ a.jsxs("div", { className: "tile-form-actions", children: [
          /* @__PURE__ */ a.jsx("button", { type: "button", className: "ghost", onClick: () => i(!1), children: "Cancel" }),
          /* @__PURE__ */ a.jsx("button", { type: "submit", className: "primary", disabled: n || !o.trim(), children: "Save" })
        ] })
      ]
    }
  ) : /* @__PURE__ */ a.jsxs("button", { className: "tile add", disabled: n, onClick: () => i(!0), children: [
    e ? /* @__PURE__ */ a.jsx("span", { className: "add-dots", children: e }) : /* @__PURE__ */ a.jsx(O, { name: "plus" }),
    /* @__PURE__ */ a.jsx("span", { children: t })
  ] });
}
function Zi(e, t) {
  var l, i;
  if (e.table_error) return " Couldn't read its other bindings to clear them; press a button and Bind again.";
  const n = (o) => [...new Set(o.map((s) => s.group_id != null ? t(s.group_id) : "a device directly"))].join(", ");
  let r = "";
  return (l = e.removed) != null && l.length && (r += ` Removed ${Ce(e.removed.length, "old binding")} (${n(e.removed)}).`), (i = e.remove_failed) != null && i.length && (r += ` Couldn't remove ${Ce(e.remove_failed.length, "binding")} (${n(e.remove_failed)}); Bind again.`), r;
}
const ua = { 6: "On/off", 8: "Dimming", 5: "Scenes" }, Lc = (e) => String((e == null ? void 0 : e.message) ?? e), al = (e) => `0x${e.toString(16).padStart(4, "0").toUpperCase()}`, er = (e) => /^\d/.test(e) ? "●".repeat(parseInt(e, 10)) : e.split(" ").pop(), Ce = (e, t) => `${e} ${t}${e === 1 ? "" : "s"}`;
function mp({ getHass: e, remote: t, groups: n, busy: r, act: l, onChanged: i }) {
  var p, w;
  const o = t.cycle, s = t.cycle_trigger, [u, c] = R.useState(!1), [m, v] = R.useState((o == null ? void 0 : o.group_id) ?? ((p = n.find((h) => h.scenes.length)) == null ? void 0 : p.id) ?? ((w = n[0]) == null ? void 0 : w.id) ?? 0), [g, y] = R.useState((o == null ? void 0 : o.scene_ids) ?? []), x = n.find((h) => h.id === m), S = o ? n.find((h) => h.id === o.group_id) : void 0, N = (h) => y((k) => k.includes(h) ? k.filter((_) => _ !== h) : [...k, h]), f = (h) => l(async () => (await e().callWS(
    h ? { type: "hue_remote_scenes/set_cycle", ieee: t.ieee } : { type: "hue_remote_scenes/set_cycle", ieee: t.ieee, group_id: m, scene_ids: g }
  ), c(!1), i(), h ? "Stopped cycling scenes." : `${s.label} now cycles ${Ce(g.length, "scene")}.`), "Saving…"), d = (h, k, _) => l(async () => (await e().callWS({ type: "hue_remote_scenes/recall", group_id: h, scene_id: k }), `Recalled ${_}`));
  return /* @__PURE__ */ a.jsxs("div", { className: "stack-sm", children: [
    /* @__PURE__ */ a.jsx("h3", { children: "Scene cycle" }),
    !u && o && S && /* @__PURE__ */ a.jsxs(a.Fragment, { children: [
      /* @__PURE__ */ a.jsx("div", { className: "chips", children: o.scene_ids.map((h, k) => {
        const _ = S.scenes.find((C) => C.id === h);
        return _ ? /* @__PURE__ */ a.jsx(hp, { scene: _, badge: String(k + 1), disabled: r, onRecall: () => d(S.id, h, _.name) }, h) : null;
      }) }),
      /* @__PURE__ */ a.jsxs("div", { className: "ctl muted small", children: [
        /* @__PURE__ */ a.jsx(O, { name: "sync" }),
        /* @__PURE__ */ a.jsxs("span", { className: "grow", children: [
          s.label,
          " recalls the next scene in ",
          S.name,
          ". Needs Home Assistant running."
        ] })
      ] }),
      /* @__PURE__ */ a.jsxs("div", { className: "actions", children: [
        /* @__PURE__ */ a.jsx("button", { className: "ghost", disabled: r, onClick: () => c(!0), children: "Change" }),
        /* @__PURE__ */ a.jsx("button", { className: "danger", disabled: r, onClick: () => f(!0), children: "Stop" })
      ] })
    ] }),
    !u && !o && /* @__PURE__ */ a.jsxs("div", { className: "inline-row", children: [
      /* @__PURE__ */ a.jsxs("span", { className: "muted small grow", children: [
        "It can't recall scenes itself, but while Home Assistant runs, ",
        s.label.toLowerCase(),
        " can step through scenes you pick."
      ] }),
      /* @__PURE__ */ a.jsx("button", { disabled: r || !n.length, onClick: () => c(!0), children: "Choose scenes" })
    ] }),
    u && /* @__PURE__ */ a.jsxs(a.Fragment, { children: [
      /* @__PURE__ */ a.jsx(
        "select",
        {
          value: m,
          disabled: !n.length,
          onChange: (h) => {
            v(+h.target.value), y([]);
          },
          "aria-label": "Group to cycle",
          children: n.map((h) => /* @__PURE__ */ a.jsxs("option", { value: h.id, children: [
            h.name,
            h.areas[0] ? ` (${h.areas[0]})` : ""
          ] }, h.id))
        }
      ),
      /* @__PURE__ */ a.jsxs("div", { className: "chips", children: [
        ((x == null ? void 0 : x.scenes) ?? []).map((h) => /* @__PURE__ */ a.jsxs("button", { className: `chip-btn ${g.includes(h.id) ? "on" : ""}`, onClick: () => N(h.id), children: [
          g.includes(h.id) && `${g.indexOf(h.id) + 1} · `,
          h.name
        ] }, h.id)),
        x && !x.scenes.length && /* @__PURE__ */ a.jsx("span", { className: "muted small", children: "Save some scenes in this group first." })
      ] }),
      /* @__PURE__ */ a.jsxs("div", { className: "actions", children: [
        /* @__PURE__ */ a.jsx("span", { className: "spacer" }),
        /* @__PURE__ */ a.jsx("button", { className: "ghost", disabled: r, onClick: () => c(!1), children: "Cancel" }),
        /* @__PURE__ */ a.jsx("button", { className: "primary", disabled: r || !g.length, onClick: () => f(!1), children: "Save cycle" })
      ] })
    ] })
  ] });
}
const gp = {
  // A ring you turn, with four buttons inside it.
  dial: /* @__PURE__ */ a.jsxs(a.Fragment, { children: [
    /* @__PURE__ */ a.jsx("circle", { cx: "12", cy: "12", r: "9" }),
    /* @__PURE__ */ a.jsx("circle", { cx: "12", cy: "12", r: "5.5" }),
    /* @__PURE__ */ a.jsx("circle", { cx: "10", cy: "10", r: ".9", fill: "currentColor", stroke: "none" }),
    /* @__PURE__ */ a.jsx("circle", { cx: "14", cy: "10", r: ".9", fill: "currentColor", stroke: "none" }),
    /* @__PURE__ */ a.jsx("circle", { cx: "10", cy: "14", r: ".9", fill: "currentColor", stroke: "none" }),
    /* @__PURE__ */ a.jsx("circle", { cx: "14", cy: "14", r: ".9", fill: "currentColor", stroke: "none" })
  ] }),
  // A tall plate: on, brighter, dimmer, off.
  dimmer: /* @__PURE__ */ a.jsxs(a.Fragment, { children: [
    /* @__PURE__ */ a.jsx("rect", { x: "6.5", y: "2.5", width: "11", height: "19", rx: "3" }),
    /* @__PURE__ */ a.jsx("path", { d: "M9.5 6.5h5M10.5 10.5h3M10.5 13.5h3M9.5 17.5h5" })
  ] }),
  // One round button on a square plate.
  button: /* @__PURE__ */ a.jsxs(a.Fragment, { children: [
    /* @__PURE__ */ a.jsx("rect", { x: "4", y: "4", width: "16", height: "16", rx: "5" }),
    /* @__PURE__ */ a.jsx("circle", { cx: "12", cy: "12", r: "3.5" })
  ] })
}, vp = (e) => {
  var n;
  if (Dn(e)) return "dial";
  const t = ((n = e.model) == null ? void 0 : n.toUpperCase()) ?? "";
  return t.startsWith("RWL") ? "dimmer" : t.startsWith("ROM") || t.startsWith("RDM003") ? "button" : null;
};
function Nl({ remote: e, className: t }) {
  const n = vp(e);
  return n ? /* @__PURE__ */ a.jsx("span", { className: `icon-wrap ${t ?? ""}`, "aria-hidden": "true", children: /* @__PURE__ */ a.jsx("svg", { className: "remote-svg", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.6", strokeLinecap: "round", strokeLinejoin: "round", children: gp[n] }) }) : /* @__PURE__ */ a.jsx(O, { name: e.endpoints.some((r) => r.clusters.includes(8)) ? "remote" : "gesture-tap-button", className: t });
}
function Yo() {
  const [e, t] = R.useState(!1), [n, r] = R.useState(null);
  return { busy: e, result: n, act: async (i, o = "Talking to the lights…") => {
    t(o), r(null);
    try {
      const s = await i();
      s && r({ kind: s.includes("didn't") ? "error" : "ok", text: s });
    } catch (s) {
      r({ kind: "error", text: Lc(s) });
    } finally {
      t(!1);
    }
  }, clear: () => r(null) };
}
const yp = [{ title: "Find group" }, { title: "Lights" }, { title: "Bind" }, { title: "Scenes" }];
function xp({ getHass: e, remote: t, groups: n, onChanged: r, onClose: l }) {
  const { busy: i, result: o, act: s, clear: u } = Yo(), c = Ko(t, n), [m, v] = R.useState(Math.min(c.done, 3)), g = t.dial, y = c.group;
  R.useEffect(() => {
    v((S) => Math.max(S, Math.min(c.done, 3)));
  }, [c.done]);
  const x = (S) => {
    u(), v(S);
  };
  return /* @__PURE__ */ a.jsxs("section", { className: "card remote", children: [
    /* @__PURE__ */ a.jsxs("div", { className: "card-head", children: [
      /* @__PURE__ */ a.jsxs("div", { className: "title", children: [
        /* @__PURE__ */ a.jsx(Nl, { remote: t, className: "title-icon" }),
        /* @__PURE__ */ a.jsxs("div", { children: [
          /* @__PURE__ */ a.jsxs("h2", { children: [
            "Set up ",
            t.name
          ] }),
          /* @__PURE__ */ a.jsx("div", { className: "muted small", children: "Scene buttons that work even when Home Assistant is down" })
        ] })
      ] }),
      /* @__PURE__ */ a.jsxs("button", { className: "ghost", onClick: l, disabled: !!i, children: [
        /* @__PURE__ */ a.jsx(O, { name: "close" }),
        " Close"
      ] })
    ] }),
    /* @__PURE__ */ a.jsx("div", { className: "segmented full steps", role: "tablist", children: yp.map((S, N) => {
      const f = [c.found, !!y, c.bound, c.saved][N];
      return /* @__PURE__ */ a.jsxs("button", { role: "tab", "aria-selected": N === m, className: `${N === m ? "on" : ""} ${f ? "done" : ""}`, onClick: () => x(N), disabled: !!i, children: [
        f && /* @__PURE__ */ a.jsx(O, { name: "check" }),
        S.title
      ] }, S.title);
    }) }),
    m === 0 && /* @__PURE__ */ a.jsx(wp, { getHass: e, remote: t, busy: !!i, act: s, onChanged: r }),
    m === 1 && (g ? /* @__PURE__ */ a.jsx(kp, { getHass: e, remote: t, group: y, busy: !!i, act: s, onChanged: r }) : /* @__PURE__ */ a.jsx(ti, {})),
    m === 2 && (g && y ? /* @__PURE__ */ a.jsx(Sp, { getHass: e, remote: t, group: y, bound: c.bound, busy: !!i, act: s, onChanged: r }) : /* @__PURE__ */ a.jsx(ti, {})),
    m === 3 && (g && y ? /* @__PURE__ */ a.jsx(jp, { getHass: e, remote: t, group: y, busy: !!i, act: s, onChanged: r }) : /* @__PURE__ */ a.jsx(ti, {})),
    i && /* @__PURE__ */ a.jsx("div", { className: "status busy", children: i }),
    o && /* @__PURE__ */ a.jsx("div", { className: `status ${o.kind}`, children: o.text }),
    /* @__PURE__ */ a.jsxs("div", { className: "card-actions", children: [
      m > 0 && /* @__PURE__ */ a.jsxs("button", { className: "ghost", disabled: !!i, onClick: () => x(m - 1), children: [
        /* @__PURE__ */ a.jsx(O, { name: "chevron-left" }),
        " Back"
      ] }),
      /* @__PURE__ */ a.jsx("span", { className: "spacer" }),
      m < 3 ? /* @__PURE__ */ a.jsxs("button", { className: "primary", disabled: !!i || c.done <= m, onClick: () => x(m + 1), children: [
        "Next ",
        /* @__PURE__ */ a.jsx(O, { name: "chevron-right" })
      ] }) : /* @__PURE__ */ a.jsx("button", { className: "primary", disabled: !!i, onClick: l, children: "Done" })
    ] })
  ] });
}
const ti = () => /* @__PURE__ */ a.jsx("p", { className: "muted", children: "Finish the earlier steps first." });
function wp({ getHass: e, remote: t, busy: n, act: r, onChanged: l }) {
  const i = () => r(async () => {
    const o = await e().callWS({ type: "hue_remote_scenes/find_dial_group", ieee: t.ieee });
    return l(), `Its scene buttons use group ${al(o.group_id)}${o.exists ? ", which ZHA already has" : ""}.`;
  }, `Press ${Gi(t).press} now, then again every few seconds until this finishes…`);
  return /* @__PURE__ */ a.jsxs("div", { className: "stack-sm", children: [
    /* @__PURE__ */ a.jsx("h2", { children: "Find the remote's group" }),
    /* @__PURE__ */ a.jsxs("p", { className: "muted", children: [
      "This remote recalls its scenes on its own built-in group. Press ",
      /* @__PURE__ */ a.jsx("strong", { children: "Find its group" }),
      ", then press",
      " ",
      Gi(t).press,
      " a few times so it wakes up and shows which group it uses."
    ] }),
    /* @__PURE__ */ a.jsxs("div", { className: "inline-row", children: [
      /* @__PURE__ */ a.jsxs("button", { className: t.dial ? "" : "primary", disabled: n, onClick: i, children: [
        /* @__PURE__ */ a.jsx(O, { name: "magnify" }),
        " ",
        t.dial ? "Find again" : "Find its group"
      ] }),
      t.dial && /* @__PURE__ */ a.jsxs("span", { className: "chip ok", children: [
        /* @__PURE__ */ a.jsx(O, { name: "check" }),
        " Uses group ",
        al(t.dial.group_id)
      ] })
    ] })
  ] });
}
function kp({ getHass: e, remote: t, group: n, busy: r, act: l, onChanged: i }) {
  const [o, s] = R.useState(null), [u, c] = R.useState(/* @__PURE__ */ new Set()), [m, v] = R.useState(t.name), g = e(), y = new Set((n == null ? void 0 : n.members.map((d) => d.key)) ?? []);
  R.useEffect(() => {
    e().callWS({ type: "hue_remote_scenes/lights" }).then((d) => s(d.lights)).catch(() => s([]));
  }, [e]);
  const x = (d) => c((p) => {
    const w = new Set(p);
    return w.has(d) ? w.delete(d) : w.add(d), w;
  }), S = () => l(async () => (await e().callWS({ type: "hue_remote_scenes/create_group", group_id: t.dial.group_id, name: (n == null ? void 0 : n.name) ?? m, members: [...u] }), c(/* @__PURE__ */ new Set()), i(), n ? `Added ${Ce(u.size, "light")} to ${n.name}.` : `Created ${m}. Next, bind the remote to it.`), "Adding the lights to the group…"), N = /* @__PURE__ */ new Map();
  for (const d of o ?? []) {
    const p = d.area ?? Nt;
    N.set(p, [...N.get(p) ?? [], d]);
  }
  const f = [...N.keys()].sort(
    (d, p) => +(p === t.area) - +(d === t.area) || +(d === Nt) - +(p === Nt) || d.localeCompare(p)
  );
  return /* @__PURE__ */ a.jsxs("div", { className: "stack-sm", children: [
    /* @__PURE__ */ a.jsx("h2", { children: n ? `Lights in ${n.name}` : "Which lights should it control?" }),
    /* @__PURE__ */ a.jsx("p", { className: "muted", children: n ? `${Ce(n.members.length, "light")} are in the remote's group. Tick more to add them.` : "They'll go in a new ZHA group with the remote's ID. Only lights that can store scenes are listed." }),
    !o && /* @__PURE__ */ a.jsx("p", { className: "muted", children: "Loading lights…" }),
    o && !o.length && /* @__PURE__ */ a.jsx("p", { className: "muted", children: "No lights that can store scenes found." }),
    f.map((d) => /* @__PURE__ */ a.jsxs("div", { className: "stack-sm", children: [
      /* @__PURE__ */ a.jsx("h3", { children: d }),
      /* @__PURE__ */ a.jsx("div", { className: "picks", children: N.get(d).map((p) => {
        const w = y.has(p.key), h = w || u.has(p.key);
        return /* @__PURE__ */ a.jsxs("label", { className: `pick ${h ? "on" : ""}`, children: [
          /* @__PURE__ */ a.jsx("input", { type: "checkbox", checked: h, disabled: w || r, onChange: () => x(p.key) }),
          /* @__PURE__ */ a.jsx("span", { className: `bulb ${Gt(g, p.entity_id) ? "lit" : ""}` }),
          /* @__PURE__ */ a.jsx("span", { children: p.name })
        ] }, p.key);
      }) })
    ] }, d)),
    !n && /* @__PURE__ */ a.jsxs("label", { className: "inline-row", children: [
      /* @__PURE__ */ a.jsx("span", { className: "muted", children: "Group name" }),
      /* @__PURE__ */ a.jsx("input", { type: "text", value: m, maxLength: 40, onChange: (d) => v(d.target.value) })
    ] }),
    /* @__PURE__ */ a.jsxs("div", { className: "inline-row", children: [
      /* @__PURE__ */ a.jsx("span", { className: "muted small spacer", children: u.size ? `${Ce(u.size, "light")} selected` : "" }),
      /* @__PURE__ */ a.jsxs("button", { className: "primary", disabled: r || !u.size || !n && !m.trim(), onClick: S, children: [
        /* @__PURE__ */ a.jsx(O, { name: "plus" }),
        " ",
        n ? "Add lights" : "Create group"
      ] })
    ] })
  ] });
}
function Sp({ getHass: e, remote: t, group: n, bound: r, busy: l, act: i, onChanged: o }) {
  const s = t.endpoints.find((c) => c.clusters.includes(5)) ?? t.endpoints[0], u = () => i(async () => {
    const c = await e().callWS({
      type: "hue_remote_scenes/bind",
      ieee: t.ieee,
      endpoint: s.id,
      group_id: n.id,
      clusters: s.clusters,
      unbind: !1,
      exclusive: !0
      // clear leftovers (other groups, direct device bindings)
    });
    o();
    const m = Object.entries(c.results).filter(([, g]) => g !== "ok");
    if (m.length === Object.keys(c.results).length) return "The remote didn't answer. Press one of its buttons and try again.";
    const v = Zi(c, (g) => g === n.id ? n.name : `Group ${al(g)}`);
    return m.length ? `Bound, but some parts didn't take (${m.map(([g, y]) => `${g}: ${y}`).join(", ")}). Try again.${v}` : `Bound to ${n.name}.${v}`;
  }, "Waiting for the remote… press one of its buttons.");
  return /* @__PURE__ */ a.jsxs("div", { className: "stack-sm", children: [
    /* @__PURE__ */ a.jsxs("h2", { children: [
      "Bind ",
      t.name,
      " to ",
      n.name
    ] }),
    /* @__PURE__ */ a.jsxs("p", { className: "muted", children: [
      "Binding makes the remote talk to the lights directly over Zigbee, and clears any other bindings it has (left over from Z2M, say). It's asleep most of the time:",
      " ",
      /* @__PURE__ */ a.jsx("strong", { children: "press one of its buttons" }),
      ", then press Bind."
    ] }),
    /* @__PURE__ */ a.jsxs("div", { className: "inline-row", children: [
      /* @__PURE__ */ a.jsxs("button", { className: "primary", disabled: l, onClick: u, children: [
        /* @__PURE__ */ a.jsx(O, { name: "link-variant-plus" }),
        " ",
        r ? "Bind again" : "Bind"
      ] }),
      r && /* @__PURE__ */ a.jsx("span", { className: "chip ok", children: "Bound" })
    ] })
  ] });
}
function jp({ getHass: e, remote: t, group: n, busy: r, act: l, onChanged: i }) {
  const o = (s, u) => l(async () => {
    const c = await e().callWS({ type: "hue_remote_scenes/store", group_id: n.id, scene_id: s, ...u ? { name: u } : {} });
    i();
    const m = Object.keys(c.failed).length;
    return m ? `Saved on ${c.ok.length} of ${c.ok.length + m} lights; some didn't answer.` : `Saved on ${Ce(c.ok.length, "light")}`;
  });
  return /* @__PURE__ */ a.jsxs("div", { className: "stack-sm", children: [
    /* @__PURE__ */ a.jsx("h2", { children: "Save a scene for each button" }),
    /* @__PURE__ */ a.jsxs("p", { className: "muted", children: [
      "Set the ",
      n.name,
      " lights how you want them for a button, then save. Do this for each one. You can change them later from the area."
    ] }),
    /* @__PURE__ */ a.jsx("div", { className: "tiles", children: t.dial.buttons.map(([s, u]) => {
      const c = n.scenes.find((m) => m.id === u);
      return c ? /* @__PURE__ */ a.jsx(
        Yi,
        {
          scene: c,
          badge: er(s),
          busy: r,
          onRecall: () => l(async () => (await e().callWS({ type: "hue_remote_scenes/recall", group_id: n.id, scene_id: u }), `Recalled ${c.name}`)),
          onOverwrite: () => confirm(`Save how the lights are now as "${c.name}"?`) && o(u)
        },
        u
      ) : /* @__PURE__ */ a.jsx(Xi, { badge: er(s), label: "Save current state", busy: r, onSave: (m) => o(u, m) }, u);
    }) })
  ] });
}
function _p({ getHass: e, remote: t, groups: n, onBack: r, onChanged: l }) {
  var N;
  const { busy: i, result: o, act: s } = Yo(), [u, c] = R.useState(!1), m = e(), v = or(t, n), g = Ko(t, n), y = t.dial_supported && g.done === 4, x = t.battery_entity ? (N = m.states[t.battery_entity]) == null ? void 0 : N.state : void 0, S = [
    Nc(t),
    x != null && x !== "unavailable" && x !== "unknown" ? `${Math.round(+x)}% battery` : null,
    t.bound.length ? "bound" : "not bound"
  ].filter(Boolean).join(" · ");
  return /* @__PURE__ */ a.jsxs("main", { className: "narrow", children: [
    /* @__PURE__ */ a.jsxs("nav", { className: "crumbs", children: [
      /* @__PURE__ */ a.jsx("button", { className: "link", onClick: r, children: "Remotes" }),
      /* @__PURE__ */ a.jsx(O, { name: "chevron-right" }),
      /* @__PURE__ */ a.jsx("span", { children: t.name })
    ] }),
    /* @__PURE__ */ a.jsxs("div", { className: "dev-head", children: [
      /* @__PURE__ */ a.jsx(Nl, { remote: t, className: "dev-icon" }),
      /* @__PURE__ */ a.jsxs("div", { className: "grow", children: [
        /* @__PURE__ */ a.jsx("h2", { className: "dev-name", children: t.name }),
        /* @__PURE__ */ a.jsx("div", { className: "muted", children: S })
      ] }),
      y ? /* @__PURE__ */ a.jsxs("span", { className: "chip ok", children: [
        /* @__PURE__ */ a.jsx(O, { name: "check" }),
        " Works without Home Assistant"
      ] }) : /* @__PURE__ */ a.jsx("span", { className: `chip ${v.state === "ok" ? "ok" : v.state === "attention" ? "warn" : ""}`, children: v.label })
    ] }),
    t.dial_supported && (!y || u) ? /* @__PURE__ */ a.jsx(
      xp,
      {
        getHass: e,
        remote: t,
        groups: n,
        onChanged: l,
        onClose: () => y ? c(!1) : r()
      }
    ) : y && g.group && t.dial ? /* @__PURE__ */ a.jsx(Np, { getHass: e, remote: t, group: g.group, busy: !!i, act: s, onChanged: l, onChangeLights: () => c(!0) }) : null,
    !t.dial_supported && /* @__PURE__ */ a.jsx(Cp, { getHass: e, remote: t, groups: n, busy: !!i, act: s, onChanged: l }),
    t.cycle_trigger && /* @__PURE__ */ a.jsx("section", { className: "card", children: /* @__PURE__ */ a.jsx(mp, { getHass: e, remote: t, groups: n, busy: !!i, act: s, onChanged: l }) }),
    i && /* @__PURE__ */ a.jsx("div", { className: "status busy", children: i }),
    o && /* @__PURE__ */ a.jsx("div", { className: `status ${o.kind}`, children: o.text }),
    /* @__PURE__ */ a.jsxs("p", { className: "muted small", children: [
      t.checked ? `Bindings last checked ${aa(t.checked)}.` : t.last_seen ? `Last seen ${aa(t.last_seen)}.` : "",
      " Battery remotes sleep: press a button on it just before changing anything here."
    ] })
  ] });
}
const ca = -1;
function Np({ getHass: e, remote: t, group: n, busy: r, act: l, onChanged: i, onChangeLights: o }) {
  const s = t.dial.buttons, u = new Set(s.map(([, v]) => v)), c = (v) => {
    const g = Object.keys(v.failed).length;
    return g ? `Saved on ${v.ok.length} of ${v.ok.length + g} lights; some didn't answer.` : `Saved on ${Ce(v.ok.length, "light")}.`;
  }, m = (v, g, y) => {
    const x = n.scenes.find((N) => N.id === g);
    if (y === ca) {
      const N = prompt(`Name for ${v}'s scene`, (x == null ? void 0 : x.name) ?? "");
      if (!(N != null && N.trim())) return;
      l(async () => {
        const f = await e().callWS({ type: "hue_remote_scenes/store", group_id: n.id, scene_id: g, name: N });
        return i(), c(f);
      });
      return;
    }
    const S = n.scenes.find((N) => N.id === y);
    l(async () => {
      const N = await e().callWS({ type: "hue_remote_scenes/copy", group_id: n.id, from_scene_id: y, scene_id: g });
      i();
      const f = Object.keys(N.failed).length;
      return f ? `${v} now recalls ${S.name} on ${N.ok.length} of ${N.ok.length + f} lights; some didn't answer.` : `${v} now recalls ${S.name}.`;
    }, "Copying the scene in the lights…");
  };
  return /* @__PURE__ */ a.jsxs(a.Fragment, { children: [
    /* @__PURE__ */ a.jsx("h3", { children: "Controls" }),
    /* @__PURE__ */ a.jsx("div", { className: "list", children: /* @__PURE__ */ a.jsxs("div", { className: "list-row static", children: [
      /* @__PURE__ */ a.jsx("span", { className: "btn-icon", children: /* @__PURE__ */ a.jsx(O, { name: "home-outline" }) }),
      /* @__PURE__ */ a.jsxs("span", { className: "grow", children: [
        /* @__PURE__ */ a.jsx("strong", { children: n.name }),
        /* @__PURE__ */ a.jsx("span", { className: "muted small row-detail", children: n.members.map((v) => v.name).join(", ") })
      ] }),
      /* @__PURE__ */ a.jsxs("button", { className: "ghost", disabled: r, onClick: o, children: [
        "Change lights ",
        /* @__PURE__ */ a.jsx(O, { name: "chevron-right" })
      ] })
    ] }) }),
    /* @__PURE__ */ a.jsx("h3", { children: "Buttons" }),
    /* @__PURE__ */ a.jsxs("div", { className: "list", children: [
      s.map(([v, g]) => {
        const y = n.scenes.find((x) => x.id === g);
        return /* @__PURE__ */ a.jsxs("div", { className: "list-row static", children: [
          /* @__PURE__ */ a.jsx("span", { className: "btn-icon", children: er(v) }),
          /* @__PURE__ */ a.jsxs("span", { className: "grow", children: [
            /* @__PURE__ */ a.jsx("strong", { children: /^\d/.test(v) ? `Button ${parseInt(v, 10)}` : v }),
            /* @__PURE__ */ a.jsx("span", { className: "muted small row-detail", children: y ? "Recalls this scene" : "Not set yet" })
          ] }),
          /* @__PURE__ */ a.jsxs("label", { className: "picker", children: [
            /* @__PURE__ */ a.jsx("span", { className: "picker-swatch", style: { background: y ? Go(y.colors) : "var(--hl-off-fill)" } }),
            /* @__PURE__ */ a.jsx("span", { className: "picker-name", children: (y == null ? void 0 : y.name) ?? "Choose…" }),
            /* @__PURE__ */ a.jsx("span", { className: "picker-chev", children: "▾" }),
            /* @__PURE__ */ a.jsxs(
              "select",
              {
                value: y ? g : "",
                disabled: r,
                onChange: (x) => x.target.value !== "" && m(v, g, +x.target.value),
                "aria-label": `Scene for ${v}`,
                children: [
                  !y && /* @__PURE__ */ a.jsx("option", { value: "", children: "Choose…" }),
                  y && /* @__PURE__ */ a.jsx("option", { value: g, children: y.name }),
                  n.scenes.filter((x) => !u.has(x.id)).map((x) => /* @__PURE__ */ a.jsx("option", { value: x.id, children: x.name }, x.id)),
                  /* @__PURE__ */ a.jsx("option", { value: ca, children: "Save the lights' current state…" })
                ]
              }
            )
          ] })
        ] }, g);
      }),
      /* @__PURE__ */ a.jsxs("div", { className: "list-row static", children: [
        /* @__PURE__ */ a.jsx("span", { className: "btn-icon", children: /* @__PURE__ */ a.jsx(O, { name: Dn(t) ? "rotate-right" : "brightness-6" }) }),
        /* @__PURE__ */ a.jsxs("span", { className: "grow", children: [
          /* @__PURE__ */ a.jsx("strong", { children: Dn(t) ? "Dial" : "Other buttons" }),
          /* @__PURE__ */ a.jsx("span", { className: "muted small row-detail", children: Dn(t) ? `Dims ${n.name}. Hold any button to turn it off.` : `${Gi(t).rest} · ${n.name}` })
        ] })
      ] })
    ] })
  ] });
}
function Cp({ getHass: e, remote: t, groups: n, busy: r, act: l, onChanged: i }) {
  var x, S;
  const [o, s] = R.useState(t.endpoints[0].id), [u, c] = R.useState(((x = t.bound[0]) == null ? void 0 : x.group_id) ?? ((S = n[0]) == null ? void 0 : S.id) ?? 0), m = t.endpoints.find((N) => N.id === o) ?? t.endpoints[0], v = (N) => {
    var f;
    return ((f = n.find((d) => d.id === N)) == null ? void 0 : f.name) ?? `Group ${al(N)}`;
  }, g = () => l(async () => {
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
    const d = Object.entries(f.results).filter(([, w]) => w !== "ok"), p = N ? "Unbound from" : "Bound to";
    return d.length === Object.keys(f.results).length ? "The remote didn't answer. Press a button on it and try again." : d.length ? `${p} ${v(u)}, but these didn't take: ${d.map(([w, h]) => `${ua[+w] ?? w} (${h})`).join(", ")}.${Zi(f, v)}` : `${p} ${v(u)}.${Zi(f, v)}`;
  }, "Waiting for the remote… press one of its buttons.");
  return /* @__PURE__ */ a.jsxs(a.Fragment, { children: [
    /* @__PURE__ */ a.jsx("h3", { children: "Controls" }),
    /* @__PURE__ */ a.jsxs("div", { className: "list", children: [
      t.bound.map((N) => /* @__PURE__ */ a.jsxs("div", { className: "list-row static", children: [
        /* @__PURE__ */ a.jsx(O, { name: "lightbulb-group-outline", className: "row-icon" }),
        /* @__PURE__ */ a.jsxs("span", { className: "grow", children: [
          /* @__PURE__ */ a.jsx("strong", { children: v(N.group_id) }),
          /* @__PURE__ */ a.jsxs("span", { className: "muted small row-detail", children: [
            N.clusters.map((f) => ua[f] ?? f).join(", "),
            " · works without Home Assistant"
          ] })
        ] })
      ] }, N.group_id)),
      !t.bound.length && /* @__PURE__ */ a.jsx("div", { className: "list-row static muted", children: "Not bound to a group yet." })
    ] }),
    /* @__PURE__ */ a.jsxs("div", { className: "inline-row", children: [
      t.endpoints.length > 1 && /* @__PURE__ */ a.jsx("select", { value: m.id, onChange: (N) => s(+N.target.value), "aria-label": "Button set", children: t.endpoints.map((N) => /* @__PURE__ */ a.jsxs("option", { value: N.id, children: [
        "Endpoint ",
        N.id
      ] }, N.id)) }),
      /* @__PURE__ */ a.jsx("select", { value: u, disabled: !n.length, onChange: (N) => c(+N.target.value), "aria-label": "Group", children: n.map((N) => /* @__PURE__ */ a.jsxs("option", { value: N.id, children: [
        N.name,
        N.areas[0] ? ` (${N.areas[0]})` : ""
      ] }, N.id)) }),
      /* @__PURE__ */ a.jsx("button", { className: "primary", disabled: r || !n.length, onClick: () => y(!1), children: "Bind" }),
      /* @__PURE__ */ a.jsx("button", { disabled: r || !n.length, onClick: () => y(!0), children: "Unbind" }),
      /* @__PURE__ */ a.jsx("span", { className: "spacer" }),
      /* @__PURE__ */ a.jsx("button", { className: "ghost", disabled: r, onClick: g, children: "Check bindings" })
    ] })
  ] });
}
const da = { attention: 0, ok: 1, idle: 2 };
function Ep({ getHass: e, remotes: t, groups: n, onOpen: r }) {
  const l = e();
  if (!t.length)
    return /* @__PURE__ */ a.jsxs("div", { className: "empty-state", children: [
      /* @__PURE__ */ a.jsx(O, { name: "remote-off" }),
      /* @__PURE__ */ a.jsx("p", { children: "No remotes found. Pair a remote (like a Hue Tap Dial) with ZHA first." })
    ] });
  const i = t.map((o) => ({ r: o, s: or(o, n) })).sort((o, s) => da[o.s.state] - da[s.s.state] || o.r.name.localeCompare(s.r.name));
  return /* @__PURE__ */ a.jsx("div", { className: "list", children: i.map(({ r: o, s }) => {
    var m;
    const u = o.battery_entity ? (m = l.states[o.battery_entity]) == null ? void 0 : m.state : void 0, c = [o.area, Nc(o), u != null && u !== "unavailable" && u !== "unknown" ? `${Math.round(+u)}%` : null].filter(Boolean).join(" · ");
    return /* @__PURE__ */ a.jsxs("button", { className: "list-row", onClick: () => r(o.ieee), children: [
      /* @__PURE__ */ a.jsx(Nl, { remote: o, className: "row-icon big" }),
      /* @__PURE__ */ a.jsxs("span", { className: "grow", children: [
        /* @__PURE__ */ a.jsx("strong", { children: o.name }),
        /* @__PURE__ */ a.jsx("span", { className: "muted small row-detail", children: c })
      ] }),
      /* @__PURE__ */ a.jsx("span", { className: `chip ${s.state === "ok" ? "ok" : s.state === "attention" ? "warn" : ""}`, children: s.label }),
      /* @__PURE__ */ a.jsx(O, { name: "chevron-right" })
    ] }, o.ieee);
  }) });
}
function Xo({ getHass: e, entities: t, on: n, label: r }) {
  return /* @__PURE__ */ a.jsx(
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
function Zo({ getHass: e, entities: t, value: n, label: r, fill: l }) {
  const [i, o] = R.useState(n), [s, u] = R.useState(!1);
  R.useEffect(() => {
    s || o(n);
  }, [n, s]);
  const c = () => {
    u(!1), t.length && (i <= 0 ? e().callService("light", "turn_off", { entity_id: t }) : e().callService("light", "turn_on", { entity_id: t, brightness_pct: i }));
  };
  return /* @__PURE__ */ a.jsx(
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
function zp({ getHass: e, area: t, groups: n, onBack: r, onOpenRemote: l, onChanged: i }) {
  const o = e(), s = Tc(o, t.groups), u = Cc(o, t.groups), c = zc(t.groups);
  return /* @__PURE__ */ a.jsxs(a.Fragment, { children: [
    /* @__PURE__ */ a.jsx("div", { className: `hero ${s ? "lit" : ""}`, style: s ? { background: s } : void 0, children: /* @__PURE__ */ a.jsxs("div", { className: "hero-in", children: [
      /* @__PURE__ */ a.jsxs("nav", { className: "crumbs", children: [
        /* @__PURE__ */ a.jsx("button", { className: "link", onClick: r, children: "Rooms" }),
        /* @__PURE__ */ a.jsx(O, { name: "chevron-right" }),
        /* @__PURE__ */ a.jsx("span", { children: t.name })
      ] }),
      /* @__PURE__ */ a.jsxs("div", { className: "hero-row", children: [
        /* @__PURE__ */ a.jsx("h1", { children: t.name }),
        c.length > 0 && /* @__PURE__ */ a.jsx(Xo, { getHass: e, entities: c, on: u > 0, label: `Turn ${t.name} ${u ? "off" : "on"}` })
      ] }),
      c.length > 0 && /* @__PURE__ */ a.jsx(Zo, { getHass: e, entities: c, value: $c(o, t.groups), label: `${t.name} brightness` })
    ] }) }),
    /* @__PURE__ */ a.jsxs("main", { children: [
      t.groups.map((m) => /* @__PURE__ */ a.jsx(Pp, { getHass: e, group: m, titled: t.groups.length > 1 && m.name !== t.name, onChanged: i }, m.id)),
      !t.groups.length && /* @__PURE__ */ a.jsxs("div", { className: "empty-state", children: [
        /* @__PURE__ */ a.jsx(O, { name: "lightbulb-group-outline" }),
        /* @__PURE__ */ a.jsxs("p", { children: [
          "No ZHA groups in ",
          t.name,
          ". Create one under Settings → Devices & services → Zigbee Home Automation → Configure → Groups and put its lights in this area, or set up a Tap Dial here."
        ] })
      ] }),
      t.remotes.length > 0 && /* @__PURE__ */ a.jsxs(a.Fragment, { children: [
        /* @__PURE__ */ a.jsx("h3", { children: "Remotes" }),
        /* @__PURE__ */ a.jsx("div", { className: "list", children: t.remotes.map((m) => {
          const v = or(m, n);
          return /* @__PURE__ */ a.jsxs("button", { className: "list-row", onClick: () => l(m.ieee), children: [
            /* @__PURE__ */ a.jsx(Nl, { remote: m, className: "row-icon" }),
            /* @__PURE__ */ a.jsx("span", { className: "grow", children: m.name }),
            /* @__PURE__ */ a.jsx("span", { className: `chip ${v.state === "ok" ? "ok" : v.state === "attention" ? "warn" : ""}`, children: v.label }),
            /* @__PURE__ */ a.jsx(O, { name: "chevron-right" })
          ] }, m.ieee);
        }) })
      ] })
    ] })
  ] });
}
function Pp({ getHass: e, group: t, titled: n, onChanged: r }) {
  const { busy: l, result: i, act: o } = Yo(), s = e(), u = Object.fromEntries(t.members.map((h) => [h.key, h.name])), c = t.members.filter((h) => h.scenes), m = (h) => h.map((k) => u[k] ?? k).join(", "), v = (h) => h.length < c.length ? `on ${h.length} of ${c.length} lights` : void 0, g = t.dials[0], y = new Set(t.dials.flatMap((h) => h.buttons.map((k) => k.scene_id))), x = t.scenes.filter((h) => !y.has(h.id)), S = (h, k) => o(async () => {
    const _ = await e().callWS({ group_id: t.id, ...h });
    return r(), k(_);
  }), N = (h) => (k) => {
    const _ = Object.keys(k.failed);
    return _.length ? `${h} on ${k.ok.length} of ${k.ok.length + _.length} lights. These didn't answer: ${m(_)}` : `${h} on ${Ce(k.ok.length, "light")}`;
  }, f = (h, k) => S({ type: "hue_remote_scenes/recall", scene_id: h }, () => `Recalled ${k}`), d = (h, k) => confirm(`Save how the lights are now as "${k}"?`) && S({ type: "hue_remote_scenes/store", scene_id: h }, N("Saved")), p = (h, k) => S({ type: "hue_remote_scenes/rename", scene_id: h, name: k }, () => "Renamed"), w = (h, k) => confirm(`Delete "${k}" from the lights?`) && S(
    { type: "hue_remote_scenes/delete", scene_id: h },
    (_) => Object.keys(_.failed).length ? `Deleted, but some lights didn't answer and may still have it: ${m(Object.keys(_.failed))}` : `Deleted ${k}`
  );
  return /* @__PURE__ */ a.jsxs("section", { className: "group", children: [
    n && /* @__PURE__ */ a.jsx("h2", { className: "group-title", children: t.name }),
    c.length > 0 && g && /* @__PURE__ */ a.jsxs(a.Fragment, { children: [
      /* @__PURE__ */ a.jsxs("h3", { children: [
        t.dials.map((h) => h.name).join(", "),
        " buttons ",
        /* @__PURE__ */ a.jsx("span", { className: "hint", children: "tap to try · ⋮ to save the lights' current state there" })
      ] }),
      /* @__PURE__ */ a.jsx("div", { className: "tiles", children: g.buttons.map((h) => {
        const k = t.scenes.find((_) => _.id === h.scene_id);
        return k ? /* @__PURE__ */ a.jsx(
          Yi,
          {
            scene: k,
            badge: er(h.label),
            warn: v(k.members),
            busy: !!l,
            onRecall: () => f(k.id, k.name),
            onOverwrite: () => d(k.id, k.name),
            onRename: (_) => p(k.id, _)
          },
          h.scene_id
        ) : /* @__PURE__ */ a.jsx(
          Xi,
          {
            badge: er(h.label),
            label: "Save current state",
            busy: !!l,
            onSave: (_) => S({ type: "hue_remote_scenes/store", scene_id: h.scene_id, name: _ }, N("Saved"))
          },
          h.scene_id
        );
      }) })
    ] }),
    c.length > 0 && /* @__PURE__ */ a.jsxs(a.Fragment, { children: [
      /* @__PURE__ */ a.jsx("h3", { children: g ? "Other scenes" : "Scenes" }),
      /* @__PURE__ */ a.jsxs("div", { className: "tiles", children: [
        x.map((h) => /* @__PURE__ */ a.jsx(
          Yi,
          {
            scene: h,
            warn: v(h.members),
            busy: !!l,
            onRecall: () => f(h.id, h.name),
            onOverwrite: () => d(h.id, h.name),
            onRename: (k) => p(h.id, k),
            onDelete: () => w(h.id, h.name)
          },
          h.id
        )),
        /* @__PURE__ */ a.jsx(Xi, { label: "Save current state", busy: !!l, onSave: (h) => S({ type: "hue_remote_scenes/store", name: h }, N("Saved")) })
      ] })
    ] }),
    l && /* @__PURE__ */ a.jsx("div", { className: "status busy", children: l }),
    i && /* @__PURE__ */ a.jsx("div", { className: `status ${i.kind}`, children: i.text }),
    /* @__PURE__ */ a.jsxs("h3", { children: [
      "Lights ",
      /* @__PURE__ */ a.jsx("span", { className: "hint", children: t.members.filter((h) => Gt(s, h.entity_id)).length ? `${t.members.filter((h) => Gt(s, h.entity_id)).length} on` : "all off" })
    ] }),
    /* @__PURE__ */ a.jsx("div", { className: "list", children: t.members.map((h) => {
      const k = h.entity_id ? s.states[h.entity_id] : void 0, _ = Ec(k);
      return /* @__PURE__ */ a.jsxs("div", { className: "list-row static", children: [
        /* @__PURE__ */ a.jsx("span", { className: "light-dot", style: _ ? { background: _ } : void 0 }),
        /* @__PURE__ */ a.jsxs("span", { className: "grow", children: [
          h.name,
          !h.scenes && /* @__PURE__ */ a.jsx("span", { className: "muted small", children: " · can't store scenes" })
        ] }),
        h.entity_id && /* @__PURE__ */ a.jsxs(a.Fragment, { children: [
          /* @__PURE__ */ a.jsx(Zo, { getHass: e, entities: [h.entity_id], value: Gt(s, h.entity_id) ? Math.round(((k == null ? void 0 : k.attributes.brightness) ?? 255) / 2.55) : 0, label: `${h.name} brightness`, fill: _ ?? void 0 }),
          /* @__PURE__ */ a.jsx(Xo, { getHass: e, entities: [h.entity_id], on: Gt(s, h.entity_id), label: `Turn ${h.name} on or off` })
        ] })
      ] }, h.key);
    }) }),
    c.length > 0 && /* @__PURE__ */ a.jsx("div", { children: /* @__PURE__ */ a.jsxs(
      "button",
      {
        className: "ghost",
        disabled: !!l,
        title: "Ask the lights which scenes they already have, e.g. ones made in Zigbee2MQTT",
        onClick: () => S(
          { type: "hue_remote_scenes/import" },
          (h) => h.added.length ? `Found ${Ce(h.added.length, "new scene")}. Rename them from their ⋮ menu.` : h.found.length ? "No new scenes: the ones on the lights are all here." : "The lights have no scenes for this group yet."
        ),
        children: [
          /* @__PURE__ */ a.jsx(O, { name: "database-import-outline" }),
          " Import scenes from the lights"
        ]
      }
    ) })
  ] });
}
function Tp({ getHass: e, areas: t, groups: n, onOpen: r, onOpenRemote: l }) {
  const i = t.flatMap((o) => o.attention);
  return /* @__PURE__ */ a.jsxs(a.Fragment, { children: [
    i.map((o) => /* @__PURE__ */ a.jsxs("div", { className: "banner", children: [
      /* @__PURE__ */ a.jsx(O, { name: "alert-outline" }),
      /* @__PURE__ */ a.jsxs("span", { className: "grow", children: [
        o.name,
        " isn't set up yet: its buttons don't do anything."
      ] }),
      /* @__PURE__ */ a.jsx("button", { className: "primary", onClick: () => l(o.ieee), children: "Set up" })
    ] }, o.ieee)),
    /* @__PURE__ */ a.jsx("div", { className: "rooms", children: t.map((o) => /* @__PURE__ */ a.jsx($p, { getHass: e, area: o, groups: n, onOpen: () => r(o.name) }, o.name)) })
  ] });
}
function $p({ getHass: e, area: t, groups: n, onOpen: r }) {
  const l = e(), i = Tc(l, t.groups), o = Cc(l, t.groups), s = fp(t.groups), u = zc(t.groups), c = t.remotes.map((m) => `${m.name}${or(m, n).state === "attention" ? " · not set up" : ""}`);
  return /* @__PURE__ */ a.jsxs(
    "div",
    {
      className: `room ${i ? "lit" : ""}`,
      style: i ? { background: i } : void 0,
      role: "link",
      tabIndex: 0,
      onClick: r,
      onKeyDown: (m) => m.key === "Enter" && r(),
      children: [
        /* @__PURE__ */ a.jsxs("div", { className: "room-top", children: [
          /* @__PURE__ */ a.jsxs("div", { className: "grow", children: [
            /* @__PURE__ */ a.jsx("h2", { children: t.name }),
            /* @__PURE__ */ a.jsx("div", { className: "room-sub", children: s ? o ? `${Ce(o, "light")} on` : `Off · ${Ce(s, "light")}` : "No lights in a group yet" })
          ] }),
          u.length > 0 && /* @__PURE__ */ a.jsx(Xo, { getHass: e, entities: u, on: o > 0, label: `Turn ${t.name} ${o ? "off" : "on"}` })
        ] }),
        /* @__PURE__ */ a.jsx("div", { className: "room-sub", children: c.length ? c.join(" · ") : "No remote" }),
        u.length > 0 && /* @__PURE__ */ a.jsx(Zo, { getHass: e, entities: u, value: $c(l, t.groups), label: `${t.name} brightness` })
      ]
    }
  );
}
const Lp = [
  { id: "rooms", label: "Rooms", icon: "home-outline" },
  { id: "remotes", label: "Remotes", icon: "remote" }
];
function Rp({ getHass: e, narrow: t, onToggleMenu: n }) {
  const [r, l] = R.useState(null), [i, o] = R.useState(null), [s, u] = R.useState({}), [c, m] = R.useState("rooms"), [v, g] = R.useState(null), [y, x] = R.useState(null), [S, N] = R.useState(""), f = R.useCallback(() => {
    const C = e();
    Promise.all([
      C.callWS({ type: "hue_remote_scenes/groups" }),
      C.callWS({ type: "hue_remote_scenes/remotes" })
    ]).then(([F, T]) => {
      l(F.groups), o(T.remotes), u({ ...F.area_icons, ...T.area_icons }), N("");
    }).catch((F) => N(Lc(F)));
  }, [e]);
  R.useEffect(() => {
    f();
    const C = e().connection.subscribeMessage(f, { type: "hue_remote_scenes/subscribe" });
    return () => {
      C.then((F) => F()).catch(() => {
      });
    };
  }, [e, f]);
  const d = r && i ? dp(r, i, s) : null, p = c === "rooms" ? d == null ? void 0 : d.find((C) => C.name === v) : void 0, w = i == null ? void 0 : i.find((C) => C.ieee === y), h = (C) => {
    m(C), g(null), x(null);
  }, k = (C) => {
    m("remotes"), g(null), x(C);
  };
  let _;
  return !r || !i || !d ? _ = /* @__PURE__ */ a.jsx("main", { children: S && /* @__PURE__ */ a.jsx("div", { className: "status error", children: S }) }) : w ? _ = /* @__PURE__ */ a.jsx(_p, { getHass: e, remote: w, groups: r, onBack: () => x(null), onChanged: f }) : p ? _ = /* @__PURE__ */ a.jsx(zp, { getHass: e, area: p, groups: r, onBack: () => g(null), onOpenRemote: k, onChanged: f }) : _ = /* @__PURE__ */ a.jsxs("main", { children: [
    S && /* @__PURE__ */ a.jsx("div", { className: "status error", children: S }),
    c === "remotes" ? /* @__PURE__ */ a.jsx(Ep, { getHass: e, remotes: i, groups: r, onOpen: x }) : d.length ? /* @__PURE__ */ a.jsx(Tp, { getHass: e, areas: d, groups: r, onOpen: g, onOpenRemote: k }) : /* @__PURE__ */ a.jsxs("div", { className: "empty-state", children: [
      /* @__PURE__ */ a.jsx(O, { name: "lightbulb-group-outline" }),
      /* @__PURE__ */ a.jsx("p", { children: "No ZHA groups or remotes yet. Create a group under Settings → Devices & services → Zigbee Home Automation → Configure → Groups. For a Hue Tap Dial, pair it and use the Remotes tab: it creates the group the dial needs." })
    ] })
  ] }), /* @__PURE__ */ a.jsxs("div", { className: "panel", children: [
    /* @__PURE__ */ a.jsxs("header", { children: [
      /* @__PURE__ */ a.jsxs("div", { className: "toolbar-row", children: [
        t && /* @__PURE__ */ a.jsx("button", { className: "menu-btn", onClick: n, "aria-label": "Menu", children: /* @__PURE__ */ a.jsx(O, { name: "menu" }) }),
        /* @__PURE__ */ a.jsx(up, {}),
        /* @__PURE__ */ a.jsx("h1", { children: "Hue remote scenes" })
      ] }),
      /* @__PURE__ */ a.jsx("nav", { className: "tabs", role: "tablist", children: Lp.map((C) => /* @__PURE__ */ a.jsxs("button", { role: "tab", "aria-selected": C.id === c, className: C.id === c ? "on" : "", onClick: () => h(C.id), children: [
        /* @__PURE__ */ a.jsx(O, { name: C.icon }),
        /* @__PURE__ */ a.jsx("span", { children: C.label })
      ] }, C.id)) })
    ] }),
    _
  ] });
}
const Mp = (
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

/* Header: toolbar + tabs, like HA's own panels */
header { position: sticky; top: 0; z-index: 2; background: var(--app-header-background-color, var(--primary-color)); color: var(--app-header-text-color, #fff); border-bottom: var(--app-header-border-bottom, none); }
.toolbar-row { display: flex; align-items: center; gap: 10px; height: 56px; padding: 0 16px; }
.toolbar-row h1 { font-size: 20px; font-weight: 400; margin: 0; }
.logo { position: relative; width: 26px; height: 26px; flex: none; }
.logo svg { position: absolute; inset: 0; width: 100%; height: 100%; }
.logo-ring { position: absolute; inset: 1px; border-radius: 50%; background: conic-gradient(#ffb020, #ff6a3d, #ff4f8b, #b65cff, #5b6bff, #2f9bff, #19c3c0, #7fd36b, #ffb020); -webkit-mask: radial-gradient(circle, transparent 8.8px, #000 9.4px); mask: radial-gradient(circle, transparent 8.8px, #000 9.4px); }
.toolbar-row .menu-btn { display: inline-flex; background: transparent; border: 0; color: inherit; padding: 8px; margin-left: -8px; border-radius: 50%; }
.toolbar-row .menu-btn:hover { background: rgba(255,255,255,.12); }
.tabs { display: flex; gap: 2px; padding: 0 8px; overflow-x: auto; scrollbar-width: none; }
.tabs button { flex: none; display: inline-flex; align-items: center; gap: 8px; border: 0; border-radius: 0; background: transparent; color: inherit; opacity: .72; padding: 12px 14px 10px; border-bottom: 2px solid transparent; font-weight: 500; letter-spacing: .01em; }
.tabs button:hover { opacity: .95; background: rgba(255,255,255,.06); }
.tabs button.on { opacity: 1; border-bottom-color: currentColor; }
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

/* A card's actions, like hive-local's */
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
.menu button { justify-content: flex-start; border: 0; background: transparent; padding: 9px 10px; border-radius: 9px; --mdc-icon-size: 18px; }
.scene-chip { padding: 6px 14px 6px 8px; }
.scene-chip .badge { font-size: 10px; color: var(--secondary-text-color); }
.dot { width: 18px; height: 18px; border-radius: 50%; flex: none; box-shadow: inset 0 0 0 1px rgba(0,0,0,.1); }

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
  main { padding: 12px 8px 24px; gap: 12px; }
  .card { padding: 14px; }
  .rooms { grid-template-columns: 1fr; }
  .tiles { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .tabs { padding: 0 4px; }
  .tabs button { padding: 12px 10px 10px; font-size: 13px; }
  .tabs .icon-wrap { display: none; }
  .segmented.steps button { padding: 7px 6px; font-size: 12px; }
  .hero h1 { font-size: 24px; }
  .list .bri { width: 72px; }
  .picker select { min-width: 110px; }
  .dev-head { flex-wrap: wrap; }
}
`
);
class Op extends HTMLElement {
  constructor() {
    super(...arguments);
    hn(this, "_hass");
    hn(this, "_narrow", !1);
    hn(this, "_root");
    hn(this, "_pending");
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
      r.textContent = Mp;
      const l = document.createElement("div");
      n.append(r, l), this._root = _c(l);
    }
    this._render();
  }
  disconnectedCallback() {
    var n, r;
    window.clearTimeout(this._pending), this._pending = void 0, (n = this._root) == null || n.unmount(), this._root = void 0, (r = this.shadowRoot) == null || r.replaceChildren();
  }
  _render() {
    !this._root || !this._hass || this._root.render(
      /* @__PURE__ */ a.jsx(
        Rp,
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
customElements.get("hue-remote-scenes-panel") || customElements.define("hue-remote-scenes-panel", Op);
