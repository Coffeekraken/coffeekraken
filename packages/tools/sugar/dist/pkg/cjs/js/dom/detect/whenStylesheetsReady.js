"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const linkLoaded_1 = __importDefault(require("../load/linkLoaded"));
/**
 * @name      whenStylesheetsReady
 * @namespace            js.dom.detect
 * @type      Function
 * @platform          js
 * @status        stable
 * @async
 *
 * Wait until all the HTMLLinkElement's are properly loaded
 *
 * @feature       Async promise based
 * @feature       Callback support
 * @feature       Multiple stylesheets elements listening
 *
 * @param 		{Array}<HTMLLinkElement> 		[links=null] 			The HTMLLinkElement tags to process. If not passed, take the local stylesheets links
 * @param 		{Function} 						[cb=null] 		An optional callback function to call when all the links are loaded
 * @return 		{Promise<void>} 										The promise that will be resolved when all the links are loaded
 *
 * @todo      tests
 *
 * @example 	js
 * import __whenStylesheetsReady from '@coffeekraken/sugar/js/dom/whenStylesheetsReady'
 * await __whenStylesheetsReady([
 * 		myHTMLLinkElement1,
 * 		myHTMLLinkElement2
 * ]);
 *
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function whenStylesheetsReady(links = null, cb = null) {
    if (!links) {
        links = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));
    }
    const promises = [];
    [].forEach.call(neededStylesheetsStack, ($link) => {
        promises.push((0, linkLoaded_1.default)($link));
    });
    const allPromises = Promise.all(promises);
    allPromises.then(() => {
        cb === null || cb === void 0 ? void 0 : cb();
    });
    return allPromises;
}
exports.default = whenStylesheetsReady;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLG9FQUE4QztBQUM5Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E2Qkc7QUFDSCxTQUF3QixvQkFBb0IsQ0FDeEMsUUFBMkIsSUFBSSxFQUMvQixLQUFlLElBQUk7SUFFbkIsSUFBSSxDQUFDLEtBQUssRUFBRTtRQUNSLEtBQUssR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLENBQUM7S0FDM0U7SUFDRCxNQUFNLFFBQVEsR0FBRyxFQUFFLENBQUM7SUFDcEIsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRTtRQUM5QyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUEsb0JBQVksRUFBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQ3ZDLENBQUMsQ0FBQyxDQUFDO0lBQ0gsTUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUMxQyxXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtRQUNsQixFQUFFLGFBQUYsRUFBRSx1QkFBRixFQUFFLEVBQUksQ0FBQztJQUNYLENBQUMsQ0FBQyxDQUFDO0lBQ0gsT0FBTyxXQUFXLENBQUM7QUFDdkIsQ0FBQztBQWhCRCx1Q0FnQkMifQ==