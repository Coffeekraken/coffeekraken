import "../../../../../chunk-PG3ZPS4G.mjs";
import __SInterface from "@coffeekraken/s-interface";
class SColorPickerComponentInterface extends __SInterface {
  static get _definition() {
    return {
      name: {
        description: "Specify the name that will be assigned to the injected input if you don't provide one yourself",
        type: "String",
        default: "color"
      },
      value: {
        description: "Specify the initial value for your picker",
        type: "String"
      },
      placeholder: {
        description: "Specify the placeholder that will be assigned to the injected input if you don't provide one yourself",
        type: "String",
        default: "Select a color"
      },
      theme: {
        description: "Specify the theme you want to use for this picker",
        type: "String",
        values: ["nano", "monolith"],
        default: "nano"
      },
      input: {
        description: "Specify if you dont want an automatically injected text input when you dont provide yours",
        type: "Boolean",
        default: false
      },
      button: {
        description: "Specify if you want to display the button or not",
        type: "Boolean",
        default: false,
        physical: true
      },
      position: {
        description: 'Specify the position of the picker. Can be "top" or "bottom"',
        type: "String",
        values: ["top", "bottom"],
        default: "bottom"
      },
      swatches: {
        description: "Specify some colors you want in your swatches",
        type: "Array<String>",
        default: []
      },
      disabled: {
        description: "Specify if the color picker is disabled",
        type: "Boolean",
        default: false
      }
    };
  }
}
export {
  SColorPickerComponentInterface as default
};
