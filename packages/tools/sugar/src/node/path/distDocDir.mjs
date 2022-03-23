import {
  __spreadValues
} from "../../../../../chunk-TD77TI6B.mjs";
import __SSugarConfig from "@coffeekraken/s-sugar-config";
function distDocDir_default(settings = {}) {
  settings = __spreadValues({}, settings);
  const distDocDir = __SSugarConfig.get("storage.dist.docDir");
  if (distDocDir !== void 0) {
    return distDocDir;
  }
  return void 0;
}
export {
  distDocDir_default as default
};
