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
import __SDataFileGeneric from '@coffeekraken/s-data-file-generic';
import __SSpecs from '@coffeekraken/s-specs';
import __SViewRenderer from '@coffeekraken/s-view-renderer';
import { __serverObjectFromExpressRequest } from '@coffeekraken/sugar/php';
export default function carpenterViewHandler({ req, res, specs,
// params,
 }) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        const bench = new __SBench('data.carpenterViewHandler');
        bench.step('beforeSpecsRead');
        // load current component/section/... specs
        const specsInstance = new __SSpecs();
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
            viewData.values = yield __SDataFileGeneric.load(currentSpecs.metas.path);
        }
        // load the "...Source.data.js" data file to simulate a source
        // in the editor
        viewData.$source = yield __SDataFileGeneric.load(currentSpecs.metas.path.replace('.spec.json', 'Source.json'));
        // render the current component/section, etc...
        const renderer = new __SViewRenderer({
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
            const layoutPromise = renderer.render(layoutPath, Object.assign(Object.assign({ $_SERVER: __serverObjectFromExpressRequest(req) }, ((_c = res.templateData) !== null && _c !== void 0 ? _c : {})), { carpenter: specs, body: currentViewResult.value }));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sa0JBQWtCLE1BQU0sbUNBQW1DLENBQUM7QUFDbkUsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFDN0MsT0FBTyxlQUFlLE1BQU0sK0JBQStCLENBQUM7QUFDNUQsT0FBTyxFQUFFLGdDQUFnQyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFM0UsTUFBTSxDQUFDLE9BQU8sVUFBZ0Isb0JBQW9CLENBQUMsRUFDL0MsR0FBRyxFQUNILEdBQUcsRUFDSCxLQUFLO0FBQ0wsVUFBVTtFQUNiOzs7UUFDRyxNQUFNLEtBQUssR0FBRyxJQUFJLFFBQVEsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO1FBRXhELEtBQUssQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUU5QiwyQ0FBMkM7UUFDM0MsTUFBTSxhQUFhLEdBQUcsSUFBSSxRQUFRLEVBQUUsQ0FBQztRQUNyQyxNQUFNLFlBQVksR0FBRyxNQUFNLGFBQWEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNsRSxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ2YsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUNYLHVCQUF1QixHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sc0JBQXNCLENBQ2xFLENBQUM7U0FDTDtRQUVELElBQUksUUFBUSxHQUNKLE1BQUEsWUFBWSxDQUFDLFFBQVEsbUNBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUMsRUFDdkUsUUFBUSxHQUFHO1lBQ1AsTUFBTSxFQUFFLFlBQVk7WUFDcEIsT0FBTyxFQUFFLEVBQUU7WUFDWCxNQUFNLEVBQUUsRUFBRTtTQUNiLENB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