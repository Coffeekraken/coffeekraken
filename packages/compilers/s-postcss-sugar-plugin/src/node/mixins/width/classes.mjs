import {
  __spreadValues
} from "../../../../../../chunk-TD77TI6B.mjs";
import __SInterface from "@coffeekraken/s-interface";
import __STheme from "@coffeekraken/s-theme";
class postcssSugarPluginWidthClassesMixinInterface extends __SInterface {
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
  const widthObj = __STheme.config("width");
  vars.push(`
      /**
        * @name          Widths
        * @namespace          sugar.css.helpers
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/widths
        * @platform       css
        * @status       beta
        * 
        * These classes allows to apply some width to any HTMLElement.
        * These widths are defined in the \`theme.width\` theme settings.
        * 
        * @support      chromium
        * @support      firefox
        * @support      safari
        * @support      edge
        * 
        ${Object.keys(widthObj).map((width) => {
    return ` * @cssClass             s-width:${width}            Apply the \`${width}\` width`;
  })}
        * 
        ${Object.keys(widthObj).map((width) => {
    return ` * @example         html        ${width}%
                *   <div class="s-bg:main s-radius:30">
                *      <div style="overflow:hidden" class="s-width:${width} s-text:center s-bg:accent s-p:30 s-radius:30">s-width:${width}</div>
                *   </div>`;
  }).join("\n")}
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
  vars.push(`/**
    * @name            s-width:viewport
    * @namespace        sugar.css.width
    * @type             CssClass
    * @platform         css
    * @status         beta
    * 
    * This class allows you to apply the "<yellow>viewport</yellow>" width to any HTMLElement
    * 
    * @example      html
    * <div class="s-container">
    *   <h1 class="s-typo:h1">Hello world</h1>
    *   <div class="s-width:viewport">
    *       <p class="s-typo:p">Something cool</p>
    *   </div>
    * </div>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
    */
   .s-width--viewport {
        position: relative;
        left: 50%;
        width: 100vw;
        transform: translate(-50%);
   }`);
  Object.keys(widthObj).forEach((name) => {
    vars.push(`/**
        * @name            s-width:${name}
        * @namespace        sugar.css.width
        * @type             CssClass
        * @platform         css
        * @status           beta
        * 
        * This class allows you to apply the "<yellow>${name}</yellow>" width to any HTMLElement
        * 
        * @example      html
        * <div class="s-container">
        *   <h1 class="s-typo:h1">Hello world</h1>
        *   <div class="s-width:${name}">
        *       <p class="s-typo:p">Something cool</p>
        *   </div>
        * </div>
        * 
        * @since        2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
      .s-width--${name} {
            width: ${widthObj[name]};
      }`);
  });
  return vars;
}
export {
  classes_default as default,
  postcssSugarPluginWidthClassesMixinInterface as interface
};
