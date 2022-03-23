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
  interface: () => postcssSugarPluginOffSizeClassesInterface
});
module.exports = __toCommonJS(classes_exports);
var import_s_interface = __toESM(require("@coffeekraken/s-interface"));
var import_s_theme = __toESM(require("@coffeekraken/s-theme"));
var import_keysFirst = __toESM(require("@coffeekraken/sugar/shared/array/keysFirst"));
class postcssSugarPluginOffSizeClassesInterface extends import_s_interface.default {
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
  const vars = new CssVars();
  const offsizeObj = import_s_theme.default.config("offsize");
  const offsizeKeys = (0, import_keysFirst.default)(Object.keys(offsizeObj), ["default"]);
  vars.comment(() => `
      /**
        * @name          Offsize
        * @namespace          sugar.css.helpers
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/offsize
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to apply an offsize to any HTMLElement.
        * An offsize is a "space" that you want to ADD to the width/height of an element.
        * You can specify where you want to add this offsize like for margin and padding by using the "inline" and "block" notation.
        * 
        * @feature          Support for RTL by using {inline|block} notation...
        * 
        * @support          chromium
        * @support          firefox
        * @support          safari
        * @support          edge
        * 
        ${offsizeKeys.map((spaceName) => {
    if (spaceName === "default")
      return "";
    return [
      `* @cssClass     s-os:${spaceName}        Apply the \`${spaceName}\` offsize all around`,
      `* @cssClass     s-osb:${spaceName}        Apply the \`${spaceName}\` block start and end offsize`,
      `* @cssClass     s-osbs:${spaceName}        Apply the \`${spaceName}\` block start offsize`,
      `* @cssClass     s-osbe:${spaceName}        Apply the \`${spaceName}\` block end offsize`,
      `* @cssClass     s-osi:${spaceName}        Apply the \`${spaceName}\` inline start and end offsize`,
      `* @cssClass     s-osis:${spaceName}        Apply the \`${spaceName}\` inline start offsize`,
      `* @cssClass     s-osie:${spaceName}        Apply the \`${spaceName}\` inline end offsize`
    ].join("\n");
  }).join("\n")}
        *
        * 
        * @example        html               All around
        * <div class="s-bg:main-surface s-position:relative" style="height: 250px">
        *   <div class="s-os:50 s-bg:accent s-opacity:10"></div>
        * </div>
        * 
        * @example        html               Inline
        * <div class="s-bg:main-surface">
        *   <div class="s-osi:50 s-bg:accent s-opacity:10" style="height: 250px"></div>
        * </div>
        * 
        * @example        html               Block
        * <div class="s-bg:main-surface s-position:relative" style="height: 250px">
        *   <div class="s-osb:50 s-bg:accent s-opacity:10"></div>
        * </div>
        * 
        * @example        html               Inline end
        * <div class="s-bg:main-surface">
        *   <div class="s-osie:50 s-bg:accent s-opacity:10" style="height: 250px"></div>
        * </div>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
  offsizeKeys.forEach((spaceName) => {
    const clsMargin = `s-os:${spaceName}`;
    vars.comment(() => `/**
    * @name            ${clsMargin}
    * @namespace        sugar.css.offsize
    * @type             CssClass
    * @platform             css
    * @status               beta
    * 
    * This class allows you to apply the "<yellow>${spaceName}</yellow>" offsize style around any HTMLElement
    * 
    * @example      html
    * <span class="${clsMargin.replace(":", ":")}">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
    */
   `).code(`
   .${clsMargin.replace(":", "--")} {
        position: relative;
        
        top: calc(sugar.offsize(${spaceName}) * -1);
        left: calc(sugar.offsize(${spaceName}) * -1);

        &[dir="rtl"], [dir="rtl"] & {
            left: auto;
           right: calc(sugar.offsize(${spaceName}) * -1);
        }

        width: calc(var(--width, 100%) + sugar.offsize(${spaceName}) * 2);
        height: calc(var(--height, 100%) + sugar.offsize(${spaceName}) * 2);
   }`);
    const clsMarginTop = `s-osbs:${spaceName}`;
    vars.comment(() => `/**
    * @name            ${clsMarginTop}
    * @namespace        sugar.css.offsize
    * @type             CssClass
    * @platform             css
    * @status               beta
    * 
    * This class allows you to apply the "<yellow>${spaceName}</yellow>" block start offsize style to any HTMLElement
    * 
    * @example      html
    * <span class="${clsMarginTop.replace(":", ":")}">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
    */
   `).code(`
   .${clsMarginTop.replace(":", "--")} {
        position: relative;
        top: calc(sugar.offsize(${spaceName}) * -1);
        height: calc(var(--height, 100%) + sugar.offsize(${spaceName}));
   }`);
    const clsMarginBottom = `s-osbe:${spaceName}`;
    vars.comment(() => `/**
    * @name            ${clsMarginBottom}
    * @namespace        sugar.css.offsize
    * @type             CssClass
    * @platform             css
    * @status               beta
    * 
    * This class allows you to apply the "<yellow>${spaceName}</yellow>" block end offsize style to any HTMLElement
    * 
    * @example      html
    * <span class="${clsMarginBottom.replace(":", ":")}">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
    */
   `).code(`
   .${clsMarginBottom.replace(":", "--")} {
       position: relative;
       top: 0;
        height: calc(var(--height, 100%) + sugar.offsize(${spaceName}));
   }`);
    const clsMarginLeft = `s-osis:${spaceName}`;
    vars.comment(() => `/**
    * @name            ${clsMarginLeft}
    * @namespace        sugar.css.offsize
    * @type             CssClass
    * @platform             css
    * @status               beta
    * 
    * This class allows you to apply the "<yellow>${spaceName}</yellow>" inline start offsize style to any HTMLElement
    * 
    * @example      html
    * <span class="${clsMarginLeft.replace(":", ":")}">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
    */
   `).code(`
   .${clsMarginLeft.replace(":", "--")} {
       position: relative;
        left: calc(sugar.offsize(${spaceName}) * -1);
        width: calc(var(--width, 100%) + sugar.offsize(${spaceName}));

        &[dir="rtl"], [dir="rtl"] & {
            left: auto;
           right: calc(sugar.offsize(${spaceName}) * -1);
        }
   }`);
    const clsMarginRight = `s-osie:${spaceName}`;
    vars.comment(() => `/**
    * @name            .${clsMarginRight}
    * @namespace        sugar.css.offsize
    * @type             CssClass
    * @platform             css
    * @status               beta
    * 
    * This class allows you to apply the "<yellow>${spaceName}</yellow>" inline end offsize style to any HTMLElement
    * 
    * @example      html
    * <span class="${clsMarginRight.replace(":", ":")}">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
    */
   `).code(`
   .${clsMarginRight.replace(":", "--")} {
       position: relative;
       left: 0;
        width: calc(var(--width, 100%) + sugar.offsize(${spaceName}));

        &[dir="rtl"], [dir="rtl"] & {
            left: auto;
           right: 0;
        }
   }`);
    const clsMarginX = `s-osi:${spaceName}`;
    vars.comment(() => `/**
    * @name            ${clsMarginX}
    * @namespace        sugar.css.offsize
    * @type             CssClass
    * @platform             css
    * @status               beta
    * 
    * This class allows you to apply the "<yellow>${spaceName}</yellow>" inline start and end offsize style to any HTMLElement
    * 
    * @example      html
    * <span class="${clsMarginX.replace(":", ":")}">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
    */
   `).code(`
     .${clsMarginX.replace(":", "--")} {
        position: relative;
        left: calc(sugar.offsize(${spaceName}) * -1);
        width: calc(var(--width, 100%) + sugar.offsize(${spaceName}) * 2);
   }`);
    const clsMarginY = `s-osb:${spaceName}`;
    vars.comment(() => `/**
    * @name            ${clsMarginY}
    * @namespace        sugar.css.offsize
    * @type             CssClass
    * @platform             css
    * @status               beta
    * 
    * This class allows you to apply the "<yellow>${spaceName}</yellow>" block start and end offsize style to any HTMLElement
    * 
    * @example      html
    * <span class="${clsMarginY.replace(":", ":")}">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
    */
   `).code(`
   .${clsMarginY.replace(":", "--")} {
        position: relative;
        top: calc(sugar.offsize(${spaceName}) * -1);
        height: calc(var(--height, 100%) + sugar.offsize(${spaceName}) * 2);
   }`);
  });
  return vars;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  interface
});
