// @ts-nocheck

import __SSugarConfig from '@coffeekraken/s-sugar-config';
/**
 * @name                            distIconsDir
 * @namespace            node.path
 * @type                            Function
 * @platform        node
 * @status          beta
 *
 * Return the package dist directory path
 *
 * @param       {IDistIconsDirSettings}       [settings={}]   Some settings to configure your temp directory process
 * @return                {String}                      The real os temp directory path
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example             js
 * import distIconsDir from '@coffeekraken/node/fs/distIconsDir';
 * distIconsDir(); // => '/private/var/folders/3x/jf5977fn79jbglr7rk0tq4d00000gn/T'
 *
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface IDistIconsDirSettings {}

export default interface IDistIconsDir {
    (settings?: IDistIconsDirSettings): string;
}

export default function (settings: IDistIconsDirSettings = {}) {
    settings = {
        ...settings,
    };
    const distIconsDir = __SSugarConfig.get('storage.dist.iconsDir');
    if (distIconsDir !== undefined) {
        // __fs.ensureDirSync(distIconsDir);
        return distIconsDir;
    }
    return undefined;
}
