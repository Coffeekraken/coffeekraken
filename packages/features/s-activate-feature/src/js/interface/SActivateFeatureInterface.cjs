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
var SActivateFeatureInterface_exports = {};
__export(SActivateFeatureInterface_exports, {
  default: () => SActivateFeatureInterface
});
module.exports = __toCommonJS(SActivateFeatureInterface_exports);
var import_s_interface = __toESM(require("@coffeekraken/s-interface"));
class SActivateFeatureInterface extends import_s_interface.default {
  static get _definition() {
    return {
      href: {
        description: "Specify the target element(s) to activate/unactivate",
        type: "String",
        default: ""
      },
      group: {
        description: "Specify a group id for your element. This is used for things like tabs, etc...",
        type: "String"
      },
      toggle: {
        description: "Specify if you want to be able to click on the same element to activate/unactivate it.",
        type: {
          type: "Boolean",
          nullishAsTrue: true
        },
        default: false
      },
      history: {
        description: "Specify if you want to store and react to history hash changes",
        type: {
          type: "Boolean",
          nullishAsTrue: true
        },
        default: false
      },
      active: {
        description: "Specify the initial state of your element",
        type: {
          type: "Boolean",
          nullishAsTrue: true
        },
        default: false,
        physical: true
      },
      activeClass: {
        description: 'Specify the class applied on target(s) when active. Default is "active"',
        type: "String",
        default: "active"
      },
      activeAttribute: {
        description: "Specify the attribute name applied on target(s) when active.",
        type: "String",
        default: "active"
      },
      saveState: {
        description: "Specify if you want to save state in localStorage to restore it on page reload, etc...",
        type: "Boolean",
        default: false
      },
      activateTimeout: {
        description: "Specify a timeout before actiavting the target(s)",
        type: "Number",
        default: 0
      },
      unactivateTimeout: {
        description: "Specify a timeout before unactivate the target(s)",
        type: "Number",
        default: 0
      },
      triggerer: {
        description: "Specify an element selector that will be used as the triggerer instead of this current element",
        type: "String"
      },
      trigger: {
        description: 'Specify what trigger an activate/unactivate action. Can be "click", "mouseover", "mouseout" and/or "anchor"',
        type: {
          type: "Array<String>",
          splitChars: [","]
        },
        values: [
          "click",
          "mouseover",
          "mouseenter",
          "mouseout",
          "mouseleave",
          "anchor"
        ],
        default: ["click"]
      },
      unactivateOn: {
        description: "Specify some event(s) catched on the body tag that will unactivate the target(s)",
        type: "Array<String>"
      }
    };
  }
}
