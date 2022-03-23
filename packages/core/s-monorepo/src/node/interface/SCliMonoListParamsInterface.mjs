import "../../../../../chunk-TD77TI6B.mjs";
import __SInterface from "@coffeekraken/s-interface";
import __SSugarConfig from "@coffeekraken/s-sugar-config";
class SCliMonoListParamsInterface extends __SInterface {
  static get _definition() {
    return {
      packagesGlobs: {
        description: "Specify some globs to search for packages relative to the monorepo root directory",
        type: "Array<String>",
        default: __SSugarConfig.get("monorepo.packagesGlobs")
      }
    };
  }
}
export {
  SCliMonoListParamsInterface as default
};
