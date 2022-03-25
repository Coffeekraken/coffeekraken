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
class postcssSugarPluginFixClassesInterface extends __SInterface {
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
  vars.comment(() => `
      /**
        * @name          Disabled
        * @namespace          sugar.css.helpers
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/disabled
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to apply the disabled style on any HTMLElement.
        * This make sure **no pointer events** stays active as well as displaying the **not-allowed cursor**.
        * 
        * @support      chromium
        * @support      firefox
        * @support      safari
        * @support      edge
        * 
        * @cssClass                 s-disabled              Apply the disabled styling on any HTMLElement
        * 
        * @example        html      Disabled
        * <input type="text" class="s-input s-disabled" placeholder="I'm disabled" />
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
  vars.comment(() => `/**
            * @name          s-disabled,[disabled]
            * @namespace          sugar.css.disabled
            * @type               CssClass
            * @platform         css
            * @status           beta
            * 
            * This class allows you to apply the disabled styling to any HTMLElement.
            * 
            * @example        html
            * <div class="s-rhythm:vertical">
            *   <input type="text" class="s-input s-disabled" placeholder="I'm disabled" />
            *   <input type="text" class="s-input" disabled placeholder="I'm disabled" />
            * </div>
            * 
            * @since        2.0.0
            * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
            */
        `).code(`
            .s-disabled,
            [disabled] {
                @sugar.disabled;
            }`);
  return vars;
}
export {
  classes_default as default,
  postcssSugarPluginFixClassesInterface as interface
};
