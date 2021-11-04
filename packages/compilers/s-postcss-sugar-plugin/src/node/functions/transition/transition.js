import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
class postcssSugarPluginTransitionFunctionInterface extends __SInterface {
}
postcssSugarPluginTransitionFunctionInterface.definition = {
    name: {
        type: 'String',
        values: Object.keys(__STheme.config('transition')),
        default: 'default',
        required: true,
    },
};
export { postcssSugarPluginTransitionFunctionInterface as interface };
export default function ({ params, }) {
    const finalParams = Object.assign({ name: 'default' }, params);
    if (__STheme.config('transition')[finalParams.name] === undefined)
        return finalParams.name;
    const transitions = finalParams.name.split(' ').map((t) => {
        const transition = __STheme.config(`transition.${t}`);
        if (!transition)
            return transition;
        return `var(${`--s-theme-transition-${t}`}, ${transition})`;
    });
    return transitions.join(' ');
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNpdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRyYW5zaXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFFN0MsTUFBTSw2Q0FBOEMsU0FBUSxZQUFZOztBQUM3RCx3REFBVSxHQUFHO0lBQ2hCLElBQUksRUFBRTtRQUNGLElBQUksRUFBRSxRQUFRO1FBQ2QsTUFBTSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNsRCxPQUFPLEVBQUUsU0FBUztRQUNsQixRQUFRLEVBQUUsSUFBSTtLQUNqQjtDQUNKLENBQUM7QUFFTixPQUFPLEVBQUUsNkNBQTZDLElBQUksU0FBUyxFQUFFLENBQUM7QUFNdEUsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEdBR1Q7SUFDRyxNQUFNLFdBQVcsbUJBQ2IsSUFBSSxFQUFFLFNBQVMsSUFDWixNQUFNLENBQ1osQ0FBQztJQUVGLElBQUksUUFBUSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssU0FBUztRQUM3RCxPQUFPLFdBQVcsQ0FBQyxJQUFJLENBQUM7SUFFNUIsTUFBTSxXQUFXLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7UUFDdEQsTUFBTSxVQUFVLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDdEQsSUFBSSxDQUFDLFVBQVU7WUFBRSxPQUFPLFVBQVUsQ0FBQztRQUNuQyxPQUFPLE9BQU8sd0JBQXdCLENBQUMsRUFBRSxLQUFLLFVBQVUsR0FBRyxDQUFDO0lBQ2hFLENBQUMsQ0FBQyxDQUFDO0lBRUgsT0FBTyxXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ2pDLENBQUMifQ==