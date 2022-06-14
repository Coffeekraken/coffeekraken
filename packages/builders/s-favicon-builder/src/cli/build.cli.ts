import __SProcess from '@coffeekraken/s-process';
import __SFaviconBuilderBuildParamsInterface from '../node/interface/SFaviconBuilderBuildParamsInterface';
import __SFaviconBuilder from '../node/SFaviconBuilder';

import __SPromise from '@coffeekraken/s-promise';

export default function build(stringArgs = '') {
    return new __SPromise(async ({ resolve, reject, emit, pipe }) => {
        const builder = new __SFaviconBuilder({
            interface: __SFaviconBuilderBuildParamsInterface,
        });
        const promise = builder.build(stringArgs);
        pipe(promise);
        resolve(await promise);
        process.exit();
    });
}
