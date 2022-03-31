import __fs from 'fs';

/**
 * @name            appendToFileSync
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
 * import appendToFileSync from '@coffeekraken/sugar/node/fs/appendToFileSync';
 * appendToFileSync('/my/cool/file.txt', 'Hello world');
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function appendToFileSync(path: string, content: string): void {
    const currentContent = __fs.readFileSync(path).toString();
    const newContent = `${currentContent}\n${content}`;
    __fs.writeFileSync(path, newContent);
}
