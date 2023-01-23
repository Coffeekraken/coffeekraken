import __SFaviconBuilderBuildParamsInterface from '../node/interface/SFaviconBuilderBuildParamsInterface';
import __SFaviconBuilder from '../node/SFaviconBuilder';

export default function build(stringArgs = '') {
    return new Promise(async (resolve) => {
        const builder = new __SFaviconBuilder({
            interface: __SFaviconBuilderBuildParamsInterface,
        });
        const result = await builder.build(stringArgs);
        resolve(result);
    });
}
