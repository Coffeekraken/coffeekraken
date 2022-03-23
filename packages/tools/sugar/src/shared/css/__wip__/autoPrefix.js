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
var autoPrefix_exports = {};
__export(autoPrefix_exports, {
  default: () => autoPrefix
});
module.exports = __toCommonJS(autoPrefix_exports);
function autoPrefix(style) {
  let styleObj = typeof style === "object" ? style : {};
  let prefixedStyleObj = {};
  if (typeof style === "string") {
  }
  parseCss(style);
  return "";
}
function parseCss(css2) {
  const reg = /(\/\*\@-.*?)(?=\/\*\@-|\z)/gm;
  console.log(reg.exec(css2));
}
function deepMap(object, handler, path = "") {
  if (Array.isArray(object)) {
    object.forEach((item, i) => {
      const newPath = path === "" ? `${i}` : `${path}.${i}`;
      deepMap(item, handler, newPath);
    });
  } else if (typeof object === "object") {
    Object.keys(object).forEach((itemName) => {
      const itemValue = object[itemName];
      const newPath = path === "" ? `${itemName}` : `${path}.${itemName}`;
      deepMap(itemValue, handler, newPath);
    });
  } else {
    handler(object, path.split(".").pop(), path);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
