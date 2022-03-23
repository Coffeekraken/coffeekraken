import {
  __spreadValues
} from "../../../../../chunk-TD77TI6B.mjs";
import __SSugarConfig from "@coffeekraken/s-sugar-config";
function distIconsDir_default(settings = {}) {
  settings = __spreadValues({}, settings);
  const distIconsDir = __SSugarConfig.get("storage.dist.iconsDir");
  if (distIconsDir !== void 0) {
    return distIconsDir;
  }
  return void 0;
}
export {
  distIconsDir_default as default
};
