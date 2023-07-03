// @ts-nocheck
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
 *
 * @param 		{HTMLLinkElement} 			link  		The link tag to check the loading state
 * @return 		{Promise} 								The promise that will be resolved
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet         __whenLinkLoaded($1)
 * __whenLinkLoaded($1).then(\$elm => {
 *      $2
 * });
 *
 * @example  	js
 * import { __whenLinkLoaded } from '@coffeekraken/sugar/dom'
 * __whenLinkLoaded(myCoolHTMLLinlElement).then($link => {
 * 		// do something when the link is loaded
 * });
 *
 * @since           2.0.0
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
export default function __whenLinkLoaded(link, cb = null) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQStCRztBQUNILFNBQVMsYUFBYSxDQUFDLElBQXFCO0lBQ3hDLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDdkIsSUFBSSxNQUFNLEdBQUcsS0FBSyxDQUFDO0lBQ25CLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxRQUFRLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUNsRCxJQUNJLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSTtZQUM1QixRQUFRLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQzFDO1lBQ0UsNEJBQTRCO1lBQzVCLE1BQU0sR0FBRyxJQUFJLENBQUM7U0FDakI7YUFBTSxJQUFJLENBQUMsSUFBSSxRQUFRLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDN0Msa0RBQWtEO1NBQ3JEO0tBQ0o7SUFDRCxPQUFPLE1BQU0sQ0FBQztBQUNsQixDQUFDO0FBRUQsTUFBTSxDQUFDLE9BQU8sVUFBVSxnQkFBZ0IsQ0FDcEMsSUFBcUIsRUFDckIsRUFBRSxHQUFHLElBQUk7SUFFVCxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1FBQ25DLG1DQUFtQztRQUNuQyxJQUFJLGFBQWEsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNyQixrQkFBa0I7WUFDbEIsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2QsdUJBQXVCO1lBQ3ZCLEVBQUUsYUFBRixFQUFFLHVCQUFGLEVBQUUsQ0FBRyxJQUFJLENBQUMsQ0FBQztTQUNkO2FBQU07WUFDSCxNQUFNLEdBQUcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBRTFDLG9CQUFvQjtZQUVwQixnQ0FBZ0M7WUFDaEMsa0NBQWtDO1lBQ2xDLG1DQUFtQztZQUNuQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7Z0JBQ2hDLHNCQUFzQjtnQkFDdEIsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNkLGNBQWM7Z0JBQ2QsRUFBRSxhQUFGLEVBQUUsdUJBQUYsRUFBRSxDQUFHLElBQUksQ0FBQyxDQUFDO1lBQ2YsQ0FBQyxDQUFDLENBQUM7WUFDSCxtQkFBbUI7WUFDbkIseUNBQXlDO1lBQ3pDLDhCQUE4QjtZQUM5QixhQUFhO1lBQ2IsY0FBYztZQUNkLGFBQWE7WUFFYixVQUFVO1lBQ1YsR0FBRyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQ3BCLGtDQUFrQztTQUNyQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyJ9