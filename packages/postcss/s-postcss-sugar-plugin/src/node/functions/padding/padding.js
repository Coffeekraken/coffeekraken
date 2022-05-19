import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
/**
 * @name          padding
 * @namespace     node.function.padding
 * @type          PostcssFunction
 * @platform      postcss
 * @interface       ./padding
 * @status        beta
 *
 * This function allows you to get a padding value depending on your theme config
 *
 * @param       {String}        padding      The padding to get
 * @param       {Boolean}       [scalable='theme.scalable.padding']      Whether to scale the value or not
 * @return      {Css}                   The corresponding css
 *
 * @example       css
 * .my-element {
 *      padding-top: sugar.padding(30);
 * }
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginPaddingFunctionInterface extends __SInterface {
    static get _definition() {
        return {
            padding: {
                type: 'String',
                values: Object.keys(__STheme.get('padding')),
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
export { postcssSugarPluginPaddingFunctionInterface as interface };
export default function ({ params, }) {
    const finalParams = Object.assign({ padding: '', scalable: true }, params);
    const padding = finalParams.padding;
    let paddings = padding.split(' ').map((s) => {
        let registeredValue, factor = '';
        // try to get the padding with the pased
        try {
            registeredValue = __STheme.get(`padding.${s}`);
        }
        catch (e) { }
        // default return simply his value
        if (s === 'default') {
            // @ts-ignore
            factor = '1';
        }
        else if (registeredValue !== undefined) {
            factor = `sugar.theme(padding.${s}, ${finalParams.scalable})`;
        }
        else if (isNaN(parseFloat(s)) &&
            s.match(/[a-zA-Z0-9]+\.[a-zA-Z0-9]+/)) {
            // support dotPath
            factor = `sugar.theme(${s}, ${finalParams.scalable})`;
        }
        else if (!isNaN(parseFloat(s))) {
            // support simple number
            factor = `${s}`;
        }
        else {
            throw new Error(`<yellow>[s-postcss-sugar-plugin]</yellow> Padding "<cyan>${s}</cyan>" is not a valid value`);
        }
        // generate css value
        return `calc(sugar.theme(padding.default) * ${factor})`;
    });
    return paddings.join(' ');
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FxQkc7QUFFSCxNQUFNLDBDQUEyQyxTQUFRLFlBQVk7SUFDakUsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILE9BQU8sRUFBRTtnQkFDTCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxNQUFNLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUM1QyxPQUFPLEVBQUUsU0FBUztnQkFDbEIsUUFBUSxFQUFFLElBQUk7YUFDakI7WUFDRCxRQUFRLEVBQUU7Z0JBQ04sSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLFFBQVEsQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUM7YUFDNUM7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBQ0QsT0FBTyxFQUFFLDBDQUEwQyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBT25FLE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxHQUdUO0lBQ0csTUFBTSxXQUFXLG1CQUNiLE9BQU8sRUFBRSxFQUFFLEVBQ1gsUUFBUSxFQUFFLElBQUksSUFDWCxNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sT0FBTyxHQUFHLFdBQVcsQ0FBQyxPQUFPLENBQUM7SUFDcEMsSUFBSSxRQUFRLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtRQUN4QyxJQUFJLGVBQWUsRUFDZixNQUFNLEdBQUcsRUFBRSxDQUFDO1FBRWhCLHdDQUF3QztRQUN4QyxJQUFJO1lBQ0EsZUFBZSxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQ2xEO1FBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRTtRQUVkLGtDQUFrQztRQUNsQyxJQUFJLENBQUMsS0FBSyxTQUFTLEVBQUU7WUFDakIsYUFBYTtZQUNiLE1BQU0sR0FBRyxHQUFHLENBQUM7U0FDaEI7YUFBTSxJQUFJLGVBQWUsS0FBSyxTQUFTLEVBQUU7WUFDdEMsTUFBTSxHQUFHLHVCQUF1QixDQUFDLEtBQUssV0FBVyxDQUFDLFFBQVEsR0FBRyxDQUFDO1NBQ2pFO2FBQU0sSUFDSCxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLENBQUMsQ0FBQyxLQUFLLENBQUMsNEJBQTRCLENBQUMsRUFDdkM7WUFDRSxrQkFBa0I7WUFDbEIsTUFBTSxHQUFHLGVBQWUsQ0FBQyxLQUFLLFdBQVcsQ0FBQyxRQUFRLEdBQUcsQ0FBQztTQUN6RDthQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDOUIsd0JBQXdCO1lBQ3hCLE1BQU0sR0FBRyxHQUFHLENBQUMsRUFBRSxDQUFDO1NBQ25CO2FBQU07WUFDSCxNQUFNLElBQUksS0FBSyxDQUNYLDREQUE0RCxDQUFDLCtCQUErQixDQUMvRixDQUFDO1NBQ0w7UUFDRCxxQkFBcUI7UUFDckIsT0FBTyx1Q0FBdUMsTUFBTSxHQUFHLENBQUM7SUFDNUQsQ0FBQyxDQUFDLENBQUM7SUFFSCxPQUFPLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDOUIsQ0FBQyJ9