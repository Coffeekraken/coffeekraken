import __fs from 'fs';
import __unzipper from 'unzipper';
import __folderPath from '../fs/folderPath';
import __fileName from '../fs/filename';
import type { ISDurationObject } from '@coffeekraken/s-duration';
import __SDuration from '@coffeekraken/s-duration';

/**
 * @name            unzip
 * @namespace       node.zip
 * @type            Function
 * @async
 * @platform        node
 * @status          beta
 *
 * This function allows you to unzip quickly a zip file
 * to a particular destination.
 * Note that the zip filename will be used as folder name
 *
 * @param       {String}        zipFilePath         The zip file path to unzip
 * @param       {IUnzipSettings}        [settings={}]       Some settings to configure your unzip process
 * @return      {Promise<IUnzipResult>}                A promise that will be resolved once the file has been unzipped successfully with a result object
 *
 * @todo            documentation
 *
 * @example         js
 * import __unzip from '@coffeekraken/sugar/node/zip/unzip';
 * await __unzip('my/cool/file.zip');
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface IUnzipSettings {
    dest: string;
}
export interface IUnzipResult extends ISDurationObject {
    dest: string;
}

export default function unzip(
    zipFilePath: string,
    settings?: Partial<IUnzipSettings>,
): Promise<IUnzipResult> {
    return new Promise((resolve, reject) => {
        settings = {
            ...(settings ?? {}),
        };

        if (!__fs.existsSync(zipFilePath)) {
            throw new Error(
                `The passed file "${zipFilePath}" does not exists...`,
            );
        }

        const duration = new __SDuration();

        const folderName = __fileName(zipFilePath).replace(/\.g?zip$/, '');
        let dest = settings.dest
            ? `${settings.dest}/${folderName}`
            : `${__folderPath(zipFilePath)}/${folderName}`;

        __fs.createReadStream(zipFilePath)
            .pipe(__unzipper.Extract({ path: dest }))
            .on('close', () => {
                if (!__fs.existsSync(dest)) {
                    throw new Error(
                        `Something went wrong during the unzip process of the file "${zipFilePath}"...`,
                    );
                }
                resolve({
                    dest,
                    ...duration.end(),
                });
            });
    });
}
