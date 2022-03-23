import "../../../../../../chunk-PG3ZPS4G.mjs";
import __matches from "./matches";
function next(elm, selector) {
  elm = elm.nextSibling;
  while (elm) {
    if (__matches(elm, selector)) {
      return elm;
    }
    elm = elm.nextSibling;
  }
  return false;
}
var next_default = next;
export {
  next_default as default
};
