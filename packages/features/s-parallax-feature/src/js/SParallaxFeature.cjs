import { createRequire as topLevelCreateRequire } from 'module';
 const require = topLevelCreateRequire(import.meta.url);
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
var SParallaxFeature_exports = {};
__export(SParallaxFeature_exports, {
  default: () => SParallaxFeature,
  define: () => define
});
module.exports = __toCommonJS(SParallaxFeature_exports);
var import_s_feature = __toESM(require("@coffeekraken/s-feature"));
var import_deepMerge = __toESM(require("@coffeekraken/sugar/shared/object/deepMerge"));
var import_SParallaxFeatureInterface = __toESM(require("./interface/SParallaxFeatureInterface"));
var __rematrix = __toESM(require("rematrix"));
class SParallaxFeature extends import_s_feature.default {
  constructor(name, node, settings) {
    super(name, node, (0, import_deepMerge.default)({
      componentUtils: {
        interface: import_SParallaxFeatureInterface.default
      },
      feature: {}
    }, settings != null ? settings : {}));
    const style = window.getComputedStyle(this.node);
    const transformStr = style.transform;
    this._originalTransform = transformStr;
  }
  mount() {
    document.addEventListener("mousemove", (e) => {
      if (!this.componentUtils.isInViewport())
        return;
      const percentage = this._getPositionPercentages(e);
      this._setLayerTransform(percentage);
    });
  }
  _setLayerTransform(percentage) {
    var _a;
    const rotateY = 90 / 100 * percentage.x;
    const rotateX = 90 / 100 * percentage.y;
    const offsetX = 200 / 100 * percentage.x;
    const offsetY = 200 / 100 * percentage.y;
    const amount = (_a = this.props.amount) != null ? _a : "1";
    const matrix = __rematrix.fromString(this._originalTransform);
    const finalRotateY = rotateY * parseFloat(amount) * parseFloat(this.props.amountY) * parseFloat(this.props.amountRotateY);
    const finalRotateX = rotateX * parseFloat(amount) * parseFloat(this.props.amountX) * parseFloat(this.props.amountRotateX);
    const finalOffsetX = offsetX * parseFloat(amount) * parseFloat(this.props.amountX) * parseFloat(this.props.amountTranslateX);
    const finalOffsetY = offsetY * parseFloat(amount) * parseFloat(this.props.amountY) * parseFloat(this.props.amountTranslateY);
    const tx = __rematrix.translateX(finalOffsetX), ty = __rematrix.translateY(finalOffsetY), rx = __rematrix.rotateX(finalRotateX), ry = __rematrix.rotateY(finalRotateY);
    let newMatrix = [matrix, tx, ty, rx, ry].reduce(__rematrix.multiply);
    this.node.style.transform = __rematrix.toString(newMatrix);
  }
  _getPositionPercentages(e) {
    var _a, _b, _c, _d;
    const viewportWidth = document.documentElement.clientWidth, viewportHeight = document.documentElement.clientHeight, halfViewportWidth = viewportWidth * 0.5, halfViewportHeight = viewportHeight * 0.5, positionX = (_b = (_a = e.touches) == null ? void 0 : _a[0].clientX) != null ? _b : e.pageX, positionY = ((_d = (_c = e.touches) == null ? void 0 : _c[0].clientY) != null ? _d : e.pageY) - document.documentElement.scrollTop, percentageX = 100 / halfViewportWidth * (positionX - halfViewportWidth), percentageY = 100 / halfViewportHeight * (positionY - halfViewportHeight);
    return {
      x: percentageX,
      y: percentageY
    };
  }
}
function define(props = {}, name = "s-parallax") {
  import_s_feature.default.defineFeature(name, SParallaxFeature, props);
}
