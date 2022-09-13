"use strict";
// shared
Object.defineProperty(exports, "__esModule", { value: true });
const is_1 = require("@coffeekraken/sugar/is");
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
        if ((0, is_1.__isPlainObject)(value)) {
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
exports.default = descriptor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxTQUFTOztBQUVULCtDQUF5RDtBQUd6RDs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0JHO0FBQ0gsTUFBTSxVQUFVLEdBQXFCO0lBQ2pDLElBQUksRUFBRSxNQUFNO0lBQ1osRUFBRSxFQUFFLE1BQU07SUFDVixFQUFFLEVBQUUsQ0FBQyxLQUFVLEVBQUUsRUFBRSxDQUFDLEtBQUssWUFBWSxJQUFJO0lBQ3pDLElBQUksRUFBRSxDQUFDLEtBQVUsRUFBRSxFQUFFO1FBQ2pCLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFO1lBQzNCLE9BQU8sSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDMUI7UUFDRCxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtZQUMzQixPQUFPLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztTQUN0QztRQUNELElBQUksSUFBQSxvQkFBZSxFQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3hCLE1BQU0sR0FBRyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7WUFDdkIsSUFBSSxJQUFJLEdBQUcsR0FBRyxDQUFDLFdBQVcsRUFBRSxFQUN4QixLQUFLLEdBQUcsQ0FBQyxFQUNULEdBQUcsR0FBRyxDQUFDLEVBQ1AsS0FBSyxHQUFHLENBQUMsRUFDVCxPQUFPLEdBQUcsQ0FBQyxFQUNYLE9BQU8sR0FBRyxDQUFDLEVBQ1gsWUFBWSxHQUFHLENBQUMsQ0FBQztZQUNyQixJQUFJLEtBQUssQ0FBQyxJQUFJLElBQUksT0FBTyxLQUFLLENBQUMsSUFBSSxLQUFLLFFBQVEsRUFBRTtnQkFDOUMsSUFBSSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUM7YUFDckI7WUFDRCxJQUFJLEtBQUssQ0FBQyxLQUFLLElBQUksT0FBTyxLQUFLLENBQUMsS0FBSyxLQUFLLFFBQVEsRUFBRTtnQkFDaEQsS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUM7YUFDdkI7WUFDRCxJQUFJLEtBQUssQ0FBQyxHQUFHLElBQUksT0FBTyxLQUFLLENBQUMsR0FBRyxLQUFLLFFBQVEsRUFBRTtnQkFDNUMsR0FBRyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUM7YUFDbkI7WUFDRCxJQUFJLEtBQUssQ0FBQyxLQUFLLElBQUksT0FBTyxLQUFLLENBQUMsS0FBSyxLQUFLLFFBQVEsRUFBRTtnQkFDaEQsS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUM7YUFDdkI7WUFDRCxJQUFJLEtBQUssQ0FBQyxPQUFPLElBQUksT0FBTyxLQUFLLENBQUMsT0FBTyxLQUFLLFFBQVEsRUFBRTtnQkFDcEQsT0FBTyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUM7YUFDM0I7WUFDRCxJQUFJLEtBQUssQ0FBQyxPQUFPLElBQUksT0FBTyxLQUFLLENBQUMsT0FBTyxLQUFLLFFBQVEsRUFBRTtnQkFDcEQsT0FBTyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUM7YUFDM0I7WUFDRCxJQUFJLEtBQUssQ0FBQyxZQUFZLElBQUksT0FBTyxLQUFLLENBQUMsWUFBWSxLQUFLLFFBQVEsRUFBRTtnQkFDOUQsWUFBWSxHQUFHLEtBQUssQ0FBQyxZQUFZLENBQUM7YUFDckM7WUFDRCxPQUFPLElBQUksSUFBSSxDQUNYLElBQUksRUFDSixLQUFLLEVBQ0wsR0FBRyxFQUNILEtBQUssRUFDTCxPQUFPLEVBQ1AsT0FBTyxFQUNQLFlBQVksQ0FDZixDQUFDO1NBQ0w7UUFDRCxPQUFPLElBQUksS0FBSyxDQUNaLDZNQUE2TSxDQUNoTixDQUFDO0lBQ04sQ0FBQztDQUNKLENBQUM7QUFFRixrQkFBZSxVQUFVLENBQUMifQ==