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
import __folderPath from "@coffeekraken/sugar/node/fs/folderPath";
import __path from "path";
import __checkPathWithMultipleExtensions from "@coffeekraken/sugar/node/fs/checkPathWithMultipleExtensions";
import __fileName from "@coffeekraken/sugar/node/fs/filename";
import __deepMap from "@coffeekraken/sugar/shared/object/deepMap";
async function interfaceTag(data, blockSettings) {
  let stringArray = [];
  if (data.value === true) {
    stringArray = [__fileName(blockSettings.filepath), "default"];
    if (blockSettings.filepath.match(/\.ts$/)) {
      return;
    }
  } else {
    stringArray = data.value.trim().split(/(?<=^\S+)\s/);
  }
  let path = stringArray[0], importName = stringArray[1] ? stringArray[1].trim() : "default";
  const potentialPath = __checkPathWithMultipleExtensions(__path.resolve(__folderPath(blockSettings.filepath), path), ["js"]);
  if (!potentialPath)
    return;
  const int = await Promise.resolve().then(() => __toESM(require(potentialPath)));
  const interfaceObj = int[importName].toObject();
  interfaceObj.definition = __deepMap(interfaceObj.definition, ({ object, prop, value }) => {
    if (typeof value === "string") {
      const newValue = new String(value);
      newValue.render = true;
      return newValue;
    }
    return value;
  });
  return interfaceObj;
}
export {
  interfaceTag as default
};
