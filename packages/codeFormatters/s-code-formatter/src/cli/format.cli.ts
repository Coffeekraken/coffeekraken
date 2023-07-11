import __SCodeFormatter from '../node/SCodeFormatter.js';

export default function format(stringArgs = '') {
    return new Promise(async (resolve) => {
        const formatter = new __SCodeFormatter();
        const result = await formatter.format(stringArgs);
        resolve(result);
    });
}
