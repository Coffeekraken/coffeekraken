import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
/**
 * @__name            configToCss
 * @__namespace       node.mixin.utils
 * @__type            PostcssMixin
 * @__interface       ./configToCss
 * @__platform        css
 * @__status          wip
 *
 * This mixin allows you to pass a theme config dot path that point to an object
 * and to print out the result as css properties.
 *
 * @__feature         Support rhythmVertical property object
 * @__feature         Support camel case properties like borderRadius
 * @__feature         Support padding theme value as well as padding unit values
 * @__feature         Support margin theme value as well as margin unit values
 * @__feature         Support transition theme value as well as normal transition values
 * @__feature         Support depth theme value
 * @__feature         Support border radius theme value as well as normal border radius values
 * @__feature
 *
 * @__param           {String}            dotPath             The theme relative dot path to an object to output as css
 * @__return          {Css}                                   The generated css
 *
 * @__example         css
 * .my-cool-element {
 *      @s.utils.configToCss(ui.code);
 * }
 *
 * @__since           2.0.0
 * @__author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginUtilsConfigToCssInterface extends __SInterface {
    static get _definition() {
        return {
            dotPath: {
                type: 'String',
                required: true,
            },
            exclude: {
                type: 'Array<String>',
            },
            only: {
                type: 'Array<String>',
            },
        };
    }
}
export { postcssSugarPluginUtilsConfigToCssInterface as interface };
export default function ({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({ dotPath: '', exclude: [], only: [] }, params);
    // @ts-ignore
    const configObj = __STheme.get(params.dotPath);
    const vars = [
        __STheme.jsObjectToCssProperties(configObj, {
            exclude: finalParams.exclude,
            only: finalParams.only,
        }),
    ];
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E4Qkc7QUFFSCxNQUFNLDJDQUE0QyxTQUFRLFlBQVk7SUFDbEUsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILE9BQU8sRUFBRTtnQkFDTCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxRQUFRLEVBQUUsSUFBSTthQUNqQjtZQUNELE9BQU8sRUFBRTtnQkFDTCxJQUFJLEVBQUUsZUFBZTthQUN4QjtZQUNELElBQUksRUFBRTtnQkFDRixJQUFJLEVBQUUsZUFBZTthQUN4QjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFRRCxPQUFPLEVBQUUsMkNBQTJDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFcEUsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsR0FLZDtJQUNHLE1BQU0sV0FBVyxtQkFDYixPQUFPLEVBQUUsRUFBRSxFQUNYLE9BQU8sRUFBRSxFQUFFLEVBQ1gsSUFBSSxFQUFFLEVBQUUsSUFDTCxNQUFNLENBQ1osQ0FBQztJQUVGLGFBQWE7SUFDYixNQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUUvQyxNQUFNLElBQUksR0FBYTtRQUNuQixRQUFRLENBQUMsdUJBQXVCLENBQUMsU0FBUyxFQUFFO1lBQ3hDLE9BQU8sRUFBRSxXQUFXLENBQUMsT0FBTztZQUM1QixJQUFJLEVBQUUsV0FBVyxDQUFDLElBQUk7U0FDekIsQ0FBQztLQUNMLENBQUM7SUFFRixPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDIn0=