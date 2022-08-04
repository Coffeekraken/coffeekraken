// @ts-nocheck

import __SLog from '@coffeekraken/s-log';
import __SPromise from '@coffeekraken/s-promise';
import __copy from '@coffeekraken/sugar/node/clipboard/copy';
import __SDocmap from '../node/SDocmap';

export default (stringArgs = '') => {
    return new __SPromise(async ({ resolve, pipe, emit }) => {
        const docmap = new __SDocmap();
        const promise = docmap.read(stringArgs);
        pipe(promise);
        const res = await promise;
        __copy(JSON.stringify(res, null, 4));
        emit('log', {
            type: __SLog.TYPE_INFO,
            value: '<green>[read]</green> docmap.json copied to your clipboard',
        });
        resolve(res);
    });
};
