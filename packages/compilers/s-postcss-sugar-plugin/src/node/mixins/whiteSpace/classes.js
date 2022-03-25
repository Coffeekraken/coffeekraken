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
import __faker from "faker";
class postcssSugarPluginWrapClassesInterface extends __SInterface {
  static get _definition() {
    return {};
  }
}
function classes_default({
  params,
  atRule,
  replaceWith
}) {
  const finalParams = __spreadValues({}, params);
  const vars = [];
  vars.push(`
      /**
        * @name          White space
        * @namespace          sugar.css.helpers
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/white-space
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to apply some white-space style on any HTMLElement
        * 
        * @support      chromium
        * @support      firefox
        * @support      safari
        * @support      edge
        * 
        * @cssClass         s-white-space:wrap             Apply the \`white-space\` to \`wrap\`
        * @cssClass         s-white-space:nowrap             Apply the \`white-space\` to \`nowrap\`
        * @cssClass         s-white-space:break-spaces             Apply the \`white-space\` to \`break-spaces\`
        * @cssClass         s-white-space:normal             Apply the \`white-space\` to \`normal\`
        * @cssClass         s-white-space:pre             Apply the \`white-space\` to \`pre\`
        * @cssClass         s-white-space:pre-line             Apply the \`white-space\` to \`pre-line\`
        * @cssClass         s-white-space:pre-wrap             Apply the \`white-space\` to \`pre-wrap\`
        * @cssClass         s-white-space:revert             Apply the \`white-space\` to \`revert\`
        * @cssClass         s-white-space:unset             Apply the \`white-space\` to \`unset\`
        * 
        * @example        html          Wrap
        *   <p class="s-white-space:wrap">
        *       ${__faker.lorem.paragraph()}
        *   </p>
        * 
        * @example      html            Nowrap
        *   <p class="s-white-space:nowrap">
        *       ${__faker.lorem.paragraph()}
        *   </p>
        * 
        * @example          html            Break spaces
        *   <p class="s-white-space:break-spaces">
        *       ${__faker.lorem.paragraph()}
        *   </p>
        * 
        * @example          html                Normal
        *   <p class="s-white-space:normal">
        *       ${__faker.lorem.paragraph()}
        *   </p>
        * 
        * @example      html            Pre
        *   <p class="s-white-space:pre">
        *       ${__faker.lorem.paragraph()}
        *   </p>
        * 
        * @example      html            Pre-line
        *   <p class="s-white-space:pre-line">
        *       ${__faker.lorem.paragraph()}
        *   </p>
        * 
        * @example      html            Pre-wrap
        *   <p class="s-white-space:pre-wrap">
        *       ${__faker.lorem.paragraph()}
        *   </p>
        * 
        * @example          html            Revert
        *   <p class="s-white-space:revert">
        *       ${__faker.lorem.paragraph()}
        *   </p>
        * 
        * @example          html                Unset
        *   <p class="s-white-space:unset">
        *       ${__faker.lorem.paragraph()}
        *   </p>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
  [
    "wrap",
    "nowrap",
    "break-spaces",
    "normal",
    "pre",
    "pre-line",
    "pre-wrap",
    "revert",
    "unset"
  ].forEach((value) => {
    vars.push(`/**
    * @name          s-white-space:${value}
    * @namespace          sugar.css.whiteSpace
    * @type               CssClass
    * @platform             css
    * @status             beta
    * 
    * This class allows you to apply a "<yellow>${value}</yellow>" white-space style to any HTMLElement
    * 
    * @example        html
    * <div class="s-white-space:${value}">${__faker.lorem.paragraph()}</div>
    */
    .s-white-space--${value} {
        white-space: ${value};
    }`);
  });
  return vars;
}
export {
  classes_default as default,
  postcssSugarPluginWrapClassesInterface as interface
};
