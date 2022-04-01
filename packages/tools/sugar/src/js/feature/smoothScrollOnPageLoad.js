import { createRequire as topLevelCreateRequire } from 'module';
 const require = topLevelCreateRequire(import.meta.url);
import __scrollToLocationHash from "../dom/scroll/scrollToLocationHash";
import __deepMerge from "../../shared/object/deepMerge";
function smoothScrollOnPageLoad(settings = {}) {
  settings = __deepMerge({
    scroll: {}
  }, settings);
  __scrollToLocationHash(settings);
}
var smoothScrollOnPageLoad_default = smoothScrollOnPageLoad;
export {
  smoothScrollOnPageLoad_default as default
};
