import "../../../../../chunk-PG3ZPS4G.mjs";
import __SInterface from "@coffeekraken/s-interface";
class SComponentUtilsSettingsInterface extends __SInterface {
  static get _definition() {
    return {
      interface: {
        description: "Specify an SInterface class to use as our properties definition",
        type: "SInterface"
      },
      style: {
        description: "Specify a style string to use as style to inject for our component",
        type: "String"
      },
      defaultProps: {
        description: "Pass an object that act as the default properties value for our component",
        type: "Object"
      }
    };
  }
}
export {
  SComponentUtilsSettingsInterface as default
};
