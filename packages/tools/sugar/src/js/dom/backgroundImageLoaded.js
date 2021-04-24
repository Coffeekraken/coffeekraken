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
     * @namespace            js.dom
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFja2dyb3VuZEltYWdlTG9hZGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYmFja2dyb3VuZEltYWdlTG9hZGVkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7OztJQUVkLHdFQUFvRDtJQUNwRCw4REFBMEM7SUFDMUMsd0VBQW9EO0lBQ3BELHNFQUFpRDtJQUVqRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0F1Qkc7SUFDSCxTQUFTLHFCQUFxQixDQUFDLElBQUk7UUFDakMsSUFBSSxXQUFXLEdBQUcsS0FBSyxFQUNyQixJQUFJLENBQUM7UUFDUCxJQUFNLE9BQU8sR0FBRyxJQUFJLG1CQUFVLENBQzVCLFVBQUMsRUFBeUI7Z0JBQXZCLE9BQU8sYUFBQSxFQUFFLE1BQU0sWUFBQSxFQUFFLElBQUksVUFBQTtZQUN0Qix3REFBd0Q7WUFDeEQsSUFBTSxlQUFlLEdBQUcsMEJBQWtCLENBQUMsSUFBSSxFQUFFLGtCQUFrQixDQUFDLENBQUM7WUFDckUsSUFBTSxPQUFPLEdBQUcsZUFBZSxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1lBQ3pELElBQUksQ0FBQyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQzNCLE1BQU0sQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDO2dCQUMzQyxPQUFPO2FBQ1I7WUFDRCxjQUFjO1lBQ2QsSUFBTSxHQUFHLEdBQUcsaUJBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNsQyxzQ0FBc0M7WUFDdEMsSUFBSSxHQUFHLElBQUksS0FBSyxFQUFFLENBQUM7WUFDbkIsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7WUFDZixxQ0FBcUM7WUFDckMscUJBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUM7Z0JBQ3ZCLElBQUksQ0FBQyxXQUFXO29CQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNsQyxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsRUFDRDtZQUNFLEVBQUUsRUFBRSx1QkFBdUI7U0FDNUIsQ0FDRixDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUU7WUFDZCxXQUFXLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDdEIsT0FBTyxPQUFPLENBQUM7SUFDakIsQ0FBQztJQUNELGtCQUFlLHFCQUFxQixDQUFDIn0=