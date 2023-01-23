import __SVite from '../node/SVite';

export default function start(stringArgs = '') {
    return new Promise(async (resolve) => {
        const vite = new __SVite();
        const result = await vite.start(stringArgs);
        resolve(result);
    });
}
