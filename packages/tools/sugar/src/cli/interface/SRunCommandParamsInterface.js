import __SInterface from "@coffeekraken/s-interface";
class SRunCommandParamsInterface extends __SInterface {
  static get _definition() {
    return {
      command: {
        type: "String",
        description: "Specify the command you want to execute",
        alias: "c"
      },
      directory: {
        type: "String",
        description: "Specify where you want to execute this command. Can be a glob to execute command into multiple directories at once",
        alias: "d"
      },
      verbose: {
        type: "Boolean",
        description: "Specify if you want each process to log or not",
        default: false,
        alias: "v"
      }
    };
  }
}
export {
  SRunCommandParamsInterface as default
};
