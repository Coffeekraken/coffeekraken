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
        required: true,
    },
};
export { postcssSugarPluginBorderRadiusFunctionInterface as interface };
export default function ({ params, }) {
    const finalParams = Object.assign({ radius: '' }, params);
    const radius = finalParams.radius;
    if (__theme().config('border.radius')[radius] === undefined)
        return radius;
    const radiuses = radius.split(' ').map((s) => {
        // const radius = __theme().config(`border.radius.${s}`);
        // if (!radius) return radius;
        return `var(${__minifyVar(`--s-theme-border-radius-${s}`)}) ${finalParams.radius !== 'default' ? '!important' : ''}`;
    });
    return radiuses.join(' ');
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFkaXVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicmFkaXVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sT0FBTyxNQUFNLG1CQUFtQixDQUFDO0FBQ3hDLE9BQU8sV0FBVyxNQUFNLHVCQUF1QixDQUFDO0FBRWhELE1BQU0sK0NBQWdELFNBQVEsWUFBWTs7QUFDL0QsMERBQVUsR0FBRztJQUNoQixNQUFNLEVBQUU7UUFDSixJQUFJLEVBQUUsUUFBUTtRQUNkLE1BQU0sRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUN0RCxPQUFPLEVBQUUsU0FBUztRQUNsQixRQUFRLEVBQUUsSUFBSTtLQUNqQjtDQUNKLENBQUM7QUFFTixPQUFPLEVBQUUsK0NBQStDLElBQUksU0FBUyxFQUFFLENBQUM7QUFNeEUsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEdBR1Q7SUFDRyxNQUFNLFdBQVcsbUJBQ2IsTUFBTSxFQUFFLEVBQUUsSUFDUCxNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sTUFBTSxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUM7SUFFbEMsSUFBSSxPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssU0FBUztRQUFFLE9BQU8sTUFBTSxDQUFDO0lBRTNFLE1BQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7UUFDekMseURBQXlEO1FBQ3pELDhCQUE4QjtRQUM5QixPQUFPLE9BQU8sV0FBVyxDQUFDLDJCQUEyQixDQUFDLEVBQUUsQ0FBQyxLQUNyRCxXQUFXLENBQUMsTUFBTSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxFQUN0RCxFQUFFLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQztJQUVILE9BQU8sUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUM5QixDQUFDIn0=