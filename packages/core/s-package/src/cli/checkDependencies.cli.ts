// @ts-nocheck
import __SPackageCheckDependenciesParamsInterface from '../node/interface/SPackageCheckDependenciesParamsInterface.js';
import __SPackage from '../node/SPackage.js';

export default (stringArgs = '') => {
    return new Promise(async (resolve) => {
        const finalParams =
            __SPackageCheckDependenciesParamsInterface.apply(stringArgs);
        const pack = new __SPackage();
        const result = await pack.checkDependencies(finalParams);
        resolve(result);
    });
};
