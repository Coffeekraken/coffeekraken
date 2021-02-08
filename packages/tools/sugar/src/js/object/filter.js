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
     * @name                        filter
     * @namespace           sugar.js.object
     * @type                        Function
     * @stable
     *
     * Allow to filter an object using a function. It works the same as the filter method on the Array object type.
     * The passed filter function will have as parameter each object properties and must return true or false depending if you want the
     * passed property in the filtered object
     *
     * @param               {Object}                object                The object to filter
     * @param               {Function}              filter                The filter function that take as parameter the property itself, and the property name
     * @return              {Object}                                      The filtered object
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example           js
     * import filter from '@coffeekraken/sugar/js/object/filter';
     * filter({
     *    coco: 'hello',
     *    plop: true
     * }, (key, item) => typeof item === 'string');
     * // { coco: 'hello' }
     *
     * @since         2.0.0
     * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function filter(object, filter) {
        // init the new object to return
        var result = {};
        // loop on the object keys
        Object.keys(object).forEach(function (propertyName) {
            // pass the property in the filter function
            if (filter(propertyName, object[propertyName])) {
                // add the property in the new object
                result[propertyName] = object[propertyName];
            }
        });
        // return the filtered object
        return result;
    }
    return filter;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlsdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxVQUFVOzs7Ozs7Ozs7OztJQUVWOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BNEJHO0lBQ0gsU0FBUyxNQUFNLENBQUMsTUFBTSxFQUFFLE1BQU07UUFDNUIsZ0NBQWdDO1FBQ2hDLElBQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUVsQiwwQkFBMEI7UUFDMUIsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQyxZQUFZO1lBQ3ZDLDJDQUEyQztZQUMzQyxJQUFJLE1BQU0sQ0FBQyxZQUFZLEVBQUUsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUU7Z0JBQzlDLHFDQUFxQztnQkFDckMsTUFBTSxDQUFDLFlBQVksQ0FBQyxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQzthQUM3QztRQUNILENBQUMsQ0FBQyxDQUFDO1FBRUgsNkJBQTZCO1FBQzdCLE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7SUFDRCxPQUFTLE1BQU0sQ0FBQyJ9