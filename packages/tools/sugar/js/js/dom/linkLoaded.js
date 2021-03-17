// @ts-nocheck
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * @name      linkLoaded
     * @namespace           sugar.js.dom
     * @type      Function
     * @stable
     *
     * Wait until the passed HTMLLinkElement is fully loaded
     *
     * @param 		{HTMLLinkElement} 			link  		The link tag to check the loading state
     * @param 		{Function}					[cb=null] 	An optional callback to call
     * @return 		{Promise} 								The promise that will be resolved
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example  	js
     * import linkLoaded from '@coffeekraken/sugar/js/dom/linkLoaded'
     * linkLoaded(myCoolHTMLLinlElement).then((link) => {
     * 		// do something when the link is loaded
     * });
     *
     * @since         1.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function alreadyLoaded(link) {
        var href = link.href;
        var result = false;
        for (var i = 0; i < document.styleSheets.length; i++) {
            if (document.styleSheets[i].href &&
                document.styleSheets[i].href.match(href)) {
                // the css is already loaded
                result = true;
            }
            else if (i == document.styleSheets.length - 1) {
                // Fallback. There is no request for the css file.
            }
        }
        return result;
    }
    function linkLoaded(link, callback) {
        if (callback === void 0) { callback = null; }
        return new Promise(function (resolve, reject) {
            // check if image is already loaded
            if (alreadyLoaded(link)) {
                // resolve promise
                resolve(link);
                // call the callback if exist
                callback != null && callback(link);
            }
            else {
                var img = document.createElement('img');
                // wait until loaded
                // we load the css into an image
                // when the image is in error more
                // that mean that the css is loaded
                img.addEventListener('error', function (e) {
                    // resolve the promise
                    resolve(link);
                    // callback if exist
                    callback != null && callback(link);
                });
                // listen for error
                // img.addEventListener('error', (e) => {
                // 	console.error('ERROR', e);
                // 	// reject
                // 	reject(e);
                // }, false);
                // set url
                img.src = link.href;
                // document.body.appendChild(img);
            }
        });
    }
    exports.default = linkLoaded;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlua0xvYWRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9qcy9kb20vbGlua0xvYWRlZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7SUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09Bd0JHO0lBQ0gsU0FBUyxhQUFhLENBQUMsSUFBSTtRQUN6QixJQUFNLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ3ZCLElBQUksTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNuQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsUUFBUSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDcEQsSUFDRSxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUk7Z0JBQzVCLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFDeEM7Z0JBQ0EsNEJBQTRCO2dCQUM1QixNQUFNLEdBQUcsSUFBSSxDQUFDO2FBQ2Y7aUJBQU0sSUFBSSxDQUFDLElBQUksUUFBUSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO2dCQUMvQyxrREFBa0Q7YUFDbkQ7U0FDRjtRQUNELE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxTQUFTLFVBQVUsQ0FBQyxJQUFJLEVBQUUsUUFBZTtRQUFmLHlCQUFBLEVBQUEsZUFBZTtRQUN2QyxPQUFPLElBQUksT0FBTyxDQUFDLFVBQUMsT0FBTyxFQUFFLE1BQU07WUFDakMsbUNBQW1DO1lBQ25DLElBQUksYUFBYSxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUN2QixrQkFBa0I7Z0JBQ2xCLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDZCw2QkFBNkI7Z0JBQzdCLFFBQVEsSUFBSSxJQUFJLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ3BDO2lCQUFNO2dCQUNMLElBQU0sR0FBRyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBRTFDLG9CQUFvQjtnQkFFcEIsZ0NBQWdDO2dCQUNoQyxrQ0FBa0M7Z0JBQ2xDLG1DQUFtQztnQkFDbkMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxVQUFDLENBQUM7b0JBQzlCLHNCQUFzQjtvQkFDdEIsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUNkLG9CQUFvQjtvQkFDcEIsUUFBUSxJQUFJLElBQUksSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3JDLENBQUMsQ0FBQyxDQUFDO2dCQUNILG1CQUFtQjtnQkFDbkIseUNBQXlDO2dCQUN6Qyw4QkFBOEI7Z0JBQzlCLGFBQWE7Z0JBQ2IsY0FBYztnQkFDZCxhQUFhO2dCQUViLFVBQVU7Z0JBQ1YsR0FBRyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO2dCQUNwQixrQ0FBa0M7YUFDbkM7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFDRCxrQkFBZSxVQUFVLENBQUMifQ==