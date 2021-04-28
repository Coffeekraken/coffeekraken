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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JhcElubmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvdG9vbHMvc3VnYXIvc3JjL2pzL2RvbS93cmFwSW5uZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7O0lBRWQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BZ0NHO0lBQ0gsU0FBUyxTQUFTLENBQUMsT0FBTyxFQUFFLFFBQVE7UUFDbEMsSUFBSSxPQUFPLFFBQVEsS0FBSyxRQUFRLEVBQUU7WUFDaEMsUUFBUSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDN0M7UUFDRCxPQUFPLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzlCLE9BQU8sT0FBTyxDQUFDLFVBQVUsS0FBSyxRQUFRLEVBQUU7WUFDdEMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDMUM7SUFDSCxDQUFDO0lBQ0Qsa0JBQWUsU0FBUyxDQUFDIn0=