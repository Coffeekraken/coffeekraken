"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
/**
 * @name           noise
 * @as            sugar.filter.noise
 * @namespace      node.function.filter
 * @type           PostcssFunction
 * @platform      postcss
 * @interface       ./noise
 * @status        beta
 *
 * This function allows you to get a noise effect image back.
 *
 * @param       {Number}        [frequency=0.65]      The frequency of the noise
 * @param       {String}        [width='5000px']        The width of the noise
 * @param       {String}        [height='5000px']       The height of the noise
 * @return        {Css}         The generated css
 *
 * @snippet         sugar.filter.noise();
 *
 * @example        css
 * .my-element {
 *    filter: sugar.filter.noise()
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginDisabledInterface extends s_interface_1.default {
    static get _definition() {
        return {
            frequency: {
                type: 'Number',
                required: true,
                default: 0.65,
            },
            width: {
                type: 'String',
                required: true,
                default: '5000px',
            },
            height: {
                type: 'String',
                required: true,
                default: '5000px',
            },
        };
    }
}
exports.interface = postcssSugarPluginDisabledInterface;
function default_1({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({ frequency: 0.65, width: '5000px', height: '5000px' }, params);
    return `url('data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${finalParams.width} ${finalParams.height}" style="width:${finalParams.width};height:${finalParams.height};"><style type="text/css"><![CDATA[ rect{filter:url(#filter);width:${finalParams.width};height:${finalParams.height};} ]]></style><filter id="filter"><feTurbulence type="fractalNoise" baseFrequency="${finalParams.frequency}" numOctaves="3" stitchTiles="stitch" /></filter><rect filter="url(#filter)" /></svg>`)}')`;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUVyRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXlCRztBQUVILE1BQU0sbUNBQW9DLFNBQVEscUJBQVk7SUFDMUQsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILFNBQVMsRUFBRTtnQkFDUCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxRQUFRLEVBQUUsSUFBSTtnQkFDZCxPQUFPLEVBQUUsSUFBSTthQUNoQjtZQUNELEtBQUssRUFBRTtnQkFDSCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxRQUFRLEVBQUUsSUFBSTtnQkFDZCxPQUFPLEVBQUUsUUFBUTthQUNwQjtZQUNELE1BQU0sRUFBRTtnQkFDSixJQUFJLEVBQUUsUUFBUTtnQkFDZCxRQUFRLEVBQUUsSUFBSTtnQkFDZCxPQUFPLEVBQUUsUUFBUTthQUNwQjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFRK0Msd0RBQVM7QUFFekQsbUJBQXlCLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sV0FBVyxHQUtkO0lBQ0csTUFBTSxXQUFXLG1CQUNiLFNBQVMsRUFBRSxJQUFJLEVBQ2YsS0FBSyxFQUFFLFFBQVEsRUFDZixNQUFNLEVBQUUsUUFBUSxJQUNiLE1BQU0sQ0FDWixDQUFDO0lBQ0YsT0FBTyxnQ0FBZ0Msa0JBQWtCLENBQ3JELHdEQUF3RCxXQUFXLENBQUMsS0FBSyxJQUFJLFdBQVcsQ0FBQyxNQUFNLGtCQUFrQixXQUFXLENBQUMsS0FBSyxXQUFXLFdBQVcsQ0FBQyxNQUFNLHNFQUFzRSxXQUFXLENBQUMsS0FBSyxXQUFXLFdBQVcsQ0FBQyxNQUFNLHNGQUFzRixXQUFXLENBQUMsU0FBUyx1RkFBdUYsQ0FDeGQsSUFBSSxDQUFDO0FBQ1YsQ0FBQztBQWxCRCw0QkFrQkMifQ==