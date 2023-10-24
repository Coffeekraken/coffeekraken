"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
/**
 * @name           classes
 * @as          @s.group.classes
 * @namespace      node.mixin.group
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin generate all the group helper classes like s-group, etc...
 *
 * @return        {Css}         The generated css
 *
 * @snippet         @s.group.classes
 *
 * @example        css
 * @s.group.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginGroupClassesInterface extends s_interface_1.default {
    static get _definition() {
        return {};
    }
}
exports.interface = postcssSugarPluginGroupClassesInterface;
function default_1({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const vars = new CssVars();
    vars.comment(() => `
      /**
        * @name          Group
        * @namespace          sugar.style.helpers.group
        * @type               Styleguide
        * @menu           Styleguide / UI        /styleguide/ui/group
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to group elements like s-btn, s-input, etc...
        * Note that for this to work fine when direction is "rtl", you MUST specify the dir="rtl" attribute
        * on the html tag
        * 
        * @support          chromium
        * @support          firefox
        * @support          safari
        * @support          edge
        * 
        * @install          css
        * @s.group.classes;
        * 
        * @cssClass             s-group             Group some elements (button, inputs, etc...) together
        * 
        * @example       html       Button group
        * <span class="s-group">
        *   <a class="s-btn">I'm a cool block button</a>
        *   <a class="s-btn s-color:accent">+</a>
        * </span>
        * 
        * @example       html       Form input group
        * <span class="s-group s-color:accent">
        *   <input type="text" class="s-input" placeholder="Type something..." />
        *   <input type="text" class="s-input" placeholder="And something else..." />
        * </span>
        * 
        * @example       html       MIxed group
        * <span class="s-group s-color:accent">
        *   <input type="text" class="s-input" placeholder="Type something..." />
        *   <a class="s-btn">+</a>
        * </span>
        * 
        * @example       html           RTL support
        * <span class="s-group" dir="rtl">
        *   <a class="s-btn">I'm a cool block button</a>
        *   <a class="s-btn s-color:accent">+</a>
        * </span>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
    vars.comment(() => `/**
        * @name           s-group
        * @namespace          sugar.style.helpers.group
        * @type           CssClass
        * 
        * This class represent a(n) "<s-color="accent">group</s-color>" of buttons, form input, etc...
        * 
        * @example        html
        * <span class="s-group">
        *   <a class="s-btn-block">I'm a cool block button</a>
        *   <a class="s-btn-block">+</a>
        * </span>
        * 
        * @since    2.0.0
        * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
      */`);
    vars.code(`
      .s-group {
          display: flex !important;   
          flex-wrap: nowrap;
          vertical-align: top;
      }

     .s-group:not([dir="rtl"] .s-group):not(.s-group[dir="rtl"]) > * {

        &:not(:first-child):not(:last-child),
        &:not(:first-child):not(:last-child):before,
        &:not(:first-child):not(:last-child):after {
            border-radius: 0 !important;
        }
        &:first-child:not(:last-child),
        &:first-child:not(:last-child):before,
        &:first-child:not(:last-child):after {
            border-top-right-radius: 0 !important;
            border-bottom-right-radius: 0 !important;
        }
        &:last-child:not(:first-child),
        &:last-child:not(:first-child):before,
        &:last-child:not(:first-child):after {
            border-top-left-radius: 0 !important;
            border-bottom-left-radius: 0 !important;
        }
      }

     *[dir="rtl"] .s-group > *,
     .s-group[dir="rtl"] > * {

        &:not(:last-child):not(:first-child),
        &:not(:last-child):not(:first-child):before,
        &:not(:last-child):not(:first-child):after {
            border-radius: 0 !important;
        }
        &:last-child:not(:first-child),
        &:last-child:not(:first-child):before,
        &:last-child:not(:first-child):after {
            border-top-right-radius: 0 !important;
            border-bottom-right-radius: 0 !important;
        }
        &:first-child:not(:last-child),
        &:first-child:not(:last-child):before,
        &:first-child:not(:last-child):after {
            border-top-left-radius: 0 !important;
            border-bottom-left-radius: 0 !important;
        }
      }
    `, {
        type: 'CssClass',
    });
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUVyRDs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW1CRztBQUVILE1BQU0sdUNBQXdDLFNBQVEscUJBQVk7SUFDOUQsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDO0NBQ0o7QUFJbUQsNERBQVM7QUFFN0QsbUJBQXlCLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sT0FBTyxFQUNQLFdBQVcsR0FNZDtJQUNHLE1BQU0sV0FBVyxxQkFDVixNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7SUFFM0IsSUFBSSxDQUFDLE9BQU8sQ0FDUixHQUFHLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7S0FrRFQsQ0FDQSxDQUFDO0lBRUYsSUFBSSxDQUFDLE9BQU8sQ0FDUixHQUFHLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7O1NBZUwsQ0FDSixDQUFDO0lBQ0YsSUFBSSxDQUFDLElBQUksQ0FDTDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQWlESCxFQUNHO1FBQ0ksSUFBSSxFQUFFLFVBQVU7S0FDbkIsQ0FDSixDQUFDO0lBRUYsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQztBQWxKRCw0QkFrSkMifQ==