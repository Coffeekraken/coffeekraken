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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZWdlclR5cGVEZXNjcmlwdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29yZS9zLXR5cGUvc3JjL3NoYXJlZC9kZXNjcmlwdG9ycy9pbnRlZ2VyVHlwZURlc2NyaXB0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsU0FBUzs7Ozs7Ozs7Ozs7O0lBSVQ7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQWtCRztJQUNILE1BQU0sVUFBVSxHQUFxQjtRQUNuQyxJQUFJLEVBQUUsU0FBUztRQUNmLEVBQUUsRUFBRSxTQUFTO1FBQ2IsRUFBRSxFQUFFLENBQUMsS0FBVSxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQztRQUMzQyxJQUFJLEVBQUUsQ0FBQyxLQUFVLEVBQUUsRUFBRTtZQUNuQixJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7Z0JBQzFELE9BQU8sSUFBSSxLQUFLLENBQ2QsaUZBQWlGLEtBQUssRUFBRSxDQUN6RixDQUFDO2FBQ0g7WUFDRCxhQUFhO1lBQ2IsTUFBTSxHQUFHLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzVCLElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQztnQkFDWixPQUFPLElBQUksS0FBSyxDQUNkLHdDQUF3QyxLQUFLLHlEQUF5RCxDQUN2RyxDQUFDO1lBQ0osT0FBTyxHQUFHLENBQUM7UUFDYixDQUFDO0tBQ0YsQ0FBQztJQUVGLGtCQUFlLFVBQVUsQ0FBQyJ9