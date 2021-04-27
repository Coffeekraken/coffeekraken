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
     * @name              functionTypeDescriptor
     * @namespace         sugar.js.type.descriptor
     * @type              ISTypeDescriptor
     *
     * Describe the type "function" with some utilities methods like "is", "cast", etc...
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
        name: 'Function',
        id: 'function',
        is: (value) => typeof value === 'function',
        cast: (value) => {
            return new Error(`Sorry but nothing is castable to a Function`);
        }
    };
    exports.default = descriptor;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnVuY3Rpb25UeXBlRGVzY3JpcHRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZ1bmN0aW9uVHlwZURlc2NyaXB0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsU0FBUzs7Ozs7Ozs7Ozs7O0lBSVQ7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQWtCRztJQUNILE1BQU0sVUFBVSxHQUFxQjtRQUNuQyxJQUFJLEVBQUUsVUFBVTtRQUNoQixFQUFFLEVBQUUsVUFBVTtRQUNkLEVBQUUsRUFBRSxDQUFDLEtBQVUsRUFBRSxFQUFFLENBQUMsT0FBTyxLQUFLLEtBQUssVUFBVTtRQUMvQyxJQUFJLEVBQUUsQ0FBQyxLQUFVLEVBQUUsRUFBRTtZQUNuQixPQUFPLElBQUksS0FBSyxDQUFDLDZDQUE2QyxDQUFDLENBQUM7UUFDbEUsQ0FBQztLQUNGLENBQUM7SUFFRixrQkFBZSxVQUFVLENBQUMifQ==