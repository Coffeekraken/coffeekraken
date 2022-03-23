import {
  __spreadValues
} from "../../../../../chunk-TD77TI6B.mjs";
import __SSugarConfig from "@coffeekraken/s-sugar-config";
function srcRootDir_default(settings = {}) {
  settings = __spreadValues({}, settings);
  const srcRootDir = __SSugarConfig.get("storage.src.rootDir");
  if (srcRootDir !== void 0) {
    return srcRootDir;
  }
  return void 0;
}
export {
  srcRootDir_default as default
};
