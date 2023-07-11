// @ts-nocheck
import __SPackageExportsParamsInterface from '../node/interface/SPackageExportsParamsInterface.js';
import __SPackage from '../node/SPackage.js';

export default (stringArgs = '') => {
    return new Promise(async (resolve) => {
        const finalParams = __SPackageExportsParamsInterface.apply(stringArgs);
        const pack = new __SPackage();
        const result = await pack.exports(finalParams);
        resolve(result);
    });
};
