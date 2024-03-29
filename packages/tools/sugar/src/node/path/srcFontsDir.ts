// @ts-nocheck

import __SSugarConfig from '@coffeekraken/s-sugar-config';
/**
 * @name                            srcFontsDir
 * @namespace            node.path
 * @type                            Function
 * @platform        node
 * @status          beta
 *
 * Return the package dist directory path
 *
 * @param       {ISrcFontsDirSettings}       [settings={}]   Some settings to configure your temp directory process
 * @return                {String}                      The real os temp directory path
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet         srcFontsDir()
 * 
 * @example             js
 * import { __srcFontsDir } from '@coffeekraken/sugar/path';
 * __srcFontsDir(); // => '/private/var/folders/3x/jf5977fn79jbglr7rk0tq4d00000gn/T'
 *
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface ISrcFontsDirSettings {}

export default interface ISrcFontsDir {
    (settings?: ISrcFontsDirSettings): string;
}

export default function __srcFontsDir(settings: ISrcFontsDirSettings = {}) {
    settings = {
        ...settings,
    };
    return __SSugarConfig.get('storage.src.fontsDir');
}
