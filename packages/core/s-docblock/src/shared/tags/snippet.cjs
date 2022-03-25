var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var snippet_exports = {};
__export(snippet_exports, {
  default: () => snippet_default
});
module.exports = __toCommonJS(snippet_exports);
function snippet(data, blockSettings) {
  if (data.content && data.content[data.content.length - 1] === "") {
    data.content = data.content.slice(0, -1);
  }
  return {
    language: typeof data.value === "string" ? data.value.toLowerCase() : data.value,
    code: Array.isArray(data.content) ? data.content.join("\n") : data.content
  };
}
var snippet_default = snippet;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
