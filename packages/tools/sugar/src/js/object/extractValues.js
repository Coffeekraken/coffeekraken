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
     * @name            extractValues
     * @namespace       sugar.js.object
     * @type            Function
     * @stable
     *
     * This function take an array of objects and a key name as parameters and return an array containing
     * only the specified object key value.
     *
     * @param       {Array<Object>}         arrayOfObjects            An array of objects as source
     * @param       {String}                keyName                   The key name you want to extract of the objects
     * @return      {Array}                                           An array containing only the values of the property specified
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example         js
     * import extractValues from '@coffeekraken/sugar/js/object/extractValues';
     * extractValues([{
     *    hello: 'world',
     *    plop: 'Yes'
     * }, {
     *    hello: 'king',
     *    plop: 'something'
     * }], 'hello'); // => ['world', 'king']
     *
     * @since       2.0.0
     * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function extractValues(arrayOfObjects, keyName) {
        var finalArray = [];
        arrayOfObjects.forEach(function (object) {
            if (object[keyName] === undefined)
                return;
            finalArray.push(object[keyName]);
        });
        return finalArray;
    }
    return extractValues;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXh0cmFjdFZhbHVlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImV4dHJhY3RWYWx1ZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUNkLFVBQVU7Ozs7Ozs7Ozs7O0lBRVY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BNkJHO0lBQ0gsU0FBUyxhQUFhLENBQUMsY0FBYyxFQUFFLE9BQU87UUFDNUMsSUFBTSxVQUFVLEdBQUcsRUFBRSxDQUFDO1FBQ3RCLGNBQWMsQ0FBQyxPQUFPLENBQUMsVUFBQyxNQUFNO1lBQzVCLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLFNBQVM7Z0JBQUUsT0FBTztZQUMxQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQ25DLENBQUMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxVQUFVLENBQUM7SUFDcEIsQ0FBQztJQUNELE9BQVMsYUFBYSxDQUFDIn0=