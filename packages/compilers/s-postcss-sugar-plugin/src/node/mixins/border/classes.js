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
  interface: () => postcssSugarPluginBorderRadiusClassesMixinInterface
});
module.exports = __toCommonJS(classes_exports);
var import_s_interface = __toESM(require("@coffeekraken/s-interface"));
var import_s_theme = __toESM(require("@coffeekraken/s-theme"));
var import_keysFirst = __toESM(require("@coffeekraken/sugar/shared/array/keysFirst"));
class postcssSugarPluginBorderRadiusClassesMixinInterface extends import_s_interface.default {
  static get _definition() {
    return {};
  }
}
function classes_default({
  params,
  atRule,
  CssVars,
  replaceWith
}) {
  const finalParams = __spreadValues({}, params);
  const radiusesObj = import_s_theme.default.config("border.radius");
  const radiusesKeys = (0, import_keysFirst.default)(Object.keys(radiusesObj), ["default"]);
  const widthsObj = import_s_theme.default.config("border.width");
  const widthsKeys = (0, import_keysFirst.default)(Object.keys(widthsObj), ["default"]);
  const vars = new CssVars();
  vars.comment(() => `
      /**
        * @name          Radius
        * @namespace          sugar.css.helpers
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/radius
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to apply border radius on any HTMLElement
        * 
        * @support      chromium        
        * @support      firefox         
        * @support      safari          
        * @support      edge           
        * 
        ${radiusesKeys.map((radiusName) => {
    if (radiusName === "default")
      return "";
    return ` * @cssClass      s-radius:${radiusName}      Apply the border radius ${radiusName} to any HTMLElement`;
  }).join("\n")}
        *
        * @example        html          Border radius
        ${radiusesKeys.map((radiusName) => {
    if (radiusName === "default")
      return "";
    return `
              *   <div class="s-radius:${radiusName} s-display:inline-block s-width:20 s-bg:main s-pbs:30 s-mie:30 s-mbe:30 s-text:center s-ratio:1">
              *     ${radiusName}
              *   </div> 
            `;
  }).join("\n")}
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
  vars.comment(() => `
      /**
        * @name          Border width
        * @namespace          sugar.css.helpers
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/border-width
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to apply some border width to any HTMLElement
        * 
        * @support      chromium        
        * @support      firefox         
        * @support      safari          
        * @support      edge           
        * 
        ${widthsKeys.map((widthName) => {
    if (widthName === "default")
      return "";
    return ` * @cssClass      s-bwidth:${widthName}      Apply the border width ${widthName} to any HTMLElement`;
  }).join("\n")}
        *
        * @example             html         Border width
        ${widthsKeys.map((widthName) => {
    if (widthName === "default")
      return "";
    return `   <div class="s-display:inline-block s-width:20 s-pbs:20 s-mie:20 s-mbe:20 s-text:center s-ratio:1 s-bcolor:accent s-bwidth:${widthName}">
              *     ${widthName}
              *   </div> 
            `;
  }).join("\n")}
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
  vars.comment(() => `
      /**
        * @name          Border color
        * @namespace          sugar.css.helpers
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/border-color
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to apply some border color to any HTMLElement
        * 
        * @support      chromium        
        * @support      firefox         
        * @support      safari          
        * @support      edge           
        * 
        ${Object.keys(import_s_theme.default.getTheme().baseColors()).map((colorName) => {
    if (colorName === "default")
      return "";
    return ` * @cssClass      s-bcolor:${colorName}      Apply the border color ${colorName} to any HTMLElement`;
  }).join("\n")}
        *
        * @example             html         Border color
        ${Object.keys(import_s_theme.default.getTheme().baseColors()).map((colorName) => {
    return ` * <div class="s-display:inline-block s-width:20 s-pbs:20 s-mie:20 s-mbe:20 s-text:center s-ratio:1 s-bcolor:${colorName} s-bwidth:20">
              *     ${colorName}
              *   </div> 
            `;
  }).join("\n")}
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
  radiusesKeys.forEach((radiusName) => {
    const cls = `s-radius--${radiusName}`.replace("--default", "");
    const clsName = `s-radius:${radiusName}`.replace(":default", "");
    const radiusCss = `/**
            * @name               ${clsName}
            * @namespace          sugar.css.border
            * @type               CssClass
            * @platform         css
            * @status           beta
            * 
            * This class allows you to apply a "<yellow>${radiusName}</yellow>" border radius style to any HTMLElement
            * 
            * @example        html
            * <div class="${clsName.replace(":", ":")} s-color--complementary">
            *     Hello world
            * </div>
            */
 `;
    vars.comment(() => radiusCss).code(`
            .${cls} {
                @sugar.border.radius(${radiusName});
            }
        `);
  });
  widthsKeys.forEach((widthName) => {
    const cls = `s-bwidth:${widthName}`.replace(":default", "");
    const clsName = `s-bwidth--${widthName}`.replace("--default", "");
    vars.comment(() => `/**
                * @name               ${cls}
                * @namespace          sugar.css.border
                * @type               CssClass
                * @platform         css
                * @status           beta
                * 
                * This class allows you to apply a "<yellow>${widthName}</yellow>" border width style to any HTMLElement
                * 
                * @example        html
                * <div class="${cls}">
                *     Hello world
                * </div>
                */
        `).code(`
        .${clsName} {
            @sugar.border.width(${widthName});
        }`);
  });
  Object.keys(import_s_theme.default.getTheme().baseColors()).forEach((colorName) => {
    const cls = `s-bcolor:${colorName}`.replace(":default", "");
    const clsName = `s-bcolor--${colorName}`.replace("--default", "");
    vars.comment(() => `/**
                * @name               ${cls}
                * @namespace          sugar.css.border
                * @type               CssClass
                * @platform         css
                * @status           beta
                * 
                * This class allows you to apply a "<yellow>${colorName}</yellow>" border color style to any HTMLElement
                * 
                * @example        html
                * <div class="${cls}">
                *     Hello world
                * </div>
                */
        `).code(`
        .${clsName} {
            border-color: sugar.color(${colorName});
        }`);
  });
  return vars;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  interface
});
