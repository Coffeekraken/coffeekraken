// @ts-nocheck

import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __fs from 'fs-extra';
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
 * @example             js
 * import srcDocDir from '@coffeekraken/node/fs/srcDocDir';
 * srcDocDir(); // => '/somethign/src/doc'
 *
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface ISrcDocDirSettings {}

export default interface ISrcDocDir {
    (settings?: ISrcDocDirSettings): string;
}

export default function (settings: ISrcDocDirSettings = {}) {
    settings = {
        ...settings,
    };
    const srcDocDir = __SSugarConfig.get('storage.src.docDir');
    if (srcDocDir !== undefined) {
        __fs.ensureDirSync(srcDocDir);
        return srcDocDir;
    }
    return undefined;
}
