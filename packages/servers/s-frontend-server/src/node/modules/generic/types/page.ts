import { __execPhp } from '@coffeekraken/sugar/exec';
import { __dirname } from '@coffeekraken/sugar/fs';
import { __packageRootDir, __packageTmpDir } from '@coffeekraken/sugar/path';
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
                $_SERVER: __serverObjectFromExpressRequest(req),
                pageFilePath,
                documentRoot: __packageRootDir(),
                storeDir: `${__packageTmpDir()}/store`,
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
