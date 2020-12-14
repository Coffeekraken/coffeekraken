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
        define(["require", "exports", "../promise/SPromise"], factory);
    }
})(function (require, exports) {
    "use strict";
    var SPromise_1 = __importDefault(require("../promise/SPromise"));
    /**
     * @name      imageLoaded
     * @namespace           sugar.js.dom
     * @type      Function
     * @stable
     *
     * Wait until the passed image is fully loaded
     *
     * @param 		{HTMLImageElement} 			$img  		The image to check the loading state
     * @param 		{Function}					[cb=null] 	An optional callback to call
     * @return 		{SPromise} 								The promise that will be resolved when all the images are correctly loaded
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example  	js
     * import imageLoaded from '@coffeekraken/sugar/js/dom/imageLoaded'
     * imageLoaded(myCoolHTMLImageElement).then(($img) => {
     * 		// do something when the image is loaded
     * });
     *
     * @since         1.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function imageLoaded($img, callback) {
        if (callback === void 0) { callback = null; }
        var imgLoadedHandler, imgErrorHandler;
        return new SPromise_1.default(function (resolve, reject, trigger, cancel) {
            // check if image is already loaded
            if ($img.hasAttribute('src') && $img.complete) {
                // resolve promise
                resolve($img);
                // call the callback if exist
                callback && callback($img);
            }
            else {
                // wait until loaded
                imgLoadedHandler = function (e) {
                    // resolve the promise
                    resolve($img);
                    // callback if exist
                    callback && callback($img);
                };
                $img.addEventListener('load', imgLoadedHandler);
                // listen for error
                imgErrorHandler = function (e) {
                    // reject
                    reject(e);
                };
                $img.addEventListener('error', imgErrorHandler);
            }
        }, {
            id: 'imageLoaded'
        }).on('finally', function () {
            imgLoadedHandler && $img.removeEventListener('load', imgLoadedHandler);
            imgErrorHandler && $img.removeEventListener('error', imgErrorHandler);
        });
    }
    return imageLoaded;
});
//# sourceMappingURL=module.js.map