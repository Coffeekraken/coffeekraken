import __em2px from "./em2px";
import __rem2px from "./em2px";
import __px2em from "./px2em";
import __px2rem from "./px2rem";
function convert(from, to = "px", $elm) {
  let fromUnit = "px";
  if (typeof from === "string" && parseFloat(from).toString() !== from) {
    fromUnit = from.replace(/[0-9.,]+/g, "");
  }
  const fromNumber = parseFloat(from);
  let pxValue;
  switch (fromUnit) {
    case "px":
      pxValue = fromNumber;
      break;
    case "rem":
      pxValue = __rem2px(fromNumber);
      break;
    case "em":
      pxValue = __em2px(fromNumber, $elm);
      break;
    default:
      return from;
      break;
  }
  switch (to) {
    case "px":
      return pxValue;
      break;
    case "rem":
      return __px2rem(pxValue);
      break;
    case "em":
      return __px2em(pxValue, $elm);
      break;
    default:
      return from;
      break;
  }
}
var convert_default = convert;
export {
  convert_default as default
};
