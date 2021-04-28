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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3R5bGVzaGVldHNSZWFkeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3Rvb2xzL3N1Z2FyL3NyYy9qcy9kb20vc3R5bGVzaGVldHNSZWFkeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7SUFFZCw4REFBc0M7SUFDdEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQTJCRztJQUNILFNBQVMsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLEVBQUUsR0FBRyxJQUFJO1FBQ3hDLE1BQU0sc0JBQXNCLEdBQUcsS0FBSyxDQUFDO1FBQ3JDLE1BQU0sc0JBQXNCLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQztRQUM1QyxJQUFJLHNCQUFzQixHQUFHLENBQUMsQ0FBQztRQUMvQixNQUFNLDBCQUEwQixHQUFHLEVBQUUsQ0FBQztRQUN0QyxJQUFJLHdCQUF3QixHQUFHLEtBQUssQ0FBQztRQUNyQyxJQUFJLDZCQUE2QixHQUFHLEtBQUssQ0FBQztRQUUxQyxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ3JDLElBQUksNkJBQTZCLEVBQUU7Z0JBQ2pDLEVBQUUsS0FBSyxJQUFJLElBQUksRUFBRSxFQUFFLENBQUM7Z0JBQ3BCLE9BQU8sRUFBRSxDQUFDO2dCQUNWLE9BQU87YUFDUjtZQUVELHVDQUF1QztZQUN2QyxJQUFJLENBQUMsc0JBQXNCLEVBQUU7Z0JBQzNCLDJDQUEyQztnQkFDM0MsNkJBQTZCLEdBQUcsSUFBSSxDQUFDO2dCQUNyQyxvQ0FBb0M7Z0JBQ3BDLEVBQUUsS0FBSyxJQUFJLElBQUksRUFBRSxFQUFFLENBQUM7Z0JBQ3BCLE9BQU8sRUFBRSxDQUFDO2dCQUNWLE9BQU87YUFDUjtZQUVELHFEQUFxRDtZQUNyRCw2QkFBNkI7WUFDN0IsMEJBQTBCLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtnQkFDbkMsRUFBRSxLQUFLLElBQUksSUFBSSxFQUFFLEVBQUUsQ0FBQztnQkFDcEIsT0FBTyxFQUFFLENBQUM7WUFDWixDQUFDLENBQUMsQ0FBQztZQUVILG9EQUFvRDtZQUNwRCxjQUFjO1lBQ2QsSUFBSSxDQUFDLHdCQUF3QixFQUFFO2dCQUM3QixvQkFBb0I7Z0JBQ3BCLHdCQUF3QixHQUFHLElBQUksQ0FBQztnQkFFaEMsSUFBSSxzQkFBc0IsQ0FBQyxNQUFNLEVBQUU7b0JBQ2pDLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7d0JBQy9DLGVBQWU7d0JBQ2Ysb0JBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQ25CLENBQUMsSUFBSSxFQUFFLEVBQUU7NEJBQ1AscUNBQXFDOzRCQUNyQyxzQkFBc0IsRUFBRSxDQUFDOzRCQUN6QiwyQ0FBMkM7NEJBQzNDLElBQUksc0JBQXNCLElBQUksc0JBQXNCLEVBQUU7Z0NBQ3BELDJDQUEyQztnQ0FDM0MsNkJBQTZCLEdBQUcsSUFBSSxDQUFDO2dDQUNyQyw2Q0FBNkM7Z0NBQzdDLDBCQUEwQixDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFO29DQUM5QyxxQkFBcUI7b0NBQ3JCLFFBQVEsRUFBRSxDQUFDO2dDQUNiLENBQUMsQ0FBQyxDQUFDOzZCQUNKO3dCQUNILENBQUMsRUFDRCxDQUFDLEtBQUssRUFBRSxFQUFFOzRCQUNSLDBCQUEwQjs0QkFDMUIsT0FBTyxDQUFDLEtBQUssQ0FDWCxtREFBbUQsRUFDbkQsS0FBSyxDQUNOLENBQUM7d0JBQ0osQ0FBQyxDQUNGLENBQUM7b0JBQ0osQ0FBQyxDQUFDLENBQUM7aUJBQ0o7YUFDRjtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUNELGtCQUFlLGdCQUFnQixDQUFDIn0=