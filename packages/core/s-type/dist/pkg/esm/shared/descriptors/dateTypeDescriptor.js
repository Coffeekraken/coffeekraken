// shared
import { __isPlainObject } from '@coffeekraken/sugar/is';
/**
 * @name              dateTypeDescriptor
 * @namespace         sugar.js.type.descriptor
 * @type              ISTypeDescriptor
 *
 * Describe the type "date" with some utilities methods like "is", "cast", etc...
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
    name: 'Date',
    id: 'date',
    is: (value) => value instanceof Date,
    cast: (value) => {
        if (typeof value === 'string') {
            return new Date(value);
        }
        if (typeof value === 'number') {
            return new Date(Math.round(value));
        }
        if (__isPlainObject(value)) {
            const now = new Date();
            let year = now.getFullYear(), month = 0, day = 1, hours = 0, minutes = 0, seconds = 0, milliseconds = 0;
            if (value.year && typeof value.year === 'number') {
                year = value.year;
            }
            if (value.month && typeof value.month === 'number') {
                month = value.month;
            }
            if (value.day && typeof value.day === 'number') {
                day = value.day;
            }
            if (value.hours && typeof value.hours === 'number') {
                hours = value.hours;
            }
            if (value.minutes && typeof value.minutes === 'number') {
                minutes = value.minutes;
            }
            if (value.seconds && typeof value.seconds === 'number') {
                seconds = value.seconds;
            }
            if (value.milliseconds && typeof value.milliseconds === 'number') {
                milliseconds = value.milliseconds;
            }
            return new Date(year, month, day, hours, minutes, seconds, milliseconds);
        }
        return new Error(`Sorry but for now only <yellow>String</yellow>, <yellow>Number</yellow> and <yellow>Object</yellow> (with properties: year, month, day?, hours?, minutes?, seconds? and milliseconds?) are castable to Date`);
    },
};
export default descriptor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFNBQVM7QUFFVCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFHekQ7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWtCRztBQUNILE1BQU0sVUFBVSxHQUFxQjtJQUNqQyxJQUFJLEVBQUUsTUFBTTtJQUNaLEVBQUUsRUFBRSxNQUFNO0lBQ1YsRUFBRSxFQUFFLENBQUMsS0FBVSxFQUFFLEVBQUUsQ0FBQyxLQUFLLFlBQVksSUFBSTtJQUN6QyxJQUFJLEVBQUUsQ0FBQyxLQUFVLEVBQUUsRUFBRTtRQUNqQixJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtZQUMzQixPQUFPLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzFCO1FBQ0QsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7WUFDM0IsT0FBTyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7U0FDdEM7UUFDRCxJQUFJLGVBQWUsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUN4QixNQUFNLEdBQUcsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1lBQ3ZCLElBQUksSUFBSSxHQUFHLEdBQUcsQ0FBQyxXQUFXLEVBQUUsRUFDeEIsS0FBSyxHQUFHLENBQUMsRUFDVCxHQUFHLEdBQUcsQ0FBQyxFQUNQLEtBQUssR0FBRyxDQUFDLEVBQ1QsT0FBTyxHQUFHLENBQUMsRUFDWCxPQUFPLEdBQUcsQ0FBQyxFQUNYLFlBQVksR0FBRyxDQUFDLENBQUM7WUFDckIsSUFBSSxLQUFLLENBQUMsSUFBSSxJQUFJLE9BQU8sS0FBSyxDQUFDLElBQUksS0FBSyxRQUFRLEVBQUU7Z0JBQzlDLElBQUksR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDO2FBQ3JCO1lBQ0QsSUFBSSxLQUFLLENBQUMsS0FBSyxJQUFJLE9BQU8sS0FBSyxDQUFDLEtBQUssS0FBSyxRQUFRLEVBQUU7Z0JBQ2hELEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDO2FBQ3ZCO1lBQ0QsSUFBSSxLQUFLLENBQUMsR0FBRyxJQUFJLE9BQU8sS0FBSyxDQUFDLEdBQUcsS0FBSyxRQUFRLEVBQUU7Z0JBQzVDLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDO2FBQ25CO1lBQ0QsSUFBSSxLQUFLLENBQUMsS0FBSyxJQUFJLE9BQU8sS0FBSyxDQUFDLEtBQUssS0FBSyxRQUFRLEVBQUU7Z0JBQ2hELEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDO2FBQ3ZCO1lBQ0QsSUFBSSxLQUFLLENBQUMsT0FBTyxJQUFJLE9BQU8sS0FBSyxDQUFDLE9BQU8sS0FBSyxRQUFRLEVBQUU7Z0JBQ3BELE9BQU8sR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDO2FBQzNCO1lBQ0QsSUFBSSxLQUFLLENBQUMsT0FBTyxJQUFJLE9BQU8sS0FBSyxDQUFDLE9BQU8sS0FBSyxRQUFRLEVBQUU7Z0JBQ3BELE9BQU8sR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDO2FBQzNCO1lBQ0QsSUFBSSxLQUFLLENBQUMsWUFBWSxJQUFJLE9BQU8sS0FBSyxDQUFDLFlBQVksS0FBSyxRQUFRLEVBQUU7Z0JBQzlELFlBQVksR0FBRyxLQUFLLENBQUMsWUFBWSxDQUFDO2FBQ3JDO1lBQ0QsT0FBTyxJQUFJLElBQUksQ0FDWCxJQUFJLEVBQ0osS0FBSyxFQUNMLEdBQUcsRUFDSCxLQUFLLEVBQ0wsT0FBTyxFQUNQLE9BQU8sRUFDUCxZQUFZLENBQ2YsQ0FBQztTQUNMO1FBQ0QsT0FBTyxJQUFJLEtBQUssQ0FDWiw2TUFBNk0sQ0FDaE4sQ0FBQztJQUNOLENBQUM7Q0FDSixDQUFDO0FBRUYsZUFBZSxVQUFVLENBQUMifQ==