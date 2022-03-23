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
var template_exports = {};
__export(template_exports, {
  default: () => template_default
});
module.exports = __toCommonJS(template_exports);
var import_parseHtml = __toESM(require("@coffeekraken/sugar/shared/console/parseHtml"), 1);
var import_countLine = __toESM(require("@coffeekraken/sugar/shared/string/countLine"), 1);
function template_default({ interfaceClass, properties }) {
  let tpl = [];
  tpl = tpl.concat([
    "",
    `<yellow>${interfaceClass.name}</yellow> interface help`,
    ""
  ]);
  if (interfaceClass.description) {
    tpl.push(interfaceClass.description);
    tpl.push("");
  }
  for (const propKey in properties) {
    const propertyObj = properties[propKey];
    const titleStr = `--${propertyObj.name} ${propertyObj.alias ? `(${propertyObj.alias})` : ""} ${propertyObj.type} ${propertyObj.default && (0, import_countLine.default)(propertyObj.default) <= 20 ? propertyObj.default : ""} ${propertyObj.description || ""}`;
    tpl.push(titleStr.replace(/\s{2,999}/gm, " "));
    if (propertyObj.default && (0, import_countLine.default)(propertyObj.default) > 20) {
      tpl.push(propertyObj.default);
    }
  }
  return (0, import_parseHtml.default)(tpl.join("\n"));
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
