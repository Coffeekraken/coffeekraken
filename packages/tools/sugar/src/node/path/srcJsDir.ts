// @ts-nocheck

import __SSugarConfig from '@coffeekraken/s-sugar-config';
/**
 * @name                            srcJsDir
 * @namespace            node.path
 * @type                            Function
 * @platform        node
 * @status          beta
 *
 * Return the package dist directory path
 *
 * @param       {ISrcJsDirSettings}       [settings={}]   Some settings to configure your temp directory process
 * @return                {String}                      The real os temp directory path
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example             js
 * import { __srcJsDir } from '@coffeekraken/sugar/path';
 * __srcJsDir(); // => '/private/var/folders/3x/jf5977fn79jbglr7rk0tq4d00000gn/T'
 *
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface ISrcJsDirSettings {}

export default interface ISrcJsDir {
    (settings?: ISrcJsDirSettings): string;
}

export default function __srcJsDir(settings: ISrcJsDirSettings = {}) {
    settings = {
        ...settings,
    };
    return __SSugarConfig.get('storage.src.jsDir');
}
