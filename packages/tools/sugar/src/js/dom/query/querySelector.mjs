import {
  __spreadValues
} from "../../../../../../chunk-PG3ZPS4G.mjs";
import __isVisible from "./isVisible";
import __isInViewport from "./isInViewport";
import __closestNotVisible from "./closestNotVisible";
function querySelector(selector, settings = {}) {
  settings = __spreadValues({
    visible: null,
    inViewport: null,
    rootNode: document.body
  }, settings);
  const elm = settings.rootNode.querySelector(selector);
  if (!elm)
    return null;
  if (settings.visible === false) {
    if (__isVisible(elm) || __closestNotVisible(elm))
      return null;
  } else if (settings.visible === true) {
    if (!__isVisible(elm) || !__closestNotVisible(elm))
      return null;
  }
  if (settings.inViewport === false) {
    if (__isInViewport(elm))
      return null;
  } else if (settings.inViewport === true) {
    if (!__isInViewport(elm))
      return null;
  }
  return elm;
}
var querySelector_default = querySelector;
export {
  querySelector_default as default
};
