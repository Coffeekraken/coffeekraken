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
import { __deepMerge } from '@coffeekraken/sugar/object';
import { __serverObjectFromExpressRequest } from '@coffeekraken/sugar/php';
import { __uniqid } from '@coffeekraken/sugar/string';
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
        const defaults = __SSpecs.extractDefaults(currentSpecs);
        // if the method is "POST",
        // meaning that it's a component update
        // with some component data passed.
        // we use these instead of the default ones
        if (req.method === 'POST' && req.body && Object.keys(req.body).length > 0) {
            viewData = req.body;
        }
        else if (req.method === 'POST') {
            // new component
            viewData = defaults;
            viewData.uid = __uniqid();
        }
        else {
            // load the actual view values
            const data = yield __SDataFileGeneric.load(currentSpecs.metas.path);
            viewData = __deepMerge(defaults, data);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sa0JBQWtCLE1BQU0sbUNBQW1DLENBQUM7QUFDbkUsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFDN0MsT0FBTyxlQUFlLE1BQU0sK0JBQStCLENBQUM7QUFDNUQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3pELE9BQU8sRUFBRSxnQ0FBZ0MsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzNFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQVF0RCxNQUFNLENBQUMsT0FBTyxVQUFnQixvQkFBb0IsQ0FBQyxFQUMvQyxHQUFHLEVBQ0gsR0FBRyxFQUNILEtBQUs7QUFDTCxVQUFVO0VBQ2I7OztRQUNHLE1BQU0sS0FBSyxHQUFHLElBQUksUUFBUSxDQUFDLDJCQUEyQixDQUFDLENBQUM7UUFFeEQsS0FBSyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBRTlCLDJDQUEyQztRQUMzQyxNQUFNLGFBQWEsR0FBRyxJQUFJLFFBQVEsRUFBRSxDQUFDO1FBQ3JDLE1BQU0sWUFBWSxHQUFHLE1BQU0sYUFBYSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2xFLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDZixPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQ1gsdUJBQXVCLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxzQkFBc0IsQ0FDbEUsQ0FBQztTQUNMO1FBRUQsSUFBSSxRQUFRLEdBQ0osTUFBQSxZQUFZLENBQUMsUUFBUSxtQ0FBSSxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FB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