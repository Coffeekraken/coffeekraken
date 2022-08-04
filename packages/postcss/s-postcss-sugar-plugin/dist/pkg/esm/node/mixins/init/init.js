import __SInterface from '@coffeekraken/s-interface';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
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
 * @example        css
 * \@sugar.init;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function ({ params, atRule, replaceWith, }) {
    const cssArray = [
        '@sugar.reset;',
        `@sugar.theme(${params.variant}, ${params.theme});`,
        '@sugar.font.faces;',
        '@sugar.lnf.selection;',
        // '@sugar.lnf.base;', called in the "@sugar.theme" mixin
    ];
    replaceWith(cssArray);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBRTFELE1BQU0scUNBQXNDLFNBQVEsWUFBWTtJQUM1RCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxjQUFjLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQzthQUM3QztZQUNELE9BQU8sRUFBRTtnQkFDTCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsY0FBYyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUM7YUFDL0M7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBQ0QsT0FBTyxFQUFFLHFDQUFxQyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRTlEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUNILE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixXQUFXLEdBS2Q7SUFDRyxNQUFNLFFBQVEsR0FBRztRQUNiLGVBQWU7UUFDZixnQkFBZ0IsTUFBTSxDQUFDLE9BQU8sS0FBSyxNQUFNLENBQUMsS0FBSyxJQUFJO1FBQ25ELG9CQUFvQjtRQUNwQix1QkFBdUI7UUFDdkIseURBQXlEO0tBQzVELENBQUM7SUFFRixXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDMUIsQ0FBQyJ9