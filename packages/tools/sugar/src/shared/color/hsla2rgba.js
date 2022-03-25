import * as __convertColors from "colors-convert";
function hsla2rgba(h, s, l, a = 1) {
  if (typeof h === "object") {
    h = h.h;
    s = h.s;
    l = h.l;
    a = h.a;
  }
  const rgba = __convertColors.hslaToRgba({
    h,
    s,
    l,
    a
  });
  return rgba;
}
var hsla2rgba_default = hsla2rgba;
export {
  hsla2rgba_default as default
};
