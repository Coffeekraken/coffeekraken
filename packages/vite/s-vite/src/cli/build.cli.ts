import __SVite from '../node/SVite.js';

export default function build(stringArgs = '') {
    return new Promise(async (resolve) => {
        const vite = new __SVite();
        const result = await vite.build(stringArgs);
        resolve(result);
    });
}
