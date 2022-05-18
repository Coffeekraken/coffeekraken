import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
/**
 * @name          transition
 * @namespace     node.function.border
 * @type          PostcssFunction
 * @platform      postcss
 * @interface       ./transition
 * @status        beta
 *
 * This function allows you to get a transition value depending on your theme config
 *
 * @param       {String}        transition      The transition to get
 * @return      {Css}                   The corresponding css
 *
 * @example       css
 * .my-element {
 *      transition: sugar.transition(fast);
 * }
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginTransitionFunctionInterface extends __SInterface {
    static get _definition() {
        return {
            name: {
                type: 'String',
                values: Object.keys(__STheme.get('transition')),
                default: 'default',
                required: true,
            },
        };
    }
}
export { postcssSugarPluginTransitionFunctionInterface as interface };
export default function ({ params, }) {
    const finalParams = Object.assign({ name: 'default' }, params);
    if (__STheme.get('transition')[finalParams.name] === undefined)
        return finalParams.name;
    const transitions = finalParams.name.split(' ').map((t) => {
        const transition = __STheme.get(`transition.${t}`);
        if (!transition)
            return transition;
        return `var(${`--s-theme-transition-${t}`}, ${transition})`;
    });
    return transitions.join(' ');
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE1BQU0sNkNBQThDLFNBQVEsWUFBWTtJQUNwRSxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsSUFBSSxFQUFFO2dCQUNGLElBQUksRUFBRSxRQUFRO2dCQUNkLE1BQU0sRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBQy9DLE9BQU8sRUFBRSxTQUFTO2dCQUNsQixRQUFRLEVBQUUsSUFBSTthQUNqQjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFDRCxPQUFPLEVBQUUsNkNBQTZDLElBQUksU0FBUyxFQUFFLENBQUM7QUFNdEUsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEdBR1Q7SUFDRyxNQUFNLFdBQVcsbUJBQ2IsSUFBSSxFQUFFLFNBQVMsSUFDWixNQUFNLENBQ1osQ0FBQztJQUVGLElBQUksUUFBUSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssU0FBUztRQUMxRCxPQUFPLFdBQVcsQ0FBQyxJQUFJLENBQUM7SUFFNUIsTUFBTSxXQUFXLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7UUFDdEQsTUFBTSxVQUFVLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDbkQsSUFBSSxDQUFDLFVBQVU7WUFBRSxPQUFPLFVBQVUsQ0FBQztRQUNuQyxPQUFPLE9BQU8sd0JBQXdCLENBQUMsRUFBRSxLQUFLLFVBQVUsR0FBRyxDQUFDO0lBQ2hFLENBQUMsQ0FBQyxDQUFDO0lBRUgsT0FBTyxXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ2pDLENBQUMifQ==