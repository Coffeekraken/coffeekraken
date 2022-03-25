import __SInterface from "@coffeekraken/s-interface";
class SFrontspecReadParamsInterface extends __SInterface {
  static get _definition() {
    return {
      env: {
        description: "Specify the environment for which to read the frontspec for",
        type: "String",
        default: void 0
      }
    };
  }
}
var SFrontspecReadParamsInterface_default = SFrontspecReadParamsInterface;
export {
  SFrontspecReadParamsInterface_default as default
};
