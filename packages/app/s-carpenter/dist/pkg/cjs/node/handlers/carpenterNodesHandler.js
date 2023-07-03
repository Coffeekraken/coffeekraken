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
const s_data_file_generic_1 = __importDefault(require("@coffeekraken/s-data-file-generic"));
const s_specs_1 = __importDefault(require("@coffeekraken/s-specs"));
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const s_view_renderer_1 = __importDefault(require("@coffeekraken/s-view-renderer"));
const fs_1 = require("@coffeekraken/sugar/fs");
const object_1 = require("@coffeekraken/sugar/object");
const fs_2 = __importDefault(require("fs"));
function carpenterNodesHandler({ req, res }) {
    var _a, _b, _c, _d;
    return __awaiter(this, void 0, void 0, function* () {
        let currentSpecs, defaultViewData = {}, viewData = {}, viewPath;
        // if a "specs" is present in the body
        // it means that we want to update
        if (req.body.specs && (req.method === 'PUT' || req.method === 'POST')) {
            // load current component/section/... specs
            const specsInstance = new s_specs_1.default();
            currentSpecs = yield specsInstance.read(req.body.specs);
            if (!currentSpecs) {
                return res.send(`The requested spec "${req.body.specs}" does not exists...`);
            }
        }
        // render the current component/section, etc...
        const renderer = new s_view_renderer_1.default({
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
                defaultViewData = s_specs_1.default.extractDefaults(currentSpecs);
                viewPath =
                    (_b = currentSpecs.viewPath) !== null && _b !== void 0 ? _b : req.body.specs.replace(/^views\./, '');
                viewData = {};
                // mix defaults values with the passed ones
                viewData = (0, object_1.__deepMerge)(defaultViewData, (_c = req.body.values) !== null && _c !== void 0 ? _c : {});
                // set the uid in the data
                viewData.uid = req.body.uid;
                // load the "...Source.data.js" data file to simulate a source
                // in the editor
                viewData.$source = yield s_data_file_generic_1.default.load(currentSpecs.metas.path.replace('.spec.json', 'Source.json'));
                break;
        }
        // handle saving data
        switch (req.method) {
            case 'POST':
                // save the new node
                const nodesDir = s_sugar_config_1.default.get('storage.src.nodesDir');
                (0, fs_1.__ensureDirSync)(nodesDir);
                fs_2.default.writeFileSync(`${nodesDir}/${req.body.uid}.json`, JSON.stringify(req.body, null, 4));
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
exports.default = carpenterNodesHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNEZBQW1FO0FBQ25FLG9FQUE2QztBQUM3QyxrRkFBMEQ7QUFDMUQsb0ZBQTREO0FBQzVELCtDQUF5RDtBQUN6RCx1REFBeUQ7QUFDekQsNENBQXNCO0FBUXRCLFNBQThCLHFCQUFxQixDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRTs7O1FBQzVELElBQUksWUFBWSxFQUNaLGVBQWUsR0FBRyxFQUFFLEVBQ3BCLFFBQVEsR0FBRyxFQUFFLEVBQ2IsUUFBUSxDQUFDO1FBRWIsc0NBQXNDO1FBQ3RDLGtDQUFrQztRQUNsQyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sS0FBSyxLQUFLLElBQUksR0FBRyxDQUFDLE1BQU0sS0FBSyxNQUFNLENBQUMsRUFBRTtZQUNuRSwyQ0FBMkM7WUFDM0MsTUFBTSxhQUFhLEdBQUcsSUFBSSxpQkFBUSxFQUFFLENBQUM7WUFDckMsWUFBWSxHQUFHLE1BQU0sYUFBYSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3hELElBQUksQ0FBQyxZQUFZLEVBQUU7Z0JBQ2YsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUNYLHVCQUF1QixHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssc0JBQXNCLENBQzlELENBQUM7YUFDTDtTQUNKO1FBRUQsK0NBQStDO1FBQy9DLE1BQU0sUUFBUSxHQUFHLElBQUkseUJBQWUsQ0FBQztZQUNqQyxVQUFVLEVBQUUsTUFBQSxHQUFHLENBQUMsWUFBWSxDQUFDLE1BQU0sbUNBQUksRUFBRTtTQUM1QyxDQUFDLENBQUM7UUFFSCx5QkFBeUI7UUFDekIsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBRWhCLG9EQUFvRDtRQUNwRCxtRkFBbUY7UUFD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