// @ts-nocheck

import __SSugarConfig from '@coffeekraken/s-sugar-config';
/**
 * @name                            distCssDir
 * @namespace            node.path
 * @type                            Function
 * @platform        node
 * @status          beta
 *
 * Return the package dist directory path
 *
 * @param       {IDistCssDirSettings}       [settings={}]   Some settings to configure your temp directory process
 * @return                {String}                      The real os temp directory path
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example             js
 * import distCssDir from '@coffeekraken/node/fs/distCssDir';
 * distCssDir(); // => '/private/var/folders/3x/jf5977fn79jbglr7rk0tq4d00000gn/T'
 *
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface IDistCssDirSettings {}

export default interface IDistCssDir {
    (settings?: IDistCssDirSettings): string;
}

export default function (settings: IDistCssDirSettings = {}) {
    settings = {
        ...settings,
    };
    const distCssDir = __SSugarConfig.get('storage.dist.cssDir');
    if (distCssDir !== undefined) {
        // __fs.ensureDirSync(distCssDir);
        return distCssDir;
    }
    return undefined;
}
