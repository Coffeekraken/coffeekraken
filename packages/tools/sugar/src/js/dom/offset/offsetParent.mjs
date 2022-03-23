import "../../../../../../chunk-PG3ZPS4G.mjs";
import __offset from "./offset";
function offsetParent(elm) {
  const parentOffset = __offset(elm.parentNode);
  const offset = __offset(elm);
  return {
    top: offset.top - parentOffset.top,
    left: offset.left - parentOffset.left
  };
}
var offsetParent_default = offsetParent;
export {
  offsetParent_default as default
};
