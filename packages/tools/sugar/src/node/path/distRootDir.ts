// @ts-nocheck

import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __fs from 'fs-extra';
/**
 * @name                            distRootDir
 * @namespace            node.path
 * @type                            Function
 * @platform        ts
 * @platform        node
 * @status          beta
 *
 * Return the package dist directory path
 *
 * @param       {IDistRootDirSettings}       [settings={}]   Some settings to configure your temp directory process
 * @return                {String}                      The real os temp directory path
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example             js
 * import distRootDir from '@coffeekraken/node/fs/distRootDir';
 * distRootDir(); // => '/private/var/folders/3x/jf5977fn79jbglr7rk0tq4d00000gn/T'
 *
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

export interface IDistRootDirSettings {}

export default interface IDistRootDir {
    (settings?: IDistRootDirSettings): string;
}

export default function (settings: IDistRootDirSettings = {}) {
    settings = {
        ...settings,
    };
    const distRootDir = __SSugarConfig.get('storage.dist.rootDir');
    if (distRootDir !== undefined) {
        __fs.ensureDirSync(distRootDir);
        return distRootDir;
    }
    return undefined;
}
