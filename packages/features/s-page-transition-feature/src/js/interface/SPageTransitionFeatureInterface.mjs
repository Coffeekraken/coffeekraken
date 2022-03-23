import "../../../../../chunk-PG3ZPS4G.mjs";
import __SInterface from "@coffeekraken/s-interface";
class SPageTransitionFeatureInterface extends __SInterface {
  static get _definition() {
    return {
      patchBody: {
        description: "Specify if you want to patch the body tag with the new page body tag",
        type: "Boolean",
        default: true
      },
      scrollTop: {
        description: "Specify if you want to scroll to the top of the updated element after a transition",
        type: "Boolean",
        default: true
      },
      before: {
        description: "Specify a function to run before the transition",
        type: "Function"
      },
      after: {
        description: "Specify a function to run after the transition",
        type: "Function"
      }
    };
  }
}
export {
  SPageTransitionFeatureInterface as default
};
