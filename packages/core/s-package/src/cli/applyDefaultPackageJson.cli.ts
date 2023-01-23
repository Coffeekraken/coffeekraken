// @ts-nocheck
import __SPackageApplyDefaultPackageJsonParamsInterface from '../node/interface/SPackageApplyDefaultPackageJsonParamsInterface';
import __SPackage from '../node/SPackage';

export default (stringArgs = '') => {
    return new Promise(async (resolve) => {
        const finalParams =
            __SPackageApplyDefaultPackageJsonParamsInterface.apply(stringArgs);
        const pack = new __SPackage();
        const result = await pack.applyDefaultPackageJson(finalParams);
        resolve(result);
    });
};
