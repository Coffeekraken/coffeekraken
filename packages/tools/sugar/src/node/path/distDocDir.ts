// @ts-nocheck

import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __fs from 'fs-extra';
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
 * @example             js
 * import DistDocDir from '@coffeekraken/node/fs/DistDocDir';
 * DistDocDir(); // => '/somethign/dist/doc'
 *
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

export interface IDistDocDirSettings {}

export default interface IDistDocDir {
    (settings?: IDistDocDirSettings): string;
}

export default function (settings: IDistDocDirSettings = {}) {
    settings = {
        ...settings,
    };
    const distDocDir = __SSugarConfig.get('storage.dist.docDir');
    if (distDocDir !== undefined) {
        __fs.ensureDirSync(distDocDir);
        return distDocDir;
    }
    return undefined;
}
