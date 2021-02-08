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
    var linkLoaded_1 = __importDefault(require("./linkLoaded"));
    /**
     * @name      stylesheetsReady
     * @namespace           sugar.js.dom
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
    return stylesheetsReady;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3R5bGVzaGVldHNSZWFkeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInN0eWxlc2hlZXRzUmVhZHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7SUFFZCw0REFBc0M7SUFDdEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQTJCRztJQUNILFNBQVMsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLEVBQVM7UUFBVCxtQkFBQSxFQUFBLFNBQVM7UUFDeEMsSUFBTSxzQkFBc0IsR0FBRyxLQUFLLENBQUM7UUFDckMsSUFBTSxzQkFBc0IsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDO1FBQzVDLElBQUksc0JBQXNCLEdBQUcsQ0FBQyxDQUFDO1FBQy9CLElBQU0sMEJBQTBCLEdBQUcsRUFBRSxDQUFDO1FBQ3RDLElBQUksd0JBQXdCLEdBQUcsS0FBSyxDQUFDO1FBQ3JDLElBQUksNkJBQTZCLEdBQUcsS0FBSyxDQUFDO1FBRTFDLE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPLEVBQUUsTUFBTTtZQUNqQyxJQUFJLDZCQUE2QixFQUFFO2dCQUNqQyxFQUFFLEtBQUssSUFBSSxJQUFJLEVBQUUsRUFBRSxDQUFDO2dCQUNwQixPQUFPLEVBQUUsQ0FBQztnQkFDVixPQUFPO2FBQ1I7WUFFRCx1Q0FBdUM7WUFDdkMsSUFBSSxDQUFDLHNCQUFzQixFQUFFO2dCQUMzQiwyQ0FBMkM7Z0JBQzNDLDZCQUE2QixHQUFHLElBQUksQ0FBQztnQkFDckMsb0NBQW9DO2dCQUNwQyxFQUFFLEtBQUssSUFBSSxJQUFJLEVBQUUsRUFBRSxDQUFDO2dCQUNwQixPQUFPLEVBQUUsQ0FBQztnQkFDVixPQUFPO2FBQ1I7WUFFRCxxREFBcUQ7WUFDckQsNkJBQTZCO1lBQzdCLDBCQUEwQixDQUFDLElBQUksQ0FBQztnQkFDOUIsRUFBRSxLQUFLLElBQUksSUFBSSxFQUFFLEVBQUUsQ0FBQztnQkFDcEIsT0FBTyxFQUFFLENBQUM7WUFDWixDQUFDLENBQUMsQ0FBQztZQUVILG9EQUFvRDtZQUNwRCxjQUFjO1lBQ2QsSUFBSSxDQUFDLHdCQUF3QixFQUFFO2dCQUM3QixvQkFBb0I7Z0JBQ3BCLHdCQUF3QixHQUFHLElBQUksQ0FBQztnQkFFaEMsSUFBSSxzQkFBc0IsQ0FBQyxNQUFNLEVBQUU7b0JBQ2pDLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLHNCQUFzQixFQUFFLFVBQUMsSUFBSTt3QkFDM0MsZUFBZTt3QkFDZixvQkFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FDbkIsVUFBQyxJQUFJOzRCQUNILHFDQUFxQzs0QkFDckMsc0JBQXNCLEVBQUUsQ0FBQzs0QkFDekIsMkNBQTJDOzRCQUMzQyxJQUFJLHNCQUFzQixJQUFJLHNCQUFzQixFQUFFO2dDQUNwRCwyQ0FBMkM7Z0NBQzNDLDZCQUE2QixHQUFHLElBQUksQ0FBQztnQ0FDckMsNkNBQTZDO2dDQUM3QywwQkFBMEIsQ0FBQyxPQUFPLENBQUMsVUFBQyxRQUFRO29DQUMxQyxxQkFBcUI7b0NBQ3JCLFFBQVEsRUFBRSxDQUFDO2dDQUNiLENBQUMsQ0FBQyxDQUFDOzZCQUNKO3dCQUNILENBQUMsRUFDRCxVQUFDLEtBQUs7NEJBQ0osMEJBQTBCOzRCQUMxQixPQUFPLENBQUMsS0FBSyxDQUNYLG1EQUFtRCxFQUNuRCxLQUFLLENBQ04sQ0FBQzt3QkFDSixDQUFDLENBQ0YsQ0FBQztvQkFDSixDQUFDLENBQUMsQ0FBQztpQkFDSjthQUNGO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBQ0QsT0FBUyxnQkFBZ0IsQ0FBQyJ9