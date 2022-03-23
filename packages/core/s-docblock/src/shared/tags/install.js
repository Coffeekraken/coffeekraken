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
var install_exports = {};
__export(install_exports, {
  default: () => install_default
});
module.exports = __toCommonJS(install_exports);
function install(data, blockSettings) {
  if (!Array.isArray(data))
    data = [data];
  data = data.map((item) => {
    if (item.content && item.content[item.content.length - 1] === "") {
      item.content = item.content.slice(0, -1);
    }
    if (!item.content)
      return null;
    const parts = item.value.split(/\s{2,20000}/).map((l) => l.trim());
    const result = {
      language: parts[0],
      title: parts[1],
      description: parts[2],
      code: Array.isArray(item.content) ? item.content.join("\n").trim().replace(/\\@/, "@") : item.content.replace(/\\@/, "@")
    };
    if (result.title) {
      result.title = new String(result.title);
      result.title.render = true;
    }
    if (result.description) {
      result.description = new String(result.description);
      result.description.render = true;
    }
    return result;
  }).filter((item) => item !== null);
  return data;
}
var install_default = install;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
