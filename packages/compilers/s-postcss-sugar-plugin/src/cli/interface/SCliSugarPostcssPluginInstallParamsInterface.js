import __SInterface from "@coffeekraken/s-interface";
class SCliSugarPostcssPluginInstallParamsInterface extends __SInterface {
  static get _definition() {
    return {
      install: {
        description: "Specify if you want to install the postcss plugins automatcally",
        type: "Boolean",
        default: true
      }
    };
  }
}
export {
  SCliSugarPostcssPluginInstallParamsInterface as default
};
