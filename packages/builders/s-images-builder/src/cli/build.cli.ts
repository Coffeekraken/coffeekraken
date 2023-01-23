import __SImagesBuilderBuildParamsInterface from '../node/interface/SImagesBuilderBuildParamsInterface';
import __SImagesBuilder from '../node/SImagesBuilder';

export default function build(stringArgs = '') {
    return new Promise(async (resolve) => {
        const builder = new __SImagesBuilder({
            interface: __SImagesBuilderBuildParamsInterface,
        });
        const result = await builder.build(stringArgs);
        resolve(result);
    });
}
