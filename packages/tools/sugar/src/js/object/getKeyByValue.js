// @ts-nocheck
// @shared
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
     * @name          getKeyByValue
     * @namespace           sugar.js.object
     * @type          Function
     * @stable
     *
     * Return the key that correspond to the passed value in the passed object
     *
     * @param         {Object}        object        The object in which to search for the value
     * @param         {Mixed}         value         The value to find in the object
     * @return        {String}                      The key of the wanted value or false if not found
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example       js
     * import getKeyByValue from '@coffeekraken/sugar/js/object/getKeyByValue';
     * console.log(getKeyByValue({ hello: 'world' }, 'world')); // => hello
     *
     * @since     2.0.0
     * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function getKeyByValue(object, value) {
        return Object.keys(object).find(function (key) { return object[key] === value; });
    }
    return getKeyByValue;
});
//# sourceMappingURL=getKeyByValue.js.map