// @ts-nocheck
import __SSugarConfig from '@coffeekraken/s-sugar-config';

/**
 * @name                            packageTmpDir
 * @namespace            node.path
 * @type                            Function
 * @platform        node
 * @status          beta
 *
 * Return the package temp directory path
 *
 * @param       {ITmpDirSettings}       [settings={}]   Some settings to configure your temp directory process
 * @return                {String}                      The real os temp directory path
 *
 * @setting     {String}        [scope='local']         Specify the scope in which you want your tmpDir to be returned. Can be "local" or "global"
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet         __packageTmpDir()
 *
 * @example             js
 * import { __packageTmpDir } from '@coffeekraken/sugar/path';
 * __packageTmpDir(); // => '/private/var/folders/3x/jf5977fn79jbglr7rk0tq4d00000gn/T'
 *
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export default function __packageTmpDir() {
    return __SSugarConfig.get('storage.package.tmpDir');
}
