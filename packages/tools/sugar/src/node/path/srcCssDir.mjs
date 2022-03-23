import {
  __spreadValues
} from "../../../../../chunk-TD77TI6B.mjs";
import __SSugarConfig from "@coffeekraken/s-sugar-config";
function srcCssDir_default(settings = {}) {
  settings = __spreadValues({}, settings);
  const srcCssDir = __SSugarConfig.get("storage.src.cssDir");
  if (srcCssDir !== void 0) {
    return srcCssDir;
  }
  return void 0;
}
export {
  srcCssDir_default as default
};
