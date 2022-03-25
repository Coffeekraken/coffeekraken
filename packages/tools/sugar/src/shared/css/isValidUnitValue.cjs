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
var isValidUnitValue_exports = {};
__export(isValidUnitValue_exports, {
  default: () => isValidUnitValue
});
module.exports = __toCommonJS(isValidUnitValue_exports);
function isValidUnitValue(value) {
  if (typeof value === "number")
    return true;
  if (typeof value !== "string")
    return false;
  const unit = value.replace(/[0-9,.]+/, "").trim().toLowerCase();
  if ([
    "cm",
    "mm",
    "in",
    "px",
    "pt",
    "pc",
    "em",
    "ex",
    "ch",
    "rem",
    "vw",
    "vh",
    "vmin",
    "vmax",
    "%"
  ].indexOf(unit) === -1)
    return false;
  return true;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
