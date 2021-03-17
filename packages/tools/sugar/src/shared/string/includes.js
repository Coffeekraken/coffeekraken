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
     * @name        includes
     * @namespace           sugar.js.string
     * @type      Function
     * @stable
     *
     * Same as the native String.includes function but accept either an array of items
     * or a simple comma separated string like "something,cool,hello,world"
     *
     * @param    {String}    string    The string to check
     * @param     {Array|String}    values      An array or comma separated string to check
     * @return    {Boolean|Array}     An array of values that exists in the string or false if nothing match
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example    js
     * import includes from '@coffeekraken/sugar/js/string/includes'
     * includes('Hello world', 'world,coco') // ['world']
     *
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function includes(string, values) {
        if (!Array.isArray(values))
            values = values.split(',').map((t) => t.trim());
        const valuesThatExists = [];
        values.forEach((v) => {
            if (string.includes(v)) {
                valuesThatExists.push(v);
            }
        });
        if (valuesThatExists.length)
            return valuesThatExists;
        return false;
    }
    exports.default = includes;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5jbHVkZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmNsdWRlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBQ2QsVUFBVTs7Ozs7Ozs7Ozs7O0lBRVY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BdUJHO0lBQ0gsU0FBUyxRQUFRLENBQUMsTUFBTSxFQUFFLE1BQU07UUFDOUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO1lBQUUsTUFBTSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUM1RSxNQUFNLGdCQUFnQixHQUFHLEVBQUUsQ0FBQztRQUM1QixNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDbkIsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUN0QixnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDMUI7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUNILElBQUksZ0JBQWdCLENBQUMsTUFBTTtZQUFFLE9BQU8sZ0JBQWdCLENBQUM7UUFDckQsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBQ0Qsa0JBQWUsUUFBUSxDQUFDIn0=