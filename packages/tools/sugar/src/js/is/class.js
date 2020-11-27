// @ts-nocheck
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "is-class"], factory);
    }
})(function (require, exports) {
    "use strict";
    var is_class_1 = __importDefault(require("is-class"));
    /**
     * @name                      class
     * @namespace           sugar.js.is
     * @type                      Function
     * @stable
     *
     * Check if the passed variable (or array of variables) is/are plain variable(s)
     *
     * @param         {Mixed|Array}            variable                  The variable(s) to check
     * @return        {Boolean}                                         true if is class(es), false if not
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example           js
     * import isClass = from '@coffeekraken/sugar/js/is/class';
     * isClass({ hello: 'world'}); // => false
     * const myCoolClass = class Coco{};
     * isClass(myCoolClass); // => true
     *
     * @see       https://www.npmjs.com/package/is-class
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function cls(cls) {
        if (!Array.isArray(cls))
            cls = [cls];
        for (var i = 0; i < cls.length; i++) {
            if (!is_class_1.default(cls[i]))
                return false;
        }
        return true;
    }
    return cls;
});
