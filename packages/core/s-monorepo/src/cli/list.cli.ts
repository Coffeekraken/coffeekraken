// @ts-nocheck
import __SMonorepoListParamsInterface from '../node/interface/SMonorepoListParamsInterface.js';
import __SMonorepo from '../node/SMonorepo.js';

export default (stringArgs = '') => {
    return new Promise(async (resolve) => {
        const finalParams = __SMonorepoListParamsInterface.apply(stringArgs);
        const monorepo = new __SMonorepo();
        const result = await monorepo.list(finalParams);
        resolve(result);
    });
};
