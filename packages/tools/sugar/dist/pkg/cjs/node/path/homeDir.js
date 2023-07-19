"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userdir_1 = __importDefault(require("userdir"));
// @ts-nocheck
/**
 * @name                            homeDir
 * @namespace            node.path
 * @type                            Function
 * @platform        node
 * @status          beta
 *
 * Return the user home directory
 *
 * @return                {String}                      The real os temp directory path
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet         __homeDir()
 *
 * @example             js
 * import { __homeDir } from '@coffeekraken/sugar/path';
 * __homeDir();
 *
 * @see         https://www.npmjs.com/package/homedir
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function homeDir() {
    return (0, userdir_1.default)();
}
exports.default = homeDir;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsc0RBQWdDO0FBRWhDLGNBQWM7QUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBd0JHO0FBQ0gsU0FBd0IsT0FBTztJQUMzQixPQUFPLElBQUEsaUJBQVMsR0FBRSxDQUFDO0FBQ3ZCLENBQUM7QUFGRCwwQkFFQyJ9