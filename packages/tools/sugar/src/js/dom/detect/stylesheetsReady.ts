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
                    linkLoaded(link).then(
                        (link) => {
                            // update the loaded stylesheet count
                            loadedStylesheedsCount++;
                            // check if all stylesheets has been loaded
                            if (
                                loadedStylesheedsCount >= neededStylesheetsCount
                            ) {
                                // update the stylesheetsDependenciesStatus
                                stylesheetsDependenciesStatus = true;
                                // loop on all the loadedStylesheetsCallbacks
                                loadedStylesheetsCallbacks.forEach(
                                    (callback) => {
                                        // apply the callback
                                        callback();
                                    },
                                );
                            }
                        },
                        (error) => {
                            // something goes wrong...
                            console.error(
                                'The following link as not been loaded properly...',
                                error,
                            );
                        },
                    );
                });
            }
        }
    });
}
export default stylesheetsReady;
