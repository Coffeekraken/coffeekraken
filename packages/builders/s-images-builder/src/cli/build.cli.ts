import __SProcess from '@coffeekraken/s-process';
import __SImagesBuilderBuildParamsInterface from '../node/interface/SImagesBuilderBuildParamsInterface';
import __SImagesBuilder from '../node/SImagesBuilder';

import __SPromise from '@coffeekraken/s-promise';

export default function build(stringArgs = '') {
    return new __SPromise(async ({ resolve, reject, emit, pipe }) => {
        const builder = new __SImagesBuilder({
            interface: __SImagesBuilderBuildParamsInterface,
        });
        const promise = builder.build(stringArgs);
        pipe(promise);
        resolve(await promise);
        process.exit();
    });
}
