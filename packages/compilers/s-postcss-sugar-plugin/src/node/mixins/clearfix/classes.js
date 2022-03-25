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
class postcssSugarPluginClearfixClassesInterface extends __SInterface {
  static get _definition() {
    return {
      defaultClearfix: {
        type: "String",
        default: __STheme.config("helpers.clearfix.default")
      }
    };
  }
}
function classes_default({
  params,
  atRule,
  CssVars,
  replaceWith
}) {
  const finalParams = __spreadValues({
    defaultClearfix: "overflow"
  }, params);
  const vars = new CssVars();
  const clearfixes = ["overflow", "facebook", "micro", "after"];
  const notStr = clearfixes.filter((c) => c !== finalParams.defaultClearfix).map((c) => `:not(.s-clearfix--${c})`).join("");
  vars.comment(() => `
      /**
        * @name          Clearfix
        * @namespace          sugar.css.helpers
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/clearfix
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to apply a clearfix on any HTMLElement
        * 
        * @support      chromium
        * @support      firefox
        * @support      safari
        * @support      edge
        * 
        ${clearfixes.map((clearfixName) => {
    return ` * @cssClass     s-clearfixs-clearfix${clearfixName === finalParams.defaultClearfix ? `` : `:${clearfixName}`}            Apply the ${clearfixName} clearfix`;
  }).join("\n")}
        * 
        ${clearfixes.map((clearfixName) => {
    return ` * @example        html         ${clearfixName}
            *   <div class="s-clearfix${clearfixName === finalParams.defaultClearfix ? `` : `:${clearfixName}`} s-bg:ui">
            *       <img src="https://picsum.photos/200/200" style="float: right" />
            *   </div>
            * `;
  }).join("\n")}
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
  clearfixes.forEach((clearfixName) => {
    vars.comment(() => `/**
                * @name          s-clearfix${clearfixName === finalParams.defaultClearfix ? "" : `:${clearfixName}`}
                * @namespace          sugar.css.clearfix
                * @type               CssClass
                * @platform         css
                * @status           beta
                * 
                * This class allows you to apply a "<yellow>${clearfixName}</yellow>" clearfix to any HTMLElement
                * 
                * @example        html
                * <div class="s-clearfix${clearfixName === finalParams.defaultClearfix ? "" : `:${clearfixName}`}">I'm a cool clearfix element</div>
                * 
                * @since        2.0.0
                * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                */
            `).code(`
                .s-clearfix${clearfixName === finalParams.defaultClearfix ? `${notStr}` : `--${clearfixName}`} {
                    @sugar.clearfix(${clearfixName});
                }`);
  });
  return vars;
}
export {
  classes_default as default,
  postcssSugarPluginClearfixClassesInterface as interface
};
