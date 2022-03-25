var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var sFile_config_exports = {};
__export(sFile_config_exports, {
  default: () => sFile_config_default
});
module.exports = __toCommonJS(sFile_config_exports);
var import_packageRoot = __toESM(require("@coffeekraken/sugar/node/path/packageRoot"), 1);
var import_dirname = __toESM(require("@coffeekraken/sugar/node/fs/dirname"), 1);
function sFile_config_default(env, config) {
  if (env.platform !== "node")
    return;
  return {
    classesMap: {
      "tsconfig.*": `${(0, import_packageRoot.default)((0, import_dirname.default)())}/src/node/ts/STsconfigFile`,
      "*.js,*.jsx": `${(0, import_packageRoot.default)((0, import_dirname.default)())}/src/node/js/SJsFile`,
      "*.ts,*.tsx": `${(0, import_packageRoot.default)((0, import_dirname.default)())}/src/node/typescript/STsFile`,
      "*.scss,*.sass": `${(0, import_packageRoot.default)((0, import_dirname.default)())}/src/node/scss/SScssFile`,
      "*.svelte": `${(0, import_packageRoot.default)((0, import_dirname.default)())}/src/node/svelte/SSvelteFile`
    }
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
