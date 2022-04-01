import { createRequire as topLevelCreateRequire } from 'module';
 const require = topLevelCreateRequire(import.meta.url);
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
var SFiltrableInputComponentInterface_exports = {};
__export(SFiltrableInputComponentInterface_exports, {
  default: () => SFiltrableInputComponentInterface
});
module.exports = __toCommonJS(SFiltrableInputComponentInterface_exports);
var import_s_interface = __toESM(require("@coffeekraken/s-interface"));
class SFiltrableInputComponentInterface extends import_s_interface.default {
  static get _definition() {
    return {
      items: {
        description: 'Specify an array of items to use in your filtrable list. Can be a JSON string, a function that take an object with the "value" property and must return an array of items to use',
        type: "String|Function"
      },
      value: {
        description: "Specify the attribute in your items to use as a value. Can be also a function that will be called with an object containing the selected item and must return the string you want to use as value",
        type: "String",
        default: "value"
      },
      label: {
        description: "Specify the attribute in your items to use as a label. Can be also a function that will be called with an object containing the selected item and must return the string you want to use as label",
        type: "String|Function",
        default: "value"
      },
      emptyText: {
        description: 'Specify the text to use for the default "empty" (no result) state',
        type: "String",
        default: "No item to display"
      },
      searchValuePreprocess: {
        description: "Specify a function used to preprocess the value just before actually searching through the items",
        type: "Function"
      },
      loadingText: {
        description: 'Specify the text to use for the default "loading" state',
        type: "String",
        default: "Loading please wait..."
      },
      filterItems: {
        description: "Specify a function to use to filter the items. Must return the filtered list of items",
        type: "Function"
      },
      filtrable: {
        description: 'Specify all the properties of your "item" to use as source for the filtrable process',
        type: {
          type: "Array<String>",
          splitChars: [","]
        },
        default: []
      },
      templates: {
        description: 'Specify either an object with properties like "item", "empty" and "loading", or a function returning the good template depending on tne "type" argument property',
        type: "Object|Function"
      },
      closeTimeout: {
        description: "Specify the duration before closing the list when having selected an item",
        type: "Number",
        default: 100
      },
      interactive: {
        description: "Specify if your items in the list are interactive or not to let the user click and interact with them",
        type: "Boolean",
        default: false
      },
      closeOnSelect: {
        description: "Specify if you wantr to close the list when selecting an item",
        type: "Boolean",
        default: false
      },
      notSelectable: {
        description: "Specify if you want the items to be not selectable",
        type: "Boolean",
        default: false
      },
      maxItems: {
        description: "Specify the maximum number of items to display at first in the list",
        type: "Number",
        default: 25
      }
    };
  }
}
