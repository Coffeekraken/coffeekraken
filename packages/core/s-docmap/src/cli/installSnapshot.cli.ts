// @ts-nocheck

import __SPromise from '@coffeekraken/s-promise';
import __SDocmap from '../node/SDocmap';

export default async (stringArgs = '') => {
    return new __SPromise(async ({ resolve, pipe }) => {
        const docmap = new __SDocmap();
        const promise = docmap.installSnapshot(stringArgs);
        pipe(promise);
        resolve(await promise);
    });
};
