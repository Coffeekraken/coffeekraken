// @ts-nocheck
import __SSugarConfig from '@coffeekraken/s-sugar-config';
/**
 * @name                            srcImgDir
 * @namespace            node.path
 * @type                            Function
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
 * @snippet         __srcImgDir()
 * 
 * @example             js
 * import { __srcImgDir } from '@coffeekraken/sugar/path';
 * __srcImgDir(); // => '/private/var/folders/3x/jf5977fn79jbglr7rk0tq4d00000gn/T'
 *
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface ISrcImgDirSettings {}

export default interface ISrcImgDir {
    (settings?: ISrcImgDirSettings): string;
}

export default function __srcImgDir(settings: ISrcImgDirSettings = {}) {
    settings = {
        ...settings,
    };
    return __SSugarConfig.get('storage.src.imgDir');
}
