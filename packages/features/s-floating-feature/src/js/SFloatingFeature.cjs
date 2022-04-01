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
var SFloatingFeature_exports = {};
__export(SFloatingFeature_exports, {
  default: () => SFloatingFeature,
  define: () => define
});
module.exports = __toCommonJS(SFloatingFeature_exports);
var import_s_feature = __toESM(require("@coffeekraken/s-feature"));
var import_deepMerge = __toESM(require("@coffeekraken/sugar/shared/object/deepMerge"));
var import_SFloatingFeatureInterface = __toESM(require("./interface/SFloatingFeatureInterface"));
var import_dom = require("@floating-ui/dom");
var import_s_floating_feature = __toESM(require("../../../../src/css/s-floating-feature.css"));
class SFloatingFeature extends import_s_feature.default {
  constructor(name, node, settings) {
    super(name, node, (0, import_deepMerge.default)({
      componentUtils: {
        interface: import_SFloatingFeatureInterface.default,
        style: import_s_floating_feature.default
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
    const middlewares = [
      (0, import_dom.offset)(this.props.offset),
      (0, import_dom.shift)({
        padding: this.props.shift
      }),
      (0, import_dom.inline)()
    ];
    if (this.props.placement !== "auto") {
      middlewares.push((0, import_dom.flip)());
    } else {
      middlewares.push((0, import_dom.autoPlacement)());
    }
    let $arrow;
    if (this.props.arrow) {
      $arrow = document.createElement("div");
      $arrow.classList.add("s-floating__arrow");
      this.node.append($arrow);
      middlewares.push((0, import_dom.arrow)({
        element: $arrow,
        padding: this.props.arrowPadding
      }));
    }
    if (this.props.arrowSize) {
      this.node.style.setProperty(`--arrow-size`, `${this.props.arrowSize}px`);
    }
    const update = async () => {
      const { x, y, placement, middlewareData } = await (0, import_dom.computePosition)(this._$ref, this.node, {
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
      ...(0, import_dom.getScrollParents)(this._$ref),
      ...(0, import_dom.getScrollParents)(this.node)
    ].forEach((el) => {
      el.addEventListener("scroll", update);
      el.addEventListener("resize", update);
    });
  }
}
function define(props = {}, name = "s-floating") {
  import_s_feature.default.defineFeature(name, SFloatingFeature, props);
}
