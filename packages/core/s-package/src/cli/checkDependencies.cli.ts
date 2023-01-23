// @ts-nocheck
import __SPackageCheckDependenciesParamsInterface from '../node/interface/SPackageCheckDependenciesParamsInterface';
import __SPackage from '../node/SPackage';

export default (stringArgs = '') => {
    return new Promise(async (resolve) => {
        const finalParams =
            __SPackageCheckDependenciesParamsInterface.apply(stringArgs);
        const pack = new __SPackage();
        const result = await pack.checkDependencies(finalParams);
        resolve(result);
    });
};
