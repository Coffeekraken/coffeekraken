import "../../../../../../chunk-PG3ZPS4G.mjs";
import __scrollTo from "./scrollTo";
import __deepMerge from "../../../shared/object/deepMerge";
function scrollToLocationHash(settings = {}) {
  settings = __deepMerge({
    scroll: {}
  }, settings);
  const hash = document.location.hash;
  if (!hash)
    return;
  const targetElm = document.querySelector(hash);
  if (!targetElm)
    return;
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }
  return __scrollTo(targetElm, settings.scroll);
}
var scrollToLocationHash_default = scrollToLocationHash;
export {
  scrollToLocationHash_default as default
};
