"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const url_1 = __importDefault(require("url"));
/**
 * @name            urlFromString
 * @namespace       shared.url
 * @type            Function
 * @platform        js
 * @platform        node
 * @platform         ts
 * @status          stable
 *
 * Simple function that take a string as parameter and returns you a valid
 * url ready one
 *
 * @todo            tests
 *
 * @example             js
 * import urlFromString from '@coffeekraken/sugar/shared/url/urlFromString';
 * urlFromString('Sir James Paul McCartney MBE is an English singer-songwriter');
 * // sir-james-paul-mc-cartney-mbe-is-an-english-singer-songwriter
 *
 * @see             https://www.npmjs.com/package/url-slug
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function urlFromString(string) {
    return string
        .split('/')
        .map((l) => {
        // @ts-ignore
        return (0, url_1.default)(l.trim());
    })
        .join('/');
}
exports.default = urlFromString;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsOENBQTRCO0FBRTVCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBc0JHO0FBQ0gsU0FBd0IsYUFBYSxDQUFDLE1BQWM7SUFDaEQsT0FBTyxNQUFNO1NBQ1IsS0FBSyxDQUFDLEdBQUcsQ0FBQztTQUNWLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO1FBQ1AsYUFBYTtRQUNiLE9BQU8sSUFBQSxhQUFTLEVBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7SUFDL0IsQ0FBQyxDQUFDO1NBQ0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ25CLENBQUM7QUFSRCxnQ0FRQyJ9