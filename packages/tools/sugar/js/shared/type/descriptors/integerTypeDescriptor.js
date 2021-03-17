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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZWdlclR5cGVEZXNjcmlwdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3NoYXJlZC90eXBlL2Rlc2NyaXB0b3JzL2ludGVnZXJUeXBlRGVzY3JpcHRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxTQUFTOzs7Ozs7Ozs7Ozs7SUFJVDs7Ozs7Ozs7Ozs7Ozs7Ozs7O09Ba0JHO0lBQ0gsSUFBTSxVQUFVLEdBQXFCO1FBQ25DLElBQUksRUFBRSxTQUFTO1FBQ2YsRUFBRSxFQUFFLFNBQVM7UUFDYixFQUFFLEVBQUUsVUFBQyxLQUFVLElBQUssT0FBQSxNQUFNLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUF2QixDQUF1QjtRQUMzQyxJQUFJLEVBQUUsVUFBQyxLQUFVO1lBQ2YsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFO2dCQUMxRCxPQUFPLElBQUksS0FBSyxDQUNkLG1GQUFpRixLQUFPLENBQ3pGLENBQUM7YUFDSDtZQUNELGFBQWE7WUFDYixJQUFNLEdBQUcsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDNUIsSUFBSSxLQUFLLENBQUMsR0FBRyxDQUFDO2dCQUNaLE9BQU8sSUFBSSxLQUFLLENBQ2QsMkNBQXdDLEtBQUssNkRBQXlELENBQ3ZHLENBQUM7WUFDSixPQUFPLEdBQUcsQ0FBQztRQUNiLENBQUM7S0FDRixDQUFDO0lBRUYsa0JBQWUsVUFBVSxDQUFDIn0=