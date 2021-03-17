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
        define(["require", "exports", "./matches"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var matches_1 = __importDefault(require("./matches"));
    /**
     * @name        closest
     * @namespace           sugar.js.dom
     * @type      Function
     * @stable
     *
     * Go up the dom three to find the first element that matches the passed selector
     *
     * @param 		{HTMLElement} 					$elm  		The element to start on
     * @param 		{String|Function} 				selector 	A css selector to search for or a check function that will be used
     * @return 		{HTMLElement} 								The element found or null
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example  	js
     * import closest from '@coffeekraken/sugar/js/dom/closest'
     * const closestElm = closest(myCoolElement, '.my-cool-class');
     * if (closestElm) {
     * 		// we have found en element that matches the selector
     * }
     * // the selector param can be a function that need to return either true or false like so:
     * closest(myCoolElement, (elm) => {
     *   return elm.hasAttribute('my-cool-attribute')
     * })
     *
     * @since         1.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function closest($elm, selector) {
        var originalElm = $elm;
        $elm = $elm.parentNode;
        while ($elm && $elm != originalElm.ownerDocument) {
            if (typeof selector === 'function') {
                if (selector($elm))
                    return $elm;
            }
            else if (typeof selector === 'string' && matches_1.default($elm, selector)) {
                return $elm;
            }
            $elm = $elm.parentNode;
        }
        return null;
    }
    exports.default = closest;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xvc2VzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2RvbS9jbG9zZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7OztJQUVkLHNEQUFrQztJQUVsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0E2Qkc7SUFDSCxTQUFTLE9BQU8sQ0FBQyxJQUFJLEVBQUUsUUFBUTtRQUM3QixJQUFNLFdBQVcsR0FBRyxJQUFJLENBQUM7UUFDekIsSUFBSSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7UUFDdkIsT0FBTyxJQUFJLElBQUksSUFBSSxJQUFJLFdBQVcsQ0FBQyxhQUFhLEVBQUU7WUFDaEQsSUFBSSxPQUFPLFFBQVEsS0FBSyxVQUFVLEVBQUU7Z0JBQ2xDLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQztvQkFBRSxPQUFPLElBQUksQ0FBQzthQUNqQztpQkFBTSxJQUFJLE9BQU8sUUFBUSxLQUFLLFFBQVEsSUFBSSxpQkFBUyxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsRUFBRTtnQkFDcEUsT0FBTyxJQUFJLENBQUM7YUFDYjtZQUNELElBQUksR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO1NBQ3hCO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBQ0Qsa0JBQWUsT0FBTyxDQUFDIn0=