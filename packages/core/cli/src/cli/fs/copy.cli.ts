// @ts-nocheck
import __SCliFsCopyParamsInterface from '../../node/fs/interface/SCliFsCopyParamsInterface';
import __SPromise from '@coffeekraken/s-promise';
import __copySync from '@coffeekraken/sugar/node/fs/copySync';
import __isDirectory from '@coffeekraken/sugar/node/is/directory';
import __SLog from '@coffeekraken/s-log';

export default (stringArgs = '') => {
    return new __SPromise(async ({resolve, reject, emit, pipe}) => {
        const finalParams = __SCliFsCopyParamsInterface.apply(stringArgs);

        const type = __isDirectory(finalParams.src) ? 'directory' : 'file';

        emit('log', {
            type: __SLog.TYPE_INFO,
            value: `<yellow>[copy]</yellow> Copying the ${type} <cyan>${finalParams.src}</cyan> to <cyan>${finalParams.dest}</cyan>`,
        });

        // copy the file/directory
        __copySync(finalParams.src, finalParams.dest);

        emit('log', {
            type: __SLog.TYPE_INFO,
            value: `<green>[copy]</green> Copy finished <green>successfully</green>`,
        });

        if (finalParams.chdir) {
            process.chdir(finalParams.dest);
            emit('chdir', finalParams.dest);
        }

        resolve();
    });
};
