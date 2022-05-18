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
export default function ({ params, }) {
    const finalParams = Object.assign({ margin: '', scalable: false }, params);
    const margin = finalParams.margin;
    let margins = margin.split(' ').map((s) => {
        let registeredValue, factor = '';
        // try to get the padding with the pased
        try {
            registeredValue = __STheme.get(`margin.${s}`);
        }
        catch (e) { }
        // default return simply his value
        if (s === 'default') {
            // @ts-ignore
            factor = '1';
        }
        else if (registeredValue !== undefined) {
            factor = `sugar.theme(margin.${s}, ${finalParams.scalable})`;
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
            throw new Error(`<yellow>[s-postcss-sugar-plugin]</yellow> Margin "<cyan>${s}</cyan>" is not a valid value`);
        }
        // generate css value
        return `calc(sugar.theme(margin.default) * ${factor})`;
    });
    return margins.join(' ');
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FxQkc7QUFFSCxNQUFNLHlDQUEwQyxTQUFRLFlBQVk7SUFDaEUsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILE1BQU0sRUFBRTtnQkFDSixJQUFJLEVBQUUsUUFBUTtnQkFDZCxNQUFNLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUMzQyxPQUFPLEVBQUUsU0FBUztnQkFDbEIsUUFBUSxFQUFFLElBQUk7YUFDakI7WUFDRCxRQUFRLEVBQUU7Z0JBQ04sSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLFFBQVEsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUM7YUFDM0M7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBQ0QsT0FBTyxFQUFFLHlDQUF5QyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBT2xFLE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxHQUdUO0lBQ0csTUFBTSxXQUFXLG1CQUNiLE1BQU0sRUFBRSxFQUFFLEVBQ1YsUUFBUSxFQUFFLEtBQUssSUFDWixNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sTUFBTSxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUM7SUFDbEMsSUFBSSxPQUFPLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtRQUN0QyxJQUFJLGVBQWUsRUFDZixNQUFNLEdBQUcsRUFBRSxDQUFDO1FBRWhCLHdDQUF3QztRQUN4QyxJQUFJO1lBQ0EsZUFBZSxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQ2pEO1FBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRTtRQUVkLGtDQUFrQztRQUNsQyxJQUFJLENBQUMsS0FBSyxTQUFTLEVBQUU7WUFDakIsYUFBYTtZQUNiLE1BQU0sR0FBRyxHQUFHLENBQUM7U0FDaEI7YUFBTSxJQUFJLGVBQWUsS0FBSyxTQUFTLEVBQUU7WUFDdEMsTUFBTSxHQUFHLHNCQUFzQixDQUFDLEtBQUssV0FBVyxDQUFDLFFBQVEsR0FBRyxDQUFDO1NBQ2hFO2FBQU0sSUFDSCxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLENBQUMsQ0FBQyxLQUFLLENBQUMsNEJBQTRCLENBQUMsRUFDdkM7WUFDRSxrQkFBa0I7WUFDbEIsTUFBTSxHQUFHLGVBQWUsQ0FBQyxLQUFLLFdBQVcsQ0FBQyxRQUFRLEdBQUcsQ0FBQztTQUN6RDthQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDOUIsd0JBQXdCO1lBQ3hCLE1BQU0sR0FBRyxHQUFHLENBQUMsRUFBRSxDQUFDO1NBQ25CO2FBQU07WUFDSCxNQUFNLElBQUksS0FBSyxDQUNYLDJEQUEyRCxDQUFDLCtCQUErQixDQUM5RixDQUFDO1NBQ0w7UUFDRCxxQkFBcUI7UUFDckIsT0FBTyxzQ0FBc0MsTUFBTSxHQUFHLENBQUM7SUFDM0QsQ0FBQyxDQUFDLENBQUM7SUFFSCxPQUFPLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDN0IsQ0FBQyJ9