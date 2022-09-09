// @ts-nocheck
import __SPromise from '@coffeekraken/s-promise';
import __SMonorepoDevParamsInterface from '../node/interface/SMonorepoDevParamsInterface';
import __SGlob from '@coffeekraken/s-glob';
import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
import { __readJsonSync } from '@coffeekraken/sugar/fs';
import __SMonorepo from '../node/SMonorepo';

export default (stringArgs = '') => {
    return new __SPromise(async ({ resolve, reject, emit, pipe }) => {
        const finalParams = __SMonorepoDevParamsInterface.apply(stringArgs);

        const monorepo = new __SMonorepo();
        await pipe(monorepo.dev(finalParams));

        resolve();
    });
};
