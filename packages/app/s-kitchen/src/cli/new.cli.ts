import __SPromise from '@coffeekraken/s-promise';
import __SKitchen from '../node/SKitchen';

export default function action(stringArgs = '') {
    return new __SPromise(async ({ resolve, pipe }) => {
        const kitchen = new __SKitchen();
        const promise = kitchen.new(stringArgs);
        pipe(promise);
        resolve(await promise);
    });
}
