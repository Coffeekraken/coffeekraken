"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const resolve_package_path_1 = __importDefault(require("resolve-package-path"));
const path_1 = require("@coffeekraken/sugar/path");
/**
 * @name                resolvePackagePath
 * @namespace           node.module
 * @type                Function
 * @platform            node
 * @status              beta
 *
 * This function allows you to resolve a passed package name or a folder directory to it's package.json file
 *
 * @param       {String}            package         The package bane you want to get the path for
 * @param       {String}           [baseDir=`${__packageRootDir()}/node_modules`]      The directory from which to search for the package
 * @return      {String}                  The absolute path to the requested package
 *
 * @example         js
 * import { __resolvePackagePath } from '@coffeekraken/sugar/module';
 * __resolvePackagePath('something');
 *
 * @see             https://www.npmjs.com/package/resolve-package-path
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function resolvePackagePath(pkg, baseDir = `${(0, path_1.__packageRootDir)()}/node_modules`) {
    var _a;
    return (_a = (0, resolve_package_path_1.default)(pkg, baseDir)) === null || _a === void 0 ? void 0 : _a.replace(/\/package\.json$/, '');
}
exports.default = resolvePackagePath;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsZ0ZBQXdEO0FBQ3hELG1EQUE0RDtBQUU1RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFDSCxTQUF3QixrQkFBa0IsQ0FDdEMsR0FBVyxFQUNYLFVBQWtCLEdBQUcsSUFBQSx1QkFBZ0IsR0FBRSxlQUFlOztJQUV0RCxPQUFPLE1BQUEsSUFBQSw4QkFBb0IsRUFBQyxHQUFHLEVBQUUsT0FBTyxDQUFDLDBDQUFFLE9BQU8sQ0FBQyxrQkFBa0IsRUFBRSxFQUFFLENBQUMsQ0FBQztBQUMvRSxDQUFDO0FBTEQscUNBS0MifQ==