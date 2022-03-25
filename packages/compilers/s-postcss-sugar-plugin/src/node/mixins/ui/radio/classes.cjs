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
  interface: () => postcssSugarPluginUiRadioClassesInterface
});
module.exports = __toCommonJS(classes_exports);
var import_s_interface = __toESM(require("@coffeekraken/s-interface"), 1);
var import_s_theme = __toESM(require("@coffeekraken/s-theme"), 1);
var import_faker = __toESM(require("faker"), 1);
var import_dirname = __toESM(require("@coffeekraken/sugar/node/fs/dirname"), 1);
class postcssSugarPluginUiRadioClassesInterface extends import_s_interface.default {
  static get _definition() {
    return {
      styles: {
        type: "String[]",
        values: ["solid"],
        default: ["solid"]
      },
      shapes: {
        type: "String[]",
        values: ["default", "square", "circle"],
        default: ["default", "square", "circle"]
      },
      defaultStyle: {
        type: "String",
        values: ["solid"],
        default: import_s_theme.default.config("ui.radio.defaultStyle")
      },
      defaultShape: {
        type: "String",
        values: ["default", "square", "pill", "circle"],
        default: import_s_theme.default.config("ui.radio.defaultShape")
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
    files: [`${(0, import_dirname.default)()}/radio.js`]
  };
}
function classes_default({
  params,
  atRule,
  applyNoScopes,
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
  finalParams.scope = applyNoScopes(finalParams.scope);
  const vars = new CssVars();
  vars.comment(() => `
      /**
        * @name          Radio
        * @namespace          sugar.css.ui
        * @type               Styleguide
        * @menu           Styleguide / Forms        /styleguide/forms/radio
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to display nice radio in your forms
        * 
        * @feature          Support for scaling through the \`s-scale:...\` class
        * @feature          Support for colorizing through the \`s-color:...\` class
        * 
        * @support          chromium
        * @support          firefox
        * @support          safari
        * @support          edge
        * 
        ${finalParams.styles.map((style) => {
    return ` * @cssClass     s-radio${style === finalParams.defaultStyle ? "" : `:${style}`}           Apply the ${style} radio style`;
  }).join("\n")}
        ${finalParams.shapes.map((shape) => {
    return ` * @cssClass     s-radio${shape === finalParams.defaultShape ? "" : `:${shape}`}           Apply the ${shape} radio shape`;
  }).join("\n")}
        * 
        ${finalParams.styles.map((style) => {
    return ` * @example        html       ${style} style
            *   <label class="s-mbe:30 s-label">
            *     ${import_faker.default.name.title()} ${import_faker.default.name.findName()}
            *     <input type="radio" checked class="s-radio" name="radio-style-${style}" value="hello 1" checked />
            *   </label>
            *   <label class="s-mbe:30 s-label">
            *     I'm disabled
            *     <input type="radio" disabled class="s-radio" name="radio-style-${style}" value="hello 3" />
            *   </label>
            * `;
  }).join("\n")}
        *
        ${finalParams.shapes.map((shape) => {
    return ` * @example        html       ${shape} shape
            *   <label class="s-mbe:30 s-label">
            *     ${import_faker.default.name.title()} ${import_faker.default.name.findName()}
            *     <input type="radio" checked class="s-radio${finalParams.defaultShape === shape ? "" : `:${shape}`}" name="radio-shape-${shape}" value="hello 1" checked />
            *   </label>
            *   <label class="s-mbe:30 s-label">
            *     I'm disabled
            *     <input type="radio" disabled class="s-radio${finalParams.defaultShape === shape ? "" : `:${shape}`}" name="radio-shape-${shape}" value="hello 1" />
            *   </label>
            * `;
  }).join("\n")}
        * 
        * @example        html          Colors (none-exhaustive)
        *   <label class="s-mbe:30 s-label">
        *     ${import_faker.default.name.title()} ${import_faker.default.name.findName()}
        *     <input type="radio" checked class="s-radio" name="radio-style-color" value="hello 1" checked />
        *   </label>
        *   <label class="s-mbe:30 s-label">
        *     ${import_faker.default.name.title()} ${import_faker.default.name.findName()}
        *     <input type="radio" class="s-radio s-color:accent" name="radio-style-color" value="hello 2" />
        *   </label>
        *   <label class="s-mbe:30 s-label">
        *     ${import_faker.default.name.title()} ${import_faker.default.name.findName()}
        *     <input type="radio" class="s-radio s-color:complementary" name="radio-style-color" value="hello 3" />
        *   </label>
        *   <label class="s-mbe:30 s-label">
        *     I'm disabled
        *     <input type="radio" disabled class="s-radio s-color:error" name="radio-style-color" value="hello 4" />
        *   </label>
        * 
        * @example        html          RTL
        * <div dir="rtl">
        *   <label class="s-mbe:30 s-label">
        *     ${import_faker.default.name.title()} ${import_faker.default.name.findName()}
        *     <input type="radio" checked class="s-radio s-color:accent" name="radio-style-ltr" value="hello 1" checked />
        *   </label>
        * </div>
        * 
        * @example        html          Scales
        *   <label class="s-mbe:30 s-label s-scale:07">
        *     ${import_faker.default.name.title()} ${import_faker.default.name.findName()}
        *     <input type="radio" checked class="s-radio s-color:accent" name="radio-style-scale" value="hello 1" checked />
        *   </label>
        *   <label class="s-mbe:30 s-label">
        *     ${import_faker.default.name.title()} ${import_faker.default.name.findName()}
        *     <input type="radio" class="s-radio s-color:accent" name="radio-style-scale" value="hello 2" />
        *   </label>
        *   <label class="s-mbe:30 s-label s-scale:13">
        *     ${import_faker.default.name.title()} ${import_faker.default.name.findName()}
        *     <input type="radio" class="s-radio s-color:accent" name="radio-style-scale" value="hello 3" />
        *   </label>
        *   <label class="s-mbe:30 s-label s-scale:16">
        *     ${import_faker.default.name.title()} ${import_faker.default.name.findName()}
        *     <input type="radio" class="s-radio s-color:accent" name="radio-style-scale" value="hello 3" />
        *   </label>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
  if (finalParams.scope.includes("bare")) {
    vars.comment(() => `/**
            * @name           s-radio
            * @namespace      sugar.css.ui.radio
            * @type           CssClass
            * 
            * This class represent a(n) "<s-color="accent">bare</s-color>" radio
            * 
            * @example        html
            * <input type="radio" class="s-radio" value="something" name="myRadioItem1" />
            * <input type="radio" class="s-radio" value="something" name="myRadioItem2" />
            * <input type="radio" class="s-radio" value="something" name="myRadioItem3" />
            * 
            * @since    2.0.0
            * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
       `).code(`
            .s-radio {
                @sugar.ui.radio($scope: bare);
            }
            `);
  }
  if (finalParams.scope.includes("lnf")) {
    finalParams.styles.forEach((style) => {
      let cls = `s-radio`;
      if (style !== finalParams.defaultStyle) {
        cls += `--${style}`;
      }
      vars.comment(() => `/**
            * @name           ${cls}
            * @namespace      sugar.css.ui.radio
            * @type           CssClass
            * 
            * This class represent a(n) "<s-color="accent">${style}</s-color>" radio
            * 
            * @example        html
            * <input type="radio" class="s-radio${style === finalParams.defaultStyle ? "" : `:${style}`}" value="something" name="myRadioItem1" />
            * <input type="radio" class="s-radio${style === finalParams.defaultStyle ? "" : `:${style}`}" value="something" name="myRadioItem2" />
            <input type="radio" class="s-radio${style === finalParams.defaultStyle ? "" : `:${style}`}" value="something" name="myRadioItem3" />
            * 
            * @since    2.0.0
            * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
       `).code(`
            .${cls} {
                @sugar.ui.radio($style: ${style}, $scope: lnf);
            }
            `);
    });
  }
  if (finalParams.scope.includes("shape")) {
    finalParams.shapes.forEach((shape) => {
      let cls = `s-radio`;
      if (shape !== finalParams.defaultShape) {
        cls += `--${shape}`;
      }
      vars.comment(() => `/**
            * @name           ${cls}
            * @namespace      sugar.css.ui.radio
            * @type           CssClass
            * 
            * This class represent a(n) "<s-color="accent">${shape}</s-color>" radio
            * 
            * @example        html
            * <input type="radio" class="s-radio${shape === finalParams.defaultShape ? "" : `:${shape}`}" value="something" name="myRadioItem1" />
            * <input type="radio" class="s-radio${shape === finalParams.defaultShape ? "" : `:${shape}`}" value="something" name="myRadioItem2" />
            <input type="radio" class="s-radio${shape === finalParams.defaultShape ? "" : `:${shape}`}" value="something" name="myRadioItem3" />
            * 
            * @since    2.0.0
            * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
       `).code(`
            .${cls} {
                @sugar.ui.radio($shape: ${shape}, $scope: shape);
            }
            `);
    });
  }
  if (finalParams.scope.indexOf("tf") !== -1) {
    vars.comment(() => `/**
            * @name           s-format:text input[type="radio"]
            * @namespace      sugar.css.ui.radio
            * @type           CssClass
            * 
            * This class represent a simple input[type="radio"] tag in the s-format:text scope
            * 
            * @example        html
            * <div class="s-format:text">
            *   <input type="radio" name="my-radio" checked />
            *   <input type="radio" name="my-radio" />
            *   <input type="radio" name="my-radio" />
            * </div>
            * 
            * @since      2.0.0
            * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
       `).code(`
            @sugar.format.text {
                input[type="radio"] {
                    @sugar.ui.radio($scope: '${finalParams.scope.join(",")}');
                } 
            }
        `);
  }
  if (finalParams.scope.indexOf("vr") !== -1) {
    vars.comment(() => `/**
            * @name           s-rhythm:vertical
            * @namespace      sugar.css.ui.radio
            * @type           CssClass
            * 
            * This class represent some input[type="radio"] in the s-rhythm:vertical scope
            * 
            * @feature      Vertical rhythm
            * 
            * @example        html
            * <div class="s-rhythm:vertical">
            *   <input class="s-radio" type="radio" name="my-radio" checked />
            *   <input class="s-radio" type="radio" name="my-radio" />
            *   <input class="s-radio" type="radio" name="my-radio" />
            * </div>
            * 
            * @since      2.0.0
            * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
       `).code(`
            @sugar.rhythm.vertical {
                input[type="radio"], .s-radio {
                    ${import_s_theme.default.jsObjectToCssProperties(import_s_theme.default.config("ui.radio.rhythmVertical"))}
                } 
            }
        `);
  }
  return vars;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  dependencies,
  interface
});
