// @ts-nocheck

import __SSugarConfig from '@coffeekraken/s-sugar-config';
/**
 * @name                            srcRootDir
 * @namespace            node.path
 * @type                            Function
 * @platform        node
 * @status          beta
 *
 * Return the package dist directory path
 *
 * @param       {ISrcRootDirSettings}       [settings={}]   Some settings to configure your temp directory process
 * @return                {String}                      The real os temp directory path
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example             js
 * import { __srcRootDir } from '@coffeekraken/sugar/path';
 * __srcRootDir(); // => '/private/var/folders/3x/jf5977fn79jbglr7rk0tq4d00000gn/T'
 *
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface ISrcRootDirSettings {}

export default interface ISrcRootDir {
    (settings?: ISrcRootDirSettings): string;
}

export default function __srcRootDir(settings: ISrcRootDirSettings = {}) {
    settings = {
        ...settings,
    };
    return __SSugarConfig.get('storage.src.rootDir');
}
