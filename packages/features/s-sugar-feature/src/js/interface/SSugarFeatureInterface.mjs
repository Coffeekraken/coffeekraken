import "../../../../../chunk-PG3ZPS4G.mjs";
import __SInterface from "@coffeekraken/s-interface";
class SSugarFeatureInterface extends __SInterface {
  static get _definition() {
    return {
      scrolled: {
        description: "Specify if you want the `scrolled` class to be applied on the `body` element when the page has been scrolled",
        type: "Boolean",
        default: true
      },
      scrolledDelta: {
        description: "Specify after how many scroll the scrolled class will be applied",
        type: "Number",
        default: 10
      },
      vhvar: {
        description: "Specify if you want the `--vh` css variable to be computed and available",
        type: "Boolean",
        default: true
      },
      inputAdditionalAttributes: {
        description: 'Specify if you want to have the additional attributes on inputs like "has-value", "empty" and "dirty" or not',
        type: "Boolean",
        default: true
      },
      resizeTransmations: {
        description: "Specify if you want all the transitions and animations cleared during window resize",
        type: "Boolean",
        default: true
      },
      linksStateAttributes: {
        description: 'Specify if you want to have the state attributes on links like "actual" and "actual-child" or not',
        type: "Boolean",
        default: true
      },
      preventScrollRestoration: {
        description: "Specify if you want to prevent the scroll restoration behavior on chrome that can usually be anoying",
        type: "Boolean",
        default: true
      }
    };
  }
}
export {
  SSugarFeatureInterface as default
};
