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
     * @namespace            js.dom
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlua0xvYWRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImxpbmtMb2FkZWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7O0lBRWQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXdCRztJQUNILFNBQVMsYUFBYSxDQUFDLElBQUk7UUFDekIsSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUN2QixJQUFJLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDbkIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3BELElBQ0UsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJO2dCQUM1QixRQUFRLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQ3hDO2dCQUNBLDRCQUE0QjtnQkFDNUIsTUFBTSxHQUFHLElBQUksQ0FBQzthQUNmO2lCQUFNLElBQUksQ0FBQyxJQUFJLFFBQVEsQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFDL0Msa0RBQWtEO2FBQ25EO1NBQ0Y7UUFDRCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBRUQsU0FBUyxVQUFVLENBQUMsSUFBSSxFQUFFLFFBQWU7UUFBZix5QkFBQSxFQUFBLGVBQWU7UUFDdkMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxVQUFDLE9BQU8sRUFBRSxNQUFNO1lBQ2pDLG1DQUFtQztZQUNuQyxJQUFJLGFBQWEsQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDdkIsa0JBQWtCO2dCQUNsQixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2QsNkJBQTZCO2dCQUM3QixRQUFRLElBQUksSUFBSSxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNwQztpQkFBTTtnQkFDTCxJQUFNLEdBQUcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUUxQyxvQkFBb0I7Z0JBRXBCLGdDQUFnQztnQkFDaEMsa0NBQWtDO2dCQUNsQyxtQ0FBbUM7Z0JBQ25DLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsVUFBQyxDQUFDO29CQUM5QixzQkFBc0I7b0JBQ3RCLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDZCxvQkFBb0I7b0JBQ3BCLFFBQVEsSUFBSSxJQUFJLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNyQyxDQUFDLENBQUMsQ0FBQztnQkFDSCxtQkFBbUI7Z0JBQ25CLHlDQUF5QztnQkFDekMsOEJBQThCO2dCQUM5QixhQUFhO2dCQUNiLGNBQWM7Z0JBQ2QsYUFBYTtnQkFFYixVQUFVO2dCQUNWLEdBQUcsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztnQkFDcEIsa0NBQWtDO2FBQ25DO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBQ0Qsa0JBQWUsVUFBVSxDQUFDIn0=