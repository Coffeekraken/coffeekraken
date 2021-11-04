import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
class postcssSugarPluginBorderRadiusFunctionInterface extends __SInterface {
}
postcssSugarPluginBorderRadiusFunctionInterface.definition = {
    radius: {
        type: 'String',
        values: Object.keys(__STheme.config('border.radius')),
        default: 'default',
        required: true,
    },
};
export { postcssSugarPluginBorderRadiusFunctionInterface as interface };
export default function ({ params, }) {
    const finalParams = Object.assign({ radius: '' }, params);
    const radius = finalParams.radius;
    if (__STheme.config('border.radius')[radius] === undefined)
        return radius;
    const radiuses = radius.split(' ').map((s) => {
        // const radius = __STheme.config(`border.radius.${s}`);
        // if (!radius) return radius;
        return `var(${`--s-theme-border-radius-${s}`}) ${finalParams.radius !== 'default' ? '!important' : ''}`;
    });
    return radiuses.join(' ');
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFkaXVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicmFkaXVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDLE1BQU0sK0NBQWdELFNBQVEsWUFBWTs7QUFDL0QsMERBQVUsR0FBRztJQUNoQixNQUFNLEVBQUU7UUFDSixJQUFJLEVBQUUsUUFBUTtRQUNkLE1BQU0sRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDckQsT0FBTyxFQUFFLFNBQVM7UUFDbEIsUUFBUSxFQUFFLElBQUk7S0FDakI7Q0FDSixDQUFDO0FBRU4sT0FBTyxFQUFFLCtDQUErQyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBTXhFLE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxHQUdUO0lBQ0csTUFBTSxXQUFXLG1CQUNiLE1BQU0sRUFBRSxFQUFFLElBQ1AsTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLE1BQU0sR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDO0lBRWxDLElBQUksUUFBUSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxTQUFTO1FBQUUsT0FBTyxNQUFNLENBQUM7SUFFMUUsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtRQUN6Qyx3REFBd0Q7UUFDeEQsOEJBQThCO1FBQzlCLE9BQU8sT0FBTywyQkFBMkIsQ0FBQyxFQUFFLEtBQ3hDLFdBQVcsQ0FBQyxNQUFNLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLEVBQ3RELEVBQUUsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0lBRUgsT0FBTyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzlCLENBQUMifQ==