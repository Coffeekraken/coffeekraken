import __SFile from '@coffeekraken/s-file';

/**
 * @name            sfile
 * @namespace       node.helpers
 * @type            Function
 * @platform        js
 * @platform        ts
 * @platform        node
 * @status          beta
 *
 * This helper allows you to get an SFile instance back from the passed file path
 *
 * @param       {String}        path                The path of the file
 * @return      {SFile}                         The SFile instance
 *
 * @since           2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
export default function sfile(path) {
    return __SFile.new(path);
}
