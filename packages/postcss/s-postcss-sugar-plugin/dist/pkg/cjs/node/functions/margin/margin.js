"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
/**
 * @name          margin
 * @as          sugar.margin
 * @namespace     node.function.margin
 * @type          PostcssFunction
 * @platform      postcss
 * @interface       ./margin
 * @status        stable
 *
 * This function allows you to get a margin value depending on your theme config
 *
 * @param       {String}        margin      The margin to get
 * @param       {Boolean}       [scalable='theme.scalable.margin']      Whether to scale the value or not
 * @return      {Css}                   The corresponding css
 *
 * @snippet         s.margin($1)
 *
 * @example       css
 * .my-element {
 *      margin-top: s.margin(20);
 * }
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginMarginFunctionInterface extends s_interface_1.default {
    static get _definition() {
        return {
            margin: {
                type: 'String',
                values: Object.keys(s_theme_1.default.get('margin')),
                default: 'default',
                required: true,
            },
            scalable: {
                type: 'Boolean',
                default: s_theme_1.default.get('scalable.margin'),
            },
        };
    }
}
exports.interface = postcssSugarPluginMarginFunctionInterface;
function default_1({ params, themeValueProxy, }) {
    const finalParams = Object.assign({ margin: '', scalable: true }, params);
    const margin = finalParams.margin;
    let margins = `${margin}`.split(' ').map((s) => {
        let val;
        // theme value
        s = themeValueProxy(s);
        // try to get the margin with the pased
        val = s_theme_1.default.getSafe(`margin.${s}`);
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
            return `calc(s.theme(margin.default, ${finalParams.scalable}) * ${s})`;
        }
    });
    return margins.join(' ');
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFFN0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXdCRztBQUVILE1BQU0seUNBQTBDLFNBQVEscUJBQVk7SUFDaEUsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILE1BQU0sRUFBRTtnQkFDSixJQUFJLEVBQUUsUUFBUTtnQkFDZCxNQUFNLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxpQkFBUSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDM0MsT0FBTyxFQUFFLFNBQVM7Z0JBQ2xCLFFBQVEsRUFBRSxJQUFJO2FBQ2pCO1lBQ0QsUUFBUSxFQUFFO2dCQUNOLElBQUksRUFBRSxTQUFTO2dCQUNmLE9BQU8sRUFBRSxpQkFBUSxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQzthQUMzQztTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFDcUQsOERBQVM7QUFPL0QsbUJBQXlCLEVBQ3JCLE1BQU0sRUFDTixlQUFlLEdBSWxCO0lBQ0csTUFBTSxXQUFXLG1CQUNiLE1BQU0sRUFBRSxFQUFFLEVBQ1YsUUFBUSxFQUFFLElBQUksSUFDWCxNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sTUFBTSxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUM7SUFDbEMsSUFBSSxPQUFPLEdBQUcsR0FBRyxNQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7UUFDM0MsSUFBSSxHQUFHLENBQUM7UUFFUixjQUFjO1FBQ2QsQ0FBQyxHQUFHLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUV2Qix1Q0FBdUM7UUFDdkMsR0FBRyxHQUFHLGlCQUFRLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN0QyxJQUFJLEdBQUcsS0FBSyxTQUFTLEVBQUU7WUFDbkIsQ0FBQyxHQUFHLEdBQUcsQ0FBQztTQUNYO1FBRUQsa0NBQWtDO1FBQ2xDLElBQUksR0FBRyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLEVBQUU7WUFDNUIsYUFBYTtZQUNiLElBQUksV0FBVyxDQUFDLFFBQVEsRUFBRTtnQkFDdEIsT0FBTyxjQUFjLENBQUMsR0FBRyxDQUFDO2FBQzdCO1lBQ0QsT0FBTyxHQUFHLENBQUMsRUFBRSxDQUFDO1NBQ2pCO2FBQU07WUFDSCxPQUFPLGdDQUFnQyxXQUFXLENBQUMsUUFBUSxPQUFPLENBQUMsR0FBRyxDQUFDO1NBQzFFO0lBQ0wsQ0FBQyxDQUFDLENBQUM7SUFFSCxPQUFPLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDN0IsQ0FBQztBQXZDRCw0QkF1Q0MifQ==