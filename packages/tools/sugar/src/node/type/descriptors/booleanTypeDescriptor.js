"use strict";
// shared
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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
const descriptor = {
    name: 'Boolean',
    id: 'boolean',
    is: (value) => typeof value === 'boolean',
    cast: (value) => {
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
            '- <yellow>Object</yellow>: Will be casted as <green>true</green> when have more than 0 properties, <red>false</red> otherwise'
        ].join('\n'));
    }
};
module.exports = descriptor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9vbGVhblR5cGVEZXNjcmlwdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYm9vbGVhblR5cGVEZXNjcmlwdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxTQUFTO0FBSVQ7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWtCRztBQUNILE1BQU0sVUFBVSxHQUFxQjtJQUNuQyxJQUFJLEVBQUUsU0FBUztJQUNmLEVBQUUsRUFBRSxTQUFTO0lBQ2IsRUFBRSxFQUFFLENBQUMsS0FBVSxFQUFFLEVBQUUsQ0FBQyxPQUFPLEtBQUssS0FBSyxTQUFTO0lBQzlDLElBQUksRUFBRSxDQUFDLEtBQVUsRUFBRSxFQUFFO1FBQ25CLElBQUksT0FBTyxLQUFLLEtBQUssU0FBUztZQUFFLE9BQU8sS0FBSyxDQUFDO1FBQzdDLElBQUksS0FBSyxLQUFLLElBQUksSUFBSSxLQUFLLEtBQUssU0FBUztZQUFFLE9BQU8sS0FBSyxDQUFDO1FBQ3hELElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFO1lBQzdCLElBQUksS0FBSyxHQUFHLENBQUM7Z0JBQUUsT0FBTyxJQUFJLENBQUM7WUFDM0IsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUNELElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFO1lBQzdCLE9BQU8sS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO1NBQ3hDO1FBQ0QsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3hCLElBQUksS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDO2dCQUFFLE9BQU8sSUFBSSxDQUFDO1lBQ2xDLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7UUFDRCxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtZQUM3QixPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7U0FDckQ7UUFDRCxPQUFPLElBQUksS0FBSyxDQUNkO1lBQ0UsOERBQThEO1lBQzlELDZEQUE2RDtZQUM3RCxrRUFBa0U7WUFDbEUsa0hBQWtIO1lBQ2xILDRIQUE0SDtZQUM1SCwySEFBMkg7WUFDM0gsK0hBQStIO1NBQ2hJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUNiLENBQUM7SUFDSixDQUFDO0NBQ0YsQ0FBQztBQUVGLGlCQUFTLFVBQVUsQ0FBQyJ9