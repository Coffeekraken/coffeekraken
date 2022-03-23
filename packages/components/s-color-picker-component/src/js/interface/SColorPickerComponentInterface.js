var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var SColorPickerComponentInterface_exports = {};
__export(SColorPickerComponentInterface_exports, {
  default: () => SColorPickerComponentInterface
});
module.exports = __toCommonJS(SColorPickerComponentInterface_exports);
var import_s_interface = __toESM(require("@coffeekraken/s-interface"), 1);
class SColorPickerComponentInterface extends import_s_interface.default {
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
