"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
/**
 * @name           classes
 * @namespace      node.mixin.pointer
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin generate all the pointer helper classes like ```.s-pointer-events:none```, ```.s-pointer-events:all```, etc...
 *
 * @feature         Support these values (for now): none, all, auto and fill
 *
 * @return        {Css}         The generated css
 *
 * @snippet         @sugar.pointer.classes
 *
 * @example        css
 * \@sugar.pointer.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginPointerClassesInterface extends s_interface_1.default {
    static get _definition() {
        return {};
    }
}
exports.interface = postcssSugarPluginPointerClassesInterface;
function default_1({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const vars = new CssVars();
    vars.comment(() => `
      /**
        * @name          Pointer
        * @namespace          sugar.style.helpers
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/pointer
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to apply some pointer attributes on any HTMLElement.
        * 
        * @support          chromium
        * @support          firefox
        * @support          safari
        * @support          edge
        * 
        * @install          css
        * \\@sugar.pointer.classes;
        * 
        * @cssClass         s-pointer-events:none           Apply the pointer-events "none" attribute
        * @cssClass         s-pointer-events:all           Apply the pointer-events "all" attribute
        * @cssClass         s-pointer-events:auto           Apply the pointer-events "auto" attribute
        * @cssClass         s-pointer-events:fill           Apply the pointer-events "fill" attribute
        * 
        * @example        html          None
        * <div class="s-pointer-events:none">
        *   I'm in an "none" pointer-events container
        * </div>
        * 
        * @example        html          all
       * <div class="s-pointer-events:all">
       *   I'm in an "all" pointer-events container
       * </div>
       * 
       * @example        html          Auto
       * <div class="s-pointer-events:auto">
       *   I'm in an "auto" pointer-events container
       * </div>
       * 
       * @example        html          Fill
       * <div class="s-pointer-events:fill">
       *   I'm in an "fill" pointer-events container
       * </div>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
    vars.comment(() => `/**
    * @name          s-pointer-events:none
    * @namespace          sugar.style.pointer
    * @type               CssClass
    * @platform             css
    * @status             beta
    * 
    * This class allows you to apply a "<yellow>none</yellow>" pointer events style to any HTMLElement
    * 
    * @example        html
    * <div class="s-pointer-events\:none s-bg:accent">
    *     <div class="s-center-abs">I'm a cool overflow auto container</div>
    * </div>
    */
   `).code(`
    .s-pointer-events--none {
        pointer-events: none;
    }`, { type: 'CssClass' });
    vars.comment(() => `/**
    * @name          s-pointer-events:all
    * @namespace          sugar.style.pointer
    * @type               CssClass
    * @platform             css
    * @status             beta
    * 
    * This class allows you to apply a "<yellow>all</yellow>" pointer events style to any HTMLElement
    * 
    * @example        html
    * <div class="s-pointer-events\:all s-bg:accent">
    *     <div class="s-center-abs">I'm a cool overflow auto container</div>
    * </div>
    */
   `).code(`
    .s-pointer-events--all {
        pointer-events: all;
    }`, { type: 'CssClass' });
    vars.comment(() => `/**
    * @name          s-pointer-events:auto
    * @namespace          sugar.style.pointer
    * @type               CssClass
    * @platform             css
    * @status             beta
    * 
    * This class allows you to apply a "<yellow>auto</yellow>" pointer events style to any HTMLElement
    * 
    * @example        html
    * <div class="s-pointer-events\:auto s-bg:accent">
    *     <div class="s-center-abs">I'm a cool overflow auto container</div>
    * </div>
    */
   `).code(`
    .s-pointer-events--auto {
        pointer-events: auto;
    }`, { type: 'CssClass' });
    vars.comment(() => `/**
    * @name          s-pointer-events:fill
    * @namespace          sugar.style.pointer
    * @type               CssClass
    * @platform             css
    * @status             beta
    * 
    * This class allows you to apply a "<yellow>fill</yellow>" pointer events style to any HTMLElement
    * 
    * @example        html
    * <div class="s-pointer-events\:fill s-bg:accent">
    *     <div class="s-center-abs">I'm a cool overflow auto container</div>
    * </div>
    */
   `).code(`
    .s-pointer-events--fill {
        pointer-events: fill;
    }`, { type: 'CssClass' });
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUVyRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxNQUFNLHlDQUEwQyxTQUFRLHFCQUFZO0lBQ2hFLE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQztDQUNKO0FBSXFELDhEQUFTO0FBRS9ELG1CQUF5QixFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLE9BQU8sRUFDUCxXQUFXLEdBTWQ7SUFDRyxNQUFNLFdBQVcscUJBQ1YsTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLElBQUksR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO0lBRTNCLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBK0NULENBQ0EsQ0FBQztJQUVGLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7Ozs7Ozs7Ozs7Ozs7O0lBY1YsQ0FDQyxDQUFDLElBQUksQ0FDRjs7O01BR0YsRUFDRSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsQ0FDdkIsQ0FBQztJQUVGLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7Ozs7Ozs7Ozs7Ozs7O0lBY1YsQ0FDQyxDQUFDLElBQUksQ0FDRjs7O01BR0YsRUFDRSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsQ0FDdkIsQ0FBQztJQUVGLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7Ozs7Ozs7Ozs7Ozs7O0lBY1YsQ0FDQyxDQUFDLElBQUksQ0FDRjs7O01BR0YsRUFDRSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsQ0FDdkIsQ0FBQztJQUVGLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7Ozs7Ozs7Ozs7Ozs7O0lBY1YsQ0FDQyxDQUFDLElBQUksQ0FDRjs7O01BR0YsRUFDRSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsQ0FDdkIsQ0FBQztJQUVGLE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUM7QUFyS0QsNEJBcUtDIn0=