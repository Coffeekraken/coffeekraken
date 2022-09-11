import __SPromise from '@coffeekraken/s-promise';
import __SPostcssBuilder from '../node/SPostcssBuilder';
import __SPostcssBuilderBuildParamsInterface from '../node/interface/SPostcssBuilderBuildParamsInterface';

import { __isChildProcess } from '@coffeekraken/sugar/is';

export default function build(stringArgs = '') {
    return new __SPromise(async ({ resolve, reject, pipe }) => {
        const builder = new __SPostcssBuilder({
            interface: __SPostcssBuilderBuildParamsInterface,
        });
        await pipe(builder.build(stringArgs));
        process.exit();
    });
}
