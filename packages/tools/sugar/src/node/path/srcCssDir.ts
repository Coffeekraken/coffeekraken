// @ts-nocheck

import __SSugarConfig from '@coffeekraken/s-sugar-config';
/**
 * @name                            srcCssDir
 * @namespace            node.path
 * @type                            Function
 * @platform        node
 * @status          beta
 *
 * Return the package dist directory path
 *
 * @param       {ISrcCssDirSettings}       [settings={}]   Some settings to configure your temp directory process
 * @return                {String}                      The real os temp directory path
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example             js
 * import srcCssDir from '@coffeekraken/node/fs/srcCssDir';
 * srcCssDir(); // => '/private/var/folders/3x/jf5977fn79jbglr7rk0tq4d00000gn/T'
 *
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface ISrcCssDirSettings {}

export default interface ISrcCssDir {
    (settings?: ISrcCssDirSettings): string;
}

export default function (settings: ISrcCssDirSettings = {}) {
    settings = {
        ...settings,
    };
    const srcCssDir = __SSugarConfig.get('storage.src.cssDir');
    if (srcCssDir !== undefined) {
        // __fs.ensureDirSync(srcCssDir);
        return srcCssDir;
    }
    return undefined;
}
