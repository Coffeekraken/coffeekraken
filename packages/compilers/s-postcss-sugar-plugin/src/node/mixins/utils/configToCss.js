import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
/**
 * @name            configToCss
 * @namespace       node.mixins.utils
 * @type            PostcssMixin
 * @platform        css
 * @status          beta
 *
 * This mixin allows you to pass a theme config dot path that point to an object
 * and to print out the result as css properties.
 *
 * @feature         Support rhythmVertical property object
 * @feature         Support camel case properties like borderRadius
 * @feature         Support padding theme value as well as padding unit values
 * @feature         Support margin theme value as well as margin unit values
 * @feature         Support transition theme value as well as normal transition values
 * @feature         Support depth theme value
 * @feature         Support border radius theme value as well as normal border radius values
 * @feature
 *
 * @param           {String}            dotPath             The theme relative dot path to an object to output as css
 * @return          {Css}                                   The generated css
 *
 * @example         css
 * .my-cool-element {
 *      @sugar.utils.configToCss(ui.code);
 * }
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
    const configObj = __STheme.config(params.dotPath);
    const vars = [
        __STheme.jsObjectToCssProperties(configObj, {
            exclude: finalParams.exclude,
            only: finalParams.only,
        }),
    ];
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnVG9Dc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb25maWdUb0Nzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUU3Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E2Qkc7QUFFSCxNQUFNLDJDQUE0QyxTQUFRLFlBQVk7SUFDbEUsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILE9BQU8sRUFBRTtnQkFDTCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxRQUFRLEVBQUUsSUFBSTthQUNqQjtZQUNELE9BQU8sRUFBRTtnQkFDTCxJQUFJLEVBQUUsZUFBZTthQUN4QjtZQUNELElBQUksRUFBRTtnQkFDRixJQUFJLEVBQUUsZUFBZTthQUN4QjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFRRCxPQUFPLEVBQUUsMkNBQTJDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFcEUsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsR0FLZDtJQUNHLE1BQU0sV0FBVyxtQkFDYixPQUFPLEVBQUUsRUFBRSxFQUNYLE9BQU8sRUFBRSxFQUFFLEVBQ1gsSUFBSSxFQUFFLEVBQUUsSUFDTCxNQUFNLENBQ1osQ0FBQztJQUVGLGFBQWE7SUFDYixNQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUVsRCxNQUFNLElBQUksR0FBYTtRQUNuQixRQUFRLENBQUMsdUJBQXVCLENBQUMsU0FBUyxFQUFFO1lBQ3hDLE9BQU8sRUFBRSxXQUFXLENBQUMsT0FBTztZQUM1QixJQUFJLEVBQUUsV0FBVyxDQUFDLElBQUk7U0FDekIsQ0FBQztLQUNMLENBQUM7SUFFRixPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDIn0=