// @ts-nocheck

import __SDocMap from '@coffeekraken/s-docmap';
import __SMarkdownBuilder from '@coffeekraken/s-markdown-builder';
import __SPromise from '@coffeekraken/s-promise';
import { page404 } from '@coffeekraken/s-view-renderer';

/**
 * @name                markdown
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
 * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function markdown(req, res, settings = {}) {
    return new __SPromise(async ({ resolve, reject, pipe, pipeErrors }) => {
        const docmap = new __SDocMap();
        const docmapJson = await docmap.read();
        const menu = docmapJson.menu;

        let html;

        let slugObj = menu.slug[req.url];
        if (!slugObj) {
            Object.keys(menu.packages ?? {}).forEach((packageName) => {
                if (slugObj) return;
                const packageObj = menu.packages[packageName];
                slugObj = packageObj.slug[req.url];
            });
        }

        if (slugObj) {
            const builder = new __SMarkdownBuilder();
            const res = await pipe(
                builder.build({
                    // inRaw: markdownStr,
                    inPath: slugObj.docmap.path,
                    target: 'html',
                    save: false,
                }),
            );
            if (res instanceof Error) {
                throw res;
            }

            html = res[0].code;
        }

        if (!html) {
            const error = await page404({
                ...(res.templateData || {}),
                title: `Markdown "${req.url}" not found`,
                body: `The markdown "${req.url}" you requested does not exists...`,
            });
            res.type('text/html');
            res.status(404);
            res.send(error.value);
            return reject(error.value);
        }

        const result = await res.viewRenderer.render(
            'pages.markdown.markdown',
            {
                body: html,
            },
        );

        res.status(200);
        res.type('text/html');
        res.send(result.value);
        resolve(result.value);
    });
}
