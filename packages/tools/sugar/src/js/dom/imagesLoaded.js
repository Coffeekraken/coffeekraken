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
        return new SPromise_1.default(function (_a) {
            var resolve = _a.resolve, reject = _a.reject, emit = _a.emit;
            var promises = [], loadedImages = [];
            Array.from($imgs).forEach(function ($img) {
                promises.push(imageLoaded_1.default($img)
                    .then(function (_$img) {
                    loadedImages.push(_$img);
                    emit('img.loaded', _$img);
                    if (loadedImages.length === $imgs.length) {
                        emit('loaded', loadedImages);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2VzTG9hZGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaW1hZ2VzTG9hZGVkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7O0lBRWQsOERBQTBDO0lBQzFDLGlFQUE2QztJQUU3Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0E2Qkc7SUFDSCxTQUFTLFlBQVksQ0FBQyxLQUFLO1FBQ3pCLE9BQU8sSUFBSSxrQkFBVSxDQUFDLFVBQUMsRUFBeUI7Z0JBQXZCLE9BQU8sYUFBQSxFQUFFLE1BQU0sWUFBQSxFQUFFLElBQUksVUFBQTtZQUM1QyxJQUFNLFFBQVEsR0FBRyxFQUFFLEVBQ2pCLFlBQVksR0FBRyxFQUFFLENBQUM7WUFDcEIsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQyxJQUFJO2dCQUM3QixRQUFRLENBQUMsSUFBSSxDQUNYLHFCQUFhLENBQUMsSUFBSSxDQUFDO3FCQUNoQixJQUFJLENBQUMsVUFBQyxLQUFLO29CQUNWLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQ3pCLElBQUksQ0FBQyxZQUFZLEVBQUUsS0FBSyxDQUFDLENBQUM7b0JBQzFCLElBQUksWUFBWSxDQUFDLE1BQU0sS0FBSyxLQUFLLENBQUMsTUFBTSxFQUFFO3dCQUN4QyxJQUFJLENBQUMsUUFBUSxFQUFFLFlBQVksQ0FBQyxDQUFDO3dCQUM3QixPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7cUJBQ3ZCO2dCQUNILENBQUMsQ0FBQztxQkFDRCxLQUFLLENBQUMsVUFBQyxLQUFLO29CQUNYLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDaEIsQ0FBQyxDQUFDLENBQ0wsQ0FBQztZQUNKLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBQ0QsT0FBUyxZQUFZLENBQUMifQ==