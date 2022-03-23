import {
  __spreadValues
} from "../../../../../chunk-TD77TI6B.mjs";
import __SSugarConfig from "@coffeekraken/s-sugar-config";
function distRootDir_default(settings = {}) {
  settings = __spreadValues({}, settings);
  const distRootDir = __SSugarConfig.get("storage.dist.rootDir");
  if (distRootDir !== void 0) {
    return distRootDir;
  }
  return void 0;
}
export {
  distRootDir_default as default
};
