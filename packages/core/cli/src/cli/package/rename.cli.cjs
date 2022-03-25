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
var rename_cli_exports = {};
__export(rename_cli_exports, {
  default: () => rename_cli_default
});
module.exports = __toCommonJS(rename_cli_exports);
var import_SCliPackageRenameParamsInterface = __toESM(require("../../node/package/interface/SCliPackageRenameParamsInterface"));
var import_s_promise = __toESM(require("@coffeekraken/s-promise"));
var import_renamePackage = __toESM(require("@coffeekraken/sugar/node/package/renamePackage"));
var import_fs = __toESM(require("fs"));
var rename_cli_default = (stringArgs = "") => {
  return new import_s_promise.default(async ({ resolve, reject, emit, pipe }) => {
    const finalParams = import_SCliPackageRenameParamsInterface.default.apply(stringArgs);
    if (!finalParams.name) {
      finalParams.name = await emit("ask", {
        type: "input",
        message: "Please enter the new name for your package",
        pattern: "^[a-zA-Z0-9_@/-]+$"
      });
    }
    if (finalParams.folder === void 0) {
      finalParams.folder = await emit("ask", {
        type: "confirm",
        message: "Do you want to rename the folder as well ?",
        default: true
      });
    }
    emit("log", {
      value: `<yellow>[rename]</yellow> Renaming the package with "<cyan>${finalParams.name}</cyan>"`
    });
    (0, import_renamePackage.default)(finalParams.name);
    if (finalParams.folder) {
      const folderName = finalParams.name.split("/").pop();
      emit("log", {
        value: `<yellow>[rename]</yellow> Renaming the folder with "<cyan>${folderName}</cyan>"`
      });
      const newPath = `${process.cwd().split("/").slice(0, -1).join("/")}/${folderName}`;
      import_fs.default.renameSync(process.cwd(), newPath);
      process.chdir(newPath);
      emit("chdir", newPath);
    }
    resolve();
  });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
