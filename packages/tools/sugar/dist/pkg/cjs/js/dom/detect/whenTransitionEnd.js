"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getTransitionProperties_1 = __importDefault(require("./style/getTransitionProperties"));
/**
 * @name      whenTransitionEnd
 * @namespace            js.dom.detect
 * @type      Function
 * @async
 * @platform          js
 * @status        beta
 *
 * Monitor an HTMLElement to be notified when his transition has ended
 *
 * @feature       Promise based API
 * @feature       Callback support
 *
 * @param 		{HTMLElement} 				elm 		The element to monitor
 * @param 		{Function} 					[cb=null] 	An optional callback to call when the element transition has ended
 * @return 		(Promise) 								The promise that will be resolved when the element transition has ended
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example 	js
 * import whenTransitionEnd from '@coffeekraken/sugar/js/dom/whenTransitionEnd'
 * whenTransitionEnd(myCoolHTMLElement).then((elm) => {
 * 		// do something with your element transition has ended...
 * });
 *
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function whenTransitionEnd(elm, cb = null) {
    return new Promise((resolve, reject) => {
        const transition = (0, getTransitionProperties_1.default)(elm);
        setTimeout(() => {
            resolve();
            cb && cb();
        }, transition.totalDuration);
    });
}
exports.default = whenTransitionEnd;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLDhGQUF3RTtBQUV4RTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E2Qkc7QUFDSCxTQUFTLGlCQUFpQixDQUFDLEdBQWdCLEVBQUUsRUFBRSxHQUFHLElBQUk7SUFDbEQsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtRQUNuQyxNQUFNLFVBQVUsR0FBRyxJQUFBLGlDQUF5QixFQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2xELFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDWixPQUFPLEVBQUUsQ0FBQztZQUNWLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQztRQUNmLENBQUMsRUFBRSxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDakMsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBQ0Qsa0JBQWUsaUJBQWlCLENBQUMifQ==