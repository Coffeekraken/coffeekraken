// @ts-nocheck
import __SPackageRenameParamsInterface from '../node/interface/SPackageRenameParamsInterface';
import __SPackage from '../node/SPackage';

export default (stringArgs = '') => {
    return new Promise(async (resolve) => {
        const finalParams = __SPackageRenameParamsInterface.apply(stringArgs);
        const pack = new __SPackage();
        const result = await pack.rename(finalParams);
        resolve(result);
    });
};
