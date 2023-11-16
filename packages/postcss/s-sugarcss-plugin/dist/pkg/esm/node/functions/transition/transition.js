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
class SSugarcssPluginTransitionFunctionInterface extends __SInterface {
    static get _definition() {
        return {
            name: {
                type: 'String',
                values: Object.keys(__STheme.current.get('transition')),
                default: 'default',
                required: true,
            },
        };
    }
}
export { SSugarcssPluginTransitionFunctionInterface as interface };
export default function ({ params, themeValueProxy, }) {
    const finalParams = Object.assign({ name: 'default' }, params);
    const transition = finalParams.name;
    let val;
    // theme value
    val = themeValueProxy(transition);
    // try to get the transition with the pased
    const newVal = __STheme.current.getSafe(`transition.${val}`);
    if (newVal !== undefined) {
        val = newVal;
    }
    // default return simply his value
    return `${val}`;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVCRztBQUVILE1BQU0sMENBQTJDLFNBQVEsWUFBWTtJQUNqRSxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsSUFBSSxFQUFFO2dCQUNGLElBQUksRUFBRSxRQUFRO2dCQUNkLE1BQU0sRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUN2RCxPQUFPLEVBQUUsU0FBUztnQkFDbEIsUUFBUSxFQUFFLElBQUk7YUFDakI7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBQ0QsT0FBTyxFQUFFLDBDQUEwQyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBTW5FLE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLGVBQWUsR0FJbEI7SUFDRyxNQUFNLFdBQVcsbUJBQ2IsSUFBSSxFQUFFLFNBQVMsSUFDWixNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sVUFBVSxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUM7SUFDcEMsSUFBSSxHQUFHLENBQUM7SUFFUixjQUFjO0lBQ2QsR0FBRyxHQUFHLGVBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUVsQywyQ0FBMkM7SUFDM0MsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsY0FBYyxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBQzdELElBQUksTUFBTSxLQUFLLFNBQVMsRUFBRTtRQUN0QixHQUFHLEdBQUcsTUFBTSxDQUFDO0tBQ2hCO0lBRUQsa0NBQWtDO0lBQ2xDLE9BQU8sR0FBRyxHQUFHLEVBQUUsQ0FBQztBQUNwQixDQUFDIn0=