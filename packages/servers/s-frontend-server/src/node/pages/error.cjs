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
var error_exports = {};
__export(error_exports, {
  default: () => error_default
});
module.exports = __toCommonJS(error_exports);
var import_deepMerge = __toESM(require("../../../../shared/object/deepMerge"));
function error(data = {}) {
  data = (0, import_deepMerge.default)({
    title: "Error",
    intro: "Somethings wrong happend",
    body: null,
    ctas: [
      {
        text: "Go back",
        href: "javascript:history.back()",
        target: "_self"
      }
    ]
  }, data);
  const settings = (0, import_deepMerge.default)(__SugarConfig.get("frontend"), args);
  const server = __express();
  const promise = new __SPromise({
    id: "frontendServerError"
  });
  const templateData = {
    frontspec: JSON.stringify(frontspec),
    env: process.env.NODE_ENV || "development",
    settings: JSON.stringify(settings),
    packageJson: __standardizeJson(require(__packageRootDir() + "/package.json"))
  };
}
var error_default = error;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
