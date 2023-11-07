"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const faker_1 = __importDefault(require("faker"));
/**
 * @name           classes
 * @as              @s.whiteSpace.classes
 * @namespace      node.mixin.visibility
 * @type           PostcssMixin
 * @platform      postcss
 * @interface       ./classes
 * @status        stable
 *
 * This mixin generate all the overflow helper classes like ```.s-visibility:hidden```, etc...
 *
 * @return        {Css}         The generated css
 *
 * @snippet         @s.whiteSpace.classes
 *
 * @example        css
 * @s.visibility.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SSugarcssPluginWrapClassesInterface extends s_interface_1.default {
    static get _definition() {
        return {};
    }
}
exports.interface = SSugarcssPluginWrapClassesInterface;
function default_1({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const vars = new CssVars();
    vars.comment(`
      /**
        * @name          White space
        * @namespace          sugar.style.helpers.whiteSpace
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/white-space
        * @platform       css
        * @status       stable
        * 
        * These classes allows you to apply some white-space style on any HTMLElement
        * 
        * @support          chromium
        * @support          firefox
        * @support          safari
        * @support          edge
        * 
        * @install          css
        * @s.whiteSpace.classes;
        * 
        * @cssClass         s-white-space:wrap             Apply the \`white-space\` to \`wrap\`
        * @cssClass         s-white-space:nowrap             Apply the \`white-space\` to \`nowrap\`
        * @cssClass         s-white-space:break-spaces             Apply the \`white-space\` to \`break-spaces\`
        * @cssClass         s-white-space:normal             Apply the \`white-space\` to \`normal\`
        * @cssClass         s-white-space:pre             Apply the \`white-space\` to \`pre\`
        * @cssClass         s-white-space:pre-line             Apply the \`white-space\` to \`pre-line\`
        * @cssClass         s-white-space:pre-wrap             Apply the \`white-space\` to \`pre-wrap\`
        * @cssClass         s-white-space:revert             Apply the \`white-space\` to \`revert\`
        * @cssClass         s-white-space:unset             Apply the \`white-space\` to \`unset\`
        * 
        * @example        html          Wrap
        *   <p class="s-white-space:wrap">
        *       ${faker_1.default.lorem.paragraph()}
        *   </p>
        * 
        * @example      html            Nowrap
        *   <p class="s-white-space:nowrap">
        *       ${faker_1.default.lorem.paragraph()}
        *   </p>
        * 
        * @example          html            Break spaces
        *   <p class="s-white-space:break-spaces">
        *       ${faker_1.default.lorem.paragraph()}
        *   </p>
        * 
        * @example          html                Normal
        *   <p class="s-white-space:normal">
        *       ${faker_1.default.lorem.paragraph()}
        *   </p>
        * 
        * @example      html            Pre
        *   <p class="s-white-space:pre">
        *       ${faker_1.default.lorem.paragraph()}
        *   </p>
        * 
        * @example      html            Pre-line
        *   <p class="s-white-space:pre-line">
        *       ${faker_1.default.lorem.paragraph()}
        *   </p>
        * 
        * @example      html            Pre-wrap
        *   <p class="s-white-space:pre-wrap">
        *       ${faker_1.default.lorem.paragraph()}
        *   </p>
        * 
        * @example          html            Revert
        *   <p class="s-white-space:revert">
        *       ${faker_1.default.lorem.paragraph()}
        *   </p>
        * 
        * @example          html                Unset
        *   <p class="s-white-space:unset">
        *       ${faker_1.default.lorem.paragraph()}
        *   </p>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
    [
        'wrap',
        'nowrap',
        'break-spaces',
        'normal',
        'pre',
        'pre-line',
        'pre-wrap',
        'revert',
        'unset',
    ].forEach((value) => {
        vars.comment(`/**
    * @name          s-white-space:${value}
    * @namespace          sugar.style.helpers.whiteSpace
    * @type               CssClass
    * @platform             css
    * @status             stable
    * 
    * This class allows you to apply a "<yellow>${value}</yellow>" white-space style to any HTMLElement
    * 
    * @example        html
    * <div class="s-white-space:${value}">${faker_1.default.lorem.paragraph()}</div>
    */
   `).code(`
    .s-white-space-${value} {
        white-space: ${value};
    }`, { type: 'CssClass' });
    });
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUVyRCxrREFBNEI7QUFFNUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsTUFBTSxtQ0FBb0MsU0FBUSxxQkFBWTtJQUMxRCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7Q0FDSjtBQUkrQyx3REFBUztBQUV6RCxtQkFBeUIsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixPQUFPLEVBQ1AsV0FBVyxHQU1kO0lBQ0csTUFBTSxXQUFXLHFCQUNWLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztJQUUzQixJQUFJLENBQUMsT0FBTyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2tCQStCQyxlQUFPLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRTs7Ozs7a0JBS3pCLGVBQU8sQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFOzs7OztrQkFLekIsZUFBTyxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUU7Ozs7O2tCQUt6QixlQUFPLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRTs7Ozs7a0JBS3pCLGVBQU8sQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFOzs7OztrQkFLekIsZUFBTyxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUU7Ozs7O2tCQUt6QixlQUFPLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRTs7Ozs7a0JBS3pCLGVBQU8sQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFOzs7OztrQkFLekIsZUFBTyxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUU7Ozs7OztLQU10QyxDQUFDLENBQUM7SUFFSDtRQUNJLE1BQU07UUFDTixRQUFRO1FBQ1IsY0FBYztRQUNkLFFBQVE7UUFDUixLQUFLO1FBQ0wsVUFBVTtRQUNWLFVBQVU7UUFDVixRQUFRO1FBQ1IsT0FBTztLQUNWLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7UUFDaEIsSUFBSSxDQUFDLE9BQU8sQ0FDUjtxQ0FDeUIsS0FBSzs7Ozs7O2tEQU1RLEtBQUs7OztrQ0FHckIsS0FBSyxLQUFLLGVBQU8sQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFOztJQUVqRSxDQUNLLENBQUMsSUFBSSxDQUNGO3FCQUNTLEtBQUs7dUJBQ0gsS0FBSztNQUN0QixFQUNNLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxDQUN2QixDQUFDO0lBQ04sQ0FBQyxDQUFDLENBQUM7SUFFSCxPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDO0FBbklELDRCQW1JQyJ9