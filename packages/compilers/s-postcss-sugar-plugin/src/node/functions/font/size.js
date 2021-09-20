import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../utils/theme';
import __isValidUnitValue from '@coffeekraken/sugar/shared/css/isValidUnitValue';
class postcssSugarPluginFontSizeInterface extends __SInterface {
}
postcssSugarPluginFontSizeInterface.definition = {
    name: {
        type: 'String',
        required: true,
        alias: 'n',
    },
    scalable: {
        type: 'Boolean',
        default: __theme().config('scalable.font'),
    },
};
export { postcssSugarPluginFontSizeInterface as interface };
export default function ({ params }) {
    const finalParams = Object.assign({ name: '', scalable: true }, params);
    const name = finalParams.name;
    if (__isValidUnitValue(name)) {
        if (finalParams.scalable)
            return `sugar.scalable(${name})`;
        return name;
    }
    if (finalParams.scalable)
        return `sugar.scalable(sugar.theme(font.size.${name}))`;
    return `sugar.theme(font.size.${name})`;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2l6ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNpemUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxPQUFPLE1BQU0sbUJBQW1CLENBQUM7QUFDeEMsT0FBTyxrQkFBa0IsTUFBTSxpREFBaUQsQ0FBQztBQUdqRixNQUFNLG1DQUFvQyxTQUFRLFlBQVk7O0FBQ25ELDhDQUFVLEdBQUc7SUFDaEIsSUFBSSxFQUFFO1FBQ0YsSUFBSSxFQUFFLFFBQVE7UUFDZCxRQUFRLEVBQUUsSUFBSTtRQUNkLEtBQUssRUFBRSxHQUFHO0tBQ2I7SUFDRCxRQUFRLEVBQUU7UUFDTixJQUFJLEVBQUUsU0FBUztRQUNmLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDO0tBQzdDO0NBQ0osQ0FBQztBQUVOLE9BQU8sRUFBRSxtQ0FBbUMsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQU81RCxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQUUsTUFBTSxFQUEwRDtJQUN2RixNQUFNLFdBQVcsbUJBQ2IsSUFBSSxFQUFFLEVBQUUsRUFDUixRQUFRLEVBQUUsSUFBSSxJQUNYLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQztJQUU5QixJQUFJLGtCQUFrQixDQUFDLElBQUksQ0FBQyxFQUFFO1FBQzFCLElBQUksV0FBVyxDQUFDLFFBQVE7WUFBRSxPQUFPLGtCQUFrQixJQUFJLEdBQUcsQ0FBQztRQUMzRCxPQUFPLElBQUksQ0FBQztLQUNmO0lBRUQsSUFBSSxXQUFXLENBQUMsUUFBUTtRQUFFLE9BQU8sd0NBQXdDLElBQUksSUFBSSxDQUFDO0lBQ2xGLE9BQU8seUJBQXlCLElBQUksR0FBRyxDQUFDO0FBQzVDLENBQUMifQ==