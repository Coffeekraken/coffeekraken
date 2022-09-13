"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
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
class postcssSugarPluginFontSizeInterface extends s_interface_1.default {
    static get _definition() {
        return {
            size: {
                type: 'String',
                required: true,
                alias: 's',
            },
            scalable: {
                type: 'Boolean',
                default: s_theme_1.default.get('scalable.font'),
            },
        };
    }
}
exports.interface = postcssSugarPluginFontSizeInterface;
function default_1({ params, }) {
    const finalParams = Object.assign({ size: '', scalable: false }, params);
    let sizes = finalParams.size.split(' ').map((s) => {
        let registeredValue, factor = '';
        // try to get the padding with the pased
        try {
            registeredValue = s_theme_1.default.get(`font.size.${s}`);
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
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFFN0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXFCRztBQUVILE1BQU0sbUNBQW9DLFNBQVEscUJBQVk7SUFDMUQsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILElBQUksRUFBRTtnQkFDRixJQUFJLEVBQUUsUUFBUTtnQkFDZCxRQUFRLEVBQUUsSUFBSTtnQkFDZCxLQUFLLEVBQUUsR0FBRzthQUNiO1lBQ0QsUUFBUSxFQUFFO2dCQUNOLElBQUksRUFBRSxTQUFTO2dCQUNmLE9BQU8sRUFBRSxpQkFBUSxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUM7YUFDekM7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBQytDLHdEQUFTO0FBT3pELG1CQUF5QixFQUNyQixNQUFNLEdBR1Q7SUFDRyxNQUFNLFdBQVcsbUJBQ2IsSUFBSSxFQUFFLEVBQUUsRUFDUixRQUFRLEVBQUUsS0FBSyxJQUNaLE1BQU0sQ0FDWixDQUFDO0lBRUYsSUFBSSxLQUFLLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7UUFDOUMsSUFBSSxlQUFlLEVBQ2YsTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUVoQix3Q0FBd0M7UUFDeEMsSUFBSTtZQUNBLGVBQWUsR0FBRyxpQkFBUSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDcEQ7UUFBQyxPQUFPLENBQUMsRUFBRSxHQUFFO1FBRWQsa0NBQWtDO1FBQ2xDLElBQUksQ0FBQyxLQUFLLFNBQVMsRUFBRTtZQUNqQixhQUFhO1lBQ2IsTUFBTSxHQUFHLEdBQUcsQ0FBQztTQUNoQjthQUFNLElBQUksZUFBZSxLQUFLLFNBQVMsRUFBRTtZQUN0QyxlQUFlO1lBQ2YsTUFBTSxHQUFHLHlCQUF5QixDQUFDLEtBQUssV0FBVyxDQUFDLFFBQVEsR0FBRyxDQUFDO1NBQ25FO2FBQU0sSUFDSCxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLENBQUMsQ0FBQyxLQUFLLENBQUMsNEJBQTRCLENBQUMsRUFDdkM7WUFDRSxrQkFBa0I7WUFDbEIsTUFBTSxHQUFHLGVBQWUsQ0FBQyxLQUFLLFdBQVcsQ0FBQyxRQUFRLEdBQUcsQ0FBQztTQUN6RDthQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDOUIsd0JBQXdCO1lBQ3hCLE1BQU0sR0FBRyxHQUFHLENBQUMsRUFBRSxDQUFDO1NBQ25CO2FBQU07WUFDSCxNQUFNLElBQUksS0FBSyxDQUNYLDhEQUE4RCxDQUFDLCtCQUErQixDQUNqRyxDQUFDO1NBQ0w7UUFDRCxxQkFBcUI7UUFDckIsT0FBTyx5Q0FBeUMsTUFBTSxHQUFHLENBQUM7SUFDOUQsQ0FBQyxDQUFDLENBQUM7SUFFSCxPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDM0IsQ0FBQztBQTlDRCw0QkE4Q0MifQ==