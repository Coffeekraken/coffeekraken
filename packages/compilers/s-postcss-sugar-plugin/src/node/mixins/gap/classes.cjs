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
  interface: () => postcssSugarPluginGapClassesInterface
});
module.exports = __toCommonJS(classes_exports);
var import_s_interface = __toESM(require("@coffeekraken/s-interface"), 1);
var import_s_theme = __toESM(require("@coffeekraken/s-theme"), 1);
var import_keysFirst = __toESM(require("@coffeekraken/sugar/shared/array/keysFirst"), 1);
class postcssSugarPluginGapClassesInterface extends import_s_interface.default {
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
  const spacesKeys = (0, import_keysFirst.default)(Object.keys(import_s_theme.default.config("space")), ["default"]);
  const vars = new CssVars();
  vars.comment(() => `
      /**
        * @name          Gap
        * @namespace          sugar.css.helpers
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/gap
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to apply some gap attributes on any HTMLElement and with
        * 
        * @support      chromium
        * @support      firefox
        * @support      safari
        * @support      edge
        * 
        * @cssClass                 s-gap              Apply the default gap to any HTMLElement
        * @cssClass                s-gap:row          Apply the default row gap to any HTMLElement
        * @cssClass                s-gap:column          Apply the default column gap to any HTMLElement
        ${spacesKeys.map((space) => `
            * @cssClass                s-gap:${space}          Apply the ${space} gap to any HTMLElement
            * @cssClass                s-gap:row:${space}          Apply the ${space} row gap to any HTMLElement
            * @cssClass                s-gap:column:${space}          Apply the ${space} column gap to any HTMLElement
        `)}
        * 
        * @example        html          Simple grid
        * <div class="s-flex s-gap:40">
        *   <div class="s-badge s-color:accent">Hello</div>
        *   <div class="s-badge s-color:accent">Worl</div>
        * </div>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
  spacesKeys.forEach((space) => {
    vars.comment(() => `/**
                * @name          s-gap${space === "default" ? "" : `:${space}`}
                * @namespace          sugar.css.gep
                * @type               CssClass
                * @platform           css
                * @status               beta
                * 
                * This class allows you to apply the gap "${space}" styling to any HTMLElement
                * 
                * @example        html
                * <div class="s-flex s-gap${space === "default" ? "" : `:${space}`}">
                *   <div class="s-badge s-color:accent">Hello</div>
                *   <div class="s-badge s-color:accent">Worl</div>
                * </div>
                * 
                * @since      2.0.0
                * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                */
            `).code(`
                .s-gap${space === "default" ? "" : `--${space}`}:not(.s-gap--column):not(.s-gap--row) {
                    gap: sugar.space(${space});
                }`);
    vars.comment(() => `/**
                * @name          s-gap:row${space === "default" ? "" : `:${space}`}
                * @namespace          sugar.css.gep
                * @type               CssClass
                * @platform           css
                * @status               beta
                * 
                * This class allows you to apply the row gap "${space}" styling to any HTMLElement
                * 
                * @example        html
                * <div class="s-flex s-gap:row${space === "default" ? "" : `:${space}`}">
                *   <div class="s-badge s-color:accent">Hello</div>
                *   <div class="s-badge s-color:accent">Worl</div>
                * </div>
                * 
                * @since      2.0.0
                * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                */
            `).code(`
                .s-gap--row.s-gap${space === "default" ? "" : `--${space}`} {
                    row-gap: sugar.space(${space});
                }`);
    vars.comment(() => `/**
                * @name          s-gap:column${space === "default" ? "" : `:${space}`}
                * @namespace          sugar.css.gep
                * @type               CssClass
                * @platform           css
                * @status               beta
                * 
                * This class allows you to apply the column gap "${space}" styling to any HTMLElement
                * 
                * @example        html
                * <div class="s-flex s-gap:column${space === "default" ? "" : `:${space}`}">
                *   <div class="s-badge s-color:accent">Hello</div>
                *   <div class="s-badge s-color:accent">Worl</div>
                * </div>
                * 
                * @since      2.0.0
                * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                */
            `).code(`
                .s-gap--column.s-gap${space === "default" ? "" : `--${space}`} {
                    column-gap: sugar.space(${space});
                }`);
  });
  return vars;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  interface
});
