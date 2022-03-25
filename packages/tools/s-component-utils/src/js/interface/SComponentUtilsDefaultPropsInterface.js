import __SInterface from "@coffeekraken/s-interface";
import { triggers } from "@coffeekraken/sugar/js/dom/detect/when";
class SComponentUtilsDefaultPropsInterface extends __SInterface {
  static get _definition() {
    return {
      id: {
        description: "Specify an id for your component",
        type: "String",
        physical: true
      },
      mounted: {
        description: "Specify if your component is mounted or not",
        type: "Boolean",
        default: false,
        physical: true
      },
      mountWhen: {
        description: "Specify when your component will be mounted",
        type: "String",
        values: triggers,
        default: "direct"
      },
      adoptStyle: {
        description: "Specify if your component adopt the style of the global DOM. This worts only if you are using a shadowRoot element",
        type: "Boolean",
        default: true,
        physical: true
      },
      lnf: {
        description: "Specify the lnf (look-and-feel) of your component. This is used by the css to style your component",
        type: "String",
        default: "default",
        physical: true
      }
    };
  }
}
export {
  SComponentUtilsDefaultPropsInterface as default
};
