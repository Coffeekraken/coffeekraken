import {
  __spreadValues
} from "../../../../../chunk-TD77TI6B.mjs";
import __SSugarConfig from "@coffeekraken/s-sugar-config";
function distCssDir_default(settings = {}) {
  settings = __spreadValues({}, settings);
  const distCssDir = __SSugarConfig.get("storage.dist.cssDir");
  if (distCssDir !== void 0) {
    return distCssDir;
  }
  return void 0;
}
export {
  distCssDir_default as default
};
