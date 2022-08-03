"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const es5_1 = __importDefault(require("aggregation/es5"));
/**
 * @name                multipleExtends
 * @namespace           shared.class.utils
 * @type                Function
 * @platform          js
 * @platform          node
 * @status          alpha
 *
 * This function allows you to extends your class with multiple other ones.
 *
 * @param     {Class}           ...classes          All the classed you want to extend the first one with
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example         js
 * import multipleExtends from '@coffeekraken/sugar/shared/class/utils/multipleExtends';
 * class MyCoolClass extends multipleExtends(Another, AnotherOne) {
 * }
 *
 * @see       https://www.npmjs.com/package/aggregation
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
exports.default = (...classes) => {
    return (0, es5_1.default)(...classes);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLDBEQUE0QztBQUU1Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBd0JHO0FBQ0gsa0JBQWUsQ0FBQyxHQUFHLE9BQU8sRUFBRSxFQUFFO0lBQzFCLE9BQU8sSUFBQSxhQUFhLEVBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQztBQUNyQyxDQUFDLENBQUMifQ==