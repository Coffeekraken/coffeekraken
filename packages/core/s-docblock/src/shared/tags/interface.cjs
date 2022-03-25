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
var interface_exports = {};
__export(interface_exports, {
  default: () => interfaceTag
});
module.exports = __toCommonJS(interface_exports);
var import_folderPath = __toESM(require("@coffeekraken/sugar/node/fs/folderPath"));
var import_path = __toESM(require("path"));
var import_checkPathWithMultipleExtensions = __toESM(require("@coffeekraken/sugar/node/fs/checkPathWithMultipleExtensions"));
var import_filename = __toESM(require("@coffeekraken/sugar/node/fs/filename"));
var import_deepMap = __toESM(require("@coffeekraken/sugar/shared/object/deepMap"));
async function interfaceTag(data, blockSettings) {
  let stringArray = [];
  if (data.value === true) {
    stringArray = [(0, import_filename.default)(blockSettings.filepath), "default"];
    if (blockSettings.filepath.match(/\.ts$/)) {
      return;
    }
  } else {
    stringArray = data.value.trim().split(/(?<=^\S+)\s/);
  }
  let path = stringArray[0], importName = stringArray[1] ? stringArray[1].trim() : "default";
  const potentialPath = (0, import_checkPathWithMultipleExtensions.default)(import_path.default.resolve((0, import_folderPath.default)(blockSettings.filepath), path), ["js"]);
  if (!potentialPath)
    return;
  const int = await Promise.resolve().then(() => __toESM(require(potentialPath)));
  const interfaceObj = int[importName].toObject();
  interfaceObj.definition = (0, import_deepMap.default)(interfaceObj.definition, ({ object, prop, value }) => {
    if (typeof value === "string") {
      const newValue = new String(value);
      newValue.render = true;
      return newValue;
    }
    return value;
  });
  return interfaceObj;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
