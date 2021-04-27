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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JhcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIndyYXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7O0lBRWQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BZ0NHO0lBQ0gsU0FBUyxJQUFJLENBQUMsSUFBSSxFQUFFLFFBQVE7UUFDMUIsSUFBSSxPQUFPLFFBQVEsS0FBSyxRQUFRLEVBQUU7WUFDaEMsUUFBUSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDN0M7UUFDRCxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQ2hDLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDbEMsSUFBSSxRQUFRLEVBQUU7WUFDWixPQUFPLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQztTQUMxQzthQUFNO1lBQ0wsT0FBTyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUMvQjtRQUNELE9BQU8sUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBQ0Qsa0JBQWUsSUFBSSxDQUFDIn0=