import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
/**
 * @name          transition
 * @as            s.transition
 * @namespace     node.function.transition
 * @type          PostcssFunction
 * @platform      postcss
 * @interface       ./transition
 * @status        stable
 *
 * This function allows you to get a transition value depending on your theme config
 *
 * @param       {String}        transition      The transition to get
 * @return      {Css}                   The corresponding css
 *
 * @snippet         s.transition($1)
 *
 * @example       css
 * .my-element {
 *      transition: s.transition(fast);
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
export default function ({ params, themeValueProxy, }) {
    const finalParams = Object.assign({ name: 'default' }, params);
    const transition = finalParams.name;
    let val;
    // theme value
    val = themeValueProxy(transition);
    // try to get the transition with the pased
    const newVal = __STheme.getSafe(`transition.${val}`);
    if (newVal !== undefined) {
        val = newVal;
    }
    // default return simply his value
    return `${val}`;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVCRztBQUVILE1BQU0sNkNBQThDLFNBQVEsWUFBWTtJQUNwRSxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsSUFBSSxFQUFFO2dCQUNGLElBQUksRUFBRSxRQUFRO2dCQUNkLE1BQU0sRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBQy9DLE9BQU8sRUFBRSxTQUFTO2dCQUNsQixRQUFRLEVBQUUsSUFBSTthQUNqQjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFDRCxPQUFPLEVBQUUsNkNBQTZDLElBQUksU0FBUyxFQUFFLENBQUM7QUFNdEUsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sZUFBZSxHQUlsQjtJQUNHLE1BQU0sV0FBVyxtQkFDYixJQUFJLEVBQUUsU0FBUyxJQUNaLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxVQUFVLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQztJQUNwQyxJQUFJLEdBQUcsQ0FBQztJQUVSLGNBQWM7SUFDZCxHQUFHLEdBQUcsZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBRWxDLDJDQUEyQztJQUMzQyxNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLGNBQWMsR0FBRyxFQUFFLENBQUMsQ0FBQztJQUNyRCxJQUFJLE1BQU0sS0FBSyxTQUFTLEVBQUU7UUFDdEIsR0FBRyxHQUFHLE1BQU0sQ0FBQztLQUNoQjtJQUVELGtDQUFrQztJQUNsQyxPQUFPLEdBQUcsR0FBRyxFQUFFLENBQUM7QUFDcEIsQ0FBQyJ9