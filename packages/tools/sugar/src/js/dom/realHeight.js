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
     * @name      realHeight
     * @namespace            js.dom
     * @type      Function
     * @stable
     *
     * Return the full height of an element that has maybe a max-height, etc...
     *
     * @param 		{HTMLElement} 		elm 		The element to process
     * @return 		{Number} 						The real height of the element
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example     js
     * import realHeight from '@coffeekraken/sugar/js/dom/realHeight';
     * realHeight(myCoolHtmlElement);
     *
     * @since         1.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function realHeight(elm) {
        // apply an overflow-y to the element
        elm.style.transition = 'none';
        elm.style.overflowY = 'scroll';
        // get the actual height through the scrollHeight
        const height = elm.scrollHeight;
        // reset the overflowY
        elm.style.overflowY = '';
        elm.style.transition = '';
        // return the height
        return height;
    }
    exports.default = realHeight;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhbEhlaWdodC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInJlYWxIZWlnaHQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7O0lBRWQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXFCRztJQUNILFNBQVMsVUFBVSxDQUFDLEdBQUc7UUFDckIscUNBQXFDO1FBQ3JDLEdBQUcsQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLE1BQU0sQ0FBQztRQUM5QixHQUFHLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7UUFDL0IsaURBQWlEO1FBQ2pELE1BQU0sTUFBTSxHQUFHLEdBQUcsQ0FBQyxZQUFZLENBQUM7UUFDaEMsc0JBQXNCO1FBQ3RCLEdBQUcsQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztRQUN6QixHQUFHLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7UUFDMUIsb0JBQW9CO1FBQ3BCLE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7SUFDRCxrQkFBZSxVQUFVLENBQUMifQ==