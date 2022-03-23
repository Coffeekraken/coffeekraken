import {
  __spreadValues
} from "../../../../../chunk-TD77TI6B.mjs";
import __SSugarConfig from "@coffeekraken/s-sugar-config";
function srcNodeDir_default(settings = {}) {
  settings = __spreadValues({}, settings);
  const srcNodeDir = __SSugarConfig.get("storage.src.nodeDir");
  if (srcNodeDir !== void 0) {
    return srcNodeDir;
  }
  return void 0;
}
export {
  srcNodeDir_default as default
};
