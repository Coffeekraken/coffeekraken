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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b1Njcm9sbEFuY2hvckxpbmtzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXV0b1Njcm9sbEFuY2hvckxpbmtzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7O0lBRWQsNEVBQWdEO0lBQ2hELDBFQUFvRDtJQUNwRCx3REFBaUM7SUFDakMsd0RBQWtDO0lBRWxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXVCRztJQUNILFNBQVMscUJBQXFCLENBQzVCLFFBQWMsRUFDZCxNQUFVLEVBQ1YsTUFBaUIsRUFDakIsY0FBcUI7UUFIckIseUJBQUEsRUFBQSxjQUFjO1FBQ2QsdUJBQUEsRUFBQSxVQUFVO1FBQ1YsdUJBQUEsRUFBQSxTQUFTLHdCQUFRO1FBQ2pCLCtCQUFBLEVBQUEscUJBQXFCO1FBRXJCLDJCQUFpQixDQUFDLHdCQUF3QixFQUFFLFVBQUMsS0FBSztZQUNoRCxtQkFBbUI7WUFDbkIsS0FBSyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxVQUFDLENBQUM7Z0JBQ2hDLGVBQWU7Z0JBQ2YsSUFBTSxPQUFPLEdBQUcsbUJBQVEsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQ3JELElBQU0sVUFBVSxHQUFHLG1CQUFRLEVBQUUsQ0FBQztnQkFFOUIsNkJBQTZCO2dCQUM3QixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksSUFBSSxPQUFPLENBQUMsSUFBSSxLQUFLLEdBQUc7b0JBQUUsT0FBTztnQkFFbEQsMEVBQTBFO2dCQUMxRSxzREFBc0Q7Z0JBQ3RELElBQUksY0FBYyxJQUFJLFVBQVUsQ0FBQyxRQUFRLEtBQUssT0FBTyxDQUFDLFFBQVE7b0JBQUUsT0FBTztnQkFFdkUsc0NBQXNDO2dCQUN0QyxJQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFFckQsK0RBQStEO2dCQUMvRCxJQUFJLENBQUMsT0FBTztvQkFBRSxPQUFPO2dCQUVyQiw0Q0FBNEM7Z0JBQzVDLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFFbkIsNENBQTRDO2dCQUM1QyxPQUFPLENBQUMsU0FBUyxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUUxQyxvREFBb0Q7Z0JBQ3BELGtCQUFRLENBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLElBQUksd0JBQVEsRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDakUsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFDRCxPQUFTLHFCQUFxQixDQUFDIn0=