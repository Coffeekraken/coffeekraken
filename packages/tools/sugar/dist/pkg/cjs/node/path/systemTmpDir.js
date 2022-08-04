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
 * @example             js
 * import systemTmpDir from '@coffeekraken/node/fs/systemTmpDir';
 * systemTmpDir(); // => '/private/var/folders/3x/jf5977fn79jbglr7rk0tq4d00000gn/T'
 *
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function default_1() {
    const tmpDir = temp_dir_1.default;
    return tmpDir;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLHdEQUFnQztBQUVoQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBcUJHO0FBRUg7SUFDSSxNQUFNLE1BQU0sR0FBRyxrQkFBUSxDQUFDO0lBQ3hCLE9BQU8sTUFBTSxDQUFDO0FBQ2xCLENBQUM7QUFIRCw0QkFHQyJ9