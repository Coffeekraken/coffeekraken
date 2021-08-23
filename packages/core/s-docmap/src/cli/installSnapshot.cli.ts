// @ts-nocheck

import __SPromise from '@coffeekraken/s-promise';
import __SDocMap from '../node/SDocMap';

export default async (stringArgs = '') => {
    return new __SPromise(async ({ resolve, pipe }) => {
        const docmap = new __SDocMap();
        const promise = docmap.installSnapshot(stringArgs);
        pipe(promise);
        resolve(await promise);
    });
};
