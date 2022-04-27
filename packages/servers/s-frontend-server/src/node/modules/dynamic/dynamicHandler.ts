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
 * @name                dynamicHandler
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
export default function dynamicHandler({
    req,
    res,
    pageConfig,
    pageFile,
    frontendServerConfig,
}) {
    return new __SPromise(async ({ resolve, reject, emit, pipe }) => {
        __SBench.start('handlers.dynamic');

        __SBench.step('handlers.dynamic', 'beforeDocmapRead');

        if (!pageConfig.views) {
            res.status(200);
            res.type('text/html');
            return res.send(
                `Your page config "${pageFile.relPath}" does not contain any views to render...`,
            );
        }

        const renderedViews: string[] = [];

        for (let [idx, viewObj] of pageConfig.views.entries()) {
            let data = {},
                viewPath = viewObj.path;

            if (typeof viewObj === 'string') {
                viewPath = viewObj;
            }

            // data
            if (viewObj.data) {
                let dataFn = () => {};
                if (__fs.existsSync(viewObj.data)) {
                    dataFn = (await import(viewObj.data)).default;
                } else if (frontendServerConfig.data[viewObj.data]) {
                    dataFn = (
                        await import(
                            frontendServerConfig.data[viewObj.data].path
                        )
                    ).default;
                }

                const dataFnResult = await dataFn({
                    req,
                    res,
                    pageConfig,
                    pageFile,
                    frontendServerConfig,
                });
                if (dataFnResult instanceof Error) {
                    console.log(dataFnResult);
                    emit('log', {
                        type: __SLog.TYPE_ERROR,
                        value: dataFnResult,
                    });
                } else {
                    data = __deepMerge(data, dataFnResult);
                }
            }

            // rendering view using data
            const viewInstance = new __SViewRenderer(viewPath);

            const viewRes = await pipe(
                viewInstance.render({
                    ...(res.templateData ?? {}),
                    ...(data ?? {}),
                }),
            );
            renderedViews.push(viewRes.value);
        }

        let layoutPath = pageConfig.layout ?? 'layouts.main';
        // rendering view using data
        const layoutInstance = new __SViewRenderer(layoutPath);

        const layoutRes = await pipe(
            layoutInstance.render({
                ...(res.templateData ?? {}),
                body: renderedViews.join('\n'),
            }),
        );

        res.status(200);
        res.type('text/html');
        res.send(layoutRes.value);
        return resolve(layoutRes.value);
    });
}
