import __SStaticServer from '../node/SStaticServer';

export default function start(stringArgs = '') {
    return new Promise(async (resolve) => {
        const server = new __SStaticServer();
        server.start(stringArgs);
    });
}
