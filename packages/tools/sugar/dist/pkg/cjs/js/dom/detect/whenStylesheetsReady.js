"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
const dom_1 = require("@coffeekraken/sugar/dom");
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
 * import { __whenStylesheetsReady } from '@coffeekraken/sugar/dom'
 * await __whenStylesheetsReady([
 * 		myHTMLLinkElement1,
 * 		myHTMLLinkElement2
 * ]);
 *
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __whenStylesheetsReady(links = null, cb = null) {
    if (!links) {
        links = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));
    }
    const promises = [];
    [].forEach.call(links, ($link) => {
        promises.push((0, dom_1.__whenLinkLoaded)($link));
    });
    const allPromises = Promise.all(promises);
    allPromises.then(() => {
        cb === null || cb === void 0 ? void 0 : cb();
    });
    return allPromises;
}
exports.default = __whenStylesheetsReady;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkLGlEQUEyRDtBQUMzRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E2Qkc7QUFDSCxTQUF3QixzQkFBc0IsQ0FDMUMsUUFBMkIsSUFBSSxFQUMvQixLQUFlLElBQUk7SUFFbkIsSUFBSSxDQUFDLEtBQUssRUFBRTtRQUNSLEtBQUssR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLENBQUM7S0FDM0U7SUFDRCxNQUFNLFFBQVEsR0FBRyxFQUFFLENBQUM7SUFDcEIsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUU7UUFDN0IsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFBLHNCQUFnQixFQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDM0MsQ0FBQyxDQUFDLENBQUM7SUFDSCxNQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO1FBQ2xCLEVBQUUsYUFBRixFQUFFLHVCQUFGLEVBQUUsRUFBSSxDQUFDO0lBQ1gsQ0FBQyxDQUFDLENBQUM7SUFDSCxPQUFPLFdBQVcsQ0FBQztBQUN2QixDQUFDO0FBaEJELHlDQWdCQyJ9