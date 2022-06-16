// @ts-nocheck

import __SSugarConfig from '@coffeekraken/s-sugar-config';
/**
 * @name                            sugarRootDir
 * @namespace            node.path
 * @type                            Function
 * @platform        node
 * @status          beta
 *
 * Return the sugar package directory path
 *
 * @return                {String}                      The real os temp directory path
 *
 * @setting     {String}        [scope='local']         Specify the scope in which you want your sugarRootDir to be returned. Can be "local" or "global"
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example             js
 * import sugarRootDir from '@coffeekraken/node/fs/sugarRootDir';
 * sugarRootDir(); // => '/something/node_modules/@coffeekraken/sugar'
 *
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface ISugarRootDirSettings {}

export interface ISugarRootDir {
    (settings?: ISugarRootDirSettings): string;
}

export default function (settings: ISugarRootDirSettings = {}) {
    settings = {
        ...settings,
    };
    const sugarRootDir = __SSugarConfig.get('storage.sugar.rootDir');
    if (sugarRootDir !== undefined) {
        // __fs.ensureDirSync(sugarRootDir);
        return sugarRootDir;
    }
}
