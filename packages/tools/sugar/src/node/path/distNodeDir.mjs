import {
  __spreadValues
} from "../../../../../chunk-TD77TI6B.mjs";
import __SSugarConfig from "@coffeekraken/s-sugar-config";
function distNodeDir_default(settings = {}) {
  settings = __spreadValues({}, settings);
  const distNodeDir = __SSugarConfig.get("storage.dist.nodeDir");
  if (distNodeDir !== void 0) {
    return distNodeDir;
  }
  return void 0;
}
export {
  distNodeDir_default as default
};
