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
     * @name                                sort
     * @namespace           sugar.js.object
     * @type                                Function
     * @stable
     *
     * Sort an object properties the same way as the Array.sort do it
     *
     * @param                 {Object}                  object                The object to sort
     * @param                 {Function}                sort                  The sort function to use
     * @return                {Object}                                        The sorted object
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example               js
     * import sortObject from '@coffeekraken/sugar/js/object/sort';
     * sortObject({
     *    coco: { weight: 10 },
     *    lolo: { weight: 2 },
     *    plop: { weight: 5 }
     * }, (a, b) => {
     *   return a.weight - b.weight;
     * });
     * // {
     * //   lolo: { weight: 2 },
     * //   plop: { weight: 5 },
     * //   coco: { weight: 10 }
     * // }
     *
     * @since       2.0.0
     * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function sort(object, sort) {
        // get the object keys
        var keys = Object.keys(object);
        // sort the keys
        var sortedKeys = keys.sort(function (a, b) {
            // call the sort function passed as parameter
            return sort(object[a], object[b]);
        });
        // create the new sorted object
        var resultObj = {};
        // loop on each sorted keys
        sortedKeys.forEach(function (k) {
            // add the property key with the object value
            resultObj[k] = object[k];
        });
        // return the result sorted object
        return resultObj;
    }
    return sort;
});
//# sourceMappingURL=module.js.map