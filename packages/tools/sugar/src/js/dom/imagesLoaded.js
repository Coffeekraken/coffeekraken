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
        define(["require", "exports", "./imageLoaded", "../promise/SPromise"], factory);
    }
})(function (require, exports) {
    "use strict";
    var imageLoaded_1 = __importDefault(require("./imageLoaded"));
    var SPromise_1 = __importDefault(require("../promise/SPromise"));
    /**
     * @name      imagesLoaded
     * @namespace           sugar.js.dom
     * @type      Function
     * @stable
     *
     * Detect when some images are loaded. This function take advantage of the SPromise class
     * and trigger an event called "img.loaded" that will be triggered on each loaded images and another called "loaded" once all the images are loaded.
     * See in the example bellow.
     *
     * @param    {Array<HTMLImageElement>}    $imgs    An array (or nodeList) of HTMLImageElement to detect the load
     * @return    {Promise}    A promise resolved when all images are loaded properly
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example    js
     * import imagesLoaded from '@coffeekraken/sugar/js/dom/imagesLoaded'
     * imagesLoaded([
     * 	$img1, $img2, $img3
     * ]).on('loaded', $img => {
     *    // do something with the loaded image
     * }).then(() => {
     *   // do something here
     * })
     *
     * @since       1.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function imagesLoaded($imgs) {
        return new SPromise_1.default(function (resolve, reject, trigger, promiseApi) {
            var promises = [], loadedImages = [];
            Array.from($imgs).forEach(function ($img) {
                promises.push(imageLoaded_1.default($img)
                    .then(function (_$img) {
                    loadedImages.push(_$img);
                    trigger('img.loaded', _$img);
                    if (loadedImages.length === $imgs.length) {
                        trigger('loaded', loadedImages);
                        resolve(loadedImages);
                    }
                })
                    .catch(function (error) {
                    reject(error);
                }));
            });
        });
    }
    return imagesLoaded;
});
//# sourceMappingURL=imagesLoaded.js.map