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
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
import __objectHash from "object-hash";
import __fileHash from "../fs/fileHash";
import __sha256 from "../../shared/crypt/sha256";
import __extension from "../fs/extension";
async function dependenciesHash(dependenciesObj, settings) {
  settings = __spreadValues({
    recursive: true
  }, settings);
  let dataHash = "", filesHashes = [];
  if (dependenciesObj.files) {
    for (let i = 0; i < dependenciesObj.files.length; i++) {
      const filePath = dependenciesObj.files[i];
      let fileDepsHash = "";
      if (settings.recursive) {
        switch (__extension(filePath)) {
          case "js":
            const jsFileExports = await Promise.resolve().then(() => __toESM(require(filePath)));
            if (jsFileExports.dependencies) {
              let deps = jsFileExports.dependencies;
              if (typeof jsFileExports.dependencies === "function") {
                deps = jsFileExports.dependencies();
                fileDepsHash = await dependenciesHash(deps, settings);
              }
            }
            break;
        }
      }
      const fileHash = await __fileHash(filePath);
      filesHashes.push(__sha256.encrypt(`${fileHash}-${fileDepsHash}`));
    }
  }
  if (dependenciesObj.data) {
    dataHash = __objectHash(dependenciesObj.data);
  }
  return __sha256.encrypt(`${dataHash}-${filesHashes.join("-")}`);
}
export {
  dependenciesHash as default
};
