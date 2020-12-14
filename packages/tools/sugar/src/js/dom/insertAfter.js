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
//# sourceMappingURL=module.js.map