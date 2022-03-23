import "../../../../../chunk-TD77TI6B.mjs";
import __SSugarConfig from "@coffeekraken/s-sugar-config";
function packageTmpDir_default() {
  const tmpDir = __SSugarConfig.get("storage.package.tmpDir");
  if (tmpDir !== void 0) {
    return tmpDir;
  }
  return __tmpDir;
}
export {
  packageTmpDir_default as default
};
