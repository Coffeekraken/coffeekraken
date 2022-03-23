import "../../../../../chunk-JETN4ZEY.mjs";
import __SInterface from "@coffeekraken/s-interface";
class SBenchSettingsInterface extends __SInterface {
  static get _definition() {
    return {
      title: {
        description: "Specify a title for your bench that will be used in the log",
        type: "String"
      },
      body: {
        description: "Specify a body for your bench that will be used in the log",
        type: "String"
      }
    };
  }
}
export {
  SBenchSettingsInterface as default
};
