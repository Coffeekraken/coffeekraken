import {
  __spreadValues
} from "../../../../../chunk-PG3ZPS4G.mjs";
import __querySelectorLive from "../dom/query/querySelectorLive";
import __expandPleasantCssClassname from "../../shared/html/expandPleasantCssClassname";
function expandPleasantCssClassnamesLive(settings) {
  settings = __spreadValues({
    rootNode: document
  }, settings);
  __querySelectorLive('[class*=":"]:not(code [class*=":"]):not(template [class*=":"]),[class*="@"]:not(code [class*="@"]):not(template [class*="@"])', ($elm) => {
    const classesStr = $elm.getAttribute("class");
    const newClassesStr = __expandPleasantCssClassname(classesStr);
    $elm.setAttribute("class", newClassesStr);
  }, {
    rootNode: settings == null ? void 0 : settings.rootNode,
    once: false
  });
}
export {
  expandPleasantCssClassnamesLive as default
};
