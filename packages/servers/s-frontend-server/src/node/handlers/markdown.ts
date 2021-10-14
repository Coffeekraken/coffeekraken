// @ts-nocheck

import __SDocMap from '@coffeekraken/s-docmap';
import __SPromise from '@coffeekraken/s-promise';
import __marked from 'marked';
import __fs from 'fs';
import __SViewRenderer from '@coffeekraken/s-view-renderer';
import __SMarkdownBuilder from '@coffeekraken/s-markdown-builder';
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
 * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function markdown(req, res, settings = {}) {
    return new __SPromise(async ({ resolve, reject, pipe, pipeError }) => {
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
            const markdownStr = __fs
                .readFileSync(slugObj.docmap.path, 'utf8')
                .toString();

            const builder = new __SMarkdownBuilder();
            const res = await pipeError(
                builder.build({
                    inRaw: markdownStr,
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

        const viewInstance = new __SViewRenderer('pages.markdown.markdown');

        const result = await viewInstance.render({
            ...(res.templateData ?? {}),
            body: html,
        });

        res.status(200);
        res.type('text/html');
        res.send(result.value);
        resolve(result.value);
    });
}
