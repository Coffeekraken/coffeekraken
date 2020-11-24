// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./addEventListenerOnce", "../promise/SPromise"], factory);
    }
})(function (require, exports) {
    "use strict";
    var addEventListenerOnce_1 = __importDefault(require("./addEventListenerOnce"));
    var SPromise_1 = __importDefault(require("../promise/SPromise"));
    /**
     * @name      removeClassOnAnimationEnd
     * @namespace           sugar.js.dom
     * @type      Function
     * @stable
     *
     * Remove some class on animation end
     *
     * @param    {HTMLElement}    elm    The element to take care of
     * @param    {String|Array}    class    The class or classes (Array) to remove
     * @return   {Promise}                  A promise that will be resolved once the class has been removed and the animation finished
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example    js
     * import removeClassOnAnimationEnd from '@coffeekraken/sugar/js/dom/removeClassOnAnimationEnd'
     * removeClassOnAnimationEnd(myCoolElm, 'my-class');
     *
     * @since       1.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function removeClassOnAnimationEnd($elm, cls) {
        return new SPromise_1.default(function (resolve, reject, trigger, cancel) {
            // listen for animation end on the element just once
            addEventListenerOnce_1.default($elm, 'animationend', function (e) {
                if (!Array.isArray(cls))
                    cls = [cls];
                // remove the cls
                cls.forEach(function (_cls) {
                    $elm.classList.remove(_cls);
                });
                // resolve the process
                resolve(e);
            });
        }, {
            id: 'removeClassOnAnimationEnd'
        });
    }
    return removeClassOnAnimationEnd;
});
