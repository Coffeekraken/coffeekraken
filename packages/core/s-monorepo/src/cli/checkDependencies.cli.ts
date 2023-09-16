// @ts-nocheck
import __SMonorepoCheckDependenciesParamsInterface from '../node/interface/SMonorepoCheckDependenciesParamsInterface.js';
import __SMonorepo from '../node/SMonorepo.js';

export default (stringArgs = '') => {
    return new Promise(async (resolve) => {
        const finalParams =
            __SMonorepoCheckDependenciesParamsInterface.apply(stringArgs);
        const repo = new __SMonorepo();
        let result;
        try {
            result = await repo.checkDependencies(finalParams);
        } catch (e) {
            console.log(e);
        }
        resolve(result);
    });
};
