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
var packageJson_exports = {};
__export(packageJson_exports, {
  default: () => packageJson
});
module.exports = __toCommonJS(packageJson_exports);
var import_s_sugar_config = __toESM(require("@coffeekraken/s-sugar-config"));
var import_deepMerge = __toESM(require("../../../shared/object/deepMerge"));
var import_fs = __toESM(require("fs"));
function packageJson(name, settings) {
  const set = (0, import_deepMerge.default)({
    rootDir: import_s_sugar_config.default.get("npm.rootDir")
  });
  if (!import_fs.default.existsSync(`${set.rootDir}/${name}`) || !import_fs.default.existsSync(`${set.rootDir}/${name}/package.json`)) {
    throw new Error(`packageJson: Sorry but the package named "<yellow>${name}</yellow>" from which you try to get the package.json content seems to not exists...`);
  }
  const json = JSON.parse(import_fs.default.readFileSync(`${set.rootDir}/${name}/package.json`, "utf8"));
  return json;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
