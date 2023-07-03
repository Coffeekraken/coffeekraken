// shared
import { __isPlainObject } from '@coffeekraken/sugar/is';
/**
 * @name              dateTypeDescriptor
 * @namespace         shared.descriptor
 * @type              ISTypeDescriptor
 * @platform            node
 * @platform            js
 * @status              beta
 * @private
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFNBQVM7QUFFVCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFHekQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FzQkc7QUFDSCxNQUFNLFVBQVUsR0FBcUI7SUFDakMsSUFBSSxFQUFFLE1BQU07SUFDWixFQUFFLEVBQUUsTUFBTTtJQUNWLEVBQUUsRUFBRSxDQUFDLEtBQVUsRUFBRSxFQUFFLENBQUMsS0FBSyxZQUFZLElBQUk7SUFDekMsSUFBSSxFQUFFLENBQUMsS0FBVSxFQUFFLEVBQUU7UUFDakIsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7WUFDM0IsT0FBTyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUMxQjtRQUNELElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFO1lBQzNCLE9BQU8sSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1NBQ3RDO1FBQ0QsSUFBSSxlQUFlLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDeEIsTUFBTSxHQUFHLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztZQUN2QixJQUFJLElBQUksR0FBRyxHQUFHLENBQUMsV0FBVyxFQUFFLEVBQ3hCLEtBQUssR0FBRyxDQUFDLEVBQ1QsR0FBRyxHQUFHLENBQUMsRUFDUCxLQUFLLEdBQUcsQ0FBQyxFQUNULE9BQU8sR0FBRyxDQUFDLEVBQ1gsT0FBTyxHQUFHLENBQUMsRUFDWCxZQUFZLEdBQUcsQ0FBQyxDQUFDO1lBQ3JCLElBQUksS0FBSyxDQUFDLElBQUksSUFBSSxPQUFPLEtBQUssQ0FBQyxJQUFJLEtBQUssUUFBUSxFQUFFO2dCQUM5QyxJQUFJLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQzthQUNyQjtZQUNELElBQUksS0FBSyxDQUFDLEtBQUssSUFBSSxPQUFPLEtBQUssQ0FBQyxLQUFLLEtBQUssUUFBUSxFQUFFO2dCQUNoRCxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQzthQUN2QjtZQUNELElBQUksS0FBSyxDQUFDLEdBQUcsSUFBSSxPQUFPLEtBQUssQ0FBQyxHQUFHLEtBQUssUUFBUSxFQUFFO2dCQUM1QyxHQUFHLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQzthQUNuQjtZQUNELElBQUksS0FBSyxDQUFDLEtBQUssSUFBSSxPQUFPLEtBQUssQ0FBQyxLQUFLLEtBQUssUUFBUSxFQUFFO2dCQUNoRCxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQzthQUN2QjtZQUNELElBQUksS0FBSyxDQUFDLE9BQU8sSUFBSSxPQUFPLEtBQUssQ0FBQyxPQUFPLEtBQUssUUFBUSxFQUFFO2dCQUNwRCxPQUFPLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQzthQUMzQjtZQUNELElBQUksS0FBSyxDQUFDLE9BQU8sSUFBSSxPQUFPLEtBQUssQ0FBQyxPQUFPLEtBQUssUUFBUSxFQUFFO2dCQUNwRCxPQUFPLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQzthQUMzQjtZQUNELElBQUksS0FBSyxDQUFDLFlBQVksSUFBSSxPQUFPLEtBQUssQ0FBQyxZQUFZLEtBQUssUUFBUSxFQUFFO2dCQUM5RCxZQUFZLEdBQUcsS0FBSyxDQUFDLFlBQVksQ0FBQzthQUNyQztZQUNELE9BQU8sSUFBSSxJQUFJLENBQ1gsSUFBSSxFQUNKLEtBQUssRUFDTCxHQUFHLEVBQ0gsS0FBSyxFQUNMLE9BQU8sRUFDUCxPQUFPLEVBQ1AsWUFBWSxDQUNmLENBQUM7U0FDTDtRQUNELE9BQU8sSUFBSSxLQUFLLENBQ1osNk1BQTZNLENBQ2hOLENBQUM7SUFDTixDQUFDO0NBQ0osQ0FBQztBQUVGLGVBQWUsVUFBVSxDQUFDIn0=