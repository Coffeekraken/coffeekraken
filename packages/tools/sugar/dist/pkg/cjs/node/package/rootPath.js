"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const packageRootDir_1 = __importDefault(require("../path/packageRootDir"));
/**
 * @name          rootPath
 * @namespace            node.package
 * @type          Function
 * @platform        node
 * @status          beta
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
    return (0, packageRootDir_1.default)(from, highest);
}
exports.default = rootPath;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLDRFQUFzRDtBQUV0RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F1Qkc7QUFDSCxTQUFTLFFBQVEsQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLE9BQU8sR0FBRyxLQUFLO0lBQ25ELE9BQU8sSUFBQSx3QkFBZ0IsRUFBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDM0MsQ0FBQztBQUNELGtCQUFlLFFBQVEsQ0FBQyJ9