import {
  __spreadValues
} from "../../../../../chunk-TD77TI6B.mjs";
import __SSugarConfig from "@coffeekraken/s-sugar-config";
function distViewsDir_default(settings = {}) {
  settings = __spreadValues({}, settings);
  const distViewsDir = __SSugarConfig.get("storage.dist.viewsDir");
  if (distViewsDir !== void 0) {
    return distViewsDir;
  }
  return void 0;
}
export {
  distViewsDir_default as default
};
