import "../../../../../chunk-TD77TI6B.mjs";
import __SInterface from "@coffeekraken/s-interface";
class SSugarJsonSettingsInterface extends __SInterface {
  static get _definition() {
    return {
      packages: {
        description: "Specify an array of packages names in which to search for sugar.json file",
        type: "Array<String>"
      },
      includePackage: {
        description: "Specify if the current package has to be included in the search",
        type: "Boolean",
        default: true
      },
      includeModules: {
        description: 'Specify if the current package "node_modules" folder has to be included in the search',
        type: "Boolean",
        default: true
      },
      includeGlobal: {
        description: 'Specify if the global "node_modules" folder has to be included in the search',
        type: "Boolean",
        default: true
      },
      includeTop: {
        description: "Specify if the root package folder in case of a mono-repo has to be included in the search",
        type: "Boolean",
        default: true
      }
    };
  }
}
export {
  SSugarJsonSettingsInterface as default
};
