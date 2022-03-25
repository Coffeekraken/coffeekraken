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
var stylesheetToString_exports = {};
__export(stylesheetToString_exports, {
  default: () => stylesheetToString
});
module.exports = __toCommonJS(stylesheetToString_exports);
function stylesheetToString(stylesheet) {
  let stack = [];
  if (!(stylesheet instanceof StyleSheetList)) {
    if (!Array.isArray(stylesheet))
      stack.push(stylesheet);
  } else {
    Object.keys(stylesheet).forEach((k) => {
      stack.push(stylesheet[k]);
    });
  }
  let str = ``;
  stack.forEach((style) => {
    str += style.cssRules ? Array.from(style.cssRules).map((rule) => {
      var _a;
      return (_a = rule.cssText) != null ? _a : "";
    }).join("\n") : "";
  });
  return str;
}
