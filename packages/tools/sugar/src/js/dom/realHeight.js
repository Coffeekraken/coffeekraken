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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhbEhlaWdodC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3Rvb2xzL3N1Z2FyL3NyYy9qcy9kb20vcmVhbEhlaWdodC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7SUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BcUJHO0lBQ0gsU0FBUyxVQUFVLENBQUMsR0FBRztRQUNyQixxQ0FBcUM7UUFDckMsR0FBRyxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDO1FBQzlCLEdBQUcsQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztRQUMvQixpREFBaUQ7UUFDakQsTUFBTSxNQUFNLEdBQUcsR0FBRyxDQUFDLFlBQVksQ0FBQztRQUNoQyxzQkFBc0I7UUFDdEIsR0FBRyxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO1FBQ3pCLEdBQUcsQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQztRQUMxQixvQkFBb0I7UUFDcEIsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUNELGtCQUFlLFVBQVUsQ0FBQyJ9