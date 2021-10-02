import __SInterface from '@coffeekraken/s-interface';
class postcssSugarPluginClassesMixinInterface extends __SInterface {
}
postcssSugarPluginClassesMixinInterface.definition = {};
export { postcssSugarPluginClassesMixinInterface as interface };
/**
 * @name           classes
 * @namespace      node.mixins.classes
 * @type           PostcssMixin
 * @platform      css
 * @status        beta
 *
 * This mixin generate all the sugar classes like utilities for colors, fonts, margins, etc...
 *
 * @return        {Css}         The generated css for all the classes in the toolkit
 *
 * @example         postcss
 * \@sugar.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function ({ params, atRule, replaceWith }) {
    const cssArray = [
        '@sugar.ui.classes;',
        '@sugar.align.classes;',
        '@sugar.typo.classes;',
        '@sugar.layout.classes;',
        '@sugar.clearfix.classes;',
        '@sugar.color.classes;',
        '@sugar.fit.classes;',
        '@sugar.format.classes;',
        '@sugar.align.classes;',
        '@sugar.text.classes;',
        '@sugar.font.classes;',
        '@sugar.depth.classes;',
        '@sugar.disabled.classes;',
        '@sugar.flex.classes;',
        '@sugar.ratio.classes;',
        '@sugar.border.classes;',
        '@sugar.display.classes;',
        '@sugar.overflow.classes;',
        '@sugar.position.classes;',
        '@sugar.pointer.classes;',
        '@sugar.transition.classes;',
        '@sugar.margin.classes;',
        '@sugar.opacity.classes;',
        '@sugar.scale.classes;',
        '@sugar.padding.classes;',
        '@sugar.visibility.classes;',
        '@sugar.visually.classes;',
        '@sugar.truncate.classes;',
        '@sugar.until.classes;',
        '@sugar.width.classes;',
        '@sugar.components.classes;',
    ];
    replaceWith(cssArray);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFFckQsTUFBTSx1Q0FBd0MsU0FBUSxZQUFZOztBQUN2RCxrREFBVSxHQUFHLEVBQUUsQ0FBQztBQUUzQixPQUFPLEVBQUUsdUNBQXVDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFaEU7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnQkc7QUFDSCxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUU7SUFDcEQsTUFBTSxRQUFRLEdBQWE7UUFDdkIsb0JBQW9CO1FBQ3BCLHVCQUF1QjtRQUN2QixzQkFBc0I7UUFDdEIsd0JBQXdCO1FBQ3hCLDBCQUEwQjtRQUMxQix1QkFBdUI7UUFDdkIscUJBQXFCO1FBQ3JCLHdCQUF3QjtRQUN4Qix1QkFBdUI7UUFDdkIsc0JBQXNCO1FBQ3RCLHNCQUFzQjtRQUN0Qix1QkFBdUI7UUFDdkIsMEJBQTBCO1FBQzFCLHNCQUFzQjtRQUN0Qix1QkFBdUI7UUFDdkIsd0JBQXdCO1FBQ3hCLHlCQUF5QjtRQUN6QiwwQkFBMEI7UUFDMUIsMEJBQTBCO1FBQzFCLHlCQUF5QjtRQUN6Qiw0QkFBNEI7UUFDNUIsd0JBQXdCO1FBQ3hCLHlCQUF5QjtRQUN6Qix1QkFBdUI7UUFDdkIseUJBQXlCO1FBQ3pCLDRCQUE0QjtRQUM1QiwwQkFBMEI7UUFDMUIsMEJBQTBCO1FBQzFCLHVCQUF1QjtRQUN2Qix1QkFBdUI7UUFDdkIsNEJBQTRCO0tBQy9CLENBQUM7SUFFRixXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDMUIsQ0FBQyJ9