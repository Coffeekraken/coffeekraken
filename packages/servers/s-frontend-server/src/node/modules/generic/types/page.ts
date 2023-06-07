import __SSugarConfig from '@coffeekraken/s-sugar-config';
import { __execPhp } from '@coffeekraken/sugar/exec';
import { __dirname } from '@coffeekraken/sugar/fs';
import { __packageRootDir } from '@coffeekraken/sugar/path';
import { __serverObjectFromExpressRequest } from '@coffeekraken/sugar/php';
import __path from 'path';

export default function page({
    req,
    res,
    next,
    pageConfig,
    pageFile,
    frontendServerConfig,
}) {
    return new Promise(async (resolve) => {
        const pageFilePath = pageFile.path;

        // rendering view using data
        const resPro = __execPhp(
            __path.resolve(
                __packageRootDir(__dirname()),
                'src/node/modules/generic/php/renderPage.php',
            ),
            {
                $_ENV: {
                    S_FRONTEND_DIR: __packageRootDir(),
                },
                $_SERVER: __serverObjectFromExpressRequest(req),
                pageFile: pageFilePath,
                page: pageConfig,
                req: {
                    baseUrl: req.baseUrl,
                    body: req.body,
                    hostname: req.hostname,
                    ip: req.ip,
                    method: req.method,
                    originalUrl: req.originalUrl,
                    params: req.params,
                    path: req.path,
                    protocol: req.protocol,
                    query: req.query,
                    xhr: req.xhr,
                },
                nodesDir: __SSugarConfig.get('storage.src.nodesDir'),
            },
            {
                paramsThroughFile: true,
            },
        );

        resPro.catch((e) => {
            console.error(e);
            resolve({
                error: e,
            });
        });
        const renderRes = await resPro;

        res.status(200);
        res.type('text/html');
        return res.send(renderRes);
    });
}
