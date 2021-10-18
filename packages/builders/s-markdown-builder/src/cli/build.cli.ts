import __SProcess from '@coffeekraken/s-process';
import __SMarkdownBuilderBuildParamsInterface from '../node/interface/SMarkdownBuilderBuildParamsInterface';
import __SMarkdownBuilder from '../node/SMarkdownBuilder';
import __SPromise from '@coffeekraken/s-promise';

export default function build(stringArgs = '') {
    return new __SPromise(async ({ resolve, reject, emit, pipe }) => {
        const builder = new __SMarkdownBuilder({
            builder: {
                interface: __SMarkdownBuilderBuildParamsInterface,
            },
        });

        const promise = builder.build(stringArgs);
        pipe(promise);
        resolve(await promise);
    });
}
