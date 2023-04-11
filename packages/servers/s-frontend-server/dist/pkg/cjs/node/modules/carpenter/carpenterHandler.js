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
const s_carpenter_1 = __importDefault(require("@coffeekraken/s-carpenter"));
const s_specs_1 = __importDefault(require("@coffeekraken/s-specs"));
function carpenterHandler({ req, res, pageConfig }) {
    return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c;
        const bench = new s_bench_1.default('data.carpenterHandler');
        bench.step('beforeSitemapRead');
        // load current component/section/... specs
        const specsInstance = new s_specs_1.default();
        const currentSpecs = yield specsInstance.read(req.params.dotpath);
        // load the global carpenter specs
        const carpenterInstance = new s_carpenter_1.default();
        const carpenterSpecs = yield carpenterInstance.loadSpecs();
        const viewPath = (_a = currentSpecs.viewPath) !== null && _a !== void 0 ? _a : req.params.dotpath.replace(/^views\./, '');
        _console.log('SSSSS', viewPath);
        // render the current component/section, etc...
        const currentViewResult = yield res.viewRenderer.render(viewPath, currentSpecs.metas.path);
        const errors = {
            pageConfig,
            views: [],
            layout: undefined,
        };
        let layoutPath = (_b = pageConfig.layout) !== null && _b !== void 0 ? _b : 'sugar.layouts.nude';
        const layoutData = Object.assign({}, (_c = res.templateData) !== null && _c !== void 0 ? _c : {});
        let finalResult;
        // rendering layout using data
        try {
            const layoutPromise = res.viewRenderer.render(layoutPath, Object.assign(Object.assign({}, layoutData), { carpenter: carpenterSpecs, body: currentViewResult.value }));
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
            console.error(e);
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
        res.status(200);
        res.type(errors.views.length || errors.layout
            ? 'application/json'
            : 'text/html');
        res.send(finalResult);
        resolve();
    }));
}
exports.default = carpenterHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0VBQTZDO0FBQzdDLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFFN0MsU0FBd0IsZ0JBQWdCLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLFVBQVUsRUFBRTtJQUM3RCxPQUFPLElBQUksT0FBTyxDQUFDLENBQU8sT0FBTyxFQUFFLEVBQUU7O1FBQ2pDLE1BQU0sS0FBSyxHQUFHLElBQUksaUJBQVEsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1FBRXBELEtBQUssQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUVoQywyQ0FBMkM7UUFDM0MsTUFBTSxhQUFhLEdBQUcsSUFBSSxpQkFBUSxFQUFFLENBQUM7UUFDckMsTUFBTSxZQUFZLEdBQUcsTUFBTSxhQUFhLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFbEUsa0NBQWtDO1FBQ2xDLE1BQU0saUJBQWlCLEdBQUcsSUFBSSxxQkFBWSxFQUFFLENBQUM7UUFDN0MsTUFBTSxjQUFjLEdBQUcsTUFBTSxpQkFBaUIsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUUzRCxNQUFNLFFBQVEsR0FDVixNQUFBLFlBQVksQ0FBQyxRQUFRLG1DQUFJLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFFeEUsUUFBUSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFFaEMsK0NBQStDO1FBQy9DLE1BQU0saUJBQWlCLEdBQUcsTUFBTSxHQUFHLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FDbkQsUUFBUSxFQUNSLFlBQVksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUMxQixDQUFDO1FBRUYsTUFBTSxNQUFNLEdBQUc7WUFDWCxVQUFVO1lBQ1YsS0FBSyxFQUFFLEVBQUU7WUFDVCxNQUFNLEVBQUUsU0FBUztTQUNwQixDQUFDO1FBRUYsSUFBSSxVQUFVLEdBQUcsTUFBQSxVQUFVLENBQUMsTUFBTSxtQ0FBSSxvQkFBb0IsQ0FBQztRQUMzRCxNQUFNLFVBQVUsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxNQUFBLEdBQUcsQ0FBQyxZQUFZLG1DQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQzdELElBQUksV0FBVyxDQUFDO1FBRWhCLDhCQUE4QjtRQUM5QixJQUFJO1lBQ0EsTUFBTSxhQUFhLEdBQUcsR0FBRyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsVUFBVSxrQ0FDakQsVUFBVSxLQUNiLFNBQVMsRUFBRSxjQUFjLEVBQ3pCLElBQUksRUFBRSxpQkFBaUIsQ0FBQyxLQUFLLElBQy9CLENBQUM7WUFDSCxNQUFNLFNBQVMsR0FBRyxNQUFNLGFBQWEsQ0FBQztZQUV0QyxJQUFJLFNBQVMsQ0FBQyxLQUFLLEVBQUU7Z0JBQ2pCLE1BQU0sQ0FBQyxNQUFNLEdBQUc7b0JBQ1osVUFBVTtvQkFDVixLQUFLLEVBQUUsU0FBUyxDQUFDLEtBQUs7aUJBQ3pCLENBQUM7YUFDTDtpQkFBTTtnQkFDSCxXQUFXLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQzthQUNqQztTQUNKO1FBQUMsT0FBTyxDQUFDLEVBQUU7WUFDUixPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3BCO1FBRUQsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUMsTUFBTSxFQUFFO1lBQ3RDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtnQkFDeEMsT0FBTyxPQUFPLENBQUMsSUFBSSxDQUFDO2dCQUNwQixPQUFPLE9BQU8sQ0FBQztZQUNuQixDQUFDLENBQUMsQ0FBQztZQUNILFdBQVcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO2lCQUN4QyxLQUFLLENBQUMsS0FBSyxDQUFDO2lCQUNaLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUNyQjtRQUVELEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDaEIsR0FBRyxDQUFDLElBQUksQ0FDSixNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUMsTUFBTTtZQUNoQyxDQUFDLENBQUMsa0JBQWtCO1lBQ3BCLENBQUMsQ0FBQyxXQUFXLENBQ3BCLENBQUM7UUFDRixHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3RCLE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUNQLENBQUM7QUEzRUQsbUNBMkVDIn0=