// @ts-nocheck

import __SPromise from '@coffeekraken/s-promise';
import __SDocmap from '../node/SDocmap';

export default (stringArgs = '') => {
    return new __SPromise(async ({ resolve, reject, emit, pipe }) => {
        const docmap = new __SDocmap();
        const buildPromise = docmap.build(stringArgs);
        pipe(buildPromise);
        resolve(await buildPromise);
    });
};
