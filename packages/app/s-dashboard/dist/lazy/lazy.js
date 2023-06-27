class ht {
  static extends(e) {
    class r extends e {
      constructor(i, ...o) {
        super(...o), this.settings = {}, Vo(this, i), this.metas = nr(this), Object.defineProperty(this, "metas", {
          enumerable: !0,
          value: nr(this)
        });
      }
      expose(i, o) {
        return Ko(this, i, o);
      }
      toPlainObject() {
        return zo(this);
      }
    }
    return r;
  }
  /**
   * @name            constructor
   * @type            Function
   * @constructor
   *
   * Constructor
   *
   * @since           2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  constructor(e = {}) {
    this.settings = {}, Vo(this, e), this.metas = nr(this), Object.defineProperty(this, "metas", {
      enumerable: !0,
      value: nr(this)
    });
  }
  expose(e, r) {
    return Ko(this, e, r);
  }
  toPlainObject() {
    return zo(this);
  }
}
function nr(t) {
  var e, r, n, i, o, s, l, u;
  let c = `<yellow>${((e = t.settings.metas) === null || e === void 0 ? void 0 : e.name) || ""}</yellow>`;
  return !((r = t.settings.metas) === null || r === void 0) && r.id && (c += ` <cyan>${t.settings.metas.id}</cyan>`), {
    id: (i = (n = t.settings.metas) === null || n === void 0 ? void 0 : n.id) !== null && i !== void 0 ? i : t.constructor.name,
    name: (s = (o = t.settings.metas) === null || o === void 0 ? void 0 : o.name) !== null && s !== void 0 ? s : t.constructor.name,
    formattedName: c,
    color: (u = (l = t.settings.metas) === null || l === void 0 ? void 0 : l.color) !== null && u !== void 0 ? u : "yellow"
  };
}
function Ko(t, e, r) {
  var n;
  r = Object.assign({ as: void 0, props: [] }, r ?? {}), r.as && typeof r.as == "string" && (t[r.as] = e), (n = r == null ? void 0 : r.props) === null || n === void 0 || n.forEach((i) => {
    e[i].bind && typeof e[i].bind == "function" ? t[i] = e[i].bind(e) : t[i] = e[i];
  });
}
function zo(t) {
  return JSON.parse(JSON.stringify(t));
}
function Vo(t, e = {}) {
  var r;
  t.settings = e, t.settings.metas || (t.settings.metas = {}), !((r = t.settings.metas) === null || r === void 0) && r.id || (t.settings.metas.id = t.constructor.name), t.settings.metas.color = "yellow";
}
function Kt() {
  const t = URL.createObjectURL(new Blob());
  return `s-${t.substring(t.lastIndexOf("/") + 1)}`;
}
function Cc(t, e) {
  var r;
  const n = Object.assign({ id: `injected-style-${Kt()}`, rootNode: void 0 }, e ?? {});
  if (document.querySelector(`#${n.id}`))
    return;
  const i = document.createElement("style");
  if (i.type = "text/css", i.setAttribute("id", n.id), i.innerHTML = t, n.rootNode)
    n.rootNode.appendChild(i);
  else {
    const o = document.querySelector('head link[rel="stylesheet"]');
    o ? (r = o.parentElement) === null || r === void 0 || r.insertBefore(i, o) : document.head.appendChild(i);
  }
  return i;
}
function ye(t) {
  return !(!t || typeof t != "object" || t.constructor && t.constructor.name !== "Object" || Object.prototype.toString.call(t) !== "[object Object]" || t !== Object(t));
}
function Pc(t) {
  t || (t = "");
  let e = "";
  const r = /(?:^|[_-\s])(\w)/g;
  return e = t.replace(r, function(n, i) {
    return i ? i.toUpperCase() : "";
  }), e = e.substr(0, 1).toLowerCase() + e.slice(1), e.trim();
}
function Rc(t) {
  return Pc(t);
}
function Ys(t, e) {
  const r = Object.assign({ deep: !0 }, e ?? {});
  for (let [n, i] of Object.entries(t)) {
    const o = Rc(n);
    ye(i) && r.deep ? t[o] = Ys(t[n], r) : t[o] = i, o !== n && delete t[n];
  }
  return t;
}
var Y = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function We(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
function Ic(t) {
  if (t.__esModule)
    return t;
  var e = t.default;
  if (typeof e == "function") {
    var r = function n() {
      if (this instanceof n) {
        var i = [null];
        i.push.apply(i, arguments);
        var o = Function.bind.apply(e, i);
        return new o();
      }
      return e.apply(this, arguments);
    };
    r.prototype = e.prototype;
  } else
    r = {};
  return Object.defineProperty(r, "__esModule", { value: !0 }), Object.keys(t).forEach(function(n) {
    var i = Object.getOwnPropertyDescriptor(t, n);
    Object.defineProperty(r, n, i.get ? i : {
      enumerable: !0,
      get: function() {
        return t[n];
      }
    });
  }), r;
}
var wr = { exports: {} };
wr.exports;
(function(t, e) {
  var r = 200, n = "__lodash_hash_undefined__", i = 9007199254740991, o = "[object Arguments]", s = "[object Array]", l = "[object Boolean]", u = "[object Date]", c = "[object Error]", f = "[object Function]", p = "[object GeneratorFunction]", y = "[object Map]", g = "[object Number]", m = "[object Object]", b = "[object Promise]", j = "[object RegExp]", $ = "[object Set]", v = "[object String]", O = "[object Symbol]", S = "[object WeakMap]", x = "[object ArrayBuffer]", C = "[object DataView]", R = "[object Float32Array]", L = "[object Float64Array]", H = "[object Int8Array]", K = "[object Int16Array]", X = "[object Int32Array]", J = "[object Uint8Array]", te = "[object Uint8ClampedArray]", le = "[object Uint16Array]", oe = "[object Uint32Array]", be = /[\\^$.*+?()[\]{}|]/g, Oe = /\w*$/, Ee = /^\[object .+?Constructor\]$/, fe = /^(?:0|[1-9]\d*)$/, k = {};
  k[o] = k[s] = k[x] = k[C] = k[l] = k[u] = k[R] = k[L] = k[H] = k[K] = k[X] = k[y] = k[g] = k[m] = k[j] = k[$] = k[v] = k[O] = k[J] = k[te] = k[le] = k[oe] = !0, k[c] = k[f] = k[S] = !1;
  var T = typeof Y == "object" && Y && Y.Object === Object && Y, E = typeof self == "object" && self && self.Object === Object && self, _ = T || E || Function("return this")(), A = e && !e.nodeType && e, mt = A && !0 && t && !t.nodeType && t, Ur = mt && mt.exports === A;
  function Gr(a, d) {
    return a.set(d[0], d[1]), a;
  }
  function qr(a, d) {
    return a.add(d), a;
  }
  function Kr(a, d) {
    for (var h = -1, w = a ? a.length : 0; ++h < w && d(a[h], h, a) !== !1; )
      ;
    return a;
  }
  function zr(a, d) {
    for (var h = -1, w = d.length, B = a.length; ++h < w; )
      a[B + h] = d[h];
    return a;
  }
  function vt(a, d, h, w) {
    var B = -1, D = a ? a.length : 0;
    for (w && D && (h = a[++B]); ++B < D; )
      h = d(h, a[B], B, a);
    return h;
  }
  function Vr(a, d) {
    for (var h = -1, w = Array(a); ++h < a; )
      w[h] = d(h);
    return w;
  }
  function Yr(a, d) {
    return a == null ? void 0 : a[d];
  }
  function wt(a) {
    var d = !1;
    if (a != null && typeof a.toString != "function")
      try {
        d = !!(a + "");
      } catch {
      }
    return d;
  }
  function _t(a) {
    var d = -1, h = Array(a.size);
    return a.forEach(function(w, B) {
      h[++d] = [B, w];
    }), h;
  }
  function Ge(a, d) {
    return function(h) {
      return a(d(h));
    };
  }
  function St(a) {
    var d = -1, h = Array(a.size);
    return a.forEach(function(w) {
      h[++d] = w;
    }), h;
  }
  var Xr = Array.prototype, Jr = Function.prototype, $e = Object.prototype, qe = _["__core-js_shared__"], Ot = function() {
    var a = /[^.]+$/.exec(qe && qe.keys && qe.keys.IE_PROTO || "");
    return a ? "Symbol(src)_1." + a : "";
  }(), Et = Jr.toString, Z = $e.hasOwnProperty, xe = $e.toString, Zr = RegExp(
    "^" + Et.call(Z).replace(be, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  ), Tt = Ur ? _.Buffer : void 0, At = _.Symbol, jt = _.Uint8Array, Qr = Ge(Object.getPrototypeOf, Object), en = Object.create, tn = $e.propertyIsEnumerable, rn = Xr.splice, $t = Object.getOwnPropertySymbols, nn = Tt ? Tt.isBuffer : void 0, on = Ge(Object.keys, Object), Ke = ce(_, "DataView"), me = ce(_, "Map"), ze = ce(_, "Promise"), Ve = ce(_, "Set"), Ye = ce(_, "WeakMap"), ve = ce(Object, "create"), sn = ie(Ke), an = ie(me), cn = ie(ze), un = ie(Ve), ln = ie(Ye), xt = At ? At.prototype : void 0, kt = xt ? xt.valueOf : void 0;
  function re(a) {
    var d = -1, h = a ? a.length : 0;
    for (this.clear(); ++d < h; ) {
      var w = a[d];
      this.set(w[0], w[1]);
    }
  }
  function fn() {
    this.__data__ = ve ? ve(null) : {};
  }
  function pn(a) {
    return this.has(a) && delete this.__data__[a];
  }
  function dn(a) {
    var d = this.__data__;
    if (ve) {
      var h = d[a];
      return h === n ? void 0 : h;
    }
    return Z.call(d, a) ? d[a] : void 0;
  }
  function yn(a) {
    var d = this.__data__;
    return ve ? d[a] !== void 0 : Z.call(d, a);
  }
  function hn(a, d) {
    var h = this.__data__;
    return h[a] = ve && d === void 0 ? n : d, this;
  }
  re.prototype.clear = fn, re.prototype.delete = pn, re.prototype.get = dn, re.prototype.has = yn, re.prototype.set = hn;
  function V(a) {
    var d = -1, h = a ? a.length : 0;
    for (this.clear(); ++d < h; ) {
      var w = a[d];
      this.set(w[0], w[1]);
    }
  }
  function gn() {
    this.__data__ = [];
  }
  function bn(a) {
    var d = this.__data__, h = ke(d, a);
    if (h < 0)
      return !1;
    var w = d.length - 1;
    return h == w ? d.pop() : rn.call(d, h, 1), !0;
  }
  function mn(a) {
    var d = this.__data__, h = ke(d, a);
    return h < 0 ? void 0 : d[h][1];
  }
  function vn(a) {
    return ke(this.__data__, a) > -1;
  }
  function wn(a, d) {
    var h = this.__data__, w = ke(h, a);
    return w < 0 ? h.push([a, d]) : h[w][1] = d, this;
  }
  V.prototype.clear = gn, V.prototype.delete = bn, V.prototype.get = mn, V.prototype.has = vn, V.prototype.set = wn;
  function se(a) {
    var d = -1, h = a ? a.length : 0;
    for (this.clear(); ++d < h; ) {
      var w = a[d];
      this.set(w[0], w[1]);
    }
  }
  function _n() {
    this.__data__ = {
      hash: new re(),
      map: new (me || V)(),
      string: new re()
    };
  }
  function Sn(a) {
    return Ce(this, a).delete(a);
  }
  function On(a) {
    return Ce(this, a).get(a);
  }
  function En(a) {
    return Ce(this, a).has(a);
  }
  function Tn(a, d) {
    return Ce(this, a).set(a, d), this;
  }
  se.prototype.clear = _n, se.prototype.delete = Sn, se.prototype.get = On, se.prototype.has = En, se.prototype.set = Tn;
  function ae(a) {
    this.__data__ = new V(a);
  }
  function An() {
    this.__data__ = new V();
  }
  function jn(a) {
    return this.__data__.delete(a);
  }
  function $n(a) {
    return this.__data__.get(a);
  }
  function xn(a) {
    return this.__data__.has(a);
  }
  function kn(a, d) {
    var h = this.__data__;
    if (h instanceof V) {
      var w = h.__data__;
      if (!me || w.length < r - 1)
        return w.push([a, d]), this;
      h = this.__data__ = new se(w);
    }
    return h.set(a, d), this;
  }
  ae.prototype.clear = An, ae.prototype.delete = jn, ae.prototype.get = $n, ae.prototype.has = xn, ae.prototype.set = kn;
  function Cn(a, d) {
    var h = Ze(a) || ti(a) ? Vr(a.length, String) : [], w = h.length, B = !!w;
    for (var D in a)
      (d || Z.call(a, D)) && !(B && (D == "length" || Jn(D, w))) && h.push(D);
    return h;
  }
  function Ct(a, d, h) {
    var w = a[d];
    (!(Z.call(a, d) && Mt(w, h)) || h === void 0 && !(d in a)) && (a[d] = h);
  }
  function ke(a, d) {
    for (var h = a.length; h--; )
      if (Mt(a[h][0], d))
        return h;
    return -1;
  }
  function Pn(a, d) {
    return a && Pt(d, Qe(d), a);
  }
  function Xe(a, d, h, w, B, D, U) {
    var N;
    if (w && (N = D ? w(a, B, D, U) : w(a)), N !== void 0)
      return N;
    if (!Pe(a))
      return a;
    var Lt = Ze(a);
    if (Lt) {
      if (N = Vn(a), !d)
        return qn(a, N);
    } else {
      var ue = ne(a), Ht = ue == f || ue == p;
      if (ni(a))
        return Ln(a, d);
      if (ue == m || ue == o || Ht && !D) {
        if (wt(a))
          return D ? a : {};
        if (N = Yn(Ht ? {} : a), !d)
          return Kn(a, Pn(N, a));
      } else {
        if (!k[ue])
          return D ? a : {};
        N = Xn(a, ue, Xe, d);
      }
    }
    U || (U = new ae());
    var Dt = U.get(a);
    if (Dt)
      return Dt;
    if (U.set(a, N), !Lt)
      var Nt = h ? zn(a) : Qe(a);
    return Kr(Nt || a, function(et, Re) {
      Nt && (Re = et, et = a[Re]), Ct(N, Re, Xe(et, d, h, w, Re, a, U));
    }), N;
  }
  function Rn(a) {
    return Pe(a) ? en(a) : {};
  }
  function In(a, d, h) {
    var w = d(a);
    return Ze(a) ? w : zr(w, h(a));
  }
  function Mn(a) {
    return xe.call(a);
  }
  function Bn(a) {
    if (!Pe(a) || Qn(a))
      return !1;
    var d = Ft(a) || wt(a) ? Zr : Ee;
    return d.test(ie(a));
  }
  function Fn(a) {
    if (!It(a))
      return on(a);
    var d = [];
    for (var h in Object(a))
      Z.call(a, h) && h != "constructor" && d.push(h);
    return d;
  }
  function Ln(a, d) {
    if (d)
      return a.slice();
    var h = new a.constructor(a.length);
    return a.copy(h), h;
  }
  function Je(a) {
    var d = new a.constructor(a.byteLength);
    return new jt(d).set(new jt(a)), d;
  }
  function Hn(a, d) {
    var h = d ? Je(a.buffer) : a.buffer;
    return new a.constructor(h, a.byteOffset, a.byteLength);
  }
  function Dn(a, d, h) {
    var w = d ? h(_t(a), !0) : _t(a);
    return vt(w, Gr, new a.constructor());
  }
  function Nn(a) {
    var d = new a.constructor(a.source, Oe.exec(a));
    return d.lastIndex = a.lastIndex, d;
  }
  function Wn(a, d, h) {
    var w = d ? h(St(a), !0) : St(a);
    return vt(w, qr, new a.constructor());
  }
  function Un(a) {
    return kt ? Object(kt.call(a)) : {};
  }
  function Gn(a, d) {
    var h = d ? Je(a.buffer) : a.buffer;
    return new a.constructor(h, a.byteOffset, a.length);
  }
  function qn(a, d) {
    var h = -1, w = a.length;
    for (d || (d = Array(w)); ++h < w; )
      d[h] = a[h];
    return d;
  }
  function Pt(a, d, h, w) {
    h || (h = {});
    for (var B = -1, D = d.length; ++B < D; ) {
      var U = d[B], N = w ? w(h[U], a[U], U, h, a) : void 0;
      Ct(h, U, N === void 0 ? a[U] : N);
    }
    return h;
  }
  function Kn(a, d) {
    return Pt(a, Rt(a), d);
  }
  function zn(a) {
    return In(a, Qe, Rt);
  }
  function Ce(a, d) {
    var h = a.__data__;
    return Zn(d) ? h[typeof d == "string" ? "string" : "hash"] : h.map;
  }
  function ce(a, d) {
    var h = Yr(a, d);
    return Bn(h) ? h : void 0;
  }
  var Rt = $t ? Ge($t, Object) : si, ne = Mn;
  (Ke && ne(new Ke(new ArrayBuffer(1))) != C || me && ne(new me()) != y || ze && ne(ze.resolve()) != b || Ve && ne(new Ve()) != $ || Ye && ne(new Ye()) != S) && (ne = function(a) {
    var d = xe.call(a), h = d == m ? a.constructor : void 0, w = h ? ie(h) : void 0;
    if (w)
      switch (w) {
        case sn:
          return C;
        case an:
          return y;
        case cn:
          return b;
        case un:
          return $;
        case ln:
          return S;
      }
    return d;
  });
  function Vn(a) {
    var d = a.length, h = a.constructor(d);
    return d && typeof a[0] == "string" && Z.call(a, "index") && (h.index = a.index, h.input = a.input), h;
  }
  function Yn(a) {
    return typeof a.constructor == "function" && !It(a) ? Rn(Qr(a)) : {};
  }
  function Xn(a, d, h, w) {
    var B = a.constructor;
    switch (d) {
      case x:
        return Je(a);
      case l:
      case u:
        return new B(+a);
      case C:
        return Hn(a, w);
      case R:
      case L:
      case H:
      case K:
      case X:
      case J:
      case te:
      case le:
      case oe:
        return Gn(a, w);
      case y:
        return Dn(a, w, h);
      case g:
      case v:
        return new B(a);
      case j:
        return Nn(a);
      case $:
        return Wn(a, w, h);
      case O:
        return Un(a);
    }
  }
  function Jn(a, d) {
    return d = d ?? i, !!d && (typeof a == "number" || fe.test(a)) && a > -1 && a % 1 == 0 && a < d;
  }
  function Zn(a) {
    var d = typeof a;
    return d == "string" || d == "number" || d == "symbol" || d == "boolean" ? a !== "__proto__" : a === null;
  }
  function Qn(a) {
    return !!Ot && Ot in a;
  }
  function It(a) {
    var d = a && a.constructor, h = typeof d == "function" && d.prototype || $e;
    return a === h;
  }
  function ie(a) {
    if (a != null) {
      try {
        return Et.call(a);
      } catch {
      }
      try {
        return a + "";
      } catch {
      }
    }
    return "";
  }
  function ei(a) {
    return Xe(a, !1, !0);
  }
  function Mt(a, d) {
    return a === d || a !== a && d !== d;
  }
  function ti(a) {
    return ri(a) && Z.call(a, "callee") && (!tn.call(a, "callee") || xe.call(a) == o);
  }
  var Ze = Array.isArray;
  function Bt(a) {
    return a != null && ii(a.length) && !Ft(a);
  }
  function ri(a) {
    return oi(a) && Bt(a);
  }
  var ni = nn || ai;
  function Ft(a) {
    var d = Pe(a) ? xe.call(a) : "";
    return d == f || d == p;
  }
  function ii(a) {
    return typeof a == "number" && a > -1 && a % 1 == 0 && a <= i;
  }
  function Pe(a) {
    var d = typeof a;
    return !!a && (d == "object" || d == "function");
  }
  function oi(a) {
    return !!a && typeof a == "object";
  }
  function Qe(a) {
    return Bt(a) ? Cn(a) : Fn(a);
  }
  function si() {
    return [];
  }
  function ai() {
    return !1;
  }
  t.exports = ei;
})(wr, wr.exports);
var Mc = wr.exports;
const Bc = /* @__PURE__ */ We(Mc);
var _r = { exports: {} };
_r.exports;
(function(t, e) {
  var r = 200, n = "__lodash_hash_undefined__", i = 9007199254740991, o = "[object Arguments]", s = "[object Array]", l = "[object Boolean]", u = "[object Date]", c = "[object Error]", f = "[object Function]", p = "[object GeneratorFunction]", y = "[object Map]", g = "[object Number]", m = "[object Object]", b = "[object Promise]", j = "[object RegExp]", $ = "[object Set]", v = "[object String]", O = "[object Symbol]", S = "[object WeakMap]", x = "[object ArrayBuffer]", C = "[object DataView]", R = "[object Float32Array]", L = "[object Float64Array]", H = "[object Int8Array]", K = "[object Int16Array]", X = "[object Int32Array]", J = "[object Uint8Array]", te = "[object Uint8ClampedArray]", le = "[object Uint16Array]", oe = "[object Uint32Array]", be = /[\\^$.*+?()[\]{}|]/g, Oe = /\w*$/, Ee = /^\[object .+?Constructor\]$/, fe = /^(?:0|[1-9]\d*)$/, k = {};
  k[o] = k[s] = k[x] = k[C] = k[l] = k[u] = k[R] = k[L] = k[H] = k[K] = k[X] = k[y] = k[g] = k[m] = k[j] = k[$] = k[v] = k[O] = k[J] = k[te] = k[le] = k[oe] = !0, k[c] = k[f] = k[S] = !1;
  var T = typeof Y == "object" && Y && Y.Object === Object && Y, E = typeof self == "object" && self && self.Object === Object && self, _ = T || E || Function("return this")(), A = e && !e.nodeType && e, mt = A && !0 && t && !t.nodeType && t, Ur = mt && mt.exports === A;
  function Gr(a, d) {
    return a.set(d[0], d[1]), a;
  }
  function qr(a, d) {
    return a.add(d), a;
  }
  function Kr(a, d) {
    for (var h = -1, w = a ? a.length : 0; ++h < w && d(a[h], h, a) !== !1; )
      ;
    return a;
  }
  function zr(a, d) {
    for (var h = -1, w = d.length, B = a.length; ++h < w; )
      a[B + h] = d[h];
    return a;
  }
  function vt(a, d, h, w) {
    var B = -1, D = a ? a.length : 0;
    for (w && D && (h = a[++B]); ++B < D; )
      h = d(h, a[B], B, a);
    return h;
  }
  function Vr(a, d) {
    for (var h = -1, w = Array(a); ++h < a; )
      w[h] = d(h);
    return w;
  }
  function Yr(a, d) {
    return a == null ? void 0 : a[d];
  }
  function wt(a) {
    var d = !1;
    if (a != null && typeof a.toString != "function")
      try {
        d = !!(a + "");
      } catch {
      }
    return d;
  }
  function _t(a) {
    var d = -1, h = Array(a.size);
    return a.forEach(function(w, B) {
      h[++d] = [B, w];
    }), h;
  }
  function Ge(a, d) {
    return function(h) {
      return a(d(h));
    };
  }
  function St(a) {
    var d = -1, h = Array(a.size);
    return a.forEach(function(w) {
      h[++d] = w;
    }), h;
  }
  var Xr = Array.prototype, Jr = Function.prototype, $e = Object.prototype, qe = _["__core-js_shared__"], Ot = function() {
    var a = /[^.]+$/.exec(qe && qe.keys && qe.keys.IE_PROTO || "");
    return a ? "Symbol(src)_1." + a : "";
  }(), Et = Jr.toString, Z = $e.hasOwnProperty, xe = $e.toString, Zr = RegExp(
    "^" + Et.call(Z).replace(be, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  ), Tt = Ur ? _.Buffer : void 0, At = _.Symbol, jt = _.Uint8Array, Qr = Ge(Object.getPrototypeOf, Object), en = Object.create, tn = $e.propertyIsEnumerable, rn = Xr.splice, $t = Object.getOwnPropertySymbols, nn = Tt ? Tt.isBuffer : void 0, on = Ge(Object.keys, Object), Ke = ce(_, "DataView"), me = ce(_, "Map"), ze = ce(_, "Promise"), Ve = ce(_, "Set"), Ye = ce(_, "WeakMap"), ve = ce(Object, "create"), sn = ie(Ke), an = ie(me), cn = ie(ze), un = ie(Ve), ln = ie(Ye), xt = At ? At.prototype : void 0, kt = xt ? xt.valueOf : void 0;
  function re(a) {
    var d = -1, h = a ? a.length : 0;
    for (this.clear(); ++d < h; ) {
      var w = a[d];
      this.set(w[0], w[1]);
    }
  }
  function fn() {
    this.__data__ = ve ? ve(null) : {};
  }
  function pn(a) {
    return this.has(a) && delete this.__data__[a];
  }
  function dn(a) {
    var d = this.__data__;
    if (ve) {
      var h = d[a];
      return h === n ? void 0 : h;
    }
    return Z.call(d, a) ? d[a] : void 0;
  }
  function yn(a) {
    var d = this.__data__;
    return ve ? d[a] !== void 0 : Z.call(d, a);
  }
  function hn(a, d) {
    var h = this.__data__;
    return h[a] = ve && d === void 0 ? n : d, this;
  }
  re.prototype.clear = fn, re.prototype.delete = pn, re.prototype.get = dn, re.prototype.has = yn, re.prototype.set = hn;
  function V(a) {
    var d = -1, h = a ? a.length : 0;
    for (this.clear(); ++d < h; ) {
      var w = a[d];
      this.set(w[0], w[1]);
    }
  }
  function gn() {
    this.__data__ = [];
  }
  function bn(a) {
    var d = this.__data__, h = ke(d, a);
    if (h < 0)
      return !1;
    var w = d.length - 1;
    return h == w ? d.pop() : rn.call(d, h, 1), !0;
  }
  function mn(a) {
    var d = this.__data__, h = ke(d, a);
    return h < 0 ? void 0 : d[h][1];
  }
  function vn(a) {
    return ke(this.__data__, a) > -1;
  }
  function wn(a, d) {
    var h = this.__data__, w = ke(h, a);
    return w < 0 ? h.push([a, d]) : h[w][1] = d, this;
  }
  V.prototype.clear = gn, V.prototype.delete = bn, V.prototype.get = mn, V.prototype.has = vn, V.prototype.set = wn;
  function se(a) {
    var d = -1, h = a ? a.length : 0;
    for (this.clear(); ++d < h; ) {
      var w = a[d];
      this.set(w[0], w[1]);
    }
  }
  function _n() {
    this.__data__ = {
      hash: new re(),
      map: new (me || V)(),
      string: new re()
    };
  }
  function Sn(a) {
    return Ce(this, a).delete(a);
  }
  function On(a) {
    return Ce(this, a).get(a);
  }
  function En(a) {
    return Ce(this, a).has(a);
  }
  function Tn(a, d) {
    return Ce(this, a).set(a, d), this;
  }
  se.prototype.clear = _n, se.prototype.delete = Sn, se.prototype.get = On, se.prototype.has = En, se.prototype.set = Tn;
  function ae(a) {
    this.__data__ = new V(a);
  }
  function An() {
    this.__data__ = new V();
  }
  function jn(a) {
    return this.__data__.delete(a);
  }
  function $n(a) {
    return this.__data__.get(a);
  }
  function xn(a) {
    return this.__data__.has(a);
  }
  function kn(a, d) {
    var h = this.__data__;
    if (h instanceof V) {
      var w = h.__data__;
      if (!me || w.length < r - 1)
        return w.push([a, d]), this;
      h = this.__data__ = new se(w);
    }
    return h.set(a, d), this;
  }
  ae.prototype.clear = An, ae.prototype.delete = jn, ae.prototype.get = $n, ae.prototype.has = xn, ae.prototype.set = kn;
  function Cn(a, d) {
    var h = Ze(a) || ti(a) ? Vr(a.length, String) : [], w = h.length, B = !!w;
    for (var D in a)
      (d || Z.call(a, D)) && !(B && (D == "length" || Jn(D, w))) && h.push(D);
    return h;
  }
  function Ct(a, d, h) {
    var w = a[d];
    (!(Z.call(a, d) && Mt(w, h)) || h === void 0 && !(d in a)) && (a[d] = h);
  }
  function ke(a, d) {
    for (var h = a.length; h--; )
      if (Mt(a[h][0], d))
        return h;
    return -1;
  }
  function Pn(a, d) {
    return a && Pt(d, Qe(d), a);
  }
  function Xe(a, d, h, w, B, D, U) {
    var N;
    if (w && (N = D ? w(a, B, D, U) : w(a)), N !== void 0)
      return N;
    if (!Pe(a))
      return a;
    var Lt = Ze(a);
    if (Lt) {
      if (N = Vn(a), !d)
        return qn(a, N);
    } else {
      var ue = ne(a), Ht = ue == f || ue == p;
      if (ni(a))
        return Ln(a, d);
      if (ue == m || ue == o || Ht && !D) {
        if (wt(a))
          return D ? a : {};
        if (N = Yn(Ht ? {} : a), !d)
          return Kn(a, Pn(N, a));
      } else {
        if (!k[ue])
          return D ? a : {};
        N = Xn(a, ue, Xe, d);
      }
    }
    U || (U = new ae());
    var Dt = U.get(a);
    if (Dt)
      return Dt;
    if (U.set(a, N), !Lt)
      var Nt = h ? zn(a) : Qe(a);
    return Kr(Nt || a, function(et, Re) {
      Nt && (Re = et, et = a[Re]), Ct(N, Re, Xe(et, d, h, w, Re, a, U));
    }), N;
  }
  function Rn(a) {
    return Pe(a) ? en(a) : {};
  }
  function In(a, d, h) {
    var w = d(a);
    return Ze(a) ? w : zr(w, h(a));
  }
  function Mn(a) {
    return xe.call(a);
  }
  function Bn(a) {
    if (!Pe(a) || Qn(a))
      return !1;
    var d = Ft(a) || wt(a) ? Zr : Ee;
    return d.test(ie(a));
  }
  function Fn(a) {
    if (!It(a))
      return on(a);
    var d = [];
    for (var h in Object(a))
      Z.call(a, h) && h != "constructor" && d.push(h);
    return d;
  }
  function Ln(a, d) {
    if (d)
      return a.slice();
    var h = new a.constructor(a.length);
    return a.copy(h), h;
  }
  function Je(a) {
    var d = new a.constructor(a.byteLength);
    return new jt(d).set(new jt(a)), d;
  }
  function Hn(a, d) {
    var h = d ? Je(a.buffer) : a.buffer;
    return new a.constructor(h, a.byteOffset, a.byteLength);
  }
  function Dn(a, d, h) {
    var w = d ? h(_t(a), !0) : _t(a);
    return vt(w, Gr, new a.constructor());
  }
  function Nn(a) {
    var d = new a.constructor(a.source, Oe.exec(a));
    return d.lastIndex = a.lastIndex, d;
  }
  function Wn(a, d, h) {
    var w = d ? h(St(a), !0) : St(a);
    return vt(w, qr, new a.constructor());
  }
  function Un(a) {
    return kt ? Object(kt.call(a)) : {};
  }
  function Gn(a, d) {
    var h = d ? Je(a.buffer) : a.buffer;
    return new a.constructor(h, a.byteOffset, a.length);
  }
  function qn(a, d) {
    var h = -1, w = a.length;
    for (d || (d = Array(w)); ++h < w; )
      d[h] = a[h];
    return d;
  }
  function Pt(a, d, h, w) {
    h || (h = {});
    for (var B = -1, D = d.length; ++B < D; ) {
      var U = d[B], N = w ? w(h[U], a[U], U, h, a) : void 0;
      Ct(h, U, N === void 0 ? a[U] : N);
    }
    return h;
  }
  function Kn(a, d) {
    return Pt(a, Rt(a), d);
  }
  function zn(a) {
    return In(a, Qe, Rt);
  }
  function Ce(a, d) {
    var h = a.__data__;
    return Zn(d) ? h[typeof d == "string" ? "string" : "hash"] : h.map;
  }
  function ce(a, d) {
    var h = Yr(a, d);
    return Bn(h) ? h : void 0;
  }
  var Rt = $t ? Ge($t, Object) : si, ne = Mn;
  (Ke && ne(new Ke(new ArrayBuffer(1))) != C || me && ne(new me()) != y || ze && ne(ze.resolve()) != b || Ve && ne(new Ve()) != $ || Ye && ne(new Ye()) != S) && (ne = function(a) {
    var d = xe.call(a), h = d == m ? a.constructor : void 0, w = h ? ie(h) : void 0;
    if (w)
      switch (w) {
        case sn:
          return C;
        case an:
          return y;
        case cn:
          return b;
        case un:
          return $;
        case ln:
          return S;
      }
    return d;
  });
  function Vn(a) {
    var d = a.length, h = a.constructor(d);
    return d && typeof a[0] == "string" && Z.call(a, "index") && (h.index = a.index, h.input = a.input), h;
  }
  function Yn(a) {
    return typeof a.constructor == "function" && !It(a) ? Rn(Qr(a)) : {};
  }
  function Xn(a, d, h, w) {
    var B = a.constructor;
    switch (d) {
      case x:
        return Je(a);
      case l:
      case u:
        return new B(+a);
      case C:
        return Hn(a, w);
      case R:
      case L:
      case H:
      case K:
      case X:
      case J:
      case te:
      case le:
      case oe:
        return Gn(a, w);
      case y:
        return Dn(a, w, h);
      case g:
      case v:
        return new B(a);
      case j:
        return Nn(a);
      case $:
        return Wn(a, w, h);
      case O:
        return Un(a);
    }
  }
  function Jn(a, d) {
    return d = d ?? i, !!d && (typeof a == "number" || fe.test(a)) && a > -1 && a % 1 == 0 && a < d;
  }
  function Zn(a) {
    var d = typeof a;
    return d == "string" || d == "number" || d == "symbol" || d == "boolean" ? a !== "__proto__" : a === null;
  }
  function Qn(a) {
    return !!Ot && Ot in a;
  }
  function It(a) {
    var d = a && a.constructor, h = typeof d == "function" && d.prototype || $e;
    return a === h;
  }
  function ie(a) {
    if (a != null) {
      try {
        return Et.call(a);
      } catch {
      }
      try {
        return a + "";
      } catch {
      }
    }
    return "";
  }
  function ei(a) {
    return Xe(a, !0, !0);
  }
  function Mt(a, d) {
    return a === d || a !== a && d !== d;
  }
  function ti(a) {
    return ri(a) && Z.call(a, "callee") && (!tn.call(a, "callee") || xe.call(a) == o);
  }
  var Ze = Array.isArray;
  function Bt(a) {
    return a != null && ii(a.length) && !Ft(a);
  }
  function ri(a) {
    return oi(a) && Bt(a);
  }
  var ni = nn || ai;
  function Ft(a) {
    var d = Pe(a) ? xe.call(a) : "";
    return d == f || d == p;
  }
  function ii(a) {
    return typeof a == "number" && a > -1 && a % 1 == 0 && a <= i;
  }
  function Pe(a) {
    var d = typeof a;
    return !!a && (d == "object" || d == "function");
  }
  function oi(a) {
    return !!a && typeof a == "object";
  }
  function Qe(a) {
    return Bt(a) ? Cn(a) : Fn(a);
  }
  function si() {
    return [];
  }
  function ai() {
    return !1;
  }
  t.exports = ei;
})(_r, _r.exports);
var Fc = _r.exports;
const Lc = /* @__PURE__ */ We(Fc);
function Xs(t, e = {}) {
  return e = Object.assign({ deep: !1 }, e), e.deep ? Lc(t) : Bc(t);
}
var Vi;
const Yi = (t) => Array.isArray(t), Js = (t) => Object.prototype.toString.call(t).slice(8, -1) === "Object", Hc = (t) => {
  if (t === void 0)
    throw new Error("This method requires one parameter");
  if (!Yi(t) && !Js(t))
    throw new TypeError("This method only accepts arrays and objects");
}, Dc = (t, e) => Object.keys(e).find((r) => e[r] === t), Nc = (t) => {
  Hc(t);
  let e = {};
  const r = (n, i = "$") => {
    const o = Dc(n, e);
    return o ? { $ref: o } : Yi(n) || Js(n) ? (e[i] = n, Yi(n) ? n.map((s, l) => r(s, `${i}[${l}]`)) : Object.keys(n).reduce((s, l) => (s[l] = r(n[l], `${i}.${l}`), s), {})) : n;
  };
  return r(t);
};
Vi = Nc;
function Zs(t) {
  const e = t.concat();
  for (let r = 0; r < e.length; ++r)
    for (let n = r + 1; n < e.length; ++n)
      e[r] === e[n] && e.splice(n--, 1);
  return e;
}
function Wc(t) {
  return !(!t || typeof t != "object" || t.constructor && t.constructor.name === "Object" || Object.prototype.toString.call(t) === "[object Object]" || t.constructor === Object);
}
function W(...t) {
  var e;
  let r = {}, n = !1;
  const i = (e = t[t.length - 1]) !== null && e !== void 0 ? e : {};
  i && Object.keys(i).length <= 2 && (i.array !== void 0 || i.clone !== void 0) && (n = !0, r = i);
  let o = Object.assign({ array: !1, clone: !0 }, r);
  function s(u, c) {
    const f = o.clone ? {} : u;
    return c ? (Object.getOwnPropertyNames(u).forEach((g) => {
      const m = Object.getOwnPropertyDescriptor(u, g);
      m.set || m.get ? Object.defineProperty(f, g, m) : f[g] = u[g];
    }), Object.getOwnPropertyNames(c).forEach((g) => {
      const m = Object.getOwnPropertyDescriptor(c, g);
      m.set || m.get ? Object.defineProperty(f, g, m) : o.array && Array.isArray(u[g]) && Array.isArray(c[g]) ? f[g] = [...u[g], ...c[g]] : ye(f[g]) && ye(c[g]) ? f[g] = s(f[g], c[g]) : f[g] = c[g];
    }), f) : u;
  }
  n && t.pop();
  let l = o.clone ? {} : t[0];
  for (let u = 0; u < t.length; u++) {
    const c = t[u];
    l = s(l, c);
  }
  return l;
}
function Eo(t, e, r, n = []) {
  r = W({
    classInstances: !1,
    array: !0,
    clone: !1,
    privateProps: !0
  }, r);
  const i = Array.isArray(t);
  let o = i ? [] : r.clone ? Xs(t, { deep: !0 }) : t;
  return Object.keys(t).forEach((s) => {
    if (!r.privateProps && s.match(/^_/))
      return;
    if (ye(t[s]) || Wc(t[s]) && r.classInstances || Array.isArray(t[s]) && r.array) {
      const u = Eo(t[s], e, Object.assign(Object.assign({}, r), { clone: !1 }), [...n, s]);
      i ? o.push(u) : s === "..." && ye(u) ? o = Object.assign(Object.assign({}, o), u) : o[s] = u;
      return;
    }
    const l = e({
      object: t,
      prop: s,
      value: t[s],
      path: [...n, s].join(".")
    });
    if (l === -1) {
      delete o[s];
      return;
    }
    i ? o.push(l) : s === "..." && ye(l) ? o = Object.assign(Object.assign({}, o), l) : o[s] = l;
  }), o;
}
function Sr(t, e = ['"', "'", "”", "`"]) {
  return t = t.trim(), e.forEach((r) => {
    if (t.substr(0, 1) === r && t.substr(-1) === r) {
      t = t.substr(1), t = t.substr(0, t.length - 1);
      return;
    }
  }), t;
}
function To(t, e, r = {}) {
  if (r = Object.assign({}, r), Array.isArray(e))
    return Yo(t, e, r);
  if (t[e] !== void 0)
    return t[e];
  if (!e || e === "" || e === ".")
    return t;
  e = e.replace(/\[(\w+)\]/g, ".$1"), e = e.replace(/\\\./g, "_dot_"), e = e.replace(/^\./, "");
  let n = [e.replace(/\?/gm, "")];
  const i = e.split(".");
  for (let o = i.length - 1; o >= 0; o--)
    if (i[o].match(/\?$/)) {
      const l = i.slice(0, o), u = i.slice(o + 1);
      n.push([...l, ...u].join(".")), n.push([...l, ...u.filter((c) => !c.match(/\?$/))].join("."));
    }
  n = Zs(n.map((o) => o.replace(/\?/gm, "")));
  for (let o = 0; o < n.length; o++) {
    const s = n[o], l = Yo(t, s, r);
    if (l !== void 0)
      return l;
  }
}
function Yo(t, e, r = {}) {
  r = Object.assign({}, r);
  let n = t, i;
  if (typeof e == "string") {
    if (t[e] !== void 0)
      return t[e];
    if (!e || e === "" || e === ".")
      return t;
    e = e.split(/(?!\B"[^"]*)\.(?![^"]*"\B)/gm);
  }
  for (i = [...e].map((o) => typeof o == "string" ? Sr(o) : o); i.length; ) {
    let o = i.shift();
    if (typeof o == "string" && (o = o.replace(/\?$/, "")), typeof n != "object" || !(n && o in n))
      return;
    n = n[o];
  }
  return n;
}
function Qs(t, e, r, n) {
  const i = Object.assign({ preferAssign: !1 }, n ?? {});
  let o = t, s;
  if (Array.isArray(e) && e.length === 1 && (e = e[0]), typeof e == "string") {
    if (!e || e === "" || e === ".") {
      Object.assign(t, r);
      return;
    }
    e = e.replace(/\[(\w+)\]/g, ".[$1]"), s = Sr(e).split(/(?!\B"[^"]*)\.(?![^"]*"\B)/gm).map((l) => Sr(l));
  } else
    Array.isArray(e) && (s = [...e]);
  for (; s.length - 1; ) {
    const l = s.shift();
    l in o || (typeof s[0] == "string" ? s[0].match(/^\[[0-9]+\]$/) ? o[l] = [] : o[l] = {} : o[l] = {}), o[l] || (o[l] = {}), o = o[l];
  }
  if (typeof s[0] == "string" && s[0].match(/^\[[0-9]+\]$/))
    Array.isArray(o) || (o = []), o.push(r);
  else if (ye(o[s[0]]) && ye(r) && i.preferAssign) {
    for (const l in o[s[0]])
      delete o[s[0]][l];
    Object.assign(o[s[0]], r);
  } else
    o[s[0]] = r;
  return To(t, e);
}
var Uc = "Function.prototype.bind called on incompatible ", ci = Array.prototype.slice, Gc = Object.prototype.toString, qc = "[object Function]", Kc = function(e) {
  var r = this;
  if (typeof r != "function" || Gc.call(r) !== qc)
    throw new TypeError(Uc + r);
  for (var n = ci.call(arguments, 1), i, o = function() {
    if (this instanceof i) {
      var f = r.apply(
        this,
        n.concat(ci.call(arguments))
      );
      return Object(f) === f ? f : this;
    } else
      return r.apply(
        e,
        n.concat(ci.call(arguments))
      );
  }, s = Math.max(0, r.length - n.length), l = [], u = 0; u < s; u++)
    l.push("$" + u);
  if (i = Function("binder", "return function (" + l.join(",") + "){ return binder.apply(this,arguments); }")(o), r.prototype) {
    var c = function() {
    };
    c.prototype = r.prototype, i.prototype = new c(), c.prototype = null;
  }
  return i;
}, zc = Kc, Ao = Function.prototype.bind || zc, Vc = Ao, Yc = Vc.call(Function.call, Object.prototype.hasOwnProperty), Xc = {}.toString, Jc = Array.isArray || function(t) {
  return Xc.call(t) == "[object Array]";
}, ea = Function.prototype.toString, pt = typeof Reflect == "object" && Reflect !== null && Reflect.apply, Xi, hr;
if (typeof pt == "function" && typeof Object.defineProperty == "function")
  try {
    Xi = Object.defineProperty({}, "length", {
      get: function() {
        throw hr;
      }
    }), hr = {}, pt(function() {
      throw 42;
    }, null, Xi);
  } catch (t) {
    t !== hr && (pt = null);
  }
else
  pt = null;
var Zc = /^\s*class\b/, Ji = function(e) {
  try {
    var r = ea.call(e);
    return Zc.test(r);
  } catch {
    return !1;
  }
}, ui = function(e) {
  try {
    return Ji(e) ? !1 : (ea.call(e), !0);
  } catch {
    return !1;
  }
}, gr = Object.prototype.toString, Qc = "[object Object]", eu = "[object Function]", tu = "[object GeneratorFunction]", ru = "[object HTMLAllCollection]", nu = "[object HTML document.all class]", iu = "[object HTMLCollection]", ou = typeof Symbol == "function" && !!Symbol.toStringTag, su = !(0 in [,]), Zi = function() {
  return !1;
};
if (typeof document == "object") {
  var au = document.all;
  gr.call(au) === gr.call(document.all) && (Zi = function(e) {
    if ((su || !e) && (typeof e > "u" || typeof e == "object"))
      try {
        var r = gr.call(e);
        return (r === ru || r === nu || r === iu || r === Qc) && e("") == null;
      } catch {
      }
    return !1;
  });
}
var jo = pt ? function(e) {
  if (Zi(e))
    return !0;
  if (!e || typeof e != "function" && typeof e != "object")
    return !1;
  try {
    pt(e, null, Xi);
  } catch (r) {
    if (r !== hr)
      return !1;
  }
  return !Ji(e) && ui(e);
} : function(e) {
  if (Zi(e))
    return !0;
  if (!e || typeof e != "function" && typeof e != "object")
    return !1;
  if (ou)
    return ui(e);
  if (Ji(e))
    return !1;
  var r = gr.call(e);
  return r !== eu && r !== tu && !/^\[object HTML/.test(r) ? !1 : ui(e);
}, Cr = function() {
  if (typeof Symbol != "function" || typeof Object.getOwnPropertySymbols != "function")
    return !1;
  if (typeof Symbol.iterator == "symbol")
    return !0;
  var e = {}, r = Symbol("test"), n = Object(r);
  if (typeof r == "string" || Object.prototype.toString.call(r) !== "[object Symbol]" || Object.prototype.toString.call(n) !== "[object Symbol]")
    return !1;
  var i = 42;
  e[r] = i;
  for (r in e)
    return !1;
  if (typeof Object.keys == "function" && Object.keys(e).length !== 0 || typeof Object.getOwnPropertyNames == "function" && Object.getOwnPropertyNames(e).length !== 0)
    return !1;
  var o = Object.getOwnPropertySymbols(e);
  if (o.length !== 1 || o[0] !== r || !Object.prototype.propertyIsEnumerable.call(e, r))
    return !1;
  if (typeof Object.getOwnPropertyDescriptor == "function") {
    var s = Object.getOwnPropertyDescriptor(e, r);
    if (s.value !== i || s.enumerable !== !0)
      return !1;
  }
  return !0;
}, Xo = typeof Symbol < "u" && Symbol, cu = Cr, $o = function() {
  return typeof Xo != "function" || typeof Symbol != "function" || typeof Xo("foo") != "symbol" || typeof Symbol("bar") != "symbol" ? !1 : cu();
}, F, yt = SyntaxError, ta = Function, dt = TypeError, li = function(t) {
  try {
    return ta('"use strict"; return (' + t + ").constructor;")();
  } catch {
  }
}, nt = Object.getOwnPropertyDescriptor;
if (nt)
  try {
    nt({}, "");
  } catch {
    nt = null;
  }
var fi = function() {
  throw new dt();
}, uu = nt ? function() {
  try {
    return arguments.callee, fi;
  } catch {
    try {
      return nt(arguments, "callee").get;
    } catch {
      return fi;
    }
  }
}() : fi, ot = $o(), Ae = Object.getPrototypeOf || function(t) {
  return t.__proto__;
}, lt = {}, lu = typeof Uint8Array > "u" ? F : Ae(Uint8Array), it = {
  "%AggregateError%": typeof AggregateError > "u" ? F : AggregateError,
  "%Array%": Array,
  "%ArrayBuffer%": typeof ArrayBuffer > "u" ? F : ArrayBuffer,
  "%ArrayIteratorPrototype%": ot ? Ae([][Symbol.iterator]()) : F,
  "%AsyncFromSyncIteratorPrototype%": F,
  "%AsyncFunction%": lt,
  "%AsyncGenerator%": lt,
  "%AsyncGeneratorFunction%": lt,
  "%AsyncIteratorPrototype%": lt,
  "%Atomics%": typeof Atomics > "u" ? F : Atomics,
  "%BigInt%": typeof BigInt > "u" ? F : BigInt,
  "%BigInt64Array%": typeof BigInt64Array > "u" ? F : BigInt64Array,
  "%BigUint64Array%": typeof BigUint64Array > "u" ? F : BigUint64Array,
  "%Boolean%": Boolean,
  "%DataView%": typeof DataView > "u" ? F : DataView,
  "%Date%": Date,
  "%decodeURI%": decodeURI,
  "%decodeURIComponent%": decodeURIComponent,
  "%encodeURI%": encodeURI,
  "%encodeURIComponent%": encodeURIComponent,
  "%Error%": Error,
  "%eval%": eval,
  // eslint-disable-line no-eval
  "%EvalError%": EvalError,
  "%Float32Array%": typeof Float32Array > "u" ? F : Float32Array,
  "%Float64Array%": typeof Float64Array > "u" ? F : Float64Array,
  "%FinalizationRegistry%": typeof FinalizationRegistry > "u" ? F : FinalizationRegistry,
  "%Function%": ta,
  "%GeneratorFunction%": lt,
  "%Int8Array%": typeof Int8Array > "u" ? F : Int8Array,
  "%Int16Array%": typeof Int16Array > "u" ? F : Int16Array,
  "%Int32Array%": typeof Int32Array > "u" ? F : Int32Array,
  "%isFinite%": isFinite,
  "%isNaN%": isNaN,
  "%IteratorPrototype%": ot ? Ae(Ae([][Symbol.iterator]())) : F,
  "%JSON%": typeof JSON == "object" ? JSON : F,
  "%Map%": typeof Map > "u" ? F : Map,
  "%MapIteratorPrototype%": typeof Map > "u" || !ot ? F : Ae((/* @__PURE__ */ new Map())[Symbol.iterator]()),
  "%Math%": Math,
  "%Number%": Number,
  "%Object%": Object,
  "%parseFloat%": parseFloat,
  "%parseInt%": parseInt,
  "%Promise%": typeof Promise > "u" ? F : Promise,
  "%Proxy%": typeof Proxy > "u" ? F : Proxy,
  "%RangeError%": RangeError,
  "%ReferenceError%": ReferenceError,
  "%Reflect%": typeof Reflect > "u" ? F : Reflect,
  "%RegExp%": RegExp,
  "%Set%": typeof Set > "u" ? F : Set,
  "%SetIteratorPrototype%": typeof Set > "u" || !ot ? F : Ae((/* @__PURE__ */ new Set())[Symbol.iterator]()),
  "%SharedArrayBuffer%": typeof SharedArrayBuffer > "u" ? F : SharedArrayBuffer,
  "%String%": String,
  "%StringIteratorPrototype%": ot ? Ae(""[Symbol.iterator]()) : F,
  "%Symbol%": ot ? Symbol : F,
  "%SyntaxError%": yt,
  "%ThrowTypeError%": uu,
  "%TypedArray%": lu,
  "%TypeError%": dt,
  "%Uint8Array%": typeof Uint8Array > "u" ? F : Uint8Array,
  "%Uint8ClampedArray%": typeof Uint8ClampedArray > "u" ? F : Uint8ClampedArray,
  "%Uint16Array%": typeof Uint16Array > "u" ? F : Uint16Array,
  "%Uint32Array%": typeof Uint32Array > "u" ? F : Uint32Array,
  "%URIError%": URIError,
  "%WeakMap%": typeof WeakMap > "u" ? F : WeakMap,
  "%WeakRef%": typeof WeakRef > "u" ? F : WeakRef,
  "%WeakSet%": typeof WeakSet > "u" ? F : WeakSet
};
try {
  null.error;
} catch (t) {
  var fu = Ae(Ae(t));
  it["%Error.prototype%"] = fu;
}
var pu = function t(e) {
  var r;
  if (e === "%AsyncFunction%")
    r = li("async function () {}");
  else if (e === "%GeneratorFunction%")
    r = li("function* () {}");
  else if (e === "%AsyncGeneratorFunction%")
    r = li("async function* () {}");
  else if (e === "%AsyncGenerator%") {
    var n = t("%AsyncGeneratorFunction%");
    n && (r = n.prototype);
  } else if (e === "%AsyncIteratorPrototype%") {
    var i = t("%AsyncGenerator%");
    i && (r = Ae(i.prototype));
  }
  return it[e] = r, r;
}, Jo = {
  "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
  "%ArrayPrototype%": ["Array", "prototype"],
  "%ArrayProto_entries%": ["Array", "prototype", "entries"],
  "%ArrayProto_forEach%": ["Array", "prototype", "forEach"],
  "%ArrayProto_keys%": ["Array", "prototype", "keys"],
  "%ArrayProto_values%": ["Array", "prototype", "values"],
  "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
  "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
  "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"],
  "%BooleanPrototype%": ["Boolean", "prototype"],
  "%DataViewPrototype%": ["DataView", "prototype"],
  "%DatePrototype%": ["Date", "prototype"],
  "%ErrorPrototype%": ["Error", "prototype"],
  "%EvalErrorPrototype%": ["EvalError", "prototype"],
  "%Float32ArrayPrototype%": ["Float32Array", "prototype"],
  "%Float64ArrayPrototype%": ["Float64Array", "prototype"],
  "%FunctionPrototype%": ["Function", "prototype"],
  "%Generator%": ["GeneratorFunction", "prototype"],
  "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"],
  "%Int8ArrayPrototype%": ["Int8Array", "prototype"],
  "%Int16ArrayPrototype%": ["Int16Array", "prototype"],
  "%Int32ArrayPrototype%": ["Int32Array", "prototype"],
  "%JSONParse%": ["JSON", "parse"],
  "%JSONStringify%": ["JSON", "stringify"],
  "%MapPrototype%": ["Map", "prototype"],
  "%NumberPrototype%": ["Number", "prototype"],
  "%ObjectPrototype%": ["Object", "prototype"],
  "%ObjProto_toString%": ["Object", "prototype", "toString"],
  "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"],
  "%PromisePrototype%": ["Promise", "prototype"],
  "%PromiseProto_then%": ["Promise", "prototype", "then"],
  "%Promise_all%": ["Promise", "all"],
  "%Promise_reject%": ["Promise", "reject"],
  "%Promise_resolve%": ["Promise", "resolve"],
  "%RangeErrorPrototype%": ["RangeError", "prototype"],
  "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
  "%RegExpPrototype%": ["RegExp", "prototype"],
  "%SetPrototype%": ["Set", "prototype"],
  "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"],
  "%StringPrototype%": ["String", "prototype"],
  "%SymbolPrototype%": ["Symbol", "prototype"],
  "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
  "%TypedArrayPrototype%": ["TypedArray", "prototype"],
  "%TypeErrorPrototype%": ["TypeError", "prototype"],
  "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
  "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"],
  "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
  "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
  "%URIErrorPrototype%": ["URIError", "prototype"],
  "%WeakMapPrototype%": ["WeakMap", "prototype"],
  "%WeakSetPrototype%": ["WeakSet", "prototype"]
}, Qt = Ao, Or = Yc, du = Qt.call(Function.call, Array.prototype.concat), yu = Qt.call(Function.apply, Array.prototype.splice), Zo = Qt.call(Function.call, String.prototype.replace), Er = Qt.call(Function.call, String.prototype.slice), hu = Qt.call(Function.call, RegExp.prototype.exec), gu = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, bu = /\\(\\)?/g, mu = function(e) {
  var r = Er(e, 0, 1), n = Er(e, -1);
  if (r === "%" && n !== "%")
    throw new yt("invalid intrinsic syntax, expected closing `%`");
  if (n === "%" && r !== "%")
    throw new yt("invalid intrinsic syntax, expected opening `%`");
  var i = [];
  return Zo(e, gu, function(o, s, l, u) {
    i[i.length] = l ? Zo(u, bu, "$1") : s || o;
  }), i;
}, vu = function(e, r) {
  var n = e, i;
  if (Or(Jo, n) && (i = Jo[n], n = "%" + i[0] + "%"), Or(it, n)) {
    var o = it[n];
    if (o === lt && (o = pu(n)), typeof o > "u" && !r)
      throw new dt("intrinsic " + e + " exists, but is not available. Please file an issue!");
    return {
      alias: i,
      name: n,
      value: o
    };
  }
  throw new yt("intrinsic " + e + " does not exist!");
}, ge = function(e, r) {
  if (typeof e != "string" || e.length === 0)
    throw new dt("intrinsic name must be a non-empty string");
  if (arguments.length > 1 && typeof r != "boolean")
    throw new dt('"allowMissing" argument must be a boolean');
  if (hu(/^%?[^%]*%?$/, e) === null)
    throw new yt("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
  var n = mu(e), i = n.length > 0 ? n[0] : "", o = vu("%" + i + "%", r), s = o.name, l = o.value, u = !1, c = o.alias;
  c && (i = c[0], yu(n, du([0, 1], c)));
  for (var f = 1, p = !0; f < n.length; f += 1) {
    var y = n[f], g = Er(y, 0, 1), m = Er(y, -1);
    if ((g === '"' || g === "'" || g === "`" || m === '"' || m === "'" || m === "`") && g !== m)
      throw new yt("property names with quotes must have matching quotes");
    if ((y === "constructor" || !p) && (u = !0), i += "." + y, s = "%" + i + "%", Or(it, s))
      l = it[s];
    else if (l != null) {
      if (!(y in l)) {
        if (!r)
          throw new dt("base intrinsic for " + e + " exists, but the property is not available.");
        return;
      }
      if (nt && f + 1 >= n.length) {
        var b = nt(l, y);
        p = !!b, p && "get" in b && !("originalValue" in b.get) ? l = b.get : l = l[y];
      } else
        p = Or(l, y), l = l[y];
      p && !u && (it[s] = l);
    }
  }
  return l;
}, ra = { exports: {} };
(function(t) {
  var e = Ao, r = ge, n = r("%Function.prototype.apply%"), i = r("%Function.prototype.call%"), o = r("%Reflect.apply%", !0) || e.call(i, n), s = r("%Object.getOwnPropertyDescriptor%", !0), l = r("%Object.defineProperty%", !0), u = r("%Math.max%");
  if (l)
    try {
      l({}, "a", { value: 1 });
    } catch {
      l = null;
    }
  t.exports = function(p) {
    var y = o(e, i, arguments);
    if (s && l) {
      var g = s(y, "length");
      g.configurable && l(
        y,
        "length",
        { value: 1 + u(0, p.length - (arguments.length - 1)) }
      );
    }
    return y;
  };
  var c = function() {
    return o(e, n, arguments);
  };
  l ? l(t.exports, "apply", { value: c }) : t.exports.apply = c;
})(ra);
var xo = ra.exports, na = ge, ia = xo, wu = ia(na("String.prototype.indexOf")), _e = function(e, r) {
  var n = na(e, !!r);
  return typeof n == "function" && wu(e, ".prototype.") > -1 ? ia(n) : n;
}, _u = Cr, Se = function() {
  return _u() && !!Symbol.toStringTag;
}, oa = _e, Su = oa("Boolean.prototype.toString"), Ou = oa("Object.prototype.toString"), Eu = function(e) {
  try {
    return Su(e), !0;
  } catch {
    return !1;
  }
}, Tu = "[object Boolean]", Au = Se(), ju = function(e) {
  return typeof e == "boolean" ? !0 : e === null || typeof e != "object" ? !1 : Au && Symbol.toStringTag in e ? Eu(e) : Ou(e) === Tu;
}, $u = Date.prototype.getDay, xu = function(e) {
  try {
    return $u.call(e), !0;
  } catch {
    return !1;
  }
}, ku = Object.prototype.toString, Cu = "[object Date]", Pu = Se(), Ru = function(e) {
  return typeof e != "object" || e === null ? !1 : Pu ? xu(e) : ku.call(e) === Cu;
}, Iu = Object.prototype.toString, Mu = Function.prototype.toString, Bu = /^\s*(?:function)?\*/, sa = Se(), pi = Object.getPrototypeOf, Fu = function() {
  if (!sa)
    return !1;
  try {
    return Function("return function*() {}")();
  } catch {
  }
}, di, Lu = function(e) {
  if (typeof e != "function")
    return !1;
  if (Bu.test(Mu.call(e)))
    return !0;
  if (!sa) {
    var r = Iu.call(e);
    return r === "[object GeneratorFunction]";
  }
  if (!pi)
    return !1;
  if (typeof di > "u") {
    var n = Fu();
    di = n ? pi(n) : !1;
  }
  return pi(e) === di;
}, Hu = Number.prototype.toString, Du = function(e) {
  try {
    return Hu.call(e), !0;
  } catch {
    return !1;
  }
}, Nu = Object.prototype.toString, Wu = "[object Number]", Uu = Se(), Gu = function(e) {
  return typeof e == "number" ? !0 : typeof e != "object" ? !1 : Uu ? Du(e) : Nu.call(e) === Wu;
}, Qi = _e, aa = Se(), ca, ua, eo, to;
if (aa) {
  ca = Qi("Object.prototype.hasOwnProperty"), ua = Qi("RegExp.prototype.exec"), eo = {};
  var yi = function() {
    throw eo;
  };
  to = {
    toString: yi,
    valueOf: yi
  }, typeof Symbol.toPrimitive == "symbol" && (to[Symbol.toPrimitive] = yi);
}
var qu = Qi("Object.prototype.toString"), Ku = Object.getOwnPropertyDescriptor, zu = "[object RegExp]", Vu = aa ? function(e) {
  if (!e || typeof e != "object")
    return !1;
  var r = Ku(e, "lastIndex"), n = r && ca(r, "value");
  if (!n)
    return !1;
  try {
    ua(e, to);
  } catch (i) {
    return i === eo;
  }
} : function(e) {
  return !e || typeof e != "object" && typeof e != "function" ? !1 : qu(e) === zu;
}, Yu = String.prototype.valueOf, Xu = function(e) {
  try {
    return Yu.call(e), !0;
  } catch {
    return !1;
  }
}, Ju = Object.prototype.toString, Zu = "[object String]", Qu = Se(), el = function(e) {
  return typeof e == "string" ? !0 : typeof e != "object" ? !1 : Qu ? Xu(e) : Ju.call(e) === Zu;
}, ro = { exports: {} }, tl = Object.prototype.toString, rl = $o();
if (rl) {
  var nl = Symbol.prototype.toString, il = /^Symbol\(.*\)$/, ol = function(e) {
    return typeof e.valueOf() != "symbol" ? !1 : il.test(nl.call(e));
  };
  ro.exports = function(e) {
    if (typeof e == "symbol")
      return !0;
    if (tl.call(e) !== "[object Symbol]")
      return !1;
    try {
      return ol(e);
    } catch {
      return !1;
    }
  };
} else
  ro.exports = function(e) {
    return !1;
  };
var sl = ro.exports, no = { exports: {} }, Qo = typeof BigInt < "u" && BigInt, la = function() {
  return typeof Qo == "function" && typeof BigInt == "function" && typeof Qo(42) == "bigint" && typeof BigInt(42) == "bigint";
}, al = la();
if (al) {
  var cl = BigInt.prototype.valueOf, ul = function(e) {
    try {
      return cl.call(e), !0;
    } catch {
    }
    return !1;
  };
  no.exports = function(e) {
    return e === null || typeof e > "u" || typeof e == "boolean" || typeof e == "string" || typeof e == "number" || typeof e == "symbol" || typeof e == "function" ? !1 : typeof e == "bigint" ? !0 : ul(e);
  };
} else
  no.exports = function(e) {
    return !1;
  };
var ll = no.exports, fl = Se(), pl = _e, io = pl("Object.prototype.toString"), ko = function(e) {
  return fl && e && typeof e == "object" && Symbol.toStringTag in e ? !1 : io(e) === "[object Arguments]";
}, dl = function(e) {
  return ko(e) ? !0 : e !== null && typeof e == "object" && typeof e.length == "number" && e.length >= 0 && io(e) !== "[object Array]" && io(e.callee) === "[object Function]";
};
(function() {
  return ko(arguments);
})();
ko.isLegacyArguments = dl;
const yl = {}, hl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: yl
}, Symbol.toStringTag, { value: "Module" })), fa = /* @__PURE__ */ Ic(hl);
var Co = ge, gt = _e;
Co("%TypeError%");
Co("%WeakMap%", !0);
Co("%Map%", !0);
gt("WeakMap.prototype.get", !0);
gt("WeakMap.prototype.set", !0);
gt("WeakMap.prototype.has", !0);
gt("Map.prototype.get", !0);
gt("Map.prototype.set", !0);
gt("Map.prototype.has", !0);
var gl = ge;
gl("%TypeError%");
var Po = typeof Map == "function" && Map.prototype ? Map : null, bl = typeof Set == "function" && Set.prototype ? Set : null, Tr;
Po || (Tr = function(e) {
  return !1;
});
var pa = Po ? Map.prototype.has : null, es = bl ? Set.prototype.has : null;
!Tr && !pa && (Tr = function(e) {
  return !1;
});
var ml = Tr || function(e) {
  if (!e || typeof e != "object")
    return !1;
  try {
    if (pa.call(e), es)
      try {
        es.call(e);
      } catch {
        return !0;
      }
    return e instanceof Po;
  } catch {
  }
  return !1;
}, vl = typeof Map == "function" && Map.prototype ? Map : null, Ro = typeof Set == "function" && Set.prototype ? Set : null, Ar;
Ro || (Ar = function(e) {
  return !1;
});
var ts = vl ? Map.prototype.has : null, da = Ro ? Set.prototype.has : null;
!Ar && !da && (Ar = function(e) {
  return !1;
});
var wl = Ar || function(e) {
  if (!e || typeof e != "object")
    return !1;
  try {
    if (da.call(e), ts)
      try {
        ts.call(e);
      } catch {
        return !0;
      }
    return e instanceof Ro;
  } catch {
  }
  return !1;
};
if (!($o() || Cr())) {
  var rs = ge, _l = rs("%Map%", !0), Sl = rs("%Set%", !0), we = _e;
  we("Array.prototype.push"), we("String.prototype.charCodeAt"), we("String.prototype.slice"), !_l && !Sl || (we("Map.prototype.forEach", !0), we("Set.prototype.forEach", !0), (typeof process > "u" || !process.versions || !process.versions.node) && (we("Map.prototype.iterator", !0), we("Set.prototype.iterator", !0)), we("Map.prototype.@@iterator", !0) || we("Map.prototype._es6-shim iterator_", !0), we("Set.prototype.@@iterator", !0) || we("Set.prototype._es6-shim iterator_", !0));
}
var jr = typeof WeakMap == "function" && WeakMap.prototype ? WeakMap : null, ns = typeof WeakSet == "function" && WeakSet.prototype ? WeakSet : null, $r;
jr || ($r = function(e) {
  return !1;
});
var oo = jr ? jr.prototype.has : null, hi = ns ? ns.prototype.has : null;
!$r && !oo && ($r = function(e) {
  return !1;
});
var Ol = $r || function(e) {
  if (!e || typeof e != "object")
    return !1;
  try {
    if (oo.call(e, oo), hi)
      try {
        hi.call(e, hi);
      } catch {
        return !0;
      }
    return e instanceof jr;
  } catch {
  }
  return !1;
}, so = { exports: {} }, El = ge, ya = _e, Tl = El("%WeakSet%", !0), gi = ya("WeakSet.prototype.has", !0);
if (gi) {
  var bi = ya("WeakMap.prototype.has", !0);
  so.exports = function(e) {
    if (!e || typeof e != "object")
      return !1;
    try {
      if (gi(e, gi), bi)
        try {
          bi(e, bi);
        } catch {
          return !0;
        }
      return e instanceof Tl;
    } catch {
    }
    return !1;
  };
} else
  so.exports = function(e) {
    return !1;
  };
var Al = so.exports, jl = ml, $l = wl, xl = Ol, kl = Al, Cl = function(e) {
  if (e && typeof e == "object") {
    if (jl(e))
      return "Map";
    if ($l(e))
      return "Set";
    if (xl(e))
      return "WeakMap";
    if (kl(e))
      return "WeakSet";
  }
  return !1;
}, Pl = el, Rl = Gu, Il = ju, Ml = sl, Bl = ll, Fl = function(e) {
  if (e == null || typeof e != "object" && typeof e != "function")
    return null;
  if (Pl(e))
    return "String";
  if (Rl(e))
    return "Number";
  if (Il(e))
    return "Boolean";
  if (Ml(e))
    return "Symbol";
  if (Bl(e))
    return "BigInt";
}, Ll = ge, Hl = Ll("%TypeError%"), Dl = function(e, r) {
  if (e == null)
    throw new Hl(r || "Cannot call method on " + e);
  return e;
}, ha = Dl, Nl = ge, Wl = Nl("%Object%"), Ul = ha, Gl = function(e) {
  return Ul(e), Wl(e);
}, is = Object.prototype.toString, ga = function(e) {
  var r = is.call(e), n = r === "[object Arguments]";
  return n || (n = r !== "[object Array]" && e !== null && typeof e == "object" && typeof e.length == "number" && e.length >= 0 && is.call(e.callee) === "[object Function]"), n;
}, mi, os;
function ql() {
  if (os)
    return mi;
  os = 1;
  var t;
  if (!Object.keys) {
    var e = Object.prototype.hasOwnProperty, r = Object.prototype.toString, n = ga, i = Object.prototype.propertyIsEnumerable, o = !i.call({ toString: null }, "toString"), s = i.call(function() {
    }, "prototype"), l = [
      "toString",
      "toLocaleString",
      "valueOf",
      "hasOwnProperty",
      "isPrototypeOf",
      "propertyIsEnumerable",
      "constructor"
    ], u = function(y) {
      var g = y.constructor;
      return g && g.prototype === y;
    }, c = {
      $applicationCache: !0,
      $console: !0,
      $external: !0,
      $frame: !0,
      $frameElement: !0,
      $frames: !0,
      $innerHeight: !0,
      $innerWidth: !0,
      $onmozfullscreenchange: !0,
      $onmozfullscreenerror: !0,
      $outerHeight: !0,
      $outerWidth: !0,
      $pageXOffset: !0,
      $pageYOffset: !0,
      $parent: !0,
      $scrollLeft: !0,
      $scrollTop: !0,
      $scrollX: !0,
      $scrollY: !0,
      $self: !0,
      $webkitIndexedDB: !0,
      $webkitStorageInfo: !0,
      $window: !0
    }, f = function() {
      if (typeof window > "u")
        return !1;
      for (var y in window)
        try {
          if (!c["$" + y] && e.call(window, y) && window[y] !== null && typeof window[y] == "object")
            try {
              u(window[y]);
            } catch {
              return !0;
            }
        } catch {
          return !0;
        }
      return !1;
    }(), p = function(y) {
      if (typeof window > "u" || !f)
        return u(y);
      try {
        return u(y);
      } catch {
        return !1;
      }
    };
    t = function(g) {
      var m = g !== null && typeof g == "object", b = r.call(g) === "[object Function]", j = n(g), $ = m && r.call(g) === "[object String]", v = [];
      if (!m && !b && !j)
        throw new TypeError("Object.keys called on a non-object");
      var O = s && b;
      if ($ && g.length > 0 && !e.call(g, 0))
        for (var S = 0; S < g.length; ++S)
          v.push(String(S));
      if (j && g.length > 0)
        for (var x = 0; x < g.length; ++x)
          v.push(String(x));
      else
        for (var C in g)
          !(O && C === "prototype") && e.call(g, C) && v.push(String(C));
      if (o)
        for (var R = p(g), L = 0; L < l.length; ++L)
          !(R && l[L] === "constructor") && e.call(g, l[L]) && v.push(l[L]);
      return v;
    };
  }
  return mi = t, mi;
}
var Kl = Array.prototype.slice, zl = ga, ss = Object.keys, br = ss ? function(e) {
  return ss(e);
} : ql(), as = Object.keys;
br.shim = function() {
  if (Object.keys) {
    var e = function() {
      var r = Object.keys(arguments);
      return r && r.length === arguments.length;
    }(1, 2);
    e || (Object.keys = function(n) {
      return zl(n) ? as(Kl.call(n)) : as(n);
    });
  } else
    Object.keys = br;
  return Object.keys || br;
};
var Vl = br, Yl = ge, ao = Yl("%Object.defineProperty%", !0), co = function() {
  if (ao)
    try {
      return ao({}, "a", { value: 1 }), !0;
    } catch {
      return !1;
    }
  return !1;
};
co.hasArrayLengthDefineBug = function() {
  if (!co())
    return null;
  try {
    return ao([], "length", { value: 1 }).length !== 1;
  } catch {
    return !0;
  }
};
var Xl = co, Jl = Vl, Zl = typeof Symbol == "function" && typeof Symbol("foo") == "symbol", Ql = Object.prototype.toString, ef = Array.prototype.concat, ba = Object.defineProperty, tf = function(t) {
  return typeof t == "function" && Ql.call(t) === "[object Function]";
}, rf = Xl(), ma = ba && rf, nf = function(t, e, r, n) {
  if (e in t) {
    if (n === !0) {
      if (t[e] === r)
        return;
    } else if (!tf(n) || !n())
      return;
  }
  ma ? ba(t, e, {
    configurable: !0,
    enumerable: !1,
    value: r,
    writable: !0
  }) : t[e] = r;
}, va = function(t, e) {
  var r = arguments.length > 2 ? arguments[2] : {}, n = Jl(e);
  Zl && (n = ef.call(n, Object.getOwnPropertySymbols(e)));
  for (var i = 0; i < n.length; i += 1)
    nf(t, n[i], e[n[i]], r[n[i]]);
};
va.supportsDescriptors = !!ma;
var Pr = va, of = jo, sf = function(e) {
  if (e === null)
    return "Null";
  if (typeof e > "u")
    return "Undefined";
  if (typeof e == "function" || typeof e == "object")
    return "Object";
  if (typeof e == "number")
    return "Number";
  if (typeof e == "boolean")
    return "Boolean";
  if (typeof e == "string")
    return "String";
}, af = sf, wa = function(e) {
  return typeof e == "symbol" ? "Symbol" : typeof e == "bigint" ? "BigInt" : af(e);
}, cf = jo, uf = Object.prototype.toString, _a = Object.prototype.hasOwnProperty, lf = function(e, r, n) {
  for (var i = 0, o = e.length; i < o; i++)
    _a.call(e, i) && (n == null ? r(e[i], i, e) : r.call(n, e[i], i, e));
}, ff = function(e, r, n) {
  for (var i = 0, o = e.length; i < o; i++)
    n == null ? r(e.charAt(i), i, e) : r.call(n, e.charAt(i), i, e);
}, pf = function(e, r, n) {
  for (var i in e)
    _a.call(e, i) && (n == null ? r(e[i], i, e) : r.call(n, e[i], i, e));
}, df = function(e, r, n) {
  if (!cf(r))
    throw new TypeError("iterator must be a function");
  var i;
  arguments.length >= 3 && (i = n), uf.call(e) === "[object Array]" ? lf(e, r, i) : typeof e == "string" ? ff(e, r, i) : pf(e, r, i);
}, Sa = df, vi = [
  "BigInt64Array",
  "BigUint64Array",
  "Float32Array",
  "Float64Array",
  "Int16Array",
  "Int32Array",
  "Int8Array",
  "Uint16Array",
  "Uint32Array",
  "Uint8Array",
  "Uint8ClampedArray"
], yf = typeof globalThis > "u" ? Y : globalThis, Oa = function() {
  for (var e = [], r = 0; r < vi.length; r++)
    typeof yf[vi[r]] == "function" && (e[e.length] = vi[r]);
  return e;
}, hf = ge, mr = hf("%Object.getOwnPropertyDescriptor%", !0);
if (mr)
  try {
    mr([], "length");
  } catch {
    mr = null;
  }
var Ea = mr, wi, cs;
function gf() {
  if (cs)
    return wi;
  cs = 1;
  var t = Sa, e = Oa, r = _e, n = r("Object.prototype.toString"), i = Se(), o = Ea, s = typeof globalThis > "u" ? Y : globalThis, l = e(), u = r("Array.prototype.indexOf", !0) || function(m, b) {
    for (var j = 0; j < m.length; j += 1)
      if (m[j] === b)
        return j;
    return -1;
  }, c = r("String.prototype.slice"), f = {}, p = Object.getPrototypeOf;
  i && o && p && t(l, function(g) {
    var m = new s[g]();
    if (Symbol.toStringTag in m) {
      var b = p(m), j = o(b, Symbol.toStringTag);
      if (!j) {
        var $ = p(b);
        j = o($, Symbol.toStringTag);
      }
      f[g] = j.get;
    }
  });
  var y = function(m) {
    var b = !1;
    return t(f, function(j, $) {
      if (!b)
        try {
          b = j.call(m) === $;
        } catch {
        }
    }), b;
  };
  return wi = function(m) {
    if (!m || typeof m != "object")
      return !1;
    if (!i || !(Symbol.toStringTag in m)) {
      var b = c(n(m), 8, -1);
      return u(l, b) > -1;
    }
    return o ? y(m) : !1;
  }, wi;
}
var Ta = Sa, bf = Oa, Aa = _e, _i = Ea, mf = Aa("Object.prototype.toString"), ja = Se(), us = typeof globalThis > "u" ? Y : globalThis, vf = bf(), wf = Aa("String.prototype.slice"), $a = {}, Si = Object.getPrototypeOf;
ja && _i && Si && Ta(vf, function(t) {
  if (typeof us[t] == "function") {
    var e = new us[t]();
    if (Symbol.toStringTag in e) {
      var r = Si(e), n = _i(r, Symbol.toStringTag);
      if (!n) {
        var i = Si(r);
        n = _i(i, Symbol.toStringTag);
      }
      $a[t] = n.get;
    }
  }
});
var _f = function(e) {
  var r = !1;
  return Ta($a, function(n, i) {
    if (!r)
      try {
        var o = n.call(e);
        o === i && (r = o);
      } catch {
      }
  }), r;
}, Sf = gf(), Of = function(e) {
  return Sf(e) ? !ja || !(Symbol.toStringTag in e) ? wf(mf(e), 8, -1) : _f(e) : !1;
}, Ef = _e, Tf = Ef("WeakRef.prototype.deref", !0), Af = typeof WeakRef > "u" ? function(e) {
  return !1;
} : function(e) {
  if (!e || typeof e != "object")
    return !1;
  try {
    return Tf(e), !0;
  } catch {
    return !1;
  }
}, jf = _e, ls = jf("FinalizationRegistry.prototype.register", !0), $f = ls ? function(e) {
  if (!e || typeof e != "object")
    return !1;
  try {
    return ls(e, {}), !0;
  } catch {
    return !1;
  }
} : function(e) {
  return !1;
}, xf = jo, Oi, fs;
function Io() {
  if (fs)
    return Oi;
  fs = 1;
  var t = function() {
    return typeof function() {
    }.name == "string";
  }, e = Object.getOwnPropertyDescriptor;
  if (e)
    try {
      e([], "length");
    } catch {
      e = null;
    }
  t.functionsHaveConfigurableNames = function() {
    if (!t() || !e)
      return !1;
    var i = e(function() {
    }, "name");
    return !!i && !!i.configurable;
  };
  var r = Function.prototype.bind;
  return t.boundFunctionsHaveNames = function() {
    return t() && typeof r == "function" && function() {
    }.bind().name !== "";
  }, Oi = t, Oi;
}
var xa = xf, kf = Io()(), ka = _e, Ca = ka("Function.prototype.toString"), Pa = ka("String.prototype.match"), Cf = /^class /, Pf = function(e) {
  if (xa(e) || typeof e != "function")
    return !1;
  try {
    var r = Pa(Ca(e), Cf);
    return !!r;
  } catch {
  }
  return !1;
}, Rf = /\s*function\s+([^(\s]*)\s*/, If = Function.prototype, Ra = function() {
  if (!Pf(this) && !xa(this))
    throw new TypeError("Function.prototype.name sham getter called on non-function");
  if (kf)
    return this.name;
  if (this === If)
    return "";
  var e = Ca(this), r = Pa(e, Rf), n = r && r[1];
  return n;
}, Mf = Ra, Ia = function() {
  return Mf;
}, Bf = Pr.supportsDescriptors, Ff = Io()(), Lf = Ia, ps = Object.defineProperty, Hf = TypeError, Df = function() {
  var e = Lf();
  if (Ff)
    return e;
  if (!Bf)
    throw new Hf("Shimming Function.prototype.name support requires ES5 property descriptor support.");
  var r = Function.prototype;
  return ps(r, "name", {
    configurable: !0,
    enumerable: !1,
    get: function() {
      var n = e.call(this);
      return this !== r && ps(this, "name", {
        configurable: !0,
        enumerable: !1,
        value: n,
        writable: !1
      }), n;
    }
  }), e;
}, Nf = Pr, Wf = xo, Ma = Ra, Uf = Ia, Gf = Df, Ba = Wf(Ma);
Nf(Ba, {
  getPolyfill: Uf,
  implementation: Ma,
  shim: Gf
});
var qf = Ba, Kf = Object.prototype.toString, zf = Function.prototype.toString, Vf = /^\s*async(?:\s+function(?:\s+|\()|\s*\()/, Fa = Se(), Ei = Object.getPrototypeOf, Yf = function() {
  if (!Fa)
    return !1;
  try {
    return Function("return async function () {}")();
  } catch {
  }
}, Ti, Xf = function(e) {
  if (typeof e != "function")
    return !1;
  if (Vf.test(zf.call(e)))
    return !0;
  if (!Fa) {
    var r = Kf.call(e);
    return r === "[object AsyncFunction]";
  }
  if (!Ei)
    return !1;
  if (typeof Ti > "u") {
    var n = Yf();
    Ti = n ? Ei(n) : !1;
  }
  return Ei(e) === Ti;
}, Jf = Fl, Zf = Cl, Qf = Of, ep = Jc, tp = Ru, rp = Vu, np = Af, ip = $f, op = qf, sp = Lu, ap = Xf, cp = Se(), Ai = cp && Symbol.toStringTag, up = Object, ds = typeof Promise == "function" && Promise.prototype.then, lp = function(e) {
  if (!e || typeof e != "object" || !ds)
    return !1;
  try {
    return ds.call(e, null, function() {
    }), !0;
  } catch {
  }
  return !1;
}, ys = function(e) {
  return e && e !== "BigInt" && e !== "Boolean" && e !== "Null" && e !== "Number" && e !== "String" && e !== "Symbol" && e !== "Undefined" && e !== "Math" && e !== "JSON" && e !== "Reflect" && e !== "Atomics" && e !== "Map" && e !== "Set" && e !== "WeakMap" && e !== "WeakSet" && e !== "BigInt64Array" && e !== "BigUint64Array" && e !== "Float32Array" && e !== "Float64Array" && e !== "Int16Array" && e !== "Int32Array" && e !== "Int8Array" && e !== "Uint16Array" && e !== "Uint32Array" && e !== "Uint8Array" && e !== "Uint8ClampedArray" && e !== "Array" && e !== "Date" && e !== "FinalizationRegistry" && e !== "Promise" && e !== "RegExp" && e !== "WeakRef" && e !== "Function" && e !== "GeneratorFunction" && e !== "AsyncFunction";
}, fp = function(e) {
  if (e == null)
    return e;
  var r = Jf(up(e)) || Zf(e) || Qf(e);
  if (r)
    return r;
  if (ep(e))
    return "Array";
  if (tp(e))
    return "Date";
  if (rp(e))
    return "RegExp";
  if (np(e))
    return "WeakRef";
  if (ip(e))
    return "FinalizationRegistry";
  if (typeof e == "function")
    return sp(e) ? "GeneratorFunction" : ap(e) ? "AsyncFunction" : "Function";
  if (lp(e))
    return "Promise";
  if (Ai && Ai in e) {
    var n = e[Ai];
    if (ys(n))
      return n;
  }
  if (typeof e.constructor == "function") {
    var i = op(e.constructor);
    if (ys(i))
      return i;
  }
  return "Object";
}, Rr = ge, pp = of, dp = wa, yp = fp, hs = Rr("%Object.getPrototypeOf%", !0), hp = Rr("%Object.prototype%"), gp = Rr("%TypeError%"), bp = [].__proto__ === Array.prototype, La = function(e) {
  if (dp(e) !== "Object")
    throw new gp("Reflect.getPrototypeOf called on non-object");
  if (hs)
    return hs(e);
  if (bp) {
    var r = e.__proto__;
    if (r || r === null)
      return r;
  }
  var n = yp(e);
  if (n) {
    var i = Rr("%" + n + "%.prototype", !0);
    if (i)
      return i;
  }
  return pp(e.constructor) ? e.constructor.prototype : e instanceof Object ? hp : null;
}, mp = wa, vp = ge, wp = vp("%TypeError%"), _p = La, Sp = [].__proto__ === Array.prototype, Op = function(e) {
  if (mp(e) !== "Object")
    throw new wp("Reflect.getPrototypeOf called on non-object");
  return e.__proto__;
}, Ha = function() {
  return typeof Reflect == "object" && Reflect && Reflect.getPrototypeOf ? Reflect.getPrototypeOf : Sp ? Op : _p;
}, gs = Pr, Ep = Ha, Tp = function() {
  gs(
    Y,
    { Reflect: {} },
    { Reflect: function() {
      return typeof Reflect != "object" || !Reflect;
    } }
  );
  var e = Ep();
  return gs(
    Reflect,
    { getPrototypeOf: e },
    { getPrototypeOf: function() {
      return Reflect.getPrototypeOf !== e;
    } }
  ), e;
}, Ap = xo, jp = Pr, $p = La, Da = Ha, xp = Tp, Na = Ap(Da(), typeof Reflect == "object" ? Reflect : Object);
jp(Na, {
  getPolyfill: Da,
  implementation: $p,
  shim: xp
});
var kp = Na, Cp = Gl, Pp = kp, Rp = function(e) {
  return Pp(Cp(e));
}, Wa = ha, Ip = Rp, Mp = [].__proto__ === Array.prototype, Bp = function(e) {
  return Wa(e), e.__proto__;
}, vr = Object.getPrototypeOf, Fp = function(e) {
  return Wa(e), vr(Object(e));
}, Lp = function() {
  if (vr) {
    try {
      vr(!0);
    } catch {
      return Fp;
    }
    return vr;
  }
  return Mp ? Bp : Ip;
};
Lp();
Cr();
la();
Io()();
var Hp = function(t, e) {
  for (var r = [], n = 0; n < t.length; n++) {
    var i = e(t[n], n);
    Dp(i) ? r.push.apply(r, i) : r.push(i);
  }
  return r;
}, Dp = Array.isArray || function(t) {
  return Object.prototype.toString.call(t) === "[object Array]";
}, Np = Ua;
function Ua(t, e, r) {
  t instanceof RegExp && (t = bs(t, r)), e instanceof RegExp && (e = bs(e, r));
  var n = Ga(t, e, r);
  return n && {
    start: n[0],
    end: n[1],
    pre: r.slice(0, n[0]),
    body: r.slice(n[0] + t.length, n[1]),
    post: r.slice(n[1] + e.length)
  };
}
function bs(t, e) {
  var r = e.match(t);
  return r ? r[0] : null;
}
Ua.range = Ga;
function Ga(t, e, r) {
  var n, i, o, s, l, u = r.indexOf(t), c = r.indexOf(e, u + 1), f = u;
  if (u >= 0 && c > 0) {
    if (t === e)
      return [u, c];
    for (n = [], o = r.length; f >= 0 && !l; )
      f == u ? (n.push(f), u = r.indexOf(t, f + 1)) : n.length == 1 ? l = [n.pop(), c] : (i = n.pop(), i < o && (o = i, s = c), c = r.indexOf(e, f + 1)), f = u < c && u >= 0 ? u : c;
    n.length && (l = [o, s]);
  }
  return l;
}
var Wp = Hp, qa = Np, Up = Kp, Ka = "\0SLASH" + Math.random() + "\0", za = "\0OPEN" + Math.random() + "\0", Mo = "\0CLOSE" + Math.random() + "\0", Va = "\0COMMA" + Math.random() + "\0", Ya = "\0PERIOD" + Math.random() + "\0";
function ji(t) {
  return parseInt(t, 10) == t ? parseInt(t, 10) : t.charCodeAt(0);
}
function Gp(t) {
  return t.split("\\\\").join(Ka).split("\\{").join(za).split("\\}").join(Mo).split("\\,").join(Va).split("\\.").join(Ya);
}
function qp(t) {
  return t.split(Ka).join("\\").split(za).join("{").split(Mo).join("}").split(Va).join(",").split(Ya).join(".");
}
function Xa(t) {
  if (!t)
    return [""];
  var e = [], r = qa("{", "}", t);
  if (!r)
    return t.split(",");
  var n = r.pre, i = r.body, o = r.post, s = n.split(",");
  s[s.length - 1] += "{" + i + "}";
  var l = Xa(o);
  return o.length && (s[s.length - 1] += l.shift(), s.push.apply(s, l)), e.push.apply(e, s), e;
}
function Kp(t) {
  return t ? (t.substr(0, 2) === "{}" && (t = "\\{\\}" + t.substr(2)), ft(Gp(t), !0).map(qp)) : [];
}
function zp(t) {
  return "{" + t + "}";
}
function Vp(t) {
  return /^-?0\d/.test(t);
}
function Yp(t, e) {
  return t <= e;
}
function Xp(t, e) {
  return t >= e;
}
function ft(t, e) {
  var r = [], n = qa("{", "}", t);
  if (!n || /\$$/.test(n.pre))
    return [t];
  var i = /^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(n.body), o = /^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(n.body), s = i || o, l = n.body.indexOf(",") >= 0;
  if (!s && !l)
    return n.post.match(/,.*\}/) ? (t = n.pre + "{" + n.body + Mo + n.post, ft(t)) : [t];
  var u;
  if (s)
    u = n.body.split(/\.\./);
  else if (u = Xa(n.body), u.length === 1 && (u = ft(u[0], !1).map(zp), u.length === 1)) {
    var f = n.post.length ? ft(n.post, !1) : [""];
    return f.map(function(X) {
      return n.pre + u[0] + X;
    });
  }
  var c = n.pre, f = n.post.length ? ft(n.post, !1) : [""], p;
  if (s) {
    var y = ji(u[0]), g = ji(u[1]), m = Math.max(u[0].length, u[1].length), b = u.length == 3 ? Math.abs(ji(u[2])) : 1, j = Yp, $ = g < y;
    $ && (b *= -1, j = Xp);
    var v = u.some(Vp);
    p = [];
    for (var O = y; j(O, g); O += b) {
      var S;
      if (o)
        S = String.fromCharCode(O), S === "\\" && (S = "");
      else if (S = String(O), v) {
        var x = m - S.length;
        if (x > 0) {
          var C = new Array(x + 1).join("0");
          O < 0 ? S = "-" + C + S.slice(1) : S = C + S;
        }
      }
      p.push(S);
    }
  } else
    p = Wp(u, function(K) {
      return ft(K, !1);
    });
  for (var R = 0; R < p.length; R++)
    for (var L = 0; L < f.length; L++) {
      var H = c + p[R] + f[L];
      (!e || s || H) && r.push(H);
    }
  return r;
}
he.Minimatch = ee;
var zt = function() {
  try {
    return fa;
  } catch {
  }
}() || {
  sep: "/"
};
he.sep = zt.sep;
var Bo = he.GLOBSTAR = ee.GLOBSTAR = {}, Jp = Up, ms = {
  "!": { open: "(?:(?!(?:", close: "))[^/]*?)" },
  "?": { open: "(?:", close: ")?" },
  "+": { open: "(?:", close: ")+" },
  "*": { open: "(?:", close: ")*" },
  "@": { open: "(?:", close: ")" }
}, uo = "[^/]", lo = uo + "*?", Zp = "(?:(?!(?:\\/|^)(?:\\.{1,2})($|\\/)).)*?", Qp = "(?:(?!(?:\\/|^)\\.).)*?", vs = ed("().*{}+?[]^$\\!");
function ed(t) {
  return t.split("").reduce(function(e, r) {
    return e[r] = !0, e;
  }, {});
}
var Ja = /\/+/;
he.filter = td;
function td(t, e) {
  return e = e || {}, function(r, n, i) {
    return he(r, t, e);
  };
}
function Le(t, e) {
  e = e || {};
  var r = {};
  return Object.keys(t).forEach(function(n) {
    r[n] = t[n];
  }), Object.keys(e).forEach(function(n) {
    r[n] = e[n];
  }), r;
}
he.defaults = function(t) {
  if (!t || typeof t != "object" || !Object.keys(t).length)
    return he;
  var e = he, r = function(i, o, s) {
    return e(i, o, Le(t, s));
  };
  return r.Minimatch = function(i, o) {
    return new e.Minimatch(i, Le(t, o));
  }, r.Minimatch.defaults = function(i) {
    return e.defaults(Le(t, i)).Minimatch;
  }, r.filter = function(i, o) {
    return e.filter(i, Le(t, o));
  }, r.defaults = function(i) {
    return e.defaults(Le(t, i));
  }, r.makeRe = function(i, o) {
    return e.makeRe(i, Le(t, o));
  }, r.braceExpand = function(i, o) {
    return e.braceExpand(i, Le(t, o));
  }, r.match = function(n, i, o) {
    return e.match(n, i, Le(t, o));
  }, r;
};
ee.defaults = function(t) {
  return he.defaults(t).Minimatch;
};
function he(t, e, r) {
  return Ir(e), r || (r = {}), !r.nocomment && e.charAt(0) === "#" ? !1 : new ee(e, r).match(t);
}
function ee(t, e) {
  if (!(this instanceof ee))
    return new ee(t, e);
  Ir(t), e || (e = {}), t = t.trim(), !e.allowWindowsEscape && zt.sep !== "/" && (t = t.split(zt.sep).join("/")), this.options = e, this.set = [], this.pattern = t, this.regexp = null, this.negate = !1, this.comment = !1, this.empty = !1, this.partial = !!e.partial, this.make();
}
ee.prototype.debug = function() {
};
ee.prototype.make = rd;
function rd() {
  var t = this.pattern, e = this.options;
  if (!e.nocomment && t.charAt(0) === "#") {
    this.comment = !0;
    return;
  }
  if (!t) {
    this.empty = !0;
    return;
  }
  this.parseNegate();
  var r = this.globSet = this.braceExpand();
  e.debug && (this.debug = function() {
    console.error.apply(console, arguments);
  }), this.debug(this.pattern, r), r = this.globParts = r.map(function(n) {
    return n.split(Ja);
  }), this.debug(this.pattern, r), r = r.map(function(n, i, o) {
    return n.map(this.parse, this);
  }, this), this.debug(this.pattern, r), r = r.filter(function(n) {
    return n.indexOf(!1) === -1;
  }), this.debug(this.pattern, r), this.set = r;
}
ee.prototype.parseNegate = nd;
function nd() {
  var t = this.pattern, e = !1, r = this.options, n = 0;
  if (!r.nonegate) {
    for (var i = 0, o = t.length; i < o && t.charAt(i) === "!"; i++)
      e = !e, n++;
    n && (this.pattern = t.substr(n)), this.negate = e;
  }
}
he.braceExpand = function(t, e) {
  return Za(t, e);
};
ee.prototype.braceExpand = Za;
function Za(t, e) {
  return e || (this instanceof ee ? e = this.options : e = {}), t = typeof t > "u" ? this.pattern : t, Ir(t), e.nobrace || !/\{(?:(?!\{).)*\}/.test(t) ? [t] : Jp(t);
}
var id = 1024 * 64, Ir = function(t) {
  if (typeof t != "string")
    throw new TypeError("invalid pattern");
  if (t.length > id)
    throw new TypeError("pattern is too long");
};
ee.prototype.parse = od;
var ir = {};
function od(t, e) {
  Ir(t);
  var r = this.options;
  if (t === "**")
    if (r.noglobstar)
      t = "*";
    else
      return Bo;
  if (t === "")
    return "";
  var n = "", i = !!r.nocase, o = !1, s = [], l = [], u, c = !1, f = -1, p = -1, y = t.charAt(0) === "." ? "" : r.dot ? "(?!(?:^|\\/)\\.{1,2}(?:$|\\/))" : "(?!\\.)", g = this;
  function m() {
    if (u) {
      switch (u) {
        case "*":
          n += lo, i = !0;
          break;
        case "?":
          n += uo, i = !0;
          break;
        default:
          n += "\\" + u;
          break;
      }
      g.debug("clearStateChar %j %j", u, n), u = !1;
    }
  }
  for (var b = 0, j = t.length, $; b < j && ($ = t.charAt(b)); b++) {
    if (this.debug("%s	%s %s %j", t, b, n, $), o && vs[$]) {
      n += "\\" + $, o = !1;
      continue;
    }
    switch ($) {
      case "/":
        return !1;
      case "\\":
        m(), o = !0;
        continue;
      case "?":
      case "*":
      case "+":
      case "@":
      case "!":
        if (this.debug("%s	%s %s %j <-- stateChar", t, b, n, $), c) {
          this.debug("  in class"), $ === "!" && b === p + 1 && ($ = "^"), n += $;
          continue;
        }
        g.debug("call clearStateChar %j", u), m(), u = $, r.noext && m();
        continue;
      case "(":
        if (c) {
          n += "(";
          continue;
        }
        if (!u) {
          n += "\\(";
          continue;
        }
        s.push({
          type: u,
          start: b - 1,
          reStart: n.length,
          open: ms[u].open,
          close: ms[u].close
        }), n += u === "!" ? "(?:(?!(?:" : "(?:", this.debug("plType %j %j", u, n), u = !1;
        continue;
      case ")":
        if (c || !s.length) {
          n += "\\)";
          continue;
        }
        m(), i = !0;
        var v = s.pop();
        n += v.close, v.type === "!" && l.push(v), v.reEnd = n.length;
        continue;
      case "|":
        if (c || !s.length || o) {
          n += "\\|", o = !1;
          continue;
        }
        m(), n += "|";
        continue;
      case "[":
        if (m(), c) {
          n += "\\" + $;
          continue;
        }
        c = !0, p = b, f = n.length, n += $;
        continue;
      case "]":
        if (b === p + 1 || !c) {
          n += "\\" + $, o = !1;
          continue;
        }
        var O = t.substring(p + 1, b);
        try {
          RegExp("[" + O + "]");
        } catch {
          var S = this.parse(O, ir);
          n = n.substr(0, f) + "\\[" + S[0] + "\\]", i = i || S[1], c = !1;
          continue;
        }
        i = !0, c = !1, n += $;
        continue;
      default:
        m(), o ? o = !1 : vs[$] && !($ === "^" && c) && (n += "\\"), n += $;
    }
  }
  for (c && (O = t.substr(p + 1), S = this.parse(O, ir), n = n.substr(0, f) + "\\[" + S[0], i = i || S[1]), v = s.pop(); v; v = s.pop()) {
    var x = n.slice(v.reStart + v.open.length);
    this.debug("setting tail", n, v), x = x.replace(/((?:\\{2}){0,64})(\\?)\|/g, function(k, T, E) {
      return E || (E = "\\"), T + T + E + "|";
    }), this.debug(`tail=%j
   %s`, x, x, v, n);
    var C = v.type === "*" ? lo : v.type === "?" ? uo : "\\" + v.type;
    i = !0, n = n.slice(0, v.reStart) + C + "\\(" + x;
  }
  m(), o && (n += "\\\\");
  var R = !1;
  switch (n.charAt(0)) {
    case "[":
    case ".":
    case "(":
      R = !0;
  }
  for (var L = l.length - 1; L > -1; L--) {
    var H = l[L], K = n.slice(0, H.reStart), X = n.slice(H.reStart, H.reEnd - 8), J = n.slice(H.reEnd - 8, H.reEnd), te = n.slice(H.reEnd);
    J += te;
    var le = K.split("(").length - 1, oe = te;
    for (b = 0; b < le; b++)
      oe = oe.replace(/\)[+*?]?/, "");
    te = oe;
    var be = "";
    te === "" && e !== ir && (be = "$");
    var Oe = K + X + te + be + J;
    n = Oe;
  }
  if (n !== "" && i && (n = "(?=.)" + n), R && (n = y + n), e === ir)
    return [n, i];
  if (!i)
    return ad(t);
  var Ee = r.nocase ? "i" : "";
  try {
    var fe = new RegExp("^" + n + "$", Ee);
  } catch {
    return new RegExp("$.");
  }
  return fe._glob = t, fe._src = n, fe;
}
he.makeRe = function(t, e) {
  return new ee(t, e || {}).makeRe();
};
ee.prototype.makeRe = sd;
function sd() {
  if (this.regexp || this.regexp === !1)
    return this.regexp;
  var t = this.set;
  if (!t.length)
    return this.regexp = !1, this.regexp;
  var e = this.options, r = e.noglobstar ? lo : e.dot ? Zp : Qp, n = e.nocase ? "i" : "", i = t.map(function(o) {
    return o.map(function(s) {
      return s === Bo ? r : typeof s == "string" ? cd(s) : s._src;
    }).join("\\/");
  }).join("|");
  i = "^(?:" + i + ")$", this.negate && (i = "^(?!" + i + ").*$");
  try {
    this.regexp = new RegExp(i, n);
  } catch {
    this.regexp = !1;
  }
  return this.regexp;
}
he.match = function(t, e, r) {
  r = r || {};
  var n = new ee(e, r);
  return t = t.filter(function(i) {
    return n.match(i);
  }), n.options.nonull && !t.length && t.push(e), t;
};
ee.prototype.match = function(e, r) {
  if (typeof r > "u" && (r = this.partial), this.debug("match", e, this.pattern), this.comment)
    return !1;
  if (this.empty)
    return e === "";
  if (e === "/" && r)
    return !0;
  var n = this.options;
  zt.sep !== "/" && (e = e.split(zt.sep).join("/")), e = e.split(Ja), this.debug(this.pattern, "split", e);
  var i = this.set;
  this.debug(this.pattern, "set", i);
  var o, s;
  for (s = e.length - 1; s >= 0 && (o = e[s], !o); s--)
    ;
  for (s = 0; s < i.length; s++) {
    var l = i[s], u = e;
    n.matchBase && l.length === 1 && (u = [o]);
    var c = this.matchOne(u, l, r);
    if (c)
      return n.flipNegate ? !0 : !this.negate;
  }
  return n.flipNegate ? !1 : this.negate;
};
ee.prototype.matchOne = function(t, e, r) {
  var n = this.options;
  this.debug(
    "matchOne",
    { this: this, file: t, pattern: e }
  ), this.debug("matchOne", t.length, e.length);
  for (var i = 0, o = 0, s = t.length, l = e.length; i < s && o < l; i++, o++) {
    this.debug("matchOne loop");
    var u = e[o], c = t[i];
    if (this.debug(e, u, c), u === !1)
      return !1;
    if (u === Bo) {
      this.debug("GLOBSTAR", [e, u, c]);
      var f = i, p = o + 1;
      if (p === l) {
        for (this.debug("** at the end"); i < s; i++)
          if (t[i] === "." || t[i] === ".." || !n.dot && t[i].charAt(0) === ".")
            return !1;
        return !0;
      }
      for (; f < s; ) {
        var y = t[f];
        if (this.debug(`
globstar while`, t, f, e, p, y), this.matchOne(t.slice(f), e.slice(p), r))
          return this.debug("globstar found match!", f, s, y), !0;
        if (y === "." || y === ".." || !n.dot && y.charAt(0) === ".") {
          this.debug("dot detected!", t, f, e, p);
          break;
        }
        this.debug("globstar swallow a segment, and continue"), f++;
      }
      return !!(r && (this.debug(`
>>> no match, partial?`, t, f, e, p), f === s));
    }
    var g;
    if (typeof u == "string" ? (g = c === u, this.debug("string match", u, c, g)) : (g = c.match(u), this.debug("pattern match", u, c, g)), !g)
      return !1;
  }
  if (i === s && o === l)
    return !0;
  if (i === s)
    return r;
  if (o === l)
    return i === s - 1 && t[i] === "";
  throw new Error("wtf?");
};
function ad(t) {
  return t.replace(/\\(.)/g, "$1");
}
function cd(t) {
  return t.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}
class I {
  static filter(e) {
    typeof e == "function" ? this._filterFunctions = [...this._filterFunctions, e] : this._filteredTypes = e;
  }
  /**
   * @name            clearFilters
   * @type            Function
   * @static
   *
   * This static method allows you to reset all the filters applied
   *
   * @since           2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  static clearFilters() {
    this._filteredTypes = [], this._filterFunctions = [], M;
  }
  static setDefaultLogObj(e) {
    this._defaultLogObj = e;
  }
  /**
   * @name            isTypeEnabled
   * @type            Function
   * @static
   *
   * This static method allows you Check if a particular log type is enabled or not.
   * You can pass as well multiple log types as an array.
   *
   * @param       {ISLogType|ISLogType[]}             types      The log type(s) you want to check
   * @return      {Boolean}                              True if the log type is enabled, false otherwise
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  static isTypeEnabled(e) {
    if (!this._filteredTypes.length)
      return !0;
    Array.isArray(e) || (e = [e]);
    for (const r of e)
      if (!this._filteredTypes.includes(r))
        return !1;
    return !0;
  }
  /**
   * @name        constructor
   * @type        Function
   * @constructor
   *
   * Constructor
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  constructor(e) {
    var r;
    !(e != null && e.value) && e._logObj, this._logObj = W(
      {
        type: I.TYPE_LOG,
        timestamp: Date.now(),
        decorators: !0,
        time: !1,
        verbose: !1,
        notify: !1,
        metas: {}
      },
      // @ts-ignore
      this.constructor._defaultLogObj,
      // @ts-ignore
      (r = e._logObj) !== null && r !== void 0 ? r : e
    );
  }
  /**
   * @name        value
   * @type        Any
   * @get
   * @set
   *
   * Access the "value" property of the SLog object
   *
   * @since           2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  get value() {
    return this._logObj.value;
  }
  set value(e) {
    this._logObj.value = e;
  }
  /**
   * @name        metas
   * @type        Any
   * @get
   * @set
   *
   * Access the "metas" property of the SLog object
   *
   * @since           2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  get metas() {
    var e;
    return (e = this._logObj.metas) !== null && e !== void 0 ? e : {};
  }
  set metas(e) {
    this._logObj.metas = e;
  }
  /**
   * @name        type
   * @type        String
   * @get
   *
   * Access the "type" property of the SLog object
   * This specify which type if the log. LOG, INFO, WARN, ERROR or VERBODE
   *
   * @since           2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  get type() {
    return this._logObj.type;
  }
  /**
   * @name        group
   * @type        String
   * @get
   *
   * Access the "group" property of the SLog object
   * The group can be used to display logs in a stack or whatever...
   *
   * @since           2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  get group() {
    return this._logObj.group;
  }
  set group(e) {
    if (typeof e != "string")
      throw new Error(`<red>[SLog]</red> The "<cyan>group</cyan>" property MUST be a string. You've passed a "${typeof e}"...`);
    this._logObj.group = e;
  }
  /**
   * @name        active
   * @type        Boolean
   * @get
   *
   * Access the "active" property of the SLog object
   * This specify if the log is active depending on parameters like `SLog.filter`.
   * Check the documentation of this static method for more info.
   *
   * @since           2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  get active() {
    for (let [e, r] of this.constructor._filterFunctions.entries())
      if (!r(this))
        return !1;
    return !this._logObj.type || !this.constructor._filteredTypes.length || !this.constructor.TYPES.includes(this._logObj.type) ? !0 : !!this.constructor._filteredTypes.includes(this._logObj.type);
  }
  /**
   * @name        decorators
   * @type        Boolean
   * @get
   * @set
   *
   * Access the "decorators" property of the SLog object.
   * This specify if the log has to be printed with decorators or not
   *
   * @since           2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  get decorators() {
    return this._logObj.decorators;
  }
  set decorators(e) {
    this._logObj.decorators = e;
  }
  /**
   * @name        time
   * @type        Boolean
   * @get
   *
   * Access the "time" property of the SLog object.
   * This specify if the log has to be printed with his time or not
   *
   * @since           2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  get time() {
    return this._logObj.time;
  }
  /**
   * @name        timestamp
   * @type        String
   * @get
   *
   * Access the "timestamp" property of the SLog object
   *
   * @since           2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  get timestamp() {
    return this._logObj.timestamp;
  }
  /**
   * @name        clear
   * @type        Boolean
   * @get
   *
   * Access the "clear" property of the SLog object.
   * This specify if the previous logs have to be cleared before printing this one
   *
   * @since           2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  get clear() {
    return this._logObj.clear;
  }
  /**
   * @name        margin
   * @type        ISLogMargin
   * @get
   *
   * Access the "margin" property of the SLog object.
   *
   * @since           2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  get margin() {
    var e;
    return (e = this._logObj.margin) !== null && e !== void 0 ? e : {
      top: 0,
      bottom: 0
    };
  }
  /**
   * @name        temp
   * @type        Boolean
   * @get
   *
   * Access the "temp" property of the SLog object.
   * This specify if this log is a temporary one and if it has to be deleted
   * when the next log appear.
   *
   * @since           2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  get temp() {
    return this._logObj.temp;
  }
  /**
   * @name        as
   * @type        String
   * @get
   *
   * Access the "as" property of the SLog object.
   * This specify the optimal way the log has to be displayed.
   * This depends on the logger you use and how it can display logs.
   *
   * @since           2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  get as() {
    return this._logObj.as;
  }
  /**
   * @name        verbose
   * @type        Boolean
   * @get
   *
   * Access the "verbose" property of the SLog object
   *
   * @since           2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  get verbose() {
    return this._logObj.verbose;
  }
  set verbose(e) {
    this._logObj.verbose = e;
  }
  /**
   * @name        notify
   * @type        Boolean
   * @get
   *
   * Access the "notify" property of the SLog object
   *
   * @since           2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  get notify() {
    return this._logObj.notify;
  }
  set notify(e) {
    this._logObj.notify = e;
  }
  /**
   * @name        logger
   * @type        Function
   * @get
   *
   * Access the "logger" property of the SLog object.
   * This represent a function that will be used to actually log the message.
   *
   * @since           2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  get logger() {
    return this._logObj.logger;
  }
}
I.TYPE_LOG = "log";
I.TYPE_INFO = "info";
I.TYPE_WARN = "warn";
I.TYPE_ERROR = "error";
I.TYPE_SUCCESS = "success";
I.TYPES = [
  I.TYPE_LOG,
  I.TYPE_INFO,
  I.TYPE_WARN,
  I.TYPE_ERROR,
  I.TYPE_SUCCESS
];
I.PRESET_SILENT = [];
I.PRESET_DEFAULT = [
  I.TYPE_LOG,
  I.TYPE_INFO,
  I.TYPE_WARN,
  I.TYPE_ERROR,
  I.TYPE_SUCCESS
];
I.PRESET_WARN = [I.TYPE_WARN, I.TYPE_ERROR];
I.PRESET_ERROR = [I.TYPE_ERROR];
I.PRESET_VERBOSE = [
  I.TYPE_LOG,
  I.TYPE_INFO,
  I.TYPE_WARN,
  I.TYPE_ERROR,
  I.TYPE_SUCCESS
];
I.PRESETS = ["silent", "default", "warn", "error"];
I._filteredTypes = [];
I._filterFunctions = [];
I._filteredTypes = [];
I._defaultLogObj = {};
function ud(t) {
  t = Object.assign({ excludeBasics: !1 }, t ?? {});
  const e = [
    "yellow",
    "cyan",
    "green",
    "magenta",
    "blue",
    "red",
    "grey",
    "gray"
  ];
  let r = e;
  return t.excludeBasics && (r = e.filter((n) => n !== "white" && n !== "black" && n !== "grey" && n !== "gray")), r;
}
class He {
  static get finalConfig() {
    var e, r, n, i, o, s, l, u;
    return He._finalConfig || (He._finalConfig = W(
      // @ts-ignore
      (u = (n = (r = (e = document.env) === null || e === void 0 ? void 0 : e.SUGAR) === null || r === void 0 ? void 0 : r.config) !== null && n !== void 0 ? n : (l = (s = (o = (i = window.top) === null || i === void 0 ? void 0 : i.document) === null || o === void 0 ? void 0 : o.env) === null || s === void 0 ? void 0 : s.SUGAR) === null || l === void 0 ? void 0 : l.config) !== null && u !== void 0 ? u : {}
    )), He._finalConfig;
  }
  /**
   * @name        config
   * @type        ISSugarConfig
   * @get
   *
   * Simple config accessor to access directly the config object
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  static get config() {
    return this.get(".");
  }
  /**
   * @name            get
   * @type            Function
   * @static
   *
   * This static method allows you to access your configurations
   *
   * @param       {String}            [dotpath='.']             The dotpath representing the configuration you want to access
   * @return      {any}                                   The getted configuration
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  static get(e = ".") {
    return To(He.finalConfig, e);
  }
  /**
   * @name            set
   * @type            Function
   * @static
   *
   * This static method allows you to set a configuration value
   *
   * @param       {String}            dotpath             The dotpath representing the configuration you want to access
   * @param       {any}               value               The value you want to set
   * @return      {any}                                   The getted configuration
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  static set(e, r) {
    return Qs(He.finalConfig, e, r);
  }
}
function fo(t, e = 1) {
  t = Zs(t);
  const r = [];
  if (e > 1) {
    if (e >= t.length)
      return t;
    for (let n = 0; n < e; n++) {
      let i = fo(t, 1);
      for (; r.includes(i); )
        i = fo(t, 1);
      r.push(i);
    }
    return r;
  } else if (e === 1)
    return t[Math.round(Math.random() * (t.length - 1))];
  return t;
}
var Qa = { exports: {} };
function ld(t) {
  throw new Error('Could not dynamically require "' + t + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var $i = { exports: {} }, ws;
function fd() {
  return ws || (ws = 1, function(t, e) {
    (function(r, n) {
      t.exports = n();
    })(Y, function() {
      var r = r || function(n, i) {
        var o;
        if (typeof window < "u" && window.crypto && (o = window.crypto), typeof self < "u" && self.crypto && (o = self.crypto), typeof globalThis < "u" && globalThis.crypto && (o = globalThis.crypto), !o && typeof window < "u" && window.msCrypto && (o = window.msCrypto), !o && typeof Y < "u" && Y.crypto && (o = Y.crypto), !o && typeof ld == "function")
          try {
            o = fa;
          } catch {
          }
        var s = function() {
          if (o) {
            if (typeof o.getRandomValues == "function")
              try {
                return o.getRandomValues(new Uint32Array(1))[0];
              } catch {
              }
            if (typeof o.randomBytes == "function")
              try {
                return o.randomBytes(4).readInt32LE();
              } catch {
              }
          }
          throw new Error("Native crypto module could not be used to get secure random number.");
        }, l = Object.create || function() {
          function v() {
          }
          return function(O) {
            var S;
            return v.prototype = O, S = new v(), v.prototype = null, S;
          };
        }(), u = {}, c = u.lib = {}, f = c.Base = function() {
          return {
            /**
             * Creates a new object that inherits from this object.
             *
             * @param {Object} overrides Properties to copy into the new object.
             *
             * @return {Object} The new object.
             *
             * @static
             *
             * @example
             *
             *     var MyType = CryptoJS.lib.Base.extend({
             *         field: 'value',
             *
             *         method: function () {
             *         }
             *     });
             */
            extend: function(v) {
              var O = l(this);
              return v && O.mixIn(v), (!O.hasOwnProperty("init") || this.init === O.init) && (O.init = function() {
                O.$super.init.apply(this, arguments);
              }), O.init.prototype = O, O.$super = this, O;
            },
            /**
             * Extends this object and runs the init method.
             * Arguments to create() will be passed to init().
             *
             * @return {Object} The new object.
             *
             * @static
             *
             * @example
             *
             *     var instance = MyType.create();
             */
            create: function() {
              var v = this.extend();
              return v.init.apply(v, arguments), v;
            },
            /**
             * Initializes a newly created object.
             * Override this method to add some logic when your objects are created.
             *
             * @example
             *
             *     var MyType = CryptoJS.lib.Base.extend({
             *         init: function () {
             *             // ...
             *         }
             *     });
             */
            init: function() {
            },
            /**
             * Copies properties into this object.
             *
             * @param {Object} properties The properties to mix in.
             *
             * @example
             *
             *     MyType.mixIn({
             *         field: 'value'
             *     });
             */
            mixIn: function(v) {
              for (var O in v)
                v.hasOwnProperty(O) && (this[O] = v[O]);
              v.hasOwnProperty("toString") && (this.toString = v.toString);
            },
            /**
             * Creates a copy of this object.
             *
             * @return {Object} The clone.
             *
             * @example
             *
             *     var clone = instance.clone();
             */
            clone: function() {
              return this.init.prototype.extend(this);
            }
          };
        }(), p = c.WordArray = f.extend({
          /**
           * Initializes a newly created word array.
           *
           * @param {Array} words (Optional) An array of 32-bit words.
           * @param {number} sigBytes (Optional) The number of significant bytes in the words.
           *
           * @example
           *
           *     var wordArray = CryptoJS.lib.WordArray.create();
           *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607]);
           *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607], 6);
           */
          init: function(v, O) {
            v = this.words = v || [], O != i ? this.sigBytes = O : this.sigBytes = v.length * 4;
          },
          /**
           * Converts this word array to a string.
           *
           * @param {Encoder} encoder (Optional) The encoding strategy to use. Default: CryptoJS.enc.Hex
           *
           * @return {string} The stringified word array.
           *
           * @example
           *
           *     var string = wordArray + '';
           *     var string = wordArray.toString();
           *     var string = wordArray.toString(CryptoJS.enc.Utf8);
           */
          toString: function(v) {
            return (v || g).stringify(this);
          },
          /**
           * Concatenates a word array to this word array.
           *
           * @param {WordArray} wordArray The word array to append.
           *
           * @return {WordArray} This word array.
           *
           * @example
           *
           *     wordArray1.concat(wordArray2);
           */
          concat: function(v) {
            var O = this.words, S = v.words, x = this.sigBytes, C = v.sigBytes;
            if (this.clamp(), x % 4)
              for (var R = 0; R < C; R++) {
                var L = S[R >>> 2] >>> 24 - R % 4 * 8 & 255;
                O[x + R >>> 2] |= L << 24 - (x + R) % 4 * 8;
              }
            else
              for (var H = 0; H < C; H += 4)
                O[x + H >>> 2] = S[H >>> 2];
            return this.sigBytes += C, this;
          },
          /**
           * Removes insignificant bits.
           *
           * @example
           *
           *     wordArray.clamp();
           */
          clamp: function() {
            var v = this.words, O = this.sigBytes;
            v[O >>> 2] &= 4294967295 << 32 - O % 4 * 8, v.length = n.ceil(O / 4);
          },
          /**
           * Creates a copy of this word array.
           *
           * @return {WordArray} The clone.
           *
           * @example
           *
           *     var clone = wordArray.clone();
           */
          clone: function() {
            var v = f.clone.call(this);
            return v.words = this.words.slice(0), v;
          },
          /**
           * Creates a word array filled with random bytes.
           *
           * @param {number} nBytes The number of random bytes to generate.
           *
           * @return {WordArray} The random word array.
           *
           * @static
           *
           * @example
           *
           *     var wordArray = CryptoJS.lib.WordArray.random(16);
           */
          random: function(v) {
            for (var O = [], S = 0; S < v; S += 4)
              O.push(s());
            return new p.init(O, v);
          }
        }), y = u.enc = {}, g = y.Hex = {
          /**
           * Converts a word array to a hex string.
           *
           * @param {WordArray} wordArray The word array.
           *
           * @return {string} The hex string.
           *
           * @static
           *
           * @example
           *
           *     var hexString = CryptoJS.enc.Hex.stringify(wordArray);
           */
          stringify: function(v) {
            for (var O = v.words, S = v.sigBytes, x = [], C = 0; C < S; C++) {
              var R = O[C >>> 2] >>> 24 - C % 4 * 8 & 255;
              x.push((R >>> 4).toString(16)), x.push((R & 15).toString(16));
            }
            return x.join("");
          },
          /**
           * Converts a hex string to a word array.
           *
           * @param {string} hexStr The hex string.
           *
           * @return {WordArray} The word array.
           *
           * @static
           *
           * @example
           *
           *     var wordArray = CryptoJS.enc.Hex.parse(hexString);
           */
          parse: function(v) {
            for (var O = v.length, S = [], x = 0; x < O; x += 2)
              S[x >>> 3] |= parseInt(v.substr(x, 2), 16) << 24 - x % 8 * 4;
            return new p.init(S, O / 2);
          }
        }, m = y.Latin1 = {
          /**
           * Converts a word array to a Latin1 string.
           *
           * @param {WordArray} wordArray The word array.
           *
           * @return {string} The Latin1 string.
           *
           * @static
           *
           * @example
           *
           *     var latin1String = CryptoJS.enc.Latin1.stringify(wordArray);
           */
          stringify: function(v) {
            for (var O = v.words, S = v.sigBytes, x = [], C = 0; C < S; C++) {
              var R = O[C >>> 2] >>> 24 - C % 4 * 8 & 255;
              x.push(String.fromCharCode(R));
            }
            return x.join("");
          },
          /**
           * Converts a Latin1 string to a word array.
           *
           * @param {string} latin1Str The Latin1 string.
           *
           * @return {WordArray} The word array.
           *
           * @static
           *
           * @example
           *
           *     var wordArray = CryptoJS.enc.Latin1.parse(latin1String);
           */
          parse: function(v) {
            for (var O = v.length, S = [], x = 0; x < O; x++)
              S[x >>> 2] |= (v.charCodeAt(x) & 255) << 24 - x % 4 * 8;
            return new p.init(S, O);
          }
        }, b = y.Utf8 = {
          /**
           * Converts a word array to a UTF-8 string.
           *
           * @param {WordArray} wordArray The word array.
           *
           * @return {string} The UTF-8 string.
           *
           * @static
           *
           * @example
           *
           *     var utf8String = CryptoJS.enc.Utf8.stringify(wordArray);
           */
          stringify: function(v) {
            try {
              return decodeURIComponent(escape(m.stringify(v)));
            } catch {
              throw new Error("Malformed UTF-8 data");
            }
          },
          /**
           * Converts a UTF-8 string to a word array.
           *
           * @param {string} utf8Str The UTF-8 string.
           *
           * @return {WordArray} The word array.
           *
           * @static
           *
           * @example
           *
           *     var wordArray = CryptoJS.enc.Utf8.parse(utf8String);
           */
          parse: function(v) {
            return m.parse(unescape(encodeURIComponent(v)));
          }
        }, j = c.BufferedBlockAlgorithm = f.extend({
          /**
           * Resets this block algorithm's data buffer to its initial state.
           *
           * @example
           *
           *     bufferedBlockAlgorithm.reset();
           */
          reset: function() {
            this._data = new p.init(), this._nDataBytes = 0;
          },
          /**
           * Adds new data to this block algorithm's buffer.
           *
           * @param {WordArray|string} data The data to append. Strings are converted to a WordArray using UTF-8.
           *
           * @example
           *
           *     bufferedBlockAlgorithm._append('data');
           *     bufferedBlockAlgorithm._append(wordArray);
           */
          _append: function(v) {
            typeof v == "string" && (v = b.parse(v)), this._data.concat(v), this._nDataBytes += v.sigBytes;
          },
          /**
           * Processes available data blocks.
           *
           * This method invokes _doProcessBlock(offset), which must be implemented by a concrete subtype.
           *
           * @param {boolean} doFlush Whether all blocks and partial blocks should be processed.
           *
           * @return {WordArray} The processed data.
           *
           * @example
           *
           *     var processedData = bufferedBlockAlgorithm._process();
           *     var processedData = bufferedBlockAlgorithm._process(!!'flush');
           */
          _process: function(v) {
            var O, S = this._data, x = S.words, C = S.sigBytes, R = this.blockSize, L = R * 4, H = C / L;
            v ? H = n.ceil(H) : H = n.max((H | 0) - this._minBufferSize, 0);
            var K = H * R, X = n.min(K * 4, C);
            if (K) {
              for (var J = 0; J < K; J += R)
                this._doProcessBlock(x, J);
              O = x.splice(0, K), S.sigBytes -= X;
            }
            return new p.init(O, X);
          },
          /**
           * Creates a copy of this object.
           *
           * @return {Object} The clone.
           *
           * @example
           *
           *     var clone = bufferedBlockAlgorithm.clone();
           */
          clone: function() {
            var v = f.clone.call(this);
            return v._data = this._data.clone(), v;
          },
          _minBufferSize: 0
        });
        c.Hasher = j.extend({
          /**
           * Configuration options.
           */
          cfg: f.extend(),
          /**
           * Initializes a newly created hasher.
           *
           * @param {Object} cfg (Optional) The configuration options to use for this hash computation.
           *
           * @example
           *
           *     var hasher = CryptoJS.algo.SHA256.create();
           */
          init: function(v) {
            this.cfg = this.cfg.extend(v), this.reset();
          },
          /**
           * Resets this hasher to its initial state.
           *
           * @example
           *
           *     hasher.reset();
           */
          reset: function() {
            j.reset.call(this), this._doReset();
          },
          /**
           * Updates this hasher with a message.
           *
           * @param {WordArray|string} messageUpdate The message to append.
           *
           * @return {Hasher} This hasher.
           *
           * @example
           *
           *     hasher.update('message');
           *     hasher.update(wordArray);
           */
          update: function(v) {
            return this._append(v), this._process(), this;
          },
          /**
           * Finalizes the hash computation.
           * Note that the finalize operation is effectively a destructive, read-once operation.
           *
           * @param {WordArray|string} messageUpdate (Optional) A final message update.
           *
           * @return {WordArray} The hash.
           *
           * @example
           *
           *     var hash = hasher.finalize();
           *     var hash = hasher.finalize('message');
           *     var hash = hasher.finalize(wordArray);
           */
          finalize: function(v) {
            v && this._append(v);
            var O = this._doFinalize();
            return O;
          },
          blockSize: 16,
          /**
           * Creates a shortcut function to a hasher's object interface.
           *
           * @param {Hasher} hasher The hasher to create a helper for.
           *
           * @return {Function} The shortcut function.
           *
           * @static
           *
           * @example
           *
           *     var SHA256 = CryptoJS.lib.Hasher._createHelper(CryptoJS.algo.SHA256);
           */
          _createHelper: function(v) {
            return function(O, S) {
              return new v.init(S).finalize(O);
            };
          },
          /**
           * Creates a shortcut function to the HMAC's object interface.
           *
           * @param {Hasher} hasher The hasher to use in this HMAC helper.
           *
           * @return {Function} The shortcut function.
           *
           * @static
           *
           * @example
           *
           *     var HmacSHA256 = CryptoJS.lib.Hasher._createHmacHelper(CryptoJS.algo.SHA256);
           */
          _createHmacHelper: function(v) {
            return function(O, S) {
              return new $.HMAC.init(v, S).finalize(O);
            };
          }
        });
        var $ = u.algo = {};
        return u;
      }(Math);
      return r;
    });
  }($i)), $i.exports;
}
(function(t, e) {
  (function(r, n) {
    t.exports = n(fd());
  })(Y, function(r) {
    return function(n) {
      var i = r, o = i.lib, s = o.WordArray, l = o.Hasher, u = i.algo, c = [];
      (function() {
        for (var b = 0; b < 64; b++)
          c[b] = n.abs(n.sin(b + 1)) * 4294967296 | 0;
      })();
      var f = u.MD5 = l.extend({
        _doReset: function() {
          this._hash = new s.init([
            1732584193,
            4023233417,
            2562383102,
            271733878
          ]);
        },
        _doProcessBlock: function(b, j) {
          for (var $ = 0; $ < 16; $++) {
            var v = j + $, O = b[v];
            b[v] = (O << 8 | O >>> 24) & 16711935 | (O << 24 | O >>> 8) & 4278255360;
          }
          var S = this._hash.words, x = b[j + 0], C = b[j + 1], R = b[j + 2], L = b[j + 3], H = b[j + 4], K = b[j + 5], X = b[j + 6], J = b[j + 7], te = b[j + 8], le = b[j + 9], oe = b[j + 10], be = b[j + 11], Oe = b[j + 12], Ee = b[j + 13], fe = b[j + 14], k = b[j + 15], T = S[0], E = S[1], _ = S[2], A = S[3];
          T = p(T, E, _, A, x, 7, c[0]), A = p(A, T, E, _, C, 12, c[1]), _ = p(_, A, T, E, R, 17, c[2]), E = p(E, _, A, T, L, 22, c[3]), T = p(T, E, _, A, H, 7, c[4]), A = p(A, T, E, _, K, 12, c[5]), _ = p(_, A, T, E, X, 17, c[6]), E = p(E, _, A, T, J, 22, c[7]), T = p(T, E, _, A, te, 7, c[8]), A = p(A, T, E, _, le, 12, c[9]), _ = p(_, A, T, E, oe, 17, c[10]), E = p(E, _, A, T, be, 22, c[11]), T = p(T, E, _, A, Oe, 7, c[12]), A = p(A, T, E, _, Ee, 12, c[13]), _ = p(_, A, T, E, fe, 17, c[14]), E = p(E, _, A, T, k, 22, c[15]), T = y(T, E, _, A, C, 5, c[16]), A = y(A, T, E, _, X, 9, c[17]), _ = y(_, A, T, E, be, 14, c[18]), E = y(E, _, A, T, x, 20, c[19]), T = y(T, E, _, A, K, 5, c[20]), A = y(A, T, E, _, oe, 9, c[21]), _ = y(_, A, T, E, k, 14, c[22]), E = y(E, _, A, T, H, 20, c[23]), T = y(T, E, _, A, le, 5, c[24]), A = y(A, T, E, _, fe, 9, c[25]), _ = y(_, A, T, E, L, 14, c[26]), E = y(E, _, A, T, te, 20, c[27]), T = y(T, E, _, A, Ee, 5, c[28]), A = y(A, T, E, _, R, 9, c[29]), _ = y(_, A, T, E, J, 14, c[30]), E = y(E, _, A, T, Oe, 20, c[31]), T = g(T, E, _, A, K, 4, c[32]), A = g(A, T, E, _, te, 11, c[33]), _ = g(_, A, T, E, be, 16, c[34]), E = g(E, _, A, T, fe, 23, c[35]), T = g(T, E, _, A, C, 4, c[36]), A = g(A, T, E, _, H, 11, c[37]), _ = g(_, A, T, E, J, 16, c[38]), E = g(E, _, A, T, oe, 23, c[39]), T = g(T, E, _, A, Ee, 4, c[40]), A = g(A, T, E, _, x, 11, c[41]), _ = g(_, A, T, E, L, 16, c[42]), E = g(E, _, A, T, X, 23, c[43]), T = g(T, E, _, A, le, 4, c[44]), A = g(A, T, E, _, Oe, 11, c[45]), _ = g(_, A, T, E, k, 16, c[46]), E = g(E, _, A, T, R, 23, c[47]), T = m(T, E, _, A, x, 6, c[48]), A = m(A, T, E, _, J, 10, c[49]), _ = m(_, A, T, E, fe, 15, c[50]), E = m(E, _, A, T, K, 21, c[51]), T = m(T, E, _, A, Oe, 6, c[52]), A = m(A, T, E, _, L, 10, c[53]), _ = m(_, A, T, E, oe, 15, c[54]), E = m(E, _, A, T, C, 21, c[55]), T = m(T, E, _, A, te, 6, c[56]), A = m(A, T, E, _, k, 10, c[57]), _ = m(_, A, T, E, X, 15, c[58]), E = m(E, _, A, T, Ee, 21, c[59]), T = m(T, E, _, A, H, 6, c[60]), A = m(A, T, E, _, be, 10, c[61]), _ = m(_, A, T, E, R, 15, c[62]), E = m(E, _, A, T, le, 21, c[63]), S[0] = S[0] + T | 0, S[1] = S[1] + E | 0, S[2] = S[2] + _ | 0, S[3] = S[3] + A | 0;
        },
        _doFinalize: function() {
          var b = this._data, j = b.words, $ = this._nDataBytes * 8, v = b.sigBytes * 8;
          j[v >>> 5] |= 128 << 24 - v % 32;
          var O = n.floor($ / 4294967296), S = $;
          j[(v + 64 >>> 9 << 4) + 15] = (O << 8 | O >>> 24) & 16711935 | (O << 24 | O >>> 8) & 4278255360, j[(v + 64 >>> 9 << 4) + 14] = (S << 8 | S >>> 24) & 16711935 | (S << 24 | S >>> 8) & 4278255360, b.sigBytes = (j.length + 1) * 4, this._process();
          for (var x = this._hash, C = x.words, R = 0; R < 4; R++) {
            var L = C[R];
            C[R] = (L << 8 | L >>> 24) & 16711935 | (L << 24 | L >>> 8) & 4278255360;
          }
          return x;
        },
        clone: function() {
          var b = l.clone.call(this);
          return b._hash = this._hash.clone(), b;
        }
      });
      function p(b, j, $, v, O, S, x) {
        var C = b + (j & $ | ~j & v) + O + x;
        return (C << S | C >>> 32 - S) + j;
      }
      function y(b, j, $, v, O, S, x) {
        var C = b + (j & v | $ & ~v) + O + x;
        return (C << S | C >>> 32 - S) + j;
      }
      function g(b, j, $, v, O, S, x) {
        var C = b + (j ^ $ ^ v) + O + x;
        return (C << S | C >>> 32 - S) + j;
      }
      function m(b, j, $, v, O, S, x) {
        var C = b + ($ ^ (j | ~v)) + O + x;
        return (C << S | C >>> 32 - S) + j;
      }
      i.MD5 = l._createHelper(f), i.HmacMD5 = l._createHmacHelper(f);
    }(Math), r.MD5;
  });
})(Qa);
var pd = Qa.exports;
const dd = /* @__PURE__ */ We(pd);
function Fo(t) {
  if (typeof t != "string")
    return t;
  t = t.split("⠀").join("").trim();
  try {
    return Function(`
            "use strict";
            return (${t});
        `)();
  } catch {
    return t;
  }
}
var Lo = { exports: {} }, xi, _s;
function yd() {
  return _s || (_s = 1, xi = {
    aliceblue: [240, 248, 255],
    antiquewhite: [250, 235, 215],
    aqua: [0, 255, 255],
    aquamarine: [127, 255, 212],
    azure: [240, 255, 255],
    beige: [245, 245, 220],
    bisque: [255, 228, 196],
    black: [0, 0, 0],
    blanchedalmond: [255, 235, 205],
    blue: [0, 0, 255],
    blueviolet: [138, 43, 226],
    brown: [165, 42, 42],
    burlywood: [222, 184, 135],
    cadetblue: [95, 158, 160],
    chartreuse: [127, 255, 0],
    chocolate: [210, 105, 30],
    coral: [255, 127, 80],
    cornflowerblue: [100, 149, 237],
    cornsilk: [255, 248, 220],
    crimson: [220, 20, 60],
    cyan: [0, 255, 255],
    darkblue: [0, 0, 139],
    darkcyan: [0, 139, 139],
    darkgoldenrod: [184, 134, 11],
    darkgray: [169, 169, 169],
    darkgreen: [0, 100, 0],
    darkgrey: [169, 169, 169],
    darkkhaki: [189, 183, 107],
    darkmagenta: [139, 0, 139],
    darkolivegreen: [85, 107, 47],
    darkorange: [255, 140, 0],
    darkorchid: [153, 50, 204],
    darkred: [139, 0, 0],
    darksalmon: [233, 150, 122],
    darkseagreen: [143, 188, 143],
    darkslateblue: [72, 61, 139],
    darkslategray: [47, 79, 79],
    darkslategrey: [47, 79, 79],
    darkturquoise: [0, 206, 209],
    darkviolet: [148, 0, 211],
    deeppink: [255, 20, 147],
    deepskyblue: [0, 191, 255],
    dimgray: [105, 105, 105],
    dimgrey: [105, 105, 105],
    dodgerblue: [30, 144, 255],
    firebrick: [178, 34, 34],
    floralwhite: [255, 250, 240],
    forestgreen: [34, 139, 34],
    fuchsia: [255, 0, 255],
    gainsboro: [220, 220, 220],
    ghostwhite: [248, 248, 255],
    gold: [255, 215, 0],
    goldenrod: [218, 165, 32],
    gray: [128, 128, 128],
    green: [0, 128, 0],
    greenyellow: [173, 255, 47],
    grey: [128, 128, 128],
    honeydew: [240, 255, 240],
    hotpink: [255, 105, 180],
    indianred: [205, 92, 92],
    indigo: [75, 0, 130],
    ivory: [255, 255, 240],
    khaki: [240, 230, 140],
    lavender: [230, 230, 250],
    lavenderblush: [255, 240, 245],
    lawngreen: [124, 252, 0],
    lemonchiffon: [255, 250, 205],
    lightblue: [173, 216, 230],
    lightcoral: [240, 128, 128],
    lightcyan: [224, 255, 255],
    lightgoldenrodyellow: [250, 250, 210],
    lightgray: [211, 211, 211],
    lightgreen: [144, 238, 144],
    lightgrey: [211, 211, 211],
    lightpink: [255, 182, 193],
    lightsalmon: [255, 160, 122],
    lightseagreen: [32, 178, 170],
    lightskyblue: [135, 206, 250],
    lightslategray: [119, 136, 153],
    lightslategrey: [119, 136, 153],
    lightsteelblue: [176, 196, 222],
    lightyellow: [255, 255, 224],
    lime: [0, 255, 0],
    limegreen: [50, 205, 50],
    linen: [250, 240, 230],
    magenta: [255, 0, 255],
    maroon: [128, 0, 0],
    mediumaquamarine: [102, 205, 170],
    mediumblue: [0, 0, 205],
    mediumorchid: [186, 85, 211],
    mediumpurple: [147, 112, 219],
    mediumseagreen: [60, 179, 113],
    mediumslateblue: [123, 104, 238],
    mediumspringgreen: [0, 250, 154],
    mediumturquoise: [72, 209, 204],
    mediumvioletred: [199, 21, 133],
    midnightblue: [25, 25, 112],
    mintcream: [245, 255, 250],
    mistyrose: [255, 228, 225],
    moccasin: [255, 228, 181],
    navajowhite: [255, 222, 173],
    navy: [0, 0, 128],
    oldlace: [253, 245, 230],
    olive: [128, 128, 0],
    olivedrab: [107, 142, 35],
    orange: [255, 165, 0],
    orangered: [255, 69, 0],
    orchid: [218, 112, 214],
    palegoldenrod: [238, 232, 170],
    palegreen: [152, 251, 152],
    paleturquoise: [175, 238, 238],
    palevioletred: [219, 112, 147],
    papayawhip: [255, 239, 213],
    peachpuff: [255, 218, 185],
    peru: [205, 133, 63],
    pink: [255, 192, 203],
    plum: [221, 160, 221],
    powderblue: [176, 224, 230],
    purple: [128, 0, 128],
    rebeccapurple: [102, 51, 153],
    red: [255, 0, 0],
    rosybrown: [188, 143, 143],
    royalblue: [65, 105, 225],
    saddlebrown: [139, 69, 19],
    salmon: [250, 128, 114],
    sandybrown: [244, 164, 96],
    seagreen: [46, 139, 87],
    seashell: [255, 245, 238],
    sienna: [160, 82, 45],
    silver: [192, 192, 192],
    skyblue: [135, 206, 235],
    slateblue: [106, 90, 205],
    slategray: [112, 128, 144],
    slategrey: [112, 128, 144],
    snow: [255, 250, 250],
    springgreen: [0, 255, 127],
    steelblue: [70, 130, 180],
    tan: [210, 180, 140],
    teal: [0, 128, 128],
    thistle: [216, 191, 216],
    tomato: [255, 99, 71],
    turquoise: [64, 224, 208],
    violet: [238, 130, 238],
    wheat: [245, 222, 179],
    white: [255, 255, 255],
    whitesmoke: [245, 245, 245],
    yellow: [255, 255, 0],
    yellowgreen: [154, 205, 50]
  }), xi;
}
var ki, Ss;
function ec() {
  if (Ss)
    return ki;
  Ss = 1;
  const t = yd(), e = {};
  for (const i of Object.keys(t))
    e[t[i]] = i;
  const r = {
    rgb: { channels: 3, labels: "rgb" },
    hsl: { channels: 3, labels: "hsl" },
    hsv: { channels: 3, labels: "hsv" },
    hwb: { channels: 3, labels: "hwb" },
    cmyk: { channels: 4, labels: "cmyk" },
    xyz: { channels: 3, labels: "xyz" },
    lab: { channels: 3, labels: "lab" },
    lch: { channels: 3, labels: "lch" },
    hex: { channels: 1, labels: ["hex"] },
    keyword: { channels: 1, labels: ["keyword"] },
    ansi16: { channels: 1, labels: ["ansi16"] },
    ansi256: { channels: 1, labels: ["ansi256"] },
    hcg: { channels: 3, labels: ["h", "c", "g"] },
    apple: { channels: 3, labels: ["r16", "g16", "b16"] },
    gray: { channels: 1, labels: ["gray"] }
  };
  ki = r;
  for (const i of Object.keys(r)) {
    if (!("channels" in r[i]))
      throw new Error("missing channels property: " + i);
    if (!("labels" in r[i]))
      throw new Error("missing channel labels property: " + i);
    if (r[i].labels.length !== r[i].channels)
      throw new Error("channel and label counts mismatch: " + i);
    const { channels: o, labels: s } = r[i];
    delete r[i].channels, delete r[i].labels, Object.defineProperty(r[i], "channels", { value: o }), Object.defineProperty(r[i], "labels", { value: s });
  }
  r.rgb.hsl = function(i) {
    const o = i[0] / 255, s = i[1] / 255, l = i[2] / 255, u = Math.min(o, s, l), c = Math.max(o, s, l), f = c - u;
    let p, y;
    c === u ? p = 0 : o === c ? p = (s - l) / f : s === c ? p = 2 + (l - o) / f : l === c && (p = 4 + (o - s) / f), p = Math.min(p * 60, 360), p < 0 && (p += 360);
    const g = (u + c) / 2;
    return c === u ? y = 0 : g <= 0.5 ? y = f / (c + u) : y = f / (2 - c - u), [p, y * 100, g * 100];
  }, r.rgb.hsv = function(i) {
    let o, s, l, u, c;
    const f = i[0] / 255, p = i[1] / 255, y = i[2] / 255, g = Math.max(f, p, y), m = g - Math.min(f, p, y), b = function(j) {
      return (g - j) / 6 / m + 1 / 2;
    };
    return m === 0 ? (u = 0, c = 0) : (c = m / g, o = b(f), s = b(p), l = b(y), f === g ? u = l - s : p === g ? u = 1 / 3 + o - l : y === g && (u = 2 / 3 + s - o), u < 0 ? u += 1 : u > 1 && (u -= 1)), [
      u * 360,
      c * 100,
      g * 100
    ];
  }, r.rgb.hwb = function(i) {
    const o = i[0], s = i[1];
    let l = i[2];
    const u = r.rgb.hsl(i)[0], c = 1 / 255 * Math.min(o, Math.min(s, l));
    return l = 1 - 1 / 255 * Math.max(o, Math.max(s, l)), [u, c * 100, l * 100];
  }, r.rgb.cmyk = function(i) {
    const o = i[0] / 255, s = i[1] / 255, l = i[2] / 255, u = Math.min(1 - o, 1 - s, 1 - l), c = (1 - o - u) / (1 - u) || 0, f = (1 - s - u) / (1 - u) || 0, p = (1 - l - u) / (1 - u) || 0;
    return [c * 100, f * 100, p * 100, u * 100];
  };
  function n(i, o) {
    return (i[0] - o[0]) ** 2 + (i[1] - o[1]) ** 2 + (i[2] - o[2]) ** 2;
  }
  return r.rgb.keyword = function(i) {
    const o = e[i];
    if (o)
      return o;
    let s = 1 / 0, l;
    for (const u of Object.keys(t)) {
      const c = t[u], f = n(i, c);
      f < s && (s = f, l = u);
    }
    return l;
  }, r.keyword.rgb = function(i) {
    return t[i];
  }, r.rgb.xyz = function(i) {
    let o = i[0] / 255, s = i[1] / 255, l = i[2] / 255;
    o = o > 0.04045 ? ((o + 0.055) / 1.055) ** 2.4 : o / 12.92, s = s > 0.04045 ? ((s + 0.055) / 1.055) ** 2.4 : s / 12.92, l = l > 0.04045 ? ((l + 0.055) / 1.055) ** 2.4 : l / 12.92;
    const u = o * 0.4124 + s * 0.3576 + l * 0.1805, c = o * 0.2126 + s * 0.7152 + l * 0.0722, f = o * 0.0193 + s * 0.1192 + l * 0.9505;
    return [u * 100, c * 100, f * 100];
  }, r.rgb.lab = function(i) {
    const o = r.rgb.xyz(i);
    let s = o[0], l = o[1], u = o[2];
    s /= 95.047, l /= 100, u /= 108.883, s = s > 8856e-6 ? s ** (1 / 3) : 7.787 * s + 16 / 116, l = l > 8856e-6 ? l ** (1 / 3) : 7.787 * l + 16 / 116, u = u > 8856e-6 ? u ** (1 / 3) : 7.787 * u + 16 / 116;
    const c = 116 * l - 16, f = 500 * (s - l), p = 200 * (l - u);
    return [c, f, p];
  }, r.hsl.rgb = function(i) {
    const o = i[0] / 360, s = i[1] / 100, l = i[2] / 100;
    let u, c, f;
    if (s === 0)
      return f = l * 255, [f, f, f];
    l < 0.5 ? u = l * (1 + s) : u = l + s - l * s;
    const p = 2 * l - u, y = [0, 0, 0];
    for (let g = 0; g < 3; g++)
      c = o + 1 / 3 * -(g - 1), c < 0 && c++, c > 1 && c--, 6 * c < 1 ? f = p + (u - p) * 6 * c : 2 * c < 1 ? f = u : 3 * c < 2 ? f = p + (u - p) * (2 / 3 - c) * 6 : f = p, y[g] = f * 255;
    return y;
  }, r.hsl.hsv = function(i) {
    const o = i[0];
    let s = i[1] / 100, l = i[2] / 100, u = s;
    const c = Math.max(l, 0.01);
    l *= 2, s *= l <= 1 ? l : 2 - l, u *= c <= 1 ? c : 2 - c;
    const f = (l + s) / 2, p = l === 0 ? 2 * u / (c + u) : 2 * s / (l + s);
    return [o, p * 100, f * 100];
  }, r.hsv.rgb = function(i) {
    const o = i[0] / 60, s = i[1] / 100;
    let l = i[2] / 100;
    const u = Math.floor(o) % 6, c = o - Math.floor(o), f = 255 * l * (1 - s), p = 255 * l * (1 - s * c), y = 255 * l * (1 - s * (1 - c));
    switch (l *= 255, u) {
      case 0:
        return [l, y, f];
      case 1:
        return [p, l, f];
      case 2:
        return [f, l, y];
      case 3:
        return [f, p, l];
      case 4:
        return [y, f, l];
      case 5:
        return [l, f, p];
    }
  }, r.hsv.hsl = function(i) {
    const o = i[0], s = i[1] / 100, l = i[2] / 100, u = Math.max(l, 0.01);
    let c, f;
    f = (2 - s) * l;
    const p = (2 - s) * u;
    return c = s * u, c /= p <= 1 ? p : 2 - p, c = c || 0, f /= 2, [o, c * 100, f * 100];
  }, r.hwb.rgb = function(i) {
    const o = i[0] / 360;
    let s = i[1] / 100, l = i[2] / 100;
    const u = s + l;
    let c;
    u > 1 && (s /= u, l /= u);
    const f = Math.floor(6 * o), p = 1 - l;
    c = 6 * o - f, f & 1 && (c = 1 - c);
    const y = s + c * (p - s);
    let g, m, b;
    switch (f) {
      default:
      case 6:
      case 0:
        g = p, m = y, b = s;
        break;
      case 1:
        g = y, m = p, b = s;
        break;
      case 2:
        g = s, m = p, b = y;
        break;
      case 3:
        g = s, m = y, b = p;
        break;
      case 4:
        g = y, m = s, b = p;
        break;
      case 5:
        g = p, m = s, b = y;
        break;
    }
    return [g * 255, m * 255, b * 255];
  }, r.cmyk.rgb = function(i) {
    const o = i[0] / 100, s = i[1] / 100, l = i[2] / 100, u = i[3] / 100, c = 1 - Math.min(1, o * (1 - u) + u), f = 1 - Math.min(1, s * (1 - u) + u), p = 1 - Math.min(1, l * (1 - u) + u);
    return [c * 255, f * 255, p * 255];
  }, r.xyz.rgb = function(i) {
    const o = i[0] / 100, s = i[1] / 100, l = i[2] / 100;
    let u, c, f;
    return u = o * 3.2406 + s * -1.5372 + l * -0.4986, c = o * -0.9689 + s * 1.8758 + l * 0.0415, f = o * 0.0557 + s * -0.204 + l * 1.057, u = u > 31308e-7 ? 1.055 * u ** (1 / 2.4) - 0.055 : u * 12.92, c = c > 31308e-7 ? 1.055 * c ** (1 / 2.4) - 0.055 : c * 12.92, f = f > 31308e-7 ? 1.055 * f ** (1 / 2.4) - 0.055 : f * 12.92, u = Math.min(Math.max(0, u), 1), c = Math.min(Math.max(0, c), 1), f = Math.min(Math.max(0, f), 1), [u * 255, c * 255, f * 255];
  }, r.xyz.lab = function(i) {
    let o = i[0], s = i[1], l = i[2];
    o /= 95.047, s /= 100, l /= 108.883, o = o > 8856e-6 ? o ** (1 / 3) : 7.787 * o + 16 / 116, s = s > 8856e-6 ? s ** (1 / 3) : 7.787 * s + 16 / 116, l = l > 8856e-6 ? l ** (1 / 3) : 7.787 * l + 16 / 116;
    const u = 116 * s - 16, c = 500 * (o - s), f = 200 * (s - l);
    return [u, c, f];
  }, r.lab.xyz = function(i) {
    const o = i[0], s = i[1], l = i[2];
    let u, c, f;
    c = (o + 16) / 116, u = s / 500 + c, f = c - l / 200;
    const p = c ** 3, y = u ** 3, g = f ** 3;
    return c = p > 8856e-6 ? p : (c - 16 / 116) / 7.787, u = y > 8856e-6 ? y : (u - 16 / 116) / 7.787, f = g > 8856e-6 ? g : (f - 16 / 116) / 7.787, u *= 95.047, c *= 100, f *= 108.883, [u, c, f];
  }, r.lab.lch = function(i) {
    const o = i[0], s = i[1], l = i[2];
    let u;
    u = Math.atan2(l, s) * 360 / 2 / Math.PI, u < 0 && (u += 360);
    const f = Math.sqrt(s * s + l * l);
    return [o, f, u];
  }, r.lch.lab = function(i) {
    const o = i[0], s = i[1], u = i[2] / 360 * 2 * Math.PI, c = s * Math.cos(u), f = s * Math.sin(u);
    return [o, c, f];
  }, r.rgb.ansi16 = function(i, o = null) {
    const [s, l, u] = i;
    let c = o === null ? r.rgb.hsv(i)[2] : o;
    if (c = Math.round(c / 50), c === 0)
      return 30;
    let f = 30 + (Math.round(u / 255) << 2 | Math.round(l / 255) << 1 | Math.round(s / 255));
    return c === 2 && (f += 60), f;
  }, r.hsv.ansi16 = function(i) {
    return r.rgb.ansi16(r.hsv.rgb(i), i[2]);
  }, r.rgb.ansi256 = function(i) {
    const o = i[0], s = i[1], l = i[2];
    return o === s && s === l ? o < 8 ? 16 : o > 248 ? 231 : Math.round((o - 8) / 247 * 24) + 232 : 16 + 36 * Math.round(o / 255 * 5) + 6 * Math.round(s / 255 * 5) + Math.round(l / 255 * 5);
  }, r.ansi16.rgb = function(i) {
    let o = i % 10;
    if (o === 0 || o === 7)
      return i > 50 && (o += 3.5), o = o / 10.5 * 255, [o, o, o];
    const s = (~~(i > 50) + 1) * 0.5, l = (o & 1) * s * 255, u = (o >> 1 & 1) * s * 255, c = (o >> 2 & 1) * s * 255;
    return [l, u, c];
  }, r.ansi256.rgb = function(i) {
    if (i >= 232) {
      const c = (i - 232) * 10 + 8;
      return [c, c, c];
    }
    i -= 16;
    let o;
    const s = Math.floor(i / 36) / 5 * 255, l = Math.floor((o = i % 36) / 6) / 5 * 255, u = o % 6 / 5 * 255;
    return [s, l, u];
  }, r.rgb.hex = function(i) {
    const s = (((Math.round(i[0]) & 255) << 16) + ((Math.round(i[1]) & 255) << 8) + (Math.round(i[2]) & 255)).toString(16).toUpperCase();
    return "000000".substring(s.length) + s;
  }, r.hex.rgb = function(i) {
    const o = i.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
    if (!o)
      return [0, 0, 0];
    let s = o[0];
    o[0].length === 3 && (s = s.split("").map((p) => p + p).join(""));
    const l = parseInt(s, 16), u = l >> 16 & 255, c = l >> 8 & 255, f = l & 255;
    return [u, c, f];
  }, r.rgb.hcg = function(i) {
    const o = i[0] / 255, s = i[1] / 255, l = i[2] / 255, u = Math.max(Math.max(o, s), l), c = Math.min(Math.min(o, s), l), f = u - c;
    let p, y;
    return f < 1 ? p = c / (1 - f) : p = 0, f <= 0 ? y = 0 : u === o ? y = (s - l) / f % 6 : u === s ? y = 2 + (l - o) / f : y = 4 + (o - s) / f, y /= 6, y %= 1, [y * 360, f * 100, p * 100];
  }, r.hsl.hcg = function(i) {
    const o = i[1] / 100, s = i[2] / 100, l = s < 0.5 ? 2 * o * s : 2 * o * (1 - s);
    let u = 0;
    return l < 1 && (u = (s - 0.5 * l) / (1 - l)), [i[0], l * 100, u * 100];
  }, r.hsv.hcg = function(i) {
    const o = i[1] / 100, s = i[2] / 100, l = o * s;
    let u = 0;
    return l < 1 && (u = (s - l) / (1 - l)), [i[0], l * 100, u * 100];
  }, r.hcg.rgb = function(i) {
    const o = i[0] / 360, s = i[1] / 100, l = i[2] / 100;
    if (s === 0)
      return [l * 255, l * 255, l * 255];
    const u = [0, 0, 0], c = o % 1 * 6, f = c % 1, p = 1 - f;
    let y = 0;
    switch (Math.floor(c)) {
      case 0:
        u[0] = 1, u[1] = f, u[2] = 0;
        break;
      case 1:
        u[0] = p, u[1] = 1, u[2] = 0;
        break;
      case 2:
        u[0] = 0, u[1] = 1, u[2] = f;
        break;
      case 3:
        u[0] = 0, u[1] = p, u[2] = 1;
        break;
      case 4:
        u[0] = f, u[1] = 0, u[2] = 1;
        break;
      default:
        u[0] = 1, u[1] = 0, u[2] = p;
    }
    return y = (1 - s) * l, [
      (s * u[0] + y) * 255,
      (s * u[1] + y) * 255,
      (s * u[2] + y) * 255
    ];
  }, r.hcg.hsv = function(i) {
    const o = i[1] / 100, s = i[2] / 100, l = o + s * (1 - o);
    let u = 0;
    return l > 0 && (u = o / l), [i[0], u * 100, l * 100];
  }, r.hcg.hsl = function(i) {
    const o = i[1] / 100, l = i[2] / 100 * (1 - o) + 0.5 * o;
    let u = 0;
    return l > 0 && l < 0.5 ? u = o / (2 * l) : l >= 0.5 && l < 1 && (u = o / (2 * (1 - l))), [i[0], u * 100, l * 100];
  }, r.hcg.hwb = function(i) {
    const o = i[1] / 100, s = i[2] / 100, l = o + s * (1 - o);
    return [i[0], (l - o) * 100, (1 - l) * 100];
  }, r.hwb.hcg = function(i) {
    const o = i[1] / 100, l = 1 - i[2] / 100, u = l - o;
    let c = 0;
    return u < 1 && (c = (l - u) / (1 - u)), [i[0], u * 100, c * 100];
  }, r.apple.rgb = function(i) {
    return [i[0] / 65535 * 255, i[1] / 65535 * 255, i[2] / 65535 * 255];
  }, r.rgb.apple = function(i) {
    return [i[0] / 255 * 65535, i[1] / 255 * 65535, i[2] / 255 * 65535];
  }, r.gray.rgb = function(i) {
    return [i[0] / 100 * 255, i[0] / 100 * 255, i[0] / 100 * 255];
  }, r.gray.hsl = function(i) {
    return [0, 0, i[0]];
  }, r.gray.hsv = r.gray.hsl, r.gray.hwb = function(i) {
    return [0, 100, i[0]];
  }, r.gray.cmyk = function(i) {
    return [0, 0, 0, i[0]];
  }, r.gray.lab = function(i) {
    return [i[0], 0, 0];
  }, r.gray.hex = function(i) {
    const o = Math.round(i[0] / 100 * 255) & 255, l = ((o << 16) + (o << 8) + o).toString(16).toUpperCase();
    return "000000".substring(l.length) + l;
  }, r.rgb.gray = function(i) {
    return [(i[0] + i[1] + i[2]) / 3 / 255 * 100];
  }, ki;
}
var Ci, Os;
function hd() {
  if (Os)
    return Ci;
  Os = 1;
  const t = ec();
  function e() {
    const o = {}, s = Object.keys(t);
    for (let l = s.length, u = 0; u < l; u++)
      o[s[u]] = {
        // http://jsperf.com/1-vs-infinity
        // micro-opt, but this is simple.
        distance: -1,
        parent: null
      };
    return o;
  }
  function r(o) {
    const s = e(), l = [o];
    for (s[o].distance = 0; l.length; ) {
      const u = l.pop(), c = Object.keys(t[u]);
      for (let f = c.length, p = 0; p < f; p++) {
        const y = c[p], g = s[y];
        g.distance === -1 && (g.distance = s[u].distance + 1, g.parent = u, l.unshift(y));
      }
    }
    return s;
  }
  function n(o, s) {
    return function(l) {
      return s(o(l));
    };
  }
  function i(o, s) {
    const l = [s[o].parent, o];
    let u = t[s[o].parent][o], c = s[o].parent;
    for (; s[c].parent; )
      l.unshift(s[c].parent), u = n(t[s[c].parent][c], u), c = s[c].parent;
    return u.conversion = l, u;
  }
  return Ci = function(o) {
    const s = r(o), l = {}, u = Object.keys(s);
    for (let c = u.length, f = 0; f < c; f++) {
      const p = u[f];
      s[p].parent !== null && (l[p] = i(p, s));
    }
    return l;
  }, Ci;
}
var Pi, Es;
function gd() {
  if (Es)
    return Pi;
  Es = 1;
  const t = ec(), e = hd(), r = {}, n = Object.keys(t);
  function i(s) {
    const l = function(...u) {
      const c = u[0];
      return c == null ? c : (c.length > 1 && (u = c), s(u));
    };
    return "conversion" in s && (l.conversion = s.conversion), l;
  }
  function o(s) {
    const l = function(...u) {
      const c = u[0];
      if (c == null)
        return c;
      c.length > 1 && (u = c);
      const f = s(u);
      if (typeof f == "object")
        for (let p = f.length, y = 0; y < p; y++)
          f[y] = Math.round(f[y]);
      return f;
    };
    return "conversion" in s && (l.conversion = s.conversion), l;
  }
  return n.forEach((s) => {
    r[s] = {}, Object.defineProperty(r[s], "channels", { value: t[s].channels }), Object.defineProperty(r[s], "labels", { value: t[s].labels });
    const l = e(s);
    Object.keys(l).forEach((c) => {
      const f = l[c];
      r[s][c] = o(f), r[s][c].raw = i(f);
    });
  }), Pi = r, Pi;
}
Lo.exports;
(function(t) {
  const e = (f, p) => (...y) => `\x1B[${f(...y) + p}m`, r = (f, p) => (...y) => {
    const g = f(...y);
    return `\x1B[${38 + p};5;${g}m`;
  }, n = (f, p) => (...y) => {
    const g = f(...y);
    return `\x1B[${38 + p};2;${g[0]};${g[1]};${g[2]}m`;
  }, i = (f) => f, o = (f, p, y) => [f, p, y], s = (f, p, y) => {
    Object.defineProperty(f, p, {
      get: () => {
        const g = y();
        return Object.defineProperty(f, p, {
          value: g,
          enumerable: !0,
          configurable: !0
        }), g;
      },
      enumerable: !0,
      configurable: !0
    });
  };
  let l;
  const u = (f, p, y, g) => {
    l === void 0 && (l = gd());
    const m = g ? 10 : 0, b = {};
    for (const [j, $] of Object.entries(l)) {
      const v = j === "ansi16" ? "ansi" : j;
      j === p ? b[v] = f(y, m) : typeof $ == "object" && (b[v] = f($[p], m));
    }
    return b;
  };
  function c() {
    const f = /* @__PURE__ */ new Map(), p = {
      modifier: {
        reset: [0, 0],
        // 21 isn't widely supported and 22 does the same thing
        bold: [1, 22],
        dim: [2, 22],
        italic: [3, 23],
        underline: [4, 24],
        inverse: [7, 27],
        hidden: [8, 28],
        strikethrough: [9, 29]
      },
      color: {
        black: [30, 39],
        red: [31, 39],
        green: [32, 39],
        yellow: [33, 39],
        blue: [34, 39],
        magenta: [35, 39],
        cyan: [36, 39],
        white: [37, 39],
        // Bright color
        blackBright: [90, 39],
        redBright: [91, 39],
        greenBright: [92, 39],
        yellowBright: [93, 39],
        blueBright: [94, 39],
        magentaBright: [95, 39],
        cyanBright: [96, 39],
        whiteBright: [97, 39]
      },
      bgColor: {
        bgBlack: [40, 49],
        bgRed: [41, 49],
        bgGreen: [42, 49],
        bgYellow: [43, 49],
        bgBlue: [44, 49],
        bgMagenta: [45, 49],
        bgCyan: [46, 49],
        bgWhite: [47, 49],
        // Bright color
        bgBlackBright: [100, 49],
        bgRedBright: [101, 49],
        bgGreenBright: [102, 49],
        bgYellowBright: [103, 49],
        bgBlueBright: [104, 49],
        bgMagentaBright: [105, 49],
        bgCyanBright: [106, 49],
        bgWhiteBright: [107, 49]
      }
    };
    p.color.gray = p.color.blackBright, p.bgColor.bgGray = p.bgColor.bgBlackBright, p.color.grey = p.color.blackBright, p.bgColor.bgGrey = p.bgColor.bgBlackBright;
    for (const [y, g] of Object.entries(p)) {
      for (const [m, b] of Object.entries(g))
        p[m] = {
          open: `\x1B[${b[0]}m`,
          close: `\x1B[${b[1]}m`
        }, g[m] = p[m], f.set(b[0], b[1]);
      Object.defineProperty(p, y, {
        value: g,
        enumerable: !1
      });
    }
    return Object.defineProperty(p, "codes", {
      value: f,
      enumerable: !1
    }), p.color.close = "\x1B[39m", p.bgColor.close = "\x1B[49m", s(p.color, "ansi", () => u(e, "ansi16", i, !1)), s(p.color, "ansi256", () => u(r, "ansi256", i, !1)), s(p.color, "ansi16m", () => u(n, "rgb", o, !1)), s(p.bgColor, "ansi", () => u(e, "ansi16", i, !0)), s(p.bgColor, "ansi256", () => u(r, "ansi256", i, !0)), s(p.bgColor, "ansi16m", () => u(n, "rgb", o, !0)), p;
  }
  Object.defineProperty(t, "exports", {
    enumerable: !0,
    get: c
  });
})(Lo);
var bd = Lo.exports, md = {
  stdout: !1,
  stderr: !1
};
const vd = (t, e, r) => {
  let n = t.indexOf(e);
  if (n === -1)
    return t;
  const i = e.length;
  let o = 0, s = "";
  do
    s += t.substr(o, n - o) + e + r, o = n + i, n = t.indexOf(e, o);
  while (n !== -1);
  return s += t.substr(o), s;
}, wd = (t, e, r, n) => {
  let i = 0, o = "";
  do {
    const s = t[n - 1] === "\r";
    o += t.substr(i, (s ? n - 1 : n) - i) + e + (s ? `\r
` : `
`) + r, i = n + 1, n = t.indexOf(`
`, i);
  } while (n !== -1);
  return o += t.substr(i), o;
};
var _d = {
  stringReplaceAll: vd,
  stringEncaseCRLFWithFirstIndex: wd
}, Ri, Ts;
function Sd() {
  if (Ts)
    return Ri;
  Ts = 1;
  const t = /(?:\\(u(?:[a-f\d]{4}|\{[a-f\d]{1,6}\})|x[a-f\d]{2}|.))|(?:\{(~)?(\w+(?:\([^)]*\))?(?:\.\w+(?:\([^)]*\))?)*)(?:[ \t]|(?=\r?\n)))|(\})|((?:.|[\r\n\f])+?)/gi, e = /(?:^|\.)(\w+)(?:\(([^)]*)\))?/g, r = /^(['"])((?:\\.|(?!\1)[^\\])*)\1$/, n = /\\(u(?:[a-f\d]{4}|{[a-f\d]{1,6}})|x[a-f\d]{2}|.)|([^\\])/gi, i = /* @__PURE__ */ new Map([
    ["n", `
`],
    ["r", "\r"],
    ["t", "	"],
    ["b", "\b"],
    ["f", "\f"],
    ["v", "\v"],
    ["0", "\0"],
    ["\\", "\\"],
    ["e", "\x1B"],
    ["a", "\x07"]
  ]);
  function o(c) {
    const f = c[0] === "u", p = c[1] === "{";
    return f && !p && c.length === 5 || c[0] === "x" && c.length === 3 ? String.fromCharCode(parseInt(c.slice(1), 16)) : f && p ? String.fromCodePoint(parseInt(c.slice(2, -1), 16)) : i.get(c) || c;
  }
  function s(c, f) {
    const p = [], y = f.trim().split(/\s*,\s*/g);
    let g;
    for (const m of y) {
      const b = Number(m);
      if (!Number.isNaN(b))
        p.push(b);
      else if (g = m.match(r))
        p.push(g[2].replace(n, (j, $, v) => $ ? o($) : v));
      else
        throw new Error(`Invalid Chalk template style argument: ${m} (in style '${c}')`);
    }
    return p;
  }
  function l(c) {
    e.lastIndex = 0;
    const f = [];
    let p;
    for (; (p = e.exec(c)) !== null; ) {
      const y = p[1];
      if (p[2]) {
        const g = s(y, p[2]);
        f.push([y].concat(g));
      } else
        f.push([y]);
    }
    return f;
  }
  function u(c, f) {
    const p = {};
    for (const g of f)
      for (const m of g.styles)
        p[m[0]] = g.inverse ? null : m.slice(1);
    let y = c;
    for (const [g, m] of Object.entries(p))
      if (Array.isArray(m)) {
        if (!(g in y))
          throw new Error(`Unknown Chalk style: ${g}`);
        y = m.length > 0 ? y[g](...m) : y[g];
      }
    return y;
  }
  return Ri = (c, f) => {
    const p = [], y = [];
    let g = [];
    if (f.replace(t, (m, b, j, $, v, O) => {
      if (b)
        g.push(o(b));
      else if ($) {
        const S = g.join("");
        g = [], y.push(p.length === 0 ? S : u(c, p)(S)), p.push({ inverse: j, styles: l($) });
      } else if (v) {
        if (p.length === 0)
          throw new Error("Found extraneous } in Chalk template literal");
        y.push(u(c, p)(g.join(""))), g = [], p.pop();
      } else
        g.push(O);
    }), y.push(g.join("")), p.length > 0) {
      const m = `Chalk template literal is missing ${p.length} closing bracket${p.length === 1 ? "" : "s"} (\`}\`)`;
      throw new Error(m);
    }
    return y.join("");
  }, Ri;
}
const Vt = bd, { stdout: po, stderr: yo } = md, {
  stringReplaceAll: Od,
  stringEncaseCRLFWithFirstIndex: Ed
} = _d, { isArray: xr } = Array, tc = [
  "ansi",
  "ansi",
  "ansi256",
  "ansi16m"
], bt = /* @__PURE__ */ Object.create(null), Td = (t, e = {}) => {
  if (e.level && !(Number.isInteger(e.level) && e.level >= 0 && e.level <= 3))
    throw new Error("The `level` option should be an integer from 0 to 3");
  const r = po ? po.level : 0;
  t.level = e.level === void 0 ? r : e.level;
};
class Ad {
  constructor(e) {
    return rc(e);
  }
}
const rc = (t) => {
  const e = {};
  return Td(e, t), e.template = (...r) => ic(e.template, ...r), Object.setPrototypeOf(e, Mr.prototype), Object.setPrototypeOf(e.template, e), e.template.constructor = () => {
    throw new Error("`chalk.constructor()` is deprecated. Use `new chalk.Instance()` instead.");
  }, e.template.Instance = Ad, e.template;
};
function Mr(t) {
  return rc(t);
}
for (const [t, e] of Object.entries(Vt))
  bt[t] = {
    get() {
      const r = Br(this, Ho(e.open, e.close, this._styler), this._isEmpty);
      return Object.defineProperty(this, t, { value: r }), r;
    }
  };
bt.visible = {
  get() {
    const t = Br(this, this._styler, !0);
    return Object.defineProperty(this, "visible", { value: t }), t;
  }
};
const nc = ["rgb", "hex", "keyword", "hsl", "hsv", "hwb", "ansi", "ansi256"];
for (const t of nc)
  bt[t] = {
    get() {
      const { level: e } = this;
      return function(...r) {
        const n = Ho(Vt.color[tc[e]][t](...r), Vt.color.close, this._styler);
        return Br(this, n, this._isEmpty);
      };
    }
  };
for (const t of nc) {
  const e = "bg" + t[0].toUpperCase() + t.slice(1);
  bt[e] = {
    get() {
      const { level: r } = this;
      return function(...n) {
        const i = Ho(Vt.bgColor[tc[r]][t](...n), Vt.bgColor.close, this._styler);
        return Br(this, i, this._isEmpty);
      };
    }
  };
}
const jd = Object.defineProperties(() => {
}, {
  ...bt,
  level: {
    enumerable: !0,
    get() {
      return this._generator.level;
    },
    set(t) {
      this._generator.level = t;
    }
  }
}), Ho = (t, e, r) => {
  let n, i;
  return r === void 0 ? (n = t, i = e) : (n = r.openAll + t, i = e + r.closeAll), {
    open: t,
    close: e,
    openAll: n,
    closeAll: i,
    parent: r
  };
}, Br = (t, e, r) => {
  const n = (...i) => xr(i[0]) && xr(i[0].raw) ? As(n, ic(n, ...i)) : As(n, i.length === 1 ? "" + i[0] : i.join(" "));
  return Object.setPrototypeOf(n, jd), n._generator = t, n._styler = e, n._isEmpty = r, n;
}, As = (t, e) => {
  if (t.level <= 0 || !e)
    return t._isEmpty ? "" : e;
  let r = t._styler;
  if (r === void 0)
    return e;
  const { openAll: n, closeAll: i } = r;
  if (e.indexOf("\x1B") !== -1)
    for (; r !== void 0; )
      e = Od(e, r.close, r.open), r = r.parent;
  const o = e.indexOf(`
`);
  return o !== -1 && (e = Ed(e, i, n, o)), n + e + i;
};
let Ii;
const ic = (t, ...e) => {
  const [r] = e;
  if (!xr(r) || !xr(r.raw))
    return e.join(" ");
  const n = e.slice(1), i = [r.raw[0]];
  for (let o = 1; o < r.length; o++)
    i.push(
      String(n[o - 1]).replace(/[{}\\]/g, "\\$&"),
      String(r.raw[o])
    );
  return Ii === void 0 && (Ii = Sd()), Ii(t, i.join(""));
};
Object.defineProperties(Mr.prototype, bt);
const Fr = Mr();
Fr.supportsColor = po;
Fr.stderr = Mr({ level: yo ? yo.level : 0 });
Fr.stderr.supportsColor = yo;
var $d = Fr;
const Te = /* @__PURE__ */ We($d);
function js(t) {
  const e = {};
  for (const [r, n] of t)
    e[r] = n;
  return e;
}
function xd(t) {
  return Array.isArray(t);
}
function kd(t) {
  return typeof t == "boolean";
}
function Cd(t) {
  return t && {}.toString.call(t) === "[object Function]";
}
function Pd(t) {
  try {
    const e = JSON.parse(t);
    return !!Object.keys(e).length;
  } catch {
    return !1;
  }
  return !0;
}
function ho(t) {
  return t instanceof Map;
}
function go(t) {
  return t && typeof t == "object" && t.constructor === Object;
}
function Ne(t, e = {}) {
  if (e = W({
    beautify: !0,
    highlight: !0,
    verbose: !0,
    theme: {
      number: Te.yellow,
      default: Te.white,
      keyword: Te.blue,
      regexp: Te.red,
      string: Te.whiteBright,
      class: Te.yellow,
      function: Te.yellow,
      comment: Te.gray,
      variable: Te.red,
      attr: Te.green
    }
  }, e), typeof t == "string")
    return t;
  if (t === null)
    return null;
  if (t === void 0)
    return;
  if (t instanceof Error) {
    const n = t.toString(), i = t.stack, o = t.message;
    return e.verbose ? [
      `<red>${t.constructor.name || "Error"}</red>`,
      "",
      o,
      "",
      i
    ].join(`
`) : n;
  }
  if (ho(t) && (t = js(t)), go(t) || xd(t) || Pd(t)) {
    try {
      t = Vi(t);
    } catch {
    }
    t = Eo(t, ({ value: i }) => i instanceof Map ? js(i) : i);
    let n = JSON.stringify(t, null, e.beautify ? 4 : 0);
    return n = n.replace(/"([^"]+)":/g, "$1:").replace(/\uFFFF/g, '\\"'), e.highlight, n;
  }
  if (kd(t))
    return t ? "true" : "false";
  if (Cd(t))
    return "" + t;
  let r = "";
  try {
    t = Vi(t), r = JSON.stringify(t, null, e.beautify ? 4 : 0);
  } catch {
    try {
      r = t.toString();
    } catch {
      r = t;
    }
  }
  return r;
}
const or = {}, $s = {
  /**
   * @name        encrypt
   * @type          Function
   *
   * Encrypt
   *
   * @param       {String}      message         The message to encrypt
   * @return      {String}                      The encrypted string
   *
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  encrypt: function(t) {
    typeof t != "string" && (t = Ne(t));
    const e = dd(t).toString();
    return or[e] = t, e;
  },
  /**
   * @name        decrypt
   * @type        Function
   *
   * Decrypt
   *
   * @param       {String}        message         The message to decrypt
   * @return      {String}                        The decrypted message
   *
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  decrypt: function(t) {
    if (!or[t]) {
      console.warn(`The message "${t}" cannot be decrypted...`);
      return;
    }
    const e = or[t];
    return delete or[t], Fo(e);
  }
};
let sr = {}, Wt = {};
function Rd(t, e) {
  e = W({
    scope: "default",
    excludeBasics: !0
  }, e ?? {});
  const r = ud(e), n = $s.encrypt(e.scope), i = $s.encrypt(t);
  if (sr[`${n}.${i}`])
    return sr[`${n}.${i}`];
  if (Wt[n] || (Wt[n] = []), Wt[n].length >= r.length) {
    const o = fo(r);
    return sr[`${n}.${i}`] = o, o;
  } else
    for (let o = 0; o < r.length; o++)
      if (Wt[n].indexOf(r[o]) === -1)
        return Wt[n].push(r[o]), sr[`${n}.${i}`] = r[o], r[o];
}
function Id(t, e) {
  var r = t == null ? null : typeof Symbol < "u" && t[Symbol.iterator] || t["@@iterator"];
  if (r != null) {
    var n, i, o, s, l = [], u = !0, c = !1;
    try {
      if (o = (r = r.call(t)).next, e === 0) {
        if (Object(r) !== r)
          return;
        u = !1;
      } else
        for (; !(u = (n = o.call(r)).done) && (l.push(n.value), l.length !== e); u = !0)
          ;
    } catch (f) {
      c = !0, i = f;
    } finally {
      try {
        if (!u && r.return != null && (s = r.return(), Object(s) !== s))
          return;
      } finally {
        if (c)
          throw i;
      }
    }
    return l;
  }
}
function Md(t, e) {
  if (!(t instanceof e))
    throw new TypeError("Cannot call a class as a function");
}
function xs(t, e) {
  for (var r = 0; r < e.length; r++) {
    var n = e[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, sc(n.key), n);
  }
}
function Bd(t, e, r) {
  return e && xs(t.prototype, e), r && xs(t, r), Object.defineProperty(t, "prototype", {
    writable: !1
  }), t;
}
function ks(t, e, r) {
  return e = sc(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t;
}
function oc(t, e) {
  return Fd(t) || Id(t, e) || Ld(t, e) || Hd();
}
function Fd(t) {
  if (Array.isArray(t))
    return t;
}
function Ld(t, e) {
  if (t) {
    if (typeof t == "string")
      return Cs(t, e);
    var r = Object.prototype.toString.call(t).slice(8, -1);
    if (r === "Object" && t.constructor && (r = t.constructor.name), r === "Map" || r === "Set")
      return Array.from(t);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))
      return Cs(t, e);
  }
}
function Cs(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var r = 0, n = new Array(e); r < e; r++)
    n[r] = t[r];
  return n;
}
function Hd() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Dd(t, e) {
  if (typeof t != "object" || t === null)
    return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(t, e || "default");
    if (typeof n != "object")
      return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (e === "string" ? String : Number)(t);
}
function sc(t) {
  var e = Dd(t, "string");
  return typeof e == "symbol" ? e : String(e);
}
function Me(t, e) {
  var r = cc(t, e, "get");
  return Nd(t, r);
}
function ac(t, e, r) {
  var n = cc(t, e, "set");
  return Wd(t, n, r), r;
}
function cc(t, e, r) {
  if (!e.has(t))
    throw new TypeError("attempted to " + r + " private field on non-instance");
  return e.get(t);
}
function Nd(t, e) {
  return e.get ? e.get.call(t) : e.value;
}
function Wd(t, e, r) {
  if (e.set)
    e.set.call(t, r);
  else {
    if (!e.writable)
      throw new TypeError("attempted to set read only private field");
    e.value = r;
  }
}
function Ut(t, e, r) {
  if (!e.has(t))
    throw new TypeError("attempted to get private field on non-instance");
  return r;
}
function uc(t, e) {
  if (e.has(t))
    throw new TypeError("Cannot initialize the same private elements twice on an object");
}
function Ps(t, e, r) {
  uc(t, e), e.set(t, r);
}
function Rs(t, e) {
  uc(t, e), e.add(t);
}
var lc = [
  " daum[ /]",
  " deusu/",
  "(?:^| )site",
  "@[a-z]",
  "\\(at\\)[a-z]",
  "\\(github\\.com/",
  "\\[at\\][a-z]",
  "^12345",
  "^<",
  "^[\\w \\.\\-\\(\\)]+(/v?\\d+(\\.\\d+)?(\\.\\d{1,10})?)?$",
  "^[^ ]{50,}$",
  "^active",
  "^ad muncher",
  "^anglesharp/",
  "^anonymous",
  "^avsdevicesdk/",
  "^axios/",
  "^bidtellect/",
  "^biglotron",
  "^castro",
  "^clamav[ /]",
  "^cobweb/",
  "^coccoc",
  "^custom",
  "^ddg[_-]android",
  "^discourse",
  "^dispatch/\\d",
  "^downcast/",
  "^duckduckgo",
  "^facebook",
  "^fdm[ /]\\d",
  "^getright/",
  "^gozilla/",
  "^hatena",
  "^hobbit",
  "^hotzonu",
  "^hwcdn/",
  "^jeode/",
  "^jetty/",
  "^jigsaw",
  "^linkdex",
  "^lwp[-: ]",
  "^metauri",
  "^microsoft bits",
  "^movabletype",
  "^mozilla/\\d\\.\\d \\(compatible;?\\)$",
  "^mozilla/\\d\\.\\d \\w*$",
  "^navermailapp",
  "^netsurf",
  "^offline explorer",
  "^phantom",
  "^php",
  "^postman",
  "^postrank",
  "^python",
  "^read",
  "^reed",
  "^restsharp/",
  "^snapchat",
  "^space bison",
  "^svn",
  "^swcd ",
  "^taringa",
  "^test certificate info",
  "^thumbor/",
  "^tumblr/",
  "^user-agent:mozilla",
  "^valid",
  "^venus/fedoraplanet",
  "^w3c",
  "^webbandit/",
  "^webcopier",
  "^wget",
  "^whatsapp",
  "^xenu link sleuth",
  "^yahoo",
  "^yandex",
  "^zdm/\\d",
  "^zoom marketplace/",
  "^{{.*}}$",
  "adbeat\\.com",
  "appinsights",
  "archive",
  "ask jeeves/teoma",
  "bit\\.ly/",
  "bluecoat drtr",
  "bot",
  "browsex",
  "burpcollaborator",
  "capture",
  "catch",
  "check",
  "chrome-lighthouse",
  "chromeframe",
  "client",
  "cloud",
  "crawl",
  "cryptoapi",
  "dareboost",
  "datanyze",
  "dataprovider",
  "dejaclick",
  "dmbrowser",
  "download",
  "evc-batch/",
  "feed",
  "firephp",
  "freesafeip",
  "ghost",
  "gomezagent",
  "google",
  "headlesschrome/",
  "http",
  "httrack",
  "hubspot marketing grader",
  "hydra",
  "ibisbrowser",
  "images",
  "iplabel",
  "ips-agent",
  "java",
  "library",
  "mail\\.ru/",
  "manager",
  "monitor",
  "morningscore/",
  "neustar wpm",
  "news",
  "nutch",
  "offbyone",
  "optimize",
  "pageburst",
  "pagespeed",
  "perl",
  "pingdom",
  "powermarks",
  "preview",
  "proxy",
  "ptst[ /]\\d",
  "reader",
  "rexx;",
  "rigor",
  "rss",
  "scan",
  "scrape",
  "search",
  "serp ?reputation ?management",
  "server",
  "sogou",
  "sparkler/",
  "spider",
  "statuscake",
  "stumbleupon\\.com",
  "supercleaner",
  "synapse",
  "synthetic",
  "taginspector/",
  "torrent",
  "tracemyfile",
  "transcoder",
  "trendsmapresolver",
  "twingly recon",
  "url",
  "virtuoso",
  "wappalyzer",
  "webglance",
  "webkit2png",
  "websitemetadataretriever",
  "whatcms/",
  "wordpress",
  "zgrab"
];
function Ud(t) {
  try {
    new RegExp("(?<! cu)bot").test("dangerbot");
  } catch {
    return t;
  }
  return [
    // Addresses: Cubot device
    ["bot", "(?<! cu)bot"],
    // Addresses: Android webview
    ["google", "(?<! (?:channel/|google/))google(?!(app|/google| pixel))"],
    // Addresses: libhttp browser
    ["http", "(?<!(?:lib))http"],
    // Addresses: java based browsers
    ["java", "java(?!;)"],
    // Addresses: Yandex Search App
    ["search", "(?<! ya(?:yandex)?)search"]
  ].forEach(function(e) {
    var r = oc(e, 2), n = r[0], i = r[1], o = t.lastIndexOf(n);
    ~o && t.splice(o, 1, i);
  }), t;
}
Ud(lc);
var fc = "i", De = /* @__PURE__ */ new WeakMap(), qt = /* @__PURE__ */ new WeakMap(), ar = /* @__PURE__ */ new WeakSet(), Mi = /* @__PURE__ */ new WeakSet(), Gd = /* @__PURE__ */ function() {
  function t(e) {
    var r = this;
    Md(this, t), Rs(this, Mi), Rs(this, ar), Ps(this, De, {
      writable: !0,
      value: void 0
    }), Ps(this, qt, {
      writable: !0,
      value: void 0
    }), ac(this, De, e || lc.slice()), Ut(this, ar, Bi).call(this);
    var n = function(o) {
      return r.test(o);
    };
    return Object.defineProperties(n, Object.entries(Object.getOwnPropertyDescriptors(t.prototype)).reduce(function(i, o) {
      var s = oc(o, 2), l = s[0], u = s[1];
      return typeof u.value == "function" && Object.assign(i, ks({}, l, {
        value: r[l].bind(r)
      })), typeof u.get == "function" && Object.assign(i, ks({}, l, {
        get: function() {
          return r[l];
        }
      })), i;
    }, {}));
  }
  return Bd(t, [{
    key: "pattern",
    get: (
      /**
       * Get a clone of the pattern
       * @type RegExp
       */
      function() {
        return new RegExp(Me(this, qt));
      }
    )
    /**
     * Match given string against out pattern
     * @param  {string} ua User Agent string
     * @returns {boolean}
     */
  }, {
    key: "test",
    value: function(r) {
      return !!r && Me(this, qt).test(r);
    }
    /**
     * Get the match for strings' known crawler pattern
     * @param  {string} ua User Agent string
     * @returns {string|null}
     */
  }, {
    key: "find",
    value: function() {
      var r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "", n = r.match(Me(this, qt));
      return n && n[0];
    }
    /**
     * Get the patterns that match user agent string if any
     * @param  {string} ua User Agent string
     * @returns {string[]}
     */
  }, {
    key: "matches",
    value: function() {
      var r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
      return Me(this, De).filter(function(n) {
        return new RegExp(n, fc).test(r);
      });
    }
    /**
     * Clear all patterns that match user agent
     * @param  {string} ua User Agent string
     * @returns {void}
     */
  }, {
    key: "clear",
    value: function() {
      var r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
      this.exclude(this.matches(r));
    }
    /**
     * Extent patterns for known crawlers
     * @param  {string[]} filters
     * @returns {void}
     */
  }, {
    key: "extend",
    value: function() {
      var r = this, n = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
      [].push.apply(Me(this, De), n.filter(function(i) {
        return Ut(r, Mi, Is).call(r, i) === -1;
      }).map(function(i) {
        return i.toLowerCase();
      })), Ut(this, ar, Bi).call(this);
    }
    /**
     * Exclude patterns from bot pattern rule
     * @param  {string[]} filters
     * @returns {void}
     */
  }, {
    key: "exclude",
    value: function() {
      for (var r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], n = r.length; n--; ) {
        var i = Ut(this, Mi, Is).call(this, r[n]);
        i > -1 && Me(this, De).splice(i, 1);
      }
      Ut(this, ar, Bi).call(this);
    }
    /**
     * Create a new Isbot instance using given list or self's list
     * @param  {string[]} [list]
     * @returns {Isbot}
     */
  }, {
    key: "spawn",
    value: function(r) {
      return new t(r || Me(this, De));
    }
  }]), t;
}();
function Bi() {
  ac(this, qt, new RegExp(Me(this, De).join("|"), fc));
}
function Is(t) {
  return Me(this, De).indexOf(t.toLowerCase());
}
new Gd();
function qd() {
  return process.send !== void 0 || process.env.IS_CHILD_PROCESS !== void 0;
}
var bo = { exports: {} };
(function(t, e) {
  (function(r) {
    const n = Function.prototype.toString;
    function i(s) {
      return n.call(s).replace(/^[^{]*{\s*/, "").replace(/\s*}[^}]*$/, "");
    }
    function o(s) {
      if (typeof s != "function")
        return !1;
      if (/^class[\s{]/.test(n.call(s)))
        return !0;
      const l = i(s);
      return /classCallCheck\(/.test(l) || /TypeError\("Cannot call a class as a function"\)/.test(l);
    }
    t.exports && (e = t.exports = o), e.isClass = o;
  })();
})(bo, bo.exports);
var Kd = bo.exports;
const zd = /* @__PURE__ */ We(Kd);
function Yt(t) {
  Array.isArray(t) || (t = [t]);
  for (let e = 0; e < t.length; e++)
    if (!zd(t[e]))
      return !1;
  return !0;
}
/*!
 * is-extglob <https://github.com/jonschlinkert/is-extglob>
 *
 * Copyright (c) 2014-2016, Jon Schlinkert.
 * Licensed under the MIT License.
 */
var Vd = function(e) {
  if (typeof e != "string" || e === "")
    return !1;
  for (var r; r = /(\\).|([@?!+*]\(.*\))/g.exec(e); ) {
    if (r[2])
      return !0;
    e = e.slice(r.index + r[0].length);
  }
  return !1;
};
/*!
 * is-glob <https://github.com/jonschlinkert/is-glob>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */
var Yd = Vd, pc = { "{": "}", "(": ")", "[": "]" }, Xd = function(t) {
  if (t[0] === "!")
    return !0;
  for (var e = 0, r = -2, n = -2, i = -2, o = -2, s = -2; e < t.length; ) {
    if (t[e] === "*" || t[e + 1] === "?" && /[\].+)]/.test(t[e]) || n !== -1 && t[e] === "[" && t[e + 1] !== "]" && (n < e && (n = t.indexOf("]", e)), n > e && (s === -1 || s > n || (s = t.indexOf("\\", e), s === -1 || s > n))) || i !== -1 && t[e] === "{" && t[e + 1] !== "}" && (i = t.indexOf("}", e), i > e && (s = t.indexOf("\\", e), s === -1 || s > i)) || o !== -1 && t[e] === "(" && t[e + 1] === "?" && /[:!=]/.test(t[e + 2]) && t[e + 3] !== ")" && (o = t.indexOf(")", e), o > e && (s = t.indexOf("\\", e), s === -1 || s > o)) || r !== -1 && t[e] === "(" && t[e + 1] !== "|" && (r < e && (r = t.indexOf("|", e)), r !== -1 && t[r + 1] !== ")" && (o = t.indexOf(")", r), o > r && (s = t.indexOf("\\", r), s === -1 || s > o))))
      return !0;
    if (t[e] === "\\") {
      var l = t[e + 1];
      e += 2;
      var u = pc[l];
      if (u) {
        var c = t.indexOf(u, e);
        c !== -1 && (e = c + 1);
      }
      if (t[e] === "!")
        return !0;
    } else
      e++;
  }
  return !1;
}, Jd = function(t) {
  if (t[0] === "!")
    return !0;
  for (var e = 0; e < t.length; ) {
    if (/[*?{}()[\]]/.test(t[e]))
      return !0;
    if (t[e] === "\\") {
      var r = t[e + 1];
      e += 2;
      var n = pc[r];
      if (n) {
        var i = t.indexOf(n, e);
        i !== -1 && (e = i + 1);
      }
      if (t[e] === "!")
        return !0;
    } else
      e++;
  }
  return !1;
}, Zd = function(e, r) {
  if (typeof e != "string" || e === "")
    return !1;
  if (Yd(e))
    return !0;
  var n = Xd;
  return r && r.strict === !1 && (n = Jd), n(e);
};
const Qd = /* @__PURE__ */ We(Zd);
function ey(t) {
  return Qd(t);
}
function ty(t) {
  return typeof t == "number" && !isNaN(t) && function(e) {
    return (e | 0) === e;
  }(parseFloat(t));
}
function Do() {
  return typeof process < "u" && process.release && process.release.name === "node";
}
function ry(t) {
  return typeof t == "string" || t instanceof String;
}
var dc = { exports: {} }, No = { exports: {} }, yc = {}, Lr = {
  ROOT: 0,
  GROUP: 1,
  POSITION: 2,
  SET: 3,
  RANGE: 4,
  REPETITION: 5,
  REFERENCE: 6,
  CHAR: 7
}, Fe = {}, P = Lr, Wo = function() {
  return [{ type: P.RANGE, from: 48, to: 57 }];
}, hc = function() {
  return [
    { type: P.CHAR, value: 95 },
    { type: P.RANGE, from: 97, to: 122 },
    { type: P.RANGE, from: 65, to: 90 }
  ].concat(Wo());
}, gc = function() {
  return [
    { type: P.CHAR, value: 9 },
    { type: P.CHAR, value: 10 },
    { type: P.CHAR, value: 11 },
    { type: P.CHAR, value: 12 },
    { type: P.CHAR, value: 13 },
    { type: P.CHAR, value: 32 },
    { type: P.CHAR, value: 160 },
    { type: P.CHAR, value: 5760 },
    { type: P.CHAR, value: 6158 },
    { type: P.CHAR, value: 8192 },
    { type: P.CHAR, value: 8193 },
    { type: P.CHAR, value: 8194 },
    { type: P.CHAR, value: 8195 },
    { type: P.CHAR, value: 8196 },
    { type: P.CHAR, value: 8197 },
    { type: P.CHAR, value: 8198 },
    { type: P.CHAR, value: 8199 },
    { type: P.CHAR, value: 8200 },
    { type: P.CHAR, value: 8201 },
    { type: P.CHAR, value: 8202 },
    { type: P.CHAR, value: 8232 },
    { type: P.CHAR, value: 8233 },
    { type: P.CHAR, value: 8239 },
    { type: P.CHAR, value: 8287 },
    { type: P.CHAR, value: 12288 },
    { type: P.CHAR, value: 65279 }
  ];
}, ny = function() {
  return [
    { type: P.CHAR, value: 10 },
    { type: P.CHAR, value: 13 },
    { type: P.CHAR, value: 8232 },
    { type: P.CHAR, value: 8233 }
  ];
};
Fe.words = function() {
  return { type: P.SET, set: hc(), not: !1 };
};
Fe.notWords = function() {
  return { type: P.SET, set: hc(), not: !0 };
};
Fe.ints = function() {
  return { type: P.SET, set: Wo(), not: !1 };
};
Fe.notInts = function() {
  return { type: P.SET, set: Wo(), not: !0 };
};
Fe.whitespace = function() {
  return { type: P.SET, set: gc(), not: !1 };
};
Fe.notWhitespace = function() {
  return { type: P.SET, set: gc(), not: !0 };
};
Fe.anyChar = function() {
  return { type: P.SET, set: ny(), not: !0 };
};
(function(t) {
  var e = Lr, r = Fe, n = "@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^ ?", i = { 0: 0, t: 9, n: 10, v: 11, f: 12, r: 13 };
  t.strToChars = function(o) {
    var s = /(\[\\b\])|(\\)?\\(?:u([A-F0-9]{4})|x([A-F0-9]{2})|(0?[0-7]{2})|c([@A-Z\[\\\]\^?])|([0tnvfr]))/g;
    return o = o.replace(s, function(l, u, c, f, p, y, g, m) {
      if (c)
        return l;
      var b = u ? 8 : f ? parseInt(f, 16) : p ? parseInt(p, 16) : y ? parseInt(y, 8) : g ? n.indexOf(g) : i[m], j = String.fromCharCode(b);
      return /[\[\]{}\^$.|?*+()]/.test(j) && (j = "\\" + j), j;
    }), o;
  }, t.tokenizeClass = function(o, s) {
    for (var l = [], u = /\\(?:(w)|(d)|(s)|(W)|(D)|(S))|((?:(?:\\)(.)|([^\]\\]))-(?:\\)?([^\]]))|(\])|(?:\\)?(.)/g, c, f; (c = u.exec(o)) != null; )
      if (c[1])
        l.push(r.words());
      else if (c[2])
        l.push(r.ints());
      else if (c[3])
        l.push(r.whitespace());
      else if (c[4])
        l.push(r.notWords());
      else if (c[5])
        l.push(r.notInts());
      else if (c[6])
        l.push(r.notWhitespace());
      else if (c[7])
        l.push({
          type: e.RANGE,
          from: (c[8] || c[9]).charCodeAt(0),
          to: c[10].charCodeAt(0)
        });
      else if (f = c[12])
        l.push({
          type: e.CHAR,
          value: f.charCodeAt(0)
        });
      else
        return [l, u.lastIndex];
    t.error(s, "Unterminated character class");
  }, t.error = function(o, s) {
    throw new SyntaxError("Invalid regular expression: /" + o + "/: " + s);
  };
})(yc);
var er = {}, Hr = Lr;
er.wordBoundary = function() {
  return { type: Hr.POSITION, value: "b" };
};
er.nonWordBoundary = function() {
  return { type: Hr.POSITION, value: "B" };
};
er.begin = function() {
  return { type: Hr.POSITION, value: "^" };
};
er.end = function() {
  return { type: Hr.POSITION, value: "$" };
};
var st = yc, pe = Lr, tt = Fe, cr = er;
No.exports = function(t) {
  var e = 0, r, n, i = { type: pe.ROOT, stack: [] }, o = i, s = i.stack, l = [], u = function($) {
    st.error(t, "Nothing to repeat at column " + ($ - 1));
  }, c = st.strToChars(t);
  for (r = c.length; e < r; )
    switch (n = c[e++], n) {
      case "\\":
        switch (n = c[e++], n) {
          case "b":
            s.push(cr.wordBoundary());
            break;
          case "B":
            s.push(cr.nonWordBoundary());
            break;
          case "w":
            s.push(tt.words());
            break;
          case "W":
            s.push(tt.notWords());
            break;
          case "d":
            s.push(tt.ints());
            break;
          case "D":
            s.push(tt.notInts());
            break;
          case "s":
            s.push(tt.whitespace());
            break;
          case "S":
            s.push(tt.notWhitespace());
            break;
          default:
            /\d/.test(n) ? s.push({ type: pe.REFERENCE, value: parseInt(n, 10) }) : s.push({ type: pe.CHAR, value: n.charCodeAt(0) });
        }
        break;
      case "^":
        s.push(cr.begin());
        break;
      case "$":
        s.push(cr.end());
        break;
      case "[":
        var f;
        c[e] === "^" ? (f = !0, e++) : f = !1;
        var p = st.tokenizeClass(c.slice(e), t);
        e += p[1], s.push({
          type: pe.SET,
          set: p[0],
          not: f
        });
        break;
      case ".":
        s.push(tt.anyChar());
        break;
      case "(":
        var y = {
          type: pe.GROUP,
          stack: [],
          remember: !0
        };
        n = c[e], n === "?" && (n = c[e + 1], e += 2, n === "=" ? y.followedBy = !0 : n === "!" ? y.notFollowedBy = !0 : n !== ":" && st.error(
          t,
          "Invalid group, character '" + n + "' after '?' at column " + (e - 1)
        ), y.remember = !1), s.push(y), l.push(o), o = y, s = y.stack;
        break;
      case ")":
        l.length === 0 && st.error(t, "Unmatched ) at column " + (e - 1)), o = l.pop(), s = o.options ? o.options[o.options.length - 1] : o.stack;
        break;
      case "|":
        o.options || (o.options = [o.stack], delete o.stack);
        var g = [];
        o.options.push(g), s = g;
        break;
      case "{":
        var m = /^(\d+)(,(\d+)?)?\}/.exec(c.slice(e)), b, j;
        m !== null ? (s.length === 0 && u(e), b = parseInt(m[1], 10), j = m[2] ? m[3] ? parseInt(m[3], 10) : 1 / 0 : b, e += m[0].length, s.push({
          type: pe.REPETITION,
          min: b,
          max: j,
          value: s.pop()
        })) : s.push({
          type: pe.CHAR,
          value: 123
        });
        break;
      case "?":
        s.length === 0 && u(e), s.push({
          type: pe.REPETITION,
          min: 0,
          max: 1,
          value: s.pop()
        });
        break;
      case "+":
        s.length === 0 && u(e), s.push({
          type: pe.REPETITION,
          min: 1,
          max: 1 / 0,
          value: s.pop()
        });
        break;
      case "*":
        s.length === 0 && u(e), s.push({
          type: pe.REPETITION,
          min: 0,
          max: 1 / 0,
          value: s.pop()
        });
        break;
      default:
        s.push({
          type: pe.CHAR,
          value: n.charCodeAt(0)
        });
    }
  return l.length !== 0 && st.error(t, "Unterminated group"), i;
};
No.exports.types = pe;
var iy = No.exports, bc = iy, oy = bc.types, mc = function(t, e) {
  e || (e = {});
  var r = e.limit === void 0 ? 25 : e.limit;
  sy(t) ? t = t.source : typeof t != "string" && (t = String(t));
  try {
    t = bc(t);
  } catch {
    return !1;
  }
  var n = 0;
  return function i(o, s) {
    if (o.type === oy.REPETITION && (s++, n++, s > 1 || n > r))
      return !1;
    if (o.options)
      for (var l = 0, u = o.options.length; l < u; l++) {
        var c = i({ stack: o.options[l] }, s);
        if (!c)
          return !1;
      }
    var f = o.stack || o.value && o.value.stack;
    if (!f)
      return !0;
    for (var l = 0; l < f.length; l++) {
      var c = i(f[l], s);
      if (!c)
        return !1;
    }
    return !0;
  }(t, 0);
};
function sy(t) {
  return {}.toString.call(t) === "[object RegExp]";
}
/*!
 * isobject <https://github.com/jonschlinkert/isobject>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */
var vc = function(e) {
  return e != null && typeof e == "object" && Array.isArray(e) === !1;
}, ay = Object.prototype.toString, Uo = function(e) {
  if (e === void 0)
    return "undefined";
  if (e === null)
    return "null";
  var r = typeof e;
  if (r === "boolean")
    return "boolean";
  if (r === "string")
    return "string";
  if (r === "number")
    return "number";
  if (r === "symbol")
    return "symbol";
  if (r === "function")
    return py(e) ? "generatorfunction" : "function";
  if (cy(e))
    return "array";
  if (hy(e))
    return "buffer";
  if (yy(e))
    return "arguments";
  if (ly(e))
    return "date";
  if (uy(e))
    return "error";
  if (fy(e))
    return "regexp";
  switch (wc(e)) {
    case "Symbol":
      return "symbol";
    case "Promise":
      return "promise";
    case "WeakMap":
      return "weakmap";
    case "WeakSet":
      return "weakset";
    case "Map":
      return "map";
    case "Set":
      return "set";
    case "Int8Array":
      return "int8array";
    case "Uint8Array":
      return "uint8array";
    case "Uint8ClampedArray":
      return "uint8clampedarray";
    case "Int16Array":
      return "int16array";
    case "Uint16Array":
      return "uint16array";
    case "Int32Array":
      return "int32array";
    case "Uint32Array":
      return "uint32array";
    case "Float32Array":
      return "float32array";
    case "Float64Array":
      return "float64array";
  }
  if (dy(e))
    return "generator";
  switch (r = ay.call(e), r) {
    case "[object Object]":
      return "object";
    case "[object Map Iterator]":
      return "mapiterator";
    case "[object Set Iterator]":
      return "setiterator";
    case "[object String Iterator]":
      return "stringiterator";
    case "[object Array Iterator]":
      return "arrayiterator";
  }
  return r.slice(8, -1).toLowerCase().replace(/\s/g, "");
};
function wc(t) {
  return typeof t.constructor == "function" ? t.constructor.name : null;
}
function cy(t) {
  return Array.isArray ? Array.isArray(t) : t instanceof Array;
}
function uy(t) {
  return t instanceof Error || typeof t.message == "string" && t.constructor && typeof t.constructor.stackTraceLimit == "number";
}
function ly(t) {
  return t instanceof Date ? !0 : typeof t.toDateString == "function" && typeof t.getDate == "function" && typeof t.setDate == "function";
}
function fy(t) {
  return t instanceof RegExp ? !0 : typeof t.flags == "string" && typeof t.ignoreCase == "boolean" && typeof t.multiline == "boolean" && typeof t.global == "boolean";
}
function py(t, e) {
  return wc(t) === "GeneratorFunction";
}
function dy(t) {
  return typeof t.throw == "function" && typeof t.return == "function" && typeof t.next == "function";
}
function yy(t) {
  try {
    if (typeof t.length == "number" && typeof t.callee == "function")
      return !0;
  } catch (e) {
    if (e.message.indexOf("callee") !== -1)
      return !0;
  }
  return !1;
}
function hy(t) {
  return t.constructor && typeof t.constructor.isBuffer == "function" ? t.constructor.isBuffer(t) : !1;
}
/*!
 * is-accessor-descriptor <https://github.com/jonschlinkert/is-accessor-descriptor>
 *
 * Copyright (c) 2015-2017, Jon Schlinkert.
 * Released under the MIT License.
 */
var Ms = Uo, Bs = {
  get: "function",
  set: "function",
  configurable: "boolean",
  enumerable: "boolean"
};
function gy(t, e) {
  if (typeof e == "string") {
    var r = Object.getOwnPropertyDescriptor(t, e);
    return typeof r < "u";
  }
  if (Ms(t) !== "object" || ur(t, "value") || ur(t, "writable") || !ur(t, "get") || typeof t.get != "function" || ur(t, "set") && typeof t[n] != "function" && typeof t[n] < "u")
    return !1;
  for (var n in t)
    if (Bs.hasOwnProperty(n) && Ms(t[n]) !== Bs[n] && typeof t[n] < "u")
      return !1;
  return !0;
}
function ur(t, e) {
  return {}.hasOwnProperty.call(t, e);
}
var by = gy;
/*!
 * is-data-descriptor <https://github.com/jonschlinkert/is-data-descriptor>
 *
 * Copyright (c) 2015-2017, Jon Schlinkert.
 * Released under the MIT License.
 */
var Fs = Uo, my = function(e, r) {
  var n = {
    configurable: "boolean",
    enumerable: "boolean",
    writable: "boolean"
  };
  if (Fs(e) !== "object")
    return !1;
  if (typeof r == "string") {
    var i = Object.getOwnPropertyDescriptor(e, r);
    return typeof i < "u";
  }
  if (!("value" in e) && !("writable" in e))
    return !1;
  for (var o in e)
    if (o !== "value" && n.hasOwnProperty(o) && Fs(e[o]) !== n[o] && typeof e[o] < "u")
      return !1;
  return !0;
};
/*!
 * is-descriptor <https://github.com/jonschlinkert/is-descriptor>
 *
 * Copyright (c) 2015-2017, Jon Schlinkert.
 * Released under the MIT License.
 */
var vy = Uo, wy = by, _y = my, Sy = function(e, r) {
  return vy(e) !== "object" ? !1 : "get" in e ? wy(e, r) : _y(e, r);
};
/*!
 * define-property <https://github.com/jonschlinkert/define-property>
 *
 * Copyright (c) 2015-2018, Jon Schlinkert.
 * Released under the MIT License.
 */
var Oy = vc, Ey = Sy, Ls = typeof Reflect < "u" && Reflect.defineProperty ? Reflect.defineProperty : Object.defineProperty, Ty = function(e, r, n) {
  if (!Oy(e) && typeof e != "function" && !Array.isArray(e))
    throw new TypeError("expected an object, function, or array");
  if (typeof r != "string")
    throw new TypeError('expected "key" to be a string');
  return Ey(n) ? (Ls(e, r, n), e) : (Ls(e, r, {
    configurable: !0,
    enumerable: !1,
    writable: !0,
    value: n
  }), e);
};
/*!
 * is-plain-object <https://github.com/jonschlinkert/is-plain-object>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */
var Ay = vc;
function Hs(t) {
  return Ay(t) === !0 && Object.prototype.toString.call(t) === "[object Object]";
}
var jy = function(e) {
  var r, n;
  return !(Hs(e) === !1 || (r = e.constructor, typeof r != "function") || (n = r.prototype, Hs(n) === !1) || n.hasOwnProperty("isPrototypeOf") === !1);
};
/*!
 * is-extendable <https://github.com/jonschlinkert/is-extendable>
 *
 * Copyright (c) 2015-2017, Jon Schlinkert.
 * Released under the MIT License.
 */
var $y = jy, xy = function(e) {
  return $y(e) || typeof e == "function" || Array.isArray(e);
};
/*!
 * assign-symbols <https://github.com/jonschlinkert/assign-symbols>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */
var ky = function(t, e) {
  if (t === null || typeof t > "u")
    throw new TypeError("expected first argument to be an object.");
  if (typeof e > "u" || typeof Symbol > "u" || typeof Object.getOwnPropertySymbols != "function")
    return t;
  for (var r = Object.prototype.propertyIsEnumerable, n = Object(t), i = arguments.length, o = 0; ++o < i; )
    for (var s = Object(arguments[o]), l = Object.getOwnPropertySymbols(s), u = 0; u < l.length; u++) {
      var c = l[u];
      r.call(s, c) && (n[c] = s[c]);
    }
  return n;
}, Cy = xy, Py = ky, _c = Object.assign || function(t) {
  if (t === null || typeof t > "u")
    throw new TypeError("Cannot convert undefined or null to object");
  Ds(t) || (t = {});
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e];
    Iy(r) && (r = My(r)), Ds(r) && (Ry(t, r), Py(t, r));
  }
  return t;
};
function Ry(t, e) {
  for (var r in e)
    By(e, r) && (t[r] = e[r]);
}
function Iy(t) {
  return t && typeof t == "string";
}
function My(t) {
  var e = {};
  for (var r in t)
    e[r] = t[r];
  return e;
}
function Ds(t) {
  return t && typeof t == "object" || Cy(t);
}
function By(t, e) {
  return Object.prototype.hasOwnProperty.call(t, e);
}
var Fy = _c, Ly = mc;
function Go(t, e) {
  return new RegExp(Go.create(t, e));
}
Go.create = function(t, e) {
  if (typeof t != "string")
    throw new TypeError("expected a string");
  var r = Fy({}, e);
  r.contains === !0 && (r.strictNegate = !1);
  var n = r.strictOpen !== !1 ? "^" : "", i = r.strictClose !== !1 ? "$" : "", o = r.endChar ? r.endChar : "+", s = t;
  r.strictNegate === !1 ? s = "(?:(?!(?:" + t + ")).)" + o : s = "(?:(?!^(?:" + t + ")$).)" + o;
  var l = n + s + i;
  if (r.safe === !0 && Ly(l) === !1)
    throw new Error("potentially unsafe regular expression: " + l);
  return l;
};
var Hy = Go, Dy = mc, lr = Ty, Ny = _c, Wy = Hy, Ns = 1024 * 64, mo = {};
dc.exports = function(t, e) {
  return Array.isArray(t) ? vo(t.join("|"), e) : vo(t, e);
};
function vo(t, e) {
  if (t instanceof RegExp)
    return t;
  if (typeof t != "string")
    throw new TypeError("expected a string");
  if (t.length > Ns)
    throw new Error("expected pattern to be less than " + Ns + " characters");
  var r = t;
  if ((!e || e && e.cache !== !1) && (r = Gy(t, e), mo.hasOwnProperty(r)))
    return mo[r];
  var n = Ny({}, e);
  n.contains === !0 && (n.negate === !0 ? n.strictNegate = !1 : n.strict = !1), n.strict === !1 && (n.strictOpen = !1, n.strictClose = !1);
  var i = n.strictOpen !== !1 ? "^" : "", o = n.strictClose !== !1 ? "$" : "", s = n.flags || "", l;
  n.nocase === !0 && !/i/.test(s) && (s += "i");
  try {
    (n.negate || typeof n.strictNegate == "boolean") && (t = Wy.create(t, n));
    var u = i + "(?:" + t + ")" + o;
    if (l = new RegExp(u, s), n.safe === !0 && Dy(l) === !1)
      throw new Error("potentially unsafe regular expression: " + l.source);
  } catch (c) {
    if (n.strictErrors === !0 || n.safe === !0)
      throw c.key = r, c.pattern = t, c.originalOptions = e, c.createdOptions = n, c;
    try {
      l = new RegExp("^" + t.replace(/(\W)/g, "\\$1") + "$");
    } catch {
      l = /.^/;
    }
  }
  return n.cache !== !1 && Uy(l, r, t, n), l;
}
function Uy(t, e, r, n) {
  lr(t, "cached", !0), lr(t, "pattern", r), lr(t, "options", n), lr(t, "key", e), mo[e] = t;
}
function Gy(t, e) {
  if (!e)
    return t;
  var r = t;
  for (var n in e)
    e.hasOwnProperty(n) && (r += ";" + n + "=" + String(e[n]));
  return r;
}
dc.exports.makeRe = vo;
var qy = {};
(function(t) {
  (function() {
    var e = {
      not_string: /[^s]/,
      not_bool: /[^t]/,
      not_type: /[^T]/,
      not_primitive: /[^v]/,
      number: /[diefg]/,
      numeric_arg: /[bcdiefguxX]/,
      json: /[j]/,
      not_json: /[^j]/,
      text: /^[^\x25]+/,
      modulo: /^\x25{2}/,
      placeholder: /^\x25(?:([1-9]\d*)\$|\(([^)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-gijostTuvxX])/,
      key: /^([a-z_][a-z_\d]*)/i,
      key_access: /^\.([a-z_][a-z_\d]*)/i,
      index_access: /^\[(\d+)\]/,
      sign: /^[+-]/
    };
    function r(l) {
      return i(s(l), arguments);
    }
    function n(l, u) {
      return r.apply(null, [l].concat(u || []));
    }
    function i(l, u) {
      var c = 1, f = l.length, p, y = "", g, m, b, j, $, v, O, S;
      for (g = 0; g < f; g++)
        if (typeof l[g] == "string")
          y += l[g];
        else if (typeof l[g] == "object") {
          if (b = l[g], b.keys)
            for (p = u[c], m = 0; m < b.keys.length; m++) {
              if (p == null)
                throw new Error(r('[sprintf] Cannot access property "%s" of undefined value "%s"', b.keys[m], b.keys[m - 1]));
              p = p[b.keys[m]];
            }
          else
            b.param_no ? p = u[b.param_no] : p = u[c++];
          if (e.not_type.test(b.type) && e.not_primitive.test(b.type) && p instanceof Function && (p = p()), e.numeric_arg.test(b.type) && typeof p != "number" && isNaN(p))
            throw new TypeError(r("[sprintf] expecting number but found %T", p));
          switch (e.number.test(b.type) && (O = p >= 0), b.type) {
            case "b":
              p = parseInt(p, 10).toString(2);
              break;
            case "c":
              p = String.fromCharCode(parseInt(p, 10));
              break;
            case "d":
            case "i":
              p = parseInt(p, 10);
              break;
            case "j":
              p = JSON.stringify(p, null, b.width ? parseInt(b.width) : 0);
              break;
            case "e":
              p = b.precision ? parseFloat(p).toExponential(b.precision) : parseFloat(p).toExponential();
              break;
            case "f":
              p = b.precision ? parseFloat(p).toFixed(b.precision) : parseFloat(p);
              break;
            case "g":
              p = b.precision ? String(Number(p.toPrecision(b.precision))) : parseFloat(p);
              break;
            case "o":
              p = (parseInt(p, 10) >>> 0).toString(8);
              break;
            case "s":
              p = String(p), p = b.precision ? p.substring(0, b.precision) : p;
              break;
            case "t":
              p = String(!!p), p = b.precision ? p.substring(0, b.precision) : p;
              break;
            case "T":
              p = Object.prototype.toString.call(p).slice(8, -1).toLowerCase(), p = b.precision ? p.substring(0, b.precision) : p;
              break;
            case "u":
              p = parseInt(p, 10) >>> 0;
              break;
            case "v":
              p = p.valueOf(), p = b.precision ? p.substring(0, b.precision) : p;
              break;
            case "x":
              p = (parseInt(p, 10) >>> 0).toString(16);
              break;
            case "X":
              p = (parseInt(p, 10) >>> 0).toString(16).toUpperCase();
              break;
          }
          e.json.test(b.type) ? y += p : (e.number.test(b.type) && (!O || b.sign) ? (S = O ? "+" : "-", p = p.toString().replace(e.sign, "")) : S = "", $ = b.pad_char ? b.pad_char === "0" ? "0" : b.pad_char.charAt(1) : " ", v = b.width - (S + p).length, j = b.width && v > 0 ? $.repeat(v) : "", y += b.align ? S + p + j : $ === "0" ? S + j + p : j + S + p);
        }
      return y;
    }
    var o = /* @__PURE__ */ Object.create(null);
    function s(l) {
      if (o[l])
        return o[l];
      for (var u = l, c, f = [], p = 0; u; ) {
        if ((c = e.text.exec(u)) !== null)
          f.push(c[0]);
        else if ((c = e.modulo.exec(u)) !== null)
          f.push("%");
        else if ((c = e.placeholder.exec(u)) !== null) {
          if (c[2]) {
            p |= 1;
            var y = [], g = c[2], m = [];
            if ((m = e.key.exec(g)) !== null)
              for (y.push(m[1]); (g = g.substring(m[0].length)) !== ""; )
                if ((m = e.key_access.exec(g)) !== null)
                  y.push(m[1]);
                else if ((m = e.index_access.exec(g)) !== null)
                  y.push(m[1]);
                else
                  throw new SyntaxError("[sprintf] failed to parse named argument key");
            else
              throw new SyntaxError("[sprintf] failed to parse named argument key");
            c[2] = y;
          } else
            p |= 2;
          if (p === 3)
            throw new Error("[sprintf] mixing positional and named placeholders is not (yet) supported");
          f.push(
            {
              placeholder: c[0],
              param_no: c[1],
              keys: c[2],
              sign: c[3],
              pad_char: c[4],
              align: c[5],
              width: c[6],
              precision: c[7],
              type: c[8]
            }
          );
        } else
          throw new SyntaxError("[sprintf] unexpected placeholder");
        u = u.substring(c[0].length);
      }
      return o[l] = f;
    }
    t.sprintf = r, t.vsprintf = n, typeof window < "u" && (window.sprintf = r, window.vsprintf = n);
  })();
})(qy);
function Ws(t) {
  return t.charAt(0).toUpperCase() + t.slice(1);
}
var Ky = function(t, e) {
  if (typeof t != "string")
    throw new TypeError("Expected a string");
  for (var r = String(t), n = "", i = e ? !!e.extended : !1, o = e ? !!e.globstar : !1, s = !1, l = e && typeof e.flags == "string" ? e.flags : "", u, c = 0, f = r.length; c < f; c++)
    switch (u = r[c], u) {
      case "/":
      case "$":
      case "^":
      case "+":
      case ".":
      case "(":
      case ")":
      case "=":
      case "!":
      case "|":
        n += "\\" + u;
        break;
      case "?":
        if (i) {
          n += ".";
          break;
        }
      case "[":
      case "]":
        if (i) {
          n += u;
          break;
        }
      case "{":
        if (i) {
          s = !0, n += "(";
          break;
        }
      case "}":
        if (i) {
          s = !1, n += ")";
          break;
        }
      case ",":
        if (s) {
          n += "|";
          break;
        }
        n += "\\" + u;
        break;
      case "*":
        for (var p = r[c - 1], y = 1; r[c + 1] === "*"; )
          y++, c++;
        var g = r[c + 1];
        if (!o)
          n += ".*";
        else {
          var m = y > 1 && (p === "/" || p === void 0) && (g === "/" || g === void 0);
          m ? (n += "((?:[^/]*(?:/|$))*)", c++) : n += "([^/]*)";
        }
        break;
      default:
        n += u;
    }
  return (!l || !~l.indexOf("g")) && (n = "^" + n + "$"), new RegExp(n, l);
};
const zy = /* @__PURE__ */ We(Ky);
var Gt = globalThis && globalThis.__awaiter || function(t, e, r, n) {
  function i(o) {
    return o instanceof r ? o : new r(function(s) {
      s(o);
    });
  }
  return new (r || (r = Promise))(function(o, s) {
    function l(f) {
      try {
        c(n.next(f));
      } catch (p) {
        s(p);
      }
    }
    function u(f) {
      try {
        c(n.throw(f));
      } catch (p) {
        s(p);
      }
    }
    function c(f) {
      f.done ? o(f.value) : i(f.value).then(l, u);
    }
    c((n = n.apply(t, e || [])).next());
  });
};
let Sc = class Ie extends ht {
  static get global() {
    return Ie._globalInstance || (Ie._globalInstance = new Ie({
      metas: {
        id: "sugarEventSPromise"
      }
    })), Ie._globalInstance;
  }
  /**
   * @name                  pipe
   * @type                  Function
   * @static
   *
   * This static function allows you to redirect some SEventEmitter "events" to another SEventEmitter instance
   * with the ability to process the linked value before emiting it on the destination SEventEmitter.
   *
   * @param         {SEventEmitter}      sourceSEventEmitter        The source SEventEmitter instance on which to listen for "events"
   * @param         {SEventEmitter}      destSEventEmitter          The destination SEventEmitter instance on which to emit the listened "events"
   * @param         {Object}        [settings={}]         An object of settings to configure your pipe process
   * - stacks (*) {String}: Specify which stacks you want to pipe. By default it's all using the "*" character
   * - processor (null) {Function}: Specify a function to apply on the emited value before emiting it on the dest SEventEmitter. Take as arguments the value itself and the stack name. Need to return a new value
   * - filter (null) {Function}: Specify a function to filter the "events". It will take as parameter the emited value and the metas object. You must return true or false depending if you want to pipe the particular event or not
   *
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  static pipe(e, r, n) {
    const i = Object.assign({ events: "*", overrideEmitter: !1, processor: void 0, exclude: ["finally", "resolve", "reject", "cancel", "catch"], filter: void 0 }, n ?? {});
    if (!e || !e.on || typeof e.on != "function")
      return e;
    e.on(i.events || "*", (o, s) => Gt(this, void 0, void 0, function* () {
      var l, u, c, f, p, y, g;
      if (!(!s || !o) && (s.id = (c = (l = s.id) !== null && l !== void 0 ? l : (u = s.emitter.metas) === null || u === void 0 ? void 0 : u.id) !== null && c !== void 0 ? c : Kt(), s.color = (y = (f = s.color) !== null && f !== void 0 ? f : (p = s.emitter.metas) === null || p === void 0 ? void 0 : p.color) !== null && y !== void 0 ? y : Rd(s.id), !(i.exclude && i.exclude.indexOf(s.event) !== -1) && !(i.filter && !i.filter(o, s)))) {
        if (i.processor) {
          const m = i.processor(o, s);
          Array.isArray(m) && m.length === 2 ? (o = m[0], s = m[1]) : typeof m == "object" && m.value !== void 0 && m.metas !== void 0 ? (o = m.value, s = m.metas) : o = m;
        }
        if (s && s.event) {
          s.event, s.emitter || (s.emitter = this);
          const m = Object.assign(Object.assign({}, s), { level: ((g = s == null ? void 0 : s.level) !== null && g !== void 0 ? g : 0) + 1 });
          r instanceof Ie && (!i.overrideEmitter && r.settings.bind ? m.emitter = r.settings.bind : i.overrideEmitter === !0 && (m.emitter = r)), Do() && r === process && qd() ? (o.value && o.value instanceof Error && (o.value = Ne(o.value)), this._ipcInstance._pipedEventsUids || (this._ipcInstance._pipedEventsUids = []), this._ipcInstance && !this._ipcInstance._pipedEventsUids.includes(m.uid) && (this._ipcInstance._pipedEventsUids.push(m.uid), this._ipcInstance.of[`ipc-${process.ppid}`].emit("message", {
            value: o,
            metas: m
          }))) : r.emit(s.event, o, m);
        }
      }
    }));
  }
  /**
   * @name                  constructor
   * @type                  Function
   *
   * Constructor
   *
   * @param         {Object}            [settings={}]     An object of settings for this particular SEventEmitter instance. Here's the available settings:
   *
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  constructor(e) {
    super(W({
      asyncStart: !1,
      bufferTimeout: 1e3,
      defaults: {},
      castByEvent: {
        log: I
      },
      bind: void 0
    }, e ?? {})), this._asyncStarted = !1, this._buffer = [], this._eventsStacks = {}, this._onStackById = {};
  }
  /**
   * @name          bind
   * @type      Function
   *
   * This method allows you to bind another object as the emitter.
   *
   * @since       2.0.0
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  bind(e) {
    return this.settings.bind = e, this;
  }
  /**
   * @name          pipe
   * @type          Function
   *
   * This method take an SEventEmitter instance as parameter on which to pipe the
   * specified stacks using the settings.stacks property.
   * It is exactly the same as the static ```pipe``` method but for this
   * particular instance.
   *
   * @param       {SEventEmitter}      input      The input promise on which to pipe the events in this one
   * @param       {ISEventEmitterPipeSettings}      [settings={}]    An object ob settings to configure the pipe process:
   *
   * @since       2.0.0
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  pipe(e, r) {
    return Ie.pipe(e, this, r), e;
  }
  /**
   * @name          pipeErrors
   * @type          Function
   *
   * This is the exact same as the original ```pipe``` method. It's just pipe only the errors.
   *
   * @param       {SEventEmitter}      input      The input promise on which to pipe the events in this one
   * @param       {ISEventEmitterPipeSettings}      [settings={}]    An object ob settings to configure the pipe process:
   *
   * @since       2.0.0
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  pipeErrors(e, r) {
    return Ie.pipe(e, this, Object.assign(Object.assign({}, r), { events: "error" })), e;
  }
  /**
   * @name      pipeFrom
   * @type      Function
   *
   * This is the exacte same as the original ```pipe``` method. It's just an aliasw.
   *
   * @since     2.0.0
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  pipeFrom(e, r) {
    return this.pipe(e, r);
  }
  /**
   * @name          pipe
   * @type          Function
   *
   * This method is the same as the ```pipe```and ```pipeFrom``` one but it's just act as the inverse.
   * Here you specify whenre you want to pipe this instance events and not from which you want to pipe them here...
   *
   * @param       {SEventEmitter}      dest      The destination event emitter on which to pipe the events from this one
   * @param       {ISEventEmitterPipeSettings}      [settings={}]    An object ob settings to configure the pipe process:
   *
   * @since       2.0.0
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  pipeTo(e, r) {
    return Ie.pipe(this, e, r), this;
  }
  /**
   * @name          start
   * @type          Function
   *
   * This method has to be called when you want to start the event emissions.
   * This is usefull only if you set the setting ```asyncStart``` to true.
   * Untill you call this method, all the emitted events
   * are store in memory and emitted after.
   *
   * @since         2.0.0
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  start() {
    this.settings.asyncStart && (this._asyncStarted = !0, this._processBuffer());
  }
  /**
   * @name          emit
   * @type          Function
   * @async
   *
   * This is the method that allows you to emit the callbacks like "catch", "finally", etc... without actually resolving the Promise itself
   *
   * @param         {String|Array}        event            The event that you want to emit. You can emit multiple events by passing an Array like ['catch','finally'], or a string like "catch,finally"
   * @param         {Mixed}         value         The value you want to pass to the callback
   * @return        {ISEventEmitter}                       The SEventEmitter instance to maintain chainability
   *
   * @example         js
   *
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  _createMetas(e, r = {}) {
    var n, i, o;
    return W({
      event: e,
      name: e,
      emitter: (i = (n = this.settings.bind) !== null && n !== void 0 ? n : r == null ? void 0 : r.emitter) !== null && i !== void 0 ? i : this,
      originalEmitter: (o = r == null ? void 0 : r.originalEmitter) !== null && o !== void 0 ? o : this,
      time: Date.now(),
      level: 0
    }, r ?? {});
  }
  emit(e, r, n) {
    return new Promise((i, o) => Gt(this, void 0, void 0, function* () {
      let s = this._createMetas(e, n);
      const l = !s.level;
      ye(r) && Object.keys(this.settings.defaults).forEach((c) => {
        var f;
        const p = c.split(",").map((y) => y.trim());
        p.indexOf(e) === -1 && p.indexOf("*") === -1 || (r = W(r, (f = this.settings.defaults) === null || f === void 0 ? void 0 : f[c]));
      });
      const u = this.settings.castByEvent[e];
      if (u && Yt(u) && !(r instanceof u) && !r._sEventEmitterPreprocessed && (r = new u(r)), e === "ask" && l && (s.askId = Kt()), !this._asyncStarted && this.settings.asyncStart) {
        this._buffer.push({
          event: e,
          value: r,
          metas: s,
          resolve: i,
          reject: o
        });
        return;
      }
      this._emit({
        event: e,
        value: r,
        metas: s,
        resolve: i,
        reject: o
      });
    }));
  }
  _emit(e) {
    return Gt(this, void 0, void 0, function* () {
      if (e.metas.uid = Kt(), e.event === "ask")
        this.constructor.global.on(`answer.${e.metas.askId}`, (r, n) => {
          e.resolve(r);
        }), this._emitEvents(e.event, e.value, Object.assign({}, e.metas));
      else {
        const r = yield this._emitEvents(e.event, e.value, Object.assign({}, e.metas));
        e.resolve(r);
      }
    });
  }
  /**
   * @name            _registerNewEventsStacks
   * @type            Function
   * @private
   *
   * This methods allows you to register new stacks.
   * A new stack can be called then using the "on('stackName', ...)" method,
   * or directly on the SEventEmitter instance like so "myPromise.stackName(...)".
   *
   * @param       {String|Array}      stacks        The stack(s) name(s) you want to register. Can be an Array or a comma separated string
   * @return      {SEventEmitter}                        The SEventEmitter instance
   *
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  _registerNewEventsStacks(e) {
    typeof e == "string" && (e = e.split(",").map((r) => r.trim())), e.forEach((r) => {
      this._eventsStacks[r] || (this._eventsStacks[r] = {
        buffer: [],
        callStack: []
      });
    });
  }
  /**
   * @name            _registerCallbackInEventStack
   * @type            Function
   *
   * This function take as argument a stack array and register into it the passed callback function
   *
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  _registerCallbackInEventStack(e, r, n = {}) {
    n = Object.assign({ callNumber: void 0, filter: void 0, processor: void 0, id: void 0 }, n), n.id && (this._onStackById[n.id] || (this._onStackById[n.id] = []), this._onStackById[n.id].push({
      event: e,
      callback: r,
      settings: n
    })), this._eventsStacks[e] || this._registerNewEventsStacks(e);
    const i = this._eventsStacks[e];
    let o = n.callNumber;
    return o === void 0 && (o = -1), typeof r == "function" && i.callStack.push({
      callback: r,
      callNumber: o,
      filter: n.filter,
      processor: n.processor,
      called: 0
    }), this._processBuffer(), this;
  }
  /**
   * @name          _processBuffer
   * @type          Function
   * @private
   *
   * This method simply take care of empty the buffer by emitting
   * all the buffered events
   *
   * @since         2.0.0
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  _processBuffer() {
    this._buffer.length > 0 && setTimeout(() => {
      this._buffer = this._buffer.filter((e) => (this._emit(e), !1));
    }, this.settings.bufferTimeout);
  }
  /**
   * @name            _emitEventStack
   * @type            Function
   * @private
   * @async
   *
   * This function take an Array Stack as parameter and execute it to return the result
   *
   * @param         {String}             event             The event to execute
   * @param         {Mixed}             initialValue      The initial value to pass to the first stack callback
   * @return        {Promise}                             A promise resolved with the stack result
   *
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  _emitEventStack(e, r, n) {
    return Gt(this, void 0, void 0, function* () {
      let i = r;
      if (!this._eventsStacks || Object.keys(this._eventsStacks).length === 0)
        return i;
      this._eventsStacks[e] || this._registerNewEventsStacks(e);
      let o = [];
      const s = this._eventsStacks[e];
      s && s.callStack && (o = [
        ...o,
        ...s.callStack
      ]), Object.keys(this._eventsStacks).forEach((l) => {
        if (l === e)
          return i;
        zy(l).test(e) && this._eventsStacks[l] !== void 0 && (o = [
          ...o,
          ...this._eventsStacks[l].callStack
        ]);
      }), o.map((l) => l.called++), o = o.filter((l) => l.callNumber === -1 || l.called <= l.callNumber);
      for (let l = 0; l < o.length; l++) {
        const u = o[l];
        if (!u.callback)
          return i;
        if (u.filter && !u.filter(i, n))
          continue;
        if (u.processor) {
          const f = u.processor(i, n);
          Array.isArray(f) && f.length === 2 ? (i = f[0], n = f[1]) : typeof f == "object" && f.value !== void 0 && f.metas !== void 0 ? (i = f.value, n = f.metas) : i = f;
        }
        const c = yield u.callback(i, n, n != null && n.askId ? (f) => {
          this.constructor.global.emit(`answer.${n.askId}`, f, n);
        } : void 0);
        c !== void 0 && (i = c);
      }
      return i;
    });
  }
  /**
   * @name          _emitEvents
   * @type          Function
   * @private
   * @async
   *
   * This function take as parameters a list of events to emit like an Array ['catch','finnaly'], or a string like so "catch,finally", and as second parameter,
   * the initial value to pass to the first callback of the joined stacks...
   *
   * @param         {Array|String}            stacks          The stacks to emit
   * @param         {Mixed}                   initialValue    The initial value to pass to the first stack callback
   * @return        {Promise}                                 A promise that will be resolved with the stacks resulting value
   *
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  _emitEvents(e, r, n) {
    return new Promise((i, o) => Gt(this, void 0, void 0, function* () {
      if (!e)
        return this;
      typeof e == "string" && (e = e.split(",").map((l) => l.trim()));
      let s = r;
      for (let l = 0; l < e.length; l++) {
        const u = yield this._emitEventStack(e[l], s, n);
        u !== void 0 && (s = u);
      }
      i(s);
    }));
  }
  /**
   * @name                on
   * @type                Function
   *
   * This method allows the SEventEmitter user to register a function that will be called every time the "resolve" one is called in the executor
   * The context of the callback will be the SEventEmitter instance itself so you can call all the methods available like "resolve", "release", "on", etc using
   * the "this.resolve('something')" statusment. In an arrow function like "(value) => { ... }", the "this" keyword will be bound to the current context where you define
   * your function. You can access to the SEventEmitter instance through the last parameter like so "(value, SEventEmitterInstance) => { ... }".
   *
   * @param           {String|Array}      stacks        The stacks in which you want register your callback. Either an Array like ['catch','finally'], or a String like "catch,finally"
   * @param           {Function}        callback        The callback function to register
   * @return          {SEventEmitter}                  The SEventEmitter instance to maintain chainability
   *
   * @example         js
   *
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  on(e, r, n) {
    const i = W({
      filter: void 0,
      processor: void 0,
      id: void 0
    }, n);
    return typeof e == "string" && (e = e.split(",").map((o) => o.trim())), e.forEach((o) => {
      const s = o.split(":");
      let l = -1;
      s.length === 2 && (o = s[0], l = parseInt(s[1])), this._registerCallbackInEventStack(o, r, {
        callNumber: l,
        filter: i.filter,
        processor: i.processor,
        id: i.id
      });
    }), this;
  }
  /**
   * @name            off
   * @type            Function
   *
   * This method allows you to unsubscribe to an event by passing the event name an optionally the callback function.
   * If you don't pass the callback function, all the subscribed events the same as the passed one will be unsubscribed.
   *
   * @param       {String}        event        The event name to unsubscribe to. It can be also an "on" method passed setting "id". In this case, it will unsubscribe all the created subscription(s) in this particular "on" call.
   * @param       {Function}    [callback=null]     The callback function you want to unsubscribe
   * @return      {SEventEmitter}                The SEventEmitter instance to maintain chainability
   *
   * @since     2.0.0
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  off(e, r) {
    if (!r)
      return this._eventsStacks[e] ? delete this._eventsStacks[e] : this._onStackById[e] && (this._onStackById[e].forEach((i) => {
        this.off(i.event, i.callback);
      }), delete this._onStackById[e]), this;
    const n = this._eventsStacks[e];
    return n ? (n.callStack = n.callStack.filter((i) => i.callback !== r), this._eventsStacks[e] = n, this) : this;
  }
  /**
   * @name                      destroy
   * @type                      Function
   *
   * Destroying the SEventEmitter instance by unregister all the callbacks, etc...
   *
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  destroy() {
    this._eventsStacks = {};
  }
};
Sc.usableAsMixin = !0;
class Vy extends Sc {
}
var tr = {}, qo = {};
const Yy = "clone-class", Xy = "0.6.20", Jy = "Clone an ES6 Class as Another Class Name for Isolating Class Static Properties.", Zy = "src/index.js", Qy = "src/index.d.ts", eh = {
  clean: "shx rm -fr dist/*",
  dist: "npm run clean && tsc && shx cp {README.md,package.json} dist/",
  pack: "npm pack dist/",
  example: "ts-node examples/example.ts",
  lint: "npm run lint:ts",
  "lint:ts": "tslint --project tsconfig.json && tsc --noEmit",
  test: "npm run test:unit",
  "test:unit": 'blue-tape -r ts-node/register "src/**/*.spec.ts" "tests/**/*.spec.ts"',
  "test:pack": "bash -x scripts/npm-pack-testing.sh"
}, th = {
  type: "git",
  url: "git+https://github.com/huan/clone-class.git"
}, rh = [
  "clone",
  "class",
  "es6",
  "static"
], nh = "Huan LI <zixia@zixia.net>", ih = "Apache-2.0", oh = {
  url: "https://github.com/huan/clone-class/issues"
}, sh = "https://github.com/huan/clone-class#readme", ah = {
  "@types/blue-tape": "^0.1.31",
  "@types/node": "^10.0.3",
  "@types/semver": "^5.5.0",
  "blue-tape": "^1.0.0",
  "git-scripts": "^0.2.1",
  semver: "^5.5.0",
  shx: "^0.3.0",
  "ts-node": "^7.0.0",
  tslint: "^5.9.1",
  typescript: "^3.0.3"
}, ch = {
  scripts: {
    "pre-push": "./scripts/pre-push.sh"
  }
}, uh = {
  access: "public",
  tag: "latest"
}, lh = {
  name: Yy,
  version: Xy,
  description: Jy,
  main: Zy,
  typings: Qy,
  scripts: eh,
  repository: th,
  keywords: rh,
  author: nh,
  license: ih,
  bugs: oh,
  homepage: sh,
  devDependencies: ah,
  git: ch,
  publishConfig: uh
};
Object.defineProperty(qo, "__esModule", { value: !0 });
qo.VERSION = lh.version;
var Dr = {};
Object.defineProperty(Dr, "__esModule", { value: !0 });
function Oc(t, e) {
  return t.constructor;
}
Dr.instanceToClass = Oc;
Dr.default = Oc;
var Nr = {};
Object.defineProperty(Nr, "__esModule", { value: !0 });
function Ec(t) {
  for (const r in t)
    if (!/^[A-Z]/.test(r) && typeof t[r] == "object")
      throw new Error("static property initialized to an object with defination is not supported with cloneClass.");
  class e extends t {
    constructor(...n) {
      super(...n);
    }
  }
  return Reflect.defineProperty(e, "name", {
    value: t.name
  }), e;
}
Nr.cloneClass = Ec;
Nr.default = Ec;
Object.defineProperty(tr, "__esModule", { value: !0 });
var fh = qo;
tr.VERSION = fh.VERSION;
var ph = Dr;
tr.instanceToClass = ph.instanceToClass;
const Tc = Nr;
tr.cloneClass = Tc.cloneClass;
tr.default = Tc.cloneClass;
const dh = function(t, e = {}) {
  const r = {};
  Yt(t) || (t = t.constructor), e.includeBaseClass === !0 && (r[t.name] = t);
  let n = t;
  for (; n; ) {
    const i = Object.getPrototypeOf(n);
    if (i && i !== Object && i.name)
      r[i.name] = i, n = i;
    else
      break;
  }
  return r;
};
function yh(t) {
  let e = [], r = t;
  do {
    const n = Object.getOwnPropertyNames(r);
    n.indexOf("__defineGetter__") === -1 && (e = e.concat(n));
  } while (r = Object.getPrototypeOf(r));
  return e.sort().filter(function(n, i, o) {
    if (n != o[i + 1] && typeof t[n] == "function")
      return !0;
  });
}
function hh(t = 0) {
  return new Promise((e) => {
    setTimeout(() => {
      e();
    }, t);
  });
}
const Us = function(e, r = {}) {
  r = Object.assign({ during: -1 }, r);
  let n = r.during || -1;
  try {
    const i = Proxy.revocable(e, {
      get(o, s, l) {
        return s === "then" ? o : (n > 0 ? n-- : n === 0 && i.revoke(), Reflect.get(...arguments));
      }
    });
    return i.proxy.restorePromiseBehavior = () => (i.revoke(), e), i.proxy;
  } catch {
    return e;
  }
};
var at = globalThis && globalThis.__awaiter || function(t, e, r, n) {
  function i(o) {
    return o instanceof r ? o : new r(function(s) {
      s(o);
    });
  }
  return new (r || (r = Promise))(function(o, s) {
    function l(f) {
      try {
        c(n.next(f));
      } catch (p) {
        s(p);
      }
    }
    function u(f) {
      try {
        c(n.throw(f));
      } catch (p) {
        s(p);
      }
    }
    function c(f) {
      f.done ? o(f.value) : i(f.value).then(l, u);
    }
    c((n = n.apply(t, e || [])).next());
  });
};
class Xt extends ht.extends(Promise) {
  /**
   * @name        queue
   * @type        Function
   * @static
   * @async
   *
   * This static method allows you to pass an array of promises that will be executed one after the other.
   * It will call the "callback" function if specified with the resolved promise as argument.
   *
   * @param       {Promise[]}        promises        The array of promises to execute one after the other
   * @param       {Function}      [before=null]        A callback to call before each promises executions
   * @param       {Function}      [after=null]        A callback to call after each promises executions
   * @return      {SPromise}                            The promise that will be resolved once all promises are resolved
   *
   * @since       2.0.0
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  static queue(e, r, n) {
    return new Xt(({ resolve: i, reject: o, pipe: s }) => at(this, void 0, void 0, function* () {
      const l = {};
      function u() {
        return at(this, void 0, void 0, function* () {
          const c = Object.keys(e)[0];
          let f = e[c];
          typeof f == "function" && (f = f());
          try {
            delete e[c], r && (yield r(c, f)), f instanceof Xt && s(f);
            let p = yield f;
            if (l[c] = p, n) {
              let y = yield n(c, result);
              y !== void 0 && (result[c] = y);
            }
            Object.keys(e).length ? u() : i(l);
          } catch {
            o(f);
          }
        });
      }
      u();
    }));
  }
  /**
   * @name        treatAsValue
   * @type        Function
   * @static
   *
   * This function allows you to wrap a promise in a ```resolve``` call to prevent
   * this promise to be treated as a "chaining" promise but to be treated as
   * normal value passed in the resolve call.
   *
   * @param           {Promise}          promise          The promise to treat as a simple value
   * @return          {ITreatAsValueProxy}                             A proxy of this promise that will act just like a normal promise once getted by the "await" statement
   *
   * @since      2.0.0
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  static treatAsValue(e, r = {}) {
    return Us(e, r);
  }
  /**
   * @name          promiseSettings
   * @type          ISPromiseSettings
   * @get
   *
   * Access to the spromise settings
   *
   * @since       2.0.0
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  get promiseSettings() {
    var e;
    return (e = this.settings.promise) !== null && e !== void 0 ? e : this.settings;
  }
  /**
   * @name                  constructor
   * @type                  Function
   *
   * Constructor
   *
   * @param         {Function}          executor          The executor function that will receive the resolve and reject ones...
   * @param         {Object}            [settings={}]     An object of settings for this particular SPromise instance. Here's the available settings:
   *
   * @example       js
   * const promise = new SPromise(({ resolve, reject, emit }) => {
   *    // do something...
   * }).then(value => {
   *    // do something...
   * }).finally(value => {
   *    // do something...
   * });
   *
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  constructor(e = {}, r) {
    var n;
    let i, o = {};
    if (super(W({
      promise: {
        treatCancelAs: "resolve",
        destroyTimeout: 1,
        preventRejectOnThrow: !1,
        emitLogErrorEventOnThrow: !0,
        resolveAtResolveEvent: !1,
        rejectAtRejectEvent: !1,
        resolveProxies: [],
        rejectProxies: []
      }
    }, typeof e == "object" ? e : {}, r ?? {}), (s, l) => {
      o.resolve = s, new Promise((u, c) => {
        o.reject = (...f) => {
          c(...f), this.promiseSettings.preventRejectOnThrow ? s(...f) : l(...f);
        };
      }).catch((u) => {
        this.emit("catch", u);
      });
    }), this._promiseState = "pending", this._eventEmitter = new Vy(W({
      metas: Object.assign({}, this.metas)
    }, (n = this.settings.eventEmitter) !== null && n !== void 0 ? n : {})), this.expose(this._eventEmitter, {
      as: "eventEmitter",
      props: [
        "on",
        "off",
        "emit",
        "pipe",
        "pipeErrors",
        "pipeFrom",
        "pipeTo"
      ]
    }), this.bind = this._eventEmitter.bind.bind(this), this._resolvers = o, this.promiseSettings.destroyTimeout !== -1 && this.on("finally", (s, l) => {
      setTimeout(() => {
        this.destroy();
      }, this.promiseSettings.destroyTimeout);
    }), i = typeof e == "function" ? e : null, i) {
      const s = {};
      yh(this).forEach((l) => {
        l.slice(0, 1) !== "_" && (s[l] = this[l].bind(this));
      }), at(this, void 0, void 0, function* () {
        yield hh(0);
        try {
          yield i(s);
        } catch (l) {
          this.promiseSettings.emitLogErrorEventOnThrow && this.emit("log", {
            type: I.TYPE_ERROR,
            value: l
          }), this.reject(l);
        }
      });
    }
    this.promiseSettings.resolveAtResolveEvent && this.on("resolve", (s, l) => {
      this.resolve(s);
    }), this.promiseSettings.rejectAtRejectEvent && this.on("reject", (s, l) => {
      this.reject(s);
    });
  }
  // you can also use Symbol.species in order to
  // return a Promise for then/catch/finally
  static get [Symbol.species]() {
    return Promise;
  }
  // Promise overrides his Symbol.toStringTag
  get [Symbol.toStringTag]() {
    return "SPromise";
  }
  /**
   * @name                    promiseState
   * @type                    String
   * @get
   *
   * Access the promise state. Can be one of these:
   * - pending: When the promise is waiting for resolution or rejection
   * - resolved: When the promise has been resolved
   * - rejected: When the promise has been rejected
   * - canceled: When the promise has been canceled
   * - destroyed: When the promise has been destroyed
   *
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  get promiseState() {
    return this._promiseState;
  }
  /**
   * @name                  treatAsValue
   * @type                  Function
   *
   * This method wrap the promise into a revocable proxy to allow
   * passing this Promise to methods like ```then```, etc... and make
   * this promise treated as a value and not as a chained promise.
   * Once you have done with this behavior, you just have to call
   * the ```restorePromiseBehavior``` on the returned proxy and
   * the default promise behavior will be restored
   *
   * @param         {ITreatAsValueSettings}       [settings={}]     Some settings to configure your custom behavior
   * @return        {ITreatAsValueProxy}                            A custom proxy that you can revoke using the ```restorePromiseBehavior```
   *
   * @since         2.0.0
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  treatAsValue(e = {}) {
    return Us(this, e);
  }
  /**
   * @name             registerProxy
   * @type              Function
   *
   * ALlows you to register a proxy at a certain point of the promise lifecycle like:
   * - resolve: Allows you to edit the value that will be sent to the resolve point
   * - reject: Allows you to edit the value that will be sent to the reject point
   *
   * @since       2.0.0
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  registerProxy(e, r) {
    e.split(",").map((i) => i.trim()).forEach((i) => {
      i === "resolve" ? this.settings.promise.resolveProxies.push(r) : i === "reject" && this.settings.promise.rejectProxies.push(r);
    });
  }
  /**
   * @name                  is
   * @type                  Function
   *
   * Check is the promise is on one of the passed status
   *
   * @param       {String}        status        A comma separated list of status to check
   * @return      {Boolean}                     Return true if the promise is in one of the passed status
   *
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  is(e) {
    return e.split(",").map((n) => n.trim()).indexOf(this._promiseState) !== -1;
  }
  /**
   * @name                  isPending
   * @type                  Function
   *
   * Return back true or false depending on the promise status
   *
   * @return    {Boolean}         true or false depending on the promise status
   *
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  isPending() {
    return this._promiseState === "pending";
  }
  /**
   * @name                  isResolved
   * @type                  Function
   *
   * Return back true or false depending on the promise status
   *
   * @return    {Boolean}         true or false depending on the promise status
   *
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  isResolved() {
    return this._promiseState === "resolved";
  }
  /**
   * @name                  isRejected
   * @type                  Function
   *
   * Return back true or false depending on the promise status
   *
   * @return    {Boolean}         true or false depending on the promise status
   *
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  isRejected() {
    return this._promiseState === "rejected";
  }
  /**
   * @name                  isCanceled
   * @type                  Function
   *
   * Return back true or false depending on the promise status
   *
   * @return    {Boolean}         true or false depending on the promise status
   *
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  isCanceled() {
    return this._promiseState === "canceled";
  }
  /**
   * @name                  isDestroyed
   * @type                  Function
   *
   * Return back true or false depending on the promise status
   *
   * @return    {Boolean}         true or false depending on the promise status
   *
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  isDestroyed() {
    return this._promiseState === "destroyed";
  }
  /**
   * @name          resolve
   * @type          Function
   * @async
   *
   * This is the "resolve" method exposed on the promise itself for convinience
   *
   * @param         {Mixed}         arg       The value that you want to return back from the promise
   * @param       {Array|String}         [stacksOrder='resolve,finally']      This specify in which order have to be called the stacks
   * @return        {Promise}                       A simple promise that will be resolved once the promise has been canceled with the cancel stack result as value
   *
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  resolve(e, r = "resolve,finally") {
    return this._resolve(e, r);
  }
  /**
   * @name          _resolve
   * @type          Function
   * @private
   * @async
   *
   * This is the method that will be called by the promise executor passed resolve function
   *
   * @param       {Mixed}         arg           The argument that the promise user is sendind through the resolve function
   * @param       {Array|String}         [stacksOrder='resolve,finally']      This specify in which order have to be called the stacks
   * @return        {Promise}                       A simple promise that will be resolved once the promise has been canceled with the cancel stack result as value
   *
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  _resolve(e, r = "resolve,finally") {
    return at(this, void 0, void 0, function* () {
      if (this._promiseState === "destroyed")
        return;
      this._promiseState = "resolved";
      const n = r.split(",").map((i) => i.trim());
      for (let i = 0; i < n.length; i++) {
        const o = n[i];
        e = yield this.eventEmitter.emit(o, e);
      }
      for (const i of this.settings.promise.resolveProxies || [])
        e = yield i(e);
      return this._resolvers.resolve(e), e;
    });
  }
  /**
   * @name          reject
   * @type          Function
   * @async
   *
   * This is the "reject" method exposed on the promise itself for convinience
   *
   * @param         {Mixed}         arg       The value that you want to return back from the promise
   * @param       {Array|String}         [stacksOrder='catch,reject,finally']      This specify in which order have to be called the stacks
   * @return        {Promise}      A simple promise that will be resolved once the promise has been canceled with the cancel stack result as value
   *
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  reject(e, r = "catch,reject,finally") {
    return this._reject(e, r);
  }
  /**
   * @name          _reject
   * @type          Function
   * @private
   * @async
   *
   * This is the method that will be called by the promise executor passed reject function
   *
   * @param         {Mixed}         arg       The value that you want to return back from the promise
   * @param       {Array|String}         [stacksOrder='catch,reject,finally']      This specify in which order have to be called the stacks
   * @return        {Promise}                       A simple promise that will be resolved once the promise has been canceled with the cancel stack result as value
   *
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  _reject(e, r = "catch,reject,finally") {
    return at(this, void 0, void 0, function* () {
      if (this._promiseState === "destroyed")
        return;
      this._promiseState = "rejected";
      const n = r.split(",").map((i) => i.trim());
      for (let i = 0; i < n.length; i++) {
        const o = n[i];
        e = yield this.eventEmitter.emit(o, e);
      }
      for (const i of this.settings.promise.rejectProxies || [])
        e = yield i(e);
      return this._resolvers.reject(e), e;
    });
  }
  /**
   * @name          cancel
   * @type          Function
   * @async
   *
   * This is the "cancel" method exposed on the promise itself for convinience
   *
   * @param         {Mixed}         arg       The value that you want to return back from the promise
   * @param       {Array|String}         [stacksOrder='cancel,finally']      This specify in which order have to be called the stacks
   * @return        {Promise}                       A simple promise that will be resolved once the promise has been canceled with the cancel stack result as value
   *
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  cancel(e, r = "cancel,finally") {
    return this._cancel(e, r);
  }
  /**
   * @name            _cancel
   * @type            Function
   * @private
   * @async
   *
   * Cancel the promise execution, destroy the Promise and resolve it with the passed value without calling any callbacks
   *
   * @param         {Mixed}           arg           The argument you want to pass to the cancel callbacks
   * @param       {Array|String}         [stacksOrder='cancel,finally']      This specify in which order have to be called the stacks
   * @return        {Promise}                       A simple promise that will be resolved once the promise has been canceled with the cancel stack result as value
   *
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  _cancel(e, r = "cancel,finally") {
    if (this._promiseState !== "destroyed")
      return new Promise((n, i) => at(this, void 0, void 0, function* () {
        this._promiseState = "canceled";
        const o = r.split(",").map((s) => s.trim());
        for (let s = 0; s < o.length; s++) {
          const l = o[s];
          e = yield this.eventEmitter.emit(l, e);
        }
        this.settings.promise.treatCancelAs === "reject" ? this._resolvers.reject(e) : this._resolvers.resolve(e), n(e);
      }));
  }
  /**
   * @name                catch
   * @type                Function
   *
   * This method allows the SPromise user to register a function that will be called every time the "reject" one is called in the executor
   * The context of the callback will be the SPromise instance itself so you can call all the methods available like "resolve", "catch", etc using
   * the "this.resolve('something')" statusment. In an arrow function like "(value) => { ... }", the "this" keyword will be bound to the current context where you define
   * your function. You can access to the SPromise instance through the last parameter like so "(value, sPromiseInstance) => { ... }".
   *
   * @param           {Number}          [callNumber=-1]     (Optional) How many times you want this callback to be called at max. -1 means unlimited
   * @param           {Function}        callback        The callback function to register
   * @return          {SPromise}                  The SPromise instance to maintain chainability
   *
   * @example         js
   * new SPromise(({ resolve, reject }) => {
   *    // do something...
   *    reject('hello world');
   * }).catch(value => {
   *    // do something with the value that is "hello world"
   * }).catch(1, value => {
   *    // do something that will be executed only once
   * });
   *
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  catch(...e) {
    return super.catch(...e), this.on("catch", ...e);
  }
  /**
   * @name                finally
   * @type                Function
   *
   * This method allows the SPromise user to register a function that will be called every time the "reject" one is called in the executor
   * The context of the callback will be the SPromise instance itself so you can call all the methods available like "resolve", "catch", etc using
   * the "this.resolve('something')" statusment. In an arrow function like "(value) => { ... }", the "this" keyword will be bound to the current context where you define
   * your function. You can access to the SPromise instance through the last parameter like so "(value, sPromiseInstance) => { ... }".
   *
   * @param           {Function}        callback        The callback function to register
   * @return          {SPromise}                  The SPromise instance to maintain chainability
   *
   * @example         js
   * new SPromise(({ resolve, reject, emit }) => {
   *    // do something...
   *    resolve('hello world');
   * }).finally(value => {
   *    // do something with the value that is "hello world"
   * });
   *
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  finally(...e) {
    return this.on("finally", ...e);
  }
  /**
   * @name                      destroy
   * @type                      Function
   *
   * Destroying the SPromise instance by unregister all the callbacks, etc...
   *
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  destroy() {
    this._eventEmitter.destroy(), this._promiseState = "destroyed";
  }
}
globalThis && globalThis.__awaiter;
globalThis && globalThis.__awaiter;
globalThis && globalThis.__awaiter;
var gh = { exports: {} };
(function(t) {
  (function(e) {
    var r = function() {
    }, n = e.requestAnimationFrame || e.webkitRequestAnimationFrame || e.mozRequestAnimationFrame || e.msRequestAnimationFrame || function(f) {
      return setTimeout(f, 16);
    };
    function i() {
      var f = this;
      f.reads = [], f.writes = [], f.raf = n.bind(e);
    }
    i.prototype = {
      constructor: i,
      /**
       * We run this inside a try catch
       * so that if any jobs error, we
       * are able to recover and continue
       * to flush the batch until it's empty.
       *
       * @param {Array} tasks
       */
      runTasks: function(f) {
        for (var p; p = f.shift(); )
          p();
      },
      /**
       * Adds a job to the read batch and
       * schedules a new frame if need be.
       *
       * @param  {Function} fn
       * @param  {Object} ctx the context to be bound to `fn` (optional).
       * @public
       */
      measure: function(f, p) {
        var y = p ? f.bind(p) : f;
        return this.reads.push(y), o(this), y;
      },
      /**
       * Adds a job to the
       * write batch and schedules
       * a new frame if need be.
       *
       * @param  {Function} fn
       * @param  {Object} ctx the context to be bound to `fn` (optional).
       * @public
       */
      mutate: function(f, p) {
        var y = p ? f.bind(p) : f;
        return this.writes.push(y), o(this), y;
      },
      /**
       * Clears a scheduled 'read' or 'write' task.
       *
       * @param {Object} task
       * @return {Boolean} success
       * @public
       */
      clear: function(f) {
        return l(this.reads, f) || l(this.writes, f);
      },
      /**
       * Extend this FastDom with some
       * custom functionality.
       *
       * Because fastdom must *always* be a
       * singleton, we're actually extending
       * the fastdom instance. This means tasks
       * scheduled by an extension still enter
       * fastdom's global task queue.
       *
       * The 'super' instance can be accessed
       * from `this.fastdom`.
       *
       * @example
       *
       * var myFastdom = fastdom.extend({
       *   initialize: function() {
       *     // runs on creation
       *   },
       *
       *   // override a method
       *   measure: function(fn) {
       *     // do extra stuff ...
       *
       *     // then call the original
       *     return this.fastdom.measure(fn);
       *   },
       *
       *   ...
       * });
       *
       * @param  {Object} props  properties to mixin
       * @return {FastDom}
       */
      extend: function(f) {
        if (typeof f != "object")
          throw new Error("expected object");
        var p = Object.create(this);
        return u(p, f), p.fastdom = this, p.initialize && p.initialize(), p;
      },
      // override this with a function
      // to prevent Errors in console
      // when tasks throw
      catch: null
    };
    function o(f) {
      f.scheduled || (f.scheduled = !0, f.raf(s.bind(null, f)));
    }
    function s(f) {
      var p = f.writes, y = f.reads, g;
      try {
        r("flushing reads", y.length), f.runTasks(y), r("flushing writes", p.length), f.runTasks(p);
      } catch (m) {
        g = m;
      }
      if (f.scheduled = !1, (y.length || p.length) && o(f), g)
        if (r("task errored", g.message), f.catch)
          f.catch(g);
        else
          throw g;
    }
    function l(f, p) {
      var y = f.indexOf(p);
      return !!~y && !!f.splice(y, 1);
    }
    function u(f, p) {
      for (var y in p)
        p.hasOwnProperty(y) && (f[y] = p[y]);
    }
    var c = e.fastdom = e.fastdom || new i();
    t.exports = c;
  })(typeof window < "u" ? window : Y);
})(gh);
globalThis && globalThis.__awaiter;
function bh() {
  return typeof process < "u" && process.release && process.release.name === "node";
}
function mh() {
  return bh() ? global._registeredInterfacesTypes || {} : window !== void 0 ? window._registeredInterfacesTypes || {} : {};
}
const vh = {
  name: "Max",
  id: "max",
  settings: {},
  accept: "Number",
  message: (t) => `This value has to be maximum "<yellow>${t.max}</yellow>". Received "<red>${t.received}</red>"`,
  processParams: (t) => ({ value: t }),
  apply: (t, e, r, n) => t > e.value ? new Error(`<red>[minRule]</red> Sorry but the passed value "<yellow>${t}</yellow>" must be lower or equal at <cyan>${e.value}</cyan>`) : t
}, wh = {
  name: "Min",
  id: "min",
  settings: {},
  accept: "Number",
  message: (t) => `This value has to be minimum "<yellow>${t.min}</yellow>". Received "<red>${t.received}</red>"`,
  processParams: (t) => ({ value: t }),
  apply: (t, e, r, n) => t < e.value ? new Error(`<red>[minRule]</red> Sorry but the passed value "<yellow>${t}</yellow>" must be greater or equal at <cyan>${e.value}</cyan>`) : t
}, _h = {
  priority: 1,
  name: "Required",
  id: "required",
  settings: {
    when: [void 0, null]
  },
  message: "This value is required",
  processParams: (t) => ({ value: t }),
  apply: (t, e, r, n) => e.value === !0 && r.when.indexOf(t) !== -1 ? new Error("This property is <yellow>required</yellow>") : t
};
function Sh(t, e) {
  t || (t = ""), t = Ne(t);
  let r = t.replace(/\r\n/g, "|rn|");
  return r = r.replace(/\n/g, "|n|"), r = r.replace(/\r/g, "|r|"), Object.keys(e).forEach((n) => {
    const i = new RegExp(`<s*${n}[^>]*>((.*?))<\\s*/\\s*${n}>`, "g"), o = r.match(i), s = new RegExp(`\\s?<${n}\\s?/>\\s?`, "g"), l = r.match(s);
    if (o)
      for (let u = 0; u < o.length; u++) {
        const f = o[u].match(`<\\s*${n}[^>]*>((.*?))<\\s*/\\s*${n}>`);
        if (!f)
          continue;
        const p = f[0], y = f[1];
        r = r.replace(p, e[n](n, y));
      }
    if (l)
      for (let u = 0; u < l.length; u++) {
        const f = l[u].match(`\\s?<${n}\\s?/>\\s?`);
        if (!f)
          continue;
        const p = f[0], y = "";
        r = r.replace(p, e[n](n, y));
      }
  }), r = r.replace(/\|rn\|/g, `\r
`), r = r.replace(/\|n\|/g, `
`), r = r.replace(/\|r\|/g, "\r"), r;
}
const Oh = {
  black: (t, e) => `\x1B[30m${e}\x1B[0m`,
  red: (t, e) => `\x1B[1;31m${e}\x1B[0m`,
  green: (t, e) => `\x1B[1;32m${e}\x1B[0m`,
  yellow: (t, e) => `\x1B[1;33m${e}\x1B[0m`,
  blue: (t, e) => `\x1B[1;34m${e}\x1B[0m`,
  magenta: (t, e) => `\x1B[1;35m${e}\x1B[0m`,
  cyan: (t, e) => `\x1B[1;36m${e}\x1B[0m`,
  white: (t, e) => `\x1B[1;37m${e}\x1B[0m`,
  grey: (t, e) => `\x1B[1;30m${e}\x1B[0m`,
  bgBlack: (t, e) => `\x1B[40m${e}\x1B[0m`,
  bgRed: (t, e) => `\x1B[41m${e}\x1B[0m`,
  bgGreen: (t, e) => `\x1B[42m${e}\x1B[0m`,
  bgYellow: (t, e) => `\x1B[43m${e}\x1B[0m`,
  bgBlue: (t, e) => `\x1B[44m${e}\x1B[0m`,
  bgMagenta: (t, e) => `\x1B[45m${e}\x1B[0m`,
  bgCyan: (t, e) => `\x1B[46m${e}\x1B[0m`,
  bgWhite: (t, e) => `\x1B[47m${e}\x1B[0m`,
  bgGrey: (t, e) => `\x1B[48m${e}\x1B[0m`,
  bold: (t, e) => e,
  dim: (t, e) => e,
  italic: (t, e) => e,
  underline: (t, e) => e,
  strike: (t, e) => e,
  date: (t, e) => (/* @__PURE__ */ new Date()).getDate().toString().padStart("0", 2) + "-" + ((/* @__PURE__ */ new Date()).getMonth() + 1).toString().padStart("0", 2) + "-" + (/* @__PURE__ */ new Date()).getFullYear().toString().padStart("0", 2),
  time: (t, e) => (/* @__PURE__ */ new Date()).getHours().toString().padStart("0", 2) + ":" + (/* @__PURE__ */ new Date()).getMinutes().toString().padStart("0", 2) + ":" + (/* @__PURE__ */ new Date()).getMinutes().toString().padStart("0", 2),
  day: (t, e) => (/* @__PURE__ */ new Date()).getDate().toString().padStart("0", 2),
  days: (t, e) => (/* @__PURE__ */ new Date()).getDate().toString().padStart("0", 2),
  month: (t, e) => (/* @__PURE__ */ new Date()).getMonth().toString().padStart("0", 2),
  months: (t, e) => (/* @__PURE__ */ new Date()).getMonth().toString().padStart("0", 2),
  year: (t, e) => (/* @__PURE__ */ new Date()).getFullYear().toString().padStart("0", 2),
  years: (t, e) => (/* @__PURE__ */ new Date()).getFullYear().toString().padStart("0", 2),
  hour: (t, e) => (/* @__PURE__ */ new Date()).getHours().toString().padStart("0", 2),
  hours: (t, e) => (/* @__PURE__ */ new Date()).getHours().toString().padStart("0", 2),
  minute: (t, e) => (/* @__PURE__ */ new Date()).getMinutes().toString().padStart("0", 2),
  minutes: (t, e) => (/* @__PURE__ */ new Date()).getMinutes().toString().padStart("0", 2),
  second: (t, e) => (/* @__PURE__ */ new Date()).getSeconds().toString().padStart("0", 2),
  seconds: (t, e) => (/* @__PURE__ */ new Date()).getSeconds().toString().padStart("0", 2),
  br: (t, e) => `
`
};
function kr(t) {
  let e = !1;
  return Array.isArray(t) ? e = !0 : t = [t], t = t.map((r) => Sh(r, Oh)), e ? t : t[0];
}
function de(t, e = {}) {
  e = W({
    of: !1,
    customClass: !0
  }, e);
  let r;
  Array.isArray(t) ? r = "Array" : t instanceof Map ? r = "Map" : t === null ? r = "Null" : t === void 0 ? r = "Undefined" : typeof t == "string" ? r = "String" : ty(t) ? r = "Integer" : typeof t == "number" ? r = "Number" : typeof t == "boolean" ? r = "Boolean" : t instanceof RegExp ? r = "RegExp" : e.customClass === !0 && Yt(t) && t.name !== void 0 ? r = Ws(t.name) : e.customClass === !0 && t.constructor !== void 0 && t.constructor.name !== void 0 ? r = Ws(t.constructor.name) : e.customClass === !1 && Yt(t) ? r = "Class" : typeof t == "function" ? r = "Function" : typeof t == "object" ? r = "Object" : r = "Unknown";
  const n = [
    "Null",
    "Undefined",
    "String",
    "Integer",
    "Number",
    "Boolean",
    "Unknown"
  ];
  if (e.of === !0 && !n.includes(r)) {
    const i = Array.isArray(t) ? [...t.keys()] : Object.keys(t), o = [];
    i.forEach((s) => {
      const l = t[s], u = de(l, {
        of: !1,
        customClass: e.customClass
      });
      o.includes(u) || o.push(u);
    }), r += `<${o.join("|")}>`;
  }
  return r;
}
const Eh = function(t, e, r = {}) {
  r = Object.assign({ newStack: !1 }, r);
  const n = de(t).toLowerCase();
  let i;
  n === "object" ? i = Object.keys(t) : n === "array" ? i = Array.from(Array(t.length).keys()) : n === "number" || n === "integer" ? i = Array.from(Array(Math.round(t)).keys()) : n === "string" || n === "set" ? i = Array.from(t) : i = Array.from(t.keys()), (n === "string" || n === "number" || n === "integer" || n === "set") && (r.newStack = !0);
  let o = [];
  n === "object" ? o = {} : n === "map" ? o = /* @__PURE__ */ new Map() : n === "set" && (o = /* @__PURE__ */ new Set());
  let s, l;
  const u = (f, p) => {
    switch (de(f).toLowerCase()) {
      case "array":
      case "object":
        return f[p];
      case "string":
        return p;
      case "number":
      case "integer":
        return p;
      case "map":
        return f.get(p);
      case "set":
        return p;
    }
  }, c = (f, p, y) => {
    switch (de(f).toLowerCase()) {
      case "array":
        r.newStack === !0 ? f.push(y) : f[p] = y;
        break;
      case "object":
        f[p] = y;
        break;
      case "number":
      case "integer":
      case "string":
        f.push(y);
        break;
      case "map":
        f.set(p, y);
        break;
      case "set":
        f.add(y);
        break;
    }
  };
  for (let f = 0; f < i.length; f++) {
    const p = i[f];
    if (s = u(t, p), l = e({ key: p, prop: p, value: s, i: f, idx: f }), l === -1)
      break;
    c(r.newStack ? o : t, p, l);
  }
  return n === "string" ? o.join("") : r.newStack ? o : t;
};
function Th(t) {
  let e = "", r = t, n = [];
  if (r.match(/^['"`]/))
    return {
      type: "string",
      of: void 0,
      value: r.replace(/^['"`]/, "").replace(/['"`]$/, "")
    };
  const i = Fo(r);
  if (typeof i == "number")
    return {
      type: "number",
      of: void 0,
      value: i
    };
  r = r.trim().replace(/^([a-zA-Z0-9-_]+)\[\]$/, "array<$1>");
  const o = r.match(/<(.+)>$/gm);
  o && o.length && (e = o[0].replace("<", "").replace(">", "")), e !== "" && (r = r.replace(`<${e}>`, "")), n = e !== "" ? [e] : void 0, e !== void 0 && e.includes("|") && (n = e.split("|").map((l) => l.trim()));
  const s = {
    type: r,
    of: n
  };
  return Object.defineProperty(s, "toString", {
    get() {
      return () => t;
    }
  }), s;
}
function wo(t) {
  const e = t;
  t = t.trim(), t = t.replace(/^\{/, "").replace(/\}$/, "");
  let r = !1;
  t.match(/\)\[\]$/) && (r = !0, t = t.replace(/\)\[\]$/, "").replace(/^\(/, ""));
  const n = [];
  let i = 0, o = "", s = !1;
  for (let u = 0; u < t.length; u++) {
    const c = t[u];
    if (["(", "<"].includes(c) ? (i++, s = !0, o += "^") : [")", ">"].includes(c) ? (i--, o += "$") : c === "|" && i === 0 ? (n.push({
      areSubLevels: s,
      type: o
    }), o = "") : o += c, i < 0)
      throw new Error(`It seems that your type string "${t}" is not valid...`);
  }
  n.push({
    areSubLevels: s,
    type: o
  });
  let l = [];
  if (n.forEach((u) => {
    u.areSubLevels ? l = [...l, ...wo(u.type)] : l.push(Th(u.type.replace("^", "<").replace("$", ">")));
  }), r) {
    const u = [
      {
        type: "array",
        of: l
      }
    ];
    return u.__proto__.toString = () => e, u;
  }
  return l = Eo(l, ({ object: u, prop: c, value: f, path: p }) => (typeof f == "string" && (f = f.replace(/^\./, "").trim()), f)), Object.defineProperty(l, "toString", {
    get() {
      return () => e;
    }
  }), l;
}
class Gs {
  /**
   * @name       typeString
   * @type       string
   * @get
   *
   * Access the type in string format
   *
   * @since     2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  get typeString() {
    return this._data.typeString;
  }
  /**
   * @name       value
   * @type       string
   * @get
   *
   * Access the value passed to be type validated
   *
   * @since     2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  get value() {
    return this._data.value;
  }
  /**
   * @name       received
   * @type       ISTypeResultReceived
   * @get
   *
   * Access the received descriptor object
   *
   * @since     2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  get received() {
    return this._data.received;
  }
  /**
   * @name       expected
   * @type       ISTypeResultExpected
   * @get
   *
   * Access the expected descriptor object
   *
   * @since     2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  get expected() {
    return this._data.expected;
  }
  /**
   * @name       issues
   * @type       ISTypeResultIssueObj[]
   * @get
   *
   * Access the issues array
   *
   * @since     2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  get issues() {
    return this._data.issues;
  }
  /**
   * @name       settings
   * @type       ISTypeResultSettings
   * @get
   *
   * Access the settings object
   *
   * @since     2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  get settings() {
    return this._data.settings;
  }
  /**
   * @name        constructor
   * @type        Function
   * @constructor
   *
   * Constructor
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  constructor(e) {
    this._data = e;
  }
  /**
   * @name          hasIssues
   * @type          Function
   *
   * Return true if some issues have been detected, false if not
   *
   * @return        {Boolean}       true if has some issues, false if not
   *
   * @since         2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  hasIssues() {
    return !!this._data;
  }
  /**
   * @name             toString
   * @type              Functio n
   *
   * This method return a string terminal compatible or html of this result object
   *
   * @return        {String}                The result object in string format
   *
   * @since          2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  toString() {
    return Do() ? this.toConsole() : 'The method "toHtml" has not being integrated for now...';
  }
  /**
   * @name          toConsole
   * @type          Function
   *
   * This method simply returns you a terminal compatible string
   * of the interface checking result
   *
   * @return        {String}                A string compatible with the terminal
   *
   * @since         2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  toConsole() {
    const e = [
      `<underline><magenta>${this._data.settings.name}</magenta></underline>`,
      "",
      "<underline>Received value</underline>",
      "",
      `${Ne(this._data.value, {
        beautify: !0
      })}`,
      ""
    ], r = [];
    Object.keys(this._data.issues).forEach((i) => {
      const o = this._data.issues[i], s = [];
      o.expected.type && s.push(`- Expected "<yellow>${o.expected.type}</yellow>"`), o.received.type && s.push(`- Received "<red>${o.received.type}</red>"`), o.message && s.push(["<underline>Details:</underline>", o.message].join(`
`)), r.push(s.join(`
`));
    });
    const n = [
      "",
      "<underline>Settings</underline>",
      "",
      `${Ne(this._data.settings, {
        beautify: !0
      })}`
    ];
    return kr(`
${e.join(`
`)}
${r.join(`
`)}
${this.settings.verbose ? n.join(`
`) : ""}
    `).trim();
  }
}
function Ah() {
  return typeof process < "u" && process.release && process.release.name === "node";
}
function jh() {
  return Ah() ? global._registeredInterfacesTypes || {} : window !== void 0 ? window._registeredInterfacesTypes || {} : {};
}
class q {
  /**
   * @name      registerType
   * @type      Function
   * @static
   *
   * This static method allows you to register a new rule
   * by passing a valid ISDescriptorRule object
   *
   * @param     {ISDescriptorRule}        rule        The rule object to register
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com>
   */
  static registerType(e) {
    if (e.id === void 0 || typeof e.id != "string")
      throw new Error("Sorry but you try to register a type that does not fit the ISTypeDescriptor interface...");
    this._registeredTypes[e.id] = e;
  }
  /**
   * @name      parseTypeString
   * @type      Function
   * @static
   *
   * This static method allows you to parse a type string.
   *
   * @param     {String}        typeString      The type string to parse
   * @return    {ITypeStringObject[]}             An array of object(s) describing the type string passed
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com>
   */
  static parseTypeString(e) {
    return wo(e);
  }
  /**
   * @name      constructor
   * @type      Function
   * @constructor
   *
   * Constructor
   *
   * @since     2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  constructor(e, r = {}) {
    if (this.typeString = e, e = e.toLowerCase().trim(), this.constructor._instanciatedTypes[e] !== void 0)
      return this.constructor._instanciatedTypes[e];
    e.includes("[]") && console.log(e), this.types = wo(e), e.includes("[]") && console.log(this.types), this.settings = W({
      id: this.constructor.name,
      name: this.constructor.name,
      customTypes: !0,
      interfaces: !0
    }, r), this.constructor._instanciatedTypes[e] = this;
  }
  /**
   * @name      is
   * @type      Function
   *
   * This method make a simple check to see if the passed value correspond to the
   * type that this instance represent.
   * Same as the ```check``` method, but return only a Boolean.
   *
   * @param     {Any}       value       The value to check
   * @param     {ISTypeSettings}        [settings={}]     Some settings to configure your check
   * @return    {Boolean}               true if correspond, false if not
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com>
   */
  is(e, r = {}) {
    const n = this.check(e, r);
    return n === !0 ? !0 : n instanceof Gs ? !n.hasIssues() : !0;
  }
  /**
   * @name        check
   * @type        Function
   *
   * This method allows you to make sure the passed value correspond with the type(s)
   * this instance represent
   * If all is ok, return true, otherwise return an instance of the STypeResult class that
   * describe what is wrong
   *
   * @param     {Any}       value       The value to check
   * @param     {ISTypeSettings}        [settings={}]     Some settings to configure your check
   * @return    {Boolean|STypeResult}               true if correspond, an instance of the STypeResult class if not
   *
   * @since     2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com>
   */
  check(e, r = {}) {
    r = W(this.settings, r);
    const n = {};
    for (let o = 0; o < this.types.length; o++) {
      const s = this.types[o], l = s.type, u = this._isType(e, l, r);
      if (u === !0) {
        if (s.of === void 0)
          return !0;
        const c = de(e);
        if (c !== "Array" && c !== "Object" && c !== "Map")
          throw new Error(`Sorry but you have specified a type string "<yellow>${this.typeString}</yellow>" with some "<...>" definition on a type "<cyan>${c}</cyan>" that does not support "child" value(s)...`);
        const f = c === "Object" ? Object.keys(e) : Array.from(e.keys());
        if (!f.length)
          return !0;
        for (let p = 0; p < f.length; p++)
          for (let y = 0; y < s.of.length; y++) {
            const g = s.of[y], m = f[p], b = c === "Map" ? e.get(m) : e[m];
            if (this._isType(b, g, r) !== !0)
              n[s.type] = {
                expected: {
                  type: s.type
                },
                received: {
                  type: de(b),
                  value: b
                }
              };
            else
              return !0;
          }
      } else {
        const c = {
          expected: {
            type: s.type
          },
          received: {
            type: de(e),
            value: e
          }
        };
        u != null && u !== !1 && u.toString && typeof u.toString == "function" && (c.message = u.toString()), n[s.type] = c;
      }
    }
    return new Gs({
      typeString: this.typeString,
      value: e,
      expected: {
        type: this.typeString
      },
      received: {
        type: de(e)
      },
      issues: n,
      settings: r
    });
  }
  /**
   * @name          _isType
   * @type          Function
   * @private
   *
   * This method simply take a type string like "string", "array", etc..., a value and
   * check if this value correspond to the passed type
   *
   * @param     {Any}       value       The value to validate
   * @param     {String}    type        The type to check the value with
   * @return    {Boolean}               true if all if ok, false if not
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com>
   */
  _isType(e, r, n = {}) {
    if (n = W(this.settings, n), this.constructor._registeredTypes[r.toLowerCase()] === void 0) {
      if (n.interfaces === !0) {
        const i = jh();
        if (i[r] !== void 0)
          return i[r].apply(e, {});
      }
      if (n.customTypes === !0) {
        const i = de(e).toLowerCase(), o = Object.keys(dh(e)).map((s) => s.toLowerCase());
        if (r === i || o.indexOf(r) !== -1)
          return !0;
      }
      throw new Error(`Sorry but you try to validate a value with the type "<yellow>${r}</yellow>" but this type is not registered...`);
    }
    return this.constructor._registeredTypes[r.toLowerCase()].is(e);
  }
  /**
   * @name          cast
   * @type          Function
   *
   * This method allows you to cast the passed value to the wanted type.
   * !!! If multiple types are passed in the typeString, the first one that
   * is "castable" to will be used.
   *
   * @param     {Any}         value         The value you want to cast
   * @param     {ISTypeSettings}      [settings={}]       Some settings you want to override
   * @return    {Any|Error}                         The casted value, or undefined if cannot be casted
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com>
   */
  cast(e, r, n) {
    n = W(this.settings, n);
    const i = {
      value: e,
      issues: {},
      settings: n,
      toString() {
        return Object.entries(this.issues).map((l) => l[1]).join(`
`);
      }
    };
    if (this.is(e))
      return e;
    for (let s = 0; s < this.types.length; s++) {
      const l = this.types[s], u = l.type, c = this.constructor._registeredTypes[u.toLowerCase()];
      if (c === void 0 || c.cast === void 0)
        continue;
      let f;
      if (f = c.cast(e, r), f instanceof Error) {
        i.issues[u] = f.toString();
        continue;
      }
      if (l.of !== void 0 && this.canHaveChilds(f) === !1) {
        const p = `Sorry but the passed type "<yellow>${u}</yellow>" has some child(s) dependencies "<green>${l.of.join("|")}</green>" but this type can not have child(s)`;
        throw new Error(kr(p));
      } else if (l.of !== void 0) {
        const p = new q(l.of.join("|"));
        f = Eh(f, ({ value: y }) => p.cast(y, r, n));
      }
      if (f === null && c.id === "null")
        return null;
      if (f === void 0 && c.id === "undefined")
        return;
      if (f != null)
        return f;
      i.issues[u] = "Something goes wrong but no details are available... Sorry";
    }
    const o = [
      `Sorry but the value of type "<cyan>${de(e)}</cyan>" passed to be casted in type "<yellow>${this.typeString}</yellow>" can not be casted correctly. Here's why:
`
    ];
    throw Object.keys(i.issues).forEach((s) => {
      o.push(`- <red>${s}</red>: ${i.issues[s]}`);
    }), new Error(kr(o.join(`
`)));
  }
  /**
   * @name          canHaveChilds
   * @type          Function
   *
   * This method simply take a value and return true if can have child(s), false if not
   *
   * @param       {Any}       value       The value to check
   * @return      {Boolean}         true if can have child(s) (Object, Array and Map), false if not
   *
   * @since     2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com>
   */
  canHaveChilds(e) {
    const r = de(e);
    return r === "Array" || r === "Object" || r === "Map";
  }
  /**
   * @name          name
   * @type          String
   * @get
   *
   * Access the descriptor name. Either the value of settings.name, or the constructor name
   *
   * @since         2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com>
   */
  get name() {
    return this.settings.name;
  }
  /**
   * @name          id
   * @type          String
   * @get
   *
   * Access the descriptor id. Either the value of settings.name, or the constructor name
   *
   * @since         2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com>
   */
  get id() {
    return this.settings.id;
  }
}
q._instanciatedTypes = {};
q._registeredTypes = {};
const $h = {
  name: "Array",
  id: "array",
  is: (t) => Array.isArray(t),
  cast: (t, e = {}) => t ? (e.splitChars && Array.isArray(e.splitChars) && (t === !0 && (t = ""), t = t.split(new RegExp(`(${e.splitChars.join("|")})`, "gm")).filter((r) => r.trim() !== "" && e.splitChars.indexOf(r) === -1)), Array.isArray(t) ? t : [t]) : []
}, xh = {
  name: "Bigint",
  id: "bigint",
  is: (t) => typeof t == "bigint",
  cast: (t) => {
    if (typeof t == "bigint")
      return t;
    if (typeof t != "string" && typeof t != "number")
      return new Error("Sorry but only <yellow>String</yellow> and <yellow>Number</yellow> can be casted to <green>Bigint</green>");
    let e;
    try {
      e = BigInt(t);
    } catch {
      e = new Error(`It seem's that the passed value "<yellow>${t}</yellow>" can not be casted to a <green>BigInt</green>`);
    }
    return e;
  }
}, kh = {
  name: "Boolean",
  id: "boolean",
  is: (t) => typeof t == "boolean",
  cast: (t, e = {}) => t !== !1 && e && e.nullishAsTrue && !t ? !0 : typeof t == "boolean" ? t : t == null ? !1 : typeof t == "number" ? t > 0 : typeof t == "string" || Array.isArray(t) ? t.length > 0 : typeof t == "object" ? Object.keys(t).length > 0 : new Error([
    "Sorry but for now only these types can be casted to boolean:",
    "- <yellow>null</yellow>: Will be casted as <red>false</red>",
    "- <yellow>undefined</yellow>: Will be casted as <red>false</red>",
    "- <yellow>Number</yellow>: Will be casted as <green>true</green> when greater than 0, <red>false</red> otherwise",
    "- <yellow>String</yellow>: Will be casted as <green>true</green> when longer than 0 characters, <red>false</red> otherwise",
    "- <yellow>Array</yellow>: Will be casted as <green>true</green> when having more than 0 items, <red>false</red> otherwise",
    "- <yellow>Object</yellow>: Will be casted as <green>true</green> when have more than 0 properties, <red>false</red> otherwise"
  ].join(`
`))
}, Ch = {
  name: "Class",
  id: "class",
  is: (t) => Yt(t),
  cast: (t) => new Error("Sorry but nothing is castable to a Class")
}, Ph = {
  name: "Date",
  id: "date",
  is: (t) => t instanceof Date,
  cast: (t) => {
    if (typeof t == "string")
      return new Date(t);
    if (typeof t == "number")
      return new Date(Math.round(t));
    if (ye(t)) {
      let r = (/* @__PURE__ */ new Date()).getFullYear(), n = 0, i = 1, o = 0, s = 0, l = 0, u = 0;
      return t.year && typeof t.year == "number" && (r = t.year), t.month && typeof t.month == "number" && (n = t.month), t.day && typeof t.day == "number" && (i = t.day), t.hours && typeof t.hours == "number" && (o = t.hours), t.minutes && typeof t.minutes == "number" && (s = t.minutes), t.seconds && typeof t.seconds == "number" && (l = t.seconds), t.milliseconds && typeof t.milliseconds == "number" && (u = t.milliseconds), new Date(r, n, i, o, s, l, u);
    }
    return new Error("Sorry but for now only <yellow>String</yellow>, <yellow>Number</yellow> and <yellow>Object</yellow> (with properties: year, month, day?, hours?, minutes?, seconds? and milliseconds?) are castable to Date");
  }
}, Rh = {
  name: "Function",
  id: "function",
  is: (t) => typeof t == "function",
  cast: (t) => new Error("Sorry but nothing is castable to a Function")
}, Ih = {
  name: "Integer",
  id: "integer",
  is: (t) => Number.isInteger(t),
  cast: (t) => {
    if (typeof t != "string" && typeof t != "number")
      return new Error(`Sorry but only strings and numbers can be casted to integers... Passed value: ${t}`);
    const e = parseInt(t);
    return isNaN(e) ? new Error(`Sorry but the conversion of "<yellow>${t}</yellow>" to a <green>Integer</green> does not work...`) : e;
  }
}, Mh = {
  name: "Map",
  id: "map",
  is: (t) => ho(t),
  cast: (t) => {
    if (ho(t))
      return t;
    const e = /* @__PURE__ */ new Map();
    return e.set("value", t), e;
  }
}, Bh = {
  name: "Null",
  id: "null",
  is: (t) => t === null,
  cast: (t) => null
}, Fh = {
  name: "Number",
  id: "number",
  is: (t) => typeof t == "number",
  cast: (t) => {
    if (typeof t != "string")
      return new Error("Sorry but only strings can be casted to numbers...");
    const e = parseFloat(t);
    return isNaN(e) ? new Error(`Sorry but the conversion of "<yellow>${t}</yellow>" to a <green>Number</green> does not work...`) : e;
  }
}, Lh = {
  name: "Object",
  id: "object",
  is: (t) => go(t),
  cast: (t) => go(t) ? t : {
    value: t
  }
}, Hh = {
  name: "Set",
  id: "set",
  is: (t) => t instanceof Set,
  cast: (t) => {
    if (t instanceof Set)
      return t;
    const e = /* @__PURE__ */ new Set();
    return e.add(t), e;
  }
}, Dh = {
  name: "String",
  id: "string",
  is: (t) => ry(t),
  cast: (t) => Ne(t, {
    beautify: !0
  })
}, Nh = {
  name: "Symbol",
  id: "symbol",
  is: (t) => typeof t == "symbol",
  cast: (t) => typeof t == "symbol" ? t : Symbol(t)
}, Wh = {
  name: "Undefined",
  id: "undefined",
  is: (t) => t === void 0,
  cast: (t) => {
  }
}, Uh = {
  name: "WeakMap",
  id: "weakmap",
  is: (t) => t instanceof WeakMap,
  cast: (t) => new Error("Sorry but nothing can be casted to a WeakMap for now")
}, Gh = {
  name: "WeakSet",
  id: "weakset",
  is: (t) => t instanceof WeakSet,
  cast: (t) => new Error("Sorry but nothing can be casted to a WeakSet for now")
};
q.registerType(Dh);
q.registerType(Mh);
q.registerType(Lh);
q.registerType($h);
q.registerType(Ih);
q.registerType(Fh);
q.registerType(kh);
q.registerType(Wh);
q.registerType(Bh);
q.registerType(Nh);
q.registerType(xh);
q.registerType(Ph);
q.registerType(Rh);
q.registerType(Uh);
q.registerType(Gh);
q.registerType(Hh);
q.registerType(Ch);
const qh = {
  prority: 10,
  name: "Type",
  id: "type",
  settings: {},
  processParams: (t) => {
    var e, r;
    if (!(t != null && t.type) && typeof t != "string")
      throw new Error('<yellow>[sugar.shared.type.descriptors.typeRule]</yellow> Sorry but to use the <magenta>type</magenta> descriptor rule you need to specify a type string either directly under the "type" property, or in an object under the "type.type" property...');
    return Object.assign(Object.assign({}, typeof t != "string" ? t : {}), { type: (e = t.type) !== null && e !== void 0 ? e : t, cast: (r = t.cast) !== null && r !== void 0 ? r : !0 });
  },
  apply: (t, e, r, n) => {
    const i = new q(e.type, {
      metas: {
        id: n.id
      }
    });
    return e.cast && !i.is(t) && (t = i.cast(t, e)), i.is(t) ? t : new Error(`The value must be of type "<yellow>${e.type}</yellow>" but you've passed a value of type "<cyan>${typeof t}</cyan>"`);
  }
};
class Kh extends ht {
  /**
   * @name      constructor
   * @type      Function
   * @constructor
   *
   * Constructor
   *
   * @since     2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  constructor(e, r, n) {
    super({}), this._issues = {}, this._descriptor = e, this._descriptorSettings = n;
    try {
      this._originalValue = Xs(r, { deep: !0 });
    } catch {
      this._originalValue = r;
    }
    this.value = r;
  }
  /**
   * @name           hasIssues
   * @type           Function
   *
   * This method return true if theirs no issues, false if not
   *
   * @return        {Boolean}           true if no issue(s), false if not
   *
   * @since          2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  hasIssues() {
    return Object.keys(this._issues).length >= 1;
  }
  /**
   * @name           add
   * @type           Function
   *
   * This method is used to add a rule result to the global descriptor result.
   *
   * @param         {ISDescriptorResultRule}        ruleResult      The rule result object you want to add
   *
   * @since          2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  add(e) {
    e.__ruleObj.id && (this._issues[e.__ruleObj.id] = e);
  }
  /**
   * @name             toString
   * @type              Functio n
   *
   * This method return a string terminal compatible of this result object
   *
   * @return        {String}                The result object in string format
   *
   * @since          2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  toString() {
    return Do() ? this.toConsole() : this.toConsole();
  }
  /**
   * @name             toConsole
   * @type              Function
   *
   * This method return a string terminal compatible of this result object
   *
   * @return        {String}                The result object in string format
   *
   * @since          2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  toConsole() {
    const e = [
      `<underline><magenta>${this._descriptor.metas.name}</magenta></underline>`,
      "",
      `${Ne(this.value, {
        beautify: !0
      })}`,
      ""
    ], r = [];
    Object.keys(this._issues).forEach((i) => {
      const o = this._issues[i];
      let s = "";
      o.__error && o.__error instanceof Error ? s = o.__error.message : o.__ruleObj.message !== void 0 && typeof o.__ruleObj.message == "function" ? s = o.__ruleObj.message(o) : o.__ruleObj.message !== void 0 && typeof o.__ruleObj.message == "string" && (s = o.__ruleObj.message), r.push(`-${typeof o.__propName == "string" ? ` [<magenta>${o.__propName}</magenta>]` : ""} <red>${i}</red>: ${s}`);
    });
    const n = [
      "",
      "<underline>Settings</underline>",
      "",
      `${Ne(this._descriptorSettings, {
        beautify: !0
      })}`
    ];
    return kr(`
${e.join(`
`)}
${r.join(`
`)}
${n.join(`
`)}
    `).trim();
  }
}
class Ue extends ht {
  /**
   * @name      registerRule
   * @type      Function
   * @static
   *
   * This static method allows you to register a new rule
   * by passing a valid ISDescriptorRule object
   *
   * @param     {ISDescriptorRule}        rule        The rule object to register
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com>
   */
  static registerRule(e) {
    if (e.id === void 0 || typeof e.id != "string")
      throw new Error("Sorry but you try to register a rule that does not fit the ISDescriptionRule interface...");
    this._registeredRules[e.id] = e;
  }
  /**
   * @name      constructor
   * @type      Function
   * @constructor
   *
   * Constructor
   *
   * @since     2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  constructor(e) {
    super(W({
      rules: {},
      type: "Object",
      arrayAsValue: !1,
      throwOnMissingRule: !1,
      defaults: !0
    }, e ?? {}));
  }
  /**
   * @name          apply
   * @type          Function
   *
   * This method simply apply the descriptor instance on the passed value.
   * The value can be anything depending on the descriptor you use.
   * When you pass an Array, by default it will apply the descriptor on
   * each array items. If you don't want this behavior and the Array passed has to be
   * treated as a single value, pass the "arrayAsValue" setting to true
   *
   * @param       {Any}       value         The value to apply the descriptor on
   * @param       {ISDescriptorSettings}        [settings={}]       An object of settings to configure your descriptor. These settings will override the base ones passed in the constructor
   * @return      {ISDescriptorResultObj|true}           Will return true if all is ok, and an object describing the issue if not
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  apply(e, r) {
    const n = W(this.settings, r || {});
    e == null && (e = {});
    const i = {}, o = {};
    this._descriptorResult = new Kh(this, o, Object.assign({}, n));
    const s = n.rules;
    if (!new q(n.type).is(e))
      throw new Error(`Sorry but this descriptor "<yellow>${this.metas.name}</yellow>" does not accept values of type "<cyan>${de(e)}</cyan>" but only "<green>${n.type}</green>"...`);
    if (Array.isArray(e) && !n.arrayAsValue)
      throw new Error("Sorry but the support for arrays like values has not been integrated for not...");
    if (typeof e == "object" && e !== null && e !== void 0)
      Object.keys(s).forEach((u) => {
        ey(u) && e || (i[u] = To(e, u));
      }), Object.keys(i).forEach((u) => {
        const c = s[u];
        if (i[u] === void 0 && n.defaults && c.default !== void 0 && (i[u] = c.default), c.interface !== void 0) {
          const p = i[u];
          i[u] = c.interface.apply(p || {}, {});
        }
        const f = this._validate(i[u], u, c, n);
        f != null && Qs(o, u, f);
      });
    else
      throw console.warn(e), new Error("You can apply an <yellow>SDescriptor</yellow> only on an Object like value...");
    if (this._descriptorResult.hasIssues())
      throw new Error(this._descriptorResult.toString());
    return this._descriptorResult;
  }
  /**
   * @name          _validate
   * @type          Function
   * @private
   *
   * This method take a value and validate it using the defined rules
   *
   * @param       {Any}       value       The value to validate
   * @return      {ISDescriptionValidationResult|true}        true if the validation has been made correctly, an object describing the issue if not
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  _validate(e, r, n, i) {
    if (n === void 0 || (n.required === void 0 || n.required === !1) && e == null)
      return e;
    let o = Object.keys(n).filter((l) => l !== "default");
    o = o.sort((l, u) => {
      const c = this.constructor._registeredRules[l], f = this.constructor._registeredRules[u];
      return c ? f ? (c.priority === void 0 && (c.priority = 9999999999), f.priority === void 0 && (f.priority = 9999999999), c.priotity - f.priority) : 1 : -1;
    }).reverse();
    let s = e;
    return o.forEach((l) => {
      const u = n[l];
      if (this.constructor._registeredRules[l] === void 0) {
        if (i.throwOnMissingRule)
          throw new Error(`Sorry but you try to validate a value using the "<yellow>${l}</yellow>" rule but this rule is not registered. Here's the available rules:
              - ${Object.keys(this.constructor._registeredRules).join(`
- `)}`);
      } else {
        const c = this.constructor._registeredRules[l], f = c.processParams !== void 0 ? c.processParams(u) : u, p = c.settings !== void 0 ? c.settings : {};
        if (p.mapOnArray && Array.isArray(s)) {
          let y = [];
          s.forEach((g) => {
            const m = this._processRule(g, c, r, f, p, i);
            Array.isArray(m) ? y = [
              ...y,
              ...m
            ] : y.push(m);
          }), s = y;
        } else
          s = this._processRule(s, c, r, f, p, i);
      }
    }), s;
  }
  _processRule(e, r, n, i, o, s) {
    const l = r.apply(e, i, o, Object.assign(Object.assign({}, s), { propName: n, name: `${s.name}.${n}` }));
    if (i && i.type && i.type.toLowerCase() === "boolean" && l === !0)
      return !0;
    if (l instanceof Error) {
      const u = {
        __error: l,
        __ruleObj: r,
        __propName: n
      };
      if (this._descriptorResult)
        throw this._descriptorResult.add(u), new Error(this._descriptorResult.toString());
    } else
      return l;
  }
}
Ue._registeredRules = {};
Ue.rules = {};
Ue.type = "Object";
Ue.registerRule(_h);
Ue.registerRule(qh);
Ue.registerRule(wh);
Ue.registerRule(vh);
function zh(t, e) {
  if (e = W({
    valueQuote: void 0,
    treatNoAsBoolean: !0,
    camelCase: !0
  }, e ?? {}), t = t.trim(), t = t.replace(/(["'`])--/gm, "$1--§ --"), e.treatNoAsBoolean) {
    const u = t.match(/--no-[\w]+/g);
    u == null || u.forEach((c) => {
      t = t.replace(c, `${c.replace("--no-", "--")} false`);
    });
  }
  let r = e.valueQuote;
  if (!r) {
    for (let u = 0; u < t.length; u++) {
      const c = t[u];
      if (c === '"' || c === "`" || c === "'") {
        r = c;
        break;
      }
    }
    r || (r = '"');
  }
  let n = [], i = !1;
  if (t.match(/^\(/) && t.match(/\)$/)) {
    i = !0, t = t.slice(1, -1);
    let u = "", c = 0, f = 0;
    for (let p = 0; p < t.length; p++) {
      const y = t[p], g = t[p - 1] || t[0];
      y === r && g !== "\\" && !f ? f++ : y === r && g !== "\\" && f && f--, !f && y === "(" ? c++ : !f && y === ")" && c--, y === "," ? f || c ? u += y : (n.push(u.trim()), u = "") : u += y;
    }
    c && (u += ")".repeat(c)), n.push(u.trim());
  } else {
    let u = "", c = !1;
    for (let f = 0; f < t.length; f++) {
      const p = t[f], y = t[f - 1] || t[0];
      p === r && y !== "\\" && !c ? c = !0 : p === r && y !== "\\" && c && (c = !1), p === " " ? c ? u += p : (n.push(u.trim()), u = "") : u += p;
    }
    n.push(u.trim());
  }
  n && (n = n.map((u) => Sr(u)));
  let o = {}, s, l;
  return n = n.forEach((u, c) => {
    if (!i && !u.includes(" ") && (u.slice(0, 2) === "--" || u.slice(0, 1) === "-"))
      l === void 0 && s !== -1 && s && o[s] === void 0 && (o[s] = !0), s = u.replace(/^[-]{1,2}/, ""), o[s] === void 0 && (o[s] = !0);
    else {
      let f;
      if (u && typeof u == "string" && (f = u.replace(/^\\\\\\`/, "").replace(/\\\\\\`$/, "").replace(/^'/, "").replace(/'$/, "").replace(/^"/, "").replace(/"$/, ""), f.match(/^\$[a-zA-Z0-9-_]+\s?:.*/))) {
        const p = u.split(":");
        s = p[0].trim().replace(/^\$/, ""), f = p.slice(1).join(":").trim();
      }
      l = Fo(f), typeof l == "string" && (l = l.replace("--§ ", "")), s !== void 0 ? (o[s] !== void 0 && o[s] !== !0 ? (Array.isArray(o[s]) || (o[s] = [o[s]]), o[s].push(l)) : o[s] = l, l = void 0, s = void 0) : o[c] = l;
    }
  }), e.camelCase && (o = Ys(o)), Object.keys(o).forEach((u) => {
    o[u] === void 0 && delete o[u];
  }), o;
}
try {
  global ? global._registeredInterfacesTypes = {} : window._registeredInterfacesTypes = {};
} catch {
}
class rr extends ht {
  static get definition() {
    var e, r;
    if (this._cachedDefinition)
      return this._cachedDefinition;
    this._cachedDefinition = (e = this._definition) !== null && e !== void 0 ? e : {};
    for (let [n, i] of Object.entries(this._cachedDefinition)) {
      if (typeof ((r = i.type) === null || r === void 0 ? void 0 : r.type) == "string" && i.type.type.match(/\[\]/)) {
        this._cachedDefinition[n].type.type = i.type.type.replace(/([a-zA-Z0-9-_]+)\[\]/gm, "Array<$1>");
        continue;
      }
      typeof i.type == "string" && i.type.match(/\[\]/) && (this._cachedDefinition[n].type = i.type.replace(/([a-zA-Z0-9-_]+)\[\]/gm, "Array<$1>"));
    }
    return this._cachedDefinition;
  }
  static set definition(e) {
    this._cachedDefinition = e;
  }
  static registerRenderer(e) {
    if (!e.id)
      throw new Error(`Sorry but the interface renderer "<yellow>${e.name}</yellow>" that you want to register is missing the required <yellow>static</yellow> <green>id</green> property...`);
    this._registeredRenderers[e.id] = e;
  }
  /**
   * @name      mix
   * @type      Function
   * @static
   *
   * This static method allows you to mix multiple interfaces into one
   *
   * @param     {SInterface[]}      ...ints       The interfaces to mix together
   * @return    {SInterface}                          The mixed interface
   *
   * @since     2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  static mix(...e) {
    const r = new rr();
    return e.forEach((n) => {
      n.definition && (r.definition = W(r.definition, n.definition));
    }), r;
  }
  /**
   * @name      overrie
   * @type      Function
   * @static
   *
   * This static method is usefull to make a duplicate of the base interface with some updates
   * in the definition object.
   *
   * @param     {Object}      definition      A definition object to override or extends the base one
   * @return    {SInterface}                  A new interface overrided with your new values
   *
   * @since     2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  static override(e) {
    const r = this;
    class n extends this {
    }
    return n.overridedName = `${r.name} (overrided)`, n.definition = W(r.definition, e), n;
  }
  /**
   * @name            isDefault
   * @type            Function
   * @static
   *
   * This static method allows you to check if a certain value is the default of a certain property or not.
   *
   * @param           {String}            prop        The property to check if it's the default of or not
   * @param           {Any}               value       The value to check with
   * @return          {Boolean}                       true if is the default value, false if not
   *
   * @since           2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  static isDefault(e, r) {
    const n = this.defaults();
    return n[e] === void 0 ? !1 : n[e] === r;
  }
  /**
   * @name            getAvailableTypes
   * @type            Function
   * @static
   *
   * This static method allows you to get the types that have been make widely available
   * using the ```makeAvailableAsType``` method.
   *
   * @return      {Object<SInterface>}          An object listing all the interface types maked available widely
   *
   * @since     2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  static getAvailableTypes() {
    return mh();
  }
  /**
   * @name            makeAvailableAsType
   * @type            Function
   * @static
   *
   * This static method allows you to promote your interface at the level where it can be
   * used in the "type" interface definition property like so "Object<MyCoolType>"
   *
   * @param       {String}      [name=null]       A custom name to register your interface. Otherwise take the class name and register two types: MyClassInterface => MyClassInterface && MyClass
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  static makeAvailableAsType(e = null) {
    const r = (e || this.name).toLowerCase();
    global !== void 0 ? (global._registeredInterfacesTypes[r] = this, global._registeredInterfacesTypes[r.replace("interface", "")] = this) : window !== void 0 && (window._registeredInterfacesTypes[r] = this, window._registeredInterfacesTypes[r.replace("interface", "")] = this);
  }
  /**
   * @name              toObject
   * @type              Function
   * @static
   *
   * This function allows you to get back a simple object describing the interface
   *
   * @return              {ISInterfaceObj}                The interface in plain object format
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  static toObject() {
    var e;
    return {
      name: this.name,
      description: (e = this.description) !== null && e !== void 0 ? e : "",
      definition: Object.assign({}, this.definition)
    };
  }
  /**
   * @name              defaults
   * @type              Function
   * @static
   *
   * This function simply returns you the default interface values in object format
   *
   * @since         2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  static defaults() {
    const e = {};
    return Object.keys(this.definition).forEach((r) => {
      const n = this.definition[r];
      n.default !== void 0 && (e[r] = n.default);
    }), e;
  }
  /**
   * @name              apply
   * @type              Function
   * @static
   *
   * This static method allows you to apply the interface on an object instance.
   * By default, if something is wrong in your class implementation, an error with the
   * description of what's wrong will be thrown. You can change that behavior if you prefer having
   * true returned when all is ok, or a string describing the current issue by specify the "settings.throw" property to false.
   *
   * @param       {Any}                objectOrString              The object on which to apply the interface on, or a cli string to use as input
   * @param       {ISInterfaceSettings}               [settings={}]         An object of settings to configure your apply process
   * - return (String) {String}: Specify in which return you want the result back. Can be "String" of "Object".
   * @return      {Boolean|String}                              true if all is ok, a string describing the issue if not...
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  static apply(e, r) {
    return new this({
      interface: r ?? {}
    }).apply(e);
  }
  /**
   * @name            help
   * @type            Function
   * @static
   *
   * This static method allows you to get back the help using the
   * passed renderer. Awailable rendered are for now:
   * - terminal (default): The default terminal renderer
   * - more to come depending on needs...
   *
   * @param         {String}          [renderer="terminal"]        The registered renderer you want to use.
   * @param         {ISInterfaceRendererSettings}     [settings={}]     Some settings to configure your render
   *
   * @setting     {'terminal'}        [renderer="terminal"]       The renderer you want to use.
   * @setting     {Array<String>}     [exclude=['help']]                An array of properties you don't want to render
   *
   * @since     2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  static render(e = "terminal", r) {
    const n = W({
      renderer: "terminal",
      exclude: ["help"]
    }, r);
    if (!this._registeredRenderers[e])
      throw new Error(`Sorry but the requested renderer "<yellow>${e}</yellow>" does not exists... Here's the available renderers: <green>${Object.keys(this._registeredRenderers).join(", ")}</green>`);
    return new this._registeredRenderers[e](this, n).render();
  }
  /**
   * @name              constructor
   * @type              Function
   * @constructor
   *
   * Constructor
   *
   * @since         2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  constructor(e) {
    super(W({
      stripUnkown: !1
    }, e ?? {})), this._definition = {}, this._definition = this.constructor.definition;
  }
  /**
   * @name              apply
   * @type              Function
   *
   * This method allows you to apply the interface on an object instance.
   * By default, if something is wrong in your class implementation, an error with the
   * description of what's wrong will be thrown. You can change that behavior if you prefer having
   * true returned when all is ok, or a string describing the current issue by specify the "settings.throw" property to false.
   *
   * @param       {Any}                objectOrString              The object on which to apply the interface on, or a cli like string to use as input
   * @param       {ISInterfaceSettings}               [settings={}]         An object of settings to configure your apply process
   * @return      {Boolean|String}                              true if all is ok, a string describing the issue if not...
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  apply(e, r) {
    var n;
    const i = W(this.settings, r ?? {});
    let o = e;
    typeof e == "string" && (o = zh(e), Object.keys(o).forEach((c) => {
      for (let f = 0; f < Object.keys(this._definition).length; f++) {
        const p = Object.keys(this._definition)[f], y = this._definition[p];
        if (y.explicit) {
          if (y.alias && ` ${e} `.match(new RegExp(`\\s-${y.alias}\\s`)))
            return;
          if (` ${e} `.match(new RegExp(`\\s--${c}\\s`)))
            return;
          delete o[c];
        }
      }
    }), Object.keys(o).forEach((c) => {
      for (let f = 0; f < Object.keys(this._definition).length; f++) {
        const p = Object.keys(this._definition)[f], y = this._definition[p];
        y.alias && y.alias === c && o[p] === void 0 && (o[p] = o[c], delete o[c]);
      }
    }), Object.keys(o).forEach((c, f) => {
      if (c === `${f}`) {
        const p = Object.keys(this._definition);
        p[f] && (o[p[f]] = o[c]), delete o[c];
      }
    }));
    const s = new Ue(Object.assign({ type: "Object", rules: this._definition }, (n = i.descriptor) !== null && n !== void 0 ? n : {}));
    i.baseObj && (o = W(i.baseObj, o));
    for (let [c, f] of Object.entries(this._definition))
      ye(f.default) && ye(o[c]) && (o[c] = W(f.default, o[c]));
    const l = s.apply(o);
    if (l.hasIssues())
      throw new Error(l.toString());
    let u = l.value;
    return i.stripUnkown || (u = W(o, u)), u;
  }
}
rr.description = "";
rr._registeredRenderers = {};
globalThis && globalThis.__awaiter;
globalThis && globalThis.__awaiter;
globalThis && globalThis.__awaiter;
var Fi, Li;
let ct = 0, ut = 0;
const fr = 0;
try {
  (Fi = document == null ? void 0 : document.addEventListener) === null || Fi === void 0 || Fi.call(document, "pointermove", (t) => {
    qs(t);
  }), (Li = document == null ? void 0 : document.addEventListener) === null || Li === void 0 || Li.call(document, "pointerdown", (t) => {
    qs(t);
  });
} catch {
}
function qs(t) {
  t.pageX < ct - fr ? (ct - t.pageX, ct = t.pageX) : t.pageX > ct + fr && (t.pageX - ct, ct = t.pageX), t.pageY < ut - fr ? (ut - t.pageY, ut = t.pageY) : t.pageY > ut + fr && (t.pageY - ut, ut = t.pageY);
}
globalThis && globalThis.__awaiter;
var Hi, Di;
let pr = !1, dr;
try {
  (Hi = document == null ? void 0 : document.addEventListener) === null || Hi === void 0 || Hi.call(document, "wheel", (t) => {
    pr = !0, clearTimeout(dr), dr = setTimeout(() => {
      pr = !1;
    }, 200);
  }), (Di = document == null ? void 0 : document.addEventListener) === null || Di === void 0 || Di.call(document, "touchmove", (t) => {
    pr = !0, clearTimeout(dr), dr = setTimeout(() => {
      pr = !1;
    }, 200);
  });
} catch {
}
const Ni = {};
function Vh() {
  for (let [t, e] of Object.entries(Ni)) {
    let r = 9999999, n;
    Ni[t] = Ni[t].filter((i) => {
      const o = i.$target.getBoundingClientRect();
      if (!i.$target.isConnected)
        return !1;
      const s = 100 / window.innerHeight * o.top;
      return s < i.percentY && Math.abs(s) - i.percentY < r && (r = Math.abs(s) - i.percentY, n = i.$target), !0;
    });
    for (let i of e)
      if (i.$target === n) {
        if (i.lastEmittedEvent === "activate")
          continue;
        i.emit("activate", i.$target), i.lastEmittedEvent = "activate";
      } else {
        if (i.lastEmittedEvent === "unactivate")
          continue;
        i.emit("unactivate", i.$target), i.lastEmittedEvent = "unactivate";
      }
  }
}
document.addEventListener("scroll", () => {
  Vh();
});
let Yh;
try {
  Yh = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame;
} catch {
}
globalThis && globalThis.__awaiter;
let Xh = {};
try {
  Xh = {
    a: window.HTMLAnchorElement,
    audio: window.HTMLAudioElement,
    body: window.HTMLBodyElement,
    button: window.HTMLButtonElement,
    canvas: window.HTMLCanvasElement,
    dl: window.HTMLDListElement,
    data: window.HTMLDataElement,
    datalist: window.HTMLDataListElement,
    details: window.HTMLDetailsElement,
    // dialog: window.HTMLDialogElement,
    dir: window.HTMLDirectoryElement,
    div: window.HTMLDivElement,
    html: window.HTMLDocument,
    embed: window.HTMLEmbedElement,
    fieldset: window.HTMLFieldSetElement,
    font: window.HTMLFontElement,
    form: window.HTMLFormElement,
    frame: window.HTMLFrameElement,
    h1: window.HTMLTitleElement,
    h2: window.HTMLTitleElement,
    h3: window.HTMLTitleElement,
    h4: window.HTMLTitleElement,
    h5: window.HTMLTitleElement,
    h6: window.HTMLTitleElement,
    head: window.HTMLHeadElement,
    html: window.HTMLHtmlElement,
    iframe: window.HTMLIFrameElement,
    img: window.HTMLImageElement,
    input: window.HTMLInputElement,
    label: window.HTMLLabelElement,
    legend: window.HTMLLegendElement,
    link: window.HTMLLinkElement,
    map: window.HTMLMapElement,
    marquee: window.HTMLMarqueeElement,
    media: window.HTMLMediaElement,
    menu: window.HTMLMenuElement,
    meta: window.HTMLMetaElement,
    meter: window.HTMLMeterElement,
    del: window.HTMLModElement,
    ins: window.HTMLModElement,
    dol: window.HTMLOListElement,
    object: window.HTMLObjectElement,
    optgroup: window.HTMLOptGroupElement,
    option: window.HTMLOptionElement,
    output: window.HTMLOutputElement,
    p: window.HTMLParagraphElement,
    param: window.HTMLParamElement,
    picture: window.HTMLPictureElement,
    pre: window.HTMLPreElement,
    progress: window.HTMLProgressElement,
    quote: window.HTMLQuoteElement,
    script: window.HTMLScriptElement,
    select: window.HTMLSelectElement,
    slot: window.HTMLSlotElement,
    source: window.HTMLSourceElement,
    span: window.HTMLSpanElement,
    style: window.HTMLStyleElement,
    td: window.HTMLTableCellElement,
    th: window.HTMLTableCellElement,
    col: window.HTMLTableColElement,
    colgroup: window.HTMLTableColElement,
    table: window.HTMLTableElement,
    tr: window.HTMLTableRowElement,
    tfoot: window.HTMLTableSectionElement,
    thead: window.HTMLTableSectionElement,
    tbody: window.HTMLTableSectionElement,
    template: window.HTMLTemplateElement,
    textarea: window.HTMLTextAreaElement,
    time: window.HTMLTimeElement,
    title: window.HTMLTitleElement,
    track: window.HTMLTrackElement,
    ul: window.HTMLUListElement,
    video: window.HTMLVideoElement,
    area: window.HTMLAreaElement
  };
} catch {
}
var Wi = typeof navigator < "u" ? navigator.userAgent.toLowerCase().indexOf("firefox") > 0 : !1;
function Ui(t, e, r, n) {
  t.addEventListener ? t.addEventListener(e, r, n) : t.attachEvent && t.attachEvent("on".concat(e), function() {
    r(window.event);
  });
}
function Ac(t, e) {
  for (var r = e.slice(0, e.length - 1), n = 0; n < r.length; n++)
    r[n] = t[r[n].toLowerCase()];
  return r;
}
function jc(t) {
  typeof t != "string" && (t = ""), t = t.replace(/\s/g, "");
  for (var e = t.split(","), r = e.lastIndexOf(""); r >= 0; )
    e[r - 1] += ",", e.splice(r, 1), r = e.lastIndexOf("");
  return e;
}
function Jh(t, e) {
  for (var r = t.length >= e.length ? t : e, n = t.length >= e.length ? e : t, i = !0, o = 0; o < r.length; o++)
    n.indexOf(r[o]) === -1 && (i = !1);
  return i;
}
var Jt = {
  backspace: 8,
  "⌫": 8,
  tab: 9,
  clear: 12,
  enter: 13,
  "↩": 13,
  return: 13,
  esc: 27,
  escape: 27,
  space: 32,
  left: 37,
  up: 38,
  right: 39,
  down: 40,
  del: 46,
  delete: 46,
  ins: 45,
  insert: 45,
  home: 36,
  end: 35,
  pageup: 33,
  pagedown: 34,
  capslock: 20,
  num_0: 96,
  num_1: 97,
  num_2: 98,
  num_3: 99,
  num_4: 100,
  num_5: 101,
  num_6: 102,
  num_7: 103,
  num_8: 104,
  num_9: 105,
  num_multiply: 106,
  num_add: 107,
  num_enter: 108,
  num_subtract: 109,
  num_decimal: 110,
  num_divide: 111,
  "⇪": 20,
  ",": 188,
  ".": 190,
  "/": 191,
  "`": 192,
  "-": Wi ? 173 : 189,
  "=": Wi ? 61 : 187,
  ";": Wi ? 59 : 186,
  "'": 222,
  "[": 219,
  "]": 221,
  "\\": 220
}, je = {
  // shiftKey
  "⇧": 16,
  shift: 16,
  // altKey
  "⌥": 18,
  alt: 18,
  option: 18,
  // ctrlKey
  "⌃": 17,
  ctrl: 17,
  control: 17,
  // metaKey
  "⌘": 91,
  cmd: 91,
  command: 91
}, _o = {
  16: "shiftKey",
  18: "altKey",
  17: "ctrlKey",
  91: "metaKey",
  shiftKey: 16,
  ctrlKey: 17,
  altKey: 18,
  metaKey: 91
}, Q = {
  16: !1,
  18: !1,
  17: !1,
  91: !1
}, z = {};
for (var yr = 1; yr < 20; yr++)
  Jt["f".concat(yr)] = 111 + yr;
var G = [], Ks = !1, $c = "all", xc = [], Wr = function(e) {
  return Jt[e.toLowerCase()] || je[e.toLowerCase()] || e.toUpperCase().charCodeAt(0);
}, Zh = function(e) {
  return Object.keys(Jt).find(function(r) {
    return Jt[r] === e;
  });
}, Qh = function(e) {
  return Object.keys(je).find(function(r) {
    return je[r] === e;
  });
};
function kc(t) {
  $c = t || "all";
}
function Zt() {
  return $c || "all";
}
function eg() {
  return G.slice(0);
}
function tg() {
  return G.map(function(t) {
    return Zh(t) || Qh(t) || String.fromCharCode(t);
  });
}
function rg(t) {
  var e = t.target || t.srcElement, r = e.tagName, n = !0;
  return (e.isContentEditable || (r === "INPUT" || r === "TEXTAREA" || r === "SELECT") && !e.readOnly) && (n = !1), n;
}
function ng(t) {
  return typeof t == "string" && (t = Wr(t)), G.indexOf(t) !== -1;
}
function ig(t, e) {
  var r, n;
  t || (t = Zt());
  for (var i in z)
    if (Object.prototype.hasOwnProperty.call(z, i))
      for (r = z[i], n = 0; n < r.length; )
        r[n].scope === t ? r.splice(n, 1) : n++;
  Zt() === t && kc(e || "all");
}
function og(t) {
  var e = t.keyCode || t.which || t.charCode, r = G.indexOf(e);
  if (r >= 0 && G.splice(r, 1), t.key && t.key.toLowerCase() === "meta" && G.splice(0, G.length), (e === 93 || e === 224) && (e = 91), e in Q) {
    Q[e] = !1;
    for (var n in je)
      je[n] === e && (Be[n] = !1);
  }
}
function sg(t) {
  if (typeof t > "u")
    Object.keys(z).forEach(function(s) {
      return delete z[s];
    });
  else if (Array.isArray(t))
    t.forEach(function(s) {
      s.key && Gi(s);
    });
  else if (typeof t == "object")
    t.key && Gi(t);
  else if (typeof t == "string") {
    for (var e = arguments.length, r = new Array(e > 1 ? e - 1 : 0), n = 1; n < e; n++)
      r[n - 1] = arguments[n];
    var i = r[0], o = r[1];
    typeof i == "function" && (o = i, i = ""), Gi({
      key: t,
      scope: i,
      method: o,
      splitKey: "+"
    });
  }
}
var Gi = function(e) {
  var r = e.key, n = e.scope, i = e.method, o = e.splitKey, s = o === void 0 ? "+" : o, l = jc(r);
  l.forEach(function(u) {
    var c = u.split(s), f = c.length, p = c[f - 1], y = p === "*" ? "*" : Wr(p);
    if (z[y]) {
      n || (n = Zt());
      var g = f > 1 ? Ac(je, c) : [];
      z[y] = z[y].filter(function(m) {
        var b = i ? m.method === i : !0;
        return !(b && m.scope === n && Jh(m.mods, g));
      });
    }
  });
};
function zs(t, e, r, n) {
  if (e.element === n) {
    var i;
    if (e.scope === r || e.scope === "all") {
      i = e.mods.length > 0;
      for (var o in Q)
        Object.prototype.hasOwnProperty.call(Q, o) && (!Q[o] && e.mods.indexOf(+o) > -1 || Q[o] && e.mods.indexOf(+o) === -1) && (i = !1);
      (e.mods.length === 0 && !Q[16] && !Q[18] && !Q[17] && !Q[91] || i || e.shortcut === "*") && e.method(t, e) === !1 && (t.preventDefault ? t.preventDefault() : t.returnValue = !1, t.stopPropagation && t.stopPropagation(), t.cancelBubble && (t.cancelBubble = !0));
    }
  }
}
function Vs(t, e) {
  var r = z["*"], n = t.keyCode || t.which || t.charCode;
  if (Be.filter.call(this, t)) {
    if ((n === 93 || n === 224) && (n = 91), G.indexOf(n) === -1 && n !== 229 && G.push(n), ["ctrlKey", "altKey", "shiftKey", "metaKey"].forEach(function(m) {
      var b = _o[m];
      t[m] && G.indexOf(b) === -1 ? G.push(b) : !t[m] && G.indexOf(b) > -1 ? G.splice(G.indexOf(b), 1) : m === "metaKey" && t[m] && G.length === 3 && (t.ctrlKey || t.shiftKey || t.altKey || (G = G.slice(G.indexOf(b))));
    }), n in Q) {
      Q[n] = !0;
      for (var i in je)
        je[i] === n && (Be[i] = !0);
      if (!r)
        return;
    }
    for (var o in Q)
      Object.prototype.hasOwnProperty.call(Q, o) && (Q[o] = t[_o[o]]);
    t.getModifierState && !(t.altKey && !t.ctrlKey) && t.getModifierState("AltGraph") && (G.indexOf(17) === -1 && G.push(17), G.indexOf(18) === -1 && G.push(18), Q[17] = !0, Q[18] = !0);
    var s = Zt();
    if (r)
      for (var l = 0; l < r.length; l++)
        r[l].scope === s && (t.type === "keydown" && r[l].keydown || t.type === "keyup" && r[l].keyup) && zs(t, r[l], s, e);
    if (n in z) {
      for (var u = 0; u < z[n].length; u++)
        if ((t.type === "keydown" && z[n][u].keydown || t.type === "keyup" && z[n][u].keyup) && z[n][u].key) {
          for (var c = z[n][u], f = c.splitKey, p = c.key.split(f), y = [], g = 0; g < p.length; g++)
            y.push(Wr(p[g]));
          y.sort().join("") === G.sort().join("") && zs(t, c, s, e);
        }
    }
  }
}
function ag(t) {
  return xc.indexOf(t) > -1;
}
function Be(t, e, r) {
  G = [];
  var n = jc(t), i = [], o = "all", s = document, l = 0, u = !1, c = !0, f = "+", p = !1;
  for (r === void 0 && typeof e == "function" && (r = e), Object.prototype.toString.call(e) === "[object Object]" && (e.scope && (o = e.scope), e.element && (s = e.element), e.keyup && (u = e.keyup), e.keydown !== void 0 && (c = e.keydown), e.capture !== void 0 && (p = e.capture), typeof e.splitKey == "string" && (f = e.splitKey)), typeof e == "string" && (o = e); l < n.length; l++)
    t = n[l].split(f), i = [], t.length > 1 && (i = Ac(je, t)), t = t[t.length - 1], t = t === "*" ? "*" : Wr(t), t in z || (z[t] = []), z[t].push({
      keyup: u,
      keydown: c,
      scope: o,
      mods: i,
      shortcut: n[l],
      method: r,
      key: n[l],
      splitKey: f,
      element: s
    });
  typeof s < "u" && !ag(s) && window && (xc.push(s), Ui(s, "keydown", function(y) {
    Vs(y, s);
  }, p), Ks || (Ks = !0, Ui(window, "focus", function() {
    G = [];
  }, p)), Ui(s, "keyup", function(y) {
    Vs(y, s), og(y);
  }, p));
}
function cg(t) {
  var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "all";
  Object.keys(z).forEach(function(r) {
    var n = z[r].filter(function(i) {
      return i.scope === e && i.shortcut === t;
    });
    n.forEach(function(i) {
      i && i.method && i.method();
    });
  });
}
var qi = {
  getPressedKeyString: tg,
  setScope: kc,
  getScope: Zt,
  deleteScope: ig,
  getPressedKeyCodes: eg,
  isPressed: ng,
  filter: rg,
  trigger: cg,
  unbind: sg,
  keyMap: Jt,
  modifier: je,
  modifierMap: _o
};
for (var Ki in qi)
  Object.prototype.hasOwnProperty.call(qi, Ki) && (Be[Ki] = qi[Ki]);
if (typeof window < "u") {
  var ug = window.hotkeys;
  Be.noConflict = function(t) {
    return t && window.hotkeys === Be && (window.hotkeys = ug), Be;
  }, window.hotkeys = Be;
}
var lg = Be;
const So = /* @__PURE__ */ We(lg);
So.filter = function() {
  return !0;
};
function Oo(t, e = {}) {
  return e = Object.assign({ rootNode: [document], keyup: !1, keydown: !0, once: !1, splitKey: "+", title: t, description: null, private: !1 }, e), Array.isArray(e.rootNode) || (e.rootNode = [e.rootNode]), new Xt(({ resolve: r, reject: n, emit: i, cancel: o }) => {
    e.rootNode.forEach((s) => {
      var l;
      const u = (l = s.ownerDocument) !== null && l !== void 0 ? l : s;
      e.private || (u != null && u.env || (u.env = {}), u.env.HOTKEYS || (u.env.HOTKEYS = {}), u.env.HOTKEYS[t] || setTimeout(() => {
        var c;
        s.dispatchEvent(new CustomEvent("hotkeys.update", {
          bubbles: !0,
          detail: (c = u.env) === null || c === void 0 ? void 0 : c.HOTKEYS
        }));
      }), u.env.HOTKEYS[t] = {
        title: e.title,
        description: e.description,
        hotkey: t
      }), So(t, Object.assign({ element: s }, e), (c, f) => {
        i("press", c), e.once && o();
      });
    });
  }, {
    id: "hotkey"
  }).on("finally", () => {
    e.rootNode.forEach((r) => {
      var n, i, o;
      const s = (n = r.ownerDocument) !== null && n !== void 0 ? n : r;
      (i = s.env) === null || i === void 0 || delete i.HOTKEYS[t], r.dispatchEvent(new CustomEvent("hotkeys.update", {
        bubbles: !0,
        detail: (o = s.env) === null || o === void 0 ? void 0 : o.HOTKEYS
      }));
    }), So.unbind(t);
  });
}
const rt = [];
let zi = !1;
function fg(t, e) {
  return new Xt(({ resolve: r, reject: n, on: i }) => {
    var o;
    const s = Object.assign({ rootNode: document }, e ?? {});
    (Array.isArray(s.rootNode) ? s.rootNode : [s.rootNode]).forEach((c) => {
      c._escapeQueue || (c._escapeQueue = !0, Oo("escape", {
        rootNode: c,
        private: !0
      }).on("press", () => {
        var f;
        if (!rt.length || zi)
          return;
        zi = !0, setTimeout(() => {
          zi = !1;
        });
        const p = rt.pop();
        (f = p.callback) === null || f === void 0 || f.call(p), p.resolve();
      }));
    });
    const u = {
      id: (o = s.id) !== null && o !== void 0 ? o : Kt(),
      callback: t,
      resolve: r
    };
    if (s.id) {
      const c = rt.find((f) => f.id === s.id);
      c ? (c.callback = t, c.resolve = r) : rt.push(u);
    } else
      rt.push(u);
    i("cancel", () => {
      rt.splice(rt.indexOf(u, 1));
    });
  });
}
const pg = `.s-dashboard-iframe{position:fixed;z-index:9999;top:0;left:0;width:100%;height:100%;background:radial-gradient(ellipse at top left,hsla(calc(var(--s-color-main-h, 0) + var(--s-color-main-spin ,0)),calc((var(--s-color-main-s, 0)) * 1%),calc((var(--s-color-main-l, 0) + 25) * 1%),.1),hsla(calc(var(--s-color-main-h, 0) + var(--s-color-main-spin ,0)),calc((var(--s-color-main-s, 0)) * 1%),calc((var(--s-color-main-l, 0) + 35) * 1%),.2))}[theme$=dark] .s-dashboard-iframe,.s-dashboard-iframe[theme$=dark]{background:radial-gradient(ellipse at top left,hsla(calc(var(--s-color-main-h, 0) + var(--s-color-main-spin ,0)),calc((var(--s-color-main-s, 0)) * 1%),calc((var(--s-color-main-l, 0) + -25) * 1%),.1),hsla(calc(var(--s-color-main-h, 0) + var(--s-color-main-spin ,0)),calc((var(--s-color-main-s, 0)) * 1%),calc((var(--s-color-main-l, 0) + -35) * 1%),.2))}.s-dashboard-iframe{background-attachment:fixed;pointer-events:none;opacity:0;-webkit-backdrop-filter:blur(40px);backdrop-filter:blur(40px);transition:all .1s cubic-bezier(.7,0,.305,.995)!important}.s-dashboard-iframe.active{pointer-events:all;opacity:1}
`;
class dg extends rr {
  static get _definition() {
    return {
      layout: {
        description: "Specify the layout of the dashboard with the components you want to display in which column",
        type: "Array",
        default: He.get("dashboard.layout")
      },
      widgets: {
        description: "Specify each widget settings if wanted to customize default behaviors",
        type: "Object",
        default: {}
      }
    };
  }
}
class yg extends ht {
  /**
   * @name            constructor
   * @type            Function
   *
   * Constructor
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  constructor(e) {
    super(
      W(
        // @ts-ignore
        dg.defaults(),
        e ?? {}
      )
    ), this._defined = !1, this._webVitalsInjected = !1, Cc(pg), document.dashboard = this, this._$iframe = document.createElement("iframe"), this._$iframe.classList.add("s-dashboard-iframe"), this._$focusItem = document.createElement("div"), this._$focusItem.setAttribute("tabindex", "-1"), this._$focusItem.style.position = "fixed", this._$focusItem.style.top = "0", this._$focusItem.style.left = "0", document.body.appendChild(this._$focusItem), Oo("ctrl+s").on("press", () => {
      this.open();
    }), Oo("ctrl+y").on("press", () => {
      this.open();
    }), this._injectWebVitals();
  }
  /**
   * @name            iframe
   * @type            HTMLIframeElement
   * @get
   *
   * Access the dashboard iframe
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  static get iframe() {
    return document.querySelector("iframe.s-dashboard-iframe");
  }
  /**
   * @name            document
   * @type            Document
   * @get
   *
   * Access the document that the dashboard is using.
   * If in an iframe, take the parent document, otherwise, the document itself
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  get document() {
    var e;
    return ((e = window.parent) == null ? void 0 : e.document) ?? document;
  }
  _injectWebVitals() {
    if (this._webVitalsInjected)
      return;
    this._webVitalsInjected = !0;
    const e = document.createElement("script");
    e.setAttribute("type", "module"), e.text = `
            import {getCLS, getFID, getLCP, getFCP, getTTFB} from 'https://unpkg.com/web-vitals?module';
            getCLS(function(res) {
                document.webVitals.cls = res;
                document.dispatchEvent(new CustomEvent('webVitals', {
                    detail: document.webVitals
                }));
            });
            getFID(function(res) {
                document.webVitals.fid = res;
                document.dispatchEvent(new CustomEvent('webVitals', {
                    detail: document.webVitals
                }));
            });
            getLCP(function(res) {
                document.webVitals.lcp = res;
                document.dispatchEvent(new CustomEvent('webVitals', {
                    detail: document.webVitals
                }));
            });
            getFCP(function(res) {
                document.webVitals.fcp = res;
                document.dispatchEvent(new CustomEvent('webVitals', {
                    detail: document.webVitals
                }));
            });
            getTTFB(function(res) {
                document.webVitals.ttfb = res;
                document.dispatchEvent(new CustomEvent('webVitals', {
                    detail: document.webVitals
                }));
            });
        `, document.webVitals = {}, this.document.body.appendChild(e);
  }
  /**
   * @name            changePage
   * @type            Function
   *
   * Open the dashboard with the pages component selected
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  // changePage() {
  //     // open the dashboard
  //     this.open();
  //     // @ts-ignore
  //     this._$iframe.contentDocument?.dispatchEvent(
  //         new CustomEvent('dashboard.changePage', {}),
  //     );
  //     // @ts-ignore
  //     this._$iframe.contentDocument.isChangePageWanted = true;
  // }
  /**
   * @name            open
   * @type            Function
   *
   * Open the dashboard
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  close() {
    this._$iframe.classList.remove("active"), this.document.querySelector("html").style.removeProperty("overflow"), setTimeout(() => {
      this._$focusItem.focus();
    }, 100);
  }
  /**
   * @name            open
   * @type            Function
   *
   * Open the dashboard
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  async open() {
    this._$iframe.parentElement || (document.body.appendChild(this._$iframe), this._$iframe.contentWindow.document.open(), this._$iframe.contentWindow.document.write(`
                <html>
                <head>
                    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1">
                    <script>
                        var $document = document;
                        if (window.parent) {
                            $document = window.parent.document;
                        }
                        var $html = $document.querySelector('html');
                        var $dashboardHtml = document.querySelector('html');
                        var theme = $html.getAttribute('theme');
                        var isDark = theme.match(/dark$/);
                        if (isDark && window.parent) {
                            $dashboardHtml.setAttribute('theme', 'default-dark');
                        } else {
                            $dashboardHtml.setAttribute('theme', 'default-light');
                        }
                        $document.addEventListener('s-theme.change', function(e) {
                            $dashboardHtml.setAttribute('theme', 'default-' + e.detail.variant);
                        });
                    <\/script>
                    ${this.settings.env === "development" ? '<script src="http://localhost:3000/sugar/dashboard/init.js" type="module" defer><\/script>' : '<script src="https://cdnv2.coffeekraken.io/s-dashboard/init/init.js" type="module" defer><\/script>'}
                </head>
                <body s-sugar>
                    <s-dashboard></s-dashboard>
                </body>
                </html>
            `), this._$iframe.contentWindow.document.close()), this._$iframe.classList.add("active"), this.document.querySelector("html").style.overflow = "hidden", fg(
      () => {
        _console.log("CLOSE"), this.close();
      },
      {
        rootNode: [document, this.document]
      }
    );
  }
}
(() => {
  function t(e) {
    (e.key === "s" || e.key === "y") && e.ctrlKey && (document.removeEventListener("keyup", t), new yg({
      layout: [
        [
          "s-dashboard-browserstack",
          "s-dashboard-web-vitals",
          "s-dashboard-assets",
          "s-dashboard-google"
        ],
        ["s-dashboard-frontend-checker"]
      ],
      widgets: {},
      env: e.key === "y" ? "development" : "production"
    }).open());
  }
  document.addEventListener("keyup", t);
})();
