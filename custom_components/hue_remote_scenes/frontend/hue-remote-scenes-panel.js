var jc = Object.defineProperty;
var Cc = (e, t, n) => t in e ? jc(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var vn = (e, t, n) => Cc(e, typeof t != "symbol" ? t + "" : t, n);
var uu = { exports: {} }, cl = {}, au = { exports: {} }, M = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var nr = Symbol.for("react.element"), Ec = Symbol.for("react.portal"), zc = Symbol.for("react.fragment"), Pc = Symbol.for("react.strict_mode"), Tc = Symbol.for("react.profiler"), Lc = Symbol.for("react.provider"), Rc = Symbol.for("react.context"), $c = Symbol.for("react.forward_ref"), Mc = Symbol.for("react.suspense"), Oc = Symbol.for("react.memo"), Dc = Symbol.for("react.lazy"), Jo = Symbol.iterator;
function Fc(e) {
  return e === null || typeof e != "object" ? null : (e = Jo && e[Jo] || e["@@iterator"], typeof e == "function" ? e : null);
}
var cu = { isMounted: function() {
  return !1;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, du = Object.assign, fu = {};
function pn(e, t, n) {
  this.props = e, this.context = t, this.refs = fu, this.updater = n || cu;
}
pn.prototype.isReactComponent = {};
pn.prototype.setState = function(e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, e, t, "setState");
};
pn.prototype.forceUpdate = function(e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function pu() {
}
pu.prototype = pn.prototype;
function Ji(e, t, n) {
  this.props = e, this.context = t, this.refs = fu, this.updater = n || cu;
}
var qi = Ji.prototype = new pu();
qi.constructor = Ji;
du(qi, pn.prototype);
qi.isPureReactComponent = !0;
var qo = Array.isArray, hu = Object.prototype.hasOwnProperty, bi = { current: null }, mu = { key: !0, ref: !0, __self: !0, __source: !0 };
function gu(e, t, n) {
  var r, l = {}, i = null, o = null;
  if (t != null) for (r in t.ref !== void 0 && (o = t.ref), t.key !== void 0 && (i = "" + t.key), t) hu.call(t, r) && !mu.hasOwnProperty(r) && (l[r] = t[r]);
  var s = arguments.length - 2;
  if (s === 1) l.children = n;
  else if (1 < s) {
    for (var a = Array(s), d = 0; d < s; d++) a[d] = arguments[d + 2];
    l.children = a;
  }
  if (e && e.defaultProps) for (r in s = e.defaultProps, s) l[r] === void 0 && (l[r] = s[r]);
  return { $$typeof: nr, type: e, key: i, ref: o, props: l, _owner: bi.current };
}
function Ic(e, t) {
  return { $$typeof: nr, type: e.type, key: t, ref: e.ref, props: e.props, _owner: e._owner };
}
function eo(e) {
  return typeof e == "object" && e !== null && e.$$typeof === nr;
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
        case nr:
        case Ec:
          o = !0;
      }
  }
  if (o) return o = e, l = l(o), e = r === "" ? "." + Pl(o, 0) : r, qo(l) ? (n = "", e != null && (n = e.replace(bo, "$&/") + "/"), Er(l, t, n, "", function(d) {
    return d;
  })) : l != null && (eo(l) && (l = Ic(l, n + (!l.key || o && o.key === l.key ? "" : ("" + l.key).replace(bo, "$&/") + "/") + e)), t.push(l)), 1;
  if (o = 0, r = r === "" ? "." : r + ":", qo(e)) for (var s = 0; s < e.length; s++) {
    i = e[s];
    var a = r + Pl(i, s);
    o += Er(i, t, n, a, l);
  }
  else if (a = Fc(e), typeof a == "function") for (e = a.call(e), s = 0; !(i = e.next()).done; ) i = i.value, a = r + Pl(i, s++), o += Er(i, t, n, a, l);
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
function Ac(e) {
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
var fe = { current: null }, zr = { transition: null }, Bc = { ReactCurrentDispatcher: fe, ReactCurrentBatchConfig: zr, ReactCurrentOwner: bi };
function vu() {
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
  if (!eo(e)) throw Error("React.Children.only expected to receive a single React element child.");
  return e;
} };
M.Component = pn;
M.Fragment = zc;
M.Profiler = Tc;
M.PureComponent = Ji;
M.StrictMode = Pc;
M.Suspense = Mc;
M.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Bc;
M.act = vu;
M.cloneElement = function(e, t, n) {
  if (e == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
  var r = du({}, e.props), l = e.key, i = e.ref, o = e._owner;
  if (t != null) {
    if (t.ref !== void 0 && (i = t.ref, o = bi.current), t.key !== void 0 && (l = "" + t.key), e.type && e.type.defaultProps) var s = e.type.defaultProps;
    for (a in t) hu.call(t, a) && !mu.hasOwnProperty(a) && (r[a] = t[a] === void 0 && s !== void 0 ? s[a] : t[a]);
  }
  var a = arguments.length - 2;
  if (a === 1) r.children = n;
  else if (1 < a) {
    s = Array(a);
    for (var d = 0; d < a; d++) s[d] = arguments[d + 2];
    r.children = s;
  }
  return { $$typeof: nr, type: e.type, key: l, ref: i, props: r, _owner: o };
};
M.createContext = function(e) {
  return e = { $$typeof: Rc, _currentValue: e, _currentValue2: e, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, e.Provider = { $$typeof: Lc, _context: e }, e.Consumer = e;
};
M.createElement = gu;
M.createFactory = function(e) {
  var t = gu.bind(null, e);
  return t.type = e, t;
};
M.createRef = function() {
  return { current: null };
};
M.forwardRef = function(e) {
  return { $$typeof: $c, render: e };
};
M.isValidElement = eo;
M.lazy = function(e) {
  return { $$typeof: Dc, _payload: { _status: -1, _result: e }, _init: Ac };
};
M.memo = function(e, t) {
  return { $$typeof: Oc, type: e, compare: t === void 0 ? null : t };
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
M.unstable_act = vu;
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
au.exports = M;
var I = au.exports;
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Wc = I, Vc = Symbol.for("react.element"), Hc = Symbol.for("react.fragment"), Qc = Object.prototype.hasOwnProperty, Kc = Wc.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, Gc = { key: !0, ref: !0, __self: !0, __source: !0 };
function yu(e, t, n) {
  var r, l = {}, i = null, o = null;
  n !== void 0 && (i = "" + n), t.key !== void 0 && (i = "" + t.key), t.ref !== void 0 && (o = t.ref);
  for (r in t) Qc.call(t, r) && !Gc.hasOwnProperty(r) && (l[r] = t[r]);
  if (e && e.defaultProps) for (r in t = e.defaultProps, t) l[r] === void 0 && (l[r] = t[r]);
  return { $$typeof: Vc, type: e, key: i, ref: o, props: l, _owner: Kc.current };
}
cl.Fragment = Hc;
cl.jsx = yu;
cl.jsxs = yu;
uu.exports = cl;
var u = uu.exports, xu = { exports: {} }, Ne = {}, wu = { exports: {} }, ku = {};
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
  function t(j, L) {
    var $ = j.length;
    j.push(L);
    e: for (; 0 < $; ) {
      var Q = $ - 1 >>> 1, ee = j[Q];
      if (0 < l(ee, L)) j[Q] = L, j[$] = ee, $ = Q;
      else break e;
    }
  }
  function n(j) {
    return j.length === 0 ? null : j[0];
  }
  function r(j) {
    if (j.length === 0) return null;
    var L = j[0], $ = j.pop();
    if ($ !== L) {
      j[0] = $;
      e: for (var Q = 0, ee = j.length, ur = ee >>> 1; Q < ur; ) {
        var St = 2 * (Q + 1) - 1, zl = j[St], Nt = St + 1, ar = j[Nt];
        if (0 > l(zl, $)) Nt < ee && 0 > l(ar, zl) ? (j[Q] = ar, j[Nt] = $, Q = Nt) : (j[Q] = zl, j[St] = $, Q = St);
        else if (Nt < ee && 0 > l(ar, $)) j[Q] = ar, j[Nt] = $, Q = Nt;
        else break e;
      }
    }
    return L;
  }
  function l(j, L) {
    var $ = j.sortIndex - L.sortIndex;
    return $ !== 0 ? $ : j.id - L.id;
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
  var a = [], d = [], m = 1, g = null, h = 3, y = !1, w = !1, S = !1, T = typeof setTimeout == "function" ? setTimeout : null, f = typeof clearTimeout == "function" ? clearTimeout : null, c = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function p(j) {
    for (var L = n(d); L !== null; ) {
      if (L.callback === null) r(d);
      else if (L.startTime <= j) r(d), L.sortIndex = L.expirationTime, t(a, L);
      else break;
      L = n(d);
    }
  }
  function v(j) {
    if (S = !1, p(j), !w) if (n(a) !== null) w = !0, R(x);
    else {
      var L = n(d);
      L !== null && A(v, L.startTime - j);
    }
  }
  function x(j, L) {
    w = !1, S && (S = !1, f(P), P = -1), y = !0;
    var $ = h;
    try {
      for (p(L), g = n(a); g !== null && (!(g.expirationTime > L) || j && !F()); ) {
        var Q = g.callback;
        if (typeof Q == "function") {
          g.callback = null, h = g.priorityLevel;
          var ee = Q(g.expirationTime <= L);
          L = e.unstable_now(), typeof ee == "function" ? g.callback = ee : g === n(a) && r(a), p(L);
        } else r(a);
        g = n(a);
      }
      if (g !== null) var ur = !0;
      else {
        var St = n(d);
        St !== null && A(v, St.startTime - L), ur = !1;
      }
      return ur;
    } finally {
      g = null, h = $, y = !1;
    }
  }
  var N = !1, C = null, P = -1, _ = 5, E = -1;
  function F() {
    return !(e.unstable_now() - E < _);
  }
  function et() {
    if (C !== null) {
      var j = e.unstable_now();
      E = j;
      var L = !0;
      try {
        L = C(!0, j);
      } finally {
        L ? kt() : (N = !1, C = null);
      }
    } else N = !1;
  }
  var kt;
  if (typeof c == "function") kt = function() {
    c(et);
  };
  else if (typeof MessageChannel < "u") {
    var gn = new MessageChannel(), sr = gn.port2;
    gn.port1.onmessage = et, kt = function() {
      sr.postMessage(null);
    };
  } else kt = function() {
    T(et, 0);
  };
  function R(j) {
    C = j, N || (N = !0, kt());
  }
  function A(j, L) {
    P = T(function() {
      j(e.unstable_now());
    }, L);
  }
  e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(j) {
    j.callback = null;
  }, e.unstable_continueExecution = function() {
    w || y || (w = !0, R(x));
  }, e.unstable_forceFrameRate = function(j) {
    0 > j || 125 < j ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : _ = 0 < j ? Math.floor(1e3 / j) : 5;
  }, e.unstable_getCurrentPriorityLevel = function() {
    return h;
  }, e.unstable_getFirstCallbackNode = function() {
    return n(a);
  }, e.unstable_next = function(j) {
    switch (h) {
      case 1:
      case 2:
      case 3:
        var L = 3;
        break;
      default:
        L = h;
    }
    var $ = h;
    h = L;
    try {
      return j();
    } finally {
      h = $;
    }
  }, e.unstable_pauseExecution = function() {
  }, e.unstable_requestPaint = function() {
  }, e.unstable_runWithPriority = function(j, L) {
    switch (j) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;
      default:
        j = 3;
    }
    var $ = h;
    h = j;
    try {
      return L();
    } finally {
      h = $;
    }
  }, e.unstable_scheduleCallback = function(j, L, $) {
    var Q = e.unstable_now();
    switch (typeof $ == "object" && $ !== null ? ($ = $.delay, $ = typeof $ == "number" && 0 < $ ? Q + $ : Q) : $ = Q, j) {
      case 1:
        var ee = -1;
        break;
      case 2:
        ee = 250;
        break;
      case 5:
        ee = 1073741823;
        break;
      case 4:
        ee = 1e4;
        break;
      default:
        ee = 5e3;
    }
    return ee = $ + ee, j = { id: m++, callback: L, priorityLevel: j, startTime: $, expirationTime: ee, sortIndex: -1 }, $ > Q ? (j.sortIndex = $, t(d, j), n(a) === null && j === n(d) && (S ? (f(P), P = -1) : S = !0, A(v, $ - Q))) : (j.sortIndex = ee, t(a, j), w || y || (w = !0, R(x))), j;
  }, e.unstable_shouldYield = F, e.unstable_wrapCallback = function(j) {
    var L = h;
    return function() {
      var $ = h;
      h = L;
      try {
        return j.apply(this, arguments);
      } finally {
        h = $;
      }
    };
  };
})(ku);
wu.exports = ku;
var Yc = wu.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Xc = I, Se = Yc;
function k(e) {
  for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
  return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var Su = /* @__PURE__ */ new Set(), Un = {};
function Ft(e, t) {
  ln(e, t), ln(e + "Capture", t);
}
function ln(e, t) {
  for (Un[e] = t, e = 0; e < t.length; e++) Su.add(t[e]);
}
var Xe = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), ri = Object.prototype.hasOwnProperty, Zc = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, es = {}, ts = {};
function Jc(e) {
  return ri.call(ts, e) ? !0 : ri.call(es, e) ? !1 : Zc.test(e) ? ts[e] = !0 : (es[e] = !0, !1);
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
function bc(e, t, n, r) {
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
var to = /[\-:]([a-z])/g;
function no(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
  var t = e.replace(
    to,
    no
  );
  ie[t] = new pe(t, 1, !1, e, null, !1, !1);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
  var t = e.replace(to, no);
  ie[t] = new pe(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
});
["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
  var t = e.replace(to, no);
  ie[t] = new pe(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function(e) {
  ie[e] = new pe(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
ie.xlinkHref = new pe("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);
["src", "href", "action", "formAction"].forEach(function(e) {
  ie[e] = new pe(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function ro(e, t, n, r) {
  var l = ie.hasOwnProperty(t) ? ie[t] : null;
  (l !== null ? l.type !== 0 : r || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (bc(t, n, l, r) && (n = null), r || l === null ? Jc(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n)) : l.mustUseProperty ? e[l.propertyName] = n === null ? l.type === 3 ? !1 : "" : n : (t = l.attributeName, r = l.attributeNamespace, n === null ? e.removeAttribute(t) : (l = l.type, n = l === 3 || l === 4 && n === !0 ? "" : "" + n, r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
var be = Xc.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, dr = Symbol.for("react.element"), At = Symbol.for("react.portal"), Bt = Symbol.for("react.fragment"), lo = Symbol.for("react.strict_mode"), li = Symbol.for("react.profiler"), Nu = Symbol.for("react.provider"), _u = Symbol.for("react.context"), io = Symbol.for("react.forward_ref"), ii = Symbol.for("react.suspense"), oi = Symbol.for("react.suspense_list"), oo = Symbol.for("react.memo"), nt = Symbol.for("react.lazy"), ju = Symbol.for("react.offscreen"), ns = Symbol.iterator;
function yn(e) {
  return e === null || typeof e != "object" ? null : (e = ns && e[ns] || e["@@iterator"], typeof e == "function" ? e : null);
}
var Y = Object.assign, Tl;
function Cn(e) {
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
  return (e = e ? e.displayName || e.name : "") ? Cn(e) : "";
}
function ed(e) {
  switch (e.tag) {
    case 5:
      return Cn(e.type);
    case 16:
      return Cn("Lazy");
    case 13:
      return Cn("Suspense");
    case 19:
      return Cn("SuspenseList");
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
function si(e) {
  if (e == null) return null;
  if (typeof e == "function") return e.displayName || e.name || null;
  if (typeof e == "string") return e;
  switch (e) {
    case Bt:
      return "Fragment";
    case At:
      return "Portal";
    case li:
      return "Profiler";
    case lo:
      return "StrictMode";
    case ii:
      return "Suspense";
    case oi:
      return "SuspenseList";
  }
  if (typeof e == "object") switch (e.$$typeof) {
    case _u:
      return (e.displayName || "Context") + ".Consumer";
    case Nu:
      return (e._context.displayName || "Context") + ".Provider";
    case io:
      var t = e.render;
      return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
    case oo:
      return t = e.displayName || null, t !== null ? t : si(e.type) || "Memo";
    case nt:
      t = e._payload, e = e._init;
      try {
        return si(e(t));
      } catch {
      }
  }
  return null;
}
function td(e) {
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
      return si(t);
    case 8:
      return t === lo ? "StrictMode" : "Mode";
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
function Cu(e) {
  var t = e.type;
  return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
}
function nd(e) {
  var t = Cu(e) ? "checked" : "value", n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t), r = "" + e[t];
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
  e._valueTracker || (e._valueTracker = nd(e));
}
function Eu(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(), r = "";
  return e && (r = Cu(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n ? (t.setValue(e), !0) : !1;
}
function Ur(e) {
  if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function ui(e, t) {
  var n = t.checked;
  return Y({}, t, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: n ?? e._wrapperState.initialChecked });
}
function rs(e, t) {
  var n = t.defaultValue == null ? "" : t.defaultValue, r = t.checked != null ? t.checked : t.defaultChecked;
  n = gt(t.value != null ? t.value : n), e._wrapperState = { initialChecked: r, initialValue: n, controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null };
}
function zu(e, t) {
  t = t.checked, t != null && ro(e, "checked", t, !1);
}
function ai(e, t) {
  zu(e, t);
  var n = gt(t.value), r = t.type;
  if (n != null) r === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + n) : e.value !== "" + n && (e.value = "" + n);
  else if (r === "submit" || r === "reset") {
    e.removeAttribute("value");
    return;
  }
  t.hasOwnProperty("value") ? ci(e, t.type, n) : t.hasOwnProperty("defaultValue") && ci(e, t.type, gt(t.defaultValue)), t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked);
}
function ls(e, t, n) {
  if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
    var r = t.type;
    if (!(r !== "submit" && r !== "reset" || t.value !== void 0 && t.value !== null)) return;
    t = "" + e._wrapperState.initialValue, n || t === e.value || (e.value = t), e.defaultValue = t;
  }
  n = e.name, n !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, n !== "" && (e.name = n);
}
function ci(e, t, n) {
  (t !== "number" || Ur(e.ownerDocument) !== e) && (n == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
}
var En = Array.isArray;
function qt(e, t, n, r) {
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
function di(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(k(91));
  return Y({}, t, { value: void 0, defaultValue: void 0, children: "" + e._wrapperState.initialValue });
}
function is(e, t) {
  var n = t.value;
  if (n == null) {
    if (n = t.children, t = t.defaultValue, n != null) {
      if (t != null) throw Error(k(92));
      if (En(n)) {
        if (1 < n.length) throw Error(k(93));
        n = n[0];
      }
      t = n;
    }
    t == null && (t = ""), n = t;
  }
  e._wrapperState = { initialValue: gt(n) };
}
function Pu(e, t) {
  var n = gt(t.value), r = gt(t.defaultValue);
  n != null && (n = "" + n, n !== e.value && (e.value = n), t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)), r != null && (e.defaultValue = "" + r);
}
function os(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
}
function Tu(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function fi(e, t) {
  return e == null || e === "http://www.w3.org/1999/xhtml" ? Tu(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e;
}
var pr, Lu = function(e) {
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
function An(e, t) {
  if (t) {
    var n = e.firstChild;
    if (n && n === e.lastChild && n.nodeType === 3) {
      n.nodeValue = t;
      return;
    }
  }
  e.textContent = t;
}
var Tn = {
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
}, rd = ["Webkit", "ms", "Moz", "O"];
Object.keys(Tn).forEach(function(e) {
  rd.forEach(function(t) {
    t = t + e.charAt(0).toUpperCase() + e.substring(1), Tn[t] = Tn[e];
  });
});
function Ru(e, t, n) {
  return t == null || typeof t == "boolean" || t === "" ? "" : n || typeof t != "number" || t === 0 || Tn.hasOwnProperty(e) && Tn[e] ? ("" + t).trim() : t + "px";
}
function $u(e, t) {
  e = e.style;
  for (var n in t) if (t.hasOwnProperty(n)) {
    var r = n.indexOf("--") === 0, l = Ru(n, t[n], r);
    n === "float" && (n = "cssFloat"), r ? e.setProperty(n, l) : e[n] = l;
  }
}
var ld = Y({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
function pi(e, t) {
  if (t) {
    if (ld[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(k(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(k(60));
      if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML)) throw Error(k(61));
    }
    if (t.style != null && typeof t.style != "object") throw Error(k(62));
  }
}
function hi(e, t) {
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
var mi = null;
function so(e) {
  return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
}
var gi = null, bt = null, en = null;
function ss(e) {
  if (e = ir(e)) {
    if (typeof gi != "function") throw Error(k(280));
    var t = e.stateNode;
    t && (t = ml(t), gi(e.stateNode, e.type, t));
  }
}
function Mu(e) {
  bt ? en ? en.push(e) : en = [e] : bt = e;
}
function Ou() {
  if (bt) {
    var e = bt, t = en;
    if (en = bt = null, ss(e), t) for (e = 0; e < t.length; e++) ss(t[e]);
  }
}
function Du(e, t) {
  return e(t);
}
function Fu() {
}
var $l = !1;
function Iu(e, t, n) {
  if ($l) return e(t, n);
  $l = !0;
  try {
    return Du(e, t, n);
  } finally {
    $l = !1, (bt !== null || en !== null) && (Fu(), Ou());
  }
}
function Bn(e, t) {
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
  if (n && typeof n != "function") throw Error(k(231, t, typeof n));
  return n;
}
var vi = !1;
if (Xe) try {
  var xn = {};
  Object.defineProperty(xn, "passive", { get: function() {
    vi = !0;
  } }), window.addEventListener("test", xn, xn), window.removeEventListener("test", xn, xn);
} catch {
  vi = !1;
}
function id(e, t, n, r, l, i, o, s, a) {
  var d = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, d);
  } catch (m) {
    this.onError(m);
  }
}
var Ln = !1, Ar = null, Br = !1, yi = null, od = { onError: function(e) {
  Ln = !0, Ar = e;
} };
function sd(e, t, n, r, l, i, o, s, a) {
  Ln = !1, Ar = null, id.apply(od, arguments);
}
function ud(e, t, n, r, l, i, o, s, a) {
  if (sd.apply(this, arguments), Ln) {
    if (Ln) {
      var d = Ar;
      Ln = !1, Ar = null;
    } else throw Error(k(198));
    Br || (Br = !0, yi = d);
  }
}
function It(e) {
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
function Uu(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
  }
  return null;
}
function us(e) {
  if (It(e) !== e) throw Error(k(188));
}
function ad(e) {
  var t = e.alternate;
  if (!t) {
    if (t = It(e), t === null) throw Error(k(188));
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
        if (i === n) return us(l), e;
        if (i === r) return us(l), t;
        i = i.sibling;
      }
      throw Error(k(188));
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
        if (!o) throw Error(k(189));
      }
    }
    if (n.alternate !== r) throw Error(k(190));
  }
  if (n.tag !== 3) throw Error(k(188));
  return n.stateNode.current === n ? e : t;
}
function Au(e) {
  return e = ad(e), e !== null ? Bu(e) : null;
}
function Bu(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var t = Bu(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var Wu = Se.unstable_scheduleCallback, as = Se.unstable_cancelCallback, cd = Se.unstable_shouldYield, dd = Se.unstable_requestPaint, Z = Se.unstable_now, fd = Se.unstable_getCurrentPriorityLevel, uo = Se.unstable_ImmediatePriority, Vu = Se.unstable_UserBlockingPriority, Wr = Se.unstable_NormalPriority, pd = Se.unstable_LowPriority, Hu = Se.unstable_IdlePriority, dl = null, Be = null;
function hd(e) {
  if (Be && typeof Be.onCommitFiberRoot == "function") try {
    Be.onCommitFiberRoot(dl, e, void 0, (e.current.flags & 128) === 128);
  } catch {
  }
}
var Oe = Math.clz32 ? Math.clz32 : vd, md = Math.log, gd = Math.LN2;
function vd(e) {
  return e >>>= 0, e === 0 ? 32 : 31 - (md(e) / gd | 0) | 0;
}
var hr = 64, mr = 4194304;
function zn(e) {
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
    s !== 0 ? r = zn(s) : (i &= o, i !== 0 && (r = zn(i)));
  } else o = n & ~l, o !== 0 ? r = zn(o) : i !== 0 && (r = zn(i));
  if (r === 0) return 0;
  if (t !== 0 && t !== r && !(t & l) && (l = r & -r, i = t & -t, l >= i || l === 16 && (i & 4194240) !== 0)) return t;
  if (r & 4 && (r |= n & 16), t = e.entangledLanes, t !== 0) for (e = e.entanglements, t &= r; 0 < t; ) n = 31 - Oe(t), l = 1 << n, r |= e[n], t &= ~l;
  return r;
}
function yd(e, t) {
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
function xd(e, t) {
  for (var n = e.suspendedLanes, r = e.pingedLanes, l = e.expirationTimes, i = e.pendingLanes; 0 < i; ) {
    var o = 31 - Oe(i), s = 1 << o, a = l[o];
    a === -1 ? (!(s & n) || s & r) && (l[o] = yd(s, t)) : a <= t && (e.expiredLanes |= s), i &= ~s;
  }
}
function xi(e) {
  return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
}
function Qu() {
  var e = hr;
  return hr <<= 1, !(hr & 4194240) && (hr = 64), e;
}
function Ml(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t;
}
function rr(e, t, n) {
  e.pendingLanes |= t, t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, t = 31 - Oe(t), e[t] = n;
}
function wd(e, t) {
  var n = e.pendingLanes & ~t;
  e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
  var r = e.eventTimes;
  for (e = e.expirationTimes; 0 < n; ) {
    var l = 31 - Oe(n), i = 1 << l;
    t[l] = 0, r[l] = -1, e[l] = -1, n &= ~i;
  }
}
function ao(e, t) {
  var n = e.entangledLanes |= t;
  for (e = e.entanglements; n; ) {
    var r = 31 - Oe(n), l = 1 << r;
    l & t | e[r] & t && (e[r] |= t), n &= ~l;
  }
}
var U = 0;
function Ku(e) {
  return e &= -e, 1 < e ? 4 < e ? e & 268435455 ? 16 : 536870912 : 4 : 1;
}
var Gu, co, Yu, Xu, Zu, wi = !1, gr = [], ut = null, at = null, ct = null, Wn = /* @__PURE__ */ new Map(), Vn = /* @__PURE__ */ new Map(), lt = [], kd = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function cs(e, t) {
  switch (e) {
    case "focusin":
    case "focusout":
      ut = null;
      break;
    case "dragenter":
    case "dragleave":
      at = null;
      break;
    case "mouseover":
    case "mouseout":
      ct = null;
      break;
    case "pointerover":
    case "pointerout":
      Wn.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      Vn.delete(t.pointerId);
  }
}
function wn(e, t, n, r, l, i) {
  return e === null || e.nativeEvent !== i ? (e = { blockedOn: t, domEventName: n, eventSystemFlags: r, nativeEvent: i, targetContainers: [l] }, t !== null && (t = ir(t), t !== null && co(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, l !== null && t.indexOf(l) === -1 && t.push(l), e);
}
function Sd(e, t, n, r, l) {
  switch (t) {
    case "focusin":
      return ut = wn(ut, e, t, n, r, l), !0;
    case "dragenter":
      return at = wn(at, e, t, n, r, l), !0;
    case "mouseover":
      return ct = wn(ct, e, t, n, r, l), !0;
    case "pointerover":
      var i = l.pointerId;
      return Wn.set(i, wn(Wn.get(i) || null, e, t, n, r, l)), !0;
    case "gotpointercapture":
      return i = l.pointerId, Vn.set(i, wn(Vn.get(i) || null, e, t, n, r, l)), !0;
  }
  return !1;
}
function Ju(e) {
  var t = Ct(e.target);
  if (t !== null) {
    var n = It(t);
    if (n !== null) {
      if (t = n.tag, t === 13) {
        if (t = Uu(n), t !== null) {
          e.blockedOn = t, Zu(e.priority, function() {
            Yu(n);
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
    var n = ki(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var r = new n.constructor(n.type, n);
      mi = r, n.target.dispatchEvent(r), mi = null;
    } else return t = ir(n), t !== null && co(t), e.blockedOn = n, !1;
    t.shift();
  }
  return !0;
}
function ds(e, t, n) {
  Pr(e) && n.delete(t);
}
function Nd() {
  wi = !1, ut !== null && Pr(ut) && (ut = null), at !== null && Pr(at) && (at = null), ct !== null && Pr(ct) && (ct = null), Wn.forEach(ds), Vn.forEach(ds);
}
function kn(e, t) {
  e.blockedOn === t && (e.blockedOn = null, wi || (wi = !0, Se.unstable_scheduleCallback(Se.unstable_NormalPriority, Nd)));
}
function Hn(e) {
  function t(l) {
    return kn(l, e);
  }
  if (0 < gr.length) {
    kn(gr[0], e);
    for (var n = 1; n < gr.length; n++) {
      var r = gr[n];
      r.blockedOn === e && (r.blockedOn = null);
    }
  }
  for (ut !== null && kn(ut, e), at !== null && kn(at, e), ct !== null && kn(ct, e), Wn.forEach(t), Vn.forEach(t), n = 0; n < lt.length; n++) r = lt[n], r.blockedOn === e && (r.blockedOn = null);
  for (; 0 < lt.length && (n = lt[0], n.blockedOn === null); ) Ju(n), n.blockedOn === null && lt.shift();
}
var tn = be.ReactCurrentBatchConfig, Hr = !0;
function _d(e, t, n, r) {
  var l = U, i = tn.transition;
  tn.transition = null;
  try {
    U = 1, fo(e, t, n, r);
  } finally {
    U = l, tn.transition = i;
  }
}
function jd(e, t, n, r) {
  var l = U, i = tn.transition;
  tn.transition = null;
  try {
    U = 4, fo(e, t, n, r);
  } finally {
    U = l, tn.transition = i;
  }
}
function fo(e, t, n, r) {
  if (Hr) {
    var l = ki(e, t, n, r);
    if (l === null) Hl(e, t, r, Qr, n), cs(e, r);
    else if (Sd(l, e, t, n, r)) r.stopPropagation();
    else if (cs(e, r), t & 4 && -1 < kd.indexOf(e)) {
      for (; l !== null; ) {
        var i = ir(l);
        if (i !== null && Gu(i), i = ki(e, t, n, r), i === null && Hl(e, t, r, Qr, n), i === l) break;
        l = i;
      }
      l !== null && r.stopPropagation();
    } else Hl(e, t, r, null, n);
  }
}
var Qr = null;
function ki(e, t, n, r) {
  if (Qr = null, e = so(r), e = Ct(e), e !== null) if (t = It(e), t === null) e = null;
  else if (n = t.tag, n === 13) {
    if (e = Uu(t), e !== null) return e;
    e = null;
  } else if (n === 3) {
    if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
    e = null;
  } else t !== e && (e = null);
  return Qr = e, null;
}
function qu(e) {
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
      switch (fd()) {
        case uo:
          return 1;
        case Vu:
          return 4;
        case Wr:
        case pd:
          return 16;
        case Hu:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var ot = null, po = null, Tr = null;
function bu() {
  if (Tr) return Tr;
  var e, t = po, n = t.length, r, l = "value" in ot ? ot.value : ot.textContent, i = l.length;
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
function fs() {
  return !1;
}
function _e(e) {
  function t(n, r, l, i, o) {
    this._reactName = n, this._targetInst = l, this.type = r, this.nativeEvent = i, this.target = o, this.currentTarget = null;
    for (var s in e) e.hasOwnProperty(s) && (n = e[s], this[s] = n ? n(i) : i[s]);
    return this.isDefaultPrevented = (i.defaultPrevented != null ? i.defaultPrevented : i.returnValue === !1) ? vr : fs, this.isPropagationStopped = fs, this;
  }
  return Y(t.prototype, { preventDefault: function() {
    this.defaultPrevented = !0;
    var n = this.nativeEvent;
    n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = vr);
  }, stopPropagation: function() {
    var n = this.nativeEvent;
    n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = vr);
  }, persist: function() {
  }, isPersistent: vr }), t;
}
var hn = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(e) {
  return e.timeStamp || Date.now();
}, defaultPrevented: 0, isTrusted: 0 }, ho = _e(hn), lr = Y({}, hn, { view: 0, detail: 0 }), Cd = _e(lr), Ol, Dl, Sn, fl = Y({}, lr, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: mo, button: 0, buttons: 0, relatedTarget: function(e) {
  return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
}, movementX: function(e) {
  return "movementX" in e ? e.movementX : (e !== Sn && (Sn && e.type === "mousemove" ? (Ol = e.screenX - Sn.screenX, Dl = e.screenY - Sn.screenY) : Dl = Ol = 0, Sn = e), Ol);
}, movementY: function(e) {
  return "movementY" in e ? e.movementY : Dl;
} }), ps = _e(fl), Ed = Y({}, fl, { dataTransfer: 0 }), zd = _e(Ed), Pd = Y({}, lr, { relatedTarget: 0 }), Fl = _e(Pd), Td = Y({}, hn, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Ld = _e(Td), Rd = Y({}, hn, { clipboardData: function(e) {
  return "clipboardData" in e ? e.clipboardData : window.clipboardData;
} }), $d = _e(Rd), Md = Y({}, hn, { data: 0 }), hs = _e(Md), Od = {
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
}, Dd = {
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
}, Fd = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function Id(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = Fd[e]) ? !!t[e] : !1;
}
function mo() {
  return Id;
}
var Ud = Y({}, lr, { key: function(e) {
  if (e.key) {
    var t = Od[e.key] || e.key;
    if (t !== "Unidentified") return t;
  }
  return e.type === "keypress" ? (e = Lr(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Dd[e.keyCode] || "Unidentified" : "";
}, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: mo, charCode: function(e) {
  return e.type === "keypress" ? Lr(e) : 0;
}, keyCode: function(e) {
  return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
}, which: function(e) {
  return e.type === "keypress" ? Lr(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
} }), Ad = _e(Ud), Bd = Y({}, fl, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), ms = _e(Bd), Wd = Y({}, lr, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: mo }), Vd = _e(Wd), Hd = Y({}, hn, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), Qd = _e(Hd), Kd = Y({}, fl, {
  deltaX: function(e) {
    return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
  },
  deltaY: function(e) {
    return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), Gd = _e(Kd), Yd = [9, 13, 27, 32], go = Xe && "CompositionEvent" in window, Rn = null;
Xe && "documentMode" in document && (Rn = document.documentMode);
var Xd = Xe && "TextEvent" in window && !Rn, ea = Xe && (!go || Rn && 8 < Rn && 11 >= Rn), gs = " ", vs = !1;
function ta(e, t) {
  switch (e) {
    case "keyup":
      return Yd.indexOf(t.keyCode) !== -1;
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
function na(e) {
  return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
}
var Wt = !1;
function Zd(e, t) {
  switch (e) {
    case "compositionend":
      return na(t);
    case "keypress":
      return t.which !== 32 ? null : (vs = !0, gs);
    case "textInput":
      return e = t.data, e === gs && vs ? null : e;
    default:
      return null;
  }
}
function Jd(e, t) {
  if (Wt) return e === "compositionend" || !go && ta(e, t) ? (e = bu(), Tr = po = ot = null, Wt = !1, e) : null;
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
      return ea && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var qd = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
function ys(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!qd[e.type] : t === "textarea";
}
function ra(e, t, n, r) {
  Mu(r), t = Kr(t, "onChange"), 0 < t.length && (n = new ho("onChange", "change", null, n, r), e.push({ event: n, listeners: t }));
}
var $n = null, Qn = null;
function bd(e) {
  ha(e, 0);
}
function pl(e) {
  var t = Qt(e);
  if (Eu(t)) return e;
}
function ef(e, t) {
  if (e === "change") return t;
}
var la = !1;
if (Xe) {
  var Il;
  if (Xe) {
    var Ul = "oninput" in document;
    if (!Ul) {
      var xs = document.createElement("div");
      xs.setAttribute("oninput", "return;"), Ul = typeof xs.oninput == "function";
    }
    Il = Ul;
  } else Il = !1;
  la = Il && (!document.documentMode || 9 < document.documentMode);
}
function ws() {
  $n && ($n.detachEvent("onpropertychange", ia), Qn = $n = null);
}
function ia(e) {
  if (e.propertyName === "value" && pl(Qn)) {
    var t = [];
    ra(t, Qn, e, so(e)), Iu(bd, t);
  }
}
function tf(e, t, n) {
  e === "focusin" ? (ws(), $n = t, Qn = n, $n.attachEvent("onpropertychange", ia)) : e === "focusout" && ws();
}
function nf(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown") return pl(Qn);
}
function rf(e, t) {
  if (e === "click") return pl(t);
}
function lf(e, t) {
  if (e === "input" || e === "change") return pl(t);
}
function of(e, t) {
  return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
}
var Fe = typeof Object.is == "function" ? Object.is : of;
function Kn(e, t) {
  if (Fe(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null) return !1;
  var n = Object.keys(e), r = Object.keys(t);
  if (n.length !== r.length) return !1;
  for (r = 0; r < n.length; r++) {
    var l = n[r];
    if (!ri.call(t, l) || !Fe(e[l], t[l])) return !1;
  }
  return !0;
}
function ks(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function Ss(e, t) {
  var n = ks(e);
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
    n = ks(n);
  }
}
function oa(e, t) {
  return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? oa(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
}
function sa() {
  for (var e = window, t = Ur(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var n = typeof t.contentWindow.location.href == "string";
    } catch {
      n = !1;
    }
    if (n) e = t.contentWindow;
    else break;
    t = Ur(e.document);
  }
  return t;
}
function vo(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
}
function sf(e) {
  var t = sa(), n = e.focusedElem, r = e.selectionRange;
  if (t !== n && n && n.ownerDocument && oa(n.ownerDocument.documentElement, n)) {
    if (r !== null && vo(n)) {
      if (t = r.start, e = r.end, e === void 0 && (e = t), "selectionStart" in n) n.selectionStart = t, n.selectionEnd = Math.min(e, n.value.length);
      else if (e = (t = n.ownerDocument || document) && t.defaultView || window, e.getSelection) {
        e = e.getSelection();
        var l = n.textContent.length, i = Math.min(r.start, l);
        r = r.end === void 0 ? i : Math.min(r.end, l), !e.extend && i > r && (l = r, r = i, i = l), l = Ss(n, i);
        var o = Ss(
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
var uf = Xe && "documentMode" in document && 11 >= document.documentMode, Vt = null, Si = null, Mn = null, Ni = !1;
function Ns(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  Ni || Vt == null || Vt !== Ur(r) || (r = Vt, "selectionStart" in r && vo(r) ? r = { start: r.selectionStart, end: r.selectionEnd } : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = { anchorNode: r.anchorNode, anchorOffset: r.anchorOffset, focusNode: r.focusNode, focusOffset: r.focusOffset }), Mn && Kn(Mn, r) || (Mn = r, r = Kr(Si, "onSelect"), 0 < r.length && (t = new ho("onSelect", "select", null, t, n), e.push({ event: t, listeners: r }), t.target = Vt)));
}
function yr(e, t) {
  var n = {};
  return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
}
var Ht = { animationend: yr("Animation", "AnimationEnd"), animationiteration: yr("Animation", "AnimationIteration"), animationstart: yr("Animation", "AnimationStart"), transitionend: yr("Transition", "TransitionEnd") }, Al = {}, ua = {};
Xe && (ua = document.createElement("div").style, "AnimationEvent" in window || (delete Ht.animationend.animation, delete Ht.animationiteration.animation, delete Ht.animationstart.animation), "TransitionEvent" in window || delete Ht.transitionend.transition);
function hl(e) {
  if (Al[e]) return Al[e];
  if (!Ht[e]) return e;
  var t = Ht[e], n;
  for (n in t) if (t.hasOwnProperty(n) && n in ua) return Al[e] = t[n];
  return e;
}
var aa = hl("animationend"), ca = hl("animationiteration"), da = hl("animationstart"), fa = hl("transitionend"), pa = /* @__PURE__ */ new Map(), _s = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function yt(e, t) {
  pa.set(e, t), Ft(t, [e]);
}
for (var Bl = 0; Bl < _s.length; Bl++) {
  var Wl = _s[Bl], af = Wl.toLowerCase(), cf = Wl[0].toUpperCase() + Wl.slice(1);
  yt(af, "on" + cf);
}
yt(aa, "onAnimationEnd");
yt(ca, "onAnimationIteration");
yt(da, "onAnimationStart");
yt("dblclick", "onDoubleClick");
yt("focusin", "onFocus");
yt("focusout", "onBlur");
yt(fa, "onTransitionEnd");
ln("onMouseEnter", ["mouseout", "mouseover"]);
ln("onMouseLeave", ["mouseout", "mouseover"]);
ln("onPointerEnter", ["pointerout", "pointerover"]);
ln("onPointerLeave", ["pointerout", "pointerover"]);
Ft("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
Ft("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
Ft("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
Ft("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
Ft("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
Ft("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var Pn = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), df = new Set("cancel close invalid load scroll toggle".split(" ").concat(Pn));
function js(e, t, n) {
  var r = e.type || "unknown-event";
  e.currentTarget = n, ud(r, t, void 0, e), e.currentTarget = null;
}
function ha(e, t) {
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
  if (Br) throw e = yi, Br = !1, yi = null, e;
}
function W(e, t) {
  var n = t[zi];
  n === void 0 && (n = t[zi] = /* @__PURE__ */ new Set());
  var r = e + "__bubble";
  n.has(r) || (ma(t, e, 2, !1), n.add(r));
}
function Vl(e, t, n) {
  var r = 0;
  t && (r |= 4), ma(n, e, r, t);
}
var xr = "_reactListening" + Math.random().toString(36).slice(2);
function Gn(e) {
  if (!e[xr]) {
    e[xr] = !0, Su.forEach(function(n) {
      n !== "selectionchange" && (df.has(n) || Vl(n, !1, e), Vl(n, !0, e));
    });
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[xr] || (t[xr] = !0, Vl("selectionchange", !1, t));
  }
}
function ma(e, t, n, r) {
  switch (qu(t)) {
    case 1:
      var l = _d;
      break;
    case 4:
      l = jd;
      break;
    default:
      l = fo;
  }
  n = l.bind(null, t, n, e), l = void 0, !vi || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (l = !0), r ? l !== void 0 ? e.addEventListener(t, n, { capture: !0, passive: l }) : e.addEventListener(t, n, !0) : l !== void 0 ? e.addEventListener(t, n, { passive: l }) : e.addEventListener(t, n, !1);
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
        if (o = Ct(s), o === null) return;
        if (a = o.tag, a === 5 || a === 6) {
          r = i = o;
          continue e;
        }
        s = s.parentNode;
      }
    }
    r = r.return;
  }
  Iu(function() {
    var d = i, m = so(n), g = [];
    e: {
      var h = pa.get(e);
      if (h !== void 0) {
        var y = ho, w = e;
        switch (e) {
          case "keypress":
            if (Lr(n) === 0) break e;
          case "keydown":
          case "keyup":
            y = Ad;
            break;
          case "focusin":
            w = "focus", y = Fl;
            break;
          case "focusout":
            w = "blur", y = Fl;
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
            y = ps;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            y = zd;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            y = Vd;
            break;
          case aa:
          case ca:
          case da:
            y = Ld;
            break;
          case fa:
            y = Qd;
            break;
          case "scroll":
            y = Cd;
            break;
          case "wheel":
            y = Gd;
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
            y = ms;
        }
        var S = (t & 4) !== 0, T = !S && e === "scroll", f = S ? h !== null ? h + "Capture" : null : h;
        S = [];
        for (var c = d, p; c !== null; ) {
          p = c;
          var v = p.stateNode;
          if (p.tag === 5 && v !== null && (p = v, f !== null && (v = Bn(c, f), v != null && S.push(Yn(c, v, p)))), T) break;
          c = c.return;
        }
        0 < S.length && (h = new y(h, w, null, n, m), g.push({ event: h, listeners: S }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (h = e === "mouseover" || e === "pointerover", y = e === "mouseout" || e === "pointerout", h && n !== mi && (w = n.relatedTarget || n.fromElement) && (Ct(w) || w[Ze])) break e;
        if ((y || h) && (h = m.window === m ? m : (h = m.ownerDocument) ? h.defaultView || h.parentWindow : window, y ? (w = n.relatedTarget || n.toElement, y = d, w = w ? Ct(w) : null, w !== null && (T = It(w), w !== T || w.tag !== 5 && w.tag !== 6) && (w = null)) : (y = null, w = d), y !== w)) {
          if (S = ps, v = "onMouseLeave", f = "onMouseEnter", c = "mouse", (e === "pointerout" || e === "pointerover") && (S = ms, v = "onPointerLeave", f = "onPointerEnter", c = "pointer"), T = y == null ? h : Qt(y), p = w == null ? h : Qt(w), h = new S(v, c + "leave", y, n, m), h.target = T, h.relatedTarget = p, v = null, Ct(m) === d && (S = new S(f, c + "enter", w, n, m), S.target = p, S.relatedTarget = T, v = S), T = v, y && w) t: {
            for (S = y, f = w, c = 0, p = S; p; p = Ut(p)) c++;
            for (p = 0, v = f; v; v = Ut(v)) p++;
            for (; 0 < c - p; ) S = Ut(S), c--;
            for (; 0 < p - c; ) f = Ut(f), p--;
            for (; c--; ) {
              if (S === f || f !== null && S === f.alternate) break t;
              S = Ut(S), f = Ut(f);
            }
            S = null;
          }
          else S = null;
          y !== null && Cs(g, h, y, S, !1), w !== null && T !== null && Cs(g, T, w, S, !0);
        }
      }
      e: {
        if (h = d ? Qt(d) : window, y = h.nodeName && h.nodeName.toLowerCase(), y === "select" || y === "input" && h.type === "file") var x = ef;
        else if (ys(h)) if (la) x = lf;
        else {
          x = nf;
          var N = tf;
        }
        else (y = h.nodeName) && y.toLowerCase() === "input" && (h.type === "checkbox" || h.type === "radio") && (x = rf);
        if (x && (x = x(e, d))) {
          ra(g, x, n, m);
          break e;
        }
        N && N(e, h, d), e === "focusout" && (N = h._wrapperState) && N.controlled && h.type === "number" && ci(h, "number", h.value);
      }
      switch (N = d ? Qt(d) : window, e) {
        case "focusin":
          (ys(N) || N.contentEditable === "true") && (Vt = N, Si = d, Mn = null);
          break;
        case "focusout":
          Mn = Si = Vt = null;
          break;
        case "mousedown":
          Ni = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          Ni = !1, Ns(g, n, m);
          break;
        case "selectionchange":
          if (uf) break;
        case "keydown":
        case "keyup":
          Ns(g, n, m);
      }
      var C;
      if (go) e: {
        switch (e) {
          case "compositionstart":
            var P = "onCompositionStart";
            break e;
          case "compositionend":
            P = "onCompositionEnd";
            break e;
          case "compositionupdate":
            P = "onCompositionUpdate";
            break e;
        }
        P = void 0;
      }
      else Wt ? ta(e, n) && (P = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (P = "onCompositionStart");
      P && (ea && n.locale !== "ko" && (Wt || P !== "onCompositionStart" ? P === "onCompositionEnd" && Wt && (C = bu()) : (ot = m, po = "value" in ot ? ot.value : ot.textContent, Wt = !0)), N = Kr(d, P), 0 < N.length && (P = new hs(P, e, null, n, m), g.push({ event: P, listeners: N }), C ? P.data = C : (C = na(n), C !== null && (P.data = C)))), (C = Xd ? Zd(e, n) : Jd(e, n)) && (d = Kr(d, "onBeforeInput"), 0 < d.length && (m = new hs("onBeforeInput", "beforeinput", null, n, m), g.push({ event: m, listeners: d }), m.data = C));
    }
    ha(g, t);
  });
}
function Yn(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function Kr(e, t) {
  for (var n = t + "Capture", r = []; e !== null; ) {
    var l = e, i = l.stateNode;
    l.tag === 5 && i !== null && (l = i, i = Bn(e, n), i != null && r.unshift(Yn(e, i, l)), i = Bn(e, t), i != null && r.push(Yn(e, i, l))), e = e.return;
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
function Cs(e, t, n, r, l) {
  for (var i = t._reactName, o = []; n !== null && n !== r; ) {
    var s = n, a = s.alternate, d = s.stateNode;
    if (a !== null && a === r) break;
    s.tag === 5 && d !== null && (s = d, l ? (a = Bn(n, i), a != null && o.unshift(Yn(n, a, s))) : l || (a = Bn(n, i), a != null && o.push(Yn(n, a, s)))), n = n.return;
  }
  o.length !== 0 && e.push({ event: t, listeners: o });
}
var ff = /\r\n?/g, pf = /\u0000|\uFFFD/g;
function Es(e) {
  return (typeof e == "string" ? e : "" + e).replace(ff, `
`).replace(pf, "");
}
function wr(e, t, n) {
  if (t = Es(t), Es(e) !== t && n) throw Error(k(425));
}
function Gr() {
}
var _i = null, ji = null;
function Ci(e, t) {
  return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
}
var Ei = typeof setTimeout == "function" ? setTimeout : void 0, hf = typeof clearTimeout == "function" ? clearTimeout : void 0, zs = typeof Promise == "function" ? Promise : void 0, mf = typeof queueMicrotask == "function" ? queueMicrotask : typeof zs < "u" ? function(e) {
  return zs.resolve(null).then(e).catch(gf);
} : Ei;
function gf(e) {
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
        e.removeChild(l), Hn(t);
        return;
      }
      r--;
    } else n !== "$" && n !== "$?" && n !== "$!" || r++;
    n = l;
  } while (n);
  Hn(t);
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
function Ps(e) {
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
var mn = Math.random().toString(36).slice(2), Ae = "__reactFiber$" + mn, Xn = "__reactProps$" + mn, Ze = "__reactContainer$" + mn, zi = "__reactEvents$" + mn, vf = "__reactListeners$" + mn, yf = "__reactHandles$" + mn;
function Ct(e) {
  var t = e[Ae];
  if (t) return t;
  for (var n = e.parentNode; n; ) {
    if (t = n[Ze] || n[Ae]) {
      if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = Ps(e); e !== null; ) {
        if (n = e[Ae]) return n;
        e = Ps(e);
      }
      return t;
    }
    e = n, n = e.parentNode;
  }
  return null;
}
function ir(e) {
  return e = e[Ae] || e[Ze], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e;
}
function Qt(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(k(33));
}
function ml(e) {
  return e[Xn] || null;
}
var Pi = [], Kt = -1;
function xt(e) {
  return { current: e };
}
function V(e) {
  0 > Kt || (e.current = Pi[Kt], Pi[Kt] = null, Kt--);
}
function B(e, t) {
  Kt++, Pi[Kt] = e.current, e.current = t;
}
var vt = {}, ae = xt(vt), ge = xt(!1), Rt = vt;
function on(e, t) {
  var n = e.type.contextTypes;
  if (!n) return vt;
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
  V(ge), V(ae);
}
function Ts(e, t, n) {
  if (ae.current !== vt) throw Error(k(168));
  B(ae, t), B(ge, n);
}
function ga(e, t, n) {
  var r = e.stateNode;
  if (t = t.childContextTypes, typeof r.getChildContext != "function") return n;
  r = r.getChildContext();
  for (var l in r) if (!(l in t)) throw Error(k(108, td(e) || "Unknown", l));
  return Y({}, n, r);
}
function Xr(e) {
  return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || vt, Rt = ae.current, B(ae, e), B(ge, ge.current), !0;
}
function Ls(e, t, n) {
  var r = e.stateNode;
  if (!r) throw Error(k(169));
  n ? (e = ga(e, t, Rt), r.__reactInternalMemoizedMergedChildContext = e, V(ge), V(ae), B(ae, e)) : V(ge), B(ge, n);
}
var He = null, gl = !1, Kl = !1;
function va(e) {
  He === null ? He = [e] : He.push(e);
}
function xf(e) {
  gl = !0, va(e);
}
function wt() {
  if (!Kl && He !== null) {
    Kl = !0;
    var e = 0, t = U;
    try {
      var n = He;
      for (U = 1; e < n.length; e++) {
        var r = n[e];
        do
          r = r(!0);
        while (r !== null);
      }
      He = null, gl = !1;
    } catch (l) {
      throw He !== null && (He = He.slice(e + 1)), Wu(uo, wt), l;
    } finally {
      U = t, Kl = !1;
    }
  }
  return null;
}
var Gt = [], Yt = 0, Zr = null, Jr = 0, je = [], Ce = 0, $t = null, Qe = 1, Ke = "";
function _t(e, t) {
  Gt[Yt++] = Jr, Gt[Yt++] = Zr, Zr = e, Jr = t;
}
function ya(e, t, n) {
  je[Ce++] = Qe, je[Ce++] = Ke, je[Ce++] = $t, $t = e;
  var r = Qe;
  e = Ke;
  var l = 32 - Oe(r) - 1;
  r &= ~(1 << l), n += 1;
  var i = 32 - Oe(t) + l;
  if (30 < i) {
    var o = l - l % 5;
    i = (r & (1 << o) - 1).toString(32), r >>= o, l -= o, Qe = 1 << 32 - Oe(t) + l | n << l | r, Ke = i + e;
  } else Qe = 1 << i | n << l | r, Ke = e;
}
function yo(e) {
  e.return !== null && (_t(e, 1), ya(e, 1, 0));
}
function xo(e) {
  for (; e === Zr; ) Zr = Gt[--Yt], Gt[Yt] = null, Jr = Gt[--Yt], Gt[Yt] = null;
  for (; e === $t; ) $t = je[--Ce], je[Ce] = null, Ke = je[--Ce], je[Ce] = null, Qe = je[--Ce], je[Ce] = null;
}
var ke = null, we = null, H = !1, Me = null;
function xa(e, t) {
  var n = Ee(5, null, null, 0);
  n.elementType = "DELETED", n.stateNode = t, n.return = e, t = e.deletions, t === null ? (e.deletions = [n], e.flags |= 16) : t.push(n);
}
function Rs(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t, t !== null ? (e.stateNode = t, ke = e, we = dt(t.firstChild), !0) : !1;
    case 6:
      return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t, t !== null ? (e.stateNode = t, ke = e, we = null, !0) : !1;
    case 13:
      return t = t.nodeType !== 8 ? null : t, t !== null ? (n = $t !== null ? { id: Qe, overflow: Ke } : null, e.memoizedState = { dehydrated: t, treeContext: n, retryLane: 1073741824 }, n = Ee(18, null, null, 0), n.stateNode = t, n.return = e, e.child = n, ke = e, we = null, !0) : !1;
    default:
      return !1;
  }
}
function Ti(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function Li(e) {
  if (H) {
    var t = we;
    if (t) {
      var n = t;
      if (!Rs(e, t)) {
        if (Ti(e)) throw Error(k(418));
        t = dt(n.nextSibling);
        var r = ke;
        t && Rs(e, t) ? xa(r, n) : (e.flags = e.flags & -4097 | 2, H = !1, ke = e);
      }
    } else {
      if (Ti(e)) throw Error(k(418));
      e.flags = e.flags & -4097 | 2, H = !1, ke = e;
    }
  }
}
function $s(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; ) e = e.return;
  ke = e;
}
function kr(e) {
  if (e !== ke) return !1;
  if (!H) return $s(e), H = !0, !1;
  var t;
  if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !Ci(e.type, e.memoizedProps)), t && (t = we)) {
    if (Ti(e)) throw wa(), Error(k(418));
    for (; t; ) xa(e, t), t = dt(t.nextSibling);
  }
  if ($s(e), e.tag === 13) {
    if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(k(317));
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
function wa() {
  for (var e = we; e; ) e = dt(e.nextSibling);
}
function sn() {
  we = ke = null, H = !1;
}
function wo(e) {
  Me === null ? Me = [e] : Me.push(e);
}
var wf = be.ReactCurrentBatchConfig;
function Nn(e, t, n) {
  if (e = n.ref, e !== null && typeof e != "function" && typeof e != "object") {
    if (n._owner) {
      if (n = n._owner, n) {
        if (n.tag !== 1) throw Error(k(309));
        var r = n.stateNode;
      }
      if (!r) throw Error(k(147, e));
      var l = r, i = "" + e;
      return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === i ? t.ref : (t = function(o) {
        var s = l.refs;
        o === null ? delete s[i] : s[i] = o;
      }, t._stringRef = i, t);
    }
    if (typeof e != "string") throw Error(k(284));
    if (!n._owner) throw Error(k(290, e));
  }
  return e;
}
function Sr(e, t) {
  throw e = Object.prototype.toString.call(t), Error(k(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e));
}
function Ms(e) {
  var t = e._init;
  return t(e._payload);
}
function ka(e) {
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
    return f = mt(f, c), f.index = 0, f.sibling = null, f;
  }
  function i(f, c, p) {
    return f.index = p, e ? (p = f.alternate, p !== null ? (p = p.index, p < c ? (f.flags |= 2, c) : p) : (f.flags |= 2, c)) : (f.flags |= 1048576, c);
  }
  function o(f) {
    return e && f.alternate === null && (f.flags |= 2), f;
  }
  function s(f, c, p, v) {
    return c === null || c.tag !== 6 ? (c = bl(p, f.mode, v), c.return = f, c) : (c = l(c, p), c.return = f, c);
  }
  function a(f, c, p, v) {
    var x = p.type;
    return x === Bt ? m(f, c, p.props.children, v, p.key) : c !== null && (c.elementType === x || typeof x == "object" && x !== null && x.$$typeof === nt && Ms(x) === c.type) ? (v = l(c, p.props), v.ref = Nn(f, c, p), v.return = f, v) : (v = Ir(p.type, p.key, p.props, null, f.mode, v), v.ref = Nn(f, c, p), v.return = f, v);
  }
  function d(f, c, p, v) {
    return c === null || c.tag !== 4 || c.stateNode.containerInfo !== p.containerInfo || c.stateNode.implementation !== p.implementation ? (c = ei(p, f.mode, v), c.return = f, c) : (c = l(c, p.children || []), c.return = f, c);
  }
  function m(f, c, p, v, x) {
    return c === null || c.tag !== 7 ? (c = Lt(p, f.mode, v, x), c.return = f, c) : (c = l(c, p), c.return = f, c);
  }
  function g(f, c, p) {
    if (typeof c == "string" && c !== "" || typeof c == "number") return c = bl("" + c, f.mode, p), c.return = f, c;
    if (typeof c == "object" && c !== null) {
      switch (c.$$typeof) {
        case dr:
          return p = Ir(c.type, c.key, c.props, null, f.mode, p), p.ref = Nn(f, null, c), p.return = f, p;
        case At:
          return c = ei(c, f.mode, p), c.return = f, c;
        case nt:
          var v = c._init;
          return g(f, v(c._payload), p);
      }
      if (En(c) || yn(c)) return c = Lt(c, f.mode, p, null), c.return = f, c;
      Sr(f, c);
    }
    return null;
  }
  function h(f, c, p, v) {
    var x = c !== null ? c.key : null;
    if (typeof p == "string" && p !== "" || typeof p == "number") return x !== null ? null : s(f, c, "" + p, v);
    if (typeof p == "object" && p !== null) {
      switch (p.$$typeof) {
        case dr:
          return p.key === x ? a(f, c, p, v) : null;
        case At:
          return p.key === x ? d(f, c, p, v) : null;
        case nt:
          return x = p._init, h(
            f,
            c,
            x(p._payload),
            v
          );
      }
      if (En(p) || yn(p)) return x !== null ? null : m(f, c, p, v, null);
      Sr(f, p);
    }
    return null;
  }
  function y(f, c, p, v, x) {
    if (typeof v == "string" && v !== "" || typeof v == "number") return f = f.get(p) || null, s(c, f, "" + v, x);
    if (typeof v == "object" && v !== null) {
      switch (v.$$typeof) {
        case dr:
          return f = f.get(v.key === null ? p : v.key) || null, a(c, f, v, x);
        case At:
          return f = f.get(v.key === null ? p : v.key) || null, d(c, f, v, x);
        case nt:
          var N = v._init;
          return y(f, c, p, N(v._payload), x);
      }
      if (En(v) || yn(v)) return f = f.get(p) || null, m(c, f, v, x, null);
      Sr(c, v);
    }
    return null;
  }
  function w(f, c, p, v) {
    for (var x = null, N = null, C = c, P = c = 0, _ = null; C !== null && P < p.length; P++) {
      C.index > P ? (_ = C, C = null) : _ = C.sibling;
      var E = h(f, C, p[P], v);
      if (E === null) {
        C === null && (C = _);
        break;
      }
      e && C && E.alternate === null && t(f, C), c = i(E, c, P), N === null ? x = E : N.sibling = E, N = E, C = _;
    }
    if (P === p.length) return n(f, C), H && _t(f, P), x;
    if (C === null) {
      for (; P < p.length; P++) C = g(f, p[P], v), C !== null && (c = i(C, c, P), N === null ? x = C : N.sibling = C, N = C);
      return H && _t(f, P), x;
    }
    for (C = r(f, C); P < p.length; P++) _ = y(C, f, P, p[P], v), _ !== null && (e && _.alternate !== null && C.delete(_.key === null ? P : _.key), c = i(_, c, P), N === null ? x = _ : N.sibling = _, N = _);
    return e && C.forEach(function(F) {
      return t(f, F);
    }), H && _t(f, P), x;
  }
  function S(f, c, p, v) {
    var x = yn(p);
    if (typeof x != "function") throw Error(k(150));
    if (p = x.call(p), p == null) throw Error(k(151));
    for (var N = x = null, C = c, P = c = 0, _ = null, E = p.next(); C !== null && !E.done; P++, E = p.next()) {
      C.index > P ? (_ = C, C = null) : _ = C.sibling;
      var F = h(f, C, E.value, v);
      if (F === null) {
        C === null && (C = _);
        break;
      }
      e && C && F.alternate === null && t(f, C), c = i(F, c, P), N === null ? x = F : N.sibling = F, N = F, C = _;
    }
    if (E.done) return n(
      f,
      C
    ), H && _t(f, P), x;
    if (C === null) {
      for (; !E.done; P++, E = p.next()) E = g(f, E.value, v), E !== null && (c = i(E, c, P), N === null ? x = E : N.sibling = E, N = E);
      return H && _t(f, P), x;
    }
    for (C = r(f, C); !E.done; P++, E = p.next()) E = y(C, f, P, E.value, v), E !== null && (e && E.alternate !== null && C.delete(E.key === null ? P : E.key), c = i(E, c, P), N === null ? x = E : N.sibling = E, N = E);
    return e && C.forEach(function(et) {
      return t(f, et);
    }), H && _t(f, P), x;
  }
  function T(f, c, p, v) {
    if (typeof p == "object" && p !== null && p.type === Bt && p.key === null && (p = p.props.children), typeof p == "object" && p !== null) {
      switch (p.$$typeof) {
        case dr:
          e: {
            for (var x = p.key, N = c; N !== null; ) {
              if (N.key === x) {
                if (x = p.type, x === Bt) {
                  if (N.tag === 7) {
                    n(f, N.sibling), c = l(N, p.props.children), c.return = f, f = c;
                    break e;
                  }
                } else if (N.elementType === x || typeof x == "object" && x !== null && x.$$typeof === nt && Ms(x) === N.type) {
                  n(f, N.sibling), c = l(N, p.props), c.ref = Nn(f, N, p), c.return = f, f = c;
                  break e;
                }
                n(f, N);
                break;
              } else t(f, N);
              N = N.sibling;
            }
            p.type === Bt ? (c = Lt(p.props.children, f.mode, v, p.key), c.return = f, f = c) : (v = Ir(p.type, p.key, p.props, null, f.mode, v), v.ref = Nn(f, c, p), v.return = f, f = v);
          }
          return o(f);
        case At:
          e: {
            for (N = p.key; c !== null; ) {
              if (c.key === N) if (c.tag === 4 && c.stateNode.containerInfo === p.containerInfo && c.stateNode.implementation === p.implementation) {
                n(f, c.sibling), c = l(c, p.children || []), c.return = f, f = c;
                break e;
              } else {
                n(f, c);
                break;
              }
              else t(f, c);
              c = c.sibling;
            }
            c = ei(p, f.mode, v), c.return = f, f = c;
          }
          return o(f);
        case nt:
          return N = p._init, T(f, c, N(p._payload), v);
      }
      if (En(p)) return w(f, c, p, v);
      if (yn(p)) return S(f, c, p, v);
      Sr(f, p);
    }
    return typeof p == "string" && p !== "" || typeof p == "number" ? (p = "" + p, c !== null && c.tag === 6 ? (n(f, c.sibling), c = l(c, p), c.return = f, f = c) : (n(f, c), c = bl(p, f.mode, v), c.return = f, f = c), o(f)) : n(f, c);
  }
  return T;
}
var un = ka(!0), Sa = ka(!1), qr = xt(null), br = null, Xt = null, ko = null;
function So() {
  ko = Xt = br = null;
}
function No(e) {
  var t = qr.current;
  V(qr), e._currentValue = t;
}
function Ri(e, t, n) {
  for (; e !== null; ) {
    var r = e.alternate;
    if ((e.childLanes & t) !== t ? (e.childLanes |= t, r !== null && (r.childLanes |= t)) : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t), e === n) break;
    e = e.return;
  }
}
function nn(e, t) {
  br = e, ko = Xt = null, e = e.dependencies, e !== null && e.firstContext !== null && (e.lanes & t && (me = !0), e.firstContext = null);
}
function Pe(e) {
  var t = e._currentValue;
  if (ko !== e) if (e = { context: e, memoizedValue: t, next: null }, Xt === null) {
    if (br === null) throw Error(k(308));
    Xt = e, br.dependencies = { lanes: 0, firstContext: e };
  } else Xt = Xt.next = e;
  return t;
}
var Et = null;
function _o(e) {
  Et === null ? Et = [e] : Et.push(e);
}
function Na(e, t, n, r) {
  var l = t.interleaved;
  return l === null ? (n.next = n, _o(t)) : (n.next = l.next, l.next = n), t.interleaved = n, Je(e, r);
}
function Je(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; ) e.childLanes |= t, n = e.alternate, n !== null && (n.childLanes |= t), n = e, e = e.return;
  return n.tag === 3 ? n.stateNode : null;
}
var rt = !1;
function jo(e) {
  e.updateQueue = { baseState: e.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
}
function _a(e, t) {
  e = e.updateQueue, t.updateQueue === e && (t.updateQueue = { baseState: e.baseState, firstBaseUpdate: e.firstBaseUpdate, lastBaseUpdate: e.lastBaseUpdate, shared: e.shared, effects: e.effects });
}
function Ge(e, t) {
  return { eventTime: e, lane: t, tag: 0, payload: null, callback: null, next: null };
}
function ft(e, t, n) {
  var r = e.updateQueue;
  if (r === null) return null;
  if (r = r.shared, D & 2) {
    var l = r.pending;
    return l === null ? t.next = t : (t.next = l.next, l.next = t), r.pending = t, Je(e, n);
  }
  return l = r.interleaved, l === null ? (t.next = t, _o(r)) : (t.next = l.next, l.next = t), r.interleaved = t, Je(e, n);
}
function Rr(e, t, n) {
  if (t = t.updateQueue, t !== null && (t = t.shared, (n & 4194240) !== 0)) {
    var r = t.lanes;
    r &= e.pendingLanes, n |= r, t.lanes = n, ao(e, n);
  }
}
function Os(e, t) {
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
  rt = !1;
  var i = l.firstBaseUpdate, o = l.lastBaseUpdate, s = l.shared.pending;
  if (s !== null) {
    l.shared.pending = null;
    var a = s, d = a.next;
    a.next = null, o === null ? i = d : o.next = d, o = a;
    var m = e.alternate;
    m !== null && (m = m.updateQueue, s = m.lastBaseUpdate, s !== o && (s === null ? m.firstBaseUpdate = d : s.next = d, m.lastBaseUpdate = a));
  }
  if (i !== null) {
    var g = l.baseState;
    o = 0, m = d = a = null, s = i;
    do {
      var h = s.lane, y = s.eventTime;
      if ((r & h) === h) {
        m !== null && (m = m.next = {
          eventTime: y,
          lane: 0,
          tag: s.tag,
          payload: s.payload,
          callback: s.callback,
          next: null
        });
        e: {
          var w = e, S = s;
          switch (h = t, y = n, S.tag) {
            case 1:
              if (w = S.payload, typeof w == "function") {
                g = w.call(y, g, h);
                break e;
              }
              g = w;
              break e;
            case 3:
              w.flags = w.flags & -65537 | 128;
            case 0:
              if (w = S.payload, h = typeof w == "function" ? w.call(y, g, h) : w, h == null) break e;
              g = Y({}, g, h);
              break e;
            case 2:
              rt = !0;
          }
        }
        s.callback !== null && s.lane !== 0 && (e.flags |= 64, h = l.effects, h === null ? l.effects = [s] : h.push(s));
      } else y = { eventTime: y, lane: h, tag: s.tag, payload: s.payload, callback: s.callback, next: null }, m === null ? (d = m = y, a = g) : m = m.next = y, o |= h;
      if (s = s.next, s === null) {
        if (s = l.shared.pending, s === null) break;
        h = s, s = h.next, h.next = null, l.lastBaseUpdate = h, l.shared.pending = null;
      }
    } while (!0);
    if (m === null && (a = g), l.baseState = a, l.firstBaseUpdate = d, l.lastBaseUpdate = m, t = l.shared.interleaved, t !== null) {
      l = t;
      do
        o |= l.lane, l = l.next;
      while (l !== t);
    } else i === null && (l.shared.lanes = 0);
    Ot |= o, e.lanes = o, e.memoizedState = g;
  }
}
function Ds(e, t, n) {
  if (e = t.effects, t.effects = null, e !== null) for (t = 0; t < e.length; t++) {
    var r = e[t], l = r.callback;
    if (l !== null) {
      if (r.callback = null, r = n, typeof l != "function") throw Error(k(191, l));
      l.call(r);
    }
  }
}
var or = {}, We = xt(or), Zn = xt(or), Jn = xt(or);
function zt(e) {
  if (e === or) throw Error(k(174));
  return e;
}
function Co(e, t) {
  switch (B(Jn, t), B(Zn, e), B(We, or), e = t.nodeType, e) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : fi(null, "");
      break;
    default:
      e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = fi(t, e);
  }
  V(We), B(We, t);
}
function an() {
  V(We), V(Zn), V(Jn);
}
function ja(e) {
  zt(Jn.current);
  var t = zt(We.current), n = fi(t, e.type);
  t !== n && (B(Zn, e), B(We, n));
}
function Eo(e) {
  Zn.current === e && (V(We), V(Zn));
}
var K = xt(0);
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
function zo() {
  for (var e = 0; e < Gl.length; e++) Gl[e]._workInProgressVersionPrimary = null;
  Gl.length = 0;
}
var $r = be.ReactCurrentDispatcher, Yl = be.ReactCurrentBatchConfig, Mt = 0, G = null, q = null, te = null, nl = !1, On = !1, qn = 0, kf = 0;
function oe() {
  throw Error(k(321));
}
function Po(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++) if (!Fe(e[n], t[n])) return !1;
  return !0;
}
function To(e, t, n, r, l, i) {
  if (Mt = i, G = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, $r.current = e === null || e.memoizedState === null ? jf : Cf, e = n(r, l), On) {
    i = 0;
    do {
      if (On = !1, qn = 0, 25 <= i) throw Error(k(301));
      i += 1, te = q = null, t.updateQueue = null, $r.current = Ef, e = n(r, l);
    } while (On);
  }
  if ($r.current = rl, t = q !== null && q.next !== null, Mt = 0, te = q = G = null, nl = !1, t) throw Error(k(300));
  return e;
}
function Lo() {
  var e = qn !== 0;
  return qn = 0, e;
}
function Ue() {
  var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
  return te === null ? G.memoizedState = te = e : te = te.next = e, te;
}
function Te() {
  if (q === null) {
    var e = G.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = q.next;
  var t = te === null ? G.memoizedState : te.next;
  if (t !== null) te = t, q = e;
  else {
    if (e === null) throw Error(k(310));
    q = e, e = { memoizedState: q.memoizedState, baseState: q.baseState, baseQueue: q.baseQueue, queue: q.queue, next: null }, te === null ? G.memoizedState = te = e : te = te.next = e;
  }
  return te;
}
function bn(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function Xl(e) {
  var t = Te(), n = t.queue;
  if (n === null) throw Error(k(311));
  n.lastRenderedReducer = e;
  var r = q, l = r.baseQueue, i = n.pending;
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
      if ((Mt & m) === m) a !== null && (a = a.next = { lane: 0, action: d.action, hasEagerState: d.hasEagerState, eagerState: d.eagerState, next: null }), r = d.hasEagerState ? d.eagerState : e(r, d.action);
      else {
        var g = {
          lane: m,
          action: d.action,
          hasEagerState: d.hasEagerState,
          eagerState: d.eagerState,
          next: null
        };
        a === null ? (s = a = g, o = r) : a = a.next = g, G.lanes |= m, Ot |= m;
      }
      d = d.next;
    } while (d !== null && d !== i);
    a === null ? o = r : a.next = s, Fe(r, t.memoizedState) || (me = !0), t.memoizedState = r, t.baseState = o, t.baseQueue = a, n.lastRenderedState = r;
  }
  if (e = n.interleaved, e !== null) {
    l = e;
    do
      i = l.lane, G.lanes |= i, Ot |= i, l = l.next;
    while (l !== e);
  } else l === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function Zl(e) {
  var t = Te(), n = t.queue;
  if (n === null) throw Error(k(311));
  n.lastRenderedReducer = e;
  var r = n.dispatch, l = n.pending, i = t.memoizedState;
  if (l !== null) {
    n.pending = null;
    var o = l = l.next;
    do
      i = e(i, o.action), o = o.next;
    while (o !== l);
    Fe(i, t.memoizedState) || (me = !0), t.memoizedState = i, t.baseQueue === null && (t.baseState = i), n.lastRenderedState = i;
  }
  return [i, r];
}
function Ca() {
}
function Ea(e, t) {
  var n = G, r = Te(), l = t(), i = !Fe(r.memoizedState, l);
  if (i && (r.memoizedState = l, me = !0), r = r.queue, Ro(Ta.bind(null, n, r, e), [e]), r.getSnapshot !== t || i || te !== null && te.memoizedState.tag & 1) {
    if (n.flags |= 2048, er(9, Pa.bind(null, n, r, l, t), void 0, null), ne === null) throw Error(k(349));
    Mt & 30 || za(n, t, l);
  }
  return l;
}
function za(e, t, n) {
  e.flags |= 16384, e = { getSnapshot: t, value: n }, t = G.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, G.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
}
function Pa(e, t, n, r) {
  t.value = n, t.getSnapshot = r, La(t) && Ra(e);
}
function Ta(e, t, n) {
  return n(function() {
    La(t) && Ra(e);
  });
}
function La(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !Fe(e, n);
  } catch {
    return !0;
  }
}
function Ra(e) {
  var t = Je(e, 1);
  t !== null && De(t, e, 1, -1);
}
function Fs(e) {
  var t = Ue();
  return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: bn, lastRenderedState: e }, t.queue = e, e = e.dispatch = _f.bind(null, G, e), [t.memoizedState, e];
}
function er(e, t, n, r) {
  return e = { tag: e, create: t, destroy: n, deps: r, next: null }, t = G.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, G.updateQueue = t, t.lastEffect = e.next = e) : (n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e)), e;
}
function $a() {
  return Te().memoizedState;
}
function Mr(e, t, n, r) {
  var l = Ue();
  G.flags |= e, l.memoizedState = er(1 | t, n, void 0, r === void 0 ? null : r);
}
function vl(e, t, n, r) {
  var l = Te();
  r = r === void 0 ? null : r;
  var i = void 0;
  if (q !== null) {
    var o = q.memoizedState;
    if (i = o.destroy, r !== null && Po(r, o.deps)) {
      l.memoizedState = er(t, n, i, r);
      return;
    }
  }
  G.flags |= e, l.memoizedState = er(1 | t, n, i, r);
}
function Is(e, t) {
  return Mr(8390656, 8, e, t);
}
function Ro(e, t) {
  return vl(2048, 8, e, t);
}
function Ma(e, t) {
  return vl(4, 2, e, t);
}
function Oa(e, t) {
  return vl(4, 4, e, t);
}
function Da(e, t) {
  if (typeof t == "function") return e = e(), t(e), function() {
    t(null);
  };
  if (t != null) return e = e(), t.current = e, function() {
    t.current = null;
  };
}
function Fa(e, t, n) {
  return n = n != null ? n.concat([e]) : null, vl(4, 4, Da.bind(null, t, e), n);
}
function $o() {
}
function Ia(e, t) {
  var n = Te();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && Po(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
}
function Ua(e, t) {
  var n = Te();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && Po(t, r[1]) ? r[0] : (e = e(), n.memoizedState = [e, t], e);
}
function Aa(e, t, n) {
  return Mt & 21 ? (Fe(n, t) || (n = Qu(), G.lanes |= n, Ot |= n, e.baseState = !0), t) : (e.baseState && (e.baseState = !1, me = !0), e.memoizedState = n);
}
function Sf(e, t) {
  var n = U;
  U = n !== 0 && 4 > n ? n : 4, e(!0);
  var r = Yl.transition;
  Yl.transition = {};
  try {
    e(!1), t();
  } finally {
    U = n, Yl.transition = r;
  }
}
function Ba() {
  return Te().memoizedState;
}
function Nf(e, t, n) {
  var r = ht(e);
  if (n = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null }, Wa(e)) Va(t, n);
  else if (n = Na(e, t, n, r), n !== null) {
    var l = de();
    De(n, e, r, l), Ha(n, t, r);
  }
}
function _f(e, t, n) {
  var r = ht(e), l = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (Wa(e)) Va(t, l);
  else {
    var i = e.alternate;
    if (e.lanes === 0 && (i === null || i.lanes === 0) && (i = t.lastRenderedReducer, i !== null)) try {
      var o = t.lastRenderedState, s = i(o, n);
      if (l.hasEagerState = !0, l.eagerState = s, Fe(s, o)) {
        var a = t.interleaved;
        a === null ? (l.next = l, _o(t)) : (l.next = a.next, a.next = l), t.interleaved = l;
        return;
      }
    } catch {
    } finally {
    }
    n = Na(e, t, l, r), n !== null && (l = de(), De(n, e, r, l), Ha(n, t, r));
  }
}
function Wa(e) {
  var t = e.alternate;
  return e === G || t !== null && t === G;
}
function Va(e, t) {
  On = nl = !0;
  var n = e.pending;
  n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
}
function Ha(e, t, n) {
  if (n & 4194240) {
    var r = t.lanes;
    r &= e.pendingLanes, n |= r, t.lanes = n, ao(e, n);
  }
}
var rl = { readContext: Pe, useCallback: oe, useContext: oe, useEffect: oe, useImperativeHandle: oe, useInsertionEffect: oe, useLayoutEffect: oe, useMemo: oe, useReducer: oe, useRef: oe, useState: oe, useDebugValue: oe, useDeferredValue: oe, useTransition: oe, useMutableSource: oe, useSyncExternalStore: oe, useId: oe, unstable_isNewReconciler: !1 }, jf = { readContext: Pe, useCallback: function(e, t) {
  return Ue().memoizedState = [e, t === void 0 ? null : t], e;
}, useContext: Pe, useEffect: Is, useImperativeHandle: function(e, t, n) {
  return n = n != null ? n.concat([e]) : null, Mr(
    4194308,
    4,
    Da.bind(null, t, e),
    n
  );
}, useLayoutEffect: function(e, t) {
  return Mr(4194308, 4, e, t);
}, useInsertionEffect: function(e, t) {
  return Mr(4, 2, e, t);
}, useMemo: function(e, t) {
  var n = Ue();
  return t = t === void 0 ? null : t, e = e(), n.memoizedState = [e, t], e;
}, useReducer: function(e, t, n) {
  var r = Ue();
  return t = n !== void 0 ? n(t) : t, r.memoizedState = r.baseState = t, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: t }, r.queue = e, e = e.dispatch = Nf.bind(null, G, e), [r.memoizedState, e];
}, useRef: function(e) {
  var t = Ue();
  return e = { current: e }, t.memoizedState = e;
}, useState: Fs, useDebugValue: $o, useDeferredValue: function(e) {
  return Ue().memoizedState = e;
}, useTransition: function() {
  var e = Fs(!1), t = e[0];
  return e = Sf.bind(null, e[1]), Ue().memoizedState = e, [t, e];
}, useMutableSource: function() {
}, useSyncExternalStore: function(e, t, n) {
  var r = G, l = Ue();
  if (H) {
    if (n === void 0) throw Error(k(407));
    n = n();
  } else {
    if (n = t(), ne === null) throw Error(k(349));
    Mt & 30 || za(r, t, n);
  }
  l.memoizedState = n;
  var i = { value: n, getSnapshot: t };
  return l.queue = i, Is(Ta.bind(
    null,
    r,
    i,
    e
  ), [e]), r.flags |= 2048, er(9, Pa.bind(null, r, i, n, t), void 0, null), n;
}, useId: function() {
  var e = Ue(), t = ne.identifierPrefix;
  if (H) {
    var n = Ke, r = Qe;
    n = (r & ~(1 << 32 - Oe(r) - 1)).toString(32) + n, t = ":" + t + "R" + n, n = qn++, 0 < n && (t += "H" + n.toString(32)), t += ":";
  } else n = kf++, t = ":" + t + "r" + n.toString(32) + ":";
  return e.memoizedState = t;
}, unstable_isNewReconciler: !1 }, Cf = {
  readContext: Pe,
  useCallback: Ia,
  useContext: Pe,
  useEffect: Ro,
  useImperativeHandle: Fa,
  useInsertionEffect: Ma,
  useLayoutEffect: Oa,
  useMemo: Ua,
  useReducer: Xl,
  useRef: $a,
  useState: function() {
    return Xl(bn);
  },
  useDebugValue: $o,
  useDeferredValue: function(e) {
    var t = Te();
    return Aa(t, q.memoizedState, e);
  },
  useTransition: function() {
    var e = Xl(bn)[0], t = Te().memoizedState;
    return [e, t];
  },
  useMutableSource: Ca,
  useSyncExternalStore: Ea,
  useId: Ba,
  unstable_isNewReconciler: !1
}, Ef = { readContext: Pe, useCallback: Ia, useContext: Pe, useEffect: Ro, useImperativeHandle: Fa, useInsertionEffect: Ma, useLayoutEffect: Oa, useMemo: Ua, useReducer: Zl, useRef: $a, useState: function() {
  return Zl(bn);
}, useDebugValue: $o, useDeferredValue: function(e) {
  var t = Te();
  return q === null ? t.memoizedState = e : Aa(t, q.memoizedState, e);
}, useTransition: function() {
  var e = Zl(bn)[0], t = Te().memoizedState;
  return [e, t];
}, useMutableSource: Ca, useSyncExternalStore: Ea, useId: Ba, unstable_isNewReconciler: !1 };
function Re(e, t) {
  if (e && e.defaultProps) {
    t = Y({}, t), e = e.defaultProps;
    for (var n in e) t[n] === void 0 && (t[n] = e[n]);
    return t;
  }
  return t;
}
function $i(e, t, n, r) {
  t = e.memoizedState, n = n(r, t), n = n == null ? t : Y({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
}
var yl = { isMounted: function(e) {
  return (e = e._reactInternals) ? It(e) === e : !1;
}, enqueueSetState: function(e, t, n) {
  e = e._reactInternals;
  var r = de(), l = ht(e), i = Ge(r, l);
  i.payload = t, n != null && (i.callback = n), t = ft(e, i, l), t !== null && (De(t, e, l, r), Rr(t, e, l));
}, enqueueReplaceState: function(e, t, n) {
  e = e._reactInternals;
  var r = de(), l = ht(e), i = Ge(r, l);
  i.tag = 1, i.payload = t, n != null && (i.callback = n), t = ft(e, i, l), t !== null && (De(t, e, l, r), Rr(t, e, l));
}, enqueueForceUpdate: function(e, t) {
  e = e._reactInternals;
  var n = de(), r = ht(e), l = Ge(n, r);
  l.tag = 2, t != null && (l.callback = t), t = ft(e, l, r), t !== null && (De(t, e, r, n), Rr(t, e, r));
} };
function Us(e, t, n, r, l, i, o) {
  return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, i, o) : t.prototype && t.prototype.isPureReactComponent ? !Kn(n, r) || !Kn(l, i) : !0;
}
function Qa(e, t, n) {
  var r = !1, l = vt, i = t.contextType;
  return typeof i == "object" && i !== null ? i = Pe(i) : (l = ve(t) ? Rt : ae.current, r = t.contextTypes, i = (r = r != null) ? on(e, l) : vt), t = new t(n, i), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = yl, e.stateNode = t, t._reactInternals = e, r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = l, e.__reactInternalMemoizedMaskedChildContext = i), t;
}
function As(e, t, n, r) {
  e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && yl.enqueueReplaceState(t, t.state, null);
}
function Mi(e, t, n, r) {
  var l = e.stateNode;
  l.props = n, l.state = e.memoizedState, l.refs = {}, jo(e);
  var i = t.contextType;
  typeof i == "object" && i !== null ? l.context = Pe(i) : (i = ve(t) ? Rt : ae.current, l.context = on(e, i)), l.state = e.memoizedState, i = t.getDerivedStateFromProps, typeof i == "function" && ($i(e, t, i, n), l.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof l.getSnapshotBeforeUpdate == "function" || typeof l.UNSAFE_componentWillMount != "function" && typeof l.componentWillMount != "function" || (t = l.state, typeof l.componentWillMount == "function" && l.componentWillMount(), typeof l.UNSAFE_componentWillMount == "function" && l.UNSAFE_componentWillMount(), t !== l.state && yl.enqueueReplaceState(l, l.state, null), el(e, n, l, r), l.state = e.memoizedState), typeof l.componentDidMount == "function" && (e.flags |= 4194308);
}
function cn(e, t) {
  try {
    var n = "", r = t;
    do
      n += ed(r), r = r.return;
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
function Oi(e, t) {
  try {
    console.error(t.value);
  } catch (n) {
    setTimeout(function() {
      throw n;
    });
  }
}
var zf = typeof WeakMap == "function" ? WeakMap : Map;
function Ka(e, t, n) {
  n = Ge(-1, n), n.tag = 3, n.payload = { element: null };
  var r = t.value;
  return n.callback = function() {
    il || (il = !0, Qi = r), Oi(e, t);
  }, n;
}
function Ga(e, t, n) {
  n = Ge(-1, n), n.tag = 3;
  var r = e.type.getDerivedStateFromError;
  if (typeof r == "function") {
    var l = t.value;
    n.payload = function() {
      return r(l);
    }, n.callback = function() {
      Oi(e, t);
    };
  }
  var i = e.stateNode;
  return i !== null && typeof i.componentDidCatch == "function" && (n.callback = function() {
    Oi(e, t), typeof r != "function" && (pt === null ? pt = /* @__PURE__ */ new Set([this]) : pt.add(this));
    var o = t.stack;
    this.componentDidCatch(t.value, { componentStack: o !== null ? o : "" });
  }), n;
}
function Bs(e, t, n) {
  var r = e.pingCache;
  if (r === null) {
    r = e.pingCache = new zf();
    var l = /* @__PURE__ */ new Set();
    r.set(t, l);
  } else l = r.get(t), l === void 0 && (l = /* @__PURE__ */ new Set(), r.set(t, l));
  l.has(n) || (l.add(n), e = Wf.bind(null, e, t, n), t.then(e, e));
}
function Ws(e) {
  do {
    var t;
    if ((t = e.tag === 13) && (t = e.memoizedState, t = t !== null ? t.dehydrated !== null : !0), t) return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function Vs(e, t, n, r, l) {
  return e.mode & 1 ? (e.flags |= 65536, e.lanes = l, e) : (e === t ? e.flags |= 65536 : (e.flags |= 128, n.flags |= 131072, n.flags &= -52805, n.tag === 1 && (n.alternate === null ? n.tag = 17 : (t = Ge(-1, 1), t.tag = 2, ft(n, t, 1))), n.lanes |= 1), e);
}
var Pf = be.ReactCurrentOwner, me = !1;
function ce(e, t, n, r) {
  t.child = e === null ? Sa(t, null, n, r) : un(t, e.child, n, r);
}
function Hs(e, t, n, r, l) {
  n = n.render;
  var i = t.ref;
  return nn(t, l), r = To(e, t, n, r, i, l), n = Lo(), e !== null && !me ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, qe(e, t, l)) : (H && n && yo(t), t.flags |= 1, ce(e, t, r, l), t.child);
}
function Qs(e, t, n, r, l) {
  if (e === null) {
    var i = n.type;
    return typeof i == "function" && !Bo(i) && i.defaultProps === void 0 && n.compare === null && n.defaultProps === void 0 ? (t.tag = 15, t.type = i, Ya(e, t, i, r, l)) : (e = Ir(n.type, null, r, t, t.mode, l), e.ref = t.ref, e.return = t, t.child = e);
  }
  if (i = e.child, !(e.lanes & l)) {
    var o = i.memoizedProps;
    if (n = n.compare, n = n !== null ? n : Kn, n(o, r) && e.ref === t.ref) return qe(e, t, l);
  }
  return t.flags |= 1, e = mt(i, r), e.ref = t.ref, e.return = t, t.child = e;
}
function Ya(e, t, n, r, l) {
  if (e !== null) {
    var i = e.memoizedProps;
    if (Kn(i, r) && e.ref === t.ref) if (me = !1, t.pendingProps = r = i, (e.lanes & l) !== 0) e.flags & 131072 && (me = !0);
    else return t.lanes = e.lanes, qe(e, t, l);
  }
  return Di(e, t, n, r, l);
}
function Xa(e, t, n) {
  var r = t.pendingProps, l = r.children, i = e !== null ? e.memoizedState : null;
  if (r.mode === "hidden") if (!(t.mode & 1)) t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, B(Jt, xe), xe |= n;
  else {
    if (!(n & 1073741824)) return e = i !== null ? i.baseLanes | n : n, t.lanes = t.childLanes = 1073741824, t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }, t.updateQueue = null, B(Jt, xe), xe |= e, null;
    t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, r = i !== null ? i.baseLanes : n, B(Jt, xe), xe |= r;
  }
  else i !== null ? (r = i.baseLanes | n, t.memoizedState = null) : r = n, B(Jt, xe), xe |= r;
  return ce(e, t, l, n), t.child;
}
function Za(e, t) {
  var n = t.ref;
  (e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= 512, t.flags |= 2097152);
}
function Di(e, t, n, r, l) {
  var i = ve(n) ? Rt : ae.current;
  return i = on(t, i), nn(t, l), n = To(e, t, n, r, i, l), r = Lo(), e !== null && !me ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, qe(e, t, l)) : (H && r && yo(t), t.flags |= 1, ce(e, t, n, l), t.child);
}
function Ks(e, t, n, r, l) {
  if (ve(n)) {
    var i = !0;
    Xr(t);
  } else i = !1;
  if (nn(t, l), t.stateNode === null) Or(e, t), Qa(t, n, r), Mi(t, n, r, l), r = !0;
  else if (e === null) {
    var o = t.stateNode, s = t.memoizedProps;
    o.props = s;
    var a = o.context, d = n.contextType;
    typeof d == "object" && d !== null ? d = Pe(d) : (d = ve(n) ? Rt : ae.current, d = on(t, d));
    var m = n.getDerivedStateFromProps, g = typeof m == "function" || typeof o.getSnapshotBeforeUpdate == "function";
    g || typeof o.UNSAFE_componentWillReceiveProps != "function" && typeof o.componentWillReceiveProps != "function" || (s !== r || a !== d) && As(t, o, r, d), rt = !1;
    var h = t.memoizedState;
    o.state = h, el(t, r, o, l), a = t.memoizedState, s !== r || h !== a || ge.current || rt ? (typeof m == "function" && ($i(t, n, m, r), a = t.memoizedState), (s = rt || Us(t, n, s, r, h, a, d)) ? (g || typeof o.UNSAFE_componentWillMount != "function" && typeof o.componentWillMount != "function" || (typeof o.componentWillMount == "function" && o.componentWillMount(), typeof o.UNSAFE_componentWillMount == "function" && o.UNSAFE_componentWillMount()), typeof o.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof o.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = a), o.props = r, o.state = a, o.context = d, r = s) : (typeof o.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
  } else {
    o = t.stateNode, _a(e, t), s = t.memoizedProps, d = t.type === t.elementType ? s : Re(t.type, s), o.props = d, g = t.pendingProps, h = o.context, a = n.contextType, typeof a == "object" && a !== null ? a = Pe(a) : (a = ve(n) ? Rt : ae.current, a = on(t, a));
    var y = n.getDerivedStateFromProps;
    (m = typeof y == "function" || typeof o.getSnapshotBeforeUpdate == "function") || typeof o.UNSAFE_componentWillReceiveProps != "function" && typeof o.componentWillReceiveProps != "function" || (s !== g || h !== a) && As(t, o, r, a), rt = !1, h = t.memoizedState, o.state = h, el(t, r, o, l);
    var w = t.memoizedState;
    s !== g || h !== w || ge.current || rt ? (typeof y == "function" && ($i(t, n, y, r), w = t.memoizedState), (d = rt || Us(t, n, d, r, h, w, a) || !1) ? (m || typeof o.UNSAFE_componentWillUpdate != "function" && typeof o.componentWillUpdate != "function" || (typeof o.componentWillUpdate == "function" && o.componentWillUpdate(r, w, a), typeof o.UNSAFE_componentWillUpdate == "function" && o.UNSAFE_componentWillUpdate(r, w, a)), typeof o.componentDidUpdate == "function" && (t.flags |= 4), typeof o.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof o.componentDidUpdate != "function" || s === e.memoizedProps && h === e.memoizedState || (t.flags |= 4), typeof o.getSnapshotBeforeUpdate != "function" || s === e.memoizedProps && h === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = w), o.props = r, o.state = w, o.context = a, r = d) : (typeof o.componentDidUpdate != "function" || s === e.memoizedProps && h === e.memoizedState || (t.flags |= 4), typeof o.getSnapshotBeforeUpdate != "function" || s === e.memoizedProps && h === e.memoizedState || (t.flags |= 1024), r = !1);
  }
  return Fi(e, t, n, r, i, l);
}
function Fi(e, t, n, r, l, i) {
  Za(e, t);
  var o = (t.flags & 128) !== 0;
  if (!r && !o) return l && Ls(t, n, !1), qe(e, t, i);
  r = t.stateNode, Pf.current = t;
  var s = o && typeof n.getDerivedStateFromError != "function" ? null : r.render();
  return t.flags |= 1, e !== null && o ? (t.child = un(t, e.child, null, i), t.child = un(t, null, s, i)) : ce(e, t, s, i), t.memoizedState = r.state, l && Ls(t, n, !0), t.child;
}
function Ja(e) {
  var t = e.stateNode;
  t.pendingContext ? Ts(e, t.pendingContext, t.pendingContext !== t.context) : t.context && Ts(e, t.context, !1), Co(e, t.containerInfo);
}
function Gs(e, t, n, r, l) {
  return sn(), wo(l), t.flags |= 256, ce(e, t, n, r), t.child;
}
var Ii = { dehydrated: null, treeContext: null, retryLane: 0 };
function Ui(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function qa(e, t, n) {
  var r = t.pendingProps, l = K.current, i = !1, o = (t.flags & 128) !== 0, s;
  if ((s = o) || (s = e !== null && e.memoizedState === null ? !1 : (l & 2) !== 0), s ? (i = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (l |= 1), B(K, l & 1), e === null)
    return Li(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? (t.mode & 1 ? e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824 : t.lanes = 1, null) : (o = r.children, e = r.fallback, i ? (r = t.mode, i = t.child, o = { mode: "hidden", children: o }, !(r & 1) && i !== null ? (i.childLanes = 0, i.pendingProps = o) : i = kl(o, r, 0, null), e = Lt(e, r, n, null), i.return = t, e.return = t, i.sibling = e, t.child = i, t.child.memoizedState = Ui(n), t.memoizedState = Ii, e) : Mo(t, o));
  if (l = e.memoizedState, l !== null && (s = l.dehydrated, s !== null)) return Tf(e, t, o, r, s, l, n);
  if (i) {
    i = r.fallback, o = t.mode, l = e.child, s = l.sibling;
    var a = { mode: "hidden", children: r.children };
    return !(o & 1) && t.child !== l ? (r = t.child, r.childLanes = 0, r.pendingProps = a, t.deletions = null) : (r = mt(l, a), r.subtreeFlags = l.subtreeFlags & 14680064), s !== null ? i = mt(s, i) : (i = Lt(i, o, n, null), i.flags |= 2), i.return = t, r.return = t, r.sibling = i, t.child = r, r = i, i = t.child, o = e.child.memoizedState, o = o === null ? Ui(n) : { baseLanes: o.baseLanes | n, cachePool: null, transitions: o.transitions }, i.memoizedState = o, i.childLanes = e.childLanes & ~n, t.memoizedState = Ii, r;
  }
  return i = e.child, e = i.sibling, r = mt(i, { mode: "visible", children: r.children }), !(t.mode & 1) && (r.lanes = n), r.return = t, r.sibling = null, e !== null && (n = t.deletions, n === null ? (t.deletions = [e], t.flags |= 16) : n.push(e)), t.child = r, t.memoizedState = null, r;
}
function Mo(e, t) {
  return t = kl({ mode: "visible", children: t }, e.mode, 0, null), t.return = e, e.child = t;
}
function Nr(e, t, n, r) {
  return r !== null && wo(r), un(t, e.child, null, n), e = Mo(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
}
function Tf(e, t, n, r, l, i, o) {
  if (n)
    return t.flags & 256 ? (t.flags &= -257, r = Jl(Error(k(422))), Nr(e, t, o, r)) : t.memoizedState !== null ? (t.child = e.child, t.flags |= 128, null) : (i = r.fallback, l = t.mode, r = kl({ mode: "visible", children: r.children }, l, 0, null), i = Lt(i, l, o, null), i.flags |= 2, r.return = t, i.return = t, r.sibling = i, t.child = r, t.mode & 1 && un(t, e.child, null, o), t.child.memoizedState = Ui(o), t.memoizedState = Ii, i);
  if (!(t.mode & 1)) return Nr(e, t, o, null);
  if (l.data === "$!") {
    if (r = l.nextSibling && l.nextSibling.dataset, r) var s = r.dgst;
    return r = s, i = Error(k(419)), r = Jl(i, r, void 0), Nr(e, t, o, r);
  }
  if (s = (o & e.childLanes) !== 0, me || s) {
    if (r = ne, r !== null) {
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
      l = l & (r.suspendedLanes | o) ? 0 : l, l !== 0 && l !== i.retryLane && (i.retryLane = l, Je(e, l), De(r, e, l, -1));
    }
    return Ao(), r = Jl(Error(k(421))), Nr(e, t, o, r);
  }
  return l.data === "$?" ? (t.flags |= 128, t.child = e.child, t = Vf.bind(null, e), l._reactRetry = t, null) : (e = i.treeContext, we = dt(l.nextSibling), ke = t, H = !0, Me = null, e !== null && (je[Ce++] = Qe, je[Ce++] = Ke, je[Ce++] = $t, Qe = e.id, Ke = e.overflow, $t = t), t = Mo(t, r.children), t.flags |= 4096, t);
}
function Ys(e, t, n) {
  e.lanes |= t;
  var r = e.alternate;
  r !== null && (r.lanes |= t), Ri(e.return, t, n);
}
function ql(e, t, n, r, l) {
  var i = e.memoizedState;
  i === null ? e.memoizedState = { isBackwards: t, rendering: null, renderingStartTime: 0, last: r, tail: n, tailMode: l } : (i.isBackwards = t, i.rendering = null, i.renderingStartTime = 0, i.last = r, i.tail = n, i.tailMode = l);
}
function ba(e, t, n) {
  var r = t.pendingProps, l = r.revealOrder, i = r.tail;
  if (ce(e, t, r.children, n), r = K.current, r & 2) r = r & 1 | 2, t.flags |= 128;
  else {
    if (e !== null && e.flags & 128) e: for (e = t.child; e !== null; ) {
      if (e.tag === 13) e.memoizedState !== null && Ys(e, n, t);
      else if (e.tag === 19) Ys(e, n, t);
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
  if (B(K, r), !(t.mode & 1)) t.memoizedState = null;
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
function qe(e, t, n) {
  if (e !== null && (t.dependencies = e.dependencies), Ot |= t.lanes, !(n & t.childLanes)) return null;
  if (e !== null && t.child !== e.child) throw Error(k(153));
  if (t.child !== null) {
    for (e = t.child, n = mt(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null; ) e = e.sibling, n = n.sibling = mt(e, e.pendingProps), n.return = t;
    n.sibling = null;
  }
  return t.child;
}
function Lf(e, t, n) {
  switch (t.tag) {
    case 3:
      Ja(t), sn();
      break;
    case 5:
      ja(t);
      break;
    case 1:
      ve(t.type) && Xr(t);
      break;
    case 4:
      Co(t, t.stateNode.containerInfo);
      break;
    case 10:
      var r = t.type._context, l = t.memoizedProps.value;
      B(qr, r._currentValue), r._currentValue = l;
      break;
    case 13:
      if (r = t.memoizedState, r !== null)
        return r.dehydrated !== null ? (B(K, K.current & 1), t.flags |= 128, null) : n & t.child.childLanes ? qa(e, t, n) : (B(K, K.current & 1), e = qe(e, t, n), e !== null ? e.sibling : null);
      B(K, K.current & 1);
      break;
    case 19:
      if (r = (n & t.childLanes) !== 0, e.flags & 128) {
        if (r) return ba(e, t, n);
        t.flags |= 128;
      }
      if (l = t.memoizedState, l !== null && (l.rendering = null, l.tail = null, l.lastEffect = null), B(K, K.current), r) break;
      return null;
    case 22:
    case 23:
      return t.lanes = 0, Xa(e, t, n);
  }
  return qe(e, t, n);
}
var ec, Ai, tc, nc;
ec = function(e, t) {
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
Ai = function() {
};
tc = function(e, t, n, r) {
  var l = e.memoizedProps;
  if (l !== r) {
    e = t.stateNode, zt(We.current);
    var i = null;
    switch (n) {
      case "input":
        l = ui(e, l), r = ui(e, r), i = [];
        break;
      case "select":
        l = Y({}, l, { value: void 0 }), r = Y({}, r, { value: void 0 }), i = [];
        break;
      case "textarea":
        l = di(e, l), r = di(e, r), i = [];
        break;
      default:
        typeof l.onClick != "function" && typeof r.onClick == "function" && (e.onclick = Gr);
    }
    pi(n, r);
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
      else d === "dangerouslySetInnerHTML" ? (a = a ? a.__html : void 0, s = s ? s.__html : void 0, a != null && s !== a && (i = i || []).push(d, a)) : d === "children" ? typeof a != "string" && typeof a != "number" || (i = i || []).push(d, "" + a) : d !== "suppressContentEditableWarning" && d !== "suppressHydrationWarning" && (Un.hasOwnProperty(d) ? (a != null && d === "onScroll" && W("scroll", e), i || s === a || (i = [])) : (i = i || []).push(d, a));
    }
    n && (i = i || []).push("style", n);
    var d = i;
    (t.updateQueue = d) && (t.flags |= 4);
  }
};
nc = function(e, t, n, r) {
  n !== r && (t.flags |= 4);
};
function _n(e, t) {
  if (!H) switch (e.tailMode) {
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
function Rf(e, t, n) {
  var r = t.pendingProps;
  switch (xo(t), t.tag) {
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
      return r = t.stateNode, an(), V(ge), V(ae), zo(), r.pendingContext && (r.context = r.pendingContext, r.pendingContext = null), (e === null || e.child === null) && (kr(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, Me !== null && (Yi(Me), Me = null))), Ai(e, t), se(t), null;
    case 5:
      Eo(t);
      var l = zt(Jn.current);
      if (n = t.type, e !== null && t.stateNode != null) tc(e, t, n, r, l), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
      else {
        if (!r) {
          if (t.stateNode === null) throw Error(k(166));
          return se(t), null;
        }
        if (e = zt(We.current), kr(t)) {
          r = t.stateNode, n = t.type;
          var i = t.memoizedProps;
          switch (r[Ae] = t, r[Xn] = i, e = (t.mode & 1) !== 0, n) {
            case "dialog":
              W("cancel", r), W("close", r);
              break;
            case "iframe":
            case "object":
            case "embed":
              W("load", r);
              break;
            case "video":
            case "audio":
              for (l = 0; l < Pn.length; l++) W(Pn[l], r);
              break;
            case "source":
              W("error", r);
              break;
            case "img":
            case "image":
            case "link":
              W(
                "error",
                r
              ), W("load", r);
              break;
            case "details":
              W("toggle", r);
              break;
            case "input":
              rs(r, i), W("invalid", r);
              break;
            case "select":
              r._wrapperState = { wasMultiple: !!i.multiple }, W("invalid", r);
              break;
            case "textarea":
              is(r, i), W("invalid", r);
          }
          pi(n, i), l = null;
          for (var o in i) if (i.hasOwnProperty(o)) {
            var s = i[o];
            o === "children" ? typeof s == "string" ? r.textContent !== s && (i.suppressHydrationWarning !== !0 && wr(r.textContent, s, e), l = ["children", s]) : typeof s == "number" && r.textContent !== "" + s && (i.suppressHydrationWarning !== !0 && wr(
              r.textContent,
              s,
              e
            ), l = ["children", "" + s]) : Un.hasOwnProperty(o) && s != null && o === "onScroll" && W("scroll", r);
          }
          switch (n) {
            case "input":
              fr(r), ls(r, i, !0);
              break;
            case "textarea":
              fr(r), os(r);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof i.onClick == "function" && (r.onclick = Gr);
          }
          r = l, t.updateQueue = r, r !== null && (t.flags |= 4);
        } else {
          o = l.nodeType === 9 ? l : l.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = Tu(n)), e === "http://www.w3.org/1999/xhtml" ? n === "script" ? (e = o.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof r.is == "string" ? e = o.createElement(n, { is: r.is }) : (e = o.createElement(n), n === "select" && (o = e, r.multiple ? o.multiple = !0 : r.size && (o.size = r.size))) : e = o.createElementNS(e, n), e[Ae] = t, e[Xn] = r, ec(e, t, !1, !1), t.stateNode = e;
          e: {
            switch (o = hi(n, r), n) {
              case "dialog":
                W("cancel", e), W("close", e), l = r;
                break;
              case "iframe":
              case "object":
              case "embed":
                W("load", e), l = r;
                break;
              case "video":
              case "audio":
                for (l = 0; l < Pn.length; l++) W(Pn[l], e);
                l = r;
                break;
              case "source":
                W("error", e), l = r;
                break;
              case "img":
              case "image":
              case "link":
                W(
                  "error",
                  e
                ), W("load", e), l = r;
                break;
              case "details":
                W("toggle", e), l = r;
                break;
              case "input":
                rs(e, r), l = ui(e, r), W("invalid", e);
                break;
              case "option":
                l = r;
                break;
              case "select":
                e._wrapperState = { wasMultiple: !!r.multiple }, l = Y({}, r, { value: void 0 }), W("invalid", e);
                break;
              case "textarea":
                is(e, r), l = di(e, r), W("invalid", e);
                break;
              default:
                l = r;
            }
            pi(n, l), s = l;
            for (i in s) if (s.hasOwnProperty(i)) {
              var a = s[i];
              i === "style" ? $u(e, a) : i === "dangerouslySetInnerHTML" ? (a = a ? a.__html : void 0, a != null && Lu(e, a)) : i === "children" ? typeof a == "string" ? (n !== "textarea" || a !== "") && An(e, a) : typeof a == "number" && An(e, "" + a) : i !== "suppressContentEditableWarning" && i !== "suppressHydrationWarning" && i !== "autoFocus" && (Un.hasOwnProperty(i) ? a != null && i === "onScroll" && W("scroll", e) : a != null && ro(e, i, a, o));
            }
            switch (n) {
              case "input":
                fr(e), ls(e, r, !1);
                break;
              case "textarea":
                fr(e), os(e);
                break;
              case "option":
                r.value != null && e.setAttribute("value", "" + gt(r.value));
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
      if (e && t.stateNode != null) nc(e, t, e.memoizedProps, r);
      else {
        if (typeof r != "string" && t.stateNode === null) throw Error(k(166));
        if (n = zt(Jn.current), zt(We.current), kr(t)) {
          if (r = t.stateNode, n = t.memoizedProps, r[Ae] = t, (i = r.nodeValue !== n) && (e = ke, e !== null)) switch (e.tag) {
            case 3:
              wr(r.nodeValue, n, (e.mode & 1) !== 0);
              break;
            case 5:
              e.memoizedProps.suppressHydrationWarning !== !0 && wr(r.nodeValue, n, (e.mode & 1) !== 0);
          }
          i && (t.flags |= 4);
        } else r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r), r[Ae] = t, t.stateNode = r;
      }
      return se(t), null;
    case 13:
      if (V(K), r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
        if (H && we !== null && t.mode & 1 && !(t.flags & 128)) wa(), sn(), t.flags |= 98560, i = !1;
        else if (i = kr(t), r !== null && r.dehydrated !== null) {
          if (e === null) {
            if (!i) throw Error(k(318));
            if (i = t.memoizedState, i = i !== null ? i.dehydrated : null, !i) throw Error(k(317));
            i[Ae] = t;
          } else sn(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
          se(t), i = !1;
        } else Me !== null && (Yi(Me), Me = null), i = !0;
        if (!i) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128 ? (t.lanes = n, t) : (r = r !== null, r !== (e !== null && e.memoizedState !== null) && r && (t.child.flags |= 8192, t.mode & 1 && (e === null || K.current & 1 ? b === 0 && (b = 3) : Ao())), t.updateQueue !== null && (t.flags |= 4), se(t), null);
    case 4:
      return an(), Ai(e, t), e === null && Gn(t.stateNode.containerInfo), se(t), null;
    case 10:
      return No(t.type._context), se(t), null;
    case 17:
      return ve(t.type) && Yr(), se(t), null;
    case 19:
      if (V(K), i = t.memoizedState, i === null) return se(t), null;
      if (r = (t.flags & 128) !== 0, o = i.rendering, o === null) if (r) _n(i, !1);
      else {
        if (b !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null; ) {
          if (o = tl(e), o !== null) {
            for (t.flags |= 128, _n(i, !1), r = o.updateQueue, r !== null && (t.updateQueue = r, t.flags |= 4), t.subtreeFlags = 0, r = n, n = t.child; n !== null; ) i = n, e = r, i.flags &= 14680066, o = i.alternate, o === null ? (i.childLanes = 0, i.lanes = e, i.child = null, i.subtreeFlags = 0, i.memoizedProps = null, i.memoizedState = null, i.updateQueue = null, i.dependencies = null, i.stateNode = null) : (i.childLanes = o.childLanes, i.lanes = o.lanes, i.child = o.child, i.subtreeFlags = 0, i.deletions = null, i.memoizedProps = o.memoizedProps, i.memoizedState = o.memoizedState, i.updateQueue = o.updateQueue, i.type = o.type, e = o.dependencies, i.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }), n = n.sibling;
            return B(K, K.current & 1 | 2), t.child;
          }
          e = e.sibling;
        }
        i.tail !== null && Z() > dn && (t.flags |= 128, r = !0, _n(i, !1), t.lanes = 4194304);
      }
      else {
        if (!r) if (e = tl(o), e !== null) {
          if (t.flags |= 128, r = !0, n = e.updateQueue, n !== null && (t.updateQueue = n, t.flags |= 4), _n(i, !0), i.tail === null && i.tailMode === "hidden" && !o.alternate && !H) return se(t), null;
        } else 2 * Z() - i.renderingStartTime > dn && n !== 1073741824 && (t.flags |= 128, r = !0, _n(i, !1), t.lanes = 4194304);
        i.isBackwards ? (o.sibling = t.child, t.child = o) : (n = i.last, n !== null ? n.sibling = o : t.child = o, i.last = o);
      }
      return i.tail !== null ? (t = i.tail, i.rendering = t, i.tail = t.sibling, i.renderingStartTime = Z(), t.sibling = null, n = K.current, B(K, r ? n & 1 | 2 : n & 1), t) : (se(t), null);
    case 22:
    case 23:
      return Uo(), r = t.memoizedState !== null, e !== null && e.memoizedState !== null !== r && (t.flags |= 8192), r && t.mode & 1 ? xe & 1073741824 && (se(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : se(t), null;
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(k(156, t.tag));
}
function $f(e, t) {
  switch (xo(t), t.tag) {
    case 1:
      return ve(t.type) && Yr(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 3:
      return an(), V(ge), V(ae), zo(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
    case 5:
      return Eo(t), null;
    case 13:
      if (V(K), e = t.memoizedState, e !== null && e.dehydrated !== null) {
        if (t.alternate === null) throw Error(k(340));
        sn();
      }
      return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 19:
      return V(K), null;
    case 4:
      return an(), null;
    case 10:
      return No(t.type._context), null;
    case 22:
    case 23:
      return Uo(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var _r = !1, ue = !1, Mf = typeof WeakSet == "function" ? WeakSet : Set, z = null;
function Zt(e, t) {
  var n = e.ref;
  if (n !== null) if (typeof n == "function") try {
    n(null);
  } catch (r) {
    X(e, t, r);
  }
  else n.current = null;
}
function Bi(e, t, n) {
  try {
    n();
  } catch (r) {
    X(e, t, r);
  }
}
var Xs = !1;
function Of(e, t) {
  if (_i = Hr, e = sa(), vo(e)) {
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
        var o = 0, s = -1, a = -1, d = 0, m = 0, g = e, h = null;
        t: for (; ; ) {
          for (var y; g !== n || l !== 0 && g.nodeType !== 3 || (s = o + l), g !== i || r !== 0 && g.nodeType !== 3 || (a = o + r), g.nodeType === 3 && (o += g.nodeValue.length), (y = g.firstChild) !== null; )
            h = g, g = y;
          for (; ; ) {
            if (g === e) break t;
            if (h === n && ++d === l && (s = o), h === i && ++m === r && (a = o), (y = g.nextSibling) !== null) break;
            g = h, h = g.parentNode;
          }
          g = y;
        }
        n = s === -1 || a === -1 ? null : { start: s, end: a };
      } else n = null;
    }
    n = n || { start: 0, end: 0 };
  } else n = null;
  for (ji = { focusedElem: e, selectionRange: n }, Hr = !1, z = t; z !== null; ) if (t = z, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null) e.return = t, z = e;
  else for (; z !== null; ) {
    t = z;
    try {
      var w = t.alternate;
      if (t.flags & 1024) switch (t.tag) {
        case 0:
        case 11:
        case 15:
          break;
        case 1:
          if (w !== null) {
            var S = w.memoizedProps, T = w.memoizedState, f = t.stateNode, c = f.getSnapshotBeforeUpdate(t.elementType === t.type ? S : Re(t.type, S), T);
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
          throw Error(k(163));
      }
    } catch (v) {
      X(t, t.return, v);
    }
    if (e = t.sibling, e !== null) {
      e.return = t.return, z = e;
      break;
    }
    z = t.return;
  }
  return w = Xs, Xs = !1, w;
}
function Dn(e, t, n) {
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
function Wi(e) {
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
function rc(e) {
  var t = e.alternate;
  t !== null && (e.alternate = null, rc(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[Ae], delete t[Xn], delete t[zi], delete t[vf], delete t[yf])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
}
function lc(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function Zs(e) {
  e: for (; ; ) {
    for (; e.sibling === null; ) {
      if (e.return === null || lc(e.return)) return null;
      e = e.return;
    }
    for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
      if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
      e.child.return = e, e = e.child;
    }
    if (!(e.flags & 2)) return e.stateNode;
  }
}
function Vi(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6) e = e.stateNode, t ? n.nodeType === 8 ? n.parentNode.insertBefore(e, t) : n.insertBefore(e, t) : (n.nodeType === 8 ? (t = n.parentNode, t.insertBefore(e, n)) : (t = n, t.appendChild(e)), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = Gr));
  else if (r !== 4 && (e = e.child, e !== null)) for (Vi(e, t, n), e = e.sibling; e !== null; ) Vi(e, t, n), e = e.sibling;
}
function Hi(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
  else if (r !== 4 && (e = e.child, e !== null)) for (Hi(e, t, n), e = e.sibling; e !== null; ) Hi(e, t, n), e = e.sibling;
}
var re = null, $e = !1;
function tt(e, t, n) {
  for (n = n.child; n !== null; ) ic(e, t, n), n = n.sibling;
}
function ic(e, t, n) {
  if (Be && typeof Be.onCommitFiberUnmount == "function") try {
    Be.onCommitFiberUnmount(dl, n);
  } catch {
  }
  switch (n.tag) {
    case 5:
      ue || Zt(n, t);
    case 6:
      var r = re, l = $e;
      re = null, tt(e, t, n), re = r, $e = l, re !== null && ($e ? (e = re, n = n.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n)) : re.removeChild(n.stateNode));
      break;
    case 18:
      re !== null && ($e ? (e = re, n = n.stateNode, e.nodeType === 8 ? Ql(e.parentNode, n) : e.nodeType === 1 && Ql(e, n), Hn(e)) : Ql(re, n.stateNode));
      break;
    case 4:
      r = re, l = $e, re = n.stateNode.containerInfo, $e = !0, tt(e, t, n), re = r, $e = l;
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (!ue && (r = n.updateQueue, r !== null && (r = r.lastEffect, r !== null))) {
        l = r = r.next;
        do {
          var i = l, o = i.destroy;
          i = i.tag, o !== void 0 && (i & 2 || i & 4) && Bi(n, t, o), l = l.next;
        } while (l !== r);
      }
      tt(e, t, n);
      break;
    case 1:
      if (!ue && (Zt(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function")) try {
        r.props = n.memoizedProps, r.state = n.memoizedState, r.componentWillUnmount();
      } catch (s) {
        X(n, t, s);
      }
      tt(e, t, n);
      break;
    case 21:
      tt(e, t, n);
      break;
    case 22:
      n.mode & 1 ? (ue = (r = ue) || n.memoizedState !== null, tt(e, t, n), ue = r) : tt(e, t, n);
      break;
    default:
      tt(e, t, n);
  }
}
function Js(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    n === null && (n = e.stateNode = new Mf()), t.forEach(function(r) {
      var l = Hf.bind(null, e, r);
      n.has(r) || (n.add(r), r.then(l, l));
    });
  }
}
function Le(e, t) {
  var n = t.deletions;
  if (n !== null) for (var r = 0; r < n.length; r++) {
    var l = n[r];
    try {
      var i = e, o = t, s = o;
      e: for (; s !== null; ) {
        switch (s.tag) {
          case 5:
            re = s.stateNode, $e = !1;
            break e;
          case 3:
            re = s.stateNode.containerInfo, $e = !0;
            break e;
          case 4:
            re = s.stateNode.containerInfo, $e = !0;
            break e;
        }
        s = s.return;
      }
      if (re === null) throw Error(k(160));
      ic(i, o, l), re = null, $e = !1;
      var a = l.alternate;
      a !== null && (a.return = null), l.return = null;
    } catch (d) {
      X(l, t, d);
    }
  }
  if (t.subtreeFlags & 12854) for (t = t.child; t !== null; ) oc(t, e), t = t.sibling;
}
function oc(e, t) {
  var n = e.alternate, r = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if (Le(t, e), Ie(e), r & 4) {
        try {
          Dn(3, e, e.return), xl(3, e);
        } catch (S) {
          X(e, e.return, S);
        }
        try {
          Dn(5, e, e.return);
        } catch (S) {
          X(e, e.return, S);
        }
      }
      break;
    case 1:
      Le(t, e), Ie(e), r & 512 && n !== null && Zt(n, n.return);
      break;
    case 5:
      if (Le(t, e), Ie(e), r & 512 && n !== null && Zt(n, n.return), e.flags & 32) {
        var l = e.stateNode;
        try {
          An(l, "");
        } catch (S) {
          X(e, e.return, S);
        }
      }
      if (r & 4 && (l = e.stateNode, l != null)) {
        var i = e.memoizedProps, o = n !== null ? n.memoizedProps : i, s = e.type, a = e.updateQueue;
        if (e.updateQueue = null, a !== null) try {
          s === "input" && i.type === "radio" && i.name != null && zu(l, i), hi(s, o);
          var d = hi(s, i);
          for (o = 0; o < a.length; o += 2) {
            var m = a[o], g = a[o + 1];
            m === "style" ? $u(l, g) : m === "dangerouslySetInnerHTML" ? Lu(l, g) : m === "children" ? An(l, g) : ro(l, m, g, d);
          }
          switch (s) {
            case "input":
              ai(l, i);
              break;
            case "textarea":
              Pu(l, i);
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
          l[Xn] = i;
        } catch (S) {
          X(e, e.return, S);
        }
      }
      break;
    case 6:
      if (Le(t, e), Ie(e), r & 4) {
        if (e.stateNode === null) throw Error(k(162));
        l = e.stateNode, i = e.memoizedProps;
        try {
          l.nodeValue = i;
        } catch (S) {
          X(e, e.return, S);
        }
      }
      break;
    case 3:
      if (Le(t, e), Ie(e), r & 4 && n !== null && n.memoizedState.isDehydrated) try {
        Hn(t.containerInfo);
      } catch (S) {
        X(e, e.return, S);
      }
      break;
    case 4:
      Le(t, e), Ie(e);
      break;
    case 13:
      Le(t, e), Ie(e), l = e.child, l.flags & 8192 && (i = l.memoizedState !== null, l.stateNode.isHidden = i, !i || l.alternate !== null && l.alternate.memoizedState !== null || (Fo = Z())), r & 4 && Js(e);
      break;
    case 22:
      if (m = n !== null && n.memoizedState !== null, e.mode & 1 ? (ue = (d = ue) || m, Le(t, e), ue = d) : Le(t, e), Ie(e), r & 8192) {
        if (d = e.memoizedState !== null, (e.stateNode.isHidden = d) && !m && e.mode & 1) for (z = e, m = e.child; m !== null; ) {
          for (g = z = m; z !== null; ) {
            switch (h = z, y = h.child, h.tag) {
              case 0:
              case 11:
              case 14:
              case 15:
                Dn(4, h, h.return);
                break;
              case 1:
                Zt(h, h.return);
                var w = h.stateNode;
                if (typeof w.componentWillUnmount == "function") {
                  r = h, n = h.return;
                  try {
                    t = r, w.props = t.memoizedProps, w.state = t.memoizedState, w.componentWillUnmount();
                  } catch (S) {
                    X(r, n, S);
                  }
                }
                break;
              case 5:
                Zt(h, h.return);
                break;
              case 22:
                if (h.memoizedState !== null) {
                  bs(g);
                  continue;
                }
            }
            y !== null ? (y.return = h, z = y) : bs(g);
          }
          m = m.sibling;
        }
        e: for (m = null, g = e; ; ) {
          if (g.tag === 5) {
            if (m === null) {
              m = g;
              try {
                l = g.stateNode, d ? (i = l.style, typeof i.setProperty == "function" ? i.setProperty("display", "none", "important") : i.display = "none") : (s = g.stateNode, a = g.memoizedProps.style, o = a != null && a.hasOwnProperty("display") ? a.display : null, s.style.display = Ru("display", o));
              } catch (S) {
                X(e, e.return, S);
              }
            }
          } else if (g.tag === 6) {
            if (m === null) try {
              g.stateNode.nodeValue = d ? "" : g.memoizedProps;
            } catch (S) {
              X(e, e.return, S);
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
      Le(t, e), Ie(e), r & 4 && Js(e);
      break;
    case 21:
      break;
    default:
      Le(
        t,
        e
      ), Ie(e);
  }
}
function Ie(e) {
  var t = e.flags;
  if (t & 2) {
    try {
      e: {
        for (var n = e.return; n !== null; ) {
          if (lc(n)) {
            var r = n;
            break e;
          }
          n = n.return;
        }
        throw Error(k(160));
      }
      switch (r.tag) {
        case 5:
          var l = r.stateNode;
          r.flags & 32 && (An(l, ""), r.flags &= -33);
          var i = Zs(e);
          Hi(e, i, l);
          break;
        case 3:
        case 4:
          var o = r.stateNode.containerInfo, s = Zs(e);
          Vi(e, s, o);
          break;
        default:
          throw Error(k(161));
      }
    } catch (a) {
      X(e, e.return, a);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function Df(e, t, n) {
  z = e, sc(e);
}
function sc(e, t, n) {
  for (var r = (e.mode & 1) !== 0; z !== null; ) {
    var l = z, i = l.child;
    if (l.tag === 22 && r) {
      var o = l.memoizedState !== null || _r;
      if (!o) {
        var s = l.alternate, a = s !== null && s.memoizedState !== null || ue;
        s = _r;
        var d = ue;
        if (_r = o, (ue = a) && !d) for (z = l; z !== null; ) o = z, a = o.child, o.tag === 22 && o.memoizedState !== null ? eu(l) : a !== null ? (a.return = o, z = a) : eu(l);
        for (; i !== null; ) z = i, sc(i), i = i.sibling;
        z = l, _r = s, ue = d;
      }
      qs(e);
    } else l.subtreeFlags & 8772 && i !== null ? (i.return = l, z = i) : qs(e);
  }
}
function qs(e) {
  for (; z !== null; ) {
    var t = z;
    if (t.flags & 8772) {
      var n = t.alternate;
      try {
        if (t.flags & 8772) switch (t.tag) {
          case 0:
          case 11:
          case 15:
            ue || xl(5, t);
            break;
          case 1:
            var r = t.stateNode;
            if (t.flags & 4 && !ue) if (n === null) r.componentDidMount();
            else {
              var l = t.elementType === t.type ? n.memoizedProps : Re(t.type, n.memoizedProps);
              r.componentDidUpdate(l, n.memoizedState, r.__reactInternalSnapshotBeforeUpdate);
            }
            var i = t.updateQueue;
            i !== null && Ds(t, i, r);
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
              Ds(t, o, n);
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
                  var g = m.dehydrated;
                  g !== null && Hn(g);
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
            throw Error(k(163));
        }
        ue || t.flags & 512 && Wi(t);
      } catch (h) {
        X(t, t.return, h);
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
function bs(e) {
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
function eu(e) {
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
          } catch (a) {
            X(t, n, a);
          }
          break;
        case 1:
          var r = t.stateNode;
          if (typeof r.componentDidMount == "function") {
            var l = t.return;
            try {
              r.componentDidMount();
            } catch (a) {
              X(t, l, a);
            }
          }
          var i = t.return;
          try {
            Wi(t);
          } catch (a) {
            X(t, i, a);
          }
          break;
        case 5:
          var o = t.return;
          try {
            Wi(t);
          } catch (a) {
            X(t, o, a);
          }
      }
    } catch (a) {
      X(t, t.return, a);
    }
    if (t === e) {
      z = null;
      break;
    }
    var s = t.sibling;
    if (s !== null) {
      s.return = t.return, z = s;
      break;
    }
    z = t.return;
  }
}
var Ff = Math.ceil, ll = be.ReactCurrentDispatcher, Oo = be.ReactCurrentOwner, ze = be.ReactCurrentBatchConfig, D = 0, ne = null, J = null, le = 0, xe = 0, Jt = xt(0), b = 0, tr = null, Ot = 0, wl = 0, Do = 0, Fn = null, he = null, Fo = 0, dn = 1 / 0, Ve = null, il = !1, Qi = null, pt = null, jr = !1, st = null, ol = 0, In = 0, Ki = null, Dr = -1, Fr = 0;
function de() {
  return D & 6 ? Z() : Dr !== -1 ? Dr : Dr = Z();
}
function ht(e) {
  return e.mode & 1 ? D & 2 && le !== 0 ? le & -le : wf.transition !== null ? (Fr === 0 && (Fr = Qu()), Fr) : (e = U, e !== 0 || (e = window.event, e = e === void 0 ? 16 : qu(e.type)), e) : 1;
}
function De(e, t, n, r) {
  if (50 < In) throw In = 0, Ki = null, Error(k(185));
  rr(e, n, r), (!(D & 2) || e !== ne) && (e === ne && (!(D & 2) && (wl |= n), b === 4 && it(e, le)), ye(e, r), n === 1 && D === 0 && !(t.mode & 1) && (dn = Z() + 500, gl && wt()));
}
function ye(e, t) {
  var n = e.callbackNode;
  xd(e, t);
  var r = Vr(e, e === ne ? le : 0);
  if (r === 0) n !== null && as(n), e.callbackNode = null, e.callbackPriority = 0;
  else if (t = r & -r, e.callbackPriority !== t) {
    if (n != null && as(n), t === 1) e.tag === 0 ? xf(tu.bind(null, e)) : va(tu.bind(null, e)), mf(function() {
      !(D & 6) && wt();
    }), n = null;
    else {
      switch (Ku(r)) {
        case 1:
          n = uo;
          break;
        case 4:
          n = Vu;
          break;
        case 16:
          n = Wr;
          break;
        case 536870912:
          n = Hu;
          break;
        default:
          n = Wr;
      }
      n = mc(n, uc.bind(null, e));
    }
    e.callbackPriority = t, e.callbackNode = n;
  }
}
function uc(e, t) {
  if (Dr = -1, Fr = 0, D & 6) throw Error(k(327));
  var n = e.callbackNode;
  if (rn() && e.callbackNode !== n) return null;
  var r = Vr(e, e === ne ? le : 0);
  if (r === 0) return null;
  if (r & 30 || r & e.expiredLanes || t) t = sl(e, r);
  else {
    t = r;
    var l = D;
    D |= 2;
    var i = cc();
    (ne !== e || le !== t) && (Ve = null, dn = Z() + 500, Tt(e, t));
    do
      try {
        Af();
        break;
      } catch (s) {
        ac(e, s);
      }
    while (!0);
    So(), ll.current = i, D = l, J !== null ? t = 0 : (ne = null, le = 0, t = b);
  }
  if (t !== 0) {
    if (t === 2 && (l = xi(e), l !== 0 && (r = l, t = Gi(e, l))), t === 1) throw n = tr, Tt(e, 0), it(e, r), ye(e, Z()), n;
    if (t === 6) it(e, r);
    else {
      if (l = e.current.alternate, !(r & 30) && !If(l) && (t = sl(e, r), t === 2 && (i = xi(e), i !== 0 && (r = i, t = Gi(e, i))), t === 1)) throw n = tr, Tt(e, 0), it(e, r), ye(e, Z()), n;
      switch (e.finishedWork = l, e.finishedLanes = r, t) {
        case 0:
        case 1:
          throw Error(k(345));
        case 2:
          jt(e, he, Ve);
          break;
        case 3:
          if (it(e, r), (r & 130023424) === r && (t = Fo + 500 - Z(), 10 < t)) {
            if (Vr(e, 0) !== 0) break;
            if (l = e.suspendedLanes, (l & r) !== r) {
              de(), e.pingedLanes |= e.suspendedLanes & l;
              break;
            }
            e.timeoutHandle = Ei(jt.bind(null, e, he, Ve), t);
            break;
          }
          jt(e, he, Ve);
          break;
        case 4:
          if (it(e, r), (r & 4194240) === r) break;
          for (t = e.eventTimes, l = -1; 0 < r; ) {
            var o = 31 - Oe(r);
            i = 1 << o, o = t[o], o > l && (l = o), r &= ~i;
          }
          if (r = l, r = Z() - r, r = (120 > r ? 120 : 480 > r ? 480 : 1080 > r ? 1080 : 1920 > r ? 1920 : 3e3 > r ? 3e3 : 4320 > r ? 4320 : 1960 * Ff(r / 1960)) - r, 10 < r) {
            e.timeoutHandle = Ei(jt.bind(null, e, he, Ve), r);
            break;
          }
          jt(e, he, Ve);
          break;
        case 5:
          jt(e, he, Ve);
          break;
        default:
          throw Error(k(329));
      }
    }
  }
  return ye(e, Z()), e.callbackNode === n ? uc.bind(null, e) : null;
}
function Gi(e, t) {
  var n = Fn;
  return e.current.memoizedState.isDehydrated && (Tt(e, t).flags |= 256), e = sl(e, t), e !== 2 && (t = he, he = n, t !== null && Yi(t)), e;
}
function Yi(e) {
  he === null ? he = e : he.push.apply(he, e);
}
function If(e) {
  for (var t = e; ; ) {
    if (t.flags & 16384) {
      var n = t.updateQueue;
      if (n !== null && (n = n.stores, n !== null)) for (var r = 0; r < n.length; r++) {
        var l = n[r], i = l.getSnapshot;
        l = l.value;
        try {
          if (!Fe(i(), l)) return !1;
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
  for (t &= ~Do, t &= ~wl, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t; ) {
    var n = 31 - Oe(t), r = 1 << n;
    e[n] = -1, t &= ~r;
  }
}
function tu(e) {
  if (D & 6) throw Error(k(327));
  rn();
  var t = Vr(e, 0);
  if (!(t & 1)) return ye(e, Z()), null;
  var n = sl(e, t);
  if (e.tag !== 0 && n === 2) {
    var r = xi(e);
    r !== 0 && (t = r, n = Gi(e, r));
  }
  if (n === 1) throw n = tr, Tt(e, 0), it(e, t), ye(e, Z()), n;
  if (n === 6) throw Error(k(345));
  return e.finishedWork = e.current.alternate, e.finishedLanes = t, jt(e, he, Ve), ye(e, Z()), null;
}
function Io(e, t) {
  var n = D;
  D |= 1;
  try {
    return e(t);
  } finally {
    D = n, D === 0 && (dn = Z() + 500, gl && wt());
  }
}
function Dt(e) {
  st !== null && st.tag === 0 && !(D & 6) && rn();
  var t = D;
  D |= 1;
  var n = ze.transition, r = U;
  try {
    if (ze.transition = null, U = 1, e) return e();
  } finally {
    U = r, ze.transition = n, D = t, !(D & 6) && wt();
  }
}
function Uo() {
  xe = Jt.current, V(Jt);
}
function Tt(e, t) {
  e.finishedWork = null, e.finishedLanes = 0;
  var n = e.timeoutHandle;
  if (n !== -1 && (e.timeoutHandle = -1, hf(n)), J !== null) for (n = J.return; n !== null; ) {
    var r = n;
    switch (xo(r), r.tag) {
      case 1:
        r = r.type.childContextTypes, r != null && Yr();
        break;
      case 3:
        an(), V(ge), V(ae), zo();
        break;
      case 5:
        Eo(r);
        break;
      case 4:
        an();
        break;
      case 13:
        V(K);
        break;
      case 19:
        V(K);
        break;
      case 10:
        No(r.type._context);
        break;
      case 22:
      case 23:
        Uo();
    }
    n = n.return;
  }
  if (ne = e, J = e = mt(e.current, null), le = xe = t, b = 0, tr = null, Do = wl = Ot = 0, he = Fn = null, Et !== null) {
    for (t = 0; t < Et.length; t++) if (n = Et[t], r = n.interleaved, r !== null) {
      n.interleaved = null;
      var l = r.next, i = n.pending;
      if (i !== null) {
        var o = i.next;
        i.next = l, r.next = o;
      }
      n.pending = r;
    }
    Et = null;
  }
  return e;
}
function ac(e, t) {
  do {
    var n = J;
    try {
      if (So(), $r.current = rl, nl) {
        for (var r = G.memoizedState; r !== null; ) {
          var l = r.queue;
          l !== null && (l.pending = null), r = r.next;
        }
        nl = !1;
      }
      if (Mt = 0, te = q = G = null, On = !1, qn = 0, Oo.current = null, n === null || n.return === null) {
        b = 1, tr = t, J = null;
        break;
      }
      e: {
        var i = e, o = n.return, s = n, a = t;
        if (t = le, s.flags |= 32768, a !== null && typeof a == "object" && typeof a.then == "function") {
          var d = a, m = s, g = m.tag;
          if (!(m.mode & 1) && (g === 0 || g === 11 || g === 15)) {
            var h = m.alternate;
            h ? (m.updateQueue = h.updateQueue, m.memoizedState = h.memoizedState, m.lanes = h.lanes) : (m.updateQueue = null, m.memoizedState = null);
          }
          var y = Ws(o);
          if (y !== null) {
            y.flags &= -257, Vs(y, o, s, i, t), y.mode & 1 && Bs(i, d, t), t = y, a = d;
            var w = t.updateQueue;
            if (w === null) {
              var S = /* @__PURE__ */ new Set();
              S.add(a), t.updateQueue = S;
            } else w.add(a);
            break e;
          } else {
            if (!(t & 1)) {
              Bs(i, d, t), Ao();
              break e;
            }
            a = Error(k(426));
          }
        } else if (H && s.mode & 1) {
          var T = Ws(o);
          if (T !== null) {
            !(T.flags & 65536) && (T.flags |= 256), Vs(T, o, s, i, t), wo(cn(a, s));
            break e;
          }
        }
        i = a = cn(a, s), b !== 4 && (b = 2), Fn === null ? Fn = [i] : Fn.push(i), i = o;
        do {
          switch (i.tag) {
            case 3:
              i.flags |= 65536, t &= -t, i.lanes |= t;
              var f = Ka(i, a, t);
              Os(i, f);
              break e;
            case 1:
              s = a;
              var c = i.type, p = i.stateNode;
              if (!(i.flags & 128) && (typeof c.getDerivedStateFromError == "function" || p !== null && typeof p.componentDidCatch == "function" && (pt === null || !pt.has(p)))) {
                i.flags |= 65536, t &= -t, i.lanes |= t;
                var v = Ga(i, s, t);
                Os(i, v);
                break e;
              }
          }
          i = i.return;
        } while (i !== null);
      }
      fc(n);
    } catch (x) {
      t = x, J === n && n !== null && (J = n = n.return);
      continue;
    }
    break;
  } while (!0);
}
function cc() {
  var e = ll.current;
  return ll.current = rl, e === null ? rl : e;
}
function Ao() {
  (b === 0 || b === 3 || b === 2) && (b = 4), ne === null || !(Ot & 268435455) && !(wl & 268435455) || it(ne, le);
}
function sl(e, t) {
  var n = D;
  D |= 2;
  var r = cc();
  (ne !== e || le !== t) && (Ve = null, Tt(e, t));
  do
    try {
      Uf();
      break;
    } catch (l) {
      ac(e, l);
    }
  while (!0);
  if (So(), D = n, ll.current = r, J !== null) throw Error(k(261));
  return ne = null, le = 0, b;
}
function Uf() {
  for (; J !== null; ) dc(J);
}
function Af() {
  for (; J !== null && !cd(); ) dc(J);
}
function dc(e) {
  var t = hc(e.alternate, e, xe);
  e.memoizedProps = e.pendingProps, t === null ? fc(e) : J = t, Oo.current = null;
}
function fc(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (e = t.return, t.flags & 32768) {
      if (n = $f(n, t), n !== null) {
        n.flags &= 32767, J = n;
        return;
      }
      if (e !== null) e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
      else {
        b = 6, J = null;
        return;
      }
    } else if (n = Rf(n, t, xe), n !== null) {
      J = n;
      return;
    }
    if (t = t.sibling, t !== null) {
      J = t;
      return;
    }
    J = t = e;
  } while (t !== null);
  b === 0 && (b = 5);
}
function jt(e, t, n) {
  var r = U, l = ze.transition;
  try {
    ze.transition = null, U = 1, Bf(e, t, n, r);
  } finally {
    ze.transition = l, U = r;
  }
  return null;
}
function Bf(e, t, n, r) {
  do
    rn();
  while (st !== null);
  if (D & 6) throw Error(k(327));
  n = e.finishedWork;
  var l = e.finishedLanes;
  if (n === null) return null;
  if (e.finishedWork = null, e.finishedLanes = 0, n === e.current) throw Error(k(177));
  e.callbackNode = null, e.callbackPriority = 0;
  var i = n.lanes | n.childLanes;
  if (wd(e, i), e === ne && (J = ne = null, le = 0), !(n.subtreeFlags & 2064) && !(n.flags & 2064) || jr || (jr = !0, mc(Wr, function() {
    return rn(), null;
  })), i = (n.flags & 15990) !== 0, n.subtreeFlags & 15990 || i) {
    i = ze.transition, ze.transition = null;
    var o = U;
    U = 1;
    var s = D;
    D |= 4, Oo.current = null, Of(e, n), oc(n, e), sf(ji), Hr = !!_i, ji = _i = null, e.current = n, Df(n), dd(), D = s, U = o, ze.transition = i;
  } else e.current = n;
  if (jr && (jr = !1, st = e, ol = l), i = e.pendingLanes, i === 0 && (pt = null), hd(n.stateNode), ye(e, Z()), t !== null) for (r = e.onRecoverableError, n = 0; n < t.length; n++) l = t[n], r(l.value, { componentStack: l.stack, digest: l.digest });
  if (il) throw il = !1, e = Qi, Qi = null, e;
  return ol & 1 && e.tag !== 0 && rn(), i = e.pendingLanes, i & 1 ? e === Ki ? In++ : (In = 0, Ki = e) : In = 0, wt(), null;
}
function rn() {
  if (st !== null) {
    var e = Ku(ol), t = ze.transition, n = U;
    try {
      if (ze.transition = null, U = 16 > e ? 16 : e, st === null) var r = !1;
      else {
        if (e = st, st = null, ol = 0, D & 6) throw Error(k(331));
        var l = D;
        for (D |= 4, z = e.current; z !== null; ) {
          var i = z, o = i.child;
          if (z.flags & 16) {
            var s = i.deletions;
            if (s !== null) {
              for (var a = 0; a < s.length; a++) {
                var d = s[a];
                for (z = d; z !== null; ) {
                  var m = z;
                  switch (m.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Dn(8, m, i);
                  }
                  var g = m.child;
                  if (g !== null) g.return = m, z = g;
                  else for (; z !== null; ) {
                    m = z;
                    var h = m.sibling, y = m.return;
                    if (rc(m), m === d) {
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
              var w = i.alternate;
              if (w !== null) {
                var S = w.child;
                if (S !== null) {
                  w.child = null;
                  do {
                    var T = S.sibling;
                    S.sibling = null, S = T;
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
                Dn(9, i, i.return);
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
            if (s = z, s.flags & 2048) try {
              switch (s.tag) {
                case 0:
                case 11:
                case 15:
                  xl(9, s);
              }
            } catch (x) {
              X(s, s.return, x);
            }
            if (s === o) {
              z = null;
              break e;
            }
            var v = s.sibling;
            if (v !== null) {
              v.return = s.return, z = v;
              break e;
            }
            z = s.return;
          }
        }
        if (D = l, wt(), Be && typeof Be.onPostCommitFiberRoot == "function") try {
          Be.onPostCommitFiberRoot(dl, e);
        } catch {
        }
        r = !0;
      }
      return r;
    } finally {
      U = n, ze.transition = t;
    }
  }
  return !1;
}
function nu(e, t, n) {
  t = cn(n, t), t = Ka(e, t, 1), e = ft(e, t, 1), t = de(), e !== null && (rr(e, 1, t), ye(e, t));
}
function X(e, t, n) {
  if (e.tag === 3) nu(e, e, n);
  else for (; t !== null; ) {
    if (t.tag === 3) {
      nu(t, e, n);
      break;
    } else if (t.tag === 1) {
      var r = t.stateNode;
      if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (pt === null || !pt.has(r))) {
        e = cn(n, e), e = Ga(t, e, 1), t = ft(t, e, 1), e = de(), t !== null && (rr(t, 1, e), ye(t, e));
        break;
      }
    }
    t = t.return;
  }
}
function Wf(e, t, n) {
  var r = e.pingCache;
  r !== null && r.delete(t), t = de(), e.pingedLanes |= e.suspendedLanes & n, ne === e && (le & n) === n && (b === 4 || b === 3 && (le & 130023424) === le && 500 > Z() - Fo ? Tt(e, 0) : Do |= n), ye(e, t);
}
function pc(e, t) {
  t === 0 && (e.mode & 1 ? (t = mr, mr <<= 1, !(mr & 130023424) && (mr = 4194304)) : t = 1);
  var n = de();
  e = Je(e, t), e !== null && (rr(e, t, n), ye(e, n));
}
function Vf(e) {
  var t = e.memoizedState, n = 0;
  t !== null && (n = t.retryLane), pc(e, n);
}
function Hf(e, t) {
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
      throw Error(k(314));
  }
  r !== null && r.delete(t), pc(e, n);
}
var hc;
hc = function(e, t, n) {
  if (e !== null) if (e.memoizedProps !== t.pendingProps || ge.current) me = !0;
  else {
    if (!(e.lanes & n) && !(t.flags & 128)) return me = !1, Lf(e, t, n);
    me = !!(e.flags & 131072);
  }
  else me = !1, H && t.flags & 1048576 && ya(t, Jr, t.index);
  switch (t.lanes = 0, t.tag) {
    case 2:
      var r = t.type;
      Or(e, t), e = t.pendingProps;
      var l = on(t, ae.current);
      nn(t, n), l = To(null, t, r, e, l, n);
      var i = Lo();
      return t.flags |= 1, typeof l == "object" && l !== null && typeof l.render == "function" && l.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, ve(r) ? (i = !0, Xr(t)) : i = !1, t.memoizedState = l.state !== null && l.state !== void 0 ? l.state : null, jo(t), l.updater = yl, t.stateNode = l, l._reactInternals = t, Mi(t, r, e, n), t = Fi(null, t, r, !0, i, n)) : (t.tag = 0, H && i && yo(t), ce(null, t, l, n), t = t.child), t;
    case 16:
      r = t.elementType;
      e: {
        switch (Or(e, t), e = t.pendingProps, l = r._init, r = l(r._payload), t.type = r, l = t.tag = Kf(r), e = Re(r, e), l) {
          case 0:
            t = Di(null, t, r, e, n);
            break e;
          case 1:
            t = Ks(null, t, r, e, n);
            break e;
          case 11:
            t = Hs(null, t, r, e, n);
            break e;
          case 14:
            t = Qs(null, t, r, Re(r.type, e), n);
            break e;
        }
        throw Error(k(
          306,
          r,
          ""
        ));
      }
      return t;
    case 0:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : Re(r, l), Di(e, t, r, l, n);
    case 1:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : Re(r, l), Ks(e, t, r, l, n);
    case 3:
      e: {
        if (Ja(t), e === null) throw Error(k(387));
        r = t.pendingProps, i = t.memoizedState, l = i.element, _a(e, t), el(t, r, null, n);
        var o = t.memoizedState;
        if (r = o.element, i.isDehydrated) if (i = { element: r, isDehydrated: !1, cache: o.cache, pendingSuspenseBoundaries: o.pendingSuspenseBoundaries, transitions: o.transitions }, t.updateQueue.baseState = i, t.memoizedState = i, t.flags & 256) {
          l = cn(Error(k(423)), t), t = Gs(e, t, r, n, l);
          break e;
        } else if (r !== l) {
          l = cn(Error(k(424)), t), t = Gs(e, t, r, n, l);
          break e;
        } else for (we = dt(t.stateNode.containerInfo.firstChild), ke = t, H = !0, Me = null, n = Sa(t, null, r, n), t.child = n; n; ) n.flags = n.flags & -3 | 4096, n = n.sibling;
        else {
          if (sn(), r === l) {
            t = qe(e, t, n);
            break e;
          }
          ce(e, t, r, n);
        }
        t = t.child;
      }
      return t;
    case 5:
      return ja(t), e === null && Li(t), r = t.type, l = t.pendingProps, i = e !== null ? e.memoizedProps : null, o = l.children, Ci(r, l) ? o = null : i !== null && Ci(r, i) && (t.flags |= 32), Za(e, t), ce(e, t, o, n), t.child;
    case 6:
      return e === null && Li(t), null;
    case 13:
      return qa(e, t, n);
    case 4:
      return Co(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = un(t, null, r, n) : ce(e, t, r, n), t.child;
    case 11:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : Re(r, l), Hs(e, t, r, l, n);
    case 7:
      return ce(e, t, t.pendingProps, n), t.child;
    case 8:
      return ce(e, t, t.pendingProps.children, n), t.child;
    case 12:
      return ce(e, t, t.pendingProps.children, n), t.child;
    case 10:
      e: {
        if (r = t.type._context, l = t.pendingProps, i = t.memoizedProps, o = l.value, B(qr, r._currentValue), r._currentValue = o, i !== null) if (Fe(i.value, o)) {
          if (i.children === l.children && !ge.current) {
            t = qe(e, t, n);
            break e;
          }
        } else for (i = t.child, i !== null && (i.return = t); i !== null; ) {
          var s = i.dependencies;
          if (s !== null) {
            o = i.child;
            for (var a = s.firstContext; a !== null; ) {
              if (a.context === r) {
                if (i.tag === 1) {
                  a = Ge(-1, n & -n), a.tag = 2;
                  var d = i.updateQueue;
                  if (d !== null) {
                    d = d.shared;
                    var m = d.pending;
                    m === null ? a.next = a : (a.next = m.next, m.next = a), d.pending = a;
                  }
                }
                i.lanes |= n, a = i.alternate, a !== null && (a.lanes |= n), Ri(
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
            if (o = i.return, o === null) throw Error(k(341));
            o.lanes |= n, s = o.alternate, s !== null && (s.lanes |= n), Ri(o, n, t), o = i.sibling;
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
      return l = t.type, r = t.pendingProps.children, nn(t, n), l = Pe(l), r = r(l), t.flags |= 1, ce(e, t, r, n), t.child;
    case 14:
      return r = t.type, l = Re(r, t.pendingProps), l = Re(r.type, l), Qs(e, t, r, l, n);
    case 15:
      return Ya(e, t, t.type, t.pendingProps, n);
    case 17:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : Re(r, l), Or(e, t), t.tag = 1, ve(r) ? (e = !0, Xr(t)) : e = !1, nn(t, n), Qa(t, r, l), Mi(t, r, l, n), Fi(null, t, r, !0, e, n);
    case 19:
      return ba(e, t, n);
    case 22:
      return Xa(e, t, n);
  }
  throw Error(k(156, t.tag));
};
function mc(e, t) {
  return Wu(e, t);
}
function Qf(e, t, n, r) {
  this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
}
function Ee(e, t, n, r) {
  return new Qf(e, t, n, r);
}
function Bo(e) {
  return e = e.prototype, !(!e || !e.isReactComponent);
}
function Kf(e) {
  if (typeof e == "function") return Bo(e) ? 1 : 0;
  if (e != null) {
    if (e = e.$$typeof, e === io) return 11;
    if (e === oo) return 14;
  }
  return 2;
}
function mt(e, t) {
  var n = e.alternate;
  return n === null ? (n = Ee(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 14680064, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n;
}
function Ir(e, t, n, r, l, i) {
  var o = 2;
  if (r = e, typeof e == "function") Bo(e) && (o = 1);
  else if (typeof e == "string") o = 5;
  else e: switch (e) {
    case Bt:
      return Lt(n.children, l, i, t);
    case lo:
      o = 8, l |= 8;
      break;
    case li:
      return e = Ee(12, n, t, l | 2), e.elementType = li, e.lanes = i, e;
    case ii:
      return e = Ee(13, n, t, l), e.elementType = ii, e.lanes = i, e;
    case oi:
      return e = Ee(19, n, t, l), e.elementType = oi, e.lanes = i, e;
    case ju:
      return kl(n, l, i, t);
    default:
      if (typeof e == "object" && e !== null) switch (e.$$typeof) {
        case Nu:
          o = 10;
          break e;
        case _u:
          o = 9;
          break e;
        case io:
          o = 11;
          break e;
        case oo:
          o = 14;
          break e;
        case nt:
          o = 16, r = null;
          break e;
      }
      throw Error(k(130, e == null ? e : typeof e, ""));
  }
  return t = Ee(o, n, t, l), t.elementType = e, t.type = r, t.lanes = i, t;
}
function Lt(e, t, n, r) {
  return e = Ee(7, e, r, t), e.lanes = n, e;
}
function kl(e, t, n, r) {
  return e = Ee(22, e, r, t), e.elementType = ju, e.lanes = n, e.stateNode = { isHidden: !1 }, e;
}
function bl(e, t, n) {
  return e = Ee(6, e, null, t), e.lanes = n, e;
}
function ei(e, t, n) {
  return t = Ee(4, e.children !== null ? e.children : [], e.key, t), t.lanes = n, t.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }, t;
}
function Gf(e, t, n, r, l) {
  this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = Ml(0), this.expirationTimes = Ml(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Ml(0), this.identifierPrefix = r, this.onRecoverableError = l, this.mutableSourceEagerHydrationData = null;
}
function Wo(e, t, n, r, l, i, o, s, a) {
  return e = new Gf(e, t, n, s, a), t === 1 ? (t = 1, i === !0 && (t |= 8)) : t = 0, i = Ee(3, null, null, t), e.current = i, i.stateNode = e, i.memoizedState = { element: r, isDehydrated: n, cache: null, transitions: null, pendingSuspenseBoundaries: null }, jo(i), e;
}
function Yf(e, t, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return { $$typeof: At, key: r == null ? null : "" + r, children: e, containerInfo: t, implementation: n };
}
function gc(e) {
  if (!e) return vt;
  e = e._reactInternals;
  e: {
    if (It(e) !== e || e.tag !== 1) throw Error(k(170));
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
    throw Error(k(171));
  }
  if (e.tag === 1) {
    var n = e.type;
    if (ve(n)) return ga(e, n, t);
  }
  return t;
}
function vc(e, t, n, r, l, i, o, s, a) {
  return e = Wo(n, r, !0, e, l, i, o, s, a), e.context = gc(null), n = e.current, r = de(), l = ht(n), i = Ge(r, l), i.callback = t ?? null, ft(n, i, l), e.current.lanes = l, rr(e, l, r), ye(e, r), e;
}
function Sl(e, t, n, r) {
  var l = t.current, i = de(), o = ht(l);
  return n = gc(n), t.context === null ? t.context = n : t.pendingContext = n, t = Ge(i, o), t.payload = { element: e }, r = r === void 0 ? null : r, r !== null && (t.callback = r), e = ft(l, t, o), e !== null && (De(e, l, o, i), Rr(e, l, o)), o;
}
function ul(e) {
  if (e = e.current, !e.child) return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function ru(e, t) {
  if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t;
  }
}
function Vo(e, t) {
  ru(e, t), (e = e.alternate) && ru(e, t);
}
function Xf() {
  return null;
}
var yc = typeof reportError == "function" ? reportError : function(e) {
  console.error(e);
};
function Ho(e) {
  this._internalRoot = e;
}
Nl.prototype.render = Ho.prototype.render = function(e) {
  var t = this._internalRoot;
  if (t === null) throw Error(k(409));
  Sl(e, t, null, null);
};
Nl.prototype.unmount = Ho.prototype.unmount = function() {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    Dt(function() {
      Sl(null, e, null, null);
    }), t[Ze] = null;
  }
};
function Nl(e) {
  this._internalRoot = e;
}
Nl.prototype.unstable_scheduleHydration = function(e) {
  if (e) {
    var t = Xu();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < lt.length && t !== 0 && t < lt[n].priority; n++) ;
    lt.splice(n, 0, e), n === 0 && Ju(e);
  }
};
function Qo(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
}
function _l(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "));
}
function lu() {
}
function Zf(e, t, n, r, l) {
  if (l) {
    if (typeof r == "function") {
      var i = r;
      r = function() {
        var d = ul(o);
        i.call(d);
      };
    }
    var o = vc(t, r, e, 0, null, !1, !1, "", lu);
    return e._reactRootContainer = o, e[Ze] = o.current, Gn(e.nodeType === 8 ? e.parentNode : e), Dt(), o;
  }
  for (; l = e.lastChild; ) e.removeChild(l);
  if (typeof r == "function") {
    var s = r;
    r = function() {
      var d = ul(a);
      s.call(d);
    };
  }
  var a = Wo(e, 0, !1, null, null, !1, !1, "", lu);
  return e._reactRootContainer = a, e[Ze] = a.current, Gn(e.nodeType === 8 ? e.parentNode : e), Dt(function() {
    Sl(t, a, n, r);
  }), a;
}
function jl(e, t, n, r, l) {
  var i = n._reactRootContainer;
  if (i) {
    var o = i;
    if (typeof l == "function") {
      var s = l;
      l = function() {
        var a = ul(o);
        s.call(a);
      };
    }
    Sl(t, o, e, l);
  } else o = Zf(n, t, e, l, r);
  return ul(o);
}
Gu = function(e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = zn(t.pendingLanes);
        n !== 0 && (ao(t, n | 1), ye(t, Z()), !(D & 6) && (dn = Z() + 500, wt()));
      }
      break;
    case 13:
      Dt(function() {
        var r = Je(e, 1);
        if (r !== null) {
          var l = de();
          De(r, e, 1, l);
        }
      }), Vo(e, 1);
  }
};
co = function(e) {
  if (e.tag === 13) {
    var t = Je(e, 134217728);
    if (t !== null) {
      var n = de();
      De(t, e, 134217728, n);
    }
    Vo(e, 134217728);
  }
};
Yu = function(e) {
  if (e.tag === 13) {
    var t = ht(e), n = Je(e, t);
    if (n !== null) {
      var r = de();
      De(n, e, t, r);
    }
    Vo(e, t);
  }
};
Xu = function() {
  return U;
};
Zu = function(e, t) {
  var n = U;
  try {
    return U = e, t();
  } finally {
    U = n;
  }
};
gi = function(e, t, n) {
  switch (t) {
    case "input":
      if (ai(e, n), t = n.name, n.type === "radio" && t != null) {
        for (n = e; n.parentNode; ) n = n.parentNode;
        for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < n.length; t++) {
          var r = n[t];
          if (r !== e && r.form === e.form) {
            var l = ml(r);
            if (!l) throw Error(k(90));
            Eu(r), ai(r, l);
          }
        }
      }
      break;
    case "textarea":
      Pu(e, n);
      break;
    case "select":
      t = n.value, t != null && qt(e, !!n.multiple, t, !1);
  }
};
Du = Io;
Fu = Dt;
var Jf = { usingClientEntryPoint: !1, Events: [ir, Qt, ml, Mu, Ou, Io] }, jn = { findFiberByHostInstance: Ct, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, qf = { bundleType: jn.bundleType, version: jn.version, rendererPackageName: jn.rendererPackageName, rendererConfig: jn.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: be.ReactCurrentDispatcher, findHostInstanceByFiber: function(e) {
  return e = Au(e), e === null ? null : e.stateNode;
}, findFiberByHostInstance: jn.findFiberByHostInstance || Xf, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var Cr = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!Cr.isDisabled && Cr.supportsFiber) try {
    dl = Cr.inject(qf), Be = Cr;
  } catch {
  }
}
Ne.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Jf;
Ne.createPortal = function(e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!Qo(t)) throw Error(k(200));
  return Yf(e, t, null, n);
};
Ne.createRoot = function(e, t) {
  if (!Qo(e)) throw Error(k(299));
  var n = !1, r = "", l = yc;
  return t != null && (t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onRecoverableError !== void 0 && (l = t.onRecoverableError)), t = Wo(e, 1, !1, null, null, n, !1, r, l), e[Ze] = t.current, Gn(e.nodeType === 8 ? e.parentNode : e), new Ho(t);
};
Ne.findDOMNode = function(e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function" ? Error(k(188)) : (e = Object.keys(e).join(","), Error(k(268, e)));
  return e = Au(t), e = e === null ? null : e.stateNode, e;
};
Ne.flushSync = function(e) {
  return Dt(e);
};
Ne.hydrate = function(e, t, n) {
  if (!_l(t)) throw Error(k(200));
  return jl(null, e, t, !0, n);
};
Ne.hydrateRoot = function(e, t, n) {
  if (!Qo(e)) throw Error(k(405));
  var r = n != null && n.hydratedSources || null, l = !1, i = "", o = yc;
  if (n != null && (n.unstable_strictMode === !0 && (l = !0), n.identifierPrefix !== void 0 && (i = n.identifierPrefix), n.onRecoverableError !== void 0 && (o = n.onRecoverableError)), t = vc(t, null, e, 1, n ?? null, l, !1, i, o), e[Ze] = t.current, Gn(e), r) for (e = 0; e < r.length; e++) n = r[e], l = n._getVersion, l = l(n._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [n, l] : t.mutableSourceEagerHydrationData.push(
    n,
    l
  );
  return new Nl(t);
};
Ne.render = function(e, t, n) {
  if (!_l(t)) throw Error(k(200));
  return jl(null, e, t, !1, n);
};
Ne.unmountComponentAtNode = function(e) {
  if (!_l(e)) throw Error(k(40));
  return e._reactRootContainer ? (Dt(function() {
    jl(null, null, e, !1, function() {
      e._reactRootContainer = null, e[Ze] = null;
    });
  }), !0) : !1;
};
Ne.unstable_batchedUpdates = Io;
Ne.unstable_renderSubtreeIntoContainer = function(e, t, n, r) {
  if (!_l(n)) throw Error(k(200));
  if (e == null || e._reactInternals === void 0) throw Error(k(38));
  return jl(e, t, n, !1, r);
};
Ne.version = "18.3.1-next-f1338f8080-20240426";
function xc() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(xc);
    } catch (e) {
      console.error(e);
    }
}
xc(), xu.exports = Ne;
var bf = xu.exports, wc, iu = bf;
wc = iu.createRoot, iu.hydrateRoot;
function O({ name: e, className: t }) {
  return /* @__PURE__ */ u.jsx("span", { className: `icon-wrap ${t ?? ""}`, "aria-hidden": "true", children: /* @__PURE__ */ u.jsx("ha-icon", { icon: e.includes(":") ? e : `mdi:${e}` }) });
}
const Pt = "No area", ep = {
  RDM002: "Hue Tap Dial",
  RWL020: "Hue Dimmer switch",
  RWL021: "Hue Dimmer switch",
  RWL022: "Hue Dimmer switch",
  ROM001: "Hue Smart button"
}, Ko = (e) => e.model === "RDM002", Xi = (e) => Ko(e) ? { press: "one of the dial's four buttons", rest: "Turn to dim · hold a button for off" } : { press: "the Hue button", rest: "Power button turns on/off · up/down dim" }, tp = (e) => e.model && ep[e.model] || [e.manufacturer, e.model].filter(Boolean).join(" ");
function Go(e, t) {
  const n = e.dial, r = n ? t.find((o) => o.id === n.group_id) : void 0, l = !!n && e.bound.some((o) => o.group_id === n.group_id), i = !!n && !!r && n.buttons.every(([, o]) => r.scenes.some((s) => s.id === o));
  return { found: !!n, group: r, bound: l, saved: i, done: [!!n, !!r, l, i].filter(Boolean).length };
}
function Cl(e, t) {
  if (e.dial_supported)
    return Go(e, t).done === 4 ? { state: "ok", label: "Set up" } : !e.dial && !e.bound.length ? { state: "idle", label: "Not set up" } : { state: "attention", label: "Needs set-up" };
  const n = e.bound.length;
  return n ? { state: "ok", label: n > 1 ? `Bound to ${n}` : "Bound" } : { state: "idle", label: "Not bound" };
}
function np(e, t, n) {
  const r = /* @__PURE__ */ new Map(), l = (i) => {
    let o = r.get(i);
    return o || (o = { name: i, icon: n[i] || "mdi:home-outline", groups: [], remotes: [], attention: [] }, r.set(i, o)), o;
  };
  for (const i of e) l(i.areas[0] ?? Pt).groups.push(i);
  for (const i of t) {
    const o = l(i.area ?? Pt);
    o.remotes.push(i), Cl(i, e).state === "attention" && o.attention.push(i);
  }
  return [...r.values()].sort(
    (i, o) => +(o.attention.length > 0) - +(i.attention.length > 0) || +(i.name === Pt) - +(o.name === Pt) || i.name.localeCompare(o.name)
  );
}
const Yo = (e, t) => {
  var n;
  return !!t && ((n = e.states[t]) == null ? void 0 : n.state) === "on";
}, rp = (e, t) => t.reduce((n, r) => n + r.members.filter((l) => Yo(e, l.entity_id)).length, 0), lp = (e) => e.reduce((t, n) => t + n.members.length, 0);
function kc(e) {
  if (!(e != null && e.length)) return "var(--hrs-swatch-unknown)";
  const t = e.filter((l) => !!l);
  if (!t.length) return "linear-gradient(135deg, #2b2f3a, #12141a)";
  const n = ([l, i, o, s]) => {
    const a = 0.35 + 0.65 * (s / 255);
    return `rgb(${Math.round(l * a)}, ${Math.round(i * a)}, ${Math.round(o * a)})`;
  }, r = [...new Set(t.map(n))].slice(0, 4);
  return r.length === 1 ? `linear-gradient(135deg, color-mix(in srgb, ${r[0]} 70%, white), ${r[0]})` : `linear-gradient(135deg, ${r.join(", ")})`;
}
function ou(e) {
  if (e == null) return null;
  const t = typeof e == "number" ? e * 1e3 : Date.parse(e);
  if (Number.isNaN(t)) return null;
  const n = Math.max(0, (Date.now() - t) / 1e3);
  return n < 60 ? "just now" : n < 3600 ? `${Math.round(n / 60)} min ago` : n < 86400 ? `${Math.round(n / 3600)} h ago` : n < 172800 ? "yesterday" : `${Math.round(n / 86400)} days ago`;
}
function Xo({ scene: e, badge: t, disabled: n, onRecall: r }) {
  return /* @__PURE__ */ u.jsxs("button", { className: "chip-btn scene-chip", disabled: n, onClick: r, title: `Recall ${e.name}`, children: [
    /* @__PURE__ */ u.jsx("span", { className: "dot", style: { background: kc(e.colors) } }),
    e.name,
    t && /* @__PURE__ */ u.jsx("span", { className: "badge", children: t })
  ] });
}
function Zi({ scene: e, dots: t, total: n, missing: r, busy: l, onRecall: i, onOverwrite: o, onRename: s, onDelete: a }) {
  const [d, m] = I.useState(!1), [g, h] = I.useState(e.name), y = e.members.length;
  return /* @__PURE__ */ u.jsxs("div", { className: "srow", children: [
    t && /* @__PURE__ */ u.jsx("span", { className: "dots", children: t }),
    /* @__PURE__ */ u.jsx("span", { className: "swatch", style: { background: kc(e.colors) } }),
    d ? /* @__PURE__ */ u.jsxs(
      "form",
      {
        onSubmit: (w) => {
          w.preventDefault(), m(!1), g.trim() && g !== e.name && (s == null || s(g));
        },
        children: [
          /* @__PURE__ */ u.jsx("input", { type: "text", value: g, maxLength: 40, autoFocus: !0, onChange: (w) => h(w.target.value), "aria-label": "Scene name" }),
          /* @__PURE__ */ u.jsx("button", { type: "submit", children: "Save" })
        ]
      }
    ) : /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
      /* @__PURE__ */ u.jsxs("div", { className: "grow", children: [
        /* @__PURE__ */ u.jsx("div", { className: "name", children: e.name }),
        /* @__PURE__ */ u.jsxs("div", { className: "meta muted small", children: [
          "Scene ",
          e.id,
          y < n && /* @__PURE__ */ u.jsxs("span", { className: "chip warn", title: `Missing on: ${r}`, children: [
            "on ",
            y,
            " of ",
            n,
            " lights"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ u.jsx("button", { className: "round recall", disabled: l, onClick: i, title: "Recall", "aria-label": `Recall ${e.name}`, children: /* @__PURE__ */ u.jsx(O, { name: "play" }) }),
      s && /* @__PURE__ */ u.jsx("button", { className: "ghost round", disabled: l, onClick: () => {
        h(e.name), m(!0);
      }, title: "Rename", "aria-label": "Rename", children: /* @__PURE__ */ u.jsx(O, { name: "pencil-outline" }) }),
      /* @__PURE__ */ u.jsx("button", { className: "ghost round", disabled: l, onClick: o, title: "Save the current state here", "aria-label": "Save the current state here", children: /* @__PURE__ */ u.jsx(O, { name: "content-save-edit-outline" }) }),
      a && /* @__PURE__ */ u.jsx("button", { className: "danger round", disabled: l, onClick: a, title: "Delete", "aria-label": "Delete", children: /* @__PURE__ */ u.jsx(O, { name: "delete-outline" }) })
    ] })
  ] });
}
function Sc({ dots: e, label: t, busy: n, onSave: r }) {
  const [l, i] = I.useState("");
  return /* @__PURE__ */ u.jsxs("div", { className: "srow", children: [
    /* @__PURE__ */ u.jsx("span", { className: "dots", children: e }),
    /* @__PURE__ */ u.jsx("span", { className: "swatch", style: { background: "var(--hl-off-fill)" } }),
    /* @__PURE__ */ u.jsxs(
      "form",
      {
        onSubmit: (o) => {
          o.preventDefault(), l.trim() && r(l);
        },
        children: [
          /* @__PURE__ */ u.jsx("input", { type: "text", placeholder: `Scene for ${t}`, value: l, maxLength: 40, onChange: (o) => i(o.target.value), "aria-label": `Scene for ${t}` }),
          /* @__PURE__ */ u.jsxs("button", { type: "submit", className: "primary", disabled: n || !l.trim(), children: [
            /* @__PURE__ */ u.jsx(O, { name: "content-save-outline" }),
            " Save current state"
          ] })
        ]
      }
    )
  ] });
}
const ti = { 6: "On/off", 8: "Dimming", 5: "Scenes" }, Nc = (e) => String((e == null ? void 0 : e.message) ?? e), al = (e) => `0x${e.toString(16).padStart(4, "0").toUpperCase()}`, fn = (e) => /^\d/.test(e) ? "●".repeat(parseInt(e, 10)) : e.split(" ").pop(), Ye = (e, t) => `${e} ${t}${e === 1 ? "" : "s"}`;
function El() {
  const [e, t] = I.useState(!1), [n, r] = I.useState(null);
  return { busy: e, result: n, act: async (i, o = "Talking to the lights…") => {
    t(o), r(null);
    try {
      const s = await i();
      s && r({ kind: s.includes("didn't") ? "error" : "ok", text: s });
    } catch (s) {
      r({ kind: "error", text: Nc(s) });
    } finally {
      t(!1);
    }
  }, clear: () => r(null) };
}
function ip({ getHass: e, group: t, onChanged: n }) {
  var P;
  const { busy: r, result: l, act: i } = El(), [o, s] = I.useState(""), a = e(), d = Object.fromEntries(t.members.map((_) => [_.key, _.name])), m = t.members.filter((_) => _.scenes), g = (_) => _.map((E) => d[E] ?? E).join(", "), h = (_) => g(m.map((E) => E.key).filter((E) => !_.includes(E))), y = t.members.filter((_) => Yo(a, _.entity_id)).length, w = ((P = t.dials[0]) == null ? void 0 : P.buttons) ?? [], S = new Set(t.dials.flatMap((_) => _.buttons.map((E) => E.scene_id))), T = t.scenes.filter((_) => !S.has(_.id)), f = (_, E) => i(async () => {
    const F = await e().callWS({ group_id: t.id, ..._ });
    return n(), E(F);
  }), c = (_) => (E) => {
    const F = Object.keys(E.failed);
    return F.length ? `${_} on ${E.ok.length} of ${E.ok.length + F.length} lights. These didn't answer: ${g(F)}` : `${_} on ${Ye(E.ok.length, "light")}`;
  }, p = (_, E) => f({ type: "hue_remote_scenes/recall", scene_id: _ }, () => `Recalled ${E}`), v = (_, E) => confirm(`Save how the lights are now as "${E}"?`) && f({ type: "hue_remote_scenes/store", scene_id: _ }, c("Saved")), x = (_, E) => f({ type: "hue_remote_scenes/rename", scene_id: _, name: E }, () => "Renamed"), N = (_, E) => confirm(`Delete "${E}" from the lights?`) && f(
    { type: "hue_remote_scenes/delete", scene_id: _ },
    (F) => Object.keys(F.failed).length ? `Deleted, but some lights didn't answer and may still have it: ${g(Object.keys(F.failed))}` : `Deleted ${E}`
  ), C = () => {
    o.trim() && f({ type: "hue_remote_scenes/store", name: o }, c("Saved")).then(() => s(""));
  };
  return /* @__PURE__ */ u.jsxs("section", { className: "card", children: [
    /* @__PURE__ */ u.jsxs("div", { className: "card-head", children: [
      /* @__PURE__ */ u.jsxs("div", { className: "title", children: [
        /* @__PURE__ */ u.jsx(O, { name: "lightbulb-group-outline", className: "title-icon" }),
        /* @__PURE__ */ u.jsxs("div", { children: [
          /* @__PURE__ */ u.jsx("h2", { children: t.name }),
          /* @__PURE__ */ u.jsxs("div", { className: "muted small", children: [
            "Group ",
            al(t.id),
            " · ",
            m.length ? m.map((_) => _.name).join(", ") : "no lights that can store scenes",
            t.members.length > m.length && ` (+${t.members.length - m.length} without scenes)`
          ] })
        ] })
      ] }),
      /* @__PURE__ */ u.jsxs("span", { className: `chip ${y ? "on" : ""}`, children: [
        /* @__PURE__ */ u.jsx(O, { name: y ? "lightbulb-on-outline" : "lightbulb-off-outline" }),
        y ? `${y} on` : "Off"
      ] })
    ] }),
    m.length > 0 && /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
      w.length > 0 && /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
        /* @__PURE__ */ u.jsxs("h3", { children: [
          t.dials.map((_) => _.name).join(", "),
          " buttons"
        ] }),
        /* @__PURE__ */ u.jsx("div", { className: "rows", children: w.map((_) => {
          const E = t.scenes.find((F) => F.id === _.scene_id);
          return E ? /* @__PURE__ */ u.jsx(
            Zi,
            {
              scene: E,
              dots: fn(_.label),
              total: m.length,
              missing: h(E.members),
              busy: !!r,
              onRecall: () => p(E.id, E.name),
              onOverwrite: () => v(E.id, E.name),
              onRename: (F) => x(E.id, F)
            },
            _.scene_id
          ) : /* @__PURE__ */ u.jsx(
            Sc,
            {
              dots: fn(_.label),
              label: _.label,
              busy: !!r,
              onSave: (F) => f({ type: "hue_remote_scenes/store", scene_id: _.scene_id, name: F }, c("Saved"))
            },
            _.scene_id
          );
        }) }),
        w.some((_) => /^\d/.test(_.label)) && /* @__PURE__ */ u.jsx("p", { className: "muted small", children: "Hold any button to turn the lights off. Turn the dial to dim." })
      ] }),
      /* @__PURE__ */ u.jsx("h3", { children: w.length ? "Other scenes" : "Scenes" }),
      /* @__PURE__ */ u.jsxs("div", { className: "rows", children: [
        T.map((_) => /* @__PURE__ */ u.jsx(
          Zi,
          {
            scene: _,
            total: m.length,
            missing: h(_.members),
            busy: !!r,
            onRecall: () => p(_.id, _.name),
            onOverwrite: () => v(_.id, _.name),
            onRename: (E) => x(_.id, E),
            onDelete: () => N(_.id, _.name)
          },
          _.id
        )),
        !T.length && /* @__PURE__ */ u.jsxs("p", { className: "muted", children: [
          "No ",
          w.length ? "other " : "",
          "scenes yet."
        ] })
      ] }),
      /* @__PURE__ */ u.jsxs(
        "form",
        {
          className: "inline-row",
          onSubmit: (_) => {
            _.preventDefault(), C();
          },
          children: [
            /* @__PURE__ */ u.jsx("input", { type: "text", placeholder: "New scene name", value: o, maxLength: 40, onChange: (_) => s(_.target.value), "aria-label": "New scene name" }),
            /* @__PURE__ */ u.jsxs("button", { className: "primary", type: "submit", disabled: !!r || !o.trim(), children: [
              /* @__PURE__ */ u.jsx(O, { name: "content-save-outline" }),
              " Save current state"
            ] })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ u.jsx("div", { className: "card-actions", children: /* @__PURE__ */ u.jsxs(
      "button",
      {
        className: "ghost",
        disabled: !!r || !m.length,
        title: "Ask the lights which scenes they already have, e.g. ones made in Zigbee2MQTT",
        onClick: () => f(
          { type: "hue_remote_scenes/import" },
          (_) => _.added.length ? `Found ${Ye(_.added.length, "new scene")}. Rename them above.` : _.found.length ? "No new scenes: the ones on the lights are all here." : "The lights have no scenes for this group yet."
        ),
        children: [
          /* @__PURE__ */ u.jsx(O, { name: "database-import-outline" }),
          " Import from lights"
        ]
      }
    ) }),
    r && /* @__PURE__ */ u.jsx("div", { className: "status busy", children: r }),
    l && /* @__PURE__ */ u.jsx("div", { className: `status ${l.kind}`, children: l.text })
  ] });
}
function op({ getHass: e, remote: t, groups: n, busy: r, act: l, onChanged: i }) {
  var p, v;
  const o = t.cycle, s = t.cycle_trigger, [a, d] = I.useState(!1), [m, g] = I.useState((o == null ? void 0 : o.group_id) ?? ((p = n.find((x) => x.scenes.length)) == null ? void 0 : p.id) ?? ((v = n[0]) == null ? void 0 : v.id) ?? 0), [h, y] = I.useState((o == null ? void 0 : o.scene_ids) ?? []), w = n.find((x) => x.id === m), S = o ? n.find((x) => x.id === o.group_id) : void 0, T = (x) => y((N) => N.includes(x) ? N.filter((C) => C !== x) : [...N, x]), f = (x) => l(async () => (await e().callWS(
    x ? { type: "hue_remote_scenes/set_cycle", ieee: t.ieee } : { type: "hue_remote_scenes/set_cycle", ieee: t.ieee, group_id: m, scene_ids: h }
  ), d(!1), i(), x ? "Stopped cycling scenes." : `${s.label} now cycles ${Ye(h.length, "scene")}.`), "Saving…"), c = (x, N, C) => l(async () => (await e().callWS({ type: "hue_remote_scenes/recall", group_id: x, scene_id: N }), `Recalled ${C}`));
  return /* @__PURE__ */ u.jsxs("div", { className: "stack-sm", children: [
    /* @__PURE__ */ u.jsx("h3", { children: "Scene cycle" }),
    !a && o && S && /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
      /* @__PURE__ */ u.jsx("div", { className: "chips", children: o.scene_ids.map((x, N) => {
        const C = S.scenes.find((P) => P.id === x);
        return C ? /* @__PURE__ */ u.jsx(Xo, { scene: C, badge: String(N + 1), disabled: r, onRecall: () => c(S.id, x, C.name) }, x) : null;
      }) }),
      /* @__PURE__ */ u.jsxs("div", { className: "ctl muted small", children: [
        /* @__PURE__ */ u.jsx(O, { name: "sync" }),
        /* @__PURE__ */ u.jsxs("span", { className: "grow", children: [
          s.label,
          " recalls the next scene in ",
          S.name,
          ". Needs Home Assistant running."
        ] })
      ] }),
      /* @__PURE__ */ u.jsxs("div", { className: "actions", children: [
        /* @__PURE__ */ u.jsx("button", { className: "ghost", disabled: r, onClick: () => d(!0), children: "Change" }),
        /* @__PURE__ */ u.jsx("button", { className: "danger", disabled: r, onClick: () => f(!0), children: "Stop" })
      ] })
    ] }),
    !a && !o && /* @__PURE__ */ u.jsxs("div", { className: "inline-row", children: [
      /* @__PURE__ */ u.jsxs("span", { className: "muted small grow", children: [
        "It can't recall scenes itself, but while Home Assistant runs, ",
        s.label.toLowerCase(),
        " can step through scenes you pick."
      ] }),
      /* @__PURE__ */ u.jsx("button", { disabled: r || !n.length, onClick: () => d(!0), children: "Choose scenes" })
    ] }),
    a && /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
      /* @__PURE__ */ u.jsx(
        "select",
        {
          value: m,
          disabled: !n.length,
          onChange: (x) => {
            g(+x.target.value), y([]);
          },
          "aria-label": "Group to cycle",
          children: n.map((x) => /* @__PURE__ */ u.jsxs("option", { value: x.id, children: [
            x.name,
            x.areas[0] ? ` (${x.areas[0]})` : ""
          ] }, x.id))
        }
      ),
      /* @__PURE__ */ u.jsxs("div", { className: "chips", children: [
        ((w == null ? void 0 : w.scenes) ?? []).map((x) => /* @__PURE__ */ u.jsxs("button", { className: `chip-btn ${h.includes(x.id) ? "on" : ""}`, onClick: () => T(x.id), children: [
          h.includes(x.id) && `${h.indexOf(x.id) + 1} · `,
          x.name
        ] }, x.id)),
        w && !w.scenes.length && /* @__PURE__ */ u.jsx("span", { className: "muted small", children: "Save some scenes in this group first." })
      ] }),
      /* @__PURE__ */ u.jsxs("div", { className: "actions", children: [
        /* @__PURE__ */ u.jsx("span", { className: "spacer" }),
        /* @__PURE__ */ u.jsx("button", { className: "ghost", disabled: r, onClick: () => d(!1), children: "Cancel" }),
        /* @__PURE__ */ u.jsx("button", { className: "primary", disabled: r || !h.length, onClick: () => f(!1), children: "Save cycle" })
      ] })
    ] })
  ] });
}
const sp = ["Find its group", "Choose lights", "Bind", "Save button scenes"], Zo = (e) => Ko(e) ? "knob" : e.endpoints.some((t) => t.clusters.includes(8)) ? "remote" : "gesture-tap-button";
function _c({ getHass: e, remote: t, groups: n, compact: r, onSetup: l, onChanged: i }) {
  var gn, sr;
  const { busy: o, result: s, act: a } = El(), [d, m] = I.useState(!1), [g, h] = I.useState(t.endpoints[0].id), [y, w] = I.useState(((gn = n[0]) == null ? void 0 : gn.id) ?? 0), S = e(), T = Cl(t, n), f = Go(t, n), c = t.dial_supported && f.done === 4, p = t.endpoints.find((R) => R.id === g) ?? t.endpoints[0], v = (R) => n.find((A) => A.id === R), x = (R) => {
    var A;
    return ((A = v(R)) == null ? void 0 : A.name) ?? `Group ${al(R)}`;
  }, N = t.battery_entity ? (sr = S.states[t.battery_entity]) == null ? void 0 : sr.state : void 0, C = t.bound.filter((R) => {
    var A;
    return !(c && R.group_id === ((A = t.dial) == null ? void 0 : A.group_id));
  }), P = () => a(async () => {
    const R = await e().callWS({ type: "hue_remote_scenes/bindings", ieee: t.ieee });
    i();
    const A = new Set(R.bindings.map((j) => j.group_id)).size;
    return A ? `Bound to ${A === 1 ? "1 group" : `${A} groups`}` : "Not bound to any group";
  }, "Waiting for the remote… press one of its buttons."), _ = (R) => a(async () => {
    const A = await e().callWS({
      type: "hue_remote_scenes/bind",
      ieee: t.ieee,
      endpoint: p.id,
      group_id: y,
      clusters: p.clusters,
      unbind: R
    });
    i();
    const j = Object.entries(A.results).filter(([, $]) => $ !== "ok"), L = R ? "Unbound from" : "Bound to";
    return j.length === Object.keys(A.results).length ? "The remote didn't answer. Press a button on it and try again." : j.length ? `${L} ${x(y)}, but these didn't take: ${j.map(([$, Q]) => `${ti[+$] ?? $} (${Q})`).join(", ")}` : (m(!1), `${L} ${x(y)}`);
  }, "Waiting for the remote… press one of its buttons."), E = (R, A, j) => a(async () => (await e().callWS({ type: "hue_remote_scenes/recall", group_id: R, scene_id: A }), `Recalled ${j}`)), F = f.group, et = t.checked ? `Bindings checked ${ou(t.checked)}` : t.last_seen ? `Seen ${ou(t.last_seen)}` : null, kt = N != null && N !== "unavailable" && N !== "unknown" ? `${Math.round(+N)}% battery` : null;
  return /* @__PURE__ */ u.jsxs("section", { className: "card remote", children: [
    /* @__PURE__ */ u.jsxs("div", { className: "card-head", children: [
      /* @__PURE__ */ u.jsxs("div", { className: "title", children: [
        /* @__PURE__ */ u.jsx(O, { name: Zo(t), className: "title-icon" }),
        /* @__PURE__ */ u.jsxs("div", { children: [
          /* @__PURE__ */ u.jsx("h2", { children: t.name }),
          /* @__PURE__ */ u.jsx("div", { className: "muted small", children: [r ? null : t.area ?? "No area", tp(t), kt].filter(Boolean).join(" · ") })
        ] })
      ] }),
      /* @__PURE__ */ u.jsx("span", { className: `chip ${T.state === "ok" ? "ok" : T.state === "attention" ? "warn" : ""}`, children: T.label })
    ] }),
    t.dial_supported && !c && /* @__PURE__ */ u.jsxs("div", { className: "stack-sm", children: [
      /* @__PURE__ */ u.jsx("h3", { children: "Scene buttons" }),
      /* @__PURE__ */ u.jsx("div", { className: "prog", children: /* @__PURE__ */ u.jsx("span", { style: { width: `${Math.max(4, f.done / 4 * 100)}%` } }) }),
      /* @__PURE__ */ u.jsx("span", { className: "muted small", children: f.done ? `Step ${f.done + 1} of 4: ${sp[f.done].toLowerCase()}` : "Its buttons can recall scenes stored in the lights, even when Home Assistant is down." })
    ] }),
    c && F && t.dial && /* @__PURE__ */ u.jsxs("div", { className: "stack-sm", children: [
      /* @__PURE__ */ u.jsx("h3", { children: "Buttons" }),
      /* @__PURE__ */ u.jsx("div", { className: "chips", children: t.dial.buttons.map(([R, A]) => {
        const j = F.scenes.find((L) => L.id === A);
        return /* @__PURE__ */ u.jsx(Xo, { scene: j, badge: fn(R), disabled: !!o, onRecall: () => E(F.id, A, j.name) }, A);
      }) }),
      /* @__PURE__ */ u.jsxs("div", { className: "ctl muted small", children: [
        /* @__PURE__ */ u.jsx(O, { name: Ko(t) ? "rotate-right" : "brightness-6" }),
        /* @__PURE__ */ u.jsxs("span", { className: "grow", children: [
          Xi(t).rest,
          " · ",
          F.name
        ] })
      ] })
    ] }),
    C.length > 0 && /* @__PURE__ */ u.jsxs("div", { className: "stack-sm", children: [
      /* @__PURE__ */ u.jsx("h3", { children: c ? "Also controls" : "Controls" }),
      C.map((R) => {
        var A;
        return /* @__PURE__ */ u.jsxs("div", { className: "ctl", children: [
          /* @__PURE__ */ u.jsx(O, { name: "lightbulb-group-outline" }),
          /* @__PURE__ */ u.jsxs("span", { className: "grow", children: [
            x(R.group_id),
            ((A = v(R.group_id)) == null ? void 0 : A.areas[0]) && /* @__PURE__ */ u.jsxs("span", { className: "muted small", children: [
              " · ",
              v(R.group_id).areas[0]
            ] })
          ] }),
          /* @__PURE__ */ u.jsx("span", { className: "muted small", children: R.clusters.map((j) => ti[j] ?? j).join(", ") })
        ] }, R.group_id);
      })
    ] }),
    t.cycle_trigger && /* @__PURE__ */ u.jsx(op, { getHass: e, remote: t, groups: n, busy: !!o, act: a, onChanged: i }),
    T.state === "idle" && !t.cycle_trigger && !t.dial_supported && /* @__PURE__ */ u.jsx("p", { className: "muted", children: "Not bound to a group yet." }),
    d && /* @__PURE__ */ u.jsxs("div", { className: "bind-row", children: [
      t.endpoints.length > 1 && /* @__PURE__ */ u.jsx("select", { value: p.id, onChange: (R) => h(+R.target.value), "aria-label": "Button set", children: t.endpoints.map((R) => /* @__PURE__ */ u.jsxs("option", { value: R.id, children: [
        "Endpoint ",
        R.id
      ] }, R.id)) }),
      /* @__PURE__ */ u.jsx("select", { value: y, disabled: !n.length, onChange: (R) => w(+R.target.value), "aria-label": "Group", children: n.map((R) => /* @__PURE__ */ u.jsxs("option", { value: R.id, children: [
        R.name,
        R.areas[0] ? ` (${R.areas[0]})` : ""
      ] }, R.id)) }),
      /* @__PURE__ */ u.jsx("button", { className: "primary", disabled: !!o || !n.length, onClick: () => _(!1), children: "Bind" }),
      /* @__PURE__ */ u.jsx("button", { disabled: !!o || !n.length, onClick: () => _(!0), children: "Unbind" }),
      /* @__PURE__ */ u.jsxs("span", { className: "muted small", children: [
        "Sends ",
        p.clusters.map((R) => ti[R] ?? R).join(", ")
      ] })
    ] }),
    /* @__PURE__ */ u.jsxs("div", { className: "card-actions", children: [
      t.dial_supported && !c ? /* @__PURE__ */ u.jsxs("button", { className: "soft-btn", disabled: !!o, onClick: l, children: [
        /* @__PURE__ */ u.jsx(O, { name: "cog-outline" }),
        " ",
        f.done ? "Continue set-up" : "Set up scene buttons"
      ] }) : /* @__PURE__ */ u.jsxs("button", { className: "soft-btn", disabled: !!o, onClick: () => m(!d), children: [
        /* @__PURE__ */ u.jsx(O, { name: d ? "close" : "link-variant-plus" }),
        " ",
        d ? "Close" : "Bind to a group"
      ] }),
      /* @__PURE__ */ u.jsx("button", { className: "ghost", disabled: !!o, onClick: P, children: "Check bindings" })
    ] }),
    et && !r && /* @__PURE__ */ u.jsx("div", { className: "muted small", children: et }),
    o && /* @__PURE__ */ u.jsx("div", { className: "status busy", children: o }),
    s && /* @__PURE__ */ u.jsx("div", { className: `status ${s.kind}`, children: s.text })
  ] });
}
function up({ getHass: e, area: t, groups: n, onBack: r, onSetup: l, onChanged: i }) {
  return /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
    /* @__PURE__ */ u.jsxs("nav", { className: "crumbs", children: [
      /* @__PURE__ */ u.jsx("button", { className: "link", onClick: r, children: "Areas" }),
      /* @__PURE__ */ u.jsx(O, { name: "chevron-right" }),
      /* @__PURE__ */ u.jsx("span", { children: t.name })
    ] }),
    /* @__PURE__ */ u.jsxs("div", { className: "split", children: [
      /* @__PURE__ */ u.jsxs("div", { className: "stack", children: [
        t.groups.map((o) => /* @__PURE__ */ u.jsx(ip, { getHass: e, group: o, onChanged: i }, o.id)),
        !t.groups.length && /* @__PURE__ */ u.jsxs("div", { className: "empty-state", children: [
          /* @__PURE__ */ u.jsx(O, { name: "lightbulb-group-outline" }),
          /* @__PURE__ */ u.jsxs("p", { children: [
            "No ZHA groups in ",
            t.name,
            ". Create one under Settings → Devices & services → Zigbee Home Automation → Configure → Groups and put its lights in this area, or set up a Tap Dial here."
          ] })
        ] })
      ] }),
      /* @__PURE__ */ u.jsxs("div", { className: "stack", children: [
        t.remotes.map((o) => /* @__PURE__ */ u.jsx(_c, { getHass: e, remote: o, groups: n, compact: !0, onSetup: () => l(o.ieee), onChanged: i }, o.ieee)),
        !t.remotes.length && /* @__PURE__ */ u.jsxs("p", { className: "muted small", children: [
          "No remotes in ",
          t.name,
          ". Give a remote this area on its device page, or bind one from the Remotes tab."
        ] })
      ] })
    ] })
  ] });
}
const ap = [{ title: "Find group" }, { title: "Lights" }, { title: "Bind" }, { title: "Scenes" }];
function cp({ getHass: e, remote: t, groups: n, onChanged: r, onClose: l }) {
  const { busy: i, result: o, act: s, clear: a } = El(), d = Go(t, n), [m, g] = I.useState(Math.min(d.done, 3)), h = t.dial, y = d.group;
  I.useEffect(() => {
    g((S) => Math.max(S, Math.min(d.done, 3)));
  }, [d.done]);
  const w = (S) => {
    a(), g(S);
  };
  return /* @__PURE__ */ u.jsxs("section", { className: "card remote", children: [
    /* @__PURE__ */ u.jsxs("div", { className: "card-head", children: [
      /* @__PURE__ */ u.jsxs("div", { className: "title", children: [
        /* @__PURE__ */ u.jsx(O, { name: Zo(t), className: "title-icon" }),
        /* @__PURE__ */ u.jsxs("div", { children: [
          /* @__PURE__ */ u.jsxs("h2", { children: [
            "Set up ",
            t.name
          ] }),
          /* @__PURE__ */ u.jsx("div", { className: "muted small", children: "Scene buttons that work even when Home Assistant is down" })
        ] })
      ] }),
      /* @__PURE__ */ u.jsxs("button", { className: "ghost", onClick: l, disabled: !!i, children: [
        /* @__PURE__ */ u.jsx(O, { name: "close" }),
        " Close"
      ] })
    ] }),
    /* @__PURE__ */ u.jsx("div", { className: "segmented full steps", role: "tablist", children: ap.map((S, T) => {
      const f = [d.found, !!y, d.bound, d.saved][T];
      return /* @__PURE__ */ u.jsxs("button", { role: "tab", "aria-selected": T === m, className: `${T === m ? "on" : ""} ${f ? "done" : ""}`, onClick: () => w(T), disabled: !!i, children: [
        f && /* @__PURE__ */ u.jsx(O, { name: "check" }),
        S.title
      ] }, S.title);
    }) }),
    m === 0 && /* @__PURE__ */ u.jsx(dp, { getHass: e, remote: t, busy: !!i, act: s, onChanged: r }),
    m === 1 && (h ? /* @__PURE__ */ u.jsx(fp, { getHass: e, remote: t, group: y, busy: !!i, act: s, onChanged: r }) : /* @__PURE__ */ u.jsx(ni, {})),
    m === 2 && (h && y ? /* @__PURE__ */ u.jsx(pp, { getHass: e, remote: t, group: y, bound: d.bound, busy: !!i, act: s, onChanged: r }) : /* @__PURE__ */ u.jsx(ni, {})),
    m === 3 && (h && y ? /* @__PURE__ */ u.jsx(hp, { getHass: e, remote: t, group: y, busy: !!i, act: s, onChanged: r }) : /* @__PURE__ */ u.jsx(ni, {})),
    i && /* @__PURE__ */ u.jsx("div", { className: "status busy", children: i }),
    o && /* @__PURE__ */ u.jsx("div", { className: `status ${o.kind}`, children: o.text }),
    /* @__PURE__ */ u.jsxs("div", { className: "card-actions", children: [
      m > 0 && /* @__PURE__ */ u.jsxs("button", { className: "ghost", disabled: !!i, onClick: () => w(m - 1), children: [
        /* @__PURE__ */ u.jsx(O, { name: "chevron-left" }),
        " Back"
      ] }),
      /* @__PURE__ */ u.jsx("span", { className: "spacer" }),
      m < 3 ? /* @__PURE__ */ u.jsxs("button", { className: "primary", disabled: !!i || d.done <= m, onClick: () => w(m + 1), children: [
        "Next ",
        /* @__PURE__ */ u.jsx(O, { name: "chevron-right" })
      ] }) : /* @__PURE__ */ u.jsx("button", { className: "primary", disabled: !!i, onClick: l, children: "Done" })
    ] })
  ] });
}
const ni = () => /* @__PURE__ */ u.jsx("p", { className: "muted", children: "Finish the earlier steps first." });
function dp({ getHass: e, remote: t, busy: n, act: r, onChanged: l }) {
  const i = () => r(async () => {
    const o = await e().callWS({ type: "hue_remote_scenes/find_dial_group", ieee: t.ieee });
    return l(), `Its scene buttons use group ${al(o.group_id)}${o.exists ? ", which ZHA already has" : ""}.`;
  }, `Press ${Xi(t).press} now, then again every few seconds until this finishes…`);
  return /* @__PURE__ */ u.jsxs("div", { className: "stack-sm", children: [
    /* @__PURE__ */ u.jsx("h2", { children: "Find the remote's group" }),
    /* @__PURE__ */ u.jsxs("p", { className: "muted", children: [
      "This remote recalls its scenes on its own built-in group. Press ",
      /* @__PURE__ */ u.jsx("strong", { children: "Find its group" }),
      ", then press",
      " ",
      Xi(t).press,
      " a few times so it wakes up and shows which group it uses."
    ] }),
    /* @__PURE__ */ u.jsxs("div", { className: "inline-row", children: [
      /* @__PURE__ */ u.jsxs("button", { className: t.dial ? "" : "primary", disabled: n, onClick: i, children: [
        /* @__PURE__ */ u.jsx(O, { name: "magnify" }),
        " ",
        t.dial ? "Find again" : "Find its group"
      ] }),
      t.dial && /* @__PURE__ */ u.jsxs("span", { className: "chip ok", children: [
        /* @__PURE__ */ u.jsx(O, { name: "check" }),
        " Uses group ",
        al(t.dial.group_id)
      ] })
    ] })
  ] });
}
function fp({ getHass: e, remote: t, group: n, busy: r, act: l, onChanged: i }) {
  const [o, s] = I.useState(null), [a, d] = I.useState(/* @__PURE__ */ new Set()), [m, g] = I.useState(t.name), h = e(), y = new Set((n == null ? void 0 : n.members.map((c) => c.key)) ?? []);
  I.useEffect(() => {
    e().callWS({ type: "hue_remote_scenes/lights" }).then((c) => s(c.lights)).catch(() => s([]));
  }, [e]);
  const w = (c) => d((p) => {
    const v = new Set(p);
    return v.has(c) ? v.delete(c) : v.add(c), v;
  }), S = () => l(async () => (await e().callWS({ type: "hue_remote_scenes/create_group", group_id: t.dial.group_id, name: (n == null ? void 0 : n.name) ?? m, members: [...a] }), d(/* @__PURE__ */ new Set()), i(), n ? `Added ${Ye(a.size, "light")} to ${n.name}.` : `Created ${m}. Next, bind the remote to it.`), "Adding the lights to the group…"), T = /* @__PURE__ */ new Map();
  for (const c of o ?? []) {
    const p = c.area ?? Pt;
    T.set(p, [...T.get(p) ?? [], c]);
  }
  const f = [...T.keys()].sort(
    (c, p) => +(p === t.area) - +(c === t.area) || +(c === Pt) - +(p === Pt) || c.localeCompare(p)
  );
  return /* @__PURE__ */ u.jsxs("div", { className: "stack-sm", children: [
    /* @__PURE__ */ u.jsx("h2", { children: n ? `Lights in ${n.name}` : "Which lights should it control?" }),
    /* @__PURE__ */ u.jsx("p", { className: "muted", children: n ? `${Ye(n.members.length, "light")} are in the remote's group. Tick more to add them.` : "They'll go in a new ZHA group with the remote's ID. Only lights that can store scenes are listed." }),
    !o && /* @__PURE__ */ u.jsx("p", { className: "muted", children: "Loading lights…" }),
    o && !o.length && /* @__PURE__ */ u.jsx("p", { className: "muted", children: "No lights that can store scenes found." }),
    f.map((c) => /* @__PURE__ */ u.jsxs("div", { className: "stack-sm", children: [
      /* @__PURE__ */ u.jsx("h3", { children: c }),
      /* @__PURE__ */ u.jsx("div", { className: "picks", children: T.get(c).map((p) => {
        const v = y.has(p.key), x = v || a.has(p.key);
        return /* @__PURE__ */ u.jsxs("label", { className: `pick ${x ? "on" : ""}`, children: [
          /* @__PURE__ */ u.jsx("input", { type: "checkbox", checked: x, disabled: v || r, onChange: () => w(p.key) }),
          /* @__PURE__ */ u.jsx("span", { className: `bulb ${Yo(h, p.entity_id) ? "lit" : ""}` }),
          /* @__PURE__ */ u.jsx("span", { children: p.name })
        ] }, p.key);
      }) })
    ] }, c)),
    !n && /* @__PURE__ */ u.jsxs("label", { className: "inline-row", children: [
      /* @__PURE__ */ u.jsx("span", { className: "muted", children: "Group name" }),
      /* @__PURE__ */ u.jsx("input", { type: "text", value: m, maxLength: 40, onChange: (c) => g(c.target.value) })
    ] }),
    /* @__PURE__ */ u.jsxs("div", { className: "inline-row", children: [
      /* @__PURE__ */ u.jsx("span", { className: "muted small spacer", children: a.size ? `${Ye(a.size, "light")} selected` : "" }),
      /* @__PURE__ */ u.jsxs("button", { className: "primary", disabled: r || !a.size || !n && !m.trim(), onClick: S, children: [
        /* @__PURE__ */ u.jsx(O, { name: "plus" }),
        " ",
        n ? "Add lights" : "Create group"
      ] })
    ] })
  ] });
}
function pp({ getHass: e, remote: t, group: n, bound: r, busy: l, act: i, onChanged: o }) {
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
    const m = Object.entries(d.results).filter(([, g]) => g !== "ok");
    return m.length === Object.keys(d.results).length ? "The remote didn't answer. Press one of its buttons and try again." : m.length ? `Bound, but some parts didn't take (${m.map(([g, h]) => `${g}: ${h}`).join(", ")}). Try again.` : `Bound to ${n.name}.`;
  }, "Waiting for the remote… press one of its buttons.");
  return /* @__PURE__ */ u.jsxs("div", { className: "stack-sm", children: [
    /* @__PURE__ */ u.jsxs("h2", { children: [
      "Bind ",
      t.name,
      " to ",
      n.name
    ] }),
    /* @__PURE__ */ u.jsxs("p", { className: "muted", children: [
      "Binding makes the remote talk to the lights directly over Zigbee. It's asleep most of the time:",
      " ",
      /* @__PURE__ */ u.jsx("strong", { children: "press one of its buttons" }),
      ", then press Bind."
    ] }),
    /* @__PURE__ */ u.jsxs("div", { className: "inline-row", children: [
      /* @__PURE__ */ u.jsxs("button", { className: "primary", disabled: l, onClick: a, children: [
        /* @__PURE__ */ u.jsx(O, { name: "link-variant-plus" }),
        " ",
        r ? "Bind again" : "Bind"
      ] }),
      r && /* @__PURE__ */ u.jsx("span", { className: "chip ok", children: "Bound" })
    ] })
  ] });
}
function hp({ getHass: e, remote: t, group: n, busy: r, act: l, onChanged: i }) {
  const o = n.members.filter((a) => a.scenes), s = (a, d) => l(async () => {
    const m = await e().callWS({ type: "hue_remote_scenes/store", group_id: n.id, scene_id: a, ...d ? { name: d } : {} });
    i();
    const g = Object.keys(m.failed).length;
    return g ? `Saved on ${m.ok.length} of ${m.ok.length + g} lights; some didn't answer.` : `Saved on ${Ye(m.ok.length, "light")}`;
  });
  return /* @__PURE__ */ u.jsxs("div", { className: "stack-sm", children: [
    /* @__PURE__ */ u.jsx("h2", { children: "Save a scene for each button" }),
    /* @__PURE__ */ u.jsxs("p", { className: "muted", children: [
      "Set the ",
      n.name,
      " lights how you want them for a button, then save. Do this for each one. You can change them later from the area."
    ] }),
    /* @__PURE__ */ u.jsx("div", { className: "rows", children: t.dial.buttons.map(([a, d]) => {
      const m = n.scenes.find((g) => g.id === d);
      return m ? /* @__PURE__ */ u.jsx(
        Zi,
        {
          scene: m,
          dots: fn(a),
          total: o.length,
          missing: "",
          busy: r,
          onRecall: () => l(async () => (await e().callWS({ type: "hue_remote_scenes/recall", group_id: n.id, scene_id: d }), `Recalled ${m.name}`)),
          onOverwrite: () => confirm(`Save how the lights are now as "${m.name}"?`) && s(d)
        },
        d
      ) : /* @__PURE__ */ u.jsx(Sc, { dots: fn(a), label: a, busy: r, onSave: (g) => s(d, g) }, d);
    }) })
  ] });
}
function mp() {
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
function gp({ getHass: e, areas: t, groups: n, onOpen: r, onSetup: l }) {
  return /* @__PURE__ */ u.jsx("div", { className: "grid", children: t.map((i) => /* @__PURE__ */ u.jsx(vp, { getHass: e, area: i, groups: n, onOpen: () => r(i.name), onSetup: l }, i.name)) });
}
function vp({ getHass: e, area: t, groups: n, onOpen: r, onSetup: l }) {
  const { busy: i, result: o, act: s } = El(), a = e(), d = lp(t.groups), m = rp(a, t.groups), g = (h, y, w) => s(async () => (await e().callWS({ type: "hue_remote_scenes/recall", group_id: h.id, scene_id: y }), `Recalled ${w}`));
  return /* @__PURE__ */ u.jsxs("section", { className: "card", children: [
    /* @__PURE__ */ u.jsxs("div", { className: "card-head", children: [
      /* @__PURE__ */ u.jsxs("div", { className: "title", children: [
        /* @__PURE__ */ u.jsx(O, { name: t.icon, className: "title-icon" }),
        /* @__PURE__ */ u.jsxs("div", { children: [
          /* @__PURE__ */ u.jsx("h2", { children: t.name }),
          /* @__PURE__ */ u.jsx("div", { className: "muted small", children: [t.groups.length ? Ye(t.groups.length, "group") : null, d ? Ye(d, "light") : null, t.remotes.length ? null : "no remote"].filter(Boolean).join(" · ") })
        ] })
      ] }),
      d > 0 && /* @__PURE__ */ u.jsxs("span", { className: `chip ${m ? "on" : ""}`, children: [
        /* @__PURE__ */ u.jsx(O, { name: m ? "lightbulb-on-outline" : "lightbulb-off-outline" }),
        m ? `${m} on` : "Off"
      ] })
    ] }),
    t.attention.map((h) => /* @__PURE__ */ u.jsxs("div", { className: "status warn row", children: [
      /* @__PURE__ */ u.jsx(O, { name: "alert-outline" }),
      /* @__PURE__ */ u.jsxs("span", { className: "grow", children: [
        h.name,
        " needs setting up"
      ] }),
      /* @__PURE__ */ u.jsx("button", { className: "primary", onClick: () => l(h.ieee), children: "Set up" })
    ] }, h.ieee)),
    t.remotes.filter((h) => !t.attention.includes(h)).map((h) => {
      const y = Cl(h, n);
      return /* @__PURE__ */ u.jsxs("div", { className: "remote-line", children: [
        /* @__PURE__ */ u.jsx(O, { name: Zo(h) }),
        /* @__PURE__ */ u.jsx("strong", { className: "grow", children: h.name }),
        /* @__PURE__ */ u.jsx("span", { className: `chip ${y.state === "ok" ? "ok" : ""}`, children: y.label })
      ] }, h.ieee);
    }),
    t.groups.map((h) => {
      const y = new Map(h.dials.flatMap((T) => T.buttons.map((f) => [f.scene_id, fn(f.label)]))), w = (T) => y.has(T) ? [...y.keys()].indexOf(T) : 100 + T, S = [...h.scenes].sort((T, f) => w(T.id) - w(f.id));
      return /* @__PURE__ */ u.jsxs("div", { className: "stack-sm", children: [
        /* @__PURE__ */ u.jsx("h3", { children: h.name }),
        S.length ? /* @__PURE__ */ u.jsx("div", { className: "chips", children: S.map((T) => /* @__PURE__ */ u.jsx(Xo, { scene: T, badge: y.get(T.id), disabled: !!i, onRecall: () => g(h, T.id, T.name) }, T.id)) }) : /* @__PURE__ */ u.jsx("span", { className: "muted small", children: "No scenes yet." })
      ] }, h.id);
    }),
    /* @__PURE__ */ u.jsxs("div", { className: "card-actions", children: [
      /* @__PURE__ */ u.jsx("span", { className: "spacer" }),
      /* @__PURE__ */ u.jsxs("button", { className: "ghost", onClick: r, children: [
        t.groups.length ? "Scenes" : "More",
        " ",
        /* @__PURE__ */ u.jsx(O, { name: "chevron-right" })
      ] })
    ] }),
    o && /* @__PURE__ */ u.jsx("div", { className: `status ${o.kind}`, children: o.text })
  ] });
}
const su = { attention: 0, ok: 1, idle: 2 };
function yp({ getHass: e, remotes: t, groups: n, onSetup: r, onChanged: l }) {
  const [i, o] = I.useState("all");
  if (!t.length)
    return /* @__PURE__ */ u.jsxs("div", { className: "empty-state", children: [
      /* @__PURE__ */ u.jsx(O, { name: "remote-off" }),
      /* @__PURE__ */ u.jsx("p", { children: "No remotes found. Pair a remote (like a Hue Tap Dial) with ZHA first." })
    ] });
  const s = t.map((g) => ({ r: g, s: Cl(g, n).state })), a = (g) => s.filter((h) => h.s === g).length, d = s.filter((g) => i === "all" || g.s === i).sort((g, h) => su[g.s] - su[h.s] || g.r.name.localeCompare(h.r.name)), m = [
    ["all", "All", t.length],
    ["attention", "Needs set-up", a("attention")],
    ["idle", "Not set up", a("idle")]
  ];
  return /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
    /* @__PURE__ */ u.jsxs("div", { className: "inline-row", children: [
      /* @__PURE__ */ u.jsx("div", { className: "segmented", role: "radiogroup", "aria-label": "Show", children: m.map(
        ([g, h, y]) => g === "all" || y ? /* @__PURE__ */ u.jsxs("button", { role: "radio", "aria-checked": i === g, className: i === g ? "on" : "", onClick: () => o(g), children: [
          h,
          " · ",
          y
        ] }, g) : null
      ) }),
      /* @__PURE__ */ u.jsx("span", { className: "spacer" }),
      /* @__PURE__ */ u.jsx("span", { className: "muted small", children: "Battery remotes sleep: press a button on one just before changing it." })
    ] }),
    /* @__PURE__ */ u.jsx("div", { className: "grid", children: d.map(({ r: g }) => /* @__PURE__ */ u.jsx(_c, { getHass: e, remote: g, groups: n, onSetup: () => r(g.ieee), onChanged: l }, g.ieee)) })
  ] });
}
const xp = [
  { id: "areas", label: "Areas", icon: "home-outline" },
  { id: "remotes", label: "Remotes", icon: "remote" }
];
function wp({ getHass: e, narrow: t, onToggleMenu: n }) {
  const [r, l] = I.useState(null), [i, o] = I.useState(null), [s, a] = I.useState({}), [d, m] = I.useState("areas"), [g, h] = I.useState(null), [y, w] = I.useState(null), [S, T] = I.useState(""), f = I.useCallback(() => {
    const N = e();
    Promise.all([
      N.callWS({ type: "hue_remote_scenes/groups" }),
      N.callWS({ type: "hue_remote_scenes/remotes" })
    ]).then(([C, P]) => {
      l(C.groups), o(P.remotes), a({ ...C.area_icons, ...P.area_icons }), T("");
    }).catch((C) => T(Nc(C)));
  }, [e]);
  I.useEffect(() => {
    f();
    const N = e().connection.subscribeMessage(f, { type: "hue_remote_scenes/subscribe" });
    return () => {
      N.then((C) => C()).catch(() => {
      });
    };
  }, [e, f]);
  const c = r && i ? np(r, i, s) : null, p = c == null ? void 0 : c.find((N) => N.name === g), v = i == null ? void 0 : i.find((N) => N.ieee === y), x = (N) => {
    m(N), h(null), w(null);
  };
  return /* @__PURE__ */ u.jsxs("div", { className: "panel", children: [
    /* @__PURE__ */ u.jsxs("header", { children: [
      /* @__PURE__ */ u.jsxs("div", { className: "toolbar-row", children: [
        t && /* @__PURE__ */ u.jsx("button", { className: "menu", onClick: n, "aria-label": "Menu", children: /* @__PURE__ */ u.jsx(O, { name: "menu" }) }),
        /* @__PURE__ */ u.jsx(mp, {}),
        /* @__PURE__ */ u.jsx("h1", { children: "Hue remote scenes" })
      ] }),
      /* @__PURE__ */ u.jsx("nav", { className: "tabs", role: "tablist", children: xp.map((N) => /* @__PURE__ */ u.jsxs("button", { role: "tab", "aria-selected": N.id === d, className: N.id === d ? "on" : "", onClick: () => x(N.id), children: [
        /* @__PURE__ */ u.jsx(O, { name: N.icon }),
        /* @__PURE__ */ u.jsx("span", { children: N.label })
      ] }, N.id)) })
    ] }),
    /* @__PURE__ */ u.jsxs("main", { children: [
      S && /* @__PURE__ */ u.jsx("div", { className: "status error", children: S }),
      v && r && /* @__PURE__ */ u.jsx(cp, { getHass: e, remote: v, groups: r, onChanged: f, onClose: () => w(null) }),
      !v && c && r && i && d === "areas" && !p && (c.length ? /* @__PURE__ */ u.jsx(gp, { getHass: e, areas: c, groups: r, onOpen: h, onSetup: w }) : /* @__PURE__ */ u.jsxs("div", { className: "empty-state", children: [
        /* @__PURE__ */ u.jsx(O, { name: "lightbulb-group-outline" }),
        /* @__PURE__ */ u.jsx("p", { children: "No ZHA groups or remotes yet. Create a group under Settings → Devices & services → Zigbee Home Automation → Configure → Groups. For a Hue Tap Dial, pair it and use the Remotes tab: it creates the group the dial needs." })
      ] })),
      !v && p && r && d === "areas" && /* @__PURE__ */ u.jsx(up, { getHass: e, area: p, groups: r, onBack: () => h(null), onSetup: w, onChanged: f }),
      !v && r && i && d === "remotes" && /* @__PURE__ */ u.jsx(yp, { getHass: e, remotes: i, groups: r, onSetup: w, onChanged: f })
    ] })
  ] });
}
const kp = (
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
.toolbar-row .menu { background: transparent; border: 0; color: inherit; padding: 8px; margin-left: -8px; border-radius: 50%; }
.toolbar-row .menu:hover { background: rgba(255,255,255,.12); }
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

/* The card's main action, like hive-local's Boost button */
.card-actions { display: flex; align-items: center; gap: 8px; }
.soft-btn { flex: 1; border-color: transparent; background: color-mix(in srgb, var(--hl-accent) 14%, transparent); color: var(--hl-accent); font-weight: 500; }
.soft-btn:hover:not(:disabled) { background: color-mix(in srgb, var(--hl-accent) 22%, transparent); }

/* Areas */
.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 16px; align-items: start; }
.remote-line { display: flex; align-items: center; gap: 8px; color: var(--secondary-text-color); font-size: 14px; }
.remote-line .icon-wrap { --mdc-icon-size: 18px; }
.remote-line strong { color: var(--primary-text-color); font-weight: 500; }
.scene-chip { padding: 6px 14px 6px 8px; }
.scene-chip .badge { font-size: 9px; letter-spacing: 1px; color: var(--secondary-text-color); }
.dot { width: 18px; height: 18px; border-radius: 50%; flex: none; box-shadow: inset 0 0 0 1px rgba(0,0,0,.1); }
.crumbs { display: flex; align-items: center; gap: 4px; font-size: 14px; color: var(--secondary-text-color); }
.crumbs .icon-wrap { --mdc-icon-size: 16px; }
.split { display: grid; grid-template-columns: minmax(0, 1fr) 320px; gap: 16px; align-items: start; }

/* Scene rows, like hive-local's schedule events */
.rows { display: flex; flex-direction: column; }
.srow { display: flex; align-items: center; gap: 12px; padding: 8px 0; border-bottom: 1px solid var(--divider-color); }
.srow:last-child { border-bottom: 0; }
.swatch { width: 10px; height: 36px; border-radius: 5px; flex: none; box-shadow: inset 0 0 0 1px rgba(0,0,0,.08); }
.srow .dots { width: 36px; flex: none; letter-spacing: 1px; font-size: 11px; color: var(--hl-accent); }
.srow .name { font-weight: 500; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.srow .meta { display: flex; align-items: center; gap: 8px; margin-top: 2px; }
.srow form { display: flex; gap: 8px; flex: 1; min-width: 0; }
.srow form input { flex: 1; }
.recall { border-color: transparent; background: color-mix(in srgb, var(--hl-accent) 14%, transparent); color: var(--hl-accent); }
.recall:hover:not(:disabled) { background: color-mix(in srgb, var(--hl-accent) 24%, transparent) !important; }

/* Remotes */
.ctl { display: flex; align-items: center; gap: 10px; font-size: 14px; }
.ctl .icon-wrap { --mdc-icon-size: 18px; color: var(--secondary-text-color); }
.prog { height: 6px; border-radius: 999px; background: var(--hl-off-fill); overflow: hidden; }
.prog span { display: block; height: 100%; border-radius: 999px; background: var(--hl-accent); }
.bind-row { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }

/* Scene-button set-up */
.picks { display: flex; flex-wrap: wrap; gap: 8px; }
.pick { display: inline-flex; align-items: center; gap: 8px; padding: 6px 14px 6px 10px; border-radius: 999px; border: 1px solid var(--divider-color); cursor: pointer; font-size: 14px; }
.pick.on { border-color: var(--hl-accent); background: color-mix(in srgb, var(--hl-accent) 12%, transparent); }
.pick input { margin: 0; accent-color: var(--hl-accent); }
.bulb { width: 10px; height: 10px; border-radius: 50%; background: var(--hl-off-fill); flex: none; }
.bulb.lit { background: var(--hl-light); }

@media (max-width: 760px) {
  .split { grid-template-columns: 1fr; }
}
@media (max-width: 600px) {
  main { padding: 12px 8px 24px; gap: 12px; }
  .card { padding: 14px; }
  .grid { grid-template-columns: 1fr; }
  .tabs { padding: 0 4px; }
  .tabs button { padding: 12px 10px 10px; font-size: 13px; }
  .tabs .icon-wrap { display: none; }
  .segmented.steps button { padding: 7px 6px; font-size: 12px; }
}
`
);
class Sp extends HTMLElement {
  constructor() {
    super(...arguments);
    vn(this, "_hass");
    vn(this, "_narrow", !1);
    vn(this, "_root");
    vn(this, "_pending");
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
      r.textContent = kp;
      const l = document.createElement("div");
      n.append(r, l), this._root = wc(l);
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
        wp,
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
customElements.get("hue-remote-scenes-panel") || customElements.define("hue-remote-scenes-panel", Sp);
