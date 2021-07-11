import __SProcess from '@coffeekraken/s-process';
import __SPostcssBuilderBuildParamsInterface from '../node/interface/SPostcssBuilderBuildParamsInterface';
import __SPostcssBuilder from '../node/SPostcssBuilder';


export default async function build(stringArgs = '') {

    const builder = new __SPostcssBuilder();

    const pro = await __SProcess.from(
        builder.build.bind(builder)
    , {
        process: {
          interface: __SPostcssBuilderBuildParamsInterface
        }   
    });
    pro.run(stringArgs);
}
