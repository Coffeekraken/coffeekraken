// @ts-nocheck
import __SPackageApplyDefaultPackageJsonParamsInterface from '../node/interface/SPackageApplyDefaultPackageJsonParamsInterface';
import __SPromise from '@coffeekraken/s-promise';
import __SPackage from '../node/SPackage';
import __renamePackage from '@coffeekraken/sugar/node/package/renamePackage';
import __fs from 'fs';

export default (stringArgs = '') => {
    return new __SPromise(async ({ resolve, reject, emit, pipe }) => {
        const finalParams = __SPackageApplyDefaultPackageJsonParamsInterface.apply(
            stringArgs,
        );

        const pack = new __SPackage();
        await pipe(pack.applyDefaultPackageJson(finalParams));

        resolve();
    });
};
