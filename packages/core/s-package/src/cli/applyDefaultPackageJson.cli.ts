// @ts-nocheck
import __SPromise from '@coffeekraken/s-promise';
import __SPackageApplyDefaultPackageJsonParamsInterface from '../node/interface/SPackageApplyDefaultPackageJsonParamsInterface';
import __SPackage from '../node/SPackage';

export default (stringArgs = '') => {
    return new __SPromise(async ({ resolve, reject, emit, pipe }) => {
        const finalParams =
            __SPackageApplyDefaultPackageJsonParamsInterface.apply(stringArgs);

        const pack = new __SPackage();
        await pipe(pack.applyDefaultPackageJson(finalParams));

        resolve();
    });
};
