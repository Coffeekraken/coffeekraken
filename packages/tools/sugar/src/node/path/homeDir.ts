// import __userdir from 'userdir';

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
export default function homeDir() {
    return 'coco';
    // return __userdir();
}
