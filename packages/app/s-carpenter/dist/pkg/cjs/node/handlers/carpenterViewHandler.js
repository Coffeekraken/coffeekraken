"use strict";
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
const s_specs_1 = __importDefault(require("@coffeekraken/s-specs"));
const s_view_renderer_1 = __importDefault(require("@coffeekraken/s-view-renderer"));
const php_1 = require("@coffeekraken/sugar/php");
function carpenterViewHandler({ req, res, specs, params, }) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const bench = new s_bench_1.default('data.carpenterViewHandler');
        bench.step('beforeSpecsRead');
        const isRequestFromIframe = req.query.iframe !== undefined;
        // load current component/section/... specs
        const specsInstance = new s_specs_1.default();
        const currentSpecs = yield specsInstance.read(req.params.dotpath);
        if (!currentSpecs) {
            return res.send(`The requested spec "${req.params.dotpath}" does not exists...`);
        }
        let viewPath = (_a = currentSpecs.viewPath) !== null && _a !== void 0 ? _a : req.params.dotpath.replace(/^views\./, ''), viewData = currentSpecs.metas.path; // path to the data file
        // if the method is "POST",
        // meaning that it's a component update
        // with some component data passed.
        // we use these instead of the default ones
        if (req.method === 'POST' && req.body) {
            viewData = req.body;
        }
        // render the current component/section, etc...
        const renderer = new s_view_renderer_1.default();
        const currentViewResult = yield renderer.render(viewPath, viewData);
        // if the request if made with a POST method
        // this mean that it's just a component update
        // we don't need to render le layout, etc...
        if (req.method === 'POST') {
            res.status(200);
            res.type('text/html');
            return res.send(currentViewResult.value);
        }
        const errors = {
            views: [],
            layout: undefined,
        };
        let layoutPath = 'sugar.layouts.carpenter.carpenter', finalResult;
        // rendering layout using data
        try {
            const layoutPromise = renderer.render(layoutPath, {
                carpenter: specs,
                $_SERVER: (0, php_1.__serverObjectFromExpressRequest)(req),
                frontspec: {
                    assets: Object.assign({ carpenterModule: {
                            type: 'module',
                            defer: true,
                            src: params.dev
                                ? `http://0.0.0.0:${params.vitePort}/src/js/index.ts`
                                : '/carpenter/index.esm.js',
                        }, carpenterStyle: {
                            id: 'carpenter',
                            defer: true,
                            src: params.dev
                                ? `http://0.0.0.0:${params.vitePort}/src/css/index.css`
                                : '/carpenter/index.css',
                        } }, (isRequestFromIframe
                        ? {
                            module: {
                                type: 'module',
                                defer: true,
                                src: params.jsPath,
                            },
                            style: {
                                id: 'global',
                                defer: true,
                                src: params.cssPath,
                            },
                        }
                        : {})),
                },
                body: currentViewResult.value,
            });
            const layoutRes = yield layoutPromise;
            finalResult = layoutRes.value;
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
            console.error(e);
        }
        if (errors.views.length || errors.layout) {
            errors.views = errors.views.map((viewObj) => {
                delete viewObj.data;
                return viewObj;
            });
            finalResult = JSON.stringify(errors, null, 4).split(/\\n/).join(`\n\n`);
        }
        bench.end().log();
        res.status(200);
        res.type(errors.views.length || errors.layout ? 'application/json' : 'text/html');
        res.send(finalResult);
    });
}
exports.default = carpenterViewHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0VBQTZDO0FBQzdDLG9FQUE2QztBQUM3QyxvRkFBNEQ7QUFDNUQsaURBQTJFO0FBRTNFLFNBQThCLG9CQUFvQixDQUFDLEVBQy9DLEdBQUcsRUFDSCxHQUFHLEVBQ0gsS0FBSyxFQUNMLE1BQU0sR0FDVDs7O1FBQ0csTUFBTSxLQUFLLEdBQUcsSUFBSSxpQkFBUSxDQUFDLDJCQUEyQixDQUFDLENBQUM7UUFFeEQsS0FBSyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBRTlCLE1BQU0sbUJBQW1CLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLEtBQUssU0FBUyxDQUFDO1FBRTNELDJDQUEyQztRQUMzQyxNQUFNLGFBQWEsR0FBRyxJQUFJLGlCQUFRLEVBQUUsQ0FBQztRQUNyQyxNQUFNLFlBQVksR0FBRyxNQUFNLGFBQWEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUVsRSxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ2YsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUNYLHVCQUF1QixHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sc0JBQXNCLENBQ2xFLENBQUM7U0FDTDtRQUVELElBQUksUUFBUSxHQUNKLE1BQUEsWUFBWSxDQUFDLFFBQVEsbUNBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUMsRUFDdkUsUUFBUSxHQUFHLFlBQVksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsd0JBQXdCO1FBRWhFLDJCQUEyQjtRQUMzQix1Q0FBdUM7UUFDdkMsbUNBQW1DO1FBQ25DLDJDQUEyQztRQUMzQyxJQUFJLEdBQUcsQ0FBQyxNQUFNLEtBQUssTUFBTSxJQUFJLEdBQUcs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