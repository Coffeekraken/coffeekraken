// @ts-nocheck

import __SSugarConfig from '@coffeekraken/s-sugar-config';
/**
 * @name                            distFontsDir
 * @namespace            node.path
 * @type                            Function
 * @platform        node
 * @status          beta
 *
 * Return the package dist directory path
 *
 * @param       {IDistFontsDirSettings}       [settings={}]   Some settings to configure your temp directory process
 * @return                {String}                      The real os temp directory path
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example             js
 * import distFontsDir from '@coffeekraken/node/fs/distFontsDir';
 * distFontsDir(); // => '/private/var/folders/3x/jf5977fn79jbglr7rk0tq4d00000gn/T'
 *
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface IDistFontsDirSettings {}

export default interface IDistFontsDir {
    (settings?: IDistFontsDirSettings): string;
}

export default function (settings: IDistFontsDirSettings = {}) {
    settings = {
        ...settings,
    };
    const distFontsDir = __SSugarConfig.get('storage.dist.fontsDir');
    if (distFontsDir !== undefined) {
        // __fs.ensureDirSync(distFontsDir);
        return distFontsDir;
    }
    return undefined;
}
