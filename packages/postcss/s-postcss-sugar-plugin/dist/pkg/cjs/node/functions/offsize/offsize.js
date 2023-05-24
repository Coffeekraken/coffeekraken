"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
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
class postcssSugarPluginOffsizeFunctionInterface extends s_interface_1.default {
    static get _definition() {
        return {
            offsize: {
                type: 'String',
                values: Object.keys(s_theme_1.default.get('offsize')),
                default: 'default',
                required: true,
            },
            scalable: {
                type: 'Boolean',
                default: s_theme_1.default.get('scalable.offsize'),
            },
        };
    }
}
exports.interface = postcssSugarPluginOffsizeFunctionInterface;
function default_1({ params, }) {
    const finalParams = Object.assign({ offsize: '', scalable: false }, params);
    const offsize = finalParams.offsize;
    let offsizes = offsize.split(' ').map((s) => {
        let registeredValue, factor = '';
        // try to get the padding with the pased
        try {
            registeredValue = s_theme_1.default.get(`offsize.${s}`);
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
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFFN0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXdCRztBQUVILE1BQU0sMENBQTJDLFNBQVEscUJBQVk7SUFDakUsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILE9BQU8sRUFBRTtnQkFDTCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxNQUFNLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxpQkFBUSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDNUMsT0FBTyxFQUFFLFNBQVM7Z0JBQ2xCLFFBQVEsRUFBRSxJQUFJO2FBQ2pCO1lBQ0QsUUFBUSxFQUFFO2dCQUNOLElBQUksRUFBRSxTQUFTO2dCQUNmLE9BQU8sRUFBRSxpQkFBUSxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQzthQUM1QztTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFDc0QsK0RBQVM7QUFPaEUsbUJBQXlCLEVBQ3JCLE1BQU0sR0FHVDtJQUNHLE1BQU0sV0FBVyxtQkFDYixPQUFPLEVBQUUsRUFBRSxFQUNYLFFBQVEsRUFBRSxLQUFLLElBQ1osTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLE9BQU8sR0FBRyxXQUFXLENBQUMsT0FBTyxDQUFDO0lBQ3BDLElBQUksUUFBUSxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7UUFDeEMsSUFBSSxlQUFlLEVBQ2YsTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUVoQix3Q0FBd0M7UUFDeEMsSUFBSTtZQUNBLGVBQWUsR0FBRyxpQkFBUSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDbEQ7UUFBQyxPQUFPLENBQUMsRUFBRSxHQUFFO1FBRWQsa0NBQWtDO1FBQ2xDLElBQUksQ0FBQyxLQUFLLFNBQVMsRUFBRTtZQUNqQixhQUFhO1lBQ2IsTUFBTSxHQUFHLEdBQUcsQ0FBQztTQUNoQjthQUFNLElBQUksZUFBZSxLQUFLLFNBQVMsRUFBRTtZQUN0QyxNQUFNLEdBQUcsdUJBQXVCLENBQUMsS0FBSyxXQUFXLENBQUMsUUFBUSxHQUFHLENBQUM7U0FDakU7YUFBTSxJQUNILEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDcEIsQ0FBQyxDQUFDLEtBQUssQ0FBQyw0QkFBNEIsQ0FBQyxFQUN2QztZQUNFLGtCQUFrQjtZQUNsQixNQUFNLEdBQUcsZUFBZSxDQUFDLEtBQUssV0FBVyxDQUFDLFFBQVEsR0FBRyxDQUFDO1NBQ3pEO2FBQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUM5Qix3QkFBd0I7WUFDeEIsTUFBTSxHQUFHLEdBQUcsQ0FBQyxFQUFFLENBQUM7U0FDbkI7YUFBTTtZQUNILE1BQU0sSUFBSSxLQUFLLENBQ1gsNERBQTRELENBQUMsK0JBQStCLENBQy9GLENBQUM7U0FDTDtRQUNELHFCQUFxQjtRQUNyQixPQUFPLHVDQUF1QyxNQUFNLEdBQUcsQ0FBQztJQUM1RCxDQUFDLENBQUMsQ0FBQztJQUVILE9BQU8sUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUUxQix1Q0FBdUM7SUFDdkMsaURBQWlEO0lBQ2pELHlCQUF5QjtJQUN6QiwyQkFBMkI7SUFDM0IsNERBQTREO0lBQzVELGVBQWU7SUFDZixvRUFBb0U7SUFDcEUsUUFBUTtJQUNSLDRCQUE0QjtJQUM1QiwwREFBMEQ7SUFDMUQsTUFBTTtJQUVOLDZCQUE2QjtBQUNqQyxDQUFDO0FBNURELDRCQTREQyJ9