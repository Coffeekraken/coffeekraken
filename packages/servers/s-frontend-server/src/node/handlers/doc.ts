// @ts-nocheck

import __SDocblock from '@coffeekraken/s-docblock';
import __SDocmap from '@coffeekraken/s-docmap';
import { page404 } from '@coffeekraken/s-view-renderer';
import __scrapeUrl from '@coffeekraken/sugar/node/og/scrapeUrl';

/**
 * @name                doc
 * @namespace           sugar.node.server.frontend.handlers
 * @type                Function
 * @platform            node
 * @status              beta
 *
 * This function is responsible of responding to express requests made on the doc pages
 *
 * @param         {Object}          req             The express request object
 * @param         {Object}          res             The express response object
 * @param         {Object}         [settings={}]    The handler settings
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
let _docmapJson;
export default function doc(req, res, settings = {}) {
    return new Promise(async (resolve) => {
        const docMap = new __SDocmap();

        const requestedNamespace = req.params['0'].trim();

        const readPromise = docMap.read();
        pipe(readPromise);
        _docmapJson = await readPromise;

        if (!_docmapJson.map[requestedNamespace]) {
            const html = await page404({
                ...(res.templateData || {}),
                title: `Documentation "${requestedNamespace}" not found`,
                body: `The documentation "${requestedNamespace}" you requested does not exists...`,
            });
            res.type('text/html');
            res.status(404);
            res.send(html.value);
            return reject(html.value);
        }

        // generate the docblocks
        const docblocksInstance = new __SDocblock(
            _docmapJson.map[requestedNamespace].path,
            {},
        );
        await docblocksInstance.parse();
        const docblocks = docblocksInstance.toObject();

        // protect
        if (!docblocks.length) {
            const html = await page404({
                ...(res.templateData || {}),
                title: `Documentation "${requestedNamespace}" not found`,
                body: `The documentation "${requestedNamespace}" you requested does not exists...`,
            });
            res.type('text/html');
            res.status(404);
            res.send(html.value);
            return reject(html.value);
        }

        // scrap @see fields opengraph metas
        await new Promise((resolve, reject) => {
            let pendingRequests = 0;

            docblocks.forEach((block, i) => {
                if (block.see) {
                    block.see.forEach((seeObj, j) => {
                        pendingRequests++;

                        __scrapeUrl(seeObj.url)
                            .then((results) => {
                                seeObj.og = results;
                                pendingRequests--;
                                if (!pendingRequests) {
                                    resolve();
                                }
                            })
                            .catch((error) => {
                                pendingRequests--;
                                if (!pendingRequests) {
                                    resolve();
                                }
                            });
                    });
                } else {
                    if (i === docblocks.length - 1 && !pendingRequests) {
                        resolve();
                    }
                }
            });
        });

        // render the proper template
        const pageHtml = await res.viewRenderer.render(
            'pages.doc.doc',
            {
                docblocks,
            },
            {
                dataFile: true,
            },
        );

        res.type('text/html');
        res.status(200);
        res.send(pageHtml.value);
        resolve(pageHtml.value);
    });
}
