// @ts-nocheck

import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __SDocMap from '@coffeekraken/s-docmap';
import __SDocblock from '@coffeekraken/s-docblock';
import __SPromise from '@coffeekraken/s-promise';
import __marked from 'marked';
import __fs from 'fs';
import __SLog from '@coffeekraken/s-log';
import __SViewRenderer from '@coffeekraken/s-view-renderer';
import __SMarkdownBuilder from '@coffeekraken/s-markdown-builder';
import { page404 } from '@coffeekraken/s-view-renderer';
import __scrapeUrl from '@coffeekraken/sugar/node/og/scrapeUrl';
import __SBench from '@coffeekraken/s-bench';

/**
 * @name                docmapHandler
 * @namespace           node.modules.docmap
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
 * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function docmap(req, res, settings = {}) {
    return new __SPromise(async ({ resolve, reject, emit, pipe }) => {
        __SBench.start('handlers.docmap');

        __SBench.step('handlers.docmap', 'beforeDocmapRead');

        const docmap = new __SDocMap();
        const docmapJson = await docmap.read();

        __SBench.step('handlers.docmap', 'afterDocmapRead');

        if (
            !docmapJson.map ||
            !__fs.existsSync(docmapJson.map[req.params.namespace].path)
        ) {
            const error = await page404({
                ...(res.templateData || {}),
                title: `Docmap "${req.params.namespace}" not found`,
                body: `The docmap "${req.params.namespace}" you requested does not exists...`,
            });
            res.type('text/html');
            res.status(404);
            res.send(error.value);
            return reject(error.value);
        }

        __SBench.step('handlers.docmap', 'beforeMarkdownBuild');

        let html;

        const builder = new __SMarkdownBuilder();

        const markdownRes = await pipe(
            builder.build({
                // inRaw: str,
                inPath: docmapJson.map[req.params.namespace].path,
                target: 'html',
                save: false,
            }),
        );
        if (markdownRes instanceof Error) {
            throw markdownRes;
        }

        html = markdownRes[0].code;

        __SBench.step('handlers.docmap', 'afterMarkdownBuild');

        __SBench.step('handlers.docmap', 'beforeViewRendering');

        const viewInstance = new __SViewRenderer('pages.markdown.markdown');

        const viewRes = await pipe(
            viewInstance.render({
                ...(res.templateData ?? {}),
                body: html,
            }),
        );

        res.status(200);
        res.type('text/html');
        res.send(viewRes.value);
        resolve(viewRes.value);
    });
}
