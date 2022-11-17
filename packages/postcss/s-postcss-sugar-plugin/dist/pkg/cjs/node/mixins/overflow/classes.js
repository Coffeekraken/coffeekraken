"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
/**
 * @name           classes
 * @namespace      node.mixin.overflow
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin generate all the overflow helper classes like ```.s-overflow:hidden```, ```.s-overflow:auto```, etc...
 *
 * @return        {Css}         The generated css
 *
 * @example        css
 * \@sugar.overflow.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginOverflowClassesInterface extends s_interface_1.default {
    static get _definition() {
        return {};
    }
}
exports.interface = postcssSugarPluginOverflowClassesInterface;
function default_1({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const vars = new CssVars();
    vars.comment(() => `
      /**
        * @name          Overflow
        * @namespace          sugar.style.helpers
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/overflow
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to apply some overflow attributes on any HTMLElement.
        * 
        * @support          chromium
        * @support          firefox
        * @support          safari
        * @support          edge
        * 
        * @install          css
        * \\@sugar.overflow.classes;
        * 
        * @cssClass         s-overflow:auto             Apply the "auto" overflow attribute
        * @cssClass         s-overflow:hidden             Apply the "hidden" overflow attribute
        * @cssClass         s-overflow:inherit             Apply the "inherit" overflow attribute
        * @cssClass         s-overflow:initial             Apply the "initial" overflow attribute
        * @cssClass         s-overflow:overlay             Apply the "overlay" overflow attribute
        * @cssClass         s-overflow:revert             Apply the "revert" overflow attribute
        * @cssClass         s-overflow:scroll             Apply the "scroll" overflow attribute
        * @cssClass         s-overflow:visible             Apply the "visible" overflow attribute
        * @cssClass         s-overflow:unset             Apply the "unset" overflow attribute
        * 
        * @example        html          Auto
        * <div class="s-overflow:auto">
        *   I'm in an "auto" overflow container
        * </div>
        * 
        * @example        html          Hidden
       * <div class="s-overflow:hidden">
       *   I'm in an "hidden" overflow container
       * </div>
       * 
       * @example        html          Inherit
       * <div class="s-overflow:inherit">
       *   I'm in an "inherit" overflow container
       * </div>
       * 
       * @example        html          Initial
       * <div class="s-overflow:initial">
       *   I'm in an "initial" overflow container
       * </div>
       * 
       * @example        html          Overlay
       * <div class="s-overflow:overlay">
       *   I'm in an "overlay" overflow container
       * </div>
       * 
       * @example        html          Revert
       * <div class="s-overflow:revert">
       *   I'm in an "revert" overflow container
       * </div>
       * 
       * @example        html          Scroll
       * <div class="s-overflow:scroll">
       *   I'm in an "scroll" overflow container
       * </div>
       * 
       * @example        html          Visible
       * <div class="s-overflow:visible">
       *   I'm in an "visible" overflow container
       * </div>
       * 
       * @example        html          Unset
       * <div class="s-overflow:unset">
       *   I'm in an "unset" overflow container
       * </div>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
    vars.comment(() => `/**
    * @name          s-overflow:auto
    * @namespace          sugar.style.overflow
    * @type               CssClass
    * @platform             css
    * @status             beta
    * 
    * This class allows you to apply a "<yellow>auto</yellow>" overflow style to any HTMLElement
    * 
    * @example        html
    * <div class="s-overflow:hidden s-bg:accent">
    *     <div class="s-center-abs">I'm a cool overflow auto container</div>
    * </div>
    */
    `).code(`
    .s-overflow--auto {
        overflow: auto;
    }`, { type: 'CssClass' });
    vars.comment(() => `/**
    * @name          s-overflow:hidden
    * @namespace          sugar.style.overflow
    * @type               CssClass
    * @platform             css
    * @status             beta
    * 
    * This class allows you to apply a "<yellow>hidden</yellow>" overflow style to any HTMLElement
    * 
    * @example        html
    * <div class="s-overflow:hidden s-bg:accent">
    *     <div class="s-center-abs">I'm a cool overflow hidden container</div>
    * </div>
    */
    `).code(`
    .s-overflow--hidden {
        overflow: hidden;
    }`, { type: 'CssClass' });
    vars.comment(() => `/**
    * @name          s-overflow:inherit
    * @namespace          sugar.style.overflow
    * @type               CssClass
    * @platform             css
    * @status             beta
    * 
    * This class allows you to apply a "<yellow>inherit</yellow>" overflow style to any HTMLElement
    * 
    * @example        html
    * <div class="s-overflow:hidden s-bg:accent">
    *     <div class="s-center-abs">I'm a cool overflow inherit container</div>
    * </div>
    */
    `).code(`
    .s-overflow--inherit {
        overflow: inherit;
    }`, { type: 'CssClass' });
    vars.comment(() => `/**
    * @name          s-overflow:initial
    * @namespace          sugar.style.overflow
    * @type               CssClass
    * @platform             css
    * @status             beta
    * 
    * This class allows you to apply a "<yellow>initial</yellow>" overflow style to any HTMLElement
    * 
    * @example        html
    * <div class="s-overflow:hidden s-bg:accent">
    *     <div class="s-center-abs">I'm a cool overflow initial container</div>
    * </div>
    */
    `).code(`
    .s-overflow--initial {
        overflow: initial;
    }`, { type: 'CssClass' });
    vars.comment(() => `/**
    * @name          s-overflow:overlay
    * @namespace          sugar.style.overflow
    * @type               CssClass
    * @platform             css
    * @status             beta
    * 
    * This class allows you to apply a "<yellow>overlay</yellow>" overflow style to any HTMLElement
    * 
    * @example        html
    * <div class="s-overflow:hidden s-bg:accent">
    *     <div class="s-center-abs">I'm a cool overflow overlay container</div>
    * </div>
    */
    `).code(`
    .s-overflow--overlay {
        overflow: overlay;
    }`, { type: 'CssClass' });
    vars.comment(() => `/**
    * @name          s-overflow:revert
    * @namespace          sugar.style.overflow
    * @type               CssClass
    * @platform             css
    * @status             beta
    * 
    * This class allows you to apply a "<yellow>revert</yellow>" overflow style to any HTMLElement
    * 
    * @example        html
    * <div class="s-overflow:hidden s-bg:accent">
    *     <div class="s-center-abs">I'm a cool overflow revert container</div>
    * </div>
    */
    `).code(`
    .s-overflow--revert {
        overflow: revert;
    }`, { type: 'CssClass' });
    vars.comment(() => `/**
    * @name          s-overflow:scroll
    * @namespace          sugar.style.overflow
    * @type               CssClass
    * @platform             css
    * @status             beta
    * 
    * This class allows you to apply a "<yellow>scroll</yellow>" overflow style to any HTMLElement
    * 
    * @example        html
    * <div class="s-overflow:hidden s-bg:accent">
    *     <div class="s-center-abs">I'm a cool overflow scroll container</div>
    * </div>
    */
    `).code(`
    .s-overflow--scroll {
        overflow: scroll;
    }`, { type: 'CssClass' });
    vars.comment(() => `/**
    * @name          s-overflow:visible
    * @namespace          sugar.style.overflow
    * @type               CssClass
    * @platform             css
    * @status             beta
    * 
    * This class allows you to apply a "<yellow>visible</yellow>" overflow style to any HTMLElement
    * 
    * @example        html
    * <div class="s-overflow:hidden s-bg:accent">
    *     <div class="s-center-abs">I'm a cool overflow visible container</div>
    * </div>
    */
    `).code(`
    .s-overflow--visible {
        overflow: visible;
    }`, { type: 'CssClass' });
    vars.comment(() => `/**
    * @name          s-overflow:unset
    * @namespace          sugar.style.overflow
    * @type               CssClass
    * @platform             css
    * @status             beta
    * 
    * This class allows you to apply a "<yellow>unset</yellow>" overflow style to any HTMLElement
    * 
    * @example        html
    * <div class="s-overflow:hidden s-bg:accent">
    *     <div class="s-center-abs">I'm a cool overflow unset container</div>
    * </div>
    */
    `).code(`
    .s-overflow--unset {
        overflow: unset;
    }`, { type: 'CssClass' });
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUVyRDs7Ozs7Ozs7Ozs7Ozs7OztHQWdCRztBQUVILE1BQU0sMENBQTJDLFNBQVEscUJBQVk7SUFDakUsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDO0NBQ0o7QUFJc0QsK0RBQVM7QUFFaEUsbUJBQXlCLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sT0FBTyxFQUNQLFdBQVcsR0FNZDtJQUNHLE1BQU0sV0FBVyxxQkFDVixNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7SUFFM0IsSUFBSSxDQUFDLE9BQU8sQ0FDUixHQUFHLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7S0E2RVQsQ0FDQSxDQUFDO0lBRUYsSUFBSSxDQUFDLE9BQU8sQ0FDUixHQUFHLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7S0FjVCxDQUNBLENBQUMsSUFBSSxDQUNGOzs7TUFHRixFQUNFLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxDQUN2QixDQUFDO0lBRUYsSUFBSSxDQUFDLE9BQU8sQ0FDUixHQUFHLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7S0FjVCxDQUNBLENBQUMsSUFBSSxDQUNGOzs7TUFHRixFQUNFLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxDQUN2QixDQUFDO0lBRUYsSUFBSSxDQUFDLE9BQU8sQ0FDUixHQUFHLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7S0FjVCxDQUNBLENBQUMsSUFBSSxDQUNGOzs7TUFHRixFQUNFLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxDQUN2QixDQUFDO0lBRUYsSUFBSSxDQUFDLE9BQU8sQ0FDUixHQUFHLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7S0FjVCxDQUNBLENBQUMsSUFBSSxDQUNGOzs7TUFHRixFQUNFLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxDQUN2QixDQUFDO0lBRUYsSUFBSSxDQUFDLE9BQU8sQ0FDUixHQUFHLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7S0FjVCxDQUNBLENBQUMsSUFBSSxDQUNGOzs7TUFHRixFQUNFLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxDQUN2QixDQUFDO0lBRUYsSUFBSSxDQUFDLE9BQU8sQ0FDUixHQUFHLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7S0FjVCxDQUNBLENBQUMsSUFBSSxDQUNGOzs7TUFHRixFQUNFLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxDQUN2QixDQUFDO0lBRUYsSUFBSSxDQUFDLE9BQU8sQ0FDUixHQUFHLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7S0FjVCxDQUNBLENBQUMsSUFBSSxDQUNGOzs7TUFHRixFQUNFLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxDQUN2QixDQUFDO0lBRUYsSUFBSSxDQUFDLE9BQU8sQ0FDUixHQUFHLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7S0FjVCxDQUNBLENBQUMsSUFBSSxDQUNGOzs7TUFHRixFQUNFLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxDQUN2QixDQUFDO0lBRUYsSUFBSSxDQUFDLE9BQU8sQ0FDUixHQUFHLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7S0FjVCxDQUNBLENBQUMsSUFBSSxDQUNGOzs7TUFHRixFQUNFLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxDQUN2QixDQUFDO0lBRUYsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQztBQTNURCw0QkEyVEMifQ==