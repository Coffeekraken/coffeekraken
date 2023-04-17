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
        let viewPath = (_a = currentSpecs.viewPath) !== null && _a !== void 0 ? _a : req.params.dotpath.replace(/^views\./, ''), viewData = {};
        // if the method is "POST",
        // meaning that it's a component update
        // with some component data passed.
        // we use these instead of the default ones
        if (req.method === 'POST' && req.body) {
            viewData = req.body;
        }
        else {
            // load the actual view values
            viewData = yield s_data_file_generic_1.default.load(currentSpecs.metas.path);
        }
        // set the $specs in the view data
        viewData.$specs = currentSpecs;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0VBQTZDO0FBQzdDLDRGQUFtRTtBQUNuRSxvRUFBNkM7QUFDN0Msb0ZBQTREO0FBQzVELGlEQUEyRTtBQVEzRSxTQUE4QixvQkFBb0IsQ0FBQyxFQUMvQyxHQUFHLEVBQ0gsR0FBRyxFQUNILEtBQUs7QUFDTCxVQUFVO0VBQ2I7OztRQUNHLE1BQU0sS0FBSyxHQUFHLElBQUksaUJBQVEsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO1FBRXhELEtBQUssQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUU5QiwyQ0FBMkM7UUFDM0MsTUFBTSxhQUFhLEdBQUcsSUFBSSxpQkFBUSxFQUFFLENBQUM7UUFDckMsTUFBTSxZQUFZLEdBQUcsTUFBTSxhQUFhLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDbEUsSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNmLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FDWCx1QkFBdUIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLHNCQUFzQixDQUNsRSxDQUFDO1NBQ0w7UUFFRCxJQUFJLFFBQVEsR0FDSixNQUFBLFlBQVksQ0FBQyxRQUFRLG1DQUFJLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDLEVBQ3ZFLFFBQVEsR0FBa0MsRUFBRSxDQUFDO1FBRWpELDJCQUEyQjtRQUMzQix1Q0FBdUM7UUFDdkMsbUNBQW1DO1FBQ25DLDJDQUEyQztRQUMzQyxJQUFJLEdBQUcsQ0FBQyxNQUFNLEtBQUssTUFBTSxJQUFJLEdBQUcsQ0FBQyxJQUFJLEVBQUU7WUFDbkMsUUFBUSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUM7U0FDdkI7YUFBTTtZQUNILDhCQUE4QjtZQUM5QixR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