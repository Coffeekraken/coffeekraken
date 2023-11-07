"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
/**
 * @name          padding
 * @as          s.padding
 * @namespace     node.function.padding
 * @type          PostcssFunction
 * @platform      postcss
 * @interface       ./padding
 * @status        stable
 *
 * This function allows you to get a padding value depending on your theme config
 *
 * @param       {String}        padding      The padding to get
 * @param       {Boolean}       [scalable='theme.scalable.padding']      Whether to scale the value or not
 * @return      {Css}                   The corresponding css
 *
 * @snippet         s.padding($1)
 *
 * @example       css
 * .my-element {
 *      padding-top: s.padding(30);
 * }
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SSugarcssPluginPaddingFunctionInterface extends s_interface_1.default {
    static get _definition() {
        return {
            padding: {
                type: 'String',
                values: Object.keys(s_theme_1.default.get('padding')),
                default: 'default',
                required: true,
            },
            scalable: {
                type: 'Boolean',
                default: s_theme_1.default.get('scalable.padding'),
            },
        };
    }
}
exports.interface = SSugarcssPluginPaddingFunctionInterface;
function default_1({ params, themeValueProxy, }) {
    const finalParams = Object.assign({ padding: '', scalable: true }, params);
    const padding = finalParams.padding;
    let paddings = `${padding}`.split(' ').map((s) => {
        let val;
        // theme value
        s = themeValueProxy(s);
        // try to get the padding with the passed
        val = s_theme_1.default.getSafe(`padding.${s}`);
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
            return `calc(s.theme(padding.default, ${finalParams.scalable}) * ${s} * 1px)`;
        }
    });
    return paddings.join(' ');
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFFN0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXdCRztBQUVILE1BQU0sdUNBQXdDLFNBQVEscUJBQVk7SUFDOUQsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILE9BQU8sRUFBRTtnQkFDTCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxNQUFNLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxpQkFBUSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDNUMsT0FBTyxFQUFFLFNBQVM7Z0JBQ2xCLFFBQVEsRUFBRSxJQUFJO2FBQ2pCO1lBQ0QsUUFBUSxFQUFFO2dCQUNOLElBQUksRUFBRSxTQUFTO2dCQUNmLE9BQU8sRUFBRSxpQkFBUSxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQzthQUM1QztTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFDbUQsNERBQVM7QUFPN0QsbUJBQXlCLEVBQ3JCLE1BQU0sRUFDTixlQUFlLEdBSWxCO0lBQ0csTUFBTSxXQUFXLG1CQUNiLE9BQU8sRUFBRSxFQUFFLEVBQ1gsUUFBUSxFQUFFLElBQUksSUFDWCxNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sT0FBTyxHQUFHLFdBQVcsQ0FBQyxPQUFPLENBQUM7SUFDcEMsSUFBSSxRQUFRLEdBQUcsR0FBRyxPQUFPLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7UUFDN0MsSUFBSSxHQUFHLENBQUM7UUFFUixjQUFjO1FBQ2QsQ0FBQyxHQUFHLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUV2Qix5Q0FBeUM7UUFDekMsR0FBRyxHQUFHLGlCQUFRLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUV2QyxJQUFJLEdBQUcsS0FBSyxTQUFTLEVBQUU7WUFDbkIsQ0FBQyxHQUFHLEdBQUcsQ0FBQztTQUNYO1FBRUQsa0NBQWtDO1FBQ2xDLElBQUksR0FBRyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLEVBQUU7WUFDNUIsYUFBYTtZQUNiLElBQUksV0FBVyxDQUFDLFFBQVEsRUFBRTtnQkFDdEIsT0FBTyxjQUFjLENBQUMsR0FBRyxDQUFDO2FBQzdCO1lBQ0QsT0FBTyxHQUFHLENBQUMsRUFBRSxDQUFDO1NBQ2pCO2FBQU07WUFDSCxPQUFPLGlDQUFpQyxXQUFXLENBQUMsUUFBUSxPQUFPLENBQUMsU0FBUyxDQUFDO1NBQ2pGO0lBQ0wsQ0FBQyxDQUFDLENBQUM7SUFFSCxPQUFPLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDOUIsQ0FBQztBQXhDRCw0QkF3Q0MifQ==