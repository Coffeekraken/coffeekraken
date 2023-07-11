import __SFaviconBuilderBuildParamsInterface from '../node/interface/SFaviconBuilderBuildParamsInterface.js';
import __SFaviconBuilder from '../node/SFaviconBuilder.js';

export default function build(stringArgs = '') {
    return new Promise(async (resolve) => {
        const builder = new __SFaviconBuilder({
            interface: __SFaviconBuilderBuildParamsInterface,
        });
        const result = await builder.build(stringArgs);
        resolve(result);
    });
}
