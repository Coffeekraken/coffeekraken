import { createRequire as topLevelCreateRequire } from 'module';
 const require = topLevelCreateRequire(import.meta.url);
import __isVisible from "../is/visible";
function closestNotVisible(elm) {
  const originalElm = elm;
  elm = elm.parentNode;
  while (elm && elm != originalElm.ownerDocument) {
    if (!__isVisible(elm)) {
      return elm;
    }
    elm = elm.parentNode;
  }
  return null;
}
var closestNotVisible_default = closestNotVisible;
export {
  closestNotVisible_default as default
};
