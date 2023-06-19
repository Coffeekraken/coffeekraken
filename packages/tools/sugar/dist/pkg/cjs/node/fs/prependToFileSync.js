"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const writeFileSync_1 = __importDefault(require("../fs/writeFileSync"));
/**
 * @name            prependToFileSync
 * @namespace            node.fs
 * @type            Function
 * @platform        node
 * @status          beta
 *
 * This function allows you to simply append a string to a file.
 *
 * @todo        tests
 *
 * @param       {String}            path            The file path you want to check. With or without an extension
 * @param       {String}            content             The content to add to the file
 *
 * @snippet         __prependToFileSync($1, $2)
 *
 * @example         js
 * import { __prependToFileSync } from '@coffeekraken/sugar/fs';
 * __prependToFileSync('/my/cool/file.txt', 'Hello world');
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __prependToFileSync(path, content) {
    if (!fs_1.default.existsSync(path)) {
        (0, writeFileSync_1.default)(path, content);
        return;
    }
    const currentContent = fs_1.default.readFileSync(path).toString();
    const newContent = `${content}\n${currentContent}`;
    fs_1.default.writeFileSync(path, newContent);
}
exports.default = __prependToFileSync;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNENBQXNCO0FBQ3RCLHdFQUFrRDtBQUVsRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNCRztBQUNILFNBQXdCLG1CQUFtQixDQUN2QyxJQUFZLEVBQ1osT0FBZTtJQUVmLElBQUksQ0FBQyxZQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFO1FBQ3hCLElBQUEsdUJBQWUsRUFBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDL0IsT0FBTztLQUNWO0lBQ0QsTUFBTSxjQUFjLEdBQUcsWUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUMxRCxNQUFNLFVBQVUsR0FBRyxHQUFHLE9BQU8sS0FBSyxjQUFjLEVBQUUsQ0FBQztJQUNuRCxZQUFJLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxVQUFVLENBQUMsQ0FBQztBQUN6QyxDQUFDO0FBWEQsc0NBV0MifQ==