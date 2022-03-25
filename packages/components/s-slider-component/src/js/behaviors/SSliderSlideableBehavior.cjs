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
var SSliderSlideableBehavior_exports = {};
__export(SSliderSlideableBehavior_exports, {
  default: () => SSliderSlideableBehavior
});
module.exports = __toCommonJS(SSliderSlideableBehavior_exports);
var import_slideable = __toESM(require("@coffeekraken/sugar/js/dom/slide/slideable"));
var import_SSliderBehavior = __toESM(require("../SSliderBehavior"));
var import_s_slider_slideable_behavior = __toESM(require("../../css/s-slider-slideable-behavior.css"));
var import_SSliderSlideableBehaviorInterface = __toESM(require("./interface/SSliderSlideableBehaviorInterface"));
class SSliderSlideableBehavior extends import_SSliderBehavior.default {
  static get properties() {
    return import_SSliderBehavior.default.properties({}, import_SSliderSlideableBehaviorInterface.default);
  }
  static get styles() {
    return import_s_slider_slideable_behavior.default;
  }
  constructor(settings) {
    super(__spreadValues(__spreadValues({}, import_SSliderSlideableBehaviorInterface.default.defaults()), settings));
  }
  firstUpdated() {
    this._handleSlide();
    this.$slider.addEventListener("s-slider-goto", (e) => {
      this._$lastGoToSlide = e.detail.$slide;
    });
  }
  _handleSlide() {
    console.log("SSS", this.settings);
    (0, import_slideable.default)(this.$slider.$slidesWrapper, {
      friction: this.settings.friction,
      direction: this.$slider.props.direction
    }).on("start", () => {
      this.$slider.stop();
    }).on("refocusStart", ($slide) => {
      this.$slider.setCurrentSlide($slide);
    });
  }
}
SSliderSlideableBehavior.interface = import_SSliderSlideableBehaviorInterface.default;
SSliderSlideableBehavior.id = "slideable";
