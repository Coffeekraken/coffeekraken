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
  interface: () => postcssSugarPluginUiLabelClassesInterface
});
module.exports = __toCommonJS(classes_exports);
var import_s_interface = __toESM(require("@coffeekraken/s-interface"), 1);
var import_s_theme = __toESM(require("@coffeekraken/s-theme"), 1);
var import_faker = __toESM(require("faker"), 1);
var import_dirname = __toESM(require("@coffeekraken/sugar/node/fs/dirname"), 1);
class postcssSugarPluginUiLabelClassesInterface extends import_s_interface.default {
  static get _definition() {
    return {
      styles: {
        type: "String[]",
        values: ["inline", "block", "float"],
        default: ["inline", "block", "float"]
      },
      defaultStyle: {
        type: "String",
        values: ["inline", "block", "float"],
        default: import_s_theme.default.config("ui.label.defaultStyle")
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
    files: [`${(0, import_dirname.default)()}/label.js`]
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
    defaultStyle: "inline",
    scope: []
  }, params);
  const vars = new CssVars();
  vars.comment(() => `
      /**
        * @name          Labels
        * @namespace          sugar.css.ui
        * @type               Styleguide
        * @menu           Styleguide / Forms        /styleguide/forms/labels
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to structure forms using labels.
        * 
        ${finalParams.styles.map((style) => {
    return ` * @cssClass     s-label${style === finalParams.defaultStyle ? "" : `:${style}`}           Apply the ${style} label style`;
  }).join("\n")}
        * @cssClass         s-label:inline          Make sure the input and label stay inline even on mobile. Usefull for checkbox and radio for example.
        * 
        ${finalParams.styles.map((style) => {
    return ` * @example        html       ${style} style
            *   <label class="s-mbe:30 s-label${style === finalParams.defaultStyle ? "" : `:${style}`}">
            *     <input type="text" class="s-input s-width:40" placeholder="Type something!" />
            *     <span>${import_faker.default.name.title()} ${import_faker.default.name.findName()}</span>
            *   </label>
            *   <label class="s-mbe:30 s-label${style === finalParams.defaultStyle ? "" : `:${style}`}">
            *     <textarea class="s-input s-width:40" placeholder="Type something!" rows="3"></textarea>
            *     <span>${import_faker.default.name.title()} ${import_faker.default.name.findName()}</span>
            *   </label>
        *   <label class="s-mbe:30 s-label${style === finalParams.defaultStyle ? "" : `:${style}`}">
    *     <input type="text" disabled class="s-input s-width:40" placeholder="Type something!" />
    *     <span>I'm disabled</span>
    *   </label>
    *   <label dir="rtl" class="s-mbe:30 s-label${style === finalParams.defaultStyle ? "" : `:${style}`}">
    *     <input type="text" class="s-input s-width:40" placeholder="Type something!" />
    *     <span>Support RTL</span>
    *   </label>
    *   <label class="s-mbe:30 s-label${style === finalParams.defaultStyle ? "" : `:${style}`} s-color:accent">
    *     <input type="text" class="s-input s-width:40" placeholder="Type something!" />
    *     <span>With the accent color</span>
    *   </label>
            * `;
  }).join("\n")}
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
  finalParams.styles.forEach((style) => {
    let cls = `s-label`;
    if (style !== finalParams.defaultStyle) {
      cls += `:${style}`;
    }
    vars.comment(() => `/**
                * @name           ${cls}
                * @namespace      sugar.css.ui.label
                * @type           CssClass
                * 
                * This class represent a(n) "<s-color="accent">${style}</s-color>" label
                * 
                * @example        html
                * <label class="${cls.replace(":", ":")}">
                *   Hello world
                *   <input type="text" class="s-input" placeholder="Type something!" />
                * </label>
                * 
                * @since    2.0.0
                * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
            */
        `);
    if (finalParams.scope.includes("bare")) {
      vars.code(`.s-label${finalParams.defaultStyle === style ? "" : `--${style}`} {
                @sugar.ui.label($style: ${style}, $scope: bare);
            } 
            `);
    }
    if (finalParams.scope.includes("lnf")) {
      vars.code(() => `
                .${cls.replace(":", "--")} {
                    @sugar.ui.label($style: ${style}, $scope: lnf);
                } 
            `);
    }
  });
  vars.comment(() => `/**
        * @name           s-label:responsive
        * @namespace      sugar.css.ui.input
        * @type           CssClass
        * 
        * This class represent a(n) "<yellow>responsive</yellow>" label.
        * This mean that on desktop and tablet it will be "inline", and on mobile it will be "block".
        * 
        * @example        html
        * <label class="s-label:responsive">
        *   Hello world
        *   <input type="text" class="s-input" placeholder="Hello world" />
        * </label>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
      */
     `).code(`
        .s-label--responsive {
            @sugar.media(mobile) {
                @sugar.ui.label($style: block, $scope: bare);
            }
        }
        `);
  return vars;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  dependencies,
  interface
});
