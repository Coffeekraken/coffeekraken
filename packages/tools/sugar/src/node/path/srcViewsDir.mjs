import {
  __spreadValues
} from "../../../../../chunk-TD77TI6B.mjs";
import __SSugarConfig from "@coffeekraken/s-sugar-config";
function srcViewsDir_default(settings = {}) {
  settings = __spreadValues({}, settings);
  const srcViewsDir = __SSugarConfig.get("storage.src.viewsDir");
  if (srcViewsDir !== void 0) {
    return srcViewsDir;
  }
  return void 0;
}
export {
  srcViewsDir_default as default
};
