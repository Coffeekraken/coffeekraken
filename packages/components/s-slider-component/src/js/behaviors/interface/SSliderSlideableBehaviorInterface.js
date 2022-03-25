import __SInterface from "@coffeekraken/s-interface";
class SSliderSlideableBehaviorInterface extends __SInterface {
  static get _definition() {
    return {
      friction: {
        description: "Specify the friction to apply when you release the pointer. 1 mean full friction, 0 mean no friction",
        type: "Number",
        default: 0.5
      }
    };
  }
}
export {
  SSliderSlideableBehaviorInterface as default
};
