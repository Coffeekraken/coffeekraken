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
     * @name      wrap
     * @namespace            js.dom
     * @type      Function
     * @stable
     *
     * Wrap an HTMLElement inside another `$wrapper` one
     *
     * @param    {HTMLElement}    $toWrap    The element to wrap
     * @param    {HTMLElement}    $wrapper    The wrapper element
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example    js
     * import wrap from '@coffeekraken/sugar/js/dom/wrap'
     * const $wrapper = document.createElement('div')
     * // assuming:
     * // <div>
     * //   <span class="wrap">Hello World</span>
     * // </div>
     * wrap(document.querySelector('.wrap'), $wrapper)
     * // output:
     * // <div>
     * //   <div>
     * //     <span class="wrap">Hello World</span>
     * //   </div>
     * // </div>
     *
     * @since       1.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function wrap($elm, $wrapper) {
        if (typeof $wrapper === 'string') {
            $wrapper = document.createElement($wrapper);
        }
        const $parent = $elm.parentNode;
        const $sibling = $elm.nextSibling;
        if ($sibling) {
            $parent.insertBefore($wrapper, $sibling);
        }
        else {
            $parent.appendChild($wrapper);
        }
        return $wrapper.appendChild($elm);
    }
    exports.default = wrap;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JhcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3Rvb2xzL3N1Z2FyL3NyYy9qcy9kb20vd3JhcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7SUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FnQ0c7SUFDSCxTQUFTLElBQUksQ0FBQyxJQUFJLEVBQUUsUUFBUTtRQUMxQixJQUFJLE9BQU8sUUFBUSxLQUFLLFFBQVEsRUFBRTtZQUNoQyxRQUFRLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUM3QztRQUNELE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7UUFDaEMsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUNsQyxJQUFJLFFBQVEsRUFBRTtZQUNaLE9BQU8sQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1NBQzFDO2FBQU07WUFDTCxPQUFPLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQy9CO1FBQ0QsT0FBTyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFDRCxrQkFBZSxJQUFJLENBQUMifQ==