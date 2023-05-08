var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SDataFileGeneric from '@coffeekraken/s-data-file-generic';
import __SSpecs from '@coffeekraken/s-specs';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __SViewRenderer from '@coffeekraken/s-view-renderer';
import { __ensureDirSync } from '@coffeekraken/sugar/fs';
import { __deepMerge } from '@coffeekraken/sugar/object';
import __fs from 'fs';
export default function carpenterNodesHandler({ req, res }) {
    var _a, _b, _c, _d;
    return __awaiter(this, void 0, void 0, function* () {
        let currentSpecs, defaultViewData = {}, viewData = {}, viewPath;
        // if a "specs" is present in the body
        // it means that we want to update
        if (req.body.specs && (req.method === 'PUT' || req.method === 'POST')) {
            // load current component/section/... specs
            const specsInstance = new __SSpecs();
            currentSpecs = yield specsInstance.read(req.body.specs);
            if (!currentSpecs) {
                return res.send(`The requested spec "${req.body.specs}" does not exists...`);
            }
        }
        // render the current component/section, etc...
        const renderer = new __SViewRenderer({
            sharedData: (_a = res.templateData.shared) !== null && _a !== void 0 ? _a : {},
        });
        // init the result object
        let result = {};
        // do something different depending on the method...
        // PUT: Render the passed node specs with the passed values and return the new HTML
        // POST: Save the passed node
        // DELETE: Delete the passed node
        // GET: Render the requested node
        switch (req.method) {
            case 'PUT':
            case 'POST':
                defaultViewData = __SSpecs.extractDefaults(currentSpecs);
                viewPath =
                    (_b = currentSpecs.viewPath) !== null && _b !== void 0 ? _b : req.body.specs.replace(/^views\./, '');
                viewData = {};
                // mix defaults values with the passed ones
                viewData = __deepMerge(defaultViewData, (_c = req.body.values) !== null && _c !== void 0 ? _c : {});
                // set the uid in the data
                viewData.uid = req.body.uid;
                // load the "...Source.data.js" data file to simulate a source
                // in the editor
                viewData.$source = yield __SDataFileGeneric.load(currentSpecs.metas.path.replace('.spec.json', 'Source.json'));
                break;
        }
        // handle saving data
        switch (req.method) {
            case 'POST':
                // save the new node
                const nodesDir = __SSugarConfig.get('storage.src.nodesDir');
                __ensureDirSync(nodesDir);
                __fs.writeFileSync(`${nodesDir}/${req.body.uid}.json`, JSON.stringify(req.body, null, 4));
                break;
        }
        // handle view data
        switch (req.method) {
            case 'PUT': // update node html
                const currentViewResult = yield renderer.render(viewPath, viewData);
                result.html = currentViewResult.value;
                result.uid = (_d = req.params.uid) !== null && _d !== void 0 ? _d : req.body.uid;
                break;
            case 'POST': // save a node
                result = req.body;
                break;
            case 'DELETE': // delete a node
                result.uid = req.params.uid;
                break;
            case 'GET': // get a node JSON
            default:
                result.uid = req.params.uid;
                break;
        }
        res.status(200);
        res.type('application/json');
        res.send(result);
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sa0JBQWtCLE1BQU0sbUNBQW1DLENBQUM7QUFDbkUsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFDN0MsT0FBTyxjQUFjLE1BQU0sOEJBQThCLENBQUM7QUFDMUQsT0FBTyxlQUFlLE1BQU0sK0JBQStCLENBQUM7QUFDNUQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3pELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN6RCxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFRdEIsTUFBTSxDQUFDLE9BQU8sVUFBZ0IscUJBQXFCLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFOzs7UUFDNUQsSUFBSSxZQUFZLEVBQ1osZUFBZSxHQUFHLEVBQUUsRUFDcEIsUUFBUSxHQUFHLEVBQUUsRUFDYixRQUFRLENBQUM7UUFFYixzQ0FBc0M7UUFDdEMsa0NBQWtDO1FBQ2xDLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxLQUFLLEtBQUssSUFBSSxHQUFHLENBQUMsTUFBTSxLQUFLLE1BQU0sQ0FBQyxFQUFFO1lBQ25FLDJDQUEyQztZQUMzQyxNQUFNLGFBQWEsR0FBRyxJQUFJLFFBQVEsRUFBRSxDQUFDO1lBQ3JDLFlBQVksR0FBRyxNQUFNLGFBQWEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN4RCxJQUFJLENBQUMsWUFBWSxFQUFFO2dCQUNmLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FDWCx1QkFBdUIsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLHNCQUFzQixDQUM5RCxDQUFDO2FBQ0w7U0FDSjtRQUVELCtDQUErQztRQUMvQyxNQUFNLFFB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