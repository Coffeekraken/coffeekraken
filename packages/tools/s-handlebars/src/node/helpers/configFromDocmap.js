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
var configFromDocmap_exports = {};
__export(configFromDocmap_exports, {
  default: () => configFromDocmap
});
module.exports = __toCommonJS(configFromDocmap_exports);
function configFromDocmap(docmap, path) {
  const newObj = {};
  Object.keys(docmap.map).forEach((namespace) => {
    if (namespace.startsWith("@coffeekraken.s-vite")) {
      console.log(namespace);
    }
    if (!namespace.includes(path + "."))
      return;
    newObj[namespace.replace(path + ".", "")] = docmap.map[namespace];
  });
  return newObj;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
