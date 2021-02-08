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
     * @name                map
     * @namespace           sugar.js.object
     * @type                Function
     * @stable
     *
     * This is the same function as the "Array.map" but for objects. It will iterate over all the properties
     * of the passed object and pass the value to your process function. It will then save the property
     * with your processed value
     *
     * @param           {Object}            object          The object to process
     * @param           {Function}          processor       The processor function that will take as parameters the current property value and the property name
     * @return          {Object}                            The processed object
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example         js
     * import map from '@coffeekraken/sugar/js/object/map';
     * const myObject = {
     *    hello: 'world',
     *    cat: 'Nelson'
     * };
     * map(myObject, (value, prop) => {
     *    return prop === 'hello' ? 'universe' : value;
     * });
     * {
     *    hello: 'universe',
     *    cat: 'Nelson'
     * }
     *
     * @since       2.0.0
     * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function map(object, processor) {
        Object.keys(object).forEach(function (prop) {
            var res = processor(object[prop], prop);
            if (res === -1)
                delete object[prop];
            else
                object[prop] = res;
        });
        return object;
    }
    return map;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxVQUFVOzs7Ozs7Ozs7OztJQUVWOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09Ba0NHO0lBQ0gsU0FBUyxHQUFHLENBQUMsTUFBTSxFQUFFLFNBQVM7UUFDNUIsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQyxJQUFJO1lBQy9CLElBQU0sR0FBRyxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDMUMsSUFBSSxHQUFHLEtBQUssQ0FBQyxDQUFDO2dCQUFFLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDOztnQkFDL0IsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUMxQixDQUFDLENBQUMsQ0FBQztRQUNILE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7SUFDRCxPQUFTLEdBQUcsQ0FBQyJ9