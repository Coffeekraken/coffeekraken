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
