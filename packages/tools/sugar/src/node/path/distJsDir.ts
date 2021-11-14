// @ts-nocheck

import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __fs from 'fs-extra';
/**
 * @name                            distJsDir
 * @namespace            node.path
 * @type                            Function
 * @platform        node
 * @status          beta
 *
 * Return the package dist directory path
 *
 * @param       {IDistJsDirSettings}       [settings={}]   Some settings to configure your temp directory process
 * @return                {String}                      The real os temp directory path
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example             js
 * import distJsDir from '@coffeekraken/node/fs/distJsDir';
 * distJsDir(); // => '/private/var/folders/3x/jf5977fn79jbglr7rk0tq4d00000gn/T'
 *
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

export interface IDistJsDirSettings {}

export default interface IDistJsDir {
    (settings?: IDistJsDirSettings): string;
}

export default function (settings: IDistJsDirSettings = {}) {
    settings = {
        ...settings,
    };
    const distJsDir = __SSugarConfig.get('storage.dist.jsDir');
    if (distJsDir !== undefined) {
        __fs.ensureDirSync(distJsDir);
        return distJsDir;
    }
    return undefined;
}
