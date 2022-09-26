// @ts-nocheck

import __SPromise from '@coffeekraken/s-promise';
import __SMitosis from '../node/SMitosis';

export default (stringArgs = '') => {
    return new __SPromise(async ({ resolve, reject, emit, pipe }) => {
        const mitosis = new __SMitosis();
        const buildPromise = mitosis.build(stringArgs);
        const res = await pipe(buildPromise);
        resolve(res);
    });
};
