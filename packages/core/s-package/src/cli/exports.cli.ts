// @ts-nocheck
import __SPromise from '@coffeekraken/s-promise';
import __SPackageExportsParamsInterface from '../node/interface/SPackageExportsParamsInterface';
import __SPackage from '../node/SPackage';

export default (stringArgs = '') => {
    return new __SPromise(async ({ resolve, reject, emit, pipe }) => {
        const finalParams = __SPackageExportsParamsInterface.apply(stringArgs);

        const pack = new __SPackage();
        await pipe(pack.exports(finalParams));

        resolve();
    });
};
