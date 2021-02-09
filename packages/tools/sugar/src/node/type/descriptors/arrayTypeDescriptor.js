"use strict";
// shared
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
    is: (value) => Array.isArray(value),
    cast: (value) => {
        if (Array.isArray(value))
            return value;
        return [value];
    }
};
exports.default = descriptor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyYXlUeXBlRGVzY3JpcHRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFycmF5VHlwZURlc2NyaXB0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLFNBQVM7O0FBTVQ7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWtCRztBQUNILE1BQU0sVUFBVSxHQUFxQjtJQUNuQyxJQUFJLEVBQUUsT0FBTztJQUNiLEVBQUUsRUFBRSxPQUFPO0lBQ1gsRUFBRSxFQUFFLENBQUMsS0FBVSxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQztJQUN4QyxJQUFJLEVBQUUsQ0FBQyxLQUFVLEVBQUUsRUFBRTtRQUNuQixJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO1lBQUUsT0FBTyxLQUFLLENBQUM7UUFDdkMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2pCLENBQUM7Q0FDRixDQUFDO0FBRUYsa0JBQWUsVUFBVSxDQUFDIn0=