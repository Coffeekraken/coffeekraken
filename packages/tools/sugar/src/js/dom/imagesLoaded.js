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
        define(["require", "exports", "./imageLoaded", "@coffeekraken/s-promise"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const imageLoaded_1 = __importDefault(require("./imageLoaded"));
    const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
    /**
     * @name      imagesLoaded
     * @namespace            js.dom
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
        return new s_promise_1.default(({ resolve, reject, emit }) => {
            const promises = [], loadedImages = [];
            Array.from($imgs).forEach(($img) => {
                promises.push(imageLoaded_1.default($img)
                    .then((_$img) => {
                    loadedImages.push(_$img);
                    emit('img.loaded', _$img);
                    if (loadedImages.length === $imgs.length) {
                        emit('loaded', loadedImages);
                        resolve(loadedImages);
                    }
                })
                    .catch((error) => {
                    reject(error);
                }));
            });
        });
    }
    exports.default = imagesLoaded;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2VzTG9hZGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaW1hZ2VzTG9hZGVkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7OztJQUVkLGdFQUEwQztJQUMxQyx3RUFBaUQ7SUFFakQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BNkJHO0lBQ0gsU0FBUyxZQUFZLENBQUMsS0FBSztRQUN6QixPQUFPLElBQUksbUJBQVUsQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1lBQ2xELE1BQU0sUUFBUSxHQUFHLEVBQUUsRUFDakIsWUFBWSxHQUFHLEVBQUUsQ0FBQztZQUNwQixLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO2dCQUNqQyxRQUFRLENBQUMsSUFBSSxDQUNYLHFCQUFhLENBQUMsSUFBSSxDQUFDO3FCQUNoQixJQUFJLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtvQkFDZCxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUN6QixJQUFJLENBQUMsWUFBWSxFQUFFLEtBQUssQ0FBQyxDQUFDO29CQUMxQixJQUFJLFlBQVksQ0FBQyxNQUFNLEtBQUssS0FBSyxDQUFDLE1BQU0sRUFBRTt3QkFDeEMsSUFBSSxDQUFDLFFBQVEsRUFBRSxZQUFZLENBQUMsQ0FBQzt3QkFDN0IsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO3FCQUN2QjtnQkFDSCxDQUFDLENBQUM7cUJBQ0QsS0FBSyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7b0JBQ2YsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNoQixDQUFDLENBQUMsQ0FDTCxDQUFDO1lBQ0osQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFDRCxrQkFBZSxZQUFZLENBQUMifQ==