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
export default function dynamicHandler({ req, res, pageConfig, pageFile, frontendServerConfig, }) {
    return new __SPromise(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c;
        if (!pageConfig.views) {
            res.status(200);
            res.type('text/html');
            return res.send(`Your page config "${pageFile.relPath}" does not contain any views to render...`);
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
        __SBench.start('handlers.dynamic');
        __SBench.step('handlers.dynamic', 'beforeViewsRendering');
        const renderedViews = [];
        for (let [idx, viewObj] of pageConfig.views.entries()) {
            let data = Object.assign({}, (_a = res.templateData) !== null && _a !== void 0 ? _a : {}), viewPath = viewObj.path;
            // remove the shared data
            delete data.shared;
            if (typeof viewObj === 'string') {
                viewPath = viewObj;
            }
            __SBench.step(`handlers.dynamic`, `beforeViewRendering.${viewPath}`);
            // data
            if (viewObj.data) {
                let dataFn = () => { };
                if (__fs.existsSync(viewObj.data)) {
                    dataFn = (yield import(viewObj.data)).default;
                }
                else if (frontendServerConfig.data[viewObj.data]) {
                    dataFn = (yield import(frontendServerConfig.data[viewObj.data].path)).default;
                }
                const dataFnResult = yield dataFn({
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
                }
                else {
                    data = __deepMerge(data !== null && data !== void 0 ? data : {}, dataFnResult !== null && dataFnResult !== void 0 ? dataFnResult : {});
                }
            }
            // rendering view using data
            const viewResPro = res.viewRenderer.render(viewPath, data);
            pipe(viewResPro);
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
            __SBench.step(`handlers.dynamic`, `afterViewRendering.${viewPath}`);
        }
        __SBench.step('handlers.dynamic', 'afterViewsRendering');
        __SBench.step('handlers.dynamic', 'beforeLayoutRendering');
        let layoutPath = (_b = pageConfig.layout) !== null && _b !== void 0 ? _b : 'layouts.main';
        const layoutData = Object.assign({}, (_c = res.templateData) !== null && _c !== void 0 ? _c : {});
        delete layoutData.shared;
        let finalResult;
        // rendering view using data
        try {
            const layoutPromise = res.viewRenderer.render(layoutPath, Object.assign(Object.assign({}, layoutData), { body: renderedViews.join('\n') }));
            pipe(layoutPromise);
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
        catch (e) { }
        if (errors.views.length || errors.layout) {
            finalResult = JSON.stringify(errors, null, 4);
        }
        __SBench.step('handlers.dynamic', 'afterLayoutRendering');
        __SBench.end('handlers.dynamic').log();
        res.status(200);
        res.type(errors.views.length || errors.layout
            ? 'application/json'
            : 'text/html');
        res.send(finalResult);
        return resolve(finalResult);
    }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUM3QyxPQUFPLE1BQU0sTUFBTSxxQkFBcUIsQ0FBQztBQUN6QyxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQUN0RSxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFHdEI7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWtCRztBQUVILE1BQU0sQ0FBQyxPQUFPLFVBQVUsY0FBYyxDQUFDLEVBQ25DLEdBQUcsRUFDSCxHQUFHLEVBQ0gsVUFBVSxFQUNWLFFBQVEsRUFDUixvQkFBb0IsR0FDdkI7SUFDRyxPQUFPLElBQUksVUFBVSxDQUFDLENBQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFOztRQUM1RCxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRTtZQUNuQixHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2hCLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDdEIsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUNYLHFCQUFxQixRQUFRLENBQUMsT0FBTywyQ0FBMkMsQ0FDbkYsQ0FBQztTQUNMO1FBRUQsTUFBTSxNQUFNLEdBQUc7WUFDWCxVQUFVO1lBQ1YsS0FBSyxFQUFFLEVBQUU7WUFDVCxNQUFNLEVBQUUsU0FBUztTQUNwQixDQUFDO1FBRUYsMkRBQTJEO1FBQzNELDBDQUEwQztRQUMxQyx1QkFBdUI7UUFDdkIsc0JBQXNCO1FBQ3RCLHdCQUF3QjtRQUN4QixJQUFJO1FBRUosUUFBUSxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBRW5DLFFBQVEsQ0FBQyxJQUFJLENB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