// @ts-nocheck
import __SLog from '@coffeekraken/s-log';
import __SPromise from '@coffeekraken/s-promise';
import __packageRootDir from '@coffeekraken/sugar/node/path/packageRootDir';
import __path from 'path';
import __SSugarJson from '../node/SSugarJson';

export default (stringArgs = '') => {
    return new __SPromise(async ({ resolve, reject, emit, pipe }) => {
        emit('log', {
            type: __SLog.TYPE_INFO,
            value: '<yellow>[search]</yellow> Searching for <yellow>sugar.json</yellow> files that are used in your <magenta>current context</magenta>...',
        });
        const sugarJson = new __SSugarJson();
        const list = await sugarJson.search();
        list.forEach((path) => {
            emit('log', {
                type: __SLog.TYPE_INFO,
                value: `<yellow>[file]</yellow> <cyan>${__path.relative(
                    __packageRootDir(),
                    path,
                )}</cyan>`,
            });
        });
        emit('log', {
            type: __SLog.TYPE_INFO,
            value: `<green>[success]</green> <magenta>${list.length}</magenta> file(s) found`,
        });
        resolve();
    });
};
