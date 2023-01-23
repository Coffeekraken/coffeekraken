import __SFrontendServer from '../node/SFrontendServer';

export default function start(stringArgs = '') {
    return new Promise(async (resolve) => {
        const server = new __SFrontendServer();
        const result = await server.start(stringArgs);
        resolve(result);
    });
}
