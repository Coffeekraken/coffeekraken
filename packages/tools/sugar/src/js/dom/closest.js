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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xvc2VzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsb3Nlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7O0lBRWQsd0RBQWtDO0lBRWxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQTZCRztJQUNILFNBQVMsT0FBTyxDQUFDLElBQUksRUFBRSxRQUFRO1FBQzdCLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQztRQUN6QixJQUFJLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUN2QixPQUFPLElBQUksSUFBSSxJQUFJLElBQUksV0FBVyxDQUFDLGFBQWEsRUFBRTtZQUNoRCxJQUFJLE9BQU8sUUFBUSxLQUFLLFVBQVUsRUFBRTtnQkFDbEMsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDO29CQUFFLE9BQU8sSUFBSSxDQUFDO2FBQ2pDO2lCQUFNLElBQUksT0FBTyxRQUFRLEtBQUssUUFBUSxJQUFJLGlCQUFTLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxFQUFFO2dCQUNwRSxPQUFPLElBQUksQ0FBQzthQUNiO1lBQ0QsSUFBSSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7U0FDeEI7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFDRCxrQkFBZSxPQUFPLENBQUMifQ==