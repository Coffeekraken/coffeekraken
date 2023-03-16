import __SVite from '../node/SVite';

export default function start(stringArgs = '') {
    return new Promise(async (resolve) => {
        const vite = new __SVite();
        vite.start(stringArgs);
    });
}
