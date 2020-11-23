"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
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
 * import isDirectory from '@coffeekraken/sugar/node/is/directory';
 * isDirectory('something/cool');
 *
 * @todo        Tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function isDirectory(path, settings = {}) {
    settings = deepMerge_1.default({
        symlink: true
    }, settings);
    let isMatching = fs_1.default.existsSync(path);
    if (!isMatching)
        return false;
    if (settings.symlink && fs_1.default.lstatSync(path).isSymbolicLink()) {
        const realPath = fs_1.default.realpathSync(path);
        isMatching = isMatching && fs_1.default.lstatSync(realPath).isDirectory();
    }
    else {
        isMatching = isMatching && fs_1.default.lstatSync(path).isDirectory();
    }
    return isMatching;
}
exports.default = isDirectory;
