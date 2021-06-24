import __SInterface from '@coffeekraken/s-interface';
class postcssSugarPluginClassesMixinInterface extends __SInterface {
}
postcssSugarPluginClassesMixinInterface.definition = {};
export { postcssSugarPluginClassesMixinInterface as interface };
/**
 * @name           classes
 * @namespace      mixins.classes
 * @type           Mixin
 * @status        beta
 *
 * This mixin generate all the sugar classes like utilities for colors, fonts, margins, etc...
 *
 * @param       {String}        query       The query string like ">tablet", "<=desktop", etc...
 *
 * @example         postcss
 * \@sugar.Classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function ({ params, atRule, replaceWith }) {
    const cssArray = [
        '@sugar.ui.classes;',
        '@sugar.typo.classes;',
        '@sugar.layout.classes;',
        '@sugar.color.classes;',
        '@sugar.align.classes;',
        '@sugar.text.classes;',
        '@sugar.font.classes;',
        '@sugar.depth.classes;',
        '@sugar.flex.classes;',
        '@sugar.ratio.classes;',
        '@sugar.border.classes;',
        '@sugar.display.classes;',
        '@sugar.position.classes;',
        '@sugar.style.classes;',
        '@sugar.icon.classes;',
        '@sugar.space.classes;',
        '@sugar.width.classes;'
    ];
    replaceWith(cssArray);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFFckQsTUFBTSx1Q0FBd0MsU0FBUSxZQUFZOztBQUN6RCxrREFBVSxHQUFHLEVBQUUsQ0FBQztBQUV6QixPQUFPLEVBQUUsdUNBQXVDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFaEU7Ozs7Ozs7Ozs7Ozs7OztHQWVHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFO0lBRXRELE1BQU0sUUFBUSxHQUFhO1FBQ3pCLG9CQUFvQjtRQUNwQixzQkFBc0I7UUFDdEIsd0JBQXdCO1FBQ3hCLHVCQUF1QjtRQUN2Qix1QkFBdUI7UUFDdkIsc0JBQXNCO1FBQ3RCLHNCQUFzQjtRQUN0Qix1QkFBdUI7UUFDdkIsc0JBQXNCO1FBQ3RCLHVCQUF1QjtRQUN2Qix3QkFBd0I7UUFDeEIseUJBQXlCO1FBQ3pCLDBCQUEwQjtRQUMxQix1QkFBdUI7UUFDdkIsc0JBQXNCO1FBQ3RCLHVCQUF1QjtRQUN2Qix1QkFBdUI7S0FDeEIsQ0FBQztJQUVGLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUN4QixDQUFDIn0=