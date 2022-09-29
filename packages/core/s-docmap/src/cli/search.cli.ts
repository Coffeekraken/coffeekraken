// @ts-nocheck

import __SLog from '@coffeekraken/s-log';
import __SPromise from '@coffeekraken/s-promise';
import __copy from '@coffeekraken/sugar/node/clipboard/copy';
import __SDocmap from '../node/SDocmap';

export default (stringArgs = '') => {
    return new __SPromise(async ({ resolve, reject, emit, pipe }) => {
        const docmap = new __SDocmap();
        const searchPromise = docmap.search(stringArgs);
        pipe(searchPromise);
        const res = await searchPromise;
        __copy(JSON.stringify(res, null, 4));
        console.log(res);
        emit('log', {
            type: __SLog.TYPE_INFO,
            value: '<green>[search]</green> Search results copied to your clipboard',
        });
        resolve(res);
    });
};
