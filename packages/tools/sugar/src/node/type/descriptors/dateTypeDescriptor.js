"use strict";
// shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const plainObject_1 = __importDefault(require("../../is/plainObject"));
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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
        if (plainObject_1.default(value)) {
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
    }
};
module.exports = descriptor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZVR5cGVEZXNjcmlwdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGF0ZVR5cGVEZXNjcmlwdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxTQUFTOzs7O0FBRVQsdUVBQW1EO0FBR25EOzs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrQkc7QUFDSCxNQUFNLFVBQVUsR0FBcUI7SUFDbkMsSUFBSSxFQUFFLE1BQU07SUFDWixFQUFFLEVBQUUsTUFBTTtJQUNWLEVBQUUsRUFBRSxDQUFDLEtBQVUsRUFBRSxFQUFFLENBQUMsS0FBSyxZQUFZLElBQUk7SUFDekMsSUFBSSxFQUFFLENBQUMsS0FBVSxFQUFFLEVBQUU7UUFDbkIsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7WUFDN0IsT0FBTyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUN4QjtRQUNELElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFO1lBQzdCLE9BQU8sSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1NBQ3BDO1FBQ0QsSUFBSSxxQkFBZSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQzFCLE1BQU0sR0FBRyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7WUFDdkIsSUFBSSxJQUFJLEdBQUcsR0FBRyxDQUFDLFdBQVcsRUFBRSxFQUMxQixLQUFLLEdBQUcsQ0FBQyxFQUNULEdBQUcsR0FBRyxDQUFDLEVBQ1AsS0FBSyxHQUFHLENBQUMsRUFDVCxPQUFPLEdBQUcsQ0FBQyxFQUNYLE9BQU8sR0FBRyxDQUFDLEVBQ1gsWUFBWSxHQUFHLENBQUMsQ0FBQztZQUNuQixJQUFJLEtBQUssQ0FBQyxJQUFJLElBQUksT0FBTyxLQUFLLENBQUMsSUFBSSxLQUFLLFFBQVEsRUFBRTtnQkFDaEQsSUFBSSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUM7YUFDbkI7WUFDRCxJQUFJLEtBQUssQ0FBQyxLQUFLLElBQUksT0FBTyxLQUFLLENBQUMsS0FBSyxLQUFLLFFBQVEsRUFBRTtnQkFDbEQsS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUM7YUFDckI7WUFDRCxJQUFJLEtBQUssQ0FBQyxHQUFHLElBQUksT0FBTyxLQUFLLENBQUMsR0FBRyxLQUFLLFFBQVEsRUFBRTtnQkFDOUMsR0FBRyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUM7YUFDakI7WUFDRCxJQUFJLEtBQUssQ0FBQyxLQUFLLElBQUksT0FBTyxLQUFLLENBQUMsS0FBSyxLQUFLLFFBQVEsRUFBRTtnQkFDbEQsS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUM7YUFDckI7WUFDRCxJQUFJLEtBQUssQ0FBQyxPQUFPLElBQUksT0FBTyxLQUFLLENBQUMsT0FBTyxLQUFLLFFBQVEsRUFBRTtnQkFDdEQsT0FBTyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUM7YUFDekI7WUFDRCxJQUFJLEtBQUssQ0FBQyxPQUFPLElBQUksT0FBTyxLQUFLLENBQUMsT0FBTyxLQUFLLFFBQVEsRUFBRTtnQkFDdEQsT0FBTyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUM7YUFDekI7WUFDRCxJQUFJLEtBQUssQ0FBQyxZQUFZLElBQUksT0FBTyxLQUFLLENBQUMsWUFBWSxLQUFLLFFBQVEsRUFBRTtnQkFDaEUsWUFBWSxHQUFHLEtBQUssQ0FBQyxZQUFZLENBQUM7YUFDbkM7WUFDRCxPQUFPLElBQUksSUFBSSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLFlBQVksQ0FBQyxDQUFDO1NBQzFFO1FBQ0QsT0FBTyxJQUFJLEtBQUssQ0FDZCw2TUFBNk0sQ0FDOU0sQ0FBQztJQUNKLENBQUM7Q0FDRixDQUFDO0FBRUYsaUJBQVMsVUFBVSxDQUFDIn0=