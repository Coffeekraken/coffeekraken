import __SInterface from '@coffeekraken/s-interface';
import __SugarConfig from '@coffeekraken/s-sugar-config';
class postcssSugarPluginMediaMixinInterface extends __SInterface {
}
postcssSugarPluginMediaMixinInterface.definition = {
    theme: {
        type: 'String',
    },
};
export { postcssSugarPluginMediaMixinInterface as interface };
/**
 * @name           init
 * @namespace      mixins.init
 * @type           Mixin
 * @platform      css
 * @status        beta
 *
 * This mixin is the one you usually call first in your css.
 * His job is to:
 * - Apply a reset.css to standardize the display across browser
 * - Generate the base theme variables like colors, etc...
 * - Generate all the font-faces needed
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
    ];
    replaceWith(cssArray);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5pdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImluaXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxhQUFhLE1BQU0sOEJBQThCLENBQUM7QUFFekQsTUFBTSxxQ0FBc0MsU0FBUSxZQUFZOztBQUNyRCxnREFBVSxHQUFHO0lBQ2hCLEtBQUssRUFBRTtRQUNILElBQUksRUFBRSxRQUFRO0tBQ2pCO0NBQ0osQ0FBQztBQUVOLE9BQU8sRUFBRSxxQ0FBcUMsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUU5RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFDSCxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQXVEOztJQUN6RyxNQUFNLFdBQVcsR0FBRyxhQUFhLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBRS9DLE1BQU0sUUFBUSxHQUFHO1FBQ2IsZUFBZTtRQUNmLGdCQUFnQixNQUFBLE1BQU0sQ0FBQyxLQUFLLG1DQUFJLFdBQVcsQ0FBQyxLQUFLLElBQUk7UUFDckQsb0JBQW9CO1FBQ3BCLHlEQUF5RDtLQUM1RCxDQUFDO0lBRUYsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQzFCLENBQUMifQ==