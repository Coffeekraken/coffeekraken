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
    const descriptor = {
        name: 'Integer',
        id: 'integer',
        is: (value) => Number.isInteger(value),
        cast: (value) => {
            if (typeof value !== 'string' && typeof value !== 'number') {
                return new Error(`Sorry but only strings and numbers can be casted to integers... Passed value: ${value}`);
            }
            // @ts-ignore
            const res = parseInt(value);
            if (isNaN(res))
                return new Error(`Sorry but the conversion of "<yellow>${value}</yellow>" to a <green>Integer</green> does not work...`);
            return res;
        }
    };
    exports.default = descriptor;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZWdlclR5cGVEZXNjcmlwdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaW50ZWdlclR5cGVEZXNjcmlwdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFNBQVM7Ozs7Ozs7Ozs7OztJQUlUOzs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FrQkc7SUFDSCxNQUFNLFVBQVUsR0FBcUI7UUFDbkMsSUFBSSxFQUFFLFNBQVM7UUFDZixFQUFFLEVBQUUsU0FBUztRQUNiLEVBQUUsRUFBRSxDQUFDLEtBQVUsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUM7UUFDM0MsSUFBSSxFQUFFLENBQUMsS0FBVSxFQUFFLEVBQUU7WUFDbkIsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFO2dCQUMxRCxPQUFPLElBQUksS0FBSyxDQUNkLGlGQUFpRixLQUFLLEVBQUUsQ0FDekYsQ0FBQzthQUNIO1lBQ0QsYUFBYTtZQUNiLE1BQU0sR0FBRyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUM1QixJQUFJLEtBQUssQ0FBQyxHQUFHLENBQUM7Z0JBQ1osT0FBTyxJQUFJLEtBQUssQ0FDZCx3Q0FBd0MsS0FBSyx5REFBeUQsQ0FDdkcsQ0FBQztZQUNKLE9BQU8sR0FBRyxDQUFDO1FBQ2IsQ0FBQztLQUNGLENBQUM7SUFFRixrQkFBZSxVQUFVLENBQUMifQ==