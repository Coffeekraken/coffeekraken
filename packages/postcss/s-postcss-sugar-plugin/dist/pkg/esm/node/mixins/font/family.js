import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
import { __dashCase } from '@coffeekraken/sugar/string';
/**
 * @name           family
 * @as              @s.font.family
 * @namespace      node.mixin.font
 * @type           PostcssMixin
 * @platform      postcss
 * @status        stable
 *
 * This mixin generate the css needed to apply a particular font in your css.
 * The font parameter accept any defined font family from the
 * config.theme.font.family stack
 *
 * @return        {Css}         The generated css
 *
 * @snippet         @s.font.family($1)
 *
 * @example        css
 * .my-cool-element {
 *    @s.font.family(title);
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginFontFamilyInterface extends __SInterface {
    static get _definition() {
        return {
            font: {
                type: 'String',
                values: Object.keys(__STheme.get('font.family')),
                required: true,
            },
        };
    }
}
export { postcssSugarPluginFontFamilyInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({ font: 'default' }, params);
    const vars = new CssVars();
    const fontFamilyObj = __STheme.get(`font.family.${finalParams.font}`);
    Object.keys(fontFamilyObj).forEach((prop) => {
        const dashProp = __dashCase(prop);
        switch (prop) {
            case 'fontFamily':
            case 'fontWeight':
            case 'fontStyle':
                vars.code(`${dashProp}: var(${`--s-font-family-${finalParams.font}-${dashProp}`}, ${fontFamilyObj[prop]});`);
                break;
            default:
                break;
        }
    });
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUV4RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F1Qkc7QUFFSCxNQUFNLHFDQUFzQyxTQUFRLFlBQVk7SUFDNUQsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILElBQUksRUFBRTtnQkFDRixJQUFJLEVBQUUsUUFBUTtnQkFDZCxNQUFNLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDO2dCQUNoRCxRQUFRLEVBQUUsSUFBSTthQUNqQjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFNRCxPQUFPLEVBQUUscUNBQXFDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFOUQsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLE9BQU8sRUFDUCxXQUFXLEdBTWQ7SUFDRyxNQUFNLFdBQVcsbUJBQ2IsSUFBSSxFQUFFLFNBQVMsSUFDWixNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7SUFFM0IsTUFBTSxhQUFhLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxlQUFlLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBRXRFLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDeEMsTUFBTSxRQUFRLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRWxDLFFBQVEsSUFBSSxFQUFFO1lBQ1YsS0FBSyxZQUFZLENBQUM7WUFDbEIsS0FBSyxZQUFZLENBQUM7WUFDbEIsS0FBSyxXQUFXO2dCQUNaLElBQUksQ0FBQyxJQUFJLENBQ0wsR0FBRyxRQUFRLFNBQVMsbUJBQW1CLFdBQVcsQ0FBQyxJQUFJLElBQUksUUFBUSxFQUFFLEtBQ2pFLGFBQWEsQ0FBQyxJQUFJLENBQ3RCLElBQUksQ0FDUCxDQUFDO2dCQUNGLE1BQU07WUFDVjtnQkFDSSxNQUFNO1NBQ2I7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUVILE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUMifQ==