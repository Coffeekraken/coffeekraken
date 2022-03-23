import {
  __spreadValues
} from "../../../../../chunk-TD77TI6B.mjs";
import __SSugarConfig from "@coffeekraken/s-sugar-config";
function srcIconsDir_default(settings = {}) {
  settings = __spreadValues({}, settings);
  const srcIconsDir = __SSugarConfig.get("storage.src.iconsDir");
  if (srcIconsDir !== void 0) {
    return srcIconsDir;
  }
  return void 0;
}
export {
  srcIconsDir_default as default
};
