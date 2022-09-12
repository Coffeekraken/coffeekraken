// @ts-nocheck
import __SPackageRenameParamsInterface from '../node/interface/SPackageRenameParamsInterface';
import __SPromise from '@coffeekraken/s-promise';
import __SPackage from '../node/SPackage';
import { __renamePackage } from '@coffeekraken/sugar/package';
import __fs from 'fs';

export default (stringArgs = '') => {
    return new __SPromise(async ({ resolve, reject, emit, pipe }) => {
        const finalParams = __SPackageRenameParamsInterface.apply(stringArgs);

        const pack = new __SPackage();
        await pipe(pack.rename(finalParams));

        resolve();
    });
};
