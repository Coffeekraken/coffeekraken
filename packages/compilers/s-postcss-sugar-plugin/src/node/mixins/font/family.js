import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../utils/theme';
class postcssSugarPluginFontFamilyInterface extends __SInterface {
}
postcssSugarPluginFontFamilyInterface.definition = {
    font: {
        type: 'String',
        values: Object.keys(__theme().config('font.family')),
        required: true
    }
};
export { postcssSugarPluginFontFamilyInterface as interface };
export default function ({ params, atRule, processNested }) {
    const finalParams = Object.assign({ font: 'default' }, params);
    const vars = [];
    const fontFamilyObj = __theme().config(`font.family.${finalParams.font}`);
    Object.keys(fontFamilyObj).forEach((prop) => {
        switch (prop) {
            case 'font-family':
            case 'font-weight':
            case 'font-style':
                vars.push(`${prop}: var(--s-theme-font-family-${finalParams.font}-${prop}, ${fontFamilyObj[prop]});`);
                break;
            default:
                break;
        }
    });
    const AST = processNested(vars.join('\n'));
    atRule.replaceWith(AST);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFtaWx5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmFtaWx5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJELE9BQU8sT0FBTyxNQUFNLG1CQUFtQixDQUFDO0FBRXhDLE1BQU0scUNBQXNDLFNBQVEsWUFBWTs7QUFDdkQsZ0RBQVUsR0FBRztJQUNsQixJQUFJLEVBQUU7UUFDSixJQUFJLEVBQUUsUUFBUTtRQUNkLE1BQU0sRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNwRCxRQUFRLEVBQUUsSUFBSTtLQUNmO0NBQ0YsQ0FBQztBQU9KLE9BQU8sRUFBRSxxQ0FBcUMsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUU5RCxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3ZCLE1BQU0sRUFDTixNQUFNLEVBQ04sYUFBYSxFQUtkO0lBQ0MsTUFBTSxXQUFXLG1CQUNmLElBQUksRUFBRSxTQUFTLElBQ1osTUFBTSxDQUNWLENBQUM7SUFFRixNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7SUFFMUIsTUFBTSxhQUFhLEdBQUcsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDLGVBQWUsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7SUFFMUUsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUMxQyxRQUFRLElBQUksRUFBRTtZQUNaLEtBQUssYUFBYSxDQUFDO1lBQ25CLEtBQUssYUFBYSxDQUFDO1lBQ25CLEtBQUssWUFBWTtnQkFDZixJQUFJLENBQUMsSUFBSSxDQUNQLEdBQUcsSUFBSSwrQkFBK0IsV0FBVyxDQUFDLElBQUksSUFBSSxJQUFJLEtBQUssYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQzNGLENBQUM7Z0JBQ0YsTUFBTTtZQUNSO2dCQUNFLE1BQU07U0FDVDtJQUNILENBQUMsQ0FBQyxDQUFDO0lBRUgsTUFBTSxHQUFHLEdBQUcsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUMzQyxNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzFCLENBQUMifQ==