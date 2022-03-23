import {
  __spreadValues
} from "../../../../../chunk-TD77TI6B.mjs";
import __SSugarConfig from "@coffeekraken/s-sugar-config";
function sugarDir_default(settings = {}) {
  settings = __spreadValues({}, settings);
  const sugarRootDir = __SSugarConfig.get("storage.sugar.rootDir");
  if (sugarRootDir !== void 0) {
    return sugarRootDir;
  }
}
export {
  sugarDir_default as default
};
