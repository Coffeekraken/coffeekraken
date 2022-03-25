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
var easeClamp_exports = {};
__export(easeClamp_exports, {
  default: () => easeClamp
});
module.exports = __toCommonJS(easeClamp_exports);
var import_easeOutQuad = __toESM(require("../easing/easeOutQuad"));
var import_clamp = __toESM(require("./clamp"));
function easeClamp(num, minEnd, minStart, maxStart, maxEnd) {
  const diffStart = Math.abs(minStart - minEnd), diffEnd = Math.abs(maxStart - maxEnd);
  let computedNum = num;
  if (num <= minStart) {
    const percent = Math.abs(100 / diffStart * (0, import_clamp.default)(num, minEnd, minStart));
    computedNum = diffStart / 100 * ((0, import_easeOutQuad.default)(1 / 100 * percent) * 100) * -1;
  } else if (num >= maxStart) {
    const percent = Math.abs(100 / diffEnd * (0, import_clamp.default)(diffEnd - (maxEnd - num), 0, diffEnd));
    computedNum = maxStart + diffEnd / 100 * ((0, import_easeOutQuad.default)(1 / 100 * percent) * 100);
  }
  return computedNum;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
