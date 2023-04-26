// @ts-nocheck
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SBench from '@coffeekraken/s-bench';
import __SDuration from '@coffeekraken/s-duration';
import __SSpecs from '@coffeekraken/s-specs';
import __STheme from '@coffeekraken/s-theme';
import { __isPlainObject } from '@coffeekraken/sugar/is';
import { __deepMerge } from '@coffeekraken/sugar/object';
import __fs from 'fs';
export default function views({ req, res, next, pageConfig, pageFile, frontendServerConfig, }) {
    return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        if (!pageConfig.views) {
            res.status(200);
            res.type('text/html');
            return res.send(`Your page config "${pageFile.relPath}" does not contain any views to render...`);
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
        const theme = new __STheme(), bench = new __SBench('handlers.generic');
        bench.step('beforeViewsRendering');
        const renderedViews = [];
        for (let [idx, viewObj] of pageConfig.views.entries()) {
            let data = Object.assign({}, (_a = res.templateData) !== null && _a !== void 0 ? _a : {}, {
            // theme: theme.get('.'),
            }), viewPath = viewObj.path;
            const duration = new __SDuration();
            let currentSpecs = {};
            const viewBench = new __SBench(`handlers.generic.${(_b = viewObj.path) !== null && _b !== void 0 ? _b : viewObj}`);
            // init a SSpecs instance to load the specs depending on the viewObj
            const specsInstance = new __SSpecs();
            if (typeof viewObj === 'string') {
                // load the specs alongside the view
                currentSpecs = yield specsInstance.read(`views.${viewObj}`);
                // set the view path
                viewPath = viewObj;
            }
            else if (viewObj === null || viewObj === void 0 ? void 0 : viewObj.data) {
                let dataHandlerStr;
                // load the specs if "path" exists
                if (viewObj.path) {
                    // load the specs alongside the view
                    currentSpecs = yield specsInstance.read(`views.${viewObj.path}`);
                }
                let dataSettings = (_d = (_c = viewObj.data) === null || _c === void 0 ? void 0 : _c.settings) !== null && _d !== void 0 ? _d : {}, dataParams = (_f = (_e = viewObj.data) === null || _e === void 0 ? void 0 : _e.params) !== null && _f !== void 0 ? _f : {}, dataFn;
                // directly passed function
                if (__isPlainObject(viewObj.data) && !viewObj.data.handler) {
                    dataFn = () => viewObj.data;
                }
                else if (typeof viewObj.data === 'function') {
                    dataFn = viewObj.data;
                }
                else if (viewObj.data.handler &&
                    typeof viewObj.data.handler === 'function') {
                    dataFn = viewObj.data.handler;
                }
                if (!dataFn) {
                    if (typeof viewObj.data === 'string') {
                        dataHandlerStr = viewObj.data;
                    }
                    else if (viewObj.data.handler) {
                        dataHandlerStr = viewObj.data.handler;
                    }
                    else {
                        throw new Error(`<red>[SFrontendServer.genericHandler]</red> One of the view data handler for the requested page "<cyan>${req.url}</cyan>" is not valid...`);
                    }
                    // load the data handler if needed
                    if (__fs.existsSync(dataHandlerStr)) {
                        dataFn = (yield import(dataHandlerStr)).default;
                    }
                    else if (frontendServerConfig.data[dataHandlerStr]) {
                        dataFn = (yield import(frontendServerConfig.data[dataHandlerStr].path)).default;
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
                    }
                    else {
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
                const dataFnResult = yield dataFnResultPromise;
                if (dataFnResult instanceof Error) {
                    throw dataFnResult;
                }
                else {
                    data = __deepMerge(data !== null && data !== void 0 ? data : {}, dataFnResult !== null && dataFnResult !== void 0 ? dataFnResult : {});
                }
            }
            // @TODO        find out why when using the "emit" function, nothing is logged...
            // emit('log', {
            //     type: __SLog.TYPE_ERROR,
            //     value: `<yellow>[genericHandler]</yellow> Rendering the view "<cyan>${viewPath}</cyan>"`,
            // });
            (_g = console.verbose) === null || _g === void 0 ? void 0 : _g.call(console, `<yellow>[genericHandler]</yellow> Rendering the view "<cyan>${viewPath}</cyan>"`);
            // rendering view using data
            const viewResPro = res.viewRenderer.render(viewPath, Object.assign({ $specs: currentSpecs }, data), {
                dataFile: true,
            });
            let viewRes = yield viewResPro;
            if (viewRes.error) {
                errors.views.push({
                    viewPath,
                    data,
                    error: viewRes.error,
                });
            }
            else {
                renderedViews.push(viewRes.value);
            }
            (_h = console.verbose) === null || _h === void 0 ? void 0 : _h.call(console, `<yellow>[genericHandler]</yellow> View "<cyan>${viewPath}</cyan>" rendered <green>successfully</green> in <yellow>${duration.end().formatedDuration}</yellow>`);
            viewBench.end();
        }
        bench.step('afterViewsRendering');
        bench.step('beforeLayoutRendering');
        let layoutPath = (_j = pageConfig.layout) !== null && _j !== void 0 ? _j : 'layouts.main';
        const layoutData = Object.assign({}, (_k = res.templateData) !== null && _k !== void 0 ? _k : {});
        delete layoutData.config;
        let finalResult;
        // rendering layout using data
        try {
            const layoutPromise = res.viewRenderer.render(layoutPath, Object.assign(Object.assign({}, layoutData), { body: renderedViews.join('\n') }), {
                dataFile: true,
            });
            const layoutRes = yield layoutPromise;
            if (layoutRes.error) {
                errors.layout = {
                    layoutPath,
                    error: layoutRes.error,
                };
            }
            else {
                finalResult = layoutRes.value;
            }
        }
        catch (e) {
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
        res.type(errors.views.length || errors.layout
            ? 'application/json'
            : 'text/html');
        res.send(finalResult);
        return resolve(finalResult);
    }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUM3QyxPQUFPLFdBQVcsTUFBTSwwQkFBMEIsQ0FBQztBQUNuRCxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUM3QyxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUM3QyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDekQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3pELE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUV0QixNQUFNLENBQUMsT0FBTyxVQUFVLEtBQUssQ0FBQyxFQUMxQixHQUFHLEVBQ0gsR0FBRyxFQUNILElBQUksRUFDSixVQUFVLEVBQ1YsUUFBUSxFQUNSLG9CQUFvQixHQUN2QjtJQUNHLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBTyxPQUFPLEVBQUUsRUFBRTs7UUFDakMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUU7WUFDbkIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNoQixHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ3RCLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FDWCxxQkFBcUIsUUFBUSxDQUFDLE9BQU8sMkNBQTJDLENBQ25GLENBQUM7U0FDTDtRQUVELGNBQWM7UUFDZCxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLGtDQUFrQyxDQUFDLEVBQUU7WUFDbkQsT0FBTyxJQUFJLEVBQUUsQ0FBQztTQUNqQjtRQUVELE1BQU0sTUFBTSxHQUFHO1lBQ1gsVUFBVTtZQUNWLEtBQUssRUFBRSxFQUFFO1lBQ1QsTUFBTSxFQUFFLFNBQVM7U0FDcEIsQ0FBQztRQUVGLE1BQU0sS0FB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