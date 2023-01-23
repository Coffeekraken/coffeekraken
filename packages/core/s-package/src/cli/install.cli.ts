// @ts-nocheck
import __SPackageInstallParamsInterface from '../node/interface/SPackageInstallParamsInterface';
import __SPackage from '../node/SPackage';

export default (stringArgs = '') => {
    return new Promise(async (resolve) => {
        const finalParams = __SPackageInstallParamsInterface.apply(stringArgs);
        const pack = new __SPackage();
        const result = await pack.install(finalParams);
        resolve(result);
    });
};
