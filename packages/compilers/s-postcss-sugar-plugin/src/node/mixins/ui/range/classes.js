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
  interface: () => postcssSugarPluginUiRangeClassesInterface
});
module.exports = __toCommonJS(classes_exports);
var import_s_interface = __toESM(require("@coffeekraken/s-interface"));
var import_s_theme = __toESM(require("@coffeekraken/s-theme"));
var import_faker = __toESM(require("faker"));
var import_dirname = __toESM(require("@coffeekraken/sugar/node/fs/dirname"));
class postcssSugarPluginUiRangeClassesInterface extends import_s_interface.default {
  static get _definition() {
    return {
      styles: {
        type: "String[]",
        values: ["solid"],
        default: ["solid"]
      },
      shapes: {
        type: "String[]",
        values: ["default", "square", "pill", "circle"],
        default: ["default", "square", "pill", "circle"]
      },
      defaultStyle: {
        type: "String",
        values: ["solid"],
        default: import_s_theme.default.config("ui.range.defaultStyle")
      },
      defaultShape: {
        type: "String",
        values: ["default", "square", "pill", "circle"],
        default: import_s_theme.default.config("ui.range.defaultShape")
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
    files: [`${(0, import_dirname.default)()}/range.js`]
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
        * @name          Range
        * @namespace          sugar.css.ui
        * @type               Styleguide
        * @menu           Styleguide / Forms        /styleguide/forms/range
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
    return ` * @cssClass     s-range${style === finalParams.defaultStyle ? "" : `:${style}`}           Apply the ${style} range style`;
  }).join("\n")}
        ${finalParams.shapes.map((shape) => {
    return ` * @cssClass     s-range${shape === finalParams.defaultShape ? "" : `:${shape}`}           Apply the ${shape} range shape`;
  }).join("\n")}
        * 
        ${finalParams.styles.map((style) => {
    return ` * @example        html       ${style}
            *   <label class="s-mbe:30 s-label">
            *     ${import_faker.default.name.title()} ${import_faker.default.name.findName()}
            *     <input type="range" class="s-range${finalParams.defaultStyle === style ? "" : `:${style}`}" min="0" max="100" step="10" />
            *   </label>
            *   <label class="s-mbe:30 s-label">
            *     ${import_faker.default.name.title()} ${import_faker.default.name.findName()}
            *     <input type="range" class="s-range${finalParams.defaultStyle === style ? "" : `:${style}`} s-color:accent" min="0" max="100" step="10" />
            *   </label>
            *   <label class="s-mbe:30 s-label">
            *     ${import_faker.default.name.title()} ${import_faker.default.name.findName()}
            *     <input type="range" class="s-range${finalParams.defaultStyle === style ? "" : `:${style}`} s-color:complementary" min="0" max="100" step="10" />
            *   </label>
            *   <label class="s-mbe:30 s-label">
            *     I'm disabled
            *     <input type="range" disabled class="s-range${finalParams.defaultStyle === style ? "" : `:${style}`} s-color:complementary" min="0" max="100" step="10" />
            *   </label>
            * `;
  }).join("\n")}
        *
        ${finalParams.shapes.map((shape) => {
    return ` * @example        html       ${shape}
            *   <label class="s-mbe:30 s-label">
            *     ${import_faker.default.name.title()} ${import_faker.default.name.findName()}
            *     <input type="range" class="s-range${finalParams.defaultShape === shape ? "" : `:${shape}`}" min="0" max="100" step="10" />
            *   </label>
            *   <label class="s-mbe:30 s-label">
            *     ${import_faker.default.name.title()} ${import_faker.default.name.findName()}
            *     <input type="range" class="s-range${finalParams.defaultShape === shape ? "" : `:${shape}`} s-color:accent" min="0" max="100" step="10" />
            *   </label>
            *   <label class="s-mbe:30 s-label">
            *     ${import_faker.default.name.title()} ${import_faker.default.name.findName()}
            *     <input type="range" class="s-range${finalParams.defaultShape === shape ? "" : `:${shape}`} s-color:complementary" min="0" max="100" step="10" />
            *   </label>
            *   <label class="s-mbe:30 s-label">
            *     I'm disabled
            *     <input type="range" disabled class="s-range${finalParams.defaultShape === shape ? "" : `:${shape}`} s-color:complementary" min="0" max="100" step="10" />
            *   </label>
            * `;
  }).join("\n")}
        * 
        * @example        html          Colors (none-exclusive)
        *   <label class="s-mbe:30 s-label">
        *     <input type="range" class="s-range" min="0" max="100" step="10" />
        *     ${import_faker.default.name.title()} ${import_faker.default.name.findName()}
        *   </label>
        *   <label class="s-mbe:30 s-label">
        *     <input type="range" class="s-range s-color:accent" min="0" max="100" step="10" />
        *     ${import_faker.default.name.title()} ${import_faker.default.name.findName()}
        *   </label>
        *   <label class="s-mbe:30 s-label">
        *     <input type="range" class="s-range s-color:complementary" min="0" max="100" step="10" />
        *     ${import_faker.default.name.title()} ${import_faker.default.name.findName()}
        *   </label>
        *   <label class="s-mbe:30 s-label">
        *     <input type="range" class="s-range s-color:error" disabled min="0" max="100" step="10" />
        *     ${import_faker.default.name.title()} ${import_faker.default.name.findName()}
        *   </label>
        * 
        * @example      html        RTL
        * <div dir="rtl">
        *   <label class="s-mbe:30 s-label">
        *     ${import_faker.default.name.title()} ${import_faker.default.name.findName()}
        *     <input type="range" class="s-range" min="0" max="100" step="10" />
        *   </label>
        *   <label class="s-mbe:30 s-label">
        *     ${import_faker.default.name.title()} ${import_faker.default.name.findName()}
        *     <input type="range" class="s-range s-color:accent" min="0" max="100" step="10" />
        *   </label>
        *   <label class="s-mbe:30 s-label">
        *     ${import_faker.default.name.title()} ${import_faker.default.name.findName()}
        *     <input type="range" class="s-range s-color:complementary" min="0" max="100" step="10" />
        *   </label>
        *   <label class="s-mbe:30 s-label">
        *     ${import_faker.default.name.title()} ${import_faker.default.name.findName()}
        *     <input type="range" class="s-range s-color:error" disabled min="0" max="100" step="10" />
        *   </label>
        *   <label class="s-mbe:30 s-label">
        *     I'm disabled
        *     <input type="range" disabled class="s-range s-color:error" disabled min="0" max="100" step="10" />
        *   </label>
        * </div>
        *
        * @example        html          Scales
        *   <label class="s-mbe:30 s-label">
        *     <input type="range" class="s-range s-scale:08" min="0" max="100" step="10" />
        *     ${import_faker.default.name.title()} ${import_faker.default.name.findName()}
        *   </label>
        *   <label class="s-mbe:30 s-label">
        *     <input type="range" class="s-range" min="0" max="100" step="10" />
        *     ${import_faker.default.name.title()} ${import_faker.default.name.findName()}
        *   </label>
        *   <label class="s-mbe:30 s-label">
        *     <input type="range" class="s-range s-scale:12" min="0" max="100" step="10" />
        *     ${import_faker.default.name.title()} ${import_faker.default.name.findName()}
        *   </label>
        *   <label class="s-mbe:30 s-label">
        *     <input type="range" class="s-range s-scale:14" min="0" max="100" step="10" />
        *     ${import_faker.default.name.title()} ${import_faker.default.name.findName()}
        *   </label>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
  if (finalParams.scope.includes("bare")) {
    vars.comment(() => `/**
        * @name           s-range
        * @namespace      sugar.css.ui.range
        * @type           CssClass
        * 
        * This class represent a(n) "<s-color="accent">bare</s-color>" range
        * 
        * @example        html
        * <input type="range" class="s-range" min="0" max="100" step="10" />
        * 
        * @since    2.0.0
        * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
      */
     `).code(`
        .s-range {
            @sugar.ui.range($scope: bare);
        }
        `);
  }
  if (finalParams.scope.includes("lnf")) {
    finalParams.styles.forEach((style) => {
      let cls = `s-range`;
      if (style !== finalParams.defaultStyle) {
        cls += `--${style}`;
      }
      vars.comment(() => `/**
            * @name           ${cls}
            * @namespace      sugar.css.ui.range
            * @type           CssClass
            * 
            * This class represent a(n) "<s-color="accent">${style}</s-color>" range
            * 
            * @example        html
            * <input type="range" class="s-range${finalParams.defaultStyle === style ? "" : `:${style}`}" min="0" max="100" step="10" />
            * 
            * @since    2.0.0
            * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
       `).code(`
            .${cls} {
                @sugar.ui.range($style: ${style}, $scope: lnf);
            }
            `);
    });
  }
  if (finalParams.scope.includes("shape")) {
    finalParams.shapes.forEach((shape) => {
      let cls = `s-range`;
      if (shape !== finalParams.defaultShape) {
        cls += `--${shape}`;
      }
      vars.comment(() => `/**
            * @name           ${cls}
            * @namespace      sugar.css.ui.range
            * @type           CssClass
            * 
            * This class represent a(n) "<s-color="accent">${shape}</s-color>" range
            * 
            * @example        html
            * <input type="range" class="s-range${finalParams.defaultShape === shape ? "" : `:${shape}`}" min="0" max="100" step="10" />
            * 
            * @since    2.0.0
            * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
       `).code(`
            .${cls} {
                @sugar.ui.range($shape: ${shape}, $scope: shape);
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
