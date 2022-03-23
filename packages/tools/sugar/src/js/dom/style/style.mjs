import {
  __spreadValues
} from "../../../../../../chunk-PG3ZPS4G.mjs";
import __styleString2Object from "../styleString2Object";
import __styleObject2String from "../styleObject2String";
function style(elm, styleObj) {
  const styleAttr = elm.getAttribute("style");
  if (styleAttr) {
    styleObj = __spreadValues(__spreadValues({}, __styleString2Object(styleAttr)), styleObj);
  }
  elm.style.cssText = __styleObject2String(styleObj);
  return elm.style;
}
var style_default = style;
export {
  style_default as default
};
