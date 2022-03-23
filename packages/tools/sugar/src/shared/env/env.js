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
var env_exports = {};
__export(env_exports, {
  default: () => env_default
});
module.exports = __toCommonJS(env_exports);
var import_node = __toESM(require("../is/node"), 1);
var import_get = __toESM(require("../object/get"), 1);
var import_set = __toESM(require("../object/set"), 1);
var import_delete = __toESM(require("../object/delete"), 1);
var import_parse = __toESM(require("../string/parse"), 1);
function env(dotPath, value) {
  if (!(0, import_node.default)()) {
    if (!window.process)
      window.process = {};
    if (!window.process.env)
      window.process.env = {};
  }
  const targetObj = (0, import_node.default)() ? global.process.env : window.process.env;
  if (value === -1) {
    (0, import_delete.default)(targetObj, dotPath.toUpperCase());
  } else if (value !== void 0) {
    (0, import_set.default)(targetObj, dotPath.toUpperCase(), (0, import_parse.default)(value));
  }
  return (0, import_parse.default)((0, import_get.default)(targetObj, dotPath.toUpperCase()));
}
var env_default = env;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
