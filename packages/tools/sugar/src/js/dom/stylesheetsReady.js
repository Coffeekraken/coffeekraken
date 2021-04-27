// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./linkLoaded"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const linkLoaded_1 = __importDefault(require("./linkLoaded"));
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
                        linkLoaded_1.default(link).then((link) => {
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
    exports.default = stylesheetsReady;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3R5bGVzaGVldHNSZWFkeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInN0eWxlc2hlZXRzUmVhZHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7O0lBRWQsOERBQXNDO0lBQ3RDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0EyQkc7SUFDSCxTQUFTLGdCQUFnQixDQUFDLEtBQUssRUFBRSxFQUFFLEdBQUcsSUFBSTtRQUN4QyxNQUFNLHNCQUFzQixHQUFHLEtBQUssQ0FBQztRQUNyQyxNQUFNLHNCQUFzQixHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUM7UUFDNUMsSUFBSSxzQkFBc0IsR0FBRyxDQUFDLENBQUM7UUFDL0IsTUFBTSwwQkFBMEIsR0FBRyxFQUFFLENBQUM7UUFDdEMsSUFBSSx3QkFBd0IsR0FBRyxLQUFLLENBQUM7UUFDckMsSUFBSSw2QkFBNkIsR0FBRyxLQUFLLENBQUM7UUFFMUMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUNyQyxJQUFJLDZCQUE2QixFQUFFO2dCQUNqQyxFQUFFLEtBQUssSUFBSSxJQUFJLEVBQUUsRUFBRSxDQUFDO2dCQUNwQixPQUFPLEVBQUUsQ0FBQztnQkFDVixPQUFPO2FBQ1I7WUFFRCx1Q0FBdUM7WUFDdkMsSUFBSSxDQUFDLHNCQUFzQixFQUFFO2dCQUMzQiwyQ0FBMkM7Z0JBQzNDLDZCQUE2QixHQUFHLElBQUksQ0FBQztnQkFDckMsb0NBQW9DO2dCQUNwQyxFQUFFLEtBQUssSUFBSSxJQUFJLEVBQUUsRUFBRSxDQUFDO2dCQUNwQixPQUFPLEVBQUUsQ0FBQztnQkFDVixPQUFPO2FBQ1I7WUFFRCxxREFBcUQ7WUFDckQsNkJBQTZCO1lBQzdCLDBCQUEwQixDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7Z0JBQ25DLEVBQUUsS0FBSyxJQUFJLElBQUksRUFBRSxFQUFFLENBQUM7Z0JBQ3BCLE9BQU8sRUFBRSxDQUFDO1lBQ1osQ0FBQyxDQUFDLENBQUM7WUFFSCxvREFBb0Q7WUFDcEQsY0FBYztZQUNkLElBQUksQ0FBQyx3QkFBd0IsRUFBRTtnQkFDN0Isb0JBQW9CO2dCQUNwQix3QkFBd0IsR0FBRyxJQUFJLENBQUM7Z0JBRWhDLElBQUksc0JBQXNCLENBQUMsTUFBTSxFQUFFO29CQUNqQyxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO3dCQUMvQyxlQUFlO3dCQUNmLG9CQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUNuQixDQUFDLElBQUksRUFBRSxFQUFFOzRCQUNQLHFDQUFxQzs0QkFDckMsc0JBQXNCLEVBQUUsQ0FBQzs0QkFDekIsMkNBQTJDOzRCQUMzQyxJQUFJLHNCQUFzQixJQUFJLHNCQUFzQixFQUFFO2dDQUNwRCwyQ0FBMkM7Z0NBQzNDLDZCQUE2QixHQUFHLElBQUksQ0FBQztnQ0FDckMsNkNBQTZDO2dDQUM3QywwQkFBMEIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRTtvQ0FDOUMscUJBQXFCO29DQUNyQixRQUFRLEVBQUUsQ0FBQztnQ0FDYixDQUFDLENBQUMsQ0FBQzs2QkFDSjt3QkFDSCxDQUFDLEVBQ0QsQ0FBQyxLQUFLLEVBQUUsRUFBRTs0QkFDUiwwQkFBMEI7NEJBQzFCLE9BQU8sQ0FBQyxLQUFLLENBQ1gsbURBQW1ELEVBQ25ELEtBQUssQ0FDTixDQUFDO3dCQUNKLENBQUMsQ0FDRixDQUFDO29CQUNKLENBQUMsQ0FBQyxDQUFDO2lCQUNKO2FBQ0Y7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFDRCxrQkFBZSxnQkFBZ0IsQ0FBQyJ9