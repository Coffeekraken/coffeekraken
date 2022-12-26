import __SInterface from '@coffeekraken/s-interface';
class postcssSugarPluginUiClassesInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}
export { postcssSugarPluginUiClassesInterface as interface };
/**
 * @name           classes
 * @namespace      node.mixin.ui
 * @type           Mixin
 * @status        beta
 *
 * This mixin allows you to print all the ui classes like button, form, etc...
 *
 * @example        css
 * @sugar.ui.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bospsel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function ({ params, atRule, replaceWith, }) {
    const cssArray = [
        '@sugar.ui.avatar.classes;',
        '@sugar.ui.backdrop.classes;',
        '@sugar.ui.badge.classes;',
        '@sugar.ui.blockquote.classes;',
        '@sugar.ui.button.classes;',
        '@sugar.ui.checkbox.classes;',
        '@sugar.ui.dropdown.classes;',
        '@sugar.ui.fsTree.classes;',
        '@sugar.ui.input.classes;',
        '@sugar.ui.inputContainer.classes;',
        '@sugar.ui.label.classes;',
        '@sugar.ui.list.classes;',
        '@sugar.ui.loader.classes;',
        '@sugar.ui.radio.classes;',
        '@sugar.ui.range.classes;',
        '@sugar.ui.select.classes;',
        '@sugar.ui.switch.classes;',
        '@sugar.ui.table.classes;',
        '@sugar.ui.tabs.classes;',
        '@sugar.ui.toggle.classes;',
        '@sugar.ui.tooltip.classes;',
        // from @coffeekraken/sugar package
        '@sugar.ui.card.classes;',
        '@sugar.ui.menu.classes;',
    ];
    return cssArray;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJELE1BQU0sb0NBQXFDLFNBQVEsWUFBWTtJQUMzRCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7Q0FDSjtBQUNELE9BQU8sRUFBRSxvQ0FBb0MsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUU3RDs7Ozs7Ozs7Ozs7OztHQWFHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsR0FLZDtJQUNHLE1BQU0sUUFBUSxHQUFHO1FBQ2IsMkJBQTJCO1FBQzNCLDZCQUE2QjtRQUM3QiwwQkFBMEI7UUFDMUIsK0JBQStCO1FBQy9CLDJCQUEyQjtRQUMzQiw2QkFBNkI7UUFDN0IsNkJBQTZCO1FBQzdCLDJCQUEyQjtRQUMzQiwwQkFBMEI7UUFDMUIsbUNBQW1DO1FBQ25DLDBCQUEwQjtRQUMxQix5QkFBeUI7UUFDekIsMkJBQTJCO1FBQzNCLDBCQUEwQjtRQUMxQiwwQkFBMEI7UUFDMUIsMkJBQTJCO1FBQzNCLDJCQUEyQjtRQUMzQiwwQkFBMEI7UUFDMUIseUJBQXlCO1FBQ3pCLDJCQUEyQjtRQUMzQiw0QkFBNEI7UUFDNUIsbUNBQW1DO1FBQ25DLHlCQUF5QjtRQUN6Qix5QkFBeUI7S0FDNUIsQ0FBQztJQUVGLE9BQU8sUUFBUSxDQUFDO0FBQ3BCLENBQUMifQ==