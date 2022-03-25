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
var circleConstrain_exports = {};
__export(circleConstrain_exports, {
  default: () => circleConstrain_default
});
module.exports = __toCommonJS(circleConstrain_exports);
var import_distanceBetween = __toESM(require("./distanceBetween"));
function circleConstrain(center, radius, point) {
  const dist = (0, import_distanceBetween.default)(center, point);
  if (dist <= radius) {
    return point;
  } else {
    const x = point.x - center.x;
    const y = point.y - center.y;
    const radians = Math.atan2(y, x);
    return {
      x: Math.cos(radians) * radius + center.x,
      y: Math.sin(radians) * radius + center.y
    };
  }
}
var circleConstrain_default = circleConstrain;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
