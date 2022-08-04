// @ts-nocheck
import __isInPackage from '../path/isInPackage';
/**
 * @name            inPackage
 * @namespace            node.is
 * @type            Function
 * @platform        node
 * @status          beta
 *
 * This function check if the we are in (one of) the package(s) passed as parameter
 *
 * @param           {String|Array}              name             The package name to check or a string comma separated like "myPackage,another"
 * @param           {String}              [from=process.cwd()]    Specify from where the research has to be done
 * @param           {Boolean}             [highest=false]         Specify if you want the highest package root or the first finded
 * @return      {Boolean}                           true if is in the passed package, false if not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import isInPackage from '@coffeekraken/sugar/node/is/inPackage';
 * isInPackage('@coffeekraken/sugar'); // => true
 *
 * @since       2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
function inPackage(name, from = process.cwd(), highest = false) {
    return __isInPackage(name, from, highest);
}
export default inPackage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLGFBQWEsTUFBTSxxQkFBcUIsQ0FBQztBQUVoRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBd0JHO0FBQ0gsU0FBUyxTQUFTLENBQUMsSUFBSSxFQUFFLElBQUksR0FBRyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsT0FBTyxHQUFHLEtBQUs7SUFDMUQsT0FBTyxhQUFhLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztBQUM5QyxDQUFDO0FBQ0QsZUFBZSxTQUFTLENBQUMifQ==