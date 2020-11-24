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
        define(["require", "exports", "../dom/whenInViewport", "../dom/querySelectorLive", "../object/deepMerge"], factory);
    }
})(function (require, exports) {
    "use strict";
    var whenInViewport_1 = __importDefault(require("../dom/whenInViewport"));
    var querySelectorLive_1 = __importDefault(require("../dom/querySelectorLive"));
    var deepMerge_2 = __importDefault(require("../object/deepMerge"));
    /**
     * @name 		imagesLazySrcAttribute
     * @namespace           sugar.js.feature
     * @type      Feature
     * @stable
     *
     * Add support for the `lazy-src` attribute on `img` elements.
     * The video `src` attribute will be populated when the `img` element enter the viewport
     *
     * @param       {Object}        [settings={}]         An object of settings to configure your feature
     *
     * @setting       {Number}      [offset=50]         The offset before entering in the viewport to set the "src" attribute
     *
     * @todo            interface
     * @todo            doc
     * @todo            tests
     *
     * @example       js
     * import imagesLazySrcAttribute from '@coffeekraken/sugar/js/feature/imagesLazySrcAttribute';
     * imagesLazySrcAttribute();
     *
     * @example    html
     * <img lazy-src="my-cool-image.jpg" />
     *
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function imagesLazySrcAttribute(settings) {
        if (settings === void 0) { settings = {}; }
        settings = deepMerge_2.default({
            offset: 50
        }, settings);
        querySelectorLive_1.default('img[lazy-src]:not([is])', function ($imgElm) {
            whenInViewport_1.default($imgElm, settings.offset).then(function () {
                $imgElm.setAttribute('src', $imgElm.getAttribute('lazy-src'));
            });
        });
    }
    return imagesLazySrcAttribute;
});
