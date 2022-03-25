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
class postcssSugarPluginFloatClassesInterface extends __SInterface {
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
        * @name          Float
        * @namespace          sugar.css.helpers
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/float
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to apply some float styling into your html.
        * 
        * @support      chromium
        * @support      firefox
        * @support      safari
        * @support      edge
        * 
        * @cssClass     s-float:left         Apply the left float style
        * @cssClass     s-float:right         Apply the right float style
        * @cssClass     s-float:none         Apply the none float style
        * 
        * @example        html              Left
        * <div class="s-bg:accent s-clearfix  s-p:30 s-radius">
        *     <div class="s-float:left">I'm a cool float left element</div>
        * </div>
        * 
        * @example      html                Right
        * <div class="s-bg:complementary s-clearfix s-p:30 s-radius">
        *     <div class="s-float:right">I'm a cool float right element</div>
        * </div>
        * 
        * @example      html                None
        * <div class="s-bg:error s-p:30 s-radius">
        *     <div class="s-float:none">I'm a cool float none element</div>
        * </div>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
  vars.comment(() => `/**
    * @name          s-float:left
    * @namespace          sugar.css.float
    * @type               CssClass
    * @platform             css
    * @status             beta
    * 
    * This class allows you to apply a "<yellow>left</yellow>" float style to any HTMLElement
    * 
    * @example        html
    * <div class="s-bg:accent">
    *     <div class="s-float:left">I'm a cool float left element</div>
    * </div>
    */
    `).code(`
    .s-float--left {
        float: left;
    }`);
  vars.comment(() => `/**
    * @name          s-float:right
    * @namespace          sugar.css.float
    * @type               CssClass
    * @platform             css
    * @status             beta
    * 
    * This class allows you to apply a "<yellow>right</yellow>" float style to any HTMLElement
    * 
    * @example        html
    * <div class="s-bg:accent">
    *     <div class="s-float:right">I'm a cool float right element</div>
    * </div>
    */
    `).code(`
    .s-float--right {
        float: right;
    }`);
  vars.comment(() => `/**
    * @name          s-float:none
    * @namespace          sugar.css.float
    * @type               CssClass
    * @platform             css
    * @status             beta
    * 
    * This class allows you to apply a "<yellow>none</yellow>" float style to any HTMLElement
    * 
    * @example        html
    * <div class="s-bg:accent">
    *     <div class="s-float:none">I'm a cool float none element</div>
    * </div>
    */
    `).code(`
    .s-float--none {
        float: none;
    }`);
  return vars;
}
export {
  classes_default as default,
  postcssSugarPluginFloatClassesInterface as interface
};
