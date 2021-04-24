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
        define(["require", "exports", "../../shared/easing/easeInOutQuint", "./querySelectorLive", "url-parse", "./scrollTo"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var easeInOutQuint_1 = __importDefault(require("../../shared/easing/easeInOutQuint"));
    var querySelectorLive_1 = __importDefault(require("./querySelectorLive"));
    var url_parse_1 = __importDefault(require("url-parse"));
    var scrollTo_1 = __importDefault(require("./scrollTo"));
    /**
     * @name        autoScrollAnchorLinks
     * @namespace            js.feature
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
    exports.default = autoScrollAnchorLinks;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b1Njcm9sbEFuY2hvckxpbmtzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXV0b1Njcm9sbEFuY2hvckxpbmtzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7OztJQUVkLHNGQUEwRDtJQUMxRCwwRUFBb0Q7SUFDcEQsd0RBQWlDO0lBQ2pDLHdEQUFrQztJQUVsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0F1Qkc7SUFDSCxTQUFTLHFCQUFxQixDQUM1QixRQUFjLEVBQ2QsTUFBVSxFQUNWLE1BQWlCLEVBQ2pCLGNBQXFCO1FBSHJCLHlCQUFBLEVBQUEsY0FBYztRQUNkLHVCQUFBLEVBQUEsVUFBVTtRQUNWLHVCQUFBLEVBQUEsU0FBUyx3QkFBUTtRQUNqQiwrQkFBQSxFQUFBLHFCQUFxQjtRQUVyQiwyQkFBaUIsQ0FBQyx3QkFBd0IsRUFBRSxVQUFDLEtBQUs7WUFDaEQsbUJBQW1CO1lBQ25CLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsVUFBQyxDQUFDO2dCQUNoQyxlQUFlO2dCQUNmLElBQU0sT0FBTyxHQUFHLG1CQUFRLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUNyRCxJQUFNLFVBQVUsR0FBRyxtQkFBUSxFQUFFLENBQUM7Z0JBRTlCLDZCQUE2QjtnQkFDN0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUksT0FBTyxDQUFDLElBQUksS0FBSyxHQUFHO29CQUFFLE9BQU87Z0JBRWxELDBFQUEwRTtnQkFDMUUsc0RBQXNEO2dCQUN0RCxJQUFJLGNBQWMsSUFBSSxVQUFVLENBQUMsUUFBUSxLQUFLLE9BQU8sQ0FBQyxRQUFRO29CQUFFLE9BQU87Z0JBRXZFLHNDQUFzQztnQkFDdEMsSUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBRXJELCtEQUErRDtnQkFDL0QsSUFBSSxDQUFDLE9BQU87b0JBQUUsT0FBTztnQkFFckIsNENBQTRDO2dCQUM1QyxDQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7Z0JBRW5CLDRDQUE0QztnQkFDNUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFFMUMsb0RBQW9EO2dCQUNwRCxrQkFBUSxDQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxJQUFJLHdCQUFRLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ2pFLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBQ0Qsa0JBQWUscUJBQXFCLENBQUMifQ==