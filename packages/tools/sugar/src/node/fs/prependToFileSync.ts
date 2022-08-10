import __fs from 'fs';
import __writeFileSync from './writeFileSync';

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
export default function prependToFileSync(path: string, content: string): void {
    if (!__fs.existsSync(path)) {
        __writeFileSync(path, content);
        return;
    }
    const currentContent = __fs.readFileSync(path).toString();
    const newContent = `${content}\n${currentContent}`;
    __fs.writeFileSync(path, newContent);
}
