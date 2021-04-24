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
     * @name      wrapInner
     * @namespace            js.dom
     * @type      Function
     * @stable
     *
     * Wrap the content of the passed `$parent` inside a the passed HTMLElement `$wrapper`
     *
     * @param    {HTMLElement}    $parent    The parent to wrap inner
     * @param    {HTMLElement}    $wrapper    The wrapper element
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example    js
     * import wrapInner from '@coffeekraken/sugar/js/dom/wrapInner'
     * const $myWrapper = document.createElement('div')
     * // assuming
     * // <div class="container">
     * //   <span>Hello World</span>
     * // </div>
     * wrapInner(document.querySelector('.container'), $myWrapper)
     * // return
     * // <div class="container">
     * //   <div>
     * //     <span>Hello World</span>
     * //   </div>
     * // </div>
     *
     * @since       1.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel@gmail.com)
     */
    function wrapInner($parent, $wrapper) {
        if (typeof $wrapper === 'string') {
            $wrapper = document.createElement($wrapper);
        }
        $parent.appendChild($wrapper);
        while ($parent.firstChild !== $wrapper) {
            $wrapper.appendChild($parent.firstChild);
        }
    }
    exports.default = wrapInner;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JhcElubmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsid3JhcElubmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7OztJQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQWdDRztJQUNILFNBQVMsU0FBUyxDQUFDLE9BQU8sRUFBRSxRQUFRO1FBQ2xDLElBQUksT0FBTyxRQUFRLEtBQUssUUFBUSxFQUFFO1lBQ2hDLFFBQVEsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQzdDO1FBQ0QsT0FBTyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM5QixPQUFPLE9BQU8sQ0FBQyxVQUFVLEtBQUssUUFBUSxFQUFFO1lBQ3RDLFFBQVEsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQzFDO0lBQ0gsQ0FBQztJQUNELGtCQUFlLFNBQVMsQ0FBQyJ9