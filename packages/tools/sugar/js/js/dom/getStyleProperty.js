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
    var camelize_1 = __importDefault(require("../../shared/string/camelize"));
    var autoCast_1 = __importDefault(require("../../shared/string/autoCast"));
    /**
     * @name      getStyleProperty
     * @namespace           sugar.js.dom
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
        setTimeout(function () {
            elm._sComputedStyle = null;
        });
        var computed = elm._sComputedStyle || window.getComputedStyle(elm);
        elm._sComputedStyle = computed;
        var prefixes = ['', 'webkit-', 'moz-', 'ms-', 'o-', 'khtml-'];
        for (var i = 0; i < prefixes.length; i++) {
            var prefix = prefixes[i];
            var value = computed[camelize_1.default("" + prefix + property)];
            if (value && value.trim() !== '')
                return autoCast_1.default(value);
        }
        return null;
    }
    exports.default = getStyleProperty;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0U3R5bGVQcm9wZXJ0eS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9qcy9kb20vZ2V0U3R5bGVQcm9wZXJ0eS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7SUFFZCwwRUFBb0Q7SUFDcEQsMEVBQW9EO0lBRXBEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BeUJHO0lBQ0gsU0FBUyxnQkFBZ0IsQ0FBQyxHQUFHLEVBQUUsUUFBUTtRQUNyQyxvQkFBb0I7UUFDcEIsVUFBVSxDQUFDO1lBQ1QsR0FBRyxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7UUFDN0IsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFNLFFBQVEsR0FBRyxHQUFHLENBQUMsZUFBZSxJQUFJLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNyRSxHQUFHLENBQUMsZUFBZSxHQUFHLFFBQVEsQ0FBQztRQUUvQixJQUFNLFFBQVEsR0FBRyxDQUFDLEVBQUUsRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDaEUsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDeEMsSUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzNCLElBQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxrQkFBUSxDQUFDLEtBQUcsTUFBTSxHQUFHLFFBQVUsQ0FBQyxDQUFDLENBQUM7WUFDekQsSUFBSSxLQUFLLElBQUksS0FBSyxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUU7Z0JBQUUsT0FBTyxrQkFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzFEO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBQ0Qsa0JBQWUsZ0JBQWdCLENBQUMifQ==