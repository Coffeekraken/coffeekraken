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
import __STheme from '@coffeekraken/s-theme';
import { __isPlainObject } from '@coffeekraken/sugar/is';
import { __deepMerge } from '@coffeekraken/sugar/object';
import __fs from 'fs';
/**
 * @name                genericHandler
 * @namespace           node.modules.docmap
 * @type                Function
 * @platform            node
 * @status              beta
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
export default function genericHandler({ req, res, next, pageConfig, pageFile, frontendServerConfig, }) {
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
        const theme = new __STheme();
        const bench = new __SBench('handlers.generic');
        bench.step('beforeViewsRendering');
        const renderedViews = [];
        for (let [idx, viewObj] of pageConfig.views.entries()) {
            let data = Object.assign({}, (_a = res.templateData) !== null && _a !== void 0 ? _a : {}, {
                theme: theme.get('.'),
            }), viewPath = viewObj.path;
            const duration = new __SDuration();
            const viewBench = new __SBench(`handlers.generic.${(_b = viewObj.path) !== null && _b !== void 0 ? _b : viewObj}`);
            if (typeof viewObj === 'string') {
                viewPath = viewObj;
            }
            else if (viewObj === null || viewObj === void 0 ? void 0 : viewObj.data) {
                let dataHandlerStr;
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
            const viewResPro = res.viewRenderer.render(viewPath, data);
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
            const layoutPromise = res.viewRenderer.render(layoutPath, Object.assign(Object.assign({}, layoutData), { body: renderedViews.join('\n') }));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUM3QyxPQUFPLFdBQVcsTUFBTSwwQkFBMEIsQ0FBQztBQUNuRCxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUM3QyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDekQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3pELE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUV0Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW1CRztBQUVILE1BQU0sQ0FBQyxPQUFPLFVBQVUsY0FBYyxDQUFDLEVBQ25DLEdBQUcsRUFDSCxHQUFHLEVBQ0gsSUFBSSxFQUNKLFVBQVUsRUFDVixRQUFRLEVBQ1Isb0JBQW9CLEdBQ3ZCO0lBQ0csT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFPLE9BQU8sRUFBRSxFQUFFOztRQUNqQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRTtZQUNuQixHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2hCLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDdEIsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUNYLHFCQUFxQixRQUFRLENBQUMsT0FBTywyQ0FBMkMsQ0FDbkYsQ0FBQztTQUNMO1FBRUQsY0FBYztRQUNkLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsa0NBQWtDLENBQUMsRUFBRTtZQUNuRCxPQUFPLElBQUksRUFBRSxDQUFDO1NBQ2pCO1FBRUQsTUFBTSxNQUFNLEdBQUc7WUFDWCxVQUFVO1lBQ1YsS0FBSyxFQUFFLEVBQUU7WUFDVCxNQUFNLEVBQUUsU0FBUztTQUNwQixDQUFDO1FBRUYsTUFBTSxLQUFLLEdB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