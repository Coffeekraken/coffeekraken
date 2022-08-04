"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name        constructorName
 * @namespace            shared.object
 * @type      Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Return the constructor name of the passed object
 *
 * @param 		{Object} 			obj 		The object to get the constructor name from
 * @return 		{String}						The constructor name
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example 	js
 * import constructorName from '@coffeekraken/sugar/js/object/constructorName';
 * class MyCoolClass {
 * 		// class implementation...
 * }
 * const myObj = new MyCoolClass();
 * console.log(constructorName(myObj)); => MyCoolClass
 *
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function constructorName(obj) {
    return obj.constructor && obj.constructor.name
        ? obj.constructor.name
        : null;
}
exports.default = constructorName;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EyQkc7QUFDSCxTQUFTLGVBQWUsQ0FBQyxHQUFHO0lBQ3hCLE9BQU8sR0FBRyxDQUFDLFdBQVcsSUFBSSxHQUFHLENBQUMsV0FBVyxDQUFDLElBQUk7UUFDMUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsSUFBSTtRQUN0QixDQUFDLENBQUMsSUFBSSxDQUFDO0FBQ2YsQ0FBQztBQUNELGtCQUFlLGVBQWUsQ0FBQyJ9