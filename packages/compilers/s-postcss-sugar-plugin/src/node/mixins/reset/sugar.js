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
class postcssSugarPluginResetDestyleInterface extends __SInterface {
  static get _definition() {
    return {};
  }
}
function sugar_default({
  params,
  CssVars,
  replaceWith
}) {
  const finalParams = __spreadValues({}, params);
  const vars = new CssVars();
  vars.comment(() => `/**
        * @name          Sugar reset
        * @namespace          sugar.css.resets
        * @type               Styleguide
        * @menu           Styleguide / Resets        /styleguide/resets/sugar
        * @platform       css
        * @status       beta
        * 
        * This mixin allows you to apply the \`sugar\` reset easily.
        * 
        * @feature     Handle body height for IOS devices using the \`fill-available\` and \`min-height: -webkit-fill-available;\` technique
        * @feature     Ensure template are not displayed
        * @feature     Ensure hidden things are not displayed
        * @feature     Set the \`box-sizing\` to \`border-box\` for all HTMLElement
        * @feature     Set the webkit highlight color to transparent color
        * @feature     Remote outline on every elements
        * @feature     Set the \`max-width\` to \`100%\` for images     
        * 
        * @support      chromium
        * @support      firefox
        * @support      safari
        * @support      edge
        * 
        * @example        postcss
        * @sugar.reset.sugar;
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */`).code(`
            /* purgecss start ignore */


            /**
             * Body height
             */
            html {
                height: fill-available;
            }
            body {
                min-height: 100vh;
                min-height: -webkit-fill-available;
            }

            /**
             * Add the correct display in IE 10+.
             */
            template {
                display: none;
            }

            /**
             * Add the correct display in IE 10.
             */
            [hidden] {
                display: none;
            }

            /**
             * Set box sizing to berder box
             * Set the webkit highlight color to transparent color
             * Remote outline on every elements
             */
            * {
                box-sizing: border-box;
                -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
                outline: none;
            }

            /**
             * Max width 100% for images
             */
            img {
                max-width: 100%;
            }

            /* purgecss end ignore */
  `);
  return vars;
}
export {
  sugar_default as default,
  postcssSugarPluginResetDestyleInterface as interface
};
