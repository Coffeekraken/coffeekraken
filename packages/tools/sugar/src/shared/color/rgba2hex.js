import * as __convertColors from "colors-convert";
function rgba2hex(r, g, b, a = 1) {
  if (typeof r === "object") {
    g = r.g;
    b = r.b;
    a = r.a;
    r = r.r;
  }
  let res = __convertColors.rgbaToHex({
    r,
    g,
    b,
    a
  });
  if (res.length === 9) {
    res = res.slice(0, -2);
  }
  return res;
}
var rgba2hex_default = rgba2hex;
export {
  rgba2hex_default as default
};
