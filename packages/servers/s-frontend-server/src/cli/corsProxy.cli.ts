import __SPromise from '@coffeekraken/s-promise';
import __SFrontendServer from '../node/SFrontendServer.js';

export default function start(stringArgs = '') {
    return new __SPromise(async ({ resolve, pipe, emit }) => {
        const server = new __SFrontendServer();
        const promise = server.corsProxy(stringArgs);
        pipe(promise);
        resolve(await promise);
    });
}
