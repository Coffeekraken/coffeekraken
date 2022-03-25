var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
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
import __SInterface from "@coffeekraken/s-interface";
import __STheme from "@coffeekraken/s-theme";
import __faker from "faker";
import __keysFirst from "@coffeekraken/sugar/shared/array/keysFirst";
class postcssSugarPluginMarginClassesInterface extends __SInterface {
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
  const marginsObj = __STheme.config("margin");
  const marginsKeys = __keysFirst(Object.keys(marginsObj), ["default"]);
  vars.comment(() => `
      /**
        * @name          Margin
        * @namespace          sugar.css.helpers
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/margin
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to apply margins to any HTMLElement
        * 
        * @feature          Support for RTL by using margin-{inline|block}-...
        * 
        * @support          chromium
        * @support          firefox
        * @support          safari
        * @support          edge
        * 
        ${marginsKeys.map((spaceName) => {
    if (spaceName === "default")
      return "";
    return [
      `* @cssClass     s-m:${spaceName}        Apply the \`${spaceName}\` space all around`,
      `* @cssClass     s-mb:${spaceName}        Apply the \`${spaceName}\` block start and end space`,
      `* @cssClass     s-mbs:${spaceName}        Apply the \`${spaceName}\` block start space`,
      `* @cssClass     s-mbe:${spaceName}        Apply the \`${spaceName}\` block end space`,
      `* @cssClass     s-mi:${spaceName}        Apply the \`${spaceName}\` inline start and end space`,
      `* @cssClass     s-mis:${spaceName}        Apply the \`${spaceName}\` inline start space`,
      `* @cssClass     s-mie:${spaceName}        Apply the \`${spaceName}\` inline end space`,
      `* @cssClass     s-mb:-${spaceName}        Apply the \`${spaceName}\` negative block start and end space`,
      `* @cssClass     s-mbs:-${spaceName}        Apply the \`${spaceName}\` negative block start space`,
      `* @cssClass     s-mbe:-${spaceName}        Apply the \`${spaceName}\` negative block end space`,
      `* @cssClass     s-mi:-${spaceName}        Apply the \`${spaceName}\` negative inline start and end space`,
      `* @cssClass     s-mis:-${spaceName}        Apply the \`${spaceName}\` negative inline start space`,
      `* @cssClass     s-mie:-${spaceName}        Apply the \`${spaceName}\` negative inline end space`
    ].join("\n");
  }).join("\n")}
        * @cssClass                s-m:auto            Apply the \`auto\` space all around
        * @cssClass                s-mb:auto          Apply the \`auto\` block start and end space
        * @cssClass                s-mbs:auto          Apply the \`auto\` block start space
        * @cssClass                s-mbe:auto          Apply the \`auto\` block end space
        * @cssClass                s-mi:auto          Apply the \`auto\` inline start and end space
        * @cssClass                s-mis:auto          Apply the \`auto\` inline start space
        * @cssClass                s-mie:auto          Apply the \`auto\` inline end space
        *
        * 
        * @example        html               Inline
        *   <p class="s-bg:accent s-radius s-p:30 s-mbe:20">${__faker.name.findName()}</p>
        *   <p class="s-bg:complementary s-radius s-mi:50 s-mbe:20 s-p:30">${__faker.name.findName()}</p>
        *   <p class="s-bg:main s-mie:100 s-radius s-mbe:20 s-p:30">${__faker.name.findName()}</p>
        *   <p class="s-bg:error s-mie:30 s-radius s-p:30">${__faker.name.findName()}</p>
        * 
        * @example            html                Block
        *   <div class="s-bg:accent s-radius s-mbe:40 s-p:30 s-text:center">${__faker.name.findName()}</div>
        *   <div class="s-bg:complementary s-radius s-mbe:20 s-p:30 s-text:center">${__faker.name.findName()}</div>
        *   <div class="s-bg:main s-radius s-mbe:50 s-p:30 s-text:center">${__faker.name.findName()}</div>
        *   <div class="s-bg:error s-radius s-p:30 s-text:center">${__faker.name.findName()}</div>
        * 
        * @example            html                RTL
        * <div dir="rtl">
        *   <p class="s-bg:accent s-radius s-p:30 s-mbe:20">${__faker.name.findName()}</p>
        *   <p class="s-bg:complementary s-radius s-mi:50 s-mbe:20 s-p:30">${__faker.name.findName()}</p>
        *   <p class="s-bg:main s-radius s-mie:100 s-mbe:20 s-p:30">${__faker.name.findName()}</p>
        *   <p class="s-bg:error s-radius s-mie:30 s-p:30">${__faker.name.findName()}</p>
        * </div>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
  marginsKeys.forEach((spaceName) => {
    const clsMargin = `s-m:${spaceName}`;
    vars.comment(() => `/**
    * @name            ${clsMargin}
    * @namespace        sugar.css.margin
    * @type             CssClass
    * @platform             css
    * @status               beta
    * 
    * This class allows you to apply the "<yellow>${spaceName}</yellow>" margin style around any HTMLElement
    * 
    * @example      html
    * <span class="${clsMargin.replace(":", ":")}">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
    */
   `).code(`
   .${clsMargin.replace(":", "--")} {
        margin: sugar.margin(${spaceName});
   }`);
    const clsMarginTop = `s-mbs:${spaceName}`;
    vars.comment(() => `/**
    * @name            ${clsMarginTop}
    * @namespace        sugar.css.margin
    * @type             CssClass
    * @platform             css
    * @status               beta
    * 
    * This class allows you to apply the "<yellow>${spaceName}</yellow>" block start margin style to any HTMLElement
    * 
    * @example      html
    * <span class="${clsMarginTop.replace(":", ":")}">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
    */
   `).code(`
   .${clsMarginTop.replace(":", "--")} {
        margin-block-start: sugar.margin(${spaceName}) !important;
   }`);
    const clsMarginBottom = `s-mbe:${spaceName}`;
    vars.comment(() => `/**
    * @name            ${clsMarginBottom}
    * @namespace        sugar.css.margin
    * @type             CssClass
    * @platform             css
    * @status               beta
    * 
    * This class allows you to apply the "<yellow>${spaceName}</yellow>" block end margin style to any HTMLElement
    * 
    * @example      html
    * <span class="${clsMarginBottom.replace(":", ":")}">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
    */
   `).code(`
   .${clsMarginBottom.replace(":", "--")} {
        margin-block-end: sugar.margin(${spaceName}) !important;
   }`);
    const clsMarginLeft = `s-mis:${spaceName}`;
    vars.comment(() => `/**
    * @name            ${clsMarginLeft}
    * @namespace        sugar.css.margin
    * @type             CssClass
    * @platform             css
    * @status               beta
    * 
    * This class allows you to apply the "<yellow>${spaceName}</yellow>" inline start margin style to any HTMLElement
    * 
    * @example      html
    * <span class="${clsMarginLeft.replace(":", ":")}">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
    */
   `).code(`
   .${clsMarginLeft.replace(":", "--")} {
        margin-inline-start: sugar.margin(${spaceName}) !important;
   }`);
    const clsMarginRight = `s-mie:${spaceName}`;
    vars.comment(() => `/**
    * @name            .${clsMarginRight}
    * @namespace        sugar.css.margin
    * @type             CssClass
    * @platform             css
    * @status               beta
    * 
    * This class allows you to apply the "<yellow>${spaceName}</yellow>" inline end margin style to any HTMLElement
    * 
    * @example      html
    * <span class="${clsMarginRight.replace(":", ":")}">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
    */
   `).code(`
   .${clsMarginRight.replace(":", "--")} {
        margin-inline-end: sugar.margin(${spaceName}) !important;
   }`);
    const clsMarginX = `s-mi:${spaceName}`;
    vars.comment(() => `/**
    * @name            ${clsMarginX}
    * @namespace        sugar.css.margin
    * @type             CssClass
    * @platform             css
    * @status               beta
    * 
    * This class allows you to apply the "<yellow>${spaceName}</yellow>" inline start and end margin style to any HTMLElement
    * 
    * @example      html
    * <span class="${clsMarginX.replace(":", ":")}">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
    */
   `).code(`
     .${clsMarginX.replace(":", "--")} {
        margin-inline-start: sugar.margin(${spaceName}) !important;
        margin-inline-end: sugar.margin(${spaceName}) !important;
   }`);
    const clsMarginY = `s-mb:${spaceName}`;
    vars.comment(() => `/**
    * @name            ${clsMarginY}
    * @namespace        sugar.css.margin
    * @type             CssClass
    * @platform             css
    * @status               beta
    * 
    * This class allows you to apply the "<yellow>${spaceName}</yellow>" block start and end margin style to any HTMLElement
    * 
    * @example      html
    * <span class="${clsMarginY.replace(":", ":")}">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
    */
   `).code(`
   .${clsMarginY.replace(":", "--")} {
        margin-block-start: sugar.margin(${spaceName}) !important;
        margin-block-end: sugar.margin(${spaceName}) !important;
   }`);
  });
  marginsKeys.forEach((spaceName) => {
    const clsMargin = `s-m:-${spaceName}`;
    vars.comment(() => `/**
    * @name            ${clsMargin}
    * @namespace        sugar.css.margin
    * @type             CssClass
    * @platform             css
    * @status               beta
    * 
    * This class allows you to apply the "<yellow>-${spaceName}</yellow>" margin style around any HTMLElement
    * 
    * @example      html
    * <span class="${clsMargin.replace(":", ":")}">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
    */
   `).code(`
   .${clsMargin.replace(":", "--")} {
        margin: calc(sugar.margin(${spaceName}) * -1);
   }`);
    const clsMarginTop = `s-mbs:-${spaceName}`;
    vars.comment(() => `/**
    * @name            ${clsMarginTop}
    * @namespace        sugar.css.margin
    * @type             CssClass
    * @platform             css
    * @status               beta
    * 
    * This class allows you to apply the "<yellow>-${spaceName}</yellow>" block start margin style to any HTMLElement
    * 
    * @example      html
    * <span class="${clsMarginTop.replace(":", ":")}">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
    */
   `).code(`
   .${clsMarginTop.replace(":", "--")} {
        margin-block-start: calc(sugar.margin(${spaceName}) * -1) !important;
   }`);
    const clsMarginBottom = `s-mbe:-${spaceName}`;
    vars.comment(() => `/**
    * @name            .${clsMarginBottom}
    * @namespace        sugar.css.margin
    * @type             CssClass
    * @platform             css
    * @status               beta
    * 
    * This class allows you to apply the "<yellow>-${spaceName}</yellow>" block end margin style to any HTMLElement
    * 
    * @example      html
    * <span class="${clsMarginBottom.replace(":", ":")}">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
    */
   `).code(`
   .${clsMarginBottom.replace(":", "--")} {
        margin-block-end: calc(sugar.margin(${spaceName}) * -1) !important;
   }`);
    const clsMarginLeft = `s-mis:-${spaceName}`;
    vars.comment(() => `/**
    * @name            ${clsMarginLeft}
    * @namespace        sugar.css.margin
    * @type             CssClass
    * @platform             css
    * @status               beta
    * 
    * This class allows you to apply the "<yellow>-${spaceName}</yellow>" inline start margin style to any HTMLElement
    * 
    * @example      html
    * <span class="${clsMarginLeft.replace(":", ":")}">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
    */
   `).code(`
   .${clsMarginLeft.replace(":", "--")} {
        margin-inline-start: calc(sugar.margin(${spaceName}) * -1) !important;
   }`);
    const clsMarginRight = `s-mie:-${spaceName}`;
    vars.comment(() => `/**
    * @name            ${clsMarginRight}
    * @namespace        sugar.css.margin
    * @type             CssClass
    * @platform             css
    * @status               beta
    * 
    * This class allows you to apply the "<yellow>-${spaceName}</yellow>" inline end margin style to any HTMLElement
    * 
    * @example      html
    * <span class="${clsMarginRight.replace(":", ":")}">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
    */
   `).code(`
   .${clsMarginRight.replace(":", "--")} {
        margin-inline-end: calc(sugar.margin(${spaceName}) * -1) !important;
   }`);
    const clsMarginX = `s-mi:-${spaceName}`;
    vars.comment(() => `/**
    * @name            ${clsMarginX}
    * @namespace        sugar.css.margin
    * @type             CssClass
    * @platform             css
    * @status               beta
    * 
    * This class allows you to apply the "<yellow>-${spaceName}</yellow>" inline start and end margin style to any HTMLElement
    * 
    * @example      html
    * <span class="${clsMarginX.replace(":", ":")}">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
    */
   `).code(`
     .${clsMarginX.replace(":", "--")} {
        margin-inline-start: calc(sugar.margin(${spaceName}) * -1) !important;
        margin-inline-end: calc(sugar.margin(${spaceName}) * -1) !important;
   }`);
    const clsMarginY = `s-mb:-${spaceName}`;
    vars.comment(() => `/**
    * @name            ${clsMarginY}
    * @namespace        sugar.css.margin
    * @type             CssClass
    * @platform             css
    * @status               beta
    * 
    * This class allows you to apply the "<yellow>-${spaceName}</yellow>" block start and end margin style to any HTMLElement
    * 
    * @example      html
    * <span class="${clsMarginY.replace(":", ":")}">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
    */
   `).code(`
   .${clsMarginY.replace(":", "--")} {
        margin-block-start: calc(sugar.margin(${spaceName}) * -1) !important;
        margin-block-end: calc(sugar.margin(${spaceName}) * -1) !important;
   }`);
  });
  vars.comment(() => `/**
    * @name            s-m:auto
    * @namespace        sugar.css.margin
    * @type             CssClass
    * @platform             css
    * @status               beta
    * 
    * This class allows you to apply the "<yellow>auto</yellow>" margin style around any HTMLElement
    * 
    * @example      html
    * <span class="s-m:auto">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
    */
   `).code(`
   .s-m--auto {
        margin: auto;
   }`);
  vars.comment(() => `/**
    * @name            s-mbs:auto
    * @namespace        sugar.css.margin
    * @type             CssClass
    * @platform             css
    * @status               beta
    * 
    * This class allows you to apply the "<yellow>auto</yellow>" block start margin style around any HTMLElement
    * 
    * @example      html
    * <span class="s-mbs:auto">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
    */
   `).code(`
   .s-mbs--auto {
        margin-block-start: auto;
   }`);
  vars.comment(() => `/**
    * @name            s-mie:auto
    * @namespace        sugar.css.margin
    * @type             CssClass
    * @platform             css
    * @status               beta
    * 
    * This class allows you to apply the "<yellow>auto</yellow>" inline end margin style around any HTMLElement
    * 
    * @example      html
    * <span class="s-mie:auto">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
    */
   `).code(`
   .s-mie--auto {
        margin-inline-end: auto;
   }`);
  vars.comment(() => `/**
    * @name            s-mbe:auto
    * @namespace        sugar.css.margin
    * @type             CssClass
    * @platform             css
    * @status               beta
    * 
    * This class allows you to apply the "<yellow>auto</yellow>" block end margin style around any HTMLElement
    * 
    * @example      html
    * <span class="s-mbe:auto">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
    */
   `).code(`
   .s-mbe--auto {
        margin-block-end: auto;
   }`);
  vars.comment(() => `/**
    * @name            s-mis:auto
    * @namespace        sugar.css.margin
    * @type             CssClass
    * @platform             css
    * @status               beta
    * 
    * This class allows you to apply the "<yellow>auto</yellow>" inline start margin style around any HTMLElement
    * 
    * @example      html
    * <span class="s-mis:auto">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
    */
   `).code(`
   .s-mis--auto {
        margin-inline-start: auto;
   }`);
  vars.comment(() => `/**
    * @name            s-mi:auto
    * @namespace        sugar.css.margin
    * @type             CssClass
    * @platform             css
    * @status               beta
    * 
    * This class allows you to apply the "<yellow>auto</yellow>" inline start and end margin style around any HTMLElement
    * 
    * @example      html
    * <span class="s-mi:auto">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
    */
   `).code(`
   .s-mi--auto {
        margin-inline-start: auto;
        margin-inline-end: auto;
   }`);
  vars.comment(() => `/**
    * @name            s-mb:auto
    * @namespace        sugar.css.margin
    * @type             CssClass
    * @platform             css
    * @status               beta
    * 
    * This class allows you to apply the "<yellow>auto</yellow>" block start and end margin style around any HTMLElement
    * 
    * @example      html
    * <span class="s-mb:auto">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
    */
   `).code(`
   .s-mb--auto {
        margin-block-start: auto;
        margin-block-end: auto;
   }`);
  return vars;
}
export {
  classes_default as default,
  postcssSugarPluginMarginClassesInterface as interface
};
