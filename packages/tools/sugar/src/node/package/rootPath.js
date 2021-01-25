"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const packageRoot_1 = __importDefault(require("../path/packageRoot"));
/**
 * @name          rootPath
 * @namespace     sugar.node.package
 * @type          Function
 * @beta
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
    return packageRoot_1.default(from, highest);
}
module.exports = rootPath;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9vdFBhdGguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyb290UGF0aC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7OztBQUVkLHNFQUFnRDtBQUVoRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNCRztBQUNILFNBQVMsUUFBUSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsT0FBTyxHQUFHLEtBQUs7SUFDckQsT0FBTyxxQkFBYSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztBQUN0QyxDQUFDO0FBQ0QsaUJBQVMsUUFBUSxDQUFDIn0=