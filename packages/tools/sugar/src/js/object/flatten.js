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
     * @name                              flatten
     * @namespace           sugar.js.object
     * @type                              Function
     * @stable
     *
     * Transform the passed multiple level object into a single level one
     *
     * @param               {Object}                          object                    The object to flatten
     * @param               {String}                          [separation="."]          The separation character to use for preperty names
     * @param 							{Boolean}													[flattenArrays=false] 		Specify if you want to flatten arrays or not
     * @return              {Object}                                                    The flatten object
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example             js
     * import flatten from '@coffeekraken/sugar/js/object/flatten';
     * flatten({
     *    hello: {
     *      world: 'Coco'
     *    }
     * });
     *
     * @since       2.0.0
     * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function flatten(object, separation, flattenArrays) {
        if (separation === void 0) { separation = '.'; }
        if (flattenArrays === void 0) { flattenArrays = false; }
        var toReturn = {};
        for (var i in object) {
            if (!object.hasOwnProperty(i))
                continue;
            if ((Array.isArray(object[i]) && flattenArrays) ||
                (!Array.isArray(object[i]) && typeof object[i]) == 'object') {
                var flatObject = flatten(object[i], separation, flattenArrays);
                for (var x in flatObject) {
                    if (!flatObject.hasOwnProperty(x))
                        continue;
                    toReturn[i + separation + x] = flatObject[x];
                }
            }
            else {
                toReturn[i] = object[i];
            }
        }
        return toReturn;
    }
    return flatten;
});
