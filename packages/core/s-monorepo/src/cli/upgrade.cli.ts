// @ts-nocheck
import __SMonorepoUpgradeParamsInterface from '../node/interface/SMonorepoUpgradeParamsInterface.js';
import __SMonorepo from '../node/SMonorepo.js';

export default (stringArgs = '') => {
    return new Promise(async (resolve) => {
        const finalParams = __SMonorepoUpgradeParamsInterface.apply(stringArgs);
        const repo = new __SMonorepo();
        const result = await repo.upgrade(finalParams);
        resolve(result);
    });
};
