// @ts-nocheck
import __SPromise from '@coffeekraken/s-promise';
import __SCliMonoListParamsInterface from '../node/interface/SCliMonoListParamsInterface';
import __SGlob from '@coffeekraken/s-glob';
import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
import __readJsonSync from '@coffeekraken/sugar/node/fs/readJsonSync';

export default (stringArgs = '') => {
    return new __SPromise(async ({ resolve, reject, emit, pipe }) => {
        const finalParams = __SCliMonoListParamsInterface.apply(stringArgs);

        const root = __packageRoot(process.cwd(), true);

        const rootPackageJson = __readJsonSync(`${root}/package.json`);

        const files = __SGlob.resolve(finalParams.packagesGlobs, {
            cwd: root,
        });

        emit('log', {
            value: `<cyan>${files.length}</cyan> packages found:`,
        });

        files.forEach((file) => {
            let version = 'unknown',
                name,
                path = file.relPath;

            if (file.relPath.match(/package\.json$/)) {
                const json = __readJsonSync(file.path);
                version = json.version;
                name = json.name;
            }

            emit('log', {
                value: `<yellow>${
                    name ?? file.relPath.split('/').pop()
                }</yellow> (<${
                    version === rootPackageJson.version ? 'green' : 'red'
                }>${version}</${
                    version === rootPackageJson.version ? 'green' : 'red'
                }>) <cyan>${path}</cyan>`,
            });
        });

        resolve();
    });
};
