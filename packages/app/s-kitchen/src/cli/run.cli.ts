import __SKitchen from '../node/SKitchen';

export default function run(stringArgs = '') {
    return new Promise(async (resolve) => {
        const kitchen = new __SKitchen();
        const result = kitchen.run(stringArgs);
        resolve(result);
    });
}
