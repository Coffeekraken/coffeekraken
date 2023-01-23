import __SKitchen from '../node/SKitchen';

export default function action(stringArgs = '') {
    return new Promise(async (resolve) => {
        const kitchen = new __SKitchen();
        const result = await kitchen.add(stringArgs);
        resolve(result);
    });
}
