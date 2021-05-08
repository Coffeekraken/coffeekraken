"use strict";
// shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const string_1 = __importDefault(require("@coffeekraken/sugar/shared/is/string"));
const toString_1 = __importDefault(require("@coffeekraken/sugar/shared/string/toString"));
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
exports.default = descriptor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaW5nVHlwZURlc2NyaXB0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzdHJpbmdUeXBlRGVzY3JpcHRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsU0FBUzs7Ozs7QUFFVCxrRkFBOEQ7QUFDOUQsMEZBQW9FO0FBSXBFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrQkc7QUFDSCxNQUFNLFVBQVUsR0FBcUI7SUFDbkMsSUFBSSxFQUFFLFFBQVE7SUFDZCxFQUFFLEVBQUUsUUFBUTtJQUNaLEVBQUUsRUFBRSxDQUFDLEtBQVUsRUFBRSxFQUFFLENBQUMsZ0JBQVUsQ0FBQyxLQUFLLENBQUM7SUFDckMsSUFBSSxFQUFFLENBQUMsS0FBVSxFQUFFLEVBQUUsQ0FDbkIsa0JBQVUsQ0FBQyxLQUFLLEVBQUU7UUFDaEIsUUFBUSxFQUFFLElBQUk7S0FDZixDQUFDO0NBQ0wsQ0FBQztBQUVGLGtCQUFlLFVBQVUsQ0FBQyJ9