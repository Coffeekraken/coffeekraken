import __SInterface from "@coffeekraken/s-interface";
class SSugarCliProcessKillParamsInterface extends __SInterface {
  static get _definition() {
    return {
      id: {
        description: "Specify the process id you want to kill",
        type: "Number",
        alias: "i"
      },
      port: {
        description: "Specify the port on which the process you want to kill is binded",
        type: "Number",
        alias: "p"
      }
    };
  }
}
export {
  SSugarCliProcessKillParamsInterface as default
};
