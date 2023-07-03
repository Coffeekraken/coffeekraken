import __SInterface from '@coffeekraken/s-interface';
import { __isValidCssUnitValue } from '@coffeekraken/sugar/css';
/**
 * @name          family
 * @as              sugar.font.family
 * @namespace     node.function.font
 * @type          PostcssFunction
 * @platform      postcss
 * @interface      ./family
 * @status        beta
 *
 * This function allows you to get a font family value depending on your theme config
 *
 * @param       {String}        name      The font name to get
 * @return      {Css}                   The corresponding css
 *
 * @snippet         sugar.font.family($1)
 *
 * @example       css
 * .my-element {
 *      font-family: sugar.font.family(code);
 * }
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginFontFamilyInterface extends __SInterface {
    static get _definition() {
        return {
            name: {
                type: 'String',
                required: true,
                alias: 'n',
            },
        };
    }
}
export { postcssSugarPluginFontFamilyInterface as interface };
export default function ({ params, }) {
    const finalParams = Object.assign({ name: '' }, params);
    const name = finalParams.name;
    if (__isValidCssUnitValue(name)) {
        return name;
    }
    return `sugar.theme(font.family.${name}.fontFamily)`;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBRWhFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVCRztBQUVILE1BQU0scUNBQXNDLFNBQVEsWUFBWTtJQUM1RCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsSUFBSSxFQUFFO2dCQUNGLElBQUksRUFBRSxRQUFRO2dCQUNkLFFBQVEsRUFBRSxJQUFJO2dCQUNkLEtBQUssRUFBRSxHQUFHO2FBQ2I7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBQ0QsT0FBTyxFQUFFLHFDQUFxQyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBTTlELE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxHQUdUO0lBQ0csTUFBTSxXQUFXLG1CQUNiLElBQUksRUFBRSxFQUFFLElBQ0wsTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLElBQUksR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDO0lBRTlCLElBQUkscUJBQXFCLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDN0IsT0FBTyxJQUFJLENBQUM7S0FDZjtJQUVELE9BQU8sMkJBQTJCLElBQUksY0FBYyxDQUFDO0FBQ3pELENBQUMifQ==