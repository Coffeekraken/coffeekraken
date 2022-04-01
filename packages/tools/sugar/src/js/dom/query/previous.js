import { createRequire as topLevelCreateRequire } from 'module';
 const require = topLevelCreateRequire(import.meta.url);
import __matches from "./matches";
function previous(elm, selector) {
  elm = elm.previousSibling;
  while (elm) {
    if (__matches(elm, selector)) {
      return elm;
    }
    elm = elm.previousSibling;
  }
  return false;
}
var previous_default = previous;
export {
  previous_default as default
};
