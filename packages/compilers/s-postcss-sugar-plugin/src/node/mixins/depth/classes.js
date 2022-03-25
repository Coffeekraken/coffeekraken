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
import __keysFirst from "@coffeekraken/sugar/shared/array/keysFirst";
class postcssSugarPluginDepthClassesInterface extends __SInterface {
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
  const depthsObj = __STheme.config("depth");
  const depthsArray = __keysFirst(Object.keys(depthsObj), ["default"]);
  const vars = new CssVars();
  vars.comment(() => `
      /**
        * @name          Depth
        * @namespace          sugar.css.helpers
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/depth
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to apply some depth shadows to any HTMLElement.
        * These depths are defined in the theme configuration under \`theme.depth\` namespace.
        * 
        * @support      chromium        
        * @support      firefox         
        * @support      safari          
        * @support      edge           
        * 
        ${depthsArray.map((depthName) => {
    return [
      ` * @cssClass          s-depth:${depthName}      Apply the depth ${depthName} to any HTMLElement`,
      ` * @cssClass          s-depth:text:${depthName}      Apply the text depth ${depthName} to any HTMLElement`,
      ` * @cssClass          s-depth:box:${depthName}      Apply the depth ${depthName} to any HTMLElement`
    ].join("\n");
  }).join("\n")}
        *
        ${depthsArray.map((depthName) => {
    return ` * @example          html        Depth ${depthName}
                <div class="s-depth:${depthName} s-bg:main s-text:center s-radius s-p:30">
                    <span class="s-depth:text:${depthName}">s-depth:${depthName}</span>
                </div>`;
  }).join("\n")}
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
  depthsArray.forEach((depthName) => {
    vars.comment(() => `/**
                * @name          s-depth:${depthName === "default" ? "" : depthName}
                * @namespace          sugar.css.depth
                * @type               CssClass
                * @platform         css
                * @status           beta
                * 
                * This class allows you to apply a "<yellow>${depthName}</yellow>" depth style to any HTMLElement
                * 
                * @example        html
                * <a class="s-btn s-btn--primary s-depth:${depthName === "default" ? "" : depthName}">I'm a cool depth button</a>
                */
                `).code(`
.s-depth${depthName === "default" ? "" : `--${depthName}`}:not(.s-depth--text),
.s-depth--box.s-depth--${depthName === "default" ? "" : `--${depthName}`} {
    @sugar.depth('${depthName}');
}`);
  });
  depthsArray.forEach((depthName) => {
    vars.comment(() => `/**
                * @name          s-depth:text:${depthName === "default" ? "" : depthName}
                * @namespace          sugar.css.depth
                * @type               CssClass
                * @platform         css
                * @status           beta
                * 
                * This class allows you to apply a "<yellow>${depthName}</yellow>" depth style to any text
                * 
                * @example        html
                * <a class="s-btn s-btn--primary s-depth:text:${depthName === "default" ? "" : depthName}">I'm a cool depth button</a>
                */
                `).code(`
.s-depth--text.s-depth${depthName === "default" ? "" : `--${depthName}`} {
    @sugar.depth(${depthName}, $type: text);
}`);
  });
  return vars;
}
export {
  classes_default as default,
  postcssSugarPluginDepthClassesInterface as interface
};
