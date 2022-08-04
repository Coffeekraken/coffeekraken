// @ts-nocheck
import __linkLoaded from '../load/linkLoaded';
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
export default function whenStylesheetsReady(links = null, cb = null) {
    if (!links) {
        links = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));
    }
    const promises = [];
    [].forEach.call(neededStylesheetsStack, ($link) => {
        promises.push(__linkLoaded($link));
    });
    const allPromises = Promise.all(promises);
    allPromises.then(() => {
        cb === null || cb === void 0 ? void 0 : cb();
    });
    return allPromises;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFlBQVksTUFBTSxvQkFBb0IsQ0FBQztBQUM5Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBaUNHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sVUFBVSxvQkFBb0IsQ0FBQyxRQUEyQixJQUFJLEVBQUUsS0FBZSxJQUFJO0lBQzdGLElBQUksQ0FBQyxLQUFLLEVBQUU7UUFDUixLQUFLLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxDQUFDO0tBQzNFO0lBQ0QsTUFBTSxRQUFRLEdBQUcsRUFBRSxDQUFDO0lBQ3BCLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUU7UUFDOUMsUUFBUSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUN2QyxDQUFDLENBQUMsQ0FBQztJQUNILE1BQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDMUMsV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7UUFDbEIsRUFBRSxhQUFGLEVBQUUsdUJBQUYsRUFBRSxFQUFJLENBQUM7SUFDWCxDQUFDLENBQUMsQ0FBQztJQUNILE9BQU8sV0FBVyxDQUFDO0FBQ3ZCLENBQUMifQ==