// @ts-nocheck

import __SProcess from '@coffeekraken/s-process';
import __SDocMap from '../node/SDocMap';
import __SDocMapParamsReadInterface from '../node/interface/SDocmapReadParamsInterface';
import __SPromise from '@coffeekraken/s-promise';
import __copy from '@coffeekraken/sugar/node/clipboard/copy';
import __SLog from '@coffeekraken/s-log';

export default (stringArgs = '') => {
    return new __SPromise(async ({ resolve, pipe, emit }) => {
        const docmap = new __SDocMap();
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
