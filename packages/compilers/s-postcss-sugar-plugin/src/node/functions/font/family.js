import __SInterface from '@coffeekraken/s-interface';
import __isValidUnitValue from '@coffeekraken/sugar/shared/css/isValidUnitValue';
/**
 * @name          family
 * @namespace     node.function.font
 * @type          PostcssFunction
 * @platform      postcss
 * @status        beta
 *
 * This function allows you to get a font family value depending on your theme config
 *
 * @param       {String}        name      The font name to get
 * @return      {Css}                   The corresponding css
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
    if (__isValidUnitValue(name)) {
        return name;
    }
    return `sugar.theme(font.family.${name}.font-family)`;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFtaWx5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmFtaWx5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sa0JBQWtCLE1BQU0saURBQWlELENBQUM7QUFFakY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FtQkc7QUFFSCxNQUFNLHFDQUFzQyxTQUFRLFlBQVk7SUFDNUQsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILElBQUksRUFBRTtnQkFDRixJQUFJLEVBQUUsUUFBUTtnQkFDZCxRQUFRLEVBQUUsSUFBSTtnQkFDZCxLQUFLLEVBQUUsR0FBRzthQUNiO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQUNELE9BQU8sRUFBRSxxQ0FBcUMsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQU05RCxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3JCLE1BQU0sR0FHVDtJQUNHLE1BQU0sV0FBVyxtQkFDYixJQUFJLEVBQUUsRUFBRSxJQUNMLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQztJQUU5QixJQUFJLGtCQUFrQixDQUFDLElBQUksQ0FBQyxFQUFFO1FBQzFCLE9BQU8sSUFBSSxDQUFDO0tBQ2Y7SUFFRCxPQUFPLDJCQUEyQixJQUFJLGVBQWUsQ0FBQztBQUMxRCxDQUFDIn0=