import {
  __spreadValues
} from "../../../../../../chunk-PG3ZPS4G.mjs";
import __isVisible from "./isVisible";
import __isInViewport from "./isInViewport";
import __closestNotVisible from "./query/closestNotVisible";
function querySelectorAll(selector, settings = {}) {
  settings = __spreadValues({
    visible: null,
    inViewport: null,
    rootNode: document.body
  }, settings);
  const results = [];
  const elms = settings.rootNode.querySelectorAll(selector);
  [].forEach.call(elms, (elm) => {
    if (settings.visible === false) {
      if (__isVisible(elm) || __closestNotVisible(elm))
        return;
    } else if (settings.visible === true) {
      if (!__isVisible(elm) || !__closestNotVisible(elm))
        return;
    }
    if (settings.inViewport === false) {
      if (__isInViewport(elm))
        return;
    } else if (settings.inViewport === true) {
      if (!__isInViewport(elm))
        return;
    }
    results.push(elm);
  });
  return results;
}
var querySelectorAll_default = querySelectorAll;
export {
  querySelectorAll_default as default
};
