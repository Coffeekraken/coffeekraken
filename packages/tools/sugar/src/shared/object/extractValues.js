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
     * @return      {Array}                                           An array containing only the values of the property specified
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
        const finalArray = [];
        arrayOfObjects.forEach((object) => {
            if (object[keyName] === undefined)
                return;
            finalArray.push(object[keyName]);
        });
        return finalArray;
    }
    exports.default = extractValues;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXh0cmFjdFZhbHVlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImV4dHJhY3RWYWx1ZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7O0lBRWQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BNkJHO0lBQ0gsU0FBUyxhQUFhLENBQUMsY0FBYyxFQUFFLE9BQU87UUFDNUMsTUFBTSxVQUFVLEdBQUcsRUFBRSxDQUFDO1FBQ3RCLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtZQUNoQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxTQUFTO2dCQUFFLE9BQU87WUFDMUMsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUNuQyxDQUFDLENBQUMsQ0FBQztRQUNILE9BQU8sVUFBVSxDQUFDO0lBQ3BCLENBQUM7SUFDRCxrQkFBZSxhQUFhLENBQUMifQ==