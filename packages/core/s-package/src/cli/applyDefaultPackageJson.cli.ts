// @ts-nocheck
import __SPackageApplyDefaultPackageJsonParamsInterface from '../node/interface/SPackageApplyDefaultPackageJsonParamsInterface.js';
import __SPackage from '../node/SPackage.js';

export default (stringArgs = '') => {
    return new Promise(async (resolve) => {
        const finalParams =
            __SPackageApplyDefaultPackageJsonParamsInterface.apply(stringArgs);
        const pack = new __SPackage();
        const result = await pack.applyDefaultPackageJson(finalParams);
        resolve(result);
    });
};
