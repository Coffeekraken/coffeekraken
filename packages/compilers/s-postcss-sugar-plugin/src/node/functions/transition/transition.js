import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../utils/theme';
import __minifyVar from '../../utils/minifyVar';
class postcssSugarPluginTransitionFunctionInterface extends __SInterface {
}
postcssSugarPluginTransitionFunctionInterface.definition = {
    name: {
        type: 'String',
        values: Object.keys(__theme().config('transition')),
        default: 'default',
        required: true
    }
};
export { postcssSugarPluginTransitionFunctionInterface as interface };
export default function ({ params }) {
    const finalParams = Object.assign({ name: 'default' }, params);
    if (__theme().config('transition')[finalParams.name] === undefined)
        return finalParams.name;
    const transitions = finalParams.name.split(' ').map((t) => {
        const transition = __theme().config(`transition.${t}`);
        if (!transition)
            return transition;
        return `var(${__minifyVar(`--s-theme-transition-${t}`)}, ${transition})`;
    });
    return transitions.join(' ');
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNpdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRyYW5zaXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxPQUFPLE1BQU0sbUJBQW1CLENBQUM7QUFDeEMsT0FBTyxXQUFXLE1BQU0sdUJBQXVCLENBQUM7QUFFaEQsTUFBTSw2Q0FBOEMsU0FBUSxZQUFZOztBQUMvRCx3REFBVSxHQUFHO0lBQ2xCLElBQUksRUFBRTtRQUNKLElBQUksRUFBRSxRQUFRO1FBQ2QsTUFBTSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ25ELE9BQU8sRUFBRSxTQUFTO1FBQ2xCLFFBQVEsRUFBRSxJQUFJO0tBQ2Y7Q0FDRixDQUFDO0FBRUosT0FBTyxFQUFFLDZDQUE2QyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBTXRFLE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDdkIsTUFBTSxFQUdQO0lBQ0MsTUFBTSxXQUFXLG1CQUNmLElBQUksRUFBRSxTQUFTLElBQ1osTUFBTSxDQUNWLENBQUM7SUFFRixJQUFJLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssU0FBUztRQUFFLE9BQU8sV0FBVyxDQUFDLElBQUksQ0FBQztJQUU1RixNQUFNLFdBQVcsR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtRQUN4RCxNQUFNLFVBQVUsR0FBRyxPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZELElBQUksQ0FBQyxVQUFVO1lBQUUsT0FBTyxVQUFVLENBQUM7UUFDbkMsT0FBTyxPQUFPLFdBQVcsQ0FBQyx3QkFBd0IsQ0FBQyxFQUFFLENBQUMsS0FBSyxVQUFVLEdBQUcsQ0FBQztJQUMzRSxDQUFDLENBQUMsQ0FBQztJQUVILE9BQU8sV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUMvQixDQUFDIn0=