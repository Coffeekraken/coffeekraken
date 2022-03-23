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
var cssClass_exports = {};
__export(cssClass_exports, {
  default: () => cssClass_default
});
module.exports = __toCommonJS(cssClass_exports);
var import_idCompliant = __toESM(require("@coffeekraken/sugar/shared/string/idCompliant"), 1);
function cssClass(data, blockSettings) {
  if (!Array.isArray(data))
    data = [data];
  const res = {};
  data.forEach((cssClass2) => {
    if (typeof cssClass2 !== "object" || !cssClass2.value || typeof cssClass2.value !== "string")
      return;
    const parts = cssClass2.value.split(/\s{2,20000}/).map((l) => l.trim());
    let className = parts == null ? void 0 : parts[0];
    const name = (0, import_idCompliant.default)(className, {});
    const description = new String(parts && parts[1] ? parts[1] : null);
    description.render = true;
    res[name] = {
      name: parts[0],
      description
    };
    if (cssClass2.content) {
      const content = new String(cssClass2.content.join("\n"));
      content.render = true;
      res[name].content = content;
    }
  });
  return res;
}
var cssClass_default = cssClass;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
