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
class postcssSugarPluginDisplayClassesInterface extends __SInterface {
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
  vars.comment(() => `
      /**
        * @name          Display
        * @namespace          sugar.css.helpers
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/display
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to apply the some display like \`inline\`, \`inline-block\`, \`block\`, etc...
        * on any HTMLElement
        * 
        * @support      chromium
        * @support      firefox
        * @support      safari
        * @support      edge
        * 
        * @cssClass                 s-display:block           Apply the display \`block\` to any HTMLElement
        * @cssClass                 s-display:inline-block           Apply the display \`inline-block\` to any HTMLElement
        * @cssClass                 s-display:contents           Apply the display \`contents\` to any HTMLElement
        * @cssClass                 s-display:flex           Apply the display \`flex\` to any HTMLElement
        * @cssClass                 s-display:grid           Apply the display \`grid\` to any HTMLElement
        * @cssClass                 s-display:inline-flex           Apply the display \`inline-flex\` to any HTMLElement
        * @cssClass                 s-display:inline-grid           Apply the display \`inline-grid\` to any HTMLElement
        * @cssClass                 s-display:none           Apply the display \`none\` to any HTMLElement
        * 
        * @example    html      Block
        *   <div class="s-display:block">
        *     <p class="s-typo:p">${__faker.name.findName()}</p>
        *     <p class="s-typo:p">${__faker.name.findName()}</p>
        *     <p class="s-typo:p">${__faker.name.findName()}</p>
        *   </div>
        * 
        * @example    html      Inline-block
        *   <div class="s-display:inline-block">
        *     <p class="s-typo:p">${__faker.name.findName()}</p>
        *     <p class="s-typo:p">${__faker.name.findName()}</p>
        *     <p class="s-typo:p">${__faker.name.findName()}</p>
        *   </div>
        * 
        * @example   html      Contents
        *   <div class="s-display:contents">
        *     <p class="s-typo:p">${__faker.name.findName()}</p>
        *     <p class="s-typo:p">${__faker.name.findName()}</p>
        *     <p class="s-typo:p">${__faker.name.findName()}</p>
        *   </div>
        * 
        * @example          html      Flex 
        *   <div class="s-display:flex">
        *     <p class="s-typo:p">${__faker.name.findName()}</p>
        *     <p class="s-typo:p">${__faker.name.findName()}</p>
        *     <p class="s-typo:p">${__faker.name.findName()}</p>
        *   </div>
        * 
        * @example          html      Grid
        *   <div class="s-display:grid">
        *     <p class="s-typo:p">${__faker.name.findName()}</p>
        *     <p class="s-typo:p">${__faker.name.findName()}</p>
        *     <p class="s-typo:p">${__faker.name.findName()}</p>
        *   </div>
        * 
        * @example          html      Inline-flex
        *   <div class="s-display:inline-flex">
        *     <p class="s-typo:p">${__faker.name.findName()}</p>
        *     <p class="s-typo:p">${__faker.name.findName()}</p>
        *     <p class="s-typo:p">${__faker.name.findName()}</p>
        *   </div>
        * 
        * @example         html      Inline-grid
        *   <div class="s-display:inline-grid">
        *     <p class="s-typo:p">${__faker.name.findName()}</p>
        *     <p class="s-typo:p">${__faker.name.findName()}</p>
        *     <p class="s-typo:p">${__faker.name.findName()}</p>
        *   </div>
        * 
        * @example     html      None
        *   <div class="s-display:none">
        *     <p class="s-typo:p">${__faker.name.findName()}</p>
        *     <p class="s-typo:p">${__faker.name.findName()}</p>
        *     <p class="s-typo:p">${__faker.name.findName()}</p>
        *   </div>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
  vars.comment(() => `
        
      /**
       * @name            s-display:block
       * @namespace       sugar.css.display
       * @type            CssClass
       * @platform        css
       * @status          beta
       * 
       * This class allows you to apply the value "<yellow>block</yellow>" to the display property on any HTMLElement
       * 
       * @example     html
       * <div class="s-display:block">
       *  Hello world
       * </div>
       * 
       * @since       2.0.0
       * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
       */
    `).code(`
      .s-display--block{
          display: block !important;
      }
    `);
  vars.comment(() => `
      /**
       * @name            s-display:inline-block
       * @namespace       sugar.css.display
       * @type            CssClass
       * @platform           css
       * @status               beta
       * 
       * This class allows you to apply the value "<yellow>inline-block</yellow>" to the display property on any HTMLElement
       * 
       * @example     html
       * <div class="s-display:inline-block">
       *  Hello world
       * </div>
       * 
       * @since       2.0.0
       * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
       */
    `).code(`
      .s-display--inline-block{
          display: inline-block !important;
      }
      `);
  vars.comment(() => `
        /**
         * @name            s-display:contents
         * @namespace       sugar.css.display
         * @type            CssClass
         * @platform           css
         * @status               beta
         * 
         * This class allows you to apply the value "<yellow>contents</yellow>" to the display property on any HTMLElement
         * 
         * @example     html
         * <div class="s-display:contents">
         *  Hello world
         * </div>
         * 
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
    `).code(`
      .s-display--contents{
          display: contents !important;
      }
      `);
  vars.comment(() => `
        /**
         * @name            s-display:flex
         * @namespace       sugar.css.display
         * @type            CssClass
         * @platform           css
         * @status               beta
         * 
         * This class allows you to apply the value "<yellow>flex</yellow>" to the display property on any HTMLElement
         * 
         * @example     html
         * <div class="s-display:flex">
         *  Hello world
         * </div>
         * 
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
    `).code(`
      .s-display--flex{
          display: flex !important;
      }
    `);
  vars.comment(() => `
      /**
       * @name            s-display:grid
       * @namespace       sugar.css.display
       * @type            CssClass
       * @platform           css
       * @status               beta
       * 
       * This class allows you to apply the value "<yellow>grid</yellow>" to the display property on any HTMLElement
       * 
       * @example     html
       * <div class="s-display:grid">
       *  Hello world
       * </div>
       * 
       * @since       2.0.0
       * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
       */
      `).code(`
      .s-display--grid{
          display: grid !important;
      }
      `);
  vars.comment(() => `
        /**
         * @name            s-display:inline-flex
         * @namespace       sugar.css.display
         * @type            CssClass
         * @platform           css
         * @status               beta
         * 
         * This class allows you to apply the value "<yellow>inline-flex</yellow>" to the display property on any HTMLElement
         * 
         * @example     html
         * <div class="s-display:inline-flex">
         *  Hello world
         * </div>
         * 
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
    `).code(`
      .s-display--inline-flex{
          display: inline-flex !important;
      }
      `);
  vars.comment(() => `
        /**
         * @name            s-display:inline-grid
         * @namespace       sugar.css.display
         * @type            CssClass
         * @platform           css
         * @status               beta
         * 
         * This class allows you to apply the value "<yellow>inline-grid</yellow>" to the display property on any HTMLElement
         * 
         * @example     html
         * <div class="s-display:inline-grid">
         *  Hello world
         * </div>
         * 
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
    `).code(`
      .s-display--inline-grid{
          display: inline-grid !important;
      }
      `);
  vars.comment(() => `
        /**
         * @name            s-display:none
         * @namespace       sugar.css.display
         * @type            CssClass
         * @platform           css
         * @status               beta
         * 
         * This class allows you to apply the value "<yellow>none</yellow>" to the display property on any HTMLElement
         * 
         * @example     html
         * <div class="s-display:none">
         *  Hello world
         * </div>
         * 
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        `).code(`
      .s-display--none{
          display: none !important;
      }
      `);
  return vars;
}
export {
  classes_default as default,
  postcssSugarPluginDisplayClassesInterface as interface
};
