"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
/**
 * @name                            packageLocalDir
 * @namespace            node.fs
 * @type                            Function
 * @platform        node
 * @status          beta
 *
 * Return the .local directory path
 *
 * @return                {String}                      The path to the .local package directory path
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example             js
 * import packageLocalDir from '@coffeekraken/node/path/packageLocalDir';
 * packageLocalDir(); // => '/my/cool/path/.local'
 *
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
const fn = function () {
    const path = s_sugar_config_1.default.get('storage.package.localDir');
    // __fs.ensureDirSync(path);
    return path;
};
exports.default = fn;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLGtGQUEwRDtBQUMxRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBcUJHO0FBQ0gsTUFBTSxFQUFFLEdBQXFCO0lBQ3pCLE1BQU0sSUFBSSxHQUFHLHdCQUFjLENBQUMsR0FBRyxDQUFDLDBCQUEwQixDQUFDLENBQUM7SUFDNUQsNEJBQTRCO0lBQzVCLE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUMsQ0FBQztBQUNGLGtCQUFlLEVBQUUsQ0FBQyJ9