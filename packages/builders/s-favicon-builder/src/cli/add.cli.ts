import __SPromise from '@coffeekraken/s-promise';
import __SFaviconBuilder from '../node/SFaviconBuilder';

export default function build(stringArgs = '') {
    return new __SPromise(async ({ resolve, reject, emit, pipe }) => {
        const builder = new __SFaviconBuilder();
        const promise = builder.add(stringArgs);
        pipe(promise);
        resolve(await promise);
        process.exit();
    });
}
