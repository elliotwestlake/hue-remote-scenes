var sc = Object.defineProperty;
var ac = (e, t, n) => t in e ? sc(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var rr = (e, t, n) => ac(e, typeof t != "symbol" ? t + "" : t, n);
var Gu = { exports: {} }, ll = {}, Yu = { exports: {} }, R = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Zn = Symbol.for("react.element"), cc = Symbol.for("react.portal"), dc = Symbol.for("react.fragment"), fc = Symbol.for("react.strict_mode"), pc = Symbol.for("react.profiler"), hc = Symbol.for("react.provider"), mc = Symbol.for("react.context"), vc = Symbol.for("react.forward_ref"), gc = Symbol.for("react.suspense"), yc = Symbol.for("react.memo"), xc = Symbol.for("react.lazy"), $o = Symbol.iterator;
function wc(e) {
  return e === null || typeof e != "object" ? null : (e = $o && e[$o] || e["@@iterator"], typeof e == "function" ? e : null);
}
var Xu = { isMounted: function() {
  return !1;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, Zu = Object.assign, Ju = {};
function an(e, t, n) {
  this.props = e, this.context = t, this.refs = Ju, this.updater = n || Xu;
}
an.prototype.isReactComponent = {};
an.prototype.setState = function(e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, e, t, "setState");
};
an.prototype.forceUpdate = function(e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function qu() {
}
qu.prototype = an.prototype;
function Wi(e, t, n) {
  this.props = e, this.context = t, this.refs = Ju, this.updater = n || Xu;
}
var Hi = Wi.prototype = new qu();
Hi.constructor = Wi;
Zu(Hi, an.prototype);
Hi.isPureReactComponent = !0;
var Uo = Array.isArray, bu = Object.prototype.hasOwnProperty, Qi = { current: null }, es = { key: !0, ref: !0, __self: !0, __source: !0 };
function ts(e, t, n) {
  var r, l = {}, i = null, o = null;
  if (t != null) for (r in t.ref !== void 0 && (o = t.ref), t.key !== void 0 && (i = "" + t.key), t) bu.call(t, r) && !es.hasOwnProperty(r) && (l[r] = t[r]);
  var u = arguments.length - 2;
  if (u === 1) l.children = n;
  else if (1 < u) {
    for (var s = Array(u), d = 0; d < u; d++) s[d] = arguments[d + 2];
    l.children = s;
  }
  if (e && e.defaultProps) for (r in u = e.defaultProps, u) l[r] === void 0 && (l[r] = u[r]);
  return { $$typeof: Zn, type: e, key: i, ref: o, props: l, _owner: Qi.current };
}
function kc(e, t) {
  return { $$typeof: Zn, type: e.type, key: t, ref: e.ref, props: e.props, _owner: e._owner };
}
function Ki(e) {
  return typeof e == "object" && e !== null && e.$$typeof === Zn;
}
function Sc(e) {
  var t = { "=": "=0", ":": "=2" };
  return "$" + e.replace(/[=:]/g, function(n) {
    return t[n];
  });
}
var Ao = /\/+/g;
function El(e, t) {
  return typeof e == "object" && e !== null && e.key != null ? Sc("" + e.key) : t.toString(36);
}
function kr(e, t, n, r, l) {
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
        case Zn:
        case cc:
          o = !0;
      }
  }
  if (o) return o = e, l = l(o), e = r === "" ? "." + El(o, 0) : r, Uo(l) ? (n = "", e != null && (n = e.replace(Ao, "$&/") + "/"), kr(l, t, n, "", function(d) {
    return d;
  })) : l != null && (Ki(l) && (l = kc(l, n + (!l.key || o && o.key === l.key ? "" : ("" + l.key).replace(Ao, "$&/") + "/") + e)), t.push(l)), 1;
  if (o = 0, r = r === "" ? "." : r + ":", Uo(e)) for (var u = 0; u < e.length; u++) {
    i = e[u];
    var s = r + El(i, u);
    o += kr(i, t, n, s, l);
  }
  else if (s = wc(e), typeof s == "function") for (e = s.call(e), u = 0; !(i = e.next()).done; ) i = i.value, s = r + El(i, u++), o += kr(i, t, n, s, l);
  else if (i === "object") throw t = String(e), Error("Objects are not valid as a React child (found: " + (t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) + "). If you meant to render a collection of children, use an array instead.");
  return o;
}
function lr(e, t, n) {
  if (e == null) return e;
  var r = [], l = 0;
  return kr(e, r, "", "", function(i) {
    return t.call(n, i, l++);
  }), r;
}
function _c(e) {
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
var ae = { current: null }, Sr = { transition: null }, Ec = { ReactCurrentDispatcher: ae, ReactCurrentBatchConfig: Sr, ReactCurrentOwner: Qi };
function ns() {
  throw Error("act(...) is not supported in production builds of React.");
}
R.Children = { map: lr, forEach: function(e, t, n) {
  lr(e, function() {
    t.apply(this, arguments);
  }, n);
}, count: function(e) {
  var t = 0;
  return lr(e, function() {
    t++;
  }), t;
}, toArray: function(e) {
  return lr(e, function(t) {
    return t;
  }) || [];
}, only: function(e) {
  if (!Ki(e)) throw Error("React.Children.only expected to receive a single React element child.");
  return e;
} };
R.Component = an;
R.Fragment = dc;
R.Profiler = pc;
R.PureComponent = Wi;
R.StrictMode = fc;
R.Suspense = gc;
R.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Ec;
R.act = ns;
R.cloneElement = function(e, t, n) {
  if (e == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
  var r = Zu({}, e.props), l = e.key, i = e.ref, o = e._owner;
  if (t != null) {
    if (t.ref !== void 0 && (i = t.ref, o = Qi.current), t.key !== void 0 && (l = "" + t.key), e.type && e.type.defaultProps) var u = e.type.defaultProps;
    for (s in t) bu.call(t, s) && !es.hasOwnProperty(s) && (r[s] = t[s] === void 0 && u !== void 0 ? u[s] : t[s]);
  }
  var s = arguments.length - 2;
  if (s === 1) r.children = n;
  else if (1 < s) {
    u = Array(s);
    for (var d = 0; d < s; d++) u[d] = arguments[d + 2];
    r.children = u;
  }
  return { $$typeof: Zn, type: e.type, key: l, ref: i, props: r, _owner: o };
};
R.createContext = function(e) {
  return e = { $$typeof: mc, _currentValue: e, _currentValue2: e, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, e.Provider = { $$typeof: hc, _context: e }, e.Consumer = e;
};
R.createElement = ts;
R.createFactory = function(e) {
  var t = ts.bind(null, e);
  return t.type = e, t;
};
R.createRef = function() {
  return { current: null };
};
R.forwardRef = function(e) {
  return { $$typeof: vc, render: e };
};
R.isValidElement = Ki;
R.lazy = function(e) {
  return { $$typeof: xc, _payload: { _status: -1, _result: e }, _init: _c };
};
R.memo = function(e, t) {
  return { $$typeof: yc, type: e, compare: t === void 0 ? null : t };
};
R.startTransition = function(e) {
  var t = Sr.transition;
  Sr.transition = {};
  try {
    e();
  } finally {
    Sr.transition = t;
  }
};
R.unstable_act = ns;
R.useCallback = function(e, t) {
  return ae.current.useCallback(e, t);
};
R.useContext = function(e) {
  return ae.current.useContext(e);
};
R.useDebugValue = function() {
};
R.useDeferredValue = function(e) {
  return ae.current.useDeferredValue(e);
};
R.useEffect = function(e, t) {
  return ae.current.useEffect(e, t);
};
R.useId = function() {
  return ae.current.useId();
};
R.useImperativeHandle = function(e, t, n) {
  return ae.current.useImperativeHandle(e, t, n);
};
R.useInsertionEffect = function(e, t) {
  return ae.current.useInsertionEffect(e, t);
};
R.useLayoutEffect = function(e, t) {
  return ae.current.useLayoutEffect(e, t);
};
R.useMemo = function(e, t) {
  return ae.current.useMemo(e, t);
};
R.useReducer = function(e, t, n) {
  return ae.current.useReducer(e, t, n);
};
R.useRef = function(e) {
  return ae.current.useRef(e);
};
R.useState = function(e) {
  return ae.current.useState(e);
};
R.useSyncExternalStore = function(e, t, n) {
  return ae.current.useSyncExternalStore(e, t, n);
};
R.useTransition = function() {
  return ae.current.useTransition();
};
R.version = "18.3.1";
Yu.exports = R;
var F = Yu.exports;
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Cc = F, Nc = Symbol.for("react.element"), jc = Symbol.for("react.fragment"), zc = Object.prototype.hasOwnProperty, Pc = Cc.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, Tc = { key: !0, ref: !0, __self: !0, __source: !0 };
function rs(e, t, n) {
  var r, l = {}, i = null, o = null;
  n !== void 0 && (i = "" + n), t.key !== void 0 && (i = "" + t.key), t.ref !== void 0 && (o = t.ref);
  for (r in t) zc.call(t, r) && !Tc.hasOwnProperty(r) && (l[r] = t[r]);
  if (e && e.defaultProps) for (r in t = e.defaultProps, t) l[r] === void 0 && (l[r] = t[r]);
  return { $$typeof: Nc, type: e, key: i, ref: o, props: l, _owner: Pc.current };
}
ll.Fragment = jc;
ll.jsx = rs;
ll.jsxs = rs;
Gu.exports = ll;
var p = Gu.exports, ls = { exports: {} }, _e = {}, is = { exports: {} }, os = {};
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
  function t(N, z) {
    var T = N.length;
    N.push(z);
    e: for (; 0 < T; ) {
      var K = T - 1 >>> 1, J = N[K];
      if (0 < l(J, z)) N[K] = z, N[T] = J, T = K;
      else break e;
    }
  }
  function n(N) {
    return N.length === 0 ? null : N[0];
  }
  function r(N) {
    if (N.length === 0) return null;
    var z = N[0], T = N.pop();
    if (T !== z) {
      N[0] = T;
      e: for (var K = 0, J = N.length, tr = J >>> 1; K < tr; ) {
        var wt = 2 * (K + 1) - 1, _l = N[wt], kt = wt + 1, nr = N[kt];
        if (0 > l(_l, T)) kt < J && 0 > l(nr, _l) ? (N[K] = nr, N[kt] = T, K = kt) : (N[K] = _l, N[wt] = T, K = wt);
        else if (kt < J && 0 > l(nr, T)) N[K] = nr, N[kt] = T, K = kt;
        else break e;
      }
    }
    return z;
  }
  function l(N, z) {
    var T = N.sortIndex - z.sortIndex;
    return T !== 0 ? T : N.id - z.id;
  }
  if (typeof performance == "object" && typeof performance.now == "function") {
    var i = performance;
    e.unstable_now = function() {
      return i.now();
    };
  } else {
    var o = Date, u = o.now();
    e.unstable_now = function() {
      return o.now() - u;
    };
  }
  var s = [], d = [], h = 1, g = null, m = 3, k = !1, S = !1, _ = !1, L = typeof setTimeout == "function" ? setTimeout : null, f = typeof clearTimeout == "function" ? clearTimeout : null, c = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function a(N) {
    for (var z = n(d); z !== null; ) {
      if (z.callback === null) r(d);
      else if (z.startTime <= N) r(d), z.sortIndex = z.expirationTime, t(s, z);
      else break;
      z = n(d);
    }
  }
  function v(N) {
    if (_ = !1, a(N), !S) if (n(s) !== null) S = !0, kl(w);
    else {
      var z = n(d);
      z !== null && Sl(v, z.startTime - N);
    }
  }
  function w(N, z) {
    S = !1, _ && (_ = !1, f(E), E = -1), k = !0;
    var T = m;
    try {
      for (a(z), g = n(s); g !== null && (!(g.expirationTime > z) || N && !de()); ) {
        var K = g.callback;
        if (typeof K == "function") {
          g.callback = null, m = g.priorityLevel;
          var J = K(g.expirationTime <= z);
          z = e.unstable_now(), typeof J == "function" ? g.callback = J : g === n(s) && r(s), a(z);
        } else r(s);
        g = n(s);
      }
      if (g !== null) var tr = !0;
      else {
        var wt = n(d);
        wt !== null && Sl(v, wt.startTime - z), tr = !1;
      }
      return tr;
    } finally {
      g = null, m = T, k = !1;
    }
  }
  var j = !1, y = null, E = -1, O = 5, P = -1;
  function de() {
    return !(e.unstable_now() - P < O);
  }
  function ye() {
    if (y !== null) {
      var N = e.unstable_now();
      P = N;
      var z = !0;
      try {
        z = y(!0, N);
      } finally {
        z ? fe() : (j = !1, y = null);
      }
    } else j = !1;
  }
  var fe;
  if (typeof c == "function") fe = function() {
    c(ye);
  };
  else if (typeof MessageChannel < "u") {
    var xt = new MessageChannel(), uc = xt.port2;
    xt.port1.onmessage = ye, fe = function() {
      uc.postMessage(null);
    };
  } else fe = function() {
    L(ye, 0);
  };
  function kl(N) {
    y = N, j || (j = !0, fe());
  }
  function Sl(N, z) {
    E = L(function() {
      N(e.unstable_now());
    }, z);
  }
  e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(N) {
    N.callback = null;
  }, e.unstable_continueExecution = function() {
    S || k || (S = !0, kl(w));
  }, e.unstable_forceFrameRate = function(N) {
    0 > N || 125 < N ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : O = 0 < N ? Math.floor(1e3 / N) : 5;
  }, e.unstable_getCurrentPriorityLevel = function() {
    return m;
  }, e.unstable_getFirstCallbackNode = function() {
    return n(s);
  }, e.unstable_next = function(N) {
    switch (m) {
      case 1:
      case 2:
      case 3:
        var z = 3;
        break;
      default:
        z = m;
    }
    var T = m;
    m = z;
    try {
      return N();
    } finally {
      m = T;
    }
  }, e.unstable_pauseExecution = function() {
  }, e.unstable_requestPaint = function() {
  }, e.unstable_runWithPriority = function(N, z) {
    switch (N) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;
      default:
        N = 3;
    }
    var T = m;
    m = N;
    try {
      return z();
    } finally {
      m = T;
    }
  }, e.unstable_scheduleCallback = function(N, z, T) {
    var K = e.unstable_now();
    switch (typeof T == "object" && T !== null ? (T = T.delay, T = typeof T == "number" && 0 < T ? K + T : K) : T = K, N) {
      case 1:
        var J = -1;
        break;
      case 2:
        J = 250;
        break;
      case 5:
        J = 1073741823;
        break;
      case 4:
        J = 1e4;
        break;
      default:
        J = 5e3;
    }
    return J = T + J, N = { id: h++, callback: z, priorityLevel: N, startTime: T, expirationTime: J, sortIndex: -1 }, T > K ? (N.sortIndex = T, t(d, N), n(s) === null && N === n(d) && (_ ? (f(E), E = -1) : _ = !0, Sl(v, T - K))) : (N.sortIndex = J, t(s, N), S || k || (S = !0, kl(w))), N;
  }, e.unstable_shouldYield = de, e.unstable_wrapCallback = function(N) {
    var z = m;
    return function() {
      var T = m;
      m = z;
      try {
        return N.apply(this, arguments);
      } finally {
        m = T;
      }
    };
  };
})(os);
is.exports = os;
var Lc = is.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Rc = F, Se = Lc;
function x(e) {
  for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
  return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var us = /* @__PURE__ */ new Set(), On = {};
function Dt(e, t) {
  tn(e, t), tn(e + "Capture", t);
}
function tn(e, t) {
  for (On[e] = t, e = 0; e < t.length; e++) us.add(t[e]);
}
var Ye = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Jl = Object.prototype.hasOwnProperty, Oc = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, Bo = {}, Vo = {};
function Dc(e) {
  return Jl.call(Vo, e) ? !0 : Jl.call(Bo, e) ? !1 : Oc.test(e) ? Vo[e] = !0 : (Bo[e] = !0, !1);
}
function Mc(e, t, n, r) {
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
function Fc(e, t, n, r) {
  if (t === null || typeof t > "u" || Mc(e, t, n, r)) return !0;
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
var Gi = /[\-:]([a-z])/g;
function Yi(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
  var t = e.replace(
    Gi,
    Yi
  );
  ne[t] = new ce(t, 1, !1, e, null, !1, !1);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
  var t = e.replace(Gi, Yi);
  ne[t] = new ce(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
});
["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
  var t = e.replace(Gi, Yi);
  ne[t] = new ce(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function(e) {
  ne[e] = new ce(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
ne.xlinkHref = new ce("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);
["src", "href", "action", "formAction"].forEach(function(e) {
  ne[e] = new ce(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function Xi(e, t, n, r) {
  var l = ne.hasOwnProperty(t) ? ne[t] : null;
  (l !== null ? l.type !== 0 : r || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (Fc(t, n, l, r) && (n = null), r || l === null ? Dc(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n)) : l.mustUseProperty ? e[l.propertyName] = n === null ? l.type === 3 ? !1 : "" : n : (t = l.attributeName, r = l.attributeNamespace, n === null ? e.removeAttribute(t) : (l = l.type, n = l === 3 || l === 4 && n === !0 ? "" : "" + n, r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
var qe = Rc.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, ir = Symbol.for("react.element"), It = Symbol.for("react.portal"), $t = Symbol.for("react.fragment"), Zi = Symbol.for("react.strict_mode"), ql = Symbol.for("react.profiler"), ss = Symbol.for("react.provider"), as = Symbol.for("react.context"), Ji = Symbol.for("react.forward_ref"), bl = Symbol.for("react.suspense"), ei = Symbol.for("react.suspense_list"), qi = Symbol.for("react.memo"), et = Symbol.for("react.lazy"), cs = Symbol.for("react.offscreen"), Wo = Symbol.iterator;
function fn(e) {
  return e === null || typeof e != "object" ? null : (e = Wo && e[Wo] || e["@@iterator"], typeof e == "function" ? e : null);
}
var W = Object.assign, Cl;
function wn(e) {
  if (Cl === void 0) try {
    throw Error();
  } catch (n) {
    var t = n.stack.trim().match(/\n( *(at )?)/);
    Cl = t && t[1] || "";
  }
  return `
` + Cl + e;
}
var Nl = !1;
function jl(e, t) {
  if (!e || Nl) return "";
  Nl = !0;
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
`), o = l.length - 1, u = i.length - 1; 1 <= o && 0 <= u && l[o] !== i[u]; ) u--;
      for (; 1 <= o && 0 <= u; o--, u--) if (l[o] !== i[u]) {
        if (o !== 1 || u !== 1)
          do
            if (o--, u--, 0 > u || l[o] !== i[u]) {
              var s = `
` + l[o].replace(" at new ", " at ");
              return e.displayName && s.includes("<anonymous>") && (s = s.replace("<anonymous>", e.displayName)), s;
            }
          while (1 <= o && 0 <= u);
        break;
      }
    }
  } finally {
    Nl = !1, Error.prepareStackTrace = n;
  }
  return (e = e ? e.displayName || e.name : "") ? wn(e) : "";
}
function Ic(e) {
  switch (e.tag) {
    case 5:
      return wn(e.type);
    case 16:
      return wn("Lazy");
    case 13:
      return wn("Suspense");
    case 19:
      return wn("SuspenseList");
    case 0:
    case 2:
    case 15:
      return e = jl(e.type, !1), e;
    case 11:
      return e = jl(e.type.render, !1), e;
    case 1:
      return e = jl(e.type, !0), e;
    default:
      return "";
  }
}
function ti(e) {
  if (e == null) return null;
  if (typeof e == "function") return e.displayName || e.name || null;
  if (typeof e == "string") return e;
  switch (e) {
    case $t:
      return "Fragment";
    case It:
      return "Portal";
    case ql:
      return "Profiler";
    case Zi:
      return "StrictMode";
    case bl:
      return "Suspense";
    case ei:
      return "SuspenseList";
  }
  if (typeof e == "object") switch (e.$$typeof) {
    case as:
      return (e.displayName || "Context") + ".Consumer";
    case ss:
      return (e._context.displayName || "Context") + ".Provider";
    case Ji:
      var t = e.render;
      return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
    case qi:
      return t = e.displayName || null, t !== null ? t : ti(e.type) || "Memo";
    case et:
      t = e._payload, e = e._init;
      try {
        return ti(e(t));
      } catch {
      }
  }
  return null;
}
function $c(e) {
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
      return ti(t);
    case 8:
      return t === Zi ? "StrictMode" : "Mode";
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
function ht(e) {
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
function ds(e) {
  var t = e.type;
  return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
}
function Uc(e) {
  var t = ds(e) ? "checked" : "value", n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t), r = "" + e[t];
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
function or(e) {
  e._valueTracker || (e._valueTracker = Uc(e));
}
function fs(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(), r = "";
  return e && (r = ds(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n ? (t.setValue(e), !0) : !1;
}
function Dr(e) {
  if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function ni(e, t) {
  var n = t.checked;
  return W({}, t, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: n ?? e._wrapperState.initialChecked });
}
function Ho(e, t) {
  var n = t.defaultValue == null ? "" : t.defaultValue, r = t.checked != null ? t.checked : t.defaultChecked;
  n = ht(t.value != null ? t.value : n), e._wrapperState = { initialChecked: r, initialValue: n, controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null };
}
function ps(e, t) {
  t = t.checked, t != null && Xi(e, "checked", t, !1);
}
function ri(e, t) {
  ps(e, t);
  var n = ht(t.value), r = t.type;
  if (n != null) r === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + n) : e.value !== "" + n && (e.value = "" + n);
  else if (r === "submit" || r === "reset") {
    e.removeAttribute("value");
    return;
  }
  t.hasOwnProperty("value") ? li(e, t.type, n) : t.hasOwnProperty("defaultValue") && li(e, t.type, ht(t.defaultValue)), t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked);
}
function Qo(e, t, n) {
  if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
    var r = t.type;
    if (!(r !== "submit" && r !== "reset" || t.value !== void 0 && t.value !== null)) return;
    t = "" + e._wrapperState.initialValue, n || t === e.value || (e.value = t), e.defaultValue = t;
  }
  n = e.name, n !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, n !== "" && (e.name = n);
}
function li(e, t, n) {
  (t !== "number" || Dr(e.ownerDocument) !== e) && (n == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
}
var kn = Array.isArray;
function Xt(e, t, n, r) {
  if (e = e.options, t) {
    t = {};
    for (var l = 0; l < n.length; l++) t["$" + n[l]] = !0;
    for (n = 0; n < e.length; n++) l = t.hasOwnProperty("$" + e[n].value), e[n].selected !== l && (e[n].selected = l), l && r && (e[n].defaultSelected = !0);
  } else {
    for (n = "" + ht(n), t = null, l = 0; l < e.length; l++) {
      if (e[l].value === n) {
        e[l].selected = !0, r && (e[l].defaultSelected = !0);
        return;
      }
      t !== null || e[l].disabled || (t = e[l]);
    }
    t !== null && (t.selected = !0);
  }
}
function ii(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(x(91));
  return W({}, t, { value: void 0, defaultValue: void 0, children: "" + e._wrapperState.initialValue });
}
function Ko(e, t) {
  var n = t.value;
  if (n == null) {
    if (n = t.children, t = t.defaultValue, n != null) {
      if (t != null) throw Error(x(92));
      if (kn(n)) {
        if (1 < n.length) throw Error(x(93));
        n = n[0];
      }
      t = n;
    }
    t == null && (t = ""), n = t;
  }
  e._wrapperState = { initialValue: ht(n) };
}
function hs(e, t) {
  var n = ht(t.value), r = ht(t.defaultValue);
  n != null && (n = "" + n, n !== e.value && (e.value = n), t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)), r != null && (e.defaultValue = "" + r);
}
function Go(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
}
function ms(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function oi(e, t) {
  return e == null || e === "http://www.w3.org/1999/xhtml" ? ms(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e;
}
var ur, vs = function(e) {
  return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, n, r, l) {
    MSApp.execUnsafeLocalFunction(function() {
      return e(t, n, r, l);
    });
  } : e;
}(function(e, t) {
  if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e) e.innerHTML = t;
  else {
    for (ur = ur || document.createElement("div"), ur.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>", t = ur.firstChild; e.firstChild; ) e.removeChild(e.firstChild);
    for (; t.firstChild; ) e.appendChild(t.firstChild);
  }
});
function Dn(e, t) {
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
}, Ac = ["Webkit", "ms", "Moz", "O"];
Object.keys(En).forEach(function(e) {
  Ac.forEach(function(t) {
    t = t + e.charAt(0).toUpperCase() + e.substring(1), En[t] = En[e];
  });
});
function gs(e, t, n) {
  return t == null || typeof t == "boolean" || t === "" ? "" : n || typeof t != "number" || t === 0 || En.hasOwnProperty(e) && En[e] ? ("" + t).trim() : t + "px";
}
function ys(e, t) {
  e = e.style;
  for (var n in t) if (t.hasOwnProperty(n)) {
    var r = n.indexOf("--") === 0, l = gs(n, t[n], r);
    n === "float" && (n = "cssFloat"), r ? e.setProperty(n, l) : e[n] = l;
  }
}
var Bc = W({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
function ui(e, t) {
  if (t) {
    if (Bc[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(x(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(x(60));
      if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML)) throw Error(x(61));
    }
    if (t.style != null && typeof t.style != "object") throw Error(x(62));
  }
}
function si(e, t) {
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
var ai = null;
function bi(e) {
  return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
}
var ci = null, Zt = null, Jt = null;
function Yo(e) {
  if (e = bn(e)) {
    if (typeof ci != "function") throw Error(x(280));
    var t = e.stateNode;
    t && (t = al(t), ci(e.stateNode, e.type, t));
  }
}
function xs(e) {
  Zt ? Jt ? Jt.push(e) : Jt = [e] : Zt = e;
}
function ws() {
  if (Zt) {
    var e = Zt, t = Jt;
    if (Jt = Zt = null, Yo(e), t) for (e = 0; e < t.length; e++) Yo(t[e]);
  }
}
function ks(e, t) {
  return e(t);
}
function Ss() {
}
var zl = !1;
function _s(e, t, n) {
  if (zl) return e(t, n);
  zl = !0;
  try {
    return ks(e, t, n);
  } finally {
    zl = !1, (Zt !== null || Jt !== null) && (Ss(), ws());
  }
}
function Mn(e, t) {
  var n = e.stateNode;
  if (n === null) return null;
  var r = al(n);
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
  if (n && typeof n != "function") throw Error(x(231, t, typeof n));
  return n;
}
var di = !1;
if (Ye) try {
  var pn = {};
  Object.defineProperty(pn, "passive", { get: function() {
    di = !0;
  } }), window.addEventListener("test", pn, pn), window.removeEventListener("test", pn, pn);
} catch {
  di = !1;
}
function Vc(e, t, n, r, l, i, o, u, s) {
  var d = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, d);
  } catch (h) {
    this.onError(h);
  }
}
var Cn = !1, Mr = null, Fr = !1, fi = null, Wc = { onError: function(e) {
  Cn = !0, Mr = e;
} };
function Hc(e, t, n, r, l, i, o, u, s) {
  Cn = !1, Mr = null, Vc.apply(Wc, arguments);
}
function Qc(e, t, n, r, l, i, o, u, s) {
  if (Hc.apply(this, arguments), Cn) {
    if (Cn) {
      var d = Mr;
      Cn = !1, Mr = null;
    } else throw Error(x(198));
    Fr || (Fr = !0, fi = d);
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
function Es(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
  }
  return null;
}
function Xo(e) {
  if (Mt(e) !== e) throw Error(x(188));
}
function Kc(e) {
  var t = e.alternate;
  if (!t) {
    if (t = Mt(e), t === null) throw Error(x(188));
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
        if (i === n) return Xo(l), e;
        if (i === r) return Xo(l), t;
        i = i.sibling;
      }
      throw Error(x(188));
    }
    if (n.return !== r.return) n = l, r = i;
    else {
      for (var o = !1, u = l.child; u; ) {
        if (u === n) {
          o = !0, n = l, r = i;
          break;
        }
        if (u === r) {
          o = !0, r = l, n = i;
          break;
        }
        u = u.sibling;
      }
      if (!o) {
        for (u = i.child; u; ) {
          if (u === n) {
            o = !0, n = i, r = l;
            break;
          }
          if (u === r) {
            o = !0, r = i, n = l;
            break;
          }
          u = u.sibling;
        }
        if (!o) throw Error(x(189));
      }
    }
    if (n.alternate !== r) throw Error(x(190));
  }
  if (n.tag !== 3) throw Error(x(188));
  return n.stateNode.current === n ? e : t;
}
function Cs(e) {
  return e = Kc(e), e !== null ? Ns(e) : null;
}
function Ns(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var t = Ns(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var js = Se.unstable_scheduleCallback, Zo = Se.unstable_cancelCallback, Gc = Se.unstable_shouldYield, Yc = Se.unstable_requestPaint, G = Se.unstable_now, Xc = Se.unstable_getCurrentPriorityLevel, eo = Se.unstable_ImmediatePriority, zs = Se.unstable_UserBlockingPriority, Ir = Se.unstable_NormalPriority, Zc = Se.unstable_LowPriority, Ps = Se.unstable_IdlePriority, il = null, Be = null;
function Jc(e) {
  if (Be && typeof Be.onCommitFiberRoot == "function") try {
    Be.onCommitFiberRoot(il, e, void 0, (e.current.flags & 128) === 128);
  } catch {
  }
}
var Me = Math.clz32 ? Math.clz32 : ed, qc = Math.log, bc = Math.LN2;
function ed(e) {
  return e >>>= 0, e === 0 ? 32 : 31 - (qc(e) / bc | 0) | 0;
}
var sr = 64, ar = 4194304;
function Sn(e) {
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
function $r(e, t) {
  var n = e.pendingLanes;
  if (n === 0) return 0;
  var r = 0, l = e.suspendedLanes, i = e.pingedLanes, o = n & 268435455;
  if (o !== 0) {
    var u = o & ~l;
    u !== 0 ? r = Sn(u) : (i &= o, i !== 0 && (r = Sn(i)));
  } else o = n & ~l, o !== 0 ? r = Sn(o) : i !== 0 && (r = Sn(i));
  if (r === 0) return 0;
  if (t !== 0 && t !== r && !(t & l) && (l = r & -r, i = t & -t, l >= i || l === 16 && (i & 4194240) !== 0)) return t;
  if (r & 4 && (r |= n & 16), t = e.entangledLanes, t !== 0) for (e = e.entanglements, t &= r; 0 < t; ) n = 31 - Me(t), l = 1 << n, r |= e[n], t &= ~l;
  return r;
}
function td(e, t) {
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
function nd(e, t) {
  for (var n = e.suspendedLanes, r = e.pingedLanes, l = e.expirationTimes, i = e.pendingLanes; 0 < i; ) {
    var o = 31 - Me(i), u = 1 << o, s = l[o];
    s === -1 ? (!(u & n) || u & r) && (l[o] = td(u, t)) : s <= t && (e.expiredLanes |= u), i &= ~u;
  }
}
function pi(e) {
  return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
}
function Ts() {
  var e = sr;
  return sr <<= 1, !(sr & 4194240) && (sr = 64), e;
}
function Pl(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t;
}
function Jn(e, t, n) {
  e.pendingLanes |= t, t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, t = 31 - Me(t), e[t] = n;
}
function rd(e, t) {
  var n = e.pendingLanes & ~t;
  e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
  var r = e.eventTimes;
  for (e = e.expirationTimes; 0 < n; ) {
    var l = 31 - Me(n), i = 1 << l;
    t[l] = 0, r[l] = -1, e[l] = -1, n &= ~i;
  }
}
function to(e, t) {
  var n = e.entangledLanes |= t;
  for (e = e.entanglements; n; ) {
    var r = 31 - Me(n), l = 1 << r;
    l & t | e[r] & t && (e[r] |= t), n &= ~l;
  }
}
var M = 0;
function Ls(e) {
  return e &= -e, 1 < e ? 4 < e ? e & 268435455 ? 16 : 536870912 : 4 : 1;
}
var Rs, no, Os, Ds, Ms, hi = !1, cr = [], ot = null, ut = null, st = null, Fn = /* @__PURE__ */ new Map(), In = /* @__PURE__ */ new Map(), nt = [], ld = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function Jo(e, t) {
  switch (e) {
    case "focusin":
    case "focusout":
      ot = null;
      break;
    case "dragenter":
    case "dragleave":
      ut = null;
      break;
    case "mouseover":
    case "mouseout":
      st = null;
      break;
    case "pointerover":
    case "pointerout":
      Fn.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      In.delete(t.pointerId);
  }
}
function hn(e, t, n, r, l, i) {
  return e === null || e.nativeEvent !== i ? (e = { blockedOn: t, domEventName: n, eventSystemFlags: r, nativeEvent: i, targetContainers: [l] }, t !== null && (t = bn(t), t !== null && no(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, l !== null && t.indexOf(l) === -1 && t.push(l), e);
}
function id(e, t, n, r, l) {
  switch (t) {
    case "focusin":
      return ot = hn(ot, e, t, n, r, l), !0;
    case "dragenter":
      return ut = hn(ut, e, t, n, r, l), !0;
    case "mouseover":
      return st = hn(st, e, t, n, r, l), !0;
    case "pointerover":
      var i = l.pointerId;
      return Fn.set(i, hn(Fn.get(i) || null, e, t, n, r, l)), !0;
    case "gotpointercapture":
      return i = l.pointerId, In.set(i, hn(In.get(i) || null, e, t, n, r, l)), !0;
  }
  return !1;
}
function Fs(e) {
  var t = Et(e.target);
  if (t !== null) {
    var n = Mt(t);
    if (n !== null) {
      if (t = n.tag, t === 13) {
        if (t = Es(n), t !== null) {
          e.blockedOn = t, Ms(e.priority, function() {
            Os(n);
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
function _r(e) {
  if (e.blockedOn !== null) return !1;
  for (var t = e.targetContainers; 0 < t.length; ) {
    var n = mi(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var r = new n.constructor(n.type, n);
      ai = r, n.target.dispatchEvent(r), ai = null;
    } else return t = bn(n), t !== null && no(t), e.blockedOn = n, !1;
    t.shift();
  }
  return !0;
}
function qo(e, t, n) {
  _r(e) && n.delete(t);
}
function od() {
  hi = !1, ot !== null && _r(ot) && (ot = null), ut !== null && _r(ut) && (ut = null), st !== null && _r(st) && (st = null), Fn.forEach(qo), In.forEach(qo);
}
function mn(e, t) {
  e.blockedOn === t && (e.blockedOn = null, hi || (hi = !0, Se.unstable_scheduleCallback(Se.unstable_NormalPriority, od)));
}
function $n(e) {
  function t(l) {
    return mn(l, e);
  }
  if (0 < cr.length) {
    mn(cr[0], e);
    for (var n = 1; n < cr.length; n++) {
      var r = cr[n];
      r.blockedOn === e && (r.blockedOn = null);
    }
  }
  for (ot !== null && mn(ot, e), ut !== null && mn(ut, e), st !== null && mn(st, e), Fn.forEach(t), In.forEach(t), n = 0; n < nt.length; n++) r = nt[n], r.blockedOn === e && (r.blockedOn = null);
  for (; 0 < nt.length && (n = nt[0], n.blockedOn === null); ) Fs(n), n.blockedOn === null && nt.shift();
}
var qt = qe.ReactCurrentBatchConfig, Ur = !0;
function ud(e, t, n, r) {
  var l = M, i = qt.transition;
  qt.transition = null;
  try {
    M = 1, ro(e, t, n, r);
  } finally {
    M = l, qt.transition = i;
  }
}
function sd(e, t, n, r) {
  var l = M, i = qt.transition;
  qt.transition = null;
  try {
    M = 4, ro(e, t, n, r);
  } finally {
    M = l, qt.transition = i;
  }
}
function ro(e, t, n, r) {
  if (Ur) {
    var l = mi(e, t, n, r);
    if (l === null) Ul(e, t, r, Ar, n), Jo(e, r);
    else if (id(l, e, t, n, r)) r.stopPropagation();
    else if (Jo(e, r), t & 4 && -1 < ld.indexOf(e)) {
      for (; l !== null; ) {
        var i = bn(l);
        if (i !== null && Rs(i), i = mi(e, t, n, r), i === null && Ul(e, t, r, Ar, n), i === l) break;
        l = i;
      }
      l !== null && r.stopPropagation();
    } else Ul(e, t, r, null, n);
  }
}
var Ar = null;
function mi(e, t, n, r) {
  if (Ar = null, e = bi(r), e = Et(e), e !== null) if (t = Mt(e), t === null) e = null;
  else if (n = t.tag, n === 13) {
    if (e = Es(t), e !== null) return e;
    e = null;
  } else if (n === 3) {
    if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
    e = null;
  } else t !== e && (e = null);
  return Ar = e, null;
}
function Is(e) {
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
      switch (Xc()) {
        case eo:
          return 1;
        case zs:
          return 4;
        case Ir:
        case Zc:
          return 16;
        case Ps:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var lt = null, lo = null, Er = null;
function $s() {
  if (Er) return Er;
  var e, t = lo, n = t.length, r, l = "value" in lt ? lt.value : lt.textContent, i = l.length;
  for (e = 0; e < n && t[e] === l[e]; e++) ;
  var o = n - e;
  for (r = 1; r <= o && t[n - r] === l[i - r]; r++) ;
  return Er = l.slice(e, 1 < r ? 1 - r : void 0);
}
function Cr(e) {
  var t = e.keyCode;
  return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
}
function dr() {
  return !0;
}
function bo() {
  return !1;
}
function Ee(e) {
  function t(n, r, l, i, o) {
    this._reactName = n, this._targetInst = l, this.type = r, this.nativeEvent = i, this.target = o, this.currentTarget = null;
    for (var u in e) e.hasOwnProperty(u) && (n = e[u], this[u] = n ? n(i) : i[u]);
    return this.isDefaultPrevented = (i.defaultPrevented != null ? i.defaultPrevented : i.returnValue === !1) ? dr : bo, this.isPropagationStopped = bo, this;
  }
  return W(t.prototype, { preventDefault: function() {
    this.defaultPrevented = !0;
    var n = this.nativeEvent;
    n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = dr);
  }, stopPropagation: function() {
    var n = this.nativeEvent;
    n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = dr);
  }, persist: function() {
  }, isPersistent: dr }), t;
}
var cn = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(e) {
  return e.timeStamp || Date.now();
}, defaultPrevented: 0, isTrusted: 0 }, io = Ee(cn), qn = W({}, cn, { view: 0, detail: 0 }), ad = Ee(qn), Tl, Ll, vn, ol = W({}, qn, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: oo, button: 0, buttons: 0, relatedTarget: function(e) {
  return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
}, movementX: function(e) {
  return "movementX" in e ? e.movementX : (e !== vn && (vn && e.type === "mousemove" ? (Tl = e.screenX - vn.screenX, Ll = e.screenY - vn.screenY) : Ll = Tl = 0, vn = e), Tl);
}, movementY: function(e) {
  return "movementY" in e ? e.movementY : Ll;
} }), eu = Ee(ol), cd = W({}, ol, { dataTransfer: 0 }), dd = Ee(cd), fd = W({}, qn, { relatedTarget: 0 }), Rl = Ee(fd), pd = W({}, cn, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), hd = Ee(pd), md = W({}, cn, { clipboardData: function(e) {
  return "clipboardData" in e ? e.clipboardData : window.clipboardData;
} }), vd = Ee(md), gd = W({}, cn, { data: 0 }), tu = Ee(gd), yd = {
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
}, xd = {
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
}, wd = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function kd(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = wd[e]) ? !!t[e] : !1;
}
function oo() {
  return kd;
}
var Sd = W({}, qn, { key: function(e) {
  if (e.key) {
    var t = yd[e.key] || e.key;
    if (t !== "Unidentified") return t;
  }
  return e.type === "keypress" ? (e = Cr(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? xd[e.keyCode] || "Unidentified" : "";
}, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: oo, charCode: function(e) {
  return e.type === "keypress" ? Cr(e) : 0;
}, keyCode: function(e) {
  return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
}, which: function(e) {
  return e.type === "keypress" ? Cr(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
} }), _d = Ee(Sd), Ed = W({}, ol, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), nu = Ee(Ed), Cd = W({}, qn, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: oo }), Nd = Ee(Cd), jd = W({}, cn, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), zd = Ee(jd), Pd = W({}, ol, {
  deltaX: function(e) {
    return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
  },
  deltaY: function(e) {
    return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), Td = Ee(Pd), Ld = [9, 13, 27, 32], uo = Ye && "CompositionEvent" in window, Nn = null;
Ye && "documentMode" in document && (Nn = document.documentMode);
var Rd = Ye && "TextEvent" in window && !Nn, Us = Ye && (!uo || Nn && 8 < Nn && 11 >= Nn), ru = " ", lu = !1;
function As(e, t) {
  switch (e) {
    case "keyup":
      return Ld.indexOf(t.keyCode) !== -1;
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
function Bs(e) {
  return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
}
var Ut = !1;
function Od(e, t) {
  switch (e) {
    case "compositionend":
      return Bs(t);
    case "keypress":
      return t.which !== 32 ? null : (lu = !0, ru);
    case "textInput":
      return e = t.data, e === ru && lu ? null : e;
    default:
      return null;
  }
}
function Dd(e, t) {
  if (Ut) return e === "compositionend" || !uo && As(e, t) ? (e = $s(), Er = lo = lt = null, Ut = !1, e) : null;
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
      return Us && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var Md = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
function iu(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!Md[e.type] : t === "textarea";
}
function Vs(e, t, n, r) {
  xs(r), t = Br(t, "onChange"), 0 < t.length && (n = new io("onChange", "change", null, n, r), e.push({ event: n, listeners: t }));
}
var jn = null, Un = null;
function Fd(e) {
  bs(e, 0);
}
function ul(e) {
  var t = Vt(e);
  if (fs(t)) return e;
}
function Id(e, t) {
  if (e === "change") return t;
}
var Ws = !1;
if (Ye) {
  var Ol;
  if (Ye) {
    var Dl = "oninput" in document;
    if (!Dl) {
      var ou = document.createElement("div");
      ou.setAttribute("oninput", "return;"), Dl = typeof ou.oninput == "function";
    }
    Ol = Dl;
  } else Ol = !1;
  Ws = Ol && (!document.documentMode || 9 < document.documentMode);
}
function uu() {
  jn && (jn.detachEvent("onpropertychange", Hs), Un = jn = null);
}
function Hs(e) {
  if (e.propertyName === "value" && ul(Un)) {
    var t = [];
    Vs(t, Un, e, bi(e)), _s(Fd, t);
  }
}
function $d(e, t, n) {
  e === "focusin" ? (uu(), jn = t, Un = n, jn.attachEvent("onpropertychange", Hs)) : e === "focusout" && uu();
}
function Ud(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown") return ul(Un);
}
function Ad(e, t) {
  if (e === "click") return ul(t);
}
function Bd(e, t) {
  if (e === "input" || e === "change") return ul(t);
}
function Vd(e, t) {
  return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
}
var Ie = typeof Object.is == "function" ? Object.is : Vd;
function An(e, t) {
  if (Ie(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null) return !1;
  var n = Object.keys(e), r = Object.keys(t);
  if (n.length !== r.length) return !1;
  for (r = 0; r < n.length; r++) {
    var l = n[r];
    if (!Jl.call(t, l) || !Ie(e[l], t[l])) return !1;
  }
  return !0;
}
function su(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function au(e, t) {
  var n = su(e);
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
    n = su(n);
  }
}
function Qs(e, t) {
  return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Qs(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
}
function Ks() {
  for (var e = window, t = Dr(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var n = typeof t.contentWindow.location.href == "string";
    } catch {
      n = !1;
    }
    if (n) e = t.contentWindow;
    else break;
    t = Dr(e.document);
  }
  return t;
}
function so(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
}
function Wd(e) {
  var t = Ks(), n = e.focusedElem, r = e.selectionRange;
  if (t !== n && n && n.ownerDocument && Qs(n.ownerDocument.documentElement, n)) {
    if (r !== null && so(n)) {
      if (t = r.start, e = r.end, e === void 0 && (e = t), "selectionStart" in n) n.selectionStart = t, n.selectionEnd = Math.min(e, n.value.length);
      else if (e = (t = n.ownerDocument || document) && t.defaultView || window, e.getSelection) {
        e = e.getSelection();
        var l = n.textContent.length, i = Math.min(r.start, l);
        r = r.end === void 0 ? i : Math.min(r.end, l), !e.extend && i > r && (l = r, r = i, i = l), l = au(n, i);
        var o = au(
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
var Hd = Ye && "documentMode" in document && 11 >= document.documentMode, At = null, vi = null, zn = null, gi = !1;
function cu(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  gi || At == null || At !== Dr(r) || (r = At, "selectionStart" in r && so(r) ? r = { start: r.selectionStart, end: r.selectionEnd } : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = { anchorNode: r.anchorNode, anchorOffset: r.anchorOffset, focusNode: r.focusNode, focusOffset: r.focusOffset }), zn && An(zn, r) || (zn = r, r = Br(vi, "onSelect"), 0 < r.length && (t = new io("onSelect", "select", null, t, n), e.push({ event: t, listeners: r }), t.target = At)));
}
function fr(e, t) {
  var n = {};
  return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
}
var Bt = { animationend: fr("Animation", "AnimationEnd"), animationiteration: fr("Animation", "AnimationIteration"), animationstart: fr("Animation", "AnimationStart"), transitionend: fr("Transition", "TransitionEnd") }, Ml = {}, Gs = {};
Ye && (Gs = document.createElement("div").style, "AnimationEvent" in window || (delete Bt.animationend.animation, delete Bt.animationiteration.animation, delete Bt.animationstart.animation), "TransitionEvent" in window || delete Bt.transitionend.transition);
function sl(e) {
  if (Ml[e]) return Ml[e];
  if (!Bt[e]) return e;
  var t = Bt[e], n;
  for (n in t) if (t.hasOwnProperty(n) && n in Gs) return Ml[e] = t[n];
  return e;
}
var Ys = sl("animationend"), Xs = sl("animationiteration"), Zs = sl("animationstart"), Js = sl("transitionend"), qs = /* @__PURE__ */ new Map(), du = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function vt(e, t) {
  qs.set(e, t), Dt(t, [e]);
}
for (var Fl = 0; Fl < du.length; Fl++) {
  var Il = du[Fl], Qd = Il.toLowerCase(), Kd = Il[0].toUpperCase() + Il.slice(1);
  vt(Qd, "on" + Kd);
}
vt(Ys, "onAnimationEnd");
vt(Xs, "onAnimationIteration");
vt(Zs, "onAnimationStart");
vt("dblclick", "onDoubleClick");
vt("focusin", "onFocus");
vt("focusout", "onBlur");
vt(Js, "onTransitionEnd");
tn("onMouseEnter", ["mouseout", "mouseover"]);
tn("onMouseLeave", ["mouseout", "mouseover"]);
tn("onPointerEnter", ["pointerout", "pointerover"]);
tn("onPointerLeave", ["pointerout", "pointerover"]);
Dt("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
Dt("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
Dt("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
Dt("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
Dt("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
Dt("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var _n = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), Gd = new Set("cancel close invalid load scroll toggle".split(" ").concat(_n));
function fu(e, t, n) {
  var r = e.type || "unknown-event";
  e.currentTarget = n, Qc(r, t, void 0, e), e.currentTarget = null;
}
function bs(e, t) {
  t = (t & 4) !== 0;
  for (var n = 0; n < e.length; n++) {
    var r = e[n], l = r.event;
    r = r.listeners;
    e: {
      var i = void 0;
      if (t) for (var o = r.length - 1; 0 <= o; o--) {
        var u = r[o], s = u.instance, d = u.currentTarget;
        if (u = u.listener, s !== i && l.isPropagationStopped()) break e;
        fu(l, u, d), i = s;
      }
      else for (o = 0; o < r.length; o++) {
        if (u = r[o], s = u.instance, d = u.currentTarget, u = u.listener, s !== i && l.isPropagationStopped()) break e;
        fu(l, u, d), i = s;
      }
    }
  }
  if (Fr) throw e = fi, Fr = !1, fi = null, e;
}
function $(e, t) {
  var n = t[Si];
  n === void 0 && (n = t[Si] = /* @__PURE__ */ new Set());
  var r = e + "__bubble";
  n.has(r) || (ea(t, e, 2, !1), n.add(r));
}
function $l(e, t, n) {
  var r = 0;
  t && (r |= 4), ea(n, e, r, t);
}
var pr = "_reactListening" + Math.random().toString(36).slice(2);
function Bn(e) {
  if (!e[pr]) {
    e[pr] = !0, us.forEach(function(n) {
      n !== "selectionchange" && (Gd.has(n) || $l(n, !1, e), $l(n, !0, e));
    });
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[pr] || (t[pr] = !0, $l("selectionchange", !1, t));
  }
}
function ea(e, t, n, r) {
  switch (Is(t)) {
    case 1:
      var l = ud;
      break;
    case 4:
      l = sd;
      break;
    default:
      l = ro;
  }
  n = l.bind(null, t, n, e), l = void 0, !di || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (l = !0), r ? l !== void 0 ? e.addEventListener(t, n, { capture: !0, passive: l }) : e.addEventListener(t, n, !0) : l !== void 0 ? e.addEventListener(t, n, { passive: l }) : e.addEventListener(t, n, !1);
}
function Ul(e, t, n, r, l) {
  var i = r;
  if (!(t & 1) && !(t & 2) && r !== null) e: for (; ; ) {
    if (r === null) return;
    var o = r.tag;
    if (o === 3 || o === 4) {
      var u = r.stateNode.containerInfo;
      if (u === l || u.nodeType === 8 && u.parentNode === l) break;
      if (o === 4) for (o = r.return; o !== null; ) {
        var s = o.tag;
        if ((s === 3 || s === 4) && (s = o.stateNode.containerInfo, s === l || s.nodeType === 8 && s.parentNode === l)) return;
        o = o.return;
      }
      for (; u !== null; ) {
        if (o = Et(u), o === null) return;
        if (s = o.tag, s === 5 || s === 6) {
          r = i = o;
          continue e;
        }
        u = u.parentNode;
      }
    }
    r = r.return;
  }
  _s(function() {
    var d = i, h = bi(n), g = [];
    e: {
      var m = qs.get(e);
      if (m !== void 0) {
        var k = io, S = e;
        switch (e) {
          case "keypress":
            if (Cr(n) === 0) break e;
          case "keydown":
          case "keyup":
            k = _d;
            break;
          case "focusin":
            S = "focus", k = Rl;
            break;
          case "focusout":
            S = "blur", k = Rl;
            break;
          case "beforeblur":
          case "afterblur":
            k = Rl;
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
            k = eu;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            k = dd;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            k = Nd;
            break;
          case Ys:
          case Xs:
          case Zs:
            k = hd;
            break;
          case Js:
            k = zd;
            break;
          case "scroll":
            k = ad;
            break;
          case "wheel":
            k = Td;
            break;
          case "copy":
          case "cut":
          case "paste":
            k = vd;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            k = nu;
        }
        var _ = (t & 4) !== 0, L = !_ && e === "scroll", f = _ ? m !== null ? m + "Capture" : null : m;
        _ = [];
        for (var c = d, a; c !== null; ) {
          a = c;
          var v = a.stateNode;
          if (a.tag === 5 && v !== null && (a = v, f !== null && (v = Mn(c, f), v != null && _.push(Vn(c, v, a)))), L) break;
          c = c.return;
        }
        0 < _.length && (m = new k(m, S, null, n, h), g.push({ event: m, listeners: _ }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (m = e === "mouseover" || e === "pointerover", k = e === "mouseout" || e === "pointerout", m && n !== ai && (S = n.relatedTarget || n.fromElement) && (Et(S) || S[Xe])) break e;
        if ((k || m) && (m = h.window === h ? h : (m = h.ownerDocument) ? m.defaultView || m.parentWindow : window, k ? (S = n.relatedTarget || n.toElement, k = d, S = S ? Et(S) : null, S !== null && (L = Mt(S), S !== L || S.tag !== 5 && S.tag !== 6) && (S = null)) : (k = null, S = d), k !== S)) {
          if (_ = eu, v = "onMouseLeave", f = "onMouseEnter", c = "mouse", (e === "pointerout" || e === "pointerover") && (_ = nu, v = "onPointerLeave", f = "onPointerEnter", c = "pointer"), L = k == null ? m : Vt(k), a = S == null ? m : Vt(S), m = new _(v, c + "leave", k, n, h), m.target = L, m.relatedTarget = a, v = null, Et(h) === d && (_ = new _(f, c + "enter", S, n, h), _.target = a, _.relatedTarget = L, v = _), L = v, k && S) t: {
            for (_ = k, f = S, c = 0, a = _; a; a = Ft(a)) c++;
            for (a = 0, v = f; v; v = Ft(v)) a++;
            for (; 0 < c - a; ) _ = Ft(_), c--;
            for (; 0 < a - c; ) f = Ft(f), a--;
            for (; c--; ) {
              if (_ === f || f !== null && _ === f.alternate) break t;
              _ = Ft(_), f = Ft(f);
            }
            _ = null;
          }
          else _ = null;
          k !== null && pu(g, m, k, _, !1), S !== null && L !== null && pu(g, L, S, _, !0);
        }
      }
      e: {
        if (m = d ? Vt(d) : window, k = m.nodeName && m.nodeName.toLowerCase(), k === "select" || k === "input" && m.type === "file") var w = Id;
        else if (iu(m)) if (Ws) w = Bd;
        else {
          w = Ud;
          var j = $d;
        }
        else (k = m.nodeName) && k.toLowerCase() === "input" && (m.type === "checkbox" || m.type === "radio") && (w = Ad);
        if (w && (w = w(e, d))) {
          Vs(g, w, n, h);
          break e;
        }
        j && j(e, m, d), e === "focusout" && (j = m._wrapperState) && j.controlled && m.type === "number" && li(m, "number", m.value);
      }
      switch (j = d ? Vt(d) : window, e) {
        case "focusin":
          (iu(j) || j.contentEditable === "true") && (At = j, vi = d, zn = null);
          break;
        case "focusout":
          zn = vi = At = null;
          break;
        case "mousedown":
          gi = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          gi = !1, cu(g, n, h);
          break;
        case "selectionchange":
          if (Hd) break;
        case "keydown":
        case "keyup":
          cu(g, n, h);
      }
      var y;
      if (uo) e: {
        switch (e) {
          case "compositionstart":
            var E = "onCompositionStart";
            break e;
          case "compositionend":
            E = "onCompositionEnd";
            break e;
          case "compositionupdate":
            E = "onCompositionUpdate";
            break e;
        }
        E = void 0;
      }
      else Ut ? As(e, n) && (E = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (E = "onCompositionStart");
      E && (Us && n.locale !== "ko" && (Ut || E !== "onCompositionStart" ? E === "onCompositionEnd" && Ut && (y = $s()) : (lt = h, lo = "value" in lt ? lt.value : lt.textContent, Ut = !0)), j = Br(d, E), 0 < j.length && (E = new tu(E, e, null, n, h), g.push({ event: E, listeners: j }), y ? E.data = y : (y = Bs(n), y !== null && (E.data = y)))), (y = Rd ? Od(e, n) : Dd(e, n)) && (d = Br(d, "onBeforeInput"), 0 < d.length && (h = new tu("onBeforeInput", "beforeinput", null, n, h), g.push({ event: h, listeners: d }), h.data = y));
    }
    bs(g, t);
  });
}
function Vn(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function Br(e, t) {
  for (var n = t + "Capture", r = []; e !== null; ) {
    var l = e, i = l.stateNode;
    l.tag === 5 && i !== null && (l = i, i = Mn(e, n), i != null && r.unshift(Vn(e, i, l)), i = Mn(e, t), i != null && r.push(Vn(e, i, l))), e = e.return;
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
function pu(e, t, n, r, l) {
  for (var i = t._reactName, o = []; n !== null && n !== r; ) {
    var u = n, s = u.alternate, d = u.stateNode;
    if (s !== null && s === r) break;
    u.tag === 5 && d !== null && (u = d, l ? (s = Mn(n, i), s != null && o.unshift(Vn(n, s, u))) : l || (s = Mn(n, i), s != null && o.push(Vn(n, s, u)))), n = n.return;
  }
  o.length !== 0 && e.push({ event: t, listeners: o });
}
var Yd = /\r\n?/g, Xd = /\u0000|\uFFFD/g;
function hu(e) {
  return (typeof e == "string" ? e : "" + e).replace(Yd, `
`).replace(Xd, "");
}
function hr(e, t, n) {
  if (t = hu(t), hu(e) !== t && n) throw Error(x(425));
}
function Vr() {
}
var yi = null, xi = null;
function wi(e, t) {
  return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
}
var ki = typeof setTimeout == "function" ? setTimeout : void 0, Zd = typeof clearTimeout == "function" ? clearTimeout : void 0, mu = typeof Promise == "function" ? Promise : void 0, Jd = typeof queueMicrotask == "function" ? queueMicrotask : typeof mu < "u" ? function(e) {
  return mu.resolve(null).then(e).catch(qd);
} : ki;
function qd(e) {
  setTimeout(function() {
    throw e;
  });
}
function Al(e, t) {
  var n = t, r = 0;
  do {
    var l = n.nextSibling;
    if (e.removeChild(n), l && l.nodeType === 8) if (n = l.data, n === "/$") {
      if (r === 0) {
        e.removeChild(l), $n(t);
        return;
      }
      r--;
    } else n !== "$" && n !== "$?" && n !== "$!" || r++;
    n = l;
  } while (n);
  $n(t);
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
function vu(e) {
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
var dn = Math.random().toString(36).slice(2), Ae = "__reactFiber$" + dn, Wn = "__reactProps$" + dn, Xe = "__reactContainer$" + dn, Si = "__reactEvents$" + dn, bd = "__reactListeners$" + dn, ef = "__reactHandles$" + dn;
function Et(e) {
  var t = e[Ae];
  if (t) return t;
  for (var n = e.parentNode; n; ) {
    if (t = n[Xe] || n[Ae]) {
      if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = vu(e); e !== null; ) {
        if (n = e[Ae]) return n;
        e = vu(e);
      }
      return t;
    }
    e = n, n = e.parentNode;
  }
  return null;
}
function bn(e) {
  return e = e[Ae] || e[Xe], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e;
}
function Vt(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(x(33));
}
function al(e) {
  return e[Wn] || null;
}
var _i = [], Wt = -1;
function gt(e) {
  return { current: e };
}
function U(e) {
  0 > Wt || (e.current = _i[Wt], _i[Wt] = null, Wt--);
}
function I(e, t) {
  Wt++, _i[Wt] = e.current, e.current = t;
}
var mt = {}, oe = gt(mt), me = gt(!1), Pt = mt;
function nn(e, t) {
  var n = e.type.contextTypes;
  if (!n) return mt;
  var r = e.stateNode;
  if (r && r.__reactInternalMemoizedUnmaskedChildContext === t) return r.__reactInternalMemoizedMaskedChildContext;
  var l = {}, i;
  for (i in n) l[i] = t[i];
  return r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = t, e.__reactInternalMemoizedMaskedChildContext = l), l;
}
function ve(e) {
  return e = e.childContextTypes, e != null;
}
function Wr() {
  U(me), U(oe);
}
function gu(e, t, n) {
  if (oe.current !== mt) throw Error(x(168));
  I(oe, t), I(me, n);
}
function ta(e, t, n) {
  var r = e.stateNode;
  if (t = t.childContextTypes, typeof r.getChildContext != "function") return n;
  r = r.getChildContext();
  for (var l in r) if (!(l in t)) throw Error(x(108, $c(e) || "Unknown", l));
  return W({}, n, r);
}
function Hr(e) {
  return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || mt, Pt = oe.current, I(oe, e), I(me, me.current), !0;
}
function yu(e, t, n) {
  var r = e.stateNode;
  if (!r) throw Error(x(169));
  n ? (e = ta(e, t, Pt), r.__reactInternalMemoizedMergedChildContext = e, U(me), U(oe), I(oe, e)) : U(me), I(me, n);
}
var He = null, cl = !1, Bl = !1;
function na(e) {
  He === null ? He = [e] : He.push(e);
}
function tf(e) {
  cl = !0, na(e);
}
function yt() {
  if (!Bl && He !== null) {
    Bl = !0;
    var e = 0, t = M;
    try {
      var n = He;
      for (M = 1; e < n.length; e++) {
        var r = n[e];
        do
          r = r(!0);
        while (r !== null);
      }
      He = null, cl = !1;
    } catch (l) {
      throw He !== null && (He = He.slice(e + 1)), js(eo, yt), l;
    } finally {
      M = t, Bl = !1;
    }
  }
  return null;
}
var Ht = [], Qt = 0, Qr = null, Kr = 0, Ce = [], Ne = 0, Tt = null, Qe = 1, Ke = "";
function St(e, t) {
  Ht[Qt++] = Kr, Ht[Qt++] = Qr, Qr = e, Kr = t;
}
function ra(e, t, n) {
  Ce[Ne++] = Qe, Ce[Ne++] = Ke, Ce[Ne++] = Tt, Tt = e;
  var r = Qe;
  e = Ke;
  var l = 32 - Me(r) - 1;
  r &= ~(1 << l), n += 1;
  var i = 32 - Me(t) + l;
  if (30 < i) {
    var o = l - l % 5;
    i = (r & (1 << o) - 1).toString(32), r >>= o, l -= o, Qe = 1 << 32 - Me(t) + l | n << l | r, Ke = i + e;
  } else Qe = 1 << i | n << l | r, Ke = e;
}
function ao(e) {
  e.return !== null && (St(e, 1), ra(e, 1, 0));
}
function co(e) {
  for (; e === Qr; ) Qr = Ht[--Qt], Ht[Qt] = null, Kr = Ht[--Qt], Ht[Qt] = null;
  for (; e === Tt; ) Tt = Ce[--Ne], Ce[Ne] = null, Ke = Ce[--Ne], Ce[Ne] = null, Qe = Ce[--Ne], Ce[Ne] = null;
}
var ke = null, we = null, A = !1, De = null;
function la(e, t) {
  var n = je(5, null, null, 0);
  n.elementType = "DELETED", n.stateNode = t, n.return = e, t = e.deletions, t === null ? (e.deletions = [n], e.flags |= 16) : t.push(n);
}
function xu(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t, t !== null ? (e.stateNode = t, ke = e, we = at(t.firstChild), !0) : !1;
    case 6:
      return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t, t !== null ? (e.stateNode = t, ke = e, we = null, !0) : !1;
    case 13:
      return t = t.nodeType !== 8 ? null : t, t !== null ? (n = Tt !== null ? { id: Qe, overflow: Ke } : null, e.memoizedState = { dehydrated: t, treeContext: n, retryLane: 1073741824 }, n = je(18, null, null, 0), n.stateNode = t, n.return = e, e.child = n, ke = e, we = null, !0) : !1;
    default:
      return !1;
  }
}
function Ei(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function Ci(e) {
  if (A) {
    var t = we;
    if (t) {
      var n = t;
      if (!xu(e, t)) {
        if (Ei(e)) throw Error(x(418));
        t = at(n.nextSibling);
        var r = ke;
        t && xu(e, t) ? la(r, n) : (e.flags = e.flags & -4097 | 2, A = !1, ke = e);
      }
    } else {
      if (Ei(e)) throw Error(x(418));
      e.flags = e.flags & -4097 | 2, A = !1, ke = e;
    }
  }
}
function wu(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; ) e = e.return;
  ke = e;
}
function mr(e) {
  if (e !== ke) return !1;
  if (!A) return wu(e), A = !0, !1;
  var t;
  if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !wi(e.type, e.memoizedProps)), t && (t = we)) {
    if (Ei(e)) throw ia(), Error(x(418));
    for (; t; ) la(e, t), t = at(t.nextSibling);
  }
  if (wu(e), e.tag === 13) {
    if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(x(317));
    e: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === "/$") {
            if (t === 0) {
              we = at(e.nextSibling);
              break e;
            }
            t--;
          } else n !== "$" && n !== "$!" && n !== "$?" || t++;
        }
        e = e.nextSibling;
      }
      we = null;
    }
  } else we = ke ? at(e.stateNode.nextSibling) : null;
  return !0;
}
function ia() {
  for (var e = we; e; ) e = at(e.nextSibling);
}
function rn() {
  we = ke = null, A = !1;
}
function fo(e) {
  De === null ? De = [e] : De.push(e);
}
var nf = qe.ReactCurrentBatchConfig;
function gn(e, t, n) {
  if (e = n.ref, e !== null && typeof e != "function" && typeof e != "object") {
    if (n._owner) {
      if (n = n._owner, n) {
        if (n.tag !== 1) throw Error(x(309));
        var r = n.stateNode;
      }
      if (!r) throw Error(x(147, e));
      var l = r, i = "" + e;
      return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === i ? t.ref : (t = function(o) {
        var u = l.refs;
        o === null ? delete u[i] : u[i] = o;
      }, t._stringRef = i, t);
    }
    if (typeof e != "string") throw Error(x(284));
    if (!n._owner) throw Error(x(290, e));
  }
  return e;
}
function vr(e, t) {
  throw e = Object.prototype.toString.call(t), Error(x(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e));
}
function ku(e) {
  var t = e._init;
  return t(e._payload);
}
function oa(e) {
  function t(f, c) {
    if (e) {
      var a = f.deletions;
      a === null ? (f.deletions = [c], f.flags |= 16) : a.push(c);
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
    return f = pt(f, c), f.index = 0, f.sibling = null, f;
  }
  function i(f, c, a) {
    return f.index = a, e ? (a = f.alternate, a !== null ? (a = a.index, a < c ? (f.flags |= 2, c) : a) : (f.flags |= 2, c)) : (f.flags |= 1048576, c);
  }
  function o(f) {
    return e && f.alternate === null && (f.flags |= 2), f;
  }
  function u(f, c, a, v) {
    return c === null || c.tag !== 6 ? (c = Yl(a, f.mode, v), c.return = f, c) : (c = l(c, a), c.return = f, c);
  }
  function s(f, c, a, v) {
    var w = a.type;
    return w === $t ? h(f, c, a.props.children, v, a.key) : c !== null && (c.elementType === w || typeof w == "object" && w !== null && w.$$typeof === et && ku(w) === c.type) ? (v = l(c, a.props), v.ref = gn(f, c, a), v.return = f, v) : (v = Rr(a.type, a.key, a.props, null, f.mode, v), v.ref = gn(f, c, a), v.return = f, v);
  }
  function d(f, c, a, v) {
    return c === null || c.tag !== 4 || c.stateNode.containerInfo !== a.containerInfo || c.stateNode.implementation !== a.implementation ? (c = Xl(a, f.mode, v), c.return = f, c) : (c = l(c, a.children || []), c.return = f, c);
  }
  function h(f, c, a, v, w) {
    return c === null || c.tag !== 7 ? (c = zt(a, f.mode, v, w), c.return = f, c) : (c = l(c, a), c.return = f, c);
  }
  function g(f, c, a) {
    if (typeof c == "string" && c !== "" || typeof c == "number") return c = Yl("" + c, f.mode, a), c.return = f, c;
    if (typeof c == "object" && c !== null) {
      switch (c.$$typeof) {
        case ir:
          return a = Rr(c.type, c.key, c.props, null, f.mode, a), a.ref = gn(f, null, c), a.return = f, a;
        case It:
          return c = Xl(c, f.mode, a), c.return = f, c;
        case et:
          var v = c._init;
          return g(f, v(c._payload), a);
      }
      if (kn(c) || fn(c)) return c = zt(c, f.mode, a, null), c.return = f, c;
      vr(f, c);
    }
    return null;
  }
  function m(f, c, a, v) {
    var w = c !== null ? c.key : null;
    if (typeof a == "string" && a !== "" || typeof a == "number") return w !== null ? null : u(f, c, "" + a, v);
    if (typeof a == "object" && a !== null) {
      switch (a.$$typeof) {
        case ir:
          return a.key === w ? s(f, c, a, v) : null;
        case It:
          return a.key === w ? d(f, c, a, v) : null;
        case et:
          return w = a._init, m(
            f,
            c,
            w(a._payload),
            v
          );
      }
      if (kn(a) || fn(a)) return w !== null ? null : h(f, c, a, v, null);
      vr(f, a);
    }
    return null;
  }
  function k(f, c, a, v, w) {
    if (typeof v == "string" && v !== "" || typeof v == "number") return f = f.get(a) || null, u(c, f, "" + v, w);
    if (typeof v == "object" && v !== null) {
      switch (v.$$typeof) {
        case ir:
          return f = f.get(v.key === null ? a : v.key) || null, s(c, f, v, w);
        case It:
          return f = f.get(v.key === null ? a : v.key) || null, d(c, f, v, w);
        case et:
          var j = v._init;
          return k(f, c, a, j(v._payload), w);
      }
      if (kn(v) || fn(v)) return f = f.get(a) || null, h(c, f, v, w, null);
      vr(c, v);
    }
    return null;
  }
  function S(f, c, a, v) {
    for (var w = null, j = null, y = c, E = c = 0, O = null; y !== null && E < a.length; E++) {
      y.index > E ? (O = y, y = null) : O = y.sibling;
      var P = m(f, y, a[E], v);
      if (P === null) {
        y === null && (y = O);
        break;
      }
      e && y && P.alternate === null && t(f, y), c = i(P, c, E), j === null ? w = P : j.sibling = P, j = P, y = O;
    }
    if (E === a.length) return n(f, y), A && St(f, E), w;
    if (y === null) {
      for (; E < a.length; E++) y = g(f, a[E], v), y !== null && (c = i(y, c, E), j === null ? w = y : j.sibling = y, j = y);
      return A && St(f, E), w;
    }
    for (y = r(f, y); E < a.length; E++) O = k(y, f, E, a[E], v), O !== null && (e && O.alternate !== null && y.delete(O.key === null ? E : O.key), c = i(O, c, E), j === null ? w = O : j.sibling = O, j = O);
    return e && y.forEach(function(de) {
      return t(f, de);
    }), A && St(f, E), w;
  }
  function _(f, c, a, v) {
    var w = fn(a);
    if (typeof w != "function") throw Error(x(150));
    if (a = w.call(a), a == null) throw Error(x(151));
    for (var j = w = null, y = c, E = c = 0, O = null, P = a.next(); y !== null && !P.done; E++, P = a.next()) {
      y.index > E ? (O = y, y = null) : O = y.sibling;
      var de = m(f, y, P.value, v);
      if (de === null) {
        y === null && (y = O);
        break;
      }
      e && y && de.alternate === null && t(f, y), c = i(de, c, E), j === null ? w = de : j.sibling = de, j = de, y = O;
    }
    if (P.done) return n(
      f,
      y
    ), A && St(f, E), w;
    if (y === null) {
      for (; !P.done; E++, P = a.next()) P = g(f, P.value, v), P !== null && (c = i(P, c, E), j === null ? w = P : j.sibling = P, j = P);
      return A && St(f, E), w;
    }
    for (y = r(f, y); !P.done; E++, P = a.next()) P = k(y, f, E, P.value, v), P !== null && (e && P.alternate !== null && y.delete(P.key === null ? E : P.key), c = i(P, c, E), j === null ? w = P : j.sibling = P, j = P);
    return e && y.forEach(function(ye) {
      return t(f, ye);
    }), A && St(f, E), w;
  }
  function L(f, c, a, v) {
    if (typeof a == "object" && a !== null && a.type === $t && a.key === null && (a = a.props.children), typeof a == "object" && a !== null) {
      switch (a.$$typeof) {
        case ir:
          e: {
            for (var w = a.key, j = c; j !== null; ) {
              if (j.key === w) {
                if (w = a.type, w === $t) {
                  if (j.tag === 7) {
                    n(f, j.sibling), c = l(j, a.props.children), c.return = f, f = c;
                    break e;
                  }
                } else if (j.elementType === w || typeof w == "object" && w !== null && w.$$typeof === et && ku(w) === j.type) {
                  n(f, j.sibling), c = l(j, a.props), c.ref = gn(f, j, a), c.return = f, f = c;
                  break e;
                }
                n(f, j);
                break;
              } else t(f, j);
              j = j.sibling;
            }
            a.type === $t ? (c = zt(a.props.children, f.mode, v, a.key), c.return = f, f = c) : (v = Rr(a.type, a.key, a.props, null, f.mode, v), v.ref = gn(f, c, a), v.return = f, f = v);
          }
          return o(f);
        case It:
          e: {
            for (j = a.key; c !== null; ) {
              if (c.key === j) if (c.tag === 4 && c.stateNode.containerInfo === a.containerInfo && c.stateNode.implementation === a.implementation) {
                n(f, c.sibling), c = l(c, a.children || []), c.return = f, f = c;
                break e;
              } else {
                n(f, c);
                break;
              }
              else t(f, c);
              c = c.sibling;
            }
            c = Xl(a, f.mode, v), c.return = f, f = c;
          }
          return o(f);
        case et:
          return j = a._init, L(f, c, j(a._payload), v);
      }
      if (kn(a)) return S(f, c, a, v);
      if (fn(a)) return _(f, c, a, v);
      vr(f, a);
    }
    return typeof a == "string" && a !== "" || typeof a == "number" ? (a = "" + a, c !== null && c.tag === 6 ? (n(f, c.sibling), c = l(c, a), c.return = f, f = c) : (n(f, c), c = Yl(a, f.mode, v), c.return = f, f = c), o(f)) : n(f, c);
  }
  return L;
}
var ln = oa(!0), ua = oa(!1), Gr = gt(null), Yr = null, Kt = null, po = null;
function ho() {
  po = Kt = Yr = null;
}
function mo(e) {
  var t = Gr.current;
  U(Gr), e._currentValue = t;
}
function Ni(e, t, n) {
  for (; e !== null; ) {
    var r = e.alternate;
    if ((e.childLanes & t) !== t ? (e.childLanes |= t, r !== null && (r.childLanes |= t)) : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t), e === n) break;
    e = e.return;
  }
}
function bt(e, t) {
  Yr = e, po = Kt = null, e = e.dependencies, e !== null && e.firstContext !== null && (e.lanes & t && (he = !0), e.firstContext = null);
}
function Pe(e) {
  var t = e._currentValue;
  if (po !== e) if (e = { context: e, memoizedValue: t, next: null }, Kt === null) {
    if (Yr === null) throw Error(x(308));
    Kt = e, Yr.dependencies = { lanes: 0, firstContext: e };
  } else Kt = Kt.next = e;
  return t;
}
var Ct = null;
function vo(e) {
  Ct === null ? Ct = [e] : Ct.push(e);
}
function sa(e, t, n, r) {
  var l = t.interleaved;
  return l === null ? (n.next = n, vo(t)) : (n.next = l.next, l.next = n), t.interleaved = n, Ze(e, r);
}
function Ze(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; ) e.childLanes |= t, n = e.alternate, n !== null && (n.childLanes |= t), n = e, e = e.return;
  return n.tag === 3 ? n.stateNode : null;
}
var tt = !1;
function go(e) {
  e.updateQueue = { baseState: e.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
}
function aa(e, t) {
  e = e.updateQueue, t.updateQueue === e && (t.updateQueue = { baseState: e.baseState, firstBaseUpdate: e.firstBaseUpdate, lastBaseUpdate: e.lastBaseUpdate, shared: e.shared, effects: e.effects });
}
function Ge(e, t) {
  return { eventTime: e, lane: t, tag: 0, payload: null, callback: null, next: null };
}
function ct(e, t, n) {
  var r = e.updateQueue;
  if (r === null) return null;
  if (r = r.shared, D & 2) {
    var l = r.pending;
    return l === null ? t.next = t : (t.next = l.next, l.next = t), r.pending = t, Ze(e, n);
  }
  return l = r.interleaved, l === null ? (t.next = t, vo(r)) : (t.next = l.next, l.next = t), r.interleaved = t, Ze(e, n);
}
function Nr(e, t, n) {
  if (t = t.updateQueue, t !== null && (t = t.shared, (n & 4194240) !== 0)) {
    var r = t.lanes;
    r &= e.pendingLanes, n |= r, t.lanes = n, to(e, n);
  }
}
function Su(e, t) {
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
function Xr(e, t, n, r) {
  var l = e.updateQueue;
  tt = !1;
  var i = l.firstBaseUpdate, o = l.lastBaseUpdate, u = l.shared.pending;
  if (u !== null) {
    l.shared.pending = null;
    var s = u, d = s.next;
    s.next = null, o === null ? i = d : o.next = d, o = s;
    var h = e.alternate;
    h !== null && (h = h.updateQueue, u = h.lastBaseUpdate, u !== o && (u === null ? h.firstBaseUpdate = d : u.next = d, h.lastBaseUpdate = s));
  }
  if (i !== null) {
    var g = l.baseState;
    o = 0, h = d = s = null, u = i;
    do {
      var m = u.lane, k = u.eventTime;
      if ((r & m) === m) {
        h !== null && (h = h.next = {
          eventTime: k,
          lane: 0,
          tag: u.tag,
          payload: u.payload,
          callback: u.callback,
          next: null
        });
        e: {
          var S = e, _ = u;
          switch (m = t, k = n, _.tag) {
            case 1:
              if (S = _.payload, typeof S == "function") {
                g = S.call(k, g, m);
                break e;
              }
              g = S;
              break e;
            case 3:
              S.flags = S.flags & -65537 | 128;
            case 0:
              if (S = _.payload, m = typeof S == "function" ? S.call(k, g, m) : S, m == null) break e;
              g = W({}, g, m);
              break e;
            case 2:
              tt = !0;
          }
        }
        u.callback !== null && u.lane !== 0 && (e.flags |= 64, m = l.effects, m === null ? l.effects = [u] : m.push(u));
      } else k = { eventTime: k, lane: m, tag: u.tag, payload: u.payload, callback: u.callback, next: null }, h === null ? (d = h = k, s = g) : h = h.next = k, o |= m;
      if (u = u.next, u === null) {
        if (u = l.shared.pending, u === null) break;
        m = u, u = m.next, m.next = null, l.lastBaseUpdate = m, l.shared.pending = null;
      }
    } while (!0);
    if (h === null && (s = g), l.baseState = s, l.firstBaseUpdate = d, l.lastBaseUpdate = h, t = l.shared.interleaved, t !== null) {
      l = t;
      do
        o |= l.lane, l = l.next;
      while (l !== t);
    } else i === null && (l.shared.lanes = 0);
    Rt |= o, e.lanes = o, e.memoizedState = g;
  }
}
function _u(e, t, n) {
  if (e = t.effects, t.effects = null, e !== null) for (t = 0; t < e.length; t++) {
    var r = e[t], l = r.callback;
    if (l !== null) {
      if (r.callback = null, r = n, typeof l != "function") throw Error(x(191, l));
      l.call(r);
    }
  }
}
var er = {}, Ve = gt(er), Hn = gt(er), Qn = gt(er);
function Nt(e) {
  if (e === er) throw Error(x(174));
  return e;
}
function yo(e, t) {
  switch (I(Qn, t), I(Hn, e), I(Ve, er), e = t.nodeType, e) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : oi(null, "");
      break;
    default:
      e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = oi(t, e);
  }
  U(Ve), I(Ve, t);
}
function on() {
  U(Ve), U(Hn), U(Qn);
}
function ca(e) {
  Nt(Qn.current);
  var t = Nt(Ve.current), n = oi(t, e.type);
  t !== n && (I(Hn, e), I(Ve, n));
}
function xo(e) {
  Hn.current === e && (U(Ve), U(Hn));
}
var B = gt(0);
function Zr(e) {
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
var Vl = [];
function wo() {
  for (var e = 0; e < Vl.length; e++) Vl[e]._workInProgressVersionPrimary = null;
  Vl.length = 0;
}
var jr = qe.ReactCurrentDispatcher, Wl = qe.ReactCurrentBatchConfig, Lt = 0, V = null, X = null, q = null, Jr = !1, Pn = !1, Kn = 0, rf = 0;
function re() {
  throw Error(x(321));
}
function ko(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++) if (!Ie(e[n], t[n])) return !1;
  return !0;
}
function So(e, t, n, r, l, i) {
  if (Lt = i, V = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, jr.current = e === null || e.memoizedState === null ? sf : af, e = n(r, l), Pn) {
    i = 0;
    do {
      if (Pn = !1, Kn = 0, 25 <= i) throw Error(x(301));
      i += 1, q = X = null, t.updateQueue = null, jr.current = cf, e = n(r, l);
    } while (Pn);
  }
  if (jr.current = qr, t = X !== null && X.next !== null, Lt = 0, q = X = V = null, Jr = !1, t) throw Error(x(300));
  return e;
}
function _o() {
  var e = Kn !== 0;
  return Kn = 0, e;
}
function Ue() {
  var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
  return q === null ? V.memoizedState = q = e : q = q.next = e, q;
}
function Te() {
  if (X === null) {
    var e = V.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = X.next;
  var t = q === null ? V.memoizedState : q.next;
  if (t !== null) q = t, X = e;
  else {
    if (e === null) throw Error(x(310));
    X = e, e = { memoizedState: X.memoizedState, baseState: X.baseState, baseQueue: X.baseQueue, queue: X.queue, next: null }, q === null ? V.memoizedState = q = e : q = q.next = e;
  }
  return q;
}
function Gn(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function Hl(e) {
  var t = Te(), n = t.queue;
  if (n === null) throw Error(x(311));
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
    var u = o = null, s = null, d = i;
    do {
      var h = d.lane;
      if ((Lt & h) === h) s !== null && (s = s.next = { lane: 0, action: d.action, hasEagerState: d.hasEagerState, eagerState: d.eagerState, next: null }), r = d.hasEagerState ? d.eagerState : e(r, d.action);
      else {
        var g = {
          lane: h,
          action: d.action,
          hasEagerState: d.hasEagerState,
          eagerState: d.eagerState,
          next: null
        };
        s === null ? (u = s = g, o = r) : s = s.next = g, V.lanes |= h, Rt |= h;
      }
      d = d.next;
    } while (d !== null && d !== i);
    s === null ? o = r : s.next = u, Ie(r, t.memoizedState) || (he = !0), t.memoizedState = r, t.baseState = o, t.baseQueue = s, n.lastRenderedState = r;
  }
  if (e = n.interleaved, e !== null) {
    l = e;
    do
      i = l.lane, V.lanes |= i, Rt |= i, l = l.next;
    while (l !== e);
  } else l === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function Ql(e) {
  var t = Te(), n = t.queue;
  if (n === null) throw Error(x(311));
  n.lastRenderedReducer = e;
  var r = n.dispatch, l = n.pending, i = t.memoizedState;
  if (l !== null) {
    n.pending = null;
    var o = l = l.next;
    do
      i = e(i, o.action), o = o.next;
    while (o !== l);
    Ie(i, t.memoizedState) || (he = !0), t.memoizedState = i, t.baseQueue === null && (t.baseState = i), n.lastRenderedState = i;
  }
  return [i, r];
}
function da() {
}
function fa(e, t) {
  var n = V, r = Te(), l = t(), i = !Ie(r.memoizedState, l);
  if (i && (r.memoizedState = l, he = !0), r = r.queue, Eo(ma.bind(null, n, r, e), [e]), r.getSnapshot !== t || i || q !== null && q.memoizedState.tag & 1) {
    if (n.flags |= 2048, Yn(9, ha.bind(null, n, r, l, t), void 0, null), b === null) throw Error(x(349));
    Lt & 30 || pa(n, t, l);
  }
  return l;
}
function pa(e, t, n) {
  e.flags |= 16384, e = { getSnapshot: t, value: n }, t = V.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, V.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
}
function ha(e, t, n, r) {
  t.value = n, t.getSnapshot = r, va(t) && ga(e);
}
function ma(e, t, n) {
  return n(function() {
    va(t) && ga(e);
  });
}
function va(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !Ie(e, n);
  } catch {
    return !0;
  }
}
function ga(e) {
  var t = Ze(e, 1);
  t !== null && Fe(t, e, 1, -1);
}
function Eu(e) {
  var t = Ue();
  return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: Gn, lastRenderedState: e }, t.queue = e, e = e.dispatch = uf.bind(null, V, e), [t.memoizedState, e];
}
function Yn(e, t, n, r) {
  return e = { tag: e, create: t, destroy: n, deps: r, next: null }, t = V.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, V.updateQueue = t, t.lastEffect = e.next = e) : (n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e)), e;
}
function ya() {
  return Te().memoizedState;
}
function zr(e, t, n, r) {
  var l = Ue();
  V.flags |= e, l.memoizedState = Yn(1 | t, n, void 0, r === void 0 ? null : r);
}
function dl(e, t, n, r) {
  var l = Te();
  r = r === void 0 ? null : r;
  var i = void 0;
  if (X !== null) {
    var o = X.memoizedState;
    if (i = o.destroy, r !== null && ko(r, o.deps)) {
      l.memoizedState = Yn(t, n, i, r);
      return;
    }
  }
  V.flags |= e, l.memoizedState = Yn(1 | t, n, i, r);
}
function Cu(e, t) {
  return zr(8390656, 8, e, t);
}
function Eo(e, t) {
  return dl(2048, 8, e, t);
}
function xa(e, t) {
  return dl(4, 2, e, t);
}
function wa(e, t) {
  return dl(4, 4, e, t);
}
function ka(e, t) {
  if (typeof t == "function") return e = e(), t(e), function() {
    t(null);
  };
  if (t != null) return e = e(), t.current = e, function() {
    t.current = null;
  };
}
function Sa(e, t, n) {
  return n = n != null ? n.concat([e]) : null, dl(4, 4, ka.bind(null, t, e), n);
}
function Co() {
}
function _a(e, t) {
  var n = Te();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && ko(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
}
function Ea(e, t) {
  var n = Te();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && ko(t, r[1]) ? r[0] : (e = e(), n.memoizedState = [e, t], e);
}
function Ca(e, t, n) {
  return Lt & 21 ? (Ie(n, t) || (n = Ts(), V.lanes |= n, Rt |= n, e.baseState = !0), t) : (e.baseState && (e.baseState = !1, he = !0), e.memoizedState = n);
}
function lf(e, t) {
  var n = M;
  M = n !== 0 && 4 > n ? n : 4, e(!0);
  var r = Wl.transition;
  Wl.transition = {};
  try {
    e(!1), t();
  } finally {
    M = n, Wl.transition = r;
  }
}
function Na() {
  return Te().memoizedState;
}
function of(e, t, n) {
  var r = ft(e);
  if (n = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null }, ja(e)) za(t, n);
  else if (n = sa(e, t, n, r), n !== null) {
    var l = se();
    Fe(n, e, r, l), Pa(n, t, r);
  }
}
function uf(e, t, n) {
  var r = ft(e), l = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (ja(e)) za(t, l);
  else {
    var i = e.alternate;
    if (e.lanes === 0 && (i === null || i.lanes === 0) && (i = t.lastRenderedReducer, i !== null)) try {
      var o = t.lastRenderedState, u = i(o, n);
      if (l.hasEagerState = !0, l.eagerState = u, Ie(u, o)) {
        var s = t.interleaved;
        s === null ? (l.next = l, vo(t)) : (l.next = s.next, s.next = l), t.interleaved = l;
        return;
      }
    } catch {
    } finally {
    }
    n = sa(e, t, l, r), n !== null && (l = se(), Fe(n, e, r, l), Pa(n, t, r));
  }
}
function ja(e) {
  var t = e.alternate;
  return e === V || t !== null && t === V;
}
function za(e, t) {
  Pn = Jr = !0;
  var n = e.pending;
  n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
}
function Pa(e, t, n) {
  if (n & 4194240) {
    var r = t.lanes;
    r &= e.pendingLanes, n |= r, t.lanes = n, to(e, n);
  }
}
var qr = { readContext: Pe, useCallback: re, useContext: re, useEffect: re, useImperativeHandle: re, useInsertionEffect: re, useLayoutEffect: re, useMemo: re, useReducer: re, useRef: re, useState: re, useDebugValue: re, useDeferredValue: re, useTransition: re, useMutableSource: re, useSyncExternalStore: re, useId: re, unstable_isNewReconciler: !1 }, sf = { readContext: Pe, useCallback: function(e, t) {
  return Ue().memoizedState = [e, t === void 0 ? null : t], e;
}, useContext: Pe, useEffect: Cu, useImperativeHandle: function(e, t, n) {
  return n = n != null ? n.concat([e]) : null, zr(
    4194308,
    4,
    ka.bind(null, t, e),
    n
  );
}, useLayoutEffect: function(e, t) {
  return zr(4194308, 4, e, t);
}, useInsertionEffect: function(e, t) {
  return zr(4, 2, e, t);
}, useMemo: function(e, t) {
  var n = Ue();
  return t = t === void 0 ? null : t, e = e(), n.memoizedState = [e, t], e;
}, useReducer: function(e, t, n) {
  var r = Ue();
  return t = n !== void 0 ? n(t) : t, r.memoizedState = r.baseState = t, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: t }, r.queue = e, e = e.dispatch = of.bind(null, V, e), [r.memoizedState, e];
}, useRef: function(e) {
  var t = Ue();
  return e = { current: e }, t.memoizedState = e;
}, useState: Eu, useDebugValue: Co, useDeferredValue: function(e) {
  return Ue().memoizedState = e;
}, useTransition: function() {
  var e = Eu(!1), t = e[0];
  return e = lf.bind(null, e[1]), Ue().memoizedState = e, [t, e];
}, useMutableSource: function() {
}, useSyncExternalStore: function(e, t, n) {
  var r = V, l = Ue();
  if (A) {
    if (n === void 0) throw Error(x(407));
    n = n();
  } else {
    if (n = t(), b === null) throw Error(x(349));
    Lt & 30 || pa(r, t, n);
  }
  l.memoizedState = n;
  var i = { value: n, getSnapshot: t };
  return l.queue = i, Cu(ma.bind(
    null,
    r,
    i,
    e
  ), [e]), r.flags |= 2048, Yn(9, ha.bind(null, r, i, n, t), void 0, null), n;
}, useId: function() {
  var e = Ue(), t = b.identifierPrefix;
  if (A) {
    var n = Ke, r = Qe;
    n = (r & ~(1 << 32 - Me(r) - 1)).toString(32) + n, t = ":" + t + "R" + n, n = Kn++, 0 < n && (t += "H" + n.toString(32)), t += ":";
  } else n = rf++, t = ":" + t + "r" + n.toString(32) + ":";
  return e.memoizedState = t;
}, unstable_isNewReconciler: !1 }, af = {
  readContext: Pe,
  useCallback: _a,
  useContext: Pe,
  useEffect: Eo,
  useImperativeHandle: Sa,
  useInsertionEffect: xa,
  useLayoutEffect: wa,
  useMemo: Ea,
  useReducer: Hl,
  useRef: ya,
  useState: function() {
    return Hl(Gn);
  },
  useDebugValue: Co,
  useDeferredValue: function(e) {
    var t = Te();
    return Ca(t, X.memoizedState, e);
  },
  useTransition: function() {
    var e = Hl(Gn)[0], t = Te().memoizedState;
    return [e, t];
  },
  useMutableSource: da,
  useSyncExternalStore: fa,
  useId: Na,
  unstable_isNewReconciler: !1
}, cf = { readContext: Pe, useCallback: _a, useContext: Pe, useEffect: Eo, useImperativeHandle: Sa, useInsertionEffect: xa, useLayoutEffect: wa, useMemo: Ea, useReducer: Ql, useRef: ya, useState: function() {
  return Ql(Gn);
}, useDebugValue: Co, useDeferredValue: function(e) {
  var t = Te();
  return X === null ? t.memoizedState = e : Ca(t, X.memoizedState, e);
}, useTransition: function() {
  var e = Ql(Gn)[0], t = Te().memoizedState;
  return [e, t];
}, useMutableSource: da, useSyncExternalStore: fa, useId: Na, unstable_isNewReconciler: !1 };
function Re(e, t) {
  if (e && e.defaultProps) {
    t = W({}, t), e = e.defaultProps;
    for (var n in e) t[n] === void 0 && (t[n] = e[n]);
    return t;
  }
  return t;
}
function ji(e, t, n, r) {
  t = e.memoizedState, n = n(r, t), n = n == null ? t : W({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
}
var fl = { isMounted: function(e) {
  return (e = e._reactInternals) ? Mt(e) === e : !1;
}, enqueueSetState: function(e, t, n) {
  e = e._reactInternals;
  var r = se(), l = ft(e), i = Ge(r, l);
  i.payload = t, n != null && (i.callback = n), t = ct(e, i, l), t !== null && (Fe(t, e, l, r), Nr(t, e, l));
}, enqueueReplaceState: function(e, t, n) {
  e = e._reactInternals;
  var r = se(), l = ft(e), i = Ge(r, l);
  i.tag = 1, i.payload = t, n != null && (i.callback = n), t = ct(e, i, l), t !== null && (Fe(t, e, l, r), Nr(t, e, l));
}, enqueueForceUpdate: function(e, t) {
  e = e._reactInternals;
  var n = se(), r = ft(e), l = Ge(n, r);
  l.tag = 2, t != null && (l.callback = t), t = ct(e, l, r), t !== null && (Fe(t, e, r, n), Nr(t, e, r));
} };
function Nu(e, t, n, r, l, i, o) {
  return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, i, o) : t.prototype && t.prototype.isPureReactComponent ? !An(n, r) || !An(l, i) : !0;
}
function Ta(e, t, n) {
  var r = !1, l = mt, i = t.contextType;
  return typeof i == "object" && i !== null ? i = Pe(i) : (l = ve(t) ? Pt : oe.current, r = t.contextTypes, i = (r = r != null) ? nn(e, l) : mt), t = new t(n, i), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = fl, e.stateNode = t, t._reactInternals = e, r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = l, e.__reactInternalMemoizedMaskedChildContext = i), t;
}
function ju(e, t, n, r) {
  e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && fl.enqueueReplaceState(t, t.state, null);
}
function zi(e, t, n, r) {
  var l = e.stateNode;
  l.props = n, l.state = e.memoizedState, l.refs = {}, go(e);
  var i = t.contextType;
  typeof i == "object" && i !== null ? l.context = Pe(i) : (i = ve(t) ? Pt : oe.current, l.context = nn(e, i)), l.state = e.memoizedState, i = t.getDerivedStateFromProps, typeof i == "function" && (ji(e, t, i, n), l.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof l.getSnapshotBeforeUpdate == "function" || typeof l.UNSAFE_componentWillMount != "function" && typeof l.componentWillMount != "function" || (t = l.state, typeof l.componentWillMount == "function" && l.componentWillMount(), typeof l.UNSAFE_componentWillMount == "function" && l.UNSAFE_componentWillMount(), t !== l.state && fl.enqueueReplaceState(l, l.state, null), Xr(e, n, l, r), l.state = e.memoizedState), typeof l.componentDidMount == "function" && (e.flags |= 4194308);
}
function un(e, t) {
  try {
    var n = "", r = t;
    do
      n += Ic(r), r = r.return;
    while (r);
    var l = n;
  } catch (i) {
    l = `
Error generating stack: ` + i.message + `
` + i.stack;
  }
  return { value: e, source: t, stack: l, digest: null };
}
function Kl(e, t, n) {
  return { value: e, source: null, stack: n ?? null, digest: t ?? null };
}
function Pi(e, t) {
  try {
    console.error(t.value);
  } catch (n) {
    setTimeout(function() {
      throw n;
    });
  }
}
var df = typeof WeakMap == "function" ? WeakMap : Map;
function La(e, t, n) {
  n = Ge(-1, n), n.tag = 3, n.payload = { element: null };
  var r = t.value;
  return n.callback = function() {
    el || (el = !0, Ui = r), Pi(e, t);
  }, n;
}
function Ra(e, t, n) {
  n = Ge(-1, n), n.tag = 3;
  var r = e.type.getDerivedStateFromError;
  if (typeof r == "function") {
    var l = t.value;
    n.payload = function() {
      return r(l);
    }, n.callback = function() {
      Pi(e, t);
    };
  }
  var i = e.stateNode;
  return i !== null && typeof i.componentDidCatch == "function" && (n.callback = function() {
    Pi(e, t), typeof r != "function" && (dt === null ? dt = /* @__PURE__ */ new Set([this]) : dt.add(this));
    var o = t.stack;
    this.componentDidCatch(t.value, { componentStack: o !== null ? o : "" });
  }), n;
}
function zu(e, t, n) {
  var r = e.pingCache;
  if (r === null) {
    r = e.pingCache = new df();
    var l = /* @__PURE__ */ new Set();
    r.set(t, l);
  } else l = r.get(t), l === void 0 && (l = /* @__PURE__ */ new Set(), r.set(t, l));
  l.has(n) || (l.add(n), e = Cf.bind(null, e, t, n), t.then(e, e));
}
function Pu(e) {
  do {
    var t;
    if ((t = e.tag === 13) && (t = e.memoizedState, t = t !== null ? t.dehydrated !== null : !0), t) return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function Tu(e, t, n, r, l) {
  return e.mode & 1 ? (e.flags |= 65536, e.lanes = l, e) : (e === t ? e.flags |= 65536 : (e.flags |= 128, n.flags |= 131072, n.flags &= -52805, n.tag === 1 && (n.alternate === null ? n.tag = 17 : (t = Ge(-1, 1), t.tag = 2, ct(n, t, 1))), n.lanes |= 1), e);
}
var ff = qe.ReactCurrentOwner, he = !1;
function ue(e, t, n, r) {
  t.child = e === null ? ua(t, null, n, r) : ln(t, e.child, n, r);
}
function Lu(e, t, n, r, l) {
  n = n.render;
  var i = t.ref;
  return bt(t, l), r = So(e, t, n, r, i, l), n = _o(), e !== null && !he ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, Je(e, t, l)) : (A && n && ao(t), t.flags |= 1, ue(e, t, r, l), t.child);
}
function Ru(e, t, n, r, l) {
  if (e === null) {
    var i = n.type;
    return typeof i == "function" && !Oo(i) && i.defaultProps === void 0 && n.compare === null && n.defaultProps === void 0 ? (t.tag = 15, t.type = i, Oa(e, t, i, r, l)) : (e = Rr(n.type, null, r, t, t.mode, l), e.ref = t.ref, e.return = t, t.child = e);
  }
  if (i = e.child, !(e.lanes & l)) {
    var o = i.memoizedProps;
    if (n = n.compare, n = n !== null ? n : An, n(o, r) && e.ref === t.ref) return Je(e, t, l);
  }
  return t.flags |= 1, e = pt(i, r), e.ref = t.ref, e.return = t, t.child = e;
}
function Oa(e, t, n, r, l) {
  if (e !== null) {
    var i = e.memoizedProps;
    if (An(i, r) && e.ref === t.ref) if (he = !1, t.pendingProps = r = i, (e.lanes & l) !== 0) e.flags & 131072 && (he = !0);
    else return t.lanes = e.lanes, Je(e, t, l);
  }
  return Ti(e, t, n, r, l);
}
function Da(e, t, n) {
  var r = t.pendingProps, l = r.children, i = e !== null ? e.memoizedState : null;
  if (r.mode === "hidden") if (!(t.mode & 1)) t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, I(Yt, xe), xe |= n;
  else {
    if (!(n & 1073741824)) return e = i !== null ? i.baseLanes | n : n, t.lanes = t.childLanes = 1073741824, t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }, t.updateQueue = null, I(Yt, xe), xe |= e, null;
    t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, r = i !== null ? i.baseLanes : n, I(Yt, xe), xe |= r;
  }
  else i !== null ? (r = i.baseLanes | n, t.memoizedState = null) : r = n, I(Yt, xe), xe |= r;
  return ue(e, t, l, n), t.child;
}
function Ma(e, t) {
  var n = t.ref;
  (e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= 512, t.flags |= 2097152);
}
function Ti(e, t, n, r, l) {
  var i = ve(n) ? Pt : oe.current;
  return i = nn(t, i), bt(t, l), n = So(e, t, n, r, i, l), r = _o(), e !== null && !he ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, Je(e, t, l)) : (A && r && ao(t), t.flags |= 1, ue(e, t, n, l), t.child);
}
function Ou(e, t, n, r, l) {
  if (ve(n)) {
    var i = !0;
    Hr(t);
  } else i = !1;
  if (bt(t, l), t.stateNode === null) Pr(e, t), Ta(t, n, r), zi(t, n, r, l), r = !0;
  else if (e === null) {
    var o = t.stateNode, u = t.memoizedProps;
    o.props = u;
    var s = o.context, d = n.contextType;
    typeof d == "object" && d !== null ? d = Pe(d) : (d = ve(n) ? Pt : oe.current, d = nn(t, d));
    var h = n.getDerivedStateFromProps, g = typeof h == "function" || typeof o.getSnapshotBeforeUpdate == "function";
    g || typeof o.UNSAFE_componentWillReceiveProps != "function" && typeof o.componentWillReceiveProps != "function" || (u !== r || s !== d) && ju(t, o, r, d), tt = !1;
    var m = t.memoizedState;
    o.state = m, Xr(t, r, o, l), s = t.memoizedState, u !== r || m !== s || me.current || tt ? (typeof h == "function" && (ji(t, n, h, r), s = t.memoizedState), (u = tt || Nu(t, n, u, r, m, s, d)) ? (g || typeof o.UNSAFE_componentWillMount != "function" && typeof o.componentWillMount != "function" || (typeof o.componentWillMount == "function" && o.componentWillMount(), typeof o.UNSAFE_componentWillMount == "function" && o.UNSAFE_componentWillMount()), typeof o.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof o.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = s), o.props = r, o.state = s, o.context = d, r = u) : (typeof o.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
  } else {
    o = t.stateNode, aa(e, t), u = t.memoizedProps, d = t.type === t.elementType ? u : Re(t.type, u), o.props = d, g = t.pendingProps, m = o.context, s = n.contextType, typeof s == "object" && s !== null ? s = Pe(s) : (s = ve(n) ? Pt : oe.current, s = nn(t, s));
    var k = n.getDerivedStateFromProps;
    (h = typeof k == "function" || typeof o.getSnapshotBeforeUpdate == "function") || typeof o.UNSAFE_componentWillReceiveProps != "function" && typeof o.componentWillReceiveProps != "function" || (u !== g || m !== s) && ju(t, o, r, s), tt = !1, m = t.memoizedState, o.state = m, Xr(t, r, o, l);
    var S = t.memoizedState;
    u !== g || m !== S || me.current || tt ? (typeof k == "function" && (ji(t, n, k, r), S = t.memoizedState), (d = tt || Nu(t, n, d, r, m, S, s) || !1) ? (h || typeof o.UNSAFE_componentWillUpdate != "function" && typeof o.componentWillUpdate != "function" || (typeof o.componentWillUpdate == "function" && o.componentWillUpdate(r, S, s), typeof o.UNSAFE_componentWillUpdate == "function" && o.UNSAFE_componentWillUpdate(r, S, s)), typeof o.componentDidUpdate == "function" && (t.flags |= 4), typeof o.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof o.componentDidUpdate != "function" || u === e.memoizedProps && m === e.memoizedState || (t.flags |= 4), typeof o.getSnapshotBeforeUpdate != "function" || u === e.memoizedProps && m === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = S), o.props = r, o.state = S, o.context = s, r = d) : (typeof o.componentDidUpdate != "function" || u === e.memoizedProps && m === e.memoizedState || (t.flags |= 4), typeof o.getSnapshotBeforeUpdate != "function" || u === e.memoizedProps && m === e.memoizedState || (t.flags |= 1024), r = !1);
  }
  return Li(e, t, n, r, i, l);
}
function Li(e, t, n, r, l, i) {
  Ma(e, t);
  var o = (t.flags & 128) !== 0;
  if (!r && !o) return l && yu(t, n, !1), Je(e, t, i);
  r = t.stateNode, ff.current = t;
  var u = o && typeof n.getDerivedStateFromError != "function" ? null : r.render();
  return t.flags |= 1, e !== null && o ? (t.child = ln(t, e.child, null, i), t.child = ln(t, null, u, i)) : ue(e, t, u, i), t.memoizedState = r.state, l && yu(t, n, !0), t.child;
}
function Fa(e) {
  var t = e.stateNode;
  t.pendingContext ? gu(e, t.pendingContext, t.pendingContext !== t.context) : t.context && gu(e, t.context, !1), yo(e, t.containerInfo);
}
function Du(e, t, n, r, l) {
  return rn(), fo(l), t.flags |= 256, ue(e, t, n, r), t.child;
}
var Ri = { dehydrated: null, treeContext: null, retryLane: 0 };
function Oi(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function Ia(e, t, n) {
  var r = t.pendingProps, l = B.current, i = !1, o = (t.flags & 128) !== 0, u;
  if ((u = o) || (u = e !== null && e.memoizedState === null ? !1 : (l & 2) !== 0), u ? (i = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (l |= 1), I(B, l & 1), e === null)
    return Ci(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? (t.mode & 1 ? e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824 : t.lanes = 1, null) : (o = r.children, e = r.fallback, i ? (r = t.mode, i = t.child, o = { mode: "hidden", children: o }, !(r & 1) && i !== null ? (i.childLanes = 0, i.pendingProps = o) : i = ml(o, r, 0, null), e = zt(e, r, n, null), i.return = t, e.return = t, i.sibling = e, t.child = i, t.child.memoizedState = Oi(n), t.memoizedState = Ri, e) : No(t, o));
  if (l = e.memoizedState, l !== null && (u = l.dehydrated, u !== null)) return pf(e, t, o, r, u, l, n);
  if (i) {
    i = r.fallback, o = t.mode, l = e.child, u = l.sibling;
    var s = { mode: "hidden", children: r.children };
    return !(o & 1) && t.child !== l ? (r = t.child, r.childLanes = 0, r.pendingProps = s, t.deletions = null) : (r = pt(l, s), r.subtreeFlags = l.subtreeFlags & 14680064), u !== null ? i = pt(u, i) : (i = zt(i, o, n, null), i.flags |= 2), i.return = t, r.return = t, r.sibling = i, t.child = r, r = i, i = t.child, o = e.child.memoizedState, o = o === null ? Oi(n) : { baseLanes: o.baseLanes | n, cachePool: null, transitions: o.transitions }, i.memoizedState = o, i.childLanes = e.childLanes & ~n, t.memoizedState = Ri, r;
  }
  return i = e.child, e = i.sibling, r = pt(i, { mode: "visible", children: r.children }), !(t.mode & 1) && (r.lanes = n), r.return = t, r.sibling = null, e !== null && (n = t.deletions, n === null ? (t.deletions = [e], t.flags |= 16) : n.push(e)), t.child = r, t.memoizedState = null, r;
}
function No(e, t) {
  return t = ml({ mode: "visible", children: t }, e.mode, 0, null), t.return = e, e.child = t;
}
function gr(e, t, n, r) {
  return r !== null && fo(r), ln(t, e.child, null, n), e = No(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
}
function pf(e, t, n, r, l, i, o) {
  if (n)
    return t.flags & 256 ? (t.flags &= -257, r = Kl(Error(x(422))), gr(e, t, o, r)) : t.memoizedState !== null ? (t.child = e.child, t.flags |= 128, null) : (i = r.fallback, l = t.mode, r = ml({ mode: "visible", children: r.children }, l, 0, null), i = zt(i, l, o, null), i.flags |= 2, r.return = t, i.return = t, r.sibling = i, t.child = r, t.mode & 1 && ln(t, e.child, null, o), t.child.memoizedState = Oi(o), t.memoizedState = Ri, i);
  if (!(t.mode & 1)) return gr(e, t, o, null);
  if (l.data === "$!") {
    if (r = l.nextSibling && l.nextSibling.dataset, r) var u = r.dgst;
    return r = u, i = Error(x(419)), r = Kl(i, r, void 0), gr(e, t, o, r);
  }
  if (u = (o & e.childLanes) !== 0, he || u) {
    if (r = b, r !== null) {
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
      l = l & (r.suspendedLanes | o) ? 0 : l, l !== 0 && l !== i.retryLane && (i.retryLane = l, Ze(e, l), Fe(r, e, l, -1));
    }
    return Ro(), r = Kl(Error(x(421))), gr(e, t, o, r);
  }
  return l.data === "$?" ? (t.flags |= 128, t.child = e.child, t = Nf.bind(null, e), l._reactRetry = t, null) : (e = i.treeContext, we = at(l.nextSibling), ke = t, A = !0, De = null, e !== null && (Ce[Ne++] = Qe, Ce[Ne++] = Ke, Ce[Ne++] = Tt, Qe = e.id, Ke = e.overflow, Tt = t), t = No(t, r.children), t.flags |= 4096, t);
}
function Mu(e, t, n) {
  e.lanes |= t;
  var r = e.alternate;
  r !== null && (r.lanes |= t), Ni(e.return, t, n);
}
function Gl(e, t, n, r, l) {
  var i = e.memoizedState;
  i === null ? e.memoizedState = { isBackwards: t, rendering: null, renderingStartTime: 0, last: r, tail: n, tailMode: l } : (i.isBackwards = t, i.rendering = null, i.renderingStartTime = 0, i.last = r, i.tail = n, i.tailMode = l);
}
function $a(e, t, n) {
  var r = t.pendingProps, l = r.revealOrder, i = r.tail;
  if (ue(e, t, r.children, n), r = B.current, r & 2) r = r & 1 | 2, t.flags |= 128;
  else {
    if (e !== null && e.flags & 128) e: for (e = t.child; e !== null; ) {
      if (e.tag === 13) e.memoizedState !== null && Mu(e, n, t);
      else if (e.tag === 19) Mu(e, n, t);
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
  if (I(B, r), !(t.mode & 1)) t.memoizedState = null;
  else switch (l) {
    case "forwards":
      for (n = t.child, l = null; n !== null; ) e = n.alternate, e !== null && Zr(e) === null && (l = n), n = n.sibling;
      n = l, n === null ? (l = t.child, t.child = null) : (l = n.sibling, n.sibling = null), Gl(t, !1, l, n, i);
      break;
    case "backwards":
      for (n = null, l = t.child, t.child = null; l !== null; ) {
        if (e = l.alternate, e !== null && Zr(e) === null) {
          t.child = l;
          break;
        }
        e = l.sibling, l.sibling = n, n = l, l = e;
      }
      Gl(t, !0, n, null, i);
      break;
    case "together":
      Gl(t, !1, null, null, void 0);
      break;
    default:
      t.memoizedState = null;
  }
  return t.child;
}
function Pr(e, t) {
  !(t.mode & 1) && e !== null && (e.alternate = null, t.alternate = null, t.flags |= 2);
}
function Je(e, t, n) {
  if (e !== null && (t.dependencies = e.dependencies), Rt |= t.lanes, !(n & t.childLanes)) return null;
  if (e !== null && t.child !== e.child) throw Error(x(153));
  if (t.child !== null) {
    for (e = t.child, n = pt(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null; ) e = e.sibling, n = n.sibling = pt(e, e.pendingProps), n.return = t;
    n.sibling = null;
  }
  return t.child;
}
function hf(e, t, n) {
  switch (t.tag) {
    case 3:
      Fa(t), rn();
      break;
    case 5:
      ca(t);
      break;
    case 1:
      ve(t.type) && Hr(t);
      break;
    case 4:
      yo(t, t.stateNode.containerInfo);
      break;
    case 10:
      var r = t.type._context, l = t.memoizedProps.value;
      I(Gr, r._currentValue), r._currentValue = l;
      break;
    case 13:
      if (r = t.memoizedState, r !== null)
        return r.dehydrated !== null ? (I(B, B.current & 1), t.flags |= 128, null) : n & t.child.childLanes ? Ia(e, t, n) : (I(B, B.current & 1), e = Je(e, t, n), e !== null ? e.sibling : null);
      I(B, B.current & 1);
      break;
    case 19:
      if (r = (n & t.childLanes) !== 0, e.flags & 128) {
        if (r) return $a(e, t, n);
        t.flags |= 128;
      }
      if (l = t.memoizedState, l !== null && (l.rendering = null, l.tail = null, l.lastEffect = null), I(B, B.current), r) break;
      return null;
    case 22:
    case 23:
      return t.lanes = 0, Da(e, t, n);
  }
  return Je(e, t, n);
}
var Ua, Di, Aa, Ba;
Ua = function(e, t) {
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
Di = function() {
};
Aa = function(e, t, n, r) {
  var l = e.memoizedProps;
  if (l !== r) {
    e = t.stateNode, Nt(Ve.current);
    var i = null;
    switch (n) {
      case "input":
        l = ni(e, l), r = ni(e, r), i = [];
        break;
      case "select":
        l = W({}, l, { value: void 0 }), r = W({}, r, { value: void 0 }), i = [];
        break;
      case "textarea":
        l = ii(e, l), r = ii(e, r), i = [];
        break;
      default:
        typeof l.onClick != "function" && typeof r.onClick == "function" && (e.onclick = Vr);
    }
    ui(n, r);
    var o;
    n = null;
    for (d in l) if (!r.hasOwnProperty(d) && l.hasOwnProperty(d) && l[d] != null) if (d === "style") {
      var u = l[d];
      for (o in u) u.hasOwnProperty(o) && (n || (n = {}), n[o] = "");
    } else d !== "dangerouslySetInnerHTML" && d !== "children" && d !== "suppressContentEditableWarning" && d !== "suppressHydrationWarning" && d !== "autoFocus" && (On.hasOwnProperty(d) ? i || (i = []) : (i = i || []).push(d, null));
    for (d in r) {
      var s = r[d];
      if (u = l != null ? l[d] : void 0, r.hasOwnProperty(d) && s !== u && (s != null || u != null)) if (d === "style") if (u) {
        for (o in u) !u.hasOwnProperty(o) || s && s.hasOwnProperty(o) || (n || (n = {}), n[o] = "");
        for (o in s) s.hasOwnProperty(o) && u[o] !== s[o] && (n || (n = {}), n[o] = s[o]);
      } else n || (i || (i = []), i.push(
        d,
        n
      )), n = s;
      else d === "dangerouslySetInnerHTML" ? (s = s ? s.__html : void 0, u = u ? u.__html : void 0, s != null && u !== s && (i = i || []).push(d, s)) : d === "children" ? typeof s != "string" && typeof s != "number" || (i = i || []).push(d, "" + s) : d !== "suppressContentEditableWarning" && d !== "suppressHydrationWarning" && (On.hasOwnProperty(d) ? (s != null && d === "onScroll" && $("scroll", e), i || u === s || (i = [])) : (i = i || []).push(d, s));
    }
    n && (i = i || []).push("style", n);
    var d = i;
    (t.updateQueue = d) && (t.flags |= 4);
  }
};
Ba = function(e, t, n, r) {
  n !== r && (t.flags |= 4);
};
function yn(e, t) {
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
function mf(e, t, n) {
  var r = t.pendingProps;
  switch (co(t), t.tag) {
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
      return ve(t.type) && Wr(), le(t), null;
    case 3:
      return r = t.stateNode, on(), U(me), U(oe), wo(), r.pendingContext && (r.context = r.pendingContext, r.pendingContext = null), (e === null || e.child === null) && (mr(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, De !== null && (Vi(De), De = null))), Di(e, t), le(t), null;
    case 5:
      xo(t);
      var l = Nt(Qn.current);
      if (n = t.type, e !== null && t.stateNode != null) Aa(e, t, n, r, l), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
      else {
        if (!r) {
          if (t.stateNode === null) throw Error(x(166));
          return le(t), null;
        }
        if (e = Nt(Ve.current), mr(t)) {
          r = t.stateNode, n = t.type;
          var i = t.memoizedProps;
          switch (r[Ae] = t, r[Wn] = i, e = (t.mode & 1) !== 0, n) {
            case "dialog":
              $("cancel", r), $("close", r);
              break;
            case "iframe":
            case "object":
            case "embed":
              $("load", r);
              break;
            case "video":
            case "audio":
              for (l = 0; l < _n.length; l++) $(_n[l], r);
              break;
            case "source":
              $("error", r);
              break;
            case "img":
            case "image":
            case "link":
              $(
                "error",
                r
              ), $("load", r);
              break;
            case "details":
              $("toggle", r);
              break;
            case "input":
              Ho(r, i), $("invalid", r);
              break;
            case "select":
              r._wrapperState = { wasMultiple: !!i.multiple }, $("invalid", r);
              break;
            case "textarea":
              Ko(r, i), $("invalid", r);
          }
          ui(n, i), l = null;
          for (var o in i) if (i.hasOwnProperty(o)) {
            var u = i[o];
            o === "children" ? typeof u == "string" ? r.textContent !== u && (i.suppressHydrationWarning !== !0 && hr(r.textContent, u, e), l = ["children", u]) : typeof u == "number" && r.textContent !== "" + u && (i.suppressHydrationWarning !== !0 && hr(
              r.textContent,
              u,
              e
            ), l = ["children", "" + u]) : On.hasOwnProperty(o) && u != null && o === "onScroll" && $("scroll", r);
          }
          switch (n) {
            case "input":
              or(r), Qo(r, i, !0);
              break;
            case "textarea":
              or(r), Go(r);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof i.onClick == "function" && (r.onclick = Vr);
          }
          r = l, t.updateQueue = r, r !== null && (t.flags |= 4);
        } else {
          o = l.nodeType === 9 ? l : l.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = ms(n)), e === "http://www.w3.org/1999/xhtml" ? n === "script" ? (e = o.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof r.is == "string" ? e = o.createElement(n, { is: r.is }) : (e = o.createElement(n), n === "select" && (o = e, r.multiple ? o.multiple = !0 : r.size && (o.size = r.size))) : e = o.createElementNS(e, n), e[Ae] = t, e[Wn] = r, Ua(e, t, !1, !1), t.stateNode = e;
          e: {
            switch (o = si(n, r), n) {
              case "dialog":
                $("cancel", e), $("close", e), l = r;
                break;
              case "iframe":
              case "object":
              case "embed":
                $("load", e), l = r;
                break;
              case "video":
              case "audio":
                for (l = 0; l < _n.length; l++) $(_n[l], e);
                l = r;
                break;
              case "source":
                $("error", e), l = r;
                break;
              case "img":
              case "image":
              case "link":
                $(
                  "error",
                  e
                ), $("load", e), l = r;
                break;
              case "details":
                $("toggle", e), l = r;
                break;
              case "input":
                Ho(e, r), l = ni(e, r), $("invalid", e);
                break;
              case "option":
                l = r;
                break;
              case "select":
                e._wrapperState = { wasMultiple: !!r.multiple }, l = W({}, r, { value: void 0 }), $("invalid", e);
                break;
              case "textarea":
                Ko(e, r), l = ii(e, r), $("invalid", e);
                break;
              default:
                l = r;
            }
            ui(n, l), u = l;
            for (i in u) if (u.hasOwnProperty(i)) {
              var s = u[i];
              i === "style" ? ys(e, s) : i === "dangerouslySetInnerHTML" ? (s = s ? s.__html : void 0, s != null && vs(e, s)) : i === "children" ? typeof s == "string" ? (n !== "textarea" || s !== "") && Dn(e, s) : typeof s == "number" && Dn(e, "" + s) : i !== "suppressContentEditableWarning" && i !== "suppressHydrationWarning" && i !== "autoFocus" && (On.hasOwnProperty(i) ? s != null && i === "onScroll" && $("scroll", e) : s != null && Xi(e, i, s, o));
            }
            switch (n) {
              case "input":
                or(e), Qo(e, r, !1);
                break;
              case "textarea":
                or(e), Go(e);
                break;
              case "option":
                r.value != null && e.setAttribute("value", "" + ht(r.value));
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
                typeof l.onClick == "function" && (e.onclick = Vr);
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
      if (e && t.stateNode != null) Ba(e, t, e.memoizedProps, r);
      else {
        if (typeof r != "string" && t.stateNode === null) throw Error(x(166));
        if (n = Nt(Qn.current), Nt(Ve.current), mr(t)) {
          if (r = t.stateNode, n = t.memoizedProps, r[Ae] = t, (i = r.nodeValue !== n) && (e = ke, e !== null)) switch (e.tag) {
            case 3:
              hr(r.nodeValue, n, (e.mode & 1) !== 0);
              break;
            case 5:
              e.memoizedProps.suppressHydrationWarning !== !0 && hr(r.nodeValue, n, (e.mode & 1) !== 0);
          }
          i && (t.flags |= 4);
        } else r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r), r[Ae] = t, t.stateNode = r;
      }
      return le(t), null;
    case 13:
      if (U(B), r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
        if (A && we !== null && t.mode & 1 && !(t.flags & 128)) ia(), rn(), t.flags |= 98560, i = !1;
        else if (i = mr(t), r !== null && r.dehydrated !== null) {
          if (e === null) {
            if (!i) throw Error(x(318));
            if (i = t.memoizedState, i = i !== null ? i.dehydrated : null, !i) throw Error(x(317));
            i[Ae] = t;
          } else rn(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
          le(t), i = !1;
        } else De !== null && (Vi(De), De = null), i = !0;
        if (!i) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128 ? (t.lanes = n, t) : (r = r !== null, r !== (e !== null && e.memoizedState !== null) && r && (t.child.flags |= 8192, t.mode & 1 && (e === null || B.current & 1 ? Z === 0 && (Z = 3) : Ro())), t.updateQueue !== null && (t.flags |= 4), le(t), null);
    case 4:
      return on(), Di(e, t), e === null && Bn(t.stateNode.containerInfo), le(t), null;
    case 10:
      return mo(t.type._context), le(t), null;
    case 17:
      return ve(t.type) && Wr(), le(t), null;
    case 19:
      if (U(B), i = t.memoizedState, i === null) return le(t), null;
      if (r = (t.flags & 128) !== 0, o = i.rendering, o === null) if (r) yn(i, !1);
      else {
        if (Z !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null; ) {
          if (o = Zr(e), o !== null) {
            for (t.flags |= 128, yn(i, !1), r = o.updateQueue, r !== null && (t.updateQueue = r, t.flags |= 4), t.subtreeFlags = 0, r = n, n = t.child; n !== null; ) i = n, e = r, i.flags &= 14680066, o = i.alternate, o === null ? (i.childLanes = 0, i.lanes = e, i.child = null, i.subtreeFlags = 0, i.memoizedProps = null, i.memoizedState = null, i.updateQueue = null, i.dependencies = null, i.stateNode = null) : (i.childLanes = o.childLanes, i.lanes = o.lanes, i.child = o.child, i.subtreeFlags = 0, i.deletions = null, i.memoizedProps = o.memoizedProps, i.memoizedState = o.memoizedState, i.updateQueue = o.updateQueue, i.type = o.type, e = o.dependencies, i.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }), n = n.sibling;
            return I(B, B.current & 1 | 2), t.child;
          }
          e = e.sibling;
        }
        i.tail !== null && G() > sn && (t.flags |= 128, r = !0, yn(i, !1), t.lanes = 4194304);
      }
      else {
        if (!r) if (e = Zr(o), e !== null) {
          if (t.flags |= 128, r = !0, n = e.updateQueue, n !== null && (t.updateQueue = n, t.flags |= 4), yn(i, !0), i.tail === null && i.tailMode === "hidden" && !o.alternate && !A) return le(t), null;
        } else 2 * G() - i.renderingStartTime > sn && n !== 1073741824 && (t.flags |= 128, r = !0, yn(i, !1), t.lanes = 4194304);
        i.isBackwards ? (o.sibling = t.child, t.child = o) : (n = i.last, n !== null ? n.sibling = o : t.child = o, i.last = o);
      }
      return i.tail !== null ? (t = i.tail, i.rendering = t, i.tail = t.sibling, i.renderingStartTime = G(), t.sibling = null, n = B.current, I(B, r ? n & 1 | 2 : n & 1), t) : (le(t), null);
    case 22:
    case 23:
      return Lo(), r = t.memoizedState !== null, e !== null && e.memoizedState !== null !== r && (t.flags |= 8192), r && t.mode & 1 ? xe & 1073741824 && (le(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : le(t), null;
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(x(156, t.tag));
}
function vf(e, t) {
  switch (co(t), t.tag) {
    case 1:
      return ve(t.type) && Wr(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 3:
      return on(), U(me), U(oe), wo(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
    case 5:
      return xo(t), null;
    case 13:
      if (U(B), e = t.memoizedState, e !== null && e.dehydrated !== null) {
        if (t.alternate === null) throw Error(x(340));
        rn();
      }
      return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 19:
      return U(B), null;
    case 4:
      return on(), null;
    case 10:
      return mo(t.type._context), null;
    case 22:
    case 23:
      return Lo(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var yr = !1, ie = !1, gf = typeof WeakSet == "function" ? WeakSet : Set, C = null;
function Gt(e, t) {
  var n = e.ref;
  if (n !== null) if (typeof n == "function") try {
    n(null);
  } catch (r) {
    H(e, t, r);
  }
  else n.current = null;
}
function Mi(e, t, n) {
  try {
    n();
  } catch (r) {
    H(e, t, r);
  }
}
var Fu = !1;
function yf(e, t) {
  if (yi = Ur, e = Ks(), so(e)) {
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
        var o = 0, u = -1, s = -1, d = 0, h = 0, g = e, m = null;
        t: for (; ; ) {
          for (var k; g !== n || l !== 0 && g.nodeType !== 3 || (u = o + l), g !== i || r !== 0 && g.nodeType !== 3 || (s = o + r), g.nodeType === 3 && (o += g.nodeValue.length), (k = g.firstChild) !== null; )
            m = g, g = k;
          for (; ; ) {
            if (g === e) break t;
            if (m === n && ++d === l && (u = o), m === i && ++h === r && (s = o), (k = g.nextSibling) !== null) break;
            g = m, m = g.parentNode;
          }
          g = k;
        }
        n = u === -1 || s === -1 ? null : { start: u, end: s };
      } else n = null;
    }
    n = n || { start: 0, end: 0 };
  } else n = null;
  for (xi = { focusedElem: e, selectionRange: n }, Ur = !1, C = t; C !== null; ) if (t = C, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null) e.return = t, C = e;
  else for (; C !== null; ) {
    t = C;
    try {
      var S = t.alternate;
      if (t.flags & 1024) switch (t.tag) {
        case 0:
        case 11:
        case 15:
          break;
        case 1:
          if (S !== null) {
            var _ = S.memoizedProps, L = S.memoizedState, f = t.stateNode, c = f.getSnapshotBeforeUpdate(t.elementType === t.type ? _ : Re(t.type, _), L);
            f.__reactInternalSnapshotBeforeUpdate = c;
          }
          break;
        case 3:
          var a = t.stateNode.containerInfo;
          a.nodeType === 1 ? a.textContent = "" : a.nodeType === 9 && a.documentElement && a.removeChild(a.documentElement);
          break;
        case 5:
        case 6:
        case 4:
        case 17:
          break;
        default:
          throw Error(x(163));
      }
    } catch (v) {
      H(t, t.return, v);
    }
    if (e = t.sibling, e !== null) {
      e.return = t.return, C = e;
      break;
    }
    C = t.return;
  }
  return S = Fu, Fu = !1, S;
}
function Tn(e, t, n) {
  var r = t.updateQueue;
  if (r = r !== null ? r.lastEffect : null, r !== null) {
    var l = r = r.next;
    do {
      if ((l.tag & e) === e) {
        var i = l.destroy;
        l.destroy = void 0, i !== void 0 && Mi(t, n, i);
      }
      l = l.next;
    } while (l !== r);
  }
}
function pl(e, t) {
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
function Fi(e) {
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
function Va(e) {
  var t = e.alternate;
  t !== null && (e.alternate = null, Va(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[Ae], delete t[Wn], delete t[Si], delete t[bd], delete t[ef])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
}
function Wa(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function Iu(e) {
  e: for (; ; ) {
    for (; e.sibling === null; ) {
      if (e.return === null || Wa(e.return)) return null;
      e = e.return;
    }
    for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
      if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
      e.child.return = e, e = e.child;
    }
    if (!(e.flags & 2)) return e.stateNode;
  }
}
function Ii(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6) e = e.stateNode, t ? n.nodeType === 8 ? n.parentNode.insertBefore(e, t) : n.insertBefore(e, t) : (n.nodeType === 8 ? (t = n.parentNode, t.insertBefore(e, n)) : (t = n, t.appendChild(e)), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = Vr));
  else if (r !== 4 && (e = e.child, e !== null)) for (Ii(e, t, n), e = e.sibling; e !== null; ) Ii(e, t, n), e = e.sibling;
}
function $i(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
  else if (r !== 4 && (e = e.child, e !== null)) for ($i(e, t, n), e = e.sibling; e !== null; ) $i(e, t, n), e = e.sibling;
}
var ee = null, Oe = !1;
function be(e, t, n) {
  for (n = n.child; n !== null; ) Ha(e, t, n), n = n.sibling;
}
function Ha(e, t, n) {
  if (Be && typeof Be.onCommitFiberUnmount == "function") try {
    Be.onCommitFiberUnmount(il, n);
  } catch {
  }
  switch (n.tag) {
    case 5:
      ie || Gt(n, t);
    case 6:
      var r = ee, l = Oe;
      ee = null, be(e, t, n), ee = r, Oe = l, ee !== null && (Oe ? (e = ee, n = n.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n)) : ee.removeChild(n.stateNode));
      break;
    case 18:
      ee !== null && (Oe ? (e = ee, n = n.stateNode, e.nodeType === 8 ? Al(e.parentNode, n) : e.nodeType === 1 && Al(e, n), $n(e)) : Al(ee, n.stateNode));
      break;
    case 4:
      r = ee, l = Oe, ee = n.stateNode.containerInfo, Oe = !0, be(e, t, n), ee = r, Oe = l;
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (!ie && (r = n.updateQueue, r !== null && (r = r.lastEffect, r !== null))) {
        l = r = r.next;
        do {
          var i = l, o = i.destroy;
          i = i.tag, o !== void 0 && (i & 2 || i & 4) && Mi(n, t, o), l = l.next;
        } while (l !== r);
      }
      be(e, t, n);
      break;
    case 1:
      if (!ie && (Gt(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function")) try {
        r.props = n.memoizedProps, r.state = n.memoizedState, r.componentWillUnmount();
      } catch (u) {
        H(n, t, u);
      }
      be(e, t, n);
      break;
    case 21:
      be(e, t, n);
      break;
    case 22:
      n.mode & 1 ? (ie = (r = ie) || n.memoizedState !== null, be(e, t, n), ie = r) : be(e, t, n);
      break;
    default:
      be(e, t, n);
  }
}
function $u(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    n === null && (n = e.stateNode = new gf()), t.forEach(function(r) {
      var l = jf.bind(null, e, r);
      n.has(r) || (n.add(r), r.then(l, l));
    });
  }
}
function Le(e, t) {
  var n = t.deletions;
  if (n !== null) for (var r = 0; r < n.length; r++) {
    var l = n[r];
    try {
      var i = e, o = t, u = o;
      e: for (; u !== null; ) {
        switch (u.tag) {
          case 5:
            ee = u.stateNode, Oe = !1;
            break e;
          case 3:
            ee = u.stateNode.containerInfo, Oe = !0;
            break e;
          case 4:
            ee = u.stateNode.containerInfo, Oe = !0;
            break e;
        }
        u = u.return;
      }
      if (ee === null) throw Error(x(160));
      Ha(i, o, l), ee = null, Oe = !1;
      var s = l.alternate;
      s !== null && (s.return = null), l.return = null;
    } catch (d) {
      H(l, t, d);
    }
  }
  if (t.subtreeFlags & 12854) for (t = t.child; t !== null; ) Qa(t, e), t = t.sibling;
}
function Qa(e, t) {
  var n = e.alternate, r = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if (Le(t, e), $e(e), r & 4) {
        try {
          Tn(3, e, e.return), pl(3, e);
        } catch (_) {
          H(e, e.return, _);
        }
        try {
          Tn(5, e, e.return);
        } catch (_) {
          H(e, e.return, _);
        }
      }
      break;
    case 1:
      Le(t, e), $e(e), r & 512 && n !== null && Gt(n, n.return);
      break;
    case 5:
      if (Le(t, e), $e(e), r & 512 && n !== null && Gt(n, n.return), e.flags & 32) {
        var l = e.stateNode;
        try {
          Dn(l, "");
        } catch (_) {
          H(e, e.return, _);
        }
      }
      if (r & 4 && (l = e.stateNode, l != null)) {
        var i = e.memoizedProps, o = n !== null ? n.memoizedProps : i, u = e.type, s = e.updateQueue;
        if (e.updateQueue = null, s !== null) try {
          u === "input" && i.type === "radio" && i.name != null && ps(l, i), si(u, o);
          var d = si(u, i);
          for (o = 0; o < s.length; o += 2) {
            var h = s[o], g = s[o + 1];
            h === "style" ? ys(l, g) : h === "dangerouslySetInnerHTML" ? vs(l, g) : h === "children" ? Dn(l, g) : Xi(l, h, g, d);
          }
          switch (u) {
            case "input":
              ri(l, i);
              break;
            case "textarea":
              hs(l, i);
              break;
            case "select":
              var m = l._wrapperState.wasMultiple;
              l._wrapperState.wasMultiple = !!i.multiple;
              var k = i.value;
              k != null ? Xt(l, !!i.multiple, k, !1) : m !== !!i.multiple && (i.defaultValue != null ? Xt(
                l,
                !!i.multiple,
                i.defaultValue,
                !0
              ) : Xt(l, !!i.multiple, i.multiple ? [] : "", !1));
          }
          l[Wn] = i;
        } catch (_) {
          H(e, e.return, _);
        }
      }
      break;
    case 6:
      if (Le(t, e), $e(e), r & 4) {
        if (e.stateNode === null) throw Error(x(162));
        l = e.stateNode, i = e.memoizedProps;
        try {
          l.nodeValue = i;
        } catch (_) {
          H(e, e.return, _);
        }
      }
      break;
    case 3:
      if (Le(t, e), $e(e), r & 4 && n !== null && n.memoizedState.isDehydrated) try {
        $n(t.containerInfo);
      } catch (_) {
        H(e, e.return, _);
      }
      break;
    case 4:
      Le(t, e), $e(e);
      break;
    case 13:
      Le(t, e), $e(e), l = e.child, l.flags & 8192 && (i = l.memoizedState !== null, l.stateNode.isHidden = i, !i || l.alternate !== null && l.alternate.memoizedState !== null || (Po = G())), r & 4 && $u(e);
      break;
    case 22:
      if (h = n !== null && n.memoizedState !== null, e.mode & 1 ? (ie = (d = ie) || h, Le(t, e), ie = d) : Le(t, e), $e(e), r & 8192) {
        if (d = e.memoizedState !== null, (e.stateNode.isHidden = d) && !h && e.mode & 1) for (C = e, h = e.child; h !== null; ) {
          for (g = C = h; C !== null; ) {
            switch (m = C, k = m.child, m.tag) {
              case 0:
              case 11:
              case 14:
              case 15:
                Tn(4, m, m.return);
                break;
              case 1:
                Gt(m, m.return);
                var S = m.stateNode;
                if (typeof S.componentWillUnmount == "function") {
                  r = m, n = m.return;
                  try {
                    t = r, S.props = t.memoizedProps, S.state = t.memoizedState, S.componentWillUnmount();
                  } catch (_) {
                    H(r, n, _);
                  }
                }
                break;
              case 5:
                Gt(m, m.return);
                break;
              case 22:
                if (m.memoizedState !== null) {
                  Au(g);
                  continue;
                }
            }
            k !== null ? (k.return = m, C = k) : Au(g);
          }
          h = h.sibling;
        }
        e: for (h = null, g = e; ; ) {
          if (g.tag === 5) {
            if (h === null) {
              h = g;
              try {
                l = g.stateNode, d ? (i = l.style, typeof i.setProperty == "function" ? i.setProperty("display", "none", "important") : i.display = "none") : (u = g.stateNode, s = g.memoizedProps.style, o = s != null && s.hasOwnProperty("display") ? s.display : null, u.style.display = gs("display", o));
              } catch (_) {
                H(e, e.return, _);
              }
            }
          } else if (g.tag === 6) {
            if (h === null) try {
              g.stateNode.nodeValue = d ? "" : g.memoizedProps;
            } catch (_) {
              H(e, e.return, _);
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
      Le(t, e), $e(e), r & 4 && $u(e);
      break;
    case 21:
      break;
    default:
      Le(
        t,
        e
      ), $e(e);
  }
}
function $e(e) {
  var t = e.flags;
  if (t & 2) {
    try {
      e: {
        for (var n = e.return; n !== null; ) {
          if (Wa(n)) {
            var r = n;
            break e;
          }
          n = n.return;
        }
        throw Error(x(160));
      }
      switch (r.tag) {
        case 5:
          var l = r.stateNode;
          r.flags & 32 && (Dn(l, ""), r.flags &= -33);
          var i = Iu(e);
          $i(e, i, l);
          break;
        case 3:
        case 4:
          var o = r.stateNode.containerInfo, u = Iu(e);
          Ii(e, u, o);
          break;
        default:
          throw Error(x(161));
      }
    } catch (s) {
      H(e, e.return, s);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function xf(e, t, n) {
  C = e, Ka(e);
}
function Ka(e, t, n) {
  for (var r = (e.mode & 1) !== 0; C !== null; ) {
    var l = C, i = l.child;
    if (l.tag === 22 && r) {
      var o = l.memoizedState !== null || yr;
      if (!o) {
        var u = l.alternate, s = u !== null && u.memoizedState !== null || ie;
        u = yr;
        var d = ie;
        if (yr = o, (ie = s) && !d) for (C = l; C !== null; ) o = C, s = o.child, o.tag === 22 && o.memoizedState !== null ? Bu(l) : s !== null ? (s.return = o, C = s) : Bu(l);
        for (; i !== null; ) C = i, Ka(i), i = i.sibling;
        C = l, yr = u, ie = d;
      }
      Uu(e);
    } else l.subtreeFlags & 8772 && i !== null ? (i.return = l, C = i) : Uu(e);
  }
}
function Uu(e) {
  for (; C !== null; ) {
    var t = C;
    if (t.flags & 8772) {
      var n = t.alternate;
      try {
        if (t.flags & 8772) switch (t.tag) {
          case 0:
          case 11:
          case 15:
            ie || pl(5, t);
            break;
          case 1:
            var r = t.stateNode;
            if (t.flags & 4 && !ie) if (n === null) r.componentDidMount();
            else {
              var l = t.elementType === t.type ? n.memoizedProps : Re(t.type, n.memoizedProps);
              r.componentDidUpdate(l, n.memoizedState, r.__reactInternalSnapshotBeforeUpdate);
            }
            var i = t.updateQueue;
            i !== null && _u(t, i, r);
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
              _u(t, o, n);
            }
            break;
          case 5:
            var u = t.stateNode;
            if (n === null && t.flags & 4) {
              n = u;
              var s = t.memoizedProps;
              switch (t.type) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  s.autoFocus && n.focus();
                  break;
                case "img":
                  s.src && (n.src = s.src);
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
                var h = d.memoizedState;
                if (h !== null) {
                  var g = h.dehydrated;
                  g !== null && $n(g);
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
            throw Error(x(163));
        }
        ie || t.flags & 512 && Fi(t);
      } catch (m) {
        H(t, t.return, m);
      }
    }
    if (t === e) {
      C = null;
      break;
    }
    if (n = t.sibling, n !== null) {
      n.return = t.return, C = n;
      break;
    }
    C = t.return;
  }
}
function Au(e) {
  for (; C !== null; ) {
    var t = C;
    if (t === e) {
      C = null;
      break;
    }
    var n = t.sibling;
    if (n !== null) {
      n.return = t.return, C = n;
      break;
    }
    C = t.return;
  }
}
function Bu(e) {
  for (; C !== null; ) {
    var t = C;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return;
          try {
            pl(4, t);
          } catch (s) {
            H(t, n, s);
          }
          break;
        case 1:
          var r = t.stateNode;
          if (typeof r.componentDidMount == "function") {
            var l = t.return;
            try {
              r.componentDidMount();
            } catch (s) {
              H(t, l, s);
            }
          }
          var i = t.return;
          try {
            Fi(t);
          } catch (s) {
            H(t, i, s);
          }
          break;
        case 5:
          var o = t.return;
          try {
            Fi(t);
          } catch (s) {
            H(t, o, s);
          }
      }
    } catch (s) {
      H(t, t.return, s);
    }
    if (t === e) {
      C = null;
      break;
    }
    var u = t.sibling;
    if (u !== null) {
      u.return = t.return, C = u;
      break;
    }
    C = t.return;
  }
}
var wf = Math.ceil, br = qe.ReactCurrentDispatcher, jo = qe.ReactCurrentOwner, ze = qe.ReactCurrentBatchConfig, D = 0, b = null, Y = null, te = 0, xe = 0, Yt = gt(0), Z = 0, Xn = null, Rt = 0, hl = 0, zo = 0, Ln = null, pe = null, Po = 0, sn = 1 / 0, We = null, el = !1, Ui = null, dt = null, xr = !1, it = null, tl = 0, Rn = 0, Ai = null, Tr = -1, Lr = 0;
function se() {
  return D & 6 ? G() : Tr !== -1 ? Tr : Tr = G();
}
function ft(e) {
  return e.mode & 1 ? D & 2 && te !== 0 ? te & -te : nf.transition !== null ? (Lr === 0 && (Lr = Ts()), Lr) : (e = M, e !== 0 || (e = window.event, e = e === void 0 ? 16 : Is(e.type)), e) : 1;
}
function Fe(e, t, n, r) {
  if (50 < Rn) throw Rn = 0, Ai = null, Error(x(185));
  Jn(e, n, r), (!(D & 2) || e !== b) && (e === b && (!(D & 2) && (hl |= n), Z === 4 && rt(e, te)), ge(e, r), n === 1 && D === 0 && !(t.mode & 1) && (sn = G() + 500, cl && yt()));
}
function ge(e, t) {
  var n = e.callbackNode;
  nd(e, t);
  var r = $r(e, e === b ? te : 0);
  if (r === 0) n !== null && Zo(n), e.callbackNode = null, e.callbackPriority = 0;
  else if (t = r & -r, e.callbackPriority !== t) {
    if (n != null && Zo(n), t === 1) e.tag === 0 ? tf(Vu.bind(null, e)) : na(Vu.bind(null, e)), Jd(function() {
      !(D & 6) && yt();
    }), n = null;
    else {
      switch (Ls(r)) {
        case 1:
          n = eo;
          break;
        case 4:
          n = zs;
          break;
        case 16:
          n = Ir;
          break;
        case 536870912:
          n = Ps;
          break;
        default:
          n = Ir;
      }
      n = ec(n, Ga.bind(null, e));
    }
    e.callbackPriority = t, e.callbackNode = n;
  }
}
function Ga(e, t) {
  if (Tr = -1, Lr = 0, D & 6) throw Error(x(327));
  var n = e.callbackNode;
  if (en() && e.callbackNode !== n) return null;
  var r = $r(e, e === b ? te : 0);
  if (r === 0) return null;
  if (r & 30 || r & e.expiredLanes || t) t = nl(e, r);
  else {
    t = r;
    var l = D;
    D |= 2;
    var i = Xa();
    (b !== e || te !== t) && (We = null, sn = G() + 500, jt(e, t));
    do
      try {
        _f();
        break;
      } catch (u) {
        Ya(e, u);
      }
    while (!0);
    ho(), br.current = i, D = l, Y !== null ? t = 0 : (b = null, te = 0, t = Z);
  }
  if (t !== 0) {
    if (t === 2 && (l = pi(e), l !== 0 && (r = l, t = Bi(e, l))), t === 1) throw n = Xn, jt(e, 0), rt(e, r), ge(e, G()), n;
    if (t === 6) rt(e, r);
    else {
      if (l = e.current.alternate, !(r & 30) && !kf(l) && (t = nl(e, r), t === 2 && (i = pi(e), i !== 0 && (r = i, t = Bi(e, i))), t === 1)) throw n = Xn, jt(e, 0), rt(e, r), ge(e, G()), n;
      switch (e.finishedWork = l, e.finishedLanes = r, t) {
        case 0:
        case 1:
          throw Error(x(345));
        case 2:
          _t(e, pe, We);
          break;
        case 3:
          if (rt(e, r), (r & 130023424) === r && (t = Po + 500 - G(), 10 < t)) {
            if ($r(e, 0) !== 0) break;
            if (l = e.suspendedLanes, (l & r) !== r) {
              se(), e.pingedLanes |= e.suspendedLanes & l;
              break;
            }
            e.timeoutHandle = ki(_t.bind(null, e, pe, We), t);
            break;
          }
          _t(e, pe, We);
          break;
        case 4:
          if (rt(e, r), (r & 4194240) === r) break;
          for (t = e.eventTimes, l = -1; 0 < r; ) {
            var o = 31 - Me(r);
            i = 1 << o, o = t[o], o > l && (l = o), r &= ~i;
          }
          if (r = l, r = G() - r, r = (120 > r ? 120 : 480 > r ? 480 : 1080 > r ? 1080 : 1920 > r ? 1920 : 3e3 > r ? 3e3 : 4320 > r ? 4320 : 1960 * wf(r / 1960)) - r, 10 < r) {
            e.timeoutHandle = ki(_t.bind(null, e, pe, We), r);
            break;
          }
          _t(e, pe, We);
          break;
        case 5:
          _t(e, pe, We);
          break;
        default:
          throw Error(x(329));
      }
    }
  }
  return ge(e, G()), e.callbackNode === n ? Ga.bind(null, e) : null;
}
function Bi(e, t) {
  var n = Ln;
  return e.current.memoizedState.isDehydrated && (jt(e, t).flags |= 256), e = nl(e, t), e !== 2 && (t = pe, pe = n, t !== null && Vi(t)), e;
}
function Vi(e) {
  pe === null ? pe = e : pe.push.apply(pe, e);
}
function kf(e) {
  for (var t = e; ; ) {
    if (t.flags & 16384) {
      var n = t.updateQueue;
      if (n !== null && (n = n.stores, n !== null)) for (var r = 0; r < n.length; r++) {
        var l = n[r], i = l.getSnapshot;
        l = l.value;
        try {
          if (!Ie(i(), l)) return !1;
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
function rt(e, t) {
  for (t &= ~zo, t &= ~hl, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t; ) {
    var n = 31 - Me(t), r = 1 << n;
    e[n] = -1, t &= ~r;
  }
}
function Vu(e) {
  if (D & 6) throw Error(x(327));
  en();
  var t = $r(e, 0);
  if (!(t & 1)) return ge(e, G()), null;
  var n = nl(e, t);
  if (e.tag !== 0 && n === 2) {
    var r = pi(e);
    r !== 0 && (t = r, n = Bi(e, r));
  }
  if (n === 1) throw n = Xn, jt(e, 0), rt(e, t), ge(e, G()), n;
  if (n === 6) throw Error(x(345));
  return e.finishedWork = e.current.alternate, e.finishedLanes = t, _t(e, pe, We), ge(e, G()), null;
}
function To(e, t) {
  var n = D;
  D |= 1;
  try {
    return e(t);
  } finally {
    D = n, D === 0 && (sn = G() + 500, cl && yt());
  }
}
function Ot(e) {
  it !== null && it.tag === 0 && !(D & 6) && en();
  var t = D;
  D |= 1;
  var n = ze.transition, r = M;
  try {
    if (ze.transition = null, M = 1, e) return e();
  } finally {
    M = r, ze.transition = n, D = t, !(D & 6) && yt();
  }
}
function Lo() {
  xe = Yt.current, U(Yt);
}
function jt(e, t) {
  e.finishedWork = null, e.finishedLanes = 0;
  var n = e.timeoutHandle;
  if (n !== -1 && (e.timeoutHandle = -1, Zd(n)), Y !== null) for (n = Y.return; n !== null; ) {
    var r = n;
    switch (co(r), r.tag) {
      case 1:
        r = r.type.childContextTypes, r != null && Wr();
        break;
      case 3:
        on(), U(me), U(oe), wo();
        break;
      case 5:
        xo(r);
        break;
      case 4:
        on();
        break;
      case 13:
        U(B);
        break;
      case 19:
        U(B);
        break;
      case 10:
        mo(r.type._context);
        break;
      case 22:
      case 23:
        Lo();
    }
    n = n.return;
  }
  if (b = e, Y = e = pt(e.current, null), te = xe = t, Z = 0, Xn = null, zo = hl = Rt = 0, pe = Ln = null, Ct !== null) {
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
function Ya(e, t) {
  do {
    var n = Y;
    try {
      if (ho(), jr.current = qr, Jr) {
        for (var r = V.memoizedState; r !== null; ) {
          var l = r.queue;
          l !== null && (l.pending = null), r = r.next;
        }
        Jr = !1;
      }
      if (Lt = 0, q = X = V = null, Pn = !1, Kn = 0, jo.current = null, n === null || n.return === null) {
        Z = 1, Xn = t, Y = null;
        break;
      }
      e: {
        var i = e, o = n.return, u = n, s = t;
        if (t = te, u.flags |= 32768, s !== null && typeof s == "object" && typeof s.then == "function") {
          var d = s, h = u, g = h.tag;
          if (!(h.mode & 1) && (g === 0 || g === 11 || g === 15)) {
            var m = h.alternate;
            m ? (h.updateQueue = m.updateQueue, h.memoizedState = m.memoizedState, h.lanes = m.lanes) : (h.updateQueue = null, h.memoizedState = null);
          }
          var k = Pu(o);
          if (k !== null) {
            k.flags &= -257, Tu(k, o, u, i, t), k.mode & 1 && zu(i, d, t), t = k, s = d;
            var S = t.updateQueue;
            if (S === null) {
              var _ = /* @__PURE__ */ new Set();
              _.add(s), t.updateQueue = _;
            } else S.add(s);
            break e;
          } else {
            if (!(t & 1)) {
              zu(i, d, t), Ro();
              break e;
            }
            s = Error(x(426));
          }
        } else if (A && u.mode & 1) {
          var L = Pu(o);
          if (L !== null) {
            !(L.flags & 65536) && (L.flags |= 256), Tu(L, o, u, i, t), fo(un(s, u));
            break e;
          }
        }
        i = s = un(s, u), Z !== 4 && (Z = 2), Ln === null ? Ln = [i] : Ln.push(i), i = o;
        do {
          switch (i.tag) {
            case 3:
              i.flags |= 65536, t &= -t, i.lanes |= t;
              var f = La(i, s, t);
              Su(i, f);
              break e;
            case 1:
              u = s;
              var c = i.type, a = i.stateNode;
              if (!(i.flags & 128) && (typeof c.getDerivedStateFromError == "function" || a !== null && typeof a.componentDidCatch == "function" && (dt === null || !dt.has(a)))) {
                i.flags |= 65536, t &= -t, i.lanes |= t;
                var v = Ra(i, u, t);
                Su(i, v);
                break e;
              }
          }
          i = i.return;
        } while (i !== null);
      }
      Ja(n);
    } catch (w) {
      t = w, Y === n && n !== null && (Y = n = n.return);
      continue;
    }
    break;
  } while (!0);
}
function Xa() {
  var e = br.current;
  return br.current = qr, e === null ? qr : e;
}
function Ro() {
  (Z === 0 || Z === 3 || Z === 2) && (Z = 4), b === null || !(Rt & 268435455) && !(hl & 268435455) || rt(b, te);
}
function nl(e, t) {
  var n = D;
  D |= 2;
  var r = Xa();
  (b !== e || te !== t) && (We = null, jt(e, t));
  do
    try {
      Sf();
      break;
    } catch (l) {
      Ya(e, l);
    }
  while (!0);
  if (ho(), D = n, br.current = r, Y !== null) throw Error(x(261));
  return b = null, te = 0, Z;
}
function Sf() {
  for (; Y !== null; ) Za(Y);
}
function _f() {
  for (; Y !== null && !Gc(); ) Za(Y);
}
function Za(e) {
  var t = ba(e.alternate, e, xe);
  e.memoizedProps = e.pendingProps, t === null ? Ja(e) : Y = t, jo.current = null;
}
function Ja(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (e = t.return, t.flags & 32768) {
      if (n = vf(n, t), n !== null) {
        n.flags &= 32767, Y = n;
        return;
      }
      if (e !== null) e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
      else {
        Z = 6, Y = null;
        return;
      }
    } else if (n = mf(n, t, xe), n !== null) {
      Y = n;
      return;
    }
    if (t = t.sibling, t !== null) {
      Y = t;
      return;
    }
    Y = t = e;
  } while (t !== null);
  Z === 0 && (Z = 5);
}
function _t(e, t, n) {
  var r = M, l = ze.transition;
  try {
    ze.transition = null, M = 1, Ef(e, t, n, r);
  } finally {
    ze.transition = l, M = r;
  }
  return null;
}
function Ef(e, t, n, r) {
  do
    en();
  while (it !== null);
  if (D & 6) throw Error(x(327));
  n = e.finishedWork;
  var l = e.finishedLanes;
  if (n === null) return null;
  if (e.finishedWork = null, e.finishedLanes = 0, n === e.current) throw Error(x(177));
  e.callbackNode = null, e.callbackPriority = 0;
  var i = n.lanes | n.childLanes;
  if (rd(e, i), e === b && (Y = b = null, te = 0), !(n.subtreeFlags & 2064) && !(n.flags & 2064) || xr || (xr = !0, ec(Ir, function() {
    return en(), null;
  })), i = (n.flags & 15990) !== 0, n.subtreeFlags & 15990 || i) {
    i = ze.transition, ze.transition = null;
    var o = M;
    M = 1;
    var u = D;
    D |= 4, jo.current = null, yf(e, n), Qa(n, e), Wd(xi), Ur = !!yi, xi = yi = null, e.current = n, xf(n), Yc(), D = u, M = o, ze.transition = i;
  } else e.current = n;
  if (xr && (xr = !1, it = e, tl = l), i = e.pendingLanes, i === 0 && (dt = null), Jc(n.stateNode), ge(e, G()), t !== null) for (r = e.onRecoverableError, n = 0; n < t.length; n++) l = t[n], r(l.value, { componentStack: l.stack, digest: l.digest });
  if (el) throw el = !1, e = Ui, Ui = null, e;
  return tl & 1 && e.tag !== 0 && en(), i = e.pendingLanes, i & 1 ? e === Ai ? Rn++ : (Rn = 0, Ai = e) : Rn = 0, yt(), null;
}
function en() {
  if (it !== null) {
    var e = Ls(tl), t = ze.transition, n = M;
    try {
      if (ze.transition = null, M = 16 > e ? 16 : e, it === null) var r = !1;
      else {
        if (e = it, it = null, tl = 0, D & 6) throw Error(x(331));
        var l = D;
        for (D |= 4, C = e.current; C !== null; ) {
          var i = C, o = i.child;
          if (C.flags & 16) {
            var u = i.deletions;
            if (u !== null) {
              for (var s = 0; s < u.length; s++) {
                var d = u[s];
                for (C = d; C !== null; ) {
                  var h = C;
                  switch (h.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Tn(8, h, i);
                  }
                  var g = h.child;
                  if (g !== null) g.return = h, C = g;
                  else for (; C !== null; ) {
                    h = C;
                    var m = h.sibling, k = h.return;
                    if (Va(h), h === d) {
                      C = null;
                      break;
                    }
                    if (m !== null) {
                      m.return = k, C = m;
                      break;
                    }
                    C = k;
                  }
                }
              }
              var S = i.alternate;
              if (S !== null) {
                var _ = S.child;
                if (_ !== null) {
                  S.child = null;
                  do {
                    var L = _.sibling;
                    _.sibling = null, _ = L;
                  } while (_ !== null);
                }
              }
              C = i;
            }
          }
          if (i.subtreeFlags & 2064 && o !== null) o.return = i, C = o;
          else e: for (; C !== null; ) {
            if (i = C, i.flags & 2048) switch (i.tag) {
              case 0:
              case 11:
              case 15:
                Tn(9, i, i.return);
            }
            var f = i.sibling;
            if (f !== null) {
              f.return = i.return, C = f;
              break e;
            }
            C = i.return;
          }
        }
        var c = e.current;
        for (C = c; C !== null; ) {
          o = C;
          var a = o.child;
          if (o.subtreeFlags & 2064 && a !== null) a.return = o, C = a;
          else e: for (o = c; C !== null; ) {
            if (u = C, u.flags & 2048) try {
              switch (u.tag) {
                case 0:
                case 11:
                case 15:
                  pl(9, u);
              }
            } catch (w) {
              H(u, u.return, w);
            }
            if (u === o) {
              C = null;
              break e;
            }
            var v = u.sibling;
            if (v !== null) {
              v.return = u.return, C = v;
              break e;
            }
            C = u.return;
          }
        }
        if (D = l, yt(), Be && typeof Be.onPostCommitFiberRoot == "function") try {
          Be.onPostCommitFiberRoot(il, e);
        } catch {
        }
        r = !0;
      }
      return r;
    } finally {
      M = n, ze.transition = t;
    }
  }
  return !1;
}
function Wu(e, t, n) {
  t = un(n, t), t = La(e, t, 1), e = ct(e, t, 1), t = se(), e !== null && (Jn(e, 1, t), ge(e, t));
}
function H(e, t, n) {
  if (e.tag === 3) Wu(e, e, n);
  else for (; t !== null; ) {
    if (t.tag === 3) {
      Wu(t, e, n);
      break;
    } else if (t.tag === 1) {
      var r = t.stateNode;
      if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (dt === null || !dt.has(r))) {
        e = un(n, e), e = Ra(t, e, 1), t = ct(t, e, 1), e = se(), t !== null && (Jn(t, 1, e), ge(t, e));
        break;
      }
    }
    t = t.return;
  }
}
function Cf(e, t, n) {
  var r = e.pingCache;
  r !== null && r.delete(t), t = se(), e.pingedLanes |= e.suspendedLanes & n, b === e && (te & n) === n && (Z === 4 || Z === 3 && (te & 130023424) === te && 500 > G() - Po ? jt(e, 0) : zo |= n), ge(e, t);
}
function qa(e, t) {
  t === 0 && (e.mode & 1 ? (t = ar, ar <<= 1, !(ar & 130023424) && (ar = 4194304)) : t = 1);
  var n = se();
  e = Ze(e, t), e !== null && (Jn(e, t, n), ge(e, n));
}
function Nf(e) {
  var t = e.memoizedState, n = 0;
  t !== null && (n = t.retryLane), qa(e, n);
}
function jf(e, t) {
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
      throw Error(x(314));
  }
  r !== null && r.delete(t), qa(e, n);
}
var ba;
ba = function(e, t, n) {
  if (e !== null) if (e.memoizedProps !== t.pendingProps || me.current) he = !0;
  else {
    if (!(e.lanes & n) && !(t.flags & 128)) return he = !1, hf(e, t, n);
    he = !!(e.flags & 131072);
  }
  else he = !1, A && t.flags & 1048576 && ra(t, Kr, t.index);
  switch (t.lanes = 0, t.tag) {
    case 2:
      var r = t.type;
      Pr(e, t), e = t.pendingProps;
      var l = nn(t, oe.current);
      bt(t, n), l = So(null, t, r, e, l, n);
      var i = _o();
      return t.flags |= 1, typeof l == "object" && l !== null && typeof l.render == "function" && l.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, ve(r) ? (i = !0, Hr(t)) : i = !1, t.memoizedState = l.state !== null && l.state !== void 0 ? l.state : null, go(t), l.updater = fl, t.stateNode = l, l._reactInternals = t, zi(t, r, e, n), t = Li(null, t, r, !0, i, n)) : (t.tag = 0, A && i && ao(t), ue(null, t, l, n), t = t.child), t;
    case 16:
      r = t.elementType;
      e: {
        switch (Pr(e, t), e = t.pendingProps, l = r._init, r = l(r._payload), t.type = r, l = t.tag = Pf(r), e = Re(r, e), l) {
          case 0:
            t = Ti(null, t, r, e, n);
            break e;
          case 1:
            t = Ou(null, t, r, e, n);
            break e;
          case 11:
            t = Lu(null, t, r, e, n);
            break e;
          case 14:
            t = Ru(null, t, r, Re(r.type, e), n);
            break e;
        }
        throw Error(x(
          306,
          r,
          ""
        ));
      }
      return t;
    case 0:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : Re(r, l), Ti(e, t, r, l, n);
    case 1:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : Re(r, l), Ou(e, t, r, l, n);
    case 3:
      e: {
        if (Fa(t), e === null) throw Error(x(387));
        r = t.pendingProps, i = t.memoizedState, l = i.element, aa(e, t), Xr(t, r, null, n);
        var o = t.memoizedState;
        if (r = o.element, i.isDehydrated) if (i = { element: r, isDehydrated: !1, cache: o.cache, pendingSuspenseBoundaries: o.pendingSuspenseBoundaries, transitions: o.transitions }, t.updateQueue.baseState = i, t.memoizedState = i, t.flags & 256) {
          l = un(Error(x(423)), t), t = Du(e, t, r, n, l);
          break e;
        } else if (r !== l) {
          l = un(Error(x(424)), t), t = Du(e, t, r, n, l);
          break e;
        } else for (we = at(t.stateNode.containerInfo.firstChild), ke = t, A = !0, De = null, n = ua(t, null, r, n), t.child = n; n; ) n.flags = n.flags & -3 | 4096, n = n.sibling;
        else {
          if (rn(), r === l) {
            t = Je(e, t, n);
            break e;
          }
          ue(e, t, r, n);
        }
        t = t.child;
      }
      return t;
    case 5:
      return ca(t), e === null && Ci(t), r = t.type, l = t.pendingProps, i = e !== null ? e.memoizedProps : null, o = l.children, wi(r, l) ? o = null : i !== null && wi(r, i) && (t.flags |= 32), Ma(e, t), ue(e, t, o, n), t.child;
    case 6:
      return e === null && Ci(t), null;
    case 13:
      return Ia(e, t, n);
    case 4:
      return yo(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = ln(t, null, r, n) : ue(e, t, r, n), t.child;
    case 11:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : Re(r, l), Lu(e, t, r, l, n);
    case 7:
      return ue(e, t, t.pendingProps, n), t.child;
    case 8:
      return ue(e, t, t.pendingProps.children, n), t.child;
    case 12:
      return ue(e, t, t.pendingProps.children, n), t.child;
    case 10:
      e: {
        if (r = t.type._context, l = t.pendingProps, i = t.memoizedProps, o = l.value, I(Gr, r._currentValue), r._currentValue = o, i !== null) if (Ie(i.value, o)) {
          if (i.children === l.children && !me.current) {
            t = Je(e, t, n);
            break e;
          }
        } else for (i = t.child, i !== null && (i.return = t); i !== null; ) {
          var u = i.dependencies;
          if (u !== null) {
            o = i.child;
            for (var s = u.firstContext; s !== null; ) {
              if (s.context === r) {
                if (i.tag === 1) {
                  s = Ge(-1, n & -n), s.tag = 2;
                  var d = i.updateQueue;
                  if (d !== null) {
                    d = d.shared;
                    var h = d.pending;
                    h === null ? s.next = s : (s.next = h.next, h.next = s), d.pending = s;
                  }
                }
                i.lanes |= n, s = i.alternate, s !== null && (s.lanes |= n), Ni(
                  i.return,
                  n,
                  t
                ), u.lanes |= n;
                break;
              }
              s = s.next;
            }
          } else if (i.tag === 10) o = i.type === t.type ? null : i.child;
          else if (i.tag === 18) {
            if (o = i.return, o === null) throw Error(x(341));
            o.lanes |= n, u = o.alternate, u !== null && (u.lanes |= n), Ni(o, n, t), o = i.sibling;
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
      return l = t.type, r = t.pendingProps.children, bt(t, n), l = Pe(l), r = r(l), t.flags |= 1, ue(e, t, r, n), t.child;
    case 14:
      return r = t.type, l = Re(r, t.pendingProps), l = Re(r.type, l), Ru(e, t, r, l, n);
    case 15:
      return Oa(e, t, t.type, t.pendingProps, n);
    case 17:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : Re(r, l), Pr(e, t), t.tag = 1, ve(r) ? (e = !0, Hr(t)) : e = !1, bt(t, n), Ta(t, r, l), zi(t, r, l, n), Li(null, t, r, !0, e, n);
    case 19:
      return $a(e, t, n);
    case 22:
      return Da(e, t, n);
  }
  throw Error(x(156, t.tag));
};
function ec(e, t) {
  return js(e, t);
}
function zf(e, t, n, r) {
  this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
}
function je(e, t, n, r) {
  return new zf(e, t, n, r);
}
function Oo(e) {
  return e = e.prototype, !(!e || !e.isReactComponent);
}
function Pf(e) {
  if (typeof e == "function") return Oo(e) ? 1 : 0;
  if (e != null) {
    if (e = e.$$typeof, e === Ji) return 11;
    if (e === qi) return 14;
  }
  return 2;
}
function pt(e, t) {
  var n = e.alternate;
  return n === null ? (n = je(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 14680064, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n;
}
function Rr(e, t, n, r, l, i) {
  var o = 2;
  if (r = e, typeof e == "function") Oo(e) && (o = 1);
  else if (typeof e == "string") o = 5;
  else e: switch (e) {
    case $t:
      return zt(n.children, l, i, t);
    case Zi:
      o = 8, l |= 8;
      break;
    case ql:
      return e = je(12, n, t, l | 2), e.elementType = ql, e.lanes = i, e;
    case bl:
      return e = je(13, n, t, l), e.elementType = bl, e.lanes = i, e;
    case ei:
      return e = je(19, n, t, l), e.elementType = ei, e.lanes = i, e;
    case cs:
      return ml(n, l, i, t);
    default:
      if (typeof e == "object" && e !== null) switch (e.$$typeof) {
        case ss:
          o = 10;
          break e;
        case as:
          o = 9;
          break e;
        case Ji:
          o = 11;
          break e;
        case qi:
          o = 14;
          break e;
        case et:
          o = 16, r = null;
          break e;
      }
      throw Error(x(130, e == null ? e : typeof e, ""));
  }
  return t = je(o, n, t, l), t.elementType = e, t.type = r, t.lanes = i, t;
}
function zt(e, t, n, r) {
  return e = je(7, e, r, t), e.lanes = n, e;
}
function ml(e, t, n, r) {
  return e = je(22, e, r, t), e.elementType = cs, e.lanes = n, e.stateNode = { isHidden: !1 }, e;
}
function Yl(e, t, n) {
  return e = je(6, e, null, t), e.lanes = n, e;
}
function Xl(e, t, n) {
  return t = je(4, e.children !== null ? e.children : [], e.key, t), t.lanes = n, t.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }, t;
}
function Tf(e, t, n, r, l) {
  this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = Pl(0), this.expirationTimes = Pl(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Pl(0), this.identifierPrefix = r, this.onRecoverableError = l, this.mutableSourceEagerHydrationData = null;
}
function Do(e, t, n, r, l, i, o, u, s) {
  return e = new Tf(e, t, n, u, s), t === 1 ? (t = 1, i === !0 && (t |= 8)) : t = 0, i = je(3, null, null, t), e.current = i, i.stateNode = e, i.memoizedState = { element: r, isDehydrated: n, cache: null, transitions: null, pendingSuspenseBoundaries: null }, go(i), e;
}
function Lf(e, t, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return { $$typeof: It, key: r == null ? null : "" + r, children: e, containerInfo: t, implementation: n };
}
function tc(e) {
  if (!e) return mt;
  e = e._reactInternals;
  e: {
    if (Mt(e) !== e || e.tag !== 1) throw Error(x(170));
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
    throw Error(x(171));
  }
  if (e.tag === 1) {
    var n = e.type;
    if (ve(n)) return ta(e, n, t);
  }
  return t;
}
function nc(e, t, n, r, l, i, o, u, s) {
  return e = Do(n, r, !0, e, l, i, o, u, s), e.context = tc(null), n = e.current, r = se(), l = ft(n), i = Ge(r, l), i.callback = t ?? null, ct(n, i, l), e.current.lanes = l, Jn(e, l, r), ge(e, r), e;
}
function vl(e, t, n, r) {
  var l = t.current, i = se(), o = ft(l);
  return n = tc(n), t.context === null ? t.context = n : t.pendingContext = n, t = Ge(i, o), t.payload = { element: e }, r = r === void 0 ? null : r, r !== null && (t.callback = r), e = ct(l, t, o), e !== null && (Fe(e, l, o, i), Nr(e, l, o)), o;
}
function rl(e) {
  if (e = e.current, !e.child) return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function Hu(e, t) {
  if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t;
  }
}
function Mo(e, t) {
  Hu(e, t), (e = e.alternate) && Hu(e, t);
}
function Rf() {
  return null;
}
var rc = typeof reportError == "function" ? reportError : function(e) {
  console.error(e);
};
function Fo(e) {
  this._internalRoot = e;
}
gl.prototype.render = Fo.prototype.render = function(e) {
  var t = this._internalRoot;
  if (t === null) throw Error(x(409));
  vl(e, t, null, null);
};
gl.prototype.unmount = Fo.prototype.unmount = function() {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    Ot(function() {
      vl(null, e, null, null);
    }), t[Xe] = null;
  }
};
function gl(e) {
  this._internalRoot = e;
}
gl.prototype.unstable_scheduleHydration = function(e) {
  if (e) {
    var t = Ds();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < nt.length && t !== 0 && t < nt[n].priority; n++) ;
    nt.splice(n, 0, e), n === 0 && Fs(e);
  }
};
function Io(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
}
function yl(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "));
}
function Qu() {
}
function Of(e, t, n, r, l) {
  if (l) {
    if (typeof r == "function") {
      var i = r;
      r = function() {
        var d = rl(o);
        i.call(d);
      };
    }
    var o = nc(t, r, e, 0, null, !1, !1, "", Qu);
    return e._reactRootContainer = o, e[Xe] = o.current, Bn(e.nodeType === 8 ? e.parentNode : e), Ot(), o;
  }
  for (; l = e.lastChild; ) e.removeChild(l);
  if (typeof r == "function") {
    var u = r;
    r = function() {
      var d = rl(s);
      u.call(d);
    };
  }
  var s = Do(e, 0, !1, null, null, !1, !1, "", Qu);
  return e._reactRootContainer = s, e[Xe] = s.current, Bn(e.nodeType === 8 ? e.parentNode : e), Ot(function() {
    vl(t, s, n, r);
  }), s;
}
function xl(e, t, n, r, l) {
  var i = n._reactRootContainer;
  if (i) {
    var o = i;
    if (typeof l == "function") {
      var u = l;
      l = function() {
        var s = rl(o);
        u.call(s);
      };
    }
    vl(t, o, e, l);
  } else o = Of(n, t, e, l, r);
  return rl(o);
}
Rs = function(e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = Sn(t.pendingLanes);
        n !== 0 && (to(t, n | 1), ge(t, G()), !(D & 6) && (sn = G() + 500, yt()));
      }
      break;
    case 13:
      Ot(function() {
        var r = Ze(e, 1);
        if (r !== null) {
          var l = se();
          Fe(r, e, 1, l);
        }
      }), Mo(e, 1);
  }
};
no = function(e) {
  if (e.tag === 13) {
    var t = Ze(e, 134217728);
    if (t !== null) {
      var n = se();
      Fe(t, e, 134217728, n);
    }
    Mo(e, 134217728);
  }
};
Os = function(e) {
  if (e.tag === 13) {
    var t = ft(e), n = Ze(e, t);
    if (n !== null) {
      var r = se();
      Fe(n, e, t, r);
    }
    Mo(e, t);
  }
};
Ds = function() {
  return M;
};
Ms = function(e, t) {
  var n = M;
  try {
    return M = e, t();
  } finally {
    M = n;
  }
};
ci = function(e, t, n) {
  switch (t) {
    case "input":
      if (ri(e, n), t = n.name, n.type === "radio" && t != null) {
        for (n = e; n.parentNode; ) n = n.parentNode;
        for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < n.length; t++) {
          var r = n[t];
          if (r !== e && r.form === e.form) {
            var l = al(r);
            if (!l) throw Error(x(90));
            fs(r), ri(r, l);
          }
        }
      }
      break;
    case "textarea":
      hs(e, n);
      break;
    case "select":
      t = n.value, t != null && Xt(e, !!n.multiple, t, !1);
  }
};
ks = To;
Ss = Ot;
var Df = { usingClientEntryPoint: !1, Events: [bn, Vt, al, xs, ws, To] }, xn = { findFiberByHostInstance: Et, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, Mf = { bundleType: xn.bundleType, version: xn.version, rendererPackageName: xn.rendererPackageName, rendererConfig: xn.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: qe.ReactCurrentDispatcher, findHostInstanceByFiber: function(e) {
  return e = Cs(e), e === null ? null : e.stateNode;
}, findFiberByHostInstance: xn.findFiberByHostInstance || Rf, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var wr = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!wr.isDisabled && wr.supportsFiber) try {
    il = wr.inject(Mf), Be = wr;
  } catch {
  }
}
_e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Df;
_e.createPortal = function(e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!Io(t)) throw Error(x(200));
  return Lf(e, t, null, n);
};
_e.createRoot = function(e, t) {
  if (!Io(e)) throw Error(x(299));
  var n = !1, r = "", l = rc;
  return t != null && (t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onRecoverableError !== void 0 && (l = t.onRecoverableError)), t = Do(e, 1, !1, null, null, n, !1, r, l), e[Xe] = t.current, Bn(e.nodeType === 8 ? e.parentNode : e), new Fo(t);
};
_e.findDOMNode = function(e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function" ? Error(x(188)) : (e = Object.keys(e).join(","), Error(x(268, e)));
  return e = Cs(t), e = e === null ? null : e.stateNode, e;
};
_e.flushSync = function(e) {
  return Ot(e);
};
_e.hydrate = function(e, t, n) {
  if (!yl(t)) throw Error(x(200));
  return xl(null, e, t, !0, n);
};
_e.hydrateRoot = function(e, t, n) {
  if (!Io(e)) throw Error(x(405));
  var r = n != null && n.hydratedSources || null, l = !1, i = "", o = rc;
  if (n != null && (n.unstable_strictMode === !0 && (l = !0), n.identifierPrefix !== void 0 && (i = n.identifierPrefix), n.onRecoverableError !== void 0 && (o = n.onRecoverableError)), t = nc(t, null, e, 1, n ?? null, l, !1, i, o), e[Xe] = t.current, Bn(e), r) for (e = 0; e < r.length; e++) n = r[e], l = n._getVersion, l = l(n._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [n, l] : t.mutableSourceEagerHydrationData.push(
    n,
    l
  );
  return new gl(t);
};
_e.render = function(e, t, n) {
  if (!yl(t)) throw Error(x(200));
  return xl(null, e, t, !1, n);
};
_e.unmountComponentAtNode = function(e) {
  if (!yl(e)) throw Error(x(40));
  return e._reactRootContainer ? (Ot(function() {
    xl(null, null, e, !1, function() {
      e._reactRootContainer = null, e[Xe] = null;
    });
  }), !0) : !1;
};
_e.unstable_batchedUpdates = To;
_e.unstable_renderSubtreeIntoContainer = function(e, t, n, r) {
  if (!yl(n)) throw Error(x(200));
  if (e == null || e._reactInternals === void 0) throw Error(x(38));
  return xl(e, t, n, !1, r);
};
_e.version = "18.3.1-next-f1338f8080-20240426";
function lc() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(lc);
    } catch (e) {
      console.error(e);
    }
}
lc(), ls.exports = _e;
var Ff = ls.exports, ic, Ku = Ff;
ic = Ku.createRoot, Ku.hydrateRoot;
function Q({ name: e, className: t }) {
  return /* @__PURE__ */ p.jsx("span", { className: `icon-wrap ${t ?? ""}`, "aria-hidden": "true", children: /* @__PURE__ */ p.jsx("ha-icon", { icon: `mdi:${e}` }) });
}
function If() {
  return /* @__PURE__ */ p.jsxs("span", { className: "logo", "aria-hidden": "true", children: [
    /* @__PURE__ */ p.jsx("span", { className: "logo-ring" }),
    /* @__PURE__ */ p.jsxs("svg", { viewBox: "0 0 512 512", children: [
      /* @__PURE__ */ p.jsx("defs", { children: /* @__PURE__ */ p.jsxs("linearGradient", { id: "hrs-logo", x1: "0", y1: "0", x2: "1", y2: "1", children: [
        /* @__PURE__ */ p.jsx("stop", { offset: "0", stopColor: "#ffb020" }),
        /* @__PURE__ */ p.jsx("stop", { offset: ".5", stopColor: "#ff4f8b" }),
        /* @__PURE__ */ p.jsx("stop", { offset: "1", stopColor: "#5b6bff" })
      ] }) }),
      /* @__PURE__ */ p.jsx(
        "path",
        {
          fill: "url(#hrs-logo)",
          d: "M256 136C314 136 356 180 356 234C356 270 338 294 318 314C302 330 296 344 296 360L216 360C216 344 210 330 194 314C174 294 156 270 156 234C156 180 198 136 256 136Z"
        }
      ),
      /* @__PURE__ */ p.jsx("rect", { x: "216", y: "374", width: "80", height: "22", rx: "11", fill: "url(#hrs-logo)" })
    ] })
  ] });
}
const Or = { 6: "On/off", 8: "Dimming", 5: "Scenes" }, wl = (e) => String((e == null ? void 0 : e.message) ?? e), Zl = (e) => `0x${e.toString(16).padStart(4, "0").toUpperCase()}`, oc = (e) => "●".repeat(parseInt(e, 10) || 1);
function $f({ getHass: e, groups: t }) {
  const [n, r] = F.useState(null), [l, i] = F.useState(""), o = () => e().callWS({ type: "hue_remote_scenes/remotes" }).then((u) => r(u.remotes)).catch((u) => i(wl(u)));
  return F.useEffect(() => {
    o();
  }, [e]), l ? /* @__PURE__ */ p.jsx("div", { className: "status error", children: l }) : n ? n.length ? /* @__PURE__ */ p.jsxs("div", { className: "stack", children: [
    /* @__PURE__ */ p.jsxs("p", { className: "muted intro", children: [
      "Binding a remote to a group makes it control the lights directly over Zigbee, without Home Assistant. Battery remotes are asleep most of the time: ",
      /* @__PURE__ */ p.jsx("strong", { children: "press a button on the remote just before" }),
      " each step."
    ] }),
    n.map((u) => /* @__PURE__ */ p.jsx(Uf, { getHass: e, remote: u, groups: t, onChanged: o }, u.ieee))
  ] }) : /* @__PURE__ */ p.jsxs("div", { className: "empty-state", children: [
    /* @__PURE__ */ p.jsx(Q, { name: "remote-off" }),
    /* @__PURE__ */ p.jsx("p", { children: "No remotes found. Pair a remote (like a Hue Tap Dial) with ZHA first." })
  ] }) : null;
}
function Uf({ getHass: e, remote: t, groups: n, onChanged: r }) {
  var j;
  const [l, i] = F.useState(t.endpoints[0].id), [o, u] = F.useState(((j = n[0]) == null ? void 0 : j.id) ?? 0), [s, d] = F.useState(
    () => t.bound.flatMap((y) => y.clusters.map((E) => ({ endpoint: 0, cluster: E, group_id: y.group_id })))
  ), [h, g] = F.useState(t.checked), [m, k] = F.useState(!1), [S, _] = F.useState(null), L = t.endpoints.find((y) => y.id === l) ?? t.endpoints[0], f = (y) => {
    var E;
    return ((E = n.find((O) => O.id === y)) == null ? void 0 : E.name) ?? `Group ${y}`;
  }, c = async () => {
    const y = await e().callWS({ type: "hue_remote_scenes/bindings", ieee: t.ieee });
    d(y.bindings), g((/* @__PURE__ */ new Date()).toISOString());
  }, a = async (y, E = "Waiting for the remote…") => {
    k(E), _(null);
    try {
      const O = await y();
      O && _({ kind: O.includes("didn't") ? "error" : "ok", text: O });
    } catch (O) {
      _({ kind: "error", text: wl(O) });
    } finally {
      k(!1);
    }
  }, v = (y, E = o) => a(async () => {
    const O = await e().callWS({
      type: "hue_remote_scenes/bind",
      ieee: t.ieee,
      endpoint: L.id,
      group_id: E,
      clusters: L.clusters,
      unbind: y
    }), P = Object.entries(O.results).filter(([, ye]) => ye !== "ok"), de = y ? "Unbound from" : "Bound to";
    if (P.length === Object.keys(O.results).length)
      return "The remote didn't answer. Press a button on it and try again.";
    if (P.length)
      return `${de} ${f(E)}, but these didn't take: ${P.map(([ye, fe]) => `${Or[+ye] ?? ye} (${fe})`).join(", ")}`;
    try {
      await c();
    } catch {
      const ye = Object.entries(O.results).filter(([, fe]) => fe === "ok").map(([fe]) => +fe);
      d(
        (fe) => y ? fe.filter((xt) => !(xt.group_id === E && ye.includes(xt.cluster))) : [...fe, ...ye.map((xt) => ({ endpoint: L.id, cluster: xt, group_id: E }))]
      );
    }
    return `${de} ${f(E)}`;
  }), w = /* @__PURE__ */ new Map();
  for (const y of s) w.set(y.group_id, [...w.get(y.group_id) ?? [], y.cluster]);
  return /* @__PURE__ */ p.jsxs("section", { className: "card", children: [
    /* @__PURE__ */ p.jsxs("div", { className: "card-head", children: [
      /* @__PURE__ */ p.jsxs("div", { className: "title", children: [
        /* @__PURE__ */ p.jsx("span", { className: "icon-wrap title-icon", children: /* @__PURE__ */ p.jsx("ha-icon", { icon: "mdi:remote" }) }),
        /* @__PURE__ */ p.jsxs("div", { children: [
          /* @__PURE__ */ p.jsx("h2", { children: t.name }),
          /* @__PURE__ */ p.jsxs("div", { className: "muted small", children: [
            [t.area, [t.manufacturer, t.model].filter(Boolean).join(" ")].filter(Boolean).join(" · "),
            t.battery && " · battery"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ p.jsxs("button", { className: "ghost", disabled: !!m, onClick: () => a(async () => {
        await c();
      }), children: [
        /* @__PURE__ */ p.jsx(Q, { name: "link-variant" }),
        " Check bindings"
      ] })
    ] }),
    /* @__PURE__ */ p.jsxs("div", { className: "chips", children: [
      w.size ? [...w].map(([y, E]) => /* @__PURE__ */ p.jsxs("span", { className: "chip on", title: E.map((O) => Or[O] ?? O).join(", "), children: [
        /* @__PURE__ */ p.jsx(Q, { name: "link-variant" }),
        " ",
        f(y)
      ] }, y)) : /* @__PURE__ */ p.jsx("span", { className: "muted small", children: "No group bindings known." }),
      /* @__PURE__ */ p.jsx("span", { className: "muted small", children: h ? `Checked ${new Date(h).toLocaleString()}` : "Not checked on the remote yet" })
    ] }),
    /* @__PURE__ */ p.jsxs("div", { className: "inline-row", children: [
      t.endpoints.length > 1 && /* @__PURE__ */ p.jsx("select", { value: L.id, onChange: (y) => i(+y.target.value), "aria-label": "Button set", children: t.endpoints.map((y) => /* @__PURE__ */ p.jsxs("option", { value: y.id, children: [
        "Endpoint ",
        y.id
      ] }, y.id)) }),
      /* @__PURE__ */ p.jsx("select", { value: o, disabled: !n.length, onChange: (y) => u(+y.target.value), "aria-label": "Group", children: n.map((y) => /* @__PURE__ */ p.jsx("option", { value: y.id, children: y.name }, y.id)) }),
      /* @__PURE__ */ p.jsxs("button", { className: "primary", disabled: !!m || !n.length, onClick: () => v(!1), children: [
        /* @__PURE__ */ p.jsx(Q, { name: "link-variant-plus" }),
        " Bind"
      ] }),
      /* @__PURE__ */ p.jsxs("button", { disabled: !!m || !n.length, onClick: () => v(!0), children: [
        /* @__PURE__ */ p.jsx(Q, { name: "link-variant-off" }),
        " Unbind"
      ] })
    ] }),
    /* @__PURE__ */ p.jsxs("div", { className: "muted small", children: [
      "Sends: ",
      L.clusters.map((y) => Or[y] ?? y).join(", ")
    ] }),
    (t.dial_supported || t.dial) && /* @__PURE__ */ p.jsx(
      Af,
      {
        getHass: e,
        remote: t,
        groups: n,
        busy: !!m,
        bound: t.dial ? w.has(t.dial.group_id) : !1,
        act: a,
        onBind: (y) => v(!1, y),
        onChanged: r
      }
    ),
    m && /* @__PURE__ */ p.jsx("div", { className: "status busy", children: m }),
    S && /* @__PURE__ */ p.jsx("div", { className: `status ${S.kind}`, children: S.text })
  ] });
}
function Af({ getHass: e, remote: t, groups: n, busy: r, bound: l, act: i, onBind: o, onChanged: u }) {
  const s = t.dial, d = s ? n.find((a) => a.id === s.group_id) : void 0, [h, g] = F.useState(null), [m, k] = F.useState(/* @__PURE__ */ new Set()), [S, _] = F.useState(t.name);
  F.useEffect(() => {
    s && !d && !h && e().callWS({ type: "hue_remote_scenes/lights" }).then((a) => g(a.lights)).catch(() => g([]));
  }, [s, d, h, e]);
  const L = () => i(async () => {
    const a = await e().callWS({
      type: "hue_remote_scenes/find_dial_group",
      ieee: t.ieee
    });
    return u(), `Its scene buttons use group ${Zl(a.group_id)}${a.exists ? ", which ZHA already has" : ""}.`;
  }, "Press one of the dial's scene buttons now, then again every few seconds until this finishes…"), f = () => i(async () => (await e().callWS({ type: "hue_remote_scenes/create_group", group_id: s.group_id, name: S, members: [...m] }), `Created ${S}. Now bind the dial to it.`), "Adding the lights to the group…"), c = (a) => k((v) => {
    const w = new Set(v);
    return w.has(a) ? w.delete(a) : w.add(a), w;
  });
  return /* @__PURE__ */ p.jsxs("div", { className: "dial-setup", children: [
    /* @__PURE__ */ p.jsx("h3", { children: "Scene buttons" }),
    s ? /* @__PURE__ */ p.jsx(p.Fragment, { children: /* @__PURE__ */ p.jsxs("ol", { className: "steps", children: [
      /* @__PURE__ */ p.jsxs("li", { className: "done", children: [
        "Its buttons use group ",
        /* @__PURE__ */ p.jsx("code", { children: Zl(s.group_id) }),
        " ",
        /* @__PURE__ */ p.jsx("button", { className: "ghost small-btn", disabled: r, onClick: L, children: "Find again" })
      ] }),
      /* @__PURE__ */ p.jsx("li", { className: d ? "done" : "", children: d ? /* @__PURE__ */ p.jsxs(p.Fragment, { children: [
        "Group ",
        /* @__PURE__ */ p.jsx("strong", { children: d.name }),
        " has ",
        d.members.length,
        " light",
        d.members.length === 1 ? "" : "s",
        "."
      ] }) : /* @__PURE__ */ p.jsxs(p.Fragment, { children: [
        "Create the group with the lights this dial should control:",
        /* @__PURE__ */ p.jsxs("div", { className: "light-picks", children: [
          (h ?? []).map((a) => /* @__PURE__ */ p.jsxs("label", { className: "pick", children: [
            /* @__PURE__ */ p.jsx("input", { type: "checkbox", checked: m.has(a.key), onChange: () => c(a.key) }),
            " ",
            a.name
          ] }, a.key)),
          h && !h.length && /* @__PURE__ */ p.jsx("span", { className: "muted small", children: "No lights that can store scenes found." })
        ] }),
        /* @__PURE__ */ p.jsxs("div", { className: "inline-row", children: [
          /* @__PURE__ */ p.jsx("input", { type: "text", value: S, maxLength: 40, onChange: (a) => _(a.target.value), "aria-label": "Group name" }),
          /* @__PURE__ */ p.jsxs("button", { className: "primary", disabled: r || !m.size || !S.trim(), onClick: f, children: [
            /* @__PURE__ */ p.jsx(Q, { name: "plus" }),
            " Create group"
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ p.jsx("li", { className: l ? "done" : "", children: l ? /* @__PURE__ */ p.jsxs(p.Fragment, { children: [
        "Bound to ",
        (d == null ? void 0 : d.name) ?? Zl(s.group_id),
        "."
      ] }) : /* @__PURE__ */ p.jsxs(p.Fragment, { children: [
        "Bind the dial to it (press a dial button first):",
        " ",
        /* @__PURE__ */ p.jsxs("button", { disabled: r || !d, onClick: () => o(s.group_id), children: [
          /* @__PURE__ */ p.jsx(Q, { name: "link-variant-plus" }),
          " Bind"
        ] })
      ] }) }),
      /* @__PURE__ */ p.jsxs("li", { children: [
        "Save a scene for each button (",
        s.buttons.map(([a]) => oc(a)).join("  "),
        ") on the",
        " ",
        /* @__PURE__ */ p.jsx("strong", { children: "Scenes" }),
        " tab, in ",
        d ? /* @__PURE__ */ p.jsx("strong", { children: d.name }) : "the group",
        "."
      ] })
    ] }) }) : /* @__PURE__ */ p.jsxs(p.Fragment, { children: [
      /* @__PURE__ */ p.jsx("p", { className: "muted small", children: "This dial's buttons can recall scenes stored in the lights directly, even when Home Assistant is down. First, find the group the dial uses (it's fixed in each dial)." }),
      /* @__PURE__ */ p.jsx("div", { className: "inline-row", children: /* @__PURE__ */ p.jsxs("button", { className: "primary", disabled: r, onClick: L, children: [
        /* @__PURE__ */ p.jsx(Q, { name: "magnify" }),
        " Find its group"
      ] }) })
    ] })
  ] });
}
function Bf({ getHass: e, groups: t, onChanged: n }) {
  return /* @__PURE__ */ p.jsxs("div", { className: "stack", children: [
    /* @__PURE__ */ p.jsxs("p", { className: "muted intro", children: [
      "Scenes are saved on the lights themselves, so a bound remote can recall them even when Home Assistant is down. Set the lights how you want them, then save. Each scene also becomes a ",
      /* @__PURE__ */ p.jsx("code", { children: "scene." }),
      " entity."
    ] }),
    t.map((r) => /* @__PURE__ */ p.jsx(Vf, { getHass: e, group: r, onChanged: n }, r.id))
  ] });
}
function Vf({ getHass: e, group: t, onChanged: n }) {
  var c;
  const [r, l] = F.useState(!1), [i, o] = F.useState(null), [u, s] = F.useState(""), d = Object.fromEntries(t.members.map((a) => [a.key, a.name])), h = t.members.filter((a) => a.scenes), g = (a) => a.map((v) => d[v] ?? v).join(", "), m = ((c = t.dials[0]) == null ? void 0 : c.buttons) ?? [], k = new Set(t.dials.flatMap((a) => a.buttons.map((v) => v.scene_id))), S = t.scenes.filter((a) => !k.has(a.id)), _ = async (a, v) => {
    l(!0), o(null);
    try {
      const w = await e().callWS({ group_id: t.id, ...a });
      o({ kind: w != null && w.failed && Object.keys(w.failed).length ? "error" : "ok", text: v(w) }), n();
    } catch (w) {
      o({ kind: "error", text: wl(w) });
    } finally {
      l(!1);
    }
  }, L = (a) => (v) => {
    const w = Object.keys(v.failed);
    return w.length ? `${a} on ${v.ok.length} of ${v.ok.length + w.length} lights. Didn't answer: ${g(w)}` : `${a} on ${v.ok.length} light${v.ok.length === 1 ? "" : "s"}`;
  }, f = () => {
    u.trim() && _({ type: "hue_remote_scenes/store", name: u }, L("Saved")).then(() => s(""));
  };
  return /* @__PURE__ */ p.jsxs("section", { className: "card", children: [
    /* @__PURE__ */ p.jsxs("div", { className: "card-head", children: [
      /* @__PURE__ */ p.jsxs("div", { className: "title", children: [
        /* @__PURE__ */ p.jsx("span", { className: "icon-wrap title-icon", children: /* @__PURE__ */ p.jsx("ha-icon", { icon: "mdi:lightbulb-group-outline" }) }),
        /* @__PURE__ */ p.jsxs("div", { children: [
          /* @__PURE__ */ p.jsx("h2", { children: t.name }),
          /* @__PURE__ */ p.jsxs("div", { className: "muted small", children: [
            "Group ",
            t.id,
            " · ",
            h.length,
            " light",
            h.length === 1 ? "" : "s",
            t.members.length > h.length && ` (+${t.members.length - h.length} without scenes)`
          ] }),
          (t.areas.length > 0 || t.remotes.length > 0) && /* @__PURE__ */ p.jsxs("div", { className: "chips meta", children: [
            t.areas.map((a) => /* @__PURE__ */ p.jsxs("span", { className: "chip", title: "Area", children: [
              /* @__PURE__ */ p.jsx(Q, { name: "home-outline" }),
              " ",
              a
            ] }, a)),
            t.remotes.map((a) => /* @__PURE__ */ p.jsxs("span", { className: "chip on", title: `Bound remote: ${a.clusters.map((v) => Or[v] ?? v).join(", ")}`, children: [
              /* @__PURE__ */ p.jsx(Q, { name: "remote" }),
              " ",
              a.name
            ] }, a.ieee))
          ] })
        ] })
      ] }),
      /* @__PURE__ */ p.jsxs(
        "button",
        {
          className: "ghost",
          disabled: r || !h.length,
          title: "Ask the lights which scenes they already have, e.g. ones made in Zigbee2MQTT",
          onClick: () => _(
            { type: "hue_remote_scenes/import" },
            (a) => a.added.length ? `Found ${a.added.length} new scene${a.added.length === 1 ? "" : "s"}. Give them names below.` : a.found.length ? "No new scenes. The ones on the lights are all listed here." : "The lights have no scenes for this group yet."
          ),
          children: [
            /* @__PURE__ */ p.jsx(Q, { name: "database-import-outline" }),
            " Import from lights"
          ]
        }
      )
    ] }),
    h.length ? /* @__PURE__ */ p.jsxs(p.Fragment, { children: [
      m.length > 0 && /* @__PURE__ */ p.jsxs("div", { className: "dial-buttons", children: [
        /* @__PURE__ */ p.jsxs("h3", { children: [
          t.dials.map((a) => a.name).join(", "),
          " buttons"
        ] }),
        m.map((a) => /* @__PURE__ */ p.jsx(
          Hf,
          {
            button: a,
            scene: t.scenes.find((v) => v.id === a.scene_id),
            busy: r,
            onSave: (v) => _({ type: "hue_remote_scenes/store", scene_id: a.scene_id, ...v ? { name: v } : {} }, L("Saved")),
            onRecall: () => _({ type: "hue_remote_scenes/recall", scene_id: a.scene_id }, () => "Recalled")
          },
          a.scene_id
        )),
        /* @__PURE__ */ p.jsx("p", { className: "muted small", children: "Hold any button to turn the lights off. Turn the dial to dim." })
      ] }),
      /* @__PURE__ */ p.jsxs("div", { className: "scenes", children: [
        m.length > 0 && /* @__PURE__ */ p.jsx("h3", { children: "Other scenes" }),
        S.map((a) => /* @__PURE__ */ p.jsx(
          Wf,
          {
            scene: a,
            total: h.length,
            busy: r,
            missing: g(h.map((v) => v.key).filter((v) => !a.members.includes(v))),
            onRecall: () => _({ type: "hue_remote_scenes/recall", scene_id: a.id }, () => `Recalled ${a.name}`),
            onUpdate: () => {
              confirm(`Overwrite "${a.name}" with how the lights are now?`) && _({ type: "hue_remote_scenes/store", scene_id: a.id }, L("Updated"));
            },
            onRename: (v) => _({ type: "hue_remote_scenes/rename", scene_id: a.id, name: v }, () => "Renamed"),
            onDelete: () => {
              confirm(`Delete "${a.name}" from the lights?`) && _(
                { type: "hue_remote_scenes/delete", scene_id: a.id },
                (v) => Object.keys(v.failed).length ? `Deleted, but some lights didn't answer and may still have it: ${g(Object.keys(v.failed))}` : `Deleted ${a.name}`
              );
            }
          },
          a.id
        )),
        !S.length && /* @__PURE__ */ p.jsxs("p", { className: "muted", children: [
          "No ",
          m.length ? "other " : "",
          "scenes yet."
        ] })
      ] }),
      /* @__PURE__ */ p.jsxs(
        "form",
        {
          className: "inline-row new-scene",
          onSubmit: (a) => {
            a.preventDefault(), f();
          },
          children: [
            /* @__PURE__ */ p.jsx(
              "input",
              {
                type: "text",
                placeholder: "New scene name",
                value: u,
                maxLength: 40,
                onChange: (a) => s(a.target.value)
              }
            ),
            /* @__PURE__ */ p.jsxs("button", { className: "primary", type: "submit", disabled: r || !u.trim(), children: [
              /* @__PURE__ */ p.jsx(Q, { name: "content-save-outline" }),
              " Save current state"
            ] })
          ]
        }
      )
    ] }) : /* @__PURE__ */ p.jsx("p", { className: "muted", children: "None of this group's devices can store scenes." }),
    r && /* @__PURE__ */ p.jsx("div", { className: "status busy", children: "Talking to the lights…" }),
    i && /* @__PURE__ */ p.jsx("div", { className: `status ${i.kind}`, children: i.text })
  ] });
}
function Wf({ scene: e, total: t, busy: n, missing: r, onRecall: l, onUpdate: i, onRename: o, onDelete: u }) {
  const [s, d] = F.useState(!1), [h, g] = F.useState(e.name), m = e.members.length;
  return /* @__PURE__ */ p.jsxs("div", { className: "scene-row", children: [
    /* @__PURE__ */ p.jsx("button", { className: "recall", disabled: n, onClick: l, title: "Recall", children: /* @__PURE__ */ p.jsx(Q, { name: "play" }) }),
    /* @__PURE__ */ p.jsx("div", { className: "scene-main", children: s ? /* @__PURE__ */ p.jsxs(
      "form",
      {
        className: "inline-row",
        onSubmit: (k) => {
          k.preventDefault(), d(!1), h.trim() && h !== e.name && o(h);
        },
        children: [
          /* @__PURE__ */ p.jsx("input", { type: "text", value: h, maxLength: 40, autoFocus: !0, onChange: (k) => g(k.target.value) }),
          /* @__PURE__ */ p.jsx("button", { type: "submit", children: "Save" })
        ]
      }
    ) : /* @__PURE__ */ p.jsxs(p.Fragment, { children: [
      /* @__PURE__ */ p.jsx("div", { className: "scene-name", children: e.name }),
      /* @__PURE__ */ p.jsxs("div", { className: "muted small", children: [
        "Scene ",
        e.id,
        m < t && /* @__PURE__ */ p.jsxs("span", { className: "chip warn", title: `Missing on: ${r}`, children: [
          "on ",
          m,
          " of ",
          t,
          " lights"
        ] })
      ] })
    ] }) }),
    !s && /* @__PURE__ */ p.jsxs("div", { className: "actions", children: [
      /* @__PURE__ */ p.jsx("button", { className: "ghost round", disabled: n, onClick: () => {
        g(e.name), d(!0);
      }, title: "Rename", children: /* @__PURE__ */ p.jsx(Q, { name: "pencil-outline" }) }),
      /* @__PURE__ */ p.jsx("button", { className: "ghost round", disabled: n, onClick: i, title: "Overwrite with the current state", children: /* @__PURE__ */ p.jsx(Q, { name: "content-save-edit-outline" }) }),
      /* @__PURE__ */ p.jsx("button", { className: "danger round", disabled: n, onClick: u, title: "Delete", children: /* @__PURE__ */ p.jsx(Q, { name: "delete-outline" }) })
    ] })
  ] });
}
function Hf({ button: e, scene: t, busy: n, onSave: r, onRecall: l }) {
  const [i, o] = F.useState("");
  return /* @__PURE__ */ p.jsxs("div", { className: "scene-row", children: [
    /* @__PURE__ */ p.jsx("span", { className: "dots", title: e.label, children: oc(e.label) }),
    t ? /* @__PURE__ */ p.jsxs(p.Fragment, { children: [
      /* @__PURE__ */ p.jsx("button", { className: "recall", disabled: n, onClick: l, title: "Recall", children: /* @__PURE__ */ p.jsx(Q, { name: "play" }) }),
      /* @__PURE__ */ p.jsxs("div", { className: "scene-main", children: [
        /* @__PURE__ */ p.jsx("div", { className: "scene-name", children: t.name }),
        /* @__PURE__ */ p.jsxs("div", { className: "muted small", children: [
          e.label,
          " · scene ",
          e.scene_id
        ] })
      ] }),
      /* @__PURE__ */ p.jsx(
        "button",
        {
          className: "ghost round",
          disabled: n,
          title: "Overwrite with the current state",
          onClick: () => confirm(`Overwrite "${t.name}" with how the lights are now?`) && r(null),
          children: /* @__PURE__ */ p.jsx(Q, { name: "content-save-edit-outline" })
        }
      )
    ] }) : /* @__PURE__ */ p.jsxs(
      "form",
      {
        className: "inline-row scene-main",
        onSubmit: (u) => {
          u.preventDefault(), i.trim() && r(i);
        },
        children: [
          /* @__PURE__ */ p.jsx("input", { type: "text", placeholder: `Scene for ${e.label}`, value: i, maxLength: 40, onChange: (u) => o(u.target.value) }),
          /* @__PURE__ */ p.jsxs("button", { type: "submit", disabled: n || !i.trim(), children: [
            /* @__PURE__ */ p.jsx(Q, { name: "content-save-outline" }),
            " Save current state"
          ] })
        ]
      }
    )
  ] });
}
const Qf = [
  { id: "scenes", label: "Scenes", icon: "palette-outline" },
  { id: "remotes", label: "Remotes", icon: "remote" }
];
function Kf({ getHass: e, narrow: t, onToggleMenu: n }) {
  const [r, l] = F.useState(null), [i, o] = F.useState("scenes"), [u, s] = F.useState(""), d = F.useCallback(() => {
    e().callWS({ type: "hue_remote_scenes/groups" }).then((h) => {
      l(h.groups), s("");
    }).catch((h) => s(wl(h)));
  }, [e]);
  return F.useEffect(() => {
    d();
    const h = e().connection.subscribeMessage(d, { type: "hue_remote_scenes/subscribe" });
    return () => {
      h.then((g) => g()).catch(() => {
      });
    };
  }, [e, d]), /* @__PURE__ */ p.jsxs("div", { className: "panel", children: [
    /* @__PURE__ */ p.jsxs("header", { children: [
      /* @__PURE__ */ p.jsxs("div", { className: "toolbar-row", children: [
        t && /* @__PURE__ */ p.jsx("button", { className: "menu", onClick: n, "aria-label": "Menu", children: /* @__PURE__ */ p.jsx(Q, { name: "menu" }) }),
        /* @__PURE__ */ p.jsx(If, {}),
        /* @__PURE__ */ p.jsx("h1", { children: "Hue remote scenes" })
      ] }),
      /* @__PURE__ */ p.jsx("nav", { className: "tabs", role: "tablist", children: Qf.map((h) => /* @__PURE__ */ p.jsxs("button", { role: "tab", "aria-selected": h.id === i, className: h.id === i ? "on" : "", onClick: () => o(h.id), children: [
        /* @__PURE__ */ p.jsx(Q, { name: h.icon }),
        /* @__PURE__ */ p.jsx("span", { children: h.label })
      ] }, h.id)) })
    ] }),
    /* @__PURE__ */ p.jsxs("main", { children: [
      u && /* @__PURE__ */ p.jsx("div", { className: "status error", children: u }),
      r && !r.length && i === "scenes" && /* @__PURE__ */ p.jsxs("div", { className: "empty-state", children: [
        /* @__PURE__ */ p.jsx(Q, { name: "lightbulb-group-outline" }),
        /* @__PURE__ */ p.jsx("p", { children: "No ZHA groups yet. Create one under Settings → Devices & services → Zigbee Home Automation → Configure → Groups, and add your lights to it. For a Hue Tap Dial, use the Remotes tab instead: it creates the group the dial needs." })
      ] }),
      r && !!r.length && i === "scenes" && /* @__PURE__ */ p.jsx(Bf, { getHass: e, groups: r, onChanged: d }),
      r && i === "remotes" && /* @__PURE__ */ p.jsx($f, { getHass: e, groups: r })
    ] })
  ] });
}
const Gf = (
  /* css */
  `
:host {
  --hl-idle: var(--secondary-text-color, #727272);
  --hl-off: var(--disabled-text-color, #9e9e9e);
  --hl-off-fill: color-mix(in srgb, var(--secondary-text-color, #888) 18%, transparent);
  --hl-radius: var(--ha-card-border-radius, 16px);
  --hl-soft: color-mix(in srgb, var(--primary-text-color, #000) 6%, transparent);
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
.muted { color: var(--secondary-text-color); font-size: 14px; }
.small { font-size: 12px; }

/* Header: toolbar + tabs, like HA's own panels */
header { position: sticky; top: 0; z-index: 2; background: var(--app-header-background-color, var(--primary-color)); color: var(--app-header-text-color, #fff); border-bottom: var(--app-header-border-bottom, none); }
.toolbar-row { display: flex; align-items: center; gap: 10px; height: 56px; padding: 0 16px; }
.toolbar-row h1 { font-size: 20px; font-weight: 400; margin: 0; }
.logo { position: relative; width: 28px; height: 28px; flex: none; }
.logo svg { position: absolute; inset: 0; width: 100%; height: 100%; }
.logo-ring { position: absolute; inset: 1px; border-radius: 50%; background: conic-gradient(#ffb020, #ff6a3d, #ff4f8b, #b65cff, #5b6bff, #2f9bff, #19c3c0, #7fd36b, #ffb020); -webkit-mask: radial-gradient(circle, transparent 9.6px, #000 10.2px); mask: radial-gradient(circle, transparent 9.6px, #000 10.2px); }
.toolbar-row .menu { background: transparent; border: 0; color: inherit; padding: 8px; margin-left: -8px; border-radius: 50%; }
.toolbar-row .menu:hover { background: rgba(255,255,255,.12); }
.device-name { font-size: 14px; opacity: .8; }
.device-select { background: rgba(255,255,255,.14); color: inherit; border-color: transparent; }
.device-select option { color: var(--primary-text-color); background: var(--card-background-color); }
.tabs { display: flex; gap: 2px; padding: 0 8px; overflow-x: auto; scrollbar-width: none; }
.tabs button { flex: none; display: inline-flex; align-items: center; gap: 8px; border: 0; border-radius: 0; background: transparent; color: inherit; opacity: .72; padding: 12px 14px 10px; border-bottom: 2px solid transparent; font-weight: 500; letter-spacing: .01em; }
.tabs button:hover { opacity: .95; background: rgba(255,255,255,.06); }
.tabs button.on { opacity: 1; border-bottom-color: currentColor; }
.tabs .icon-wrap { --mdc-icon-size: 18px; }

main { max-width: 1040px; margin: 0 auto; padding: 20px 16px 32px; display: flex; flex-direction: column; gap: 16px; }
.stack { display: flex; flex-direction: column; gap: 16px; }

/* Cards */
.card { background: var(--card-background-color); border-radius: var(--hl-radius); box-shadow: var(--ha-card-box-shadow, 0 1px 3px rgba(0,0,0,.08)); border: 1px solid var(--divider-color); padding: 18px; display: flex; flex-direction: column; gap: 14px; }
.card-head { display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap; }
.title { display: flex; align-items: center; gap: 12px; }
.title-icon { width: 40px; height: 40px; border-radius: 12px; --mdc-icon-size: 22px; background: color-mix(in srgb, var(--hl-accent, var(--primary-color)) 14%, transparent); color: var(--hl-accent, var(--primary-color)); }
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
select, input[type=text] { font: inherit; font-size: 14px; padding: 8px 10px; border-radius: 10px; border: 1px solid var(--divider-color); background: var(--card-background-color); color: var(--primary-text-color); color-scheme: light dark; }
.toolbar, .actions, .inline-row { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; }
.inline-row { gap: 12px; }

.segmented { display: inline-flex; padding: 3px; gap: 3px; border-radius: 12px; background: var(--hl-soft); }
.segmented.full { display: flex; }
.segmented.full button { flex: 1; }
.segmented button { border: 0; border-radius: 9px; background: transparent; padding: 7px 12px; color: var(--secondary-text-color); }
.segmented button.on { background: var(--card-background-color); color: var(--primary-text-color); box-shadow: 0 1px 3px rgba(0,0,0,.15); font-weight: 500; }
.segmented .raw { padding: 7px 10px; }

.chip { display: inline-flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 500; padding: 4px 10px; border-radius: 999px; background: var(--hl-soft); color: var(--secondary-text-color); white-space: nowrap; }
.chip .icon-wrap { --mdc-icon-size: 14px; }
.chip.unsaved { background: color-mix(in srgb, var(--warning-color, #ffa600) 18%, transparent); color: var(--warning-color, #ffa600); }
.chips { display: flex; flex-wrap: wrap; gap: 8px; }
.chip-btn { border-radius: 999px; padding: 6px 14px; }
.chip-btn.on { background: color-mix(in srgb, var(--hl-accent, var(--primary-color)) 16%, transparent); border-color: var(--hl-accent, var(--primary-color)); color: var(--hl-accent, var(--primary-color)); font-weight: 500; }

.status { padding: 10px 14px; border-radius: 10px; font-size: 14px; background: var(--hl-soft); }
.status.ok { background: color-mix(in srgb, var(--success-color, #43a047) 14%, transparent); }
.status.error { background: color-mix(in srgb, var(--error-color, #db4437) 14%, transparent); color: var(--error-color); }
.status.busy { opacity: .8; }

.empty-state { display: flex; flex-direction: column; align-items: center; gap: 8px; text-align: center; padding: 48px 16px; color: var(--secondary-text-color); }
.empty-state .icon-wrap { --mdc-icon-size: 48px; opacity: .5; }

/* Scenes */
.intro { margin: 0; line-height: 1.5; }
code { font-size: 13px; padding: 1px 5px; border-radius: 6px; background: var(--hl-soft); }
.scenes { display: flex; flex-direction: column; }
.scene-row { display: flex; align-items: center; gap: 12px; padding: 10px 0; border-bottom: 1px solid var(--divider-color); }
.scene-row:last-child { border-bottom: 0; }
.scene-main { flex: 1; min-width: 0; }
.scene-name { font-weight: 500; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.scene-main .small { display: flex; align-items: center; gap: 8px; margin-top: 2px; }
.recall { width: 40px; height: 40px; padding: 0; border-radius: 50%; border-color: transparent; background: color-mix(in srgb, var(--primary-color) 14%, transparent); color: var(--primary-color); }
.recall:hover:not(:disabled) { background: color-mix(in srgb, var(--primary-color) 24%, transparent) !important; }
.chip.warn { background: color-mix(in srgb, var(--warning-color, #ffa600) 18%, transparent); color: var(--warning-color, #ffa600); }
.chip.on { background: color-mix(in srgb, var(--primary-color) 14%, transparent); color: var(--primary-color); }
.dial-buttons { display: flex; flex-direction: column; padding: 4px 12px; border-radius: 12px; background: var(--hl-soft); }
.dots { width: 44px; flex: none; letter-spacing: 1px; color: var(--primary-color); font-size: 12px; }
.scenes h3, .dial-buttons h3 { margin: 8px 0 2px; }
.dial-setup { display: flex; flex-direction: column; gap: 8px; padding-top: 12px; border-top: 1px solid var(--divider-color); }
.dial-setup h3 { margin: 0; }
.steps { margin: 0; padding-left: 22px; display: flex; flex-direction: column; gap: 10px; }
.steps li { line-height: 1.6; }
.steps li.done::marker { color: var(--success-color, #43a047); }
.light-picks { display: flex; flex-wrap: wrap; gap: 6px 14px; margin: 6px 0; }
.pick { display: inline-flex; align-items: center; gap: 6px; font-size: 14px; cursor: pointer; }
.small-btn { padding: 2px 6px; font-size: 12px; }
.chips.meta { margin-top: 6px; gap: 6px; }
.new-scene input { flex: 1; min-width: 160px; }
input[type=text] { min-width: 0; }

@media (max-width: 600px) {
  main { padding: 12px 8px 24px; gap: 12px; }
  .card { padding: 14px; }
  .tabs { padding: 0 4px; }
  .tabs button { padding: 12px 10px 10px; font-size: 13px; }
  .new-scene button { flex: 1; }
}
`
);
class Yf extends HTMLElement {
  constructor() {
    super(...arguments);
    rr(this, "_hass");
    rr(this, "_narrow", !1);
    rr(this, "_root");
  }
  set hass(n) {
    const r = !this._hass;
    this._hass = n, r && this._render();
  }
  set narrow(n) {
    n !== this._narrow && (this._narrow = n, this._render());
  }
  connectedCallback() {
    if (!this._root) {
      const n = this.shadowRoot ?? this.attachShadow({ mode: "open" }), r = document.createElement("style");
      r.textContent = Gf;
      const l = document.createElement("div");
      n.append(r, l), this._root = ic(l);
    }
    this._render();
  }
  disconnectedCallback() {
    var n, r;
    (n = this._root) == null || n.unmount(), this._root = void 0, (r = this.shadowRoot) == null || r.replaceChildren();
  }
  _render() {
    !this._root || !this._hass || this._root.render(
      /* @__PURE__ */ p.jsx(
        Kf,
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
customElements.get("hue-remote-scenes-panel") || customElements.define("hue-remote-scenes-panel", Yf);
