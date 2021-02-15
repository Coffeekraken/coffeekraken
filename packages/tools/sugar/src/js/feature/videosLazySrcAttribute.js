// @ts-nocheck
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
    var whenInViewport_1 = __importDefault(require("../dom/whenInViewport"));
    var querySelectorLive_1 = __importDefault(require("../dom/querySelectorLive"));
    /**
     * @name 		videoLazySrcAttribute
     * @namespace           sugar.js.feature
     * @type      Feature
     * @stable
     *
     * Add support for the `lazy-src` attribute on `video` elements.
     * The video `src` attribute will be populated when the `video` element enter the viewport
     *
     * @param       {Object}        [settings={}]         An object of settings to configure your feature
     *
     * @setting       {Number}      [offset=50]         The offset before entering in the viewport to set the "src" attribute
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
    function videoLazySrcAttribute(settings) {
        if (settings === void 0) { settings = {}; }
        settings = __assign({ offset: 50 }, settings);
        querySelectorLive_1.default('video[lazy-src]:not([is])', function ($videoElm) {
            whenInViewport_1.default($videoElm, settings.offset).then(function () {
                $videoElm.setAttribute('src', $videoElm.getAttribute('lazy-src'));
            });
        });
    }
    exports.default = videoLazySrcAttribute;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlkZW9zTGF6eVNyY0F0dHJpYnV0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInZpZGVvc0xhenlTcmNBdHRyaWJ1dGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFZCx5RUFBbUQ7SUFDbkQsK0VBQXlEO0lBRXpEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BeUJHO0lBQ0gsU0FBUyxxQkFBcUIsQ0FBQyxRQUFhO1FBQWIseUJBQUEsRUFBQSxhQUFhO1FBQzFDLFFBQVEsY0FDTixNQUFNLEVBQUUsRUFBRSxJQUNQLFFBQVEsQ0FDWixDQUFDO1FBQ0YsMkJBQWlCLENBQUMsMkJBQTJCLEVBQUUsVUFBQyxTQUFTO1lBQ3ZELHdCQUFjLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUM7Z0JBQzlDLFNBQVMsQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLFNBQVMsQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUNwRSxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUNELGtCQUFlLHFCQUFxQixDQUFDIn0=