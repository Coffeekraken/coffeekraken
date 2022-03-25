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
var classes_exports = {};
__export(classes_exports, {
  default: () => classes_default,
  dependencies: () => dependencies,
  interface: () => postcssSugarPluginUiBadgeClassesInterface
});
module.exports = __toCommonJS(classes_exports);
var import_s_interface = __toESM(require("@coffeekraken/s-interface"), 1);
var import_s_theme = __toESM(require("@coffeekraken/s-theme"), 1);
var import_dirname = __toESM(require("@coffeekraken/sugar/node/fs/dirname"), 1);
class postcssSugarPluginUiBadgeClassesInterface extends import_s_interface.default {
  static get _definition() {
    var _a;
    return {
      styles: {
        type: "String[]",
        values: ["solid", "outline"],
        default: ["solid", "outline"]
      },
      shapes: {
        type: "String[]",
        values: ["default", "square", "pill"],
        default: ["default", "square", "pill"]
      },
      defaultStyle: {
        type: "String",
        values: ["solid", "outline"],
        default: (_a = import_s_theme.default.config("ui.badge.defaultStyle")) != null ? _a : "solid"
      },
      defaultShape: {
        type: "String",
        values: ["default", "square", "pill"],
        default: import_s_theme.default.config("ui.badge.defaultShape")
      },
      scope: {
        type: {
          type: "Array<String>",
          splitChars: [",", " "]
        },
        values: ["bare", "lnf", "shape", "vr", "tf"],
        default: ["bare", "lnf", "shape", "vr", "tf"]
      }
    };
  }
}
function dependencies() {
  return {
    files: [`${(0, import_dirname.default)()}/badge.js`]
  };
}
function classes_default({
  params,
  atRule,
  CssVars,
  replaceWith
}) {
  const finalParams = __spreadValues({
    styles: [],
    shapes: [],
    defaultStyle: "solid",
    defaultShape: "default",
    scope: []
  }, params);
  const vars = new CssVars();
  vars.comment(() => `
      /**
        * @name          Badges
        * @namespace          sugar.css.ui
        * @type               Styleguide
        * @menu           Styleguide / UI        /styleguide/ui/badges
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to display any HTMLElement as a badge
        * 
        ${finalParams.styles.map((style) => {
    return ` * @cssClass     s-badge${style === finalParams.defaultStyle ? "" : `:${style}`}           Apply the ${style} badge style`;
  }).join("\n")}
        ${finalParams.shapes.map((shape) => {
    return ` * @cssClass     s-badge${shape === finalParams.defaultShape ? "" : `:${shape}`}           Apply the ${shape} badge shape`;
  }).join("\n")}
        * 
        * @cssClass         s-badge:square       Display your badge with squared corners
        * @cssClass         s-badge:pill         Display your badge with rounded corners
        * 
        ${finalParams.styles.map((style) => {
    return ` * @example        html       ${style}
            *   <a class="s-badge${finalParams.defaultStyle === style ? "" : `:${style}`} s-mie:20">Say hello!</a>
            *   <a class="s-badge${finalParams.defaultStyle === style ? "" : `:${style}`} s-mie:20 s-color:accent">Say hello!</a>
            *   <a class="s-badge${finalParams.defaultStyle === style ? "" : `:${style}`} s-mie:20 s-color:complementary">Say hello!</a>
            *   <a class="s-badge${finalParams.defaultStyle === style ? "" : `:${style}`} s-color:error">Say hello!</a>
            * `;
  }).join("\n")}
        *
        ${finalParams.shapes.map((shape) => {
    return ` * @example        html       ${shape}
            *   <a class="s-badge${finalParams.defaultShape === shape ? "" : `:${shape}`} s-mie:20">Say hello!</a>
            *   <a class="s-badge${finalParams.defaultShape === shape ? "" : `:${shape}`} s-mie:20 s-color:accent">Say hello!</a>
            *   <a class="s-badge${finalParams.defaultShape === shape ? "" : `:${shape}`} s-mie:20 s-color:complementary">Say hello!</a>
            *   <a class="s-badge${finalParams.defaultShape === shape ? "" : `:${shape}`} s-color:error">Say hello!</a>
            * `;
  }).join("\n")}
        * 
        * @example        html       Scales
        *   <a class="s-badge s-scale:05 s-mie:20 s-mbe:20">Say hello!</a>
        *   <a class="s-badge s-scale:1 s-mie:20 s-mbe:20">Say hello!</a>
        *   <a class="s-badge s-scale:12 s-mie:20 s-mbe:20">Say hello!</a>
        *   <a class="s-badge s-scale:15 s-mie:20 s-mbe:20">Say hello!</a>
        *   <a class="s-badge s-scale:20 s-mbe:20">Say hello!</a>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
  if (finalParams.scope.includes("bare")) {
    vars.comment(() => `/**
            * @name           s-badge
            * @namespace      sugar.css.ui.badge
            * @type           CssClass
            * 
            * This class represent a(n) "<s-color="accent">bare</s-color>" badge
            * 
            * @example        html
            * <a class="s-badge">I'm a cool badge</a>
            * 
            * @since    2.0.0
            * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */`).code(`
            .s-badge {
                @sugar.ui.badge($scope: bare);
            }
        `);
  }
  if (finalParams.scope.includes("lnf")) {
    finalParams.styles.forEach((style) => {
      vars.comment(() => `/**
            * @name           s-badge${finalParams.defaultStyle === style ? "" : `:${style}`}
            * @namespace      sugar.css.ui.badge
            * @type           CssClass
            * 
            * This class represent a(n) "<s-color="accent">outline</s-color>" badge
            * 
            * @example        html
            * <a class="s-badge${finalParams.defaultStyle === style ? "" : `:${style}`}">I'm a cool ${style} badge</a>
            * 
            * @since    2.0.0
            * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */`).code(`
            .s-badge${style === finalParams.defaultStyle ? "" : `--${style}`} {
                @sugar.ui.badge($style: ${style}, $scope: lnf);
            }
        `);
    });
  }
  if (finalParams.scope.includes("shape")) {
    finalParams.shapes.forEach((shape) => {
      vars.comment(() => `/**
        * @name           s-badge${finalParams.defaultShape === shape ? "" : `:${shape}`}
        * @namespace      sugar.css.ui.badge
        * @type           CssClass
        * 
        * This class represent a(n) "<s-color="accent">outline</s-color>" badge
        * 
        * @example        html
        * <a class="s-badge${finalParams.defaultShape === shape ? "" : `:${shape}`}">I'm a cool ${shape} badge</a>
        * 
        * @since    2.0.0
        * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
      */`).code(`
        .s-badge${shape === finalParams.defaultShape ? "" : `--${shape}`} {
            @sugar.ui.badge($shape: ${shape}, $scope: shape);
        }
    `);
    });
  }
  return vars;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  dependencies,
  interface
});
