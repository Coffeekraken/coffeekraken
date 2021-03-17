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
        define(["require", "exports", "../../is/plainObject"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var plainObject_1 = __importDefault(require("../../is/plainObject"));
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
    var descriptor = {
        name: 'Date',
        id: 'date',
        is: function (value) { return value instanceof Date; },
        cast: function (value) {
            if (typeof value === 'string') {
                return new Date(value);
            }
            if (typeof value === 'number') {
                return new Date(Math.round(value));
            }
            if (plainObject_1.default(value)) {
                var now = new Date();
                var year = now.getFullYear(), month = 0, day = 1, hours = 0, minutes = 0, seconds = 0, milliseconds = 0;
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
            return new Error("Sorry but for now only <yellow>String</yellow>, <yellow>Number</yellow> and <yellow>Object</yellow> (with properties: year, month, day?, hours?, minutes?, seconds? and milliseconds?) are castable to Date");
        }
    };
    exports.default = descriptor;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZVR5cGVEZXNjcmlwdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3NoYXJlZC90eXBlL2Rlc2NyaXB0b3JzL2RhdGVUeXBlRGVzY3JpcHRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxTQUFTOzs7Ozs7Ozs7Ozs7Ozs7SUFFVCxxRUFBbUQ7SUFHbkQ7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQWtCRztJQUNILElBQU0sVUFBVSxHQUFxQjtRQUNuQyxJQUFJLEVBQUUsTUFBTTtRQUNaLEVBQUUsRUFBRSxNQUFNO1FBQ1YsRUFBRSxFQUFFLFVBQUMsS0FBVSxJQUFLLE9BQUEsS0FBSyxZQUFZLElBQUksRUFBckIsQ0FBcUI7UUFDekMsSUFBSSxFQUFFLFVBQUMsS0FBVTtZQUNmLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFO2dCQUM3QixPQUFPLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ3hCO1lBQ0QsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7Z0JBQzdCLE9BQU8sSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2FBQ3BDO1lBQ0QsSUFBSSxxQkFBZSxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUMxQixJQUFNLEdBQUcsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO2dCQUN2QixJQUFJLElBQUksR0FBRyxHQUFHLENBQUMsV0FBVyxFQUFFLEVBQzFCLEtBQUssR0FBRyxDQUFDLEVBQ1QsR0FBRyxHQUFHLENBQUMsRUFDUCxLQUFLLEdBQUcsQ0FBQyxFQUNULE9BQU8sR0FBRyxDQUFDLEVBQ1gsT0FBTyxHQUFHLENBQUMsRUFDWCxZQUFZLEdBQUcsQ0FBQyxDQUFDO2dCQUNuQixJQUFJLEtBQUssQ0FBQyxJQUFJLElBQUksT0FBTyxLQUFLLENBQUMsSUFBSSxLQUFLLFFBQVEsRUFBRTtvQkFDaEQsSUFBSSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUM7aUJBQ25CO2dCQUNELElBQUksS0FBSyxDQUFDLEtBQUssSUFBSSxPQUFPLEtBQUssQ0FBQyxLQUFLLEtBQUssUUFBUSxFQUFFO29CQUNsRCxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQztpQkFDckI7Z0JBQ0QsSUFBSSxLQUFLLENBQUMsR0FBRyxJQUFJLE9BQU8sS0FBSyxDQUFDLEdBQUcsS0FBSyxRQUFRLEVBQUU7b0JBQzlDLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDO2lCQUNqQjtnQkFDRCxJQUFJLEtBQUssQ0FBQyxLQUFLLElBQUksT0FBTyxLQUFLLENBQUMsS0FBSyxLQUFLLFFBQVEsRUFBRTtvQkFDbEQsS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUM7aUJBQ3JCO2dCQUNELElBQUksS0FBSyxDQUFDLE9BQU8sSUFBSSxPQUFPLEtBQUssQ0FBQyxPQUFPLEtBQUssUUFBUSxFQUFFO29CQUN0RCxPQUFPLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQztpQkFDekI7Z0JBQ0QsSUFBSSxLQUFLLENBQUMsT0FBTyxJQUFJLE9BQU8sS0FBSyxDQUFDLE9BQU8sS0FBSyxRQUFRLEVBQUU7b0JBQ3RELE9BQU8sR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDO2lCQUN6QjtnQkFDRCxJQUFJLEtBQUssQ0FBQyxZQUFZLElBQUksT0FBTyxLQUFLLENBQUMsWUFBWSxLQUFLLFFBQVEsRUFBRTtvQkFDaEUsWUFBWSxHQUFHLEtBQUssQ0FBQyxZQUFZLENBQUM7aUJBQ25DO2dCQUNELE9BQU8sSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsWUFBWSxDQUFDLENBQUM7YUFDMUU7WUFDRCxPQUFPLElBQUksS0FBSyxDQUNkLDZNQUE2TSxDQUM5TSxDQUFDO1FBQ0osQ0FBQztLQUNGLENBQUM7SUFFRixrQkFBZSxVQUFVLENBQUMifQ==