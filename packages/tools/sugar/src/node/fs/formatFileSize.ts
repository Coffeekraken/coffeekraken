import __filesize from 'filesize';

// TODO tests

/**
 * @name                                    formatFileSize
 * @namespace           sugar.node.fs
 * @type                                    Function
 *
 * Transform into human readable string a file size from a number (float or integer) or string.
 * This function use the wonderfull "filesize" npm package under the houd.
 *
 * @param               {Number|String}             size              The size to transform
 * @param               {Object}                    [settings={}]     The "filesize" settings to customize the output
 * @return              {String}                                      The human readable version of the passed size
 *
 * @example             js
 * import formatFilesize from '@coffeekraken/sugar/node/fs/formatFileSize';
 * formatFileSize(163931); // => 326.86 KB
 *
 * @see             https://www.npmjs.com/package/filesize
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function formatFileSize(size, settings = {}) {
  return __filesize(size, settings);
}
