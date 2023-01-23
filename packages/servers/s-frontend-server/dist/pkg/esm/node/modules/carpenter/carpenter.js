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
import { __dirname } from '@coffeekraken/sugar/fs';
import { __deepMerge } from '@coffeekraken/sugar/object';
export default function carpenter(app, settings, config) {
    return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
        // handlers
        config.handlers.carpenterJson = {
            description: 'Serve the carpenter data in JSON',
            path: `${__dirname()}/carpenterJsonHandler`,
            ettings: {},
        };
        config.handlers.carpenter = {
            description: 'Serve the carpenter page that display a component at a time',
            path: `${__dirname()}/carpenterHandler`,
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
            const specsInstance = new __SSpecs(), specs = yield specsInstance.read(req.params.dotpath, {
                loadDataFile: true,
            });
            // take in consideration the optional "viewPath" property in the spec file
            const viewPath = (_a = specs.viewPath) !== null && _a !== void 0 ? _a : req.params.dotpath.replace(/^views\./, '');
            // load the original data file alongside the spec one
            let originalData = {};
            if (specs.metas.path) {
                originalData = yield __SDataFileGeneric.load(specs.metas.path);
            }
            // render the view with the merged data
            const result = yield res.viewRenderer.render(viewPath, __deepMerge(originalData, (_b = req.body) !== null && _b !== void 0 ? _b : {}));
            res.status(200);
            res.type('text/html');
            res.send(result.value);
        }));
        resolve(true);
    }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sa0JBQWtCLE1BQU0sbUNBQW1DLENBQUM7QUFDbkUsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFDN0MsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ25ELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUV6RCxNQUFNLENBQUMsT0FBTyxVQUFVLFNBQVMsQ0FBQyxHQUFHLEVBQUUsUUFBUSxFQUFFLE1BQU07SUFDbkQsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFPLE9BQU8sRUFBRSxFQUFFO1FBQ2pDLFdBQVc7UUFDWCxNQUFNLENBQUMsUUFBUSxDQUFDLGFBQWEsR0FBRztZQUM1QixXQUFXLEVBQUUsa0NBQWtDO1lBQy9DLElBQUksRUFBRSxHQUFHLFNBQVMsRUFBRSx1QkFBdUI7WUFDM0MsT0FBTyxFQUFFLEVBQUU7U0FDZCxDQUFDO1FBQ0YsTUFBTSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEdBQUc7WUFDeEIsV0FBVyxFQUNQLDZEQUE2RDtZQUNqRSxJQUFJLEVBQUUsR0FBRyxTQUFTLEVBQUUsbUJBQW1CO1lBQ3ZDLE9BQU8sRUFBRSxFQUFFO1NBQ2QsQ0FBQztRQUVGLFFBQVE7UUFDUixNQUFNLENBQUMsS0FBSyxDQUFDLGFBQWEsR0FBRztZQUN6QixXQUFXLEVBQUUsa0NBQWtDO1lBQy9DLEtBQUssRUFBRSxDQUFDLGlCQUFpQixDQUFDO1lBQzFCLE9BQU8sRUFBRSxlQUFlO1NBQzNCLENBQUM7UUFFRixNQUFNLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRztZQUNyQixXQUFXLEVBQ1AsNkRBQTZEO1lBQ2pFLEtBQUssRUFBRSxDQUFDLFlBQVksRUFBRSxxQkFBcUIsQ0FBQztZQUM1QyxPQUFPLEVBQUUsV0FBVztTQUN2QixDQUFDO1FBRUYsR0FBRyxDQUFDLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFPLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRTs7WUFDL0MsK0JBQStCO1lBQy9CLE1BQU0sYUFBYSxHQUFHLElBQUksUUFBUSxFQUFFLEVBQ2hDLEtBQUssR0FBRyxNQUFNLGFBQWEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUU7Z0JBQ2pELFlBQVksRUFBRSxJQUFJO2FBQ3JCLENBQUMsQ0FBQztZQUVQLDBFQUEwRTtZQUMxRSxNQUFNLFFBQVEsR0FDVixNQUFBLEtBQUssQ0FBQyxRQUFRLG1DQUFJLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFFakUscURBQXFEO1lBQ3JELElBQUksWUFBWSxHQUFHLEVBQUUsQ0FBQztZQUN0QixJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFO2dCQUNsQixZQUFZLEdBQUcsTUFBTSxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNsRTtZQUVELHVDQUF1QztZQUN2QyxNQUFNLE1BQU0sR0FBRyxNQUFNLEdBQUcsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUN4QyxRQUFRLEVBQ1IsV0FBVyxDQUFDLFlBQVksRUFBRSxNQUFBLEdBQUcsQ0FBQyxJQUFJLG1DQUFJLEVBQUUsQ0FBQyxDQUM1QyxDQUFDO1lBRUYsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNoQixHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ3RCLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzNCLENBQUMsQ0FBQSxDQUFDLENBQUM7UUFFSCxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEIsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUNQLENBQUMifQ==