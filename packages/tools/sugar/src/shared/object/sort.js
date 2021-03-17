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
    Object.defineProperty(exports, "__esModule", { value: true });
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
        const keys = Object.keys(object);
        // sort the keys
        const sortedKeys = keys.sort((a, b) => {
            // call the sort function passed as parameter
            return sort(object[a], object[b]);
        });
        // create the new sorted object
        const resultObj = {};
        // loop on each sorted keys
        sortedKeys.forEach((k) => {
            // add the property key with the object value
            resultObj[k] = object[k];
        });
        // return the result sorted object
        return resultObj;
    }
    exports.default = sort;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNvcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUNkLFVBQVU7Ozs7Ozs7Ozs7OztJQUVWOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FpQ0c7SUFDSCxTQUFTLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSTtRQUN4QixzQkFBc0I7UUFDdEIsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUVqQyxnQkFBZ0I7UUFDaEIsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNwQyw2Q0FBNkM7WUFDN0MsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3BDLENBQUMsQ0FBQyxDQUFDO1FBRUgsK0JBQStCO1FBQy9CLE1BQU0sU0FBUyxHQUFHLEVBQUUsQ0FBQztRQUNyQiwyQkFBMkI7UUFDM0IsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO1lBQ3ZCLDZDQUE2QztZQUM3QyxTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzNCLENBQUMsQ0FBQyxDQUFDO1FBRUgsa0NBQWtDO1FBQ2xDLE9BQU8sU0FBUyxDQUFDO0lBQ25CLENBQUM7SUFDRCxrQkFBZSxJQUFJLENBQUMifQ==