// @ts-nocheck
import linkLoaded from '../load/linkLoaded';
/**
 * @name      stylesheetsReady
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3R5bGVzaGVldHNSZWFkeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInN0eWxlc2hlZXRzUmVhZHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkLE9BQU8sVUFBVSxNQUFNLG9CQUFvQixDQUFDO0FBQzVDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQ0c7QUFDSCxTQUFTLGdCQUFnQixDQUFDLEtBQUssRUFBRSxFQUFFLEdBQUcsSUFBSTtJQUN0QyxNQUFNLHNCQUFzQixHQUFHLEtBQUssQ0FBQztJQUNyQyxNQUFNLHNCQUFzQixHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUM7SUFDNUMsSUFBSSxzQkFBc0IsR0FBRyxDQUFDLENBQUM7SUFDL0IsTUFBTSwwQkFBMEIsR0FBRyxFQUFFLENBQUM7SUFDdEMsSUFBSSx3QkFBd0IsR0FBRyxLQUFLLENBQUM7SUFDckMsSUFBSSw2QkFBNkIsR0FBRyxLQUFLLENBQUM7SUFFMUMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtRQUNuQyxJQUFJLDZCQUE2QixFQUFFO1lBQy9CLEVBQUUsS0FBSyxJQUFJLElBQUksRUFBRSxFQUFFLENBQUM7WUFDcEIsT0FBTyxFQUFFLENBQUM7WUFDVixPQUFPO1NBQ1Y7UUFFRCx1Q0FBdUM7UUFDdkMsSUFBSSxDQUFDLHNCQUFzQixFQUFFO1lBQ3pCLDJDQUEyQztZQUMzQyw2QkFBNkIsR0FBRyxJQUFJLENBQUM7WUFDckMsb0NBQW9DO1lBQ3BDLEVBQUUsS0FBSyxJQUFJLElBQUksRUFBRSxFQUFFLENBQUM7WUFDcEIsT0FBTyxFQUFFLENBQUM7WUFDVixPQUFPO1NBQ1Y7UUFFRCxxREFBcUQ7UUFDckQsNkJBQTZCO1FBQzdCLDBCQUEwQixDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDakMsRUFBRSxLQUFLLElBQUksSUFBSSxFQUFFLEVBQUUsQ0FBQztZQUNwQixPQUFPLEVBQUUsQ0FBQztRQUNkLENBQUMsQ0FBQyxDQUFDO1FBRUgsb0RBQW9EO1FBQ3BELGNBQWM7UUFDZCxJQUFJLENBQUMsd0JBQXdCLEVBQUU7WUFDM0Isb0JBQW9CO1lBQ3BCLHdCQUF3QixHQUFHLElBQUksQ0FBQztZQUVoQyxJQUFJLHNCQUFzQixDQUFDLE1BQU0sRUFBRTtnQkFDL0IsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtvQkFDN0MsZUFBZTtvQkFDZixVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUNqQixDQUFDLElBQUksRUFBRSxFQUFFO3dCQUNMLHFDQUFxQzt3QkFDckMsc0JBQXNCLEVBQUUsQ0FBQzt3QkFDekIsMkNBQTJDO3dCQUMzQyxJQUNJLHNCQUFzQixJQUFJLHNCQUFzQixFQUNsRDs0QkFDRSwyQ0FBMkM7NEJBQzNDLDZCQUE2QixHQUFHLElBQUksQ0FBQzs0QkFDckMsNkNBQTZDOzRCQUM3QywwQkFBMEIsQ0FBQyxPQUFPLENBQzlCLENBQUMsUUFBUSxFQUFFLEVBQUU7Z0NBQ1QscUJBQXFCO2dDQUNyQixRQUFRLEVBQUUsQ0FBQzs0QkFDZixDQUFDLENBQ0osQ0FBQzt5QkFDTDtvQkFDTCxDQUFDLEVBQ0QsQ0FBQyxLQUFLLEVBQUUsRUFBRTt3QkFDTiwwQkFBMEI7d0JBQzFCLE9BQU8sQ0FBQyxLQUFLLENBQ1QsbURBQW1ELEVBQ25ELEtBQUssQ0FDUixDQUFDO29CQUNOLENBQUMsQ0FDSixDQUFDO2dCQUNOLENBQUMsQ0FBQyxDQUFDO2FBQ047U0FDSjtJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQUNELGVBQWUsZ0JBQWdCLENBQUMifQ==