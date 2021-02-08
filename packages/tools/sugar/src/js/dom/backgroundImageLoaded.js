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
        define(["require", "exports", "./getStyleProperty", "./imageLoaded", "../string/unquote", "../promise/SPromise"], factory);
    }
})(function (require, exports) {
    "use strict";
    var getStyleProperty_1 = __importDefault(require("./getStyleProperty"));
    var imageLoaded_1 = __importDefault(require("./imageLoaded"));
    var unquote_1 = __importDefault(require("../string/unquote"));
    var SPromise_1 = __importDefault(require("../promise/SPromise"));
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
        var promise = new SPromise_1.default(function (_a) {
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
    return backgroundImageLoaded;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFja2dyb3VuZEltYWdlTG9hZGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYmFja2dyb3VuZEltYWdlTG9hZGVkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7O0lBRWQsd0VBQW9EO0lBQ3BELDhEQUEwQztJQUMxQyw4REFBMEM7SUFDMUMsaUVBQTZDO0lBRTdDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXVCRztJQUNILFNBQVMscUJBQXFCLENBQUMsSUFBSTtRQUNqQyxJQUFJLFdBQVcsR0FBRyxLQUFLLEVBQ3JCLElBQUksQ0FBQztRQUNQLElBQU0sT0FBTyxHQUFHLElBQUksa0JBQVUsQ0FDNUIsVUFBQyxFQUF5QjtnQkFBdkIsT0FBTyxhQUFBLEVBQUUsTUFBTSxZQUFBLEVBQUUsSUFBSSxVQUFBO1lBQ3RCLHdEQUF3RDtZQUN4RCxJQUFNLGVBQWUsR0FBRywwQkFBa0IsQ0FBQyxJQUFJLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztZQUNyRSxJQUFNLE9BQU8sR0FBRyxlQUFlLENBQUMsS0FBSyxDQUFDLGlCQUFpQixDQUFDLENBQUM7WUFDekQsSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRTtnQkFDM0IsTUFBTSxDQUFDLGtDQUFrQyxDQUFDLENBQUM7Z0JBQzNDLE9BQU87YUFDUjtZQUNELGNBQWM7WUFDZCxJQUFNLEdBQUcsR0FBRyxpQkFBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2xDLHNDQUFzQztZQUN0QyxJQUFJLEdBQUcsSUFBSSxLQUFLLEVBQUUsQ0FBQztZQUNuQixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztZQUNmLHFDQUFxQztZQUNyQyxxQkFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQztnQkFDdkIsSUFBSSxDQUFDLFdBQVc7b0JBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2xDLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxFQUNEO1lBQ0UsRUFBRSxFQUFFLHVCQUF1QjtTQUM1QixDQUNGLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRTtZQUNkLFdBQVcsR0FBRyxJQUFJLENBQUM7UUFDckIsQ0FBQyxDQUFDLENBQUM7UUFDSCxPQUFPLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUN0QixPQUFPLE9BQU8sQ0FBQztJQUNqQixDQUFDO0lBQ0QsT0FBUyxxQkFBcUIsQ0FBQyJ9