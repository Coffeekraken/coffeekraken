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
var return_exports = {};
__export(return_exports, {
  default: () => return_default
});
module.exports = __toCommonJS(return_exports);
var import_upperFirst = __toESM(require("@coffeekraken/sugar/shared/string/upperFirst"));
function returnTag(data, blockSettings) {
  const stringArray = data.value.trim().split(/(?<=^\S+)\s/);
  let type = stringArray && stringArray[0] ? (0, import_upperFirst.default)(stringArray[0].replace("{", "").replace("}", "")) : null;
  if (type && type.includes("|")) {
    type = type.split("|").map((l) => (0, import_upperFirst.default)(l.trim()));
  } else {
    type = [type];
  }
  const description = new String(stringArray[1] ? stringArray[1].trim() : "");
  description.render = true;
  return {
    type,
    description
  };
}
var return_default = returnTag;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
