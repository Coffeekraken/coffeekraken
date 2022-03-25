var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
import __parseArgs from "../../shared/cli/parseArgs";
import __SProcess from "@coffeekraken/s-process";
var runChild_cli_default = async (stringArgs = "") => {
  const args = __parseArgs(stringArgs);
  if (!args.processPath) {
    throw `Sorry but to use this endpont you have to specify at least a "--processPath" parameter...`;
  }
  const { default: ProcessClass } = await Promise.resolve().then(() => __toESM(require(args.processPath)));
  if (ProcessClass.prototype instanceof __SProcess) {
    const processInstance = new ProcessClass();
    processInstance.run(stringArgs);
  }
};
export {
  runChild_cli_default as default
};
