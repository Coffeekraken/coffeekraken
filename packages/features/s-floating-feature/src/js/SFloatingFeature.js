import __SFeature from "@coffeekraken/s-feature";
import __deepMerge from "@coffeekraken/sugar/shared/object/deepMerge";
import __css from "../css/s-floating-feature.css";
import __SFloatingFeatureInterface from "./interface/SFloatingFeatureInterface";
import { computePosition, flip, shift, offset, arrow, getScrollParents, autoPlacement, inline } from "@floating-ui/dom";
class SFloatingFeature extends __SFeature {
  constructor(name, node, settings) {
    super(name, node, __deepMerge({
      componentUtils: {
        interface: __SFloatingFeatureInterface,
        style: __css
      }
    }, settings != null ? settings : {}));
    this.node.classList.add("s-floating");
    if (!this.props.ref) {
      this._$ref = this.node.previousElementSibling;
    } else {
      this._$ref = document.querySelector(this.props.ref);
    }
  }
  mount() {
    if (this.props.offset === void 0 && this.props.arrow) {
      this.props.offset = this.props.arrowSize;
    }
    const middlewares = [offset(this.props.offset), shift({
      padding: this.props.shift
    }), inline()];
    if (this.props.placement !== "auto") {
      middlewares.push(flip());
    } else {
      middlewares.push(autoPlacement());
    }
    let $arrow;
    if (this.props.arrow) {
      $arrow = document.createElement("div");
      $arrow.classList.add("s-floating__arrow");
      this.node.append($arrow);
      middlewares.push(arrow({
        element: $arrow,
        padding: this.props.arrowPadding
      }));
    }
    if (this.props.arrowSize) {
      this.node.style.setProperty(`--arrow-size`, `${this.props.arrowSize}px`);
    }
    const update = async () => {
      const { x, y, placement, middlewareData } = await computePosition(this._$ref, this.node, {
        placement: this.props.placement,
        middleware: middlewares
      });
      Object.assign(this.node.style, {
        left: `${x}px`,
        top: `${y}px`
      });
      if ($arrow) {
        const { x: arrowX, y: arrowY } = middlewareData.arrow;
        const staticSide = {
          top: "bottom",
          right: "left",
          bottom: "top",
          left: "right"
        }[placement.split("-")[0]];
        Object.assign($arrow.style, {
          left: arrowX != null ? `${arrowX}px` : "",
          top: arrowY != null ? `${arrowY}px` : "",
          right: "",
          bottom: "",
          [staticSide]: `${this.props.arrowSize * 0.5 * -1}px`
        });
      }
    };
    update();
    [
      ...getScrollParents(this._$ref),
      ...getScrollParents(this.node)
    ].forEach((el) => {
      el.addEventListener("scroll", update);
      el.addEventListener("resize", update);
    });
  }
}
function define(props = {}, name = "s-floating") {
  __SFeature.defineFeature(name, SFloatingFeature, props);
}
export {
  SFloatingFeature as default,
  define
};
