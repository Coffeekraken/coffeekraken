import __SInterface from '@coffeekraken/s-interface';
/**
 * @name          scale
 * @namespace     node.mixin.scale
 * @type          PostcssMixin
 * @platform      postcss
 * @interface       ./scale
 * @status        beta
 *
 * This mixin allows you to set the --s-scale variable to whatever you want
 *
 * @param       {Number}        value      The value you want for scale (0-...)
 * @return      {Css}                   The corresponding css
 *
 * @example       css
 * .my-element {
 *    @sugar.scale(1.2);
 * }
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginScaleMixinInterface extends __SInterface {
    static get _definition() {
        return {
            value: {
                type: 'Number',
                required: true,
            },
        };
    }
}
export { postcssSugarPluginScaleMixinInterface as interface };
export default function ({ params, }) {
    const finalParams = Object.assign({ value: '' }, params);
    return `--s-scale: ${finalParams.value};`;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE1BQU0scUNBQXNDLFNBQVEsWUFBWTtJQUM1RCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRSxRQUFRO2dCQUNkLFFBQVEsRUFBRSxJQUFJO2FBQ2pCO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQUNELE9BQU8sRUFBRSxxQ0FBcUMsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQU05RCxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3JCLE1BQU0sR0FHVDtJQUNHLE1BQU0sV0FBVyxtQkFDYixLQUFLLEVBQUUsRUFBRSxJQUNOLE1BQU0sQ0FDWixDQUFDO0lBRUYsT0FBTyxjQUFjLFdBQVcsQ0FBQyxLQUFLLEdBQUcsQ0FBQztBQUM5QyxDQUFDIn0=