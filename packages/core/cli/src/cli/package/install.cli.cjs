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
var install_cli_exports = {};
__export(install_cli_exports, {
  default: () => install_cli_default
});
module.exports = __toCommonJS(install_cli_exports);
var import_s_log = __toESM(require("@coffeekraken/s-log"));
var import_s_promise = __toESM(require("@coffeekraken/s-promise"));
var import_s_sugar_config = __toESM(require("@coffeekraken/s-sugar-config"));
var import_child_process = __toESM(require("child_process"));
var import_fs = __toESM(require("fs"));
var import_SCliPackageInstallParamsInterface = __toESM(require("../../node/package/interface/SCliPackageInstallParamsInterface"));
var install_cli_default = (stringArgs = "") => {
  return new import_s_promise.default(async ({ resolve, reject, emit, pipe }) => {
    const finalParams = import_SCliPackageInstallParamsInterface.default.apply(stringArgs);
    if (import_fs.default.existsSync(`${process.cwd()}/package.json`)) {
      emit("log", {
        type: import_s_log.default.TYPE_INFO,
        value: `<yellow>[install]</yellow> Installing the <cyan>node_modules</cyan> dependencies using <cyan>${import_s_sugar_config.default.get("package.manager")}</cyan>...`
      });
      import_child_process.default.execSync(`${import_s_sugar_config.default.get("package.manager")} install`);
    }
    if (import_fs.default.existsSync(`${process.cwd()}/composer.json`)) {
      emit("log", {
        type: import_s_log.default.TYPE_INFO,
        value: `<yellow>[install]</yellow> Installing the composer <cyan>vendors</cyan> dependencies...`
      });
      import_child_process.default.execSync("composer install");
    }
    resolve();
  });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
