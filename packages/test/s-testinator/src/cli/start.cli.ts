// @ts-nocheck
import __SPromise from '@coffeekraken/s-promise';
import __STestinatorStartParamsInterface from '../node/interface/STestinatorStartParamsInterface';
import __STestinator from '../node/STestinator';

export default (stringArgs = '') => {
    return new __SPromise(async ({ resolve, reject, emit, pipe }) => {
        const finalParams = __STestinatorStartParamsInterface.apply(stringArgs);

        const testinator = new __STestinator();
        await pipe(testinator.start(finalParams));

        resolve();
    });
};
