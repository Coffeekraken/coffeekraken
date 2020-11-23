"use strict";
// TODO tests
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name                    extension
 * @namespace           sugar.node.fs
 * @type                    Function
 *
 * Return the passed file path extension
 *
 * @param           {String}            path                The file path to get the extension from
 * @return          {String}                                The file extension
 *
 * @example         js
 * import extension from '@coffeekraken/sugar/node/fs/extension';
 * extension('hello/world.jpg'); // => jpg
 *
 * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function extension(path) {
    const lastPart = path.split('/').pop();
    if (!lastPart.includes('.'))
        return '';
    return path.split('.').pop();
}
exports.default = extension;
