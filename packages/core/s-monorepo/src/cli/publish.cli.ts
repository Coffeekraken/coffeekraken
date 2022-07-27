// @ts-nocheck
import __SPromise from '@coffeekraken/s-promise';
import __SMonorepoPublishParamsInterface from '../node/interface/SMonorepoPublishParamsInterface';
import __SMonorepo from '../node/SMonorepo';

export default (stringArgs = '') => {
    return new __SPromise(async ({ resolve, reject, emit, pipe }) => {
        const finalParams = __SMonorepoPublishParamsInterface.apply(stringArgs);

        const monorepo = new __SMonorepo();

        await pipe(monorepo.publish(finalParams));

        resolve();
    });
};
