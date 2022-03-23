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
var namespace_exports = {};
__export(namespace_exports, {
  default: () => namespace_default
});
module.exports = __toCommonJS(namespace_exports);
var import_json = __toESM(require("./json"), 1);
var import_deepMerge = __toESM(require("../../shared/object/deepMerge"), 1);
var import_filename = __toESM(require("../fs/filename"), 1);
var import_s_sugar_config = __toESM(require("@coffeekraken/s-sugar-config"), 1);
function namespace(path, settings = {}) {
  settings = (0, import_deepMerge.default)(import_s_sugar_config.default.get("core.namespace") || {}, settings);
  const json = (0, import_json.default)(settings.context || process.cwd());
  let packageName = "", packageVersion = "";
  if (json && json.name)
    packageName = json.name.replace("@", "").split("/").join(".").trim();
  if (json && json.version)
    packageVersion = json.version.split(".").join("-");
  let sanitizedPath = path;
  const filename = (0, import_filename.default)(path);
  if (filename && sanitizedPath.split("/").length > 1) {
    sanitizedPath = sanitizedPath.replace("/" + filename, "").replace(filename, "");
  }
  sanitizedPath = sanitizedPath.split(" ").join("").split("/").join(".");
  let resultNamespace = settings.pattern.replace("{package.name}", packageName).replace("{package.version}", packageVersion).replace("{path}", sanitizedPath).trim();
  resultNamespace = resultNamespace.split("...").join(".").split("..").join(".");
  return resultNamespace;
}
var namespace_default = namespace;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
