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
     * @name      isHover
     * @namespace           sugar.js.dom
     * @type      Function
     * @stable
     *
     * Check if the mouse is hover the passed HTMLElement
     *
     * @param    {HTMLElement}    $elm    The HTMLElement to check
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example    js
     * import isHover from '@coffeekraken/sugar/js/dom/isHover'
     * const $myElm = document.querySelector('.my-elm')
     * if (isHover($myElm)) {
     *   // do something
     * }
     *
     * @since       1.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function isHover($elm) {
        return $elm.parentElement.querySelector(':hover') === $elm;
    }
    return isHover;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXNIb3Zlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImlzSG92ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7SUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0F1Qkc7SUFDSCxTQUFTLE9BQU8sQ0FBQyxJQUFJO1FBQ25CLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLEtBQUssSUFBSSxDQUFDO0lBQzdELENBQUM7SUFDRCxPQUFTLE9BQU8sQ0FBQyJ9