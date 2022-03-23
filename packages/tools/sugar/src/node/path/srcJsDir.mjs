import {
  __spreadValues
} from "../../../../../chunk-TD77TI6B.mjs";
import __SSugarConfig from "@coffeekraken/s-sugar-config";
function srcJsDir_default(settings = {}) {
  settings = __spreadValues({}, settings);
  const srcJsDir = __SSugarConfig.get("storage.src.jsDir");
  if (srcJsDir !== void 0) {
    return srcJsDir;
  }
  return void 0;
}
export {
  srcJsDir_default as default
};
