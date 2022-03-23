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
  interface: () => postcssSugarPluginDepthClassesInterface
});
module.exports = __toCommonJS(classes_exports);
var import_s_interface = __toESM(require("@coffeekraken/s-interface"));
var import_s_theme = __toESM(require("@coffeekraken/s-theme"));
var import_keysFirst = __toESM(require("@coffeekraken/sugar/shared/array/keysFirst"));
class postcssSugarPluginDepthClassesInterface extends import_s_interface.default {
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
  const depthsObj = import_s_theme.default.config("depth");
  const depthsArray = (0, import_keysFirst.default)(Object.keys(depthsObj), ["default"]);
  const vars = new CssVars();
  vars.comment(() => `
      /**
        * @name          Depth
        * @namespace          sugar.css.helpers
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/depth
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to apply some depth shadows to any HTMLElement.
        * These depths are defined in the theme configuration under \`theme.depth\` namespace.
        * 
        * @support      chromium        
        * @support      firefox         
        * @support      safari          
        * @support      edge           
        * 
        ${depthsArray.map((depthName) => {
    return [
      ` * @cssClass          s-depth:${depthName}      Apply the depth ${depthName} to any HTMLElement`,
      ` * @cssClass          s-depth:text:${depthName}      Apply the text depth ${depthName} to any HTMLElement`,
      ` * @cssClass          s-depth:box:${depthName}      Apply the depth ${depthName} to any HTMLElement`
    ].join("\n");
  }).join("\n")}
        *
        ${depthsArray.map((depthName) => {
    return ` * @example          html        Depth ${depthName}
                <div class="s-depth:${depthName} s-bg:main s-text:center s-radius s-p:30">
                    <span class="s-depth:text:${depthName}">s-depth:${depthName}</span>
                </div>`;
  }).join("\n")}
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
  depthsArray.forEach((depthName) => {
    vars.comment(() => `/**
                * @name          s-depth:${depthName === "default" ? "" : depthName}
                * @namespace          sugar.css.depth
                * @type               CssClass
                * @platform         css
                * @status           beta
                * 
                * This class allows you to apply a "<yellow>${depthName}</yellow>" depth style to any HTMLElement
                * 
                * @example        html
                * <a class="s-btn s-btn--primary s-depth:${depthName === "default" ? "" : depthName}">I'm a cool depth button</a>
                */
                `).code(`
.s-depth${depthName === "default" ? "" : `--${depthName}`}:not(.s-depth--text),
.s-depth--box.s-depth--${depthName === "default" ? "" : `--${depthName}`} {
    @sugar.depth('${depthName}');
}`);
  });
  depthsArray.forEach((depthName) => {
    vars.comment(() => `/**
                * @name          s-depth:text:${depthName === "default" ? "" : depthName}
                * @namespace          sugar.css.depth
                * @type               CssClass
                * @platform         css
                * @status           beta
                * 
                * This class allows you to apply a "<yellow>${depthName}</yellow>" depth style to any text
                * 
                * @example        html
                * <a class="s-btn s-btn--primary s-depth:text:${depthName === "default" ? "" : depthName}">I'm a cool depth button</a>
                */
                `).code(`
.s-depth--text.s-depth${depthName === "default" ? "" : `--${depthName}`} {
    @sugar.depth(${depthName}, $type: text);
}`);
  });
  return vars;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  interface
});
