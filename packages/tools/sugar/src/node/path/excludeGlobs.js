import __SugarConfig from "@coffeekraken/s-sugar-config";
function excludeGlobs_default() {
  if (__SugarConfig.isLoaded()) {
    return __SugarConfig.get("storage.exclude");
  }
  return [];
}
export {
  excludeGlobs_default as default
};
