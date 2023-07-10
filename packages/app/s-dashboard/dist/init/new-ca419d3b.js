import { _ as w, S as h } from "./init-4a467568.js";
var s = globalThis && globalThis.__awaiter || function(a, t, i, o) {
  function r(e) {
    return e instanceof i ? e : new i(function(f) {
      f(e);
    });
  }
  return new (i || (i = Promise))(function(e, f) {
    function u(n) {
      try {
        c(o.next(n));
      } catch (d) {
        f(d);
      }
    }
    function l(n) {
      try {
        c(o.throw(n));
      } catch (d) {
        f(d);
      }
    }
    function c(n) {
      n.done ? e(n.value) : r(n.value).then(u, l);
    }
    c((o = o.apply(a, t || [])).next());
  });
};
function p(a, t, i, o) {
  return s(this, void 0, void 0, function* () {
    Array.isArray(t) || (t = [t]);
    let r;
    if (w())
      r = new h(a, t, i, o);
    else
      throw new Error('No stdio implementation found for the current "browser" environment...');
    return r;
  });
}
export {
  p as default
};
