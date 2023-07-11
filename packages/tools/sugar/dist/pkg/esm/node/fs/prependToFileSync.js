import __fs from 'fs';
import __writeFileSync from '../fs/writeFileSync.js';
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
export default function __prependToFileSync(path, content) {
    if (!__fs.existsSync(path)) {
        __writeFileSync(path, content);
        return;
    }
    const currentContent = __fs.readFileSync(path).toString();
    const newContent = `${content}\n${currentContent}`;
    __fs.writeFileSync(path, newContent);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUN0QixPQUFPLGVBQWUsTUFBTSx3QkFBd0IsQ0FBQztBQUVyRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNCRztBQUNILE1BQU0sQ0FBQyxPQUFPLFVBQVUsbUJBQW1CLENBQ3ZDLElBQVksRUFDWixPQUFlO0lBRWYsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDeEIsZUFBZSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztRQUMvQixPQUFPO0tBQ1Y7SUFDRCxNQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQzFELE1BQU0sVUFBVSxHQUFHLEdBQUcsT0FBTyxLQUFLLGNBQWMsRUFBRSxDQUFDO0lBQ25ELElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0FBQ3pDLENBQUMifQ==