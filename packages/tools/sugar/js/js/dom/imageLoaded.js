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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2VMb2FkZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvanMvZG9tL2ltYWdlTG9hZGVkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7OztJQUVkLHNFQUFpRDtJQUVqRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09Bd0JHO0lBQ0gsU0FBUyxXQUFXLENBQUMsSUFBSSxFQUFFLFFBQWU7UUFBZix5QkFBQSxFQUFBLGVBQWU7UUFDeEMsSUFBSSxnQkFBZ0IsRUFBRSxlQUFlLENBQUM7UUFFdEMsT0FBTyxJQUFJLG1CQUFVLENBQ25CLFVBQUMsRUFBbUI7Z0JBQWpCLE9BQU8sYUFBQSxFQUFFLE1BQU0sWUFBQTtZQUNoQixtQ0FBbUM7WUFDbkMsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7Z0JBQzdDLGtCQUFrQjtnQkFDbEIsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNkLDZCQUE2QjtnQkFDN0IsUUFBUSxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUM1QjtpQkFBTTtnQkFDTCxvQkFBb0I7Z0JBQ3BCLGdCQUFnQixHQUFHLFVBQUMsQ0FBQztvQkFDbkIsc0JBQXNCO29CQUN0QixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ2Qsb0JBQW9CO29CQUNwQixRQUFRLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUM3QixDQUFDLENBQUM7Z0JBQ0YsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO2dCQUNoRCxtQkFBbUI7Z0JBQ25CLGVBQWUsR0FBRyxVQUFDLENBQUM7b0JBQ2xCLFNBQVM7b0JBQ1QsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNaLENBQUMsQ0FBQztnQkFDRixJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLGVBQWUsQ0FBQyxDQUFDO2FBQ2pEO1FBQ0gsQ0FBQyxFQUNEO1lBQ0UsRUFBRSxFQUFFLGFBQWE7U0FDbEIsQ0FDRixDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUU7WUFDZCxnQkFBZ0IsSUFBSSxJQUFJLENBQUMsbUJBQW1CLENBQUMsTUFBTSxFQUFFLGdCQUFnQixDQUFDLENBQUM7WUFDdkUsZUFBZSxJQUFJLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLEVBQUUsZUFBZSxDQUFDLENBQUM7UUFDeEUsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBQ0Qsa0JBQWUsV0FBVyxDQUFDIn0=