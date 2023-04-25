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
import { __uniqid } from '@coffeekraken/sugar/string';
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
            // ensure uid
            if (!data.uid) {
                data.uid = __uniqid();
            }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUM3QyxPQUFPLFdBQVcsTUFBTSwwQkFBMEIsQ0FBQztBQUNuRCxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUM3QyxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUM3QyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDekQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3pELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN0RCxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFFdEIsTUFBTSxDQUFDLE9BQU8sVUFBVSxLQUFLLENBQUMsRUFDMUIsR0FBRyxFQUNILEdBQUcsRUFDSCxJQUFJLEVBQ0osVUFBVSxFQUNWLFFBQVEsRUFDUixvQkFBb0IsR0FDdkI7SUFDRyxPQUFPLElBQUksT0FBTyxDQUFDLENBQU8sT0FBTyxFQUFFLEVBQUU7O1FBQ2pDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFO1lBQ25CLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDaEIsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUN0QixPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQ1gscUJBQXFCLFFBQVEsQ0FBQyxPQUFPLDJDQUEyQyxDQUNuRixDQUFDO1NBQ0w7UUFFRCxjQUFjO1FBQ2QsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxrQ0FBa0MsQ0FBQyxFQUFFO1lBQ25ELE9BQU8sSUFBSSxFQUFFLENBQUM7U0FDakI7UUFFRCxNQUFNLE1BQU0sR0FBRztZQUNYLFVBQVU7WUFDVixLQUFLLEVBQUUsRUFBRTtZ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