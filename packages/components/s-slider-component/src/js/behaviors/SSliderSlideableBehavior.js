var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
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
import __slideable from "@coffeekraken/sugar/js/dom/slide/slideable";
import __SSliderBehavior from "../SSliderBehavior";
import __css from "../../css/s-slider-slideable-behavior.css";
import __SSliderSlideableBehaviorInterface from "./interface/SSliderSlideableBehaviorInterface";
class SSliderSlideableBehavior extends __SSliderBehavior {
  static get properties() {
    return __SSliderBehavior.properties({}, __SSliderSlideableBehaviorInterface);
  }
  static get styles() {
    return __css;
  }
  constructor(settings) {
    super(__spreadValues(__spreadValues({}, __SSliderSlideableBehaviorInterface.defaults()), settings));
  }
  firstUpdated() {
    this._handleSlide();
    this.$slider.addEventListener("s-slider-goto", (e) => {
      this._$lastGoToSlide = e.detail.$slide;
    });
  }
  _handleSlide() {
    console.log("SSS", this.settings);
    __slideable(this.$slider.$slidesWrapper, {
      friction: this.settings.friction,
      direction: this.$slider.props.direction
    }).on("start", () => {
      this.$slider.stop();
    }).on("refocusStart", ($slide) => {
      this.$slider.setCurrentSlide($slide);
    });
  }
}
SSliderSlideableBehavior.interface = __SSliderSlideableBehaviorInterface;
SSliderSlideableBehavior.id = "slideable";
export {
  SSliderSlideableBehavior as default
};
