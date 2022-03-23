import {
  __spreadValues
} from "../../../../../chunk-TD77TI6B.mjs";
import __SSugarConfig from "@coffeekraken/s-sugar-config";
function distFontsDir_default(settings = {}) {
  settings = __spreadValues({}, settings);
  const distFontsDir = __SSugarConfig.get("storage.dist.fontsDir");
  if (distFontsDir !== void 0) {
    return distFontsDir;
  }
  return void 0;
}
export {
  distFontsDir_default as default
};
