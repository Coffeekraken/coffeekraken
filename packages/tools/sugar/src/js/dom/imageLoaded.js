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
        define(["require", "exports", "@coffeekraken/s-promise"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
    /**
     * @name      imageLoaded
     * @namespace            js.dom
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
        return new s_promise_1.default(function (_a) {
            var resolve = _a.resolve, reject = _a.reject;
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
    exports.default = imageLoaded;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2VMb2FkZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbWFnZUxvYWRlZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7SUFFZCxzRUFBaUQ7SUFFakQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXdCRztJQUNILFNBQVMsV0FBVyxDQUFDLElBQUksRUFBRSxRQUFlO1FBQWYseUJBQUEsRUFBQSxlQUFlO1FBQ3hDLElBQUksZ0JBQWdCLEVBQUUsZUFBZSxDQUFDO1FBRXRDLE9BQU8sSUFBSSxtQkFBVSxDQUNuQixVQUFDLEVBQW1CO2dCQUFqQixPQUFPLGFBQUEsRUFBRSxNQUFNLFlBQUE7WUFDaEIsbUNBQW1DO1lBQ25DLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUM3QyxrQkFBa0I7Z0JBQ2xCLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDZCw2QkFBNkI7Z0JBQzdCLFFBQVEsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDNUI7aUJBQU07Z0JBQ0wsb0JBQW9CO2dCQUNwQixnQkFBZ0IsR0FBRyxVQUFDLENBQUM7b0JBQ25CLHNCQUFzQjtvQkFDdEIsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUNkLG9CQUFvQjtvQkFDcEIsUUFBUSxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDN0IsQ0FBQyxDQUFDO2dCQUNGLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztnQkFDaEQsbUJBQW1CO2dCQUNuQixlQUFlLEdBQUcsVUFBQyxDQUFDO29CQUNsQixTQUFTO29CQUNULE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDWixDQUFDLENBQUM7Z0JBQ0YsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxlQUFlLENBQUMsQ0FBQzthQUNqRDtRQUNILENBQUMsRUFDRDtZQUNFLEVBQUUsRUFBRSxhQUFhO1NBQ2xCLENBQ0YsQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFO1lBQ2QsZ0JBQWdCLElBQUksSUFBSSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO1lBQ3ZFLGVBQWUsSUFBSSxJQUFJLENBQUMsbUJBQW1CLENBQUMsT0FBTyxFQUFFLGVBQWUsQ0FBQyxDQUFDO1FBQ3hFLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUNELGtCQUFlLFdBQVcsQ0FBQyJ9