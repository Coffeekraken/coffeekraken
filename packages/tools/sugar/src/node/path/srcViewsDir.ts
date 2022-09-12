// @ts-nocheck

import __SSugarConfig from '@coffeekraken/s-sugar-config';
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
 * import { __srcViewsDir } from '@coffeekraken/sugar/path';
 * __srcViewsDir(); // => '/private/var/folders/3x/jf5977fn79jbglr7rk0tq4d00000gn/T'
 *
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface ISrcViewsDirSettings {}

export default interface ISrcViewsDir {
    (settings?: ISrcViewsDirSettings): string;
}

export default function __srcViewsDir(settings: ISrcViewsDirSettings = {}) {
    settings = {
        ...settings,
    };
    return __SSugarConfig.get('storage.src.viewsDir');
}
