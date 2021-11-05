import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
/**
 * @name           family
 * @namespace      node.mixins.font
 * @type           PostcssMixin
 * @platform      css
 * @status        beta
 *
 * This mixin generate the css needed to apply a particular font in your css.
 * The font parameter accept any defined font family from the
 * config.theme.font.family stack
 *
 * @return        {Css}         The generated css
 *
 * @example         postcss
 * .my-cool-element {
 *    \@sugar.font.family(title);
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class postcssSugarPluginFontFamilyInterface extends __SInterface {
}
postcssSugarPluginFontFamilyInterface.definition = {
    font: {
        type: 'String',
        values: Object.keys(__STheme.config('font.family')),
        required: true,
    },
};
export { postcssSugarPluginFontFamilyInterface as interface };
export default function ({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({ font: 'default' }, params);
    const vars = [];
    const fontFamilyObj = __STheme.config(`font.family.${finalParams.font}`);
    Object.keys(fontFamilyObj).forEach((prop) => {
        switch (prop) {
            case 'font-family':
            case 'font-weight':
            case 'font-style':
                vars.push(`${prop}: var(${`--s-theme-font-family-${finalParams.font}-${prop}`}, ${fontFamilyObj[prop]});`);
                break;
            default:
                break;
        }
    });
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFtaWx5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmFtaWx5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE1BQU0scUNBQXNDLFNBQVEsWUFBWTs7QUFDckQsZ0RBQVUsR0FBRztJQUNoQixJQUFJLEVBQUU7UUFDRixJQUFJLEVBQUUsUUFBUTtRQUNkLE1BQU0sRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDbkQsUUFBUSxFQUFFLElBQUk7S0FDakI7Q0FDSixDQUFDO0FBT04sT0FBTyxFQUFFLHFDQUFxQyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRTlELE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixXQUFXLEdBS2Q7SUFDRyxNQUFNLFdBQVcsbUJBQ2IsSUFBSSxFQUFFLFNBQVMsSUFDWixNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFhLEVBQUUsQ0FBQztJQUUxQixNQUFNLGFBQWEsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLGVBQWUsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7SUFFekUsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUN4QyxRQUFRLElBQUksRUFBRTtZQUNWLEtBQUssYUFBYSxDQUFDO1lBQ25CLEtBQUssYUFBYSxDQUFDO1lBQ25CLEtBQUssWUFBWTtnQkFDYixJQUFJLENBQUMsSUFBSSxDQUNMLEdBQUcsSUFBSSxTQUFTLHlCQUF5QixXQUFXLENBQUMsSUFBSSxJQUFJLElBQUksRUFBRSxLQUMvRCxhQUFhLENBQUMsSUFBSSxDQUN0QixJQUFJLENBQ1AsQ0FBQztnQkFDRixNQUFNO1lBQ1Y7Z0JBQ0ksTUFBTTtTQUNiO0lBQ0wsQ0FBQyxDQUFDLENBQUM7SUFFSCxPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDIn0=