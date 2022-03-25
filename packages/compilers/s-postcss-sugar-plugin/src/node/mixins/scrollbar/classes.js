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
class postcssSugarPluginScaleClassesInterface extends __SInterface {
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
  const scaleObj = __STheme.config("ui.scrollbar");
  const vars = new CssVars();
  vars.comment(() => `
      /**
        * @name          Scrollbar
        * @namespace          sugar.css.tools
        * @type               Styleguide
        * @menu           Styleguide / UI        /styleguide/ui/scrollbar
        * @platform       css
        * @status       beta
        * 
        * These classes allows to apply a custom scrollbar that follows your theme settings.
        * It is based on the \`theme.ui.scrollbar\` settings.
        * 
        * @support      chromium
        * @support      firefox
        * @support      safari
        * @support      edge
        * 
        * @cssClass     s-scrollbar         Apply the custom scrollbar
        * 
        * @example        html          Vertical scrollbar
        * <!-- scrollbar vertical -->
        *   <div class="s-scrollbar" style="height:100px; overflow-y: auto;">
        *       ${__faker.lorem.paragraphs(10)}
        *   </div>
        * 
        * @example        html          Horizontal scrollbar
        *   <div class="s-scrollbar" style="white-space:nowrap; width: 200px; height: 2em; overflow-x: auto; overflow-y: hidden;">
        *       ${__faker.lorem.paragraphs(1)}
        *   </div>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
  vars.comment(() => `/**
            * @name          s-scrollbar
            * @namespace          sugar.css.scrollbar
            * @type               CssClass
            * @platform             css
            * @status             beta
            * 
            * This class allows to apply the custom scrollbar on any HTMLElement.
            * This scrollbar is defined in the \`theme.ui.scrollbar\` settings.
            * 
            * @example        html
            * <div class="s-scrollbar" style="height:50px">
            *    ${__faker.lorem.paragraphs(3)}
            * </div>
            * 
            * since           2.0.0
            * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
            */
        `).code(`
            .s-scrollbar {
                @sugar.scrollbar();
            }`);
  return vars;
}
export {
  classes_default as default,
  postcssSugarPluginScaleClassesInterface as interface
};
