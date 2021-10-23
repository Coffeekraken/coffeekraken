// @ts-nocheck

import __require from '../esm/require';
// import __SugarConfig from '@coffeekraken/s-sugar-config';
import __fs from 'fs-extra';
/**
 * @name                            distImgDir
 * @namespace            node.path
 * @type                            Function
 * @platform        ts
 * @platform        node
 * @status          beta
 *
 * Return the package dist directory path
 *
 * @param       {IDistImgDirSettings}       [settings={}]   Some settings to configure your temp directory process
 * @return                {String}                      The real os temp directory path
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example             js
 * import distImgDir from '@coffeekraken/node/fs/distImgDir';
 * distImgDir(); // => '/private/var/folders/3x/jf5977fn79jbglr7rk0tq4d00000gn/T'
 *
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

export interface IDistImgDirSettings {}

export default interface IDistImgDir {
    (settings?: IDistImgDirSettings): string;
}

export default function (settings: IDistImgDirSettings = {}) {
    settings = {
        ...settings,
    };
    const __SSugarConfig = __require('@coffeekraken/s-sugar-config').default;
    const distImgDir = __SSugarConfig.get('storage.dist.imgDir');
    if (distImgDir !== undefined) {
        __fs.ensureDirSync(distImgDir);
        return distImgDir;
    }
    return undefined;
}
