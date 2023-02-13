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
const fs_1 = require("@coffeekraken/sugar/fs");
const object_1 = require("@coffeekraken/sugar/object");
function carpenter({ express, settings, config }) {
    return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
        // handlers
        config.handlers.carpenterJson = {
            description: 'Serve the carpenter data in JSON',
            path: `${(0, fs_1.__dirname)()}/carpenterJsonHandler`,
            ettings: {},
        };
        config.handlers.carpenter = {
            description: 'Serve the carpenter page that display a component at a time',
            path: `${(0, fs_1.__dirname)()}/carpenterHandler`,
            ettings: {},
        };
        // pages
        config.pages.carpenterJson = {
            description: 'Serve the carpenter data in JSON',
            slugs: ['/carpenter.json'],
            handler: 'carpenterJson',
        };
        config.pages.carpenter = {
            description: 'Serve the carpenter page that display a component at a time',
            slugs: ['/carpenter', '/carpenter/:dotpath'],
            handler: 'carpenter',
        };
        express.post('/carpenter/:dotpath', (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            // read the requested spec file
            const specsInstance = new s_specs_1.default(), specs = yield specsInstance.read(req.params.dotpath, {
                loadDataFile: true,
            });
            // take in consideration the optional "viewPath" property in the spec file
            const viewPath = (_a = specs.viewPath) !== null && _a !== void 0 ? _a : req.params.dotpath.replace(/^views\./, '');
            // load the original data file alongside the spec one
            let originalData = {};
            if (specs.metas.path) {
                originalData = yield s_data_file_generic_1.default.load(specs.metas.path);
            }
            // render the view with the merged data
            const result = yield res.viewRenderer.render(viewPath, (0, object_1.__deepMerge)(originalData, (_b = req.body) !== null && _b !== void 0 ? _b : {}));
            res.status(200);
            res.type('text/html');
            res.send(result.value);
        }));
        resolve(true);
    }));
}
exports.default = carpenter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNEZBQW1FO0FBQ25FLG9FQUE2QztBQUM3QywrQ0FBbUQ7QUFDbkQsdURBQXlEO0FBRXpELFNBQXdCLFNBQVMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFO0lBQzNELE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBTyxPQUFPLEVBQUUsRUFBRTtRQUNqQyxXQUFXO1FBQ1gsTUFBTSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEdBQUc7WUFDNUIsV0FBVyxFQUFFLGtDQUFrQztZQUMvQyxJQUFJLEVBQUUsR0FBRyxJQUFBLGNBQVMsR0FBRSx1QkFBdUI7WUFDM0MsT0FBTyxFQUFFLEVBQUU7U0FDZCxDQUFDO1FBQ0YsTUFBTSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEdBQUc7WUFDeEIsV0FBVyxFQUNQLDZEQUE2RDtZQUNqRSxJQUFJLEVBQUUsR0FBRyxJQUFBLGNBQVMsR0FBRSxtQkFBbUI7WUFDdkMsT0FBTyxFQUFFLEVBQUU7U0FDZCxDQUFDO1FBRUYsUUFBUTtRQUNSLE1BQU0sQ0FBQyxLQUFLLENBQUMsYUFBYSxHQUFHO1lBQ3pCLFdBQVcsRUFBRSxrQ0FBa0M7WUFDL0MsS0FBSyxFQUFFLENBQUMsaUJBQWlCLENBQUM7WUFDMUIsT0FBTyxFQUFFLGVBQWU7U0FDM0IsQ0FBQztRQUVGLE1BQU0sQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHO1lBQ3JCLFdBQVcsRUFDUCw2REFBNkQ7WUFDakUsS0FBSyxFQUFFLENBQUMsWUFBWSxFQUFFLHFCQUFxQixDQUFDO1lBQzVDLE9BQU8sRUFBRSxXQUFXO1NBQ3ZCLENBQUM7UUFFRixPQUFPLENBQUMsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQU8sR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFOztZQUNuRCwrQkFBK0I7WUFDL0IsTUFBTSxhQUFhLEdBQUcsSUFBSSxpQkFBUSxFQUFFLEVBQ2hDLEtBQUssR0FBRyxNQUFNLGFBQWEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUU7Z0JBQ2pELFlBQVksRUFBRSxJQUFJO2FBQ3JCLENBQUMsQ0FBQztZQUVQLDBFQUEwRTtZQUMxRSxNQUFNLFFBQVEsR0FDVixNQUFBLEtBQUssQ0FBQyxRQUFRLG1DQUFJLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFFakUscURBQXFEO1lBQ3JELElBQUksWUFBWSxHQUFHLEVBQUUsQ0FBQztZQUN0QixJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFO2dCQUNsQixZQUFZLEdBQUcsTUFBTSw2QkFBa0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNsRTtZQUVELHVDQUF1QztZQUN2QyxNQUFNLE1BQU0sR0FBRyxNQUFNLEdBQUcsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUN4QyxRQUFRLEVBQ1IsSUFBQSxvQkFBVyxFQUFDLFlBQVksRUFBRSxNQUFBLEdBQUcsQ0FBQyxJQUFJLG1DQUFJLEVBQUUsQ0FBQyxDQUM1QyxDQUFDO1lBRUYsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNoQixHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ3RCLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzNCLENBQUMsQ0FBQSxDQUFDLENBQUM7UUFFSCxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEIsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUNQLENBQUM7QUEzREQsNEJBMkRDIn0=