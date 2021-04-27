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
    const getStyleProperty_1 = __importDefault(require("./getStyleProperty"));
    const imageLoaded_1 = __importDefault(require("./imageLoaded"));
    const unquote_1 = __importDefault(require("../../shared/string/unquote"));
    const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
    console.log('ff');
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
        let isCancelled = false, $img;
        const promise = new s_promise_1.default(({ resolve, reject, emit }) => {
            // get the background-image property from computed style
            const backgroundImage = getStyleProperty_1.default($elm, 'background-image');
            const matches = backgroundImage.match(/.*url\((.*)\).*/);
            if (!matches || !matches[1]) {
                reject('No background image url found...');
                return;
            }
            // process url
            const url = unquote_1.default(matches[1]);
            // make a new image with the image set
            $img = new Image();
            $img.src = url;
            // return the promise of image loaded
            imageLoaded_1.default($img).then(() => {
                if (!isCancelled)
                    resolve($elm);
            });
        }, {
            id: 'backgroundImageLoaded'
        }).on('finally', () => {
            isCancelled = true;
        });
        promise.__$img = $img;
        return promise;
    }
    exports.default = backgroundImageLoaded;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFja2dyb3VuZEltYWdlTG9hZGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYmFja2dyb3VuZEltYWdlTG9hZGVkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7OztJQUVkLDBFQUFvRDtJQUNwRCxnRUFBMEM7SUFDMUMsMEVBQW9EO0lBQ3BELHdFQUFpRDtJQUNqRCxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2xCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXVCRztJQUNILFNBQVMscUJBQXFCLENBQUMsSUFBSTtRQUNqQyxJQUFJLFdBQVcsR0FBRyxLQUFLLEVBQ3JCLElBQUksQ0FBQztRQUNQLE1BQU0sT0FBTyxHQUFHLElBQUksbUJBQVUsQ0FDNUIsQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtZQUM1Qix3REFBd0Q7WUFDeEQsTUFBTSxlQUFlLEdBQUcsMEJBQWtCLENBQUMsSUFBSSxFQUFFLGtCQUFrQixDQUFDLENBQUM7WUFDckUsTUFBTSxPQUFPLEdBQUcsZUFBZSxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1lBQ3pELElBQUksQ0FBQyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQzNCLE1BQU0sQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDO2dCQUMzQyxPQUFPO2FBQ1I7WUFDRCxjQUFjO1lBQ2QsTUFBTSxHQUFHLEdBQUcsaUJBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNsQyxzQ0FBc0M7WUFDdEMsSUFBSSxHQUFHLElBQUksS0FBSyxFQUFFLENBQUM7WUFDbkIsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7WUFDZixxQ0FBcUM7WUFDckMscUJBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO2dCQUM1QixJQUFJLENBQUMsV0FBVztvQkFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbEMsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLEVBQ0Q7WUFDRSxFQUFFLEVBQUUsdUJBQXVCO1NBQzVCLENBQ0YsQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLEdBQUcsRUFBRTtZQUNuQixXQUFXLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDdEIsT0FBTyxPQUFPLENBQUM7SUFDakIsQ0FBQztJQUNELGtCQUFlLHFCQUFxQixDQUFDIn0=