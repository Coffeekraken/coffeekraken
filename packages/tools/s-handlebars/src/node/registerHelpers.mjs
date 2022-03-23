import "../../../../chunk-TD77TI6B.mjs";
import * as __helpers from "./helpers/index";
function registerHelpers(handlebars) {
  for (const [key, value] of Object.entries(__helpers)) {
    handlebars.registerHelper(key, value);
  }
}
export {
  registerHelpers as default
};
