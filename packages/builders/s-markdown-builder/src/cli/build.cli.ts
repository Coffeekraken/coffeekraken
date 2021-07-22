import __SProcess from '@coffeekraken/s-process';
import __SMarkdownBuilderBuildParamsInterface from '../node/interface/SMarkdownBuilderBuildParamsInterface';
import __SMarkdownBuilder from '../node/SMarkdownBuilder';


export default async function build(stringArgs = '') {

    const builder = new __SMarkdownBuilder();

    const pro = await __SProcess.from(
        builder.build.bind(builder)
    , {
        process: {
          interface: __SMarkdownBuilderBuildParamsInterface
        }   
    });
    pro.run(stringArgs);
}
