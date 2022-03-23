import {
  __spreadValues
} from "../../../../../../chunk-TD77TI6B.mjs";
import __SInterface from "@coffeekraken/s-interface";
import __STheme from "@coffeekraken/s-theme";
import __faker from "faker";
class postcssSugarPluginRatioClassesInterface extends __SInterface {
  static get _definition() {
    return {
      count: {
        type: "Number",
        default: __STheme.config("helpers.truncate.count")
      }
    };
  }
}
function classes_default({
  params,
  atRule,
  CssVars,
  replaceWith
}) {
  const finalParams = __spreadValues({
    count: 10
  }, params);
  const vars = new CssVars();
  vars.comment(() => `
      /**
        * @name          Truncate
        * @namespace          sugar.css.helpers
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/truncate
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to **truncate texts to a number of lines** on any HTMLElement
        * 
        * @support      chromium        14+
        * @support      firefox         68+    
        * @support      safari          5+
        * @support      edge            17+
        * 
        ${[...Array(finalParams.count).keys()].map((i) => {
    return ` * @cssClass        s-truncate:${i + 1}         Truncate the container to ${i + 1} line(s)`;
  })}
        *
        ${[...Array(finalParams.count).keys()].map((i) => {
    return ` * @example          html        ${i + 1} ${i <= 1 ? "line" : "lines"}
            *   <p class="s-typo:p s-truncate:${i + 1}">${__faker.lorem.lines(finalParams.count + 5).split("\n").join("<br />")}</p>
            * `;
  }).join("\n")}
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
  [...Array(finalParams.count).keys()].forEach((i) => {
    vars.comment(() => `/**
  * @name          s-truncate:${i}
  * @namespace          sugar.css.truncate
  * @type               CssClass
  * @platform             css
  * @status             beta
  * 
  * This class allows you to apply a "<yellow>${i + 1}</yellow>" line(s) truncate style to any HTMLElement
  * 
  * @example        html
  * <p class="s-typo:p s-truncate:${i}">${__faker.lorem.lines(finalParams.count + 5).split("\n").join("<br />")}</p>
  */
 `).code(`
.s-truncate--${i + 1} {
    @sugar.truncate(${i + 1});
}`);
  });
  return vars;
}
export {
  classes_default as default,
  postcssSugarPluginRatioClassesInterface as interface
};
