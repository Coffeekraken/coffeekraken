// @ts-nocheck
import __SPromise from '@coffeekraken/s-promise';
import __SJestTesterStartParamsInterface from '../node/interface/SJestTesterStartParamsInterface';
import __SJestTester from '../node/SJestTester';

export default (stringArgs = '') => {
    return new __SPromise(async ({ resolve, reject, emit, pipe }) => {
        const finalParams = __SJestTesterStartParamsInterface.apply(stringArgs);

        const builder = new __SJestTester();
        await pipe(builder.start(finalParams));

        resolve();
    });
};
