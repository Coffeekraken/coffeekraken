"use strict";
// shared
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name              undefinedTypeDescriptor
 * @namespace         sugar.js.type.descriptor
 * @type              ISTypeDescriptor
 *
 * Describe the type "undefined" with some utilities methods like "is", "cast", etc...
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
    name: 'Undefined',
    id: 'undefined',
    is: (value) => value === undefined,
    cast: (value) => {
        return undefined;
    }
};
exports.default = descriptor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5kZWZpbmVkVHlwZURlc2NyaXB0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ1bmRlZmluZWRUeXBlRGVzY3JpcHRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsU0FBUzs7QUFJVDs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0JHO0FBQ0gsTUFBTSxVQUFVLEdBQXFCO0lBQ25DLElBQUksRUFBRSxXQUFXO0lBQ2pCLEVBQUUsRUFBRSxXQUFXO0lBQ2YsRUFBRSxFQUFFLENBQUMsS0FBVSxFQUFFLEVBQUUsQ0FBQyxLQUFLLEtBQUssU0FBUztJQUN2QyxJQUFJLEVBQUUsQ0FBQyxLQUFVLEVBQUUsRUFBRTtRQUNuQixPQUFPLFNBQVMsQ0FBQztJQUNuQixDQUFDO0NBQ0YsQ0FBQztBQUVGLGtCQUFlLFVBQVUsQ0FBQyJ9