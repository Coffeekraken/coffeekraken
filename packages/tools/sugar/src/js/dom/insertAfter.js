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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5zZXJ0QWZ0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy90b29scy9zdWdhci9zcmMvanMvZG9tL2luc2VydEFmdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7OztJQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FxQkc7SUFDSCxTQUFTLFdBQVcsQ0FBQyxHQUFHLEVBQUUsTUFBTTtRQUM5QiwwQkFBMEI7UUFDMUIsTUFBTSxXQUFXLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQztRQUN2QyxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ2hCLE1BQU0sQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3BDO2FBQU07WUFDTCxNQUFNLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxHQUFHLEVBQUUsV0FBVyxDQUFDLENBQUM7U0FDbEQ7SUFDSCxDQUFDO0lBQ0Qsa0JBQWUsV0FBVyxDQUFDIn0=