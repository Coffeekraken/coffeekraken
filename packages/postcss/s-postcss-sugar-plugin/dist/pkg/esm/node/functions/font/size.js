import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
/**
 * @name          radius
 * @namespace     node.function.font
 * @type          PostcssFunction
 * @platform      postcss
 * @interface     ./size
 * @status        beta
 *
 * This function allows you to get a border size value depending on your theme config
 *
 * @param       {Number}        size      The radius to get
 * @param       {Boolean}       [scalable='theme.scalable.font']      Whether to scale the value or not
 * @return      {Css}                   The corresponding css
 *
 * @example       css
 * .my-element {
 *    font-size: sugar.font.size(20);
 * }
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginFontSizeInterface extends __SInterface {
    static get _definition() {
        return {
            size: {
                type: 'String',
                required: true,
                alias: 's',
            },
            scalable: {
                type: 'Boolean',
                default: __STheme.get('scalable.font'),
            },
        };
    }
}
export { postcssSugarPluginFontSizeInterface as interface };
export default function ({ params, }) {
    const finalParams = Object.assign({ size: '', scalable: false }, params);
    let sizes = finalParams.size.split(' ').map((s) => {
        let registeredValue, factor = '';
        // try to get the padding with the pased
        try {
            registeredValue = __STheme.get(`font.size.${s}`);
        }
        catch (e) { }
        // default return simply his value
        if (s === 'default') {
            // @ts-ignore
            factor = '1';
        }
        else if (registeredValue !== undefined) {
            // direct value
            factor = `sugar.theme(font.size.${s}, ${finalParams.scalable})`;
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
            throw new Error(`<yellow>[s-postcss-sugar-plugin]</yellow> Font size "<cyan>${s}</cyan>" is not a valid value`);
        }
        // generate css value
        return `calc(sugar.theme(font.size.default) * ${factor})`;
    });
    return sizes.join(' ');
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FxQkc7QUFFSCxNQUFNLG1DQUFvQyxTQUFRLFlBQVk7SUFDMUQsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILElBQUksRUFBRTtnQkFDRixJQUFJLEVBQUUsUUFBUTtnQkFDZCxRQUFRLEVBQUUsSUFBSTtnQkFDZCxLQUFLLEVBQUUsR0FBRzthQUNiO1lBQ0QsUUFBUSxFQUFFO2dCQUNOLElBQUksRUFBRSxTQUFTO2dCQUNmLE9BQU8sRUFBRSxRQUFRLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQzthQUN6QztTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFDRCxPQUFPLEVBQUUsbUNBQW1DLElBQUksU0FBUyxFQUFFLENBQUM7QUFPNUQsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEdBR1Q7SUFDRyxNQUFNLFdBQVcsbUJBQ2IsSUFBSSxFQUFFLEVBQUUsRUFDUixRQUFRLEVBQUUsS0FBSyxJQUNaLE1BQU0sQ0FDWixDQUFDO0lBRUYsSUFBSSxLQUFLLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7UUFDOUMsSUFBSSxlQUFlLEVBQ2YsTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUVoQix3Q0FBd0M7UUFDeEMsSUFBSTtZQUNBLGVBQWUsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUNwRDtRQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUU7UUFFZCxrQ0FBa0M7UUFDbEMsSUFBSSxDQUFDLEtBQUssU0FBUyxFQUFFO1lBQ2pCLGFBQWE7WUFDYixNQUFNLEdBQUcsR0FBRyxDQUFDO1NBQ2hCO2FBQU0sSUFBSSxlQUFlLEtBQUssU0FBUyxFQUFFO1lBQ3RDLGVBQWU7WUFDZixNQUFNLEdBQUcseUJBQXlCLENBQUMsS0FBSyxXQUFXLENBQUMsUUFBUSxHQUFHLENBQUM7U0FDbkU7YUFBTSxJQUNILEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDcEIsQ0FBQyxDQUFDLEtBQUssQ0FBQyw0QkFBNEIsQ0FBQyxFQUN2QztZQUNFLGtCQUFrQjtZQUNsQixNQUFNLEdBQUcsZUFBZSxDQUFDLEtBQUssV0FBVyxDQUFDLFFBQVEsR0FBRyxDQUFDO1NBQ3pEO2FBQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUM5Qix3QkFBd0I7WUFDeEIsTUFBTSxHQUFHLEdBQUcsQ0FBQyxFQUFFLENBQUM7U0FDbkI7YUFBTTtZQUNILE1BQU0sSUFBSSxLQUFLLENBQ1gsOERBQThELENBQUMsK0JBQStCLENBQ2pHLENBQUM7U0FDTDtRQUNELHFCQUFxQjtRQUNyQixPQUFPLHlDQUF5QyxNQUFNLEdBQUcsQ0FBQztJQUM5RCxDQUFDLENBQUMsQ0FBQztJQUVILE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUMzQixDQUFDIn0=