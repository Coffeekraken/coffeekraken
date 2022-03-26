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
var registerSFileClasses_exports = {};
__export(registerSFileClasses_exports, {
  default: () => registerSFileClasses_default
});
module.exports = __toCommonJS(registerSFileClasses_exports);
var import_s_file = __toESM(require("@coffeekraken/s-file"), 1);
var import_s_sugar_config = __toESM(require("@coffeekraken/s-sugar-config"), 1);
var registerSFileClasses_default = () => {
  const map = import_s_sugar_config.default.get("fs.sFileClassesMap");
  Object.keys(map).forEach(async (key) => {
    const { default: cls } = await Promise.resolve().then(() => __toESM(require(map[key])));
    key.split(",").map((l) => l.trim()).forEach((pattern) => {
      import_s_file.default.registerClass(pattern, cls);
    });
  });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
