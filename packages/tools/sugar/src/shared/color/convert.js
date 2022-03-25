import __parse from "./parse";
import __hsla2rgba from "./hsla2rgba";
import __rgba2hsl from "./rgba2hsla";
import __rgba2hex from "./rgba2hex";
function convert(input, format = "rgba") {
  let rgbaObj = {};
  if (typeof input === "string") {
    rgbaObj = __parse(input, "rgba");
  } else if (typeof input === "object") {
    if (input.r !== void 0 && input.g !== void 0 && input.b !== void 0) {
      rgbaObj = input;
    } else if (input.h !== void 0 && input.s !== void 0 && input.l !== void 0) {
      rgbaObj = __hsla2rgba(input);
    }
  }
  switch (format) {
    case "rgba":
      return rgbaObj;
    case "hsl":
      return __rgba2hsl(rgbaObj);
    case "hex":
    case "hexString":
      return __rgba2hex(rgbaObj);
    case "rgbaString":
      return `rgba(${rgbaObj.r},${rgbaObj.g},${rgbaObj.b},${rgbaObj.a})`;
    case "hslString":
      const hslObj = convert(rgbaObj, "hsl");
      return `hsl(${hslObj.h},${hslObj.s},${hslObj.l})`;
  }
  return void 0;
}
var convert_default = convert;
export {
  convert_default as default
};
