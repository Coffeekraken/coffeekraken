import {
  __spreadValues
} from "../../../../../chunk-TD77TI6B.mjs";
import __SSugarConfig from "@coffeekraken/s-sugar-config";
function srcFontsDir_default(settings = {}) {
  settings = __spreadValues({}, settings);
  const srcFontsDir = __SSugarConfig.get("storage.src.fontsDir");
  if (srcFontsDir !== void 0) {
    return srcFontsDir;
  }
  return void 0;
}
export {
  srcFontsDir_default as default
};
