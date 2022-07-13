import __SPromise from '@coffeekraken/s-promise';
import __SStdio from '@coffeekraken/s-stdio';
import __SKitchen from '../node/SKitchen';

export const sugarCliSettings = {
    stdio: __SStdio.UI_TERMINAL,
};

export default function recipe(stringArgs = '') {
    return new __SPromise(async ({ resolve, pipe }) => {
        const kitchen = new __SKitchen();
        const promise = kitchen.recipe(stringArgs);
        pipe(promise);
        await promise;
        resolve(promise);
    });
}
