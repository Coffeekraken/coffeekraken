// @ts-nocheck
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
export default constructorName;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMkJHO0FBQ0gsU0FBUyxlQUFlLENBQUMsR0FBRztJQUN4QixPQUFPLEdBQUcsQ0FBQyxXQUFXLElBQUksR0FBRyxDQUFDLFdBQVcsQ0FBQyxJQUFJO1FBQzFDLENBQUMsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLElBQUk7UUFDdEIsQ0FBQyxDQUFDLElBQUksQ0FBQztBQUNmLENBQUM7QUFDRCxlQUFlLGVBQWUsQ0FBQyJ9