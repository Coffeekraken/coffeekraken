// @ts-nocheck
import __SMonorepoPublishParamsInterface from '../node/interface/SMonorepoPublishParamsInterface';
import __SMonorepo from '../node/SMonorepo';

export default (stringArgs = '') => {
    return new Promise(async (resolve) => {
        const finalParams = __SMonorepoPublishParamsInterface.apply(stringArgs);
        const monorepo = new __SMonorepo();
        const result = await monorepo.publish(finalParams);
        resolve(result);
    });
};
