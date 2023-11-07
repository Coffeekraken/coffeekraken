import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
/**
 * @name          width
 * @as            s.border.width
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
 * @snippet         s.border.width($1)
 *
 * @example       css
 * .my-element {
 *    border-width: s.border.width(50);
 * }
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SSugarcssPluginBorderWidthFunctionInterface extends __SInterface {
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
export { SSugarcssPluginBorderWidthFunctionInterface as interface };
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
                return `s.scalable(${s})`;
            }
            return `${s}`;
        }
        else {
            return `calc(s.theme(border.width.default, ${finalParams.scalable}) * ${s})`;
        }
    });
    return widthes.join(' ');
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVCRztBQUVILE1BQU0sMkNBQTRDLFNBQVEsWUFBWTtJQUNsRSxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRSxRQUFRO2dCQUNkLE1BQU0sRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUM7Z0JBQ2pELE9BQU8sRUFBRSxTQUFTO2dCQUNsQixRQUFRLEVBQUUsSUFBSTthQUNqQjtZQUNELFFBQVEsRUFBRTtnQkFDTixJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsS0FBSzthQUNqQjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFDRCxPQUFPLEVBQUUsMkNBQTJDLElBQUksU0FBUyxFQUFFLENBQUM7QUFPcEUsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sZUFBZSxHQUlsQjtJQUNHLE1BQU0sV0FBVyxtQkFDYixLQUFLLEVBQUUsRUFBRSxFQUNULFFBQVEsRUFBRSxLQUFLLElBQ1osTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLEtBQUssR0FBRyxXQUFXLENBQUMsS0FBSyxDQUFDO0lBRWhDLE1BQU0sT0FBTyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7UUFDdkMsQ0FBQyxHQUFHLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUV2QixNQUFNLEdBQUcsR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2xELElBQUksR0FBRyxLQUFLLFNBQVMsRUFBRTtZQUNuQixDQUFDLEdBQUcsR0FBRyxDQUFDO1NBQ1g7UUFFRCxrQ0FBa0M7UUFDbEMsSUFBSSxHQUFHLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsRUFBRTtZQUM1QixhQUFhO1lBQ2IsSUFBSSxXQUFXLENBQUMsUUFBUSxFQUFFO2dCQUN0QixPQUFPLGNBQWMsQ0FBQyxHQUFHLENBQUM7YUFDN0I7WUFDRCxPQUFPLEdBQUcsQ0FBQyxFQUFFLENBQUM7U0FDakI7YUFBTTtZQUNILE9BQU8sc0NBQXNDLFdBQVcsQ0FBQyxRQUFRLE9BQU8sQ0FBQyxHQUFHLENBQUM7U0FDaEY7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUVILE9BQU8sT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUM3QixDQUFDIn0=