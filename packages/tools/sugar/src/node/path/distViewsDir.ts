// @ts-nocheck

import __SSugarConfig from '@coffeekraken/s-sugar-config';
/**
 * @name                            distViewsDir
 * @namespace            node.path
 * @type                            Function
 * @platform        node
 * @status          beta
 *
 * Return the package dist directory path
 *
 * @param       {IDistViewsDirSettings}       [settings={}]   Some settings to configure your temp directory process
 * @return                {String}                      The real os temp directory path
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet         __distViewsDir()
 * 
 * @example             js
 * import { __distViewsDir } from '@coffeekraken/sugar/path';
 * __distViewsDir(); // => '/private/var/folders/3x/jf5977fn79jbglr7rk0tq4d00000gn/T'
 *
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface IDistViewsDirSettings {}

export default interface IDistViewsDir {
    (settings?: IDistViewsDirSettings): string;
}

export default function __distViewsDir(settings: IDistViewsDirSettings = {}) {
    settings = {
        ...settings,
    };
    return __SSugarConfig.get('storage.dist.viewsDir');
}
