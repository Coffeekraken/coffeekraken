import __SInterface from '@coffeekraken/s-interface';
import { themeDefinition } from '../../utils/theme';
import __themeToVars from '../../utils/themeToVars';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
/**
 * @name           theme
 * @namespace      node.mixins.theme
 * @type           PostcssMixin
 * @platform      css
 * @status        beta
 *
 * This mixin simply generate all the css needed for a theme to be applied
 * in any scope. It will print all the theme variables like colors, etc, as well
 * as set the correct font style and some other small things...
 *
 * @return        {Css}         The generated css
 *
 * @example         postcss
 * \@sugar.theme(light);
 * .my-cool-element {
 *    \@sugar.theme(dark);
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class postcssSugarPluginThemeinInterface extends __SInterface {
}
postcssSugarPluginThemeinInterface.definition = {
    theme: themeDefinition,
    variant: {
        type: 'String',
        default: __SSugarConfig.get('theme.variant'),
    },
    scope: {
        type: 'Boolean',
        default: false,
    },
};
export { postcssSugarPluginThemeinInterface as interface };
export default function ({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({ theme: '', variant: '', scope: false }, params);
    const vars = __themeToVars(finalParams.theme, finalParams.variant);
    if (finalParams.scope) {
        vars.unshift(`.s-theme--${finalParams.theme} {`);
        vars.push(`@sugar.lnf.base;`);
        vars.push('}');
    }
    else if (atRule.parent.type === 'root') {
        vars.unshift(':root {');
        vars.push(`@sugar.lnf.base;`);
        vars.push('}');
    }
    else {
        vars.push(`@sugar.lnf.base;`);
    }
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0aGVtZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDcEQsT0FBTyxhQUFhLE1BQU0seUJBQXlCLENBQUM7QUFDcEQsT0FBTyxjQUFjLE1BQU0sOEJBQThCLENBQUM7QUFFMUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXFCRztBQUVILE1BQU0sa0NBQW1DLFNBQVEsWUFBWTs7QUFDbEQsNkNBQVUsR0FBRztJQUNoQixLQUFLLEVBQUUsZUFBZTtJQUN0QixPQUFPLEVBQUU7UUFDTCxJQUFJLEVBQUUsUUFBUTtRQUNkLE9BQU8sRUFBRSxjQUFjLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQztLQUMvQztJQUNELEtBQUssRUFBRTtRQUNILElBQUksRUFBRSxTQUFTO1FBQ2YsT0FBTyxFQUFFLEtBQUs7S0FDakI7Q0FDSixDQUFDO0FBU04sT0FBTyxFQUFFLGtDQUFrQyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBQzNELE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixXQUFXLEdBS2Q7SUFDRyxNQUFNLFdBQVcsbUJBQ2IsS0FBSyxFQUFFLEVBQUUsRUFDVCxPQUFPLEVBQUUsRUFBRSxFQUNYLEtBQUssRUFBRSxLQUFLLElBQ1QsTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLElBQUksR0FBRyxhQUFhLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7SUFFbkUsSUFBSSxXQUFXLENBQUMsS0FBSyxFQUFFO1FBQ25CLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxXQUFXLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQztRQUNqRCxJQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDOUIsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUNsQjtTQUFNLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssTUFBTSxFQUFFO1FBQ3RDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDeEIsSUFBSSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBQzlCLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDbEI7U0FBTTtRQUNILElBQUksQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztLQUNqQztJQUVELFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN0QixDQUFDIn0=