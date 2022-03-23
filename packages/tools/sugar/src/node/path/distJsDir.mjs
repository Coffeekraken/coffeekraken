import {
  __spreadValues
} from "../../../../../chunk-TD77TI6B.mjs";
import __SSugarConfig from "@coffeekraken/s-sugar-config";
function distJsDir_default(settings = {}) {
  settings = __spreadValues({}, settings);
  const distJsDir = __SSugarConfig.get("storage.dist.jsDir");
  if (distJsDir !== void 0) {
    return distJsDir;
  }
  return void 0;
}
export {
  distJsDir_default as default
};
