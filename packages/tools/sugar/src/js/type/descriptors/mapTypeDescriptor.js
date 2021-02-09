"use strict";
// shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const map_1 = __importDefault(require("../../is/map"));
/**
 * @name              mapTypeDescriptor
 * @namespace         sugar.js.type.descriptor
 * @type              ISTypeDescriptor
 *
 * Describe the type "map" with some utilities methods like "is", "cast", etc...
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
    name: 'Map',
    id: 'map',
    is: (value) => map_1.default(value),
    cast: (value) => {
        if (map_1.default(value))
            return value;
        const map = new Map();
        map.set('value', value);
        return map;
    }
};
exports.default = descriptor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwVHlwZURlc2NyaXB0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJtYXBUeXBlRGVzY3JpcHRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsU0FBUzs7Ozs7QUFFVCx1REFBbUM7QUFJbkM7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWtCRztBQUNILE1BQU0sVUFBVSxHQUFxQjtJQUNuQyxJQUFJLEVBQUUsS0FBSztJQUNYLEVBQUUsRUFBRSxLQUFLO0lBQ1QsRUFBRSxFQUFFLENBQUMsS0FBVSxFQUFFLEVBQUUsQ0FBQyxhQUFPLENBQUMsS0FBSyxDQUFDO0lBQ2xDLElBQUksRUFBRSxDQUFDLEtBQVUsRUFBRSxFQUFFO1FBQ25CLElBQUksYUFBTyxDQUFDLEtBQUssQ0FBQztZQUFFLE9BQU8sS0FBSyxDQUFDO1FBQ2pDLE1BQU0sR0FBRyxHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7UUFDdEIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDeEIsT0FBTyxHQUFHLENBQUM7SUFDYixDQUFDO0NBQ0YsQ0FBQztBQUVGLGtCQUFlLFVBQVUsQ0FBQyJ9