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
var kill_cli_exports = {};
__export(kill_cli_exports, {
  default: () => kill
});
module.exports = __toCommonJS(kill_cli_exports);
var import_s_promise = __toESM(require("@coffeekraken/s-promise"), 1);
var import_fkill = __toESM(require("fkill"), 1);
function kill(params) {
  return new import_s_promise.default(async ({ resolve, reject, emit }) => {
    if (params.id) {
      await (0, import_fkill.default)(params.id);
      emit("log", {
        value: `<green>[process.kill]</green> The process with id <yellow>${params.id}</yellow> has been <green>successfully</green> killed`
      });
    } else if (params.port) {
      try {
        await (0, import_fkill.default)(`:${params.port}`);
        emit("log", {
          value: `<green>[process.kill]</green> The process running on the port <yellow>${params.port}</yellow> has been <green>successfully</green> killed`
        });
      } catch (e) {
        emit("log", {
          value: `<yellow>[process.kill]</yellow> It seems that no process are running on port <yellow>${params.port}</yellow>`
        });
      }
    }
    resolve();
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
