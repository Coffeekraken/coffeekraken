// @ts-nocheck

import __SBench from '@coffeekraken/s-bench';
import __SLog from '@coffeekraken/s-log';
import __SPromise from '@coffeekraken/s-promise';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __fs from 'fs';

/**
 * @name                genericHandler
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

export default function genericHandler({
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

        const errors = {
            pageConfig,
            views: [],
            layout: undefined,
        };

        // // if we refer to a file with an extension, stop here...
        // if (req.url.match(/.*\.[a-z]{1,4}$/)) {
        //     res.status(404);
        //     res.send(null);
        //     return resolve();
        // }

        __SBench.start('handlers.generic');

        __SBench.step('handlers.generic', 'beforeViewsRendering');

        const renderedViews: string[] = [];

        for (let [idx, viewObj] of pageConfig.views.entries()) {
            let data = Object.assign({}, res.templateData ?? {}),
                viewPath = viewObj.path;

            // remove the shared data
            delete data.shared;

            if (typeof viewObj === 'string') {
                viewPath = viewObj;
            }

            __SBench.step(
                `handlers.generic`,
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
                    data = __deepMerge(data ?? {}, dataFnResult ?? {});
                }
            }

            // rendering view using data
            const viewResPro = res.viewRenderer.render(viewPath, data);
            pipe(viewResPro);
            let viewRes = await viewResPro;
            if (viewRes.error) {
                errors.views.push({
                    viewPath,
                    data,
                    error: viewRes.error,
                });
            } else {
                renderedViews.push(viewRes.value);
            }

            __SBench.step(`handlers.generic`, `afterViewRendering.${viewPath}`);
        }

        __SBench.step('handlers.generic', 'afterViewsRendering');

        __SBench.step('handlers.generic', 'beforeLayoutRendering');

        let layoutPath = pageConfig.layout ?? 'layouts.main';

        const layoutData = Object.assign({}, res.templateData ?? {});
        delete layoutData.shared;

        let finalResult;

        // rendering view using data
        try {
            const layoutPromise = res.viewRenderer.render(layoutPath, {
                ...layoutData,
                body: renderedViews.join('\n'),
            });
            pipe(layoutPromise);
            const layoutRes = await layoutPromise;

            if (layoutRes.error) {
                errors.layout = {
                    layoutPath,
                    error: layoutRes.error,
                };
            } else {
                finalResult = layoutRes.value;
            }
        } catch (e) {}

        if (errors.views.length || errors.layout) {
            finalResult = JSON.stringify(errors, null, 4);
        }

        __SBench.step('handlers.generic', 'afterLayoutRendering');

        __SBench.end('handlers.generic').log();

        res.status(200);
        res.type(
            errors.views.length || errors.layout
                ? 'application/json'
                : 'text/html',
        );
        res.send(finalResult);
        return resolve(finalResult);
    });
}
