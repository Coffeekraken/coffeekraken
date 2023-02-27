// @ts-nocheck
import __fs from 'fs';

/**
 * @name                            grabFirstExistingSync
 * @namespace            node.fs
 * @type                            Function
 * @platform        node
 * @status          beta
 *
 * Check every passed paths and return the first existing one.
 *
 * @param         {String[]}            paths              The paths to check
 * @return          {String}                            The first existing path
 *
 * @snippet         __gradFirst
 * 
 * @example       js
 * import { __grabFirstExistinSync } from '@coffeekraken/sugar/fs';
 * __grabFirstExisting([
 *  'file/1.txt',
 *  'file/2.txt
 * ]); // => 'file/2.txt'
' *
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __grabFirstExistingSync(paths: string[]): string {
    for (let [idx, path] of Object.entries(paths)) {
        if (__fs.existsSync(path)) return path;
    }
}
