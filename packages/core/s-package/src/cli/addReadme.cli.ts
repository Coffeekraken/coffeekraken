// @ts-nocheck
import __SPackageAddReadmeParamsInterface from '../node/interface/SPackageAddReadmeParamsInterface';
import __SPromise from '@coffeekraken/s-promise';
import __SPackage from '../node/SPackage';
import __renamePackage from '@coffeekraken/sugar/node/package/renamePackage';
import __fs from 'fs';

export default (stringArgs = '') => {
    return new __SPromise(async ({ resolve, reject, emit, pipe }) => {
        const finalParams = __SPackageAddReadmeParamsInterface.apply(
            stringArgs,
        );

        const pack = new __SPackage();
        await pipe(pack.addReadme(finalParams));

        resolve();
    });
};
