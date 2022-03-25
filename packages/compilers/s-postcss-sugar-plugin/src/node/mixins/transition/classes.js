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
import __uniqid from "@coffeekraken/sugar/shared/string/uniqid";
class postcssSugarPluginTransitionClassesInterface extends __SInterface {
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
  const transitionObj = __STheme.config("transition");
  const vars = new CssVars();
  vars.comment(() => `
      /**
        * @name          Transitions
        * @namespace          sugar.css.helpers
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/transition
        * @platform       css
        * @status       beta
        * 
        * These classes allows to apply some transitions on any HTMLElement.
        * These transitions are defined in the \`theme.transition\` theme settings.
        * 
        * @support      chromium
        * @support      firefox
        * @support      safari
        * @support      edge
        * 
        ${Object.keys(transitionObj).map((transition) => {
    return ` * @cssClass             s-transition${transition === "default" ? "" : `:${transition}`}            Apply the \`${transition}\` transition`;
  })}
        * 
        ${Object.keys(transitionObj).map((transition) => {
    const id = `s-transition-${__uniqid()}`;
    return `
                * @example          html        ${transition}
                *   <div class="s-bg:main s-radius:30" id="${id}">
                *      <div class="s-transition${transition === "default" ? "" : `:${transition}`} s-ratio:1 s-bg:accent s-radius:30"></div>
                *       <style>
                *           #${id} > div { position: relative; left: 0; width: 100px; }
                *           #${id}:hover > div { left: calc(100% - 100px); )  }
                *       </style>
                *   </div>`;
  }).join("\n")}
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
  Object.keys(transitionObj).forEach((transitionName) => {
    vars.comment(() => `/**
  * @name          s-ratio:${transitionName.replace("/", "-")}
  * @namespace          sugar.css.transition
  * @type               CssClass
  * @platform             css
  * @status             beta
  * 
  * This class allows you to apply a "<yellow>${transitionName}</yellow>" transition style to any HTMLElement
  * 
  * @example        html
  * <div class="s-transition:${transitionName.replace("/", "-")} s-bg:accent">
  *     <div class="s-center-abs">I'm a cool container</div>
  * </div>
  */
 `).code(`
.s-transition${transitionName === "default" ? "" : `--${transitionName}`} {
    @sugar.transition(${transitionName});
}`);
  });
  return vars;
}
export {
  classes_default as default,
  postcssSugarPluginTransitionClassesInterface as interface
};
