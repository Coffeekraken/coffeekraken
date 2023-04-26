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
const object_1 = require("@coffeekraken/sugar/object");
const php_1 = require("@coffeekraken/sugar/php");
function carpenterViewHandler({ req, res }) {
    var _a, _b, _c, _d, _e;
    return __awaiter(this, void 0, void 0, function* () {
        const bench = new s_bench_1.default('data.carpenterViewHandler');
        bench.step('beforeSpecsRead');
        // // handle DELETE
        // if (req.method === 'DELETE') {
        // }
        // load current component/section/... specs
        const specsInstance = new s_specs_1.default();
        const currentSpecs = yield specsInstance.read(req.params.specs);
        if (!currentSpecs) {
            return res.send(`The requested spec "${req.params.specs}" does not exists...`);
        }
        let viewPath = (_a = currentSpecs.viewPath) !== null && _a !== void 0 ? _a : req.params.specs.replace(/^views\./, ''), viewData = {};
        const defaults = s_specs_1.default.extractDefaults(currentSpecs);
        // if the method is "POST",
        // meaning that it's a component update
        // with some component data passed.
        // we use these instead of the default ones
        if (req.method === 'POST' &&
            Object.keys((_c = (_b = req.body) === null || _b === void 0 ? void 0 : _b.values) !== null && _c !== void 0 ? _c : {}).length > 0) {
            viewData = req.body.values;
        }
        else if (req.method === 'POST') {
            // new component
            viewData = defaults;
        }
        else {
            // load the actual view values
            const data = yield s_data_file_generic_1.default.load(currentSpecs.metas.path);
            viewData = (0, object_1.__deepMerge)(defaults, data);
        }
        // set the uid in the data
        viewData.uid = req.body.uid;
        // load the "...Source.data.js" data file to simulate a source
        // in the editor
        viewData.$source = yield s_data_file_generic_1.default.load(currentSpecs.metas.path.replace('.spec.json', 'Source.json'));
        // render the current component/section, etc...
        const renderer = new s_view_renderer_1.default({
            sharedData: (_d = res.templateData.shared) !== null && _d !== void 0 ? _d : {},
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
            const layoutPromise = renderer.render(layoutPath, Object.assign(Object.assign({ $_SERVER: (0, php_1.__serverObjectFromExpressRequest)(req) }, ((_e = res.templateData) !== null && _e !== void 0 ? _e : {})), { body: currentViewResult.value }));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0VBQTZDO0FBQzdDLDRGQUFtRTtBQUNuRSxvRUFBNkM7QUFDN0Msb0ZBQTREO0FBQzVELHVEQUF5RDtBQUN6RCxpREFBMkU7QUFRM0UsU0FBOEIsb0JBQW9CLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFOzs7UUFDM0QsTUFBTSxLQUFLLEdBQUcsSUFBSSxpQkFBUSxDQUFDLDJCQUEyQixDQUFDLENBQUM7UUFFeEQsS0FBSyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBRTlCLG1CQUFtQjtRQUNuQixpQ0FBaUM7UUFFakMsSUFBSTtRQUVKLDJDQUEyQztRQUMzQyxNQUFNLGFBQWEsR0FBRyxJQUFJLGlCQUFRLEVBQUUsQ0FBQztRQUNyQyxNQUFNLFlBQVksR0FBRyxNQUFNLGFBQWEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNoRSxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ2YsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUNYLHVCQUF1QixHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssc0JBQXNCLENBQ2hFLENBQUM7U0FDTDtRQUVELElBQUksUUFBUSxHQUNKLE1BQUEsWUFBWSxDQUFDLFFBQVEsbUNBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUMsRUFDckUsUUFBUSxHQUFrQyxFQUFFLENBQUM7UUFDakQsTUFBTSxRQUFRLEdBQUcsaUJBQVEsQ0FBQyxlQUFlLENBQUMsWUFBWSxDQUFDLENBQUM7UUFFeEQsMkJBQTJCO1FBQzNCLHVDQUF1QztRQUN2QyxtQ0FBbUM7UUFDbkMsMkNBQTJDO1FBQzNDLElBQ0ksR0FBRyxDQUFDLE1BQU0sS0FBSyxNQUFNO1lBQ3JC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