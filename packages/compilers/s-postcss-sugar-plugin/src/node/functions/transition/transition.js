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
        required: true,
    },
};
export { postcssSugarPluginTransitionFunctionInterface as interface };
export default function ({ params, }) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNpdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRyYW5zaXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxPQUFPLE1BQU0sbUJBQW1CLENBQUM7QUFDeEMsT0FBTyxXQUFXLE1BQU0sdUJBQXVCLENBQUM7QUFFaEQsTUFBTSw2Q0FBOEMsU0FBUSxZQUFZOztBQUM3RCx3REFBVSxHQUFHO0lBQ2hCLElBQUksRUFBRTtRQUNGLElBQUksRUFBRSxRQUFRO1FBQ2QsTUFBTSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ25ELE9BQU8sRUFBRSxTQUFTO1FBQ2xCLFFBQVEsRUFBRSxJQUFJO0tBQ2pCO0NBQ0osQ0FBQztBQUVOLE9BQU8sRUFBRSw2Q0FBNkMsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQU10RSxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3JCLE1BQU0sR0FHVDtJQUNHLE1BQU0sV0FBVyxtQkFDYixJQUFJLEVBQUUsU0FBUyxJQUNaLE1BQU0sQ0FDWixDQUFDO0lBRUYsSUFBSSxPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLFNBQVM7UUFDOUQsT0FBTyxXQUFXLENBQUMsSUFBSSxDQUFDO0lBRTVCLE1BQU0sV0FBVyxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO1FBQ3RELE1BQU0sVUFBVSxHQUFHLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDdkQsSUFBSSxDQUFDLFVBQVU7WUFBRSxPQUFPLFVBQVUsQ0FBQztRQUNuQyxPQUFPLE9BQU8sV0FBVyxDQUNyQix3QkFBd0IsQ0FBQyxFQUFFLENBQzlCLEtBQUssVUFBVSxHQUFHLENBQUM7SUFDeEIsQ0FBQyxDQUFDLENBQUM7SUFFSCxPQUFPLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDakMsQ0FBQyJ9