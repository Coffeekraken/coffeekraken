import __SProcess from '@coffeekraken/s-process';
import ____SImagesBuilderBuildParamsInterface from '../node/interface/SImagesBuilderBuildParamsInterface';
import __SImagesBuilder from '../node/SImagesBuilder';


export default async function build(stringArgs = '') {

    const builder = new __SImagesBuilder();

    const pro = __SProcess.from(
        builder.build.bind(builder)
    , {
        process: {
          interface: ____SImagesBuilderBuildParamsInterface
        }   
    });
    await pro.run(stringArgs);
}
