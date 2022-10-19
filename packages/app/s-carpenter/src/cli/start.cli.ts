// @ts-nocheck

import __SPromise from '@coffeekraken/s-promise';
import __SCarpenter from '../node/SCarpenter';

export default (stringArgs = '') => {
    return new __SPromise(async ({ resolve, reject, emit, pipe }) => {
        const carpenter = new __SCarpenter();
        const buildPromise = carpenter.start(stringArgs);
        const res = await pipe(buildPromise);
        resolve(res);
    });
};
