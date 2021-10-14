// @ts-nocheck

import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
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
 * @name                apiHandler
 * @namespace           sugar.node.server.frontend.modules.styleguide
 * @type                Function
 * @status              wip
 *
 * This function is responsible of responding to express requests made on the api pages
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
export default function api(req, res, settings = {}) {
    return new __SPromise(async ({ resolve, reject, pipe, pipeError }) => {
        const docmap = new __SDocMap();
        const docmapJson = await docmap.read();

        const namespace = req.path.replace(/^\/api\//, '').trim();

        Object.keys(docmapJson.map).forEach((na) => {
            if (na.includes('sugar.js.dom.query')) {
                console.log(na);
            }
        });

        const docmapObj = docmapJson.map[namespace];

        if (!docmapObj || !__fs.existsSync(docmapObj.path)) {
            const error = await page404({
                ...(res.templateData || {}),
                title: `API "${req.path}" not found`,
                body: `The API item "${req.path}" you requested does not exists...`,
            });
            res.type('text/html');
            res.status(404);
            res.send(error.value);
            return reject(error.value);
        }

        const docblocksInstance = new __SDocblock(docmapObj.path, {
            docblock: {
                renderMarkdown: true,
            },
        });
        await docblocksInstance.parse();
        const docblocks = docblocksInstance.toObject();

        const docView = new __SViewRenderer('pages.api.api');

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
