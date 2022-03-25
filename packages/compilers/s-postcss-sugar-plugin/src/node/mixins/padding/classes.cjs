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
  interface: () => postcssSugarPluginPaddingClassesInterface
});
module.exports = __toCommonJS(classes_exports);
var import_s_interface = __toESM(require("@coffeekraken/s-interface"), 1);
var import_s_theme = __toESM(require("@coffeekraken/s-theme"), 1);
var import_faker = __toESM(require("faker"), 1);
var import_keysFirst = __toESM(require("@coffeekraken/sugar/shared/array/keysFirst"), 1);
class postcssSugarPluginPaddingClassesInterface extends import_s_interface.default {
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
  const paddingsObj = import_s_theme.default.config("padding");
  const paddingsKeys = (0, import_keysFirst.default)(Object.keys(paddingsObj), ["default"]);
  vars.comment(() => `
      /**
        * @name          Padding
        * @namespace          sugar.css.helpers
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/padding
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to apply padding to any HTMLElement
        * 
        * @feature          Support for RTL by using padding-{inline|block}-...
        * 
        * @support          chromium
        * @support          firefox
        * @support          safari
        * @support          edge
        * 
        ${paddingsKeys.map((spaceName) => {
    if (spaceName === "default")
      return "";
    return [
      `* @cssClass     s-p:${spaceName}        Apply the \`${spaceName}\` padding all around`,
      `* @cssClass     s-pb:${spaceName}        Apply the \`${spaceName}\` block start and end padding`,
      `* @cssClass     s-pbs:${spaceName}        Apply the \`${spaceName}\` block start padding`,
      `* @cssClass     s-pbe:${spaceName}        Apply the \`${spaceName}\` block end padding`,
      `* @cssClass     s-pi:${spaceName}        Apply the \`${spaceName}\` inline start and end padding`,
      `* @cssClass     s-pis:${spaceName}        Apply the \`${spaceName}\` inline start padding`,
      `* @cssClass     s-pie:${spaceName}        Apply the \`${spaceName}\` inline end padding`,
      `* @cssClass     s-pb:-${spaceName}        Apply the \`${spaceName}\` negative block start and end padding`,
      `* @cssClass     s-pbs:-${spaceName}        Apply the \`${spaceName}\` negative block start padding`,
      `* @cssClass     s-pbe:-${spaceName}        Apply the \`${spaceName}\` negative block end padding`,
      `* @cssClass     s-pi:-${spaceName}        Apply the \`${spaceName}\` negative inline start and end padding`,
      `* @cssClass     s-pis:-${spaceName}        Apply the \`${spaceName}\` negative inline start padding`,
      `* @cssClass     s-pie:-${spaceName}        Apply the \`${spaceName}\` negative inline end padding`
    ].join("\n");
  }).join("\n")}
        *
        * 
        * @example        html          Inline
        *   <p class="s-bg:accent s-radius s-pi:30 s-pb:30 s-mbe:20">${import_faker.default.name.findName()}</p>
        *   <p class="s-bg:complementary s-radius s-pis:50 s-pb:30 s-mbe:20">${import_faker.default.name.findName()}</p>
        *   <p class="s-bg:main s-radius s-pis:80 s-pb:30 s-mbe:20">${import_faker.default.name.findName()}</p>
        *   <p class="s-bg:error s-radius s-pis:100 s-pb:30 s-mbe:20">${import_faker.default.name.findName()}</p>
        * 
        * @example            html                Block
        *   <div class="s-bg:accent s-radius s-pbs:30 s-pbe:40 s-text:center s-mbe:20">${import_faker.default.name.findName()}</div>
        *   <div class="s-bg:complementary s-radius s-pb:30 s-text:center s-mbe:20">${import_faker.default.name.findName()}</div>
        *   <div class="s-bg:main s-radius s-pbs:50 s-pbe:30 s-text:center s-mbe:20">${import_faker.default.name.findName()}</div>
        *   <div class="s-bg:error s-radius s-pbs:100 s-pbe:60 s-text:center s-mbe:20">${import_faker.default.name.findName()}</div>
        * 
        * @example       html          RTL
        * <div dir="rtl">
        *   <p class="s-bg:accent s-radius s-pi:30 s-pb:30 s-mbe:20">${import_faker.default.name.findName()}</p>
        *   <p class="s-bg:complementary s-radius s-pis:50 s-pb:30 s-mbe:20">${import_faker.default.name.findName()}</p>
        *   <p class="s-bg:main s-radius s-pis:80 s-pb:30 s-mbe:20">${import_faker.default.name.findName()}</p>
        *   <p class="s-bg:error s-radius s-pis:100 s-pb:30 s-mbe:20">${import_faker.default.name.findName()}</p>
        * </div>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
  paddingsKeys.forEach((spaceName) => {
    const clsMargin = `s-p:${spaceName}`;
    vars.comment(() => `/**
    * @name            ${clsMargin}
    * @namespace        sugar.css.padding
    * @type             CssClass
    * @platform             css
    * @status               beta
    * 
    * This class allows you to apply the "<yellow>${spaceName}</yellow>" padding style around any HTMLElement
    * 
    * @example      html
    * <span class="${clsMargin.replace(":", ":")}">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
    */
   `).code(`
   .${clsMargin.replace(":", "--")} {
        padding: sugar.padding(${spaceName});
   }`);
    const clsMarginTop = `s-pbs:${spaceName}`;
    vars.comment(() => `/**
    * @name            ${clsMarginTop}
    * @namespace        sugar.css.padding
    * @type             CssClass
    * @platform             css
    * @status               beta
    * 
    * This class allows you to apply the "<yellow>${spaceName}</yellow>" block start padding style to any HTMLElement
    * 
    * @example      html
    * <span class="${clsMarginTop.replace(":", ":")}">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
    */
   `).code(`
   .${clsMarginTop.replace(":", "--")} {
        padding-block-start: sugar.padding(${spaceName}) !important;
   }`);
    const clsMarginBottom = `s-pbe:${spaceName}`;
    vars.comment(() => `/**
    * @name            ${clsMarginBottom}
    * @namespace        sugar.css.padding
    * @type             CssClass
    * @platform             css
    * @status               beta
    * 
    * This class allows you to apply the "<yellow>${spaceName}</yellow>" block end padding style to any HTMLElement
    * 
    * @example      html
    * <span class="${clsMarginBottom.replace(":", ":")}">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
    */
   `).code(`
   .${clsMarginBottom.replace(":", "--")} {
        padding-block-end: sugar.padding(${spaceName}) !important;
   }`);
    const clsMarginLeft = `s-pis:${spaceName}`;
    vars.comment(() => `/**
    * @name            ${clsMarginLeft}
    * @namespace        sugar.css.padding
    * @type             CssClass
    * @platform             css
    * @status               beta
    * 
    * This class allows you to apply the "<yellow>${spaceName}</yellow>" inline start padding style to any HTMLElement
    * 
    * @example      html
    * <span class="${clsMarginLeft.replace(":", ":")}">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
    */
   `).code(`
   .${clsMarginLeft.replace(":", "--")} {
        padding-inline-start: sugar.padding(${spaceName}) !important;
   }`);
    const clsMarginRight = `s-pie:${spaceName}`;
    vars.comment(() => `/**
    * @name            .${clsMarginRight}
    * @namespace        sugar.css.padding
    * @type             CssClass
    * @platform             css
    * @status               beta
    * 
    * This class allows you to apply the "<yellow>${spaceName}</yellow>" inline end padding style to any HTMLElement
    * 
    * @example      html
    * <span class="${clsMarginRight.replace(":", ":")}">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
    */
   `).code(`
   .${clsMarginRight.replace(":", "--")} {
        padding-inline-end: sugar.padding(${spaceName}) !important;
   }`);
    const clsMarginX = `s-pi:${spaceName}`;
    vars.comment(() => `/**
    * @name            ${clsMarginX}
    * @namespace        sugar.css.padding
    * @type             CssClass
    * @platform             css
    * @status               beta
    * 
    * This class allows you to apply the "<yellow>${spaceName}</yellow>" inline start and end padding style to any HTMLElement
    * 
    * @example      html
    * <span class="${clsMarginX.replace(":", ":")}">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
    */
   `).code(`
     .${clsMarginX.replace(":", "--")} {
        padding-inline-start: sugar.padding(${spaceName}) !important;
        padding-inline-end: sugar.padding(${spaceName}) !important;
   }`);
    const clsMarginY = `s-pb:${spaceName}`;
    vars.comment(() => `/**
    * @name            ${clsMarginY}
    * @namespace        sugar.css.padding
    * @type             CssClass
    * @platform             css
    * @status               beta
    * 
    * This class allows you to apply the "<yellow>${spaceName}</yellow>" block start and end padding style to any HTMLElement
    * 
    * @example      html
    * <span class="${clsMarginY.replace(":", ":")}">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
    */
   `).code(`
   .${clsMarginY.replace(":", "--")} {
        padding-block-start: sugar.padding(${spaceName}) !important;
        padding-block-end: sugar.padding(${spaceName}) !important;
   }`);
  });
  return vars;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  interface
});
