// @ts-nocheck

import __SSugarConfig from '@coffeekraken/s-sugar-config';
/**
 * @name                            srcDocDir
 * @namespace            node.path
 * @type                            Function
 * @platform        node
 * @status          beta
 *
 * Return the package dist doc directory path
 *
 * @param       {ISrcDocDirSettings}       [settings={}]   Some settings to configure your temp directory process
 * @return                {String}                      The real os temp directory path
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet         __srcDocDir()
 * 
 * @example             js
 * import { __srcDocDir } from '@coffeekraken/sugar/path';
 * __srcDocDir(); // => '/somethign/src/doc'
 *
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface ISrcDocDirSettings {}

export default interface ISrcDocDir {
    (settings?: ISrcDocDirSettings): string;
}

export default function __srcDocDir(settings: ISrcDocDirSettings = {}) {
    settings = {
        ...settings,
    };
    return __SSugarConfig.get('storage.src.docDir');
}
