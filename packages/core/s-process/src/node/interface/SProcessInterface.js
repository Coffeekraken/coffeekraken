import __SInterface from "@coffeekraken/s-interface";
class SProcessInterface extends __SInterface {
  static get _definition() {
    return {
      help: {
        description: "Specify if you want to see the help of the process",
        type: "Boolean",
        alias: "h",
        default: false
      }
    };
  }
}
export {
  SProcessInterface as default
};
