import __SPostcssBuilderBuildParamsInterface from '../node/interface/SPostcssBuilderBuildParamsInterface.js';
import __SPostcssBuilder from '../node/SPostcssBuilder.js';

export default function build(stringArgs = '') {
    return new Promise(async (resolve) => {
        const builder = new __SPostcssBuilder({
            interface: __SPostcssBuilderBuildParamsInterface,
        });
        const result = await builder.build(stringArgs);
        resolve(result);
    });
}
