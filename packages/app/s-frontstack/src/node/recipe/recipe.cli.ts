import __SPromise from '@coffeekraken/s-promise';
import __SFrontstack from '../SFrontstack';

export default function action(stringArgs = '') {
    return new __SPromise(async ({ resolve, pipe }) => {
        const frontstack = new __SFrontstack();
        const promise = frontstack.recipe(stringArgs);
        pipe(promise);
        resolve(await promise);
    });
}
