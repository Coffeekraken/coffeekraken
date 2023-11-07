import __SInterface from '@coffeekraken/s-interface';
/**
 * @name           removeProps
 * @as              @s.utils.removeProps
 * @namespace      node.mixin.utils
 * @type           PostcssMixin
 * @platform      postcss
 * @interface       ./removeProps
 * @status        beta
 *
 * This mixin allows you to remove some properties from the enclosed css.
 * It can be simply a declaration name like "padding-inline", or a group of declarations that starts/ends
 * with something like to "^padding", "radius$".
 *
 * @param           {String}              props           The properties you want to remove separated by a comma
 * @return        {Css}         The generated css
 *
 * @snippet         @s.utils.removeProps
 * @s.utils.removeProps '$1' {
 *      $2
 * }
 *
 * @example        css
 * @s.utils.removeProps('^padding, left$') {
 *      @s.ui.button.classes;
 *      /* and css you want... * /
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SSugarcssPluginUtilsRemovePropsMixinInterface extends __SInterface {
    static get _definition() {
        return {
            props: {
                type: 'String',
                required: true,
            },
        };
    }
}
export { SSugarcssPluginUtilsRemovePropsMixinInterface as interface };
export default function ({ params, atRule, getRoot, settings, postcssApi, }) {
    const finalParams = Object.assign({ props: '' }, (params !== null && params !== void 0 ? params : {}));
    // all the process is made in the postProcessors/10-utilsRemoveProps.ts file
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTZCRztBQUVILE1BQU0sNkNBQThDLFNBQVEsWUFBWTtJQUNwRSxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRSxRQUFRO2dCQUNkLFFBQVEsRUFBRSxJQUFJO2FBQ2pCO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQUNELE9BQU8sRUFBRSw2Q0FBNkMsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUt0RSxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sT0FBTyxFQUNQLFFBQVEsRUFDUixVQUFVLEdBT2I7SUFDRyxNQUFNLFdBQVcsR0FBRyxnQkFDaEIsS0FBSyxFQUFFLEVBQUUsSUFDTixDQUFDLE1BQU0sYUFBTixNQUFNLGNBQU4sTUFBTSxHQUFJLEVBQUUsQ0FBQyxDQUNwQixDQUFDO0lBRUYsNEVBQTRFO0FBQ2hGLENBQUMifQ==