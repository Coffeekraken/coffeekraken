// @ts-nocheck
import __SMonorepoExecParamsInterface from '../node/interface/SMonorepoExecParamsInterface.js';
import __SMonorepo from '../node/SMonorepo.js';

export default (stringArgs = '') => {
    return new Promise(async (resolve) => {
        const finalParams = __SMonorepoExecParamsInterface.apply(stringArgs);
        const repo = new __SMonorepo();
        const result = await repo.exec(finalParams);
        resolve(result);
    });
};
