var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
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
import __SPromise from "@coffeekraken/s-promise";
import __commandExists from "../command/commandExists";
import __spawn from "../process/spawn";
import __argsToString from "../../shared/cli/argsToString";
import __SSugarConfig from "@coffeekraken/s-sugar-config";
function install(packageNames = "", settings) {
  return new __SPromise(async ({ resolve, reject, emit, pipe }) => {
    settings = __spreadValues({
      cwd: process.cwd(),
      manager: __SSugarConfig.get("package.manager"),
      args: {}
    }, settings);
    let command;
    if (settings.manager === "yarn") {
      if (await __commandExists("yarn")) {
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
      if (await __commandExists("npm")) {
        command = "npm install";
        emit("log", {
          value: `<yellow>[install]</yellow> Using to "<yellow>npm</yellow>" to install dependencies`
        });
      }
    }
    if (!command) {
      throw new Error(`<red>[install]</red> Sorry but it seems that none of "<yellow>npm</yellow>" or "<yellow>yarn</yellow>" are available...`);
    }
    command += ` ${packageNames} ${__argsToString(settings.args)}`.replace(/\s{2,999}/, " ");
    const result = await pipe(__spawn(command, [], {
      cwd: settings.cwd
    }));
    resolve(result);
  });
}
export {
  install as default
};
