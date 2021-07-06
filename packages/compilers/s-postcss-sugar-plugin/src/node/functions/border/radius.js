import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../utils/theme';
import __minifyVar from '../../utils/minifyVar';
class postcssSugarPluginBorderRadiusFunctionInterface extends __SInterface {
}
postcssSugarPluginBorderRadiusFunctionInterface.definition = {
    radius: {
        type: 'String',
        values: Object.keys(__theme().config('border.radius')),
        default: 'default',
        required: true
    }
};
export { postcssSugarPluginBorderRadiusFunctionInterface as interface };
export default function ({ params }) {
    const finalParams = Object.assign({ radius: '' }, params);
    const radius = finalParams.radius;
    if (__theme().config('border.radius')[radius] === undefined)
        return radius;
    const radiuses = radius.split(' ').map((s) => {
        // const radius = __theme().config(`border.radius.${s}`);
        // if (!radius) return radius;
        return `var(${__minifyVar(`--s-theme-border-radius-${s}`)})`;
    });
    return radiuses.join(' ');
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFkaXVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicmFkaXVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sT0FBTyxNQUFNLG1CQUFtQixDQUFDO0FBQ3hDLE9BQU8sV0FBVyxNQUFNLHVCQUF1QixDQUFDO0FBRWhELE1BQU0sK0NBQWdELFNBQVEsWUFBWTs7QUFDakUsMERBQVUsR0FBRztJQUNsQixNQUFNLEVBQUU7UUFDTixJQUFJLEVBQUUsUUFBUTtRQUNkLE1BQU0sRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUN0RCxPQUFPLEVBQUUsU0FBUztRQUNsQixRQUFRLEVBQUUsSUFBSTtLQUNmO0NBQ0YsQ0FBQztBQUVKLE9BQU8sRUFBRSwrQ0FBK0MsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQU14RSxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3ZCLE1BQU0sRUFHUDtJQUNDLE1BQU0sV0FBVyxtQkFDZixNQUFNLEVBQUUsRUFBRSxJQUNQLE1BQU0sQ0FDVixDQUFDO0lBRUYsTUFBTSxNQUFNLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQztJQUVsQyxJQUFJLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxTQUFTO1FBQUUsT0FBTyxNQUFNLENBQUM7SUFFM0UsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtRQUMzQyx5REFBeUQ7UUFDekQsOEJBQThCO1FBQzlCLE9BQU8sT0FBTyxXQUFXLENBQUMsMkJBQTJCLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQztJQUMvRCxDQUFDLENBQUMsQ0FBQztJQUVILE9BQU8sUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUM1QixDQUFDIn0=