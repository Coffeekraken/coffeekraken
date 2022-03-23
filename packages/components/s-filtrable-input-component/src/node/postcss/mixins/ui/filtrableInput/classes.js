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
  interface: () => postcssUiFiltrableInputClassesInterface
});
module.exports = __toCommonJS(classes_exports);
var import_s_interface = __toESM(require("@coffeekraken/s-interface"), 1);
var import_s_theme = __toESM(require("@coffeekraken/s-theme"), 1);
var import_faker = __toESM(require("faker"), 1);
class postcssUiFiltrableInputClassesInterface extends import_s_interface.default {
  static get _definition() {
    var _a;
    return {
      styles: {
        type: "String[]",
        values: ["solid"],
        default: ["solid"]
      },
      defaultColor: {
        type: "String",
        default: import_s_theme.default.config("ui.filtrableInput.defaultColor")
      },
      defaultStyle: {
        type: "String",
        values: ["solid"],
        default: (_a = import_s_theme.default.config("ui.filtrableInput.defaultStyle")) != null ? _a : "solid"
      },
      scope: {
        type: {
          type: "Array<String>",
          splitChars: [",", " "]
        },
        values: ["bare", "lnf", "vr"],
        default: ["bare", "lnf", "vr"]
      }
    };
  }
}
function classes_default({
  params,
  atRule,
  replaceWith
}) {
  const finalParams = __spreadValues({
    styles: ["solid"],
    defaultStyle: "solid",
    defaultColor: "main",
    scope: ["bare", "lnf", "vr"]
  }, params);
  const vars = [];
  vars.push(`
      /**
        * @name          Filtrable Input
        * @namespace          sugar.css.ui
        * @type               Styleguide
        * @menu           Styleguide / UI        /styleguide/ui/filtrable-input
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to display an input as filtrable
        * 
        * @feature          Support for vertical rhythm through the \`s-rhythm:vertical\` class
        * @feature          Support for scaling through the \`s-scale:...\` class
        * @feature          Support for colorizing through the \`s-color:...\` class
        * 
        * @support          chromium
        * @support          firefox
        * @support          safari
        * @support          edge
        * 
        ${finalParams.styles.map((style) => {
    return ` * @cssClass     s-filtrable-input${style === finalParams.defaultStyle ? "" : `:${style}`}           Apply the ${style} filtrable input style`;
  }).join("\n")}
        * @cssClass            s-rhythm:vertical              Apply the default vertical rhythm on scoped filtered input(s)
        * 
        * @example        html
        ${finalParams.styles.map((style) => {
    return ` * <!-- ${style} style -->
            * <div class="s-mbe:50">
            *   <h3 class="s-tc:accent s-font:30 s-mbe:30">${style}\xA0style</h3>
            *   <a tabindex="0" class="s-btn:${style} s-mie:20 s-mbe:20"><span>Click me!</span></a>
            *   <a tabindex="0" class="s-btn:${style} s-mie:20 s-mbe:20 s-color:accent"><span>Click me!</span></a>
            *   <a tabindex="0" class="s-btn:${style} s-mie:20 s-mbe:20 s-color:complementary"><span>Click me!</span></a>
            *   <a tabindex="0" class="s-btn:${style} s-mie:20 s-mbe:20 s-color:info"><span>Click me!</span></a>
            *   <a tabindex="0" class="s-btn:${style} s-mie:20 s-mbe:20 s-color:error"><span>Click me!</span></a>
            *   <span class="s-btn-group s-mie:20 s-mbe:20">
            *       <a tabindex="0" class="s-btn:${style}"><span>Click me!</span></a>
            *       <a tabindex="0" class="s-btn:${style}"><span>+</span></a>
            *   </span>
            *   <a tabindex="0" disabled class="s-btn:${style} s-mie:20 s-mbe:20"><span>Click me!</span></a>
            * </div>
            * `;
  }).join("\n")}
        *
        * <!-- scales -->
        * <div class="s-mbe:50">
        *   <h3 class="s-tc:accent s-font:30 s-mbe:30">Scales</h3>
        *   <a tabindex="0" class="s-btn s-scale:07 s-mie:20"><span>Click me!</span></a>
        *   <a tabindex="0" class="s-btn s-scale:1 s-mie:20"><span>Click me!</span></a>
        *   <a tabindex="0" class="s-btn s-scale:13 s-mie:20"><span>Click me!</span></a>
        * </div>
        * 
        * <!-- Rhythm and text format -->
        * <div class="s-font:30 s-mbe:50">
        *   <h3 class="s-tc:accent s-font:30 s-mbe:30">Vertical rhythm and text formatting</h3>
        *   <p class="s-typo:p s-mbe:30">
        *       Text format mean that all the \`button\` tags inside the \`s-format:text\` class scope will be **styled automatically** using the default style and color.
        *   </p>
        *   <div class="s-format:text s-rhythm:vertical">
        *       <button>
        *          ${import_faker.default.name.findName()}
        *       </button>
        *       <br />
        *       <button>
        *           ${import_faker.default.name.findName()}
        *       </button>
        *   </div>
        * </div>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
  finalParams.styles.forEach((style) => {
    let cls = `s-filtrable-input`;
    if (style !== finalParams.defaultStyle) {
      cls += `--${style}`;
    }
    vars.push(`/**
        * @name           ${cls}
        * @namespace      sugar.css.ui.filtrableInput
        * @type           CssClass
        * 
        * This class represent a(n) "<s-color="accent">${style}</s-color>" filtrable input
        * 
        * @example        html
        * <a class="${cls.replace(/\./gm, " ").trim()}">I'm a cool button</a>
        * 
        * @since    2.0.0
        * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
      */
     .${cls} {
        @sugar.ui.filtrableInput($style: ${style});
     }`);
  });
  if (finalParams.scope.indexOf("vr") !== -1) {
    vars.push(`/**
            * @name           s-rhythm:vertical
            * @namespace      sugar.css.ui.filtrableInput
            * @type           CssClass
            * 
            * This class represent some filtrable inputs in the s-rhythm:vertical scope
            * 
            * @example        html
            * <div class="s-rhythm:vertical">
            *   <button class="s-btn">
            *       Hello world
            *   </button>
            *   <br />
            *   <button class="s-btn">
            *       Hello world
            *   </button>
            *   <br />
            *   <button class="s-btn">
            *       Hello world
            *   </button>
            * </div>
            * 
            * @since      2.0.0
            * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
            @sugar.rhythm.vertical {
                .s-filtrable-input {
                    ${import_s_theme.default.jsObjectToCssProperties(import_s_theme.default.config("ui.filtrableInput.rhythmVertical"))}
                } 
            }
        `);
  }
  return vars;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  interface
});
