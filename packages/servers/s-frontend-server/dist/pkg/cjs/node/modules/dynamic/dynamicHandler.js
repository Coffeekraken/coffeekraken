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
const s_log_1 = __importDefault(require("@coffeekraken/s-log"));
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
const fs_1 = __importDefault(require("fs"));
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
function dynamicHandler({ req, res, pageConfig, pageFile, frontendServerConfig, }) {
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
        // if we refer to a file with an extension, stop here...
        if (req.url.match(/.*\.[a-z]{1,4}$/)) {
            res.status(404);
            res.send(null);
            return resolve();
        }
        s_bench_1.default.start('handlers.dynamic');
        s_bench_1.default.step('handlers.dynamic', 'beforeViewsRendering');
        const renderedViews = [];
        for (let [idx, viewObj] of pageConfig.views.entries()) {
            let data = Object.assign({}, (_a = res.templateData) !== null && _a !== void 0 ? _a : {}), viewPath = viewObj.path;
            // remove the shared data
            delete data.shared;
            if (typeof viewObj === 'string') {
                viewPath = viewObj;
            }
            s_bench_1.default.step(`handlers.dynamic`, `beforeViewRendering.${viewPath}`);
            // data
            if (viewObj.data) {
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
                        type: s_log_1.default.TYPE_ERROR,
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
            s_bench_1.default.step(`handlers.dynamic`, `afterViewRendering.${viewPath}`);
        }
        s_bench_1.default.step('handlers.dynamic', 'afterViewsRendering');
        s_bench_1.default.step('handlers.dynamic', 'beforeLayoutRendering');
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
        s_bench_1.default.step('handlers.dynamic', 'afterLayoutRendering');
        s_bench_1.default.end('handlers.dynamic').log();
        res.status(200);
        res.type(errors.views.length || errors.layout
            ? 'application/json'
            : 'text/html');
        res.send(finalResult);
        return resolve(finalResult);
    }));
}
exports.default = dynamicHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRWQsb0VBQTZDO0FBQzdDLGdFQUF5QztBQUN6Qyx3RUFBaUQ7QUFDakQsNEZBQXNFO0FBQ3RFLDRDQUFzQjtBQUd0Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0JHO0FBRUgsU0FBd0IsY0FBYyxDQUFDLEVBQ25DLEdBQUcsRUFDSCxHQUFHLEVBQ0gsVUFBVSxFQUNWLFFBQVEsRUFDUixvQkFBb0IsR0FDdkI7SUFDRyxPQUFPLElBQUksbUJBQVUsQ0FBQyxDQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTs7UUFDNUQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUU7WUFDbkIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNoQixHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ3RCLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FDWCxxQkFBcUIsUUFBUSxDQUFDLE9BQU8sMkNBQTJDLENBQ25GLENBQUM7U0FDTDtRQUVELE1BQU0sTUFBTSxHQUFHO1lBQ1gsVUFBVTtZQUNWLEtBQUssRUFBRSxFQUFFO1lBQ1QsTUFBTSxFQUFFLFNBQVM7U0FDcEIsQ0FBQztRQUVGLHdEQUF3RDtRQUN4RCxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLGlCQUFpQixDQUFDLEVBQUU7WUFDbEMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNoQixHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2YsT0FBTyxPQUFPLEVBQUUsQ0FBQztTQUNwQjtRQUVELGlCQUFRLENBQUMsS0FBSyxDQUFDLGtCQUFrQixDQUFDLENB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