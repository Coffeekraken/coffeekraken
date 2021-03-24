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
     * @name                                sort
     * @namespace           sugar.js.object
     * @type                                Function
     * @stable
     *
     * Sort an object properties the same way as the Array.sort do it
     *
     * @param                 {Object}                  object                The object to sort
     * @param                 {Function}                sort                  The sort function to use
     * @return                {Object}                                        The sorted object
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNvcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7O0lBRWQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQWlDRztJQUNILFNBQVMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJO1FBQ3hCLHNCQUFzQjtRQUN0QixNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRWpDLGdCQUFnQjtRQUNoQixNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3BDLDZDQUE2QztZQUM3QyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDcEMsQ0FBQyxDQUFDLENBQUM7UUFFSCwrQkFBK0I7UUFDL0IsTUFBTSxTQUFTLEdBQUcsRUFBRSxDQUFDO1FBQ3JCLDJCQUEyQjtRQUMzQixVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDdkIsNkNBQTZDO1lBQzdDLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDM0IsQ0FBQyxDQUFDLENBQUM7UUFFSCxrQ0FBa0M7UUFDbEMsT0FBTyxTQUFTLENBQUM7SUFDbkIsQ0FBQztJQUNELGtCQUFlLElBQUksQ0FBQyJ9