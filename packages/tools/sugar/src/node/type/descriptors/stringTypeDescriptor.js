"use strict";
// shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const string_1 = __importDefault(require("../../is/string"));
const toString_1 = __importDefault(require("../../string/toString"));
/**
 * @name              stringTypeDescriptor
 * @namespace         sugar.js.type.descriptor
 * @type              ISTypeDescriptor
 *
 * Describe the type "string" with some utilities methods like "is", "cast", etc...
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
    name: 'String',
    id: 'string',
    is: (value) => string_1.default(value),
    cast: (value) => toString_1.default(value, {
        beautify: true
    })
};
module.exports = descriptor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaW5nVHlwZURlc2NyaXB0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzdHJpbmdUeXBlRGVzY3JpcHRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsU0FBUzs7OztBQUVULDZEQUF5QztBQUN6QyxxRUFBK0M7QUFJL0M7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWtCRztBQUNILE1BQU0sVUFBVSxHQUFxQjtJQUNuQyxJQUFJLEVBQUUsUUFBUTtJQUNkLEVBQUUsRUFBRSxRQUFRO0lBQ1osRUFBRSxFQUFFLENBQUMsS0FBVSxFQUFFLEVBQUUsQ0FBQyxnQkFBVSxDQUFDLEtBQUssQ0FBQztJQUNyQyxJQUFJLEVBQUUsQ0FBQyxLQUFVLEVBQUUsRUFBRSxDQUNuQixrQkFBVSxDQUFDLEtBQUssRUFBRTtRQUNoQixRQUFRLEVBQUUsSUFBSTtLQUNmLENBQUM7Q0FDTCxDQUFDO0FBRUYsaUJBQVMsVUFBVSxDQUFDIn0=