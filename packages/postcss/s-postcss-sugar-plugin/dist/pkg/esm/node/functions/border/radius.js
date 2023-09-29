import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
/**
 * @name          radius
 * @as            s.border.radius
 * @namespace     node.function.border
 * @type          PostcssFunction
 * @platform      postcss
 * @interface       ./radius
 * @status        beta
 *
 * This function allows you to get a border radius value depending on your theme config
 *
 * @param       {String}        radius      The radius to get
 * @param       {Boolean}       [scalable='theme.scalable.padding']      Whether to scale the value or not
 * @return      {Css}                   The corresponding css
 *
 * @snippet         s.border.radius($1)
 *
 * @example       css
 * .my-element {
 *    border-radius: s.border.radius(30);
 * }
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginBorderRadiusFunctionInterface extends __SInterface {
    static get _definition() {
        return {
            radius: {
                type: 'String',
                values: [
                    ...Object.keys(__STheme.get('border.radius')),
                    'shape',
                ],
                default: 'default',
                required: true,
            },
            scalable: {
                type: 'Boolean',
                default: __STheme.get('scalable.padding'),
            },
        };
    }
}
export { postcssSugarPluginBorderRadiusFunctionInterface as interface };
export default function ({ params, themeValueProxy, }) {
    const finalParams = Object.assign({ radius: '', scalable: true }, params);
    let radiuses = finalParams.radius.split(' ').map((s) => {
        let val;
        // theme value
        s = themeValueProxy(s);
        // try to get the padding with the pased
        val = __STheme.getSafe(`border.radius.${s}`);
        if (val !== undefined) {
            s = val;
        }
        // default return simply his value
        if (s === 'shape') {
            return `var(--s-shape, s.theme(border.radius.default, ${finalParams.scalable}))`;
        }
        else if (`${s}`.match(/[a-zA-Z]+$/)) {
            // @ts-ignore
            if (finalParams.scalable) {
                return `s.scalable(${s})`;
            }
            return `${s}`;
        }
        else {
            return `calc(s.theme(border.radius.default, ${finalParams.scalable}) * ${s})`;
        }
    });
    return radiuses.join(' ');
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F3Qkc7QUFFSCxNQUFNLCtDQUFnRCxTQUFRLFlBQVk7SUFDdEUsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILE1BQU0sRUFBRTtnQkFDSixJQUFJLEVBQUUsUUFBUTtnQkFDZCxNQUFNLEVBQUU7b0JBQ0osR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7b0JBQzdDLE9BQU87aUJBQ1Y7Z0JBQ0QsT0FBTyxFQUFFLFNBQVM7Z0JBQ2xCLFFBQVEsRUFBRSxJQUFJO2FBQ2pCO1lBQ0QsUUFBUSxFQUFFO2dCQUNOLElBQUksRUFBRSxTQUFTO2dCQUNmLE9BQU8sRUFBRSxRQUFRLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDO2FBQzVDO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQUNELE9BQU8sRUFBRSwrQ0FBK0MsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQU94RSxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3JCLE1BQU0sRUFDTixlQUFlLEdBSWxCO0lBQ0csTUFBTSxXQUFXLG1CQUNiLE1BQU0sRUFBRSxFQUFFLEVBQ1YsUUFBUSxFQUFFLElBQUksSUFDWCxNQUFNLENBQ1osQ0FBQztJQUVGLElBQUksUUFBUSxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO1FBQ25ELElBQUksR0FBRyxDQUFDO1FBRVIsY0FBYztRQUNkLENBQUMsR0FBRyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFdkIsd0NBQXdDO1FBQ3hDLEdBQUcsR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRTdDLElBQUksR0FBRyxLQUFLLFNBQVMsRUFBRTtZQUNuQixDQUFDLEdBQUcsR0FBRyxDQUFDO1NBQ1g7UUFFRCxrQ0FBa0M7UUFDbEMsSUFBSSxDQUFDLEtBQUssT0FBTyxFQUFFO1lBQ2YsT0FBTyxpREFBaUQsV0FBVyxDQUFDLFFBQVEsSUFBSSxDQUFDO1NBQ3BGO2FBQU0sSUFBSSxHQUFHLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsRUFBRTtZQUNuQyxhQUFhO1lBQ2IsSUFBSSxXQUFXLENBQUMsUUFBUSxFQUFFO2dCQUN0QixPQUFPLGNBQWMsQ0FBQyxHQUFHLENBQUM7YUFDN0I7WUFDRCxPQUFPLEdBQUcsQ0FBQyxFQUFFLENBQUM7U0FDakI7YUFBTTtZQUNILE9BQU8sdUNBQXVDLFdBQVcsQ0FBQyxRQUFRLE9BQU8sQ0FBQyxHQUFHLENBQUM7U0FDakY7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUVILE9BQU8sUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUM5QixDQUFDIn0=