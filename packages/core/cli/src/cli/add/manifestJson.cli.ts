// @ts-nocheck
import __SLog from '@coffeekraken/s-log';
import __SPromise from '@coffeekraken/s-promise';
import __dirName from '@coffeekraken/sugar/node/fs/dirname';
import __readJsonSync from '@coffeekraken/sugar/node/fs/readJsonSync';
import __writeJsonSync from '@coffeekraken/sugar/node/fs/writeJsonSync';
import __packageJson from '@coffeekraken/sugar/node/package/jsonSync';
import __fs from 'fs';
import __SCliAddManifestJsonParamsInterface from '../../node/add/interface/SCliAddManifestJsonParamsInterface';
import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';

export default (stringArgs = '') => {
    return new __SPromise(async ({ resolve, reject, emit, pipe }) => {
        const finalParams = __SCliAddManifestJsonParamsInterface.apply(
            stringArgs,
        );

        emit('log', {
            type: __SLog.TYPE_INFO,
            value: `<yellow>[manifestJson]</yellow> Adding the manifest.json file`,
        });

        const packageJson = __packageJson();

        if (__fs.existsSync(`${process.cwd()}/manifest.json`)) {
            const json = __readJsonSync(`${process.cwd()}/manifest.json`);
            json.short_name = packageJson.name;
            json.name = packageJson.description;
            __writeJsonSync(`${process.cwd()}/manifest.json`, json);
        } else {
            const json = __readJsonSync(
                `${__packageRoot(__dirName())}/src/cli/add/data/manifest.json`,
            );
            json.short_name = packageJson.name;
            json.name = packageJson.description;
            __writeJsonSync(`${process.cwd()}/manifest.json`, json);
        }

        resolve();
    });
};
