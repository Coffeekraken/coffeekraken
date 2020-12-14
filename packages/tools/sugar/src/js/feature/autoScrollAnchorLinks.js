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
        define(["require", "exports", "../easing/easeInOutQuint", "./querySelectorLive", "url-parse", "./scrollTo"], factory);
    }
})(function (require, exports) {
    "use strict";
    var easeInOutQuint_1 = __importDefault(require("../easing/easeInOutQuint"));
    var querySelectorLive_1 = __importDefault(require("./querySelectorLive"));
    var url_parse_1 = __importDefault(require("url-parse"));
    var scrollTo_1 = __importDefault(require("./scrollTo"));
    /**
     * @name        autoScrollAnchorLinks
     * @namespace           sugar.js.feature
     * @type      Function
     * @stable
     *
     * Listen for links contains an hash to init them for scroll to target on click
     *
     * @param    {Integer}    [duration=500]    The scroll duration in ms
     * @param    {Integer}    [offset=0]    A scroll offset to apply
     * @param    {Function}    [easing=__easing]    An easing function used to scroll
     * @param    {Boolean}    [checkPathnames=true]    Specify if need to check the pathnames correspondance or not
     *
     * @todo            interface
     * @todo            doc
     * @todo            tests
     *
     * @example    js
     * import autoScrollAnchorLinks from '@coffeekraken/sugar/js/autoScrollAnchorLinks'
     * autoScrollAnchorLinks()
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function autoScrollAnchorLinks(duration, offset, easing, checkPathnames) {
        if (duration === void 0) { duration = 500; }
        if (offset === void 0) { offset = 0; }
        if (easing === void 0) { easing = easeInOutQuint_1.default; }
        if (checkPathnames === void 0) { checkPathnames = true; }
        querySelectorLive_1.default('a:not([is])[href*="#"]', function ($link) {
            // listen for click
            $link.addEventListener('click', function (e) {
                // get the hash
                var linkUrl = url_parse_1.default($link.getAttribute('href'));
                var currentUrl = url_parse_1.default();
                // chack that we have an hash
                if (!linkUrl.hash || linkUrl.hash === '#')
                    return;
                // if it's not the same pathname between the current url and the link one,
                // we do nothing and we let the link behave as he want
                if (checkPathnames && currentUrl.pathname !== linkUrl.pathname)
                    return;
                // try to get the target from the hash
                var $target = document.querySelector(linkUrl.hash);
                // if we don't have any target, let the link behave as he wants
                if (!$target)
                    return;
                // preventing the link to behave as he wants
                e.preventDefault();
                // append the hash to the history in the url
                history.pushState({}, null, linkUrl.hash);
                // all seems to be good, we can scroll to the target
                scrollTo_1.default($target, duration, easing || easeInOutQuint_1.default, offset, 'top');
            });
        });
    }
    return autoScrollAnchorLinks;
});
//# sourceMappingURL=module.js.map