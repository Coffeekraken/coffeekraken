// @ts-nocheck
import __SMonorepoListParamsInterface from '../node/interface/SMonorepoListParamsInterface';
import __SMonorepo from '../node/SMonorepo';

export default (stringArgs = '') => {
    return new Promise(async (resolve) => {
        const finalParams = __SMonorepoListParamsInterface.apply(stringArgs);
        const monorepo = new __SMonorepo();
        const result = await monorepo.list(finalParams);
        resolve(result);
    });
};
