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
var SSliderComponentInterface_exports = {};
__export(SSliderComponentInterface_exports, {
  default: () => SSliderComponentInterface
});
module.exports = __toCommonJS(SSliderComponentInterface_exports);
var import_s_interface = __toESM(require("@coffeekraken/s-interface"));
var import_easeOutQuad = __toESM(require("@coffeekraken/sugar/shared/easing/easeOutQuad"));
class SSliderComponentInterface extends import_s_interface.default {
  static get _definition() {
    return {
      direction: {
        description: "Specify the slider direction. Can be `horizontal` or `vertical`",
        values: ["horizontal", "vertical"],
        type: "String",
        physical: true,
        default: "horizontal"
      },
      availableBehaviors: {
        description: "Specify the available behaviors for the slider",
        type: "Array<Object>"
      },
      behavior: {
        description: 'Specify which behavior your want to use for your slider. Behavior are like "presets" with different animations, etc...',
        type: "String"
      },
      nextIconClass: {
        description: "Specify the class of the next icon",
        type: "String"
      },
      previousIconClass: {
        description: "Specify the class of the previous icon",
        type: "String"
      },
      controls: {
        description: "Specify if you want to display the controls or not. Controls are the previous and next icons",
        type: "Boolean",
        default: false
      },
      nav: {
        description: "Specify if you want to display the nav or not. Nav are the dots",
        type: "Boolean",
        default: false
      },
      swipe: {
        description: "Specify if you want your slider to support swipe navigation or not",
        type: "Boolean",
        default: false
      },
      mousewheel: {
        description: "Specify if you want to enable the mousewheel event on the slider or not",
        type: "Boolean",
        default: false
      },
      clickOnSlide: {
        description: "Specify if you want to enable the click on the slides to navigate or not",
        type: "Boolean",
        default: true
      },
      loop: {
        description: "Specify if you want to enable the loop behavior or not",
        type: "Boolean",
        default: false
      },
      progress: {
        description: "Specify if you want to display the progress bar or not",
        type: "Boolean",
        default: false
      },
      timer: {
        description: 'Specify a timer that will be applied on each slides and go to the next one after the timer is over. For custom timer by slide, specify the `timer="1200"` attribute on the slides you want',
        type: "Number"
      },
      autoplay: {
        description: "Specify if you want the slider to auto play itself when some timer(s) has been set",
        type: "Boolean",
        default: true
      },
      intersectionClasses: {
        description: 'Specify if you want the classes that describe each slide intersection classes like "in-10", "in-20", etc...',
        type: "Boolean",
        default: false
      },
      transitionDuration: {
        description: "Specify the transition duration of the slider in ms",
        type: "Number",
        default: 500
      },
      transitionEasing: {
        description: "Specify the transition easing of the slider",
        type: "Function",
        default: import_easeOutQuad.default
      },
      transitionHandler: {
        description: "Specify a function that will take care of transitioning the slider from the current item to the next/previous",
        type: "Function"
      }
    };
  }
}
