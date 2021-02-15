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
     * @name      nodeIndex
     * @namespace           sugar.js.dom
     * @type      Function
     * @stable
     *
     * Return the inde of the passed node inside the html
     *
     * @param    {HTMLElement}    node    The node to get the index for
     * @return    {Integer}    The index of the node inside the html
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example    js
     * import nodeIndex from '@coffeekraken/sugar/js/dom/nodeIndex'
     * // assuming:
     * // <li>item #1</li>
     * // <li class="match">item #2</li>
     * // <li>item #3</li>
     * nodeIndex(document.querySelector('.match')) // 1
     *
     * @since       1.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function nodeIndex(node) {
        var index = 0;
        while ((node = node.previousElementSibling)) {
            index++;
        }
        return index;
    }
    exports.default = nodeIndex;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZUluZGV4LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibm9kZUluZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7OztJQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BeUJHO0lBQ0gsU0FBUyxTQUFTLENBQUMsSUFBSTtRQUNyQixJQUFJLEtBQUssR0FBRyxDQUFDLENBQUM7UUFDZCxPQUFPLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxFQUFFO1lBQzNDLEtBQUssRUFBRSxDQUFDO1NBQ1Q7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7SUFDRCxrQkFBZSxTQUFTLENBQUMifQ==