// @ts-nocheck

import __fs from 'fs';
import __deepMerge from '../../shared/object/deepMerge';

/**
 * @name            isFile
 * @namespace            node.is
 * @type            Function
 * @platform        node
 * @status          beta
 *
 * This function check if the passed string path is a file or not
 *
 * @param     {String}        path        The path to check
 * @return    {Boolean}                   true if is a file, false if not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example     js
 * import { __isFile } from '@coffeekraken/sugar/is';
 * __isFile('something/cool');
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __isFile(path, settings = {}) {
    settings = __deepMerge(
        {
            symlink: true,
        },
        settings,
    );

    let isMatching = __fs.existsSync(path);
    if (!isMatching) return false;
    if (settings.symlink && __fs.lstatSync(path).isSymbolicLink()) {
        const realPath = __fs.realpathSync(path);
        isMatching = isMatching && __fs.lstatSync(realPath).isFile();
    } else {
        isMatching = isMatching && __fs.lstatSync(path).isFile();
    }
    return isMatching;
}