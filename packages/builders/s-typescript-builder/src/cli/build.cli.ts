// @ts-nocheck
import __STypescriptBuilderBuildParamsInterface from '../node/interface/STypescriptBuilderBuildParamsInterface.js';
import __STypescriptBuilder from '../node/STypescriptBuilder.js';

export default (stringArgs = '') => {
    return new Promise(async (resolve) => {
        const finalParams =
            __STypescriptBuilderBuildParamsInterface.apply(stringArgs);
        const builder = new __STypescriptBuilder();
        const result = await builder._build(finalParams);
        resolve(result);
    });
};
