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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9vbGVhblR5cGVEZXNjcmlwdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYm9vbGVhblR5cGVEZXNjcmlwdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFNBQVM7QUFJVDs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0JHO0FBQ0gsTUFBTSxVQUFVLEdBQXFCO0lBQ2pDLElBQUksRUFBRSxTQUFTO0lBQ2YsRUFBRSxFQUFFLFNBQVM7SUFDYixFQUFFLEVBQUUsQ0FBQyxLQUFVLEVBQUUsRUFBRSxDQUFDLE9BQU8sS0FBSyxLQUFLLFNBQVM7SUFDOUMsSUFBSSxFQUFFLENBQUMsS0FBVSxFQUFFLFNBQWMsRUFBRSxFQUFFLEVBQUU7UUFDbkMsSUFBSSxLQUFLLEtBQUssS0FBSyxJQUFJLE1BQU0sSUFBSSxNQUFNLENBQUMsYUFBYSxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQzdELE9BQU8sSUFBSSxDQUFDO1NBQ2Y7UUFFRCxJQUFJLE9BQU8sS0FBSyxLQUFLLFNBQVM7WUFBRSxPQUFPLEtBQUssQ0FBQztRQUM3QyxJQUFJLEtBQUssS0FBSyxJQUFJLElBQUksS0FBSyxLQUFLLFNBQVM7WUFBRSxPQUFPLEtBQUssQ0FBQztRQUN4RCxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtZQUMzQixJQUFJLEtBQUssR0FBRyxDQUFDO2dCQUFFLE9BQU8sSUFBSSxDQUFDO1lBQzNCLE9BQU8sS0FBSyxDQUFDO1NBQ2hCO1FBQ0QsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7WUFDM0IsT0FBTyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7U0FDMUM7UUFDRCxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDdEIsSUFBSSxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUM7Z0JBQUUsT0FBTyxJQUFJLENBQUM7WUFDbEMsT0FBTyxLQUFLLENBQUM7U0FDaEI7UUFDRCxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtZQUMzQixPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7U0FDdkQ7UUFDRCxPQUFPLElBQUksS0FBSyxDQUNaO1lBQ0ksOERBQThEO1lBQzlELDZEQUE2RDtZQUM3RCxrRUFBa0U7WUFDbEUsa0hBQWtIO1lBQ2xILDRIQUE0SDtZQUM1SCwySEFBMkg7WUFDM0gsK0hBQStIO1NBQ2xJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUNmLENBQUM7SUFDTixDQUFDO0NBQ0osQ0FBQztBQUVGLGVBQWUsVUFBVSxDQUFDIn0=