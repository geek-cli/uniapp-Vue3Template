import {
  __toESM,
  init_define_process_env_UNI_STAT_TITLE_JSON,
  require_runtime
} from "./chunk-JEKNGR43.js";

// dep:uni-crazy-router
init_define_process_env_UNI_STAT_TITLE_JSON();

// ../../../Desktop/uniapp-Vue3Template/node_modules/uni-crazy-router/dist/index.js
init_define_process_env_UNI_STAT_TITLE_JSON();
var import_regenerator_runtime = __toESM(require_runtime());
function t(t2, e2) {
  var r2 = Object.keys(t2);
  if (Object.getOwnPropertySymbols) {
    var n2 = Object.getOwnPropertySymbols(t2);
    e2 && (n2 = n2.filter(function(e3) {
      return Object.getOwnPropertyDescriptor(t2, e3).enumerable;
    })), r2.push.apply(r2, n2);
  }
  return r2;
}
function e(e2) {
  for (var r2 = 1; arguments.length > r2; r2++) {
    var n2 = arguments[r2] != null ? arguments[r2] : {};
    r2 % 2 ? t(Object(n2), true).forEach(function(t2) {
      s(e2, t2, n2[t2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e2, Object.getOwnPropertyDescriptors(n2)) : t(Object(n2)).forEach(function(t2) {
      Object.defineProperty(e2, t2, Object.getOwnPropertyDescriptor(n2, t2));
    });
  }
  return e2;
}
function r(t2) {
  return r = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t3) {
    return typeof t3;
  } : function(t3) {
    return t3 && typeof Symbol == "function" && t3.constructor === Symbol && t3 !== Symbol.prototype ? "symbol" : typeof t3;
  }, r(t2);
}
function n(t2, e2, r2, n2, a2, o2, s2) {
  try {
    var u2 = t2[o2](s2), i2 = u2.value;
  } catch (t3) {
    return void r2(t3);
  }
  u2.done ? e2(i2) : Promise.resolve(i2).then(n2, a2);
}
function a(t2) {
  return function() {
    var e2 = this, r2 = arguments;
    return new Promise(function(a2, o2) {
      var s2 = t2.apply(e2, r2);
      function u2(t3) {
        n(s2, a2, o2, u2, i2, "next", t3);
      }
      function i2(t3) {
        n(s2, a2, o2, u2, i2, "throw", t3);
      }
      u2(void 0);
    });
  };
}
function o(t2, e2) {
  for (var r2 = 0; e2.length > r2; r2++) {
    var n2 = e2[r2];
    n2.enumerable = n2.enumerable || false, n2.configurable = true, "value" in n2 && (n2.writable = true), Object.defineProperty(t2, n2.key, n2);
  }
}
function s(t2, e2, r2) {
  return e2 in t2 ? Object.defineProperty(t2, e2, { value: r2, enumerable: true, configurable: true, writable: true }) : t2[e2] = r2, t2;
}
function u(t2, e2) {
  (e2 == null || e2 > t2.length) && (e2 = t2.length);
  for (var r2 = 0, n2 = Array(e2); e2 > r2; r2++)
    n2[r2] = t2[r2];
  return n2;
}
function i(t2, e2) {
  var r2 = typeof Symbol != "undefined" && t2[Symbol.iterator] || t2["@@iterator"];
  if (!r2) {
    if (Array.isArray(t2) || (r2 = function(t3, e3) {
      if (t3) {
        if (typeof t3 == "string")
          return u(t3, e3);
        var r3 = Object.prototype.toString.call(t3).slice(8, -1);
        return r3 === "Object" && t3.constructor && (r3 = t3.constructor.name), r3 === "Map" || r3 === "Set" ? Array.from(t3) : r3 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r3) ? u(t3, e3) : void 0;
      }
    }(t2)) || e2 && t2 && typeof t2.length == "number") {
      r2 && (t2 = r2);
      var n2 = 0, a2 = function() {
      };
      return { s: a2, n: function() {
        return t2.length > n2 ? { done: false, value: t2[n2++] } : { done: true };
      }, e: function(t3) {
        throw t3;
      }, f: a2 };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var o2, s2 = true, i2 = false;
  return { s: function() {
    r2 = r2.call(t2);
  }, n: function() {
    var t3 = r2.next();
    return s2 = t3.done, t3;
  }, e: function(t3) {
    i2 = true, o2 = t3;
  }, f: function() {
    try {
      s2 || r2.return == null || r2.return();
    } finally {
      if (i2)
        throw o2;
    }
  } };
}
var c = [];
var h = [];
var p = [];
var l = { allowAction: true, routerParams: null, passedParams: null, current: {}, afterNotNext: null, actionInfo: { navigateBack: null, switchTab: null }, actionType: null };
var f = /[^\x20-\x7E]/;
var m = /[\x2E\u3002\uFF0E\uFF61]/g;
var v = { overflow: "Overflow: input needs wider integers to process", "not-basic": "Illegal input >= 0x80 (not a basic code point)", "invalid-input": "Invalid input" };
var g = Math.floor;
var y = String.fromCharCode;
function d(t2) {
  throw new RangeError(v[t2]);
}
function b(t2, e2) {
  return t2 + 22 + 75 * (26 > t2) - ((e2 != 0) << 5);
}
function x(t2, e2, r2) {
  var n2 = 0;
  for (t2 = r2 ? g(t2 / 700) : t2 >> 1, t2 += g(t2 / e2); t2 > 455; n2 += 36)
    t2 = g(t2 / 35);
  return g(n2 + 36 * t2 / (t2 + 38));
}
function P(t2) {
  return function(t3, e2) {
    var r2 = t3.split("@"), n2 = "";
    r2.length > 1 && (n2 = r2[0] + "@", t3 = r2[1]);
    var a2 = function(t4, e3) {
      for (var r3 = t4.length, n3 = []; r3--; )
        n3[r3] = e3(t4[r3]);
      return n3;
    }((t3 = t3.replace(m, ".")).split("."), e2).join(".");
    return n2 + a2;
  }(t2, function(t3) {
    return f.test(t3) ? "xn--" + function(t4) {
      var e2, r2, n2, a2, o2, s2, u2, i2, c2, h2, p2, l2, f2, m2, v2, P2 = [];
      for (l2 = (t4 = function(t5) {
        for (var e3, r3, n3 = [], a3 = 0, o3 = t5.length; o3 > a3; )
          55296 > (e3 = t5.charCodeAt(a3++)) || e3 > 56319 || a3 >= o3 ? n3.push(e3) : (64512 & (r3 = t5.charCodeAt(a3++))) == 56320 ? n3.push(((1023 & e3) << 10) + (1023 & r3) + 65536) : (n3.push(e3), a3--);
        return n3;
      }(t4)).length, e2 = 128, r2 = 0, o2 = 72, s2 = 0; l2 > s2; ++s2)
        128 > (p2 = t4[s2]) && P2.push(y(p2));
      for (n2 = a2 = P2.length, a2 && P2.push("-"); l2 > n2; ) {
        for (u2 = 2147483647, s2 = 0; l2 > s2; ++s2)
          (p2 = t4[s2]) >= e2 && u2 > p2 && (u2 = p2);
        for (u2 - e2 > g((2147483647 - r2) / (f2 = n2 + 1)) && d("overflow"), r2 += (u2 - e2) * f2, e2 = u2, s2 = 0; l2 > s2; ++s2)
          if (e2 > (p2 = t4[s2]) && ++r2 > 2147483647 && d("overflow"), p2 == e2) {
            for (i2 = r2, c2 = 36; (h2 = c2 > o2 ? o2 + 26 > c2 ? c2 - o2 : 26 : 1) <= i2; c2 += 36)
              P2.push(y(b(h2 + (v2 = i2 - h2) % (m2 = 36 - h2), 0))), i2 = g(v2 / m2);
            P2.push(y(b(i2, 0))), o2 = x(r2, f2, n2 == a2), r2 = 0, ++n2;
          }
        ++r2, ++e2;
      }
      return P2.join("");
    }(t3) : t3;
  });
}
function O(t2) {
  return t2 === null;
}
function w(t2) {
  return typeof t2 == "string";
}
function j(t2) {
  return r(t2) == "object" && t2 !== null;
}
function $(t2, e2) {
  return Object.prototype.hasOwnProperty.call(t2, e2);
}
var k = Array.isArray || function(t2) {
  return Object.prototype.toString.call(t2) === "[object Array]";
};
function A(t2) {
  switch (r(t2)) {
    case "string":
      return t2;
    case "boolean":
      return t2 ? "true" : "false";
    case "number":
      return isFinite(t2) ? t2 : "";
    default:
      return "";
  }
}
function C(t2, e2) {
  if (t2.map)
    return t2.map(e2);
  for (var r2 = [], n2 = 0; t2.length > n2; n2++)
    r2.push(e2(t2[n2], n2));
  return r2;
}
var E = Object.keys || function(t2) {
  var e2 = [];
  for (var r2 in t2)
    Object.prototype.hasOwnProperty.call(t2, r2) && e2.push(r2);
  return e2;
};
function R(t2, e2, r2, n2) {
  r2 = r2 || "=";
  var a2 = {};
  if (typeof t2 != "string" || t2.length === 0)
    return a2;
  var o2 = /\+/g;
  t2 = t2.split(e2 = e2 || "&");
  var s2 = 1e3;
  n2 && typeof n2.maxKeys == "number" && (s2 = n2.maxKeys);
  var u2 = t2.length;
  s2 > 0 && u2 > s2 && (u2 = s2);
  for (var i2 = 0; u2 > i2; ++i2) {
    var c2, h2, p2, l2, f2 = t2[i2].replace(o2, "%20"), m2 = f2.indexOf(r2);
    0 > m2 ? (c2 = f2, h2 = "") : (c2 = f2.substr(0, m2), h2 = f2.substr(m2 + 1)), p2 = decodeURIComponent(c2), l2 = decodeURIComponent(h2), $(a2, p2) ? k(a2[p2]) ? a2[p2].push(l2) : a2[p2] = [a2[p2], l2] : a2[p2] = l2;
  }
  return a2;
}
var q = function(t2, e2) {
  return K(t2, false, true).resolve(e2);
};
function I() {
  this.protocol = null, this.slashes = null, this.auth = null, this.host = null, this.port = null, this.hostname = null, this.hash = null, this.search = null, this.query = null, this.pathname = null, this.path = null, this.href = null;
}
var S = /^([a-z0-9.+-]+:)/i;
var U = /:[0-9]*$/;
var T = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/;
var N = ["{", "}", "|", "\\", "^", "`"].concat(["<", ">", '"', "`", " ", "\r", "\n", "	"]);
var L = ["'"].concat(N);
var _ = ["%", "/", "?", ";", "#"].concat(L);
var B = ["/", "?", "#"];
var F = /^[+a-z0-9A-Z_-]{0,63}$/;
var M = /^([+a-z0-9A-Z_-]{0,63})(.*)$/;
var V = { javascript: true, "javascript:": true };
var D = { javascript: true, "javascript:": true };
var z = { http: true, https: true, ftp: true, gopher: true, file: true, "http:": true, "https:": true, "ftp:": true, "gopher:": true, "file:": true };
function K(t2, e2, r2) {
  if (t2 && j(t2) && t2 instanceof I)
    return t2;
  var n2 = new I();
  return n2.parse(t2, e2, r2), n2;
}
function Z(t2, e2, n2, a2) {
  if (!w(e2))
    throw new TypeError("Parameter 'url' must be a string, not " + r(e2));
  var o2 = e2.indexOf("?"), s2 = o2 !== -1 && o2 < e2.indexOf("#") ? "?" : "#", u2 = e2.split(s2);
  u2[0] = u2[0].replace(/\\/g, "/");
  var i2 = e2 = u2.join(s2);
  if (i2 = i2.trim(), !a2 && e2.split("#").length === 1) {
    var c2 = T.exec(i2);
    if (c2)
      return t2.path = i2, t2.href = i2, t2.pathname = c2[1], c2[2] ? (t2.search = c2[2], t2.query = n2 ? R(t2.search.substr(1)) : t2.search.substr(1)) : n2 && (t2.search = "", t2.query = {}), t2;
  }
  var h2, p2, l2, f2 = S.exec(i2);
  if (f2) {
    var m2 = (f2 = f2[0]).toLowerCase();
    t2.protocol = m2, i2 = i2.substr(f2.length);
  }
  if (a2 || f2 || i2.match(/^\/\/[^@\/]+@[^@\/]+/)) {
    var v2 = i2.substr(0, 2) === "//";
    !v2 || f2 && D[f2] || (i2 = i2.substr(2), t2.slashes = true);
  }
  if (!D[f2] && (v2 || f2 && !z[f2])) {
    var g2, y2, d2 = -1;
    for (h2 = 0; B.length > h2; h2++)
      (p2 = i2.indexOf(B[h2])) === -1 || d2 !== -1 && p2 >= d2 || (d2 = p2);
    for ((y2 = d2 === -1 ? i2.lastIndexOf("@") : i2.lastIndexOf("@", d2)) !== -1 && (g2 = i2.slice(0, y2), i2 = i2.slice(y2 + 1), t2.auth = decodeURIComponent(g2)), d2 = -1, h2 = 0; _.length > h2; h2++)
      (p2 = i2.indexOf(_[h2])) === -1 || d2 !== -1 && p2 >= d2 || (d2 = p2);
    d2 === -1 && (d2 = i2.length), t2.host = i2.slice(0, d2), i2 = i2.slice(d2), G(t2), t2.hostname = t2.hostname || "";
    var b2 = t2.hostname[0] === "[" && t2.hostname[t2.hostname.length - 1] === "]";
    if (!b2) {
      var x2 = t2.hostname.split(/\./);
      for (h2 = 0, l2 = x2.length; l2 > h2; h2++) {
        var O2 = x2[h2];
        if (O2 && !O2.match(F)) {
          for (var j2 = "", $2 = 0, k2 = O2.length; k2 > $2; $2++)
            O2.charCodeAt($2) > 127 ? j2 += "x" : j2 += O2[$2];
          if (!j2.match(F)) {
            var A2 = x2.slice(0, h2), C2 = x2.slice(h2 + 1), E2 = O2.match(M);
            E2 && (A2.push(E2[1]), C2.unshift(E2[2])), C2.length && (i2 = "/" + C2.join(".") + i2), t2.hostname = A2.join(".");
            break;
          }
        }
      }
    }
    t2.hostname = t2.hostname.length > 255 ? "" : t2.hostname.toLowerCase(), b2 || (t2.hostname = P(t2.hostname)), t2.host = (t2.hostname || "") + (t2.port ? ":" + t2.port : ""), t2.href += t2.host, b2 && (t2.hostname = t2.hostname.substr(1, t2.hostname.length - 2), i2[0] !== "/" && (i2 = "/" + i2));
  }
  if (!V[m2])
    for (h2 = 0, l2 = L.length; l2 > h2; h2++) {
      var q2 = L[h2];
      if (i2.indexOf(q2) !== -1) {
        var I2 = encodeURIComponent(q2);
        I2 === q2 && (I2 = escape(q2)), i2 = i2.split(q2).join(I2);
      }
    }
  var U2 = i2.indexOf("#");
  U2 !== -1 && (t2.hash = i2.substr(U2), i2 = i2.slice(0, U2));
  var N2 = i2.indexOf("?");
  return N2 !== -1 ? (t2.search = i2.substr(N2), t2.query = i2.substr(N2 + 1), n2 && (t2.query = R(t2.query)), i2 = i2.slice(0, N2)) : n2 && (t2.search = "", t2.query = {}), i2 && (t2.pathname = i2), z[m2] && t2.hostname && !t2.pathname && (t2.pathname = "/"), (t2.pathname || t2.search) && (t2.path = (t2.pathname || "") + (t2.search || "")), t2.href = H(t2), t2;
}
function H(t2) {
  var e2 = t2.auth || "";
  e2 && (e2 = (e2 = encodeURIComponent(e2)).replace(/%3A/i, ":"), e2 += "@");
  var n2, a2, o2, s2 = t2.protocol || "", u2 = t2.pathname || "", i2 = t2.hash || "", c2 = false, h2 = "";
  t2.host ? c2 = e2 + t2.host : t2.hostname && (c2 = e2 + (t2.hostname.indexOf(":") === -1 ? t2.hostname : "[" + this.hostname + "]"), t2.port && (c2 += ":" + t2.port)), t2.query && j(t2.query) && Object.keys(t2.query).length && (a2 = a2 || "&", o2 = o2 || "=", (n2 = t2.query) === null && (n2 = void 0), h2 = r(n2) == "object" ? C(E(n2), function(t3) {
    var e3 = encodeURIComponent(A(t3)) + o2;
    return k(n2[t3]) ? C(n2[t3], function(t4) {
      return e3 + encodeURIComponent(A(t4));
    }).join(a2) : e3 + encodeURIComponent(A(n2[t3]));
  }).join(a2) : "");
  var p2 = t2.search || h2 && "?" + h2 || "";
  return s2 && s2.substr(-1) !== ":" && (s2 += ":"), t2.slashes || (!s2 || z[s2]) && c2 !== false ? (c2 = "//" + (c2 || ""), u2 && u2.charAt(0) !== "/" && (u2 = "/" + u2)) : c2 || (c2 = ""), i2 && i2.charAt(0) !== "#" && (i2 = "#" + i2), p2 && p2.charAt(0) !== "?" && (p2 = "?" + p2), s2 + c2 + (u2 = u2.replace(/[?#]/g, function(t3) {
    return encodeURIComponent(t3);
  })) + (p2 = p2.replace("#", "%23")) + i2;
}
function G(t2) {
  var e2 = t2.host, r2 = U.exec(e2);
  r2 && ((r2 = r2[0]) !== ":" && (t2.port = r2.substr(1)), e2 = e2.substr(0, e2.length - r2.length)), e2 && (t2.hostname = e2);
}
I.prototype.parse = function(t2, e2, r2) {
  return Z(this, t2, e2, r2);
}, I.prototype.format = function() {
  return H(this);
}, I.prototype.resolve = function(t2) {
  return this.resolveObject(K(t2, false, true)).format();
}, I.prototype.resolveObject = function(t2) {
  if (w(t2)) {
    var e2 = new I();
    e2.parse(t2, false, true), t2 = e2;
  }
  for (var r2, n2 = new I(), a2 = Object.keys(this), o2 = 0; a2.length > o2; o2++) {
    var s2 = a2[o2];
    n2[s2] = this[s2];
  }
  if (n2.hash = t2.hash, t2.href === "")
    return n2.href = n2.format(), n2;
  if (t2.slashes && !t2.protocol) {
    for (var u2 = Object.keys(t2), i2 = 0; u2.length > i2; i2++) {
      var c2 = u2[i2];
      c2 !== "protocol" && (n2[c2] = t2[c2]);
    }
    return z[n2.protocol] && n2.hostname && !n2.pathname && (n2.path = n2.pathname = "/"), n2.href = n2.format(), n2;
  }
  if (t2.protocol && t2.protocol !== n2.protocol) {
    if (!z[t2.protocol]) {
      for (var h2 = Object.keys(t2), p2 = 0; h2.length > p2; p2++) {
        var l2 = h2[p2];
        n2[l2] = t2[l2];
      }
      return n2.href = n2.format(), n2;
    }
    if (n2.protocol = t2.protocol, t2.host || D[t2.protocol])
      n2.pathname = t2.pathname;
    else {
      for (r2 = (t2.pathname || "").split("/"); r2.length && !(t2.host = r2.shift()); )
        ;
      t2.host || (t2.host = ""), t2.hostname || (t2.hostname = ""), r2[0] !== "" && r2.unshift(""), 2 > r2.length && r2.unshift(""), n2.pathname = r2.join("/");
    }
    return n2.search = t2.search, n2.query = t2.query, n2.host = t2.host || "", n2.auth = t2.auth, n2.hostname = t2.hostname || t2.host, n2.port = t2.port, (n2.pathname || n2.search) && (n2.path = (n2.pathname || "") + (n2.search || "")), n2.slashes = n2.slashes || t2.slashes, n2.href = n2.format(), n2;
  }
  var f2, m2 = n2.pathname && n2.pathname.charAt(0) === "/", v2 = t2.host || t2.pathname && t2.pathname.charAt(0) === "/", g2 = v2 || m2 || n2.host && t2.pathname, y2 = g2, d2 = n2.pathname && n2.pathname.split("/") || [], b2 = n2.protocol && !z[n2.protocol];
  if (r2 = t2.pathname && t2.pathname.split("/") || [], b2 && (n2.hostname = "", n2.port = null, n2.host && (d2[0] === "" ? d2[0] = n2.host : d2.unshift(n2.host)), n2.host = "", t2.protocol && (t2.hostname = null, t2.port = null, t2.host && (r2[0] === "" ? r2[0] = t2.host : r2.unshift(t2.host)), t2.host = null), g2 = g2 && (r2[0] === "" || d2[0] === "")), v2)
    n2.host = t2.host || t2.host === "" ? t2.host : n2.host, n2.hostname = t2.hostname || t2.hostname === "" ? t2.hostname : n2.hostname, n2.search = t2.search, n2.query = t2.query, d2 = r2;
  else if (r2.length)
    d2 || (d2 = []), d2.pop(), d2 = d2.concat(r2), n2.search = t2.search, n2.query = t2.query;
  else if (t2.search != null)
    return b2 && (n2.hostname = n2.host = d2.shift(), (f2 = !(!n2.host || 0 >= n2.host.indexOf("@")) && n2.host.split("@")) && (n2.auth = f2.shift(), n2.host = n2.hostname = f2.shift())), n2.search = t2.search, n2.query = t2.query, O(n2.pathname) && O(n2.search) || (n2.path = (n2.pathname ? n2.pathname : "") + (n2.search ? n2.search : "")), n2.href = n2.format(), n2;
  if (!d2.length)
    return n2.pathname = null, n2.path = n2.search ? "/" + n2.search : null, n2.href = n2.format(), n2;
  for (var x2 = d2.slice(-1)[0], P2 = (n2.host || t2.host || d2.length > 1) && (x2 === "." || x2 === "..") || x2 === "", j2 = 0, $2 = d2.length; $2 >= 0; $2--)
    (x2 = d2[$2]) === "." ? d2.splice($2, 1) : x2 === ".." ? (d2.splice($2, 1), j2++) : j2 && (d2.splice($2, 1), j2--);
  if (!g2 && !y2)
    for (; j2--; j2)
      d2.unshift("..");
  !g2 || d2[0] === "" || d2[0] && d2[0].charAt(0) === "/" || d2.unshift(""), P2 && d2.join("/").substr(-1) !== "/" && d2.push("");
  var k2 = d2[0] === "" || d2[0] && d2[0].charAt(0) === "/";
  return b2 && (n2.hostname = n2.host = k2 ? "" : d2.length ? d2.shift() : "", (f2 = !(!n2.host || 0 >= n2.host.indexOf("@")) && n2.host.split("@")) && (n2.auth = f2.shift(), n2.host = n2.hostname = f2.shift())), (g2 = g2 || n2.host && d2.length) && !k2 && d2.unshift(""), d2.length ? n2.pathname = d2.join("/") : (n2.pathname = null, n2.path = null), O(n2.pathname) && O(n2.search) || (n2.path = (n2.pathname ? n2.pathname : "") + (n2.search ? n2.search : "")), n2.auth = t2.auth || n2.auth, n2.slashes = n2.slashes || t2.slashes, n2.href = n2.format(), n2;
}, I.prototype.parseHost = function() {
  return G(this);
};
var J = "h5";
var Q = 0;
if (J === "h5") {
  W = history.pushState, X = history.replaceState;
  history.pushState = function() {
    Q = 1;
    for (var t2 = arguments.length, e2 = Array(t2), r2 = 0; t2 > r2; r2++)
      e2[r2] = arguments[r2];
    return W.apply(this, e2);
  }, history.replaceState = function() {
    Q = 1;
    for (var t2 = arguments.length, e2 = Array(t2), r2 = 0; t2 > r2; r2++)
      e2[r2] = arguments[r2];
    return X.apply(this, e2);
  };
}
var W;
var X;
function Y(t2) {
  J === "h5" && (Q ? Q = 0 : l.allowAction = true);
}
function tt() {
  var t2 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : bt();
  "$routeParams" in t2 || (t2.$routeParams = ht("routeParams")), t2.$passedParams = ht("passedParams"), l.VUE3 && ["app-plus", "app"].indexOf(J) > -1 && (t2.$page.$passedParams = t2.$passedParams, "$routeParams" in t2.$page || (t2.$page.$routeParams = t2.$routeParams)), t2.$vm && (t2.$vm.$passedParams = t2.$passedParams, "$routeParams" in t2.$vm || (t2.$vm.$routeParams = t2.$routeParams));
}
function et() {
  var t2 = void 0;
  Object.defineProperty(bt(), "$vm", { get: function() {
    return t2;
  }, set: function(e2) {
    t2 = e2, tt();
  } });
}
function rt(t2) {
  pt(t2, "passedParams"), pt(t2, "routeParams");
}
function nt(t2) {
  return at.apply(this, arguments);
}
function at() {
  return at = a(import_regenerator_runtime.default.mark(function t2(e2) {
    var r2, n2, a2, o2, s2, u2, i2, c2, h2, p2, f2, m2, v2 = arguments;
    return import_regenerator_runtime.default.wrap(function(t3) {
      for (; ; )
        switch (t3.prev = t3.next) {
          case 0:
            if (c2 = function() {
              l.passedParams = s2, l.routeParams = u2;
            }, r2 = v2.length > 1 && v2[1] !== void 0 ? v2[1] : {}, n2 = v2.length > 2 ? v2[2] : void 0, a2 = bt(), o2 = false, s2 = l.passedParams, u2 = l.routeParams, rt(r2), n2 !== "navigateBack") {
              t3.next = 30;
              break;
            }
            if (h2 = getCurrentPages().length, (i2 = h2 === 1 ? a2 : getCurrentPages()[h2 - 2]).$vm && i2.$vm._$weex && (o2 = true, tt(i2)), p2 = e2.call(uni, r2), !(o2 && p2 instanceof Promise)) {
              t3.next = 28;
              break;
            }
            return l.allowAction = true, t3.prev = 15, t3.next = 18, p2;
          case 18:
            if (t3.t0 = t3.sent.length, t3.t0 !== 1) {
              t3.next = 21;
              break;
            }
            c2();
          case 21:
            t3.next = 26;
            break;
          case 23:
            t3.prev = 23, t3.t1 = t3.catch(15), c2();
          case 26:
            t3.next = 29;
            break;
          case 28:
            return t3.abrupt("return", c2);
          case 29:
            return t3.abrupt("return", p2);
          case 30:
            return f2 = e2.call(uni, r2), m2 = bt(), ["app-plus", "app"].indexOf(J) > -1 && (m2 === a2 || m2.$vm ? tt() : et()), t3.abrupt("return", f2);
          case 34:
          case "end":
            return t3.stop();
        }
    }, t2, null, [[15, 23]]);
  })), at.apply(this, arguments);
}
var ot = false;
function st(t2, e2) {
  var r2 = t2.indexOf(e2);
  t2.splice(r2, 1);
}
function ut(t2, e2, r2) {
  return it.apply(this, arguments);
}
function it() {
  return (it = a(import_regenerator_runtime.default.mark(function t2(e2, r2, n2) {
    var a2, o2, s2, u2, c2;
    return import_regenerator_runtime.default.wrap(function(t3) {
      for (; ; )
        switch (t3.prev = t3.next) {
          case 0:
            o2 = function() {
              l.afterNotNext = null, a2 = false;
            }, a2 = true, s2 = i(e2), t3.prev = 3, s2.s();
          case 5:
            if ((u2 = s2.n()).done) {
              t3.next = 14;
              break;
            }
            return c2 = u2.value, t3.next = 9, c2(r2, n2, o2);
          case 9:
            if (!a2) {
              t3.next = 11;
              break;
            }
            return t3.abrupt("return", false);
          case 11:
            a2 = true;
          case 12:
            t3.next = 5;
            break;
          case 14:
            t3.next = 19;
            break;
          case 16:
            t3.prev = 16, t3.t0 = t3.catch(3), s2.e(t3.t0);
          case 19:
            return t3.prev = 19, s2.f(), t3.finish(19);
          case 22:
            return t3.abrupt("return", true);
          case 23:
          case "end":
            return t3.stop();
        }
    }, t2, null, [[3, 16, 19, 22]]);
  }))).apply(this, arguments);
}
function ct(t2, e2, r2) {
  t2.forEach(function(t3) {
    t3(e2, r2);
  });
}
function ht(t2) {
  var e2 = l[t2];
  return l[t2] = null, e2;
}
function pt(t2, n2) {
  return r(t2[n2]) === "object" && (l[n2] = e({}, t2[n2])), t2;
}
function lt() {
  var t2 = l.afterNotNext;
  l.afterNotNext = null, typeof t2 == "function" && t2();
}
function ft(t2, e2, r2, n2) {
  return mt.apply(this, arguments);
}
function mt() {
  return (mt = a(import_regenerator_runtime.default.mark(function t2(e2, r2, n2, a2) {
    var o2;
    return import_regenerator_runtime.default.wrap(function(t3) {
      for (; ; )
        switch (t3.prev = t3.next) {
          case 0:
            return t3.prev = 0, t3.next = 3, e2;
          case 3:
            if ((o2 = t3.sent).length !== 1) {
              t3.next = 9;
              break;
            }
            l.allowAction = true, ct(p, r2, n2), t3.next = 13;
            break;
          case 9:
            if (a2 !== "reLaunch" || getCurrentPages().length !== 1 || dt() !== r2.url || J !== "h5") {
              t3.next = 12;
              break;
            }
            return Pt(), t3.abrupt("return", o2);
          case 12:
            (a2 === "navigateBack" && getCurrentPages().length === 1 || ["app-plus", "app"].indexOf(J) > -1 && !bt().$vm) && (Pt(), ["app-plus", "app"].indexOf(J) > -1 && tt(), jt.called || ct(h, r2, n2), l.current = xt());
          case 13:
            return t3.abrupt("return", o2);
          case 16:
            return t3.prev = 16, t3.t0 = t3.catch(0), l.allowAction = true, ct(p, r2, n2), t3.abrupt("return", Error(t3.t0));
          case 21:
          case "end":
            return t3.stop();
        }
    }, t2, null, [[0, 16]]);
  }))).apply(this, arguments);
}
function vt(t2) {
  var r2 = e({}, t2);
  return Object.keys(r2).forEach(function(t3) {
    r2[t3] = decodeURIComponent(r2[t3]);
  }), r2;
}
function gt(t2) {
  var e2 = [];
  return Object.keys(t2).forEach(function(r2) {
    e2.push("".concat(r2, "=").concat(encodeURIComponent(t2[r2])));
  }), e2.join("&");
}
function yt(t2) {
  var e2;
  if (t2) {
    if (J === "h5") {
      if (l.VUE3) {
        var r2 = new URL(t2.$page.fullPath, location.origin).searchParams, n2 = {};
        return r2.forEach(function(t3, e3) {
          n2[e3] = t3;
        }), n2;
      }
      return t2.$mp.query;
    }
    return t2.options || ((e2 = t2.$page) === null || e2 === void 0 ? void 0 : e2.options) || {};
  }
}
function dt() {
  var t2 = getCurrentPages();
  return t2[t2.length - 1].route;
}
function bt() {
  var t2 = getCurrentPages();
  return t2[t2.length - 1];
}
function xt() {
  var t2 = bt(), e2 = yt(t2);
  return J !== "h5" && (e2 = vt(e2)), { url: dt(), routeParams: t2.$routeParams, passedParams: t2.$passedParams, query: e2, search: gt(e2) };
}
function Pt(t2) {
  ot && (l.allowAction = true, t2 && t2()), ot = false;
}
function Ot(t2) {
  var e2 = uni[t2];
  uni[t2] = function(r2) {
    return function(t3) {
      var e3 = this, r3 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n2 = arguments.length > 2 ? arguments[2] : void 0;
      try {
        dt();
      } catch (e4) {
        return t3.call(uni, r3);
      }
      var o2 = xt(), s2 = r3.fail, u2 = r3.success, i2 = r3.complete;
      if (!l.allowAction) {
        var f2 = "\u52A8\u4F5C\u88AB\u62E6\u622A\uFF0C\u56E0\u4E3A\u5DF2\u7ECF\u6709\u4E00\u4E2A\u6B63\u5728\u6267\u884C\u7684\u8DEF\u7531\u52A8\u4F5C";
        return s2 || u2 || i2 ? r3.fail && r3.fail({ errMsg: f2 }) : [{ errMsg: f2 }];
      }
      l.allowAction = false, ot = false;
      var m2, v2 = dt(), g2 = {}, y2 = "";
      if (n2 === "navigateBack") {
        var d2 = r3.delta, b2 = d2 === void 0 ? 1 : d2, x2 = getCurrentPages().length - 1 - b2;
        0 > x2 && (x2 = 0), l.actionInfo.navigateBack = x2, m2 = getCurrentPages()[x2].route, y2 = gt(g2 = yt(getCurrentPages()[x2])), J !== "h5" && (g2 = vt(g2));
      } else {
        var P2 = (m2 = q(v2, r3.url || "").replace(/^\/([^\/])/, "$1")).match(/([^?]+)\?([\s\S]*)/);
        m2 = P2 && P2[1] || m2, P2 && P2[2] && (y2 = P2[2], P2[2].split("&").forEach(function(t4) {
          if (t4) {
            var e4 = t4.match(/^([^=]+)=([\s\S]*)$/);
            e4 && e4[2] ? g2[e4[1]] = e4[2] : g2[t4] = "";
          }
        })), g2 = vt(g2);
      }
      n2 === "switchTab" && (l.actionInfo.switchTab = m2), l.actionType = n2;
      var O2, w2 = { url: m2, routeParams: r3.routeParams, passedParams: r3.passedParams, query: g2, jumpType: n2, search: y2 };
      return s2 || u2 || i2 ? (r3.fail = function() {
        var t4;
        O2 instanceof Function && O2(), l.allowAction = true;
        for (var r4 = arguments.length, n3 = Array(r4), a2 = 0; r4 > a2; a2++)
          n3[a2] = arguments[a2];
        if (n3 != null && (t4 = n3[0]) !== null && t4 !== void 0 && t4.innerError || ct(p, w2, ["app-plus", "app"].indexOf(J) > -1 ? o2 : l.current), s2)
          return s2.apply(e3, n3);
      }, n2 === "reLaunch" && getCurrentPages().length === 1 && dt() === w2.url && J === "h5" && (r3.success = function() {
        if (Pt(), u2) {
          for (var t4 = arguments.length, r4 = Array(t4), n3 = 0; t4 > n3; n3++)
            r4[n3] = arguments[n3];
          return u2.apply(e3, r4);
        }
      }), (n2 === "navigateBack" && getCurrentPages().length === 1 || ["app-plus", "app"].indexOf(J) > -1) && (r3.success = function() {
        if (Pt(), ["app-plus", "app"].indexOf(J) > -1 && tt(), !jt.called && ct(h, w2, ["app-plus", "app"].indexOf(J) > -1 ? o2 : l.current), l.current = xt(), u2) {
          for (var t4 = arguments.length, r4 = Array(t4), n3 = 0; t4 > n3; n3++)
            r4[n3] = arguments[n3];
          return u2.apply(e3, r4);
        }
      }), void a(import_regenerator_runtime.default.mark(function e4() {
        return import_regenerator_runtime.default.wrap(function(e5) {
          for (; ; )
            switch (e5.prev = e5.next) {
              case 0:
                return e5.next = 2, ut(c, w2, ["app-plus", "app"].indexOf(J) > -1 ? o2 : l.current);
              case 2:
                if (e5.sent) {
                  e5.next = 6;
                  break;
                }
                return r3.fail({ errMsg: "beforeEach\u4E2D\u6CA1\u6709\u4F7F\u7528next", innerError: 1 }), lt(), e5.abrupt("return");
              case 6:
                ot = true, J === "h5" && (Q = 0), O2 = nt(t3, r3, n2), Y();
              case 10:
              case "end":
                return e5.stop();
            }
        }, e4);
      }))()) : a(import_regenerator_runtime.default.mark(function e4() {
        var a2;
        return import_regenerator_runtime.default.wrap(function(e5) {
          for (; ; )
            switch (e5.prev = e5.next) {
              case 0:
                return e5.next = 2, ut(c, w2, ["app-plus", "app"].indexOf(J) > -1 ? o2 : l.current);
              case 2:
                if (e5.sent) {
                  e5.next = 6;
                  break;
                }
                return l.allowAction = true, lt(), e5.abrupt("return", [{ errMsg: "beforeEach\u4E2D\u6CA1\u6709\u4F7F\u7528next", innerError: 1 }]);
              case 6:
                return ot = true, J === "h5" && (Q = 0), a2 = nt(t3, r3, n2), Y(), e5.abrupt("return", ft(a2, w2, ["app-plus", "app"].indexOf(J) > -1 ? o2 : l.current, n2));
              case 11:
              case "end":
                return e5.stop();
            }
        }, e4);
      }))();
    }(e2, r2, t2);
  };
}
function wt(t2) {
  try {
    bt(), t2 && t2();
  } catch (e2) {
    setTimeout(function() {
      wt(t2);
    }, 13);
  }
}
function jt() {
  var t2 = this;
  if (!l.VUE3 || this.$mpType === "page") {
    var e2 = function() {
      Pt(function() {
        bt().$passedParams = t2.$passedParams = ht("passedParams");
      });
      var e3 = xt();
      ct(h, e3, l.current), l.current = e3;
    };
    if (-1 < ["app-plus", "app"].indexOf(J))
      wt(e2);
    else {
      try {
        dt();
      } catch (t3) {
        return;
      }
      this.globalData || e2();
    }
  }
}
var $t = new (function() {
  function t2() {
    !function(t3, e3) {
      if (!(t3 instanceof e3))
        throw new TypeError("Cannot call a class as a function");
    }(this, t2);
  }
  var e2, r2, n2;
  return e2 = t2, (r2 = [{ key: "beforeEach", value: function(t3) {
    return c.push(t3), function() {
      st(c, t3);
    };
  } }, { key: "afterEach", value: function(t3) {
    return h.push(t3), function() {
      st(h, t3);
    };
  } }, { key: "onError", value: function(t3) {
    return p.push(t3), function() {
      st(p, t3);
    };
  } }, { key: "afterNotNext", value: function(t3) {
    return l.afterNotNext = t3, this;
  } }, { key: "install", value: function(t3, e3) {
    return l.VUE3 = parseInt(t3.version) === 3, function(t4, e4) {
      t4.mixin({ onLoad: function() {
        ["app-plus", "app"].indexOf(J) > -1 && !bt().$vm || l.VUE3 && this.$mpType !== "page" || (["app-plus", "app"].indexOf(J) > -1 && (this.__onLoadCalled = true), bt().$routeParams = this.$routeParams = ht("routeParams"), jt.call(this), jt.called = true);
      }, onShow: function() {
        ["app-plus", "app"].indexOf(J) > -1 && !this.__onLoadCalled || (jt.called ? jt.called = null : (jt.call(this), ["app-plus", "app"].indexOf(J) > -1 && (jt.called = true, setTimeout(function() {
          jt.called = null;
        }))));
      } }), Ot("navigateTo"), Ot("redirectTo"), Ot("reLaunch"), Ot("switchTab"), Ot("navigateBack");
    }(t3), this;
  } }]) && o(e2.prototype, r2), n2 && o(e2, n2), Object.defineProperty(e2, "prototype", { writable: false }), t2;
}())();
var kt = $t.beforeEach;
var At = $t.afterEach;
var Ct = $t.onError;
var Et = $t.afterNotNext;
var dist_default = $t;

// dep:uni-crazy-router
var uni_crazy_router_default = dist_default;
export {
  At as afterEach,
  Et as afterNotNext,
  kt as beforeEach,
  uni_crazy_router_default as default,
  Ct as onError
};
//# sourceMappingURL=uni-crazy-router.js.map
