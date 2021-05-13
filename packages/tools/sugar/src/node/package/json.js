// @ts-nocheck
import __packageRoot from './rootPath';
import __fs from 'fs';
/**
 * @name          json
 * @namespace            node.package
 * @type          Function
 * @status              beta
 *
 * This function return you the package.json of the current working package into object format
 *
 * @param     {String}      [from=process.cwd()]      The path from where to search upward for the package.json file
 * @return    {Object}          The package.json into object format
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example     js
 * import json from '@coffeekraken/sugar/node/package/json';
 * json();
 *
 * @since       2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
function json(from = process.cwd(), highest = false) {
    const path = `${__packageRoot(from, highest)}/package.json`;
    if (!__fs.existsSync(path))
        return false;
    return require(path);
}
export default json;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImpzb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkLE9BQU8sYUFBYSxNQUFNLFlBQVksQ0FBQztBQUN2QyxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFFdEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXFCRztBQUNILFNBQVMsSUFBSSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsT0FBTyxHQUFHLEtBQUs7SUFDakQsTUFBTSxJQUFJLEdBQUcsR0FBRyxhQUFhLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxlQUFlLENBQUM7SUFDNUQsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDO1FBQUUsT0FBTyxLQUFLLENBQUM7SUFDekMsT0FBTyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDdkIsQ0FBQztBQUNELGVBQWUsSUFBSSxDQUFDIn0=