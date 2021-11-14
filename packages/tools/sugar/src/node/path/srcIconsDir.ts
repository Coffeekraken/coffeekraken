// @ts-nocheck

import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __fs from 'fs-extra';
/**
 * @name                            srcIconsDir
 * @namespace            node.path
 * @type                            Function
 * @platform        node
 * @status          beta
 *
 * Return the package dist directory path
 *
 * @param       {ISrcIconsDirSettings}       [settings={}]   Some settings to configure your temp directory process
 * @return                {String}                      The real os temp directory path
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example             js
 * import srcIconsDir from '@coffeekraken/node/fs/srcIconsDir';
 * srcIconsDir(); // => '/private/var/folders/3x/jf5977fn79jbglr7rk0tq4d00000gn/T'
 *
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

export interface ISrcIconsDirSettings {}

export default interface ISrcIconsDir {
    (settings?: ISrcIconsDirSettings): string;
}

export default function (settings: ISrcIconsDirSettings = {}) {
    settings = {
        ...settings,
    };
    const srcIconsDir = __SSugarConfig.get('storage.src.iconsDir');
    if (srcIconsDir !== undefined) {
        __fs.ensureDirSync(srcIconsDir);
        return srcIconsDir;
    }
    return undefined;
}
