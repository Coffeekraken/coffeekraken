import __SInterface from "@coffeekraken/s-interface";
class SFrontstackActionInterface extends __SInterface {
  static get _definition() {
    return {
      action: {
        description: "Specify the action you want to launch",
        type: "String",
        requried: true
      },
      params: {
        description: 'Specify the action parameters using the cli "--param value" syntax',
        type: "String",
        alias: "p"
      }
    };
  }
}
var SFrontstackActionInterface_default = SFrontstackActionInterface;
export {
  SFrontstackActionInterface_default as default
};
