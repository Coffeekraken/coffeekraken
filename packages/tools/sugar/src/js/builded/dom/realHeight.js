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
     * @namespace           sugar.js.dom
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
        var height = elm.scrollHeight;
        // reset the overflowY
        elm.style.overflowY = '';
        elm.style.transition = '';
        // return the height
        return height;
    }
    exports.default = realHeight;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhbEhlaWdodC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2RvbS9yZWFsSGVpZ2h0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7OztJQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FxQkc7SUFDSCxTQUFTLFVBQVUsQ0FBQyxHQUFHO1FBQ3JCLHFDQUFxQztRQUNyQyxHQUFHLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUM7UUFDOUIsR0FBRyxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO1FBQy9CLGlEQUFpRDtRQUNqRCxJQUFNLE1BQU0sR0FBRyxHQUFHLENBQUMsWUFBWSxDQUFDO1FBQ2hDLHNCQUFzQjtRQUN0QixHQUFHLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7UUFDekIsR0FBRyxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO1FBQzFCLG9CQUFvQjtRQUNwQixPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBQ0Qsa0JBQWUsVUFBVSxDQUFDIn0=