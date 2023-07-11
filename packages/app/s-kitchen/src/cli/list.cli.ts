import __SKitchen from '../node/SKitchen.js';

export default function action(stringArgs = '') {
    return new Promise(async (resolve) => {
        const kitchen = new __SKitchen();
        const result = await kitchen.list(stringArgs);
        resolve(result);
    });
}
