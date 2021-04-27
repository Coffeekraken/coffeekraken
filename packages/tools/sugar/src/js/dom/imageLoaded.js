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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2VMb2FkZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbWFnZUxvYWRlZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7SUFFZCx3RUFBaUQ7SUFFakQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXdCRztJQUNILFNBQVMsV0FBVyxDQUFDLElBQUksRUFBRSxRQUFRLEdBQUcsSUFBSTtRQUN4QyxJQUFJLGdCQUFnQixFQUFFLGVBQWUsQ0FBQztRQUV0QyxPQUFPLElBQUksbUJBQVUsQ0FDbkIsQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFO1lBQ3RCLG1DQUFtQztZQUNuQyxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtnQkFDN0Msa0JBQWtCO2dCQUNsQixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2QsNkJBQTZCO2dCQUM3QixRQUFRLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQzVCO2lCQUFNO2dCQUNMLG9CQUFvQjtnQkFDcEIsZ0JBQWdCLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRTtvQkFDdkIsc0JBQXNCO29CQUN0QixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ2Qsb0JBQW9CO29CQUNwQixRQUFRLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUM3QixDQUFDLENBQUM7Z0JBQ0YsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO2dCQUNoRCxtQkFBbUI7Z0JBQ25CLGVBQWUsR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFO29CQUN0QixTQUFTO29CQUNULE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDWixDQUFDLENBQUM7Z0JBQ0YsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxlQUFlLENBQUMsQ0FBQzthQUNqRDtRQUNILENBQUMsRUFDRDtZQUNFLEVBQUUsRUFBRSxhQUFhO1NBQ2xCLENBQ0YsQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLEdBQUcsRUFBRTtZQUNuQixnQkFBZ0IsSUFBSSxJQUFJLENBQUMsbUJBQW1CLENBQUMsTUFBTSxFQUFFLGdCQUFnQixDQUFDLENBQUM7WUFDdkUsZUFBZSxJQUFJLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLEVBQUUsZUFBZSxDQUFDLENBQUM7UUFDeEUsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBQ0Qsa0JBQWUsV0FBVyxDQUFDIn0=