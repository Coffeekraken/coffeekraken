// @ts-nocheck
import linkLoaded from './linkLoaded';
/**
 * @name      stylesheetsReady
 * @namespace            js.dom.detect
 * @type      Function
 * @async
 * @platform          js
 * @platform          ts
 * @status        beta
 *
 * Wait until all the HTMLLinkElement's are properly loaded
 *
 * @feature       Async promise based
 * @feature       Callback support
 * @feature       Multiple stylesheets elements listening
 *
 * @param 		{Array}<HTMLLinkElement> 		links 			The HTMLLinkElement tags to process
 * @param 		{Function} 						[cb=null] 		An optional callback function to call when all the links are loaded
 * @return 		{Promise} 										The promise that will be resolved when all the links are loaded
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example 	js
 * import stylesheetsReady from '@coffeekraken/sugar/js/dom/stylesheetsReady'
 * stylesheetsReady([
 * 		myHTMLLinkElement1,
 * 		myHTMLLinkElement2
 * ]).then(() => {
 * 		// do something when all the links are loaded
 * });
 *
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function stylesheetsReady(links, cb = null) {
    const neededStylesheetsStack = links;
    const neededStylesheetsCount = links.length;
    let loadedStylesheedsCount = 0;
    const loadedStylesheetsCallbacks = [];
    let loadedStylesheedsProcess = false;
    let stylesheetsDependenciesStatus = false;
    return new Promise((resolve, reject) => {
        if (stylesheetsDependenciesStatus) {
            cb !== null && cb();
            resolve();
            return;
        }
        // check if has some needed stylesheeds
        if (!neededStylesheetsCount) {
            // update the stylesheetsDependenciesStatus
            stylesheetsDependenciesStatus = true;
            // no dependencies or already loaded
            cb !== null && cb();
            resolve();
            return;
        }
        // add the callback into the loaded stylesheets stack
        // add the the callback stack
        loadedStylesheetsCallbacks.push(() => {
            cb !== null && cb();
            resolve();
        });
        // check if already a process of checking for loaded
        // stylesheets
        if (!loadedStylesheedsProcess) {
            // update the status
            loadedStylesheedsProcess = true;
            if (neededStylesheetsStack.length) {
                [].forEach.call(neededStylesheetsStack, (link) => {
                    // check loaded
                    linkLoaded(link).then((link) => {
                        // update the loaded stylesheet count
                        loadedStylesheedsCount++;
                        // check if all stylesheets has been loaded
                        if (loadedStylesheedsCount >= neededStylesheetsCount) {
                            // update the stylesheetsDependenciesStatus
                            stylesheetsDependenciesStatus = true;
                            // loop on all the loadedStylesheetsCallbacks
                            loadedStylesheetsCallbacks.forEach((callback) => {
                                // apply the callback
                                callback();
                            });
                        }
                    }, (error) => {
                        // something goes wrong...
                        console.error('The following link as not been loaded properly...', error);
                    });
                });
            }
        }
    });
}
export default stylesheetsReady;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3R5bGVzaGVldHNSZWFkeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInN0eWxlc2hlZXRzUmVhZHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkLE9BQU8sVUFBVSxNQUFNLGNBQWMsQ0FBQztBQUN0Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWtDRztBQUNILFNBQVMsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLEVBQUUsR0FBRyxJQUFJO0lBQ3hDLE1BQU0sc0JBQXNCLEdBQUcsS0FBSyxDQUFDO0lBQ3JDLE1BQU0sc0JBQXNCLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQztJQUM1QyxJQUFJLHNCQUFzQixHQUFHLENBQUMsQ0FBQztJQUMvQixNQUFNLDBCQUEwQixHQUFHLEVBQUUsQ0FBQztJQUN0QyxJQUFJLHdCQUF3QixHQUFHLEtBQUssQ0FBQztJQUNyQyxJQUFJLDZCQUE2QixHQUFHLEtBQUssQ0FBQztJQUUxQyxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1FBQ3JDLElBQUksNkJBQTZCLEVBQUU7WUFDakMsRUFBRSxLQUFLLElBQUksSUFBSSxFQUFFLEVBQUUsQ0FBQztZQUNwQixPQUFPLEVBQUUsQ0FBQztZQUNWLE9BQU87U0FDUjtRQUVELHVDQUF1QztRQUN2QyxJQUFJLENBQUMsc0JBQXNCLEVBQUU7WUFDM0IsMkNBQTJDO1lBQzNDLDZCQUE2QixHQUFHLElBQUksQ0FBQztZQUNyQyxvQ0FBb0M7WUFDcEMsRUFBRSxLQUFLLElBQUksSUFBSSxFQUFFLEVBQUUsQ0FBQztZQUNwQixPQUFPLEVBQUUsQ0FBQztZQUNWLE9BQU87U0FDUjtRQUVELHFEQUFxRDtRQUNyRCw2QkFBNkI7UUFDN0IsMEJBQTBCLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUNuQyxFQUFFLEtBQUssSUFBSSxJQUFJLEVBQUUsRUFBRSxDQUFDO1lBQ3BCLE9BQU8sRUFBRSxDQUFDO1FBQ1osQ0FBQyxDQUFDLENBQUM7UUFFSCxvREFBb0Q7UUFDcEQsY0FBYztRQUNkLElBQUksQ0FBQyx3QkFBd0IsRUFBRTtZQUM3QixvQkFBb0I7WUFDcEIsd0JBQXdCLEdBQUcsSUFBSSxDQUFDO1lBRWhDLElBQUksc0JBQXNCLENBQUMsTUFBTSxFQUFFO2dCQUNqQyxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO29CQUMvQyxlQUFlO29CQUNmLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQ25CLENBQUMsSUFBSSxFQUFFLEVBQUU7d0JBQ1AscUNBQXFDO3dCQUNyQyxzQkFBc0IsRUFBRSxDQUFDO3dCQUN6QiwyQ0FBMkM7d0JBQzNDLElBQUksc0JBQXNCLElBQUksc0JBQXNCLEVBQUU7NEJBQ3BELDJDQUEyQzs0QkFDM0MsNkJBQTZCLEdBQUcsSUFBSSxDQUFDOzRCQUNyQyw2Q0FBNkM7NEJBQzdDLDBCQUEwQixDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFO2dDQUM5QyxxQkFBcUI7Z0NBQ3JCLFFBQVEsRUFBRSxDQUFDOzRCQUNiLENBQUMsQ0FBQyxDQUFDO3lCQUNKO29CQUNILENBQUMsRUFDRCxDQUFDLEtBQUssRUFBRSxFQUFFO3dCQUNSLDBCQUEwQjt3QkFDMUIsT0FBTyxDQUFDLEtBQUssQ0FDWCxtREFBbUQsRUFDbkQsS0FBSyxDQUNOLENBQUM7b0JBQ0osQ0FBQyxDQUNGLENBQUM7Z0JBQ0osQ0FBQyxDQUFDLENBQUM7YUFDSjtTQUNGO0lBQ0gsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBQ0QsZUFBZSxnQkFBZ0IsQ0FBQyJ9