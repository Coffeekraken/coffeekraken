// @ts-nocheck

import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __fs from 'fs-extra';
/**
 * @name                            srcViewsDir
 * @namespace            node.path
 * @type                            Function
 * @platform        node
 * @status          beta
 *
 * Return the package dist directory path
 *
 * @param       {ISrcViewsDirSettings}       [settings={}]   Some settings to configure your temp directory process
 * @return                {String}                      The real os temp directory path
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example             js
 * import srcViewsDir from '@coffeekraken/node/fs/srcViewsDir';
 * srcViewsDir(); // => '/private/var/folders/3x/jf5977fn79jbglr7rk0tq4d00000gn/T'
 *
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface ISrcViewsDirSettings {}

export default interface ISrcViewsDir {
    (settings?: ISrcViewsDirSettings): string;
}

export default function (settings: ISrcViewsDirSettings = {}) {
    settings = {
        ...settings,
    };
    const srcViewsDir = __SSugarConfig.get('storage.src.viewsDir');
    if (srcViewsDir !== undefined) {
        // __fs.ensureDirSync(srcViewsDir);
        return srcViewsDir;
    }
    return undefined;
}
