import __SPromise from '@coffeekraken/s-promise';
import __SFrontstack from '../node/SFrontstack';

export default function action(stringArgs = '') {
    return new __SPromise(async ({ resolve, pipe }) => {
        const frontstack = new __SFrontstack();
        const promise = frontstack.list(stringArgs);
        pipe(promise);
        resolve(await promise);
    });
}
