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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnlTZWxlY3RvckFsbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2RvbS9xdWVyeVNlbGVjdG9yQWxsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBRWQsMERBQXNDO0lBQ3RDLGdFQUE0QztJQUM1QywwRUFBc0Q7SUFFdEQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BNkJHO0lBRUg7Ozs7OztPQU1HO0lBRUg7Ozs7OztPQU1HO0lBRUg7Ozs7OztPQU1HO0lBRUgsU0FBUyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsUUFBYTtRQUFiLHlCQUFBLEVBQUEsYUFBYTtRQUMvQyxrQkFBa0I7UUFDbEIsUUFBUSxjQUNOLE9BQU8sRUFBRSxJQUFJLEVBQ2IsVUFBVSxFQUFFLElBQUksRUFDaEIsUUFBUSxFQUFFLFFBQVEsQ0FBQyxJQUFJLElBQ3BCLFFBQVEsQ0FDWixDQUFDO1FBRUYsZ0JBQWdCO1FBQ2hCLElBQU0sT0FBTyxHQUFHLEVBQUUsQ0FBQztRQUVuQixnQ0FBZ0M7UUFDaEMsSUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUUxRCw2QkFBNkI7UUFDN0IsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLFVBQUMsR0FBRztZQUN4QixpQkFBaUI7WUFDakIsSUFBSSxRQUFRLENBQUMsT0FBTyxFQUFFO2dCQUNwQixJQUFJLENBQUMsbUJBQVcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLDJCQUFtQixDQUFDLEdBQUcsQ0FBQztvQkFBRSxPQUFPO2FBQzVEO1lBQ0QsSUFBSSxRQUFRLENBQUMsVUFBVSxFQUFFO2dCQUN2QixJQUFJLENBQUMsc0JBQWMsQ0FBQyxHQUFHLENBQUM7b0JBQUUsT0FBTzthQUNsQztZQUVELHNDQUFzQztZQUN0QyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3BCLENBQUMsQ0FBQyxDQUFDO1FBRUgsc0JBQXNCO1FBQ3RCLE9BQU8sT0FBTyxDQUFDO0lBQ2pCLENBQUM7SUFDRCxrQkFBZSxnQkFBZ0IsQ0FBQyJ9