"use strict";
// shared
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name              mapTypeDescriptor
 * @namespace         sugar.js.type.descriptor
 * @type              ISTypeDescriptor
 *
 * Describe the type "set" with some utilities methods like "is", "cast", etc...
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
    name: 'Set',
    id: 'set',
    is: (value) => value instanceof Set,
    cast: (value) => {
        if (value instanceof Set)
            return value;
        const set = new Set();
        set.add(value);
        return set;
    }
};
exports.default = descriptor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0VHlwZURlc2NyaXB0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzZXRUeXBlRGVzY3JpcHRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsU0FBUzs7QUFJVDs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0JHO0FBQ0gsTUFBTSxVQUFVLEdBQXFCO0lBQ25DLElBQUksRUFBRSxLQUFLO0lBQ1gsRUFBRSxFQUFFLEtBQUs7SUFDVCxFQUFFLEVBQUUsQ0FBQyxLQUFVLEVBQUUsRUFBRSxDQUFDLEtBQUssWUFBWSxHQUFHO0lBQ3hDLElBQUksRUFBRSxDQUFDLEtBQVUsRUFBRSxFQUFFO1FBQ25CLElBQUksS0FBSyxZQUFZLEdBQUc7WUFBRSxPQUFPLEtBQUssQ0FBQztRQUN2QyxNQUFNLEdBQUcsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ3RCLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDZixPQUFPLEdBQUcsQ0FBQztJQUNiLENBQUM7Q0FDRixDQUFDO0FBRUYsa0JBQWUsVUFBVSxDQUFDIn0=