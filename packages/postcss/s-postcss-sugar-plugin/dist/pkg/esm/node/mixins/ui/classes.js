import __SInterface from '@coffeekraken/s-interface';
class postcssSugarPluginUiClassesInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}
export { postcssSugarPluginUiClassesInterface as interface };
/**
 * @name           classes
 * @as              @s.ui.classes
 * @namespace      node.mixin.ui
 * @type           Mixin
 * @status        beta
 *
 * This mixin allows you to print all the ui classes like button, form, etc...
 *
 * @snippet         @s.ui.classes
 *
 * @example        css
 * @s.ui.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bospsel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function ({ params, atRule, replaceWith, }) {
    const cssArray = [
        '@s.ui.avatar.classes;',
        '@s.ui.backdrop.classes;',
        '@s.ui.badge.classes;',
        '@s.ui.blockquote.classes;',
        '@s.ui.button.classes;',
        '@s.ui.checkbox.classes;',
        '@s.ui.dropdown.classes;',
        '@s.ui.fsTree.classes;',
        '@s.ui.input.classes;',
        '@s.ui.inputContainer.classes;',
        '@s.ui.label.classes;',
        '@s.ui.list.classes;',
        '@s.ui.loader.classes;',
        '@s.ui.media.classes;',
        '@s.ui.radio.classes;',
        '@s.ui.range.classes;',
        '@s.ui.select.classes;',
        '@s.ui.switch.classes;',
        '@s.ui.table.classes;',
        '@s.ui.tabs.classes;',
        '@s.ui.toggle.classes;',
        '@s.ui.tooltip.classes;',
    ];
    return cssArray;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJELE1BQU0sb0NBQXFDLFNBQVEsWUFBWTtJQUMzRCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7Q0FDSjtBQUNELE9BQU8sRUFBRSxvQ0FBb0MsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUU3RDs7Ozs7Ozs7Ozs7Ozs7OztHQWdCRztBQUNILE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixXQUFXLEdBS2Q7SUFDRyxNQUFNLFFBQVEsR0FBRztRQUNiLHVCQUF1QjtRQUN2Qix5QkFBeUI7UUFDekIsc0JBQXNCO1FBQ3RCLDJCQUEyQjtRQUMzQix1QkFBdUI7UUFDdkIseUJBQXlCO1FBQ3pCLHlCQUF5QjtRQUN6Qix1QkFBdUI7UUFDdkIsc0JBQXNCO1FBQ3RCLCtCQUErQjtRQUMvQixzQkFBc0I7UUFDdEIscUJBQXFCO1FBQ3JCLHVCQUF1QjtRQUN2QixzQkFBc0I7UUFDdEIsc0JBQXNCO1FBQ3RCLHNCQUFzQjtRQUN0Qix1QkFBdUI7UUFDdkIsdUJBQXVCO1FBQ3ZCLHNCQUFzQjtRQUN0QixxQkFBcUI7UUFDckIsdUJBQXVCO1FBQ3ZCLHdCQUF3QjtLQUMzQixDQUFDO0lBRUYsT0FBTyxRQUFRLENBQUM7QUFDcEIsQ0FBQyJ9