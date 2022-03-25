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
var runChild_cli_exports = {};
__export(runChild_cli_exports, {
  default: () => runChild_cli_default
});
module.exports = __toCommonJS(runChild_cli_exports);
var import_parseArgs = __toESM(require("../../shared/cli/parseArgs"));
var import_s_process = __toESM(require("@coffeekraken/s-process"));
var runChild_cli_default = async (stringArgs = "") => {
  const args = (0, import_parseArgs.default)(stringArgs);
  if (!args.processPath) {
    throw `Sorry but to use this endpont you have to specify at least a "--processPath" parameter...`;
  }
  const { default: ProcessClass } = await Promise.resolve().then(() => __toESM(require(args.processPath)));
  if (ProcessClass.prototype instanceof import_s_process.default) {
    const processInstance = new ProcessClass();
    processInstance.run(stringArgs);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
