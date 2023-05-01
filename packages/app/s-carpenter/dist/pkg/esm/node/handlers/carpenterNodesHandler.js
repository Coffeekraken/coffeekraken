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
import __SViewRenderer from '@coffeekraken/s-view-renderer';
import { __deepMerge } from '@coffeekraken/sugar/object';
export default function carpenterNodesHandler({ req, res }) {
    var _a, _b, _c, _d;
    return __awaiter(this, void 0, void 0, function* () {
        let currentSpecs, defaultViewData = {}, viewData = {}, viewPath;
        // if a "specs" is present in the body
        // it means that we want to update
        if (req.body.specs && (req.method === 'PUT' || req.method === 'POST')) {
            // load current component/section/... specs
            const specsInstance = new __SSpecs();
            _console.log('READY', req.body);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sa0JBQWtCLE1BQU0sbUNBQW1DLENBQUM7QUFDbkUsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFDN0MsT0FBTyxlQUFlLE1BQU0sK0JBQStCLENBQUM7QUFDNUQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBUXpELE1BQU0sQ0FBQyxPQUFPLFVBQWdCLHFCQUFxQixDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRTs7O1FBQzVELElBQUksWUFBWSxFQUNaLGVBQWUsR0FBRyxFQUFFLEVBQ3BCLFFBQVEsR0FBRyxFQUFFLEVBQ2IsUUFBUSxDQUFDO1FBRWIsc0NBQXNDO1FBQ3RDLGtDQUFrQztRQUNsQyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sS0FBSyxLQUFLLElBQUksR0FBRyxDQUFDLE1BQU0sS0FBSyxNQUFNLENBQUMsRUFBRTtZQUNuRSwyQ0FBMkM7WUFDM0MsTUFBTSxhQUFhLEdBQUcsSUFBSSxRQUFRLEVBQUUsQ0FBQztZQUNyQyxRQUFRLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDaEMsWUFBWSxHQUFHLE1BQU0sYUFBYSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3hELElBQUksQ0FBQyxZQUFZLEVBQUU7Z0JBQ2YsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUNYLHVCQUF1QixHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssc0JBQXNCLENBQzlELENBQUM7YUFDTDtTQUNKO1FBRUQsK0NBQStDO1FBQy9DLE1BQU0sUUFBUSxHQUFHLElBQUksZUFBZSxDQUFDO1lBQ2pDLFVBQVUsRUFBRSxNQUFBLEdBQUcsQ0FBQyxZQUFZLENBQUMsTUFBTSxtQ0FBSSxFQUFFO1NBQzVDLENBQUMsQ0FBQztRQUVILHlCQUF5QjtRQUN6QixJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFFaEIsb0RBQW9EO1FBQ3BELG1GQUFtRjtRQUNuRiw2QkFBNkI7UUFDN0IsaUNBQWlDO1FBQ2pDLGlDQUFpQztRQUNqQyxRQUFRLEdBQUcsQ0FBQyxNQUFNLEVBQUU7WUFDaEIsS0FBSyxLQUFLLENBQUM7WUFDWCxLQUFLLE1BQU07Z0JBQ1AsZUFBZSxHQUFHLFFBQVEsQ0FBQyxlQUFlLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBQ3pELFFBQVE7b0JBQ0osTUFBQSxZQUFZLENBQUMsUUFBUSxtQ0FBSSxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQyxDQUFDO2dCQUNwRSxRQUFRLEdBQWtDLEVBQUUsQ0FBQztnQkFFN0MsMkNBQTJDO2dCQUMzQyxRQUFRLEdBQUcsV0FBVyxDQUFDLGVBQWUsRUFBRSxNQUFBLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxtQ0FBSSxFQUFFLENBQUMsQ0FBQztnQkFFL0QsMEJBQTBCO2dCQUMxQixRQUFRLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO2dCQUU1Qiw4REFBOEQ7Z0JBQzlELGdCQUFnQjtnQkFDaEIsUUFBUSxDQUFDLE9BQU8sR0FBRyxNQUFNLGtCQUFrQixDQUFDLElBQUksQ0FDNUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxhQUFhLENBQUMsQ0FDL0QsQ0FBQztnQkFDRixNQUFNO1NBQ2I7UUFFRCxRQUFRLEdBQUcsQ0FBQyxNQUFNLEVBQUU7WUFDaEIsS0FBSyxLQUFLLEVBQUUsbUJBQW1CO2dCQUMzQixNQUFNLGlCQUFpQixHQUFHLE1BQU0sUUFBUSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUM7Z0JBQ3BFLE1BQU0sQ0FBQyxJQUFJLEdBQUcsaUJBQWlCLENBQUMsS0FBSyxDQUFDO2dCQUN0QyxNQUFNLENBQUMsR0FBRyxHQUFHLE1BQUEsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLG1DQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO2dCQUM1QyxNQUFNO1lBQ1YsS0FBSyxNQUFNLEVBQUUsY0FBYztnQkFDdkIsTUFBTSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUM7Z0JBQ2xCLE1BQU07WUFDVixLQUFLLFFBQVEsRUFBRSxnQkFBZ0I7Z0JBQzNCLE1BQU0sQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUM7Z0JBQzVCLE1BQU07WUFDVixLQUFLLEtBQUssQ0FBQyxDQUFDLGtCQUFrQjtZQUM5QjtnQkFDSSxNQUFNLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDO2dCQUM1QixNQUFNO1NBQ2I7UUFFRCxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2hCLEdBQUcsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUM3QixHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDOztDQUNwQiJ9