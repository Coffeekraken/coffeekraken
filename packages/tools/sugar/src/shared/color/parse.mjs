import "../../../../../chunk-JETN4ZEY.mjs";
import __parseRgba from "./parseRgba";
import __parseHsla from "./parseHsla";
import __hsla2rgba from "./hsla2rgba";
import __hex2rgba from "./hex2rgba";
import __rgba2hsla from "./rgba2hsla";
function parse(color, format = "rgba") {
  color = color.replace(/\s/g, "");
  if (color.indexOf("rgb") != -1) {
    color = __parseRgba(color);
  } else if (color.indexOf("hsl") != -1) {
    color = __parseHsla(color);
    color = __hsla2rgba(color.h, color.s, color.l);
  } else if (color.substring(0, 1) == "#") {
    color = __hex2rgba(color);
  }
  switch (format) {
    case "hsla":
    case "hsl":
      return __rgba2hsla(color);
      break;
    case "rgba":
    case "rgb":
    default:
      return color;
      break;
  }
}
var parse_default = parse;
export {
  parse_default as default
};
