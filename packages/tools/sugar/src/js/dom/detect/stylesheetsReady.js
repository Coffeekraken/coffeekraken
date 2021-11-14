// @ts-nocheck
import linkLoaded from './linkLoaded';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3R5bGVzaGVldHNSZWFkeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInN0eWxlc2hlZXRzUmVhZHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkLE9BQU8sVUFBVSxNQUFNLGNBQWMsQ0FBQztBQUN0Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBaUNHO0FBQ0gsU0FBUyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsRUFBRSxHQUFHLElBQUk7SUFDdEMsTUFBTSxzQkFBc0IsR0FBRyxLQUFLLENBQUM7SUFDckMsTUFBTSxzQkFBc0IsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDO0lBQzVDLElBQUksc0JBQXNCLEdBQUcsQ0FBQyxDQUFDO0lBQy9CLE1BQU0sMEJBQTBCLEdBQUcsRUFBRSxDQUFDO0lBQ3RDLElBQUksd0JBQXdCLEdBQUcsS0FBSyxDQUFDO0lBQ3JDLElBQUksNkJBQTZCLEdBQUcsS0FBSyxDQUFDO0lBRTFDLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7UUFDbkMsSUFBSSw2QkFBNkIsRUFBRTtZQUMvQixFQUFFLEtBQUssSUFBSSxJQUFJLEVBQUUsRUFBRSxDQUFDO1lBQ3BCLE9BQU8sRUFBRSxDQUFDO1lBQ1YsT0FBTztTQUNWO1FBRUQsdUNBQXVDO1FBQ3ZDLElBQUksQ0FBQyxzQkFBc0IsRUFBRTtZQUN6QiwyQ0FBMkM7WUFDM0MsNkJBQTZCLEdBQUcsSUFBSSxDQUFDO1lBQ3JDLG9DQUFvQztZQUNwQyxFQUFFLEtBQUssSUFBSSxJQUFJLEVBQUUsRUFBRSxDQUFDO1lBQ3BCLE9BQU8sRUFBRSxDQUFDO1lBQ1YsT0FBTztTQUNWO1FBRUQscURBQXFEO1FBQ3JELDZCQUE2QjtRQUM3QiwwQkFBMEIsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO1lBQ2pDLEVBQUUsS0FBSyxJQUFJLElBQUksRUFBRSxFQUFFLENBQUM7WUFDcEIsT0FBTyxFQUFFLENBQUM7UUFDZCxDQUFDLENBQUMsQ0FBQztRQUVILG9EQUFvRDtRQUNwRCxjQUFjO1FBQ2QsSUFBSSxDQUFDLHdCQUF3QixFQUFFO1lBQzNCLG9CQUFvQjtZQUNwQix3QkFBd0IsR0FBRyxJQUFJLENBQUM7WUFFaEMsSUFBSSxzQkFBc0IsQ0FBQyxNQUFNLEVBQUU7Z0JBQy9CLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7b0JBQzdDLGVBQWU7b0JBQ2YsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FDakIsQ0FBQyxJQUFJLEVBQUUsRUFBRTt3QkFDTCxxQ0FBcUM7d0JBQ3JDLHNCQUFzQixFQUFFLENBQUM7d0JBQ3pCLDJDQUEyQzt3QkFDM0MsSUFDSSxzQkFBc0IsSUFBSSxzQkFBc0IsRUFDbEQ7NEJBQ0UsMkNBQTJDOzRCQUMzQyw2QkFBNkIsR0FBRyxJQUFJLENBQUM7NEJBQ3JDLDZDQUE2Qzs0QkFDN0MsMEJBQTBCLENBQUMsT0FBTyxDQUM5QixDQUFDLFFBQVEsRUFBRSxFQUFFO2dDQUNULHFCQUFxQjtnQ0FDckIsUUFBUSxFQUFFLENBQUM7NEJBQ2YsQ0FBQyxDQUNKLENBQUM7eUJBQ0w7b0JBQ0wsQ0FBQyxFQUNELENBQUMsS0FBSyxFQUFFLEVBQUU7d0JBQ04sMEJBQTBCO3dCQUMxQixPQUFPLENBQUMsS0FBSyxDQUNULG1EQUFtRCxFQUNuRCxLQUFLLENBQ1IsQ0FBQztvQkFDTixDQUFDLENBQ0osQ0FBQztnQkFDTixDQUFDLENBQUMsQ0FBQzthQUNOO1NBQ0o7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUM7QUFDRCxlQUFlLGdCQUFnQixDQUFDIn0=