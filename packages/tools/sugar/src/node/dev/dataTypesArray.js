"use strict";
// @ts-nocheck
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = __importDefault(require("../is/node"));
/**
 * @name                    dataTypesArray
 * @namespace           sugar.js.dev
 * @type                    Array
 * @status              wip
 *
 * This is just a list of data types available in the
 * current language (node/js)
 *
 * @todo        interface
 * @todo        doc
 * @todo        move this into more appropriate folder
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
if (node_1.default()) {
    export default [
        'Number',
        'String',
        'Symbol',
        'Boolean',
        'Null',
        'Undefined',
        'Object',
        'Array',
        'JSON',
        'Function'
    ];
}
else {
    export default [
        'Number',
        'String',
        'Symbol',
        'Boolean',
        'Null',
        'Undefined',
        'Object',
        'Array',
        'JSON',
        'Function'
    ];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YVR5cGVzQXJyYXkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkYXRhVHlwZXNBcnJheS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYztBQUNkLFVBQVU7Ozs7O0FBRVYsc0RBQWtDO0FBRWxDOzs7Ozs7Ozs7Ozs7Ozs7R0FlRztBQUNILElBQUksY0FBUSxFQUFFLEVBQUU7SUFDZCxlQUFlO1FBQ2IsUUFBUTtRQUNSLFFBQVE7UUFDUixRQUFRO1FBQ1IsU0FBUztRQUNULE1BQU07UUFDTixXQUFXO1FBQ1gsUUFBUTtRQUNSLE9BQU87UUFDUCxNQUFNO1FBQ04sVUFBVTtLQUNYLENBQUM7Q0FDSDtLQUFNO0lBQ0wsZUFBZTtRQUNiLFFBQVE7UUFDUixRQUFRO1FBQ1IsUUFBUTtRQUNSLFNBQVM7UUFDVCxNQUFNO1FBQ04sV0FBVztRQUNYLFFBQVE7UUFDUixPQUFPO1FBQ1AsTUFBTTtRQUNOLFVBQVU7S0FDWCxDQUFDO0NBQ0gifQ==