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
 * @async
 * @platform          js
 * @status        beta
 *
 * Wait until all the HTMLLinkElement's are properly loaded
 *
 * @feature       Async promise based
 * @feature       Callback support
 * @feature       Multiple stylesheets elements listening
 *
 * @param 		{Array}<HTMLLinkElement> 		[links=null] 			The HTMLLinkElement tags to process. If not passed, take the local stylesheets links
 * @param 		{Function} 						[cb=null] 		An optional callback function to call when all the links are loaded
 * @return 		{Promise} 										The promise that will be resolved when all the links are loaded
 *
 * @todo      interface
 * @todo      docindex.ts
 * @todo      tests
 *
 * @example 	js
 * import whenStylesheetsReady from '@coffeekraken/sugar/js/dom/whenStylesheetsReady'
 * whenStylesheetsReady([
 * 		myHTMLLinkElement1,
 * 		myHTMLLinkElement2
 * ]).then(() => {
 * 		// do something when all the links are loaded
 * });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLG9FQUE4QztBQUM5Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBaUNHO0FBQ0gsU0FBd0Isb0JBQW9CLENBQUMsUUFBMkIsSUFBSSxFQUFFLEtBQWUsSUFBSTtJQUM3RixJQUFJLENBQUMsS0FBSyxFQUFFO1FBQ1IsS0FBSyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLHdCQUF3QixDQUFDLENBQUMsQ0FBQztLQUMzRTtJQUNELE1BQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQztJQUNwQixFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFO1FBQzlDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBQSxvQkFBWSxFQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDdkMsQ0FBQyxDQUFDLENBQUM7SUFDSCxNQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO1FBQ2xCLEVBQUUsYUFBRixFQUFFLHVCQUFGLEVBQUUsRUFBSSxDQUFDO0lBQ1gsQ0FBQyxDQUFDLENBQUM7SUFDSCxPQUFPLFdBQVcsQ0FBQztBQUN2QixDQUFDO0FBYkQsdUNBYUMifQ==