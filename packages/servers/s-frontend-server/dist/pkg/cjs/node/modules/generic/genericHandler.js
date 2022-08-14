"use strict";
// @ts-nocheck
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_bench_1 = __importDefault(require("@coffeekraken/s-bench"));
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
const fs_1 = __importDefault(require("fs"));
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
function genericHandler({ req, res, pageConfig, pageFile, frontendServerConfig, }) {
    return new s_promise_1.default(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
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
        s_bench_1.default.start('handlers.generic');
        s_bench_1.default.step('handlers.generic', 'beforeViewsRendering');
        const renderedViews = [];
        for (let [idx, viewObj] of pageConfig.views.entries()) {
            let data = Object.assign({}, (_a = res.templateData) !== null && _a !== void 0 ? _a : {}), viewPath = viewObj.path;
            // delete data.shared.docmap;
            s_bench_1.default.step(`handlers.generic`, `beforeViewRendering.${viewPath}`);
            if (typeof viewObj === 'string') {
                viewPath = viewObj;
            }
            else if (viewObj === null || viewObj === void 0 ? void 0 : viewObj.data) {
                let dataFn = () => { };
                if (fs_1.default.existsSync(viewObj.data)) {
                    dataFn = (yield Promise.resolve().then(() => __importStar(require(viewObj.data)))).default;
                }
                else if (frontendServerConfig.data[viewObj.data]) {
                    dataFn = (yield Promise.resolve().then(() => __importStar(require(frontendServerConfig.data[viewObj.data].path)))).default;
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
                    data = (0, deepMerge_1.default)(data !== null && data !== void 0 ? data : {}, dataFnResult !== null && dataFnResult !== void 0 ? dataFnResult : {});
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
            s_bench_1.default.step(`handlers.generic`, `afterViewRendering.${viewPath}`);
        }
        s_bench_1.default.step('handlers.generic', 'afterViewsRendering');
        s_bench_1.default.step('handlers.generic', 'beforeLayoutRendering');
        let layoutPath = (_b = pageConfig.layout) !== null && _b !== void 0 ? _b : 'layouts.main';
        const layoutData = Object.assign((_c = res.templateData) !== null && _c !== void 0 ? _c : {});
        delete layoutData.shared;
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
        catch (e) { }
        if (errors.views.length || errors.layout) {
            finalResult = JSON.stringify(errors, null, 4);
        }
        s_bench_1.default.step('handlers.generic', 'afterLayoutRendering');
        s_bench_1.default.end('handlers.generic').log();
        res.status(200);
        res.type(errors.views.length || errors.layout
            ? 'application/json'
            : 'text/html');
        res.send(finalResult);
        return resolve(finalResult);
    }));
}
exports.default = genericHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRWQsb0VBQTZDO0FBQzdDLHdFQUFpRDtBQUNqRCw0RkFBc0U7QUFDdEUsNENBQXNCO0FBRXRCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrQkc7QUFFSCxTQUF3QixjQUFjLENBQUMsRUFDbkMsR0FBRyxFQUNILEdBQUcsRUFDSCxVQUFVLEVBQ1YsUUFBUSxFQUNSLG9CQUFvQixHQUN2QjtJQUNHLE9BQU8sSUFBSSxtQkFBVSxDQUFDLENBQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFOztRQUM1RCxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRTtZQUNuQixHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2hCLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDdEIsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUNYLHFCQUFxQixRQUFRLENBQUMsT0FBTywyQ0FBMkMsQ0FDbkYsQ0FBQztTQUNMO1FBRUQsTUFBTSxNQUFNLEdBQUc7WUFDWCxVQUFVO1lBQ1YsS0FBSyxFQUFFLEVBQUU7WUFDVCxNQUFNLEVBQUUsU0FBUztTQUNwQixDQUFDO1FBRUYsMkRBQTJEO1FBQzNELDBDQUEwQztRQUMxQyx1QkFBdUI7UUFDdkIsc0JBQXNCO1FBQ3RCLHdCQUF3QjtRQUN4QixJQUFJO1FBRUosaUJBQVEsQ0FBQyxLQUFLLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUVuQyxpQkFBUSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxzQkFBc0IsQ0FBQyxDQUFDO1FBRTFELE1BQU0sYUFBYSxHQUFhLEVBQUUsQ0FBQztRQUVuQyxLQUFLLElBQUksQ0FBQyxHQUFHLEVBQUUs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