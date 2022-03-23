import "../../../../../chunk-PG3ZPS4G.mjs";
import __SInterface from "@coffeekraken/s-interface";
class SConductorSettingsInterface extends __SInterface {
  static get _definition() {
    return {
      idleTimeout: {
        description: "Specify after how many milliseconds of inactity the SConductor has to be considered as idle ",
        type: "Number",
        default: 500
      },
      logTimeout: {
        description: "Specify after how many milliseconds of inactity the SConductor has to log the small analysis",
        type: "Number",
        default: 2e3
      },
      log: {
        description: "Specify if you want to log the small analysis when the SConductor is idle",
        type: "Boolean",
        default: false
      }
    };
  }
}
export {
  SConductorSettingsInterface as default
};
