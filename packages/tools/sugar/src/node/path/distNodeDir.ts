// @ts-nocheck

import __SSugarConfig from '@coffeekraken/s-sugar-config';
/**
 * @name                            distNodeDir
 * @namespace            node.path
 * @type                            Function
 * @platform        node
 * @status          beta
 *
 * Return the package dist directory path
 *
 * @param       {IDistNodeDirSettings}       [settings={}]   Some settings to configure your temp directory process
 * @return                {String}                      The real os temp directory path
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example             js
 * import { __distNodeDir } from '@coffeekraken/sugar/path';
 * __distNodeDir(); // => '/private/var/folders/3x/jf5977fn79jbglr7rk0tq4d00000gn/T'
 *
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface IDistNodeDirSettings {}

export default interface IDistNodeDir {
    (settings?: IDistNodeDirSettings): string;
}

export default function __distNodeDir(settings: IDistNodeDirSettings = {}) {
    settings = {
        ...settings,
    };
    return __SSugarConfig.get('storage.dist.nodeDir');
}
