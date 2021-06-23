import __SInterface from '@coffeekraken/s-interface';
import __SugarConfig from '@coffeekraken/s-sugar-config';
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
export default function ({ params, atRule, replaceWith }) {
    var _a;
    const themeConfig = __SugarConfig.get('theme');
    const cssArray = [
        '@sugar.reset;',
        `@sugar.theme(${(_a = params.theme) !== null && _a !== void 0 ? _a : themeConfig.theme});`,
        '@sugar.font.faces;',
        // '@sugar.lnf.base;', called in the "@sugar.theme" mixin
        // '@sugar.color.docblocks;',
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
        '@sugar.space.classes;'
    ];
    replaceWith(cssArray);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5pdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImluaXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxhQUFhLE1BQU0sOEJBQThCLENBQUM7QUFFekQsTUFBTSxxQ0FBc0MsU0FBUSxZQUFZOztBQUN2RCxnREFBVSxHQUFHO0lBQ2xCLEtBQUssRUFBRTtRQUNMLElBQUksRUFBRSxRQUFRO0tBQ2Y7Q0FDRixDQUFDO0FBRUosT0FBTyxFQUFFLHFDQUFxQyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRTlEOzs7Ozs7Ozs7Ozs7Ozs7O0dBZ0JHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUN2QixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsRUFLWjs7SUFDQyxNQUFNLFdBQVcsR0FBRyxhQUFhLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBRS9DLE1BQU0sUUFBUSxHQUFHO1FBQ2YsZUFBZTtRQUNmLGdCQUFnQixNQUFBLE1BQU0sQ0FBQyxLQUFLLG1DQUFJLFdBQVcsQ0FBQyxLQUFLLElBQUk7UUFDckQsb0JBQW9CO1FBQ3BCLHlEQUF5RDtRQUN6RCw2QkFBNkI7UUFDN0Isb0JBQW9CO1FBQ3BCLHNCQUFzQjtRQUN0Qix3QkFBd0I7UUFDeEIsdUJBQXVCO1FBQ3ZCLHVCQUF1QjtRQUN2QixzQkFBc0I7UUFDdEIsc0JBQXNCO1FBQ3RCLHVCQUF1QjtRQUN2QixzQkFBc0I7UUFDdEIsdUJBQXVCO1FBQ3ZCLHdCQUF3QjtRQUN4Qix5QkFBeUI7UUFDekIsMEJBQTBCO1FBQzFCLHVCQUF1QjtRQUN2QixzQkFBc0I7UUFDdEIsdUJBQXVCO0tBQ3hCLENBQUM7SUFFRixXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDeEIsQ0FBQyJ9