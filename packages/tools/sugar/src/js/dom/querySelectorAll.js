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
        define(["require", "exports", "./isVisible", "./isInViewport", "./closestNotVisible"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const isVisible_1 = __importDefault(require("./isVisible"));
    const isInViewport_1 = __importDefault(require("./isInViewport"));
    const closestNotVisible_1 = __importDefault(require("./closestNotVisible"));
    /**
     * @name      querySelectorAll
     * @namespace            js.dom
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
    function querySelectorAll(selector, settings = {}) {
        // extend settings
        settings = Object.assign({ visible: null, inViewport: null, rootNode: document.body }, settings);
        // results array
        const results = [];
        // grab the element into the dom
        const elms = settings.rootNode.querySelectorAll(selector);
        // loop on the found elements
        [].forEach.call(elms, (elm) => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnlTZWxlY3RvckFsbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInF1ZXJ5U2VsZWN0b3JBbGwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7O0lBRWQsNERBQXNDO0lBQ3RDLGtFQUE0QztJQUM1Qyw0RUFBc0Q7SUFFdEQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BNkJHO0lBRUg7Ozs7OztPQU1HO0lBRUg7Ozs7OztPQU1HO0lBRUg7Ozs7OztPQU1HO0lBRUgsU0FBUyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsUUFBUSxHQUFHLEVBQUU7UUFDL0Msa0JBQWtCO1FBQ2xCLFFBQVEsbUJBQ04sT0FBTyxFQUFFLElBQUksRUFDYixVQUFVLEVBQUUsSUFBSSxFQUNoQixRQUFRLEVBQUUsUUFBUSxDQUFDLElBQUksSUFDcEIsUUFBUSxDQUNaLENBQUM7UUFFRixnQkFBZ0I7UUFDaEIsTUFBTSxPQUFPLEdBQUcsRUFBRSxDQUFDO1FBRW5CLGdDQUFnQztRQUNoQyxNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRTFELDZCQUE2QjtRQUM3QixFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRTtZQUM1QixpQkFBaUI7WUFDakIsSUFBSSxRQUFRLENBQUMsT0FBTyxFQUFFO2dCQUNwQixJQUFJLENBQUMsbUJBQVcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLDJCQUFtQixDQUFDLEdBQUcsQ0FBQztvQkFBRSxPQUFPO2FBQzVEO1lBQ0QsSUFBSSxRQUFRLENBQUMsVUFBVSxFQUFFO2dCQUN2QixJQUFJLENBQUMsc0JBQWMsQ0FBQyxHQUFHLENBQUM7b0JBQUUsT0FBTzthQUNsQztZQUVELHNDQUFzQztZQUN0QyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3BCLENBQUMsQ0FBQyxDQUFDO1FBRUgsc0JBQXNCO1FBQ3RCLE9BQU8sT0FBTyxDQUFDO0lBQ2pCLENBQUM7SUFDRCxrQkFBZSxnQkFBZ0IsQ0FBQyJ9