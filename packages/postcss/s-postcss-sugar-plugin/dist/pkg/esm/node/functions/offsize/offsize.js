import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
/**
 * @name          offsize
 * @as          sugar.offsize
 * @namespace     node.function.offsize
 * @type          PostcssFunction
 * @platform      postcss
 * @interface       ./offsize
 * @status        beta
 *
 * This function allows you to get an offsize value depending on your theme config
 *
 * @param       {String}        offsize      The offsize to get
 * @param       {Boolean}       [scalable='theme.scalable.offsize']      Whether to scale the value or not
 * @return      {Css}                   The corresponding css
 *
 * @snippet         sugar.offsize($1)
 *
 * @example       css
 * .my-element {
 *      margin-top: sugar.offsize(20);
 * }
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginOffsizeFunctionInterface extends __SInterface {
    static get _definition() {
        return {
            offsize: {
                type: 'String',
                values: Object.keys(__STheme.get('offsize')),
                default: 'default',
                required: true,
            },
            scalable: {
                type: 'Boolean',
                default: __STheme.get('scalable.offsize'),
            },
        };
    }
}
export { postcssSugarPluginOffsizeFunctionInterface as interface };
export default function ({ params, }) {
    const finalParams = Object.assign({ offsize: '', scalable: false }, params);
    const offsize = finalParams.offsize;
    let offsizes = offsize.split(' ').map((s) => {
        let registeredValue, factor = '';
        // try to get the padding with the pased
        try {
            registeredValue = __STheme.get(`offsize.${s}`);
        }
        catch (e) { }
        // default return simply his value
        if (s === 'default') {
            // @ts-ignore
            factor = '1';
        }
        else if (registeredValue !== undefined) {
            factor = `sugar.theme(offsize.${s}, ${finalParams.scalable})`;
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
            throw new Error(`<yellow>[s-postcss-sugar-plugin]</yellow> Offsize "<cyan>${s}</cyan>" is not a valid value`);
        }
        // generate css value
        return `calc(sugar.theme(offsize.default) * ${factor})`;
    });
    return offsizes.join(' ');
    // const offsize = finalParams.offsize;
    // let offsizes = offsize.split(' ').map((s) => {
    //     // support dotPath
    //     if (s.match(/\./)) {
    //         s = `sugar.theme(${s}, ${finalParams.scalable})`;
    //     } else {
    //         s = `sugar.theme(offsize.${s}, ${finalParams.scalable})`;
    //     }
    //     // generate css value
    //     return `calc(sugar.theme(offsize.default) * ${s})`;
    // });
    // return offsizes.join(' ');
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F3Qkc7QUFFSCxNQUFNLDBDQUEyQyxTQUFRLFlBQVk7SUFDakUsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILE9BQU8sRUFBRTtnQkFDTCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxNQUFNLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUM1QyxPQUFPLEVBQUUsU0FBUztnQkFDbEIsUUFBUSxFQUFFLElBQUk7YUFDakI7WUFDRCxRQUFRLEVBQUU7Z0JBQ04sSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLFFBQVEsQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUM7YUFDNUM7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBQ0QsT0FBTyxFQUFFLDBDQUEwQyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBT25FLE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxHQUdUO0lBQ0csTUFBTSxXQUFXLG1CQUNiLE9BQU8sRUFBRSxFQUFFLEVBQ1gsUUFBUSxFQUFFLEtBQUssSUFDWixNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sT0FBTyxHQUFHLFdBQVcsQ0FBQyxPQUFPLENBQUM7SUFDcEMsSUFBSSxRQUFRLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtRQUN4QyxJQUFJLGVBQWUsRUFDZixNQUFNLEdBQUcsRUFBRSxDQUFDO1FBRWhCLHdDQUF3QztRQUN4QyxJQUFJO1lBQ0EsZUFBZSxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQ2xEO1FBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRTtRQUVkLGtDQUFrQztRQUNsQyxJQUFJLENBQUMsS0FBSyxTQUFTLEVBQUU7WUFDakIsYUFBYTtZQUNiLE1BQU0sR0FBRyxHQUFHLENBQUM7U0FDaEI7YUFBTSxJQUFJLGVBQWUsS0FBSyxTQUFTLEVBQUU7WUFDdEMsTUFBTSxHQUFHLHVCQUF1QixDQUFDLEtBQUssV0FBVyxDQUFDLFFBQVEsR0FBRyxDQUFDO1NBQ2pFO2FBQU0sSUFDSCxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLENBQUMsQ0FBQyxLQUFLLENBQUMsNEJBQTRCLENBQUMsRUFDdkM7WUFDRSxrQkFBa0I7WUFDbEIsTUFBTSxHQUFHLGVBQWUsQ0FBQyxLQUFLLFdBQVcsQ0FBQyxRQUFRLEdBQUcsQ0FBQztTQUN6RDthQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDOUIsd0JBQXdCO1lBQ3hCLE1BQU0sR0FBRyxHQUFHLENBQUMsRUFBRSxDQUFDO1NBQ25CO2FBQU07WUFDSCxNQUFNLElBQUksS0FBSyxDQUNYLDREQUE0RCxDQUFDLCtCQUErQixDQUMvRixDQUFDO1NBQ0w7UUFDRCxxQkFBcUI7UUFDckIsT0FBTyx1Q0FBdUMsTUFBTSxHQUFHLENBQUM7SUFDNUQsQ0FBQyxDQUFDLENBQUM7SUFFSCxPQUFPLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFMUIsdUNBQXVDO0lBQ3ZDLGlEQUFpRDtJQUNqRCx5QkFBeUI7SUFDekIsMkJBQTJCO0lBQzNCLDREQUE0RDtJQUM1RCxlQUFlO0lBQ2Ysb0VBQW9FO0lBQ3BFLFFBQVE7SUFDUiw0QkFBNEI7SUFDNUIsMERBQTBEO0lBQzFELE1BQU07SUFFTiw2QkFBNkI7QUFDakMsQ0FBQyJ9