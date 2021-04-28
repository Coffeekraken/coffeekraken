"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = __importDefault(require("../../is/node"));
/**
 * @name                    dataTypesArray
 * @namespace           shared.dev.types
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YVR5cGVzQXJyYXkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy90b29scy9zdWdhci9zcmMvc2hhcmVkL2Rldi90eXBlcy9kYXRhVHlwZXNBcnJheS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7QUFFZCx5REFBcUM7QUFFckM7Ozs7Ozs7Ozs7Ozs7OztHQWVHO0FBQ0gsSUFBSSxjQUFRLEVBQUUsRUFBRTtJQUNkLGVBQWU7UUFDYixRQUFRO1FBQ1IsUUFBUTtRQUNSLFFBQVE7UUFDUixTQUFTO1FBQ1QsTUFBTTtRQUNOLFdBQVc7UUFDWCxRQUFRO1FBQ1IsT0FBTztRQUNQLE1BQU07UUFDTixVQUFVO0tBQ1gsQ0FBQztDQUNIO0tBQU07SUFDTCxlQUFlO1FBQ2IsUUFBUTtRQUNSLFFBQVE7UUFDUixRQUFRO1FBQ1IsU0FBUztRQUNULE1BQU07UUFDTixXQUFXO1FBQ1gsUUFBUTtRQUNSLE9BQU87UUFDUCxNQUFNO1FBQ04sVUFBVTtLQUNYLENBQUM7Q0FDSCJ9