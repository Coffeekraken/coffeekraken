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
        '@sugar.typo.classes;',
        '@sugar.layout.classes;',
        '@sugar.clearfix.classes;',
        '@sugar.color.classes;',
        '@sugar.fit.classes;',
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
        '@sugar.icon.classes;',
        '@sugar.transition.classes;',
        '@sugar.margin.classes;',
        '@sugar.opacity.classes;',
        '@sugar.scale.classes;',
        '@sugar.padding.classes;',
        '@sugar.until.classes;',
        '@sugar.width.classes;',
        '@sugar.components.classes;',
    ];
    replaceWith(cssArray);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFFckQsTUFBTSx1Q0FBd0MsU0FBUSxZQUFZOztBQUN2RCxrREFBVSxHQUFHLEVBQUUsQ0FBQztBQUUzQixPQUFPLEVBQUUsdUNBQXVDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFaEU7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnQkc7QUFDSCxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUU7SUFDcEQsTUFBTSxRQUFRLEdBQWE7UUFDdkIsb0JBQW9CO1FBQ3BCLHNCQUFzQjtRQUN0Qix3QkFBd0I7UUFDeEIsMEJBQTBCO1FBQzFCLHVCQUF1QjtRQUN2QixxQkFBcUI7UUFDckIsdUJBQXVCO1FBQ3ZCLHNCQUFzQjtRQUN0QixzQkFBc0I7UUFDdEIsdUJBQXVCO1FBQ3ZCLDBCQUEwQjtRQUMxQixzQkFBc0I7UUFDdEIsdUJBQXVCO1FBQ3ZCLHdCQUF3QjtRQUN4Qix5QkFBeUI7UUFDekIsMEJBQTBCO1FBQzFCLDBCQUEwQjtRQUMxQix5QkFBeUI7UUFDekIsc0JBQXNCO1FBQ3RCLDRCQUE0QjtRQUM1Qix3QkFBd0I7UUFDeEIseUJBQXlCO1FBQ3pCLHVCQUF1QjtRQUN2Qix5QkFBeUI7UUFDekIsdUJBQXVCO1FBQ3ZCLHVCQUF1QjtRQUN2Qiw0QkFBNEI7S0FDL0IsQ0FBQztJQUVGLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUMxQixDQUFDIn0=