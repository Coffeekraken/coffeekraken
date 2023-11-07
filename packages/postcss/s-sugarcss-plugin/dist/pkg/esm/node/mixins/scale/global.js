import __SInterface from '@coffeekraken/s-interface';
/**
 * @name          global
 * @as              @s.scale.global
 * @namespace     node.mixin.scale
 * @type          PostcssMixin
 * @platform      postcss
 * @interface       ./scale
 * @status        beta
 *
 * This mixin allows you to set the --s-scale-global variable to whatever you want
 *
 * @param       {Number}        value      The value you want for scale (0-...)
 * @return      {Css}                   The corresponding css
 *
 * @snippet         @s.scale.global($1)
 *
 * @example       css
 * .my-element {
 *    @s.scale.global(1.2);
 * }
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SSugarcssPluginScaleGlobalMixinInterface extends __SInterface {
    static get _definition() {
        return {
            value: {
                type: 'Number',
                required: true,
            },
        };
    }
}
export { SSugarcssPluginScaleGlobalMixinInterface as interface };
export default function ({ params, }) {
    const finalParams = Object.assign({ value: '' }, params);
    return `--s-scale-global: ${finalParams.value};`;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVCRztBQUVILE1BQU0sd0NBQXlDLFNBQVEsWUFBWTtJQUMvRCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRSxRQUFRO2dCQUNkLFFBQVEsRUFBRSxJQUFJO2FBQ2pCO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQUNELE9BQU8sRUFBRSx3Q0FBd0MsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQU1qRSxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3JCLE1BQU0sR0FHVDtJQUNHLE1BQU0sV0FBVyxtQkFDYixLQUFLLEVBQUUsRUFBRSxJQUNOLE1BQU0sQ0FDWixDQUFDO0lBRUYsT0FBTyxxQkFBcUIsV0FBVyxDQUFDLEtBQUssR0FBRyxDQUFDO0FBQ3JELENBQUMifQ==