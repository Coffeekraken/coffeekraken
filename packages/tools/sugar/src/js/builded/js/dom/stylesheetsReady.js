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
    exports.default = stylesheetsReady;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3R5bGVzaGVldHNSZWFkeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2RvbS9zdHlsZXNoZWV0c1JlYWR5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7OztJQUVkLDREQUFzQztJQUN0Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BMkJHO0lBQ0gsU0FBUyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsRUFBUztRQUFULG1CQUFBLEVBQUEsU0FBUztRQUN4QyxJQUFNLHNCQUFzQixHQUFHLEtBQUssQ0FBQztRQUNyQyxJQUFNLHNCQUFzQixHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUM7UUFDNUMsSUFBSSxzQkFBc0IsR0FBRyxDQUFDLENBQUM7UUFDL0IsSUFBTSwwQkFBMEIsR0FBRyxFQUFFLENBQUM7UUFDdEMsSUFBSSx3QkFBd0IsR0FBRyxLQUFLLENBQUM7UUFDckMsSUFBSSw2QkFBNkIsR0FBRyxLQUFLLENBQUM7UUFFMUMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxVQUFDLE9BQU8sRUFBRSxNQUFNO1lBQ2pDLElBQUksNkJBQTZCLEVBQUU7Z0JBQ2pDLEVBQUUsS0FBSyxJQUFJLElBQUksRUFBRSxFQUFFLENBQUM7Z0JBQ3BCLE9BQU8sRUFBRSxDQUFDO2dCQUNWLE9BQU87YUFDUjtZQUVELHVDQUF1QztZQUN2QyxJQUFJLENBQUMsc0JBQXNCLEVBQUU7Z0JBQzNCLDJDQUEyQztnQkFDM0MsNkJBQTZCLEdBQUcsSUFBSSxDQUFDO2dCQUNyQyxvQ0FBb0M7Z0JBQ3BDLEVBQUUsS0FBSyxJQUFJLElBQUksRUFBRSxFQUFFLENBQUM7Z0JBQ3BCLE9BQU8sRUFBRSxDQUFDO2dCQUNWLE9BQU87YUFDUjtZQUVELHFEQUFxRDtZQUNyRCw2QkFBNkI7WUFDN0IsMEJBQTBCLENBQUMsSUFBSSxDQUFDO2dCQUM5QixFQUFFLEtBQUssSUFBSSxJQUFJLEVBQUUsRUFBRSxDQUFDO2dCQUNwQixPQUFPLEVBQUUsQ0FBQztZQUNaLENBQUMsQ0FBQyxDQUFDO1lBRUgsb0RBQW9EO1lBQ3BELGNBQWM7WUFDZCxJQUFJLENBQUMsd0JBQXdCLEVBQUU7Z0JBQzdCLG9CQUFvQjtnQkFDcEIsd0JBQXdCLEdBQUcsSUFBSSxDQUFDO2dCQUVoQyxJQUFJLHNCQUFzQixDQUFDLE1BQU0sRUFBRTtvQkFDakMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsc0JBQXNCLEVBQUUsVUFBQyxJQUFJO3dCQUMzQyxlQUFlO3dCQUNmLG9CQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUNuQixVQUFDLElBQUk7NEJBQ0gscUNBQXFDOzRCQUNyQyxzQkFBc0IsRUFBRSxDQUFDOzRCQUN6QiwyQ0FBMkM7NEJBQzNDLElBQUksc0JBQXNCLElBQUksc0JBQXNCLEVBQUU7Z0NBQ3BELDJDQUEyQztnQ0FDM0MsNkJBQTZCLEdBQUcsSUFBSSxDQUFDO2dDQUNyQyw2Q0FBNkM7Z0NBQzdDLDBCQUEwQixDQUFDLE9BQU8sQ0FBQyxVQUFDLFFBQVE7b0NBQzFDLHFCQUFxQjtvQ0FDckIsUUFBUSxFQUFFLENBQUM7Z0NBQ2IsQ0FBQyxDQUFDLENBQUM7NkJBQ0o7d0JBQ0gsQ0FBQyxFQUNELFVBQUMsS0FBSzs0QkFDSiwwQkFBMEI7NEJBQzFCLE9BQU8sQ0FBQyxLQUFLLENBQ1gsbURBQW1ELEVBQ25ELEtBQUssQ0FDTixDQUFDO3dCQUNKLENBQUMsQ0FDRixDQUFDO29CQUNKLENBQUMsQ0FBQyxDQUFDO2lCQUNKO2FBQ0Y7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFDRCxrQkFBZSxnQkFBZ0IsQ0FBQyJ9