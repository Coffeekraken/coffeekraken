import __SPromise from '@coffeekraken/s-promise';
import __SFrontstack from '../SFrontstack';
import __SStdio from '@coffeekraken/s-stdio';

export const sugarCliSettings = {
    stdio: __SStdio.UI_TERMINAL,
};

export default function action(stringArgs = '') {
    return new __SPromise(async ({ resolve, pipe }) => {
        const frontstack = new __SFrontstack();
        const promise = frontstack.recipe(stringArgs);
        pipe(promise);
        resolve(await promise);
    });
}
