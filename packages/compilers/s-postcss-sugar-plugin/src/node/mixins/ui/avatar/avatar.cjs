var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
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
var avatar_exports = {};
__export(avatar_exports, {
  default: () => avatar_default,
  interface: () => postcssSugarPluginUiAvatarInterface
});
module.exports = __toCommonJS(avatar_exports);
var import_s_interface = __toESM(require("@coffeekraken/s-interface"), 1);
class postcssSugarPluginUiAvatarInterface extends import_s_interface.default {
  static get _definition() {
    return {
      style: {
        type: "String",
        value: ["solid"],
        default: "solid"
      },
      shape: {
        type: "String",
        values: ["default", "square", "rounded"],
        default: "default"
      },
      scope: {
        type: {
          type: "Array<String>",
          splitChars: [",", " "]
        },
        values: ["bare", "lnf", "shape", "interactive"],
        default: ["bare", "lnf", "shape"]
      }
    };
  }
}
function avatar_default({
  params,
  atRule,
  replaceWith
}) {
  const finalParams = __spreadValues({
    shape: "square",
    style: "solid",
    scope: ["bare", "lnf", "shape"]
  }, params);
  const vars = [];
  if (finalParams.scope.indexOf("bare") !== -1) {
    vars.push(`
            position: relative;
            display: inline-block;
            overflow: hidden;
            width: sugar.scalable(1em);
            height: sugar.scalable(1em);
        `);
  }
  if (finalParams.scope.indexOf("lnf") !== -1) {
    switch (finalParams.style) {
      case "solid":
        vars.push(`
                    border-width: sugar.theme(ui.avatar.borderWidth);
                    border-color: sugar.color(current);
                    border-style: solid;
                    @sugar.depth(sugar.theme.value(ui.avatar.depth));
                `);
        break;
    }
  }
  if (finalParams.scope.indexOf("interactive") !== -1) {
    vars.push(`
            cursor: pointer;
        `);
    switch (finalParams.style) {
      case "solid":
        vars.push(`
                    &:hover {
                        @sugar.outline($where: element);
                    }
                `);
        break;
    }
  }
  if (finalParams.scope.indexOf("shape") !== -1) {
    switch (finalParams.shape) {
      case "square":
        vars.push(`
                    border-radius: 0;
                `);
        break;
      case "rounded":
        vars.push(`
                    border-radius: sugar.theme(ui.avatar.borderRadius);
                    `);
        break;
      case "default":
      default:
        vars.push(`
                    border-radius: 0.5em;
                `);
        break;
    }
  }
  return vars;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  interface
});
