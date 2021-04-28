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
        define(["require", "exports", "../dom/whenInViewport", "../dom/querySelectorLive"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const whenInViewport_1 = __importDefault(require("../dom/whenInViewport"));
    const querySelectorLive_1 = __importDefault(require("../dom/querySelectorLive"));
    /**
     * @name 		videoLazySrcAttribute
     * @namespace            js.feature
     * @type      Feature
     * @stable
     *
     * Add support for the `lazy-src` attribute on `video` elements.
     * The video `src` attribute will be populated when the `video` element enter the viewport
     *
     * @param       {Object}        [settings={}]         An object of settings to configure your feature
     *
     * @setting       {Number}      [offset=50]         The offset before entering in the viewport to set the "src" attribute
     *
     * @todo            interface
     * @todo            doc
     * @todo            tests
     *
     * @example     js
     * import videoLazySrcAttribute from '@coffeekraken/sugar/js/feature/videoLazySrcAttribute';
     * videoLazySrcAttribute();
     *
     * @example    html
     * <video lazy-src="my-cool-video.mp4"></video>
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function videoLazySrcAttribute(settings = {}) {
        settings = Object.assign({ offset: 50 }, settings);
        querySelectorLive_1.default('video[lazy-src]:not([is])', ($videoElm) => {
            whenInViewport_1.default($videoElm, settings.offset).then(() => {
                $videoElm.setAttribute('src', $videoElm.getAttribute('lazy-src'));
            });
        });
    }
    exports.default = videoLazySrcAttribute;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlkZW9zTGF6eVNyY0F0dHJpYnV0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3Rvb2xzL3N1Z2FyL3NyYy9qcy9mZWF0dXJlL3ZpZGVvc0xhenlTcmNBdHRyaWJ1dGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7O0lBRWQsMkVBQW1EO0lBQ25ELGlGQUF5RDtJQUV6RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXlCRztJQUNILFNBQVMscUJBQXFCLENBQUMsUUFBUSxHQUFHLEVBQUU7UUFDMUMsUUFBUSxtQkFDTixNQUFNLEVBQUUsRUFBRSxJQUNQLFFBQVEsQ0FDWixDQUFDO1FBQ0YsMkJBQWlCLENBQUMsMkJBQTJCLEVBQUUsQ0FBQyxTQUFTLEVBQUUsRUFBRTtZQUMzRCx3QkFBYyxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtnQkFDbkQsU0FBUyxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsU0FBUyxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQ3BFLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBQ0Qsa0JBQWUscUJBQXFCLENBQUMifQ==