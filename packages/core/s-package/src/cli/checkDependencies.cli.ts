// @ts-nocheck
import __SLog from '@coffeekraken/s-log';
import __SPromise from '@coffeekraken/s-promise';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __childProcess from 'child_process';
import __SPackage from '../node/SPackage';
import __fs from 'fs';
import __SPackageCheckDependenciesParamsInterface from '../node/interface/SPackageCheckDependenciesParamsInterface';

export default (stringArgs = '') => {
    return new __SPromise(async ({ resolve, reject, emit, pipe }) => {
        const finalParams = __SPackageCheckDependenciesParamsInterface.apply(
            stringArgs,
        );

        const pack = new __SPackage();
        await pipe(pack.checkDependencies(finalParams));

        resolve();
    });
};
