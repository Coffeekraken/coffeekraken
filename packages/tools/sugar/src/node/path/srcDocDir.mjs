import {
  __spreadValues
} from "../../../../../chunk-TD77TI6B.mjs";
import __SSugarConfig from "@coffeekraken/s-sugar-config";
function srcDocDir_default(settings = {}) {
  settings = __spreadValues({}, settings);
  const srcDocDir = __SSugarConfig.get("storage.src.docDir");
  if (srcDocDir !== void 0) {
    return srcDocDir;
  }
  return void 0;
}
export {
  srcDocDir_default as default
};
