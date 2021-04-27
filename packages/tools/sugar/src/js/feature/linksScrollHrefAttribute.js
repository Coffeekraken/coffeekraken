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
        define(["require", "exports", "../dom/querySelectorLive", "../dom/scrollTo", "../../shared/easing/easeInOutQuint"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const querySelectorLive_1 = __importDefault(require("../dom/querySelectorLive"));
    const scrollTo_1 = __importDefault(require("../dom/scrollTo"));
    const easeInOutQuint_1 = __importDefault(require("../../shared/easing/easeInOutQuint"));
    /**
     * @name 		linksScrollHrefAttribute
     * @namespace            js.feature
     * @type      Feature
     * @stable
     *
     * Add the ability to set links href attribute with "scroll:#target" in order to animate the scroll to this target element
     *
     * @param       {Object}        [settings={}]         An object of settings to configure your feature
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
    function linksScrollHrefAttribute(settings = {}) {
        settings = Object.assign({ duration: 400, easing: easeInOutQuint_1.default }, settings);
        querySelectorLive_1.default('[href^="#"][scroll]', ($scrollElm) => {
            $scrollElm.addEventListener('click', (e) => {
                e.preventDefault();
                const $target = document.querySelector(`${$scrollElm.getAttribute('href')}`);
                if (!$target)
                    return;
                scrollTo_1.default($target, settings.duration, settings.easing);
            });
        });
    }
    exports.default = linksScrollHrefAttribute;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlua3NTY3JvbGxIcmVmQXR0cmlidXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibGlua3NTY3JvbGxIcmVmQXR0cmlidXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7OztJQUVkLGlGQUF5RDtJQUN6RCwrREFBdUM7SUFDdkMsd0ZBQWdFO0lBRWhFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQTBCRztJQUNILFNBQVMsd0JBQXdCLENBQUMsUUFBUSxHQUFHLEVBQUU7UUFDN0MsUUFBUSxtQkFDTixRQUFRLEVBQUUsR0FBRyxFQUNiLE1BQU0sRUFBRSx3QkFBYyxJQUNuQixRQUFRLENBQ1osQ0FBQztRQUNGLDJCQUFpQixDQUFDLHFCQUFxQixFQUFFLENBQUMsVUFBVSxFQUFFLEVBQUU7WUFDdEQsVUFBVSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO2dCQUN6QyxDQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7Z0JBQ25CLE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQ3BDLEdBQUcsVUFBVSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUNyQyxDQUFDO2dCQUNGLElBQUksQ0FBQyxPQUFPO29CQUFFLE9BQU87Z0JBQ3JCLGtCQUFRLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3hELENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBQ0Qsa0JBQWUsd0JBQXdCLENBQUMifQ==