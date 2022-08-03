"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
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
 * @example         js
 * import prependToFileSync from '@coffeekraken/sugar/node/fs/prependToFileSync';
 * prependToFileSync('/my/cool/file.txt', 'Hello world');
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function prependToFileSync(path, content) {
    const currentContent = fs_1.default.readFileSync(path).toString();
    const newContent = `${content}\n${currentContent}`;
    fs_1.default.writeFileSync(path, newContent);
}
exports.default = prependToFileSync;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNENBQXNCO0FBRXRCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUNILFNBQXdCLGlCQUFpQixDQUFDLElBQVksRUFBRSxPQUFlO0lBQ25FLE1BQU0sY0FBYyxHQUFHLFlBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDMUQsTUFBTSxVQUFVLEdBQUcsR0FBRyxPQUFPLEtBQUssY0FBYyxFQUFFLENBQUM7SUFDbkQsWUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDLENBQUM7QUFDekMsQ0FBQztBQUpELG9DQUlDIn0=