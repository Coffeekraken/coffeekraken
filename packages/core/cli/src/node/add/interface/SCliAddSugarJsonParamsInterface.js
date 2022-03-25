import __SInterface from "@coffeekraken/s-interface";
class SCliAddSugarJsonParamsInterface extends __SInterface {
  static get _definition() {
    return {
      recipe: {
        description: "Specify the recipe to use",
        type: "String",
        required: true
      }
    };
  }
}
export {
  SCliAddSugarJsonParamsInterface as default
};
