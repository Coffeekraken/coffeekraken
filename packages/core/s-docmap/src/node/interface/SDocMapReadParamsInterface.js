import __SSugarConfig from "@coffeekraken/s-sugar-config";
import __SInterface from "@coffeekraken/s-interface";
class SDocMapReadParamsInterface extends __SInterface {
  static get _definition() {
    return {
      input: {
        description: "Specify the input path to the docmap.json file to read",
        type: "String",
        default: __SSugarConfig.get("docmap.read.input"),
        alias: "i"
      }
    };
  }
}
var SDocMapReadParamsInterface_default = SDocMapReadParamsInterface;
export {
  SDocMapReadParamsInterface_default as default
};
