"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name      whenLinkLoaded
 * @namespace            js.dom.detect
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
 * import { __whenLinkLoaded } from '@coffeekraken/sugar/dom'
 * __whenLinkLoaded(myCoolHTMLLinlElement).then((link) => {
 * 		// do something when the link is loaded
 * });
 *
 @since           2.0.0
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
function __whenLinkLoaded(link, cb = null) {
    return new Promise((resolve, reject) => {
        // check if image is already loaded
        if (alreadyLoaded(link)) {
            // resolve promise
            resolve(link);
            // call the cb if exist
            cb === null || cb === void 0 ? void 0 : cb(link);
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
                cb === null || cb === void 0 ? void 0 : cb(link);
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
exports.default = __whenLinkLoaded;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBNEJHO0FBQ0gsU0FBUyxhQUFhLENBQUMsSUFBcUI7SUFDeEMsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztJQUN2QixJQUFJLE1BQU0sR0FBRyxLQUFLLENBQUM7SUFDbkIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ2xELElBQ0ksUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJO1lBQzVCLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFDMUM7WUFDRSw0QkFBNEI7WUFDNUIsTUFBTSxHQUFHLElBQUksQ0FBQztTQUNqQjthQUFNLElBQUksQ0FBQyxJQUFJLFFBQVEsQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUM3QyxrREFBa0Q7U0FDckQ7S0FDSjtJQUNELE9BQU8sTUFBTSxDQUFDO0FBQ2xCLENBQUM7QUFFRCxTQUF3QixnQkFBZ0IsQ0FDcEMsSUFBcUIsRUFDckIsRUFBRSxHQUFHLElBQUk7SUFFVCxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1FBQ25DLG1DQUFtQztRQUNuQyxJQUFJLGFBQWEsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNyQixrQkFBa0I7WUFDbEIsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2QsdUJBQXVCO1lBQ3ZCLEVBQUUsYUFBRixFQUFFLHVCQUFGLEVBQUUsQ0FBRyxJQUFJLENBQUMsQ0FBQztTQUNkO2FBQU07WUFDSCxNQUFNLEdBQUcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBRTFDLG9CQUFvQjtZQUVwQixnQ0FBZ0M7WUFDaEMsa0NBQWtDO1lBQ2xDLG1DQUFtQztZQUNuQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7Z0JBQ2hDLHNCQUFzQjtnQkFDdEIsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNkLGNBQWM7Z0JBQ2QsRUFBRSxhQUFGLEVBQUUsdUJBQUYsRUFBRSxDQUFHLElBQUksQ0FBQyxDQUFDO1lBQ2YsQ0FBQyxDQUFDLENBQUM7WUFDSCxtQkFBbUI7WUFDbkIseUNBQXlDO1lBQ3pDLDhCQUE4QjtZQUM5QixhQUFhO1lBQ2IsY0FBYztZQUNkLGFBQWE7WUFFYixVQUFVO1lBQ1YsR0FBRyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQ3BCLGtDQUFrQztTQUNyQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQXJDRCxtQ0FxQ0MifQ==