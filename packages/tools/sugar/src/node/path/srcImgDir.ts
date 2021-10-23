// @ts-nocheck
import __require from '../esm/require';
// import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __fs from 'fs-extra';
/**
 * @name                            srcImgDir
 * @namespace            node.path
 * @type                            Function
 * @platform        ts
 * @platform        node
 * @status          beta
 *
 * Return the package dist directory path
 *
 * @param       {ISrcImgDirSettings}       [settings={}]   Some settings to configure your temp directory process
 * @return                {String}                      The real os temp directory path
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example             js
 * import srcImgDir from '@coffeekraken/node/fs/srcImgDir';
 * srcImgDir(); // => '/private/var/folders/3x/jf5977fn79jbglr7rk0tq4d00000gn/T'
 *
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

export interface ISrcImgDirSettings {}

export default interface ISrcImgDir {
    (settings?: ISrcImgDirSettings): string;
}

export default function (settings: ISrcImgDirSettings = {}) {
    settings = {
        ...settings,
    };
    const __SSugarConfig = __require('@coffeekraken/s-sugar-config').default;
    const srcImgDir = __SSugarConfig.get('storage.src.imgDir');
    if (srcImgDir !== undefined) {
        __fs.ensureDirSync(srcImgDir);
        return srcImgDir;
    }
    return undefined;
}
