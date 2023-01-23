import __SMarkdownBuilderBuildParamsInterface from '../node/interface/SMarkdownBuilderBuildParamsInterface';
import __SMarkdownBuilder from '../node/SMarkdownBuilder';

export default function build(stringArgs = '') {
    return new Promise(async (resolve) => {
        const builder = new __SMarkdownBuilder({
            interface: __SMarkdownBuilderBuildParamsInterface,
        });
        const result = await builder.build(stringArgs);
        resolve(result);
    });
}
