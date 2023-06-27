import { a as c, b as O, c as a, g as y, r as u, o as C, d } from "./init-9cc57d19.js";
function S(r = {}) {
  return r = Object.assign({}, r), c.get("storage.dist.cssDir");
}
function I(r = {}) {
  return r = Object.assign({}, r), c.get("storage.dist.docDir");
}
function F(r = {}) {
  return r = Object.assign({}, r), c.get("storage.dist.fontsDir");
}
function R(r = {}) {
  return r = Object.assign({}, r), c.get("storage.dist.iconsDir");
}
function w(r = {}) {
  return r = Object.assign({}, r), c.get("storage.dist.imgDir");
}
function v(r = {}) {
  return r = Object.assign({}, r), c.get("storage.dist.jsDir");
}
function P(r = {}) {
  return r = Object.assign({}, r), c.get("storage.dist.nodeDir");
}
function J(r = {}) {
  return r = Object.assign({}, r), c.get("storage.dist.rootDir");
}
function x(r = {}) {
  return r = Object.assign({}, r), c.get("storage.dist.viewsDir");
}
function N(r = {}) {
  return r = Object.assign({}, r), c.get("storage.package.cacheDir");
}
function V() {
  return c.get("storage.package.localDir");
}
function E(r, s = {}) {
  s = O({
    symlink: !0
  }, s);
  let i = a.existsSync(r);
  if (!i)
    return !1;
  if (s.symlink && a.lstatSync(r).isSymbolicLink()) {
    const t = a.realpathSync(r);
    i = i && a.lstatSync(t).isFile();
  } else
    i = i && a.lstatSync(r).isFile();
  return i;
}
var b = u, j = u;
function T(r) {
  r = r.toString("utf-8"), r.charCodeAt(0) === 65279 && (r = r.slice(1));
  try {
    return JSON.parse(r);
  } catch {
    return !1;
  }
}
var p = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? Symbol.iterator : null;
function l(r) {
  return p && (r[p] = function() {
    return this;
  }), r;
}
var L = function(s) {
  if (s = s || process.cwd(), typeof s != "string")
    if (typeof s == "object" && typeof s.filename == "string")
      s = s.filename;
    else
      throw new Error("Must pass a filename string or a module object to finder");
  return l({
    /**
     * Return the parsed package.json that we find in a parent folder.
     *
     * @returns {Object} Value, filename and indication if the iteration is done.
     * @api public
     */
    next: function i() {
      if (s.match(/^(\w:\\|\/)$/))
        return l({
          value: void 0,
          filename: void 0,
          done: !0
        });
      var t = b.join(s, "package.json"), n;
      return s = b.resolve(s, ".."), j.existsSync(t) && (n = T(j.readFileSync(t))) ? (n.__path = t, l({
        value: n,
        filename: t,
        done: !1
      })) : i();
    }
  });
};
const q = /* @__PURE__ */ y(L), g = {};
function A(r = process.cwd(), s) {
  const i = Object.assign({ highest: !1, upCount: void 0, requiredProperties: ["name", "version"] }, s ?? {}), t = C(Object.assign({ from: r }, i));
  if (!r && g[t])
    return g[t];
  E(r) && (r = r.split("/").slice(0, -1).join("/"));
  const n = q(r);
  let e = n.next(), o, D = 0;
  if (!e || !e.filename)
    return !1;
  for (; !e.done && !(e.done || i.upCount && !i.highest && D >= i.upCount); ) {
    if (i.highest)
      o = e;
    else if (i.requiredProperties) {
      let f = !0;
      if (i.requiredProperties.forEach((k) => {
        f && e.value[k] === void 0 && (f = !1);
      }), f && (D++, o = e, !i.upCount))
        break;
    } else if (D++, o = e, !i.upCount)
      break;
    e = n.next();
  }
  if (!o)
    return !1;
  const m = o.filename.split("/").slice(0, -1).join("/");
  return g[t] = m, m;
}
function M() {
  return c.get("storage.package.tmpDir");
}
function $(r = {}) {
  return r = Object.assign({}, r), c.get("storage.src.cssDir");
}
function G(r = {}) {
  return r = Object.assign({}, r), c.get("storage.src.docDir");
}
function H(r = {}) {
  return r = Object.assign({}, r), c.get("storage.src.fontsDir");
}
function K(r = {}) {
  return r = Object.assign({}, r), c.get("storage.src.iconsDir");
}
function Y(r = {}) {
  return r = Object.assign({}, r), c.get("storage.src.imgDir");
}
function z(r = {}) {
  return r = Object.assign({}, r), c.get("storage.src.jsDir");
}
function B(r = {}) {
  return r = Object.assign({}, r), c.get("storage.src.nodeDir");
}
function Q(r = {}) {
  return r = Object.assign({}, r), c.get("storage.src.rootDir");
}
function U(r = {}) {
  return r = Object.assign({}, r), c.get("storage.src.viewsDir");
}
function er(r, s) {
  const i = Object.assign({ packageTmpDir: !0, packageLocalDir: !0, packageCacheDir: !0, packageRootDir: !0, srcRootDir: !0, distRootDir: !0, srcJsDir: !0, srcCssDir: !0, srcDocDir: !0, srcFontsDir: !0, srcIconsDir: !0, srcImgDir: !0, srcNodeDir: !0, srcViewsDir: !0, distJsDir: !0, distCssDir: !0, distDocDir: !0, distFontsDir: !0, distIconsDir: !0, distImgDir: !0, distNodeDir: !0, distViewsDir: !0 }, s), t = Array.isArray(r);
  t || (r = [r]);
  const n = r.map((e) => (i.packageTmpDir && (e = e.replace("%packageTmpDir", M())), i.packageLocalDir && (e = e.replace("%packageLocalDir", V())), i.packageCacheDir && (e = e.replace("%packageCacheDir", N())), i.packageRootDir && (e = e.replace("%packageRootDir", A())), i.srcRootDir && (e = e.replace("%srcRootDir", Q())), i.distRootDir && (e = e.replace("%distRootDir", J())), i.srcJsDir && (e = e.replace("%srcJsDir", z())), i.srcCssDir && (e = e.replace("%srcCssDir", $())), i.srcDocDir && (e = e.replace("%srcDocDir", G())), i.srcFontsDir && (e = e.replace("%srcFontsDir", H())), i.srcIconsDir && (e = e.replace("%srcIconsDir", K())), i.srcImgDir && (e = e.replace("%srcImgDir", Y())), i.srcNodeDir && (e = e.replace("%srcNodeDir", B())), i.srcViewsDir && (e = e.replace("%srcViewsDir", U())), i.distJsDir && (e = e.replace("%distJsDir", v())), i.distCssDir && (e = e.replace("%distCssDir", S())), i.distDocDir && (e = e.replace("%distDocDir", I())), i.distFontsDir && (e = e.replace("%distFontsDir", F())), i.distIconsDir && (e = e.replace("%distIconsDir", R())), i.distImgDir && (e = e.replace("%distImgDir", w())), i.distNodeDir && (e = e.replace("%distNodeDir", P())), i.distViewsDir && (e = e.replace("%distViewsDir", x())), e = e.replace(/\/\//gm, "/"), e));
  return t ? n : n[0];
}
function ir(r = {}) {
  return r = Object.assign({}, r), c.get("storage.sugar.rootDir");
}
const W = u, X = u, _ = Symbol.for("__RESOLVED_TEMP_DIRECTORY__");
d[_] || Object.defineProperty(d, _, {
  value: W.realpathSync(X.tmpdir())
});
var Z = d[_];
const h = /* @__PURE__ */ y(Z);
function sr() {
  return h;
}
export {
  S as __distCssDir,
  I as __distDocDir,
  F as __distFontsDir,
  R as __distIconsDir,
  w as __distImgDir,
  v as __distJsDir,
  P as __distNodeDir,
  J as __distRootDir,
  x as __distViewsDir,
  N as __packageCacheDir,
  V as __packageLocalDir,
  A as __packageRootDir,
  M as __packageTmpDir,
  er as __replacePathTokens,
  $ as __srcCssDir,
  G as __srcDocDir,
  H as __srcFontsDir,
  K as __srcIconsDir,
  Y as __srcImgDir,
  z as __srcJsDir,
  B as __srcNodeDir,
  Q as __srcRootDir,
  U as __srcViewsDir,
  ir as __sugarRootDir,
  sr as __systemTmpDir
};
