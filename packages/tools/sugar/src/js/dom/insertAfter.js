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
    /**
     * @name      insertAfter
     * @namespace           sugar.js.dom
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
        var nextSibling = refElm.nextSibling;
        if (!nextSibling) {
            refElm.parentNode.appendChild(elm);
        }
        else {
            refElm.parentNode.insertBefore(elm, nextSibling);
        }
    }
    return insertAfter;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5zZXJ0QWZ0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbnNlcnRBZnRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7OztJQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FxQkc7SUFDSCxTQUFTLFdBQVcsQ0FBQyxHQUFHLEVBQUUsTUFBTTtRQUM5QiwwQkFBMEI7UUFDMUIsSUFBTSxXQUFXLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQztRQUN2QyxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ2hCLE1BQU0sQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3BDO2FBQU07WUFDTCxNQUFNLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxHQUFHLEVBQUUsV0FBVyxDQUFDLENBQUM7U0FDbEQ7SUFDSCxDQUFDO0lBQ0QsT0FBUyxXQUFXLENBQUMifQ==