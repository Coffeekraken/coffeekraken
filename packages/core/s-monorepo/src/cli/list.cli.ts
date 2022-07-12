// @ts-nocheck
import __SPromise from '@coffeekraken/s-promise';
import __SMonorepoListParamsInterface from '../node/interface/SMonorepoListParamsInterface';
import __SMonorepo from '../node/SMonorepo';

export default (stringArgs = '') => {
    return new __SPromise(async ({ resolve, reject, emit, pipe }) => {
        const finalParams = __SMonorepoListParamsInterface.apply(stringArgs);

        const monorepo = new __SMonorepo();

        await pipe(monorepo.list(finalParams));

        resolve();
    });
};
