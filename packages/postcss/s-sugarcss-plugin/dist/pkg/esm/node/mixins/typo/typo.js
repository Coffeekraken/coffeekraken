import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
/**
 * @name            typo
 * @as              @s.typo
 * @namespace       node.mixin.typo
 * @type            PostcssMixin
 * @platform        css
 * @status          beta
 *
 * This mixin allows you to apply a typo style to any of your element.
 *
 * @param           {String}            typo            The typo you want like "h1", "p" or all the typo defined in the themeTypo.config.ts config
 * @return          {Css}                                   The generated css
 *
 * @snippet         @s.link.stretch
 *
 * @example         css
 * .my-cool-element {
 *      @s.typo(h1);
 * }
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SSugarcssPluginTypoInterface extends __SInterface {
    static get _definition() {
        return {
            typo: {
                type: 'String',
                description: 'The typo you want. Can be any of the typos defined in the themeTypo config',
                required: true,
            },
        };
    }
}
export { SSugarcssPluginTypoInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }) {
    var _a;
    // @ts-ignore
    const finalParams = Object.assign({ typo: 'h1' }, params);
    const vars = new CssVars();
    const typosObj = __STheme.get('typo'), typoObj = typosObj[finalParams.typo], css = __STheme.jsObjectToCssProperties((_a = typoObj.style) !== null && _a !== void 0 ? _a : {}, {});
    vars.code(() => `
        ${css}
    `);
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBc0JHO0FBRUgsTUFBTSw0QkFBNkIsU0FBUSxZQUFZO0lBQ25ELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxJQUFJLEVBQUU7Z0JBQ0YsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsV0FBVyxFQUNQLDRFQUE0RTtnQkFDaEYsUUFBUSxFQUFFLElBQUk7YUFDakI7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBTUQsT0FBTyxFQUFFLDRCQUE0QixJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRXJELE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixPQUFPLEVBQ1AsV0FBVyxHQU1kOztJQUNHLGFBQWE7SUFDYixNQUFNLFdBQVcsbUJBQ2IsSUFBSSxFQUFFLElBQUksSUFDUCxNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7SUFFM0IsTUFBTSxRQUFRLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFDakMsT0FBTyxHQUFHLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEVBQ3BDLEdBQUcsR0FBRyxRQUFRLENBQUMsdUJBQXVCLENBQUMsTUFBQSxPQUFPLENBQUMsS0FBSyxtQ0FBSSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFFcEUsSUFBSSxDQUFDLElBQUksQ0FDTCxHQUFHLEVBQUUsQ0FBQztVQUNKLEdBQUc7S0FDUixDQUNBLENBQUM7SUFFRixPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDIn0=