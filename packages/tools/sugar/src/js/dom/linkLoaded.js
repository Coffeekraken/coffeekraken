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
                // console.log('CHECK LOADING', link.href);
                // we load the css into an image
                // when the image is in error more
                // that mean that the css is loaded
                img.addEventListener('error', function (e) {
                    // console.log('LOADED', e);
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
    return linkLoaded;
});
