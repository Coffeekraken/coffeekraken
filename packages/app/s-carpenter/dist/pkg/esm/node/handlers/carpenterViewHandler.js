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
            viewData = yield __SDataFileGeneric.load(currentSpecs.metas.path);
        }
        // set the $specs in the view data
        viewData.$specs = currentSpecs;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sa0JBQWtCLE1BQU0sbUNBQW1DLENBQUM7QUFDbkUsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFDN0MsT0FBTyxlQUFlLE1BQU0sK0JBQStCLENBQUM7QUFDNUQsT0FBTyxFQUFFLGdDQUFnQyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFRM0UsTUFBTSxDQUFDLE9BQU8sVUFBZ0Isb0JBQW9CLENBQUMsRUFDL0MsR0FBRyxFQUNILEdBQUcsRUFDSCxLQUFLO0FBQ0wsVUFBVTtFQUNiOzs7UUFDRyxNQUFNLEtBQUssR0FBRyxJQUFJLFFBQVEsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO1FBRXhELEtBQUssQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUU5QiwyQ0FBMkM7UUFDM0MsTUFBTSxhQUFhLEdBQUcsSUFBSSxRQUFRLEVBQUUsQ0FBQztRQUNyQyxNQUFNLFlBQVksR0FBRyxNQUFNLGFBQWEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNsRSxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ2YsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUNYLHVCQUF1QixHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sc0JBQXNCLENBQ2xFLENBQUM7U0FDTDtRQUVELElBQUksUUFBUSxHQUNKLE1BQUEsWUFBWSxDQUFDLFFBQVEsbUNBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUMsRUFDdkUsUUFBUSxHQUFrQyxFQUFFLENBQUM7UUFFakQsMkJBQTJCO1FBQzNCLHVDQUF1QztRQUN2QyxtQ0FBbUM7UUFDbkMsMkNBQTJDO1FBQzND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