"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const temp_dir_1 = __importDefault(require("temp-dir"));
/**
 * @name                            systemTmpDir
 * @namespace            node.path
 * @type                            Function
 * @platform        node
 * @status          beta
 *
 * Return the system temp directory path
 *
 * @return                {String}                      The real os temp directory path
 * *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet         __systemTmpDir()
 *
 * @example             js
 * import { __systemTmpDir } from '@coffeekraken/sugar/path';
 * __systemTmpDir(); // => '/private/var/folders/3x/jf5977fn79jbglr7rk0tq4d00000gn/T'
 *
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __systemTmpDir() {
    return temp_dir_1.default;
}
exports.default = __systemTmpDir;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLHdEQUFnQztBQUVoQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F1Qkc7QUFFSCxTQUF3QixjQUFjO0lBQ2xDLE9BQU8sa0JBQVEsQ0FBQztBQUNwQixDQUFDO0FBRkQsaUNBRUMifQ==