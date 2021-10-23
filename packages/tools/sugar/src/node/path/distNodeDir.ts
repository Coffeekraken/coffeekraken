// @ts-nocheck

import __require from '../esm/require';
// import __SugarConfig from '@coffeekraken/s-sugar-config';
import __fs from 'fs-extra';
/**
 * @name                            distNodeDir
 * @namespace            node.path
 * @type                            Function
 * @platform        ts
 * @platform        node
 * @status          beta
 *
 * Return the package dist directory path
 *
 * @param       {IDistNodeDirSettings}       [settings={}]   Some settings to configure your temp directory process
 * @return                {String}                      The real os temp directory path
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example             js
 * import distNodeDir from '@coffeekraken/node/fs/distNodeDir';
 * distNodeDir(); // => '/private/var/folders/3x/jf5977fn79jbglr7rk0tq4d00000gn/T'
 *
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

export interface IDistNodeDirSettings {}

export default interface IDistNodeDir {
    (settings?: IDistNodeDirSettings): string;
}

export default function (settings: IDistNodeDirSettings = {}) {
    settings = {
        ...settings,
    };
    const __SSugarConfig = __require('@coffeekraken/s-sugar-config').default;
    const distNodeDir = __SSugarConfig.get('storage.dist.nodeDir');
    if (distNodeDir !== undefined) {
        __fs.ensureDirSync(distNodeDir);
        return distNodeDir;
    }
    return undefined;
}
