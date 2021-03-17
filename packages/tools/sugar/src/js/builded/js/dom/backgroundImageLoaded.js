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
        define(["require", "exports", "./getStyleProperty", "./imageLoaded", "../../shared/string/unquote", "@coffeekraken/s-promise"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var getStyleProperty_1 = __importDefault(require("./getStyleProperty"));
    var imageLoaded_1 = __importDefault(require("./imageLoaded"));
    var unquote_1 = __importDefault(require("../../shared/string/unquote"));
    var s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
    /**
     * @name        backgroundImageLoaded
     * @namespace           sugar.js.dom
     * @type      Function
     * @stable
     *
     * Detect when a background image has been loaded on an HTMLElement
     *
     * @param    {HTMLElement}    $elm    The HTMLElement on which to detect the background image load
     * @return    {SPromise}    A promise that will be resolved when the background image has been loaded
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example    js
     * import backgroundImageLoaded from '@coffeekraken/sugar/js/dom/backgroundImageLoaded'
     * backgroundImageLoaded($myElm).then(() => {
     *   // do something when loaded
     * })
     *
     * @since     1.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function backgroundImageLoaded($elm) {
        var isCancelled = false, $img;
        var promise = new s_promise_1.default(function (_a) {
            var resolve = _a.resolve, reject = _a.reject, emit = _a.emit;
            // get the background-image property from computed style
            var backgroundImage = getStyleProperty_1.default($elm, 'background-image');
            var matches = backgroundImage.match(/.*url\((.*)\).*/);
            if (!matches || !matches[1]) {
                reject('No background image url found...');
                return;
            }
            // process url
            var url = unquote_1.default(matches[1]);
            // make a new image with the image set
            $img = new Image();
            $img.src = url;
            // return the promise of image loaded
            imageLoaded_1.default($img).then(function () {
                if (!isCancelled)
                    resolve($elm);
            });
        }, {
            id: 'backgroundImageLoaded'
        }).on('finally', function () {
            isCancelled = true;
        });
        promise.__$img = $img;
        return promise;
    }
    exports.default = backgroundImageLoaded;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFja2dyb3VuZEltYWdlTG9hZGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vZG9tL2JhY2tncm91bmRJbWFnZUxvYWRlZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7SUFFZCx3RUFBb0Q7SUFDcEQsOERBQTBDO0lBQzFDLHdFQUFvRDtJQUNwRCxzRUFBaUQ7SUFFakQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BdUJHO0lBQ0gsU0FBUyxxQkFBcUIsQ0FBQyxJQUFJO1FBQ2pDLElBQUksV0FBVyxHQUFHLEtBQUssRUFDckIsSUFBSSxDQUFDO1FBQ1AsSUFBTSxPQUFPLEdBQUcsSUFBSSxtQkFBVSxDQUM1QixVQUFDLEVBQXlCO2dCQUF2QixPQUFPLGFBQUEsRUFBRSxNQUFNLFlBQUEsRUFBRSxJQUFJLFVBQUE7WUFDdEIsd0RBQXdEO1lBQ3hELElBQU0sZUFBZSxHQUFHLDBCQUFrQixDQUFDLElBQUksRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO1lBQ3JFLElBQU0sT0FBTyxHQUFHLGVBQWUsQ0FBQyxLQUFLLENBQUMsaUJBQWlCLENBQUMsQ0FBQztZQUN6RCxJQUFJLENBQUMsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUMzQixNQUFNLENBQUMsa0NBQWtDLENBQUMsQ0FBQztnQkFDM0MsT0FBTzthQUNSO1lBQ0QsY0FBYztZQUNkLElBQU0sR0FBRyxHQUFHLGlCQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbEMsc0NBQXNDO1lBQ3RDLElBQUksR0FBRyxJQUFJLEtBQUssRUFBRSxDQUFDO1lBQ25CLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1lBQ2YscUNBQXFDO1lBQ3JDLHFCQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDO2dCQUN2QixJQUFJLENBQUMsV0FBVztvQkFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbEMsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLEVBQ0Q7WUFDRSxFQUFFLEVBQUUsdUJBQXVCO1NBQzVCLENBQ0YsQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFO1lBQ2QsV0FBVyxHQUFHLElBQUksQ0FBQztRQUNyQixDQUFDLENBQUMsQ0FBQztRQUNILE9BQU8sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLE9BQU8sT0FBTyxDQUFDO0lBQ2pCLENBQUM7SUFDRCxrQkFBZSxxQkFBcUIsQ0FBQyJ9