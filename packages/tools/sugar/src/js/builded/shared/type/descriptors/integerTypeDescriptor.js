// shared
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
     * @name              integerTypeDescriptor
     * @namespace         sugar.js.type.descriptor
     * @type              ISTypeDescriptor
     *
     * Describe the type "integer" with some utilities methods like "is", "cast", etc...
     *
     * @example         js
     * export default {
     *    name: 'String',
     *    id: 'string',
     *    is: (value) => typeof value === 'string',
     *    cast: (value) => '' + value,
     *    // etc...
     * };
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    var descriptor = {
        name: 'Integer',
        id: 'integer',
        is: function (value) { return Number.isInteger(value); },
        cast: function (value) {
            if (typeof value !== 'string' && typeof value !== 'number') {
                return new Error("Sorry but only strings and numbers can be casted to integers... Passed value: " + value);
            }
            // @ts-ignore
            var res = parseInt(value);
            if (isNaN(res))
                return new Error("Sorry but the conversion of \"<yellow>" + value + "</yellow>\" to a <green>Integer</green> does not work...");
            return res;
        }
    };
    exports.default = descriptor;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZWdlclR5cGVEZXNjcmlwdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc2hhcmVkL3R5cGUvZGVzY3JpcHRvcnMvaW50ZWdlclR5cGVEZXNjcmlwdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFNBQVM7Ozs7Ozs7Ozs7OztJQUlUOzs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FrQkc7SUFDSCxJQUFNLFVBQVUsR0FBcUI7UUFDbkMsSUFBSSxFQUFFLFNBQVM7UUFDZixFQUFFLEVBQUUsU0FBUztRQUNiLEVBQUUsRUFBRSxVQUFDLEtBQVUsSUFBSyxPQUFBLE1BQU0sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQXZCLENBQXVCO1FBQzNDLElBQUksRUFBRSxVQUFDLEtBQVU7WUFDZixJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7Z0JBQzFELE9BQU8sSUFBSSxLQUFLLENBQ2QsbUZBQWlGLEtBQU8sQ0FDekYsQ0FBQzthQUNIO1lBQ0QsYUFBYTtZQUNiLElBQU0sR0FBRyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUM1QixJQUFJLEtBQUssQ0FBQyxHQUFHLENBQUM7Z0JBQ1osT0FBTyxJQUFJLEtBQUssQ0FDZCwyQ0FBd0MsS0FBSyw2REFBeUQsQ0FDdkcsQ0FBQztZQUNKLE9BQU8sR0FBRyxDQUFDO1FBQ2IsQ0FBQztLQUNGLENBQUM7SUFFRixrQkFBZSxVQUFVLENBQUMifQ==