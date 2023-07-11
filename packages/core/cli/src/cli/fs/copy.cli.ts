// @ts-nocheck
import __SGlob from '@coffeekraken/s-glob';
import __SLog from '@coffeekraken/s-log';
import __SPromise from '@coffeekraken/s-promise';
import { __chdir, __copySync } from '@coffeekraken/sugar/fs';
import { __isDirectory } from '@coffeekraken/sugar/is';
import __SCliFsCopyParamsInterface from '../../node/fs/interface/SCliFsCopyParamsInterface.js';

export default (stringArgs = '') => {
    return new __SPromise(async ({ resolve, reject, emit, pipe }) => {
        const finalParams = __SCliFsCopyParamsInterface.apply(stringArgs);

        let files = [finalParams.src];

        if (finalParams.glob) {
            const paths = __SGlob.resolveSync(finalParams.glob, {
                cwd: finalParams.src,
                nodir: false,
            });
            files = paths.map((f) => f.relPath);
        }

        files.forEach((path, i) => {
            const relPath = path;

            if (finalParams.glob) path = `${finalParams.src}/${path}`;

            const type = __isDirectory(path) ? 'directory' : 'file';

            emit('log', {
                type: __SLog.TYPE_INFO,
                value: `<yellow>[copy]</yellow> Copying the ${type} <cyan>${path}</cyan> to <cyan>${
                    finalParams.glob
                        ? `${finalParams.dest}/${relPath}`
                        : finalParams.dest
                }</cyan>`,
            });

            // copy the file/directory
            __copySync(
                path,
                finalParams.glob
                    ? `${finalParams.dest}/${relPath}`
                    : finalParams.dest,
            );

            if (finalParams.chdir && files.length === i + 1) {
                __chdir(finalParams.dest);
            }
        });

        resolve();
    });
};
