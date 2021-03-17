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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlua0xvYWRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2RvbS9saW5rTG9hZGVkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7OztJQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0F3Qkc7SUFDSCxTQUFTLGFBQWEsQ0FBQyxJQUFJO1FBQ3pCLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDdkIsSUFBSSxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ25CLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxRQUFRLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNwRCxJQUNFLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSTtnQkFDNUIsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUN4QztnQkFDQSw0QkFBNEI7Z0JBQzVCLE1BQU0sR0FBRyxJQUFJLENBQUM7YUFDZjtpQkFBTSxJQUFJLENBQUMsSUFBSSxRQUFRLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQy9DLGtEQUFrRDthQUNuRDtTQUNGO1FBQ0QsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUVELFNBQVMsVUFBVSxDQUFDLElBQUksRUFBRSxRQUFlO1FBQWYseUJBQUEsRUFBQSxlQUFlO1FBQ3ZDLE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPLEVBQUUsTUFBTTtZQUNqQyxtQ0FBbUM7WUFDbkMsSUFBSSxhQUFhLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ3ZCLGtCQUFrQjtnQkFDbEIsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNkLDZCQUE2QjtnQkFDN0IsUUFBUSxJQUFJLElBQUksSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDcEM7aUJBQU07Z0JBQ0wsSUFBTSxHQUFHLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFFMUMsb0JBQW9CO2dCQUVwQixnQ0FBZ0M7Z0JBQ2hDLGtDQUFrQztnQkFDbEMsbUNBQW1DO2dCQUNuQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFVBQUMsQ0FBQztvQkFDOUIsc0JBQXNCO29CQUN0QixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ2Qsb0JBQW9CO29CQUNwQixRQUFRLElBQUksSUFBSSxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDckMsQ0FBQyxDQUFDLENBQUM7Z0JBQ0gsbUJBQW1CO2dCQUNuQix5Q0FBeUM7Z0JBQ3pDLDhCQUE4QjtnQkFDOUIsYUFBYTtnQkFDYixjQUFjO2dCQUNkLGFBQWE7Z0JBRWIsVUFBVTtnQkFDVixHQUFHLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7Z0JBQ3BCLGtDQUFrQzthQUNuQztRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUNELGtCQUFlLFVBQVUsQ0FBQyJ9