// @ts-nocheck

import __SSugarConfig from '@coffeekraken/s-sugar-config';
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
 * @snippet         __distJsDir()
 * 
 * @example             js
 * import { __distJsDir } from '@coffeekraken/sugar/path';
 * __distJsDir(); // => '/private/var/folders/3x/jf5977fn79jbglr7rk0tq4d00000gn/T'
 *
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface IDistJsDirSettings {}

export default interface IDistJsDir {
    (settings?: IDistJsDirSettings): string;
}

export default function __distJsDir(settings: IDistJsDirSettings = {}) {
    settings = {
        ...settings,
    };
    return __SSugarConfig.get('storage.dist.jsDir');
}
