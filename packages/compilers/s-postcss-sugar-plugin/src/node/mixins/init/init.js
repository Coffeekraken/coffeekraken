import __SInterface from '@coffeekraken/s-interface';
import __sugarConfig from '@coffeekraken/s-sugar-config';
class postcssSugarPluginMediaMixinInterface extends __SInterface {
}
postcssSugarPluginMediaMixinInterface.definition = {};
export { postcssSugarPluginMediaMixinInterface as interface };
/**
 * @name           init
 * @namespace      mixins.init
 * @type           Mixin
 * @status        beta
 *
 * This mixin allows you to apply media queries depending on the ```media.config.js``` config
 * file with ease.
 *
 * @param       {String}        query       The query string like ">tablet", "<=desktop", etc...
 *
 * @example         postcss
 * \@sugar.init;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function ({ params, atRule, processNested }) {
    const themeConfig = __sugarConfig('theme');
    const cssArray = [
        `@sugar.theme(${themeConfig.baseTheme});`,
        '@sugar.reset;',
        '@sugar.layout.classes;',
        '@sugar.font.init;',
        '@sugar.font.classes;',
        '@sugar.color.docblocks;',
        '@sugar.color.classes;',
        '@sugar.size.classes;',
        '@sugar.depth.classes;',
        '@sugar.util.classes;'
    ];
    const AST = processNested(cssArray.join('\n'));
    atRule.replaceWith(AST);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5pdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImluaXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxhQUFhLE1BQU0sOEJBQThCLENBQUM7QUFFekQsTUFBTSxxQ0FBc0MsU0FBUSxZQUFZOztBQUN2RCxnREFBVSxHQUFHLEVBQUUsQ0FBQztBQUV6QixPQUFPLEVBQUUscUNBQXFDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFOUQ7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnQkc7QUFDSCxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3ZCLE1BQU0sRUFDTixNQUFNLEVBQ04sYUFBYSxFQUtkO0lBQ0MsTUFBTSxXQUFXLEdBQUcsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBRTNDLE1BQU0sUUFBUSxHQUFHO1FBQ2YsZ0JBQWdCLFdBQVcsQ0FBQyxTQUFTLElBQUk7UUFDekMsZUFBZTtRQUNmLHdCQUF3QjtRQUN4QixtQkFBbUI7UUFDbkIsc0JBQXNCO1FBQ3RCLHlCQUF5QjtRQUN6Qix1QkFBdUI7UUFDdkIsc0JBQXNCO1FBQ3RCLHVCQUF1QjtRQUN2QixzQkFBc0I7S0FDdkIsQ0FBQztJQUVGLE1BQU0sR0FBRyxHQUFHLGFBQWEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDL0MsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUMxQixDQUFDIn0=