// @ts-nocheck
import __SLog from '@coffeekraken/s-log';
import __SPromise from '@coffeekraken/s-promise';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __childProcess from 'child_process';
import __SPackage from '../node/SPackage';
import __fs from 'fs';
import __SPackageInstallParamsInterface from '../node/interface/SPackageInstallParamsInterface';

export default (stringArgs = '') => {
    return new __SPromise(async ({ resolve, reject, emit, pipe }) => {
        const finalParams = __SPackageInstallParamsInterface.apply(stringArgs);

        const pack = new __SPackage();
        await pipe(pack.install(finalParams));

        resolve();
    });
};
