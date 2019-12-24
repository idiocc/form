#!/usr/bin/env node
             
const fs = require('fs');
const stream = require('stream');
const os = require('os');
const tty = require('tty');
const util = require('util');             
const m = fs.createReadStream;
const n = stream.Writable;
const p = (a, b = 0, c = !1) => {
  if (0 === b && !c) {
    return a;
  }
  a = a.split("\n", c ? b + 1 : void 0);
  return c ? a[a.length - 1] : a.slice(b).join("\n");
}, q = (a, b = !1) => p(a, 2 + (b ? 1 : 0)), t = a => {
  ({callee:{caller:a}} = a);
  return a;
};
const u = os.homedir;
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
    const f = p(g, 2, !0), k = (g = e instanceof Error) ? e.message : e;
    d = [`Error: ${k}`, ...null !== d && a === d || c ? [b] : [f, b]].join("\n");
    d = y(d);
    return Object.assign(g ? e : Error(), {message:k, stack:d});
  };
}
;function A(a) {
  var {stack:b} = Error();
  const c = t(arguments);
  b = q(b, a);
  return z(c, b, a);
}
;const B = (a, b) => {
  b.once("error", c => {
    a.emit("error", c);
  });
  return b;
};
class C extends n {
  constructor(a) {
    const {binary:b = !1, rs:c = null, ...e} = a || {}, {j:d = A(!0), proxyError:g} = a || {}, f = (k, l) => d(l);
    super(e);
    this.a = [];
    this.h = new Promise((k, l) => {
      this.on("finish", () => {
        let h;
        b ? h = Buffer.concat(this.a) : h = this.a.join("");
        k(h);
        this.a = [];
      });
      this.once("error", h => {
        if (-1 == h.stack.indexOf("\n")) {
          f`${h}`;
        } else {
          const r = y(h.stack);
          h.stack = r;
          g && f`${h}`;
        }
        l(h);
      });
      c && B(this, c).pipe(this);
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
  ({c:a} = new C({rs:a, binary:!0, j:A(!0)}));
  return await a;
};
async function E(a) {
  a = m(a);
  return await D(a);
}
;var F = tty;
const G = util.format, H = util.inspect;
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
const L = /\B(?=(\d{3})+(?!\d))/g, M = /(?:\.0*|(\.[^0]+)0+)$/, N = {b:1, kb:1024, mb:1048576, gb:1073741824, tb:Math.pow(1024, 4), pb:Math.pow(1024, 5)};
function O(a, b) {
  if (!Number.isFinite(a)) {
    return null;
  }
  const c = Math.abs(a), e = b && b.s || "", d = b && b.v || "", g = b && void 0 !== b.i ? b.i : 2, f = !(!b || !b.l);
  (b = b && b.u || "") && N[b.toLowerCase()] || (b = c >= N.pb ? "PB" : c >= N.tb ? "TB" : c >= N.gb ? "GB" : c >= N.mb ? "MB" : c >= N.kb ? "KB" : "B");
  a = (a / N[b.toLowerCase()]).toFixed(g);
  f || (a = a.replace(M, "$1"));
  e && (a = a.replace(L, e));
  return a + d + b;
}
;/*
 diff package https://github.com/kpdecker/jsdiff
 BSD License
 Copyright (c) 2009-2015, Kevin Decker <kpdecker@gmail.com>
*/
const P = {black:30, red:31, green:32, yellow:33, blue:34, magenta:35, cyan:36, white:37, grey:90};
function Q(a, b) {
  return (b = P[b]) ? `\x1b[${b}m${a}\x1b[0m` : a;
}
;var R = {f:O, ["fy"](a) {
  return Q(O(a) || "", "yellow");
}, ["fr"](a) {
  return Q(O(a) || "", "red");
}, ["fb"](a) {
  return Q(O(a) || "", "blue");
}, ["fg"](a) {
  return Q(O(a) || "", "green");
}, ["fc"](a) {
  return Q(O(a) || "", "cyan");
}, ["fm"](a) {
  return Q(O(a) || "", "magenta");
}};
const S = Object.keys(process.env).filter(a => /^debug_/i.test(a)).reduce((a, b) => {
  const c = b.substring(6).toLowerCase().replace(/_([a-z])/g, (e, d) => d.toUpperCase());
  b = process.env[b];
  /^(yes|on|true|enabled)$/i.test(b) ? b = !0 : /^(no|off|false|disabled)$/i.test(b) ? b = !1 : "null" === b ? b = null : b = Number(b);
  a[c] = b;
  return a;
}, {}), T = {init:function(a) {
  a.inspectOpts = {...S};
}, log:function(...a) {
  return process.stderr.write(G(...a) + "\n");
}, formatArgs:function(a) {
  var b = this.namespace, c = this.color;
  const e = this.diff;
  this.useColors ? (c = "\u001b[3" + (8 > c ? c : "8;5;" + c), b = `  ${c};1m${b} \u001B[0m`, a[0] = b + a[0].split("\n").join("\n" + b), a.push(c + "m+" + I(e) + "\u001b[0m")) : a[0] = (S.hideDate ? "" : (new Date).toISOString() + " ") + b + " " + a[0];
}, save:function(a) {
  a ? process.env.DEBUG = a : delete process.env.DEBUG;
}, load:function() {
  return process.env.DEBUG;
}, useColors:function() {
  return "colors" in S ? !!S.colors : F.isatty(process.stderr.fd);
}, colors:[6, 2, 3, 4, 5, 1], inspectOpts:S, formatters:{o:function(a) {
  return H(a, {...this.inspectOpts, colors:this.useColors}).replace(/\s*\n\s*/g, " ");
}, O:function(a) {
  return H(a, {...this.inspectOpts, colors:this.useColors});
}, ...R}};
function U(a) {
  function b(...f) {
    if (b.enabled) {
      var k = Number(new Date);
      b.diff = k - (g || k);
      b.prev = g;
      g = b.curr = k;
      f[0] = V(f[0]);
      "string" != typeof f[0] && f.unshift("%O");
      var l = 0;
      f[0] = f[0].replace(/%([a-zA-Z%]+)/g, (h, r) => {
        if ("%%" == h) {
          return h;
        }
        l++;
        if (r = c[r]) {
          h = r.call(b, f[l]), f.splice(l, 1), l--;
        }
        return h;
      });
      e.call(b, f);
      (b.log || d).apply(b, f);
    }
  }
  const c = a.formatters, e = a.formatArgs, d = a.log;
  let g;
  return b;
}
function W(a) {
  const b = U(a);
  "function" == typeof a.init && a.init(b);
  a.a.push(b);
  return b;
}
function aa(a, b) {
  let c = 0;
  for (let e = 0; e < b.length; e++) {
    c = (c << 5) - c + b.charCodeAt(e), c |= 0;
  }
  return a.colors[Math.abs(c) % a.colors.length];
}
function ba(a) {
  var b = T.load();
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
class ca {
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
function V(a) {
  return a instanceof Error ? a.stack || a.message : a;
}
;var X;
X = function() {
  const a = new ca(T);
  return function(b) {
    const c = W(a);
    c.namespace = b;
    c.useColors = T.useColors();
    c.enabled = a.enabled(b);
    c.color = aa(a, b);
    c.destroy = function() {
      a.destroy(this);
    };
    c.extend = function(e, d) {
      e = this.namespace + (void 0 === d ? ":" : d) + e;
      e.log = this.log;
      return e;
    };
    ba(a);
    return c;
  };
}()("@multipart/form");
function Y(a, b = null) {
  b && a.a.push("string" == typeof b ? Buffer.from(b, "utf8") : b);
  a.a.push(Buffer.from("\r\n", "utf8"));
}
class da {
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
module.exports = da;


//# sourceMappingURL=form.js.map