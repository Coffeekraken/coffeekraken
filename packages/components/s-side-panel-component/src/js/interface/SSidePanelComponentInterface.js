import { createRequire as topLevelCreateRequire } from 'module';
 const require = topLevelCreateRequire(import.meta.url);
import __SInterface from "@coffeekraken/s-interface";
class SSidePanelComponentInterface extends __SInterface {
  static get _definition() {
    return {
      side: {
        description: 'Specify the side where to display the panel. Can be "top","left","bottom" or "right"',
        type: "String",
        values: ["top", "left", "bottom", "right"],
        default: "left"
      },
      active: {
        description: "Specify the panel initial state",
        type: "Boolean",
        default: false
      },
      overlay: {
        description: 'Specify if you want an "overlay" between the panel and your content',
        type: "Boolean",
        default: false
      },
      triggerer: {
        description: "Specify a css selector that targets the elements in your UI you want to open the panel on click",
        type: "String"
      },
      closeOn: {
        description: 'Specify which "action(s)" close the panel. Valid values are "click" or/and "escape"',
        type: {
          type: "Array<String>",
          splitChars: [","]
        },
        values: ["click", "escape"],
        default: ["click", "escape"]
      }
    };
  }
}
export {
  SSidePanelComponentInterface as default
};
