// @ts-nocheck
import __SPromise from '@coffeekraken/s-promise';
import __SMonorepoRunParamsInterface from '../node/interface/SMonorepoRunParamsInterface';
import __SMonorepo from '../node/SMonorepo';

export default (stringArgs = '') => {
    return new __SPromise(async ({ resolve, reject, emit, pipe }) => {
        const finalParams = __SMonorepoRunParamsInterface.apply(stringArgs);

        const repo = new __SMonorepo();
        await pipe(repo.run(finalParams));

        resolve();
    });
};
