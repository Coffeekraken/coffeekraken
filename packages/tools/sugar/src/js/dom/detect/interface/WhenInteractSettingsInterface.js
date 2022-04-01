import { createRequire as topLevelCreateRequire } from 'module';
 const require = topLevelCreateRequire(import.meta.url);
import __SInterface from "@coffeekraken/s-interface";
class WhenInteractSettingsInterface extends __SInterface {
  static get _definition() {
    return {
      mouseover: {
        description: "Specify if the mouseover event has to be used",
        type: "Boolean",
        default: true
      },
      mouseout: {
        description: "Specify if the mouseout event has to be used",
        type: "Boolean",
        default: true
      },
      click: {
        description: "Specify if the click event has to be used",
        type: "Boolean",
        default: true
      },
      touchstart: {
        description: "Specify if the touchstart event has to be used",
        type: "Boolean",
        default: true
      },
      touchend: {
        description: "Specify if the touchend event has to be used",
        type: "Boolean",
        default: true
      },
      focus: {
        description: "Specify if the focus event has to be used",
        type: "Boolean",
        default: true
      }
    };
  }
}
export {
  WhenInteractSettingsInterface as default
};
