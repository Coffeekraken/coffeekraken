import __SInterface from '@coffeekraken/s-interface';
class postcssSugarPluginUiClassesInterface extends __SInterface {
}
postcssSugarPluginUiClassesInterface.definition = {};
export { postcssSugarPluginUiClassesInterface as interface };
/**
 * @name           classes
 * @namespace      mixins.ui
 * @type           Mixin
 * @status        beta
 *
 * This mixin allows you to print all the ui classes like button, form, etc...
 *
 * @example         postcss
 * \@sugar.ui.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bospsel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function ({ params, atRule, replaceWith, }) {
    const cssArray = [
        '@sugar.ui.avatar.classes;',
        '@sugar.ui.badge.classes;',
        '@sugar.ui.blockquote.classes;',
        '@sugar.ui.button.classes;',
        '@sugar.ui.checkbox.classes;',
        '@sugar.ui.dropdown.classes;',
        '@sugar.ui.fsTree.classes;',
        '@sugar.ui.input.classes;',
        '@sugar.ui.label.classes;',
        '@sugar.ui.list.classes;',
        '@sugar.ui.loader.classes;',
        '@sugar.ui.tabs.classes;',
        '@sugar.ui.navbar.classes;',
        '@sugar.ui.radio.classes;',
        '@sugar.ui.range.classes;',
        '@sugar.ui.select.classes;',
        '@sugar.ui.switch.classes;',
        '@sugar.ui.table.classes;',
        '@sugar.ui.terminal.classes;',
        '@sugar.ui.tooltip.classes;',
    ];
    return cssArray;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFFckQsTUFBTSxvQ0FBcUMsU0FBUSxZQUFZOztBQUNwRCwrQ0FBVSxHQUFHLEVBQUUsQ0FBQztBQUUzQixPQUFPLEVBQUUsb0NBQW9DLElBQUksU0FBUyxFQUFFLENBQUM7QUFFN0Q7Ozs7Ozs7Ozs7Ozs7R0FhRztBQUNILE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixXQUFXLEdBS2Q7SUFDRyxNQUFNLFFBQVEsR0FBRztRQUNiLDJCQUEyQjtRQUMzQiwwQkFBMEI7UUFDMUIsK0JBQStCO1FBQy9CLDJCQUEyQjtRQUMzQiw2QkFBNkI7UUFDN0IsNkJBQTZCO1FBQzdCLDJCQUEyQjtRQUMzQiwwQkFBMEI7UUFDMUIsMEJBQTBCO1FBQzFCLHlCQUF5QjtRQUN6QiwyQkFBMkI7UUFDM0IseUJBQXlCO1FBQ3pCLDJCQUEyQjtRQUMzQiwwQkFBMEI7UUFDMUIsMEJBQTBCO1FBQzFCLDJCQUEyQjtRQUMzQiwyQkFBMkI7UUFDM0IsMEJBQTBCO1FBQzFCLDZCQUE2QjtRQUM3Qiw0QkFBNEI7S0FDL0IsQ0FBQztJQUVGLE9BQU8sUUFBUSxDQUFDO0FBQ3BCLENBQUMifQ==