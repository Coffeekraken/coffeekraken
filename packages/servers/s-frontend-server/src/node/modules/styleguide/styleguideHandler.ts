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
import __SBench from '@coffeekraken/s-bench';

/**
 * @name                styleguideHandler
 * @namespace           sugar.node.server.frontend.modules.styleguide
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
    return new __SPromise(async ({ resolve, reject }) => {
        __SBench.start('handlers.styleguide');

        __SBench.step('handlers.styleguide', 'beforeDocmapRead');

        const docmap = new __SDocMap();
        const docmapJson = await docmap.read();
        const styleguideMenu = docmapJson.menu.custom.styleguide;

        __SBench.step('handlers.styleguide', 'afterDocmapRead');

        
        const styleguideObj = styleguideMenu.slug[req.path];

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

        const finalReqPath = `/styleguide/${req.path.split('/styleguide/')[1]}`;

        __SBench.step('handlers.styleguide', 'beforeDocblockParsing');

        const docblocksInstance = new __SDocblock(styleguideObj.docmap.path, {
            docblock: {
                renderMarkdown: false,
                filterByTag: {
                    menu: (value) => {
                        if (!value || typeof value !== 'string') return false;
                        const parts = value.split(/\s{2,99999999}/);
                        if (parts.length >= 2 && parts[1] === finalReqPath)
                            return true;
                        return false;
                    },
                },
            },
        });
        await docblocksInstance.parse();
        const docblocks = docblocksInstance.toObject();

        __SBench.step('handlers.styleguide', 'afterDocblockParsing');

        __SBench.step('handlers.styleguide', 'beforeViewRendering');

        const docView = new __SViewRenderer('pages.styleguide.styleguide');

        const pageHtml = await docView.render({
            ...(res.templateData || {}),
            docblocks,
        });

        __SBench.step('handlers.styleguide', 'afterViewRendering');

        __SBench.end('handlers.styleguide', {}).log();

        res.status(200);
        res.type('text/html');
        res.send(pageHtml.value);
        resolve(pageHtml.value);
    });
}
