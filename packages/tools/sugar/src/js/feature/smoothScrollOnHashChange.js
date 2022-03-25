import __scrollToLocationHash from "../dom/scroll/scrollToLocationHash";
import __deepMerge from "../../shared/object/deepMerge";
function smoothScrollOnHashChange(settings = {}) {
  settings = __deepMerge({
    scroll: {}
  }, settings);
  window.addEventListener("hashchange", (e) => {
    __scrollToLocationHash(settings);
  });
}
var smoothScrollOnHashChange_default = smoothScrollOnHashChange;
export {
  smoothScrollOnHashChange_default as default
};
