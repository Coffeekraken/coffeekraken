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
     * @name      prependChild
     * @namespace           sugar.js.dom
     * @type      Function
     * @stable
     *
     * Prepend an HTMLElement into another HTMLElement
     *
     * @param 		{HTMLElement} 				elm  		The element to prepend
     * @param 		{HTMLElement} 				refElm 		The element in which to prepend the new element
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example  	js
     * import prependChild from '@coffeekraken/sugar/js/dom/prependChild'
     * prependChild(myElementToInsert, theReferenceElement);
     *
     * @since         1.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function prependChild(elm, refElm) {
        if (!refElm.firstChild) {
            refElm.appendChild(elm);
        }
        else {
            refElm.insertBefore(elm, refElm.firstChild);
        }
    }
    exports.default = prependChild;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlcGVuZENoaWxkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicHJlcGVuZENoaWxkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7OztJQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FxQkc7SUFDSCxTQUFTLFlBQVksQ0FBQyxHQUFHLEVBQUUsTUFBTTtRQUMvQixJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRTtZQUN0QixNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3pCO2FBQU07WUFDTCxNQUFNLENBQUMsWUFBWSxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDN0M7SUFDSCxDQUFDO0lBQ0Qsa0JBQWUsWUFBWSxDQUFDIn0=