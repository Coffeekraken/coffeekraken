import "../../../../../chunk-PG3ZPS4G.mjs";
import __SInterface from "@coffeekraken/s-interface";
class SRefocusFeatureInterface extends __SInterface {
  static get _definition() {
    return {
      trigger: {
        description: "Specify some trigger(s) on which to refocus a particular element like `event:actual`, `anchor`, `history`, etc...",
        type: {
          type: "Array<String>",
          splitChars: [","]
        },
        values: ["event:eventName", "anchor", "history"],
        default: []
      },
      scrollToSettings: {
        description: "Specify some `scrollTo` settings to override the default ones",
        type: "IScrollToSettings",
        default: {}
      },
      timeout: {
        description: "Specify a timeout to wait before refocus the element",
        type: "Number",
        default: 500
      }
    };
  }
}
export {
  SRefocusFeatureInterface as default
};
