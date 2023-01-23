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
function carpenter(app, settings, config) {
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
        app.post('/carpenter/:dotpath', (req, res) => __awaiter(this, void 0, void 0, function* () {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNEZBQW1FO0FBQ25FLG9FQUE2QztBQUM3QywrQ0FBbUQ7QUFDbkQsdURBQXlEO0FBRXpELFNBQXdCLFNBQVMsQ0FBQyxHQUFHLEVBQUUsUUFBUSxFQUFFLE1BQU07SUFDbkQsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFPLE9BQU8sRUFBRSxFQUFFO1FBQ2pDLFdBQVc7UUFDWCxNQUFNLENBQUMsUUFBUSxDQUFDLGFBQWEsR0FBRztZQUM1QixXQUFXLEVBQUUsa0NBQWtDO1lBQy9DLElBQUksRUFBRSxHQUFHLElBQUEsY0FBUyxHQUFFLHVCQUF1QjtZQUMzQyxPQUFPLEVBQUUsRUFBRTtTQUNkLENBQUM7UUFDRixNQUFNLENBQUMsUUFBUSxDQUFDLFNBQVMsR0FBRztZQUN4QixXQUFXLEVBQ1AsNkRBQTZEO1lBQ2pFLElBQUksRUFBRSxHQUFHLElBQUEsY0FBUyxHQUFFLG1CQUFtQjtZQUN2QyxPQUFPLEVBQUUsRUFBRTtTQUNkLENBQUM7UUFFRixRQUFRO1FBQ1IsTUFBTSxDQUFDLEtBQUssQ0FBQyxhQUFhLEdBQUc7WUFDekIsV0FBVyxFQUFFLGtDQUFrQztZQUMvQyxLQUFLLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQztZQUMxQixPQUFPLEVBQUUsZUFBZTtTQUMzQixDQUFDO1FBRUYsTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUc7WUFDckIsV0FBVyxFQUNQLDZEQUE2RDtZQUNqRSxLQUFLLEVBQUUsQ0FBQyxZQUFZLEVBQUUscUJBQXFCLENBQUM7WUFDNUMsT0FBTyxFQUFFLFdBQVc7U0FDdkIsQ0FBQztRQUVGLEdBQUcsQ0FBQyxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBTyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUU7O1lBQy9DLCtCQUErQjtZQUMvQixNQUFNLGFBQWEsR0FBRyxJQUFJLGlCQUFRLEVBQUUsRUFDaEMsS0FBSyxHQUFHLE1BQU0sYUFBYSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRTtnQkFDakQsWUFBWSxFQUFFLElBQUk7YUFDckIsQ0FBQyxDQUFDO1lBRVAsMEVBQTBFO1lBQzFFLE1BQU0sUUFBUSxHQUNWLE1BQUEsS0FBSyxDQUFDLFFBQVEsbUNBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUVqRSxxREFBcUQ7WUFDckQsSUFBSSxZQUFZLEdBQUcsRUFBRSxDQUFDO1lBQ3RCLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUU7Z0JBQ2xCLFlBQVksR0FBRyxNQUFNLDZCQUFrQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ2xFO1lBRUQsdUNBQXVDO1lBQ3ZDLE1BQU0sTUFBTSxHQUFHLE1BQU0sR0FBRyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQ3hDLFFBQVEsRUFDUixJQUFBLG9CQUFXLEVBQUMsWUFBWSxFQUFFLE1BQUEsR0FBRyxDQUFDLElBQUksbUNBQUksRUFBRSxDQUFDLENBQzVDLENBQUM7WUFFRixHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2hCLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDdEIsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDM0IsQ0FBQyxDQUFBLENBQUMsQ0FBQztRQUVILE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNsQixDQUFDLENBQUEsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQTNERCw0QkEyREMifQ==