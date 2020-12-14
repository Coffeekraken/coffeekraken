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
        define(["require", "exports", "../dom/querySelectorLive", "../dom/scrollTo", "../easing/easeInOutQuint"], factory);
    }
})(function (require, exports) {
    "use strict";
    var querySelectorLive_1 = __importDefault(require("../dom/querySelectorLive"));
    var scrollTo_1 = __importDefault(require("../dom/scrollTo"));
    var easeInOutQuint_1 = __importDefault(require("../easing/easeInOutQuint"));
    /**
     * @name 		linksScrollHrefAttribute
     * @namespace           sugar.js.feature
     * @type      Feature
     * @stable
     *
     * Add the ability to set links href attribute with "scroll:#target" in order to animate the scroll to this target element
     *
     * @param       {Object}        [settings={}]         An object of settings to configure your feature
     *
     * @setting       {Number}       [duration=400]       Specify the scroll duration
     * @setting       {Function}      [easing=easeInOutQuint]     Specify the easing function to use
     *
     * @todo        interface
     * @todo        doc
     * @todo        tests
     *
     * @example     js
     * import linksScrollHrefAttribute from '@coffeekraken/sugar/js/feature/linksScrollHrefAttribute';
     * linksScrollHrefAttribute();
     *
     * @example 	html
     * <a scroll href="#my-cool-element-id">Scroll to</a>
     *
     * @since         1.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function linksScrollHrefAttribute(settings) {
        if (settings === void 0) { settings = {}; }
        settings = __assign({ duration: 400, easing: easeInOutQuint_1.default }, settings);
        querySelectorLive_1.default('[href^="#"][scroll]', function ($scrollElm) {
            $scrollElm.addEventListener('click', function (e) {
                e.preventDefault();
                var $target = document.querySelector("" + $scrollElm.getAttribute('href'));
                if (!$target)
                    return;
                scrollTo_1.default($target, settings.duration, settings.easing);
            });
        });
    }
    return linksScrollHrefAttribute;
});
//# sourceMappingURL=module.js.map