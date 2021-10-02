import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../utils/theme';
import __jsObjectToCssProperties from '../../utils/jsObjectToCssProperties';
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
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class postcssSugarPluginUtilsConfigToCssInterface extends __SInterface {
}
postcssSugarPluginUtilsConfigToCssInterface.definition = {
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
export { postcssSugarPluginUtilsConfigToCssInterface as interface };
export default function ({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({ dotPath: '', exclude: [], only: [] }, params);
    const configObj = __theme().config(params.dotPath);
    const vars = [
        __jsObjectToCssProperties(configObj, {
            exclude: finalParams.exclude,
            only: finalParams.only,
        }),
    ];
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnVG9Dc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb25maWdUb0Nzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLE9BQU8sTUFBTSxtQkFBbUIsQ0FBQztBQUN4QyxPQUFPLHlCQUF5QixNQUFNLHFDQUFxQyxDQUFDO0FBRTVFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTZCRztBQUVILE1BQU0sMkNBQTRDLFNBQVEsWUFBWTs7QUFDM0Qsc0RBQVUsR0FBRztJQUNoQixPQUFPLEVBQUU7UUFDTCxJQUFJLEVBQUUsUUFBUTtRQUNkLFFBQVEsRUFBRSxJQUFJO0tBQ2pCO0lBQ0QsT0FBTyxFQUFFO1FBQ0wsSUFBSSxFQUFFLGVBQWU7S0FDeEI7SUFDRCxJQUFJLEVBQUU7UUFDRixJQUFJLEVBQUUsZUFBZTtLQUN4QjtDQUNKLENBQUM7QUFTTixPQUFPLEVBQUUsMkNBQTJDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFcEUsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsR0FLZDtJQUNHLE1BQU0sV0FBVyxtQkFDYixPQUFPLEVBQUUsRUFBRSxFQUNYLE9BQU8sRUFBRSxFQUFFLEVBQ1gsSUFBSSxFQUFFLEVBQUUsSUFDTCxNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sU0FBUyxHQUFHLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7SUFFbkQsTUFBTSxJQUFJLEdBQWE7UUFDbkIseUJBQXlCLENBQUMsU0FBUyxFQUFFO1lBQ2pDLE9BQU8sRUFBRSxXQUFXLENBQUMsT0FBTztZQUM1QixJQUFJLEVBQUUsV0FBVyxDQUFDLElBQUk7U0FDekIsQ0FBQztLQUNMLENBQUM7SUFFRixXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDdEIsQ0FBQyJ9