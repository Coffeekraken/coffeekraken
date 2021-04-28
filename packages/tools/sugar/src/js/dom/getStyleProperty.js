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
        define(["require", "exports", "../../shared/string/camelize", "../../shared/string/autoCast"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const camelize_1 = __importDefault(require("../../shared/string/camelize"));
    const autoCast_1 = __importDefault(require("../../shared/string/autoCast"));
    /**
     * @name      getStyleProperty
     * @namespace            js.dom
     * @type      Function
     * @stable
     *
     * Get a style property on the passed element through the computed style.
     * This function try to store the actual style to not trigger more that 1 redraw
     * each js execution loop.
     *
     * @param 		{HTMLElement} 					elm  		The element to get style from
     * @param 		{String} 						property 	The css property to get
     * @return 		{Mixed} 									The style value
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example  	js
     * import getStyleProperty from '@coffeekraken/sugar/js/dom/getStyleProperty'
     * const opacity = getStyleProperty(myCoolHTMLElement, 'opacity');
     *
     * @see 		https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle
     * @since         1.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function getStyleProperty(elm, property) {
        // caching mecanisme
        setTimeout(() => {
            elm._sComputedStyle = null;
        });
        const computed = elm._sComputedStyle || window.getComputedStyle(elm);
        elm._sComputedStyle = computed;
        const prefixes = ['', 'webkit-', 'moz-', 'ms-', 'o-', 'khtml-'];
        for (let i = 0; i < prefixes.length; i++) {
            const prefix = prefixes[i];
            const value = computed[camelize_1.default(`${prefix}${property}`)];
            if (value && value.trim() !== '')
                return autoCast_1.default(value);
        }
        return null;
    }
    exports.default = getStyleProperty;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0U3R5bGVQcm9wZXJ0eS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3Rvb2xzL3N1Z2FyL3NyYy9qcy9kb20vZ2V0U3R5bGVQcm9wZXJ0eS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7SUFFZCw0RUFBb0Q7SUFDcEQsNEVBQW9EO0lBRXBEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BeUJHO0lBQ0gsU0FBUyxnQkFBZ0IsQ0FBQyxHQUFHLEVBQUUsUUFBUTtRQUNyQyxvQkFBb0I7UUFDcEIsVUFBVSxDQUFDLEdBQUcsRUFBRTtZQUNkLEdBQUcsQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO1FBQzdCLENBQUMsQ0FBQyxDQUFDO1FBRUgsTUFBTSxRQUFRLEdBQUcsR0FBRyxDQUFDLGVBQWUsSUFBSSxNQUFNLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDckUsR0FBRyxDQUFDLGVBQWUsR0FBRyxRQUFRLENBQUM7UUFFL0IsTUFBTSxRQUFRLEdBQUcsQ0FBQyxFQUFFLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ2hFLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3hDLE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMzQixNQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsa0JBQVEsQ0FBQyxHQUFHLE1BQU0sR0FBRyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDekQsSUFBSSxLQUFLLElBQUksS0FBSyxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUU7Z0JBQUUsT0FBTyxrQkFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzFEO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBQ0Qsa0JBQWUsZ0JBQWdCLENBQUMifQ==