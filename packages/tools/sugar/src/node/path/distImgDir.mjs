import {
  __spreadValues
} from "../../../../../chunk-TD77TI6B.mjs";
import __SSugarConfig from "@coffeekraken/s-sugar-config";
function distImgDir_default(settings = {}) {
  settings = __spreadValues({}, settings);
  const distImgDir = __SSugarConfig.get("storage.dist.imgDir");
  if (distImgDir !== void 0) {
    return distImgDir;
  }
  return void 0;
}
export {
  distImgDir_default as default
};
