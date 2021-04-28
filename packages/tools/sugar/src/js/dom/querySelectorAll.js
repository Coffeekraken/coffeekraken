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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnlTZWxlY3RvckFsbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3Rvb2xzL3N1Z2FyL3NyYy9qcy9kb20vcXVlcnlTZWxlY3RvckFsbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7SUFFZCw0REFBc0M7SUFDdEMsa0VBQTRDO0lBQzVDLDRFQUFzRDtJQUV0RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0E2Qkc7SUFFSDs7Ozs7O09BTUc7SUFFSDs7Ozs7O09BTUc7SUFFSDs7Ozs7O09BTUc7SUFFSCxTQUFTLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxRQUFRLEdBQUcsRUFBRTtRQUMvQyxrQkFBa0I7UUFDbEIsUUFBUSxtQkFDTixPQUFPLEVBQUUsSUFBSSxFQUNiLFVBQVUsRUFBRSxJQUFJLEVBQ2hCLFFBQVEsRUFBRSxRQUFRLENBQUMsSUFBSSxJQUNwQixRQUFRLENBQ1osQ0FBQztRQUVGLGdCQUFnQjtRQUNoQixNQUFNLE9BQU8sR0FBRyxFQUFFLENBQUM7UUFFbkIsZ0NBQWdDO1FBQ2hDLE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFMUQsNkJBQTZCO1FBQzdCLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFO1lBQzVCLGlCQUFpQjtZQUNqQixJQUFJLFFBQVEsQ0FBQyxPQUFPLEVBQUU7Z0JBQ3BCLElBQUksQ0FBQyxtQkFBVyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsMkJBQW1CLENBQUMsR0FBRyxDQUFDO29CQUFFLE9BQU87YUFDNUQ7WUFDRCxJQUFJLFFBQVEsQ0FBQyxVQUFVLEVBQUU7Z0JBQ3ZCLElBQUksQ0FBQyxzQkFBYyxDQUFDLEdBQUcsQ0FBQztvQkFBRSxPQUFPO2FBQ2xDO1lBRUQsc0NBQXNDO1lBQ3RDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDcEIsQ0FBQyxDQUFDLENBQUM7UUFFSCxzQkFBc0I7UUFDdEIsT0FBTyxPQUFPLENBQUM7SUFDakIsQ0FBQztJQUNELGtCQUFlLGdCQUFnQixDQUFDIn0=