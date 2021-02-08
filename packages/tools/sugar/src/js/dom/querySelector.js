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
        define(["require", "exports", "./isVisible", "./isInViewport", "./closestNotVisible"], factory);
    }
})(function (require, exports) {
    "use strict";
    var isVisible_1 = __importDefault(require("./isVisible"));
    var isInViewport_1 = __importDefault(require("./isInViewport"));
    var closestNotVisible_1 = __importDefault(require("./closestNotVisible"));
    /**
     * @name      querySelector
     * @namespace           sugar.js.dom
     * @type      Function
     * @stable
     *
     * Enhanced proxy of the Element.querySelector function that let you specify
     * if you want an element that is visible, or even that is in the viewport
     *
     * @param 		{String} 			selector 			The css selector to search
     * @param 		{Object} 			settings	 		The settings of the query
     * @return 		{HTMLElement} 							The founded element
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example 	js
     * import querySelector from '@coffeekraken/sugar/js/dom/querySelector';
     * // simple query
     * const elm = querySelector('.a-cool-css-selector');
     *
     * // get an element that is in the viewport
     * const elm = querySelector('.a-cool-css-selector', {
     * 		inViewport : true
     * });
     *
     * @since         1.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    /**
     * If we want only a visible element
     * @setting
     * @name 		visible
     * @type 		{Boolean}
     * @default 	false
     */
    /**
     * If we want only an element that is in the viewport
     * @setting
     * @name 		inViewport
     * @type 		{Boolean}
     * @default 	false
     */
    /**
     * The root node to start the query from
     * @setting
     * @name 		rootNode
     * @type 		{HTMLElement}
     * @default 	document.body
     */
    function querySelector(selector, settings) {
        if (settings === void 0) { settings = {}; }
        // extend settings
        settings = __assign({ visible: null, inViewport: null, rootNode: document.body }, settings);
        // grab the element into the dom
        var elm = settings.rootNode.querySelector(selector);
        // if no element, stop here
        if (!elm)
            return null;
        // state tracking
        var isVisible = true;
        var isInViewport = true;
        // check settings
        if (settings.visible) {
            if (!isVisible_1.default(elm) || !closestNotVisible_1.default(elm))
                return null;
        }
        if (settings.inViewport) {
            if (!isInViewport_1.default(elm))
                return null;
        }
        // return the element
        return elm;
    }
    return querySelector;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnlTZWxlY3Rvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInF1ZXJ5U2VsZWN0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUVkLDBEQUFzQztJQUN0QyxnRUFBNEM7SUFDNUMsMEVBQXNEO0lBRXREOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQTZCRztJQUVIOzs7Ozs7T0FNRztJQUVIOzs7Ozs7T0FNRztJQUVIOzs7Ozs7T0FNRztJQUVILFNBQVMsYUFBYSxDQUFDLFFBQVEsRUFBRSxRQUFhO1FBQWIseUJBQUEsRUFBQSxhQUFhO1FBQzVDLGtCQUFrQjtRQUNsQixRQUFRLGNBQ04sT0FBTyxFQUFFLElBQUksRUFDYixVQUFVLEVBQUUsSUFBSSxFQUNoQixRQUFRLEVBQUUsUUFBUSxDQUFDLElBQUksSUFDcEIsUUFBUSxDQUNaLENBQUM7UUFFRixnQ0FBZ0M7UUFDaEMsSUFBTSxHQUFHLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDdEQsMkJBQTJCO1FBQzNCLElBQUksQ0FBQyxHQUFHO1lBQUUsT0FBTyxJQUFJLENBQUM7UUFFdEIsaUJBQWlCO1FBQ2pCLElBQU0sU0FBUyxHQUFHLElBQUksQ0FBQztRQUN2QixJQUFNLFlBQVksR0FBRyxJQUFJLENBQUM7UUFFMUIsaUJBQWlCO1FBQ2pCLElBQUksUUFBUSxDQUFDLE9BQU8sRUFBRTtZQUNwQixJQUFJLENBQUMsbUJBQVcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLDJCQUFtQixDQUFDLEdBQUcsQ0FBQztnQkFBRSxPQUFPLElBQUksQ0FBQztTQUNqRTtRQUNELElBQUksUUFBUSxDQUFDLFVBQVUsRUFBRTtZQUN2QixJQUFJLENBQUMsc0JBQWMsQ0FBQyxHQUFHLENBQUM7Z0JBQUUsT0FBTyxJQUFJLENBQUM7U0FDdkM7UUFFRCxxQkFBcUI7UUFDckIsT0FBTyxHQUFHLENBQUM7SUFDYixDQUFDO0lBQ0QsT0FBUyxhQUFhLENBQUMifQ==