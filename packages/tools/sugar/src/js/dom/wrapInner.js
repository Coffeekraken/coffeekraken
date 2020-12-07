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
     * @name      wrapInner
     * @namespace           sugar.js.dom
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
    return wrapInner;
});
//# sourceMappingURL=wrapInner.js.map