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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2VzTG9hZGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvdG9vbHMvc3VnYXIvc3JjL2pzL2RvbS9pbWFnZXNMb2FkZWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7O0lBRWQsZ0VBQTBDO0lBQzFDLHdFQUFpRDtJQUVqRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0E2Qkc7SUFDSCxTQUFTLFlBQVksQ0FBQyxLQUFLO1FBQ3pCLE9BQU8sSUFBSSxtQkFBVSxDQUFDLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7WUFDbEQsTUFBTSxRQUFRLEdBQUcsRUFBRSxFQUNqQixZQUFZLEdBQUcsRUFBRSxDQUFDO1lBQ3BCLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7Z0JBQ2pDLFFBQVEsQ0FBQyxJQUFJLENBQ1gscUJBQWEsQ0FBQyxJQUFJLENBQUM7cUJBQ2hCLElBQUksQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO29CQUNkLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQ3pCLElBQUksQ0FBQyxZQUFZLEVBQUUsS0FBSyxDQUFDLENBQUM7b0JBQzFCLElBQUksWUFBWSxDQUFDLE1BQU0sS0FBSyxLQUFLLENBQUMsTUFBTSxFQUFFO3dCQUN4QyxJQUFJLENBQUMsUUFBUSxFQUFFLFlBQVksQ0FBQyxDQUFDO3dCQUM3QixPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7cUJBQ3ZCO2dCQUNILENBQUMsQ0FBQztxQkFDRCxLQUFLLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtvQkFDZixNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ2hCLENBQUMsQ0FBQyxDQUNMLENBQUM7WUFDSixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUNELGtCQUFlLFlBQVksQ0FBQyJ9