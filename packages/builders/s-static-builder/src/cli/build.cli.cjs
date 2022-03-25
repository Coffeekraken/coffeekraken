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
var build_cli_exports = {};
__export(build_cli_exports, {
  default: () => build
});
module.exports = __toCommonJS(build_cli_exports);
var import_s_promise = __toESM(require("@coffeekraken/s-promise"), 1);
var import_SStaticBuilder = __toESM(require("../node/SStaticBuilder"), 1);
var import_SStaticBuilderBuildParamsInterface = __toESM(require("../node/interface/SStaticBuilderBuildParamsInterface"), 1);
function build(stringArgs = "") {
  return new import_s_promise.default(async ({ resolve, reject, pipe }) => {
    const builder = new import_SStaticBuilder.default({
      builder: {
        interface: import_SStaticBuilderBuildParamsInterface.default
      }
    });
    await pipe(builder.build(stringArgs));
    process.exit();
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
