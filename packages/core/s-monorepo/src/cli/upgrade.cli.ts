// @ts-nocheck
import __SPromise from '@coffeekraken/s-promise';
import __SCliMonoListParamsInterface from '../node/interface/SCliMonoListParamsInterface';
import __SGlob from '@coffeekraken/s-glob';
import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
import __readJsonSync from '@coffeekraken/sugar/node/fs/readJsonSync';
import __writeJsonSync from '@coffeekraken/sugar/node/fs/writeJsonSync';
import __fs from 'fs';

export default (stringArgs = '') => {
    return new __SPromise(async ({ resolve, reject, emit, pipe }) => {
        const finalParams = __SCliMonoListParamsInterface.apply(stringArgs);

        const root = __packageRoot(process.cwd(), {
            highest: true,
        });

        const rootPackageJson = __readJsonSync(`${root}/package.json`);

        const files = __SGlob.resolve(finalParams.packagesGlobs, {
            cwd: root,
        });

        emit('log', {
            value: `Upgrading <cyan>${files.length}</cyan> packages with these informations:`,
        });
        emit('log', {
            marginBottom: 1,
            value: [
                `- <yellow>Version</yellow>: <cyan>${rootPackageJson.version}</cyan>`,
            ].join('\n'),
        });

        files.forEach((file) => {
            finalParams.filesToUpgrade.forEach((fileName) => {
                if (!fileName.match(/\.json$/)) {
                    throw new Error(
                        `Only json files are supported for the upgrade process for now...`,
                    );
                }
                const filePath = `${file.dirPath}/${fileName}`;
                if (!__fs.existsSync(filePath)) return;
                const json = __readJsonSync(filePath);
                if (json.version === rootPackageJson.version) {
                    emit('log', {
                        value: `<yellow>${json.name}</yellow> <cyan>${fileName}</cyan> already up to date`,
                    });
                    return;
                }
                json.version = rootPackageJson.version;
                __writeJsonSync(filePath, json);
                emit('log', {
                    value: `<green>✓</green> <yellow>${json.name}</yellow> <cyan>${fileName}</cyan> upgraded <green>successfully</green>`,
                });
            });
        });

        resolve();
    });
};
