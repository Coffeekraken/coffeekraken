"use strict";
// shared
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name              booleanTypeDescriptor
 * @namespace         sugar.js.type.descriptor
 * @type              ISTypeDescriptor
 *
 * Describe the type "boolean" with some utilities methods like "is", "cast", etc...
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
    name: 'Boolean',
    id: 'boolean',
    is: (value) => typeof value === 'boolean',
    cast: (value, params = {}) => {
        if (value !== false && params && params.nullishAsTrue && !value) {
            return true;
        }
        if (typeof value === 'boolean')
            return value;
        if (value === null || value === undefined)
            return false;
        if (typeof value === 'number') {
            if (value > 0)
                return true;
            return false;
        }
        if (typeof value === 'string') {
            return value.length > 0 ? true : false;
        }
        if (Array.isArray(value)) {
            if (value.length > 0)
                return true;
            return false;
        }
        if (typeof value === 'object') {
            return Object.keys(value).length > 0 ? true : false;
        }
        return new Error([
            `Sorry but for now only these types can be casted to boolean:`,
            '- <yellow>null</yellow>: Will be casted as <red>false</red>',
            '- <yellow>undefined</yellow>: Will be casted as <red>false</red>',
            '- <yellow>Number</yellow>: Will be casted as <green>true</green> when greater than 0, <red>false</red> otherwise',
            '- <yellow>String</yellow>: Will be casted as <green>true</green> when longer than 0 characters, <red>false</red> otherwise',
            '- <yellow>Array</yellow>: Will be casted as <green>true</green> when having more than 0 items, <red>false</red> otherwise',
            '- <yellow>Object</yellow>: Will be casted as <green>true</green> when have more than 0 properties, <red>false</red> otherwise',
        ].join('\n'));
    },
};
exports.default = descriptor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxTQUFTOztBQUlUOzs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrQkc7QUFDSCxNQUFNLFVBQVUsR0FBcUI7SUFDakMsSUFBSSxFQUFFLFNBQVM7SUFDZixFQUFFLEVBQUUsU0FBUztJQUNiLEVBQUUsRUFBRSxDQUFDLEtBQVUsRUFBRSxFQUFFLENBQUMsT0FBTyxLQUFLLEtBQUssU0FBUztJQUM5QyxJQUFJLEVBQUUsQ0FBQyxLQUFVLEVBQUUsU0FBYyxFQUFFLEVBQUUsRUFBRTtRQUNuQyxJQUFJLEtBQUssS0FBSyxLQUFLLElBQUksTUFBTSxJQUFJLE1BQU0sQ0FBQyxhQUFhLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDN0QsT0FBTyxJQUFJLENBQUM7U0FDZjtRQUNELElBQUksT0FBTyxLQUFLLEtBQUssU0FBUztZQUFFLE9BQU8sS0FBSyxDQUFDO1FBQzdDLElBQUksS0FBSyxLQUFLLElBQUksSUFBSSxLQUFLLEtBQUssU0FBUztZQUFFLE9BQU8sS0FBSyxDQUFDO1FBQ3hELElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFO1lBQzNCLElBQUksS0FBSyxHQUFHLENBQUM7Z0JBQUUsT0FBTyxJQUFJLENBQUM7WUFDM0IsT0FBTyxLQUFLLENBQUM7U0FDaEI7UUFDRCxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtZQUMzQixPQUFPLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztTQUMxQztRQUNELElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUN0QixJQUFJLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQztnQkFBRSxPQUFPLElBQUksQ0FBQztZQUNsQyxPQUFPLEtBQUssQ0FBQztTQUNoQjtRQUNELElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFO1lBQzNCLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztTQUN2RDtRQUNELE9BQU8sSUFBSSxLQUFLLENBQ1o7WUFDSSw4REFBOEQ7WUFDOUQsNkRBQTZEO1lBQzdELGtFQUFrRTtZQUNsRSxrSEFBa0g7WUFDbEgsNEhBQTRIO1lBQzVILDJIQUEySDtZQUMzSCwrSEFBK0g7U0FDbEksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQ2YsQ0FBQztJQUNOLENBQUM7Q0FDSixDQUFDO0FBRUYsa0JBQWUsVUFBVSxDQUFDIn0=