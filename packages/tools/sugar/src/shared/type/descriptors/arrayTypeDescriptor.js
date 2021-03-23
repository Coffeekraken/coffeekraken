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
     * @name              arrayTypeDescriptor
     * @namespace         sugar.js.type.descriptor
     * @type              ISTypeDescriptor
     *
     * Describe the type "array" with some utilities methods like "is", "cast", etc...
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
        name: 'Array',
        id: 'array',
        is: (value) => {
            // _console.log('CHeck', value, Array.isArray(value));
            return Array.isArray(value);
        },
        cast: (value) => {
            if (Array.isArray(value))
                return value;
            return [value];
        }
    };
    exports.default = descriptor;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyYXlUeXBlRGVzY3JpcHRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFycmF5VHlwZURlc2NyaXB0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsU0FBUzs7Ozs7Ozs7Ozs7O0lBTVQ7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQWtCRztJQUNILE1BQU0sVUFBVSxHQUFxQjtRQUNuQyxJQUFJLEVBQUUsT0FBTztRQUNiLEVBQUUsRUFBRSxPQUFPO1FBQ1gsRUFBRSxFQUFFLENBQUMsS0FBVSxFQUFFLEVBQUU7WUFDakIsc0RBQXNEO1lBQ3RELE9BQU8sS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM5QixDQUFDO1FBQ0QsSUFBSSxFQUFFLENBQUMsS0FBVSxFQUFFLEVBQUU7WUFDbkIsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQztnQkFBRSxPQUFPLEtBQUssQ0FBQztZQUN2QyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDakIsQ0FBQztLQUNGLENBQUM7SUFFRixrQkFBZSxVQUFVLENBQUMifQ==