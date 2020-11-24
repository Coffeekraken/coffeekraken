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
    return realHeight;
});
