import {
  __spreadValues
} from "../../../../../chunk-PG3ZPS4G.mjs";
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
