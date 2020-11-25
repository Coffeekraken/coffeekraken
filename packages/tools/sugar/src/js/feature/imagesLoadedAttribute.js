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
        define(["require", "exports", "../dom/imageLoaded", "../object/deepMerge"], factory);
    }
})(function (require, exports) {
    "use strict";
    var imageLoaded_1 = __importDefault(require("../dom/imageLoaded"));
    var deepMerge_1 = __importDefault(require("../object/deepMerge"));
    /**
     * @name 		imagesLoadedAttribute
     * @namespace           sugar.js.feature
     * @type      Feature
     * @stable
     *
     * Add on every images the attribute "loaded" when it has been fully loaded. This is useful
     * for styling purposes and for others thinks as well.
     *
     * @param     {Object}        [settings={}]       An object of settings to configure your feature
     *
     * @todo            interface
     * @todo            doc
     * @todo            tests
     *
     * @example 	js
     * import imagesLoadedAttribute from '@coffeekraken/sugar/js/feature/imagesLoadedAttribute';
     * imagesLoadedAttribute();
     *
     * @since         1.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function imagesLoadedAttribute(settings) {
        if (settings === void 0) { settings = {}; }
        settings = deepMerge_1.default({}, settings);
        document.addEventListener('load', function (e) {
            if (!e.target.tagName)
                return;
            if (e.target.tagName.toLowerCase() !== 'img')
                return;
            if (e.target.hasAttribute('loaded'))
                return;
            e.target.setAttribute('loaded', true);
        }, true);
        [].forEach.call(document.querySelectorAll('img'), function (img) {
            imageLoaded_1.default(img).then(function (img) {
                if (img.hasAttribute('loaded'))
                    return;
                img.setAttribute('loaded', true);
            });
        });
    }
    return imagesLoadedAttribute;
});
