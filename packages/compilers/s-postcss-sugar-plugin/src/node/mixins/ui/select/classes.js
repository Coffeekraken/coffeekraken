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
  interface: () => postcssSugarPluginUiFormSelectClassesInterface
});
module.exports = __toCommonJS(classes_exports);
var import_s_interface = __toESM(require("@coffeekraken/s-interface"));
var import_s_theme = __toESM(require("@coffeekraken/s-theme"));
var import_faker = __toESM(require("faker"));
var import_dirname = __toESM(require("@coffeekraken/sugar/node/fs/dirname"));
class postcssSugarPluginUiFormSelectClassesInterface extends import_s_interface.default {
  static get _definition() {
    return {
      styles: {
        type: "String[]",
        default: ["solid"]
      },
      shapes: {
        type: "String[]",
        values: ["default", "square", "pill"],
        default: ["default", "square", "pill"]
      },
      defaultStyle: {
        type: "String",
        values: ["solid"],
        default: import_s_theme.default.config("ui.select.defaultStyle")
      },
      defaultShape: {
        type: "String",
        values: ["default", "square", "pill"],
        default: import_s_theme.default.config("ui.select.defaultShape")
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
    files: [`${(0, import_dirname.default)()}/select.js`]
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
        * @name          Select
        * @namespace          sugar.css.ui
        * @type               Styleguide
        * @menu           Styleguide / Forms        /styleguide/forms/select
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to display nice select in your forms
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
    return ` * @cssClass     s-select${style === finalParams.defaultStyle ? "" : `:${style}`}           Apply the ${style} select style`;
  }).join("\n")}
        ${finalParams.shapes.map((shape) => {
    return ` * @cssClass     s-select${shape === finalParams.defaultShape ? "" : `:${shape}`}           Apply the ${shape} select shape`;
  }).join("\n")}
        * 
        ${finalParams.styles.map((style) => {
    return ` * @example        html       ${style} style
            *   <label class="s-mbe:30 s-label:responsive">
            *     ${import_faker.default.name.title()} ${import_faker.default.name.findName()}
            *     <select class="s-select${finalParams.defaultStyle === style ? "" : `:${style}`} s-width:40" name="select-style-${style}">
            *       <option value="value1">${import_faker.default.name.findName()}</option>
            *       <option value="value2">${import_faker.default.name.findName()}</option>
            *       <option value="value3">${import_faker.default.name.findName()}</option>
            *     </select>
            *   </label>
            *   <label class="s-mbe:30 s-label:responsive">
            *     I'm disabled
            *     <select disabled class="s-select${finalParams.defaultStyle === style ? "" : `:${style}`} s-width:40" name="select-style-${style}">
            *       <option value="value1">${import_faker.default.name.findName()}</option>
            *       <option value="value2">${import_faker.default.name.findName()}</option>
            *       <option value="value3">${import_faker.default.name.findName()}</option>
            *     </select>
            *   </label>
            * `;
  }).join("\n")}
        *
        ${finalParams.shapes.map((shape) => {
    return ` * @example        html       ${shape} shape
            *   <label class="s-mbe:30 s-label:responsive">
            *     ${import_faker.default.name.title()} ${import_faker.default.name.findName()}
            *     <select class="s-select${finalParams.defaultShape === shape ? "" : `:${shape}`} s-width:40" name="select-shape-${shape}">
            *       <option value="value1">${import_faker.default.name.findName()}</option>
            *       <option value="value2">${import_faker.default.name.findName()}</option>
            *       <option value="value3">${import_faker.default.name.findName()}</option>
            *     </select>
            *   </label>
            *   <label class="s-mbe:30 s-label:responsive">
            *     I'm disabled
            *     <select disabled class="s-select${finalParams.defaultShape === shape ? "" : `:${shape}`} s-width:40" name="select-shape-${shape}">
            *       <option value="value1">${import_faker.default.name.findName()}</option>
            *       <option value="value2">${import_faker.default.name.findName()}</option>
            *       <option value="value3">${import_faker.default.name.findName()}</option>
            *     </select>
            *   </label>
            * `;
  }).join("\n")}
        * 
        * @example      html            Colors (none-exhaustive)
        *   <label class="s-mbe:30 s-label:responsive">
        *     ${import_faker.default.name.title()} ${import_faker.default.name.findName()}
        *     <select class="s-select s-width:40" name="select-color-accent">
        *       <option value="value1">${import_faker.default.name.findName()}</option>
        *       <option value="value2">${import_faker.default.name.findName()}</option>
        *       <option value="value3">${import_faker.default.name.findName()}</option>
        *     </select>
        *   </label>
        *   <label class="s-mbe:30 s-label:responsive">
        *     ${import_faker.default.name.title()} ${import_faker.default.name.findName()}
        *     <select class="s-select s-color:accent s-width:40" name="select-color-complementary">
        *       <option value="value1">${import_faker.default.name.findName()}</option>
        *       <option value="value2">${import_faker.default.name.findName()}</option>
        *       <option value="value3">${import_faker.default.name.findName()}</option>
        *     </select>
        *   </label>
        *   <label class="s-mbe:30 s-label:responsive">
        *     ${import_faker.default.name.title()} ${import_faker.default.name.findName()}
        *     <select class="s-select s-color:complementary s-width:40" name="select-color-error">
        *       <option value="value1">${import_faker.default.name.findName()}</option>
        *       <option value="value2">${import_faker.default.name.findName()}</option>
        *       <option value="value3">${import_faker.default.name.findName()}</option>
        *     </select>
        *   </label>
        *   <label class="s-mbe:30 s-label:responsive">
        *     ${import_faker.default.name.title()} ${import_faker.default.name.findName()}
        *     <select class="s-select s-color:error s-width:40" name="select-color-error" disabled>
        *       <option value="value1">${import_faker.default.name.findName()}</option>
        *       <option value="value2">${import_faker.default.name.findName()}</option>
        *       <option value="value3">${import_faker.default.name.findName()}</option>
        *     </select>
        *   </label>
        * 
        * @example      html            Multiple
        *   <label class="s-mbe:30 s-label:responsive">
        *     ${import_faker.default.name.title()} ${import_faker.default.name.findName()}
        *     <select class="s-select s-color:accent s-width:40" multiple name="select-color-accent">
        *       <option value="value1">${import_faker.default.name.findName()}</option>
        *       <option value="value2">${import_faker.default.name.findName()}</option>
        *       <option value="value3">${import_faker.default.name.findName()}</option>
        *     </select>
        *   </label>
        * 
        * @example          html            RTL
        * <div dir="rtl">
        *   <label class="s-mbe:30 s-label:responsive">
        *     ${import_faker.default.name.title()} ${import_faker.default.name.findName()}
        *     <select class="s-select s-color:accent s-width:40" name="select-color-accent">
        *       <option value="value1">${import_faker.default.name.findName()}</option>
        *       <option value="value2">${import_faker.default.name.findName()}</option>
        *       <option value="value3">${import_faker.default.name.findName()}</option>
        *     </select>
        *   </label>
        * </div>
        * 
        * @example          html           Scales
        *   <label class="s-mbe:30 s-label:responsive s-scale:07">
        *     <select class="s-select s-color:accent s-width:40" name="select-color-accent">
        *       <option value="value1">${import_faker.default.name.findName()}</option>
        *       <option value="value2">${import_faker.default.name.findName()}</option>
        *       <option value="value3">${import_faker.default.name.findName()}</option>
        *     </select>
        *     ${import_faker.default.name.title()} ${import_faker.default.name.findName()}
        *   </label>
        *   <label class="s-mbe:30 s-label:responsive">
        *     <select class="s-select s-color:accent s-width:40" name="select-color-accent">
        *       <option value="value1">${import_faker.default.name.findName()}</option>
        *       <option value="value2">${import_faker.default.name.findName()}</option>
        *       <option value="value3">${import_faker.default.name.findName()}</option>
        *     </select>
        *     ${import_faker.default.name.title()} ${import_faker.default.name.findName()}
        *   </label>
        *   <label class="s-mbe:30 s-label:responsive s-scale:13">
        *     <select class="s-select s-color:accent s-width:40" name="select-color-accent">
        *       <option value="value1">${import_faker.default.name.findName()}</option>
        *       <option value="value2">${import_faker.default.name.findName()}</option>
        *       <option value="value3">${import_faker.default.name.findName()}</option>
        *     </select>
        *     ${import_faker.default.name.title()} ${import_faker.default.name.findName()}
        *   </label>
        *   <label class="s-mbe:30 s-label:responsive s-scale:16">
        *     <select class="s-select s-color:accent s-width:40" name="select-color-accent">
        *       <option value="value1">${import_faker.default.name.findName()}</option>
        *       <option value="value2">${import_faker.default.name.findName()}</option>
        *       <option value="value3">${import_faker.default.name.findName()}</option>
        *     </select>
        *     ${import_faker.default.name.title()} ${import_faker.default.name.findName()}
        *   </label>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
  if (finalParams.scope.includes("bare")) {
    vars.comment(() => `/**
            * @name           s-select
            * @namespace      sugar.css.ui.select
            * @type           CssClass
            * 
            * This class represent a(n) "<yellow>bare</yellow>" select
            * 
            * @example        html
            * <select class="s-select">
            *   <option value="value 1">Hello</option>
            *   <option value="value 2">World</option>
            * </select>
            * 
            * @since      2.0.0
            * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */`);
    vars.code(() => `
                .s-select {
                    @sugar.ui.select($scope: bare);
                }`);
  }
  if (finalParams.scope.includes("lnf")) {
    finalParams.styles.forEach((style) => {
      const isDefaultStyle = finalParams.defaultStyle === style;
      const styleCls = isDefaultStyle ? "" : `.s-select--${style}`;
      const cls = `.s-select${styleCls}`;
      vars.comment(() => `/**
            * @name           s-select${isDefaultStyle ? "" : `:${style}`}
            * @namespace      sugar.css.ui.select
            * @type           CssClass
            * 
            * This class represent a(n) "<yellow>${style}</yellow>" select
            * 
            * @example        html
            * <select class="s-select${isDefaultStyle ? "" : `:${style}`}">
            *   <option value="value 1">Hello</option>
            *   <option value="value 2">World</option>
            * </select>
            * 
            * @since      2.0.0
            * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */`);
      vars.code(() => `
                ${cls} {
                    @sugar.ui.select($style: ${style}, $scope: lnf);
                }`);
    });
  }
  if (finalParams.scope.includes("shape")) {
    finalParams.shapes.forEach((shape) => {
      const isDefaultShape = finalParams.defaultShape === shape;
      const styleCls = isDefaultShape ? "" : `.s-select--${shape}`;
      const cls = `.s-select${styleCls}`;
      vars.comment(() => `/**
        * @name           s-select${isDefaultShape ? "" : `:${shape}`}
        * @namespace      sugar.css.ui.select
        * @type           CssClass
        * 
        * This class represent a(n) "<yellow>${shape}</yellow>" select
        * 
        * @example        html
        * <select class="s-select${isDefaultShape ? "" : `:${shape}`}">
        *   <option value="value 1">Hello</option>
        *   <option value="value 2">World</option>
        * </select>
        * 
        * @since      2.0.0
        * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
      */`);
      vars.code(() => `
            ${cls} {
                @sugar.ui.select($shape: ${shape}, $scope: shape);
            }`);
    });
  }
  if (finalParams.scope.indexOf("tf") !== -1) {
    vars.comment(() => `/**
            * @name           s-format:text select
            * @namespace      sugar.css.ui.select
            * @type           CssClass
            * 
            * This class represent a simple select tag in the s-format:text scope
            * 
            * @example        html
            * <div class="s-format:text">
            *   <select>
            *       <option>${import_faker.default.name.findName()}</option>
            *       <option>${import_faker.default.name.findName()}</option>
            *       <option>${import_faker.default.name.findName()}</option>
            *   </select>
            * </div>
            * 
            * @since      2.0.0
            * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
       `).code(`
            @sugar.format.text {
                select {
                    @sugar.ui.select($scope: '${finalParams.scope.join(",")}');
                } 
            }
        `);
  }
  if (finalParams.scope.indexOf("vr") !== -1) {
    vars.comment(() => `/**
            * @name           s-rhythm:vertical
            * @namespace      sugar.css.ui.select
            * @type           CssClass
            * 
            * This class represent some select in the s-rhythm:vertical scope
            * 
            * @feature      Vertical rhythm
            * 
            * @example        html
            * <div class="s-rhythm:vertical">
            *   <select class="s-select">
            *       <option>${import_faker.default.name.findName()}</option>
            *       <option>${import_faker.default.name.findName()}</option>
            *       <option>${import_faker.default.name.findName()}</option>
            *   </select>
            *   <select class="s-select">
            *       <option>${import_faker.default.name.findName()}</option>
            *       <option>${import_faker.default.name.findName()}</option>
            *       <option>${import_faker.default.name.findName()}</option>
            *   </select>
            *   <select class="s-select">
            *       <option>${import_faker.default.name.findName()}</option>
            *       <option>${import_faker.default.name.findName()}</option>
            *       <option>${import_faker.default.name.findName()}</option>
            *   </select>
            * </div>
            * 
            * @since      2.0.0
            * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
       `).code(`
            @sugar.rhythm.vertical {
                select, .s-select {
                    ${import_s_theme.default.jsObjectToCssProperties(import_s_theme.default.config("ui.select.rhythmVertical"))}
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
