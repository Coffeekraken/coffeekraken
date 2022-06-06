// @ts-nocheck

import __SBench from '@coffeekraken/s-bench';
import __SLog from '@coffeekraken/s-log';
import __SPromise from '@coffeekraken/s-promise';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __fs from 'fs';

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
        if (!pageConfig.views) {
            res.status(200);
            res.type('text/html');
            return res.send(
                `Your page config "${pageFile.relPath}" does not contain any views to render...`,
            );
        }

        // if we refer to a file with an extension, stop here...
        if (req.url.match(/.*\.[a-z]{1,4}$/)) {
            res.status(404);
            res.send(null);
            return resolve();
        }

        __SBench.start('handlers.dynamic');

        __SBench.step('handlers.dynamic', 'beforeViewsRendering');

        const renderedViews: string[] = [];

        for (let [idx, viewObj] of pageConfig.views.entries()) {
            let data = {},
                viewPath = viewObj.path;

            if (typeof viewObj === 'string') {
                viewPath = viewObj;
            }

            __SBench.step(
                `handlers.dynamic`,
                `beforeViewRendering.${viewPath}`,
            );

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
                    emit('log', {
                        type: __SLog.TYPE_ERROR,
                        value: dataFnResult,
                    });
                } else {
                    data = __deepMerge(data, dataFnResult);
                }
            }

            // rendering view using data
            const viewRes = await pipe(
                res.viewRenderer.render(viewPath, {
                    ...data,
                }),
            );

            __SBench.step(`handlers.dynamic`, `afterViewRendering.${viewPath}`);

            renderedViews.push(viewRes.value);
        }

        __SBench.step('handlers.dynamic', 'afterViewsRendering');

        __SBench.step('handlers.dynamic', 'beforeLayoutRendering');

        let layoutPath = pageConfig.layout ?? 'layouts.main';
        // rendering view using data
        const layoutRes = await pipe(
            res.viewRenderer.render(layoutPath, {
                body: renderedViews.join('\n'),
            }),
        );

        __SBench.step('handlers.dynamic', 'afterLayoutRendering');

        __SBench.end('handlers.dynamic').log();

        res.status(200);
        res.type('text/html');
        res.send(layoutRes.value);
        return resolve(layoutRes.value);
    });
}
