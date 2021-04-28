// shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@coffeekraken/sugar/shared/is/plainObject"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const plainObject_1 = __importDefault(require("@coffeekraken/sugar/shared/is/plainObject"));
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
    exports.default = descriptor;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZVR5cGVEZXNjcmlwdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29yZS9zLXR5cGUvc3JjL3NoYXJlZC9kZXNjcmlwdG9ycy9kYXRlVHlwZURlc2NyaXB0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsU0FBUzs7Ozs7Ozs7Ozs7Ozs7O0lBRVQsNEZBQXdFO0lBR3hFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FrQkc7SUFDSCxNQUFNLFVBQVUsR0FBcUI7UUFDbkMsSUFBSSxFQUFFLE1BQU07UUFDWixFQUFFLEVBQUUsTUFBTTtRQUNWLEVBQUUsRUFBRSxDQUFDLEtBQVUsRUFBRSxFQUFFLENBQUMsS0FBSyxZQUFZLElBQUk7UUFDekMsSUFBSSxFQUFFLENBQUMsS0FBVSxFQUFFLEVBQUU7WUFDbkIsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7Z0JBQzdCLE9BQU8sSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDeEI7WUFDRCxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtnQkFDN0IsT0FBTyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7YUFDcEM7WUFDRCxJQUFJLHFCQUFlLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQzFCLE1BQU0sR0FBRyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7Z0JBQ3ZCLElBQUksSUFBSSxHQUFHLEdBQUcsQ0FBQyxXQUFXLEVBQUUsRUFDMUIsS0FBSyxHQUFHLENBQUMsRUFDVCxHQUFHLEdBQUcsQ0FBQyxFQUNQLEtBQUssR0FBRyxDQUFDLEVBQ1QsT0FBTyxHQUFHLENBQUMsRUFDWCxPQUFPLEdBQUcsQ0FBQyxFQUNYLFlBQVksR0FBRyxDQUFDLENBQUM7Z0JBQ25CLElBQUksS0FBSyxDQUFDLElBQUksSUFBSSxPQUFPLEtBQUssQ0FBQyxJQUFJLEtBQUssUUFBUSxFQUFFO29CQUNoRCxJQUFJLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQztpQkFDbkI7Z0JBQ0QsSUFBSSxLQUFLLENBQUMsS0FBSyxJQUFJLE9BQU8sS0FBSyxDQUFDLEtBQUssS0FBSyxRQUFRLEVBQUU7b0JBQ2xELEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDO2lCQUNyQjtnQkFDRCxJQUFJLEtBQUssQ0FBQyxHQUFHLElBQUksT0FBTyxLQUFLLENBQUMsR0FBRyxLQUFLLFFBQVEsRUFBRTtvQkFDOUMsR0FBRyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUM7aUJBQ2pCO2dCQUNELElBQUksS0FBSyxDQUFDLEtBQUssSUFBSSxPQUFPLEtBQUssQ0FBQyxLQUFLLEtBQUssUUFBUSxFQUFFO29CQUNsRCxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQztpQkFDckI7Z0JBQ0QsSUFBSSxLQUFLLENBQUMsT0FBTyxJQUFJLE9BQU8sS0FBSyxDQUFDLE9BQU8sS0FBSyxRQUFRLEVBQUU7b0JBQ3RELE9BQU8sR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDO2lCQUN6QjtnQkFDRCxJQUFJLEtBQUssQ0FBQyxPQUFPLElBQUksT0FBTyxLQUFLLENBQUMsT0FBTyxLQUFLLFFBQVEsRUFBRTtvQkFDdEQsT0FBTyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUM7aUJBQ3pCO2dCQUNELElBQUksS0FBSyxDQUFDLFlBQVksSUFBSSxPQUFPLEtBQUssQ0FBQyxZQUFZLEtBQUssUUFBUSxFQUFFO29CQUNoRSxZQUFZLEdBQUcsS0FBSyxDQUFDLFlBQVksQ0FBQztpQkFDbkM7Z0JBQ0QsT0FBTyxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxZQUFZLENBQUMsQ0FBQzthQUMxRTtZQUNELE9BQU8sSUFBSSxLQUFLLENBQ2QsNk1BQTZNLENBQzlNLENBQUM7UUFDSixDQUFDO0tBQ0YsQ0FBQztJQUVGLGtCQUFlLFVBQVUsQ0FBQyJ9