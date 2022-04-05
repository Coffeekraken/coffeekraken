// @ts-nocheck
import __SPromise from '@coffeekraken/s-promise';
import __SMonorepoUpgradeParamsInterface from '../node/interface/SMonorepoUpgradeParamsInterface';
import __SMonorepo from '../node/SMonorepo';

export default (stringArgs = '') => {
    return new __SPromise(async ({ resolve, reject, emit, pipe }) => {
        const finalParams = __SMonorepoUpgradeParamsInterface.apply(stringArgs);

        const repo = new __SMonorepo();
        await pipe(repo.upgrade(finalParams));

        resolve();
    });
};
