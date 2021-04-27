// @ts-nocheck
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * @name      insertAfter
     * @namespace            js.dom
     * @type      Function
     * @stable
     *
     * Insert an HTMLElement after another HTMLElement
     *
     * @param 		{HTMLElement} 				elm  		The element to insert
     * @param 		{HTMLElement} 				refElm 		The element after which to insert the passed element
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example  	js
     * import insertAfter from '@coffeekraken/sugar/js/dom/insertAfter'
     * insertAfter(myElementToInsert, theReferenceElement);
     *
     * @since         1.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function insertAfter(elm, refElm) {
        // next sibling of ref elm
        const nextSibling = refElm.nextSibling;
        if (!nextSibling) {
            refElm.parentNode.appendChild(elm);
        }
        else {
            refElm.parentNode.insertBefore(elm, nextSibling);
        }
    }
    exports.default = insertAfter;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5zZXJ0QWZ0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbnNlcnRBZnRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7SUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BcUJHO0lBQ0gsU0FBUyxXQUFXLENBQUMsR0FBRyxFQUFFLE1BQU07UUFDOUIsMEJBQTBCO1FBQzFCLE1BQU0sV0FBVyxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUM7UUFDdkMsSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNoQixNQUFNLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNwQzthQUFNO1lBQ0wsTUFBTSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsR0FBRyxFQUFFLFdBQVcsQ0FBQyxDQUFDO1NBQ2xEO0lBQ0gsQ0FBQztJQUNELGtCQUFlLFdBQVcsQ0FBQyJ9