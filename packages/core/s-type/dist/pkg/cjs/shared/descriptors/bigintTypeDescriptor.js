"use strict";
// shared
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name              bigintTypeDescriptor
 * @namespace         sugar.js.type.descriptor
 * @type              ISTypeDescriptor
 *
 * Describe the type "bigint" with some utilities methods like "is", "cast", etc...
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
    name: 'Bigint',
    id: 'bigint',
    is: (value) => typeof value === 'bigint',
    cast: (value) => {
        if (typeof value === 'bigint')
            return value;
        if (typeof value !== 'string' && typeof value !== 'number') {
            return new Error(`Sorry but only <yellow>String</yellow> and <yellow>Number</yellow> can be casted to <green>Bigint</green>`);
        }
        let res;
        try {
            res = BigInt(value);
        }
        catch (e) {
            res = new Error(`It seem's that the passed value "<yellow>${value}</yellow>" can not be casted to a <green>BigInt</green>`);
        }
        return res;
    },
};
exports.default = descriptor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxTQUFTOztBQUlUOzs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrQkc7QUFDSCxNQUFNLFVBQVUsR0FBcUI7SUFDakMsSUFBSSxFQUFFLFFBQVE7SUFDZCxFQUFFLEVBQUUsUUFBUTtJQUNaLEVBQUUsRUFBRSxDQUFDLEtBQVUsRUFBRSxFQUFFLENBQUMsT0FBTyxLQUFLLEtBQUssUUFBUTtJQUM3QyxJQUFJLEVBQUUsQ0FBQyxLQUFVLEVBQUUsRUFBRTtRQUNqQixJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVE7WUFBRSxPQUFPLEtBQUssQ0FBQztRQUM1QyxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7WUFDeEQsT0FBTyxJQUFJLEtBQUssQ0FDWiwyR0FBMkcsQ0FDOUcsQ0FBQztTQUNMO1FBQ0QsSUFBSSxHQUFRLENBQUM7UUFDYixJQUFJO1lBQ0EsR0FBRyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUN2QjtRQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ1IsR0FBRyxHQUFHLElBQUksS0FBSyxDQUNYLDRDQUE0QyxLQUFLLHlEQUF5RCxDQUM3RyxDQUFDO1NBQ0w7UUFDRCxPQUFPLEdBQUcsQ0FBQztJQUNmLENBQUM7Q0FDSixDQUFDO0FBRUYsa0JBQWUsVUFBVSxDQUFDIn0=