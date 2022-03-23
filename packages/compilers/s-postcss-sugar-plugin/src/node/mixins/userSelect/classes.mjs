import {
  __spreadValues
} from "../../../../../../chunk-TD77TI6B.mjs";
import __SInterface from "@coffeekraken/s-interface";
import __faker from "faker";
class postcssSugarPluginUserSelectClassesInterface extends __SInterface {
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
        * @name          User select
        * @namespace          sugar.css.helpers
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/user-select
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to apply some user-select style on any HTMLElement
        * 
        * @support      chromium
        * @support      firefox
        * @support      safari
        * @support      edge
        * 
        * @cssClass         s-user-select:all             Apply the \`user-select\` to \`all\`
        * @cssClass         s-user-select:auto             Apply the \`user-select\` to \`auto\`
        * @cssClass         s-user-select:none             Apply the \`user-select\` to \`none\`
        * @cssClass         s-user-select:text             Apply the \`user-select\` to \`text\`
        * 
        * @example        html          All
        *   <p class="s-user-select:all">
        *       ${__faker.lorem.paragraph()}
        *   </p>
        * 
        * @example      html            auto
        *   <p class="s-user-select:auto">
        *       ${__faker.lorem.paragraph()}
        *   </p>
        * 
        * @example          html            none
        *   <p class="s-user-select:none">
        *       ${__faker.lorem.paragraph()}
        *   </p>
        * 
        * @example          html                text
        *   <p class="s-user-select:text">
        *       ${__faker.lorem.paragraph()}
        *   </p>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
  [
    "all",
    "auto",
    "none",
    "text"
  ].forEach((value) => {
    vars.push(`/**
    * @name          s-user-select:${value}
    * @namespace          sugar.css.whiteSpace
    * @type               CssClass
    * @platform             css
    * @status             beta
    * 
    * This class allows you to apply a "<yellow>${value}</yellow>" user-select style to any HTMLElement
    * 
    * @example        html
    * <div class="s-user-select:${value}">${__faker.lorem.paragraph()}</div>
    */
    .s-user-select--${value} {
        user-select: ${value};
    }`);
  });
  return vars;
}
export {
  classes_default as default,
  postcssSugarPluginUserSelectClassesInterface as interface
};
