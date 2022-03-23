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
  interface: () => postcssSugarPluginUiFormClassesInterface
});
module.exports = __toCommonJS(classes_exports);
var import_s_interface = __toESM(require("@coffeekraken/s-interface"));
var import_s_theme = __toESM(require("@coffeekraken/s-theme"));
var import_faker = __toESM(require("faker"));
var import_keysFirst = __toESM(require("@coffeekraken/sugar/shared/array/keysFirst"));
var import_dirname = __toESM(require("@coffeekraken/sugar/node/fs/dirname"));
class postcssSugarPluginUiFormClassesInterface extends import_s_interface.default {
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
        default: import_s_theme.default.config("ui.input.defaultStyle")
      },
      defaultShape: {
        type: "String",
        default: import_s_theme.default.config("ui.input.defaultShape")
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
    files: [`${(0, import_dirname.default)()}/text.js`]
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
        * @name          Text Input
        * @namespace          sugar.css.ui.input
        * @type               Styleguide
        * @menu           Styleguide / Forms        /styleguide/forms/text-input
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to apply some styles to your text input
        * 
        ${finalParams.styles.map((style) => {
    return ` * @cssClass     s-input${finalParams.defaultStyle === style ? "" : `:${style}`}           Apply the ${style} input style`;
  }).join("\n")}
        ${finalParams.shapes.map((shape) => {
    return ` * @cssClass     s-input${finalParams.defaultShape === shape ? "" : `:${shape}`}           Apply the ${shape} input shape`;
  }).join("\n")}
        * 
        ${(0, import_keysFirst.default)(finalParams.styles, ["default"]).map((style) => {
    return ` * @example        html       ${style} style
            *   <label class="s-label:responsive s-mbe:30">
            *       ${import_faker.default.name.findName()}
            *       <input type="text" placeholder="Type something!" class="s-input:${style} s-width:40" />
            *  </label>
            *   <label class="s-label:responsive s-mbe:30">
            *        I'm disabled
            *       <input type="text" disabled placeholder="Type something!" class="s-input:${style} s-width:40" />
            *   </label>
            *   <label dir="rtl" class="s-label:responsive s-mbe:30">
            *        Support RTL
            *       <input type="text" placeholder="Type something! (RTL)" class="s-input:${style} s-width:40" />
            *   </label>
            * 
            * `;
  }).join("\n")}
        *
        ${(0, import_keysFirst.default)(finalParams.shapes, ["default"]).map((shape) => {
    return ` * @example        html       ${shape} shape
            *   <label class="s-label:responsive s-mbe:30">
            *       ${import_faker.default.name.findName()}
            *       <input type="text" placeholder="Type something!" class="s-input:${shape} s-width:40" />
            *   </label>
            *   <label class="s-label:responsive s-mbe:30">
            *        I'm disabled
            *       <input type="text" disabled placeholder="Type something!" class="s-input:${shape} s-width:40" />
            *   </label>
            * `;
  }).join("\n")}
        *
        * @example        html       Colors (non-exhaustive)
        ${["main", "accent", "complementary", "error"].map((color) => {
    return ` 
            *   <label class="s-label:responsive s-mbe:30">
            *       ${import_faker.default.name.findName()}
            *       <input type="text" placeholder="Type something!" class="s-input s-color:${color} s-width:40" />
            *   </label>
            * `;
  }).join("\n")}
        *
        * @example        html       Scales (non-exhaustive)
        ${["07", "10", "13", "16"].map((scale) => {
    return ` 
            *   <label class="s-label:responsive s-mbe:30">
            *       ${import_faker.default.name.findName()}
            *       <input type="text" placeholder="Type something!" class="s-input s-scale:${scale} s-width:40" />
            *   </label>
            * `;
  }).join("\n")}
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
  if (finalParams.scope.includes("bare")) {
    vars.comment(() => `/**
        * @name           s-input
        * @namespace      sugar.css.ui.input
        * @type           CssClass
        * 
        * This class represent a(n) "<yellow>bare</yellow>" input
        * 
        * @example        html
        * <input type="text" class="s-input" placeholder="Hello world" />
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
      */
     `).code(`
        .s-input {
            @sugar.ui.input($scope: bare);
        }
        `);
  }
  if (finalParams.scope.includes("lnf")) {
    finalParams.styles.forEach((style) => {
      const isDefaultStyle = finalParams.defaultStyle === style;
      const styleCls = isDefaultStyle ? "" : `.s-input--${style}`;
      const cls = `.s-input${styleCls}`;
      vars.comment(() => `/**
            * @name           ${cls}
            * @namespace      sugar.css.ui.input
            * @type           CssClass
            * 
            * This class represent a(n) "<yellow>${style}</yellow>" input
            * 
            * @example        html
            * <input type="text" class="${cls.trim()}" placeholder="Hello world" />
            * 
            * @since      2.0.0
            * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */`).code([
        `${cls} {`,
        ` @sugar.ui.input($style: ${style}, $scope: lnf);`,
        `}`
      ].join("\n"));
    });
  }
  if (finalParams.scope.includes("shape")) {
    finalParams.shapes.forEach((shape) => {
      const isDefaultShape = finalParams.defaultShape === shape;
      const shapeCls = isDefaultShape ? "" : `.s-input--${shape}`;
      const cls = `.s-input${shapeCls}`;
      vars.comment(() => `/**
            * @name           ${cls}
            * @namespace      sugar.css.ui.input
            * @type           CssClass
            * 
            * This class represent a(n) "<yellow>${shape}</yellow>" input
            * 
            * @example        html
            * <input type="text" class="${cls.trim()}" placeholder="Hello world" />
            * 
            * @since      2.0.0
            * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */`).code([
        `${cls} {`,
        ` @sugar.ui.input($shape: ${shape}, $scope: shape);`,
        `}`
      ].join("\n"));
    });
  }
  return vars;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  dependencies,
  interface
});
