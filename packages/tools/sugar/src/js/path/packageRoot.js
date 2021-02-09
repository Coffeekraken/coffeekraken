"use strict";
// @ts-nocheck
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const env_1 = __importDefault(require("../core/env"));
/**
 * @name                  packageRoot
 * @namespace             sugar.js.path
 * @type                  Function
 * @env                   development
 * @status              beta
 *
 * This function return the path where stands the package in the filesystem.
 * !!! This function works only in development mode cause it will be dangerous to
 * expose this kind on information on a website...
 * If the environment is not the good one, this function will simply return an empty string
 *
 * @return        {String}                Either the package root path if available, or an empty string if not...
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example     js
 * import packageRoot from '@coffeekraken/sugar/js/path/packageRoot';
 * packageRoot(); // => /Users/something/hello/world
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com
 */
function packageRoot() {
    const environment = env_1.default('node_env') || env_1.default('environment') || env_1.default('env');
    if (environment !== 'development' && environment !== 'test')
        return '';
    return env_1.default('package_root') || '';
}
exports.default = packageRoot;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFja2FnZVJvb3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwYWNrYWdlUm9vdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYztBQUNkLFVBQVU7Ozs7O0FBRVYsc0RBQWdDO0FBRWhDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F3Qkc7QUFDSCxTQUFTLFdBQVc7SUFDbEIsTUFBTSxXQUFXLEdBQUcsYUFBSyxDQUFDLFVBQVUsQ0FBQyxJQUFJLGFBQUssQ0FBQyxhQUFhLENBQUMsSUFBSSxhQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDOUUsSUFBSSxXQUFXLEtBQUssYUFBYSxJQUFJLFdBQVcsS0FBSyxNQUFNO1FBQUUsT0FBTyxFQUFFLENBQUM7SUFDdkUsT0FBTyxhQUFLLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxDQUFDO0FBQ3JDLENBQUM7QUFDRCxrQkFBZSxXQUFXLENBQUMifQ==