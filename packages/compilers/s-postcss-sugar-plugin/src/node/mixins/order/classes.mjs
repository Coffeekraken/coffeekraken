import {
  __spreadValues
} from "../../../../../../chunk-TD77TI6B.mjs";
import __SInterface from "@coffeekraken/s-interface";
import __STheme from "@coffeekraken/s-theme";
class postcssSugarPluginOrderClassesInterface extends __SInterface {
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
  const count = __STheme.config("helpers.order.count");
  const vars = new CssVars();
  vars.comment(() => `
      /**
        * @name          Order
        * @namespace          sugar.css.helpers
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/order
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to apply some order attributes on any HTMLElement.
        * 
        * @support      chromium
        * @support      firefox
        * @support      safari
        * @support      edge
        * 
        ${Array.from(Array(count)).map((v, i) => `
            * @cssClass             s-order-${i}        Apply the order ${i}
        `).join("\n")}
        * 
        * @example        html          Simple order
        * <div class="s-flex">
        *   <div class="s-order:1 s-p:20 s-bg:accent s-radius">World</div>
        *   <div class="s-p:20 s-bg:main s-radius">World</div>
        * </div>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
  Array.from(Array(count)).forEach((v, i) => {
    vars.comment(() => `/**
                * @name          s-order:${i}
                * @namespace          sugar.css.order
                * @type               CssClass
                * @platform           css
                * @status               beta
                * 
                * This class allows you to apply the order ${i} styling to any HTMLElement
                * 
                * @example        html
                * <div class="s-flex">
                *   <div class="s-order:${i} s-p:20 s-bg:accent s-radius">World</div>
                *   <div class="s-p:20 s-bg:main s-radius">World</div>
                * </div>
                * 
                * @since      2.0.0
                * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                */
            `).code(`
            .s-order--${i} {
                order: ${i};
            }`);
  });
  return vars;
}
export {
  classes_default as default,
  postcssSugarPluginOrderClassesInterface as interface
};
