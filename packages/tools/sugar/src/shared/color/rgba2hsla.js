import * as __convertColors from "colors-convert";
function rgba2hsla(r, g, b, a = 1) {
  if (typeof r === "object") {
    g = r.g;
    b = r.b;
    a = r.a;
    r = r.r;
  }
  return __convertColors.rgbaToHsla({
    r,
    g,
    b,
    a
  });
}
var rgba2hsla_default = rgba2hsla;
export {
  rgba2hsla_default as default
};
