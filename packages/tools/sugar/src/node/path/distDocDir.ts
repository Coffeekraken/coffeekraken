// @ts-nocheck

import __SSugarConfig from '@coffeekraken/s-sugar-config';
/**
 * @name                            distDocDir
 * @namespace            node.path
 * @type                            Function
 * @platform        node
 * @status          beta
 *
 * Return the package dist doc directory path
 *
 * @param       {IDistDocDirSettings}       [settings={}]   Some settings to configure your temp directory process
 * @return                {String}                      The real os temp directory path
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet         __distDocDir()
 * 
 * @example             js
 * import { __distDocDir } from '@coffeekraken/sugar/path';
 * __distDocDir(); // => '/somethign/dist/doc'
 *
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface IDistDocDirSettings {}

export default interface IDistDocDir {
    (settings?: IDistDocDirSettings): string;
}

export default function __distDocDir(settings: IDistDocDirSettings = {}) {
    settings = {
        ...settings,
    };
    return __SSugarConfig.get('storage.dist.docDir');
}
