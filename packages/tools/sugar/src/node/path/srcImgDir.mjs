import {
  __spreadValues
} from "../../../../../chunk-TD77TI6B.mjs";
import __SSugarConfig from "@coffeekraken/s-sugar-config";
function srcImgDir_default(settings = {}) {
  settings = __spreadValues({}, settings);
  const srcImgDir = __SSugarConfig.get("storage.src.imgDir");
  if (srcImgDir !== void 0) {
    return srcImgDir;
  }
  return void 0;
}
export {
  srcImgDir_default as default
};
