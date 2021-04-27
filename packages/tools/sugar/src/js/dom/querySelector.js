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
     * @name      querySelector
     * @namespace            js.dom
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
    function querySelector(selector, settings = {}) {
        // extend settings
        settings = Object.assign({ visible: null, inViewport: null, rootNode: document.body }, settings);
        // grab the element into the dom
        const elm = settings.rootNode.querySelector(selector);
        // if no element, stop here
        if (!elm)
            return null;
        // state tracking
        const isVisible = true;
        const isInViewport = true;
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
    exports.default = querySelector;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnlTZWxlY3Rvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInF1ZXJ5U2VsZWN0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7O0lBRWQsNERBQXNDO0lBQ3RDLGtFQUE0QztJQUM1Qyw0RUFBc0Q7SUFFdEQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BNkJHO0lBRUg7Ozs7OztPQU1HO0lBRUg7Ozs7OztPQU1HO0lBRUg7Ozs7OztPQU1HO0lBRUgsU0FBUyxhQUFhLENBQUMsUUFBUSxFQUFFLFFBQVEsR0FBRyxFQUFFO1FBQzVDLGtCQUFrQjtRQUNsQixRQUFRLG1CQUNOLE9BQU8sRUFBRSxJQUFJLEVBQ2IsVUFBVSxFQUFFLElBQUksRUFDaEIsUUFBUSxFQUFFLFFBQVEsQ0FBQyxJQUFJLElBQ3BCLFFBQVEsQ0FDWixDQUFDO1FBRUYsZ0NBQWdDO1FBQ2hDLE1BQU0sR0FBRyxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3RELDJCQUEyQjtRQUMzQixJQUFJLENBQUMsR0FBRztZQUFFLE9BQU8sSUFBSSxDQUFDO1FBRXRCLGlCQUFpQjtRQUNqQixNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFDdkIsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDO1FBRTFCLGlCQUFpQjtRQUNqQixJQUFJLFFBQVEsQ0FBQyxPQUFPLEVBQUU7WUFDcEIsSUFBSSxDQUFDLG1CQUFXLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQywyQkFBbUIsQ0FBQyxHQUFHLENBQUM7Z0JBQUUsT0FBTyxJQUFJLENBQUM7U0FDakU7UUFDRCxJQUFJLFFBQVEsQ0FBQyxVQUFVLEVBQUU7WUFDdkIsSUFBSSxDQUFDLHNCQUFjLENBQUMsR0FBRyxDQUFDO2dCQUFFLE9BQU8sSUFBSSxDQUFDO1NBQ3ZDO1FBRUQscUJBQXFCO1FBQ3JCLE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQztJQUNELGtCQUFlLGFBQWEsQ0FBQyJ9