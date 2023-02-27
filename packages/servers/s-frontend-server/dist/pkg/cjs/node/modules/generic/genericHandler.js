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
const s_duration_1 = __importDefault(require("@coffeekraken/s-duration"));
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
const is_1 = require("@coffeekraken/sugar/is");
const object_1 = require("@coffeekraken/sugar/object");
const fs_1 = __importDefault(require("fs"));
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
function genericHandler({ req, res, next, pageConfig, pageFile, frontendServerConfig, }) {
    return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        var _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
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
        const theme = new s_theme_1.default();
        const bench = new s_bench_1.default('handlers.generic');
        bench.step('beforeViewsRendering');
        const renderedViews = [];
        for (let [idx, viewObj] of pageConfig.views.entries()) {
            let data = Object.assign({}, (_c = res.templateData) !== null && _c !== void 0 ? _c : {}, {
                theme: theme.get('.'),
            }), viewPath = viewObj.path;
            const duration = new s_duration_1.default();
            const viewBench = new s_bench_1.default(`handlers.generic.${(_d = viewObj.path) !== null && _d !== void 0 ? _d : viewObj}`);
            if (typeof viewObj === 'string') {
                viewPath = viewObj;
            }
            else if (viewObj === null || viewObj === void 0 ? void 0 : viewObj.data) {
                let dataHandlerStr;
                let dataSettings = (_f = (_e = viewObj.data) === null || _e === void 0 ? void 0 : _e.settings) !== null && _f !== void 0 ? _f : {}, dataParams = (_h = (_g = viewObj.data) === null || _g === void 0 ? void 0 : _g.params) !== null && _h !== void 0 ? _h : {}, dataFn;
                // directly passed function
                if ((0, is_1.__isPlainObject)(viewObj.data) && !viewObj.data.handler) {
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
                    if (fs_1.default.existsSync(dataHandlerStr)) {
                        dataFn = (yield (_a = dataHandlerStr, Promise.resolve().then(() => __importStar(require(_a))))).default;
                    }
                    else if (frontendServerConfig.data[dataHandlerStr]) {
                        dataFn = (yield (_b = frontendServerConfig.data[dataHandlerStr].path, Promise.resolve().then(() => __importStar(require(_b))))).default;
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
                    data = (0, object_1.__deepMerge)(data !== null && data !== void 0 ? data : {}, dataFnResult !== null && dataFnResult !== void 0 ? dataFnResult : {});
                }
            }
            // @TODO        find out why when using the "emit" function, nothing is logged...
            // emit('log', {
            //     type: __SLog.TYPE_ERROR,
            //     value: `<yellow>[genericHandler]</yellow> Rendering the view "<cyan>${viewPath}</cyan>"`,
            // });
            (_j = console.verbose) === null || _j === void 0 ? void 0 : _j.call(console, `<yellow>[genericHandler]</yellow> Rendering the view "<cyan>${viewPath}</cyan>"`);
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
            (_k = console.verbose) === null || _k === void 0 ? void 0 : _k.call(console, `<yellow>[genericHandler]</yellow> View "<cyan>${viewPath}</cyan>" rendered <green>successfully</green> in <yellow>${duration.end().formatedDuration}</yellow>`);
            viewBench.end();
        }
        bench.step('afterViewsRendering');
        bench.step('beforeLayoutRendering');
        let layoutPath = (_l = pageConfig.layout) !== null && _l !== void 0 ? _l : 'layouts.main';
        const layoutData = Object.assign({}, (_m = res.templateData) !== null && _m !== void 0 ? _m : {});
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
exports.default = genericHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRWQsb0VBQTZDO0FBQzdDLDBFQUFtRDtBQUNuRCxvRUFBNkM7QUFDN0MsK0NBQXlEO0FBQ3pELHVEQUF5RDtBQUN6RCw0Q0FBc0I7QUFFdEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FtQkc7QUFFSCxTQUF3QixjQUFjLENBQUMsRUFDbkMsR0FBRyxFQUNILEdBQUcsRUFDSCxJQUFJLEVBQ0osVUFBVSxFQUNWLFFBQVEsRUFDUixvQkFBb0IsR0FDdkI7SUFDRyxPQUFPLElBQUksT0FBTyxDQUFDLENBQU8sT0FBTyxFQUFFLEVBQUU7OztRQUNqQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRTtZQUNuQixHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2hCLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDdEIsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUNYLHFCQUFxQixRQUFRLENBQUMsT0FBTywyQ0FBMkMsQ0FDbkYsQ0FBQztTQUNMO1FBRUQsY0FBYztRQUNkLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsa0NBQWtDLENBQUMsRUFBRTtZQUNuRCxPQUFPLElBQUksRUFBRSxDQUFDO1NBQ2pCO1FBRUQsTUFBTSxNQUFNLEdBQUc7WUFDWCxVQUFVO1lBQ1YsS0FBSyxFQUFFLEVBQUU7WUFDVCxNQUFNLEVBQUUsU0FBUztTQUNwQixDQUFDO1FBRUYsTUFBTSxLQUFLLEdBQUcsSUFBSSxpQkFBUSxFQUFFLENBQUM7UUFFN0IsTUFBTSxLQUFLLEdBQUcsSUFBSSxpQkFBUSxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFFL0MsS0FBSyxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1FB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