var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
  interface: () => postcssSugarPluginClassesMixinInterface
});
module.exports = __toCommonJS(classes_exports);
var import_s_interface = __toESM(require("@coffeekraken/s-interface"), 1);
var import_s_theme = __toESM(require("@coffeekraken/s-theme"), 1);
var import_faker = __toESM(require("faker"), 1);
class postcssSugarPluginClassesMixinInterface extends import_s_interface.default {
  static get _definition() {
    return {};
  }
}
function classes_default({ params, atRule, CssVars, replaceWith }) {
  const cssArray = new CssVars();
  cssArray.comment(() => `
      /**
        * @name          Colors
        * @namespace          sugar.css.helpers
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/colors
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to set text and background colors easily to any HTMLElement
        * 
        * @support      chromium        
        * @support      firefox         
        * @support      safari          
        * @support      edge           
        * 
        ${Object.keys(import_s_theme.default.getTheme().baseColors()).map((colorName) => {
    return ` * @cssClass            s-color:${colorName}       Apply the ${colorName} color for the "current" color`;
  }).join("\n")}
        ${Object.keys(import_s_theme.default.getTheme().baseColors()).map((colorName) => {
    return ` * @cssClass            s-tc:${colorName}       Apply the ${colorName} text color`;
  }).join("\n")}
        ${Object.keys(import_s_theme.default.getTheme().baseColors()).map((colorName) => {
    return ` * @cssClass            s-bg:${colorName}       Apply the ${colorName} background color`;
  }).join("\n")}
        *
        * @example        html          Text color
        ${Object.keys(import_s_theme.default.getTheme().baseColors()).map((colorName) => {
    return ` * <h4 class="s-typo:h4 s-mbe:20">${colorName}</h4>
                    * <div class="s-tc:${colorName} s-mb:30">${import_faker.default.name.findName()}</div>`;
  }).join("\n")}
        *
        * @example        html          Background color
        ${Object.keys(import_s_theme.default.getTheme().baseColors()).map((colorName) => {
    return `  * <h4 class="s-typo:h4 s-mbe:20">${colorName}</h4>
                    * <div class="s-bg:${colorName} s-p:10 s-mb:30 s-radius">${import_faker.default.name.findName()}</div>`;
  }).join("\n")}
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
  Object.keys(import_s_theme.default.getTheme().baseColors()).forEach((colorName) => {
    cssArray.comment(() => `
      /**
       * @name        s-color:${colorName}
       * @namespace     sugar.css.ui.label
       * @type          CssClass
       * 
       * This class allows you to apply the "<span class="s-color:${colorName}">${colorName}</span>" text color to any ui element.
       * This does apply the color only on the item itself and not on his childs...
       * 
       * @example       html
       * <label>
       *   Hello world
       *   <input type="text" class="s-input s-color:${colorName}" />
       * </label>
       * 
       * @since       2.0.0
       * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
       */
      `).code(`
      .s-color--${colorName} {
        @sugar.color(${colorName});
      }
    `);
    cssArray.comment(() => [
      `/**`,
      ` * @name           s-bg:${colorName}`,
      ` * @namespace      sugar.css.color.bg.${colorName}`,
      ` * @type           CssClass`,
      ` * @platform       css`,
      ` * @status         beta`,
      ` *`,
      ` * This class allows you to apply the "${colorName}" color to the background of an HTMLElement`,
      ` *`,
      ` * @example        html`,
      ` * <h1 class="s-bg:${colorName}">`,
      ` *     Something cool`,
      ` * </h1>`,
      ` */`
    ].join("\n")).code(`
            .s-bg--${colorName} {
                   background-color: sugar.color(${colorName});
                }
        `);
  });
  import_s_theme.default.getTheme().loopOnColors((colorObj) => {
    const colorName = colorObj.name;
    let modifierStr = "";
    if (colorObj.variant)
      modifierStr = `-${colorObj.variant}`;
    cssArray.comment(() => [
      `/**`,
      ` * @name           s-tc:${colorName}${colorObj.variant === "text" ? "" : modifierStr}`,
      ` * @namespace      sugar.css.color.${colorName}.${colorObj.variant}`,
      ` * @type           CssClass`,
      ` * @platform       css`,
      ` * @status         beta`,
      ` *`,
      ` * This class allows you to apply the "${colorName}${modifierStr}" text color to an HTMLElement`,
      ` *`,
      ` * @example        html`,
      ` * <h1 class="s-tc:${colorName}${colorObj.variant === "text" ? "" : modifierStr}">`,
      ` *     Something cool`,
      ` * </h1>`,
      ` */`
    ].join("\n")).code(`
            .s-tc--${colorName}${colorObj.variant === "text" ? "" : modifierStr} {
            color: sugar.color(${colorName}, ${colorObj.variant});
        }
        `);
    cssArray.comment(() => [
      `/**`,
      ` * @name           s-bg:${colorName}${modifierStr}`,
      ` * @namespace      sugar.css.color.bg.${colorName}.${colorObj.variant}`,
      ` * @type           CssClass`,
      ` * @platform       css`,
      ` * @status         beta`,
      ` *`,
      ` * This class allows you to apply the "${colorName}${modifierStr}" color to the background of an HTMLElement`,
      ` *`,
      ` * @example        html`,
      ` * <h1 class="s-bg:${colorName}${modifierStr}">`,
      ` *     Something cool`,
      ` * </h1>`,
      ` */`
    ].join("\n")).code(`
            .s-bg--${colorName}${modifierStr} {
                   background-color: sugar.color(${colorName}, ${colorObj.variant});
                }
        `);
  });
  cssArray.comment(() => [
    `/**`,
    ` * @name           s-bg:odd`,
    ` * @namespace      sugar.css.bg.classes`,
    ` * @type           CssClass`,
    ` * @platform       css`,
    ` * @status         beta`,
    ` *`,
    ` * This class allows you to scope the applied bgs on the direct childs to only be applied on "odd" HTMLElement`,
    ` *`,
    ` * @example        html`,
    ` * <ol class="s-bg:odd">`,
    ` *     <li class="s-bg--accent">Something cool</li>`,
    ` *     <li class="s-bg--accent">Something cool</li>`,
    ` *     <li class="s-bg--accent">Something cool</li>`,
    ` * </li>`,
    ` */`
  ].join("\n")).code(`
        .s-bg--odd > *:nth-child(even) {
              background-color: transparent !important;
            }
    `);
  cssArray.comment(() => [
    `/**`,
    ` * @name           s-bg:even`,
    ` * @namespace      sugar.css.color`,
    ` * @type           CssClass`,
    ` * @platform       css`,
    ` * @status         beta`,
    ` *`,
    ` * This class allows you to scope the applied colors on the direct childs to only be applied on "even" HTMLElement`,
    ` *`,
    ` * @example        html`,
    ` * <ol class="s-bg:even">`,
    ` *     <li class="s-bg--accent">Something cool</li>`,
    ` *     <li class="s-bg--accent">Something cool</li>`,
    ` *     <li class="s-bg--accent">Something cool</li>`,
    ` * </li>`,
    ` */`
  ].join("\n")).code(`
        .s-bg--even > *:nth-child(even) {
            background-color: transparent !important;
        }
    `);
  replaceWith(cssArray);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  interface
});
