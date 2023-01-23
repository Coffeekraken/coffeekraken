// @ts-nocheck

import __SBench from '@coffeekraken/s-bench';
import __SDuration from '@coffeekraken/s-duration';
import __SLog from '@coffeekraken/s-log';
import { __isPlainObject } from '@coffeekraken/sugar/is';
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
    return new Promise(async (resolve) => {
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

        const bench = new __SBench('handlers.generic');

        bench.step('beforeViewsRendering');

        const renderedViews: string[] = [];

        for (let [idx, viewObj] of pageConfig.views.entries()) {
            let data = Object.assign({}, res.templateData ?? {}),
                viewPath = viewObj.path;

            const duration = new __SDuration();

            const viewBench = new __SBench(
                `handlers.generic.${viewObj.path ?? viewObj}`,
            );

            if (typeof viewObj === 'string') {
                viewPath = viewObj;
            } else if (viewObj?.data) {
                let dataHandlerStr;

                let dataSettings = viewObj.data?.settings ?? {},
                    dataParams = viewObj.data?.params ?? {},
                    dataFn;

                // directly passed function
                if (__isPlainObject(viewObj.data) && !viewObj.data.handler) {
                    dataFn = () => viewObj.data;
                } else if (typeof viewObj.data === 'function') {
                    dataFn = viewObj.data;
                } else if (
                    viewObj.data.handler &&
                    typeof viewObj.data.handler === 'function'
                ) {
                    dataFn = viewObj.data.handler;
                }

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

                viewBench.step(`afterDataLoaded`);

                const dataFnResultPromise = dataFn({
                    req,
                    res,
                    viewRenderer: res.viewRenderer,
                    params: dataParams,
                    settings: dataSettings,
                    pageConfig,
                    pageFile,
                    frontendServerConfig,
                });
                const dataFnResult = await dataFnResultPromise;

                if (dataFnResult instanceof Error) {
                    emit('log', {
                        type: __SLog.TYPE_ERROR,
                        value: dataFnResult,
                    });
                } else {
                    data = __deepMerge(data ?? {}, dataFnResult ?? {});
                }
            }

            // @TODO        find out why when using the "emit" function, nothing is logged...
            // emit('log', {
            //     type: __SLog.TYPE_ERROR,
            //     value: `<yellow>[genericHandler]</yellow> Rendering the view "<cyan>${viewPath}</cyan>"`,
            // });
            console.verbose?.(
                `<yellow>[genericHandler]</yellow> Rendering the view "<cyan>${viewPath}</cyan>"`,
            );

            // rendering view using data
            const viewResPro = res.viewRenderer.render(viewPath, data);
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

            console.verbose?.(
                `<yellow>[genericHandler]</yellow> View "<cyan>${viewPath}</cyan>" rendered <green>successfully</green> in <yellow>${
                    duration.end().formatedDuration
                }</yellow>`,
            );

            viewBench.end();
        }

        bench.step('afterViewsRendering');

        bench.step('beforeLayoutRendering');

        let layoutPath = pageConfig.layout ?? 'layouts.main';

        const layoutData = Object.assign({}, res.templateData ?? {});
        delete layoutData.config;

        let finalResult;

        // rendering layout using data
        try {
            const layoutPromise = res.viewRenderer.render(layoutPath, {
                ...layoutData,
                body: renderedViews.join('\n'),
            });
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
            finalResult = JSON.stringify(errors, null, 4)
                .split(/\\n/)
                .join(`\n\n`);
        }

        bench.step('afterLayoutRendering');

        bench.end();

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
