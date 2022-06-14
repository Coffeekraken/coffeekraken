// @ts-nocheck
import __SPromise from '@coffeekraken/s-promise';
import __STestinatorTestParamsInterface from '../node/interface/STestinatorTestParamsInterface';
import __STestinator from '../node/STestinator';

export default (stringArgs = '') => {
    return new __SPromise(async ({ resolve, reject, emit, pipe }) => {
        const finalParams = __STestinatorTestParamsInterface.apply(stringArgs);

        const testinator = new __STestinator();
        await pipe(testinator.test(finalParams));

        resolve();
    });
};
