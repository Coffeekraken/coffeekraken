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
function carpenterViewHandler({ req, res, specs, params, }) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const bench = new s_bench_1.default('data.carpenterViewHandler');
        bench.step('beforeSpecsRead');
        // load current component/section/... specs
        const specsInstance = new s_specs_1.default();
        const currentSpecs = yield specsInstance.read(req.params.dotpath);
        if (!currentSpecs) {
            return res.send(`The requested spec "${req.params.dotpath}" does not exists...`);
        }
        const viewPath = (_a = currentSpecs.viewPath) !== null && _a !== void 0 ? _a : req.params.dotpath.replace(/^views\./, '');
        // render the current component/section, etc...
        const renderer = new s_view_renderer_1.default();
        const currentViewResult = yield renderer.render(viewPath, currentSpecs.metas.path);
        const errors = {
            views: [],
            layout: undefined,
        };
        let layoutPath = 'sugar.layouts.carpenter.carpenter', finalResult;
        // rendering layout using data
        try {
            const layoutPromise = renderer.render(layoutPath, {
                carpenter: specs,
                frontspec: {
                    assets: {
                        carpenterModule: {
                            type: 'module',
                            defer: true,
                            src: params.dev
                                ? `http://0.0.0.0:${params.vitePort}/src/js/index.ts`
                                : '/carpenter/index.esm.js',
                        },
                        // carpenterStyle: {
                        //     id: 'carpenter',
                        //     defer: true,
                        //     src: '/carpenter/index.css',
                        // },
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
                    },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0VBQTZDO0FBQzdDLG9FQUE2QztBQUM3QyxvRkFBNEQ7QUFFNUQsU0FBOEIsb0JBQW9CLENBQUMsRUFDL0MsR0FBRyxFQUNILEdBQUcsRUFDSCxLQUFLLEVBQ0wsTUFBTSxHQUNUOzs7UUFDRyxNQUFNLEtBQUssR0FBRyxJQUFJLGlCQUFRLENBQUMsMkJBQTJCLENBQUMsQ0FBQztRQUV4RCxLQUFLLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFFOUIsMkNBQTJDO1FBQzNDLE1BQU0sYUFBYSxHQUFHLElBQUksaUJBQVEsRUFBRSxDQUFDO1FBQ3JDLE1BQU0sWUFBWSxHQUFHLE1BQU0sYUFBYSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRWxFLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDZixPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQ1gsdUJBQXVCLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxzQkFBc0IsQ0FDbEUsQ0FBQztTQUNMO1FBRUQsTUFBTSxRQUFRLEdBQ1YsTUFBQSxZQUFZLENBQUMsUUFBUSxtQ0FBSSxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBRXhFLCtDQUErQztRQUMvQyxNQUFNLFFBQVEsR0FBRyxJQUFJLHlCQUFlLEVBQUUsQ0FBQztRQUN2QyxNQUFNLGlCQUFpQixHQUFHLE1BQU0sUUFBUSxDQUFDLE1BQU0sQ0FDM0MsUUFBUSxFQUNSLFlBQVksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUMxQixDQUFDO1FBRUYsTUFBTSxNQUFNLEdBQUc7WUFDWCxLQUFLLEVBQUUsRUFBRTtZQUNULE1BQU0sRUFBRSxTQUFTO1NBQ3BCLENBQUM7UUFFRixJ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