"use strict";
// shared
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name              numberTypeDescriptor
 * @namespace         sugar.js.type.descriptor
 * @type              ISTypeDescriptor
 *
 * Describe the type "number" with some utilities methods like "is", "cast", etc...
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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
const descriptor = {
    name: 'Number',
    id: 'number',
    is: (value) => typeof value === 'number',
    cast: (value) => {
        if (typeof value !== 'string') {
            console.log('vv', value, typeof value);
            return new Error(`Sorry but only strings can be casted to numbers...`);
        }
        const res = parseFloat(value);
        if (isNaN(res))
            return new Error(`Sorry but the conversion of "<yellow>${value}</yellow>" to a <green>Number</green> does not work...`);
        return res;
    },
};
exports.default = descriptor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxTQUFTOztBQUlUOzs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrQkc7QUFDSCxNQUFNLFVBQVUsR0FBcUI7SUFDakMsSUFBSSxFQUFFLFFBQVE7SUFDZCxFQUFFLEVBQUUsUUFBUTtJQUNaLEVBQUUsRUFBRSxDQUFDLEtBQVUsRUFBRSxFQUFFLENBQUMsT0FBTyxLQUFLLEtBQUssUUFBUTtJQUM3QyxJQUFJLEVBQUUsQ0FBQyxLQUFVLEVBQUUsRUFBRTtRQUNqQixJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtZQUMzQixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsT0FBTyxLQUFLLENBQUMsQ0FBQztZQUV2QyxPQUFPLElBQUksS0FBSyxDQUNaLG9EQUFvRCxDQUN2RCxDQUFDO1NBQ0w7UUFDRCxNQUFNLEdBQUcsR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDOUIsSUFBSSxLQUFLLENBQUMsR0FBRyxDQUFDO1lBQ1YsT0FBTyxJQUFJLEtBQUssQ0FDWix3Q0FBd0MsS0FBSyx3REFBd0QsQ0FDeEcsQ0FBQztRQUNOLE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQztDQUNKLENBQUM7QUFFRixrQkFBZSxVQUFVLENBQUMifQ==