import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../utils/theme';
import __isValidUnitValue from '@coffeekraken/sugar/shared/css/isValidUnitValue';
class postcssSugarPluginFontSizeInterface extends __SInterface {
}
postcssSugarPluginFontSizeInterface.definition = {
    name: {
        type: 'String',
        required: true,
        alias: 'n'
    }
};
export { postcssSugarPluginFontSizeInterface as interface };
export default function ({ params }) {
    const finalParams = Object.assign({ name: '' }, params);
    const name = finalParams.name;
    if (__isValidUnitValue(name))
        return name;
    const size = __theme().config(`font.size.${name}`);
    return `var(--s-theme-font-size-${name}, ${size})`;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2l6ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNpemUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxPQUFPLE1BQU0sbUJBQW1CLENBQUM7QUFDeEMsT0FBTyxrQkFBa0IsTUFBTSxpREFBaUQsQ0FBQztBQUVqRixNQUFNLG1DQUFvQyxTQUFRLFlBQVk7O0FBQ3JELDhDQUFVLEdBQUc7SUFDbEIsSUFBSSxFQUFFO1FBQ0osSUFBSSxFQUFFLFFBQVE7UUFDZCxRQUFRLEVBQUUsSUFBSTtRQUNkLEtBQUssRUFBRSxHQUFHO0tBQ1g7Q0FDRixDQUFDO0FBRUosT0FBTyxFQUFFLG1DQUFtQyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBTTVELE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDdkIsTUFBTSxFQUdQO0lBQ0MsTUFBTSxXQUFXLG1CQUNmLElBQUksRUFBRSxFQUFFLElBQ0wsTUFBTSxDQUNWLENBQUM7SUFFRixNQUFNLElBQUksR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDO0lBRTlCLElBQUksa0JBQWtCLENBQUMsSUFBSSxDQUFDO1FBQUUsT0FBTyxJQUFJLENBQUM7SUFFMUMsTUFBTSxJQUFJLEdBQUcsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDLGFBQWEsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUVuRCxPQUFPLDJCQUEyQixJQUFJLEtBQUssSUFBSSxHQUFHLENBQUM7QUFDckQsQ0FBQyJ9