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
    const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
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
    function imageLoaded($img, callback = null) {
        let imgLoadedHandler, imgErrorHandler;
        return new s_promise_1.default(({ resolve, reject }) => {
            // check if image is already loaded
            if ($img.hasAttribute('src') && $img.complete) {
                // resolve promise
                resolve($img);
                // call the callback if exist
                callback && callback($img);
            }
            else {
                // wait until loaded
                imgLoadedHandler = (e) => {
                    // resolve the promise
                    resolve($img);
                    // callback if exist
                    callback && callback($img);
                };
                $img.addEventListener('load', imgLoadedHandler);
                // listen for error
                imgErrorHandler = (e) => {
                    // reject
                    reject(e);
                };
                $img.addEventListener('error', imgErrorHandler);
            }
        }, {
            id: 'imageLoaded'
        }).on('finally', () => {
            imgLoadedHandler && $img.removeEventListener('load', imgLoadedHandler);
            imgErrorHandler && $img.removeEventListener('error', imgErrorHandler);
        });
    }
    exports.default = imageLoaded;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2VMb2FkZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy90b29scy9zdWdhci9zcmMvanMvZG9tL2ltYWdlTG9hZGVkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7OztJQUVkLHdFQUFpRDtJQUVqRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09Bd0JHO0lBQ0gsU0FBUyxXQUFXLENBQUMsSUFBSSxFQUFFLFFBQVEsR0FBRyxJQUFJO1FBQ3hDLElBQUksZ0JBQWdCLEVBQUUsZUFBZSxDQUFDO1FBRXRDLE9BQU8sSUFBSSxtQkFBVSxDQUNuQixDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUU7WUFDdEIsbUNBQW1DO1lBQ25DLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUM3QyxrQkFBa0I7Z0JBQ2xCLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDZCw2QkFBNkI7Z0JBQzdCLFFBQVEsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDNUI7aUJBQU07Z0JBQ0wsb0JBQW9CO2dCQUNwQixnQkFBZ0IsR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFO29CQUN2QixzQkFBc0I7b0JBQ3RCLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDZCxvQkFBb0I7b0JBQ3BCLFFBQVEsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQzdCLENBQUMsQ0FBQztnQkFDRixJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLGdCQUFnQixDQUFDLENBQUM7Z0JBQ2hELG1CQUFtQjtnQkFDbkIsZUFBZSxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUU7b0JBQ3RCLFNBQVM7b0JBQ1QsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNaLENBQUMsQ0FBQztnQkFDRixJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLGVBQWUsQ0FBQyxDQUFDO2FBQ2pEO1FBQ0gsQ0FBQyxFQUNEO1lBQ0UsRUFBRSxFQUFFLGFBQWE7U0FDbEIsQ0FDRixDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsR0FBRyxFQUFFO1lBQ25CLGdCQUFnQixJQUFJLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztZQUN2RSxlQUFlLElBQUksSUFBSSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sRUFBRSxlQUFlLENBQUMsQ0FBQztRQUN4RSxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFDRCxrQkFBZSxXQUFXLENBQUMifQ==