import __SInterface from '@coffeekraken/s-interface';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __STheme from '@coffeekraken/s-theme';
class postcssSugarPluginMediaMixinInterface extends __SInterface {
    static get _definition() {
        return {
            theme: {
                type: 'String',
                default: __SSugarConfig.get('theme.theme'),
            },
            variant: {
                type: 'String',
                default: __SSugarConfig.get('theme.variant'),
            },
        };
    }
}
export { postcssSugarPluginMediaMixinInterface as interface };
/**
 * @name           init
 * @namespace      node.mixin.init
 * @type           PostcssMixin
 * @platform      postcss
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
 * @snippet         @sugar.init
 *
 * @example        css
 * \@sugar.init;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function ({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({ theme: __STheme.theme, variant: __STheme.variant }, (params !== null && params !== void 0 ? params : {}));
    const cssArray = [
        '@sugar.reset;',
        `@sugar.theme.apply(${finalParams.variant}, ${finalParams.theme});`,
        '@sugar.font.faces;',
        '@sugar.lnf.selection;',
        // '@sugar.autoload;', // Check if it's a good idea or not...
        // '@sugar.lnf.base;', called in the "@sugar.theme" mixin
    ];
    replaceWith(cssArray);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBQzFELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDLE1BQU0scUNBQXNDLFNBQVEsWUFBWTtJQUM1RCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxjQUFjLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQzthQUM3QztZQUNELE9BQU8sRUFBRTtnQkFDTCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsY0FBYyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUM7YUFDL0M7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBQ0QsT0FBTyxFQUFFLHFDQUFxQyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRTlEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBc0JHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsR0FLZDtJQUNHLE1BQU0sV0FBVyxtQkFDYixLQUFLLEVBQUUsUUFBUSxDQUFDLEtBQUssRUFDckIsT0FBTyxFQUFFLFFBQVEsQ0FBQyxPQUFPLElBQ3RCLENBQUMsTUFBTSxhQUFOLE1BQU0sY0FBTixNQUFNLEdBQUksRUFBRSxDQUFDLENBQ3BCLENBQUM7SUFFRixNQUFNLFFBQVEsR0FBRztRQUNiLGVBQWU7UUFDZixzQkFBc0IsV0FBVyxDQUFDLE9BQU8sS0FBSyxXQUFXLENBQUMsS0FBSyxJQUFJO1FBQ25FLG9CQUFvQjtRQUNwQix1QkFBdUI7UUFDdkIsNkRBQTZEO1FBQzdELHlEQUF5RDtLQUM1RCxDQUFDO0lBRUYsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQzFCLENBQUMifQ==