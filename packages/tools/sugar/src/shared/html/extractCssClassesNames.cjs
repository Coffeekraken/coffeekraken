var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
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
var extractCssClassesNames_exports = {};
__export(extractCssClassesNames_exports, {
  default: () => extractCssClassesNames
});
module.exports = __toCommonJS(extractCssClassesNames_exports);
var import_expandPleasantCssClassname = __toESM(require("./expandPleasantCssClassname"), 1);
function extractCssClassesNames(html, settings) {
  const finalSettings = __spreadValues({
    expandPleasantCssClassname: true,
    includeIds: false
  }, settings != null ? settings : {});
  let reg = /class="[a-zA-Z0-9_\-:@\s]+"/gm;
  if (finalSettings.includeIds) {
    reg = /(class|id)="[a-zA-Z0-9_\-:@\s]+"/gm;
  }
  const matches = html.match(reg);
  if (!matches)
    return [];
  let classesNames = [];
  matches.forEach((match) => {
    let classesStr = match.trim().replace('class="', "").replace('id="', "").replace('"', "");
    if (settings == null ? void 0 : settings.expandPleasantCssClassname) {
      classesStr = (0, import_expandPleasantCssClassname.default)(classesStr);
    }
    classesNames = [...classesNames, ...classesStr.split(" ")].map((l) => l.trim());
  });
  return classesNames;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
