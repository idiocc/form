#!/usr/bin/env node
             
const fs = require('fs');
const stream = require('stream');
const os = require('os');
const tty = require('tty');
const util = require('util');             
const {createReadStream:m} = fs;
const {Writable:p} = stream;
const q = (a, b = 0, c = !1) => {
  if (0 === b && !c) {
    return a;
  }
  a = a.split("\n", c ? b + 1 : void 0);
  return c ? a[a.length - 1] : a.slice(b).join("\n");
}, r = (a, b = !1) => q(a, 2 + (b ? 1 : 0)), t = a => {
  ({callee:{caller:a}} = a);
  return a;
};
const {homedir:u} = os;
const v = /\s+at.*(?:\(|\s)(.*)\)?/, w = /^(?:(?:(?:node|(?:internal\/[\w/]*|.*node_modules\/(?:IGNORED_MODULES)\/.*)?\w+)\.js:\d+:\d+)|native)/, x = u(), y = a => {
  const {pretty:b = !1, ignoredModules:c = ["pirates"]} = {}, e = new RegExp(w.source.replace("IGNORED_MODULES", c.join("|")));
  return a.replace(/\\/g, "/").split("\n").filter(d => {
    d = d.match(v);
    if (null === d || !d[1]) {
      return !0;
    }
    d = d[1];
    return d.includes(".app/Contents/Resources/electron.asar") || d.includes(".app/Contents/Resources/default_app.asar") ? !1 : !e.test(d);
  }).filter(d => d.trim()).map(d => b ? d.replace(v, (g, f) => g.replace(f, f.replace(x, "~"))) : d).join("\n");
};
function z(a, b, c = !1) {
  return function(e) {
    var d = t(arguments), {stack:g} = Error();
    const f = q(g, 2, !0), k = (g = e instanceof Error) ? e.message : e;
    d = [`Error: ${k}`, ...null !== d && a === d || c ? [b] : [f, b]].join("\n");
    d = y(d);
    return Object.assign(g ? e : Error(), {message:k, stack:d});
  };
}
;function A(a) {
  var {stack:b} = Error();
  const c = t(arguments);
  b = r(b, a);
  return z(c, b, a);
}
;const B = (a, b) => {
  b.once("error", c => {
    a.emit("error", c);
  });
  return b;
};
class C extends p {
  constructor(a) {
    var b = a || {}, c = Object.assign({}, b);
    const e = void 0 === b.binary ? !1 : b.binary, d = void 0 === b.rs ? null : b.rs;
    b = (delete c.binary, delete c.rs, c);
    const {j:g = A(!0), proxyError:f} = a || {}, k = (n, l) => g(l);
    super(b);
    this.a = [];
    this.h = new Promise((n, l) => {
      this.on("finish", () => {
        let h;
        e ? h = Buffer.concat(this.a) : h = this.a.join("");
        n(h);
        this.a = [];
      });
      this.once("error", h => {
        if (-1 == h.stack.indexOf("\n")) {
          k`${h}`;
        } else {
          const N = y(h.stack);
          h.stack = N;
          f && k`${h}`;
        }
        l(h);
      });
      d && B(this, d).pipe(this);
    });
  }
  _write(a, b, c) {
    this.a.push(a);
    c();
  }
  get c() {
    return this.h;
  }
}
const D = async a => {
  var b = {binary:!0};
  b = void 0 === b ? {} : b;
  ({c:a} = new C(Object.assign({}, {rs:a}, b, {j:A(!0)})));
  return await a;
};
async function E(a) {
  a = m(a);
  return await D(a);
}
;var F = tty;
const {format:G, inspect:H} = util;
/*

 Copyright (c) 2016 Zeit, Inc.
 https://npmjs.org/ms
*/
function I(a) {
  var b = {}, c = typeof a;
  if ("string" == c && 0 < a.length) {
    return J(a);
  }
  if ("number" == c && isFinite(a)) {
    return b.m ? (b = Math.abs(a), a = 864E5 <= b ? K(a, b, 864E5, "day") : 36E5 <= b ? K(a, b, 36E5, "hour") : 6E4 <= b ? K(a, b, 6E4, "minute") : 1000 <= b ? K(a, b, 1000, "second") : a + " ms") : (b = Math.abs(a), a = 864E5 <= b ? Math.round(a / 864E5) + "d" : 36E5 <= b ? Math.round(a / 36E5) + "h" : 6E4 <= b ? Math.round(a / 6E4) + "m" : 1000 <= b ? Math.round(a / 1000) + "s" : a + "ms"), a;
  }
  throw Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(a));
}
function J(a) {
  a = String(a);
  if (!(100 < a.length) && (a = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(a))) {
    var b = parseFloat(a[1]);
    switch((a[2] || "ms").toLowerCase()) {
      case "years":
      case "year":
      case "yrs":
      case "yr":
      case "y":
        return 315576E5 * b;
      case "weeks":
      case "week":
      case "w":
        return 6048E5 * b;
      case "days":
      case "day":
      case "d":
        return 864E5 * b;
      case "hours":
      case "hour":
      case "hrs":
      case "hr":
      case "h":
        return 36E5 * b;
      case "minutes":
      case "minute":
      case "mins":
      case "min":
      case "m":
        return 6E4 * b;
      case "seconds":
      case "second":
      case "secs":
      case "sec":
      case "s":
        return 1000 * b;
      case "milliseconds":
      case "millisecond":
      case "msecs":
      case "msec":
      case "ms":
        return b;
    }
  }
}
function K(a, b, c, e) {
  return Math.round(a / c) + " " + e + (b >= 1.5 * c ? "s" : "");
}
;/*
 bytes
 Copyright(c) 2012-2014 TJ Holowaychuk
 Copyright(c) 2015 Jed Watson
 MIT Licensed
*/
const L = /\B(?=(\d{3})+(?!\d))/g, M = /(?:\.0*|(\.[^0]+)0+)$/, O = {b:1, kb:1024, mb:1048576, gb:1073741824, tb:Math.pow(1024, 4), pb:Math.pow(1024, 5)};
function P(a, b) {
  if (!Number.isFinite(a)) {
    return null;
  }
  const c = Math.abs(a), e = b && b.s || "", d = b && b.v || "", g = b && void 0 !== b.i ? b.i : 2, f = !(!b || !b.l);
  (b = b && b.u || "") && O[b.toLowerCase()] || (b = c >= O.pb ? "PB" : c >= O.tb ? "TB" : c >= O.gb ? "GB" : c >= O.mb ? "MB" : c >= O.kb ? "KB" : "B");
  a = (a / O[b.toLowerCase()]).toFixed(g);
  f || (a = a.replace(M, "$1"));
  e && (a = a.replace(L, e));
  return a + d + b;
}
;/*
 diff package https://github.com/kpdecker/jsdiff
 BSD License
 Copyright (c) 2009-2015, Kevin Decker <kpdecker@gmail.com>
*/
const Q = {black:30, red:31, green:32, yellow:33, blue:34, magenta:35, cyan:36, white:37, grey:90};
function R(a, b) {
  return (b = Q[b]) ? `\x1b[${b}m${a}\x1b[0m` : a;
}
;var S = {f:P, ["fy"](a) {
  return R(P(a) || "", "yellow");
}, ["fr"](a) {
  return R(P(a) || "", "red");
}, ["fb"](a) {
  return R(P(a) || "", "blue");
}, ["fg"](a) {
  return R(P(a) || "", "green");
}, ["fc"](a) {
  return R(P(a) || "", "cyan");
}, ["fm"](a) {
  return R(P(a) || "", "magenta");
}};
const T = Object.keys(process.env).filter(a => /^debug_/i.test(a)).reduce((a, b) => {
  const c = b.substring(6).toLowerCase().replace(/_([a-z])/g, (e, d) => d.toUpperCase());
  b = process.env[b];
  /^(yes|on|true|enabled)$/i.test(b) ? b = !0 : /^(no|off|false|disabled)$/i.test(b) ? b = !1 : "null" === b ? b = null : b = Number(b);
  a[c] = b;
  return a;
}, {}), U = Object.assign({}, {o:function(a) {
  const b = Object.assign({}, this.inspectOpts, {colors:this.useColors});
  return H(a, b).replace(/\s*\n\s*/g, " ");
}, O:function(a) {
  const b = Object.assign({}, this.inspectOpts, {colors:this.useColors});
  return H(a, b);
}}, S), V = {init:function(a) {
  a.inspectOpts = Object.assign({}, T);
}, log:function(...a) {
  return process.stderr.write(G(...a) + "\n");
}, formatArgs:function(a) {
  const {namespace:b, useColors:c, color:e, diff:d} = this;
  if (c) {
    const g = "\u001b[3" + (8 > e ? e : "8;5;" + e), f = `  ${g};1m${b} \u001B[0m`;
    a[0] = f + a[0].split("\n").join("\n" + f);
    a.push(g + "m+" + I(d) + "\u001b[0m");
  } else {
    a[0] = (T.hideDate ? "" : (new Date).toISOString() + " ") + b + " " + a[0];
  }
}, save:function(a) {
  a ? process.env.DEBUG = a : delete process.env.DEBUG;
}, load:function() {
  return process.env.DEBUG;
}, useColors:function() {
  return "colors" in T ? !!T.colors : F.isatty(process.stderr.fd);
}, colors:[6, 2, 3, 4, 5, 1], inspectOpts:T, formatters:U};
function W(a) {
  function b(...f) {
    if (b.enabled) {
      var k = Number(new Date);
      b.diff = k - (g || k);
      b.prev = g;
      g = b.curr = k;
      f[0] = aa(f[0]);
      "string" != typeof f[0] && f.unshift("%O");
      var n = 0;
      f[0] = f[0].replace(/%([a-zA-Z%]+)/g, (l, h) => {
        if ("%%" == l) {
          return l;
        }
        n++;
        if (h = c[h]) {
          l = h.call(b, f[n]), f.splice(n, 1), n--;
        }
        return l;
      });
      e.call(b, f);
      (b.log || d).apply(b, f);
    }
  }
  const c = a.formatters, e = a.formatArgs, d = a.log;
  let g;
  return b;
}
function ba(a) {
  const b = W(a);
  "function" == typeof a.init && a.init(b);
  a.a.push(b);
  return b;
}
function ca(a, b) {
  let c = 0;
  for (let e = 0; e < b.length; e++) {
    c = (c << 5) - c + b.charCodeAt(e), c |= 0;
  }
  return a.colors[Math.abs(c) % a.colors.length];
}
function da(a) {
  var b = V.load();
  a.save(b);
  a.c = [];
  a.g = [];
  let c;
  const e = ("string" == typeof b ? b : "").split(/[\s,]+/), d = e.length;
  for (c = 0; c < d; c++) {
    e[c] && (b = e[c].replace(/\*/g, ".*?"), "-" == b[0] ? a.g.push(new RegExp("^" + b.substr(1) + "$")) : a.c.push(new RegExp("^" + b + "$")));
  }
  for (c = 0; c < a.a.length; c++) {
    b = a.a[c], b.enabled = a.enabled(b.namespace);
  }
}
class ea {
  constructor(a) {
    this.colors = a.colors;
    this.formatArgs = a.formatArgs;
    this.inspectOpts = a.inspectOpts;
    this.log = a.log;
    this.save = a.save;
    this.init = a.init;
    this.formatters = a.formatters || {};
    this.a = [];
    this.c = [];
    this.g = [];
  }
  destroy(a) {
    a = this.a.indexOf(a);
    return -1 !== a ? (this.a.splice(a, 1), !0) : !1;
  }
  enabled(a) {
    if ("*" == a[a.length - 1]) {
      return !0;
    }
    let b, c;
    b = 0;
    for (c = this.g.length; b < c; b++) {
      if (this.g[b].test(a)) {
        return !1;
      }
    }
    b = 0;
    for (c = this.c.length; b < c; b++) {
      if (this.c[b].test(a)) {
        return !0;
      }
    }
    return !1;
  }
}
function aa(a) {
  return a instanceof Error ? a.stack || a.message : a;
}
;var X;
X = function() {
  const a = new ea(V);
  return function(b) {
    const c = ba(a);
    c.namespace = b;
    c.useColors = V.useColors();
    c.enabled = a.enabled(b);
    c.color = ca(a, b);
    c.destroy = function() {
      a.destroy(this);
    };
    c.extend = function(e, d) {
      e = this.namespace + (void 0 === d ? ":" : d) + e;
      e.log = this.log;
      return e;
    };
    da(a);
    return c;
  };
}()("@multipart/form");
function Y(a, b = null) {
  b && a.a.push("string" == typeof b ? Buffer.from(b, "ascii") : b);
  a.a.push(Buffer.from("\r\n", "ascii"));
}
class fa {
  constructor(a = {}) {
    ({boundary:a = "u2KxIV5yF1y+xUspOQCCZopaVgeV6Jxihv35XQJmuTx8X3sh"} = a);
    this.a = [];
    this.c = a;
  }
  async addFile(a, b, c = {}) {
    const {contentType:e = "application/octet-stream", noCache:d = !1, filename:g = a} = c;
    a in Z || d ? c = Z[a] : (c = await E(a), d || (Z[a] = c));
    a = ["form-data", `name="${b}"`, `filename="${g}"`].join("; ");
    Y(this, `\r\n--${this.boundary}`);
    Y(this, `Content-Disposition: ${a}`);
    Y(this, `Content-Type: ${e}`);
    Y(this);
    this.a.push(c);
  }
  get boundary() {
    return this.c;
  }
  get data() {
    let a = this.buffer;
    X("converting to string");
    a = a.toString();
    X("string is %f", a.length);
    return a;
  }
  get buffer() {
    X("adding final --boundary-- and calling Buffer.concat");
    Y(this, `\r\n--${this.boundary}--`);
    let a = Buffer.concat(this.a);
    X("buffer is %f", a.length);
    return a;
  }
  addSection(a, b) {
    Y(this, `\r\n--${this.boundary}`);
    Y(this, `Content-Disposition: form-data; name="${a}"`);
    Y(this);
    this.a.push(b instanceof Buffer ? b : Buffer.from(b));
  }
}
const Z = {};
module.exports = fa;


//# sourceMappingURL=form.js.map