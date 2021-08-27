// @ts-nocheck

import __SDocMap from '@coffeekraken/s-docmap';
import __SDocblock from '@coffeekraken/s-docblock';
import __SPromise from '@coffeekraken/s-promise';
import __marked from 'marked';
import __fs from 'fs';
import __SViewRenderer from '@coffeekraken/s-view-renderer';
import __SMarkdownBuilder from '@coffeekraken/s-markdown-builder';
import { page404 } from '@coffeekraken/s-view-renderer';
import __scrapeUrl from '@coffeekraken/sugar/node/og/scrapeUrl';

/**
 * @name                styleguide
 * @namespace           sugar.node.server.frontend.handlers
 * @type                Function
 * @status              wip
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
 * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function styleguide(req, res, settings = {}) {
    return new __SPromise(async ({ resolve, reject, pipe, pipeError }) => {
        const docmap = new __SDocMap();
        const docmapJson = await docmap.read();
        const menu = docmapJson.menu;

        const styleguideObj = menu.mixedSlug[req.path];

        if (!styleguideObj || !__fs.existsSync(styleguideObj.docmap.path)) {
            const error = await page404({
                ...(res.templateData || {}),
                title: `Styleguide "${req.path}" not found`,
                body: `The styleguide "${req.path}" you requested does not exists...`,
            });
            res.type('text/html');
            res.status(404);
            res.send(error.value);
            return reject(error.value);
        }
        const docblocksInstance = new __SDocblock(styleguideObj.docmap.path);
        await docblocksInstance.parse();
        const docblocks = docblocksInstance.toObject();

        // // scrap @see fields opengraph metas
        // await new Promise((resolve, reject) => {
        //     let pendingRequests = 0;

        //     docblocks.forEach((block, i) => {
        //         if (block.see) {
        //             block.see.forEach((seeObj, j) => {
        //                 pendingRequests++;

        //                 __scrapeUrl(seeObj.url)
        //                     .then((results) => {
        //                         seeObj.og = results;
        //                         pendingRequests--;
        //                         if (!pendingRequests) {
        //                             resolve();
        //                         }
        //                     })
        //                     .catch((error) => {
        //                         pendingRequests--;
        //                         if (!pendingRequests) {
        //                             resolve();
        //                         }
        //                     });
        //             });
        //         } else {
        //             if (i === docblocks.length - 1 && !pendingRequests) {
        //                 resolve();
        //             }
        //         }
        //     });
        // });

        const docView = new __SViewRenderer('pages.styleguide.styleguide');

        const pageHtml = await docView.render({
            ...(res.templateData || {}),
            docblocks,
        });

        res.status(200);
        res.type('text/html');
        res.send(pageHtml.value);
        resolve(pageHtml.value);
    });
}
