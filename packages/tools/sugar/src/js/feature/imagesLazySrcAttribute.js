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
        define(["require", "exports", "../dom/whenInViewport", "../dom/querySelectorLive", "../../shared/object/deepMerge"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var whenInViewport_1 = __importDefault(require("../dom/whenInViewport"));
    var querySelectorLive_1 = __importDefault(require("../dom/querySelectorLive"));
    var deepMerge_1 = __importDefault(require("../../shared/object/deepMerge"));
    /**
     * @name 		imagesLazySrcAttribute
     * @namespace            js.feature
     * @type      Feature
     * @stable
     *
     * Add support for the `lazy-src` attribute on `img` elements.
     * The video `src` attribute will be populated when the `img` element enter the viewport
     *
     * @param       {Object}        [settings={}]         An object of settings to configure your feature
     *
     * @setting       {Number}      [offset=50]         The offset before entering in the viewport to set the "src" attribute
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
        settings = deepMerge_1.default({
            offset: 50
        }, settings);
        querySelectorLive_1.default('img[lazy-src]:not([is])', function ($imgElm) {
            whenInViewport_1.default($imgElm, settings.offset).then(function () {
                $imgElm.setAttribute('src', $imgElm.getAttribute('lazy-src'));
            });
        });
    }
    exports.default = imagesLazySrcAttribute;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2VzTGF6eVNyY0F0dHJpYnV0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImltYWdlc0xhenlTcmNBdHRyaWJ1dGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7O0lBRWQseUVBQW1EO0lBQ25ELCtFQUF5RDtJQUN6RCw0RUFBc0Q7SUFFdEQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BMEJHO0lBQ0gsU0FBUyxzQkFBc0IsQ0FBQyxRQUFhO1FBQWIseUJBQUEsRUFBQSxhQUFhO1FBQzNDLFFBQVEsR0FBRyxtQkFBUyxDQUNsQjtZQUNFLE1BQU0sRUFBRSxFQUFFO1NBQ1gsRUFDRCxRQUFRLENBQ1QsQ0FBQztRQUNGLDJCQUFpQixDQUFDLHlCQUF5QixFQUFFLFVBQUMsT0FBTztZQUNuRCx3QkFBYyxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDO2dCQUM1QyxPQUFPLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDaEUsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFDRCxrQkFBZSxzQkFBc0IsQ0FBQyJ9