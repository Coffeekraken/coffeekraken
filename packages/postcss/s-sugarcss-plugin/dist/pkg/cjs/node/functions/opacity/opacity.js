"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
/**
 * @name          opacity
 * @as          s.opacity
 * @namespace     node.function.opacity
 * @type          PostcssFunction
 * @platform      postcss
 * @interface     ./opacity
 * @status        stable
 *
 * This function allows you to get an opacity value depending on your theme config
 *
 * @param       {String}        opacity      The opacity to get
 * @return      {Css}                   The corresponding css
 *
 * @snippet         s.opacity($1)
 *
 * @example       css
 * .my-element {
 *      opacity: s.opacity(20);
 * }
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SSugarcssPluginOpacityFunctionInterface extends s_interface_1.default {
    static get _definition() {
        return {
            opacity: {
                type: 'String',
                values: Object.keys(s_theme_1.default.current.get('opacity')),
                default: '100',
                required: true,
            },
        };
    }
}
exports.interface = SSugarcssPluginOpacityFunctionInterface;
function default_1({ params, }) {
    const finalParams = Object.assign({ opacity: '100' }, params);
    const opacity = finalParams.opacity;
    if (s_theme_1.default.current.get('opacity')[opacity] === undefined)
        return opacity;
    const opacityRes = opacity.split(' ').map((s) => {
        const size = s_theme_1.default.current.get(`opacity.${s}`);
        if (!size)
            return size;
        return `var(${`--s-opacity-${s}`}, ${size})`;
    });
    return opacityRes.join(' ');
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFFN0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBdUJHO0FBRUgsTUFBTSx1Q0FBd0MsU0FBUSxxQkFBWTtJQUM5RCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsT0FBTyxFQUFFO2dCQUNMLElBQUksRUFBRSxRQUFRO2dCQUNkLE1BQU0sRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDcEQsT0FBTyxFQUFFLEtBQUs7Z0JBQ2QsUUFBUSxFQUFFLElBQUk7YUFDakI7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBQ21ELDREQUFTO0FBTTdELG1CQUF5QixFQUNyQixNQUFNLEdBR1Q7SUFDRyxNQUFNLFdBQVcsbUJBQ2IsT0FBTyxFQUFFLEtBQUssSUFDWCxNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sT0FBTyxHQUFHLFdBQVcsQ0FBQyxPQUFPLENBQUM7SUFFcEMsSUFBSSxpQkFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssU0FBUztRQUFFLE9BQU8sT0FBTyxDQUFDO0lBRTNFLE1BQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7UUFDNUMsTUFBTSxJQUFJLEdBQUcsaUJBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNsRCxJQUFJLENBQUMsSUFBSTtZQUFFLE9BQU8sSUFBSSxDQUFDO1FBQ3ZCLE9BQU8sT0FBTyxlQUFlLENBQUMsRUFBRSxLQUFLLElBQUksR0FBRyxDQUFDO0lBQ2pELENBQUMsQ0FBQyxDQUFDO0lBRUgsT0FBTyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ2hDLENBQUM7QUFyQkQsNEJBcUJDIn0=