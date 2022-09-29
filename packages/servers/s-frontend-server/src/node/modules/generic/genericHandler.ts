// @ts-nocheck

import __SBench from '@coffeekraken/s-bench';
import __SPromise from '@coffeekraken/s-promise';
import { __deepMerge } from '@coffeekraken/sugar/object';
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

            __SBench.step(
                `handlers.generic`,
                `beforeViewRendering.${viewPath}`,
            );

            if (typeof viewObj === 'string') {
                viewPath = viewObj;
            } else if (viewObj?.data) {
                let dataHandlerStr;

                let dataSettings = viewObj.data?.settings ?? {},
                    dataParams = viewObj.data?.params ?? {},
                    dataFn;

                // directly passed function
                if (typeof viewObj.data === 'function') {
                    dataFn = viewObj.data;
                } else if (
                    viewObj.data.handler &&
                    typeof viewObj.data.handler === 'function'
                ) {
                    dataFn = viewObj.data.handler;
                }

                // if the passed data is a string
                if (!dataFn) {
                    if (typeof viewObj.data === 'string') {
                        dataHandlerStr = viewObj.data;
                    } else if (viewObj.data.handler) {
                        dataHandlerStr = viewObj.data.handler;
                    } else {
                        throw new Error(
                            `<red>[SFrontendServer.genericHandler]</red> One of the view data handler for the requested page "<cyan>${req.url}</cyan>" is not valid...`,
                        );
                    }

                    // load the data handler if needed
                    if (__fs.existsSync(dataHandlerStr)) {
                        dataFn = (await import(dataHandlerStr)).default;
                    } else if (frontendServerConfig.data[dataHandlerStr]) {
                        dataFn = (
                            await import(
                                frontendServerConfig.data[dataHandlerStr].path
                            )
                        ).default;
                    }
                }

                for (let [param, value] of Object.entries(dataParams)) {
                    if (typeof value === 'function') {
                        req.params[param] = value({
                            req,
                            res,
                            settings: dataSettings,
                            frontendServerConfig,
                        });
                    } else {
                        req.params[param] = value;
                    }
                }

                const dataFnResult = await dataFn({
                    req,
                    res,
                    params: dataParams,
                    settings: dataSettings,
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

        let finalResult;

        // rendering layout using data
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
        } catch (e) {
            // console.log(e);
        }

        if (errors.views.length || errors.layout) {
            errors.views = errors.views.map((viewObj) => {
                delete viewObj.data;
                return viewObj;
            });
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
