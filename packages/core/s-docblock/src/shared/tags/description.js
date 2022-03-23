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
var description_exports = {};
__export(description_exports, {
  default: () => description_default
});
module.exports = __toCommonJS(description_exports);
function description(data, blockSettings) {
  if (Array.isArray(data))
    data = data[0];
  if (data.content && data.content[data.content.length - 1] === "") {
    data.content = data.content.slice(0, -1);
  }
  if (!data.content)
    return "";
  const description2 = new String(data.content.map((c) => c.trim()).join("\n").trim());
  description2.render = true;
  return description2;
}
var description_default = description;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
