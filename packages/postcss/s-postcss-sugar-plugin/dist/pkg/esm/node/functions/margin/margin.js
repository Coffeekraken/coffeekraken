import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
/**
 * @name          margin
 * @namespace     node.function.margin
 * @type          PostcssFunction
 * @platform      postcss
 * @interface       ./margin
 * @status        beta
 *
 * This function allows you to get a margin value depending on your theme config
 *
 * @param       {String}        margin      The margin to get
 * @param       {Boolean}       [scalable='theme.scalable.margin']      Whether to scale the value or not
 * @return      {Css}                   The corresponding css
 *
 * @example       css
 * .my-element {
 *      margin-top: sugar.margin(20);
 * }
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginMarginFunctionInterface extends __SInterface {
    static get _definition() {
        return {
            margin: {
                type: 'String',
                values: Object.keys(__STheme.get('margin')),
                default: 'default',
                required: true,
            },
            scalable: {
                type: 'Boolean',
                default: __STheme.get('scalable.margin'),
            },
        };
    }
}
export { postcssSugarPluginMarginFunctionInterface as interface };
export default function ({ params, themeValueProxy, }) {
    const finalParams = Object.assign({ margin: '', scalable: true }, params);
    const margin = finalParams.margin;
    let margins = `${margin}`.split(' ').map((s) => {
        let val;
        // theme value
        s = themeValueProxy(s);
        // try to get the margin with the pased
        val = __STheme.getSafe(`margin.${s}`);
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
            return `calc(sugar.theme(margin.default, ${finalParams.scalable}) * ${s})`;
        }
    });
    return margins.join(' ');
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FxQkc7QUFFSCxNQUFNLHlDQUEwQyxTQUFRLFlBQVk7SUFDaEUsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILE1BQU0sRUFBRTtnQkFDSixJQUFJLEVBQUUsUUFBUTtnQkFDZCxNQUFNLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUMzQyxPQUFPLEVBQUUsU0FBUztnQkFDbEIsUUFBUSxFQUFFLElBQUk7YUFDakI7WUFDRCxRQUFRLEVBQUU7Z0JBQ04sSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLFFBQVEsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUM7YUFDM0M7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBQ0QsT0FBTyxFQUFFLHlDQUF5QyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBT2xFLE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLGVBQWUsR0FJbEI7SUFDRyxNQUFNLFdBQVcsbUJBQ2IsTUFBTSxFQUFFLEVBQUUsRUFDVixRQUFRLEVBQUUsSUFBSSxJQUNYLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxNQUFNLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQztJQUNsQyxJQUFJLE9BQU8sR0FBRyxHQUFHLE1BQU0sRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtRQUMzQyxJQUFJLEdBQUcsQ0FBQztRQUVSLGNBQWM7UUFDZCxDQUFDLEdBQUcsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRXZCLHVDQUF1QztRQUN2QyxHQUFHLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDdEMsSUFBSSxHQUFHLEtBQUssU0FBUyxFQUFFO1lBQ25CLENBQUMsR0FBRyxHQUFHLENBQUM7U0FDWDtRQUVELGtDQUFrQztRQUNsQyxJQUFJLEdBQUcsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxFQUFFO1lBQzVCLGFBQWE7WUFDYixJQUFJLFdBQVcsQ0FBQyxRQUFRLEVBQUU7Z0JBQ3RCLE9BQU8sa0JBQWtCLENBQUMsR0FBRyxDQUFDO2FBQ2pDO1lBQ0QsT0FBTyxHQUFHLENBQUMsRUFBRSxDQUFDO1NBQ2pCO2FBQU07WUFDSCxPQUFPLG9DQUFvQyxXQUFXLENBQUMsUUFBUSxPQUFPLENBQUMsR0FBRyxDQUFDO1NBQzlFO0lBQ0wsQ0FBQyxDQUFDLENBQUM7SUFFSCxPQUFPLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDN0IsQ0FBQyJ9