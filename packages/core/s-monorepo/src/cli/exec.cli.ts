// @ts-nocheck
import __SPromise from '@coffeekraken/s-promise';
import __SMonorepoExecParamsInterface from '../node/interface/SMonorepoExecParamsInterface';
import __SMonorepo from '../node/SMonorepo';

export default (stringArgs = '') => {
    return new __SPromise(async ({ resolve, reject, emit, pipe }) => {
        const finalParams = __SMonorepoExecParamsInterface.apply(stringArgs);

        const repo = new __SMonorepo();
        await pipe(repo.exec(finalParams));

        resolve();
    });
};
