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
import __SFile from "@coffeekraken/s-file";
import __SugarConfig from "@coffeekraken/s-sugar-config";
var registerSFileClasses_default = () => {
  const map = __SugarConfig.get("fs.sFileClassesMap");
  Object.keys(map).forEach(async (key) => {
    const { default: cls } = await Promise.resolve().then(() => __toESM(require(map[key])));
    key.split(",").map((l) => l.trim()).forEach((pattern) => {
      __SFile.registerClass(pattern, cls);
    });
  });
};
export {
  registerSFileClasses_default as default
};
