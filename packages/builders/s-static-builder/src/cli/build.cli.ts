import __SStaticBuilderBuildParamsInterface from '../node/interface/SStaticBuilderBuildParamsInterface';
import __SStaticBuilder from '../node/SStaticBuilder';

export default function build(stringArgs = '') {
    return new Promise(async (resolve) => {
        const builder = new __SStaticBuilder({
            interface: __SStaticBuilderBuildParamsInterface,
        });
        const result = await builder.build(stringArgs);
        resolve(result);
    });
}
