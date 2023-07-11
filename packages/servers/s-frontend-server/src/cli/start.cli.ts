import __SFrontendServer from '../node/SFrontendServer.js';

export default function start(stringArgs = '') {
    return new Promise(async (resolve) => {
        const server = new __SFrontendServer();
        server.start(stringArgs);
    });
}
