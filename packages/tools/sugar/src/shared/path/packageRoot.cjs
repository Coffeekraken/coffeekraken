"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const env_1 = __importDefault(require("../core/env"));
const node_1 = __importDefault(require("../is/node"));
/**
 * @name                  packageRoot
 * @namespace            js.path
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
function packageRoot(...args) {
    if (node_1.default()) {
        const packageRootFn = require('../../node/path/packageRoot').default; // eslint-disable-line
        return packageRootFn(...args);
    }
    else {
        const environment = env_1.default('node_env') || env_1.default('environment') || env_1.default('env');
        if (environment !== 'development' && environment !== 'test')
            return '';
        return env_1.default('package_root') || '';
    }
}
exports.default = packageRoot;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFja2FnZVJvb3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy90b29scy9zdWdhci9zcmMvc2hhcmVkL3BhdGgvcGFja2FnZVJvb3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7O0FBRWQsc0RBQWdDO0FBQ2hDLHNEQUFrQztBQUVsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBd0JHO0FBQ0gsU0FBUyxXQUFXLENBQUMsR0FBRyxJQUFJO0lBQzFCLElBQUksY0FBUSxFQUFFLEVBQUU7UUFDZCxNQUFNLGFBQWEsR0FBRyxPQUFPLENBQUMsNkJBQTZCLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxzQkFBc0I7UUFDNUYsT0FBTyxhQUFhLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztLQUMvQjtTQUFNO1FBQ0wsTUFBTSxXQUFXLEdBQ2YsYUFBSyxDQUFDLFVBQVUsQ0FBQyxJQUFJLGFBQUssQ0FBQyxhQUFhLENBQUMsSUFBSSxhQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDNUQsSUFBSSxXQUFXLEtBQUssYUFBYSxJQUFJLFdBQVcsS0FBSyxNQUFNO1lBQUUsT0FBTyxFQUFFLENBQUM7UUFDdkUsT0FBTyxhQUFLLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxDQUFDO0tBQ3BDO0FBQ0gsQ0FBQztBQUNELGtCQUFlLFdBQVcsQ0FBQyJ9