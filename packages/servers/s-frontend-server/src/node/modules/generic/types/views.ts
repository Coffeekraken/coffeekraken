// @ts-nocheck

import __SBench from '@coffeekraken/s-bench';
import __SDuration from '@coffeekraken/s-duration';
import __SSpecs from '@coffeekraken/s-specs';
import __STheme from '@coffeekraken/s-theme';
import { __isPlainObject } from '@coffeekraken/sugar/is';
import { __deepMerge } from '@coffeekraken/sugar/object';
import { __uniqid } from '@coffeekraken/sugar/string';
import __fs from 'fs';

export default function views({
    req,
    res,
    next,
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

        // avoid files
        if (req.url.match(/\/[a-zA-Z0-9-_]+\.[a-z0-9]{1,4}$/)) {
            return next();
        }

        const errors = {
            pageConfig,
            views: [],
            layout: undefined,
        };

        const theme = new __STheme(),
            bench = new __SBench('handlers.generic');

        bench.step('beforeViewsRendering');

        const renderedViews: string[] = [];

        for (let [idx, viewObj] of pageConfig.views.entries()) {
            let data = Object.assign({}, res.templateData ?? {}, {
                    // theme: theme.get('.'),
                }),
                viewPath = viewObj.path;

            const duration = new __SDuration();
            let currentSpecs = {};

            const viewBench = new __SBench(
                `handlers.generic.${viewObj.path ?? viewObj}`,
            );

            // init a SSpecs instance to load the specs depending on the viewObj
            const specsInstance = new __SSpecs();

            if (typeof viewObj === 'string') {
                // load the specs alongside the view
                currentSpecs = await specsInstance.read(`views.${viewObj}`);
                // set the view path
                viewPath = viewObj;
            } else if (viewObj?.data) {
                let dataHandlerStr;

                // load the specs if "path" exists
                if (viewObj.path) {
                    // load the specs alongside the view
                    currentSpecs = await specsInstance.read(
                        `views.${viewObj.path}`,
                    );
                }

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
                    throw dataFnResult;
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

            // ensure uid
            if (!data.uid) {
                data.uid = __uniqid();
            }

            // rendering view using data
            const viewResPro = res.viewRenderer.render(
                viewPath,
                {
                    $specs: currentSpecs,
                    ...data,
                },
                {
                    dataFile: true,
                },
            );
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
            const layoutPromise = res.viewRenderer.render(
                layoutPath,
                {
                    ...layoutData,
                    body: renderedViews.join('\n'),
                },
                {
                    dataFile: true,
                },
            );
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
