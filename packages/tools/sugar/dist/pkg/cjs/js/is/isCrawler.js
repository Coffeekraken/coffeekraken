"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const isbot_1 = __importDefault(require("isbot"));
/**
 * @name        isCrawler
 * @namespace            js.is
 * @type      Function
 * @platform          js
 * @status        beta
 *
 * Detect if request is from a crawler (google bot, etc...) or not
 *
 * @param       {String}        [ua=navigator.userAgent]         The user agent on which to make the test
 * @return    {Boolean}    true if is a crawler, false if not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example 	js
 * import { __isCrawler } from '@coffeekraken/sugar/is'
 * if (__isCrawler()) {
 *   // do something cool
 * }
 *
 * @see            https://www.npmjs.com/package/isbot
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __isCrawler(ua = navigator.userAgent) {
    // @ts-ignore
    return (0, isbot_1.default)(ua);
}
exports.default = __isCrawler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsa0RBQTRCO0FBRTVCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBeUJHO0FBQ0gsU0FBd0IsV0FBVyxDQUFDLEtBQWEsU0FBUyxDQUFDLFNBQVM7SUFDaEUsYUFBYTtJQUNiLE9BQU8sSUFBQSxlQUFPLEVBQUMsRUFBRSxDQUFDLENBQUM7QUFDdkIsQ0FBQztBQUhELDhCQUdDIn0=