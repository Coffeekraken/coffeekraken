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
  interface: () => postcssSugarPluginUiTableClassesInterface
});
module.exports = __toCommonJS(classes_exports);
var import_s_interface = __toESM(require("@coffeekraken/s-interface"), 1);
var import_s_theme = __toESM(require("@coffeekraken/s-theme"), 1);
var import_faker = __toESM(require("faker"), 1);
var import_dirname = __toESM(require("@coffeekraken/sugar/node/fs/dirname"), 1);
class postcssSugarPluginUiTableClassesInterface extends import_s_interface.default {
  static get _definition() {
    return {
      styles: {
        type: "String[]",
        default: ["solid"]
      },
      shapes: {
        type: "String[]",
        values: ["default", "square"],
        default: ["default", "square"]
      },
      defaultStyle: {
        type: "String",
        values: ["solid"],
        default: import_s_theme.default.config("ui.table.defaultStyle")
      },
      defaultShape: {
        type: "String",
        values: ["default", "square"],
        default: import_s_theme.default.config("ui.table.defaultShape")
      },
      scope: {
        type: {
          type: "Array<String>",
          splitChars: [",", " "]
        },
        values: ["bare", "lnf", "shape", "tf", "vr"],
        default: ["bare", "lnf", "shape", "tf", "vr"]
      }
    };
  }
}
function dependencies() {
  return {
    files: [`${(0, import_dirname.default)()}/table.js`]
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
        * @name          Table
        * @namespace          sugar.css.ui
        * @type               Styleguide
        * @menu           Styleguide / UI        /styleguide/ui/table
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to display nice tables with ease.
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
    return ` * @cssClass     s-table${style === finalParams.defaultStyle ? "" : `:${style}`}           Apply the ${style} table style`;
  }).join("\n")}
        ${finalParams.shapes.map((shape) => {
    return ` * @cssClass     s-table${shape === finalParams.defaultShape ? "" : `:${shape}`}           Apply the ${shape} table shape`;
  }).join("\n")}
        * 
        ${finalParams.styles.map((style) => {
    return ` * @example        html       ${style} style ${finalParams.defaultStyle === style ? '<span class="s-badge:outline s-scale:05">default</span>' : ""}
            *   <table class="s-table${style === finalParams.defaultStyle ? "" : `:${style}`} s-mbe:30">
            *       <tr>
            *           <th>${import_faker.default.name.findName()}</th>
            *           <th>${import_faker.default.name.findName()}</th>
            *           <th>${import_faker.default.name.findName()}</th>
            *       </tr>
            *       <tr>
            *           <td>${import_faker.default.name.findName()}</td>
            *           <td>${import_faker.default.name.findName()}</td>
            *           <td>${import_faker.default.name.findName()}</td>
            *       </tr>
            *       <tr>
            *           <td>${import_faker.default.name.findName()}</td>
            *           <td>${import_faker.default.name.findName()}</td>
            *           <td>${import_faker.default.name.findName()}</td>
            *       </tr>
            *   </table>
            * `;
  }).join("\n")}
        *
        ${finalParams.shapes.map((shape) => {
    return ` * @example        html       ${shape} shape ${finalParams.defaultShape === shape ? '<span class="s-badge:outline s-scale:05">default</span>' : ""}
            *   <table class="s-table${shape === finalParams.defaultShape ? "" : `:${shape}`} s-mbe:30">
            *       <tr>
            *           <th>${import_faker.default.name.findName()}</th>
            *           <th>${import_faker.default.name.findName()}</th>
            *           <th>${import_faker.default.name.findName()}</th>
            *       </tr>
            *       <tr>
            *           <td>${import_faker.default.name.findName()}</td>
            *           <td>${import_faker.default.name.findName()}</td>
            *           <td>${import_faker.default.name.findName()}</td>
            *       </tr>
            *       <tr>
            *           <td>${import_faker.default.name.findName()}</td>
            *           <td>${import_faker.default.name.findName()}</td>
            *           <td>${import_faker.default.name.findName()}</td>
            *       </tr>
            *   </table>
            * `;
  }).join("\n")}
        *
        * @example      html        RTL Support
        * <div dir="rtl">
        *   <table class="s-table">
        *       <tr>
        *           <th>${import_faker.default.name.findName()}</th>
        *           <th>${import_faker.default.name.findName()}</th>
        *           <th>${import_faker.default.name.findName()}</th>
        *       </tr>
        *       <tr>
        *           <td>${import_faker.default.name.findName()}</td>
        *           <td>${import_faker.default.name.findName()}</td>
        *           <td>${import_faker.default.name.findName()}</td>
        *       </tr>
        *       <tr>
        *           <td>${import_faker.default.name.findName()}</td>
        *           <td>${import_faker.default.name.findName()}</td>
        *           <td>${import_faker.default.name.findName()}</td>
        *       </tr>
        *   </table>
        * </div>
        * 
        * @example      html        Scales
        ${["07", "1", "13", "16"].map((scale) => `
        *   <table class="s-table s-scale:${scale}">
        *       <tr>
        *           <th>${import_faker.default.name.findName()}</th>
        *           <th>${import_faker.default.name.findName()}</th>
        *           <th>${import_faker.default.name.findName()}</th>
        *       </tr>
        *       <tr>
        *           <td>${import_faker.default.name.findName()}</td>
        *           <td>${import_faker.default.name.findName()}</td>
        *           <td>${import_faker.default.name.findName()}</td>
        *       </tr>
        *       <tr>
        *           <td>${import_faker.default.name.findName()}</td>
        *           <td>${import_faker.default.name.findName()}</td>
        *           <td>${import_faker.default.name.findName()}</td>
        *       </tr>
        *   </table>
        `).join("\n")}
        * 
        * @example      html        Colors (non-exhaustive)
        ${["main", "accent", "complementary", "error"].map((color) => `
        *   <table class="s-table s-color:${color}">
        *       <tr>
        *           <th>${import_faker.default.name.findName()}</th>
        *           <th>${import_faker.default.name.findName()}</th>
        *           <th>${import_faker.default.name.findName()}</th>
        *       </tr>
        *       <tr>
        *           <td>${import_faker.default.name.findName()}</td>
        *           <td>${import_faker.default.name.findName()}</td>
        *           <td>${import_faker.default.name.findName()}</td>
        *       </tr>
        *       <tr>
        *           <td>${import_faker.default.name.findName()}</td>
        *           <td>${import_faker.default.name.findName()}</td>
        *           <td>${import_faker.default.name.findName()}</td>
        *       </tr>
        *   </table>
        `).join("\n")}
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
  if (finalParams.scope.includes("bare")) {
    vars.comment(() => `/**
            * @name           s-table
            * @namespace      sugar.css.ui.table
            * @type           CssClass
            * 
            * This class represent a(n) "<yellow>bare</yellow>" table
            * 
            * @example        html
            * <table class="s-table">
            *   <tr>
            *       <th>Hello</th>
            *       <th>World</th>
            *   </tr>
            *   <tr>
            *       <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit</td>
            *       <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit</td>
            *   </tr>
            *   <tr>
            *       <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit</td>
            *       <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit</td>
            *   </tr>
            * </table>
            * 
            * @since      2.0.0
            * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */`);
    vars.code(() => `
                .s-table {
                    @sugar.ui.table($scope: bare);
                }`);
  }
  if (finalParams.scope.includes("lnf")) {
    finalParams.styles.forEach((style) => {
      const isDefaultStyle = finalParams.defaultStyle === style;
      const styleCls = isDefaultStyle ? "" : `.s-table--${style}`;
      const cls = `.s-table${styleCls}`;
      vars.comment(() => `/**
            * @name           s-table${isDefaultStyle ? "" : `:${style}`}
            * @namespace      sugar.css.ui.table
            * @type           CssClass
            * 
            * This class represent a(n) "<yellow>${style}</yellow>" table
            * 
            * @example        html
            * <table class="s-table${isDefaultStyle ? "" : `:${style}`}">
            *   <tr>
            *       <th>Hello</th>
            *       <th>World</th>
            *   </tr>
            *   <tr>
            *       <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit</td>
            *       <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit</td>
            *   </tr>
            *   <tr>
            *       <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit</td>
            *       <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit</td>
            *   </tr>
            * </table>
            * 
            * @since      2.0.0
            * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */`);
      vars.code(() => `
                ${cls} {
                    @sugar.ui.table($style: ${style}, $scope: lnf);
                }`);
    });
  }
  if (finalParams.scope.includes("shape")) {
    finalParams.shapes.forEach((shape) => {
      const isDefaultShape = finalParams.defaultShape === shape;
      const shapeCls = isDefaultShape ? "" : `.s-table--${shape}`;
      const cls = `.s-table${shapeCls}`;
      vars.comment(() => `/**
            * @name           s-table${isDefaultShape ? "" : `:${shape}`}
            * @namespace      sugar.css.ui.table
            * @type           CssClass
            * 
            * This class represent a(n) "<yellow>${shape}</yellow>" table
            * 
            * @example        html
            * <table class="s-table${isDefaultShape ? "" : `:${shape}`}">
            *   <tr>
            *       <th>Hello</th>
            *       <th>World</th>
            *   </tr>
            *   <tr>
            *       <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit</td>
            *       <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit</td>
            *   </tr>
            *   <tr>
            *       <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit</td>
            *       <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit</td>
            *   </tr>
            * </table>
            * 
            * @since      2.0.0
            * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */`);
      vars.code(() => `
                ${cls} {
                    @sugar.ui.table($shape: ${shape}, $scope: shape);
                }`);
    });
  }
  vars.comment(() => `/**
        * @name           s-format:text
        * @namespace      sugar.css.ui.table
        * @type           CssClass
        * 
        * This class represent a simple table tag in the s-format:text scope
        * 
        * @example        html
        * <div class="s-format:text">
        *   <table>
        *   <tr>
        *       <th>Hello</th>
        *       <th>World</th>
        *   </tr>
        *   <tr>
        *       <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit</td>
        *       <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit</td>
        *   </tr>
        *   <tr>
        *       <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit</td>
        *       <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit</td>
        *   </tr>
        * </table>
        * </div>
        * 
        * @since      2.0.0
        * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
      */
     `).code(`
        @sugar.format.text {
          table {
              @sugar.ui.table;
          }
        } 
    `);
  vars.comment(() => `/**
        * @name           s-rhythm:vertical
        * @namespace      sugar.css.ui.table
        * @type           CssClass
        * 
        * This class represent some tables in the s-rhythm:vertical scope
        * 
        * @feature      Vertical rhythm
        * 
        * @example        html
        * <div class="s-rhythm:vertical">
        * <table class="s-table">
        *   <tr>
        *       <th>Hello</th>
        *       <th>World</th>
        *   </tr>
        *   <tr>
        *       <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit</td>
        *       <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit</td>
        *   </tr>
        *   <tr>
        *       <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit</td>
        *       <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit</td>
        *   </tr>
        * </table>
        * <table class="s-table">
        *   <tr>
        *       <th>Hello</th>
        *       <th>World</th>
        *   </tr>
        *   <tr>
        *       <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit</td>
        *       <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit</td>
        *   </tr>
        *   <tr>
        *       <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit</td>
        *       <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit</td>
        *   </tr>
        * </table>
        * </div>
        * 
        * @since      2.0.0
        * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
      */
     `).code(`
        @sugar.rhythm.vertical {
          table, .s-table {
              ${import_s_theme.default.jsObjectToCssProperties(import_s_theme.default.config("ui.table.rhythmVertical"))}
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
