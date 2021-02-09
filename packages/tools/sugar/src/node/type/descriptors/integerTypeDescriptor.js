"use strict";
// shared
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
        if (typeof value !== 'string') {
            return new Error(`Sorry but only strings can be casted to integers...`);
        }
        const res = parseInt(value);
        if (isNaN(res))
            return new Error(`Sorry but the conversion of "<yellow>${value}</yellow>" to a <green>Integer</green> does not work...`);
        return res;
    }
};
exports.default = descriptor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZWdlclR5cGVEZXNjcmlwdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaW50ZWdlclR5cGVEZXNjcmlwdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxTQUFTOztBQUlUOzs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrQkc7QUFDSCxNQUFNLFVBQVUsR0FBcUI7SUFDbkMsSUFBSSxFQUFFLFNBQVM7SUFDZixFQUFFLEVBQUUsU0FBUztJQUNiLEVBQUUsRUFBRSxDQUFDLEtBQVUsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUM7SUFDM0MsSUFBSSxFQUFFLENBQUMsS0FBVSxFQUFFLEVBQUU7UUFDbkIsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7WUFDN0IsT0FBTyxJQUFJLEtBQUssQ0FBQyxxREFBcUQsQ0FBQyxDQUFDO1NBQ3pFO1FBQ0QsTUFBTSxHQUFHLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzVCLElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQztZQUNaLE9BQU8sSUFBSSxLQUFLLENBQ2Qsd0NBQXdDLEtBQUsseURBQXlELENBQ3ZHLENBQUM7UUFDSixPQUFPLEdBQUcsQ0FBQztJQUNiLENBQUM7Q0FDRixDQUFDO0FBRUYsa0JBQWUsVUFBVSxDQUFDIn0=