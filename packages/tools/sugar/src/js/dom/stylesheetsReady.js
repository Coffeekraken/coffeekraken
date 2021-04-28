// @ts-nocheck
import linkLoaded from './linkLoaded';
/**
 * @name      stylesheetsReady
 * @namespace            js.dom
 * @type      Function
 * @stable
 *
 * Wait until all the HTMLLinkElement's are properly loaded
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3R5bGVzaGVldHNSZWFkeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInN0eWxlc2hlZXRzUmVhZHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkLE9BQU8sVUFBVSxNQUFNLGNBQWMsQ0FBQztBQUN0Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMkJHO0FBQ0gsU0FBUyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsRUFBRSxHQUFHLElBQUk7SUFDeEMsTUFBTSxzQkFBc0IsR0FBRyxLQUFLLENBQUM7SUFDckMsTUFBTSxzQkFBc0IsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDO0lBQzVDLElBQUksc0JBQXNCLEdBQUcsQ0FBQyxDQUFDO0lBQy9CLE1BQU0sMEJBQTBCLEdBQUcsRUFBRSxDQUFDO0lBQ3RDLElBQUksd0JBQXdCLEdBQUcsS0FBSyxDQUFDO0lBQ3JDLElBQUksNkJBQTZCLEdBQUcsS0FBSyxDQUFDO0lBRTFDLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7UUFDckMsSUFBSSw2QkFBNkIsRUFBRTtZQUNqQyxFQUFFLEtBQUssSUFBSSxJQUFJLEVBQUUsRUFBRSxDQUFDO1lBQ3BCLE9BQU8sRUFBRSxDQUFDO1lBQ1YsT0FBTztTQUNSO1FBRUQsdUNBQXVDO1FBQ3ZDLElBQUksQ0FBQyxzQkFBc0IsRUFBRTtZQUMzQiwyQ0FBMkM7WUFDM0MsNkJBQTZCLEdBQUcsSUFBSSxDQUFDO1lBQ3JDLG9DQUFvQztZQUNwQyxFQUFFLEtBQUssSUFBSSxJQUFJLEVBQUUsRUFBRSxDQUFDO1lBQ3BCLE9BQU8sRUFBRSxDQUFDO1lBQ1YsT0FBTztTQUNSO1FBRUQscURBQXFEO1FBQ3JELDZCQUE2QjtRQUM3QiwwQkFBMEIsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO1lBQ25DLEVBQUUsS0FBSyxJQUFJLElBQUksRUFBRSxFQUFFLENBQUM7WUFDcEIsT0FBTyxFQUFFLENBQUM7UUFDWixDQUFDLENBQUMsQ0FBQztRQUVILG9EQUFvRDtRQUNwRCxjQUFjO1FBQ2QsSUFBSSxDQUFDLHdCQUF3QixFQUFFO1lBQzdCLG9CQUFvQjtZQUNwQix3QkFBd0IsR0FBRyxJQUFJLENBQUM7WUFFaEMsSUFBSSxzQkFBc0IsQ0FBQyxNQUFNLEVBQUU7Z0JBQ2pDLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7b0JBQy9DLGVBQWU7b0JBQ2YsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FDbkIsQ0FBQyxJQUFJLEVBQUUsRUFBRTt3QkFDUCxxQ0FBcUM7d0JBQ3JDLHNCQUFzQixFQUFFLENBQUM7d0JBQ3pCLDJDQUEyQzt3QkFDM0MsSUFBSSxzQkFBc0IsSUFBSSxzQkFBc0IsRUFBRTs0QkFDcEQsMkNBQTJDOzRCQUMzQyw2QkFBNkIsR0FBRyxJQUFJLENBQUM7NEJBQ3JDLDZDQUE2Qzs0QkFDN0MsMEJBQTBCLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUU7Z0NBQzlDLHFCQUFxQjtnQ0FDckIsUUFBUSxFQUFFLENBQUM7NEJBQ2IsQ0FBQyxDQUFDLENBQUM7eUJBQ0o7b0JBQ0gsQ0FBQyxFQUNELENBQUMsS0FBSyxFQUFFLEVBQUU7d0JBQ1IsMEJBQTBCO3dCQUMxQixPQUFPLENBQUMsS0FBSyxDQUNYLG1EQUFtRCxFQUNuRCxLQUFLLENBQ04sQ0FBQztvQkFDSixDQUFDLENBQ0YsQ0FBQztnQkFDSixDQUFDLENBQUMsQ0FBQzthQUNKO1NBQ0Y7SUFDSCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFDRCxlQUFlLGdCQUFnQixDQUFDIn0=