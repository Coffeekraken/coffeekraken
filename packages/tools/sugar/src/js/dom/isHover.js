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
//# sourceMappingURL=module.js.map