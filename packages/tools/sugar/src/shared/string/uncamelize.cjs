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
var uncamelize_exports = {};
__export(uncamelize_exports, {
  default: () => uncamelize_default
});
module.exports = __toCommonJS(uncamelize_exports);
function uncamelize(text, separator = "-") {
  let res = "";
  res = text.replace(/[A-Z]/g, function(letter) {
    return separator + letter.toLowerCase();
  });
  if (res.slice(0, 1) === separator)
    res = res.slice(1);
  return res;
}
var uncamelize_default = uncamelize;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
