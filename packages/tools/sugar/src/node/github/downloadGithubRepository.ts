import __fs from 'fs';
import __https from 'https';
import __tmpDir from '../path/systemTmpDir';
import __unzip from '../zip/unzip';
import __fsExtra from 'fs-extra';
import { __fileName, __folderPath } from '@coffeekraken/sugar/fs';

/**
 * @name            downloadGithubRepository
 * @namespace       node.github
 * @type            Function
 * @async
 * @platform        node
 * @status          beta
 *
 * This function allows you to download a github repository
 * and unzip it where you want to store it
 *
 * @param       {String}        repository      The repository name like "Coffeekraken/coffeekraken"
 * @param       {IGithubDownloadRepositorySettings}         [settings={}]           Some settings to configure your download
 *
 * @todo        documentation
 *
 * @example         js
 * import __downloadGithubRepository from '@coffeekraken/sugar/github';
 * await __downloadGithubRepository('Coffeekraken/coffeekraken', {
 *    dest: 'something/cool/coffeekraken.zip',
 *    unzip: true
 * });
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export interface IGithubDownloadRepositorySettings {
    dest: string;
    unzip: boolean;
    branch: String;
}
export interface IGithubDownloadRepositoryResult {}

export default function __downloadGithubRepository(
    repository: string,
    settings?: Partial<IGithubDownloadRepositorySettings>,
): Promise<IGithubDownloadRepositoryResult> {
    return new Promise((resolve, reject) => {
        settings = {
            dest: '',
            unzip: false,
            branch: 'master',
            ...(settings ?? {}),
        };
        if (!settings.dest) {
            settings.dest = `${__tmpDir()}/downloads/${repository
                .replace(/[\/\s]/gm, '-')
                .toLowerCase()}-${settings.branch}.zip`;
        }

        let dest = <string>settings.dest;
        if (!dest.match(/\.g?zip$/)) {
            dest = `${dest}/${repository
                .replace(/[\/\s]/gm, '-')
                .toLowerCase()}-${settings.branch}.zip`;
        }

        const folderName = __fileName(dest).replace(/\.g?zip$/, '');

        __fsExtra.ensureDir(__folderPath(dest));

        const url = `https://codeload.github.com/${repository}/zip/${settings.branch}`;
        const file = __fs.createWriteStream(dest);

        const request = __https
            .get(url, function (response) {
                response.pipe(file);
                file.on('finish', async () => {
                    await file.close(); // close() is async, call cb after close completes.

                    if (settings?.unzip) {
                        const newDest = dest.split('/').slice(0, -1).join('/');
                        const destFolderPath = dest.replace(/\.g?zip$/, '');
                        __fsExtra.removeSync(destFolderPath);
                        await __unzip(dest, {
                            dest: newDest,
                        });
                        const files = __fs.readdirSync(destFolderPath);
                        __fsExtra.moveSync(
                            `${destFolderPath}/${files[0]}`,
                            `${newDest}/${files[0]}`,
                            { overwrite: true },
                        );
                        __fsExtra.removeSync(destFolderPath);
                        __fsExtra.moveSync(
                            `${newDest}/${files[0]}`,
                            `${newDest}/${folderName}`,
                        );
                        __fsExtra.removeSync(dest);
                        dest = `${newDest}/${folderName}`;
                    }

                    resolve({
                        dest,
                    });
                });
            })
            .on('error', async (err) => {
                // Handle errors
                try {
                    __fs.unlinkSync(<string>settings?.dest); // Delete the file async. (But we don't check the result)
                } catch (e) {}
                reject({
                    error: err,
                });
            });
    });
}
