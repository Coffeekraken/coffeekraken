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
var parseHtml_exports = {};
__export(parseHtml_exports, {
  default: () => parseHtml_default
});
module.exports = __toCommonJS(parseHtml_exports);
var import_tagsMap = __toESM(require("./html/tagsMap"));
var import_replaceTags = __toESM(require("../html/replaceTags"));
function parseHtml(message) {
  let isArray = false;
  if (Array.isArray(message)) {
    isArray = true;
  } else {
    message = [message];
  }
  message = message.map((m) => {
    return (0, import_replaceTags.default)(m, import_tagsMap.default);
  });
  if (isArray)
    return message;
  return message[0];
}
var parseHtml_default = parseHtml;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
