// @ts-nocheck
import __SMonorepoDevParamsInterface from '../node/interface/SMonorepoDevParamsInterface';
import __SMonorepo from '../node/SMonorepo';

export default (stringArgs = '') => {
    return new Promise(async (resolve) => {
        const finalParams = __SMonorepoDevParamsInterface.apply(stringArgs);
        const monorepo = new __SMonorepo();
        const result = await monorepo.dev(finalParams);
        resolve(result);
    });
};
