import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
/**
 * @name          width
 * @as            sugar.border.width
 * @namespace     node.function.border
 * @type          PostcssFunction
 * @platform      postcss
 * @interface       ./width
 * @status        beta
 *
 * This function allows you to get a border width value depending on your theme config
 *
 * @param       {String}        width      The width to get
 * @return      {Css}                   The corresponding css
 *
 * @snippet         sugar.border.width($1)
 *
 * @example       css
 * .my-element {
 *    border-width: sugar.border.width(50);
 * }
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginBorderWidthFunctionInterface extends __SInterface {
    static get _definition() {
        return {
            width: {
                type: 'String',
                values: Object.keys(__STheme.get('border.width')),
                default: 'default',
                required: true,
            },
            scalable: {
                type: 'Boolean',
                default: false,
            },
        };
    }
}
export { postcssSugarPluginBorderWidthFunctionInterface as interface };
export default function ({ params, themeValueProxy, }) {
    const finalParams = Object.assign({ width: '', scalable: false }, params);
    const width = finalParams.width;
    const widthes = width.split(' ').map((s) => {
        s = themeValueProxy(s);
        const val = __STheme.getSafe(`border.width.${s}`);
        if (val !== undefined) {
            s = val;
        }
        // default return simply his value
        if (`${s}`.match(/[a-zA-Z]+$/)) {
            // @ts-ignore
            if (finalParams.scalable) {
                return `sugar.scalable(${s})`;
            }
            return `${s}`;
        }
        else {
            return `calc(sugar.theme(border.width.default, ${finalParams.scalable}) * ${s})`;
        }
    });
    return widthes.join(' ');
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVCRztBQUVILE1BQU0sOENBQStDLFNBQVEsWUFBWTtJQUNyRSxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRSxRQUFRO2dCQUNkLE1BQU0sRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUM7Z0JBQ2pELE9BQU8sRUFBRSxTQUFTO2dCQUNsQixRQUFRLEVBQUUsSUFBSTthQUNqQjtZQUNELFFBQVEsRUFBRTtnQkFDTixJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsS0FBSzthQUNqQjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFDRCxPQUFPLEVBQUUsOENBQThDLElBQUksU0FBUyxFQUFFLENBQUM7QUFPdkUsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sZUFBZSxHQUlsQjtJQUNHLE1BQU0sV0FBVyxtQkFDYixLQUFLLEVBQUUsRUFBRSxFQUNULFFBQVEsRUFBRSxLQUFLLElBQ1osTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLEtBQUssR0FBRyxXQUFXLENBQUMsS0FBSyxDQUFDO0lBRWhDLE1BQU0sT0FBTyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7UUFDdkMsQ0FBQyxHQUFHLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUV2QixNQUFNLEdBQUcsR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2xELElBQUksR0FBRyxLQUFLLFNBQVMsRUFBRTtZQUNuQixDQUFDLEdBQUcsR0FBRyxDQUFDO1NBQ1g7UUFFRCxrQ0FBa0M7UUFDbEMsSUFBSSxHQUFHLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsRUFBRTtZQUM1QixhQUFhO1lBQ2IsSUFBSSxXQUFXLENBQUMsUUFBUSxFQUFFO2dCQUN0QixPQUFPLGtCQUFrQixDQUFDLEdBQUcsQ0FBQzthQUNqQztZQUNELE9BQU8sR0FBRyxDQUFDLEVBQUUsQ0FBQztTQUNqQjthQUFNO1lBQ0gsT0FBTywwQ0FBMEMsV0FBVyxDQUFDLFFBQVEsT0FBTyxDQUFDLEdBQUcsQ0FBQztTQUNwRjtJQUNMLENBQUMsQ0FBQyxDQUFDO0lBRUgsT0FBTyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzdCLENBQUMifQ==