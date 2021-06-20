// @ts-nocheck
import __packageRootDir from '../path/packageRootDir';
/**
 * @name          rootPath
 * @namespace            node.package
 * @type          Function
 * @status              beta
 *
 * This function return the absolute path of your current working package
 *
 * @param           {String}              [from=process.cwd()]    Specify from where the research has to be done
 * @param           {Boolean}             [highest=false]         Specify if you want the highest package root or the first finded
 * @return    {String}          The current working package root path
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example     js
 * import json from '@coffeekraken/sugar/node/package/rootPath';
 * rootPath(); => // /something/cool/myCoolPackage'
 *
 * @since       2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
function rootPath(from = process.cwd(), highest = false) {
    return __packageRootDir(from, highest);
}
export default rootPath;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9vdFBhdGguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyb290UGF0aC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxnQkFBZ0IsTUFBTSx3QkFBd0IsQ0FBQztBQUV0RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNCRztBQUNILFNBQVMsUUFBUSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsT0FBTyxHQUFHLEtBQUs7SUFDckQsT0FBTyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDekMsQ0FBQztBQUNELGVBQWUsUUFBUSxDQUFDIn0=