import "../../../../../chunk-TD77TI6B.mjs";
import __SInterface from "@coffeekraken/s-interface";
class SFrontstackRecipeParamsInterface extends __SInterface {
  static get _definition() {
    return {
      stack: {
        description: 'Specify the stack you want to execute like "dev", "build", etc...',
        type: "String",
        alias: "s"
      },
      recipe: {
        description: "Specify the recipe you want to execute the stack from",
        type: "String",
        alias: "r"
      },
      runInParallel: {
        description: "Specify if you want the recipe actions to run in parallel of not",
        type: "Boolean",
        alias: "p"
      },
      env: {
        description: "Specify the environment in which to execute your recipe",
        type: "String"
      }
    };
  }
}
var SFrontstackRecipeParamsInterface_default = SFrontstackRecipeParamsInterface;
export {
  SFrontstackRecipeParamsInterface_default as default
};
