// @ts-nocheck
/**
 * @name      linkLoaded
 * @namespace            js.dom.load
 * @type      Function
 * @platform      js
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
 * import linkLoaded from '@coffeekraken/sugar/js/dom/linkLoaded'
 * linkLoaded(myCoolHTMLLinlElement).then((link) => {
 * 		// do something when the link is loaded
 * });
 *
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
export default linkLoaded;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlua0xvYWRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImxpbmtMb2FkZWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBNEJHO0FBQ0gsU0FBUyxhQUFhLENBQUMsSUFBcUI7SUFDMUMsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztJQUN2QixJQUFJLE1BQU0sR0FBRyxLQUFLLENBQUM7SUFDbkIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3BELElBQ0UsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJO1lBQzVCLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFDeEM7WUFDQSw0QkFBNEI7WUFDNUIsTUFBTSxHQUFHLElBQUksQ0FBQztTQUNmO2FBQU0sSUFBSSxDQUFDLElBQUksUUFBUSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQy9DLGtEQUFrRDtTQUNuRDtLQUNGO0lBQ0QsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQztBQUVELFNBQVMsVUFBVSxDQUFDLElBQXFCLEVBQUUsRUFBRSxHQUFHLElBQUk7SUFDbEQsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtRQUNyQyxtQ0FBbUM7UUFDbkMsSUFBSSxhQUFhLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDdkIsa0JBQWtCO1lBQ2xCLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNkLHVCQUF1QjtZQUN2QixFQUFFLElBQUksSUFBSSxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUN4QjthQUFNO1lBQ0wsTUFBTSxHQUFHLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUUxQyxvQkFBb0I7WUFFcEIsZ0NBQWdDO1lBQ2hDLGtDQUFrQztZQUNsQyxtQ0FBbUM7WUFDbkMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO2dCQUNsQyxzQkFBc0I7Z0JBQ3RCLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDZCxjQUFjO2dCQUNkLEVBQUUsSUFBSSxJQUFJLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3pCLENBQUMsQ0FBQyxDQUFDO1lBQ0gsbUJBQW1CO1lBQ25CLHlDQUF5QztZQUN6Qyw4QkFBOEI7WUFDOUIsYUFBYTtZQUNiLGNBQWM7WUFDZCxhQUFhO1lBRWIsVUFBVTtZQUNWLEdBQUcsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztZQUNwQixrQ0FBa0M7U0FDbkM7SUFDSCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFDRCxlQUFlLFVBQVUsQ0FBQyJ9