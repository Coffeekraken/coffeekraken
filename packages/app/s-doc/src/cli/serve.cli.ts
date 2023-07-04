import __SDoc from '../node/SDoc';

export default function start(stringArgs = '') {
    return new Promise(async (resolve) => {
        const server = new __SDoc();
        server.serve(stringArgs);
    });
}
