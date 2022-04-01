import { createRequire as topLevelCreateRequire } from 'module';
 const require = topLevelCreateRequire(import.meta.url);
import __smoothScrollOnAnchorLinks from "./smoothScrollOnAnchorLinks";
import __smoothScrollOnPageLoad from "./smoothScrollOnPageLoad";
import __smoothScrollOnHashChange from "./smoothScrollOnHashChange";
import __deepMerge from "../../shared/object/deepMerge";
function smoothScroll(settings = {}) {
  settings = __deepMerge({
    scroll: {}
  }, settings);
  __smoothScrollOnPageLoad(settings);
  __smoothScrollOnAnchorLinks(settings);
  __smoothScrollOnHashChange(settings);
}
var smoothScroll_default = smoothScroll;
export {
  smoothScroll_default as default
};
