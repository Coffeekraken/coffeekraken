import "../../../../../../chunk-TD77TI6B.mjs";
import __SInterface from "@coffeekraken/s-interface";
class SFrontstackCopyActionParamsInterface extends __SInterface {
  static get _definition() {
    return {
      src: {
        description: "Specify what to copy",
        type: "String",
        required: true
      },
      dest: {
        description: "Specify where to paste",
        type: "String",
        required: true
      },
      chdir: {
        description: "Specify if need to change the cwd to the pasted folder location",
        type: "Boolean",
        default: false
      }
    };
  }
}
var SFrontstackCopyActionParamsInterface_default = SFrontstackCopyActionParamsInterface;
export {
  SFrontstackCopyActionParamsInterface_default as default
};
