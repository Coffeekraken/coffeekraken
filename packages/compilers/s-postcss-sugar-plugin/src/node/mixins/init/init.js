import __SInterface from '@coffeekraken/s-interface';
import __sugarConfig from '@coffeekraken/s-sugar-config';
class postcssSugarPluginMediaMixinInterface extends __SInterface {
}
postcssSugarPluginMediaMixinInterface.definition = {
    theme: {
        type: 'String'
    }
};
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
    var _a;
    const themeConfig = __sugarConfig('theme');
    const cssArray = [
        `@sugar.theme(${(_a = params.theme) !== null && _a !== void 0 ? _a : themeConfig.theme});`,
        '@sugar.reset;',
        '@sugar.font.faces;',
        '@sugar.font.classes;',
        '@sugar.lnf.base;',
        '@sugar.color.docblocks;',
        '@sugar.layout.classes;',
        '@sugar.color.classes;',
        '@sugar.align.classes;',
        '@sugar.space.classes;',
        '@sugar.size.classes;',
        '@sugar.depth.classes;',
        '@sugar.util.classes;',
        '@sugar.style.classes;'
    ];
    const AST = processNested(cssArray.join('\n'));
    atRule.replaceWith(AST);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5pdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImluaXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxhQUFhLE1BQU0sOEJBQThCLENBQUM7QUFFekQsTUFBTSxxQ0FBc0MsU0FBUSxZQUFZOztBQUN2RCxnREFBVSxHQUFHO0lBQ2xCLEtBQUssRUFBRTtRQUNMLElBQUksRUFBRSxRQUFRO0tBQ2Y7Q0FDRixDQUFDO0FBRUosT0FBTyxFQUFFLHFDQUFxQyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRTlEOzs7Ozs7Ozs7Ozs7Ozs7O0dBZ0JHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUN2QixNQUFNLEVBQ04sTUFBTSxFQUNOLGFBQWEsRUFLZDs7SUFDQyxNQUFNLFdBQVcsR0FBRyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7SUFFM0MsTUFBTSxRQUFRLEdBQUc7UUFDZixnQkFBZ0IsTUFBQSxNQUFNLENBQUMsS0FBSyxtQ0FBSSxXQUFXLENBQUMsS0FBSyxJQUFJO1FBQ3JELGVBQWU7UUFDZixvQkFBb0I7UUFDcEIsc0JBQXNCO1FBQ3RCLGtCQUFrQjtRQUNsQix5QkFBeUI7UUFDekIsd0JBQXdCO1FBQ3hCLHVCQUF1QjtRQUN2Qix1QkFBdUI7UUFDdkIsdUJBQXVCO1FBQ3ZCLHNCQUFzQjtRQUN0Qix1QkFBdUI7UUFDdkIsc0JBQXNCO1FBQ3RCLHVCQUF1QjtLQUN4QixDQUFDO0lBRUYsTUFBTSxHQUFHLEdBQUcsYUFBYSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUMvQyxNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzFCLENBQUMifQ==