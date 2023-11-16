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
                values: Object.keys(__STheme.current.get('borderWidth')),
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
        let size = themeValueProxy(s);
        const val = __STheme.current.getSafe(`borderWidth.${s}`);
        if (val !== undefined) {
            size = val;
        }
        if (isNaN(parseFloat(size)) &&
            size.match(/[a-zA-Z0-9]+\.[a-zA-Z0-9]+/) &&
            !size.match(/^s\./)) {
            return `s.theme(${size}, ${finalParams.scalable})`;
        }
        else if (`${size}`.match(/[a-zA-Z]+$/)) {
            if (finalParams.scalable) {
                return `s.scalable(${size})`;
            }
            return `${size}`;
        }
        else {
            if (finalParams.scalable) {
                return `calc(s.scalable(${size}) * 1px)`;
            }
            return `${size}px`;
        }
    });
    return widthes.join(' ');
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVCRztBQUVILE1BQU0sMkNBQTRDLFNBQVEsWUFBWTtJQUNsRSxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRSxRQUFRO2dCQUNkLE1BQU0sRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDO2dCQUN4RCxPQUFPLEVBQUUsU0FBUztnQkFDbEIsUUFBUSxFQUFFLElBQUk7YUFDakI7WUFDRCxRQUFRLEVBQUU7Z0JBQ04sSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLEtBQUs7YUFDakI7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBQ0QsT0FBTyxFQUFFLDJDQUEyQyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBT3BFLE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLGVBQWUsR0FJbEI7SUFDRyxNQUFNLFdBQVcsbUJBQ2IsS0FBSyxFQUFFLEVBQUUsRUFDVCxRQUFRLEVBQUUsS0FBSyxJQUNaLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxLQUFLLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQztJQUVoQyxNQUFNLE9BQU8sR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO1FBQ3ZDLElBQUksSUFBSSxHQUFHLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUU5QixNQUFNLEdBQUcsR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDekQsSUFBSSxHQUFHLEtBQUssU0FBUyxFQUFFO1lBQ25CLElBQUksR0FBRyxHQUFHLENBQUM7U0FDZDtRQUVELElBQ0ksS0FBSyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN2QixJQUFJLENBQUMsS0FBSyxDQUFDLDRCQUE0QixDQUFDO1lBQ3hDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFDckI7WUFDRSxPQUFPLFdBQVcsSUFBSSxLQUFLLFdBQVcsQ0FBQyxRQUFRLEdBQUcsQ0FBQztTQUN0RDthQUFNLElBQUksR0FBRyxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLEVBQUU7WUFDdEMsSUFBSSxXQUFXLENBQUMsUUFBUSxFQUFFO2dCQUN0QixPQUFPLGNBQWMsSUFBSSxHQUFHLENBQUM7YUFDaEM7WUFDRCxPQUFPLEdBQUcsSUFBSSxFQUFFLENBQUM7U0FDcEI7YUFBTTtZQUNILElBQUksV0FBVyxDQUFDLFFBQVEsRUFBRTtnQkFDdEIsT0FBTyxtQkFBbUIsSUFBSSxVQUFVLENBQUM7YUFDNUM7WUFDRCxPQUFPLEdBQUcsSUFBSSxJQUFJLENBQUM7U0FDdEI7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUVILE9BQU8sT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUM3QixDQUFDIn0=