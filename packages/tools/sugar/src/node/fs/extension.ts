// @ts-nocheck

/**
 * @name                    extension
 * @namespace            node.fs
 * @type                    Function
 * @platform        node
 * @status          beta
 *
 * Return the passed file path extension
 *
 * @param           {String}            path                The file path to get the extension from
 * @return          {String}                                The file extension
 *
 * @example         js
 * import { __extension } from '@coffeekraken/sugar/fs';
 * __extension('hello/world.jpg'); // => jpg
 *
 * @since         2.0.0
 * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __extension(path) {
    const lastPart = path.split('/').pop();
    if (!lastPart.includes('.')) return '';
    return path.split('.').pop();
}
