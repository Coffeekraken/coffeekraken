// @ts-nocheck
import __SPromise from '@coffeekraken/s-promise';
import __STypescriptBuilderBuildParamsInterface from '../node/interface/STypescriptBuilderBuildParamsInterface';
import __STypescriptBuilder from '../node/STypesscriptBuilder';

export default (stringArgs = '') => {
    return new __SPromise(async ({ resolve, reject, emit, pipe }) => {
        const finalParams = __STypescriptBuilderBuildParamsInterface.apply(
            stringArgs,
        );

        const builder = new __STypescriptBuilder();
        await pipe(builder._build(finalParams));

        resolve();
    });
};
