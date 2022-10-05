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
import __SPromise from '@coffeekraken/s-promise';
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
export default function genericHandler({ req, res, pageConfig, pageFile, frontendServerConfig, }) {
    return new __SPromise(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e, _f, _g;
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
        __SBench.start('handlers.generic');
        __SBench.step('handlers.generic', 'beforeViewsRendering');
        const renderedViews = [];
        for (let [idx, viewObj] of pageConfig.views.entries()) {
            let data = Object.assign({}, (_a = res.templateData) !== null && _a !== void 0 ? _a : {}), viewPath = viewObj.path;
            __SBench.step(`handlers.generic`, `beforeViewRendering.${viewPath}`);
            if (typeof viewObj === 'string') {
                viewPath = viewObj;
            }
            else if (viewObj === null || viewObj === void 0 ? void 0 : viewObj.data) {
                let dataHandlerStr;
                let dataSettings = (_c = (_b = viewObj.data) === null || _b === void 0 ? void 0 : _b.settings) !== null && _c !== void 0 ? _c : {}, dataParams = (_e = (_d = viewObj.data) === null || _d === void 0 ? void 0 : _d.params) !== null && _e !== void 0 ? _e : {}, dataFn;
                // directly passed function
                if (__isPlainObject(viewObj.data)) {
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
                const dataFnResult = yield dataFn({
                    req,
                    res,
                    viewRenderer: res.viewRenderer,
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
            __SBench.step(`handlers.generic`, `afterViewRendering.${viewPath}`);
        }
        __SBench.step('handlers.generic', 'afterViewsRendering');
        __SBench.step('handlers.generic', 'beforeLayoutRendering');
        let layoutPath = (_f = pageConfig.layout) !== null && _f !== void 0 ? _f : 'layouts.main';
        const layoutData = Object.assign({}, (_g = res.templateData) !== null && _g !== void 0 ? _g : {});
        let finalResult;
        // rendering layout using data
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
        __SBench.step('handlers.generic', 'afterLayoutRendering');
        __SBench.end('handlers.generic').log();
        res.status(200);
        res.type(errors.views.length || errors.layout
            ? 'application/json'
            : 'text/html');
        res.send(finalResult);
        return resolve(finalResult);
    }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUM3QyxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDekQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3pELE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUV0Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0JHO0FBRUgsTUFBTSxDQUFDLE9BQU8sVUFBVSxjQUFjLENBQUMsRUFDbkMsR0FBRyxFQUNILEdBQUcsRUFDSCxVQUFVLEVBQ1YsUUFBUSxFQUNSLG9CQUFvQixHQUN2QjtJQUNHLE9BQU8sSUFBSSxVQUFVLENBQUMsQ0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7O1FBQzVELElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFO1lBQ25CLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDaEIsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUN0QixPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQ1gscUJBQXFCLFFBQVEsQ0FBQyxPQUFPLDJDQUEyQyxDQUNuRixDQUFDO1NBQ0w7UUFFRCxNQUFNLE1BQU0sR0FBRztZQUNYLFVBQVU7WUFDVixLQUFLLEVBQUUsRUFBRTtZQUNULE1BQU0sRUFBRSxTQUFTO1NBQ3BCLENBQUM7UUFFRiwyREFBMkQ7UUFDM0QsMENBQTBDO1FBQzFDLHVCQUF1QjtRQUN2QixzQkFBc0I7UUFDdEIsd0JBQXdCO1FBQ3hCLElBQUk7UUFFSixRQUFRLENBQUMsS0FBSyxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFFbkMsUUFBUSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxzQkFBc0IsQ0FBQyxDQUFDO1FBRTFELE1BQU0sYUFBYSxHQUFhLEVBQUUsQ0FBQztRQUVuQyxLQUFLLElBQUksQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDLElBQUksVUFBVSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsRUFBRTtZQUNuRCxJQUFJLElBQUksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxNQUFBLEdBQUcsQ0FBQyxZQUFZLG1DQUFJLEVBQUUsQ0FBQyxFQUNoRCxRQUFRLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQztZQUU1QixRQUFRLENBQUMsSUFBSSxDQUNULGtCQUFrQixFQUNsQix1QkFBdUIsUUFBUSxFQUFFLENBQ3BDLENBQUM7WUFFRixJQUFJLE9BQU8sT0FBTyxLQUFLLFFBQVEsRUFBRTtnQkFDN0IsUUFBUSxHQUFHLE9BQU8sQ0FBQzthQUN0QjtpQkFBTSxJQUFJLE9BQU8sYUFBUCxPQUFPLHVCQUFQLE9BQU8sQ0FBRSxJQUFJLEVBQUU7Z0JBQ3RCLElBQUksY0FBYyxDQUFDO2dCQUVuQixJQUFJLFlBQVksR0FBRyxNQUFBLE1BQUEsT0FBTyxDQUFDLElBQUksMENBQUUsUUFBUSxtQ0FBSSxFQUFFLEVBQzNDLFVBQVUsR0FBRyxNQUFBLE1BQUEsT0FBTyxDQUFDLElBQUksMENBQUUsTUFBTSxtQ0FBSSxFQUFFLEVBQ3ZDLE1BQU0sQ0FBQztnQkFFWCwyQkFBMkI7Z0JBQzNCLElBQUksZUFBZSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTtvQkFDL0IsTUFBTSxHQUFHLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7aUJBQy9CO3FCQUFNLElBQUksT0FBTyxPQUFPLENBQUMsSUFBSSxLQUFLLFVBQVUsRUFBRTtvQkFDM0MsTUFBTSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUM7aUJBQ3pCO3FCQUFNLElBQ0gsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPO29CQUNwQixPQUFPLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxLQUFLLFVBQVUsRUFDNUM7b0JBQ0UsTUFBTSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO2lCQUNqQztnQkFFRCxJQUFJLENBQUMsTUFBTSxFQUFFO29CQUNULElBQUksT0FBTyxPQUFPLENBQUMsSUFBSSxLQUFLLFFBQVEsRUFBRTt3QkFDbEMsY0FBYyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUM7cUJBQ2pDO3lCQUFNLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7d0JBQzdCLGNBQWMsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztxQkFDekM7eUJBQU07d0JBQ0gsTUFBTSxJQUFJLEtBQUssQ0FDWCwwR0FBMEcsR0FBRyxDQUFDLEdBQUcsMEJBQTBCLENBQzlJLENBQUM7cUJBQ0w7b0JBRUQsa0NBQWtDO29CQUNsQyxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLEVBQUU7d0JBQ2pDLE1BQU0sR0FBRyxDQUFDLE1BQU0sTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO3FCQUNuRDt5QkFBTSxJQUFJLG9CQUFvQixDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsRUFBRTt3QkFDbEQsTUFBTSxHQUFHLENBQ0wsTUFBTSxNQUFNLENBQ1Isb0JBQW9CLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLElBQUksQ0FDakQsQ0FDSixDQUFDLE9BQU8sQ0FBQztxQkFDYjtpQkFDSjtnQkFFRCxLQUFLLElBQUksQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsRUFBRTtvQkFDbkQsSUFBSSxPQUFPLEtBQUssS0FBSyxVQUFVLEVBQUU7d0JBQzdCLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsS0FBSyxDQUFDOzRCQUN0QixHQUFHOzRCQUNILEdBQUc7NEJBQ0gsUUFBUSxFQUFFLFlBQVk7NEJBQ3RCLG9CQUFvQjt5QkFDdkIsQ0FBQyxDQUFDO3FCQUNOO3lCQUFNO3dCQUNILEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsS0FBSyxDQUFDO3FCQUM3QjtpQkFDSjtnQkFFRCxNQUFNLFlBQVksR0FBRyxNQUFNLE1BQU0sQ0FBQztvQkFDOUIsR0FBRztvQkFDSCxHQUFHO29CQUNILFlBQVksRUFBRSxHQUFHLENBQUMsWUFBWTtvQkFDOUIsTUFBTSxFQUFFLFVBQVU7b0JBQ2xCLFFBQVEsRUFBRSxZQUFZO29CQUN0QixVQUFVO29CQUNWLFFBQVE7b0JBQ1Isb0JBQW9CO2lCQUN2QixDQUFDLENBQUM7Z0JBQ0gsSUFBSSxZQUFZLFlBQVksS0FBSyxFQUFFO29CQUMvQixJQUFJLENBQUMsS0FBSyxFQUFFO3dCQUNSLElBQUksRUFBRSxNQUFNLENBQUMsVUFBVTt3QkFDdkIsS0FBSyxFQUFFLFlBQVk7cUJBQ3RCLENBQUMsQ0FBQztpQkFDTjtxQkFBTTtvQkFDSCxJQUFJLEdBQUcsV0FBVyxDQUFDLElBQUksYUFBSixJQUFJLGNBQUosSUFBSSxHQUFJLEVBQUUsRUFBRSxZQUFZLGFBQVosWUFBWSxjQUFaLFlBQVksR0FBSSxFQUFFLENBQUMsQ0FBQztpQkFDdEQ7YUFDSjtZQUVELDRCQUE0QjtZQUM1QixNQUFNLFVBQVUsR0FBRyxHQUFHLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDM0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ2pCLElBQUksT0FBTyxHQUFHLE1BQU0sVUFBVSxDQUFDO1lBQy9CLElBQUksT0FBTyxDQUFDLEtBQUssRUFBRTtnQkFDZixNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztvQkFDZCxRQUFRO29CQUNSLElBQUk7b0JBQ0osS0FBSyxFQUFFLE9BQU8sQ0FBQyxLQUFLO2lCQUN2QixDQUFDLENBQUM7YUFDTjtpQkFBTTtnQkFDSCxhQUFhLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUNyQztZQUVELFFBQVEsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsc0JBQXNCLFFBQVEsRUFBRSxDQUFDLENBQUM7U0FDdkU7UUFFRCxRQUFRLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFLHFCQUFxQixDQUFDLENBQUM7UUFFekQsUUFBUSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSx1QkFBdUIsQ0FBQyxDQUFDO1FBRTNELElBQUksVUFBVSxHQUFHLE1BQUEsVUFBVSxDQUFDLE1BQU0sbUNBQUksY0FBYyxDQUFDO1FBRXJELE1BQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLE1BQUEsR0FBRyxDQUFDLFlBQVksbUNBQUksRUFBRSxDQUFDLENBQUM7UUFFN0QsSUFBSSxXQUFXLENBQUM7UUFFaEIsOEJBQThCO1FBQzlCLElBQUk7WUFDQSxNQUFNLGFBQWEsR0FBRyxHQUFHLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxVQUFVLGtDQUNqRCxVQUFVLEtBQ2IsSUFBSSxFQUFFLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQ2hDLENBQUM7WUFDSCxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDcEIsTUFBTSxTQUFTLEdBQUcsTUFBTSxhQUFhLENBQUM7WUFFdEMsSUFBSSxTQUFTLENBQUMsS0FBSyxFQUFFO2dCQUNqQixNQUFNLENBQUMsTUFBTSxHQUFHO29CQUNaLFVBQVU7b0JBQ1YsS0FBSyxFQUFFLFNBQVMsQ0FBQyxLQUFLO2lCQUN6QixDQUFDO2FBQ0w7aUJBQU07Z0JBQ0gsV0FBVyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUM7YUFDakM7U0FDSjtRQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ1Isa0JBQWtCO1NBQ3JCO1FBRUQsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUMsTUFBTSxFQUFFO1lBQ3RDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtnQkFDeEMsT0FBTyxPQUFPLENBQUMsSUFBSSxDQUFDO2dCQUNwQixPQUFPLE9BQU8sQ0FBQztZQUNuQixDQUFDLENBQUMsQ0FBQztZQUNILFdBQVcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO2lCQUN4QyxLQUFLLENBQUMsS0FBSyxDQUFDO2lCQUNaLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUNyQjtRQUVELFFBQVEsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsc0JBQXNCLENBQUMsQ0FBQztRQUUxRCxRQUFRLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7UUFFdkMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNoQixHQUFHLENBQUMsSUFBSSxDQUNKLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQyxNQUFNO1lBQ2hDLENBQUMsQ0FBQyxrQkFBa0I7WUFDcEIsQ0FBQyxDQUFDLFdBQVcsQ0FDcEIsQ0FBQztRQUNGLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDdEIsT0FBTyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDaEMsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUNQLENBQUMifQ==