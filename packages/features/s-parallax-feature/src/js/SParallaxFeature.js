import { createRequire as topLevelCreateRequire } from 'module';
 const require = topLevelCreateRequire(import.meta.url);
import __SFeature from "@coffeekraken/s-feature";
import __deepMerge from "@coffeekraken/sugar/shared/object/deepMerge";
import __SParallaxFeatureInterface from "./interface/SParallaxFeatureInterface";
import * as __rematrix from "rematrix";
class SParallaxFeature extends __SFeature {
  constructor(name, node, settings) {
    super(name, node, __deepMerge({
      componentUtils: {
        interface: __SParallaxFeatureInterface
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
  __SFeature.defineFeature(name, SParallaxFeature, props);
}
export {
  SParallaxFeature as default,
  define
};
