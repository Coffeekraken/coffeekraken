import "../../../../../chunk-PG3ZPS4G.mjs";
import __SInterface from "@coffeekraken/s-interface";
class SClipboardCopyComponentInterface extends __SInterface {
  static get _definition() {
    return {
      successTimeout: {
        description: 'Specify the duration for displaying the "success" icon',
        type: "Number",
        default: 1500
      },
      errorTimeout: {
        description: 'Specify the duration for displaying the "error" icon',
        type: "Number",
        default: 3e3
      }
    };
  }
}
export {
  SClipboardCopyComponentInterface as default
};
