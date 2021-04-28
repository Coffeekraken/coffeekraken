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
    const matches_1 = __importDefault(require("./matches"));
    /**
     * @name        closest
     * @namespace            js.dom
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
        const originalElm = $elm;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xvc2VzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3Rvb2xzL3N1Z2FyL3NyYy9qcy9kb20vY2xvc2VzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7SUFFZCx3REFBa0M7SUFFbEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BNkJHO0lBQ0gsU0FBUyxPQUFPLENBQUMsSUFBSSxFQUFFLFFBQVE7UUFDN0IsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDO1FBQ3pCLElBQUksR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQ3ZCLE9BQU8sSUFBSSxJQUFJLElBQUksSUFBSSxXQUFXLENBQUMsYUFBYSxFQUFFO1lBQ2hELElBQUksT0FBTyxRQUFRLEtBQUssVUFBVSxFQUFFO2dCQUNsQyxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUM7b0JBQUUsT0FBTyxJQUFJLENBQUM7YUFDakM7aUJBQU0sSUFBSSxPQUFPLFFBQVEsS0FBSyxRQUFRLElBQUksaUJBQVMsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLEVBQUU7Z0JBQ3BFLE9BQU8sSUFBSSxDQUFDO2FBQ2I7WUFDRCxJQUFJLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztTQUN4QjtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUNELGtCQUFlLE9BQU8sQ0FBQyJ9