import "../../../../../chunk-TD77TI6B.mjs";
import __SInterface from "@coffeekraken/s-interface";
import __SSugarConfig from "@coffeekraken/s-sugar-config";
class SFaviconBuilderBuildParamsInterface extends __SInterface {
  static get _definition() {
    return {
      input: {
        description: "Specify the input image file to use",
        type: "String",
        required: true,
        default: __SSugarConfig.get("faviconBuilder.input")
      },
      outDir: {
        description: "Specify the output directory ou want your icons in",
        type: "String",
        required: true,
        default: __SSugarConfig.get("faviconBuilder.outDir")
      },
      settings: {
        description: "Specify some settings to override and pass to the [favicons](https://www.npmjs.com/package/favicons) builder",
        type: "Object",
        default: __SSugarConfig.get("faviconBuilder.settings")
      }
    };
  }
}
export {
  SFaviconBuilderBuildParamsInterface as default
};
