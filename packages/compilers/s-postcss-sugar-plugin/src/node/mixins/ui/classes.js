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
export default function ({ params, atRule, replaceWith }) {
    const cssArray = [
        '@sugar.ui.avatar.classes;',
        '@sugar.ui.button.classes;',
        '@sugar.ui.input.classes;',
        '@sugar.ui.list.classes;',
        '@sugar.ui.tabs.classes;',
        '@sugar.ui.badge.classes;',
        '@sugar.ui.navbar.classes;',
        '@sugar.ui.select.classes;',
        '@sugar.ui.switch.classes;',
        '@sugar.ui.terminal.classes;',
        '@sugar.ui.tooltip.classes;'
    ];
    replaceWith(cssArray);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFFckQsTUFBTSxvQ0FBcUMsU0FBUSxZQUFZOztBQUN0RCwrQ0FBVSxHQUFHLEVBQUUsQ0FBQztBQUV6QixPQUFPLEVBQUUsb0NBQW9DLElBQUksU0FBUyxFQUFFLENBQUM7QUFFN0Q7Ozs7Ozs7Ozs7Ozs7R0FhRztBQUNILE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDdkIsTUFBTSxFQUNOLE1BQU0sRUFDTixXQUFXLEVBS1o7SUFDQyxNQUFNLFFBQVEsR0FBRztRQUNmLDJCQUEyQjtRQUMzQiwyQkFBMkI7UUFDM0IsMEJBQTBCO1FBQzFCLHlCQUF5QjtRQUN6Qix5QkFBeUI7UUFDekIsMEJBQTBCO1FBQzFCLDJCQUEyQjtRQUMzQiwyQkFBMkI7UUFDM0IsMkJBQTJCO1FBQzNCLDZCQUE2QjtRQUM3Qiw0QkFBNEI7S0FDN0IsQ0FBQztJQUVGLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUN4QixDQUFDIn0=