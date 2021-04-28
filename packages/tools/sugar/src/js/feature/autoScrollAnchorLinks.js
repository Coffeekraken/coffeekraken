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
    const easeInOutQuint_1 = __importDefault(require("../../shared/easing/easeInOutQuint"));
    const querySelectorLive_1 = __importDefault(require("./querySelectorLive"));
    const url_parse_1 = __importDefault(require("url-parse"));
    const scrollTo_1 = __importDefault(require("./scrollTo"));
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
    function autoScrollAnchorLinks(duration = 500, offset = 0, easing = easeInOutQuint_1.default, checkPathnames = true) {
        querySelectorLive_1.default('a:not([is])[href*="#"]', ($link) => {
            // listen for click
            $link.addEventListener('click', (e) => {
                // get the hash
                const linkUrl = url_parse_1.default($link.getAttribute('href'));
                const currentUrl = url_parse_1.default();
                // chack that we have an hash
                if (!linkUrl.hash || linkUrl.hash === '#')
                    return;
                // if it's not the same pathname between the current url and the link one,
                // we do nothing and we let the link behave as he want
                if (checkPathnames && currentUrl.pathname !== linkUrl.pathname)
                    return;
                // try to get the target from the hash
                const $target = document.querySelector(linkUrl.hash);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b1Njcm9sbEFuY2hvckxpbmtzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvdG9vbHMvc3VnYXIvc3JjL2pzL2ZlYXR1cmUvYXV0b1Njcm9sbEFuY2hvckxpbmtzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7OztJQUVkLHdGQUEwRDtJQUMxRCw0RUFBb0Q7SUFDcEQsMERBQWlDO0lBQ2pDLDBEQUFrQztJQUVsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0F1Qkc7SUFDSCxTQUFTLHFCQUFxQixDQUM1QixRQUFRLEdBQUcsR0FBRyxFQUNkLE1BQU0sR0FBRyxDQUFDLEVBQ1YsTUFBTSxHQUFHLHdCQUFRLEVBQ2pCLGNBQWMsR0FBRyxJQUFJO1FBRXJCLDJCQUFpQixDQUFDLHdCQUF3QixFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDcEQsbUJBQW1CO1lBQ25CLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtnQkFDcEMsZUFBZTtnQkFDZixNQUFNLE9BQU8sR0FBRyxtQkFBUSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDckQsTUFBTSxVQUFVLEdBQUcsbUJBQVEsRUFBRSxDQUFDO2dCQUU5Qiw2QkFBNkI7Z0JBQzdCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxJQUFJLE9BQU8sQ0FBQyxJQUFJLEtBQUssR0FBRztvQkFBRSxPQUFPO2dCQUVsRCwwRUFBMEU7Z0JBQzFFLHNEQUFzRDtnQkFDdEQsSUFBSSxjQUFjLElBQUksVUFBVSxDQUFDLFFBQVEsS0FBSyxPQUFPLENBQUMsUUFBUTtvQkFBRSxPQUFPO2dCQUV2RSxzQ0FBc0M7Z0JBQ3RDLE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUVyRCwrREFBK0Q7Z0JBQy9ELElBQUksQ0FBQyxPQUFPO29CQUFFLE9BQU87Z0JBRXJCLDRDQUE0QztnQkFDNUMsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO2dCQUVuQiw0Q0FBNEM7Z0JBQzVDLE9BQU8sQ0FBQyxTQUFTLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBRTFDLG9EQUFvRDtnQkFDcEQsa0JBQVEsQ0FBQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sSUFBSSx3QkFBUSxFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztZQUNqRSxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUNELGtCQUFlLHFCQUFxQixDQUFDIn0=