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
    // @ts-ignore
    const configObj = __STheme.config(params.dotPath);
    const vars = [
        __STheme.jsObjectToCssProperties(configObj, {
            exclude: finalParams.exclude,
            only: finalParams.only,
        }),
    ];
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnVG9Dc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb25maWdUb0Nzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUU3Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E2Qkc7QUFFSCxNQUFNLDJDQUE0QyxTQUFRLFlBQVk7O0FBQzNELHNEQUFVLEdBQUc7SUFDaEIsT0FBTyxFQUFFO1FBQ0wsSUFBSSxFQUFFLFFBQVE7UUFDZCxRQUFRLEVBQUUsSUFBSTtLQUNqQjtJQUNELE9BQU8sRUFBRTtRQUNMLElBQUksRUFBRSxlQUFlO0tBQ3hCO0lBQ0QsSUFBSSxFQUFFO1FBQ0YsSUFBSSxFQUFFLGVBQWU7S0FDeEI7Q0FDSixDQUFDO0FBU04sT0FBTyxFQUFFLDJDQUEyQyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRXBFLE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixXQUFXLEdBS2Q7SUFDRyxNQUFNLFdBQVcsbUJBQ2IsT0FBTyxFQUFFLEVBQUUsRUFDWCxPQUFPLEVBQUUsRUFBRSxFQUNYLElBQUksRUFBRSxFQUFFLElBQ0wsTUFBTSxDQUNaLENBQUM7SUFFRixhQUFhO0lBQ2IsTUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7SUFFbEQsTUFBTSxJQUFJLEdBQWE7UUFDbkIsUUFBUSxDQUFDLHVCQUF1QixDQUFDLFNBQVMsRUFBRTtZQUN4QyxPQUFPLEVBQUUsV0FBVyxDQUFDLE9BQU87WUFDNUIsSUFBSSxFQUFFLFdBQVcsQ0FBQyxJQUFJO1NBQ3pCLENBQUM7S0FDTCxDQUFDO0lBRUYsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3RCLENBQUMifQ==