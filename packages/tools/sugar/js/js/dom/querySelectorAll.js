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
    Object.defineProperty(exports, "__esModule", { value: true });
    var isVisible_1 = __importDefault(require("./isVisible"));
    var isInViewport_1 = __importDefault(require("./isInViewport"));
    var closestNotVisible_1 = __importDefault(require("./closestNotVisible"));
    /**
     * @name      querySelectorAll
     * @namespace           sugar.js.dom
     * @type      Function
     * @stable
     *
     * Enhanced proxy of the Element.querySelectorAll function that let you specify
     * if you want elements that are visible, or even that are in the viewport
     *
     * @param 		{String} 				selector 			The css selector to search
     * @param 		{Object} 				settings	 		The settings of the query
     * @return 		{Array}<HTMLElement> 						The founded elements
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example 	js
     * import querySelectorAll from '@coffeekraken/sugar/js/dom/querySelectorAll';
     * // simple query
     * const elms = querySelectorAll('.a-cool-css-selector');
     *
     * // get elements that are in the viewport
     * const elms = querySelectorAll('.a-cool-css-selector', {
     * 		inViewport : true
     * });
     *
     * @since         1.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    /**
     * If we want only visible elements
     * @setting
     * @name 		visible
     * @type 		{Boolean}
     * @default 	false
     */
    /**
     * If we want only elements that are in the viewport
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
    function querySelectorAll(selector, settings) {
        if (settings === void 0) { settings = {}; }
        // extend settings
        settings = __assign({ visible: null, inViewport: null, rootNode: document.body }, settings);
        // results array
        var results = [];
        // grab the element into the dom
        var elms = settings.rootNode.querySelectorAll(selector);
        // loop on the found elements
        [].forEach.call(elms, function (elm) {
            // check settings
            if (settings.visible) {
                if (!isVisible_1.default(elm) || !closestNotVisible_1.default(elm))
                    return;
            }
            if (settings.inViewport) {
                if (!isInViewport_1.default(elm))
                    return;
            }
            // add the element to the result array
            results.push(elm);
        });
        // return the elements
        return results;
    }
    exports.default = querySelectorAll;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnlTZWxlY3RvckFsbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9qcy9kb20vcXVlcnlTZWxlY3RvckFsbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUVkLDBEQUFzQztJQUN0QyxnRUFBNEM7SUFDNUMsMEVBQXNEO0lBRXREOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQTZCRztJQUVIOzs7Ozs7T0FNRztJQUVIOzs7Ozs7T0FNRztJQUVIOzs7Ozs7T0FNRztJQUVILFNBQVMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLFFBQWE7UUFBYix5QkFBQSxFQUFBLGFBQWE7UUFDL0Msa0JBQWtCO1FBQ2xCLFFBQVEsY0FDTixPQUFPLEVBQUUsSUFBSSxFQUNiLFVBQVUsRUFBRSxJQUFJLEVBQ2hCLFFBQVEsRUFBRSxRQUFRLENBQUMsSUFBSSxJQUNwQixRQUFRLENBQ1osQ0FBQztRQUVGLGdCQUFnQjtRQUNoQixJQUFNLE9BQU8sR0FBRyxFQUFFLENBQUM7UUFFbkIsZ0NBQWdDO1FBQ2hDLElBQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFMUQsNkJBQTZCO1FBQzdCLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxVQUFDLEdBQUc7WUFDeEIsaUJBQWlCO1lBQ2pCLElBQUksUUFBUSxDQUFDLE9BQU8sRUFBRTtnQkFDcEIsSUFBSSxDQUFDLG1CQUFXLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQywyQkFBbUIsQ0FBQyxHQUFHLENBQUM7b0JBQUUsT0FBTzthQUM1RDtZQUNELElBQUksUUFBUSxDQUFDLFVBQVUsRUFBRTtnQkFDdkIsSUFBSSxDQUFDLHNCQUFjLENBQUMsR0FBRyxDQUFDO29CQUFFLE9BQU87YUFDbEM7WUFFRCxzQ0FBc0M7WUFDdEMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNwQixDQUFDLENBQUMsQ0FBQztRQUVILHNCQUFzQjtRQUN0QixPQUFPLE9BQU8sQ0FBQztJQUNqQixDQUFDO0lBQ0Qsa0JBQWUsZ0JBQWdCLENBQUMifQ==