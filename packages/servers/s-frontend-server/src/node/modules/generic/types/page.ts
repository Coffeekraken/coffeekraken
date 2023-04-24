import { __execPhp } from '@coffeekraken/sugar/exec';
import { __dirname } from '@coffeekraken/sugar/fs';
import { __hashFromSync } from '@coffeekraken/sugar/hash';
import { __packageRootDir, __packageTmpDir } from '@coffeekraken/sugar/path';
import __fs from 'fs';
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
        let pageFilePath;

        // try to get the page from different sources
        let potentialPath = `${__packageTmpDir()}/store/${
            pageConfig.page
        }.json`;
        if (__fs.existsSync(potentialPath)) {
            pageFilePath = potentialPath;
        }
        if (!pageFilePath) {
            if (pageConfig.page && typeof pageConfig.page !== 'string') {
                const pageId = __hashFromSync(pageConfig.page);
                potentialPath = `${__packageTmpDir()}/viewRenderer/${pageId}.json`;
                __fs.writeFileSync(
                    potentialPath,
                    JSON.stringify(pageConfig.page),
                );
                pageFilePath = potentialPath;
            }
        }

        // rendering view using data
        const resPro = __execPhp(
            __path.resolve(
                __packageRootDir(__dirname()),
                'src/node/modules/generic/php/renderPage.php',
            ),
            JSON.stringify({
                pageFilePath,
                documentRoot: __packageRootDir(),
                storeDir: `${__packageTmpDir()}/store`,
            }),
            {
                // paramsThroughFile: true,
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
