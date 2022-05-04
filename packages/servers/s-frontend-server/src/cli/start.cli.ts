import __SPromise from '@coffeekraken/s-promise';
import __SFrontendServer from '../node/SFrontendServer';
import __SEnv from '@coffeekraken/s-env';

export default function start(stringArgs = '') {
    return new __SPromise(async ({ resolve, pipe, emit }) => {
        const server = new __SFrontendServer();
        const promise = server.start(stringArgs);
        pipe(promise);
        resolve(await promise);
    });
}
