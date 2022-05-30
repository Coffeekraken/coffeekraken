// @ts-nocheck

import __SPromise from '@coffeekraken/s-promise';
import __SFrontspec from '../node/SFrontspec';
import __copy from '@coffeekraken/sugar/node/clipboard/copy';
import __SLog from '@coffeekraken/s-log';

export default (stringArgs = '') => {
    return new __SPromise(async ({ resolve, reject, emit, pipe }) => {
        const frontspec = new __SFrontspec();
        const buildPromise = frontspec.read(stringArgs);
        const res = await pipe(buildPromise);
        __copy(JSON.stringify(res, null, 4));
        emit('log', {
            type: __SLog.TYPE_INFO,
            value:
                '<green>[read]</green> frontspec.json copied to your clipboard',
        });
        resolve(res);
    });
};
