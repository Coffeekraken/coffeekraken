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
        var promise = new SPromise_1.default(function (resolve, reject, trigger, cancel) {
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
//# sourceMappingURL=module.js.map