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
//# sourceMappingURL=module.js.map