import {
  __spreadValues
} from "../../../../../../chunk-TD77TI6B.mjs";
import __SInterface from "@coffeekraken/s-interface";
class postcssSugarPluginOverflowClassesInterface extends __SInterface {
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
  vars.comment(() => `/**
    * @name          s-overflow:auto
    * @namespace          sugar.css.overflow
    * @type               CssClass
    * @platform             css
    * @status             beta
    * 
    * This class allows you to apply a "<yellow>auto</yellow>" overflow style to any HTMLElement
    * 
    * @example        html
    * <div class="s-overflow:hidden s-bg:accent">
    *     <div class="s-center-abs">I'm a cool overflow auto container</div>
    * </div>
    */
    `).code(`
    .s-overflow--auto {
        overflow: auto;
    }`);
  vars.comment(() => `/**
    * @name          s-overflow:hidden
    * @namespace          sugar.css.overflow
    * @type               CssClass
    * @platform             css
    * @status             beta
    * 
    * This class allows you to apply a "<yellow>hidden</yellow>" overflow style to any HTMLElement
    * 
    * @example        html
    * <div class="s-overflow:hidden s-bg:accent">
    *     <div class="s-center-abs">I'm a cool overflow hidden container</div>
    * </div>
    */
    `).code(`
    .s-overflow--hidden {
        overflow: hidden;
    }`);
  vars.comment(() => `/**
    * @name          s-overflow:inherit
    * @namespace          sugar.css.overflow
    * @type               CssClass
    * @platform             css
    * @status             beta
    * 
    * This class allows you to apply a "<yellow>inherit</yellow>" overflow style to any HTMLElement
    * 
    * @example        html
    * <div class="s-overflow:hidden s-bg:accent">
    *     <div class="s-center-abs">I'm a cool overflow inherit container</div>
    * </div>
    */
    `).code(`
    .s-overflow--inherit {
        overflow: inherit;
    }`);
  vars.comment(() => `/**
    * @name          s-overflow:initial
    * @namespace          sugar.css.overflow
    * @type               CssClass
    * @platform             css
    * @status             beta
    * 
    * This class allows you to apply a "<yellow>initial</yellow>" overflow style to any HTMLElement
    * 
    * @example        html
    * <div class="s-overflow:hidden s-bg:accent">
    *     <div class="s-center-abs">I'm a cool overflow initial container</div>
    * </div>
    */
    `).code(`
    .s-overflow--initial {
        overflow: initial;
    }`);
  vars.comment(() => `/**
    * @name          s-overflow:overlay
    * @namespace          sugar.css.overflow
    * @type               CssClass
    * @platform             css
    * @status             beta
    * 
    * This class allows you to apply a "<yellow>overlay</yellow>" overflow style to any HTMLElement
    * 
    * @example        html
    * <div class="s-overflow:hidden s-bg:accent">
    *     <div class="s-center-abs">I'm a cool overflow overlay container</div>
    * </div>
    */
    `).code(`
    .s-overflow--overlay {
        overflow: overlay;
    }`);
  vars.comment(() => `/**
    * @name          s-overflow:revert
    * @namespace          sugar.css.overflow
    * @type               CssClass
    * @platform             css
    * @status             beta
    * 
    * This class allows you to apply a "<yellow>revert</yellow>" overflow style to any HTMLElement
    * 
    * @example        html
    * <div class="s-overflow:hidden s-bg:accent">
    *     <div class="s-center-abs">I'm a cool overflow revert container</div>
    * </div>
    */
    `).code(`
    .s-overflow--revert {
        overflow: revert;
    }`);
  vars.comment(() => `/**
    * @name          s-overflow:scroll
    * @namespace          sugar.css.overflow
    * @type               CssClass
    * @platform             css
    * @status             beta
    * 
    * This class allows you to apply a "<yellow>scroll</yellow>" overflow style to any HTMLElement
    * 
    * @example        html
    * <div class="s-overflow:hidden s-bg:accent">
    *     <div class="s-center-abs">I'm a cool overflow scroll container</div>
    * </div>
    */
    `).code(`
    .s-overflow--scroll {
        overflow: scroll;
    }`);
  vars.comment(() => `/**
    * @name          s-overflow:visible
    * @namespace          sugar.css.overflow
    * @type               CssClass
    * @platform             css
    * @status             beta
    * 
    * This class allows you to apply a "<yellow>visible</yellow>" overflow style to any HTMLElement
    * 
    * @example        html
    * <div class="s-overflow:hidden s-bg:accent">
    *     <div class="s-center-abs">I'm a cool overflow visible container</div>
    * </div>
    */
    `).code(`
    .s-overflow--visible {
        overflow: visible;
    }`);
  vars.comment(() => `/**
    * @name          s-overflow:unset
    * @namespace          sugar.css.overflow
    * @type               CssClass
    * @platform             css
    * @status             beta
    * 
    * This class allows you to apply a "<yellow>unset</yellow>" overflow style to any HTMLElement
    * 
    * @example        html
    * <div class="s-overflow:hidden s-bg:accent">
    *     <div class="s-center-abs">I'm a cool overflow unset container</div>
    * </div>
    */
    `).code(`
    .s-overflow--unset {
        overflow: unset;
    }`);
  return vars;
}
export {
  classes_default as default,
  postcssSugarPluginOverflowClassesInterface as interface
};
