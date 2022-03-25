var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
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
var install_exports = {};
__export(install_exports, {
  default: () => install
});
module.exports = __toCommonJS(install_exports);
var import_s_promise = __toESM(require("@coffeekraken/s-promise"));
var import_commandExists = __toESM(require("../command/commandExists"));
var import_spawn = __toESM(require("../process/spawn"));
var import_argsToString = __toESM(require("../../shared/cli/argsToString"));
var import_s_sugar_config = __toESM(require("@coffeekraken/s-sugar-config"));
function install(packageNames = "", settings) {
  return new import_s_promise.default(async ({ resolve, reject, emit, pipe }) => {
    settings = __spreadValues({
      cwd: process.cwd(),
      manager: import_s_sugar_config.default.get("package.manager"),
      args: {}
    }, settings);
    let command;
    if (settings.manager === "yarn") {
      if (await (0, import_commandExists.default)("yarn")) {
        command = "yarn add";
        emit("log", {
          value: `<yellow>[install]</yellow> Using to "<yellow>yarn</yellow>" to install dependencies`
        });
      } else {
        emit("log", {
          value: `<yellow>[install]</yellow> Sorry but "<yellow>yarn</yellow>" is not available on this system`
        });
      }
    }
    if (!command) {
      if (await (0, import_commandExists.default)("npm")) {
        command = "npm install";
        emit("log", {
          value: `<yellow>[install]</yellow> Using to "<yellow>npm</yellow>" to install dependencies`
        });
      }
    }
    if (!command) {
      throw new Error(`<red>[install]</red> Sorry but it seems that none of "<yellow>npm</yellow>" or "<yellow>yarn</yellow>" are available...`);
    }
    command += ` ${packageNames} ${(0, import_argsToString.default)(settings.args)}`.replace(/\s{2,999}/, " ");
    const result = await pipe((0, import_spawn.default)(command, [], {
      cwd: settings.cwd
    }));
    resolve(result);
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
