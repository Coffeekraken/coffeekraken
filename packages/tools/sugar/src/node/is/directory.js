"use strict";
const __fs = require('fs');
const __deepMerge = require('../object/deepMerge');
/**
 * @name            directory
 * @namespace           sugar.node.is
 * @type            Function
 *
 * This function check if the passed string path is a directory or not
 *
 * @param     {String}        path        The path to check
 * @return    {Boolean}                   true if is a directory, false if not
 *
 * @example     js
 * const isDirectory = require('@coffeekraken/sugar/node/is/directory');
 * isDirectory('something/cool');
 *
 * @todo        Tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function isDirectory(path, settings = {}) {
    settings = __deepMerge({
        symlink: true
    }, settings);
    let isMatching = __fs.existsSync(path);
    if (!isMatching)
        return false;
    if (settings.symlink && __fs.lstatSync(path).isSymbolicLink()) {
        const realPath = __fs.realpathSync(path);
        isMatching = isMatching && __fs.lstatSync(realPath).isDirectory();
    }
    else {
        isMatching = isMatching && __fs.lstatSync(path).isDirectory();
    }
    return isMatching;
};
