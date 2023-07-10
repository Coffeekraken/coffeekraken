class dt {
  static extends(e) {
    class r extends e {
      constructor(i, ...o) {
        super(...o), this.settings = {}, Do(this, i), this.metas = er(this), Object.defineProperty(this, "metas", {
          enumerable: !0,
          value: er(this)
        });
      }
      expose(i, o) {
        return Mo(this, i, o);
      }
      toPlainObject() {
        return Fo(this);
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
    this.settings = {}, Do(this, e), this.metas = er(this), Object.defineProperty(this, "metas", {
      enumerable: !0,
      value: er(this)
    });
  }
  expose(e, r) {
    return Mo(this, e, r);
  }
  toPlainObject() {
    return Fo(this);
  }
}
function er(t) {
  var e, r, n, i, o, s, f, c;
  let u = `<yellow>${((e = t.settings.metas) === null || e === void 0 ? void 0 : e.name) || ""}</yellow>`;
  return !((r = t.settings.metas) === null || r === void 0) && r.id && (u += ` <cyan>${t.settings.metas.id}</cyan>`), {
    id: (i = (n = t.settings.metas) === null || n === void 0 ? void 0 : n.id) !== null && i !== void 0 ? i : t.constructor.name,
    name: (s = (o = t.settings.metas) === null || o === void 0 ? void 0 : o.name) !== null && s !== void 0 ? s : t.constructor.name,
    formattedName: u,
    color: (c = (f = t.settings.metas) === null || f === void 0 ? void 0 : f.color) !== null && c !== void 0 ? c : "yellow"
  };
}
function Mo(t, e, r) {
  var n;
  r = Object.assign({ as: void 0, props: [] }, r ?? {}), r.as && typeof r.as == "string" && (t[r.as] = e), (n = r == null ? void 0 : r.props) === null || n === void 0 || n.forEach((i) => {
    e[i].bind && typeof e[i].bind == "function" ? t[i] = e[i].bind(e) : t[i] = e[i];
  });
}
function Fo(t) {
  return JSON.parse(JSON.stringify(t));
}
function Do(t, e = {}) {
  var r;
  t.settings = e, t.settings.metas || (t.settings.metas = {}), !((r = t.settings.metas) === null || r === void 0) && r.id || (t.settings.metas.id = t.constructor.name), t.settings.metas.color = "yellow";
}
function ye(t) {
  return !(!t || typeof t != "object" || t.constructor && t.constructor.name !== "Object" || Object.prototype.toString.call(t) !== "[object Object]" || t !== Object(t));
}
function wc(t) {
  t || (t = "");
  let e = "";
  const r = /(?:^|[_-\s])(\w)/g;
  return e = t.replace(r, function(n, i) {
    return i ? i.toUpperCase() : "";
  }), e = e.substr(0, 1).toLowerCase() + e.slice(1), e.trim();
}
function _c(t) {
  return wc(t);
}
function Ds(t, e) {
  const r = Object.assign({ deep: !0 }, e ?? {});
  for (let [n, i] of Object.entries(t)) {
    const o = _c(n);
    ye(i) && r.deep ? t[o] = Ds(t[n], r) : t[o] = i, o !== n && delete t[n];
  }
  return t;
}
var Q = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function We(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
function Sc(t) {
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
var hr = { exports: {} };
hr.exports;
(function(t, e) {
  var r = 200, n = "__lodash_hash_undefined__", i = 9007199254740991, o = "[object Arguments]", s = "[object Array]", f = "[object Boolean]", c = "[object Date]", u = "[object Error]", l = "[object Function]", p = "[object GeneratorFunction]", y = "[object Map]", g = "[object Number]", v = "[object Object]", b = "[object Promise]", $ = "[object RegExp]", x = "[object Set]", m = "[object String]", O = "[object Symbol]", S = "[object WeakMap]", T = "[object ArrayBuffer]", C = "[object DataView]", R = "[object Float32Array]", D = "[object Float64Array]", N = "[object Int8Array]", q = "[object Int16Array]", Y = "[object Int32Array]", J = "[object Uint8Array]", te = "[object Uint8ClampedArray]", fe = "[object Uint16Array]", oe = "[object Uint32Array]", be = /[\\^$.*+?()[\]{}|]/g, Oe = /\w*$/, Ae = /^\[object .+?Constructor\]$/, le = /^(?:0|[1-9]\d*)$/, k = {};
  k[o] = k[s] = k[T] = k[C] = k[f] = k[c] = k[R] = k[D] = k[N] = k[q] = k[Y] = k[y] = k[g] = k[v] = k[$] = k[x] = k[m] = k[O] = k[J] = k[te] = k[fe] = k[oe] = !0, k[u] = k[l] = k[S] = !1;
  var j = typeof Q == "object" && Q && Q.Object === Object && Q, A = typeof self == "object" && self && self.Object === Object && self, _ = j || A || Function("return this")(), E = e && !e.nodeType && e, gt = E && !0 && t && !t.nodeType && t, Dr = gt && gt.exports === E;
  function Nr(a, d) {
    return a.set(d[0], d[1]), a;
  }
  function Lr(a, d) {
    return a.add(d), a;
  }
  function Hr(a, d) {
    for (var h = -1, w = a ? a.length : 0; ++h < w && d(a[h], h, a) !== !1; )
      ;
    return a;
  }
  function Wr(a, d) {
    for (var h = -1, w = d.length, B = a.length; ++h < w; )
      a[B + h] = d[h];
    return a;
  }
  function bt(a, d, h, w) {
    var B = -1, L = a ? a.length : 0;
    for (w && L && (h = a[++B]); ++B < L; )
      h = d(h, a[B], B, a);
    return h;
  }
  function Ur(a, d) {
    for (var h = -1, w = Array(a); ++h < a; )
      w[h] = d(h);
    return w;
  }
  function Gr(a, d) {
    return a == null ? void 0 : a[d];
  }
  function vt(a) {
    var d = !1;
    if (a != null && typeof a.toString != "function")
      try {
        d = !!(a + "");
      } catch {
      }
    return d;
  }
  function mt(a) {
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
  function wt(a) {
    var d = -1, h = Array(a.size);
    return a.forEach(function(w) {
      h[++d] = w;
    }), h;
  }
  var Kr = Array.prototype, qr = Function.prototype, xe = Object.prototype, Ke = _["__core-js_shared__"], _t = function() {
    var a = /[^.]+$/.exec(Ke && Ke.keys && Ke.keys.IE_PROTO || "");
    return a ? "Symbol(src)_1." + a : "";
  }(), St = qr.toString, X = xe.hasOwnProperty, Te = xe.toString, Vr = RegExp(
    "^" + St.call(X).replace(be, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  ), Ot = Dr ? _.Buffer : void 0, At = _.Symbol, jt = _.Uint8Array, zr = Ge(Object.getPrototypeOf, Object), Yr = Object.create, Jr = xe.propertyIsEnumerable, Xr = Kr.splice, Et = Object.getOwnPropertySymbols, Zr = Ot ? Ot.isBuffer : void 0, Qr = Ge(Object.keys, Object), qe = ce(_, "DataView"), ve = ce(_, "Map"), Ve = ce(_, "Promise"), ze = ce(_, "Set"), Ye = ce(_, "WeakMap"), me = ce(Object, "create"), en = ie(qe), tn = ie(ve), rn = ie(Ve), nn = ie(ze), on = ie(Ye), $t = At ? At.prototype : void 0, xt = $t ? $t.valueOf : void 0;
  function re(a) {
    var d = -1, h = a ? a.length : 0;
    for (this.clear(); ++d < h; ) {
      var w = a[d];
      this.set(w[0], w[1]);
    }
  }
  function sn() {
    this.__data__ = me ? me(null) : {};
  }
  function an(a) {
    return this.has(a) && delete this.__data__[a];
  }
  function cn(a) {
    var d = this.__data__;
    if (me) {
      var h = d[a];
      return h === n ? void 0 : h;
    }
    return X.call(d, a) ? d[a] : void 0;
  }
  function un(a) {
    var d = this.__data__;
    return me ? d[a] !== void 0 : X.call(d, a);
  }
  function fn(a, d) {
    var h = this.__data__;
    return h[a] = me && d === void 0 ? n : d, this;
  }
  re.prototype.clear = sn, re.prototype.delete = an, re.prototype.get = cn, re.prototype.has = un, re.prototype.set = fn;
  function z(a) {
    var d = -1, h = a ? a.length : 0;
    for (this.clear(); ++d < h; ) {
      var w = a[d];
      this.set(w[0], w[1]);
    }
  }
  function ln() {
    this.__data__ = [];
  }
  function pn(a) {
    var d = this.__data__, h = ke(d, a);
    if (h < 0)
      return !1;
    var w = d.length - 1;
    return h == w ? d.pop() : Xr.call(d, h, 1), !0;
  }
  function dn(a) {
    var d = this.__data__, h = ke(d, a);
    return h < 0 ? void 0 : d[h][1];
  }
  function yn(a) {
    return ke(this.__data__, a) > -1;
  }
  function hn(a, d) {
    var h = this.__data__, w = ke(h, a);
    return w < 0 ? h.push([a, d]) : h[w][1] = d, this;
  }
  z.prototype.clear = ln, z.prototype.delete = pn, z.prototype.get = dn, z.prototype.has = yn, z.prototype.set = hn;
  function se(a) {
    var d = -1, h = a ? a.length : 0;
    for (this.clear(); ++d < h; ) {
      var w = a[d];
      this.set(w[0], w[1]);
    }
  }
  function gn() {
    this.__data__ = {
      hash: new re(),
      map: new (ve || z)(),
      string: new re()
    };
  }
  function bn(a) {
    return Ce(this, a).delete(a);
  }
  function vn(a) {
    return Ce(this, a).get(a);
  }
  function mn(a) {
    return Ce(this, a).has(a);
  }
  function wn(a, d) {
    return Ce(this, a).set(a, d), this;
  }
  se.prototype.clear = gn, se.prototype.delete = bn, se.prototype.get = vn, se.prototype.has = mn, se.prototype.set = wn;
  function ae(a) {
    this.__data__ = new z(a);
  }
  function _n() {
    this.__data__ = new z();
  }
  function Sn(a) {
    return this.__data__.delete(a);
  }
  function On(a) {
    return this.__data__.get(a);
  }
  function An(a) {
    return this.__data__.has(a);
  }
  function jn(a, d) {
    var h = this.__data__;
    if (h instanceof z) {
      var w = h.__data__;
      if (!ve || w.length < r - 1)
        return w.push([a, d]), this;
      h = this.__data__ = new se(w);
    }
    return h.set(a, d), this;
  }
  ae.prototype.clear = _n, ae.prototype.delete = Sn, ae.prototype.get = On, ae.prototype.has = An, ae.prototype.set = jn;
  function En(a, d) {
    var h = Ze(a) || Jn(a) ? Ur(a.length, String) : [], w = h.length, B = !!w;
    for (var L in a)
      (d || X.call(a, L)) && !(B && (L == "length" || qn(L, w))) && h.push(L);
    return h;
  }
  function Tt(a, d, h) {
    var w = a[d];
    (!(X.call(a, d) && Rt(w, h)) || h === void 0 && !(d in a)) && (a[d] = h);
  }
  function ke(a, d) {
    for (var h = a.length; h--; )
      if (Rt(a[h][0], d))
        return h;
    return -1;
  }
  function $n(a, d) {
    return a && kt(d, Qe(d), a);
  }
  function Je(a, d, h, w, B, L, U) {
    var H;
    if (w && (H = L ? w(a, B, L, U) : w(a)), H !== void 0)
      return H;
    if (!Pe(a))
      return a;
    var Mt = Ze(a);
    if (Mt) {
      if (H = Un(a), !d)
        return Ln(a, H);
    } else {
      var ue = ne(a), Ft = ue == l || ue == p;
      if (Zn(a))
        return Rn(a, d);
      if (ue == v || ue == o || Ft && !L) {
        if (vt(a))
          return L ? a : {};
        if (H = Gn(Ft ? {} : a), !d)
          return Hn(a, $n(H, a));
      } else {
        if (!k[ue])
          return L ? a : {};
        H = Kn(a, ue, Je, d);
      }
    }
    U || (U = new ae());
    var Dt = U.get(a);
    if (Dt)
      return Dt;
    if (U.set(a, H), !Mt)
      var Nt = h ? Wn(a) : Qe(a);
    return Hr(Nt || a, function(et, Re) {
      Nt && (Re = et, et = a[Re]), Tt(H, Re, Je(et, d, h, w, Re, a, U));
    }), H;
  }
  function xn(a) {
    return Pe(a) ? Yr(a) : {};
  }
  function Tn(a, d, h) {
    var w = d(a);
    return Ze(a) ? w : Wr(w, h(a));
  }
  function kn(a) {
    return Te.call(a);
  }
  function Cn(a) {
    if (!Pe(a) || zn(a))
      return !1;
    var d = Bt(a) || vt(a) ? Vr : Ae;
    return d.test(ie(a));
  }
  function Pn(a) {
    if (!Pt(a))
      return Qr(a);
    var d = [];
    for (var h in Object(a))
      X.call(a, h) && h != "constructor" && d.push(h);
    return d;
  }
  function Rn(a, d) {
    if (d)
      return a.slice();
    var h = new a.constructor(a.length);
    return a.copy(h), h;
  }
  function Xe(a) {
    var d = new a.constructor(a.byteLength);
    return new jt(d).set(new jt(a)), d;
  }
  function In(a, d) {
    var h = d ? Xe(a.buffer) : a.buffer;
    return new a.constructor(h, a.byteOffset, a.byteLength);
  }
  function Bn(a, d, h) {
    var w = d ? h(mt(a), !0) : mt(a);
    return bt(w, Nr, new a.constructor());
  }
  function Mn(a) {
    var d = new a.constructor(a.source, Oe.exec(a));
    return d.lastIndex = a.lastIndex, d;
  }
  function Fn(a, d, h) {
    var w = d ? h(wt(a), !0) : wt(a);
    return bt(w, Lr, new a.constructor());
  }
  function Dn(a) {
    return xt ? Object(xt.call(a)) : {};
  }
  function Nn(a, d) {
    var h = d ? Xe(a.buffer) : a.buffer;
    return new a.constructor(h, a.byteOffset, a.length);
  }
  function Ln(a, d) {
    var h = -1, w = a.length;
    for (d || (d = Array(w)); ++h < w; )
      d[h] = a[h];
    return d;
  }
  function kt(a, d, h, w) {
    h || (h = {});
    for (var B = -1, L = d.length; ++B < L; ) {
      var U = d[B], H = w ? w(h[U], a[U], U, h, a) : void 0;
      Tt(h, U, H === void 0 ? a[U] : H);
    }
    return h;
  }
  function Hn(a, d) {
    return kt(a, Ct(a), d);
  }
  function Wn(a) {
    return Tn(a, Qe, Ct);
  }
  function Ce(a, d) {
    var h = a.__data__;
    return Vn(d) ? h[typeof d == "string" ? "string" : "hash"] : h.map;
  }
  function ce(a, d) {
    var h = Gr(a, d);
    return Cn(h) ? h : void 0;
  }
  var Ct = Et ? Ge(Et, Object) : ti, ne = kn;
  (qe && ne(new qe(new ArrayBuffer(1))) != C || ve && ne(new ve()) != y || Ve && ne(Ve.resolve()) != b || ze && ne(new ze()) != x || Ye && ne(new Ye()) != S) && (ne = function(a) {
    var d = Te.call(a), h = d == v ? a.constructor : void 0, w = h ? ie(h) : void 0;
    if (w)
      switch (w) {
        case en:
          return C;
        case tn:
          return y;
        case rn:
          return b;
        case nn:
          return x;
        case on:
          return S;
      }
    return d;
  });
  function Un(a) {
    var d = a.length, h = a.constructor(d);
    return d && typeof a[0] == "string" && X.call(a, "index") && (h.index = a.index, h.input = a.input), h;
  }
  function Gn(a) {
    return typeof a.constructor == "function" && !Pt(a) ? xn(zr(a)) : {};
  }
  function Kn(a, d, h, w) {
    var B = a.constructor;
    switch (d) {
      case T:
        return Xe(a);
      case f:
      case c:
        return new B(+a);
      case C:
        return In(a, w);
      case R:
      case D:
      case N:
      case q:
      case Y:
      case J:
      case te:
      case fe:
      case oe:
        return Nn(a, w);
      case y:
        return Bn(a, w, h);
      case g:
      case m:
        return new B(a);
      case $:
        return Mn(a);
      case x:
        return Fn(a, w, h);
      case O:
        return Dn(a);
    }
  }
  function qn(a, d) {
    return d = d ?? i, !!d && (typeof a == "number" || le.test(a)) && a > -1 && a % 1 == 0 && a < d;
  }
  function Vn(a) {
    var d = typeof a;
    return d == "string" || d == "number" || d == "symbol" || d == "boolean" ? a !== "__proto__" : a === null;
  }
  function zn(a) {
    return !!_t && _t in a;
  }
  function Pt(a) {
    var d = a && a.constructor, h = typeof d == "function" && d.prototype || xe;
    return a === h;
  }
  function ie(a) {
    if (a != null) {
      try {
        return St.call(a);
      } catch {
      }
      try {
        return a + "";
      } catch {
      }
    }
    return "";
  }
  function Yn(a) {
    return Je(a, !1, !0);
  }
  function Rt(a, d) {
    return a === d || a !== a && d !== d;
  }
  function Jn(a) {
    return Xn(a) && X.call(a, "callee") && (!Jr.call(a, "callee") || Te.call(a) == o);
  }
  var Ze = Array.isArray;
  function It(a) {
    return a != null && Qn(a.length) && !Bt(a);
  }
  function Xn(a) {
    return ei(a) && It(a);
  }
  var Zn = Zr || ri;
  function Bt(a) {
    var d = Pe(a) ? Te.call(a) : "";
    return d == l || d == p;
  }
  function Qn(a) {
    return typeof a == "number" && a > -1 && a % 1 == 0 && a <= i;
  }
  function Pe(a) {
    var d = typeof a;
    return !!a && (d == "object" || d == "function");
  }
  function ei(a) {
    return !!a && typeof a == "object";
  }
  function Qe(a) {
    return It(a) ? En(a) : Pn(a);
  }
  function ti() {
    return [];
  }
  function ri() {
    return !1;
  }
  t.exports = Yn;
})(hr, hr.exports);
var Oc = hr.exports;
const Ac = /* @__PURE__ */ We(Oc);
var gr = { exports: {} };
gr.exports;
(function(t, e) {
  var r = 200, n = "__lodash_hash_undefined__", i = 9007199254740991, o = "[object Arguments]", s = "[object Array]", f = "[object Boolean]", c = "[object Date]", u = "[object Error]", l = "[object Function]", p = "[object GeneratorFunction]", y = "[object Map]", g = "[object Number]", v = "[object Object]", b = "[object Promise]", $ = "[object RegExp]", x = "[object Set]", m = "[object String]", O = "[object Symbol]", S = "[object WeakMap]", T = "[object ArrayBuffer]", C = "[object DataView]", R = "[object Float32Array]", D = "[object Float64Array]", N = "[object Int8Array]", q = "[object Int16Array]", Y = "[object Int32Array]", J = "[object Uint8Array]", te = "[object Uint8ClampedArray]", fe = "[object Uint16Array]", oe = "[object Uint32Array]", be = /[\\^$.*+?()[\]{}|]/g, Oe = /\w*$/, Ae = /^\[object .+?Constructor\]$/, le = /^(?:0|[1-9]\d*)$/, k = {};
  k[o] = k[s] = k[T] = k[C] = k[f] = k[c] = k[R] = k[D] = k[N] = k[q] = k[Y] = k[y] = k[g] = k[v] = k[$] = k[x] = k[m] = k[O] = k[J] = k[te] = k[fe] = k[oe] = !0, k[u] = k[l] = k[S] = !1;
  var j = typeof Q == "object" && Q && Q.Object === Object && Q, A = typeof self == "object" && self && self.Object === Object && self, _ = j || A || Function("return this")(), E = e && !e.nodeType && e, gt = E && !0 && t && !t.nodeType && t, Dr = gt && gt.exports === E;
  function Nr(a, d) {
    return a.set(d[0], d[1]), a;
  }
  function Lr(a, d) {
    return a.add(d), a;
  }
  function Hr(a, d) {
    for (var h = -1, w = a ? a.length : 0; ++h < w && d(a[h], h, a) !== !1; )
      ;
    return a;
  }
  function Wr(a, d) {
    for (var h = -1, w = d.length, B = a.length; ++h < w; )
      a[B + h] = d[h];
    return a;
  }
  function bt(a, d, h, w) {
    var B = -1, L = a ? a.length : 0;
    for (w && L && (h = a[++B]); ++B < L; )
      h = d(h, a[B], B, a);
    return h;
  }
  function Ur(a, d) {
    for (var h = -1, w = Array(a); ++h < a; )
      w[h] = d(h);
    return w;
  }
  function Gr(a, d) {
    return a == null ? void 0 : a[d];
  }
  function vt(a) {
    var d = !1;
    if (a != null && typeof a.toString != "function")
      try {
        d = !!(a + "");
      } catch {
      }
    return d;
  }
  function mt(a) {
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
  function wt(a) {
    var d = -1, h = Array(a.size);
    return a.forEach(function(w) {
      h[++d] = w;
    }), h;
  }
  var Kr = Array.prototype, qr = Function.prototype, xe = Object.prototype, Ke = _["__core-js_shared__"], _t = function() {
    var a = /[^.]+$/.exec(Ke && Ke.keys && Ke.keys.IE_PROTO || "");
    return a ? "Symbol(src)_1." + a : "";
  }(), St = qr.toString, X = xe.hasOwnProperty, Te = xe.toString, Vr = RegExp(
    "^" + St.call(X).replace(be, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  ), Ot = Dr ? _.Buffer : void 0, At = _.Symbol, jt = _.Uint8Array, zr = Ge(Object.getPrototypeOf, Object), Yr = Object.create, Jr = xe.propertyIsEnumerable, Xr = Kr.splice, Et = Object.getOwnPropertySymbols, Zr = Ot ? Ot.isBuffer : void 0, Qr = Ge(Object.keys, Object), qe = ce(_, "DataView"), ve = ce(_, "Map"), Ve = ce(_, "Promise"), ze = ce(_, "Set"), Ye = ce(_, "WeakMap"), me = ce(Object, "create"), en = ie(qe), tn = ie(ve), rn = ie(Ve), nn = ie(ze), on = ie(Ye), $t = At ? At.prototype : void 0, xt = $t ? $t.valueOf : void 0;
  function re(a) {
    var d = -1, h = a ? a.length : 0;
    for (this.clear(); ++d < h; ) {
      var w = a[d];
      this.set(w[0], w[1]);
    }
  }
  function sn() {
    this.__data__ = me ? me(null) : {};
  }
  function an(a) {
    return this.has(a) && delete this.__data__[a];
  }
  function cn(a) {
    var d = this.__data__;
    if (me) {
      var h = d[a];
      return h === n ? void 0 : h;
    }
    return X.call(d, a) ? d[a] : void 0;
  }
  function un(a) {
    var d = this.__data__;
    return me ? d[a] !== void 0 : X.call(d, a);
  }
  function fn(a, d) {
    var h = this.__data__;
    return h[a] = me && d === void 0 ? n : d, this;
  }
  re.prototype.clear = sn, re.prototype.delete = an, re.prototype.get = cn, re.prototype.has = un, re.prototype.set = fn;
  function z(a) {
    var d = -1, h = a ? a.length : 0;
    for (this.clear(); ++d < h; ) {
      var w = a[d];
      this.set(w[0], w[1]);
    }
  }
  function ln() {
    this.__data__ = [];
  }
  function pn(a) {
    var d = this.__data__, h = ke(d, a);
    if (h < 0)
      return !1;
    var w = d.length - 1;
    return h == w ? d.pop() : Xr.call(d, h, 1), !0;
  }
  function dn(a) {
    var d = this.__data__, h = ke(d, a);
    return h < 0 ? void 0 : d[h][1];
  }
  function yn(a) {
    return ke(this.__data__, a) > -1;
  }
  function hn(a, d) {
    var h = this.__data__, w = ke(h, a);
    return w < 0 ? h.push([a, d]) : h[w][1] = d, this;
  }
  z.prototype.clear = ln, z.prototype.delete = pn, z.prototype.get = dn, z.prototype.has = yn, z.prototype.set = hn;
  function se(a) {
    var d = -1, h = a ? a.length : 0;
    for (this.clear(); ++d < h; ) {
      var w = a[d];
      this.set(w[0], w[1]);
    }
  }
  function gn() {
    this.__data__ = {
      hash: new re(),
      map: new (ve || z)(),
      string: new re()
    };
  }
  function bn(a) {
    return Ce(this, a).delete(a);
  }
  function vn(a) {
    return Ce(this, a).get(a);
  }
  function mn(a) {
    return Ce(this, a).has(a);
  }
  function wn(a, d) {
    return Ce(this, a).set(a, d), this;
  }
  se.prototype.clear = gn, se.prototype.delete = bn, se.prototype.get = vn, se.prototype.has = mn, se.prototype.set = wn;
  function ae(a) {
    this.__data__ = new z(a);
  }
  function _n() {
    this.__data__ = new z();
  }
  function Sn(a) {
    return this.__data__.delete(a);
  }
  function On(a) {
    return this.__data__.get(a);
  }
  function An(a) {
    return this.__data__.has(a);
  }
  function jn(a, d) {
    var h = this.__data__;
    if (h instanceof z) {
      var w = h.__data__;
      if (!ve || w.length < r - 1)
        return w.push([a, d]), this;
      h = this.__data__ = new se(w);
    }
    return h.set(a, d), this;
  }
  ae.prototype.clear = _n, ae.prototype.delete = Sn, ae.prototype.get = On, ae.prototype.has = An, ae.prototype.set = jn;
  function En(a, d) {
    var h = Ze(a) || Jn(a) ? Ur(a.length, String) : [], w = h.length, B = !!w;
    for (var L in a)
      (d || X.call(a, L)) && !(B && (L == "length" || qn(L, w))) && h.push(L);
    return h;
  }
  function Tt(a, d, h) {
    var w = a[d];
    (!(X.call(a, d) && Rt(w, h)) || h === void 0 && !(d in a)) && (a[d] = h);
  }
  function ke(a, d) {
    for (var h = a.length; h--; )
      if (Rt(a[h][0], d))
        return h;
    return -1;
  }
  function $n(a, d) {
    return a && kt(d, Qe(d), a);
  }
  function Je(a, d, h, w, B, L, U) {
    var H;
    if (w && (H = L ? w(a, B, L, U) : w(a)), H !== void 0)
      return H;
    if (!Pe(a))
      return a;
    var Mt = Ze(a);
    if (Mt) {
      if (H = Un(a), !d)
        return Ln(a, H);
    } else {
      var ue = ne(a), Ft = ue == l || ue == p;
      if (Zn(a))
        return Rn(a, d);
      if (ue == v || ue == o || Ft && !L) {
        if (vt(a))
          return L ? a : {};
        if (H = Gn(Ft ? {} : a), !d)
          return Hn(a, $n(H, a));
      } else {
        if (!k[ue])
          return L ? a : {};
        H = Kn(a, ue, Je, d);
      }
    }
    U || (U = new ae());
    var Dt = U.get(a);
    if (Dt)
      return Dt;
    if (U.set(a, H), !Mt)
      var Nt = h ? Wn(a) : Qe(a);
    return Hr(Nt || a, function(et, Re) {
      Nt && (Re = et, et = a[Re]), Tt(H, Re, Je(et, d, h, w, Re, a, U));
    }), H;
  }
  function xn(a) {
    return Pe(a) ? Yr(a) : {};
  }
  function Tn(a, d, h) {
    var w = d(a);
    return Ze(a) ? w : Wr(w, h(a));
  }
  function kn(a) {
    return Te.call(a);
  }
  function Cn(a) {
    if (!Pe(a) || zn(a))
      return !1;
    var d = Bt(a) || vt(a) ? Vr : Ae;
    return d.test(ie(a));
  }
  function Pn(a) {
    if (!Pt(a))
      return Qr(a);
    var d = [];
    for (var h in Object(a))
      X.call(a, h) && h != "constructor" && d.push(h);
    return d;
  }
  function Rn(a, d) {
    if (d)
      return a.slice();
    var h = new a.constructor(a.length);
    return a.copy(h), h;
  }
  function Xe(a) {
    var d = new a.constructor(a.byteLength);
    return new jt(d).set(new jt(a)), d;
  }
  function In(a, d) {
    var h = d ? Xe(a.buffer) : a.buffer;
    return new a.constructor(h, a.byteOffset, a.byteLength);
  }
  function Bn(a, d, h) {
    var w = d ? h(mt(a), !0) : mt(a);
    return bt(w, Nr, new a.constructor());
  }
  function Mn(a) {
    var d = new a.constructor(a.source, Oe.exec(a));
    return d.lastIndex = a.lastIndex, d;
  }
  function Fn(a, d, h) {
    var w = d ? h(wt(a), !0) : wt(a);
    return bt(w, Lr, new a.constructor());
  }
  function Dn(a) {
    return xt ? Object(xt.call(a)) : {};
  }
  function Nn(a, d) {
    var h = d ? Xe(a.buffer) : a.buffer;
    return new a.constructor(h, a.byteOffset, a.length);
  }
  function Ln(a, d) {
    var h = -1, w = a.length;
    for (d || (d = Array(w)); ++h < w; )
      d[h] = a[h];
    return d;
  }
  function kt(a, d, h, w) {
    h || (h = {});
    for (var B = -1, L = d.length; ++B < L; ) {
      var U = d[B], H = w ? w(h[U], a[U], U, h, a) : void 0;
      Tt(h, U, H === void 0 ? a[U] : H);
    }
    return h;
  }
  function Hn(a, d) {
    return kt(a, Ct(a), d);
  }
  function Wn(a) {
    return Tn(a, Qe, Ct);
  }
  function Ce(a, d) {
    var h = a.__data__;
    return Vn(d) ? h[typeof d == "string" ? "string" : "hash"] : h.map;
  }
  function ce(a, d) {
    var h = Gr(a, d);
    return Cn(h) ? h : void 0;
  }
  var Ct = Et ? Ge(Et, Object) : ti, ne = kn;
  (qe && ne(new qe(new ArrayBuffer(1))) != C || ve && ne(new ve()) != y || Ve && ne(Ve.resolve()) != b || ze && ne(new ze()) != x || Ye && ne(new Ye()) != S) && (ne = function(a) {
    var d = Te.call(a), h = d == v ? a.constructor : void 0, w = h ? ie(h) : void 0;
    if (w)
      switch (w) {
        case en:
          return C;
        case tn:
          return y;
        case rn:
          return b;
        case nn:
          return x;
        case on:
          return S;
      }
    return d;
  });
  function Un(a) {
    var d = a.length, h = a.constructor(d);
    return d && typeof a[0] == "string" && X.call(a, "index") && (h.index = a.index, h.input = a.input), h;
  }
  function Gn(a) {
    return typeof a.constructor == "function" && !Pt(a) ? xn(zr(a)) : {};
  }
  function Kn(a, d, h, w) {
    var B = a.constructor;
    switch (d) {
      case T:
        return Xe(a);
      case f:
      case c:
        return new B(+a);
      case C:
        return In(a, w);
      case R:
      case D:
      case N:
      case q:
      case Y:
      case J:
      case te:
      case fe:
      case oe:
        return Nn(a, w);
      case y:
        return Bn(a, w, h);
      case g:
      case m:
        return new B(a);
      case $:
        return Mn(a);
      case x:
        return Fn(a, w, h);
      case O:
        return Dn(a);
    }
  }
  function qn(a, d) {
    return d = d ?? i, !!d && (typeof a == "number" || le.test(a)) && a > -1 && a % 1 == 0 && a < d;
  }
  function Vn(a) {
    var d = typeof a;
    return d == "string" || d == "number" || d == "symbol" || d == "boolean" ? a !== "__proto__" : a === null;
  }
  function zn(a) {
    return !!_t && _t in a;
  }
  function Pt(a) {
    var d = a && a.constructor, h = typeof d == "function" && d.prototype || xe;
    return a === h;
  }
  function ie(a) {
    if (a != null) {
      try {
        return St.call(a);
      } catch {
      }
      try {
        return a + "";
      } catch {
      }
    }
    return "";
  }
  function Yn(a) {
    return Je(a, !0, !0);
  }
  function Rt(a, d) {
    return a === d || a !== a && d !== d;
  }
  function Jn(a) {
    return Xn(a) && X.call(a, "callee") && (!Jr.call(a, "callee") || Te.call(a) == o);
  }
  var Ze = Array.isArray;
  function It(a) {
    return a != null && Qn(a.length) && !Bt(a);
  }
  function Xn(a) {
    return ei(a) && It(a);
  }
  var Zn = Zr || ri;
  function Bt(a) {
    var d = Pe(a) ? Te.call(a) : "";
    return d == l || d == p;
  }
  function Qn(a) {
    return typeof a == "number" && a > -1 && a % 1 == 0 && a <= i;
  }
  function Pe(a) {
    var d = typeof a;
    return !!a && (d == "object" || d == "function");
  }
  function ei(a) {
    return !!a && typeof a == "object";
  }
  function Qe(a) {
    return It(a) ? En(a) : Pn(a);
  }
  function ti() {
    return [];
  }
  function ri() {
    return !1;
  }
  t.exports = Yn;
})(gr, gr.exports);
var jc = gr.exports;
const Ec = /* @__PURE__ */ We(jc);
function Ns(t, e = {}) {
  return e = Object.assign({ deep: !1 }, e), e.deep ? Ec(t) : Ac(t);
}
var Di;
const Ni = (t) => Array.isArray(t), Ls = (t) => Object.prototype.toString.call(t).slice(8, -1) === "Object", $c = (t) => {
  if (t === void 0)
    throw new Error("This method requires one parameter");
  if (!Ni(t) && !Ls(t))
    throw new TypeError("This method only accepts arrays and objects");
}, xc = (t, e) => Object.keys(e).find((r) => e[r] === t), Tc = (t) => {
  $c(t);
  let e = {};
  const r = (n, i = "$") => {
    const o = xc(n, e);
    return o ? { $ref: o } : Ni(n) || Ls(n) ? (e[i] = n, Ni(n) ? n.map((s, f) => r(s, `${i}[${f}]`)) : Object.keys(n).reduce((s, f) => (s[f] = r(n[f], `${i}.${f}`), s), {})) : n;
  };
  return r(t);
};
Di = Tc;
function Hs(t) {
  const e = t.concat();
  for (let r = 0; r < e.length; ++r)
    for (let n = r + 1; n < e.length; ++n)
      e[r] === e[n] && e.splice(n--, 1);
  return e;
}
function kc(t) {
  return !(!t || typeof t != "object" || t.constructor && t.constructor.name === "Object" || Object.prototype.toString.call(t) === "[object Object]" || t.constructor === Object);
}
function W(...t) {
  var e;
  let r = {}, n = !1;
  const i = (e = t[t.length - 1]) !== null && e !== void 0 ? e : {};
  i && Object.keys(i).length <= 2 && (i.array !== void 0 || i.clone !== void 0) && (n = !0, r = i);
  let o = Object.assign({ array: !1, clone: !0 }, r);
  function s(c, u) {
    const l = o.clone ? {} : c;
    return u ? (Object.getOwnPropertyNames(c).forEach((g) => {
      const v = Object.getOwnPropertyDescriptor(c, g);
      v.set || v.get ? Object.defineProperty(l, g, v) : l[g] = c[g];
    }), Object.getOwnPropertyNames(u).forEach((g) => {
      const v = Object.getOwnPropertyDescriptor(u, g);
      v.set || v.get ? Object.defineProperty(l, g, v) : o.array && Array.isArray(c[g]) && Array.isArray(u[g]) ? l[g] = [...c[g], ...u[g]] : ye(l[g]) && ye(u[g]) ? l[g] = s(l[g], u[g]) : l[g] = u[g];
    }), l) : c;
  }
  n && t.pop();
  let f = o.clone ? {} : t[0];
  for (let c = 0; c < t.length; c++) {
    const u = t[c];
    f = s(f, u);
  }
  return f;
}
function yo(t, e, r, n = []) {
  r = W({
    classInstances: !1,
    array: !0,
    clone: !1,
    privateProps: !0
  }, r);
  const i = Array.isArray(t);
  let o = i ? [] : r.clone ? Ns(t, { deep: !0 }) : t;
  return Object.keys(t).forEach((s) => {
    if (!r.privateProps && s.match(/^_/))
      return;
    if (ye(t[s]) || kc(t[s]) && r.classInstances || Array.isArray(t[s]) && r.array) {
      const c = yo(t[s], e, Object.assign(Object.assign({}, r), { clone: !1 }), [...n, s]);
      i ? o.push(c) : s === "..." && ye(c) ? o = Object.assign(Object.assign({}, o), c) : o[s] = c;
      return;
    }
    const f = e({
      object: t,
      prop: s,
      value: t[s],
      path: [...n, s].join(".")
    });
    if (f === -1) {
      delete o[s];
      return;
    }
    i ? o.push(f) : s === "..." && ye(f) ? o = Object.assign(Object.assign({}, o), f) : o[s] = f;
  }), o;
}
function br(t, e = ['"', "'", "”", "`"]) {
  return t = t.trim(), e.forEach((r) => {
    if (t.substr(0, 1) === r && t.substr(-1) === r) {
      t = t.substr(1), t = t.substr(0, t.length - 1);
      return;
    }
  }), t;
}
function ho(t, e, r = {}) {
  if (r = Object.assign({}, r), Array.isArray(e))
    return No(t, e, r);
  if (t[e] !== void 0)
    return t[e];
  if (!e || e === "" || e === ".")
    return t;
  e = e.replace(/\[(\w+)\]/g, ".$1"), e = e.replace(/\\\./g, "_dot_"), e = e.replace(/^\./, "");
  let n = [e.replace(/\?/gm, "")];
  const i = e.split(".");
  for (let o = i.length - 1; o >= 0; o--)
    if (i[o].match(/\?$/)) {
      const f = i.slice(0, o), c = i.slice(o + 1);
      n.push([...f, ...c].join(".")), n.push([...f, ...c.filter((u) => !u.match(/\?$/))].join("."));
    }
  n = Hs(n.map((o) => o.replace(/\?/gm, "")));
  for (let o = 0; o < n.length; o++) {
    const s = n[o], f = No(t, s, r);
    if (f !== void 0)
      return f;
  }
}
function No(t, e, r = {}) {
  r = Object.assign({}, r);
  let n = t, i;
  if (typeof e == "string") {
    if (t[e] !== void 0)
      return t[e];
    if (!e || e === "" || e === ".")
      return t;
    e = e.split(/(?!\B"[^"]*)\.(?![^"]*"\B)/gm);
  }
  for (i = [...e].map((o) => typeof o == "string" ? br(o) : o); i.length; ) {
    let o = i.shift();
    if (typeof o == "string" && (o = o.replace(/\?$/, "")), typeof n != "object" || !(n && o in n))
      return;
    n = n[o];
  }
  return n;
}
function Ws(t, e, r, n) {
  const i = Object.assign({ preferAssign: !1 }, n ?? {});
  let o = t, s;
  if (Array.isArray(e) && e.length === 1 && (e = e[0]), typeof e == "string") {
    if (!e || e === "" || e === ".") {
      Object.assign(t, r);
      return;
    }
    e = e.replace(/\[(\w+)\]/g, ".[$1]"), s = br(e).split(/(?!\B"[^"]*)\.(?![^"]*"\B)/gm).map((f) => br(f));
  } else
    Array.isArray(e) && (s = [...e]);
  for (; s.length - 1; ) {
    const f = s.shift();
    f in o || (typeof s[0] == "string" ? s[0].match(/^\[[0-9]+\]$/) ? o[f] = [] : o[f] = {} : o[f] = {}), o[f] || (o[f] = {}), o = o[f];
  }
  if (typeof s[0] == "string" && s[0].match(/^\[[0-9]+\]$/))
    Array.isArray(o) || (o = []), o.push(r);
  else if (ye(o[s[0]]) && ye(r) && i.preferAssign) {
    for (const f in o[s[0]])
      delete o[s[0]][f];
    Object.assign(o[s[0]], r);
  } else
    o[s[0]] = r;
  return ho(t, e);
}
var Cc = "Function.prototype.bind called on incompatible ", ni = Array.prototype.slice, Pc = Object.prototype.toString, Rc = "[object Function]", Ic = function(e) {
  var r = this;
  if (typeof r != "function" || Pc.call(r) !== Rc)
    throw new TypeError(Cc + r);
  for (var n = ni.call(arguments, 1), i, o = function() {
    if (this instanceof i) {
      var l = r.apply(
        this,
        n.concat(ni.call(arguments))
      );
      return Object(l) === l ? l : this;
    } else
      return r.apply(
        e,
        n.concat(ni.call(arguments))
      );
  }, s = Math.max(0, r.length - n.length), f = [], c = 0; c < s; c++)
    f.push("$" + c);
  if (i = Function("binder", "return function (" + f.join(",") + "){ return binder.apply(this,arguments); }")(o), r.prototype) {
    var u = function() {
    };
    u.prototype = r.prototype, i.prototype = new u(), u.prototype = null;
  }
  return i;
}, Bc = Ic, go = Function.prototype.bind || Bc, Mc = go, Fc = Mc.call(Function.call, Object.prototype.hasOwnProperty), Dc = {}.toString, Nc = Array.isArray || function(t) {
  return Dc.call(t) == "[object Array]";
}, Us = Function.prototype.toString, ft = typeof Reflect == "object" && Reflect !== null && Reflect.apply, Li, ur;
if (typeof ft == "function" && typeof Object.defineProperty == "function")
  try {
    Li = Object.defineProperty({}, "length", {
      get: function() {
        throw ur;
      }
    }), ur = {}, ft(function() {
      throw 42;
    }, null, Li);
  } catch (t) {
    t !== ur && (ft = null);
  }
else
  ft = null;
var Lc = /^\s*class\b/, Hi = function(e) {
  try {
    var r = Us.call(e);
    return Lc.test(r);
  } catch {
    return !1;
  }
}, ii = function(e) {
  try {
    return Hi(e) ? !1 : (Us.call(e), !0);
  } catch {
    return !1;
  }
}, fr = Object.prototype.toString, Hc = "[object Object]", Wc = "[object Function]", Uc = "[object GeneratorFunction]", Gc = "[object HTMLAllCollection]", Kc = "[object HTML document.all class]", qc = "[object HTMLCollection]", Vc = typeof Symbol == "function" && !!Symbol.toStringTag, zc = !(0 in [,]), Wi = function() {
  return !1;
};
if (typeof document == "object") {
  var Yc = document.all;
  fr.call(Yc) === fr.call(document.all) && (Wi = function(e) {
    if ((zc || !e) && (typeof e > "u" || typeof e == "object"))
      try {
        var r = fr.call(e);
        return (r === Gc || r === Kc || r === qc || r === Hc) && e("") == null;
      } catch {
      }
    return !1;
  });
}
var bo = ft ? function(e) {
  if (Wi(e))
    return !0;
  if (!e || typeof e != "function" && typeof e != "object")
    return !1;
  try {
    ft(e, null, Li);
  } catch (r) {
    if (r !== ur)
      return !1;
  }
  return !Hi(e) && ii(e);
} : function(e) {
  if (Wi(e))
    return !0;
  if (!e || typeof e != "function" && typeof e != "object")
    return !1;
  if (Vc)
    return ii(e);
  if (Hi(e))
    return !1;
  var r = fr.call(e);
  return r !== Wc && r !== Uc && !/^\[object HTML/.test(r) ? !1 : ii(e);
}, Er = function() {
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
}, Lo = typeof Symbol < "u" && Symbol, Jc = Er, vo = function() {
  return typeof Lo != "function" || typeof Symbol != "function" || typeof Lo("foo") != "symbol" || typeof Symbol("bar") != "symbol" ? !1 : Jc();
}, F, pt = SyntaxError, Gs = Function, lt = TypeError, oi = function(t) {
  try {
    return Gs('"use strict"; return (' + t + ").constructor;")();
  } catch {
  }
}, nt = Object.getOwnPropertyDescriptor;
if (nt)
  try {
    nt({}, "");
  } catch {
    nt = null;
  }
var si = function() {
  throw new lt();
}, Xc = nt ? function() {
  try {
    return arguments.callee, si;
  } catch {
    try {
      return nt(arguments, "callee").get;
    } catch {
      return si;
    }
  }
}() : si, ot = vo(), Ee = Object.getPrototypeOf || function(t) {
  return t.__proto__;
}, ct = {}, Zc = typeof Uint8Array > "u" ? F : Ee(Uint8Array), it = {
  "%AggregateError%": typeof AggregateError > "u" ? F : AggregateError,
  "%Array%": Array,
  "%ArrayBuffer%": typeof ArrayBuffer > "u" ? F : ArrayBuffer,
  "%ArrayIteratorPrototype%": ot ? Ee([][Symbol.iterator]()) : F,
  "%AsyncFromSyncIteratorPrototype%": F,
  "%AsyncFunction%": ct,
  "%AsyncGenerator%": ct,
  "%AsyncGeneratorFunction%": ct,
  "%AsyncIteratorPrototype%": ct,
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
  "%Function%": Gs,
  "%GeneratorFunction%": ct,
  "%Int8Array%": typeof Int8Array > "u" ? F : Int8Array,
  "%Int16Array%": typeof Int16Array > "u" ? F : Int16Array,
  "%Int32Array%": typeof Int32Array > "u" ? F : Int32Array,
  "%isFinite%": isFinite,
  "%isNaN%": isNaN,
  "%IteratorPrototype%": ot ? Ee(Ee([][Symbol.iterator]())) : F,
  "%JSON%": typeof JSON == "object" ? JSON : F,
  "%Map%": typeof Map > "u" ? F : Map,
  "%MapIteratorPrototype%": typeof Map > "u" || !ot ? F : Ee((/* @__PURE__ */ new Map())[Symbol.iterator]()),
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
  "%SetIteratorPrototype%": typeof Set > "u" || !ot ? F : Ee((/* @__PURE__ */ new Set())[Symbol.iterator]()),
  "%SharedArrayBuffer%": typeof SharedArrayBuffer > "u" ? F : SharedArrayBuffer,
  "%String%": String,
  "%StringIteratorPrototype%": ot ? Ee(""[Symbol.iterator]()) : F,
  "%Symbol%": ot ? Symbol : F,
  "%SyntaxError%": pt,
  "%ThrowTypeError%": Xc,
  "%TypedArray%": Zc,
  "%TypeError%": lt,
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
  var Qc = Ee(Ee(t));
  it["%Error.prototype%"] = Qc;
}
var eu = function t(e) {
  var r;
  if (e === "%AsyncFunction%")
    r = oi("async function () {}");
  else if (e === "%GeneratorFunction%")
    r = oi("function* () {}");
  else if (e === "%AsyncGeneratorFunction%")
    r = oi("async function* () {}");
  else if (e === "%AsyncGenerator%") {
    var n = t("%AsyncGeneratorFunction%");
    n && (r = n.prototype);
  } else if (e === "%AsyncIteratorPrototype%") {
    var i = t("%AsyncGenerator%");
    i && (r = Ee(i.prototype));
  }
  return it[e] = r, r;
}, Ho = {
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
}, Jt = go, vr = Fc, tu = Jt.call(Function.call, Array.prototype.concat), ru = Jt.call(Function.apply, Array.prototype.splice), Wo = Jt.call(Function.call, String.prototype.replace), mr = Jt.call(Function.call, String.prototype.slice), nu = Jt.call(Function.call, RegExp.prototype.exec), iu = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, ou = /\\(\\)?/g, su = function(e) {
  var r = mr(e, 0, 1), n = mr(e, -1);
  if (r === "%" && n !== "%")
    throw new pt("invalid intrinsic syntax, expected closing `%`");
  if (n === "%" && r !== "%")
    throw new pt("invalid intrinsic syntax, expected opening `%`");
  var i = [];
  return Wo(e, iu, function(o, s, f, c) {
    i[i.length] = f ? Wo(c, ou, "$1") : s || o;
  }), i;
}, au = function(e, r) {
  var n = e, i;
  if (vr(Ho, n) && (i = Ho[n], n = "%" + i[0] + "%"), vr(it, n)) {
    var o = it[n];
    if (o === ct && (o = eu(n)), typeof o > "u" && !r)
      throw new lt("intrinsic " + e + " exists, but is not available. Please file an issue!");
    return {
      alias: i,
      name: n,
      value: o
    };
  }
  throw new pt("intrinsic " + e + " does not exist!");
}, ge = function(e, r) {
  if (typeof e != "string" || e.length === 0)
    throw new lt("intrinsic name must be a non-empty string");
  if (arguments.length > 1 && typeof r != "boolean")
    throw new lt('"allowMissing" argument must be a boolean');
  if (nu(/^%?[^%]*%?$/, e) === null)
    throw new pt("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
  var n = su(e), i = n.length > 0 ? n[0] : "", o = au("%" + i + "%", r), s = o.name, f = o.value, c = !1, u = o.alias;
  u && (i = u[0], ru(n, tu([0, 1], u)));
  for (var l = 1, p = !0; l < n.length; l += 1) {
    var y = n[l], g = mr(y, 0, 1), v = mr(y, -1);
    if ((g === '"' || g === "'" || g === "`" || v === '"' || v === "'" || v === "`") && g !== v)
      throw new pt("property names with quotes must have matching quotes");
    if ((y === "constructor" || !p) && (c = !0), i += "." + y, s = "%" + i + "%", vr(it, s))
      f = it[s];
    else if (f != null) {
      if (!(y in f)) {
        if (!r)
          throw new lt("base intrinsic for " + e + " exists, but the property is not available.");
        return;
      }
      if (nt && l + 1 >= n.length) {
        var b = nt(f, y);
        p = !!b, p && "get" in b && !("originalValue" in b.get) ? f = b.get : f = f[y];
      } else
        p = vr(f, y), f = f[y];
      p && !c && (it[s] = f);
    }
  }
  return f;
}, Ks = { exports: {} };
(function(t) {
  var e = go, r = ge, n = r("%Function.prototype.apply%"), i = r("%Function.prototype.call%"), o = r("%Reflect.apply%", !0) || e.call(i, n), s = r("%Object.getOwnPropertyDescriptor%", !0), f = r("%Object.defineProperty%", !0), c = r("%Math.max%");
  if (f)
    try {
      f({}, "a", { value: 1 });
    } catch {
      f = null;
    }
  t.exports = function(p) {
    var y = o(e, i, arguments);
    if (s && f) {
      var g = s(y, "length");
      g.configurable && f(
        y,
        "length",
        { value: 1 + c(0, p.length - (arguments.length - 1)) }
      );
    }
    return y;
  };
  var u = function() {
    return o(e, n, arguments);
  };
  f ? f(t.exports, "apply", { value: u }) : t.exports.apply = u;
})(Ks);
var mo = Ks.exports, qs = ge, Vs = mo, cu = Vs(qs("String.prototype.indexOf")), _e = function(e, r) {
  var n = qs(e, !!r);
  return typeof n == "function" && cu(e, ".prototype.") > -1 ? Vs(n) : n;
}, uu = Er, Se = function() {
  return uu() && !!Symbol.toStringTag;
}, zs = _e, fu = zs("Boolean.prototype.toString"), lu = zs("Object.prototype.toString"), pu = function(e) {
  try {
    return fu(e), !0;
  } catch {
    return !1;
  }
}, du = "[object Boolean]", yu = Se(), hu = function(e) {
  return typeof e == "boolean" ? !0 : e === null || typeof e != "object" ? !1 : yu && Symbol.toStringTag in e ? pu(e) : lu(e) === du;
}, gu = Date.prototype.getDay, bu = function(e) {
  try {
    return gu.call(e), !0;
  } catch {
    return !1;
  }
}, vu = Object.prototype.toString, mu = "[object Date]", wu = Se(), _u = function(e) {
  return typeof e != "object" || e === null ? !1 : wu ? bu(e) : vu.call(e) === mu;
}, Su = Object.prototype.toString, Ou = Function.prototype.toString, Au = /^\s*(?:function)?\*/, Ys = Se(), ai = Object.getPrototypeOf, ju = function() {
  if (!Ys)
    return !1;
  try {
    return Function("return function*() {}")();
  } catch {
  }
}, ci, Eu = function(e) {
  if (typeof e != "function")
    return !1;
  if (Au.test(Ou.call(e)))
    return !0;
  if (!Ys) {
    var r = Su.call(e);
    return r === "[object GeneratorFunction]";
  }
  if (!ai)
    return !1;
  if (typeof ci > "u") {
    var n = ju();
    ci = n ? ai(n) : !1;
  }
  return ai(e) === ci;
}, $u = Number.prototype.toString, xu = function(e) {
  try {
    return $u.call(e), !0;
  } catch {
    return !1;
  }
}, Tu = Object.prototype.toString, ku = "[object Number]", Cu = Se(), Pu = function(e) {
  return typeof e == "number" ? !0 : typeof e != "object" ? !1 : Cu ? xu(e) : Tu.call(e) === ku;
}, Ui = _e, Js = Se(), Xs, Zs, Gi, Ki;
if (Js) {
  Xs = Ui("Object.prototype.hasOwnProperty"), Zs = Ui("RegExp.prototype.exec"), Gi = {};
  var ui = function() {
    throw Gi;
  };
  Ki = {
    toString: ui,
    valueOf: ui
  }, typeof Symbol.toPrimitive == "symbol" && (Ki[Symbol.toPrimitive] = ui);
}
var Ru = Ui("Object.prototype.toString"), Iu = Object.getOwnPropertyDescriptor, Bu = "[object RegExp]", Mu = Js ? function(e) {
  if (!e || typeof e != "object")
    return !1;
  var r = Iu(e, "lastIndex"), n = r && Xs(r, "value");
  if (!n)
    return !1;
  try {
    Zs(e, Ki);
  } catch (i) {
    return i === Gi;
  }
} : function(e) {
  return !e || typeof e != "object" && typeof e != "function" ? !1 : Ru(e) === Bu;
}, Fu = String.prototype.valueOf, Du = function(e) {
  try {
    return Fu.call(e), !0;
  } catch {
    return !1;
  }
}, Nu = Object.prototype.toString, Lu = "[object String]", Hu = Se(), Wu = function(e) {
  return typeof e == "string" ? !0 : typeof e != "object" ? !1 : Hu ? Du(e) : Nu.call(e) === Lu;
}, qi = { exports: {} }, Uu = Object.prototype.toString, Gu = vo();
if (Gu) {
  var Ku = Symbol.prototype.toString, qu = /^Symbol\(.*\)$/, Vu = function(e) {
    return typeof e.valueOf() != "symbol" ? !1 : qu.test(Ku.call(e));
  };
  qi.exports = function(e) {
    if (typeof e == "symbol")
      return !0;
    if (Uu.call(e) !== "[object Symbol]")
      return !1;
    try {
      return Vu(e);
    } catch {
      return !1;
    }
  };
} else
  qi.exports = function(e) {
    return !1;
  };
var zu = qi.exports, Vi = { exports: {} }, Uo = typeof BigInt < "u" && BigInt, Qs = function() {
  return typeof Uo == "function" && typeof BigInt == "function" && typeof Uo(42) == "bigint" && typeof BigInt(42) == "bigint";
}, Yu = Qs();
if (Yu) {
  var Ju = BigInt.prototype.valueOf, Xu = function(e) {
    try {
      return Ju.call(e), !0;
    } catch {
    }
    return !1;
  };
  Vi.exports = function(e) {
    return e === null || typeof e > "u" || typeof e == "boolean" || typeof e == "string" || typeof e == "number" || typeof e == "symbol" || typeof e == "function" ? !1 : typeof e == "bigint" ? !0 : Xu(e);
  };
} else
  Vi.exports = function(e) {
    return !1;
  };
var Zu = Vi.exports, Qu = Se(), ef = _e, zi = ef("Object.prototype.toString"), wo = function(e) {
  return Qu && e && typeof e == "object" && Symbol.toStringTag in e ? !1 : zi(e) === "[object Arguments]";
}, tf = function(e) {
  return wo(e) ? !0 : e !== null && typeof e == "object" && typeof e.length == "number" && e.length >= 0 && zi(e) !== "[object Array]" && zi(e.callee) === "[object Function]";
};
(function() {
  return wo(arguments);
})();
wo.isLegacyArguments = tf;
const rf = {}, nf = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: rf
}, Symbol.toStringTag, { value: "Module" })), ea = /* @__PURE__ */ Sc(nf);
var _o = ge, yt = _e;
_o("%TypeError%");
_o("%WeakMap%", !0);
_o("%Map%", !0);
yt("WeakMap.prototype.get", !0);
yt("WeakMap.prototype.set", !0);
yt("WeakMap.prototype.has", !0);
yt("Map.prototype.get", !0);
yt("Map.prototype.set", !0);
yt("Map.prototype.has", !0);
var of = ge;
of("%TypeError%");
var So = typeof Map == "function" && Map.prototype ? Map : null, sf = typeof Set == "function" && Set.prototype ? Set : null, wr;
So || (wr = function(e) {
  return !1;
});
var ta = So ? Map.prototype.has : null, Go = sf ? Set.prototype.has : null;
!wr && !ta && (wr = function(e) {
  return !1;
});
var af = wr || function(e) {
  if (!e || typeof e != "object")
    return !1;
  try {
    if (ta.call(e), Go)
      try {
        Go.call(e);
      } catch {
        return !0;
      }
    return e instanceof So;
  } catch {
  }
  return !1;
}, cf = typeof Map == "function" && Map.prototype ? Map : null, Oo = typeof Set == "function" && Set.prototype ? Set : null, _r;
Oo || (_r = function(e) {
  return !1;
});
var Ko = cf ? Map.prototype.has : null, ra = Oo ? Set.prototype.has : null;
!_r && !ra && (_r = function(e) {
  return !1;
});
var uf = _r || function(e) {
  if (!e || typeof e != "object")
    return !1;
  try {
    if (ra.call(e), Ko)
      try {
        Ko.call(e);
      } catch {
        return !0;
      }
    return e instanceof Oo;
  } catch {
  }
  return !1;
};
if (!(vo() || Er())) {
  var qo = ge, ff = qo("%Map%", !0), lf = qo("%Set%", !0), we = _e;
  we("Array.prototype.push"), we("String.prototype.charCodeAt"), we("String.prototype.slice"), !ff && !lf || (we("Map.prototype.forEach", !0), we("Set.prototype.forEach", !0), (typeof process > "u" || !process.versions || !process.versions.node) && (we("Map.prototype.iterator", !0), we("Set.prototype.iterator", !0)), we("Map.prototype.@@iterator", !0) || we("Map.prototype._es6-shim iterator_", !0), we("Set.prototype.@@iterator", !0) || we("Set.prototype._es6-shim iterator_", !0));
}
var Sr = typeof WeakMap == "function" && WeakMap.prototype ? WeakMap : null, Vo = typeof WeakSet == "function" && WeakSet.prototype ? WeakSet : null, Or;
Sr || (Or = function(e) {
  return !1;
});
var Yi = Sr ? Sr.prototype.has : null, fi = Vo ? Vo.prototype.has : null;
!Or && !Yi && (Or = function(e) {
  return !1;
});
var pf = Or || function(e) {
  if (!e || typeof e != "object")
    return !1;
  try {
    if (Yi.call(e, Yi), fi)
      try {
        fi.call(e, fi);
      } catch {
        return !0;
      }
    return e instanceof Sr;
  } catch {
  }
  return !1;
}, Ji = { exports: {} }, df = ge, na = _e, yf = df("%WeakSet%", !0), li = na("WeakSet.prototype.has", !0);
if (li) {
  var pi = na("WeakMap.prototype.has", !0);
  Ji.exports = function(e) {
    if (!e || typeof e != "object")
      return !1;
    try {
      if (li(e, li), pi)
        try {
          pi(e, pi);
        } catch {
          return !0;
        }
      return e instanceof yf;
    } catch {
    }
    return !1;
  };
} else
  Ji.exports = function(e) {
    return !1;
  };
var hf = Ji.exports, gf = af, bf = uf, vf = pf, mf = hf, wf = function(e) {
  if (e && typeof e == "object") {
    if (gf(e))
      return "Map";
    if (bf(e))
      return "Set";
    if (vf(e))
      return "WeakMap";
    if (mf(e))
      return "WeakSet";
  }
  return !1;
}, _f = Wu, Sf = Pu, Of = hu, Af = zu, jf = Zu, Ef = function(e) {
  if (e == null || typeof e != "object" && typeof e != "function")
    return null;
  if (_f(e))
    return "String";
  if (Sf(e))
    return "Number";
  if (Of(e))
    return "Boolean";
  if (Af(e))
    return "Symbol";
  if (jf(e))
    return "BigInt";
}, $f = ge, xf = $f("%TypeError%"), Tf = function(e, r) {
  if (e == null)
    throw new xf(r || "Cannot call method on " + e);
  return e;
}, ia = Tf, kf = ge, Cf = kf("%Object%"), Pf = ia, Rf = function(e) {
  return Pf(e), Cf(e);
}, zo = Object.prototype.toString, oa = function(e) {
  var r = zo.call(e), n = r === "[object Arguments]";
  return n || (n = r !== "[object Array]" && e !== null && typeof e == "object" && typeof e.length == "number" && e.length >= 0 && zo.call(e.callee) === "[object Function]"), n;
}, di, Yo;
function If() {
  if (Yo)
    return di;
  Yo = 1;
  var t;
  if (!Object.keys) {
    var e = Object.prototype.hasOwnProperty, r = Object.prototype.toString, n = oa, i = Object.prototype.propertyIsEnumerable, o = !i.call({ toString: null }, "toString"), s = i.call(function() {
    }, "prototype"), f = [
      "toString",
      "toLocaleString",
      "valueOf",
      "hasOwnProperty",
      "isPrototypeOf",
      "propertyIsEnumerable",
      "constructor"
    ], c = function(y) {
      var g = y.constructor;
      return g && g.prototype === y;
    }, u = {
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
    }, l = function() {
      if (typeof window > "u")
        return !1;
      for (var y in window)
        try {
          if (!u["$" + y] && e.call(window, y) && window[y] !== null && typeof window[y] == "object")
            try {
              c(window[y]);
            } catch {
              return !0;
            }
        } catch {
          return !0;
        }
      return !1;
    }(), p = function(y) {
      if (typeof window > "u" || !l)
        return c(y);
      try {
        return c(y);
      } catch {
        return !1;
      }
    };
    t = function(g) {
      var v = g !== null && typeof g == "object", b = r.call(g) === "[object Function]", $ = n(g), x = v && r.call(g) === "[object String]", m = [];
      if (!v && !b && !$)
        throw new TypeError("Object.keys called on a non-object");
      var O = s && b;
      if (x && g.length > 0 && !e.call(g, 0))
        for (var S = 0; S < g.length; ++S)
          m.push(String(S));
      if ($ && g.length > 0)
        for (var T = 0; T < g.length; ++T)
          m.push(String(T));
      else
        for (var C in g)
          !(O && C === "prototype") && e.call(g, C) && m.push(String(C));
      if (o)
        for (var R = p(g), D = 0; D < f.length; ++D)
          !(R && f[D] === "constructor") && e.call(g, f[D]) && m.push(f[D]);
      return m;
    };
  }
  return di = t, di;
}
var Bf = Array.prototype.slice, Mf = oa, Jo = Object.keys, lr = Jo ? function(e) {
  return Jo(e);
} : If(), Xo = Object.keys;
lr.shim = function() {
  if (Object.keys) {
    var e = function() {
      var r = Object.keys(arguments);
      return r && r.length === arguments.length;
    }(1, 2);
    e || (Object.keys = function(n) {
      return Mf(n) ? Xo(Bf.call(n)) : Xo(n);
    });
  } else
    Object.keys = lr;
  return Object.keys || lr;
};
var Ff = lr, Df = ge, Xi = Df("%Object.defineProperty%", !0), Zi = function() {
  if (Xi)
    try {
      return Xi({}, "a", { value: 1 }), !0;
    } catch {
      return !1;
    }
  return !1;
};
Zi.hasArrayLengthDefineBug = function() {
  if (!Zi())
    return null;
  try {
    return Xi([], "length", { value: 1 }).length !== 1;
  } catch {
    return !0;
  }
};
var Nf = Zi, Lf = Ff, Hf = typeof Symbol == "function" && typeof Symbol("foo") == "symbol", Wf = Object.prototype.toString, Uf = Array.prototype.concat, sa = Object.defineProperty, Gf = function(t) {
  return typeof t == "function" && Wf.call(t) === "[object Function]";
}, Kf = Nf(), aa = sa && Kf, qf = function(t, e, r, n) {
  if (e in t) {
    if (n === !0) {
      if (t[e] === r)
        return;
    } else if (!Gf(n) || !n())
      return;
  }
  aa ? sa(t, e, {
    configurable: !0,
    enumerable: !1,
    value: r,
    writable: !0
  }) : t[e] = r;
}, ca = function(t, e) {
  var r = arguments.length > 2 ? arguments[2] : {}, n = Lf(e);
  Hf && (n = Uf.call(n, Object.getOwnPropertySymbols(e)));
  for (var i = 0; i < n.length; i += 1)
    qf(t, n[i], e[n[i]], r[n[i]]);
};
ca.supportsDescriptors = !!aa;
var $r = ca, Vf = bo, zf = function(e) {
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
}, Yf = zf, ua = function(e) {
  return typeof e == "symbol" ? "Symbol" : typeof e == "bigint" ? "BigInt" : Yf(e);
}, Jf = bo, Xf = Object.prototype.toString, fa = Object.prototype.hasOwnProperty, Zf = function(e, r, n) {
  for (var i = 0, o = e.length; i < o; i++)
    fa.call(e, i) && (n == null ? r(e[i], i, e) : r.call(n, e[i], i, e));
}, Qf = function(e, r, n) {
  for (var i = 0, o = e.length; i < o; i++)
    n == null ? r(e.charAt(i), i, e) : r.call(n, e.charAt(i), i, e);
}, el = function(e, r, n) {
  for (var i in e)
    fa.call(e, i) && (n == null ? r(e[i], i, e) : r.call(n, e[i], i, e));
}, tl = function(e, r, n) {
  if (!Jf(r))
    throw new TypeError("iterator must be a function");
  var i;
  arguments.length >= 3 && (i = n), Xf.call(e) === "[object Array]" ? Zf(e, r, i) : typeof e == "string" ? Qf(e, r, i) : el(e, r, i);
}, la = tl, yi = [
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
], rl = typeof globalThis > "u" ? Q : globalThis, pa = function() {
  for (var e = [], r = 0; r < yi.length; r++)
    typeof rl[yi[r]] == "function" && (e[e.length] = yi[r]);
  return e;
}, nl = ge, pr = nl("%Object.getOwnPropertyDescriptor%", !0);
if (pr)
  try {
    pr([], "length");
  } catch {
    pr = null;
  }
var da = pr, hi, Zo;
function il() {
  if (Zo)
    return hi;
  Zo = 1;
  var t = la, e = pa, r = _e, n = r("Object.prototype.toString"), i = Se(), o = da, s = typeof globalThis > "u" ? Q : globalThis, f = e(), c = r("Array.prototype.indexOf", !0) || function(v, b) {
    for (var $ = 0; $ < v.length; $ += 1)
      if (v[$] === b)
        return $;
    return -1;
  }, u = r("String.prototype.slice"), l = {}, p = Object.getPrototypeOf;
  i && o && p && t(f, function(g) {
    var v = new s[g]();
    if (Symbol.toStringTag in v) {
      var b = p(v), $ = o(b, Symbol.toStringTag);
      if (!$) {
        var x = p(b);
        $ = o(x, Symbol.toStringTag);
      }
      l[g] = $.get;
    }
  });
  var y = function(v) {
    var b = !1;
    return t(l, function($, x) {
      if (!b)
        try {
          b = $.call(v) === x;
        } catch {
        }
    }), b;
  };
  return hi = function(v) {
    if (!v || typeof v != "object")
      return !1;
    if (!i || !(Symbol.toStringTag in v)) {
      var b = u(n(v), 8, -1);
      return c(f, b) > -1;
    }
    return o ? y(v) : !1;
  }, hi;
}
var ya = la, ol = pa, ha = _e, gi = da, sl = ha("Object.prototype.toString"), ga = Se(), Qo = typeof globalThis > "u" ? Q : globalThis, al = ol(), cl = ha("String.prototype.slice"), ba = {}, bi = Object.getPrototypeOf;
ga && gi && bi && ya(al, function(t) {
  if (typeof Qo[t] == "function") {
    var e = new Qo[t]();
    if (Symbol.toStringTag in e) {
      var r = bi(e), n = gi(r, Symbol.toStringTag);
      if (!n) {
        var i = bi(r);
        n = gi(i, Symbol.toStringTag);
      }
      ba[t] = n.get;
    }
  }
});
var ul = function(e) {
  var r = !1;
  return ya(ba, function(n, i) {
    if (!r)
      try {
        var o = n.call(e);
        o === i && (r = o);
      } catch {
      }
  }), r;
}, fl = il(), ll = function(e) {
  return fl(e) ? !ga || !(Symbol.toStringTag in e) ? cl(sl(e), 8, -1) : ul(e) : !1;
}, pl = _e, dl = pl("WeakRef.prototype.deref", !0), yl = typeof WeakRef > "u" ? function(e) {
  return !1;
} : function(e) {
  if (!e || typeof e != "object")
    return !1;
  try {
    return dl(e), !0;
  } catch {
    return !1;
  }
}, hl = _e, es = hl("FinalizationRegistry.prototype.register", !0), gl = es ? function(e) {
  if (!e || typeof e != "object")
    return !1;
  try {
    return es(e, {}), !0;
  } catch {
    return !1;
  }
} : function(e) {
  return !1;
}, bl = bo, vi, ts;
function Ao() {
  if (ts)
    return vi;
  ts = 1;
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
  }, vi = t, vi;
}
var va = bl, vl = Ao()(), ma = _e, wa = ma("Function.prototype.toString"), _a = ma("String.prototype.match"), ml = /^class /, wl = function(e) {
  if (va(e) || typeof e != "function")
    return !1;
  try {
    var r = _a(wa(e), ml);
    return !!r;
  } catch {
  }
  return !1;
}, _l = /\s*function\s+([^(\s]*)\s*/, Sl = Function.prototype, Sa = function() {
  if (!wl(this) && !va(this))
    throw new TypeError("Function.prototype.name sham getter called on non-function");
  if (vl)
    return this.name;
  if (this === Sl)
    return "";
  var e = wa(this), r = _a(e, _l), n = r && r[1];
  return n;
}, Ol = Sa, Oa = function() {
  return Ol;
}, Al = $r.supportsDescriptors, jl = Ao()(), El = Oa, rs = Object.defineProperty, $l = TypeError, xl = function() {
  var e = El();
  if (jl)
    return e;
  if (!Al)
    throw new $l("Shimming Function.prototype.name support requires ES5 property descriptor support.");
  var r = Function.prototype;
  return rs(r, "name", {
    configurable: !0,
    enumerable: !1,
    get: function() {
      var n = e.call(this);
      return this !== r && rs(this, "name", {
        configurable: !0,
        enumerable: !1,
        value: n,
        writable: !1
      }), n;
    }
  }), e;
}, Tl = $r, kl = mo, Aa = Sa, Cl = Oa, Pl = xl, ja = kl(Aa);
Tl(ja, {
  getPolyfill: Cl,
  implementation: Aa,
  shim: Pl
});
var Rl = ja, Il = Object.prototype.toString, Bl = Function.prototype.toString, Ml = /^\s*async(?:\s+function(?:\s+|\()|\s*\()/, Ea = Se(), mi = Object.getPrototypeOf, Fl = function() {
  if (!Ea)
    return !1;
  try {
    return Function("return async function () {}")();
  } catch {
  }
}, wi, Dl = function(e) {
  if (typeof e != "function")
    return !1;
  if (Ml.test(Bl.call(e)))
    return !0;
  if (!Ea) {
    var r = Il.call(e);
    return r === "[object AsyncFunction]";
  }
  if (!mi)
    return !1;
  if (typeof wi > "u") {
    var n = Fl();
    wi = n ? mi(n) : !1;
  }
  return mi(e) === wi;
}, Nl = Ef, Ll = wf, Hl = ll, Wl = Nc, Ul = _u, Gl = Mu, Kl = yl, ql = gl, Vl = Rl, zl = Eu, Yl = Dl, Jl = Se(), _i = Jl && Symbol.toStringTag, Xl = Object, ns = typeof Promise == "function" && Promise.prototype.then, Zl = function(e) {
  if (!e || typeof e != "object" || !ns)
    return !1;
  try {
    return ns.call(e, null, function() {
    }), !0;
  } catch {
  }
  return !1;
}, is = function(e) {
  return e && e !== "BigInt" && e !== "Boolean" && e !== "Null" && e !== "Number" && e !== "String" && e !== "Symbol" && e !== "Undefined" && e !== "Math" && e !== "JSON" && e !== "Reflect" && e !== "Atomics" && e !== "Map" && e !== "Set" && e !== "WeakMap" && e !== "WeakSet" && e !== "BigInt64Array" && e !== "BigUint64Array" && e !== "Float32Array" && e !== "Float64Array" && e !== "Int16Array" && e !== "Int32Array" && e !== "Int8Array" && e !== "Uint16Array" && e !== "Uint32Array" && e !== "Uint8Array" && e !== "Uint8ClampedArray" && e !== "Array" && e !== "Date" && e !== "FinalizationRegistry" && e !== "Promise" && e !== "RegExp" && e !== "WeakRef" && e !== "Function" && e !== "GeneratorFunction" && e !== "AsyncFunction";
}, Ql = function(e) {
  if (e == null)
    return e;
  var r = Nl(Xl(e)) || Ll(e) || Hl(e);
  if (r)
    return r;
  if (Wl(e))
    return "Array";
  if (Ul(e))
    return "Date";
  if (Gl(e))
    return "RegExp";
  if (Kl(e))
    return "WeakRef";
  if (ql(e))
    return "FinalizationRegistry";
  if (typeof e == "function")
    return zl(e) ? "GeneratorFunction" : Yl(e) ? "AsyncFunction" : "Function";
  if (Zl(e))
    return "Promise";
  if (_i && _i in e) {
    var n = e[_i];
    if (is(n))
      return n;
  }
  if (typeof e.constructor == "function") {
    var i = Vl(e.constructor);
    if (is(i))
      return i;
  }
  return "Object";
}, xr = ge, ep = Vf, tp = ua, rp = Ql, os = xr("%Object.getPrototypeOf%", !0), np = xr("%Object.prototype%"), ip = xr("%TypeError%"), op = [].__proto__ === Array.prototype, $a = function(e) {
  if (tp(e) !== "Object")
    throw new ip("Reflect.getPrototypeOf called on non-object");
  if (os)
    return os(e);
  if (op) {
    var r = e.__proto__;
    if (r || r === null)
      return r;
  }
  var n = rp(e);
  if (n) {
    var i = xr("%" + n + "%.prototype", !0);
    if (i)
      return i;
  }
  return ep(e.constructor) ? e.constructor.prototype : e instanceof Object ? np : null;
}, sp = ua, ap = ge, cp = ap("%TypeError%"), up = $a, fp = [].__proto__ === Array.prototype, lp = function(e) {
  if (sp(e) !== "Object")
    throw new cp("Reflect.getPrototypeOf called on non-object");
  return e.__proto__;
}, xa = function() {
  return typeof Reflect == "object" && Reflect && Reflect.getPrototypeOf ? Reflect.getPrototypeOf : fp ? lp : up;
}, ss = $r, pp = xa, dp = function() {
  ss(
    Q,
    { Reflect: {} },
    { Reflect: function() {
      return typeof Reflect != "object" || !Reflect;
    } }
  );
  var e = pp();
  return ss(
    Reflect,
    { getPrototypeOf: e },
    { getPrototypeOf: function() {
      return Reflect.getPrototypeOf !== e;
    } }
  ), e;
}, yp = mo, hp = $r, gp = $a, Ta = xa, bp = dp, ka = yp(Ta(), typeof Reflect == "object" ? Reflect : Object);
hp(ka, {
  getPolyfill: Ta,
  implementation: gp,
  shim: bp
});
var vp = ka, mp = Rf, wp = vp, _p = function(e) {
  return wp(mp(e));
}, Ca = ia, Sp = _p, Op = [].__proto__ === Array.prototype, Ap = function(e) {
  return Ca(e), e.__proto__;
}, dr = Object.getPrototypeOf, jp = function(e) {
  return Ca(e), dr(Object(e));
}, Ep = function() {
  if (dr) {
    try {
      dr(!0);
    } catch {
      return jp;
    }
    return dr;
  }
  return Op ? Ap : Sp;
};
Ep();
Er();
Qs();
Ao()();
var $p = function(t, e) {
  for (var r = [], n = 0; n < t.length; n++) {
    var i = e(t[n], n);
    xp(i) ? r.push.apply(r, i) : r.push(i);
  }
  return r;
}, xp = Array.isArray || function(t) {
  return Object.prototype.toString.call(t) === "[object Array]";
}, Tp = Pa;
function Pa(t, e, r) {
  t instanceof RegExp && (t = as(t, r)), e instanceof RegExp && (e = as(e, r));
  var n = Ra(t, e, r);
  return n && {
    start: n[0],
    end: n[1],
    pre: r.slice(0, n[0]),
    body: r.slice(n[0] + t.length, n[1]),
    post: r.slice(n[1] + e.length)
  };
}
function as(t, e) {
  var r = e.match(t);
  return r ? r[0] : null;
}
Pa.range = Ra;
function Ra(t, e, r) {
  var n, i, o, s, f, c = r.indexOf(t), u = r.indexOf(e, c + 1), l = c;
  if (c >= 0 && u > 0) {
    if (t === e)
      return [c, u];
    for (n = [], o = r.length; l >= 0 && !f; )
      l == c ? (n.push(l), c = r.indexOf(t, l + 1)) : n.length == 1 ? f = [n.pop(), u] : (i = n.pop(), i < o && (o = i, s = u), u = r.indexOf(e, l + 1)), l = c < u && c >= 0 ? c : u;
    n.length && (f = [o, s]);
  }
  return f;
}
var kp = $p, Ia = Tp, Cp = Ip, Ba = "\0SLASH" + Math.random() + "\0", Ma = "\0OPEN" + Math.random() + "\0", jo = "\0CLOSE" + Math.random() + "\0", Fa = "\0COMMA" + Math.random() + "\0", Da = "\0PERIOD" + Math.random() + "\0";
function Si(t) {
  return parseInt(t, 10) == t ? parseInt(t, 10) : t.charCodeAt(0);
}
function Pp(t) {
  return t.split("\\\\").join(Ba).split("\\{").join(Ma).split("\\}").join(jo).split("\\,").join(Fa).split("\\.").join(Da);
}
function Rp(t) {
  return t.split(Ba).join("\\").split(Ma).join("{").split(jo).join("}").split(Fa).join(",").split(Da).join(".");
}
function Na(t) {
  if (!t)
    return [""];
  var e = [], r = Ia("{", "}", t);
  if (!r)
    return t.split(",");
  var n = r.pre, i = r.body, o = r.post, s = n.split(",");
  s[s.length - 1] += "{" + i + "}";
  var f = Na(o);
  return o.length && (s[s.length - 1] += f.shift(), s.push.apply(s, f)), e.push.apply(e, s), e;
}
function Ip(t) {
  return t ? (t.substr(0, 2) === "{}" && (t = "\\{\\}" + t.substr(2)), ut(Pp(t), !0).map(Rp)) : [];
}
function Bp(t) {
  return "{" + t + "}";
}
function Mp(t) {
  return /^-?0\d/.test(t);
}
function Fp(t, e) {
  return t <= e;
}
function Dp(t, e) {
  return t >= e;
}
function ut(t, e) {
  var r = [], n = Ia("{", "}", t);
  if (!n || /\$$/.test(n.pre))
    return [t];
  var i = /^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(n.body), o = /^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(n.body), s = i || o, f = n.body.indexOf(",") >= 0;
  if (!s && !f)
    return n.post.match(/,.*\}/) ? (t = n.pre + "{" + n.body + jo + n.post, ut(t)) : [t];
  var c;
  if (s)
    c = n.body.split(/\.\./);
  else if (c = Na(n.body), c.length === 1 && (c = ut(c[0], !1).map(Bp), c.length === 1)) {
    var l = n.post.length ? ut(n.post, !1) : [""];
    return l.map(function(Y) {
      return n.pre + c[0] + Y;
    });
  }
  var u = n.pre, l = n.post.length ? ut(n.post, !1) : [""], p;
  if (s) {
    var y = Si(c[0]), g = Si(c[1]), v = Math.max(c[0].length, c[1].length), b = c.length == 3 ? Math.abs(Si(c[2])) : 1, $ = Fp, x = g < y;
    x && (b *= -1, $ = Dp);
    var m = c.some(Mp);
    p = [];
    for (var O = y; $(O, g); O += b) {
      var S;
      if (o)
        S = String.fromCharCode(O), S === "\\" && (S = "");
      else if (S = String(O), m) {
        var T = v - S.length;
        if (T > 0) {
          var C = new Array(T + 1).join("0");
          O < 0 ? S = "-" + C + S.slice(1) : S = C + S;
        }
      }
      p.push(S);
    }
  } else
    p = kp(c, function(q) {
      return ut(q, !1);
    });
  for (var R = 0; R < p.length; R++)
    for (var D = 0; D < l.length; D++) {
      var N = u + p[R] + l[D];
      (!e || s || N) && r.push(N);
    }
  return r;
}
he.Minimatch = ee;
var Gt = function() {
  try {
    return ea;
  } catch {
  }
}() || {
  sep: "/"
};
he.sep = Gt.sep;
var Eo = he.GLOBSTAR = ee.GLOBSTAR = {}, Np = Cp, cs = {
  "!": { open: "(?:(?!(?:", close: "))[^/]*?)" },
  "?": { open: "(?:", close: ")?" },
  "+": { open: "(?:", close: ")+" },
  "*": { open: "(?:", close: ")*" },
  "@": { open: "(?:", close: ")" }
}, Qi = "[^/]", eo = Qi + "*?", Lp = "(?:(?!(?:\\/|^)(?:\\.{1,2})($|\\/)).)*?", Hp = "(?:(?!(?:\\/|^)\\.).)*?", us = Wp("().*{}+?[]^$\\!");
function Wp(t) {
  return t.split("").reduce(function(e, r) {
    return e[r] = !0, e;
  }, {});
}
var La = /\/+/;
he.filter = Up;
function Up(t, e) {
  return e = e || {}, function(r, n, i) {
    return he(r, t, e);
  };
}
function De(t, e) {
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
    return e(i, o, De(t, s));
  };
  return r.Minimatch = function(i, o) {
    return new e.Minimatch(i, De(t, o));
  }, r.Minimatch.defaults = function(i) {
    return e.defaults(De(t, i)).Minimatch;
  }, r.filter = function(i, o) {
    return e.filter(i, De(t, o));
  }, r.defaults = function(i) {
    return e.defaults(De(t, i));
  }, r.makeRe = function(i, o) {
    return e.makeRe(i, De(t, o));
  }, r.braceExpand = function(i, o) {
    return e.braceExpand(i, De(t, o));
  }, r.match = function(n, i, o) {
    return e.match(n, i, De(t, o));
  }, r;
};
ee.defaults = function(t) {
  return he.defaults(t).Minimatch;
};
function he(t, e, r) {
  return Tr(e), r || (r = {}), !r.nocomment && e.charAt(0) === "#" ? !1 : new ee(e, r).match(t);
}
function ee(t, e) {
  if (!(this instanceof ee))
    return new ee(t, e);
  Tr(t), e || (e = {}), t = t.trim(), !e.allowWindowsEscape && Gt.sep !== "/" && (t = t.split(Gt.sep).join("/")), this.options = e, this.set = [], this.pattern = t, this.regexp = null, this.negate = !1, this.comment = !1, this.empty = !1, this.partial = !!e.partial, this.make();
}
ee.prototype.debug = function() {
};
ee.prototype.make = Gp;
function Gp() {
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
    return n.split(La);
  }), this.debug(this.pattern, r), r = r.map(function(n, i, o) {
    return n.map(this.parse, this);
  }, this), this.debug(this.pattern, r), r = r.filter(function(n) {
    return n.indexOf(!1) === -1;
  }), this.debug(this.pattern, r), this.set = r;
}
ee.prototype.parseNegate = Kp;
function Kp() {
  var t = this.pattern, e = !1, r = this.options, n = 0;
  if (!r.nonegate) {
    for (var i = 0, o = t.length; i < o && t.charAt(i) === "!"; i++)
      e = !e, n++;
    n && (this.pattern = t.substr(n)), this.negate = e;
  }
}
he.braceExpand = function(t, e) {
  return Ha(t, e);
};
ee.prototype.braceExpand = Ha;
function Ha(t, e) {
  return e || (this instanceof ee ? e = this.options : e = {}), t = typeof t > "u" ? this.pattern : t, Tr(t), e.nobrace || !/\{(?:(?!\{).)*\}/.test(t) ? [t] : Np(t);
}
var qp = 1024 * 64, Tr = function(t) {
  if (typeof t != "string")
    throw new TypeError("invalid pattern");
  if (t.length > qp)
    throw new TypeError("pattern is too long");
};
ee.prototype.parse = Vp;
var tr = {};
function Vp(t, e) {
  Tr(t);
  var r = this.options;
  if (t === "**")
    if (r.noglobstar)
      t = "*";
    else
      return Eo;
  if (t === "")
    return "";
  var n = "", i = !!r.nocase, o = !1, s = [], f = [], c, u = !1, l = -1, p = -1, y = t.charAt(0) === "." ? "" : r.dot ? "(?!(?:^|\\/)\\.{1,2}(?:$|\\/))" : "(?!\\.)", g = this;
  function v() {
    if (c) {
      switch (c) {
        case "*":
          n += eo, i = !0;
          break;
        case "?":
          n += Qi, i = !0;
          break;
        default:
          n += "\\" + c;
          break;
      }
      g.debug("clearStateChar %j %j", c, n), c = !1;
    }
  }
  for (var b = 0, $ = t.length, x; b < $ && (x = t.charAt(b)); b++) {
    if (this.debug("%s	%s %s %j", t, b, n, x), o && us[x]) {
      n += "\\" + x, o = !1;
      continue;
    }
    switch (x) {
      case "/":
        return !1;
      case "\\":
        v(), o = !0;
        continue;
      case "?":
      case "*":
      case "+":
      case "@":
      case "!":
        if (this.debug("%s	%s %s %j <-- stateChar", t, b, n, x), u) {
          this.debug("  in class"), x === "!" && b === p + 1 && (x = "^"), n += x;
          continue;
        }
        g.debug("call clearStateChar %j", c), v(), c = x, r.noext && v();
        continue;
      case "(":
        if (u) {
          n += "(";
          continue;
        }
        if (!c) {
          n += "\\(";
          continue;
        }
        s.push({
          type: c,
          start: b - 1,
          reStart: n.length,
          open: cs[c].open,
          close: cs[c].close
        }), n += c === "!" ? "(?:(?!(?:" : "(?:", this.debug("plType %j %j", c, n), c = !1;
        continue;
      case ")":
        if (u || !s.length) {
          n += "\\)";
          continue;
        }
        v(), i = !0;
        var m = s.pop();
        n += m.close, m.type === "!" && f.push(m), m.reEnd = n.length;
        continue;
      case "|":
        if (u || !s.length || o) {
          n += "\\|", o = !1;
          continue;
        }
        v(), n += "|";
        continue;
      case "[":
        if (v(), u) {
          n += "\\" + x;
          continue;
        }
        u = !0, p = b, l = n.length, n += x;
        continue;
      case "]":
        if (b === p + 1 || !u) {
          n += "\\" + x, o = !1;
          continue;
        }
        var O = t.substring(p + 1, b);
        try {
          RegExp("[" + O + "]");
        } catch {
          var S = this.parse(O, tr);
          n = n.substr(0, l) + "\\[" + S[0] + "\\]", i = i || S[1], u = !1;
          continue;
        }
        i = !0, u = !1, n += x;
        continue;
      default:
        v(), o ? o = !1 : us[x] && !(x === "^" && u) && (n += "\\"), n += x;
    }
  }
  for (u && (O = t.substr(p + 1), S = this.parse(O, tr), n = n.substr(0, l) + "\\[" + S[0], i = i || S[1]), m = s.pop(); m; m = s.pop()) {
    var T = n.slice(m.reStart + m.open.length);
    this.debug("setting tail", n, m), T = T.replace(/((?:\\{2}){0,64})(\\?)\|/g, function(k, j, A) {
      return A || (A = "\\"), j + j + A + "|";
    }), this.debug(`tail=%j
   %s`, T, T, m, n);
    var C = m.type === "*" ? eo : m.type === "?" ? Qi : "\\" + m.type;
    i = !0, n = n.slice(0, m.reStart) + C + "\\(" + T;
  }
  v(), o && (n += "\\\\");
  var R = !1;
  switch (n.charAt(0)) {
    case "[":
    case ".":
    case "(":
      R = !0;
  }
  for (var D = f.length - 1; D > -1; D--) {
    var N = f[D], q = n.slice(0, N.reStart), Y = n.slice(N.reStart, N.reEnd - 8), J = n.slice(N.reEnd - 8, N.reEnd), te = n.slice(N.reEnd);
    J += te;
    var fe = q.split("(").length - 1, oe = te;
    for (b = 0; b < fe; b++)
      oe = oe.replace(/\)[+*?]?/, "");
    te = oe;
    var be = "";
    te === "" && e !== tr && (be = "$");
    var Oe = q + Y + te + be + J;
    n = Oe;
  }
  if (n !== "" && i && (n = "(?=.)" + n), R && (n = y + n), e === tr)
    return [n, i];
  if (!i)
    return Yp(t);
  var Ae = r.nocase ? "i" : "";
  try {
    var le = new RegExp("^" + n + "$", Ae);
  } catch {
    return new RegExp("$.");
  }
  return le._glob = t, le._src = n, le;
}
he.makeRe = function(t, e) {
  return new ee(t, e || {}).makeRe();
};
ee.prototype.makeRe = zp;
function zp() {
  if (this.regexp || this.regexp === !1)
    return this.regexp;
  var t = this.set;
  if (!t.length)
    return this.regexp = !1, this.regexp;
  var e = this.options, r = e.noglobstar ? eo : e.dot ? Lp : Hp, n = e.nocase ? "i" : "", i = t.map(function(o) {
    return o.map(function(s) {
      return s === Eo ? r : typeof s == "string" ? Jp(s) : s._src;
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
  Gt.sep !== "/" && (e = e.split(Gt.sep).join("/")), e = e.split(La), this.debug(this.pattern, "split", e);
  var i = this.set;
  this.debug(this.pattern, "set", i);
  var o, s;
  for (s = e.length - 1; s >= 0 && (o = e[s], !o); s--)
    ;
  for (s = 0; s < i.length; s++) {
    var f = i[s], c = e;
    n.matchBase && f.length === 1 && (c = [o]);
    var u = this.matchOne(c, f, r);
    if (u)
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
  for (var i = 0, o = 0, s = t.length, f = e.length; i < s && o < f; i++, o++) {
    this.debug("matchOne loop");
    var c = e[o], u = t[i];
    if (this.debug(e, c, u), c === !1)
      return !1;
    if (c === Eo) {
      this.debug("GLOBSTAR", [e, c, u]);
      var l = i, p = o + 1;
      if (p === f) {
        for (this.debug("** at the end"); i < s; i++)
          if (t[i] === "." || t[i] === ".." || !n.dot && t[i].charAt(0) === ".")
            return !1;
        return !0;
      }
      for (; l < s; ) {
        var y = t[l];
        if (this.debug(`
globstar while`, t, l, e, p, y), this.matchOne(t.slice(l), e.slice(p), r))
          return this.debug("globstar found match!", l, s, y), !0;
        if (y === "." || y === ".." || !n.dot && y.charAt(0) === ".") {
          this.debug("dot detected!", t, l, e, p);
          break;
        }
        this.debug("globstar swallow a segment, and continue"), l++;
      }
      return !!(r && (this.debug(`
>>> no match, partial?`, t, l, e, p), l === s));
    }
    var g;
    if (typeof c == "string" ? (g = u === c, this.debug("string match", c, u, g)) : (g = u.match(c), this.debug("pattern match", c, u, g)), !g)
      return !1;
  }
  if (i === s && o === f)
    return !0;
  if (i === s)
    return r;
  if (o === f)
    return i === s - 1 && t[i] === "";
  throw new Error("wtf?");
};
function Yp(t) {
  return t.replace(/\\(.)/g, "$1");
}
function Jp(t) {
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
function Xp(t) {
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
class Ne {
  static get finalConfig() {
    var e, r, n, i, o, s, f, c;
    return Ne._finalConfig || (Ne._finalConfig = W(
      // @ts-ignore
      (c = (n = (r = (e = document.env) === null || e === void 0 ? void 0 : e.SUGAR) === null || r === void 0 ? void 0 : r.config) !== null && n !== void 0 ? n : (f = (s = (o = (i = window.top) === null || i === void 0 ? void 0 : i.document) === null || o === void 0 ? void 0 : o.env) === null || s === void 0 ? void 0 : s.SUGAR) === null || f === void 0 ? void 0 : f.config) !== null && c !== void 0 ? c : {}
    )), Ne._finalConfig;
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
    return ho(Ne.finalConfig, e);
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
    return Ws(Ne.finalConfig, e, r);
  }
}
function to(t, e = 1) {
  t = Hs(t);
  const r = [];
  if (e > 1) {
    if (e >= t.length)
      return t;
    for (let n = 0; n < e; n++) {
      let i = to(t, 1);
      for (; r.includes(i); )
        i = to(t, 1);
      r.push(i);
    }
    return r;
  } else if (e === 1)
    return t[Math.round(Math.random() * (t.length - 1))];
  return t;
}
var Wa = { exports: {} };
function Zp(t) {
  throw new Error('Could not dynamically require "' + t + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var Oi = { exports: {} }, fs;
function Qp() {
  return fs || (fs = 1, function(t, e) {
    (function(r, n) {
      t.exports = n();
    })(Q, function() {
      var r = r || function(n, i) {
        var o;
        if (typeof window < "u" && window.crypto && (o = window.crypto), typeof self < "u" && self.crypto && (o = self.crypto), typeof globalThis < "u" && globalThis.crypto && (o = globalThis.crypto), !o && typeof window < "u" && window.msCrypto && (o = window.msCrypto), !o && typeof Q < "u" && Q.crypto && (o = Q.crypto), !o && typeof Zp == "function")
          try {
            o = ea;
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
        }, f = Object.create || function() {
          function m() {
          }
          return function(O) {
            var S;
            return m.prototype = O, S = new m(), m.prototype = null, S;
          };
        }(), c = {}, u = c.lib = {}, l = u.Base = function() {
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
            extend: function(m) {
              var O = f(this);
              return m && O.mixIn(m), (!O.hasOwnProperty("init") || this.init === O.init) && (O.init = function() {
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
              var m = this.extend();
              return m.init.apply(m, arguments), m;
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
            mixIn: function(m) {
              for (var O in m)
                m.hasOwnProperty(O) && (this[O] = m[O]);
              m.hasOwnProperty("toString") && (this.toString = m.toString);
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
        }(), p = u.WordArray = l.extend({
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
          init: function(m, O) {
            m = this.words = m || [], O != i ? this.sigBytes = O : this.sigBytes = m.length * 4;
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
          toString: function(m) {
            return (m || g).stringify(this);
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
          concat: function(m) {
            var O = this.words, S = m.words, T = this.sigBytes, C = m.sigBytes;
            if (this.clamp(), T % 4)
              for (var R = 0; R < C; R++) {
                var D = S[R >>> 2] >>> 24 - R % 4 * 8 & 255;
                O[T + R >>> 2] |= D << 24 - (T + R) % 4 * 8;
              }
            else
              for (var N = 0; N < C; N += 4)
                O[T + N >>> 2] = S[N >>> 2];
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
            var m = this.words, O = this.sigBytes;
            m[O >>> 2] &= 4294967295 << 32 - O % 4 * 8, m.length = n.ceil(O / 4);
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
            var m = l.clone.call(this);
            return m.words = this.words.slice(0), m;
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
          random: function(m) {
            for (var O = [], S = 0; S < m; S += 4)
              O.push(s());
            return new p.init(O, m);
          }
        }), y = c.enc = {}, g = y.Hex = {
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
          stringify: function(m) {
            for (var O = m.words, S = m.sigBytes, T = [], C = 0; C < S; C++) {
              var R = O[C >>> 2] >>> 24 - C % 4 * 8 & 255;
              T.push((R >>> 4).toString(16)), T.push((R & 15).toString(16));
            }
            return T.join("");
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
          parse: function(m) {
            for (var O = m.length, S = [], T = 0; T < O; T += 2)
              S[T >>> 3] |= parseInt(m.substr(T, 2), 16) << 24 - T % 8 * 4;
            return new p.init(S, O / 2);
          }
        }, v = y.Latin1 = {
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
          stringify: function(m) {
            for (var O = m.words, S = m.sigBytes, T = [], C = 0; C < S; C++) {
              var R = O[C >>> 2] >>> 24 - C % 4 * 8 & 255;
              T.push(String.fromCharCode(R));
            }
            return T.join("");
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
          parse: function(m) {
            for (var O = m.length, S = [], T = 0; T < O; T++)
              S[T >>> 2] |= (m.charCodeAt(T) & 255) << 24 - T % 4 * 8;
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
          stringify: function(m) {
            try {
              return decodeURIComponent(escape(v.stringify(m)));
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
          parse: function(m) {
            return v.parse(unescape(encodeURIComponent(m)));
          }
        }, $ = u.BufferedBlockAlgorithm = l.extend({
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
          _append: function(m) {
            typeof m == "string" && (m = b.parse(m)), this._data.concat(m), this._nDataBytes += m.sigBytes;
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
          _process: function(m) {
            var O, S = this._data, T = S.words, C = S.sigBytes, R = this.blockSize, D = R * 4, N = C / D;
            m ? N = n.ceil(N) : N = n.max((N | 0) - this._minBufferSize, 0);
            var q = N * R, Y = n.min(q * 4, C);
            if (q) {
              for (var J = 0; J < q; J += R)
                this._doProcessBlock(T, J);
              O = T.splice(0, q), S.sigBytes -= Y;
            }
            return new p.init(O, Y);
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
            var m = l.clone.call(this);
            return m._data = this._data.clone(), m;
          },
          _minBufferSize: 0
        });
        u.Hasher = $.extend({
          /**
           * Configuration options.
           */
          cfg: l.extend(),
          /**
           * Initializes a newly created hasher.
           *
           * @param {Object} cfg (Optional) The configuration options to use for this hash computation.
           *
           * @example
           *
           *     var hasher = CryptoJS.algo.SHA256.create();
           */
          init: function(m) {
            this.cfg = this.cfg.extend(m), this.reset();
          },
          /**
           * Resets this hasher to its initial state.
           *
           * @example
           *
           *     hasher.reset();
           */
          reset: function() {
            $.reset.call(this), this._doReset();
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
          update: function(m) {
            return this._append(m), this._process(), this;
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
          finalize: function(m) {
            m && this._append(m);
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
          _createHelper: function(m) {
            return function(O, S) {
              return new m.init(S).finalize(O);
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
          _createHmacHelper: function(m) {
            return function(O, S) {
              return new x.HMAC.init(m, S).finalize(O);
            };
          }
        });
        var x = c.algo = {};
        return c;
      }(Math);
      return r;
    });
  }(Oi)), Oi.exports;
}
(function(t, e) {
  (function(r, n) {
    t.exports = n(Qp());
  })(Q, function(r) {
    return function(n) {
      var i = r, o = i.lib, s = o.WordArray, f = o.Hasher, c = i.algo, u = [];
      (function() {
        for (var b = 0; b < 64; b++)
          u[b] = n.abs(n.sin(b + 1)) * 4294967296 | 0;
      })();
      var l = c.MD5 = f.extend({
        _doReset: function() {
          this._hash = new s.init([
            1732584193,
            4023233417,
            2562383102,
            271733878
          ]);
        },
        _doProcessBlock: function(b, $) {
          for (var x = 0; x < 16; x++) {
            var m = $ + x, O = b[m];
            b[m] = (O << 8 | O >>> 24) & 16711935 | (O << 24 | O >>> 8) & 4278255360;
          }
          var S = this._hash.words, T = b[$ + 0], C = b[$ + 1], R = b[$ + 2], D = b[$ + 3], N = b[$ + 4], q = b[$ + 5], Y = b[$ + 6], J = b[$ + 7], te = b[$ + 8], fe = b[$ + 9], oe = b[$ + 10], be = b[$ + 11], Oe = b[$ + 12], Ae = b[$ + 13], le = b[$ + 14], k = b[$ + 15], j = S[0], A = S[1], _ = S[2], E = S[3];
          j = p(j, A, _, E, T, 7, u[0]), E = p(E, j, A, _, C, 12, u[1]), _ = p(_, E, j, A, R, 17, u[2]), A = p(A, _, E, j, D, 22, u[3]), j = p(j, A, _, E, N, 7, u[4]), E = p(E, j, A, _, q, 12, u[5]), _ = p(_, E, j, A, Y, 17, u[6]), A = p(A, _, E, j, J, 22, u[7]), j = p(j, A, _, E, te, 7, u[8]), E = p(E, j, A, _, fe, 12, u[9]), _ = p(_, E, j, A, oe, 17, u[10]), A = p(A, _, E, j, be, 22, u[11]), j = p(j, A, _, E, Oe, 7, u[12]), E = p(E, j, A, _, Ae, 12, u[13]), _ = p(_, E, j, A, le, 17, u[14]), A = p(A, _, E, j, k, 22, u[15]), j = y(j, A, _, E, C, 5, u[16]), E = y(E, j, A, _, Y, 9, u[17]), _ = y(_, E, j, A, be, 14, u[18]), A = y(A, _, E, j, T, 20, u[19]), j = y(j, A, _, E, q, 5, u[20]), E = y(E, j, A, _, oe, 9, u[21]), _ = y(_, E, j, A, k, 14, u[22]), A = y(A, _, E, j, N, 20, u[23]), j = y(j, A, _, E, fe, 5, u[24]), E = y(E, j, A, _, le, 9, u[25]), _ = y(_, E, j, A, D, 14, u[26]), A = y(A, _, E, j, te, 20, u[27]), j = y(j, A, _, E, Ae, 5, u[28]), E = y(E, j, A, _, R, 9, u[29]), _ = y(_, E, j, A, J, 14, u[30]), A = y(A, _, E, j, Oe, 20, u[31]), j = g(j, A, _, E, q, 4, u[32]), E = g(E, j, A, _, te, 11, u[33]), _ = g(_, E, j, A, be, 16, u[34]), A = g(A, _, E, j, le, 23, u[35]), j = g(j, A, _, E, C, 4, u[36]), E = g(E, j, A, _, N, 11, u[37]), _ = g(_, E, j, A, J, 16, u[38]), A = g(A, _, E, j, oe, 23, u[39]), j = g(j, A, _, E, Ae, 4, u[40]), E = g(E, j, A, _, T, 11, u[41]), _ = g(_, E, j, A, D, 16, u[42]), A = g(A, _, E, j, Y, 23, u[43]), j = g(j, A, _, E, fe, 4, u[44]), E = g(E, j, A, _, Oe, 11, u[45]), _ = g(_, E, j, A, k, 16, u[46]), A = g(A, _, E, j, R, 23, u[47]), j = v(j, A, _, E, T, 6, u[48]), E = v(E, j, A, _, J, 10, u[49]), _ = v(_, E, j, A, le, 15, u[50]), A = v(A, _, E, j, q, 21, u[51]), j = v(j, A, _, E, Oe, 6, u[52]), E = v(E, j, A, _, D, 10, u[53]), _ = v(_, E, j, A, oe, 15, u[54]), A = v(A, _, E, j, C, 21, u[55]), j = v(j, A, _, E, te, 6, u[56]), E = v(E, j, A, _, k, 10, u[57]), _ = v(_, E, j, A, Y, 15, u[58]), A = v(A, _, E, j, Ae, 21, u[59]), j = v(j, A, _, E, N, 6, u[60]), E = v(E, j, A, _, be, 10, u[61]), _ = v(_, E, j, A, R, 15, u[62]), A = v(A, _, E, j, fe, 21, u[63]), S[0] = S[0] + j | 0, S[1] = S[1] + A | 0, S[2] = S[2] + _ | 0, S[3] = S[3] + E | 0;
        },
        _doFinalize: function() {
          var b = this._data, $ = b.words, x = this._nDataBytes * 8, m = b.sigBytes * 8;
          $[m >>> 5] |= 128 << 24 - m % 32;
          var O = n.floor(x / 4294967296), S = x;
          $[(m + 64 >>> 9 << 4) + 15] = (O << 8 | O >>> 24) & 16711935 | (O << 24 | O >>> 8) & 4278255360, $[(m + 64 >>> 9 << 4) + 14] = (S << 8 | S >>> 24) & 16711935 | (S << 24 | S >>> 8) & 4278255360, b.sigBytes = ($.length + 1) * 4, this._process();
          for (var T = this._hash, C = T.words, R = 0; R < 4; R++) {
            var D = C[R];
            C[R] = (D << 8 | D >>> 24) & 16711935 | (D << 24 | D >>> 8) & 4278255360;
          }
          return T;
        },
        clone: function() {
          var b = f.clone.call(this);
          return b._hash = this._hash.clone(), b;
        }
      });
      function p(b, $, x, m, O, S, T) {
        var C = b + ($ & x | ~$ & m) + O + T;
        return (C << S | C >>> 32 - S) + $;
      }
      function y(b, $, x, m, O, S, T) {
        var C = b + ($ & m | x & ~m) + O + T;
        return (C << S | C >>> 32 - S) + $;
      }
      function g(b, $, x, m, O, S, T) {
        var C = b + ($ ^ x ^ m) + O + T;
        return (C << S | C >>> 32 - S) + $;
      }
      function v(b, $, x, m, O, S, T) {
        var C = b + (x ^ ($ | ~m)) + O + T;
        return (C << S | C >>> 32 - S) + $;
      }
      i.MD5 = f._createHelper(l), i.HmacMD5 = f._createHmacHelper(l);
    }(Math), r.MD5;
  });
})(Wa);
var ed = Wa.exports;
const td = /* @__PURE__ */ We(ed);
function $o(t) {
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
var xo = { exports: {} }, Ai, ls;
function rd() {
  return ls || (ls = 1, Ai = {
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
  }), Ai;
}
var ji, ps;
function Ua() {
  if (ps)
    return ji;
  ps = 1;
  const t = rd(), e = {};
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
  ji = r;
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
    const o = i[0] / 255, s = i[1] / 255, f = i[2] / 255, c = Math.min(o, s, f), u = Math.max(o, s, f), l = u - c;
    let p, y;
    u === c ? p = 0 : o === u ? p = (s - f) / l : s === u ? p = 2 + (f - o) / l : f === u && (p = 4 + (o - s) / l), p = Math.min(p * 60, 360), p < 0 && (p += 360);
    const g = (c + u) / 2;
    return u === c ? y = 0 : g <= 0.5 ? y = l / (u + c) : y = l / (2 - u - c), [p, y * 100, g * 100];
  }, r.rgb.hsv = function(i) {
    let o, s, f, c, u;
    const l = i[0] / 255, p = i[1] / 255, y = i[2] / 255, g = Math.max(l, p, y), v = g - Math.min(l, p, y), b = function($) {
      return (g - $) / 6 / v + 1 / 2;
    };
    return v === 0 ? (c = 0, u = 0) : (u = v / g, o = b(l), s = b(p), f = b(y), l === g ? c = f - s : p === g ? c = 1 / 3 + o - f : y === g && (c = 2 / 3 + s - o), c < 0 ? c += 1 : c > 1 && (c -= 1)), [
      c * 360,
      u * 100,
      g * 100
    ];
  }, r.rgb.hwb = function(i) {
    const o = i[0], s = i[1];
    let f = i[2];
    const c = r.rgb.hsl(i)[0], u = 1 / 255 * Math.min(o, Math.min(s, f));
    return f = 1 - 1 / 255 * Math.max(o, Math.max(s, f)), [c, u * 100, f * 100];
  }, r.rgb.cmyk = function(i) {
    const o = i[0] / 255, s = i[1] / 255, f = i[2] / 255, c = Math.min(1 - o, 1 - s, 1 - f), u = (1 - o - c) / (1 - c) || 0, l = (1 - s - c) / (1 - c) || 0, p = (1 - f - c) / (1 - c) || 0;
    return [u * 100, l * 100, p * 100, c * 100];
  };
  function n(i, o) {
    return (i[0] - o[0]) ** 2 + (i[1] - o[1]) ** 2 + (i[2] - o[2]) ** 2;
  }
  return r.rgb.keyword = function(i) {
    const o = e[i];
    if (o)
      return o;
    let s = 1 / 0, f;
    for (const c of Object.keys(t)) {
      const u = t[c], l = n(i, u);
      l < s && (s = l, f = c);
    }
    return f;
  }, r.keyword.rgb = function(i) {
    return t[i];
  }, r.rgb.xyz = function(i) {
    let o = i[0] / 255, s = i[1] / 255, f = i[2] / 255;
    o = o > 0.04045 ? ((o + 0.055) / 1.055) ** 2.4 : o / 12.92, s = s > 0.04045 ? ((s + 0.055) / 1.055) ** 2.4 : s / 12.92, f = f > 0.04045 ? ((f + 0.055) / 1.055) ** 2.4 : f / 12.92;
    const c = o * 0.4124 + s * 0.3576 + f * 0.1805, u = o * 0.2126 + s * 0.7152 + f * 0.0722, l = o * 0.0193 + s * 0.1192 + f * 0.9505;
    return [c * 100, u * 100, l * 100];
  }, r.rgb.lab = function(i) {
    const o = r.rgb.xyz(i);
    let s = o[0], f = o[1], c = o[2];
    s /= 95.047, f /= 100, c /= 108.883, s = s > 8856e-6 ? s ** (1 / 3) : 7.787 * s + 16 / 116, f = f > 8856e-6 ? f ** (1 / 3) : 7.787 * f + 16 / 116, c = c > 8856e-6 ? c ** (1 / 3) : 7.787 * c + 16 / 116;
    const u = 116 * f - 16, l = 500 * (s - f), p = 200 * (f - c);
    return [u, l, p];
  }, r.hsl.rgb = function(i) {
    const o = i[0] / 360, s = i[1] / 100, f = i[2] / 100;
    let c, u, l;
    if (s === 0)
      return l = f * 255, [l, l, l];
    f < 0.5 ? c = f * (1 + s) : c = f + s - f * s;
    const p = 2 * f - c, y = [0, 0, 0];
    for (let g = 0; g < 3; g++)
      u = o + 1 / 3 * -(g - 1), u < 0 && u++, u > 1 && u--, 6 * u < 1 ? l = p + (c - p) * 6 * u : 2 * u < 1 ? l = c : 3 * u < 2 ? l = p + (c - p) * (2 / 3 - u) * 6 : l = p, y[g] = l * 255;
    return y;
  }, r.hsl.hsv = function(i) {
    const o = i[0];
    let s = i[1] / 100, f = i[2] / 100, c = s;
    const u = Math.max(f, 0.01);
    f *= 2, s *= f <= 1 ? f : 2 - f, c *= u <= 1 ? u : 2 - u;
    const l = (f + s) / 2, p = f === 0 ? 2 * c / (u + c) : 2 * s / (f + s);
    return [o, p * 100, l * 100];
  }, r.hsv.rgb = function(i) {
    const o = i[0] / 60, s = i[1] / 100;
    let f = i[2] / 100;
    const c = Math.floor(o) % 6, u = o - Math.floor(o), l = 255 * f * (1 - s), p = 255 * f * (1 - s * u), y = 255 * f * (1 - s * (1 - u));
    switch (f *= 255, c) {
      case 0:
        return [f, y, l];
      case 1:
        return [p, f, l];
      case 2:
        return [l, f, y];
      case 3:
        return [l, p, f];
      case 4:
        return [y, l, f];
      case 5:
        return [f, l, p];
    }
  }, r.hsv.hsl = function(i) {
    const o = i[0], s = i[1] / 100, f = i[2] / 100, c = Math.max(f, 0.01);
    let u, l;
    l = (2 - s) * f;
    const p = (2 - s) * c;
    return u = s * c, u /= p <= 1 ? p : 2 - p, u = u || 0, l /= 2, [o, u * 100, l * 100];
  }, r.hwb.rgb = function(i) {
    const o = i[0] / 360;
    let s = i[1] / 100, f = i[2] / 100;
    const c = s + f;
    let u;
    c > 1 && (s /= c, f /= c);
    const l = Math.floor(6 * o), p = 1 - f;
    u = 6 * o - l, l & 1 && (u = 1 - u);
    const y = s + u * (p - s);
    let g, v, b;
    switch (l) {
      default:
      case 6:
      case 0:
        g = p, v = y, b = s;
        break;
      case 1:
        g = y, v = p, b = s;
        break;
      case 2:
        g = s, v = p, b = y;
        break;
      case 3:
        g = s, v = y, b = p;
        break;
      case 4:
        g = y, v = s, b = p;
        break;
      case 5:
        g = p, v = s, b = y;
        break;
    }
    return [g * 255, v * 255, b * 255];
  }, r.cmyk.rgb = function(i) {
    const o = i[0] / 100, s = i[1] / 100, f = i[2] / 100, c = i[3] / 100, u = 1 - Math.min(1, o * (1 - c) + c), l = 1 - Math.min(1, s * (1 - c) + c), p = 1 - Math.min(1, f * (1 - c) + c);
    return [u * 255, l * 255, p * 255];
  }, r.xyz.rgb = function(i) {
    const o = i[0] / 100, s = i[1] / 100, f = i[2] / 100;
    let c, u, l;
    return c = o * 3.2406 + s * -1.5372 + f * -0.4986, u = o * -0.9689 + s * 1.8758 + f * 0.0415, l = o * 0.0557 + s * -0.204 + f * 1.057, c = c > 31308e-7 ? 1.055 * c ** (1 / 2.4) - 0.055 : c * 12.92, u = u > 31308e-7 ? 1.055 * u ** (1 / 2.4) - 0.055 : u * 12.92, l = l > 31308e-7 ? 1.055 * l ** (1 / 2.4) - 0.055 : l * 12.92, c = Math.min(Math.max(0, c), 1), u = Math.min(Math.max(0, u), 1), l = Math.min(Math.max(0, l), 1), [c * 255, u * 255, l * 255];
  }, r.xyz.lab = function(i) {
    let o = i[0], s = i[1], f = i[2];
    o /= 95.047, s /= 100, f /= 108.883, o = o > 8856e-6 ? o ** (1 / 3) : 7.787 * o + 16 / 116, s = s > 8856e-6 ? s ** (1 / 3) : 7.787 * s + 16 / 116, f = f > 8856e-6 ? f ** (1 / 3) : 7.787 * f + 16 / 116;
    const c = 116 * s - 16, u = 500 * (o - s), l = 200 * (s - f);
    return [c, u, l];
  }, r.lab.xyz = function(i) {
    const o = i[0], s = i[1], f = i[2];
    let c, u, l;
    u = (o + 16) / 116, c = s / 500 + u, l = u - f / 200;
    const p = u ** 3, y = c ** 3, g = l ** 3;
    return u = p > 8856e-6 ? p : (u - 16 / 116) / 7.787, c = y > 8856e-6 ? y : (c - 16 / 116) / 7.787, l = g > 8856e-6 ? g : (l - 16 / 116) / 7.787, c *= 95.047, u *= 100, l *= 108.883, [c, u, l];
  }, r.lab.lch = function(i) {
    const o = i[0], s = i[1], f = i[2];
    let c;
    c = Math.atan2(f, s) * 360 / 2 / Math.PI, c < 0 && (c += 360);
    const l = Math.sqrt(s * s + f * f);
    return [o, l, c];
  }, r.lch.lab = function(i) {
    const o = i[0], s = i[1], c = i[2] / 360 * 2 * Math.PI, u = s * Math.cos(c), l = s * Math.sin(c);
    return [o, u, l];
  }, r.rgb.ansi16 = function(i, o = null) {
    const [s, f, c] = i;
    let u = o === null ? r.rgb.hsv(i)[2] : o;
    if (u = Math.round(u / 50), u === 0)
      return 30;
    let l = 30 + (Math.round(c / 255) << 2 | Math.round(f / 255) << 1 | Math.round(s / 255));
    return u === 2 && (l += 60), l;
  }, r.hsv.ansi16 = function(i) {
    return r.rgb.ansi16(r.hsv.rgb(i), i[2]);
  }, r.rgb.ansi256 = function(i) {
    const o = i[0], s = i[1], f = i[2];
    return o === s && s === f ? o < 8 ? 16 : o > 248 ? 231 : Math.round((o - 8) / 247 * 24) + 232 : 16 + 36 * Math.round(o / 255 * 5) + 6 * Math.round(s / 255 * 5) + Math.round(f / 255 * 5);
  }, r.ansi16.rgb = function(i) {
    let o = i % 10;
    if (o === 0 || o === 7)
      return i > 50 && (o += 3.5), o = o / 10.5 * 255, [o, o, o];
    const s = (~~(i > 50) + 1) * 0.5, f = (o & 1) * s * 255, c = (o >> 1 & 1) * s * 255, u = (o >> 2 & 1) * s * 255;
    return [f, c, u];
  }, r.ansi256.rgb = function(i) {
    if (i >= 232) {
      const u = (i - 232) * 10 + 8;
      return [u, u, u];
    }
    i -= 16;
    let o;
    const s = Math.floor(i / 36) / 5 * 255, f = Math.floor((o = i % 36) / 6) / 5 * 255, c = o % 6 / 5 * 255;
    return [s, f, c];
  }, r.rgb.hex = function(i) {
    const s = (((Math.round(i[0]) & 255) << 16) + ((Math.round(i[1]) & 255) << 8) + (Math.round(i[2]) & 255)).toString(16).toUpperCase();
    return "000000".substring(s.length) + s;
  }, r.hex.rgb = function(i) {
    const o = i.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
    if (!o)
      return [0, 0, 0];
    let s = o[0];
    o[0].length === 3 && (s = s.split("").map((p) => p + p).join(""));
    const f = parseInt(s, 16), c = f >> 16 & 255, u = f >> 8 & 255, l = f & 255;
    return [c, u, l];
  }, r.rgb.hcg = function(i) {
    const o = i[0] / 255, s = i[1] / 255, f = i[2] / 255, c = Math.max(Math.max(o, s), f), u = Math.min(Math.min(o, s), f), l = c - u;
    let p, y;
    return l < 1 ? p = u / (1 - l) : p = 0, l <= 0 ? y = 0 : c === o ? y = (s - f) / l % 6 : c === s ? y = 2 + (f - o) / l : y = 4 + (o - s) / l, y /= 6, y %= 1, [y * 360, l * 100, p * 100];
  }, r.hsl.hcg = function(i) {
    const o = i[1] / 100, s = i[2] / 100, f = s < 0.5 ? 2 * o * s : 2 * o * (1 - s);
    let c = 0;
    return f < 1 && (c = (s - 0.5 * f) / (1 - f)), [i[0], f * 100, c * 100];
  }, r.hsv.hcg = function(i) {
    const o = i[1] / 100, s = i[2] / 100, f = o * s;
    let c = 0;
    return f < 1 && (c = (s - f) / (1 - f)), [i[0], f * 100, c * 100];
  }, r.hcg.rgb = function(i) {
    const o = i[0] / 360, s = i[1] / 100, f = i[2] / 100;
    if (s === 0)
      return [f * 255, f * 255, f * 255];
    const c = [0, 0, 0], u = o % 1 * 6, l = u % 1, p = 1 - l;
    let y = 0;
    switch (Math.floor(u)) {
      case 0:
        c[0] = 1, c[1] = l, c[2] = 0;
        break;
      case 1:
        c[0] = p, c[1] = 1, c[2] = 0;
        break;
      case 2:
        c[0] = 0, c[1] = 1, c[2] = l;
        break;
      case 3:
        c[0] = 0, c[1] = p, c[2] = 1;
        break;
      case 4:
        c[0] = l, c[1] = 0, c[2] = 1;
        break;
      default:
        c[0] = 1, c[1] = 0, c[2] = p;
    }
    return y = (1 - s) * f, [
      (s * c[0] + y) * 255,
      (s * c[1] + y) * 255,
      (s * c[2] + y) * 255
    ];
  }, r.hcg.hsv = function(i) {
    const o = i[1] / 100, s = i[2] / 100, f = o + s * (1 - o);
    let c = 0;
    return f > 0 && (c = o / f), [i[0], c * 100, f * 100];
  }, r.hcg.hsl = function(i) {
    const o = i[1] / 100, f = i[2] / 100 * (1 - o) + 0.5 * o;
    let c = 0;
    return f > 0 && f < 0.5 ? c = o / (2 * f) : f >= 0.5 && f < 1 && (c = o / (2 * (1 - f))), [i[0], c * 100, f * 100];
  }, r.hcg.hwb = function(i) {
    const o = i[1] / 100, s = i[2] / 100, f = o + s * (1 - o);
    return [i[0], (f - o) * 100, (1 - f) * 100];
  }, r.hwb.hcg = function(i) {
    const o = i[1] / 100, f = 1 - i[2] / 100, c = f - o;
    let u = 0;
    return c < 1 && (u = (f - c) / (1 - c)), [i[0], c * 100, u * 100];
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
    const o = Math.round(i[0] / 100 * 255) & 255, f = ((o << 16) + (o << 8) + o).toString(16).toUpperCase();
    return "000000".substring(f.length) + f;
  }, r.rgb.gray = function(i) {
    return [(i[0] + i[1] + i[2]) / 3 / 255 * 100];
  }, ji;
}
var Ei, ds;
function nd() {
  if (ds)
    return Ei;
  ds = 1;
  const t = Ua();
  function e() {
    const o = {}, s = Object.keys(t);
    for (let f = s.length, c = 0; c < f; c++)
      o[s[c]] = {
        // http://jsperf.com/1-vs-infinity
        // micro-opt, but this is simple.
        distance: -1,
        parent: null
      };
    return o;
  }
  function r(o) {
    const s = e(), f = [o];
    for (s[o].distance = 0; f.length; ) {
      const c = f.pop(), u = Object.keys(t[c]);
      for (let l = u.length, p = 0; p < l; p++) {
        const y = u[p], g = s[y];
        g.distance === -1 && (g.distance = s[c].distance + 1, g.parent = c, f.unshift(y));
      }
    }
    return s;
  }
  function n(o, s) {
    return function(f) {
      return s(o(f));
    };
  }
  function i(o, s) {
    const f = [s[o].parent, o];
    let c = t[s[o].parent][o], u = s[o].parent;
    for (; s[u].parent; )
      f.unshift(s[u].parent), c = n(t[s[u].parent][u], c), u = s[u].parent;
    return c.conversion = f, c;
  }
  return Ei = function(o) {
    const s = r(o), f = {}, c = Object.keys(s);
    for (let u = c.length, l = 0; l < u; l++) {
      const p = c[l];
      s[p].parent !== null && (f[p] = i(p, s));
    }
    return f;
  }, Ei;
}
var $i, ys;
function id() {
  if (ys)
    return $i;
  ys = 1;
  const t = Ua(), e = nd(), r = {}, n = Object.keys(t);
  function i(s) {
    const f = function(...c) {
      const u = c[0];
      return u == null ? u : (u.length > 1 && (c = u), s(c));
    };
    return "conversion" in s && (f.conversion = s.conversion), f;
  }
  function o(s) {
    const f = function(...c) {
      const u = c[0];
      if (u == null)
        return u;
      u.length > 1 && (c = u);
      const l = s(c);
      if (typeof l == "object")
        for (let p = l.length, y = 0; y < p; y++)
          l[y] = Math.round(l[y]);
      return l;
    };
    return "conversion" in s && (f.conversion = s.conversion), f;
  }
  return n.forEach((s) => {
    r[s] = {}, Object.defineProperty(r[s], "channels", { value: t[s].channels }), Object.defineProperty(r[s], "labels", { value: t[s].labels });
    const f = e(s);
    Object.keys(f).forEach((u) => {
      const l = f[u];
      r[s][u] = o(l), r[s][u].raw = i(l);
    });
  }), $i = r, $i;
}
xo.exports;
(function(t) {
  const e = (l, p) => (...y) => `\x1B[${l(...y) + p}m`, r = (l, p) => (...y) => {
    const g = l(...y);
    return `\x1B[${38 + p};5;${g}m`;
  }, n = (l, p) => (...y) => {
    const g = l(...y);
    return `\x1B[${38 + p};2;${g[0]};${g[1]};${g[2]}m`;
  }, i = (l) => l, o = (l, p, y) => [l, p, y], s = (l, p, y) => {
    Object.defineProperty(l, p, {
      get: () => {
        const g = y();
        return Object.defineProperty(l, p, {
          value: g,
          enumerable: !0,
          configurable: !0
        }), g;
      },
      enumerable: !0,
      configurable: !0
    });
  };
  let f;
  const c = (l, p, y, g) => {
    f === void 0 && (f = id());
    const v = g ? 10 : 0, b = {};
    for (const [$, x] of Object.entries(f)) {
      const m = $ === "ansi16" ? "ansi" : $;
      $ === p ? b[m] = l(y, v) : typeof x == "object" && (b[m] = l(x[p], v));
    }
    return b;
  };
  function u() {
    const l = /* @__PURE__ */ new Map(), p = {
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
      for (const [v, b] of Object.entries(g))
        p[v] = {
          open: `\x1B[${b[0]}m`,
          close: `\x1B[${b[1]}m`
        }, g[v] = p[v], l.set(b[0], b[1]);
      Object.defineProperty(p, y, {
        value: g,
        enumerable: !1
      });
    }
    return Object.defineProperty(p, "codes", {
      value: l,
      enumerable: !1
    }), p.color.close = "\x1B[39m", p.bgColor.close = "\x1B[49m", s(p.color, "ansi", () => c(e, "ansi16", i, !1)), s(p.color, "ansi256", () => c(r, "ansi256", i, !1)), s(p.color, "ansi16m", () => c(n, "rgb", o, !1)), s(p.bgColor, "ansi", () => c(e, "ansi16", i, !0)), s(p.bgColor, "ansi256", () => c(r, "ansi256", i, !0)), s(p.bgColor, "ansi16m", () => c(n, "rgb", o, !0)), p;
  }
  Object.defineProperty(t, "exports", {
    enumerable: !0,
    get: u
  });
})(xo);
var od = xo.exports, sd = {
  stdout: !1,
  stderr: !1
};
const ad = (t, e, r) => {
  let n = t.indexOf(e);
  if (n === -1)
    return t;
  const i = e.length;
  let o = 0, s = "";
  do
    s += t.substr(o, n - o) + e + r, o = n + i, n = t.indexOf(e, o);
  while (n !== -1);
  return s += t.substr(o), s;
}, cd = (t, e, r, n) => {
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
var ud = {
  stringReplaceAll: ad,
  stringEncaseCRLFWithFirstIndex: cd
}, xi, hs;
function fd() {
  if (hs)
    return xi;
  hs = 1;
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
  function o(u) {
    const l = u[0] === "u", p = u[1] === "{";
    return l && !p && u.length === 5 || u[0] === "x" && u.length === 3 ? String.fromCharCode(parseInt(u.slice(1), 16)) : l && p ? String.fromCodePoint(parseInt(u.slice(2, -1), 16)) : i.get(u) || u;
  }
  function s(u, l) {
    const p = [], y = l.trim().split(/\s*,\s*/g);
    let g;
    for (const v of y) {
      const b = Number(v);
      if (!Number.isNaN(b))
        p.push(b);
      else if (g = v.match(r))
        p.push(g[2].replace(n, ($, x, m) => x ? o(x) : m));
      else
        throw new Error(`Invalid Chalk template style argument: ${v} (in style '${u}')`);
    }
    return p;
  }
  function f(u) {
    e.lastIndex = 0;
    const l = [];
    let p;
    for (; (p = e.exec(u)) !== null; ) {
      const y = p[1];
      if (p[2]) {
        const g = s(y, p[2]);
        l.push([y].concat(g));
      } else
        l.push([y]);
    }
    return l;
  }
  function c(u, l) {
    const p = {};
    for (const g of l)
      for (const v of g.styles)
        p[v[0]] = g.inverse ? null : v.slice(1);
    let y = u;
    for (const [g, v] of Object.entries(p))
      if (Array.isArray(v)) {
        if (!(g in y))
          throw new Error(`Unknown Chalk style: ${g}`);
        y = v.length > 0 ? y[g](...v) : y[g];
      }
    return y;
  }
  return xi = (u, l) => {
    const p = [], y = [];
    let g = [];
    if (l.replace(t, (v, b, $, x, m, O) => {
      if (b)
        g.push(o(b));
      else if (x) {
        const S = g.join("");
        g = [], y.push(p.length === 0 ? S : c(u, p)(S)), p.push({ inverse: $, styles: f(x) });
      } else if (m) {
        if (p.length === 0)
          throw new Error("Found extraneous } in Chalk template literal");
        y.push(c(u, p)(g.join(""))), g = [], p.pop();
      } else
        g.push(O);
    }), y.push(g.join("")), p.length > 0) {
      const v = `Chalk template literal is missing ${p.length} closing bracket${p.length === 1 ? "" : "s"} (\`}\`)`;
      throw new Error(v);
    }
    return y.join("");
  }, xi;
}
const Kt = od, { stdout: ro, stderr: no } = sd, {
  stringReplaceAll: ld,
  stringEncaseCRLFWithFirstIndex: pd
} = ud, { isArray: Ar } = Array, Ga = [
  "ansi",
  "ansi",
  "ansi256",
  "ansi16m"
], ht = /* @__PURE__ */ Object.create(null), dd = (t, e = {}) => {
  if (e.level && !(Number.isInteger(e.level) && e.level >= 0 && e.level <= 3))
    throw new Error("The `level` option should be an integer from 0 to 3");
  const r = ro ? ro.level : 0;
  t.level = e.level === void 0 ? r : e.level;
};
class yd {
  constructor(e) {
    return Ka(e);
  }
}
const Ka = (t) => {
  const e = {};
  return dd(e, t), e.template = (...r) => Va(e.template, ...r), Object.setPrototypeOf(e, kr.prototype), Object.setPrototypeOf(e.template, e), e.template.constructor = () => {
    throw new Error("`chalk.constructor()` is deprecated. Use `new chalk.Instance()` instead.");
  }, e.template.Instance = yd, e.template;
};
function kr(t) {
  return Ka(t);
}
for (const [t, e] of Object.entries(Kt))
  ht[t] = {
    get() {
      const r = Cr(this, To(e.open, e.close, this._styler), this._isEmpty);
      return Object.defineProperty(this, t, { value: r }), r;
    }
  };
ht.visible = {
  get() {
    const t = Cr(this, this._styler, !0);
    return Object.defineProperty(this, "visible", { value: t }), t;
  }
};
const qa = ["rgb", "hex", "keyword", "hsl", "hsv", "hwb", "ansi", "ansi256"];
for (const t of qa)
  ht[t] = {
    get() {
      const { level: e } = this;
      return function(...r) {
        const n = To(Kt.color[Ga[e]][t](...r), Kt.color.close, this._styler);
        return Cr(this, n, this._isEmpty);
      };
    }
  };
for (const t of qa) {
  const e = "bg" + t[0].toUpperCase() + t.slice(1);
  ht[e] = {
    get() {
      const { level: r } = this;
      return function(...n) {
        const i = To(Kt.bgColor[Ga[r]][t](...n), Kt.bgColor.close, this._styler);
        return Cr(this, i, this._isEmpty);
      };
    }
  };
}
const hd = Object.defineProperties(() => {
}, {
  ...ht,
  level: {
    enumerable: !0,
    get() {
      return this._generator.level;
    },
    set(t) {
      this._generator.level = t;
    }
  }
}), To = (t, e, r) => {
  let n, i;
  return r === void 0 ? (n = t, i = e) : (n = r.openAll + t, i = e + r.closeAll), {
    open: t,
    close: e,
    openAll: n,
    closeAll: i,
    parent: r
  };
}, Cr = (t, e, r) => {
  const n = (...i) => Ar(i[0]) && Ar(i[0].raw) ? gs(n, Va(n, ...i)) : gs(n, i.length === 1 ? "" + i[0] : i.join(" "));
  return Object.setPrototypeOf(n, hd), n._generator = t, n._styler = e, n._isEmpty = r, n;
}, gs = (t, e) => {
  if (t.level <= 0 || !e)
    return t._isEmpty ? "" : e;
  let r = t._styler;
  if (r === void 0)
    return e;
  const { openAll: n, closeAll: i } = r;
  if (e.indexOf("\x1B") !== -1)
    for (; r !== void 0; )
      e = ld(e, r.close, r.open), r = r.parent;
  const o = e.indexOf(`
`);
  return o !== -1 && (e = pd(e, i, n, o)), n + e + i;
};
let Ti;
const Va = (t, ...e) => {
  const [r] = e;
  if (!Ar(r) || !Ar(r.raw))
    return e.join(" ");
  const n = e.slice(1), i = [r.raw[0]];
  for (let o = 1; o < r.length; o++)
    i.push(
      String(n[o - 1]).replace(/[{}\\]/g, "\\$&"),
      String(r.raw[o])
    );
  return Ti === void 0 && (Ti = fd()), Ti(t, i.join(""));
};
Object.defineProperties(kr.prototype, ht);
const Pr = kr();
Pr.supportsColor = ro;
Pr.stderr = kr({ level: no ? no.level : 0 });
Pr.stderr.supportsColor = no;
var gd = Pr;
const je = /* @__PURE__ */ We(gd);
function bs(t) {
  const e = {};
  for (const [r, n] of t)
    e[r] = n;
  return e;
}
function bd(t) {
  return Array.isArray(t);
}
function vd(t) {
  return typeof t == "boolean";
}
function md(t) {
  return t && {}.toString.call(t) === "[object Function]";
}
function wd(t) {
  try {
    const e = JSON.parse(t);
    return !!Object.keys(e).length;
  } catch {
    return !1;
  }
  return !0;
}
function io(t) {
  return t instanceof Map;
}
function oo(t) {
  return t && typeof t == "object" && t.constructor === Object;
}
function He(t, e = {}) {
  if (e = W({
    beautify: !0,
    highlight: !0,
    verbose: !0,
    theme: {
      number: je.yellow,
      default: je.white,
      keyword: je.blue,
      regexp: je.red,
      string: je.whiteBright,
      class: je.yellow,
      function: je.yellow,
      comment: je.gray,
      variable: je.red,
      attr: je.green
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
  if (io(t) && (t = bs(t)), oo(t) || bd(t) || wd(t)) {
    try {
      t = Di(t);
    } catch {
    }
    t = yo(t, ({ value: i }) => i instanceof Map ? bs(i) : i);
    let n = JSON.stringify(t, null, e.beautify ? 4 : 0);
    return n = n.replace(/"([^"]+)":/g, "$1:").replace(/\uFFFF/g, '\\"'), e.highlight, n;
  }
  if (vd(t))
    return t ? "true" : "false";
  if (md(t))
    return "" + t;
  let r = "";
  try {
    t = Di(t), r = JSON.stringify(t, null, e.beautify ? 4 : 0);
  } catch {
    try {
      r = t.toString();
    } catch {
      r = t;
    }
  }
  return r;
}
const rr = {}, vs = {
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
    typeof t != "string" && (t = He(t));
    const e = td(t).toString();
    return rr[e] = t, e;
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
    if (!rr[t]) {
      console.warn(`The message "${t}" cannot be decrypted...`);
      return;
    }
    const e = rr[t];
    return delete rr[t], $o(e);
  }
};
let nr = {}, Lt = {};
function _d(t, e) {
  e = W({
    scope: "default",
    excludeBasics: !0
  }, e ?? {});
  const r = Xp(e), n = vs.encrypt(e.scope), i = vs.encrypt(t);
  if (nr[`${n}.${i}`])
    return nr[`${n}.${i}`];
  if (Lt[n] || (Lt[n] = []), Lt[n].length >= r.length) {
    const o = to(r);
    return nr[`${n}.${i}`] = o, o;
  } else
    for (let o = 0; o < r.length; o++)
      if (Lt[n].indexOf(r[o]) === -1)
        return Lt[n].push(r[o]), nr[`${n}.${i}`] = r[o], r[o];
}
function Sd(t, e) {
  var r = t == null ? null : typeof Symbol < "u" && t[Symbol.iterator] || t["@@iterator"];
  if (r != null) {
    var n, i, o, s, f = [], c = !0, u = !1;
    try {
      if (o = (r = r.call(t)).next, e === 0) {
        if (Object(r) !== r)
          return;
        c = !1;
      } else
        for (; !(c = (n = o.call(r)).done) && (f.push(n.value), f.length !== e); c = !0)
          ;
    } catch (l) {
      u = !0, i = l;
    } finally {
      try {
        if (!c && r.return != null && (s = r.return(), Object(s) !== s))
          return;
      } finally {
        if (u)
          throw i;
      }
    }
    return f;
  }
}
function Od(t, e) {
  if (!(t instanceof e))
    throw new TypeError("Cannot call a class as a function");
}
function ms(t, e) {
  for (var r = 0; r < e.length; r++) {
    var n = e[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, Ya(n.key), n);
  }
}
function Ad(t, e, r) {
  return e && ms(t.prototype, e), r && ms(t, r), Object.defineProperty(t, "prototype", {
    writable: !1
  }), t;
}
function ws(t, e, r) {
  return e = Ya(e), e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t;
}
function za(t, e) {
  return jd(t) || Sd(t, e) || Ed(t, e) || $d();
}
function jd(t) {
  if (Array.isArray(t))
    return t;
}
function Ed(t, e) {
  if (t) {
    if (typeof t == "string")
      return _s(t, e);
    var r = Object.prototype.toString.call(t).slice(8, -1);
    if (r === "Object" && t.constructor && (r = t.constructor.name), r === "Map" || r === "Set")
      return Array.from(t);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))
      return _s(t, e);
  }
}
function _s(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var r = 0, n = new Array(e); r < e; r++)
    n[r] = t[r];
  return n;
}
function $d() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function xd(t, e) {
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
function Ya(t) {
  var e = xd(t, "string");
  return typeof e == "symbol" ? e : String(e);
}
function Be(t, e) {
  var r = Xa(t, e, "get");
  return Td(t, r);
}
function Ja(t, e, r) {
  var n = Xa(t, e, "set");
  return kd(t, n, r), r;
}
function Xa(t, e, r) {
  if (!e.has(t))
    throw new TypeError("attempted to " + r + " private field on non-instance");
  return e.get(t);
}
function Td(t, e) {
  return e.get ? e.get.call(t) : e.value;
}
function kd(t, e, r) {
  if (e.set)
    e.set.call(t, r);
  else {
    if (!e.writable)
      throw new TypeError("attempted to set read only private field");
    e.value = r;
  }
}
function Ht(t, e, r) {
  if (!e.has(t))
    throw new TypeError("attempted to get private field on non-instance");
  return r;
}
function Za(t, e) {
  if (e.has(t))
    throw new TypeError("Cannot initialize the same private elements twice on an object");
}
function Ss(t, e, r) {
  Za(t, e), e.set(t, r);
}
function Os(t, e) {
  Za(t, e), e.add(t);
}
var Qa = [
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
function Cd(t) {
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
    var r = za(e, 2), n = r[0], i = r[1], o = t.lastIndexOf(n);
    ~o && t.splice(o, 1, i);
  }), t;
}
Cd(Qa);
var ec = "i", Le = /* @__PURE__ */ new WeakMap(), Ut = /* @__PURE__ */ new WeakMap(), ir = /* @__PURE__ */ new WeakSet(), ki = /* @__PURE__ */ new WeakSet(), Pd = /* @__PURE__ */ function() {
  function t(e) {
    var r = this;
    Od(this, t), Os(this, ki), Os(this, ir), Ss(this, Le, {
      writable: !0,
      value: void 0
    }), Ss(this, Ut, {
      writable: !0,
      value: void 0
    }), Ja(this, Le, e || Qa.slice()), Ht(this, ir, Ci).call(this);
    var n = function(o) {
      return r.test(o);
    };
    return Object.defineProperties(n, Object.entries(Object.getOwnPropertyDescriptors(t.prototype)).reduce(function(i, o) {
      var s = za(o, 2), f = s[0], c = s[1];
      return typeof c.value == "function" && Object.assign(i, ws({}, f, {
        value: r[f].bind(r)
      })), typeof c.get == "function" && Object.assign(i, ws({}, f, {
        get: function() {
          return r[f];
        }
      })), i;
    }, {}));
  }
  return Ad(t, [{
    key: "pattern",
    get: (
      /**
       * Get a clone of the pattern
       * @type RegExp
       */
      function() {
        return new RegExp(Be(this, Ut));
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
      return !!r && Be(this, Ut).test(r);
    }
    /**
     * Get the match for strings' known crawler pattern
     * @param  {string} ua User Agent string
     * @returns {string|null}
     */
  }, {
    key: "find",
    value: function() {
      var r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "", n = r.match(Be(this, Ut));
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
      return Be(this, Le).filter(function(n) {
        return new RegExp(n, ec).test(r);
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
      [].push.apply(Be(this, Le), n.filter(function(i) {
        return Ht(r, ki, As).call(r, i) === -1;
      }).map(function(i) {
        return i.toLowerCase();
      })), Ht(this, ir, Ci).call(this);
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
        var i = Ht(this, ki, As).call(this, r[n]);
        i > -1 && Be(this, Le).splice(i, 1);
      }
      Ht(this, ir, Ci).call(this);
    }
    /**
     * Create a new Isbot instance using given list or self's list
     * @param  {string[]} [list]
     * @returns {Isbot}
     */
  }, {
    key: "spawn",
    value: function(r) {
      return new t(r || Be(this, Le));
    }
  }]), t;
}();
function Ci() {
  Ja(this, Ut, new RegExp(Be(this, Le).join("|"), ec));
}
function As(t) {
  return Be(this, Le).indexOf(t.toLowerCase());
}
new Pd();
function Rd() {
  return process.send !== void 0 || process.env.IS_CHILD_PROCESS !== void 0;
}
var so = { exports: {} };
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
      const f = i(s);
      return /classCallCheck\(/.test(f) || /TypeError\("Cannot call a class as a function"\)/.test(f);
    }
    t.exports && (e = t.exports = o), e.isClass = o;
  })();
})(so, so.exports);
var Id = so.exports;
const Bd = /* @__PURE__ */ We(Id);
function qt(t) {
  Array.isArray(t) || (t = [t]);
  for (let e = 0; e < t.length; e++)
    if (!Bd(t[e]))
      return !1;
  return !0;
}
/*!
 * is-extglob <https://github.com/jonschlinkert/is-extglob>
 *
 * Copyright (c) 2014-2016, Jon Schlinkert.
 * Licensed under the MIT License.
 */
var Md = function(e) {
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
var Fd = Md, tc = { "{": "}", "(": ")", "[": "]" }, Dd = function(t) {
  if (t[0] === "!")
    return !0;
  for (var e = 0, r = -2, n = -2, i = -2, o = -2, s = -2; e < t.length; ) {
    if (t[e] === "*" || t[e + 1] === "?" && /[\].+)]/.test(t[e]) || n !== -1 && t[e] === "[" && t[e + 1] !== "]" && (n < e && (n = t.indexOf("]", e)), n > e && (s === -1 || s > n || (s = t.indexOf("\\", e), s === -1 || s > n))) || i !== -1 && t[e] === "{" && t[e + 1] !== "}" && (i = t.indexOf("}", e), i > e && (s = t.indexOf("\\", e), s === -1 || s > i)) || o !== -1 && t[e] === "(" && t[e + 1] === "?" && /[:!=]/.test(t[e + 2]) && t[e + 3] !== ")" && (o = t.indexOf(")", e), o > e && (s = t.indexOf("\\", e), s === -1 || s > o)) || r !== -1 && t[e] === "(" && t[e + 1] !== "|" && (r < e && (r = t.indexOf("|", e)), r !== -1 && t[r + 1] !== ")" && (o = t.indexOf(")", r), o > r && (s = t.indexOf("\\", r), s === -1 || s > o))))
      return !0;
    if (t[e] === "\\") {
      var f = t[e + 1];
      e += 2;
      var c = tc[f];
      if (c) {
        var u = t.indexOf(c, e);
        u !== -1 && (e = u + 1);
      }
      if (t[e] === "!")
        return !0;
    } else
      e++;
  }
  return !1;
}, Nd = function(t) {
  if (t[0] === "!")
    return !0;
  for (var e = 0; e < t.length; ) {
    if (/[*?{}()[\]]/.test(t[e]))
      return !0;
    if (t[e] === "\\") {
      var r = t[e + 1];
      e += 2;
      var n = tc[r];
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
}, Ld = function(e, r) {
  if (typeof e != "string" || e === "")
    return !1;
  if (Fd(e))
    return !0;
  var n = Dd;
  return r && r.strict === !1 && (n = Nd), n(e);
};
const Hd = /* @__PURE__ */ We(Ld);
function Wd(t) {
  return Hd(t);
}
function Ud(t) {
  return typeof t == "number" && !isNaN(t) && function(e) {
    return (e | 0) === e;
  }(parseFloat(t));
}
function ko() {
  return typeof process < "u" && process.release && process.release.name === "node";
}
function Gd(t) {
  return typeof t == "string" || t instanceof String;
}
function yr() {
  const t = URL.createObjectURL(new Blob());
  return `s-${t.substring(t.lastIndexOf("/") + 1)}`;
}
var rc = { exports: {} }, Co = { exports: {} }, nc = {}, Rr = {
  ROOT: 0,
  GROUP: 1,
  POSITION: 2,
  SET: 3,
  RANGE: 4,
  REPETITION: 5,
  REFERENCE: 6,
  CHAR: 7
}, Fe = {}, P = Rr, Po = function() {
  return [{ type: P.RANGE, from: 48, to: 57 }];
}, ic = function() {
  return [
    { type: P.CHAR, value: 95 },
    { type: P.RANGE, from: 97, to: 122 },
    { type: P.RANGE, from: 65, to: 90 }
  ].concat(Po());
}, oc = function() {
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
}, Kd = function() {
  return [
    { type: P.CHAR, value: 10 },
    { type: P.CHAR, value: 13 },
    { type: P.CHAR, value: 8232 },
    { type: P.CHAR, value: 8233 }
  ];
};
Fe.words = function() {
  return { type: P.SET, set: ic(), not: !1 };
};
Fe.notWords = function() {
  return { type: P.SET, set: ic(), not: !0 };
};
Fe.ints = function() {
  return { type: P.SET, set: Po(), not: !1 };
};
Fe.notInts = function() {
  return { type: P.SET, set: Po(), not: !0 };
};
Fe.whitespace = function() {
  return { type: P.SET, set: oc(), not: !1 };
};
Fe.notWhitespace = function() {
  return { type: P.SET, set: oc(), not: !0 };
};
Fe.anyChar = function() {
  return { type: P.SET, set: Kd(), not: !0 };
};
(function(t) {
  var e = Rr, r = Fe, n = "@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^ ?", i = { 0: 0, t: 9, n: 10, v: 11, f: 12, r: 13 };
  t.strToChars = function(o) {
    var s = /(\[\\b\])|(\\)?\\(?:u([A-F0-9]{4})|x([A-F0-9]{2})|(0?[0-7]{2})|c([@A-Z\[\\\]\^?])|([0tnvfr]))/g;
    return o = o.replace(s, function(f, c, u, l, p, y, g, v) {
      if (u)
        return f;
      var b = c ? 8 : l ? parseInt(l, 16) : p ? parseInt(p, 16) : y ? parseInt(y, 8) : g ? n.indexOf(g) : i[v], $ = String.fromCharCode(b);
      return /[\[\]{}\^$.|?*+()]/.test($) && ($ = "\\" + $), $;
    }), o;
  }, t.tokenizeClass = function(o, s) {
    for (var f = [], c = /\\(?:(w)|(d)|(s)|(W)|(D)|(S))|((?:(?:\\)(.)|([^\]\\]))-(?:\\)?([^\]]))|(\])|(?:\\)?(.)/g, u, l; (u = c.exec(o)) != null; )
      if (u[1])
        f.push(r.words());
      else if (u[2])
        f.push(r.ints());
      else if (u[3])
        f.push(r.whitespace());
      else if (u[4])
        f.push(r.notWords());
      else if (u[5])
        f.push(r.notInts());
      else if (u[6])
        f.push(r.notWhitespace());
      else if (u[7])
        f.push({
          type: e.RANGE,
          from: (u[8] || u[9]).charCodeAt(0),
          to: u[10].charCodeAt(0)
        });
      else if (l = u[12])
        f.push({
          type: e.CHAR,
          value: l.charCodeAt(0)
        });
      else
        return [f, c.lastIndex];
    t.error(s, "Unterminated character class");
  }, t.error = function(o, s) {
    throw new SyntaxError("Invalid regular expression: /" + o + "/: " + s);
  };
})(nc);
var Xt = {}, Ir = Rr;
Xt.wordBoundary = function() {
  return { type: Ir.POSITION, value: "b" };
};
Xt.nonWordBoundary = function() {
  return { type: Ir.POSITION, value: "B" };
};
Xt.begin = function() {
  return { type: Ir.POSITION, value: "^" };
};
Xt.end = function() {
  return { type: Ir.POSITION, value: "$" };
};
var st = nc, pe = Rr, tt = Fe, or = Xt;
Co.exports = function(t) {
  var e = 0, r, n, i = { type: pe.ROOT, stack: [] }, o = i, s = i.stack, f = [], c = function(x) {
    st.error(t, "Nothing to repeat at column " + (x - 1));
  }, u = st.strToChars(t);
  for (r = u.length; e < r; )
    switch (n = u[e++], n) {
      case "\\":
        switch (n = u[e++], n) {
          case "b":
            s.push(or.wordBoundary());
            break;
          case "B":
            s.push(or.nonWordBoundary());
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
        s.push(or.begin());
        break;
      case "$":
        s.push(or.end());
        break;
      case "[":
        var l;
        u[e] === "^" ? (l = !0, e++) : l = !1;
        var p = st.tokenizeClass(u.slice(e), t);
        e += p[1], s.push({
          type: pe.SET,
          set: p[0],
          not: l
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
        n = u[e], n === "?" && (n = u[e + 1], e += 2, n === "=" ? y.followedBy = !0 : n === "!" ? y.notFollowedBy = !0 : n !== ":" && st.error(
          t,
          "Invalid group, character '" + n + "' after '?' at column " + (e - 1)
        ), y.remember = !1), s.push(y), f.push(o), o = y, s = y.stack;
        break;
      case ")":
        f.length === 0 && st.error(t, "Unmatched ) at column " + (e - 1)), o = f.pop(), s = o.options ? o.options[o.options.length - 1] : o.stack;
        break;
      case "|":
        o.options || (o.options = [o.stack], delete o.stack);
        var g = [];
        o.options.push(g), s = g;
        break;
      case "{":
        var v = /^(\d+)(,(\d+)?)?\}/.exec(u.slice(e)), b, $;
        v !== null ? (s.length === 0 && c(e), b = parseInt(v[1], 10), $ = v[2] ? v[3] ? parseInt(v[3], 10) : 1 / 0 : b, e += v[0].length, s.push({
          type: pe.REPETITION,
          min: b,
          max: $,
          value: s.pop()
        })) : s.push({
          type: pe.CHAR,
          value: 123
        });
        break;
      case "?":
        s.length === 0 && c(e), s.push({
          type: pe.REPETITION,
          min: 0,
          max: 1,
          value: s.pop()
        });
        break;
      case "+":
        s.length === 0 && c(e), s.push({
          type: pe.REPETITION,
          min: 1,
          max: 1 / 0,
          value: s.pop()
        });
        break;
      case "*":
        s.length === 0 && c(e), s.push({
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
  return f.length !== 0 && st.error(t, "Unterminated group"), i;
};
Co.exports.types = pe;
var qd = Co.exports, sc = qd, Vd = sc.types, ac = function(t, e) {
  e || (e = {});
  var r = e.limit === void 0 ? 25 : e.limit;
  zd(t) ? t = t.source : typeof t != "string" && (t = String(t));
  try {
    t = sc(t);
  } catch {
    return !1;
  }
  var n = 0;
  return function i(o, s) {
    if (o.type === Vd.REPETITION && (s++, n++, s > 1 || n > r))
      return !1;
    if (o.options)
      for (var f = 0, c = o.options.length; f < c; f++) {
        var u = i({ stack: o.options[f] }, s);
        if (!u)
          return !1;
      }
    var l = o.stack || o.value && o.value.stack;
    if (!l)
      return !0;
    for (var f = 0; f < l.length; f++) {
      var u = i(l[f], s);
      if (!u)
        return !1;
    }
    return !0;
  }(t, 0);
};
function zd(t) {
  return {}.toString.call(t) === "[object RegExp]";
}
/*!
 * isobject <https://github.com/jonschlinkert/isobject>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */
var cc = function(e) {
  return e != null && typeof e == "object" && Array.isArray(e) === !1;
}, Yd = Object.prototype.toString, Ro = function(e) {
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
    return ey(e) ? "generatorfunction" : "function";
  if (Jd(e))
    return "array";
  if (ny(e))
    return "buffer";
  if (ry(e))
    return "arguments";
  if (Zd(e))
    return "date";
  if (Xd(e))
    return "error";
  if (Qd(e))
    return "regexp";
  switch (uc(e)) {
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
  if (ty(e))
    return "generator";
  switch (r = Yd.call(e), r) {
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
function uc(t) {
  return typeof t.constructor == "function" ? t.constructor.name : null;
}
function Jd(t) {
  return Array.isArray ? Array.isArray(t) : t instanceof Array;
}
function Xd(t) {
  return t instanceof Error || typeof t.message == "string" && t.constructor && typeof t.constructor.stackTraceLimit == "number";
}
function Zd(t) {
  return t instanceof Date ? !0 : typeof t.toDateString == "function" && typeof t.getDate == "function" && typeof t.setDate == "function";
}
function Qd(t) {
  return t instanceof RegExp ? !0 : typeof t.flags == "string" && typeof t.ignoreCase == "boolean" && typeof t.multiline == "boolean" && typeof t.global == "boolean";
}
function ey(t, e) {
  return uc(t) === "GeneratorFunction";
}
function ty(t) {
  return typeof t.throw == "function" && typeof t.return == "function" && typeof t.next == "function";
}
function ry(t) {
  try {
    if (typeof t.length == "number" && typeof t.callee == "function")
      return !0;
  } catch (e) {
    if (e.message.indexOf("callee") !== -1)
      return !0;
  }
  return !1;
}
function ny(t) {
  return t.constructor && typeof t.constructor.isBuffer == "function" ? t.constructor.isBuffer(t) : !1;
}
/*!
 * is-accessor-descriptor <https://github.com/jonschlinkert/is-accessor-descriptor>
 *
 * Copyright (c) 2015-2017, Jon Schlinkert.
 * Released under the MIT License.
 */
var js = Ro, Es = {
  get: "function",
  set: "function",
  configurable: "boolean",
  enumerable: "boolean"
};
function iy(t, e) {
  if (typeof e == "string") {
    var r = Object.getOwnPropertyDescriptor(t, e);
    return typeof r < "u";
  }
  if (js(t) !== "object" || sr(t, "value") || sr(t, "writable") || !sr(t, "get") || typeof t.get != "function" || sr(t, "set") && typeof t[n] != "function" && typeof t[n] < "u")
    return !1;
  for (var n in t)
    if (Es.hasOwnProperty(n) && js(t[n]) !== Es[n] && typeof t[n] < "u")
      return !1;
  return !0;
}
function sr(t, e) {
  return {}.hasOwnProperty.call(t, e);
}
var oy = iy;
/*!
 * is-data-descriptor <https://github.com/jonschlinkert/is-data-descriptor>
 *
 * Copyright (c) 2015-2017, Jon Schlinkert.
 * Released under the MIT License.
 */
var $s = Ro, sy = function(e, r) {
  var n = {
    configurable: "boolean",
    enumerable: "boolean",
    writable: "boolean"
  };
  if ($s(e) !== "object")
    return !1;
  if (typeof r == "string") {
    var i = Object.getOwnPropertyDescriptor(e, r);
    return typeof i < "u";
  }
  if (!("value" in e) && !("writable" in e))
    return !1;
  for (var o in e)
    if (o !== "value" && n.hasOwnProperty(o) && $s(e[o]) !== n[o] && typeof e[o] < "u")
      return !1;
  return !0;
};
/*!
 * is-descriptor <https://github.com/jonschlinkert/is-descriptor>
 *
 * Copyright (c) 2015-2017, Jon Schlinkert.
 * Released under the MIT License.
 */
var ay = Ro, cy = oy, uy = sy, fy = function(e, r) {
  return ay(e) !== "object" ? !1 : "get" in e ? cy(e, r) : uy(e, r);
};
/*!
 * define-property <https://github.com/jonschlinkert/define-property>
 *
 * Copyright (c) 2015-2018, Jon Schlinkert.
 * Released under the MIT License.
 */
var ly = cc, py = fy, xs = typeof Reflect < "u" && Reflect.defineProperty ? Reflect.defineProperty : Object.defineProperty, dy = function(e, r, n) {
  if (!ly(e) && typeof e != "function" && !Array.isArray(e))
    throw new TypeError("expected an object, function, or array");
  if (typeof r != "string")
    throw new TypeError('expected "key" to be a string');
  return py(n) ? (xs(e, r, n), e) : (xs(e, r, {
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
var yy = cc;
function Ts(t) {
  return yy(t) === !0 && Object.prototype.toString.call(t) === "[object Object]";
}
var hy = function(e) {
  var r, n;
  return !(Ts(e) === !1 || (r = e.constructor, typeof r != "function") || (n = r.prototype, Ts(n) === !1) || n.hasOwnProperty("isPrototypeOf") === !1);
};
/*!
 * is-extendable <https://github.com/jonschlinkert/is-extendable>
 *
 * Copyright (c) 2015-2017, Jon Schlinkert.
 * Released under the MIT License.
 */
var gy = hy, by = function(e) {
  return gy(e) || typeof e == "function" || Array.isArray(e);
};
/*!
 * assign-symbols <https://github.com/jonschlinkert/assign-symbols>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */
var vy = function(t, e) {
  if (t === null || typeof t > "u")
    throw new TypeError("expected first argument to be an object.");
  if (typeof e > "u" || typeof Symbol > "u" || typeof Object.getOwnPropertySymbols != "function")
    return t;
  for (var r = Object.prototype.propertyIsEnumerable, n = Object(t), i = arguments.length, o = 0; ++o < i; )
    for (var s = Object(arguments[o]), f = Object.getOwnPropertySymbols(s), c = 0; c < f.length; c++) {
      var u = f[c];
      r.call(s, u) && (n[u] = s[u]);
    }
  return n;
}, my = by, wy = vy, fc = Object.assign || function(t) {
  if (t === null || typeof t > "u")
    throw new TypeError("Cannot convert undefined or null to object");
  ks(t) || (t = {});
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e];
    Sy(r) && (r = Oy(r)), ks(r) && (_y(t, r), wy(t, r));
  }
  return t;
};
function _y(t, e) {
  for (var r in e)
    Ay(e, r) && (t[r] = e[r]);
}
function Sy(t) {
  return t && typeof t == "string";
}
function Oy(t) {
  var e = {};
  for (var r in t)
    e[r] = t[r];
  return e;
}
function ks(t) {
  return t && typeof t == "object" || my(t);
}
function Ay(t, e) {
  return Object.prototype.hasOwnProperty.call(t, e);
}
var jy = fc, Ey = ac;
function Io(t, e) {
  return new RegExp(Io.create(t, e));
}
Io.create = function(t, e) {
  if (typeof t != "string")
    throw new TypeError("expected a string");
  var r = jy({}, e);
  r.contains === !0 && (r.strictNegate = !1);
  var n = r.strictOpen !== !1 ? "^" : "", i = r.strictClose !== !1 ? "$" : "", o = r.endChar ? r.endChar : "+", s = t;
  r.strictNegate === !1 ? s = "(?:(?!(?:" + t + ")).)" + o : s = "(?:(?!^(?:" + t + ")$).)" + o;
  var f = n + s + i;
  if (r.safe === !0 && Ey(f) === !1)
    throw new Error("potentially unsafe regular expression: " + f);
  return f;
};
var $y = Io, xy = ac, ar = dy, Ty = fc, ky = $y, Cs = 1024 * 64, ao = {};
rc.exports = function(t, e) {
  return Array.isArray(t) ? co(t.join("|"), e) : co(t, e);
};
function co(t, e) {
  if (t instanceof RegExp)
    return t;
  if (typeof t != "string")
    throw new TypeError("expected a string");
  if (t.length > Cs)
    throw new Error("expected pattern to be less than " + Cs + " characters");
  var r = t;
  if ((!e || e && e.cache !== !1) && (r = Py(t, e), ao.hasOwnProperty(r)))
    return ao[r];
  var n = Ty({}, e);
  n.contains === !0 && (n.negate === !0 ? n.strictNegate = !1 : n.strict = !1), n.strict === !1 && (n.strictOpen = !1, n.strictClose = !1);
  var i = n.strictOpen !== !1 ? "^" : "", o = n.strictClose !== !1 ? "$" : "", s = n.flags || "", f;
  n.nocase === !0 && !/i/.test(s) && (s += "i");
  try {
    (n.negate || typeof n.strictNegate == "boolean") && (t = ky.create(t, n));
    var c = i + "(?:" + t + ")" + o;
    if (f = new RegExp(c, s), n.safe === !0 && xy(f) === !1)
      throw new Error("potentially unsafe regular expression: " + f.source);
  } catch (u) {
    if (n.strictErrors === !0 || n.safe === !0)
      throw u.key = r, u.pattern = t, u.originalOptions = e, u.createdOptions = n, u;
    try {
      f = new RegExp("^" + t.replace(/(\W)/g, "\\$1") + "$");
    } catch {
      f = /.^/;
    }
  }
  return n.cache !== !1 && Cy(f, r, t, n), f;
}
function Cy(t, e, r, n) {
  ar(t, "cached", !0), ar(t, "pattern", r), ar(t, "options", n), ar(t, "key", e), ao[e] = t;
}
function Py(t, e) {
  if (!e)
    return t;
  var r = t;
  for (var n in e)
    e.hasOwnProperty(n) && (r += ";" + n + "=" + String(e[n]));
  return r;
}
rc.exports.makeRe = co;
var Ry = {};
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
    function r(f) {
      return i(s(f), arguments);
    }
    function n(f, c) {
      return r.apply(null, [f].concat(c || []));
    }
    function i(f, c) {
      var u = 1, l = f.length, p, y = "", g, v, b, $, x, m, O, S;
      for (g = 0; g < l; g++)
        if (typeof f[g] == "string")
          y += f[g];
        else if (typeof f[g] == "object") {
          if (b = f[g], b.keys)
            for (p = c[u], v = 0; v < b.keys.length; v++) {
              if (p == null)
                throw new Error(r('[sprintf] Cannot access property "%s" of undefined value "%s"', b.keys[v], b.keys[v - 1]));
              p = p[b.keys[v]];
            }
          else
            b.param_no ? p = c[b.param_no] : p = c[u++];
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
          e.json.test(b.type) ? y += p : (e.number.test(b.type) && (!O || b.sign) ? (S = O ? "+" : "-", p = p.toString().replace(e.sign, "")) : S = "", x = b.pad_char ? b.pad_char === "0" ? "0" : b.pad_char.charAt(1) : " ", m = b.width - (S + p).length, $ = b.width && m > 0 ? x.repeat(m) : "", y += b.align ? S + p + $ : x === "0" ? S + $ + p : $ + S + p);
        }
      return y;
    }
    var o = /* @__PURE__ */ Object.create(null);
    function s(f) {
      if (o[f])
        return o[f];
      for (var c = f, u, l = [], p = 0; c; ) {
        if ((u = e.text.exec(c)) !== null)
          l.push(u[0]);
        else if ((u = e.modulo.exec(c)) !== null)
          l.push("%");
        else if ((u = e.placeholder.exec(c)) !== null) {
          if (u[2]) {
            p |= 1;
            var y = [], g = u[2], v = [];
            if ((v = e.key.exec(g)) !== null)
              for (y.push(v[1]); (g = g.substring(v[0].length)) !== ""; )
                if ((v = e.key_access.exec(g)) !== null)
                  y.push(v[1]);
                else if ((v = e.index_access.exec(g)) !== null)
                  y.push(v[1]);
                else
                  throw new SyntaxError("[sprintf] failed to parse named argument key");
            else
              throw new SyntaxError("[sprintf] failed to parse named argument key");
            u[2] = y;
          } else
            p |= 2;
          if (p === 3)
            throw new Error("[sprintf] mixing positional and named placeholders is not (yet) supported");
          l.push(
            {
              placeholder: u[0],
              param_no: u[1],
              keys: u[2],
              sign: u[3],
              pad_char: u[4],
              align: u[5],
              width: u[6],
              precision: u[7],
              type: u[8]
            }
          );
        } else
          throw new SyntaxError("[sprintf] unexpected placeholder");
        c = c.substring(u[0].length);
      }
      return o[f] = l;
    }
    t.sprintf = r, t.vsprintf = n, typeof window < "u" && (window.sprintf = r, window.vsprintf = n);
  })();
})(Ry);
function Ps(t) {
  return t.charAt(0).toUpperCase() + t.slice(1);
}
var Iy = function(t, e) {
  if (typeof t != "string")
    throw new TypeError("Expected a string");
  for (var r = String(t), n = "", i = e ? !!e.extended : !1, o = e ? !!e.globstar : !1, s = !1, f = e && typeof e.flags == "string" ? e.flags : "", c, u = 0, l = r.length; u < l; u++)
    switch (c = r[u], c) {
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
        n += "\\" + c;
        break;
      case "?":
        if (i) {
          n += ".";
          break;
        }
      case "[":
      case "]":
        if (i) {
          n += c;
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
        n += "\\" + c;
        break;
      case "*":
        for (var p = r[u - 1], y = 1; r[u + 1] === "*"; )
          y++, u++;
        var g = r[u + 1];
        if (!o)
          n += ".*";
        else {
          var v = y > 1 && (p === "/" || p === void 0) && (g === "/" || g === void 0);
          v ? (n += "((?:[^/]*(?:/|$))*)", u++) : n += "([^/]*)";
        }
        break;
      default:
        n += c;
    }
  return (!f || !~f.indexOf("g")) && (n = "^" + n + "$"), new RegExp(n, f);
};
const By = /* @__PURE__ */ We(Iy);
var Wt = globalThis && globalThis.__awaiter || function(t, e, r, n) {
  function i(o) {
    return o instanceof r ? o : new r(function(s) {
      s(o);
    });
  }
  return new (r || (r = Promise))(function(o, s) {
    function f(l) {
      try {
        u(n.next(l));
      } catch (p) {
        s(p);
      }
    }
    function c(l) {
      try {
        u(n.throw(l));
      } catch (p) {
        s(p);
      }
    }
    function u(l) {
      l.done ? o(l.value) : i(l.value).then(f, c);
    }
    u((n = n.apply(t, e || [])).next());
  });
};
let lc = class Ie extends dt {
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
    e.on(i.events || "*", (o, s) => Wt(this, void 0, void 0, function* () {
      var f, c, u, l, p, y, g;
      if (!(!s || !o) && (s.id = (u = (f = s.id) !== null && f !== void 0 ? f : (c = s.emitter.metas) === null || c === void 0 ? void 0 : c.id) !== null && u !== void 0 ? u : yr(), s.color = (y = (l = s.color) !== null && l !== void 0 ? l : (p = s.emitter.metas) === null || p === void 0 ? void 0 : p.color) !== null && y !== void 0 ? y : _d(s.id), !(i.exclude && i.exclude.indexOf(s.event) !== -1) && !(i.filter && !i.filter(o, s)))) {
        if (i.processor) {
          const v = i.processor(o, s);
          Array.isArray(v) && v.length === 2 ? (o = v[0], s = v[1]) : typeof v == "object" && v.value !== void 0 && v.metas !== void 0 ? (o = v.value, s = v.metas) : o = v;
        }
        if (s && s.event) {
          s.event, s.emitter || (s.emitter = this);
          const v = Object.assign(Object.assign({}, s), { level: ((g = s == null ? void 0 : s.level) !== null && g !== void 0 ? g : 0) + 1 });
          r instanceof Ie && (!i.overrideEmitter && r.settings.bind ? v.emitter = r.settings.bind : i.overrideEmitter === !0 && (v.emitter = r)), ko() && r === process && Rd() ? (o.value && o.value instanceof Error && (o.value = He(o.value)), this._ipcInstance._pipedEventsUids || (this._ipcInstance._pipedEventsUids = []), this._ipcInstance && !this._ipcInstance._pipedEventsUids.includes(v.uid) && (this._ipcInstance._pipedEventsUids.push(v.uid), this._ipcInstance.of[`ipc-${process.ppid}`].emit("message", {
            value: o,
            metas: v
          }))) : r.emit(s.event, o, v);
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
    return new Promise((i, o) => Wt(this, void 0, void 0, function* () {
      let s = this._createMetas(e, n);
      const f = !s.level;
      ye(r) && Object.keys(this.settings.defaults).forEach((u) => {
        var l;
        const p = u.split(",").map((y) => y.trim());
        p.indexOf(e) === -1 && p.indexOf("*") === -1 || (r = W(r, (l = this.settings.defaults) === null || l === void 0 ? void 0 : l[u]));
      });
      const c = this.settings.castByEvent[e];
      if (c && qt(c) && !(r instanceof c) && !r._sEventEmitterPreprocessed && (r = new c(r)), e === "ask" && f && (s.askId = yr()), !this._asyncStarted && this.settings.asyncStart) {
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
    return Wt(this, void 0, void 0, function* () {
      if (e.metas.uid = yr(), e.event === "ask")
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
    return Wt(this, void 0, void 0, function* () {
      let i = r;
      if (!this._eventsStacks || Object.keys(this._eventsStacks).length === 0)
        return i;
      this._eventsStacks[e] || this._registerNewEventsStacks(e);
      let o = [];
      const s = this._eventsStacks[e];
      s && s.callStack && (o = [
        ...o,
        ...s.callStack
      ]), Object.keys(this._eventsStacks).forEach((f) => {
        if (f === e)
          return i;
        By(f).test(e) && this._eventsStacks[f] !== void 0 && (o = [
          ...o,
          ...this._eventsStacks[f].callStack
        ]);
      }), o.map((f) => f.called++), o = o.filter((f) => f.callNumber === -1 || f.called <= f.callNumber);
      for (let f = 0; f < o.length; f++) {
        const c = o[f];
        if (!c.callback)
          return i;
        if (c.filter && !c.filter(i, n))
          continue;
        if (c.processor) {
          const l = c.processor(i, n);
          Array.isArray(l) && l.length === 2 ? (i = l[0], n = l[1]) : typeof l == "object" && l.value !== void 0 && l.metas !== void 0 ? (i = l.value, n = l.metas) : i = l;
        }
        const u = yield c.callback(i, n, n != null && n.askId ? (l) => {
          this.constructor.global.emit(`answer.${n.askId}`, l, n);
        } : void 0);
        u !== void 0 && (i = u);
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
    return new Promise((i, o) => Wt(this, void 0, void 0, function* () {
      if (!e)
        return this;
      typeof e == "string" && (e = e.split(",").map((f) => f.trim()));
      let s = r;
      for (let f = 0; f < e.length; f++) {
        const c = yield this._emitEventStack(e[f], s, n);
        c !== void 0 && (s = c);
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
      let f = -1;
      s.length === 2 && (o = s[0], f = parseInt(s[1])), this._registerCallbackInEventStack(o, r, {
        callNumber: f,
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
lc.usableAsMixin = !0;
class My extends lc {
}
var Zt = {}, Bo = {};
const Fy = "clone-class", Dy = "0.6.20", Ny = "Clone an ES6 Class as Another Class Name for Isolating Class Static Properties.", Ly = "src/index.js", Hy = "src/index.d.ts", Wy = {
  clean: "shx rm -fr dist/*",
  dist: "npm run clean && tsc && shx cp {README.md,package.json} dist/",
  pack: "npm pack dist/",
  example: "ts-node examples/example.ts",
  lint: "npm run lint:ts",
  "lint:ts": "tslint --project tsconfig.json && tsc --noEmit",
  test: "npm run test:unit",
  "test:unit": 'blue-tape -r ts-node/register "src/**/*.spec.ts" "tests/**/*.spec.ts"',
  "test:pack": "bash -x scripts/npm-pack-testing.sh"
}, Uy = {
  type: "git",
  url: "git+https://github.com/huan/clone-class.git"
}, Gy = [
  "clone",
  "class",
  "es6",
  "static"
], Ky = "Huan LI <zixia@zixia.net>", qy = "Apache-2.0", Vy = {
  url: "https://github.com/huan/clone-class/issues"
}, zy = "https://github.com/huan/clone-class#readme", Yy = {
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
}, Jy = {
  scripts: {
    "pre-push": "./scripts/pre-push.sh"
  }
}, Xy = {
  access: "public",
  tag: "latest"
}, Zy = {
  name: Fy,
  version: Dy,
  description: Ny,
  main: Ly,
  typings: Hy,
  scripts: Wy,
  repository: Uy,
  keywords: Gy,
  author: Ky,
  license: qy,
  bugs: Vy,
  homepage: zy,
  devDependencies: Yy,
  git: Jy,
  publishConfig: Xy
};
Object.defineProperty(Bo, "__esModule", { value: !0 });
Bo.VERSION = Zy.version;
var Br = {};
Object.defineProperty(Br, "__esModule", { value: !0 });
function pc(t, e) {
  return t.constructor;
}
Br.instanceToClass = pc;
Br.default = pc;
var Mr = {};
Object.defineProperty(Mr, "__esModule", { value: !0 });
function dc(t) {
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
Mr.cloneClass = dc;
Mr.default = dc;
Object.defineProperty(Zt, "__esModule", { value: !0 });
var Qy = Bo;
Zt.VERSION = Qy.VERSION;
var eh = Br;
Zt.instanceToClass = eh.instanceToClass;
const yc = Mr;
Zt.cloneClass = yc.cloneClass;
Zt.default = yc.cloneClass;
const th = function(t, e = {}) {
  const r = {};
  qt(t) || (t = t.constructor), e.includeBaseClass === !0 && (r[t.name] = t);
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
function rh(t) {
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
function nh(t = 0) {
  return new Promise((e) => {
    setTimeout(() => {
      e();
    }, t);
  });
}
const Rs = function(e, r = {}) {
  r = Object.assign({ during: -1 }, r);
  let n = r.during || -1;
  try {
    const i = Proxy.revocable(e, {
      get(o, s, f) {
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
    function f(l) {
      try {
        u(n.next(l));
      } catch (p) {
        s(p);
      }
    }
    function c(l) {
      try {
        u(n.throw(l));
      } catch (p) {
        s(p);
      }
    }
    function u(l) {
      l.done ? o(l.value) : i(l.value).then(f, c);
    }
    u((n = n.apply(t, e || [])).next());
  });
};
class Vt extends dt.extends(Promise) {
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
    return new Vt(({ resolve: i, reject: o, pipe: s }) => at(this, void 0, void 0, function* () {
      const f = {};
      function c() {
        return at(this, void 0, void 0, function* () {
          const u = Object.keys(e)[0];
          let l = e[u];
          typeof l == "function" && (l = l());
          try {
            delete e[u], r && (yield r(u, l)), l instanceof Vt && s(l);
            let p = yield l;
            if (f[u] = p, n) {
              let y = yield n(u, result);
              y !== void 0 && (result[u] = y);
            }
            Object.keys(e).length ? c() : i(f);
          } catch {
            o(l);
          }
        });
      }
      c();
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
    return Rs(e, r);
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
    }, typeof e == "object" ? e : {}, r ?? {}), (s, f) => {
      o.resolve = s, new Promise((c, u) => {
        o.reject = (...l) => {
          u(...l), this.promiseSettings.preventRejectOnThrow ? s(...l) : f(...l);
        };
      }).catch((c) => {
        this.emit("catch", c);
      });
    }), this._promiseState = "pending", this._eventEmitter = new My(W({
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
    }), this.bind = this._eventEmitter.bind.bind(this), this._resolvers = o, this.promiseSettings.destroyTimeout !== -1 && this.on("finally", (s, f) => {
      setTimeout(() => {
        this.destroy();
      }, this.promiseSettings.destroyTimeout);
    }), i = typeof e == "function" ? e : null, i) {
      const s = {};
      rh(this).forEach((f) => {
        f.slice(0, 1) !== "_" && (s[f] = this[f].bind(this));
      }), at(this, void 0, void 0, function* () {
        yield nh(0);
        try {
          yield i(s);
        } catch (f) {
          this.promiseSettings.emitLogErrorEventOnThrow && this.emit("log", {
            type: I.TYPE_ERROR,
            value: f
          }), this.reject(f);
        }
      });
    }
    this.promiseSettings.resolveAtResolveEvent && this.on("resolve", (s, f) => {
      this.resolve(s);
    }), this.promiseSettings.rejectAtRejectEvent && this.on("reject", (s, f) => {
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
    return Rs(this, e);
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
          const f = o[s];
          e = yield this.eventEmitter.emit(f, e);
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
var Pi = typeof navigator < "u" ? navigator.userAgent.toLowerCase().indexOf("firefox") > 0 : !1;
function Ri(t, e, r, n) {
  t.addEventListener ? t.addEventListener(e, r, n) : t.attachEvent && t.attachEvent("on".concat(e), function() {
    r(window.event);
  });
}
function hc(t, e) {
  for (var r = e.slice(0, e.length - 1), n = 0; n < r.length; n++)
    r[n] = t[r[n].toLowerCase()];
  return r;
}
function gc(t) {
  typeof t != "string" && (t = ""), t = t.replace(/\s/g, "");
  for (var e = t.split(","), r = e.lastIndexOf(""); r >= 0; )
    e[r - 1] += ",", e.splice(r, 1), r = e.lastIndexOf("");
  return e;
}
function ih(t, e) {
  for (var r = t.length >= e.length ? t : e, n = t.length >= e.length ? e : t, i = !0, o = 0; o < r.length; o++)
    n.indexOf(r[o]) === -1 && (i = !1);
  return i;
}
var zt = {
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
  "-": Pi ? 173 : 189,
  "=": Pi ? 61 : 187,
  ";": Pi ? 59 : 186,
  "'": 222,
  "[": 219,
  "]": 221,
  "\\": 220
}, $e = {
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
}, uo = {
  16: "shiftKey",
  18: "altKey",
  17: "ctrlKey",
  91: "metaKey",
  shiftKey: 16,
  ctrlKey: 17,
  altKey: 18,
  metaKey: 91
}, Z = {
  16: !1,
  18: !1,
  17: !1,
  91: !1
}, V = {};
for (var cr = 1; cr < 20; cr++)
  zt["f".concat(cr)] = 111 + cr;
var G = [], Is = !1, bc = "all", vc = [], Fr = function(e) {
  return zt[e.toLowerCase()] || $e[e.toLowerCase()] || e.toUpperCase().charCodeAt(0);
}, oh = function(e) {
  return Object.keys(zt).find(function(r) {
    return zt[r] === e;
  });
}, sh = function(e) {
  return Object.keys($e).find(function(r) {
    return $e[r] === e;
  });
};
function mc(t) {
  bc = t || "all";
}
function Yt() {
  return bc || "all";
}
function ah() {
  return G.slice(0);
}
function ch() {
  return G.map(function(t) {
    return oh(t) || sh(t) || String.fromCharCode(t);
  });
}
function uh(t) {
  var e = t.target || t.srcElement, r = e.tagName, n = !0;
  return (e.isContentEditable || (r === "INPUT" || r === "TEXTAREA" || r === "SELECT") && !e.readOnly) && (n = !1), n;
}
function fh(t) {
  return typeof t == "string" && (t = Fr(t)), G.indexOf(t) !== -1;
}
function lh(t, e) {
  var r, n;
  t || (t = Yt());
  for (var i in V)
    if (Object.prototype.hasOwnProperty.call(V, i))
      for (r = V[i], n = 0; n < r.length; )
        r[n].scope === t ? r.splice(n, 1) : n++;
  Yt() === t && mc(e || "all");
}
function ph(t) {
  var e = t.keyCode || t.which || t.charCode, r = G.indexOf(e);
  if (r >= 0 && G.splice(r, 1), t.key && t.key.toLowerCase() === "meta" && G.splice(0, G.length), (e === 93 || e === 224) && (e = 91), e in Z) {
    Z[e] = !1;
    for (var n in $e)
      $e[n] === e && (Me[n] = !1);
  }
}
function dh(t) {
  if (typeof t > "u")
    Object.keys(V).forEach(function(s) {
      return delete V[s];
    });
  else if (Array.isArray(t))
    t.forEach(function(s) {
      s.key && Ii(s);
    });
  else if (typeof t == "object")
    t.key && Ii(t);
  else if (typeof t == "string") {
    for (var e = arguments.length, r = new Array(e > 1 ? e - 1 : 0), n = 1; n < e; n++)
      r[n - 1] = arguments[n];
    var i = r[0], o = r[1];
    typeof i == "function" && (o = i, i = ""), Ii({
      key: t,
      scope: i,
      method: o,
      splitKey: "+"
    });
  }
}
var Ii = function(e) {
  var r = e.key, n = e.scope, i = e.method, o = e.splitKey, s = o === void 0 ? "+" : o, f = gc(r);
  f.forEach(function(c) {
    var u = c.split(s), l = u.length, p = u[l - 1], y = p === "*" ? "*" : Fr(p);
    if (V[y]) {
      n || (n = Yt());
      var g = l > 1 ? hc($e, u) : [];
      V[y] = V[y].filter(function(v) {
        var b = i ? v.method === i : !0;
        return !(b && v.scope === n && ih(v.mods, g));
      });
    }
  });
};
function Bs(t, e, r, n) {
  if (e.element === n) {
    var i;
    if (e.scope === r || e.scope === "all") {
      i = e.mods.length > 0;
      for (var o in Z)
        Object.prototype.hasOwnProperty.call(Z, o) && (!Z[o] && e.mods.indexOf(+o) > -1 || Z[o] && e.mods.indexOf(+o) === -1) && (i = !1);
      (e.mods.length === 0 && !Z[16] && !Z[18] && !Z[17] && !Z[91] || i || e.shortcut === "*") && e.method(t, e) === !1 && (t.preventDefault ? t.preventDefault() : t.returnValue = !1, t.stopPropagation && t.stopPropagation(), t.cancelBubble && (t.cancelBubble = !0));
    }
  }
}
function Ms(t, e) {
  var r = V["*"], n = t.keyCode || t.which || t.charCode;
  if (Me.filter.call(this, t)) {
    if ((n === 93 || n === 224) && (n = 91), G.indexOf(n) === -1 && n !== 229 && G.push(n), ["ctrlKey", "altKey", "shiftKey", "metaKey"].forEach(function(v) {
      var b = uo[v];
      t[v] && G.indexOf(b) === -1 ? G.push(b) : !t[v] && G.indexOf(b) > -1 ? G.splice(G.indexOf(b), 1) : v === "metaKey" && t[v] && G.length === 3 && (t.ctrlKey || t.shiftKey || t.altKey || (G = G.slice(G.indexOf(b))));
    }), n in Z) {
      Z[n] = !0;
      for (var i in $e)
        $e[i] === n && (Me[i] = !0);
      if (!r)
        return;
    }
    for (var o in Z)
      Object.prototype.hasOwnProperty.call(Z, o) && (Z[o] = t[uo[o]]);
    t.getModifierState && !(t.altKey && !t.ctrlKey) && t.getModifierState("AltGraph") && (G.indexOf(17) === -1 && G.push(17), G.indexOf(18) === -1 && G.push(18), Z[17] = !0, Z[18] = !0);
    var s = Yt();
    if (r)
      for (var f = 0; f < r.length; f++)
        r[f].scope === s && (t.type === "keydown" && r[f].keydown || t.type === "keyup" && r[f].keyup) && Bs(t, r[f], s, e);
    if (n in V) {
      for (var c = 0; c < V[n].length; c++)
        if ((t.type === "keydown" && V[n][c].keydown || t.type === "keyup" && V[n][c].keyup) && V[n][c].key) {
          for (var u = V[n][c], l = u.splitKey, p = u.key.split(l), y = [], g = 0; g < p.length; g++)
            y.push(Fr(p[g]));
          y.sort().join("") === G.sort().join("") && Bs(t, u, s, e);
        }
    }
  }
}
function yh(t) {
  return vc.indexOf(t) > -1;
}
function Me(t, e, r) {
  G = [];
  var n = gc(t), i = [], o = "all", s = document, f = 0, c = !1, u = !0, l = "+", p = !1;
  for (r === void 0 && typeof e == "function" && (r = e), Object.prototype.toString.call(e) === "[object Object]" && (e.scope && (o = e.scope), e.element && (s = e.element), e.keyup && (c = e.keyup), e.keydown !== void 0 && (u = e.keydown), e.capture !== void 0 && (p = e.capture), typeof e.splitKey == "string" && (l = e.splitKey)), typeof e == "string" && (o = e); f < n.length; f++)
    t = n[f].split(l), i = [], t.length > 1 && (i = hc($e, t)), t = t[t.length - 1], t = t === "*" ? "*" : Fr(t), t in V || (V[t] = []), V[t].push({
      keyup: c,
      keydown: u,
      scope: o,
      mods: i,
      shortcut: n[f],
      method: r,
      key: n[f],
      splitKey: l,
      element: s
    });
  typeof s < "u" && !yh(s) && window && (vc.push(s), Ri(s, "keydown", function(y) {
    Ms(y, s);
  }, p), Is || (Is = !0, Ri(window, "focus", function() {
    G = [];
  }, p)), Ri(s, "keyup", function(y) {
    Ms(y, s), ph(y);
  }, p));
}
function hh(t) {
  var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "all";
  Object.keys(V).forEach(function(r) {
    var n = V[r].filter(function(i) {
      return i.scope === e && i.shortcut === t;
    });
    n.forEach(function(i) {
      i && i.method && i.method();
    });
  });
}
var Bi = {
  getPressedKeyString: ch,
  setScope: mc,
  getScope: Yt,
  deleteScope: lh,
  getPressedKeyCodes: ah,
  isPressed: fh,
  filter: uh,
  trigger: hh,
  unbind: dh,
  keyMap: zt,
  modifier: $e,
  modifierMap: uo
};
for (var Mi in Bi)
  Object.prototype.hasOwnProperty.call(Bi, Mi) && (Me[Mi] = Bi[Mi]);
if (typeof window < "u") {
  var gh = window.hotkeys;
  Me.noConflict = function(t) {
    return t && window.hotkeys === Me && (window.hotkeys = gh), Me;
  }, window.hotkeys = Me;
}
var bh = Me;
const fo = /* @__PURE__ */ We(bh);
fo.filter = function() {
  return !0;
};
function lo(t, e = {}) {
  return e = Object.assign({ rootNode: [document], keyup: !1, keydown: !0, once: !1, splitKey: "+", title: t, description: null, private: !1 }, e), Array.isArray(e.rootNode) || (e.rootNode = [e.rootNode]), new Vt(({ resolve: r, reject: n, emit: i, cancel: o }) => {
    e.rootNode.forEach((s) => {
      var f;
      const c = (f = s.ownerDocument) !== null && f !== void 0 ? f : s;
      e.private || (c != null && c.env || (c.env = {}), c.env.HOTKEYS || (c.env.HOTKEYS = {}), c.env.HOTKEYS[t] || setTimeout(() => {
        var u;
        s.dispatchEvent(new CustomEvent("hotkeys.update", {
          bubbles: !0,
          detail: (u = c.env) === null || u === void 0 ? void 0 : u.HOTKEYS
        }));
      }), c.env.HOTKEYS[t] = {
        title: e.title,
        description: e.description,
        hotkey: t
      }), fo(t, Object.assign({ element: s }, e), (u, l) => {
        i("press", u), e.once && o();
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
    }), fo.unbind(t);
  });
}
const rt = [];
let Fi = !1;
function vh(t, e) {
  return new Vt(({ resolve: r, reject: n, on: i }) => {
    var o;
    const s = Object.assign({ rootNode: document }, e ?? {});
    (Array.isArray(s.rootNode) ? s.rootNode : [s.rootNode]).forEach((u) => {
      u._escapeQueue || (u._escapeQueue = !0, lo("escape", {
        rootNode: u,
        private: !0
      }).on("press", () => {
        var l;
        if (!rt.length || Fi)
          return;
        Fi = !0, setTimeout(() => {
          Fi = !1;
        });
        const p = rt.pop();
        (l = p.callback) === null || l === void 0 || l.call(p), p.resolve();
      }));
    });
    const c = {
      id: (o = s.id) !== null && o !== void 0 ? o : yr(),
      callback: t,
      resolve: r
    };
    if (s.id) {
      const u = rt.find((l) => l.id === s.id);
      u ? (u.callback = t, u.resolve = r) : rt.push(c);
    } else
      rt.push(c);
    i("cancel", () => {
      rt.splice(rt.indexOf(c, 1));
    });
  });
}
function mh() {
  return typeof process < "u" && process.release && process.release.name === "node";
}
function wh() {
  return mh() ? global._registeredInterfacesTypes || {} : window !== void 0 ? window._registeredInterfacesTypes || {} : {};
}
const _h = {
  name: "Max",
  id: "max",
  settings: {},
  accept: "Number",
  message: (t) => `This value has to be maximum "<yellow>${t.max}</yellow>". Received "<red>${t.received}</red>"`,
  processParams: (t) => ({ value: t }),
  apply: (t, e, r, n) => t > e.value ? new Error(`<red>[minRule]</red> Sorry but the passed value "<yellow>${t}</yellow>" must be lower or equal at <cyan>${e.value}</cyan>`) : t
}, Sh = {
  name: "Min",
  id: "min",
  settings: {},
  accept: "Number",
  message: (t) => `This value has to be minimum "<yellow>${t.min}</yellow>". Received "<red>${t.received}</red>"`,
  processParams: (t) => ({ value: t }),
  apply: (t, e, r, n) => t < e.value ? new Error(`<red>[minRule]</red> Sorry but the passed value "<yellow>${t}</yellow>" must be greater or equal at <cyan>${e.value}</cyan>`) : t
}, Oh = {
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
function Ah(t, e) {
  t || (t = ""), t = He(t);
  let r = t.replace(/\r\n/g, "|rn|");
  return r = r.replace(/\n/g, "|n|"), r = r.replace(/\r/g, "|r|"), Object.keys(e).forEach((n) => {
    const i = new RegExp(`<s*${n}[^>]*>((.*?))<\\s*/\\s*${n}>`, "g"), o = r.match(i), s = new RegExp(`\\s?<${n}\\s?/>\\s?`, "g"), f = r.match(s);
    if (o)
      for (let c = 0; c < o.length; c++) {
        const l = o[c].match(`<\\s*${n}[^>]*>((.*?))<\\s*/\\s*${n}>`);
        if (!l)
          continue;
        const p = l[0], y = l[1];
        r = r.replace(p, e[n](n, y));
      }
    if (f)
      for (let c = 0; c < f.length; c++) {
        const l = f[c].match(`\\s?<${n}\\s?/>\\s?`);
        if (!l)
          continue;
        const p = l[0], y = "";
        r = r.replace(p, e[n](n, y));
      }
  }), r = r.replace(/\|rn\|/g, `\r
`), r = r.replace(/\|n\|/g, `
`), r = r.replace(/\|r\|/g, "\r"), r;
}
const jh = {
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
function jr(t) {
  let e = !1;
  return Array.isArray(t) ? e = !0 : t = [t], t = t.map((r) => Ah(r, jh)), e ? t : t[0];
}
function de(t, e = {}) {
  e = W({
    of: !1,
    customClass: !0
  }, e);
  let r;
  Array.isArray(t) ? r = "Array" : t instanceof Map ? r = "Map" : t === null ? r = "Null" : t === void 0 ? r = "Undefined" : typeof t == "string" ? r = "String" : Ud(t) ? r = "Integer" : typeof t == "number" ? r = "Number" : typeof t == "boolean" ? r = "Boolean" : t instanceof RegExp ? r = "RegExp" : e.customClass === !0 && qt(t) && t.name !== void 0 ? r = Ps(t.name) : e.customClass === !0 && t.constructor !== void 0 && t.constructor.name !== void 0 ? r = Ps(t.constructor.name) : e.customClass === !1 && qt(t) ? r = "Class" : typeof t == "function" ? r = "Function" : typeof t == "object" ? r = "Object" : r = "Unknown";
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
      const f = t[s], c = de(f, {
        of: !1,
        customClass: e.customClass
      });
      o.includes(c) || o.push(c);
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
  let s, f;
  const c = (l, p) => {
    switch (de(l).toLowerCase()) {
      case "array":
      case "object":
        return l[p];
      case "string":
        return p;
      case "number":
      case "integer":
        return p;
      case "map":
        return l.get(p);
      case "set":
        return p;
    }
  }, u = (l, p, y) => {
    switch (de(l).toLowerCase()) {
      case "array":
        r.newStack === !0 ? l.push(y) : l[p] = y;
        break;
      case "object":
        l[p] = y;
        break;
      case "number":
      case "integer":
      case "string":
        l.push(y);
        break;
      case "map":
        l.set(p, y);
        break;
      case "set":
        l.add(y);
        break;
    }
  };
  for (let l = 0; l < i.length; l++) {
    const p = i[l];
    if (s = c(t, p), f = e({ key: p, prop: p, value: s, i: l, idx: l }), f === -1)
      break;
    u(r.newStack ? o : t, p, f);
  }
  return n === "string" ? o.join("") : r.newStack ? o : t;
};
function $h(t) {
  let e = "", r = t, n = [];
  if (r.match(/^['"`]/))
    return {
      type: "string",
      of: void 0,
      value: r.replace(/^['"`]/, "").replace(/['"`]$/, "")
    };
  const i = $o(r);
  if (typeof i == "number")
    return {
      type: "number",
      of: void 0,
      value: i
    };
  r = r.trim().replace(/^([a-zA-Z0-9-_]+)\[\]$/, "array<$1>");
  const o = r.match(/<(.+)>$/gm);
  o && o.length && (e = o[0].replace("<", "").replace(">", "")), e !== "" && (r = r.replace(`<${e}>`, "")), n = e !== "" ? [e] : void 0, e !== void 0 && e.includes("|") && (n = e.split("|").map((f) => f.trim()));
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
function po(t) {
  const e = t;
  t = t.trim(), t = t.replace(/^\{/, "").replace(/\}$/, "");
  let r = !1;
  t.match(/\)\[\]$/) && (r = !0, t = t.replace(/\)\[\]$/, "").replace(/^\(/, ""));
  const n = [];
  let i = 0, o = "", s = !1;
  for (let c = 0; c < t.length; c++) {
    const u = t[c];
    if (["(", "<"].includes(u) ? (i++, s = !0, o += "^") : [")", ">"].includes(u) ? (i--, o += "$") : u === "|" && i === 0 ? (n.push({
      areSubLevels: s,
      type: o
    }), o = "") : o += u, i < 0)
      throw new Error(`It seems that your type string "${t}" is not valid...`);
  }
  n.push({
    areSubLevels: s,
    type: o
  });
  let f = [];
  if (n.forEach((c) => {
    c.areSubLevels ? f = [...f, ...po(c.type)] : f.push($h(c.type.replace("^", "<").replace("$", ">")));
  }), r) {
    const c = [
      {
        type: "array",
        of: f
      }
    ];
    return c.__proto__.toString = () => e, c;
  }
  return f = yo(f, ({ object: c, prop: u, value: l, path: p }) => (typeof l == "string" && (l = l.replace(/^\./, "").trim()), l)), Object.defineProperty(f, "toString", {
    get() {
      return () => e;
    }
  }), f;
}
class Fs {
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
    return ko() ? this.toConsole() : 'The method "toHtml" has not being integrated for now...';
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
      `${He(this._data.value, {
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
      `${He(this._data.settings, {
        beautify: !0
      })}`
    ];
    return jr(`
${e.join(`
`)}
${r.join(`
`)}
${this.settings.verbose ? n.join(`
`) : ""}
    `).trim();
  }
}
function xh() {
  return typeof process < "u" && process.release && process.release.name === "node";
}
function Th() {
  return xh() ? global._registeredInterfacesTypes || {} : window !== void 0 ? window._registeredInterfacesTypes || {} : {};
}
class K {
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
    return po(e);
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
    e.includes("[]") && console.log(e), this.types = po(e), e.includes("[]") && console.log(this.types), this.settings = W({
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
    return n === !0 ? !0 : n instanceof Fs ? !n.hasIssues() : !0;
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
      const s = this.types[o], f = s.type, c = this._isType(e, f, r);
      if (c === !0) {
        if (s.of === void 0)
          return !0;
        const u = de(e);
        if (u !== "Array" && u !== "Object" && u !== "Map")
          throw new Error(`Sorry but you have specified a type string "<yellow>${this.typeString}</yellow>" with some "<...>" definition on a type "<cyan>${u}</cyan>" that does not support "child" value(s)...`);
        const l = u === "Object" ? Object.keys(e) : Array.from(e.keys());
        if (!l.length)
          return !0;
        for (let p = 0; p < l.length; p++)
          for (let y = 0; y < s.of.length; y++) {
            const g = s.of[y], v = l[p], b = u === "Map" ? e.get(v) : e[v];
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
        const u = {
          expected: {
            type: s.type
          },
          received: {
            type: de(e),
            value: e
          }
        };
        c != null && c !== !1 && c.toString && typeof c.toString == "function" && (u.message = c.toString()), n[s.type] = u;
      }
    }
    return new Fs({
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
        const i = Th();
        if (i[r] !== void 0)
          return i[r].apply(e, {});
      }
      if (n.customTypes === !0) {
        const i = de(e).toLowerCase(), o = Object.keys(th(e)).map((s) => s.toLowerCase());
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
        return Object.entries(this.issues).map((f) => f[1]).join(`
`);
      }
    };
    if (this.is(e))
      return e;
    for (let s = 0; s < this.types.length; s++) {
      const f = this.types[s], c = f.type, u = this.constructor._registeredTypes[c.toLowerCase()];
      if (u === void 0 || u.cast === void 0)
        continue;
      let l;
      if (l = u.cast(e, r), l instanceof Error) {
        i.issues[c] = l.toString();
        continue;
      }
      if (f.of !== void 0 && this.canHaveChilds(l) === !1) {
        const p = `Sorry but the passed type "<yellow>${c}</yellow>" has some child(s) dependencies "<green>${f.of.join("|")}</green>" but this type can not have child(s)`;
        throw new Error(jr(p));
      } else if (f.of !== void 0) {
        const p = new K(f.of.join("|"));
        l = Eh(l, ({ value: y }) => p.cast(y, r, n));
      }
      if (l === null && u.id === "null")
        return null;
      if (l === void 0 && u.id === "undefined")
        return;
      if (l != null)
        return l;
      i.issues[c] = "Something goes wrong but no details are available... Sorry";
    }
    const o = [
      `Sorry but the value of type "<cyan>${de(e)}</cyan>" passed to be casted in type "<yellow>${this.typeString}</yellow>" can not be casted correctly. Here's why:
`
    ];
    throw Object.keys(i.issues).forEach((s) => {
      o.push(`- <red>${s}</red>: ${i.issues[s]}`);
    }), new Error(jr(o.join(`
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
K._instanciatedTypes = {};
K._registeredTypes = {};
const kh = {
  name: "Array",
  id: "array",
  is: (t) => Array.isArray(t),
  cast: (t, e = {}) => t ? (e.splitChars && Array.isArray(e.splitChars) && (t === !0 && (t = ""), t = t.split(new RegExp(`(${e.splitChars.join("|")})`, "gm")).filter((r) => r.trim() !== "" && e.splitChars.indexOf(r) === -1)), Array.isArray(t) ? t : [t]) : []
}, Ch = {
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
}, Ph = {
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
}, Rh = {
  name: "Class",
  id: "class",
  is: (t) => qt(t),
  cast: (t) => new Error("Sorry but nothing is castable to a Class")
}, Ih = {
  name: "Date",
  id: "date",
  is: (t) => t instanceof Date,
  cast: (t) => {
    if (typeof t == "string")
      return new Date(t);
    if (typeof t == "number")
      return new Date(Math.round(t));
    if (ye(t)) {
      let r = (/* @__PURE__ */ new Date()).getFullYear(), n = 0, i = 1, o = 0, s = 0, f = 0, c = 0;
      return t.year && typeof t.year == "number" && (r = t.year), t.month && typeof t.month == "number" && (n = t.month), t.day && typeof t.day == "number" && (i = t.day), t.hours && typeof t.hours == "number" && (o = t.hours), t.minutes && typeof t.minutes == "number" && (s = t.minutes), t.seconds && typeof t.seconds == "number" && (f = t.seconds), t.milliseconds && typeof t.milliseconds == "number" && (c = t.milliseconds), new Date(r, n, i, o, s, f, c);
    }
    return new Error("Sorry but for now only <yellow>String</yellow>, <yellow>Number</yellow> and <yellow>Object</yellow> (with properties: year, month, day?, hours?, minutes?, seconds? and milliseconds?) are castable to Date");
  }
}, Bh = {
  name: "Function",
  id: "function",
  is: (t) => typeof t == "function",
  cast: (t) => new Error("Sorry but nothing is castable to a Function")
}, Mh = {
  name: "Integer",
  id: "integer",
  is: (t) => Number.isInteger(t),
  cast: (t) => {
    if (typeof t != "string" && typeof t != "number")
      return new Error(`Sorry but only strings and numbers can be casted to integers... Passed value: ${t}`);
    const e = parseInt(t);
    return isNaN(e) ? new Error(`Sorry but the conversion of "<yellow>${t}</yellow>" to a <green>Integer</green> does not work...`) : e;
  }
}, Fh = {
  name: "Map",
  id: "map",
  is: (t) => io(t),
  cast: (t) => {
    if (io(t))
      return t;
    const e = /* @__PURE__ */ new Map();
    return e.set("value", t), e;
  }
}, Dh = {
  name: "Null",
  id: "null",
  is: (t) => t === null,
  cast: (t) => null
}, Nh = {
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
  is: (t) => oo(t),
  cast: (t) => oo(t) ? t : {
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
}, Wh = {
  name: "String",
  id: "string",
  is: (t) => Gd(t),
  cast: (t) => He(t, {
    beautify: !0
  })
}, Uh = {
  name: "Symbol",
  id: "symbol",
  is: (t) => typeof t == "symbol",
  cast: (t) => typeof t == "symbol" ? t : Symbol(t)
}, Gh = {
  name: "Undefined",
  id: "undefined",
  is: (t) => t === void 0,
  cast: (t) => {
  }
}, Kh = {
  name: "WeakMap",
  id: "weakmap",
  is: (t) => t instanceof WeakMap,
  cast: (t) => new Error("Sorry but nothing can be casted to a WeakMap for now")
}, qh = {
  name: "WeakSet",
  id: "weakset",
  is: (t) => t instanceof WeakSet,
  cast: (t) => new Error("Sorry but nothing can be casted to a WeakSet for now")
};
K.registerType(Wh);
K.registerType(Fh);
K.registerType(Lh);
K.registerType(kh);
K.registerType(Mh);
K.registerType(Nh);
K.registerType(Ph);
K.registerType(Gh);
K.registerType(Dh);
K.registerType(Uh);
K.registerType(Ch);
K.registerType(Ih);
K.registerType(Bh);
K.registerType(Kh);
K.registerType(qh);
K.registerType(Hh);
K.registerType(Rh);
const Vh = {
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
    const i = new K(e.type, {
      metas: {
        id: n.id
      }
    });
    return e.cast && !i.is(t) && (t = i.cast(t, e)), i.is(t) ? t : new Error(`The value must be of type "<yellow>${e.type}</yellow>" but you've passed a value of type "<cyan>${typeof t}</cyan>"`);
  }
};
class zh extends dt {
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
      this._originalValue = Ns(r, { deep: !0 });
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
    return ko() ? this.toConsole() : this.toConsole();
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
      `${He(this.value, {
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
      `${He(this._descriptorSettings, {
        beautify: !0
      })}`
    ];
    return jr(`
${e.join(`
`)}
${r.join(`
`)}
${n.join(`
`)}
    `).trim();
  }
}
class Ue extends dt {
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
    this._descriptorResult = new zh(this, o, Object.assign({}, n));
    const s = n.rules;
    if (!new K(n.type).is(e))
      throw new Error(`Sorry but this descriptor "<yellow>${this.metas.name}</yellow>" does not accept values of type "<cyan>${de(e)}</cyan>" but only "<green>${n.type}</green>"...`);
    if (Array.isArray(e) && !n.arrayAsValue)
      throw new Error("Sorry but the support for arrays like values has not been integrated for not...");
    if (typeof e == "object" && e !== null && e !== void 0)
      Object.keys(s).forEach((c) => {
        Wd(c) && e || (i[c] = ho(e, c));
      }), Object.keys(i).forEach((c) => {
        const u = s[c];
        if (i[c] === void 0 && n.defaults && u.default !== void 0 && (i[c] = u.default), u.interface !== void 0) {
          const p = i[c];
          i[c] = u.interface.apply(p || {}, {});
        }
        const l = this._validate(i[c], c, u, n);
        l != null && Ws(o, c, l);
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
    let o = Object.keys(n).filter((f) => f !== "default");
    o = o.sort((f, c) => {
      const u = this.constructor._registeredRules[f], l = this.constructor._registeredRules[c];
      return u ? l ? (u.priority === void 0 && (u.priority = 9999999999), l.priority === void 0 && (l.priority = 9999999999), u.priotity - l.priority) : 1 : -1;
    }).reverse();
    let s = e;
    return o.forEach((f) => {
      const c = n[f];
      if (this.constructor._registeredRules[f] === void 0) {
        if (i.throwOnMissingRule)
          throw new Error(`Sorry but you try to validate a value using the "<yellow>${f}</yellow>" rule but this rule is not registered. Here's the available rules:
              - ${Object.keys(this.constructor._registeredRules).join(`
- `)}`);
      } else {
        const u = this.constructor._registeredRules[f], l = u.processParams !== void 0 ? u.processParams(c) : c, p = u.settings !== void 0 ? u.settings : {};
        if (p.mapOnArray && Array.isArray(s)) {
          let y = [];
          s.forEach((g) => {
            const v = this._processRule(g, u, r, l, p, i);
            Array.isArray(v) ? y = [
              ...y,
              ...v
            ] : y.push(v);
          }), s = y;
        } else
          s = this._processRule(s, u, r, l, p, i);
      }
    }), s;
  }
  _processRule(e, r, n, i, o, s) {
    const f = r.apply(e, i, o, Object.assign(Object.assign({}, s), { propName: n, name: `${s.name}.${n}` }));
    if (i && i.type && i.type.toLowerCase() === "boolean" && f === !0)
      return !0;
    if (f instanceof Error) {
      const c = {
        __error: f,
        __ruleObj: r,
        __propName: n
      };
      if (this._descriptorResult)
        throw this._descriptorResult.add(c), new Error(this._descriptorResult.toString());
    } else
      return f;
  }
}
Ue._registeredRules = {};
Ue.rules = {};
Ue.type = "Object";
Ue.registerRule(Oh);
Ue.registerRule(Vh);
Ue.registerRule(Sh);
Ue.registerRule(_h);
function Yh(t, e) {
  if (e = W({
    valueQuote: void 0,
    treatNoAsBoolean: !0,
    camelCase: !0
  }, e ?? {}), t = t.trim(), t = t.replace(/(["'`])--/gm, "$1--§ --"), e.treatNoAsBoolean) {
    const c = t.match(/--no-[\w]+/g);
    c == null || c.forEach((u) => {
      t = t.replace(u, `${u.replace("--no-", "--")} false`);
    });
  }
  let r = e.valueQuote;
  if (!r) {
    for (let c = 0; c < t.length; c++) {
      const u = t[c];
      if (u === '"' || u === "`" || u === "'") {
        r = u;
        break;
      }
    }
    r || (r = '"');
  }
  let n = [], i = !1;
  if (t.match(/^\(/) && t.match(/\)$/)) {
    i = !0, t = t.slice(1, -1);
    let c = "", u = 0, l = 0;
    for (let p = 0; p < t.length; p++) {
      const y = t[p], g = t[p - 1] || t[0];
      y === r && g !== "\\" && !l ? l++ : y === r && g !== "\\" && l && l--, !l && y === "(" ? u++ : !l && y === ")" && u--, y === "," ? l || u ? c += y : (n.push(c.trim()), c = "") : c += y;
    }
    u && (c += ")".repeat(u)), n.push(c.trim());
  } else {
    let c = "", u = !1;
    for (let l = 0; l < t.length; l++) {
      const p = t[l], y = t[l - 1] || t[0];
      p === r && y !== "\\" && !u ? u = !0 : p === r && y !== "\\" && u && (u = !1), p === " " ? u ? c += p : (n.push(c.trim()), c = "") : c += p;
    }
    n.push(c.trim());
  }
  n && (n = n.map((c) => br(c)));
  let o = {}, s, f;
  return n = n.forEach((c, u) => {
    if (!i && !c.includes(" ") && (c.slice(0, 2) === "--" || c.slice(0, 1) === "-"))
      f === void 0 && s !== -1 && s && o[s] === void 0 && (o[s] = !0), s = c.replace(/^[-]{1,2}/, ""), o[s] === void 0 && (o[s] = !0);
    else {
      let l;
      if (c && typeof c == "string" && (l = c.replace(/^\\\\\\`/, "").replace(/\\\\\\`$/, "").replace(/^'/, "").replace(/'$/, "").replace(/^"/, "").replace(/"$/, ""), l.match(/^\$[a-zA-Z0-9-_]+\s?:.*/))) {
        const p = c.split(":");
        s = p[0].trim().replace(/^\$/, ""), l = p.slice(1).join(":").trim();
      }
      f = $o(l), typeof f == "string" && (f = f.replace("--§ ", "")), s !== void 0 ? (o[s] !== void 0 && o[s] !== !0 ? (Array.isArray(o[s]) || (o[s] = [o[s]]), o[s].push(f)) : o[s] = f, f = void 0, s = void 0) : o[u] = f;
    }
  }), e.camelCase && (o = Ds(o)), Object.keys(o).forEach((c) => {
    o[c] === void 0 && delete o[c];
  }), o;
}
try {
  global ? global._registeredInterfacesTypes = {} : window._registeredInterfacesTypes = {};
} catch {
}
class Qt extends dt {
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
    const r = new Qt();
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
    return wh();
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
    typeof e == "string" && (o = Yh(e), Object.keys(o).forEach((u) => {
      for (let l = 0; l < Object.keys(this._definition).length; l++) {
        const p = Object.keys(this._definition)[l], y = this._definition[p];
        if (y.explicit) {
          if (y.alias && ` ${e} `.match(new RegExp(`\\s-${y.alias}\\s`)))
            return;
          if (` ${e} `.match(new RegExp(`\\s--${u}\\s`)))
            return;
          delete o[u];
        }
      }
    }), Object.keys(o).forEach((u) => {
      for (let l = 0; l < Object.keys(this._definition).length; l++) {
        const p = Object.keys(this._definition)[l], y = this._definition[p];
        y.alias && y.alias === u && o[p] === void 0 && (o[p] = o[u], delete o[u]);
      }
    }), Object.keys(o).forEach((u, l) => {
      if (u === `${l}`) {
        const p = Object.keys(this._definition);
        p[l] && (o[p[l]] = o[u]), delete o[u];
      }
    }));
    const s = new Ue(Object.assign({ type: "Object", rules: this._definition }, (n = i.descriptor) !== null && n !== void 0 ? n : {}));
    i.baseObj && (o = W(i.baseObj, o));
    for (let [u, l] of Object.entries(this._definition))
      ye(l.default) && ye(o[u]) && (o[u] = W(l.default, o[u]));
    const f = s.apply(o);
    if (f.hasIssues())
      throw new Error(f.toString());
    let c = f.value;
    return i.stripUnkown || (c = W(o, c)), c;
  }
}
Qt.description = "";
Qt._registeredRenderers = {};
class Jh extends Qt {
  static get _definition() {
    return {
      layout: {
        description: "Specify the layout of the dashboard with the components you want to display in which column",
        type: "Array",
        default: Ne.get("dashboard.layout")
      },
      widgets: {
        description: "Specify each widget settings if wanted to customize default behaviors",
        type: "Object",
        default: {}
      }
    };
  }
}
class Xh extends dt {
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
        Jh.defaults(),
        {
          layout: [
            [
              "s-dashboard-browserstack",
              "s-dashboard-web-vitals",
              "s-dashboard-assets",
              "s-dashboard-google"
            ],
            ["s-dashboard-frontend-checker"]
          ]
        },
        e ?? {}
      )
    ), this._inited = !1, this._webVitalsInjected = !1, document.dashboard = this, this._$iframe = document.createElement("iframe"), this._$iframe.setAttribute("title", "s-dashboard"), this._$iframe.classList.add("s-dashboard-iframe"), this._$iframe.style.width = "0", this._$iframe.style.height = "0", document.body.appendChild(this._$iframe), document.addEventListener("keyup", this._onKeyup.bind(this));
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
  /**
   * Init the dashboard
   */
  _onKeyup(e) {
    (e.key === "s" || e.key === "x") && e.ctrlKey && (e.key === "x" && (this.settings.env = "development"), document.removeEventListener("keyup", this._onKeyup), this.open());
  }
  /**
   * Init the dashboard
   */
  _initDashboard() {
    this._inited || (this._$focusItem = document.createElement("div"), this._$focusItem.setAttribute("tabindex", "-1"), this._$focusItem.style.position = "fixed", this._$focusItem.style.top = "0", this._$focusItem.style.left = "0", document.body.appendChild(this._$focusItem), lo("ctrl+s").on("press", () => {
      this.open();
    }), lo("ctrl+x").on("press", () => {
      this.open();
    }), this._injectWebVitals(), this._$iframe.contentWindow.document.open(), this._$iframe.contentWindow.document.write(`
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
                    ${this.settings.env === "development" ? '<script src="http://0.0.0.0:5173/sugar/dashboard/init.js" type="module" defer><\/script>' : '<script src="https://cdnv2.coffeekraken.io/s-dashboard/init/init.js" type="module" defer><\/script>'}
                </head>
                <body s-sugar>
                    <s-dashboard></s-dashboard>
                </body>
                </html>
            `), this._$iframe.contentWindow.document.close(), this._inited = !0);
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
    this._inited || this._initDashboard(), this._$iframe.classList.add("active"), this.document.querySelector("html").style.overflow = "hidden", vh(
      () => {
        this.close();
      },
      {
        rootNode: [document, this.document]
      }
    );
  }
}
(() => {
  function t(e) {
    (e.key === "s" || e.key === "y") && e.ctrlKey && (document.removeEventListener("keyup", t), new Xh({
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
