"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name      linkLoaded
 * @namespace            js.dom.load
 * @type      Function
 * @platform          js
 * @status        beta
 *
 * Wait until the passed HTMLLinkElement is fully loaded
 *
 * @feature       Promise based API
 * @feature       Callback support
 *
 * @param 		{HTMLLinkElement} 			link  		The link tag to check the loading state
 * @param 		{Function}					[cb=null] 	An optional callback to call
 * @return 		{Promise} 								The promise that will be resolved
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example  	js
 * import linkLoaded from '@coffeekraken/sugar/js/dom/load/linkLoaded'
 * linkLoaded(myCoolHTMLLinlElement).then((link) => {
 * 		// do something when the link is loaded
 * });
 *
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function alreadyLoaded(link) {
    const href = link.href;
    let result = false;
    for (let i = 0; i < document.styleSheets.length; i++) {
        if (document.styleSheets[i].href &&
            document.styleSheets[i].href.match(href)) {
            // the css is already loaded
            result = true;
        }
        else if (i == document.styleSheets.length - 1) {
            // Fallback. There is no request for the css file.
        }
    }
    return result;
}
function linkLoaded(link, cb = null) {
    return new Promise((resolve, reject) => {
        // check if image is already loaded
        if (alreadyLoaded(link)) {
            // resolve promise
            resolve(link);
            // call the cb if exist
            cb != null && cb(link);
        }
        else {
            const img = document.createElement('img');
            // wait until loaded
            // we load the css into an image
            // when the image is in error more
            // that mean that the css is loaded
            img.addEventListener('error', (e) => {
                // resolve the promise
                resolve(link);
                // cb if exist
                cb != null && cb(link);
            });
            // listen for error
            // img.addEventListener('error', (e) => {
            // 	console.error('ERROR', e);
            // 	// reject
            // 	reject(e);
            // }, false);
            // set url
            img.src = link.href;
            // document.body.appendChild(img);
        }
    });
}
exports.default = linkLoaded;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBNEJHO0FBQ0gsU0FBUyxhQUFhLENBQUMsSUFBcUI7SUFDeEMsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztJQUN2QixJQUFJLE1BQU0sR0FBRyxLQUFLLENBQUM7SUFDbkIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ2xELElBQ0ksUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJO1lBQzVCLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFDMUM7WUFDRSw0QkFBNEI7WUFDNUIsTUFBTSxHQUFHLElBQUksQ0FBQztTQUNqQjthQUFNLElBQUksQ0FBQyxJQUFJLFFBQVEsQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUM3QyxrREFBa0Q7U0FDckQ7S0FDSjtJQUNELE9BQU8sTUFBTSxDQUFDO0FBQ2xCLENBQUM7QUFFRCxTQUFTLFVBQVUsQ0FDZixJQUFxQixFQUNyQixFQUFFLEdBQUcsSUFBSTtJQUVULE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7UUFDbkMsbUNBQW1DO1FBQ25DLElBQUksYUFBYSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ3JCLGtCQUFrQjtZQUNsQixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDZCx1QkFBdUI7WUFDdkIsRUFBRSxJQUFJLElBQUksSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDMUI7YUFBTTtZQUNILE1BQU0sR0FBRyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7WUFFMUMsb0JBQW9CO1lBRXBCLGdDQUFnQztZQUNoQyxrQ0FBa0M7WUFDbEMsbUNBQW1DO1lBQ25DLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtnQkFDaEMsc0JBQXNCO2dCQUN0QixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2QsY0FBYztnQkFDZCxFQUFFLElBQUksSUFBSSxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMzQixDQUFDLENBQUMsQ0FBQztZQUNILG1CQUFtQjtZQUNuQix5Q0FBeUM7WUFDekMsOEJBQThCO1lBQzlCLGFBQWE7WUFDYixjQUFjO1lBQ2QsYUFBYTtZQUViLFVBQVU7WUFDVixHQUFHLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDcEIsa0NBQWtDO1NBQ3JDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBQ0Qsa0JBQWUsVUFBVSxDQUFDIn0=