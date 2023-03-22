import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
/**
 * @name            typo
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
 * @snippet         @sugar.link.stretch
 *
 * @example         css
 * .my-cool-element {
 *      @sugar.typo(h1);
 * }
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginTypoInterface extends __SInterface {
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
export { postcssSugarPluginTypoInterface as interface };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FxQkc7QUFFSCxNQUFNLCtCQUFnQyxTQUFRLFlBQVk7SUFDdEQsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILElBQUksRUFBRTtnQkFDRixJQUFJLEVBQUUsUUFBUTtnQkFDZCxXQUFXLEVBQ1AsNEVBQTRFO2dCQUNoRixRQUFRLEVBQUUsSUFBSTthQUNqQjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFNRCxPQUFPLEVBQUUsK0JBQStCLElBQUksU0FBUyxFQUFFLENBQUM7QUFFeEQsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLE9BQU8sRUFDUCxXQUFXLEdBTWQ7O0lBQ0csYUFBYTtJQUNiLE1BQU0sV0FBVyxtQkFDYixJQUFJLEVBQUUsSUFBSSxJQUNQLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztJQUUzQixNQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUNqQyxPQUFPLEdBQUcsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFDcEMsR0FBRyxHQUFHLFFBQVEsQ0FBQyx1QkFBdUIsQ0FBQyxNQUFBLE9BQU8sQ0FBQyxLQUFLLG1DQUFJLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUVwRSxJQUFJLENBQUMsSUFBSSxDQUNMLEdBQUcsRUFBRSxDQUFDO1VBQ0osR0FBRztLQUNSLENBQ0EsQ0FBQztJQUVGLE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUMifQ==