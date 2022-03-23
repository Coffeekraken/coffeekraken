import {
  __spreadValues
} from "../../../../../chunk-TD77TI6B.mjs";
import __SSugarConfig from "@coffeekraken/s-sugar-config";
function packageCacheDir_default(settings = {}) {
  settings = __spreadValues({}, settings);
  const packageCacheDir = __SSugarConfig.get("storage.package.cacheDir");
  if (packageCacheDir !== void 0) {
    return packageCacheDir;
  }
  return void 0;
}
export {
  packageCacheDir_default as default
};
