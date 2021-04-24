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
    var linkLoaded_1 = __importDefault(require("./linkLoaded"));
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
    function stylesheetsReady(links, cb) {
        if (cb === void 0) { cb = null; }
        var neededStylesheetsStack = links;
        var neededStylesheetsCount = links.length;
        var loadedStylesheedsCount = 0;
        var loadedStylesheetsCallbacks = [];
        var loadedStylesheedsProcess = false;
        var stylesheetsDependenciesStatus = false;
        return new Promise(function (resolve, reject) {
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
            loadedStylesheetsCallbacks.push(function () {
                cb !== null && cb();
                resolve();
            });
            // check if already a process of checking for loaded
            // stylesheets
            if (!loadedStylesheedsProcess) {
                // update the status
                loadedStylesheedsProcess = true;
                if (neededStylesheetsStack.length) {
                    [].forEach.call(neededStylesheetsStack, function (link) {
                        // check loaded
                        linkLoaded_1.default(link).then(function (link) {
                            // update the loaded stylesheet count
                            loadedStylesheedsCount++;
                            // check if all stylesheets has been loaded
                            if (loadedStylesheedsCount >= neededStylesheetsCount) {
                                // update the stylesheetsDependenciesStatus
                                stylesheetsDependenciesStatus = true;
                                // loop on all the loadedStylesheetsCallbacks
                                loadedStylesheetsCallbacks.forEach(function (callback) {
                                    // apply the callback
                                    callback();
                                });
                            }
                        }, function (error) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3R5bGVzaGVldHNSZWFkeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInN0eWxlc2hlZXRzUmVhZHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7O0lBRWQsNERBQXNDO0lBQ3RDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0EyQkc7SUFDSCxTQUFTLGdCQUFnQixDQUFDLEtBQUssRUFBRSxFQUFTO1FBQVQsbUJBQUEsRUFBQSxTQUFTO1FBQ3hDLElBQU0sc0JBQXNCLEdBQUcsS0FBSyxDQUFDO1FBQ3JDLElBQU0sc0JBQXNCLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQztRQUM1QyxJQUFJLHNCQUFzQixHQUFHLENBQUMsQ0FBQztRQUMvQixJQUFNLDBCQUEwQixHQUFHLEVBQUUsQ0FBQztRQUN0QyxJQUFJLHdCQUF3QixHQUFHLEtBQUssQ0FBQztRQUNyQyxJQUFJLDZCQUE2QixHQUFHLEtBQUssQ0FBQztRQUUxQyxPQUFPLElBQUksT0FBTyxDQUFDLFVBQUMsT0FBTyxFQUFFLE1BQU07WUFDakMsSUFBSSw2QkFBNkIsRUFBRTtnQkFDakMsRUFBRSxLQUFLLElBQUksSUFBSSxFQUFFLEVBQUUsQ0FBQztnQkFDcEIsT0FBTyxFQUFFLENBQUM7Z0JBQ1YsT0FBTzthQUNSO1lBRUQsdUNBQXVDO1lBQ3ZDLElBQUksQ0FBQyxzQkFBc0IsRUFBRTtnQkFDM0IsMkNBQTJDO2dCQUMzQyw2QkFBNkIsR0FBRyxJQUFJLENBQUM7Z0JBQ3JDLG9DQUFvQztnQkFDcEMsRUFBRSxLQUFLLElBQUksSUFBSSxFQUFFLEVBQUUsQ0FBQztnQkFDcEIsT0FBTyxFQUFFLENBQUM7Z0JBQ1YsT0FBTzthQUNSO1lBRUQscURBQXFEO1lBQ3JELDZCQUE2QjtZQUM3QiwwQkFBMEIsQ0FBQyxJQUFJLENBQUM7Z0JBQzlCLEVBQUUsS0FBSyxJQUFJLElBQUksRUFBRSxFQUFFLENBQUM7Z0JBQ3BCLE9BQU8sRUFBRSxDQUFDO1lBQ1osQ0FBQyxDQUFDLENBQUM7WUFFSCxvREFBb0Q7WUFDcEQsY0FBYztZQUNkLElBQUksQ0FBQyx3QkFBd0IsRUFBRTtnQkFDN0Isb0JBQW9CO2dCQUNwQix3QkFBd0IsR0FBRyxJQUFJLENBQUM7Z0JBRWhDLElBQUksc0JBQXNCLENBQUMsTUFBTSxFQUFFO29CQUNqQyxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxVQUFDLElBQUk7d0JBQzNDLGVBQWU7d0JBQ2Ysb0JBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQ25CLFVBQUMsSUFBSTs0QkFDSCxxQ0FBcUM7NEJBQ3JDLHNCQUFzQixFQUFFLENBQUM7NEJBQ3pCLDJDQUEyQzs0QkFDM0MsSUFBSSxzQkFBc0IsSUFBSSxzQkFBc0IsRUFBRTtnQ0FDcEQsMkNBQTJDO2dDQUMzQyw2QkFBNkIsR0FBRyxJQUFJLENBQUM7Z0NBQ3JDLDZDQUE2QztnQ0FDN0MsMEJBQTBCLENBQUMsT0FBTyxDQUFDLFVBQUMsUUFBUTtvQ0FDMUMscUJBQXFCO29DQUNyQixRQUFRLEVBQUUsQ0FBQztnQ0FDYixDQUFDLENBQUMsQ0FBQzs2QkFDSjt3QkFDSCxDQUFDLEVBQ0QsVUFBQyxLQUFLOzRCQUNKLDBCQUEwQjs0QkFDMUIsT0FBTyxDQUFDLEtBQUssQ0FDWCxtREFBbUQsRUFDbkQsS0FBSyxDQUNOLENBQUM7d0JBQ0osQ0FBQyxDQUNGLENBQUM7b0JBQ0osQ0FBQyxDQUFDLENBQUM7aUJBQ0o7YUFDRjtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUNELGtCQUFlLGdCQUFnQixDQUFDIn0=