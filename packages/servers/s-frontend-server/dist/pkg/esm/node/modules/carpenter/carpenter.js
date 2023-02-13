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
export default function carpenter({ express, settings, config }) {
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
        express.post('/carpenter/:dotpath', (req, res) => __awaiter(this, void 0, void 0, function* () {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sa0JBQWtCLE1BQU0sbUNBQW1DLENBQUM7QUFDbkUsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFDN0MsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ25ELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUV6RCxNQUFNLENBQUMsT0FBTyxVQUFVLFNBQVMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFO0lBQzNELE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBTyxPQUFPLEVBQUUsRUFBRTtRQUNqQyxXQUFXO1FBQ1gsTUFBTSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEdBQUc7WUFDNUIsV0FBVyxFQUFFLGtDQUFrQztZQUMvQyxJQUFJLEVBQUUsR0FBRyxTQUFTLEVBQUUsdUJBQXVCO1lBQzNDLE9BQU8sRUFBRSxFQUFFO1NBQ2QsQ0FBQztRQUNGLE1BQU0sQ0FBQyxRQUFRLENBQUMsU0FBUyxHQUFHO1lBQ3hCLFdBQVcsRUFDUCw2REFBNkQ7WUFDakUsSUFBSSxFQUFFLEdBQUcsU0FBUyxFQUFFLG1CQUFtQjtZQUN2QyxPQUFPLEVBQUUsRUFBRTtTQUNkLENBQUM7UUFFRixRQUFRO1FBQ1IsTUFBTSxDQUFDLEtBQUssQ0FBQyxhQUFhLEdBQUc7WUFDekIsV0FBVyxFQUFFLGtDQUFrQztZQUMvQyxLQUFLLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQztZQUMxQixPQUFPLEVBQUUsZUFBZTtTQUMzQixDQUFDO1FBRUYsTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUc7WUFDckIsV0FBVyxFQUNQLDZEQUE2RDtZQUNqRSxLQUFLLEVBQUUsQ0FBQyxZQUFZLEVBQUUscUJBQXFCLENBQUM7WUFDNUMsT0FBTyxFQUFFLFdBQVc7U0FDdkIsQ0FBQztRQUVGLE9BQU8sQ0FBQyxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBTyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUU7O1lBQ25ELCtCQUErQjtZQUMvQixNQUFNLGFBQWEsR0FBRyxJQUFJLFFBQVEsRUFBRSxFQUNoQyxLQUFLLEdBQUcsTUFBTSxhQUFhLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFO2dCQUNqRCxZQUFZLEVBQUUsSUFBSTthQUNyQixDQUFDLENBQUM7WUFFUCwwRUFBMEU7WUFDMUUsTUFBTSxRQUFRLEdBQ1YsTUFBQSxLQUFLLENBQUMsUUFBUSxtQ0FBSSxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBRWpFLHFEQUFxRDtZQUNyRCxJQUFJLFlBQVksR0FBRyxFQUFFLENBQUM7WUFDdEIsSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRTtnQkFDbEIsWUFBWSxHQUFHLE1BQU0sa0JBQWtCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDbEU7WUFFRCx1Q0FBdUM7WUFDdkMsTUFBTSxNQUFNLEdBQUcsTUFBTSxHQUFHLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FDeEMsUUFBUSxFQUNSLFdBQVcsQ0FBQyxZQUFZLEVBQUUsTUFBQSxHQUFHLENBQUMsSUFBSSxtQ0FBSSxFQUFFLENBQUMsQ0FDNUMsQ0FBQztZQUVGLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDaEIsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUN0QixHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMzQixDQUFDLENBQUEsQ0FBQyxDQUFDO1FBRUgsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2xCLENBQUMsQ0FBQSxDQUFDLENBQUM7QUFDUCxDQUFDIn0=