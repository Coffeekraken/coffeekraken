// shared
/**
 * @name              booleanTypeDescriptor
 * @namespace         shared.descriptors
 * @type              ISTypeDescriptor
 * @platform            node
 * @platform            js
 * @status              beta
 * @private
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
export default descriptor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFNBQVM7QUFJVDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNCRztBQUNILE1BQU0sVUFBVSxHQUFxQjtJQUNqQyxJQUFJLEVBQUUsU0FBUztJQUNmLEVBQUUsRUFBRSxTQUFTO0lBQ2IsRUFBRSxFQUFFLENBQUMsS0FBVSxFQUFFLEVBQUUsQ0FBQyxPQUFPLEtBQUssS0FBSyxTQUFTO0lBQzlDLElBQUksRUFBRSxDQUFDLEtBQVUsRUFBRSxTQUFjLEVBQUUsRUFBRSxFQUFFO1FBQ25DLElBQUksS0FBSyxLQUFLLEtBQUssSUFBSSxNQUFNLElBQUksTUFBTSxDQUFDLGFBQWEsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUM3RCxPQUFPLElBQUksQ0FBQztTQUNmO1FBQ0QsSUFBSSxPQUFPLEtBQUssS0FBSyxTQUFTO1lBQUUsT0FBTyxLQUFLLENBQUM7UUFDN0MsSUFBSSxLQUFLLEtBQUssSUFBSSxJQUFJLEtBQUssS0FBSyxTQUFTO1lBQUUsT0FBTyxLQUFLLENBQUM7UUFDeEQsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7WUFDM0IsSUFBSSxLQUFLLEdBQUcsQ0FBQztnQkFBRSxPQUFPLElBQUksQ0FBQztZQUMzQixPQUFPLEtBQUssQ0FBQztTQUNoQjtRQUNELElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFO1lBQzNCLE9BQU8sS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO1NBQzFDO1FBQ0QsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3RCLElBQUksS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDO2dCQUFFLE9BQU8sSUFBSSxDQUFDO1lBQ2xDLE9BQU8sS0FBSyxDQUFDO1NBQ2hCO1FBQ0QsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7WUFDM0IsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO1NBQ3ZEO1FBQ0QsT0FBTyxJQUFJLEtBQUssQ0FDWjtZQUNJLDhEQUE4RDtZQUM5RCw2REFBNkQ7WUFDN0Qsa0VBQWtFO1lBQ2xFLGtIQUFrSDtZQUNsSCw0SEFBNEg7WUFDNUgsMkhBQTJIO1lBQzNILCtIQUErSDtTQUNsSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FDZixDQUFDO0lBQ04sQ0FBQztDQUNKLENBQUM7QUFFRixlQUFlLFVBQVUsQ0FBQyJ9