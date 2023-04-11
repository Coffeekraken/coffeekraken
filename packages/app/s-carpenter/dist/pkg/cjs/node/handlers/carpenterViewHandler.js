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
const s_data_file_generic_1 = __importDefault(require("@coffeekraken/s-data-file-generic"));
const s_specs_1 = __importDefault(require("@coffeekraken/s-specs"));
const s_view_renderer_1 = __importDefault(require("@coffeekraken/s-view-renderer"));
const php_1 = require("@coffeekraken/sugar/php");
function carpenterViewHandler({ req, res, specs,
// params,
 }) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        const bench = new s_bench_1.default('data.carpenterViewHandler');
        bench.step('beforeSpecsRead');
        // load current component/section/... specs
        const specsInstance = new s_specs_1.default();
        const currentSpecs = yield specsInstance.read(req.params.dotpath);
        if (!currentSpecs) {
            return res.send(`The requested spec "${req.params.dotpath}" does not exists...`);
        }
        let viewPath = (_a = currentSpecs.viewPath) !== null && _a !== void 0 ? _a : req.params.dotpath.replace(/^views\./, ''), viewData = {
            $specs: currentSpecs,
            $source: {},
            values: {},
        };
        // if the method is "POST",
        // meaning that it's a component update
        // with some component data passed.
        // we use these instead of the default ones
        if (req.method === 'POST' && req.body) {
            viewData.values = req.body;
        }
        else {
            // load the actual view values
            viewData.values = yield s_data_file_generic_1.default.load(currentSpecs.metas.path);
        }
        // load the "...Source.data.js" data file to simulate a source
        // in the editor
        viewData.$source = yield s_data_file_generic_1.default.load(currentSpecs.metas.path.replace('.spec.json', 'Source.json'));
        // render the current component/section, etc...
        const renderer = new s_view_renderer_1.default({
            sharedData: (_b = res.templateData.shared) !== null && _b !== void 0 ? _b : {},
        });
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
            const layoutPromise = renderer.render(layoutPath, Object.assign(Object.assign({ $_SERVER: (0, php_1.__serverObjectFromExpressRequest)(req) }, ((_c = res.templateData) !== null && _c !== void 0 ? _c : {})), { carpenter: specs, body: currentViewResult.value }));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0VBQTZDO0FBQzdDLDRGQUFtRTtBQUNuRSxvRUFBNkM7QUFDN0Msb0ZBQTREO0FBQzVELGlEQUEyRTtBQUUzRSxTQUE4QixvQkFBb0IsQ0FBQyxFQUMvQyxHQUFHLEVBQ0gsR0FBRyxFQUNILEtBQUs7QUFDTCxVQUFVO0VBQ2I7OztRQUNHLE1BQU0sS0FBSyxHQUFHLElBQUksaUJBQVEsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO1FBRXhELEtBQUssQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUU5QiwyQ0FBMkM7UUFDM0MsTUFBTSxhQUFhLEdBQUcsSUFBSSxpQkFBUSxFQUFFLENBQUM7UUFDckMsTUFBTSxZQUFZLEdBQUcsTUFBTSxhQUFhLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDbEUsSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNmLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FDWCx1QkFBdUIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLHNCQUFzQixDQUNsRSxDQUFDO1NBQ0w7UUFFRCxJQUFJLFFBQVEsR0FDSixNQUFBLFlBQVksQ0FBQyxRQUFRLG1DQUFJLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDLEVBQ3ZFLFFBQVEsR0FBRztZQUNQLE1BQU0sRUFBRSxZQUFZO1lBQ3BCLE9BQU8sRUFBRSxFQUFFO1lBQ1gsTUFBTSxFQUFFLEVBQUU7U0FDYixDQUFDO1FBRU4sMkJBQTJCO1FBQzNCLHVDQUF1QztRQUN2QyxtQ0FBbUM7UUFDbkMsMkNBQTJDO1FBQzNDLElBQUksR0FBRyxDQUFDLE1BQU0sS0FBSyxNQUFNLElBQUksR0FBRyxDQUFDLElBQUksRUFBRTtZQUNuQyxR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