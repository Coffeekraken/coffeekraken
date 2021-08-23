// @ts-nocheck

import __SProcess from '@coffeekraken/s-process';
import __SDocMap from '../node/SDocMap';
import __SDocMapParamsReadInterface from '../node/interface/SDocMapReadParamsInterface';
import __SPromise from '@coffeekraken/s-promise';

export default (stringArgs = '') => {
    return new __SPromise(async ({ resolve, pipe }) => {
        const docmap = new __SDocMap();
        const promise = docmap.read(stringArgs);
        pipe(promise);
        console.log(await promise);
        resolve(await promise);
    });
};
