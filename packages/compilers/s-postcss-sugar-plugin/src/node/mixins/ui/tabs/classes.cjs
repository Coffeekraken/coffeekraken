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
  interface: () => postcssSugarPluginUiListClassesInterface
});
module.exports = __toCommonJS(classes_exports);
var import_s_interface = __toESM(require("@coffeekraken/s-interface"), 1);
var import_s_theme = __toESM(require("@coffeekraken/s-theme"), 1);
var import_faker = __toESM(require("faker"), 1);
var import_dirname = __toESM(require("@coffeekraken/sugar/node/fs/dirname"), 1);
class postcssSugarPluginUiListClassesInterface extends import_s_interface.default {
  static get _definition() {
    var _a;
    return {
      styles: {
        type: "String[]",
        values: ["solid"],
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
        default: (_a = import_s_theme.default.config("ui.tabs.defaultStyle")) != null ? _a : "solid"
      },
      defaultShape: {
        type: "String",
        values: ["default", "square", "pill"],
        default: import_s_theme.default.config("ui.tabs.defaultShape")
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
    files: [`${(0, import_dirname.default)()}/tabs.js`]
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
        * @name          Tabs
        * @namespace          sugar.css.ui
        * @type               Styleguide
        * @menu           Styleguide / UI        /styleguide/ui/tabs
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to style list (or any others) HTMLElement as tabs
        * 
        * @support          rtl
        * @support          chromium            
        * @support          firefox
        * @support          safari
        * @support          edge
        * 
        ${finalParams.styles.map((style) => {
    return ` * @cssClass     s-tabs${style === finalParams.defaultStyle ? "" : `:${style}`}           Apply the ${style} tabs style`;
  }).join("\n")}
        ${finalParams.shapes.map((shape) => {
    return ` * @cssClass     s-tabs${shape === finalParams.defaultShape ? "" : `:${shape}`}           Apply the ${shape} tabs shape`;
  }).join("\n")}
        * @cssClass       s-tabs:grow        Make the tabs items grow and take the available space
        * @cssClass       s-tabs:vertical    Display the tabs horizontally
        * 
        ${finalParams.styles.map((style) => {
    return ` * @example        html       ${style} style ${finalParams.defaultStyle === style ? '<span class="s-badge:outline s-scale:05">default</span>' : ""}
            *   <ul class="s-tabs${style === finalParams.defaultStyle ? "" : `:${style}`} s-color:accent">
            *     <li tabindex="0" active>${import_faker.default.name.findName()}</li>
            *     <li tabindex="0">${import_faker.default.name.findName()}</li>
            *     <li tabindex="0">${import_faker.default.name.findName()}</li>
            *   </ul>
            * `;
  }).join("\n")}
        *
        ${finalParams.shapes.map((shape) => {
    return ` * @example        html       ${shape}
            *   <ul class="s-tabs${shape === finalParams.defaultShape ? "" : `:${shape}`} s-color:accent">
            *     <li tabindex="0" active>${import_faker.default.name.findName()}</li>
            *     <li tabindex="0">${import_faker.default.name.findName()}</li>
            *     <li tabindex="0">${import_faker.default.name.findName()}</li>
            *   </ul>
            * `;
  }).join("\n")}
        * 
        * @example        html       Grow
        *   <ul class="s-tabs:grow">
        *     <li tabindex="0" active>${import_faker.default.name.findName()}</li>
        *     <li tabindex="0">${import_faker.default.name.findName()}</li>
        *     <li tabindex="0">${import_faker.default.name.findName()}</li>
        *   </ul>
        * 
        * @example      html        RTL
        * <div dir="rtl">
        *   <ul class="s-tabs">
        *     <li class="s-color:accent" tabindex="0" active>${import_faker.default.name.findName()}</li>
        *     <li class="s-color:complementary" tabindex="0">${import_faker.default.name.findName()}</li>
        *     <li tabindex="0">${import_faker.default.name.findName()}</li>
        *   </ul>
        * </div>
        * 
        * @example      html        Vertical
        *   <ul class="s-tabs:vertical s-color:complementary">
        *     <li tabindex="0" active>${import_faker.default.name.findName()}</li>
        *     <li tabindex="0">${import_faker.default.name.findName()}</li>
        *     <li tabindex="0">${import_faker.default.name.findName()}</li>
        *   </ul>
        * 
        * @example      html        Scales
        *   <ul class="s-tabs:grow s-scale:13 s-color:accent">
        *     <li tabindex="0" active>${import_faker.default.name.findName()}</li>
        *     <li tabindex="0">${import_faker.default.name.findName()}</li>
        *     <li tabindex="0">${import_faker.default.name.findName()}</li>
        *   </ul>
        *
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
  if (finalParams.scope.includes("bare")) {
    vars.comment(() => `
            /**
              * @name           s-tabs
              * @namespace      sugar.css.ui.tabs
              * @type           CssClass
              * 
              * This class represent a "<yellow>bare</yellow>" tabs
              * 
              * @example        html
              * <div class="s-tabs">
              *    <div class="active">An active tab</div>
              *    <div>A tab</div>
              * </div>
            */
           `).code(`
          .s-tabs {
            @sugar.ui.tabs($scope: bare);
          }
          `);
  }
  if (finalParams.scope.includes("lnf")) {
    finalParams.styles.forEach((style) => {
      vars.comment(() => `/**
              * @name           s-tabs${finalParams.defaultStyle === style ? "" : `:${style}`}
              * @namespace      sugar.css.ui.tabs
              * @type           CssClass
              * 
              * This class represent a "<yellow>${style}</yellow>" tabs
              * 
              * @example        html
              * <div class="s-tabs${finalParams.defaultStyle === style ? "" : `:${style}`}">
              *    <div class="active">An active tab</div>
              *    <div>A tab</div>
              * </div>
            */
           `).code(`
          .s-tabs${finalParams.defaultStyle === style ? "" : `--${style}`} {
            @sugar.ui.tabs($style: ${style}, $scope: lnf);
          }
        `);
    });
  }
  if (finalParams.scope.includes("shape")) {
    finalParams.shapes.forEach((shape) => {
      vars.comment(() => `/**
            * @name           s-tabs${finalParams.defaultShape === shape ? "" : `:${shape}`}
            * @namespace      sugar.css.ui.tabs
            * @type           CssClass
            * 
            * This class represent a "<yellow>${shape}</yellow>" tabs
            * 
            * @example        html
            * <div class="s-tabs${finalParams.defaultShape === shape ? "" : `:${shape}`}">
            *    <div class="active">An active tab</div>
            *    <div>A tab</div>
            * </div>
          */
         `).code(`
        .s-tabs${finalParams.defaultShape === shape ? "" : `--${shape}`} {
          @sugar.ui.tabs($shape: ${shape}, $scope: shape);

          &.s-tabs--vertical {
                @sugar.ui.tabs($direction: vertical, $shape: ${shape}, $scope: 'shape');
            }
        }
      `);
    });
  }
  vars.comment(() => `/**
        * @name           s-tabs--grow
        * @namespace      sugar.css.ui.tabs
        * @type           CssClass
        * 
        * This class represent a "<yellow>grow</yellow>" tabs
        * 
        * @example        html
        * <div class="s-tabs--grow">
        *    <div class="active">An active tab</div>
        *    <div>A tab</div>
        * </div>
      */
     `).code(`
    .s-tabs--grow {
      @sugar.ui.tabs($grow: true, $scope: grow);
    }
  `);
  vars.comment(() => `/**
        * @name           s-tabs--vertical
        * @namespace      sugar.css.ui.tabs
        * @type           CssClass
        * 
        * This class represent a "<yellow>vertical</yellow>" tabs
        * 
        * @example        html
        * <div class="s-tabs--vertical">
        *    <div class="active">An active tab</div>
        *    <div>A tab</div>
        * </div>
      */
     `).code(`
    .s-tabs--vertical {
      @sugar.ui.tabs($direction: vertical, $scope: 'direction');
    }
  `);
  return vars;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  dependencies,
  interface
});
