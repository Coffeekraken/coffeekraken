import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
/**
 * @name          opacity
 * @namespace     node.function.opacity
 * @type          PostcssFunction
 * @platform      postcss
 * @interface     ./opacity
 * @status        beta
 *
 * This function allows you to get an opacity value depending on your theme config
 *
 * @param       {String}        opacity      The opacity to get
 * @return      {Css}                   The corresponding css
 *
 * @example       css
 * .my-element {
 *      opacity: sugar.opacity(20);
 * }
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginOpacityFunctionInterface extends __SInterface {
    static get _definition() {
        return {
            opacity: {
                type: 'String',
                values: Object.keys(__STheme.get('opacity')),
                default: '100',
                required: true,
            },
        };
    }
}
export { postcssSugarPluginOpacityFunctionInterface as interface };
export default function ({ params, }) {
    const finalParams = Object.assign({ opacity: '100' }, params);
    const opacity = finalParams.opacity;
    if (__STheme.get('opacity')[opacity] === undefined)
        return opacity;
    const opacityRes = opacity.split(' ').map((s) => {
        const size = __STheme.get(`opacity.${s}`);
        if (!size)
            return size;
        return `var(${`--s-theme-opacity-${s}`}, ${size})`;
    });
    return opacityRes.join(' ');
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE1BQU0sMENBQTJDLFNBQVEsWUFBWTtJQUNqRSxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsT0FBTyxFQUFFO2dCQUNMLElBQUksRUFBRSxRQUFRO2dCQUNkLE1BQU0sRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQzVDLE9BQU8sRUFBRSxLQUFLO2dCQUNkLFFBQVEsRUFBRSxJQUFJO2FBQ2pCO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQUNELE9BQU8sRUFBRSwwQ0FBMEMsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQU1uRSxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3JCLE1BQU0sR0FHVDtJQUNHLE1BQU0sV0FBVyxtQkFDYixPQUFPLEVBQUUsS0FBSyxJQUNYLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxPQUFPLEdBQUcsV0FBVyxDQUFDLE9BQU8sQ0FBQztJQUVwQyxJQUFJLFFBQVEsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssU0FBUztRQUFFLE9BQU8sT0FBTyxDQUFDO0lBRW5FLE1BQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7UUFDNUMsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDMUMsSUFBSSxDQUFDLElBQUk7WUFBRSxPQUFPLElBQUksQ0FBQztRQUN2QixPQUFPLE9BQU8scUJBQXFCLENBQUMsRUFBRSxLQUFLLElBQUksR0FBRyxDQUFDO0lBQ3ZELENBQUMsQ0FBQyxDQUFDO0lBRUgsT0FBTyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ2hDLENBQUMifQ==