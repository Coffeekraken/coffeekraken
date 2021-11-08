import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
class postcssSugarPluginTransitionFunctionInterface extends __SInterface {
    static get _definition() {
        return {
            name: {
                type: 'String',
                values: Object.keys(__STheme.config('transition')),
                default: 'default',
                required: true,
            },
        };
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNpdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRyYW5zaXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFFN0MsTUFBTSw2Q0FBOEMsU0FBUSxZQUFZO0lBQ3BFLE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxJQUFJLEVBQUU7Z0JBQ0YsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsTUFBTSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztnQkFDbEQsT0FBTyxFQUFFLFNBQVM7Z0JBQ2xCLFFBQVEsRUFBRSxJQUFJO2FBQ2pCO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQUNELE9BQU8sRUFBRSw2Q0FBNkMsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQU10RSxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3JCLE1BQU0sR0FHVDtJQUNHLE1BQU0sV0FBVyxtQkFDYixJQUFJLEVBQUUsU0FBUyxJQUNaLE1BQU0sQ0FDWixDQUFDO0lBRUYsSUFBSSxRQUFRLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxTQUFTO1FBQzdELE9BQU8sV0FBVyxDQUFDLElBQUksQ0FBQztJQUU1QixNQUFNLFdBQVcsR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtRQUN0RCxNQUFNLFVBQVUsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN0RCxJQUFJLENBQUMsVUFBVTtZQUFFLE9BQU8sVUFBVSxDQUFDO1FBQ25DLE9BQU8sT0FBTyx3QkFBd0IsQ0FBQyxFQUFFLEtBQUssVUFBVSxHQUFHLENBQUM7SUFDaEUsQ0FBQyxDQUFDLENBQUM7SUFFSCxPQUFPLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDakMsQ0FBQyJ9