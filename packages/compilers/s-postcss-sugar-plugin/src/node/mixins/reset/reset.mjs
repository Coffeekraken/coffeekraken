import {
  __spreadValues
} from "../../../../../../chunk-TD77TI6B.mjs";
import __SInterface from "@coffeekraken/s-interface";
import __dirname from "@coffeekraken/sugar/node/fs/dirname";
class postcssSugarPluginResetInterface extends __SInterface {
  static get _definition() {
    return {};
  }
}
function dependencies() {
  return {
    files: [`${__dirname()}/destyle.js`, `${__dirname()}/sugar.js`]
  };
}
function reset_default({
  params,
  CssVars,
  atRule,
  replaceWith
}) {
  const finalParams = __spreadValues({}, params);
  const vars = new CssVars();
  vars.comment(() => `
        /**
        * @name          Global reset
        * @namespace          sugar.css.resets
        * @type               Styleguide
        * @menu           Styleguide / Resets        /styleguide/resets/global
        * @platform       css
        * @status       beta
        * 
        * These mixins allows you to apply some resets like \`destyle\` and/or the \`sugar\` one.
        * The \`destyle\` one is well known and you can find the documentation on their website.
        * The \`sugar\` one is our own that add some resets like setting max-width to 100% for images, and some more. Check our his own documentation page.
        * 
        * @feature      Apply the \`destyle\` reset
        * @feature      Apply the \`sugar\` reset
        * 
        * @support      chromium
        * @support      firefox
        * @support      safari
        * @support      edge
        * 
        * @example        css
        * @sugar.reset;
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
        `).code(`
      @sugar.reset.destyle;
      @sugar.reset.sugar;
  `);
  return vars;
}
export {
  reset_default as default,
  dependencies,
  postcssSugarPluginResetInterface as interface
};
